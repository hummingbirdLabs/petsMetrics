# Arabic Veterinary Translation Guide — i18n Phase 4 (ar)

## Translation Rules
1. **Tone**: Professional veterinary science (专业兽医科普). Match en.json register.
2. **Preserve exactly**: HTML tags (`<strong>`, `<a>`), phone numbers `(888) 426-4435`, `$` amounts, emoji (🚨📞👀⚠️🏥), interpolation `{variable}`, units (mg/kg, mL, lbs), medical abbreviations (ASPCA, AVMA, AAHA, FDA, AAFCO, LD50, BCS, CNS, GI, IV).
3. **RTL**: Write natural Arabic. Numbers/units stay LTR within RTL text. Do NOT add RTL marks.
4. **Length**: ≤150% of English source length.

## Core Glossary (ar)

| English | Arabic |
|---------|--------|
| HIGH / High | عالٍ |
| Moderate | متوسط |
| CRITICAL | حرج |
| Low | منخفض |
| None | لا شيء |
| vomiting | تقيؤ |
| diarrhea | إسهال |
| abdominal pain | ألم البطن |
| lethargy | خمول |
| seizure | نوبة صرعية |
| tremors | رعشة |
| hyperactivity | فرط النشاط |
| restlessness | أرق |
| collapse | انهيار |
| ataxia | ترنح |
| disorientation | تشوش |
| depression | كآبة |
| arrhythmia | اضطراب نظم القلب |
| pancreatitis | التهاب البنكرياس |
| obstruction | انسداد |
| perforation | ثقب |
| necrosis | نخر |
| hypothermia | انخفاض حرارة الجسم |
| hypoglycemia | انخفاض سكر الدم |
| metabolic acidosis | الحماض الأيضي |
| activated charcoal | الفحم النشط |
| IV fluids | السوائل الوريدية |
| decontamination | إزالة التلوث |
| aspiration | استنشاق |
| esophagus | مريء |
| trachea | القصبة الهوائية |
| thyroid | الغدة الدرقية |
| brachycephalic | قصير الرأس |
| xylitol | زيليتول |
| theobromine | ثيوبرومين |
| caffeine | كافيين |
| persin | برسين |
| ethanol | إيثانول |
| Chocolate | شوكولاتة |
| Avocado | أفوكادو |
| Onion | بصل |
| Garlic | ثوم |
| Step 1/2/3/4 | الخطوة 1/2/3/4 |
| Emergency vet NOW | طوارئ بيطري فوراً |
| Call vet immediately | اتصل بالطبيب البيطري فوراً |
| Poison Control | مكافحة السموم |
| Toxic Food & Plant Checker | مدقق الأطعمة والنباتات السامة |
| Dog Calorie Calculator | حاسبة سعرات الكلاب |
| Cat BCS & Weight Tracker | متتبع درجة حالة الجسم والوزن للقطط |
| Risk Level | مستوى الخطورة |
| Action Required | الإجراء المطلوب |
| Amount Eaten | الكمية المأكولة |
| hours | ساعات / ساعة |
| minutes | دقائق / دقيقة |

## Task
Read `messages/_ub_ar_<N>.json` (hash → English value).
Translate each value to Arabic following the glossary above.
Write `messages/_ubt_ar_<N>.json` (hash → Arabic translation).
Every hash in the input MUST appear in the output. Do NOT skip any.
