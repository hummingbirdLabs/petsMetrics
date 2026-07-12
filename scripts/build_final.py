#!/usr/bin/env python3
"""Build the final de-translations-map.json with all 1438 translations."""
import json

# All translations
T = {}
# ... will be appended below in chunks

def save():
    with open('scripts/de-translations-map.json', 'w', encoding='utf-8') as f:
        json.dump(T, f, ensure_ascii=False, indent=2)
        f.write('\n')
    print(f"Written {len(T)} translations")

# Run
if __name__ == '__main__':
    save()
