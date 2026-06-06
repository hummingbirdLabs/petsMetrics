# Page Design: Toxic Food & Plant Checker

**URL**: `https://petsmetrics.com/shared/toxic-checker/`  
**Template**: A — Tool Page (2-column with sidebar)  
**Priority**: P0 · Launch Day · **Highest SEO Traffic Value**  
**Applies to**: Dogs and Cats (shared tool, species toggle)

---

## 1. Page Goal

The **primary SEO traffic engine** for the entire site. Must rank for:
- "Can dogs eat [food]" — hundreds of long-tail variants
- "Is [plant] toxic to cats" — cat-specific variants
- "[Food] safe for pets" — shared variants

Each food/plant entry also generates its own static SEO landing page (e.g., `/dog/can-dogs-eat-grapes/`).

**User intent**: Immediate emergency lookup ("my dog just ate grapes") or curious prevention ("planning to share food"). **Speed is critical** — results must appear within 200ms of typing.

---

## 2. SEO Metadata

```
Title:    Toxic Food & Plant Checker for Dogs and Cats | petsMetrics
Desc:     Instantly check if any food or plant is safe for your dog or cat. 
          200+ items in our database. Severity ratings, symptoms & vet hotline.
Canonical: https://petsmetrics.com/shared/toxic-checker/
Schema:   WebApplication + FAQPage (per item)
H1:       Is it Safe? Toxic Food & Plant Checker
OG Image: /og/toxic-checker.png (red/green shield motif)
```

**Individual food landing pages** (static generation):
```
/dog/can-dogs-eat-grapes/
/dog/can-dogs-eat-chocolate/
/cat/are-lilies-toxic-to-cats/
...
Title:  Can Dogs Eat Grapes? [TOXIC] | petsMetrics
Schema: FAQPage + Article
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
│  MAIN CONTENT (720px)               │  SIDEBAR (300px)           │
│                                     │                            │
│  [1] Page Header                    │  [A] Quick Vet Tips        │
│  [2] Species Toggle                 │  [B] Affiliate Banner      │
│  [3] Search Bar                     │  [C] Related Tools         │
│  [4] Result Display                 │                            │
│  [5] Browse by Category             │                            │
│  [6] Emergency Contact Block        │                            │
│  [7] SEO FAQ                        │                            │
│                                     │                            │
└─────────────────────────────────────┴────────────────────────────┘
│  Footer                                                          │
```

---

## 4. Main Content — Section by Section

### [1] Page Header

```
⚠️  Toxic Food & Plant Checker              (H1, 36px)
─────────────────────────────────────────────────

Is that food or plant safe for your pet? Search our database
of 200+ items instantly — no login, no signup.

Breadcrumb: Home > Tools > Toxic Checker
```

---

### [2] Species Toggle

```
  Check for:
  ┌──────────────────┬──────────────────┐
  │  🐕  Dogs        │  🐱  Cats        │
  └──────────────────┴──────────────────┘
```

- Default: Dogs (majority of traffic)
- Selecting cat: filters database to cat-relevant items (some foods are safe for dogs but not cats, e.g. tuna in large amounts)
- Toggle state persists in URL param `?species=cat` for SEO and shareability
- If user has a pet profile, pre-selects their pet's species

---

### [3] Search Bar — The Hero Interaction

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  🔍  Type a food or plant...  e.g., "grapes", "avocado"         │
│                                                    [Clear ✕]    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Spec**:
- Height: 56px
- Font size: 18px
- Border: 2px `--gray-300`, focus: 2px `--status-toxic` (red — intentional, signals danger awareness)
- Placeholder cycles through examples: "grapes" → "chocolate" → "lilies" → "onions"
- **Real-time fuzzy search** (< 200ms via client-side JSON, Fuse.js)
- Dropdown auto-complete: shows top 5 matches as user types
- Keyboard: `Enter` = search, `Escape` = clear, arrow keys = navigate suggestions

**Auto-complete dropdown**:
```
  ┌─────────────────────────────────────────────────────────┐
  │  🔴 Grapes              Toxic to Dogs                   │
  │  🔴 Grape juice         Toxic to Dogs                   │
  │  🔴 Grapefruit          Toxic (citrus)                  │
  │  🟡 Grape seed oil      Caution — limited data          │
  └─────────────────────────────────────────────────────────┘
```

---

### [4] Result Display

#### State A — No search (initial)

```
┌─────────────────────────────────────────────────────────────────┐
│  🔍 Start typing a food or plant name above.                    │
│                                                                 │
│  Popular searches:                                              │
│  Grapes · Chocolate · Avocado · Onions · Xylitol               │
│  Lilies · Raisins · Macadamia nuts · Garlic · Almonds          │
└─────────────────────────────────────────────────────────────────┘
```

Popular search pills: clickable, each runs the search instantly.

---

#### State B — TOXIC Result

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  🔴  TOXIC                         (badge — red bg, 20px bold)  │
│                                                                 │
│  Grapes                            (H2, 32px)                   │
│  Toxic to: 🐕 Dogs  🐱 Cats                                    │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  ⚠️  Why it's dangerous                                         │
│  Grapes and raisins can cause acute kidney failure in dogs and  │
│  cats. The toxic compound is unknown, making any amount         │
│  potentially dangerous.                                         │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  🚨  Common Symptoms                                            │
│  · Vomiting within hours of ingestion                          │
│  · Lethargy and weakness                                        │
│  · Loss of appetite                                             │
│  · Decreased urination (kidney failure sign)                   │
│  · Abdominal pain                                               │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  📞  Contact immediately if your pet ate grapes:               │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  🚨 ASPCA Poison Control: (888) 426-4435                │   │
│  │     Pet Poison Helpline: (855) 764-7661                 │   │
│  │     [Find Your Local Emergency Vet →]                   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Sources: ASPCA Animal Poison Control · AVMA                   │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 ││  📖  Want the full guide?                                       │
│  [Read: Can Dogs Eat Grapes? — Complete Safety Guide →]         │
│  (links to /dog/can-dogs-eat-grapes/ — FAQPage schema page)    │
│                                                                 ││  [📤 Share Result]  [🔗 Copy Link]                              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Visual spec for TOXIC card**:
- Background: `--status-toxic-bg` `#FEE2E2`
- Left border: 6px `--status-toxic` `#EF4444`
- Badge: `--status-toxic` bg, white text, uppercase, letter-spacing 1px
- Emergency hotline block: `--brand-navy` bg, white text, 12px border-radius
- Hotline numbers: bold, monospace font, easily readable on mobile

---

#### State C — CAUTION Result

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  🟡  CAUTION                       (badge — amber bg)           │
│                                                                 │
│  Tuna (canned, in water)           (H2)                        │
│  Toxic to: ──  Dogs (safe in moderate amounts)                 │
│            ⚠️  Cats (high mercury risk if fed daily)           │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  Why be cautious?                                               │
│  Canned tuna contains mercury. Occasional feeding is fine,     │
│  but regular feeding can cause mercury poisoning in cats.      │
│  For dogs, limit to once or twice per week as a treat.         │
│                                                                 │
│  ✅  Safe amount (dogs): Occasional treat, < 10% of diet        │
│  ⚠️  For cats: Max 1–2 times per week, not as a meal base      │
│                                                                 │
│  Sources: ASPCA · Cornell Feline Health Center                 │
│                                                                 │
│  [📤 Share]  [🔗 Copy Link]                                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Visual spec for CAUTION**:
- Background: `--status-caution-bg` `#FEF3C7`
- Left border: 6px `--status-caution` `#F59E0B`

---

#### State D — SAFE Result

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  🟢  SAFE                          (badge — emerald bg)         │
│                                                                 │
│  Blueberries                       (H2)                        │
│  Safe for: 🐕 Dogs  🐱 Cats                                    │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  Why it's safe?                                                 │
│  Blueberries are non-toxic and contain antioxidants,           │
│  fiber, and vitamins C and K. They make an excellent low-      │
│  calorie treat for dogs and cats.                               │
│                                                                 │
│  💡  Serving tip                                                │
│  Offer fresh or frozen blueberries. Avoid dried blueberries    │
│  (high sugar concentration). Keep to < 10% of daily calories. │
│                                                                 │
│  Sources: ASPCA · AKC                                           │
│                                                                 │
│  [📤 Share]  [🔗 Copy Link]                                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Visual spec for SAFE**:
- Background: `--status-safe-bg` `#D1FAE5`
- Left border: 6px `--status-safe` `#10B981`

---

#### Disclaimer (always below result)

```
┌─────────────────────────────────────────────────────────────────┐
│ ⚕️  This information is for general reference only and does not │
│    constitute veterinary advice. Always consult a licensed      │
│    veterinarian for your pet's specific health needs.           │
└─────────────────────────────────────────────────────────────────┘
```

---

### [5] Browse by Category

Below the search area, when no search is active:

```
  Browse by Category                        (H2)
  ──────────────────────────────────────────

  🍎 Fruits & Berries    🥦 Vegetables      🥜 Nuts & Seeds
  🍫 Sweets & Snacks     🥩 Proteins        🌿 Herbs & Spices
  🪴 Common Houseplants  🌸 Garden Plants    ☕ Drinks
```

- Category pills: 40px height, icon + label, `--gray-100` bg, hover `--gray-200`
- Clicking a category: filters the browse grid below

**Category Browse Grid**:
```
  ─── Fruits & Berries ───────────────────────────────
  
  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐
  │ 🟢 Apple  │  │ 🔴 Grapes │  │ 🟢 Blueb. │  │ 🟡 Mango  │
  └───────────┘  └───────────┘  └───────────┘  └───────────┘
```

- Small cards with status dot, name, click to expand result

---

### [6] Emergency Contact Block (permanent, below results)

```
┌─────────────────────────────────────────────────────────────────┐
│  🚨  Emergency Contacts                                         │
│  ─────────────────────────────────────────────────────────────  │
│  If your pet ingested something toxic:                          │
│                                                                 │
│  ASPCA Animal Poison Control Center                            │
│  📞 (888) 426-4435  · 24/7 · $95 consultation fee             │
│                                                                 │
│  Pet Poison Helpline                                            │
│  📞 (855) 764-7661  · 24/7                                     │
│                                                                 │
│  [Find Emergency Vets Near Me →]   (links to AAHA vet finder)  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5. Sidebar Content

### [A] Quick Vet Tips

```
┌─────────────────────────────────────────────────┐
│  💡 Emergency tips                              │
│  ─────────────────────────────────────────────  │
│  If your pet just ate something toxic:          │
│  1. Don't induce vomiting unless told to        │
│  2. Note what was eaten and how much            │
│  3. Call poison control immediately             │
│  4. Bring a sample if possible                  │
└─────────────────────────────────────────────────┘
```

### [B] Affiliate Banner (context-sensitive)

*Shown after a SAFE result — product recommendation feels natural:*

```
┌─────────────────────────────────────────────────┐
│  Sponsored                                      │
│                                                 │
│  [Chewy Logo]  Safe treats delivered.           │
│  Shop vet-approved dog treats on Chewy.         │
│                          [Shop Now →]           │
└─────────────────────────────────────────────────┘
```

*Not shown during/after a TOXIC result — poor taste and poor UX.*

### [C] Related Tools

```
┌─────────────────────────────────────────────────┐
│  Related Tools                                  │
│  ─────────────────────────────────────────────  │
│  🍖 Calorie Calculator                         │
│  Know how much to feed after checking safety.   │
│                                                 │
│  💉 Vaccination Schedule                        │
│  Keep your pet protected.                        │
└─────────────────────────────────────────────────┘
```

---

## 6. Individual Food Landing Pages

Each food item generates a static page. Example structure:

**URL**: `/dog/can-dogs-eat-grapes/`

```
┌──────────────────────────────────────────────────────────────────┐
│  🔍  Check another food or plant:                                │
│  ┌──────────────────────────────────────────────┐  [Check →]   │
│  │  e.g., "chocolate", "avocado", "lilies"...   │              │
│  └──────────────────────────────────────────────┘              │
│  ← Back to Toxic Checker                                         │
├──────────────────────────────────────────────────────────────────┤
│  Can Dogs Eat Grapes?               (H1 — matches search query)  │
│  🔴 No — Grapes are Toxic to Dogs                               │
│                                                                  │
│  [FULL RESULT CARD — same as main tool result]                   │
│                                                                  │
│  Frequently Asked Questions         (FAQPage schema)            │
│  ─────────────────────────────────────────────────────────────   │
│  Q: What happens if a dog eats one grape?                        │
│  A: Even a single grape can cause kidney damage...              │
│                                                                  │
│  Q: Are raisins as dangerous as grapes?                          │
│  A: Yes — raisins are even more concentrated...                 │
│                                                                  │
│  Q: What are the symptoms of grape poisoning in dogs?            │
│  A: Vomiting, lethargy, loss of appetite...                     │
│                                                                  │
│  [Check Another Food →]              (links back to tool page)   │
│  [View More Foods That Are Toxic to Dogs →]                      │
└──────────────────────────────────────────────────────────────────┘
```

> **Internal link strategy**: Each food landing page embeds a live search box at the top, linking users back to the tool page. The tool page result cards link forward to the detailed food landing pages. This bidirectional internal link structure strengthens the SEO authority of both page types and reduces bounce rate by giving users a clear "next action" on every page.

These pages are **the highest-priority SEO asset** — statically generated at build time, one page per food × per species. Target: 400+ unique landing pages at launch.

---

## 7. Data Structure (Static JSON)

```json
{
  "id": "grapes",
  "name": "Grapes",
  "aliases": ["grape", "raisins", "sultanas", "currants"],
  "categories": ["fruits"],
  "species": {
    "dog": {
      "status": "toxic",
      "reason": "Can cause acute kidney failure. Toxic compound unknown.",
      "symptoms": ["vomiting", "lethargy", "decreased urination", "abdominal pain"],
      "safeAmount": null
    },
    "cat": {
      "status": "toxic",
      "reason": "Same kidney failure risk as dogs.",
      "symptoms": ["vomiting", "lethargy"],
      "safeAmount": null
    }
  },
  "emergencyRequired": true,
  "sources": ["ASPCA", "AVMA"],
  "lastUpdated": "2026-01"
}
```

---

## 8. Mobile Layout

- Search bar: Full-width, 52px height, sticky near top
- Species toggle: 2 large tap targets, full-width
- Result card: Full-width, no sidebar
- Emergency contact: Persistent sticky bar with tap-to-call phone numbers
- Category browse: Horizontal scroll, wrapping pills
- Sidebar moves below main content on mobile

**Emergency UX priority on mobile**: Phone numbers must be `<a href="tel:">` links for one-tap calling.

---

## 9. Performance Notes

- JSON database loaded in a single request, cached in localStorage for 24 hours
- Fuse.js search library: < 10KB gzip
- No images in result display (pure CSS status system)
- Individual landing pages: fully static HTML, zero JS required
