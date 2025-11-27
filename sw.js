const CACHE_NAME = 'harmonia-viva-v1';
const EXTERNAL_LIB_CACHE = 'external-libs-v1';

const URLS_TO_CACHE = [
  './',
  './index.html',
  './index.tsx',
  './App.tsx',
  './types.ts',
  './constants.tsx',
  './services/geminiService.ts',
  './components/Layout.tsx',
  './components/LessonContent.tsx',
  './components/PromptGenerator.tsx',
  './components/PromotionalBanner.tsx',
  './components/Loading.tsx',
  './pages/Home.tsx',
  './pages/LessonPage.tsx',
  './pages/GeneratorPage.tsx'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== EXTERNAL_LIB_CACHE) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);

  // Strategy for External CDNs (Libraries): Cache First, then Network
  // These files are versioned and unlikely to change often.
  if (requestUrl.hostname === 'aistudiocdn.com' || requestUrl.hostname === 'cdn.tailwindcss.com') {
    event.respondWith(
      caches.open(EXTERNAL_LIB_CACHE).then((cache) => {
        return cache.match(event.request).then((response) => {
          return response || fetch(event.request).then((networkResponse) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        });
      })
    );
    return;
  }

  // Strategy for App Files: Network First, then Cache (Stale-while-revalidate fallback)
  // Ensures user gets the latest code updates but falls back to cache if offline/slow.
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        // Clone and cache the updated file
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return response;
      })
      .catch(() => {
        // Network failed, try cache
        return caches.match(event.request);
      })
  );
});