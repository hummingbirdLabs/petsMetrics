# Page Design: Pet Profile Manager

**URL**: `https://petsmetrics.com/profile/`  
**Template**: B — Hub layout (full-width, no sidebar)  
**Priority**: P0 · Launch Day (core differentiator)

---

## 1. Page Goal

The Pet Profile is the **product's core competitive advantage**. Users create a profile once; every calculator on the site auto-fills from it. This page must:

1. Make profile creation feel effortless (< 30 seconds)
2. Show immediate value after creation (dashboard of auto-calculated insights)
3. Clearly communicate that data stays private (localStorage only)
4. **Proactively guide users to back up their profile** — localStorage is cleared by browser cache-clearing, private/incognito mode (Safari: 7-day expiry), and device switching. The "One profile. Every answer." promise breaks if data disappears silently.

> ⚠️ **Critical risk**: A user who loses their profile data and has to re-enter everything will form a strongly negative impression of the site’s reliability — directly undermining the core differentiator. The Export flow must be prominent, not buried.

**Data persistence strategy**:
- Primary: `localStorage` (instant, no backend required)
- Safety net: Trigger a `[Download Backup]` prompt immediately after profile creation (JSON file to device)
- Recovery: `[Import from Backup]` always visible on the empty state page
- Optional: Email-to-self backup (user enters email, we send them their profile JSON as an attachment — zero marketing, one transactional send only)

---

## 2. SEO Metadata

```
Title:    My Pet Profile — Free Dog & Cat Health Dashboard | petsMetrics
Desc:     Create a free pet profile for your dog or cat. All health calculators 
          auto-fill from your profile. No login required. 100% private.
Canonical: https://petsmetrics.com/profile/
Schema:   WebApplication
```

---

## 3. Full Page Layout (Two States)

### State A — Empty State (No profile yet)

```
┌─────────────────────────────────────────────────────────────────┐
│  Global Nav                                                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  [HERO — Centered]                                              │
│  Your pet's command center.          (H1)                       │
│  Create a profile in 30 seconds,     (subtext)                  │
│  and never retype your pet's info again.                        │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │  [Create Your First Pet]   (large teal CTA)             │   │
│  │                                                         │   │
│  │  🔒 100% Private · Stored on your device only          │   │
│  │     No account needed · Export/Import anytime           │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  [Preview of what a filled profile looks like — screenshot]    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
│  Footer                                                         │
```

### State B — Profile Exists (Dashboard)

```
┌─────────────────────────────────────────────────────────────────┐
│  Global Nav                                                     │
├─────────────────────────────────────────────────────────────────┤
│  Pet Switcher Bar + [+ Add Pet] button                          │
├─────────────────────────────────────────────────────────────────┤
│  [Pet Profile Card — Hero]                                      │
│  Photo / Avatar · Name · Breed · Age · Weight · Status          │
├─────────────────────────────────────────────────────────────────┤
│  [Quick Stats Row]                                              │
│  Calorie Need · Human Age · Next Vaccine · BCS Score            │
├─────────────────────────────────────────────────────────────────┤
│  [Linked Tools Grid]                                            │
│  All tools with "Open with [Pet Name]'s data" buttons           │
├─────────────────────────────────────────────────────────────────┤
│  [Data Management]                                              │
│  Export JSON · Import JSON · Edit Profile · Delete              │
└─────────────────────────────────────────────────────────────────┘
│  Footer                                                         │
```

---

## 4. Create Profile Flow (Modal / Inline Form)

Triggered by CTA. Uses step-by-step single-question flow (wizard style).

### Step Layout Shell

```
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│  Step 2 of 5  ●●○○○                     [← Back]             │
│                                                                │
│  ─────────────────────────────────────────────────────────    │
│                                                                │
│            [STEP CONTENT — centered, max-width 480px]         │
│                                                                │
│  ─────────────────────────────────────────────────────────    │
│                                                                │
│                             [Continue →]                       │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

- Progress dots: 5 steps. Filled = complete, current = teal pulsing, empty = gray
- Back button: Only on steps 2+
- Continue button: Disabled until current step is valid
- Step transition: Slide left (forward) / slide right (backward), 250ms

---

### Step 1 — Pet Type

```
┌────────────────────────────────────────────────────────────────┐
│  Step 1 of 5  ●○○○○                                           │
│                                                                │
│         What kind of pet is this profile for?                  │
│                    (H2, centered)                              │
│                                                                │
│     ┌─────────────────────┐   ┌─────────────────────┐        │
│     │                     │   │                     │        │
│     │     🐕              │   │     🐱              │        │
│     │   Dog               │   │   Cat               │        │
│     │                     │   │                     │        │
│     └─────────────────────┘   └─────────────────────┘        │
│       (large selection card)    (large selection card)        │
│                                                                │
│  Selecting a type sets the color theme for this profile.      │
│                                                                │
│                             [Continue →]                       │
└────────────────────────────────────────────────────────────────┘
```

- Cards: 200px × 200px, border-radius 16px
- Unselected: `--gray-100` bg, `--gray-300` border
- Dog selected: `--dog-primary-light` bg, `--dog-primary` border (2px), amber icon
- Cat selected: `--cat-primary-light` bg, `--cat-primary` border (2px), violet icon
- Click: instant selection, auto-advance after 300ms delay

---

### Step 2 — Name & Breed

```
┌────────────────────────────────────────────────────────────────┐
│  Step 2 of 5  ●●○○○                            [← Back]       │
│                                                                │
│         Tell us about your dog.                                │
│                    (H2, centered)                              │
│                                                                │
│  Pet Name *                                                    │
│  ┌────────────────────────────────────────────────────────┐   │
│  │  e.g. Buddy, Luna, Max...                              │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                                │
│  Breed *                                                       │
│  ┌────────────────────────────────────────────────────────┐   │
│  │  🔍 Search breed or select...                  ▾       │   │
│  └────────────────────────────────────────────────────────┘   │
│  → Dropdown with search, grouped: Small / Medium / Large /    │
│    Giant / Mixed Breed                                         │
│                                                                │
│  If mixed breed, select primary mix or "Mixed / Unknown"       │
│                                                                │
│                             [Continue →]                       │
└────────────────────────────────────────────────────────────────┘
```

**Breed selector**: Virtualized list (react-window), 400+ dog breeds, 80+ cat breeds.  
Groups: Popular → Alphabetical. Search uses fuzzy matching.

---

### Step 3 — Birthday & Weight

```
┌────────────────────────────────────────────────────────────────┐
│  Step 3 of 5  ●●●○○                            [← Back]       │
│                                                                │
│         Now the numbers.                                       │
│                    (H2, centered)                              │
│                                                                │
│  Birthday *    or    Current Age                               │
│  ┌──────────────────┐    ┌──────────────────────────────┐     │
│  │  MM / DD / YYYY  │    │  ___  years  ___  months     │     │
│  └──────────────────┘    └──────────────────────────────┘     │
│                                                                │
│  If exact birthday is unknown, enter approximate age.          │
│                                                                │
│  Current Weight *                                              │
│  ┌───────────────────────────┬──────────────┐                 │
│  │  28                       │  kg  │  lb   │                 │
│  └───────────────────────────┴──────────────┘                 │
│                                                                │
│  Weight unit toggle saves to localStorage preference.          │
│                                                                │
│                             [Continue →]                       │
└────────────────────────────────────────────────────────────────┘
```

---

### Step 4 — Health Status

```
┌────────────────────────────────────────────────────────────────┐
│  Step 4 of 5  ●●●●○                            [← Back]       │
│                                                                │
│         A few quick health details.                            │
│                    (H2, centered)                              │
│                                                                │
│  Sex *                                                         │
│  ┌──────────────────┬──────────────────┐                      │
│  │    ♂  Male       │    ♀  Female     │                      │
│  └──────────────────┴──────────────────┘                      │
│                                                                │
│  Spayed / Neutered? *                                          │
│  ┌──────────────────┬──────────────────┐                      │
│  │    ✓  Yes        │    ✗  No         │                      │
│  └──────────────────┴──────────────────┘                      │
│                                                                │
│  Why we ask: Affects calorie and hormone-related calculations. │
│                                                                │
│  Activity Level                                                │
│  ○ Sedentary (mostly indoors)                                  │
│  ● Moderate (daily walks)         ← default                   │
│  ○ Active (runs, sports)                                       │
│  ○ Working dog (high intensity)                                │
│                                                                │
│                             [Continue →]                       │
└────────────────────────────────────────────────────────────────┘
```

---

### Step 5 — Optional Photo & Confirm

```
┌────────────────────────────────────────────────────────────────┐
│  Step 5 of 5  ●●●●●                            [← Back]       │
│                                                                │
│         Almost done — looking good!                            │
│                    (H2, centered)                              │
│                                                                │
│  ┌──────────────────────────────────────────────────────┐     │
│  │                                                      │     │
│  │   🐕 Buddy                                           │     │
│  │   Labrador · Male · Neutered                         │     │
│  │   3 years old · 28 kg                                │     │
│  │   Activity: Moderate                                  │     │
│  │                                                      │     │
│  └──────────────────────────────────────────────────────┘     │
│                                                                │
│  Add a photo (optional)                                        │
│  ┌──────────────────────────────────────────────────────┐     │
│  │  [📷 Upload Photo]   or   [Choose Avatar]             │     │
│  └──────────────────────────────────────────────────────┘     │
│  Photo is stored locally, never uploaded.                      │
│                                                                │
│                    [🐾 Create Profile]                         │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

Avatar library: 12 illustrated dog breeds + 8 cat types (SVG, accessible).  
Photo upload: Client-side only, compressed to < 200KB using browser Canvas API.

---

### Completion State — Success

After clicking "Create Profile":

```
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│              ✓                                                 │
│         (large animated checkmark, teal)                       │
│                                                                │
│         Buddy's profile is ready!                              │
│                                                                │
│         All tools will now auto-fill with Buddy's data.        │
│                                                                │
│  [🍖 Check Calorie Needs →]   [💉 View Vaccine Schedule →]    │
│                                                                │
│              [Go to My Dashboard]                              │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

Checkmark animation: Draw SVG stroke, 400ms ease-out.

#### Backup Prompt (shown immediately below success state)

Displayed in-line, not as a blocking modal:

```
┌────────────────────────────────────────────────────────────────────
│  💾  Your profile is saved on this device.                      │
│      To keep it safe if you clear your browser or switch       │
│      devices, download a backup:                               │
│                                                                │
│      [⬇️ Download Backup File]   (primary, teal button)         │
│                                                                │
│      — or —  Email it to yourself:                            │
│      ┌──────────────────────────────────────────┐  [📧 Send]  │
│      │  your@email.com                         │            │
│      └──────────────────────────────────────────┘            │
│      One-time send. No newsletters. Unsubscribe anytime.       │
│                                                      [Skip →]  │
└────────────────────────────────────────────────────────────────────
```

- Email send: transactional only — attaches `buddy-profile-backup.json` to email, zero marketing
- GDPR note: email is used solely for this one delivery; disclose clearly in the UI
- This is also the primary cold-start email list seed (users who opt in for backup are already high-intent)

#### Birthday Reminder Prompt (shown below Backup block)

```
┌────────────────────────────────────────────────────────────────────
│  🎂  Want a birthday reminder for Buddy?                         │
│      We’ll send you a card on March 12 every year. 🐾         │
│                                                                │
│      ┌──────────────────────────────────────────┐  [Yes please!]  │
│      │  your@email.com                         │               │
│      └──────────────────────────────────────────┘               │
│      Annual reminder only. No spam.                 [Skip →]   │
└────────────────────────────────────────────────────────────────────
```

- **Highest email opt-in rate** of any pet-related touchpoint (industry avg 40–60% for birthday reminders)
- If user already provided email in the Backup step above, pre-fill the field and skip directly to confirmation
- Birthday email content: celebratory, low-key, includes a "check Buddy’s updated calorie needs" link (drives re-engagement)

---

## 5. Dashboard (State B) — Full Specification

### Pet Switcher Bar

```
┌──────────────────────────────────────────────────────────────────┐
│ 🐕 Buddy  │  🐱 Luna  │  [+ Add Another Pet]                     │
└──────────────────────────────────────────────────────────────────┘
```

- Tab per pet, max display 4 (overflow: scroll)
- Active pet tab: bottom border 2px `--brand-teal`
- Add button: dashed border, teal text

---

### Profile Hero Card

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  [Avatar 80px]   Buddy                    [Edit ✏️]         │
│                  Labrador Retriever                          │
│                  ♂ Male · Neutered · Moderate Activity       │
│                  Born: March 12, 2023 · 28 kg (61.7 lb)     │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

- Background: dog → `--dog-surface`, cat → `--cat-surface`
- Left accent bar: 4px `--dog-primary` or `--cat-primary`
- Avatar: circular 80px, border 3px white + shadow

---

### Quick Stats Row (Auto-calculated from profile)

4 stat cards in a horizontal row:

```
┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ Daily Calories│  │ Human Age    │  │ Next Vaccine │  │ Life Stage   │
│              │  │              │  │              │  │              │
│  1,240       │  │  ~33 years   │  │  Jun 15      │  │  Adult       │
│  kcal/day    │  │  (Prime)     │  │  Bordetella  │  │  (Prime)     │
│              │  │              │  │              │  │              │
│ [Recalculate]│  │  [Open →]    │  │  [Full →]    │  │  [Open →]    │
└──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘
```

- Stat number: 32px semibold, `--gray-900`
- Label: 13px `--gray-500`
- Card: white bg, 1px `--gray-200` border, 12px radius
- On mobile: 2×2 grid

---

### Linked Tools Grid

```
  Your tools for Buddy          (H2)
  ─────────────────────────────────

  [Tool Card Grid — same as Hub page but with pre-fill indicator]

  Each card shows:
  ┌────────────────────────────────────────┐
  │  🍖 Calorie Calculator                │
  │  Auto-filled: Weight, Activity Level  │
  │  ────────────────────────────────────  │
  │  [Open with Buddy's data →]           │
  └────────────────────────────────────────┘
```

Green dot indicator "Auto-filled" means all required fields will be pre-populated.

---

### Data Management Panel

```
┌──────────────────────────────────────────────────────────────┐
│  Your data is 100% private                                   │
│  Stored only on this device · Never uploaded to any server   │
│                                                              │
│  [📤 Export All Profiles as JSON]   ← always visible, prominent│
│  [📥 Import JSON from another device]                        │
│  [✏️ Edit Buddy's Profile]                                    │
│  [🗑️ Delete Buddy's Profile]   (red, confirmation required)  │
│                                                              │
│  ⚠️ Profiles are stored in your browser. Clearing cache or  │
│     switching devices will erase your data unless you export. │
└──────────────────────────────────────────────────────────────
```

- Privacy message: lock icon + `--status-safe` color
- **Export button is top-priority** — not buried at bottom; placed above Edit/Delete
- Warning banner: amber `--status-caution-bg`, clearly explains localStorage limitation
- Delete: requires typing pet's name to confirm (destructive action)

---

## 6. Mobile Layout (≤ 768px)

- Profile hero card: stacked, avatar centered above details
- Quick stats: 2×2 grid → scrollable 2×2
- Tools grid: 1 column
- Wizard: Full-screen steps, bottom CTA fixed

---

## 7. localStorage Data Schema

```json
{
  "pets": [
    {
      "id": "uuid-v4",
      "type": "dog",
      "name": "Buddy",
      "breed": "labrador-retriever",
      "breedSize": "large",
      "sex": "male",
      "neutered": true,
      "birthday": "2023-03-12",
      "weightKg": 28,
      "activityLevel": "moderate",
      "avatarType": "photo",
      "avatarData": "base64...",
      "createdAt": "2026-06-06T10:00:00Z",
      "updatedAt": "2026-06-06T10:00:00Z"
    }
  ],
  "activePetId": "uuid-v4",
  "preferences": {
    "weightUnit": "kg",
    "region": "US"
  }
}
```

---

## 8. Accessibility Notes

- Wizard steps: `role="main"`, each step uses `aria-live="assertive"` for step announcement
- Pet type cards: `role="radio"`, `aria-checked`
- Progress dots: `aria-label="Step 2 of 5"`
- Delete confirmation: Focus trap in modal, `role="alertdialog"`
