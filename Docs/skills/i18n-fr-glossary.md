# French Veterinary Translation Guide — i18n Phase 9 (fr)

## Translation Rules
1. **Tone**: Professional veterinary science (专业兽医科普). Match en.json register. Use formal "vous" register for owner-facing instructions.
2. **Preserve exactly**: HTML tags (`<strong>`, `<a>`), phone numbers `(888) 426-4435`, `$` amounts, emoji (🚨📞👀⚠️🏥), interpolation `{variable}`, units (mg/kg, mL, lbs), medical abbreviations (ASPCA, AVMA, AAHA, FDA, AAFCO, LD50, BCS, CNS, GI, IV, DCM).
3. **Length**: ≤150% of English source length.
4. **French plural**: Use next-intl plural syntax if needed. Latin-script — cognates (Idéal, Status, Senior, Normal) are valid.

## Core Glossary (fr)

| English | French |
|---------|---------|
| HIGH / High | Élevé |
| Moderate | Modéré |
| CRITICAL | Critique |
| Low | Faible |
| None | Aucun |
| vomiting | vomissement |
| diarrhea | diarrhée |
| abdominal pain | douleur abdominale |
| lethargy | léthargie |
| seizure | crise convulsive |
| tremors | tremblements |
| hyperactivity | hyperactivité |
| restlessness | agitation |
| collapse | collapsus |
| ataxia | ataxie |
| disorientation | désorientation |
| depression | abattement |
| arrhythmia | arythmie |
| pancreatitis | pancréatite |
| obstruction | obstruction |
| perforation | perforation |
| necrosis | nécrose |
| hypothermia | hypothermie |
| hypoglycemia | hypoglycémie |
| metabolic acidosis | acidose métabolique |
| activated charcoal | charbon actif |
| IV fluids | liquides intraveineux |
| decontamination | décontamination |
| aspiration | aspiration |
| esophagus | œsophage |
| trachea | trachée |
| thyroid | thyroïde |
| brachycephalic | brachycéphale |
| xylitol | xylitol |
| theobromine | théobromine |
| caffeine | caféine |
| persin | persine |
| ethanol | éthanol |
| Chocolate | Chocolat |
| Avocado | Avocat |
| Onion | Oignon |
| Garlic | Ail |
| Step 1/2/3/4 | Étape 1/2/3/4 |
| Emergency vet NOW | Vétérinaire d'urgence MAINTENANT |
| Call vet immediately | Appelez le vétérinaire immédiatement |
| Poison Control | Centre antipoison |
| Toxic Food & Plant Checker | Vérificateur d'aliments et plantes toxiques |
| Dog Calorie Calculator | Calculateur de calories pour chiens |
| Cat BCS & Weight Tracker | Suivi de l'ICC et du poids pour chats |
| Risk Level | Niveau de risque |
| Action Required | Action requise |
| Amount Eaten | Quantité ingérée |
| hours | heures |
| minutes | minutes |

## Task
Read `messages/_ub_fr_<N>.json` (hash → English value).
Translate each value to French following the glossary above.
Write `messages/_ubt_fr_<N>.json` (hash → French translation).
Every hash in the input MUST appear in the output. Do NOT skip any.
