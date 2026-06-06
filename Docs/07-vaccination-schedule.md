# Page Design: Vaccination & Deworming Schedule Generator

**URLs**:  
- `https://petsmetrics.com/dog/vaccination-schedule/`  
- `https://petsmetrics.com/cat/vaccination-schedule/`  
**Template**: A — Tool Page (2-column with sidebar)  
**Priority**: P0 · Launch Day  
**Applies to**: Dogs and Cats (separate pages, same template)

---

## 1. Page Goal

The **highest-retention tool** on the site. Users return repeatedly to check upcoming vaccine dates. This creates a natural email collection opportunity (vaccine reminders = highest opt-in rate of all tools).

**Primary value**: Never miss a vaccine again. Printable schedule with dates, personalized to pet's exact age and region.  
**Monetization**: Insurance affiliate banner — "vet visit coverage" is the strongest conversion hook at this page.

---

## 2. SEO Metadata

```
Dog page:
Title:    Dog Vaccination Schedule 2026 — Free Personalized Timeline | petsMetrics
Desc:     Generate your dog's complete vaccination schedule based on age and region. 
          DHPP, rabies, Bordetella and more. Free printable PDF. WSAVA guidelines.
Canonical: https://petsmetrics.com/dog/vaccination-schedule/
Schema:   WebApplication + FAQPage
H1:       Dog Vaccination Schedule Generator

Cat page:
Title:    Cat Vaccination Schedule 2026 — Free Personalized Timeline | petsMetrics
H1:       Cat Vaccination Schedule Generator
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
│  [1] Page Header                    │  [A] Quick Facts           │
│  [2] Input Form                     │  [B] Insurance Banner      │
│  [3] Generated Schedule Table       │  [C] Email Reminder CTA    │
│  [4] Disclaimer                     │  [D] Related Tools         │
│  [5] Share / Export                 │                            │
│  [6] Non-core Vaccine Note          │                            │
│  [7] SEO FAQ                        │                            │
│                                     │                            │
└─────────────────────────────────────┴────────────────────────────┘
│  Footer                                                          │
```

---

## 4. Section Specifications

### [1] Page Header

```
💉  Dog Vaccination Schedule Generator    (H1, 36px)
──────────────────────────────────────────────────────

Get a personalized vaccination and deworming schedule
for your dog, based on WSAVA core vaccine guidelines.

Breadcrumb: Home > Dogs > Vaccination Schedule
```

---

### [2] Input Form

**Two-step form (inline, no wizard for this tool — quick enough)**

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  About your dog                              (H3)               │
│                                                                 │
│  Date of Birth (or current age)                                 │
│  ┌──────────────────────────────┐   or   ┌────────┬────────┐   │
│  │  📅  MM / DD / YYYY          │        │  __ yr │  __ wk │   │
│  └──────────────────────────────┘        └────────┴────────┘   │
│                                                                 │
│  Your Region  *                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  🌍 Select region...                                 ▾   │  │
│  └──────────────────────────────────────────────────────────┘  │
│  Options: United States · United Kingdom · European Union       │
│           Australia · Canada · Other                            │
│                                                                 │
│  Lifestyle (affects non-core vaccine recommendations)           │
│  □ Indoor only                                                  │
│  ☑ Spends time outdoors          ← default checked             │
│  □ Regular boarding/grooming (Bordetella exposure)             │
│  □ Lives near wildlife / water (Leptospirosis risk)            │
│                                                                 │
│              [Generate Schedule →]                              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

If profile loaded, DOB and region auto-fill. Form shows "Auto-filled from Buddy's profile ✓" indicator.

---

### [3] Generated Schedule Table

The schedule is the core output — displayed as a color-coded table with status indicators.

#### Table Header

```
💉  Buddy's Vaccination Schedule            (H2)
Generated: June 6, 2026 · Based on DOB: March 12, 2023
Region: United States · WSAVA Core Vaccine Guidelines

[📄 Export PDF]  [📧 Set Email Reminders]  [🔗 Copy Link]
```

#### Core Vaccine Table (Dog — US Region)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ Vaccine / Treatment      Age / Date         Due Date      Status             │
├──────────────────────────────────────────────────────────────────────────────┤
│ DHPP (1st dose)          6–8 weeks          ─────────     ✅ Complete         │
│ DHPP (2nd dose)          10–12 weeks        ─────────     ✅ Complete         │
│ DHPP (3rd dose)          14–16 weeks        ─────────     ✅ Complete         │
│ Rabies (1st)             16 weeks           ─────────     ✅ Complete         │
│ DHPP (annual booster)    1 year             Mar 12, 2024  ✅ Complete         │
│ Rabies (3-year booster)  1 year             Mar 12, 2024  ✅ Complete         │
├──────────────────────────────────────────────────────────────────────────────┤
│ DHPP (booster)           Every 3 years      Mar 12, 2027  ⏳ Upcoming         │
│ Rabies (3-year)          Every 3 years      Mar 12, 2027  ⏳ Upcoming         │
├──────────────────────────────────────────────────────────────────────────────┤
│ Annual Deworming         Every 12 months    Mar 12, 2027  ⏳ Due in 9 months  │
│ Flea/Tick Prevention     Monthly (ongoing)  Jul 6, 2026   ⚠️ Due in 30 days  │
├──────────────────────────────────────────────────────────────────────────────┤
│ Bordetella (lifestyle)   Every 6–12 months  Sep 6, 2026   ⚠️ Due in 3 months │
│ ⓘ Recommended if boarding/grooming regularly                                 │
├──────────────────────────────────────────────────────────────────────────────┤
│ Leptospirosis (lifestyle) Annually          Mar 12, 2027  ⏳ Upcoming         │
│ ⓘ Recommended if near wildlife water sources                                 │
└──────────────────────────────────────────────────────────────────────────────┘
```

**Status icon legend**:
- ✅ Complete: `--status-safe` green, strikethrough text
- ⚠️ Due in < 60 days: `--status-caution` amber, bold date
- 🚨 Overdue: `--status-toxic` red, bold "OVERDUE" label
- ⏳ Upcoming: `--gray-500`, normal weight

**Table row design**:
- Zebra striping: `--white` / `--gray-50`
- Core vaccines: normal row
- Section dividers: `--gray-200` border with section label
- Non-core vaccine rows: italic style, info icon with tooltip

---

#### Non-Core Vaccine Important Notice

```
┌─────────────────────────────────────────────────────────────────┐
│  ℹ️  About Non-Core Vaccine Recommendations                     │
│                                                                 │
│  Vaccines marked "lifestyle" (Bordetella, Leptospirosis, Lyme) │
│  depend heavily on your specific region and your dog's daily   │
│  routine. The recommendations above are a starting point only. │
│                                                                 │
│  Whether these vaccines are recommended depends on your        │
│  region and your pet's lifestyle. Ask your vet for a           │
│  personalized assessment.                                       │
└─────────────────────────────────────────────────────────────────┘
```

Background: `--status-info-bg`, border-left: `--status-info`.

---

#### Upcoming Vaccine Visual Summary

Below the table — a visual "next 6 months" summary for at-a-glance view:

```
  Next 6 Months at a Glance           (H3)
  ──────────────────────────────────────────

  Jun 2026    Jul 2026    Aug 2026    Sep 2026    Oct 2026    Nov 2026
  ────────    ────────    ────────    ────────    ────────    ────────
                          Flea/Tick   Bordetella  Flea/Tick
                          (due)       (due)       (due)
```

Mini calendar strip showing red/amber dots on months with upcoming vaccines.

---

#### Email Reminder CTA (inline, full-width — directly below results)

> **Placement rationale**: This is the site's highest-converting email opt-in moment. The user has just seen their pet's full vaccine timeline and knows exactly when the next shot is due — the value of a reminder is immediately obvious. Placing this in the sidebar (position [C]) wastes the conversion window; it must appear inline, full-width, immediately after the schedule table.

```
┌─────────────────────────────────────────────────────────────────┐
│  📧  Never miss a vaccine — get a reminder for Buddy            │
│  ─────────────────────────────────────────────────────────────  │
│  We'll email you 1 week before each vaccine is due.             │
│  Free. No spam. Unsubscribe anytime.                            │
│                                                                 │
│  ┌──────────────────────────────────────┐  [Set Reminders →]   │
│  │  your@email.com                      │                       │
│  └──────────────────────────────────────┘                       │
│                                                                 │
│  ✓ GDPR compliant  ·  ✓ Vaccine alerts only  ·  ✓ Free        │
└─────────────────────────────────────────────────────────────────┘
```

- Background: `--status-info-bg` `#DBEAFE`, border-left: 4px `--status-info` `#3B82F6`
- Full-width block, not sidebar — guaranteed visibility regardless of scroll depth
- If user has already provided email (e.g. from Profile backup step), pre-fill the field
- GDPR: explicit checkbox for EU users: "I agree to receive vaccine reminder emails for Buddy"
- This block replaces the email CTA in sidebar position [C] (see sidebar spec below)

---

### [4] Disclaimer

```
⚕️  This schedule is based on WSAVA core vaccine guidelines and
    general regional recommendations. Individual vaccination needs
    vary by pet health, lifestyle, and local disease prevalence.
    Always confirm your pet's vaccine schedule with a licensed
    veterinarian.
```

---

### [5] Share / Export

```
[📄 Download PDF]  ← free, no paywall for this tool (drives email opt-in instead)
[📧 Set Reminders] ← email opt-in for vaccine reminder emails (GDPR compliant)
[🔗 Copy Link]
[📤 Share on Facebook]
```

**Email reminder opt-in flow**:
```
┌─────────────────────────────────────────────────────────────────┐
│  📧 Get vaccine reminders for Buddy                             │
│  ─────────────────────────────────────────────────────────────  │
│  We'll email you 30 days before each vaccine is due.           │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  your@email.com                                          │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  [Set Reminders — Free]                                         │
│                                                                 │
│  ✓ Unsubscribe anytime  ·  ✓ No spam  ·  ✓ GDPR compliant    │
└─────────────────────────────────────────────────────────────────┘
```

This is the primary email collection mechanism for the entire site.

---

## 5. Cat Vaccination Schedule Differences

**Cat core vaccines (WSAVA / AAHA-AAFP 2021)**:

| Age | Core Vaccine |
|---|---|
| 6–8 weeks | FVRCP (1st dose) |
| 10–12 weeks | FVRCP (2nd dose) |
| 14–16 weeks | FVRCP (3rd dose) + Rabies |
| 1 year | FVRCP booster + Rabies |
| Every 3 years | FVRCP + Rabies (3-year protocol) |

**Cat non-core**:
- FeLV (Feline Leukemia): Outdoor cats only
- FIV: High-risk outdoor cats
- Bordetella feline: Multi-cat households or shelters

**Key UI difference for cat page**:
- Violet theme throughout
- Lifestyle checkboxes: "indoor only / indoor-outdoor / outdoor only" (more relevant for cats than dogs)

---

## 6. Sidebar Content

### [A] Quick Facts

```
┌─────────────────────────────────────────────────────┐
│  📋 WSAVA Core Vaccines for Dogs                    │
│  ─────────────────────────────────────────────────  │
│  DHPP (Distemper, Hepatitis,                        │
│         Parvovirus, Parainfluenza)                  │
│  Rabies                                             │
│                                                     │
│  Source: World Small Animal Veterinary              │
│           Association (WSAVA) 2022 Guidelines       │
└─────────────────────────────────────────────────────┘
```

### [B] Insurance Banner

```
┌─────────────────────────────────────────────────────┐
│  Sponsored                                          │
│                                                     │
│  [Pumpkin Logo]                                     │
│  Preventive care coverage — vaccines included.      │
│  Plans from $15/month.                              │
│                          [See Plans →]              │
└─────────────────────────────────────────────────────┘
```

### [C] Email Reminder

> **Note**: The primary email reminder CTA has been moved to an inline full-width block directly below the schedule table in the main content area (see Section [3] above). This sidebar slot is intentionally left empty or replaced with a Related Tools block, to avoid diluting the inline CTA with a competing version.

### [D] Related Tools

```
│  🍖 Calorie Calculator                              │
│  💉 Gestation Calculator (for breeders)            │
│  📅 Age Calculator                                  │
```

---

## 7. SEO FAQ

```
  Frequently Asked Questions           (H2, FAQPage schema)
  ─────────────────────────────────────────────────────────

  ▼  What vaccines does my dog need?
  ▼  How often does my dog need a rabies vaccine?
  ▼  What is the DHPP vaccine?
  ▼  Does my indoor cat need vaccines?
  ▼  What is the FVRCP vaccine?
  ▼  How do I know if my pet's vaccines are up to date?
```

---

## 8. Mobile Layout

- Input form: Full-width, minimal padding
- Schedule table: Horizontal scroll (table stays full columns, viewport scrolls)
- Mini calendar strip: Hidden on mobile (too small to be useful)
- Share buttons: Stacked 2×2 grid
- Sidebar below main content
- Email opt-in: Sticky bottom bar on mobile ("Remind me before Buddy's next vaccine")
