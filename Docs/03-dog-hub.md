# Page Design: Dog Tools Hub

**URL**: `https://petsmetrics.com/dog/`  
**Template**: B — Hub/Landing Page (full-width sections)  
**Priority**: P0 · Launch Day  
**Theme Color**: Warm Amber (`--dog-primary` #D97706)

---

## 1. Page Goal

Landing page for all dog-related tools. Serves as:
- SEO entry point for "dog health tools", "dog calculators"
- Navigation hub for users browsing dog tools
- Quick-access grid for returning users

---

## 2. SEO Metadata

```
Title:    Free Dog Health Calculators — Calorie, Age, Vaccine & More | petsMetrics
Desc:     Science-based dog calculators: calorie needs, age in human years, puppy growth, 
          vaccination schedules, and pregnancy due date. Free, no login. AAHA standards.
Canonical: https://petsmetrics.com/dog/
Schema:   CollectionPage + BreadcrumbList
H1:       Dog Health Calculators & Tools
```

**Target keywords**: "dog calorie calculator", "dog age in human years", "puppy growth chart", "dog vaccination schedule", "dog pregnancy calculator"

---

## 3. Full Page Layout

```
┌──────────────────────────────────────────────────────────────────┐
│  Global Nav (Dogs tab highlighted)                               │
├──────────────────────────────────────────────────────────────────┤
│  [SECTION 1] Hero — amber gradient                               │
├──────────────────────────────────────────────────────────────────┤
│  [SECTION 2] Pet Profile Bar (if profile exists)                 │
├──────────────────────────────────────────────────────────────────┤
│  [SECTION 3] Tool Grid — P0 Featured                             │
├──────────────────────────────────────────────────────────────────┤
│  [SECTION 4] Tool Grid — All Tools                               │
├──────────────────────────────────────────────────────────────────┤
│  [SECTION 5] SEO Content Block                                   │
├──────────────────────────────────────────────────────────────────┤
│  Footer                                                          │
└──────────────────────────────────────────────────────────────────┘
```

---

## 4. Section Specifications

### Section 1 — Hero

**Background**: `linear-gradient(135deg, #92400E 0%, #D97706 60%, #F59E0B 100%)`  
**Height**: 320px desktop / auto mobile

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│  🐕  Dog Health Calculators                 (H1 — white, 40px)  │
│                                                                  │
│  Science-based tools for dog owners.                            │
│  From calories to vaccines — all in one place.                  │
│                                                                  │
│  [BreadcrumbList: Home > Dogs]                  (14px, white 70%)│
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │ 🔍  Search dog tools...                                    │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

- Breadcrumb: `Home > Dogs`, white text, 70% opacity links
- Search bar: white bg, 48px height, shadow-md, instant filter on tool grid below

---

### Section 2 — Pet Profile Bar

*Only shown if a dog profile exists in localStorage.*

```
┌──────────────────────────────────────────────────────────────────┐
│  🐕 Buddy  ·  Labrador  ·  3 years  ·  28 kg          [Switch ▾]│
│  ✓ All tools below will auto-fill with Buddy's data              │
└──────────────────────────────────────────────────────────────────┘
```

Background: `--dog-primary-light`, border-bottom: `--dog-accent 1px`  
Switch dropdown: lists all dog profiles

*If no profile exists:*
```
┌──────────────────────────────────────────────────────────────────┐
│  💡 Create a dog profile to auto-fill all calculators            │
│     [Create Profile — 30 seconds]                                │
└──────────────────────────────────────────────────────────────────┘
```

---

### Section 3 — Featured / P0 Tools

**Background**: `--white`  
**Padding**: 64px vertical

```
  Most Used Dog Tools                        (H2, left-aligned)
  ───────────────────────────────────────────

  [HERO TOOL CARD — Full Width]
  ┌──────────────────────────────────────────────────────────────┐
  │                                                              │
  │  ⚠️  Toxic Food & Plant Checker                              │
  │                                                              │
  │  The #1 thing dog owners search. Instantly check whether     │
  │  foods and plants are safe for your dog — from grapes to     │
  │  onions to lilies.                                           │
  │                                                              │
  │  200+ foods · Severity levels · Vet hotline included         │
  │                                                              │
  │  [Check a Food Now →]                    ⭐ Most Popular     │
  │                                                              │
  └──────────────────────────────────────────────────────────────┘

  [TWO COLUMN FEATURED]
  ┌─────────────────────────────┐  ┌─────────────────────────────┐
  │  🍖 Calorie Calculator      │  │  💉 Vaccination Schedule     │
  │                             │  │                             │
  │  Calculate your dog's exact │  │  Never miss a shot. Get a   │
  │  daily calorie needs using  │  │  personalized vaccine        │
  │  AAFCO's MER formula.       │  │  timeline for your dog.     │
  │                             │  │                             │
  │  [Calculate →]              │  │  [View Schedule →]          │
  └─────────────────────────────┘  └─────────────────────────────┘
```

Hero tool card: amber left border 4px, `--dog-surface` background, shadow-sm.

---

### Section 4 — All Dog Tools Grid

**Background**: `--gray-50`  
**Padding**: 64px vertical  
**Grid**: 3 columns (1024px+), 2 columns (640–1024px), 1 column (mobile)

```
  All Dog Tools                              (H2)
  ───────────────────────────────────────────

  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
  │ 📅 Age Calculator│  │ 🐣 Puppy Growth  │  │ 🤰 Gestation     │
  │                  │  │   Predictor      │  │   Calculator     │
  │ How old is your  │  │                  │  │                  │
  │ dog in human     │  │ Predict adult    │  │ Pregnancy due    │
  │ years?           │  │ weight & track   │  │ date & milestones│
  │                  │  │ growth curve.    │  │ for breeders.    │
  │ P0 · ⭐⭐⭐⭐    │  │ P0 · ⭐⭐⭐⭐    │  │ P0 · ⭐⭐⭐⭐⭐  │
  │ [Open →]         │  │ [Open →]         │  │ [Open →]         │
  └──────────────────┘  └──────────────────┘  └──────────────────┘

  ┌──────────────────┐  ┌──────────────────┐
  │ 🥩 BARF          │  │ 🛡️ Insurance     │
  │   Calculator     │  │   Estimator      │
  │                  │  │                  │
  │ Raw feeding      │  │ Compare plans    │
  │ portion guide    │  │ from top         │
  │ by weight.  P1   │  │ providers.  P1   │
  │                  │  │                  │
  │ [Open →]         │  │ [Open →]         │
  └──────────────────┘  └──────────────────┘
```

**Card design**:
- Icon: 40px, amber color `--dog-primary`
- Title: 18px 600-weight `--gray-900`
- Description: 14px `--gray-500`, 3 lines max
- Priority badge: small pill, `--dog-primary-light` bg, `--dog-primary` text
- Star rating: reflects traffic value from PRD
- Hover: card lifts 2px, amber border appears

---

### Section 5 — SEO Content Block

**Background**: `--white`  
**Padding**: 64px vertical  
**Purpose**: Rank for "dog health tools" informational queries

```
  About These Dog Health Calculators         (H2)
  ───────────────────────────────────────────

  Our dog tools are built on peer-reviewed veterinary standards
  from AAHA, AAFCO, and WSAVA. Here's what each tool does and
  why it matters for your dog's health.

  [Expandable FAQ Items]

  ▼ What is the most accurate dog age calculator?
    ...content...

  ▼ How do I calculate my dog's daily calorie needs?
    ...content...

  ▼ What vaccinations does my dog need?
    ...content...

  ▼ How long is a dog pregnant?
    ...content...
```

- FAQs implement `FAQPage` schema markup
- Each answer links to the relevant tool
- Expandable: CSS-only accordion (no JS required for basic version)

---

### Section 6 — Breed-Specific SEO Content (Low-Competition Long-Tail)

**Background**: `--gray-50`  
**Padding**: 64px vertical  
**Purpose**: Capture breed-specific search queries that large sites (AKC, PetMD) don't optimize for at page level. These keywords have DA40 or lower competition — a new site can rank on page 1 within 3–6 months.

**Target query patterns**:
- "German Shepherd calorie calculator"
- "Golden Retriever age in human years"
- "French Bulldog healthy weight"
- "Labrador puppy growth chart"

```
  Tools by Breed                             (H2)
  ───────────────────────────────────────────

  Popular Breeds                 (H3, collapsible sections)
  ─────────────────────────────

  🐕 Labrador Retriever
     · Calorie Calculator for Labradors  [Open →]
     · Labrador Age in Human Years       [Open →]
     · Labrador Puppy Growth Chart       [Open →]

  🐕 German Shepherd
     · German Shepherd Daily Calories    [Open →]
     · German Shepherd Human Age         [Open →]

  🐕 French Bulldog
     · French Bulldog Weight Guide       [Open →]
     · Frenchie Calorie Calculator       [Open →]

  🐕 Golden Retriever
     · Golden Retriever Age Calculator   [Open →]
     · Golden Retriever Calorie Needs    [Open →]

  [See all 400+ breeds →]
```

**Implementation**: Each "breed + tool" link routes to the existing tool page with breed pre-selected in the URL param (e.g. `/dog/calorie-calculator/?breed=labrador-retriever`). The tool page then renders with the breed pre-filled and an H1 that includes the breed name for SEO. No additional pages required — the tool pages handle breed-specific SEO via URL params and dynamic meta tags.

**Priority breeds to cover at launch** (highest search volume × lowest competition):

| Breed | Key Query | Monthly Searches (est.) |
|---|---|---|
| Labrador Retriever | "labrador calorie calculator" | 3,200 |
| German Shepherd | "german shepherd human years" | 2,900 |
| Golden Retriever | "golden retriever age calculator" | 2,600 |
| French Bulldog | "french bulldog healthy weight" | 2,100 |
| Beagle | "beagle daily food amount" | 1,800 |
| Chihuahua | "chihuahua human years calculator" | 1,700 |
| Dachshund | "dachshund weight calculator" | 1,500 |
| Poodle | "poodle calorie needs" | 1,400 |

---

## 5. Mobile Layout (≤ 768px)

- Hero: H1 28px, no search bar (replaced by breadcrumb only)
- Profile bar: condensed to pet name + "auto-fill active" indicator
- Featured tool: single full-width card
- Tool grid: 1 column cards, full-width
- SEO block: fully visible, accordion stays functional

---

## 6. Visual Design Details

### Amber Theme Application

| Element | Color |
|---|---|
| Page hero gradient | Amber to dark amber |
| Tool card icons | `--dog-primary` |
| Card hover borders | `--dog-accent` |
| Profile bar background | `--dog-primary-light` |
| Featured card left border | `--dog-primary` 4px |
| "Most Popular" badge | `--dog-primary-light` bg |
| H1 text | White |
| Body text | `--gray-700` |

### Responsive Breakpoints

| Breakpoint | Grid | Hero H1 |
|---|---|---|
| ≥ 1024px | 3-col | 40px |
| 640–1023px | 2-col | 32px |
| < 640px | 1-col | 28px |
