/**
 * Style Loading Manager
 * Prevents FOUC (Flash of Unstyled Content) and ensures proper CSS loading
 */

(function() {
    'use strict';
    
    let stylesLoaded = false;
    let domReady = false;
    
    function showContent() {
        if (stylesLoaded && domReady) {
            document.body.classList.add('styles-loaded');
            // Dispatch custom event for other scripts that might need to know
            window.dispatchEvent(new CustomEvent('stylesLoaded'));
        }
    }
    
    /**
     * Check if styles are properly loaded by testing key CSS properties
     */
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
    
    /**
     * Initialize when DOM is ready
     */
    function init() {
        domReady = true;
        checkStylesLoaded();
    }
    
    // Set up event listeners
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        // DOM is already ready
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
})();
