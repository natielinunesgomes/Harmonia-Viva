
import React from 'react';
import { Star, MessageCircle, PlayCircle, ExternalLink } from 'lucide-react';

export const PromotionalBanner: React.FC = () => {
  const videoId = "YO8FFb9S8aQ";
  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <div className="mb-16 bg-gradient-to-r from-yellow-900/10 to-orange-900/10 border border-yellow-500/30 rounded-3xl p-6 md:p-10 relative overflow-hidden group shadow-2xl shadow-yellow-900/10 transition-all hover:border-yellow-500/50">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
        <Star className="w-64 h-64 text-yellow-500 fill-yellow-500" />
      </div>
      
      <div className="relative z-10 flex flex-col gap-10">
        {/* Top Section: Text & CTA */}
        <div className="md:flex items-center justify-between gap-8">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
              <span className="bg-yellow-500 text-black text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-[0.2em] shadow-lg shadow-yellow-500/20">
                Bônus Exclusivo
              </span>
              <span className="text-yellow-400 text-sm font-semibold flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400" /> Dica de Ouro Harmonia Viva
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-none">
              Pare de pagar em Dólar: Acesso SUNO <span className="text-yellow-400">ILIMITADO</span>
            </h2>
            
            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
              Você não precisa de cartão internacional para ser Pro. Descobrimos o segredo para ter 
              <strong> gerações infinitas</strong>, preço fixo em reais e <strong>suporte nativo em português</strong>.
              Conheça o <span className="text-white font-bold">ProMaker da DesignerFlix</span>.
            </p>
          </div>

          <div className="mt-8 md:mt-0 flex flex-col gap-3 shrink-0">
            <a
              href="https://wa.me/557581657338?text=Ol%C3%A1,%20vim%20pela%20Harmonia%20Viva%20e%20quero%20saber%20sobre%20o%20Suno%20Ilimitado"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-green-600 hover:bg-green-500 text-white font-bold px-10 py-5 rounded-2xl transition-all transform hover:scale-105 active:scale-95 shadow-2xl shadow-green-900/40 whitespace-nowrap"
            >
              <MessageCircle className="w-6 h-6 fill-white text-white" />
              Garantir Acesso Ilimitado
            </a>
          </div>
        </div>

        {/* Video Preview Section */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-t border-yellow-500/20 pt-8">
            <div className="flex items-center gap-3">
              <div className="bg-yellow-500/20 p-2 rounded-lg">
                <PlayCircle className="text-yellow-400 w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold text-lg">Já sabe usar o SUNO? Aprenda agora como fazer Covers profissionais!</h4>
                <p className="text-gray-400 text-sm">Clique para assistir</p>
              </div>
            </div>
          </div>

          {/* Video Cover Link */}
          <a 
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group/video block"
          >
            {/* Glossy overlay effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl blur opacity-20 group-hover/video:opacity-40 transition duration-1000"></div>
            
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/5 cursor-pointer">
              <div className="absolute inset-0 z-10 flex items-center justify-center group/btn">
                {/* High Quality Thumbnail Cover from YouTube API */}
                <img 
                  src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                  alt="Capa do Vídeo Aula Master"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/btn:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                  }}
                />
                
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover/btn:bg-black/20 transition-colors duration-500"></div>
                
                {/* Play Button Icon */}
                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-yellow-500/40 rounded-full blur-2xl scale-150 animate-pulse"></div>
                  <div className="bg-yellow-500 text-black p-6 rounded-full shadow-2xl transform transition-all duration-300 group-hover/btn:scale-110 group-hover/btn:shadow-yellow-500/40">
                    <PlayCircle className="w-12 h-12 fill-current" />
                  </div>
                </div>
                
                <div className="absolute bottom-6 left-6 right-6 text-center">
                  <span className="bg-black/60 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full border border-white/10 opacity-0 group-hover/btn:opacity-100 transition-all translate-y-2 group-hover/btn:translate-y-0 duration-300 flex items-center gap-2 mx-auto w-fit">
                    Abrir aula no YouTube <ExternalLink className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};
