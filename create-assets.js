// Simple script to create placeholder images for Expo
const fs = require('fs');
const path = require('path');

// Create a simple 1x1 PNG (smallest valid PNG)
// This is a base64 encoded 1x1 transparent PNG
const smallPNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
  'base64'
);

const assetsDir = path.join(__dirname, 'assets');

// Create assets directory if it doesn't exist
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// Create placeholder files
const files = ['icon.png', 'splash.png', 'adaptive-icon.png', 'favicon.png'];

files.forEach(file => {
  const filePath = path.join(assetsDir, file);
  fs.writeFileSync(filePath, smallPNG);
  console.log(`✅ Created ${file}`);
});

console.log('\n🎉 All asset placeholders created!');
console.log('Note: These are minimal placeholders. Replace with proper images later.');
