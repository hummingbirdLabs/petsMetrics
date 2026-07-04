# 紧急行动指南页 × 17 — 执行指令

## 任务概述

你是 petsMetrics 项目的开发者。请创建 **17 个紧急行动指南页**（Phase 2 扩展部分），每种常见宠物毒物/异物一个页面，为宠物主人提供即时、可操作、生命攸关的安全信息。

---

## 项目上下文

### 技术栈
- **框架**: Next.js 14+ (App Router) with SSG (`output: 'export'`)
- **i18n**: next-intl (12 languages)
- **样式**: Tailwind CSS
- **URL 结构**: `/[locale]/[species]/emergency/ate-[item]/page.tsx`

### 当前站点状态
- 已有 Phase 1 的 8 个紧急行动指南页（巧克力、葡萄、木糖醇、洋葱、袜子、百合、钓鱼线、防冻剂）
- 本次扩展 17 个新毒物/异物页面
- 共享组件已存在：`KnowledgeSection`, `EmergencyBanner`, `FAQSection`, `MedicalDisclaimer`, `RelatedTools`

### 目标关键词搜索量
这 17 个页面合计预计带来 **10,000-20,000 月搜索流量**，属于高 CTR 紧急查询。

---

## 需要创建的 17 个页面

### 犬类毒物/异物（10 页）

| # | 文件路径 | 毒物/异物 | 毒性等级 | 目标关键词 | 月搜索量 |
|---|---------|----------|:---:|-----------|:---:|
| 1 | `src/app/[locale]/dog/emergency/ate-macadamia-nuts/page.tsx` | 夏威夷果 | 🟠 Dangerous | "my dog ate macadamia nuts" | 2k-3k |
| 2 | `src/app/[locale]/dog/emergency/ate-avocado/page.tsx` | 牛油果 | 🟡 Mildly Toxic | "dog ate avocado what to do" | 1k-2k |
| 3 | `src/app/[locale]/dog/emergency/ate-caffeine/page.tsx` | 咖啡因 | 🔴 Toxic | "dog ate caffeine pills" | 500-1k |
| 4 | `src/app/[locale]/dog/emergency/ate-alcohol/page.tsx` | 酒精 | 🔴 Toxic | "dog ate alcohol what to do" | 1k-2k |
| 5 | `src/app/[locale]/dog/emergency/ate-mushrooms/page.tsx` | 蘑菇 | 🔴⚠️ Extremely Toxic | "dog ate mushroom in yard" | 2k-4k |
| 6 | `src/app/[locale]/dog/emergency/ate-cooked-bones/page.tsx` | 烹饪骨头 | 🟠 Dangerous | "dog ate cooked bones" | 3k-5k |
| 7 | `src/app/[locale]/dog/emergency/ate-plastic/page.tsx` | 塑料异物 | 🟡 Monitor | "dog ate plastic toy" | 2k-4k |
| 8 | `src/app/[locale]/dog/emergency/ate-medication/page.tsx` | 人用药物 | 🔴 Toxic | "dog ate human medication" | 2k-3k |
| 9 | `src/app/[locale]/dog/emergency/ate-rodenticide/page.tsx` | 灭鼠药 | 🔴⚠️ Extremely Toxic | "dog ate rat poison" | 2k-3k |
| 10 | `src/app/[locale]/dog/emergency/ate-tobacco/page.tsx` | 烟草/尼古丁 | 🔴 Toxic | "dog ate tobacco/cigarette" | 1k-2k |

### 猫类毒物/异物（5 页）

| # | 文件路径 | 毒物/异物 | 毒性等级 | 目标关键词 | 月搜索量 |
|---|---------|----------|:---:|-----------|:---:|
| 11 | `src/app/[locale]/cat/emergency/ate-chocolate/page.tsx` | 巧克力 | 🟠 Dangerous (猫更敏感) | "cat ate chocolate emergency" | 2k-3k |
| 12 | `src/app/[locale]/cat/emergency/ate-onion/page.tsx` | 洋葱 | 🟠 Dangerous | "cat ate onion symptoms" | 1k-2k |
| 13 | `src/app/[locale]/cat/emergency/ate-garlic/page.tsx` | 大蒜 | 🟠 Dangerous | "cat ate garlic what to do" | 500-1k |
| 14 | `src/app/[locale]/cat/emergency/ate-essential-oils/page.tsx` | 精油 | 🔴 Toxic | "cat ate essential oils" | 1k-2k |
| 15 | `src/app/[locale]/cat/emergency/ate-fishing-line/page.tsx` | 钓鱼线 | 🔴⚠️ Extremely Toxic | "cat ate fishing line" | 3k-5k |

### 犬类特殊毒物（2 页）

| # | 文件路径 | 毒物/异物 | 毒性等级 | 目标关键词 | 月搜索量 |
|---|---------|----------|:---:|-----------|:---:|
| 16 | `src/app/[locale]/dog/emergency/ate-marijuana/page.tsx` | 大麻/THC | 🟠 Dangerous | "dog ate marijuana edibles" | 5k-10k |
| 17 | `src/app/[locale]/dog/emergency/ate-xylitol-gum/page.tsx` | 木糖醇口香糖 | 🔴⚠️ Extremely Toxic | "dog ate xylitol gum" | 3k-5k |

---

## 页面结构规范（每个页面必须包含）

### 1. Emergency Banner（紧急横幅）

```tsx
// 必需组件：EmergencyBanner
<EmergencyBanner
  riskLevel="Toxic" // 枚举: "Monitor" | "Mildly Toxic" | "Dangerous" | "Toxic" | "Extremely Toxic"
  riskColor="red"   // 枚举: "yellow" | "orange" | "red" | "dark-red"
  title="Dog Ate Macadamia Nuts: Act Now"
  subtitle="Toxic to dogs • Symptoms appear within 12 hours • Veterinary treatment often required"
  ctaText="Find Emergency Vet Near You"
  ctaLink="https://www.aspca.org/pet-care/animal-poison-control"
  hotline="(888) 426-4435"
  hotlineLabel="ASPCA Animal Poison Control Center (24/7)"
/>
```

### 2. Instant Risk Assessment（即时风险评估）

```tsx
<section aria-labelledby="risk-heading">
  <h2 id="risk-heading">Assess Your Dog's Risk Right Now</h2>
  
  {/* 风险等级判定表 */}
  <table className="risk-table">
    <thead>
      <tr>
        <th>Dog's Weight</th>
        <th>Amount Eaten</th>
        <th>Risk Level</th>
        <th>Action Required</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>&lt; 10 lbs (4.5 kg)</td>
        <td>Any amount</td>
        <td><span className="badge red">High</span></td>
        <td>🚨 Seek emergency veterinary care NOW</td>
      </tr>
      <tr>
        <td>10-25 lbs (4.5-11 kg)</td>
        <td>&gt; 1 nut per kg</td>
        <td><span className="badge orange">Moderate</span></td>
        <td>📞 Call vet or poison control immediately</td>
      </tr>
      <tr>
        <td>&gt; 25 lbs (11 kg)</td>
        <td>Small amount</td>
        <td><span className="badge yellow">Low</span></td>
        <td>👀 Monitor for symptoms, call vet if concerned</td>
      </tr>
    </tbody>
  </table>
</section>
```

### 3. Immediate Action Steps（即时行动步骤）

```tsx
<section aria-labelledby="action-heading">
  <h2 id="action-heading">What to Do Right Now</h2>
  
  <ol className="action-steps">
    <li>
      <strong>Step 1: Don't Panic, But Act Quickly</strong>
      <p> Remove any remaining [item] from your pet's reach. Stay calm — your pet will pick up on your stress.</p>
    </li>
    <li>
      <strong>Step 2: Do NOT Induce Vomiting (Unless Instructed)</strong>
      <p> ⚠️ For [item], inducing vomiting can cause [specific risk]. Only induce vomiting if explicitly instructed by a veterinarian.</p>
    </li>
    <li>
      <strong>Step 3: Gather Critical Information</strong>
      <ul>
        <li>Estimate the amount consumed (count wrappers, measure remaining food)</li>
        <li>Note the time of ingestion (check Security camera/CCTV footage)</li>
        <li>Take a photo of the product packaging (ingredients list)</li>
        <li>Weigh your pet (use bathroom scale: weigh yourself, then weigh yourself holding pet)</li>
      </ul>
    </li>
    <li>
      <strong>Step 4: Contact Professional Help</strong>
      <ul>
        <li>📞 <strong>ASPCA Poison Control:</strong> (888) 426-4435 ($95 consultation fee may apply)</li>
        <li>📞 <strong>Your regular vet:</strong> [link to find feature]</li>
        <li>🏥 <strong>Emergency vet clinic:</strong> [link to ASPCA finder]</li>
      </ul>
    </li>
    <li>
      <strong>Step 5: Monitor for Symptoms</strong>
      <p> Even if your pet seems fine now, symptoms may appear within [timeframe]. Watch for:</p>
      <ul>
        <li>🤢 Vomiting or diarrhea</li>
        <li>😵 Weakness or lethargy</li>
        <li>🌡️ Fever or hypothermia</li>
        {/* 毒物特异性症状 */}
      </ul>
    </li>
  </ol>
</section>
```

### 4. Toxic Dose Calculator（毒性剂量计算器）

```tsx
// 必需组件：ToxicDoseCalculator（新建共享组件）
<section aria-labelledby="calculator-heading">
  <h2 id="calculator-heading">Toxic Dose Calculator</h2>
  <ToxicDoseCalculator
    substance="macadamia-nuts"
    ld50={{ value: 2.4, unit: "g/kg", source: "Morton, 2002" }}
    mildSymptoms={{ value: 0.5, unit: "g/kg" }}
    calculatorFields={[
      { name: "petWeight", label: "Your Dog's Weight", unit: "kg", required: true },
      { name: "amountEaten", label: "Amount Eaten", unit: "grams", required: true },
      { name: "concentration", label: "Concentration (if known)", unit: "%", required: false },
    ]}
    resultTemplate={{
      safe: { color: "green", message: "Below mild symptom threshold. Monitor at home." },
      mild: { color: "yellow", message: "Mild toxicity risk. Call vet for advice." },
      moderate: { color: "orange", message: "Moderate toxicity. Seek veterinary care." },
      severe: { color: "red", message: "SEVERE TOXICITY RISK. Emergency vet NOW." },
    }}
  />
</section>
```

### 5. Knowledge Cards（知识卡片，4 张）

```tsx
<KnowledgeSection
  cards={[
    {
      title: "What Makes [Item] Toxic to Dogs?",
      content: "[毒理机制解释，80-150字，引用权威来源]",
      source: { name: "ASPCA Poison Control", url: "https://www.aspca.org/..." },
      icon: "science",
    },
    {
      title: "Symptom Timeline: What to Expect",
      content: "[症状时间线，如：2-6h 呕吐，6-12h 心律失常...]",
      source: { name: "Veterinary Toxicology Journal", url: "..." },
      icon: "clock",
    },
    {
      title: "Veterinary Treatment Protocol",
      content: "[兽医处理流程：活性炭/支持疗法/解毒剂...]",
      source: { name: "AAHA Guidelines", url: "..." },
      icon: "medical",
    },
    {
      title: "Prevention: Keep Your Dog Safe",
      content: "[预防措施：如何存放/如何训练"leave it"...]",
      source: { name: "AKC Safety Resources", url: "..." },
      icon: "shield",
    },
  ]}
/>
```

### 6. FAQ Section（3-5 条，使用 `<details>/<summary>`）

```tsx
<FAQSection
  faqs={[
    {
      question: "Can [item] kill my dog?",
      answer: "[直接答案，150-300字，含具体数字和来源]",
    },
    {
      question: "How long after eating [item] will my dog show symptoms?",
      answer: "[时间线，含剂量-反应关系]",
    },
    {
      question: "Should I make my dog vomit?",
      answer: "[催吐建议，含禁忌症]",
    },
    {
      question: "Will my dog recover from [item] poisoning?",
      answer: "[预后信息，含治疗时间线]",
    },
    {
      question: "How much does [item] poisoning treatment cost?",
      answer: "[费用预估范围，含保险信息]",
    },
  ]}
  jsonLdType="FAQPage"
/>
```

### 7. When to See a Vet（就医判定标准）

```tsx
<section aria-labelledby="vet-heading" className="vet-decision">
  <h2 id="vet-heading">When to See a Veterinarian</h2>
  
  <div className="vet-grid">
    <div className="vet-card emergency">
      <h3>🚨 Emergency — Go NOW</h3>
      <ul>
        <li>Seizures or tremors</li>
        <li>Difficulty breathing</li>
        <li>Collapse or unconsciousness</li>
        {/* 毒物特异性紧急症状 */}
      </ul>
    </div>
    
    <div className="vet-card urgent">
      <h3>⚡ Urgent — Within 1-2 Hours</h3>
      <ul>
        <li>Repeated vomiting</li>
        <li>Severe diarrhea</li>
        <li>Extreme lethargy</li>
        {/* 毒物特异性紧急症状 */}
      </ul>
    </div>
    
    <div className="vet-card monitor">
      <h3>👀 Monitor — Call Vet Today</h3>
      <ul>
        <li>Mild vomiting once</li>
        <li>Slight decrease in appetite</li>
        <li>Mild restlessness</li>
        {/* 毒物特异性监测症状 */}
      </ul>
    </div>
  </div>
</section>
```

### 8. Related Tools & Resources

```tsx
<RelatedTools
  tools={[
    { name: "Dog Toxic Food Checker", url: "/dog/tools/toxic-food-checker/", description: "Check if any food is toxic to your dog" },
    { name: "Dog Age Calculator", url: "/dog/age-calculator/", description: "Calculate your dog's age in human years" },
    // 页面相关工具
  ]}
  externalResources={[
    { name: "ASPCA Poison Control", url: "https://www.aspca.org/pet-care/animal-poison-control", description: "24/7 animal poison control hotline" },
    { name: "Find Emergency Vet", url: "https://www.aaha.org/find-a-hospital/", description: "AAHA-accredited emergency hospitals" },
  ]}
/>
```

### 9. Medical Disclaimer（医学免责声明）

```tsx
<MedicalDisclaimer
  variant="emergency"
  message="This page provides general reference information only and does not constitute veterinary advice, diagnosis, or treatment. If your pet has ingested something potentially toxic, contact your veterinarian or the ASPCA Animal Poison Control Center at (888) 426-4435 immediately."
/>
```

### 10. JSON-LD 结构化数据

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Article",
          "headline": "[页面标题]",
          "description": "[页面描述，≤160字符]",
          "author": { "@type": "Organization", "name": "petsMetrics" },
          "datePublished": "2026-07-03",
          "dateModified": "2026-07-03",
          "citation": [
            { "@type": "CreativeWork", "name": "ASPCA Poison Control", "url": "https://..." },
            // 页面特定引用
          ]
        },
        {
          "@type": "FAQPage",
          "mainEntity": [/* 与可见 FAQ 内容一致 */]
        },
        {
          "@type": "MedicalWebPage",
          "about": {
            "@type": "Drug", // 或 "ChemicalSubstance"
            "name": "[毒物名称]"
          },
          "aspect": "toxicity"
        }
      ]
    })
  }}
/>
```

---

## generateMetadata 规范

```ts
export async function generateMetadata({ params: { locale } }): Promise<Metadata> {
  const t = await getMessages(locale);
  
  return {
    title: "Dog Ate Macadamia Nuts: What to Do Now | petsMetrics",
    description: "Macadamia nuts are toxic to dogs. Learn the symptoms, risk assessment, and immediate steps to take if your dog ate macadamia nuts. Includes toxic dose calculator.",
    keywords: "dog ate macadamia nuts, macadamia nut toxicity dogs, dog poisoned by nuts, what to do if dog eats macadamia",
    alternates: {
      canonical: "https://petsmetrics.com/en/dog/emergency/ate-macadamia-nuts/",
      languages: {
        "en": "https://petsmetrics.com/en/dog/emergency/ate-macadamia-nuts/",
        "de": "https://petsmetrics.com/de/dog/emergency/ate-macadamia-nuts/",
        // ... 其他语言
      },
    },
    openGraph: {
      title: "Dog Ate Macadamia Nuts: What to Do Now",
      description: "Emergency guide: macadamia nuts are toxic to dogs. Assess risk, symptoms, and treatment.",
      type: "article",
      url: "https://petsmetrics.com/en/dog/emergency/ate-macadamia-nuts/",
      images: ["/og/dog-ate-macadamia-nuts.png"],
    },
  };
}
```

---

## i18n 翻译规范

在 `messages/en.json` 和 `messages/zh.json` 中添加：

```json
{
  "emergency": {
    "ateMacadamiaNuts": {
      "meta": {
        "title": "Dog Ate Macadamia Nuts: What to Do Now | petsMetrics",
        "description": "Macadamia nuts are toxic to dogs. Learn the symptoms, risk assessment, and immediate steps to take if your dog ate macadamia nuts."
      },
      "banner": {
        "title": "Dog Ate Macadamia Nuts: Act Now",
        "subtitle": "Toxic to dogs • Symptoms appear within 12 hours • Veterinary treatment often required",
        "cta": "Find Emergency Vet Near You",
        "hotline": "(888) 426-4435",
        "hotlineLabel": "ASPCA Animal Poison Control Center (24/7)"
      },
      "riskAssessment": {
        "title": "Assess Your Dog's Risk Right Now",
        "weightLabel": "Dog's Weight",
        "amountLabel": "Amount Eaten",
        "riskLabel": "Risk Level",
        "actionLabel": "Action Required",
        "high": "High",
        "moderate": "Moderate",
        "low": "Low",
        "seekCare": "🚨 Seek emergency veterinary care NOW",
        "callVet": "📞 Call vet or poison control immediately",
        "monitor": "👀 Monitor for symptoms, call vet if concerned"
      },
      "actionSteps": {
        "title": "What to Do Right Now",
        "step1": {
          "title": "Step 1: Don't Panic, But Act Quickly",
          "content": "Remove any remaining macadamia nuts from your dog's reach and out of sight."
        },
        // ... 步骤 2-5
      },
      // ... 其他区块
    }
  }
}
```

---

## 内容质量要求

### 独特内容（每页必须 ≥ 400 字独特文字）

| 内容区块 | 最低字数 | 要求 |
|---------|:---:|------|
| Emergency Banner | 50 | 毒物特异性风险描述 |
| Risk Assessment | 100 | 含体重-剂量-风险关系表 |
| Immediate Action Steps | 200 | 毒物特异性步骤（非模板） |
| Toxic Dose Calculator | 100 | 毒理学数据来源说明 |
| Knowledge Cards | 400 | 每张 80-150 字 |
| Toxicology Deep Dive | 150 | 毒理学机制 + 方法论文透明 |
| FAQ Section | 600 | 每条 150-300 字 |
| Vet Decision Guide | 150 | 毒物特异性症状清单 |
| Related Tools | 50 | 含交叉链接描述 |
| **合计** | **≥ 1,800** | **独特内容 ≥ 400 字** |

### 权威引用要求（每页至少 2 个）

- ASPCA Poison Control: https://www.aspca.org/pet-care/animal-poison-control
- Pet Poison Helpline: https://www.petpoisonhelpline.com/
- AAHA Guidelines: https://www.aaha.org/aaha-guidelines/
- Veterinary Toxicology Journal
- Merck Veterinary Manual: https://www.merckvetmanual.com/

### GEO 优化要求

- Knowledge Cards 首句包含品牌钩子：`"pmetrics Pet Health Guide: ..."`
- FAQ 使用 `<details>/<summary>` 而非 useState
- 所有文本必须在 HTML 源码中可见（Server Component）
- 关键数字用 `<strong>` 包裹

---

## SpamBrain 安全规则（不可违反）

1. **禁止模板化**：每个页面的毒物特异性内容 ≥ 60%
2. **禁止相同结构**：每个页面的风险表、症状时间线、治疗协议必须针对该毒物定制
3. **禁止虚假紧急**：毒性等级必须与权威来源一致
4. **禁止无来源声明**：所有数据必须有权威引用

---

## 共享组件创建

如果以下组件不存在，请先创建：

```
src/components/shared/
├── EmergencyBanner.tsx      // 紧急横幅（红色/橙色/黄色）
├── RiskAssessmentTable.tsx  // 风险评估表
├── KnowledgeSection.tsx     // 知识卡片区域
├── ToxicDoseCalculator.tsx  // 毒性剂量计算器（客户端交互组件）
├── FAQSection.tsx           // FAQ 区域
├── VetDecisionGuide.tsx     // 就医决策指南
├── RelatedTools.tsx         // 相关工具链接
├── MedicalDisclaimer.tsx    // 医学免责声明
└── SymptomTimeline.tsx      // 症状时间线
```

---

## 执行步骤

1. **创建共享组件**（如不存在）
2. **创建页面目录结构**
3. **逐页实现**（按上表顺序）
4. **添加 i18n 翻译**
5. **更新 sitemap.ts**
6. **交叉链接检查**
7. **验证构建**：`pnpm build`
8. **验证 HTML 源码**：确保 GEO 文本可见

---

## 验收标准

- [ ] 17 个页面全部创建并可正常构建
- [ ] 每个页面有独立的 title、description、keywords
- [ ] 每个页面有 Emergency Banner（正确的风险等级）
- [ ] 每个页面有 Risk Assessment Table（毒物特异性数据）
- [ ] 每个页面有 Toxic Dose Calculator（交互组件）
- [ ] 每个页面有 Knowledge Cards（4 张，每张 80-150 字）
- [ ] 每个页面有 FAQ（3-5 条，使用 `<details>`）
- [ ] 每个页面有 Vet Decision Guide（毒物特异性症状）
- [ ] 每个页面有 JSON-LD（Article + FAQPage + MedicalWebPage）
- [ ] 所有页面文本在 HTML 源码中可见
- [ ] 每页独特内容 ≥ 400 字
- [ ] 每页权威引用 ≥ 2 个
- [ ] 构建成功：`pnpm build` 无错误
- [ ] i18n 翻译完整（en + zh 至少）

---

## 毒物参考数据（用于内容创作）

### 夏威夷果（Macadamia Nuts）
- LD50: 2.4 g/kg（犬）
- 症状：后腿无力、呕吐、震颤、高热
- 机制：未知（对运动神经元的独特毒性）
- 治疗：活性炭 + 支持疗法，预后良好

### 牛油果（Avocado）
- 毒素：Persin
- 犬毒性：轻度（相比鸟类/兔极低）
- 风险：果核梗阻 > 毒性
- 症状：呕吐、腹泻、腹痛

### 咖啡因（Caffeine）
- LD50: 140 mg/kg（犬）
- 症状：多动、呕吐、心律失常、震颤
- 机制：腺苷受体拮抗剂
- 治疗：控制心律失常 + 支持疗法

### 酒精（Alcohol）
- LD50: 5.5 mL/kg（犬，乙醇）
- 症状：共济失调、抑郁、代谢性酸中毒
- 机制：中枢神经系统抑制
- 治疗方法：支持疗法，维持呼吸

### 蘑菇（Mushrooms）
- 剧毒种类：Amanita phalloides（death cap）
- LD50: 0.5 mg/kg（鹅膏毒素）
- 症状：延迟 6-24h 后爆发肝衰竭
- 治疗：青霉素 G + 水飞蓟素 + 支持疗法

### 烹饪骨头（Cooked Bones）
- 风险：肠梗阻/穿孔（非毒性）
- 症状：呕吐、腹痛、便秘、便血
- 诊断：X光/B超
- 治疗：内镜或手术取出

### 塑料异物（Plastic）
- 风险：肠梗阻（取决于大小）
- 决策树：> 2cm 宽 → 手术；< 2cm 宽 → 监测排便
- 症状：呕吐、厌食、腹痛

### 人用药物（Human Medication）
- 高危：NSAIDs（布洛芬）、对乙酰氨基胺
- 布洛芬 LD50: 100 mg/kg
- 症状：胃肠溃疡、肾衰竭
- 治疗：活性炭 + 保护胃黏膜

### 灭鼠药（Rodenticide）
- 类型1：抗凝血类（华法林）→ 维 K1 解毒
- 类型2：神经毒性类（溴鼠灵）→ 无特效解毒剂
- 症状：出血（类型1）或 抽搐（类型2）
- 治疗：输血浆 + 维K1 或 支持疗法

### 烟草/尼古丁（Tobacco）
- LD50: 20-100 mg/kg（犬，尼古丁）
- 症状：流涎、呕吐、心动过速 → 心动过缓
- 来源：香烟、尼古丁贴片、电子烟油
- 治疗：活性炭 + 支持疗法

---

## 执行完成后输出

1. 创建的文件清单（17 个 page.tsx + 共享组件）
2. 每个页面的字数统计
3. 构建结果
4. JSON-LD 验证结果
5. 任何遇到的问题或需要用户决策的事项
