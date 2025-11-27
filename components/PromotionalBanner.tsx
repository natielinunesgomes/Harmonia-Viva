import React from 'react';
import { Star, MessageCircle } from 'lucide-react';

export const PromotionalBanner: React.FC = () => {
  return (
    <div className="mb-16 bg-gradient-to-r from-yellow-900/10 to-orange-900/10 border border-yellow-500/30 rounded-2xl p-8 relative overflow-hidden group shadow-2xl shadow-yellow-900/10">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
        <Star className="w-48 h-48 text-yellow-500 fill-yellow-500" />
      </div>
      
      <div className="relative z-10 md:flex items-center justify-between gap-8">
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-3">
            <span className="bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg shadow-yellow-500/20">
              Bônus Exclusivo
            </span>
            <span className="text-yellow-400 text-sm font-medium flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400" /> Dica de Ouro Harmonia Viva
            </span>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Pare de pagar em Dólar: Acesso SUNO <span className="text-yellow-400 bg-yellow-400/10 px-2 rounded">ILIMITADO</span> & Econômico
          </h2>
          
          <p className="text-gray-300 text-lg leading-relaxed">
            Você não precisa de cartão internacional para ser Pro. Descobrimos o segredo para ter 
            <strong> gerações infinitas</strong>, preço fixo em reais e <strong>suporte nativo em português</strong>.
            Conheça o <span className="text-white font-bold">ProMaker da DesignerFlix</span>.
          </p>
        </div>

        <div className="mt-6 md:mt-0 flex flex-col gap-3 shrink-0">
          <a
            href="https://wa.me/557581657338?text=Ol%C3%A1,%20vim%20pela%20Harmonia%20Viva%20e%20quero%20saber%20sobre%20o%20Suno%20Ilimitado"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-8 py-4 rounded-xl transition-all transform hover:scale-105 shadow-xl shadow-green-900/30 whitespace-nowrap"
          >
            <MessageCircle className="w-6 h-6 fill-white text-white" />
            Garantir Acesso Ilimitado
          </a>
          <span className="text-center text-xs text-gray-500">
            Fale no WhatsApp: +55 75 8165-7338
          </span>
        </div>
      </div>
    </div>
  );
};