import React, { createContext, useContext, useState, useEffect } from 'react';

interface ProgressContextType {
  completedLessons: string[];
  markAsCompleted: (lessonId: string) => void;
  isConfettiActive: boolean;
  triggerConfetti: () => void;
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
    // Reset after animation duration (approx 3s)
    setTimeout(() => setIsConfettiActive(false), 3000);
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
      triggerConfetti,
      getTrackProgress
    }}>
      {children}
    </ProgressContext.Provider>
  );
};