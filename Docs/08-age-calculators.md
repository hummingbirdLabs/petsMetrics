# Page Design: Dog & Cat Age Calculators

**URLs**:  
- `https://petsmetrics.com/dog/age-calculator/`  
- `https://petsmetrics.com/cat/age-calculator/`  
**Template**: A — Tool Page (2-column with sidebar)  
**Priority**: P0 · Launch Day  
**Social Sharing Value**: Very High ("My dog is 33 in human years!")

---

## 1. Page Goal

High-traffic, socially shareable tool. Users share results on social media → organic backlinks + brand awareness. 

Dog calculator must implement the **corrected size-based formula** (not the oversimplified "7× rule"), citing the 2020 UCSD methylation research to establish scientific credibility.

Cat calculator uses the official **AAHA/AAFP 2021 feline life stage guidelines**.

---

## 2. SEO Metadata

```
Dog page:
Title:    Dog Age Calculator — Convert Dog Years to Human Years | petsMetrics
Desc:     How old is your dog in human years? Our science-based calculator uses breed 
          size and UCSD methylation research — not the outdated 7x rule. Free & instant.
Canonical: https://petsmetrics.com/dog/age-calculator/
Schema:   WebApplication + FAQPage
H1:       Dog Age Calculator: Dog Years to Human Years

Cat page:
Title:    Cat Age Calculator — Cat Years to Human Years | petsMetrics
Desc:     How old is your cat in human years? Based on the official AAHA/AAFP 2021 
          feline life stage guidelines. Know your cat's life stage and health needs.
H1:       Cat Age Calculator: Cat Years to Human Years
```

---

## 3. Full Page Layout

```
┌──────────────────────────────────────────────────────────────────┐
│  Global Nav                                                      │
├──────────────────────────────────────────────────────────────────┤
│  Pet Profile Bar                                                 │
├─────────────────────────────────────┬────────────────────────────┤
│                                     │                            │
│  MAIN CONTENT                       │  SIDEBAR                   │
│                                     │                            │
│  [1] Page Header                    │  [A] Life Stage Tips       │
│  [2] Input Form                     │  [B] Insurance Banner      │
│  [3] Result — Human Age Display     │  [C] Related Tools         │
│  [4] Life Stage Card                │                            │
│  [5] Life Stage Comparison Table    │                            │
│  [6] Science Behind It              │                            │
│  [7] Share CTA                      │                            │
│  [8] Disclaimer                     │                            │
│  [9] SEO FAQ                        │                            │
│                                     │                            │
└─────────────────────────────────────┴────────────────────────────┘
│  Footer                                                          │
```

---

## 4. Dog Age Calculator — Section Specifications

### [1] Page Header

```
📅  Dog Age Calculator                    (H1, 36px)
──────────────────────────────────────────────────────

How old is your dog in human years?
Our calculator uses breed size — not the oversimplified 7× rule.

Breadcrumb: Home > Dogs > Age Calculator
```

---

### [2] Input Form (Dog)

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  My dog's age:                                                  │
│                                                                 │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  3          years                                      │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                 │
│  Plus (optional):   __ months                                   │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  Dog's size / breed:                                            │
│                                                                 │
│  ○  🐩 Small   (< 10 kg / 22 lb) · e.g. Chihuahua, Poodle    │
│  ●  🐕 Medium  (10–25 kg / 22–55 lb) · e.g. Beagle, Cocker   │
│  ○  🦮 Large   (25–45 kg / 55–99 lb) · e.g. Labrador, Husky  │
│  ○  🐕‍🦺 Giant  (> 45 kg / 99 lb+) · e.g. Great Dane         │
│                                                                 │
│  Or:  [Search by breed →]  (sets size automatically)           │
│                                                                 │
│              [Calculate Age →]                                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

Auto-fills from profile if available (age + breed → size).

---

### [3] Result — Human Age Display (Dog)

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  🐕 Buddy (Medium / 3 years)                                   │
│                                                                 │
│       ≈  28  human years                                        │
│                (number: 56px / 700-weight / --gray-900)         │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  In human terms: Buddy is like a 28-year-old adult —           │
│  energetic, in their prime, with many healthy years ahead.     │
│                                                                 │
│  Formula used:  AAHA age guidelines (size-adjusted)            │
│  (Not the oversimplified "7× rule")                             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

Dog page: amber left border / background tint `--dog-surface`.

---

### [4] Life Stage Card (Dog)

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  🌟  Adult — Prime Years                                        │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  At 3 years old, Buddy is in the prime of life. Most large     │
│  breed dogs are fully developed by age 2 and maintain peak     │
│  physical condition through ages 5–7.                          │
│                                                                 │
│  ✅  Health priorities for this life stage:                     │
│  · Annual vet checkups (once per year)                         │
│  · Regular dental cleanings                                     │
│  · Maintain healthy weight (prevent early joint wear)          │
│  · Continue monthly parasite prevention                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

Life stage background: `--dog-primary-light` for dog, `--cat-primary-light` for cat.

**Dog life stages by size** (visual indicator strip):

```
  Puppy      Young Adult    Adult       Senior      Geriatric
  ●──────────●──────────────●───────────●───────────●
  0–1yr      1–3yr         3–7yr       7–10yr      10yr+
                                 ↑
                              Buddy is here
```

---

### [5] Life Stage Comparison Table (Dog — by size)

```
  How Dog Age Converts to Human Years    (H3)
  ─────────────────────────────────────────────

  ┌──────────────┬────────┬────────┬────────┬────────┐
  │ Dog Age      │ Small  │ Medium │ Large  │ Giant  │
  │              │ <10kg  │ 10-25  │ 25-45  │ >45kg  │
  ├──────────────┼────────┼────────┼────────┼────────┤
  │  1 year      │  15    │  15    │  15    │  12    │
  │  2 years     │  24    │  24    │  24    │  22    │
  │  3 years     │  28    │  28    │  28    │  29    │  ← Buddy
  │  4 years     │  32    │  32    │  34    │  35    │
  │  5 years     │  36    │  37    │  40    │  42    │
  │  7 years     │  44    │  47    │  50    │  56    │
  │  10 years    │  56    │  60    │  66    │  78    │
  │  15 years    │  76    │  83    │  93    │  —     │
  └──────────────┴────────┴────────┴────────┴────────┘
  
  ★ Buddy's row highlighted in amber
```

Table note: "Based on AAHA Canine Life Stage Guidelines. Giant breed dogs have a shorter average lifespan, so the scale compresses faster."

---

### [6] The Science Behind It

```
  Why We Don't Use the "7× Rule"       (H3, expandable)
  ─────────────────────────────────────────────────────

  The popular "multiply by 7" formula has no scientific basis.
  Dogs mature rapidly in their first 2 years (reaching sexual
  maturity and full size) then age more slowly afterward.

  Our calculator uses size-adjusted life stage guidelines from:
  · American Animal Hospital Association (AAHA)
  · 2020 UCSD epigenetic methylation study (Labrador reference)
  
  Larger breeds age faster because of their higher metabolic
  rate and faster cell division — not their size per se.

  [Read the UCSD Research →]  (links to PubMed)
  [AAHA Life Stage Guidelines →]
```

This content serves dual purpose: SEO (unique, citable content) + credibility building.

---

### [7] Social Share CTA

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  🐕 Buddy is 28 in human years!                                │
│                                                                 │
│  [Share on Twitter →]   [Share on Facebook →]   [Copy Link]    │
│                                                                 │
│  Pre-filled tweet: "Just found out my dog Buddy is 28 in       │
│  human years! 🐕 Check how old YOUR dog is in human years →    │
│  [link] #DogLife #petsMetrics"                                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### Dynamic OG Share Card (auto-generated per result)

Each result page generates a unique Open Graph image so that when shared on Twitter/Facebook/iMessage, the preview card shows the pet's result — not the generic homepage image. This is the primary driver of viral sharing.

**Tech implementation**: `@vercel/og` or `satori` library. Triggered by URL params (e.g. `/dog/age-calculator/?years=3&size=large&result=28&name=Buddy`). Generates a PNG server-side at build edge, no backend required.

**Share card visual spec** (1200×630px):

```
┌──────────────────────────────────────────────────────────────────┐
│                                              [petsMetrics logo]  │
│                                                                  │
│   🐕  Buddy                                                      │
│       Labrador Retriever · 3 years old                           │
│                                                                  │
│   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━                     │
│                                                                  │
│        28                                                        │
│        in human years                                            │
│                                                                  │
│   Life stage: Young Adult · Prime health years                   │
│   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━                     │
│   petsmetrics.com/dog/age-calculator                             │
└──────────────────────────────────────────────────────────────────┘
```

- Background: `--brand-navy` `#1B2D4F`
- Result number: 96px / white / 800-weight
- Pet name + breed: 28px / white
- Accent bar: `--dog-primary` amber or `--cat-primary` violet (species-specific)
- Font rendered server-side: Plus Jakarta Sans (preloaded as base64 in edge function)
- Cat variant: violet accent, cat emoji, AAHA/AAFP source line

**Cat share card URL params**: `/cat/age-calculator/?years=5&result=36&stage=Prime&name=Luna`

---

## 5. Cat Age Calculator — Differences

### Input Form (Cat)

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  My cat's age:                                                  │
│                                                                 │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  5          years                                      │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                 │
│  Plus (optional):   __ months                                   │
│                                                                 │
│  [Calculate Age →]                                              │
│                                                                 │
│  Note: Cat age conversion doesn't vary by breed size           │
│  (unlike dogs). AAHA/AAFP guidelines apply universally.        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

No size selection needed for cats.

### Cat Result Display

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  🐱 Luna (5 years)                                             │
│                                                                 │
│       ≈  36  human years                                        │
│                                                                 │
│  Luna is in her Prime years — the most active, healthiest      │
│  period of a cat's adult life.                                  │
│                                                                 │
│  Source: AAHA/AAFP Feline Life Stage Guidelines (2021)         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

Violet left border / `--cat-surface` background.

### Cat Life Stage Reference Table (AAHA/AAFP 2021)

```
  ┌──────────────────────┬───────────────┬──────────────────────┐
  │ Cat's Age            │ Human Equiv.  │ Life Stage           │
  ├──────────────────────┼───────────────┼──────────────────────┤
  │ 0–6 months           │ 0–10 years    │ 🐾 Kitten            │
  │ 7–12 months          │ 12–15 years   │ 🐾 Junior            │
  │ 1–6 years            │ 18–40 years   │ 🐾 Prime      ← Luna │
  │ 7–10 years           │ 44–56 years   │ 🐾 Mature            │
  │ 11–14 years          │ 60–72 years   │ 🐾 Senior            │
  │ 15+ years            │ 76+ years     │ 🐾 Geriatric         │
  └──────────────────────┴───────────────┴──────────────────────┘
  
  Source: American Animal Hospital Association / 
          American Association of Feline Practitioners, 2021
```

---

## 6. Sidebar Content

### [A] Life Stage Health Tips

```
┌─────────────────────────────────────────────────────┐
│  🌟 Adult Dog Health Checklist                      │
│  ─────────────────────────────────────────────────  │
│  ✓  Annual vet exam                                 │
│  ✓  Dental cleaning (1–2× per year)                │
│  ✓  Heartworm test + prevention                    │
│  ✓  Weight check (prevent obesity)                 │
│  ✓  Flea/tick prevention (monthly)                 │
└─────────────────────────────────────────────────────┘
```

Dynamically changes based on calculated life stage.

### [B] Insurance Banner

```
┌─────────────────────────────────────────────────────┐
│  Sponsored                                          │
│                                                     │
│  [Trupanion Logo]                                   │
│  Adult dog plans — comprehensive coverage.          │
│  Get a quote in 2 minutes.                          │
│                          [Get Quote →]              │
└─────────────────────────────────────────────────────┘
```

*For senior life stage (7+ years), swap to:*
> "Senior pet insurance — protect your aging companion."

### [C] Related Tools

```
│  💉 Vaccination Schedule                            │
│     See what vaccines are due for Buddy's age.     │
│                                                     │
│  🍖 Calorie Calculator                              │
│     Senior dogs need fewer calories.               │
```

---

## 7. SEO FAQ Section

```
Dog page:
▼  What is the most accurate dog age calculator?
▼  Why is the 7× rule wrong?
▼  When is a dog considered a senior?
▼  How long do large dogs live compared to small dogs?
▼  What life stage is my 5-year-old dog in?

Cat page:
▼  How old is a 10-year-old cat in human years?
▼  When is a cat considered senior?
▼  What is the AAHA/AAFP life stage system?
▼  Do indoor cats live longer than outdoor cats?
```

---

## 8. Mobile Layout

- Input form: Full-width, large number inputs (finger-friendly)
- Result: Full-width, centered large number (56px)
- Life stage strip: Horizontal scroll on mobile
- Comparison table: Horizontal scroll (pinch-to-zoom)
- Share buttons: Row of 3 (Twitter, Facebook, Copy) — icon + abbreviated label
- Sidebar: Below main content
