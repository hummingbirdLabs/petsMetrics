# 生命阶段新手清单页 × 6 — 执行指令

## 任务概述

你是 petsMetrics 项目的开发者。请创建 **6 个生命阶段新手清单页**（Phase 2 部分），为宠物进入不同生命阶段的新手主人提供完整、可操作、可打印的清单指南。

---

## 项目上下文

### 技术栈
- **框架**: Next.js 14+ (App Router) with SSG (`output: 'export'`)
- **i18n**: next-intl (12 languages)
- **样式**: Tailwind CSS
- **URL 结构**: `/[locale]/[species]/guide/[life-stage]-checklist/page.tsx`

### 当前站点状态
- 已有 Dog Hub 和 Cat Hub 页面
- 已有多个工具页面（年龄计算器、疫苗计划、生长预测等）
- 共享组件已存在：`KnowledgeSection`, `FAQSection`, `ChecklistSection`, `RelatedTools`, `MedicalDisclaimer`

### 目标关键词搜索量
这 6 个页面合计预计带来 **8,000-15,000 月搜索流量**，属于高搜索量的决策前查询（Pre-decision Intent），Checklist 格式是 Featured Snippet 的自然候选。

---

## 需要创建的 6 个页面

### 犬类清单（4 页）

| # | 文件路径 | 生命阶段 | 目标关键词 | 月搜索量 |
|---|---------|---------|-----------|:---:|
| 1 | `src/app/[locale]/dog/guide/new-puppy-checklist/page.tsx` | 幼犬到家 (0-16 周) | "new puppy checklist" | 12k-20k |
| 2 | `src/app/[locale]/dog/guide/senior-dog-care/page.tsx` | 老年犬护理 (7 岁+) | "senior dog health tips" | 8k-12k |
| 3 | `src/app/[locale]/dog/guide/adopting-rescue-dog/page.tsx` | 领养救助犬 | "adopting a rescue dog checklist" | 5k-8k |
| 4 | `src/app/[locale]/dog/guide/puppy-development-stages/page.tsx` | 幼犬发育阶段 | "puppy development week by week" | 8k-12k |

### 猫类清单（2 页）

| # | 文件路径 | 生命阶段 | 目标关键词 | 月搜索量 |
|---|---------|---------|-----------|:---:|
| 5 | `src/app/[locale]/cat/guide/new-kitten-checklist/page.tsx` | 幼猫到家 (0-16 周) | "new kitten checklist" | 10k-15k |
| 6 | `src/app/[locale]/cat/guide/senior-cat-care/page.tsx` | 老年猫护理 (10 岁+) | "senior cat health guide" | 5k-8k |

---

## 页面结构规范（每个页面必须包含）

### 1. Checklist Hero（清单头部）

```tsx
// 必需组件：ChecklistHero
<ChecklistHero
  title="New Puppy Checklist: Everything You Need Before Day One"
  subtitle="From supplies to vet visits, this comprehensive checklist covers everything you need to prepare for your new puppy's arrival."
  species="dog"
  lifeStage="puppy"
  estimatedCost={{ min: 1500, max: 3500, currency: "USD", timeframe: "first year" }}
  ctaText="Download Free PDF Checklist"
  ctaAction="download-pdf"
  keyStats={[
    { label: "Items to Check", value: "47" },
    { label: "Vet Visits in First Year", value: "4-6" },
    { label: "Avg. First Year Cost", value: "$1,500-$3,500" },
    { label: "Socialization Window Closes", value: "16 weeks" },
  ]}
/>
```

### 2. Interactive Checklist（交互式清单）

```tsx
// 必需组件：InteractiveChecklist（客户端组件，使用 localStorage 保存进度）
<InteractiveChecklist
  sections={[
    {
      id: "before-arrival",
      title="🏠 Before Your Puppy Arrives",
      description="Essential preparation 1-2 weeks before bringing your puppy home",
      items: [
        { id: "crate", label: "Crate (size: [breed-specific])", required: true, note: "Large enough for adult size" },
        { id: "bed", label: "Dog bed (washable)", required: true },
        { id: "food-bowls", label: "Food and water bowls (stainless steel)", required: true },
        { id: "puppy-food", label: "Puppy food (ask breeder/shelter for current brand)", required: true },
        { id: "collar-harness", label: "Collar and harness (adjustable)", required: true },
        { id: "leash", label: "Leash (6-foot, not retractable)", required: true },
        { id: "id-tag", label: "ID tag with your phone number", required: true },
        { id: "puppy-pads", label: "Puppy pee pads (until fully vaccinated)", required: true },
        { id: "gates", label: "Baby gates for area restriction", required: true },
        { id: "toys", label: "Chew toys (Kong, Nylabone, rope)", required: true },
        { id: "enzymatic-cleaner", label: "Enzymatic cleaner (Nature's Miracle)", required: true },
        { id: "puppy-proofing", label: "Puppy-proof electrical cords and toxic plants", required: true },
        { id: "vet-appointment", label: "Schedule first vet visit (within 48 hours)", required: true },
      ],
    },
    {
      id: "first-24-hours",
      title="⏰ First 24 Hours",
      description="The critical first day with your new puppy",
      items: [
        { id: "vet-check", label: "Complete health check-up at vet", required: true },
        { id: "vaccination-record", label: "Obtain vaccination records from breeder/shelter", required: true },
        { id: "deworming", label: "Confirm deworming schedule", required: true },
        { id: "microchip", label: "Verify microchip registration or schedule implant", required: false },
        { id: "potty-routine", label: "Establish potty routine (out every 1-2 hours)", required: true },
        { id: "crate-training", label: "Introduce crate as positive space", required: true },
        { id: "sleep-schedule", label: "Set up sleeping area near your bed", required: true },
      ],
    },
    // ... 更多阶段
  ]}
  storageKey="puppy-checklist-progress"
  showProgressBar={true}
  allowPrint={true}
  allowPDFDownload={true}
/>
```

### 3. Timeline Section（时间线）

```tsx
<TimelineSection
  timeline={[
    {
      week: "Week 1-2",
      title: "Adjustment Period",
      tasks: [
        "Vet visit for health baseline",
        "Establish feeding schedule (3-4 meals/day)",
        "Begin crate training (15min sessions)",
        "Start potty training",
        "Limit visitors (reduce stress)",
      ],
      cta: { text: "Calculate Feeding Amount", url: "/dog/calorie-calculator/" },
      vetVisit: { type: "Initial Health Check", cost: "$50-$100" },
    },
    {
      week: "Week 3-4",
      title: "Socialization Begins",
      tasks: [
        "Meet vaccinated, friendly dogs",
        "Introduce to new surfaces (grass, tile, gravel)",
        "Desensitize to vacuum, doorbell, thunder sounds",
        "Handle paws, ears, mouth daily",
        "Begin 'sit' command training",
      ],
      cta: { text: "View Vaccination Schedule", url: "/dog/vaccination-schedule/" },
    },
    {
      week: "Week 5-8",
      title: "Critical Socialization Window",
      tasks: [
        "Meet 100 different people (varied ages, appearances)",
        "Visit 20+ new locations (pet-friendly stores, friends' homes)",
        "Ride in car (short trips)",
        "Experience grooming tools (brush, nail clippers)",
        "Begin 'come' and 'stay' commands",
      ],
      cta: { text: "Find Puppy Socialization Classes", url: "https://www.akc.org/" },
    },
    {
      week: "Week 9-12",
      title: "Adolescent Transition",
      tasks: [
        "Switch to 2 meals/day",
        "Begin leash walking training",
        "Spay/neuter discussion with vet",
        "Teeth brushing daily routine",
        "Increase exercise gradually",
      ],
      cta: { text: "Predict Adult Size", url: "/dog/puppy-growth-predictor/" },
    },
    {
      week: "Week 13-16",
      title: "Adolescent Challenges",
      tasks: [
        "Expect fear period (normal behavior)",
        "Continue consistent training",
        "Complete vaccination series",
        "Begin off-leash training in safe areas",
        "Establish grooming routine",
      ],
      cta: { text: "Find Emergency Vet", url: "https://www.aaha.org/" },
    },
  ]}
/>
```

### 4. Budget Calculator（预算计算器）

```tsx
<section aria-labelledby="budget-heading">
  <h2 id="budget-heading">First Year Cost Estimator</h2>
  
  <div className="budget-grid">
    <div className="budget-section">
      <h3>🏥 One-Time Costs</h3>
      <table className="budget-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Estimated Cost</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Initial Vet Exam</td>
            <td>$50 - $100</td>
          </tr>
          <tr>
            <td>Vaccination Series (DHPP x3 + Rabies)</td>
            <td>$75 - $150</td>
          </tr>
          <tr>
            <td>Spay/Neuter</td>
            <td>$200 - $500</td>
          </tr>
          <tr>
            <td>Microchip</td>
            <td>$25 - $50</td>
          </tr>
          <tr>
            <td>Crate, Bed, Bowls, Toys</td>
            <td>$150 - $300</td>
          </tr>
          <tr>
            <td>Training Classes (6-week course)</td>
            <td>$100 - $250</td>
          </tr>
          <tr className="total">
            <td><strong>One-Time Total</strong></td>
            <td><strong>$600 - $1,350</strong></td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div className="budget-section">
      <h3>🔄 Recurring Costs (Monthly)</h3>
      <table className="budget-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Estimated Cost</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>High-Quality Puppy Food</td>
            <td>$40 - $80/month</td>
          </tr>
          <tr>
            <td>Heartworm/Flea Prevention</td>
            <td>$20 - $40/month</td>
          </tr>
          <tr>
            <td>Pet Insurance (optional)</td>
            <td>$30 - $70/month</td>
          </tr>
          <tr>
            <td>Treats & Chews</td>
            <td>$15 - $30/month</td>
          </tr>
          <tr className="total">
            <td><strong>Monthly Total</strong></td>
            <td><strong>$105 - $220</strong></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  
  <p className="budget-note">
    <strong>💡 Pro Tip:</strong> Use our <a href="/dog/pet-insurance-estimator/">Pet Insurance Calculator</a> to determine if insurance makes financial situation for your situation.
  </p>
</section>
```

### 5. Knowledge Cards（知识卡片，4 张）

```tsx
<KnowledgeSection
  cards={[
    {
      title: "The Critical Socialization Window (3-16 Weeks)",
      content: "Puppy's socialization window closes at 16 weeks. During this period, they need positive exposure to 100 people, 20 environments, and various sounds. This is the single most important factor in reducing adult behavioral problems. Source: AVSAB Position Statement on Puppy Socialization.",
      source: { name: "AVSAB", url: "https://avsab.org/" },
      icon: "brain",
    },
    {
      title: "Vaccination Schedule: Why Timing Matters",
      content: "Puppies receive maternal antibodies that interfere with vaccines until 6-8 weeks. The DHPP series (Distemper, Hepatitis, Parainfluenza, Parvovirus) requires 3-4 doses at 3-4 week intervals. Rabies is given at 12-16 weeks per state law. Source: AAHA Canine Vaccination Guidelines 2022.",
      source: { name: "AAHA", url: "https://www.aaha.org/" },
      icon: "shield",
    },
    {
      title: "House Training Success Formula",
      content: "Take puppy out every 1-2 hours, immediately after meals/naps, and always praise successful elimination. Accidents indoors should be cleaned with enzymatic cleaner — urine smell triggers re-marking. Most puppies are reliably housetrained by 4-6 months. Source: AKC House Training Guide.",
      source: { name: "AKC", url: "https://www.akc.org/" },
      icon: "house",
    },
    {
      title: "The 3-3-3 Rule for Rescue Dogs",
      content: "Week 1: Your dog may be overwhelmed, fearful, and not show true personality. Week 2: They're settling in, learning routines, and showing more behavior. Week 3: They feel secure, comfortable, and showing their true personality. Patience is key. Source: Rescue Dog Expert Deb Davis.",
      source: { name: "Rescue Dog Expert", url: "https://www.rescuedogexpert.com/" },
      icon: "heart",
    },
  ]}
/>
```

### 6. Common Mistakes Section（常见误区）

```tsx
<section aria-labelledby="mistakes-heading" className="mistakes-section">
  <h2 id="mistakes-heading">⚠️ Common Mistakes New Puppy Owners Make</h2>
  
  <div className="mistakes-grid">
    <div className="mistake-card">
      <h3>Mistake #1: Skipping the First Vet Visit</h3>
      <p><strong>Why it's dangerous:</strong> 15% of puppies from pet stores have congenital health issues. Early detection saves money and lives.</p>
      <p><strong>What to do instead:</strong> Schedule exam within 48 hours of adoption. Bring stool sample for parasite check.</p>
    </div>
    
    <div className="mistake-card">
      <h3>Mistake #2: Waiting Too Long for Socialization</h3>
      <p><strong>Why it's dangerous:</strong> After 16 weeks, fear responses dominate. Under-socialized dogs are 3x more likely to develop aggression/anxiety.</p>
      <p><strong>What to do instead:</strong> Start socialization immediately (even before full vaccination — use controlled environments).</p>
    </div>
    
    <div className="mistake-card">
      <h3>Mistake #3: Inconsistent Rules</h3>
      <p><strong>Why it's dangerous:</strong> If puppy is allowed on couch 'sometimes', they never learn the rule. Confusion leads to anxiety.</p>
      <p><strong>What to do instead:</strong> All family members must enforce same rules from Day 1.</p>
    </div>
    
    <div className="mistake-card">
      <h3>Mistake #4: Ignoring Bite Inhibition Training</h3>
      <p><strong>Why it's dangerous:</strong> Puppies learn bite inhibition from littermates. Without this, hard bites become adult behavior.</p>
      <p><strong>What to do instead:</strong> Yelp "ouch!" and withdraw attention when bitten too hard. Teach gentle mouth behavior.</p>
    </div>
    
    <div className="mistake-card">
      <h3>Mistake #5: Over-Exercise Joints</h3>
      <p><strong>Why it's dangerous:</strong> Large breed puppies' growth plates don't fuse until 12-18 months. Over-exercise causes lifelong joint damage.</p>
      <p><strong>What to do instead:</strong> Follow the "5-minute rule": 5 minutes of structured exercise per month of age, twice daily.</p>
    </div>
    
    <div className="mistake-card">
      <h3>Mistake #6: Punishment-Based Training</h3>
      <p><strong>Why it's dangerous:</strong> Yelling, hitting, or 'dominance' techniques create fear, aggression, and destroy trust.</p>
      <p><strong>What to do instead:</strong> Use positive reinforcement. Reward desired behaviors. Redirect unwanted behaviors.</p>
    </div>
  </div>
</section>
```

### 7. FAQ Section（5-8 条，使用 `<details>/<summary>`）

```tsx
<FAQSection
  faqs={[
    {
      question: "What do I need for a new puppy before bringing it home?",
      answer: "Essentials include: crate (adult-sized with divider), food/water bowls, puppy food (same as breeder/shelter initially), collar with ID tag, 6-foot leash, bed, puppy pee pads, enzymatic cleaner, chew toys (Kong, rope), baby gates, brush/nail clippers. Budget $150-$300 for initial supplies.",
    },
    {
      question: "When should a puppy have its first vet visit?",
      answer: "Schedule within 48 hours of adoption. The vet will conduct a full physical exam, check for parasites (bring stool sample), review vaccination records, discuss spay/neuter timing, and establish a preventive care plan. This visit is crucial for identifying congenital issues early.",
    },
    {
      question: "How often should a puppy eat?",
      answer: "8-12 weeks: 4 meals/day. 3-6 months: 3 meals/day. 6+ months: 2 meals/day. Consistent feeding times aid house training and prevent hypoglycemia in small breeds.",
    },
    {
      question: "When can a puppy meet other dogs?",
      answer: "Puppies can meet healthy, vaccinated dogs in controlled environments (your home, friend's home) immediately. Wait until 2 weeks after final DHPP vaccine (around 16 weeks) for dog parks, pet stores, and unknown dogs.",
    },
    {
      question: "How much exercise does a puppy need?",
      answer: "Follow the '5-minute rule': 5 minutes of structured exercise (walking, play) per month of age, twice daily. A 3-month-old puppy = 15 minutes twice a day. Adjust for breed energy level. Avoid forced running or jumping until growth plates fuse (12-18 months).",
    },
    {
      question: "When should I start training my puppy?",
      answer: "Start Day 1! Begin with name recognition, 'sit', and crate training. Formal group classes can start after first vaccinations (8 weeks). The critical socialization window (3-16 weeks) is when the most learning occurs.",
    },
    {
      question: "How much does a puppy cost in the first year?",
      answer: "Average first-year cost: $1,500-$3,500. This includes: vet care ($400-$800), food ($400-$900), supplies ($200-$400), training ($100-$300), spay/neuter ($200-$500), and unexpected costs ($200-$600). Pet insurance can offset emergency costs.",
    },
    {
      question: "What is the 3-3-3 rule for rescue dogs?",
      answer: "First 3 days: Dog is overwhelmed, scared, hiding, may not eat. First 3 weeks: Dog learns routine, shows more personality. First 3 months: Dog feels secure, shows true personality, bond is established. Be patient and consistent.",
    },
  ]}
  jsonLdType="FAQPage"
/>
```

### 8. Related Tools & CTAs

```tsx
<RelatedTools
  tools={[
    {
      name: "Dog Age Calculator",
      url: "/dog/age-calculator/",
      description: "Calculate your dog's age in human years and find out what life stage they're in.",
      icon: "calculator",
    },
    {
      name: "Vaccination Schedule Planner",
      url: "/dog/vaccination-schedule/",
      description: "Create a personalized vaccination timeline based on your puppy's age and risk factors.",
      icon: "calendar",
    },
    {
      name: "Puppy Growth Predictor",
      url: "/dog/puppy-growth-predictor/",
      description: "Predict your puppy's adult weight based on current age and breed.",
      icon: "chart",
    },
    {
      name: "Calorie Calculator",
      url: "/dog/calorie-calculator/",
      description: "Determine the right daily calorie intake for your puppy's optimal growth.",
      icon: "food",
    },
  ]}
/>
```

### 9. Medical Disclaimer

```tsx
<MedicalDisclaimer
  variant="general"
  message="This checklist provides general reference information only and does not constitute veterinary advice. Individual puppies may have unique health needs. Always consult a licensed veterinarian for personalized care recommendations."
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
          "headline": "New Puppy Checklist: Everything You Need Before Day One",
          "description": "Complete checklist for new puppy owners: supplies, vet visits, timeline, costs, and common mistakes.",
          "author": { "@type": "Organization", "name": "petsMetrics" },
          "datePublished": "2026-07-03",
          "dateModified": "2026-07-03",
        },
        {
          "@type": "FAQPage",
          "mainEntity": [/* 与可见 FAQ 内容一致 */]
        },
        {
          "@type": "HowTo",
          "name": "Prepare for Your New Puppy",
          "totalTime": "P1W",
          "supply": [
            { "@type": "HowToSupply", "name": "Crate" },
            { "@type": "HowToSupply", "name": "Dog bed" },
            // ... 所有清单项目
          ],
          "tool": [
            { "@type": "HowToTool", "name": "ID tag" },
            // ... 工具项目
          ],
          "step": [/* Timeline 阶段 */]
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
    title: "New Puppy Checklist: Everything You Need Before Day One | petsMetrics",
    description: "Complete new puppy checklist with 47 items to check. Interactive, printable PDF, cost estimator, timeline, and expert tips. Download free!",
    keywords: "new puppy checklist, puppy preparation, first puppy, puppy essentials, puppy shopping list, new puppy supplies",
    alternates: {
      canonical: "https://petsmetrics.com/en/dog/guide/new-puppy-checklist/",
      languages: {
        "en": "https://petsmetrics.com/en/dog/guide/new-puppy-checklist/",
        "de": "https://petsmetrics.com/de/dog/guide/new-puppy-checklist/",
        // ... 其他语言
      },
    },
    openGraph: {
      title: "New Puppy Checklist: 47 Items to Check",
      description: "Interactive, printable puppy checklist with cost estimator and timeline. Download free PDF!",
      type: "article",
      url: "https://petsmetrics.com/en/dog/guide/new-puppy-checklist/",
      images: ["/og/new-puppy-checklist.png"],
    },
  };
}
```

---

## i18n 翻译规范

在 `messages/en.json` 和 `messages/zh.json` 中添加：

```json
{
  "guide": {
    "newPuppy": {
      "meta": {
        "title": "New Puppy Checklist: Everything You Need Before Day One | petsMetrics",
        "description": "Complete new puppy checklist with 47 items to check. Interactive, printable PDF, cost estimator, timeline, and expert tips."
      },
      "hero": {
        "title": "New Puppy Checklist: Everything You Need Before Day One",
        "subtitle": "From supplies to vet visits, this comprehensive checklist covers everything you need to prepare for your new puppy's arrival.",
        "cta": "Download Free PDF Checklist",
        "stats": {
          "items": "Items to Check",
          "vetVisits": "Vet Visits in First Year",
          "cost": "Avg. First Year Cost",
          "socialization": "Socialization Window Closes"
        }
      },
      "checklist": {
        "beforeArrival": "Before Your Puppy Arrives",
        "first24Hours": "First 24 Hours",
        "week1to2": "Week 1-2: Adjustment",
        "week3to4": "Week 3-4: Socialization Begins",
        "week5to8": "Week 5-8: Critical Window",
        "week9to12": "Week 9-12: Transition",
        "week13to16": "Week 13-16: Adolescence"
      },
      "timeline": {
        "title": "Puppy Development Timeline",
        "week": "Week",
        "vetVisit": "Vet Visit",
        "cost": "Cost"
      },
      "budget": {
        "title": "First Year Cost Estimator",
        "oneTime": "One-Time Costs",
        "recurring": "Recurring Costs (Monthly)",
        "total": "Total",
        "proTip": "Pro Tip"
      },
      "mistakes": {
        "title": "⚠️ Common Mistakes New Puppy Owners Make",
        "whyDangerous": "Why it's dangerous",
        "doInstead": "What to do instead"
      },
      "faq": {
        "title": "Frequently Asked Questions"
      }
    }
  }
}
```

---

## 内容质量要求

### 独特内容（每页必须 ≥ 400 字独特文字）

| 内容区块 | 最低字数 | 要求 |
|---------|:---:|------|
| Checklist Hero | 100 | 含统计数据和成本概览 |
| Interactive Checklist | 500 | 每个清单项含注释放字说明 |
| Timeline Section | 400 | 含阶段任务 + 费用 + CTA |
| Budget Calculator | 300 | 含成本表格 + 省钱技巧 |
| Knowledge Cards | 400 | 每张 80-150 字 |
| Common Mistakes | 400 | 每误区 60-80 字 |
| FAQ Section | 800 | 每条 150-300 字 |
| HowTo 方法论文 | 100 | 含来源引用 |
| **合计** | **≥ 3,000** | **独特内容 ≥ 1,200 字** |

### 权威引用要求（每页至少 2 个）

- AAHA (American Animal Hospital Association): https://www.aaha.org/
- AVSAB (American Veterinary Society of Animal Behavior): https://avsab.org/
- AKC (American Kennel Club): https://www.akc.org/
- AAFP (American Association of Feline Practitioners): https://catvets.com/

### GEO 优化要求

- Checklist 项使用 `<strong>` 包裹关键物品名
- 每个 Timeline 阶段包含"为什么重要"解释
- FAQ 使用 `<details>/<summary>` 而非 useState
- 所有文本必须在 HTML 源码中可见（Server Component）

---

## SpamBrain 安全规则（不可违反）

1. **禁止模板化**：每个页面的清单内容、时间线、预算必须针对该生命阶段定制
2. **禁止复制外部清单**：所有内容必须基于权威来源重新撰写，不得复制其他网站清单
3. **禁止虚假数据**：成本数据必须基于实际市场调研，注明来源
4. **Recommended 维度黑名单**：
   - ❌ 按品种的年龄换算（公式无品种差异）
   - ❌ 按品种的疫苗计划（时间线相同）

---

## 共享组件创建

如果以下组件不存在，请先创建：

```
src/components/shared/
├── ChecklistHero.tsx          // 清单页面头部（含统计和 CTA）
├── InteractiveChecklist.tsx   // 交互式清单（客户端组件）
├── TimelineSection.tsx        // 时间线组件
├── BudgetCalculator.tsx       // 预算表格
├── KnowledgeSection.tsx       // 知识卡片（已存在则复用）
├── CommonMistakes.tsx         // 常见误区组件
├── FAQSection.tsx             // FAQ 区域（已存在则复用）
├── RelatedTools.tsx           // 相关工具链接（已存在则复用）
├── MedicalDisclaimer.tsx      // 医学免责声明（已存在则复用）
└── HowToSchema.tsx            // HowTo JSON-LD 结构化数据
```

## 交互组件规范

### InteractiveChecklist（交互式清单）

```tsx
'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

interface CheckItem {
  id: string;
  label: string;
  required: boolean;
  note?: string;
}

interface ChecklistSection {
  id: string;
  title: string;
  description: string;
  items: CheckItem[];
}

interface InteractiveChecklistProps {
  sections: ChecklistSection[];
  storageKey: string;
  showProgressBar?: boolean;
  allowPrint?: boolean;
  allowPDFDownload?: boolean;
}

export default function InteractiveChecklist({
  sections,
  storageKey,
  showProgressBar = true,
  allowPrint = true,
  allowPDFDownload = true,
}: InteractiveChecklistProps) {
  const t = useTranslations('guide.newPuppy.checklist');
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  
  // 从 localStorage 加载进度
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setCheckedItems(JSON.parse(saved));
    }
  }, [storageKey]);
  
  // 保存进度到 localStorage
  useEffect(() => {
    if (Object.keys(checkedItems).length > 0) {
      localStorage.setItem(storageKey, JSON.stringify(checkedItems));
    }
  }, [checkedItems, storageKey]);
  
  const toggleItem = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };
  
  const resetAll = () => {
    setCheckedItems({});
    localStorage.removeItem(storageKey);
  };
  
  const totalItems = sections.flatMap(s => s.items).length;
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const progress = totalItems > 0 ? Math.round((checkedCount / totalItems) * 100) : 0;
  
  return (
    <div className="interactive-checklist">
      {showProgressBar && (
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
          <span className="progress-text">{checkedCount}/{totalItems} completed ({progress}%)</span>
        </div>
      )}
      
      {sections.map(section => (
        <div key={section.id} className="checklist-section">
          <h3>{section.title}</h3>
          <p>{section.description}</p>
          
          <ul className="checklist">
            {section.items.map(item => (
              <li key={item.id}>
                <label className="checklist-item">
                  <input
                    type="checkbox"
                    checked={checkedItems[item.id] || false}
                    onChange={() => toggleItem(item.id)}
                  />
                  <span className={checkedItems[item.id] ? 'checked' : ''}>
                    {item.label}
                    {item.required && <span className="required">*</span>}
                  </span>
                  {item.note && <span className="note">{item.note}</span>}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
      
      <div className="checklist-actions">
        <button onClick={resetAll} className="btn-secondary">
          {t('reset')}
        </button>
        {allowPrint && (
          <button onClick={() => window.print()} className="btn-secondary">
            {t('print')}
          </button>
        )}
        {allowPDFDownload && (
          <button onClick={() => {/* PDF generation logic */}} className="btn-primary">
            {t('downloadPdf')}
          </button>
        )}
      </div>
    </div>
  );
}
```

```ts
export async function generateMetadata({ params: { locale } }): Promise<Metadata> {
  const t = await getMessages(locale);
  
  return {
    title: t('guide.newPuppy.meta.title'),
    description: t('guide.newPuppy.meta.description'),
    keywords: t('guide.newPuppy.meta.keywords', { default: 'new puppy checklist, puppy preparation, first dog, puppy essentials' }),
    alternates: {
      canonical: 'https://petsmetrics.com/en/dog/guide/new-puppy-checklist/',
      languages: {
        'en': 'https://petsmetrics.com/en/dog/guide/new-puppy-checklist/',
        'de': 'https://petsmetrics.com/de/dog/guide/new-puppy-checklist/',
      },
    },
    openGraph: {
      title: t('guide.newPuppy.hero.title'),
      description: t('guide.newPuppy.hero.subtitle'),
      type: 'article',
      url: 'https://petsmetrics.com/en/dog/guide/new-puppy-checklist/',
      images: ['/og/new-puppy-checklist.png'],
    },
  };
}
```

---

## 额外功能需求

### 3. PDF 下载功能

| 功能 | 实现方式 |
|------|---------|
| 姓名栏/宠物名称 | PDF 表单字段 |
| 日期 | 自动生成 |
| 每个清单项 | 带复选框的项 |
| 兽医信息 | 可填写区域 |
| 紧急联系人 | 可填写区域 |

**实现思路**：可使用浏览器 `window.print()` 配合 print.css 实现

### 4. 清单打印友好样式

```css
/* 添加到 globals.css 或专用 print.css */
@media print {
  .no-print { display: none !important; }
  .interactive-checklist { background: white; }
  .checklist-breaking { page-break-inside: avoid; }
  body { font-size: 12pt; }
}
```

---

## Checklist 数据

### 页 1: New Puppy Checklist（幼犬清单）

**Before Arrival (13 items)**:
1. [ ] Crate (size: adult-sized with divider)
2. [ ] Dog bed (machine washable)
3. [ ] Stainless steel food bowls (2)
4. [ ] Stainless steel water bowl (1)
5. [ ] Puppy food (same brand as breeder/shelter initially)
6. [ ] Adjustable puppy collar with ID tag
7. [ ] 6-foot leash (not retractable)
8. [ ] Puppy pee pads
9. [ ] Enzymatic cleaner (Nature's Miracle)
10. [ ] Chew toys (Kong, Nylabone, rope)
11. [ ] Baby gates (for area restriction)
12. [ ] Puppy-safe chew deterrent spray
13. [ ] First aid kit (vet wrap, gauze, antiseptic)

**First 24 Hours (7 items)**:
1. [ ] Complete health check-up at vet
2. [ ] Obtain vaccination records from breeder/shelter
3. [ ] Confirm deworming schedule
4. [ ] Verify microchip registration
5. [ ] Establish potty routine (out every 1-2 hours)
6. [ ] Introduce crate as positive space
7. [ ] Set up sleeping area near your bed

**Week 1-2: Adjustment (8 items)**:
1. [ ] Vet visit for health baseline
2. [ ] Establish feeding schedule (3-4 meals/day)
3. [ ] Begin crate training (15min sessions)
4. [ ] Start potty training
5. [ ] Limit visitors (reduce stress)
6. [ ] Handle paws, ears, mouth daily
7. [ ] Clicker training introduction
8. [ ] Begin 'name recognition' training

**Week 3-4: Socialization Begins (6 items)**:
1. [ ] Meet vaccinated, friendly dogs
2. [ ] Introduce to new surfaces (grass, tile, gravel)
3. [ ] Desensitize to vacuum, doorbell, thunder
4. [ ] Handle paws/ears/mouth daily
5. [ ] Begin 'sit' command training
6. [ ] Introduce tooth brushing

**Week 5-8: Critical Socialization Window (6 items)**:
1. [ ] Meet 100 different people (varied ages, appearances)
2. [ ] Visit 20+ new locations (pet-friendly stores)
3. [ ] Ride in car (short trips)
4. [ ] Experience grooming tools (brush, nail clippers)
5. [ ] Begin 'come' and 'stay' commands
6. [ ] Puppy socialization class enrollment

**Week 9-12: Adolescent Transition (5 items)**:
1. [ ] Switch to 2 meals/day
2. [ ] Begin leash walking training
3. [ ] Spay/neuter discussion with vet
4. [ ] Teeth brushing daily routine
5. [ ] Increase exercise gradually

**Week 13-16: Adolescent Challenges (4 items)**:
1. [ ] Expect fear period (normal behavior)
2. [ ] Continue consistent training
3. [ ] Complete vaccination series
4. [ ] Begin off-leash training in safe areas

### 页 2: Senior Dog Care Checklist（老年犬清单）

**Health Monitoring (10 items)**:
1. [ ] Bi-annual vet exams (instead of annual)
2. [ ] Senior blood panel (CBC, chemistry, thyroid)
3. [ ] Urinalysis (kidney function, diabetes screening)
4. [ ] Blood pressure monitoring
5. [ ] Eye exam (cataracts, nuclear sclerosis)
6. [ ] Dental cleaning (if not done in 12 months)
7. [ ] Joint mobility assessment
8. [ ] Weight tracking (monthly weigh-ins)
9. [ ] Cognitive function screening (CCD symptoms)
10. [ ] Pain assessment (osteoarthritis signs)

**Daily Care (7 items)**:
1. [ ] Senior-formula diet (lower fat, higher fiber)
2. [ ] Joint supplements (glucosamine, chondroitin, omega-3)
3. [ ] Moderate exercise (short, frequent walks)
4. [ ] Consistent sleep schedule
5. [ ] Dental care (brushing or dental chews)
6. [ ] Mental stimulation (puzzle toys, nose work)
7. [ ] Temperature comfort (orthopedic bed, warmth)

**Home Modifications (6 items)**:
1. [ ] Non-slip rugs/mats on slippery floors
2. [ ] Ramps or steps for furniture/car access
3. [ ] Raised food/water bowls (reduce neck strain)
4. [ ] Night lights (for vision impairment)
5. [ ] Easy outdoor access (doggy door or frequent trips)
6. [ ] Orthopedic dog bed (memory foam)

**Medication & Supplements (5 items)**:
1. [ ] Monthly flea/tick/heartworm prevention
2. [ ] Joint supplement (Dasuquin, Cosequin)
3. [ ] Omega-3 fatty fish oil
4. [ ] Probiotic (digestive health)
5. [ ] Any prescribed medications (Pain, CCD, etc.)

**Quality of Life Assessment (4 items)**:
1. [ ] Can dog eat, drink, breathe comfortably?
2. [ ] Can dog move around without severe pain?
3. [ ] Does dog still enjoy favorite activities?
4. [ ] Is dog's good days > bad days?

### 页 5: New Kitten Checklist（幼猫清单）

**Before Arrival (12 items)**:
1. [ ] Litter box (1 per cat +1, so 2 for 1 kitten)
2. [ ] Litter (unscented, clumping)
3. [ ] Litter mat
4. [ ] Food bowls (wide, shallow — whisker friendly)
5. [ ] Water bowl or fountain
6. [ ] Kitten food (wet + dry)
7. [ ] scratching post (tall, sturdy sisal)
8. [ ] Cat tree or perch
9. [ ] Carrier (hard-sided for car travel)
10. [ ] Nail clippers (cat-specific)
11. [ ] Brush (breed-dependent)
12. [ ] Toys (wand toys, balls, crinkle toys)

**First 24 Hours (6 items)**:
1. [ ] Kitten-proof one room (safe room)
2. [ ] Show location of litter box, food, water
3. [ ] Minimal handling for first few hours
4. [ ] Vet appointment scheduling
5. [ ] Introductions to children/pets (supervised)
6. [ ] Let kitten explore at own pace

**Week 1-2: Adjustment (7 items)**:
1. [ ] Vet visit within 48 hours
2. [ ] FIV/FeLV test
3. [ ] Fecal parasite test
4. [ ] Begin handling exercises (paws, mouth, ears)
5. [ ] Establish feeding schedule (4 meals/day initially)
6. [ ] Litter box training (usually instinctive)
7. [ ] Safe room introduction complete

**Week 3-4: Socialization (5 items)**:
1. [ ] FVRCP vaccine #1
2. [ ] Deworming
3. [ ] Meet family members (one at a time)
4. [ ] Introduction to gentle dogs (if applicable)
5. [ ] Gentle brushing routine

**Week 5-8: Active Socialization (6 items)**:
1. [ ] FVRCP vaccine #2
2. [ ] FIV vaccine series (if outdoor access planned)
3. [ ] Leash training introduction
4. [ ] Carrier practice (positive associations)
5. [ ] Nail trimming routine
6. [ ] Play sessions (hunting sequence toys)

**Week 9-12: Independence (5 items)**:
1. [ ] FVRCP vaccine #3
2. [ ] Rabies vaccine (per local law)
3. [ ] Spay/neuter discussion (typically 4-6 months)
4. [ ] Transition to 3 meals/day
5. [ ] Microchip confirmation

**Week 13-16: Adolescent (4 items)**:
1. [ ] Spay/neuter (typically 4-6 months)
2. [ ] Transition to 2 meals/day
3. [ ] Adult food transition begins (around 10-12 months)
4. [ ] Dental care introduction

---

## 其他 4 页的 Checklist 数据来源

### Adopting Rescue Dog（领养救助犬）
使用 3-3-3 规则时间线 + 行为评估 + 家庭适应 + 兽医急救检查 + 营养恢复计划

### Puppy Development Stages（幼犬发育阶段）
按周列出里程碑：
- Week 1-2: 感官发育 (eyes/ears open, first steps)
- Week 3-4: 社交开始 (play biting, tail wagging)
- Week 5-6: 恐惧期#1 (fear period — normal behavior)
- Week 7-8: 记忆/学习期 (name recognition, litter training)
- Week 9-12: 社交高峰期 (bonding, bite inhibition)
- Week 13-16: 等级建立期 (hierarchy, independence)
- Month 4-6: 青春期开始 (hormones, boundary testing)
- Month 6-9: 深度青春期 (mounting, marking, selective hearing)
- Month 9-12: 接近成年 (maturity, final adult size)

### Senior Cat Care（老年猫护理）
参考 AAFP Feline Senior Care Guidelines 2021：
- Bi-annual exams
- Blood pressure monitoring (kidney disease, hyperthyroidism, hypertension triad)
- Senior blood panel + SDMA (kidney function)
- Environmental modification (litter box accessibility, warmth, low-entry)
- Nutrition transition (higher protein, lower phosphorus, kidney support if needed)

---

## 验收标准

- [ ] 6 个页面全部创建并可正常构建
- [ ] 每个页面有独立的 title、description、keywords
- [ ] 有 Checklist Hero（含统计数据和成本概览）
- [ ] 有 Interactive Checklist（localStorage 持久化、进度条、打印按钮）
- [ ] 有 Timeline Section（阶段任务 + 费用 + CTA）
- [ ] 有 Budget Calculator（成本表格 + 省钱技巧）
- [ ] 有 Knowledge Cards（4 张，每张 80-150 字）
- [ ] 有 Common Mistakes Section（页 1-2）或等效内容
- [ ] 有 FAQ Section（5-8 条，使用 `<details>`）
- [ ] 有 JSON-LD（Article + FAQPage + HowTo）
- [ ] 所有页面文本在 HTML 源码中可见
- [ ] 每页独特内容 ≥ 400 字
- [ ] 每页权威引用 ≥ 2 个
- [ ] 构建成功：`pnpm build` 无错误
- [ ] i18n 翻译完整（en + zh 至少）
- [ ] 交互功能正常工作（清单勾选、进度保存）

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
9. **验证交互功能**：清单勾选、进度保存、打印功能

---

## 执行完成后输出

1. 创建的文件清单（6 个 page.tsx + 共享组件）
2. 每个页面的字数统计
3. 构建结果
4. JSON-LD 验证结果
5. 交互功能测试结果
6. 任何遇到的问题或需要用户决策的事项
