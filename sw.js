const cacheName = "v1";
const filesToCache = [

	"/index.html",
	"/manifest.json"
	// "./css/style.css",
	// "./js/app.js",
	// "./images/unbox-icon.png",
	// "./images/unbox-logo.png",
	// "./images/image_unavailable.jpeg",
	// "./images/icons/icon-72x72.png",
	// "./images/icons/icon-96x96.png",
	// "./images/icons/icon-128x128.png",
	// "./images/icons/icon-144x144.png",
	// "./images/icons/icon-152x152.png",
	// "./images/icons/icon-192x192.png",
	// "./images/icons/icon-384x384.png",
	// "./images/icons/icon-512x512.png",
	// "./images/cat.jpeg",
    // "./images/logo.png",
    // "./images/404.jpg"
];

// install event
self.addEventListener('install', e => {
    console.log("[sw installed]");
    e.waitUntil(
        caches.open(cacheName)
        .then(cache => {
            cache.addAll([
                '/',
                '/css/style.css'
            ]);
            console.log(cache)
        })
        .catch(error => console.log({error}))
    );
});


// activate event
self.addEventListener('activate', e => {
    console.log(`[SW]Activating ${cacheName}`)
});

