
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ALL_LESSONS } from '../constants';

interface ProgressContextType {
  completedLessons: string[];
  markAsCompleted: (lessonId: string) => void;
  isLessonSuccessActive: boolean;
  triggerLessonSuccess: () => void;
  getTrackProgress: (trackLessons: { id: string }[]) => number;
  getTotalProgress: () => number;
  // Added missing properties used by Confetti and GraduationCelebration components
  isConfettiActive: boolean;
  isGraduationActive: boolean;
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

  const [isLessonSuccessActive, setIsLessonSuccessActive] = useState(false);
  // Implementation of missing state variables
  const [isConfettiActive, setIsConfettiActive] = useState(false);
  const [isGraduationActive, setIsGraduationActive] = useState(false);

  useEffect(() => {
    localStorage.setItem('harmonia_progress', JSON.stringify(completedLessons));
  }, [completedLessons]);

  const markAsCompleted = (lessonId: string) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons(prev => [...prev, lessonId]);
    }
  };

  const triggerLessonSuccess = () => {
    setIsLessonSuccessActive(true);
    setTimeout(() => setIsLessonSuccessActive(false), 2200);
  };

  const getTrackProgress = (trackLessons: { id: string }[]) => {
    if (trackLessons.length === 0) return 0;
    const completedCount = trackLessons.filter(l => completedLessons.includes(l.id)).length;
    return Math.round((completedCount / trackLessons.length) * 100);
  };

  const getTotalProgress = () => {
    if (ALL_LESSONS.length === 0) return 0;
    const completedCount = ALL_LESSONS.filter(l => completedLessons.includes(l.id)).length;
    return Math.round((completedCount / ALL_LESSONS.length) * 100);
  };

  return (
    <ProgressContext.Provider value={{ 
      completedLessons, 
      markAsCompleted, 
      isLessonSuccessActive,
      triggerLessonSuccess,
      getTrackProgress,
      getTotalProgress,
      // Pass the added states to the context provider
      isConfettiActive,
      isGraduationActive
    }}>
      {children}
    </ProgressContext.Provider>
  );
};
