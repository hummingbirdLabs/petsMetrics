/**
 * i18n Compare Namespace Translator
 * 
 * Translates the entire compare namespace for a given language.
 * Since compare pages have structured content (pros/cons, rows, faq),
 * we translate the entire section rather than patching individual strings.
 * 
 * Usage: node tools/translate-compare.js <lang-code>
 */

const fs = require('fs');
const path = require('path');

function readJson(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8').replace(/^\uFEFF/, '');
  return JSON.parse(raw);
}

// Deep translate a string value for a given language
function t(enValue, lang) {
  // ============================================================
  // COMPARE NAMESPACE TRANSLATIONS
  // ============================================================
  
  const map = {
    'fr': {
      // Top-level compare strings
      'Quick Comparison Table': 'Tableau Comparatif Rapide',
      'At a glance — {topicA} vs {topicB}:': 'En un coup d\'œil — {topicA} vs {topicB} :',
      'Deep Dive: {topicName}': 'Analyse Approfondie : {topicName}',
      'Considerations': 'Considérations',
      'Significant Concerns': 'Préoccupations Majeures',
      'Risks': 'Risques',
      'Limitations': 'Limitations',
      'Trade-offs & Increased Risks': 'Compromis et Risques Accrus',
      'Best for:': 'Idéal pour :',
      'The Verdict': 'Le Verdict',
      'Frequently Asked Questions': 'Foire Aux Questions',
      'References & Data Sources': 'Références et Sources de Données',
      'Last updated: {date} · Data verified against {sources}.': 'Dernière mise à jour : {date} · Données vérifiées auprès de {sources}.',
      'Dimension': 'Dimension',
      'Breed matters. Golden Retrievers, German Shepherds, and Boxers have different cancer risks, life expectancies, and dietary needs. Always consult your vet for breed-specific decisions.': 'La race compte. Les Golden Retrievers, Bergers Allemands et Boxers ont des risques de cancer, espérances de vie et besoins alimentaires différents. Consultez toujours votre vétérinaire pour des décisions spécifiques à la race.',
      'Raw diets carry bacterial risks (Salmonella, Campylobacter). Always consult a veterinary nutritionist before switching to raw.': 'Les régimes crus présentent des risques bactériens (Salmonella, Campylobacter). Consultez toujours un nutritionniste vétérinaire avant de passer au cru.',
      'Breed matters.': 'La race compte.',
      
      // dryVsWet
      'Dry Food vs Wet Food for Dogs: Which Is Right?': 'Croquettes vs Nourriture Humide pour Chiens : Laquelle Choisir ?',
      'A science-based comparison of kibble and canned diets — covering cost, dental health, hydration, and nutritional value.': 'Une comparaison scientifique des croquettes et des aliments en conserve — couvrant le coût, la santé dentaire, l\'hydratation et la valeur nutritionnelle.',
      'Dry Food (Kibble)': 'Croquettes (Nourriture Sèche)',
      'Wet Food (Canned/Pouched)': 'Nourriture Humide (Boîtes/Sachets)',
      'Cost-Effective': 'Économique',
      'Kibble costs $0.30–$0.80 per day for a 30kg dog, vs $1.50–$4.00 for wet food. Save $400–$1,300/year.': 'Les croquettes coûtent 0,30–0,80 $ par jour pour un chien de 30 kg, contre 1,50–4,00 $ pour la nourriture humide. Économisez 400–1 300 $/an.',
      'Dental Benefits': 'Bienfaits Dentaires',
      'The mechanical crunching action of hard kibble can help reduce tartar buildup. However, this benefit is often overstated — regular brushing remains the gold standard.': 'Le croquant mécanique des croquettes dures peut aider à réduire l\'accumulation de tartre. Cependant, cet avantage est souvent exagéré — le brossage régulier reste la référence.',
      'Shelf-Stable & Convenient': 'Longue Conservation et Pratique',
      'No refrigeration needed. Can be left out all day for free-feeding. Ideal for automatic feeders.': 'Pas de réfrigération nécessaire. Peut être laissé toute la journée pour l\'alimentation libre. Idéal pour les distributeurs automatiques.',
      'Lower Palatability': 'Moins Appétent',
      'Many dogs prefer wet food. Picky eaters may refuse kibble or require toppers.': 'Beaucoup de chiens préfèrent la nourriture humide. Les mangeurs difficiles peuvent refuser les croquettes.',
      'Low Moisture (6–10%)': 'Faible Teneur en Eau (6–10 %)',
      'Dogs on dry-only diets may be chronically mildly dehydrated. This can contribute to urinary crystals and kidney stress over time.': 'Les chiens nourris exclusivement aux croquettes peuvent être chroniquement légèrement déshydratés. Cela peut contribuer aux cristaux urinaires et au stress rénal avec le temps.',
      'Highly Processed': 'Très Transformé',
      'Extrusion cooking at high temperatures denatures proteins and may form acrylamide in some grain-based formulas.': 'La cuisson par extrusion à haute température dénature les protéines et peut former de l\'acrylamide dans certaines formules à base de céréales.',
      'Active adult dogs, large breeds, multi-dog households on a budget, and owners who want the convenience of free-feeding.': 'Chiens adultes actifs, grandes races, foyers multi-chiens à petit budget et propriétaires souhaitant la commodité de l\'alimentation libre.',
      'High Moisture (75–85%)': 'Forte Teneur en Eau (75–85 %)',
      'Wet food naturally increases water intake, which is crucial for urinary tract health. Especially beneficial for dogs prone to UTIs, crystals, or kidney issues.': 'La nourriture humide augmente naturellement l\'apport en eau, crucial pour la santé urinaire. Particulièrement bénéfique pour les chiens sujets aux infections urinaires, cristaux ou problèmes rénaux.',
      'Higher Palatability': 'Plus Appétent',
      'Stronger aroma and meatier texture. Even picky dogs usually eat wet food enthusiastically.': 'Arôme plus fort et texture plus charnue. Même les chiens difficiles mangent généralement la nourriture humide avec enthousiasme.',
      'Less Processed': 'Moins Transformé',
      'Typically cooked at lower temperatures than kibble extrusion. Retains more natural nutrients and meat texture.': 'Généralement cuit à des températures plus basses que l\'extrusion des croquettes. Conserve plus de nutriments naturels et la texture de la viande.',
      'Soft Texture': 'Texture Molle',
      'Does not provide the mechanical abrasion that helps clean teeth.': 'Ne fournit pas l\'abrasion mécanique qui aide à nettoyer les dents.',
      'Expensive': 'Coûteux',
      'Feeding a 30kg dog exclusively wet food costs $1.50–$4.00/day ($550–$1,460/year).': 'Nourrir un chien de 30 kg exclusivement avec de la nourriture humide coûte 1,50–4,00 $/jour (550–1 460 $/an).',
      'Short Shelf Life After Opening': 'Courte Conservation Après Ouverture',
      'Must be refrigerated and used within 24–48 hours. Not suitable for free-feeding.': 'Doit être réfrigéré et utilisé dans les 24–48 heures. Ne convient pas à l\'alimentation libre.',
      'High Fat Content': 'Teneur Élevée en Matières Grasses',
      'Some wet foods contain 15–25% fat (DM basis), which can contribute to pancreatitis in predisposed breeds.': 'Certaines nourritures humides contiennent 15–25 % de matières grasses (sur matière sèche), ce qui peut contribuer à la pancréatite chez les races prédisposées.',
      'Senior dogs, small breeds, picky eaters, dogs with dental issues, kidney/urinary patients, and dogs needing to increase water intake.': 'Chiens âgés, petites races, mangeurs difficiles, chiens avec problèmes dentaires, patients rénaux/urinaires et chiens devant augmenter leur apport en eau.',
      '<strong>Most dogs do well on a mixed feeding approach.</strong> A base of quality dry food with wet food as a topper or occasional meal gives you the best of both worlds: cost savings, dental benefits, and adequate hydration. If budget permits, feed 50/50 dry and wet.': '<strong>La plupart des chiens se portent bien avec une alimentation mixte.</strong> Une base de croquettes de qualité avec de la nourriture humide en complément ou en repas occasionnel vous donne le meilleur des deux mondes : économies, bienfaits dentaires et hydratation adéquate. Si le budget le permet, nourrissez 50/50 sec et humide.',
      
      // indoorVsOutdoor
      'Indoor vs Outdoor Cats: Lifespan, Health & Safety Comparison': 'Chats d\'Intérieur vs d\'Extérieur : Comparaison de Durée de Vie, Santé et Sécurité',
      'Data-driven comparison of indoor-only and outdoor-access cats — covering lifespan, disease risk, injury rates, and environmental impact.': 'Comparaison basée sur les données des chats d\'intérieur exclusif et d\'extérieur — couvrant la durée de vie, les risques de maladie, les taux de blessures et l\'impact environnemental.',
      'Indoor-Only Cats': 'Chats d\'Intérieur Exclusif',
      'Outdoor-Access Cats': 'Chats avec Accès à l\'Extérieur',
      'Longer Lifespan': 'Durée de Vie Plus Longue',
      'Indoor cats live 12–20 years on average. Outdoor cats average 2–5 years due to trauma, disease, and predation.': 'Les chats d\'intérieur vivent 12–20 ans en moyenne. Les chats d\'extérieur vivent en moyenne 2–5 ans en raison des traumatismes, maladies et prédation.',
      'Lower Disease Risk': 'Risque de Maladie Réduit',
      'Protected from FIV, FeLV, FIP transmission, endoparasites, and bite abscesses from cat fights.': 'Protégés contre la transmission du FIV, FeLV, PIF, des endoparasites et des abcès par morsure lors de bagarres.',
      'Reduced Veterinary Costs': 'Coûts Vétérinaires Réduits',
      'Fewer emergency visits for trauma (hit-by-car, dog attacks). Lower parasite prevention costs.': 'Moins de visites d\'urgence pour traumatismes (accidents de voiture, attaques de chiens). Coûts de prévention parasitaire réduits.',
      'Environmental Protection': 'Protection de l\'Environnement',
      'No predation on native birds, small mammals, and reptiles. Responsible for billions of wildlife deaths annually.': 'Pas de prédation sur les oiseaux indigènes, petits mammifères et reptiles. Responsables de milliards de morts de faune sauvage chaque année.',
      'Risk of Boredom & Obesity': 'Risque d\'Ennui et d\'Obésité',
      'Requires dedicated environmental enrichment — climbing structures, puzzle feeders, interactive play — to prevent weight gain and behavioral issues.': 'Nécessite un enrichissement environnemental dédié — structures d\'escalade, distributeurs de puzzle, jeu interactif — pour prévenir la prise de poids et les problèmes comportementaux.',
      'Behavioral Problems if Under-Stimulated': 'Problèmes Comportementaux si Sous-Stimulé',
      'Urine marking, scratching, inter-cat aggression, and excessive vocalization may develop with insufficient enrichment.': 'Marquage urinaire, griffades, agression entre chats et vocalisations excessives peuvent se développer avec un enrichissement insuffisant.',
      'No Natural Behaviors': 'Pas de Comportements Naturels',
      'Cannot express natural hunting, climbing, and patrolling behaviors without dedicated owner effort.': 'Ne peut exprimer les comportements naturels de chasse, d\'escalade et de patrouille sans effort dédié du propriétaire.',
      'Most urban/suburban cat owners who can provide adequate environmental enrichment.': 'La plupart des propriétaires de chats urbains/banlieusards qui peuvent fournir un enrichissement environnemental adéquat.',
      'Exercise & Mental Stimulation': 'Exercice et Stimulation Mentale',
      'Natural climbing, hunting, and exploring behaviors. Outdoor cats are generally leaner with better muscle tone.': 'Comportements naturels d\'escalade, de chasse et d\'exploration. Les chats d\'extérieur sont généralement plus minces avec un meilleur tonus musculaire.',
      'Natural Scratching & Marking': 'Griffades et Marquage Naturels',
      'Outdoor access reduces indoor scratching and urine marking.': 'L\'accès à l\'extérieur réduit les griffades et le marquage urinaire à l\'intérieur.',
      'Lower Owner Effort': 'Moins d\'Effort du Propriétaire',
      'Nature provides entertainment. Less need for puzzle feeders, scheduled play sessions, and climbing structures.': 'La nature fournit le divertissement. Moins besoin de distributeurs de puzzle, de séances de jeu programmées et de structures d\'escalade.',
      'Severely Shortened Lifespan': 'Durée de Vie Considérablement Réduite',
      'Outdoor cats die 3–5× younger on average. Major causes: vehicle trauma, predation (coyotes, dogs), poisoning, and infectious disease.': 'Les chats d\'extérieur meurent 3–5× plus jeunes en moyenne. Causes principales : traumatismes routiers, prédation (coyotes, chiens), empoisonnement et maladies infectieuses.',
      'High Disease Exposure': 'Exposition Élevée aux Maladies',
      'FIV through bite wounds, FeLV through close contact, FIP through coronavirus exposure, toxoplasmosis, intestinal parasites, and tick-borne diseases.': 'FIV par morsures, FeLV par contact étroit, PIF par exposition au coronavirus, toxoplasmose, parasites intestinaux et maladies transmises par les tiques.',
      'Wildlife Impact': 'Impact sur la Faune',
      'A single outdoor cat kills 30–50 birds and 100+ small mammals per year. Staggering ecological damage.': 'Un seul chat d\'extérieur tue 30–50 oiseaux et plus de 100 petits mammifères par an. Des dégâts écologiques considérables.',
      'Injury & Trauma Risk': 'Risque de Blessures et Traumatismes',
      'Fights, hit-by-car, poisoning (antifreeze, rodenticides), and cruelty from humans. Emergency vet bills can exceed $5,000.': 'Bagarres, accidents de voiture, empoisonnement (antigel, rodenticides) et cruauté humaine. Les factures vétérinaires d\'urgence peuvent dépasser 5 000 $.',
      'Rural properties with controlled outdoor access (catio, enclosed garden) and owners who accept the significantly shortened lifespan.': 'Propriétés rurales avec accès extérieur contrôlé (catio, jardin clos) et propriétaires qui acceptent la durée de vie considérablement réduite.',
      '<strong>The safest and most recommended approach is "Indoor + Enrichment" or "Supervised Outdoor Access".</strong> A catio, leash training, or enclosed garden gives the benefits of outdoor stimulation without the risks. If you let your cat outdoors, vaccinate, microchip, and use monthly parasite prevention.': '<strong>L\'approche la plus sûre et la plus recommandée est "Intérieur + Enrichissement" ou "Accès Extérieur Supervisé".</strong> Un catio, l\'entraînement en laisse ou un jardin clos offre les avantages de la stimulation extérieure sans les risques. Si vous laissez votre chat sortir, vaccinez, identifiez par puce électronique et utilisez une prévention parasitaire mensuelle.',

      // rawVsKibble
      'Raw Diet vs Kibble for Dogs: Science, Safety & Cost Compared': 'Régime Cru vs Croquettes pour Chiens : Science, Sécurité et Coût Comparés',
      'An objective comparison of BARF (Biologically Appropriate Raw Food) diets and commercial kibble — covering nutrition, pathogen risks, convenience, and cost.': 'Une comparaison objective des régimes BARF (Biologically Appropriate Raw Food) et des croquettes commerciales — couvrant la nutrition, les risques pathogènes, la commodité et le coût.',
      'Raw Diet (BARF)': 'Régime Cru (BARF)',
      'Commercial Kibble': 'Croquettes Commerciales',
      'Higher Bioavailability': 'Meilleure Biodisponibilité',
      'Raw proteins and fats are more digestible. Enzymes and phytonutrients remain intact.': 'Les protéines et graisses crues sont plus digestibles. Les enzymes et phytonutriments restent intacts.',
      'Healthier Skin & Coat': 'Peau et Pelage Plus Sains',
      'Higher omega-3 content and natural fat profiles lead to visible improvements in coat shine and skin health within 4–6 weeks.': 'Une teneur plus élevée en oméga-3 et des profils lipidiques naturels entraînent des améliorations visibles de la brillance du pelage et de la santé de la peau en 4–6 semaines.',
      'Better Dental Health': 'Meilleure Santé Dentaire',
      'Raw meaty bones naturally scrape plaque. Lower carbohydrate content means less substrate for oral bacteria.': 'Les os charnus crus grattent naturellement la plaque. Une teneur plus faible en glucides signifie moins de substrat pour les bactéries buccales.',
      'Smaller, Firmer Stools': 'Selles Plus Petites et Plus Fermes',
      'Higher digestibility means less waste. Stools are typically 50–70% smaller than kibble-fed dogs.': 'Une digestibilité plus élevée signifie moins de déchets. Les selles sont généralement 50–70 % plus petites que chez les chiens nourris aux croquettes.',
      'Bacterial Contamination Risk': 'Risque de Contamination Bactérienne',
      'FDA studies found Salmonella in 15–30% of raw pet foods, plus Listeria and E. coli. Risk extends to human family members through fecal shedding.': 'Les études de la FDA ont trouvé Salmonella dans 15–30 % des aliments crus pour animaux, plus Listeria et E. coli. Le risque s\'étend aux membres humains de la famille par excrétion fécale.',
      'Nutritional Imbalance Risk': 'Risque de Déséquilibre Nutritionnel',
      'Without veterinary nutritionist formulation, homemade raw diets are often deficient in calcium, vitamin D, iodine, and zinc.': 'Sans formulation par un nutritionniste vétérinaire, les régimes crus maison sont souvent carencés en calcium, vitamine D, iode et zinc.',
      'Expensive & Time-Consuming': 'Coûteux et Chronophage',
      'Pre-made raw costs $3–$8/day. Homemade requires sourcing, grinding, and supplementing. Significant freezer space required.': 'Le cru préparé coûte 3–8 $/jour. Le fait maison nécessite approvisionnement, broyage et supplémentation. Espace congélateur important requis.',
      'Not Suitable for Immunocompromised Homes': 'Ne Convient Pas aux Foyers Immunodéprimés',
      'If anyone in the household is immunocompromised, pregnant, elderly, or has a young child, raw feeding is contraindicated by the CDC and AVMA.': 'Si quelqu\'un dans le foyer est immunodéprimé, enceinte, âgé ou a un jeune enfant, l\'alimentation crue est contre-indiquée par le CDC et l\'AVMA.',
      'Dedicated owners with veterinary nutritionist guidance, dogs with specific food allergies/intolerances, and healthy adult dogs in non-immunocompromised households.': 'Propriétaires dédiés avec conseils d\'un nutritionniste vétérinaire, chiens avec allergies/intolérances alimentaires spécifiques et chiens adultes en bonne santé dans des foyers non immunodéprimés.',
      'Complete & Balanced': 'Complet et Équilibré',
      'AAFCO-certified kibbles are formulated to meet all nutritional requirements. No guesswork or supplementation needed.': 'Les croquettes certifiées AAFCO sont formulées pour répondre à tous les besoins nutritionnels. Pas de conjectures ni de supplémentation nécessaire.',
      'Safe from Pathogens': 'Sans Agents Pathogènes',
      'Extrusion cooking at 120–150°C kills bacteria, parasites, and pathogens. Shelf-stable for months.': 'La cuisson par extrusion à 120–150°C tue les bactéries, parasites et agents pathogènes. Stable à température ambiante pendant des mois.',
      'Affordable & Convenient': 'Abordable et Pratique',
      'Quality kibble costs $0.50–$1.50/day. No refrigeration, no preparation, no freezer space.': 'Les croquettes de qualité coûtent 0,50–1,50 $/jour. Pas de réfrigération, pas de préparation, pas d\'espace congélateur.',
      'Dental Tartar Buildup': 'Accumulation de Tartre Dentaire',
      'High carbohydrate content (~30–50%) feeds oral bacteria. Kibble dust sticks to teeth.': 'La teneur élevée en glucides (~30–50 %) nourrit les bactéries buccales. La poussière des croquettes colle aux dents.',
      'Lower Palatability for Some Dogs': 'Moins Appétent pour Certains Chiens',
      'Picky eaters may refuse kibble. Uniform texture and mild aroma can be less enticing.': 'Les mangeurs difficiles peuvent refuser les croquettes. La texture uniforme et l\'arôme doux peuvent être moins attrayants.',
      'Highly Processed': 'Très Transformé',
      'Multiple high-heat processing steps denature proteins and may form advanced glycation end-products (AGEs).': 'De multiples étapes de traitement à haute température dénaturent les protéines et peuvent former des produits de glycation avancée (AGE).',
      'The vast majority of dog owners — especially those without access to a board-certified nutritionist and those in households with children, elderly, or immunocompromised individuals.': 'La grande majorité des propriétaires de chiens — en particulier ceux sans accès à un nutritionniste certifié et ceux dans des foyers avec enfants, personnes âgées ou immunodéprimées.',
      '<strong>For most dog owners, a high-quality commercial kibble is the safest, most practical choice.</strong> Raw feeding done correctly requires a board-certified veterinary nutritionist, strict hygiene protocols, and significant budget. If you cannot commit to all three, stick with AAFCO-certified kibble.': '<strong>Pour la plupart des propriétaires de chiens, des croquettes commerciales de haute qualité sont le choix le plus sûr et le plus pratique.</strong> L\'alimentation crue correctement réalisée nécessite un nutritionniste vétérinaire certifié, des protocoles d\'hygiène stricts et un budget important. Si vous ne pouvez pas vous engager sur les trois, restez aux croquettes certifiées AAFCO.',

      // spayedVsUnspayed
      'Spayed vs Unspayed Dog: Health, Behavior & Timing': 'Chien Stérilisé vs Non Stérilisé : Santé, Comportement et Moment',
      'A balanced comparison of spay/neuter vs. keeping your dog intact — covering cancer risks, orthopedic health, behavior, and optimal timing by breed size.': 'Une comparaison équilibrée de la stérilisation vs. garder votre chien intact — couvrant les risques de cancer, la santé orthopédique, le comportement et le moment optimal selon la taille de la race.',
      'Spayed / Neutered': 'Stérilisé / Castré',
      'Intact (Unspayed/Unneutered)': 'Intact (Non Stérilisé/Non Castré)',
      'Eliminates Pyometra Risk': 'Élimine le Risque de Pyomètre',
      'Pyometra (life-threatening uterine infection) affects 25% of unspayed females by age 10. Spaying eliminates this risk entirely.': 'Le pyomètre (infection utérine potentiellement mortelle) touche 25 % des femelles non stérilisées à l\'âge de 10 ans. La stérilisation élimine totalement ce risque.',
      'Dramatically Reduces Mammary Cancer': 'Réduit Considérablement le Cancer Mammaire',
      'Spaying before the first heat reduces mammary cancer risk to <0.5%. After 2nd heat: 26% risk.': 'La stérilisation avant les premières chaleurs réduit le risque de cancer mammaire à <0,5 %. Après les 2èmes chaleurs : 26 % de risque.',
      'Eliminates Testicular Cancer': 'Élimine le Cancer Testiculaire',
      'Neutering removes the testicles, eliminating the risk of testicular cancer (common in intact males).': 'La castration retire les testicules, éliminant le risque de cancer testiculaire (fréquent chez les mâles intacts).',
      'Reduces Roaming & Aggression': 'Réduit l\'Errance et l\'Agression',
      'Intact males will roam miles to find a female in heat. Neutering reduces urine marking, mounting, and inter-dog aggression.': 'Les mâles intacts parcourent des kilomètres pour trouver une femelle en chaleur. La castration réduit le marquage urinaire, le chevauchement et l\'agression entre chiens.',
      'No Unwanted Litters': 'Pas de Portées Non Désirées',
      'Eliminates the risk of accidental pregnancy entirely.': 'Élimine totalement le risque de grossesse accidentelle.',
      'Increased Orthopedic Risk (Large Breeds)': 'Risque Orthopédique Accru (Grandes Races)',
      'Early spay/neuter in large/giant breeds increases risk of hip dysplasia, CCL tears, and osteosarcoma.': 'La stérilisation précoce chez les races grandes/géantes augmente le risque de dysplasie de la hanche, de déchirure du LCC et d\'ostéosarcome.',
      'Increased Risk of Certain Cancers': 'Risque Accru de Certains Cancers',
      'Studies show increased risk of hemangiosarcoma, osteosarcoma, and lymphoma in spayed/neutered dogs, especially large breeds.': 'Des études montrent un risque accru d\'hémangiosarcome, d\'ostéosarcome et de lymphome chez les chiens stérilisés, en particulier les grandes races.',
      'Weight Gain Tendency': 'Tendance à la Prise de Poids',
      'Metabolic rate drops 20–25% after spay/neuter. Requires calorie adjustment of 25–30% reduction.': 'Le taux métabolique baisse de 20–25 % après la stérilisation. Nécessite un ajustement calorique de 25–30 % de réduction.',
      'Urinary Incontinence (Females)': 'Incontinence Urinaire (Femelles)',
      '5–20% of spayed females develop urethral sphincter mechanism incompetence, especially large breeds spayed early.': '5–20 % des femelles stérilisées développent une incontinence du sphincter urétral, en particulier les grandes races stérilisées tôt.',
      'Most dogs, especially small breeds, mixed breeds, and any dog not intended for responsible breeding. Best timing: 6–12 months for small breeds, 12–24 months for large/giant breeds.': 'La plupart des chiens, en particulier les petites races, les races croisées et tout chien non destiné à l\'élevage responsable. Meilleur moment : 6–12 mois pour les petites races, 12–24 mois pour les races grandes/géantes.',
      'Natural Hormonal Development': 'Développement Hormonal Naturel',
      'Sex hormones contribute to proper growth plate closure, muscle development, and metabolic regulation.': 'Les hormones sexuelles contribuent à la fermeture correcte des cartilages de croissance, au développement musculaire et à la régulation métabolique.',
      'Lower Orthopedic Risk': 'Risque Orthopédique Réduit',
      'Intact dogs have lower rates of hip dysplasia, CCL tears, and certain joint disorders.': 'Les chiens intacts ont des taux plus faibles de dysplasie de la hanche, de déchirure du LCC et de certains troubles articulaires.',
      'Potentially Lower Cancer Risk': 'Risque de Cancer Potentiellement Réduit',
      'Some studies suggest lower rates of hemangiosarcoma and osteosarcoma in intact dogs.': 'Certaines études suggèrent des taux plus faibles d\'hémangiosarcome et d\'ostéosarcome chez les chiens intacts.',
      'No Surgical or Anesthetic Risk': 'Pas de Risque Chirurgical ou Anesthésique',
      'Avoids the (small but real) risks of general anesthesia and surgical complications.': 'Évite les risques (faibles mais réels) de l\'anesthésie générale et des complications chirurgicales.',
      'Pyometra Risk (Females)': 'Risque de Pyomètre (Femelles)',
      '1 in 4 unspayed females will develop pyometra by age 10. This is a life-threatening emergency requiring immediate surgery.': '1 femelle non stérilisée sur 4 développera un pyomètre avant l\'âge de 10 ans. C\'est une urgence vitale nécessitant une chirurgie immédiate.',
      'Mammary Cancer Risk (Females)': 'Risque de Cancer Mammaire (Femelles)',
      '26% risk after multiple heat cycles. Mammary tumors are malignant in ~50% of dogs.': '26 % de risque après plusieurs cycles de chaleurs. Les tumeurs mammaires sont malignes dans ~50 % des cas chez les chiens.',
      'Testicular & Prostate Disease (Males)': 'Maladies Testiculaires et Prostatiques (Mâles)',
      'Testicular tumors, benign prostatic hyperplasia (BPH), and prostatitis are common in intact males.': 'Les tumeurs testiculaires, l\'hyperplasie bénigne de la prostate (HBP) et la prostatite sont fréquentes chez les mâles intacts.',
      'Behavioral Challenges': 'Défis Comportementaux',
      'Roaming, urine marking, mounting, and inter-dog aggression. Intact males are 3× more likely to be hit by cars from roaming.': 'Errance, marquage urinaire, chevauchement et agression entre chiens. Les mâles intacts sont 3× plus susceptibles d\'être heurtés par des voitures en raison de l\'errance.',
      'Risk of Accidental Litters': 'Risque de Portées Accidentelles',
      'Requires diligent management to prevent unplanned breeding. One unneutered male can impregnate dozens of females.': 'Nécessite une gestion diligente pour prévenir la reproduction non planifiée. Un mâle non castré peut féconder des dizaines de femelles.',
      'Large/giant breeds where delayed spay/neuter benefits joint health (discuss timing with your vet), and dogs intended for responsible breeding programs.': 'Races grandes/géantes où la stérilisation retardée bénéficie à la santé articulaire (discutez du moment avec votre vétérinaire), et chiens destinés à des programmes d\'élevage responsable.',
      '<strong>The benefits of spaying/neutering outweigh the risks for most dogs.</strong> The key is optimal timing based on breed size. For small breeds: 6 months. For large/giant breeds: 12–24 months. Always discuss with your veterinarian.': '<strong>Les avantages de la stérilisation l\'emportent sur les risques pour la plupart des chiens.</strong> La clé est le moment optimal basé sur la taille de la race. Pour les petites races : 6 mois. Pour les races grandes/géantes : 12–24 mois. Discutez toujours avec votre vétérinaire.',
    },
    'de': {
      // ... would be filled similarly for German
    },
  };

  if (map[lang] && map[lang][enValue]) {
    return map[lang][enValue];
  }
  return null;
}

// Recursively deep-translate an object
function deepTranslate(obj, lang) {
  if (typeof obj === 'string') {
    const translated = t(obj, lang);
    return translated !== null ? translated : obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(item => deepTranslate(item, lang));
  }
  if (typeof obj === 'object' && obj !== null) {
    const result = {};
    for (const [k, v] of Object.entries(obj)) {
      result[k] = deepTranslate(v, lang);
    }
    return result;
  }
  return obj;
}

// Main
const lang = process.argv[2];
if (!lang) {
  console.error('Usage: node tools/translate-compare.js <lang-code>');
  process.exit(1);
}

const en = readJson('messages/en.json');
const target = readJson(path.join('messages', lang + '.json'));

// Translate the compare namespace
const translatedCompare = deepTranslate(en.compare, lang);
target.compare = translatedCompare;

fs.writeFileSync(path.join('messages', lang + '.json'), JSON.stringify(target, null, 2) + '\n');
console.log(`Translated compare namespace for ${lang}`);
console.log(`Updated: messages/${lang}.json`);