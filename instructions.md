# Syntax Constitution（语法宪法）

> AI 强制准则。每次生成代码后必须执行第6条自检清单。
> 违反任何条款必须自动纠正并标注原因。

---

## 1. 核心原则

- 禁止 `any`，用 `unknown` + 类型守卫替代。
- 所有函数的参数、返回值、State 必须有明确类型。
- 强制 ES2022+：`?.` `??` `??=` `structuredClone()`。
- 仅使用函数组件 + Hooks，禁止 Class 组件。

---

## 2. 命名规范

| 类型 | 规范 | 示例 |
|------|------|------|
| 变量 / 函数 | camelCase | `calculateCarbonFootprint` |
| 组件 / 接口 / 类型 / 枚举 | PascalCase | `PdfUploader` |
| 常量 / 枚举值 | UPPER_SNAKE_CASE | `MAX_FILE_SIZE` |
| React 组件文件 | PascalCase | `ResultsDisplay.tsx` |
| Next.js 约定文件 | 小写 | `page.tsx` `layout.tsx` |
| 工具函数文件 | kebab-case | `carbon-calculator.ts` |
| 类型定义文件 | kebab-case.types | `pdf-processor.types.ts` |
| i18n 语言文件 | URL 标识符 | `en.json` `pt.json` |

---

## 3. 样式规范

- 静态样式：只用 Tailwind 类名，禁止 CSS Modules 和 `<style>` 标签。
- 动态计算值（如进度条宽度）：允许内联 `style`，但值必须来自变量。

  ```tsx
  // ✅ 允许
  <div style={{ width: `${percentage}%` }} />
  // ❌ 禁止（静态值必须用 Tailwind）
  <div style={{ color: 'red' }} />
  ```

- 响应式：所有组件强制适配 `sm:` `md:` `lg:` 断点。
- UI 风格：Glassmorphism。
  标准卡片：`bg-white/80 backdrop-blur-sm shadow-sm rounded-xl border border-white/20`
- 动画：许可 `framer-motion`，仅用于页面级入场和模态框过渡。
  禁止在列表循环的每个子项上使用（性能风险）。

---

## 4. 多语言（i18n）— 强制

- **支持语言**：`[en, ja, de, fr, es, pt]`，`en` 为 fallback。
- **URL 标识符 → Intl BCP 47 映射**（唯一数据源）：

  ```ts
  // packages/shared-i18n/src/locale-map.ts（通过 @tools/i18n 导入）
  export const LOCALE_MAP: Record<SupportedLocale, string> = {
    en: 'en',
    ja: 'ja',
    de: 'de',
    fr: 'fr',
    es: 'es',
    pt: 'pt-BR',  // URL 用 /pt/，Intl API 用 pt-BR
  };
  ```

- **零硬编码**：禁止在 `.tsx` / `.ts` 中出现任何用户可见字符串。
  文案统一存放 `messages/[lang].json`。
- **键名格式**：

  ```
  页面级：  [page].[module].[element]   → home.hero.title
  工具错误：[tool].error.[code]         → pdf.error.fileTooLarge
  全局复用：common.[element]            → common.button.confirm
  ```

- **Intl API**：日期 / 数字 / 货币必须通过 `LOCALE_MAP` 转换后传入。

  ```ts
  // ✅ 正确
  new Intl.NumberFormat(LOCALE_MAP[lang], { style: 'currency', currency: 'USD' }).format(amount)
  // ❌ 禁止
  `$${amount.toFixed(2)}`
  ```

---

## 5. 依赖白名单

| 用途 | ✅ 许可 | ❌ 禁止 |
|------|--------|--------|
| PDF 处理 | `pdfjs-dist` `pdf-lib` | `pdfmake` |
| 图像压缩 | 浏览器原生 `Canvas` / `OffscreenCanvas` + `createImageBitmap` | `sharp`（Node-only）`jimp`（Node-only） |
| 图像编解码（WASM） | `@squoosh/lib`（仅如需 AVIF/JPEG-XL，须注释体积理由）| 无限制引入重型编解码器 |
| ZIP 打包 | `client-zip`（零依赖、流式） | `jszip`（体积较大） |
| 图标 | `lucide-react` | `react-icons` `@fortawesome` |
| 国际化 | `next-intl`（仅客户端 API）| `i18next` |
| 状态管理 | `zustand`（复杂跨组件状态）| `redux` `mobx` |
| HTTP | 原生 `fetch` | `axios` |
| 样式 | `tailwindcss` | `styled-components` `emotion` |
| 动画 | `framer-motion`（页面级）| 无限制滥用 |

白名单外的依赖，必须在代码注释中说明理由和包体积。

---

## 6. 自检清单（每次生成后必须执行）

- [ ] 存在 `any`？→ 替换为具体类型或 `unknown`
- [ ] 存在硬编码用户可见字符串？→ 提取到 i18n JSON（并同步到全部 6 个语言文件）**注意**：emoji 标签（如 `🌑 New`）、极短词（如 `Phase`）同样是用户可见字符串，不能豁免。
- [ ] 存在静态内联 style？→ 静态值必须用 Tailwind 类名；Tailwind 无法覆盖时（如 `backgroundImage` 渐变）提取到 `globals.css` 语义化类名，不能用内联 `style`（见 docs/patterns.md P-10）
- [ ] 引入白名单外依赖？→ 注释说明理由
- [ ] 函数缺少返回值类型？→ 补充
- [ ] `framer-motion` 用在列表循环中？→ 移除
- [ ] 使用 React hooks（含 `useTranslations`）的组件有 `'use client'`？→ 补充
- [ ] `useEffect` cleanup 通过 `useRef` 读 state？→ 避免 stale closure（见 docs/patterns.md P-02）
- [ ] 用 `key: undefined` 删除可选属性？→ 改为解构 omit（见 docs/patterns.md P-01）
- [ ] Canvas / Blob 所有退出路径都执行了内存释放？→ 见 docs/patterns.md P-03 / P-04
- [ ] `app/robots.ts` 的 `sitemap` 字段指向子域名（`https://{name}.fastool.io/sitemap.xml`），而非 `www.fastool.io`？→ 见 docs/patterns.md P-09
- [ ] 新工具页 JSON-LD `@type` 是 `SoftwareApplication`（非 `WebApplication`），含 `citation[]` ≥ 2 条？→ 见 docs/new-app-setup.md 第八点五步 C
- [ ] Hub / 工具页是否已包含 Knowledge Section（4 卡片）、FAQ Section、FAQPage JSON-LD？→ 见 docs/new-app-setup.md 第八点五步
- [ ] 工具页是否有 HowTo JSON-LD（≥ 3 步）？→ 工具操作类页面强制要求，参考 apps/tool-solar/app/[lang]/solar/page.tsx
- [ ] `openGraph.images` 是否存在（`/og/{tool}.png`，1200×630）？→ og:image 缺失会导致社交分享无图，间接影响点击率
- [ ] H1 是否包含核心关键词（不能仅为品牌名）？→ 允许用 `<span class="sr-only">` 追加关键词后缀
- [ ] `<input type="number">` 是否设置 `inputMode="decimal"`？→ 缺失会导致移动端弹出文字键盘而非数字键盘
- [ ] input `placeholder` 等属性字符串是否走 i18n？→ 硬编码 "e.g. 35.67" 等文案属于用户可见字符串，必须提取到语言文件
- [ ] 组件中每个 `t("key")` 调用，key 是否确实存在于该组件声明的 namespace 中？→ 跨 namespace 调用在运行时静默 missing key，例：组件用 `useTranslations("insights")` 却调用只存在于 `"photography"` namespace 的 key
- [ ] 冷启动（Cold Start）：用户初次访问时结果区是否有意义？→ 工具类页面须提供预设示例数据并立即渲染结果，配合可关闭的示例 banner（见 docs/patterns.md P-11）
- [ ] 接口中声明但组件函数体中从未解构/使用的 prop（dead code）是否已移除？

