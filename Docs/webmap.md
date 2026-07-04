# 站点地图 (Webmap)

> 自动生成于: 2026-07-04
> 构建工具: Next.js SSG + next-intl

---

## 1. 统计概览

| 指标 | 数值 | 说明 |
|------|------|------|
| 物理页面文件数 | 67 | `src/app/[locale]/**/page.tsx` 中实际存在的文件（含根 page.tsx） |
| Hub 枢纽页数 | 4 | dog, cat, shared, profile |
| 工具/指南/紧急/对比页面数 | 58 | `getAllToolRoutes()` 注册的路由 |
| 信任/legal 页数 | 3 | about, privacy, terms |
| 支持语种数 | 12 | en, zh, fr, de, ja, ko, es, pt, nl, ar, ru, hi |
| EU 旅行落地页数（每语种） | 41 | `getAllEUTravelRoutes()` 动态生成 |
| 每 locale sitemap 条目数 | 90 | 1首页 + 4 hub + 3 trust + 58工具 + 41 EU |
| **全站点 sitemap 总条目数** | **1,080** | 90 × 12 种语言 |
| routes.ts 已注册工具路由 | 58 | 含 guide/emergency/compare（不含 EU 配对） |
| EU 旅行路由（动态） | 41 | 已通过 `[...slug]/page.tsx` 创建物理路由 |

## 2. 语言覆盖矩阵

所有 12 种语言均享有完整页面覆盖（共享同一套 `[locale]` 路由架构）。

| 语言 | 代码 | sitemap 条目数 | 状态 |
|------|------|---------------|------|
| English | en | 90 | ✅ |
| 中文 | zh | 90 | ✅ |
| Français | fr | 90 | ✅ |
| Deutsch | de | 90 | ✅ |
| 日本語 | ja | 90 | ✅ |
| 한국어 | ko | 90 | ✅ |
| Español | es | 90 | ✅ |
| Português | pt | 90 | ✅ |
| Nederlands | nl | 90 | ✅ |
| العربية | ar | 90 | ✅ |
| Русский | ru | 90 | ✅ |
| हिन्दी | hi | 90 | ✅ |

## 3. 页面清单

### 3.1 首页

| 路由 | 文件路径 | 支持语言 | 优先级 |
|------|---------|---------|--------|
| `/[locale]/` | `src/app/[locale]/page.tsx` | 全部 12 种 | P0 |

### 3.2 Hub 枢纽页

| 路由 | 文件路径 | 支持语言 | 优先级 |
|------|---------|---------|--------|
| `/[locale]/dog/` | `src/app/[locale]/dog/page.tsx` | 全部 12 种 | P0 |
| `/[locale]/cat/` | `src/app/[locale]/cat/page.tsx` | 全部 12 种 | P0 |
| `/[locale]/shared/` | `src/app/[locale]/shared/page.tsx` | 全部 12 种 | P0 |
| `/[locale]/profile/` | `src/app/[locale]/profile/page.tsx` | 全部 12 种 | P1 |

### 3.3 Dog 工具页面

| 路由模式 | 文件路径 | 语言 | 状态 |
|---------|---------|------|------|
| `/[locale]/dog/age-calculator/` | `src/app/[locale]/dog/age-calculator/page.tsx` | 全部 | ✅ |
| `/[locale]/dog/calorie-calculator/` | `src/app/[locale]/dog/calorie-calculator/page.tsx` | 全部 | ✅ |
| `/[locale]/dog/puppy-growth-predictor/` | `src/app/[locale]/dog/puppy-growth-predictor/page.tsx` | 全部 | ✅ |
| `/[locale]/dog/gestation-calculator/` | `src/app/[locale]/dog/gestation-calculator/page.tsx` | 全部 | ✅ |
| `/[locale]/dog/vaccination-schedule/` | `src/app/[locale]/dog/vaccination-schedule/page.tsx` | 全部 | ✅ |

### 3.4 Cat 工具页面

| 路由模式 | 文件路径 | 语言 | 状态 |
|---------|---------|------|------|
| `/[locale]/cat/age-calculator/` | `src/app/[locale]/cat/age-calculator/page.tsx` | 全部 | ✅ |
| `/[locale]/cat/bcs-weight-tracker/` | `src/app/[locale]/cat/bcs-weight-tracker/page.tsx` | 全部 | ✅ |
| `/[locale]/cat/hydration-calculator/` | `src/app/[locale]/cat/hydration-calculator/page.tsx` | 全部 | ✅ |
| `/[locale]/cat/gestation-calculator/` | `src/app/[locale]/cat/gestation-calculator/page.tsx` | 全部 | ✅ |
| `/[locale]/cat/vaccination-schedule/` | `src/app/[locale]/cat/vaccination-schedule/page.tsx` | 全部 | ✅ |

### 3.5 共享工具页面

| 路由模式 | 文件路径 | 语言 | 状态 |
|---------|---------|------|------|
| `/[locale]/shared/toxic-checker/` | `src/app/[locale]/shared/toxic-checker/page.tsx` | 全部 | ✅ |
| `/[locale]/shared/eu-pet-travel-checker/` | `src/app/[locale]/shared/eu-pet-travel-checker/page.tsx` | 全部 | ✅ |
| `/[locale]/shared/barf-calculator/` | `src/app/[locale]/shared/barf-calculator/page.tsx` | 全部 | ✅ |
| `/[locale]/shared/pet-insurance-estimator/` | `src/app/[locale]/shared/pet-insurance-estimator/page.tsx` | 全部 | ✅ |

### 3.6 信任 / Legal 页面

| 路由模式 | 文件路径 | 语言 | 优先级 |
|---------|---------|------|--------|
| `/[locale]/about/` | `src/app/[locale]/about/page.tsx` | 全部 | P2 |
| `/[locale]/privacy/` | `src/app/[locale]/privacy/page.tsx` | 全部 | P3 |
| `/[locale]/terms/` | `src/app/[locale]/terms/page.tsx` | 全部 | P3 |

### 3.7 Dog 指南页面 (Guide)

| 路由模式 | 文件路径 | 语言 | 状态 |
|---------|---------|------|------|
| `/[locale]/dog/guide/new-puppy-checklist/` | `src/app/[locale]/dog/guide/new-puppy-checklist/page.tsx` | 全部 | ✅ |
| `/[locale]/dog/guide/puppy-development-stages/` | `src/app/[locale]/dog/guide/puppy-development-stages/page.tsx` | 全部 | ✅ |
| `/[locale]/dog/guide/senior-dog-care/` | `src/app/[locale]/dog/guide/senior-dog-care/page.tsx` | 全部 | ✅ |
| `/[locale]/dog/guide/adopting-rescue-dog/` | `src/app/[locale]/dog/guide/adopting-rescue-dog/page.tsx` | 全部 | ✅ |

### 3.8 Cat 指南页面 (Guide)

| 路由模式 | 文件路径 | 语言 | 状态 |
|---------|---------|------|------|
| `/[locale]/cat/guide/new-kitten-checklist/` | `src/app/[locale]/cat/guide/new-kitten-checklist/page.tsx` | 全部 | ✅ |
| `/[locale]/cat/guide/senior-cat-care/` | `src/app/[locale]/cat/guide/senior-cat-care/page.tsx` | 全部 | ✅ |

### 3.9 Dog 紧急页面 (Emergency)

| 路由模式 | 文件路径 | 语言 | 状态 |
|---------|---------|------|------|
| `/[locale]/dog/emergency/ate-chocolate/` | `src/app/[locale]/dog/emergency/ate-chocolate/page.tsx` | 全部 | ✅ |
| `/[locale]/dog/emergency/ate-grapes/` | `src/app/[locale]/dog/emergency/ate-grapes/page.tsx` | 全部 | ✅ |
| `/[locale]/dog/emergency/ate-xylitol/` | `src/app/[locale]/dog/emergency/ate-xylitol/page.tsx` | 全部 | ✅ |
| `/[locale]/dog/emergency/ate-onion/` | `src/app/[locale]/dog/emergency/ate-onion/page.tsx` | 全部 | ✅ |
| `/[locale]/dog/emergency/ate-sock/` | `src/app/[locale]/dog/emergency/ate-sock/page.tsx` | 全部 | ✅ |
| `/[locale]/dog/emergency/ate-antifreeze/` | `src/app/[locale]/dog/emergency/ate-antifreeze/page.tsx` | 全部 | ✅ |
| `/[locale]/dog/emergency/ate-xylitol-gum/` | `src/app/[locale]/dog/emergency/ate-xylitol-gum/page.tsx` | 全部 | ✅ |
| `/[locale]/dog/emergency/ate-marijuana/` | `src/app/[locale]/dog/emergency/ate-marijuana/page.tsx` | 全部 | ✅ |
| `/[locale]/dog/emergency/ate-rodenticide/` | `src/app/[locale]/dog/emergency/ate-rodenticide/page.tsx` | 全部 | ✅ |
| `/[locale]/dog/emergency/ate-alcohol/` | `src/app/[locale]/dog/emergency/ate-alcohol/page.tsx` | 全部 | ✅ |
| `/[locale]/dog/emergency/ate-avocado/` | `src/app/[locale]/dog/emergency/ate-avocado/page.tsx` | 全部 | ✅ |
| `/[locale]/dog/emergency/ate-caffeine/` | `src/app/[locale]/dog/emergency/ate-caffeine/page.tsx` | 全部 | ✅ |
| `/[locale]/dog/emergency/ate-macadamia-nuts/` | `src/app/[locale]/dog/emergency/ate-macadamia-nuts/page.tsx` | 全部 | ✅ |
| `/[locale]/dog/emergency/ate-medication/` | `src/app/[locale]/dog/emergency/ate-medication/page.tsx` | 全部 | ✅ |
| `/[locale]/dog/emergency/ate-plastic/` | `src/app/[locale]/dog/emergency/ate-plastic/page.tsx` | 全部 | ✅ |
| `/[locale]/dog/emergency/ate-cooked-bones/` | `src/app/[locale]/dog/emergency/ate-cooked-bones/page.tsx` | 全部 | ✅ |
| `/[locale]/dog/emergency/ate-mushrooms/` | `src/app/[locale]/dog/emergency/ate-mushrooms/page.tsx` | 全部 | ✅ |
| `/[locale]/dog/emergency/ate-tobacco/` | `src/app/[locale]/dog/emergency/ate-tobacco/page.tsx` | 全部 | ✅ |

### 3.10 Cat 紧急页面 (Emergency)

| 路由模式 | 文件路径 | 语言 | 状态 |
|---------|---------|------|------|
| `/[locale]/cat/emergency/ate-lily/` | `src/app/[locale]/cat/emergency/ate-lily/page.tsx` | 全部 | ✅ |
| `/[locale]/cat/emergency/ate-string/` | `src/app/[locale]/cat/emergency/ate-string/page.tsx` | 全部 | ✅ |
| `/[locale]/cat/emergency/ate-fishing-line/` | `src/app/[locale]/cat/emergency/ate-fishing-line/page.tsx` | 全部 | ✅ |
| `/[locale]/cat/emergency/ate-essential-oils/` | `src/app/[locale]/cat/emergency/ate-essential-oils/page.tsx` | 全部 | ✅ |
| `/[locale]/cat/emergency/ate-garlic/` | `src/app/[locale]/cat/emergency/ate-garlic/page.tsx` | 全部 | ✅ |
| `/[locale]/cat/emergency/ate-onion/` | `src/app/[locale]/cat/emergency/ate-onion/page.tsx` | 全部 | ✅ |
| `/[locale]/cat/emergency/ate-chocolate/` | `src/app/[locale]/cat/emergency/ate-chocolate/page.tsx` | 全部 | ✅ |

### 3.11 Dog 对比页面 (Compare)

| 路由模式 | 文件路径 | 语言 | 状态 |
|---------|---------|------|------|
| `/[locale]/dog/compare/dry-food-vs-wet-food/` | `src/app/[locale]/dog/compare/dry-food-vs-wet-food/page.tsx` | 全部 | ✅ |
| `/[locale]/dog/compare/raw-diet-vs-kibble/` | `src/app/[locale]/dog/compare/raw-diet-vs-kibble/page.tsx` | 全部 | ✅ |
| `/[locale]/dog/compare/spayed-vs-unspayed/` | `src/app/[locale]/dog/compare/spayed-vs-unspayed/page.tsx` | 全部 | ✅ |
| `/[locale]/dog/compare/grain-free-vs-grain-inclusive/` | `src/app/[locale]/dog/compare/grain-free-vs-grain-inclusive/page.tsx` | 全部 | ✅ |
| `/[locale]/dog/compare/canned-vs-frozen-food/` | `src/app/[locale]/dog/compare/canned-vs-frozen-food/page.tsx` | 全部 | ✅ |

### 3.12 Cat 对比页面 (Compare)

| 路由模式 | 文件路径 | 语言 | 状态 |
|---------|---------|------|------|
| `/[locale]/cat/compare/indoor-vs-outdoor/` | `src/app/[locale]/cat/compare/indoor-vs-outdoor/page.tsx` | 全部 | ✅ |
| `/[locale]/cat/compare/wet-food-vs-dry-food/` | `src/app/[locale]/cat/compare/wet-food-vs-dry-food/page.tsx` | 全部 | ✅ |
| `/[locale]/cat/compare/declawing-vs-scratching-post/` | `src/app/[locale]/cat/compare/declawing-vs-scratching-post/page.tsx` | 全部 | ✅ |

### 3.13 Shared 对比页面 (Compare)

| 路由模式 | 文件路径 | 语言 | 状态 |
|---------|---------|------|------|
| `/[locale]/shared/compare/dog-years-vs-cat-years/` | `src/app/[locale]/shared/compare/dog-years-vs-cat-years/page.tsx` | 全部 | ✅ |
| `/[locale]/shared/compare/pet-insurance-vs-savings/` | `src/app/[locale]/shared/compare/pet-insurance-vs-savings/page.tsx` | 全部 | ✅ |
| `/[locale]/shared/compare/microchip-vs-tattoo/` | `src/app/[locale]/shared/compare/microchip-vs-tattoo/page.tsx` | 全部 | ✅ |
| `/[locale]/shared/compare/adopt-vs-buy/` | `src/app/[locale]/shared/compare/adopt-vs-buy/page.tsx` | 全部 | ✅ |

### 3.14 动态生成页面 — EU 旅行落地页

| 数据源 | 函数 | 每语种数量 | 语言 |
|-------|------|----------|------|
| EU_COUNTRY_CODES (33 个国家) + NON_EU_ORIGINS (3 个) | `getAllEUTravelRoutes()` in `routes.ts` | 41 | 全部 12 种 |

路由模式：`/[locale]/shared/eu-pet-travel/[origin]-to-[destination]/`

示例：
- `/en/shared/eu-pet-travel/us-to-gb/`
- `/en/shared/eu-pet-travel/gb-to-fr/`
- `/en/shared/eu-pet-travel/fi-to-se/`

> 计算方式：
> - 3 个非 EU 来源 (US/CA/AU) × 6 个热门目的地 = 18 条
> - GB ↔ 5 个跨海峡国家 × 2 方向 = 10 条
> - 北欧特殊区域 (FI/IE/MT/NO) 与邻国配对 = 约 10 条
> - 剩余 EU 国家配对 = 约 3 条
> - **合计 ≈ 41 条**
>
> 状态：⚠️ `sitemap.ts` 已注册 41 条动态路由，但当前代码库中**不存在**物理 `[...slug]/page.tsx` 文件。

## 4. 文件索引

### 4.1 页面文件完整列表 (67 个)

#### 根页面
| 文件路径 | 路由 |
|---------|------|
| `src/app/page.tsx | `/` (根页面，重定向) |
| `src/app/[locale]/page.tsx` | `/[locale]/` |

#### Hub 页面
| 文件路径 | 路由 |
|---------|------|
| `src/app/[locale]/dog/page.tsx` | `/[locale]/dog/` |
| `src/app/[locale]/cat/page.tsx` | `/[locale]/cat/` |
| `src/app/[locale]/shared/page.tsx` | `/[locale]/shared/` |
| `src/app/[locale]/profile/page.tsx` | `/[locale]/profile/` |

#### Dog 工具页面
| 文件路径 | 路由 |
|---------|------|
| `src/app/[locale]/dog/age-calculator/page.tsx` | `/[locale]/dog/age-calculator/` |
| `src/app/[locale]/dog/calorie-calculator/page.tsx` | `/[locale]/dog/calorie-calculator/` |
| `src/app/[locale]/dog/puppy-growth-predictor/page.tsx` | `/[locale]/dog/puppy-growth-predictor/` |
| `src/app/[locale]/dog/gestation-calculator/page.tsx` | `/[locale]/dog/gestation-calculator/` |
| `src/app/[locale]/dog/vaccination-schedule/page.tsx` | `/[locale]/dog/vaccination-schedule/` |

#### Cat 工具页面
| 文件路径 | 路由 |
|---------|------|
| `src/app/[locale]/cat/age-calculator/page.tsx` | `/[locale]/cat/age-calculator/` |
| `src/app/[locale]/cat/bcs-weight-tracker/page.tsx` | `/[locale]/cat/bcs-weight-tracker/` |
| `src/app/[locale]/cat/hydration-calculator/page.tsx` | `/[locale]/cat/hydration-calculator/` |
| `src/app/[locale]/cat/gestation-calculator/page.tsx` | `/[locale]/cat/gestation-calculator/` |
| `src/app/[locale]/cat/vaccination-schedule/page.tsx` | `/[locale]/cat/vaccination-schedule/` |

#### Shared 工具页面
| 文件路径 | 路由 |
|---------|------|
| `src/app/[locale]/shared/toxic-checker/page.tsx` | `/[locale]/shared/toxic-checker/` |
| `src/app/[locale]/shared/eu-pet-travel-checker/page.tsx` | `/[locale]/shared/eu-pet-travel-checker/` |
| `src/app/[locale]/shared/barf-calculator/page.tsx` | `/[locale]/shared/barf-calculator/` |
| `src/app/[locale]/shared/pet-insurance-estimator/page.tsx` | `/[locale]/shared/pet-insurance-estimator/` |

#### Legal 页面
| 文件路径 | 路由 |
|---------|------|
| `src/app/[locale]/about/page.tsx` | `/[locale]/about/` |
| `src/app/[locale]/privacy/page.tsx` | `/[locale]/privacy/` |
| `src/app/[locale]/terms/page.tsx` | `/[locale]/terms/` |

#### Dog 指南页面
| 文件路径 | 路由 |
|---------|------|
| `src/app/[locale]/dog/guide/new-puppy-checklist/page.tsx` | `/[locale]/dog/guide/new-puppy-checklist/` |
| `src/app/[locale]/dog/guide/puppy-development-stages/page.tsx` | `/[locale]/dog/guide/puppy-development-stages/` |
| `src/app/[locale]/dog/guide/senior-dog-care/page.tsx` | `/[locale]/dog/guide/senior-dog-care/` |
| `src/app/[locale]/dog/guide/adopting-rescue-dog/page.tsx` | `/[locale]/dog/guide/adopting-rescue-dog/` |

#### Cat 指南页面
| 文件路径 | 路由 |
|---------|------|
| `src/app/[locale]/cat/guide/new-kitten-checklist/page.tsx` | `/[locale]/cat/guide/new-kitten-checklist/` |
| `src/app/[locale]/cat/guide/senior-cat-care/page.tsx` | `/[locale]/cat/guide/senior-cat-care/` |

#### Dog 紧急页面
| 文件路径 | 路由 |
|---------|------|
| `src/app/[locale]/dog/emergency/ate-chocolate/page.tsx` | `/[locale]/dog/emergency/ate-chocolate/` |
| `src/app/[locale]/dog/emergency/ate-grapes/page.tsx` | `/[locale]/dog/emergency/ate-grapes/` |
| `src/app/[locale]/dog/emergency/ate-xylitol/page.tsx` | `/[locale]/dog/emergency/ate-xylitol/` |
| `src/app/[locale]/dog/emergency/ate-onion/page.tsx` | `/[locale]/dog/emergency/ate-onion/` |
| `src/app/[locale]/dog/emergency/ate-sock/page.tsx` | `/[locale]/dog/emergency/ate-sock/` |
| `src/app/[locale]/dog/emergency/ate-antifreeze/page.tsx` | `/[locale]/dog/emergency/ate-antifreeze/` |
| `src/app/[locale]/dog/emergency/ate-xylitol-gum/page.tsx` | `/[locale]/dog/emergency/ate-xylitol-gum/` |
| `src/app/[locale]/dog/emergency/ate-marijuana/page.tsx` | `/[locale]/dog/emergency/ate-marijuana/` |
| `src/app/[locale]/dog/emergency/ate-rodenticide/page.tsx` | `/[locale]/dog/emergency/ate-rodenticide/` |
| `src/app/[locale]/dog/emergency/ate-alcohol/page.tsx` | `/[locale]/dog/emergency/ate-alcohol/` |
| `src/app/[locale]/dog/emergency/ate-avocado/page.tsx` | `/[locale]/dog/emergency/ate-avocado/` |
| `src/app/[locale]/dog/emergency/ate-caffeine/page.tsx` | `/[locale]/dog/emergency/ate-caffeine/` |
| `src/app/[locale]/dog/emergency/ate-macadamia-nuts/page.tsx` | `/[locale]/dog/emergency/ate-macadamia-nuts/` |
| `src/app/[locale]/dog/emergency/ate-medication/page.tsx` | `/[locale]/dog/emergency/ate-medication/` |
| `src/app/[locale]/dog/emergency/ate-plastic/page.tsx` | `/[locale]/dog/emergency/ate-plastic/` |
| `src/app/[locale]/dog/emergency/ate-cooked-bones/page.tsx` | `/[locale]/dog/emergency/ate-cooked-bones/` |
| `src/app/[locale]/dog/emergency/ate-mushrooms/page.tsx` | `/[locale]/dog/emergency/ate-mushrooms/` |
| `src/app/[locale]/dog/emergency/ate-tobacco/page.tsx` | `/[locale]/dog/emergency/ate-tobacco/` |

#### Cat 紧急页面
| 文件路径 | 路由 |
|---------|------|
| `src/app/[locale]/cat/emergency/ate-lily/page.tsx` | `/[locale]/cat/emergency/ate-lily/` |
| `src/app/[locale]/cat/emergency/ate-string/page.tsx` | `/[locale]/cat/emergency/ate-string/` |
| `src/app/[locale]/cat/emergency/ate-fishing-line/page.tsx` | `/[locale]/cat/emergency/ate-fishing-line/` |
| `src/app/[locale]/cat/emergency/ate-essential-oils/page.tsx` | `/[locale]/cat/emergency/ate-essential-oils/` |
| `src/app/[locale]/cat/emergency/ate-garlic/page.tsx` | `/[locale]/cat/emergency/ate-garlic/` |
| `src/app/[locale]/cat/emergency/ate-onion/page.tsx` | `/[locale]/cat/emergency/ate-onion/` |
| `src/app/[locale]/cat/emergency/ate-chocolate/page.tsx` | `/[locale]/cat/emergency/ate-chocolate/` |

#### Dog 对比页面
| 文件路径 | 路由 |
|---------|------|
| `src/app/[locale]/dog/compare/dry-food-vs-wet-food/page.tsx` | `/[locale]/dog/compare/dry-food-vs-wet-food/` |
| `src/app/[locale]/dog/compare/raw-diet-vs-kibble/page.tsx` | `/[locale]/dog/compare/raw-diet-vs-kibble/` |
| `src/app/[locale]/dog/compare/spayed-vs-unspayed/page.tsx` | `/[locale]/dog/compare/spayed-vs-unspayed/` |
| `src/app/[locale]/dog/compare/grain-free-vs-grain-inclusive/page.tsx` | `/[locale]/dog/compare/grain-free-vs-grain-inclusive/` |
| `src/app/[locale]/dog/compare/canned-vs-frozen-food/page.tsx` | `/[locale]/dog/compare/canned-vs-frozen-food/` |

#### Cat 对比页面
| 文件路径 | 路由 |
|---------|------|
| `src/app/[locale]/cat/compare/indoor-vs-outdoor/page.tsx` | `/[locale]/cat/compare/indoor-vs-outdoor/` |
| `src/app/[locale]/cat/compare/wet-food-vs-dry-food/page.tsx` | `/[locale]/cat/compare/wet-food-vs-dry-food/` |
| `src/app/[locale]/cat/compare/declawing-vs-scratching-post/page.tsx` | `/[locale]/cat/compare/declawing-vs-scratching-post/` |

#### Shared 对比页面
| 文件路径 | 路由 |
|---------|------|
| `src/app/[locale]/shared/compare/dog-years-vs-cat-years/page.tsx` | `/[locale]/shared/compare/dog-years-vs-cat-years/` |
| `src/app/[locale]/shared/compare/pet-insurance-vs-savings/page.tsx` | `/[locale]/shared/compare/pet-insurance-vs-savings/` |
| `src/app/[locale]/shared/compare/microchip-vs-tattoo/page.tsx` | `/[locale]/shared/compare/microchip-vs-tattoo/` |
| `src/app/[locale]/shared/compare/adopt-vs-buy/page.tsx` | `/[locale]/shared/compare/adopt-vs-buy/` |

### 4.2 Widget 组件 (工具核心组件)

| 文件路径 | 用途 |
|---------|------|
| `src/components/dog/DogAgeWidget.tsx` | 犬年龄换算 |
| `src/components/dog/DogCalorieWidget.tsx` | 犬卡路里计算 |
| `src/components/dog/PuppyGrowthWidget.tsx` | 幼犬成长预测 |
| `src/components/dog/PuppyGrowthChart.tsx` | 幼犬成长图表 |
| `src/components/dog/DogGestationWidget.tsx` | 犬妊娠期计算 |
| `src/components/dog/DogVaccinationWidget.tsx` | 犬疫苗接种计划 |
| `src/components/cat/CatAgeWidget.tsx` | 猫年龄换算 |
| `src/components/cat/CatBCSWidget.tsx` | 猫体况评分 |
| `src/components/cat/CatHydrationWidget.tsx` | 猫补水量计算 |
| `src/components/cat/CatGestationWidget.tsx` | 猫妊娠期计算 |
| `src/components/cat/CatVaccinationWidget.tsx` | 猫疫苗接种计划 |
| `src/components/shared/ToxicCheckerWidget.tsx` | 毒性检查器交互 |
| `src/components/shared/EUTravelWidget.tsx` | EU 旅行规则检查器 |
| `src/components/shared/BARFWidget.tsx` | BARF 喂食计算 |
| `src/components/shared/InsuranceWidget.tsx` | 保险估算器 |

### 4.3 内容组件 (新增)

| 文件路径 | 用途 |
|---------|------|
| `src/components/shared/ChecklistHero.tsx` | 清单页 Hero 区域 |
| `src/components/shared/InteractiveChecklist.tsx` | 交互式清单组件 |
| `src/components/shared/TimelineSection.tsx` | 时间轴展示 |
| `src/components/shared/BudgetCalculator.tsx` | 预算计算器 |
| `src/components/shared/KnowledgeCards.tsx` | 知识卡片 |
| `src/components/shared/CommonMistakes.tsx` | 常见错误展示 |
| `src/components/shared/ChecklistFAQ.tsx` | 清单页 FAQ |
| `src/components/shared/ChecklistRelatedTools.tsx` | 关联工具 |
| `src/components/shared/ChecklistDisclaimer.tsx` | 清单页免责声明 |
| `src/components/shared/ComparePage.tsx` | 对比页通用组件 |
| `src/components/shared/DisclaimerSection.tsx` | 免责声明区块 |

### 4.4 Hub 与页面组件

| 文件路径 | 用途 |
|---------|------|
| `src/components/hub/DogHubContent.tsx` | 犬枢纽页内容 |
| `src/components/hub/CatHubContent.tsx` | 猫枢纽页内容 |
| `src/components/hub/HubSearch.tsx` | 枢纽页搜索 |
| `src/components/hub/ProfileBar.tsx` | 枢纽页资料栏 |
| `src/components/home/HeroSection.tsx` | 首页 Hero |
| `src/components/home/FeaturedTool.tsx` | 首页推荐工具 |
| `src/components/home/StatsBar.tsx` | 首页统计数据 |
| `src/components/home/ToolDiscovery.tsx` | 首页工具发现 |
| `src/components/home/ProfileFocusSection.tsx` | 首页资料引导 |
| `src/components/profile/ProfileCard.tsx` | 资料卡片 |
| `src/components/profile/ProfileCreationWizard.tsx` | 资料创建向导 |
| `src/components/profile/ProfilePageContent.tsx` | 资料页内容 |
| `src/components/profile/PetSwitcher.tsx` | 宠物切换器 |
| `src/components/profile/QuickStatsRow.tsx` | 资料快捷统计 |
| `src/components/profile/LinkedToolsGrid.tsx` | 关联工具网格 |
| `src/components/profile/DataManagementPanel.tsx` | 数据管理面板 |

### 4.5 数据文件 (Data Files)

| 文件路径 | 用途 |
|---------|------|
| `src/lib/data/toxic-items.ts` | 毒性食物/植物数据库 (208 条) |
| `src/lib/data/dog-breeds.ts` | 犬种参考数据 (100+) |
| `src/lib/data/cat-breeds.ts` | 猫种参考数据 (40+) |
| `src/lib/data/eu-travel-rules.ts` | EU 旅行规则数据 (33 个国家代码) |
| `src/lib/data/barf-data.ts` | BARF 喂食参考数据 |
| `src/lib/data/insurance-data.ts` | 保险估算参考数据 |
| `src/lib/data/vaccination-schedule.ts` | 疫苗接种计划数据 |
| `src/lib/data/puppy-growth-curves.ts` | 幼犬成长曲线数据 |
| `src/lib/data/routes.ts` | 路由数据聚合 (供 sitemap 使用) |
| `src/lib/data/content-version.ts` | 内容版本/日期管理 |
| `src/lib/data/content-version.json` | 内容版本 JSON 数据 |

### 4.6 配置文件

| 文件路径 | 用途 |
|---------|------|
| `src/lib/routing.ts` | 路由配置 (12 种 locale) |
| `src/constants/index.ts` | 站点常量 (URL, 名称) |
| `src/constants/breed-page-config.ts` | 品种页维度安全配置 |
| `src/constants/calorie.constants.ts` | 卡路里计算常量 |

### 4.7 计算器文件

| 文件路径 | 用途 |
|---------|------|
| `src/lib/calculators/toxic.calc.ts` | 毒性查询逻辑 |
| `src/lib/calculators/dog-age.calc.ts` | 犬年龄换算算法 |
| `src/lib/calculators/cat-age.calc.ts` | 猫年龄换算算法 |
| `src/lib/calculators/dog-calorie.calc.ts` | 犬卡路里计算 |
| `src/lib/calculators/cat-hydration.calc.ts` | 猫补水量计算 |
| `src/lib/calculators/cat-bcs.calc.ts` | 猫体况评分计算 |
| `src/lib/calculators/gestation.calc.ts` | 妊娠期计算 |
| `src/lib/calculators/puppy-growth.calc.ts` | 幼犬成长预测 |
| `src/lib/calculators/vaccination.calc.ts` | 疫苗接种计划生成 |
| `src/lib/calculators/barf.calc.ts` | BARF 喂食计算 |
| `src/lib/calculators/eu-travel.calc.ts` | EU 旅行要求判断 |
| `src/lib/calculators/insurance.calc.ts` | 保险估算 |

### 4.8 SEO 文件

| 文件路径 | 用途 |
|---------|------|
| `src/lib/seo/geo-meta.ts` | GEO 元数据生成 |
| `src/lib/seo/geo-faq.ts` | GEO FAQ 结构化数据 |
| `src/lib/seo/geo-content.ts` | GEO 知识卡片内容 |
| `src/lib/seo/disclaimer.ts` | 免责声明内容 |
| `src/lib/seo/eu-travel-meta.ts` | EU 旅行 SEO |
| `src/lib/seo/compare-data.ts` | 对比页数据 |
| `src/lib/seo/checklist-faq.ts` | 清单页 FAQ 数据 |
| `src/lib/seo/checklist-content.ts` | 清单页知识卡片数据 |

## 5. sitemap.xml 一致性检查

| 检查项 | 状态 |
|--------|------|
| sitemap.ts 路由覆盖 | ✅ 完整覆盖 |
| 所有语言都有 hreflang | ✅ (全部 12 种语言均等覆盖) |
| lastModified 字段正确 | ✅ (使用 content-version 动态日期) |
| 优先级设置合理 | ✅ (P0=1.0, Hub=0.9, 工具=0.8, EU=0.7) |

### 5.1 sitemap.ts 已知状态

| 问题 | 状态 | 说明 |
|------|------|------|
| EU 旅行落地页物理路由 | ✅ 已修复 | 通过 `[...slug]/page.tsx` + `generateStaticParams()` 实现 |
| Guide/Emergency/Compare sitemap | ✅ 已覆盖 | `getAllToolRoutes()` 包含全部 58 个路由 |

### 5.2 sitemap 条目统计

sitemap.ts 为每个 locale 生成的条目：

| 类别 | 每 locale 条目数 | 计算方式 |
|------|----------------|---------|
| 首页 | 1 | 固定 |
| Hub 页 | 4 | dog, cat, shared, profile (getAllStaticPaths) |
| 信任页 | 3 | about, privacy, terms |
| 工具/指南/紧急/对比页 | 58 | getAllToolRoutes() |
| EU 旅行落地页 | 41 | getAllEUTravelRoutes() |
| **每 locale 合计** | **90** | 1 + 4 + 3 + 58 + 41 |

## 6. 路由类型汇总

| 路由类型 | 物理文件 | routes.ts 注册 | sitemap 生成 | 总数/每 locale |
|---------|---------|---------------|-------------|---------------|
| 首页 | 1 | — | 1 | 1 |
| Hub 枢纽页 | 4 | 4 | 4 | 4 |
| 工具/内容页 | 58 | 58 | 58 | 58 |
| 信任/Legal 页 | 3 | — | 3 | 3 |
| EU 旅行落地页 | 1 (动态) | 41 | 41 | 41 |
| **合计** | **67** | **103** | **90** | **90** |
| **全站点（×12 locale）** | — | — | **1,080** | — |

> EU 旅行落地页使用动态路由文件 `[...slug]/page.tsx` 配合 `generateStaticParams()` 预生成所有 41 个组合。

## 7. 代码与文档一致性状态

| 检查项 | 代码实际 | routes.ts | sitemap.ts | 状态 |
|--------|---------|-----------|------------|------|
| 物理页面文件 | 67 | — | — | ✅ |
| routes.ts 注册路由 | — | 58 条工具 + 41 EU = 99 | — | ✅ |
| sitemap.ts 生成条目 | — | — | 90/locale | ✅ |
| 全部页面 sitemap 覆盖 | 67 | 58 | 90 | ✅ |

### 7.1 已解决的问题

| 问题 | 状态 | 解决方案 |
|------|------|---------|
| EU 旅行落地页缺少物理路由 | ✅ 已修复 | 创建 `[...slug]/page.tsx` 动态路由 + `generateStaticParams()` |
| routes.ts 与物理文件不同步 | ✅ 已修复 | 补充 17 个缺失的紧急页面路由 |
| webmap.md 统计数据过时 | ✅ 已修复 | 更新 sitemap 统计数字 |

---

## 变更日志

| 日期 | 变更内容 |
|------|---------|
| 2026-07-04 (2) | 修复 3 个不一致项：(1) 创建 EU 旅行动态路由 `[...slug]/page.tsx` (2) 补充 17 个缺失的紧急页面路由到 routes.ts (3) 更新 sitemap 统计数据（63→90/PerPage，756→1,080 总计） |
| 2026-07-04 | 全面更新：新增 45 个内容页面（Guide 6 + Emergency 26 + Compare 13）。物理页面从 22 增至 67。新增内容组件索引、SEO 文件索引。添加代码与文档一致性状态表。 |
| 2026-07-03 | 移除毒性落地页规划（410 条动态路由）。原因：Doorway Page SEO 风险、法律合规风险、缺少物理路由文件、内容雷同。全站点从 5,688 条缩减为 756 条。 |
