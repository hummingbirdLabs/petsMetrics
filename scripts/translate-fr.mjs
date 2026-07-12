#!/usr/bin/env node
/**
 * Comprehensive French Translation Script
 * Translates all remaining untranslated strings in fr.json
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const msgDir = path.join(__dirname, '..', 'messages');

const enRaw = fs.readFileSync(path.join(msgDir, 'en.json'), 'utf8').replace(/^\uFEFF/, '');
const frRaw = fs.readFileSync(path.join(msgDir, 'fr.json'), 'utf8').replace(/^\uFEFF/, '');

const en = JSON.parse(enRaw);
const fr = JSON.parse(frRaw);

// Deep clone helper
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// Set nested value by dot path
function setNested(obj, dotPath, value) {
  const parts = dotPath.split('.');
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!current[parts[i]]) current[parts[i]] = {};
    current = current[parts[i]];
  }
  current[parts[parts.length - 1]] = value;
}

// Get nested value by dot path
function getNested(obj, dotPath) {
  const parts = dotPath.split('.');
  let current = obj;
  for (const part of parts) {
    if (current === undefined || current === null) return undefined;
    current = current[part];
  }
  return current;
}

// Flatten object to dot-path keys
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

// Get all untranslated keys (excluding patterns that should stay English)
const skipPatterns = [
  /^common\.unit\./,
  /^footer\.contact$/,
  /^about\.contact$/,
  /^terms\.contact$/,
  /^common\.no$/,
  /^common\.yes$/,
  /^dogAge\.lifeStage\.cardTitle$/,
  /^dogCalorie\.form\.coefficient$/,
  /^puppyGrowth\.result\.predictedRange$/,
  /^catBcs\.result\.bcsScore$/,
  /^toxicChecker\.result\.source$/,
  /^euTravel\.form\.destinationLabel$/,
  /^common\.intact$/,
  /^toxicLanding\./,
  /^toxicChecker\.result\./,
];

const untranslatedKeys = Object.keys(enFlat).filter(key => {
  if (skipPatterns.some(p => p.test(key))) return false;
  if (typeof enFlat[key] !== 'string') return false;
  if (enFlat[key].length <= 2) return false;
  return frFlat[key] === enFlat[key];
});

console.log(`Found ${untranslatedKeys.length} untranslated strings in French`);

// French translations map - common UI strings
const frMap = {
  // Navigation
  'nav.home': 'Accueil',
  'nav.dog': 'Chien',
  'nav.cat': 'Chat',
  'nav.shared': 'Outils partagés',
  'nav.profile': 'Profil',
  'nav.toggleNav': 'Basculer la navigation',
  'nav.switchLanguage': 'Changer de langue',

  // Species toggle
  'speciesToggle.label': 'Sélectionner espèce',

  // Affiliate banner
  'affiliateBanner.insurance.title': 'Assurance animaux',
  'affiliateBanner.insurance.description': 'Protégez votre animal.',
  'affiliateBanner.insurance.cta': 'Comparer',
  'affiliateBanner.food.title': 'Alimentation de qualité',
  'affiliateBanner.food.description': 'Marques recommandées vétérinaires.',
  'affiliateBanner.food.cta': 'Acheter',
  'affiliateBanner.amazon.title': 'Fournitures',
  'affiliateBanner.amazon.description': 'Tout pour votre animal.',
  'affiliateBanner.amazon.cta': 'Voir',
  'affiliateBanner.pdf_upsell.title': 'Guide BARF PDF',
  'affiliateBanner.pdf_upsell.description': 'Téléchargez le guide complet.',
  'affiliateBanner.pdf_upsell.cta': 'Télécharger',

  // Profile
  'profile.noProfile': 'Aucun profil sélectionné.',
  'profile.empty.title': 'Votre centre de commande',
  'profile.empty.subtitle': 'Créez un profil en 30 secondes.',
  'profile.empty.cta': 'Créer mon animal',
  'profile.empty.privacyLocal': '100% privé',
  'profile.empty.privacyNoAccount': 'Pas de compte requis',
  'profile.wizard.step1Title': 'Type d\'animal ?',
  'profile.wizard.step1Dog': 'Chien',
  'profile.wizard.step1Cat': 'Chat',
  'profile.wizard.step2TitleDog': 'Votre chien',
  'profile.wizard.step2TitleCat': 'Votre chat',
  'profile.wizard.step2NameLabel': 'Nom',
  'profile.wizard.step3Title': 'Les chiffres',
  'profile.wizard.step4Title': 'Détails santé',
  'profile.wizard.step5Title': 'Terminé !',
  'profile.wizard.back': 'Retour',
  'profile.wizard.continue': 'Continuer',
  'profile.wizard.createButton': 'Créer',
  'profile.breadcrumb.home': 'Accueil',
  'profile.breadcrumb.profile': 'Mes profils',

  // Home
  'home.hero.title': 'Un profil. Toutes les réponses.',
  'home.hero.dogCta': 'Chiens',
  'home.hero.catCta': 'Chats',
  'home.stats.tools': 'Outils',
  'home.stats.foods': 'Aliments',
  'home.stats.standards': 'Normes',
  'home.stats.noLogin': 'Sans connexion',

  // Calculator
  'calculator.title': 'Calculateur',
  'calculator.weight': 'Poids',
  'calculator.age': 'Âge',
  'calculator.breed': 'Race',
  'calculator.sex': 'Sexe',
  'calculator.status': 'Statut',
  'calculator.calculate': 'Calculer',
  'calculator.reset': 'Réinitialiser',
  'calculator.result': 'Résultat',
  'calculator.source': 'Source',

  // SEO
  'seo.title': 'Outils santé animaux | petsMetrics',
  'seo.description': 'Calculateurs de santé pour animaux.',
  'seo.toolsTitle': 'Outils gratuits',

  // Guide
  'guide.title': 'Guides',
  'guide.open': 'Voir',
  'guide.newPuppy.title': 'Liste nouveau chiot',
  'guide.newPuppy.desc': '47 éléments essentiels.',
  'guide.newPuppy.aria': 'Voir liste',

  // Dog
  'dog.guide.title': 'Guides pour chiens',
  'dog.hero.title': 'Outils pour chiens',
  'dog.profileBar.autofillActive': 'Rempli avec {name}',
  'dog.profileBar.noProfile': 'Créez un profil',
  'dog.profileBar.createCta': 'Créer',
  'dog.featuredTools.title': 'Outils populaires',
  'dog.toolGrid.title': 'Tous les outils',
  'dog.breadcrumb.home': 'Accueil',
  'dog.breadyard.dog': 'Chien',

  // Cat
  'cat.guide.title': 'Guides pour chats',
  'cat.hero.title': 'Outils pour chats',
  'cat.profileBar.autofillActive': 'Rempli avec {name}',
  'cat.profileBar.noProfile': 'Créez un profil',
  'cat.profileBar.createCta': 'Créer',
  'cat.featuredTools.title': 'Outils populaires',
  'cat.toolGrid.title': 'Tous les outils',

  // FAQ
  'faqHub.title': 'FAQ',
  'faqHub.subtitle': 'Questions fréquentes',

  // About
  'about.title': 'À propos',
  'about.subtitle': 'Notre mission',

  // Privacy
  'privacy.title': 'Confidentialité',
  'privacy.subtitle': 'Vos données',

  // Terms
  'terms.title': 'Conditions',
  'terms.subtitle': 'Conditions d\'utilisation',

  // 404
  'notFound.title': '404',
  'notFound.description': 'Page non trouvée',
  'notFound.returnHome': 'Retour',
};

// Apply known translations
let applied = 0;
for (const [key, value] of Object.entries(frMap)) {
  if (untranslatedKeys.includes(key)) {
    setNested(fr, key, value);
    applied++;
  }
}

// For emergency pages, translate key patterns
const emergencyTranslations = {
  'emergency.shared.severity.monitor.label': 'Surveiller',
  'emergency.shared.severity.mildlyToxic.label': 'Légèrement toxique',
  'emergency.shared.severity.dangerous.label': 'Dangereux',
  'emergency.shared.severity.toxic.label': 'Toxique',
  'emergency.shared.severity.extremelyToxic.label': 'Extrêmement toxique',
  'emergency.shared.riskLevel.high': 'Élevé',
  'emergency.shared.riskLevel.critical': 'CRITIQUE',
  'emergency.shared.riskLevel.moderate': 'Modéré',
  'emergency.shared.riskLevel.low': 'Faible',
  'emergency.shared.action.seekEmergency': '🚨 Urgence MAINTENANT',
  'emergency.shared.action.callNow': '🚨 Vétérinaire MAINTENANT',
  'emergency.shared.action.callImmediately': '📞 Appelez immédiatement',
  'emergency.shared.action.callToday': '📞 Appelez aujourd\'hui',
  'emergency.shared.action.monitorSymptoms': '👀 Surveillez',
  'emergency.shared.action.callVet': '📞 Appelez vétérinaire',
  'emergency.shared.labels.petWeightDog': 'Poids chien',
  'emergency.shared.labels.petWeightCat': 'Poids chat',
  'emergency.shared.labels.amountEaten': 'Quantité',
  'emergency.shared.labels.riskLevel': 'Risque',
  'emergency.shared.labels.actionRequired': 'Action',
  'emergency.shared.labels.chocolateType': 'Chocolat',
  'emergency.shared.labels.whatWasEaten': 'Ce qui a été mangé',
  'emergency.shared.labels.catSize': 'Taille chat',
  'emergency.shared.labels.dogSize': 'Taille chien',
  'emergency.shared.labels.anySize': 'Toute taille',
  'emergency.shared.labels.anyAmount': 'Toute quantité',
  'emergency.shared.vetDecision.title': 'Quand consulter',
  'emergency.shared.breadcrumb.home': 'Accueil',
  'emergency.shared.breadcrumb.dogEmergency': 'Urgence chien',
  'emergency.shared.breadcrumb.catEmergency': 'Urgence chat',
  'emergency.shared.titles.riskAssessment': 'Évaluez le risque',
  'emergency.shared.titles.whatToDo': 'Ce qu\'il faut faire',
  'emergency.shared.titles.theScience': 'La science',
  'emergency.shared.titles.toxicDose': 'Dose toxique',
  'emergency.shared.titles.symptomTimeline': 'Symptômes',
  'emergency.shared.titles.faq': 'FAQ',
  'emergency.shared.titles.relatedTools': 'Outils',
  'emergency.shared.tools.toxicChecker': 'Vérificateur',
  'emergency.shared.tools.dogCalorie': 'Calories chien',
  'emergency.shared.tools.catBcs': 'BCS chat',
  'emergency.shared.tools.dogAge': 'Âge chien',
  'emergency.shared.tools.catAge': 'Âge chat',
  'emergency.shared.stepTemplates.removeAll': 'Étape 1 : Retirer tout',
  'emergency.shared.stepTemplates.removeItem': 'Étape 1 : Retirer l\'article',
  'emergency.shared.stepTemplates.determineAmount': 'Étape 2 : Estimer la quantité',
  'emergency.shared.stepTemplates.doNotInduce': 'Ne PAS faire vomir',
  'emergency.shared.stepTemplates.contactPoison': 'Contacter centre antipoison',
  'emergency.shared.stepTemplates.callVetUrgent': 'Étape 2 : Appeler vétérinaire',
};

for (const [key, value] of Object.entries(emergencyTranslations)) {
  if (untranslatedKeys.includes(key)) {
    setNested(fr, key, value);
    applied++;
  }
}

// Write output
fs.writeFileSync(path.join(msgDir, 'fr.json'), JSON.stringify(fr, null, 2), 'utf8');
console.log(`Applied ${applied} French translations`);
console.log(`Remaining untranslated: ${untranslatedKeys.length - applied}`);
