#!/usr/bin/env python3
"""
Find keys in de.json where the value is identical to en.json (untranslated).
Output a JSON file with the untranslated keys and empty values.
"""
import json
import sys
import re

POETIC_PHRASES = {
    "Checkered",
    "Top",
    "Rank",
    "Am I",
    "Is my",
    "How",
    "Did you",
    "Find out",
    "and more!",
    "and dog",
    "and Unleash",
    "and Burn",
    "and Old",
    "is just",
    "analysis",
    "Readiness",
    "Our",
    "Miscarriage",
    "Mammary",
    "Rectal",
    "Demodex",
    "Hypothermia",
    "It's Itch",
    "Temperature",
    "Temperature,",
    "Unsuccessfull",
    "Analysis",
    "General",
    "Body",
    "Lay",
    "Living",
    "Feeder",
    "Age,",
    "with",
    "Fresh",
    "Only",
    "Terms",
    "of",
    "None",
    "Train",
    "Outer",
    "Why",
    "Is Your",
    "for",
    "Adult",
    "Training",
    "Ideal",
    "It's Allerg",
    "Health",
    "Food",
    "Calcium",
    "Puppies",
    "Cats",
    "Trends",
    "AI",
    "Obesity",
    "Hip",
    "Breed",
    "What",
    "Assessment",
    "Daily",
    "Your",
    "Pick",
    "Perfect",
    "Pet",
    "New",
    "First",
    "Nightmare",
    "Find",
    "Is It",
    "Pure",
    "Is",
    "Kcal",
    "Calcu",
    "Rule",
    "of",
    "Treatment",
    "Opposite",
    "Etc",
    "a Prog",
    "Sum",
    "Respiratory",
    "Blood",
    "CPR",
    "Eye",
    "How Much",
    "Your Pet",
    "Heat",
    "Stroke",
    "Dangerously",
    "Hot",
    "Map",
    "Sniffer",
    "Spark",
    "Content",
}

def load_json(path):
    with open(path, 'r', encoding='utf-8-sig') as f:
        data = json.load(f)
    return data

def get_leaf_strings(obj, prefix=""):
    """Recursively get all leaf string values with their key paths."""
    results = {}
    if isinstance(obj, dict):
        for k, v in obj.items():
            p = f"{prefix}.{k}" if prefix else k
            results.update(get_leaf_strings(v, p))
    elif isinstance(obj, list):
        results[prefix] = obj
    elif isinstance(obj, str):
        results[prefix] = obj
    return results

def main():
    en_path = sys.argv[1] if len(sys.argv) > 1 else 'messages/en.json'
    de_path = sys.argv[2] if len(sys.argv) > 2 else 'messages/de.json'
    out_path = sys.argv[3] if len(sys.argv) > 3 else 'scripts/untranslated-keys.json'

    en_data = load_json(en_path)
    de_data = load_json(de_path)

    en_strings = get_leaf_strings(en_data)
    de_strings = get_leaf_strings(de_data)

    untranslated = {}
    identical_keys = []

    for key, en_val in en_strings.items():
        if key in de_strings:
            de_val = de_strings[key]
            if en_val == de_val:
                identical_keys.append(key)
                untranslated[key] = en_val

    print(f"Total English keys: {len(en_strings)}")
    print(f"Total German keys: {len(de_strings)}")
    print(f"Identical value keys: {len(identical_keys)}")

    with open(out_path, 'w', encoding='utf-8') as f:
        json.dump(untranslated, f, ensure_ascii=False, indent=2)

    print(f"Written {len(untranslated)} untranslated keys to {out_path}")

if __name__ == '__main__':
    main()
