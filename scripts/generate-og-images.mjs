// Phase 5 — T5.5: OG 图片生成脚本
// 生成 1200×630px WebP 占位图，品牌 Navy 背景 + 工具名称
// Phase 9 前替换为最终设计版本

import sharp from 'sharp';
import { mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const WIDTH = 1200;
const HEIGHT = 630;
const OUT_DIR = join(__dirname, '..', 'public', 'og');

const images = [
  { filename: 'home.webp', label: 'petsMetrics', subtitle: 'One Profile. Every Answer.' },
  { filename: 'dog-hub.webp', label: 'Dog Health Calculators', subtitle: 'Science-based tools for dog owners' },
  { filename: 'cat-hub.webp', label: 'Cat Health Calculators', subtitle: 'Precision tools for indoor cat owners' },
  { filename: 'dog-age-calculator.webp', label: 'Dog Age Calculator', subtitle: 'Human age conversion' },
  { filename: 'cat-age-calculator.webp', label: 'Cat Age Calculator', subtitle: 'AAHA/AAFP standards' },
  { filename: 'dog-calorie-calculator.webp', label: 'Dog Calorie Calculator', subtitle: 'AAFCO MER formula' },
  { filename: 'puppy-growth-predictor.webp', label: 'Puppy Growth Predictor', subtitle: 'Estimate adult size' },
  { filename: 'gestation-calculator.webp', label: 'Gestation Calculator', subtitle: 'Due dates & milestones' },
  { filename: 'vaccination-schedule.webp', label: 'Vaccination Schedule', subtitle: 'WSAVA guidelines' },
  { filename: 'cat-bcs-weight-tracker.webp', label: 'Cat BCS & Weight Tracker', subtitle: 'Body condition scoring' },
  { filename: 'cat-hydration-calculator.webp', label: 'Cat Hydration Calculator', subtitle: 'Daily water needs' },
  { filename: 'toxic-checker.webp', label: 'Toxic Food Checker', subtitle: '200+ foods & plants' },
  { filename: 'eu-pet-travel-checker.webp', label: 'EU Pet Travel Checker', subtitle: 'Passport & vaccine requirements' },
];

const BRAND_NAVY = '#1B2D4F';
const BRAND_TEAL = '#0D9488';
const WHITE = '#FFFFFF';
const WHITE_70 = 'rgba(255,255,255,0.7)';

function escapeXml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

async function generateSvg(label, subtitle) {
  const safeLabel = escapeXml(label);
  const subtitleSvg = subtitle
    ? `<text x="600" y="400" font-family="Inter, system-ui, sans-serif" font-size="28" fill="${WHITE_70}" text-anchor="middle" font-weight="400">${escapeXml(subtitle)}</text>`
    : '';

  const svg = `<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${BRAND_NAVY}" />
      <stop offset="100%" style="stop-color:#0D3349" />
    </linearGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)" />
  <circle cx="1000" cy="100" r="300" fill="${BRAND_TEAL}" opacity="0.08" />
  <circle cx="150" cy="550" r="200" fill="${BRAND_TEAL}" opacity="0.06" />
  <text x="600" y="300" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="52" fill="${WHITE}" text-anchor="middle" font-weight="800">${safeLabel}</text>
  ${subtitleSvg}
  <text x="600" y="560" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="20" fill="${BRAND_TEAL}" text-anchor="middle" font-weight="600">petsMetrics</text>
</svg>`;

  return Buffer.from(svg);
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  console.log(`Generating ${images.length} OG images to ${OUT_DIR}...`);

  for (const { filename, label, subtitle } of images) {
    const svgBuffer = await generateSvg(label, subtitle);
    const outputPath = join(OUT_DIR, filename);

    await sharp(svgBuffer)
      .resize(WIDTH, HEIGHT)
      .webp({ quality: 80 })
      .toFile(outputPath);

    console.log(`  OK ${filename}`);
  }

  console.log('Done! All OG images generated.');
}

main().catch((err) => {
  console.error('Failed to generate OG images:', err);
  process.exit(1);
});
