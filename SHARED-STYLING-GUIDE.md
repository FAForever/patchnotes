# Patch Notes - Shared Styling and Scripting System

## Overview

This system eliminates the need for inline styles and scripts in individual patch HTML files by providing shared external resources that are automatically loaded.

## Files Created

### CSS Files
- `/style/critical.css` - Critical CSS for FOUC prevention and basic layout
- `/style/balance.css` - Main stylesheet (existing, updated imports)

### JavaScript Files
- `/scripts/headConfig.js` - Manages shared head elements (preconnects, stylesheets, scripts)
- `/scripts/styleLoader.js` - Handles style loading detection and FOUC prevention
- `/scripts/themeSwitch.js` - Theme switching functionality (existing)
- `/scripts/contentSidemenu.js` - Sidebar navigation functionality (existing)

## How to Use

### For New Patch Files

Use this minimal head structure:

```html
<head>
    <meta charset="UTF-8" />
    <meta name="description" content="[Your patch description]" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>[Your patch title]</title>

    <!-- Critical CSS for immediate loading -->
    <link rel="stylesheet" href="/style/critical.css" />

    <!-- Load head configuration and shared resources -->
    <script src="/scripts/headConfig.js"></script>
</head>
```

### For Existing Patch Files

Replace the existing head content with the minimal structure above. Update only:
- The `description` content
- The `title` content

Everything else (Font Awesome, balance.css, scripts) will be loaded automatically.

## Benefits

### Maintenance
- ✅ **Single source of truth** - Update styles/scripts in one place
- ✅ **Consistent loading** - All pages use the same loading strategy
- ✅ **Easy updates** - Change one file to update all pages

### Performance
- ✅ **Better caching** - External files can be cached by browsers
- ✅ **Faster loading** - Optimized resource loading order
- ✅ **No FOUC** - Prevents flash of unstyled content

### Development
- ✅ **Clean HTML** - No inline styles or scripts
- ✅ **Template ready** - Easy to create new patch files
- ✅ **Consistent structure** - All pages follow the same pattern

## What Gets Loaded Automatically

The `headConfig.js` script automatically adds:

1. **Preconnect links** for better performance:
   - Google Fonts
   - Font Awesome CDN

2. **Stylesheets**:
   - Font Awesome (if not already present)
   - Main balance.css stylesheet

3. **Scripts**:
   - styleLoader.js (immediate load)
   - themeSwitch.js (deferred)
   - contentSidemenu.js (deferred)

## Migration Guide

To update existing patch files:

1. **Replace the entire `<head>` section** with the template above
2. **Update description and title** to match the patch
3. **Remove any inline `<style>` or `<script>` tags** from the body
4. **Test the page** to ensure all styles and functionality work

## Example Migration

**Before:**
```html
<head>
    <meta charset="UTF-8" />
    <title>Patch 3825</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"/>
    <link rel="stylesheet" href="/style/balance.css"/>
    <script src="/scripts/themeSwitch.js" defer></script>
    <script src="/scripts/contentSidemenu.js" defer></script>
    <style>/* inline styles */</style>
    <script>/* inline scripts */</script>
</head>
```

**After:**
```html
<head>
    <meta charset="UTF-8" />
    <meta name="description" content="FAForever Patch 3825 balance update..." />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>FAForever Patch 3825 - Balance Update</title>
    <link rel="stylesheet" href="/style/critical.css" />
    <script src="/scripts/headConfig.js"></script>
</head>
```

## Files Updated

The following files have been updated to use the new system:
- ✅ `pages/balance/2025/3825.html`
- ✅ `pages/balance/2025/3822.html`
- ✅ `pages/balance/2025/3818.html`

## Remaining Files

Other patch files can be updated using the same pattern. The system is backwards compatible, so you can update files gradually.
