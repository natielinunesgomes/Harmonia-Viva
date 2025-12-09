import React, { createContext, useContext, useState, useEffect } from 'react';

interface ProgressContextType {
  completedLessons: string[];
  markAsCompleted: (lessonId: string) => void;
  isConfettiActive: boolean;
  isGraduationActive: boolean; // Novo estado
  triggerConfetti: () => void;
  triggerGraduation: () => void; // Nova função
  getTrackProgress: (trackLessons: { id: string }[]) => number;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('harmonia_progress');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isConfettiActive, setIsConfettiActive] = useState(false);
  const [isGraduationActive, setIsGraduationActive] = useState(false); // Estado inicial

  useEffect(() => {
    localStorage.setItem('harmonia_progress', JSON.stringify(completedLessons));
  }, [completedLessons]);

  const markAsCompleted = (lessonId: string) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons(prev => [...prev, lessonId]);
    }
  };

  const triggerConfetti = () => {
    setIsConfettiActive(true);
    // Increased duration to 5000ms to allow stars to fall gently to the bottom
    setTimeout(() => setIsConfettiActive(false), 5000);
  };

  // Nova função de celebração maior
  const triggerGraduation = () => {
    setIsGraduationActive(true);
    // Dura um pouco mais que o confete
    setTimeout(() => setIsGraduationActive(false), 4500);
  };

  const getTrackProgress = (trackLessons: { id: string }[]) => {
    if (trackLessons.length === 0) return 0;
    const completedCount = trackLessons.filter(l => completedLessons.includes(l.id)).length;
    return Math.round((completedCount / trackLessons.length) * 100);
  };

  return (
    <ProgressContext.Provider value={{ 
      completedLessons, 
      markAsCompleted, 
      isConfettiActive, 
      isGraduationActive,
      triggerConfetti,
      triggerGraduation,
      getTrackProgress
    }}>
      {children}
    </ProgressContext.Provider>
  );
};