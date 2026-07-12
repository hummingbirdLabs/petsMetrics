# Hindi Veterinary Translation Guide — i18n Phase 10 (hi)

## Translation Rules
1. **Tone**: Professional veterinary science (专业兽医科普). Match en.json register. Use respectful "आप" (aap) register for owner-facing instructions.
2. **Preserve exactly**: HTML tags (`<strong>`, `<a>`), phone numbers `(888) 426-4435`, `$` amounts, emoji (🚨📞👀⚠️🏥), interpolation `{variable}`, units (mg/kg, mL, lbs), medical abbreviations (ASPCA, AVMA, AAHA, FDA, AAFCO, LD50, BCS, CNS, GI, IV, DCM).
3. **Length**: ≤150% of English source length. Use Devanagari script for all prose. Keep Latin-script units/abbreviations inline.
4. **Hindi plural**: Use next-intl plural syntax if needed. Devanagari numerals optional; Western digits acceptable.

## Core Glossary (hi)

| English | Hindi (Devanagari) |
|---------|---------|
| HIGH / High | उच्च |
| Moderate | मध्यम |
| CRITICAL | गंभीर |
| Low | निम्न |
| None | कोई नहीं |
| vomiting | उल्टी |
| diarrhea | दस्त |
| abdominal pain | पेट दर्द |
| lethargy | सुस्ती |
| seizure | दौरा |
| tremors | कंपन |
| hyperactivity | अति सक्रियता |
| restlessness | बेचैनी |
| collapse | बेहोशी |
| ataxia | एटैक्सिया |
| disorientation | भ्रम |
| depression | अवसाद |
| arrhythmia | अनियमित धड़कन |
| pancreatitis | अग्न्याशयशोथ |
| obstruction | रुकावट |
| perforation | छेदन |
| necrosis | ऊतक मृत्यु |
| hypothermia | हाइपोथर्मिया |
| hypoglycemia | हाइपोग्लाइसीमिया |
| metabolic acidosis | चयापचय अम्लरक्तता |
| activated charcoal | सक्रिय चारकोल |
| IV fluids | शिरावाहिक द्रव |
| decontamination | विषमुक्ति |
| aspiration | श्वासनली में प्रवेश |
| esophagus | ग्रासनली |
| trachea | श्वासनली |
| thyroid | थायरॉइड |
| brachycephalic | ब्रैकिसेफैलिक |
| xylitol | ज़ाइलिटोल |
| theobromine | थियोब्रोमीन |
| caffeine | कैफीन |
| persin | पर्सिन |
| ethanol | एथेनॉल |
| Chocolate | चॉकलेट |
| Avocado | एवोकाडो |
| Onion | प्याज़ |
| Garlic | लहसुन |
| Step 1/2/3/4 | चरण 1/2/3/4 |
| Emergency vet NOW | अभी पशु चिकित्सक के पास जाएं |
| Call vet immediately | तुरंत पशु चिकित्सक को फोन करें |
| Poison Control | ज़हर नियंत्रण केंद्र |
| Toxic Food & Plant Checker | विषैला भोजन और पौधा जांचकर्ता |
| Dog Calorie Calculator | कुत्तों के लिए कैलोरी कैलकुलेटर |
| Cat BCS & Weight Tracker | बिल्ली BCS और वज़न ट्रैकर |
| Risk Level | जोखिम स्तर |
| Action Required | आवश्यक कार्रवाई |
| Amount Eaten | खाई गई मात्रा |
| hours | घंटे |
| minutes | मिनट |

## Task
Read `messages/_ub_hi_<N>.json` (hash → English value).
Translate each value to Hindi following the glossary above.
Write `messages/_ubt_hi_<N>.json` (hash → Hindi translation).
Every hash in the input MUST appear in the output. Do NOT skip any.
