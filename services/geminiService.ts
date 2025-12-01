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
const CACHE_KEY = 'harmonia_prompt_cache_v3';
const MAX_CACHE_SIZE = 100;
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 horas

interface CacheItem {
  timestamp: number;
  data: PromptResult;
}

interface PromptOptions {
  bpm?: number;
  isInstrumental?: boolean;
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
      const sortedEntries = Array.from(promptCache.entries())
        .sort(([, a], [, b]) => a.timestamp - b.timestamp);
      
      const entriesToKeep = sortedEntries.slice(promptCache.size - MAX_CACHE_SIZE);
      
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
Your goal is to convert user inputs into highly specific, 'token-dense' style prompts.

IMPORTANT TECHNICAL FLAGS:
1. INSTRUMENTAL: If the user requests "Instrumental", you MUST start the prompt with "Instrumental," and remove any vocal tags (like "male vocals", "choir").
2. BPM: If a BPM is provided, you MUST include it (e.g., "128bpm").

RULES FOR 'stylePrompt':
1. STRUCTURE: [Instrumental Flag?], Genre, Sub-Genre, Vibe/Mood, Instruments, Technical Elements, BPM.
2. DENSITY: Use comma-separated tags. No sentences.
3. SPECIFICITY: 
   - Instead of "Rock", use "Post-Punk, distorted bass, raw energy".
   - Instead of "Sad", use "Melancholic, minor key, slow ballad, emotional piano".
4. FORBIDDEN: Do NOT use real artist names. Use vibe descriptions.
5. LOCALIZATION: Translate Brazilian genres deeply (e.g., "Sertanejo Universitário", "Bossa Nova", "Funk Carioca").

RULES FOR 'explanation':
1. Explain WHY you chose these specific tags in Portuguese (PT-BR).
2. Keep it under 15 words.

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
const generateFallback = (input: string, options?: PromptOptions): PromptResult => {
  const isPortuguese = /[ãéíóúç]/i.test(input);
  const baseInput = input && input.trim() !== "" ? input : "Pop";
  
  let result = `${baseInput}, studio quality, radio ready`;
  
  if (options?.isInstrumental) {
    result = `Instrumental, ${result}`;
  } else {
    result += ", clear vocals";
  }
  
  if (options?.bpm) {
    result += `, ${options.bpm}bpm`;
  }
  
  return {
    stylePrompt: `${result}, professional mastering (Offline Mode)`,
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
    const jsonStr = text.replace(/```json|```/g, '').trim();
    return JSON.parse(jsonStr) as PromptResult;
  } catch (error) {
    console.warn("JSON Parse Warning:", error);
    return null;
  }
};

// --- MAIN FUNCTIONS ---

export const generateSunoPrompt = async (userInput: string, options?: PromptOptions): Promise<PromptResult> => {
  const cleanInput = userInput.trim().toLowerCase();
  const bpmKey = options?.bpm ? `_${options.bpm}` : '';
  const instrKey = options?.isInstrumental ? '_instr' : '';
  const cacheKey = `${cleanInput}${bpmKey}${instrKey}`;
  const now = Date.now();

  // 1. Cache Check
  if (promptCache.has(cacheKey)) {
    const cachedItem = promptCache.get(cacheKey)!;
    if (now - cachedItem.timestamp < CACHE_TTL_MS) {
      cachedItem.timestamp = now;
      saveCache();
      return cachedItem.data;
    } else {
      promptCache.delete(cacheKey);
    }
  }

  if (!ai) return generateFallback(userInput, options);

  try {
    // Construct Context
    let promptContext = `User Input: "${userInput}".\n`;
    if (options?.isInstrumental) {
      promptContext += "CONSTRAINT: This must be an INSTRUMENTAL track. No vocals.\n";
    } else {
      promptContext += "CONSTRAINT: Include Vocal tags (e.g. Male, Female).\n";
    }
    
    if (options?.bpm) {
      promptContext += `CONSTRAINT: Target Tempo is ${options.bpm} BPM.\n`;
    }

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: promptContext + "Task: Construct a high-quality Suno AI style string.",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7, 
      }
    });

    const result = parseResponse(response);
    
    if (!result) return generateFallback(userInput, options);
    
    // 2. Cache Set
    promptCache.set(cacheKey, { timestamp: now, data: result });
    saveCache();
    return result;

  } catch (error) {
    console.error("API Error:", error);
    return generateFallback(userInput, options);
  }
};

export const generateMagicPrompt = async (currentInput: string): Promise<PromptResult> => {
  if (!ai) return generateFallback(currentInput);

  try {
    const isRandom = !currentInput || currentInput.trim() === "";
    
    const magicPrompt = isRandom
      ? "Create a completely unique, experimental music style blending two unexpected genres."
      : `User Input: "${currentInput}". Task: Remix this concept. Change genre/tempo but keep the core emotion. Make it unique.`;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: magicPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 1.2,
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