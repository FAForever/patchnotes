// PWA Icon Generator Script
// Requires: npm install sharp (install this if not present)

const fs = require('fs');
const path = require('path');

// If sharp is not available, we'll create a fallback
let sharp;
try {
    sharp = require('sharp');
} catch (e) {
    console.log('Sharp not available, creating manual conversion script...');
}

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const iconsDir = './assets/images/icons/';

// SVG content for different sizes
const createIconSVG = (size) => {
    const isSmall = size < 144;
    const fontSize = isSmall ? Math.floor(size * 0.4) : Math.floor(size * 0.35);
    const circleRadius = Math.floor(size * 0.35);
    const strokeWidth = Math.max(2, Math.floor(size * 0.02));
    
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <rect width="${size}" height="${size}" fill="#222831" rx="${Math.floor(size * 0.125)}"/>
  <g transform="translate(${size/2},${size/2})">
    <circle r="${circleRadius}" fill="#00d2ff" opacity="0.15"/>
    <circle r="${circleRadius - strokeWidth}" fill="none" stroke="#00d2ff" stroke-width="${strokeWidth}"/>
    <text x="0" y="${Math.floor(fontSize * 0.35)}" text-anchor="middle" font-family="Arial Black, sans-serif" font-size="${fontSize}" font-weight="900" fill="#00d2ff">FA</text>
    ${isSmall ? '' : `<text x="0" y="${Math.floor(fontSize * 0.8)}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${Math.floor(fontSize * 0.25)}" font-weight="600" fill="#EEEEEE">PATCHES</text>`}
  </g>
</svg>`;
};

// Generate SVG files for each size
sizes.forEach(size => {
    const svgContent = createIconSVG(size);
    const filename = `icon-${size}x${size}.svg`;
    fs.writeFileSync(path.join(iconsDir, filename), svgContent);
    console.log(`Created ${filename}`);
});

console.log('\nSVG icons created! To convert to PNG:');
console.log('1. Install sharp: npm install sharp');
console.log('2. Use online converter like https://convertio.co/svg-png/');
console.log('3. Or use any image editor to export SVGs as PNG');
console.log('\nAlternatively, you can use the generate-icons.html file in a browser.');
