const cacheName = "cache-v2";
const contentToCache = [
    "/", 
    "index.html",
    "main.js",
    "images/carteiro.jfif",
];

self.addEventListener("install", (evt) => {
	evt.waitUntil(
        caches.open(cacheName)
        .then(cache => {
            return cache.addAll(contentToCache);
        })
    );
});

self.addEventListener("fetch", (evt) => {
    // console.log(evt)
    evt.respondWith(
        caches.match(evt.request)
        .then(cachedResponse => {
            return cachedResponse || fetch(evt.request);
        })
    );
})

self.addEventListener("push", (evt) => {
    const title = "Cuidado!";
    const body = "Este homem está a 10m de sua localização";
    const icon = "images/icon.png";
    const tag = "minha-tag";

    evt.waitUntil(
        self.registration.showNotification(title, { 
            body: body,
            icon: icon,
            tag: tag,
        })
    );
})
