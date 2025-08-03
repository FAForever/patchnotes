const THEME_KEY = 'theme';
const LIGHT_MODE_CLASS = 'light-mode';

function toggleTheme() {
  const htmlElement = document.documentElement;
  const themeToggleButton = document.querySelector('#themeToggleButton');
  const isLightMode = htmlElement.classList.toggle(LIGHT_MODE_CLASS);
  const newTheme = isLightMode ? 'light' : 'dark';

  // Update button text and aria-label for better accessibility
  if (themeToggleButton) {
    themeToggleButton.textContent = isLightMode ? 'Switch to Dark' : 'Switch to Light';
    themeToggleButton.setAttribute('aria-label', 
      isLightMode ? 'Switch to dark theme' : 'Switch to light theme'
    );
  }

  try {
    localStorage.setItem(THEME_KEY, newTheme);
  } catch (e) {
    console.warn('Unable to access localStorage. Theme will reset on reload.');
  }
}

function loadTheme() {
  const htmlElement = document.documentElement;
  const themeToggleButton = document.querySelector('#themeToggleButton');
  let savedTheme;

  try {
    savedTheme = localStorage.getItem(THEME_KEY);
  } catch (e) {
    console.warn('Unable to access localStorage. Using default theme.');
  }

  const isLightMode = savedTheme === 'light';
  
  if (isLightMode) {
    htmlElement.classList.add(LIGHT_MODE_CLASS);
  } else {
    htmlElement.classList.remove(LIGHT_MODE_CLASS);
  }

  // Update button text and aria-label on load
  if (themeToggleButton) {
    themeToggleButton.textContent = isLightMode ? 'Switch to Dark' : 'Switch to Light';
    themeToggleButton.setAttribute('aria-label', 
      isLightMode ? 'Switch to dark theme' : 'Switch to light theme'
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Load the saved theme on page load
  loadTheme();

  const themeToggleButton = document.querySelector('#themeToggleButton');
  if (themeToggleButton) {
    themeToggleButton.addEventListener('click', toggleTheme);
    
    // Add keyboard support for better accessibility
    themeToggleButton.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleTheme();
      }
    });
  }
});
