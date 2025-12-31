const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const width = 1200;
const height = 630;

const locales = [
  {
    code: 'ua',
    title: 'ЕТАЖ',
    tagline: 'Сервіс переїздів та вантажоперевезень',
    location: 'Дніпро • Одеса',
    badge: 'Професійно • Надійно'
  },
  {
    code: 'ru',
    title: 'ЕТАЖ',
    tagline: 'Сервис переездов и грузоперевозок',
    location: 'Днепр • Одесса',
    badge: 'Профессионально • Надёжно'
  }
];

async function generateOGImage(locale) {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1f2a3a;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#2d3e52;stop-opacity:1" />
        </linearGradient>
        <pattern id="pattern" x="0" y="0" width="70" height="70" patternUnits="userSpaceOnUse">
          <line x1="0" y1="35" x2="70" y2="105" stroke="rgba(255,255,255,0.05)" stroke-width="2"/>
        </pattern>
      </defs>
      
      <!-- Background -->
      <rect width="${width}" height="${height}" fill="url(#grad)"/>
      <rect width="${width}" height="${height}" fill="url(#pattern)"/>
      
      <!-- Main content -->
      <g transform="translate(${width/2}, ${height/2 - 80})">
        <!-- Logo/Brand -->
        <text 
          x="0" 
          y="0" 
          font-family="Arial, sans-serif" 
          font-size="120" 
          font-weight="900" 
          fill="white" 
          text-anchor="middle"
          letter-spacing="-2"
        >
          ${locale.title}
        </text>
        
        <!-- Tagline -->
        <text 
          x="0" 
          y="90" 
          font-family="Arial, sans-serif" 
          font-size="42" 
          font-weight="400" 
          fill="rgba(255,255,255,0.9)" 
          text-anchor="middle"
        >
          ${locale.tagline}
        </text>
        
        <!-- Location -->
        <text 
          x="0" 
          y="150" 
          font-family="Arial, sans-serif" 
          font-size="32" 
          font-weight="400" 
          fill="rgba(255,255,255,0.7)" 
          text-anchor="middle"
        >
          📍 ${locale.location}
        </text>
      </g>
      
      <!-- Bottom badge -->
      <g transform="translate(${width - 320}, ${height - 70})">
        <rect 
          x="0" 
          y="0" 
          width="280" 
          height="50" 
          rx="25" 
          fill="rgba(255,255,255,0.1)"
        />
        <text 
          x="25" 
          y="33" 
          font-family="Arial, sans-serif" 
          font-size="24" 
          font-weight="600" 
          fill="rgba(255,255,255,0.9)"
        >
          ✓ ${locale.badge}
        </text>
      </g>
    </svg>
  `;

  const outputDir = path.join(__dirname, '../public/og-images');
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, `og-${locale.code}.png`);

  try {
    await sharp(Buffer.from(svg))
      .png()
      .toFile(outputPath);
    
    console.log(`✓ Generated OG image for ${locale.code}: ${outputPath}`);
  } catch (error) {
    console.error(`✗ Failed to generate OG image for ${locale.code}:`, error);
    throw error;
  }
}

async function main() {
  console.log('Generating Open Graph images...\n');
  
  try {
    await Promise.all(locales.map(locale => generateOGImage(locale)));
    console.log('\n✓ All OG images generated successfully!');
  } catch (error) {
    console.error('\n✗ Failed to generate OG images');
    process.exit(1);
  }
}

main();
