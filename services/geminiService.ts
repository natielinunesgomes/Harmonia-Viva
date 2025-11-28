import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { PromptResult } from "../types";

// Helper to get API Key safely in Vite/Vercel environment
const getApiKey = (): string | undefined => {
  try {
    // Vite environment standard
    if (import.meta.env && import.meta.env.VITE_API_KEY) {
      return import.meta.env.VITE_API_KEY;
    }
  } catch (e) {
    // Ignore error if import.meta is not available
  }

  try {
    // Node environment fallback (if needed for some SSR setups)
    if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
      return process.env.API_KEY;
    }
  } catch (e) {
    // Ignore error if process is not available
  }
  
  return undefined;
};

const apiKey = getApiKey();
const ai = new GoogleGenAI({ apiKey: apiKey || '' });
const MODEL_NAME = 'gemini-2.5-flash';

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

// Optimized system instruction - Removed lyrics structure for speed
const SYSTEM_INSTRUCTION = `
Act as a Suno AI expert. Output JSON only. No markdown.
Task: Create an optimized music prompt.
Rules:
1. "stylePrompt": dense tags, genres, instruments, bpm. No artist names.
2. "explanation": max 10 words.

JSON Format:
{"stylePrompt": "string", "explanation": "string"}
`;

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    stylePrompt: { type: Type.STRING },
    explanation: { type: Type.STRING },
  },
  required: ["stylePrompt", "explanation"]
};

// Fallback generator for when API fails or returns empty (ensures "absurdly fast" perception even on error)
const generateFallback = (input: string): PromptResult => {
  const genres = ["Pop", "Rock", "Electronic", "Jazz", "Hip Hop", "MPB", "Funk"];
  const randomGenre = genres[Math.floor(Math.random() * genres.length)];
  const baseStyle = input ? input : randomGenre;
  
  return {
    stylePrompt: `${baseStyle}, energetic, rhythmic, 120bpm, studio quality, clear vocals, professional mix`,
    explanation: "Modo Turbo (Offline)"
  };
};

const parseResponse = (response: GenerateContentResponse): PromptResult | null => {
  try {
    const text = response.text;
    if (!text) return null;
    // Sanitize response to ensure JSON parsing works
    const jsonStr = text.replace(/```json|```/g, '').trim();
    return JSON.parse(jsonStr) as PromptResult;
  } catch (error) {
    console.warn("JSON Parse Warning:", error);
    return null;
  }
};

export const generateSunoPrompt = async (userInput: string): Promise<PromptResult> => {
  if (!apiKey) {
    console.warn("API Key missing. Using fallback.");
    return generateFallback(userInput);
  }

  const cleanInput = userInput.trim().toLowerCase();
  
  // 1. Cache Check (Instant Return)
  if (promptCache.has(cleanInput)) {
    return promptCache.get(cleanInput)!;
  }

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: `Create Suno prompt for: "${userInput}"`,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        maxOutputTokens: 200, 
        temperature: 0.7, 
        thinkingConfig: { thinkingBudget: 0 },
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
  if (!apiKey) return generateFallback(currentInput);

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
        maxOutputTokens: 200,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        thinkingConfig: { thinkingBudget: 0 },
      }
    });

    const result = parseResponse(response);
    return result || generateFallback(currentInput);
    
  } catch (error) {
    return generateFallback(currentInput);
  }
};