import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Loading } from './components/Loading';

// Lazy load pages to reduce initial bundle size and improve TTFB
const Home = React.lazy(() => import('./pages/Home'));
const GeneratorPage = React.lazy(() => import('./pages/GeneratorPage'));
const LessonPage = React.lazy(() => import('./pages/LessonPage'));

function App() {
  return (
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
  );
}

export default App;