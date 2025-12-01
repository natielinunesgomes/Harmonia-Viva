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

// --- ENGENHARIA DE PROMPT (SUNO GOD MODE) ---

const SYSTEM_INSTRUCTION = `
You are an elite Audio Engineer and Music Producer, specialized in "Suno AI v3.5 God Mode".
Your goal is to construct acoustically dense, high-fidelity style prompts.

CORE PHILOSOPHY: "SONIC ARCHITECTURE"
Do not just list genres. You must build the sound layer by layer.

STRUCTURE REQUIRED (Comma separated):
1. [META]: Genre, Sub-genre, BPM (if specified), Key (e.g., C Minor).
2. [FOUNDATION]: Drums (e.g., "Thunderous 808", "Brush Snare"), Bass (e.g., "Reese Bass", "Upright Bass").
3. [TEXTURE]: Instruments (e.g., "Glassy Synths", "Distorted Stratocaster"), Atmosphere (e.g., "Smoky", "Ethereal").
4. [LEAD/VOCAL]: 
   - IF INSTRUMENTAL: Define the lead melody instrument (e.g., "Soaring Saxophone Solo Lead", "Melodic Piano Lead").
   - IF VOCAL: Define vocal texture (e.g., "Gritty Male Vocals", "Breathy Female Vocals", "Auto-tuned Flow").
5. [PRODUCTION]: Mixing keywords (e.g., "Panoramic Stereo", "Warm Tape Saturation", "Crisp Highs", "Wall of Sound").

RULES:
- EXPAND: If user says "Rock", output "Arena Rock, High-gain distortion, Power Drums, Stadium Reverb".
- BRAZILIAN LOCALIZATION: For Brazilian styles, use native terms mixed with English production terms (e.g., "Cavaquinho", "Surdo Pattern", "Favela Funk Beat").
- NO SENTENCES. Only tags.

OUTPUT JSON:
{
  "stylePrompt": "The optimized tag string",
  "explanation": "A 10-word strategic audio tip in Portuguese (PT-BR)."
}
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
  
  let result = `${baseInput}, studio quality, radio ready, panoramic stereo`;
  
  if (options?.isInstrumental) {
    result = `Instrumental, ${result}, melodic lead instrument`;
  } else {
    result += ", clear vocals, high fidelity";
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
  const cacheKey = `${cleanInput}${bpmKey}${instrKey}_godmode`; // Changed key to force refresh for new logic
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
      promptContext += "CONSTRAINT: This MUST be an INSTRUMENTAL track. You MUST define a 'Lead Instrument' for the melody (e.g., Piano Solo, Guitar Riff) or it will be boring.\n";
    } else {
      promptContext += "CONSTRAINT: Include specific Vocal Texture tags (Male/Female/Choir/etc).\n";
    }
    
    if (options?.bpm) {
      promptContext += `CONSTRAINT: Target Tempo is ${options.bpm} BPM.\n`;
    }

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: promptContext + "Task: Construct a 'God Mode' Suno AI style string.",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.75, // Slightly higher for creativity within structure
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
      ? "Create a 'Suno God Mode' style for a completely unique, experimental music genre fusion that sounds expensive."
      : `User Input: "${currentInput}". Task: Remix this concept into a 'Grammy Winning' production. Change the genre but keep the emotion. Make it sound HD.`;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: magicPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 1.1, // High creativity
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