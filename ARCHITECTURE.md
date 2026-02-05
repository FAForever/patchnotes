# Architecture Documentation

## Overview

The FAForever Patchnotes site is a **Progressive Web App (PWA)** built with vanilla JavaScript, CSS, and HTML. It follows a modular architecture with clean separation of concerns.

## Technology Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Custom properties (CSS variables), Grid, Flexbox
- **Vanilla JavaScript (ES6+)** - No frameworks, class-based modules

### External Dependencies
- **Font Awesome 6.4.0** - Icons (CDN with SRI)
- **Google Fonts** - Open Sans, Ubuntu (CDN)
- **Netlify Identity** - CMS authentication (optional)

### Progressive Web App
- **Service Worker** - Offline support, caching strategy
- **Web App Manifest** - Installability, app metadata
- **Cache API** - Resource caching, version management

## Project Structure

```
patchnotes/
├── index.html              # Main entry point
├── manifest.json           # PWA manifest
├── sw.js                   # Service worker
├── favicon.ico            # Site favicon
├── CNAME                  # Custom domain config
├── LICENSE               # GPL-3.0 License
├── README.md             # Project overview
├── CONTRIBUTING.md       # Contribution guidelines
├── SECURITY.md           # Security policy
├── .gitignore           # Git ignore rules
├── .editorconfig        # Editor configuration
│
├── assets/
│   ├── data/
│   │   └── patches.json           # Patch metadata (JSON)
│   └── images/
│       ├── backgrounds/           # Hero backgrounds
│       ├── Enhancements/         # Enhancement icons by faction
│       ├── faction/              # Faction logos
│       ├── icons/                # PWA icons
│       ├── orders/               # Order icons
│       ├── thumbnail/            # Social media thumbnails
│       └── units/                # Unit icons by faction/type
│
├── pages/
│   └── [year]/
│       └── [patch].html          # Individual patch pages
│
├── scripts/
│   ├── logger.js                 # Centralized logging utility
│   ├── populatePatches.js        # Main patch list rendering
│   ├── search.js                 # Search and filter logic
│   ├── coreUI.js                 # Theme, background management
│   ├── errorBoundary.js          # Error handling and recovery
│   ├── performance.js            # Performance monitoring
│   ├── analytics.js              # Privacy-friendly analytics
│   ├── lazyLoader.js             # Lazy loading and virtualization
│   ├── validatePatches.js        # Data validation utility
│   ├── backToTop.js              # Scroll-to-top functionality
│   └── pwa.js                    # PWA installation prompts
│
└── style/
    ├── root.css                  # CSS variables, base styles
    ├── index.css                 # Main stylesheet
    ├── critical.css              # Above-the-fold styles
    ├── balance.css               # Patch page styles
    ├── pwa.css                   # PWA-specific styles
    └── components/               # Component-specific styles
        ├── button.css
        ├── enhanced-ui.css
        ├── images.css
        ├── patch_card.css
        ├── patch_footer.css
        ├── patch_intro.css
        ├── patch_layout.css
        ├── patch_responsive.css
        ├── patch_sidebar.css
        ├── patch_sidemenu.css
        └── patch_typography.css
```

## Core Components

### 1. Logger System (`logger.js`)

**Purpose:** Centralized logging with environment awareness

**Features:**
- Development vs production modes
- Log levels (debug, info, warn, error)
- Performance metrics
- Grouped logging

**Usage:**
```javascript
const logger = new Logger('ComponentName');
logger.debug('Debug message', { data });
logger.info('Info message');
logger.error('Error message', error);
```

### 2. Patch Population (`populatePatches.js`)

**Purpose:** Fetch and render patch list from JSON data

**Responsibilities:**
- Fetch patches.json
- Render patch cards
- Handle loading/error states
- Initialize search functionality

**Key Functions:**
- `populate()` - Main entry point
- `renderPatchList()` - Render patches to DOM
- `showLoadingState()` - Display loading skeleton
- `showErrorState()` - Display error with retry

### 3. Search & Filter (`search.js`)

**Purpose:** Real-time search and filtering of patches

**Features:**
- Debounced search (300ms)
- Year-based filtering
- Keyboard shortcuts (Ctrl+K, Escape)
- Search statistics

**Key Methods:**
- `performSearch(query)` - Execute search
- `filterByYear(year)` - Filter by year
- `clearSearch()` - Reset all filters

### 4. UI Management (`coreUI.js`)

**Purpose:** Theme switching and background management

**Features:**
- Light/dark theme toggle
- System preference detection
- LocalStorage persistence
- Dynamic backgrounds

**Components:**
- Theme manager
- Background rotation
- Faction icon display

### 5. Error Boundary (`errorBoundary.js`)

**Purpose:** Global error handling and recovery

**Features:**
- Catch unhandled errors
- Retry failed resources
- User-friendly error messages
- Error reporting

**Capabilities:**
- Automatic retry for critical resources
- Error logging for debugging
- Graceful degradation

### 6. Performance Monitor (`performance.js`)

**Purpose:** Track and report performance metrics

**Metrics:**
- Page load time
- Search performance
- Network timing
- Render performance

**Usage:**
```javascript
const monitor = new PerformanceMonitor();
const metrics = monitor.getMetrics();
```

### 7. Analytics (`analytics.js`)

**Purpose:** Privacy-friendly user behavior tracking

**Tracked Events:**
- Page views
- Search queries
- Patch interactions
- Theme changes
- Errors

**Privacy:**
- No third-party services
- Local data only
- No PII collection

### 8. Lazy Loader (`lazyLoader.js`)

**Purpose:** Optimize loading with intersection observer

**Features:**
- Image lazy loading
- Virtual scrolling (for large lists)
- Background image loading
- Fallback for older browsers

**Usage:**
```javascript
window.lazyLoader.observe('[data-src]');
```

### 9. Data Validator (`validatePatches.js`)

**Purpose:** Validate patches.json structure

**Validates:**
- Required fields (patch, link, date)
- Date format (Month DD, YYYY)
- Duplicate detection
- Sorting order

**Usage:**
```javascript
const result = await PatchValidator.validateFromFile();
console.log(PatchValidator.generateReport(result));
```

## Data Flow

### Initial Page Load

```
1. index.html loads
   ↓
2. Critical CSS applied
   ↓
3. Logger initialized
   ↓
4. Service Worker registered
   ↓
5. DOM Content Loaded
   ↓
6. populatePatches.js fetches patches.json
   ↓
7. Patches rendered to DOM
   ↓
8. Search initialized with patch data
   ↓
9. Lazy loader observes images
```

### Search Flow

```
User types in search
   ↓
300ms debounce
   ↓
PatchSearch.performSearch()
   ↓
Filter patches array
   ↓
Apply additional filters (year)
   ↓
renderPatchList()
   ↓
Update search statistics
```

### Theme Toggle Flow

```
User clicks theme button
   ↓
Toggle light-mode class on <html>
   ↓
Save to localStorage
   ↓
Update background
   ↓
Update button text/aria-label
```

## Caching Strategy

### Service Worker Cache Layers

1. **Static Cache (STATIC_CACHE)**
   - Core HTML, JS, CSS files
   - Faction images
   - patches.json
   - Never expires (version-based)

2. **Dynamic Cache (DYNAMIC_CACHE)**
   - Individual patch pages
   - User-requested resources
   - LRU eviction

3. **CSS Cache (CSS_CACHE)**
   - Stylesheet files
   - Cache-busted with version query params
   - Force refresh on deploy

### Cache Update Strategy

```javascript
// sw.js
const CACHE_VERSION = '2.2.0';
const STATIC_CACHE = `static-v${CACHE_VERSION}`;

// On activate, delete old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => 
      Promise.all(
        keys.filter(key => key !== STATIC_CACHE)
            .map(key => caches.delete(key))
      )
    )
  );
});
```

## State Management

### Client-Side State

- **Search State:** Managed by `PatchSearch` class
- **Theme State:** Stored in `localStorage`, class on `<html>`
- **Patch Data:** Fetched once, stored in memory
- **Filter State:** Maintained in `PatchSearch` instance

### No Global State Management

We use modular classes instead of global state:
```javascript
// Each module manages its own state
const patchSearch = new PatchSearch();
const logger = new Logger('App');
```

## Event System

### Custom Events (Future Enhancement)

Currently using standard DOM events. Could enhance with custom events:

```javascript
// Example for future implementation
document.dispatchEvent(new CustomEvent('patchesLoaded', {
  detail: { patches, count }
}));
```

## Performance Optimizations

### 1. Critical CSS Inline
- Above-the-fold styles in `<head>`
- Non-critical CSS deferred

### 2. Resource Preloading
```html
<link rel="preload" href="./style/index.css" as="style">
<link rel="preload" href="./assets/images/faction/UEF.svg" as="image">
```

### 3. Debounced Search
- 300ms delay prevents excessive filtering

### 4. Document Fragment
```javascript
const fragment = document.createDocumentFragment();
// Batch DOM operations
container.appendChild(fragment);
```

### 5. Lazy Loading
- Images loaded on viewport intersection
- Reduces initial payload

### 6. Service Worker Caching
- Offline-first architecture
- Instant repeat visits

## Security Architecture

### Input Sanitization
- Search queries are escaped
- No `innerHTML` with user content
- No `eval()` or `Function()` constructor

### External Resources
- HTTPS only
- SRI hashes for CDN resources
- Trusted sources only

### Content Security (Future)
```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' https://identity.netlify.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  img-src 'self' https://raw.githubusercontent.com;
  font-src 'self' https://fonts.gstatic.com;
```

## Accessibility Features

- Semantic HTML5 elements
- ARIA labels and roles
- Keyboard navigation
- Focus management
- Screen reader support
- Color contrast compliance (WCAG AA)

## Browser Support

### Minimum Requirements
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- iOS Safari 14+
- Chrome Android 90+

### Progressive Enhancement
- Works without JavaScript (basic HTML)
- Works without Service Worker (no offline mode)
- Works without CSS Grid (fallback to flexbox)

## Deployment

### Build Process
Currently no build step (vanilla JS/CSS/HTML).

### Future Build Pipeline
```bash
# Proposed for future
npm run build
  ├── Minify JS
  ├── Minify CSS
  ├── Optimize images
  ├── Generate SRI hashes
  └── Update service worker version
```

### Hosting
- Static site hosting (GitHub Pages, Netlify, etc.)
- HTTPS required for PWA features
- CDN recommended for global performance

## Monitoring & Analytics

### Client-Side Metrics
- Page load performance
- Search performance
- Error rates
- User interactions

### Server-Side (Future)
- Could add server-side analytics
- Error reporting service
- Performance monitoring

## Future Architecture Plans

### Potential Enhancements
1. **TypeScript migration** - Type safety
2. **Build pipeline** - Optimization
3. **Testing framework** - Jest, Cypress
4. **Component library** - Reusable UI components
5. **API endpoints** - Dynamic patch loading
6. **GraphQL** - Flexible data queries
7. **State management** - If complexity grows

## Contributing to Architecture

When adding new features:
1. Follow modular class-based approach
2. Use Logger for debug output
3. Add JSDoc comments
4. Update this documentation
5. Maintain backward compatibility
6. Test across browsers
7. Consider mobile performance

---

**For questions about architecture decisions, open a GitHub issue or ask in Discord.**

*Last Updated: February 5, 2026*
