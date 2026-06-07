# AITasks — petsMetrics AI 编程任务书

> **用途**：AI 编程助手（GitHub Copilot / Claude）的分阶段执行计划。  
> **读取顺序**（执行任何任务前必须先读）：`README.MD` → `ArkCon.md` → `.github/copilot-instructions.md` → 对应 `Docs/` 设计文档。  
> **约束来源**：所有编码规范来自 `ArkCon.md §Core Principles` 和 `.github/copilot-instructions.md`；架构模式来自 `ArkCon.md §1–§10`。

---

## 项目进展总览

| 阶段 | 名称 | 状态 | 说明 |
|------|------|------|------|
| **Phase 0** | 工程脚手架 | ⬜ 未开始 | Next.js 初始化、设计系统、类型基础 |
| **Phase 1** | 基础 UI 组件库 | ⬜ 未开始 | 原子组件、全局布局、i18n 骨架 |
| **Phase 2** | 宠物档案系统 | ⬜ 未开始 | 存储层、档案 CRUD、档案页面 |
| **Phase 3** | 静态数据层 | ⬜ 未开始 | 毒性库、疫苗数据、EU 规则、品种表 |
| **Phase 4** | 计算器逻辑层 | ⬜ 未开始 | 所有 lib/calculators/ 纯函数 + 单元测试 |
| **Phase 5** | 首页与 Hub 页 | ⬜ 未开始 | 首页、/dog/、/cat/、sitemap、robots |
| **Phase 6** | P0 工具页（12个）| ⬜ 未开始 | 每个工具的 Widget + page.tsx |
| **Phase 7** | SEO 动态落地页 | ⬜ 未开始 | 毒性查询 200+ 个静态 slug 页 |
| **Phase 8** | P1 工具（2个） | ⬜ 未开始 | BARF 计算器、保险估算器 |
| **Phase 9** | QA 与发布收尾 | ⬜ 未开始 | 测试补全、无障碍、性能、广告位 |

> **状态图例**：⬜ 未开始 · 🔄 进行中 · ✅ 已完成

---

## 阶段执行规则

1. **每个阶段结束后停止**，告知用户"Phase X 完成，请确认是否进入 Phase X+1"。
2. **进入下一阶段前**，用户必须明确回复"确认"或"继续"。
3. **每个任务开始前**，将对应行的状态改为 🔄；完成后改为 ✅。
4. **遇到 ⚠️ 决策点**时，停下来向用户提问，不得单方面决定。
5. 所有文件路径均相对于项目根目录 `/workspaces/petsMetrics/`。

---

---

# Phase 0 — 工程脚手架

> **目标**：从零创建可运行的 Next.js 项目骨架，建立所有后续阶段依赖的基础层。  
> **完成标志**：`pnpm dev` 能成功启动，首页输出 "Hello petsMetrics"，TypeScript 编译无错误。

### 依赖关系
无（Phase 0 是起点）

---

## T0.1 — 初始化 Next.js 项目

**文件目标**：
- `package.json`（根目录，唯一，无 monorepo）
- `next.config.mjs`
- `tsconfig.json`
- `.eslintrc.json`
- `.prettierrc`
- `pnpm-lock.yaml`

**执行规范**：

```bash
pnpm create next-app@latest . \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*"
```

> `--src-dir` 参数会直接在 `src/app/` 下生成 App Router 文件，与 `ArkCon.md §2.2` 目录结构一致，无需手动迁移。

`next.config.mjs` 必须包含：
```js
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  reactStrictMode: true,
};
```

`tsconfig.json` 必须包含：
```json
{
  "compilerOptions": {
    "strict": true,
    "paths": { "@/*": ["./src/*"] }
  }
}
```

**约束**：
- `ArkCon.md §1`：单 package.json，无 monorepo，无 apps/ 目录
- `ArkCon.md §4.1`：`output: 'export'` 强制 SSG，禁用所有需要服务端的特性

---

## T0.2 — 安装核心依赖

**新增依赖**：

```bash
# 生产依赖
pnpm add next-intl chart.js react-chartjs-2

# 开发依赖
pnpm add -D vitest @vitejs/plugin-react @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom @types/node
```

**vitest 配置** → `vitest.config.ts`（项目根目录）：
```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  test: { environment: 'jsdom', globals: true, setupFiles: ['@testing-library/jest-dom/vitest'] },
  resolve: { alias: { '@': resolve(__dirname, './src') } },
});
```

---

## T0.3 — 设计系统 CSS Token

**文件目标**：`src/app/globals.css`

根据 `Docs/00-design-system-zh.md §2` 实现所有 CSS 自定义属性：

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* 全局品牌色 */
  --brand-navy: #1B2D4F;
  --brand-teal: #0D9488;
  --brand-teal-light: #CCFBF1;
  --white: #FFFFFF;
  --gray-50: #F8FAFC;
  --gray-100: #F1F5F9;
  --gray-300: #CBD5E1;
  --gray-500: #64748B;
  --gray-700: #334155;
  --gray-900: #0F172A;

  /* 狗狗板块 — 温暖琥珀色 */
  --dog-primary: #D97706;
  --dog-primary-dark: #92400E;
  --dog-primary-light: #FEF3C7;
  --dog-accent: #F59E0B;
  --dog-surface: #FFFBEB;

  /* 猫咪板块 — 优雅紫罗兰 */
  --cat-primary: #7C3AED;
  --cat-primary-dark: #4C1D95;
  --cat-primary-light: #EDE9FE;
  --cat-accent: #A78BFA;
  --cat-surface: #F5F3FF;

  /* 语义状态色 */
  --status-safe: #10B981;
  --status-safe-bg: #D1FAE5;
  --status-caution: #F59E0B;
  --status-caution-bg: #FEF3C7;
  --status-toxic: #EF4444;
  --status-toxic-bg: #FEE2E2;
  --status-info: #3B82F6;
  --status-info-bg: #DBEAFE;
}

/* 深色模式覆盖（见 Docs/00-design-system-zh.md §2.5） */
@media (prefers-color-scheme: dark) {
  :root {
    --white: #0F172A;
    --gray-50: #1E293B;
    --gray-100: #334155;
    --gray-300: #475569;
    --gray-500: #94A3B8;
    --gray-700: #CBD5E1;
    --gray-900: #F1F5F9;
    --brand-navy: #E2E8F0;
    --brand-teal-light: #0F766E;
    --dog-primary-light: #451A03;
    --dog-surface: #1C0E00;
    --cat-primary-light: #2E1065;
    --cat-surface: #13072B;
    --status-safe-bg: #064E3B;
    --status-caution-bg: #451A03;
    --status-toxic-bg: #450A0A;
    --status-info-bg: #1E3A5F;
  }
}
```

**Tailwind config 扩展** → `tailwind.config.ts`：映射所有 CSS token 为 Tailwind 工具类（使用 `var(--token-name)` 形式）。

---

## T0.4 — 基础类型定义

**文件目标**：`src/types/common.types.ts`

```ts
export type Result<T> =
  | { ok: true; data: T }
  | { ok: false; error: AppError };

export interface AppError {
  code: string;
  details?: string;
}
```

**约束**：
- `copilot-instructions.md §1`：`Result<T>` 模式是所有可失败操作的返回类型
- 使用 `type` 而非 `interface`（AppError 例外，用于潜在的扩展）

---

## T0.5 — 应用常量

**文件目标**：`src/constants/index.ts`

```ts
export const SITE_URL = 'https://petsmetrics.com';
export const SITE_NAME = 'petsMetrics';
export const BRAND_TAGLINE = 'One Profile. Every Answer.';
```

---

## T0.6 — 基础工具函数

**文件目标**：

| 文件 | 职责 |
|------|------|
| `src/lib/utils/url.ts` | `pageUrl(path)` 构造所有站内链接 |
| `src/lib/utils/format.ts` | 数字格式化、日期格式化 |
| `src/lib/utils/unit-convert.ts` | kg ↔ lb / ml ↔ oz 单位换算 |

`url.ts` 核心实现（见 `ArkCon.md §3.3`）：
```ts
export function pageUrl(path: string): string {
  return `/${path}/`;
}
```

---

## T0.7 — i18n 骨架配置

**文件目标**：
- `messages/en.json`（空骨架，包含顶层命名空间占位）
- `src/lib/i18n.ts`（next-intl 配置）

> **注意**：v1 单语言模式下**不创建** `src/middleware.ts`。`output: 'export'` 纯静态部署由 CDN 分发，不经过 Edge 运行时，中间件在 v1 中冗余且无效。v2 多语言迁移时再按 `ArkCon.md §7.4` 引入。

`messages/en.json` 骨架结构：
```json
{
  "common": {
    "button": { "submit": "", "calculate": "", "reset": "", "download": "", "share": "" },
    "disclaimer": { "standard": "This tool provides general reference information only and does not constitute veterinary advice. Always consult a licensed veterinarian for health decisions." },
    "unit": { "kg": "kg", "lb": "lb", "ml": "ml", "oz": "oz", "kcal": "kcal" }
  },
  "nav": {},
  "home": {},
  "dog": {},
  "cat": {},
  "profile": {},
  "shared": {}
}
```

---

## T0.8 — 根布局与 404

**文件目标**：
- `src/app/layout.tsx`（根布局，加载字体 Plus Jakarta Sans + Inter + DM Mono，挂载 Providers）
- `src/app/not-found.tsx`（404 页）
- `src/app/robots.ts`（见 `ArkCon.md §6.1`）

**约束**：
- `ArkCon.md §4.2`：`layout.tsx` 不得包含 `'use client'`
- `ArkCon.md §4.3`：根布局须导出全局 `metadata`

---

## T0.9 — 安全配置与 CI 流水线

**文件目标**：
- `vercel.json`（Security Headers）
- `.github/workflows/ci.yml`（CI 自动化检查）

`vercel.json`：
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'"
        }
      ]
    }
  ]
}
```

> `unsafe-inline` 用于 Next.js 内联 script（JSON-LD 的 `dangerouslySetInnerHTML` 所需）。如未来所有 JSON-LD 改用 nonce，可收紧此策略。

`.github/workflows/ci.yml`：
```yaml
name: CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
        with: { version: 9 }
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'pnpm' }
      - run: pnpm install --frozen-lockfile
      - run: pnpm exec tsc --noEmit
      - run: pnpm test --run
      - run: pnpm build
```

**约束**：
- `ArkCon.md §9.1`：无服务端密钥提交到源码
- CI 必须在 PR 合并前通过（设为 Branch Protection Required Check）

---

## ✅ Phase 0 完成确认检查

- [ ] `pnpm dev` 启动无报错
- [ ] `pnpm build` 生成静态输出（`output: 'export'`）
- [ ] `pnpm test` Vitest 框架可运行（无测试用例也算通过）
- [ ] TypeScript `strict: true` 编译无错误
- [ ] `globals.css` 所有 CSS Token 已定义
- [ ] `messages/en.json` 骨架已创建
- [ ] `vercel.json` Security Headers 已配置
- [ ] `.github/workflows/ci.yml` CI 流水线已创建，本地 `pnpm test --run && pnpm build` 全部通过

> **🛑 停止点**：Phase 0 所有任务完成后，通知用户确认后再进入 Phase 1。

---

---

# Phase 1 — 基础 UI 组件库

> **目标**：构建所有页面共享的原子 UI 组件和全局布局骨架。后续所有 Widget 都依赖此阶段产出。  
> **完成标志**：Storybook 或简单测试页能渲染所有原子组件，无报错。

### 依赖关系
依赖 Phase 0（设计 token、types/common.types.ts、messages/en.json）

---

## T1.1 — 原子 UI 组件

**文件目标**（均在 `src/components/ui/` 下，每文件一组件）：

| 组件文件 | 用途 |
|----------|------|
| `Button.tsx` | 主按钮、次按钮、危险按钮 + `aria-label` |
| `Card.tsx` | 玻璃卡片容器（`bg-white/80 backdrop-blur-sm`） |
| `Input.tsx` | 文本输入框，含 label + error state |
| `Select.tsx` | 下拉选择，含 label + aria |
| `Badge.tsx` | 状态徽章（safe / caution / toxic / info） |
| `Toggle.tsx` | 双选切换（如 kg/lb、dog/cat） |
| `Slider.tsx` | 范围滑块（BCS 评分 1–9） |
| `ProgressBar.tsx` | 进度条（时间轴、生长曲线辅助） |
| `Stepper.tsx` | 步骤指示器（向导表单） |
| `Tooltip.tsx` | 公式来源悬停说明 |
| `Skeleton.tsx` | 加载骨架屏占位 |
| `Divider.tsx` | 分割线 |

**约束**：
- `copilot-instructions.md §4.2`：每个组件必须有显式 `Props` 类型别名
- `copilot-instructions.md §5.1`：仅 Tailwind，无 style={{ color }}
- `copilot-instructions.md §5.2`：仅 CSS 自定义属性，无 hex 值
- `copilot-instructions.md §4.4`：交互组件需 `'use client'` 指令

---

## T1.2 — 全局布局组件

**文件目标**（均在 `src/components/layout/` 下）：

| 组件文件 | 设计参考 |
|----------|----------|
| `Header.tsx` | `Docs/00-design-system-zh.md §6.1`；滚动 > 80px 后背景变实色 |
| `Footer.tsx` | 含版权、隐私政策、免责声明链接 |
| `Nav.tsx` | 主导航（Dog / Cat / Shared / Profile）；狗狗/猫咪高亮各自主题色 |
| `Breadcrumb.tsx` | 面包屑，接受 `items: { label: string; href?: string }[]` |
| `SidebarLayout.tsx` | 工具页通用两栏布局（主内容 + 侧边栏） |

---

## T1.3 — 共享业务组件

**文件目标**（均在 `src/components/shared/` 下）：

| 组件文件 | 用途 |
|----------|------|
| `DisclaimerSection.tsx` | 标准免责声明（每个结果页必须渲染） |
| `AffiliateBanner.tsx` | 联盟广告占位 Banner（接受 `variant` prop：insurance / food / amazon） |
| `ShareButtons.tsx` | Twitter / Facebook / Copy Link 分享按钮 |
| `PetProfileBar.tsx` | 工具页顶部的档案快速读取栏（显示当前选中宠物信息） |
| `SpeciesToggle.tsx` | dog / cat 物种切换（多个工具复用） |
| `ResultSection.tsx` | 结果区块标准容器（大数字 + 解读 + Banner + 免责声明 + 分享） |
| `JsonLdScript.tsx` | 服务器组件，渲染 `<script type="application/ld+json">` |
| `ErrorBoundaryWrapper.tsx` | 包裹 Client Component 的错误边界，错误文案来自 i18n |

**约束**：
- `copilot-instructions.md §4.4`：每个交互式 Client Component 根节点都必须被 ErrorBoundary 包裹
- `copilot-instructions.md §6`：所有用户可见文字通过 `t()` 从 messages/en.json 读取

---

## T1.4 — 补全 messages/en.json 基础键值与工具命名空间 Schema

将 T0.7 的空骨架填充为以下键值，并在同一 PR 内定义所有 Phase 6 工具的命名空间结构（**Phase 6 执行时只填充文案，不得自行创建新的顶层键名**）：

**Phase 1 基础键**：
- `common.button.*`
- `common.disclaimer.standard`
- `nav.*`（所有导航文字）
- `common.error.*`（错误提示文字）
- `common.share.*`

**Phase 6 工具命名空间预定义（文案留空，Phase 6 填充）**：
```json
{
  "dogAge":      { "form": { "ageLabel": "", "sizeLabel": "", "submit": "" }, "result": { "humanAge": "", "lifeStage": "" } },
  "catAge":      { "form": { "ageMonthsLabel": "", "submit": "" }, "result": { "humanAge": "", "lifeStage": "", "checkupFrequency": "" } },
  "dogCalorie":  { "form": { "weightLabel": "", "scenarioLabel": "", "submit": "" }, "result": { "rer": "", "mer": "", "dailyFood": "" } },
  "puppyGrowth": { "form": { "ageWeeksLabel": "", "weightLabel": "", "sizeLabel": "", "submit": "" }, "result": { "predictedWeight": "", "percentile": "" } },
  "gestation":   { "form": { "matingDateLabel": "", "addDateButton": "", "submit": "" }, "result": { "earliest": "", "likely": "", "latest": "" } },
  "vaccination": { "form": { "birthDateLabel": "", "regionLabel": "", "submit": "" }, "result": { "nextDue": "", "status": { "overdue": "", "upcoming": "", "future": "" } } },
  "catBcs":      { "form": { "bcsLabel": "", "weightLabel": "", "submit": "" }, "result": { "condition": "", "idealWeight": "", "lipidosisWarning": "" } },
  "catHydration":{ "form": { "weightLabel": "", "dryFoodLabel": "", "wetFoodLabel": "", "submit": "" }, "result": { "totalMl": "", "fromFood": "", "extraNeeded": "" } },
  "toxicChecker":{ "searchPlaceholder": "", "noResults": "", "emergency": { "phone": "ASPCA Poison Control: 888-426-4435", "callLabel": "" } },
  "euTravel":    { "form": { "speciesLabel": "", "originLabel": "", "destinationLabel": "", "documentsLabel": "" }, "result": { "satisfied": "", "missing": "", "leadTimeDays": "" } },
  "barf":        { "form": { "speciesLabel": "", "weightLabel": "", "percentageLabel": "", "submit": "" }, "result": { "muscleMeat": "", "bone": "", "liver": "", "organ": "", "vegetables": "", "total": "" }, "pdfExport": { "comingSoon": "PDF Export — Coming Soon" } }
}
```

---

## ✅ Phase 1 完成确认检查

- [ ] 所有原子组件渲染无 TypeScript 错误
- [ ] Header 滚动行为正确
- [ ] 无任何硬编码 hex 颜色（使用 CSS var）
- [ ] 无任何硬编码用户可见字符串（使用 i18n）
- [ ] 每个交互组件都有 aria-label 或 label

> **🛑 停止点**：Phase 1 完成后，通知用户确认后再进入 Phase 2。

---

---

# Phase 2 — 宠物档案系统

> **目标**：实现项目**核心差异化功能**——多宠物档案管理。后续所有工具依赖档案数据自动填充。  
> **完成标志**：用户可以在 `/profile/` 页面创建、查看、编辑、导出、删除宠物档案；档案数据持久化到 localStorage。

### 依赖关系
依赖 Phase 0（types、utils、storage 规范）和 Phase 1（UI 组件、布局）。T2.5 向导的品种下拉数据依赖 Phase 3 T3.6（可并行执行，品种下拉先用空数组占位）。

---

## T2.1 — 宠物档案类型定义

**文件目标**：`src/types/profile.types.ts`

```ts
export type Species = 'dog' | 'cat';
export type Sex = 'male' | 'female';
export type SizeClass = 'small' | 'medium' | 'large' | 'giant'; // 仅犬类

export type PetProfile = {
  id: string;                        // crypto.randomUUID()
  name: string;
  species: Species;
  breed: string;                     // 来自 lib/data/ 品种列表
  sex: Sex;
  isNeutered: boolean;
  birthDate: string | null;          // ISO 8601 date string，null = 未知
  currentAgeWeeks: number | null;    // 当 birthDate 未知时使用
  weightKg: number;
  sizeClass: SizeClass | null;       // dog 必填，cat 为 null
  photoUrl: string | null;           // base64 data URL，存 localStorage
  createdAt: string;                 // ISO 8601
  updatedAt: string;
};
```

---

## T2.2 — 品种参考数据

> **注意**：品种数据文件（`dog-breeds.ts` / `cat-breeds.ts`）已迭入 **Phase 3（T3.6）**统一管理，与其他静态参考数据保持架构一致（`ArkCon.md §5.3`）。

**临时占位**：Phase 2 执行期间，向导组件中的品种下拉使用空数组占位：

```ts
// T3.6 完成前的临时占位
const breeds: BreedEntry[] = []; // 待 Phase 3 T3.6 完成后替换为真实数据导入
```

---

## T2.3 — 档案存储层

**文件目标**：`src/lib/storage/profile.storage.ts`

必须实现以下接口（含完整 try/catch + 类型守卫）：

```ts
export function getAllProfiles(): PetProfile[]
export function getActiveProfileId(): string | null
export function setActiveProfileId(id: string): void
export function getProfileById(id: string): PetProfile | null
export function saveProfile(profile: PetProfile): void
export function deleteProfile(id: string): void
export function exportProfilesJson(): string
export function importProfilesJson(json: string): Result<PetProfile[]>
```

localStorage Key 命名规范（`ArkCon.md §5.2`）：
- `petsmetrics_profiles`
- `petsmetrics_active_profile_id`

---

## T2.4 — 档案 Context + Hook

**文件目标**：
- `src/contexts/ProfileContext.tsx`（`'use client'`）：全局状态 Provider
- `src/hooks/useProfile.ts`：消费 ProfileContext 的封装 hook

**原因**：`PetProfileBar`（共享 layout 层）、各 Widget 表单自动填充（Phase 6）、`ProfileCreationWizard`（T2.5）均需读取同一份 `activeProfile` 状态。若各自实例化独立 hook，切换档案后 Widget 不会同步更新。React Context 是保证跨组件状态一致的必要方案。

`ProfileContext.tsx` 实现要点：
- 导出 `ProfileProvider`，在 `src/app/layout.tsx` 的 Providers 包裹层中挂载
- 内部通过 `lib/storage/profile.storage.ts` 初始化状态，并在每次写操作后同步更新 Context 值

`useProfile()` 接口（由 hook 暴露）：
```ts
export function useProfile(): {
  profiles: PetProfile[];
  activeProfile: PetProfile | null;
  setActiveProfile: (id: string) => void;
  createProfile: (data: Omit<PetProfile, 'id' | 'createdAt' | 'updatedAt'>) => PetProfile;
  updateProfile: (id: string, data: Partial<PetProfile>) => void;
  deleteProfile: (id: string) => void;
  exportJSON: () => void;                       // 触发浏览器下载
  importJSON: (file: File) => Promise<Result<void>>;
}
```

**约束**：
- `src/app/layout.tsx` 须将 `<ProfileProvider>` 包在所有页面内容的外层
- `copilot-instructions.md §7`：Context 内部通过 `lib/storage/profile.storage.ts` 读写，禁止直接调用 `localStorage`
- `copilot-instructions.md §8`：禁止 prop drilling 超过 2 层，必须通过 Context 传递 Profile 状态

---

## T2.5 — 档案创建向导组件

**文件目标**：`src/components/profile/ProfileCreationWizard.tsx`（`'use client'`）

7 步向导（对应 README §4.2 的字段）：
1. 选择物种（Dog / Cat）大图标选择卡
2. 宠物名字输入
3. 品种选择（下拉，含模糊搜索）
4. 性别 + 是否绝育
5. 出生日期（或填写当前周龄/月龄）
6. 当前体重（kg/lb 切换）
7. 确认摘要 → 保存

每步使用 `Stepper.tsx` 指示进度；最后一步完成后触发"下载备份 JSON"提示（见 `Docs/02-pet-profile-zh.md §1`）。

---

## T2.6 — 档案仪表板组件

**文件目标**（均在 `src/components/profile/` 下）：

| 组件文件 | 用途 |
|----------|------|
| `ProfileCard.tsx` | 宠物头像 + 基本信息展示卡 |
| `QuickStatsRow.tsx` | 卡路里需求/人类年龄/下次疫苗/BCS 快速统计行 |
| `LinkedToolsGrid.tsx` | 关联工具网格，每个工具带"用[宠物名]的数据打开"按钮 |
| `DataManagementPanel.tsx` | 导出 JSON / 导入 JSON / 编辑 / 删除 |
| `PetSwitcher.tsx` | 多宠物切换栏 + 添加宠物按钮 |

---

## T2.7 — 档案页面

**文件目标**：`src/app/profile/page.tsx`（Server Component）

实现 `Docs/02-pet-profile-zh.md §3` 的两种状态：
- **状态 A**（无档案）：Hero + CTA 触发 ProfileCreationWizard
- **状态 B**（有档案）：PetSwitcher + ProfileCard + QuickStatsRow + LinkedToolsGrid + DataManagementPanel

必须包含：
- `export const metadata: Metadata`（完整 SEO 元数据）
- Schema.org `WebApplication` JSON-LD
- 面包屑：首页 > 我的宠物档案

---

## T2.8 — 档案存储单元测试

**文件目标**：`src/lib/storage/profile.storage.test.ts`

必须覆盖：
- 正常 round-trip（存 → 读 → 验证）
- 空 localStorage → 返回安全默认值
- 畸形 JSON → 不抛异常，返回空数组
- `importProfilesJson` 无效 JSON → `Result.ok: false`

---

## ✅ Phase 2 完成确认检查

- [ ] 可在 `/profile/` 创建宠物档案（< 30 秒体验）
- [ ] 刷新页面后档案数据持久存在
- [ ] 导出 JSON 文件可下载
- [ ] 导入 JSON 文件可恢复档案
- [ ] 畸形数据输入不崩溃
- [ ] 所有 storage 测试通过

> **🛑 停止点**：Phase 2 完成后，通知用户确认后再进入 Phase 3。

---

---

# Phase 3 — 静态数据层

> **目标**：构建所有工具依赖的静态参考数据库。这是 Phase 4 计算器的数据来源。  
> **完成标志**：所有数据文件 TypeScript 编译通过，关键数据条目数量达标。

### 依赖关系
依赖 Phase 0（类型定义、项目结构）。可与 Phase 2 并行执行。

---

## T3.1 — 毒性食物与植物数据库

**文件目标**：`src/lib/data/toxic-items.ts`

**数据结构**：
```ts
export type ToxicityLevel = 'toxic' | 'caution' | 'safe';
export type ToxicSpeciesScope = 'dog' | 'cat' | 'both'; // 区别于 profile.types.ts 中的 Species（不含 'both'）

export type ToxicItem = {
  slug: string;             // URL slug，如 "grapes", "chocolate"
  name: string;             // 显示名称
  aliases: string[];        // 别名，用于模糊搜索
  category: 'food' | 'plant' | 'household';
  species: ToxicSpeciesScope; // 对哪类动物有毒
  dogLevel: ToxicityLevel;
  catLevel: ToxicityLevel;
  symptoms: string[];       // 中毒症状列表
  safeAmount: string | null;// caution 级别的安全参考量
  source: string;           // ASPCA / AVMA / AAFP
  emergencyNote: string | null; // toxic 级别的紧急提示
};

export const TOXIC_ITEMS: readonly ToxicItem[];
```

**数据规模要求**：至少 200 条条目，涵盖：
- 常见食物（葡萄、巧克力、洋葱、大蒜、木糖醇、牛油果等）
- 常见室内植物（百合、杜鹃、水仙、常春藤等）
- 家居物品（某些精油、樟脑丸等）

---

## T3.2 — 疫苗时间表参考数据

**文件目标**：`src/lib/data/vaccination-schedule.ts`

**数据结构**：
```ts
export type VaccineRegion = 'US' | 'UK' | 'EU';
export type VaccineType = 'core' | 'non-core';
export type ScheduleEntry = {
  vaccine: string;           // "DHPP", "Rabies", "FVRCP" 等
  type: VaccineType;
  species: 'dog' | 'cat';
  regions: VaccineRegion[];  // 适用地区
  doseSchedule: {
    ageWeeks: number;        // 首次接种周龄
    label: string;           // "6–8 weeks"
    intervalWeeks?: number;  // 后续间隔（无则为一次性）
  }[];
  boosterIntervalMonths: number; // 加强针间隔（月）
  nonCoreNote?: string;          // 非核心疫苗的注意说明
};
```

数据来源：WSAVA 核心疫苗指南（2016/2022版）。非核心疫苗统一附加说明文本（见 `README.MD §6.3` 注意事项）。

---

## T3.3 — EU 宠物旅行规则数据

**文件目标**：`src/lib/data/eu-travel-rules.ts`

```ts
export type EUCountry = 'AT' | 'BE' | 'DE' | /* ...所有EU成员国... */ | 'GB' | 'NO' | 'FI';

export type TravelRequirement = {
  id: string;
  name: string;                // "Microchip (ISO 11784/11785)"
  description: string;
  leadTimeDays: number | null; // 需要提前多少天完成（null = 随时）
  officialSource: string;      // EU官方链接
  lastVerifiedDate: string;    // ISO 8601，如 "2025-01-01"；EU 法规更新时同步修改
  requiredFor: {
    origin: EUCountry[] | 'all';
    destination: EUCountry[] | 'all';
    species: ('dog' | 'cat')[];
  };
};

export const EU_TRAVEL_REQUIREMENTS: readonly TravelRequirement[];
```

特殊场景数据：UK 绦虫处理要求、北欧免疫区（FI/IE/MT/NO）特殊要求。

---

## T3.4 — 幼犬生长曲线数据

**文件目标**：`src/lib/data/puppy-growth-curves.ts`

按体型分 4 组（small/medium/large/giant），每组包含：
- 成熟周龄（Maturity age in weeks）
- 成年体重系数（用于公式计算）
- 参考生长节点（8w, 12w, 16w, 6m, 12m 等的预期体重比例）

---

## T3.5 — 路由数据（sitemap 用）

**文件目标**：`src/lib/data/routes.ts`

```ts
// 供 sitemap.ts 和 generateStaticParams 使用
export function getAllToolRoutes(): string[]   // 返回所有工具页 URL path
export function getAllToxicSlugs(): { species: 'dog' | 'cat'; slug: string }[]
export function getAllEUTravelRoutes(): { origin: string; destination: string }[] // 供 T7.4 EU 落地页使用
```

---

## T3.6 — 品种参考数据

**文件目标**：
- `src/lib/data/dog-breeds.ts` — 输出 `DOG_BREEDS: readonly BreedEntry[]`，含字段：`{ name, sizeClass, avgWeightKgMin, avgWeightKgMax }`；至少收录 100 个常见品种 + `Mixed Breed (Small/Medium/Large/Giant)` 选项
- `src/lib/data/cat-breeds.ts` — 输出 `CAT_BREEDS: readonly string[]`；至少收录 40 个常见猫种 + `Mixed Breed / Domestic Shorthair` 选项

**原因**：品种数据是纯静态参考数据，属于 `lib/data/` 层（`ArkCon.md §5.3`），与 Phase 3 其他数据模块一致。T2.2 的临时占位（空数组）在此处替换为真实数据，Phase 2 T2.5 可随即接入。

**约束**：
- `ArkCon.md §5.3`：数据为静态 TS 模块，无运行时 fetch
- 数据文件只导入 `src/types/`，不导入 React 或任何其他模块

---

## ✅ Phase 3 完成确认检查

- [ ] `toxic-items.ts` 条目 ≥ 200
- [ ] 疫苗数据涵盖 US / UK / EU 三个地区
- [ ] EU 旅行规则覆盖全部 EU 成员国 + UK + 北欧特殊区
- [ ] `dog-breeds.ts` 收录 ≥ 100 品种，`cat-breeds.ts` 收录 ≥ 40 品种
- [ ] 所有数据文件 TypeScript 编译无错误
- [ ] 无运行时 fetch 调用

> **🛑 停止点**：Phase 3 完成后，通知用户确认后再进入 Phase 4。

---

---

# Phase 4 — 计算器逻辑层

> **目标**：实现所有 P0 工具的纯函数计算逻辑，全部返回 `Result<T>`，全部有单元测试。  
> **完成标志**：所有计算器单元测试 100% 通过。

### 依赖关系
依赖 Phase 0（`Result<T>`）和 Phase 3（静态数据）。每个计算器可独立并行开发。

---

## T4.1 — 狗年龄计算器

**文件目标**：`src/lib/calculators/dog-age.calc.ts`

公式（见 `README.MD §6.4`）：按体型分组，非线性系数换算。

```ts
export type DogAgeInput = {
  actualAgeYears: number;
  sizeClass: 'small' | 'medium' | 'large' | 'giant';
};
export type DogAgeResult = {
  humanAgeEquivalent: number;
  lifeStage: 'puppy' | 'junior' | 'adult' | 'mature' | 'senior' | 'geriatric';
  lifeStageDescription: string;
  formulaSource: string;
};
export function calculateDogAge(input: DogAgeInput): Result<DogAgeResult>
```

**测试文件**：`src/lib/calculators/dog-age.calc.test.ts`  
测试覆盖：各体型正常输入、年龄=0、年龄极大值、无效输入（负数）。

---

## T4.2 — 猫年龄计算器

**文件目标**：`src/lib/calculators/cat-age.calc.ts`

数据来源：AAHA/AAFP 2021 猫生命阶段指南（查找表，见 `README.MD §6.5`）。

```ts
export type CatAgeInput = { actualAgeMonths: number };
export type CatAgeResult = {
  humanAgeEquivalent: number;
  lifeStage: 'kitten' | 'junior' | 'prime' | 'mature' | 'senior' | 'geriatric';
  recommendedCheckupFrequency: string;
};
export function calculateCatAge(input: CatAgeInput): Result<CatAgeResult>
```

**测试文件**：`src/lib/calculators/cat-age.calc.test.ts`

---

## T4.3 — 狗卡路里/MER 计算器

**文件目标**：`src/lib/calculators/dog-calorie.calc.ts`

公式（见 `README.MD §6.6`）：
$$RER = 70 \times (\text{weightKg})^{0.75}$$
$$MER = RER \times \text{activityFactor}$$

```ts
export type ActivityScenario =
  | 'puppy_under_4m' | 'puppy_over_4m' | 'neutered_adult'
  | 'intact_adult' | 'weight_loss' | 'working_dog';

export type DogCalorieInput = {
  weightKg: number;
  activityScenario: ActivityScenario;
  foodCalorieDensityKcalPerKg?: number; // 可选
};
export type DogCalorieResult = {
  rer: number;
  mer: number;
  activityFactor: number;
  dailyFoodGrams: number | null; // 仅当提供热量密度时
};
export function calculateDogCalorie(input: DogCalorieInput): Result<DogCalorieResult>
```

**活动系数表**（来源：AAHA 2021 Nutritional Guidelines，存入 `src/constants/calorie.constants.ts`）：

| ActivityScenario | 系数 | 说明 |
|---|---|---|
| `puppy_under_4m` | 3.0 | 4 月龄以下幼犬 |
| `puppy_over_4m` | 2.0 | 4 月龄以上幼犬 |
| `neutered_adult` | 1.4 | 绝育成犬 |
| `intact_adult` | 1.6 | 未绝育成犬 |
| `weight_loss` | 1.0 | 减重（基于理想体重 RER 计算）|
| `working_dog` | 5.0 | 工作犬（范围 4.0–8.0，取中间值）|

**约束**：所有系数提取为 `src/constants/calorie.constants.ts` 中的命名常量（无魔法数字）。  
**测试文件**：`src/lib/calculators/dog-calorie.calc.test.ts`（验证精确输出值）

---

## T4.4 — 妊娠期计算器（犬/猫通用）

**文件目标**：`src/lib/calculators/gestation.calc.ts`

```ts
export type GestationInput = {
  species: 'dog' | 'cat';
  matingDates: string[]; // ISO date strings，支持多次交配日期
};
export type GestationResult = {
  earliestDate: string;
  likelyDate: string;
  latestDate: string;
  milestones: { dayOffset: number; label: string; date: string }[];
};
export function calculateGestation(input: GestationInput): Result<GestationResult>
```

犬类平均 63 天（范围 58–68），猫类平均 65 天（范围 63–67）。  
多次交配日期取平均值。  
里程碑按 `README.MD §6.2` 定义。

**测试文件**：`src/lib/calculators/gestation.calc.test.ts`

---

## T4.5 — 幼犬成年体重预测器

**文件目标**：`src/lib/calculators/puppy-growth.calc.ts`

使用 Phase 3 `puppy-growth-curves.ts` 数据：
```ts
export type PuppyGrowthInput = {
  currentAgeWeeks: number;
  currentWeightKg: number;
  sizeClass: 'small' | 'medium' | 'large' | 'giant';
};
export type PuppyGrowthResult = {
  predictedAdultWeightKgMin: number;
  predictedAdultWeightKgMax: number;
  growthCurvePoints: { ageWeeks: number; weightKg: number }[]; // 供 Chart.js 使用
  currentPercentile: number;
};
export function calculatePuppyGrowth(input: PuppyGrowthInput): Result<PuppyGrowthResult>
```

**测试文件**：`src/lib/calculators/puppy-growth.calc.test.ts`

---

## T4.6 — 猫体态评估（BCS）计算器

**文件目标**：`src/lib/calculators/cat-bcs.calc.ts`

```ts
export type CatBCSInput = {
  bcsScore: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  currentWeightKg: number;
};
export type CatBCSResult = {
  bodyCondition: 'underweight' | 'ideal' | 'overweight' | 'obese';
  idealWeightKgMin: number;
  idealWeightKgMax: number;
  dailyCalorieLimit: number | null;  // 仅当 bcs >= 6
  weeksToIdealWeight: number | null;
  hepaticLipidosisWarning: boolean;  // 当热量限制接近危险边界时
};
export function calculateCatBCS(input: CatBCSInput): Result<CatBCSResult>
```

**安全约束**（`README.MD §6.8`）：热量限制不得低于理想体重 RER × 0.8。违反时 `hepaticLipidosisWarning: true`。  
**测试文件**：`src/lib/calculators/cat-bcs.calc.test.ts`（必须测试热量安全下限边界）

---

## T4.7 — 猫饮水量计算器

**文件目标**：`src/lib/calculators/cat-hydration.calc.ts`

公式（见 `README.MD §6.9`）：
$$\text{totalDaily} = \text{weightKg} \times 50$$
$$\text{fromFood} = (\text{dryFoodG} \times 0.1) + (\text{wetFoodG} \times 0.8)$$
$$\text{extraNeeded} = \text{totalDaily} - \text{fromFood}$$

```ts
export type CatHydrationInput = {
  weightKg: number;
  dailyDryFoodGrams: number;
  dailyWetFoodGrams: number;
};
export type CatHydrationResult = {
  totalDailyMl: number;
  fromFoodMl: number;
  extraWaterNeededMl: number;
  hydrationStatus: 'adequate' | 'slightly_low' | 'low';
};
export function calculateCatHydration(input: CatHydrationInput): Result<CatHydrationResult>
```

**测试文件**：`src/lib/calculators/cat-hydration.calc.test.ts`

---

## T4.8 — 疫苗时间表生成器

**文件目标**：`src/lib/calculators/vaccination.calc.ts`

使用 Phase 3 `vaccination-schedule.ts` 数据：
```ts
export type VaccinationInput = {
  species: 'dog' | 'cat';
  birthDate: string;       // ISO date
  region: 'US' | 'UK' | 'EU';
};
export type VaccinationEntry = {
  vaccine: string;
  type: 'core' | 'non-core';
  dueDate: string;
  status: 'overdue' | 'upcoming' | 'future';
  nonCoreNote?: string;
};
export type VaccinationResult = {
  schedule: VaccinationEntry[];
  nextDueDate: string | null;
};
export function generateVaccinationSchedule(input: VaccinationInput): Result<VaccinationResult>
```

**测试文件**：`src/lib/calculators/vaccination.calc.test.ts`（测试各地区核心疫苗时间点）

---

## T4.9 — 毒性检索计算器

**文件目标**：`src/lib/calculators/toxic.calc.ts`

```ts
export type ToxicSearchInput = {
  query: string;
  species: 'dog' | 'cat';
};
export type ToxicSearchResult = {
  items: ToxicItem[];
  exactMatch: ToxicItem | null;
};
export function searchToxicItems(input: ToxicSearchInput): Result<ToxicSearchResult>
```

实现多级匹配（不依赖外部库，纯内存操作）。搜索同时查询 `name` 和 `aliases` 字段，结果按以下优先级排序：

1. **精确匹配**：`name` 或任意 `alias` 大小写不敏感完全等于 query
2. **前缀匹配**：`name` 或任意 `alias` 以 query 开头（`startsWith`，忽略大小写）
3. **子串匹配**：`name` 或任意 `alias` 包含 query（`includes`，忽略大小写）
4. **模糊匹配**：仅当前三步**无任何结果**时，对 `name` 和 `aliases[0]` 计算 Levenshtein 距离 ≤ 2

结果 < 200ms 响应。

**测试文件**：`src/lib/calculators/toxic.calc.test.ts`（测试精确匹配、别名匹配、无结果、大小写不敏感）

---

## T4.10 — EU 旅行要求检查器

**文件目标**：`src/lib/calculators/eu-travel.calc.ts`

```ts
export type EUTravelInput = {
  species: 'dog' | 'cat';
  originCountry: string;     // ISO 3166-1 alpha-2
  destinationCountry: string;
  existingDocuments: string[]; // 用户已有的证明文件 ID 列表
};
export type EUTravelCheckResult = {
  satisfied: { requirement: TravelRequirement }[];
  missing: { requirement: TravelRequirement; leadTimeDays: number | null }[];
  totalLeadTimeDays: number;   // 最长等待周期
  isReadyToTravel: boolean;
};
export function checkEUTravelRequirements(input: EUTravelInput): Result<EUTravelCheckResult>
```

**测试文件**：`src/lib/calculators/eu-travel.calc.test.ts`

---

## ✅ Phase 4 完成确认检查

- [ ] 所有 10 个计算器单元测试通过
- [ ] 无任何 `any` 类型
- [ ] 无任何魔法数字（全部使用命名常量）
- [ ] 所有函数返回 `Result<T>`（无直接 throw）
- [ ] `calculateDogCalorie({ weightKg: 10, activityScenario: 'neutered_adult' })` 输出 MER ≈ 551 kcal（计算：RER = 70 × 10^0.75 ≈ 393.6，factor = 1.4，MER = 393.6 × 1.4 ≈ 551）

> **🛑 停止点**：Phase 4 完成后，通知用户确认后再进入 Phase 5。

---

---

# Phase 5 — 首页与 Hub 页面

> **目标**：实现首页、Dog Hub、Cat Hub、Shared Hub 页面及 sitemap/robots。  
> **完成标志**：`pnpm build` 成功，所有 Hub 页面有完整 metadata 和 JSON-LD。

### 依赖关系
依赖 Phase 1（UI 组件）和 Phase 3（routes.ts）

---

## T5.1 — 首页

**文件目标**：`src/app/page.tsx`

实现 `Docs/01-homepage-zh.md §3–§4` 全部区块：
1. 导航（来自 Header 组件）
2. Hero 区块（2列布局：左文案 + 右档案预览卡）
3. 工具发现（Dog / Cat 标签页切换的工具网格）
4. 统计/信任栏（200+ 食物 / 14 工具 / 400+ 品种等）
5. 宠物档案聚焦（差异化说明）
6. 特色工具预览（毒性检测器）
7. 页脚

必须包含：
- `export const metadata: Metadata`（SEO 元数据）
- Organization + WebSite Schema.org JSON-LD（通过 `JsonLdScript` 组件）
- 所有文字来自 `messages/en.json`

---

## T5.2 — Dog Hub 页面

**文件目标**：`src/app/dog/page.tsx`

实现 `Docs/03-dog-hub-zh.md §3–§4`：
- 琥珀色 Hero（`linear-gradient(135deg, #92400E 0%, #D97706 60%, #F59E0B 100%)`）
- 工具网格（P0 特色 + 全部）
- SEO 内容区块

metadata + CollectionPage Schema.org JSON-LD

---

## T5.3 — Cat Hub 页面

**文件目标**：`src/app/cat/page.tsx`

与 Dog Hub 同结构，使用猫咪紫罗兰色主题，展示猫咪工具集。  
参考 `Docs/04-cat-hub-zh.md`。

---

## T5.4 — Sitemap 与 Robots

**文件目标**：
- `src/app/sitemap.ts`（见 `ArkCon.md §6.1`，从 `lib/data/routes.ts` 生成，包含所有工具页 + 毒性落地页 + EU 旅行落地页）
- `src/app/robots.ts`（已在 T0.8 创建，此处确认与 sitemap 联动正确）

---

## T5.5 — OG 图片资源

**文件目标**：`public/og/` 目录下的静态 WebP 图片（1200×630px，≤ 150 KB）

| 文件名 | 对应页面 |
|--------|----------|
| `home.webp` | 首页 |
| `dog-hub.webp` | Dog Hub |
| `cat-hub.webp` | Cat Hub |
| `dog-age-calculator.webp` | 狗年龄换算器 |
| `cat-age-calculator.webp` | 猫年龄换算器 |
| `dog-calorie-calculator.webp` | 狗卡路里计算器 |
| `puppy-growth-predictor.webp` | 幼犬体重预测器 |
| `gestation-calculator.webp` | 妊娠期计算器（犬/猫通用） |
| `vaccination-schedule.webp` | 疫苗时间表 |
| `cat-bcs-weight-tracker.webp` | 猫 BCS 减脂计算器 |
| `cat-hydration-calculator.webp` | 猫饮水量计算器 |
| `toxic-checker.webp` | 毒性检测器 |
| `eu-pet-travel-checker.webp` | EU 旅行检查器 |

**制作规范**：每张图片使用品牌 navy 背景 + 工具名称 + petsMetrics logo。可使用 Figma 批量导出或命令行工具（如 `sharp`）生成占位图，Phase 9 前替换为最终设计版本。

**约束**：`ArkCon.md §8`：图片使用 `<img>` 而非 Next.js `<Image>`，WebP 格式，文件体积 ≤ 150 KB。

---

## ✅ Phase 5 完成确认检查

- [ ] `pnpm build` 无错误，全部输出为静态文件
- [ ] 首页、Dog Hub、Cat Hub Lighthouse Performance ≥ 90
- [ ] sitemap.xml 包含所有工具页 URL
- [ ] 所有页面有 canonical URL（通过 metadata.alternates.canonical）
- [ ] `public/og/` 下所有 OG 图片已创建（≥ 13 张，每张 ≤ 150 KB）

> **🛑 停止点**：Phase 5 完成后，通知用户确认后再进入 Phase 6。

---

---

# Phase 6 — P0 工具页面（12 个工具）

> **目标**：实现所有 P0 工具的完整用户界面（Widget + page.tsx + 关联 i18n 键）。  
> **完成标志**：所有 12 个工具页在浏览器中可正常运算并展示结果（含共享工具：毒性检测器 T6.11 + EU 旅行检查器 T6.12）。

### 依赖关系
依赖 Phase 1（UI 原子组件）、Phase 2（档案系统/PetProfileBar）、Phase 4（所有计算器）

> 💡 **并行提示**：T6.1–T6.12 彼此独立，可同时开发；只要同一个 hook → widget → page 的链条内部保持顺序即可。

---

## T6.1 — 狗年龄换算器

**文件目标**：

| 文件 | 类型 | 说明 |
|------|------|------|
| `src/hooks/useDogAge.ts` | 'use client' hook | 包装 `calculateDogAge`，管理表单状态 |
| `src/components/dog/DogAgeWidget.tsx` | Client Component | 表单（年龄输入 + 体型选择）+ 结果 + 分享 + 生命阶段卡片 |
| `src/app/dog/age-calculator/page.tsx` | Server Component | metadata + JSON-LD + SidebarLayout + DogAgeWidget |

设计参考：`Docs/08-age-calculators-zh.md §4`

---

## T6.2 — 猫年龄换算器

**文件目标**：

| 文件 | 类型 |
|------|------|
| `src/hooks/useCatAge.ts` | hook |
| `src/components/cat/CatAgeWidget.tsx` | Client Component |
| `src/app/cat/age-calculator/page.tsx` | Server Component |

设计参考：`Docs/08-age-calculators-zh.md §5`

---

## T6.3 — 狗卡路里/MER 计算器

**文件目标**：

| 文件 | 类型 |
|------|------|
| `src/hooks/useDogCalorie.ts` | hook |
| `src/components/dog/DogCalorieWidget.tsx` | Client Component |
| `src/app/dog/calorie-calculator/page.tsx` | Server Component |

设计参考：`Docs/09-feeding-calculators-zh.md`（狗卡路里部分）

---

## T6.4 — 幼犬成年体重预测器

**文件目标**：

| 文件 | 类型 | 说明 |
|------|------|------|
| `src/hooks/usePuppyGrowth.ts` | hook | |
| `src/components/dog/PuppyGrowthWidget.tsx` | Client Component | 含 Chart.js 生长曲线图 |
| `src/app/dog/puppy-growth-predictor/page.tsx` | Server Component | |

⚠️ **Chart.js 注意**：`chart.js` + `react-chartjs-2` 已在 T0.2 安装。组件需在 `'use client'` 内使用，直接 import（无需 `dynamic()`，见 `copilot-instructions.md §8` 禁用模式说明）。

---

## T6.5 — 狗妊娠期计算器

**文件目标**：

| 文件 | 类型 |
|------|------|
| `src/hooks/useGestation.ts` | hook（犬/猫通用，接受 species 参数）|
| `src/components/dog/DogGestationWidget.tsx` | Client Component |
| `src/app/dog/gestation-calculator/page.tsx` | Server Component |

设计参考：`Docs/06-gestation-calculator-zh.md`（犬类部分）

---

## T6.6 — 猫妊娠期计算器

**文件目标**：

| 文件 | 类型 |
|------|------|
| `src/components/cat/CatGestationWidget.tsx` | Client Component（复用 useGestation hook）|
| `src/app/cat/gestation-calculator/page.tsx` | Server Component |

---

## T6.7 — 狗疫苗时间表生成器

**文件目标**：

| 文件 | 类型 |
|------|------|
| `src/hooks/useVaccinationSchedule.ts` | hook（犬/猫通用）|
| `src/components/dog/DogVaccinationWidget.tsx` | Client Component |
| `src/app/dog/vaccination-schedule/page.tsx` | Server Component |

设计参考：`Docs/07-vaccination-schedule-zh.md`

关键 UI 元素：
- 输入：出生日期 + 地区（US/UK/EU）下拉
- 输出：时间表表格（周龄/月龄 / 疫苗 / 状态徽章）
- 侧边栏：保险 Banner + 邮件提醒 CTA（占位）

---

## T6.8 — 猫疫苗时间表生成器

**文件目标**：

| 文件 | 类型 |
|------|------|
| `src/components/cat/CatVaccinationWidget.tsx` | Client Component（复用 useVaccinationSchedule）|
| `src/app/cat/vaccination-schedule/page.tsx` | Server Component |

---

## T6.9 — 猫体态评估（BCS）与减脂计算器

**文件目标**：

| 文件 | 类型 | 说明 |
|------|------|------|
| `src/hooks/useCatBCS.ts` | hook | |
| `src/components/cat/CatBCSWidget.tsx` | Client Component | 含图片选择题（BCS 视觉评估）|
| `src/app/cat/bcs-weight-tracker/page.tsx` | Server Component | |

设计参考：`Docs/09-feeding-calculators-zh.md`（猫 BCS 部分）

⚠️ **BCS 图片**：使用 `public/images/bcs-[1-9].webp` 静态图片资源（< 150KB）；使用 `<img>` 而非 Next.js `<Image>`（SSG 限制，见 `ArkCon.md §4.1`）。

结果页必须显示：
1. 肝脂肪沉积症警告（当 `hepaticLipidosisWarning: true`）
2. BCS 误判风险说明（固定文案，来自 i18n）
3. 标准免责声明

---

## T6.10 — 猫饮水量计算器

**文件目标**：

| 文件 | 类型 |
|------|------|
| `src/hooks/useCatHydration.ts` | hook |
| `src/components/cat/CatHydrationWidget.tsx` | Client Component |
| `src/app/cat/hydration-calculator/page.tsx` | Server Component |

---

## T6.11 — 毒性食物与植物检测器

**文件目标**：

| 文件 | 类型 | 说明 |
|------|------|------|
| `src/hooks/useToxicChecker.ts` | hook | 实时搜索（防抖 200ms）|
| `src/components/shared/ToxicCheckerWidget.tsx` | Client Component | 搜索框 + 结果卡 + 物种切换 |
| `src/app/shared/toxic-checker/page.tsx` | Server Component | |

设计参考：`Docs/05-toxic-checker-zh.md §3–§4`

关键交互：
- 输入后 200ms 内显示结果（防抖 + 纯内存搜索）
- 结果卡：TOXIC（红）/ CAUTION（黄）/ SAFE（绿）三种视觉状态
- TOXIC 结果固定显示紧急电话：ASPCA 888-426-4435
- 物种切换（Dog / Cat）实时更新毒性等级显示

---

## T6.12 — EU 宠物跨境旅行检查器（P0）

**文件目标**：

| 文件 | 类型 |
|------|------|
| `src/hooks/useEUTravel.ts` | hook |
| `src/components/shared/EUTravelWidget.tsx` | Client Component |
| `src/app/shared/eu-pet-travel-checker/page.tsx` | Server Component |

设计参考：`Docs/10-p1-tools-zh.md`（EU 旅行检查器部分）

输出展示：
- ✅ 已满足条目（绿色）
- ❌ 缺少条目（红色）+ 完成周期说明
- 总共需要提前多少天开始准备
- 每项的官方信息来源链接

---

## ✅ Phase 6 完成确认检查

- [ ] 全部 12 个工具在浏览器中可正常计算并显示结果（含毒性检测器 T6.11 + EU 旅行检查器 T6.12）
- [ ] 所有工具页有完整 metadata（title ≤ 60 字符 / description ≤ 155 字符）
- [ ] 所有工具结果页包含 `DisclaimerSection`（标准免责声明）
- [ ] 所有 Client Component 根节点被 ErrorBoundary 包裹
- [ ] PetProfileBar 在有档案时正确显示并自动填充表单
- [ ] 无任何 `console.log` 遗留
- [ ] 毒性检测器搜索响应 < 200ms

> **🛑 停止点**：Phase 6 完成后，通知用户确认后再进入 Phase 7。

---

---

# Phase 7 — SEO 动态落地页

> **目标**：为毒性数据库每条条目生成独立静态落地页，捕获 "Can dogs eat X?" 类长尾关键词。这是全站最大的 SEO 流量入口。  
> **完成标志**：`pnpm build` 输出 200+ 个独立的毒性落地页静态 HTML 文件。

### 依赖关系
依赖 Phase 3（toxic-items 数据 + routes.ts）和 Phase 4（toxic.calc.ts）

---

## T7.1 — 狗毒性落地页（动态路由）

**文件目标**：`src/app/dog/can-dogs-eat/[slug]/page.tsx`

```ts
// 强制预渲染所有 slug（ArkCon.md §3.2）
export async function generateStaticParams() {
  return getAllToxicSlugs()
    .filter(e => e.species === 'dog' || e.species === 'both')
    .map(e => ({ slug: e.slug }));
}

// 动态 metadata（ArkCon.md §6.2）
export async function generateMetadata({ params }: Props): Promise<Metadata>
```

页面内容（Server Component）：
- H1：`Can Dogs Eat [Food Name]? — [Safe/Toxic/Caution]`
- 毒性等级徽章（大号，色彩鲜明）
- 症状列表（如为 TOXIC）
- 紧急联系信息（如为 TOXIC）
- 安全参考量（如为 CAUTION）
- FAQPage Schema.org JSON-LD
- Article Schema.org JSON-LD
- 面包屑：首页 > 狗狗 > Can Dogs Eat > [Item]
- 相关条目推荐（同类别其他食物）

---

## T7.2 — 猫毒性落地页（动态路由）

**文件目标**：`src/app/cat/are-toxic-to-cats/[slug]/page.tsx`

与 T7.1 同结构，H1 模式：`Is [Plant/Food] Toxic to Cats? — [Level]`

---

## T7.3 — 更新 sitemap.ts

确认 sitemap 包含所有 200+ 个毒性落地页 URL（`priority: 0.8`）以及 T7.4 生成的 EU 旅行落地页。

---

## T7.4 — EU 宠物旅行落地页（国家对路由）

**文件目标**：`src/app/shared/eu-pet-travel/[route]/page.tsx`

URL 格式：`/shared/eu-pet-travel/[origin]-to-[destination]/`（如 `/shared/eu-pet-travel/us-to-de/`）

```ts
// generateStaticParams 从 routes.ts 生成（ArkCon.md §3.2）
export async function generateStaticParams() {
  return getAllEUTravelRoutes().map(({ origin, destination }) => ({
    route: `${origin.toLowerCase()}-to-${destination.toLowerCase()}`,
  }));
}
```

**页面内容**（Server Component，无 JS 依赖）：
- H1：`Traveling to [Destination] with Your Pet — Requirements Checklist`
- 完整需求清单（✅ 满足 / ❌ 缺少，含各项 `leadTimeDays`）
- FAQPage Schema.org JSON-LD（每项要求对应一个问答对）
- 面包屑：首页 > EU 宠物旅行 > [Origin] → [Destination]
- 末尾 CTA 链接至 `/shared/eu-pet-travel-checker/`（交互式计算器）

**SEO 目标**：捕获 "traveling to Germany with dog", "UK to France pet travel requirements" 类长尾词。该品类是英语工具站中竞争最薄弱的空白（见 `README.MD §1.1`）。

**数据约束**：路由列表由 `getAllEUTravelRoutes()`（T3.5）生成，覆盖所有 EU 成员国 + UK 的高频入境组合，至少 40 个国家对。

---

## ✅ Phase 7 完成确认检查

- [ ] `pnpm build` 生成 200+ 个毒性落地页
- [ ] 每页有独立 canonical URL
- [ ] 每页有 FAQPage + Article JSON-LD
- [ ] TOXIC 级别页面展示 ASPCA 紧急电话
- [ ] `generateStaticParams` 从数据文件生成（无硬编码 slug 数组）
- [ ] EU 旅行落地页已生成（至少 40 个国家对静态页面）
- [ ] EU 落地页每页有 FAQPage JSON-LD 且包含链接至交互工具页的 CTA

> **🛑 停止点**：Phase 7 完成后，通知用户确认后再进入 Phase 8。

---

---

# Phase 8 — P1 工具

> **目标**：实现 BARF 生食计算器和宠物保险估算器两个 P1 工具（P0 发布后 3 个月内上线）。  
> **完成标志**：两个工具页可正常计算，BARF 有 PDF 导出占位（不含真实 PDF 生成）。

### 依赖关系
依赖 Phase 1–4 全部完成

---

## T8.1 — BARF 数据与计算器

**文件目标**：
- `src/lib/data/barf-data.ts`（犬/猫各成分比例常量，见 `README.MD §7.1`）
- `src/lib/calculators/barf.calc.ts`
- `src/lib/calculators/barf.calc.test.ts`

```ts
export type BARFInput = {
  species: 'dog' | 'cat';
  targetWeightKg: number;
  dailyFeedingPercentage: number; // 通常 0.02–0.03
};
export type BARFResult = {
  muscleMeatG: number;
  rawMeatyBoneG: number;
  liverG: number;
  secretingOrganG: number;
  vegetablesG: number | null; // 猫咪为 null
  totalG: number;
};
export function calculateBARF(input: BARFInput): Result<BARFResult>
```

---

## T8.2 — BARF Widget + 页面

**文件目标**：

| 文件 | 类型 |
|------|------|
| `src/hooks/useBARF.ts` | hook |
| `src/components/shared/BARFWidget.tsx` | Client Component |
| `src/app/shared/barf-calculator/page.tsx` | Server Component |

每周购物清单 PDF 按钮：使用**禁用状态**按钮占位，不显示具体价格（避免展示未实现功能的标价引发合规风险）：

```tsx
<button disabled aria-disabled="true" className="opacity-50 cursor-not-allowed ...">
  {t('barf.pdfExport.comingSoon')}
</button>
```

i18n 键 `barf.pdfExport.comingSoon` 文案：`"PDF Export — Coming Soon"`（已在 T1.4 i18n schema 中预定义）。不实现实际 PDF 生成（需 Stripe 支付层，超出 Phase 8 范围）。

---

## T8.3 — 保险数据与计算器

**文件目标**：
- `src/lib/data/insurance-data.ts`（各地区估算月费区间，见 `README.MD §7.3`）
- `src/lib/calculators/insurance.calc.ts`（输入：品类/品种/年龄/地区，输出：月费区间和主要保险商对比）
- `src/lib/calculators/insurance.calc.test.ts`

---

## T8.4 — 保险估算器 Widget + 页面

**文件目标**：

| 文件 | 类型 |
|------|------|
| `src/hooks/useInsurance.ts` | hook |
| `src/components/shared/InsuranceWidget.tsx` | Client Component |
| `src/app/shared/pet-insurance-estimator/page.tsx` | Server Component |

所有保险产品链接（Lemonade / Pumpkin / Trupanion / Petplan）均为 Affiliate 链接占位（`href="#affiliate-placeholder"` + 注释说明）。

---

## ✅ Phase 8 完成确认检查

- [ ] BARF 计算器正确输出各成分克重
- [ ] 猫咪模式下蔬菜行隐藏
- [ ] 保险估算器输出月费区间 + 保险商对比表
- [ ] 所有 Affiliate 链接有明确 "Sponsored" 标注
- [ ] 单元测试通过

> **🛑 停止点**：Phase 8 完成后，通知用户确认后再进入 Phase 9。

---

---

# Phase 9 — QA 与发布收尾

> **目标**：补全所有测试、无障碍检查、性能优化，达到可发布标准。  
> **完成标志**：Lighthouse Performance ≥ 95，所有表单测试通过，无 TypeScript 错误。

### 依赖关系
依赖所有前序阶段完成

---

## T9.1 — 补全组件测试（表单流程）

对以下 Widget 补写提交流程测试（使用 @testing-library/react + userEvent）：

| 测试文件 | 测试场景 |
|----------|----------|
| `DogAgeWidget.test.tsx` | 填写年龄/体型 → 提交 → 验证人类年龄显示 |
| `DogCalorieWidget.test.tsx` | 填写体重/场景 → 提交 → 验证 MER 数值 |
| `CatBCSWidget.test.tsx` | 选择 BCS 9 → 提交 → 验证警告文字显示 |
| `ToxicCheckerWidget.test.tsx` | 输入 "grapes" → 验证 TOXIC 徽章出现 |
| `DogGestationWidget.test.tsx` | 输入交配日期 → 验证预产期范围展示 |

---

## T9.2 — 无障碍审查（WCAG AA）

检查清单（`copilot-instructions.md §10`）：
- [ ] 所有 `<input>` / `<select>` 有关联 `<label>` 或 `aria-label`
- [ ] 所有纯图标按钮有 `aria-label`
- [ ] 所有 `<img>` 有 `alt`（装饰性图片用 `alt=""`）
- [ ] `focus:outline-none` 必须配套 `focus-visible:ring-*`
- [ ] 浅色/深色模式均通过 WCAG AA 对比度（4.5:1 正文 / 3:1 大文本）

---

## T9.3 — 性能审查与 Bundle 优化

目标（`README.MD §10.3`）：

| 指标 | 目标 |
|------|------|
| Lighthouse Performance | ≥ 95 |
| LCP | < 2.5s |
| FCP | < 1.2s |
| JS Bundle（gzip 后）| < 150 KB per page |

优化行动：
- 确认所有 `<img>` 使用 WebP 格式（< 150 KB）
- 确认 Chart.js 仅在需要的页面加载（Tree-shaking 验证）
- 确认字体仅包含 Latin + Latin-Extended 子集

---

## T9.4 — 广告位与联盟 Banner 占位完整性检查

确认以下每个结果页都有对应的 AffiliateBanner 占位：

| 工具 | 联盟变体 |
|------|----------|
| 妊娠期计算器 | insurance |
| 疫苗时间表 | insurance |
| 年龄换算器（犬/猫）| insurance |
| 卡路里计算器 | food（定制鲜粮）|
| BCS 减脂计算器 | food（定制鲜粮）|
| 猫饮水量计算器 | food（湿粮）|
| BARF 计算器 | pdf_upsell |

---

## T9.5 — Google AdSense 广告槽占位

在以下位置添加空 div 占位（含 `id` 属性，便于后续插入 AdSense 代码）：
- 工具页侧边栏底部：`<div id="adsense-sidebar-bottom" />`
- 结果区块下方：`<div id="adsense-result-below" />`

---

## T9.6 — E2E 冒烟测试

**文件目标**（均在 `e2e/` 根目录下，`ArkCon.md §12` 规范）：

| 测试文件 | 核心场景 |
|----------|----------|
| `e2e/profile-creation.spec.ts` | 创建档案全流程（7 步向导 → 保存 → 档案卡显示） |
| `e2e/profile-autofill.spec.ts` | 选中档案后打开工具页 → 表单字段自动填充 |
| `e2e/dog-age-calculator.spec.ts` | 输入年龄/体型 → 提交 → 结果正确显示 |
| `e2e/toxic-checker.spec.ts` | 搜索 "chocolate" → TOXIC 徽章出现 + 紧急电话显示 |

**选择器约束**（`copilot-instructions.md §9.3`）：所有 Playwright 选择器使用 `data-testid` 属性，禁止选择 CSS class 或可见文字。

补充至 `package.json` scripts：
```json
"test:e2e": "playwright test"
```

---

## T9.7 — 最终自检清单（`copilot-instructions.md §10`）

全项目扫描：
- [ ] 无 `any` 类型
- [ ] 无 `console.log`
- [ ] 无硬编码用户可见字符串
- [ ] 无硬编码 hex 颜色
- [ ] 无相对路径 `../../`（全部使用 `@/`）
- [ ] 无 `getStaticProps` / `getServerSideProps`
- [ ] 无未处理的 Promise 拒绝
- [ ] 每个结果区块有 `DisclaimerSection`
- [ ] 无 Barrel `index.ts` 再导出文件

---

## ✅ Phase 9 完成确认检查

- [ ] `pnpm test` 全部通过（单元测试 + 组件测试）
- [ ] `pnpm test:e2e` E2E 冒烟测试全部通过
- [ ] `pnpm build` 无错误，无警告
- [ ] Lighthouse Performance ≥ 95（至少在首页和 2 个工具页验证）
- [ ] 深色模式视觉正常
- [ ] 移动端（375px）所有页面布局正常
- [ ] 最终自检清单全部勾选

> 🎉 **Phase 9 完成 = 项目具备生产发布条件**

---

---

## 附录 A — URL 完整路由表

| URL Path | 文件 | 优先级 |
|----------|------|--------|
| `/` | `app/page.tsx` | P0 |
| `/profile/` | `app/profile/page.tsx` | P0 |
| `/dog/` | `app/dog/page.tsx` | P0 |
| `/dog/age-calculator/` | `app/dog/age-calculator/page.tsx` | P0 |
| `/dog/calorie-calculator/` | `app/dog/calorie-calculator/page.tsx` | P0 |
| `/dog/puppy-growth-predictor/` | `app/dog/puppy-growth-predictor/page.tsx` | P0 |
| `/dog/gestation-calculator/` | `app/dog/gestation-calculator/page.tsx` | P0 |
| `/dog/vaccination-schedule/` | `app/dog/vaccination-schedule/page.tsx` | P0 |
| `/dog/can-dogs-eat/[slug]/` | `app/dog/can-dogs-eat/[slug]/page.tsx` | P0 SEO |
| `/cat/` | `app/cat/page.tsx` | P0 |
| `/cat/age-calculator/` | `app/cat/age-calculator/page.tsx` | P0 |
| `/cat/bcs-weight-tracker/` | `app/cat/bcs-weight-tracker/page.tsx` | P0 |
| `/cat/hydration-calculator/` | `app/cat/hydration-calculator/page.tsx` | P0 |
| `/cat/gestation-calculator/` | `app/cat/gestation-calculator/page.tsx` | P0 |
| `/cat/vaccination-schedule/` | `app/cat/vaccination-schedule/page.tsx` | P0 |
| `/cat/are-toxic-to-cats/[slug]/` | `app/cat/are-toxic-to-cats/[slug]/page.tsx` | P0 SEO |
| `/shared/toxic-checker/` | `app/shared/toxic-checker/page.tsx` | P0 |
| `/shared/eu-pet-travel-checker/` | `app/shared/eu-pet-travel-checker/page.tsx` | P0 |
| `/shared/eu-pet-travel/[route]/` | `app/shared/eu-pet-travel/[route]/page.tsx` | P0 SEO |
| `/shared/barf-calculator/` | `app/shared/barf-calculator/page.tsx` | P1 |
| `/shared/pet-insurance-estimator/` | `app/shared/pet-insurance-estimator/page.tsx` | P1 |

---

## 附录 B — 计算器依赖图

```
src/types/common.types.ts
    └─ src/lib/calculators/* (所有计算器返回 Result<T>)
           └─ src/lib/data/* (静态数据，单向依赖)

src/lib/storage/profile.storage.ts
    └─ src/hooks/useProfile.ts
           └─ src/components/profile/* (档案 UI 组件)

src/lib/calculators/[tool].calc.ts
    └─ src/hooks/use[Tool].ts
           └─ src/components/[section]/[Tool]Widget.tsx (Client Component)
                  └─ src/app/[section]/[tool-slug]/page.tsx (Server Component)
```

---

## 附录 C — 禁止模式速查（重要提醒）

| 禁止 | 原因 | 替代 |
|------|------|------|
| `<Image>` from next/image | SSG 不支持图片优化器 | `<img>` + 预优化 WebP |
| `dynamic(() => import(...))` | Pages Router 模式 | 直接 import（App Router Client Component）|
| `app/api/*` 路由 | SSG 不支持 API Routes | 纯客户端计算 |
| `fetch()` 在组件体内 | 每次渲染重新执行 | Server Component data access 或 lib/data/ 静态数据 |
| 前端 Stripe API 调用 | Secret Key 暴露风险 | Stripe Payment Links（见 README §9.2）|
| localStorage 直接在组件调用 | 违反层级规则 | `lib/storage/` 包装函数 |
