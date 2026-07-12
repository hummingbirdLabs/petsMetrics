// i18n-fix-pass3.js - Final comprehensive translations for fr & hi
const fs = require('fs');
const path = require('path');

const messagesDir = 'd:/prj2/GitHub/petsMetrics/messages';

function readJSON(fp) { return JSON.parse(fs.readFileSync(fp, 'utf8').replace(/^\uFEFF/, '')); }
function writeJSON(fp, d) { fs.writeFileSync(fp, JSON.stringify(d, null, 2) + '\n', 'utf8'); }
function flatten(o, p = '') { let r = {}; for (const [k, v] of Object.entries(o)) { const n = p ? p + '.' + k : k; if (v && typeof v === 'object' && !Array.isArray(v)) Object.assign(r, flatten(v, n)); else r[n] = v; } return r; }
function setNested(o, dk, v) { const ps = dk.split('.'); let c = o; for (let i = 0; i < ps.length - 1; i++) { if (!c[ps[i]]) c[ps[i]] = {}; c = c[ps[i]]; } c[ps[ps.length - 1]] = v; }

const enData = readJSON(path.join(messagesDir, 'en.json'));
const enFlat = flatten(enData);

const intentSame = new Set([
  'common.unit.kg', 'common.unit.lb', 'common.unit.ml', 'common.unit.oz', 'common.unit.kcal',
  'common.notFound.title', 'dog.toolGrid.rating', 'dog.toolGrid.priority',
  'cat.toolGrid.rating', 'cat.toolGrid.priority', 'toxicLanding.aspcaNumber',
  'toxicLanding.petPoisonNumber', 'emergency.shared.aspcaLink', 'header.logoAlt',
  'dogAge.lifeStage.cardTitle', 'home.hero.cardPetName',
]);

// FR remaining translations
const frFinal = {
  'common.senior': 'Senior',
  'common.intact': 'Intact',
  'dog.breedContent.breeds.labrador.name': 'Labrador Retriever',
  'dog.breedContent.breeds.goldenRetriever.name': 'Golden Retriever',
  'footer.contact': 'Contact',
  'dogCalorie.form.coefficient': 'coeff.',
  'puppyGrowth.result.predictedRange': '{min} – {max} kg',
  'catBcs.result.bcsScore': 'BCS {score}/9',
  'toxicChecker.result.source': 'Source',
  'euTravel.form.destinationLabel': 'Destination',
  'about.contact': 'Contact',
  'terms.contact': '9. Contact',
  'compare.dimension': 'Dimension',
  'emergency.ateCaffeine.meta.keywords': 'mon chien a mangé des pilules de caféine, toxicité caféine chiens, chien a bu boisson énergisante, empoisonnement caféine chiens',
  'emergency.ateCaffeine.banner.cta': 'Trouver un vétérinaire d\'urgence près de chez vous',
  'emergency.ateCaffeine.article.ogTitle': 'Mon chien a mangé des pilules de caféine : Guide d\'urgence | petsMetrics',
  'emergency.ateCaffeine.article.ogDescription': 'Que faire si votre chien mange des pilules de caféine.',
  'emergency.ateAlcohol.meta.keywords': 'mon chien a bu de l\'alcool, toxicité alcool chiens, chien a bu de la bière, chien a mangé du vin, empoisonnement éthanol chien',
  'emergency.ateAlcohol.banner.cta': 'Trouver un vétérinaire d\'urgence près de chez vous',
  'emergency.ateAlcohol.article.ogTitle': 'Mon chien a bu de l\'alcool : Guide d\'urgence | petsMetrics',
  'emergency.ateAlcohol.article.ogDescription': 'Que faire si votre chien boit de l\'alcool.',
  'emergency.ateMacadamiaNuts.meta.description': 'Guide d\'urgence : Les noix de macadamia sont toxiques pour les chiens. Symptômes (faiblesse, vomissements, tremblements), évaluation des risques.',
  'emergency.ateMacadamiaNuts.meta.keywords': 'mon chien a mangé des noix de macadamia, toxicité noix macadamia chiens, empoisonnement macadamia chien',
  'emergency.ateMacadamiaNuts.banner.cta': 'Trouver un vétérinaire d\'urgence près de chez vous',
  'emergency.ateMacadamiaNuts.article.ogTitle': 'Mon chien a mangé des noix de macadamia : Guide d\'urgence | petsMetrics',
  'emergency.ateMacadamiaNuts.article.ogDescription': 'Que faire si votre chien mange des noix de macadamia.',
  'emergency.ateMushrooms.meta.keywords': 'mon chien a mangé un champignon dans le jardin, empoisonnement champignons chiens, amanite chiens, champignons sauvages toxiques chiens',
  'emergency.ateMushrooms.article.ogTitle': 'Mon chien a mangé un champignon : Guide d\'urgence | petsMetrics',
  'emergency.ateMushrooms.article.ogDescription': 'Guide d\'urgence : Les champignons sauvages peuvent causer une insuffisance hépatique mortelle chez les chiens. Agissez immédiatement.',
  'emergency.ateCookedBones.meta.description': 'Guide d\'urgence : Les os cuits se brisent en éclats et peuvent causer une perforation ou obstruction intestinale. Symptômes (vomissements, sang).',
  'emergency.ateCookedBones.meta.keywords': 'mon chien a mangé des os cuits, danger os cuits chiens, chien a mangé os de poulet, éclats d\'os chien',
  'emergency.ateCookedBones.article.ogTitle': 'Mon chien a mangé des os cuits : Guide d\'urgence | petsMetrics',
  'emergency.ateCookedBones.article.ogDescription': 'Guide d\'urgence : Les os cuits peuvent se briser et causer des lésions intestinales mortelles.',
  'emergency.atePlastic.meta.description': 'Guide d\'urgence : Le plastique peut causer une obstruction intestinale chez les chiens. Symptômes (vomissements, absence de selles), évaluation par taille.',
  'emergency.atePlastic.meta.keywords': 'mon chien a mangé un jouet en plastique, chien a mangé sac plastique, obstruction intestinale chien plastique',
  'emergency.atePlastic.article.ogTitle': 'Mon chien a mangé du plastique : Que faire maintenant | petsMetrics',
  'emergency.atePlastic.article.ogDescription': 'Guide d\'urgence : Le plastique peut causer une obstruction intestinale mortelle chez les chiens.',
  'emergency.ateMedication.meta.description': 'Guide d\'urgence : Les médicaments humains sont toxiques pour les chiens. Ibuprofène (AINS), acétaminophène, antidépresseurs.',
  'emergency.ateMedication.meta.keywords': 'mon chien a mangé des médicaments humains, chien a mangé ibuprofène, chien a mangé acétaminophène, médicaments humains toxiques chiens',
  'emergency.ateMedication.article.ogTitle': 'Mon chien a mangé des médicaments humains : Guide d\'urgence | petsMetrics',
  'emergency.ateMedication.article.ogDescription': 'Guide d\'urgence : Les médicaments humains comme l\'ibuprofène sont toxiques pour les chiens. Agissez immédiatement.',
  'emergency.ateRodenticide.meta.description': 'Guide d\'urgence : Le rodenticide est extrêmement toxique pour les chiens. Types anticoagulants vs neurotoxiques, symptômes.',
  'emergency.ateRodenticide.meta.keywords': 'mon chien a mangé du poison à rats, empoisonnement rodenticide chiens, anticoagulant chien, brométhaline chien',
  'emergency.ateRodenticide.article.ogTitle': 'Mon chien a mangé du poison à rats : Guide d\'urgence | petsMetrics',
  'emergency.ateRodenticide.article.ogDescription': 'Guide d\'urgence : Le rodenticide est mortellement toxique pour les chiens. Même de petites quantités nécessitent un traitement immédiat.',
  'emergency.ateTobacco.meta.description': 'Guide d\'urgence : La nicotine est hautement toxique pour les chiens. Symptômes (vomissements, tachycardie, convulsions).',
  'emergency.ateTobacco.meta.keywords': 'mon chien a mangé des cigarettes, chien a mangé nicotine, chien a bu e-liquide, empoisonnement tabac chiens',
  'emergency.ateTobacco.article.ogTitle': 'Mon chien a mangé du tabac : Guide d\'urgence | petsMetrics',
  'emergency.ateTobacco.article.ogDescription': 'Guide d\'urgence : La nicotine est toxique pour les chiens. Évaluez les risques, symptômes et traitement.',
  'emergency.ateMarijuana.meta.description': 'Guide d\'urgence : Le THC est toxique pour les chiens. Les comestibles au cannabis sont extrêmement dangereux en raison de leur concentration élevée.',
  'emergency.ateMarijuana.meta.keywords': 'mon chien a mangé des comestibles au cannabis, chien a mangé THC, empoisonnement marijuana chiens',
  'emergency.ateMarijuana.article.ogTitle': 'Mon chien a mangé de la marijuana : Guide d\'urgence | petsMetrics',
  'emergency.ateMarijuana.article.ogDescription': 'Guide d\'urgence : Les comestibles à la marijuana sont toxiques pour les chiens. Agissez immédiatement.',
  'emergency.ateAvocado.meta.keywords': 'mon chien a mangé de l\'avocat que faire, toxicité avocat chiens, chien a mangé noyau avocat, empoisonnement persine chiens',
  'emergency.ateAvocado.banner.cta': 'Trouver un vétérinaire d\'urgence près de chez vous',
  'emergency.ateAvocado.article.ogTitle': 'Mon chien a mangé de l\'avocat : Que faire maintenant | petsMetrics',
  'emergency.ateAvocado.article.ogDescription': 'Que faire si votre chien mange de l\'avocat.',

  'dogAge.shareCta.facebook': 'Partager sur Facebook',
  'dogAge.shareCta.twitter': 'Partager sur Twitter',
  'catAge.scienceSection.aafpGuidelines': 'Directives AAHA/AAFP sur les étapes de vie félines',
  'gestation.form.multiDateHint': 'Si plusieurs accouplements ont eu lieu, nous calculons une plage montrant la date la plus précoce possible et la plus probable.',
  'gestation.result.basedOn': 'Basé sur : gestation moyenne de 63 jours. Date d\'accouplement : {date}',
  'gestation.result.milestoneDay25': 'Jour 25 — Fenêtre d\'échographie ouverte',
  'gestation.result.milestoneDay25Desc': 'Le vétérinaire peut confirmer la gestation par échographie à partir du jour 25.',
  'gestation.result.milestoneDay45': 'Jour 45 — Radiographie : squelettes fœtaux visibles',
  'gestation.result.milestoneDay45Desc': 'La radiographie montre clairement les squelettes fœtaux. Comptez les chiots et vérifiez le positionnement.',
  'gestation.result.milestoneDay58': 'Jour 58 — Possible travail précoce ; commencez la surveillance de la température',
  'gestation.result.milestoneDay58Desc': 'Commencez la surveillance quotidienne de la température. Une baisse en dessous de 37,8°C (100°F) signale le travail dans les 24h.',
  'gestation.result.milestoneDay60': 'Jour 60 — Comportement de nidification',
  'gestation.result.milestoneDay60Desc': 'Le comportement de nidification s\'intensifie. Assurez-vous que la zone de mise bas est entièrement préparée.',
  'gestation.result.milestoneDay63': 'Jour 63 — Date probable de mise bas',
  'gestation.result.milestoneDay63Desc': 'Date prévue de mise bas. La plupart des chiennes mettent bas le jour 63 ou à proximité.',
  'gestation.result.milestoneDay65': 'Jour 65 — Terme tardif ; contactez le vétérinaire si pas de travail',
  'gestation.result.milestoneDay65Desc': 'Si aucun signe de travail, consultez votre vétérinaire pour évaluation.',
  'gestation.result.milestoneDay68': 'Jour 68 — Limite tardive ; contactez le vétérinaire',
  'gestation.result.milestoneDay68Desc': 'Limite de sécurité tardive. Contactez immédiatement votre vétérinaire si le travail n\'a pas commencé.',
  'gestation.result.milestonesTitle': 'Chronologie des étapes de la gestation',
  'gestation.result.possibleRange': 'Plage possible : {earliest} → {latest}',
  'vaccination.result.generatedOn': 'Généré le : {date} · Basé sur la date de naissance : {birthDate} · Région : {region} · WSAVA',
  'vaccination.result.nonCoreBody': 'Les vaccins marqués comme non essentiels dépendent fortement de votre région spécifique et du mode de vie de votre chien.',
  'vaccination.result.nonCoreTitle': 'À propos des recommandations de vaccins non essentiels',
  'catBcs.result.weeksToIdeal': 'Estimé {weeks} semaines pour atteindre le poids idéal (perte de 1% par semaine)',
  'catHydration.result.statusSlightlyLow': 'Légèrement bas — ajoutez un peu plus d\'eau',
  'toxicChecker.result.safeAmount': 'Si consommé, quantité sûre',
  'euTravel.documents.health-certificate-non-eu': 'Certificat sanitaire animal (AHC)',
  'euTravel.documents.max-pets-limit': 'Dans la limite de 5 animaux (non commercial)',
  'euTravel.documents.min-age-rabies': 'Âge minimum atteint (12+ semaines)',
  'euTravel.documents.nordic-immunity-zone': 'Traitement nordique contre l\'échinocoque',
  'euTravel.documents.teip-entry-point': 'Point d\'entrée désigné (TEP) prévu',
  'euTravel.documents.uk-specific-docs': 'AHC spécifique au Royaume-Uni (post-Brexit)',
  'euTravel.result.leadTimeHint': 'Planifiez à l\'avance — certaines exigences ont des périodes d\'attente obligatoires qui commencent après la vaccination.',
  'euTravelLanding.ctaDescription': 'Utilisez notre vérificateur interactif de voyage UE pour animaux pour vérifier toutes les exigences pour votre situation spécifique.',
  'euTravelLanding.noLeadTime': 'Aucun délai spécifique',
  'euTravelLanding.notFoundDescription': 'L\'itinéraire de voyage UE que vous recherchez n\'existe pas. Veuillez utiliser le vérificateur interactif.',
  'about.dataSourcesP2': 'Les données de race (normes de poids, espérance de vie, risques génétiques) proviennent de sources reconnues.',
  'about.methodologyP2': 'Chaque page de résultat de calculateur cite sa source de formule. Vous pouvez vérifier n\'importe lequel de nos calculs.',
};

// HI remaining translations
const hiFinal = {
  'dogAge.shareCta.facebook': 'Facebook पर साझा करें',
  'dogAge.shareCta.twitter': 'Twitter पर साझा करें',
  'catAge.scienceSection.aafpGuidelines': 'AAHA/AAFP बिल्ली जीवन चरण दिशानिर्देश',
  'gestation.form.multiDateHint': 'यदि कई संभोग हुए हैं, तो हम सबसे प्रारंभिक संभावित और सबसे संभावित तिथि दिखाने वाली एक सीमा की गणना करते हैं।',
  'gestation.result.basedOn': 'आधारित: 63 दिनों की औसत गर्भावस्था। संभोग तिथि: {date}',
  'gestation.result.milestoneDay25': 'दिन 25 — अल्ट्रासाउंड विंडो खुलती है',
  'gestation.result.milestoneDay25Desc': 'पशु चिकित्सक दिन 25 के आसपास अल्ट्रासाउंड द्वारा गर्भावस्था की पुष्टि कर सकता है।',
  'gestation.result.milestoneDay45': 'दिन 45 — एक्स-रे: भ्रूण कंकाल दिखाई देते हैं',
  'gestation.result.milestoneDay45Desc': 'एक्स-रे भ्रूण कंकाल को स्पष्ट रूप से दिखाता है। पिल्लों की गिनती करें और स्थिति की जांच करें।',
  'gestation.result.milestoneDay58': 'दिन 58 — संभावित प्रारंभिक प्रसव; तापमान निगरानी शुरू करें',
  'gestation.result.milestoneDay58Desc': 'दैनिक तापमान निगरानी शुरू करें। 37.8°C (100°F) से नीचे गिरावट 24 घंटे के भीतर प्रसव का संकेत देती है।',
  'gestation.result.milestoneDay60': 'दिन 60 — घोंसला बनाने का व्यवहार',
  'gestation.result.milestoneDay60Desc': 'घोंसला बनाने का व्यवहार तेज होता है। सुनिश्चित करें कि प्रसव क्षेत्र पूरी तरह से तैयार है।',
  'gestation.result.milestoneDay63': 'दिन 63 — सबसे संभावित प्रसव तिथि',
  'gestation.result.milestoneDay63Desc': 'अपेक्षित प्रसव तिथि। अधिकांश कुत्ते दिन 63 पर या उसके आसपास प्रसव करते हैं।',
  'gestation.result.milestoneDay65': 'दिन 65 — देर से अवधि; प्रसव न होने पर पशु चिकित्सक से संपर्क करें',
  'gestation.result.milestoneDay65Desc': 'यदि प्रसव के कोई संकेत नहीं हैं, तो मूल्यांकन के लिए अपने पशु चिकित्सक से परामर्श करें।',
  'gestation.result.milestoneDay68': 'दिन 68 — अंतिम सीमा; पशु चिकित्सक से संपर्क करें',
  'gestation.result.milestoneDay68Desc': 'अंतिम सुरक्षित सीमा। यदि प्रसव शुरू नहीं हुआ है तो तुरंत अपने पशु चिकित्सक से संपर्क करें।',
  'gestation.result.milestonesTitle': 'गर्भावस्था माइलस्टोन समयरेखा',
  'gestation.result.possibleRange': 'संभावित सीमा: {earliest} → {latest}',
  'vaccination.result.generatedOn': 'उत्पन्न: {date} · जन्म तिथि पर आधारित: {birthDate} · क्षेत्र: {region} · WSAVA',
  'vaccination.result.nonCoreBody': 'गैर-कोर के रूप में चिह्नित टीके आपके विशिष्ट क्षेत्र और आपके कुत्ते की जीवनशैली पर बहुत निर्भर करते हैं।',
  'vaccination.result.nonCoreTitle': 'गैर-कोर टीका सिफारिशों के बारे में',
  'catBcs.result.weeksToIdeal': 'आदर्श वजन तक पहुंचने में अनुमानित {weeks} सप्ताह (1% साप्ताहिक कमी)',
  'catHydration.result.statusSlightlyLow': 'थोड़ा कम — थोड़ा और पानी जोड़ें',
  'toxicChecker.result.safeAmount': 'यदि खिलाया जाए, सुरक्षित मात्रा',
  'euTravel.documents.health-certificate-non-eu': 'पशु स्वास्थ्य प्रमाणपत्र (AHC)',
  'euTravel.documents.max-pets-limit': '5-पालतू सीमा के भीतर (गैर-वाणिज्यिक)',
  'euTravel.documents.min-age-rabies': 'न्यूनतम आयु पूर्ण (12+ सप्ताह)',
  'euTravel.documents.nordic-immunity-zone': 'नॉर्डिक इचिनोकोकस उपचार',
  'euTravel.documents.teip-entry-point': 'निर्दिष्ट प्रवेश बिंदु (TEP) योजनाबद्ध',
  'euTravel.documents.uk-specific-docs': 'UK-विशिष्ट AHC (ब्रेक्सिट के बाद)',
  'euTravel.result.leadTimeHint': 'पहले से योजना बनाएं — कुछ आवश्यकताओं में अनिवार्य प्रतीक्षा अवधि होती है जो टीकाकरण के बाद शुरू होती है।',
  'euTravelLanding.ctaDescription': 'अपनी विशिष्ट स्थिति के लिए सभी आवश्यकताओं को सत्यापित करने के लिए हमारे इंटरैक्टिव EU पालतू यात्रा जांचकर्ता का उपयोग करें।',
  'euTravelLanding.noLeadTime': 'कोई विशिष्ट लीड टाइम नहीं',
  'euTravelLanding.notFoundDescription': 'आप जिस EU यात्रा मार्ग की तलाश कर रहे हैं वह मौजूद नहीं है। कृपया इंटरैक्टिव जांचकर्ता का उपयोग करें।',
  'about.dataSourcesP2': 'नस्ल डेटा (वजन मानक, जीवन प्रत्याशा, आनुवंशिक स्वास्थ्य जोखिम) मान्यता प्राप्त स्रोतों से प्राप्त किया गया है।',
  'about.methodologyP2': 'प्रत्येक कैलकुलेटर परिणाम पृष्ठ अपने सूत्र स्रोत का हवाला देता है। आप हमारी किसी भी गणना को सत्यापित कर सकते हैं।',
  'dogAge.shareCta.copyLink': 'लिंक कॉपी करें',
  'dogCalorie.shareCta.facebook': 'Facebook पर साझा करें',
  'dogCalorie.shareCta.twitter': 'Twitter पर साझा करें',
  'dogCalorie.shareCta.copyLink': 'लिंक कॉपी करें',
  'puppyGrowth.shareCta.facebook': 'Facebook पर साझा करें',
  'puppyGrowth.shareCta.twitter': 'Twitter पर साझा करें',
  'puppyGrowth.shareCta.copyLink': 'लिंक कॉपी करें',
  'catAge.shareCta.facebook': 'Facebook पर साझा करें',
  'catAge.shareCta.twitter': 'Twitter पर साझा करें',
  'catAge.shareCta.copyLink': 'लिंक कॉपी करें',
  'catBcs.shareCta.facebook': 'Facebook पर साझा करें',
  'catBcs.shareCta.twitter': 'Twitter पर साझा करें',
  'catBcs.shareCta.copyLink': 'लिंक कॉपी करें',
  'gestation.shareCta.facebook': 'Facebook पर साझा करें',
  'gestation.shareCta.twitter': 'Twitter पर साझा करें',
  'gestation.shareCta.copyLink': 'लिंक कॉपी करें',
  'vaccination.shareCta.facebook': 'Facebook पर साझा करें',
  'vaccination.shareCta.twitter': 'Twitter पर साझा करें',
  'vaccination.shareCta.copyLink': 'लिंक कॉपी करें',
  'dogAge.relatedTools.calorie': 'कैलोरी कैलकुलेटर',
  'dogAge.relatedTools.puppyGrowth': 'पिल्ला विकास भविष्यवक्ता',
  'dogAge.relatedTools.vaccination': 'टीकाकरण कार्यक्रम',
  'dogAge.breedSelector.placeholder': 'नस्ल चुनें',
  'dogAge.breedSelector.search': 'नस्ल खोजें...',
  'dogAge.breedSelector.noResults': 'कोई नस्ल नहीं मिली',
  'dogAge.breedSelector.allBreeds': 'सभी नस्लें',
  'dogAge.breedSelector.mixedBreed': 'मिश्रित नस्ल',
  'dogAge.faq.q1': 'कुत्ते की आयु कैलकुलेटर कैसे काम करता है?',
  'dogAge.faq.a1': 'हमारा कैलकुलेटर AAHA दिशानिर्देशों का उपयोग करके आपके कुत्ते की मानव आयु का अनुमान लगाता है।',
};

// Apply
function applyTrans(file, trans) {
  const fp = path.join(messagesDir, file);
  const data = readJSON(fp);
  let count = 0;
  for (const [k, v] of Object.entries(trans)) {
    if (enFlat[k] !== undefined) {
      setNested(data, k, v);
      count++;
    }
  }
  writeJSON(fp, data);
  console.log(`${file}: applied ${count}/${Object.keys(trans).length} translations`);
}

applyTrans('fr.json', frFinal);
applyTrans('hi.json', hiFinal);