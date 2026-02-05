# Accessibility Statement

## Overview

The FAForever Patchnotes website is committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply the relevant accessibility standards.

## Conformance Status

This website aims to conform to **WCAG 2.1 Level AAA** standards. Our accessibility features have been implemented based on:

- **WCAG 2.1** (Web Content Accessibility Guidelines)
- **Section 508** compliance
- **ARIA 1.2** (Accessible Rich Internet Applications)
- **Web accessibility best practices**

### Current Status: **Substantially Conformant**

We meet AAA criteria for most guidelines and are actively working toward full compliance.

---

## Accessibility Features

### 🎯 Keyboard Navigation

#### Skip Links
- **Skip to main content** link appears on Tab key press
- Direct navigation to primary content area
- High contrast focus indicator

#### Keyboard Shortcuts
Press `?` or `Alt+H` to view all available shortcuts:
- `Ctrl/Cmd+K` - Focus search input
- `Alt+T` - Toggle theme (light/dark)
- `Alt+A` - Enable auto-theme sync
- `Esc` - Close modals and dialogs
- `Tab` - Navigate forward through interactive elements
- `Shift+Tab` - Navigate backward through interactive elements
- `Enter/Space` - Activate buttons and links

#### Focus Indicators
- 3px solid outline with 3:1 contrast ratio (WCAG 2.1 AAA)
- Enhanced focus boxes with shadow effects
- Only visible for keyboard navigation (`:focus-visible`)
- High contrast mode support

### 🔊 Screen Reader Support

#### ARIA Labels
All interactive elements have descriptive ARIA labels:
```html
<button aria-label="View latest patch notes">Latest</button>
<input aria-label="Search through patch notes">
<nav aria-label="Footer navigation">
```

#### ARIA Live Regions
Dynamic content updates are announced:
```html
<div role="status" aria-live="polite">
  Showing 5 of 30 patches
</div>
```

#### Semantic HTML
- Proper heading hierarchy (H1→H2→H3)
- Landmark regions: `<main>`, `<nav>`, `<header>`, `<footer>`
- Role attributes: `role="banner"`, `role="contentinfo"`, `role="list"`

#### Hidden Decorative Content
Icons are hidden from screen readers:
```html
<i class="fas fa-search" aria-hidden="true"></i>
```

### 🎨 Visual Accessibility

#### Color Contrast
All color combinations meet WCAG AAA standards (7:1 for normal text, 4.5:1 for large text):
- **Text on background**: 9.2:1 contrast ratio ✓
- **Links**: Underlined + color differentiation ✓
- **Buttons**: High contrast borders and fills ✓
- **Focus indicators**: 3:1 contrast ratio ✓

#### Dark Mode
- System preference detection
- Manual toggle with `Alt+T`
- Auto-sync option with `Alt+A`
- Smooth transitions with `prefers-reduced-motion` respect

#### Font Sizing
- Relative units (rem, em) throughout
- Zoomable to 200% without horizontal scrolling
- Minimum font size: 14px (0.875rem)
- Maximum line length: 80 characters

### 📱 Touch Target Sizes

WCAG 2.1 AAA compliance (2.5.5):
- **Desktop**: Minimum 44×44px touch targets
- **Mobile**: Minimum 48×48px touch targets
- Adequate spacing between interactive elements

### ⚡ Motion & Animation

#### Reduced Motion Support
Automatically detects and respects `prefers-reduced-motion`:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

#### Safe Animations
- No flashing content (max 3 flashes per second)
- No auto-playing animations
- User-controlled theme transitions

### 🌐 Internationalization

#### Language Declaration
```html
<html lang="en">
```

#### RTL Support
Ready for right-to-left languages:
```css
[dir="rtl"] { direction: rtl; }
```

---

## Accessibility Testing

### Automated Testing

#### Lighthouse Audit
Run Lighthouse in Chrome DevTools:
1. Open Chrome DevTools (`F12`)
2. Go to **Lighthouse** tab
3. Select **Accessibility** category
4. Run audit

**Target Score**: 95+ (current: varies by page)

#### axe DevTools
Install [axe DevTools](https://www.deque.com/axe/devtools/) browser extension:
```bash
1. Install axe DevTools extension
2. Open DevTools → axe tab
3. Click "Scan ALL of my page"
4. Review and fix violations
```

#### WAVE Tool
Use [WAVE](https://wave.webaim.org/):
1. Visit https://wave.webaim.org/
2. Enter site URL
3. Review errors and alerts

### Manual Testing

#### Keyboard Navigation Test
1. Start at top of page
2. Press `Tab` key repeatedly
3. Verify:
   - Skip link appears first
   - All interactive elements are reachable
   - Focus order is logical (top → bottom, left → right)
   - No keyboard traps
   - Visible focus indicators on all elements

#### Screen Reader Test

**NVDA (Windows - Free)**
```bash
1. Download: https://www.nvaccess.org/download/
2. Install and launch NVDA
3. Navigate site with keyboard
4. Verify all content is announced properly
```

**JAWS (Windows - Commercial)**
```bash
1. Install JAWS
2. Navigate site with keyboard
3. Test forms, buttons, and dynamic content
```

**VoiceOver (macOS - Built-in)**
```bash
1. Press Cmd+F5 to enable VoiceOver
2. Use VoiceOver commands (VO+Arrow keys)
3. Navigate through landmarks and headings
```

**TalkBack (Android - Built-in)**
```bash
1. Settings → Accessibility → TalkBack
2. Enable TalkBack
3. Navigate with swipe gestures
```

#### Color Contrast Test
Use [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/):
1. Test foreground and background color combinations
2. Ensure 4.5:1 for normal text (AA)
3. Aim for 7:1 for enhanced contrast (AAA)

#### Zoom Test
1. Browser zoom to 200% (`Ctrl/Cmd + +`)
2. Verify no horizontal scrolling
3. Check all content remains readable
4. Test up to 400% for AAA compliance

#### Mobile Accessibility Test
1. Test on real devices (iOS, Android)
2. Enable accessibility features:
   - **iOS**: VoiceOver, Zoom, Larger Text
   - **Android**: TalkBack, Magnification, Font Size
3. Test touch targets (should be 48×48px minimum)
4. Verify gestures work with assistive tech

---

## Known Issues & Roadmap

### Current Limitations

#### Minor Issues
- [ ] Some third-party embedded content (Font Awesome CDN) may not be fully accessible
- [ ] Historical patch HTML files may have legacy accessibility issues
- [ ] External links open in new tabs (deliberate UX decision, but noted)

#### In Progress
- [ ] Full WCAG 2.1 AAA audit completion
- [ ] Screen reader testing with all major tools
- [ ] User testing with people with disabilities

### Future Improvements

#### Short Term (Next Release)
- [ ] Add custom focus indicators per component type
- [ ] Implement focus trap for modals
- [ ] Add keyboard shortcut legend to footer
- [ ] Improve search result announcements

#### Long Term
- [ ] Multi-language support (i18n)
- [ ] Custom font size selector
- [ ] High contrast theme option
- [ ] Voice navigation support

---

## Testing Checklist

Use this checklist before each release:

### Automated Tests
- [ ] Lighthouse accessibility score 95+
- [ ] axe DevTools: 0 violations
- [ ] WAVE: 0 errors
- [ ] HTML validation passes

### Keyboard Navigation
- [ ] Skip link works
- [ ] All interactive elements reachable
- [ ] No keyboard traps
- [ ] Logical tab order
- [ ] Focus indicators visible
- [ ] Keyboard shortcuts functional

### Screen Readers
- [ ] NVDA: All content announced
- [ ] VoiceOver: Landmarks navigable
- [ ] Content order makes sense
- [ ] Form labels properly associated
- [ ] Status updates announced

### Visual
- [ ] Color contrast meets AAA (7:1)
- [ ] Zoom to 200% works
- [ ] No horizontal scrolling
- [ ] Dark mode accessible
- [ ] Text resizable

### Mobile
- [ ] Touch targets 48×48px minimum
- [ ] VoiceOver/TalkBack compatible
- [ ] Pinch zoom works
- [ ] Orientation changes handled

### Other
- [ ] Forms have labels and error messages
- [ ] Images have alt text
- [ ] Videos have captions (if applicable)
- [ ] Links have descriptive text
- [ ] Reduced motion respected

---

## Testing Commands

### Quick Lighthouse Audit
```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run audit
lighthouse https://your-site-url --view --only-categories=accessibility

# Generate report
lighthouse https://your-site-url --output html --output-path ./accessibility-report.html
```

### Pa11y Automated Testing
```bash
# Install Pa11y
npm install -g pa11y

# Test single page
pa11y https://your-site-url

# Test with specific WCAG level
pa11y --standard WCAG2AAA https://your-site-url

# Generate report
pa11y --reporter html https://your-site-url > accessibility-report.html
```

### axe-core CLI
```bash
# Install axe-cli
npm install -g @axe-core/cli

# Run test
axe https://your-site-url

# Save results
axe https://your-site-url --save results.json
```

---

## Browser Compatibility

### Supported Assistive Technologies

| Tool | Platform | Status | Notes |
|------|----------|--------|-------|
| NVDA | Windows | ✅ Tested | Latest version |
| JAWS | Windows | ⚠️ Compatible | Not regularly tested |
| VoiceOver | macOS/iOS | ✅ Tested | Built-in |
| TalkBack | Android | ⚠️ Compatible | Periodic testing |
| Narrator | Windows | ⚠️ Compatible | Basic support |

### Browser Support
- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅
- Opera 76+ ✅

---

## Reporting Accessibility Issues

We welcome feedback on the accessibility of the FAForever Patchnotes site.

### How to Report
1. **GitHub Issue**: [Open an issue](https://github.com/FAForever/patchnotes/issues/new) with label `accessibility`
2. **Email**: accessibility@faforever.com
3. **Discord**: Message a moderator on [FAForever Discord](https://discord.gg/mXahAXy)

### What to Include
- **Page URL** where you experienced the issue
- **Assistive technology** you're using (name and version)
- **Browser** and version
- **Operating system**
- **Description** of the problem
- **Expected behavior**
- **Steps to reproduce**

### Response Time
- **Critical issues**: 24-48 hours
- **Major issues**: 3-5 business days
- **Minor issues**: 1-2 weeks

---

## Accessibility Team

Contributors focused on accessibility:
- **Lead**: Community contributor
- **Testing**: Community volunteers
- **Development**: Open source contributors

Want to help? See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## Standards & References

### Guidelines
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Section 508 Standards](https://www.section508.gov/)

### Tools
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE](https://wave.webaim.org/)
- [Color Contrast Analyzer](https://www.tpgi.com/color-contrast-checker/)

### Learning Resources
- [WebAIM](https://webaim.org/)
- [A11y Project](https://www.a11yproject.com/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

---

## Compliance Statement

This accessibility statement was last updated on **February 5, 2026**.

We are committed to maintaining and improving the accessibility of this website. If you encounter any barriers, please let us know.

### Legal Notice
This website aims to comply with:
- **Americans with Disabilities Act (ADA)**
- **Section 508** of the Rehabilitation Act
- **European Accessibility Act (EAA)**
- **EN 301 549** European standard

---

**Questions or feedback?** Contact us through the methods listed above. We appreciate your help in making our site accessible to everyone.
