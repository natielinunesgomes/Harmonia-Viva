import React, { useMemo } from 'react';
import { ArrowRight, AlertCircle, Sparkles, CheckCircle, ExternalLink, Check } from 'lucide-react';
import { Lesson } from '../types';
import { ALL_LESSONS } from '../constants';
import { useProgress } from '../contexts/ProgressContext';

interface Props {
  lesson: Lesson;
  onComplete: () => void;
}

export const LessonContent: React.FC<Props> = ({ lesson, onComplete }) => {
  const { markAsCompleted, triggerConfetti, completedLessons } = useProgress();
  
  // Check if it's the last lesson globally
  const isLastLesson = ALL_LESSONS[ALL_LESSONS.length - 1].id === lesson.id;
  const isCompleted = completedLessons.includes(lesson.id);

  // Memoize content to prevent unnecessary re-evaluations during parent renders
  const ContentBody = useMemo(() => lesson.content(), [lesson]);

  const handleAction = () => {
    // 1. Mark as complete
    markAsCompleted(lesson.id);
    
    // 2. Visual Reward
    triggerConfetti();

    // 3. Navigate after short delay
    setTimeout(() => {
      onComplete();
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="border-b border-gray-800 pb-6">
        <div className="flex items-center gap-3 text-sm text-pink-500 font-semibold mb-2">
          <span className="bg-pink-500/10 px-3 py-1 rounded-full uppercase tracking-wider text-xs flex items-center gap-2">
            {lesson.trackId === 'creation' ? 'Criação' : 'Business'}
            {isCompleted && <Check className="w-3 h-3" />}
          </span>
          <span className="text-gray-500">•</span>
          <span className="text-gray-400">{lesson.level}</span>
          <span className="text-gray-500">•</span>
          <span className="text-gray-400">{lesson.duration}</span>
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">{lesson.title}</h1>
        <p className="text-xl text-gray-400">{lesson.description}</p>
      </div>

      {/* Content Body */}
      <div className="prose prose-invert prose-lg max-w-none text-gray-300">
        {ContentBody}
      </div>

      {/* Footer Actions */}
      <div className="pt-12 border-t border-gray-800 flex justify-end">
        <button
          onClick={handleAction}
          className={`group relative flex items-center gap-3 px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl overflow-hidden ${
            isLastLesson 
              ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-green-900/20' 
              : 'bg-white text-black hover:bg-gray-100 shadow-white/10'
          }`}
          aria-label={isLastLesson ? "Finalizar curso" : "Próxima lição"}
        >
          {/* Subtle shine effect */}
          <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />
          
          {isLastLesson ? (
            <>
              <span className="relative z-10">Concluir Curso</span>
              <CheckCircle className="w-5 h-5 relative z-10" />
            </>
          ) : (
            <>
              <span className="relative z-10">Concluir e Avançar</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

// Reusable UI Components for Lessons
export const TipBox: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-violet-900/20 border-l-4 border-violet-500 p-5 my-8 rounded-r-lg shadow-sm">
    <div className="flex items-start gap-4">
      <Sparkles className="w-6 h-6 text-violet-400 shrink-0 mt-1" />
      <div className="text-gray-200 leading-relaxed">{children}</div>
    </div>
  </div>
);

export const WarningBox: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-yellow-900/20 border-l-4 border-yellow-500 p-5 my-8 rounded-r-lg shadow-sm">
    <div className="flex items-start gap-4">
      <AlertCircle className="w-6 h-6 text-yellow-500 shrink-0 mt-1" />
      <div className="text-gray-200 leading-relaxed">{children}</div>
    </div>
  </div>
);

export const Step: React.FC<{ number: number; title: string; children: React.ReactNode }> = ({ number, title, children }) => (
  <div className="flex gap-5 my-10 p-6 rounded-2xl border border-gray-800 bg-gray-900/40 hover:bg-gray-800/60 transition-colors">
    <div className="shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-pink-600 to-violet-600 flex items-center justify-center text-xl font-bold text-white shadow-lg shadow-purple-900/20">
      {number}
    </div>
    <div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <div className="text-gray-300 leading-relaxed space-y-2">{children}</div>
    </div>
  </div>
);

export const LinkBtn: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="inline-flex items-center gap-1.5 text-pink-400 hover:text-pink-300 font-medium hover:underline decoration-pink-500/30 underline-offset-4 transition-all"
  >
    {children}
    <ExternalLink className="w-3 h-3" />
  </a>
);