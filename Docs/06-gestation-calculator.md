# Page Design: Gestation & Due Date Calculator

**URLs**:  
- `https://petsmetrics.com/dog/gestation-calculator/`  
- `https://petsmetrics.com/cat/gestation-calculator/`  
**Template**: A — Tool Page (2-column with sidebar)  
**Priority**: P0 · Launch Day  
**Applies to**: Dogs (63 days avg) and Cats (65 days avg) — same page template, different data

---

## 1. Page Goal

Serve breeders and new pet owners who want to:
1. Calculate pregnancy due date from mating date
2. Understand key veterinary milestones during gestation
3. Prepare for whelping/queening

**Primary monetization**: Insurance affiliate banner (new litter = insurance sales spike).  
**SEO targets**: "dog pregnancy calculator", "dog due date calculator", "how long is a dog pregnant", "cat pregnancy calculator"

---

## 2. SEO Metadata

```
Dog page:
Title:    Dog Pregnancy Calculator — Whelping Due Date & Milestones | petsMetrics
Desc:     Calculate your dog's due date from mating date. See key pregnancy milestones, 
          vet checkup windows, and whelping preparation timeline. Based on 63-day avg.
Canonical: https://petsmetrics.com/dog/gestation-calculator/
Schema:   WebApplication + FAQPage
H1:       Dog Pregnancy Calculator

Cat page:
Title:    Cat Pregnancy Calculator — Queening Due Date & Milestones | petsMetrics
H1:       Cat Pregnancy Calculator
```

---

## 3. Full Page Layout

```
┌──────────────────────────────────────────────────────────────────┐
│  Global Nav  (Dogs tab active for dog page)                      │
├──────────────────────────────────────────────────────────────────┤
│  Pet Profile Bar                                                 │
├─────────────────────────────────────┬────────────────────────────┤
│                                     │                            │
│  MAIN CONTENT                       │  SIDEBAR                   │
│                                     │                            │
│  [1] Page Header                    │  [A] Quick Facts           │
│  [2] Calculator Form                │  [B] Insurance Banner      │
│  [3] Results Section                │  [C] Related Tools         │
│      - Due Date Display             │                            │
│      - Milestone Timeline           │                            │
│      - Preparation Checklist        │                            │
│  [4] Disclaimer                     │                            │
│  [5] Share / Save                   │                            │
│  [6] SEO FAQ                        │                            │
│                                     │                            │
└─────────────────────────────────────┴────────────────────────────┘
│  Footer                                                          │
```

---

## 4. Section Specifications

### [1] Page Header

```
🤰  Dog Pregnancy Calculator              (H1, 36px)
─────────────────────────────────────────────────────

Calculate your dog's due date, track key developmental
milestones, and prepare for whelping.

Breadcrumb: Home > Dogs > Gestation Calculator
```

---

### [2] Calculator Form

**Step 1 — Mating Date Input**

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  When did mating occur?                  (H3)                   │
│                                                                 │
│  First mating date *                                            │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  📅  MM / DD / YYYY                                       │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  + Add another mating date (if multiple occurred)               │
│                                                                 │
│  (Optional) Second mating date                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  📅  MM / DD / YYYY                                       │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  💡 If multiple matings occurred, we'll calculate a range       │
│     showing earliest possible, most likely, and latest date.   │
│                                                                 │
│              [Calculate Due Date →]                             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

- Date picker: native `<input type="date">` for mobile compatibility; styled with CSS
- Max date: today (can't set future mating dates)
- "Add another date" link: reveals second date field with animation
- CTA: Large teal button, full-width on mobile

---

### [3] Results Section

#### Result A — Due Date Hero Display

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  📅  Expected Whelping Date            (label, 14px teal)       │
│                                                                 │
│       August 7, 2026                   (32px bold, --gray-900)  │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  Possible window:   August 2  →  August 12, 2026               │
│  (Days remaining:   58 days from today)                         │
│                                                                 │
│  Based on: Average canine gestation of 63 days (range 58–68)   │
│            First mating: June 5, 2026                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Visual**: Dog page = amber left border; Cat page = violet left border.

---

#### Result B — Milestone Timeline

A visual horizontal (desktop) or vertical (mobile) timeline:

```
  ──────────────────────────────────────────────────────────────
  
  Day 0         Day 28         Day 45         Day 55         Day 63
  Jun 5         Jul 3          Jul 20         Jul 30         Aug 7
    │              │              │              │              │
    ●──────────────●──────────────●──────────────●──────────────●
    │              │              │              │              │
  Mating        Ultrasound     X-ray          Prepare        Due Date
  occurred      recommended    puppies        whelping
                (confirm       visible        box
                pregnancy)
```

**Timeline component**:
- Each milestone: circle dot (filled teal if past, gray if future, pulsing amber if "now")
- Milestone card on hover/tap:
  ```
  ┌─────────────────────────────────────────────────┐
  │  Day 28 · July 3, 2026                          │
  │  Ultrasound Recommended                         │
  │  Your vet can confirm pregnancy and estimate    │
  │  litter size via ultrasound from day 25–35.    │
  │  [Why this matters →]  (expandable)             │
  └─────────────────────────────────────────────────┘
```
- Mobile: vertical timeline (top-to-bottom), cards always visible (no hover)

**Dog milestones**:

| Day | Date | Milestone | Action |
|---|---|---|---|
| 0 | Mating | Conception possible | Monitor for pregnancy signs |
| 21 | Day 21 | Morning sickness possible | Normal, short-lived |
| 25–35 | Day 25–35 | Ultrasound window | Book vet appointment |
| 42–45 | Day 42–45 | Skeletal X-ray | Count fetus skeletons (from day 45) |
| 55 | Day 55 | Prepare whelping box | Quiet, warm, accessible location |
| 58 | Day 58 | Early whelping possible | Begin temperature monitoring |
| 63 | Day 63 | Most likely due date | Expected whelping |
| 68 | Day 68 | Late boundary | Contact vet if no whelping |

**Cat milestones**:

| Day | Date | Milestone |
|---|---|---|
| 0 | Mating | Conception possible |
| 14–21 | Day 14–21 | Pinking of nipples visible |
| 21–25 | Day 21–25 | Ultrasound confirms pregnancy |
| 45 | Day 45 | Skeletal X-ray possible |
| 60 | Day 60 | Prepare queening box |
| 63 | Day 63 | Earliest queening |
| 65 | Day 65 | Most likely due date |
| 67 | Day 67 | Late boundary, contact vet |

---

#### Result C — Preparation Checklist

Expandable accordion below timeline:

```
  ▼  Whelping Preparation Checklist
  ─────────────────────────────────────────────────────────────

  □  Schedule ultrasound appointment (Days 25–35)
  □  Schedule X-ray appointment (from Day 45)
  □  Set up whelping box by Day 55
     → Recommended box size: [auto-calculated from breed size]
  □  Gather whelping supplies
     → Thermometer, clean towels, heating pad, scale
  □  Identify 24-hour emergency vet clinic
  □  Begin rectal temperature monitoring from Day 60
     → Temperature drop below 99°F signals whelping in 12–24 hours
```

Checklist items are interactive (checkboxes), state saved to localStorage.

---

#### Disclaimer

```
⚕️  This calculator provides general estimates based on average gestation
    periods. Individual pregnancies may vary. Always consult a licensed
    veterinarian for prenatal care and whelping assistance.
```

---

#### Share / Save Row

```
  [📤 Share]  [📄 Download Timeline PDF]  [🔗 Copy Link]
              ($0 · free for this tool)
```

PDF download includes: due date, date range, full milestone timeline, preparation checklist.

---

## 5. Sidebar Content

### [A] Quick Facts

```
┌─────────────────────────────────────────────────────┐
│  🐕 Dog Pregnancy Facts                             │
│  ─────────────────────────────────────────────────  │
│  Average gestation: 63 days                         │
│  Range: 58–68 days                                  │
│  Average litter size: 5–6 (varies by breed)        │
│  Confirmation method: Ultrasound (day 25–35)        │
│  Source: AVMA / AAHA                                │
└─────────────────────────────────────────────────────┘
```

### [B] Insurance Banner (Primary monetization)

```
┌─────────────────────────────────────────────────────┐
│  Sponsored                                          │
│                                                     │
│  [Lemonade Logo]                                    │
│  Insure the new arrivals from day one.              │
│  Puppy plans start at $10/month.                    │
│                                                     │
│  [Get a Quote →]              Affiliate link        │
└─────────────────────────────────────────────────────┘
```

Shown only on result page, not input page.

### [C] Related Tools

```
┌─────────────────────────────────────────────────────┐
│  Related Tools                                      │
│  ─────────────────────────────────────────────────  │
│  💉 Puppy Vaccination Schedule                      │
│     Plan ahead for the new litter.                  │
│                                                     │
│  🐣 Puppy Growth Predictor                          │
│     Track growth milestones post-birth.             │
│                                                     │
│  🍖 Calorie Calculator                              │
│     Nursing mothers need extra calories.            │
└─────────────────────────────────────────────────────┘
```

---

## 6. SEO FAQ Section

```
  Frequently Asked Questions           (H2, FAQPage schema)
  ─────────────────────────────────────

  ▼  How long is a dog pregnant?
     63 days on average, ranging from 58 to 68 days from mating.

  ▼  How can I tell if my dog is pregnant without a vet?
     Signs include nipple enlargement, behavioral changes, and 
     nesting. Ultrasound is the only reliable confirmation (day 25–35).

  ▼  When should I take my pregnant dog to the vet?
     First visit: Days 25–35 for ultrasound. Second: Day 45 for X-ray.

  ▼  What is a whelping box and when do I need one?
     A safe, enclosed birthing space. Set up by Day 55.

  ▼  Is the same pregnancy calculator used for cats?
     Cats have a slightly different timeline. Use our Cat Pregnancy 
     Calculator for accurate cat-specific results.
```

---

## 7. Mobile Layout

- Form: Full-width, single column
- CTA: Full-width, fixed at bottom on mobile during form step
- Timeline: Vertical (top-to-bottom), cards below each milestone dot
- Results above sidebar content (sidebar moves to bottom)
- Share buttons: 3-button row, icon only on small screens (< 400px)

---

## 8. Visual Hierarchy Summary

| Element | Visual Priority | Size / Weight |
|---|---|---|
| Due date | Highest | 32px / 700 |
| Date range | High | 18px / 400 |
| Timeline | High | Custom SVG component |
| Milestone cards | Medium | 14px / 400 |
| Preparation checklist | Medium | 15px / 400 |
| Disclaimer | Low | 13px / 400, gray |
| FAQ | Low | 15px / 400 |
