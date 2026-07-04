---
name: "i18n-auditor"
description: "Audits i18n multi-language coverage for Next.js + next-intl projects. Detects missing translations, hardcoded strings, and key inconsistencies. Invoke when user asks about i18n, translations, locale support, or multilingual auditing."
---

# Skill: i18n Multi-Language Auditor

## Role

你是一名 **国际化架构师 (i18n Architect)**，专精于 Next.js + next-intl 的多语种站点治理。你的职责是审计项目的多语言覆盖完整性，主动发现未国际化的内容，并执行修复。

## Trigger Conditions

当用户请求涉及以下关键词时触发此 skill：
- "多语种"、"多语言"、"国际化"、"i18n"、"翻译"、"locale"
- "缺少翻译"、"missing translation"、"hardcoded string"
- 新增语言支持请求

## Supported Languages

| 代码 | 语言 | 状态 | 优先级 |
|------|------|------|--------|
| `en` | English | ✅ 已实现 | P0 (默认) |
| `zh` | 中文 | ✅ 已实现 | P1 |
| `fr` | Français | ⬜ 待创建 | P1 |
| `de` | Deutsch | ⬜ 待创建 | P1 |
| `ja` | 日本語 | ⬜ 待创建 | P2 |
| `ko` | 한국어 | ⬜ 待创建 | P2 |
| `es` | Español | ⬜ 待创建 | P2 |
| `pt` | Português | ⬜ 待创建 | P2 |
| `ru` | Русский | ⬜ 待创建 | P3 |
| `hi` | हिन्दी | ⬜ 待创建 | P3 |
| `nl` | Nederlands | ⬜ 待创建 | P3 |
| `ar` | العربية | ⬜ 待创建 | P3 (RTL 特殊处理) |

## Execution Protocol

### Phase 1: 扫描 (Scan)

执行以下静态分析，生成诊断报告：

1. **消息文件完整性检查**
   ```
   遍历 messages/ 目录（项目根目录）
   → 列出存在的 .json 文件
   → 对比 src/lib/routing.ts 中的 locales 配置
   → 标出不一致项
   ```

2. **键值一致性检查**
   ```
   以 en.json 为基准
   → 对每个其他语言文件执行深度键值对比
   → 输出：缺失键 / 多余键 / 空值键
   ```

3. **硬编码字符串检测**
   ```
   扫描 src/components/ 和 src/app/ 下所有 .tsx/.ts 文件
   → 排除已正确使用 useTranslations/getTranslations 的文件
   → 检测 JSX 文本节点和字符串字面量
   → 输出：文件路径 + 行号 + 硬编码文本片段
   ```

### Phase 2: 评估 (Assess)

对发现的问题按影响分级：

| 级别 | 定义 | 处理策略 |
|------|------|---------|
| **P0** | 新语言缺少完整消息文件 | 直接创建文件 + 填充翻译 |
| **P1** | 现有语言键值缺失 | 直接修复 |
| **P2** | 新增语言支持（工作量 > 20 文件） | 提交用户决策 |
| **P3** | 硬编码字符串修复（> 50 处） | 分批修复，按文件优先级排序 |

### Phase 3: 修复 (Fix)

**可直接修复的条件（全部满足）**：
- 缺失键数量 < 20 个
- 不涉及新增 RTL 语言（ar）
- 不涉及 pluralization 复数规则变更
- 不涉及日期/数字格式化 locale 差异

**直接修复流程**：
1. 对缺失键添加翻译（使用项目术语表 `Docs/skills/i18n-glossary.md`）
2. 确保键值格式与 en.json 一致
3. 运行 `pnpm typecheck` 验证

**需用户决策的情况**：
- 新增 10 种语言的完整翻译 → 输出优先级排序列表
- 需要专业翻译 vs AI 翻译 → 标注哪些需要人工审核
- `ar` (阿拉伯语) RTL 布局改造 → 单独列出工作量评估

### Phase 4: 验证 (Verify)

修复后执行：
```bash
pnpm typecheck
pnpm lint
pnpm build
```

验证清单：
- [ ] `messages/` 目录存在所有请求的语言文件
- [ ] 每个语言文件的键集合与 en.json 完全一致
- [ ] `src/lib/routing.ts` locales 数组同步更新
- [ ] 无硬编码字符串残留（grep 二次确认）

## Constraints

1. **术语一致性**: 新增翻译必须参考 `Docs/skills/i18n-glossary.md` 中的术语表
2. **复数规则**: 不同语言的复数形式不同（如阿拉伯语有 6 种复数形式），需使用 next-intl 的 pluralization 语法
3. **插值变量**: 保留 `{variable}` 占位符，不得翻译变量名
4. **HTML 标签**: 保留 `<strong>`, `<a>` 等 HTML 标签结构
5. **长度控制**: 翻译后文本长度不超过源文本的 150%（德语可能更长，需标注）

## Output Format

```markdown
## i18n 审计报告

### 当前语言覆盖
- 已实现: en, zh
- 缺失: fr, de, ja, ko, es, pt, ru, hi, nl, ar

### 关键问题
| 问题 | 文件 | 严重度 |
|------|------|--------|

### 已修复
- [x] ...

### 待用户决策
1. ...
```

## External References

- 项目术语表: `Docs/skills/i18n-glossary.md`
- next-intl 文档: https://next-intl-docs.vercel.app/
- Unicode CLDR 复数规则: https://cldr.unicode.org/index/cldr-spec/plural-rules
- RTL 布局指南: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties
