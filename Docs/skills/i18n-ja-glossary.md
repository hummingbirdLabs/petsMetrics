# Japanese Veterinary Translation Guide — i18n Phase 11 (ja)

## Translation Rules
1. **Tone**: Professional veterinary science (专业兽医科普). Match en.json register. Use です/ます (desu/masu) polite form for owner-facing instructions.
2. **Preserve exactly**: HTML tags (`<strong>`, `<a>`), phone numbers `(888) 426-4435`, `$` amounts, emoji (🚨📞👀⚠️🏥), interpolation `{variable}`, units (mg/kg, mL, lbs), medical abbreviations (ASPCA, AVMA, AAHA, FDA, AAFCO, LD50, BCS, CNS, GI, IV, DCM).
3. **Length**: ≤150% of English source length. Use kanji/kana for prose. Keep Latin units/abbreviations inline. Half-width digits acceptable.
4. **Japanese plural**: Japanese generally does not require plural forms. Use next-intl plural syntax only when explicitly needed.

## Core Glossary (ja)

| English | Japanese |
|---------|---------|
| HIGH / High | 高 |
| Moderate | 中程度 |
| CRITICAL | 危急 |
| Low | 低 |
| None | なし |
| vomiting | 嘔吐 |
| diarrhea | 下痢 |
| abdominal pain | 腹痛 |
| lethargy | 嗜眠 |
| seizure | 発作 |
| tremors | 震え |
| hyperactivity | 多動 |
| restlessness | 不安 |
| collapse | 虚脱 |
| ataxia | 失調 |
| disorientation | 见当識障害 |
| depression | 抑うつ |
| arrhythmia | 不整脈 |
| pancreatitis | 膵炎 |
| obstruction | 閉塞 |
| perforation | 穿孔 |
| necrosis | 壊死 |
| hypothermia | 低体温 |
| hypoglycemia | 低血糖 |
| metabolic acidosis | 代謝性アシドーシス |
| activated charcoal | 活性炭 |
| IV fluids | 輸液 |
| decontamination | 除染 |
| aspiration | 誤嚥 |
| esophagus | 食道 |
| trachea | 気管 |
| thyroid | 甲状腺 |
| brachycephalic | 短頭種 |
| xylitol | キシリトール |
| theobromine | テオブロミン |
| caffeine | カフェイン |
| persin | ペルシン |
| ethanol | エタノール |
| Chocolate | チョコレート |
| Avocado | アボカド |
| Onion | 玉ねぎ |
| Garlic | にんにく |
| Step 1/2/3/4 | ステップ 1/2/3/4 |
| Emergency vet NOW | 今すぐ動物病院へ |
| Call vet immediately | すぐに獣医師に連絡してください |
| Poison Control | 毒物管理 |
| Toxic Food & Plant Checker | 有毒食品・植物チェッカー |
| Dog Calorie Calculator | 犬用カロリー計算機 |
| Cat BCS & Weight Tracker | 猫用BCS・体重トラッカー |
| Risk Level | リスクレベル |
| Action Required | 必要な対応 |
| Amount Eaten | 摂取量 |
| hours | 時間 |
| minutes | 分 |

## Task
Read `messages/_ub_ja_<N>.json` (hash → English value).
Translate each value to Japanese following the glossary above.
Write `messages/_ubt_ja_<N>.json` (hash → Japanese translation).
Every hash in the input MUST appear in the output. Do NOT skip any.
