const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

// Configuration
const WATERMARK_TEXT = 'STUDIO NEXORA • PAGO REQUERIDO';
const INPUT_DIR = './test_images';
const OUTPUT_DIR = './test_images/watermarked';
const OPACITY = 0.4; // 40%
const BLUR_SIGMA = 1; // 1px gaussian blur

async function createWatermarkSVG(width, height, fontSize) {
  // Calculate diagonal positioning (from bottom-left to top-right)
  const diagonal = Math.sqrt(width * width + height * height);
  const angle = Math.atan2(height, width) * (180 / Math.PI);
  
  // Position text in center of diagonal
  const centerX = width / 2;
  const centerY = height / 2;
  
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="${BLUR_SIGMA}"/>
        </filter>
      </defs>
      <text
        x="${centerX}"
        y="${centerY}"
        font-family="Helvetica, Arial, sans-serif"
        font-weight="bold"
        font-size="${fontSize}"
        fill="white"
        text-anchor="middle"
        dominant-baseline="middle"
        transform="rotate(${angle} ${centerX} ${centerY})"
        opacity="${OPACITY}"
        filter="url(#blur)"
      >${WATERMARK_TEXT}</text>
    </svg>
  `;
  
  return Buffer.from(svg);
}

async function addWatermark(inputPath, outputPath) {
  try {
    console.log(`Processing: ${inputPath}`);
    
    // Get image metadata
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    const { width, height } = metadata;
    
    // Calculate font size (~70% of image width)
    const fontSize = Math.floor(width * 0.7 / WATERMARK_TEXT.length * 2);
    
    // Create watermark SVG
    const watermarkSVG = await createWatermarkSVG(width, height, fontSize);
    
    // Apply watermark with overlay blend mode
    await image
      .composite([
        {
          input: watermarkSVG,
          blend: 'overlay'
        }
      ])
      .jpeg({ quality: 90 })
      .toFile(outputPath);
    
    console.log(`✓ Watermarked: ${outputPath}`);
    return true;
  } catch (error) {
    console.error(`✗ Error processing ${inputPath}:`, error.message);
    return false;
  }
}

async function processImages() {
  try {
    console.log('🎨 Starting watermark process...');
    console.log(`Input directory: ${INPUT_DIR}`);
    console.log(`Output directory: ${OUTPUT_DIR}`);
    console.log(`Watermark text: "${WATERMARK_TEXT}"`);
    console.log(`Opacity: ${OPACITY * 100}%`);
    console.log(`Blur: ${BLUR_SIGMA}px gaussian`);
    console.log('---');
    
    // Ensure output directory exists
    await fs.mkdir(OUTPUT_DIR, { recursive: true });
    
    // Get all image files from input directory
    const files = await fs.readdir(INPUT_DIR);
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.webp', '.tiff', '.bmp'].includes(ext);
    });
    
    if (imageFiles.length === 0) {
      console.log('❌ No image files found in input directory');
      return;
    }
    
    console.log(`Found ${imageFiles.length} image(s) to process:`);
    imageFiles.forEach(file => console.log(`  - ${file}`));
    console.log('---');
    
    // Process each image
    let successCount = 0;
    for (const file of imageFiles) {
      const inputPath = path.join(INPUT_DIR, file);
      const outputPath = path.join(OUTPUT_DIR, file);
      
      const success = await addWatermark(inputPath, outputPath);
      if (success) successCount++;
    }
    
    console.log('---');
    console.log(`🎉 Process completed: ${successCount}/${imageFiles.length} images watermarked successfully`);
    
    if (successCount > 0) {
      console.log('\n📁 Generated files:');
      const outputFiles = await fs.readdir(OUTPUT_DIR);
      outputFiles.forEach(file => console.log(`  - ${OUTPUT_DIR}/${file}`));
    }
    
  } catch (error) {
    console.error('❌ Fatal error:', error.message);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  processImages();
}

module.exports = { addWatermark, processImages };