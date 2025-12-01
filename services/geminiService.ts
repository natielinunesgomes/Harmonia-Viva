import { GoogleGenAI, Type, GenerateContentResponse, Schema } from "@google/genai";
import { PromptResult } from "../types";

// --- CONSTANTS & CONFIGURATION ---
// Use process.env.API_KEY as per guidelines
const API_KEY = process.env.API_KEY || "";
const MODEL_NAME = 'gemini-2.5-flash';

// --- LRU CACHE IMPLEMENTATION ---
class LRUCache<K, V> {
  private capacity: number;
  private ttl: number;
  private cache: Map<K, { value: V; timestamp: number }>;
  private storageKey: string;

  constructor(capacity: number, ttlMs: number, storageKey: string) {
    this.capacity = capacity;
    this.ttl = ttlMs;
    this.storageKey = storageKey;
    this.cache = new Map();
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (!stored) return;

      const raw = JSON.parse(stored) as Array<[K, { value: V; timestamp: number }]>;
      const now = Date.now();
      
      // Filter expired items during load
      raw.forEach(([key, item]) => {
        if (now - item.timestamp < this.ttl) {
          this.cache.set(key, item);
        }
      });
    } catch (e) {
      console.warn("Cache corrupted, resetting.", e);
      this.cache.clear();
    }
  }

  private saveToStorage(): void {
    try {
      const serialized = JSON.stringify(Array.from(this.cache.entries()));
      localStorage.setItem(this.storageKey, serialized);
    } catch (e) {
      console.warn("Failed to save cache", e);
    }
  }

  get(key: K): V | undefined {
    const item = this.cache.get(key);
    if (!item) return undefined;

    const now = Date.now();
    if (now - item.timestamp > this.ttl) {
      this.cache.delete(key);
      this.saveToStorage();
      return undefined;
    }

    // Refresh LRU order: delete and re-set
    this.cache.delete(key);
    this.cache.set(key, item); 
    this.saveToStorage(); // Optional: might be expensive to save on every read, but ensures order persistence
    return item.value;
  }

  set(key: K, value: V): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      // Remove the first item (least recently used in Map)
      const firstKey = this.cache.keys().next().value;
      if (firstKey !== undefined) this.cache.delete(firstKey);
    }

    this.cache.set(key, { value, timestamp: Date.now() });
    this.saveToStorage();
  }
}

// Initialize Cache
const promptCache = new LRUCache<string, PromptResult>(
  100, // Max items
  24 * 60 * 60 * 1000, // 24h TTL
  'harmonia_prompt_cache_v4'
);

// --- API CLIENT ---
let client: GoogleGenAI | null = null;
try {
  if (API_KEY) {
    client = new GoogleGenAI({ apiKey: API_KEY });
  } else {
    console.warn("API Key missing. Service running in fallback mode.");
  }
} catch (e) {
  console.error("Failed to initialize GoogleGenAI:", e);
}

// --- PROMPT ENGINEERING ---
const SYSTEM_INSTRUCTION = `
You are an elite Audio Engineer and Music Producer, specialized in "Suno AI v3.5 God Mode".
Your goal is to construct acoustically dense, high-fidelity style prompts.

CORE PHILOSOPHY: "SONIC ARCHITECTURE"
Do not just list genres. You must build the sound layer by layer.

STRUCTURE REQUIRED (Comma separated tags):
1. [META]: Genre, Sub-genre, BPM (if specified), Key (e.g., C Minor).
2. [FOUNDATION]: Drums (e.g., "Thunderous 808", "Brush Snare"), Bass (e.g., "Reese Bass", "Upright Bass").
3. [TEXTURE]: Instruments (e.g., "Glassy Synths", "Distorted Stratocaster"), Atmosphere (e.g., "Smoky", "Ethereal").
4. [LEAD/VOCAL]: 
   - IF INSTRUMENTAL: Define the lead melody instrument (e.g., "Soaring Saxophone Solo Lead").
   - IF VOCAL: Define vocal texture (e.g., "Gritty Male Vocals", "Breathy Female Vocals").
5. [PRODUCTION]: Mixing keywords (e.g., "Panoramic Stereo", "Warm Tape Saturation", "Crisp Highs", "Wall of Sound").

RULES:
- EXPAND: If user says "Rock", output "Arena Rock, High-gain distortion, Power Drums, Stadium Reverb".
- LOCALIZATION: For Brazilian styles, use native terms mixed with English production terms.
- FORMAT: No sentences. Only tags.

OUTPUT JSON:
{
  "stylePrompt": "The optimized tag string",
  "explanation": "A 10-word strategic audio tip in Portuguese (PT-BR)."
}
`;

const RESPONSE_SCHEMA: Schema = {
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

// --- TYPES ---
export interface PromptOptions {
  bpm?: number;
  isInstrumental?: boolean;
}

// --- HELPER FUNCTIONS ---

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

const parseResponse = (response: GenerateContentResponse): PromptResult | null => {
  try {
    const text = response.text;
    if (!text) return null;
    // Sanitize markdown code blocks if present
    const jsonStr = text.replace(/```json|```/g, '').trim();
    return JSON.parse(jsonStr) as PromptResult;
  } catch (error) {
    console.warn("JSON Parse Warning:", error);
    return null;
  }
};

// --- PUBLIC API ---

export const generateSunoPrompt = async (userInput: string, options?: PromptOptions): Promise<PromptResult> => {
  const cleanInput = userInput.trim().toLowerCase();
  
  // Create a deterministic cache key based on inputs
  const cacheKey = JSON.stringify({
    input: cleanInput,
    bpm: options?.bpm,
    instr: options?.isInstrumental,
    ver: 'v4' // Increment this to invalidate old caches if logic changes
  });

  // 1. Check Cache
  const cached = promptCache.get(cacheKey);
  if (cached) return cached;

  if (!client) return generateFallback(userInput, options);

  try {
    let promptContext = `User Input: "${userInput}".\n`;
    
    if (options?.isInstrumental) {
      promptContext += "CONSTRAINT: This MUST be an INSTRUMENTAL track. You MUST define a 'Lead Instrument' for the melody.\n";
    } else {
      promptContext += "CONSTRAINT: Include specific Vocal Texture tags.\n";
    }
    
    if (options?.bpm) {
      promptContext += `CONSTRAINT: Target Tempo is ${options.bpm} BPM.\n`;
    }

    const response = await client.models.generateContent({
      model: MODEL_NAME,
      contents: promptContext + "Task: Construct a 'God Mode' Suno AI style string.",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: RESPONSE_SCHEMA,
        temperature: 0.75, 
      }
    });

    const result = parseResponse(response);
    
    if (!result) throw new Error("Empty or invalid response from AI");
    
    // 2. Set Cache
    promptCache.set(cacheKey, result);
    return result;

  } catch (error) {
    console.error("Gemini API Error:", error);
    return generateFallback(userInput, options);
  }
};

export const generateMagicPrompt = async (currentInput: string): Promise<PromptResult> => {
  if (!client) return generateFallback(currentInput);

  try {
    const isRandom = !currentInput || currentInput.trim() === "";
    
    const magicPrompt = isRandom
      ? "Create a 'Suno God Mode' style for a completely unique, experimental music genre fusion that sounds expensive."
      : `User Input: "${currentInput}". Task: Remix this concept into a 'Grammy Winning' production. Change the genre but keep the emotion. Make it sound HD.`;

    const response = await client.models.generateContent({
      model: MODEL_NAME,
      contents: magicPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 1.1, // Higher temperature for "Magic" randomness
        responseMimeType: "application/json",
        responseSchema: RESPONSE_SCHEMA,
      }
    });

    const result = parseResponse(response);
    if (!result) throw new Error("Invalid Magic Response");
    return result;
    
  } catch (error) {
    console.error("Gemini Magic Error:", error);
    return generateFallback(currentInput);
  }
};