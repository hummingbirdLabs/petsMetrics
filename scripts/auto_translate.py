#!/usr/bin/env python3
"""Auto-translate all untranslated keys from en.json to fr.json."""
import json
import re
import os

def load_json(path):
    with open(path, encoding='utf-8-sig') as f:
        return json.load(f)

def flatten(obj, prefix=''):
    result = {}
    for k, v in obj.items():
        key = f'{prefix}.{k}' if prefix else k
        if isinstance(v, dict):
            result.update(flatten(v, key))
        else:
            result[key] = v
    return result

en = flatten(load_json('messages/en.json'))
fr = flatten(load_json('messages/fr.json'))

# Keys where fr == en (untranslated)
untranslated = {k: v for k, v in en.items() if fr.get(k) == v}
print(f'Untranslated count: {len(untranslated)}')

# Common patterns and translations
REPLACEMENTS = [
    (re.compile(r'<strong>(.*?)</strong>', re.DOTALL), r'<\strong>\1</strong>'),  # Keep <strong> tags
    (re.compile(r'<br\s*/?>', re.IGNORECASE), r'<br>'),  # Keep <br> tags
    (re.compile(r'<a(.*?)>(.*?)</a>', re.DOTALL), r'<\a\1>\2</a>'),  # Keep <a> tags
]

# Common phrase translations (order matters - more specific first)
PHRASES = [
    ('Emergency guide:', 'Guide d\'urgence :'),
    ('What to do if your dog eats', 'Que faire si votre chien mange'),
    ('What to do if your dog', 'Que faire si votre chien'),
    ('What to do now', 'Que faire maintenant'),
    ('What to do immediately', 'Que faire immédiatement'),
    ('What should I do\\?', 'Que dois-je faire ?'),
    ('What Was Eaten', 'Ce qui a été mangé'),
    ('Find Emergency Vet Near You', 'Trouver un vétérinaire d\'urgence près de chez vous'),
    ('Seek Immediate Veterinary Care', 'Consultez immédiatement un vétérinaire'),
    ('Seek Veterinary Care', 'Consultez un vétérinaire'),
    ('Call ASPCA Poison Control at', 'Appelez le centre antipoison ASPCA au'),
    ('Call (888) 426-4435', 'Appelez le (888) 426-4435'),
    ('Do not wait for symptoms', 'N\'attendez pas les symptômes'),
    ('immediately.', 'immédiatement.'),
    ('immediately', 'immédiatement'),
    ('Right away.', 'Immédiatement.'),
    ('right away.', 'immédiatement.'),
    ('THIS IS AN EMERGENCE', 'C\'EST URGENCE'),
    ('EMERGENCY:', 'URGENCE :'),
    ('my dog', 'mon chien'),
    ('my cat', 'mon chat'),
    ('dog ate', 'chien a mangé'),
    ('cat ate', 'chat a mangé'),
    ('my puppy a', 'mon chiot a'),
    ('my puppy', 'mon chiot'),
    ('my dog drank', 'mon chien a bu'),
    ('my cat ate', 'mon chat a mangé'),
    ('My Dog', 'Mon chien'),
    ('My Cat', 'Mon chat'),
    ('My Puppy', 'Mon chiot'),
    ('petsMetrics', 'petsMetrics'),
    ('ASPCA', 'ASPCA'),
    ('(888) 426-4435', '(888) 426-4435'),
    ('(855) 764-7661', '(855) 764-7661'),
    ('DHPP', 'DHPP'),
    ('FVRCP', 'FVRCP'),
    ('AAHA', 'AAHA'),
    ('WSAVA', 'WSAVA'),
    ('AAFCO', 'AAFCO'),
    ('AAFP', 'AAFP'),
    ('ASPCA', 'ASPCA'),
    ('AVMA', 'AVMA'),
    ('NRC', 'NRC'),
    ('ACVN', 'ACVN'),
    ('ISFM', 'ISFM'),
    ('BCS', 'BCS'),
    ('THC', 'THC'),
    ('DNA', 'ADN'),
    ('LD50', 'DL50'),
    ('NSAID', 'AINS'),
    ('NSAIDs', 'AINS'),
    ('GI', 'GI'),
    ('CNS', 'SNC'),
    ('SNC', 'SNC'),
    ('RNA', 'ARN'),
    ('ATP', 'ATP'),
    ('GABA', 'GABA'),
    ('GI tract', 'tractus gastro-intestinal'),
    ('blood-brain barrier', 'barrière hémato-encéphalique'),
    ('blood sugar', 'glycémie'),
    ('half-life', 'demi-vie'),
    ('red blood cells', 'globules rouges'),
    ('white blood cells', 'globules blancs'),
    ('kidney failure', 'insuffisance rénale'),
    ('liver failure', 'insuffisance hépatique'),
    ('heart damage', 'dommages cardiaques'),
    ('intestinal blockage', 'occlusion intestinale'),
    ('intestinal obstruction', 'occlusion intestinale'),
    ('intestinal perforation', 'perforation intestinale'),
    ('intestinal occlusion', 'occlusion intestinale'),
    ('vomiting', 'vomissements'),
    ('diarrhea', 'diarrhée'),
    ('seizures', 'convulsions'),
    ('tremors', 'tremblements'),
    ('symptoms', 'symptômes'),
    ('treatment', 'traitement'),
    ('prevention', 'prévention'),
    ('poisoning', 'empoisonnement'),
    ('toxicity', 'toxicité'),
    ('ingestion', 'ingestion'),
    ('emergency', 'urgence'),
    ('emergency vet', 'vétérinaire d\'urgence'),
    ('veterinarian', 'vétérinaire'),
    ('veterinary', 'vétérinaire'),
    ('veterinary care', 'soins vétérinaires'),
    ('treatment window', 'fenêtre de traitement'),
    ('toxic to', 'toxique pour'),
    ('toxic', 'toxique'),
    ('dangerous for', 'dangereux pour'),
    ('dangerous', 'dangereux'),
    ('fatal', 'mortel'),
    ('deadly', 'mortel'),
    ('dead ', 'mortel '),
    (' contains ', ' contient '),
    (' contains', ' contient'),
    ('caused by', 'causé par'),
    ('causes', 'provoque'),
    ('can cause', 'peut provoquer'),
    ('can lead to', 'peut entraîner'),
    ('lead to', 'entraîner'),
    ('Learn more', 'En savoir plus'),
    ('Source ', 'Source '),
    ('Source:', 'Source :'),
    ('Source', 'Source'),
    ('Example:', 'Exemple :'),
    ('Example ', 'Exemple '),
    ('Example', 'Exemple'),
    ('Doctor', 'Médecin'),
    ('Weight', 'Poids'),
    ('Age', 'Âge'),
    ('Year', 'Année'),
    ('Day', 'Jour'),
    ('Hour', 'Heure'),
    ('Minute', 'Minute'),
    ('Ml', 'mL'),
    ('kg', 'kg'),
    ('mg', 'mg'),
    ('DL50:', 'DL50 :'),
    ('LD50:', 'DL50 :'),
    ('Minimum toxic dose', 'Dose toxique minimale'),
    ('Toxicity data', 'Données de toxicité'),
    ('Toxicity', 'Toxicité'),
    ('Risk Level', 'Niveau de risque'),
    ('Risk', 'Risque'),
    ('Source:', 'Source :'),
    ('Data source', 'Source des données'),
    ('Treatment', 'Traitement'),
    ('Prevention', 'Prévention'),
    ('Symptoms', 'Symptômes'),
    ('Signs', 'Signes'),
    ('Mechanical hazard', 'Risque mécanique'),
    ('Not applicable', 'Non applicable'),
    ('N/A', 'N/A'),
    ('Merck Veterinary Manual', 'Manuel vétérinaire Merck'),
    ('Animal Poison Control', 'Centre antipoison animal'),
    ('Poison Control', 'Centre antipoison'),
    ('liver', 'foie'),
    ('kidneys', 'reins'),
    ('heart', 'cœur'),
    ('blood', 'sang'),
    ('body', 'corps'),
    ('mouth', 'bouche'),
    ('tongue', 'langue'),
    ('stomach', 'estomac'),
    ('intestines', 'intestins'),
    ('colon', 'côlon'),
    ('rectum', 'rectum'),
    ('anus', 'anus'),
    ('brain', 'cerveau'),
    ('nerve', 'nerf'),
    ('spinal cord', 'moelle épinière'),
    ('muscle', 'muscle'),
    ('bone', 'os'),
    ('joint', 'articulation'),
    ('ligament', 'ligament'),
    ('tendon', 'tendon'),
    ('skin', 'peau'),
    ('fur', 'fourrure'),
    ('claw', 'griffe'),
    ('whisker', 'moustache'),
    ('tail', 'queue'),
    ('paw', 'patte'),
    ('ear', 'oreille'),
    ('eye', 'œil'),
    ('nose', 'nez'),
    ('teeth', 'dents'),
    (' tooth', ' dent'),
]

# Words to keep unchanged (medical terms, brand names, etc.)
KEEP_UNCHANGED = ['petsMetrics', 'DHPP', 'FVRCP', 'BCS', 'THC', 'DNA', 'RNA',
                   'ATP', 'GABA', 'NSAID', 'NSAIDs', 'AINS', 'AINS', 'SNC',
                   'LD50', 'DL50', 'GI', 'TM', 'AAHA', 'WSAVA', 'AAFCO',
                   'AAFP', 'ASPCA', 'AVMA', 'NRC', 'ACVN', 'ISFM', 'AAFP',
                   'Merck Veterinary Manual', 'Buoro', 'Morton', 'Persea americana',
                   'Allium cepa', 'Allium sativum', 'Melaleuca alternifolia',
                   'Amanita', 'Galerina', 'Lepiota', 'Amanita phalloides',
                   'C2H5OH', 'nAChRs', 'nAChR', 'NMDA', 'CB1', 'UGT1A6', 'UGT1A9',
                   'G6PD', 'VKOR', 'alpha-amanitine', 'beta-amanitine',
                   'Delta-9-tetrahydrocannab', '1,3,7-trimethylxanthine',
                   'COVID-19', 'SARS-CoV-2', 'P0', 'P1']

# For each key, generate a translated version
translations = {}
for key, value in untranslated.items():
    translated = translate_text(value, PHRASES)
    translations[key] = translated

# Write result
with open('scripts/fr-translations-map.json', 'w', encoding='utf-8') as f:
    json.dump(translations, f, ensure_ascii=False, indent=2)

print(f'Wrote {len(translations)} translations')
