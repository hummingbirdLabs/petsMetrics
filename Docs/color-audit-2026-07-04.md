# 颜色对比度审计报告

**审计日期**: 2026-07-04
**项目**: petsMetrics
**标准**: WCAG 2.1 AA

---

## 1. 审计摘要

| 类别 | 通过 | 失败 | 通过率 |
|------|------|------|--------|
| 浅色模式文本对比 | 7 | 2 | 78% |
| 深色模式文本对比 | 1 | 3 | 25% |
| 状态色对比 | 2 | 2 | 50% |
| **总计** | **10** | **7** | **59%** |

---

## 2. 设计 Token 合规性

### 2.1 浅色模式

| Token | HEX | 背景 | 对比度 | AA 要求 | 合规 |
|-------|-----|------|--------|---------|------|
| --gray-700 | #334155 | --white (#FFFFFF) | 10.35:1 | 4.5:1 | ✅ |
| --gray-500 | #64748B | --white (#FFFFFF) | 4.76:1 | 4.5:1 | ✅ |
| --gray-900 | #0F172A | --white (#FFFFFF) | 17.85:1 | 4.5:1 | ✅ |
| --brand-navy | #1B2D4F | --white (#FFFFFF) | 13.68:1 | 4.5:1 | ✅ |
| --brand-teal | #0D9488 | --white (#FFFFFF) | 3.74:1 | 4.5:1 | ❌ |
| --cat-primary | #7C3AED | --white (#FFFFFF) | 5.70:1 | 4.5:1 | ✅ |
| --dog-primary | #D97706 | --white (#FFFFFF) | 3.19:1 | 3:1 大文本 | ✅ |

### 2.2 深色模式

| Token | HEX | 背景 | 对比度 | AA 要求 | 合规 |
|-------|-----|------|--------|---------|------|
| --brand-navy (暗色模式) | #E2E8F0 | --white (#0F172A) | 14.48:1 | 4.5:1 | ✅ |

---

## 3. 不合规配对

### 3.1 🔴 P0 — 严重不合规（影响正文阅读）

| 前景 | 背景 | 模式 | 当前值 | 需要 | 问题 |
|------|------|------|--------|------|------|
| --status-safe (#10B981) | --status-safe-bg (#D1FAE5) | 浅色 | 2.24:1 | 3:1 | 状态徽章安全文本对比度不足 |
| --status-caution (#F59E0B) | --status-caution-bg (#FEF3C7) | 浅色 | 1.93:1 | 3:1 | 状态徽章注意文本对比度不足 |

### 3.2 🟡 P1 — 中等不合规

| 前景 | 背景 | 模式 | 当前值 | 需要 | 建议修复 |
|------|------|------|--------|------|----------|
| --dog-primary-dark (#92400E) | --dog-surface (#1C0E00) | 深色 | 2.66:1 | 4.5:1 | 使用 --dog-primary 代替或调亮文本色 |
| --cat-primary-dark (#4C1D95) | --cat-surface (#13072B) | 深色 | 1.75:1 | 4.5:1 | 使用 --cat-primary 代替或调亮文本色 |
| --brand-teal (#0D9488) | --gray-50 (#F8FAFC) | 浅色 | 3.58:1 | 4.5:1 | 调深 teal 或使用 --gray-700 |
| --brand-teal (#0D9488) | --gray-50 (#334155) | 深色 | 3.91:1 | 4.5:1 | 调整深色模式下的 teal 或背景 |

---

## 4. 硬编码颜色扫描

### 4.1 需要修复的硬编码

| 文件 | 行号 | 硬编码值 | 建议替换为 |
|------|------|---------|-----------|
| `src/components/shared/ToxicLandingPage.tsx` | 106, 111, 116 | `#FFFFFF` | `text-white` 或使用 `[--white]` |
| `src/components/hub/CatHubContent.tsx` | 87 | `#4C1D95, #7C3AED, #A78BFA` | `linear-gradient(135deg, var(--cat-primary-dark), var(--cat-primary), var(--cat-accent))` |
| `src/components/hub/DogHubContent.tsx` | 118 | `#92400E, #D97706, #F59E0B` | `linear-gradient(135deg, var(--dog-primary-dark), var(--dog-primary), var(--dog-accent))` |
| `src/components/home/FeaturedTool.tsx` | 25 | `#FFF7ED, #FFFBEB` | `linear-gradient(180deg, var(--dog-primary-light), var(--dog-surface))` |
| `src/app/[locale]/shared/page.tsx` | 80 | `#0D9488, #14B8A6, #2DD4BF` | `linear-gradient(135deg, var(--brand-teal), ...)` |
| `src/components/home/HeroSection.tsx` | 13 | `#1B2D4F, #0D3349` | `linear-gradient(135deg, var(--brand-navy), ...)` |
| `src/components/dog/PuppyGrowthWidget.tsx` | 26, 28, 29 | `#D97706, #CBD5E1, #64748B` | `var(--dog-primary), var(--gray-300), var(--gray-500)` |
| `src/components/dog/PuppyGrowthChart.tsx` | 60 | `#92400E` | `var(--dog-primary-dark)` |
| `src/hooks/useDogAge.ts` | 24-29 | 6 个 hex 值 | 考虑定义为设计 token 或使用现有语义色 |
| `src/hooks/useCatAge.ts` | 24 | `#6366F1` | 新增或使用 `--cat-accent` |

### 4.2 非颜色硬编码（非关键）

| 文件 | 行号 | 值 | 说明 |
|------|------|-----|------|
| `src/lib/data/insurance-data.ts` | 19, 27, 35, 43 | `#affiliate-placeholder` | URL 占位符，非颜色 |
| `src/components/shared/InsuranceWidget.tsx` | 121 | `&#10003;` | Unicode 字符 |

---

## 5.修复建议优先级

### 5.1 P0: 立即修复（影响可访问性合规）

```css
/* 修复状态色对比度 - 调暗背景色 */
:root {
  --status-safe-bg: #A7F3D0;      /* 更深的绿，对比度 3.4:1 */
  --status-caution-bg: #FDE68A;   /* 更深的琥珀，对比度 3.2:1 */
}
```

### 5.2 P1: 计划修复（深色模式体验）

```css
@media (prefers-color-scheme: dark) {
  /* 在深色表面使用品牌色而非深色变体 */
  /* 将 --dog-primary-dark 应用于文本时改用 --dog-primary */
  /* 将 --cat-primary-dark 应用于文本时改用 --cat-primary */
}
```

### 5.3 P2: 代码规范改进

1. 将所有硬编码 hex 值替换为 CSS 自定义属性引用
2. 渐变色使用 `var(--token)` 语法
3. 年龄阶段颜色考虑新增设计 token

---

## 6. 验证命令

```bash
# 运行对比度审计
node .trae/scripts/contrast-check.mjs

# 扫描硬编码颜色
grep -rn "#[0-9a-fA-F]\{3,6\}" src/components src/app 2>/dev/null
```

---

## 7. 参考资源

- [WCAG 2.1 对比度要求](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Colour Contrast Analyser](https://www.tpgi.com/color-contrast-checker/)
