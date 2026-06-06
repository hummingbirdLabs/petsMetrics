# Page Design: P0/P1 Tools — EU Travel Checker, BARF Calculator, Insurance Estimator

This document covers tools across two priority tiers:

**P0 (launch day):**
- **EU Pet Travel Requirements Checker** — `petsmetrics.com/shared/eu-pet-travel-checker/` ← **upgraded from P1**

**P1 (within 3 months of P0):**
- **BARF Raw Feeding Calculator** — `petsmetrics.com/shared/barf-calculator/`
- **Pet Insurance Cost Estimator** — `petsmetrics.com/shared/pet-insurance-estimator/`

> **EU Travel Checker priority upgrade rationale**: This is the only English-language tool covering EU pet travel requirements with low competition (DA < 30 incumbents). It is the fastest path to acquiring media backlinks from European pet publications and travel blogs — a critical lever for early domain authority. It launches with P0 tools to immediately target the European market and seed the external link profile. See README §3.2 for full link-building strategy.

---

# TOOL 1: EU Pet Travel Requirements Checker ← P0

**URL**: `petsmetrics.com/shared/barf-calculator/`  
**Template**: A — Tool Page (2-column with sidebar)  
**Audience**: High-intent raw feeding community (Reddit r/rawpetfood 400k+ members)  
**Monetization**: Paid PDF download ($4.99) — highest-converting paid product

---

## 1. SEO Metadata

```
Title:    BARF Calculator — Raw Feeding Portions for Dogs & Cats | petsMetrics
Desc:     Calculate exact raw feeding portions using scientifically validated BARF ratios. 
          Dog and cat daily amounts by ingredient. Download weekly shopping list PDF.
Canonical: https://petsmetrics.com/shared/barf-calculator/
Schema:   WebApplication + FAQPage
H1:       BARF & Raw Feeding Calculator for Dogs and Cats
```

---

## 2. Full Page Layout

```
┌──────────────────────────────────────────────────────────────────┐
│  Global Nav                                                      │
├──────────────────────────────────────────────────────────────────┤
│  Pet Profile Bar                                                 │
├─────────────────────────────────────┬────────────────────────────┤
│                                     │                            │
│  MAIN CONTENT                       │  SIDEBAR                   │
│                                     │                            │
│  [1] Page Header + species toggle   │  [A] What is BARF?        │
│  [2] Input Form                     │  [B] Safety Warning        │
│  [3] Daily Portions Result          │  [C] Related Tools         │
│  [4] Weekly Shopping List Preview   │                            │
│  [5] Paid PDF CTA                   │                            │
│  [6] Disclaimer                     │                            │
│  [7] SEO FAQ                        │                            │
│                                     │                            │
└─────────────────────────────────────┴────────────────────────────┘
│  Footer                                                          │
```

---

## 3. Species Toggle

```
  Calculate for:
  ┌──────────────────┬──────────────────┐
  │  🐕  Dog         │  🐱  Cat         │
  └──────────────────┴──────────────────┘
```

Selecting cat hides "Vegetables/Berries" row in results (cats don't require plant matter in BARF).

---

## 4. Input Form

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  Target body weight *                                           │
│  ┌────────────────────────────┬──────────────┐                 │
│  │  28                        │  kg  │  lb   │                 │
│  └────────────────────────────┴──────────────┘                 │
│  Use ideal weight for overweight pets, not current weight.      │
│                                                                 │
│  Daily feeding percentage *                                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Feeding %: [────────●────────────] 2.5%                 │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ○  1.5% — Weight loss / obese                                  │
│  ○  2.0% — Sedentary adult                                      │
│  ●  2.5% — Active adult (typical)    ← default                 │
│  ○  3.0% — Very active / working dog                            │
│  ○  10%  — Puppy (< 6 months)                                  │
│                                                                 │
│  Optional — Ingredients I have / prefer:                        │
│  ☑ Chicken    ☑ Beef     ☑ Pork     □ Venison                  │
│  ☑ Chicken bones  ☑ Beef bones   □ Turkey wings                │
│  ☑ Chicken liver  □ Duck liver   ☑ Beef liver                  │
│  ☑ Kidney    ☑ Spleen   □ Pancreas                             │
│  ☑ Leafy greens  ☑ Blueberries  □ Broccoli  (dog only)        │
│                                                                 │
│              [Calculate Portions →]                             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5. Daily Portions Result

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  🥩 Buddy's Daily Raw Feeding Plan         (H2)                 │
│  Target: 2.5% of 28 kg = 700g / day total                      │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Component              % of Diet   Daily Amount          │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │  🥩 Muscle Meat          70%         490g  (1.08 lb)      │  │
│  │     e.g. Chicken thigh,              ──────────────────   │  │
│  │     Beef mince                       245g AM + 245g PM    │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │  🦴 Raw Meaty Bone        10%          70g               │  │
│  │     e.g. Chicken wing,               ──────────────────   │  │
│  │     Beef neck                        35g AM or PM        │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │  🫀 Liver                  5%          35g               │  │
│  │     ⚠️ MAX per week:      ───         245g (DO NOT exceed)│  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │  🫁 Secreting Organ        5%          35g               │  │
│  │     e.g. Kidney, spleen               Alternate daily    │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │  🥦 Vegetables/Berries    10%          70g               │  │
│  │     (Dog only)                        Blended/pureed     │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ⚠️  Liver warning: Exceeding 5% of diet can cause            │
│     Vitamin A toxicity. Never exceed 5% weekly.               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 6. Weekly Shopping List Preview & PDF CTA

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  📋 Weekly Shopping List Preview                                │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  For 7 days of feeding:                                         │
│                                                                 │
│  🥩 Muscle Meat:     3.43 kg  total                            │
│  🦴 Raw Meaty Bone:  0.49 kg  total   (blurred — preview only) │
│  🫀 Liver:           0.24 kg  total   (blurred — preview only) │
│  🫁 Secreting Organ: 0.24 kg  total   (blurred — preview only) │
│  🥦 Vegetables:      0.49 kg  total   (blurred — preview only) │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  📄  Download the Full Weekly Shopping List                     │
│                                                                 │
│  · Itemized ingredients with exact weights per day             │
│  · 7-day rotation plan for variety                             │
│  · Printable grocery checklist format                           │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  🔒  Download PDF — $4.99                                 │  │
│  │  [Pay with Card]  or  [Pay with PayPal]                  │  │
│  │                                                          │  │
│  │  Processed by Stripe · Secure · Instant download         │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  Or: $9.99/year — unlimited downloads for all your pets         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Payment implementation**: Stripe Payment Links (no backend required). Redirects to Stripe-hosted checkout.

---

# TOOL 2: EU Pet Travel Requirements Checker ← **P0 · Launch Day**

**URL**: `petsmetrics.com/shared/eu-pet-travel-checker/`  
**Template**: A — Tool Page (2-column)  
**Strategic priority**: Best chance for early media coverage and backlinks (niche, no strong competitors in English). Launched with P0 tools to seed EU domain authority from day one.

---

## 1. SEO Metadata

```
Title:    EU Pet Travel Requirements Checker 2026 — Dogs & Cats | petsMetrics
Desc:     Check official EU pet travel requirements by destination country. Microchip, 
          rabies vaccination, tapeworm treatment, pet passport & more. Updated 2026.
Canonical: https://petsmetrics.com/shared/eu-pet-travel-checker/
Schema:   WebApplication + FAQPage
H1:       EU Pet Travel Requirements Checker
```

---

## 2. Input Form

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  Your travel details                                            │
│                                                                 │
│  Departing from:                                                │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  🇩🇪  Germany                                         ▾  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  Destination:                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  🇬🇧  United Kingdom                                   ▾  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  Pet type:                                                      │
│  ┌──────────────────┬──────────────────┐                       │
│  │  🐕  Dog         │  🐱  Cat         │                       │
│  └──────────────────┴──────────────────┘                       │
│                                                                 │
│  What documents do you already have? (check all that apply)     │
│  ☑  EU Pet Passport                                            │
│  ☑  Microchip (ISO 11784/11785)                               │
│  ☑  Rabies vaccination (current)                               │
│  □  Rabies antibody titre test (blood test)                    │
│  □  Tapeworm treatment certificate                              │
│  □  Health certificate from vet (AHC)                          │
│                                                                 │
│  Planned travel date:                                           │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  📅  MM / DD / YYYY                                       │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│              [Check Requirements →]                             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Results Display

### Checklist Result

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  ✈️  Germany → United Kingdom — Dog Travel Requirements (2026)  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Requirements                    Status    Deadline       │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │  ✅ Microchip (ISO 15-digit)     Complete  —              │  │
│  │  ✅ Rabies Vaccination           Complete  —              │  │
│  │  ❌ AHC (Animal Health Cert.)   Missing   Get before     │  │
│  │     (from accredited UK vet)              Jul 1, 2026    │  │
│  │  ❌ Tapeworm Treatment           Missing   1–5 days       │  │
│  │     (Praziquantel, documented)             before entry  │  │
│  │  ✅ EU Pet Passport              Complete  UK entry: ✓   │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  ❗  2 requirements missing. You may be denied entry.           │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  📋  What you need to do:                                       │
│                                                                 │
│  1.  Get an Animal Health Certificate (AHC)                     │
│      · Must be issued by a UK-government-listed vet             │
│      · Valid for 10 days from date of issue to entry           │
│      · ⚠️ Cannot be issued by a vet in Germany                 │
│      → Timeline: Book appointment at least 2 weeks before      │
│                                                                 │
│  2.  Get Tapeworm Treatment                                     │
│      · Must contain praziquantel                                │
│      · Must be administered by a vet AND documented            │
│      · Must be done 1–5 days before entry into UK             │
│      · Exact timing matters — too early or late = denied       │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  📎  Official Sources:                                          │
│  · UK Gov: Pet travel rules (gov.uk)                           │
│  · DEFRA: Bringing pets into Great Britain (gov.uk)            │
│  · EU Commission: Pet movement rules (ec.europa.eu)            │
│                                                                 │
│  ⚠️  Rules last verified: January 2026. Always confirm with    │
│     official sources before travel.                             │
│                                                                 │
│  [🔗 Share This Checklist]  [📄 Save as PDF]  [📤 Share]       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Country Coverage Matrix

**Available route combinations** (shown as info below form):

| Scenario | Special Requirements |
|---|---|
| EU → EU (Schengen) | EU Pet Passport + microchip + rabies (standard) |
| EU → UK | AHC required (not EU Pet Passport) + tapeworm treatment |
| EU → Finland / Ireland / Malta / Norway | Rabies antibody titre test + 3-month wait |
| UK → EU | Revert to AHC system (post-Brexit) |
| Non-EU → EU | Rabies titre test (if from non-listed country) |

---

# TOOL 3: Pet Insurance Cost Estimator

**URL**: `petsmetrics.com/shared/pet-insurance-estimator/`  
**Template**: A — Tool Page (2-column)  
**Monetization**: All insurance links are affiliate (CPA $25–$80)

---

## 1. SEO Metadata

```
Title:    Pet Insurance Cost Estimator 2026 — Compare Dog & Cat Plans | petsMetrics
Desc:     Estimate your pet insurance monthly cost and compare top providers: Lemonade, 
          Pumpkin, Trupanion. Get ranges by breed, age and location. Free, no sign-up.
H1:       Pet Insurance Cost Estimator & Plan Comparison
```

---

## 2. Input Form

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  About your pet                                                 │
│                                                                 │
│  Species:  ● Dog  ○ Cat                                        │
│                                                                 │
│  Breed:                                                         │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  🔍  Search breed...                                      │  │
│  └──────────────────────────────────────────────────────────┘  │
│  (Breed affects premium — high-risk breeds cost more)          │
│                                                                 │
│  Age:                                                           │
│  ┌────────────────────────────────────┐                        │
│  │  3  years   (puppy <1yr: lower)   │                        │
│  └────────────────────────────────────┘                        │
│                                                                 │
│  Location:                                                      │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  🇺🇸 United States — State: California ▾                  │  │
│  └──────────────────────────────────────────────────────────┘  │
│  Or: 🇬🇧 UK · 🇩🇪 Germany · 🇫🇷 France · 🇳🇱 Netherlands        │
│                                                                 │
│  Coverage type:                                                 │
│  ○  Accident-only (cheapest)                                   │
│  ●  Accident + Illness (recommended)                           │
│  ○  Comprehensive (includes wellness/preventive)               │
│                                                                 │
│              [Compare Plans →]                                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Results Display — Comparison Table

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  🛡️ Estimated Monthly Premiums                                  │
│  Buddy · Labrador · 3 years · California · Accident + Illness  │
│                                                                 │
│  ┌───────────────┬──────────┬──────────┬──────────┬──────────┐ │
│  │  Provider     │ Monthly  │ Deducti. │ Reimb.   │  Link    │ │
│  ├───────────────┼──────────┼──────────┼──────────┼──────────┤ │
│  │ 🍋 Lemonade   │ $35–$55  │  $250    │   80%    │[Get →]   │ │
│  │ 🎃 Pumpkin    │ $40–$65  │  $100    │   90%    │[Get →]   │ │
│  │ 🐾 Trupanion  │ $55–$85  │  $0/mo   │   90%    │[Get →]   │ │
│  │ 🐶 Embrace    │ $45–$70  │  $200    │   80%    │[Get →]   │ │
│  └───────────────┴──────────┴──────────┴──────────┴──────────┘ │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  💡 Our estimate is based on publicly available rate data       │
│     (2026). Exact premiums vary by pet health history.          │
│     Click each provider for an accurate personalized quote.    │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  📊 Quick Comparison                                            │
│                                                                 │
│  Best for low monthly cost:     🍋 Lemonade                    │
│  Best for high reimbursement:   🎃 Pumpkin (90%, $100 deduct.) │
│  Best for zero deductible:      🐾 Trupanion                   │
│  Best for multi-pet discount:   🐶 Embrace                     │
│                                                                 │
│  [📄 Download Full Comparison PDF — Free]                       │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  Sponsored links — We may earn a commission if you purchase    │
│  through these links, at no extra cost to you. (FTC compliant) │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. Sidebar (All Three P1 Tools)

### [A] Tool-Specific Tips

**BARF**: "Is raw feeding safe? Key food safety practices →"  
**EU Travel**: "Common mistakes at EU border crossing →"  
**Insurance**: "When to get pet insurance — before or after diagnosis →"

### [B] Related Tools

```
│  Vaccination Schedule — understand what's covered by insurance  │
│  Age Calculator — older pets = higher premiums                  │
│  Gestation Calculator — insure puppies from birth              │
```

### [C] Trust / Credibility Signal

```
┌─────────────────────────────────────────────────────────────────┐
│  🔒 Data sources updated January 2026                           │
│  Rules verified against official government sources             │
│  No medical advice — consult your vet for health decisions      │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5. Mobile Layouts (All P1 Tools)

**BARF Calculator**:
- Ingredient toggles: 2-column grid of checkboxes
- Portion table: Horizontal scroll
- PDF CTA: Sticky bottom bar with price

**EU Travel Checker**:
- Country selects: Full-width, native select on iOS
- Requirements checklist: Full-width, stacked rows
- Missing items: Highlighted in red, full-width action steps

**Insurance Estimator**:
- Comparison table: Cards per provider (vertical stack instead of table)
- Each card shows: Logo, monthly range, key differentiator, CTA
- Quick comparison highlights: Row of colored badges

---

## 6. Content Maintenance Schedule

| Tool | Update Frequency | Trigger |
|---|---|---|
| BARF Calculator | Annually | WSAVA guideline updates |
| EU Travel Checker | Quarterly | EU regulatory changes, post-Brexit reviews |
| Insurance Estimator | Semi-annually | Provider rate updates |

**Data source references** (all static JSON, manually maintained):
- EU Travel: `data/eu-travel-rules.json` — source: ec.europa.eu, gov.uk DEFRA
- Insurance: `data/insurance-rates.json` — source: published provider rate cards
- BARF: `data/barf-ratios.json` — source: WSAVA, raw feeding veterinary literature
