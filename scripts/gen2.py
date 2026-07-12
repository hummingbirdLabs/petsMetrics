#!/usr/bin/env python3
"""Generate fr-translations-map.json with all 432 translations."""
import json

# This script contains the full translation map for all untranslated keys.
# It reads the partial existing file and merges all batch files.

import os

def load_json(path):
    with open(path, encoding='utf-8-sig') as f:
        return json.load(f)

# Start with existing partial
result = load_json('scripts/fr-translations-map.json')
print(f'Loaded {len(result)} existing translations')

# Load all batch files
for i in range(1, 20):
    bf = f'scripts/gen_batch_{i}.json'
    if os.path.exists(bf):
        data = load_json(bf)
        result.update(data)
        print(f'{bf}: +{len(data)} = {len(result)}')

with open('scripts/fr-translations-map.json', 'w', encoding='utf-8') as f:
    json.dump(result, f, ensure_ascii=False, indent=2)

print(f'Final: {len(result)} translations')
