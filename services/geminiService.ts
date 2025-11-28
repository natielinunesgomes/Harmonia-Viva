import { GoogleGenAI, Type, GenerateContentResponse, Schema } from "@google/genai";
import { PromptResult } from "../types";

// NOTE: process.env.API_KEY is defined in vite.config.ts
const apiKey = process.env.API_KEY;
const MODEL_NAME = 'gemini-2.5-flash';

// --- CONFIGURAÇÃO DA IA ---
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

// --- SISTEMA DE CACHE AVANÇADO (TTL + Size Limit) ---
const CACHE_KEY = 'harmonia_prompt_cache_v2';
const MAX_CACHE_SIZE = 100;
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 horas

interface CacheItem {
  timestamp: number;
  data: PromptResult;
}

// Carrega e limpa itens expirados imediatamente
const loadCache = (): Map<string, CacheItem> => {
  try {
    const stored = localStorage.getItem(CACHE_KEY);
    if (!stored) return new Map();

    const rawMap = new Map<string, CacheItem>(JSON.parse(stored));
    const now = Date.now();
    const validMap = new Map<string, CacheItem>();

    // Garbage Collection on Load
    let hasChanges = false;
    for (const [key, item] of rawMap.entries()) {
      if (now - item.timestamp < CACHE_TTL_MS) {
        validMap.set(key, item);
      } else {
        hasChanges = true;
      }
    }

    if (hasChanges) {
        localStorage.setItem(CACHE_KEY, JSON.stringify(Array.from(validMap.entries())));
    }

    return validMap;
  } catch (e) {
    console.warn("Cache corrupted, resetting.");
    return new Map();
  }
};

const promptCache = loadCache();

const saveCache = () => {
  try {
    // Enforce Size Limit (Remove Oldest)
    if (promptCache.size > MAX_CACHE_SIZE) {
      // Convert to array, sort by timestamp ascending (oldest first), slice excess
      const sortedEntries = Array.from(promptCache.entries())
        .sort(([, a], [, b]) => a.timestamp - b.timestamp);
      
      const entriesToKeep = sortedEntries.slice(promptCache.size - MAX_CACHE_SIZE);
      
      // Rebuild map with only kept entries
      promptCache.clear();
      entriesToKeep.forEach(([k, v]) => promptCache.set(k, v));
    }
    
    localStorage.setItem(CACHE_KEY, JSON.stringify(Array.from(promptCache.entries())));
  } catch (e) {
    console.warn("Failed to save cache to localStorage");
  }
};

// --- ENGENHARIA DE PROMPT (SUNO SPECIALIST) ---

const SYSTEM_INSTRUCTION = `
You are an elite Music Prompt Engineer specialized in Suno AI v3.5 and Udio.
Your goal is to convert user inputs (which may be simple tags or full descriptions) into highly specific, 'token-dense' style prompts that generate professional-grade audio.

RULES FOR 'stylePrompt':
1. STRUCTURE: Genre, Sub-Genre, Specific Instruments, Vibe/Mood, Tempo (BPM), Vocal Style, Production Quality.
2. DENSITY: Do not use sentences. Use comma-separated tags.
3. SPECIFICITY: 
   - Instead of "Rock", use "Post-Punk, distorted bass, fast tempo 160bpm, raw energy".
   - Instead of "Sad", use "Melancholic, minor key, slow ballad, emotional piano, reverb soaked vocals".
4. FORBIDDEN: Do NOT use real artist names (e.g., "Like Taylor Swift"). Use vibe descriptions instead (e.g., "Pop country, polished female vocals, storytelling").
5. LOCALIZATION: If the user types in Portuguese or mentions Brazilian genres (Funk, Sertanejo, MPB), analyze the sub-genre deeply (e.g., "Sertanejo Universitário", "Bossa Nova", "Funk Carioca").

RULES FOR 'explanation':
1. Explain WHY you chose these specific tags in Portuguese (PT-BR).
2. Keep it under 15 words.
3. Focus on the strategy.

OUTPUT FORMAT: JSON only.
`;

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    stylePrompt: { 
      type: Type.STRING,
      description: "The optimized string of tags for Suno AI." 
    },
    explanation: { 
      type: Type.STRING, 
      description: "Short strategic tip in Portuguese."
    },
  },
  required: ["stylePrompt", "explanation"],
  propertyOrdering: ["stylePrompt", "explanation"]
};

// --- FALLBACK GENERATOR ---
const generateFallback = (input: string): PromptResult => {
  const isPortuguese = /[ãéíóúç]/i.test(input);
  const baseInput = input && input.trim() !== "" ? input : "Pop";
  
  return {
    stylePrompt: `${baseInput}, studio quality, radio ready, 120bpm, clear mixing, professional mastering (Offline Mode)`,
    explanation: isPortuguese 
      ? "Modo Offline: Verifique sua API Key ou conexão." 
      : "Offline Mode: Check your API Key or connection."
  };
};

// --- PARSER ---
const parseResponse = (response: GenerateContentResponse): PromptResult | null => {
  try {
    const text = response.text;
    if (!text) return null;
    // Remove markdown code blocks if present
    const jsonStr = text.replace(/```json|```/g, '').trim();
    return JSON.parse(jsonStr) as PromptResult;
  } catch (error) {
    console.warn("JSON Parse Warning:", error);
    return null;
  }
};

// --- MAIN FUNCTIONS ---

export const generateSunoPrompt = async (userInput: string): Promise<PromptResult> => {
  const cleanInput = userInput.trim().toLowerCase();
  const now = Date.now();

  // 1. Cache Check (With TTL Validation)
  if (promptCache.has(cleanInput)) {
    const cachedItem = promptCache.get(cleanInput)!;
    if (now - cachedItem.timestamp < CACHE_TTL_MS) {
      // Refresh timestamp on hit to keep it in cache (LRU logic)
      cachedItem.timestamp = now;
      saveCache();
      return cachedItem.data;
    } else {
      promptCache.delete(cleanInput); // Expired
    }
  }

  // Safety check
  if (!ai) return generateFallback(userInput);

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: `User Input: "${userInput}". \nTask: Construct a high-quality Suno AI style string from these keywords or description.`,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7, 
      }
    });

    const result = parseResponse(response);
    
    if (!result) return generateFallback(userInput);
    
    // 2. Cache Set & Persist
    promptCache.set(cleanInput, { timestamp: now, data: result });
    saveCache();
    return result;

  } catch (error) {
    console.error("API Error:", error);
    return generateFallback(userInput);
  }
};

export const generateMagicPrompt = async (currentInput: string): Promise<PromptResult> => {
  if (!ai) return generateFallback(currentInput);

  try {
    const isRandom = !currentInput || currentInput.trim() === "";
    
    // More complex prompt for "Magic" mode
    const magicPrompt = isRandom
      ? "Create a completely unique, experimental, and high-quality music style definition that blends two unexpected genres."
      : `User Input: "${currentInput}". Task: Remix this concept completely. Change the genre or tempo but keep the emotional core. Make it surprising and unique.`;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: magicPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 1.2, // High creativity
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