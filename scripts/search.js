// Search and Filter Functionality for Patches
class PatchSearch {
  constructor() {
    this.allPatches = [];
    this.filteredPatches = [];
    this.searchInput = null;
    this.yearFilter = null;
    this.clearButton = null;
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', () => {
      this.setupElements();
      this.setupEventListeners();
    });
  }

  setupElements() {
    this.searchInput = document.getElementById('patch-search');
    this.yearFilter = document.getElementById('year-filter');
    this.clearButton = document.getElementById('clear-search');
  }

  setupEventListeners() {
    if (!this.searchInput || !this.yearFilter || !this.clearButton) {
      console.warn('Search elements not found');
      return;
    }

    // Search input with debouncing
    let searchTimeout;
    this.searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        this.performSearch(e.target.value);
      }, 300);
    });

    // Year filter
    this.yearFilter.addEventListener('change', (e) => {
      this.filterByYear(e.target.value);
    });

    // Clear search
    this.clearButton.addEventListener('click', () => {
      this.clearSearch();
    });

    // Show/hide clear button based on input
    this.searchInput.addEventListener('input', (e) => {
      this.clearButton.style.display = e.target.value ? 'block' : 'none';
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      // Ctrl/Cmd + K to focus search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        this.searchInput.focus();
      }
      
      // Escape to clear search
      if (e.key === 'Escape' && document.activeElement === this.searchInput) {
        this.clearSearch();
      }
    });
  }

  setPatches(patches) {
    this.allPatches = patches;
    this.filteredPatches = [...patches];
    this.populateYearFilter();
  }

  populateYearFilter() {
    if (!this.yearFilter) return;

    const years = [...new Set(this.allPatches.map(patch => {
      const yearMatch = patch.date.match(/\d{4}/);
      return yearMatch ? yearMatch[0] : null;
    }))].filter(Boolean).sort((a, b) => b - a);

    // Clear existing options except "All years"
    this.yearFilter.innerHTML = '<option value="">All years</option>';
    
    years.forEach(year => {
      const option = document.createElement('option');
      option.value = year;
      option.textContent = year;
      this.yearFilter.appendChild(option);
    });
  }

  performSearch(query) {
    const searchTerm = query.toLowerCase().trim();
    
    if (!searchTerm) {
      this.filteredPatches = [...this.allPatches];
    } else {
      this.filteredPatches = this.allPatches.filter(patch => {
        const patchNumber = patch.patch.toLowerCase();
        const patchDate = patch.date.toLowerCase();
        
        return patchNumber.includes(searchTerm) || 
               patchDate.includes(searchTerm) ||
               searchTerm === patchNumber;
      });
    }

    this.applyCurrentFilters();
    this.renderResults();
    this.updateSearchStats(query);
  }

  filterByYear(year) {
    if (!year) {
      this.applySearch();
      return;
    }

    const currentSearch = this.searchInput.value.toLowerCase().trim();
    let patches = currentSearch ? this.performSearchOnPatches(this.allPatches, currentSearch) : [...this.allPatches];
    
    this.filteredPatches = patches.filter(patch => patch.date.includes(year));
    this.renderResults();
    this.updateSearchStats();
  }

  performSearchOnPatches(patches, searchTerm) {
    return patches.filter(patch => {
      const patchNumber = patch.patch.toLowerCase();
      const patchDate = patch.date.toLowerCase();
      
      return patchNumber.includes(searchTerm) || 
             patchDate.includes(searchTerm) ||
             searchTerm === patchNumber;
    });
  }

  applyCurrentFilters() {
    const yearValue = this.yearFilter.value;
    if (yearValue) {
      this.filteredPatches = this.filteredPatches.filter(patch => 
        patch.date.includes(yearValue)
      );
    }
  }

  applySearch() {
    const searchTerm = this.searchInput.value;
    this.performSearch(searchTerm);
  }

  clearSearch() {
    this.searchInput.value = '';
    this.yearFilter.value = '';
    this.filteredPatches = [...this.allPatches];
    this.clearButton.style.display = 'none';
    this.renderResults();
    this.updateSearchStats();
    this.searchInput.focus();
  }

  renderResults() {
    // Use the existing renderPatchList function
    if (typeof renderPatchList === 'function') {
      renderPatchList(this.filteredPatches, '.BalanceJSONList');
    }
  }

  updateSearchStats(query = '') {
    const totalPatches = this.allPatches.length;
    const filteredCount = this.filteredPatches.length;
    const container = document.querySelector('.BalanceJSONList');
    
    // Remove existing stats
    const existingStats = document.querySelector('.search-stats');
    if (existingStats) {
      existingStats.remove();
    }

    // Add stats if filtering is active
    if (query || this.yearFilter.value || filteredCount !== totalPatches) {
      const stats = document.createElement('div');
      stats.className = 'search-stats';
      stats.innerHTML = `
        <p>Showing ${filteredCount} of ${totalPatches} patches</p>
        ${filteredCount === 0 ? '<p>Try adjusting your search or filter criteria</p>' : ''}
      `;
      
      container.parentNode.insertBefore(stats, container);
    }
  }
}

// Initialize search functionality
const patchSearch = new PatchSearch();

// Export for use in other scripts
window.patchSearch = patchSearch;
