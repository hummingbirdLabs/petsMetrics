// Phase 3 — T3.5 + Phase 7d: 路由数据
// 供 sitemap.ts 和 generateStaticParams 使用

import { EU_COUNTRY_CODES } from '@/lib/data/eu-travel-rules';
import { TOXIC_ITEMS } from '@/lib/data/toxic-items';

/** 高频非 EU 出发地 */
const NON_EU_ORIGINS = ['US', 'CA', 'AU'] as const;

export function getAllToolRoutes(): string[] {
  return [
    'dog/age-calculator',
    'dog/calorie-calculator',
    'dog/puppy-growth-predictor',
    'dog/gestation-calculator',
    'dog/vaccination-schedule',
    'cat/age-calculator',
    'cat/bcs-weight-tracker',
    'cat/hydration-calculator',
    'cat/gestation-calculator',
    'cat/vaccination-schedule',
    'shared/toxic-checker',
    'shared/eu-pet-travel-checker',
    'shared/barf-calculator',
    'shared/pet-insurance-estimator',
    'profile',
  ];
}

export function getAllStaticPaths(): string[] {
  return [
    'dog',
    'cat',
    'shared',
    'profile',
  ];
}

export function getAllEUTravelRoutes(): { origin: string; destination: string }[] {
  const pairs: { origin: string; destination: string }[] = [];
  const seen = new Set<string>();

  const add = (origin: string, dest: string) => {
    if (origin === dest) return;
    const key = `${origin}→${dest}`;
    if (seen.has(key)) return;
    seen.add(key);
    pairs.push({ origin, destination: dest });
  };

  // 1. 高频入境：US/CA/AU → GB/DE/FR/ES/IT/NL （6 destinations × 3 origins = 18）
  const topDestinations = ['GB', 'DE', 'FR', 'ES', 'IT', 'NL'];
  for (const origin of NON_EU_ORIGINS) {
    for (const dest of topDestinations) {
      add(origin, dest);
    }
  }

  // 2. 跨境高频：GB ↔ FR/DE/ES/IE/NL （10 pairs）
  const crossChannel = ['FR', 'DE', 'ES', 'IE', 'NL'];
  for (const dest of crossChannel) {
    add('GB', dest);
    add(dest, 'GB');
  }

  // 3. 北欧特殊区绦虫国家配对（SEO 价值）
  const nordicNeighbors: Record<string, string[]> = {
    FI: ['SE', 'NO', 'DK'],
    IE: ['GB', 'FR'],
    MT: ['IT', 'ES'],
    NO: ['SE', 'DK', 'FI'],
  };
  for (const [country, neighbors] of Object.entries(nordicNeighbors)) {
    for (const neighbor of neighbors) {
      add(country, neighbor);
      if (NON_EU_ORIGINS.includes(neighbor as typeof NON_EU_ORIGINS[number])) continue;
      add(neighbor, country);
    }
  }

  // 4. 补全剩余 EU 国家：确保每个成员国至少出现一次
  const covered = new Set<string>();
  for (const p of pairs) {
    covered.add(p.origin);
    covered.add(p.destination);
  }

  // 剩余未覆盖的国家，与最近的主流目的地配对
  const remaining = EU_COUNTRY_CODES.filter((c) => !covered.has(c));
  const defaultDestinations = ['DE', 'FR', 'IT', 'ES', 'NL', 'GB'];
  for (let i = 0; i < remaining.length; i++) {
    const origin = remaining[i];
    // 循环使用默认目的地避免过度重复同一目的地
    const dest = defaultDestinations[i % defaultDestinations.length];
    if (origin !== dest) {
      add(origin, dest);
    } else {
      add(origin, defaultDestinations[(i + 1) % defaultDestinations.length]);
    }
  }

  return pairs;
}

/**
 * Phase 7d — 返回所有毒性落地页 slug（犬类 + 猫类各一组）
 * 用于 sitemap.ts 收录和 generateStaticParams 交叉验证
 */
export function getAllToxicSlugs(): { species: 'dog' | 'cat'; slug: string }[] {
  const result: { species: 'dog' | 'cat'; slug: string }[] = [];
  for (const item of TOXIC_ITEMS) {
    if (item.species === 'dog' || item.species === 'both')
      result.push({ species: 'dog', slug: item.slug });
    if (item.species === 'cat' || item.species === 'both')
      result.push({ species: 'cat', slug: item.slug });
  }
  return result;
}
