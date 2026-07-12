#!/usr/bin/env node
/**
 * French Translation Script for petsMetrics
 * Translates all untranslated strings from French to English values
 */
const fs = require('fs');
const path = require('path');

const msgDir = path.join(__dirname, '..', 'messages');
const enRaw = fs.readFileSync(path.join(msgDir, 'en.json'), 'utf8').replace(/^\uFEFF/, '');
const frRaw = fs.readFileSync(path.join(msgDir, 'fr.json'), 'utf8').replace(/^\uFEFF/, '');

const en = JSON.parse(enRaw);
const fr = JSON.parse(frRaw);

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

function setNested(obj, path, value) {
  const parts = path.split('.');
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!current[parts[i]]) current[parts[i]] = {};
    current = current[parts[i]];
  }
  current[parts[parts.length - 1]] = value;
}

const enFlat = flatten(en);
const frFlat = flatten(fr);

// Keys to skip (units, brand names, etc.)
const skipPatterns = [
  /^common\.unit\./,
  /^common\.intact$/,
  /^footer\.contact$/,
  /^about\.contact$/,
  /^terms\.contact$/,
  /^common\.no$/,
  /^common\.yes$/,
];

// French translations
const translations = {};

// Emergency shared section
translations['emergency.shared.severity.monitor.label'] = 'Surveiller';
translations['emergency.shared.severity.mildlyToxic.label'] = 'Légèrement toxique';
translations['emergency.shared.severity.dangerous.label'] = 'Dangereux';
translations['emergency.shared.severity.toxic.label'] = 'Toxique';
translations['emergency.shared.severity.extremelyToxic.label'] = 'Extrêmement toxique';
translations['emergency.shared.riskLevel.high'] = 'Élevé';
translations['emergency.shared.riskLevel.critical'] = 'CRITIQUE';
translations['emergency.shared.riskLevel.moderate'] = 'Modéré';
translations['emergency.shared.riskLevel.low'] = 'Faible';
translations['emergency.shared.action.seekEmergency'] = '🚨 Consultez un vétérinaire d\'urgence MAINTENANT';
translations['emergency.shared.action.callNow'] = '🚨 Vétérinaire d\'urgence MAINTENANT';
translations['emergency.shared.action.callImmediately'] = '📞 Appelez le vétérinaire ou centre antipoison immédiatement';
translations['emergency.shared.action.callToday'] = '📞 Appelez le vétérinaire aujourd\'hui';
translations['emergency.shared.action.monitorSymptoms'] = '👀 Surveillez les symptômes, appelez le vétérinaire si inquiet';
translations['emergency.shared.action.callVet'] = '📞 Appelez le vétérinaire immédiatement';
translations['emergency.shared.labels.petWeightDog'] = 'Poids du chien';
translations['emergency.shared.labels.petWeightCat'] = 'Poids du chat';
translations['emergency.shared.labels.amountEaten'] = 'Quantité ingérée';
translations['emergency.shared.labels.riskLevel'] = 'Niveau de risque';
translations['emergency.shared.labels.actionRequired'] = 'Action requise';
translations['emergency.shared.labels.chocolateType'] = 'Type de chocolat';
translations['emergency.shared.labels.whatWasEaten'] = 'Ce qui a été mangé';
translations['emergency.shared.labels.catSize'] = 'Taille du chat';
translations['emergency.shared.labels.dogSize'] = 'Taille du chien';
translations['emergency.shared.labels.anySize'] = 'Toute taille';
translations['emergency.shared.labels.anyAmount'] = 'Toute quantité';
translations['emergency.shared.vetDecision.title'] = 'Quand consulter un vétérinaire';
translations['emergency.shared.vetDecision.emergencyTitle'] = '🚨 Urgence — Allez MAINTENANT';
translations['emergency.shared.vetDecision.urgentTitle'] = '⚡ Urgent — Dans 1-2 heures';
translations['emergency.shared.vetDecision.monitorTitle'] = '👀 Surveiller — Appelez le vétérinaire aujourd\'hui';
translations['emergency.shared.titles.riskAssessment'] = 'Évaluez le risque pour votre animal';
translations['emergency.shared.titles.whatToDo'] = 'Ce qu\'il faut faire maintenant';
translations['emergency.shared.titles.theScience'] = 'La science derrière tout cela';
translations['emergency.shared.titles.toxicDose'] = 'Calculatrice de dose toxique';
translations['emergency.shared.titles.symptomTimeline'] = 'Chronologie des symptômes : à quoi s\'attendre';
translations['emergency.shared.titles.faq'] = 'Questions fréquemment posées';
translations['emergency.shared.titles.relatedTools'] = 'Outils connexes';
translations['emergency.shared.aspcaHotline'] = 'Centre antipoison ASPCA : (888) 426-4435';
translations['emergency.shared.aspcaLink'] = 'https://www.aspca.org/pet-care/animal-poison-control';
translations['emergency.shared.stepTemplates.removeAll'] = 'Étape 1 : Retirez tout [Item] immédiatement';
translations['emergency.shared.stepTemplates.removeItem'] = 'Étape 1 : Retirez tout [item] restant de la portée de votre animal.';
translations['emergency.shared.stepTemplates.determineAmount'] = 'Étape 2 : Estimez la quantité consommée par votre animal et notez l\'heure d\'ingestion.';
translations['emergency.shared.stepTemplates.doNotInduce'] = 'Étape : Ne PAS provoquer le vomissement sans instruction vétérinaire.';
translations['emergency.shared.stepTemplates.contactPoison'] = 'Étape : Contactez le centre antipoison ASPCA au (888) 426-4435.';
translations['emergemy.shared.stepTemplates.callVetUrgent'] = 'Étape 2 : Appelez le centre antipoison ou le vétérinaire';
translations['emergency.shared.tools.toxicChecker'] = 'Vérificateur d\'aliments et plantes toxiques';
translations['emergency.shared.tools.dogCalorie'] = 'Calculateur de calories pour chiens';
translations['emergency.shared.tools.catBcs'] = 'Calculateur BCS et suivi du poids pour chats';
translations['emergency.shared.tools.dogAge'] = 'Calculateur d\'âge pour chiens';
translations['emergency.shared.tools.catAge'] = 'Calculateur d\'âge pour chats';
translations['emergency.shared.breadcrumb.home'] = 'Accueil';
translations['emergency.shared.breadcrumb.dogEmergency'] = 'Urgence chien';
translations['emergency.shared.breadcrumb.catEmergency'] = 'Urgence chat';

// Common additional
translations['common.intact'] = 'Intact';

// Footer
translations['footer.contact'] = 'Contact';

// About & Terms
translations['about.contact'] = 'Contact';

// Header
translations['header.logoAlt'] = 'petsMetrics - Outils de santé pour animaux';

// Dog Age
translations['dogAge.lifeStage.cardTitle'] = '{stage} — {stageName}';

// Dog Calorie
translations['dogCalorie.form.coefficient'] = 'coeff.';

// Puppy Growth
translations['puppyGrowth.result.predictedRange'] = '{min} – {max} kg';

// Cat BCS
translations['catBcs.result.bcsScore'] = 'BCS {score}/9';

// Toxic Checker
translations['toxicChecker.result.source'] = 'Source';

// Toxic Landing
translations['toxicLanding.aspcaPhone'] = 'Centre antipoison ASPCA';
translations['toxicLanding.aspcaNumber'] = '(888) 426-4435';
translations['toxicLanding.petPoisonNumber'] = '(855) 764-7661';

// EU Travel
translations['euTravel.form.destinationLabel'] = 'Destination';

// Emergency page - shared sub-items
translations['emergency.shared.stepTemplates.callVetUrgent'] = 'Étape 2 : Appelez le centre antipoison ou le vétérinaire';

// Apply translations
let translated = 0;
for (const [key, value] of Object.entries(translations)) {
  if (enFlat[key] && frFlat[key] === enFlat[key]) {
    setNested(fr, key, value);
    translated++;
  }
}

// Write back
fs.writeFileSync(path.join(msgDir, 'fr.json'), JSON.stringify(fr, null, 2), 'utf8');
console.log(`Translated ${translated} strings in French`);
