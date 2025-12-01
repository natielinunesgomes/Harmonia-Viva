import React, { useState, useEffect } from 'react';
import { ShieldAlert, Lock, AlertTriangle, CheckCircle } from 'lucide-react';

export const AccessWarningModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Força a abertura do modal sempre que o componente é montado (page reload)
    setIsOpen(true);
    // Desabilita o scroll do body enquanto o modal está aberto
    document.body.style.overflow = 'hidden';
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Reabilita o scroll
    document.body.style.overflow = 'unset';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay com Blur pesado e fundo escuro */}
      <div 
        className="absolute inset-0 bg-black/95 backdrop-blur-md transition-opacity"
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div className="relative bg-gray-900 border border-red-500/30 rounded-2xl max-w-lg w-full shadow-2xl shadow-red-900/20 overflow-hidden animate-fade-in transform scale-100">
        
        {/* Faixa de Topo */}
        <div className="bg-gradient-to-r from-red-900/40 to-transparent p-1">
          <div className="h-1 bg-gradient-to-r from-red-600 to-red-400 w-full rounded-t-full" />
        </div>

        <div className="p-8 text-center space-y-6">
          
          {/* Ícone Animado */}
          <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
            <div className="absolute inset-0 bg-red-500/10 rounded-full animate-pulse-slow"></div>
            <div className="relative bg-gray-800 p-4 rounded-full border border-red-500/20">
              <ShieldAlert className="w-10 h-10 text-red-500" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-gray-900 rounded-full p-1 border border-gray-800">
                <Lock className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Aviso de Segurança
            </h2>
            <p className="text-red-400 font-medium text-sm uppercase tracking-widest flex items-center justify-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Acesso Monitorado
            </p>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700/50 text-left space-y-4">
            <p className="text-gray-300 text-sm leading-relaxed">
              Detectamos seu login. Informamos que seu acesso a esta plataforma é 
              <strong className="text-white"> pessoal, único e intransferível</strong>.
            </p>
            <p className="text-gray-300 text-sm leading-relaxed">
              É <strong className="text-red-400">estritamente proibido</strong> compartilhar o link, login ou conteúdo deste ambiente com terceiros.
            </p>
            <div className="flex items-start gap-2 text-xs text-gray-500 mt-2 bg-black/20 p-2 rounded">
                <Lock className="w-3 h-3 mt-0.5 shrink-0" />
                <span>O sistema monitora acessos simultâneos e IPs suspeitos. O compartilhamento resultará no bloqueio imediato e permanente da conta.</span>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="w-full py-4 bg-white hover:bg-gray-200 text-black font-bold rounded-xl transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-5 h-5 text-green-600" />
            Entendi e Concordo
          </button>
        </div>
      </div>
    </div>
  );
};