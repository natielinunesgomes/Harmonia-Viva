import { GoogleGenAI, Type, GenerateContentResponse, Schema } from "@google/genai";
import { PromptResult } from "../types";

// NOTE: process.env.API_KEY is defined in vite.config.ts
// We handle the case where it might be empty to prevent the app from crashing in hosting environments
const apiKey = process.env.API_KEY;
const MODEL_NAME = 'gemini-2.5-flash';

// Safe Initialization: Only create instance if key exists, otherwise we use fallback
let ai: GoogleGenAI | null = null;
if (apiKey && apiKey.length > 0) {
  try {
    ai = new GoogleGenAI({ apiKey });
  } catch (e) {
    console.warn("Failed to initialize GoogleGenAI client:", e);
  }
} else {
  console.warn("API Key missing. Running in offline/fallback mode.");
}

// CACHE SYSTEM: LocalStorage persistence + Memory Map
const CACHE_KEY = 'harmonia_prompt_cache';
const loadCache = (): Map<string, PromptResult> => {
  try {
    const stored = localStorage.getItem(CACHE_KEY);
    return stored ? new Map(JSON.parse(stored)) : new Map();
  } catch (e) {
    return new Map();
  }
};

const promptCache = loadCache();

const saveCache = () => {
  try {
    // Limit cache size to prevent LS overflow
    if (promptCache.size > 50) {
      const keysToDelete = Array.from(promptCache.keys()).slice(0, 20); // Delete oldest
      keysToDelete.forEach(k => promptCache.delete(k));
    }
    localStorage.setItem(CACHE_KEY, JSON.stringify(Array.from(promptCache.entries())));
  } catch (e) {
    console.warn("Failed to save cache to localStorage");
  }
};

const SYSTEM_INSTRUCTION = `
Act as a Suno AI expert.
Task: Create an optimized music prompt.
Rules:
1. "stylePrompt": dense tags, genres, instruments, bpm. No artist names.
2. "explanation": max 10 words.

Output JSON only.
`;

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    stylePrompt: { type: Type.STRING },
    explanation: { type: Type.STRING },
  },
  required: ["stylePrompt", "explanation"],
  propertyOrdering: ["stylePrompt", "explanation"]
};

// Fallback generator for offline/error states
const generateFallback = (input: string): PromptResult => {
  const genres = ["Pop", "Rock", "Electronic", "Jazz", "Hip Hop", "MPB", "Funk"];
  const randomGenre = genres[Math.floor(Math.random() * genres.length)];
  const baseStyle = input && input.trim() !== "" ? input : randomGenre;
  
  return {
    stylePrompt: `${baseStyle}, energetic, rhythmic, 120bpm, studio quality, clear vocals, professional mix (Offline Mode)`,
    explanation: "Modo Offline (API Key não configurada)"
  };
};

const parseResponse = (response: GenerateContentResponse): PromptResult | null => {
  try {
    const text = response.text;
    if (!text) return null;
    const jsonStr = text.replace(/```json|```/g, '').trim();
    return JSON.parse(jsonStr) as PromptResult;
  } catch (error) {
    console.warn("JSON Parse Warning:", error);
    return null;
  }
};

export const generateSunoPrompt = async (userInput: string): Promise<PromptResult> => {
  const cleanInput = userInput.trim().toLowerCase();
  
  // 1. Cache Check
  if (promptCache.has(cleanInput)) {
    return promptCache.get(cleanInput)!;
  }

  // Safety check for AI client
  if (!ai) {
    return generateFallback(userInput);
  }

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: `Create Suno prompt for: "${userInput}"`,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7,
      }
    });

    const result = parseResponse(response);
    
    if (!result) {
        return generateFallback(userInput);
    }
    
    // 2. Cache Set & Persist
    promptCache.set(cleanInput, result);
    saveCache();
    return result;

  } catch (error) {
    console.error("API Error:", error);
    return generateFallback(userInput);
  }
};

export const generateMagicPrompt = async (currentInput: string): Promise<PromptResult> => {
  // Safety check for AI client
  if (!ai) {
    return generateFallback(currentInput);
  }

  try {
    const isRandom = !currentInput || currentInput.trim() === "";
    
    const userPrompt = isRandom
      ? "Create a unique, random, creative music style."
      : `Create a creative VARIATION of this style: "${currentInput}". Change genre or vibe.`;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 1.3, // Higher temp for magic/creativity
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      }
    });

    const result = parseResponse(response);
    return result || generateFallback(currentInput);
    
  } catch (error) {
    console.error("API Error:", error);
    return generateFallback(currentInput);
  }
};