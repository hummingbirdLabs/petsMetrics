# 技术方案: Comparison Pages ("vs" Matrix)

## 1. 文件结构变更

```
src/
├── app/[locale]/dog/compare/
│   ├── dry-food-vs-wet-food/
│   │   └── page.tsx
│   ├── raw-diet-vs-kibble/
│   │   └── page.tsx
│   ├── spayed-vs-unspayed/
│   │   └── page.tsx
├── app/[locale]/cat/compare/
│   └── indoor-vs-vs-outdoor/
│       └── page.tsx
├── lib/
│   └── seo/
│       └── compare-content.ts     # 对比页内容数据
├── components/shared/
│   └── CompareTable.tsx           # 对比表格组件（Server Component）
messages/
├── en.json                        # 追加 compare.* 键
└── zh.json                        # 追加 compare.* 键
```

## 2. 数据流设计

```
[SSG 构建时]
    ↓
compare-content.ts (静态内容数据)
    ↓
page.tsx Server Component (metadata + content render)
    ↓
JsonLdScript (Article + FAQPage + BreadcrumbList)
    ↓
静态 HTML（AI 爬虫 100% 可见）
```

## 3. 接口定义

```typescript
// lib/seo/compare-content.ts
export type ComparePageData = {
  slug: string;
  section: 'dog' | 'cat';
  title: string;              // H1
  subtitle: string;           // 引导段
  topicA: {
    name: string;
    pros: string[];
    cons: string[];
    bestFor: string;
  };
  topicB: {
    name: string;
    pros: string[];
    cons: string[];
    bestFor: string;
  };
  comparisonRows: {
    dimension: string;
    topicA: string;
    topicB: string;
  }[];
  verdict: string;             // Paragraph Snippet 候选
  faq: { question: string; answer: string }[];
  citations: CitationRef[];
  relatedTools: { href: string; label: string }[];
};
```

## 4. SEO Schema 设计

```typescript
// 每个对比页 JSON-LD
const jsonLd = graphJsonLd(
  articleSchema,        // @type: Article (headline, author, datePublished, citation)
  faqPageSchema,        // @type: FAQPage (mainEntity[])
  breadcrumbSchema,     // @type: BreadcrumbList
)
```

## 5. 国际化键设计

```json
{
  "compare": {
    "dryVsWet": { ... },
    "indoorVsOutdoor": { ... },
    "rawVsKibble": { ... },
    "spayedVsUnspayed": { ... }
  }
}
```

由于对比页文章段落较长，采用混合策略：
- **标题、标签、按钮文本** → i18n 消息键（SEO 需要多语言）
- **正文段落** → 放在此页面的 `compare-content.ts` 中（静态内容，ssg 渲染）

## 6. 实施步骤

1. 创建 `lib/seo/compare-content.ts` 数据文件
2. 创建 `components/shared/CompareTable.tsx` 组件
3. 创建 4 个 `page.tsx` 文件
4. 更新 `messages/en.json` 和 `messages/zh.json`
5. 验证构建

## 7. 共享组件

### CompareTable (Server Component)

```tsx
type CompareTableProps = {
  topicAName: string;
  topicBName: string;
  rows: { dimension: string; topicA: string; topicB: string }[];
  section: 'dog' | 'cat';
};
```

渲染为响应式表格（移动端折叠为卡片）。

### ComparePageLayout

对比页不继承 layout.tsx 中的 SidebarLayout，使用简化的全宽布局：
- max-w-4xl 居中
- 更大的阅读宽度（适合长文章）
- 右侧无侧边栏

## 8. sitemap 处理

对比页为静态路由（无 `generateStaticParams`），需要手动在 `sitemap.ts` 中添加条目（仅在 `getAllToolRoutes()` 中追加即可复用工具页逻辑）。

## 9. 实施文件清单

| 文件 | 类型 | 状态 |
|------|------|------|
| `lib/seo/compare-content.ts` | 新建 | ⬜ |
| `components/shared/CompareTable.tsx` | 新建 | ⬜ |
| `app/[locale]/dog/compare/dry-food-vs-wet-food/page.tsx` | 新建 | ⬜ |
| `app/[locale]/dog/compare/raw-diet-vs-kibble/page.tsx` | 新建 | ⬜ |
| `app/[locale]/dog/compare/spayed-vs-unspayed/page.tsx` | 新建 | ⬜ |
| `app/[locale]/cat/compare/indoor-vs-outdoor/page.tsx` | 新建 | ⬜ |
| `messages/en.json` | 修改 | ⬜ |
| `messages/zh.json` | 修改 | ⬜ |
| `lib/data/routes.ts` | 修改 | ⬜ |
