const CACHE_NAME = 'formula9-v15';
const BASE = '/formula9';
const ASSETS = [
  `${BASE}/`,
  `${BASE}/index.html`,
  `${BASE}/manifest.json`,
  `${BASE}/assets/css/style.css`,
  `${BASE}/assets/flags/ee.svg`,
  `${BASE}/assets/flags/gb.svg`,
  `${BASE}/assets/flags/ua.svg`,
  `${BASE}/assets/flags/ru.svg`,
  `${BASE}/assets/icons/icon-192.png`,
  `${BASE}/assets/icons/icon-512.png`,
  `${BASE}/lib/katex/katex.min.js`,
  `${BASE}/lib/katex/katex.min.css`,
  `${BASE}/lib/katex/fonts/KaTeX_AMS-Regular.woff2`,
  `${BASE}/lib/katex/fonts/KaTeX_Caligraphic-Bold.woff2`,
  `${BASE}/lib/katex/fonts/KaTeX_Caligraphic-Regular.woff2`,
  `${BASE}/lib/katex/fonts/KaTeX_Fraktur-Bold.woff2`,
  `${BASE}/lib/katex/fonts/KaTeX_Fraktur-Regular.woff2`,
  `${BASE}/lib/katex/fonts/KaTeX_Main-Bold.woff2`,
  `${BASE}/lib/katex/fonts/KaTeX_Main-BoldItalic.woff2`,
  `${BASE}/lib/katex/fonts/KaTeX_Main-Italic.woff2`,
  `${BASE}/lib/katex/fonts/KaTeX_Main-Regular.woff2`,
  `${BASE}/lib/katex/fonts/KaTeX_Math-BoldItalic.woff2`,
  `${BASE}/lib/katex/fonts/KaTeX_Math-Italic.woff2`,
  `${BASE}/lib/katex/fonts/KaTeX_Math-Regular.woff2`,
  `${BASE}/lib/katex/fonts/KaTeX_SansSerif-Bold.woff2`,
  `${BASE}/lib/katex/fonts/KaTeX_SansSerif-Italic.woff2`,
  `${BASE}/lib/katex/fonts/KaTeX_SansSerif-Regular.woff2`,
  `${BASE}/lib/katex/fonts/KaTeX_Script-Regular.woff2`,
  `${BASE}/lib/katex/fonts/KaTeX_Size1-Regular.woff2`,
  `${BASE}/lib/katex/fonts/KaTeX_Size2-Regular.woff2`,
  `${BASE}/lib/katex/fonts/KaTeX_Size3-Regular.woff2`,
  `${BASE}/lib/katex/fonts/KaTeX_Size4-Regular.woff2`,
  `${BASE}/lib/katex/fonts/KaTeX_Typewriter-Regular.woff2`,
  `${BASE}/lib/mathlive/mathlive.min.js`,
  `${BASE}/src/data/formulas.js`,
  `${BASE}/src/modules/router.js`,
  `${BASE}/src/modules/i18n.js`,
  `${BASE}/src/modules/taskEngine.js`,
  `${BASE}/src/modules/checker.js`,
  `${BASE}/src/modules/progress.js`,
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
