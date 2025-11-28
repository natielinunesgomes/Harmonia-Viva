import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { PromptResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const MODEL_NAME = 'gemini-2.5-flash';

// In-memory cache for instant retrieval of repeated queries
const promptCache = new Map<string, PromptResult>();

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
    return JSON.parse(text.replace(/```json|```/g, '').trim()) as PromptResult;
  } catch (error) {
    console.warn("JSON Parse Warning:", error);
    return null;
  }
};

export const generateSunoPrompt = async (userInput: string): Promise<PromptResult> => {
  if (!process.env.API_KEY) {
    console.error("API Key not found. Please check your .env file.");
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
        maxOutputTokens: 200, // Reduced token limit since we removed lyrics structure
        temperature: 0.7, 
        thinkingConfig: { thinkingBudget: 0 },
      }
    });

    const result = parseResponse(response);
    
    if (!result) {
        // If API returns empty or invalid JSON, use fallback to keep UI responsive
        const fallback = generateFallback(userInput);
        return fallback;
    }
    
    // 2. Cache Set
    promptCache.set(cleanInput, result);
    return result;

  } catch (error) {
    console.error("API Error:", error);
    // Return fallback on network error instead of blocking UI
    return generateFallback(userInput);
  }
};

export const generateMagicPrompt = async (currentInput: string): Promise<PromptResult> => {
  if (!process.env.API_KEY) return generateFallback(currentInput);

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
        temperature: 1.3,
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