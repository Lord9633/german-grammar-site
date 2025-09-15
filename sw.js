const CACHE_NAME = "german-grammar-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/about.html",
  "/levels.html",
  "/practice/index.html",
  "/css/style.css",
  "/images/german-flag.png"
];

// Install event - cache files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

// Fetch event - load from cache if offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
