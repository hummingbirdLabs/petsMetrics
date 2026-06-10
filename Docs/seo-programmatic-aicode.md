# Programmatic SEO — AI 编码任务书

> **版本**: v1.1 | **日期**: 2026-06-10  
> **受众**: AI 编码代理（Copilot Agent / Cursor）  
> **关联文档**: [seo-programmatic.md](seo-programmatic.md)（策略 Why/What，含 §0.5 全链路风险评估）、[geo-checklist.md](geo-checklist.md)（GEO 详细规范）  
> **执行顺序**: 严格按 **§R（风险缓解）→ §A → §B → §C → §D** 顺序。每个 Gate 完成前，**禁止进入后续任何任务**。

---

## Gate 系统（发布卡点）

每个 Gate 必须人工确认后才能解锁下一阶段。

| Gate | 解锁条件 | 阻塞的下游任务 |
|------|---------|--------------|
| **Gate-Risk** | `pnpm risk-check` 脚本零 FAIL；§R 全部任务完成 | 禁止进入 §A 任何任务 |
| **Gate-0** | §A 全部任务完成（About/Privacy/Terms 页已部署 + GEO 验证脚本无报错 + TASK-R0~R4 全部完成） | 禁止发布任何毒性落地页或工具内容页 |
| **Gate-Social** | 核心工具页（20 页）已上线 ≥ 3 天；Reddit 首发帖有真实互动（≥ 5 条评论） | 禁止发布毒性落地页 Batch 1（先上工具页获得社交信号，再发批量） |
| **Gate-1** | Batch 1 毒性页（50 页）Google Search Console 索引率 > 80% | 禁止发布 Batch 2 |
| **Gate-2** | Reddit 首发帖已发布且有真实互动（≥ 5 条评论）——若 Gate-Social 已满足，此处自动通过 | 禁止发布 Phase 2（Month 1 起）批量页面 |
| **Gate-DA10** | Domain Authority ≥ 10（Ahrefs 或 Moz 验证） | 禁止发布品种矩阵（§D） |
| **Gate-DA20** | Domain Authority ≥ 20 | 禁止执行 TASK-E2（competitor alternative 落地页） |
| **Gate-DA30** | Domain Authority ≥ 30 | 禁止执行 TASK-E1（结果静态化页面） |

> **关键变更（v1.1）**：新增 Gate-Risk（§R 风险缓解前置）和 Gate-Social（社交信号缓冲层），解决 R1/R4 风险。Gate-DA20 新增，解决 R11 风险。

---

## 全局编码约束（所有任务适用，违反即 build 失败）

| # | 约束 | 违反后果 | 验证命令 |
|---|------|---------|---------|
| **G1** | FAQ Section、Knowledge Section、Medical Disclaimer、The Science Behind It — 全部为 **Server Component**，顶部无 `'use client'` 指令 | GEO 文字对 AI 爬虫不可见，整个 GEO 策略归零 | `grep -r "'use client'" src/components/shared/FAQSection.tsx` 返回空 |
| **G2** | 所有 Programmatic 页面的 `title` 和 `meta description` 含具体内容关键词（食物名、品种名、国家名等），禁止泛化模板残留 | SpamBrain 批量模板检测触发 | `generateMetadata()` 单元测试 |
| **G3** | 毒性落地页 `dangerReason` / `symptoms` / `whatToDo` 等描述性字段：每个物品独立撰写，禁止跨物品复用文字 | 不可模板化内容占比下降，SpamBrain 风险上升 | 每批上线前 `pnpm check-content-uniqueness` |
| **G4** | 每个 Programmatic 页面不可模板化内容（独立于模板的数据内容）≥ 400 字 | 薄内容（Thin Content）判定 | `pnpm check-content-length` |
| **G5** | 所有健康声明后附可见来源行（`Source: ASPCA / AVMA / AAHA`），同时出现在 HTML 文本和 `citation[]` JSON-LD 中 | E-E-A-T 信号缺失，YMYL 可信度下降 | `curl <url> \| grep "Source:"` 非空 |
| **G6** | JSON-LD 使用 `@graph` 数组合并多个 Schema 类型，禁止多个独立 `<script type="application/ld+json">` 标签 | 结构化数据解析冲突 | Google Rich Results Test |
| **G7** | 狗页面 FAQ 和猫页面 FAQ 措辞不同，分别引用 AAHA/UCSD（狗）和 AAFP/ISFM（猫），禁止仅替换物种名称 | Google 将两组页面识别为重复内容 | `pnpm check-cross-species-diff` 相似度 < 30% |
| **G8** | 每页 `generateMetadata()` 包含 `alternates.canonical`，指向正确的 `SITE_URL` 路径 | Canonical 缺失导致爬虫权重分散 | `curl <url> \| grep "canonical"` |
| **G9** | 品种 × 工具矩阵：禁止为年龄换算、疫苗计划（公式相同维度）建立独立品种页；仅允许喂食指南、体重标准、健康风险三个维度建页 | SpamBrain 判定 Doorway Pages，品种矩阵触发域名级标记 | `pnpm check-breed-page-dimensions` |
| **G10** | EU 国家页：每个独立国家页的 `additionalInfo` + `specialRequirements` 合计 ≥ 150 字，且不能直接复制 EU 通用规则文本 | 不可模板化内容 < 60%，EU 批量页触发 SpamBrain | 每批上线前 `pnpm check-eu-uniqueness` |
| **G11** | `[competitor] alternative` 类落地页禁止在 DA < 20 之前创建（包括文件、路由、数据） | Helpful Content Update 判定新站薄内容比较页 | Gate-DA20 阻塞 |

---

## §R. Risk 缓解任务（Gate-Risk 前置，必须先于 §A 完成）

> 以下任务直接对应 [seo-programmatic.md §0.5](seo-programmatic.md) 识别的风险 R1–R13。§R 全部完成后才能进入 §A。

---

### TASK-R0: 全局风险自动化检查脚本

**对应风险**: R1、R5、R6、R7、R8、R9、R12、R13  
**状态**: ⬜ 未开始

**输出文件**: `scripts/risk-check.mjs`

**功能**: 构建后对 `out/` 目录和 `src/` 运行风险检查，输出 PASS / FAIL 报告。

```js
// scripts/risk-check.mjs（伪代码，AI 编码时实现完整版本）

const checks = [
  // R1: E-E-A-T Gate-0 基础
  { id: 'R1-about-aspca',       desc: 'About 页含 ASPCA 引用',           fn: () => htmlContains('out/about/index.html', 'ASPCA') },
  { id: 'R1-about-no-anon',     desc: 'About 页无匿名团队表述',           fn: () => !htmlContains('out/about/index.html', 'The Team') },
  { id: 'R1-privacy-storage',   desc: 'Privacy 页含 localStorage 声明',   fn: () => htmlContains('out/privacy/index.html', 'localStorage') },
  { id: 'R1-terms-disclaimer',  desc: 'Terms 页含兽医免责声明',           fn: () => htmlContains('out/terms/index.html', 'does not constitute veterinary advice') },

  // R5: GEO Server Component — 构建期文件检查
  { id: 'R5-faq-server',        desc: 'FAQSection 无 use client',         fn: () => !srcContains('src/components/shared/FAQSection.tsx', "'use client'") },
  { id: 'R5-knowledge-server',  desc: 'KnowledgeSection 无 use client',   fn: () => !srcContains('src/components/shared/KnowledgeSection.tsx', "'use client'") },
  { id: 'R5-disclaimer-server', desc: 'MedicalDisclaimer 无 use client',  fn: () => !srcContains('src/components/shared/MedicalDisclaimer.tsx', "'use client'") },
  // GEO SSG 可见性抽检
  { id: 'R5-faq-visible',       desc: '工具页 FAQ 文字在 HTML 源码可见',  fn: () => htmlContains('out/dog/age-calculator/index.html', 'FAQ') },

  // R6: Canonical 标签
  { id: 'R6-canonical',         desc: '毒性落地页有 canonical 标签',      fn: () => htmlContains('out/dog/can-dogs-eat-grapes/index.html', 'rel="canonical"') },

  // R7: sitemap lastModified 非 new Date()（检查源码）
  { id: 'R7-sitemap-fresh',     desc: 'sitemap.ts 毒性页 lastModified 引用 content-version', fn: () => srcContains('src/app/sitemap.ts', 'toxicDb.updatedAt') },

  // R9: 品牌钩子（3 位置）
  { id: 'R9-brand-knowledge',   desc: 'Knowledge Card 含 petsMetrics 品牌钩子', fn: () => htmlContains('out/dog/can-dogs-eat-grapes/index.html', 'petsMetrics Toxicology Guide') },
  { id: 'R9-brand-disclaimer',  desc: '免责声明含 petsMetrics',           fn: () => htmlContains('out/dog/can-dogs-eat-grapes/index.html', 'provided by petsMetrics') },

  // R12: robots.ts AI 爬虫配置
  { id: 'R12-robots',           desc: 'robots.ts 包含全部 5 个 AI 爬虫',  fn: () => ['Google-Extended','GPTBot','PerplexityBot','Claude-Web','CCBot'].every(b => srcContains('src/app/robots.ts', b)) },

  // R13: MedicalDisclaimer 共享组件存在
  { id: 'R13-disclaimer-exists', desc: 'MedicalDisclaimer 共享组件已创建', fn: () => fileExists('src/components/shared/MedicalDisclaimer.tsx') },
];
```

**package.json 追加**:
```json
"risk-check": "node scripts/risk-check.mjs",
"precheck": "pnpm build && pnpm risk-check && pnpm verify-geo"
```

**验收 checklist**:
- [ ] `pnpm risk-check` 所有检查项输出 PASS
- [ ] FAIL 项输出具体原因和修复建议
- [ ] Gate-Risk 条件：`pnpm risk-check` 零 FAIL

---

### TASK-R1: 跨物种工具页差异化验证脚本

**对应风险**: R3（跨物种重复内容）  
**状态**: ⬜ 未开始

**输出文件**: `scripts/check-cross-species-diff.mjs`

**功能**: 对所有跨物种页面对，提取 FAQ + Knowledge Section 纯文本，计算相似度，确保 < 30%。

**受检页面对与限值**:

| 狗页面 | 猫页面 | 最大允许相似度 |
|--------|--------|:------------:|
| `/dog/age-calculator/` | `/cat/age-calculator/` | 30% |
| `/dog/gestation-calculator/` | `/cat/gestation-calculator/` | 35% |
| `/dog/vaccination-schedule/` | `/cat/vaccination-schedule/` | 25% |

**强制差异化内容规范**（写入数据文件时遵守）:

| 维度 | 狗页面 | 猫页面 |
|------|--------|--------|
| **核心引用机构** | AAHA 2021 + UCSD Wang et al. 2020 | AAFP 2021 + ISFM（禁用 UCSD/AAHA） |
| **Knowledge Card 1** | "Why The 7-Year Rule Is Wrong" | "How Cat Aging Differs From Dogs" |
| **FAQ 核心问题** | "Do large dogs age faster than small dogs?" | "Does indoor vs outdoor lifestyle affect cat aging?" |
| **Science Section** | UCSD 甲基化曲线公式 + 大型犬 vs 小型犬差异 | AAFP 生命阶段划分表格（非公式）+ 室内猫寿命统计 |

**验收 checklist**:
- [ ] `pnpm check-cross-species-diff` 所有页面对相似度 < 设定限值
- [ ] 狗年龄计算器 FAQ 包含 "UCSD"；猫年龄计算器 FAQ 不出现 "UCSD"
- [ ] 狗疫苗计划包含 "DHPP"；猫疫苗计划包含 "FVRCP"

---

### TASK-R2: EU 国家页独特内容审计脚本

**对应风险**: R2（EU 国家页模板同质）  
**状态**: ⬜ 未开始

**输出文件**: `scripts/check-eu-uniqueness.mjs`

**功能**: 统计每个 EU 国家页的独特字段字数，并对 Batch 3 小国做"建页 vs 合并"决策。

**通过标准**:

| 批次 | 独特内容最低字数 | 不通过时的处理 |
|------|:---:|------|
| Batch 1（12 大国） | 200 字 | 阻塞发布，必须补充内容 |
| Batch 2（10 中等国） | 150 字 | 阻塞发布，必须补充内容 |
| Batch 3（5 小国） | 150 字 | 改为主页 Section，**不建立独立 URL** |

**小国已知独特规则（供内容撰写参考）**:
- **马耳他**：岛国隔离历史，现要求狂犬抗体滴度检测（titer test）+禁入 Pit Bull 等品种
- **塞浦路斯**：同为岛国，titer test 要求（出发前血检 ≥ 30 天）；最严格的岛国入境规则之一
- **卢森堡**：三国边境（法/德/比），跨境宠物有复杂多国过境规则，特别适合作"欧洲公路旅行"场景
- **拉脱维亚/立陶宛**：波罗的海国家，特定季节（夏季蜱虫季）有宠物健康声明要求

**验收 checklist**:
- [ ] `pnpm check-eu-uniqueness` Batch 1 和 Batch 2 全部通过
- [ ] Batch 3 中无法达标的国家改为主页 Section，无独立 URL
- [ ] 马耳他/塞浦路斯页面包含 "titer test" 关键词

---

### TASK-R3: MedicalDisclaimer 系统性共享组件

**对应风险**: R13（免责声明无系统性强制执行）  
**状态**: ⬜ 未开始

**输出文件**: `src/components/shared/MedicalDisclaimer.tsx`

**实现规范（Server Component，必须无 `'use client'`）**:

```tsx
// src/components/shared/MedicalDisclaimer.tsx
// 无 'use client' — Server Component
import { getTranslations } from 'next-intl/server';

type MedicalDisclaimerProps = {
  variant: 'tool' | 'toxic' | 'emergency';
};

export async function MedicalDisclaimer({ variant }: MedicalDisclaimerProps) {
  const t = await getTranslations('disclaimer');

  const variantClass: Record<typeof variant, string> = {
    tool:      'border-amber-200 bg-amber-50/80 text-amber-900',
    toxic:     'border-red-200 bg-red-50/80 text-red-900',
    emergency: 'border-red-500 bg-red-100 text-red-950 font-medium',
  };

  return (
    <aside
      role="note"
      aria-label="Medical Disclaimer"
      className={`mt-6 rounded-lg border p-4 text-sm ${variantClass[variant]}`}
    >
      <p>{t(variant)}</p>
    </aside>
  );
}
```

**messages/en.json 追加**（同步 PR 中必须包含）:
```json
"disclaimer": {
  "standard": "All calculations are based on published veterinary guidelines (AAHA, WSAVA, AAFCO, AAFP). Results are estimates.",
  "tool": "This tool is provided by petsMetrics for general reference only and does not constitute veterinary advice. Always consult a licensed veterinarian for health decisions.",
  "toxic": "This information is provided by petsMetrics for general reference only. This is NOT veterinary advice. If your pet has ingested a potentially toxic substance, contact your vet or ASPCA Poison Control at (888) 426-4435 immediately.",
  "emergency": "EMERGENCY: Call ASPCA Animal Poison Control (888) 426-4435 or your nearest emergency vet immediately. This information is provided by petsMetrics for general awareness only — do not delay treatment."
}
```

**强制使用规范**:
- 所有工具页模板（Server Component）在结果区块后必须包含 `<MedicalDisclaimer variant="tool" />`
- 所有毒性落地页模板必须包含 `<MedicalDisclaimer variant="toxic" />`
- 所有紧急行动指南页必须包含 `<MedicalDisclaimer variant="emergency" />`

**验收 checklist**:
- [ ] `grep -r "'use client'" src/components/shared/MedicalDisclaimer.tsx` 返回空
- [ ] `curl /dog/age-calculator/ | grep "does not constitute veterinary advice"` 非空
- [ ] `curl /dog/can-dogs-eat-grapes/ | grep "426-4435"` 非空（来自 Disclaimer + Emergency Banner 两处）
- [ ] messages/en.json 包含 `disclaimer.tool`、`disclaimer.toxic`、`disclaimer.emergency` 三个键

---

### TASK-R4: 品种页维度安全锁

**对应风险**: R8（品种矩阵公式相同维度建页触发 SpamBrain）  
**状态**: ⬜ 未开始

**输出文件**:
- `src/constants/breed-page-config.ts`（维度白名单/黑名单）
- `scripts/check-breed-page-dimensions.mjs`（验证脚本）

**维度白名单（仅允许这 3 个维度建独立品种页）**:
```ts
// src/constants/breed-page-config.ts
export const ALLOWED_BREED_PAGE_DIMENSIONS = [
  'feeding-guide',   // ✅ 每个品种体重不同，喂食量真实不同
  'weight-chart',    // ✅ AKC/TICA 品种标准中有独立体重范围数据
  'health-issues',   // ✅ 每个品种有遗传病倾向（不同数据）
] as const;

export const FORBIDDEN_BREED_PAGE_DIMENSIONS = [
  'age-calculator',   // ❌ UCSD 公式对所有品种相同，禁止建品种年龄页
  'vaccination',      // ❌ 疫苗时间线对所有品种完全相同
  'growth-predictor', // ❌ 仅按体型分 5 组（toy/small/medium/large/giant），不建品种专页
] as const;
```

**脚本逻辑**: 扫描 `src/app/dog/breeds/` 和 `src/app/cat/breeds/` 目录，检查是否存在黑名单维度的路由文件夹。

**验收 checklist**:
- [ ] `pnpm check-breed-page-dimensions` 零 FAIL
- [ ] `src/app/dog/breeds/[breed]/age-calculator/` **不存在**
- [ ] `src/app/dog/breeds/[breed]/vaccination/` **不存在**
- [ ] `src/constants/breed-page-config.ts` 中两个数组均有 TypeScript 类型约束

---

> 这 4 个任务是 **E-E-A-T 物理基础层**。任何一项未完成，均可能导致 200+ 毒性页和 14 个工具页被 Google 系统性拒绝索引。

---

### TASK-A1: E-E-A-T 信任页面三件套

**策略来源**: [seo-programmatic.md §0.4](seo-programmatic.md)  
**状态**: ⬜ 未开始

**输出文件**:
- `src/app/about/page.tsx` — Server Component + `generateMetadata()`
- `src/app/privacy/page.tsx` — Server Component + `generateMetadata()`
- `src/app/terms/page.tsx` — Server Component + `generateMetadata()`

**sitemap.ts 修改**:
- 追加 `/about/`（priority: 0.6）、`/privacy/`（priority: 0.3）、`/terms/`（priority: 0.3）

#### About 页内容规范

| 区块 | 内容要求 | 最低字数 |
|------|---------|---------|
| **H1** | `About petsMetrics` | — |
| **作者段落** | 真实姓名/笔名 + 一句话背景。示例：`"Built by [Name], a dog owner and developer. petsMetrics has been providing science-based pet health tools since 2026."` 禁止完全匿名。 | 50 字 |
| **方法论段落** | 说明所有计算器公式来源（AAHA、AAFCO、WSAVA、UCSD 研究）和毒性数据库来源（ASPCA 公开数据）。示例：`"All calorie formulas are based on the AAFCO 2023 Nutrient Profiles. Dog age conversion uses the UCSD epigenetic methylation study (Wang et al., 2020). Toxicity data is verified against the ASPCA Animal Poison Control Center database."` | 200 字 |
| **数据声明段落** | SSG 预渲染文字（**非** JS 动态），含：`"Toxicity information verified against ASPCA Animal Poison Control Center database and AVMA guidelines (last checked: June 2026)."` | 100 字 |
| **隐私声明段落** | `"All calculations run entirely in your browser. No pet data is uploaded to any server. Your pet profiles are stored only in your device's localStorage."` | 50 字 |
| **联系方式** | Email 地址或 GitHub 链接（至少一种，Google 需要知道"有人负责"） | — |

**Organization JSON-LD（首页已有，About 页复用或引用）**:
```ts
{
  "@type": "Organization",
  "name": "petsMetrics",
  "url": "https://petsmetrics.com",
  "description": "Free science-based health calculators for dogs and cats.",
  "founder": {
    "@type": "Person",
    "name": "[真实姓名或笔名]"
  }
}
```

**验收 checklist**:
- [ ] `curl https://petsmetrics.com/about/ | grep "ASPCA"` 返回 ≥ 2 处
- [ ] `curl https://petsmetrics.com/about/ | grep "localStorage"` 非空
- [ ] About 页正文含真实人名/笔名（非 "The Team" 等匿名表述）
- [ ] Privacy 页含 localStorage 声明和数据不上传声明
- [ ] Terms 页含标准免责声明（"does not constitute veterinary advice"）
- [ ] sitemap.ts 包含 `/about/`、`/privacy/`、`/terms/`

---

### TASK-A2: GEO SSG 可见性验证脚本

**状态**: ⬜ 未开始

**输出文件**: `scripts/verify-geo-ssg.mjs`

**功能**:
1. 读取 `out/` 目录中的 HTML 文件（或通过 `localhost:3000` 抓取）
2. 对每个工具页和毒性落地页检查以下关键词是否出现在原始 HTML 中（非 `__NEXT_DATA__` JSON 中，非 JS bundle 中）
3. 报告不通过的文件列表

**检查项**:
```js
const geoChecks = [
  { selector: 'Source: ASPCA',    required: ['toxic-landing-pages'] },
  { selector: '426-4435',         required: ['toxic-landing-pages'] },   // ASPCA 热线
  { selector: 'petsMetrics',      required: ['all'] },
  { selector: 'veterinary advice',required: ['all'] },                   // 免责声明
  { selector: 'FAQPage',          required: ['tool-pages', 'toxic-landing-pages'] }, // JSON-LD
  { selector: 'SoftwareApplication', required: ['tool-pages'] },
  { selector: 'citation',         required: ['tool-pages', 'toxic-landing-pages'] },
];
```

**package.json script 追加**:
```json
"verify-geo": "node scripts/verify-geo-ssg.mjs"
```

**验收 checklist**:
- [ ] `pnpm build && pnpm verify-geo` 对所有已构建页面无 FAIL 输出
- [ ] 脚本区分"工具页"和"毒性落地页"两类检查规则
- [ ] 脚本报告中包含不通过的具体文件路径

---

### TASK-A3: 内容新鲜度引擎

**策略来源**: [seo-programmatic.md §4.6 策略 13](seo-programmatic.md)  
**状态**: ⬜ 未开始

**输出文件**:
- `src/lib/data/content-version.ts`（类型定义 + 读取函数）
- `src/lib/data/content-version.json`（版本数据）

**content-version.json 结构**:
```json
{
  "toxicDb": {
    "version": "1.0.0",
    "updatedAt": "2026-06-10",
    "source": "ASPCA Animal Poison Control Center",
    "notes": "Initial database from ASPCA public data"
  },
  "toolMethodology": {
    "version": "1.0.0",
    "updatedAt": "2026-06-10",
    "sources": ["AAFCO 2023", "AAHA 2021", "WSAVA 2022", "UCSD Wang et al. 2020", "AAFP 2021"]
  },
  "euTravelRules": {
    "version": "1.0.0",
    "updatedAt": "2026-06-10",
    "source": "EU Regulation 576/2013 + national agriculture ministries"
  }
}
```

**content-version.ts 类型**:
```ts
export type ContentVersion = {
  toxicDb: { version: string; updatedAt: string; source: string; notes: string };
  toolMethodology: { version: string; updatedAt: string; sources: string[] };
  euTravelRules: { version: string; updatedAt: string; source: string };
};

export function getContentVersion(): ContentVersion; // 读取 content-version.json
```

**sitemap.ts 修改**:
```ts
// 修改前：
lastModified: new Date()

// 修改后（毒性落地页）：
import { getContentVersion } from '@/lib/data/content-version';
const cv = getContentVersion();
// 毒性落地页：
lastModified: new Date(cv.toxicDb.updatedAt)
// 工具页：
lastModified: new Date(cv.toolMethodology.updatedAt)
// EU 国家页：
lastModified: new Date(cv.euTravelRules.updatedAt)
// 首页/Hub：保持 new Date()
```

**验收 checklist**:
- [ ] `content-version.json` 存在且 JSON 格式合法
- [ ] `getContentVersion()` 有 TypeScript 返回类型，无 `any`
- [ ] `sitemap.ts` 中毒性落地页 `lastModified` 不再是 `new Date()`，而是读自 `content-version.json`
- [ ] `pnpm exec tsc --noEmit` 无报错

---

### TASK-A4: robots.ts AI 爬虫配置验证（已完成，仅核验）

**状态**: ✅ 已完成（`src/app/robots.ts` 已正确配置 5 类 AI 爬虫）

**核验命令**:
```bash
curl https://petsmetrics.com/robots.txt | grep -E "Google-Extended|GPTBot|PerplexityBot|Claude-Web|CCBot"
```
预期：返回 5 行，全部为 `Allow: /`。

---

## §B. Month 0 — 核心模板开发

> Gate-0 全部完成后才能开始本节。目标：为所有 Programmatic 页面建立 GEO-Programmatic 融合模板。

---

### TASK-B1: 毒性落地页 GEO-Programmatic 融合模板

**策略来源**: [seo-programmatic.md §4.1 策略 1](seo-programmatic.md)、[§4.3 策略 8](seo-programmatic.md)  
**状态**: ⬜ 未开始  
**发布节奏**: Batch 1 = 50 页（Month 0）/ Batch 2 = 40 页（Gate-1 + Gate-2 达成后）

#### 数据类型

```ts
// src/types/toxic.types.ts（追加，勿覆盖现有类型）

export type ToxicityStatus = 'toxic' | 'caution' | 'safe';

export type ToxicItem = {
  slug: string;
  name: string;
  species: 'dog' | 'cat' | 'both';
  status: ToxicityStatus;

  // === 以下字段：每个物品独立撰写，禁止跨物品复用 ===
  dangerReason: string;     // ≥ 80 字，解释为什么有毒/安全，含具体化学/生物机制
  symptoms: string[];       // ≥ 3 条，物品特有症状（非通用"呕吐"列表）
  whatToDo: string[];       // ≥ 3 步立即行动，第 1 步必须是"Call ASPCA"
  safeAmount?: string;      // 仅 'safe'/'caution' 状态填写
  timeToSymptoms?: string;  // 症状出现时间窗口（如 "within 6-12 hours"）

  // === GEO 内容字段 ===
  knowledgeCards: [
    { title: string; body: string },  // card 1: Why It's {status}
    { title: string; body: string },  // card 2: Key Symptoms / Signs
    { title: string; body: string },  // card 3: What to Do Right Now
  ];
  faqs: [
    { q: string; a: string },  // FAQ 1: "Can [species] eat [name]?"
    { q: string; a: string },  // FAQ 2: "What happens if [species] eats [name]?"
    { q: string; a: string },  // FAQ 3: "How much [name] is dangerous for [species]?"
  ];

  // === 来源与内链 ===
  primarySource: 'ASPCA' | 'AVMA' | 'Pet Poison Helpline';
  primarySourceUrl: string;  // 权威机构页面 URL（真实存在）
  relatedSlugs: string[];    // 3-5 个相关物品 slug（已有数据）
};
```

#### 模板组件（Server Component）

**输出文件**: `src/components/shared/ToxicLandingPage.tsx`

```
页面结构（从上到下，全部 SSG 预渲染）：

1. [H1] "Can Dogs Eat {name}? [{Status Badge}]"
   - Badge: 🚫 Toxic / ⚠️ Caution / ✅ Safe（文字 + 颜色）
   - H1 含目标关键词，不能仅是品牌名

2. [Emergency Banner]（status=toxic 时显示）
   - 背景红色，文字："If your dog ate {name}, call ASPCA now: (888) 426-4435"
   - 这行文字必须在 HTML 源码中可见

3. [Knowledge Section]（3 张卡片，Server Component）
   - 卡片 1：Why It's {status}（dangerReason 摘要，含权威外链）
   - 卡片 2：Symptoms to Watch（symptoms 列表）
   - 卡片 3：What to Do Now（whatToDo 步骤）
   - 布局：grid-cols-1 sm:grid-cols-3

4. [Source Line]（SSG 预渲染段落）
   - "Toxicity data sourced from {primarySource}. Last verified June 2026."
   - 含指向 primarySourceUrl 的 <a> 链接

5. [FAQ Section]（Server Component，使用 <details>/<summary>）
   - 3 条问答，文字在 HTML 源码中完全可见

6. [ASPCA Emergency Hotline]（SSG 段落）
   - "Poison Emergency? Call ASPCA Animal Poison Control: (888) 426-4435 (24/7)"
   - 电话号码必须是纯 HTML 文字（非 JS 渲染）

7. [Medical Disclaimer]（Server Component）
   - "This tool is provided by petsMetrics for general reference only.
      This is not veterinary advice. Contact your vet or ASPCA immediately
      if your pet has ingested a potentially toxic substance."

8. [Related Items]（3-5 个物品交叉链接）
   - 每个链接含简短说明（如 "Grapes and raisins share the same kidney toxin"）

9. ["Check Another Food" CTA]
   - 链接至 /shared/toxic-checker/（内链回流）
```

#### JSON-LD 规范（`@graph` 合并）

```ts
// generateMetadata() 返回的 JSON-LD 结构
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "headline": `Can Dogs Eat ${item.name}? [${item.status}]`,
      "datePublished": contentVersion.toxicDb.updatedAt,
      "dateModified": contentVersion.toxicDb.updatedAt,
      "author": { "@type": "Organization", "name": "petsMetrics" },
      "publisher": { "@type": "Organization", "name": "petsMetrics", "url": SITE_URL },
      "citation": [
        { "@type": "CreativeWork", "name": "ASPCA Animal Poison Control Center", "url": item.primarySourceUrl },
        { "@type": "CreativeWork", "name": "AVMA Pet Health", "url": "https://www.avma.org/resources/pet-owners" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": item.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": { "@type": "Answer", "text": faq.a }
      }))
    },
    {
      "@type": "ContactPoint",
      "contactType": "emergency",
      "telephone": "+1-888-426-4435",
      "name": "ASPCA Animal Poison Control Center",
      "availableLanguage": "English",
      "hoursAvailable": "Mo-Su 00:00-24:00"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
        { "@type": "ListItem", "position": 2, "name": "Dog", "item": `${SITE_URL}/dog/` },
        { "@type": "ListItem", "position": 3, "name": `Can Dogs Eat ${item.name}?`, "item": `${SITE_URL}/dog/can-dogs-eat-${item.slug}/` }
      ]
    }
  ]
};
```

#### 品牌钩子（必须注入所有 3 个位置）

| 位置 | 文字模式 | 目的 |
|------|---------|------|
| Knowledge Card 1 首句 | `"petsMetrics Toxicology Guide: {name} can cause..."` | AI 摘录时保留品牌名 |
| Medical Disclaimer 开头 | `"This tool is provided by petsMetrics for general reference only."` | AI 引用免责声明时传播品牌 |
| Source Line | `"...verified by petsMetrics using ASPCA data."` | 用户截图分享时品牌可见 |

#### SpamBrain 内容质量卡点

上线前每批抽检 5 页，人工确认：
- `dangerReason` 字数 ≥ 80 字且各页内容互不相同（不仅替换物品名）
- `symptoms` 列表中至少有 1 条是该物品特有（如 grapes→肾衰，xylitol→血糖骤降）
- 月搜索量 < 500 的冷门物品：`dangerReason` + `symptoms` + `whatToDo` 合计 ≥ 500 字，否则跳过该物品

**验收 checklist**:
- [ ] `curl /dog/can-dogs-eat-grapes/ | grep "petsMetrics"` ≥ 3 处
- [ ] `curl /dog/can-dogs-eat-grapes/ | grep "426-4435"` 非空
- [ ] `curl /dog/can-dogs-eat-grapes/ | grep "Source:"` 非空
- [ ] `curl /dog/can-dogs-eat-grapes/ | grep '"FAQPage"'` 非空（JSON-LD 存在）
- [ ] `curl /dog/can-dogs-eat-grapes/ | grep '"Article"'` 非空（JSON-LD 存在）
- [ ] `curl /dog/can-dogs-eat-grapes/ | grep "citation"` 非空
- [ ] 抽检 5 页：`dangerReason` 互不相同且 ≥ 80 字
- [ ] `generateMetadata()` 的 `title` 含食物名，`description` ≤ 160 字符
- [ ] `pnpm verify-geo` 通过所有检查项

---

### TASK-B2: 工具页 GEO 增强共享组件集

**策略来源**: [geo-checklist.md §1 Knowledge Section](geo-checklist.md)、[§2 FAQ Section](geo-checklist.md)  
**状态**: ⬜ 未开始

**输出文件（全部 Server Components）**:

```
src/components/shared/
  KnowledgeSection.tsx    — 4 卡片网格，含权威外链
  FAQSection.tsx          — <details>/<summary>，SSG 可见
  MedicalDisclaimer.tsx   — 标准免责声明段落
  ScienceSection.tsx      — 公式来源透明段落
  HowToSection.tsx        — 3 步操作说明（HowTo JSON-LD 配套）
  RelatedToolsCard.tsx    — 交叉推荐工具卡片
```

#### KnowledgeSection Props

```ts
// src/types/geo.types.ts（新文件）

export type KnowledgeCard = {
  title: string;        // "What Is {X}?" 或 "How Is {Y} Calculated?"
  body: string;         // 80-150 字纯文本，含关键数字和定义
  sourceLabel: string;  // 权威机构名（如 "AAFCO 2023 Guidelines"）
  sourceUrl: string;    // 权威机构页面 URL（真实存在）
};

export type KnowledgeSectionProps = {
  cards: [KnowledgeCard, KnowledgeCard, KnowledgeCard, KnowledgeCard];
  // 严格 4 张，工具页固定；毒性落地页允许 3 张（类型用 Tuple 约束）
};

export type FAQItem = {
  q: string;  // 自然语言疑问句，尽可能匹配实际搜索词
  a: string;  // 150-300 字，含工具名称或关键词，提供可验证信息
};

export type FAQSectionProps = {
  items: FAQItem[];           // 工具页 3-5 条，毒性落地页 3 条
  showJsonLd?: boolean;       // 默认 true，输出 FAQPage JSON-LD
};
```

#### FAQSection 实现约束（⚠️ 关键）

```tsx
// ✅ 正确：<details>/<summary> — 浏览器原生展开，文字在 HTML 中
export function FAQSection({ items }: FAQSectionProps) {
  return (
    <section>
      <h2>Frequently Asked Questions</h2>
      {items.map((item, i) => (
        <details key={i}>
          <summary>{item.q}</summary>
          <p>{item.a}</p>  {/* ← 这段文字在 HTML 源码中可见 */}
        </details>
      ))}
    </section>
  );
}

// ❌ 禁止：useState 控制显示 — 答案文字在 HTML 中不存在
'use client';
export function FAQSection({ items }) {
  const [open, setOpen] = useState<number | null>(null);
  return items.map((item, i) => (
    <div onClick={() => setOpen(i)}>
      {open === i && <p>{item.a}</p>}  {/* ← AI 爬虫看不到这里 */}
    </div>
  ));
}
```

#### 每个工具页 Knowledge Section 卡片内容（来自 geo-checklist.md）

| 工具 | 卡片 1 | 卡片 2 | 卡片 3 | 卡片 4 |
|------|--------|--------|--------|--------|
| 狗卡路里计算器 | What Is RER?（静息能量需求） | What Is MER?（维持能量需求） | Why AAHA Formula? | How Much Should I Feed My Dog? |
| 狗年龄计算器 | The 7-Year Rule Is Wrong | How UCSD Epigenetic Study Works | Small vs Large Breed Aging | What Are Dog Life Stages? |
| 猫年龄计算器 | How Cat Aging Differs from Dogs | AAFP Feline Life Stage Guidelines | Indoor vs Outdoor Cat Lifespan | What Are Cat Life Stages? |
| 狗疫苗计划 | Core vs Non-Core Vaccines | WSAVA Guidelines Explained | DHPP: What It Covers | Vaccine Schedule by Age |
| 猫疫苗计划 | Core vs Non-Core for Cats | AAFP/ISFM Feline Vaccine Guidelines | FVRCP: What It Covers | FeLV: Who Needs It? |
| 狗怀孕计算器 | How Long Are Dogs Pregnant? | Canine Gestation Timeline | Ultrasound vs X-Ray: When? | Preparing a Whelping Box |
| 猫怀孕计算器 | How Long Are Cats Pregnant? | Feline Gestation vs Canine | Queen Health During Pregnancy | Preparing a Kittening Box |
| 幼犬生长预测 | Puppy Growth Phases Explained | Small vs Large Breed Growth Curves | When Do Puppies Stop Growing? | Nutrient Needs by Growth Stage |
| 猫 BCS 追踪器 | What Is Body Condition Score? | 9-Point BCS Scale Explained | Indoor Cat Obesity Statistics | How to Feel Your Cat's Ribs |
| 猫水分计算器 | Why Hydration Matters for Cats | Dry vs Wet Food Water Content | Signs of Cat Dehydration | Daily Water Intake by Weight |
| EU 旅行检查器 | EU Pet Passport Explained | Rabies Vaccination Requirements | Microchip & ISO 11784/11785 | EU vs Non-EU Travel Rules |
| BARF 计算器 | What Is BARF Diet? | 80-10-10 Ratio Explained | Raw Feeding Safety Guidelines | Bone-to-Meat Ratio |
| 保险估算器 | Pet Insurance Types | What Does Insurance Cover? | Annual vs Lifetime Policies | Pre-existing Conditions |
| 毒性检测器主页 | How ASPCA Classifies Toxins | Most Common Pet Toxins | What to Do in an Emergency | ASPCA vs Pet Poison Helpline |

**验收 checklist**:
- [ ] `grep -r "'use client'" src/components/shared/FAQSection.tsx` 返回空
- [ ] `grep -r "'use client'" src/components/shared/KnowledgeSection.tsx` 返回空
- [ ] `pnpm verify-geo` 对所有工具页通过
- [ ] KnowledgeSection 权威来源外链全部含 `rel="noopener noreferrer"` 和 `aria-label`

---

### TASK-B3: "vs" 对比页模板（首批 8 页）

**策略来源**: [seo-programmatic.md §4.5 策略 15](seo-programmatic.md)  
**状态**: ⬜ 未开始

#### 数据类型

```ts
// src/types/comparison.types.ts（新文件）

export type ComparisonSide = {
  name: string;
  pros: string[];         // 3-4 条
  cons: string[];         // 2-3 条
  whenToChoose: string;   // 50-100 字，具体使用场景
};

export type ComparisonItem = {
  slug: string;           // "dry-food-vs-wet-food"
  species: 'dog' | 'cat' | 'shared';
  title: string;          // "Dry Food vs Wet Food for Dogs: Which Is Better?"
  intro: string;          // 100-150 字引言，含目标关键词
  sideA: ComparisonSide;
  sideB: ComparisonSide;
  verdict: string;        // 150-200 字，权威引用，结论明确
  faqs: [
    { q: string; a: string },
    { q: string; a: string },
    { q: string; a: string },
  ];
  citations: Array<{ label: string; url: string }>;  // ≥ 2 条
  relatedToolSlugs: string[];  // ≥ 2 个相关工具
};
```

#### 首批 8 个对比主题（优先级排序）

| # | Slug | 物种 | 目标关键词 | 月搜索量 |
|---|------|-----|-----------|---------|
| 1 | `dry-food-vs-wet-food` | dog | "dry food vs wet food for dogs" | 🟠 15k+ |
| 2 | `dry-food-vs-wet-food` | cat | "wet vs dry food for cats" | 🟠 12k+ |
| 3 | `raw-diet-vs-kibble` | dog | "raw diet vs kibble pros cons" | 🟡 8k+ |
| 4 | `indoor-vs-outdoor` | cat | "indoor vs outdoor cat lifespan" | 🟡 8k+ |
| 5 | `spayed-vs-unspayed` | dog | "spayed vs unspayed dog health" | 🟡 6k+ |
| 6 | `dog-years-vs-cat-years` | shared | "dog years vs cat years comparison" | 🟡 5k+ |
| 7 | `pet-insurance-vs-savings` | shared | "is pet insurance worth it" | 🟡 5k+ |
| 8 | `microchip-vs-tattoo` | shared | "microchip vs tattoo for dogs" | 🟢 3k+ |

#### URL 规则

```
/dog/compare/[slug]/
/cat/compare/[slug]/
/shared/compare/[slug]/
```

#### 页面结构（全部 SSG 预渲染）

```
1. [H1] "{Topic A} vs {Topic B} for {Species}: Which Is Right for Your Pet?"

2. [Quick Comparison Table]（SSG <table>，Featured Snippet 候选）
   - 对比维度 × A vs B 的差异（5-8 行）

3. [Side A Deep Dive]
   - H2: "{Topic A}: Pros & Cons"
   - Pros list / Cons list / When to choose（各自独立段落）

4. [Side B Deep Dive]
   - H2: "{Topic B}: Pros & Cons"
   - 同上

5. [Verdict]（H2: "Our Recommendation"）
   - 150-200 字，含权威引用（如 AAFCO / WSAVA）
   - 给出明确建议，不能"两者各有优劣"敷衍结尾

6. [FAQ Section]（3 条，<details>/<summary>）

7. [Medical Disclaimer]

8. [Related Tools CTA]（≥ 2 个工具卡片，直接链接）
```

**JSON-LD**:
- `Article` + `citation[]`（≥ 2 条）
- `FAQPage`
- `BreadcrumbList`

**验收 checklist**:
- [ ] Quick Comparison Table 在 HTML 源码中为 `<table>` 标签（非 JS 渲染）
- [ ] 每页 `citations` ≥ 2 条，权威机构 URL 真实有效
- [ ] `generateMetadata()` title 含 "vs" 关键词
- [ ] `relatedToolSlugs` 指向已存在的工具页路由
- [ ] 首批 8 页的 `verdict` 各自不同（非模板复用）

---

## §C. Month 1-3 — 批量扩展页面

> Gate-1 + Gate-2 全部达成后才能开始本节。

---

### TASK-C1: EU 国家细分页（分批 12+10+5=27 页）

**策略来源**: [seo-programmatic.md §4.5 策略 19](seo-programmatic.md)  
**状态**: ⬜ 未开始

#### 数据类型

```ts
// src/types/eu-travel.types.ts（追加）

export type EUCountryEntry = {
  slug: string;          // "france"
  name: string;          // "France"
  flag: string;          // "🇫🇷"
  euMemberSince: number;

  standardRequirements: {
    microchip: boolean;
    rabiesVaccine: boolean;
    euPetPassport: boolean;
    tapewormTreatment: boolean;
    tapewormTreatmentWindowDays?: [number, number]; // 如 [1, 5] 表示出发前 1-5 天
    titrTest: boolean;    // 狂犬抗体滴度检测（部分岛国要求）
  };

  specialRequirements: string[];  // ≥ 1 条，每国独特要求（禁入犬种、附加疫苗、隔离规定）
  restrictedBreeds: string[];     // 禁入犬种（各国禁令不同，如法国禁入斗牛梗）
  additionalInfo: string;         // ≥ 100 字，该国独特的宠物入境信息

  fromUS: { additionalSteps: string[] };  // 美国出发的特殊步骤（USDA APHIS 认证等）
  fromUK: { additionalSteps: string[] };  // 英国出发（脱欧后 AHC 要求等）

  officialSourceUrl: string;      // 该国官方农业部或边检网站 URL
  euRegulationUrl: string;        // EU Regulation 576/2013 官方链接
};
```

#### 批次发布计划

| 批次 | 发布时间 | 国家列表 | 触发条件 |
|------|---------|---------|---------|
| Batch 1 | Month 1 | 法国、德国、西班牙、意大利、荷兰、比利时、葡萄牙、爱尔兰、瑞典、丹麦、芬兰、奥地利 | Gate-2 达成 |
| Batch 2 | Month 2 | 波兰、捷克、匈牙利、希腊、罗马尼亚、保加利亚、克罗地亚、斯洛文尼亚、斯洛伐克、爱沙尼亚 | Batch 1 GSC 索引率 > 80% |
| Batch 3 | Month 3 | 马耳他、塞浦路斯、卢森堡、拉脱维亚、立陶宛 | Batch 2 GSC 索引率 > 80% |

**SpamBrain 安全要求**:
- `additionalInfo` ≥ 100 字，体现该国独特规则（非通用 EU 规则复述）
- `specialRequirements` 每国至少 1 条独特要求（Batch 3 小国若真的无差异，`additionalInfo` 必须 ≥ 200 字补足）
- 不可模板化内容占比目标 ≥ 60%（核验方式：随机抽 5 国，统计非标准字段字数占总字数比例）

**验收 checklist**:
- [ ] 随机抽 5 国：`additionalInfo` 互不相同且 ≥ 100 字
- [ ] 随机抽 5 国：`specialRequirements` 内容互不相同
- [ ] 每页 `officialSourceUrl` 为真实有效的政府网站 URL
- [ ] JSON-LD：`BreadcrumbList` + `FAQPage` 存在
- [ ] 出发国（US/UK）差异通过页面内 tab 切换实现，**不单独建页**（避免同一模板 × 3 出发模式触发同质化检测）

---

### TASK-C2: 紧急行动指南页（首批 25 页）

**策略来源**: [seo-programmatic.md §4.4 策略 10](seo-programmatic.md)  
**状态**: ⬜ 未开始

#### 数据类型

```ts
// src/types/emergency.types.ts（新文件）

export type EmergencyItem = ToxicItem & {
  immediateSteps: string[];      // 3-5 步，第 1 步必须是"Call ASPCA (888) 426-4435"
  whenToSeeVet: string[];        // 2-3 条判定标准（如"symptoms appear within 30 minutes"）
  symptomsTimeline: string;      // "Symptoms typically appear within {X} hours of ingestion"
  doNotDo: string[];             // 1-3 条禁止操作（如"Do NOT induce vomiting without vet guidance"）
};
```

#### 首批 25 个物品（月搜索量 "my dog ate X" > 3k）

食物类：chocolate、grapes、raisins、onions、garlic、xylitol（sugar-free gum）、avocado、macadamia nuts、alcohol、marijuana、coffee/caffeine、raw bread dough  
植物类（猫）：lily、azalea、tulip bulbs、sago palm、aloe vera  
药物类：ibuprofen、acetaminophen（Tylenol）、aspirin  
异物类：chicken bones、corn cob、socks（foreign object）  
化学品类：antifreeze、rat poison、bleach

#### URL 模式

```
/dog/emergency/ate-[slug]/     （食物 + 化学品）
/cat/emergency/ate-[slug]/     （植物 + 食物）
```

#### 页面结构

```
1. [Emergency Banner]（红色背景，SSG 可见）
   "Your dog ate {name}? Here's what to do NOW"

2. [Risk Level Badge]（Toxic / Dangerous / Monitor）

3. [Immediate Steps]（SSG <ol>，有序列表，3-5 步）
   - 第 1 步永远是："Call ASPCA Animal Poison Control: (888) 426-4435"

4. [Do NOT Do]（SSG <ul>，1-3 条禁止操作）

5. [When to See a Vet]（SSG <ul>，明确判定标准）

6. [Symptoms Timeline]（SSG <p>）

7. [FAQ Section]（3 条，含 "How long after eating X will symptoms appear?"）

8. [Medical Disclaimer]

9. [Related Emergencies]（3-5 个相关紧急场景交叉链接）
```

**验收 checklist**:
- [ ] Emergency Banner 在 HTML 源码中可见
- [ ] `<ol>` 立即行动步骤在 HTML 源码中可见，第 1 步含 "426-4435"
- [ ] `doNotDo` 列表在 HTML 源码中可见
- [ ] FAQPage JSON-LD 含 "How long after eating..." 问题
- [ ] `symptomsTimeline` 各物品数值不同（巧克力 6-12h ≠ 葡萄 24-72h）

---

### TASK-C3: 季节性安全内容页（首批 8 页）

**策略来源**: [seo-programmatic.md §4.5 策略 17](seo-programmatic.md)  
**状态**: ⬜ 未开始

#### 数据类型

```ts
// src/types/seasonal.types.ts（新文件）

export type SeasonalDangerPage = {
  slug: string;           // "christmas-foods-dogs"
  species: 'dog' | 'cat' | 'shared';
  season: 'summer' | 'winter' | 'christmas' | 'halloween' | 'thanksgiving' | 'spring' | 'fireworks' | 'easter';
  title: string;
  peakMonths: number[];   // [12] for christmas — 用于 sitemap lastModified 季节刷新
  intro: string;          // 100 字，含关键词

  dangerItems: Array<{
    name: string;
    toxicSlug: string;    // 指向现有毒性落地页 slug（内链）
    shortReason: string;  // 30 字以内
  }>;

  preventionTips: string[];  // 4-6 条
  faqs: [{ q: string; a: string }, { q: string; a: string }, { q: string; a: string }];
  citations: Array<{ label: string; url: string }>;
};
```

#### 首批 8 页

| Slug | 物种 | 季节 | 目标关键词 |
|------|-----|-----|-----------|
| `christmas-foods-dogs` | dog | christmas | "christmas foods toxic to dogs" |
| `halloween-candy-dogs` | dog | halloween | "halloween candy toxic to dogs" |
| `thanksgiving-dogs` | dog | thanksgiving | "thanksgiving foods dogs can eat" |
| `summer-heat-dogs` | dog | summer | "how to keep dog cool in summer" |
| `fireworks-anxiety-dogs` | dog | fireworks | "how to calm dog during fireworks" |
| `christmas-plants-cats` | cat | christmas | "christmas plants toxic to cats" |
| `easter-plants-cats` | cat | easter | "easter plants toxic to cats" |
| `spring-allergies-dogs` | dog | spring | "dog spring allergies symptoms" |

**sitemap 季节性刷新逻辑**:
```ts
// 在 sitemap.ts 中：season 页面的 lastModified 在当年峰值月前 1 个月刷新
// christmas（12月峰值）→ lastModified 设为 11月1日
// summer（6-8月峰值）→ lastModified 设为 5月1日
```

**验收 checklist**:
- [ ] `dangerItems` 每项含指向现有毒性落地页的内链
- [ ] `preventionTips` 列表在 HTML 源码中可见
- [ ] sitemap 中该类页面 `lastModified` 实现季节性刷新逻辑
- [ ] FAQPage JSON-LD 存在

---

### TASK-C4: 生命阶段新手清单页（6 页）

**策略来源**: [seo-programmatic.md §4.5 策略 18](seo-programmatic.md)  
**状态**: ⬜ 未开始

**首批 6 页 URL**:
- `/dog/guide/new-puppy-checklist/`
- `/cat/guide/new-kitten-checklist/`
- `/dog/guide/senior-dog-care/`
- `/cat/guide/senior-cat-care/`
- `/dog/guide/puppy-development-stages/`
- `/dog/guide/adopting-rescue-dog/`

#### 数据类型

```ts
// src/types/guide.types.ts（新文件）

export type LifeStageGuide = {
  slug: string;
  species: 'dog' | 'cat';
  stage: 'puppy' | 'kitten' | 'adult' | 'senior' | 'rescue';
  title: string;
  intro: string;          // 100 字，含关键词

  checklistSections: Array<{
    heading: string;      // "First 24 Hours"、"First Week"、"First Month"
    items: Array<{
      text: string;       // 清单项文字
      toolSlug?: string;  // 如果有对应工具，填写工具路由 slug
    }>;
  }>;

  relatedToolSlugs: string[];  // ≥ 3 个相关工具
  faqs: [{ q: string; a: string }, { q: string; a: string }, { q: string; a: string }];
  citations: Array<{ label: string; url: string }>;
};
```

**页面结构**:
```
1. [H1]
2. [Intro para]（100 字，SSG）
3. [Checklist Sections]（<ol>，SSG 预渲染）
   - 每项清单可选显示"Use [Tool Name] →"内链
4. ["Use Our Free Tools" CTA 区块]（≥ 3 个工具卡片）
5. [FAQ Section]（3 条）
6. [Related Guides]（交叉链接）
7. [Medical Disclaimer]
```

**HowTo JSON-LD**（清单格式配套）:
```ts
{
  "@type": "HowTo",
  "name": guide.title,
  "step": guide.checklistSections.flatMap(section =>
    section.items.map((item, i) => ({
      "@type": "HowToStep",
      "position": i + 1,
      "name": item.text,
      "url": item.toolSlug ? `${SITE_URL}/${item.toolSlug}/` : undefined
    }))
  )
}
```

**验收 checklist**:
- [ ] `<ol>` 清单在 HTML 源码中可见
- [ ] 每页链接至 ≥ 3 个计算器工具
- [ ] HowTo JSON-LD 存在
- [ ] `relatedToolSlugs` 指向已存在的路由

---

### TASK-C5: FAQ 聚合 Hub 页（6 页）

**策略来源**: [seo-programmatic.md §4.5 策略 20](seo-programmatic.md)  
**状态**: ⬜ 未开始

**首批 6 页**:
- `/dog/faq/nutrition/`
- `/cat/faq/nutrition/`
- `/dog/faq/health/`
- `/cat/faq/health/`
- `/dog/faq/aging/`
- `/cat/faq/aging/`

**数据来源**: 从各工具页的 `faqs` 字段聚合（不新写内容，仅整理已有 FAQ）

**每页结构**:
```
1. [H1] "Dog Nutrition FAQs: Your Top Questions Answered"
2. [Intro]（50 字）
3. [FAQ List]（≥ 10 条，<details>/<summary>）
   - 每条 FAQ 后附 "Use this tool: [Tool Name] →"（内链）
4. [CollectionPage JSON-LD]（含 ItemList 指向各工具页）
5. [FAQPage JSON-LD]（整页所有 FAQ）
```

**验收 checklist**:
- [ ] 每页 FAQ ≥ 10 条，全部在 HTML 源码中可见
- [ ] 每条 FAQ 有指向对应工具的内链
- [ ] `FAQPage` JSON-LD 与可见 FAQ 一一对应（问题文字相同）
- [ ] `CollectionPage` JSON-LD 存在

---

## §D. Month 2-3 — 品种矩阵（Gate-DA10 解锁后）

### TASK-D1: 犬猫品种 × 工具矩阵（首批 60 页）

**策略来源**: [seo-programmatic.md §4.4 策略 11](seo-programmatic.md)、[§4.5 策略 14](seo-programmatic.md)  
**状态**: ⬜ 未开始  
**前置条件**: Gate-DA10（DA ≥ 10）+ Phase B/C 批次索引率 > 80%

#### 首批范围

| 物种 | 品种数 | 工具数 | 页数 | 允许的工具维度 |
|------|:---:|:---:|:---:|--------------|
| 犬 Top 20 | 20 | 2 | 40 | 喂食指南（feeding-guide）、体重标准（weight-chart） |
| 猫 Top 10 | 10 | 2 | 20 | 喂食指南、体重标准 |

> ⛔ **禁止上线的维度（DA < 30 前）**: 年龄换算（age-chart）、生长阶段（growth-stages）——这两个工具对所有品种使用完全相同的公式，不可模板化内容 < 10%，SpamBrain 标记风险极高。

#### 数据类型

```ts
// src/types/breed.types.ts（新文件）

export type DogBreed = {
  slug: string;           // "labrador-retriever"
  name: string;
  akc_group: string;      // "Sporting", "Herding" 等
  weight_kg: { male: [number, number]; female: [number, number] };
  height_cm: { male: [number, number]; female: [number, number] };
  lifespan_years: [number, number];

  // === 以下字段：每个品种完全独立撰写，是 SpamBrain 安全的核心 ===
  healthRisks: string;    // ≥ 300 字，该品种特有健康风险（拉布拉多→肥胖/髋关节发育不良；贵宾犬→白内障/皮肤病）
  feedingNotes: string;   // ≥ 150 字，体现品种体型差异对喂食量的影响（大型犬 vs 小型犬的 RER 差异）

  akc_source_url: string; // AKC 该品种官方页面 URL（权威来源）
};

export type CatBreed = {
  slug: string;
  name: string;
  tica_group: string;
  weight_kg: { male: [number, number]; female: [number, number] };
  lifespan_years: [number, number];
  healthRisks: string;    // ≥ 300 字
  feedingNotes: string;   // ≥ 150 字
  tica_source_url: string;
};
```

#### SpamBrain 安全核验（每批上线前必须执行）

```bash
# 随机抽检 5 个品种，确认 healthRisks 字数 ≥ 300 且各页内容不同
pnpm check-breed-uniqueness --sample=5

# 确认 feedingNotes 引用该品种具体体重数字（不是通用描述）
grep -c "kg" src/lib/data/dog-breeds/labrador-retriever.json
```

**验收 checklist**:
- [ ] 随机抽 5 品种：`healthRisks` 字数 ≥ 300 且互不相同
- [ ] `feedingNotes` 含该品种体重范围的具体数字
- [ ] 每页独特文字（不含模板文字）≥ 400 字
- [ ] 年龄换算维度**未上线**（工具路由不存在）

---

## §E. 实验性任务（Gate-DA30 解锁，预计 Month 24+）

### TASK-E1: 工具结果静态化 URL 矩阵（10 页实验）

**策略来源**: [seo-programmatic.md §4.5 策略 16](seo-programmatic.md)  
**状态**: ⛔ 不建议近期执行  
**前置条件**: Gate-DA30（DA ≥ 30）+ 上述所有批次索引率正常 + 无 manual action  
**规模限制**: 首批严格限制 10 页（非 500+），观察 3 个月后再决定是否扩展

> ⛔ 此任务的 SpamBrain 风险已在 [seo-programmatic.md §4.5 策略 16](seo-programmatic.md) 详细说明。**DA < 30 时禁止执行**。

---

## 附录 A: 验收脚本参考

在 `package.json` 中追加以下脚本（由 TASK-A2 的 `verify-geo-ssg.mjs` 驱动）：

```json
{
  "scripts": {
    "verify-geo": "node scripts/verify-geo-ssg.mjs",
    "check-content-uniqueness": "node scripts/check-content-uniqueness.mjs",
    "check-content-length": "node scripts/check-content-length.mjs",
    "check-breed-uniqueness": "node scripts/check-breed-uniqueness.mjs"
  }
}
```

---

## 附录 B: 批次发布总览

| 批次 | 时间 | 页面类型 | 页数 | 门控条件 |
|------|------|---------|:---:|---------|
| **§A** | 上线前 | E-E-A-T 基础页 + 工具模板 | 4 页 + 脚本 | 无（阻塞 Gate-0） |
| **Batch 0** | Month 0 | 14 工具页 + 2 Hub + 首页 + 档案页 + 法律页 | 20 页 | Gate-0 |
| **Batch 1** | Month 0 | 毒性落地页 Top 50 + "vs" 对比页 8 页 | 58 页 | Gate-0 |
| **Batch 2** | Month 1 | 毒性落地页 40 页 + EU 国家 12 页 | 52 页 | Gate-1 + Gate-2 |
| **Batch 3** | Month 2 | 毒性落地页 40 页 + EU 国家 10 页 + 紧急指南 25 页 + 季节安全 8 页 + 新手清单 6 页 + FAQ Hub 6 页 + "vs" 扩展 10 页 | 105 页 | Batch 2 GSC 索引率 > 80% |
| **Batch 4** | Month 3 | 毒性落地页 40 页 + EU 国家 5 页 + 品种矩阵 60 页 | 105 页 | Batch 3 GSC 索引率 > 80% + Gate-DA10 |
| **Batch 5** | Month 4 | 毒性落地页剩余 30 页 | 30 页 | Batch 4 GSC 索引率 > 80% |
| **Month 0-4 合计** | | | **~370 页** | 分批严格执行，远低于一次全上线风险 |

> ⚠️ **Month 3 单批 105 页偏高**。若 Batch 2 索引率未达 80%，必须将品种矩阵（60 页）推迟至 Batch 5，将 Month 3 实际上线量降至 ~45 页。

---

## 附录 C: 每批上线前人工核验清单

```
□ pnpm build 无报错
□ pnpm verify-geo 无 FAIL
□ pnpm check-content-uniqueness --batch=N 无 FAIL
□ pnpm check-content-length --batch=N 无 FAIL（独特文字 ≥ 400 字）
□ 随机抽检 5 页 View Source：GEO 文字（FAQ答案、Knowledge Card 正文、Disclaimer）出现在原始 HTML 中
□ 随机抽检 5 页：title 和 description 含具体内容关键词（非泛化模板）
□ Google Search Console：前批页面索引率 > 80%（Batch 2+ 的前置条件）
□ 无 manual action 警告（Google Search Console 检查）
```
