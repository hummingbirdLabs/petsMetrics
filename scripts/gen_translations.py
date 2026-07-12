#!/usr/bin/env python3
"""Generate de-translations-map.json by reading untranslated keys and applying translations."""
import json, sys

with open('scripts/untranslated-keys.json', encoding='utf-8') as f:
    untranslated = json.load(f)

# Build translation map
translations = {}

# Process each key
for key, value in untranslated.items():
    # Skip if already translated (shouldn't happen)
    pass

# We'll fill translations dict from a big inline dictionary
# For now, just print the keys
for k in sorted(untranslated.keys()):
    print(k)
