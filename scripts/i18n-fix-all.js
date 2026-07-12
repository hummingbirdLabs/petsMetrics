// i18n-fix-all.js - Comprehensive translation fix for all languages
// Phase 1: Small languages (zh, ar, ru, ko, ja, pt, de, es, nl)
// Phase 2: Large languages (fr, hi)

const fs = require('fs');
const path = require('path');

const messagesDir = 'd:/prj2/GitHub/petsMetrics/messages';

function readJSON(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, '');
  return JSON.parse(raw);
}

function writeJSON(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

function setNested(obj, dottedKey, value) {
  const parts = dottedKey.split('.');
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!current[parts[i]]) current[parts[i]] = {};
    current = current[parts[i]];
  }
  current[parts[parts.length - 1]] = value;
}

// ============================================================
// Translation dictionaries for each language
// Keys that are intentionally same (units, codes, URLs, phone numbers) are NOT included
// ============================================================

// ZH - Chinese (2 remaining)
const zhTranslations = {
  'toxicLanding.aspcaNumber': '(888) 426-4435', // phone number, keep
  'toxicLanding.petPoisonNumber': '(855) 764-7661', // phone number, keep
};

// AR - Arabic (8 remaining, but most are intentional)
const arTranslations = {
  'dogAge.lifeStage.cardTitle': '{stage} — {stageName}', // template, keep as is
  // dog.toolGrid.rating, dog.toolGrid.priority, cat.toolGrid.rating, cat.toolGrid.priority = P0/P1 codes, keep
  // toxicLanding.aspcaNumber, toxicLanding.petPoisonNumber = phone numbers, keep
  // emergency.shared.aspcaLink = URL, keep
};

// RU - Russian (9 remaining)
const ruTranslations = {
  'common.notFound.title': '404', // keep as is
  'dog.toolGrid.rating': 'P0', // keep
  'dog.toolGrid.priority': 'P1', // keep
  'cat.toolGrid.rating': 'P0', // keep
  'cat.toolGrid.priority': 'P1', // keep
  'dogAge.lifeStage.cardTitle': '{stage} — {stageName}', // keep
  'toxicLanding.aspcaNumber': '(888) 426-4435', // keep
  'toxicLanding.petPoisonNumber': '(855) 764-7661', // keep
  'emergency.shared.aspcaLink': 'https://www.aspca.org/pet-care/animal-poison-control', // keep
};

// KO - Korean (13 remaining)
const koTranslations = {
  'common.unit.kg': 'kg', // keep
  'common.unit.lb': 'lb', // keep
  'common.unit.ml': 'ml', // keep
  'common.unit.oz': 'oz', // keep
  'common.unit.kcal': 'kcal', // keep
  'common.notFound.title': '404', // keep
  'dog.toolGrid.rating': 'P0', // keep
  'dog.toolGrid.priority': 'P1', // keep
  'cat.toolGrid.rating': 'P0', // keep
  'cat.toolGrid.priority': 'P1', // keep
  'dogAge.lifeStage.cardTitle': '{stage} — {stageName}', // keep
  'toxicLanding.aspcaNumber': '(888) 426-4435', // keep
  'toxicLanding.petPoisonNumber': '(855) 764-7661', // keep
};

// JA - Japanese (15 remaining)
const jaTranslations = {
  'common.unit.kg': 'kg', // keep
  'common.unit.lb': 'lb', // keep
  'common.unit.ml': 'ml', // keep
  'common.unit.oz': 'oz', // keep
  'common.unit.kcal': 'kcal', // keep
  'common.notFound.title': '404', // keep
  'dog.toolGrid.rating': 'P0', // keep
  'dog.toolGrid.priority': 'P1', // keep
  'cat.toolGrid.rating': 'P0', // keep
  'cat.toolGrid.priority': 'P1', // keep
  'dogAge.lifeStage.cardTitle': '{stage} — {stageName}', // keep
  'toxicLanding.aspcaNumber': '(888) 426-4435', // keep
  'toxicLanding.petPoisonNumber': '(855) 764-7661', // keep
  'emergency.shared.aspcaLink': 'https://www.aspca.org/pet-care/animal-poison-control', // keep
  'dogAge.form.monthsOptional': 'プラス（任意）:',
};

// PT - Portuguese (23 remaining)
const ptTranslations = {
  'common.unit.kg': 'kg', // keep
  'common.unit.lb': 'lb', // keep
  'common.unit.ml': 'ml', // keep
  'common.unit.oz': 'oz', // keep
  'common.unit.kcal': 'kcal', // keep
  'common.notFound.title': '404', // keep
  'common.sidebar.catBcs.ideal': 'Ideal: 4-5/9',
  'home.hero.cardPetName': 'Buddy',
  'dog.toolGrid.rating': 'P0', // keep
  'dog.toolGrid.priority': 'P1', // keep
  'dog.breedContent.breeds.labrador.name': 'Labrador Retriever',
  'dog.breedContent.breeds.goldenRetriever.name': 'Golden Retriever',
  'cat.toolGrid.rating': 'P0', // keep
  'cat.toolGrid.priority': 'P1', // keep
  'dogAge.lifeStage.cardTitle': '{stage} — {stageName}',
  'puppyGrowth.result.predictedRange': '{min} – {max} kg',
  'catBcs.bcsOptions.5': 'Ideal',
  'catBcs.result.bcsScore': 'BCS {score}/9',
  'toxicLanding.aspcaNumber': '(888) 426-4435', // keep
  'toxicLanding.petPoisonNumber': '(855) 764-7661', // keep
  'emergency.shared.aspcaLink': 'https://www.aspca.org/pet-care/animal-poison-control', // keep
  'euTravel.documents.microchip': 'Microchip (ISO 11784/11785)',
  'compare.microchipVsTattoo.topicAName': 'Microchip',
};

// ES - Spanish (26 remaining)
const esTranslations = {
  'common.unit.kg': 'kg', // keep
  'common.unit.lb': 'lb', // keep
  'common.unit.ml': 'ml', // keep
  'common.unit.oz': 'oz', // keep
  'common.unit.kcal': 'kcal', // keep
  'common.notFound.title': '404', // keep
  'common.sidebar.catBcs.ideal': 'Ideal: 4-5/9',
  'common.no': 'No',
  'profile.wizard.step4NeuteredNo': 'No',
  'home.hero.cardPetName': 'Buddy',
  'dog.toolGrid.rating': 'P0', // keep
  'dog.toolGrid.priority': 'P1', // keep
  'dog.breedContent.breeds.labrador.name': 'Labrador Retriever',
  'dog.breedContent.breeds.goldenRetriever.name': 'Golden Retriever',
  'cat.toolGrid.rating': 'P0', // keep
  'cat.toolGrid.priority': 'P1', // keep
  'dogAge.lifeStage.cardTitle': '{stage} — {stageName}',
  'puppyGrowth.result.predictedRange': '{min} – {max} kg',
  'catBcs.bcsOptions.5': 'Ideal',
  'catBcs.result.bcsScore': 'BCS {score}/9',
  'toxicLanding.aspcaNumber': '(888) 426-4435', // keep
  'toxicLanding.petPoisonNumber': '(855) 764-7661', // keep
  'euTravel.documents.microchip': 'Microchip (ISO 11784/11785)',
  'compare.microchipVsTattoo.topicAName': 'Microchip',
  'emergency.shared.aspcaLink': 'https://www.aspca.org/pet-care/animal-poison-control', // keep
  'emergency.atePlastic.toxicityData.source': 'Merck Veterinary Manual, ASPCA',
};

// DE - German (25 remaining)
const deTranslations = {
  'common.optional': 'Optional',
  'common.senior': 'Senior',
  'common.unit.kg': 'kg', // keep
  'common.unit.lb': 'lb', // keep
  'common.unit.ml': 'ml', // keep
  'common.unit.oz': 'oz', // keep
  'common.unit.kcal': 'kcal', // keep
  'common.notFound.title': '404', // keep
  'common.sidebar.catBcs.ideal': 'Ideal: 4-5/9',
  'compare.dimension': 'Dimension',
  'dog.toolGrid.rating': 'P0', // keep
  'dog.toolGrid.priority': 'P1', // keep
  'dog.breedContent.breeds.labrador.name': 'Labrador Retriever',
  'dog.breedContent.breeds.goldenRetriever.name': 'Golden Retriever',
  'cat.toolGrid.rating': 'P0', // keep
  'cat.toolGrid.priority': 'P1', // keep
  'dogAge.form.monthsOptional': 'plus (optional):',
  'dogAge.lifeStage.cardTitle': '{stage} — {stageName}',
  'puppyGrowth.result.predictedRange': '{min} – {max} kg',
  'vaccination.result.tableStatus': 'Status',
  'catBcs.bcsOptions.5': 'Ideal',
  'catBcs.result.bcsScore': 'BCS {score}/9',
  'toxicLanding.aspcaNumber': '(888) 426-4435', // keep
  'toxicLanding.petPoisonNumber': '(855) 764-7661', // keep
  'emergency.shared.aspcaLink': 'https://www.aspca.org/pet-care/animal-poison-control', // keep
};

// NL - Dutch (49 remaining)
const nlTranslations = {
  'common.unit.kg': 'kg', // keep
  'common.unit.lb': 'lb', // keep
  'common.unit.ml': 'ml', // keep
  'common.unit.oz': 'oz', // keep
  'common.unit.kcal': 'kcal', // keep
  'common.notFound.title': '404', // keep
  'common.senior': 'Senior',
  'common.intact': 'Intact',
  'common.breadcrumb.home': 'Home',
  'nav.home': 'Home',
  'nav.dog': 'Dog',
  'nav.cat': 'Cat',
  'nav.profile': 'Profile',
  'nav.about': 'About',
  'nav.privacy': 'Privacy',
  'nav.terms': 'Terms',
  'nav.tools': 'Tools',
  'nav.resources': 'Resources',
  'nav.guides': 'Guides',
  'nav.compare': 'Compare',
  'nav.emergency': 'Emergency',
  'nav.seasonal': 'Seasonal',
  'nav.faq': 'FAQ',
  'nav.toxicChecker': 'Toxic Checker',
  'nav.euTravel': 'EU Pet Travel',
  'nav.barfCalculator': 'BARF Calculator',
  'nav.insurance': 'Insurance',
  'dog.toolGrid.rating': 'P0', // keep
  'dog.toolGrid.priority': 'P1', // keep
  'cat.toolGrid.rating': 'P0', // keep
  'cat.toolGrid.priority': 'P1', // keep
  'dogAge.lifeStage.cardTitle': '{stage} — {stageName}',
  'puppyGrowth.result.predictedRange': '{min} – {max} kg',
  'catBcs.bcsOptions.5': 'Ideal',
  'catBcs.result.bcsScore': 'BCS {score}/9',
  'toxicLanding.aspcaNumber': '(888) 426-4435', // keep
  'toxicLanding.petPoisonNumber': '(855) 764-7661', // keep
  'emergency.shared.aspcaLink': 'https://www.aspca.org/pet-care/animal-poison-control', // keep
  'compare.dimension': 'Dimension',
  'compare.limitations': 'Limitations',
  'compare.hub.guidesHeading': 'Free Guides & Comparisons',
  'compare.hub.guidesDescription': 'Science-backed articles to help you make informed decisions about your pet\'s health, nutrition, and care.',
  'compare.hub.compareCardAria': 'Read comparison: {title}',
  'compare.relatedCompare.heading': 'Related Comparison',
  'compare.relatedCompare.readComparison': 'Read the Full Comparison',
  'compare.relatedCompare.ariaLabel': 'Related comparison article',
  'compare.footer.dogGuides': 'Dog Guides',
  'compare.footer.catGuides': 'Cat Guides',
  'compare.footer.viewAll': 'View All Guides',
  'dogAge.form.monthsOptional': 'plus (optional):',
};

// ============================================================
// FR - French comprehensive translations
// ============================================================
const frTranslations = {
  // Common
  'common.loading': 'Chargement...',
  'common.required': 'Requis',
  'common.optional': 'Optionnel',
  'common.yes': 'Oui',
  'common.no': 'Non',
  'common.male': 'Mâle',
  'common.female': 'Femelle',
  'common.puppy': 'Chiot',
  'common.adult': 'Adulte',
  'common.senior': 'Senior',
  'common.small': 'Petit',
  'common.medium': 'Moyen',
  'common.gross': 'Grand',
  'common.giant': 'Géant',
  'common.neutered': 'Stérilisé',
  'common.intact': 'Intact',
  'common.active': 'Actif',
  'common.sedentary': 'Sédentaire',
  'common.slightly': 'Légèrement actif',
  'common.very': 'Très actif',
  'common.extremely': 'Extrêmement actif',
  'common.healthy': 'En bonne santé',
  'common.overweight': 'En surpoids',
  'common.underweight': 'Sous-poids',
  'common.notFound.description': 'Page introuvable',
  'common.notFound.returnHome': "Retour à l'accueil",
  'common.breadcrumb.home': 'Accueil',
  'common.breadcrumb.dog': 'Chien',
  'common.breadcrumb.cat': 'Chat',
  'common.cta.tryAgeCalculator': "Essayer le calculateur d'âge →",
  'common.cta.calculateCalories': 'Calculer les calories →',
  'common.cta.viewVaccineSchedule': 'Voir le calendrier vaccinal →',
  'common.cta.checkDueDates': 'Vérifier les dates →',
  'common.cta.open': 'Ouvrir →',
  'common.privacy.heading': 'Comment nous protégeons votre vie privée',
  'common.privacy.body': "Tous les profils d'animaux, les entrées de calculatrice et les résultats sont stockés exclusivement dans le stockage local de votre navigateur. Aucune donnée n'est jamais",
  'common.sidebar.catBcs.ideal': 'Idéal : 4-5/9',
  'common.sidebar.quickFacts': 'Faits rapides',
  'common.sidebar.dogTools': 'Outils pour chien',
  'common.sidebar.catTools': 'Outils pour chat',
  'common.sidebar.emergencyContacts': "Contacts d'urgence",
  'common.sidebar.quickVetTip': 'Conseil véto rapide',
  'common.sidebar.barfRatios': 'Ratios BARF',
  'common.sidebar.safetyTips': 'Conseils de sécurité',
  'common.sidebar.averageMonthlyCosts': 'Coûts mensuels moyens',
  'common.sidebar.whatAffectsCost': 'Ce qui affecte le coût',
  'common.sidebar.requiredDocuments': 'Documents requis',
  'common.sidebar.timeline': 'Chronologie',
  'common.sidebar.aboutBcs': 'À propos du BCS',
  'common.sidebar.quickTips': 'Conseils rapides',
  'common.knowledgeCards.heading': 'Connaissances clés',
  'common.knowledgeCards.footer': 'Données vérifiées par petsMetrics utilisant des sources vétérinaires évaluées par des pairs. Citations : ASPCA, AVMA, AAFP. Dernière révision : {year}.',
  'common.button.submit': 'Soumettre',
  'common.button.calculate': 'Calculer',
  'common.button.reset': 'Réinitialiser',
  'common.button.download': 'Télécharger',
  'common.button.share': 'Partager',
  'common.button.cancel': 'Annuler',
  'common.error.boundaryTitle': "Quelque chose s'est mal passé",
  'common.error.boundaryMessage': "Une erreur inattendue s'est produite. Veuillez réessayer.",
  'common.error.dismiss': 'Fermer',
  'common.share.copyLink': 'Copier le lien',
  'common.share.copied': 'Lien copié !',
  'common.share.shareOnTwitter': 'Partager sur Twitter',
  'common.share.shareOnFacebook': 'Partager sur Facebook',
  'common.disclaimer.standard': 'Tous les calculs sont basés sur des directives vétérinaires publiées (AAHA, WSAVA, AAFCO, AAFP). Les résultats sont des estimations.',
  'common.disclaimer.tool': 'Cet outil est fourni par petsMetrics à titre de référence générale uniquement et ne constitue pas un avis vétérinaire. Consultez toujours un vétérinaire agréé pour les décisions de santé.',
  'common.disclaimer.toxic': 'Ces informations sont fournies par petsMetrics à titre de référence générale uniquement. Ce ne sont PAS des conseils vétérinaires. Si votre animal a ingéré une substance potentiellement toxique, contactez immédiatement votre vétérinaire ou le centre antipoison ASPCA au (888) 426-4435.',
  'common.disclaimer.emergency': "URGENCE : Appelez immédiatement le centre antipoison ASPCA (888) 426-4435 ou le vétérinaire d'urgence le plus proche. Ces informations sont fournies par petsMetrics à titre informatif uniquement — ne retardez pas le traitement.",
  'common.disclaimer.prefix.tool': 'Avertissement médical :',
  'common.disclaimer.prefix.toxic': 'Avertissement médical :',
  'common.disclaimer.prefix.emergency': 'URGENCE — Avertissement médical :',
  'common.disclaimer.ariaLabel': 'Avertissement médical',
  'common.disclaimer.body': 'Cet outil est fourni par petsMetrics à titre de référence générale uniquement et ne constitue pas un avis, un diagnostic ou un traitement vétérinaire.',

  // Header
  'header.logoAlt': 'petsMetrics',

  // Nav
  'nav.home': 'Accueil',
  'nav.dog': 'Chien',
  'nav.cat': 'Chat',
  'nav.profile': 'Profil',
  'nav.about': 'À propos',
  'nav.privacy': 'Confidentialité',
  'nav.terms': 'Conditions',
  'nav.tools': 'Outils',
  'nav.resources': 'Ressources',
  'nav.guides': 'Guides',
  'nav.compare': 'Comparer',
  'nav.emergency': 'Urgence',
  'nav.seasonal': 'Saisonnier',
  'nav.faq': 'FAQ',
  'nav.toxicChecker': 'Vérificateur de toxicité',
  'nav.euTravel': 'Voyage UE animaux',
  'nav.barfCalculator': 'Calculateur BARF',
  'nav.insurance': 'Assurance',

  // Footer
  'footer.contact': 'Contact',

  // Home
  'home.hero.cardPetName': 'Buddy',
  'home.hero.title': 'Des outils scientifiques pour vos animaux de compagnie',
  'home.hero.subtitle': 'Calculateurs, guides et comparateurs gratuits basés sur les directives vétérinaires. Aucune inscription requise.',
  'home.hero.cta': 'Explorer les outils',

  // Dog
  'dog.toolGrid.rating': 'P0',
  'dog.toolGrid.priority': 'P1',
  'dog.breedContent.breeds.labrador.name': 'Labrador Retriever',
  'dog.breedContent.breeds.goldenRetriever.name': 'Golden Retriever',
  'dog.guide.title': '🐕 Listes de contrôle des étapes de vie du chien',
  'dog.guide.description': "Listes de contrôle étape par étape pour chaque étape de la vie de votre chien. Interactives, imprimables et basées sur les directives AAHA/AVSAB.",
  'dog.guide.open': 'Voir la liste',
  'dog.guide.newPuppy.title': 'Liste pour nouveau chiot',
  'dog.guide.newPuppy.desc': "47 articles essentiels pour les 16 premières semaines de votre chiot. Des fournitures à la socialisation, tout ce dont vous avez besoin pour un bon départ.",
  'dog.guide.newPuppy.aria': 'Voir la liste pour nouveau chiot',
  'dog.guide.newPuppy.meta.title': 'Liste pour nouveau chiot : Tout ce dont vous avez besoin avant le premier jour | petsMetrics',
  'dog.guide.newPuppy.meta.description': "Liste complète pour nouveau chiot avec 47 articles à vérifier. PDF interactif et imprimable, estimateur de coûts, calendrier et conseils d'experts.",
  'dog.guide.puppyDevelopment.title': 'Étapes de développement du chiot',
  'dog.guide.puppyDevelopment.desc': 'Guide semaine par semaine de la naissance à 12 mois. Périodes néonatale, de socialisation, de peur et adolescence expliquées.',
  'dog.guide.rescueDog.title': "Adopter un chien de refuge",
  'dog.guide.rescueDog.desc': "Guide d'adaptation complet 3-3-3. De la décompression au lien affectif, basé sur la science comportementale ASPCA.",
  'dog.guide.seniorDog.title': 'Soins pour chien senior',
  'dog.guide.seniorDog.desc': "32 éléments de surveillance de la santé pour chiens vieillissants. Visites vétérinaires semestrielles, gestion de l'arthrite et soutien cognitif.",
  'dog.guide.seniorDog.aria': 'Voir la liste de soins pour chien senior',
  'dog.gestation.facts': 'Faits sur la gestation canine',

  // Cat
  'cat.toolGrid.rating': 'P0',
  'cat.toolGrid.priority': 'P1',
  'cat.guide.title': '🐱 Listes de contrôle des étapes de vie du chat',
  'cat.guide.description': "Listes de contrôle étape par étape pour chaque étape de la vie de votre chat. Interactives, imprimables et basées sur les directives AAFP/ISFM.",
  'cat.guide.open': 'Voir la liste',
  'cat.guide.newKitten.title': 'Liste pour nouveau chaton',
  'cat.guide.newKitten.desc': "40 articles essentiels pour les 16 premières semaines de votre chaton. De la litière à la vaccination, tout ce dont vous avez besoin pour un départ sain.",
  'cat.guide.newKitten.aria': 'Voir la liste pour nouveau chaton',
  'cat.guide.newKitten.meta.title': 'Liste pour nouveau chaton : Tout ce dont vous avez besoin avant le premier jour | petsMetrics',
  'cat.guide.newKitten.meta.description': "Liste complète pour nouveau chaton avec 40 articles à vérifier. PDF interactif et imprimable, estimateur de coûts, calendrier et conseils d'experts.",
  'cat.guide.seniorCat.title': 'Liste de soins pour chat senior',
  'cat.guide.seniorCat.desc': "30 éléments de surveillance de la santé pour chats vieillissants. Visites vétérinaires semestrielles, dépistage CKD et gestion de la douleur.",
  'cat.guide.seniorCat.aria': 'Voir la liste de soins pour chat senior',
  'cat.gestation.facts': 'Faits sur la gestation féline',

  // Dog Age
  'dogAge.lifeStage.cardTitle': '{stage} — {stageName}',
  'dogAge.form.monthsOptional': 'plus (facultatif) :',

  // Dog Calorie
  'dogCalorie.form.coefficient': 'coeff.',

  // Puppy Growth
  'puppyGrowth.result.predictedRange': '{min} – {max} kg',

  // Gestation
  'gestation.facts': 'Faits sur la gestation',

  // Cat BCS
  'catBcs.result.bcsScore': 'BCS {score}/9',

  // Toxic Checker
  'toxicChecker.result.source': 'Source',
  'toxicLanding.aspcaPhone': 'Centre antipoison animal ASPCA',
  'toxicLanding.aspcaNumber': '(888) 426-4435',
  'toxicLanding.petPoisonHelpline': "Ligne d'assistance antipoison pour animaux",
  'toxicLanding.petPoisonNumber': '(855) 764-7661',

  // EU Travel
  'euTravel.form.destinationLabel': 'Destination',
  'euTravel.documents.microchip': 'Puce électronique (ISO 11784/11785)',

  // About
  'about.contact': 'Contact',

  // Terms
  'terms.contact': '9. Contact',

  // Privacy
  'privacy.intro': 'Cette politique de confidentialité décrit comment nous protégeons vos informations lorsque vous utilisez nos outils de calcul pour animaux.',
  'privacy.contact': 'Contact',

  // Compare
  'compare.limitations': 'Limites',
  'compare.dimension': 'Dimension',
  'compare.hub.guidesHeading': 'Guides et comparaisons gratuits',
  'compare.hub.guidesDescription': 'Articles fondés sur la science pour vous aider à prendre des décisions éclairées sur la santé, la nutrition et les soins de votre animal.',
  'compare.hub.compareCardAria': 'Lire la comparaison : {title}',
  'compare.relatedCompare.heading': 'Comparaison connexe',
  'compare.relatedCompare.readComparison': 'Lire la comparaison complète',
  'compare.relatedCompare.ariaLabel': 'Article de comparaison connexe',
  'compare.footer.dogGuides': 'Guides pour chien',
  'compare.footer.catGuides': 'Guides pour chat',
  'compare.footer.viewAll': 'Voir tous les guides',

  // Compare: Raw vs Kibble
  'compare.rawVsKibble.title': 'Alimentation crue vs croquettes pour chiens : science, sécurité et coût comparés',
  'compare.rawVsKibble.subtitle': "Une comparaison objective des régimes BARF et des croquettes commerciales — couvrant l'exhaustivité nutritionnelle, les risques de sécurité, le coût et la praticité. Données AAFCO, FDA et WSAVA citées.",
  'compare.rawVsKibble.topicAName': 'Régime cru (BARF)',
  'compare.rawVsKibble.topicBName': 'Croquettes commerciales',
  'compare.rawVsKibble.topicA.bestFor': "Propriétaires dévoués avec conseils d'un nutritionniste vétérinaire, chiens avec intolérances alimentaires spécifiques non résolues par les régimes commerciaux.",
  'compare.rawVsKibble.topicB.bestFor': "La grande majorité des propriétaires de chiens — surtout ceux sans accès à un nutritionniste vétérinaire certifié ou le budget pour des analyses régulières.",
  'compare.rawVsKibble.verdict': "<strong>Pour la plupart des propriétaires de chiens, des croquettes commerciales de haute qualité sont le choix le plus sûr et le plus pratique.</strong> Si vous êtes",
  'compare.rawVsKibble.dimension': 'Dimension',
  'compare.rawVsKibble.limitations': 'Limites',

  // Compare: Spayed vs Unspayed
  'compare.spayedVsUnspayed.title': 'Chienne stérilisée vs non stérilisée : santé, comportement et moment',
  'compare.spayedVsUnspayed.subtitle': "Une comparaison équilibrée de la stérilisation vs garder votre chien intact — couvrant les risques de cancer, les préoccupations orthopédiques, les changements comportementaux et le moment optimal. Données AVMA et AAHA citées.",
  'compare.spayedVsUnspayed.topicAName': 'Stérilisé(e)',
  'compare.spayedVsUnspayed.topicBName': 'Intact(e) (non stérilisé(e))',
  'compare.spayedVsUnspayed.topicA.bestFor': "La plupart des chiens, surtout les petites races, les races croisées et tout chien non destiné à des programmes d'élevage responsables.",
  'compare.spayedVsUnspayed.topicB.bestFor': "Races grandes/géantes où la stérilisation retardée bénéficie à la santé articulaire (discuter du moment avec le vétérinaire), programmes d'élevage gérés de manière responsable.",
  'compare.spayedVsUnspayed.verdict': "<strong>Les avantages de la stérilisation l'emportent sur les risques pour la plupart des chiens.</strong> Pour les petites races (<20kg), la stérilisation",

  // Compare: Harness vs Collar
  'compare.harnessVsCollar.title': 'Harnais vs collier pour chiens : lequel est le bon ?',
  'compare.harnessVsCollar.subtitle': 'Comparaison scientifique des harnais et des colliers plats couvrant la sécurité du cou, le contrôle de la traction, le risque de fuite et les recommandations spécifiques aux races.',
  'compare.harnessVsCollar.topicAName': 'Harnais à attache dorsale',
  'compare.harnessVsCollar.topicBName': 'Collier plat',
  'compare.harnessVsCollar.topicA.bestFor': "Races brachycéphales, chiots, chiens avec problèmes de trachée ou de thyroïde, tireurs puissants et chiens en convalescence de blessures au cou.",
  'compare.harnessVsCollar.topicB.bestFor': 'Promeneurs calmes, chiens bien dressés qui ne tirent pas et pour le port permanent de la médaille d\'identification.',
  'compare.harnessVsCollar.verdict': "<strong>Pour la plupart des chiens — surtout les races brachycéphales, les chiots et les tireurs — un harnais en Y bien ajusté est le choix le plus sûr.</strong>",

  // Compare: Pet Insurance vs Emergency Fund
  'compare.petInsuranceVsEmergencyFund.title': 'Assurance animaux vs fonds d\'urgence : lequel est le meilleur ?',
  'compare.petInsuranceVsEmergencyFund.subtitle': "Comparaison financière complète de l'assurance pour animaux et des fonds d'urgence auto-assurés couvrant les coûts mensuels, les lacunes de couverture, les processus de réclamation, les conditions spécifiques aux races et l'analyse du seuil de rentabilité. Données NAPHIA citées.",
  'compare.petInsuranceVsEmergencyFund.topicAName': 'Assurance animaux',
  'compare.petInsuranceVsEmergencyFund.topicBName': "Fonds d'urgence auto-assuré",
  'compare.petInsuranceVsEmergencyFund.topicA.bestFor': "Jeunes animaux en bonne santé, propriétaires qui veulent une prévisibilité des coûts, races prédisposées à des conditions coûteuses et ménages qui",
  'compare.petInsuranceVsEmergencyFund.topicB.bestFor': "Propriétaires avec une forte discipline financière, animaux âgés avec conditions préexistantes et comme supplément aux polices à franchise élevée.",
  'compare.petInsuranceVsEmergencyFund.verdict': "<strong>L'assurance pour animaux existe pour prévenir l'euthanasie financière dans des scénarios catastrophiques — une réserve d'urgence auto-assurée",

  // Compare: Grain-Free vs Whole Grain
  'compare.grainFreeVsWholeGrain.title': 'Sans céréales vs céréales complètes pour chiens : lequel est le plus sain ?',
  'compare.grainFreeVsWholeGrain.subtitle': "Comparaison basée sur des preuves des croquettes sans céréales et aux céréales complètes couvrant les préoccupations DCM, la qualité des ingrédients, la réponse glycémique, les allergies et le consensus vétérinaire. AAFCO, FDA et WSAVA cités.",
  'compare.grainFreeVsWholeGrain.topicAName': 'Régime sans céréales',
  'compare.grainFreeVsWholeGrain.topicBName': 'Régime aux céréales complètes',
  'compare.grainFreeVsWholeGrain.topicA.bestFor': "Chiens avec allergies aux céréales diagnostiquées (rares — confirmées uniquement par essai d'élimination sous supervision vétérinaire).",
  'compare.grainFreeVsWholeGrain.topicB.bestFor': "La grande majorité des chiens — les régimes aux céréales complètes sont la recommandation par défaut de WSAVA et de la plupart des nutritionnistes vétérinaires.",
  'compare.grainFreeVsWholeGrain.verdict': "<strong>Pour la plupart des chiens, un régime conforme AAFCO aux céréales complètes d'un fabricant qui emploie des nutritionnistes vétérinaires est le choix le plus sûr.</strong>",

  // Compare: Scratching Post vs Cat Tree
  'compare.scratchingPostVsCatTree.title': 'Griffoir vs arbre à chat : de quoi votre chat a-t-il besoin ?',
  'compare.scratchingPostVsCatTree.subtitle': "Comparaison détaillée des griffoirs et des arbres à chat couvrant les besoins d'espace, le comportement de griffade, le territoire vertical, les foyers multi-chats et le coût. Directives AAFP et ISFM citées.",
  'compare.scratchingPostVsCatTree.topicAName': 'Griffoir (autonome)',
  'compare.scratchingPostVsCatTree.topicBName': 'Arbre à chat (multi-niveaux)',
  'compare.scratchingPostVsCatTree.topicA.bestFor': "Foyers avec un seul chat et espace limité, propriétaires soucieux du budget ou complément d'un arbre à chat existant avec des surfaces de griffade supplémentaires.",
  'compare.scratchingPostVsCatTree.topicB.bestFor': "Foyers multi-chats, foyers avec un seul chat et espace adéquat, et chats montrant une préférence verticale (grimper aux rideaux",
  'compare.scratchingPostVsCatTree.verdict': "<strong>Commencez par un griffoir robuste pour chaque chat, puis ajoutez un arbre à chat si vous avez l'espace et le budget.</strong>",

  // Emergency
  'emergency.shared.severity.monitor.label': 'Surveiller',
  'emergency.shared.severity.mildlyToxic.label': 'Légèrement toxique',
  'emergency.shared.severity.dangerous.label': 'Dangereux',
  'emergency.shared.severity.toxic.label': 'Toxique',
  'emergency.shared.severity.extremelyToxic.label': 'Extrêmement toxique',
  'emergency.shared.riskLevel.high': 'Élevé',
  'emergency.shared.riskLevel.critical': 'CRITIQUE',
  'emergency.shared.riskLevel.moderate': 'Modéré',
  'emergency.shared.riskLevel.low': 'Faible',
  'emergency.shared.action.seekEmergency': '🚨 Cherchez des soins vétérinaires d\'urgence MAINTENANT',
  'emergency.shared.action.callNow': '🚨 Véto d\'urgence MAINTENANT',
  'emergency.shared.action.callImmediately': '📞 Appelez le vétérinaire ou le centre antipoison immédiatement',
  'emergency.shared.action.callToday': "📞 Appelez le vétérinaire aujourd'hui",
  'emergency.shared.action.monitorSymptoms': '👀 Surveillez les symptômes, appelez le vétérinaire si inquiet',
  'emergency.shared.action.callVet': '📞 Appelez le vétérinaire immédiatement',
  'emergency.shared.labels.petWeightDog': 'Poids du chien',
  'emergency.shared.labels.petWeightCat': 'Poids du chat',
  'emergency.shared.labels.amountEaten': 'Quantité ingérée',
  'emergency.shared.labels.riskLevel': 'Niveau de risque',
  'emergency.shared.labels.actionRequired': 'Action requise',
  'emergency.shared.labels.chocolateType': 'Type de chocolat',
  'emergency.shared.labels.whatWasEaten': 'Ce qui a été ingéré',
  'emergency.shared.labels.catSize': 'Taille du chat',
  'emergency.shared.labels.dogSize': 'Taille du chien',
  'emergency.shared.labels.anySize': 'Toute taille',
  'emergency.shared.labels.anyAmount': 'Toute quantité',
  'emergency.shared.vetDecision.title': 'Quand consulter un vétérinaire',
  'emergency.shared.vetDecision.emergencyTitle': '🚨 Urgence — Allez MAINTENANT',
  'emergency.shared.vetDecision.urgentTitle': '⚡ Urgent — Dans les 1-2 heures',
  'emergency.shared.vetDecision.monitorTitle': "👀 Surveiller — Appeler le vétérinaire aujourd'hui",
  'emergency.shared.titles.riskAssessment': 'Évaluez le risque de votre animal maintenant',
  'emergency.shared.titles.whatToDo': 'Que faire maintenant',
  'emergency.shared.titles.theScience': 'La science derrière',
  'emergency.shared.titles.toxicDose': 'Calculateur de dose toxique',
  'emergency.shared.titles.symptomTimeline': 'Chronologie des symptômes : à quoi s\'attendre',
  'emergency.shared.titles.faq': 'Questions fréquentes',
  'emergency.shared.titles.relatedTools': 'Outils connexes',
  'emergency.shared.aspcaHotline': 'Centre antipoison ASPCA : (888) 426-4435',
  'emergency.shared.aspcaLink': 'https://www.aspca.org/pet-care/animal-poison-control',
  'emergency.shared.stepTemplates.removeAll': 'Étape 1 : Retirez immédiatement tout [élément]',
  'emergency.shared.stepTemplates.removeItem': 'Étape 1 : Retirez tout [élément] restant de la portée de votre animal.',
  'emergency.shared.stepTemplates.determineAmount': "Étape 2 : Estimez la quantité consommée par votre animal et notez l'heure d'ingestion.",
  'emergency.shared.stepTemplates.doNotInduce': 'Étape : Ne PAS faire vomir sauf indication contraire d\'un vétérinaire.',
  'emergency.shared.stepTemplates.contactPoison': 'Étape : Contactez le centre antipoison ASPCA au (888) 426-4435.',
  'emergency.shared.stepTemplates.callVetUrgent': 'Étape 2 : Appelez le centre antipoison ou le vétérinaire',
  'emergency.shared.tools.toxicChecker': 'Vérificateur d\'aliments et plantes toxiques',
  'emergency.shared.tools.dogCalorie': 'Calculateur de calories pour chien',
  'emergency.shared.tools.catBcs': 'BCS et suivi de poids pour chat',
  'emergency.shared.tools.dogAge': 'Calculateur d\'âge canin',
  'emergency.shared.tools.catAge': 'Calculateur d\'âge félin',
  'emergency.shared.breadcrumb.home': 'Accueil',
  'emergency.shared.breadcrumb.dogEmergency': 'Urgence chien',
  'emergency.shared.breadcrumb.catEmergency': 'Urgence chat',

  // Emergency: Avocado
  'emergency.ateAvocado.breadcrumbLabel': 'A mangé de l\'avocat',
  'emergency.ateAvocado.meta.title': 'Mon chien a mangé de l\'avocat : Que faire | petsMetrics',
  'emergency.ateAvocado.meta.description': "Guide d'urgence : L'avocat contient de la persine légèrement toxique pour les chiens. Le plus grand danger est le noyau causant une obstruction intestinale.",
  'emergency.ateAvocado.meta.keywords': 'mon chien a mangé de l\'avocat que faire, toxicité avocat chiens, chien a mangé noyau avocat, empoisonnement persine chiens',
  'emergency.ateAvocado.banner.severityLabel': 'LÉGÈREMENT TOXIQUE — L\'obstruction par le noyau est le principal danger',
  'emergency.ateAvocado.banner.title': 'Mon chien a mangé de l\'avocat : Que faire maintenant',
  'emergency.ateAvocado.banner.subtitle': "La chair d'avocat est légèrement toxique pour les chiens en raison de la persine, mais le <strong>noyau est le vrai danger</strong> — il peut causer une obstruction intestinale mortelle.",
  'emergency.ateAvocado.banner.cta': 'Trouver un vétérinaire d\'urgence près de chez vous',
  'emergency.ateAvocado.article.headline': 'Mon chien a mangé de l\'avocat : Que faire maintenant',
  'emergency.ateAvocado.article.description': "Guide d'urgence pour l'ingestion d'avocat chez les chiens : toxicité à la persine, risque d'obstruction par le noyau et prévention.",
  'emergency.ateAvocado.article.ogTitle': 'Mon chien a mangé de l\'avocat : Que faire maintenant | petsMetrics',
  'emergency.ateAvocado.article.ogDescription': 'Que faire si votre chien mange de l\'avocat.',
  'emergency.ateAvocado.riskAssessment.formHeader': 'Ce qui a été ingéré',
  'emergency.ateAvocado.science.content': "L'avocat (Persea americana) contient de la persine, un dérivé fongicide d'acide gras. Les chiens sont relativement résistants à la persine.",
  'emergency.ateAvocado.toxicityData.minimum': 'Faible toxicité de la chair — légers troubles GI à toute quantité',
  'emergency.ateAvocado.toxicityData.ld50': 'DL50 : Persine DL50 exacte inconnue chez les chiens ; l\'obstruction par le noyau est la préoccupation clinique principale, pas la toxicité systémique',
  'emergency.ateAvocado.toxicityData.source': 'Source : Centre antipoison animal ASPCA ; Buoro et al., 1994',
  'emergency.ateAvocado.toxicityData.example': "Exemple : Un chien de 10kg mangeant de la chair d'avocat aura généralement des signes GI légers ; un noyau avalé de 3-5 cm peut obstruer l'intestin grêle.",

  // Emergency: Caffeine
  'emergency.ateCaffeine.breadcrumbLabel': 'A mangé de la caféine',
  'emergency.ateCaffeine.meta.title': 'Mon chien a mangé des pilules de caféine : Guide d\'urgence | petsMetrics',
  'emergency.ateCaffeine.meta.description': "Guide d'urgence : La caféine est toxique pour les chiens à 140mg/kg. Symptômes (hyperactivité, arythmie, convulsions), évaluation des risques.",
  'emergency.ateCaffeine.banner.severityLabel': 'TOXIQUE — Action rapide requise',
  'emergency.ateCaffeine.banner.title': 'Mon chien a mangé des pilules de caféine : Que faire maintenant',
  'emergency.ateCaffeine.banner.subtitle': 'La caféine est une méthylxanthine toxique pour les chiens à 140mg/kg. Même 1-2 pilules (200mg chacune) peuvent causer des convulsions chez les petits chiens.',
  'emergency.ateCaffeine.article.headline': 'Mon chien a mangé des pilules de caféine : Guide d\'urgence',
  'emergency.ateCaffeine.article.description': "Guide d'urgence pour la toxicité de la caféine chez les chiens : symptômes, risque de dosage et traitement.",
  'emergency.ateCaffeine.riskAssessment.formHeader': 'Source de caféine',
  'emergency.ateCaffeine.science.content': "La caféine (1,3,7-triméthylxanthine) est un antagoniste des récepteurs de l'adénosine et un inhibiteur de la phosphodiestérase. Chez les chiens, elle provoque",
  'emergency.ateCaffeine.toxicityData.minimum': 'Symptômes légers à 20mg/kg de poids corporel',
  'emergency.ateCaffeine.toxicityData.ld50': 'DL50 : ~140mg/kg de poids corporel',
  'emergency.ateCaffeine.toxicityData.source': 'Source : Centre antipoison animal ASPCA',
  'emergency.ateCaffeine.toxicityData.example': 'Exemple : 1-2 pilules de caféine (200mg chacune) peuvent causer des symptômes graves chez un petit chien de moins de 10kg.',

  // Emergency: Alcohol
  'emergency.ateAlcohol.breadcrumbLabel': 'A bu de l\'alcool',
  'emergency.ateAlcohol.meta.title': 'Mon chien a bu de l\'alcool : Guide d\'urgence | petsMetrics',
  'emergency.ateAlcohol.meta.description': "Guide d'urgence : L'alcool est hautement toxique pour les chiens. Symptômes (ataxie, dépression, acidose métabolique), risque par boisson.",
  'emergency.ateAlcohol.banner.severityLabel': 'TOXIQUE — Dépresseur du SNC',
  'emergency.ateAlcohol.banner.title': 'Mon chien a bu de l\'alcool : Guide d\'urgence',
  'emergency.ateAlcohol.banner.subtitle': "L'alcool (éthanol) est un puissant dépresseur du SNC chez les chiens. Même de petites quantités causent ataxie, dépression et acidose métabolique.",
  'emergency.ateAlcohol.article.headline': 'Mon chien a bu de l\'alcool : Guide d\'urgence',
  'emergency.ateAlcohol.article.description': "Guide d'urgence pour la toxicité alcoolique chez les chiens : symptômes, évaluation des risques et traitement.",
  'emergency.ateAlcohol.riskAssessment.formHeader': 'Type de boisson',
  'emergency.ateAlcohol.science.content': "L'éthanol (C2H5OH) est absorbé rapidement par le tractus GI et traverse la barrière hémato-encéphalique en quelques minutes. Les chiens manquent d'efficacité",
  'emergency.ateAlcohol.toxicityData.minimum': "Aussi peu que 1,5 mL/kg d'éthanol pur peut causer une intoxication notable",
  'emergency.ateAlcohol.toxicityData.ld50': "DL50 : ~5,5 mL/kg d'éthanol pur",
  'emergency.ateAlcohol.toxicityData.source': 'Source : Manuel vétérinaire Merck ; Centre antipoison animal ASPCA',
  'emergency.ateAlcohol.toxicityData.example': "Exemple : Une seule bière de 12oz (5% ABV = 17g d'éthanol) peut causer une intoxication sévère chez un petit chien de moins de 10kg.",

  // Emergency: Macadamia Nuts
  'emergency.ateMacadamiaNuts.breadcrumbLabel': 'A mangé des noix de macadamia',
  'emergency.ateMacadamiaNuts.meta.title': 'Mon chien a mangé des noix de macadamia : Que faire | petsMetrics',
  'emergency.ateMacadamiaNuts.banner.severityLabel': 'DANGEREUX — Traitement vétérinaire souvent requis',
  'emergency.ateMacadamiaNuts.banner.title': 'Mon chien a mangé des noix de macadamia : Que faire maintenant',
  'emergency.ateMacadamiaNuts.banner.subtitle': "Les noix de macadamia sont uniquement toxiques pour les chiens — la toxine est inconnue mais cause une faiblesse des pattes arrière, des tremblements et une forte fièvre.",
  'emergency.ateMacadamiaNuts.article.headline': 'Mon chien a mangé des noix de macadamia : Que faire maintenant',
  'emergency.ateMacadamiaNuts.article.description': "Guide d'urgence pour la toxicité des noix de macadamia chez les chiens.",
  'emergency.ateMacadamiaNuts.science.content': "Les noix de macadamia contiennent une toxine non identifiée qui affecte uniquement le système neuromusculaire des chiens.",
  'emergency.ateMacadamiaNuts.toxicityData.minimum': 'Dose toxique minimale : 0,5 g/kg de poids corporel (symptômes légers)',
  'emergency.ateMacadamiaNuts.toxicityData.ld50': 'DL50 : 2,4 g/kg de poids corporel (symptômes graves)',
  'emergency.ateMacadamiaNuts.toxicityData.source': 'Source : Morton, 2002 — Journal of Veterinary Diagnostic Investigation',
  'emergency.ateMacadamiaNuts.toxicityData.example': 'Exemple : Un chien de 15kg mangeant 15g de noix de macadamia (environ 12-15 noix) atteindrait le seuil toxique minimum.',

  // Emergency: Mushrooms
  'emergency.ateMushrooms.breadcrumbLabel': 'A mangé un champignon',
  'emergency.ateMushrooms.meta.title': 'Mon chien a mangé un champignon dans le jardin : Guide d\'urgence | petsMetrics',
  'emergency.ateMushrooms.meta.description': "Guide d'urgence : Les champignons sauvages peuvent être mortellement toxiques pour les chiens. Empoisonnement aux amanites, délai des symptômes.",
  'emergency.ateMushrooms.article.headline': 'Mon chien a mangé un champignon dans le jardin : Guide d\'urgence',
  'emergency.ateMushrooms.article.description': "Guide d'urgence pour la toxicité des champignons sauvages chez les chiens : empoisonnement aux amanites, risque d'insuffisance hépatique et traitement immédiat.",
  'emergency.ateMushrooms.banner.severityLabel': 'EXTRÊMEMENT TOXIQUE — Mortel, apparition retardée',
  'emergency.ateMushrooms.banner.title': 'Mon chien a mangé un champignon dans le jardin : Que faire maintenant',
  'emergency.ateMushrooms.banner.subtitle': "Les champignons sauvages peuvent causer une insuffisance hépatique mortelle — les symptômes sont RETARDÉS de 6-24 heures. <strong>N'attendez pas les symptômes.</strong>",
  'emergency.ateMushrooms.science.content': "Les amatoxines (alpha-amanitine, bêta-amanitine) sont des octapeptides bicycliques trouvés dans les espèces Amanita, Galerina et Lepiota.",
  'emergency.ateMushrooms.toxicityData.minimum': "0,1 mg/kg d'amatoxine (une amanite phalloïde = 10-15mg)",
  'emergency.ateMushrooms.toxicityData.ld50': "Non bien établie ; 0,1mg/kg d'amatoxine potentiellement mortelle",
  'emergency.ateMushrooms.toxicityData.source': 'Centre antipoison animal ASPCA, 2023',
  'emergency.ateMushrooms.toxicityData.example': "Un seul chapeau d'Amanita phalloides contient assez d'amatoxine pour tuer un chien de 10-20kg. L'ingestion partielle met toujours la vie en danger.",

  // Emergency: Cooked Bones
  'emergency.ateCookedBones.breadcrumbLabel': 'A mangé des os cuits',
  'emergency.ateCookedBones.meta.title': 'Mon chien a mangé des os cuits : Guide d\'urgence | petsMetrics',
  'emergency.ateCookedBones.article.headline': 'Mon chien a mangé des os cuits : Guide d\'urgence',
  'emergency.ateCookedBones.article.description': "Guide d'urgence pour l'ingestion d'os cuits chez les chiens : risque d'éclats, obstruction et traitement.",
  'emergency.ateCookedBones.banner.severityLabel': "DANGEREUX — Risque d'éclats et d'obstruction",
  'emergency.ateCookedBones.banner.title': 'Mon chien a mangé des os cuits : Que faire maintenant',
  'emergency.ateCookedBones.banner.subtitle': "Les os cuits se brisent en fragments pointus qui peuvent perforer la paroi intestinale ou causer une obstruction mortelle.",
  'emergency.ateCookedBones.science.content': "La cuisson dénature le collagène dans les os, les rendant cassants et sujets aux éclats. Les os crus contiennent du collagène flexible.",
  'emergency.ateCookedBones.toxicityData.minimum': "N/A (danger mécanique — tout fragment peut causer des dommages)",
  'emergency.ateCookedBones.toxicityData.ld50': 'Non applicable — traumatisme physique, pas toxicité chimique',
  'emergency.ateCookedBones.toxicityData.source': 'Directives AAHA, Manuel vétérinaire Merck',
  'emergency.ateCookedBones.toxicityData.example': "Un seul os de poulet peut se briser en dizaines d'éclats en forme d'aiguille qui agissent comme de minuscules couteaux dans le tractus GI.",

  // Emergency: Plastic
  'emergency.atePlastic.breadcrumbLabel': 'A mangé du plastique',
  'emergency.atePlastic.meta.title': 'Mon chien a mangé du plastique : Que faire maintenant | petsMetrics',
  'emergency.atePlastic.article.headline': 'Mon chien a mangé du plastique : Que faire maintenant',
  'emergency.atePlastic.article.description': "Guide d'urgence pour l'ingestion de plastique chez les chiens : risque d'obstruction, symptômes et options de traitement.",
  'emergency.atePlastic.banner.severityLabel': "SURVEILLER — Le risque d'obstruction dépend de la taille",
  'emergency.atePlastic.banner.title': 'Mon chien a mangé du plastique : Que faire maintenant',
  'emergency.atePlastic.banner.subtitle': "Le plastique n'est pas toxique mais peut causer une obstruction intestinale dangereuse. Le risque dépend de la taille et de la forme de l'objet.",
  'emergency.atePlastic.decisionGuide.safe': "Morceau de plastique inférieur à 2cm (ex. coin d'emballage). Surveiller les selles pendant 48 heures.",
  'emergency.atePlastic.decisionGuide.call': 'Morceau de plastique de 2-3cm OU votre chien montre des vomissements/léthargie. Une radiographie peut être nécessaire.',
  'emergency.atePlastic.decisionGuide.emergency': "Plastique de plus de 3cm, OU vomissements persistants, OU pas de selles en 48 heures. Une chirurgie est probablement nécessaire.",
  'emergency.atePlastic.science.content': "Le plastique est chimiquement inerte et non toxique pour les chiens — le danger est purement mécanique. Le tractus GI canin se rétrécit à deux endroits.",
  'emergency.atePlastic.toxicityData.minimum': "N/A (danger mécanique — pas un empoisonnement)",
  'emergency.atePlastic.toxicityData.ld50': "Non applicable — risque d'obstruction physique",
  'emergency.atePlastic.toxicityData.source': 'Manuel vétérinaire Merck, ASPCA',
  'emergency.atePlastic.toxicityData.example': "Une balle en plastique de 2cm ne passera pas par le pylore d'un chien de taille moyenne. Les objets >2cm nécessitent une évaluation vétérinaire.",

  // Emergency: Medication
  'emergency.ateMedication.breadcrumbLabel': 'A mangé des médicaments',
  'emergency.ateMedication.meta.title': 'Mon chien a mangé des médicaments humains : Guide d\'urgence | petsMetrics',
  'emergency.ateMedication.article.headline': 'Mon chien a mangé des médicaments humains : Guide d\'urgence',
  'emergency.ateMedication.article.description': "Guide d'urgence pour l'ingestion de médicaments humains chez les chiens : toxicité AINS, empoisonnement au paracétamol et traitement.",
  'emergency.ateMedication.banner.severityLabel': 'TOXIQUE — Les médicaments humains peuvent être mortels pour les chiens',
  'emergency.ateMedication.banner.title': 'Mon chien a mangé des médicaments humains : Que faire maintenant',
  'emergency.ateMedication.banner.subtitle': "Les médicaments humains sont une cause majeure d'empoisonnement des animaux. Même un seul comprimé d'ibuprofène ou de paracétamol peut tuer un chien.",
  'emergency.ateMedication.science.content': "Les chiens métabolisent de nombreux médicaments différemment des humains. Les AINS (ibuprofène) inhibent les enzymes cyclooxygénases, réduisant la protection",
  'emergency.ateMedication.toxicityData.minimum': 'Dépend du médicament : Ibuprofène 50mg/kg, Paracétamol 75mg/kg, un seul comprimé de certains médicaments TDAH',
  'emergency.ateMedication.toxicityData.ld50': 'Ibuprofène : 100mg/kg (mortel), Paracétamol : 150mg/kg (Source : ASPCA)',
  'emergency.ateMedication.toxicityData.source': 'Centre antipoison animal ASPCA, 2023',
  'emergency.ateMedication.toxicityData.example': "Un seul comprimé d'ibuprofène de 200mg peut causer une insuffisance rénale chez un chien de 4kg. Cinq comprimés (1000mg) = 250mg/kg = potentiellement mortel.",

  // Emergency: Rodenticide
  'emergency.ateRodenticide.breadcrumbLabel': 'A mangé du rodenticide',
  'emergency.ateRodenticide.meta.title': 'Mon chien a mangé du poison à rats : Guide d\'urgence | petsMetrics',
  'emergency.ateRodenticide.article.headline': 'Mon chien a mangé du poison à rats : Guide d\'urgence',
  'emergency.ateRodenticide.article.description': "Guide d'urgence pour l'empoisonnement aux rodenticides chez les chiens : types anticoagulants et neurotoxiques, symptômes et traitement.",
  'emergency.ateRodenticide.banner.severityLabel': 'EXTRÊMEMENT TOXIQUE — Mortel, agissez maintenant',
  'emergency.ateRodenticide.banner.title': 'Mon chien a mangé du poison à rats : Que faire maintenant',
  'emergency.ateRodenticide.banner.subtitle': "Le rodenticide est l'une des toxines les plus mortelles pour les chiens. <strong>N'attendez pas les symptômes</strong> — les effets anticoagulants sont retardés",
  'emergency.ateRodenticide.riskAssessment.headers.type': 'Type de rodenticide',
  'emergency.ateRodenticide.riskAssessment.headers.activeIngredient': 'Ingrédient actif',
  'emergency.ateRodenticide.riskAssessment.headers.riskLevel': 'Niveau de risque',
  'emergency.ateRodenticide.riskAssessment.headers.actionRequired': 'Action requise',
  'emergency.ateRodenticide.science.content': "Les rodenticides anticoagulants inhibent la vitamine K époxyde réductase (VKOR), empêchant le recyclage de la vitamine K. Cela épuise",

  // Emergency: Tobacco
  'emergency.ateTobacco.breadcrumbLabel': 'A mangé du tabac',
  'emergency.ateTobacco.meta.title': 'Mon chien a mangé du tabac/cigarettes : Guide d\'urgence | petsMetrics',
  'emergency.ateTobacco.article.headline': 'Mon chien a mangé du tabac/cigarettes : Guide d\'urgence',
  'emergency.ateTobacco.article.description': "Guide d'urgence pour la toxicité de la nicotine chez les chiens : cigarettes, e-liquide, gommes et patchs à la nicotine.",
  'emergency.ateTobacco.banner.severityLabel': 'TOXIQUE — La nicotine est rapidement absorbée',
  'emergency.ateTobacco.banner.title': 'Mon chien a mangé du tabac/cigarettes : Que faire maintenant',
  'emergency.ateTobacco.banner.subtitle': "La nicotine est hautement toxique pour les chiens à 20-100mg/kg. Le e-liquide est particulièrement dangereux en raison de sa concentration élevée.",
  'emergency.ateTobacco.riskAssessment.headers.source': 'Source de nicotine',
  'emergency.ateTobacco.riskAssessment.headers.amount': 'Quantité',
  'emergency.ateTobacco.riskAssessment.headers.riskLevel': 'Niveau de risque',
  'emergency.ateTobacco.riskAssessment.headers.actionRequired': 'Action requise',
  'emergency.ateTobacco.science.content': "La nicotine est un alcaloïde qui se lie aux récepteurs nicotiniques de l'acétylcholine (nAChRs) dans les ganglions autonomes, neuromusculaires",

  // Emergency: Marijuana
  'emergency.ateMarijuana.breadcrumbLabel': 'A mangé de la marijuana',
  'emergency.ateMarijuana.meta.title': 'Mon chien a mangé de la marijuana/comestibles : Guide d\'urgence | petsMetrics',
  'emergency.ateMarijuana.article.headline': 'Mon chien a mangé de la marijuana/comestibles : Guide d\'urgence',
  'emergency.ateMarijuana.article.description': "Guide d'urgence pour la toxicité du THC chez les chiens : comestibles de marijuana, symptômes et traitement.",
  'emergency.ateMarijuana.banner.severityLabel': 'DANGEREUX — Les comestibles au cannabis sont hautement toxiques',
  'emergency.ateMarijuana.banner.title': 'Mon chien a mangé de la marijuana/comestibles : Que faire maintenant',
  'emergency.ateMarijuana.banner.subtitle': "Les chiens sont plus sensibles au THC que les humains. Les comestibles (bonbons, brownies) sont particulièrement dangereux en raison de leur concentration élevée.",
  'emergency.ateMarijuana.honestySection.title': '📋 Important : Soyez honnête avec votre vétérinaire',
  'emergency.ateMarijuana.honestySection.content': "Les vétérinaires sont <strong>tenus de traiter, pas de signaler</strong> les empoisonnements d'animaux. Des informations précises sur la marijuana sont",
  'emergency.ateMarijuana.riskAssessment.headers.productType': 'Type de produit',

  // Profile
  'profile.wizard.step4NeuteredNo': 'Non',

  // Vaccination
  'vaccination.result.tableStatus': 'Statut',

  // Cat BCS
  'catBcs.bcsOptions.5': 'Idéal',

  // EU Travel
  'euTravel.documents.microchip': 'Puce électronique (ISO 11784/11785)',

  // Compare: Microchip vs Tattoo
  'compare.microchipVsTattoo.topicAName': 'Puce électronique',

  // Emergency source
  'emergency.atePlastic.toxicityData.source': 'Manuel vétérinaire Merck, ASPCA',
};

// ============================================================
// HI - Hindi comprehensive translations
// ============================================================
const hiTranslations = {
  'common.loading': 'लोड हो रहा है...',
  'common.required': 'आवश्यक',
  'common.optional': 'वैकल्पिक',
  'common.yes': 'हाँ',
  'common.no': 'नहीं',
  'common.male': 'नर',
  'common.female': 'मादा',
  'common.puppy': 'पिल्ला',
  'common.adult': 'वयस्क',
  'common.senior': 'वरिष्ठ',
  'common.small': 'छोटा',
  'common.medium': 'मध्यम',
  'common.gross': 'बड़ा',
  'common.giant': 'विशाल',
  'common.neutered': 'नपुंसक',
  'common.intact': 'अक्षत',
  'common.active': 'सक्रिय',
  'common.sedentary': 'गतिहीन',
  'common.slightly': 'थोड़ा सक्रिय',
  'common.very': 'बहुत सक्रिय',
  'common.extremely': 'अत्यधिक सक्रिय',
  'common.healthy': 'स्वस्थ',
  'common.overweight': 'अधिक वजन',
  'common.underweight': 'कम वजन',
  'common.notFound.description': 'पृष्ठ नहीं मिला',
  'common.notFound.returnHome': 'होम पर वापस जाएं',
  'common.breadcrumb.home': 'होम',
  'common.breadcrumb.dog': 'कुत्ता',
  'common.breadcrumb.cat': 'बिल्ली',
  'common.cta.tryAgeCalculator': 'आयु कैलकुलेटर आज़माएं →',
  'common.cta.calculateCalories': 'कैलोरी की गणना करें →',
  'common.cta.viewVaccineSchedule': 'टीकाकरण कार्यक्रम देखें →',
  'common.cta.checkDueDates': 'नियत तिथियां जांचें →',
  'common.cta.open': 'खोलें →',
  'common.privacy.heading': 'हम आपकी गोपनीयता की रक्षा कैसे करते हैं',
  'common.privacy.body': 'सभी पालतू प्रोफाइल, कैलकुलेटर इनपुट और परिणाम विशेष रूप से आपके ब्राउज़र के स्थानीय स्टोरेज में संग्रहीत किए जाते हैं। कोई डेटा कभी नहीं',
  'common.sidebar.catBcs.ideal': 'आदर्श: 4-5/9',
  'common.sidebar.quickFacts': 'त्वरित तथ्य',
  'common.sidebar.dogTools': 'कुत्ते के उपकरण',
  'common.sidebar.catTools': 'बिल्ली के उपकरण',
  'common.sidebar.emergencyContacts': 'आपातकालीन संपर्क',
  'common.sidebar.quickVetTip': 'त्वरित पशु चिकित्सक सुझाव',
  'common.sidebar.barfRatios': 'BARF अनुपात',
  'common.sidebar.safetyTips': 'सुरक्षा सुझाव',
  'common.sidebar.averageMonthlyCosts': 'औसत मासिक लागत',
  'common.sidebar.whatAffectsCost': 'लागत को क्या प्रभावित करता है',
  'common.sidebar.requiredDocuments': 'आवश्यक दस्तावेज',
  'common.sidebar.timeline': 'समयरेखा',
  'common.sidebar.aboutBcs': 'BCS के बारे में',
  'common.sidebar.quickTips': 'त्वरित सुझाव',
  'common.knowledgeCards.heading': 'मुख्य ज्ञान',
  'common.knowledgeCards.footer': 'petsMetrics द्वारा सहकर्मी-समीक्षित पशु चिकित्सा स्रोतों का उपयोग करके डेटा सत्यापित किया गया। उद्धरण: ASPCA, AVMA, AAFP। अंतिम समीक्षा: {year}।',
  'common.button.submit': 'जमा करें',
  'common.button.calculate': 'गणना करें',
  'common.button.reset': 'रीसेट करें',
  'common.button.download': 'डाउनलोड करें',
  'common.button.share': 'साझा करें',
  'common.button.cancel': 'रद्द करें',
  'common.error.boundaryTitle': 'कुछ गलत हो गया',
  'common.error.boundaryMessage': 'एक अप्रत्याशित त्रुटि हुई। कृपया पुनः प्रयास करें।',
  'common.error.dismiss': 'खारिज करें',
  'common.share.copyLink': 'लिंक कॉपी करें',
  'common.share.copied': 'लिंक कॉपी किया गया!',
  'common.share.shareOnTwitter': 'Twitter पर साझा करें',
  'common.share.shareOnFacebook': 'Facebook पर साझा करें',
  'common.disclaimer.standard': 'सभी गणनाएं प्रकाशित पशु चिकित्सा दिशानिर्देशों (AAHA, WSAVA, AAFCO, AAFP) पर आधारित हैं। परिणाम अनुमान हैं।',
  'common.disclaimer.tool': 'यह उपकरण petsMetrics द्वारा केवल सामान्य संदर्भ के लिए प्रदान किया गया है और यह पशु चिकित्सा सलाह नहीं है। स्वास्थ्य निर्णयों के लिए हमेशा लाइसेंस प्राप्त पशु चिकित्सक से परामर्श करें।',
  'common.disclaimer.toxic': 'यह जानकारी petsMetrics द्वारा केवल सामान्य संदर्भ के लिए प्रदान की गई है। यह पशु चिकित्सा सलाह नहीं है। यदि आपके पालतू ने संभावित विषाक्त पदार्थ खा लिया है, तो तुरंत अपने पशु चिकित्सक या ASPCA पॉइज़न कंट्रोल से (888) 426-4435 पर संपर्क करें।',
  'common.disclaimer.emergency': 'आपातकाल: ASPCA पशु विष नियंत्रण (888) 426-4435 या निकटतम आपातकालीन पशु चिकित्सक को तुरंत कॉल करें। यह जानकारी petsMetrics द्वारा केवल सामान्य जागरूकता के लिए प्रदान की गई है — उपचार में देरी न करें।',
  'common.disclaimer.prefix.tool': 'चिकित्सा अस्वीकरण:',
  'common.disclaimer.prefix.toxic': 'चिकित्सा अस्वीकरण:',
  'common.disclaimer.prefix.emergency': 'आपातकाल — चिकित्सा अस्वीकरण:',
  'common.disclaimer.ariaLabel': 'चिकित्सा अस्वीकरण',
  'common.disclaimer.body': 'यह उपकरण petsMetrics द्वारा केवल सामान्य संदर्भ के लिए प्रदान किया गया है और यह पशु चिकित्सा सलाह, निदान या उपचार नहीं है।',

  'header.logoAlt': 'petsMetrics',
  'nav.home': 'होम',
  'nav.dog': 'कुत्ता',
  'nav.cat': 'बिल्ली',
  'nav.profile': 'प्रोफ़ाइल',
  'nav.about': 'हमारे बारे में',
  'nav.privacy': 'गोपनीयता',
  'nav.terms': 'शर्तें',
  'nav.tools': 'उपकरण',
  'nav.resources': 'संसाधन',
  'nav.guides': 'गाइड',
  'nav.compare': 'तुलना करें',
  'nav.emergency': 'आपातकाल',
  'nav.seasonal': 'मौसमी',
  'nav.faq': 'सामान्य प्रश्न',
  'nav.toxicChecker': 'विषाक्तता जांचकर्ता',
  'nav.euTravel': 'EU पालतू यात्रा',
  'nav.barfCalculator': 'BARF कैलकुलेटर',
  'nav.insurance': 'बीमा',

  'footer.contact': 'संपर्क',

  'home.hero.cardPetName': 'बडी',
  'dog.toolGrid.rating': 'P0',
  'dog.toolGrid.priority': 'P1',
  'dog.breedContent.breeds.labrador.name': 'लैब्राडोर रिट्रीवर',
  'dog.breedContent.breeds.goldenRetriever.name': 'गोल्डन रिट्रीवर',
  'dog.guide.title': '🐕 कुत्ते के जीवन चरण चेकलिस्ट',
  'dog.guide.description': 'आपके कुत्ते के जीवन के हर चरण के लिए चरण-दर-चरण चेकलिस्ट। इंटरैक्टिव, प्रिंट करने योग्य और AAHA/AVSAB दिशानिर्देशों पर आधारित।',
  'dog.guide.open': 'चेकलिस्ट देखें',
  'dog.guide.newPuppy.title': 'नए पिल्ले की चेकलिस्ट',
  'dog.guide.newPuppy.desc': 'आपके पिल्ले के पहले 16 सप्ताहों के लिए 47 आवश्यक वस्तुएं। आपूर्ति से लेकर समाजीकरण तक, एक शानदार शुरुआत के लिए सब कुछ।',
  'dog.guide.newPuppy.aria': 'नए पिल्ले की चेकलिस्ट देखें',
  'dog.guide.newPuppy.meta.title': 'नए पिल्ले की चेकलिस्ट: पहले दिन से पहले आपको जो कुछ चाहिए | petsMetrics',
  'dog.guide.newPuppy.meta.description': '47 वस्तुओं की जांच के लिए पूर्ण नए पिल्ले की चेकलिस्ट। इंटरैक्टिव, प्रिंट करने योग्य PDF, लागत अनुमानक, समयरेखा और विशेषज्ञ सुझाव।',
  'dog.guide.puppyDevelopment.title': 'पिल्ला विकास चरण',
  'dog.guide.puppyDevelopment.desc': 'जन्म से 12 महीने तक सप्ताह-दर-सप्ताह गाइड। नवजात, समाजीकरण, भय अवधि और किशोरावस्था की व्याख्या।',
  'dog.guide.rescueDog.title': 'बचाव कुत्ता अपनाना',
  'dog.guide.rescueDog.desc': 'पूर्ण 3-3-3 समायोजन गाइड। डीकंप्रेशन से लेकर बॉन्डिंग तक, ASPCA व्यवहार विज्ञान पर आधारित।',
  'dog.guide.seniorDog.title': 'वरिष्ठ कुत्ते की देखभाल',
  'dog.guide.seniorDog.desc': 'उम्रदराज कुत्तों के लिए 32 स्वास्थ्य निगरानी आइटम। द्विवार्षिक पशु चिकित्सक दौरे, गठिया प्रबंधन और संज्ञानात्मक समर्थन।',
  'dog.guide.seniorDog.aria': 'वरिष्ठ कुत्ते की देखभाल चेकलिस्ट देखें',
  'dog.gestation.facts': 'कुत्ते की गर्भावस्था तथ्य',

  'cat.toolGrid.rating': 'P0',
  'cat.toolGrid.priority': 'P1',
  'cat.guide.title': '🐱 बिल्ली के जीवन चरण चेकलिस्ट',
  'cat.guide.description': 'आपकी बिल्ली के जीवन के हर चरण के लिए चरण-दर-चरण चेकलिस्ट। इंटरैक्टिव, प्रिंट करने योग्य और AAFP/ISFM दिशानिर्देशों पर आधारित।',
  'cat.guide.open': 'चेकलिस्ट देखें',
  'cat.guide.newKitten.title': 'नए बिल्ली के बच्चे की चेकलिस्ट',
  'cat.guide.newKitten.desc': 'आपके बिल्ली के बच्चे के पहले 16 सप्ताहों के लिए 40 आवश्यक वस्तुएं। लिटर बॉक्स से टीकाकरण तक, स्वस्थ शुरुआत के लिए सब कुछ।',
  'cat.guide.newKitten.aria': 'नए बिल्ली के बच्चे की चेकलिस्ट देखें',
  'cat.guide.newKitten.meta.title': 'नए बिल्ली के बच्चे की चेकलिस्ट: पहले दिन से पहले आपको जो कुछ चाहिए | petsMetrics',
  'cat.guide.newKitten.meta.description': '40 वस्तुओं की जांच के लिए पूर्ण नए बिल्ली के बच्चे की चेकलिस्ट। इंटरैक्टिव, प्रिंट करने योग्य PDF, लागत अनुमानक, समयरेखा और विशेषज्ञ सुझाव।',
  'cat.guide.seniorCat.title': 'वरिष्ठ बिल्ली की देखभाल चेकलिस्ट',
  'cat.guide.seniorCat.desc': 'उम्रदराज बिल्लियों के लिए 30 स्वास्थ्य निगरानी आइटम। द्विवार्षिक पशु चिकित्सक दौरे, CKD स्क्रीनिंग और दर्द प्रबंधन।',
  'cat.guide.seniorCat.aria': 'वरिष्ठ बिल्ली की देखभाल चेकलिस्ट देखें',
  'cat.gestation.facts': 'बिल्ली की गर्भावस्था तथ्य',

  'dogAge.lifeStage.cardTitle': '{stage} — {stageName}',
  'dogAge.form.monthsOptional': 'प्लस (वैकल्पिक):',
  'dogCalorie.form.coefficient': 'गुणांक',
  'puppyGrowth.result.predictedRange': '{min} – {max} किग्रा',
  'gestation.facts': 'गर्भावस्था तथ्य',
  'catBcs.result.bcsScore': 'BCS {score}/9',
  'toxicChecker.result.source': 'स्रोत',
  'toxicLanding.aspcaPhone': 'ASPCA पशु विष नियंत्रण',
  'toxicLanding.aspcaNumber': '(888) 426-4435',
  'toxicLanding.petPoisonHelpline': 'पालतू विष हेल्पलाइन',
  'toxicLanding.petPoisonNumber': '(855) 764-7661',
  'euTravel.form.destinationLabel': 'गंतव्य',
  'about.contact': 'संपर्क',
  'terms.contact': '9. संपर्क',
  'privacy.intro': 'यह गोपनीयता नीति बताती है कि जब आप हमारे पालतू गणना उपकरणों का उपयोग करते हैं तो हम आपकी जानकारी की सुरक्षा कैसे करते हैं।',
  'compare.limitations': 'सीमाएं',
  'compare.dimension': 'आयाम',
  'compare.hub.guidesHeading': 'मुफ्त गाइड और तुलना',
  'compare.hub.guidesDescription': 'आपके पालतू जानवर के स्वास्थ्य, पोषण और देखभाल के बारे में सूचित निर्णय लेने में मदद करने के लिए विज्ञान-समर्थित लेख।',
  'compare.hub.compareCardAria': 'तुलना पढ़ें: {title}',
  'compare.relatedCompare.heading': 'संबंधित तुलना',
  'compare.relatedCompare.readComparison': 'पूरी तुलना पढ़ें',
  'compare.relatedCompare.ariaLabel': 'संबंधित तुलना लेख',
  'compare.footer.dogGuides': 'कुत्ते की गाइड',
  'compare.footer.catGuides': 'बिल्ली की गाइड',
  'compare.footer.viewAll': 'सभी गाइड देखें',

  'compare.rawVsKibble.title': 'कच्चा आहार बनाम किबल: विज्ञान, सुरक्षा और लागत की तुलना',
  'compare.rawVsKibble.subtitle': 'BARF आहार और वाणिज्यिक किबल की एक वस्तुनिष्ठ तुलना — पोषण पूर्णता, सुरक्षा जोखिम, लागत और व्यावहारिकता को कवर करती है।',
  'compare.rawVsKibble.topicAName': 'कच्चा आहार (BARF)',
  'compare.rawVsKibble.topicBName': 'वाणिज्यिक किबल',
  'compare.rawVsKibble.topicA.bestFor': 'पशु चिकित्सा पोषण विशेषज्ञ मार्गदर्शन वाले समर्पित मालिक, विशिष्ट खाद्य असहिष्णुता वाले कुत्ते।',
  'compare.rawVsKibble.topicB.bestFor': 'अधिकांश कुत्ते के मालिक — विशेष रूप से बोर्ड-प्रमाणित पशु चिकित्सा पोषण विशेषज्ञ तक पहुंच के बिना।',
  'compare.rawVsKibble.verdict': '<strong>अधिकांश कुत्ते के मालिकों के लिए, उच्च गुणवत्ता वाला वाणिज्यिक किबल सबसे सुरक्षित और सबसे व्यावहारिक विकल्प है।</strong>',

  'compare.spayedVsUnspayed.title': 'बंध्याकृत बनाम अबंध्याकृत कुत्ता: स्वास्थ्य, व्यवहार और समय',
  'compare.spayedVsUnspayed.subtitle': 'बंध्याकरण बनाम अपने कुत्ते को अक्षत रखने की एक संतुलित तुलना — कैंसर जोखिम, आर्थोपेडिक चिंताएं, व्यवहार परिवर्तन और इष्टतम समय।',
  'compare.spayedVsUnspayed.topicAName': 'बंध्याकृत',
  'compare.spayedVsUnspayed.topicBName': 'अक्षत (अबंध्याकृत)',
  'compare.spayedVsUnspayed.topicA.bestFor': 'अधिकांश कुत्ते, विशेष रूप से छोटी नस्लें, मिश्रित नस्लें और कोई भी कुत्ता जो जिम्मेदार प्रजनन कार्यक्रमों के लिए नहीं है।',
  'compare.spayedVsUnspayed.topicB.bestFor': 'बड़ी/विशाल नस्लें जहां विलंबित बंध्याकरण संयुक्त स्वास्थ्य को लाभ पहुंचाता है, जिम्मेदारी से प्रबंधित प्रजनन कार्यक्रम।',
  'compare.spayedVsUnspayed.verdict': '<strong>बंध्याकरण के लाभ अधिकांश कुत्तों के लिए जोखिमों से अधिक हैं।</strong> छोटी नस्लों (<20kg) के लिए, बंध्याकरण',

  'compare.harnessVsCollar.title': 'हार्नेस बनाम कॉलर: कुत्तों के लिए कौन सा सही है?',
  'compare.harnessVsCollar.subtitle': 'गर्दन की सुरक्षा, खिंचाव नियंत्रण, भागने का जोखिम और नस्ल-विशिष्ट सिफारिशों को कवर करने वाली हार्नेस और फ्लैट कॉलर की विज्ञान-समर्थित तुलना।',
  'compare.harnessVsCollar.topicAName': 'बैक-क्लिप हार्नेस',
  'compare.harnessVsCollar.topicBName': 'फ्लैट कॉलर',
  'compare.harnessVsCollar.topicA.bestFor': 'ब्रैकीसेफेलिक नस्लें, पिल्ले, श्वासनली या थायरॉइड समस्याओं वाले कुत्ते, मजबूत खिंचाव करने वाले।',
  'compare.harnessVsCollar.topicB.bestFor': 'शांत चलने वाले, अच्छी तरह से प्रशिक्षित कुत्ते जो खिंचाव नहीं करते, और स्थायी ID टैग पहनने के लिए।',
  'compare.harnessVsCollar.verdict': '<strong>अधिकांश कुत्तों के लिए — विशेष रूप से ब्रैकीसेफेलिक नस्लें, पिल्ले और खिंचाव करने वाले — एक अच्छी तरह से फिट Y-फ्रंट हार्नेस सबसे सुरक्षित विकल्प है।</strong>',

  'compare.petInsuranceVsEmergencyFund.title': 'पालतू बीमा बनाम आपातकालीन निधि: कौन सा बेहतर है?',
  'compare.petInsuranceVsEmergencyFund.subtitle': 'पालतू बीमा और स्व-बीमित आपातकालीन निधियों की व्यापक वित्तीय तुलना।',
  'compare.petInsuranceVsEmergencyFund.topicAName': 'पालतू बीमा',
  'compare.petInsuranceVsEmergencyFund.topicBName': 'स्व-वित्तपोषित आपातकालीन रिजर्व',
  'compare.petInsuranceVsEmergencyFund.topicA.bestFor': 'युवा स्वस्थ पालतू, लागत पूर्वानुमान चाहने वाले मालिक, महंगी स्थितियों के लिए प्रवण नस्लें।',
  'compare.petInsuranceVsEmergencyFund.topicB.bestFor': 'मजबूत वित्तीय अनुशासन वाले मालिक, पूर्व-मौजूदा स्थितियों वाले वृद्ध पालतू।',
  'compare.petInsuranceVsEmergencyFund.verdict': '<strong>पालतू बीमा विनाशकारी परिदृश्यों में वित्तीय इच्छामृत्यु को रोकने के लिए मौजूद है — एक स्व-वित्तपोषित आपातकालीन रिजर्व',

  'compare.grainFreeVsWholeGrain.title': 'अनाज-मुक्त बनाम साबुत अनाज कुत्ते का भोजन: कौन सा स्वास्थ्यवर्धक है?',
  'compare.grainFreeVsWholeGrain.subtitle': 'DCM चिंताओं, सामग्री गुणवत्ता, ग्लाइसेमिक प्रतिक्रिया, एलर्जी और पशु चिकित्सा सहमति को कवर करने वाली साक्ष्य-आधारित तुलना।',
  'compare.grainFreeVsWholeGrain.topicAName': 'अनाज-मुक्त आहार',
  'compare.grainFreeVsWholeGrain.topicBName': 'साबुत अनाज आहार',
  'compare.grainFreeVsWholeGrain.topicA.bestFor': 'निदानित अनाज एलर्जी वाले कुत्ते (दुर्लभ — केवल पशु चिकित्सा पर्यवेक्षण के तहत उन्मूलन आहार परीक्षण के माध्यम से पुष्टि)।',
  'compare.grainFreeVsWholeGrain.topicB.bestFor': 'अधिकांश कुत्ते — साबुत अनाज आहार WSAVA और अधिकांश पशु चिकित्सा पोषण विशेषज्ञों द्वारा अनुशंसित डिफ़ॉल्ट हैं।',
  'compare.grainFreeVsWholeGrain.verdict': '<strong>अधिकांश कुत्तों के लिए, पशु चिकित्सा पोषण विशेषज्ञों को नियुक्त करने वाले निर्माता से AAFCO-अनुरूप साबुत अनाज आहार सबसे सुरक्षित विकल्प है।</strong>',

  'compare.scratchingPostVsCatTree.title': 'स्क्रैचिंग पोस्ट बनाम कैट ट्री: आपकी बिल्ली को क्या चाहिए?',
  'compare.scratchingPostVsCatTree.subtitle': 'स्थान आवश्यकताओं, स्क्रैचिंग व्यवहार, ऊर्ध्वाधर क्षेत्र, बहु-बिल्ली घरों और लागत को कवर करने वाली विस्तृत तुलना।',
  'compare.scratchingPostVsCatTree.topicAName': 'स्क्रैचिंग पोस्ट (स्टैंडअलोन)',
  'compare.scratchingPostVsCatTree.topicBName': 'कैट ट्री (बहु-स्तरीय)',
  'compare.scratchingPostVsCatTree.topicA.bestFor': 'सीमित स्थान वाले एकल-बिल्ली घर, बजट-सचेत मालिक।',
  'compare.scratchingPostVsCatTree.topicB.bestFor': 'बहु-बिल्ली घर, पर्याप्त स्थान वाले एकल-बिल्ली घर, और ऊर्ध्वाधर वरीयता दिखाने वाली बिल्लियां।',
  'compare.scratchingPostVsCatTree.verdict': '<strong>प्रत्येक बिल्ली के लिए एक मजबूत स्क्रैचिंग पोस्ट से शुरू करें, फिर यदि आपके पास स्थान और बजट है तो एक कैट ट्री जोड़ें।</strong>',

  'emergency.shared.severity.monitor.label': 'निगरानी करें',
  'emergency.shared.severity.mildlyToxic.label': 'हल्का विषाक्त',
  'emergency.shared.severity.dangerous.label': 'खतरनाक',
  'emergency.shared.severity.toxic.label': 'विषाक्त',
  'emergency.shared.severity.extremelyToxic.label': 'अत्यधिक विषाक्त',
  'emergency.shared.riskLevel.high': 'उच्च',
  'emergency.shared.riskLevel.critical': 'गंभीर',
  'emergency.shared.riskLevel.moderate': 'मध्यम',
  'emergency.shared.riskLevel.low': 'कम',
  'emergency.shared.action.seekEmergency': '🚨 अभी आपातकालीन पशु चिकित्सा देखभाल लें',
  'emergency.shared.action.callNow': '🚨 अभी आपातकालीन पशु चिकित्सक',
  'emergency.shared.action.callImmediately': '📞 तुरंत पशु चिकित्सक या विष नियंत्रण को कॉल करें',
  'emergency.shared.action.callToday': '📞 आज पशु चिकित्सक को कॉल करें',
  'emergency.shared.action.monitorSymptoms': '👀 लक्षणों की निगरानी करें, चिंतित होने पर पशु चिकित्सक को कॉल करें',
  'emergency.shared.action.callVet': '📞 तुरंत पशु चिकित्सक को कॉल करें',
  'emergency.shared.labels.petWeightDog': 'कुत्ते का वजन',
  'emergency.shared.labels.petWeightCat': 'बिल्ली का वजन',
  'emergency.shared.labels.amountEaten': 'खाई गई मात्रा',
  'emergency.shared.labels.riskLevel': 'जोखिम स्तर',
  'emergency.shared.labels.actionRequired': 'आवश्यक कार्रवाई',
  'emergency.shared.labels.chocolateType': 'चॉकलेट का प्रकार',
  'emergency.shared.labels.whatWasEaten': 'क्या खाया गया',
  'emergency.shared.labels.catSize': 'बिल्ली का आकार',
  'emergency.shared.labels.dogSize': 'कुत्ते का आकार',
  'emergency.shared.labels.anySize': 'कोई भी आकार',
  'emergency.shared.labels.anyAmount': 'कोई भी मात्रा',
  'emergency.shared.vetDecision.title': 'पशु चिकित्सक को कब दिखाना है',
  'emergency.shared.vetDecision.emergencyTitle': '🚨 आपातकाल — अभी जाएं',
  'emergency.shared.vetDecision.urgentTitle': '⚡ तत्काल — 1-2 घंटे के भीतर',
  'emergency.shared.vetDecision.monitorTitle': '👀 निगरानी करें — आज पशु चिकित्सक को कॉल करें',
  'emergency.shared.titles.riskAssessment': 'अभी अपने पालतू के जोखिम का आकलन करें',
  'emergency.shared.titles.whatToDo': 'अभी क्या करें',
  'emergency.shared.titles.theScience': 'इसके पीछे का विज्ञान',
  'emergency.shared.titles.toxicDose': 'विषाक्त खुराक कैलकुलेटर',
  'emergency.shared.titles.symptomTimeline': 'लक्षण समयरेखा: क्या उम्मीद करें',
  'emergency.shared.titles.faq': 'अक्सर पूछे जाने वाले प्रश्न',
  'emergency.shared.titles.relatedTools': 'संबंधित उपकरण',
  'emergency.shared.aspcaHotline': 'ASPCA विष नियंत्रण: (888) 426-4435',
  'emergency.shared.aspcaLink': 'https://www.aspca.org/pet-care/animal-poison-control',
  'emergency.shared.stepTemplates.removeAll': 'चरण 1: सभी [वस्तु] तुरंत हटाएं',
  'emergency.shared.stepTemplates.removeItem': 'चरण 1: अपने पालतू की पहुंच से शेष [वस्तु] हटाएं।',
  'emergency.shared.stepTemplates.determineAmount': 'चरण 2: अपने पालतू द्वारा खाई गई मात्रा का अनुमान लगाएं और सेवन का समय नोट करें।',
  'emergency.shared.stepTemplates.doNotInduce': 'चरण: जब तक पशु चिकित्सक द्वारा निर्देशित न किया जाए, उल्टी न कराएं।',
  'emergency.shared.stepTemplates.contactPoison': 'चरण: ASPCA विष नियंत्रण से (888) 426-4435 पर संपर्क करें।',
  'emergency.shared.stepTemplates.callVetUrgent': 'चरण 2: विष नियंत्रण या पशु चिकित्सक को कॉल करें',
  'emergency.shared.tools.toxicChecker': 'विषाक्त भोजन और पौधा जांचकर्ता',
  'emergency.shared.tools.dogCalorie': 'कुत्ता कैलोरी कैलकुलेटर',
  'emergency.shared.tools.catBcs': 'बिल्ली BCS और वजन ट्रैकर',
  'emergency.shared.tools.dogAge': 'कुत्ते की आयु कैलकुलेटर',
  'emergency.shared.tools.catAge': 'बिल्ली की आयु कैलकुलेटर',
  'emergency.shared.breadcrumb.home': 'होम',
  'emergency.shared.breadcrumb.dogEmergency': 'कुत्ता आपातकाल',
  'emergency.shared.breadcrumb.catEmergency': 'बिल्ली आपातकाल',

  'emergency.ateAvocado.breadcrumbLabel': 'एवोकाडो खाया',
  'emergency.ateAvocado.meta.title': 'मेरे कुत्ते ने एवोकाडो खाया: अब क्या करें | petsMetrics',
  'emergency.ateAvocado.banner.severityLabel': 'हल्का विषाक्त — गुठली अवरोध मुख्य खतरा है',
  'emergency.ateAvocado.banner.title': 'मेरे कुत्ते ने एवोकाडो खाया: अब क्या करें',
  'emergency.ateAvocado.article.headline': 'मेरे कुत्ते ने एवोकाडो खाया: अब क्या करें',
  'emergency.ateAvocado.article.description': 'कुत्तों में एवोकाडो सेवन के लिए आपातकालीन गाइड: पर्सिन विषाक्तता, गुठली अवरोध जोखिम और रोकथाम।',
  'emergency.ateAvocado.riskAssessment.formHeader': 'क्या खाया गया',
  'emergency.ateAvocado.science.content': 'एवोकाडो (Persea americana) में पर्सिन होता है, एक कवकनाशी फैटी एसिड व्युत्पन्न। कुत्ते पर्सिन के प्रति अपेक्षाकृत प्रतिरोधी होते हैं।',
  'emergency.ateAvocado.toxicityData.minimum': 'गूदा कम विषाक्तता — किसी भी मात्रा पर हल्का GI परेशान',
  'emergency.ateAvocado.toxicityData.source': 'स्रोत: ASPCA पशु विष नियंत्रण केंद्र; Buoro et al., 1994',
  'emergency.ateAvocado.toxicityData.example': 'उदाहरण: 10kg का कुत्ता एवोकाडो का गूदा खाने पर आमतौर पर हल्के GI लक्षण दिखाएगा; 3-5 सेमी की निगली गई गुठली छोटी आंत को अवरुद्ध कर सकती है।',

  'emergency.ateCaffeine.breadcrumbLabel': 'कैफीन खाया',
  'emergency.ateCaffeine.meta.title': 'मेरे कुत्ते ने कैफीन की गोलियां खाईं: आपातकालीन गाइड | petsMetrics',
  'emergency.ateCaffeine.banner.severityLabel': 'विषाक्त — तीव्र कार्रवाई आवश्यक',
  'emergency.ateCaffeine.banner.title': 'मेरे कुत्ते ने कैफीन की गोलियां खाईं: अब क्या करें',
  'emergency.ateCaffeine.article.headline': 'मेरे कुत्ते ने कैफीन की गोलियां खाईं: आपातकालीन गाइड',
  'emergency.ateCaffeine.article.description': 'कुत्तों में कैफीन विषाक्तता के लिए आपातकालीन गाइड: लक्षण, खुराक जोखिम और उपचार।',
  'emergency.ateCaffeine.riskAssessment.formHeader': 'कैफीन स्रोत',
  'emergency.ateCaffeine.science.content': 'कैफीन (1,3,7-ट्राइमिथाइलजैंथिन) एक एडेनोसिन रिसेप्टर विरोधी और फॉस्फोडाइएस्टरेज़ अवरोधक है। कुत्तों में, यह',
  'emergency.ateCaffeine.toxicityData.minimum': 'शरीर के वजन के 20mg/kg पर हल्के लक्षण',
  'emergency.ateCaffeine.toxicityData.ld50': 'LD50: ~140mg/kg शरीर का वजन',
  'emergency.ateCaffeine.toxicityData.source': 'स्रोत: ASPCA पशु विष नियंत्रण केंद्र',
  'emergency.ateCaffeine.toxicityData.example': 'उदाहरण: 1-2 कैफीन की गोलियां (200mg प्रत्येक) 10kg से कम के छोटे कुत्ते में गंभीर लक्षण पैदा कर सकती हैं।',

  'emergency.ateAlcohol.breadcrumbLabel': 'शराब पी ली',
  'emergency.ateAlcohol.meta.title': 'मेरे कुत्ते ने शराब पी ली: आपातकालीन गाइड | petsMetrics',
  'emergency.ateAlcohol.banner.severityLabel': 'विषाक्त — CNS अवसादक',
  'emergency.ateAlcohol.banner.title': 'मेरे कुत्ते ने शराब पी ली: आपातकालीन गाइड',
  'emergency.ateAlcohol.article.headline': 'मेरे कुत्ते ने शराब पी ली: आपातकालीन गाइड',
  'emergency.ateAlcohol.article.description': 'कुत्तों में शराब विषाक्तता के लिए आपातकालीन गाइड: लक्षण, जोखिम आकलन और उपचार।',
  'emergency.ateAlcohol.riskAssessment.formHeader': 'पेय प्रकार',
  'emergency.ateAlcohol.science.content': 'एथेनॉल (C2H5OH) GI पथ से तेजी से अवशोषित होता है और मिनटों में रक्त-मस्तिष्क बाधा को पार करता है। कुत्तों में कुशल',
  'emergency.ateAlcohol.toxicityData.minimum': '1.5 mL/kg शुद्ध एथेनॉल जितना कम ध्यान देने योग्य नशा पैदा कर सकता है',
  'emergency.ateAlcohol.toxicityData.ld50': 'LD50: ~5.5 mL/kg शुद्ध एथेनॉल',
  'emergency.ateAlcohol.toxicityData.source': 'स्रोत: मर्क पशु चिकित्सा मैनुअल; ASPCA पशु विष नियंत्रण केंद्र',
  'emergency.ateAlcohol.toxicityData.example': 'उदाहरण: एक 12oz बीयर (5% ABV = 17g एथेनॉल) 10kg से कम के छोटे कुत्ते में गंभीर नशा पैदा कर सकती है।',

  'emergency.ateMacadamiaNuts.breadcrumbLabel': 'मैकाडामिया नट्स खाए',
  'emergency.ateMacadamiaNuts.meta.title': 'मेरे कुत्ते ने मैकाडामिया नट्स खाए: अब क्या करें | petsMetrics',
  'emergency.ateMacadamiaNuts.banner.severityLabel': 'खतरनाक — पशु चिकित्सा उपचार अक्सर आवश्यक',
  'emergency.ateMacadamiaNuts.banner.title': 'मेरे कुत्ते ने मैकाडामिया नट्स खाए: अब क्या करें',
  'emergency.ateMacadamiaNuts.article.headline': 'मेरे कुत्ते ने मैकाडामिया नट्स खाए: अब क्या करें',
  'emergency.ateMacadamiaNuts.article.description': 'कुत्तों में मैकाडामिया नट विषाक्तता के लिए आपातकालीन गाइड: लक्षण, उपचार और रोकथाम।',
  'emergency.ateMacadamiaNuts.science.content': 'मैकाडामिया नट्स में एक अज्ञात विष होता है जो विशिष्ट रूप से कुत्तों के न्यूरोमस्कुलर सिस्टम को प्रभावित करता है।',
  'emergency.ateMacadamiaNuts.toxicityData.minimum': 'न्यूनतम विषाक्त खुराक: 0.5 g/kg शरीर का वजन (हल्के लक्षण)',
  'emergency.ateMacadamiaNuts.toxicityData.ld50': 'LD50: 2.4 g/kg शरीर का वजन (गंभीर लक्षण)',
  'emergency.ateMacadamiaNuts.toxicityData.source': 'स्रोत: Morton, 2002 — जर्नल ऑफ वेटरनरी डायग्नोस्टिक इन्वेस्टिगेशन',
  'emergency.ateMacadamiaNuts.toxicityData.example': 'उदाहरण: 15kg का कुत्ता 15g मैकाडामिया नट्स (लगभग 12-15 नट्स) खाने पर न्यूनतम विषाक्त सीमा तक पहुंच जाएगा।',

  'emergency.ateMushrooms.breadcrumbLabel': 'मशरूम खाया',
  'emergency.ateMushrooms.meta.title': 'मेरे कुत्ते ने बगीचे में मशरूम खाया: आपातकालीन गाइड | petsMetrics',
  'emergency.ateMushrooms.article.headline': 'मेरे कुत्ते ने बगीचे में मशरूम खाया: आपातकालीन गाइड',
  'emergency.ateMushrooms.article.description': 'कुत्तों में जंगली मशरूम विषाक्तता के लिए आपातकालीन गाइड: अमानिटा विषाक्तता, यकृत विफलता जोखिम और तत्काल उपचार।',
  'emergency.ateMushrooms.banner.severityLabel': 'अत्यधिक विषाक्त — जानलेवा, विलंबित शुरुआत',
  'emergency.ateMushrooms.banner.title': 'मेरे कुत्ते ने बगीचे में मशरूम खाया: अब क्या करें',
  'emergency.ateMushrooms.banner.subtitle': 'जंगली मशरूम घातक यकृत विफलता का कारण बन सकते हैं — लक्षण 6-24 घंटे विलंबित होते हैं। <strong>लक्षणों की प्रतीक्षा न करें।</strong>',
  'emergency.ateMushrooms.science.content': 'अमाटॉक्सिन (अल्फा-अमानिटिन, बीटा-अमानिटिन) अमानिटा, गैलेरिना और लेपियोटा प्रजातियों में पाए जाने वाले बाइसाइक्लिक ऑक्टापेप्टाइड हैं।',
  'emergency.ateMushrooms.toxicityData.minimum': '0.1 mg/kg अमाटॉक्सिन (एक डेथ कैप = 10-15mg)',
  'emergency.ateMushrooms.toxicityData.ld50': 'अच्छी तरह से स्थापित नहीं; 0.1mg/kg अमाटॉक्सिन संभावित रूप से घातक',
  'emergency.ateMushrooms.toxicityData.source': 'ASPCA पशु विष नियंत्रण केंद्र, 2023',
  'emergency.ateMushrooms.toxicityData.example': 'एक अमानिटा फालोइड्स कैप में 10-20kg के कुत्ते को मारने के लिए पर्याप्त अमाटॉक्सिन होता है। आंशिक सेवन अभी भी जानलेवा है।',

  'emergency.ateCookedBones.breadcrumbLabel': 'पके हुए हड्डियां खाईं',
  'emergency.ateCookedBones.meta.title': 'मेरे कुत्ते ने पकी हुई हड्डियां खाईं: आपातकालीन गाइड | petsMetrics',
  'emergency.ateCookedBones.article.headline': 'मेरे कुत्ते ने पकी हुई हड्डियां खाईं: आपातकालीन गाइड',
  'emergency.ateCookedBones.article.description': 'कुत्तों में पकी हुई हड्डी के सेवन के लिए आपातकालीन गाइड: छिलने का जोखिम, अवरोध और उपचार।',
  'emergency.ateCookedBones.banner.severityLabel': 'खतरनाक — छिलने और अवरोध का जोखिम',
  'emergency.ateCookedBones.banner.title': 'मेरे कुत्ते ने पकी हुई हड्डियां खाईं: अब क्या करें',
  'emergency.ateCookedBones.banner.subtitle': 'पकी हुई हड्डियां तेज टुकड़ों में छिल जाती हैं जो आंतों की दीवार को छेद सकती हैं या जानलेवा अवरोध पैदा कर सकती हैं।',
  'emergency.ateCookedBones.science.content': 'खाना पकाने से हड्डियों में कोलेजन विकृत हो जाता है, जिससे वे भंगुर और छिलने के लिए प्रवण हो जाती हैं। कच्ची हड्डियों में लचीला कोलेजन होता है।',
  'emergency.ateCookedBones.toxicityData.minimum': 'N/A (यांत्रिक खतरा — किसी भी आकार का टुकड़ा नुकसान पहुंचा सकता है)',
  'emergency.ateCookedBones.toxicityData.ld50': 'लागू नहीं — शारीरिक आघात, रासायनिक विषाक्तता नहीं',
  'emergency.ateCookedBones.toxicityData.source': 'AAHA दिशानिर्देश, मर्क पशु चिकित्सा मैनुअल',
  'emergency.ateCookedBones.toxicityData.example': 'एक मुर्गे की हड्डी दर्जनों सुई जैसे छिलकों में टूट सकती है जो GI पथ में छोटे चाकू की तरह काम करते हैं।',

  'emergency.atePlastic.breadcrumbLabel': 'प्लास्टिक खाया',
  'emergency.atePlastic.meta.title': 'मेरे कुत्ते ने प्लास्टिक खाया: अब क्या करें | petsMetrics',
  'emergency.atePlastic.article.headline': 'मेरे कुत्ते ने प्लास्टिक खाया: अब क्या करें',
  'emergency.atePlastic.article.description': 'कुत्तों में प्लास्टिक सेवन के लिए आपातकालीन गाइड: अवरोध जोखिम, लक्षण और उपचार विकल्प।',
  'emergency.atePlastic.banner.severityLabel': 'निगरानी करें — अवरोध जोखिम आकार पर निर्भर करता है',
  'emergency.atePlastic.banner.title': 'मेरे कुत्ते ने प्लास्टिक खाया: अब क्या करें',
  'emergency.atePlastic.banner.subtitle': 'प्लास्टिक गैर-विषाक्त है लेकिन खतरनाक आंतों का अवरोध पैदा कर सकता है। जोखिम वस्तु के आकार और आकृति पर निर्भर करता है।',
  'emergency.atePlastic.decisionGuide.safe': '2cm से छोटा प्लास्टिक टुकड़ा। 48 घंटे तक मल की निगरानी करें।',
  'emergency.atePlastic.decisionGuide.call': '2-3cm का प्लास्टिक टुकड़ा या आपका कुत्ता कोई उल्टी/सुस्ती दिखाता है। एक्स-रे की आवश्यकता हो सकती है।',
  'emergency.atePlastic.decisionGuide.emergency': '3cm से बड़ा प्लास्टिक, या लगातार उल्टी, या 48 घंटे में मल त्याग नहीं। सर्जरी की संभावित आवश्यकता।',
  'emergency.atePlastic.science.content': 'प्लास्टिक रासायनिक रूप से निष्क्रिय और कुत्तों के लिए गैर-विषाक्त है — खतरा पूरी तरह से यांत्रिक है।',
  'emergency.atePlastic.toxicityData.minimum': 'N/A (यांत्रिक खतरा — विषाक्तता नहीं)',
  'emergency.atePlastic.toxicityData.ld50': 'लागू नहीं — शारीरिक अवरोध जोखिम',
  'emergency.atePlastic.toxicityData.source': 'मर्क पशु चिकित्सा मैनुअल, ASPCA',
  'emergency.atePlastic.toxicityData.example': '2cm की प्लास्टिक खिलौना गेंद मध्यम आकार के कुत्ते के पाइलोरस से नहीं गुजरेगी। 2cm से बड़ी वस्तुओं के लिए पशु चिकित्सक मूल्यांकन आवश्यक है।',

  'emergency.ateMedication.breadcrumbLabel': 'दवा खाई',
  'emergency.ateMedication.meta.title': 'मेरे कुत्ते ने मानव दवा खाई: आपातकालीन गाइड | petsMetrics',
  'emergency.ateMedication.article.headline': 'मेरे कुत्ते ने मानव दवा खाई: आपातकालीन गाइड',
  'emergency.ateMedication.article.description': 'कुत्तों में मानव दवा सेवन के लिए आपातकालीन गाइड: NSAID विषाक्तता, एसिटामिनोफेन विषाक्तता और उपचार।',
  'emergency.ateMedication.banner.severityLabel': 'विषाक्त — मानव दवा कुत्तों के लिए घातक हो सकती है',
  'emergency.ateMedication.banner.title': 'मेरे कुत्ते ने मानव दवा खाई: अब क्या करें',
  'emergency.ateMedication.banner.subtitle': 'मानव दवाएं पालतू विषाक्तता का प्रमुख कारण हैं। इबुप्रोफेन या एसिटामिनोफेन की एक गोली भी कुत्ते को मार सकती है।',
  'emergency.ateMedication.science.content': 'कुत्ते मनुष्यों की तुलना में कई दवाओं को अलग तरह से मेटाबोलाइज करते हैं। NSAIDs (इबुप्रोफेन) साइक्लोऑक्सीजिनेज एंजाइम को रोकते हैं।',
  'emergency.ateMedication.toxicityData.minimum': 'दवा-निर्भर: इबुप्रोफेन 50mg/kg, एसिटामिनोफेन 75mg/kg, कुछ ADHD दवाओं की एक गोली',
  'emergency.ateMedication.toxicityData.ld50': 'इबुप्रोफेन: 100mg/kg (घातक), एसिटामिनोफेन: 150mg/kg (स्रोत: ASPCA)',
  'emergency.ateMedication.toxicityData.source': 'ASPCA पशु विष नियंत्रण केंद्र, 2023',
  'emergency.ateMedication.toxicityData.example': '200mg की एक इबुप्रोफेन गोली 4kg के कुत्ते में गुर्दे की विफलता पैदा कर सकती है। पांच गोलियां (1000mg) = 250mg/kg = संभावित रूप से घातक।',

  'emergency.ateRodenticide.breadcrumbLabel': 'चूहे का जहर खाया',
  'emergency.ateRodenticide.meta.title': 'मेरे कुत्ते ने चूहे का जहर खाया: आपातकालीन गाइड | petsMetrics',
  'emergency.ateRodenticide.article.headline': 'मेरे कुत्ते ने चूहे का जहर खाया: आपातकालीन गाइड',
  'emergency.ateRodenticide.article.description': 'कुत्तों में रोडेंटिसाइड विषाक्तता के लिए आपातकालीन गाइड: एंटीकोआगुलेंट और न्यूरोटॉक्सिक प्रकार, लक्षण और उपचार।',
  'emergency.ateRodenticide.banner.severityLabel': 'अत्यधिक विषाक्त — जानलेवा, अभी कार्रवाई करें',
  'emergency.ateRodenticide.banner.title': 'मेरे कुत्ते ने चूहे का जहर खाया: अब क्या करें',
  'emergency.ateRodenticide.banner.subtitle': 'रोडेंटिसाइड सबसे घातक कुत्ते के विषाक्त पदार्थों में से एक है। <strong>लक्षणों की प्रतीक्षा न करें</strong> — एंटीकोआगुलेंट प्रभाव विलंबित होते हैं',
  'emergency.ateRodenticide.riskAssessment.headers.type': 'रोडेंटिसाइड प्रकार',
  'emergency.ateRodenticide.riskAssessment.headers.activeIngredient': 'सक्रिय संघटक',
  'emergency.ateRodenticide.riskAssessment.headers.riskLevel': 'जोखिम स्तर',
  'emergency.ateRodenticide.riskAssessment.headers.actionRequired': 'आवश्यक कार्रवाई',
  'emergency.ateRodenticide.science.content': 'एंटीकोआगुलेंट रोडेंटिसाइड विटामिन K एपॉक्साइड रिडक्टेस (VKOR) को रोकते हैं, विटामिन K के पुनर्चक्रण को रोकते हैं।',

  'emergency.ateTobacco.breadcrumbLabel': 'तंबाकू खाया',
  'emergency.ateTobacco.meta.title': 'मेरे कुत्ते ने तंबाकू/सिगरेट खाई: आपातकालीन गाइड | petsMetrics',
  'emergency.ateTobacco.article.headline': 'मेरे कुत्ते ने तंबाकू/सिगरेट खाई: आपातकालीन गाइड',
  'emergency.ateTobacco.article.description': 'कुत्तों में निकोटीन विषाक्तता के लिए आपातकालीन गाइड: सिगरेट, ई-लिक्विड, निकोटीन गम और पैच।',
  'emergency.ateTobacco.banner.severityLabel': 'विषाक्त — निकोटीन तेजी से अवशोषित होता है',
  'emergency.ateTobacco.banner.title': 'मेरे कुत्ते ने तंबाकू/सिगरेट खाई: अब क्या करें',
  'emergency.ateTobacco.banner.subtitle': 'निकोटीन कुत्तों के लिए 20-100mg/kg पर अत्यधिक विषाक्त है। ई-लिक्विड उच्च सांद्रता के कारण विशेष रूप से खतरनाक है।',
  'emergency.ateTobacco.riskAssessment.headers.source': 'निकोटीन स्रोत',
  'emergency.ateTobacco.riskAssessment.headers.amount': 'मात्रा',
  'emergency.ateTobacco.riskAssessment.headers.riskLevel': 'जोखिम स्तर',
  'emergency.ateTobacco.riskAssessment.headers.actionRequired': 'आवश्यक कार्रवाई',
  'emergency.ateTobacco.science.content': 'निकोटीन एक एल्कलॉइड है जो स्वायत्त गैंग्लिया, न्यूरोमस्कुलर में निकोटिनिक एसिटाइलकोलाइन रिसेप्टर्स (nAChRs) से बंधता है',

  'emergency.ateMarijuana.breadcrumbLabel': 'मारिजुआना खाया',
  'emergency.ateMarijuana.meta.title': 'मेरे कुत्ते ने मारिजुआना/एडिबल्स खाए: आपातकालीन गाइड | petsMetrics',
  'emergency.ateMarijuana.article.headline': 'मेरे कुत्ते ने मारिजुआना/एडिबल्स खाए: आपातकालीन गाइड',
  'emergency.ateMarijuana.article.description': 'कुत्तों में THC विषाक्तता के लिए आपातकालीन गाइड: मारिजुआना एडिबल्स, लक्षण और उपचार।',
  'emergency.ateMarijuana.banner.severityLabel': 'खतरनाक — कैनबिस एडिबल्स अत्यधिक विषाक्त हैं',
  'emergency.ateMarijuana.banner.title': 'मेरे कुत्ते ने मारिजुआना/एडिबल्स खाए: अब क्या करें',
  'emergency.ateMarijuana.banner.subtitle': 'कुत्ते मनुष्यों की तुलना में THC के प्रति अधिक संवेदनशील होते हैं। एडिबल्स (गमी, ब्राउनी) उच्च सांद्रता के कारण विशेष रूप से खतरनाक हैं।',
  'emergency.ateMarijuana.honestySection.title': '📋 महत्वपूर्ण: अपने पशु चिकित्सक के साथ ईमानदार रहें',
  'emergency.ateMarijuana.honestySection.content': 'पशु चिकित्सक <strong>इलाज करने के लिए बाध्य हैं, रिपोर्ट करने के लिए नहीं</strong>, पालतू विषाक्तता की। मारिजुआना के बारे में सटीक जानकारी',
  'emergency.ateMarijuana.riskAssessment.headers.productType': 'उत्पाद प्रकार',

  'profile.wizard.step4NeuteredNo': 'नहीं',
  'vaccination.result.tableStatus': 'स्थिति',
  'catBcs.bcsOptions.5': 'आदर्श',
  'euTravel.documents.microchip': 'माइक्रोचिप (ISO 11784/11785)',
  'compare.microchipVsTattoo.topicAName': 'माइक्रोचिप',
  'emergency.atePlastic.toxicityData.source': 'मर्क पशु चिकित्सा मैनुअल, ASPCA',
};

// ============================================================
// Apply translations
// ============================================================

const langMap = {
  'zh': zhTranslations,
  'ar': arTranslations,
  'ru': ruTranslations,
  'ko': koTranslations,
  'ja': jaTranslations,
  'pt': ptTranslations,
  'es': esTranslations,
  'de': deTranslations,
  'nl': nlTranslations,
  'fr': frTranslations,
  'hi': hiTranslations,
};

let totalFixed = 0;
for (const [lang, translations] of Object.entries(langMap)) {
  const filePath = path.join(messagesDir, `${lang}.json`);
  const data = readJSON(filePath);
  const count = Object.keys(translations).length;
  
  for (const [key, value] of Object.entries(translations)) {
    setNested(data, key, value);
  }
  
  writeJSON(filePath, data);
  totalFixed += count;
  console.log(`${lang}.json: applied ${count} translations`);
}

console.log(`\nTotal translations applied: ${totalFixed}`);