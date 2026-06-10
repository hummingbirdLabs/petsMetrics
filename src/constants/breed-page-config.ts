/**
 * 品种页维度安全锁（seo-programmatic-aicode.md TASK-R4）
 *
 * 仅允许三个维度建独立品种页（喂食指南、体重标准、健康风险）。
 * 禁止为年龄换算、疫苗计划（公式相同维度）建独立品种页。
 */

/** 安全维度 — 只有这 3 个维度允许建独立品种页 */
export const ALLOWED_BREED_PAGE_DIMENSIONS = [
  'feeding-guide',   // ✅ 每个品种体重不同，喂食量真实不同
  'weight-chart',    // ✅ AKC/TICA 品种标准中有独立体重范围数据
  'health-issues',   // ✅ 每个品种有遗传病倾向（不同数据）
] as const;

/** 禁止维度 — 这些维度对所有品种公式相同，建独立页 = SpamBrain 判定 Doorway Pages */
export const FORBIDDEN_BREED_PAGE_DIMENSIONS = [
  'age-calculator',   // ❌ UCSD 公式对所有品种相同
  'vaccination',      // ❌ 疫苗时间线对所有品种完全相同
  'growth-predictor', // ❌ 仅按体型分 5 组（toy/small/medium/large/giant）
] as const;

export type AllowedBreedDimension = (typeof ALLOWED_BREED_PAGE_DIMENSIONS)[number];
export type ForbiddenBreedDimension = (typeof FORBIDDEN_BREED_PAGE_DIMENSIONS)[number];
