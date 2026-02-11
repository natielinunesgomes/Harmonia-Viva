
import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useProgress } from '../contexts/ProgressContext';

export const LessonSuccessOverlay: React.FC = () => {
  const { isLessonSuccessActive, getTotalProgress } = useProgress();

  if (!isLessonSuccessActive) return null;

  const totalProgress = getTotalProgress();

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center pointer-events-none p-4 overflow-hidden">
      {/* Heavy Blur Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md animate-overlay-fade" />
      
      <div className="relative flex flex-col items-center animate-success-pop">
        {/* Glow Effect behind icon */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-emerald-500/30 blur-[60px] rounded-full" />
        
        <div className="bg-zinc-900/80 border border-white/10 p-10 rounded-[2.5rem] shadow-2xl flex flex-col items-center text-center backdrop-blur-2xl">
          <div className="mb-6 relative">
             <CheckCircle2 size={80} className="text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]" />
          </div>

          <h2 className="text-4xl font-black text-white tracking-tighter mb-2">
            Aula Concluída
          </h2>
          
          <div className="flex flex-col items-center">
            <span className="text-emerald-400 text-6xl font-black tracking-tighter mb-2">
              {totalProgress}%
            </span>
            <span className="text-zinc-500 text-xs font-bold uppercase tracking-[0.3em]">
              Progresso Total do Curso
            </span>
          </div>

          {/* Minimalist Progress Bar */}
          <div className="w-48 h-1.5 bg-zinc-800 rounded-full mt-6 overflow-hidden">
             <div 
               className="h-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] transition-all duration-1000 ease-out"
               style={{ width: `${totalProgress}%` }}
             />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes overlayFade {
          0% { opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes successPop {
          0% { transform: scale(0.8) translateY(20px); opacity: 0; }
          15% { transform: scale(1) translateY(0); opacity: 1; }
          85% { transform: scale(1) translateY(0); opacity: 1; }
          100% { transform: scale(1.05) translateY(-10px); opacity: 0; }
        }
        .animate-overlay-fade { animation: overlayFade 2.2s forwards; }
        .animate-success-pop { animation: successPop 2.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};
