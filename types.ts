import React from 'react';

export type TrackId = 'creation' | 'monetization';
export type DifficultyLevel = 'Iniciante' | 'Intermediário' | 'Avançado' | 'Business' | 'Profissional';

export interface Lesson {
  id: string;
  trackId: TrackId;
  title: string;
  description: string;
  // Content as a function allows for lazy evaluation of the JSX tree
  content: () => React.ReactNode; 
  duration: string;
  level: DifficultyLevel;
}

export interface Track {
  id: TrackId;
  title: string;
  icon: React.ElementType;
  lessons: Lesson[];
}

export interface PromptResult {
  stylePrompt: string;
  explanation: string;
}

export interface PromptHistoryItem extends PromptResult {
  id: string;
  timestamp: number;
  originalInput: string;
}