# Contributing to FAForever Patchnotes

Thank you for your interest in contributing to the FAForever Patchnotes project! This document provides guidelines and instructions for contributing.

## 🎯 Ways to Contribute

### 🐛 Bug Reports
- Search existing issues to avoid duplicates
- Use a clear, descriptive title
- Provide detailed reproduction steps
- Include browser/device information
- Add screenshots or GIFs if relevant

### 💡 Feature Requests
- Check if the feature has already been requested
- Clearly describe the feature and its benefits
- Explain the use case and why it's valuable
- Consider implementation complexity

### 🔧 Code Contributions
- Fork the repository
- Create a feature branch (`git checkout -b feature/amazing-feature`)
- Make your changes following our coding standards
- Test thoroughly across different browsers
- Submit a pull request with a clear description

### 📖 Documentation
- Fix typos or unclear explanations
- Add missing documentation
- Improve code comments
- Update the README when needed

### 🎨 Design & UX
- Suggest UI/UX improvements
- Report accessibility issues
- Propose design enhancements

## 🏗️ Development Setup

### Prerequisites
- A local web server (e.g., Live Server for VS Code, Python's `http.server`, Node's `http-server`)
- Modern web browser (Chrome, Firefox, Edge, Safari)
- Text editor or IDE (VS Code recommended)

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/FAForever/patchnotes.git
   cd patchnotes
   ```

2. **Serve the files:**
   
   Using Python:
   ```bash
   python -m http.server 8000
   ```
   
   Using Node.js:
   ```bash
   npx http-server -p 8000
   ```
   
   Using VS Code Live Server:
   - Install the Live Server extension
   - Right-click on `index.html` and select "Open with Live Server"

3. **Open in browser:**
   Navigate to `http://localhost:8000`

4. **Enable debug mode:**
   Add `?debug=true` to the URL to see console logs

### Project Structure

```
patchnotes/
├── index.html              # Main entry point
├── manifest.json           # PWA manifest
├── sw.js                   # Service worker for offline support
├── assets/
│   ├── data/
│   │   └── patches.json    # Patch data (JSON format)
│   └── images/             # All images and icons
├── pages/                  # Individual patch HTML files
│   └── [year]/
│       └── [patch].html
├── scripts/                # JavaScript modules
│   ├── logger.js          # Logging utility
│   ├── populatePatches.js # Main patch rendering logic
│   ├── search.js          # Search functionality
│   ├── coreUI.js          # UI management (theme, background)
│   ├── errorBoundary.js   # Error handling
│   ├── performance.js     # Performance monitoring
│   └── analytics.js       # User behavior tracking
└── style/                  # CSS files
    ├── root.css           # CSS variables and base styles
    ├── index.css          # Main stylesheet
    └── components/        # Component-specific styles
```

## 📝 Coding Standards

### JavaScript

- **Use ES6+ features** where supported
- **Avoid global variables** - use modules or IIFE patterns
- **Add JSDoc comments** to public functions
- **Use meaningful variable names**
- **Keep functions small and focused**
- **Use the Logger class** instead of `console.log` for debug output

Example:
```javascript
/**
 * Filters patches based on search criteria
 * @param {string} query - The search query
 * @param {Array} patches - Array of patch objects
 * @returns {Array} Filtered patches
 */
function filterPatches(query, patches) {
  const logger = new Logger('Filter');
  logger.debug('Filtering patches', { query, count: patches.length });
  // Implementation...
}
```

### CSS

- **Use CSS variables** for theming (defined in `root.css`)
- **Follow BEM naming** for component classes when appropriate
- **Mobile-first approach** for responsive design
- **Test dark and light themes**
- **Ensure accessibility** (contrast ratios, focus states)

### HTML

- **Use semantic HTML5** elements
- **Add ARIA labels** for accessibility
- **Include alt text** for images
- **Keep structure consistent** across patch pages

## 🧪 Testing

### Browser Testing
Test your changes in:
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Android)

### PWA Testing
- Test offline functionality
- Verify service worker updates
- Check manifest and icons
- Test "Add to Home Screen" on mobile

### Accessibility Testing
- Use keyboard navigation (Tab, Enter, Escape)
- Test with screen readers
- Check color contrast ratios
- Verify focus indicators

## 📦 Adding New Patches

1. **Create the HTML file:**
   - Copy a recent patch file from `/pages/[year]/`
   - Update the content following the existing template
   - Save as `/pages/[year]/[patch-number].html`

2. **Update patches.json:**
   ```json
   {
     "patch": "3830",
     "link": "pages/2026/3830.html",
     "date": "February 5, 2026"
   }
   ```
   Add the entry at the beginning of the `balance` array (newest first)

3. **Test locally:**
   - Verify the patch appears in the list
   - Check the link works correctly
   - Test search and filtering functionality

## 🔍 Pull Request Process

1. **Update relevant documentation**
2. **Test your changes thoroughly**
3. **Update the service worker cache version** if needed (`sw.js`)
4. **Write a clear PR description:**
   - What changes were made
   - Why the changes are needed
   - How to test the changes
   - Screenshots/GIFs if UI changes

5. **Reference related issues** using `#issue-number`

### PR Title Format
- `feat: Add new search feature`
- `fix: Correct mobile display issue`
- `docs: Update contributing guidelines`
- `style: Improve button hover states`
- `refactor: Simplify patch rendering logic`
- `perf: Optimize image loading`

## 🎨 Design Guidelines

### Colors
Use CSS variables defined in `root.css`:
- Light mode and dark mode support
- Maintain WCAG AA contrast ratios
- Use accent color (`--Accent-Color`) sparingly

### Typography
- Primary font: Open Sans
- Headings: Ubuntu
- Maintain readable font sizes (minimum 16px for body)

### Responsive Design
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🐛 Debugging Tips

### Enable Debug Mode
Add `?debug=true` to the URL to enable verbose logging

### Clear Service Worker Cache
When testing PWA features:
1. Open DevTools → Application → Service Workers
2. Click "Unregister"
3. Clear site data
4. Reload

### Common Issues

**Patches not loading?**
- Check browser console for errors
- Verify `patches.json` syntax (use a JSON validator)
- Ensure file paths are correct

**Styles not updating?**
- Clear browser cache
- Check service worker isn't serving old cached version
- Increment cache version in `sw.js`

## 📞 Getting Help

- **Discord:** Join the [FAForever Discord](https://discord.gg/mXahAXy)
- **GitHub Issues:** Ask questions by opening an issue
- **Documentation:** Check the main [README.md](README.md)

## 📜 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards others

## 🙏 Recognition

All contributors will be recognized in our contributors list. Thank you for helping improve the FAForever Patchnotes!

---

**Questions?** Feel free to open an issue or reach out on Discord!
