// Error handling and resilience system
class ErrorBoundary {
  constructor() {
    this.errors = [];
    this.retryAttempts = new Map();
    this.maxRetries = 3;
    this.init();
  }

  init() {
    // Global error handling
    window.addEventListener('error', (e) => {
      this.handleError('JavaScript Error', e.error, e.filename, e.lineno);
    });

    // Promise rejection handling
    window.addEventListener('unhandledrejection', (e) => {
      this.handleError('Unhandled Promise Rejection', e.reason);
    });

    // Resource loading errors
    document.addEventListener('error', (e) => {
      if (e.target !== window) {
        this.handleResourceError(e.target);
      }
    }, true);

    // Check for critical functionality
    this.checkCriticalFunctions();
  }

  handleError(type, error, filename = '', lineno = 0) {
    const errorInfo = {
      type,
      message: error?.message || error,
      filename,
      lineno,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    this.errors.push(errorInfo);
    
    console.error(`🚨 ${type}:`, errorInfo);

    // Try to recover from common errors
    this.attemptRecovery(type, error);

    // Show user-friendly error if critical
    if (this.isCriticalError(error)) {
      this.showUserError();
    }
  }

  handleResourceError(element) {
    const resource = element.src || element.href;
    console.warn('📦 Resource failed to load:', resource);

    // Attempt to reload critical resources
    if (this.isCriticalResource(element)) {
      this.retryResource(element);
    }
  }

  isCriticalResource(element) {
    const criticalPatterns = [
      '/style/index.css',
      '/scripts/populatePatches.js',
      '/assets/data/patches.json'
    ];

    const resourcePath = element.src || element.href;
    return criticalPatterns.some(pattern => resourcePath.includes(pattern));
  }

  retryResource(element) {
    const resourcePath = element.src || element.href;
    const attempts = this.retryAttempts.get(resourcePath) || 0;

    if (attempts < this.maxRetries) {
      this.retryAttempts.set(resourcePath, attempts + 1);
      
      setTimeout(() => {
        console.log(`🔄 Retrying resource (attempt ${attempts + 1}):`, resourcePath);
        
        if (element.tagName === 'SCRIPT') {
          const newScript = document.createElement('script');
          newScript.src = element.src + '?retry=' + (attempts + 1);
          newScript.defer = element.defer;
          document.head.appendChild(newScript);
        } else if (element.tagName === 'LINK') {
          element.href = resourcePath + '?retry=' + (attempts + 1);
        }
      }, 1000 * (attempts + 1));
    }
  }

  isCriticalError(error) {
    const criticalPatterns = [
      'patches.json',
      'populatePatches',
      'Cannot read property',
      'fetch'
    ];

    const errorMessage = error?.message || error;
    return criticalPatterns.some(pattern => 
      errorMessage.toLowerCase().includes(pattern.toLowerCase())
    );
  }

  attemptRecovery(type, error) {
    // Recovery strategies for common issues
    if (error?.message?.includes('fetch')) {
      console.log('🔧 Attempting to recover from fetch error...');
      // Retry critical data loading after a delay
      setTimeout(() => {
        if (typeof populate === 'function') {
          populate();
        }
      }, 2000);
    }

    if (error?.message?.includes('undefined')) {
      console.log('🔧 Checking for missing dependencies...');
      this.checkCriticalFunctions();
    }
  }

  checkCriticalFunctions() {
    const criticalFunctions = [
      'populate',
      'renderPatchList',
      'window.patchSearch'
    ];

    criticalFunctions.forEach(funcName => {
      const func = funcName.includes('.') ? 
        funcName.split('.').reduce((obj, prop) => obj?.[prop], window) :
        window[funcName];
        
      if (typeof func !== 'function' && typeof func !== 'object') {
        console.warn(`⚠️ Critical function missing: ${funcName}`);
      }
    });
  }

  showUserError() {
    // Only show if no error message is already visible
    if (document.querySelector('.global-error')) return;

    const errorDiv = document.createElement('div');
    errorDiv.className = 'global-error';
    errorDiv.innerHTML = `
      <div class="error-content">
        <h3>⚠️ Something went wrong</h3>
        <p>We're having trouble loading the patch data. Please try refreshing the page.</p>
        <button onclick="window.location.reload()" class="retry-btn">Refresh Page</button>
        <button onclick="this.parentElement.parentElement.remove()" class="dismiss-btn">Dismiss</button>
      </div>
    `;
    
    // Add styles
    errorDiv.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: #ff4444;
      color: white;
      z-index: 9999;
      padding: 16px;
      text-align: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    `;

    document.body.appendChild(errorDiv);

    // Auto-remove after 10 seconds
    setTimeout(() => {
      if (errorDiv.parentElement) {
        errorDiv.remove();
      }
    }, 10000);
  }

  // Get error report for debugging
  getErrorReport() {
    return {
      errors: this.errors,
      retryAttempts: Object.fromEntries(this.retryAttempts),
      timestamp: new Date().toISOString(),
      performance: window.perfMonitor?.getMetrics?.() || 'Not available'
    };
  }

  // Clear errors (useful for testing)
  clearErrors() {
    this.errors = [];
    this.retryAttempts.clear();
  }
}

// Initialize error boundary
const errorBoundary = new ErrorBoundary();

// Make available globally for debugging
window.errorBoundary = errorBoundary;
