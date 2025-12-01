import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// --- TYPES ---
interface ProgressContextType {
  completedLessons: string[];
  markAsCompleted: (lessonId: string) => void;
  isConfettiActive: boolean;
  triggerConfetti: () => void;
  getTrackProgress: (trackLessons: { id: string }[]) => number;
}

const STORAGE_KEY = 'harmonia_progress';

// --- CONTEXT ---
const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

// --- PROVIDER ---
export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Lazy initialization of state to avoid reading localStorage on every render
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to parse progress from localStorage", e);
      return [];
    }
  });

  const [isConfettiActive, setIsConfettiActive] = useState(false);

  // Sync with LocalStorage whenever completedLessons changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completedLessons));
    } catch (e) {
      console.error("Failed to save progress to localStorage", e);
    }
  }, [completedLessons]);

  const markAsCompleted = useCallback((lessonId: string) => {
    setCompletedLessons(prev => {
      if (prev.includes(lessonId)) return prev;
      return [...prev, lessonId];
    });
  }, []);

  const triggerConfetti = useCallback(() => {
    setIsConfettiActive(true);
    const timer = setTimeout(() => setIsConfettiActive(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const getTrackProgress = useCallback((trackLessons: { id: string }[]) => {
    if (trackLessons.length === 0) return 0;
    const completedCount = trackLessons.filter(l => completedLessons.includes(l.id)).length;
    return Math.round((completedCount / trackLessons.length) * 100);
  }, [completedLessons]);

  const value = React.useMemo(() => ({
    completedLessons,
    markAsCompleted,
    isConfettiActive,
    triggerConfetti,
    getTrackProgress
  }), [completedLessons, isConfettiActive, markAsCompleted, triggerConfetti, getTrackProgress]);

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};