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
      renderPatchList(balance, '.BalanceJSONList');
      
      // Initialize search with patch data
      if (window.patchSearch) {
        window.patchSearch.setPatches(balance);
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
    <div class="loading-state">
      <div class="loading-spinner"></div>
      <p>Loading patches...</p>
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
    <div class="empty-state">
      <p>📝 No patches available</p>
      <p>Check back later for updates!</p>
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
  
  console.log('Mobile Debug - Patch list rendered successfully');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('Mobile Debug - DOM Content Loaded');
  populate();
});
