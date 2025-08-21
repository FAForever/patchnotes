/**
 * Service Worker Cache Cleaner
 * Run this in browser console to clear service worker cache
 */

// Clear Service Worker Cache
if ('serviceWorker' in navigator && 'caches' in window) {
    // Unregister service worker
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
        for(let registration of registrations) {
            console.log('Unregistering service worker:', registration);
            registration.unregister();
        }
    });
    
    // Clear all caches
    caches.keys().then(function(cacheNames) {
        return Promise.all(
            cacheNames.map(function(cacheName) {
                console.log('Deleting cache:', cacheName);
                return caches.delete(cacheName);
            })
        );
    }).then(function() {
        console.log('All caches cleared!');
        console.log('Please refresh the page to see updated styles.');
    });
} else {
    console.log('Service Workers or Cache API not supported');
}

// Also clear localStorage and sessionStorage
localStorage.clear();
sessionStorage.clear();
console.log('Local storage cleared!');
