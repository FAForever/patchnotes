// Performance monitoring and analytics
class PerformanceMonitor {
  constructor() {
    this.metrics = {
      pageLoad: 0,
      searchTime: 0,
      patchLoadTime: 0
    };
    this.init();
  }

  init() {
    // Monitor page load performance
    window.addEventListener('load', () => {
      this.measurePageLoad();
    });

    // Monitor search performance
    document.addEventListener('DOMContentLoaded', () => {
      this.setupSearchMonitoring();
    });
  }

  measurePageLoad() {
    if ('performance' in window) {
      const perfData = performance.getEntriesByType('navigation')[0];
      this.metrics.pageLoad = perfData.loadEventEnd - perfData.loadEventStart;
      
      console.log(`📊 Page Performance:
        🚀 Load Time: ${this.metrics.pageLoad.toFixed(2)}ms
        📡 Network: ${(perfData.responseEnd - perfData.requestStart).toFixed(2)}ms
        🎨 Rendering: ${(perfData.loadEventEnd - perfData.responseEnd).toFixed(2)}ms
      `);
      
      // Log slow page loads
      if (this.metrics.pageLoad > 3000) {
        console.warn('⚠️ Slow page load detected:', this.metrics.pageLoad + 'ms');
      }
    }
  }

  setupSearchMonitoring() {
    const searchInput = document.getElementById('patch-search');
    if (!searchInput) return;

    let searchStartTime;
    
    searchInput.addEventListener('input', () => {
      searchStartTime = performance.now();
    });

    // Monitor when search results are rendered
    const observer = new MutationObserver(() => {
      if (searchStartTime) {
        this.metrics.searchTime = performance.now() - searchStartTime;
        
        if (this.metrics.searchTime > 100) {
          console.log(`🔍 Search took: ${this.metrics.searchTime.toFixed(2)}ms`);
        }
        
        searchStartTime = null;
      }
    });

    const patchList = document.querySelector('.BalanceJSONList');
    if (patchList) {
      observer.observe(patchList, { childList: true, subtree: true });
    }
  }

  // Report performance metrics (useful for analytics)
  getMetrics() {
    return {
      ...this.metrics,
      userAgent: navigator.userAgent,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      connection: navigator.connection ? navigator.connection.effectiveType : 'unknown',
      timestamp: new Date().toISOString()
    };
  }

  // Check for potential issues
  runDiagnostics() {
    const issues = [];
    
    // Check for missing critical elements
    const criticalElements = ['#patch-search', '.BalanceJSONList', '#themeToggleButton'];
    criticalElements.forEach(selector => {
      if (!document.querySelector(selector)) {
        issues.push(`Missing element: ${selector}`);
      }
    });

    // Check for slow elements
    if (this.metrics.pageLoad > 2000) {
      issues.push('Slow page load detected');
    }

    // Check for JavaScript errors
    window.addEventListener('error', (e) => {
      issues.push(`JavaScript error: ${e.message}`);
    });

    return issues;
  }
}

// Initialize performance monitoring
const perfMonitor = new PerformanceMonitor();

// Make available globally for debugging
window.perfMonitor = perfMonitor;
