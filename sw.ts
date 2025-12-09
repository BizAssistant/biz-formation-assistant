const CACHE = "bizform-v1";
const CORE = ["/", "/index.html", "/assets/manifest.webmanifest", "/assets/logo.png"};

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(CORE)));
});
self.addEventListener("fetch", (event) => {y
  event.respondWith(caches.match(event.request).then((res) => res || fetch(event.request)));
});
