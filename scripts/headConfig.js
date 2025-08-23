/**
 * Head Configuration Manager
 * Manages shared head elements for patch note pages
 */

(function() {
    'use strict';
    
    /**
     * Add preconnect links for better performance
     */
    function addPreconnects() {
        const preconnects = [
            { href: 'https://fonts.googleapis.com' },
            { href: 'https://fonts.gstatic.com', crossorigin: true },
            { href: 'https://cdnjs.cloudflare.com', crossorigin: true }
        ];
        
        preconnects.forEach(config => {
            const link = document.createElement('link');
            link.rel = 'preconnect';
            link.href = config.href;
            if (config.crossorigin) {
                link.crossOrigin = 'anonymous';
            }
            document.head.appendChild(link);
        });
    }
    
    /**
     * Add Font Awesome if not already present
     */
    function addFontAwesome() {
        // Check if Font Awesome is already loaded
        const existingFA = document.querySelector('link[href*="font-awesome"]');
        if (!existingFA) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
            link.crossOrigin = 'anonymous';
            link.referrerPolicy = 'no-referrer';
            document.head.appendChild(link);
        }
    }
    
    /**
     * Add main balance stylesheet if not already present
     */
    function addBalanceCSS() {
        const existing = document.querySelector('link[href*="balance.css"]');
        if (!existing) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            // Use timestamp to force cache bypass
            const timestamp = new Date().getTime();
            link.href = `/style/balance.css?v=${timestamp}`;
            document.head.appendChild(link);
        }
    }
    
    /**
     * Add critical CSS if not already present
     */
    function addCriticalCSS() {
        const existing = document.querySelector('link[href*="critical.css"]');
        if (!existing) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = '/style/critical.css';
            document.head.appendChild(link);
        }
    }
    
    /**
     * Add shared scripts if not already present
     */
    function addSharedScripts() {
        const scripts = [
            { src: '/scripts/coreUI.js?v=1724260000&cache=bypass', defer: false },
            { src: '/scripts/contentSidemenu.js?v=1724260000&cache=bypass', defer: false }
        ];
        
        scripts.forEach(config => {
            const existing = document.querySelector(`script[src*="${config.src.split('?')[0]}"]`);
            if (!existing) {
                const script = document.createElement('script');
                script.src = config.src;
                if (config.defer) {
                    script.defer = true;
                }
                script.onload = function() {
                    console.log('Script loaded:', config.src);
                };
                script.onerror = function() {
                    console.error('Script failed to load:', config.src);
                };
                document.head.appendChild(script);
            }
        });
    }
    
    /**
     * Initialize head configuration
     */
    function init() {
        addPreconnects();
        addCriticalCSS();
        addFontAwesome();
        addBalanceCSS();
        addSharedScripts();
    }
    
    // Run immediately if possible, or wait for head to be available
    if (document.head) {
        init();
    } else {
        document.addEventListener('DOMContentLoaded', init);
    }
})();
