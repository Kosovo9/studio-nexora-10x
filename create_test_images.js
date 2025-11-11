const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function createTestImages() {
  console.log('🎨 Creating test images...');
  
  const testImagesDir = './test_images';
  
  // Ensure directory exists
  if (!fs.existsSync(testImagesDir)) {
    fs.mkdirSync(testImagesDir, { recursive: true });
  }
  
  try {
    // Create test1.jpg - 800x600 red gradient
    await sharp({
      create: {
        width: 800,
        height: 600,
        channels: 3,
        background: { r: 255, g: 100, b: 100 }
      }
    })
    .jpeg({ quality: 90 })
    .toFile(path.join(testImagesDir, 'test1.jpg'));
    console.log('✅ Created test1.jpg (800x600)');
    
    // Create test2.png - 1200x800 blue gradient
    await sharp({
      create: {
        width: 1200,
        height: 800,
        channels: 3,
        background: { r: 100, g: 150, b: 255 }
      }
    })
    .png()
    .toFile(path.join(testImagesDir, 'test2.png'));
    console.log('✅ Created test2.png (1200x800)');
    
    // Create test3.jpg - 1000x1000 green gradient
    await sharp({
      create: {
        width: 1000,
        height: 1000,
        channels: 3,
        background: { r: 100, g: 255, b: 150 }
      }
    })
    .jpeg({ quality: 90 })
    .toFile(path.join(testImagesDir, 'test3.jpg'));
    console.log('✅ Created test3.jpg (1000x1000)');
    
    console.log('🎉 All test images created successfully!');
    
  } catch (error) {
    console.error('❌ Error creating test images:', error.message);
  }
}

createTestImages();