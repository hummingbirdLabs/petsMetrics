# Page Design: Cat Tools Hub

**URL**: `https://petsmetrics.com/cat/`  
**Template**: B — Hub/Landing Page (full-width sections)  
**Priority**: P0 · Launch Day  
**Theme Color**: Elegant Violet (`--cat-primary` #7C3AED)

---

## 1. Page Goal

Landing page for all cat-related tools. Serves as:
- SEO entry point for "cat health tools", "cat calculators"
- Navigation hub for cat-owning users
- Differentiating tone: calmer and more sophisticated than the dog hub

---

## 2. SEO Metadata

```
Title:    Free Cat Health Calculators — Calorie, Age, BCS & More | petsMetrics
Desc:     Science-based cat calculators: BCS weight tracker, hydration needs, age in 
          human years, vaccination schedules, and pregnancy calculator. Free, no login.
Canonical: https://petsmetrics.com/cat/
Schema:   CollectionPage + BreadcrumbList
H1:       Cat Health Calculators & Tools
```

**Target keywords**: "cat age in human years", "cat calorie calculator", "cat BCS calculator", "is my cat overweight", "cat vaccination schedule", "cat hydration calculator"

---

## 3. Full Page Layout

```
┌──────────────────────────────────────────────────────────────────┐
│  Global Nav (Cats tab highlighted)                               │
├──────────────────────────────────────────────────────────────────┤
│  [SECTION 1] Hero — violet gradient                              │
├──────────────────────────────────────────────────────────────────┤
│  [SECTION 2] Pet Profile Bar (if cat profile exists)             │
├──────────────────────────────────────────────────────────────────┤
│  [SECTION 3] Featured / P0 Tools                                 │
├──────────────────────────────────────────────────────────────────┤
│  [SECTION 4] All Cat Tools Grid                                  │
├──────────────────────────────────────────────────────────────────┤
│  [SECTION 5] SEO Content Block                                   │
├──────────────────────────────────────────────────────────────────┤
│  Footer                                                          │
└──────────────────────────────────────────────────────────────────┘
```

---

## 4. Section Specifications

### Section 1 — Hero

**Background**: `linear-gradient(135deg, #4C1D95 0%, #7C3AED 60%, #A78BFA 100%)`  
**Height**: 320px desktop / auto mobile

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│  🐱  Cat Health Calculators                 (H1 — white, 40px)  │
│                                                                  │
│  Precision tools built for indoor cat owners.                   │
│  Nutrition, health, and wellness — calculated.                  │
│                                                                  │
│  [BreadcrumbList: Home > Cats]              (14px, white 70%)   │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │ 🔍  Search cat tools...                                    │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

**Tone difference from Dog Hub**: The copy is calmer, more refined. "Precision tools" vs "Science-based". Cat owners tend to appreciate understated sophistication.

---

### Section 2 — Pet Profile Bar

*Only shown if a cat profile exists in localStorage.*

```
┌──────────────────────────────────────────────────────────────────┐
│  🐱 Luna  ·  Domestic Shorthair  ·  5 years  ·  4.5 kg  [Switch]│
│  ✓ All tools below will auto-fill with Luna's data               │
└──────────────────────────────────────────────────────────────────┘
```

Background: `--cat-primary-light`, border-bottom: `--cat-accent 1px`

---

### Section 3 — Featured / P0 Tools

**Background**: `--white`  
**Padding**: 64px vertical

```
  Essential Cat Health Tools                (H2)
  ──────────────────────────────────────────

  [HERO TOOL CARD — Full Width]  ← BCS Weight Tracker (unique cat killer feature)
  ┌──────────────────────────────────────────────────────────────┐
  │                                                              │
  │  ⚖️  Body Condition Score & Weight Management               │
  │                                                              │
  │  60% of indoor cats are overweight. Is yours one of them?   │
  │  Take a 2-minute visual assessment and get a science-backed  │
  │  weight plan — without crash-dieting your cat.              │
  │                                                              │
  │  BCS 1-9 scale · AAHA guidelines · Safe calorie targets     │
  │                                                              │
  │  [Check My Cat's Weight →]               ⭐ Cat Owners' #1  │
  │                                                              │
  └──────────────────────────────────────────────────────────────┘

  [TWO COLUMN FEATURED]
  ┌─────────────────────────────┐  ┌─────────────────────────────┐
  │  ⚠️ Toxic Food Checker      │  │  💧 Hydration Calculator    │
  │                             │  │                             │
  │  Is that plant in your      │  │  Most cats are chronically  │
  │  home safe? Lilies are      │  │  dehydrated. Find out how   │
  │  deadly for cats.           │  │  much water Luna needs.     │
  │                             │  │                             │
  │  [Check Now →]              │  │  [Calculate →]              │
  └─────────────────────────────┘  └─────────────────────────────┘
```

Hero card: violet left border 4px, `--cat-surface` background.

---

### Section 4 — All Cat Tools Grid

**Background**: `--gray-50`  
**Padding**: 64px vertical  
**Grid**: 3 columns (1024px+), 2 columns (640–1024px), 1 column (mobile)

```
  All Cat Tools                             (H2)
  ──────────────────────────────────────────

  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
  │ 📅 Age Calculator│  │ 💉 Vaccination   │  │ 🤰 Gestation     │
  │                  │  │    Schedule      │  │   Calculator     │
  │ How old is your  │  │                  │  │                  │
  │ cat in human     │  │ FVRCP, Rabies &  │  │ Predict kittens' │
  │ years?           │  │ more, scheduled  │  │ arrival & key    │
  │  (AAHA/AAFP)     │  │ by age & region. │  │ vet milestones.  │
  │ [Open →]         │  │ [Open →]         │  │ [Open →]         │
  └──────────────────┘  └──────────────────┘  └──────────────────┘

  ┌──────────────────┐  ┌──────────────────┐
  │ 🥩 BARF          │  │ 🛡️ Insurance     │
  │   Calculator     │  │   Estimator      │
  │                  │  │                  │
  │ Raw feeding      │  │ Compare cat      │
  │ ratios for cats: │  │ insurance plans. │
  │ no veggies!  P1  │  │            P1    │
  │                  │  │                  │
  │ [Open →]         │  │ [Open →]         │
  └──────────────────┘  └──────────────────┘
```

**Card design**: identical structure to dog hub, but with violet accents (`--cat-primary` icons, `--cat-primary-light` tag fills, `--cat-accent` hover borders).

---

### Section 5 — SEO Content Block

**Background**: `--white`  
**Padding**: 64px vertical

```
  About These Cat Health Calculators        (H2)
  ──────────────────────────────────────────

  Built on AAHA/AAFP feline life stage guidelines and WSAVA
  vaccination standards. All formulas are cited and transparent.

  [FAQ Accordion — FAQPage schema]

  ▼ How old is my cat in human years?
  ▼ Is my cat overweight? How to use BCS scoring?
  ▼ How much water should my cat drink per day?
  ▼ What vaccines does my indoor cat need?
  ▼ How long is a cat pregnant?
```

**Notable cat-specific content angle**: Indoor cat obesity statistics (60%), chronic dehydration in dry-food-only cats. These are high-engagement topics in cat owner communities.

---

## 5. Visual Design — Violet Theme Details

### Color Application

| Element | Specification |
|---|---|
| Hero gradient | `#4C1D95 → #7C3AED → #A78BFA` |
| Tool card icons | `--cat-primary` #7C3AED |
| Card hover border | `--cat-accent` #A78BFA |
| Profile bar background | `--cat-primary-light` #EDE9FE |
| Featured card left border | `--cat-primary` 4px |
| Tag badge | `--cat-primary-light` bg, `--cat-primary` text |
| Page surface tint | `--cat-surface` #F5F3FF |

### Typography Refinement for Cat Pages

Cat pages use slightly more generous letter-spacing (`0.01em`) and a softer visual weight to match the more sophisticated brand tone. Same font stack, same sizes — subtle behavioral difference in application.

---

## 6. Mobile Layout (≤ 768px)

Same responsive strategy as Dog Hub:
- Hero: 28px H1, breadcrumb only, no search
- Profile bar: condensed with auto-fill indicator
- Featured card: full-width, violet accent
- Tool grid: 1 column
- FAQ: accordion stays functional, no JS required

---

## 7. Cross-linking Strategy

From the Cat Hub, strategically link to:
- `shared/toxic-checker/` — "The #1 cat emergency: toxic plants. Check yours →"
- `dog/` — "Also have a dog? View Dog Tools →" (cross-pollinate audience)
- `profile/` — Persistent profile creation CTA in sidebar
