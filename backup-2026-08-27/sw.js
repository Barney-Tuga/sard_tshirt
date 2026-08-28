const CACHE_NAME = 'sard-store-v4';
const ASSETS = [
  './',
  './index.html',
  './admin.html',
  './catalogo.html',
  './style.css',
  './store.css',
  './app.js',
  './store.js',
  './catalogo.js',
  './assets/catalogo-26-27/sporting-principal.webp',
  './assets/catalogo-26-27/sporting-principal-frente.webp',
  './assets/catalogo-26-27/sporting-especial.webp',
  './assets/catalogo-26-27/benfica-principal.webp',
  './assets/catalogo-26-27/benfica-principal-frente.webp',
  './assets/catalogo-26-27/benfica-alternativa.webp',
  './assets/catalogo-26-27/porto-principal.webp',
  './assets/catalogo-26-27/porto-principal-frente.webp',
  './assets/catalogo-26-27/porto-alternativa.webp',
  './assets/catalogo-26-27/porto-terceira.webp',
  './assets/catalogo-26-27/porto-especial.webp',
  './assets/catalogo-26-27/porto-kids-principal.webp',
  './assets/catalogo-26-27/porto-kids-alternativa.webp',
  './assets/catalogo-26-27/porto-kids-terceira.webp',
  './assets/catalogo-26-27/real-madrid-principal.webp',
  './assets/catalogo-26-27/real-madrid-alternativa.webp',
  './assets/catalogo-26-27/barcelona-principal.webp',
  './assets/catalogo-26-27/psg-principal.webp',
  './manifest.json',
  './icon.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      }).catch(() => cached);
    })
  );
});
