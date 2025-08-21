async function populate() {
  const requestURL = './assets/data/patches.json';
  const container = document.querySelector('.BalanceJSONList');
  
  // Mobile debugging
  console.log('Mobile Debug - Starting populate()');
  console.log('Mobile Debug - Container found:', !!container);
  console.log('Mobile Debug - Request URL:', requestURL);
  console.log('Mobile Debug - Current URL:', window.location.href);
  
  // Show loading state
  showLoadingState(container);

  try {
    const response = await fetch(requestURL, { cache: 'no-cache' });
    
    console.log('Mobile Debug - Response status:', response.status);
    console.log('Mobile Debug - Response ok:', response.ok);

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const patches = await response.json();
    console.log('Mobile Debug - Patches loaded:', patches);
    
    const { balance = [] } = patches; // Provide empty arrays as fallback
    console.log('Mobile Debug - Balance array length:', balance.length);

    if (balance.length === 0) {
      throw new Error('Invalid data format: Missing Balance data.');
    }

    // Render only if data exists
    if (balance.length > 0) {
      // Mobile optimization: limit to last 10 patches on mobile devices
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const patchesToRender = isMobile ? balance.slice(0, 10) : balance;
      
      console.log('Mobile Debug - Is mobile device:', isMobile);
      console.log('Mobile Debug - User agent:', navigator.userAgent);
      console.log('Mobile Debug - Total patches available:', balance.length);
      console.log('Mobile Debug - Patches to render:', patchesToRender.length);
      
      renderPatchList(patchesToRender, '.BalanceJSONList');
      
      // Update hero statistics
      updateHeroStats();
      
      // Initialize search with patch data
      if (window.patchSearch) {
        window.patchSearch.setPatches(patchesToRender);
      }
    } else {
      showEmptyState(container);
    }
  } catch (error) {
    console.error('Mobile Debug - Error occurred:', error);
    console.error('There has been a problem with your fetch operation:', error);
    showErrorState(container, error.message);
  }
}

function showLoadingState(container) {
  if (!container) {
    console.error('Mobile Debug - No container for loading state');
    return;
  }
  
  container.innerHTML = `
    <div class="LoadingState">
      <div class="LoadingSkeleton">
        <div class="SkeletonItem"></div>
        <div class="SkeletonItem"></div>
        <div class="SkeletonItem"></div>
        <div class="SkeletonItem"></div>
        <div class="SkeletonItem"></div>
      </div>
      <p>Loading patch archives...</p>
    </div>
  `;
  console.log('Mobile Debug - Loading state shown');
}

function showErrorState(container, message) {
  if (!container) {
    console.error('Mobile Debug - No container for error state');
    return;
  }
  
  // More detailed error for mobile debugging
  const userAgent = navigator.userAgent;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  
  console.log('Mobile Debug - Showing error state:', message);
  console.log('Mobile Debug - Is mobile device:', isMobile);
  
  container.innerHTML = `
    <div class="error-state">
      <p>⚠️ Failed to load patches</p>
      <div class="error-details">
        <p><strong>Error:</strong> ${message}</p>
        ${isMobile ? '<p><strong>Device:</strong> Mobile device detected</p>' : ''}
        <p><strong>URL:</strong> ${window.location.href}</p>
      </div>
      <button onclick="populate()" class="retry-btn">Try Again</button>
      <details style="margin-top: 16px; text-align: left;">
        <summary style="cursor: pointer; color: var(--Accent-Color);">Debug Info</summary>
        <pre style="font-size: 12px; margin-top: 8px; white-space: pre-wrap;">${userAgent}</pre>
      </details>
    </div>
  `;
}

function showEmptyState(container) {
  if (!container) {
    console.error('Mobile Debug - No container for empty state');
    return;
  }
  
  container.innerHTML = `
    <div class="NoResults">
      <div class="NoResultsIcon">📝</div>
      <h3>No patches found</h3>
      <p>Try adjusting your search or filter criteria.</p>
      <button onclick="clearAllFilters()" class="SecondaryButton">
        <span>↻</span>
        Clear All Filters
      </button>
    </div>
  `;
  console.log('Mobile Debug - Empty state shown');
}

function renderPatchList(patchList, containerSelector) {
  const container = document.querySelector(containerSelector);

  console.log('Mobile Debug - Rendering patch list');
  console.log('Mobile Debug - Patch list length:', patchList.length);

  if (!container) {
    console.error(`Container with selector "${containerSelector}" not found.`);
    return;
  }

  const fragment = document.createDocumentFragment(); // Use DocumentFragment for better performance

  patchList.forEach(
    ({ patch = 'Unknown Patch', link = '#', date = 'Unknown Date' }, index) => {
      const listItem = document.createElement('li');
      listItem.className = 'patch-item';
      
      // Add latest badge for first item
      if (index === 0) {
        listItem.classList.add('latest');
      }

      const linkElement = document.createElement('a');
      linkElement.className = 'patch-link';
      linkElement.href = link;
      linkElement.setAttribute('aria-label', `View patch ${patch} details`);
      
      // Create patch info structure
      const patchInfo = document.createElement('div');
      patchInfo.className = 'patch-info';
      
      const patchHeader = document.createElement('div');
      patchHeader.className = 'patch-header';
      
      const patchNumber = document.createElement('span');
      patchNumber.className = 'patch-number';
      patchNumber.textContent = patch;
      patchHeader.appendChild(patchNumber);
      
      // Add latest badge for first item
      if (index === 0) {
        const latestBadge = document.createElement('span');
        latestBadge.className = 'latest-badge';
        latestBadge.textContent = 'Latest';
        patchHeader.appendChild(latestBadge);
      }
      
      const patchDate = document.createElement('span');
      patchDate.className = 'patch-date';
      patchDate.textContent = date;
      
      patchInfo.appendChild(patchHeader);
      patchInfo.appendChild(patchDate);
      linkElement.appendChild(patchInfo);
      listItem.appendChild(linkElement);
      fragment.appendChild(listItem);
    }
  );

  container.innerHTML = ''; // Clear existing content
  container.appendChild(fragment);
  
  // Set default list view if not already set
  if (!container.classList.contains('list-view') && !container.classList.contains('grid-view')) {
    container.classList.add('list-view');
  }
  
  console.log('Mobile Debug - Patch list rendered successfully');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('Mobile Debug - DOM Content Loaded');
  initializeEnhancedUI();
  populate();
});

// Enhanced UI functionality
function initializeEnhancedUI() {
  // Initialize search functionality
  const searchInput = document.getElementById('patch-search');
  const clearButton = document.querySelector('.ClearButton');
  const searchStats = document.querySelector('.SearchStats');
  
  if (searchInput && clearButton) {
    // Show/hide clear button based on input
    searchInput.addEventListener('input', function() {
      if (this.value.length > 0) {
        clearButton.classList.add('visible');
      } else {
        clearButton.classList.remove('visible');
      }
      // Trigger filtering on search input
      filterPatches();
    });
    
    // Clear search
    clearButton.addEventListener('click', function() {
      searchInput.value = '';
      clearButton.classList.remove('visible');
      updateSearchStats();
      filterPatches();
    });
  }
  
  // Initialize filter functionality
  const yearFilter = document.getElementById('year-filter');
  const typeFilter = document.getElementById('type-filter');
  
  if (yearFilter) {
    yearFilter.addEventListener('change', filterPatches);
  }
  
  if (typeFilter) {
    typeFilter.addEventListener('change', filterPatches);
  }
  
  // Initialize quick filters
  const quickFilters = document.querySelectorAll('.QuickFilter');
  quickFilters.forEach(filter => {
    filter.addEventListener('click', function() {
      // Toggle active state
      quickFilters.forEach(f => f.classList.remove('active'));
      this.classList.add('active');
      
      // Apply filter based on data attributes
      const filterType = this.dataset.filter;
      applyQuickFilter(filterType);
    });
  });
  
  // Initialize view toggle buttons
  const viewToggleButtons = document.querySelectorAll('.ViewToggle');
  viewToggleButtons.forEach(button => {
    button.addEventListener('click', function() {
      const viewType = this.dataset.view;
      toggleView(viewType);
      
      // Update active state
      viewToggleButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
    });
  });
  
  // Initialize hero action buttons
  const latestPatchBtn = document.getElementById('latest-patch-btn');
  const randomPatchBtn = document.getElementById('random-patch-btn');
  
  if (latestPatchBtn) {
    latestPatchBtn.addEventListener('click', function(e) {
      e.preventDefault();
      goToLatestPatch();
    });
  }
  
  if (randomPatchBtn) {
    randomPatchBtn.addEventListener('click', function(e) {
      e.preventDefault();
      goToRandomPatch();
    });
  }
  
  // Update statistics
  updateHeroStats();
}

function updateSearchStats() {
  const searchStats = document.querySelector('.SearchStats');
  const searchTerm = document.getElementById('patch-search')?.value || '';
  const visiblePatches = document.querySelectorAll('.patch-item:not([style*="display: none"])').length;
  const totalPatches = document.querySelectorAll('.patch-item').length;
  
  if (searchStats) {
    if (searchTerm.length > 0) {
      searchStats.textContent = `${visiblePatches} of ${totalPatches} patches`;
    } else {
      searchStats.textContent = `${totalPatches} patches total`;
    }
  }
}

function filterPatches() {
  const searchTerm = document.getElementById('patch-search')?.value.toLowerCase() || '';
  const yearFilter = document.getElementById('year-filter')?.value || '';
  const typeFilter = document.getElementById('type-filter')?.value || '';
  
  const patches = document.querySelectorAll('.patch-item');
  let visibleCount = 0;
  
  patches.forEach(patch => {
    const patchText = patch.textContent.toLowerCase();
    const patchNumber = patch.querySelector('.patch-number')?.textContent || '';
    const patchDate = patch.querySelector('.patch-date')?.textContent || '';
    
    let show = true;
    
    // Apply search filter
    if (searchTerm && !patchText.includes(searchTerm)) {
      show = false;
    }
    
    // Apply year filter
    if (yearFilter && !patchDate.includes(yearFilter)) {
      show = false;
    }
    
    // Apply type filter (simplified - would need more data for full implementation)
    if (typeFilter && typeFilter !== 'all') {
      // This would need additional metadata in the JSON
      // For now, just show all patches
    }
    
    if (show) {
      patch.style.display = '';
      visibleCount++;
    } else {
      patch.style.display = 'none';
    }
  });
  
  updateSearchStats();
  
  // Show no results state if needed
  const container = document.querySelector('.BalanceJSONList');
  if (visibleCount === 0 && patches.length > 0) {
    if (!container.querySelector('.NoResults')) {
      showEmptyState(container);
    }
  } else if (container.querySelector('.NoResults')) {
    // Re-render if we have results again
    const allPatches = Array.from(patches).map(p => ({
      patch: p.querySelector('.patch-number')?.textContent || 'Unknown',
      link: p.querySelector('.patch-link')?.href || '#',
      date: p.querySelector('.patch-date')?.textContent || 'Unknown Date'
    }));
    renderPatchList(allPatches, '.BalanceJSONList');
  }
}

function applyQuickFilter(filterType) {
  const patches = document.querySelectorAll('.patch-item');
  
  switch (filterType) {
    case 'recent':
      // Show only last 10 patches
      patches.forEach((patch, index) => {
        patch.style.display = index < 10 ? '' : 'none';
      });
      break;
    case '2025':
      // Show only 2025 patches
      patches.forEach(patch => {
        const patchDate = patch.querySelector('.patch-date')?.textContent || '';
        const is2025 = patchDate.includes('2025');
        patch.style.display = is2025 ? '' : 'none';
      });
      break;
    case 'major':
      // Show only major patches (simplified logic)
      patches.forEach(patch => {
        const patchNumber = patch.querySelector('.patch-number')?.textContent || '';
        const isMajor = patchNumber.includes('.0') || patchNumber.includes('00');
        patch.style.display = isMajor ? '' : 'none';
      });
      break;
    case 'all':
    default:
      // Show all patches
      patches.forEach(patch => {
        patch.style.display = '';
      });
      break;
  }
  
  updateSearchStats();
}

function toggleView(viewType) {
  const container = document.querySelector('.BalanceJSONList');
  if (!container) return;
  
  // Remove existing view classes
  container.classList.remove('list-view', 'grid-view');
  
  // Add new view class
  if (viewType === 'grid') {
    container.classList.add('grid-view');
  } else {
    container.classList.add('list-view');
  }
  
  console.log('View toggled to:', viewType);
}

function goToLatestPatch() {
  const patches = document.querySelectorAll('.patch-item');
  if (patches.length > 0) {
    const latestPatch = patches[0]; // First patch should be latest
    const link = latestPatch.querySelector('.patch-link');
    if (link && link.href) {
      window.location.href = link.href;
    }
  } else {
    console.log('No patches available');
  }
}

function goToRandomPatch() {
  const patches = document.querySelectorAll('.patch-item:not([style*="display: none"])');
  if (patches.length > 0) {
    const randomIndex = Math.floor(Math.random() * patches.length);
    const randomPatch = patches[randomIndex];
    const link = randomPatch.querySelector('.patch-link');
    if (link && link.href) {
      window.location.href = link.href;
    }
  } else {
    console.log('No visible patches available');
  }
}

function clearAllFilters() {
  // Reset all filter controls
  const searchInput = document.getElementById('patch-search');
  const yearFilter = document.getElementById('year-filter');
  const typeFilter = document.getElementById('type-filter');
  const quickFilters = document.querySelectorAll('.QuickFilter');
  
  if (searchInput) searchInput.value = '';
  if (yearFilter) yearFilter.value = '';
  if (typeFilter) typeFilter.value = 'all';
  
  quickFilters.forEach(f => f.classList.remove('active'));
  document.querySelector('.QuickFilter[data-filter="all"]')?.classList.add('active');
  
  // Clear button visibility
  document.querySelector('.ClearButton')?.classList.remove('visible');
  
  // Show all patches
  filterPatches();
}

function updateHeroStats() {
  // This would be called after patches are loaded to update the statistics
  const totalPatches = document.querySelectorAll('.patch-item').length;
  const currentYear = new Date().getFullYear();
  const thisYearPatches = Array.from(document.querySelectorAll('.patch-date')).filter(
    date => date.textContent.includes(currentYear.toString())
  ).length;
  
  // Update stat numbers if elements exist
  const statNumbers = document.querySelectorAll('.StatNumber');
  if (statNumbers.length >= 2) {
    statNumbers[0].textContent = totalPatches;
    statNumbers[1].textContent = thisYearPatches;
  }
}
