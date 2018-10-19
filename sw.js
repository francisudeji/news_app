const cacheV1 = "news-app-cache-files";
const filesToCache = [
  "/index.html",
  "/manifest.json",
  "/css/style.css",
  "/js/app.js",
  "/images/icons/icon-72x72.png",
  "/images/icons/icon-96x96.png",
  "/images/icons/icon-128x128.png",
  "/images/icons/icon-144x144.png",
  "/images/icons/icon-152x152.png",
  "/images/icons/icon-192x192.png",
  "/images/icons/icon-384x384.png",
  "/images/icons/icon-512x512.png",
  "/images/cat.jpeg",
  "/images/logo.png",
  "/images/404.jpg"
];

// install event
self.addEventListener("install", e => {
  console.log("[sw installed]");
  e.waitUntil(
    caches
      .open(cacheV1)
      .then(cache => {
        console.log("[SW] Caching cachefiles");
        return cache.addAll(filesToCache);
      })
      .catch(error => console.log({ error }))
  );
});

// activate event
self.addEventListener("activate", e => {
  console.log(`[SW Activated]`);
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheV1 === cacheName) return caches.delete(cacheName);
        })
      );
    })
  );
});

// fetch event
self.addEventListener("fetch", e => {
  console.log("[SW fetched]");
  e.respondWith(
    caches.match(e.request).then(response => {
      if (response) {
        console.log("[SW] found in cache", e.request.url);
        return response;
      }

      const requestClone = e.request.clone();

      fetch(requestClone)
        .then(response => {
          if (!response) {
            console.log("[SW] no response");
            return response;
          }

          const responseClone = response.clone();
          caches.open(cacheV1).then(cache => {
            cache.put(e.request, responseClone);
            return response;
          });
        })
        .catch(error => console.log("[SW] ERROR Fetching ", {error}));
    })
  );
});
