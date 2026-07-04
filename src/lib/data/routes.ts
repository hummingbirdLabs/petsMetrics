// Phase 3 — T3.5: 路由数据
// 供 sitemap.ts 使用

import { EU_COUNTRY_CODES } from '@/lib/data/eu-travel-rules';

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
    // Phase 2: Life Stage Checklists
    'dog/guide/new-puppy-checklist',
    'dog/guide/senior-dog-care',
    'dog/guide/adopting-rescue-dog',
    'dog/guide/puppy-development-stages',
    'cat/guide/new-kitten-checklist',
    'cat/guide/senior-cat-care',
    // Comparison pages (P0)
    'dog/compare/dry-food-vs-wet-food',
    'cat/compare/indoor-vs-outdoor',
    'dog/compare/raw-diet-vs-kibble',
    'dog/compare/spayed-vs-unspayed',
    'shared/compare/dog-years-vs-cat-years',
    'shared/compare/pet-insurance-vs-savings',
    'shared/compare/microchip-vs-tattoo',
    'shared/compare/adopt-vs-buy',
    'dog/compare/grain-free-vs-grain-inclusive',
    'dog/compare/canned-vs-frozen-food',
    'cat/compare/wet-food-vs-dry-food',
    'cat/compare/declawing-vs-scratching-post',
    // Emergency pages - Dog (18 items)
    'dog/emergency/ate-chocolate',
    'dog/emergency/ate-grapes',
    'dog/emergency/ate-xylitol',
    'dog/emergency/ate-xylitol-gum',
    'dog/emergency/ate-onion',
    'dog/emergency/ate-sock',
    'dog/emergency/ate-antifreeze',
    'dog/emergency/ate-marijuana',
    'dog/emergency/ate-rodenticide',
    'dog/emergency/ate-alcohol',
    'dog/emergency/ate-avocado',
    'dog/emergency/ate-caffeine',
    'dog/emergency/ate-macadamia-nuts',
    'dog/emergency/ate-medication',
    'dog/emergency/ate-plastic',
    'dog/emergency/ate-cooked-bones',
    'dog/emergency/ate-mushrooms',
    'dog/emergency/ate-tobacco',
    // Emergency pages - Cat (7 items)
    'cat/emergency/ate-lily',
    'cat/emergency/ate-string',
    'cat/emergency/ate-fishing-line',
    'cat/emergency/ate-essential-oils',
    'cat/emergency/ate-garlic',
    'cat/emergency/ate-onion',
    'cat/emergency/ate-chocolate',
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
