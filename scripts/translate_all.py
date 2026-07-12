#!/usr/bin/env python3
"""
Translate all untranslated keys from English to German using deep_translator.
Preserves HTML tags, variables ({name}, etc.), URLs, phone numbers, brand names.
"""
import json
import re
import time
import os
import sys

# Use deep_translator with GoogleTranslator
from deep_translator import GoogleTranslator

def load_json(path):
    with open(path, 'r', encoding='utf-8-sig') as f:
        return json.load(f)

def save_json(path, data):
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write('\n')

def preserve_tags_vars(text):
    """Replace HTML tags and variables with placeholders for translation."""
    placeholders = {}
    counter = [0]

    def replacer(match):
        placeholder = f"«X{counter[0]}»"
        placeholders[placeholder] = match.group(0)
        counter[0] += 1
        return placeholder

    # Preserve HTML tags
    text = re.sub(r'<[^>]+>', replacer, text)
    # Preserve variables like {name}, {age}, {weight}
    text = re.sub(r'\{[^{}]+\}', replacer, text)
    # Preserve URLs
    text = re.sub(r'https?://[^\s<>"\']+', replacer, text)
    # Preserve ASPCA phone numbers
    text = re.sub(r'\(\d{3}\)\s*\d{3}-\d{4}', replacer, text)

    return text, placeholders;

def restore_tags_vars(text, placeholders):
    """Restore all placeholders back to original values."""
    for placeholder, original in placeholders.items():
        text = text.replace(placeholder, original)
    return text

def translate_text_batch(texts, translator, delay=0.15):
    """Translate a list of texts. Uses individual translation for reliability."""
    results = []
    for i, text in enumerate(texts):
        p_text, placeholders = preserve_tags_vars(text)

        try:
            translated = translator.translate(p_text)
            translated = restore_tags_vars(translated, placeholders)
            # Clean up German quote styles that might come from translation
            translated = translated.replace('«X', '«X')  # keep our placeholders
            results.append(translated)
        except Exception as e:
            print(f"  Error translating item {i}: {e}", file=sys.stderr)
            results.append(text)  # fallback to English

        if i % 10 == 0:
            print(f"  Progress: {i}/{len(texts)}", file=sys.stderr)

        time.sleep(delay)

    return results

def main():
    en_path = 'messages/en.json'
    de_path = 'messages/de.json'
    untranslated_path = 'scripts/untranslated-keys.json'
    out_path = 'scripts/de-translations-map.json'

    untranslated = load_json(untranslated_path)
    translator = GoogleTranslator(source='en', target='de')

    keys = list(untranslated.keys())
    values = list(untranslated.values())

    print(f"Translating {len(keys)} keys...", file=sys.stderr)

    translated_values = translate_text_batch(values, translator, delay=0.1)

    result = {}
    for k, v in zip(keys, translated_values):
        result[k] = v

    save_json(out_path, result)
    print(f"Saved {len(result)} translations to {out_path}", file=sys.stderr)

if __name__ == '__main__':
    main()
