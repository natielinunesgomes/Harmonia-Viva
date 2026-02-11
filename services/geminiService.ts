
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { PromptResult } from "../types";

// NOTE: process.env.API_KEY is defined in vite.config.ts
const apiKey = process.env.API_KEY;
// Using gemini-3-pro-preview for advanced prompt engineering tasks
const MODEL_NAME = 'gemini-3-pro-preview';

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
const CACHE_KEY = 'harmonia_prompt_cache_v5'; // Updated cache key version
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

// --- ENGENHARIA DE PROMPT (SUNO V5 OPTIMIZED - PROFESSIONAL TONE) ---

const SYSTEM_INSTRUCTION = `
You are an expert Audio Engineer specializing in "Suno AI v5 Beta".
Suno v5 understands natural language better but still thrives on specific "Anchor Tags" for genre and vibe.

YOUR GOAL: Create high-fidelity, photorealistic audio prompts using professional terminology.

STRATEGY (THE V5 HYBRID METHOD):
Mix strict genre tags with descriptive atmospheric phrases.

STRUCTURE REQUIRED:
1. [CORE GENRE]: Main style + Sub-genre (e.g., "Future Bass, Neo-Soul").
2. [VIBE/ATMOSPHERE]: Descriptive adjectives (e.g., "Ethereal, Smoky atmosphere, Late night drive feeling").
3. [SOUND DESIGN]: Specific instruments or textures (e.g., "Crisp 808s, Glassy Synths, Warm Analog Tape Saturation").
4. [VOCAL FIDELITY]: v5 specific vocal tags (e.g., "Intimate breathy vocals, High-fidelity recording, Raw emotional performance").
5. [TECHNICAL]: (e.g., "Wide Stereo, Studio Quality, 4k Audio").

RULES:
- FOR PORTUGUESE INPUTS: Adapt the style to fit the cultural context but keep technical terms in English (e.g., "Sertanejo Universitário, Acoustic Guitar, Stadium Reverb").
- INSTRUMENTAL: If instrumental, emphasize "Lead Instrument" (e.g., "Soaring Electric Guitar Solo").
- NO SENTENCES IN THE OUTPUT PROMPT. Comma-separated tags only.
- EXPLANATION TONE: Professional, concise, and technical. Avoid playful or childish language.

OUTPUT JSON:
{
  "stylePrompt": "The optimized tag string",
  "explanation": "A short, technical explanation (in PT-BR) of the prompt engineering choices."
}
`;

// Define responseSchema as an object literal to avoid deprecated Schema usage
const responseSchema = {
  type: Type.OBJECT,
  properties: {
    stylePrompt: { 
      type: Type.STRING,
      description: "The optimized string of tags for Suno AI v5." 
    },
    explanation: { 
      type: Type.STRING, 
      description: "Technical tip in Portuguese."
    },
  },
  required: ["stylePrompt", "explanation"],
  propertyOrdering: ["stylePrompt", "explanation"]
};

// --- FALLBACK GENERATOR ---
const generateFallback = (input: string, options?: PromptOptions): PromptResult => {
  const isPortuguese = /[ãéíóúç]/i.test(input);
  const baseInput = input && input.trim() !== "" ? input : "Pop";
  
  let result = `${baseInput}, High Fidelity, 4k Audio, Studio Quality`;
  
  if (options?.isInstrumental) {
    result = `Instrumental, ${result}, virtuosic lead melody`;
  } else {
    result += ", Clear Vocals, Raw Emotion";
  }
  
  if (options?.bpm) {
    result += `, ${options.bpm}bpm`;
  }
  
  return {
    stylePrompt: `${result}, Masterpiece`,
    explanation: isPortuguese 
      ? "Modo Offline: Verifique sua API Key. Gerando prompt técnico v5." 
      : "Offline Mode: Technical v5 prompt generated."
  };
};

// --- PARSER ---
const parseResponse = (response: GenerateContentResponse): PromptResult | null => {
  try {
    // Correctly using .text property instead of .text() method
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
  const cacheKey = `${cleanInput}${bpmKey}${instrKey}_v5_pro`; 
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
    let promptContext = `User Idea: "${userInput}".\n`;
    if (options?.isInstrumental) {
      promptContext += "CONSTRAINT: INSTRUMENTAL TRACK. Focus on 'Musical Narrative' and 'Lead Instruments'.\n";
    } else {
      promptContext += "CONSTRAINT: Define Vocal Type (e.g., Male/Female, Gritty/Soft).\n";
    }
    
    if (options?.bpm) {
      promptContext += `CONSTRAINT: Tempo ${options.bpm} BPM.\n`;
    }

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: promptContext + "Task: Create a professional Suno v5 Beta style string.",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7, // Slightly lower temp for more consistent/professional results
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
      ? "Create a 'Suno v5' style for a sophisticated, avant-garde genre fusion suitable for commercial production."
      : `User Idea: "${currentInput}". Task: Upgrade this to a v5 'Audio Masterpiece'. Add professional textures and sound design.`;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: magicPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 1.1, 
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
