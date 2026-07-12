#!/usr/bin/env node
/**
 * Generate the complete hi-translations-data.json file with all 587 Hindi translations.
 * This script builds the translation data object and saves it to disk.
 */
import * as fs from 'node:fs';
import * as path from 'node:path';

const __dirname = path.dirname(new URL(import.meta.url).filename);
const outputPath = path.resolve(__dirname, 'hi-translations-data.json');

const t = {};
function a(k, v) { t[k] = v; }

// === common ===
a("common.notFound.title", "404");

// === home ===
a("home.featuredTool.emergencyPhone", "ASPCA विष नियंत्रण: (888) 426-4435");

// === dog.guide ===
a("dog.guide.newPuppy.meta.title", "नया पिल्ला चेकलिस्ट: पहले दिन से पहले आपको जो चाहिए | petsMetrics");
a("dog.guide.newPuppy.meta.description", "47 आइटमों के साथ पूर्ण नया पिल्ला चेकलिस्ट। इंटरैक्टिव, प्रिंट करने योग्य PDF, लागत अनुमान, समयरेखा, और विशेषज्ञ सुझाव।");

// === dog.toolGrid ===
a("dog.toolGrid.rating", "P0");
a("dog.toolGrid.priority", "P1");

// === dog.breedContent ===
a("dog.breedContent.breeds.labrador.age", "लैब्राडोर मानव आयु");
a("dog.breedContent.breeds.labrador.growth", "लैब्राडोर पिल्ला विकास चार्ट");
a("dog.breedContent.breeds.germanShepherd.age", "जर्मन शेफर्ड मानव आयु");
a("dog.breedContent.breeds.frenchBulldog.weight", "फ्रेंच बुलडॉग वजन गाइड");
a("dog.breedContent.breeds.goldenRetriever.age", "गोल्डन रिट्रीवर आयु कैलकुलेटर");

// === cat.guide ===
a("cat.guide.newKitten.meta.title", "नया बिल्ली का बच्चा चेकलिस्ट: पहले दिन से पहले आपको जो चाहिए | petsMetrics");
a("cat.guide.newKitten.meta.description", "40 आइटमों के साथ पूर्ण नया बिल्ली का बच्चा चेकलिस्ट। इंटरैक्टिव, प्रिंट करने योग्य PDF, लागत अनुमान, समयरेखा, और विशेषज्ञ सुझाव।");

// === cat.toolGrid ===
a("cat.toolGrid.rating", "P0");
a("cat.toolGrid.priority", "P1");

// === header ===
a("header.logoAlt", "petsMetrics");

// === dogAge ===
a("dogAge.lifeStage.cardTitle", "{stage} — {stageName}");
a("dogAge.lifeStage.healthPriorities", "इस जीवन चरण के लिए स्वास्थ्य प्राथमिकताएं:");
a("dogAge.lifeStage.vetVisit", "वार्षिक पशु चिकित्सक जांच");
a("dogAge.lifeStage.dental", "नियमित दांत सफाई");
a("dogAge.lifeStage.weight", "स्वस्थ वजन बनाए रखें (जोड़ों के पहले घिसने को रोकें)");
a("dogAge.lifeStage.parasite", "मासिक परजीवी रोकथाम जारी रखें");
a("dogAge.scienceSection.aaGuidelines", "AAHA जीवन चरण दिशानिर्देश");
a("dogAge.shareCta.twitter", "ट्विटर पर साझा करें");
a("dogAge.shareCta.facebook", "फेसबुक पर साझा करें");
a("dogAge.shareCta.copyLink", "लिंक कॉपी करें");

// === catAge ===
a("catAge.scienceSection.aafpGuidelines", "AAHA/AAFP बिल्ली जीवन चरण दिशानिर्देश");

// === puppyGrowth ===
a("puppyGrowth.result.predictedRange", "{min} – {max} kg");

// === gestation ===
a("gestation.form.multiDateHint", "यदि कई बार संभोग हुआ, तो हम एक सीमा की गणना करते हैं।");
a("gestation.result.possibleRange", "संभव सीमा: {earliest} → {latest}");
a("gestation.result.basedOn", "आधार: औसत गर्भावस्था 63 दिन। संभोग तिथि: {date}");
a("gestation.result.milestonesTitle", "गर्भावस्था मील का पत्थर समयरेखा");
a("gestation.result.milestoneDay25", "दिन 25 — अल्ट्रासाउंड विंडो खुलती है");
a("gestation.result.milestoneDay25Desc", "पशु चिकित्सक लगभग दिन 25 से गर्भावस्था की पुष्टि कर सकता है।");
a("gestation.result.milestoneDay45", "दिन 45 — एक्स-रे: भ्रूण कंकाल");
a("gestation.result.milestoneDay45Desc", "एक्स-रे भ्रूण कंकाल स्पष्ट रूप से दिखाता है। पिल्लाओं को गिनें।");
a("gestation.result.milestoneDay58", "दिन 58 — संभव शीघ्र प्रसव; तापमान निगरानी शुरू करें");
a("gestation.result.milestoneDay58Desc", "दैनिक तापमान निगरानी शुरू करें। 37.8°C से नीचे गिरना 24 घंटे में प्रसव का संकेत है।");
a("gestation.result.milestoneDay60", "दिन 60 — घोंसला व्यवहार");
a("gestation.result.milestoneDay60Desc", "घोंसला व्यवहार तीव्र हो जाता है। प्रसव क्षेत्र तैयार करें।");
a("gestation.result.milestoneDay63", "दिन 63 — सबसे संभावित ड्यू डेट");
a("gestation.result.milestoneDay63Desc", "अपेक्षित प्रसव तिथि। अधिकांश कुत्ते दिन 63 को डिलीवर करते हैं।");
a("gestation.result.milestoneDay65", "दिन 65 — देर अवधि; प्रसव न होने पर पशु चिकित्सक से संपर्क करें");
a("gestation.result.milestoneDay65Desc", "प्रसव के लक्षण न होने पर पशु चिकित्सक से परामर्श करें।");
a("gestation.result.milestoneDay68", "दिन 68 — सबसे पहले की सीमा; पशु चिकित्सक से संपर्क करें");
a("gestation.result.milestoneDay68Desc", "सबसे पहले की सुरक्षित सीमा। प्रसव न होने पर तुरंत पशु चिकित्सक से संपर्क करें।");

// === vaccination ===
a("vaccination.result.generatedOn", "बनाया गया: {date} · आधार: जन्म तिथि: {birthDate} · क्षेत्र: {region} · WSAVA कोर टीका दिशानिर्देश");
a("vaccination.result.nonCoreTitle", "गैर-कोर टीका अनुशंसाओं के बारे में");
a("vaccination.result.nonCoreBody", "गैर-कोर टीकाएं आपके क्षेत्र और कुत्ते की दिनचर्या पर निर्भर करती हैं। वैयक्तिकृत मूल्यांकन के लिए पशु चिकित्सक से परामर्श करें।");

// === catBcs ===
a("catBcs.result.bcsScore", "BCS {score}/9");
a("catBcs.result.weeksToIdeal", "स्वस्थ वजन तक पहुंचने में अनुमानित {weeks} सप्ताह (साप्ताहिक 1% कमी)");

// === catHydration ===
a("catHydration.result.statusSlightlyLow", "थोड़ा कम — पानी बढ़ाएं");

// === toxicChecker ===
a("toxicChecker.result.safeAmount", "सुरक्षित मात्रा (यदि खिलाया है)");

// === toxicLanding ===
a("toxicLanding.aspcaPhone", "ASPCA पशु विष नियंत्रण");
a("toxicLanding.aspcaNumber", "(888) 426-4435");
a("toxicLanding.petPoisonNumber", "(855) 764-7661");

// === euTravel ===
a("euTravel.documents.health-certificate-non-eu", "पशु स्वास्थ्य प्रमाणपत्र (AHC)");
a("euTravel.documents.min-age-rabies", "न्यूनतम आयु पूरी (12+ सप्ताह)");
a("euTravel.documents.max-pets-limit", "5-पेट सीमा के भीतर (गैर-व्यावसायिक)");
a("euTravel.documents.teip-entry-point", "नामित प्रवेश बिंदु (TEP) योजना");
a("euTravel.documents.uk-specific-docs", "UK-विशिष्ट AHC (ब्रेक्सिट के बाद)");
a("euTravel.documents.nordic-immunity-zone", "नॉर्डिक एकिनोकोकस उपचार");
a("euTravel.result.leadTimeHint", "आगे से योजना बनाएं — कुछ आवश्यकताओं में अनिवार्य प्रतीक्षा अवधि है।");

// === euTravelLanding ===
a("euTravelLanding.noLeadTime", "कोई विशिष्ट समय सीमा नहीं");
a("euTravelLanding.ctaDescription", "अपने पालतू जानवर के लिए सभी आवश्यकताओं को सत्यापित करने के लिए EU पेट ट्रैवल चेकर का उपयोग करें।");
a("euTravelLanding.notFoundDescription", "यह EU यात्रा मार्ग मौजूद नहीं है। कृपया इंटरैक्टिव चेकर का उपयोग करें।");

// === emergency.shared ===
a("emergency.shared.severity.monitor.label", "निगरानी करें");
a("emergency.shared.severity.mildlyToxic.label", "हल्का विषैला");
a("emergency.shared.severity.dangerous.label", "खतरनाक");
a("emergency.shared.severity.toxic.label", "विषैला");
a("emergency.shared.severity.extremelyToxic.label", "अत्यंत विषैला");
a("emergency.shared.riskLevel.high", "उच्च");
a("emergency.shared.riskLevel.critical", "अत्यंत गंभीर");
a("emergency.shared.riskLevel.moderate", "मध्यम");
a("emergency.shared.riskLevel.low", "कम");
a("emergency.shared.action.seekEmergency", "🚨 अभी आपातकालीन पशु चिकित्सा देखभाल लें");
a("emergency.shared.action.callNow", "🚨 अभी आपातकालीन पशु चिकित्सक बुलाएं");
a("emergency.shared.action.callImmediately", "📞 तुरंत पशु चिकित्सक या विष नियंत्रण कॉल करें");
a("emergency.shared.action.callToday", "📞 आज पशु चिकित्सक कॉल करें");
a("emergency.shared.action.monitorSymptoms", "👀 लक्षणों पर नजर रखें, चिंतित होने पर कॉल करें");
a("emergency.shared.action.callVet", "📞 तुरंत पशु चिकित्सक कॉल करें");
a("emergency.shared.labels.petWeightDog", "कुत्ते का वजन");
a("emergency.shared.labels.petWeightCat", "बिल्ली का वजन");
a("emergency.shared.labels.amountEaten", "खाई गई मात्रा");
a("emergency.shared.labels.riskLevel", "जोखिम स्तर");
a("emergency.shared.labels.actionRequired", "आवश्यक कार्रवाई");
a("emergency.shared.labels.chocolateType", "चॉकलेट प्रकार");
a("emergency.shared.labels.whatWasEaten", "क्या खाया गया");
a("emergency.shared.labels.catSize", "बिल्ली का आकार");
a("emergency.shared.labels.dogSize", "कुत्ते का आकार");
a("emergency.shared.labels.anySize", "कोई भी आकार");
a("emergency.shared.labels.anyAmount", "कोई भी मात्रा");
a("emergency.shared.vetDecision.title", "पशु चिकित्सक से कब मिलें");
a("emergency.shared.vetDecision.emergencyTitle", "🚨 आपातकालीन — अभी जाएं");
a("emergency.shared.vetDecision.urgentTitle", "⚡ तत्काल — 1-2 घंटे के भीतर");
a("emergency.shared.vetDecision.monitorTitle", "👀 निगरानी — आज पशु चिकित्सक कॉल करें");
a("emergency.shared.titles.riskAssessment", "अपने पालतू जानवर के जोखिम का मूल्यांकन अभी करें");
a("emergency.shared.titles.whatToDo", "अभी क्या करें");
a("emergency.shared.titles.theScience", "इसके पीछे का विज्ञान");
a("emergency.shared.titles.toxicDose", "विषैली मात्रा कैलकुलेटर");
a("emergency.shared.titles.symptomTimeline", "लक्षण समयरेखा: क्या उम्मीद करें");
a("emergency.shared.titles.faq", "अक्सर पूछे जाने वाले प्रश्न");
a("emergency.shared.titles.relatedTools", "संबंधित उपकरण");
a("emergency.shared.aspcaHotline", "ASPCA विष नियंत्रण: (888) 426-4435");
a("emergency.shared.aspcaLink", "https://www.aspca.org/pet-care/animal-poison-control");
a("emergency.shared.stepTemplates.removeAll", "चरण 1: [Item] को तुरंत हटा दें");
a("emergency.shared.stepTemplates.removeItem", "चरण 1: पहुंच से [item] हटा दें।");
a("emergency.shared.stepTemplates.determineAmount", "चरण 2: अनुमान लगाएं कि कितना खा लिया और समय नोट करें।");
a("emergency.shared.stepTemplates.doNotInduce", "चरण: उल्टी न दिलाएं जब तक पशु चिकित्सक न बोले।");
a("emergency.shared.stepTemplates.contactPoison", "चरण: ASPCA विष नियंत्रण (888) 426-4435 पर संपर्क करें।");
a("emergency.shared.stepTemplates.callVetUrgent", "चरण 2: विष नियंत्रण या पशु चिकित्सक कॉल करें");
a("emergency.shared.tools.toxicChecker", "विषैला भोजन व पौधा चेकर");
a("emergency.shared.tools.dogCalorie", "कुत्ता कैलोरी कैलकुलेटर");
a("emergency.shared.tools.catBcs", "बिल्ली BCS व वजन ट्रैकर");
a("emergency.shared.tools.dogAge", "कुत्ता आयु कैलकुलेटर");
a("emergency.shared.tools.catAge", "बिल्ली आयु कैलकुलेटर");
a("emergency.shared.breadcrumb.home", "होम");
a("emergency.shared.breadcrumb.dogEmergency", "कुत्ता आपातकाल");
a("emergency.shared.breadcrumb.catEmergency", "बिल्ली आपातकाल");

// ===========================
// DOG EMERGENCY PAGES
// ===========================

// === emergency.ateAvocado ===
a("emergency.ateAvocado.breadcrumbLabel", "एवोकाडो खा लिया");
a("emergency.ateAvocado.meta.title", "मेरे कुत्ते ने एवोकाडो खाया: अभी क्या करें | petsMetrics");
a("emergency.ateAvocado.meta.description", "आपातकालीन गाइड: एवोकाडो में पर्सिन होता है। गुठली आंतों का रुकावट कर सकती है।");
a("emergency.ateAvocado.meta.keywords", "कुत्ते ने एवोकाडो खाया, एवोकाडो विष, पर्सिन विष");
a("emergency.ateAvocado.banner.severityLabel", "हल्का विषैला — गुठली मुख्य खतरा");
a("emergency.ateAvocado.banner.title", "मेरे कुत्ते ने एवोकाडो खाया: अभी क्या करें");
a("emergency.ateAvocado.banner.subtitle", "एवोकाडो का गूदा हल्का विषैला है, लेकिन <strong>गुठली असली खतरा है</strong> — यह आंतों का रुकावट कर सकती है।");
a("emergency.ateAvocado.banner.cta", "पास में आपातकालीन पशु चिकित्सक खोजें");
a("emergency.ateAvocado.article.headline", "मेरे कुत्ते ने एवोकाडो खाया: अभी क्या करें");
a("emergency.ateAvocado.article.description", "एवोकाडो खाने के लिए आपातकालीन गाइड।");
a("emergency.ateAvocado.article.ogTitle", "मेरे कुत्ते ने एवोकाडो खाया: अभी क्या करें | petsMetrics");
a("emergency.ateAvocado.article.ogDescription", "अगर आपका कुत्ता एवोकाडो खाता है तो क्या करें।");
a("emergency.ateAvocado.riskAssessment.formHeader", "क्या खाया गया");
a("emergency.ateAvocado.science.content", "एवोकाडो (Persea americana) में पर्सिन होता है, एक कवकनाशी वसीय अम्ल। कुत्तों मंे पर्सिन हल्के पाचन संबंधी जलन का कारण बनता है — उल्टी, दस्त, पेट दर्द। गुठली 3-5 सेमी आकार की होती है और आंतों का रुकावट कर सकती है। उच्च वसा सामग्री (15-20%) अग्न्याशय शोथ का खतरा बढ़ाती है (ASPCA, 2023)।");
a("emergency.ateAvocado.toxicityData.minimum", "गूदा कम विषैला");
a("emergency.ateAvocado.toxicityData.ld50", "LD50: गुठली रुकावट प्राथमिक चिंता");
a("emergency.ateAvocado.toxicityData.source", "स्रोत: ASPCA पशु विष नियंत्रण केंद्र");
a("emergency.ateAvocado.toxicityData.example", "3-5 सेमी की गुठली आंत में रुकावट कर सकती है।");

// === emergency.ateCaffeine ===
a("emergency.ateCaffeine.breadcrumbLabel", "कैफीन खा लिया");
a("emergency.ateCaffeine.meta.title", "कुत्ते ने कैफीन गोलियां खाईं: आपातकालीन गाइड | petsMetrics");
a("emergency.ateCaffeine.meta.description", "कैफीन 140mg/kg पर विषैली है। दौरे, अनियमित धड़कन।");
a("emergency.ateCaffeine.meta.keywords", "कुत्ते ने कैफीन खाया, कैफीन विष");
a("emergency.ateCaffeine.banner.severityLabel", "विषैला — त्वरित कार्रवाई आवश्यक");
a("emergency.ateCaffeine.banner.title", "कुत्ते ने कैफीन गोलियां खाईं: अभी क्या करें");
a("emergency.ateCaffeine.banner.subtitle", "1-2 गोलियां (200mg) छोटे कुत्तों में दौरे का कारण बन सकती हैं। तुरंत ASPCA <strong>(888) 426-4435</strong> पर कॉल करें।");
a("emergency.ateCaffeine.banner.cta", "पास में आपातकालीन पशु चिकित्सक खोजें");
a("emergency.ateCaffeine.article.headline", "कुत्ते ने कैफीन गोलियां खाईं: आपातकालीन गाइड");
a("emergency.ateCaffeine.article.description", "कैफीन विष के लिए आपातकालीन गाइड।");
a("emergency.ateCaffeine.article.ogTitle", "कुत्ते ने कैफीन गोलियां खाईं: आपातकालीन गाइड | petsMetrics");
a("emergency.ateCaffeine.article.ogDescription", "कैफीन गोलियां खाने पर क्या करें।");
a("emergency.ateCaffeine.riskAssessment.formHeader", "कैफीन स्रोत");
a("emergency.ateCaffeine.science.content", "कैफीन (1,3,7-ट्राइमेथिलजैंथीन) CNS उत्तेजना, हृदय मांसपेशी संकुचन पैदा करता है। कुत्तों में अर्ध-जीवन 4.5 घंटे (मनुष्यों में 3 घंटे)। उच्च खुराक पर टैकीकार्डिया, तड़प, मृत्यु (ASPCA, 2023)।");
a("emergency.ateCaffeine.toxicityData.minimum", "20mg/kg पर हल्के लक्षण");
a("emergency.ateCaffeine.toxicityData.ld50", "LD50: ~140mg/kg");
a("emergency.ateCaffeine.toxicityData.source", "स्रोत: ASPCA पशु विष नियंत्रण केंद्र");
a("emergency.ateCaffeine.toxicityData.example", "1-2 गोलियां छोटे कुत्ते में गंभीर लक्षण का कारण बन सकती हैं।");

// === emergency.ateAlcohol ===
a("emergency.ateAlcohol.breadcrumbLabel", "शराब पी ली");
a("emergency.ateAlcohol.meta.title", "कुत्ते ने शराब पी: आपातकालीन गाइड | petsMetrics");
a("emergency.ateAlcohol.meta.description", "शराब अत्यधिक विषैली है। चाल असंयम, अवसाद, चयापचयी अम्लता।");
a("emergency.ateAlcohol.meta.keywords", "कुत्ते ने शराब पी, शराब विष, एथेनॉल विष");
a("emergency.ateAlcohol.banner.severityLabel", "विषैला — CNS अवरोधक");
a("emergency.ateAlcohol.banner.title", "कुत्ते ने शराब पी: आपातकालीन गाइड");
a("emergency.ateAlcohol.banner.subtitle", "शराब CNS अवरोधक है। तुरंत ASPCA <strong>(888) 426-4435</strong> पर कॉल करें।");
a("emergency.ateAlcohol.banner.cta", "पास में आपातकालीन पशु चिकित्सक खोजें");
a("emergency.ateAlcohol.article.headline", "कुत्ते ने शराब पी: आपातकालीन गाइड");
a("emergency.ateAlcohol.article.description", "शराब विष के लिए आपातकालीन गाइड।");
a("emergency.ateAlcohol.article.ogTitle", "कुत्ते ने शराब पी: आपातकालीन गाइड | petsMetrics");
a("emergency.ateAlcohol.article.ogDescription", "शराब पीने पर क्या करें।");
a("emergency.ateAlcohol.riskAssessment.formHeader", "पेय प्रकार");
a("emergency.ateAlcohol.science.content", "एथेनॉल तेजी से अवशोषित होता है। कुत्ते मनुष्यों की तुलना में 3-5 गुना अधिक संवेदनशील हैं। CNS अवरोध, श्वसन अवरोध, चयापचयी अम्लता। घातक खुराक 5.5 mL/kg (ASPCA, 2023)।");
a("emergency.ateAlcohol.toxicityData.minimum", "शुद्ध एथेनॉल 1.5 mL/kg से नशा");
a("emergency.ateAlcohol.toxicityData.ld50", "LD50: शुद्ध एथेनॉल ~5.5 mL/kg");
a("emergency.ateAlcohol.toxicityData.source", "स्रोत: Merck पशु चिकित्सा; ASPCA");
a("emergency.ateAlcohol.toxicityData.example", "12oz बीयर छोटे कुत्ते में गंभीर नशा का कारण बन सकती है।");

// === emergency.ateMacadamiaNuts ===
a("emergency.ateMacadamiaNuts.breadcrumbLabel", "मैकाडामिया नट्स खा लिए");
a("emergency.ateMacadamiaNuts.meta.title", "कुत्ते ने मैकाडामिया नट्स खाए: अभी क्या करें | petsMetrics");
a("emergency.ateMacadamiaNuts.meta.description", "मैकाडामिया नट्स विषैले हैं। पिछले पैरों में कमजोरी, कंपन, बुखार।");
a("emergency.ateMacadamiaNuts.meta.keywords", "कुत्ते ने मैकाडामिया खाए, मैकाडामिया विष");
a("emergency.ateMacadamiaNuts.banner.severityLabel", "खतरनाक — पशु चिकित्सा आवश्यक");
a("emergency.ateMacadamiaNuts.banner.title", "कुत्ते ने मैकाडामिया नट्स खाए: अभी क्या करें");
a("emergency.ateMacadamiaNuts.banner.subtitle", "मैकाडामिया नट्स कुत्तों के लिए विशिष्ट रूप से विषैले हैं। ASPCA (888) 426-4435 पर कॉल करें।");
a("emergency.ateMacadamiaNuts.banner.cta", "पास में आपातकालीन पशु चिकित्सक खोजें");
a("emergency.ateMacadamiaNuts.article.headline", "कुत्ते ने मैकाडामिया नट्स खाए: अभी क्या करें");
a("emergency.ateMacadamiaNuts.article.description", "मैकाडामिया नट विष के लिए आपातकालीन गाइड।");
a("emergency.ateMacadamiaNuts.article.ogTitle", "कुत्ते ने मैकाडामिया नट्स खाए | petsMetrics");
a("emergency.ateMacadamiaNuts.article.ogDescription", "मैकाडामिया नट्स खाने पर क्या करें।");
a("emergency.ateMacadamiaNuts.science.content", "मैकाडामिया नट्स में अज्ञात विषैला होता है जो न्यूरोमस्कुलर तंड्र प्रभावित करता है। पिछले अवयवों में प्रतिवर्ती कमजोरी और चाल असंयम। LD50 2.4 g/kg। लक्षण 12-48 घंटे में ठीक होते हैं (ASPCA, 2023)।");
a("emergency.ateMacadamiaNuts.toxicityData.minimum", "न्यूनतम: 0.5 g/kg (हल्के लक्षण)");
a("emergency.ateMacadamiaNuts.toxicityData.ld50", "LD50: 2.4 g/kg (गंभीर)");
a("emergency.ateMacadamiaNuts.toxicityData.source", "स्रोत: Morton, 2002");
a("emergency.ateMacadamiaNuts.toxicityData.example", "15kg का कुत्ता 15g नट्स पर विषैला सीमा तक पहुंचता है।");

// === emergency.ateMushrooms ===
a("emergency.ateMushrooms.breadcrumbLabel", "मशरूम खा लिया");
a("emergency.ateMushrooms.meta.title", "कुत्ते ने बगीचे में मशरूम खाया: आपातकालीन गाइड | petsMetrics");
a("emergency.ateMushrooms.meta.description", "जंगली मशरूम जानलेवे हो सकते हैं। Amanita विष यकृत विफलता कारण।");
a("emergency.ateMushrooms.meta.keywords", "कुत्ते ने मशरूम खाया, मशरूम विष, अमानिता विष");
a("emergency.ateMushrooms.article.headline", "कुत्ते ने बगीचे में मशरूम खाया: आपातकालीन गाइड");
a("emergency.ateMushrooms.article.description", "जंगली मशरूम विष के लिए आपातकालीन गाइड।");
a("emergency.ateMushrooms.article.ogTitle", "कुत्ते ने मशरूम खाया: आपातकालीन गाइड | petsMetrics");
a("emergency.ateMushrooms.article.ogDescription", "जंगली मशरूम यकृत विफलता का कारण बन सकते हैं।");
a("emergency.ateMushrooms.banner.severityLabel", "अत्यंत विषैला — जानलेवा, देर से लक्षण");
a("emergency.ateMushrooms.banner.title", "कुत्ते ने मशरूम खाया: अभी क्या करें");
a("emergency.ateMushrooms.banner.subtitle", "मशरूम जानलेवा यकृत विफलता का कारण बन सकते हैं — लक्षण 6-24 घंटे देर से। <strong>लक्षणों का इंतजार न करें।</strong>");
a("emergency.ateMushrooms.science.content", "अमाटॉक्सिन RNA पोलिमरेज II को बाधित करता है। यकृत मुख्य लक्ष्य है। 6-12 घंटे की देरी, फिर पाचन संबंधी जलन, कुछ देर मिथ्या रिकवरी, फिर विस्फोटक यकृत विफलता और मृत्यु। 12 घंटे के भीतर उपचार पर 90% जीवित दर (ASPCA, 2023)।");
a("emergency.ateMushrooms.toxicityData.minimum", "0.1 mg/kg अमाटॉक्सिन");
a("emergency.ateMushrooms.toxicityData.ld50", "0.1mg/kg अमाटॉक्सिन संभवतः घातक");
a("emergency.ateMushrooms.toxicityData.source", "स्रोत: ASPCA पशु विष नियंत्रण केंद्र");
a("emergency.ateMushrooms.toxicityData.example", "एक Amanita phalloides 10-20kg कुत्ते को मार सकता है।");

// === emergency.ateCookedBones ===
a("emergency.ateCookedBones.breadcrumbLabel", "पके हड्डी खा लिए");
a("emergency.ateCookedBones.meta.title", "कुत्ते ने पके हड्डी खाए: आपातकालीन गाइड | petsMetrics");
a("emergency.ateCookedBones.meta.description", "पके हड्डी टूट जाती हैं और आंतों में छेद कर सकती हैं।");
a("emergency.ateCookedBones.meta.keywords", "कुत्ते ने पके हड्डी खाए, पके हड्डी खतरनाक");
a("emergency.ateCookedBones.article.headline", "कुत्ते ने पके हड्डी खाए: आपातकालीन गाइड");
a("emergency.ateCookedBones.article.description", "पके हड्डी खाने के लिए आपातकालीन गाइड।");
a("emergency.ateCookedBones.article.ogTitle", "कुत्ते ने पके हड्डी खाए | petsMetrics");
a("emergency.ateCookedBones.article.ogDescription", "पके हड्डी आंतों में क्षति कर सकती हैं।");
a("emergency.ateCookedBones.banner.severityLabel", "खतरनाक — टूटने और रुकावट का खतरा");
a("emergency.ateCookedBones.banner.title", "कुत्ते ने पके हड्डी खाए: अभी क्या करें");
a("emergency.ateCookedBones.banner.subtitle", "पके हड्डी तीखे टुकड़ों में टूट जातंी हैं जो आंतों की दीवार छेद कर सकते हैं। <strong>यह यांत्रिक आपातकाल है</strong>।");
a("emergency.ateCookedBones.science.content", "पकाना हड्डियों में कोलेजन को विकृत कर उन्हें भंगुर बनाता है। तीखे टुकड़े पाचन तंत्र की दीवार छेद कर सकते हैं, पेरिटोनाइटिस का कारण बन सकते हैं। मुर्गी की हड्डियां विशेष रूप से खतरनाक हैं (AAHA, 2023)।");
a("emergency.ateCookedBones.toxicityData.minimum", "N/A (यांत्रिक खतरा)");
a("emergency.ateCookedBones.toxicityData.ld50", "लागू नहीं — भौतिक चोट, रासायनिक विष नहीं");
a("emergency.ateCookedBones.toxicityData.source", "स्रोत: AAHA दिशानिर्देश");
a("emergency.ateCookedBones.toxicityData.example", "एक मुर्गी की हड्डी सैकड़ों सुई जैसे टुकड़ों में टूट सकती है।");

// === emergency.atePlastic ===
a("emergency.atePlastic.breadcrumbLabel", "प्लास्टिक खा लिया");
a("emergency.atePlastic.meta.title", "कुत्ते ने प्लास्टिक खाया: अभी क्या करें | petsMetrics");
a("emergency.atePlastic.meta.description", "प्लास्टिक आंतों का रुकावट कर सकता है।");
a("emergency.atePlastic.meta.keywords", "कुत्ते ने प्लास्टिक खाया, प्लास्टिक रुकावट");
a("emergency.atePlastic.article.headline", "कुत्ते ने प्लास्टिक खाया: अभी क्या करें");
a("emergency.atePlastic.article.description", "प्लास्टिक खाने के लिए आपातकालीन गाइड।");
a("emergency.atePlastic.article.ogTitle", "कुत्ते ने प्लास्टिक खाया | petsMetrics");
a("emergency.atePlastic.article.ogDescription", "प्लास्टिक आंतों का रुकावट कर सकता है।");
a("emergency.atePlastic.banner.severityLabel", "निगरानी — रुकावट आकार पर निर्भर");
a("emergency.atePlastic.banner.title", "कुत्ते ने प्लास्टिक खाया: अभी क्या करें");
a("emergency.atePlastic.banner.subtitle", "प्लास्टिक गैर-विषैला है लेकिन आंतों का रुकावट कर सकता है। आकार और आकार पर निर्भर।");
a("emergency.atePlastic.decisionGuide.safe", "2cm से छोटा: 48 घंटे मल में निगरानी करें।");
a("emergency.atePlastic.decisionGuide.call", "2-3cm या उल्टी/सुस्ती: एक्स-रे आवश्यक।");
a("emergency.atePlastic.decisionGuide.emergency", "3cm से बड़ा या लगातार उल्टी: सर्जरी आवश्यक।");
a("emergency.atePlastic.science.content", "प्लास्टिक रासायनिक रूप से निष्क्रिय है — खतरा पूरी तरह यांत्रिक है। पाइलोरस और इलियोसीकल जंक्शन में संकुचन। पूर्ण रुकावट 48-72 घंटे में आंतों का नेक्रोसिस कर सकता है (Merck, 2023)।");
a("emergency.atePlastic.toxicityData.minimum", "N/A (यांत्रिक खतरा)");
a("emergency.atePlastic.toxicityData.ld50", "लागू नहीं — भौतिक रुकावट");
a("emergency.atePlastic.toxicityData.source", "स्रोत: Merck पशु चिकित्सा, ASPCA");
a("emergency.atePlastic.toxicityData.example", "2cm की गेंद पाइलोरस से नहीं गुजरेगी।");

// === emergency.ateMedication ===
a("emergency.ateMedication.breadcrumbLabel", "दवाई खा ली");
a("emergency.ateMedication.meta.title", "कुत्ते ने मानव दवाई खाई: आपातकालीन गाइड | petsMetrics");
a("emergency.ateMedication.meta.description", "मानव दवाइयां कुत्तों के लिए घातक। इबुप्रोफेन, एसिटामिनोफेन विषैली।");
a("emergency.ateMedication.meta.keywords", "कुत्ते ने दवाई खाई, इबुप्रोफेन विष");
a("emergency.ateMedication.article.headline", "कुत्ते ने मानव दवाई खाई: आपातकालीन गाइड");
a("emergency.ateMedication.article.description", "मानव दवाई विष के लिए आपातकालीन गाइड।");
a("emergency.ateMedication.article.ogTitle", "कुत्ते ने मानव दवाई खाई | petsMetrics");
a("emergency.ateMedication.article.ogDescription", "मानव दवाइयां कुत्तों के लिए विषैली हैं।");
a("emergency.ateMedication.banner.severityLabel", "विषैला — मानव दवाई कुत्तों के लिए घातक");
a("emergency.ateMedication.banner.title", "कुत्ते ने मानव दवाई खाई: अभी क्या करें");
a("emergency.ateMedication.banner.subtitle", "मानव दवाइयां पालतू जानवरों के विषकरण का प्रमुख कारण हैं। एक गोली भी घातक हो सकती है।");
a("emergency.ateMedication.science.content", "NSAIDs (इबुप्रोफेन) जठरांत्र अल्सर और गुर्दे विफलता का कारण। एसिटामिनोफेन ग्लूटाथियोन को कम करता है और हीमोग्लोबिन को मेटहीमोग्लोबिन में बदलता है। कुत्ते ADHD दवाइयों के प्रति विशेष संवेदनशील (ASPCA, 2023)।");
a("emergency.ateMedication.toxicityData.minimum", "इबुप्रोफेन 50mg/kg, एसिटामिनोफेन 75mg/kg");
a("emergency.ateMedication.toxicityData.ld50", "इबुप्रोफेन: 100mg/kg (घातक)");
a("emergency.ateMedication.toxicityData.source", "स्रोत: ASPCA पशु विष नियंत्रण केंद्र");
a("emergency.ateMedication.toxicityData.example", "200mg इबुप्रोफेन 4kg कुत्ते में गुर्दे विफलता का कारण बन सकती है।");

// === emergency.ateRodenticide ===
a("emergency.ateRodenticide.breadcrumbLabel", "चूहे का जहर खा लिया");
a("emergency.ateRodenticide.meta.title", "कुत्ते ने चूहे का जहर खाया: आपातकालीन गाइड | petsMetrics");
a("emergency.ateRodenticide.meta.description", "चूहे का जहर अत्यंत विषैला है। एंटीकोआगुलेंट और न्यूरोटॉक्सिक प्रकार।");
a("emergency.ateRodenticide.meta.keywords", "कुत्ते ने चूहे का जहर खाया, रोडेंटिसाइड विष");
a("emergency.ateRodenticide.article.headline", "कुत्ते ने चूहे का जहर खाया: आपातकालीन गाइड");
a("emergency.ateRodenticide.article.description", "रोडेंटिसाइड विष के लिए आपातकालीन गाइड।");
a("emergency.ateRodenticide.article.ogTitle", "कुत्ते ने चूहे का जहर खाया | petsMetrics");
a("emergency.ateRodenticide.article.ogDescription", "चूहे का जहर कुत्तों के लिए जानलेवा विषैला है।");
a("emergency.ateRodenticide.banner.severityLabel", "अत्यंत विषैला — अभी कार्रवाई करें");
a("emergency.ateRodenticide.banner.title", "कुत्ते ने चूहे का जहर खाया: अभी क्या करें");
a("emergency.ateRodenticide.banner.subtitle", "चूहे का जहर सबसे घातक विषों में से एक है। <strong>लक्षणों का इंतजार न करें</strong>।");
a("emergency.ateRodenticide.riskAssessment.headers.type", "रोडेंटिसाइड प्रकार");
a("emergency.ateRodenticide.riskAssessment.headers.activeIngredient", "सक्रिय तत्व");
a("emergency.ateRodenticide.riskAssessment.headers.riskLevel", "जोखिम स्तर");
a("emergency.ateRodenticide.riskAssessment.headers.actionRequired", "आवश्यक कार्रवाई");
a("emergency.ateRodenticide.science.content", "एंटीकोआगुलेंट रोडेंटिसाइड विटामिन K एपॉक्साइड रिडक्टेज को बाधित करते हैं, जमाव कारकों की कमी का कारण। ब्रोमेथैलिन मस्तिष्क कोशिकाओं में सीरेब्रल इडीमा का कारण। कोलेकैल्सिफेरॉल हाइपरकैल्सीमिया (ASPCA, 2023)।");

// === emergency.ateTobacco ===
a("emergency.ateTobacco.breadcrumbLabel", "तंबाकू खा लिया");
a("emergency.ateTobacco.meta.title", "कुत्ते ने तंबाकू/सिगरेट खाई: आपातकालीन गाइड | petsMetrics");
a("emergency.ateTobacco.meta.description", "निकोटीन अत्यधिक विषैली है। ई-लिक्विड विशेष रूप से खतरनाक।");
a("emergency.ateTobacco.meta.keywords", "कुत्ते ने सिगरेट खाई, निकोटीन विष");
a("emergency.ateTobacco.article.headline", "कुत्ते ने तंबाकू खाया: आपातकालीन गाइड");
a("emergency.ateTobacco.article.description", "निकोटीन विष के लिए आपातकालीन गाइड।");
a("emergency.ateTobacco.article.ogTitle", "कुत्ते ने तंबाकू खाया | petsMetrics");
a("emergency.ateTobacco.article.ogDescription", "निकोटीन कुत्तों के लिए विषैली है।");
a("emergency.ateTobacco.banner.severityLabel", "विषैला — निकोटीन तेजी से अवशोषित");
a("emergency.ateTobacco.banner.title", "कुत्ते ने तंबाकू खाया: अभी क्या करें");
a("emergency.ateTobacco.banner.subtitle", "निकोटीन 20-100mg/kg पर विषैली है। ई-लिक्विड विशेष रूप से खतरनाक।");
a("emergency.ateTobacco.riskAssessment.headers.source", "निकोटीन स्रोत");
a("emergency.ateTobacco.riskAssessment.headers.amount", "मात्रा");
a("emergency.ateTobacco.riskAssessment.headers.riskLevel", "जोखिम स्तर");
a("emergency.ateTobacco.riskAssessment.headers.actionRequired", "आवश्यक कार्रवाई");
a("emergency.ateTobacco.science.content", "निकोटीन निकोटिनिक एसिटाइलकोलीन रिसेप्टर से बंधता है। कम खुराक पर टैकीकार्डिया, उच्च रक्तचाप। उच्च खुराक पर ब्रैडीकार्डिया, श्वसन पक्षाघात, कोमा। ई-लिक्विड 1mL में 3-24mg निकोटीन (ASPCA, 2023)।");

// === emergency.ateMarijuana ===
a("emergency.ateMarijuana.breadcrumbLabel", "गाजा खा ली");
a("emergency.ateMarijuana.meta.title", "कुत्ते ने गाजा/एडिबल्स खाए: आपातकालीन गाइड | petsMetrics");
a("emergency.ateMarijuana.meta.description", "THC कुत्तों के लिए विषैली है। एडिबल्स (गमीज़, ब्राउनी) अत्यधिक खतरनाक।");
a("emergency.ateMarijuana.meta.keywords", "कुत्ते ने गाजा खाया, THC विष");
a("emergency.ateMarijuana.article.headline", "कुत्ते ने गाजा/एडिबल्स खाए: आपातकालीन गाइड");
a("emergency.ateMarijuana.article.description", "THC विष के लिए आपातकालीन गाइड।");
a("emergency.ateMarijuana.article.ogTitle", "कुत्ते ने गाजा खाया | petsMetrics");
a("emergency.ateMarijuana.article.ogDescription", "गाजा एडिबल्स कुत्तों के लिए विषैले हैं।");
a("emergency.ateMarijuana.banner.severityLabel", "खतरनाक — कैनबिस एडिबल्स अत्यधिक विषैले");
a("emergency.ateMarijuana.banner.title", "कुत्ते ने गाजा/एडिबल्स खाए: अभी क्या करें");
a("emergency.ateMarijuana.banner.subtitle", "कुत्ते मनुष्यों की तुलना में THC के प्रति अधिक संवेदनशील हैं।");
a("emergency.ateMarijuana.honestySection.title", "📋 महत्वपूर्ण: पशु चिकित्सक से ईमानदार रहें");
a("emergency.ateMarijuana.honestySection.content", "पशु चिकित्सकों का कर्तव्य है <strong>इलाज करना, रिपोर्ट नहीं</strong>। सटीक जानकारी सही देखभाल सुनिश्चित करती है।");
a("emergency.ateMarijuana.riskAssessment.headers.productType", "उत्पाद प्रकार");
a("emergency.ateMarijuana.riskAssessment.headers.amountEaten", "खाई गई मात्रा");
a("emergency.ateMarijuana.riskAssessment.headers.riskLevel", "जोखिम स्तर");
a("emergency.ateMarijuana.riskAssessment.headers.actionRequired", "आवश्यक कार्रवाई");
a("emergency.ateMarijuana.science.content", "THC CB1 कैनबिनोइड रिसेप्टर से बंधता है। कुत्तों में सेरेबेलम और ब्रेनस्टेम में उच्च घनत्व THC संवेदनशीलता की व्याख्या करता है। एडिबल्स खतरनाक हैं क्योंकि यकृत 11-हाइड्रॉक्सी-THC बनाता है जो 5x अधिक मनःप्रभावी है (ASPCA, 2023)।");

// === emergency.ateXylitolGum ===
a("emergency.ateXylitolGum.breadcrumbLabel", "ज़ा�लिटॉल गम खाया");
a("emergency.ateXylitolGum.meta.title", "कुत्ते ने ज़ाइलिटॉल गम खाया: आपातकालीन गाइड | petsMetrics");
a("emergency.ateXylitolGum.meta.description", "ज़ाइलिटॉल अत्यंत विषैला है। एक गम भी घातक हो सकता है।");
a("emergency.ateXylitolGum.meta.keywords", "कुत्ते ने ज़ाइलिटॉल गम खाया, ज़ाइलिटॉल विष");
a("emergency.ateXylitolGum.article.headline", "कुत्ते ने ज़ाइलिटॉल गम खाया: आपातकालीन गाइड");
a("emergency.ateXylitolGum.article.description", "ज़ाइलिटॉल विष के लिए आपातकालीन गाइड।");
a("emergency.ateXylitolGum.article.ogTitle", "कुत्ते ने ज़ाइलिटॉल गम खाया | petsMetrics");
a("emergency.ateXylitolGum.article.ogDescription", "ज़ाइलिटॉल कुत्तों के लिए घातक विषैला है।");
a("emergency.ateXylitolGum.banner.severityLabel", "अत्यंत विषैला — एक गम भी घातक");
a("emergency.ateXylitolGum.banner.title", "कुत्ते ने ज़ाइलिटॉल गम खाया: अभी क्या करें");
a("emergency.ateXylitolGum.banner.subtitle", "ज़ाइलिटॉल हाइपोग्लाइसीमिया और यकृत विफलता का कारण। <strong>एक गम छोटे कुत्ते को मार सकता है।</strong>");
a("emergency.ateXylitolGum.riskAssessment.headers.amountEaten", "खाई गई मात्रा");
a("emergency.ateXylitolGum.riskAssessment.headers.xylitolContent", "ज़ाइलिटॉल सामग्री");
a("emergency.ateXylitolGum.riskAssessment.headers.riskLevel", "जोखिम स्तर");
a("emergency.ateXylitolGum.riskAssessment.headers.actionRequired", "आवश्यक कार्रवाई");
a("emergency.ateXylitolGum.science.content", "ज़ाइलिटॉल 6-7x इंसुलिन रिलीज कारण। रक्त शर्करा 60mg/dL से नीचे। उच्च खुराक (>0.5g/kg) यकृत नेक्रोसिस कारण (ASPCA, 2023)।");

// === emergency.ateChocolate ===
a("emergency.ateChocolate.breadcrumbLabel", "चॉकलेट खा ली");
a("emergency.ateChocolate.meta.title", "कुत्ते ने चॉकलेट खाई: अभी क्या करें | petsMetrics");
a("emergency.ateChocolate.meta.description", "चॉकलेट में थियोब्रोमिन विषैला है। कुत्ते इसे चयापचय नहीं कर सकते।");
a("emergency.ateChocolate.meta.keywords", "कुत्ते ने चॉकलेट खाई, चॉकलेट विष");
a("emergency.ateChocolate.article.headline", "कुत्ते ने चॉकलेट खाई: अभी क्या करें");
a("emergency.ateChocolate.article.description", "चॉकलेट विष के लिए आपातकालीन गाइड।");
a("emergency.ateChocolate.article.ogTitle", "कुत्ते ने चॉकलेट खाई | petsMetrics");
a("emergency.ateChocolate.article.ogDescription", "चॉकलेट खाने पर क्या करें।");
a("emergency.ateChocolate.banner.severityLabel", "विषैला — तत्काल पशु चिकित्सा");
a("emergency.ateChocolate.banner.title", "कुत्ते ने चॉकलेट खाई: अभी क्या करें");
a("emergency.ateChocolate.banner.subtitle", "चॉकलेट में थियोब्रोमिन होता है जो कुत्तों में विषैला है।");
a("emergency.ateChocolate.riskAssessment.headers.theobromine", "थियोब्रोमिन स्तर");
a("emergency.ateChocolate.science.content", "थियोब्रोमिन और कैफीन मेथिलजैंथीन कुत्तों में बहुत धीमे चयापचय होते हैं। मनुष्यों में 2-3 घंटे, कुत्तों में 17.5 घंटे। CNS, हृदय, संकुचन प्रभावित। उच्च खुराक पर दौरे, अनियमित धड़कन (ASPCA, 2023)।");

// === emergency.ateGrapes ===
a("emergency.ateGrapes.breadcrumbLabel", "अंगूर खा लिए");
a("emergency.ateGrapes.meta.title", "कुत्ते ने अंगूर खाए: क्या करें | petsMetrics");
a("emergency.ateGrapes.meta.description", "अंगूर और किशमिश गुर्दे विफलता का कारण।");
a("emergency.ateGrapes.meta.keywords", "कुत्ते ने अंगूर खाए, अंगूर विष");
a("emergency.ateGrapes.article.headline", "कुत्ते ने अंगूर खाए: क्या करें");
a("emergency.ateGrapes.article.description", "अंगूर विष के लिए आपातकालीन गाइड।");
a("emergency.ateGrapes.article.ogTitle", "कुत्ते ने अंगूर खाए | petsMetrics");
a("emergency.ateGrapes.article.ogDescription", "अंगूर गुर्दे विफलता का कारण।");
a("emergency.ateGrapes.banner.severityLabel", "विषैला — तत्काल पशु चिकित्सा");
a("emergency.ateGrapes.banner.title", "कुत्ते ने अंगूर खाए: क्या करें");
a("emergency.ateGrapes.banner.subtitle", "अंगूर और किशमिश गुर्दे विफलता का कारण। छोटी मात्रा भी खतरनाक।");
a("emergency.ateGrapes.science.content", "टार्ट्रिक अम्ल संदिग्ध विषैला। अचानक गुर्दे विफलता। विषैली खुरा�क अप्रत्याशित। कुछ अंगूर भी खतरनाक (ASPCA, 2023)।");

// === emergency.ateXylitol ===
a("emergency.ateXylitol.breadcrumbLabel", "ज़ाइलिटॉल खा लिया");
a("emergency.ateXylitol.meta.title", "कुत्ते ने ज़ाइलिटॉल खाया: तत्काल क्या करें | petsMetrics");
a("emergency.ateXylitol.meta.description", "ज़ाइलिटॉल तेजी से हाइपोग्लाइसीमिया और यकृत विफलता कारण।");
a("emergency.ateXylitol.meta.keywords", "कुत्ते ने ज़ाइलिटॉल खाया, ज़ाइलिटॉल विष");
a("emergency.ateXylitol.article.headline", "कुत्ते ने ज़ाइलिटॉल खाया: तत्काल क्या करें");
a("emergency.ateXylitol.article.description", "ज़ाइलिटॉल विष के लिए आपातकालीन गाइड।");
a("emergency.ateXylitol.article.ogTitle", "कुत्ते ने ज़ाइलिटॉल खाया | petsMetrics");
a("emergency.ateXylitol.article.ogDescription", "ज़ाइलिटॉल तेजी से खतरनाक।");
a("emergency.ateXylitol.banner.severityLabel", "अत्यधिक विषैला — तत्काल पशु चिकित्सा");
a("emergency.ateXylitol.banner.title", "कुत्ते ने ज़ाइलिटॉल खाया: तत्काल क्या करें");
a("emergency.ateXylitol.banner.subtitle", "ज़ाइलिटॉल हाइपोग्लाइसीमिया और यकृत विफलता कारण। छोटी मात्रा भी जानलेवा।");
a("emergency.ateXylitol.science.content", "ज़ाइलिटॉल तेजी से इंसुलिन रिलीज कारण। 10-30 मिनट में रक्त शर्करा गिरता है। उच्च खुराक पर यकृत विफलता (ASPCA, 2023)।");

// === emergency.ateOnion ===
a("emergency.ateOnion.breadcrumbLabel", "प्याज खा लिया");
a("emergency.ateOnion.meta.title", "कुत्ते ने प्याज खाया: क्या करें | petsMetrics");
a("emergency.ateOnion.meta.description", "प्याज हेमोलिटिक एनीमिया का कारण। सभी रूप विषैले।");
a("emergency.ateOnion.meta.keywords", "कुत्ते ने प्याज खाया, प्याज विष");
a("emergency.ateOnion.article.headline", "कुत्ते ने प्याज खाया: क्या करें");
a("emergency.ateOnion.article.description", "प्याज विष के लिए आपातकालीन गाइड।");
a("emergency.ateOnion.article.ogTitle", "कुत्ते ने प्याज खाया | petsMetrics");
a("emergency.ateOnion.article.ogDescription", "प्याज हेमोलिटिक एनीमिया कारण।");
a("emergency.ateOnion.banner.severityLabel", "विषैला — पशु चिकित्सा से मिलें");
a("emergency.ateOnion.banner.title", "कुत्ते ने प्याज खाया: क्या करें");
a("emergency.ateOnion.banner.subtitle", "प्याज हेमोलिटिक एनीमिया कारण। सभी रूप विषैले।");
a("emergency.ateOnion.science.content", "प्याज में थायोसल्फेट रक्त कोशिकाओं में ऑक्सीडेटिव क्षति। हेन्ज बॉडीज़ बनते हैं। प्लीहा क्षतिग्रस्त कोशिकाएं नष्ट करता है। हेमोलिटिक एनीमिया 1-3 दिन में (ASPCA, 2023)।");

// === emergency.ateSock ===
a("emergency.ateSock.breadcrumbLabel", "मोज़ा खा लिया");
a("emergency.ateSock.meta.title", "पिल्ले ने मोज़ा खाया: क्या करें | petsMetrics");
a("emergency.ateSock.meta.description", "मोज़ा आंतों का रुकावट कर सकता है। सर्जरी आवश्यक।");
a("emergency.ateSock.meta.keywords", "पिल्ले ने मोज़ा खाया, मोज़ा रुकावट");
a("emergency.ateSock.article.headline", "पिल्ले ने मोज़ा खाया: क्या करें");
a("emergency.ateSock.article.description", "विदेशी वस्तु खाने के लिए आपातकालीन गाइड।");
a("emergency.ateSock.article.ogTitle", "पिल्ले ने मोज़ा खाया | petsMetrics");
a("emergency.ateSock.article.ogDescription", "मोज़ा आंतों का रुकावट कर सकता है।");
a("emergency.ateSock.banner.severityLabel", "विदेशी वस्तु — पशु चिकित्सा से मिलें");
a("emergency.ateSock.banner.title", "पिल्ले ने मोज़ा खाया: क्या करें");
a("emergency.ateSock.banner.subtitle", "मोज़ा आंतों का रुकावट कर सकता है। तुरंत पशु चिकित्सक कोल करें।");
a("emergency.ateSock.science.content", "कपड़े की विदेशी वस्तु पाइलोरस या छोटी आंत में फंस जाती है। पूर्ण रुकावट, आंत का नेक्रोसिस, छेद, पेरिटोनाइटिस, मृत्यु। पिल्ले और छोटे कुत्ते अधिक जोखिम में (AVMA, 2023)।");

// === emergency.ateAntifreeze ===
a("emergency.ateAntifreeze.breadcrumbLabel", "एंटीफ्रीज पी लिया");
a("emergency.ateAntifreeze.meta.title", "कुत्ते ने एंटीफ्रीज पी: तत्काल क्या करें | petsMetrics");
a("emergency.ateAntifreeze.meta.description", "एथिलीन ग्लाइकॉल तेजी से गुर्दे विफलता और मृत्यु कारण।");
a("emergency.ateAntifreeze.meta.keywords", "कुत्ते ने एंटीफ्रीज पी, एथिलीन ग्लाइकॉल विष");
a("emergency.ateAntifreeze.article.headline", "कुत्ते ने एंटीफ्रीज पी: तत्काल क्या करें");
a("emergency.ateAntifreeze.article.description", "एंटीफ्रीज विष के लिए आपातकालीन गाइड।");
a("emergency.ateAntifreeze.article.ogTitle", "कुत्ते ने एंटीफ्रीज पी | petsMetrics");
a("emergency.ateAntifreeze.article.ogDescription", "एंटीफ्रीज तेजी से गुर्दे विफलता कारण।");
a("emergency.ateAntifreeze.banner.severityLabel", "अत्यंत विषैला — अभी आपातकालीन पशु चिकित्सक");
a("emergency.ateAntifreeze.banner.title", "कुत्ते ने एंटीफ्रीज पी: तत्काल क्या करें");
a("emergency.ateAntifreeze.banner.subtitle", "एंटीफ्रीज तेजी से गुर्दे विफलता और मृत्यु कारण। एक चम्मच भी घातक।");
a("emergency.ateAntifreeze.science.content", "एथिलीन ग्लाइकॉल अपने आप विषैला नहीं — यकृत में उपचयन से विषैले उपचय बनते हैं। ऑक्सैलिक अम्ल कैल्शियम ऑक्सीलेट क्रिस्टल बनाता है जो गुर्दे के ऊतक नष्ट करता है। 12-36 घंटे में गुर्दे विफलता (ASPCA, 2023)।");
