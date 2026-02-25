const CACHE_NAME = `timeCapsuleCache-v${new Date().getTime()}`; 
const FILES_TO_CACHE = [
  "file.html",
  "file.js",
  "file.css",
];

// Install event: Caches files
self.addEventListener("install", (e) => {
  console.log("Service Worker: Installing...");

  e.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log("Service Worker: Caching Files");
        return cache.addAll(FILES_TO_CACHE).catch(err => console.error("Service Worker: Caching files failed", err));
      })
      .then(() => self.skipWaiting())   );
});

// Activate event: Cleans up old caches
self.addEventListener("activate", (e) => {
  console.log("Service Worker: Activating...");

  const cacheWhitelist = [CACHE_NAME];

  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log("Service Worker: Deleting old cache", cacheName);
            return caches.delete(cacheName);  
          }
        })
      );
    }).then(() => {
      console.log("Service Worker: Activation complete.");
      return self.clients.claim(); 
    })
  );
});

// Fetch event: Serve cached files if available
self.addEventListener("fetch", (e) => {
  console.log("Service Worker: Fetching", e.request.url);

  if (e.request.url.includes("/api/")) { 
    e.respondWith(
      fetch(e.request)
        .then((networkResponse) => {
          // Cache the new resource for future use
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(e.request, networkResponse.clone());
            });
          }
          return networkResponse;
        })
        .catch(() => caches.match(e.request)) );
  } else {
    e.respondWith(
      caches.match(e.request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            console.log("Service Worker: Returning cached response");
            return cachedResponse;
          }

          return fetch(e.request).then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(e.request, networkResponse.clone());
              });
            }
            return networkResponse;
          });
        })
        .catch(() => {
          console.error("Service Worker: Fetch failed, returning fallback.");
          return caches.match('/offline.html');
        })
    );
  }
});
