#!/usr/bin/env python3
"""
Build de-translations-map.json directly by combining all translations.
Uses a comprehensive translation dictionary.
"""
import json, os, sys, re

def load_untranslated():
    with open('scripts/untranslated-keys.json', encoding='utf-8') as f:
        return json.load(f)

def save_json(path, data):
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write('\n')

def main():
    untranslated = load_untranslated()
    # We'll write the dictionary inline in multiple files and merge
    # For now, just produce a list of all keys to be translated
    print(f"Keys: {len(untranslated)}")

if __name__ == '__main__':
    main()
