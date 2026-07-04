---
name: "404-detector"
description: "Detects 404 errors, broken links, and dead links in static sites. Scans project for missing pages, invalid routes, and link integrity issues. Invoke when user asks about 404, broken link, dead link, link check, or site health diagnostics."
---

# Skill: 404 Issue Detector

## Role

你是一名 **站点健康诊断工程师 (Site Reliability Engineer)**，专精于静态站点的死链和 404 风险检测。你的职责是扫描项目中所有可能导致用户遭遇 404 或死链的问题。

## Trigger Conditions

当用户请求涉及以下关键词时触发此 skill：
- "404"、"死链"、"broken link"、"missing page"
- "链接检查"、"link check"、"href"
- "not found"、"页面不存在"
- "路由健康"、"site health"

## Execution Protocol

### Phase 1: 内部链接扫描 (Internal Link Audit)

#### 1.1 href 提取

```bash
# 扫描所有 .tsx/.ts 文件中的链接
grep -rn "href=" src/components src/app 2>/dev/null
grep -rn "Link" src/components src/app 2>/dev/null  # Next.js Link 组件
grep -rn "router.push\|redirect" src 2>/dev/null    # 程序化导航
```

分类为：
- **绝对链接** (`href="/path/"`) - 需验证路径存在
- **动态链接** (`href={pageUrl(...)}`) - 验证 pageUrl 生成
- **外部链接** (`href="https://..."`) - 仅标记，不验证
- **带 locale 前缀** (`/${locale}/path`) - 验证路由层

#### 1.2 链接验证规则

对每个内部链接检查：
1. 路径是否对应实际存在的 page.tsx
2. 是否为外部链接的误识别（锚点、mailto、tel）
3. pageUrl() 工具函数的参数是否正确
4. 是否使用了前导 `/` 导致 locale 前缀问题

### Phase 2: 动态路由预渲染检查

```bash
# 检查所有 generateStaticParams() 覆盖情况
grep -rn "generateStaticParams" src/app
```

验证项：
- [ ] 每个 `[slug]` 路由都有 `generateStaticParams()`
- [ ] `generateStaticParams()` 返回值不超出实际数据源范围
- [ ] 数据源函数（如 `getAllSlugs()`）返回值定义清晰
- [ ] 空数组处理（`generateStaticParams()` 返回 `[]` 的场景）

### Phase 3: not-found.tsx 覆盖检查

```bash
# 检查项目中的 404 处理
ls src/app/not-found.tsx                    # 全局 404
ls src/app/\[locale\]/not-found.tsx         # 本地化 404
```

验证项：
- [ ] 全局 not-found.tsx 存在
- [ ] 包含搜索框或主要导航链接
- [ ] 包含返回首页的链接
- [ ] HTTP 状态码正确（Next.js 在 `not-found.tsx` 中自动返回 404）

### Phase 4: 外部链接健康检查 (标记项)

列出所有外部链接及其上下文，标注潜在风险：

| 外部链接 | 用途 | 风险 |
|---------|------|------|
| 权威机构 URL (aspca.org 等) | E-E-A-T 引用 | 低 - 高权威站点 |
| Affiliate 链接 | 收入来源 | 中 - 需定期轮换 |
| 社交媒体链接 | 品牌曝光 | 低 |

### Phase 5: catch-all 路由检查

```bash
# 检查是否有 [...slug] 或 [[...slug]] 路由
grep -rn "\.\.\.slug" src/app
```

如果存在 optional catch-all (`[[...slug]]`)，确认：
- 根路径有独立 page.tsx 处理
- 不会导致意外 404

## Risk Assessment Matrix

| 问题 | 风险等级 | Auto-Fix |
|------|---------|---------|
| 不存在的内部链接 | 🔴 P0 | ✅ 直接修复/移除 |
| generateStaticParams() 缺失 | 🔴 P0 | ✅ 直接添加 |
| not-found.tsx 缺失 | 🔴 P0 | ✅ 直接创建 |
| pageUrl() 参数错误 | 🔴 P0 | ✅ 直接修复 |
| href 硬编码路径 | 🟡 P1 | ✅ 改为 pageUrl() |
| 外部链接失效 | 🟡 P1 | ⚠️ 需人工核验 |
| 动态路由空数组处理 | 🟡 P2 | ✅ 添加 fallback |
| locale 前缀不一致 | 🟢 P2 | ✅ 统一处理 |

## 可直接执行的安全修复（Auto-Fix Criteria）

满足以下全部条件时直接执行：

1. 链接路径错误或文件不存在 → 修正为正确路径或标记待清理
2. `generateStaticParams()` 缺失但有现成数据源 → 直接添加
3. 全局 `not-found.tsx` 缺失但有 design system 可参考 → 直接创建
4. `pageUrl()` 参数错误且能确定正确值 → 直接修复

## 需要用户决策的情况

- 存在大量硬编码外部链接（> 100 条）→ 输出列表由用户确认是否逐步迁移
- 数据源中 item 已删除但仍有链接指向 → 是否创建 301 重定向
- Affiliate 链接变更策略 → 需业务决策

## Output Format

```markdown
## 404 风险审计报告

### 执行摘要
- 扫描链接总数: XX
- 风险链接数: XX
- P0 阻塞: X 项

### P0 阻塞项（需立即修复）
| 文件 | 行号 | 问题 | 建议修复 |
|------|------|------|---------|
| src/components/... | L42 | href="/wrong-path/" | 改为 /correct-path/ |

### P1 重要修复
| 文件 | 问题 | 影响范围 |
|------|------|---------|

### P2 优化建议
...

### 外部死链标记（需人工验证）
| URL | 引用页面 | 状态 |
|-----|---------|------|

### 已修复
- [x] ...
```

## Auto-Fix Template

当检测 to not-found.tsx 缺失时，自动生成：

```tsx
// app/not-found.tsx
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { SITE_URL } from '@/constants';

export const metadata = {
  title: '404 — Page Not Found',
  robots: { index: false, follow: true },
};

export default async function NotFound() {
  const t = await getTranslations('common');

  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-h1 font-bold text-[--gray-900]">404</h1>
      <p className="text-body-lg text-[--gray-500] mt-4">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="mt-8 bg-[--brand-teal] text-white rounded-lg px-6 py-3 font-medium"
      >
        ← Back to Home
      </Link>
    </main>
  );
}
```

## External References

- Next.js not-found: https://nextjs.org/docs/app/api-reference/file-conventions/not-found
- Next.js Link: https://nextjs.org/docs/app/api-reference/components/link
- Next.js Routing: https://nextjs.org/docs/app/building-your-application/routing
- Project pageUrl utility: `src/lib/utils/url.ts`
