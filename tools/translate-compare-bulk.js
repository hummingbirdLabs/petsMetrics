/**
 * i18n Bulk Compare Translator
 * 
 * Reads en.json compare namespace, translates ALL strings for a target language,
 * writes the translated compare section back to the target JSON.
 * 
 * Usage: node tools/translate-compare-bulk.js <lang-code>
 */

const fs = require('fs');
const path = require('path');

function readJson(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8').replace(/^\uFEFF/, '');
  return JSON.parse(raw);
}

// ================================================================
// FRENCH COMPLETE COMPARE TRANSLATIONS
// ================================================================
const fr = {
  // Top-level
  'quickComparison': 'Tableau Comparatif Rapide',
  'atAGlance': 'En un coup d\'œil — {topicA} vs {topicB} :',
  'deepDive': 'Analyse Approfondie : {topicName}',
  'considerations': 'Considérations',
  'significantConcerns': 'Préoccupations Majeures',
  'risks': 'Risques',
  'limitations': 'Limitations',
  'tradeOffs': 'Compromis et Risques Accrus',
  'bestFor': 'Idéal pour :',
  'theVerdict': 'Le Verdict',
  'faq': 'Foire Aux Questions',
  'references': 'Références et Sources de Données',
  'lastUpdated': 'Dernière mise à jour : {date} · Données vérifiées auprès de {sources}.',
  'dimension': 'Dimension',
  'breedMatters': 'La race compte. Les Golden Retrievers, Bergers Allemands et Boxers ont des risques de cancer, espérances de vie et besoins alimentaires différents. Consultez toujours votre vétérinaire.',
  'rawWarning': 'Les régimes crus présentent des risques bactériens (Salmonella, Campylobacter). Consultez toujours un nutritionniste vétérinaire avant de passer au cru.',
  'breedWarning': 'La race compte.',

  // dryVsWet
  'dryVsWet.title': 'Croquettes vs Nourriture Humide pour Chiens : Laquelle Choisir ?',
  'dryVsWet.subtitle': 'Une comparaison scientifique des croquettes et des aliments en conserve — couvrant le coût, la santé dentaire, l\'hydratation et la valeur nutritionnelle.',
  'dryVsWet.topicAName': 'Croquettes (Nourriture Sèche)',
  'dryVsWet.topicBName': 'Nourriture Humide (Boîtes/Sachets)',
  'dryVsWet.topicA.pros.0.title': 'Économique',
  'dryVsWet.topicA.pros.0.body': 'Les croquettes coûtent 0,30–0,80 $ par jour pour un chien de 30 kg, contre 1,50–4,00 $ pour la nourriture humide. Économisez 400–1 300 $/an.',
  'dryVsWet.topicA.pros.1.title': 'Bienfaits Dentaires',
  'dryVsWet.topicA.pros.1.body': 'Le croquant mécanique des croquettes dures peut aider à réduire l\'accumulation de tartre. Cependant, cet avantage est souvent exagéré — le brossage régulier reste la référence.',
  'dryVsWet.topicA.pros.2.title': 'Longue Conservation et Pratique',
  'dryVsWet.topicA.pros.2.body': 'Pas de réfrigération nécessaire. Peut être laissé toute la journée pour l\'alimentation libre. Idéal pour les distributeurs automatiques.',
  'dryVsWet.topicA.pros.3.title': 'Formule Complète et Équilibrée',
  'dryVsWet.topicA.pros.3.body': 'Les croquettes certifiées AAFCO sont formulées pour répondre à tous les besoins nutritionnels sans supplémentation.',
  'dryVsWet.topicA.cons.0.title': 'Moins Appétent',
  'dryVsWet.topicA.cons.0.body': 'Beaucoup de chiens préfèrent la nourriture humide. Les mangeurs difficiles peuvent refuser les croquettes ou nécessiter des compléments.',
  'dryVsWet.topicA.cons.1.title': 'Faible Teneur en Eau (6–10 %)',
  'dryVsWet.topicA.cons.1.body': 'Les chiens nourris exclusivement aux croquettes peuvent être chroniquement légèrement déshydratés. Cela peut contribuer aux cristaux urinaires et au stress rénal avec le temps.',
  'dryVsWet.topicA.cons.2.title': 'Très Transformé',
  'dryVsWet.topicA.cons.2.body': 'La cuisson par extrusion à haute température dénature les protéines et peut former de l\'acrylamide dans certaines formules à base de céréales.',
  'dryVsWet.topicA.bestFor': 'Chiens adultes actifs, grandes races, foyers multi-chiens à petit budget et propriétaires souhaitant la commodité de l\'alimentation libre.',
  'dryVsWet.topicB.pros.0.title': 'Forte Teneur en Eau (75–85 %)',
  'dryVsWet.topicB.pros.0.body': 'La nourriture humide augmente naturellement l\'apport en eau, crucial pour la santé urinaire. Particulièrement bénéfique pour les chiens sujets aux infections urinaires, cristaux ou problèmes rénaux.',
  'dryVsWet.topicB.pros.1.title': 'Plus Appétent',
  'dryVsWet.topicB.pros.1.body': 'Arôme plus fort et texture plus charnue. Même les chiens difficiles mangent généralement la nourriture humide avec enthousiasme.',
  'dryVsWet.topicB.pros.2.title': 'Moins Transformé',
  'dryVsWet.topicB.pros.2.body': 'Généralement cuit à des températures plus basses que l\'extrusion des croquettes. Conserve plus de nutriments naturels et la texture de la viande.',
  'dryVsWet.topicB.pros.3.title': 'Teneur Plus Élevée en Protéines',
  'dryVsWet.topicB.pros.3.body': 'Contient généralement plus de protéines animales et moins de charges glucidiques que les croquettes.',
  'dryVsWet.topicB.cons.0.title': 'Texture Molle',
  'dryVsWet.topicB.cons.0.body': 'Ne fournit pas l\'abrasion mécanique qui aide à nettoyer les dents.',
  'dryVsWet.topicB.cons.1.title': 'Coûteux',
  'dryVsWet.topicB.cons.1.body': 'Nourrir un chien de 30 kg exclusivement avec de la nourriture humide coûte 1,50–4,00 $/jour (550–1 460 $/an).',
  'dryVsWet.topicB.cons.2.title': 'Courte Conservation Après Ouverture',
  'dryVsWet.topicB.cons.2.body': 'Doit être réfrigéré et utilisé dans les 24–48 heures. Ne convient pas à l\'alimentation libre.',
  'dryVsWet.topicB.cons.3.title': 'Teneur Élevée en Matières Grasses',
  'dryVsWet.topicB.cons.3.body': 'Certaines nourritures humides contiennent 15–25 % de matières grasses (sur matière sèche), ce qui peut contribuer à la pancréatite chez les races prédisposées.',
  'dryVsWet.topicB.bestFor': 'Chiens âgés, petites races, mangeurs difficiles, chiens avec problèmes dentaires, patients rénaux/urinaires et chiens devant augmenter leur apport en eau.',
  'dryVsWet.rows.0.dimension': 'Coût Quotidien (Chien de 30 kg)',
  'dryVsWet.rows.0.topicA': '0,30–0,80 $',
  'dryVsWet.rows.0.topicB': '1,50–4,00 $',
  'dryVsWet.rows.1.dimension': 'Teneur en Eau',
  'dryVsWet.rows.1.topicA': '6–10 %',
  'dryVsWet.rows.1.topicB': '75–85 %',
  'dryVsWet.rows.2.dimension': 'Protéines (Matière Sèche)',
  'dryVsWet.rows.2.topicA': '18–30 %',
  'dryVsWet.rows.2.topicB': '35–55 %',
  'dryVsWet.rows.3.dimension': 'Conservation',
  'dryVsWet.rows.3.topicA': 'Mois (température ambiante)',
  'dryVsWet.rows.3.topicB': '24–48 heures (réfrigéré)',
  'dryVsWet.rows.4.dimension': 'Santé Dentaire',
  'dryVsWet.rows.4.topicA': '✅ Aide à réduire le tartre',
  'dryVsWet.rows.4.topicB': '⚠️ Pas de bénéfice mécanique',
  'dryVsWet.rows.5.dimension': 'Hydratation',
  'dryVsWet.rows.5.topicA': '⚠️ Nécessite un apport en eau supplémentaire',
  'dryVsWet.rows.5.topicB': '✅ Excellente hydratation',
  'dryVsWet.rows.6.dimension': 'Appétence',
  'dryVsWet.rows.6.topicA': 'Modérée',
  'dryVsWet.rows.6.topicB': 'Élevée',
  'dryVsWet.rows.7.dimension': 'Niveau de Transformation',
  'dryVsWet.rows.7.topicA': 'Élevé (extrusion)',
  'dryVsWet.rows.7.topicB': 'Modéré',
  'dryVsWet.verdict': '<strong>La plupart des chiens se portent bien avec une alimentation mixte.</strong> Une base de croquettes de qualité avec de la nourriture humide en complément ou en repas occasionnel vous donne le meilleur des deux mondes : économies, bienfaits dentaires et hydratation adéquate. Si le budget le permet, nourrissez 50/50 sec et humide.',
  'dryVsWet.faq.0.question': 'Puis-je mélanger croquettes et nourriture humide ?',
  'dryVsWet.faq.0.answer': 'Oui, c\'est en fait l\'approche recommandée. De nombreux vétérinaires suggèrent une alimentation mixte pour profiter des avantages des deux types.',
  'dryVsWet.faq.1.question': 'La nourriture humide est-elle meilleure pour les chiens âgés ?',
  'dryVsWet.faq.1.answer': 'Oui, les chiens âgés bénéficient de la teneur plus élevée en eau pour la santé rénale, et la texture plus molle est plus facile à mâcher pour les chiens ayant des problèmes dentaires.',
  'dryVsWet.faq.2.question': 'Les croquettes sont-elles mauvaises pour les dents ?',
  'dryVsWet.faq.2.answer': 'Non, les croquettes ne sont pas mauvaises pour les dents. Elles peuvent aider à réduire le tartre par action mécanique, mais le brossage régulier reste la meilleure méthode de soin dentaire.',
  'dryVsWet.faq.3.question': 'Quelle quantité de nourriture humide dois-je donner ?',
  'dryVsWet.faq.3.answer': 'Cela dépend du poids, de l\'âge et du niveau d\'activité de votre chien. Utilisez notre calculateur de calories pour obtenir une estimation personnalisée.',

  // indoorVsOutdoor
  'indoorVsOutdoor.title': 'Chats d\'Intérieur vs d\'Extérieur : Comparaison de Durée de Vie, Santé et Sécurité',
  'indoorVsOutdoor.subtitle': 'Comparaison basée sur les données des chats d\'intérieur exclusif et d\'extérieur — couvrant la durée de vie, les risques de maladie, les taux de blessures et l\'impact environnemental.',
  'indoorVsOutdoor.topicAName': 'Chats d\'Intérieur Exclusif',
  'indoorVsOutdoor.topicBName': 'Chats avec Accès à l\'Extérieur',
  'indoorVsOutdoor.topicA.pros.0.title': 'Durée de Vie Plus Longue',
  'indoorVsOutdoor.topicA.pros.0.body': 'Les chats d\'intérieur vivent 12–20 ans en moyenne. Les chats d\'extérieur vivent en moyenne 2–5 ans en raison des traumatismes, maladies et prédation.',
  'indoorVsOutdoor.topicA.pros.1.title': 'Risque de Maladie Réduit',
  'indoorVsOutdoor.topicA.pros.1.body': 'Protégés contre la transmission du FIV, FeLV, PIF, des endoparasites et des abcès par morsure lors de bagarres.',
  'indoorVsOutdoor.topicA.pros.2.title': 'Coûts Vétérinaires Réduits',
  'indoorVsOutdoor.topicA.pros.2.body': 'Moins de visites d\'urgence pour traumatismes (accidents de voiture, attaques de chiens). Coûts de prévention parasitaire réduits.',
  'indoorVsOutdoor.topicA.pros.3.title': 'Protection de l\'Environnement',
  'indoorVsOutdoor.topicA.pros.3.body': 'Pas de prédation sur les oiseaux indigènes, petits mammifères et reptiles. Les chats sont responsables de milliards de morts de faune sauvage chaque année.',
  'indoorVsOutdoor.topicA.cons.0.title': 'Risque d\'Ennui et d\'Obésité',
  'indoorVsOutdoor.topicA.cons.0.body': 'Nécessite un enrichissement environnemental dédié — structures d\'escalade, distributeurs de puzzle, jeu interactif — pour prévenir la prise de poids et les problèmes comportementaux.',
  'indoorVsOutdoor.topicA.cons.1.title': 'Problèmes Comportementaux si Sous-Stimulé',
  'indoorVsOutdoor.topicA.cons.1.body': 'Marquage urinaire, griffades, agression entre chats et vocalisations excessives peuvent se développer avec un enrichissement insuffisant.',
  'indoorVsOutdoor.topicA.cons.2.title': 'Pas de Comportements Naturels',
  'indoorVsOutdoor.topicA.cons.2.body': 'Ne peut exprimer les comportements naturels de chasse, d\'escalade et de patrouille sans effort dédié du propriétaire.',
  'indoorVsOutdoor.topicA.bestFor': 'La plupart des propriétaires de chats urbains/banlieusards qui peuvent fournir un enrichissement environnemental adéquat.',
  'indoorVsOutdoor.topicB.pros.0.title': 'Exercice et Stimulation Mentale',
  'indoorVsOutdoor.topicB.pros.0.body': 'Comportements naturels d\'escalade, de chasse et d\'exploration. Les chats d\'extérieur sont généralement plus minces avec un meilleur tonus musculaire.',
  'indoorVsOutdoor.topicB.pros.1.title': 'Griffades et Marquage Naturels',
  'indoorVsOutdoor.topicB.pros.1.body': 'L\'accès à l\'extérieur réduit les griffades et le marquage urinaire à l\'intérieur.',
  'indoorVsOutdoor.topicB.pros.2.title': 'Moins d\'Effort du Propriétaire',
  'indoorVsOutdoor.topicB.pros.2.body': 'La nature fournit le divertissement. Moins besoin de distributeurs de puzzle, de séances de jeu programmées et de structures d\'escalade.',
  'indoorVsOutdoor.topicB.cons.0.title': 'Durée de Vie Considérablement Réduite',
  'indoorVsOutdoor.topicB.cons.0.body': 'Les chats d\'extérieur meurent 3–5× plus jeunes en moyenne. Causes principales : traumatismes routiers, prédation (coyotes, chiens), empoisonnement et maladies infectieuses.',
  'indoorVsOutdoor.topicB.cons.1.title': 'Exposition Élevée aux Maladies',
  'indoorVsOutdoor.topicB.cons.1.body': 'FIV par morsures, FeLV par contact étroit, PIF par exposition au coronavirus, toxoplasmose, parasites intestinaux et maladies transmises par les tiques.',
  'indoorVsOutdoor.topicB.cons.2.title': 'Impact sur la Faune',
  'indoorVsOutdoor.topicB.cons.2.body': 'Un seul chat d\'extérieur tue 30–50 oiseaux et plus de 100 petits mammifères par an. Des dégâts écologiques considérables.',
  'indoorVsOutdoor.topicB.cons.3.title': 'Risque de Blessures et Traumatismes',
  'indoorVsOutdoor.topicB.cons.3.body': 'Bagarres, accidents de voiture, empoisonnement (antigel, rodenticides) et cruauté humaine. Les factures vétérinaires d\'urgence peuvent dépasser 5 000 $.',
  'indoorVsOutdoor.topicB.bestFor': 'Propriétés rurales avec accès extérieur contrôlé (catio, jardin clos) et propriétaires qui acceptent la durée de vie considérablement réduite.',
  'indoorVsOutdoor.rows.0.dimension': 'Durée de Vie Moyenne',
  'indoorVsOutdoor.rows.0.topicA': '12–20 ans',
  'indoorVsOutdoor.rows.0.topicB': '2–5 ans',
  'indoorVsOutdoor.rows.1.dimension': 'Risque de Maladie Infectieuse',
  'indoorVsOutdoor.rows.1.topicA': 'Très Faible',
  'indoorVsOutdoor.rows.1.topicB': 'Élevé (FIV, FeLV, PIF)',
  'indoorVsOutdoor.rows.2.dimension': 'Risque de Traumatisme',
  'indoorVsOutdoor.rows.2.topicA': 'Pratiquement Aucun',
  'indoorVsOutdoor.rows.2.topicB': 'Élevé (voitures, prédateurs)',
  'indoorVsOutdoor.rows.3.dimension': 'Coûts Vétérinaires',
  'indoorVsOutdoor.rows.3.topicA': 'Prévisibles (soins de routine)',
  'indoorVsOutdoor.rows.3.topicB': 'Imprévisibles (urgences)',
  'indoorVsOutdoor.rows.4.dimension': 'Risque d\'Obésité',
  'indoorVsOutdoor.rows.4.topicA': 'Élevé (besoin d\'enrichissement)',
  'indoorVsOutdoor.rows.4.topicB': 'Plus Faible',
  'indoorVsOutdoor.rows.5.dimension': 'Impact sur la Faune',
  'indoorVsOutdoor.rows.5.topicA': 'Aucun',
  'indoorVsOutdoor.rows.5.topicB': 'Significatif',
  'indoorVsOutdoor.rows.6.dimension': 'Stimulation Mentale',
  'indoorVsOutdoor.rows.6.topicA': 'Dépend du propriétaire',
  'indoorVsOutdoor.rows.6.topicB': 'Naturelle et abondante',
  'indoorVsOutdoor.rows.7.dimension': 'Effort du Propriétaire',
  'indoorVsOutdoor.rows.7.topicA': 'Élevé (jeu, enrichissement)',
  'indoorVsOutdoor.rows.7.topicB': 'Faible',
  'indoorVsOutdoor.verdict': '<strong>L\'approche la plus sûre et la plus recommandée est "Intérieur + Enrichissement" ou "Accès Extérieur Supervisé".</strong> Un catio, l\'entraînement en laisse ou un jardin clos offre les avantages de la stimulation extérieure sans les risques.',
  'indoorVsOutdoor.faq.0.question': 'Les chats d\'intérieur sont-ils plus heureux ?',
  'indoorVsOutdoor.faq.0.answer': 'Avec un enrichissement adéquat (arbres à chat, jouets, temps de jeu), les chats d\'intérieur peuvent être tout aussi heureux. L\'important est de répondre à leurs besoins comportementaux.',
  'indoorVsOutdoor.faq.1.question': 'Puis-je laisser mon chat sortir dans un jardin clos ?',
  'indoorVsOutdoor.faq.1.answer': 'Un jardin clos ou un catio est une excellente solution. Cela permet à votre chat de profiter de l\'extérieur en toute sécurité.',
  'indoorVsOutdoor.faq.2.question': 'Comment enrichir l\'environnement d\'un chat d\'intérieur ?',
  'indoorVsOutdoor.faq.2.answer': 'Fournissez des arbres à chat, des griffoirs, des jouets interactifs, des séances de jeu quotidiennes et des distributeurs de nourriture puzzle.',
  'indoorVsOutdoor.faq.3.question': 'Mon chat d\'intérieur a-t-il besoin de vaccins ?',
  'indoorVsOutdoor.faq.3.answer': 'Oui, même les chats d\'intérieur ont besoin de vaccins de base. Discutez avec votre vétérinaire du calendrier de vaccination approprié.',
};

// ================================================================
// GERMAN COMPLETE COMPARE TRANSLATIONS
// ================================================================
const de = {
  'quickComparison': 'Schnellvergleichstabelle',
  'atAGlance': 'Auf einen Blick — {topicA} vs {topicB}:',
  'deepDive': 'Tiefer Einblick: {topicName}',
  'considerations': 'Überlegungen',
  'significantConcerns': 'Wesentliche Bedenken',
  'risks': 'Risiken',
  'limitations': 'Einschränkungen',
  'tradeOffs': 'Kompromisse & Erhöhte Risiken',
  'bestFor': 'Am besten für:',
  'theVerdict': 'Das Urteil',
  'faq': 'Häufig Gestellte Fragen',
  'references': 'Referenzen & Datenquellen',
  'lastUpdated': 'Letzte Aktualisierung: {date} · Daten geprüft anhand von {sources}.',
  'dimension': 'Dimension',
  'breedMatters': 'Die Rasse ist wichtig. Golden Retriever, Deutsche Schäferhunde und Boxer haben unterschiedliche Krebsrisiken, Lebenserwartungen und Ernährungsbedürfnisse. Konsultieren Sie immer Ihren Tierarzt.',
  'rawWarning': 'Rohfutter birgt bakterielle Risiken (Salmonellen, Campylobacter). Konsultieren Sie immer einen tierärztlichen Ernährungsberater, bevor Sie auf Rohfutter umstellen.',
  'breedWarning': 'Die Rasse ist wichtig.',

  'dryVsWet.title': 'Trockenfutter vs Nassfutter für Hunde: Was ist richtig?',
  'dryVsWet.subtitle': 'Ein wissenschaftlicher Vergleich von Trockenfutter und Dosenfutter — mit Kosten, Zahngesundheit, Hydratation und Nährwert.',
  'dryVsWet.topicAName': 'Trockenfutter',
  'dryVsWet.topicBName': 'Nassfutter (Dosen/Beutel)',
  'dryVsWet.topicA.pros.0.title': 'Kostengünstig',
  'dryVsWet.topicA.pros.0.body': 'Trockenfutter kostet 0,30–0,80 $ pro Tag für einen 30-kg-Hund, gegenüber 1,50–4,00 $ für Nassfutter. Sparen Sie 400–1.300 $/Jahr.',
  'dryVsWet.topicA.pros.1.title': 'Zahnvorteile',
  'dryVsWet.topicA.pros.1.body': 'Die mechanische Kaurwirkung von hartem Trockenfutter kann helfen, Zahnsteinbildung zu reduzieren. Regelmäßiges Zähneputzen bleibt jedoch der Goldstandard.',
  'dryVsWet.topicA.pros.2.title': 'Lagerstabil & Praktisch',
  'dryVsWet.topicA.pros.2.body': 'Keine Kühlung erforderlich. Kann den ganzen Tag für freie Fütterung stehen bleiben. Ideal für automatische Futterautomaten.',
  'dryVsWet.topicA.pros.3.title': 'Vollständig & Ausgewogen',
  'dryVsWet.topicA.pros.3.body': 'AAFCO-zertifiziertes Trockenfutter ist so formuliert, dass es alle Nährstoffanforderungen ohne Ergänzung erfüllt.',
  'dryVsWet.topicA.cons.0.title': 'Geringere Schmackhaftigkeit',
  'dryVsWet.topicA.cons.0.body': 'Viele Hunde bevorzugen Nassfutter. Wählerische Esser können Trockenfutter verweigern.',
  'dryVsWet.topicA.cons.1.title': 'Niedriger Feuchtigkeitsgehalt (6–10 %)',
  'dryVsWet.topicA.cons.1.body': 'Hunde, die ausschließlich Trockenfutter erhalten, können chronisch leicht dehydriert sein. Dies kann zu Harnkristallen und Nierenbelastung führen.',
  'dryVsWet.topicA.cons.2.title': 'Stark Verarbeitet',
  'dryVsWet.topicA.cons.2.body': 'Die Extrusionskochung bei hohen Temperaturen denaturiert Proteine und kann in einigen getreidebasierten Formeln Acrylamid bilden.',
  'dryVsWet.topicA.bestFor': 'Aktive erwachsene Hunde, große Rassen, Mehrhundehaushalte mit Budget und Besitzer, die die Bequemlichkeit der freien Fütterung wünschen.',
  'dryVsWet.topicB.pros.0.title': 'Hoher Feuchtigkeitsgehalt (75–85 %)',
  'dryVsWet.topicB.pros.0.body': 'Nassfutter erhöht auf natürliche Weise die Wasseraufnahme, was für die Harngesundheit entscheidend ist. Besonders vorteilhaft für Hunde, die zu Harnwegsinfektionen neigen.',
  'dryVsWet.topicB.pros.1.title': 'Höhere Schmackhaftigkeit',
  'dryVsWet.topicB.pros.1.body': 'Stärkeres Aroma und fleischigere Textur. Selbst wählerische Hunde essen Nassfutter normalerweise mit Begeisterung.',
  'dryVsWet.topicB.pros.2.title': 'Weniger Verarbeitet',
  'dryVsWet.topicB.pros.2.body': 'Wird normalerweise bei niedrigeren Temperaturen gekocht als Trockenfutterextrusion. Bewahrt mehr natürliche Nährstoffe.',
  'dryVsWet.topicB.pros.3.title': 'Höherer Proteingehalt',
  'dryVsWet.topicB.pros.3.body': 'Enthält in der Regel mehr tierisches Protein und weniger kohlenhydratreiche Füllstoffe als Trockenfutter.',
  'dryVsWet.topicB.cons.0.title': 'Weiche Textur',
  'dryVsWet.topicB.cons.0.body': 'Bietet nicht die mechanische Abrasion, die zur Zahnreinigung beiträgt.',
  'dryVsWet.topicB.cons.1.title': 'Teuer',
  'dryVsWet.topicB.cons.1.body': 'Die ausschließliche Fütterung eines 30-kg-Hundes mit Nassfutter kostet 1,50–4,00 $/Tag (550–1.460 $/Jahr).',
  'dryVsWet.topicB.cons.2.title': 'Kurze Haltbarkeit nach dem Öffnen',
  'dryVsWet.topicB.cons.2.body': 'Muss gekühlt und innerhalb von 24–48 Stunden verbraucht werden. Nicht für freie Fütterung geeignet.',
  'dryVsWet.topicB.cons.3.title': 'Hoher Fettgehalt',
  'dryVsWet.topicB.cons.3.body': 'Einige Nassfutter enthalten 15–25 % Fett (Trockenmasse), was bei prädisponierten Rassen zu Pankreatitis beitragen kann.',
  'dryVsWet.topicB.bestFor': 'Senior-Hunde, kleine Rassen, wählerische Esser, Hunde mit Zahnproblemen, Nieren-/Harnpatienten und Hunde, die ihre Wasseraufnahme erhöhen müssen.',
  'dryVsWet.rows.0.dimension': 'Tägliche Kosten (30-kg-Hund)',
  'dryVsWet.rows.0.topicA': '0,30–0,80 $',
  'dryVsWet.rows.0.topicB': '1,50–4,00 $',
  'dryVsWet.rows.1.dimension': 'Feuchtigkeitsgehalt',
  'dryVsWet.rows.1.topicA': '6–10 %',
  'dryVsWet.rows.1.topicB': '75–85 %',
  'dryVsWet.rows.2.dimension': 'Protein (Trockenmasse)',
  'dryVsWet.rows.2.topicA': '18–30 %',
  'dryVsWet.rows.2.topicB': '35–55 %',
  'dryVsWet.rows.3.dimension': 'Lagerung',
  'dryVsWet.rows.3.topicA': 'Monate (Raumtemperatur)',
  'dryVsWet.rows.3.topicB': '24–48 Stunden (gekühlt)',
  'dryVsWet.rows.4.dimension': 'Zahngesundheit',
  'dryVsWet.rows.4.topicA': '✅ Hilft Zahnstein zu reduzieren',
  'dryVsWet.rows.4.topicB': '⚠️ Kein mechanischer Nutzen',
  'dryVsWet.rows.5.dimension': 'Hydratation',
  'dryVsWet.rows.5.topicA': '⚠️ Erfordert zusätzliche Wasseraufnahme',
  'dryVsWet.rows.5.topicB': '✅ Ausgezeichnete Hydratation',
  'dryVsWet.rows.6.dimension': 'Schmackhaftigkeit',
  'dryVsWet.rows.6.topicA': 'Mäßig',
  'dryVsWet.rows.6.topicB': 'Hoch',
  'dryVsWet.rows.7.dimension': 'Verarbeitungsgrad',
  'dryVsWet.rows.7.topicA': 'Hoch (Extrusion)',
  'dryVsWet.rows.7.topicB': 'Mäßig',
  'dryVsWet.verdict': '<strong>Die meisten Hunde kommen mit einem Mischfutteransatz gut zurecht.</strong> Eine Basis aus hochwertigem Trockenfutter mit Nassfutter als Topping oder gelegentlicher Mahlzeit gibt Ihnen das Beste aus beiden Welten.',
  'dryVsWet.faq.0.question': 'Kann ich Trocken- und Nassfutter mischen?',
  'dryVsWet.faq.0.answer': 'Ja, dies ist tatsächlich der empfohlene Ansatz. Viele Tierärzte empfehlen eine Mischfütterung, um die Vorteile beider Arten zu nutzen.',
  'dryVsWet.faq.1.question': 'Ist Nassfutter besser für ältere Hunde?',
  'dryVsWet.faq.1.answer': 'Ja, ältere Hunde profitieren vom höheren Wassergehalt für die Nierengesundheit, und die weichere Textur ist für Hunde mit Zahnproblemen leichter zu kauen.',
  'dryVsWet.faq.2.question': 'Ist Trockenfutter schlecht für die Zähne?',
  'dryVsWet.faq.2.answer': 'Nein, Trockenfutter ist nicht schlecht für die Zähne. Es kann helfen, Zahnstein durch mechanische Wirkung zu reduzieren, aber regelmäßiges Zähneputzen bleibt die beste Methode.',
  'dryVsWet.faq.3.question': 'Wie viel Nassfutter sollte ich füttern?',
  'dryVsWet.faq.3.answer': 'Dies hängt vom Gewicht, Alter und Aktivitätsniveau Ihres Hundes ab. Verwenden Sie unseren Kalorienrechner für eine personalisierte Schätzung.',

  'indoorVsOutdoor.title': 'Wohnungskatzen vs Freigänger: Lebensdauer, Gesundheit & Sicherheit im Vergleich',
  'indoorVsOutdoor.subtitle': 'Datengestützter Vergleich von reinen Wohnungskatzen und Freigängern — mit Lebensdauer, Krankheitsrisiko, Verletzungsraten und Umweltauswirkungen.',
  'indoorVsOutdoor.topicAName': 'Reine Wohnungskatzen',
  'indoorVsOutdoor.topicBName': 'Freigänger-Katzen',
  'indoorVsOutdoor.topicA.pros.0.title': 'Längere Lebensdauer',
  'indoorVsOutdoor.topicA.pros.0.body': 'Wohnungskatzen leben durchschnittlich 12–20 Jahre. Freigänger leben durchschnittlich 2–5 Jahre aufgrund von Trauma, Krankheit und Raubtieren.',
  'indoorVsOutdoor.topicA.pros.1.title': 'Geringeres Krankheitsrisiko',
  'indoorVsOutdoor.topicA.pros.1.body': 'Geschützt vor FIV-, FeLV-, FIP-Übertragung, Endoparasiten und Bissabszessen durch Katzenkämpfe.',
  'indoorVsOutdoor.topicA.pros.2.title': 'Geringere Tierarztkosten',
  'indoorVsOutdoor.topicA.pros.2.body': 'Weniger Notfallbesuche für Traumata (Autounfälle, Hundeangriffe). Geringere Kosten für Parasitenprävention.',
  'indoorVsOutdoor.topicA.pros.3.title': 'Umweltschutz',
  'indoorVsOutdoor.topicA.pros.3.body': 'Keine Prädation auf einheimische Vögel, kleine Säugetiere und Reptilien. Katzen sind jährlich für Milliarden von Wildtier-Todesfällen verantwortlich.',
  'indoorVsOutdoor.topicA.cons.0.title': 'Risiko von Langeweile & Fettleibigkeit',
  'indoorVsOutdoor.topicA.cons.0.body': 'Erfordert engagierte Umweltanreicherung — Kletterstrukturen, Puzzle-Futterspender, interaktives Spiel — um Gewichtszunahme und Verhaltensprobleme zu verhindern.',
  'indoorVsOutdoor.topicA.cons.1.title': 'Verhaltensprobleme bei Unterstimulation',
  'indoorVsOutdoor.topicA.cons.1.body': 'Urinmarkierung, Kratzen, Aggression zwischen Katzen und übermäßige Vokalisation können bei unzureichender Anreicherung auftreten.',
  'indoorVsOutdoor.topicA.cons.2.title': 'Keine natürlichen Verhaltensweisen',
  'indoorVsOutdoor.topicA.cons.2.body': 'Kann natürliche Jagd-, Kletter- und Patrouillenverhalten ohne engagierten Besitzeraufwand nicht ausleben.',
  'indoorVsOutdoor.topicA.bestFor': 'Die meisten städtischen/vorstädtischen Katzenbesitzer, die eine angemessene Umweltanreicherung bieten können.',
  'indoorVsOutdoor.topicB.pros.0.title': 'Bewegung & Mentale Stimulation',
  'indoorVsOutdoor.topicB.pros.0.body': 'Natürliches Klettern, Jagen und Erkunden. Freigänger sind in der Regel schlanker mit besserem Muskeltonus.',
  'indoorVsOutdoor.topicB.pros.1.title': 'Natürliches Kratzen & Markieren',
  'indoorVsOutdoor.topicB.pros.1.body': 'Zugang nach draußen reduziert Kratzen und Urinmarkierung im Innenbereich.',
  'indoorVsOutdoor.topicB.pros.2.title': 'Geringerer Besitzeraufwand',
  'indoorVsOutdoor.topicB.pros.2.body': 'Die Natur bietet Unterhaltung. Weniger Bedarf an Puzzle-Futterspendern, geplanten Spielzeiten und Kletterstrukturen.',
  'indoorVsOutdoor.topicB.cons.0.title': 'Stark Verkürzte Lebensdauer',
  'indoorVsOutdoor.topicB.cons.0.body': 'Freigänger sterben durchschnittlich 3–5× jünger. Hauptursachen: Fahrzeugtrauma, Raubtiere, Vergiftung und Infektionskrankheiten.',
  'indoorVsOutdoor.topicB.cons.1.title': 'Hohe Krankheitsexposition',
  'indoorVsOutdoor.topicB.cons.1.body': 'FIV durch Bisswunden, FeLV durch engen Kontakt, FIP durch Coronavirus-Exposition, Toxoplasmose, Darmparasiten und zeckenübertragene Krankheiten.',
  'indoorVsOutdoor.topicB.cons.2.title': 'Auswirkungen auf die Tierwelt',
  'indoorVsOutdoor.topicB.cons.2.body': 'Eine einzelne Freigänger-Katze tötet 30–50 Vögel und über 100 kleine Säugetiere pro Jahr. Verheerende ökologische Schäden.',
  'indoorVsOutdoor.topicB.cons.3.title': 'Verletzungs- & Traumarisiko',
  'indoorVsOutdoor.topicB.cons.3.body': 'Kämpfe, Autounfälle, Vergiftung (Frostschutzmittel, Rodentizide) und menschliche Grausamkeit. Notfall-Tierarztrechnungen können 5.000 $ übersteigen.',
  'indoorVsOutdoor.topicB.bestFor': 'Ländliche Grundstücke mit kontrolliertem Außenzugang (Catio, eingezäunter Garten) und Besitzer, die die deutlich verkürzte Lebensdauer akzeptieren.',
  'indoorVsOutdoor.rows.0.dimension': 'Durchschnittliche Lebensdauer',
  'indoorVsOutdoor.rows.0.topicA': '12–20 Jahre',
  'indoorVsOutdoor.rows.0.topicB': '2–5 Jahre',
  'indoorVsOutdoor.rows.1.dimension': 'Infektionskrankheitsrisiko',
  'indoorVsOutdoor.rows.1.topicA': 'Sehr Gering',
  'indoorVsOutdoor.rows.1.topicB': 'Hoch (FIV, FeLV, FIP)',
  'indoorVsOutdoor.rows.2.dimension': 'Traumarisiko',
  'indoorVsOutdoor.rows.2.topicA': 'Praktisch Keines',
  'indoorVsOutdoor.rows.2.topicB': 'Hoch (Autos, Raubtiere)',
  'indoorVsOutdoor.rows.3.dimension': 'Tierarztkosten',
  'indoorVsOutdoor.rows.3.topicA': 'Vorhersehbar (Routine)',
  'indoorVsOutdoor.rows.3.topicB': 'Unvorhersehbar (Notfälle)',
  'indoorVsOutdoor.rows.4.dimension': 'Fettleibigkeitsrisiko',
  'indoorVsOutdoor.rows.4.topicA': 'Hoch (Anreicherung nötig)',
  'indoorVsOutdoor.rows.4.topicB': 'Geringer',
  'indoorVsOutdoor.rows.5.dimension': 'Auswirkungen auf Tierwelt',
  'indoorVsOutdoor.rows.5.topicA': 'Keine',
  'indoorVsOutdoor.rows.5.topicB': 'Erheblich',
  'indoorVsOutdoor.rows.6.dimension': 'Mentale Stimulation',
  'indoorVsOutdoor.rows.6.topicA': 'Besitzerabhängig',
  'indoorVsOutdoor.rows.6.topicB': 'Natürlich & Reichlich',
  'indoorVsOutdoor.rows.7.dimension': 'Besitzeraufwand',
  'indoorVsOutdoor.rows.7.topicA': 'Hoch (Spiel, Anreicherung)',
  'indoorVsOutdoor.rows.7.topicB': 'Gering',
  'indoorVsOutdoor.verdict': '<strong>Der sicherste und empfohlenste Ansatz ist "Wohnung + Anreicherung" oder "Überwachter Außenzugang".</strong> Ein Catio, Leinentraining oder eingezäunter Garten bietet die Vorteile der Außenstimulation ohne die Risiken.',
  'indoorVsOutdoor.faq.0.question': 'Sind Wohnungskatzen glücklicher?',
  'indoorVsOutdoor.faq.0.answer': 'Mit angemessener Anreicherung (Kratzbäume, Spielzeug, Spielzeit) können Wohnungskatzen genauso glücklich sein. Der Schlüssel liegt darin, ihre Verhaltensbedürfnisse zu erfüllen.',
  'indoorVsOutdoor.faq.1.question': 'Kann ich meine Katze in einem eingezäunten Garten nach draußen lassen?',
  'indoorVsOutdoor.faq.1.answer': 'Ein eingezäunter Garten oder Catio ist eine ausgezeichnete Lösung. Er ermöglicht Ihrer Katze, die Natur sicher zu genießen.',
  'indoorVsOutdoor.faq.2.question': 'Wie kann ich die Umgebung einer Wohnungskatze bereichern?',
  'indoorVsOutdoor.faq.2.answer': 'Bieten Sie Kratzbäume, Kratzmatten, interaktives Spielzeug, tägliche Spielzeiten und Puzzle-Futterspender an.',
  'indoorVsOutdoor.faq.3.question': 'Braucht meine Wohnungskatze Impfungen?',
  'indoorVsOutdoor.faq.3.answer': 'Ja, auch Wohnungskatzen benötigen Kernimpfungen. Besprechen Sie den geeigneten Impfplan mit Ihrem Tierarzt.',
};

// ================================================================
// Translation maps by language
// ================================================================
const translations = { fr, de };

// ================================================================
// Apply translations to the compare object
// ================================================================
function applyTranslations(compareObj, lang, prefix) {
  prefix = prefix || '';
  const map = translations[lang];
  if (!map) return;

  for (const [key, value] of Object.entries(compareObj)) {
    const fullKey = prefix ? prefix + '.' + key : key;
    
    if (typeof value === 'string') {
      if (map[fullKey] !== undefined) {
        compareObj[key] = map[fullKey];
      }
    } else if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        if (typeof value[i] === 'string') {
          const arrKey = fullKey + '.' + i;
          if (map[arrKey] !== undefined) {
            value[i] = map[arrKey];
          }
        } else if (typeof value[i] === 'object' && value[i] !== null) {
          for (const [sk, sv] of Object.entries(value[i])) {
            if (typeof sv === 'string') {
              const subKey = fullKey + '.' + i + '.' + sk;
              if (map[subKey] !== undefined) {
                value[i][sk] = map[subKey];
              }
            }
          }
        }
      }
    } else if (typeof value === 'object' && value !== null) {
      applyTranslations(value, lang, fullKey);
    }
  }
}

// ================================================================
// Main
// ================================================================
const lang = process.argv[2];
if (!lang) {
  console.error('Usage: node tools/translate-compare-bulk.js <lang-code>');
  process.exit(1);
}

if (!translations[lang]) {
  console.error(`No translations found for language: ${lang}`);
  console.error(`Available: ${Object.keys(translations).join(', ')}`);
  process.exit(1);
}

const en = readJson('messages/en.json');
const target = readJson(path.join('messages', lang + '.json'));

// Clone the English compare section and apply translations
const translatedCompare = JSON.parse(JSON.stringify(en.compare));
applyTranslations(translatedCompare, lang);

target.compare = translatedCompare;

fs.writeFileSync(path.join('messages', lang + '.json'), JSON.stringify(target, null, 2) + '\n');

// Count translated keys
const map = translations[lang];
console.log(`Language: ${lang}`);
console.log(`Translation entries: ${Object.keys(map).length}`);
console.log(`Updated: messages/${lang}.json`);