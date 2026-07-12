#!/usr/bin/env python3
"""Analyze the untranslated keys by type (string vs array vs nested)."""
import json
import sys

with open('scripts/untranslated-keys.json', encoding='utf-8') as f:
    data = json.load(f)

str_count = 0
list_count = 0
str_keys = []
list_keys = []
longest = ""
longest_key = ""
total_chars = 0
empty_or_pure_keys = []

for k, v in data.items():
    if isinstance(v, str):
        str_count += 1
        str_keys.append((k, v))
        total_chars += len(v)
        if len(v) > len(longest):
            longest = v
            longest_key = k
    elif isinstance(v, list):
        list_count += 1
        list_keys.append(k)

    # Keys with common untranslatable English terms that should stay English
    if v in ("Home", "Dog", "Cat", "Senior", "Optional", "404", "Submit", "Calculate"):
        empty_or_pure_keys.append((k, v))

print(f"String keys: {str_count}")
print(f"List keys: {list_count}")
print(f"Total: {len(data)}")
print(f"Total char count: {total_chars}")
print(f"\nLongest key: {longest_key} ({len(longest)} chars)")
print(f"First 500 chars of longest: {longest[:500]}")
print(f"\nBasic/Universal English keys to keep (Home/Dog/Cat/etc):")
for k, v in empty_or_pure_keys:
    print(f"  {k}: {v}")
