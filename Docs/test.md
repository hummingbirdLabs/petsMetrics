# petsMetrics 端到端自动化测试方案

> **版本**: v1.0  
> **最后更新**: 2026-06-08  
> **适用范围**: Phase 9 — QA 与发布收尾阶段的 E2E 测试设计  
> **关联文档**: `README.MD`, `ArkCon.md`, `.github/copilot-instructions.md`

---

## 目录

1. [问题诊断：按钮跳转失败根因分析](#1-问题诊断按钮跳转失败根因分析)
2. [自动化测试技术方案](#2-自动化测试技术方案)
3. [测试用例矩阵：导航与路由](#3-测试用例矩阵导航与路由)
   - 3.1 全局导航栏 · 3.2 首页 ToolDiscovery · 3.2b 首页其他区块 · 3.3 Dog/Cat Hub · 3.4 面包屑 · 3.6 Footer · 3.7 全站爬虫
4. [测试用例矩阵：交互与计算](#4-测试用例矩阵交互与计算)
   - 4.1~4.10 10 个 P0 工具 · 4.11 BARF · 4.12 Insurance · 4.13 通用组件 · 4.14 跨工具一致性 · 4.15 免责声明
5. [测试用例矩阵：宠物档案联动](#5-测试用例矩阵宠物档案联动)
6. [测试用例矩阵：SEO 与元数据](#6-测试用例矩阵seo-与元数据)
7. [测试用例矩阵：跨浏览器与响应式](#7-测试用例矩阵跨浏览器与响应式)
8. [测试用例矩阵：错误与边界条件](#8-测试用例矩阵错误与边界条件)
9. [CI/CD 集成方案](#9-cicd-集成方案)
10. [测试执行优先级与阶段划分](#10-测试执行优先级与阶段划分)

---

## 1. 问题诊断：按钮跳转失败根因分析

### 1.1 已发现的问题

通过对代码库的静态审查，发现以下导致“按钮点击后跳转失败”的根因：

| # | 文件 | 行 | 问题 | 严重级别 |
|---|------|----|------|----------|
| 1 | `src/components/home/ToolDiscovery.tsx` | 31 | 保险估算器 `href: '#'`，点击跳转失败 | P0 |
| 2 | `src/components/hub/DogHubContent.tsx` | 79 | 保险估算器 `href: '#'`，点击跳转失败 | P0 |
| 3 | `src/components/hub/CatHubContent.tsx` | 46 | 保险估算器 `href: '#'`，点击跳转失败 | P0 |
| 4 | `src/components/layout/Nav.tsx` | 18 | 导航栏 "Shared" 链接指向 `/shared/`，但该页面不存在（无 `src/app/shared/page.tsx`） | P0 |

> **根因①**：`Pet Insurance Estimator` 是 P1 工具，页面已存在（`/shared/pet-insurance-estimator/`），但 3 个组件的工具列表中仍硬编码 `href: '#'`，未更新为实际路由。
> **根因②**：`/shared/` Hub 页面未创建，但 Nav 组件已渲染其链接，点击即 404。

### 1.2 排查清单（需自动化验证）

除上述已知问题外，以下位置需要自动化扫描确认：

| 排查项 | 检测方式 | 说明 |
|--------|----------|------|
| 所有 `<a>` 标签 `href` 是否为有效路由 | 爬虫 + 断言 | 排除 `#`、`javascript:`、空字符串 |
| 所有 `<Link>` / `router.push()` 目标是否存在 | E2E 导航测试 | Next.js Link 组件需渲染为有效路径 |
| `pageUrl()` 工具函数产出是否有效 | 单元测试 | 确保 `url.ts` 所有调用点路径正确 |
| 动态路由 `[slug]` 是否都有 `generateStaticParams()` | 静态分析 | 没有 generateStaticParams 的 SSG 动态路由会导致 404 |
| 静态导出后 `out/` 目录是否包含所有预期 HTML | 爬虫验证 | 构建产物完整性检查 |

---

## 2. 自动化测试技术方案

### 2.1 测试框架选型

| 层级 | 框架 | 用途 | 配置 |
|------|------|------|------|
| **组件单元测试** | Vitest + Testing Library | 组件渲染、计算逻辑、Hook 行为 | `vitest.config.ts`（已有） |
| **计算逻辑单元测试** | Vitest | 纯函数正确性验证 | `src/lib/calculators/*.test.ts`（已有 10 个） |
| **E2E 浏览器测试** | Playwright | 完整用户流程模拟、跨浏览器 | `playwright.config.ts`（已有） |
| **导航爬虫** | Playwright + 自定义脚本 | 全站链接完整性扫描 | 新增 |
| **无障碍测试** | Playwright + axe-core | WCAG 2.1 AA 合规 | 新增 |

> **决策理由**：Playwright 已在项目中配置（`playwright.config.ts`），支持 Chromium + Firefox 双浏览器，`data-testid` 选择器模式已建立。不引入新框架以保持技术栈简洁。

### 2.2 选择器策略

统一使用 `data-testid` 作为测试选择器，遵循 ArkCon §1 原则（思考先行）：

```
优先级顺序：
1. data-testid        ← 首选，稳定且不受 UI 文案/样式变更影响
2. role + name        ← 无障碍测试（如 getByRole('button', { name: 'Calculate' })）
3. CSS class          ← 仅在无 data-testid 的遗留代码中作为后备
4. XPath / 结构选择器  ← 禁止使用，过于脆弱
```

### 2.3 测试数据结构：页面清单

完整的页面路由清单（来源：`src/lib/data/routes.ts`）：

#### Hub 页面（4 个）

| 路由 | 描述 |
|------|------|
| `/` | 首页 |
| `/dog/` | 狗狗工具枢纽 |
| `/cat/` | 猫咪工具枢纽 |
| `/profile/` | 宠物档案管理 |

#### P0 工具页面（10 个）

| 路由 | 描述 |
|------|------|
| `/dog/age-calculator/` | 狗狗年龄计算器 |
| `/dog/calorie-calculator/` | 狗狗卡路里计算器 |
| `/dog/puppy-growth-predictor/` | 幼犬生长预测器 |
| `/dog/gestation-calculator/` | 狗狗怀孕计算器 |
| `/dog/vaccination-schedule/` | 狗狗疫苗接种计划 |
| `/cat/age-calculator/` | 猫咪年龄计算器 |
| `/cat/bcs-weight-tracker/` | 猫咪BCS体重追踪 |
| `/cat/hydration-calculator/` | 猫咪水分计算器 |
| `/cat/gestation-calculator/` | 猫咪怀孕计算器 |
| `/cat/vaccination-schedule/` | 猫咪疫苗接种计划 |

#### P0 共享工具（2 个）

| 路由 | 描述 |
|------|------|
| `/shared/toxic-checker/` | 有毒食物/植物检测器 |
| `/shared/eu-pet-travel-checker/` | EU宠物旅行检查器 |

#### P1 工具（2 个）

> **⚠️ 注意**：以下工具页面代码已存在（`page.tsx` + Widget 组件均已实现），但因 Phase 8 未完成，部分链接被硬编码为 `href='#'`。测试用例已分别补充在 §4.11 和 §4.12。

| 路由 | 描述 | 状态 |
|------|------|------|
| `/shared/barf-calculator/` | BARF生食计算器 | 页面已存在，有完整 BARFWidget |
| `/shared/pet-insurance-estimator/` | 宠物保险估算器 | 页面已存在，InsuranceWidget 已实现

#### SEO 动态落地页

| 路由模式 | 数量 | 描述 |
|----------|------|------|
| `/shared/eu-pet-travel/[route]/` | ~100 | EU旅行配对路由 |

> **总计**：16 个核心功能页面 + ~100 个 SEO 动态页面。

---

## 3. 测试用例矩阵：导航与路由

### 3.1 全局导航栏

**目标**：验证所有导航链接可正确跳转，无死链。

| ID | 测试用例 | 前置条件 | 步骤 | 预期结果 | 优先级 |
|----|----------|----------|------|----------|--------|
| NAV-001 | 导航栏 Home 链接跳转 | 无 | 1. 打开任意页面<br>2. 点击导航 "Home" | 跳转到 `/`，页面正常渲染 | P0 |
| NAV-002 | 导航栏 Dog 链接跳转 | 无 | 1. 打开任意页面<br>2. 点击导航 "Dog" | 跳转到 `/dog/`，DogHubContent 渲染 | P0 |
| NAV-003 | 导航栏 Cat 链接跳转 | 无 | 1. 打开任意页面<br>2. 点击导航 "Cat" | 跳转到 `/cat/`，CatHubContent 渲染 | P0 |
| NAV-004 | 导航栏 Shared 链接跳转 | 无 | 1. 打开任意页面<br>2. 点击导航 "Shared" | ⚠️ `/shared/` 页面不存在于代码库中，需先创建或移除该导航项 | P0 |
| NAV-005 | 导航栏 Profile 链接跳转 | 无 | 1. 打开任意页面<br>2. 点击导航 "Profile" | 跳转到 `/profile/`，档案页面渲染 | P0 |
| NAV-006 | 移动端汉堡菜单展开/收起 | 无 | 1. 视口 < 1024px<br>2. 点击汉堡图标<br>3. 验证菜单展开<br>4. 再次点击 | 菜单正确展开，链接可见；再次点击收起 | P0 |
| NAV-007 | 移动端菜单内链接点击后菜单关闭 | 无 | 1. 移动端打开菜单<br>2. 点击 Dog 链接 | 导航到 `/dog/`，菜单自动关闭 | P1 |
| NAV-008 | 滚动后导航栏样式切换 | 无 | 1. 进入首页<br>2. 滚动 > 80px | 导航栏背景从不透明变为 `--brand-navy` | P2 |

### 3.2 首页 ToolDiscovery 链接

**目标**：验证首页工具发现区块所有链接有效。

| ID | 测试用例 | 步骤 | 预期结果 | 优先级 |
|----|----------|------|----------|--------|
| NAV-101 | Dog Tab 下所有工具卡片可跳转 | 1. 进入首页<br>2. 确保 Dog tab 激活<br>3. 逐个点击工具卡片 | 每个卡片跳转到对应工具页，无 404 | P0 |
| NAV-102 | Cat Tab 下所有工具卡片可跳转 | 1. 进入首页<br>2. 切换到 Cat tab<br>3. 逐个点击工具卡片 | 每个卡片跳转到对应工具页 | P0 |
| NAV-103 | All Tab 下所有工具卡片可跳转 | 1. 进入首页<br>2. 切换到 All tab<br>3. 逐个点击工具卡片 | 每个卡片跳转到对应工具页 | P0 |
| NAV-104 | 保险估算器按钮不应为死链 | 1. 进入首页<br>2. 切换到 All tab<br>3. 找到 Insurance 卡片 | 按钮 `href` 不为 `#`，或按钮被禁用/隐藏并带有"即将上线"标签 | P0 |
| NAV-105 | Tab 切换后工具数量正确 | 1. 分别点击 Dog/Cat/All tab | Dog >= 6 个工具，Cat >= 7 个工具，All >= 14 个工具 | P1 |

### 3.2b 首页其他区块（Hero / ProfileFocus / StatsBar / FeaturedTool）

**目标**：验证首页 6 个区块的完整渲染与交互，覆盖此前缺失的 Hero、档案聚焦、信任栏、特色工具等区域。

#### Hero 区块（区块 2）

| ID | 测试用例 | 步骤 | 预期结果 | 优先级 |
|----|----------|------|----------|--------|
| HP-001 | H1 标题渲染 | 1. 打开 `/` | 页面主标题显示 "One Profile. Every Answer." | P0 |
| HP-002 | 副标题渲染 | 1. 打开 `/` | 显示 "Create your pet profile once — every calculator auto-fills." 和 "No login. No AI. Just science." | P0 |
| HP-003 | Hero CTA — Dog Tools 按钮跳转 | 1. 打开 `/`<br>2. 点击 "🐕 Dog Tools" 按钮 | 跳转到 `/dog/`，页面 200 正常渲染 | P0 |
| HP-004 | Hero CTA — Cat Tools 按钮跳转 | 1. 打开 `/`<br>2. 点击 "🐱 Cat Tools" 按钮 | 跳转到 `/cat/`，页面 200 正常渲染 | P0 |
| HP-005 | 信任信号行渲染 | 1. 打开 `/` | 显示 "200+ Foods · 14 Tools · 400+ Breeds · AAHA, WSAVA & AAFCO Standards" | P1 |
| HP-006 | Hero 动画档案卡片存在 | 1. 打开 `/` | 右侧 glass-morphism 卡片可见，包含 "Buddy"、"Labrador · 3 yrs · 28 kg" | P1 |
| HP-007 | Hero 卡片内容完整 | 1. 打开 `/`<br>2. 检查卡片内容 | 卡片显示卡路里 (1,240 kcal/day)、人类年龄 (~33)、下次疫苗 (Jun 15, 2026) | P2 |
| HP-008 | Hero 背景渐变渲染 | 1. 打开 `/` | Hero 区块有 navy 渐变背景（无图片加载失败导致的空白） | P2 |

#### 宠物档案聚焦区块（区块 3）

| ID | 测试用例 | 步骤 | 预期结果 | 优先级 |
|----|----------|------|----------|--------|
| HP-101 | 区块标题渲染 | 1. 打开 `/`<br>2. 向下滚动到档案聚焦区块 | 显示 "Why petsMetrics is different" | P0 |
| HP-102 | 三个步骤渲染 | 1. 打开 `/`<br>2. 向下滚动 | 三个步骤均渲染：Create a Pet Profile / Open Any Tool / Get Science-Based Answers | P1 |
| HP-103 | 步骤编号渲染 | 1. 检查步骤 | 步骤编号 1、2、3 在 teal 圆圈中可见 | P2 |
| HP-104 | CTA 按钮跳转 Profile | 1. 点击 "Create My Pet Profile — Free" 按钮 | 跳转到 `/profile/`，页面 200 | P0 |

#### 统计/信任栏（区块 4 — StatsBar）

| ID | 测试用例 | 步骤 | 预期结果 | 优先级 |
|----|----------|------|----------|--------|
| HP-201 | 统计数据渲染 | 1. 打开 `/`<br>2. 向下滚动到 StatsBar | 显示 4 个统计项：14 Tools Available / 200+ Foods in Database / AAHA/WSAVA Standards / No Login Required | P1 |
| HP-202 | 统计数字正确 | 1. 检查数字 | "14" 和 "200+" 数字正确渲染在 teal 文本中 | P2 |

#### 特色工具区块（区块 5 — FeaturedTool / 有毒检测器内联）

| ID | 测试用例 | 步骤 | 预期结果 | 优先级 |
|----|----------|------|----------|--------|
| HP-301 | 紧急横幅渲染 | 1. 打开 `/`<br>2. 向下滚动到 FeaturedTool | 红色紧急横幅显示 ASPCA Poison Control 热线 "(888) 426-4435" | P1 |
| HP-302 | 区块标题渲染 | 1. 继续滚动 | 显示有毒检测标题 "⚠️" | P1 |
| HP-303 | 快速搜索输入框可用 | 1. 在 FeaturedTool 输入框中输入 "chocolate"<br>2. 点击检查或按 Enter | 跳转到 `/shared/toxic-checker/?q=chocolate` | P0 |
| HP-304 | 空输入不跳转 | 1. 不输入任何内容<br>2. 点击检查按钮 | 不跳转（停留在首页） | P2 |

### 3.3 Dog Hub / Cat Hub 链接

**目标**：验证 Hub 页面的工具网格和品种区块链接。

| ID | 测试用例 | 步骤 | 预期结果 | 优先级 |
|----|----------|------|----------|--------|
| NAV-201 | Dog Hub 所有 P0 工具链接 | 1. 进入 `/dog/`<br>2. 点击 "P0 特色" 和 "所有工具" 网格中的每个链接 | 每个链接跳转到正确工具页，无 404 | P0 |
| NAV-202 | Cat Hub 所有 P0 工具链接 | 1. 进入 `/cat/`<br>2. 点击工具网格中每个链接 | 每个链接跳转到正确工具页 | P0 |
| NAV-203 | Dog Hub 保险估算器死链检查 | 1. 进入 `/dog/`<br>2. 找到保险工具卡片 | `href` 不为 `#`，或优雅降级 | P0 |
| NAV-204 | Cat Hub 保险估算器死链检查 | 1. 进入 `/cat/`<br>2. 找到保险工具卡片 | `href` 不为 `#`，或优雅降级 | P0 |
| NAV-205 | Dog Hub 品种区块链接 | 1. 进入 `/dog/`<br>2. 点击品种区块中的链接 | 每个链接跳转到对应工具页 | P1 |
| NAV-206 | Dog Hub 搜索过滤功能 | 1. 进入 `/dog/`<br>2. 在搜索栏输入 "calorie" | 工具网格正确过滤，只显示卡路里相关工具 | P1 |
| NAV-207 | Cat Hub 搜索过滤功能 | 1. 进入 `/cat/`<br>2. 在搜索栏输入 "age" | 工具网格正确过滤 | P1 |

### 3.4 面包屑导航

| ID | 测试用例 | 前置条件 | 步骤 | 预期结果 | 优先级 |
|----|----------|----------|------|----------|--------|
| NAV-301 | 工具页面面包屑完整性 | 任一工具页 | 1. 查看面包屑<br>2. 点击 "Home" | 面包屑显示 Home > Section > Tool，Home 链接正确 | P1 |
| NAV-302 | 面包屑点击跳转 | 任一工具页 | 点击面包屑中的 Section 链接 | 正确跳转到对应 Hub 页面 | P2 |

### 3.6 Footer 链接

**目标**：验证全站底部 Footer 中所有链接可达。

| ID | 测试用例 | 前置条件 | 步骤 | 预期结果 | 优先级 |
|----|----------|----------|------|----------|--------|
| FOOT-001 | Footer 在所有核心页面渲染 | 无 | 1. 分别打开 `/`、`/dog/`、`/cat/`、`/profile/` | 每个页面底部 Footer 可见，含 copyright 和 3 个链接 | P0 |
| FOOT-002 | Privacy 链接跳转 | 无 | 1. 点击 Footer 中的 "Privacy" 链接 | 跳转到 `/privacy/`，页面 200 | P0 |
| FOOT-003 | Disclaimer 链接跳转 | 无 | 1. 点击 Footer 中的 "Disclaimer" 链接 | 跳转到 `/disclaimer/`，页面 200 | P0 |
| FOOT-004 | Contact 邮件链接 | 无 | 1. 检查 Footer 中 Contact 链接 | `href="mailto:hello@petsmetrics.com"` 正确 | P1 |
| FOOT-005 | Copyright 年份正确 | 无 | 1. 检查 Footer copyright 文本 | 年份为当前年份（如 "2026 petsMetrics"） | P2 |

### 3.7 全站爬虫扫描

| ID | 测试用例 | 方法 | 预期结果 | 优先级 |
|----|----------|------|----------|--------|
| NAV-901 | 全站无 404 页面 | Playwright 爬虫遍历 `getAllToolRoutes()` 所有路由 | 所有路由返回 200，无 404 | P0 |
| NAV-902 | 全站无死链（`href="#"`） | 静态代码扫描 + Playwright DOM 检查 | 所有 `<a>` 标签 `href` 为有效路由或外部 URL | P0 |
| NAV-903 | 动态 SEO 页面抽样可达 | 从 `TOXIC_ITEMS` 中随机抽样 20 个 slug | 所有抽样页面 200 OK | P1 |
| NAV-904 | EU 旅行页面抽样可达 | 从 `EU_COUNTRY_CODES` 生成的路由中抽样 20 个 | 所有抽样页面 200 OK | P1 |

---

## 4. 测试用例矩阵：交互与计算

### 4.1 狗狗年龄计算器 `/dog/age-calculator/`

| ID | 测试用例 | 步骤 | 预期结果 | 优先级 |
|----|----------|------|----------|--------|
| CALC-001 | 默认值渲染 | 1. 打开页面 | 表单可见，年龄输入默认 3 岁，中型犬选中 | P0 |
| CALC-002 | 中型犬计算正确 | 1. 输入 3 岁 0 月<br>2. 选中 Medium<br>3. 点击 Calculate | 结果显示 ≈ 28 人类年龄 | P0 |
| CALC-003 | 小型犬计算正确 | 1. 输入 5 岁<br>2. 选中 Small<br>3. 点击 Calculate | 结果显示 ≈ 36 人类年龄 | P0 |
| CALC-004 | 大型犬计算正确 | 1. 输入 2 岁<br>2. 选中 Large<br>3. 点击 Calculate | 结果显示 ≈ 22 人类年龄 | P0 |
| CALC-005 | 巨型犬计算正确 | 1. 输入 4 岁<br>2. 选中 Giant<br>3. 点击 Calculate | 结果显示 ≈ 39 人类年龄 | P0 |
| CALC-006 | 月份输入累加 | 1. 输入 2 岁 6 月<br>2. 选中 Medium<br>3. 点击 Calculate | 年龄正确计算（2.5 岁作为输入） | P1 |
| CALC-007 | 犬龄边界：最小值 | 1. 输入 0 岁 1 月<br>2. 点击 Calculate | 显示合理的幼犬人类年龄（0-1 岁） | P1 |
| CALC-008 | 犬龄边界：最大值 | 1. 输入 25 岁<br>2. 点击 Calculate | 显示合理结果，无崩溃 | P1 |
| CALC-009 | 结果区块渲染完整 | 1. 完成计算 | 显示人类年龄、生命阶段卡片、对比表格、科学说明 | P1 |

### 4.2 猫咪年龄计算器 `/cat/age-calculator/`

| ID | 测试用例 | 步骤 | 预期结果 | 优先级 |
|----|----------|------|----------|--------|
| CALC-101 | 猫咪默认值渲染 | 1. 打开页面 | 表单可见，默认 3 岁 | P0 |
| CALC-102 | 成猫计算正确 | 1. 输入 3 岁<br>2. 点击 Calculate | 结果 ≈ 28 人类年龄（基于 AAHA/AAFP 2021 猫阶段指南） | P0 |
| CALC-103 | 老猫计算正确 | 1. 输入 15 岁<br>2. 点击 Calculate | 结果 ≈ 76 人类年龄 | P0 |
| CALC-104 | 幼猫计算正确 | 1. 输入 0 岁 6 月<br>2. 点击 Calculate | 结果 ≈ 10 人类年龄 | P1 |

### 4.3 有毒检测器 `/shared/toxic-checker/`

| ID | 测试用例 | 步骤 | 预期结果 | 优先级 |
|----|----------|------|----------|--------|
| CALC-201 | 搜索框可见 | 1. 打开页面 | 搜索输入框可见，默认 Dog 物种 | P0 |
| CALC-202 | 有毒食物搜索（chocolate）| 1. 输入 "chocolate"<br>2. 等待搜索结果 | TOXIC 徽章出现，含严重程度 | P0 |
| CALC-203 | 安全食物搜索（carrot） | 1. 输入 "carrot"<br>2. 等待搜索结果 | SAFE 徽章出现 | P1 |
| CALC-204 | 物种切换 | 1. 默认 Dog<br>2. 点击 Cat 切换 | 搜索范围切换为猫咪数据库 | P0 |
| CALC-205 | 猫咪专属毒性查询 | 1. 切换到 Cat<br>2. 搜索 "lily" | TOXIC 结果（百合对猫剧毒但对狗不同） | P1 |
| CALC-206 | 无结果搜索 | 1. 输入 "xyz123nonexistent" | 显示 "No results" 友好提示 | P1 |
| CALC-207 | 搜索防抖 | 1. 快速连续输入字符 | 不会每个字符都触发搜索，只在输入停止后 300ms 触发 | P2 |
| CALC-208 | 结果包含紧急联系信息 | 1. 搜索 "grape" | 结果下方显示兽医热线 / 中毒热线 | P1 |

### 4.4 狗狗卡路里计算器 `/dog/calorie-calculator/`

| ID | 测试用例 | 步骤 | 预期结果 | 优先级 |
|----|----------|------|----------|--------|
| CALC-301 | 表单渲染 | 1. 打开页面 | 体重输入框、生命阶段选择器可见 | P0 |
| CALC-302 | 成犬绝育后卡路里计算 | 1. 输入 28kg<br>2. 选中 "Adult, Neutered"<br>3. 点击 Calculate | 显示合理卡路里值（MER 公式） | P0 |
| CALC-303 | 幼犬卡路里计算 | 1. 输入 5kg<br>2. 选中 "Puppy 4mo+"<br>3. 点击 Calculate | 显示较高的幼犬卡路里需求 | P0 |
| CALC-304 | 超重犬卡路里计算 | 1. 输入 35kg<br>2. 选中 "Overweight, weight loss"<br>3. 点击 Calculate | 显示减重卡路里（系数 1.0） | P1 |
| CALC-305 | 体重单位切换 | 1. 输入 28<br>2. 切换到 lb | 输入值不变，但结果显示为 lb 单位换算 | P1 |

### 4.5 怀孕计算器 `/dog/gestation-calculator/` & `/cat/gestation-calculator/`

| ID | 测试用例 | 步骤 | 预期结果 | 优先级 |
|----|----------|------|----------|--------|
| CALC-401 | 狗狗怀孕：日期输入 | 1. 打开 `/dog/gestation-calculator/`<br>2. 输入交配日期<br>3. 点击 Calculate | 预产期显示（交配日期 + 63 天），里程碑时间线渲染 | P0 |
| CALC-402 | 狗狗怀孕：双日期范围 | 1. 输入首次+第二次交配日期<br>2. 点击 Calculate | 显示最早/最可能/最晚范围 | P1 |
| CALC-403 | 猫咪怀孕：日期输入 | 1. 打开 `/cat/gestation-calculator/`<br>2. 输入交配日期<br>3. 点击 Calculate | 预产期显示（交配日期 + 65 天） | P0 |
| CALC-404 | 未来日期拒绝 | 1. 输入未来日期<br>2. 尝试计算 | 显示错误提示，不允许未来日期 | P1 |
| CALC-405 | 里程碑时间线完整 | 1. 完成计算 | 时间线显示所有关键里程碑（超声检查、准备分娩箱等） | P1 |

### 4.6 疫苗接种计划 `/dog/vaccination-schedule/` & `/cat/vaccination-schedule/`

| ID | 测试用例 | 步骤 | 预期结果 | 优先级 |
|----|----------|------|----------|--------|
| CALC-501 | 狗狗疫苗：表单渲染 | 1. 打开 `/dog/vaccination-schedule/` | 日期输入、地区选择、生活方式选项可见 | P0 |
| CALC-502 | 狗狗疫苗：生成计划 | 1. 输入出生日期<br>2. 选择 US<br>3. 点击生成 | 显示 DHPP、狂犬病、博德特氏菌等核心疫苗计划表格 | P0 |
| CALC-503 | 猫咪疫苗：生成计划 | 1. 打开 `/cat/vaccination-schedule/`<br>2. 输入出生日期<br>3. 点击生成 | 显示 FVRCP、狂犬病、FeLV 等疫苗计划 | P0 |
| CALC-504 | 地域差异 | 1. 分别选择 US/UK/EU 生成计划 | 每个地区产生不同的疫苗推荐 | P1 |
| CALC-505 | 室内猫非核心疫苗排除 | 1. 选择 Cat<br>2. 勾选 "Indoor only" | 非核心疫苗（如 FeLV）从计划中排除或标注"可选" | P1 |

### 4.7 幼犬生长预测器 `/dog/puppy-growth-predictor/`

| ID | 测试用例 | 步骤 | 预期结果 | 优先级 |
|----|----------|------|----------|--------|
| CALC-601 | 表单渲染 | 1. 打开页面 | 品种选择、当前体重、当前年龄输入可见 | P0 |
| CALC-602 | 生长预测计算 | 1. 选择 Labrador<br>2. 输入 15kg, 4 月龄<br>3. 点击 Calculate | 显示预测成年体重、生长曲线图 | P0 |
| CALC-603 | 结果包含图表 | 1. 完成计算 | Chart.js 生长曲线图渲染 | P1 |

### 4.8 猫咪 BCS 体重追踪 `/cat/bcs-weight-tracker/`

| ID | 测试用例 | 步骤 | 预期结果 | 优先级 |
|----|----------|------|----------|--------|
| CALC-701 | BCS 评分交互 | 1. 打开页面<br>2. 选择 BCS 评分（1-9）<br>3. 输入体重 | 显示体重状况和建议 | P0 |
| CALC-702 | 理想体重计算 | 1. 输入当前体重和 BCS | 显示理想体重范围 | P1 |

### 4.9 猫咪水分摄入 `/cat/hydration-calculator/`

| ID | 测试用例 | 步骤 | 预期结果 | 优先级 |
|----|----------|------|----------|--------|
| CALC-801 | 水分计算 | 1. 打开页面<br>2. 输入体重 5kg<br>3. 点击 Calculate | 显示每日建议饮水量 | P0 |

### 4.10 EU 宠物旅行检查器 `/shared/eu-pet-travel-checker/`

| ID | 测试用例 | 步骤 | 预期结果 | 优先级 |
|----|----------|------|----------|--------|
| CALC-901 | 旅行规则查询 | 1. 打开页面<br>2. 选择 US → DE<br>3. 点击查询 | 显示微芯片要求、疫苗要求、绦虫治疗等旅行规则 | P0 |
| CALC-902 | EU 内部跨境 | 1. 选择 GB → FR | 显示宠物护照要求 | P1 |
| CALC-903 | 动态路线 SEO 页面 | 1. 访问 `/shared/eu-pet-travel/US-to-DE/` | 页面正常渲染，含路线特定元数据 | P1 |

### 4.11 BARF 生食计算器 `/shared/barf-calculator/`

| ID | 测试用例 | 步骤 | 预期结果 | 优先级 |
|----|----------|------|----------|--------|
| CALC-1001 | 表单渲染 | 1. 打开页面 | 物种切换（Dog/Cat）、体重输入框、百分比滑块、Calculate 按钮均可见 | P0 |
| CALC-1002 | 狗狗 BARF 计算 | 1. 确保 Dog 选中<br>2. 输入体重 25kg<br>3. 滑动百分比到 2.5%<br>4. 点击 Calculate | 显示每日各成分克数（肌肉肉、骨骼、肝脏、器官、蔬菜） | P0 |
| CALC-1003 | 猫咪 BARF 计算 | 1. 切换到 Cat<br>2. 输入体重 5kg<br>3. 百分比设为 2%<br>4. 点击 Calculate | 显示猫咪每日各成分克数 | P0 |
| CALC-1004 | 物种切换后状态保留 | 1. 输入体重 20kg<br>2. 切换到 Cat<br>3. 再切回 Dog | 体重值保留不丢失 | P1 |
| CALC-1005 | 滑块交互 | 1. 拖动滑块从 0.5% 到 5% | 百分比数值实时更新；滑块不卡顿 | P1 |

### 4.12 宠物保险估算器 `/shared/pet-insurance-estimator/`

| ID | 测试用例 | 步骤 | 预期结果 | 优先级 |
|----|----------|------|----------|--------|
| CALC-1101 | 页面渲染 | 1. 打开页面 | H1 "Pet Insurance Cost Estimator" 可见，InsuranceWidget 渲染（含 ErrorBoundary 包裹） | P0 |
| CALC-1102 | 表单交互（如存在） | 1. 输入/选择品种、年龄、地区<br>2. 点击查询 | 返回月度保费估算（来自多个供应商） | P1 |
| CALC-1103 | AffiliateBanner 联盟标记可见 | 1. 检查页面内容 | 结果或侧边栏含 "Sponsored" 标记的联盟横幅 | P1 |

### 4.13 组件渲染验证（跨工具通用组件）

**目标**：验证在多个工具页中出现的通用组件渲染正确，不因单个页面配置差异导致缺失或报错。

| ID | 测试用例 | 步骤 | 预期结果 | 优先级 |
|----|----------|------|----------|--------|
| COMP-001 | AffiliateBanner 在卡路里工具页渲染 | 1. 打开 `/dog/calorie-calculator/`<br>2. 完成计算 | 结果区域附近显示保险联盟横幅 | P1 |
| COMP-002 | AffiliateBanner 在怀孕工具页渲染 | 1. 打开 `/dog/gestation-calculator/`<br>2. 完成计算 | 保险联盟横幅可见 | P1 |
| COMP-003 | AffiliateBanner 在疫苗工具页渲染 | 1. 打开 `/dog/vaccination-schedule/`<br>2. 完成生成 | 保险联盟横幅可见 | P1 |
| COMP-004 | ShareButtons 在年龄工具页渲染 | 1. 打开 `/dog/age-calculator/`<br>2. 完成计算 | Twitter / Facebook 分享按钮可见，外链正确 | P1 |
| COMP-005 | ShareButtons Copy 链接功能 | 1. 点击 Copy 链接按钮 | 剪贴板写入成功，显示 "Copied" 反馈 | P2 |
| COMP-006 | Chart.js 图表在幼犬生长页渲染 | 1. 打开 `/dog/puppy-growth-predictor/`<br>2. 完成计算 | 生长曲线 `<canvas>` 渲染为非空白，无 JS 异常 | P1 |
| COMP-007 | DisclaimerSection 在关键工具页逐页验证 | 1. 分别打开 10 个 P0 工具页<br>2. 完成计算/生成 | 每个工具的结果区域下方均含免责声明 | P0 |

### 4.14 跨工具数据一致性

**目标**：验证核心差异化承诺——Profile QuickStats 与各独立工具计算结果一致。

| ID | 测试用例 | 步骤 | 预期结果 | 优先级 |
|----|----------|------|----------|--------|
| CONS-001 | Profile 人类年龄 == Dog Age 计算器结果 | 1. 创建 Dog Profile（3 岁, Medium）<br>2. 查看 Profile 页 QuickStats 中的人类年龄<br>3. 打开 `/dog/age-calculator/` 计算 | 两处显示的人类年龄一致 | P0 |
| CONS-002 | Profile 卡路里 == Calorie 计算器结果 | 1. 创建 Dog Profile（28kg, Neutered）<br>2. 对比 QuickStats 与 Calorie 计算器结果 | 两处卡路里值一致 | P0 |
| CONS-003 | 无 Profile 时 QuickStats 不可见 | 1. 清除 localStorage<br>2. 访问 `/profile/` | QuickStatsRow 不渲染，或显示空状态引导 | P1 |

### 4.15 免责声明

| ID | 测试用例 | 步骤 | 预期结果 | 优先级 |
|----|----------|------|----------|--------|
| MISC-001 | 所有结果页包含免责声明 | 完成任意工具计算 | 结果区域下方显示标准免责声明文本 | P0 |
| MISC-002 | 免责声明文本内容正确 | 检查声明内容 | 包含 "does not constitute veterinary advice" | P1 |

---

## 5. 测试用例矩阵：宠物档案联动

### 5.1 档案创建流程

| ID | 测试用例 | 步骤 | 预期结果 | 优先级 |
|----|----------|------|----------|--------|
| PROFILE-001 | 空状态渲染 | 1. 清除 localStorage<br>2. 进入 `/profile/` | 显示 "创建你的第一个宠物" 空状态 | P0 |
| PROFILE-002 | 创建狗狗档案完整流程 | 1. 点击 "Create"<br>2. Step 1: 选择 Dog<br>3. Step 2: 输入名字 "Buddy"<br>4. Step 3: 输入 3 岁, 28kg<br>5. Step 4: 选 Male, Neutered<br>6. Step 5: 确认创建 | 档案创建成功，ProfileCard 可见 | P0 |
| PROFILE-003 | 创建猫咪档案完整流程 | 1. 点击 "Create"<br>2. Step 1: 选择 Cat<br>3. Step 2: 输入名字 "Luna"<br>4. Step 3: 输入 2 岁, 4kg<br>5. Step 4: 选 Female, Spayed<br>6. Step 5: 确认创建 | 档案创建成功 | P0 |
| PROFILE-004 | 向导步骤导航 | 1. 进入创建向导<br>2. 点击 Continue（不填信息） | 按钮保持 disabled 状态，不能前进 | P1 |
| PROFILE-005 | 向导后退编辑 | 1. 进入 Step 3<br>2. 点击 Back | 返回 Step 2，已填写数据保留 | P1 |
| PROFILE-006 | 建后立即显示 QuickStats | 1. 创建档案 | QuickStatsRow 显示卡路里、人类年龄等自动计算结果 | P0 |

### 5.2 档案数据与 localStorage

| ID | 测试用例 | 步骤 | 预期结果 | 优先级 |
|----|----------|------|----------|--------|
| PROFILE-101 | 档案持久化 | 1. 创建档案<br>2. 刷新页面 | 档案数据仍然存在 | P0 |
| PROFILE-102 | 导出 JSON | 1. 点击 Export JSON | 浏览器下载 JSON 文件，包含完整档案数据 | P0 |
| PROFILE-103 | 导入 JSON | 1. 清除数据<br>2. 点击 Import JSON<br>3. 上传之前导出的文件 | 档案成功恢复 | P0 |
| PROFILE-104 | 多档案切换 | 1. 创建 Dog + Cat 两个档案<br>2. 点击切换器切换档案 | 当前档案切换，UI 更新 | P1 |
| PROFILE-105 | 删除档案 | 1. 点击删除<br>2. 确认删除 | 档案从列表移除，localStorage 清空对应 key | P1 |
| PROFILE-106 | 编辑档案 | 1. 点击编辑<br>2. 修改名字/体重<br>3. 保存 | 档案数据更新，QuickStats 实时反映 | P1 |

### 5.3 档案到工具的自动填充（核心差异化测试）

| ID | 测试用例 | 步骤 | 预期结果 | 优先级 |
|----|----------|------|----------|--------|
| LINK-001 | 狗狗档案填充年龄计算器 | 1. 创建 Dog Profile（3 岁, 28kg, Medium 体型）<br>2. 访问 `/dog/age-calculator/` | 年龄字段预填 3 岁，体型预选中型 | P0 |
| LINK-002 | 狗狗档案填充卡路里计算器 | 1. 创建 Dog Profile<br>2. 访问 `/dog/calorie-calculator/` | 体重字段预填 28kg，可自动计算结果 | P0 |
| LINK-003 | 猫咪档案填充年龄计算器 | 1. 创建 Cat Profile<br>2. 访问 `/cat/age-calculator/` | 年龄字段预填 | P0 |
| LINK-004 | 从 Profile 页面跳转工具 | 1. 在 Profile 页面<br>2. 点击 LinkedToolsGrid 中的工具 | 跳转到工具页，且数据已预填充 | P0 |
| LINK-005 | 无档案时工具仍可手动输入 | 1. 无档案<br>2. 访问工具页 | 表单清空，可正常手动填写和计算 | P1 |
| LINK-006 | ProfileBar 在工具页显示 | 1. 有档案时访问工具页 | ProfileBar 组件显示当前档案摘要 | P1 |

---

## 6. 测试用例矩阵：SEO 与元数据

### 6.1 每页元数据完整性

| ID | 测试用例 | 步骤 | 预期结果 | 优先级 |
|----|----------|------|----------|--------|
| SEO-001 | Title 标签存在且 ≤ 60 字符 | 打开任意页面 | `<title>` 存在且长度 ≤ 60 字符 | P0 |
| SEO-002 | Meta Description ≤ 155 字符 | 打开任意页面 | `<meta name="description">` 存在且 ≤ 155 字符 | P0 |
| SEO-003 | Canonical URL 正确 | 打开任意页面 | `<link rel="canonical">` 指向正确绝对 URL | P0 |
| SEO-004 | Open Graph 标签完整 | 打开任意页面 | `og:title`, `og:description`, `og:url`, `og:image` 均存在 | P0 |
| SEO-005 | Schema.org JSON-LD 存在 | 打开任意页面 | 至少包含一个 `<script type="application/ld+json">` | P1 |
| SEO-006 | H1 标签唯一 | 打开任意页面 | 页面恰好有一个 `<h1>` | P1 |
| SEO-007 | 图片 Alt 属性 | 打开任意页面 | 所有 `<img>` 有 `alt` 属性 | P1 |

### 6.2 Sitemap 与 Robots

| ID | 测试用例 | 步骤 | 预期结果 | 优先级 |
|----|----------|------|----------|--------|
| SEO-101 | sitemap.xml 可达且有效 | 访问 `/sitemap.xml` | 返回 XML，包含所有预期路由 | P0 |
| SEO-102 | robots.txt 允许爬虫 | 访问 `/robots.txt` | 内容为 `Allow: /` + sitemap 链接 | P1 |

### 6.3 动态落地页 SEO

| ID | 测试用例 | 步骤 | 预期结果 | 优先级 |
|----|----------|------|----------|--------|
| SEO-202 | EU 旅行落地页 meta 正确 | 访问 `/shared/eu-pet-travel/US-to-DE/` | Title 包含 "US" 和 "Germany/DE" | P1 |

---

## 7. 测试用例矩阵：跨浏览器与响应式

### 7.1 跨浏览器

| ID | 测试用例 | 浏览器 | 预期结果 | 优先级 |
|----|----------|--------|----------|--------|
| XB-001 | Chromium 核心流程 | Chrome | 所有 P0 流程通过 | P0 |
| XB-002 | Firefox 核心流程 | Firefox | 所有 P0 流程通过 | P0 |

### 7.2 响应式断点

| ID | 测试用例 | 视口 | 预期结果 | 优先级 |
|----|----------|------|----------|--------|
| RESP-001 | 移动端竖屏 (<640px) | 375×812 | 页面可滚动，表单全宽，无横向溢出，汉堡菜单可用 | P0 |
| RESP-002 | 移动端横屏 (≥640px) | 812×375 | 布局正确，无重叠 | P1 |
| RESP-003 | 平板 (≥768px) | 768×1024 | 布局正确，侧边栏可见 | P0 |
| RESP-004 | 桌面 (≥1024px) | 1440×900 | 两列布局正确，所有功能可见 | P0 |
| RESP-005 | 所有视口无水平滚动 | 各视口 | `document` 无水平溢出 | P1 |

---

## 8. 测试用例矩阵：错误与边界条件

| ID | 测试用例 | 步骤 | 预期结果 | 优先级 |
|----|----------|------|----------|--------|
| ERR-001 | 404 页面渲染 | 访问 `/nonexistent-page/` | `not-found.tsx` 渲染，返回 404 状态 | P0 |
| ERR-002 | localStorage 损坏数据恢复 | 手动写入损坏 JSON 到 localStorage | 应用不崩溃，自动重置为默认值 | P1 |
| ERR-003 | 空输入提交处理 | 在工具页面不填任何值点击 Calculate | 表单验证提示，或按钮 disabled | P1 |
| ERR-004 | 极值输入处理 | 输入极大/极小值（如体重 999999kg） | 不崩溃，显示合理错误或限定结果 | P1 |
| ERR-005 | Client Component 渲染错误边界 | 模拟组件抛出错误 | ErrorBoundary 捕获，显示友好错误提示 | P2 |
| ERR-006 | 网络断开后操作 | 断开网络，操作工具 | 纯前端计算不受影响，正常工作 | P1 |
| ERR-007 | P1 未开发工具优雅降级 | 点击 Insurance 卡片 | 不出现 404，显示 "Coming Soon" 或请求路由不存在时 404 | P0 |

---

## 9. CI/CD 集成方案

### 9.1 测试流水线设计

```
┌─────────────────────────────────────────────────────────────┐
│  GitHub Actions CI 流水线 (.github/workflows/ci.yml)         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────┐    ┌──────────┐    ┌──────────────┐          │
│  │ Lint     │───→│ Unit     │───→│ Build        │          │
│  │ ESLint   │    │ Vitest   │    │ next build   │          │
│  └──────────┘    └──────────┘    └──────┬───────┘          │
│                                         │                   │
│                                         ▼                   │
│                              ┌──────────────────┐          │
│                              │ Static Export    │          │
│                              │ `serve out`       │          │
│                              └────────┬─────────┘          │
│                                       │                     │
│                                       ▼                     │
│                              ┌──────────────────┐          │
│                              │ E2E Tests        │          │
│                              │ Playwright       │          │
│                              │  - Navigation    │          │
│                              │  - Interaction   │          │
│                              │  - SEO           │          │
│                              └────────┬─────────┘          │
│                                       │                     │
│                                       ▼                     │
│                              ┌──────────────────┐          │
│                              │ Link Crawler     │          │
│                              │ 全站死链扫描      │          │
│                              └──────────────────┘          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 9.2 CI 配置增强建议

在现有 `.github/workflows/ci.yml` 中增加：

```yaml
# 新增 Job: e2e-tests
e2e-tests:
  needs: build
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
    - run: pnpm install
    - run: pnpm build          # 生成 out/ 静态导出
    - run: pnpm test:e2e       # Playwright E2E 测试
    - uses: actions/upload-artifact@v4
      if: failure()
      with:
        name: playwright-report
        path: playwright-report/

# 新增 Job: link-checker（全站爬虫）
link-checker:
  needs: build
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
    - run: pnpm install
    - run: pnpm build
    - run: pnpm test:links     # 死链扫描脚本
```

### 9.3 本地测试命令

```bash
# 单元测试
pnpm test

# 单元测试 + 覆盖率
pnpm test -- --coverage

# E2E 测试（需先 build）
pnpm build && pnpm test:e2e

# E2E 测试 — UI 模式（调试）
pnpm test:e2e -- --ui

# E2E 测试 — 单文件
pnpm test:e2e -- e2e/navigation.spec.ts

# 全站死链扫描（新增脚本）
pnpm test:links
```

---

## 10. 测试执行优先级与阶段划分

### 10.1 优先级定义

| 级别 | 定义 | 触发条件 |
|------|------|----------|
| **P0** | 阻断性：必须在发布前通过 | 每次 PR、每次 merge main |
| **P1** | 重要：应在发布前通过 | 每次 PR，允许已知失败（需记录） |
| **P2** | 增强：渐进式覆盖 | 每周定时执行 |

### 10.2 阶段划分

| 阶段 | 内容 | 用例数 | 目标 |
|------|------|--------|------|
| **Phase A：导航基础** | §3 NAV-001~NAV-904, HP-001~HP-304, FOOT-001~FOOT-005 | ~38 个 | 全站导航、首页 6 区块、Footer、死链扫描全覆盖；先修复 `href='#'` 和 `/shared/` 缺失问题 |
| **Phase B：核心交互** | §4 CALC-001~CALC-1103, COMP-001~COMP-007 | ~50 个 | 12 个工具页完整表单+计算+通用组件验证 |
| **Phase C：档案联动 + 一致性** | §5 PROFILE-001~LINK-006, §4.14 CONS-001~CONS-003 | ~18 个 | 档案创建+联动+跨工具数据一致性 |
| **Phase D：SEO 基础** | §6 SEO-001~SEO-202 | ~10 个 | 每页元数据 + Sitemap + Robots + 动态落地页 SEO |
| **Phase E：全站扫描** | §3.7 | ~4 个 | 爬虫全量扫描（已整合入 Phase A） |
| **Phase F：响应式 + 错误** | §7 + §8 | ~12 个 | 跨浏览器 + 边界条件 |
| **Phase G：P1 工具补充** | §4.11, §4.12 | ~8 个 | BARF + Insurance 完整测试 |

### 10.3 新增测试文件结构建议

```
e2e/
├── navigation.spec.ts           # Phase A：导航、首页、Footer、全站爬虫
├── interactions.spec.ts         # Phase B：12 个工具页表单+计算+通用组件
├── profile.spec.ts              # Phase C：档案创建 + 联动 + 一致性
├── seo.spec.ts                  # Phase D：SEO 元数据 + Sitemap + Robots
├── responsive.spec.ts           # Phase F：响应式测试
├── error-handling.spec.ts       # Phase F：错误边界测试
│
├── dog-age-calculator.spec.ts   # 已有（保留，内容可整合到 interactions.spec.ts）
├── profile-creation.spec.ts     # 已有（保留）
├── profile-autofill.spec.ts     # 已有（保留）
└── toxic-checker.spec.ts        # 已有（保留）
```

### 10.4 现有测试与新增测试的关系

已有 4 个 E2E 测试文件（`dog-age-calculator.spec.ts`, `profile-creation.spec.ts`, `profile-autofill.spec.ts`, `toxic-checker.spec.ts`）应保留，但需审查 `data-testid` 选择器是否与组件实际属性一致。新增测试按 Phase A→G 依次编写。

**已发现的即时问题（无需等待测试即可修复）**：

| # | 问题 | 文件 | 修复方式 |
|---|------|------|----------|
| 1 | `href='#'` 死链 × 3 | ToolDiscovery.tsx / DogHubContent.tsx / CatHubContent.tsx | 改为 `#` 禁用样式（disabled class + 不触发导航），或渲染 "Coming Soon" 标识 |
| 2 | `/shared/` 页面不存在 | Nav.tsx + 文件系统 | 创建 `src/app/shared/page.tsx`，或从 Nav 中移除 Shared 链接 |
| 3 | `wizard-species-cat` testid 引用可能错误 | profile-creation.spec.ts | 验证 `wizard-species-dog` testid 是否存在，补全猫/狗两个 testid |

---

## 附录 A：组件 data-testid 清单

以下是代码库中实际存在的 `data-testid` 属性的完整清单（截至审查时刻，共 20 处）：

| data-testid | 所在文件 | 用途 |
|-------------|----------|------|
| `wizard-species-cat` | ProfileCreationWizard.tsx | 向导 Step 1 — 选择猫咪 |
| `wizard-neutered-toggle` | ProfileCreationWizard.tsx | 向导 Step 4 — 绝育开关 |
| `wizard-age-years` | ProfileCreationWizard.tsx | 向导 Step 3 — 年龄输入 |
| `wizard-weight` | ProfileCreationWizard.tsx | 向导 Step 3 — 体重输入 |
| `wizard-continue` | ProfileCreationWizard.tsx | 向导 — 继续按钮 |
| `dog-age-form` | DogAgeWidget.tsx | 狗狗年龄表单容器 |
| `dog-age-years-input` | DogAgeWidget.tsx | 狗狗年龄 — 年输入 |
| `dog-age-months-input` | DogAgeWidget.tsx | 狗狗年龄 — 月输入 |
| `dog-size-{value}` | DogAgeWidget.tsx | 狗狗体型选择（动态） |
| `dog-age-submit` | DogAgeWidget.tsx | 狗狗年龄 — 计算按钮 |
| `dog-age-result` | DogAgeWidget.tsx | 狗狗年龄 — 结果容器 |
| `dog-age-human-equivalent` | DogAgeWidget.tsx | 狗狗年龄 — 人类等效年龄 |
| `toxic-search-input` | ToxicCheckerWidget.tsx | 毒性搜索输入框 |
| `toxic-result-badge` | ToxicCheckerWidget.tsx | 毒性结果徽章 |

> **注意**：以上清单仅包含 2 个工具的 testid。其余 12 个工具页面、Profile 页面的 QuickStats、LinkedToolsGrid、Hub 页面的搜索框和工具卡片均 **缺少 testid**，需要在自动化测试开发阶段补充。

---

## 附录 B：与 ArkCon 的合规对照

| ArkCon 规则 | 测试方案合规性 |
|-------------|---------------|
| §4.1 Static Export | 测试基于 `serve out`（静态导出产物），与生产部署一致 |
| §4.3 每页 metadata 必须 | SEO 测试验证所有页面的 metadata 完整性 |
| §3.3 URL 通过 `pageUrl()` 构造 | 导航测试验证所有 URL 以 `/` 结尾（trailingSlash） |
| §5.2 localStorage 通过 `lib/storage/` | 档案联动测试通过公共 API 操作，不绕过抽象层 |
| §2.2 无后端 | 所有测试纯客户端执行，不依赖外部 API |
| §6.1 Canonical URL | SEO 测试验证 canonical 标签指向正确 SITE_URL |
| Copilot §4.1 无 `as` 断言 | 测试代码中避免 TypeScript `as` 断言 |
| Copilot §6 所有文案走 i18n | 测试断言使用 `en.json` 中的 key 对应的英文文案 |
