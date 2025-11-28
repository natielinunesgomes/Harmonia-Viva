import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlayCircle, Music, DollarSign, ExternalLink } from 'lucide-react';
import { PromotionalBanner } from '../components/PromotionalBanner';
import { TRACKS } from '../constants';

const Home: React.FC = () => {
  const navigate = useNavigate();

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
            <PlayCircle className="w-5 h-5" />
            Começar Masterclass
          </button>
        </div>
      </div>

      <PromotionalBanner />

      <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12">
        <div 
          onClick={() => navigate(`/lesson/${TRACKS[0].lessons[0].id}`)}
          className="bg-suno-card p-6 md:p-8 rounded-2xl border border-gray-800 hover:border-pink-500/30 transition-all cursor-pointer group hover:-translate-y-1 shadow-lg"
        >
          <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-pink-500/30 transition-colors">
            <Music className="w-6 h-6 text-pink-500" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Trilha de Criação</h3>
          <p className="text-gray-400 mb-4 text-sm md:text-base">Do zero ao profissional. Aprenda interface, prompts, metatags avançadas e estilos brasileiros.</p>
          <span className="text-pink-400 text-sm font-bold flex items-center gap-1">
            {TRACKS[0].lessons.length} Lições <ExternalLink className="w-3 h-3" />
          </span>
        </div>

        <div 
          onClick={() => navigate(`/lesson/${TRACKS[1].lessons[0].id}`)}
          className="bg-suno-card p-6 md:p-8 rounded-2xl border border-gray-800 hover:border-green-500/30 transition-all cursor-pointer group hover:-translate-y-1 shadow-lg"
        >
          <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-500/30 transition-colors">
            <DollarSign className="w-6 h-6 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Trilha de Monetização</h3>
          <p className="text-gray-400 mb-4 text-sm md:text-base">Transforme música em renda. Nichos de YouTube, SEO, criação de vídeo e direitos autorais.</p>
          <span className="text-green-400 text-sm font-bold flex items-center gap-1">
            {TRACKS[1].lessons.length} Lições <ExternalLink className="w-3 h-3" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Home;