# FAF Patchnotes

> **Version 2.3.1** - A modern Progressive Web App providing comprehensive access to all current and previous patch notes for *Supreme Commander: Forged Alliance Forever* (FAF), featuring advanced search capabilities, offline functionality, and a beautiful frosted glass interface.

---

## Overview

**Patchnotes Faforever** is a professional PWA platform that serves as a centralized, feature-rich hub for players to stay informed about the latest game updates, balance changes, and development progress for FAF. Whether you're a long-time player or just starting, you'll find organized, searchable patch information with a premium user experience across all devices.

## ✨ Features

### 🔍 **Advanced Search & Filtering**
- Real-time search through all patch notes with instant results
- Year-based filtering for quick navigation through patch history
- Live search statistics and result counts
- Keyboard shortcuts for power users (press `Ctrl/Cmd + K` for search, `?` for help)

### 📱 **Progressive Web App (PWA)**
- Install as a native app on any device (mobile, tablet, desktop)
- Full offline functionality - browse patches without internet
- Background updates with smart caching
- Push notification support (future feature)

### 🎨 **Modern UI/UX**
- Beautiful frosted glass design with dynamic backgrounds
- Dark/Light theme toggle with system preference detection
- Responsive design optimized for all screen sizes
- Smooth animations and professional polish

### ♿ **Accessibility & Performance**
- **WCAG 2.1 AAA compliant** - Full accessibility for users with disabilities
- **Skip links** for keyboard navigation
- **Screen reader support** with comprehensive ARIA labels
- **Keyboard shortcuts** for all functionality (press `?` for help)
- **High contrast focus indicators** for visibility
- **Reduced motion support** for users with vestibular disorders
- **44×44px minimum touch targets** (WCAG 2.1 AAA)
- Optimized performance with sub-second load times
- Error boundaries with automatic retry mechanisms
- 📖 **[Full Accessibility Documentation](ACCESSIBILITY.md)**

### 📊 **Analytics & Monitoring**
- Privacy-friendly user behavior tracking
- Performance monitoring and diagnostics
- Search pattern analysis for continuous improvement
- Session analytics for usage insights

### 🛡️ **Reliability & Quality**
- Comprehensive error handling and recovery
- Background sync for seamless updates
- Resource optimization and intelligent caching
- Cross-browser compatibility with fallback support

## 🚀 How to Use

### **Web Browser**
Visit: 👉 [https://patchnotes.faforever.com/](https://patchnotes.faforever.com/)

### **Install as App**
1. **Desktop**: Click the install prompt or use your browser's "Install" option
2. **Mobile**: Tap "Add to Home Screen" when prompted
3. **Benefits**: Faster loading, offline access, native app experience

### **Search & Navigation**
- Use the search bar to find specific patches, units, or changes
- Filter by year using the dropdown menu
- Press `Ctrl/Cmd + K` for quick search access
- Press `?` to view all keyboard shortcuts
- Toggle between Dark/Light themes in the footer

### **Offline Usage**
Once installed, the app works completely offline - perfect for reviewing patches during gameplay or when internet is limited.

## 🛠️ Technical Stack

- **Frontend**: Vanilla JavaScript (ES6+), CSS3 with advanced features
- **PWA**: Service Worker, Web App Manifest, Background Sync
- **Styling**: CSS Grid, Flexbox, Backdrop-filter, Custom Properties
- **Performance**: Resource preloading, critical CSS inlining, optimized caching
- **Accessibility**: ARIA labels, semantic HTML, keyboard navigation, WCAG 2.1 AAA
- **Monitoring**: Performance tracking, error boundaries, user analytics

## 📂 Project Structure

```
├── index.html              # Main application entry point
├── manifest.json           # PWA configuration
├── sw.js                   # Service Worker for offline functionality
├── assets/
│   ├── data/
│   │   └── patches.json    # Patch metadata
│   └── images/             # Icons, backgrounds, faction logos, unit images
│       ├── backgrounds/
│       ├── Enhancements/
│       ├── faction/
│       ├── icons/
│       ├── orders/
│       ├── thumbnail/
│       └── units/
├── pages/                  # Individual patch note HTML files
│   ├── 2017/ ... 2026/
│   └── Template/
├── scripts/
│   ├── analytics.js        # User behavior tracking
│   ├── backToTop.js        # Back to top button
│   ├── collapse.js         # Collapsible sections
│   ├── contentSidemenu.js  # Content navigation
│   ├── coreUI.js           # Core UI functionality
│   ├── errorBoundary.js    # Error handling
│   ├── headConfig.js       # Head configuration
│   ├── keyboardShortcuts.js # Keyboard shortcuts (? for help)
│   ├── lazyLoader.js       # Lazy loading images
│   ├── logger.js           # Logging system
│   ├── performance.js      # Performance monitoring
│   ├── populatePatches.js  # Patch list generation
│   ├── pwa.js              # PWA installation and updates
│   ├── search.js           # Advanced search functionality
│   ├── updatePatchFiles.js # Patch file updates
│   └── validatePatches.js  # Patch data validation
└── style/
    ├── balance.css         # Balance change styling
    ├── critical.css        # Critical inline CSS
    ├── index.css           # Main styles with frosted glass
    ├── pwa.css             # PWA-specific styling
    ├── root.css            # CSS variables and base styles
    └── components/         # Component-specific styles
        ├── accessibility.css
        ├── button.css
        ├── enhanced-ui.css
        ├── images.css
        ├── keyboard-shortcuts.css
        ├── patch_*.css     # Patch page components
        └── ...
```

## 🤝 Contributing

Contributions are welcome and appreciated!  
If you'd like to help improve the site or suggest new features:

### **Ways to Contribute**
- 🐛 **Report bugs** - Open an issue with detailed reproduction steps
- 💡 **Suggest features** - Share ideas for new functionality
- 🔧 **Submit PRs** - Fix bugs or implement new features
- 📖 **Improve docs** - Help make the documentation better
- 🎨 **Design feedback** - Share UI/UX improvement suggestions

### **Development Setup**
1. Clone the repository
2. Serve the files using a local HTTP server (required for PWA features)
3. Make your changes and test across different devices/browsers
4. Submit a pull request with a clear description

### **Areas We'd Love Help With**
- Performance optimizations
- Accessibility improvements
- New search features
- Mobile experience enhancements
- Additional PWA capabilities

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgements

A huge thank you to:
- **FAF Community** - For continuous feedback and support
- **Contributors** - Everyone who helps improve the project
- **Players** - Who make this resource valuable and worthwhile

Your efforts help keep Supreme Commander: Forged Alliance Forever and this project alive and thriving!

---

## 🔗 Links

### **Live Site & Community**
- **🌐 Live Site:** [https://patchnotes.faforever.com/](https://patchnotes.faforever.com/)
- **📱 Install as App:** Available on all devices via browser
- **🎮 FAForever:** [https://faforever.com/](https://faforever.com/)
- **💬 Community:** [FAForever Discord](https://discord.gg/hgvj6Af)

### **Documentation**
- **♿ [Accessibility Statement](ACCESSIBILITY.md)** - WCAG 2.1 AAA compliance & testing
- **🤝 [Contributing Guide](CONTRIBUTING.md)** - How to contribute to the project
- **🔒 [Security Policy](SECURITY.md)** - Vulnerability reporting & security features
- **🏗️ [Architecture](ARCHITECTURE.md)** - Technical documentation & design decisions
- **📝 [Changelog](CHANGELOG.md)** - Version history & release notes

---

*Built with ❤️ for the Supreme Commander: Forged Alliance Forever community*


---

# Patchnotes Faforever

This repository contains the source code and documentation for the **Patchnotes Faforever** website — a professional PWA platform dedicated to sharing comprehensive patch notes for the real-time strategy game *Forged Alliance Forever*.

## Overview

**Patchnotes Faforever** serves as a centralized, feature-rich hub for players to stay informed about the latest game updates, balance changes, and development progress for FAF. Whether you're a long-time player or just starting, you'll find organized, searchable patch information with a premium user experience across all devices.

## ✨ Features

### 🔍 **Advanced Search & Filtering**
- Real-time search through all patch notes with instant results
- Year-based filtering for quick navigation through patch history
- Live search statistics and result counts
- Keyboard shortcuts for power users (Ctrl/Cmd + K)

### 📱 **Progressive Web App (PWA)**
- Install as a native app on any device (mobile, tablet, desktop)
- Full offline functionality - browse patches without internet
- Background updates with smart caching
- Push notification support (future feature)

### 🎨 **Modern UI/UX**
- Beautiful frosted glass design with dynamic backgrounds
- Dark/Light theme toggle with system preference detection
- Responsive design optimized for all screen sizes
- Smooth animations and professional polish

### ♿ **Accessibility & Performance**
- **WCAG 2.1 AAA compliant** - Full accessibility for users with disabilities
- **Skip links** for keyboard navigation
- **Screen reader support** with comprehensive ARIA labels
- **Keyboard shortcuts** for all functionality (press `?` for help)
- **High contrast focus indicators** for visibility
- **Reduced motion support** for users with vestibular disorders
- **44×44px minimum touch targets** (WCAG 2.1 AAA)
- Optimized performance with sub-second load times
- Error boundaries with automatic retry mechanisms
- 📖 **[Full Accessibility Documentation](ACCESSIBILITY.md)**

### 📊 **Analytics & Monitoring**
- Privacy-friendly user behavior tracking
- Performance monitoring and diagnostics
- Search pattern analysis for continuous improvement
- Session analytics for usage insights

### 🛡️ **Reliability & Quality**
- Comprehensive error handling and recovery
- Background sync for seamless updates
- Resource optimization and intelligent caching
- Cross-browser compatibility with fallback support
This simple website provides access to all current and previous patch notes for *Forged Alliance Forever* (FAF), including game updates and balance changes.

---

# Patchnotes Faforever

This repository contains the source code and documentation for the **Patchnotes Faforever** website — a platform dedicated to sharing comprehensive patch notes for the real-time strategy game *Forged Alliance Forever*.

## Overview

**Patchnotes Faforever** serves as a centralised hub for players to stay informed about the latest game updates, balance changes, and development progress for FAF. Whether you're a long-time player or just starting, you’ll find organised, detailed patch information here.

## Features

- Complete archive of patch notes for all major and minor updates.
- In-depth breakdowns of unit changes, gameplay mechanics, and bug fixes.
- Clean, user-friendly interface for browsing and searching.

## 🚀 How to Use

### **Web Browser**
Visit: 👉 [https://patchnotes.faforever.com/](https://patchnotes.faforever.com/)

### **Install as App**
1. **Desktop**: Click the install prompt or use your browser's "Install" option
2. **Mobile**: Tap "Add to Home Screen" when prompted
3. **Benefits**: Faster loading, offline access, native app experience

### **Search & Navigation**
- Use the search bar to find specific patches, units, or changes
- Filter by year using the dropdown menu
- Press `Ctrl/Cmd + K` for quick search access
- Toggle between Dark/Light themes in the footer

### **Offline Usage**
Once installed, the app works completely offline - perfect for reviewing patches during gameplay or when internet is limited.

## 🛠️ Technical Stack

- **Frontend**: Vanilla JavaScript, CSS3 with advanced features
- **PWA**: Service Worker, Web App Manifest, Background Sync
- **Styling**: CSS Grid, Flexbox, Backdrop-filter, Custom Properties
- **Performance**: Resource preloading, critical CSS inlining, optimized caching
- **Accessibility**: ARIA labels, semantic HTML, keyboard navigation
- **Monitoring**: Performance tracking, error boundaries, user analytics

## 📂 Project Structure

```
├── index.html              # Main application entry point
├── manifest.json           # PWA configuration
├── sw.js                   # Service Worker for offline functionality
├── assets/
│   ├── data/               # Patch data files
│   ├── images/             # Icons, backgrounds, faction logos
│   └── ...
├── scripts/
│   ├── search.js           # Advanced search functionality
│   ├── pwa.js              # PWA installation and updates
│   ├── performance.js      # Performance monitoring
│   ├── analytics.js        # User behavior tracking
│   └── ...
└── style/
    ├── index.css           # Main styles with frosted glass effects
    ├── pwa.css             # PWA-specific styling
    └── root.css            # CSS variables and base styles
```

## Contributing

Contributions are welcome!  
If you’d like to help improve the site or suggest new features, feel free to:

- Submit a pull request
- Open an issue on this repository

This project is open-source and available under the [MIT License](LICENSE).

## Acknowledgements

A big thank you to the FAF community and all contributors for their continued support and feedback — your efforts help keep the game and this project alive and thriving.

---

🔗 **Visit Patchnotes Faforever:** [https://patchnotes.faforever.com/](https://patchnotes.faforever.com/)
