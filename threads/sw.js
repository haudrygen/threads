const staticCacheName = 'site-static';
const assets = [
  '/',
  'index.html',
  'js/app.js',
  'js/script.js',
  'css/style.css',
  'images/logo.png',
  'https://fonts.googleapis.com/css?family=Roboto&display=swap'
];

self.addEventListener('install', evt => {
  //console.log('service worker has been installed');
  evt.waitUntil(
    caches.open(staticCacheName).then(cache => {
      console.log('caching shell assets');
      cache.addAll(assets);
    })
  );
});

self.addEventListener('activate', evt => {
  //console.log('service worker has been activated');
});

self.addEventListener('fetch', evt => {
  //console.log('fetch event', evt);
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  )
});
