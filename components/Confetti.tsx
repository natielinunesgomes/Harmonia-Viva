import React from 'react';
import { Star } from 'lucide-react';
import { useProgress } from '../contexts/ProgressContext';

export const Confetti: React.FC = () => {
  const { isConfettiActive } = useProgress();

  if (!isConfettiActive) return null;

  // Generate 40 stars for a dense shower
  const particles = Array.from({ length: 40 }).map((_, i) => {
    // Randomize properties for organic feel
    const size = Math.floor(Math.random() * 20) + 12; // 12px to 32px (slightly larger)
    const left = Math.random() * 100; // 0% to 100% width
    const duration = Math.random() * 2.5 + 1.5; // 1.5s to 4s (faster fall)
    const delay = Math.random() * 0.8; // Burst start
    const rotation = Math.random() * 360; 

    const style = {
      left: `${left}%`,
      animationDuration: `${duration}s`,
      animationDelay: `${delay}s`,
      width: `${size}px`,
      height: `${size}px`,
      transform: `rotate(${rotation}deg)`,
    } as React.CSSProperties;

    return (
      <div key={i} className="star-particle absolute -top-10 opacity-0" style={style}>
        <Star 
          size={size} 
          className="text-yellow-100 fill-yellow-300" 
          strokeWidth={1.5}
          style={{
            // Double drop-shadow for intense glow (Bloom effect)
            filter: 'drop-shadow(0 0 8px rgba(253, 224, 71, 1)) drop-shadow(0 0 15px rgba(234, 179, 8, 0.6))'
          }}
        />
      </div>
    );
  });

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      <style>{`
        .star-particle {
          animation-name: star-fall;
          animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
          animation-fill-mode: forwards;
        }
        
        @keyframes star-fall {
          0% { 
            top: -10vh; 
            opacity: 0; 
            transform: translateX(0) rotate(0deg) scale(0.5); 
          }
          15% {
            opacity: 1;
            transform: translateX(0) rotate(45deg) scale(1.1);
          }
          40% {
             opacity: 1; /* Stay bright briefly */
          }
          85% {
             opacity: 0; /* Fade out completely before hitting bottom */
          }
          100% { 
            top: 85vh; 
            opacity: 0; 
            transform: translateX(${Math.random() > 0.5 ? '40px' : '-40px'}) rotate(180deg) scale(0.8); 
          }
        }
      `}</style>
      {particles}
    </div>
  );
};