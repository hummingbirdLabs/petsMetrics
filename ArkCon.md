# 架构宪法（Architecture Constitution）

> **AI 强制准则**：本宪法是项目最高架构法。每次生成涉及架构、文件处理或跨项目引用的代码后，必须执行 §8 自检清单。
>
> **范围边界**：本文件只规定**架构层**规则。其他规则归属：
> - 代码层规则（命名 / TS / Tailwind / 依赖白名单）→ [.github/copilot-instructions.md](.github/copilot-instructions.md)
> - 法律合规 / Cookie / Sentry PII 净化 → [docs/compliance.md](docs/compliance.md)
> - 产品契约（含工具特有的隐私承诺、公式治理、不做清单）→ `apps/<app>/PRD.md`

---

## 0. AI 阅读顺序

进入本仓库的 AI agents 应按 [README.md](README.md) §"AI Agents — 阅读顺序" 加载上下文。本文件是顺序中的第 2 份。

---

## 1. Monorepo 治理

pnpm workspaces 单仓库，严禁跨越物理边界引用。

```
/ (Root)
├── packages/              共享基础设施
│   ├── shared-types/      全局 TS 类型 (@tools/types)
│   ├── shared-ui/         基础组件库 (@tools/ui)
│   └── shared-i18n/       多语言配置 (@tools/i18n)
├── apps/                  独立业务应用
│   ├── master-hub/
│   ├── tool-solar/
│   ├── tool-moonsync/
│   ├── tool-sidereal/
│   ├── tool-coordconv/
│   ├── tool-telescopefov/
│   ├── tool-planetaryhour/
│   ├── tool-twilight/
│   └── tool-morelabs/
├── docs/                  跨 app 规范 / 模板 / 阶段记录
├── pnpm-workspace.yaml
└── package.json
```

### 1.1 引用规则

- `apps/*` 通过 `workspace:*` 引用 `packages/*`，禁止 `apps` 之间互相引用。
- 共享契约（`Result<T>` / `AppError` / `SupportedLocales`）必须从 `@tools/*` 引用，禁止硬拷贝。
- `SUPPORTED_LOCALES` 唯一定义在 `@tools/i18n`：

  ```ts
  export const SUPPORTED_LOCALES = ['en', 'ja', 'de', 'fr', 'es', 'pt'] as const;
  export type SupportedLocale = typeof SUPPORTED_LOCALES[number];
  ```

- 所有 app 必须使用 `@tools/ui` 提供的 `Header` / `Footer` / `LanguageSwitcher` 保持品牌一致性。

### 1.2 跨 App 导航模式（强制）

各子 app 的 `AppShell` 通过 `Header` 的 `leftSlot` 提供品牌链接 + 工具导航。实现约束：

- **禁止使用 Next.js `<Link>`**：因为导航目标是另一个 Vercel 部署，`<Link>` 会导致客户端路由失效；必须使用原生 `<a href>`。
- **唯一基准 URL**：`HOME_BASE = "https://fastool.io"`，硬编码于各 AppShell，禁止读取环境变量（SSG 无法注入运行时 env）。
- **i18n 键结构**（所有 app 的 6 个语言文件均须包含）：
  ```json
  "common": {
    "nav": {
      "brand": "FastTool",
      "allTools": "All Tools",
      "tools": {
        "solar": "Solar Insight",
        "moonsync": "MoonSync",
        "sidereal": "Sidereal Time",
        "coordconv": "Coord Converter",
        "telescopefov": "Telescope FOV",
        "planetaryhour": "Planetary Hour",
        "twilight": "Twilight Calculator",
        "molarmass": "Molar Mass",
        "energy": "Eco-Metrics"
      }
    }
  }
  ```
- **参考实现**：`apps/tool-solar/src/components/AppShell.tsx`（`leftSlot` + `HOME_BASE` + `TOOL_LINKS`）。

### 1.3 偏离机制

极少数 app 需要偏离本宪法时，必须在 `apps/<app>/ARCHITECTURE.delta.md` 中列出：差异点 / 偏离理由 / 失效条件。PR 需双人审核。

---

## 2. 应用内四层架构（物理隔离）

禁止跨层直接调用。

| 层 | 路径 | 职责 | 红线 |
|----|------|------|------|
| View | `src/components/` | 渲染与交互 | 禁止数学公式 / 文件处理 / 正则解析等业务逻辑 |
| Logic | `src/lib/` | 纯函数（Pure Functions） | 禁止引用 React API；100% 可单测 |
| i18n | `src/i18n/` | 多语言加载 | 仅使用客户端 API（`useTranslations`），禁止 `getTranslations`（server） |
| Types | `src/types/` | 当前 app 特有的 TS 接口 | 共享类型必须从 `@tools/types` 引用 |

---

## 3. 内存清理强制令（跨切面）

文件 / Worker / Canvas / pdf.js 文档处理完成后必须逐项执行：

```ts
URL.revokeObjectURL(url);           // 配对 createObjectURL
await pdfDoc.destroy();             // pdfjs-dist 文档对象
worker.terminate();                 // Web Worker
canvas.width = 0; canvas.height = 0; // Canvas 后台缓冲

useEffect(() => {
  const worker = new Worker(...);
  return () => worker.terminate();  // 必须包含 cleanup
}, []);
```

---

## 4. 反向代理与路径适配

### 4.1 URL 模型：强制子目录，禁止子域名（SEO 战略决策）

所有工具页面必须以子目录形式暴露在 `fastool.io` 根域名下（`fastool.io/en/solar`），**禁止以子域名（`solar.fastool.io`）作为 Google 索引的 Canonical URL**。

> 原因：子域名被 Google 视为独立实体，各工具的外链权重、Dwell Time、Domain Authority 无法叠加，SEO 飞轮无法形成。子目录模式下所有权重收归 `fastool.io` 根域名。

- 对用户/爬虫暴露的 URL 永远是 `fastool.io/[lang]/[tool-name]`。
- 子域名（`solar.fastool.io` 等）只作为 Vercel 内部内容载体，**不对外推广，不写入 Canonical**。

### 4.2 路径分工

- `master-hub`：唯一负责 `vercel.json` 中的对外路径映射，使用 **`rewrites`（透明代理）**，URL 不发生跳转。
- 子应用：`basePath` 必须留空；**禁止**在子应用 `vercel.json` 中配置跳回 `fastool.io` 的 redirect（会造成 rewrite ↔ redirect 死循环）。

### 4.3 新工具上线强制步骤（必须按顺序执行）

每新增一个工具 app，必须完成以下 5 步，**顺序不可颠倒**：

**Step 1：子应用 `next.config.mjs` 加 `assetPrefix`**

静态导出（`output: 'export'`）的 HTML 中，JS/CSS 默认路径为 `/_next/static/...`。Rewrite 后浏览器会去 `fastool.io/_next/...` 请求资源导致 404。必须将资源路径绑定到子域名绝对 URL：

```js
// apps/tool-xxx/next.config.mjs
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  assetPrefix: "https://xxx.fastool.io",  // 必填，值为该子应用的 Vercel 域名
};
```

**Step 2：先部署子应用**（带 `assetPrefix` 的版本必须先上线）

**Step 3：在 `master-hub/vercel.json` 的 `rewrites` 数组中注册路由**

```json
{ "source": "/:lang/xxx",        "destination": "https://xxx.fastool.io/:lang/xxx" },
{ "source": "/:lang/xxx/:path*", "destination": "https://xxx.fastool.io/:lang/xxx/:path*" },
{ "source": "/sitemaps/xxx.xml", "destination": "https://xxx.fastool.io/sitemap.xml" }
```

> ⚠️ sitemap 代理行（第 3 行）不可省略。省略后，`fastool.io/robots.txt` 中声明的
> `Sitemap: https://www.fastool.io/sitemaps/xxx.xml` 将返回 404，导致工具子页面无法被 Google 索引。

**Step 4：在 `packages/shared-i18n/src/tools.ts` 的 `REGISTERED_TOOLS` 中追加工具记录**

```ts
{ slug: "xxx", subdomain: "xxx.fastool.io" },
```

> `REGISTERED_TOOLS` 是工具 slug 的唯一数据源，`master-hub/app/sitemap.ts` 依赖它生成工具 Hub 页的 sitemap 条目。

**Step 5（原 Step 4）：更新 `master-hub/app/robots.ts`**

在 `sitemap` 数组中追加新工具的代理 sitemap URL：

```ts
"https://www.fastool.io/sitemaps/xxx.xml",
```

再部署 `master-hub`。

### 4.4 静态资源规范

引用 `/public` 下的资源必须通过 `getAssetUrl()`，统一定义在 `@tools/ui/utils/asset-url.ts`，禁止子应用重新实现。

```ts
export function getAssetUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_ASSET_PREFIX ?? '';
  return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}
```

---

## 5. 路由与静态导出（SSG）

- **强制配置**：每个 app `output: 'export'`，所有路径遵循 `/[lang]/[tool-name]`。
- **动态路由**：必须导出 `generateStaticParams()`：

  ```ts
  import { SUPPORTED_LOCALES } from '@tools/i18n';
  export function generateStaticParams() {
    return SUPPORTED_LOCALES.map(lang => ({ lang }));
  }
  ```

- **语言来源优先级**：根路径 `/` 由 Vercel 平台路由读取 `Accept-Language` 进行 302（不依赖 Next.js Middleware）；进入子应用后**仅以 URL 参数 `[lang]` 为准**，禁止使用 `navigator.language` 做二次改写。
- **客户端处理强制令**：所有核心业务逻辑必须在浏览器端完成，严禁服务器中转。

### 5.0 `master-hub` 特殊约束

`master-hub` 是主站（fastool.io），其 `app/[lang]/page.tsx` 包含客户端组件（`'use client'`），因此：

- **`generateMetadata` 不能从 `page.tsx` 导出**（Next.js 限制：`'use client'` 文件中导出的 `generateMetadata` 会被忽略）。
- **解决方案**：将 `generateMetadata` 和 JSON-LD `<script>` 放入 `app/[lang]/layout.tsx`（Server Component）。
- **参考实现**：`apps/master-hub/app/[lang]/layout.tsx`（含 `generateMetadata` + `WebSite` + `ItemList` JSON-LD）。
- 如未来需要 `page.tsx` 支持 SSG 元数据，正确做法是将客户端逻辑提取为独立的 Client Component 文件（如 `MasterHubPageContent.tsx`），使 `page.tsx` 本身成为 Server Component。

### 5.1 Guide 页跨 App 约定

凡工具 app 有配套操作说明文章（"how to ... " 类长尾 SEO），必须遵守本约定。

```
/{lang}/{tool}/guides/{slug}
```

- `slug` 命名规则：`how-to-{verb}-{tool}`（kebab-case），例如 `how-to-merge-pdf`。
- Slug 合法集合必须集中定义于 `src/lib/guides.ts` 的 `GUIDE_SLUGS as const` 数组，是**唯一数据源**，禁止在其他文件硬编码 slug 字符串。

#### 强制文件结构

每个含 Guide 的 app 必须存在以下文件：

| 文件 | 职责 |
|------|------|
| `src/lib/guides.ts` | `GUIDE_SLUGS` / `GUIDE_TOOL_HREF` / `isGuideSlug()` |
| `app/[lang]/[tool]/guides/[slug]/page.tsx` | Guide 路由，调用 `GuidePageLayout` 渲染 |

#### 渲染组件（强制）

Guide 页面**必须**使用 `@tools/ui` 提供的 `GuidePageLayout` Server Component。**禁止**在各 app 内自行实现 Guide 布局，以保持品牌和结构一致性。

#### i18n 键结构（统一约定）

```
messages/{lang}.json
└── guides
    ├── common
    │   ├── relatedTitle          关联指南标题
    │   ├── badges.*              隐私徽章文案
    │   ├── relatedLabels.{slug}  各 Guide 链接标签
    │   └── relatedDesc.{slug}    各 Guide 一行摘要
    └── {slug}
        ├── seo.title / seo.description / seo.keywords
        ├── title / lead
        ├── stepCount             步骤总数（字符串）
        ├── steps.{i}.title / steps.{i}.description
        ├── ctaLabel
        ├── faqCount              FAQ 总数（字符串）
        ├── faq.{i}.question / faq.{i}.answer
        └── related               逗号分隔的关联 slug
```

> `stepCount` / `faqCount` 存储为字符串，调用处用 `Number()` 转换（next-intl 全部值为字符串类型）。

#### Hub 页入口（强制）

- 每个工具 app 的 Hub 页**必须**在底部渲染 Guide 卡片区块，由 `GUIDE_SLUGS` 驱动。
- 区块标题 i18n 键：`hub.guides`（须在所有 6 个语言文件中定义）。
- Guide 卡片**禁止**出现在工具工作台组件内，避免干扰主操作流。

#### 新增 Guide 四步清单

1. 在 `GUIDE_SLUGS` 添加 slug，在 `GUIDE_TOOL_HREF` 添加对应工具页相对路径。
2. 在所有 6 个 `messages/{lang}.json` 的 `guides.{slug}.*` 下填充必填键，并在 `guides.common.relatedLabels` / `relatedDesc` 追加条目。
3. 在 `sitemap.ts` 确认新 slug 已被 `GUIDE_SLUGS` 驱动的循环覆盖（无需手动追加）。
4. 在 Hub 页确认 Guide 卡片区块已从 `GUIDE_SLUGS` 自动渲染新条目。

**参考实现**：`apps/tool-morelabs/src/lib/guides.ts`、`apps/tool-morelabs/app/[lang]/morelabs/guides/[slug]/page.tsx`

---

### 5.2 SEO 强制文件（每个 app 必须存在）

每个新工具 app 上线前，`app/` 目录下必须包含：

| 文件 | 作用 | 参考实现 |
|------|------|----------|
| `app/sitemap.ts` | 生成 `sitemap.xml`，覆盖所有 lang × 路由，含 `hreflang alternates` | `apps/tool-solar/app/sitemap.ts` |
| `app/robots.ts` | 生成 `robots.txt`，`Allow: /`，指向 sitemap URL | `apps/tool-solar/app/robots.ts` |

`sitemap.ts` 必须覆盖：Hub 页 + 所有工具子路由 + Guide 页（如有），优先级参考：Hub `1.0/0.8`，工具页 `0.9/0.7`，Guide 页 `0.8/0.6`（en / 非 en）。详见 [docs/seo-checklist.md](docs/seo-checklist.md)。

---

## 6. 错误处理契约

- **逻辑层契约**：所有 `async` 函数统一返回 `Result<T>`：

  ```ts
  export type Result<T> =
    | { success: true; data: T }
    | { success: false; error: { code: string; details?: string } };
  ```

  类型来自 `@tools/types`。

- **视图层要求**：
  - 每个工具根组件必须被 `ErrorBoundary` 包裹。
  - 错误信息通过 i18n 键名展示，禁止展示原始 Stack Trace。

---

## 7. 共享包不可变契约

| 包 | 职责 | 禁止 |
|----|------|------|
| `@tools/types` | `Result<T>` / `AppError` / 跨 app 类型 | 含具体业务逻辑 |
| `@tools/ui` | `Header` / `Footer` / `LanguageSwitcher` / `LegalContentProvider` / `EcoResultCard` / `GuidePageLayout` / `getAssetUrl` | 含 app 特定业务组件 |
| `@tools/i18n` | `SUPPORTED_LOCALES` / `LOCALE_MAP` / 通用 legal 文案 | 含 app 特定文案 |

---

## 8. 终极自检清单（每次生成代码后必须逐项勾选）

- [ ] **分层检查**：Logic Layer 是否引用了 React 钩子？
- [ ] **共享检查**：`Result` / `AppError` / `Locales` 是否引自 `@tools/*`？
- [ ] **内存检查**：`ObjectURL` 是否已 `revoke`？`Worker` 是否已 `terminate`？`Canvas` 是否释放？
- [ ] **SSG 检查**：动态路由是否包含 `generateStaticParams()`？
- [ ] **代理检查**：子应用是否错误设置了 `basePath`？新工具是否已按 §4.3 顺序（assetPrefix → 部署子应用 → 注册 rewrite → 部署 master-hub）完成上线配置？
- [ ] **assetPrefix 检查**：子应用 `next.config.mjs` 是否已设置 `assetPrefix: "https://[tool].fastool.io"`？
- [ ] **资源检查**：Worker / WASM / 静态资源路径是否使用 `getAssetUrl()`？
- [ ] **错误检查**：异步函数是否返回 `Result<T>`？工具根组件是否被 `ErrorBoundary` 包裹？
- [ ] **SEO 检查**：app 目录下是否存在 `sitemap.ts` 和 `robots.ts`？sitemap 是否覆盖全部 `lang × 路由`？详见 [docs/seo-checklist.md](docs/seo-checklist.md)。
- [ ] **Guide 检查**：若有 Guide 页，`GUIDE_SLUGS` 是否是唯一数据源？sitemap / Hub 页 / `generateStaticParams()` 是否均由 `GUIDE_SLUGS` 驱动（无硬编码 slug）？`hub.guides` i18n 键是否在所有 6 语言文件定义？
- [ ] **语法宪法**：是否同时满足 [.github/copilot-instructions.md](.github/copilot-instructions.md) 第 6 条自检？

