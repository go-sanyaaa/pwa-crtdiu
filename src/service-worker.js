importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if(workbox){
    workbox.precaching.precacheAndRoute(self.__precacheManifest)

    workbox.routing.registerRoute(
        // Cache image files.
        new RegExp('https://crtdiu-app.ru/wp-json/v2/users/me'),
        // Use the cache if it's available.
        new workbox.strategies.NetworkFirst({
            // Use a custom cache name.
            cacheName: 'api-cache',
            // plugins: [
            //     new workbox.expiration.Plugin({
            //         // Cache only 20 images.
            //         maxEntries: 20,
            //         // Cache for a maximum of a week.
            //         maxAgeSeconds: 7 * 24 * 60 * 60,
            //     })
            // ],
        })
    );
}