# i18n Audit Report — petsMetrics

**Date:** 2026-07-02  
**Scope:** Next.js + next-intl project  
**Languages:** en (default), zh, fr, de, ja, ko  
**Reference:** en.json (794 keys)

---

## 1. Executive Summary

| Status | Description |
|--------|-------------|
| ✅ | All 6 language files have valid JSON syntax |
| ✅ | All 6 language files have consistent keys (794 each) |
| ⚠️ | 47 hardcoded English strings found in source code |
| ℹ️ | 1 typo fix in ko.json (`rabias` → `rabies`) |

---

## 2. Language File Consistency

### 2.1 Key Count Comparison

| Language | Keys | Status |
|----------|------|--------|
| en.json | 794 | ✅ Reference |
| zh.json | 794 | ✅ Match |
| fr.json | 794 | ✅ Match |
| de.json | 794 | ✅ Match |
| ja.json | 794 | ✅ Match |
| ko.json | 794 | ✅ Match |

### 2.2 Files Modified

| File | Changes |
|------|---------|
| `messages/de.json` | Fixed 4 unescaped ASCII double quotes |
| `messages/ko.json` | Fixed 6 unescaped ASCII double quotes + 1 key typo |
| `messages/zh.json` | Fixed 3 unescaped ASCII double quotes |
| `messages/ja.json` | Fixed 1 key naming inconsistency (`description` → `desc`) |

---

## 3. JSON Syntax Fixes

### 3.1 Pattern: Unescaped ASCII Double Quotes

The most common issue was unescaped ASCII double quotes (`"`) inside JSON string values, often appearing alongside smart/curly quotes used in typographically correct text.

**Example (de.json line 975):**
```json
// Before
"storedOnDeviceP6": "...die Funktion „Profil löschen"...."

// After
"storedOnDeviceP6": "...die Funktion „Profil löschen\"...."
```

**Total fixes per file:**
- `de.json`: 4 occurrences
- `ko.json`: 6 occurrences
- `zh.json`: 3 occurrences

### 3.2 Key Naming Inconsistency

**File:** `messages/ja.json`

```json
// Before
"insurance": { "name": "保険見積もり", "description": "..." }

// After
"insurance": { "name": "保険見積もり", "desc": "..." }
```

### 3.3 Typo Fix

**File:** `messages/ko.json` line 867

```json
// Before
"min-age-rabias": "최소 연령 충족(12주 이상)"

// After
"min-age-rabies": "최소 연령 충족(12주 이상)"
```

---

## 4. Hardcoded Strings Audit

### 4.1 Summary by Priority

| Priority | Count | Impact |
|----------|-------|--------|
| High | 30 | User-visible text in core features |
| Medium | 12 | Navigation, accessibility labels |
| Low | 5 | Technical/SEO strings |

### 4.2 Summary by Category

| Category | Files Affected | Strings Found |
|----------|---------------|---------------|
| Fallback pet names | 11 | 2 (`Buddy`, `Luna`) |
| Toxic checker severity & labels | 2 | 8 |
| Species-specific content (vaccination, gestation) | 4 | 9 |
| Hub page tool names & descriptions | 3 | 15 |
| Shared page tool cards | 1 | 8 |
| Navigation & accessibility | 3 | 4 |
| SEO content | 1 | 1 |

### 4.3 Key Files Requiring Changes

| File | Hardcoded Strings | Priority |
|------|-------------------|----------|
| `src/components/profile/LinkedToolsGrid.tsx` | 10 | High |
| `src/components/hub/DogHubContent.tsx` | 15+ | High |
| `src/components/hub/CatHubContent.tsx` | 10+ | High |
| `src/app/[locale]/shared/page.tsx` | 12 | High |
| `src/components/shared/ToxicLandingPage.tsx` | 10+ | High |
| `src/components/shared/ToxicCheckerWidget.tsx` | 6 | High |
| `src/components/layout/Nav.tsx` | 2 | Medium |
| `src/components/home/ToolDiscovery.tsx` | 1 | Medium |
| `src/components/home/FeaturedTool.tsx` | 1 | Medium |

---

## 5. Recommended New i18n Keys

### 5.1 Common Keys
```json
{
  "common": {
    "fallbackPetName": {
      "dog": "Buddy",
      "cat": "Luna"
    }
  }
}
```

### 5.2 Navigation Keys
```json
{
  "nav": {
    "toggleAriaLabel": "Toggle navigation",
    "switchLanguageAriaLabel": "Switch language"
  }
}
```

### 5.3 Toxic Checker Keys
```json
{
  "toxicChecker": {
    "levelToxic": "TOXIC",
    "levelCaution": "CAUTION",
    "levelSafe": "SAFE",
    "speciesBoth": "🐕 Dogs & 🐱 Cats",
    "speciesDog": "🐕 Dogs",
    "speciesCat": "🐱 Cats",
    "heading": "Toxic Food & Plant Checker",
    "subheading": "Is that food or plant safe for your pet? Search our database of 200+ items instantly — no login, no signup."
  }
}
```

### 5.4 Toxic Landing Page Keys
```json
{
  "toxicLanding": {
    "h1PatternDog": "Can Dogs Eat {item}? — {level}",
    "h1PatternCat": "Is {item} Toxic to Cats? — {level}",
    "dangerTitle": "Why {item} Is Dangerous to {species}",
    "cautionTitle": "What to Know About Feeding {item} to {species}",
    "safeTitle": "Is {item} Safe for {species}?",
    "whatToDoTitleDog": "What to Do If Your Dog Eats {item}",
    "whatToDoTitleCat": "What to Do If Your Cat Eats {item}",
    "faqTitle": "Frequently Asked Questions",
    "sourceAttribution": "Primary data source and citations: ASPCA Animal Poison Control Center, AVMA, AAFP, AKC."
  }
}
```

### 5.5 Vaccination Keys
```json
{
  "vaccination": {
    "dog": {
      "coreVaccinesTitle": "Canine Core Vaccines (DHPP + Rabies)",
      "coreVaccinesBody": "Distemper, Hepatitis (Adenovirus-2), Parvovirus, Parainfluenza, and Rabies form the WSAVA-recommended core set for all dogs worldwide. Non-core vaccines (Leptospirosis, Bordetella, Lyme) depend on regional risk and lifestyle.",
      "guidelineSource": "Based on WSAVA global vaccination guidelines and AAHA canine vaccination recommendations."
    },
    "cat": {
      "coreVaccinesTitle": "Feline Core Vaccines (FVRCP + Rabies)",
      "coreVaccinesBody": "Feline Viral Rhinotracheitis, Calicivirus, Panleukopenia, and Rabies form the WSAVA/AFP-recommended core set for all cats. FeLV is recommended for all kittens and outdoor adult cats based on risk.",
      "guidelineSource": "Based on WSAVA global guidelines and AAFP feline vaccination advisory panel report."
    }
  }
}
```

### 5.6 Gestation Keys
```json
{
  "gestation": {
    "dog": {
      "factsTitle": "Dog Gestation Facts",
      "healthTip": "Dog pregnancies average 63 days. Litter size varies widely by breed — from 1–2 puppies in small breeds to 10+ in large breeds.",
      "sourceNote": "Based on AAHA canine reproductive guidelines and veterinary obstetrics standards."
    },
    "cat": {
      "factsTitle": "Cat Gestation Facts",
      "healthTip": "Cat pregnancies average 65 days — slightly longer than dogs. Cats are induced ovulators, meaning mating triggers egg release.",
      "sourceNote": "Based on AAFP feline reproductive guidelines and veterinary theriogenology standards."
    }
  }
}
```

### 5.7 Profile Dashboard Tools Keys
```json
{
  "profile": {
    "dashboard": {
      "tools": {
        "dogAge": "Dog Age Calculator",
        "catAge": "Cat Age Calculator",
        "dogCalorie": "Dog Calorie Calculator",
        "puppyGrowth": "Puppy Growth Tracker",
        "gestation": "Gestation Calculator",
        "vaccination": "Vaccination Schedule",
        "catBcs": "Cat BCS Calculator",
        "catHydration": "Cat Hydration Calculator",
        "toxicChecker": "Toxic Checker",
        "euTravel": "EU Travel Checker"
      }
    }
  }
}
```

### 5.8 Shared Keys
```json
{
  "shared": {
    "hero": {
      "title": "Shared Tools for Dogs & Cats",
      "subtitle": "Cross-species calculators and checkers that work for both dogs and cats. No login required, 100% free."
    },
    "tools": {
      "toxicChecker": {
        "name": "Toxic Food Checker",
        "desc": "Is it safe? Check 200+ foods, plants, and household items for dogs and cats."
      },
      "euTravel": {
        "name": "EU Pet Travel Checker",
        "desc": "Cross-border pet travel requirements: microchips, vaccines, tapeworm treatment."
      },
      "barf": {
        "name": "BARF Raw Feeding Calculator",
        "desc": "Calculate daily raw food portions: muscle meat, bone, liver, and organs."
      },
      "insurance": {
        "name": "Pet Insurance Estimator",
        "desc": "Estimate monthly premiums based on breed, age, and location."
      }
    }
  }
}
```

### 5.9 Sidebar Keys
```json
{
  "sidebar": {
    "aspcaHelpline": "ASPCA Poison Control: (888) 426-4435",
    "petPoisonHelpline": "Pet Poison Helpline: (855) 764-7661",
    "contactVet": "Always contact a vet immediately if ingestion occurred",
    "quickVetTipBody": "If your pet ate something suspicious, save a sample and call your vet or poison control immediately. Do not induce vomiting without professional guidance."
  }
}
```

### 5.10 Hub GEO Keys
```json
{
  "dog": {
    "geo": {
      "privacyTitle": "How We Protect Your Privacy",
      "privacyBody": "All pet profiles, calculator inputs, and results are stored exclusively in your browser's local storage. No data is ever uploaded to our servers. We do not require accounts, collect personal information, or track your activity across sessions."
    }
  },
  "cat": {
    "geo": {
      "privacyTitle": "How We Protect Your Privacy",
      "privacyBody": "All pet profiles, calculator inputs, and results are stored exclusively in your browser's local storage. No data is ever uploaded to our servers. We do not require accounts, collect personal information, or track your activity across sessions."
    }
  }
}
```

---

## 6. Recommendations

### 6.1 Immediate Actions (High Priority)

1. **Fix fallback pet names** — 11 files use hardcoded `Buddy`/`Luna` as fallback. Create `common.fallbackPetName.dog` and `common.fallbackPetName.cat` keys.

2. **Internationalize toxic checker labels** — Severity levels (`TOXIC`, `CAUTION`, `SAFE`) and species labels are hardcoded in 2 components.

3. **Move species-specific content to i18n** — Vaccination and gestation widget content is hardcoded in English.

4. **Internationalize shared page tool cards** — All tool names and descriptions in `src/app/[locale]/shared/page.tsx`.

### 6.2 Medium Priority

1. Add `nav.toggleAriaLabel` and `nav.switchLanguageAriaLabel` keys
2. Create `profile.dashboard.tools.*` keys for linked tools grid
3. Internationalize hub page tool names and descriptions

### 6.3 Low Priority

1. JSON-LD schema descriptions can remain hardcoded for SEO consistency
2. Metadata titles/descriptions could be localized for better international SEO

---

## 7. Appendix: Script Used

The key comparison was performed using `scripts/compare-i18n-keys.js`:

```bash
node scripts/compare-i18n-keys.js
```

This script:
- Recursively extracts all keys from nested JSON objects
- Compares each language file against en.json as reference
- Reports missing/extra keys
- Reports JSON parse errors
```

---

*Report generated by i18n-auditor skill on 2026-07-02*
