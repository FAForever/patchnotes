/**
 * Service Worker Cache Cleaner
 * Updated to work with new service worker message handling
 */

// Clear Service Worker Cache with messaging
async function clearServiceWorkerCache() {
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.ready;
            
            if (registration.active) {
                // Send message to service worker to clear cache
                const messageChannel = new MessageChannel();
                
                return new Promise((resolve) => {
                    messageChannel.port1.onmessage = (event) => {
                        if (event.data.success) {
                            console.log('✅ Service Worker cache cleared successfully');
                            resolve(true);
                        }
                    };
                    
                    registration.active.postMessage(
                        { type: 'CLEAR_CACHE' },
                        [messageChannel.port2]
                    );
                });
            }
        } catch (error) {
            console.error('❌ Failed to clear service worker cache:', error);
            return false;
        }
    }
    return false;
}

// Clear CSS Cache specifically
async function clearCSSCache() {
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.ready;
            
            if (registration.active) {
                const messageChannel = new MessageChannel();
                
                return new Promise((resolve) => {
                    messageChannel.port1.onmessage = (event) => {
                        if (event.data.success) {
                            console.log('✅ CSS cache cleared successfully');
                            resolve(true);
                        }
                    };
                    
                    registration.active.postMessage(
                        { type: 'CLEAR_CSS_CACHE' },
                        [messageChannel.port2]
                    );
                });
            }
        } catch (error) {
            console.error('❌ Failed to clear CSS cache:', error);
            return false;
        }
    }
    return false;
}

// Complete cache clear function
async function clearAllCaches() {
    console.log('🧹 Starting cache clearing process...');
    
    // Clear service worker caches
    await clearServiceWorkerCache();
    
    // Clear browser caches directly
    if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(
            cacheNames.map(cacheName => {
                console.log('🗑️ Deleting browser cache:', cacheName);
                return caches.delete(cacheName);
            })
        );
    }
    
    // Clear local storage
    localStorage.clear();
    sessionStorage.clear();
    console.log('🗑️ Local storage cleared');
    
    console.log('✨ All caches cleared! Reloading page...');
    
    // Force reload from server
    window.location.reload(true);
}

// Export for use in console or other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { clearAllCaches, clearServiceWorkerCache, clearCSSCache };
} else {
    window.clearAllCaches = clearAllCaches;
    window.clearServiceWorkerCache = clearServiceWorkerCache;
    window.clearCSSCache = clearCSSCache;
}
