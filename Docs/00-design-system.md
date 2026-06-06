# PetsMetrics — Design System & Visual Language

> **Design Philosophy**: Apple-level precision meets veterinary authority. Every pixel earns trust.  
> **Tagline**: *"One profile. Every answer."*

---

## 1. Brand Identity

### 1.1 Logo Concept

```
🐾 petsMetrics
```

- Symbol: Minimalist paw print with a subtle graph/chart element embedded
- Wordmark: `pets` in regular weight + `Metrics` in semibold
- Clear space: 2× logo height on all sides
- Minimum size: 120px wide (digital), 30mm (print)

### 1.2 Brand Voice

| Attribute | Description |
|---|---|
| **Authoritative** | Cites AAHA, WSAVA, AAFCO — every number has a source |
| **Warm** | Talks like a knowledgeable friend, not a clinical report |
| **Precise** | No vague ranges, clear formulas, transparent methodology |
| **Safe** | Always defers to vet for medical decisions |

---

## 2. Color System

### 2.1 Global Brand Colors

| Token | Hex | Usage |
|---|---|---|
| `--brand-navy` | `#1B2D4F` | Primary text, nav background, footer |
| `--brand-teal` | `#0D9488` | CTA buttons, active states, links |
| `--brand-teal-light` | `#CCFBF1` | Hover backgrounds, selected chips |
| `--white` | `#FFFFFF` | Page backgrounds, card surfaces |
| `--gray-50` | `#F8FAFC` | Section alternating background |
| `--gray-100` | `#F1F5F9` | Input backgrounds, disabled states |
| `--gray-300` | `#CBD5E1` | Borders, dividers |
| `--gray-500` | `#64748B` | Secondary text, placeholders |
| `--gray-700` | `#334155` | Body text |
| `--gray-900` | `#0F172A` | Heading text |

### 2.2 Dog Section — Warm Amber Theme

| Token | Hex | Usage |
|---|---|---|
| `--dog-primary` | `#D97706` | Dog section CTAs, active nav |
| `--dog-primary-dark` | `#92400E` | Hover state, pressed |
| `--dog-primary-light` | `#FEF3C7` | Dog card backgrounds, tag fills |
| `--dog-accent` | `#F59E0B` | Highlights, icons, progress bars |
| `--dog-surface` | `#FFFBEB` | Dog tool page background tint |

**Visual language**: Warm, energetic, playful — evokes outdoor sun, parks, active dogs.

### 2.3 Cat Section — Elegant Violet Theme

| Token | Hex | Usage |
|---|---|---|
| `--cat-primary` | `#7C3AED` | Cat section CTAs, active nav |
| `--cat-primary-dark` | `#4C1D95` | Hover state, pressed |
| `--cat-primary-light` | `#EDE9FE` | Cat card backgrounds, tag fills |
| `--cat-accent` | `#A78BFA` | Highlights, icons, progress bars |
| `--cat-surface` | `#F5F3FF` | Cat tool page background tint |

**Visual language**: Sophisticated, calm, indoor elegance — evokes evening light, quiet interiors.

### 2.4 Semantic / Status Colors

| Token | Hex | Meaning | Usage |
|---|---|---|---|
| `--status-safe` | `#10B981` | 🟢 Safe | Toxic checker safe result |
| `--status-safe-bg` | `#D1FAE5` | Safe background | Result card fill |
| `--status-caution` | `#F59E0B` | 🟡 Caution | Moderate risk |
| `--status-caution-bg` | `#FEF3C7` | Caution background | |
| `--status-toxic` | `#EF4444` | 🔴 Toxic | Danger result |
| `--status-toxic-bg` | `#FEE2E2` | Toxic background | |
| `--status-info` | `#3B82F6` | ℹ️ Info | Tips, neutral callouts |
| `--status-info-bg` | `#DBEAFE` | Info background | |

### 2.5 Dark Mode Token Overrides

> **Why required**: As of 2025, 55–70% of iPhone/Mac users have system dark mode enabled (Apple internal data). Sites that ignore `prefers-color-scheme: dark` display a harsh white background for this majority, immediately harming first impressions and perceived quality.

**Implementation**: CSS custom properties re-declared inside a `@media (prefers-color-scheme: dark)` block. Brand accent colors (dog amber, cat violet, status colors) are intentionally kept the same — they read better and more distinctly on dark backgrounds.

```css
@media (prefers-color-scheme: dark) {
  /* Surface & background inversions */
  --white:        #0F172A;   /* page background → near-black navy */
  --gray-50:      #1E293B;   /* section alt background */
  --gray-100:     #334155;   /* input backgrounds, disabled states */
  --gray-300:     #475569;   /* borders, dividers (lightened for visibility) */

  /* Text inversions */
  --gray-500:     #94A3B8;   /* secondary text, placeholders */
  --gray-700:     #CBD5E1;   /* body text */
  --gray-900:     #F1F5F9;   /* heading text → near-white */

  /* Brand navy inverts to light (used as text on dark bg) */
  --brand-navy:   #E2E8F0;

  /* Teal kept same — vibrant on dark backgrounds */
  /* --brand-teal: #0D9488  (unchanged) */
  /* --brand-teal-light → darken slightly for dark bg cards */
  --brand-teal-light: #0F766E;

  /* Dog section — amber kept, surface darkened */
  --dog-primary-light: #451A03;  /* card backgrounds in dark mode */
  --dog-surface:       #1C0E00;

  /* Cat section — violet kept, surface darkened */
  --cat-primary-light: #2E1065;
  --cat-surface:       #13072B;

  /* Status backgrounds — darkened for dark mode legibility */
  --status-safe-bg:    #064E3B;
  --status-caution-bg: #451A03;
  --status-toxic-bg:   #450A0A;
  --status-info-bg:    #1E3A5F;
}
```

**Testing requirement**: All tool pages must pass WCAG AA contrast ratio (4.5:1 for body text, 3:1 for large text) in both light and dark modes. Use the [Colour Contrast Analyser](https://www.tpgi.com/color-contrast-checker/) during QA.

---

## 3. Typography

### 3.1 Font Stack

```css
/* Display & Headings */
font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;

/* Body & UI */
font-family: 'Inter', system-ui, -apple-system, sans-serif;

/* Numbers & Results (monospaced feel) */
font-family: 'DM Mono', 'JetBrains Mono', monospace;
```

**Loading strategy**: Subset to Latin + Latin-Extended only. Preload critical weights (400, 600, 700).

### 3.2 Type Scale

| Token | Size | Line-height | Weight | Usage |
|---|---|---|---|---|
| `--text-hero` | 56px / 3.5rem | 1.1 | 800 | Homepage hero headline |
| `--text-h1` | 40px / 2.5rem | 1.2 | 700 | Page titles |
| `--text-h2` | 32px / 2rem | 1.25 | 700 | Section headings |
| `--text-h3` | 24px / 1.5rem | 1.3 | 600 | Card titles, tool names |
| `--text-h4` | 20px / 1.25rem | 1.4 | 600 | Sub-sections |
| `--text-body-lg` | 18px / 1.125rem | 1.6 | 400 | Lead paragraphs |
| `--text-body` | 16px / 1rem | 1.6 | 400 | Default body |
| `--text-body-sm` | 14px / 0.875rem | 1.5 | 400 | Captions, labels |
| `--text-xs` | 12px / 0.75rem | 1.4 | 400 | Disclaimers, fine print |
| `--text-result` | 48px / 3rem | 1.0 | 700 | Result number display |
| `--text-result-sm` | 36px / 2.25rem | 1.1 | 700 | Secondary result numbers |

### 3.3 Mobile Type Scale (≤ 768px)

All heading sizes scale down by ~25%:
- Hero: 36px → `--text-hero-mobile`
- H1: 28px
- H2: 22px
- Result: 36px

---

## 4. Spacing System

8px base grid. All spacing values are multiples of 8.

| Token | Value | Usage |
|---|---|---|
| `--space-1` | 4px | Micro gaps (icon-to-label) |
| `--space-2` | 8px | Tight elements |
| `--space-3` | 12px | Compact padding |
| `--space-4` | 16px | Default inner padding |
| `--space-5` | 20px | Form field gaps |
| `--space-6` | 24px | Card padding |
| `--space-8` | 32px | Section inner spacing |
| `--space-10` | 40px | Component vertical rhythm |
| `--space-12` | 48px | Large section gaps |
| `--space-16` | 64px | Section separators |
| `--space-24` | 96px | Page-level vertical rhythm |

---

## 5. Layout Grid

### 5.1 Breakpoints

| Name | Min-width | Max content width |
|---|---|---|
| `xs` | 0px | 100% |
| `sm` | 640px | 100% |
| `md` | 768px | 100% |
| `lg` | 1024px | 1024px |
| `xl` | 1280px | 1280px |
| `2xl` | 1536px | 1400px |

### 5.2 Page Layout Templates

**Template A — Tool Page (2-column)**
```
┌─────────────────────────────────────────────────┐
│  Global Nav                                     │
├───────────────────────────────┬─────────────────┤
│                               │                 │
│  Main Content (Tool)          │  Sidebar        │
│  max-width: 720px             │  300px          │
│                               │  (Affiliate)    │
│                               │                 │
└───────────────────────────────┴─────────────────┘
│  Footer                                         │
```

**Template B — Hub/Landing Page (full-width)**
```
┌─────────────────────────────────────────────────┐
│  Global Nav                                     │
├─────────────────────────────────────────────────┤
│  Hero Section (full width)                      │
├─────────────────────────────────────────────────┤
│  Tool Grid (3-col → 2-col → 1-col responsive)  │
├─────────────────────────────────────────────────┤
│  Footer                                         │
└─────────────────────────────────────────────────┘
```

**Template C — Homepage**
```
┌─────────────────────────────────────────────────┐
│  Global Nav (transparent → solid on scroll)     │
├─────────────────────────────────────────────────┤
│  Hero (full bleed, gradient bg)                 │
├─────────────────────────────────────────────────┤
│  Pet Profile Spotlight (interactive demo)       │
├─────────────────────────────────────────────────┤
│  Tool Discovery (dog / cat tabs)                │
├─────────────────────────────────────────────────┤
│  Social Proof / Stats Bar                       │
├─────────────────────────────────────────────────┤
│  Monetization Banner (subtle)                   │
├─────────────────────────────────────────────────┤
│  Footer                                         │
└─────────────────────────────────────────────────┘
```

---

## 6. Component Library

### 6.1 Global Navigation

```
┌──────────────────────────────────────────────────────────────┐
│ 🐾 petsMetrics  │  Dogs ▾  │  Cats ▾  │  Tools ▾  │  [My Pets] │
└──────────────────────────────────────────────────────────────┘
```

- **Height**: 64px desktop / 56px mobile
- **Background**: `--brand-navy` (solid), semi-transparent with backdrop-blur on homepage hero overlap
- **Logo**: Left-aligned, 32px height
- **Nav links**: 15px semibold, white, hover: `--brand-teal`
- **Dropdown menus**: Card with 8px border-radius, shadow-lg, tool links grouped by category
- **`[My Pets]` button**: Teal outlined pill button, opens Pet Profile panel
- **Mobile**: Hamburger menu → full-screen slide-in panel

**Mega Menu — Dogs dropdown:**
```
┌────────────────────────────────────────────┐
│ 🐶 Dog Tools                               │
│ ─────────────────────────────────────────  │
│ 🍖 Calorie Calculator                      │
│ 📅 Age Calculator                          │
│ 🐣 Puppy Growth Predictor                  │
│ 💉 Vaccination Schedule                    │
│ 🤰 Gestation Calculator                    │
│ ─────────────────────────────────────────  │
│ ⚠️  Toxic Food Checker  (Shared)           │
└────────────────────────────────────────────┘
```

### 6.2 Pet Profile Selector Bar

Persistent horizontal bar below nav on tool pages (when profiles exist):

```
┌──────────────────────────────────────────────────┐
│ 🐕 Buddy  ·  Labrador  ·  3y  ·  28kg  [Switch ▾] [+ Add Pet] │
└──────────────────────────────────────────────────┘
```

- Height: 48px
- Background: `--gray-50`, border-bottom: `--gray-100`
- Auto-fills all tool inputs from selected profile

### 6.3 Tool Card

```
┌──────────────────────────────────┐
│  [Icon 40px]                     │
│                                  │
│  Tool Name                  [→]  │
│  Short description text          │
│  (2 lines max)                   │
│                                  │
│  [⭐⭐⭐⭐⭐ Traffic]  [Tag: P0]    │
└──────────────────────────────────┘
```

- Border-radius: 12px
- Border: 1px `--gray-200`
- Shadow: `0 1px 3px rgba(0,0,0,0.08)`
- Hover: `translateY(-2px)`, shadow-md, border: `--brand-teal`
- Padding: 24px

### 6.4 Form Elements

**Input Field**
```
Label text *
┌────────────────────────────┐
│  Placeholder text          │
└────────────────────────────┘
Helper text or error message
```

- Height: 48px
- Border-radius: 8px
- Border: 1.5px `--gray-300`
- Focus: border `--brand-teal`, ring `3px rgba(13,148,136,0.15)`
- Error: border `--status-toxic`, helper text red

**Segmented Control (e.g., kg / lb)**
```
┌──────────┬──────────┐
│    kg    │    lb    │
└──────────┴──────────┘
```
- Active segment: `--brand-navy` bg, white text
- Inactive: `--gray-100` bg, `--gray-700` text

**Step Indicator**
```
① Pet Info → ② Activity → ③ Results
```
- Active: filled teal circle
- Complete: teal with checkmark
- Upcoming: gray outline

### 6.5 Result Card

```
┌──────────────────────────────────────────────────┐
│                                                  │
│       1,240 kcal/day                             │
│       Daily Calorie Requirement                  │
│                                                  │
│  ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄  │
│                                                  │
│  That's roughly 285g of [Food Name] per day.     │
│                                                  │
│  ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄  │
│  [🐕 Sponsored] Try The Farmer's Dog →          │
│  ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄  │
│                                                  │
│  ⚕️ This tool provides general reference...      │
│                                                  │
│  [📤 Share]  [📄 Download PDF]  [🔗 Copy Link]  │
└──────────────────────────────────────────────────┘
```

### 6.6 Status Badge (Toxic Checker)

```
● TOXIC     (red bg, white text, warning icon)
● CAUTION   (amber bg, dark text)
● SAFE      (emerald bg, dark text)
```

### 6.7 Disclaimer Block (Required on all result pages)

```
┌──────────────────────────────────────────────────────┐
│ ⚕️  Veterinary Disclaimer                            │
│                                                      │
│  This tool provides general reference information   │
│  only and does not constitute veterinary advice.    │
│  Always consult a licensed veterinarian for health  │
│  decisions.                                          │
└──────────────────────────────────────────────────────┘
```

- Background: `--gray-50`
- Border-left: 3px `--gray-300`
- Font-size: 13px
- Color: `--gray-500`

### 6.8 Affiliate Banner (Result pages only)

```
┌─────────────────────────────────────────────────────┐
│ Sponsored                                           │
│                                                     │
│ [Brand Logo]  Personalized meal plans for Buddy.   │
│               Try The Farmer's Dog — first box 50% │
│               off.                    [Get Offer →] │
└─────────────────────────────────────────────────────┘
```

- Clearly labeled "Sponsored" (FTC compliance)
- Contextually matched to tool output
- Not shown during input flow, only on results

### 6.9 Footer

```
┌──────────────────────────────────────────────────────┐
│ 🐾 petsMetrics                                       │
│ Science-based tools for cat & dog owners.            │
│                                                      │
│ Dogs          Cats           Company                 │
│ Calorie Calc  BCS Calculator About                   │
│ Age Calc      Hydration Calc  Privacy Policy         │
│ Puppy Predict Age Calculator  Terms of Service       │
│ Vaccination   Vaccination     Contact                │
│ Gestation     Gestation                              │
│                                                      │
│ Shared Tools                                         │
│ Toxic Checker · EU Travel Checker                   │
│                                                      │
│ ─────────────────────────────────────────────────── │
│ © 2026 petsMetrics · Not veterinary advice          │
│ [Twitter] [Pinterest] [Reddit]                       │
└──────────────────────────────────────────────────────┘
```

---

## 7. Iconography

**Style**: Line icons with 1.5px stroke, 24px default size, 40px for tool cards.  
**Library**: Lucide Icons (MIT license, tree-shakeable)

| Context | Icon | Name |
|---|---|---|
| Dog tools | 🐕 | `dog` |
| Cat tools | 🐱 | `cat` |
| Calorie / food | `utensils` | |
| Age calculator | `cake` | |
| Vaccination | `syringe` | |
| Gestation | `baby` | |
| Toxic checker | `shield-alert` | |
| EU Travel | `plane` | |
| Insurance | `shield-check` | |
| BARF | `beef` | |
| Hydration | `droplets` | |
| Profile | `user-circle` | |
| Export PDF | `file-down` | |
| Share | `share-2` | |

---

## 8. Motion & Animation

**Principle**: Purposeful motion only. Never animate for decoration alone.

| Interaction | Animation | Duration |
|---|---|---|
| Page transition | Fade in `opacity: 0→1` | 150ms ease-out |
| Card hover | `translateY(-2px)` + shadow | 120ms ease |
| Result reveal | Slide up + fade in | 300ms ease-out |
| Step transition | Slide left/right | 250ms ease-in-out |
| Tooltip | Fade + scale from 0.95 | 100ms ease |
| Loading state | Skeleton shimmer | Infinite |
| Number counter | Count up from 0 | 800ms ease-out |

**Respect `prefers-reduced-motion`**: All animations must have `@media (prefers-reduced-motion)` override.

---

## 9. Accessibility Standards (WCAG 2.1 AA)

- **Color contrast**: Minimum 4.5:1 for body text, 3:1 for large text
- **Focus indicators**: Visible 3px teal outline on all interactive elements
- **ARIA labels**: All form inputs, buttons, status badges
- **Keyboard navigation**: Full tab order, no keyboard traps
- **Screen reader**: Result announcements via `aria-live="polite"`
- **Alt text**: All decorative images with `alt=""`, informative images with descriptive alt

**Contrast check for key pairs**:
- `--gray-700` on `--white`: 7.2:1 ✅
- `--brand-navy` on `--white`: 12.1:1 ✅
- White on `--dog-primary`: 3.4:1 (large text only, supplemented with icon)
- White on `--cat-primary`: 5.8:1 ✅
- White on `--brand-teal`: 4.7:1 ✅

---

## 10. Performance Budget

| Asset | Budget |
|---|---|
| Total JS bundle (gzip) | < 150KB |
| Critical CSS | < 20KB |
| Hero image (WebP) | < 100KB |
| Tool icon sprites | < 30KB |
| First Contentful Paint | < 1.2s |
| Largest Contentful Paint | < 2.5s |
| Cumulative Layout Shift | < 0.1 |
| Time to Interactive | < 3.5s |

**Image strategy**: All images in WebP + AVIF with JPEG fallback. Lazy-load below-the-fold images.  
**Font strategy**: `font-display: swap`, preload critical weights, self-host for GDPR compliance.

---

## 11. SEO Infrastructure

### Meta Template (per tool page)

```html
<title>[Tool Name] for [Dogs/Cats] — Free Calculator | petsMetrics</title>
<meta name="description" content="[Actionable description, 150-160 chars, includes key search term]">
<link rel="canonical" href="https://petsmetrics.com/[path]/">

<!-- Open Graph -->
<meta property="og:title" content="...">
<meta property="og:image" content="/og/[tool-name].png"> <!-- 1200×630 -->
<meta property="og:type" content="website">

<!-- Structured Data -->
<script type="application/ld+json">
{
  "@type": "WebApplication",
  "name": "[Tool Name]",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web"
}
</script>
```

### Schema.org Markup

- Homepage: `Organization`, `WebSite` with sitelinks searchbox
- Tool pages: `WebApplication` + `HowTo` (step-by-step input guides)
- Toxic checker entries: `Article` + `FAQPage` ("Can dogs eat X?")

---

## 12. GDPR & Privacy Design

- **Cookie banner**: Minimal, on first visit only. Options: Accept All / Reject Non-Essential
- **No data collection** except opt-in email (疫苗提醒)
- **localStorage only**: Clear disclosure in Privacy Policy
- **Analytics**: Privacy-first analytics (Plausible.io or Fathom — no cookies, no PII)
- **Font hosting**: Self-hosted (avoids Google Fonts GDPR exposure in EU)
