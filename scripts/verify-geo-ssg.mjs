#!/usr/bin/env node
/**
 * verify-geo-ssg.mjs — GEO SSG 可见性验证（seo-programmatic-aicode.md TASK-A2）
 *
 * 运行方式: node scripts/verify-geo-ssg.mjs
 * 前提: 已运行 `pnpm build`（out/ 目录存在）
 *
 * 检查构建产物 HTML 中是否包含 AI 爬虫可见的 GEO 关键文本。
 */

import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { resolve, join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, '..', 'out');

/** 递归查找 out/ 目录下所有 .html 文件 */
function findHtmlFiles(dir) {
  const results = [];
  try {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      if (statSync(full).isDirectory()) {
        results.push(...findHtmlFiles(full));
      } else if (entry.endsWith('.html')) {
        results.push(full);
      }
    }
  } catch { /* out/ may not exist */ }
  return results;
}

const allFiles = findHtmlFiles(OUT);
if (allFiles.length === 0) {
  console.log('❌ No HTML files found in out/. Run "pnpm build" first.');
  process.exit(1);
}

console.log(`\n🔍 GEO SSG Visibility Check — ${allFiles.length} HTML files\n`);

const isToxicPage = (f) => /can-dogs-eat|are-toxic-to-cats/.test(f);
const isToolPage  = (f) => /(dog|cat|shared)\/(age-calculator|calorie-calculator|gestation|vaccination|bcs|hydration|growth|toxic-checker|barf|insurance|eu-pet-travel)/.test(f);
const isDogTool   = (f) => /dog\/(age-calculator|calorie-calculator|gestation-calculator|vaccination-schedule|puppy-growth-predictor)/.test(f);
const isCatTool   = (f) => /cat\/(age-calculator|bcs|hydration|gestation-calculator|vaccination-schedule)/.test(f);

const toxicFiles  = allFiles.filter(isToxicPage);
const toolFiles   = allFiles.filter(f => isToolPage(f) && !isToxicPage(f));
const dogToolFiles = toolFiles.filter(isDogTool);
const catToolFiles = toolFiles.filter(isCatTool);

function readHtml(f) {
  try { return readFileSync(f, 'utf-8'); } catch { return ''; }
}

function checkFiles(label, files, checks) {
  console.log(`\n── ${label} (${files.length} pages) ──`);
  let totalPass = 0;
  let totalFail = 0;

  for (const check of checks) {
    let pass = 0;
    let fail = 0;
    const samples = files.slice(0, 3); // sample first 3 for detailed report

    for (const f of files) {
      if (readHtml(f).includes(check.search)) {
        pass++;
      } else {
        fail++;
      }
    }

    const icon = fail === 0 ? '✅' : '❌';
    console.log(`  ${icon} "${check.search}": ${pass}/${files.length} OK`);

    if (fail > 0 && samples.length > 0) {
      const bad = samples.find(f => !readHtml(f).includes(check.search));
      if (bad) console.log(`     Missing in: ${bad.replace(OUT, 'out')}`);
    }

    if (fail === 0) totalPass++; else totalFail++;
  }
  return { pass: totalPass, fail: totalFail };
}

let overallPass = 0;
let overallFail = 0;

// ── 毒性落地页 ──
const toxicChecks = [
  { search: 'ASPCA Animal Poison Control Center' },
  { search: '426-4435' },
  { search: 'petsMetrics' },
  { search: 'veterinary' },
  { search: 'FAQPage' },
  { search: 'citation' },
];

if (toxicFiles.length > 0) {
  const r = checkFiles('Toxic Landing Pages', toxicFiles, toxicChecks);
  overallPass += r.pass;
  overallFail += r.fail;
}

// ── 狗狗工具页 ──
const dogToolChecks = [
  { search: 'SoftwareApplication' },
  { search: 'FAQPage' },
  { search: 'citation' },
  { search: 'petsMetrics' },
  { search: 'veterinary' },
];

if (dogToolFiles.length > 0) {
  const r = checkFiles('Dog Tool Pages', dogToolFiles, dogToolChecks);
  overallPass += r.pass;
  overallFail += r.fail;
}

// ── 猫咪工具页 ──
const catToolChecks = [
  { search: 'SoftwareApplication' },
  { search: 'FAQPage' },
  { search: 'citation' },
  { search: 'AAFP' },
  { search: 'petsMetrics' },
];

if (catToolFiles.length > 0) {
  const r = checkFiles('Cat Tool Pages', catToolFiles, catToolChecks);
  overallPass += r.pass;
  overallFail += r.fail;
}

// ── 跨物种差异化抽样 ──
console.log('\n── Cross-Species Differentiation (sample) ──');
const dogAgeHtml = dogToolFiles.find(f => f.includes('dog/age-calculator'));
const catAgeHtml = catToolFiles.find(f => f.includes('cat/age-calculator'));

if (dogAgeHtml && catAgeHtml) {
  const dogText = readHtml(dogAgeHtml);
  const catText = readHtml(catAgeHtml);

  const dogHasUCSD = dogText.includes('UCSD');
  const catNoUCSD  = !catText.includes('UCSD');
  const dogHasAAHA  = dogText.includes('AAHA');
  const catHasAAFP  = catText.includes('AAFP');

  console.log(`  ${dogHasUCSD ? '✅' : '❌'} Dog Age page references UCSD`);
  console.log(`  ${catNoUCSD ? '✅' : '❌'} Cat Age page does NOT reference UCSD (AAAA/AAFP instead)`);
  console.log(`  ${dogHasAAHA ? '✅' : '❌'} Dog Age page references AAHA`);
  console.log(`  ${catHasAAFP ? '✅' : '❌'} Cat Age page references AAFP`);
}

// ═══ SUMMARY ═══
console.log('');
console.log(`📊 GEO Checks: ${overallPass} PASS · ${overallFail} FAIL`);
if (overallFail > 0) {
  console.log('⚠️  Some GEO-required text is missing from HTML output.');
  process.exit(1);
} else {
  console.log('✅ All GEO checks passed.');
}
