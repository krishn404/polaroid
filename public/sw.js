// Cache version
const CACHE_NAME = "retrova-cache-v1";

// Assets to cache
const ASSETS_TO_CACHE = [
  "/",
  "/manifest.json",
  "/favicon.ico",
  "/retrova.jpg",
  "/styles/globals.css",
  "/icons/icon-192x192.png", // Example icon
  "/icons/icon-512x512.png", // Example icon
];

// Install event: Cache app shell
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Caching assets...");
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => {
        console.log("Assets cached successfully!");
        self.skipWaiting();
      })
      .catch((err) => console.error("Error caching assets:", err))
  );
});

// Activate event: Cleanup old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log(`Deleting old cache: ${cache}`);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event: Serve cached content when offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return cached response if found, otherwise fetch from network
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request)
        .then((networkResponse) => {
          // Optionally cache new requests
          if (event.request.url.startsWith(self.location.origin)) {
            return caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            });
          }
          return networkResponse;
        })
        .catch(() =>
          caches.match("/").then((fallbackResponse) => {
            // Optionally provide a fallback page if offline
            return fallbackResponse || new Response("Offline content not available.");
          })
        );
    })
  );
});
