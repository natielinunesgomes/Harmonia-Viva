import React from 'react';
import { useProgress } from '../contexts/ProgressContext';

export const Confetti: React.FC = () => {
  const { isConfettiActive } = useProgress();

  if (!isConfettiActive) return null;

  // Generate 50 particles
  const particles = Array.from({ length: 50 }).map((_, i) => {
    const style = {
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 0.5}s`,
      backgroundColor: ['#ec4899', '#8b5cf6', '#10b981', '#fbbf24', '#3b82f6'][Math.floor(Math.random() * 5)],
      transform: `rotate(${Math.random() * 360}deg)`,
    } as React.CSSProperties;

    return <div key={i} className="confetti-piece" style={style} />;
  });

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      <style>{`
        .confetti-piece {
          position: absolute;
          width: 10px;
          height: 10px;
          top: -20px;
          border-radius: 4px;
          animation: confetti-fall 2.5s linear forwards;
        }
        @keyframes confetti-fall {
          0% { top: -20px; transform: rotate(0deg) translateX(0); opacity: 1; }
          100% { top: 100vh; transform: rotate(720deg) translateX(100px); opacity: 0; }
        }
      `}</style>
      {particles}
    </div>
  );
};