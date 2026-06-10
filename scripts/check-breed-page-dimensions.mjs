#!/usr/bin/env node
/**
 * check-breed-page-dimensions.mjs — 品种页维度安全锁验证
 * （seo-programmatic-aicode.md TASK-R4）
 *
 * 运行方式: node scripts/check-breed-page-dimensions.mjs
 *
 * 扫描 src/app/dog/breeds/ 和 src/app/cat/breeds/ 目录，
 * 检查是否不允许建独立品种页的维度文件夹存在。
 */

import { existsSync, readdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = resolve(__dirname, '..', 'src');

const FORBIDDEN = ['age-calculator', 'vaccination', 'growth-predictor'];
const BREED_ROOTS = ['src/app/dog/breeds', 'src/app/cat/breeds'];

console.log('\n🔍 Breed Page Dimension Safety Check\n');

let passCount = 0;
let failCount = 0;

for (const rootRel of BREED_ROOTS) {
  const root = resolve(SRC, '..', rootRel);
  if (!existsSync(root)) {
    console.log(`  ℹ️  ${rootRel}/ not created yet — skip.`);
    continue;
  }

  try {
    const entries = readdirSync(root, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;

      // Check both: breed folders and dimension folders inside breeds
      const subPath = resolve(root, entry.name);
      try {
        const subEntries = readdirSync(subPath, { withFileTypes: true });
        for (const sub of subEntries) {
          if (sub.isDirectory() && FORBIDDEN.includes(sub.name)) {
            console.log(`  ❌ ${rootRel}/${entry.name}/${sub.name}/ — FORBIDDEN dimension`);
            failCount++;
          }
        }
      } catch {}

      // Also check if breed folder itself is a forbidden dimension
      if (FORBIDDEN.includes(entry.name)) {
        console.log(`  ❌ ${rootRel}/${entry.name}/ — FORBIDDEN dimension at breed root`);
        failCount++;
      }
    }
  } catch {}
}

// 检查 breed-page-config.ts 存在
const configPath = resolve(SRC, 'constants/breed-page-config.ts');
if (!existsSync(configPath)) {
  console.log('  ❌ src/constants/breed-page-config.ts not found');
  failCount++;
} else {
  console.log('  ✅ src/constants/breed-page-config.ts exists');
  passCount++;
}

console.log('');
if (failCount > 0) {
  console.log(`📊 ${passCount} PASS · ${failCount} FAIL`);
  console.log('⚠️  Forbidden breed page dimensions detected. Remove before publishing.');
  process.exit(1);
} else {
  console.log(`📊 ${passCount} PASS · 0 FAIL`);
  console.log('✅ All breed page dimensions safe.');
}
