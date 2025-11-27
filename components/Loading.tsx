import React from 'react';
import { Loader2 } from 'lucide-react';

export const Loading: React.FC = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] w-full p-4 animate-fade-in">
    <div className="relative">
      <div className="absolute inset-0 bg-pink-500 blur-xl opacity-20 rounded-full animate-pulse-slow"></div>
      <Loader2 className="w-12 h-12 text-pink-500 animate-spin relative z-10" />
    </div>
    <p className="mt-4 text-gray-400 text-sm font-medium animate-pulse">Carregando conteúdo...</p>
  </div>
);