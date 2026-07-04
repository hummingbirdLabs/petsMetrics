/**
 * compare-data.ts — 对比页结构化数据获取
 * 解决 t.raw() 在多语言环境下嵌套对象序列化失败的问题。
 * 直接在 Server Component 里从 i18n messages 读取完整对象，
 * 以强类型方式暴露给页面。
 *
 * 优先读取当前 locale 的翻译，缺失时回退到英文（通过 enMessages 深度合并）。
 */
import type { ComparePageData } from '@/components/shared/ComparePage';

type CompareKey =
  | 'dryVsWet'
  | 'rawVsKibble'
  | 'spayedVsUnspayed'
  | 'indoorVsOutdoor'
  | 'dogYearsVsCatYears'
  | 'petInsuranceVsSavings'
  | 'microchipVsTattoo'
  | 'adoptVsBuy'
  | 'grainFreeVsGrainInclusive'
  | 'cannedVsFrozen'
  | 'catWetVsDry'
  | 'declawingVsScratchingPost';

const cache: Record<string, ComparePageData | undefined> = {};

// 深合并 compare 命名空间：locale 有翻译的优先，缺失的用英文
function mergeCompare(
  enCompare: Record<string, any>,
  localeCompare?: Record<string, any>,
): Record<string, any> {
  if (!localeCompare) return enCompare;
  const result: Record<string, any> = { ...enCompare };
  for (const key of Object.keys(localeCompare)) {
    if (Array.isArray(localeCompare[key]) && Array.isArray(enCompare[key])) {
      // 数组（faq / rows 等）：locale 元素数量与英文相同时视为已翻译
      result[key] =
        localeCompare[key].length === enCompare[key].length
          ? localeCompare[key]
          : enCompare[key];
    } else if (
      typeof localeCompare[key] === 'object' &&
      typeof enCompare[key] === 'object'
    ) {
      result[key] = { ...enCompare[key], ...localeCompare[key] };
    } else if (typeof localeCompare[key] === 'string' && localeCompare[key] !== '') {
      result[key] = localeCompare[key];
    }
  }
  return result;
}

// Shape of raw JSON data, used internally for casting
type RawCompareFaq = { question: string; answer: string };

/**
 * 根据 pageKey 读取 compare 命名空间下的结构化数据。
 * 传入 locale 以支持多语言回退。
 */
export async function getCompareData(
  pageKey: CompareKey,
  locale: string,
): Promise<ComparePageData> {
  const cacheKey = `${locale}:${pageKey}`;
  if (cache[cacheKey]) return cache[cacheKey]!;
  const enMessages = (await import(`../../../messages/en.json`)).default;
  const enCompare = (enMessages as any).compare;

  let localeCompare: Record<string, any> | undefined;
  if (locale !== 'en') {
    try {
      const localeMessages = (await import(`../../../messages/${locale}.json`)).default;
      localeCompare = (localeMessages as any).compare;
    } catch {
      // locale 文件不存在或没有 compare 命名空间 → 使用英文
    }
  } else {
    localeCompare = enCompare;
  }

  const merged = mergeCompare(enCompare, localeCompare);
  const raw = merged[pageKey];
  const data: ComparePageData = {
    ...raw,
    faq: (raw.faq as RawCompareFaq[]).map((item) => ({ ...item })),
  };
  cache[cacheKey] = data;
  return data;
}
