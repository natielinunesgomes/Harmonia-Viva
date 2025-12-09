import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Loading } from './components/Loading';
import { AccessWarningModal } from './components/AccessWarningModal';
import { ProgressProvider } from './contexts/ProgressContext';
import { Confetti } from './components/Confetti';
import { GraduationCelebration } from './components/GraduationCelebration';

// Eager load core pages for instant navigation
import Home from './pages/Home';
import GeneratorPage from './pages/GeneratorPage';

// Lazy load lesson content to split heavy text content
const LessonPage = React.lazy(() => import('./pages/LessonPage'));

function App() {
  return (
    <ProgressProvider>
      <Confetti />
      <GraduationCelebration />
      <AccessWarningModal />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="generator" element={<GeneratorPage />} />
          <Route path="lesson/:id" element={
            <Suspense fallback={<Loading />}>
              <LessonPage />
            </Suspense>
          } />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </ProgressProvider>
  );
}

export default App;