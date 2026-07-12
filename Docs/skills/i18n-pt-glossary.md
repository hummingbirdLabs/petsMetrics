# Portuguese Veterinary Translation Guide — i18n Phase 7 (pt)

## Translation Rules
1. **Tone**: Professional veterinary science (专业兽医科普). Match en.json register. Use Brazilian Portuguese (pt-BR) conventions; formal "você" for owner-facing instructions.
2. **Preserve exactly**: HTML tags (`<strong>`, `<a>`), phone numbers `(888) 426-4435`, `$` amounts, emoji (🚨📞👀⚠️🏥), interpolation `{variable}`, units (mg/kg, mL, lbs), medical abbreviations (ASPCA, AVMA, AAHA, FDA, AAFCO, LD50, BCS, CNS, GI, IV, DCM).
3. **Length**: ≤150% of English source length.
4. **Portuguese plural**: Use next-intl plural syntax if needed. Latin-script — cognates (Ideal, Status, Senior) are valid.

## Core Glossary (pt)

| English | Portuguese (BR) |
|---------|---------|
| HIGH / High | Alto |
| Moderate | Moderado |
| CRITICAL | Crítico |
| Low | Baixo |
| None | Nenhum |
| vomiting | vômito |
| diarrhea | diarreia |
| abdominal pain | dor abdominal |
| lethargy | letargia |
| seizure | convulsão |
| tremors | tremores |
| hyperactivity | hiperatividade |
| restlessness | inquietude |
| collapse | colapso |
| ataxia | ataxia |
| disorientation | desorientação |
| depression | depressão |
| arrhythmia | arritmia |
| pancreatitis | pancreatite |
| obstruction | obstrução |
| perforation | perfuração |
| necrosis | necrose |
| hypothermia | hipotermia |
| hypoglycemia | hipoglicemia |
| metabolic acidosis | acidose metabólica |
| activated charcoal | carvão ativado |
| IV fluids | fluidos intravenosos |
| decontamination | descontaminação |
| aspiration | aspiração |
| esophagus | esôfago |
| trachea | traqueia |
| thyroid | tireoide |
| brachycephalic | braquicéfalo |
| xylitol | xilitol |
| theobromine | teobromina |
| caffeine | cafeína |
| persin | persina |
| ethanol | etanol |
| Chocolate | Chocolate |
| Avocado | Abacate |
| Onion | Cebola |
| Garlic | Alho |
| Step 1/2/3/4 | Passo 1/2/3/4 |
| Emergency vet NOW | Veterinário de emergência AGORA |
| Call vet immediately | Ligue para o veterinário imediatamente |
| Poison Control | Controle de Envenenamento |
| Toxic Food & Plant Checker | Verificador de Alimentos e Plantas Tóxicos |
| Dog Calorie Calculator | Calculadora de Calorias para Cães |
| Cat BCS & Weight Tracker | Monitor de ICC e Peso para Gatos |
| Risk Level | Nível de risco |
| Action Required | Ação necessária |
| Amount Eaten | Quantidade ingerida |
| hours | horas |
| minutes | minutos |

## Task
Read `messages/_ub_pt_<N>.json` (hash → English value).
Translate each value to Portuguese following the glossary above.
Write `messages/_ubt_pt_<N>.json` (hash → Portuguese translation).
Every hash in the input MUST appear in the output. Do NOT skip any.
