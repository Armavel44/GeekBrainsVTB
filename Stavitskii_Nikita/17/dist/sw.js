const cacheName = 'rchat-v1';
const staticAssets = [
    './',
    './main.css',
    './bundle.js',
    './api/chats.json',
    './api/profile.json'
];

self.addEventListener('install', async () => {
    const cache = await caches.open(cacheName);
    await cache.addAll(staticAssets);
    return self.skipWaiting();
});

// self.addEventListener('activate', event => {
//
// });

self.addEventListener('fetch', async event => {
    const req = event.request;
    const url = new URL(req.url);

    if(url.origin === location.origin){
        //event.respondWith(cacheFirst(req));
    } else {
        event.respondWith(networkAndCache(req));
    }
});


async function cacheFirst(req) {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(req);
    return cached || fetch(req);
}

async function networkAndCache(req) {
    const cache = await caches.open(cacheName);
    try {
        const connect = await fetch(req);
        await cache.put(req, connect.clone());
        return connect;
    } catch(error){
        return await cache.match(req);
    }
}

self.addEventListener('push', (event) => {
    let body;
    if(event.data){
        body = event.data.text();
    } else {
        body = 'Message no payload';
    }

    const options = {
        body,
        icon: '',
        actions: [
            {action: 'explore', title: 'Test', icon: ''},
            {action: 'close', title: 'Close', icon: ''},
        ],
    };

    event.waitUntil(
        self.registration.showNotification('Title', options)
    );
});

self.addEventListener('sync', (event) => {
    if(event.tag === 'mySync1'){
        //event.waitUntil(doFunc());
        console.log('Sync ok!. Tag - mySync1');
    }
});