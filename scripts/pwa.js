// PWA Installation and Management
class PWAManager {
  constructor() {
    this.deferredPrompt = null;
    this.isInstalled = false;
    this.init();
  }

  init() {
    // Check if already installed
    this.checkInstallStatus();
    
    // Register service worker
    this.registerServiceWorker();
    
    // Setup install prompt
    this.setupInstallPrompt();
    
    // Listen for app updates
    this.setupUpdateListener();
  }

  checkInstallStatus() {
    // Check if running as installed PWA
    this.isInstalled = window.matchMedia('(display-mode: standalone)').matches ||
                     window.navigator.standalone === true;
    
    if (this.isInstalled) {
      console.log('PWA: Running as installed app');
      this.hideInstallPrompt();
    }
  }

  async registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('PWA: Service Worker registered', registration);
        
        // Listen for updates
        registration.addEventListener('updatefound', () => {
          console.log('PWA: New version available');
          this.showUpdateAvailable();
        });
        
      } catch (error) {
        console.error('PWA: Service Worker registration failed', error);
      }
    }
  }

  setupInstallPrompt() {
    // Listen for install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      console.log('PWA: Install prompt available');
      e.preventDefault();
      this.deferredPrompt = e;
      this.showInstallPrompt();
    });

    // Listen for successful install
    window.addEventListener('appinstalled', () => {
      console.log('PWA: Successfully installed');
      this.isInstalled = true;
      this.hideInstallPrompt();
      this.showInstallSuccess();
    });
  }

  showInstallPrompt() {
    if (this.isInstalled) return;

    // Add body class to adjust layout
    document.body.classList.add('pwa-banner-active');

    // Create install banner
    const installBanner = document.createElement('div');
    installBanner.id = 'pwa-install-banner';
    installBanner.innerHTML = `
      <div class="pwa-banner-content">
        <div class="pwa-banner-text">
          <strong>Install FAForever Patchnotes</strong>
          <p>Get quick access and offline viewing</p>
        </div>
        <div class="pwa-banner-actions">
          <button id="pwa-install-btn" class="pwa-btn pwa-btn-primary">Install</button>
          <button id="pwa-dismiss-btn" class="pwa-btn pwa-btn-secondary">×</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(installBanner);
    
    // Add event listeners
    document.getElementById('pwa-install-btn').addEventListener('click', () => {
      this.triggerInstall();
    });
    
    document.getElementById('pwa-dismiss-btn').addEventListener('click', () => {
      this.hideInstallPrompt();
    });
  }

  async triggerInstall() {
    if (!this.deferredPrompt) return;

    try {
      const result = await this.deferredPrompt.prompt();
      console.log('PWA: Install prompt result', result);
      
      if (result.outcome === 'accepted') {
        console.log('PWA: User accepted install');
      }
      
      this.deferredPrompt = null;
      this.hideInstallPrompt();
      
    } catch (error) {
      console.error('PWA: Install failed', error);
    }
  }

  hideInstallPrompt() {
    const banner = document.getElementById('pwa-install-banner');
    if (banner) {
      // Add exit animation
      banner.classList.add('pwa-banner-exiting');
      
      // Remove banner and body class after animation
      setTimeout(() => {
        banner.remove();
        document.body.classList.remove('pwa-banner-active');
      }, 300);
    }
  }

  showInstallSuccess() {
    // Remove any existing banners first
    this.hideInstallPrompt();
    
    // Show temporary success message
    const successMsg = document.createElement('div');
    successMsg.id = 'pwa-success-banner';
    successMsg.innerHTML = `
      <div class="pwa-banner-content">
        <div class="pwa-banner-text">
          ✅ <strong>Successfully installed!</strong>
          <p>You can now access patchnotes offline</p>
        </div>
      </div>
    `;
    
    document.body.appendChild(successMsg);
    document.body.classList.add('pwa-banner-active');
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
      successMsg.classList.add('pwa-banner-exiting');
      setTimeout(() => {
        successMsg.remove();
        document.body.classList.remove('pwa-banner-active');
      }, 300);
    }, 3000);
  }

  setupUpdateListener() {
    // Listen for service worker updates
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('PWA: App updated');
        this.showUpdateComplete();
      });
    }
  }

  showUpdateAvailable() {
    // Add body class to adjust layout
    document.body.classList.add('pwa-banner-active');
    
    // Show update banner
    const updateBanner = document.createElement('div');
    updateBanner.id = 'pwa-update-banner';
    updateBanner.innerHTML = `
      <div class="pwa-banner-content">
        <div class="pwa-banner-text">
          <strong>Update Available</strong>
          <p>New patches and improvements ready</p>
        </div>
        <div class="pwa-banner-actions">
          <button id="pwa-update-btn" class="pwa-btn pwa-btn-primary">Update</button>
          <button id="pwa-update-dismiss-btn" class="pwa-btn pwa-btn-secondary">Later</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(updateBanner);
    
    // Add event listeners
    document.getElementById('pwa-update-btn').addEventListener('click', () => {
      this.hideUpdateBanner();
      window.location.reload();
    });
    
    document.getElementById('pwa-update-dismiss-btn').addEventListener('click', () => {
      this.hideUpdateBanner();
    });
  }

  hideUpdateBanner() {
    const banner = document.getElementById('pwa-update-banner');
    if (banner) {
      // Add exit animation
      banner.classList.add('pwa-banner-exiting');
      
      // Remove banner and body class after animation
      setTimeout(() => {
        banner.remove();
        document.body.classList.remove('pwa-banner-active');
      }, 300);
    }
  }

  showUpdateComplete() {
    // Show update complete message
    const completeMsg = document.createElement('div');
    completeMsg.id = 'pwa-complete-banner';
    completeMsg.innerHTML = `
      <div class="pwa-banner-content">
        <div class="pwa-banner-text">
          ✅ <strong>Updated!</strong>
          <p>You're now running the latest version</p>
        </div>
      </div>
    `;
    
    document.body.appendChild(completeMsg);
    document.body.classList.add('pwa-banner-active');
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
      completeMsg.classList.add('pwa-banner-exiting');
      setTimeout(() => {
        completeMsg.remove();
        document.body.classList.remove('pwa-banner-active');
      }, 300);
    }, 3000);
  }
}

// Initialize PWA when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new PWAManager();
});
