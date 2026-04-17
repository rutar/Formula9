const CACHE_NAME = 'formula9-v5';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './assets/css/style.css',
  './lib/katex/katex.min.js',
  './lib/katex/katex.min.css',
  './lib/mathlive/mathlive.min.js',
  './src/data/formulas.js',
  './src/modules/router.js',
  './src/modules/taskEngine.js',
  './src/modules/checker.js',
  './src/modules/progress.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
