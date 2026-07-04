# PRD: Comparison Pages ("vs" Matrix)

> 创建日期: 2026-07-03
> 状态: 实施中
> 优先级: P0
> 请求者: SEO Strategy (seo-programmatic.md Strategy 15)

## 1. 功能概述

实现 4 个高优先级对比文章页面，覆盖宠物健康领域的高意图"对比型"查询。这些页面是 SEO 内容矩阵的 P0 组成部分——用户在决策阶段搜索"A vs B"类查询，当前 SERP 几乎全被论坛帖和低质量博客占据，结构化工具站对比页是蓝海。

每个对比页包含：对比表格（Featured Snippet 候选）、双方案深度分析、结论建议、FAQ、相关工具 CTA 区块。所有页面为静态内容页（Server Component），无交互计算器。

## 2. 用户故事

> 作为一位正在纠结「干粮还是湿粮」「要不要绝育」的宠物主人，我想要一个客观、有数据支撑的对比页面，以便快速做出适合我家宠物的决策。

## 3. 功能规格

### 3.1 输入
本页面为静态内容页，无用户输入。

### 3.2 内容逻辑
每页对比两种方案（如干粮 vs 湿粮），从 5-8 维度客观对比，引用权威来源（AAFCO、AAHA、WSAVA、ISFM）。

### 3.3 输出
| 区块 | 内容 |
|------|------|
| Quick Comparison Table | 结构化对比表格（ Featured Snippet "Table" 候选）|
| Deep Dive A | 方案 A 深度分析（pros/cons/适用场景）|
| Deep Dive B | 方案 B 深度分析 |
| Verdict | 分场景结论建议（Paragraph Snippet 候选）|
| FAQ | 3 条 PAA 风格问答 |
| Related Tools CTA | 链接至相关计算器 |

### 3.4 UI 组件
复用现有组件库：
- `Breadcrumb` — 导航路径
- `DisclaimerSection` — 医疗免责声明
- `JsonLdScript` — JSON-LD 结构化数据
- 自定义 `ComparisonTable` 组件（内联在 page.tsx 中）
- `ToolCtaSection`（适配版，支持狗/猫主题色）

## 4. 页面清单

| # | URL | 目标关键词 | 搜索量 |
|---|-----|-----------|:---:|
| 1 | `/dog/compare/dry-food-vs-wet-food/` | "dry food vs wet food for dogs" | 🟠 15-20k |
| 2 | `/cat/compare/indoor-vs-outdoor/` | "indoor vs outdoor cat lifespan" | 🟠 8-10k |
| 3 | `/dog/compare/raw-diet-vs-kibble/` | "raw diet vs kibble" | 🟡 8-12k |
| 4 | `/dog/compare/spayed-vs-unspayed/` | "spayed vs unspayed dog lifespan" | 🟡 5-10k |

## 5. 多语言需求
- [x] 英文消息 (en.json)
- [x] 中文消息 (zh.json)
- [ ] 其他语言 (按需)

## 6. SEO 需求
- Schema.org 类型: `Article` + `FAQPage` + `BreadcrumbList`
- Canonical: `${SITE_URL}/[path]`
- OG Image: 复用 home.webp（对比页暂无专用 OG 图）
- Robots: `index, follow`

## 7. 设计规范
- 颜色主题: 继承父级（狗页面用 `--dog-primary`，猫页面用 `--cat-primary`）
- 布局模板: 全宽落地页（无侧边栏）— 对比页是纯内容页
- 表格样式: 响应式卡片式（移动端）/ 标准表格（桌面端）

## 8. 技术约束
- [x] ArkCon.md 四层架构合规
- [x] 消息字符串零硬编码
- [x] SSG 静态渲染（AI 爬虫可见）
- [x] 所有引用使用 `AUTHORITY_SOURCES` 常量

## 9. 引用来源分配

| 页面 | 首选引用 | 次选引用 |
|------|---------|---------|
| 干粮 vs 湿粮 | AAFCO Nutrient Profiles | WSAVA Feeding Guidelines |
| 室内 vs 室外猫 | ISFM Environmental Enrichment | AAFP Indoor Cat Guidelines |
| 生食 vs 商业粮 | NRC Nutrient Requirements | AVMA Raw Pet Food Position |
| 绝育 vs 不绝育 | AAHA Life Stage Guidelines | AVMA Spay-Neuter Policy |
