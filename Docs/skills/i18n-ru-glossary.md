# Russian Veterinary Translation Guide — i18n Phase 5 (ru)

## Translation Rules
1. **Tone**: Professional veterinary science (专业兽医科普). Match en.json register.
2. **Preserve exactly**: HTML tags (`<strong>`, `<a>`), phone numbers `(888) 426-4435`, `$` amounts, emoji (🚨📞👀⚠️🏥), interpolation `{variable}`, units (mg/kg, mL, lbs), medical abbreviations (ASPCA, AVMA, AAHA, FDA, AAFCO, LD50, BCS, CNS, GI, IV, DCM).
3. **Length**: ≤150% of English source length.
4. **Russian plural rules**: Use next-intl plural syntax if needed. For simple strings, use appropriate singular/plural.

## Core Glossary (ru)

| English | Russian |
|---------|---------|
| HIGH / High | Высокий |
| Moderate | Умеренный |
| CRITICAL | Критический |
| Low | Низкий |
| None | Нет |
| vomiting | рвота |
| diarrhea | диарея |
| abdominal pain | боль в животе |
| lethargy | вялость |
| seizure | судороги |
| tremors | тремор |
| hyperactivity | гиперактивность |
| restlessness | беспокойство |
| collapse | коллапс |
| ataxia | атаксия |
| disorientation | дезориентация |
| depression | угнетение |
| arrhythmia | аритмия |
| pancreatitis | панкреатит |
| obstruction | непроходимость |
| perforation | перфорация |
| necrosis | некроз |
| hypothermia | гипотермия |
| hypoglycemia | гипогликемия |
| metabolic acidosis | метаболический ацидоз |
| activated charcoal | активированный уголь |
| IV fluids | внутривенные жидкости |
| decontamination | деконтаминация |
| aspiration | аспирация |
| esophagus | пищевод |
| trachea | трахея |
| thyroid | щитовидная железа |
| brachycephalic | брахиоцефальный |
| xylitol | ксилит |
| theobromine | теобромин |
| caffeine | кофеин |
| persin | персин |
| ethanol | этанол |
| Chocolate | Шоколад |
| Avocado | Авокадо |
| Onion | Лук |
| Garlic | Чеснок |
| Step 1/2/3/4 | Шаг 1/2/3/4 |
| Emergency vet NOW | Ветеринарная неотложка СЕЙЧАС |
| Call vet immediately | Позвоните ветеринару немедленно |
| Poison Control | Контрольный центр отравлений |
| Toxic Food & Plant Checker | Проверщик токсичной еды и растений |
| Dog Calorie Calculator | Калькулятор калорий для собак |
| Cat BCS & Weight Tracker | Трекер индекса массы тела и веса кошек |
| Risk Level | Уровень риска |
| Action Required | Требуемое действие |
| Amount Eaten | Съеденное количество |
| hours | часов / часа / час |
| minutes | минут / минуты / минута |

## Task
Read `messages/_ub_ru_<N>.json` (hash → English value).
Translate each value to Russian following the glossary above.
Write `messages/_ubt_ru_<N>.json` (hash → Russian translation).
Every hash in the input MUST appear in the output. Do NOT skip any.
