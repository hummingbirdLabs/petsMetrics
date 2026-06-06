# Page Design: Feeding & Weight Calculators

This document covers three related feeding/nutrition tools:
1. **Dog Calorie / MER Calculator** — `petsmetrics.com/dog/calorie-calculator/`
2. **Cat BCS & Weight Management Calculator** — `petsmetrics.com/cat/bcs-weight-tracker/`
3. **Cat Hydration Calculator** — `petsmetrics.com/cat/hydration-calculator/`
4. **Puppy Growth Predictor** — `petsmetrics.com/dog/puppy-growth-predictor/`

All are **P0 · Launch Day**.

---

# TOOL 1: Dog Calorie / MER Calculator

**URL**: `petsmetrics.com/dog/calorie-calculator/`  
**Template**: A — Tool Page (2-column with sidebar)

## 1. SEO Metadata

```
Title:    Dog Calorie Calculator — How Much to Feed Your Dog | petsMetrics
Desc:     Calculate your dog's exact daily calorie needs using the AAFCO MER formula. 
          Get feeding amounts for any dog food brand. Based on weight & activity level.
H1:       Dog Daily Calorie Calculator
```

**Target keywords**: "how much to feed my dog", "dog calorie calculator", "dog daily food amount", "dog MER calculator"

---

## 2. Input Form

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  Step 1 of 2 — About Buddy              (step indicator dots)   │
│                                                                 │
│  Current weight *                                               │
│  ┌────────────────────────────┬──────────────┐                 │
│  │  28                        │  kg  │  lb   │                 │
│  └────────────────────────────┴──────────────┘                 │
│                                                                 │
│  Life stage / Activity level *                                  │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Activity Scenario                         Coefficient  │   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │  ○  Puppy under 4 months                        3.0    │   │
│  │  ○  Puppy 4 months to adult                     2.0    │   │
│  │  ●  Adult, neutered (typical)            ←      1.6    │   │
│  │  ○  Adult, intact (unneutered)                  1.8    │   │
│  │  ○  Weight loss / obese tendency                1.0    │   │
│  │  ○  Senior dog (7+ years)                       1.4    │   │
│  │  ○  Active / working dog                    2.5–4.8   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  Step 2 of 2 — Your Dog Food (optional)                         │
│                                                                 │
│  Dog food caloric density (if known):                           │
│  ┌───────────────────────────────────────────┐                 │
│  │  e.g. 3500  kcal/kg   (check your bag)   │                 │
│  └───────────────────────────────────────────┘                 │
│  Leave blank to get kcal/day only.                              │
│                                                                 │
│              [Calculate →]                                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Results Display

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  🍖 Buddy's Daily Calorie Needs                                 │
│                                                                 │
│       1,117  kcal / day                 (48px / 700-weight)    │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  How we calculated this:                                        │
│                                                                 │
│  RER  =  70 × (28 kg)^0.75  =  697 kcal/day                   │
│  MER  =  697 × 1.6 (neutered adult)  =  1,115 kcal/day        │
│                                                                 │
│  Source: AAFCO / AAHA Energy Requirements for Dogs             │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  If your food has 3,500 kcal/kg:                               │
│                                                                 │
│       319 g / day              (28px bold)                      │
│       ( ≈  2 cups for typical kibble density )                 │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  📊 Daily breakdown (if feeding twice):                         │
│     Morning:  160 g  (1 cup)                                   │
│     Evening:  159 g  (1 cup)                                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

Formula transparency: Show the full RER and MER calculation inline. This builds credibility and differentiates from "black box" calculators.

**Formula display styling**:
- Monospace font for numbers
- `RER =` and `MER =` labels: `--gray-500`
- Result values: `--gray-900` bold

**Affiliate banner (after result)**:

```
┌─────────────────────────────────────────────────────────────────┐
│  Sponsored                                                      │
│                                                                 │
│  [The Farmer's Dog Logo]                                        │
│  Personalized meal plans calculated just for Buddy.            │
│  Fresh ingredients, vet-developed recipes.                      │
│  First box: 50% off.                     [Try It →]            │
└─────────────────────────────────────────────────────────────────┘
```

---

# TOOL 2: Cat BCS & Weight Management Calculator

**URL**: `petsmetrics.com/cat/bcs-weight-tracker/`  
**Template**: A — Tool Page (2-column)

## 1. SEO Metadata

```
Title:    Cat Body Condition Score Calculator — Is My Cat Overweight? | petsMetrics
Desc:     Use our visual BCS assessment to check if your cat is a healthy weight. 
          Get a safe weight-loss calorie plan. Based on AAHA 9-point BCS scale.
H1:       Cat Body Condition Score & Weight Calculator
```

---

## 2. BCS Assessment Flow (3-step visual quiz)

### Step 1 — Feel Your Cat's Ribs

```
┌─────────────────────────────────────────────────────────────────┐
│  Step 1 of 3  ●○○                                              │
│                                                                 │
│  Run your fingers along your cat's ribcage.                     │
│  What do you feel?                           (H2, centered)     │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                                                           │  │
│  │  ○  Ribs very prominent, no fat covering — bones visible  │  │
│  │     [Illustration: thin cat silhouette]                   │  │
│  │                                                           │  │
│  │  ○  Ribs easily felt with no fat layer                    │  │
│  │     [Illustration: lean cat silhouette]                   │  │
│  │                                                           │  │
│  ●  Ribs felt with slight fat covering (ideal)               │  │
│  │     [Illustration: ideal cat silhouette]   ← default      │  │
│  │                                                           │  │
│  │  ○  Ribs difficult to feel, moderate fat layer            │  │
│  │     [Illustration: slightly heavy cat]                    │  │
│  │                                                           │  │
│  │  ○  Ribs cannot be felt, heavy fat layer                  │  │
│  │     [Illustration: obese cat silhouette]                  │  │
│  │                                                           │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│                             [Next →]                            │
└─────────────────────────────────────────────────────────────────┘
```

**Illustrations**: Simple SVG line drawings of cat body profiles (not photographs). Must be distinctive enough to guide self-assessment but not medically authoritative.

---

### Step 2 — Waist Viewed from Above

```
┌─────────────────────────────────────────────────────────────────┐
│  Step 2 of 3  ●●○                             [← Back]         │
│                                                                 │
│  Look at your cat from directly above.                          │
│  What is the waist shape?                                       │
│                                                                 │
│  ○  No waist visible — rectangular/oval body shape             │
│     [Top-view SVG: no visible waist]                            │
│                                                                 │
│  ●  Slight hourglass shape visible behind ribs   (ideal)        │
│     [Top-view SVG: gentle tuck behind ribs]                     │
│                                                                 │
│  ○  No waist — belly extends to same width as chest            │
│     [Top-view SVG: barrel shape]                                │
│                                                                 │
│                             [Next →]                            │
└─────────────────────────────────────────────────────────────────┘
```

---

### Step 3 — Weight & Desired Goal

```
┌─────────────────────────────────────────────────────────────────┐
│  Step 3 of 3  ●●●                             [← Back]         │
│                                                                 │
│  Current weight (if known):                                     │
│  ┌────────────────────────────┬──────────────┐                 │
│  │  4.5                       │  kg  │  lb   │                 │
│  └────────────────────────────┴──────────────┘                 │
│                                                                 │
│  Activity level:                                                │
│  ○  Indoor, sedentary (mostly sleeping)                         │
│  ●  Indoor, moderately active                                   │
│  ○  Indoor-outdoor mix                                          │
│                                                                 │
│              [Calculate BCS & Calorie Plan →]                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. BCS Results Display

### Case A: Ideal Weight (BCS 4–5/9)

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  ✅  Luna is at an ideal weight!           (emerald banner)     │
│                                                                 │
│  Body Condition Score:  5 / 9                                   │
│  Estimated ideal weight range:  4.0–5.0 kg                     │
│                                                                 │
│  Luna's daily calorie target: 220 kcal/day                     │
│  (Maintenance, neutered indoor adult)                           │
│                                                                 │
│  Keep it up! Weigh Luna monthly to maintain ideal condition.   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Case B: Overweight (BCS 6–7/9)

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  ⚠️  Luna is slightly overweight           (amber banner)       │
│                                                                 │
│  Body Condition Score:  6 / 9                                   │
│  Current weight: 5.2 kg · Ideal range: 4.0–5.0 kg             │
│  Excess weight: ~0.2–1.2 kg                                    │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  🎯  Recommended weight-loss plan:                              │
│                                                                 │
│  Daily calorie target:  176 kcal/day                           │
│  (80% of ideal-weight RER — safe minimum for cats)             │
│  Estimated time to ideal weight: 16–20 weeks                   │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  ⚠️  IMPORTANT: Do not reduce below 176 kcal/day for cats.     │
│  Rapid weight loss can cause Hepatic Lipidosis (fatty liver     │
│  disease), a serious and potentially fatal condition.          │
│  If you are unsure about your cat's body condition, have your  │
│  cat weighed and assessed at a veterinary clinic before making │
│  dietary changes.                                               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### BCS Visual Scale

```
  BCS 1    BCS 2    BCS 3    BCS 4    BCS 5    BCS 6    BCS 7    BCS 8    BCS 9
  ●────────●────────●────────●────────●────────●────────●────────●────────●
  Very thin                  Ideal                              Obese
                                              ↑ Luna
```

Color gradient: red → amber → green → amber → red (visual severity indicator).

---

# TOOL 3: Cat Hydration Calculator

**URL**: `petsmetrics.com/cat/hydration-calculator/`  
**Template**: A — Tool Page (2-column)

## 1. SEO Metadata

```
Title:    Cat Water Intake Calculator — How Much Water Does My Cat Need? | petsMetrics
Desc:     Calculate your cat's daily water needs based on weight and diet. Find out if 
          your cat is drinking enough. Includes dehydration self-check quiz.
H1:       Cat Daily Water Intake Calculator
```

---

## 2. Input Form

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  About Luna's diet                                              │
│                                                                 │
│  Current weight *                                               │
│  ┌────────────────────────────┬──────────────┐                 │
│  │  4.5                       │  kg  │  lb   │                 │
│  └────────────────────────────┴──────────────┘                 │
│                                                                 │
│  Daily food intake:                                             │
│                                                                 │
│  Dry food (kibble):                                             │
│  ┌──────────────────────────┐  grams per day                   │
│  │  40                      │  (enter 0 if not fed)            │
│  └──────────────────────────┘                                   │
│                                                                 │
│  Wet food / canned:                                             │
│  ┌──────────────────────────┐  grams per day                   │
│  │  85                      │  (one standard can ≈ 85–156g)    │
│  └──────────────────────────┘                                   │
│                                                                 │
│              [Calculate Water Needs →]                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Results Display

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  💧 Luna's Daily Water Needs                                    │
│                                                                 │
│  Total daily water requirement:  225 ml / day                  │
│  Water from food:               72 ml  (dry 4ml + wet 68ml)   │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  💧  Luna needs to drink at least:                             │
│                                                                 │
│       153 ml / day  from her water bowl                         │
│       (about ⅔ cup, or 5 oz)           (32px bold, violet)     │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  Calculation breakdown:                                         │
│  Total need = 4.5 kg × 50 ml = 225 ml                         │
│  Dry food water (40g × 10%) = 4 ml                             │
│  Wet food water (85g × 80%) = 68 ml                            │
│  Remaining to drink = 225 – 72 = 153 ml                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

### Dehydration Self-Check Quiz

```
  🔍  5-Minute Dehydration Check for Luna    (H3)
  ─────────────────────────────────────────────────

  Answer 5 quick questions to check for dehydration signs:

  1. Does Luna's skin spring back quickly when gently pinched?
     ● Yes, immediately    ○ Slowly (1–2 sec)    ○ Very slowly / stays tented

  2. Are Luna's gums moist and pink?
     ● Yes                 ○ Dry / tacky         ○ Pale

  3. How often does Luna use the litter box per day?
     ● 2–4 times          ○ 1 time               ○ Not today

  4. Is Luna's urine pale yellow?
     ● Yes                ○ Dark yellow / orange ○ Uncertain

  5. Is Luna drinking from her bowl today?
     ● Yes                ○ Unusual — less than normal  ○ I haven't seen her drink

  [Check for Dehydration Signs →]
```

**Quiz result**:
- All "Yes": "Luna appears well-hydrated. Keep monitoring daily."
- 1–2 concerns: "Some potential hydration concerns. Monitor closely and consult your vet if symptoms persist."
- 3+ concerns: "Signs of possible dehydration. We recommend consulting your vet soon." (+ emergency vet link)

**Affiliate banner**:
```
  Sponsored: "Luna needs 153ml/day — wet food helps!
  Chewy: Shop vet-recommended wet cat food →"
```

---

# TOOL 4: Puppy Growth Predictor

**URL**: `petsmetrics.com/dog/puppy-growth-predictor/`  
**Template**: A — Tool Page (2-column)

## 1. SEO Metadata

```
Title:    Puppy Growth Chart Calculator — Predict Adult Weight | petsMetrics
Desc:     How big will my puppy get? Predict adult weight from current age and weight. 
          Includes a personalized growth curve chart. AAHA breed size guidelines.
H1:       Puppy Growth Predictor & Adult Weight Calculator
```

---

## 2. Input Form

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  About your puppy                                               │
│                                                                 │
│  Current age *                                                  │
│  ┌──────────────────┐  weeks old                               │
│  │  12              │  (or switch to months)                    │
│  └──────────────────┘                                           │
│                                                                 │
│  Current weight *                                               │
│  ┌────────────────────────────┬──────────────┐                 │
│  │  4.2                       │  kg  │  lb   │                 │
│  └────────────────────────────┴──────────────┘                 │
│                                                                 │
│  Breed size:                                                    │
│  ○  Small (< 10 kg adult)        ○  Medium (10–25 kg adult)    │
│  ○  Large (25–45 kg adult)       ○  Giant (> 45 kg adult)      │
│  [Or search by breed for automatic size →]                     │
│                                                                 │
│              [Predict Adult Size →]                             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Results Display

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  🐣 Buddy Jr.'s Predicted Adult Size                            │
│                                                                 │
│  Estimated adult weight:  22–26 kg  (48–57 lb)                 │
│  Estimated full growth by:  10–12 months                       │
│                                                                 │
│  (Based on: 12-week weight of 4.2 kg, Medium breed)            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Growth Curve Chart

```
  Growth Curve — Buddy Jr. (Medium Breed)     (H3)
  ──────────────────────────────────────────────────

  Weight
  (kg)
  28 │                                      ......■ Predicted max
  26 │                                  ..··
  24 │                              ..··
  22 │                          ..··
  20 │                      ..··
  18 │                  ..··
  16 │              ..··
  14 │          ..··
  12 │      ..··
  10 │  ..··
   8 │ ·
   6 │●                     ← Today (week 12, 4.2 kg)
   4 │
   2 │
     └─────────────────────────────────────────────────────
       8wk  12wk  16wk  20wk  4mo  6mo  8mo  10mo  12mo  18mo
```

**Chart component**: Chart.js line chart (< 15KB)
- X-axis: Age in weeks/months
- Y-axis: Weight in kg or lb (toggle)
- **Solid line**: Breed median growth curve
- **Shaded band**: 25th–75th percentile range
- **Red dot**: Current puppy position (today)
- **Dashed line**: Projected trajectory to adult weight
- Tooltip on hover: shows expected weight at each age

**Visual**: Amber-colored chart for dog pages, clean grid lines `--gray-100`.

---

## 4. Sidebar (All Four Tools)

All four tools share this sidebar structure:

**[A] Affiliate Banner** — context-matched to tool:
- Calorie calc → The Farmer's Dog / Nom Nom
- BCS calc → Hill's Prescription Diet (affiliate)
- Hydration → Chewy wet food
- Puppy predictor → Nom Nom puppy plans

**[B] Related Tools** — cross-links to complementary tools

**[C] Formula Source** — brief citation box showing data source

---

## 5. Mobile Layouts

All four tools:
- Input forms: Full-width, single-column
- Results: Full-width result cards (no sidebar on mobile)
- Charts: Touch-friendly (pinch zoom, tap for data points)
- Affiliate banners: Full-width below results
- Related tools: Horizontal scroll cards
