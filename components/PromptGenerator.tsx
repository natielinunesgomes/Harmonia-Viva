import React, { useState, useRef, useEffect } from 'react';
import { 
  Wand2, Copy, Check, Zap, RefreshCcw, Music2, Mic2, 
  Guitar, Radio, Drum, Speaker, Settings2, VolumeX, Activity
} from 'lucide-react';
import { generateSunoPrompt, generateMagicPrompt } from '../services/geminiService';
import { PromptResult } from '../types';

// --- CONFIGURAÇÃO VISUAL DO ESTÚDIO ---
const GENRES = [
  { id: 'pop', label: 'Pop', icon: Music2, color: 'from-pink-500 to-rose-500' },
  { id: 'rock', label: 'Rock', icon: Guitar, color: 'from-red-600 to-orange-600' },
  { id: 'electronic', label: 'Eletrônica', icon: Zap, color: 'from-blue-500 to-cyan-500' },
  { id: 'hiphop', label: 'Hip Hop', icon: Radio, color: 'from-yellow-500 to-amber-500' },
  { id: 'brazilian', label: 'Brasil', icon: Drum, color: 'from-green-500 to-emerald-600' },
  { id: 'cinematic', label: 'Cinematic', icon: Speaker, color: 'from-purple-600 to-violet-600' }
];

const ELEMENTS = [
  'Lo-fi', 'Reverb Heavy', 'Clean Mix', 'Distorted', '80s Synth', 
  'Orchestral', 'Acoustic', 'Fast Pace', 'Slow Burn', 'Bass Boosted'
];

export const PromptGenerator: React.FC = () => {
  // Estado Principal
  const [mode, setMode] = useState<'guided' | 'free'>('guided');
  const [loading, setLoading] = useState(false);
  const [currentResult, setCurrentResult] = useState<PromptResult | null>(null);
  
  // Estado do Estúdio (Guided)
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [bpm, setBpm] = useState<number>(120);
  const [isInstrumental, setIsInstrumental] = useState(false);
  const [selectedElements, setSelectedElements] = useState<string[]>([]);
  const [extraDetails, setExtraDetails] = useState('');

  // Estado do Modo Livre
  const [freeInput, setFreeInput] = useState('');

  // UI
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentResult && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentResult]);

  const toggleElement = (el: string) => {
    setSelectedElements(prev => 
      prev.includes(el) ? prev.filter(e => e !== el) : [...prev, el]
    );
  };

  const constructPrompt = () => {
    if (mode === 'free') return freeInput;
    
    const parts = [];
    if (selectedGenre) parts.push(`Genre: ${selectedGenre}`);
    if (selectedElements.length > 0) parts.push(`Elements: ${selectedElements.join(', ')}`);
    if (extraDetails) parts.push(`Details: ${extraDetails}`);
    return parts.join(', ');
  };

  const handleGenerate = async () => {
    const input = constructPrompt();
    if (!input.trim() && mode === 'free') return;
    if (!selectedGenre && mode === 'guided') return;

    setLoading(true);
    try {
      const result = await generateSunoPrompt(input, {
        bpm: mode === 'guided' ? bpm : undefined,
        isInstrumental: mode === 'guided' ? isInstrumental : undefined
      });
      setCurrentResult(result);
    } finally {
      setLoading(false);
    }
  };

  const handleMagic = async () => {
    setLoading(true);
    try {
      const input = constructPrompt();
      const result = await generateMagicPrompt(input);
      setCurrentResult(result);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 min-h-[600px]">
      
      {/* --- ESTÚDIO (CONTROLES) --- */}
      <div className="flex-1 space-y-6">
        
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            <Settings2 className="text-pink-500 w-8 h-8" /> 
            Estúdio de Criação
          </h2>
          <div className="bg-gray-800 rounded-lg p-1 flex border border-gray-700">
            <button
              onClick={() => setMode('guided')}
              className={`px-4 py-2 text-xs font-bold rounded-md transition-all ${
                mode === 'guided' ? 'bg-gray-700 text-white shadow-sm' : 'text-gray-400 hover:text-white'
              }`}
            >
              GUIADO
            </button>
            <button
              onClick={() => setMode('free')}
              className={`px-4 py-2 text-xs font-bold rounded-md transition-all ${
                mode === 'free' ? 'bg-gray-700 text-white shadow-sm' : 'text-gray-400 hover:text-white'
              }`}
            >
              LIVRE
            </button>
          </div>
        </div>

        <div className="bg-suno-card border border-gray-800 rounded-2xl p-6 shadow-2xl space-y-8 relative overflow-hidden">
          
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />

          {mode === 'guided' ? (
            <div className="space-y-8 animate-fade-in">
              
              {/* 1. Gênero (Visual Cards) */}
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase mb-4 block tracking-wider">1. Gênero Principal</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {GENRES.map((g) => (
                    <button
                      key={g.id}
                      onClick={() => setSelectedGenre(g.label)}
                      className={`relative overflow-hidden group p-4 rounded-xl border transition-all duration-300 text-left ${
                        selectedGenre === g.label 
                          ? 'border-transparent ring-2 ring-white/20 shadow-xl scale-[1.02]' 
                          : 'bg-gray-900 border-gray-800 hover:border-gray-600'
                      }`}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${g.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
                      {selectedGenre === g.label && (
                        <div className={`absolute inset-0 bg-gradient-to-br ${g.color} opacity-20`} />
                      )}
                      
                      <g.icon className={`w-8 h-8 mb-3 ${selectedGenre === g.label ? 'text-white' : 'text-gray-400 group-hover:text-white'} transition-colors`} />
                      <span className={`block font-bold ${selectedGenre === g.label ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                        {g.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Mesa de Controle (BPM & Instrumental) */}
              <div className="bg-black/20 rounded-xl p-5 border border-gray-800 grid md:grid-cols-2 gap-8">
                
                {/* BPM Slider */}
                <div>
                  <div className="flex justify-between mb-3">
                    <label className="text-xs font-bold text-gray-400 uppercase flex items-center gap-2">
                      <Activity className="w-4 h-4" /> Tempo (BPM)
                    </label>
                    <span className="text-xs font-mono text-pink-400 bg-pink-900/20 px-2 py-1 rounded">
                      {bpm} BPM
                    </span>
                  </div>
                  <input
                    type="range"
                    min="60"
                    max="180"
                    step="5"
                    value={bpm}
                    onChange={(e) => setBpm(Number(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-pink-500 hover:accent-pink-400"
                  />
                  <div className="flex justify-between text-[10px] text-gray-600 mt-2 font-mono uppercase">
                    <span>Lento</span>
                    <span>Moderado</span>
                    <span>Rápido</span>
                  </div>
                </div>

                {/* Instrumental Toggle */}
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase flex items-center gap-2 mb-3">
                    <Mic2 className="w-4 h-4" /> Tipo de Faixa
                  </label>
                  <div className="flex gap-2">
                     <button
                        onClick={() => setIsInstrumental(false)}
                        className={`flex-1 py-3 rounded-lg text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
                          !isInstrumental 
                            ? 'bg-gray-700 text-white border-gray-600' 
                            : 'bg-transparent text-gray-500 border-gray-800 hover:border-gray-700'
                        }`}
                     >
                       <Mic2 className="w-3 h-3" /> Com Voz
                     </button>
                     <button
                        onClick={() => setIsInstrumental(true)}
                        className={`flex-1 py-3 rounded-lg text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
                          isInstrumental 
                            ? 'bg-violet-600/20 text-violet-300 border-violet-500/50' 
                            : 'bg-transparent text-gray-500 border-gray-800 hover:border-gray-700'
                        }`}
                     >
                       <VolumeX className="w-3 h-3" /> Instrumental
                     </button>
                  </div>
                </div>
              </div>

              {/* 3. Elementos Técnicos */}
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase mb-3 block tracking-wider">3. Elementos & Atmosfera</label>
                <div className="flex flex-wrap gap-2">
                  {ELEMENTS.map((el) => (
                    <button
                      key={el}
                      onClick={() => toggleElement(el)}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-all ${
                        selectedElements.includes(el)
                          ? 'bg-gray-100 text-black border-white shadow-lg'
                          : 'bg-gray-900 text-gray-400 border-gray-800 hover:border-gray-600'
                      }`}
                    >
                      {el}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Extra Input */}
              <div className="relative">
                <input 
                  type="text"
                  value={extraDetails}
                  onChange={(e) => setExtraDetails(e.target.value)}
                  placeholder="Detalhes extras... (Ex: Solo de saxofone, clima de chuva)"
                  className="w-full bg-black/30 border border-gray-700 rounded-lg pl-4 pr-12 py-4 text-white placeholder-gray-600 focus:ring-1 focus:ring-pink-500 focus:border-pink-500 outline-none text-sm transition-all"
                />
                <Wand2 className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
              </div>

            </div>
          ) : (
            // FREE MODE
            <div className="animate-fade-in space-y-4">
              <div className="bg-yellow-900/10 border border-yellow-500/20 p-4 rounded-lg flex gap-3">
                 <Mic2 className="w-5 h-5 text-yellow-500 shrink-0" />
                 <p className="text-xs text-yellow-200/80 leading-relaxed">
                   No modo livre, você é o chefe. Descreva tudo o que imagina. A IA vai refinar e formatar para o padrão Suno.
                 </p>
              </div>
              <textarea
                value={freeInput}
                onChange={(e) => setFreeInput(e.target.value)}
                placeholder="Ex: Quero um heavy metal misturado com ópera, muito rápido, com vocais femininos líricos e bateria agressiva..."
                className="w-full h-64 bg-black/30 border border-gray-700 rounded-xl p-5 text-white placeholder-gray-600 focus:ring-1 focus:ring-pink-500 outline-none resize-none text-base leading-relaxed"
              />
            </div>
          )}

          {/* Action Bar */}
          <div className="pt-4 flex gap-3 border-t border-gray-800/50">
            <button
              onClick={handleGenerate}
              disabled={loading || (mode === 'free' && !freeInput.trim()) || (mode === 'guided' && !selectedGenre)}
              className="flex-1 h-14 bg-gradient-to-r from-pink-600 to-violet-600 hover:from-pink-500 hover:to-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-pink-500/20 active:scale-[0.98]"
            >
              {loading ? <RefreshCcw className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5 fill-current" />}
              <span className="tracking-wide">GERAR PROMPT</span>
            </button>
            
            <button
              onClick={handleMagic}
              disabled={loading}
              className="h-14 w-16 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-violet-400 rounded-xl flex items-center justify-center transition-all active:scale-[0.98]"
              title="Surpreenda-me"
            >
              <Wand2 className="w-6 h-6" />
            </button>
          </div>

        </div>
      </div>

      {/* --- RESULTADOS (SIDEBAR) --- */}
      <div className="w-full lg:w-[380px] lg:sticky lg:top-8 h-fit space-y-6">
        
        <div ref={resultRef} className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl relative">
          
          <div className="bg-gray-800 p-4 border-b border-gray-700 flex justify-between items-center">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <Music2 className="w-4 h-4 text-green-400" /> RESULTADO OTIMIZADO
            </h3>
            {currentResult && (
               <span className="text-[10px] font-mono text-gray-400 uppercase">
                 Suno v3.5 Ready
               </span>
            )}
          </div>
          
          <div className="p-6 min-h-[250px] flex flex-col justify-center relative">
             {loading ? (
               <div className="text-center space-y-4">
                 <div className="relative w-16 h-16 mx-auto">
                    <div className="absolute inset-0 border-4 border-gray-700 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
                 </div>
                 <p className="text-gray-400 text-xs font-mono animate-pulse">
                   MASTERIZANDO PROMPT...
                 </p>
               </div>
             ) : currentResult ? (
               <div className="space-y-6 animate-fade-in">
                 
                 {/* Main Prompt Box */}
                 <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-violet-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
                    <div className="relative bg-black rounded-xl p-5 border border-gray-800">
                      <p className="text-green-400 font-mono text-sm leading-relaxed break-words">
                        {currentResult.stylePrompt}
                      </p>
                    </div>
                    
                    <button
                      onClick={() => copyToClipboard(currentResult.stylePrompt, 'main')}
                      className="absolute top-2 right-2 p-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg shadow-lg transition-all z-10 opacity-0 group-hover:opacity-100"
                    >
                      {copiedId === 'main' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                 </div>

                 {/* Explanation / Tip */}
                 {currentResult.explanation && (
                   <div className="flex gap-3 bg-gray-800/50 p-3 rounded-lg border border-gray-700/50">
                      <div className="mt-1">
                        <Wand2 className="w-4 h-4 text-violet-400" />
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        <span className="font-bold text-violet-300 block mb-1">Dica da IA:</span>
                        {currentResult.explanation}
                      </p>
                   </div>
                 )}

                 <p className="text-center text-[10px] text-gray-600 uppercase tracking-widest">
                    Copie e cole no campo "Style"
                 </p>
               </div>
             ) : (
               <div className="text-center opacity-30">
                 <Music2 className="w-16 h-16 mx-auto mb-4" />
                 <p className="text-sm font-medium">Configure seu estilo e clique em Gerar</p>
               </div>
             )}
          </div>
        </div>

      </div>

    </div>
  );
};