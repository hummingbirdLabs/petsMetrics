/**
 * 内容新鲜度引擎（seo-programmatic-aicode.md TASK-A3）
 *
 * 用途:
 * - sitemap.ts: 毒性页 lastModified = toxicDb.updatedAt（非 new Date()）
 * - 工具页 lastModified = toolMethodology.updatedAt
 * - EU 国家页 lastModified = euTravelRules.updatedAt
 * - KnowledgeCards: "Last reviewed: {toxicDb.updatedAt}"
 *
 * 每次数据更新时修改 content-version.json 中对应的 updatedAt 字段，
 * 而不是用 new Date() 制造"假新鲜度"。
 */

import cv from './content-version.json';

export type ContentVersion = {
  toxicDb: { version: string; updatedAt: string; source: string; notes: string };
  toolMethodology: { version: string; updatedAt: string; sources: string[] };
  euTravelRules: { version: string; updatedAt: string; source: string };
};

export function getContentVersion(): ContentVersion {
  return cv as ContentVersion;
}

/** 毒性数据库最近核验日期 — 用于毒性落地页 sitemap lastModified */
export function getToxicDbUpdatedDate(): Date {
  return new Date(cv.toxicDb.updatedAt);
}

/** 工具方法论最近更新日期 — 用于工具页 sitemap lastModified */
export function getToolMethodologyUpdatedDate(): Date {
  return new Date(cv.toolMethodology.updatedAt);
}

/** EU 旅行规则最近更新日期 — 用于 EU 国家页 sitemap lastModified */
export function getEUTravelRulesUpdatedDate(): Date {
  return new Date(cv.euTravelRules.updatedAt);
}

/** 用于 KnowledgeCards 和其他 SSG 组件的"最后核验"年份文本 */
export function getToxicDbReviewYear(): string {
  return cv.toxicDb.updatedAt.slice(0, 4);
}
