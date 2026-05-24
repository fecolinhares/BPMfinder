self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('bpmfinder-v1').then((cache) => {
      return cache.addAll([
        '/',
        'https://cdn.jsdelivr.net/npm/essentia.js@0.1.3/dist/essentia.js-core.umd.min.js',
        'https://cdn.jsdelivr.net/npm/essentia.js@0.1.3/dist/essentia-wasm.web.js',
      ]);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  // Only cache GET requests
  if (request.method !== 'GET') return;
  
  // For CDN resources, try network first, fall back to cache
  if (request.url.includes('cdn.jsdelivr.net')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open('bpmfinder-v1').then((cache) => cache.put(request, clone));
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // For local assets, stale-while-revalidate
  event.respondWith(
    caches.match(request).then((cached) => {
      const fetchPromise = fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open('bpmfinder-v1').then((cache) => cache.put(request, clone));
          return response;
        })
        .catch(() => cached);
      return cached || fetchPromise;
    })
  );
});
