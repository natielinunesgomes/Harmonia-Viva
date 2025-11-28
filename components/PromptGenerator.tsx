import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Wand2, Copy, Check, Zap, Sparkles, RefreshCcw, History, Music2, Trash2, Mic2 } from 'lucide-react';
import { generateSunoPrompt, generateMagicPrompt } from '../services/geminiService';
import { PromptResult, PromptHistoryItem } from '../types';

// --- CONSTANTES E OPÇÕES DO MODO GUIADO ---
const GENRES = [
  { id: 'pop', label: 'Pop', color: 'bg-pink-500' },
  { id: 'rock', label: 'Rock / Metal', color: 'bg-red-600' },
  { id: 'eletronic', label: 'Eletrônica', color: 'bg-blue-500' },
  { id: 'hiphop', label: 'Hip Hop / Trap', color: 'bg-yellow-500' },
  { id: 'acoustic', label: 'Acústico / Folk', color: 'bg-green-600' },
  { id: 'brazilian', label: 'Brasileiro (Funk/Sertanejo)', color: 'bg-green-500' },
  { id: 'cinematic', label: 'Trilha Sonora', color: 'bg-purple-600' },
  { id: 'jazz', label: 'Jazz / Blues', color: 'bg-orange-600' }
];

const VIBES = [
  'Energético', 'Melancólico', 'Sombrio', 'Relaxante', 'Romântico', 'Épico', 'Futurista', 'Nostálgico'
];

const VOCALS = [
  'Voz Masculina', 'Voz Feminina', 'Dueto', 'Coral', 'Instrumental (Sem Voz)', 'Voz com Autotune'
];

export const PromptGenerator: React.FC = () => {
  // Estado Principal
  const [mode, setMode] = useState<'guided' | 'free'>('guided');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<PromptHistoryItem[]>([]);
  const [currentResult, setCurrentResult] = useState<PromptResult | null>(null);
  
  // Estado do Modo Guiado
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [selectedVibe, setSelectedVibe] = useState<string>('');
  const [selectedVocal, setSelectedVocal] = useState<string>('');
  const [extraDetails, setExtraDetails] = useState('');

  // Estado do Modo Livre
  const [freeInput, setFreeInput] = useState('');

  // Estado de UI
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Scroll para o resultado quando gerado
  useEffect(() => {
    if (currentResult && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentResult]);

  const addToHistory = (result: PromptResult, input: string) => {
    const newItem: PromptHistoryItem = {
      ...result,
      id: Date.now().toString(),
      timestamp: Date.now(),
      originalInput: input
    };
    setHistory(prev => [newItem, ...prev].slice(0, 10)); // Mantém os últimos 10
    setCurrentResult(result);
  };

  const constructPromptFromTags = () => {
    const parts = [];
    if (selectedGenre) parts.push(`Gênero: ${selectedGenre}`);
    if (selectedVibe) parts.push(`Vibe: ${selectedVibe}`);
    if (selectedVocal) parts.push(`Voz: ${selectedVocal}`);
    if (extraDetails) parts.push(`Detalhes extras: ${extraDetails}`);
    return parts.join(', ');
  };

  const handleGenerate = async () => {
    const input = mode === 'guided' ? constructPromptFromTags() : freeInput;
    
    if (!input.trim()) return;

    setLoading(true);
    try {
      const result = await generateSunoPrompt(input);
      addToHistory(result, input);
    } finally {
      setLoading(false);
    }
  };

  const handleMagic = async () => {
    setLoading(true);
    try {
      const input = mode === 'guided' ? constructPromptFromTags() : freeInput;
      const result = await generateMagicPrompt(input);
      addToHistory(result, "Magic Mode: " + (input || "Surpresa"));
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearHistory = () => {
    setHistory([]);
    setCurrentResult(null);
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 min-h-[600px]">
      
      {/* COLUNA ESQUERDA: CONTROLES */}
      <div className="flex-1 space-y-6">
        
        <div className="text-center lg:text-left space-y-2 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center justify-center lg:justify-start gap-3">
            <Sparkles className="text-pink-500 w-8 h-8" /> Gerador de Estilos
          </h2>
          <p className="text-gray-400">Crie prompts profissionais para o Suno v3.5 em segundos.</p>
        </div>

        {/* MÓDULO DE SELEÇÃO */}
        <div className="bg-suno-card border border-gray-800 rounded-2xl p-1 overflow-hidden shadow-2xl">
          {/* Tabs */}
          <div className="flex border-b border-gray-800">
            <button
              onClick={() => setMode('guided')}
              className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 ${
                mode === 'guided' ? 'bg-gray-800 text-white' : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800/50'
              }`}
            >
              <Zap className="w-4 h-4" /> Modo Guiado
            </button>
            <button
              onClick={() => setMode('free')}
              className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 ${
                mode === 'free' ? 'bg-gray-800 text-white' : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800/50'
              }`}
            >
              <Mic2 className="w-4 h-4" /> Modo Livre
            </button>
          </div>

          <div className="p-6 space-y-6">
            
            {mode === 'guided' ? (
              <div className="space-y-6 animate-fade-in">
                {/* Gênero */}
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase mb-3 block">1. Escolha o Gênero</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {GENRES.map((g) => (
                      <button
                        key={g.id}
                        onClick={() => setSelectedGenre(g.label)}
                        className={`p-3 rounded-lg text-xs md:text-sm font-medium transition-all border ${
                          selectedGenre === g.label 
                            ? `${g.color} text-white border-transparent shadow-lg scale-105` 
                            : 'bg-gray-900 text-gray-400 border-gray-700 hover:border-gray-500'
                        }`}
                      >
                        {g.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Vibe e Voz */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase mb-3 block">2. A Vibe</label>
                    <div className="flex flex-wrap gap-2">
                      {VIBES.map((v) => (
                        <button
                          key={v}
                          onClick={() => setSelectedVibe(v)}
                          className={`px-3 py-2 rounded-full text-xs font-medium border transition-all ${
                            selectedVibe === v
                              ? 'bg-violet-600 text-white border-transparent'
                              : 'bg-gray-900 text-gray-400 border-gray-700 hover:border-gray-500'
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase mb-3 block">3. Vocais</label>
                    <div className="flex flex-wrap gap-2">
                      {VOCALS.map((v) => (
                        <button
                          key={v}
                          onClick={() => setSelectedVocal(v)}
                          className={`px-3 py-2 rounded-full text-xs font-medium border transition-all ${
                            selectedVocal === v
                              ? 'bg-pink-600 text-white border-transparent'
                              : 'bg-gray-900 text-gray-400 border-gray-700 hover:border-gray-500'
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Detalhes Extras */}
                <div>
                   <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">4. Toque Final (Opcional)</label>
                   <input 
                      type="text"
                      value={extraDetails}
                      onChange={(e) => setExtraDetails(e.target.value)}
                      placeholder="Ex: Solo de saxofone, bpm rápido, estilo anos 80..."
                      className="w-full bg-black/30 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-600 focus:ring-2 focus:ring-violet-500 outline-none text-sm"
                   />
                </div>
              </div>
            ) : (
              <div className="animate-fade-in">
                <label className="text-xs font-bold text-gray-500 uppercase mb-3 block">Descreva sua ideia</label>
                <textarea
                  value={freeInput}
                  onChange={(e) => setFreeInput(e.target.value)}
                  placeholder="Descreva o que você quer ouvir... (Ex: Um funk triste sobre um amor perdido, estilo anos 90)"
                  className="w-full h-48 bg-black/30 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-600 focus:ring-2 focus:ring-pink-500 outline-none resize-none"
                />
              </div>
            )}

            {/* Ações */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleGenerate}
                disabled={loading || (mode === 'free' && !freeInput.trim()) || (mode === 'guided' && !selectedGenre)}
                className="flex-1 h-12 bg-pink-600 hover:bg-pink-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-pink-500/20 active:scale-95"
              >
                {loading ? <RefreshCcw className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5 fill-current" />}
                Gerar Estilo
              </button>
              
              <button
                onClick={handleMagic}
                disabled={loading}
                className="h-12 w-14 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-violet-500 text-violet-400 rounded-xl flex items-center justify-center transition-all active:scale-95"
                title="Modo Surpresa (Magic)"
              >
                <Wand2 className="w-6 h-6" />
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* COLUNA DIREITA: RESULTADOS E HISTÓRICO */}
      <div className="w-full lg:w-[400px] flex flex-col gap-6">
        
        {/* Resultado Principal */}
        <div ref={resultRef} className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl min-h-[160px]">
          <div className="bg-gray-800/50 p-4 border-b border-gray-800 flex justify-between items-center">
            <h3 className="font-bold text-white flex items-center gap-2">
              <Music2 className="w-4 h-4 text-green-400" /> Resultado
            </h3>
            {currentResult && currentResult.explanation && (
               <span className="text-[10px] bg-gray-700 px-2 py-1 rounded text-gray-300 truncate max-w-[200px]">
                 {currentResult.explanation}
               </span>
            )}
          </div>
          
          <div className="p-6 flex flex-col items-center justify-center h-full min-h-[200px]">
             {loading ? (
               <div className="text-center space-y-3">
                 <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                 <p className="text-gray-400 text-sm animate-pulse">Criando a fórmula perfeita...</p>
               </div>
             ) : currentResult ? (
               <div className="w-full space-y-4 animate-fade-in">
                 <div className="bg-black/40 rounded-xl p-4 border border-gray-700/50 relative group hover:border-green-500/50 transition-colors">
                    <p className="text-green-400 font-mono text-sm leading-relaxed">
                      {currentResult.stylePrompt}
                    </p>
                    <div className="absolute top-2 right-2">
                      <button
                        onClick={() => copyToClipboard(currentResult.stylePrompt, 'main')}
                        className="p-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg shadow-lg transition-all"
                      >
                        {copiedId === 'main' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                 </div>
                 <p className="text-center text-xs text-gray-500">
                    Copie e cole no campo "Style of Music" do Suno.
                 </p>
               </div>
             ) : (
               <div className="text-center text-gray-600">
                 <Wand2 className="w-12 h-12 mx-auto mb-2 opacity-20" />
                 <p className="text-sm">Seu prompt aparecerá aqui.</p>
               </div>
             )}
          </div>
        </div>

        {/* Histórico Recente */}
        {history.length > 0 && (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden flex-1 max-h-[500px] flex flex-col">
            <div className="p-4 border-b border-gray-800 flex justify-between items-center sticky top-0 bg-gray-900 z-10">
              <h3 className="font-bold text-gray-300 text-sm flex items-center gap-2">
                <History className="w-4 h-4" /> Histórico da Sessão
              </h3>
              <button 
                onClick={clearHistory}
                className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" /> Limpar
              </button>
            </div>
            
            <div className="overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-gray-700">
              {history.map((item) => (
                <div 
                  key={item.id} 
                  className={`p-3 rounded-lg border transition-all text-left group ${
                    currentResult?.stylePrompt === item.stylePrompt 
                      ? 'bg-gray-800 border-pink-500/50' 
                      : 'bg-black/20 border-gray-800 hover:border-gray-600'
                  }`}
                >
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <span className="text-[10px] text-gray-500 uppercase font-bold truncate max-w-[200px]">
                      {item.explanation || 'Estilo Gerado'}
                    </span>
                    <span className="text-[10px] text-gray-600">
                      {new Date(item.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                  </div>
                  
                  <p className="text-xs text-gray-300 font-mono line-clamp-2 mb-2">
                    {item.stylePrompt}
                  </p>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentResult(item)}
                      className="text-[10px] bg-gray-800 hover:bg-gray-700 text-gray-300 px-2 py-1 rounded border border-gray-700"
                    >
                      Ver
                    </button>
                    <button
                      onClick={() => copyToClipboard(item.stylePrompt, item.id)}
                      className="text-[10px] bg-gray-800 hover:bg-gray-700 text-gray-300 px-2 py-1 rounded border border-gray-700 flex items-center gap-1 ml-auto"
                    >
                      {copiedId === item.id ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                      Copiar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
};