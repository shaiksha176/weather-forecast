var CACHE_NAME = "weather-cache-v1";
var urlsToCache = ["index.html", "offline.html"];
var self = this;

//SERVICE WORKER INSTALLATION

self.addEventListener("install", function (event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

//LISTEN FOR REQUESTS

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function () {
      // Cache hit - return response
      return fetch(event.request).catch(() => caches.match("offline.html"));
    })
  );
});

//ACTIVATE SERVICE WORKER

self.addEventListener("activate", function (event) {
  var cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
