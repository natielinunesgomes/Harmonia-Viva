import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LessonContent } from '../components/LessonContent';
import { ALL_LESSONS } from '../constants';

const LessonPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Memoize lesson lookup to avoid recalculation on render
  const lesson = React.useMemo(() => ALL_LESSONS.find(l => l.id === id), [id]);

  if (!lesson) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[50vh] text-center px-4 animate-fade-in">
        <h2 className="text-2xl font-bold text-white mb-2">Lição não encontrada</h2>
        <p className="text-gray-400 mb-6">A lição que você procura não existe ou foi removida.</p>
        <button 
          onClick={() => navigate('/')} 
          className="px-6 py-3 bg-pink-600 hover:bg-pink-500 text-white rounded-lg font-medium transition-colors"
        >
          Voltar ao Início
        </button>
      </div>
    );
  }

  const handleComplete = () => {
    const currentIndex = ALL_LESSONS.findIndex(l => l.id === id);
    if (currentIndex >= 0 && currentIndex < ALL_LESSONS.length - 1) {
      navigate(`/lesson/${ALL_LESSONS[currentIndex + 1].id}`);
    } else {
      // Finished all lessons, go back home
      navigate('/');
    }
  };

  return (
    <div className="px-4 py-8 md:px-12 md:py-12">
      <LessonContent lesson={lesson} onComplete={handleComplete} />
    </div>
  );
};

export default LessonPage;