# SEO 强制清单

> 每个工具页面上线前必须逐项完成。GEO 策略请见 [geo-checklist.md](geo-checklist.md)，关键词缺口分析请见 [seo-keyword-gap-analysis.md](seo-keyword-gap-analysis.md)。

---

## 项目 SEO 策略总结

### 策略框架

petsMetrics 的猫狗健康工具矩阵采用**内容驱动 + 长尾关键词 + 技术 SEO**三维策略截流搜索引擎流量。

#### 1. 搜索意图分层覆盖

| 意图层 | 策略 | 落地点 |
|--------|------|--------|
| **交易意图** ("calculator", "how much to feed my dog") | 工具页 keywords + 精准 meta description | 所有 12 个工具页 |
| **信息意图** ("can dogs eat grapes", "how long are dogs pregnant") | 毒性落地页 200+ + 页内 FAQ | 毒性检测器 + 工具页 FAQ |
| **导航意图** ("dog health calculator", "cat age calculator") | Hub 页 title + CollectionPage JSON-LD | /dog/、/cat/ Hub 页 |
| **即时意图** ("my dog ate chocolate", "is this plant toxic to cats") | 毒性检测器实时搜索 + 宠物毒物热线 | 毒性检测器 /shared/toxic-checker/ |

#### 2. 技术 SEO 基础

- **全预渲染 SSG**（Next.js `output: 'export'`）：所有页面对爬虫立即可索引，无 JS 依赖。
- **子目录 URL 模型**：`petsmetrics.com/[species]/[tool]`，所有权重叠加到根域名，禁止子域名作为 Canonical URL。
- **单一语言起步**：英语为主，架构预留 i18n 扩展能力（`/[lang]/` 可选前缀）。
- **动态 sitemap**：`lastModified` 为构建时间，Google 爬虫新鲜度信号。

#### 3. 毒性落地页策略（长尾关键词阵地 — 核心 SEO 引擎）

**覆盖完整**：200+ 种食物和植物各配一个独立静态落地页。

| 物种 | URL 模式 | 示例 | 目标搜索意图 |
|------|---------|------|-----------|
| 狗狗 | `/dog/can-dogs-eat-[food]/` | `/dog/can-dogs-eat-grapes/` | "can dogs eat grapes" |
| 猫咪 | `/cat/is-[plant]-toxic-to-cats/` | `/cat/are-lilies-toxic-to-cats/` | "are lilies toxic to cats" |
| 共享 | `/shared/is-[item]-safe-for-pets/` | `/shared/is-chocolate-safe-for-pets/` | "is chocolate safe for pets" |

**落地页结构标准**：
- H1 包含目标关键词（如 "Can Dogs Eat Grapes?"）
- 毒性等级徽章（Toxic / Caution / Safe）+ 症状列表
- ASPCA 毒物热线电话（结构化数据）
- "Check Another Food" 搜索 CTA（内链回流毒性检测器主页）
- FAQPage JSON-LD（3 条问答）
- Related Items 交叉链接（如葡萄 → 葡萄干 → 葡萄酒）

#### 4. 内部链接策略

| 链接类型 | SEO 价值 | 实现 |
|---------|---------|------|
| **工具页 Related Tools 卡片** | PageRank 流动、场景 cross-sell | 每个工具页侧边栏列出互补工具 |
| **毒性落地页 → 毒性检测器主页** | 长尾落地 → 转化工具 | 每个落地页 "Check Another Food" CTA |
| **Hub 页 → 子工具页** | Hub 权威 → 子页权重传递 | Dog/Cat Hub 的工具卡片网格 |
| **档案页 → 全站工具** | 核心差异化内链枢纽 | Profile 页 "Open with [PetName]'s data" 链接 |
| **面包屑导航** | 层级信号 + 站内导航 | 首页 > 物种 > 工具 |

#### 5. 内容新鲜度信号

| 信号 | 实现 | 作用 |
|------|------|------|
| `sitemap.lastModified` | `new Date()` 动态值（构建时） | Google 爬虫新鲜度判断 |
| 年度数据更新 | 毒性数据库每年核验 ASPCA 最新数据 | 页面活跃度 |
| 工具页公式引用 | 标注公式来源年份（如 "AAHA 2021 指南"） | 可信度 + 新鲜度 |

#### 6. E-E-A-T 信号（宠物健康垂类强制）

宠物健康属于 YMYL（Your Money or Your Life）垂类，Google 对 E-E-A-T（Experience, Expertise, Authoritativeness, Trustworthiness）要求远高于普通工具站。

| 信号 | 实现 |
|------|------|
| **Experience（经验）** | 宠物档案系统证明"我们理解养宠人需求" |
| **Expertise（专业）** | 每个结果明确标注公式来源（AAHA / WSAVA / AAFCO / UCSD 研究） |
| **Authoritativeness（权威）** | 引用权威机构外链（ASPCA、AVMA、WSAVA）；About 页展示兽医顾问 |
| **Trust（信任）** | 标准免责声明；隐私声明（localStorage，无数据上传）；联系方式透明 |

#### 7. 竞争格局与流量爬坡预期

> ⚠️ 核心词（"can dogs eat grapes"）被 ASPCA（DA 82）、AKC（DA 78）、PetMD（DA 71）占据。新站不可能短期跻身首页。

| 阶段 | 时间 | 状态 |
|---|---|---|
| 内容发布期 | Month 0–3 | 基本无自然流量 |
| Google 收录与初排名 | Month 4–9 | 长尾词开始有零星点击 |
| DA 积累期 | Month 10–18 | 稳定增长，开始有可见排名 |
| 核心词竞争期 | Month 18–36 | 中低竞争词进入第一页 |

**差异化破局路径**：
1. **EU 宠物旅行检查器**：英语竞争极低（DA < 30），是最快获得媒体反链的突破口
2. **宠物博主 Embed 代码**：每个嵌入 = 一个高质量反链 + 持续流量
3. **HARO / Connectively 媒体回应**：以数据工具背书获得权威媒体引用
4. **数据驱动内容**：基于毒性数据库发布年度报告（"2026年最常见宠物误食食物Top 20"）

---

## 1. 基础索引文件（P0 — 缺失则爬虫无法高效发现所有 URL）

| 项目 | 文件 | 要求 |
|------|------|------|
| Sitemap | `src/app/sitemap.ts` | 覆盖所有 12 工具页 + 200+ 毒性落地页 + Hub + 档案页；`lastModified` 设为构建/上线日期 |
| Robots | `src/app/robots.ts` | `Allow: /`；`Disallow: /_next/ /api/`；指向正确的 sitemap URL |

**Sitemap 优先级约定**：

| 页面类型 | 优先级 |
|---------|--------|
| 首页 | `1.0` |
| Dog Hub / Cat Hub | `0.9` |
| 工具页（P0） | `0.9` |
| 毒性落地页 | `0.8` |
| 档案页 | `0.8` |
| P1 工具页 | `0.7` |
| 法律页（privacy / terms） | `0.3` |

---

## 2. 页面级 Metadata（P0 — 每路由必须独立）

### 2.1 首页（`/`）

- [ ] `title`：`petsMetrics — Free Dog & Cat Health Calculators`
- [ ] `description`：≤ 160 字符，含核心 USP（"Create a pet profile once — every calculator auto-fills. No login. Just science."）
- [ ] `keywords`：`dog health calculator, cat health calculator, pet calculator, free pet tools`
- [ ] `openGraph.type: "website"` + `openGraph.url`
- [ ] `openGraph.images`：`/og/homepage.png`（1200×630，爪印 + 计算器主题）— 强制，缺失导致社交分享无图
- [ ] Schema：`Organization` + `WebSite`（含 `SearchAction`）

### 2.2 Hub 页（`/dog/`、`/cat/`）

- [ ] `title` 格式：`Free Dog Health Calculators — Calories, Age, Vaccines & More | petsMetrics`
- [ ] `description`：概述工具列表 + "Free, no login required"
- [ ] `keywords`：覆盖 4-6 个工具名 + 物种关键词
- [ ] `alternates.canonical`：指向正确路径
- [ ] `openGraph.type: "website"`
- [ ] Schema：`CollectionPage` + `BreadcrumbList` + `ItemList`

### 2.3 工具页（P0：12 个工具页）

- [ ] `<title>` 含工具名 + 品牌名（格式：`{Tool Title} | petsMetrics`）
- [ ] `<meta description>` ≤ 160 字符，含核心 USP（公式来源 / 宠物档案联动）
- [ ] `<meta keywords>` 含 3-5 个长尾关键词，与 [seo-keyword-gap-analysis.md](seo-keyword-gap-analysis.md) 覆盖矩阵对齐
- [ ] `alternates.canonical`：指向正确路径
- [ ] Schema：`WebApplication` + `FAQPage`

### 2.4 毒性落地页（P0：200+ 静态页面）

- [ ] `<title>` 包含目标搜索关键词（格式：`Can Dogs Eat {Food}? [{Status}] | petsMetrics`）
- [ ] `<meta description>` ≤ 160 字符，直接回答安全问题
- [ ] `alternates.canonical`：每个落地页独立 canonical
- [ ] Schema：`FAQPage` + `Article`

---

## 3. 页面内容结构（P1 — 文本索引密度）

### 3.1 H1 核心关键词

H1 不能仅为品牌名或通用工具名，必须包含目标搜索关键词：

```tsx
// 工具页示例
<h1>Dog Age Calculator: Convert Dog Years to Human Years</h1>
<h1>Is It Safe? Toxic Food & Plant Checker for Dogs & Cats</h1>

// 毒性落地页示例  
<h1>Can Dogs Eat Grapes? 🚫 Toxic</h1>
```

### 3.2 工具页正文结构

每个工具页 `below the fold` 必须包含 SSG 预渲染的以下区块：

- **How It Works**：3 步操作流程（输入 → 计算 → 读取结果）
- **The Science Behind It**：公式来源 + 权威引用（AAHA / WSAVA / AAFCO / UCSD）
- **FAQ**：3-5 问答（**问题文本必须包含目标关键词**，自然语言形式）
- **Medical Disclaimer**：标准免责声明

### 3.3 Hub 页编辑性文字

Hub 页工具列表下方必须有一段 SSG 预渲染的纯文本段落：
- 工具概述 + AAHA/WSAVA 标准引用
- 隐私声明（"All calculations run in your browser. No data is uploaded."）

---

## 4. 结构化数据 JSON-LD（P1 — 影响 Rich Result）

| 类型 | 适用范围 | 关键字段 |
|------|---------|--------|
| `Organization` + `WebSite` | 首页 | `name`, `url`, `potentialAction.SearchAction` |
| `CollectionPage` + `BreadcrumbList` | Hub 页 | `name`, `description`, `itemListElement` |
| `WebApplication` + `offers.price: "0"` | 工具页 | `name`, `applicationCategory: "HealthApplication"`, `operatingSystem: "Any"` |
| `FAQPage` | 工具页 + 毒性落地页 | `mainEntity[].Question.name` + `acceptedAnswer.text` |
| `BreadcrumbList` | 所有深层页面 | `itemListElement[].position` + `name` + `item` |

> **注**：`SoftwareApplication`、`HowTo`、`Article.citation[]` 等面向 AI 搜索引擎摘录的 JSON-LD 类型，归属 GEO 策略，详见 [geo-checklist.md](geo-checklist.md)。

---

## 5. 内部链接（P2 — PageRank 流动）

- [ ] 工具页侧边栏有"Related Tools"内链区块（链向同类或互补工具）
- [ ] Hub 页有工具卡片直链各工具子路由
- [ ] 毒性落地页有"Check Another Food"搜索 CTA 链接
- [ ] 毒性落地页有 Related Items 交叉链接（相关食物）
- [ ] 所有跨物种链接使用原生 `<a href>` 或 Next.js `<Link>`
- [ ] 面包屑导航覆盖所有深层页面

### P0 交叉链接矩阵

| 源页面 | 目标页面 | 交叉链接策略 |
|--------|---------|-----------|
| 毒性检测器主页 | 毒性落地页 (200+) | 搜索结果 + "热门搜索" + Related Items |
| 卡路里计算器 | BCS 体重追踪器 | "Managing your pet's weight?" |
| 疫苗计划 | 年龄计算器 | "How old is your pet in human years?" |
| 怀孕计算器 | 疫苗计划 | "Plan vaccinations for the new litter" |
| EU 旅行检查器 | 疫苗计划 | "Check vaccine requirements first" |
| 档案页 | 所有工具 | "Open with [PetName]'s data" |
| BARF 计算器 | 卡路里计算器 | "Prefer commercial food?" |
| 保险估算器 | 疫苗计划 | "Insurance covers these vaccines" |

---

## 6. 毒性落地页 / 内容页（P1 — 长尾关键词）

> 这是整站最大的自然流量入口。200+ 页面覆盖 "can dogs eat X" 类长尾搜索词。

- [ ] `generateStaticParams()` 覆盖全部 200+ 物品 × 2 物种（狗狗 + 猫咪）
- [ ] 每页独立 `generateMetadata()`（title 含 `[{Status}]` 后缀）
- [ ] 每页独立 `alternates.canonical`
- [ ] 每页含 FAQPage JSON-LD（3 条问答）
- [ ] 每页含 ASPCA 毒物热线号码（结构化标记）
- [ ] 每页底部有 Related Items 交叉链接（3-5 个相关食物）
- [ ] sitemap 优先级：`0.8`

### 落地页标准结构

```
┌──────────────────────────────────────────────────┐
│  H1: Can Dogs Eat [Food]? [Status Badge]         │
│  ─────────────────────────────────────────────    │
│  [1] Status: Toxic / Caution / Safe              │
│  [2] Why It's Dangerous (or Safe)                │
│  [3] Symptoms (if toxic)                         │
│  [4] What To Do (ASPCA Hotline)                  │
│  [5] Sources: ASPCA, AVMA                        │
│  [6] FAQ (3 questions)                           │
│  [7] Related Items                               │
│  [8] "Check Another Food" CTA                    │
└──────────────────────────────────────────────────┘
```

---

## 7. URL 架构规范

- 对外 URL 永远是 `petsmetrics.com/[species]/[tool]`
  - 狗狗工具：`/dog/[tool-slug]/`
  - 猫咪工具：`/cat/[tool-slug]/`
  - 共享工具：`/shared/[tool-slug]/`
  - 毒性落地页：`/dog/can-dogs-eat-[food]/`、`/cat/is-[item]-toxic-to-cats/`
- 禁止子域名作为 Canonical URL
- 所有 URL 使用 kebab-case
- 静态资源路径通过 Next.js 内置优化引用

### 完整路由清单

| 路由 | 页面 | 优先级 |
|------|------|--------|
| `/` | 首页 | P0 |
| `/dog/` | 狗狗工具枢纽 | P0 |
| `/cat/` | 猫咪工具枢纽 | P0 |
| `/shared/toxic-checker/` | 毒性食物检测器 | P0 |
| `/dog/calorie-calculator/` | 狗狗卡路里/MER 计算器 | P0 |
| `/dog/age-calculator/` | 狗狗年龄计算器 | P0 |
| `/dog/gestation-calculator/` | 狗狗怀孕计算器 | P0 |
| `/dog/vaccination-schedule/` | 狗狗疫苗计划 | P0 |
| `/dog/puppy-growth-predictor/` | 幼犬生长预测器 | P0 |
| `/cat/age-calculator/` | 猫咪年龄计算器 | P0 |
| `/cat/gestation-calculator/` | 猫咪怀孕计算器 | P0 |
| `/cat/vaccination-schedule/` | 猫咪疫苗计划 | P0 |
| `/cat/bcs-weight-tracker/` | 猫咪 BCS 体重追踪器 | P0 |
| `/cat/hydration-calculator/` | 猫咪水分计算器 | P0 |
| `/shared/eu-pet-travel-checker/` | EU 宠物旅行检查器 | P0 |
| `/shared/barf-calculator/` | BARF 生食计算器 | P1 |
| `/shared/pet-insurance-estimator/` | 宠物保险估算器 | P1 |
| `/profile/` | 宠物档案 | P0 |
| `/dog/can-dogs-eat-[food]/` | 毒性落地页 (200+) | P0 |
| `/cat/is-[item]-toxic-to-cats/` | 毒性落地页 | P0 |

---

## 8. Core Web Vitals 与性能（影响排名）

- [ ] SSG 全预渲染（`output: 'export'`），首字节时间最小化
- [ ] 图片使用 Next.js `<Image>` 或优先 WebP 格式
- [ ] 第三方脚本异步加载（`async` / `defer`）
- [ ] 字体使用 `font-display: swap` 防止 FOIT
- [ ] 客户端模糊搜索（Fuse.js）体积控制在合理范围（< 50KB gzipped）
- [ ] 毒性数据库 JSON 按需加载（搜索页面主文件 + 落地页按 slug 单独预渲染）

---

## 9. 冷启动流量策略（与 SEO 互补）

> SEO 需要 18-24 个月才能在核心词获得排名。必须有独立于 SEO 的冷启动渠道。

| 渠道 | 执行方式 | 优先级 |
|------|---------|--------|
| **Reddit** | r/dogs（400万）、r/cats（280万）— 以 "I built a free tool" 形式发布 | ⭐⭐⭐⭐⭐ |
| **宠物博主 Embed** | 为每个计算器提供一行嵌入代码，联系 100 个宠物博客 | ⭐⭐⭐⭐⭐ |
| **Pinterest** | 年龄换算信息图（竖版）— 宠物信息图 SEO 生命周期长达 3 年 | ⭐⭐⭐⭐ |
| **TikTok / Reels** | 短视频展示 "我发现我家狗已经 68 岁了" 惊喜内容 | ⭐⭐⭐⭐ |
| **Product Hunt** | 发布日上线 Product Hunt | ⭐⭐⭐ |
| **EU Travel Checker PR** | 向欧洲宠物媒体投稿 "英语首个 EU 宠物通关检查器" | ⭐⭐⭐ |

---

## 10. 验证工具

| 工具 | 用途 |
|------|------|
| Google Search Console | 提交 sitemap，监控索引覆盖率 |
| Google Rich Results Test | 验证 JSON-LD |
| Ahrefs / Semrush | 关键词排名追踪 |
| PageSpeed Insights | Core Web Vitals（影响排名） |

---

---

## 12. Image SEO（P1 — 图片搜索流量入口）

宠物垂类是 Google Images 的高频搜索场景。"golden retriever age chart"、"dog body condition score chart"、"cat weight chart" 等词在图片搜索中有显著流量。SSG 站点在图片 SEO 上有天然优势——所有图片路径在构建时即确定。

### 12.1 图片要求

| 项目 | 要求 |
|------|------|
| 格式 | 优先 WebP（`next/image` 自动转换），OG 图使用 PNG |
| 尺寸 | OG 图 1200×630px；工具内插图 ≤ 800px 宽；信息图 800×2000px（竖版 Pinterest 比例） |
| Alt 文本 | **每张图片必须**有描述性 alt 文本，含目标关键词（如 `alt="Dog age chart: small vs large breed aging comparison"`） |
| 文件名 | 语义化命名（`dog-age-chart-small-vs-large-breed.webp`），禁止 `IMG_001.webp` |
| Lazy loading | 所有 below-the-fold 图片使用 `loading="lazy"`；首屏 Hero 图使用 `priority` |
| 图片 sitemap | 工具页的信息图、流程图单独列入 `<image:image>` sitemap 元素 |

### 12.2 可 SEO 化图片清单

| 页面 | 图片内容 | 目标 Image Search 关键词 |
|------|---------|------------------------|
| 年龄计算器 | 品种 × 生命周期对照表（信息图） | "dog age chart"、"cat age chart"、"dog years to human years chart" |
| BCS 体重追踪 | 9 分体况评分图（1-9 猫剪影示意） | "cat body condition score chart"、"dog BCS chart" |
| 疫苗计划 | 幼犬/幼猫疫苗时间线（信息图） | "puppy vaccination chart"、"kitten shot schedule chart" |
| 怀孕计算器 | 犬/猫孕期发育阶段（信息图） | "dog pregnancy timeline"、"cat pregnancy stages chart" |
| 卡路里计算器 | 喂食量对照表（体重 → 克数） | "dog feeding chart by weight" |
| 毒性检测器 | 常见有毒食物/植物图鉴（信息图） | "toxic foods for dogs chart"、"plants toxic to cats infographic" |

### 12.3 Image SEO 代码规范

```tsx
// ✅ Next.js Image with priority for LCP
import Image from 'next/image';

<Image
  src="/images/dog-age-chart-small-vs-large-breed.webp"
  alt="Dog age chart comparing small and large breed aging rates using UCSD epigenetic study data"
  width={800}
  height={1200}
  priority={isHero}
  loading={isHero ? undefined : 'lazy'}
/>

// ✅ Figure with semantic caption
<figure>
  <Image src="..." alt="..." width={800} height={1200} />
  <figcaption>
    Dog age conversion chart based on UCSD DNA methylation study (Wang et al., 2020).
    Small breeds age slower than large breeds after the first two years.
  </figcaption>
</figure>
```

> **SEO 原理**：Google Images 提取 `<figcaption>` 作为图片上下文信号，优于仅依赖 alt 文本。每个信息图必须配合 `<figure>` + `<figcaption>`。

---

## 13. 内容衰减监控策略（P1 — 长期排名维护）

宠物健康领域的搜索结果不稳定——竞争对手更新内容、Google 算法调整、新站点进入都会导致排名波动。需要建立主动的内容衰减监控机制。

### 13.1 衰减信号定义

| 信号 | 阈值 | 触发动作 |
|------|------|---------|
| 排名下降 ≥ 3 位 | 连续 2 周 | 复查页面内容，对比新晋竞品 |
| CTR 下降 ≥ 20% | 4 周窗口 | 检查 meta description 是否被 Google 重写、SERP 是否出现新 Feature |
| 页面停留时间下降 ≥ 30% | 4 周窗口 | 复查工具可用性、页面加载速度 |
| 竞品新内容上线 | 即时 | 对比竞品内容深度，决定是否扩充 |

### 13.2 定期审计清单

| 审计项目 | 频率 | 工具 |
|---------|------|------|
| 核心工具页排名追踪 | 每周 | Google Search Console + Ahrefs |
| 毒性落地页索引覆盖 | 每月 | GSC Coverage Report |
| 结构化数据错误 | 每月 | GSC Enhancements Report |
| 死链检测 | 每月 | Screaming Frog / Sitebulb |
| 竞品内容对比（Top 3 对手每个工具页） | 每季度 | 手动对比 + Diffchecker |
| 公式/数据时效性核验 | 每年 | ASPCA / AAHA / WSAVA 官网比对 |

### 13.3 毒性落地页批量更新策略

200+ 毒性落地页不适合逐页手动更新。需要模板化更新机制：

| 更新类型 | 触发条件 | 更新方式 |
|---------|---------|---------|
| ASPCA 数据核验 | 每年 Q1 | 批量 diff 毒性数据库 → 重新构建所有落地页 |
| FAQ 补充 | 发现新 PAA 问题时 | 追加到落地页模板的 FAQ 数组 |
| 日期刷新 | 每年核验后 | 批量更新 `dateModified` 字段 → 全站 rebuild |
| 新增食物/植物 | 数据库新增条目时 | `generateStaticParams()` 自动生成新页面 |

> **关键**：`dateModified` 的批量更新必须配合 `sitemap.xml` 中 `lastModified` 的同步更新——两者不一致会导致 Google 信任度下降。

---

## 14. 重复内容防护（P1 — 避免 SEO 惩罚）

工具站天生面临重复内容风险——多个工具共享相同的 UI 框架、免责声明、甚至部分正文。Google 对"thin content with boilerplate duplication"非常敏感。

### 14.1 风险识别

| 重复类型 | 风险页面 | 风险等级 |
|---------|---------|---------|
| 跨物种对称页 | `/dog/age-calculator/` ↔ `/cat/age-calculator/` | 🟡 中（工具逻辑相似但数据不同） |
| 毒性落地页模板 | 200+ 页面共享相同结构 | 🔴 高（必须确保每个页面有独特内容） |
| 疫苗计划对称页 | `/dog/vaccination-schedule/` ↔ `/cat/vaccination-schedule/` | 🟡 中 |
| 怀孕计算器对称页 | `/dog/gestation-calculator/` ↔ `/cat/gestation-calculator/` | 🟡 中 |

### 14.2 差异化策略

| 策略 | 实现 |
|------|------|
| **独特正文** | 每个工具有独立的 "The Science Behind It" 文字（dog 引用 AAHA / UCSD，cat 引用 AAFP / ISFM） |
| **FAQ 差异化** | 跨物种页面 FAQ 问题文字不同（"How old is my **dog**..." vs "How old is my **cat**..."） |
| **数据表差异化** | 跨物种页面展示不同的数据（狗品种 vs 猫品种寿命表、不同的疫苗时间表） |
| **毒性落地页必须独特** | 每个落地页的 `dangerReason`、`symptoms`、`whatToDo` 必须是逐物品手写/手审文案，**禁止**生成式批量填充 |
| **Canonical 正确** | 每个页面声明独立 canonical URL，绝不跨物种相互指向 |
| **noindex 低价值页** | 搜索过滤页（空查询结果）、分页参数 URL 等低价值页面加 `noindex` |

### 14.3 毒性落地页最低独特内容量

每个毒性落地页 **必须** 包含至少以下独特内容（非模板化）：

| 内容块 | 最小独特字数 | 要求 |
|--------|----------|------|
| Why It's Toxic / Safe | ≥ 100 字 | 逐物品手写，含具体毒素名（如葡萄 → 未知毒素致肾衰竭） |
| Symptoms | ≥ 80 字 | 逐物品差异化症状列表 |
| What To Do | ≥ 60 字 | 逐物品紧急处理建议 |
| FAQ × 3 | ≥ 150 字/条 | 3 条问答中至少 2 条为该物品特有问题 |

> **底线**：每个毒性落地页独特文字 ≥ 400 字。低于此标准的页面在 Google 眼中属 "thin content"，不会被索引或排名极低。

---

## 15. 语义 HTML 与无障碍结构（P1 — 爬虫解析增强）

Google 爬虫越来越依赖语义化 HTML 元素理解页面内容结构。错误的 heading 层级、缺失的 landmark 角色会削弱 SEO 信号。

### 15.1 强制性要求

| 元素 | 要求 |
|------|------|
| `<main>` | 每个页面有且仅有一个 `<main>` landmark |
| `<nav>` | 主导航、面包屑、页脚链接均用 `<nav aria-label="...">` |
| `<section>` | 每个内容区块用 `<section aria-labelledby="...">` 包裹 |
| `<header>` | 页面级 `<header>` 包含 H1 + 面包屑 |
| `<footer>` | 全局 `<footer>` 包含法律链接 + 免责声明 |
| Heading 层级 | 严格遵循 h1 → h2 → h3，**不跳级**（不能 h1 后直接 h3） |
| 表单语义 | 所有计算器输入框用 `<label>` 关联，error 用 `aria-describedby` |

### 15.2 标准页面骨架

```html
<body>
  <header>
    <nav aria-label="Main navigation"><!-- 全局导航 --></nav>
    <nav aria-label="Breadcrumb"><!-- 面包屑 --></nav>
    <h1><!-- 页面唯一 H1，含目标关键词 --></h1>
  </header>

  <main>
    <section aria-labelledby="how-it-works-heading">
      <h2 id="how-it-works-heading">How It Works</h2>
      <!-- 工具交互区 -->
    </section>

    <section aria-labelledby="knowledge-heading">
      <h2 id="knowledge-heading">What You Need to Know</h2>
      <!-- Knowledge Cards (§10 GEO) -->
    </section>

    <section aria-labelledby="science-heading">
      <h2 id="science-heading">The Science Behind It</h2>
      <!-- 公式 + 引用 -->
    </section>

    <section aria-labelledby="faq-heading">
      <h2 id="faq-heading">Frequently Asked Questions</h2>
      <!-- FAQ accordion -->
    </section>

    <section aria-labelledby="related-heading">
      <h2 id="related-heading">Related Tools</h2>
      <!-- 交叉链接卡片 -->
    </section>
  </main>

  <footer>
    <nav aria-label="Legal links"><!-- Privacy, Terms --></nav>
    <section aria-label="medical-disclaimer"><!-- 免责声明 --></section>
  </footer>
</body>
```

---

## 16. 上线前 SEO 审计清单（P0 — 生产环境门禁）

> **此审计清单必须在每次重大部署前逐项完成并签字。任何 P0 项不通过则阻塞上线。**

### 16.1 索引能力（P0 — 阻塞上线）

- [ ] `robots.txt` 可公开访问，`Allow: /`，Disallow 仅 `/_next/` `/api/`
- [ ] `sitemap.xml` 可公开访问，列出所有页面（包括 200+ 毒性落地页）
- [ ] 所有 `canonical` URL 正确且自引用（非交叉引用）
- [ ] 生产环境 HTML 源码包含所有 SSG 预渲染文本（右键 View Source 验证）
- [ ] Google Search Console 已注册并验证域名
- [ ] `noindex` 标签仅出现在有意排除的页面（搜索过滤页、分页参数 URL）

### 16.2 Metadata（P0 — 阻塞上线）

- [ ] 所有页面 `<title>` 唯一且含目标关键词
- [ ] 所有页面 `<meta description>` 唯一且 ≤ 160 字符
- [ ] OG 图片存在于 `/public/og/`，1200×630，可外部访问
- [ ] `twitter:card` 设置为 `summary_large_image`
- [ ] `twitter:image` 与 `og:image` 使用同一资源

### 16.3 结构化数据（P0 — 阻塞上线）

- [ ] 首页：`Organization` + `WebSite` JSON-LD 通过 [Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Hub 页：`CollectionPage` + `BreadcrumbList` JSON-LD 有效
- [ ] 工具页：`SoftwareApplication` + `FAQPage` + `HowTo` JSON-LD 有效
- [ ] 毒性落地页：`Article` + `FAQPage` + `ContactPoint` JSON-LD 有效
- [ ] 所有 JSON-LD 无语法错误（逗号缺失、引号不匹配等）
- [ ] `@graph` 合并语法正确（多类型页面）

### 16.4 性能（P0 — 阻塞上线）

- [ ] 首页 LCP < 2.5s（移动端 4G 模拟）
- [ ] 工具页 LCP < 2.5s（含 Fuse.js 搜索加载）
- [ ] CLS < 0.1（全站）
- [ ] TBT < 200ms（移动端）
- [ ] 字体使用 `font-display: swap`，无 FOIT
- [ ] 图片全部 WebP 格式，Hero 图使用 `priority`

### 16.5 内容（P1 — 警告但不阻塞）

- [ ] 每个页面 H1 唯一
- [ ] Heading 层级无跳级（h1 → h2 → h3）
- [ ] 所有图片有语义化 alt 文本
- [ ] 所有外链使用 `rel="noopener noreferrer"`
- [ ] 毒性落地页独特文字 ≥ 400 字
- [ ] Medical Disclaimer 存在于所有工具页和毒性落地页

### 16.6 分析（P1 — 警告但不阻塞）

- [ ] Google Analytics / Plausible 已部署
- [ ] Google Search Console sitemap 已提交
- [ ] 自定义事件埋点（计算完成、CTA 点击、档案创建）


---

## 17. Google SpamBrain 防护策略（P0 — 工具站高风险区）

> **为什么重要**：纯工具站是 Google SpamBrain 的优先审查对象——大量模板化页面、少量独特文字、相似的结构极易被误判为"低质量内容农场"。petsMetrics 必须在架构层面主动规避所有 SpamBrain 触发器。

### 17.1 SpamBrain 已知触发器与对策

| 触发器 | 风险说明 | petsMetrics 对策 |
|--------|---------|----------------|
| **Thin Content（薄内容）** | 页面独特文字 < 300 字 → 直接不入索引 | 毒性落地页 ≥ 400 独特字；工具页 ≥ 500 独特字（含 Knowledge + FAQ + Science Behind It） |
| **Boilerplate Ratio（模板比例）** | 模板内容（header/footer/disclaimer）占全文 > 60% → 降权 | 每个页面独立正文部分必须超过模板区域总字数；Medical Disclaimer 放在 `<footer>` 而非 `<main>` |
| **Rapid Page Generation（批量发布）** | 一次性发布 200+ 页面 → 触发"程序化内容"标记 | **分批提交 sitemap**：先提交核心 14 工具页，1 周后再提交毒性落地页（每批 50 页） |
| **Identical Structure（相同结构）** | 200+ 页面共享完全相同 DOM 结构 → "门页"判定 | 毒性落地页按食物类别（水果/蔬菜/坚果/植物）随机轮换 3 套结构模板 |
| **Affiliate-Only Pages（纯联盟页）** | 页面仅有联盟链接无实质内容 → 降权 | 联盟链接仅出现在结果区后，# 不超过 2 条/页 |
| **Keyword Stuffing（关键词堆砌）** | `<meta keywords>` 或正文中堆积关键词 → 惩罚 | `keywords` 限定 5 个以内；正文关键词密度 ≤ 2.5% |
| **Hidden Text（隐藏文本）** | CSS `display:none` / `visibility:hidden` 的正文 → 重罚 | 所有 FAQ 使用 `<details>` 而非隐藏 div；任何折叠内容在 HTML 源码中可见 |

### 17.2 分批索引策略

> **关键**：Google 对全新域名的页面索引有"沙盒节奏"。一次性提交 200+ sitemap URL 不会加速索引，反而可能触发垃圾检测。

| 阶段 | 时间 | 提交页面 | URL 数量 |
|------|------|---------|---------|
| **T0 上线日** | Day 1 | 首页 + 2 Hub + 档案页 + legal 页 | 6 |
| **T0+3 天** | Day 4 | 全部 P0 工具页（10 个） | 10 |
| **T0+7 天** | Day 8 | 毒性检测器主页 + 高搜索量落地页（Top 50） | 51 |
| **T0+14 天** | Day 15 | 中等搜索量落地页（50-100） | 50 |
| **T0+21 天** | Day 22 | 低搜索量落地页（100-200） | 100 |
| **T0+30 天** | Day 30 | P1 工具页（BARF、保险估算器） | 2 |

> **执行**：每批通过 Google Search Console 手动提交该批 URL 到 sitemap，不一次性提交全部。同时通过 `sitemap.xml` 的 `lastModified` 差异化标记每批上线日期。

### 17.3 毒性落地页模板轮换

为防止 200+ 毒性落地页因结构完全相同被判定为"门页（Doorway Pages）"，必须使用 3 套结构模板按食物类别轮换：

| 模板 | 适用类别 | DOM 结构差异 |
|------|---------|------------|
| **模板 A** | 水果类（葡萄、苹果、香蕉…） | FAQ 前置（H2 顺序：FAQ → Why Toxic → Symptoms → What To Do） |
| **模板 B** | 蔬菜/坚果类（洋葱、大蒜、坚果…） | Symptoms 前置（H2 顺序：Symptoms → Why Toxic → FAQ → What To Do） |
| **模板 C** | 植物/花卉类（百合、郁金香、芦荟…） | What To Do 前置（H2 顺序：What To Do → Why Toxic → Symptoms → FAQ） |

> **原理**：Google SpamBrain 通过 DOM 结构哈希检测批量相似页面。3 套模板 + 每套中不同的 H2 顺序 = 6-9 种结构变体，足以绕过检测。

---

## 18. 社交证言与 UGC E-E-A-T 信号（P1 — YMYL 品类信任增强）

> **为什么重要**：宠物健康属于 YMYL（Your Money or Your Life）品类。Google 对 YMYL 站点的 E-E-A-T 要求越来越高。纯工具站天然缺乏"Experience（经验证言）"信号，需要主动建设社交层面的信任信号。

### 18.1 UGC 信号建设路线

| 信号类型 | 实现方式 | 时间线 | SEO 价值 |
|---------|---------|--------|---------|
| **Reddit 社区证言** | 在 r/dogs、r/cats、r/puppy101 发布工具后，收集用户反馈截图。在 `/about/` 或首页展示真实用户评价。 | 上线后 1-3 个月 | E-E-A-T "Experience" 维度 |
| **Google Business Profile** | 创建 petsMetrics 的 Google 商家资料（即使无实体店面），收集 Google Reviews | 上线后立即 | 品牌 SERP 右侧 Knowledge Panel 出现 |
| **Trustpilot / G2 评价** | 在 Trustpilot 注册品牌档案，邀请早期用户留下评价 | 上线后 3-6 个月 | 第三方平台反链 + 品牌搜索结果的评分星标 |
| **兽医顾问署名** | 落地页使用具名兽医顾问（"Reviewed by Dr. [Name], DVM"），提供 LinkedIn 可查证身份 | 上线前 | 直接提升 E-E-A-T "Expertise" — 竞品（PetMD、AKC）都这样做 |
| **工具 Embed 计数** | 在首页展示 "Used by X pet blogs" 社交证据（X 为实际嵌入数） | 随嵌入增长动态更新 | 社交证明 → 品牌信任 → 外链转化率提升 |

### 18.2 兽医署名实现

```tsx
// 每个工具页和毒性落地页底部的署名区块
<section aria-label="reviewer-info" class="border-t border-gray-200 mt-8 pt-4">
  <div class="flex items-center gap-3">
    <img 
      src="/images/vet-reviewer-[name].webp" 
      alt="Dr. [Name], DVM — veterinary reviewer for petsMetrics" 
      width="48" height="48" 
      class="rounded-full" 
    />
    <div>
      <p class="font-medium">Medically reviewed by <strong>Dr. [Name], DVM</strong></p>
      <p class="text-sm text-gray-600">
        [Graduate of X University School of Veterinary Medicine, Y years of clinical practice.]
        <a href="[LinkedIn URL]" rel="noopener noreferrer" class="underline">Verify credentials →</a>
      </p>
      <p class="text-sm text-gray-600">Last reviewed: [Recent Date]</p>
    </div>
  </div>
</section>
```

> **SEO 原理**：Google Quality Rater Guidelines 明确要求 YMYL 内容必须有可查证的作者/评审者信息。"Reviewed by" 署名比 "Written by" 更适合工具站（工具无"作者"，但公式数据需要专业评审）。

### 18.3 第三方评价平台部署

| 平台 | 注册时机 | 作用 |
|------|---------|------|
| **Trustpilot** | 上线后 1 个月内 | 品牌搜索结果出现星标 |
| **Product Hunt** | 上线日 | 科技社区权威评价 + 高端反链 |
| **G2**（如适用） | 上线后 3 个月内 | 软件工具类评价平台 |
| **Google Business Profile** | 上线日（无需实体地址） | 品牌 Knowledge Panel |

---

## 19. 品牌查询优化（P1 — 防御性品牌建设）

> **为什么重要**：品牌查询（"petsMetrics"、"petsMetrics calculator"、"petsMetrics review"）是 SEO 的最高转化流量——搜索品牌的用户已有信任倾向。需要从 Day 1 开始优化品牌查询的 SERP 表现。

### 19.1 品牌 SERP 特征目标

| SERP Feature | 实现要求 | 优先级 |
|-------------|---------|--------|
| **Site Links**（品牌名下方的 4-6 个子链接） | 充足的内部链接 + 清晰的导航层次 → Google 自动生成 | P0（上线即有） |
| **Knowledge Panel** | `Organization` JSON-LD + `sameAs` 多平台关联 | P1（上线后 1-3 个月出现） |
| **Review Stars** | Trustpilot / Product Hunt 评价 → Google 聚合展示 | P1（3-6 个月积累） |
| **Twitter Card（品牌搜索结果）** | `twitter:card` + `twitter:site` metadata | P0（上线即有） |
| **Sitelinks Search Box** | `WebSite` JSON-LD 中的 `SearchAction` | P0（上线即有） |

### 19.2 品牌查询覆盖内容矩阵

用户搜索品牌名时，SERP 应展示以下页面（而非仅首页）：

| 搜索查询 | 目标展示页面 | 优化方式 |
|---------|-----------|---------|
| `petsMetrics` | 首页 | 品牌 `Organization` JSON-LD |
| `petsMetrics review` | G2 / Trustpilot / Product Hunt 页 | 第三方平台 SEO（平台名 + petsMetrics） |
| `petsMetrics calculator` | Dog Hub + Cat Hub（双 Site Link） | Hub 页 title 含 "Free [Species] Health Calculators" |
| `petsMetrics dog` / `petsMetrics cat` | 对应 Hub 页 | Hub 页 `CollectionPage` JSON-LD |
| `is petsMetrics legit` | About 页（未来）/ Trustpilot 页 | 不写"legit"型内容 → 靠第三方评价回答 |
| `petsMetrics free` | 首页（Hero CTA 含 "Free"） | `keywords` 含 "free" |

### 19.3 品牌提及监控

即使没有超链接，品牌在网络上被"提及"（Brand Mention）也是 Google 排名信号。需要监/控以下平台：

| 监控平台 | 监控工具 | 动作 |
|---------|---------|------|
| Reddit（r/dogs, r/cats, r/puppy101） | Google Alerts: `petsMetrics` | 每条提及回复感谢，引导用户提供反馈 |
| 宠物博客 | Ahrefs Content Explorer: `petsmetrics.com` | 提及但无链接 → 礼貌请求添加链接 |
| 社交媒体 | Brand24 / Mention（免费版） | 收集用户好评用于首页展示 |
| Q&A 平台（Quora, Stack Exchange Pets） | Google Alerts | 回答宠物健康问题并自然引用工具 |

---

## 20. 启动日执行优先级清单（P0 — 上线日逐项执行）

> 以下清单按时间顺序排列，每项标注执行窗口和完成标准。确保上线日当天所有 P0 动作已完成，P1 动作已排期。

### 20.1 上线前 7 天（Pre-Launch）

- [ ] **T-7：GSC 域名验证** — Google Search Console 添加 `petsmetrics.com` 属性（DNS TXT 记录验证）
- [ ] **T-7：OG 图完整集** — 14 个工具页 + 2 个 Hub + 首页 OG 图（1200×630）放置于 `/public/og/`
- [ ] **T-7：分析工具部署** — Google Analytics / Plausible 代码集成到 `layout.tsx`
- [ ] **T-7：错误页面** — `not-found.tsx` 和 `error.tsx` 完成，404 页面含搜索框和导航链接
- [ ] **T-6：JSON-LD 全量验证** — 每个页面类型的 JSON-LD 通过 [Rich Results Test](https://search.google.com/test/rich-results)
- [ ] **T-5：Vercel 部署预演** — CI/CD 流程确认，生产环境 SSG 构建成功
- [ ] **T-4：跨浏览器视觉检查** — Chrome / Safari / Firefox / Mobile Safari 全量页面
- [ ] **T-3：PageSpeed 达标** — 首页 LCP < 2.5s，工具页 LCP < 2.5s，CLS < 0.1
- [ ] **T-2：robots.txt / sitemap 公开验证** — 生产环境 `robots.txt` 和 `sitemap.xml` 可公开访问
- [ ] **T-1：Product Hunt 预提交** — Product Hunt 页面草稿就绪，准备上线日发布

### 20.2 上线日（Launch Day — 按时间顺序）

- [ ] **Hour 0：DNS 切换** — 域名指向 Vercel，确认 SSL 证书生效
- [ ] **Hour 0：GSC sitemap 提交（第 1 批）** — 仅提交首页 + Hub + 档案 + legal（6 URL）
- [ ] **Hour 1：Google Search Console URL Inspection** — 手动请求首页和 2 个 Hub 页的索引
- [ ] **Hour 2：Product Hunt 发布** — 上线 Product Hunt，标题 "petsMetrics — Free science-based pet calculators"
- [ ] **Hour 4：Reddit 发帖** — r/dogs 和 r/cats 发布 "I built a free set of pet calculators, feedback welcome"（真诚语气，非硬广）
- [ ] **Hour 6：Pinterest 首针** — 固定年龄计算器和 BCS 信息图到 Pinterest
- [ ] **Day 1 结束前：监控** — GSC 检查索引状态、GA 检查实时访客、Rollbar 检查前端错误

### 20.3 上线后第 1 周（Post-Launch）

- [ ] **Day 3：提交第 2 批 sitemap URL** — 10 个 P0 工具页
- [ ] **Day 5：Trustpilot 注册** — 创建品牌档案，邀请 Product Hunt 用户评价
- [ ] **Day 7：Google Business Profile 创建**
- [ ] **Day 7：GSC sitemap（第 3 批）** — 50 个高搜索量毒性落地页
- [ ] **Day 7：首周数据分析** — GA：跳出率、平均停留时间、Top 5 着陆页；GSC：索引覆盖率、首批关键词排名

### 20.4 上线后第 1 个月（Month 1）

- [ ] **Week 2：提交第 4 批 sitemap URL** — 50 个中等搜索量毒性落地页
- [ ] **Week 2：联系 20 个宠物博主** — 提供 Embed 代码
- [ ] **Week 3：提交第 5 批 sitemap URL** — 100 个低搜索量毒性落地页
- [ ] **Week 3：HARO / Connectively 注册** — 开始定期回应宠物健康类媒体采访请求
- [ ] **Week 4：P1 工具页上线** — BARF 计算器 + 保险估算器（如属于 P1）
- [ ] **Week 4：月度 SEO 复盘** — GSC 全量数据、排名追踪、索引覆盖率 > 90%

---

## 21. SEO 与 GEO 和关键词分析的边界

| 文档 | 职责 | 不要混入 |
|------|------|---------|
| **seo-checklist.md**（本文件） | 传统搜索引擎优化策略（含 Image SEO、内容衰减、上线审计、SpamBrain 防护、品牌查询优化） | Knowledge Section、AI 摘录优化 |
| **[geo-checklist.md](geo-checklist.md)** | AI 搜索引擎（Perplexity / ChatGPT / Google AI Overview）摘录优化 | sitemap、hreflang、robots.txt |
| **[seo-keyword-gap-analysis.md](seo-keyword-gap-analysis.md)** | 关键词缺口分析与埋词路线图 | 技术实现细节、JSON-LD 规范 |
