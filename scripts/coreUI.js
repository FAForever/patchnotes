/**
 * Core UI Manager - Consolidated Script
 * Combines theme switching, background management, and style loading
 * Version: 2.1.0
 */

(function() {
    'use strict';
    
    // ========================================
    // THEME MANAGEMENT
    // ========================================
    
    const THEME_KEY = 'theme';
    const LIGHT_MODE_CLASS = 'light-mode';

    function toggleTheme() {
        const htmlElement = document.documentElement;
        const themeToggleButton = document.querySelector('#themeToggleButton');
        const themeText = themeToggleButton?.querySelector('.theme-text');
        const isLightMode = htmlElement.classList.toggle(LIGHT_MODE_CLASS);
        const newTheme = isLightMode ? 'light' : 'dark';

        // Update button text and aria-label for better accessibility
        if (themeToggleButton && themeText) {
            themeText.textContent = isLightMode ? 'Light' : 'Dark';
            themeToggleButton.setAttribute('aria-label', 
                isLightMode ? 'Switch to dark theme' : 'Switch to light theme'
            );
            themeToggleButton.setAttribute('title', 
                isLightMode ? 'Switch to dark theme' : 'Switch to light theme'
            );
        }

        try {
            localStorage.setItem(THEME_KEY, newTheme);
        } catch (e) {
            console.warn('Unable to access localStorage. Theme will reset on reload.');
        }
        
        // Trigger background update for new theme
        updateBackground();
    }

    function loadTheme() {
        const htmlElement = document.documentElement;
        const themeToggleButton = document.querySelector('#themeToggleButton');
        const themeText = themeToggleButton?.querySelector('.theme-text');
        
        let savedTheme;
        try {
            savedTheme = localStorage.getItem(THEME_KEY);
        } catch (e) {
            console.warn('Unable to access localStorage. Using default theme.');
        }

        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = savedTheme || (prefersDark ? 'dark' : 'light');
        const isLightMode = theme === 'light';

        if (isLightMode) {
            htmlElement.classList.add(LIGHT_MODE_CLASS);
        } else {
            htmlElement.classList.remove(LIGHT_MODE_CLASS);
        }

        // Update button text
        if (themeToggleButton && themeText) {
            themeText.textContent = isLightMode ? 'Light' : 'Dark';
            themeToggleButton.setAttribute('aria-label', 
                isLightMode ? 'Switch to dark theme' : 'Switch to light theme'
            );
            themeToggleButton.setAttribute('title', 
                isLightMode ? 'Switch to dark theme' : 'Switch to light theme'
            );
        }
    }

    function initTheme() {
        loadTheme();
        
        // Add event listener to theme toggle button
        const themeToggleButton = document.querySelector('#themeToggleButton');
        if (themeToggleButton) {
            themeToggleButton.addEventListener('click', toggleTheme);
        }
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem(THEME_KEY)) {
                loadTheme();
                updateBackground();
            }
        });
    }

    // ========================================
    // BACKGROUND MANAGEMENT
    // ========================================
    
    function updateBackground() {
        const bodyElement = document.body;
        
        // Always use solid background color - no more photo backgrounds
        bodyElement.style.backgroundColor = 'var(--Background)';
        bodyElement.style.backgroundImage = 'none';
        bodyElement.style.backgroundAttachment = 'initial';
        bodyElement.style.backgroundSize = 'initial';
        bodyElement.style.backgroundPosition = 'initial';
        bodyElement.style.backgroundRepeat = 'initial';
    }

    function initBackground() {
        updateBackground();
        
        // Listen for theme changes to update background accordingly
        window.addEventListener('stylesLoaded', updateBackground);
    }

    // ========================================
    // STYLE LOADING MANAGEMENT
    // ========================================
    
    let stylesLoaded = false;
    let domReady = false;
    
    function showContent() {
        if (stylesLoaded && domReady) {
            document.body.classList.add('styles-loaded');
            // Dispatch custom event for other scripts that might need to know
            window.dispatchEvent(new CustomEvent('stylesLoaded'));
        }
    }
    
    function checkStylesLoaded() {
        try {
            // Create test element to check if our main component styles are loaded
            const testEl = document.createElement('div');
            testEl.className = 'PatchCard';
            testEl.style.position = 'absolute';
            testEl.style.visibility = 'hidden';
            testEl.style.top = '-9999px';
            document.body.appendChild(testEl);
            
            const computed = window.getComputedStyle(testEl);
            const hasStyles = computed.getPropertyValue('background') || 
                             computed.getPropertyValue('border-radius') ||
                             computed.getPropertyValue('margin') ||
                             computed.getPropertyValue('padding');
            
            document.body.removeChild(testEl);
            
            if (hasStyles && hasStyles !== 'none' && hasStyles !== '0px') {
                stylesLoaded = true;
                showContent();
            } else {
                // Retry with exponential backoff
                setTimeout(checkStylesLoaded, Math.min(100, 10 * Math.pow(1.2, arguments[0] || 0)));
            }
        } catch (e) {
            console.warn('Style loading check failed:', e);
            // Fallback - show content after delay
            setTimeout(() => {
                stylesLoaded = true;
                showContent();
            }, 200);
        }
    }
    
    function initStyleLoader() {
        domReady = true;
        checkStylesLoaded();
    }

    // ========================================
    // CACHE MANAGEMENT UTILITIES
    // ========================================
    
    async function clearServiceWorkerCache() {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.ready;
                
                if (registration.active) {
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

    // ========================================
    // INITIALIZATION
    // ========================================
    
    function init() {
        initTheme();
        initBackground();
        initStyleLoader();
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Fallback timeout to ensure content is shown even if detection fails
    setTimeout(() => {
        if (!document.body.classList.contains('styles-loaded')) {
            console.warn('Style loading timeout - showing content anyway');
            document.body.classList.add('styles-loaded');
        }
    }, 500);
    
    // Additional check when all resources are loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (!stylesLoaded) {
                stylesLoaded = true;
                showContent();
            }
        }, 50);
    });
    
    // Export cache management functions for console use
    window.clearAllCaches = clearAllCaches;
    window.clearServiceWorkerCache = clearServiceWorkerCache;
    window.clearCSSCache = clearCSSCache;
    
})();
