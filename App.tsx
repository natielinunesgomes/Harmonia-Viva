import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Loading } from './components/Loading';
import { AccessWarningModal } from './components/AccessWarningModal';
import { ProgressProvider } from './contexts/ProgressContext';
import { Confetti } from './components/Confetti';

// Lazy load pages to reduce initial bundle size and improve TTFB
const Home = React.lazy(() => import('./pages/Home'));
const LessonPage = React.lazy(() => import('./pages/LessonPage'));
const GeneratorPage = React.lazy(() => import('./pages/GeneratorPage'));

function App() {
  return (
    <ProgressProvider>
      <Confetti />
      <AccessWarningModal />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={
            <Suspense fallback={<Loading />}>
              <Home />
            </Suspense>
          } />
          <Route path="generator" element={
            <Suspense fallback={<Loading />}>
              <GeneratorPage />
            </Suspense>
          } />
          <Route path="lesson/:id" element={
            <Suspense fallback={<Loading />}>
              <LessonPage />
            </Suspense>
          } />
          <Route path="*" element={
            <Suspense fallback={<Loading />}>
              <Home />
            </Suspense>
          } />
        </Route>
      </Routes>
    </ProgressProvider>
  );
}

export default App;