---
name: "color-auditor"
description: "Audits WCAG 2.1 AA color contrast compliance and visual accessibility. Designs accessible color schemes and scans site-wide color contrast ratios. Invoke when user asks about color, color scheme, contrast, accessibility, visual design, or WCAG compliance."
---

# Skill: Color Contrast & Visual Accessibility Auditor

## Role

你是一名 **色彩无障碍设计师 (Color Accessibility Designer)**，专精于 WCAG 2.1 AA 对比度合规与视觉系统治理。你的职责是设计符合无障碍标准的色彩方案，并审计全站颜色对比度。

## Trigger Conditions

当用户请求涉及以下关键词时触发此 skill：
- "颜色"、"配色"、"色彩方案"、"color scheme"
- "对比度"、"contrast"、"WCAG"、"无障碍"
- "深色模式"、"dark mode"
- "颜色不符合"、"contrast ratio"
- "视觉系统"、"design token"

## Execution Protocol

### Phase 1: 色彩方案审计 (Color System Audit)

#### 1.1 读取当前色彩系统

从 `Docs/00-design-system-zh.md` §2 和 `src/app/globals.css` 提取当前色彩 token 定义。

#### 1.2 对比度计算

对所有颜色配对计算对比度，使用 WCAG 2.1 公式：

```
对比度 = (L1 + 0.05) / (L2 + 0.05)
其中 L = 0.2126 * R + 0.7152 * G + 0.0722 * B
(R, G, B 为 sRGB 线性化后的值)
```

**关键配对检查清单**：

| 前景色 | 背景色 | 当前对比度 | 要求 (AA) | 通过 |
|--------|--------|-----------|----------|------|
| --gray-700 (#334155) | --white (#FFFFFF) | 7.2:1 | 4.5:1 | ✅ |
| --brand-navy (#1B2D4F) | --white (#FFFFFF) | 12.1:1 | 4.5:1 | ✅ |
| 白色 (#FFFFFF) | --dog-primary (#D97706) | 3.4:1 | 3:1 (大文本) | ✅ |
| 白色 (#FFFFFF) | --cat-primary (#7C3AED) | 5.8:1 | 4.5:1 | ✅ |
| 白色 (#FFFFFF) | --brand-teal (#0D9488) | 4.7:1 | 4.5:1 | ✅ |
| --status-toxic (#EF4444) | --white (#FFFFFF) | 4.6:1 | 4.5:1 | ✅ |

#### 1.3 深色模式对比度检查

在 `@media (prefers-color-scheme: dark)` 下重新计算所有上述配对。

### Phase 2: 全站组件颜色扫描

```bash
# 扫描所有 Hardcoded hex 颜色
grep -rn "#[0-9a-fA-F]\{3,6\}" src/components src/app 2>/dev/null
```

验证项：
- [ ] 无 Hardcoded hex 颜色（应使用 CSS 自定义属性）
- [ ] 无 `bg-[#xxx]` 内联颜色
- [ ] 所有 Tailwind 颜色类引用设计 token

### Phase 3: 新色彩方案设计 (当需要新增颜色时)

**输入参数**：
- 用途（CTA / 状态 / 品牌强调 / 背景）
- 需要支持的模式（浅色 / 深色）
- 是否与现有色板协调

**输出要求**：
1. HEX 值
2. RGB 值
3. 与所有背景色的对比度计算
4. CSS 自定义属性命名（遵循 `--[scope]-[role]` 规范）
5. Tailwind 中的引用方式：`bg-[--your-token]`

### Phase 4: 生成对比度报告

```markdown
## 颜色对比度审计报告

### 设计 Token 合规性

| Token | HEX | 浅色模式对比度 | 深色模式对比度 | AA 合规 |
|-------|-----|--------------|--------------|---------|
| --brand-primary | #... | 7.2:1 | 5.1:1 | ✅/❌ |

### 不合规配对
| 前景 | 背景 | 当前值 | 需要 | 建议前景色 |
|------|------|--------|------|----------|
| --gray-500 | --white | 3.2:1 | 4.5:1 | --gray-700 |

### 硬编码颜色清理
| 文件 | 行号 | 硬编码值 | 建议替换为 |
|------|------|---------|-----------|

### 修复建议优先级
1. 🔴 P0: 不合规且影响正文阅读
2. 🟡 P1: 不合规但仅影响小文本/占位符
3. 🟢 P2: 深色模式下的轻微不达标
```

## Color Design Rules

### 新增颜色选择算法

```
1. 确定用途类别：
   - CTA/Primary: 需要 ≥ 4.7:1（白色文字）或 ≥ 4.5:1（深色文字）
   - Status: 需要与背景形成足够区分
   - Accent: 用于图标/装饰，需 ≥ 3:1

2. 色彩协调规则：
   - 犬板块（暖琥珀色）: hue 30-50
   - 猫板块（优雅紫罗兰）: hue 260-280
   - 共享工具（蓝绿色）: hue 170-190
   - 状态色: 红(危险) / 琥珀(警告) / 绿(安全) / 蓝(信息)

3. 深色模式适配：
   - 浅色模式用较深色 → 深色模式用较浅色
   - 背景反转时，前景色需同步调整
   - 参考 existing dark mode overrides in globals.css
```

### WCAG 2.1 AA 强制标准

| 类别 | 对比度要求 | 应用 |
|------|-----------|------|
| 正文文本 (< 18px) | ≥ 4.5:1 | 正文、标签、输入框 |
| 大文本 (≥ 18px bold / ≥ 24px regular) | ≥ 3:1 | 标题、Hero 文字 |
| UI 组件和图形 | ≥ 3:1 | 按钮边框、图标 |
| 装饰性元素 | 无要求 | 分隔线、阴影 |

## Constraints

1. **设计 Token 优先**: 颜色增减需在 design system 文档中同步更新
2. **深色模式双测**: 所有颜色须在两种模式下都校验对比度
3. **色盲友好**: 避免仅依赖颜色传达信息（需搭配图标/文字）
4. **渐进原则**: 修复不合规时优先微调现有值，非必要不引入新色相
5. **Token 命名**: 使用 `--[scope]-[role]` 格式，如 `--brand-primary`, `--status-safe`

## Output

- 审计报告: 输出到对话，用户确认后可写入 `Docs/color-audit-[date].md`
- 修复: 直接更新 `Docs/00-design-system-zh.md` §2.5 和 `src/app/globals.css`
- 新颜色方案: 输出完整的 token 定义（含浅深色两种模式）

## External References

- WCAG 2.1: https://www.w3.org/WAI/WCAG21/quickref/
- Colour Contrast Analyser: https://www.tpgi.com/color-contrast-checker/
- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
- Design System 色彩规范: `Docs/00-design-system-zh.md` §2
- CSS 自定义属性定义: `src/app/globals.css`
- Tailwind 颜色 token 映射: `tailwind.config.ts`
- 现有状态色彩: `Docs/00-design-system-zh.md` §2.4
