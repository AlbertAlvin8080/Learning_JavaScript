"use strict";
const dynamicCacheName = "dynamic-cache-8";
const dynamicCacheSize = 15;
// 
const fallbackPage = "html/fallback.html";
const staticCacheName = "static-cache-v12";
const contentToCache = [
    "/", 
    "index.html",
	"js/index.js",
	"js/db.js",
	"js/ui.js",
	"manifest.json",
    "estilos/mobile.css",
    "estilos/desktop.css",
	"imagens/queso-taco.png",
	fallbackPage,
	"imagens/jean_xeroso.webp",
	"imagens/icon192.png",
];

async function ensureCacheLimit(cacheName, size) {
	const cache = await caches.open(cacheName);
	const keys = await cache.keys();
	console.log(keys);
	if(keys.length > size) {
		await cache.delete(keys[0]);
		ensureCacheLimit(cacheName, size);
	}
}

self.addEventListener("install", (evt) => {
	evt.waitUntil(
		caches.open(staticCacheName).then((cache) => {
			console.log("caching shell assets");
			cache.addAll(contentToCache);
		})
	);
});

self.addEventListener("activate", (evt) => {
	evt.waitUntil(
		caches.keys().then((keys) => {
			// console.log("old cache: ", keys);
			return Promise.all(
				keys
					.filter((key) => key !== staticCacheName && key !== dynamicCacheName)
					.map((key) => caches.delete(key))
			);
		})
	);
});

self.addEventListener("fetch", (evt) => {
	if(evt.request.url.indexOf("firestore.googleapis.com") === -1) {
		evt.respondWith(
			caches.match(evt.request)
			.then((cacheRes) => {
				return cacheRes || fetch(evt.request).then(response => {
					return caches.open(dynamicCacheName)
						.then(cache => {
							cache.put(evt.request.url, response.clone());
							ensureCacheLimit(dynamicCacheName, dynamicCacheSize);
							return response;
						});
				});
			})
			.catch(() => {
				if(evt.request.url.indexOf(".html") > -1)
					return caches.match(fallbackPage);
			})
		);
	}
});
