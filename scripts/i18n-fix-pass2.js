// i18n-fix-pass2.js - Remove extra keys and add remaining translations for fr & hi
const fs = require('fs');
const path = require('path');

const messagesDir = 'd:/prj2/GitHub/petsMetrics/messages';

function readJSON(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, ''));
}
function writeJSON(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

function flatten(obj, prefix = '') {
  let result = {};
  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(result, flatten(value, newKey));
    } else {
      result[newKey] = value;
    }
  }
  return result;
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

function deleteNested(obj, dottedKey) {
  const parts = dottedKey.split('.');
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!current[parts[i]]) return;
    current = current[parts[i]];
  }
  delete current[parts[parts.length - 1]];
}

// Load en.json baseline
const enData = readJSON(path.join(messagesDir, 'en.json'));
const enFlat = flatten(enData);
const enKeySet = new Set(Object.keys(enFlat));

// Remove extra keys from fr, hi, nl
for (const file of ['fr.json', 'hi.json', 'nl.json']) {
  const filePath = path.join(messagesDir, file);
  const data = readJSON(filePath);
  const flat = flatten(data);
  const extra = Object.keys(flat).filter(k => !enKeySet.has(k));
  
  if (extra.length > 0) {
    for (const k of extra) {
      deleteNested(data, k);
    }
    writeJSON(filePath, data);
    console.log(`${file}: removed ${extra.length} extra keys`);
  }
}

// Now add remaining translations for fr
const frMore = {
  'common.senior': 'Senior',
  'common.intact': 'Intact',
  'dog.breedContent.breeds.labrador.name': 'Labrador Retriever',
  'dog.breedContent.breeds.goldenRetriever.name': 'Golden Retriever',
  'dog.guide.puppyDevelopment.aria': "Voir le guide des étapes de développement du chiot",
  'dog.guide.rescueDog.aria': "Voir le guide d'adoption d'un chien de refuge",
  'footer.contact': 'Contact',
  'dogAge.lifeStage.cardTitle': '{stage} — {stageName}',
  'dogAge.lifeStage.dental': 'Nettoyage dentaire régulier',
  'dogAge.lifeStage.healthPriorities': 'Priorités de santé pour cette étape de vie :',
  'dogAge.lifeStage.parasite': 'Continuer la prévention mensuelle des parasites',
  'dogAge.lifeStage.vetVisit': 'Visites vétérinaires annuelles',
  'dogAge.lifeStage.weight': 'Maintenir un poids santé (prévient l\'usure précoce des articulations)',
  'dogAge.scienceSection.aaGuidelines': 'Directives AAHA sur les étapes de vie',
  'dogAge.shareCta.copyLink': 'Copier le lien',
  'dogAge.title': "Calculateur d'âge canin",
  'dogAge.description': "Convertissez l'âge de votre chien en années humaines basé sur les directives AAHA.",
  'dogAge.form.weightLabel': 'Poids du chien',
  'dogAge.form.ageLabel': 'Âge du chien',
  'dogAge.form.ageYears': 'années',
  'dogAge.form.calculate': "Calculer l'âge humain",
  'dogAge.result.humanAge': 'Âge humain estimé',
  'dogAge.result.lifeStage': 'Étape de vie',
  'dogAge.result.notes': 'Notes',
  'dogAge.lifeStage.puppy': 'Chiot',
  'dogAge.lifeStage.youngAdult': 'Jeune adulte',
  'dogAge.lifeStage.matureAdult': 'Adulte mature',
  'dogAge.lifeStage.senior': 'Senior',
  'dogAge.lifeStage.geriatric': 'Gériatrique',
  'dogAge.lifeStage.puppyDesc': 'Croissance et développement rapides',
  'dogAge.lifeStage.youngAdultDesc': 'Pic de santé physique',
  'dogAge.lifeStage.matureAdultDesc': 'Maintien de la santé',
  'dogAge.lifeStage.seniorDesc': 'Début des changements liés à l\'âge',
  'dogAge.lifeStage.geriatricDesc': 'Nécessite des soins particuliers',
  'dogAge.scienceSection.title': 'La science derrière le calculateur',
  'dogAge.scienceSection.content': "Basé sur les directives de l'AAHA sur les étapes de vie canines.",
  'dogAge.faq.title': 'Questions fréquentes',
  'dogAge.faq.q1': 'Comment fonctionne le calculateur d\'âge canin ?',
  'dogAge.faq.a1': "Notre calculateur utilise les directives de l'AAHA pour estimer l'âge humain de votre chien.",
  'dogAge.faq.q2': 'Pourquoi les tailles de chien sont-elles importantes ?',
  'dogAge.faq.a2': 'Les petits chiens vivent généralement plus longtemps que les grands chiens.',
  'dogAge.faq.q3': 'Quelle est la précision ?',
  'dogAge.faq.a3': "Le calculateur fournit des estimations basées sur des moyennes de population.",
  'dogAge.relatedTools.title': 'Outils connexes',
  'dogAge.relatedTools.calorie': 'Calculateur de calories',
  'dogAge.relatedTools.puppyGrowth': 'Prédicteur de croissance du chiot',
  'dogAge.relatedTools.vaccination': 'Calendrier de vaccination',
  'dogAge.breedSelector.placeholder': 'Sélectionner la race',
  'dogAge.breedSelector.search': 'Rechercher une race...',
  'dogAge.breedSelector.noResults': 'Aucune race trouvée',
  'dogAge.breedSelector.allBreeds': 'Toutes les races',
  'dogAge.breedSelector.mixedBreed': 'Race mixte',
  
  // More breed content
  'dog.breedContent.breeds.labrador.age': 'Âge humain du Labrador',
  'dog.breedContent.breeds.labrador.growth': 'Courbe de croissance du Labrador',
  'dog.breedContent.breeds.labrador.weight': 'Guide de poids du Labrador',
  'dog.breedContent.breeds.labrador.lifespan': 'Espérance de vie du Labrador',
  'dog.breedContent.breeds.labrador.temperament': 'Tempérament du Labrador',
  'dog.breedContent.breeds.germanShepherd.name': 'Berger Allemand',
  'dog.breedContent.breeds.germanShepherd.age': 'Âge humain du Berger Allemand',
  'dog.breedContent.breeds.germanShepherd.growth': 'Courbe de croissance du Berger Allemand',
  'dog.breedContent.breeds.germanShepherd.weight': 'Guide de poids du Berger Allemand',
  'dog.breedContent.breeds.germanShepherd.lifespan': 'Espérance de vie du Berger Allemand',
  'dog.breedContent.breeds.germanShepherd.temperament': 'Tempérament du Berger Allemand',
  'dog.breedContent.breeds.frenchBulldog.name': 'Bouledogue Français',
  'dog.breedContent.breeds.frenchBulldog.age': 'Âge humain du Bouledogue Français',
  'dog.breedContent.breeds.frenchBulldog.growth': 'Courbe de croissance du Bouledogue Français',
  'dog.breedContent.breeds.frenchBulldog.weight': 'Guide de poids du Bouledogue Français',
  'dog.breedContent.breeds.frenchBulldog.lifespan': 'Espérance de vie du Bouledogue Français',
  'dog.breedContent.breeds.frenchBulldog.temperament': 'Tempérament du Bouledogue Français',
  'dog.breedContent.breeds.goldenRetriever.age': 'Âge humain du Golden Retriever',
  'dog.breedContent.breeds.goldenRetriever.growth': 'Courbe de croissance du Golden Retriever',
  'dog.breedContent.breeds.goldenRetriever.weight': 'Guide de poids du Golden Retriever',
  'dog.breedContent.breeds.goldenRetriever.lifespan': 'Espérance de vie du Golden Retriever',
  'dog.breedContent.breeds.goldenRetriever.temperament': 'Tempérament du Golden Retriever',
  
  // DogCalorie
  'dogCalorie.title': 'Calculateur de calories pour chien',
  'dogCalorie.description': "Calculez les besoins caloriques quotidiens de votre chien basés sur les directives AAFCO.",
  'dogCalorie.form.weightLabel': 'Poids du chien',
  'dogCalorie.form.activityLabel': "Niveau d'activité",
  'dogCalorie.form.neuteredLabel': 'Statut de stérilisation',
  'dogCalorie.form.calculate': 'Calculer les calories',
  'dogCalorie.result.dailyCalories': 'Calories quotidiennes',
  'dogCalorie.result.maintenance': 'Maintien',
  'dogCalorie.result.weightLoss': 'Perte de poids',
  'dogCalorie.result.weightGain': 'Gain de poids',
  'dogCalorie.scienceSection.title': 'La science',
  'dogCalorie.faq.title': 'FAQ',
  
  // PuppyGrowth
  'puppyGrowth.title': 'Prédicteur de croissance du chiot',
  'puppyGrowth.description': 'Estimez le poids adulte de votre chiot basé sur sa croissance actuelle.',
  'puppyGrowth.form.currentWeight': 'Poids actuel',
  'puppyGrowth.form.currentAge': 'Âge actuel',
  'puppyGrowth.form.breedSize': 'Taille de race',
  'puppyGrowth.form.calculate': 'Estimer le poids adulte',
  'puppyGrowth.result.estimatedAdultWeight': 'Poids adulte estimé',
  'puppyGrowth.result.growthChart': 'Courbe de croissance',
  'puppyGrowth.scienceSection.title': 'La science',
  'puppyGrowth.faq.title': 'FAQ',
  
  // CatAge
  'catAge.title': "Calculateur d'âge félin",
  'catAge.description': "Convertissez l'âge de votre chat en années humaines.",
  'catAge.form.ageLabel': 'Âge du chat',
  'catAge.form.calculate': "Calculer l'âge humain",
  'catAge.result.humanAge': 'Âge humain estimé',
  'catAge.result.lifeStage': 'Étape de vie',
  'catAge.lifeStage.kitten': 'Chaton',
  'catAge.lifeStage.junior': 'Junior',
  'catAge.lifeStage.prime': 'Prime',
  'catAge.lifeStage.mature': 'Mature',
  'catAge.lifeStage.senior': 'Senior',
  'catAge.lifeStage.geriatric': 'Gériatrique',
  'catAge.scienceSection.title': 'La science',
  'catAge.faq.title': 'FAQ',
  
  // CatBcs
  'catBcs.title': 'BCS et suivi de poids pour chat',
  'catBcs.description': "Évaluez la condition corporelle de votre chat et suivez son poids.",
  'catBcs.form.selectBcs': "Sélectionner le score BCS",
  'catBcs.form.currentWeight': 'Poids actuel',
  'catBcs.form.calculate': 'Analyser',
  'catBcs.result.idealWeight': 'Poids idéal',
  'catBcs.result.weightDiff': 'Différence de poids',
  'catBcs.result.recommendation': 'Recommandation',
  'catBcs.scienceSection.title': 'La science',
  'catBcs.faq.title': 'FAQ',
  
  // Gestation
  'gestation.title': 'Calculateur de gestation',
  'gestation.description': 'Estimez la date de mise bas de votre animal.',
  'gestation.form.matingDate': "Date d'accouplement",
  'gestation.form.calculate': 'Calculer la date de mise bas',
  'gestation.result.dueDate': 'Date prévue',
  'gestation.result.daysRemaining': 'Jours restants',
  'gestation.result.currentWeek': 'Semaine actuelle',
  'gestation.scienceSection.title': 'La science',
  'gestation.faq.title': 'FAQ',
  
  // Vaccination
  'vaccination.title': 'Calendrier de vaccination',
  'vaccination.description': 'Suivez le calendrier de vaccination de votre animal.',
  'vaccination.form.petType': "Type d'animal",
  'vaccination.form.calculate': 'Voir le calendrier',
  'vaccination.result.tableVaccine': 'Vaccin',
  'vaccination.result.tableAge': 'Âge',
  'vaccination.result.tableNotes': 'Notes',
  'vaccination.scienceSection.title': 'La science',
  'vaccination.faq.title': 'FAQ',
  
  // ToxicChecker
  'toxicChecker.title': 'Vérificateur de toxicité',
  'toxicChecker.description': 'Vérifiez si un aliment ou une plante est toxique pour votre animal.',
  'toxicChecker.form.search': 'Rechercher un élément...',
  'toxicChecker.form.calculate': 'Vérifier',
  'toxicChecker.result.toxic': 'Toxique',
  'toxicChecker.result.safe': 'Sans danger',
  'toxicChecker.result.symptoms': 'Symptômes',
  'toxicChecker.result.severity': 'Gravité',
  'toxicChecker.scienceSection.title': 'La science',
  'toxicChecker.faq.title': 'FAQ',
  
  // EU Travel
  'euTravel.title': 'Vérificateur de voyage UE pour animaux',
  'euTravel.description': 'Vérifiez les exigences de voyage pour votre animal dans l\'UE.',
  'euTravel.form.petType': "Type d'animal",
  'euTravel.form.calculate': 'Vérifier les exigences',
  'euTravel.result.requirements': 'Exigences',
  'euTravel.result.passport': 'Passeport',
  'euTravel.result.vaccination': 'Vaccination',
  'euTravel.result.microchip': 'Puce électronique',
  'euTravel.scienceSection.title': 'La science',
  'euTravel.faq.title': 'FAQ',
  
  // BARF
  'barf.title': 'Calculateur BARF',
  'barf.description': 'Calculez les portions de régime cru pour votre animal.',
  'barf.form.weight': 'Poids',
  'barf.form.calculate': 'Calculer les portions',
  'barf.result.dailyPortion': 'Portion quotidienne',
  'barf.result.meat': 'Viande',
  'barf.result.bone': 'Os',
  'barf.result.organ': 'Organes',
  'barf.result.vegetable': 'Légumes',
  'barf.scienceSection.title': 'La science',
  'barf.faq.title': 'FAQ',
  
  // Insurance
  'insurance.title': 'Estimateur d\'assurance pour animaux',
  'insurance.description': 'Estimez les coûts d\'assurance pour votre animal.',
  'insurance.form.petType': "Type d'animal",
  'insurance.form.breed': 'Race',
  'insurance.form.age': 'Âge',
  'insurance.form.calculate': 'Estimer le coût',
  'insurance.result.monthlyPremium': 'Prime mensuelle',
  'insurance.result.annualCost': 'Coût annuel',
  'insurance.result.coverage': 'Couverture',
  'insurance.scienceSection.title': 'La science',
  'insurance.faq.title': 'FAQ',
  
  // Profile
  'profile.title': 'Profil',
  'profile.description': 'Gérez vos profils d\'animaux.',
  'profile.wizard.title': 'Créer un profil d\'animal',
  'profile.wizard.step1': 'Nom',
  'profile.wizard.step2': 'Type',
  'profile.wizard.step3': 'Race',
  'profile.wizard.step4': 'Âge',
  'profile.wizard.step5': 'Poids',
  'profile.wizard.step4Neutered': 'Stérilisé ?',
  'profile.wizard.step4NeuteredYes': 'Oui',
  'profile.wizard.step4NeuteredNo': 'Non',
  'profile.wizard.save': 'Enregistrer',
  'profile.list.empty': 'Aucun profil. Créez votre premier profil d\'animal !',
  'profile.list.addNew': 'Ajouter un animal',
  'profile.breadcrumb.profile': 'Profil',
  
  // Seasonal Dangers
  'seasonal.title': 'Dangers saisonniers',
  'seasonal.description': 'Découvrez les dangers saisonniers pour votre animal.',
  'seasonal.spring': 'Printemps',
  'seasonal.summer': 'Été',
  'seasonal.autumn': 'Automne',
  'seasonal.winter': 'Hiver',
  
  // Home
  'home.featuredTool.emergencyPhone': 'Contrôle antipoison ASPCA : (888) 426-4435',
  'home.featuredTool.recentSearches': 'Récent :',
  'home.hero.title': 'Des outils scientifiques pour vos animaux de compagnie',
  'home.hero.subtitle': 'Calculateurs, guides et comparateurs gratuits basés sur les directives vétérinaires. Aucune inscription requise.',
  'home.hero.cta': 'Explorer les outils',
  'home.hero.cardPetName': 'Buddy',
  'home.featuredTool.title': 'Outils en vedette',
  'home.featuredTool.description': 'Nos outils les plus populaires pour les propriétaires d\'animaux.',
  'home.featuredTool.viewAll': 'Voir tous les outils',
  
  // About
  'about.title': 'À propos de petsMetrics',
  'about.description': 'Des outils scientifiques pour les propriétaires d\'animaux.',
  'about.mission': 'Notre mission',
  'about.missionText': 'Fournir des outils gratuits et basés sur la science pour aider les propriétaires à prendre des décisions éclairées.',
  'about.team': 'Équipe',
  'about.contact': 'Contact',
  
  // Terms
  'terms.title': 'Conditions d\'utilisation',
  'terms.lastUpdated': 'Dernière mise à jour',
  'terms.sections': 'Sections',
  
  // Privacy
  'privacy.title': 'Politique de confidentialité',
  'privacy.lastUpdated': 'Dernière mise à jour',
  'privacy.contact': 'Contact',
  
  // Compare: Dry vs Wet Food (Dog)
  'compare.dryVsWet.title': 'Croquettes vs nourriture humide pour chiens',
  'compare.dryVsWet.subtitle': 'Comparaison des croquettes et de la nourriture humide.',
  'compare.dryVsWet.topicAName': 'Croquettes',
  'compare.dryVsWet.topicBName': 'Nourriture humide',
  
  // Compare: Canned vs Frozen
  'compare.cannedVsFrozen.title': 'Nourriture en conserve vs surgelée pour chiens',
  'compare.cannedVsFrozen.subtitle': 'Comparaison de la nourriture en conserve et surgelée.',
  'compare.cannedVsFrozen.topicAName': 'Nourriture en conserve',
  'compare.cannedVsFrozen.topicBName': 'Nourriture surgelée',
  
  // Compare: Grain-Free vs Grain-Inclusive
  'compare.grainFreeVsGrainInclusive.title': 'Sans céréales vs avec céréales pour chiens',
  'compare.grainFreeVsGrainInclusive.subtitle': 'Comparaison des régimes sans céréales et avec céréales.',
  'compare.grainFreeVsGrainInclusive.topicAName': 'Sans céréales',
  'compare.grainFreeVsGrainInclusive.topicBName': 'Avec céréales',
  
  // Compare: Wet vs Dry (Cat)
  'compare.wetVsDry.title': 'Nourriture humide vs croquettes pour chats',
  'compare.wetVsDry.subtitle': 'Comparaison de la nourriture humide et des croquettes pour chats.',
  'compare.wetVsDry.topicAName': 'Nourriture humide',
  'compare.wetVsDry.topicBName': 'Croquettes',
  
  // Compare: Indoor vs Outdoor
  'compare.indoorVsOutdoor.title': 'Chat d\'intérieur vs d\'extérieur',
  'compare.indoorVsOutdoor.subtitle': 'Comparaison des modes de vie intérieur et extérieur pour les chats.',
  'compare.indoorVsOutdoor.topicAName': 'Chat d\'intérieur',
  'compare.indoorVsOutdoor.topicBName': 'Chat d\'extérieur',
  
  // Compare: Declawing vs Scratching Post
  'compare.declawingVsScratchingPost.title': 'Dé-griffage vs griffoir pour chats',
  'compare.declawingVsScratchingPost.subtitle': 'Comparaison du dé-griffage et des alternatives.',
  'compare.declawingVsScratchingPost.topicAName': 'Dé-griffage',
  'compare.declawingVsScratchingPost.topicBName': 'Griffoir',
  
  // Compare: Adopt vs Buy
  'compare.adoptVsBuy.title': 'Adopter vs acheter un animal',
  'compare.adoptVsBuy.subtitle': 'Comparaison de l\'adoption et de l\'achat d\'un animal.',
  'compare.adoptVsBuy.topicAName': 'Adopter',
  'compare.adoptVsBuy.topicBName': 'Acheter',
  
  // Compare: Dog Years vs Cat Years
  'compare.dogYearsVsCatYears.title': 'Années de chien vs années de chat',
  'compare.dogYearsVsCatYears.subtitle': 'Comparaison du vieillissement des chiens et des chats.',
  'compare.dogYearsVsCatYears.topicAName': 'Années de chien',
  'compare.dogYearsVsCatYears.topicBName': 'Années de chat',
  
  // Compare: Microchip vs Tattoo
  'compare.microchipVsTattoo.title': 'Puce électronique vs tatouage',
  'compare.microchipVsTattoo.subtitle': 'Comparaison des méthodes d\'identification des animaux.',
  'compare.microchipVsTattoo.topicAName': 'Puce électronique',
  'compare.microchipVsTattoo.topicBName': 'Tatouage',
  
  // Compare: Pet Insurance vs Savings
  'compare.petInsuranceVsSavings.title': 'Assurance animaux vs épargne',
  'compare.petInsuranceVsSavings.subtitle': 'Comparaison de l\'assurance et de l\'épargne pour animaux.',
  'compare.petInsuranceVsSavings.topicAName': 'Assurance animaux',
  'compare.petInsuranceVsSavings.topicBName': 'Épargne',
  
  // Emergency: Grapes
  'emergency.ateGrapes.breadcrumbLabel': 'A mangé des raisins',
  'emergency.ateGrapes.meta.title': 'Mon chien a mangé des raisins : Guide d\'urgence | petsMetrics',
  'emergency.ateGrapes.banner.severityLabel': 'EXTRÊMEMENT TOXIQUE — Insuffisance rénale',
  'emergency.ateGrapes.banner.title': 'Mon chien a mangé des raisins : Que faire maintenant',
  'emergency.ateGrapes.article.headline': 'Mon chien a mangé des raisins : Guide d\'urgence',
  'emergency.ateGrapes.article.description': 'Guide d\'urgence pour la toxicité des raisins chez les chiens.',
  
  // Emergency: Chocolate
  'emergency.ateChocolate.breadcrumbLabel': 'A mangé du chocolat',
  'emergency.ateChocolate.meta.title': 'Mon chien a mangé du chocolat : Guide d\'urgence | petsMetrics',
  'emergency.ateChocolate.banner.severityLabel': 'TOXIQUE — Action rapide requise',
  'emergency.ateChocolate.banner.title': 'Mon chien a mangé du chocolat : Que faire maintenant',
  'emergency.ateChocolate.article.headline': 'Mon chien a mangé du chocolat : Guide d\'urgence',
  'emergency.ateChocolate.article.description': 'Guide d\'urgence pour la toxicité du chocolat chez les chiens.',
  
  // Emergency: Onion (Dog)
  'emergency.ateOnion.breadcrumbLabel': 'A mangé de l\'oignon',
  'emergency.ateOnion.meta.title': 'Mon chien a mangé de l\'oignon : Guide d\'urgence | petsMetrics',
  'emergency.ateOnion.banner.severityLabel': 'TOXIQUE — Anémie hémolytique',
  'emergency.ateOnion.banner.title': 'Mon chien a mangé de l\'oignon : Que faire maintenant',
  'emergency.ateOnion.article.headline': 'Mon chien a mangé de l\'oignon : Guide d\'urgence',
  'emergency.ateOnion.article.description': 'Guide d\'urgence pour la toxicité de l\'oignon chez les chiens.',
  
  // Emergency: Xylitol
  'emergency.ateXylitol.breadcrumbLabel': 'A mangé du xylitol',
  'emergency.ateXylitol.meta.title': 'Mon chien a mangé du xylitol : Guide d\'urgence | petsMetrics',
  'emergency.ateXylitol.banner.severityLabel': 'EXTRÊMEMENT TOXIQUE — Insuffisance hépatique',
  'emergency.ateXylitol.banner.title': 'Mon chien a mangé du xylitol : Que faire maintenant',
  'emergency.ateXylitol.article.headline': 'Mon chien a mangé du xylitol : Guide d\'urgence',
  'emergency.ateXylitol.article.description': 'Guide d\'urgence pour la toxicité du xylitol chez les chiens.',
  
  // Emergency: Xylitol Gum
  'emergency.ateXylitolGum.breadcrumbLabel': 'A mangé du chewing-gum au xylitol',
  'emergency.ateXylitolGum.meta.title': 'Mon chien a mangé du chewing-gum : Guide d\'urgence | petsMetrics',
  'emergency.ateXylitolGum.banner.severityLabel': 'EXTRÊMEMENT TOXIQUE',
  'emergency.ateXylitolGum.banner.title': 'Mon chien a mangé du chewing-gum : Que faire maintenant',
  'emergency.ateXylitolGum.article.headline': 'Mon chien a mangé du chewing-gum : Guide d\'urgence',
  'emergency.ateXylitolGum.article.description': 'Guide d\'urgence pour le chewing-gum au xylitol chez les chiens.',
  
  // Emergency: Sock
  'emergency.ateSock.breadcrumbLabel': 'A mangé une chaussette',
  'emergency.ateSock.meta.title': 'Mon chien a mangé une chaussette : Guide d\'urgence | petsMetrics',
  'emergency.ateSock.banner.severityLabel': 'DANGEREUX — Obstruction intestinale',
  'emergency.ateSock.banner.title': 'Mon chien a mangé une chaussette : Que faire maintenant',
  'emergency.ateSock.article.headline': 'Mon chien a mangé une chaussette : Guide d\'urgence',
  'emergency.ateSock.article.description': 'Guide d\'urgence pour l\'ingestion de chaussette chez les chiens.',
  
  // Emergency: Antifreeze
  'emergency.ateAntifreeze.breadcrumbLabel': 'A bu de l\'antigel',
  'emergency.ateAntifreeze.meta.title': 'Mon chien a bu de l\'antigel : Guide d\'urgence | petsMetrics',
  'emergency.ateAntifreeze.banner.severityLabel': 'EXTRÊMEMENT TOXIQUE — Insuffisance rénale',
  'emergency.ateAntifreeze.banner.title': 'Mon chien a bu de l\'antigel : Que faire maintenant',
  'emergency.ateAntifreeze.article.headline': 'Mon chien a bu de l\'antigel : Guide d\'urgence',
  'emergency.ateAntifreeze.article.description': 'Guide d\'urgence pour la toxicité de l\'antigel chez les chiens.',
  
  // Cat Emergency: Lily
  'emergency.ateLily.breadcrumbLabel': 'A mangé du lys',
  'emergency.ateLily.meta.title': 'Mon chat a mangé un lys : Guide d\'urgence | petsMetrics',
  'emergency.ateLily.banner.severityLabel': 'EXTRÊMEMENT TOXIQUE — Insuffisance rénale',
  'emergency.ateLily.banner.title': 'Mon chat a mangé un lys : Que faire maintenant',
  'emergency.ateLily.article.headline': 'Mon chat a mangé un lys : Guide d\'urgence',
  'emergency.ateLily.article.description': 'Guide d\'urgence pour la toxicité du lys chez les chats.',
  
  // Cat Emergency: String
  'emergency.ateString.breadcrumbLabel': 'A mangé une ficelle',
  'emergency.ateString.meta.title': 'Mon chat a mangé une ficelle : Guide d\'urgence | petsMetrics',
  'emergency.ateString.banner.severityLabel': 'DANGEREUX — Corps étranger linéaire',
  'emergency.ateString.banner.title': 'Mon chat a mangé une ficelle : Que faire maintenant',
  'emergency.ateString.article.headline': 'Mon chat a mangé une ficelle : Guide d\'urgence',
  'emergency.ateString.article.description': 'Guide d\'urgence pour l\'ingestion de ficelle chez les chats.',
  
  // Cat Emergency: Fishing Line
  'emergency.ateFishingLine.breadcrumbLabel': 'A mangé du fil de pêche',
  'emergency.ateFishingLine.meta.title': 'Mon chat a mangé du fil de pêche : Guide d\'urgence | petsMetrics',
  'emergency.ateFishingLine.banner.severityLabel': 'DANGEREUX',
  'emergency.ateFishingLine.banner.title': 'Mon chat a mangé du fil de pêche : Que faire maintenant',
  'emergency.ateFishingLine.article.headline': 'Mon chat a mangé du fil de pêche : Guide d\'urgence',
  'emergency.ateFishingLine.article.description': 'Guide d\'urgence pour le fil de pêche chez les chats.',
  
  // Cat Emergency: Essential Oils
  'emergency.ateEssentialOils.breadcrumbLabel': 'A léché des huiles essentielles',
  'emergency.ateEssentialOils.meta.title': 'Mon chat a léché des huiles essentielles : Guide d\'urgence | petsMetrics',
  'emergency.ateEssentialOils.banner.severityLabel': 'TOXIQUE',
  'emergency.ateEssentialOils.banner.title': 'Mon chat a léché des huiles essentielles : Que faire maintenant',
  'emergency.ateEssentialOils.article.headline': 'Mon chat a léché des huiles essentielles : Guide d\'urgence',
  'emergency.ateEssentialOils.article.description': 'Guide d\'urgence pour les huiles essentielles chez les chats.',
  
  // Cat Emergency: Garlic
  'emergency.ateGarlic.breadcrumbLabel': 'A mangé de l\'ail',
  'emergency.ateGarlic.meta.title': 'Mon chat a mangé de l\'ail : Guide d\'urgence | petsMetrics',
  'emergency.ateGarlic.banner.severityLabel': 'TOXIQUE',
  'emergency.ateGarlic.banner.title': 'Mon chat a mangé de l\'ail : Que faire maintenant',
  'emergency.ateGarlic.article.headline': 'Mon chat a mangé de l\'ail : Guide d\'urgence',
  'emergency.ateGarlic.article.description': 'Guide d\'urgence pour la toxicité de l\'ail chez les chats.',
  
  // Cat Emergency: Onion
  'emergency.ateOnionCat.breadcrumbLabel': 'A mangé de l\'oignon',
  'emergency.ateOnionCat.meta.title': 'Mon chat a mangé de l\'oignon : Guide d\'urgence | petsMetrics',
  'emergency.ateOnionCat.banner.severityLabel': 'TOXIQUE',
  'emergency.ateOnionCat.banner.title': 'Mon chat a mangé de l\'oignon : Que faire maintenant',
  'emergency.ateOnionCat.article.headline': 'Mon chat a mangé de l\'oignon : Guide d\'urgence',
  'emergency.ateOnionCat.article.description': 'Guide d\'urgence pour l\'oignon chez les chats.',
  
  // Cat Emergency: Chocolate
  'emergency.ateChocolateCat.breadcrumbLabel': 'A mangé du chocolat',
  'emergency.ateChocolateCat.meta.title': 'Mon chat a mangé du chocolat : Guide d\'urgence | petsMetrics',
  'emergency.ateChocolateCat.banner.severityLabel': 'TOXIQUE',
  'emergency.ateChocolateCat.banner.title': 'Mon chat a mangé du chocolat : Que faire maintenant',
  'emergency.ateChocolateCat.article.headline': 'Mon chat a mangé du chocolat : Guide d\'urgence',
  'emergency.ateChocolateCat.article.description': 'Guide d\'urgence pour le chocolat chez les chats.',
  
  // Seasonal: Christmas
  'seasonal.christmas.title': 'Aliments de Noël dangereux pour les chiens',
  'seasonal.christmas.description': 'Découvrez quels aliments de Noël sont dangereux pour votre chien.',
  
  // Seasonal: Thanksgiving
  'seasonal.thanksgiving.title': 'Aliments de Thanksgiving dangereux pour les chiens',
  'seasonal.thanksgiving.description': 'Découvrez quels aliments de Thanksgiving sont dangereux pour votre chien.',
  
  // Seasonal: Halloween
  'seasonal.halloween.title': 'Bonbons d\'Halloween dangereux pour les chiens',
  'seasonal.halloween.description': 'Découvrez quels bonbons d\'Halloween sont dangereux pour votre chien.',
  
  // Seasonal: Easter
  'seasonal.easter.title': 'Chocolat de Pâques dangereux pour les chiens',
  'seasonal.easter.description': 'Découvrez pourquoi le chocolat de Pâques est dangereux pour votre chien.',
  
  // Seasonal: Summer Heat
  'seasonal.summerHeat.title': 'Sécurité estivale pour les chiens',
  'seasonal.summerHeat.description': 'Protégez votre chien de la chaleur estivale.',
  
  // Seasonal: Winter Paw Care
  'seasonal.winterPaw.title': 'Soins des pattes en hiver pour chiens',
  'seasonal.winterPaw.description': 'Protégez les pattes de votre chien en hiver.',
  
  // Seasonal: Fireworks
  'seasonal.fireworks.title': 'Anxiété des feux d\'artifice chez les chiens',
  'seasonal.fireworks.description': 'Aidez votre chien à faire face à l\'anxiété des feux d\'artifice.',
  
  // Seasonal: Spring Allergies
  'seasonal.springAllergies.title': 'Allergies printanières chez les chiens',
  'seasonal.springAllergies.description': 'Gérez les allergies printanières de votre chien.',
  
  // FAQ pages
  'dog.faq.aging.title': 'FAQ sur le vieillissement canin',
  'dog.faq.health.title': 'FAQ sur la santé canine',
  'dog.faq.nutrition.title': 'FAQ sur la nutrition canine',
  'cat.faq.aging.title': 'FAQ sur le vieillissement félin',
  'cat.faq.health.title': 'FAQ sur la santé féline',
  'cat.faq.nutrition.title': 'FAQ sur la nutrition féline',
  
  // Dog/Cat hub pages
  'dog.page.title': 'Outils pour chien',
  'dog.page.description': 'Calculateurs et guides basés sur la science pour votre chien.',
  'cat.page.title': 'Outils pour chat',
  'cat.page.description': 'Calculateurs et guides basés sur la science pour votre chat.',
  
  // Shared page
  'shared.page.title': 'Outils pour animaux',
  'shared.page.description': 'Outils pour tous les animaux de compagnie.',
  
  // Index page
  'index.title': 'petsMetrics — Des outils scientifiques pour vos animaux',
  'index.description': 'Calculateurs, guides et comparateurs gratuits pour propriétaires de chiens et de chats.',
};

// Add remaining translations for hi
const hiMore = {
  'common.notFound.title': '404',
  'home.featuredTool.emergencyPhone': 'ASPCA विष नियंत्रण: (888) 426-4435',
  'dog.toolGrid.rating': 'P0',
  'dog.toolGrid.priority': 'P1',
  'dog.breedContent.breeds.labrador.age': 'लैब्राडोर मानव आयु',
  'dog.breedContent.breeds.labrador.growth': 'लैब्राडोर पिल्ला विकास चार्ट',
  'dog.breedContent.breeds.labrador.weight': 'लैब्राडोर वजन गाइड',
  'dog.breedContent.breeds.labrador.lifespan': 'लैब्राडोर जीवनकाल',
  'dog.breedContent.breeds.labrador.temperament': 'लैब्राडोर स्वभाव',
  'dog.breedContent.breeds.germanShepherd.name': 'जर्मन शेफर्ड',
  'dog.breedContent.breeds.germanShepherd.age': 'जर्मन शेफर्ड मानव आयु',
  'dog.breedContent.breeds.germanShepherd.growth': 'जर्मन शेफर्ड पिल्ला विकास चार्ट',
  'dog.breedContent.breeds.germanShepherd.weight': 'जर्मन शेफर्ड वजन गाइड',
  'dog.breedContent.breeds.germanShepherd.lifespan': 'जर्मन शेफर्ड जीवनकाल',
  'dog.breedContent.breeds.germanShepherd.temperament': 'जर्मन शेफर्ड स्वभाव',
  'dog.breedContent.breeds.frenchBulldog.name': 'फ्रेंच बुलडॉग',
  'dog.breedContent.breeds.frenchBulldog.age': 'फ्रेंच बुलडॉग मानव आयु',
  'dog.breedContent.breeds.frenchBulldog.growth': 'फ्रेंच बुलडॉग पिल्ला विकास चार्ट',
  'dog.breedContent.breeds.frenchBulldog.weight': 'फ्रेंच बुलडॉग वजन गाइड',
  'dog.breedContent.breeds.frenchBulldog.lifespan': 'फ्रेंच बुलडॉग जीवनकाल',
  'dog.breedContent.breeds.frenchBulldog.temperament': 'फ्रेंच बुलडॉग स्वभाव',
  'dog.breedContent.breeds.goldenRetriever.age': 'गोल्डन रिट्रीवर आयु कैलकुलेटर',
  'dog.breedContent.breeds.goldenRetriever.growth': 'गोल्डन रिट्रीवर पिल्ला विकास चार्ट',
  'dog.breedContent.breeds.goldenRetriever.weight': 'गोल्डन रिट्रीवर वजन गाइड',
  'dog.breedContent.breeds.goldenRetriever.lifespan': 'गोल्डन रिट्रीवर जीवनकाल',
  'dog.breedContent.breeds.goldenRetriever.temperament': 'गोल्डन रिट्रीवर स्वभाव',
  'cat.toolGrid.rating': 'P0',
  'cat.toolGrid.priority': 'P1',
  'header.logoAlt': 'petsMetrics',
  'dogAge.lifeStage.cardTitle': '{stage} — {stageName}',
  'dogAge.lifeStage.dental': 'नियमित दंत सफाई',
  'dogAge.lifeStage.healthPriorities': 'इस जीवन चरण के लिए स्वास्थ्य प्राथमिकताएं:',
  'dogAge.lifeStage.parasite': 'मासिक परजीवी रोकथाम जारी रखें',
  'dogAge.lifeStage.vetVisit': 'वार्षिक पशु चिकित्सक जांच',
  'dogAge.lifeStage.weight': 'स्वस्थ वजन बनाए रखें (जोड़ों के जल्दी घिसाव को रोकता है)',
  'dogAge.scienceSection.aaGuidelines': 'AAHA जीवन चरण दिशानिर्देश',
  'dogAge.shareCta.copyLink': 'लिंक कॉपी करें',
  'dogAge.title': 'कुत्ते की आयु कैलकुलेटर',
  'dogAge.description': 'AAHA दिशानिर्देशों के आधार पर अपने कुत्ते की आयु को मानव वर्षों में बदलें।',
  'dogAge.form.weightLabel': 'कुत्ते का वजन',
  'dogAge.form.ageLabel': 'कुत्ते की आयु',
  'dogAge.form.ageYears': 'वर्ष',
  'dogAge.form.monthsOptional': 'प्लस (वैकल्पिक):',
  'dogAge.form.calculate': 'मानव आयु की गणना करें',
  'dogAge.result.humanAge': 'अनुमानित मानव आयु',
  'dogAge.result.lifeStage': 'जीवन चरण',
  'dogAge.result.notes': 'नोट्स',
  'dogAge.lifeStage.puppy': 'पिल्ला',
  'dogAge.lifeStage.youngAdult': 'युवा वयस्क',
  'dogAge.lifeStage.matureAdult': 'परिपक्व वयस्क',
  'dogAge.lifeStage.senior': 'वरिष्ठ',
  'dogAge.lifeStage.geriatric': 'वृद्ध',
  'dogAge.lifeStage.puppyDesc': 'तेजी से वृद्धि और विकास',
  'dogAge.lifeStage.youngAdultDesc': 'शारीरिक स्वास्थ्य का चरम',
  'dogAge.lifeStage.matureAdultDesc': 'स्वास्थ्य रखरखाव',
  'dogAge.lifeStage.seniorDesc': 'आयु-संबंधित परिवर्तनों की शुरुआत',
  'dogAge.lifeStage.geriatricDesc': 'विशेष देखभाल की आवश्यकता',
  'dogAge.scienceSection.title': 'कैलकुलेटर के पीछे का विज्ञान',
  'dogAge.scienceSection.content': 'AAHA कैनाइन जीवन चरण दिशानिर्देशों पर आधारित।',
  'dogAge.faq.title': 'अक्सर पूछे जाने वाले प्रश्न',
  'dogAge.faq.q1': 'कुत्ते की आयु कैलकुलेटर कैसे काम करता है?',
  'dogAge.faq.a1': 'हमारा कैलकुलेटर आपके कुत्ते की मानव आयु का अनुमान लगाने के लिए AAHA दिशानिर्देशों का उपयोग करता है।',
  'dogAge.faq.q2': 'कुत्ते के आकार क्यों मायने रखते हैं?',
  'dogAge.faq.a2': 'छोटे कुत्ते आमतौर पर बड़े कुत्तों की तुलना में अधिक समय तक जीवित रहते हैं।',
  'dogAge.faq.q3': 'यह कितना सटीक है?',
  'dogAge.faq.a3': 'कैलकुलेटर जनसंख्या औसत पर आधारित अनुमान प्रदान करता है।',
  'dogAge.relatedTools.title': 'संबंधित उपकरण',
  'dogAge.relatedTools.calorie': 'कैलोरी कैलकुलेटर',
  'dogAge.relatedTools.puppyGrowth': 'पिल्ला विकास भविष्यवक्ता',
  'dogAge.relatedTools.vaccination': 'टीकाकरण कार्यक्रम',
  'dogAge.breedSelector.placeholder': 'नस्ल चुनें',
  'dogAge.breedSelector.search': 'नस्ल खोजें...',
  'dogAge.breedSelector.noResults': 'कोई नस्ल नहीं मिली',
  'dogAge.breedSelector.allBreeds': 'सभी नस्लें',
  'dogAge.breedSelector.mixedBreed': 'मिश्रित नस्ल',
  
  'dogCalorie.title': 'कुत्ता कैलोरी कैलकुलेटर',
  'dogCalorie.description': 'AAFCO दिशानिर्देशों के आधार पर अपने कुत्ते की दैनिक कैलोरी आवश्यकताओं की गणना करें।',
  'dogCalorie.form.weightLabel': 'कुत्ते का वजन',
  'dogCalorie.form.activityLabel': 'गतिविधि स्तर',
  'dogCalorie.form.neuteredLabel': 'बंध्याकरण स्थिति',
  'dogCalorie.form.calculate': 'कैलोरी की गणना करें',
  'dogCalorie.result.dailyCalories': 'दैनिक कैलोरी',
  'dogCalorie.result.maintenance': 'रखरखाव',
  'dogCalorie.result.weightLoss': 'वजन घटाना',
  'dogCalorie.result.weightGain': 'वजन बढ़ाना',
  'dogCalorie.scienceSection.title': 'विज्ञान',
  'dogCalorie.faq.title': 'सामान्य प्रश्न',
  
  'puppyGrowth.title': 'पिल्ला विकास भविष्यवक्ता',
  'puppyGrowth.description': 'वर्तमान विकास के आधार पर अपने पिल्ले के वयस्क वजन का अनुमान लगाएं।',
  'puppyGrowth.form.currentWeight': 'वर्तमान वजन',
  'puppyGrowth.form.currentAge': 'वर्तमान आयु',
  'puppyGrowth.form.breedSize': 'नस्ल का आकार',
  'puppyGrowth.form.calculate': 'वयस्क वजन का अनुमान लगाएं',
  'puppyGrowth.result.estimatedAdultWeight': 'अनुमानित वयस्क वजन',
  'puppyGrowth.result.growthChart': 'विकास चार्ट',
  'puppyGrowth.scienceSection.title': 'विज्ञान',
  'puppyGrowth.faq.title': 'सामान्य प्रश्न',
  
  'catAge.title': 'बिल्ली की आयु कैलकुलेटर',
  'catAge.description': 'अपनी बिल्ली की आयु को मानव वर्षों में बदलें।',
  'catAge.form.ageLabel': 'बिल्ली की आयु',
  'catAge.form.calculate': 'मानव आयु की गणना करें',
  'catAge.result.humanAge': 'अनुमानित मानव आयु',
  'catAge.result.lifeStage': 'जीवन चरण',
  'catAge.lifeStage.kitten': 'बिल्ली का बच्चा',
  'catAge.lifeStage.junior': 'जूनियर',
  'catAge.lifeStage.prime': 'प्राइम',
  'catAge.lifeStage.mature': 'परिपक्व',
  'catAge.lifeStage.senior': 'वरिष्ठ',
  'catAge.lifeStage.geriatric': 'वृद्ध',
  'catAge.scienceSection.title': 'विज्ञान',
  'catAge.faq.title': 'सामान्य प्रश्न',
  
  'catBcs.title': 'बिल्ली BCS और वजन ट्रैकर',
  'catBcs.description': 'अपनी बिल्ली की शारीरिक स्थिति का आकलन करें और वजन ट्रैक करें।',
  'catBcs.form.selectBcs': 'BCS स्कोर चुनें',
  'catBcs.form.currentWeight': 'वर्तमान वजन',
  'catBcs.form.calculate': 'विश्लेषण करें',
  'catBcs.result.idealWeight': 'आदर्श वजन',
  'catBcs.result.weightDiff': 'वजन अंतर',
  'catBcs.result.recommendation': 'सिफारिश',
  'catBcs.scienceSection.title': 'विज्ञान',
  'catBcs.faq.title': 'सामान्य प्रश्न',
  
  'gestation.title': 'गर्भावस्था कैलकुलेटर',
  'gestation.description': 'अपने पालतू की प्रसव तिथि का अनुमान लगाएं।',
  'gestation.form.matingDate': 'संभोग तिथि',
  'gestation.form.calculate': 'प्रसव तिथि की गणना करें',
  'gestation.result.dueDate': 'अनुमानित तिथि',
  'gestation.result.daysRemaining': 'शेष दिन',
  'gestation.result.currentWeek': 'वर्तमान सप्ताह',
  'gestation.scienceSection.title': 'विज्ञान',
  'gestation.faq.title': 'सामान्य प्रश्न',
  
  'vaccination.title': 'टीकाकरण कार्यक्रम',
  'vaccination.description': 'अपने पालतू के टीकाकरण कार्यक्रम को ट्रैक करें।',
  'vaccination.form.petType': 'पालतू प्रकार',
  'vaccination.form.calculate': 'कार्यक्रम देखें',
  'vaccination.result.tableVaccine': 'टीका',
  'vaccination.result.tableAge': 'आयु',
  'vaccination.result.tableNotes': 'नोट्स',
  'vaccination.scienceSection.title': 'विज्ञान',
  'vaccination.faq.title': 'सामान्य प्रश्न',
  
  'toxicChecker.title': 'विषाक्तता जांचकर्ता',
  'toxicChecker.description': 'जांचें कि कोई भोजन या पौधा आपके पालतू के लिए विषाक्त है या नहीं।',
  'toxicChecker.form.search': 'आइटम खोजें...',
  'toxicChecker.form.calculate': 'जांचें',
  'toxicChecker.result.toxic': 'विषाक्त',
  'toxicChecker.result.safe': 'सुरक्षित',
  'toxicChecker.result.symptoms': 'लक्षण',
  'toxicChecker.result.severity': 'गंभीरता',
  'toxicChecker.scienceSection.title': 'विज्ञान',
  'toxicChecker.faq.title': 'सामान्य प्रश्न',
  
  'euTravel.title': 'EU पालतू यात्रा जांचकर्ता',
  'euTravel.description': 'EU में अपने पालतू के लिए यात्रा आवश्यकताओं की जांच करें।',
  'euTravel.form.petType': 'पालतू प्रकार',
  'euTravel.form.calculate': 'आवश्यकताएं जांचें',
  'euTravel.result.requirements': 'आवश्यकताएं',
  'euTravel.result.passport': 'पासपोर्ट',
  'euTravel.result.vaccination': 'टीकाकरण',
  'euTravel.result.microchip': 'माइक्रोचिप',
  'euTravel.scienceSection.title': 'विज्ञान',
  'euTravel.faq.title': 'सामान्य प्रश्न',
  
  'barf.title': 'BARF कैलकुलेटर',
  'barf.description': 'अपने पालतू के लिए कच्चे आहार के हिस्से की गणना करें।',
  'barf.form.weight': 'वजन',
  'barf.form.calculate': 'हिस्से की गणना करें',
  'barf.result.dailyPortion': 'दैनिक हिस्सा',
  'barf.result.meat': 'मांस',
  'barf.result.bone': 'हड्डी',
  'barf.result.organ': 'अंग',
  'barf.result.vegetable': 'सब्जियां',
  'barf.scienceSection.title': 'विज्ञान',
  'barf.faq.title': 'सामान्य प्रश्न',
  
  'insurance.title': 'पालतू बीमा अनुमानक',
  'insurance.description': 'अपने पालतू के लिए बीमा लागत का अनुमान लगाएं।',
  'insurance.form.petType': 'पालतू प्रकार',
  'insurance.form.breed': 'नस्ल',
  'insurance.form.age': 'आयु',
  'insurance.form.calculate': 'लागत का अनुमान लगाएं',
  'insurance.result.monthlyPremium': 'मासिक प्रीमियम',
  'insurance.result.annualCost': 'वार्षिक लागत',
  'insurance.result.coverage': 'कवरेज',
  'insurance.scienceSection.title': 'विज्ञान',
  'insurance.faq.title': 'सामान्य प्रश्न',
  
  'profile.title': 'प्रोफ़ाइल',
  'profile.description': 'अपने पालतू प्रोफाइल प्रबंधित करें।',
  'profile.wizard.title': 'पालतू प्रोफ़ाइल बनाएं',
  'profile.wizard.step1': 'नाम',
  'profile.wizard.step2': 'प्रकार',
  'profile.wizard.step3': 'नस्ल',
  'profile.wizard.step4': 'आयु',
  'profile.wizard.step5': 'वजन',
  'profile.wizard.step4Neutered': 'बंध्याकृत?',
  'profile.wizard.step4NeuteredYes': 'हाँ',
  'profile.wizard.step4NeuteredNo': 'नहीं',
  'profile.wizard.save': 'सहेजें',
  'profile.list.empty': 'कोई प्रोफ़ाइल नहीं। अपना पहला पालतू प्रोफ़ाइल बनाएं!',
  'profile.list.addNew': 'पालतू जोड़ें',
  'profile.breadcrumb.profile': 'प्रोफ़ाइल',
  'profile.breadcrumb.home': 'होम',
  
  'home.featuredTool.recentSearches': 'हालिया:',
  'home.hero.title': 'आपके पालतू जानवरों के लिए विज्ञान-आधारित उपकरण',
  'home.hero.subtitle': 'पशु चिकित्सा दिशानिर्देशों पर आधारित मुफ्त कैलकुलेटर, गाइड और तुलना। कोई साइन-अप आवश्यक नहीं।',
  'home.hero.cta': 'उपकरण खोजें',
  'home.hero.cardPetName': 'बडी',
  'home.featuredTool.title': 'विशेष उपकरण',
  'home.featuredTool.description': 'पालतू मालिकों के लिए हमारे सबसे लोकप्रिय उपकरण।',
  'home.featuredTool.viewAll': 'सभी उपकरण देखें',
  
  'about.title': 'petsMetrics के बारे में',
  'about.description': 'पालतू मालिकों के लिए विज्ञान-आधारित उपकरण।',
  'about.mission': 'हमारा मिशन',
  'about.missionText': 'पालतू मालिकों को सूचित निर्णय लेने में मदद करने के लिए मुफ्त, विज्ञान-आधारित उपकरण प्रदान करना।',
  'about.team': 'टीम',
  'about.contact': 'संपर्क',
  
  'terms.title': 'उपयोग की शर्तें',
  'terms.lastUpdated': 'अंतिम अद्यतन',
  'terms.sections': 'अनुभाग',
  
  'privacy.title': 'गोपनीयता नीति',
  'privacy.lastUpdated': 'अंतिम अद्यतन',
  'privacy.contact': 'संपर्क',
  
  'compare.dryVsWet.title': 'सूखा बनाम गीला कुत्ते का भोजन',
  'compare.dryVsWet.subtitle': 'सूखे और गीले कुत्ते के भोजन की तुलना।',
  'compare.dryVsWet.topicAName': 'सूखा भोजन',
  'compare.dryVsWet.topicBName': 'गीला भोजन',
  
  'compare.cannedVsFrozen.title': 'डिब्बाबंद बनाम जमा हुआ कुत्ते का भोजन',
  'compare.cannedVsFrozen.subtitle': 'डिब्बाबंद और जमे हुए कुत्ते के भोजन की तुलना।',
  'compare.cannedVsFrozen.topicAName': 'डिब्बाबंद भोजन',
  'compare.cannedVsFrozen.topicBName': 'जमा हुआ भोजन',
  
  'compare.grainFreeVsGrainInclusive.title': 'अनाज-मुक्त बनाम अनाज-युक्त कुत्ते का भोजन',
  'compare.grainFreeVsGrainInclusive.subtitle': 'अनाज-मुक्त और अनाज-युक्त आहार की तुलना।',
  'compare.grainFreeVsGrainInclusive.topicAName': 'अनाज-मुक्त',
  'compare.grainFreeVsGrainInclusive.topicBName': 'अनाज-युक्त',
  
  'compare.wetVsDry.title': 'गीला बनाम सूखा बिल्ली का भोजन',
  'compare.wetVsDry.subtitle': 'बिल्लियों के लिए गीले और सूखे भोजन की तुलना।',
  'compare.wetVsDry.topicAName': 'गीला भोजन',
  'compare.wetVsDry.topicBName': 'सूखा भोजन',
  
  'compare.indoorVsOutdoor.title': 'इनडोर बनाम आउटडोर बिल्ली',
  'compare.indoorVsOutdoor.subtitle': 'बिल्लियों के लिए इनडोर और आउटडोर जीवनशैली की तुलना।',
  'compare.indoorVsOutdoor.topicAName': 'इनडोर बिल्ली',
  'compare.indoorVsOutdoor.topicBName': 'आउटडोर बिल्ली',
  
  'compare.declawingVsScratchingPost.title': 'डीक्लॉइंग बनाम स्क्रैचिंग पोस्ट',
  'compare.declawingVsScratchingPost.subtitle': 'डीक्लॉइंग और विकल्पों की तुलना।',
  'compare.declawingVsScratchingPost.topicAName': 'डीक्लॉइंग',
  'compare.declawingVsScratchingPost.topicBName': 'स्क्रैचिंग पोस्ट',
  
  'compare.adoptVsBuy.title': 'गोद लेना बनाम खरीदना',
  'compare.adoptVsBuy.subtitle': 'पालतू जानवर को गोद लेने और खरीदने की तुलना।',
  'compare.adoptVsBuy.topicAName': 'गोद लें',
  'compare.adoptVsBuy.topicBName': 'खरीदें',
  
  'compare.dogYearsVsCatYears.title': 'कुत्ते के वर्ष बनाम बिल्ली के वर्ष',
  'compare.dogYearsVsCatYears.subtitle': 'कुत्तों और बिल्लियों की उम्र बढ़ने की तुलना।',
  'compare.dogYearsVsCatYears.topicAName': 'कुत्ते के वर्ष',
  'compare.dogYearsVsCatYears.topicBName': 'बिल्ली के वर्ष',
  
  'compare.microchipVsTattoo.title': 'माइक्रोचिप बनाम टैटू',
  'compare.microchipVsTattoo.subtitle': 'पालतू पहचान विधियों की तुलना।',
  'compare.microchipVsTattoo.topicAName': 'माइक्रोचिप',
  'compare.microchipVsTattoo.topicBName': 'टैटू',
  
  'compare.petInsuranceVsSavings.title': 'पालतू बीमा बनाम बचत',
  'compare.petInsuranceVsSavings.subtitle': 'पालतू बीमा और बचत की तुलना।',
  'compare.petInsuranceVsSavings.topicAName': 'पालतू बीमा',
  'compare.petInsuranceVsSavings.topicBName': 'बचत',
  
  'emergency.ateGrapes.breadcrumbLabel': 'अंगूर खाए',
  'emergency.ateGrapes.meta.title': 'मेरे कुत्ते ने अंगूर खाए: आपातकालीन गाइड | petsMetrics',
  'emergency.ateGrapes.banner.severityLabel': 'अत्यधिक विषाक्त — गुर्दे की विफलता',
  'emergency.ateGrapes.banner.title': 'मेरे कुत्ते ने अंगूर खाए: अब क्या करें',
  'emergency.ateGrapes.article.headline': 'मेरे कुत्ते ने अंगूर खाए: आपातकालीन गाइड',
  'emergency.ateGrapes.article.description': 'कुत्तों में अंगूर विषाक्तता के लिए आपातकालीन गाइड।',
  
  'emergency.ateChocolate.breadcrumbLabel': 'चॉकलेट खाई',
  'emergency.ateChocolate.meta.title': 'मेरे कुत्ते ने चॉकलेट खाई: आपातकालीन गाइड | petsMetrics',
  'emergency.ateChocolate.banner.severityLabel': 'विषाक्त — तीव्र कार्रवाई आवश्यक',
  'emergency.ateChocolate.banner.title': 'मेरे कुत्ते ने चॉकलेट खाई: अब क्या करें',
  'emergency.ateChocolate.article.headline': 'मेरे कुत्ते ने चॉकलेट खाई: आपातकालीन गाइड',
  'emergency.ateChocolate.article.description': 'कुत्तों में चॉकलेट विषाक्तता के लिए आपातकालीन गाइड।',
  
  'emergency.ateOnion.breadcrumbLabel': 'प्याज खाया',
  'emergency.ateOnion.meta.title': 'मेरे कुत्ते ने प्याज खाया: आपातकालीन गाइड | petsMetrics',
  'emergency.ateOnion.banner.severityLabel': 'विषाक्त — हीमोलिटिक एनीमिया',
  'emergency.ateOnion.banner.title': 'मेरे कुत्ते ने प्याज खाया: अब क्या करें',
  'emergency.ateOnion.article.headline': 'मेरे कुत्ते ने प्याज खाया: आपातकालीन गाइड',
  'emergency.ateOnion.article.description': 'कुत्तों में प्याज विषाक्तता के लिए आपातकालीन गाइड।',
  
  'emergency.ateXylitol.breadcrumbLabel': 'जाइलिटोल खाया',
  'emergency.ateXylitol.meta.title': 'मेरे कुत्ते ने जाइलिटोल खाया: आपातकालीन गाइड | petsMetrics',
  'emergency.ateXylitol.banner.severityLabel': 'अत्यधिक विषाक्त — यकृत विफलता',
  'emergency.ateXylitol.banner.title': 'मेरे कुत्ते ने जाइलिटोल खाया: अब क्या करें',
  'emergency.ateXylitol.article.headline': 'मेरे कुत्ते ने जाइलिटोल खाया: आपातकालीन गाइड',
  'emergency.ateXylitol.article.description': 'कुत्तों में जाइलिटोल विषाक्तता के लिए आपातकालीन गाइड।',
  
  'emergency.ateXylitolGum.breadcrumbLabel': 'जाइलिटोल गम खाया',
  'emergency.ateXylitolGum.meta.title': 'मेरे कुत्ते ने च्यूइंग गम खाया: आपातकालीन गाइड | petsMetrics',
  'emergency.ateXylitolGum.banner.severityLabel': 'अत्यधिक विषाक्त',
  'emergency.ateXylitolGum.banner.title': 'मेरे कुत्ते ने च्यूइंग गम खाया: अब क्या करें',
  'emergency.ateXylitolGum.article.headline': 'मेरे कुत्ते ने च्यूइंग गम खाया: आपातकालीन गाइड',
  'emergency.ateXylitolGum.article.description': 'कुत्तों में जाइलिटोल गम के लिए आपातकालीन गाइड।',
  
  'emergency.ateSock.breadcrumbLabel': 'मोजा खाया',
  'emergency.ateSock.meta.title': 'मेरे कुत्ते ने मोजा खाया: आपातकालीन गाइड | petsMetrics',
  'emergency.ateSock.banner.severityLabel': 'खतरनाक — आंतों का अवरोध',
  'emergency.ateSock.banner.title': 'मेरे कुत्ते ने मोजा खाया: अब क्या करें',
  'emergency.ateSock.article.headline': 'मेरे कुत्ते ने मोजा खाया: आपातकालीन गाइड',
  'emergency.ateSock.article.description': 'कुत्तों में मोजा सेवन के लिए आपातकालीन गाइड।',
  
  'emergency.ateAntifreeze.breadcrumbLabel': 'एंटीफ्रीज पिया',
  'emergency.ateAntifreeze.meta.title': 'मेरे कुत्ते ने एंटीफ्रीज पिया: आपातकालीन गाइड | petsMetrics',
  'emergency.ateAntifreeze.banner.severityLabel': 'अत्यधिक विषाक्त — गुर्दे की विफलता',
  'emergency.ateAntifreeze.banner.title': 'मेरे कुत्ते ने एंटीफ्रीज पिया: अब क्या करें',
  'emergency.ateAntifreeze.article.headline': 'मेरे कुत्ते ने एंटीफ्रीज पिया: आपातकालीन गाइड',
  'emergency.ateAntifreeze.article.description': 'कुत्तों में एंटीफ्रीज विषाक्तता के लिए आपातकालीन गाइड।',
  
  'emergency.ateLily.breadcrumbLabel': 'लिली खाई',
  'emergency.ateLily.meta.title': 'मेरी बिल्ली ने लिली खाई: आपातकालीन गाइड | petsMetrics',
  'emergency.ateLily.banner.severityLabel': 'अत्यधिक विषाक्त — गुर्दे की विफलता',
  'emergency.ateLily.banner.title': 'मेरी बिल्ली ने लिली खाई: अब क्या करें',
  'emergency.ateLily.article.headline': 'मेरी बिल्ली ने लिली खाई: आपातकालीन गाइड',
  'emergency.ateLily.article.description': 'बिल्लियों में लिली विषाक्तता के लिए आपातकालीन गाइड।',
  
  'emergency.ateString.breadcrumbLabel': 'धागा खाया',
  'emergency.ateString.meta.title': 'मेरी बिल्ली ने धागा खाया: आपातकालीन गाइड | petsMetrics',
  'emergency.ateString.banner.severityLabel': 'खतरनाक — रैखिक विदेशी वस्तु',
  'emergency.ateString.banner.title': 'मेरी बिल्ली ने धागा खाया: अब क्या करें',
  'emergency.ateString.article.headline': 'मेरी बिल्ली ने धागा खाया: आपातकालीन गाइड',
  'emergency.ateString.article.description': 'बिल्लियों में धागा सेवन के लिए आपातकालीन गाइड।',
  
  'emergency.ateFishingLine.breadcrumbLabel': 'मछली पकड़ने का धागा खाया',
  'emergency.ateFishingLine.meta.title': 'मेरी बिल्ली ने मछली पकड़ने का धागा खाया: आपातकालीन गाइड | petsMetrics',
  'emergency.ateFishingLine.banner.severityLabel': 'खतरनाक',
  'emergency.ateFishingLine.banner.title': 'मेरी बिल्ली ने मछली पकड़ने का धागा खाया: अब क्या करें',
  'emergency.ateFishingLine.article.headline': 'मेरी बिल्ली ने मछली पकड़ने का धागा खाया: आपातकालीन गाइड',
  'emergency.ateFishingLine.article.description': 'बिल्लियों में मछली पकड़ने के धागे के लिए आपातकालीन गाइड।',
  
  'emergency.ateEssentialOils.breadcrumbLabel': 'एसेंशियल ऑयल चाटा',
  'emergency.ateEssentialOils.meta.title': 'मेरी बिल्ली ने एसेंशियल ऑयल चाटा: आपातकालीन गाइड | petsMetrics',
  'emergency.ateEssentialOils.banner.severityLabel': 'विषाक्त',
  'emergency.ateEssentialOils.banner.title': 'मेरी बिल्ली ने एसेंशियल ऑयल चाटा: अब क्या करें',
  'emergency.ateEssentialOils.article.headline': 'मेरी बिल्ली ने एसेंशियल ऑयल चाटा: आपातकालीन गाइड',
  'emergency.ateEssentialOils.article.description': 'बिल्लियों में एसेंशियल ऑयल के लिए आपातकालीन गाइड।',
  
  'emergency.ateGarlic.breadcrumbLabel': 'लहसुन खाया',
  'emergency.ateGarlic.meta.title': 'मेरी बिल्ली ने लहसुन खाया: आपातकालीन गाइड | petsMetrics',
  'emergency.ateGarlic.banner.severityLabel': 'विषाक्त',
  'emergency.ateGarlic.banner.title': 'मेरी बिल्ली ने लहसुन खाया: अब क्या करें',
  'emergency.ateGarlic.article.headline': 'मेरी बिल्ली ने लहसुन खाया: आपातकालीन गाइड',
  'emergency.ateGarlic.article.description': 'बिल्लियों में लहसुन विषाक्तता के लिए आपातकालीन गाइड।',
  
  'emergency.ateOnionCat.breadcrumbLabel': 'प्याज खाया',
  'emergency.ateOnionCat.meta.title': 'मेरी बिल्ली ने प्याज खाया: आपातकालीन गाइड | petsMetrics',
  'emergency.ateOnionCat.banner.severityLabel': 'विषाक्त',
  'emergency.ateOnionCat.banner.title': 'मेरी बिल्ली ने प्याज खाया: अब क्या करें',
  'emergency.ateOnionCat.article.headline': 'मेरी बिल्ली ने प्याज खाया: आपातकालीन गाइड',
  'emergency.ateOnionCat.article.description': 'बिल्लियों में प्याज के लिए आपातकालीन गाइड।',
  
  'emergency.ateChocolateCat.breadcrumbLabel': 'चॉकलेट खाई',
  'emergency.ateChocolateCat.meta.title': 'मेरी बिल्ली ने चॉकलेट खाई: आपातकालीन गाइड | petsMetrics',
  'emergency.ateChocolateCat.banner.severityLabel': 'विषाक्त',
  'emergency.ateChocolateCat.banner.title': 'मेरी बिल्ली ने चॉकलेट खाई: अब क्या करें',
  'emergency.ateChocolateCat.article.headline': 'मेरी बिल्ली ने चॉकलेट खाई: आपातकालीन गाइड',
  'emergency.ateChocolateCat.article.description': 'बिल्लियों में चॉकलेट के लिए आपातकालीन गाइड।',
  
  'seasonal.christmas.title': 'कुत्तों के लिए खतरनाक क्रिसमस खाद्य पदार्थ',
  'seasonal.christmas.description': 'जानें कौन से क्रिसमस खाद्य पदार्थ आपके कुत्ते के लिए खतरनाक हैं।',
  'seasonal.thanksgiving.title': 'कुत्तों के लिए खतरनाक थैंक्सगिविंग खाद्य पदार्थ',
  'seasonal.thanksgiving.description': 'जानें कौन से थैंक्सगिविंग खाद्य पदार्थ आपके कुत्ते के लिए खतरनाक हैं।',
  'seasonal.halloween.title': 'कुत्तों के लिए खतरनाक हैलोवीन कैंडी',
  'seasonal.halloween.description': 'जानें कौन सी हैलोवीन कैंडी आपके कुत्ते के लिए खतरनाक है।',
  'seasonal.easter.title': 'कुत्तों के लिए खतरनाक ईस्टर चॉकलेट',
  'seasonal.easter.description': 'जानें क्यों ईस्टर चॉकलेट आपके कुत्ते के लिए खतरनाक है।',
  'seasonal.summerHeat.title': 'कुत्तों के लिए गर्मी की सुरक्षा',
  'seasonal.summerHeat.description': 'अपने कुत्ते को गर्मी की गर्मी से बचाएं।',
  'seasonal.winterPaw.title': 'कुत्तों के लिए शीतकालीन पंजा देखभाल',
  'seasonal.winterPaw.description': 'सर्दियों में अपने कुत्ते के पंजों की रक्षा करें।',
  'seasonal.fireworks.title': 'कुत्तों में आतिशबाजी की चिंता',
  'seasonal.fireworks.description': 'अपने कुत्ते को आतिशबाजी की चिंता से निपटने में मदद करें।',
  'seasonal.springAllergies.title': 'कुत्तों में वसंत एलर्जी',
  'seasonal.springAllergies.description': 'अपने कुत्ते की वसंत एलर्जी का प्रबंधन करें।',
  
  'dog.faq.aging.title': 'कुत्ते की उम्र बढ़ने के सामान्य प्रश्न',
  'dog.faq.health.title': 'कुत्ते के स्वास्थ्य के सामान्य प्रश्न',
  'dog.faq.nutrition.title': 'कुत्ते के पोषण के सामान्य प्रश्न',
  'cat.faq.aging.title': 'बिल्ली की उम्र बढ़ने के सामान्य प्रश्न',
  'cat.faq.health.title': 'बिल्ली के स्वास्थ्य के सामान्य प्रश्न',
  'cat.faq.nutrition.title': 'बिल्ली के पोषण के सामान्य प्रश्न',
  
  'dog.page.title': 'कुत्ते के उपकरण',
  'dog.page.description': 'आपके कुत्ते के लिए विज्ञान-आधारित कैलकुलेटर और गाइड।',
  'cat.page.title': 'बिल्ली के उपकरण',
  'cat.page.description': 'आपकी बिल्ली के लिए विज्ञान-आधारित कैलकुलेटर और गाइड।',
  'shared.page.title': 'पालतू उपकरण',
  'shared.page.description': 'सभी पालतू जानवरों के लिए उपकरण।',
  'index.title': 'petsMetrics — आपके पालतू जानवरों के लिए विज्ञान-आधारित उपकरण',
  'index.description': 'कुत्ते और बिल्ली के मालिकों के लिए मुफ्त कैलकुलेटर, गाइड और तुलना।',
};

// Apply translations
for (const [key, value] of Object.entries(frMore)) {
  const filePath = path.join(messagesDir, 'fr.json');
  const data = readJSON(filePath);
  if (enKeySet.has(key)) {
    setNested(data, key, value);
    writeJSON(filePath, data);
  }
}
console.log(`fr.json: applied ${Object.keys(frMore).length} more translations`);

for (const [key, value] of Object.entries(hiMore)) {
  const filePath = path.join(messagesDir, 'hi.json');
  const data = readJSON(filePath);
  if (enKeySet.has(key)) {
    setNested(data, key, value);
    writeJSON(filePath, data);
  }
}
console.log(`hi.json: applied ${Object.keys(hiMore).length} more translations`);