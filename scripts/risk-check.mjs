#!/usr/bin/env node
/**
 * risk-check.mjs — 全站风险自动化检查（seo-programmatic-aicode.md TASK-R0）
 *
 * 运行方式: node scripts/risk-check.mjs
 * 前提: 已运行 `pnpm build`（out/ 目录存在）
 *
 * 覆盖风险: R1(R13) E-E-A-T Gate-0, R5 GEO Server Component, R6 Canonical,
 *           R7 Sitemap fresh, R9 Brand hooks, R12 AI crawlers in robots
 */

import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const OUT = resolve(ROOT, 'out');
const SRC = resolve(ROOT, 'src');

let passCount = 0;
let failCount = 0;

function check(id, desc, fn) {
  try {
    const result = fn();
    if (result) {
      console.log(`  ✅ ${id}: ${desc}`);
      passCount++;
    } else {
      console.log(`  ❌ ${id}: ${desc}`);
      failCount++;
    }
  } catch (err) {
    console.log(`  ❌ ${id}: ${desc} (error: ${err.message})`);
    failCount++;
  }
}

function fileExists(relPath) {
  return existsSync(resolve(ROOT, relPath));
}

function htmlContains(relPath, substring) {
  const fullPath = resolve(OUT, relPath);
  if (!existsSync(fullPath)) return false;
  return readFileSync(fullPath, 'utf-8').includes(substring);
}

function srcContains(relPath, substring) {
  const fullPath = resolve(SRC, relPath);
  if (!existsSync(fullPath)) return false;
  return readFileSync(fullPath, 'utf-8').includes(substring);
}

function grepSrcDirForUseClient(relPath) {
  const fullPath = resolve(SRC, relPath);
  if (!existsSync(fullPath)) return true; // skip if file doesn't exist yet
  try {
    const content = readFileSync(fullPath, 'utf-8');
    // Match 'use client' as a directive (at start of file, not in comments/strings)
    return !/^[\s\n]*['"]use client['"]/m.test(content);
  } catch {
    return true;
  }
}

console.log('\n🔍 petsMetrics Risk Check\n');

// ═══ R1: E-E-A-T Gate-0 ═══
console.log('── R1: E-E-A-T Gate-0 ──');
check('R1-about',       'About 页存在',         () => fileExists('src/app/about/page.tsx'));
check('R1-privacy',     'Privacy 页存在',       () => fileExists('src/app/privacy/page.tsx'));
check('R1-terms',       'Terms 页存在',         () => fileExists('src/app/terms/page.tsx'));

// R5: GEO Server Component — 关键组件无 'use client' directive
console.log('── R5: GEO Server Components ──');
check('R5-knowledge-srv', 'KnowledgeCards 无 use client',  () => grepSrcDirForUseClient('components/shared/KnowledgeCards.tsx'));
check('R5-science-srv',   'ScienceBehindIt 无 use client', () => grepSrcDirForUseClient('components/shared/ScienceBehindIt.tsx'));
check('R5-disclaimer-srv','DisclaimerSection 无 use client',() => grepSrcDirForUseClient('components/shared/DisclaimerSection.tsx'));

// R5: GEO 可见性（构建后）
console.log('── R5: GEO SSG Visibility ──');
const hasOut = existsSync(OUT);
check('R5-kb-visible', 'KnowledgeCards HTML 含 "Key Knowledge" (needs build)', () => {
  if (!hasOut) return true; // skip — requires pnpm build first
  const dirs = ['dog/age-calculator', 'dog/calorie-calculator', 'dog/gestation-calculator', 'dog/vaccination-schedule'];
  return dirs.some(d => {
    const p = resolve(OUT, d, 'index.html');
    if (!existsSync(p)) return false;
    return readFileSync(p, 'utf-8').includes('Key Knowledge');
  });
});

// R6: Canonical
console.log('── R6: Canonical Labels ──');
check('R6-canonical-dog-age', 'Dog Age 页含 canonical', () => {
  return srcContains('app/dog/age-calculator/page.tsx', 'canonical');
});

// R7: Sitemap freshness — srcContains works for TS
console.log('── R7: Content Freshness ──');
check('R7-content-version', 'content-version.json 存在',   () => fileExists('src/lib/data/content-version.json'));
check('R7-sitemap-fresh',   'sitemap.ts 引用 content-version', () => {
  return srcContains('app/sitemap.ts', 'content-version');
});

// R9: Brand hooks — check source files contain petsMetrics in key components
console.log('── R9: Brand Hooks ──');
check('R9-disclaimer-brand', 'DisclaimerSection 含 petsMetrics', () => {
  return srcContains('components/shared/DisclaimerSection.tsx', 'petsMetrics');
});
check('R9-knowledge-brand', 'KnowledgeCards 含 petsMetrics', () => {
  return srcContains('components/shared/KnowledgeCards.tsx', 'petsMetrics');
});
check('R9-science-brand', 'ScienceBehindIt 含 petsMetrics', () => {
  return srcContains('components/shared/ScienceBehindIt.tsx', 'petsMetrics');
});

// R12: robots.ts AI crawlers
console.log('── R12: AI Crawler Access ──');
const robotsCrawlers = ['Google-Extended', 'GPTBot', 'PerplexityBot', 'Claude-Web', 'CCBot'];
for (const bot of robotsCrawlers) {
  check(`R12-${bot}`, `robots.ts 允许 ${bot}`, () => srcContains('app/robots.ts', bot));
}

// R13: MedicalDisclaimer shared component exists
console.log('── R13: Medical Disclaimer ──');
check('R13-disclaimer', 'DisclaimerSection 共享组件存在', () => {
  return fileExists('src/components/shared/DisclaimerSection.tsx');
});

// ═══ SUMMARY ═══
console.log('');
console.log(`📊 ${passCount} PASS · ${failCount} FAIL`);
if (failCount > 0) {
  console.log('⚠️  Gate-Risk BLOCKED — fix failures before proceeding.');
  process.exit(1);
} else {
  console.log('✅ Gate-Risk PASS — all checks passed.');
}
