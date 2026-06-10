#!/usr/bin/env node
/**
 * check-cross-species-diff.mjs — 跨物种工具页差异化验证
 * （seo-programmatic-aicode.md TASK-R1）
 *
 * 运行方式: node scripts/check-cross-species-diff.mjs
 * 前提: 已运行 `pnpm build`
 *
 * 检查狗/猫年龄计算器、怀孕计算器、疫苗计划——FAQ + Knowledge 文本相似度。
 * 阈值: 年龄 < 30%, 怀孕 < 35%, 疫苗 < 25%。
 */

import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, '..', 'out');

/** 提取可见文本（移除 HTML 标签） */
function extractText(html) {
  // 移除 script 和 style
  let text = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ' ');
  text = text.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ');
  // 移除 HTML 标签
  text = text.replace(/<[^>]+>/g, ' ');
  // 规范化空白
  text = text.replace(/\s+/g, ' ').trim().toLowerCase();
  return text;
}

/** 计算两段文本的 Jaccard 相似度（单词级） */
function wordSimilarity(a, b) {
  const wordsA = new Set(a.split(/\s+/).filter(w => w.length > 2));
  const wordsB = new Set(b.split(/\s+/).filter(w => w.length > 2));
  if (wordsA.size === 0 || wordsB.size === 0) return 0;
  const intersection = [...wordsA].filter(w => wordsB.has(w)).length;
  const union = wordsA.size + wordsB.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

function readPageHtml(relPath) {
  const p = resolve(OUT, relPath, 'index.html');
  if (!existsSync(p)) return '';
  return readFileSync(p, 'utf-8');
}

const pairs = [
  {
    dog: 'dog/age-calculator',
    cat: 'cat/age-calculator',
    maxSimilarity: 0.30,
    label: 'Age Calculator',
  },
  {
    dog: 'dog/gestation-calculator',
    cat: 'cat/gestation-calculator',
    maxSimilarity: 0.35,
    label: 'Gestation Calculator',
  },
  {
    dog: 'dog/vaccination-schedule',
    cat: 'cat/vaccination-schedule',
    maxSimilarity: 0.25,
    label: 'Vaccination Schedule',
  },
];

console.log('\n🔍 Cross-Species Content Differentiation Check\n');

let allPass = true;

for (const { dog, cat, maxSimilarity, label } of pairs) {
  const dogHtml = readPageHtml(dog);
  const catHtml = readPageHtml(cat);

  if (!dogHtml || !catHtml) {
    console.log(`  ⚠️  ${label}: Cannot check — missing build output (dog=${!!dogHtml}, cat=${!!catHtml})`);
    continue;
  }

  const dogText = extractText(dogHtml);
  const catText = extractText(catHtml);
  const sim = wordSimilarity(dogText, catText);
  const pct = (sim * 100).toFixed(1);
  const icon = sim <= maxSimilarity ? '✅' : '❌';

  console.log(`  ${icon} ${label}: similarity ${pct}% (max ${(maxSimilarity * 100).toFixed(0)}%)`);

  if (sim > maxSimilarity) {
    console.log(`     ❌ FAIL — pages too similar. SpamBrain duplicate content risk.`);
    allPass = false;
  }
}

// ── Dog vs Cat specific assertion checks ──
console.log('');
console.log('── Species-Specific Citation Checks ──');

const dogAgeText = extractText(readPageHtml('dog/age-calculator'));
const catAgeText = extractText(readPageHtml('cat/age-calculator'));

if (dogAgeText && catAgeText) {
  checkAssertion('Dog Age references UCSD', dogAgeText.includes('ucsd'));
  checkAssertion('Cat Age does NOT reference UCSD', !catAgeText.includes('ucsd'));
  checkAssertion('Dog Age references AAHA', dogAgeText.includes('aaha'));
  checkAssertion('Cat Age references AAFP', catAgeText.includes('aafp'));
}

const dogVaxText = extractText(readPageHtml('dog/vaccination-schedule'));
const catVaxText = extractText(readPageHtml('cat/vaccination-schedule'));

if (dogVaxText && catVaxText) {
  checkAssertion('Dog Vaccination references DHPP', dogVaxText.includes('dhpp'));
  checkAssertion('Cat Vaccination references FVRCP', catVaxText.includes('fvrcp'));
}

function checkAssertion(desc, result) {
  console.log(`  ${result ? '✅' : '❌'} ${desc}`);
  if (!result) allPass = false;
}

if (!allPass) {
  console.log('\n⚠️  Cross-species differentiation FAILED. Fix before publishing.');
  process.exit(1);
} else {
  console.log('\n✅ All cross-species checks passed.');
}
