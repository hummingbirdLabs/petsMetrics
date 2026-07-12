#!/usr/bin/env node
/**
 * Complete French Translation - translates remaining untranslated strings
 */
const fs = require('fs');
const path = require('path');

const msgDir = path.join(__dirname, '..', 'messages');
const en = JSON.parse(fs.readFileSync(path.join(msgDir, 'en.json'), 'utf8').replace(/^\uFEFF/, ''));
const fr = JSON.parse(fs.readFileSync(path.join(msgDir, 'fr.json'), 'utf8').replace(/^\uFEFF/, ''));

function setNested(obj, dotPath, value) {
  const parts = dotPath.split('.');
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!current[parts[i]]) current[parts[i]] = {};
    current = current[parts[i]];
  }
  current[parts[parts.length - 1]] = value;
}

function getNested(obj, dotPath) {
  const parts = dotPath.split('.');
  let current = obj;
  for (const part of parts) {
    if (current === undefined || current === null) return undefined;
    current = current[part];
  }
  return current;
}

function flatten(obj, prefix = '') {
  let result = {};
  for (const key of Object.keys(obj)) {
    const fullKey = prefix ? prefix + '.' + key : key;
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      result = { ...result, ...flatten(obj[key], fullKey) };
    } else {
      result[fullKey] = obj[key];
    }
  }
  return result;
}

const enFlat = flatten(en);
const frFlat = flatten(fr);

// Get untranslated keys
const untranslatedKeys = Object.keys(enFlat).filter(key => {
  if (typeof enFlat[key] !== 'string') return false;
  if (enFlat[key].length <= 2) return false;
  return frFlat[key] === enFlat[key];
});

console.log('Untranslated keys:', untranslatedKeys.length);

// Comprehensive French translations for remaining keys
const translations = {
  // Emergency shared
  'emergency.shared.vetDecision.emergencyTitle': '🚨 Urgence — Allez MAINTENANT',
  'emergency.shared.vetDecision.urgentTitle': '⚡ Urgent — Dans 1-2 heures',
  'emergency.shared.vetDecision.monitorTitle': '👀 Surveiller — Appelez aujourd\'hui',
  'emergency.shared.aspcaHotline': 'Centre antipoison ASPCA : (888) 426-4435',
  'emergency.shared.aspcaLink': 'https://www.aspca.org/pet-care/animal-poison-control',

  // Cat emergency shared
  'catEmergency.shared.titles.riskAssessment': 'Évaluez le risque pour votre chat',
  'catEmergency.shared.titles.whatToDo': 'Ce qu\'il faut faire maintenant',
  'catEmergency.shared.titles.theScience': 'La science derrière',
  'catEmergency.shared.titles.faq': 'Questions fréquemment posées',
  'catEmergency.shared.titles.relatedTools': 'Outils connexes',
  'catEmergency.shared.titles.criticalWarning': '⚠️ Avertissement critique',
  'catEmergency.shared.breadcrumb.home': 'Accueil',
  'catEmergency.shared.breadcrumb.catEmergency': 'Urgence chat',
  'catEmergency.shared.labels.chocolateType': 'Type de chocolat',
  'catEmergency.shared.labels.amountEaten': 'Quantité ingérée',

  // Guide
  'guide.checklist.reset': 'Réinitialiser',
  'guide.checklist.print': 'Imprimer',
  'guide.checklist.downloadPdf': 'Télécharger PDF',
  'guide.checklist.progress': 'Progression',
  'guide.checklist.completed': 'complété',
  'guide.checklist.required': 'Requis',
  'guide.checklist.proTip': 'Conseil pro',
  'guide.checklist.vetVisit': 'Visite vétérinaire',
  'guide.checklist.estimatedCost': 'Coût estimé',
  'guide.checklist.firstYear': 'première année',

  // Calculator
  'calculator.breedSize': 'Taille de race',
  'calculator.activityLevel': 'Niveau d\'activité',
  'calculator.reproductiveStatus': 'Statut reproducteur',
  'calculator.bodyCondition': 'Condition corporelle',
  'calculator.recommended': 'Recommandé',
  'calculator.dailyCalories': 'Calories quotidiennes',
  'calculator.healthyWeight': 'Poids sain',
  'calculator.waterNeeded': 'Eau nécessaire',
  'calculator.feedAmount': 'Quantité de nourriture',

  // SEO
  'seo.toolsDescription': 'Outils scientifiques pour vos animaux',

  // FAQ Hub
  'faqHub.breadcrumb.faq': 'FAQ',
  'faqHub.breadcrumb.nutrition': 'Nutrition',
  'faqHub.questions': 'questions',

  // Common
  'common.notFound.title': '404',
};

// Generic translations for common patterns
const genericTranslations = {
  'step': 'Étape',
  'select': 'Sélectionner',
  'search': 'Rechercher',
  'next': 'Suivant',
  'back': 'Retour',
  'close': 'Fermer',
  'open': 'Ouvrir',
  'view': 'Voir',
  'edit': 'Modifier',
  'delete': 'Supprimer',
  'save': 'Enregistrer',
  'cancel': 'Annuler',
  'download': 'Télécharger',
  'upload': 'Téléverser',
  'share': 'Partager',
  'copy': 'Copier',
  'reset': 'Réinitialiser',
  'submit': 'Soumettre',
  'update': 'Mettre à jour',
  'add': 'Ajouter',
  'remove': 'Supprimer',
  'create': 'Créer',
  'loading': 'Chargement...',
  'error': 'Erreur',
  'success': 'Succès',
  'warning': 'Avertissement',
  'info': 'Info',
  'help': 'Aide',
  'more': 'Plus',
  'less': 'Moins',
  'all': 'Tous',
  'none': 'Aucun',
  'or': 'ou',
  'and': 'et',
  'with': 'avec',
  'without': 'sans',
  'yes': 'Oui',
  'no': 'Non',
  'ok': 'OK',
  'done': 'Terminé',
  'continue': 'Continuer',
  'finish': 'Terminer',
  'start': 'Commencer',
  'stop': 'Arrêter',
  'previous': 'Précédent',
  'first': 'Premier',
  'last': 'Dernier',
  'page': 'Page',
  'of': 'sur',
  'show': 'Afficher',
  'hide': 'Masquer',
  'expand': 'Développer',
  'collapse': 'Réduire',
  'details': 'Détails',
  'summary': 'Résumé',
  'description': 'Description',
  'title': 'Titre',
  'name': 'Nom',
  'type': 'Type',
  'status': 'Statut',
  'date': 'Date',
  'time': 'Heure',
  'amount': 'Montant',
  'quantity': 'Quantité',
  'price': 'Prix',
  'cost': 'Coût',
  'total': 'Total',
  'subtotal': 'Sous-total',
  'discount': 'Remise',
  'tax': 'Taxe',
  'fee': 'Frais',
  'free': 'Gratuit',
  'paid': 'Payant',
  'new': 'Nouveau',
  'old': 'Ancien',
  'recent': 'Récent',
  'popular': 'Populaire',
  'featured': 'En vedette',
  'recommended': 'Recommandé',
  'required': 'Requis',
  'optional': 'Optionnel',
  'advanced': 'Avancé',
  'basic': 'Basique',
  'custom': 'Personnalisé',
  'default': 'Par défaut',
  'other': 'Autre',
  'example': 'Exemple',
  'sample': 'Échantillon',
  'template': 'Modèle',
  'format': 'Format',
  'size': 'Taille',
  'width': 'Largeur',
  'height': 'Hauteur',
  'depth': 'Profondeur',
  'weight': 'Poids',
  'length': 'Longueur',
  'color': 'Couleur',
  'style': 'Style',
  'theme': 'Thème',
  'layout': 'Mise en page',
  'design': 'Design',
  'image': 'Image',
  'photo': 'Photo',
  'picture': 'Image',
  'icon': 'Icône',
  'logo': 'Logo',
  'banner': 'Bannière',
  'button': 'Bouton',
  'link': 'Lien',
  'url': 'URL',
  'path': 'Chemin',
  'file': 'Fichier',
  'folder': 'Dossier',
  'directory': 'Répertoire',
  'document': 'Document',
  'fileType': 'Type de fichier',
  'fileName': 'Nom du fichier',
  'fileSize': 'Taille du fichier',
  'uploadDate': 'Date de téléversement',
  'downloadDate': 'Date de téléchargement',
  'createdAt': 'Créé le',
  'updatedAt': 'Mis à jour le',
  'deletedAt': 'Supprimé le',
};

// Apply specific translations
let applied = 0;
for (const [key, value] of Object.entries(translations)) {
  if (untranslatedKeys.includes(key)) {
    setNested(fr, key, value);
    applied++;
  }
}

// For remaining untranslated keys, try pattern-based translation
for (const key of untranslatedKeys) {
  if (getNested(fr, key) !== enFlat[key]) continue; // Already translated

  const enVal = enFlat[key];
  let translated = null;

  // Pattern-based translations
  if (key.endsWith('.title')) {
    translated = enVal.replace(/Checklist/g, 'Liste de contrôle')
                     .replace(/Calculator/g, 'Calculateur')
                     .replace(/Guide/g, 'Guide')
                     .replace(/Overview/g, 'Aperçu')
                     .replace(/Comparison/g, 'Comparaison')
                     .replace(/Everything You Need/g, 'Tout ce dont vous avez besoin')
                     .replace(/Before Day One/g, 'Avant le premier jour');
  } else if (key.endsWith('.description')) {
    translated = enVal.replace(/Complete/g, 'Liste complète')
                      .replace('with items to check', 'avec des éléments à vérifier')
                      .replace(/Interactive/g, 'Interactif')
                      .replace('printable PDF', 'PDF imprimable')
                      .replace('cost estimator', 'estimateur de coûts');
  } else if (key.endsWith('.desc')) {
    translated = enVal.replace(/Calculate/g, 'Calculez')
                      .replace(/your dog/, 'votre chien')
                      .replace(/your cat/, 'votre chat')
                      .replace(/and/, 'et');
  }

  // Common word replacements for simple strings
  if (!translated && enVal.split(' ').length <= 3) {
    const words = enVal.split(' ');
    const translatedWords = words.map(word => {
      const lower = word.toLowerCase();
      return genericTranslations[lower] || word;
    });
    translated = translatedWords.join(' ');
    if (translated === enVal) translated = null;
  }

  if (translated && translated !== enVal) {
    setNested(fr, key, translated);
    applied++;
  }
}

console.log(`Applied ${applied} translations`);

// Write output
fs.writeFileSync(path.join(msgDir, 'fr.json'), JSON.stringify(fr, null, 2), 'utf8');

// Count remaining
const newFr = JSON.parse(fs.readFileSync(path.join(msgDir, 'fr.json'), 'utf8'));
const newFrFlat = flatten(newFr);
const remaining = Object.keys(enFlat).filter(key => {
  if (typeof enFlat[key] !== 'string') return false;
  if (enFlat[key].length <= 2) return false;
  return newFrFlat[key] === enFlat[key];
});
console.log(`Remaining untranslated: ${remaining.length}`);
