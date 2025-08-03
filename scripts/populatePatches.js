async function populate() {
  const requestURL = '../assets/data/patches.json';
  const container = document.querySelector('.BalanceJSONList');
  
  // Show loading state
  showLoadingState(container);

  try {
    const response = await fetch(requestURL, { cache: 'no-cache' });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const patches = await response.json();
    const { balance = [] } = patches; // Provide empty arrays as fallback

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
    console.error('There has been a problem with your fetch operation:', error);
    showErrorState(container, error.message);
  }
}

function showLoadingState(container) {
  if (!container) return;
  
  container.innerHTML = `
    <div class="loading-state">
      <div class="loading-spinner"></div>
      <p>Loading patches...</p>
    </div>
  `;
}

function showErrorState(container, message) {
  if (!container) return;
  
  container.innerHTML = `
    <div class="error-state">
      <p>❌ Failed to load patches</p>
      <p class="error-details">${message}</p>
      <button onclick="populate()" class="retry-btn">Try Again</button>
    </div>
  `;
}

function showEmptyState(container) {
  if (!container) return;
  
  container.innerHTML = `
    <div class="empty-state">
      <p>📝 No patches available</p>
      <p>Check back later for updates!</p>
    </div>
  `;
}

function renderPatchList(patchList, containerSelector) {
  const container = document.querySelector(containerSelector);

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
      linkElement.innerHTML = `
        <div class="patch-info">
          <div class="patch-header">
            <span class="patch-number">Patch ${patch}</span>
            ${index === 0 ? '<span class="latest-badge">Latest</span>' : ''}
          </div>
          <span class="patch-date">${date}</span>
        </div>
      `;

      listItem.appendChild(linkElement);
      fragment.appendChild(listItem);
    }
  );

  container.innerHTML = ''; // Clear any existing content
  container.appendChild(fragment); // Append all at once for better performance
}

document.addEventListener('DOMContentLoaded', populate);
