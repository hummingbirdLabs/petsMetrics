/**
 * AI Translation Script for petsMetrics i18n
 * 
 * This script generates AI translations for untranslated strings.
 * It uses a dictionary-based approach with common translations.
 */

const fs = require('fs');
const path = require('path');

const messagesDir = path.join(__dirname, '..', 'messages');

// Get all keys from nested object
function getKeys(obj, prefix = '') {
  let keys = [];
  for (const key of Object.keys(obj)) {
    const fullKey = prefix ? prefix + '.' + key : key;
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      keys = keys.concat(getKeys(obj[key], fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

// Get value by key path
function getValue(obj, keyPath) {
  const parts = keyPath.split('.');
  let current = obj;
  for (const part of parts) {
    if (current[part] === undefined) return undefined;
    current = current[part];
  }
  return current;
}

// Set value by key path
function setValue(obj, keyPath, value) {
  const parts = keyPath.split('.');
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (current[parts[i]] === undefined) {
      current[parts[i]] = {};
    }
    current = current[parts[i]];
  }
  current[parts[parts.length - 1]] = value;
}

// Translation dictionaries for each language
const translations = {
  fr: {
    // Common
    'common.unit.kg': 'kg',
    'common.unit.lb': 'lb',
    'common.unit.ml': 'ml',
    'common.unit.oz': 'oz',
    'common.unit.kcal': 'kcal',
    'common.senior': 'Senior',
    'common.intact': 'Intact',
    'common.notFound.title': '404',
    
    // Header & Footer
    'header.logoAlt': 'petsMetrics',
    'footer.contact': 'Contact',
    
    // Dog tools
    'dog.toolGrid.rating': 'P0',
    'dog.toolGrid.priority': 'P1',
    'dog.breedContent.breeds.labrador.name': 'Labrador Retriever',
    'dog.breedContent.breeds.goldenRetriever.name': 'Golden Retriever',
    
    // Cat tools
    'cat.toolGrid.rating': 'P0',
    'cat.toolGrid.priority': 'P1',
    
    // Dog Age
    'dogAge.lifeStage.cardTitle': '{stage} — {stageName}',
    
    // Dog Calorie
    'dogCalorie.form.coefficient': 'coeff.',
    
    // Puppy Growth
    'puppyGrowth.result.predictedRange': '{min} – {max} kg',
    
    // Cat BCS
    'catBcs.result.bcsScore': 'BCS {score}/9',
    
    // Toxic Checker
    'toxicChecker.result.source': 'Source',
    
    // Toxic Landing
    'toxicLanding.aspcaNumber': '(888) 426-4435',
    'toxicLanding.petPoisonNumber': '(855) 764-7661',
    
    // EU Travel
    'euTravel.form.destinationLabel': 'Destination',
    
    // Emergency shared
    'emergency.shared.aspcaLink': 'https://www.aspca.org/pet-care/animal-poison-control',
    
    // Emergency common headers
    'emergency.ateMarijuana.riskAssessment.headers.amountEaten': 'Quantité ingérée',
    'emergency.ateMarijuana.riskAssessment.headers.riskLevel': 'Niveau de risque',
    'emergency.ateMarijuana.riskAssessment.headers.actionRequired': 'Action requise',
    'emergency.ateXylitolGum.riskAssessment.headers.amountEaten': 'Quantité ingérée',
    'emergency.ateXylitolGum.riskAssessment.headers.xylitolContent': 'Teneur en xylitol',
    'emergency.ateXylitolGum.riskAssessment.headers.riskLevel': 'Niveau de risque',
    'emergency.ateXylitolGum.riskAssessment.headers.actionRequired': 'Action requise',
    'emergency.ateChocolate.riskAssessment.headers.theobromine': 'Teneur en théobromine',
    'emergency.ateGrapes.riskAssessment.headers.amountEaten': 'Quantité ingérée',
    'emergency.ateGrapes.riskAssessment.headers.riskLevel': 'Niveau de risque',
    'emergency.ateGrapes.riskAssessment.headers.actionRequired': 'Action requise',
    
    // Emergency science content
    'emergency.ateMarijuana.science.content': 'Le Delta-9-tétrahydrocannabinol (THC) se lie aux récepteurs cannabinoïdes CB1 dans le système nerveux central canin...',
    'emergency.ateXylitolGum.science.content': 'Le xylitol est un alcool de sucre (polyol) qui déclenche une libération rapide et exagérée d\'insuline...',
    'emergency.ateChocolate.science.content': 'Le chocolat contient de la théobromine et de la caféine, deux méthylxanthines que les chiens métabolisent beaucoup plus lentement...',
    'emergency.ateGrapes.science.content': 'Le mécanisme exact de toxicité du raisin chez les chiens est inconnu, mais peut entraîner une insuffisance rénale aiguë...',
    
    // Emergency banners
    'emergency.ateXylitolGum.banner.subtitle': 'Le xylitol déclenche une libération massive d\'insuline provoquant une hypoglycémie mortelle et une insuffisance hépatique.',
    'emergency.ateChocolate.banner.subtitle': 'Le chocolat contient de la théobromine, que les chiens ne peuvent pas métaboliser efficacement. Une action immédiate est critique.',
    'emergency.ateGrapes.banner.subtitle': 'Même de petites quantités de raisins peuvent provoquer une insuffisance rénale fatale chez les chiens.',
    
    // Emergency meta
    'emergency.ateXylitolGum.meta.description': 'Guide d\'urgence : Le xylitol (sucre de bouleau) est extrêmement toxique pour les chiens. Même un seul morceau de gomme provoque une hypoglycémie potentiellement mortelle.',
    'emergency.ateXylitolGum.meta.keywords': 'mon chien a mangé de la gomme au xylitol, empoisonnement au xylitol chiens, chien a mangé de la gomme sans sucre, xylitol toxique pour les chiens',
    'emergency.ateXylitolGum.article.ogTitle': 'Mon Chien a Mangé de la Gomme au Xylitol : Guide d\'Urgence | petsMetrics',
    'emergency.ateXylitolGum.article.ogDescription': 'Guide d\'urgence : Le xylitol provoque une hypoglycémie mortelle et une insuffisance hépatique chez les chiens. Agissez immédiatement.',
    
    'emergency.ateChocolate.meta.description': 'Guide d\'urgence : Que faire si votre chien mange du chocolat. Apprenez les niveaux de toxicité, le calendrier des symptômes et quand consulter un vétérinaire.',
    'emergency.ateChocolate.meta.keywords': 'mon chien a mangé du chocolat que faire, toxicité chocolat chiens, empoisonnement au chocolat chez les chiens, chien a mangé du chocolat',
    'emergency.ateChocolate.article.ogTitle': 'Mon Chien a Mangé du Chocolat : Que Faire Maintenant | petsMetrics',
    'emergency.ateChocolate.article.ogDescription': 'Guide d\'urgence : Que faire si votre chien mange du chocolat. Niveaux de toxicité, calendrier des symptômes et quand consulter.',
    
    'emergency.ateGrapes.meta.description': 'Guide d\'urgence : Que faire si votre chien mange des raisins ou des raisins secs. Apprenez-en plus sur le risque d\'insuffisance rénale aiguë.',
    'emergency.ateGrapes.meta.keywords': 'mon chien a mangé des raisins que dois-je faire, chien a mangé des raisins urgence, toxicité du raisin chez les chiens, raisins secs toxiques',
    'emergency.ateGrapes.article.ogTitle': 'Mon Chien a Mangé des Raisins : Que Dois-Je Faire? | petsMetrics',
    'emergency.ateGrapes.article.ogDescription': 'Guide d\'urgence : Que faire si votre chien mange des raisins. Risque d\'insuffisance rénale aiguë et quand consulter un vétérinaire.',
  },
  
  hi: {
    // Common
    'common.unit.kg': 'किलोग्राम',
    'common.unit.lb': 'पाउंड',
    'common.unit.ml': 'मिलीलीटर',
    'common.unit.oz': 'औंस',
    'common.unit.kcal': 'किलोकैलोरी',
    'common.senior': 'वरिष्ठ',
    'common.intact': 'अखंड',
    'common.notFound.title': '404',
    
    // Header & Footer
    'header.logoAlt': 'petsMetrics',
    'footer.contact': 'संपर्क',
    
    // Home
    'home.hero.cardPetName': 'बडी',
    'home.hero.cardHumanName': 'पालतू अनुकूल',
    
    // Dog tools
    'dog.toolGrid.rating': 'P0',
    'dog.toolGrid.priority': 'P1',
    'dog.breedContent.breeds.labrador.name': 'लैब्राडोर रिट्रीवर',
    'dog.breedContent.breeds.goldenRetriever.name': 'गोल्डन रिट्रीवर',
    
    // Cat tools
    'cat.toolGrid.rating': 'P0',
    'cat.toolGrid.priority': 'P1',
    
    // Dog Age
    'dogAge.lifeStage.cardTitle': '{stage} — {stageName}',
    
    // Dog Calorie
    'dogCalorie.form.coefficient': 'गुणांक',
    
    // Puppy Growth
    'puppyGrowth.result.predictedRange': '{min} – {max} किलोग्राम',
    
    // Cat BCS
    'catBcs.result.bcsScore': 'BCS {score}/9',
    
    // Toxic Checker
    'toxicChecker.result.source': 'स्रोत',
    
    // Toxic Landing
    'toxicLanding.aspcaNumber': '(888) 426-4435',
    'toxicLanding.petPoisonNumber': '(855) 764-7661',
    
    // EU Travel
    'euTravel.form.destinationLabel': 'गंतव्य',
    
    // Emergency shared
    'emergency.shared.aspcaLink': 'https://www.aspca.org/pet-care/animal-poison-control',
    
    // Emergency common headers
    'emergency.ateMarijuana.riskAssessment.headers.amountEaten': 'खाई गई मात्रा',
    'emergency.ateMarijuana.riskAssessment.headers.riskLevel': 'जोखिम स्तर',
    'emergency.ateMarijuana.riskAssessment.headers.actionRequired': 'आवश्यक कार्रवाई',
    'emergency.ateXylitolGum.riskAssessment.headers.amountEaten': 'खाई गई मात्रा',
    'emergency.ateXylitolGum.riskAssessment.headers.xylitolContent': 'जाइलिटोल मात्रा',
    'emergency.ateXylitolGum.riskAssessment.headers.riskLevel': 'जोखिम स्तर',
    'emergency.ateXylitolGum.riskAssessment.headers.actionRequired': 'आवश्यक कार्रवाई',
    'emergency.ateChocolate.riskAssessment.headers.theobromine': 'थियोब्रोमिन स्तर',
    'emergency.ateGrapes.riskAssessment.headers.amountEaten': 'खाई गई मात्रा',
    'emergency.ateGrapes.riskAssessment.headers.riskLevel': 'जोखिम स्तर',
    'emergency.ateGrapes.riskAssessment.headers.actionRequired': 'आवश्यक कार्रवाई',
    
    // Emergency science content
    'emergency.ateMarijuana.science.content': 'डेल्टा-9-टेट्राहाइड्रोकैनाबिनॉल (THC) कुत्तों के केंद्रीय तंत्रिका तंत्र में CB1 कैनाबिनॉयड रिसेप्टर्स से जुड़ता है...',
    'emergency.ateXylitolGum.science.content': 'जाइलिटोल एक शरर्ब अल्कोहल (पॉलियोल) है जो कुत्तों में तेजी से और अत्यधिक इंसुलिन निर्मोचन को प्रेरित करता है...',
    'emergency.ateChocolate.science.content': 'चॉकलेट में थियोब्रोमिन और कैफीन दोनों होते हैं, दोनों मेथिलयैन्थीन्स हैं जिन्हें कुत्ते बहुत धीरे मेटाबोलाइज़ करते हैं...',
    'emergency.ateGrapes.science.content': 'कुत्तों में अंगूर की विषाक्तता का सटीक तंत्र अज्ञात है, लेकिन ये तीव्र गुर्दे की विफलता का कारण बन सकते हैं...',
    
    // Emergency banners
    'emergency.ateXylitolGum.banner.subtitle': 'जाइलिटोल जीवन के लिए खतरनाक हाइपोग्लाइसीमिया और लिवर की विफलता पैदा करने वाले भारी इंसुलिन निर्मोचन को ट्रिगर करता है।',
    'emergency.ateChocolate.banner.subtitle': 'चॉकलेट में थियोब्रोमिन होता है, जिसे कुत्ते प्रभावी ढंग से मेटाबोलाइज़ नहीं कर सकते। तत्काल कार्रवाई महत्वपूर्ण है।',
    'emergency.ateGrapes.banner.subtitle': 'अंगूर की छोटी मात्रा भी कुत्तों में घातक गुर्दे की विफलता पैदा कर सकती है।',
    
    // Emergency meta
    'emergency.ateXylitolGum.meta.description': 'आपातकालीन गाइड: जाइलिटोल (बर्च शरर्बर) कुत्तों के लिए अत्यंत विषैला है। गम का एक भी टुकड़ा जीवन के लिए खतरनाक हाइपोग्लाइसीमिया पैदा कर सकता है।',
    'emergency.ateXylitolGum.meta.keywords': 'मेरे कुत्ते ने जाइलिटोल गम खा ली, जाइलिटोल विषाक्तता कुत्ते, कुत्ते ने बिना चीनी की गम खाई, जाइलिटोल कुत्तों के लिए विषैला',
    'emergency.ateXylitolGum.article.ogTitle': 'मेरे कुत्ते ने जाइलिटोल गम खा ली: आपातकालीन गाइड | petsMetrics',
    'emergency.ateXylitolGum.article.ogDescription': 'आपातकालीन गाइड: जाइलिटोल कुत्तों में घातक हाइपोग्लाइसीमिया और लिवर की विफलता पैदा करता है। तुरंत कार्रवाई करें।',
    
    'emergency.ateChocolate.meta.description': 'आपातकालीन गाइड: अगर आपके कुत्ते ने चॉकलेट खा ली हो तो क्या करें। विषाक्तता के स्तर, लक्षणों की समयरेखा और कब पशु चिकित्सक से संपर्क करें।',
    'emergency.ateChocolate.meta.keywords': 'मेरे कुत्ते ने चॉकलेट खा ली क्या करूं, कुत्तों में चॉकलेट विषाक्तता, कुत्तों में चॉकलेट विषाक्तन, कुत्ते ने चॉकलेट खाई',
    'emergency.ateChocolate.article.ogTitle': 'मेरे कुत्ते ने चॉकलेट खा ली: अभी क्या करें | petsMetrics',
    'emergency.ateChocolate.article.ogDescription': 'आपातकालीन गाइड: अगर आपके कुत्ते ने चॉकलेट खा ली हो तो क्या करें। विषाक्तता के स्तर, लक्षणों की समयरेखा और कब पशु चिकित्सक से संपर्क करें।',
    
    'emergency.ateGrapes.meta.description': 'आपातकालीन गाइड: अगर आपके कुत्ते ने अंगूर या किशमिश खा ली हो तो क्या करें। तीव्र गुर्दे की विफलता के जोखिम के बारे में जानें।',
    'emergency.ateGrapes.meta.keywords': 'मेरे कुत्ते ने अंगूर खा लिए क्या करूं, कुत्ते ने अंगूर खा लिए आपातकाल, कुत्तों में अंगूर विषाक्तता, किशमिश विषैली',
    'emergency.ateGrapes.article.ogTitle': 'मेरे कुत्ते ने अंगूर खा लिए: मुझे क्या करना चाहिए? | petsMetrics',
    'emergency.ateGrapes.article.ogDescription': 'आपातकालीन गाइड: अगर आपके कुत्ते ने अंगूर खा लिए हों तो क्या करें। तीव्र गुर्दे की विफलता के जोखिम और कब पशु चिकित्सक से संपर्क करें।',
  }
};

// Function to add missing keys from en to target language
function addMissingKeys(targetLocale, enFile, targetFile) {
  const enKeys = getKeys(enFile);
  const targetKeys = getKeys(targetFile);
  const missing = enKeys.filter(k => !targetKeys.includes(k));
  
  for (const key of missing) {
    const enVal = getValue(enFile, key);
    if (typeof enVal === 'string') {
      // If we have a translation dictionary for this key, use it
      if (translations[targetLocale] && translations[targetLocale][key]) {
        setValue(targetFile, key, translations[targetLocale][key]);
      } else {
        // Otherwise, mark as needing translation (keep English for now)
        setValue(targetFile, key, enVal);
      }
    } else if (typeof enVal === 'object' && enVal !== null) {
      // For objects (like citations), copy the structure
      setValue(targetFile, key, enVal);
    }
  }
  
  return missing.length;
}

// Function to translate strings that are still in English
function translateUntranslated(targetLocale, enFile, targetFile) {
  const enKeys = getKeys(enFile);
  let translated = 0;
  
  for (const key of enKeys) {
    const enVal = getValue(enFile, key);
    const targetVal = getValue(targetFile, key);
    
    if (typeof enVal === 'string' && typeof targetVal === 'string' && enVal === targetVal) {
      // Check if we have a translation for this key
      if (translations[targetLocale] && translations[targetLocale][key]) {
        setValue(targetFile, key, translations[targetLocale][key]);
        translated++;
      }
    }
  }
  
  return translated;
}

// Main function
function main() {
  const enFile = JSON.parse(fs.readFileSync(path.join(messagesDir, 'en.json'), 'utf8'));
  
  // Process French
  console.log('Processing French (fr)...');
  const frFile = JSON.parse(fs.readFileSync(path.join(messagesDir, 'fr.json'), 'utf8'));
  const frMissingAdded = addMissingKeys('fr', enFile, frFile);
  const frTranslated = translateUntranslated('fr', enFile, frFile);
  fs.writeFileSync(path.join(messagesDir, 'fr.json'), JSON.stringify(frFile, null, 2), 'utf8');
  console.log(`  Added ${frMissingAdded} missing keys, translated ${frTranslated} strings`);
  
  // Process Hindi
  console.log('Processing Hindi (hi)...');
  const hiFile = JSON.parse(fs.readFileSync(path.join(messagesDir, 'hi.json'), 'utf8'));
  const hiMissingAdded = addMissingKeys('hi', enFile, hiFile);
  const hiTranslated = translateUntranslated('hi', enFile, hiFile);
  fs.writeFileSync(path.join(messagesDir, 'hi.json'), JSON.stringify(hiFile, null, 2), 'utf8');
  console.log(`  Added ${hiMissingAdded} missing keys, translated ${hiTranslated} strings`);
  
  console.log('Done!');
}

main();
