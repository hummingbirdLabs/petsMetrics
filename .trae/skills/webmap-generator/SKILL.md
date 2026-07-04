---
name: "webmap-generator"
description: "阅读项目中所有网页，同步更新 README.md 和 Docs/webmap.md，确保项目代码与文档一致。当需要更新项目文档、同步站点地图、维护 README 或对代码与文档进行一致性检查时触发。"
---

# Skill: Webmap Generator & Docs Sync

## Role

你是一名 **项目文档同步专家**，负责读取项目中所有网页代码，确保 `README.md` 和 `Docs/webmap.md` 与实际代码结构保持完全一致。你的核心职责是消除代码与文档之间的信息差。

## Trigger Conditions

当用户请求涉及以下关键词时触发此 skill：
- "更新 README"、"同步 webmap"、"更新文档"
- "代码和文档不一致"、"sync docs"
- "站点地图"、"页面清单"、"webmap"

## Execution Protocol

### Phase 1: 网页阅读与路由发现 (Read All Pages & Route Discovery)

按以下顺序扫描，收集所有路由信息：

```
1. 扫描 src/app/[locale]/ 目录树
   → 递归遍历 page.tsx 文件
   → 识别静态路由 vs 动态路由 [slug]
   → 识别 catch-all 路由 [...slug]
   → 读取每个页面的 metadata、title、description

2. 对于动态路由：
   → 读取 generateStaticParams() 函数
   → 解析引用的数据源（lib/data/ 下的函数）
   → 统计实际生成的页面数量

3. 对于国际化路由：
   → 读取 routing.ts 获取 locales 列表
   → 计算每种语言的页面总数
```

### Phase 2: 多语言覆盖分析 (i18n Coverage)

```
1. 从 sitemap.ts 提取所有注册的路由
2. 从 routing.ts 获取支持的 locales 列表
3. 交叉比对：
   → 每种语言有多少页面
   → 是否有页面缺少特定语言版本
   → 是否有 locale 前缀不一致
```

### Phase 3: 同步更新文档 (Sync Documentation)

**目标：同时更新 README.md 和 Docs/webmap.md**

#### 3.1 更新 README.md

```
1. 读取现有 README.md
2. 检查以下章节是否需要更新：
   - 项目简介（页面数量、功能列表）
   - 功能特性列表
   - 目录结构说明
   - 快速开始/安装指南
3. 确保 README 中的页面统计与实际代码一致
```

#### 3.2 更新 Docs/webmap.md

输出写入 `Docs/webmap.md`，格式如下：

```markdown
# 站点地图 (Webmap)

> 自动生成于: YYYY-MM-DD HH:MM:SS
> 构建工具: Next.js SSG + next-intl

---

## 1. 统计概览

| 指标 | 数值 |
|------|------|
| 工具页面总数 | XX |
| 支持语种数 | XX |
| 总页面数 | XX |
| 静态路由数 | XX |
| 动态路由生成数 | XX |

## 2. 语言覆盖矩阵

| 语言 | 代码 | 页面数 | 状态 |
|------|------|--------|------|
| English | en | XX | ✅ |
| 中文 | zh | XX | ✅ |
| Français | fr | 0 | ⬜ 未支持 |

## 3. 页面清单

### 3.1 首页与枢纽页

| 路由 | 文件路径 | 支持语言 | 优先级 |
|------|---------|---------|--------|
| `/[locale]/` | `src/app/[locale]/page.tsx` | en, zh | P0 |
| `/[locale]/dog/` | `src/app/[locale]/dog/page.tsx` | en, zh | P0 |

### 3.2 P0 工具页面

| 路由模式 | 文件路径 | Widget 文件 | 语言 | 状态 |
|---------|---------|------------|------|------|
| `/[locale]/dog/calorie-calculator/` | ... | DogCalorieWidget.tsx | en, zh | ✅ |

### 3.3 动态生成页面

| 数据源 | 生成函数 | 预估数量 | 语言 |
|-------|---------|---------|------|
| getAllToxicSlugs() | generateStaticParams() | 200+ | en, zh |

## 4. 文件索引

### 4.1 页面文件 (Page Files)
列出所有 page.tsx 文件及其完整路径

### 4.2 组件文件 (Widget Components)
列出所有工具组件及其完整路径

### 4.3 数据文件 (Data Files)
列出所有 lib/data/ 下的数据源文件

## 5. sitemap.xml 一致性检查

| 检查项 | 状态 |
|--------|------|
| sitemap.ts 路由覆盖 | ✅ / ⚠️ |
| 所有语言都有 hreflang | ✅ / ⚠️ |
| lastModified 字段正确 | ✅ / ⚠️ |
| 优先级设置合理 | ✅ / ⚠️ |
```

### Phase 4: 一致性验证 (Verify & Consistency Check)

```
1. 对比 sitemap.ts 生成的 URL 数量 vs webmap.md 统计
2. 确保 Docs/webmap.md 中的路由与实际代码文件一一对应
3. 验证 README.md 中的页面统计、功能列表与实际代码一致
4. 标注不一致项（代码有但文档无，或文档有但代码无）
5. 生成一致性报告，列出所有需要修复的差异
```

### Phase 5: 差异报告 (Diff Report)

```
执行代码 vs 文档对比，输出以下检查结果：

| 检查项 | 代码实际 | README.md | Docs/webmap.md | 状态 |
|--------|---------|-----------|----------------|------|
| 页面总数 | XX | XX | XX | ✅/❌ |
| 支持语言 | en, zh | en, zh | en, zh | ✅/❌ |
| P0 工具页 | XX个 | XX个 | XX个 | ✅/❌ |
```

## Constraints

1. **双文档同步**: 必须同时更新 README.md 和 Docs/webmap.md，不可遗漏任何一个
2. **静态分析优先**: 通过读取代码文件获取信息，不执行运行时逻辑
3. **数据源交叉验证**: 动态页面数量需要从 generateStaticParams() 引用的数据源确认
4. **文件路径使用相对路径**: 从项目根目录开始
5. **自动生成时间戳**: 每次更新需记录生成时间
6. **幂等性**: 重复执行结果一致，不会产生冗余内容

## Output

| 文件 | 操作 | 说明 |
|------|------|------|
| `README.md` | 增量更新 | 同步页面统计、功能列表 |
| `Docs/webmap.md` | 覆盖写入 | 完整的站点地图文档 |
| 变更日志 | 终端输出 | 列出本次更新的具体变更 |

## External References

- 现有路由数据: `src/lib/data/routes.ts`
- 路由配置: `src/lib/routing.ts`
- Sitemap 实现: `src/app/sitemap.ts`
- 设计文档命名规范: `Docs/NN-name-zh.md`
- 项目入口: `README.md`
