const CACHE_NAME = 'harmonia-viva-v3';
const EXTERNAL_LIB_CACHE = 'external-libs-v2';

// Clean install
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// Clean up old caches
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

  // 1. External CDNs (Fonts, Tailwind via build) -> Cache First
  // Note: Even if we removed Tailwind CDN from index.html, fonts are still external
  if (requestUrl.hostname === 'fonts.googleapis.com' || requestUrl.hostname === 'fonts.gstatic.com') {
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

  // 2. Navigation Requests (HTML) -> Network First
  // Ensure user always gets the latest index.html so they get the latest JS bundle hashes
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return caches.match('./index.html');
        })
    );
    return;
  }

  // 3. Static Assets (JS, CSS, Images in /assets/) -> Cache First
  // Vite generates files with hashes (e.g., index-123.js), so they are immutable.
  if (requestUrl.pathname.startsWith('/assets/')) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse;
          return fetch(event.request).then((networkResponse) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        });
      })
    );
    return;
  }

  // 4. Default -> Network First
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});