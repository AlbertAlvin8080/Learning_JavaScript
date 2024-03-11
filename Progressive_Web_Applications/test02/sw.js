"use strict";

const cacheName = "cache-v1";
const cacheContent = [
    '/',
    'manifest.json',
    'src/main.css',
    'src/main.js',
    'images/carteiro.jfif',
    'images/icon192.png',
];

self.addEventListener("install", (evt) => {
    evt.waitUntil(
        caches.open(cacheName)
        .then(cache => cache.addAll(cacheContent))
        .catch(err => console.error(err))
    );
});

self.addEventListener("fetch", (evt) => {
    console.log(evt.request.url);
    evt.respondWith(
        caches.match(evt.request)
        .then(cachedResponse => {
            return cachedResponse || fetch(evt.request);
        })
    );
});

self.addEventListener("push", (evt) => {
    const title = "Cuidado!";
    const body = "Este homem está a 100 m de sua localização.";
    const icon = "images/icon192.png";
    const tag = "generic-tag";

    evt.waitUntil(
        self.registration.showNotification(title, {
            body: body,
            icon: icon,
            tag: tag
        })
    );
});