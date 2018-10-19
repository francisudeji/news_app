const CACHE_NAME = "static-cache";
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
		caches.open(CACHE_NAME)
			.then(cache => {
				cache.addAll(filesToCache);
			})
	);
});

// activate event
self.addEventListener("activate", e => {
  console.log(`[SW Activated]`);
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME){
            console.log("[SW] deleting cached files from", cacheName);
		  	return caches.delete(cacheName);
		  }
        })
      );
    })
  );
});


self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.open(CACHE_NAME).then((cache) => {
			return cache.match(event.request).then((response) => {
				const promise = fetch(event.request).then((networkResponse) => {
					cache.put(event.request, networkResponse.clone());
					return networkResponse;
				})
				return response || promise;
			})
		})
	);
});