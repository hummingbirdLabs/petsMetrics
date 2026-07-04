# GEO 强制清单

> GEO = Generative Engine Optimization — 面向 AI 搜索引擎（Google AI Overview / Perplexity / ChatGPT Search / Bing Copilot）的摘录优化。
> 每个新工具页面上线前必须逐项完成。传统 SEO 策略见 [seo-checklist.md](seo-checklist.md)，关键词缺口分析见 [seo-keyword-gap-analysis.md](seo-keyword-gap-analysis.md)。

---

## 0. GEO 覆盖范围

GEO 是**全工程统一策略**，覆盖 `petsmetrics.com` 下所有面向用户与爬虫的 SSG 预渲染页面。

### 0.1 全量页面清单

| 页面类型 | 路由 | 数量 | 优先级 |
|---------|------|------|--------|
| **首页** | `/` | 1 | P0 |
| **Hub 页** | `/dog/`、`/cat/` | 2 | P0 |
| **工具页 — 狗狗** | `/dog/calorie-calculator/`、`/dog/age-calculator/`、`/dog/gestation-calculator/`、`/dog/vaccination-schedule/`、`/dog/puppy-growth-predictor/` | 5 | P0 |
| **工具页 — 猫咪** | `/cat/age-calculator/`、`/cat/gestation-calculator/`、`/cat/vaccination-schedule/`、`/cat/bcs-weight-tracker/`、`/cat/hydration-calculator/` | 5 | P0 |
| **工具页 — 共享** | `/shared/toxic-checker/`、`/shared/eu-pet-travel-checker/`、`/shared/barf-calculator/`、`/shared/pet-insurance-estimator/` | 4 | P0/P1 |
| **档案页** | `/profile/` | 1 | P0 |
| **法律页** | `/privacy/`、`/terms/` | 2 | P0 |

> **总计**：14 个工具入口 + 2 个 Hub + 3 个辅助页，所有页面对 AI 爬虫 SSG 预渲染可见。

### 0.2 范围原则

- **不遗漏**：任何 `petsmetrics.com` 下的 SSG 页面都属于 GEO 优化范围。新增工具/页面时必须在路由注册后同步执行本清单。
- **与 SEO 的关系**：SEO 侧重传统搜索引擎排名（sitemap、metadata、canonical），GEO 侧重 AI 搜索引擎摘录（结构化内容 + 权威引用 + JSON-LD），两者互补。

### 0.3 GEO 与宠物健康品类特殊性

宠物健康在 GEO 中面临三类特殊挑战和优势，需在优化策略中充分利用：

| 维度 | 说明 | GEO 影响 |
|------|------|---------|
| **YMYL 内容** | Google 将健康相关信息归类为 "Your Money or Your Life"，审核比普通工具站严格 10 倍 | 权威引用（ASPCA、AAHA、AVMA）是摘录的必要条件，非充分条件 |
| **可验证性** | 卡路里公式（AAFCO MER）、年龄换算（UCSD 研究）、怀孕天数均为公开可查数据 | AI 搜索引擎更倾向摘录"可被外部验证"的事实陈述 |
| **高搜索量** | "can dogs eat grapes" 月搜索量 50k+，信息意图极强 | AI Overview 截流是核心战场，因为用户要的是即时答案而非点击链接 |
| **法规边界** | 不可诊断、不可开药、不可替代兽医建议 | GEO 内容务必以 "This is not veterinary advice" 开头/结尾，否则有合规风险 |
| **权威来源丰富** | ASPCA、AVMA、AAHA、WSAVA、AAFCO 提供免费公开的原始数据 | `citation[]` 可从权威机构中选用 2-4 条，E-E-A-T 信号远超竞品 |

> **核心认知**：宠物健康品类在 GEO 中的"天花板"高于普通工具，但准入门槛也更高。竞品（PetMD、AKC、ASPCA）大多缺乏结构化 GEO 意识，这正是我们的不对称竞争优势窗口。

### 0.4 AI 爬虫访问策略（P0 — 确保页面可被 AI 爬虫索引）

AI 搜索引擎的摘录能力**直接取决于其爬虫能否访问页面**。`robots.txt` 必须包含以下 AI 爬虫的 Allow 指令：

| AI 爬虫 | User-Agent Token | 用途 | 策略 |
|---------|-----------------|------|:---:|
| **Google-Extended** | `Google-Extended` | 控制 Google AI Overview / Gemini 训练数据 | **Allow** — Disallow 会导致 AI Overview 中完全消失 |
| **OpenAI GPTBot** | `GPTBot` | ChatGPT Search 索引 | **Allow** |
| **PerplexityBot** | `PerplexityBot` | Perplexity 引用源 | **Allow** |
| **Anthropic Claude** | `Claude-Web` | Claude 浏览模式 | **Allow** |
| **Common Crawl** | `CCBot` | 多模型训练数据集来源 | **Allow** |

**robots.ts 参考实现**：

```ts
// src/app/robots.ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Claude-Web', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
      { userAgent: '*', disallow: ['/_next/', '/api/'] },
    ],
    sitemap: 'https://www.petsmetrics.com/sitemap.xml',
  };
}
```

> **关键**：Google-Extended 需特别关注。该爬虫专门控制内容是否用于 Gemini 和 Google AI Overview 的答案合成——如果 Disallow，petsmetrics 将在 Google AI Overview 中被完全排除，损失最大份额的 AI 搜索流量。

---

## GEO 策略总结

### 核心原理

AI 搜索引擎与传统搜索引擎的关键差异：

| 维度 | 传统 SEO（Google 10 蓝链） | GEO（AI 搜索引擎） |
|------|-------------------------|-------------------|
| **输出形态** | 排名链接列表 | 合成摘要 + 引用块 |
| **内容消费** | 用户点击进入页面 | AI 直接摘录文字，用户不离开搜索界面 |
| **权威信号** | 外链数量 + Domain Authority | **引用来源的权威性** + 结构化数据 |
| **内容偏好** | 关键词密度 + 新鲜度 | **结构化事实陈述** + 可验证引用 + 自然语言问答 |
| **交互组件** | 用户可在页面上操作 | **纯 React 交互组件不被摘录**，只取 SSG 文本 |

### petsMetrics GEO 三层结构

```
┌─────────────────────────────────────────────────┐
│ 可见 HTML 层（AI 摘录的直接数据源）                │
│  ├─ Knowledge Cards（4 张/页，含权威外链）         │
│  ├─ FAQ Section（3-5 问答，自然语言，含关键词）     │
│  ├─ The Science Behind It（公式透明度，SSG 段落）   │
│  ├─ Emergency Hotlines（ASPCA 毒物热线，结构化）    │
│  ├─ Medical Disclaimer（合规信号，SSG 段落）        │
│  └─ Related Tools（场景化交叉链接卡）               │
├─────────────────────────────────────────────────┤
│ JSON-LD 结构化数据层（AI 搜索引擎理解页面语义）     │
│  ├─ SoftwareApplication + citation[]（工具页）    │
│  ├─ FAQPage（每个工具页）                         │
│  ├─ HowTo（工具操作步骤）                         │
│  └─ Organization + WebSite（品牌信任信号）         │
├─────────────────────────────────────────────────┤
│ 技术基础层（确保 AI 爬虫能完整抓取）               │
│  ├─ SSG (output: 'export') — 全预渲染             │
│  ├─ 所有文本在 HTML 源码中可见（非 JS 动态注入）     │
│  ├─ 内容新鲜度信号（sitemap lastModified）         │
│  └─ Canonical URL 一致性                          │
└─────────────────────────────────────────────────┘
```

### 分页面类型 GEO 策略矩阵

不同页面类型在 GEO 三层结构中的优化权重不同。下表定义每种页面类型**必须执行**（●）和**推荐执行**（○）的 GEO 元素：

| GEO 元素 | 工具页 | Hub 页 | 首页 | 档案页 | 法律页 |
|---------|:-----:|:-----:|:---:|:-----:|:-----:|
| **Knowledge Section**（4 卡片 + 权威外链） | ● P0 | — | — | — | — |
| **FAQ Section**（3-5 问答，与 JSON-LD 一致） | ● P0 | ○ | ○ | — | — |
| **The Science Behind It**（公式引用段落） | ● P0 | — | — | — | — |
| **HowTo JSON-LD**（≥ 3 步） | ● P0 | — | — | ● | — |
| **SoftwareApplication JSON-LD**（含 citation[]） | ● P0 | — | — | ● | — |
| **FAQPage JSON-LD** | ● P0 | ○ | ○ | — | — |
| **Medical Disclaimer**（SSG 段落，合规信号） | ● P0 | — | — | — | — |
| **Related Tools / Items**（交叉链接卡片） | ● P1 | — | — | — | — |
| **内容新鲜度信号**（sitemap + 方法论文本版本） | ● | ● | ● | ● | ● |
| **Organization JSON-LD** | — | — | ● | — | — |

> **优先级定义**：P0 = AI 摘录的直接数据源，缺失则大量丢失 AI 搜索流量；P1 = AI 信任信号与交叉引用，提升摘录概率与引用质量。

### 逐类型策略要点

#### 工具页（14 个入口）

这是 GEO 的**核心阵地**——用户在 AI 搜索引擎中搜索 "dog calorie calculator"、"cat age in human years"、"puppy vaccine schedule" 时，摘录直接来自工具页的结构化内容。

| 策略 | 说明 |
|------|------|
| Knowledge Section | 4 张卡片覆盖该工具的核心知识（如卡路里：What Is RER? What Is MER? What Is BCS? Why Use AAHA Formula?），每张含权威外链 |
| FAQ Section | 3-5 条自然语言问答，覆盖 "how to use" + "why this matters" 两类意图 |
| The Science Behind It | 公式推导段落（如 "RER = 70 × weight^0.75"），明确标注公式来源 |
| HowTo JSON-LD | 3 步操作流程（输入宠物数据 → 计算 → 读取结果），与页面 UI 引导一致 |
| SoftwareApplication JSON-LD | 含 `citation[]` ≥ 2 条，`offers.price: "0"` 标注免费 |
| Medical Disclaimer | "This tool provides general reference information only and does not constitute veterinary advice." |
| Related Tools | 场景化交叉推荐卡片 |

**工具页 Knowledge Section 卡片设计指南**：

| 工具 | 卡片 1 | 卡片 2 | 卡片 3 | 卡片 4 |
|------|--------|--------|--------|--------|
| 卡路里计算器 | What Is RER?（静息能量需求） | What Is MER?（维持能量需求） | Why AAHA Formula? | How Much Should I Feed My Dog? |
| 年龄计算器 | The 7-Year Rule Is Wrong | How UCSD Epigenetic Study Works | Small vs Large Breed Aging | What Are Dog Life Stages? |
| 疫苗计划 | Core vs Non-Core Vaccines | WSAVA Guidelines Explained | DHPP: What It Covers | Vaccine Schedule by Age |
| 怀孕计算器 | How Long Are Dogs Pregnant? | Canine Gestation Timeline | Ultrasound vs X-Ray: When? | Preparing a Whelping Box |
| BCS 体重追踪 | What Is Body Condition Score? | 9-Point BCS Scale Explained | Indoor Cat Obesity Statistics | How to Feel Your Cat's Ribs |
| EU 旅行检查器 | EU Pet Passport Explained | Rabies Vaccination Requirements | Microchip & ISO 11784/11785 | EU Countries List & Rules |
| BARF 计算器 | What Is BARF Diet? | 80-10-10 Ratio Explained | Raw Feeding Safety Guidelines | Bone-to-Meat Ratio |
| 保险估算器 | Pet Insurance Types | What Does Insurance Cover? | Annual vs Lifetime Policies | Pre-existing Conditions |

#### Hub 页（`/dog/`、`/cat/`）

Hub 是**品类导航意图的 GEO 入口**。AI 搜索 "dog health tools" 或 "cat calculator" 时摘录 Hub 页。

| 策略 | 说明 |
|------|------|
| CollectionPage JSON-LD | 列出所有工具名称与链接（SEO 侧已有实现） |
| FAQPage JSON-LD | 可选，覆盖 "What tools are available for dogs" 类问答 |
| Privacy Statement | SSG 段落声明所有工具本地计算、无数据上传 |

#### 首页（`/`）

首页是**品牌词 GEO 入口**。AI 搜索 "petsMetrics" 或 "free pet health calculator" 时摘录。

| 策略 | 说明 |
|------|------|
| Organization JSON-LD | 品牌名 + URL + 描述 |
| WebSite JSON-LD | 含 `SearchAction` |
| FAQPage JSON-LD | 可选，覆盖 "What is petsMetrics" 类问答 |
| Privacy Statement | 强调 "One profile. All answers. No login. Just science." |

---

## 1. Knowledge Section（P0 — GEO 核心内容源）

每个工具页 **必须** 包含一个 Knowledge Section。这是 AI 搜索引擎摘录的最直接数据源。

### 1.1 卡片规范

| 字段 | 要求 | 示例 |
|------|------|------|
| 标题 | "What Is X" / "How Is Y Calculated" 格式，直接覆盖用户搜索意图 | "What Is MER (Maintenance Energy Requirement)?" |
| 正文 | 80-150 字纯文本，SSG 预渲染，含关键数字和定义 | "MER is the daily energy a dog needs to maintain... calculated as RER × activity factor." |
| 外链 | 至少 1 条权威来源（`target="_blank" rel="noopener noreferrer"`） | AAFCO Guidelines → aafco.org |
| 布局 | 4 列网格（`sm:grid-cols-2 lg:grid-cols-4`），Glassmorphism 卡片 | `bg-white/80 backdrop-blur-sm border border-white/20` |

### 1.2 权威来源库（宠物健康垂类专用）

GEO `citation[]` 和 Knowledge Card 外链优先从以下机构选用：

| 机构 | 适用领域 | 网址 | DA |
|------|---------|------|----|
| **ASPCA** | 毒性数据、宠物毒物控制 | aspca.org | 82 |
| **AVMA** | 疫苗、综合兽医指南 | avma.org | 76 |
| **AAHA** | 犬类生命阶段、疫苗指南 | aaha.org | 68 |
| **WSAVA** | 全球疫苗标准 | wsava.org | 61 |
| **AAFCO** | 宠物食品与营养标准 | aafco.org | 59 |
| **AAFP** | 猫科生命阶段、疫苗指南 | catvets.com | 55 |
| **UCSD** | 犬类年龄甲基化研究 | ucsd.edu | 89 |

> **GEO 原理**：AI 搜索引擎在合成答案时，优先选择含有 **明确权威引用** 的结构化文本。Knowledge Card 的"标题 + 正文 + 外链"三元组恰好匹配 AI 模型的引用块格式。

---

## 2. FAQ Section（P0 — AI 问答摘录源）

每个工具页必须包含 FAQ Section，与 `FAQPage` JSON-LD 一一对应。

### 2.1 FAQ 规范

| 要求 | 说明 |
|------|------|
| 数量 | 工具页 3-5 条 |
| 问题措辞 | **自然语言疑问句**，尽可能匹配用户实际搜索方式（如 "Can dogs eat grapes?"、"How many calories should my dog eat?"） |
| 答案文本 | 150-300 字，**必须包含工具名称或关键词**，提供具体可验证的信息 |
| 渲染方式 | SSG 预渲染的 `<details>` / accordion，**不能依赖 JS 动态注入文本** |
| 与 JSON-LD 一致 | FAQ 可见文本必须与 `FAQPage` JSON-LD 的 `mainEntity` 一字不差 |

### 2.2 JSON-LD FAQPage

```tsx
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Can dogs eat grapes?",  // 与可见 DOM 文本完全一致
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No, grapes are highly toxic to dogs and can cause acute kidney failure..."
      },
    },
    // ... 3-5 条
  ],
};
```

### 2.3 按工具类型的 FAQ 示例

| 工具 | FAQ 问题示例 |
|------|-----------|
| 卡路里计算器 | "How many calories does my dog need per day?"、"What is the difference between RER and MER?" |
| 年龄计算器 | "How old is my dog in human years?"、"Is the 7-year rule accurate?" |
| 疫苗计划 | "What vaccines does my puppy need?"、"How often does my dog need rabies vaccine?" |
| 怀孕计算器 | "How long are dogs pregnant?"、"When can you confirm a dog pregnancy?" |
| BCS 体重 | "Is my cat overweight?"、"What is a healthy weight for my cat?" |
| 毒性检测器 | "Can dogs eat chocolate?"、"What plants are toxic to cats?" |
| EU 旅行 | "What documents do I need to travel with my dog to Europe?" |
| BARF | "How much raw food should I feed my dog?" |

---

## 3. HowTo JSON-LD（P0 — 操作类页面强制）

每个工具页和档案页必须具备 HowTo JSON-LD，覆盖使用工具的核心操作流程。

### 3.1 规范

| 要求 | 说明 |
|------|------|
| 步数 | ≥ 3 步 |
| 步骤命名 | `step[].name` 为动宾短语（如 "Enter your dog's weight"），`step[].text` 为完整描述 |
| 与 UI 一致 | 步骤名称应与页面上可见的 "How It Works" 引导匹配 |

### 3.2 代码模式

```tsx
const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Use the Dog Calorie Calculator",
  "description": "Calculate your dog's daily calorie needs using the AAFCO MER formula.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Enter your dog's weight",
      "text": "Input your dog's current weight in kg or lb. If your pet profile exists, weight is auto-filled.",
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Select activity level",
      "text": "Choose from: puppy, active adult, neutered adult (typical), weight loss, senior, or working dog.",
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "View daily calorie results",
      "text": "Get your dog's RER, MER, and daily food amount. The formula is shown transparently with AAFCO references.",
    },
  ],
};
```

---

## 4. SoftwareApplication JSON-LD（P0 — 工具页必须）

每个工具页和档案页必须具备 `SoftwareApplication` JSON-LD，含 `citation[]` 权威引用。

### 4.1 规范

```tsx
const softwareAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",     // 非 "WebApplication"
  "name": "Dog Calorie Calculator",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Any",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "description": "Browser-based dog calorie calculator using the AAFCO MER formula. No data leaves your device.",
  "url": "https://www.petsmetrics.com/dog/calorie-calculator/",
  "citation": [
    {
      "@type": "CreativeWork",
      "name": "AAHA Canine Life Stage Guidelines",
      "url": "https://www.aaha.org/aaha-guidelines/life-stage-canine-2021/",
    },
    {
      "@type": "CreativeWork",
      "name": "AAFCO Dog Food Nutrient Profiles",
      "url": "https://www.aafco.org/",
    },
    // ... ≥ 2 条引用
  ],
};
```

### 4.2 `@graph` 集成（一页多 JSON-LD）

当一个页面需要多个 JSON-LD 类型时，使用 `@graph` 数组合并：

```tsx
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    softwareAppJsonLd,
    faqJsonLd,
    howToJsonLd,
  ],
};
```

---

## 5. Medical Disclaimer（P0 — 合规 + AI 信任信号）

每个工具页 **必须** 包含标准医疗免责声明。这是 Google 对 YMYL 内容的硬性要求，也是 AI 搜索引擎判断内容可信度的信号。

### 5.1 免责声明标准文本

```html
<section aria-label="medical-disclaimer">
  <p>
    <strong>Medical Disclaimer:</strong>
    This tool provides general reference information only and does not 
    constitute veterinary advice, diagnosis, or treatment. Always consult 
    a licensed veterinarian for decisions regarding your pet's health.
  </p>
</section>
```

### 5.2 合规边界声明

> **始终传达但不要暗示诊断能力**。AI 搜索引擎会读取这个文本，出现在 AI Overview 中时为品牌提供法律保护。

---

## 6. 内容新鲜度信号（全站 P1）

| 信号 | 实现 | 作用 |
|------|------|------|
| `sitemap.lastModified` | `new Date()` 构建时动态值 | Google 爬虫新鲜度判断 |
| 工具页方法论文本 | 标注公式来源年份（如 "AAHA 2021 Canine Life Stage Guidelines"） | AI 摘录时显示年份增加可信度 |
| 年度数据内容 | "2026 Most Common Pet Toxins Report" 类年度内容 | 媒体反链 + 内容新鲜度 |

---

---

## 7. 实体优化（P0 — Knowledge Graph 对接）

> AI 搜索引擎在合成答案时，不仅读取页面内容，还会解析页面中的 **实体**（Entities）及其关系。Google Knowledge Graph、Perplexity 的实体提取层都在解析页面的实体信号。在宠物健康垂类中，正确的实体标记意味着 AI 引擎可以将 petsMetrics 与 ASPCA、AAHA 等权威实体关联。

### 7.1 核心实体定义

petsMetrics 必须在全站一致地标记以下实体层次：

| 实体层级 | 实体名称 | Schema 标记 | 出现页面 |
|---------|---------|-----------|---------|
| 组织 | `petsMetrics` | `Organization` | 首页、About（未来） |
| 软件应用 — 工具 | `Dog Calorie Calculator` 等 | `SoftwareApplication` | 每个工具页 |
| 物种 | `Dog`、`Cat` | `DefinedTerm`（可选） | Hub 页 |
| 健康主题 | 各工具涵盖的医学主题 | `MedicalScholarlyArticle`（不适用）→ 改用 `Article` + `citation[]` | 工具页 |
| 权威来源 | ASPCA、AAHA、WSAVA、AAFP | `citation[].CreativeWork` | 所有页面 |

### 7.2 `sameAs` 关联策略

`Organization` JSON-LD 中必须添加 `sameAs` 属性，将品牌与外部权威 Profile 关联，增强 Knowledge Graph 实体置信度：

```tsx
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "petsMetrics",
  "url": "https://www.petsmetrics.com/",
  "sameAs": [
    // 上线后逐步补充——每个通过验证的社交 Profile 增加实体置信度
    "https://www.producthunt.com/@petsmetrics",   // Product Hunt 发布后添加
    "https://www.pinterest.com/petsmetrics",       // Pinterest 创建后添加
    "https://www.reddit.com/user/petsmetrics",     // Reddit 活跃后添加
    "https://github.com/petsmetrics"               // 开源仓库（如 Embed 代码）
  ]
};
```

> **GEO 原理**：Perplexity 和 Google AI Overview 在实体解析时，`sameAs` 列表中的 URL 被视为"同一实体"的独立证明，有助于提升品牌在 AI 答案中的可信度和出现频率。

### 7.3 品种实体关联（未来增强）

未来可以利用 `DefinedTerm` 或 Wikidata 实体 ID 标记狗的品种：

```tsx
// 当用户选择了特定品种时，在页面上输出这段 JSON-LD
{
  "@type": "DefinedTerm",
  "name": "Golden Retriever",
  "inDefinedTermSet": "AKC Dog Breeds",
  "sameAs": "https://www.wikidata.org/wiki/Q39477"  // Golden Retriever Wikidata
}
```

这是进阶 GEO 策略，v1 上线时不需要，但为品种特定的年龄换算、生长预测等页面预留。

---

## 8. 零点击内容策略（P1 — AI 搜索时代的流量逻辑）

> AI 搜索引擎的核心矛盾：**它引用你的内容，但用户不点击你的链接**。在 Google AI Overview 和 Perplexity 中，60-80% 的查询是"零点击"——用户直接在 AI 摘要中获得答案后离开。传统 SEO 视此为威胁，GEO 视此为 **品牌权威建设机会**。

### 8.1 零点击 vs 点击型查询分类

petsMetrics 必须区分两类查询，采取不同策略：

| 查询类型 | 特征 | 策略 | 示例 |
|---------|------|------|------|
| **纯信息查询** | 用户只需要答案，不需要工具交互 | 优化零点击答案（在 AI 摘要中提供完整权威答案），同时通过 `citation[]` 确保被正确引用 | "how long are dogs pregnant?"、"are lilies toxic to cats?" |
| **工具意图查询** | 用户需要输入数据、获得个性化结果 | 优化摘要作为"诱饵"，**必须在摘要末尾包含 CTA** 引导点击 | "dog calorie calculator"、"puppy growth predictor" |
| **导航查询** | 用户搜索品牌/品类 | 优化品牌实体信息，确保 AI 返回正确的品牌描述和链接 | "petsMetrics"、"free dog health tools" |

### 8.2 零点击场景的品牌建设

即使零点击，品牌在 AI 摘要中被引用也是胜利——这是免费的高权威品牌曝光。最大化零点击场景的品牌价值：

1. **每个被引用的 Knowledge Card 必须在正文中包含品牌名**：`"petsMetrics uses the AAHA 2021 formula to calculate..."`——AI 引擎摘录时会保留品牌名。
2. **每个工具的计算结果页必须输出公式来源文字**：`"[PetName]'s daily MER: 584 kcal (calculated using the AAFCO formula via petsMetrics.com)"`——当用户截图分享结果时，品牌水印自然传播。
3. **Medical Disclaimer 必须包含品牌名**：`"This tool is provided by petsMetrics for general reference only..."`——AI 引用免责声明时同时传播品牌。

### 8.3 从零点击到点击的转化钩子

每个纯信息查询的页面底部必须有一个"下一步"钩子：

```html
<!-- 在 "how long are dogs pregnant" 答案下方 -->
<section aria-label="tool-cta">
  <p>
    Now that you know the timeline — use our 
    <strong>Dog Gestation Calculator</strong> to get 
    your dog's exact due date based on the mating date you observed.
  </p>
  <a href="/dog/gestation-calculator/" class="cta-button">
    Calculate Your Dog's Due Date →
  </a>
</section>
```

> **关键**：零点击答案 + CTA 是 AI 搜索时代的核心页面模式。不抗拒零点击，而是将其作为品牌权威建设的跳板。

---

## 9. AI Overview 专属优化战术（P1 — Google AI Overview 截流）

> Google AI Overview（AIO）是全球最大的 AI 搜索引擎前线。它在搜索结果顶部合成答案，优先从页面上的 **Knowledge Cards**、**FAQ**、**有序/无序列表** 中提取内容。以下战术专门针对 AIO 摘录优化。

### 9.1 AI Overview 内容偏好

| AIO 偏好 | 如何利用 |
|---------|---------|
| **短定义句**（40-60 字） | 每个 Knowledge Card 和 FAQ 答案用 `<strong>` 包裹核心定义句 |
| **编号列表**（`<ol>`） | "How to use X" 和 "What you need" 类内容优先用有序列表 |
| **表格数据** | 品种寿命对比表、疫苗时间表等用 `<table>` + `<caption>` |
| **可验证数字** | 所有公式结果附带具体数字（如 "63 days" 而非 "about two months"） |
| **权威引用** | 每个核心结论后直接跟括号引用来源（如 "(AAHA, 2021)"），与 JSON-LD citation 对应 |

### 9.2 AIO 优先级页面

以下页面的查询在 AIO 中出现率极高，必须最先完成 AIO 优化：

| 页面 | AIO 出现率 | AIO 覆盖查询 | 优化动作 |
|------|----------|-----------|---------|
| 怀孕计算器 | 🟠 70%+ | "how long are dogs pregnant" | 短定义句 + 有序列表（阶段时间线） |
| 年龄计算器 | 🟠 60%+ | "how old is my dog in human years" | 表格（品种 × 年龄对照） + 短定义 |
| 疫苗计划 | 🟡 40%+ | "puppy vaccine schedule" | 有序列表（时间线） + 表格 |
| BCS 体重追踪 | 🟡 30%+ | "is my cat overweight" | 有序列表（评估步骤） + 表格（评分标准） |

### 9.3 反 AIO "幻觉" 设计

AI Overview 有时会错误合成答案。减少幻觉的页面设计：

1. **结论前置**：每个 Knowledge Card 的第一句就是完整结论，不含模糊限定语。AI 引擎通常取摘要首句。
2. **数字优先**：`"Dogs are pregnant for 63 days"` 优于 `"The length of dog pregnancy is typically around two months"`——具体数字被 AI 错误改写的概率更低。
3. **否定句谨慎**：避免 `"This is not safe, but..."` 结构——AI 可能只截取前半句。改为 `"Dangerous — do not feed grapes to dogs. Even one grape can cause..."`

---

## 10. GEO 内容模板（P1 — 可复用的 AI 优化内容组件）

> 以下是为每个页面类型预先设计的 GEO 优化内容模板。开发时直接套用，确保全站 AI 搜索引擎摘录策略一致。

### 10.1 工具页 GEO 模板

```html
<!-- Knowledge Card 模板（重复 4 次） -->
<article class="knowledge-card">
  <h2>What Is [Term]?</h2>
  <p>
    <strong>[40-60 字精确定义]</strong> [80-100 字扩展说明，含具体数字和公式]。
    <cite>Source: <a href="[权威URL]">[机构名]</a></cite>
  </p>
</article>

<!-- FAQ 模板（重复 3-5 次） -->
<section aria-labelledby="faq-heading">
  <h2 id="faq-heading">Frequently Asked Questions</h2>
  
  <details>
    <summary><strong>[自然语言问题，匹配 PAA]</strong></summary>
    <p>
      <strong>[40-60 字直接答案]</strong>
      [100-200 字详细解释，含具体数字和数据引用]
    </p>
  </details>
  <!-- ... 3-5 条 -->
</section>

<!-- The Science Behind It 模板 -->
<section aria-labelledby="science-heading">
  <h2 id="science-heading">The Science Behind [Tool Name]</h2>
  <p>
    [100-150 字方法论文本，含公式名称 + 公式数学表达 + 来源年份]
    For example: "This calculator uses the AAFCO Maintenance Energy 
    Requirement (MER) formula: MER = RER × activity factor, where 
    RER = 70 × weight(kg)<sup>0.75</sup> (AAFCO, 2023)."
  </p>
  <p>
    <cite>References: 
      <a href="..." rel="noopener noreferrer">[权威来源 1]</a>, 
      <a href="..." rel="noopener noreferrer">[权威来源 2]</a>
    </cite>
  </p>
</section>
```

### 10.2 Hub 页 GEO 模板

```html
<h1>Free Dog Health Calculators & Tools</h1>
<p>
  <strong>One profile. All answers. No login.</strong> 
  Create a pet profile once and every dog calculator auto-fills 
  with your dog's data. All calculations run in your browser — 
  no data is ever uploaded to our servers.
</p>

<!-- 工具列表（有序，含每个工具的一句话描述） -->
<ol>
  <li>
    <a href="/dog/calorie-calculator/">Dog Calorie Calculator</a> — 
    Uses the AAFCO MER formula to determine your dog's daily calorie 
    and food portion needs.
  </li>
  <!-- ... 全部子工具 -->
</ol>
```

---

## 11. 引用多样性管理（P1 — 防止 AI 信任疲劳）

> AI 搜索引擎在多次看到同一权威来源后，对该来源的"独特性溢价"递减。如果所有 14 个工具页都只引用 ASPCA 和 AAHA，AI 引擎会将其视为模板化内容降权。必须管理引用多样性。

### 11.1 权威来源分配矩阵

每个工具页的 `citation[]` 来源应尽可能避免重复：

| 工具 | 首选引用 | 次选引用 | 第三引用（可选） |
|------|---------|---------|----------------|
| 狗狗卡路里计算器 | AAFCO — 营养标准 | AAHA — 体重管理指南 | AVMA — 宠物肥胖统计数据 |
| 狗狗年龄计算器 | UCSD — 表观遗传时钟 | AAHA — 犬类生命阶段 | Inoue et al. — 品种寿命研究 |
| 猫咪年龄计算器 | AAFP — 猫科生命阶段 | ISFM — 猫科老年护理 | O'Neill et al. — 猫寿命研究 |
| 狗狗怀孕计算器 | AAHA — 繁殖指南 | AVMA — 犬类繁殖 | Kustritz — 犬类妊娠超声 |
| 猫咪怀孕计算器 | AAFP — 猫科繁殖 | ISFM — 猫科繁殖指南 | Verstegen — 猫营养与繁殖 |
| 疫苗计划（狗） | WSAVA — 全球疫苗指南 | AAHA — 犬类疫苗 | AVMA — 疫苗原则 |
| 疫苗计划（猫） | WSAVA — 全球疫苗指南 | AAFP — 猫科疫苗 | ABCD — 猫科疾病指南 |
| 幼犬生长预测 | UCSD — 生长曲线 | AKC — 品种标准 | Hawthorne — 幼犬生长 |
| BCS 体重追踪 | WSAVA — BCS 指南 | AAFP — 猫科营养 | Laflamme — BCS 验证 |
| 水分计算器 | NRC — 营养需求 | AAFP — 猫科水分 | Anderson — 猫饮水行为 |
| EU 旅行检查器 | EU Regulation 576/2013 | USDA APHIS | UK DEFRA — 宠物旅行 |
| BARF 计算器 | NRC — 营养需求 | FEDIAF — 营养指南 | Freeman — 生食风险 |
| 保险估算器 | NAPHIA — 行业数据 | AVMA — 宠物保险统计 | Consumer Reports — 保险对比 |

### 11.2 引用新鲜度管理

| 规则 | 说明 |
|------|------|
| 每年核验 | 每年 Q1 检查每条外链是否仍有效（403/404 → 替换或移除） |
| 优先最新版 | AAHA 2021 > 2019 版，WSAVA 2024 > 2022 版——`citation[]` 中明确标注年份 |
| 引用轮换 | 当同一主题有多个等权威来源时，在不同相关工具页中交替使用（避免所有工具都指向同一 URL） |

### 11.3 过度优化的风险

> ⚠️ **不要在单个页面中堆砌超过 4 条权威引用**。Google AI Overview 的摘要模型会检测 `citation[]` 的异常密度，并可能将整个页面的权威信号降权。2-3 条精选引用优于 8 条低质量引用。


---

## 12. 多 LLM 测试协议（P0 — 上线前必须验证）

> **为什么重要**：GEO 不是"一次优化适用所有 AI 引擎"。Google AI Overview、Perplexity、ChatGPT Search、Bing Copilot 的内容提取模型各有偏好。同一个页面可能被 Perplexity 完美摘录但被 ChatGPT 完全忽略。必须在不同 AI 引擎上逐一验证。

### 12.1 LLM 平台摘录特性差异

| AI 引擎 | 摘录偏好 | 摘录长度 | 引用风格 | 独特敏感性 |
|---------|---------|---------|---------|-----------|
| **Google AI Overview** | 偏好短定义句 + 有序列表 + 表格数据 | 40-80 字摘要 | 侧边栏引用块（3-5 条） | 强烈偏好 `.gov`/`.edu`/权威组织域名 |
| **Perplexity** | 偏好详细段落 + 多源交叉验证 | 200-500 字完整答案 | 内联引用编号 `[1]` `[2]` | 偏好有 `citation[]` 且有多个独立来源的页面 |
| **ChatGPT Search** | 偏好对话式内容 + FAQ 格式 | 150-300 字自然语言 | 末尾来源列表 | 偏好 `sameAs` 和 `Organization` JSON-LD 中有关联实体的品牌 |
| **Bing Copilot** | 偏好结构化卡片 + 列表 + 图片 alt | 100-200 字摘要 | 侧边栏链接卡片 | 偏好 `BreadcrumbList` + 清晰的层级结构 |
| **Claude Web** | 偏好完整文章段落 + 学术引用 | 300-600 字详细答案 | 文末参考文献 | 偏好含方法论段落（"The Science Behind It"）和专业署名 |

### 12.2 逐平台测试清单

| 测试项 | 方法 | 通过标准 | 频率 |
|--------|------|---------|------|
| **Google AI Overview 摘录测试** | 在 Google Search 中输入目标查询（如 "dog calorie calculator"），观察 AIO 是否引用 petsMetrics | 品牌名出现在 AIO 摘要或引用块中 | 每个工具页上线后立即测试 |
| **Perplexity 引用测试** | 在 Perplexity 中输入 "use petsMetrics dog calorie calculator"，观察 `[citation]` 编号 | Perplexity 至少引用 1 条 petsMetrics 页面内容 | 每页上线后 |
| **ChatGPT Search 品牌关联** | 在 ChatGPT 中搜索 "petsMetrics"，观察品牌描述和链接 | ChatGPT 返回正确的品牌名、URL 和一行描述 | 上线后 1 个月内 |
| **Bing Copilot 结构化摘录** | 在 Bing Chat 中输入目标查询 | 结果中包含 petsMetrics 的 Knowledge Card 文字或列表 | 工具页上线后 |
| **交叉引用一致性** | 同一页面在 Perplexity、ChatGPT Search、Bing 中搜索同一查询 | 至少 2/3 平台正确引用 petsMetrics，无幻觉 | 每个工具页上线后 |

### 12.3 GEO 测试提示词模板

```
// 在 Perplexity 中测试——无痕模式下输入：
"Use the petsMetrics {Page Name} to {Task}. 
What result does it give? Cite specific numbers."

// 在 ChatGPT Search 中测试：
"What does petsMetrics say about {Topic}? 
Show me the exact formula and source."

// 在 Google 中测试（观察 AI Overview）：
{Natural user query like "how many calories does my dog need"}
// 观察是否有 AI Overview 出现 + 是否使用了 petsMetrics 作为来源
```

### 12.4 幻觉检测与修复

AI 引擎有时会错误归因——将竞品的内容标注为 petsMetrics 的来源。需要主动发现和修复：

| 幻觉类型 | 表现 | 修复方法 |
|---------|------|---------|
| **错误归因** | AI 摘要中使用 petsMetrics 的公式但标注 ASPCA 为来源 | 加强页面上的作者署名（"petsMetrics uses the AAFCO formula"）和 `citation[]` 自引用 |
| **数据扭曲** | AI 摘要中的数字与页面不一致 | 使用 `<strong>` 包裹关键数字，AI 更不易改写 |
| **品牌遗漏** | AI 摘要提供了宠物健康答案但不标注 petsMetrics 来源 | 在每个 Knowledge Card 正文首句包含品牌名 |
| **过时引用** | AI 引用快照而非实时页面 | 确保 `sitemap.lastModified` + `dateModified` 为最近日期 |

---

## 13. GEO 成功指标与 KPI 框架（P1 — 衡量 AI 搜索流量 ROI）

> **为什么重要**：传统 SEO 有成熟的 Google Analytics / GSC 指标，但 GEO 的流量路径不同——零点击摘要、品牌提及、AI 引用都不产生传统"访问量"。需要独立的 GEO KPI 衡量 ROI。

### 13.1 GEO 专属 KPI 矩阵

| KPI | 定义 | 测量工具 | 目标（上线后 6 个月） |
|-----|------|---------|-------------------|
| **AIO 引用率** | 在目标关键词的 Google AI Overview 中，petsMetrics 被引用的比例 | 手动抽样（Top 50 关键词，每月检视 AIO） | ≥ 30% 的关键词在 AIO 中引用 petsMetrics |
| **Perplexity 引用率** | Perplexity 回答中包含 petsMetrics `[citation]` 的比例 | 手动测试 Top 30 查询 | ≥ 50% |
| **品牌提及增长率** | 网络（Reddit、博客、社交媒体）中 "petsMetrics" 提及的月增长 | Google Alerts + Ahrefs Brand Mentions | ≥ 20% MoM（Month 3-6） |
| **GA "Direct / None" 中品牌词增长** | 用户直接搜索 "petsMetrics" 的流量趋势（包括 AI 引擎引导的搜索） | GA4 "品牌查询" 自定义报告 | ≥ 15% MoM |
| **零点击品牌曝光** | AI 摘要中出现品牌但无点击的估计次数 | 间接估算：工具页 CTR 下降 + 品牌搜索量上升 的组合信号 | 稳态后占比约 30-50% |
| **Embed 嵌入数** | 宠物博主嵌入 petsMetrics 工具的外部页面数 | 手动追踪 + 反链工具 | 50+ 嵌入（Month 6） |
| **Knowledge Panel 出现** | 搜索 "petsMetrics" 时 Google 是否展示 Knowledge Panel | 手动检视 | Month 3 前出现 |

### 13.2 GEO 流量归因模型

传统 GA 无法区分"用户在 AI 中看到答案 → 直接搜索品牌名 → 进入网站"和"用户自然想起品牌名 → 搜索进入"，但可通过以下组合信号间接推断：

| 信号组合 | 含义 |
|---------|------|
| 品牌搜索量 ↑ + 工具页直接访问 CTR ↓ | AI 截流零点击 → 用户通过品牌搜索回流（GEO 正在起作用） |
| 品牌搜索量 ↑ + 新用户占比 ↑ | 品牌在 AI 搜索引擎中被新用户发现 |
| "petsMetrics review" 搜索量 ↑ | 用户从 AI 摘要中了解品牌后进入评估阶段 |

> **重要**：GEO ROI 不能仅用传统流量数字衡量。一个零点击 AI 摘要中的品牌曝光，其价值约等于传统 SERP 排名 #1 的 30-50%（用户未点击但产生了品牌记忆）。这是 GEO 区别于 SEO 的核心认知。

### 13.3 月度 GEO 报告模板

```markdown
# GEO 月报 — [月份] [年份]

## 1. AI 搜索引擎引用率
| 平台 | 测试查询数 | 引用 petsMetrics | 引用率 | 上月引用率 | 变化 |
|------|----------|----------------|--------|----------|------|
| Google AI Overview | 50 | 18 | 36% | 30% | +6% |
| Perplexity | 30 | 16 | 53% | 48% | +5% |
| ChatGPT Search | 20 | 8 | 40% | 35% | +5% |

## 2. 品牌提及
- Reddit: +12 mentions → link requests sent: 4
- Pet blogs: +3 backlinks earned
- Google Alerts: +8 unlinked brand mentions

## 3. 零点击策略效果
- Top 3 零点击词: "how long are dogs pregnant" / "can dogs eat grapes" / "puppy vaccine schedule"
- 每个零点击词的品牌水印出现率: 100%

## 4. 本月修复
- [幻觉修复] 修复 Perplexity 对 "dog age chart" 的错误归因
- [引用更新] 更新 AAHA 2024 指南引用
```

---

## 14. 内容格式 A/B 实验策略（P1 — 持续优化 AI 摘录质量）

> **为什么重要**：GEO 不是一次性配置。AI 搜索引擎的摘录模型持续更新（Google AI Overview 每季度调整摘录算法），需要持续实验哪种内容格式在不同平台上摘录率最高。

### 14.1 可实验的内容变量

| 变量 | 实验方案 | 测量指标 |
|------|---------|---------|
| **Knowledge Card 字数** | 实验组：80 字 vs 对照组：150 字 | 哪个在 AI Overview 中被完整引用 |
| **FAQ 问题措辞** | 实验组：完整句子 "How many calories should I feed my Labrador?" vs 对照组：关键词式 "Labrador calorie needs" | Perplexity 引用率 |
| **表格 vs 列表** | 实验组：疫苗计划用 `<table>` vs 对照组：`<ul>` | List Snippet 捕获率 |
| **定义句位置** | 实验组：首句（H2 下第 1 个 `<p>`）vs 对照组：段中 | AI Overview 摘录率 |
| **引用标注风格** | 实验组：`"(AAHA, 2021)"` 括号式 vs 对照组：完整句子 `"According to the AAHA 2021 guidelines..."` | 被 AI 摘录后保留来源标注的完整度 |
| **CTA 钩子位置** | 实验组：答案段末尾 vs 对照组：页面底部独立区块 | 从 AI 答案到点击的转化率 |

### 14.2 实验执行框架

```
// 选择一个低流量工具页（如 /cat/hydration-calculator/）作为实验页
// 避免在核心流量页上进行实验以免影响主流量

Week 1-2: 部署实验版本（保留对照组截图 + HTML 存档）
Week 3: 测量 3 个 AI 平台上的变化
Week 4: 决策 — 推广至全站 or 回滚

实验追踪表格式：
| 实验编号 | 页面 | 变量 | 开始日期 | AIO引用率(前) | AIO引用率(后) | 决策 |
|---------|------|------|---------|------------|------------|------|
| GEO-001  | cat/hydration | FAQ 措辞 | 2026-07-01 | 20% | 60% | ✅ 推广 |
```

### 14.3 实验安全规则

- **禁止同时实验多个变量** — 无法归因效果
- **禁止在首页、Dog Hub、Toxic Checker 上进行实验** — 这些是核心流量入口
- **每次实验持续 ≥ 2 周** — AI 引擎有缓存延迟，1-2 天的变化不会被索引
- **每次实验需保留 HTML 快照** — 用于事后对比分析
- **实验前在 GSC 中请求页面重新索引** — 加速 AI 引擎发现内容变化

---

## 15. GEO 文档版本信息与边界说明

| 文档 | 职责 |
|------|------|
| **geo-checklist.md**（本文件） | AI 搜索引擎（Perplexity / ChatGPT / Google AI Overview）摘录优化（含实体优化、零点击策略、AIO 战术、内容模板、引用多样性管理、多 LLM 测试、KPI 框架、内容格式实验） |
| [seo-checklist.md](seo-checklist.md) | 传统搜索引擎优化策略（sitemap、hreflang、canonical、Core Web Vitals、Image SEO、内容衰减、SpamBrain 防护、品牌查询优化、上线审计） |
| [seo-keyword-gap-analysis.md](seo-keyword-gap-analysis.md) | 关键词缺口分析与埋词路线图（含语义聚类、PAA 挖掘、Featured Snippet、多语言预研） |

> **GEO 文档版本**: v1.3 | **最后更新**: 2026-07-03 | **变更**: 移除毒性落地页相关内容，章节重新编号
