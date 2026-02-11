
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlayCircle, Music, DollarSign, ExternalLink, Wand2, ArrowRight, Star, Sparkles, ChevronRight } from 'lucide-react';
import { PromotionalBanner } from '../components/PromotionalBanner';
import { TRACKS } from '../constants';
import { useProgress } from '../contexts/ProgressContext';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { getTrackProgress } = useProgress();

  const creationProgress = getTrackProgress(TRACKS[0].lessons);
  const monetizationProgress = getTrackProgress(TRACKS[1].lessons);
  const bonusProgress = getTrackProgress(TRACKS[2].lessons);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16 animate-fade-in">
      {/* Header Section */}
      <div className="text-center mb-16 md:mb-24">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 pb-2">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
            Harmonia Viva
          </span>
        </h1>
        
        <p className="text-lg md:text-xl font-medium text-gray-400 mb-10 leading-relaxed max-w-2xl mx-auto uppercase tracking-[0.2em]">
          O Guia Definitivo para criar músicas com <span className="text-white font-bold">Suno AI</span>
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <button 
            onClick={() => navigate(`/lesson/${TRACKS[0].lessons[0].id}`)}
            className="w-full sm:w-auto px-10 py-5 bg-white text-black rounded-2xl font-black hover:bg-gray-200 transition-all transform hover:scale-105 flex items-center justify-center gap-3 shadow-2xl shadow-white/10"
          >
            {creationProgress > 0 ? (
              <>CONTINUAR CURSO <ArrowRight className="w-6 h-6" /></>
            ) : (
              <>COMEÇAR MASTERCLASS <PlayCircle className="w-6 h-6" /></>
            )}
          </button>
          
          <button 
            onClick={() => navigate(`/generator`)}
            className="w-full sm:w-auto px-10 py-5 bg-gray-900/50 backdrop-blur-md text-white border border-gray-700 rounded-2xl font-black hover:bg-gray-800 hover:border-violet-500 transition-all transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg"
          >
            <Wand2 className="w-6 h-6 text-violet-400" />
            GERADOR DE PROMPTS
          </button>
        </div>
      </div>

      <PromotionalBanner />

      {/* Course Tracks Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* CARD 1: CRIAÇÃO */}
        <div 
          onClick={() => navigate(`/lesson/${TRACKS[0].lessons[0].id}`)}
          className="group relative flex flex-col h-full bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 transition-all hover:bg-zinc-900/60 hover:border-pink-500/50 hover:-translate-y-2 cursor-pointer shadow-2xl overflow-hidden"
        >
          {/* Progress Bar Top */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-white/5">
            <div className="h-full bg-gradient-to-r from-pink-500 to-purple-600 transition-all duration-1000 shadow-[0_0_10px_rgba(236,72,153,0.5)]" style={{ width: `${creationProgress}%` }} />
          </div>

          <div className="flex justify-between items-start mb-10">
            <div className="w-14 h-14 bg-pink-500/10 rounded-2xl flex items-center justify-center border border-pink-500/20 group-hover:bg-pink-500/20 transition-all shadow-inner">
              <Music className="w-7 h-7 text-pink-500" />
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Status</span>
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${creationProgress > 0 ? 'bg-pink-500/10 text-pink-400 border-pink-500/20' : 'bg-gray-800 text-gray-500 border-gray-700'}`}>
                {creationProgress > 0 ? `${creationProgress}% Concluído` : 'Não Iniciado'}
              </span>
            </div>
          </div>

          <div className="flex-grow">
            <h3 className="text-3xl font-black text-white mb-4 tracking-tight leading-none group-hover:text-pink-400 transition-colors">
              Criação (v5)
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Do zero ao profissional. Aprenda interface, prompts, metatags avançadas e estilos.
            </p>
          </div>

          <div className="pt-6 border-t border-white/5 flex items-center justify-between">
            <span className="text-pink-400 text-sm font-black flex items-center gap-2">
              {TRACKS[0].lessons.length} LIÇÕES <ChevronRight className="w-4 h-4" />
            </span>
            <div className="p-2 bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <ExternalLink className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        {/* CARD 2: NEGÓCIOS */}
        <div 
          onClick={() => navigate(`/lesson/${TRACKS[1].lessons[0].id}`)}
          className="group relative flex flex-col h-full bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 transition-all hover:bg-zinc-900/60 hover:border-green-500/50 hover:-translate-y-2 cursor-pointer shadow-2xl overflow-hidden"
        >
          {/* Progress Bar Top */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-white/5">
            <div className="h-full bg-gradient-to-r from-green-500 to-emerald-600 transition-all duration-1000 shadow-[0_0_10px_rgba(16,185,129,0.5)]" style={{ width: `${monetizationProgress}%` }} />
          </div>

          <div className="flex justify-between items-start mb-10">
            <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center border border-green-500/20 group-hover:bg-green-500/20 transition-all shadow-inner">
              <DollarSign className="w-7 h-7 text-green-500" />
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Status</span>
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${monetizationProgress > 0 ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-gray-800 text-gray-500 border-gray-700'}`}>
                {monetizationProgress > 0 ? `${monetizationProgress}% Concluído` : 'Não Iniciado'}
              </span>
            </div>
          </div>

          <div className="flex-grow">
            <h3 className="text-3xl font-black text-white mb-4 tracking-tight leading-none group-hover:text-green-400 transition-colors">
              Negócios
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Transforme música em renda. Nichos, SEO, canais dark e monetização.
            </p>
          </div>

          <div className="pt-6 border-t border-white/5 flex items-center justify-between">
            <span className="text-green-400 text-sm font-black flex items-center gap-2">
              {TRACKS[1].lessons.length} LIÇÕES <ChevronRight className="w-4 h-4" />
            </span>
            <div className="p-2 bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <ExternalLink className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        {/* CARD 3: BÔNUS (DICAS DE MESTRE) */}
        <div 
          onClick={() => navigate(`/lesson/${TRACKS[2].lessons[0].id}`)}
          className="group relative flex flex-col h-full bg-gradient-to-br from-yellow-900/20 to-zinc-950 backdrop-blur-xl border border-yellow-500/20 rounded-[2rem] p-8 transition-all hover:bg-zinc-900/60 hover:border-yellow-400/60 hover:-translate-y-2 cursor-pointer shadow-2xl overflow-hidden"
        >
          {/* Special Glow Effect */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-yellow-500/10 blur-[80px] rounded-full group-hover:bg-yellow-500/20 transition-all"></div>

          {/* Progress Bar Top */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-white/5">
            <div className="h-full bg-gradient-to-r from-yellow-500 to-amber-600 transition-all duration-1000 shadow-[0_0_10px_rgba(234,179,8,0.5)]" style={{ width: `${bonusProgress}%` }} />
          </div>

          <div className="flex justify-between items-start mb-10 relative z-10">
            <div className="w-14 h-14 bg-yellow-500/20 rounded-2xl flex items-center justify-center border border-yellow-500/30 group-hover:bg-yellow-500/30 transition-all shadow-inner">
              <Sparkles className="w-7 h-7 text-yellow-400 animate-pulse" />
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-black text-yellow-500/50 uppercase tracking-widest mb-1">VIP Content</span>
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${bonusProgress > 0 ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' : 'bg-yellow-950/50 text-yellow-600 border-yellow-500/10'}`}>
                {bonusProgress > 0 ? `${bonusProgress}% Concluído` : 'Disponível'}
              </span>
            </div>
          </div>

          <div className="flex-grow relative z-10">
            <h3 className="text-3xl font-black text-yellow-100 mb-4 tracking-tight leading-none">
              Dicas de Mestre
            </h3>
            <p className="text-yellow-100/70 text-lg leading-relaxed mb-8">
              O Segredo dos LUFS, Copywriting musical, Teoria das cores e frequências.
            </p>
          </div>

          <div className="pt-6 border-t border-yellow-500/10 flex items-center justify-between relative z-10">
            <span className="text-yellow-400 text-sm font-black flex items-center gap-2">
              {TRACKS[2].lessons.length} AULAS SECRETAS <Star className="w-4 h-4 fill-current" />
            </span>
            <div className="p-2 bg-yellow-500/10 rounded-full">
              <ChevronRight className="w-4 h-4 text-yellow-400" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;
