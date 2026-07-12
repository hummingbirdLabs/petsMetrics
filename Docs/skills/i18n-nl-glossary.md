# Dutch Veterinary Translation Guide — i18n Phase 8 (nl)

## Translation Rules
1. **Tone**: Professional veterinary science (专业兽医科普). Match en.json register. Use formal "u" register for owner-facing instructions.
2. **Preserve exactly**: HTML tags (`<strong>`, `<a>`), phone numbers `(888) 426-4435`, `$` amounts, emoji (🚨📞👀⚠️🏥), interpolation `{variable}`, units (mg/kg, mL, lbs), medical abbreviations (ASPCA, AVMA, AAHA, FDA, AAFCO, LD50, BCS, CNS, GI, IV, DCM).
3. **Length**: ≤150% of English source length.
4. **Dutch plural**: Use next-intl plural syntax if needed. Latin-script — cognates (Ideal, Status, Senior, Optimaal) are valid.

## Core Glossary (nl)

| English | Dutch |
|---------|---------|
| HIGH / High | Hoog |
| Moderate | Matig |
| CRITICAL | Kritiek |
| Low | Laag |
| None | Geen |
| vomiting | braken |
| diarrhea | diarree |
| abdominal pain | buikpijn |
| lethargy | lethargie |
| seizure | toeval |
| tremors | trillingen |
| hyperactivity | hyperactiviteit |
| restlessness | onrust |
| collapse | collaps |
| ataxia | ataxie |
| disorientation | desoriëntatie |
| depression | depressie |
| arrhythmia | aritmie |
| pancreatitis | pancreatitis |
| obstruction | obstructie |
| perforation | perforatie |
| necrosis | necrose |
| hypothermia | hypothermie |
| hypoglycemia | hypoglykemie |
| metabolic acidosis | metabolische acidose |
| activated charcoal | actieve kool |
| IV fluids | intraveneuze vloeistoffen |
| decontamination | decontaminatie |
| aspiration | aspiratie |
| esophagus | slokdarm |
| trachea | luchtpijp |
| thyroid | schildklier |
| brachycephalic | brachycefaal |
| xylitol | xylitol |
| theobromine | theobromine |
| caffeine | cafeïne |
| persin | persine |
| ethanol | ethanol |
| Chocolate | Chocolade |
| Avocado | Avocado |
| Onion | Ui |
| Garlic | Knoflook |
| Step 1/2/3/4 | Stap 1/2/3/4 |
| Emergency vet NOW | Spoeddierenarts NU |
| Call vet immediately | Bel direct de dierenarts |
| Poison Control | Vergiftigingeninformatie |
| Toxic Food & Plant Checker | Checker voor giftig voedsel en planten |
| Dog Calorie Calculator | Calorieëncalculator voor honden |
| Cat BCS & Weight Tracker | BCS- en gewichtstracker voor katten |
| Risk Level | Risiconiveau |
| Action Required | Vereiste actie |
| Amount Eaten | Gegeten hoeveelheid |
| hours | uur |
| minutes | minuten |

## Task
Read `messages/_ub_nl_<N>.json` (hash → English value).
Translate each value to Dutch following the glossary above.
Write `messages/_ubt_nl_<N>.json` (hash → Dutch translation).
Every hash in the input MUST appear in the output. Do NOT skip any.
