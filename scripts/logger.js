/**
 * Centralized logging utility with environment-aware debug levels
 * @version 1.0.0
 */

(function() {
  'use strict';
  
  // Determine if we're in development mode
  const IS_DEV = window.location.hostname === 'localhost' || 
                 window.location.hostname === '127.0.0.1' ||
                 window.location.search.includes('debug=true');

  /**
   * Logger class for structured logging
   */
  class Logger {
    constructor(context = 'App') {
      this.context = context;
      this.enabled = IS_DEV;
    }

    /**
     * Debug level logging - only shown in development
     * @param {...any} args - Arguments to log
     */
    debug(...args) {
      if (this.enabled) {
        console.log(`[${this.context}]`, ...args);
      }
    }

    /**
     * Info level logging - shown in all environments
     * @param {...any} args - Arguments to log
     */
    info(...args) {
      console.info(`[${this.context}]`, ...args);
    }

    /**
     * Warning level logging - shown in all environments
     * @param {...any} args - Arguments to log
     */
    warn(...args) {
      console.warn(`[${this.context}]`, ...args);
    }

    /**
     * Error level logging - shown in all environments
     * @param {...any} args - Arguments to log
     */
    error(...args) {
      console.error(`[${this.context}]`, ...args);
    }

    /**
     * Log performance metrics
     * @param {string} label - Label for the metric
     * @param {number} duration - Duration in milliseconds
     */
    perf(label, duration) {
      if (this.enabled) {
        console.log(`[${this.context}] ⏱️ ${label}: ${duration.toFixed(2)}ms`);
      }
    }

    /**
     * Group related log messages
     * @param {string} title - Group title
     * @param {Function} fn - Function containing grouped logs
     */
    group(title, fn) {
      if (this.enabled) {
        console.group(`[${this.context}] ${title}`);
        fn();
        console.groupEnd();
      }
    }
  }

  // Export globally
  window.Logger = Logger;

  // Create default logger instance
  window.logger = new Logger('FAF Patchnotes');

})();
