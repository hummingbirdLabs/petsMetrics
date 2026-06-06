# Page Design: Homepage

**URL**: `https://petsmetrics.com/`  
**Template**: C — Homepage (full-bleed hero + sectioned content)  
**Priority**: P0 · Launch Day

---

## 1. Page Goal

Convert first-time visitors into tool users **within 10 seconds**. The homepage must communicate:
1. What the site does (one sentence)
2. Why it's different (Pet Profile data linkage)
3. What to do next (start a tool or create a pet profile)

---

## 2. SEO Metadata

```
Title:    petsMetrics — Free Dog & Cat Health Calculators
Desc:     Science-based tools for cat and dog owners. Calorie calculator, age converter, 
          vaccination schedules, toxic food checker & more. No login. Free forever.
Canonical: https://petsmetrics.com/
Schema:   Organization + WebSite (sitelinks searchbox)
OG Image: /og/homepage.png (1200×630) — hero graphic with paw + calculator motif
```

---

## 3. Full Page Layout

```
┌──────────────────────────────────────────────────────────────────┐
│  [SECTION 1] Global Navigation                                   │
├──────────────────────────────────────────────────────────────────┤
│  [SECTION 2] Hero                                                │
├──────────────────────────────────────────────────────────────────┤
│  [SECTION 3] Tool Discovery (Dog / Cat tabs)                     │
├──────────────────────────────────────────────────────────────────┤
│  [SECTION 4] Stats / Trust Bar                                   │
├──────────────────────────────────────────────────────────────────┤
│  [SECTION 5] Pet Profile Spotlight                               │
├──────────────────────────────────────────────────────────────────┤
│  [SECTION 6] Featured Tool — Toxic Checker                       │
├──────────────────────────────────────────────────────────────────┤
│  [SECTION 7] Footer                                              │
└──────────────────────────────────────────────────────────────────┘
```

> **Layout change rationale**: Tool Discovery is moved above the Stats Bar so users immediately see value (tools) before reading explanations. The standalone "How It Works" section has been removed — its content is fully covered by the Pet Profile Spotlight section. This eliminates the duplicate and reduces scroll depth.

---

## 4. Section-by-Section Specification

### Section 1 — Global Navigation

See Design System `00-design-system.md §6.1`.

- **Behavior**: Transparent over Hero section; transitions to `--brand-navy` solid when user scrolls > 80px
- **Active state**: No active link on homepage (all links neutral)

---

### Section 2 — Hero Section

**Background**: Full-width gradient  
`background: linear-gradient(135deg, #1B2D4F 0%, #0D3349 50%, #1B2D4F 100%)`  
Subtle animated noise texture overlay (5% opacity, CSS-only, no JS)

**Height**: 100vh on desktop, auto on mobile (min 80vh)

#### Layout (Desktop — 2 column)

```
┌───────────────────────────────────────────────────────────────┐
│                                                               │
│  Left Column (55%)              Right Column (45%)           │
│  ─────────────────              ───────────────────          │
│                                                               │
│  One profile.                   ┌─────────────────────┐      │
│  Every answer.                  │  🐕 Buddy           │      │
│                                 │  Labrador · 3y · 28kg│      │
│  Create your pet's profile      │  ─────────────────── │      │
│  once — then every calculator   │  📊 Calorie: 1,240   │      │
│  fills itself automatically.    │     kcal/day         │      │
│                                 │  📅 Age: ~33 human   │      │
│  No login. No AI.               │     years            │      │
│  Just science.                  │  💉 Next vaccine:    │      │
│                                 │     Jun 15, 2026     │      │
│  [🐕 Dog Tools]  [🐱 Cat Tools] │  ─────────────────── │      │
│                                 │  [Open Full Profile] │      │
│                                 └─────────────────────┘      │
│                                                               │
│  200+ foods checked · 14 tools · 400+ breeds supported       │
└───────────────────────────────────────────────────────────────┘
```

#### Hero Copy

**H1 Headline** (56px / 800-weight / white):
> One profile. Every answer.

**Subheadline** (20px / 400-weight / `rgba(255,255,255,0.8)`):
> Create your pet's profile once — then every calculator fills itself automatically.  
> No login. No AI. Just science.

**CTA Buttons** (row of 2):
- Primary: `[🐕 Dog Tools]` — amber background `--dog-primary`, white text, 52px height
- Secondary: `[🐱 Cat Tools]` — violet background `--cat-primary`, white text, 52px height

**Trust Signal line** (14px, `rgba(255,255,255,0.6)`):
> 200+ foods checked · 14 tools · 400+ breeds · Based on AAHA, WSAVA & AAFCO standards

> ⚠️ **Design note**: Do NOT use fabricated user counts (e.g. "50,000+ pet owners") on launch. This is a new site with no user base — false social proof destroys trust with skeptical Western audiences and creates legal risk under FTC/ASA guidelines. Replace with verifiable data metrics (database size, breed coverage, formula sources) until genuine user numbers are available. Once verified users exceed 5,000, a real count may be added.

#### Right Column — Animated Pet Profile Card

This is the hero's visual "aha moment" — an animated mockup of the Pet Profile card cycling through different tool outputs (Calorie → Age → Vaccination → Gestation) with a smooth fade transition every 3 seconds.

**Card spec**:
- Background: `rgba(255,255,255,0.06)` glass morphism
- Border: `1px rgba(255,255,255,0.12)`
- Backdrop-filter: `blur(20px)`
- Border-radius: 20px
- Shadow: `0 24px 48px rgba(0,0,0,0.4)`
- Width: 360px max

**Mobile behavior**: Card stacks below headline. Reduced to 280px wide.

---

### Section 3 — Pet Profile Spotlight

**Background**: `--white`  
**Padding**: 96px vertical

**Purpose**: Explain the core differentiation (one-time input → all tools auto-fill)

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  Why petsMetrics is different          (H2, center-aligned)    │
│                                                                 │
│  Other pet calculators make you retype your pet's info         │
│  every single time. We don't.                                   │
│                                                                 │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                                                            │ │
│  │  ❶ Create a Pet Profile          (30 seconds)             │ │
│  │     Enter breed, weight, birthday, spay/neuter status.    │ │
│  │                                                            │ │
│  │  ──────────────────────────────────────────────────────   │ │
│  │                                                            │ │
│  │  ❷ Open any tool                 (0 seconds to fill)      │ │
│  │     Every calculator reads from your profile.             │ │
│  │     No re-typing. Ever.                                    │ │
│  │                                                            │ │
│  │  ──────────────────────────────────────────────────────   │ │
│  │                                                            │ │
│  │  ❸ Get science-backed answers    (instantly)              │ │
│  │     AAHA / WSAVA / AAFCO formulas. Sources cited.         │ │
│  │                                                            │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                 │
│              [Create My Pet Profile — Free]                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Visual treatment**:
- Steps use numbered circles with teal fill
- Inter-step connector: dashed vertical line `--gray-200`
- Entire block has subtle left border accent: `3px solid --brand-teal`
- CTA: Large teal button, 56px height, full-width on mobile

---

### Section 4 — Tool Discovery

**Background**: `--gray-50`  
**Padding**: 96px vertical

**Tab switcher** (Dog / Cat / All) — centered, pill design:

```
  ┌──────────┬──────────┬──────────┐
  │  🐕 Dogs │  🐱 Cats │  All     │
  └──────────┴──────────┴──────────┘
```

Active: `--brand-navy` bg, white text. Inactive: white bg, `--gray-700` text.

#### Dog Tools Grid (default view)

3 columns on desktop, 2 on tablet, 1 on mobile.  
Cards use amber accent (`--dog-primary-light` backgrounds, `--dog-primary` icons).

```
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ ⚠️ Toxic     │  │ 🍖 Calorie   │  │ 📅 Age       │
│   Checker    │  │   Calculator │  │   Calculator │
│              │  │              │  │              │
│ Is that food │  │ How much to  │  │ How old in   │
│ safe?        │  │ feed daily?  │  │ human years? │
│              │  │              │  │              │
│ [Open →]     │  │ [Open →]     │  │ [Open →]     │
└──────────────┘  └──────────────┘  └──────────────┘

┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ 🐣 Puppy     │  │ 💉 Vaccine   │  │ 🤰 Gestation │
│   Growth     │  │   Schedule   │  │   Calculator │
│              │  │              │  │              │
│ Predict      │  │ Never miss   │  │ Predict due  │
│ adult size   │  │ a shot again │  │ date & stages│
│              │  │              │  │              │
│ [Open →]     │  │ [Open →]     │  │ [Open →]     │
└──────────────┘  └──────────────┘  └──────────────┘
```

**P0 badge**: Small amber pill tag "⭐ Most Popular" on Calorie Calculator and Toxic Checker cards.

#### Cat Tools Grid (switch tab)

Same layout, violet accent (`--cat-primary-light` backgrounds):

- BCS & Weight Management
- Hydration Calculator
- Age Calculator
- Vaccination Schedule
- Gestation Calculator
- Toxic Checker (shared, shown in both)

---

### Section 5 — Stats / Trust Bar

**Background**: `--brand-navy`  
**Padding**: 48px vertical

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   14 Tools        200+ Foods       AAHA / WSAVA    No Login    │
│   Available       in Database      Standards       Required    │
│   (teal number)   (teal number)    (cited)         (icon lock) │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

Stats are white text on navy. Numbers in `--brand-teal`. Labels in `rgba(255,255,255,0.7)`.

On mobile: 2×2 grid.

---

### Section 6 — Featured Tool Spotlight (Toxic Checker)

**Background**: Gradient from `#FFF7ED` to `#FFFBEB` (warm cream)  
**Purpose**: Drive traffic to highest-SEO-value tool, demonstrate search behavior

#### Emergency Alert Banner (top of section, always visible)

```
┌─────────────────────────────────────────────────────────────────┐
│  🚨  Pet emergency? ASPCA Poison Control: (888) 426-4435 · 24/7 │
└─────────────────────────────────────────────────────────────────┘
```

- Background: `--status-toxic` `#EF4444`, white text
- Font: 14px semibold, monospace phone number
- Full-width, no close button (permanent safety resource)
- Purpose: serves emergency-intent users immediately; signals authority to Google for YMYL scoring

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  ⚠️  Can your pet eat that?          (H2)                       │
│                                                                 │
│  200+ foods and plants instantly checked.                       │
│  Know before you share from your plate.                         │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  🔍  Search: "grapes", "avocado", "lilies"...           │   │
│  │                                              [Check →]  │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Recent searches:  Grapes · Chocolate · Onions · Xylitol       │
│                                                                 │
│  🔴 Grapes       — Toxic to dogs & cats                        │
│  🟡 Tuna (canned)— Safe in small amounts                       │
│  🟢 Blueberries  — Safe for dogs                               │
│                                                                 │
│              [Open Full Toxic Checker →]                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Interactive element**: The search box is functional (mini version of the full toxic checker). Entering a query shows a result preview in-page, then prompts to open the full tool for more detail.

---

## 5. Mobile Layout (≤ 768px)

### Hero
- Single column
- Headline: 36px
- Profile card: hidden (replaced by simple stat row)
- CTAs: Full-width stacked buttons

### Tool Discovery
- 2 columns → 1 column at xs
- Tab switcher: scrollable horizontal pills

### Stats Bar
- 2×2 grid

### Featured Tool
- Search box full-width
- Recent searches: horizontal scroll

---

## 6. Interaction States

| Element | Default | Hover | Active | Focus |
|---|---|---|---|---|
| Dog CTA button | Amber fill | Darken 10% | Scale 0.98 | Teal ring |
| Cat CTA button | Violet fill | Darken 10% | Scale 0.98 | Teal ring |
| Tool card | White, shadow-sm | Lift + shadow-md | Shadow-sm | Teal border |
| Tab switcher | Gray outline | Navy bg 10% | Navy bg | Teal ring |
| Hero search | Glass morph | Brighter border | | White ring |

---

## 7. Animation Timeline (on page load)

| Element | Delay | Animation |
|---|---|---|
| Nav | 0ms | Fade in |
| Hero headline | 100ms | Fade up 20px |
| Hero subtext | 250ms | Fade up 20px |
| CTA buttons | 400ms | Fade up 20px |
| Profile card | 500ms | Fade in + scale from 0.95 |
| Social proof | 600ms | Fade in |

Scroll-triggered animations for sections 3–7 (IntersectionObserver, threshold 0.15).

---

## 8. Monetization Notes

- **No affiliate banners on homepage** — keeps trust signal clean
- Google AdSense slot: Below Section 7 (above footer), only after Month 1
- Primary conversion goal: Click to a tool (tracked as GA4 event `tool_open`)
- Secondary goal: Pet Profile creation (`profile_created` event)
