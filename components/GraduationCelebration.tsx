import React from 'react';
import { GraduationCap, Star } from 'lucide-react';
import { useProgress } from '../contexts/ProgressContext';

export const GraduationCelebration: React.FC = () => {
  const { isGraduationActive } = useProgress();

  if (!isGraduationActive) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none bg-black/40 backdrop-blur-[2px] animate-fade-in-out">
      <div className="relative flex flex-col items-center">
        
        {/* Central Graduation Cap */}
        <div className="relative z-10 animate-bounce-in">
          <div className="bg-yellow-500/20 p-8 rounded-full blur-xl absolute inset-0 scale-150 animate-pulse"></div>
          <GraduationCap 
            size={160} 
            className="text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.6)] fill-yellow-900/50 rotate-[-10deg]" 
            strokeWidth={1.5}
          />
        </div>

        {/* Text */}
        <h2 className="mt-8 text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-300 animate-slide-up drop-shadow-lg tracking-tight">
          TRILHA CONCLUÍDA!
        </h2>

        {/* Exploding Stars */}
        {/* We hardcode positions for a designed "explosion" look */}
        
        {/* Top Left */}
        <Star size={48} className="absolute -top-12 -left-20 text-yellow-300 fill-yellow-400 animate-star-pop-1 opacity-0" />
        <Star size={32} className="absolute top-0 -left-32 text-yellow-200 fill-yellow-500 animate-star-pop-2 opacity-0" />
        
        {/* Top Right */}
        <Star size={56} className="absolute -top-16 -right-16 text-yellow-300 fill-yellow-400 animate-star-pop-3 opacity-0" />
        
        {/* Bottoms */}
        <Star size={40} className="absolute bottom-10 -right-24 text-yellow-200 fill-yellow-500 animate-star-pop-4 opacity-0" />
        <Star size={36} className="absolute bottom-20 -left-28 text-yellow-100 fill-yellow-300 animate-star-pop-2 opacity-0" />

      </div>

      <style>{`
        @keyframes fadeInOut {
          0% { opacity: 0; }
          10% { opacity: 1; }
          80% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes bounceIn {
          0% { transform: scale(0) rotate(-45deg); }
          60% { transform: scale(1.2) rotate(0deg); }
          100% { transform: scale(1) rotate(-10deg); }
        }
        @keyframes slideUp {
          0% { transform: translateY(50px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        /* Star Animations (Pop and float away) */
        @keyframes starPop1 {
          0% { transform: scale(0) translate(0,0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: scale(1) translate(-50px, -50px) rotate(45deg); opacity: 0; }
        }
        @keyframes starPop2 {
          0% { transform: scale(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: scale(1) translate(-80px, 20px) rotate(-90deg); opacity: 0; }
        }
        @keyframes starPop3 {
          0% { transform: scale(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: scale(1.2) translate(60px, -60px) rotate(180deg); opacity: 0; }
        }
        @keyframes starPop4 {
          0% { transform: scale(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: scale(0.8) translate(70px, 40px) rotate(45deg); opacity: 0; }
        }

        .animate-fade-in-out { animation: fadeInOut 4s forwards; }
        .animate-bounce-in { animation: bounceIn 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        .animate-slide-up { animation: slideUp 0.8s ease-out 0.3s forwards; opacity: 0; }
        
        .animate-star-pop-1 { animation: starPop1 2s ease-out 0.2s forwards; }
        .animate-star-pop-2 { animation: starPop2 2.5s ease-out 0.4s forwards; }
        .animate-star-pop-3 { animation: starPop3 2s ease-out 0.3s forwards; }
        .animate-star-pop-4 { animation: starPop4 2.2s ease-out 0.5s forwards; }
      `}</style>
    </div>
  );
};