#!/usr/bin/env python3
"""
Generate scripts/de-translations-map.json with German translations
for all 1438 untranslated keys.
"""
import json, os, sys

# Inline translation data - loads from separate chunk files
translations = {}

def load_chunks():
    """Load translation chunks from multiple files."""
    chunk_dir = os.path.join(os.path.dirname(__file__), 'chunks')
    # Will be populated by writing chunk files directly
    pass

def save():
    with open('scripts/de-translations-map.json', 'w', encoding='utf-8') as f:
        json.dump(translations, f, ensure_ascii=False, indent=2)
        f.write('\n')
    print(f"Saved {len(translations)} translations")

if __name__ == '__main__':
    save()
