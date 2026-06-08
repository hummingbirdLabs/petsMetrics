// Phase 4 — T4.9: 毒性检索计算器
// 多级匹配: 精确 → 前缀 → 子串 → Levenshtein模糊
// 纯内存操作, 不依赖外部库

import type { Result } from '@/types/common.types';
import type { ToxicItem } from '@/lib/data/toxic-items';
import { TOXIC_ITEMS } from '@/lib/data/toxic-items';

export type ToxicSearchInput = {
  query: string;
  species: 'dog' | 'cat';
};

export type ToxicSearchResult = {
  items: ToxicItem[];
  exactMatch: ToxicItem | null;
};

const FUZZY_MAX_DISTANCE = 2;

function levenshteinDistance(a: string, b: string): number {
  const aLen = a.length;
  const bLen = b.length;

  if (aLen === 0) return bLen;
  if (bLen === 0) return aLen;

  let prevRow = new Array<number>(bLen + 1);
  let currRow = new Array<number>(bLen + 1);

  for (let j = 0; j <= bLen; j++) {
    prevRow[j] = j;
  }

  for (let i = 1; i <= aLen; i++) {
    currRow[0] = i;
    for (let j = 1; j <= bLen; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      currRow[j] = Math.min(
        prevRow[j] + 1,
        currRow[j - 1] + 1,
        prevRow[j - 1] + cost
      );
    }
    [prevRow, currRow] = [currRow, prevRow];
  }

  return prevRow[bLen];
}

function lowerQuery(query: string): string {
  return query.toLowerCase().trim();
}

function itemMatchesSpecies(item: ToxicItem, species: 'dog' | 'cat'): boolean {
  return item.species === 'both' || item.species === species;
}

// 检查 query 是否与 item 的 name 或任意 alias 匹配
type MatchResult = 'exact' | 'prefix' | 'substring' | null;

function matchItem(item: ToxicItem, queryLower: string): MatchResult {
  const targets = [item.name, ...item.aliases].map(t => t.toLowerCase());

  // Level 1: 精确匹配
  for (const target of targets) {
    if (target === queryLower) return 'exact';
  }

  // Level 2: 前缀匹配
  for (const target of targets) {
    if (target.startsWith(queryLower)) return 'prefix';
  }

  // Level 3: 子串匹配
  for (const target of targets) {
    if (target.includes(queryLower)) return 'substring';
  }

  return null;
}

// Level 4: 模糊匹配
function fuzzyMatch(item: ToxicItem, queryLower: string): boolean {
  const nameLower = item.name.toLowerCase();

  if (levenshteinDistance(queryLower, nameLower) <= FUZZY_MAX_DISTANCE) return true;

  for (const alias of item.aliases) {
    if (levenshteinDistance(queryLower, alias.toLowerCase()) <= FUZZY_MAX_DISTANCE) return true;
  }

  return false;
}

export function searchToxicItems(input: ToxicSearchInput): Result<ToxicSearchResult> {
  const { query, species } = input;
  const queryLower = lowerQuery(query);

  if (!queryLower) {
    return { ok: false, error: { code: 'EMPTY_QUERY', details: 'Search query cannot be empty' } };
  }

  // 收集所有匹配项
  const exactMatches: ToxicItem[] = [];
  const prefixMatches: ToxicItem[] = [];
  const substringMatches: ToxicItem[] = [];
  const fuzzyMatches: ToxicItem[] = [];

  for (const item of TOXIC_ITEMS) {
    if (!itemMatchesSpecies(item, species)) continue;

    const matchType = matchItem(item, queryLower);
    if (matchType === 'exact') {
      exactMatches.push(item);
    } else if (matchType === 'prefix') {
      prefixMatches.push(item);
    } else if (matchType === 'substring') {
      substringMatches.push(item);
    }
  }

  // 仅当前三步无结果时启用模糊匹配
  let allItems: ToxicItem[];
  if (exactMatches.length === 0 && prefixMatches.length === 0 && substringMatches.length === 0) {
    for (const item of TOXIC_ITEMS) {
      if (!itemMatchesSpecies(item, species)) continue;
      if (fuzzyMatch(item, queryLower)) {
        fuzzyMatches.push(item);
      }
    }
    allItems = fuzzyMatches;
  } else {
    allItems = [...exactMatches, ...prefixMatches, ...substringMatches];
  }

  // 去重（同一个 item 可能被多个级别匹配到）
  const seen = new Set<string>();
  const uniqueItems: ToxicItem[] = [];
  for (const item of allItems) {
    if (!seen.has(item.slug)) {
      seen.add(item.slug);
      uniqueItems.push(item);
    }
  }

  const exactMatch = exactMatches.length > 0 ? exactMatches[0] : null;

  return {
    ok: true,
    data: { items: uniqueItems, exactMatch },
  };
}
