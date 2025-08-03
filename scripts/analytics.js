// User analytics and behavior tracking (privacy-friendly)
class UserAnalytics {
  constructor() {
    this.sessionData = {
      startTime: Date.now(),
      pageViews: 0,
      searchQueries: [],
      patchesViewed: [],
      themeChanges: 0,
      errors: 0
    };
    this.init();
  }

  init() {
    // Track page view
    this.trackPageView();
    
    // Track user interactions
    this.trackSearchBehavior();
    this.trackPatchInteractions();
    this.trackThemeUsage();
    this.trackErrorsAndIssues();
    
    // Track session end
    this.trackSessionEnd();
  }

  trackPageView() {
    this.sessionData.pageViews++;
    console.log('📈 Analytics: Page view tracked');
  }

  trackSearchBehavior() {
    const searchInput = document.getElementById('patch-search');
    const yearFilter = document.getElementById('year-filter');
    
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        if (query.length > 2) {
          this.sessionData.searchQueries.push({
            query: query,
            timestamp: Date.now(),
            resultsCount: document.querySelectorAll('.patch-item').length
          });
        }
      });
    }

    if (yearFilter) {
      yearFilter.addEventListener('change', (e) => {
        this.sessionData.searchQueries.push({
          query: `year:${e.target.value}`,
          timestamp: Date.now(),
          type: 'filter'
        });
      });
    }
  }

  trackPatchInteractions() {
    // Track which patches users click on
    document.addEventListener('click', (e) => {
      const patchLink = e.target.closest('.patch-link');
      if (patchLink) {
        const patchNumber = patchLink.href.match(/(\d+)\.html/)?.[1];
        if (patchNumber) {
          this.sessionData.patchesViewed.push({
            patch: patchNumber,
            timestamp: Date.now(),
            fromSearch: !!document.getElementById('patch-search')?.value
          });
        }
      }
    });
  }

  trackThemeUsage() {
    const themeButton = document.getElementById('themeToggleButton');
    if (themeButton) {
      themeButton.addEventListener('click', () => {
        this.sessionData.themeChanges++;
      });
    }
  }

  trackErrorsAndIssues() {
    // Track errors that users encounter
    window.addEventListener('error', () => {
      this.sessionData.errors++;
    });

    // Track if users hit the retry button
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('retry-btn')) {
        this.trackEvent('error_retry', { context: 'user_initiated' });
      }
    });
  }

  trackSessionEnd() {
    // Track when user leaves
    window.addEventListener('beforeunload', () => {
      this.generateSessionSummary();
    });

    // Track visibility changes (tab switching)
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.trackEvent('tab_hidden');
      } else {
        this.trackEvent('tab_visible');
      }
    });
  }

  trackEvent(eventName, data = {}) {
    console.log(`📊 Event: ${eventName}`, data);
  }

  generateSessionSummary() {
    const sessionDuration = Date.now() - this.sessionData.startTime;
    const summary = {
      ...this.sessionData,
      sessionDuration,
      averageSearchLength: this.getAverageSearchLength(),
      mostSearchedTerms: this.getMostSearchedTerms(),
      userType: this.classifyUser()
    };

    console.log('📋 Session Summary:', summary);
    
    // You could send this to analytics service here
    // this.sendToAnalytics(summary);
    
    return summary;
  }

  getAverageSearchLength() {
    const searches = this.sessionData.searchQueries.filter(q => q.type !== 'filter');
    if (searches.length === 0) return 0;
    
    const totalLength = searches.reduce((sum, search) => sum + search.query.length, 0);
    return Math.round(totalLength / searches.length);
  }

  getMostSearchedTerms() {
    const termCounts = {};
    this.sessionData.searchQueries.forEach(search => {
      if (search.type !== 'filter') {
        const terms = search.query.toLowerCase().split(/\s+/);
        terms.forEach(term => {
          if (term.length > 2) {
            termCounts[term] = (termCounts[term] || 0) + 1;
          }
        });
      }
    });

    return Object.entries(termCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([term, count]) => ({ term, count }));
  }

  classifyUser() {
    const searches = this.sessionData.searchQueries.length;
    const patches = this.sessionData.patchesViewed.length;
    const duration = Date.now() - this.sessionData.startTime;

    if (duration < 30000) return 'quick_visitor';
    if (searches > 5) return 'active_searcher';
    if (patches > 3) return 'patch_reader';
    if (this.sessionData.themeChanges > 0) return 'customizer';
    return 'casual_browser';
  }

  // Privacy-friendly analytics (no personal data)
  getAnonymousMetrics() {
    return {
      totalSearches: this.sessionData.searchQueries.length,
      uniquePatchesViewed: new Set(this.sessionData.patchesViewed.map(p => p.patch)).size,
      sessionDuration: Math.round((Date.now() - this.sessionData.startTime) / 1000),
      userType: this.classifyUser(),
      hasErrors: this.sessionData.errors > 0,
      usesThemes: this.sessionData.themeChanges > 0,
      timestamp: new Date().toISOString()
    };
  }
}

// Initialize analytics
const userAnalytics = new UserAnalytics();

// Make available globally for debugging
window.userAnalytics = userAnalytics;
