importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js"
);

workbox.core.skipWaiting();
workbox.core.clientsClaim();

const precacheController = new workbox.precaching.PrecacheController();
precacheController.addToCacheList([]); //populated at build-time with workbox-cli

self.addEventListener("fetch", (event) => {
  var url = event.request.url.endsWith("/")
    ? event.request.url + "index.html"
    : event.request.url;
  event.respondWith(
    fetch(url).catch(function () {
      new Promise(function (resolve) {
        if (precacheController.getCachedUrls().indexOf(url) > -1) {
          resolve(
            caches
              .open(workbox.core.cacheNames.precache)
              .then((cache) => {
                return cache.match(url);
              })
              .then((cachedResponse) => {
                return cachedResponse;
              })
          );
        } else {
          resolve(fetch(event.request));
        }
      });
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(precacheController.activate());
  self.clients.claim();
});

self.addEventListener("install", function (event) {
  self.skipWaiting();
  var timeoutId = null;
  event.waitUntil(
    new Promise(function (resolve, reject) {
      if (self.registration.waiting) {
        var channel = new MessageChannel();
        channel.port1.onmessage = function (event) {
          resolve();
        };

        //tell the current 'waiting' instance to cleanup its temp cache
        self.registration.waiting.postMessage(
          {
            action: "cleanupCache",
          },
          [channel.port2]
        );
      } else {
        resolve();
      }
    }).finally(function () {
      //once temp cache is cleaned up from any 'waiting' instance, begin my install
      return precacheController.install();
    })
  );
});

self.addEventListener("message", function (event) {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
    self.clients.claim();
  }
  if (event.data.action === "cleanupCache") {
    //move files from temp cache to permanent cache
    precacheController.activate().finally(function () {
      if (event.ports[0]) {
        event.ports[0].postMessage("cleanupComplete");
      }
    });
  }
});
