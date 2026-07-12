#!/usr/bin/env python3
"""
Translate untranslated keys from en.json that are identical in es.json.
Outputs: scripts/es-translations-map.json

Uses MyMemory Translation API (free, no key needed, works without Google).
"""
import json
import re
import time
import sys
import urllib.request
import urllib.parse

with open('messages/en.json', 'r', encoding='utf-8-sig') as f:
    en = json.load(f)

with open('messages/es.json', 'r', encoding='utf-8-sig') as f:
    es = json.load(f)

def find_untranslated(en_data, es_data, prefix=''):
    untranslated = {}
    if isinstance(en_data, dict):
        for key in en_data:
            full_key = f'{prefix}.{key}' if prefix else key
            if key in es_data:
                if isinstance(en_data[key], dict) and isinstance(es_data[key], dict):
                    untranslated.update(find_untranslated(en_data[key], es_data[key], full_key))
                else:
                    if en_data[key] == es_data[key]:
                        untranslated[full_key] = en_data[key]
    return untranslated

untranslated = find_untranslated(en, es)
print(f"Total untranslated keys: {len(untranslated)}")

# Separate strings from complex values (arrays/objects)
string_items = {k: v for k, v in untranslated.items() if isinstance(v, str)}
complex_items = {k: v for k, v in untranslated.items() if not isinstance(v, str)}
print(f"String keys: {len(string_items)}, Complex keys: {len(complex_items)}")

# Short strings that match patterns to skip (keep as-is or simple translations)
SIMPLE_TRANSLATIONS = {
    "No": "No",
    "Buddy": "Buddy",
    "404": "404",
    "Ideal": "Ideal",
    "P0": "P0",
    "P1": "P1",
    "Monitor": "Monitorear",
    "Mildly Toxic": "Ligeramente tóxico",
    "Dangerous": "Peligroso",
    "Toxic": "Tóxico",
    "Extremely Toxic": "Extremadamente tóxico",
    "High": "Alto",
    "CRITICAL": "CRÍTICO",
    "Moderate": "Moderado",
    "Low": "Bajo",
}

# Patterns that should NOT be translated (kept as-is)
SKIP_VALUES = {
    "kg", "lb", "ml", "oz", "kcal", "mg", "g", "cm", "mm", "km", "ft", "in", "bpm",
    "Labrador Retriever", "Golden Retriever",
}

def should_skip_or_simple_translate(text):
    """Check if text should not be translated, or has a simple translation."""
    text_stripped = text.strip()
    
    if text_stripped in SKIP_VALUES:
        return True, text_stripped
    if text_stripped in SIMPLE_TRANSLATIONS:
        return True, SIMPLE_TRANSLATIONS[text_stripped]
    
    # Skip URLs
    if text_stripped.startswith('http'):
        return True, text_stripped
    # Skip phone numbers
    if re.match(r'^\(\d{3}\)', text_stripped):
        return True, text_stripped
    # Skip pure numbers/units like "404", "Ideal: 4-5/9"
    if re.match(r'^[\d\s\-\./:]+$', text_stripped):
        return True, text_stripped
    # Skip brand name only
    if text_stripped == 'petsMetrics':
        return True, text_stripped
    return False, None

def extract_protected_tokens(text):
    """Extract HTML tags and variables, replace with placeholders."""
    token_list = []
    
    # Extract HTML tags first
    def repl_tag(m):
        idx = len(token_list)
        token_list.append(m.group(0))
        return f"§§§TAG{idx}§§§"
    
    text = re.sub(r'<[^>]+>', repl_tag, text)
    
    # Extract variables like {name}, {age}, etc.
    def repl_var(m):
        idx = len(token_list)
        token_list.append(m.group(0))
        return f"§§§VAR{idx}§§§"
    
    text = re.sub(r'\{[^}]+\}', repl_var, text)
    
    # Extract URLs
    def repl_url(m):
        idx = len(token_list)
        token_list.append(m.group(0))
        return f"§§§URL{idx}§§§"
    
    text = re.sub(r'https?://[^\s\]\)\"\'<>]+', repl_url, text)
    
    # Extract phone numbers like (888) 426-4435
    def repl_phone(m):
        idx = len(token_list)
        token_list.append(m.group(0))
        return f"§§§PHONE{idx}§§§"
    
    text = re.sub(r'\(\d{3}\)\s*\d{3}[-.\s]?\d{4}', repl_phone, text)
    
    return text, token_list

def restore_tokens(text, token_list):
    """Restore protected tokens."""
    for idx, original in enumerate(token_list):
        text = text.replace(f"§§§TAG{idx}§§§", original)
        text = text.replace(f"§§§VAR{idx}§§§", original)
        text = text.replace(f"§§§URL{idx}§§§", original)
        text = text.replace(f"§§§PHONE{idx}§§§", original)
    return text

def mymemory_translate(text, source="en", target="es"):
    """Translate using MyMemory API (free)."""
    url = f"https://api.mymemory.translated.net/get?q={urllib.parse.quote(text)}&langpair={source}|{target}"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=30) as resp:
        data = json.loads(resp.read().decode("utf-8"))
    return data["responseData"]["translatedText"]

def translate_text(text):
    """Translate text using MyMemory API with retry."""
    for attempt in range(3):
        try:
            return mymemory_translate(text)
        except Exception as e:
            if attempt < 2:
                time.sleep(2 * (attempt + 1))
            else:
                raise

translations = {}
skipped = []
errors = []

# Process string items
total = len(string_items)
count = 0
for key, value in string_items.items():
    count += 1
    is_simple, simple_translation = should_skip_or_simple_translate(value)
    if is_simple:
        translations[key] = simple_translation
        skipped.append(key)
        if count % 50 == 0:
            print(f"Progress: {count}/{total}...")
            sys.stdout.flush()
        continue
    
    try:
        clean_text, token_list = extract_protected_tokens(value)
        translated = translate_text(clean_text)
        if translated is None:
            translated = clean_text
        final_text = restore_tokens(translated, token_list)
        translations[key] = final_text
    except Exception as e:
        errors.append((key, str(e)))
        translations[key] = value  # fallback to English
    
    # Rate limiting
    time.sleep(0.5)
    
    if count % 50 == 0:
        print(f"Progress: {count}/{total}...")
        sys.stdout.flush()

# For complex items, translate them recursively
def translate_recursive(obj):
    """Recursively translate string values in nested structures."""
    if isinstance(obj, str):
        is_simple, simple_translation = should_skip_or_simple_translate(obj)
        if is_simple:
            return simple_translation
        try:
            clean_text, token_list = extract_protected_tokens(obj)
            translated = translate_text(clean_text)
            if translated is None:
                translated = clean_text
            return restore_tokens(translated, token_list)
        except Exception:
            return obj
    elif isinstance(obj, list):
        return [translate_recursive(item) for item in obj]
    elif isinstance(obj, dict):
        return {k: translate_recursive(v) for k, v in obj.items()}
    else:
        return obj

print(f"\nStrings translated: {len(translations)}, skipped: {len(skipped)}, errors: {len(errors)}")
print(f"Now processing {len(complex_items)} complex items...")
sys.stdout.flush()

# Process complex items
for key, value in complex_items.items():
    try:
        translated = translate_recursive(value)
        translations[key] = translated
    except Exception as e:
        errors.append((key, str(e)))
        translations[key] = value
    time.sleep(0.3)

print(f"\nFinal: {len(translations)} translations, {len(errors)} errors")

# Save results
with open('scripts/es-translations-map.json', 'w', encoding='utf-8') as f:
    json.dump(translations, f, ensure_ascii=False, indent=2)

print(f"\nSaved to scripts/es-translations-map.json")
if errors:
    print(f"Errors (first 5): {errors[:5]}")
