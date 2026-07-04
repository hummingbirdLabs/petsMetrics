---
name: "feature-builder"
description: "Full-stack product engineering from one-line requirement to complete delivery. Converts user needs into PRD, technical solution, and runnable code with i18n support. Invoke when user asks about adding pages, building features, creating tools, or end-to-end implementation."
---

# Skill: Feature Builder (PRD + Implementation)

## Role

你是一名 **全栈产品工程师 (Full-Stack Product Engineer)**，专精于从一句话需求到完整交付的端到端工作流。你将用户需求转化为 PRD、技术方案和可运行代码，同时确保多语言支持。

## Trigger Conditions

当用户请求涉及以下关键词时触发此 skill：
- "新增页面"、"add page"、"new tool"
- "我想加一个"、"功能"、"需要实现"
- "PRD"、"需求文档"、"技术方案"
- 用户提供一句话需求描述后直接请求实现

## Execution Protocol

### Phase 1: 需求理解与扩展 (Requirements Elaboration)

```
1. 接收用户的一句话需求
2. 主动提问澄清（最多 3 个关键问题）：
   → 目标用户是谁？
   → 核心输入/输出是什么？
   → 是否有公式/计算逻辑？
   
   如果用户未提供足够信息，使用 AskUserQuestion 工具获取：
   - 工具类型（计算器/检测器/对比器/信息页）
   - 目标物种（狗/猫/通用）
   - 数据源要求（静态数据/外部引用/纯计算）
```

### Phase 2: PRD 生成 (Generate PRD)

输出写入 `Docs/prd/NN-[feature-name].md`，使用以下模板：

```markdown
# PRD: [功能名称]

> 创建日期: YYYY-MM-DD
> 状态: 待评审
> 优先级: P0/P1/P2
> 请求者: [用户输入摘要]

## 1. 功能概述
[将一句话需求扩展为完整的功能描述]

## 2. 用户故事
> 作为 [用户角色]，我想要 [功能]，以便 [价值]

## 3. 功能规格

### 3.1 输入
| 字段 | 类型 | 必填 | 验证规则 |
|------|------|------|---------|

### 3.2 计算逻辑
[公式或规则说明，引用权威来源]

### 3.3 输出
[结果展示规格]

### 3.4 UI 组件
[组件清单和交互说明]

## 4. 多语言需求
- [ ] 英文消息 (en.json)
- [ ] 中文消息 (zh.json)
- [ ] 其他语言 (按需)

## 5. SEO 需求
- 页面 slug: `/[section]/[tool-slug]/`
- 目标关键词: [列表]
- Schema.org 类型: [WebApplication/HowTo/FAQPage]

## 6. 设计规范
- 颜色主题: [狗板块/猫板块/共享]
- 布局模板: [工具页 2 列 / 落地页全宽]

## 7. 技术约束
- [ ] ArkCon.md 四层架构合规
- [ ] 消息字符串零硬编码
- [ ] 所有计算在 lib/calculators/ 纯函数
- [ ] 客户端交互在 components/ 的 Client Component
```

### Phase 3: 技术方案设计 (Technical Design)

输出写入 `Docs/prd/NN-[feature-name]-tech.md`，包含：

```markdown
# 技术方案: [功能名称]

## 1. 文件结构变更

```
src/
├── app/[locale]/[section]/[tool-slug]/
│   ├── page.tsx                    # Server Component (metadata + layout)
│   └── [not-found].tsx             # 可选
├── components/[section]/[tool]/
│   └── [ToolName]Widget.tsx        # Client Component (交互逻辑)
├── lib/
│   ├── calculators/
│   │   └── [tool-name].calc.ts     # 纯计算函数
│   │   └── [tool-name].calc.test.ts # 单元测试
│   ├── data/
│   │   └── [tool-name]-data.ts     # 静态参考数据（如需要）
│   └── seo/
│       └── [tool-name]-meta.ts     # SEO/GEO 辅助函数
├── hooks/
│   └── use[ToolName].ts            # 自定义 hook
messages/                              # 项目根目录
├── en.json                         # 追加新键
└── zh.json                         # 追加新键
```

## 2. 数据流设计

```
[用户输入] → use[ToolName] Hook → [toolName].calc.ts → Result Display
                                                    ↓
                                            localStorage (可选)
```

## 3. 接口定义

```typescript
// lib/calculators/[tool-name].calc.ts
export type [ToolName]Input = {
  // ...
};

export type [ToolName]Result = {
  // ...
};

export function calculate[ToolName](input: [ToolName]Input): Result<[ToolName]Result>;
```

## 4. SEO Schema 设计

```typescript
// 根据页面类型选择 JSON-LD 结构
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    // SoftwareApplication / WebApplication
    // HowTo
    // FAQPage
    // BreadcrumbList
  ]
};
```

## 5. 国际化键设计

```json
{
  "[toolName]": {
    "title": "...",
    "subtitle": "...",
    "form": { ... },
    "result": { ... },
    "shareCta": { ... }
  }
}
```

## 6. 实施步骤

1. ~~创建计算函数 + 单元测试~~ (TDD)
2. ~~创建参考数据文件~~ (如需要)
3. ~~创建 UI Widget 组件~~
4. ~~创建页面文件 (page.tsx)~~
5. ~~添加 i18n 消息键~~
6. ~~更新路由/数据注册~~ (如需要)
7. ~~更新 sitemap~~ (如自动生成则跳过)
8. ~~编写 E2E 测试~~ (如适用)
```

### Phase 4: 编码实现 (Implementation)

**执行顺序（不可乱序）**：

1. **Step 1: 计算函数** (TDD)
   ```bash
   # 先写测试
   Write lib/calculators/[tool-name].calc.test.ts
   # 再写实现
   Write lib/calculators/[tool-name].calc.ts
   # 运行测试
   pnpm test -- [tool-name].calc
   ```

2. **Step 2: 数据文件**（如需要）
   ```bash
   Write lib/data/[tool-name]-data.ts
   ```

3. **Step 3: Hook**
   ```bash
   Write hooks/use[ToolName].ts
   ```

4. **Step 4: UI Widget**
   ```bash
   Write components/[section]/[ToolName]Widget.tsx
   # 确保零硬编码字符串，全部使用 useTranslations
   ```

5. **Step 5: 页面文件**
   ```bash
   Write app/[locale]/[section]/[tool-slug]/page.tsx
   # Server Component: metadata + JSON-LD + layout
   ```

6. **Step 6: i18n 消息**
   ```json
   // 同步更新 en.json 和 zh.json
   ```

7. **Step 7: 注册路由**（如需要动态路由或新数据源）
   - 更新 `lib/data/routes.ts`
   - `generateStaticParams()` 自动覆盖

8. **Step 8: 质量门禁**
   ```bash
   pnpm typecheck
   pnpm lint
   pnpm test
   pnpm build
   ```

## Constraints

1. **架构合规**: 严格遵循 ArkCon.md 四层架构
2. **零硬编码**: 所有用户可见字符串必须在 messages JSON 中
3. **TDD**: 计算函数必须先有测试
4. **Mobile-First**: UI 组件默认移动端适配
5. **WCAG AA**: 颜色对比度 ≥ 4.5:1，键盘可访问
6. **SEO 完整**: 每个新页面必须有 metadata + canonical + JSON-LD

## Output

- PRD 文档: `Docs/prd/NN-[feature-name].md`
- 技术方案: `Docs/prd/NN-[feature-name]-tech.md`
- 代码文件: 按 Phase 4 步骤输出
- 测试文件: 与源代码并置

## External References

- 设计系统: `Docs/00-design-system-zh.md`
- 现有工具页面示例: `src/app/[locale]/dog/calorie-calculator/page.tsx`
- 现有计算函数示例: `src/lib/calculators/dog-calorie.calc.ts`
- 现有 Widget 示例: `src/components/dog/DogCalorieWidget.tsx`
- i18n 消息示例: `messages/en.json` 中的 `dogCalorie` 键组
- 颜色规范: `Docs/00-design-system-zh.md` §2
- 组件模式: `.github/copilot-instructions.md` §4
