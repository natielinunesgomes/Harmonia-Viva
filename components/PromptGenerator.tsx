import React, { useState, useCallback } from 'react';
import { Wand2, Copy, Check, Music, Loader2, Sparkles, Zap } from 'lucide-react';
import { generateSunoPrompt, generateMagicPrompt } from '../services/geminiService';
import { PromptResult } from '../types';

export const PromptGenerator: React.FC = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<PromptResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Memoized handlers to prevent unnecessary re-creations
  const handleGenerate = useCallback(async () => {
    if (!input.trim()) return;
    setLoading(true);
    setCopied(false);
    // Slight delay to allow UI to update to loading state before thread blocks (though async handles this, it feels smoother)
    try {
      const data = await generateSunoPrompt(input);
      setResult(data);
    } finally {
      setLoading(false);
    }
  }, [input]);

  const handleMagic = useCallback(async () => {
    setLoading(true);
    setCopied(false);
    try {
      const data = await generateMagicPrompt(input);
      setResult(data);
    } finally {
      setLoading(false);
    }
  }, [input]);

  const copyToClipboard = useCallback(() => {
    if (result?.stylePrompt) {
      navigator.clipboard.writeText(result.stylePrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [result]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-fade-in">
          Gerador de Estilos
        </h2>
        <p className="text-gray-400 max-w-lg mx-auto text-sm md:text-base">
          Descreva sua ideia e deixe nossa IA criar o prompt perfeito para o Suno AI.
        </p>
      </div>

      <div className="bg-suno-card border border-gray-800 rounded-2xl p-4 md:p-6 shadow-2xl shadow-black/50">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl opacity-20 group-hover:opacity-40 transition duration-500 blur"></div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleGenerate();
                }
              }}
              placeholder="Descreva o que você quer ouvir... (Ex: Um funk triste sobre um amor perdido, estilo anos 90)"
              className="relative w-full h-40 bg-gray-900 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none resize-none transition-all text-lg"
            />
          </div>
          
          <div className="flex flex-col gap-3 justify-center lg:min-w-[220px]">
            {/* Gerar Prompt Button with Tooltip */}
            <div className="relative group w-full">
              <button
                onClick={handleGenerate}
                disabled={loading || !input.trim()}
                className="h-12 w-full bg-pink-600 hover:bg-pink-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold text-sm md:text-base flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-pink-500/20 active:scale-95 relative z-10"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5 fill-current" />}
                Gerar Prompt
              </button>
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-800 text-gray-200 text-xs rounded-lg shadow-xl border border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20">
                Cria um prompt otimizado com base na sua descrição
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
              </div>
            </div>
            
            {/* Varinha Mágica Button with Tooltip */}
            <div className="relative group w-full">
              <button
                onClick={handleMagic}
                disabled={loading}
                className="h-12 w-full bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-violet-500 disabled:opacity-50 text-white rounded-xl font-semibold text-sm md:text-base flex items-center justify-center gap-2 transition-all shadow-lg group-hover/btn active:scale-95 relative z-10"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin text-violet-400" />
                ) : (
                  <Wand2 className="w-5 h-5 text-violet-400 group-hover:rotate-12 transition-transform" />
                )}
                Varinha Mágica
              </button>
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-800 text-gray-200 text-xs rounded-lg shadow-xl border border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20">
                Gera uma variação criativa e única do estilo
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {result && (
        <div className="animate-fade-in space-y-6">
          {/* Style Result Card */}
          <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <Sparkles className="w-32 h-32 text-white" />
            </div>
            
            <div className="flex justify-between items-center mb-3">
              <label className="text-xs font-bold text-pink-500 uppercase tracking-widest flex items-center gap-1">
                <Music className="w-3 h-3" /> Copie e cole no Suno
              </label>
              {result.explanation && (
                <span className="text-xs text-gray-500 hidden sm:inline-block max-w-[200px] truncate text-right">
                  Dica: {result.explanation}
                </span>
              )}
            </div>
            
            <div className="bg-gray-800/50 rounded-xl p-1 pl-4 border border-gray-700/50 flex items-center justify-between gap-4 backdrop-blur-sm group hover:border-pink-500/30 transition-colors">
              <p className="font-mono text-base md:text-lg text-green-400 py-3 leading-snug break-words flex-1">
                {result.stylePrompt}
              </p>
              <button
                onClick={copyToClipboard}
                className="h-full px-4 py-3 hover:bg-white/10 rounded-r-lg transition-colors text-gray-400 hover:text-white shrink-0 border-l border-gray-700/50"
                title="Copiar prompt"
              >
                {copied ? <Check className="w-6 h-6 text-green-500 scale-110" /> : <Copy className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};