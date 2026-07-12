# Spanish Veterinary Translation Guide — i18n Phase 6 (es)

## Translation Rules
1. **Tone**: Professional veterinary science (专业兽医科普). Match en.json register. Use formal "usted" register for owner-facing instructions.
2. **Preserve exactly**: HTML tags (`<strong>`, `<a>`), phone numbers `(888) 426-4435`, `$` amounts, emoji (🚨📞👀⚠️🏥), interpolation `{variable}`, units (mg/kg, mL, lbs), medical abbreviations (ASPCA, AVMA, AAHA, FDA, AAFCO, LD50, BCS, CNS, GI, IV, DCM).
3. **Length**: ≤150% of English source length.
4. **Spanish plural**: Use next-intl plural syntax if needed. Latin-script — cognates (Ideal, Status, Senior) are valid.

## Core Glossary (es)

| English | Spanish |
|---------|---------|
| HIGH / High | Alto |
| Moderate | Moderado |
| CRITICAL | Crítico |
| Low | Bajo |
| None | Ninguno |
| vomiting | vómito |
| diarrhea | diarrea |
| abdominal pain | dolor abdominal |
| lethargy | letargo |
| seizure | convulsión |
| tremors | temblores |
| hyperactivity | hiperactividad |
| restlessness | inquietud |
| collapse | colapso |
| ataxia | ataxia |
| disorientation | desorientación |
| depression | depresión |
| arrhythmia | arritmia |
| pancreatitis | pancreatitis |
| obstruction | obstrucción |
| perforation | perforación |
| necrosis | necrosis |
| hypothermia | hipotermia |
| hypoglycemia | hipoglucemia |
| metabolic acidosis | acidosis metabólica |
| activated charcoal | carbón activado |
| IV fluids | líquidos intravenosos |
| decontamination | descontaminación |
| aspiration | aspiración |
| esophagus | esófago |
| trachea | tráquea |
| thyroid | tiroides |
| brachycephalic | braquicéfalo |
| xylitol | xilitol |
| theobromine | teobromina |
| caffeine | cafeína |
| persin | persina |
| ethanol | etanol |
| Chocolate | Chocolate |
| Avocado | Aguacate |
| Onion | Cebolla |
| Garlic | Ajo |
| Step 1/2/3/4 | Paso 1/2/3/4 |
| Emergency vet NOW | Veterinario de emergencia AHORA |
| Call vet immediately | Llame al veterinario inmediatamente |
| Poison Control | Control de Envenenamiento |
| Toxic Food & Plant Checker | Verificador de Alimentos y Plantas Tóxicos |
| Dog Calorie Calculator | Calculadora de Calorías para Perros |
| Cat BCS & Weight Tracker | Monitor de ICC y Peso para Gatos |
| Risk Level | Nivel de riesgo |
| Action Required | Acción requerida |
| Amount Eaten | Cantidad ingerida |
| hours | horas |
| minutes | minutos |

## Task
Read `messages/_ub_es_<N>.json` (hash → English value).
Translate each value to Spanish following the glossary above.
Write `messages/_ubt_es_<N>.json` (hash → Spanish translation).
Every hash in the input MUST appear in the output. Do NOT skip any.
