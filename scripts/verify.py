import json

data = json.load(open('scripts/fr-translations-map.json', 'r', encoding='utf-8'))
print(f'Total entries: {len(data)}')

# Count entries that look translated (have French-specific characters)
french_chars = set('àâäéèêëïîôùûüÿçœæÀÂÄÉÈÊËÏÎÔÙÛÜŸÇŒÆ')
translated = sum(1 for v in data.values() if isinstance(v, str) and any(c in french_chars for c in v))
print(f'Entries with French characters: {translated}/{len(data)}')

# Count entries that are kept unchanged
unchanged_keys = [k for k, v in data.items() if isinstance(v, str) and not any(c in french_chars for c in v)]
print(f'Entries kept unchanged (codes/units/URLs): {len(unchanged_keys)}')
print(f'Sample unchanged: {unchanged_keys[:10]}')

# Check some specific translations
test_keys = [
    'emergency.ateChocolate.banner.title',
    'catEmergency.ateLily.banner.title',
    'compare.dryVsWet.title',
    'emergency.ateXylitol.toxicityData.ld50'
]
for k in test_keys:
    if k in data:
        print(f'\n{k}: {data[k][:80]}...')
