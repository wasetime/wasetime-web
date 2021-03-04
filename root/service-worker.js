importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js"
);

workbox.core.skipWaiting();
workbox.core.clientsClaim();
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

workbox.core.setCacheNameDetails({
  prefix: "wasedatime-cache",
  precache: "precache",
  runtime: "runtime",
});

workbox.routing.registerRoute(
  ({ event }) => event.request.mode === "navigate",
  new workbox.strategies.NetworkFirst()
);

workbox.routing.registerRoute(
  /.*\.(?:js|css)/,
  new workbox.strategies.NetworkFirst()
);

workbox.routing.registerRoute(
  /.*\.(?:png|jpg|jpeg|svg|gif|woff|woff2|eot|ttf|otf)/,
  new workbox.strategies.StaleWhileRevalidate()
);

self.addEventListener("message", function (event) {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
    self.clients.claim();
  }
});
