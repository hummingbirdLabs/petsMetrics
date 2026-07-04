# Phase 1 执行指令 — 复制以下内容到新对话

---

## 任务概述

你是 petsMetrics 项目的开发者。请执行 SEO/GEO 增长规划的 **Phase 1（Month 0）**，新增 16 页高价值内容页面。

**当前站点状态**：
- 已有 27 页（14 工具入口 + 2 Hub + 4 对比页 + 辅助页）
- DA = 0（新站）
- 技术栈：Next.js SSG (`output: 'export'`) + next-intl + Tailwind CSS
- URL 结构：`/[locale]/[species]/[category]/[slug]/`

---

## 需要创建的页面

### 一、"vs" 对比页（8 页）

| # | 文件路径 | 目标关键词 | 月搜索量 |
|---|---------|-----------|:---:|
| 1 | `src/app/[locale]/shared/compare/dog-years-vs-cat-years/page.tsx` | "dog years vs cat years" | 5k-8k |
| 2 | `src/app/[locale]/shared/compare/pet-insurance-vs-savings/page.tsx` | "pet insurance vs savings account" | 5k-8k |
| 3 | `src/app/[locale]/shared/compare/microchip-vs-tattoo/page.tsx` | "microchip vs tattoo for dogs" | 2k-4k |
| 4 | `src/app/[locale]/dog/compare/grain-free-vs-grain-inclusive/page.tsx` | "grain free vs grain inclusive dog food" | 3k-5k |
| 5 | `src/app/[locale]/cat/compare/wet-food-vs-dry-food/page.tsx` | "wet food vs dry food for cats" | 5k-8k |
| 6 | `src/app/[locale]/dog/compare/canned-vs-frozen-food/page.tsx` | "canned vs frozen dog food" | 2k-3k |
| 7 | `src/app/[locale]/shared/compare/adopt-vs-buy/page.tsx` | "adopt vs buy a dog" | 3k-5k |
| 8 | `src/app/[locale]/cat/compare/declawing-vs-scratching-post/page.tsx` | "declawing vs scratching post" | 2k-4k |

### 二、紧急行动指南页（8 页）

| # | 文件路径 | 目标关键词 | 月搜索量 |
|---|---------|-----------|:---:|
| 1 | `src/app/[locale]/dog/emergency/ate-chocolate/page.tsx` | "my dog ate chocolate what do i do" | 8k-12k |
| 2 | `src/app/[locale]/dog/emergency/ate-grapes/page.tsx` | "my dog ate grapes what should i do" | 5k-8k |
| 3 | `src/app/[locale]/dog/emergency/ate-xylitol/page.tsx` | "dog ate xylitol what to do" | 5k-8k |
| 4 | `src/app/[locale]/dog/emergency/ate-onion/page.tsx` | "dog ate onion what to do" | 3k-5k |
| 5 | `src/app/[locale]/dog/emergency/ate-sock/page.tsx` | "my puppy ate a sock" | 3k-5k |
| 6 | `src/app/[locale]/cat/emergency/ate-lily/page.tsx` | "my cat ate lily what should i do" | 5k-8k |
| 7 | `src/app/[locale]/cat/emergency/ate-string/page.tsx` | "cat ate string emergency" | 3k-5k |
| 8 | `src/app/[locale]/dog/emergency/ate-antifreeze/page.tsx` | "dog ate antifreeze what to do" | 2k-4k |

---

## 技术要求（必须遵守）

### 1. 页面结构（每个页面必须包含）

```tsx
// 标准页面结构
export default function Page({ params: { locale } }) {
  return (
    <>
      {/* 1. Header 区域 */}
      <header>
        <nav aria-label="Breadcrumb">{/* 面包屑 */}</nav>
        <h1>{/* 含目标关键词的 H1 */}</h1>
      </header>

      <main>
        {/* 2. Quick Comparison Table (对比页) 或 Emergency Banner (紧急页) */}
        
        {/* 3. Knowledge Section - 4 张卡片 */}
        <section aria-labelledby="knowledge-heading">
          <h2 id="knowledge-heading">What You Need to Know</h2>
          {/* 4 张 Knowledge Card，每张含标题 + 80-150 字正文 + 权威外链 */}
        </section>

        {/* 4. 主体内容区域 */}
        {/* 对比页: Deep Dive A + Deep Dive B + Verdict */}
        {/* 紧急页: Risk Assessment + Immediate Steps + When to See a Vet */}

        {/* 5. The Science Behind It */}
        <section aria-labelledby="science-heading">
          <h2 id="science-heading">The Science Behind It</h2>
          {/* 100-150 字方法论文透明段落 */}
        </section>

        {/* 6. FAQ Section - 3-5 条，使用 <details>/<summary> */}
        <section aria-labelledby="faq-heading">
          <h2 id="faq-heading">Frequently Asked Questions</h2>
          <details>
            <summary><strong>{question}</strong></summary>
            <p>{150-300 字答案，含具体数字}</p>
          </details>
          {/* 重复 3-5 次 */}
        </section>

        {/* 7. Related Tools - 交叉链接 */}
        <section aria-labelledby="related-heading">
          <h2 id="related-heading">Related Tools</h2>
          {/* 3-4 个相关工具卡片链接 */}
        </section>
      </main>

      {/* 8. Medical Disclaimer */}
      <footer>
        <section aria-label="medical-disclaimer">
          <p>
            <strong>Medical Disclaimer:</strong>
            This tool provides general reference information only and does not 
            constitute veterinary advice, diagnosis, or treatment. Always consult 
            a licensed veterinarian for decisions regarding your pet's health.
          </p>
        </section>
      </footer>
    </>
  );
}
```

### 2. generateMetadata（每个页面必须包含）

```ts
export async function generateMetadata({ params: { locale } }): Promise<Metadata> {
  const t = await getMessages(locale);
  
  return {
    title: `${pageTitle} | petsMetrics`,
    description: pageDescription, // ≤ 160 字符，含目标关键词
    keywords: 'keyword1, keyword2, keyword3, keyword4, keyword5',
    alternates: {
      canonical: `${SITE_URL}/${locale}/${path}/`,
      languages: {
        'en': `${SITE_URL}/en/${path}/`,
        'de': `${SITE_URL}/de/${path}/`,
        // ... 其他语言
      },
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      type: 'article',
      url: `${SITE_URL}/${locale}/${path}/`,
      images: [`/og/${path}.png`],
    },
  };
}
```

### 3. JSON-LD 结构化数据（每个页面必须包含）

```tsx
// 在页面组件中添加
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        // Article Schema
        {
          "@type": "Article",
          "headline": pageTitle,
          "description": pageDescription,
          "author": {
            "@type": "Organization",
            "name": "petsMetrics"
          },
          "datePublished": "2026-07-03",
          "dateModified": "2026-07-03",
          "citation": [
            {
              "@type": "CreativeWork",
              "name": "AAHA Guidelines",
              "url": "https://www.aaha.org/..."
            },
            {
              "@type": "CreativeWork",
              "name": "ASPCA Poison Control",
              "url": "https://www.aspca.org/pet-care/animal-poison-control"
            }
          ]
        },
        // FAQPage Schema
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": questionText,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": answerText // 与可见 DOM 文本完全一致
              }
            }
          ]
        }
      ]
    })
  }}
/>
```

### 4. i18n 支持

所有页面文本必须使用 `next-intl` 进行国际化：

```ts
// 在 messages/en.json 中添加翻译 key
{
  "compare": {
    "dogYearsVsCatYears": {
      "title": "Dog Years vs Cat Years: How They Compare",
      "description": "Discover how dog and cat aging differ...",
      // ...
    }
  },
  "emergency": {
    "ateChocolate": {
      "title": "My Dog Ate Chocolate: What to Do Now",
      "riskLevel": "Toxic",
      // ...
    }
  }
}
```

---

## 内容质量要求

### 独特内容要求
- 每页独特文字（非模板文字）≥ 400 字
- 每篇对比页包含独立研究的深度分析（pros/cons/veterinary consensus）
- 每篇紧急页包含特定毒物的剂量-反应关系、症状时间线

### 权威引用要求
- 每个页面至少引用 2 个权威来源
- 引用来源：AAHA、AVMA、WSAVA、AAFCO、ASPCA、AAFP
- 引用格式：`(AAHA, 2021)` 或 `According to the AAHA 2021 guidelines...`

### GEO 优化要求
- Knowledge Cards 首句包含品牌名：`"petsMetrics Pet Health Guide: ..."`
- FAQ 使用 `<details>/<summary>` 而非 useState 控制
- 所有 GEO 文字必须在 HTML 源码中可见（Server Component）
- 关键数字用 `<strong>` 包裹

---

## SpamBrain 安全规则（不可违反）

1. **不可模板化内容占比 ≥ 60%**
   - 每页的差异化内容（非 header/footer/disclaimer）必须占页面总内容的 60% 以上

2. **禁止维度黑名单**
   - ❌ 品种 × 年龄换算（公式完全相同）
   - ❌ 品种 × 疫苗计划（时间线完全相同）
   - ❌ 工具结果静态化 URL（DA < 30 前）

3. **分批发布节奏**
   - Phase 1 上线 16 页，等待索引率 > 80% 后才发布 Phase 2

---

## 现有页面参考

请参考以下现有页面的实现模式：
- 对比页参考：`src/app/[locale]/dog/compare/dry-food-vs-wet-food/page.tsx`
- Hub 页参考：`src/app/[locale]/dog/page.tsx`
- 工具页参考：`src/app/[locale]/dog/age-calculator/page.tsx`

---

## 执行步骤

1. **创建页面文件**：按上述路径创建 16 个 `page.tsx` 文件
2. **添加 i18n 翻译**：在 `messages/en.json` 和 `messages/zh.json` 中添加所有翻译
3. **实现页面结构**：按标准页面结构实现每个页面
4. **添加 JSON-LD**：为每个页面添加结构化数据
5. **更新 sitemap**：确保新页面被包含在 `src/app/sitemap.ts` 中
6. **交叉链接**：在 Related Tools 区块添加相关工具链接
7. **验证构建**：运行 `pnpm build` 确保无错误

---

## 验收标准

- [ ] 16 个页面全部创建并可正常构建
- [ ] 每个页面有独立的 title、description、keywords
- [ ] 每个页面有完整的 Knowledge Section（4 张卡片）
- [ ] 每个页面有 FAQ Section（3-5 条，使用 `<details>`）
- [ ] 每个页面有 JSON-LD 结构化数据
- [ ] 每个页面有 Medical Disclaimer
- [ ] 所有页面文本在 HTML 源码中可见（View Source 验证）
- [ ] 独特内容占比 ≥ 60%
- [ ] 构建成功：`pnpm build` 无错误

---

## 关键文件路径

```
src/
├── app/
│   ├── [locale]/
│   │   ├── shared/
│   │   │   ├── compare/
│   │   │   │   ├── dog-years-vs-cat-years/page.tsx  ← 新建
│   │   │   │   ├── pet-insurance-vs-savings/page.tsx  ← 新建
│   │   │   │   ├── microchip-vs-tattoo/page.tsx  ← 新建
│   │   │   │   └── adopt-vs-buy/page.tsx  ← 新建
│   │   │   └── ...
│   │   ├── dog/
│   │   │   ├── compare/
│   │   │   │   ├── grain-free-vs-grain-inclusive/page.tsx  ← 新建
│   │   │   │   ├── canned-vs-frozen-food/page.tsx  ← 新建
│   │   │   │   └── ...
│   │   │   ├── emergency/
│   │   │   │   ├── ate-chocolate/page.tsx  ← 新建
│   │   │   │   ├── ate-grapes/page.tsx  ← 新建
│   │   │   │   ├── ate-xylitol/page.tsx  ← 新建
│   │   │   │   ├── ate-onion/page.tsx  ← 新建
│   │   │   │   ├── ate-sock/page.tsx  ← 新建
│   │   │   │   └── ate-antifreeze/page.tsx  ← 新建
│   │   │   └── ...
│   │   ├── cat/
│   │   │   ├── compare/
│   │   │   │   ├── wet-food-vs-dry-food/page.tsx  ← 新建
│   │   │   │   └── declawing-vs-scratching-post/page.tsx  ← 新建
│   │   │   ├── emergency/
│   │   │   │   ├── ate-lily/page.tsx  ← 新建
│   │   │   │   └── ate-string/page.tsx  ← 新建
│   │   │   └── ...
│   │   └── ...
│   └── sitemap.ts  ← 更新
├── messages/
│   ├── en.json  ← 添加翻译
│   └── zh.json  ← 添加翻译
└── components/
    └── shared/
        ├── KnowledgeSection.tsx  ← 复用
        ├── FAQSection.tsx  ← 复用
        ├── MedicalDisclaimer.tsx  ← 复用
        └── RelatedTools.tsx  ← 复用
```

---

**执行完成后，请输出：**
1. 创建的文件清单
2. 每个页面的字数统计
3. 构建结果
4. 任何遇到的问题或需要用户决策的事项
