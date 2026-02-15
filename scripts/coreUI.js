/**
 * Core UI Manager - Consolidated Script
 * Combines theme switching, background management, and style loading
 * Version: 2.3.0 - Enhanced with smooth transitions and auto-sync
 */

(function() {
    'use strict';
    
    // ========================================
    // THEME MANAGEMENT
    // ========================================
    
    const THEME_KEY = 'theme';
    const AUTO_THEME_KEY = 'autoTheme';
    const LIGHT_MODE_CLASS = 'light-mode';
    const THEME_TRANSITION_CLASS = 'theme-transition';

    /**
     * Enable smooth theme transitions
     */
    function enableTransitions() {
        document.documentElement.classList.add(THEME_TRANSITION_CLASS);
    }

    /**
     * Disable theme transitions temporarily
     */
    function disableTransitions() {
        document.documentElement.classList.remove(THEME_TRANSITION_CLASS);
    }

    /**
     * Toggle between light and dark theme
     */
    function toggleTheme() {
        const htmlElement = document.documentElement;
        const themeToggleButton = document.querySelector('#themeToggleButton');
        const themeText = themeToggleButton?.querySelector('.theme-text');
        
        // Enable smooth transitions
        enableTransitions();
        
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
            localStorage.removeItem(AUTO_THEME_KEY); // Disable auto theme
        } catch (e) {
            console.warn('Unable to access localStorage. Theme will reset on reload.');
        }
        
        // Trigger background update for new theme
        updateBackground();
        
        // Show notification
        showThemeNotification(`Switched to ${newTheme} theme`);
    }

    /**
     * Load and apply saved theme
     */
    function loadTheme() {
        const htmlElement = document.documentElement;
        const themeToggleButton = document.querySelector('#themeToggleButton');
        const themeText = themeToggleButton?.querySelector('.theme-text');
        
        let savedTheme;
        let autoTheme = false;
        
        try {
            savedTheme = localStorage.getItem(THEME_KEY);
            autoTheme = localStorage.getItem(AUTO_THEME_KEY) === 'true';
        } catch (e) {
            console.warn('Unable to access localStorage. Using default theme.');
        }

        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = (autoTheme || !savedTheme) ? (prefersDark ? 'dark' : 'light') : savedTheme;
        const isLightMode = theme === 'light';

        // Apply theme without transition on initial load
        disableTransitions();
        
        if (isLightMode) {
            htmlElement.classList.add(LIGHT_MODE_CLASS);
        } else {
            htmlElement.classList.remove(LIGHT_MODE_CLASS);
        }
        
        // Re-enable transitions after a short delay
        setTimeout(enableTransitions, 100);

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
    
    /**
     * Enable auto theme sync with system preferences
     */
    function enableAutoTheme() {
        try {
            localStorage.setItem(AUTO_THEME_KEY, 'true');
            localStorage.removeItem(THEME_KEY);
            
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            applyTheme(prefersDark ? 'dark' : 'light');
            
            showThemeNotification('Auto theme enabled');
        } catch (e) {
            console.warn('Failed to enable auto theme');
        }
    }
    
    /**
     * Apply a specific theme
     * @param {string} theme - 'light' or 'dark'
     */
    function applyTheme(theme) {
        const htmlElement = document.documentElement;
        const isLightMode = theme === 'light';
        
        enableTransitions();
        
        if (isLightMode) {
            htmlElement.classList.add(LIGHT_MODE_CLASS);
        } else {
            htmlElement.classList.remove(LIGHT_MODE_CLASS);
        }
        
        updateBackground();
        updateThemeButton();
    }
    
    /**
     * Update theme toggle button state
     */
    function updateThemeButton() {
        const themeToggleButton = document.querySelector('#themeToggleButton');
        const themeText = themeToggleButton?.querySelector('.theme-text');
        const isLightMode = document.documentElement.classList.contains(LIGHT_MODE_CLASS);
        
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
    
    /**
     * Show theme change notification
     * @param {string} message - Notification message
     */
    function showThemeNotification(message) {
        // Reuse keyboard shortcuts notification if available
        const notification = document.createElement('div');
        notification.className = 'shortcuts-notification theme-notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 10);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }

    /**
     * Initialize theme management
     */
    function initTheme() {
        loadTheme();
        
        // Add event listener to theme toggle button
        const themeToggleButton = document.querySelector('#themeToggleButton');
        if (themeToggleButton) {
            themeToggleButton.addEventListener('click', toggleTheme);
        }
        
        // Listen for system theme changes (only if auto theme is enabled)
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            try {
                const autoTheme = localStorage.getItem(AUTO_THEME_KEY) === 'true';
                const manualTheme = localStorage.getItem(THEME_KEY);
                
                if (autoTheme || !manualTheme) {
                    const newTheme = e.matches ? 'dark' : 'light';
                    applyTheme(newTheme);
                    showThemeNotification(`System theme changed to ${newTheme}`);
                }
            } catch (e) {
                // localStorage not available
            }
        });
        
        // Expose functions globally for keyboard shortcuts
        window.themeManager = {
            toggle: toggleTheme,
            enableAuto: enableAutoTheme,
            applyTheme: applyTheme
        };
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
    // FACTION THEME MANAGEMENT
    // ========================================
    
    const FACTION_KEY = 'factionTheme';
    
    const FACTION_COLORS = {
        default: {
            primary: '#4a9eff',
            secondary: '#2e7dd1',
            accent: '#3b8ed9'
        },
        aeon: {
            primary: '#2ecc71',
            secondary: '#27ae60',
            accent: '#1e8449'
        },
        uef: {
            primary: '#3498db',
            secondary: '#2980b9',
            accent: '#21618c'
        },
        cybran: {
            primary: '#e74c3c',
            secondary: '#c0392b',
            accent: '#922b21'
        },
        sera: {
            primary: '#f39c12',
            secondary: '#e67e22',
            accent: '#d35400'
        },
        'old-style': {
            primary: '#ff6600',
            secondary: '#ff8833',
            accent: '#ff9944'
        }
    };
    
    /**
     * Apply faction theme colors
     * @param {string} faction - 'default', 'aeon', 'uef', 'cybran', or 'sera'
     */
    function applyFactionTheme(faction) {
        const colors = FACTION_COLORS[faction] || FACTION_COLORS.default;
        const root = document.documentElement;
        
        // Apply CSS custom properties
        root.style.setProperty('--Link', colors.primary);
        root.style.setProperty('--Link-Hover', colors.secondary);
        root.style.setProperty('--Icon-Glow', colors.accent);
        
        // Save preference
        try {
            localStorage.setItem(FACTION_KEY, faction);
        } catch (e) {
            console.warn('Unable to save faction theme preference');
        }
        
        // Update button states
        updateFactionButtons(faction);
        
        // Show notification
        const factionName = faction.charAt(0).toUpperCase() + faction.slice(1);
        showThemeNotification(`${factionName} theme applied`);
    }
    
    /**
     * Update faction button active states
     * @param {string} activeFaction - The currently active faction
     */
    function updateFactionButtons(activeFaction) {
        const buttons = document.querySelectorAll('.FactionButton');
        buttons.forEach(button => {
            const faction = button.getAttribute('data-faction');
            if (faction === activeFaction) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }
    
    /**
     * Load saved faction theme
     */
    function loadFactionTheme() {
        let savedFaction = 'default';
        
        try {
            savedFaction = localStorage.getItem(FACTION_KEY) || 'default';
        } catch (e) {
            console.warn('Unable to load faction theme preference');
        }
        
        applyFactionTheme(savedFaction);
    }
    
    /**
     * Initialize faction theme management
     */
    function initFactionTheme() {
        loadFactionTheme();
        
        // Add event listeners to faction buttons
        const factionButtons = document.querySelectorAll('.FactionButton');
        factionButtons.forEach(button => {
            button.addEventListener('click', () => {
                const faction = button.getAttribute('data-faction');
                applyFactionTheme(faction);
            });
        });
        
        // Expose function globally
        window.factionThemeManager = {
            applyTheme: applyFactionTheme
        };
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
    // ========================================
    // FACTION RANDOMIZATION
    // ========================================
    
    function initRandomFactions() {
        const factions = [
            { name: 'UEF', src: './assets/images/faction/UEF.svg', alt: 'UEF Faction Logo' },
            { name: 'Cybran', src: './assets/images/faction/Cybran.svg', alt: 'Cybran Faction Logo' },
            { name: 'Aeon', src: './assets/images/faction/Aeon.svg', alt: 'Aeon Faction Logo' },
            { name: 'Seraphim', src: './assets/images/faction/Seraphim.svg', alt: 'Seraphim Faction Logo' }
        ];
        
        // Shuffle array and pick first 2
        const shuffled = [...factions].sort(() => Math.random() - 0.5);
        const selectedFactions = shuffled.slice(0, 2);
        
        // Update left faction icon
        const leftIcon = document.getElementById('faction-left');
        if (leftIcon && selectedFactions[0]) {
            leftIcon.src = selectedFactions[0].src;
            leftIcon.alt = selectedFactions[0].alt;
            leftIcon.className = `FactionIcon ${selectedFactions[0].name.toUpperCase()}`;
        }
        
        // Update right faction icon
        const rightIcon = document.getElementById('faction-right');
        if (rightIcon && selectedFactions[1]) {
            rightIcon.src = selectedFactions[1].src;
            rightIcon.alt = selectedFactions[1].alt;
            rightIcon.className = `FactionIcon ${selectedFactions[1].name.toUpperCase()}`;
        }
        
        console.log('Random factions loaded:', selectedFactions.map(f => f.name));
    }
    
    function init() {
        initTheme();
        initBackground();
        initFactionTheme();
        initStyleLoader();
        initRandomFactions();
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
    window.randomizeFactions = initRandomFactions;
    
})();
