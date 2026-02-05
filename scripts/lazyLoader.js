/**
 * Lazy Loading Management
 * Implements intersection observer for efficient loading of patches and images
 * @version 1.0.0
 */

(function() {
  'use strict';
  
  class LazyLoader {
    constructor(options = {}) {
      this.logger = window.Logger ? new Logger('LazyLoader') : console;
      this.options = {
        rootMargin: options.rootMargin || '50px',
        threshold: options.threshold || 0.01,
        loadingClass: options.loadingClass || 'lazy-loading',
        loadedClass: options.loadedClass || 'lazy-loaded',
        ...options
      };
      
      this.observer = null;
      this.init();
    }
    
    /**
     * Initialize the Intersection Observer
     */
    init() {
      if (!('IntersectionObserver' in window)) {
        this.logger.warn?.('IntersectionObserver not supported, falling back to immediate loading');
        this.fallbackLoad();
        return;
      }
      
      this.observer = new IntersectionObserver(
        this.handleIntersection.bind(this),
        {
          root: null,
          rootMargin: this.options.rootMargin,
          threshold: this.options.threshold
        }
      );
      
      this.logger.debug?.('LazyLoader initialized');
    }
    
    /**
     * Handle intersection observer callback
     * @param {Array} entries - Intersection observer entries
     */
    handleIntersection(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadElement(entry.target);
          this.observer.unobserve(entry.target);
        }
      });
    }
    
    /**
     * Load an element (image or patch card)
     * @param {HTMLElement} element - Element to load
     */
    loadElement(element) {
      element.classList.add(this.options.loadingClass);
      
      // Handle images
      if (element.tagName === 'IMG' && element.dataset.src) {
        this.loadImage(element);
      }
      // Handle background images
      else if (element.dataset.bgSrc) {
        this.loadBackgroundImage(element);
      }
      // Handle patch cards
      else if (element.classList.contains('patch-item')) {
        this.loadPatchCard(element);
      }
    }
    
    /**
     * Load an image element
     * @param {HTMLImageElement} img - Image element
     */
    loadImage(img) {
      const src = img.dataset.src;
      const srcset = img.dataset.srcset;
      
      // Create a temporary image to check if it loads
      const tempImg = new Image();
      
      tempImg.onload = () => {
        img.src = src;
        if (srcset) {
          img.srcset = srcset;
        }
        img.classList.remove(this.options.loadingClass);
        img.classList.add(this.options.loadedClass);
        this.logger.debug?.('Image loaded:', src);
      };
      
      tempImg.onerror = () => {
        img.classList.remove(this.options.loadingClass);
        img.classList.add('lazy-error');
        this.logger.error?.('Failed to load image:', src);
      };
      
      tempImg.src = src;
    }
    
    /**
     * Load a background image
     * @param {HTMLElement} element - Element with background image
     */
    loadBackgroundImage(element) {
      const bgSrc = element.dataset.bgSrc;
      
      const tempImg = new Image();
      tempImg.onload = () => {
        element.style.backgroundImage = `url('${bgSrc}')`;
        element.classList.remove(this.options.loadingClass);
        element.classList.add(this.options.loadedClass);
        this.logger.debug?.('Background image loaded:', bgSrc);
      };
      
      tempImg.onerror = () => {
        element.classList.remove(this.options.loadingClass);
        element.classList.add('lazy-error');
        this.logger.error?.('Failed to load background image:', bgSrc);
      };
      
      tempImg.src = bgSrc;
    }
    
    /**
     * Load a patch card (for virtual scrolling)
     * @param {HTMLElement} card - Patch card element
     */
    loadPatchCard(card) {
      // Patch cards are already rendered, just mark as loaded
      // This is mainly for analytics and potential future enhancements
      card.classList.remove(this.options.loadingClass);
      card.classList.add(this.options.loadedClass);
    }
    
    /**
     * Observe elements for lazy loading
     * @param {string|NodeList|HTMLElement} elements - Elements to observe
     */
    observe(elements) {
      if (!this.observer) {
        this.fallbackLoad(elements);
        return;
      }
      
      let elementList;
      
      if (typeof elements === 'string') {
        elementList = document.querySelectorAll(elements);
      } else if (elements instanceof NodeList || Array.isArray(elements)) {
        elementList = elements;
      } else if (elements instanceof HTMLElement) {
        elementList = [elements];
      } else {
        this.logger.error?.('Invalid elements provided to observe');
        return;
      }
      
      elementList.forEach(element => {
        this.observer.observe(element);
      });
      
      this.logger.debug?.(`Observing ${elementList.length} elements`);
    }
    
    /**
     * Fallback for browsers without IntersectionObserver support
     * @param {string|NodeList|HTMLElement} elements - Elements to load immediately
     */
    fallbackLoad(elements) {
      let elementList;
      
      if (!elements) {
        elementList = document.querySelectorAll('[data-src], [data-bg-src], .lazy-load');
      } else if (typeof elements === 'string') {
        elementList = document.querySelectorAll(elements);
      } else if (elements instanceof NodeList || Array.isArray(elements)) {
        elementList = elements;
      } else {
        elementList = [elements];
      }
      
      elementList.forEach(element => {
        this.loadElement(element);
      });
    }
    
    /**
     * Disconnect the observer
     */
    disconnect() {
      if (this.observer) {
        this.observer.disconnect();
        this.logger.debug?.('LazyLoader disconnected');
      }
    }
    
    /**
     * Re-observe all elements (useful after dynamic content loading)
     */
    refresh() {
      this.disconnect();
      this.init();
      this.observe('[data-src], [data-bg-src], .lazy-load');
    }
  }
  
  /**
   * Patch List Virtualization
   * Renders only visible patches for better performance on mobile
   */
  class VirtualPatchList {
    constructor(container, patches, options = {}) {
      this.logger = window.Logger ? new Logger('VirtualList') : console;
      this.container = container;
      this.patches = patches;
      this.options = {
        itemHeight: options.itemHeight || 100, // Approximate height of each patch item
        bufferSize: options.bufferSize || 5,   // Number of items to render outside viewport
        ...options
      };
      
      this.visibleStart = 0;
      this.visibleEnd = 0;
      this.scrollTimeout = null;
      
      this.init();
    }
    
    /**
     * Initialize virtual scrolling
     */
    init() {
      if (!this.container || this.patches.length < 20) {
        // Don't use virtualization for small lists
        return;
      }
      
      this.setupContainer();
      this.attachScrollListener();
      this.render();
      
      this.logger.debug?.('Virtual list initialized with', this.patches.length, 'items');
    }
    
    /**
     * Setup container for virtual scrolling
     */
    setupContainer() {
      const totalHeight = this.patches.length * this.options.itemHeight;
      this.container.style.position = 'relative';
      this.container.style.minHeight = `${totalHeight}px`;
    }
    
    /**
     * Attach scroll event listener
     */
    attachScrollListener() {
      window.addEventListener('scroll', () => {
        if (this.scrollTimeout) {
          clearTimeout(this.scrollTimeout);
        }
        
        this.scrollTimeout = setTimeout(() => {
          this.render();
        }, 50);
      }, { passive: true });
    }
    
    /**
     * Calculate visible range
     */
    calculateVisibleRange() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const viewportHeight = window.innerHeight;
      const containerTop = this.container.offsetTop;
      
      const start = Math.max(0, Math.floor((scrollTop - containerTop) / this.options.itemHeight) - this.options.bufferSize);
      const end = Math.min(this.patches.length, Math.ceil((scrollTop - containerTop + viewportHeight) / this.options.itemHeight) + this.options.bufferSize);
      
      return { start, end };
    }
    
    /**
     * Render visible items
     */
    render() {
      const { start, end } = this.calculateVisibleRange();
      
      // Only re-render if range changed significantly
      if (Math.abs(start - this.visibleStart) < 2 && Math.abs(end - this.visibleEnd) < 2) {
        return;
      }
      
      this.visibleStart = start;
      this.visibleEnd = end;
      
      this.logger.debug?.('Rendering items', start, 'to', end);
      
      // This would integrate with renderPatchList function
      // For now, it's a placeholder for future implementation
    }
  }
  
  // Export globally
  window.LazyLoader = LazyLoader;
  window.VirtualPatchList = VirtualPatchList;
  
  // Create default lazy loader instance
  document.addEventListener('DOMContentLoaded', () => {
    window.lazyLoader = new LazyLoader();
    
    // Observe all lazy-loadable elements
    window.lazyLoader.observe('[data-src], [data-bg-src], .lazy-load');
  });
  
})();
