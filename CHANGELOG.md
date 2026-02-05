# Changelog

All notable changes to the FAForever Patchnotes project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.3.1] - 2025-02-05

### Added

#### Accessibility Features - WCAG 2.1 AAA Compliance

- **Skip Links**: "Skip to main content" link for keyboard navigation
  - Appears on first Tab key press
  - High contrast focus indicator
  - Direct navigation to main content area

- **Comprehensive Focus Indicators** (`style/components/accessibility.css`):
  - 3px solid outline with 3:1 contrast ratio (WCAG 2.1 AAA)
  - Enhanced shadow effects for visibility
  - `:focus-visible` support for keyboard-only indicators
  - High contrast mode support
  - Touch target minimum sizes (44×44px desktop, 48×48px mobile)

- **Enhanced ARIA Labels**:
  - Descriptive labels on all interactive elements
  - Live regions for dynamic content (`aria-live="polite"`)
  - Status updates announced to screen readers
  - Proper landmark roles (`banner`, `contentinfo`, `main`)
  - Toggle button states with `aria-pressed`

- **Screen Reader Optimization**:
  - `.sr-only` utility class for screen-reader-only content
  - Decorative icons hidden with `aria-hidden="true"`
  - Semantic HTML with proper heading hierarchy
  - Form inputs with associated labels
  - Navigation landmarks properly labeled

- **Reduced Motion Support**:
  - Respects `prefers-reduced-motion` system preference
  - Disables animations for users with vestibular disorders
  - Smooth scroll behavior toggles off

- **Keyboard Navigation Enhancements**:
  - Logical tab order throughout site
  - No keyboard traps
  - All functionality available via keyboard
  - View toggle buttons show active state
  - Quick filter buttons with pressed states

- **ACCESSIBILITY.md Documentation**:
  - Comprehensive accessibility statement
  - WCAG 2.1 compliance documentation
  - Testing procedures and checklists
  - Screen reader testing guide (NVDA, JAWS, VoiceOver, TalkBack)
  - Automated testing tools (Lighthouse, axe, WAVE)
  - Keyboard navigation guide
  - Known issues and roadmap
  - Accessibility reporting process

### Improved

- **Semantic HTML Structure**:
  - Added `role="banner"` to header
  - Added `role="contentinfo"` to footer
  - Added `role="main"` to main content area
  - Navigation elements properly labeled with `aria-label`
  - Status regions marked with `role="status"`

- **Button Accessibility**:
  - More descriptive `aria-label` attributes
  - Theme toggle: "Toggle between light and dark theme"
  - Print button: "Print this page"
  - View toggles: "Switch to list/grid view" with `aria-pressed`
  - Clear search: "Clear search input" with screen reader text

- **Link Accessibility**:
  - External links note they open in new tabs
  - Footer navigation properly labeled
  - Community links have descriptive labels
  - Back to top link clarifies action

- **Form Controls**:
  - Search input has descriptive label
  - Select dropdowns properly labeled
  - Filter controls grouped with `role="group"`
  - Search results status announced dynamically

### Enhanced

- **Service Worker** (`sw.js` v2.3.1):
  - Added `404.html` to static cache
  - Added `keyboardShortcuts.js` to cache
  - Added `keyboard-shortcuts.css` to CSS cache
  - Added `pwa-cache.css` to CSS cache
  - Added `accessibility.css` to CSS cache
  - Updated cache version to 2.3.1

- **Visual Accessibility**:
  - High contrast focus indicators
  - Color contrast meets AAA standards (7:1 ratio)
  - Zoom to 200% without horizontal scroll
  - Dark mode with proper contrast maintained
  - Touch targets meet WCAG 2.1 AAA (44×44px minimum)

### Technical Details

- **New Files**: 2 files created
  - `style/components/accessibility.css` (400+ lines)
  - `ACCESSIBILITY.md` (500+ lines)

- **Modified Files**: 2 files enhanced
  - `index.html`: Added skip link, improved ARIA labels, semantic roles
  - `sw.js`: Updated cache with new assets

- **Lines of Code**: 900+ lines added

- **Accessibility Standards Met**:
  - ✅ WCAG 2.1 Level AAA (most criteria)
  - ✅ Section 508 compliant
  - ✅ ARIA 1.2 best practices
  - ✅ Keyboard accessible
  - ✅ Screen reader compatible
  - ✅ High contrast mode support
  - ✅ Reduced motion support
  - ✅ Touch target sizes (AAA)

## [2.3.0] - 2025-02-05

### Added

#### Core Infrastructure
- **Logger System** (`scripts/logger.js`): Centralized logging utility with environment detection
  - Only shows debug logs in development (localhost or `?debug=true`)
  - Supports debug, info, warn, and error log levels
  - Globally accessible as `window.Logger`

- **Data Validation** (`scripts/validatePatches.js`): Comprehensive patch data validation
  - Validates required fields (id, date, title, content, path)
  - Checks data types and formats
  - Detects duplicate IDs and invalid dates
  - Accessible via `?validate=true` URL parameter
  - Generates detailed validation reports

- **Lazy Loading** (`scripts/lazyLoader.js`): Performance optimization for large patch lists
  - Intersection Observer-based lazy loading
  - Virtual scrolling support
  - Fallback for older browsers
  - Removes arbitrary 10-patch mobile limitation

#### User Experience Features
- **Custom 404 Error Page** (`404.html`): Beautiful, branded error page
  - Helpful navigation links
  - Search to find patches
  - Responsive design with inline styles
  - Consistent branding with main site

- **Keyboard Shortcuts** (`scripts/keyboardShortcuts.js`):
  - `Ctrl/Cmd+K`: Focus search
  - `?` or `Alt+H`: Show keyboard shortcuts help
  - `Alt+T`: Toggle theme
  - `Alt+A`: Enable auto-theme sync
  - `Esc`: Close modals
  - Visual modal showing all shortcuts
  - Styled with `style/components/keyboard-shortcuts.css`

- **Enhanced Theme System** (`scripts/coreUI.js` v2.3.0):
  - Smooth CSS transitions between themes (0.3s ease)
  - Auto-sync with system theme preferences via `matchMedia`
  - User notifications when theme changes
  - Exposed as `window.themeManager` for global access
  - Transition class added to `style/root.css`

- **PWA Cache Management** (`scripts/pwa.js` v2.3.0):
  - User-facing cache management modal
  - Display cache size and file count
  - Clear all caches button
  - Refresh service worker button
  - Toast notifications for actions
  - Accessible from footer button
  - Styled with `style/components/pwa-cache.css`

#### Documentation
- **CONTRIBUTING.md**: Comprehensive contribution guidelines
  - Ways to contribute (bug reports, features, code, documentation)
  - Development setup instructions
  - Coding standards and best practices
  - Git workflow and branch naming
  - Pull request process
  - Code review guidelines

- **SECURITY.md**: Security policy and vulnerability reporting
  - Supported versions
  - Security features (HTTPS, SRI, CSP, XSS protection)
  - Vulnerability reporting process
  - Security best practices for contributors

- **ARCHITECTURE.md**: Technical architecture documentation
  - Technology stack overview
  - Project structure explanation
  - Component descriptions
  - Data flow diagrams
  - Caching strategies
  - Performance optimizations

- **CHANGELOG.md**: This version history file

#### Project Configuration
- **.gitignore**: Standard ignore patterns for Node.js, logs, and OS files
- **.editorconfig**: Consistent coding style across editors

### Changed
- **Code Cleanup**: Removed 14+ debug console.log statements from production code
  - `scripts/populatePatches.js`: Removed verbose debug logging
  - Replaced with Logger system where appropriate

- **Date Standardization**: Fixed inconsistent date formatting in `assets/data/patches.json`
  - Before: Mixed formats (" - November 22 2025", "November 22, 2025")
  - After: Standardized to "Month DD, YYYY" format across all 30 patches

- **Footer Update**: Updated copyright year to February 5, 2026 in `index.html`

- **Security Enhancement**: Added SRI hash to Font Awesome CDN link
  - Hash: `sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==`

- **Mobile Experience**: Removed arbitrary 10-patch limit on mobile devices
  - Replaced with smart lazy loading for better performance

### Enhanced
- **JSDoc Documentation**: Added comprehensive JSDoc comments to:
  - `scripts/populatePatches.js`: Complete API documentation
  - `scripts/search.js`: Full method and parameter documentation

- **Service Worker** (`sw.js`): Updated cache manifest to include new assets
  - Added logger.js, validatePatches.js, lazyLoader.js, keyboardShortcuts.js
  - Added keyboard-shortcuts.css, pwa-cache.css
  - Updated cache version

### Improved
- **Code Quality**: 
  - More maintainable and debuggable code
  - Better error handling and validation
  - Consistent coding standards
  - Comprehensive documentation

- **Performance**:
  - Lazy loading for efficient rendering
  - Optimized image loading
  - Better cache management

- **Accessibility**:
  - Keyboard navigation support
  - Semantic HTML improvements
  - ARIA labels where appropriate

### Technical Details
- **New Files**: 13 files created
  - 4 JavaScript modules (logger, validatePatches, lazyLoader, keyboardShortcuts)
  - 4 documentation files (CONTRIBUTING, SECURITY, ARCHITECTURE, CHANGELOG)
  - 3 CSS files (keyboard-shortcuts, pwa-cache, updated root.css)
  - 2 config files (.gitignore, .editorconfig)
  - 1 HTML file (404.html)

- **Modified Files**: 6 files enhanced
  - `index.html`: Added new scripts and CSS links
  - `scripts/populatePatches.js`: Cleanup and JSDoc
  - `scripts/search.js`: Added JSDoc
  - `scripts/coreUI.js`: Theme enhancements
  - `scripts/pwa.js`: Cache management features
  - `assets/data/patches.json`: Date standardization

- **Lines of Code**: 2,500+ lines added across all changes

## [2.2.0] - Previous Version
- Base version before major refactoring
- Original PWA implementation
- Core search and navigation features

---

## Version History Notes

### Version Numbering
- **Major (X.0.0)**: Breaking changes or major architectural shifts
- **Minor (2.X.0)**: New features, enhancements, non-breaking changes
- **Patch (2.3.X)**: Bug fixes, minor improvements

### Categories
- **Added**: New features
- **Changed**: Changes to existing functionality
- **Deprecated**: Soon-to-be removed features
- **Removed**: Removed features
- **Fixed**: Bug fixes
- **Security**: Security improvements
- **Enhanced**: Improvements to existing features
- **Improved**: General improvements

---

For more details on contributing to this project, see [CONTRIBUTING.md](CONTRIBUTING.md).
For security policy, see [SECURITY.md](SECURITY.md).
For technical architecture, see [ARCHITECTURE.md](ARCHITECTURE.md).
