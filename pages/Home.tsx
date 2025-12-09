import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlayCircle, Music, DollarSign, ExternalLink, Wand2, ArrowRight, Star, Sparkles } from 'lucide-react';
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
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-16 animate-fade-in">
      <div className="text-center mb-12 md:mb-16">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter mb-4 pb-2">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
            Harmonia Viva
          </span>
        </h1>
        
        <h2 className="text-base md:text-lg lg:text-xl font-medium text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
          O Guia Definitivo para criar músicas com <span className="text-pink-400 font-bold">Suno AI</span>
        </h2>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button 
            onClick={() => navigate(`/lesson/${TRACKS[0].lessons[0].id}`)}
            className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-xl shadow-white/5"
          >
            {creationProgress > 0 ? (
              <>Continuar Curso <ArrowRight className="w-5 h-5" /></>
            ) : (
              <>Começar Masterclass <PlayCircle className="w-5 h-5" /></>
            )}
          </button>
          
          <button 
            onClick={() => navigate(`/generator`)}
            className="w-full sm:w-auto px-8 py-4 bg-gray-800 text-white border border-gray-700 rounded-full font-bold hover:bg-gray-700 hover:border-violet-500 transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
          >
            <Wand2 className="w-5 h-5 text-violet-400" />
            Gerador de Prompts
          </button>
        </div>
      </div>

      <PromotionalBanner />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-6 mb-12">
        {/* CARD 1: Criação */}
        <div 
          onClick={() => navigate(`/lesson/${TRACKS[0].lessons[0].id}`)}
          className="bg-suno-card p-6 md:p-8 rounded-2xl border border-gray-800 hover:border-pink-500/30 transition-all cursor-pointer group hover:-translate-y-1 shadow-lg relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gray-800">
            <div className="h-full bg-pink-500 transition-all duration-1000" style={{ width: `${creationProgress}%` }} />
          </div>

          <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-pink-500/30 transition-colors">
            <Music className="w-6 h-6 text-pink-500" />
          </div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-white">Criação (v5)</h3>
            {creationProgress > 0 && (
              <span className="text-[10px] font-bold bg-pink-500/10 text-pink-400 px-2 py-1 rounded">
                {creationProgress}%
              </span>
            )}
          </div>
          <p className="text-gray-400 mb-4 text-sm">Do zero ao profissional. Aprenda interface, prompts, metatags avançadas e estilos.</p>
          <span className="text-pink-400 text-xs font-bold flex items-center gap-1">
            {TRACKS[0].lessons.length} Lições <ExternalLink className="w-3 h-3" />
          </span>
        </div>

        {/* CARD 2: Monetização */}
        <div 
          onClick={() => navigate(`/lesson/${TRACKS[1].lessons[0].id}`)}
          className="bg-suno-card p-6 md:p-8 rounded-2xl border border-gray-800 hover:border-green-500/30 transition-all cursor-pointer group hover:-translate-y-1 shadow-lg relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gray-800">
            <div className="h-full bg-green-500 transition-all duration-1000" style={{ width: `${monetizationProgress}%` }} />
          </div>

          <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-500/30 transition-colors">
            <DollarSign className="w-6 h-6 text-green-500" />
          </div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-white">Negócios</h3>
            {monetizationProgress > 0 && (
              <span className="text-[10px] font-bold bg-green-500/10 text-green-400 px-2 py-1 rounded">
                {monetizationProgress}%
              </span>
            )}
          </div>
          <p className="text-gray-400 mb-4 text-sm">Transforme música em renda. Nichos, SEO, canais dark e monetização.</p>
          <span className="text-green-400 text-xs font-bold flex items-center gap-1">
            {TRACKS[1].lessons.length} Lições <ExternalLink className="w-3 h-3" />
          </span>
        </div>

        {/* CARD 3: BÔNUS (AMARELO CHAMATIVO) */}
        <div 
          onClick={() => navigate(`/lesson/${TRACKS[2].lessons[0].id}`)}
          className="relative bg-gradient-to-b from-yellow-900/10 to-black p-6 md:p-8 rounded-2xl border border-yellow-500/30 hover:border-yellow-400/60 transition-all cursor-pointer group hover:-translate-y-1 shadow-2xl shadow-yellow-900/10 overflow-hidden"
        >
           {/* Glow Effect */}
           <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-500/20 blur-3xl rounded-full pointer-events-none group-hover:bg-yellow-500/30 transition-all"></div>

          <div className="absolute top-0 left-0 w-full h-1 bg-gray-800">
            <div className="h-full bg-yellow-400 transition-all duration-1000" style={{ width: `${bonusProgress}%` }} />
          </div>

          <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-500/30 transition-colors">
            <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
          </div>
          <div className="flex justify-between items-start mb-2 relative z-10">
            <h3 className="text-xl font-bold text-yellow-100 flex items-center gap-2">
               Bônus: Hollywood
            </h3>
            {bonusProgress > 0 && (
              <span className="text-[10px] font-bold bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded border border-yellow-500/20">
                {bonusProgress}%
              </span>
            )}
          </div>
          <p className="text-yellow-100/70 mb-4 text-sm relative z-10">
            Crie videoclipes de cinema com IA. Lip-Sync, personagens consistentes e técnicas virais.
          </p>
          <span className="text-yellow-400 text-xs font-bold flex items-center gap-1 relative z-10">
            {TRACKS[2].lessons.length} Aulas Secretas <Star className="w-3 h-3 fill-current" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Home;