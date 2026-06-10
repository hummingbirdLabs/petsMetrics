#!/usr/bin/env node
/**
 * check-eu-uniqueness.mjs — EU 国家页独特内容审计
 * （seo-programmatic-aicode.md TASK-R2）
 *
 * 运行方式: node scripts/check-eu-uniqueness.mjs
 * 前提: 已运行 `pnpm build`
 *
 * 统计每个 EU 国家页的独特字段字数，决定"建页"还是"合并"。
 * Batch 1 要求 200 字，Batch 2 要求 150 字，Batch 3 仅当 ≥ 150 字才建页。
 */

import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = resolve(__dirname, '..', 'src');

// 读取 EU 旅行规则数据
const euDataPath = resolve(SRC, 'lib/data/eu-travel-rules.ts');
let euFileContent = '';

try {
  euFileContent = readFileSync(euDataPath, 'utf-8');
} catch {
  console.log('❌ Cannot find src/lib/data/eu-travel-rules.ts');
  process.exit(0);
}

// 解析国家定义，提取 additionalInfo 和 specialRequirements
const countryPattern = /code:\s*'(\w+)'[\s\S]*?countryName:\s*'([^']+)'[\s\S]*?(?:additionalInfo:\s*'([^']*)')?[\s\S]*?(?:specialRequirements:\s*'([^']*)')?/g;

/** 简单 HTML 标签剥离 */
function stripTags(s) {
  return s ? s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() : '';
}

/** 有效单词数（英文） */
function wordCount(s) {
  return s ? s.split(/\s+/).filter(w => w.length > 1).length : 0;
}

// 国家分类
const BATCH1 = ['FR', 'DE', 'IT', 'ES', 'NL', 'GB', 'BE', 'AT', 'PT', 'SE', 'DK', 'IE'];
const BATCH2 = ['FI', 'PL', 'HU', 'CZ', 'RO', 'GR', 'BG', 'HR', 'SK', 'SI'];
const BATCH3 = ['MT', 'CY', 'LU', 'LV', 'LT'];

console.log('\n🔍 EU Country Page Uniqueness Audit\n');

let match;
const countries = [];

while ((match = countryPattern.exec(euFileContent)) !== null) {
  const [, code, name, additionalInfo = '', specialRequirements = ''] = match;
  const uniqueText = [stripTags(additionalInfo), stripTags(specialRequirements)]
    .filter(Boolean)
    .join(' ');
  const wc = wordCount(uniqueText);

  let batch;
  if (BATCH1.includes(code)) batch = 1;
  else if (BATCH2.includes(code)) batch = 2;
  else if (BATCH3.includes(code)) batch = 3;
  else continue;

  countries.push({ code, name, batch, wordCount: wc });
}

for (const batch of [1, 2, 3]) {
  const items = countries.filter(c => c.batch === batch);
  if (items.length === 0) continue;

  const minWords = batch === 1 ? 200 : 150;
  console.log(`\n── Batch ${batch} (${items.length} countries, min ${minWords} words) ──`);

  let passCount = 0;
  let failCount = 0;

  for (const c of items) {
    if (batch === 3 && c.wordCount < 150) {
      console.log(`  ⚠️  ${c.code} (${c.name}): ${c.wordCount} words — MERGE, do not create dedicated page`);
      failCount++;
    } else if (c.wordCount < minWords) {
      console.log(`  ❌ ${c.code} (${c.name}): ${c.wordCount}/${minWords} words`);
      failCount++;
    } else {
      console.log(`  ✅ ${c.code} (${c.name}): ${c.wordCount} words`);
      passCount++;
    }
  }

  if (failCount > 0) {
    console.log(`\n  📊 Batch ${batch}: ${passCount} pass · ${failCount} fail`);
    if (batch === 3) {
      console.log('  ℹ️  Batch 3 failures → those countries should be merged into main EU page sections, not dedicated URLs.');
    }
  } else {
    console.log(`  📊 Batch ${batch}: all ${passCount} pass`);
  }
}

console.log('\n✅ EU uniqueness audit complete.');
