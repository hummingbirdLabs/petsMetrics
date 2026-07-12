/**
 * Translate seasonal data for French, German, Japanese, Korean, Spanish, Portuguese, Dutch, Russian, Hindi, Arabic
 */
import fs from 'fs';

const langs = ['fr', 'de', 'ja', 'ko', 'es', 'pt', 'nl', 'ru', 'hi', 'ar'];

// Read the English seasonal data as reference structure
const en = JSON.parse(fs.readFileSync('messages/en.json', 'utf8'));
const enSeasonal = en.seasonal;

// ============================================================
// FRENCH (fr) translations
// ============================================================
const fr = {
  'summer-heat': {
    title: 'Comment garder votre chien au frais en été : guide de sécurité contre la chaleur',
    description: 'Guide complet pour prévenir le coup de chaleur chez le chien — reconnaître les symptômes précoces, techniques de refroidissement, sécurité intérieure et extérieure. Basé sur la science vétérinaire.',
    bodyParagraphs: [
      'Le coup de chaleur est l\'une des menaces estivales les plus dangereuses pour les chiens. Contrairement aux humains, les chiens ont des glandes sudoripares principalement concentrées dans leurs coussinets, ce qui rend leur refroidissement bien moins efficace. Ils se refroidissent principalement en haletant, mais ce mécanisme peut échouer dans des conditions de chaleur et d\'humidité élevées. Lorsque la température corporelle d\'un chien dépasse 39,4 °C, elle entre dans une zone dangereuse ; au-delà de 41,1 °C, une défaillance multiviscérale peut survenir.',
      'Certaines races présentent un risque plus élevé. Les races brachycéphales (Bouledogue français, Carlin, Boston Terrier) ont des difficultés particulières à se refroidir en raison de leurs voies nasales restreintes. Les chiens âgés, obèses et ceux souffrant de maladies cardiaques ou respiratoires sont également plus vulnérables. Même les chiens actifs en bonne santé peuvent développer un coup de chaleur lors d\'exercices intenses par temps chaud.',
      'La prévention est bien plus simple que le traitement. Les stratégies clés incluent : promener votre chien pendant les heures fraîches (tôt le matin ou tard le soir), toujours fournir de l\'eau fraîche, ne jamais laisser un chien dans une voiture garée (même avec les fenêtres entrouvertes, la température peut monter à des niveaux mortels en 10 minutes), et utiliser des tapis rafraîchissants, des piscines peu profondes et des ventilateurs.',
    ],
    knowledgeCards: [
      { title: 'Physiologie du coup de chaleur', body: 'Les chiens se refroidissent principalement en haletant et par une transpiration limitée via les coussinets et le nez. Lorsque la température ambiante dépasse 29 °C avec une humidité élevée, le refroidissement par évaporation devient inefficace, la température corporelle grimpe rapidement, entraînant une dénaturation des protéines cellulaires et une défaillance d\'organes.' },
      { title: 'Coup de chaleur vs épuisement par la chaleur', body: 'L\'épuisement par la chaleur est le stade précurseur : halètement excessif, léthargie et bave. Le coup de chaleur est le stade avancé : température > 40 °C, vomissements, diarrhée, ataxie (démarche instable) et confusion. Le coup de chaleur nécessite une intervention vétérinaire immédiate.' },
      { title: 'Comment refroidir un chien en toute sécurité', body: 'N\'utilisez jamais d\'eau glacée ou de glaçons — cela provoque une vasoconstriction périphérique qui piège la chaleur dans le corps. Utilisez de l\'eau fraîche (pas froide) sur des serviettes appliquées aux aisselles, à l\'aine et au cou. Utilisez un ventilateur pour accélérer le refroidissement par évaporation. Offrez de petites quantités d\'eau fréquemment.' },
      { title: 'Danger des températures de l\'asphalte', body: 'Lorsque la température de l\'air est de 30 °C, l\'asphalte peut atteindre 60 °C — suffisant pour brûler les coussinets en 60 secondes. Test simple : placez le dos de votre main sur le sol. Si vous ne pouvez pas le supporter pendant 5 secondes, c\'est trop chaud pour votre chien.' },
    ],
    prevention: [
      'Promenez votre chien tôt le matin (5h–8h) ou tard le soir (après 19h), en évitant la chaleur de midi',
      'Ayez toujours un bol d\'eau portable et suffisamment d\'eau fraîche',
      'Ne laissez jamais votre chien dans une voiture garée — même avec les fenêtres ouvertes, la température peut monter de 10–15 °C en 10 minutes',
      'Fournissez des tapis rafraîchissants, une piscine peu profonde et un ventilateur à la maison',
      'Réduisez l\'exercice intense par temps chaud, remplacez-le par des jeux mentaux en intérieur',
      'Testez la température du sol avec le dos de la main avant les promenades — la règle des 5 secondes',
      'Connaissez le risque de votre race : les chiens brachycéphales, âgés et obèses nécessitent une attention particulière',
    ],
    symptoms: [
      'Halètement excessif, respiration rapide et superficielle',
      'Gencives et langue rouge vif ou rouge foncé (le rose est normal)',
      'Salivation abondante, salive épaisse',
      'Léthargie, faiblesse ou instabilité (ataxie)',
      'Vomissements ou diarrhée (possiblement sanglants)',
      'Fréquence cardiaque accélérée (tachycardie)',
      'Confusion, absence de réaction ou convulsions',
    ],
    firstAid: [
      { title: 'Déplacez immédiatement à l\'ombre', content: 'Déplacez votre chien à l\'ombre ou dans une pièce climatisée. Ne le forcez pas à se lever ou à marcher — laissez-le se reposer allongé.' },
      { title: 'Refroidissez avec de l\'eau fraîche (pas glacée)', content: 'Appliquez des serviettes imbibées d\'eau fraîche (environ 15–20 °C) sur les aisselles, l\'aine, le cou et les coussinets. Utilisez un ventilateur pour accélérer le refroidissement. Offrez de petites quantités d\'eau fraîche — ne forcez pas à boire.' },
      { title: 'Surveillez la température', content: 'Si vous avez un thermomètre rectal, mesurez la température toutes les 5 minutes. Arrêtez le refroidissement lorsque la température atteint 39,4 °C pour éviter l\'hypothermie.' },
      { title: 'Consultez immédiatement un vétérinaire', content: 'Même si votre chien semble aller mieux, une consultation vétérinaire immédiate est nécessaire. Les complications du coup de chaleur (CIVD, insuffisance rénale, œdème cérébral) peuvent apparaître des heures plus tard.' },
    ],
    faqs: [
      { question: 'Quelle température est trop chaude pour les chiens ?', answer: 'En général, soyez prudent lorsque la température dépasse 29 °C. Pour les races brachycéphales (Carlin, Bouledogue français), 24 °C peut déjà être dangereux. Tenez toujours compte de l\'humidité — chaleur + humidité élevée est la combinaison la plus dangereuse.' },
      { question: 'Puis-je donner des glaçons à mon chien pour le refroidir ?', answer: 'Les glaçons ne sont pas recommandés en cas de coup de chaleur d\'urgence car ils provoquent une vasoconstriction. Utilisez de l\'eau fraîche (pas glacée). Pour un chien en bonne santé par temps chaud, de petits glaçons comme friandise sont généralement sûrs, mais surveillez les risques dentaires.' },
      { question: 'Quelles races sont les plus à risque de coup de chaleur ?', answer: 'Les races brachycéphales (Bouledogue français, Carlin, Bouledogue anglais, Boston Terrier, Boxer) sont le groupe à risque le plus élevé. Autres chiens à risque : chiens âgés, obèses, races à pelage épais (Husky, Malamute) et chiens souffrant de maladies cardiaques ou de paralysie laryngée.' },
      { question: 'Combien de temps faut-il pour qu\'un chien se remette d\'un coup de chaleur ?', answer: 'Un coup de chaleur léger traité rapidement peut se résoudre en 24–48 heures. Un coup de chaleur modéré à sévère peut nécessiter des jours à des semaines d\'hospitalisation, avec des lésions organiques permanentes possibles. C\'est pourquoi la prévention et les soins vétérinaires immédiats sont essentiels.' },
    ],
    relatedTools: [
      { name: 'Calculateur de calories pour chien', href: 'dog/dog-calorie-calculator', description: 'Calculez l\'apport calorique quotidien idéal pour maintenir un poids santé.' },
      { name: 'Suivi de croissance du chiot', href: 'dog/puppy-growth-tracker', description: 'Suivez les étapes de croissance et le poids prévu de votre chiot.' },
    ],
  },
  'winter-paw-care': {
    title: 'Protection des pattes du chien en hiver : sécurité contre le froid, la glace et le sel',
    description: 'Guide expert pour protéger les pattes du chien en hiver — prévention des engelures, brûlures de glace, brûlures chimiques du sel de déneigement. Routine de soins des pattes, bottes de protection et alternatives de déneigement sûres.',
    bodyParagraphs: [
      'L\'hiver pose des défis uniques pour les pattes des chiens. Le sel de déneigement (chlorure de sodium, chlorure de calcium) provoque des brûlures chimiques et des fissures, tandis que la glace cause des coupures. Les cycles répétés de gel-dégel endommagent les tissus des coussinets. Plus dangereux encore, les chiens peuvent lécher le sel de leurs pattes, provoquant des troubles gastro-intestinaux voire une intoxication au sodium.',
      'Certaines races ont besoin de plus de protection que d\'autres en hiver. Les petits chiens et les races à poil court (Chihuahua, Lévrier) sont plus proches du sol froid et plus vulnérables aux engelures. Les races à poil long (Golden Retriever) peuvent avoir des boules de glace entre les doigts, causant douleur et boiterie. Les chiens âgés souffrant d\'arthrite peuvent ressentir plus d\'inconfort par temps froid.',
      'Établir une routine de soins des pattes en hiver est essentiel. Après chaque sortie, essuyez les pattes avec de l\'eau tiède et un chiffon doux pour éliminer le sel et les particules de glace. Coupez les poils entre les doigts pour réduire la formation de boules de glace. Utilisez un baume pour pattes sans danger pour les animaux ou de la vaseline avant les promenades comme barrière protectrice. Pour les conditions extrêmes, envisagez des bottes de protection.',
    ],
    knowledgeCards: [
      { title: 'Comment le sel de déneigement endommage les pattes', body: 'Le sel de déneigement (chlorure de sodium, chlorure de calcium, chlorure de magnésium) endommage les cellules des coussinets par osmose — en extrayant l\'humidité des tissus, provoquant sécheresse, fissures et brûlures chimiques. Le chlorure de calcium est particulièrement dangereux car il réagit de manière exothermique avec la neige, générant de la chaleur supplémentaire.' },
      { title: 'Apparence des engelures sur les pattes', body: 'Les engelures précoces apparaissent comme une peau pâle ou bleuâtre, froide au toucher. Au réchauffement, la zone devient rouge, enflée et douloureuse avec des cloques. Les engelures sévères entraînent une nécrose tissulaire (noircissement) nécessitant un débridement chirurgical. Les coussinets, les espaces interdigitaux et les extrémités des oreilles sont les plus touchés.' },
      { title: 'Comment fonctionnent les baumes pour pattes', body: 'Les baumes pour pattes sans danger (contenant cire d\'abeille, beurre de karité, huile de coco) forment un film occlusif protecteur sur les coussinets, empêchant le contact avec le sel tout en retenant l\'humidité. Appliqués avant la promenade, ils protègent ; après la promenade, ils aident à la réparation. La vaseline est une alternative d\'urgence mais manque de nutriments nourrissants.' },
      { title: 'Prévention et traitement des boules de glace', body: 'Les boules de glace entre les doigts écartent les orteils, causant douleur, boiterie et déchirures. La prévention inclut la coupe des poils interdigitaux et l\'utilisation de baume. Si elles se forment, trempez les pattes dans de l\'eau tiède (pas chaude) jusqu\'à dissolution — ne tirez pas sur les boules de glace, cela déchirerait la peau.' },
    ],
    prevention: [
      'Essuyez les pattes à l\'eau tiède après chaque sortie pour éliminer le sel et les débris',
      'Appliquez un baume pour pattes ou de la vaseline avant les promenades hivernales',
      'Coupez les poils entre les doigts pour réduire la formation de boules de glace',
      'Investissez dans des bottes de protection bien ajustées pour les conditions extrêmes',
      'Utilisez un dégivrant sans danger pour les animaux à la maison (à base d\'urée ou CMA)',
      'Placez des tapis absorbants à l\'intérieur pour sécher les pattes à l\'entrée',
      'Gardez les poils des pattes bien taillés en hiver pour réduire l\'accumulation de neige',
    ],
    symptoms: [
      'Rougeur, inflammation ou gonflement des pattes',
      'Fissures, crevasses ou saignements visibles sur les coussinets',
      'Boiterie, réticence à marcher ou léchage fréquent des pattes',
      'Décoloration des coussinets (pâle ou bleuâtre indique une engelure, rouge vif une brûlure chimique)',
      'Cloques ou ulcérations sur les coussinets',
      'Boules de glace entre les doigts provoquant une boiterie',
      'Léchage excessif entraînant l\'ingestion de sel de déneigement',
    ],
    firstAid: [
      { title: 'Lavez les pattes à l\'eau tiède', content: 'Utilisez de l\'eau tiède (environ 37 °C) et un chiffon doux. Éliminez doucement tout le sel, la glace et les débris visibles. Portez une attention particulière aux espaces entre les doigts. Séchez soigneusement mais doucement.' },
      { title: 'Inspectez les coupures ou brûlures', content: 'Examinez attentivement chaque coussinet, espace interdigital et lit de l\'ongle. Recherchez des fissures, rougeurs, cloques ou saignements. En cas de brûlure chimique, rincez abondamment à l\'eau tiède pendant au moins 5 minutes.' },
      { title: 'Appliquez un baume réparateur', content: 'Après lavage et séchage, appliquez une couche de baume réparateur ou de vaseline. En cas de plaie ouverte, appliquez d\'abord un spray antiseptique sans danger, puis un bandage léger.' },
      { title: 'Surveillez et consultez un vétérinaire', content: 'Surveillez la guérison pendant les 24 heures suivantes. Si la boiterie persiste, le gonflement augmente, ou du pus/une odeur apparaît, consultez immédiatement un vétérinaire. En cas de suspicion d\'engelure, ne frottez pas la zone — trempez dans l\'eau tiède et cherchez une aide vétérinaire immédiate.' },
    ],
    faqs: [
      { question: 'Mon chien a-t-il vraiment besoin de bottes ?', answer: 'Cela dépend de votre situation. En cas de froid extrême (en dessous de -12 °C), de longues promenades sur des routes salées, ou si votre chien a déjà des lésions aux pattes, les bottes sont fortement recommandées. De nombreux chiens s\'y habituent avec un entraînement patient. Pour les courtes promenades, un baume pour pattes suffit généralement.' },
      { question: 'Quel est le dégivrant le plus sûr pour les animaux ?', answer: 'Les produits contenant de l\'urée (carbamide) ou du CMA (acétate de calcium et de magnésium) sont plus sûrs pour les pattes et l\'environnement. Évitez le chlorure de sodium (sel gemme), le chlorure de calcium et le chlorure de magnésium. Vérifiez les étiquettes — de nombreux produits revendiquent "sans danger pour les animaux" mais seul un agent amer est ajouté.' },
      { question: 'À quelle fréquence dois-je appliquer du baume sur les pattes de mon chien ?', answer: 'En hiver, appliquez avant chaque promenade et après le nettoyage post-promenade. Si votre chien a les pattes particulièrement sèches ou fissurées, appliquez 2–3 fois par jour. L\'application avant le coucher permet une absorption optimale pendant la nuit.' },
      { question: 'À quoi ressemble une engelure chez le chien ?', answer: 'Les engelures précoces apparaissent comme une peau pâle, bleuâtre ou grise, anormalement froide au toucher. Après réchauffement, la zone devient rouge, enflée et douloureuse. Les engelures sévères provoquent des cloques puis une nécrose (noircissement). Les coussinets, espaces interdigitaux, bouts d\'oreilles et queue sont les plus touchés.' },
    ],
    relatedTools: [
      { name: 'Calculateur d\'âge canin', href: 'dog/dog-age-calculator', description: 'Convertissez l\'âge de votre chien en années humaines.' },
      { name: 'Guide des urgences canines', href: 'dog/emergency', description: 'Guide étape par étape pour les urgences courantes du chien.' },
    ],
  },
  'christmas-foods': {
    title: 'Aliments de Noël toxiques pour les chiens : guide de sécurité alimentaire des fêtes',
    description: 'Guide complet des aliments de Noël dangereux pour les chiens — chocolat, desserts au xylitol, pudding aux raisins, mince pies, farce aux oignons. Apprenez la toxicité, les symptômes et les mesures d\'urgence.',
    bodyParagraphs: [
      'Noël apporte une abondance de nourriture — dont une grande partie est dangereuse pour les chiens. Des boîtes de chocolat au pudding de Noël aux raisins secs, la saison des fêtes connaît un pic d\'intoxications alimentaires canines. Les études montrent une augmentation de 75 % des visites vétérinaires d\'urgence pour chiens pendant Noël. Les coupables les plus courants : chocolat, desserts sans sucre au xylitol, raisins secs, farce aux oignons et alcool.',
      'Chaque aliment toxique a un mécanisme d\'empoisonnement différent. Le chocolat contient de la théobromine et de la caféine, affectant le cœur et le système nerveux central. Les raisins secs peuvent causer une insuffisance rénale aiguë par un mécanisme encore mal compris. Le xylitol déclenche une libération massive d\'insuline, provoquant une hypoglycémie potentiellement mortelle et une insuffisance hépatique. Les oignons et l\'ail provoquent des dommages oxydatifs aux globules rouges (anémie hémolytique).',
      'La prévention est la seule garantie. Gardez la nourriture hors de portée sur les comptoirs et les tables, utilisez des poubelles avec couvercle, et informez les invités de ne pas nourrir le chien. Préparez des friandises sûres comme alternative. Si une ingestion accidentelle se produit, savoir quoi faire peut sauver une vie — contactez immédiatement un vétérinaire ou une ligne antipoison pour animaux.',
    ],
    knowledgeCards: [
      { title: 'Toxicité du chocolat : le danger de la théobromine', body: 'La théobromine et la caféine dans le chocolat sont des méthylxanthines que les chiens métabolisent difficilement. Le chocolat noir contient 15–20 mg de théobromine par gramme, le chocolat au lait environ 2 mg/g. Un chien de 10 kg peut atteindre une dose toxique avec 30 g de chocolat noir. Symptômes : vomissements, diarrhée, hyperactivité, tachycardie et convulsions.' },
      { title: 'Xylitol : le danger mortel caché', body: 'Le xylitol est un édulcorant sans sucre présent dans les chewing-gums, bonbons, beurre de cacahuète, pâtisseries et dentifrices sans sucre. Chez le chien, il déclenche une libération massive d\'insuline, provoquant une hypoglycémie sévère en 30 minutes. Des doses élevées peuvent causer une nécrose hépatique aiguë. Moins d\'1 g de xylitol peut être toxique pour un chien de 10 kg — l\'équivalent d\'un ou deux chewing-gums.' },
      { title: 'Le paradoxe de la toxicité des raisins', body: 'Le mécanisme de toxicité des raisins, raisins secs et groseilles chez le chien reste mal compris, mais peut causer une insuffisance rénale aiguë. La sensibilité individuelle varie considérablement — certains chiens ingèrent de grandes quantités sans symptômes, d\'autres développent une insuffisance rénale avec seulement quelques raisins secs. Symptômes : vomissements, diarrhée, léthargie et diminution de la production d\'urine dans les 24–72 heures.' },
      { title: 'Oignons et ail : toxicité cumulative', body: 'Les oignons, l\'ail, les poireaux et les échalotes (genre Allium) contiennent des thiosulfates qui causent des dommages oxydatifs aux globules rouges (anémie à corps de Heinz). Contrairement aux toxines aiguës, la toxicité de l\'oignon est cumulative — de petites quantités répétées sont tout aussi dangereuses. Les symptômes apparaissent après 1–5 jours : gencives pâles, faiblesse, respiration rapide et urine couleur porto.' },
    ],
    prevention: [
      'Gardez les boîtes de chocolat, calendriers de l\'Avent et bonbons en hauteur, hors de portée',
      'Vérifiez les étiquettes de beurre de cacahuète — assurez-vous qu\'il ne contient pas de xylitol',
      'Éloignez le pudding de Noël, les mince pies et le cake aux fruits — ils contiennent des raisins secs',
      'Assurez-vous que la farce aux oignons, la sauce et les plats à l\'ail sont inaccessibles',
      'Ne laissez jamais de boissons alcoolisées à portée du chien — y compris le lait de poule et le gâteau au rhum',
      'Informez les invités : "Ne nourrissez pas le chien" — utilisez des barrières ou une laisse',
      'Préparez des friandises de fête sûres (petits morceaux de dinde nature, carottes ou haricots verts)',
    ],
    symptoms: [
      'Vomissements et diarrhée (possiblement sanglants)',
      'Léthargie, faiblesse ou effondrement',
      'Gencives pâles ou jaunâtres (toxicité de l\'oignon)',
      'Tremblements, convulsions ou hyperexcitation (chocolat/xylitol)',
      'Fréquence cardiaque accélérée ou arythmie',
      'Diminution ou absence de production d\'urine (toxicité des raisins)',
      'Perte de coordination ou démarche chancelante (toxicité de l\'alcool)',
    ],
    firstAid: [
      { title: 'Identifiez ce qui a été ingéré et en quelle quantité', content: 'Déterminez ce que votre chien a mangé, combien et quand. Conservez les emballages ou les restes de nourriture. Cela aide le vétérinaire à calculer la dose toxique.' },
      { title: 'Contactez un vétérinaire ou une ligne antipoison', content: 'Contactez immédiatement votre vétérinaire, la clinique d\'urgence ou une ligne antipoison pour animaux (ASPCA : 888-426-4435). Fournissez les détails de l\'ingestion. Ne faites pas vomir sans avis vétérinaire — certaines substances (comme le xylitol) sont plus dangereuses si vomies.' },
      { title: 'Ne faites pas vomir (sauf indication vétérinaire)', content: 'Faire vomir n\'est pas toujours sûr ou recommandé. Certaines substances (produits au xylitol) peuvent être aspirées dans les poumons pendant le vomissement. Les substances corrosives causent des dommages supplémentaires si vomies. Attendez toujours les conseils du vétérinaire.' },
      { title: 'Rendez-vous aux urgences vétérinaires', content: 'Même si votre chien semble asymptomatique, de nombreuses toxines (raisins secs, xylitol) causent des dommages avant l\'apparition des symptômes. Rendez-vous immédiatement à la clinique vétérinaire d\'urgence la plus proche. Apportez les emballages ou restes de nourriture.' },
    ],
    faqs: [
      { question: 'Quelle quantité de chocolat est mortelle pour un chien ?', answer: 'Cela dépend du type de chocolat et du poids du chien. Guide approximatif : un chien de 10 kg atteint une dose toxique avec 30 g de chocolat noir ou 140 g de chocolat au lait. Le chocolat blanc ne contient presque pas de théobromine mais peut causer des troubles digestifs. Utilisez un calculateur de toxicité du chocolat en ligne ou contactez un vétérinaire.' },
      { question: 'Quelles friandises de Noël puis-je donner à mon chien en toute sécurité ?', answer: 'Options sûres : petits morceaux de dinde nature (sans peau, sans os, sans assaisonnement), carottes crues, haricots verts, purée de citrouille cuite (sans épices), myrtilles et tranches de pomme (sans pépins). Évitez tout ce qui contient des assaisonnements, du beurre, de l\'ail ou des oignons.' },
      { question: 'Combien de temps après avoir mangé des raisins secs les symptômes apparaissent-ils ?', answer: 'Les symptômes initiaux (vomissements, diarrhée) apparaissent généralement dans les 6–12 heures. Les signes d\'insuffisance rénale (diminution de la production d\'urine, léthargie, perte d\'appétit) peuvent apparaître dans les 24–72 heures. N\'attendez jamais les symptômes — la toxicité des raisins nécessite une intervention vétérinaire immédiate.' },
      { question: 'Que se passe-t-il si mon chien boit une gorgée d\'alcool ?', answer: 'Les chiens sont beaucoup plus sensibles à l\'alcool que les humains. Même de petites quantités peuvent causer vomissements, ataxie, dépression du système nerveux central, difficultés respiratoires et acidose métabolique. Contactez immédiatement un vétérinaire. Les boissons alcoolisées des fêtes (lait de poule, gâteau au rhum) sont tout aussi dangereuses.' },
    ],
    relatedTools: [
      { name: 'Vérificateur d\'aliments toxiques', href: 'shared/toxic-checker', description: 'Vérifiez si un aliment est sûr pour votre chien.' },
      { name: 'Guide des urgences canines', href: 'dog/emergency', description: 'Guide étape par étape pour les urgences courantes.' },
      { name: 'Calculateur de calories', href: 'dog/dog-calorie-calculator', description: 'Calculez l\'apport calorique quotidien idéal.' },
    ],
  },
  'halloween-candy': {
    title: 'Mon chien a mangé des bonbons d\'Halloween : plan d\'action d\'urgence',
    description: 'Guide d\'urgence pour les chiens ayant mangé des bonbons d\'Halloween — reconnaître les signes de toxicité, que faire selon le type de bonbon. Quand faire vomir et quand se rendre directement aux urgences.',
    bodyParagraphs: [
      'Halloween est l\'une des fêtes les plus dangereuses pour les chiens. Les bols de bonbons sont partout, les décorations peuvent être ingérées, et les sonnettes fréquentes peuvent faire fuir les chiens. Le chocolat, les bonbons sans sucre au xylitol et les raisins secs sont les trois principales expositions toxiques pour les chiens à Halloween. L\'ASPCA rapporte une augmentation de 40 % des appels pour empoisonnement canin dans les jours suivant Halloween.',
      'La diversité des bonbons d\'Halloween signifie des risques de toxicité variés. Les barres chocolatées sont une menace évidente, mais les bonbons "sans sucre" peuvent contenir du xylitol, plus toxique que le chocolat. Les emballages de bonbons présentent également des risques d\'étouffement et d\'occlusion intestinale. Les bâtonnets de sucette et les emballages plastiques sont particulièrement dangereux — ils peuvent perforer l\'intestin ou causer des occlusions mortelles.',
      'La prévention est simple mais cruciale : gardez les bols de bonbons en hauteur, dans des placards et des contenants scellés. Ramassez immédiatement les bonbons tombés après le retour des enfants. Assurez-vous que les chiens ont un espace sûr pendant les ouvertures de porte — utilisez des barrières ou une laisse. Éduquez les enfants à ne jamais partager de bonbons avec les chiens, même "juste un petit peu".',
    ],
    knowledgeCards: [
      { title: 'Le xylitol caché dans les bonbons d\'Halloween', body: 'De nombreux bonbons "sans sucre" ou "à teneur réduite en sucre" d\'Halloween contiennent du xylitol — un édulcorant 100 fois plus toxique pour les chiens que le chocolat. Le xylitol se trouve dans les chewing-gums sans sucre, les menthes, les bonbons durs et certains bonbons au beurre de cacahuète. Chez le chien, il provoque une hypoglycémie sévère en 30 minutes et une insuffisance hépatique à forte dose.' },
      { title: 'Types de chocolat et toxicité', body: 'Plus la teneur en cacao est élevée, plus la toxicité est forte. Le chocolat de cuisson (poudre de cacao) est le plus toxique, suivi du chocolat noir (70 %+ cacao), du chocolat mi-sucré, puis du chocolat au lait. Le chocolat blanc ne contient presque pas de théobromine mais sa teneur élevée en matières grasses peut causer une pancréatite. Les mini-barres chocolatées d\'Halloween contiennent 2–4 g de cacao chacune — quelques-unes suffisent à menacer un petit chien.' },
      { title: 'Occlusion intestinale par emballages', body: 'Les emballages de bonbons, bâtonnets de sucette et plastiques ne se digèrent pas dans l\'estomac du chien et peuvent causer une occlusion intestinale partielle ou complète. Symptômes : vomissements répétés, perte d\'appétit, constipation et douleur abdominale. Une occlusion peut nécessiter une chirurgie. Si votre chien a avalé des emballages, contactez immédiatement un vétérinaire.' },
      { title: 'Toxicité des boîtes de raisins secs', body: 'Parfois distribuées comme alternative "saine" à Halloween, les petites boîtes de raisins secs sont extrêmement dangereuses pour les chiens. Les raisins secs peuvent causer une insuffisance rénale aiguë, avec une sensibilité individuelle très variable. Même une petite boîte peut être mortelle pour un grand chien. Ne laissez jamais les chiens accéder aux raisins secs ou aux raisins.' },
    ],
    prevention: [
      'Gardez les bols de bonbons sur des étagères hautes, dans des placards ou des contenants verrouillés',
      'Ramassez immédiatement tous les bonbons et emballages tombés après le retour des enfants',
      'Utilisez des barrières ou une laisse pour empêcher les chiens de s\'échapper pendant les ouvertures de porte',
      'Éduquez les enfants à ne jamais partager de bonbons avec les chiens',
      'Vérifiez le jardin pour les bonbons tombés des enfants du voisinage',
      'Préparez des friandises d\'Halloween sûres pour chiens (purée de citrouille ou friandises spéciales)',
      'Gardez les numéros d\'urgence vétérinaire à portée de main — préparez-vous à l\'avance',
    ],
    symptoms: [
      'Vomissements et diarrhée (possiblement sanglants ou contenant des fragments d\'emballage)',
      'Léthargie, faiblesse ou effondrement',
      'Tremblements, contractions musculaires ou convulsions',
      'Gencives pâles ou jaunâtres',
      'Fréquence cardiaque accélérée ou arythmie',
      'Douleur abdominale, ballonnement ou dos arqué',
      'Perte de coordination ou démarche chancelante',
    ],
    firstAid: [
      { title: 'Identifiez ce qui a été ingéré et en quelle quantité', content: 'Déterminez rapidement quels bonbons votre chien a mangés, combien et quand. Rassemblez tous les emballages et bonbons restants. Calculez la teneur en cacao si du chocolat a été ingéré. Cela aide le vétérinaire à évaluer le risque.' },
      { title: 'Contactez un vétérinaire ou une ligne antipoison', content: 'Contactez immédiatement votre vétérinaire ou une ligne antipoison animale 24h/24. Fournissez le poids de votre chien, ce qui a été ingéré et la quantité estimée. Si des vomissements sont nécessaires, ils doivent être provoqués dans les 2 heures par un vétérinaire — ne le faites pas à la maison.' },
      { title: 'Ne faites pas vomir à la maison', content: 'Les vomissements provoqués à la maison (eau oxygénée) peuvent être dangereux, surtout pour certains types de bonbons. L\'ingestion de xylitol suivie de vomissements augmente le risque d\'aspiration. Les objets pointus (bâtonnets de sucette) peuvent causer des blessures lors des vomissements. Faites toujours provoquer les vomissements par un vétérinaire.' },
      { title: 'Rendez-vous immédiatement aux urgences vétérinaires', content: 'Rassemblez tous les emballages et échantillons de bonbons restants, et rendez-vous immédiatement à la clinique vétérinaire d\'urgence 24h/24 la plus proche. N\'attendez pas les symptômes — le chocolat, le xylitol et les raisins secs causent des dommages avant l\'apparition des symptômes.' },
    ],
    faqs: [
      { question: 'Une seule barre chocolatée d\'Halloween est-elle dangereuse ?', answer: 'Cela dépend du type de chocolat et du poids du chien. Un Chihuahua de 5 kg peut atteindre une dose toxique avec une barre de 5 g de chocolat noir (70 % cacao), tandis qu\'un Labrador de 30 kg avec une barre de chocolat au lait peut n\'avoir que de légers troubles digestifs. Contactez toujours un vétérinaire — ne devinez pas.' },
      { question: 'Que faire si mon chien a avalé des emballages de bonbons ?', answer: 'Surveillez les signes d\'occlusion intestinale : vomissements répétés, perte d\'appétit, difficulté à déféquer, douleur abdominale. Les petits emballages souples peuvent passer, mais le papier aluminium, le plastique et les bâtonnets de sucette nécessitent une évaluation vétérinaire urgente. En cas de doute, consultez un vétérinaire.' },
      { question: 'Pourquoi les bonbons sans sucre sont-ils plus dangereux pour les chiens ?', answer: 'Les bonbons sans sucre contiennent souvent du xylitol, un édulcorant bien plus toxique pour les chiens que le chocolat. Il provoque une chute brutale de la glycémie en 30 minutes, pouvant entraîner convulsions, coma et insuffisance hépatique. Même une infime quantité de xylitol peut être mortelle.' },
      { question: 'Combien de temps après avoir mangé des bonbons les symptômes apparaissent-ils ?', answer: 'Les symptômes de toxicité au chocolat apparaissent généralement dans les 6–12 heures. L\'empoisonnement au xylitol peut provoquer une hypoglycémie en 30 minutes. Les symptômes de toxicité aux raisins secs peuvent apparaître après 6–24 heures. Les symptômes d\'occlusion par emballages peuvent prendre 24–72 heures. Avec ou sans symptômes, contactez immédiatement un vétérinaire.' },
    ],
    relatedTools: [
      { name: 'Vérificateur d\'aliments toxiques', href: 'shared/toxic-checker', description: 'Vérifiez si un aliment est sûr pour votre chien.' },
      { name: 'Guide des urgences canines', href: 'dog/emergency', description: 'Guide étape par étape pour les urgences courantes.' },
      { name: 'Calculateur de toxicité du chocolat', href: 'shared/toxic-checker', description: 'Évaluez le risque d\'empoisonnement selon le poids et le type de chocolat.' },
    ],
  },
  'fireworks-anxiety': {
    title: 'Comment calmer un chien pendant les feux d\'artifice : guide de gestion de l\'anxiété',
    description: 'Guide complet pour gérer l\'anxiété des chiens face aux feux d\'artifice — stratégies de prévention, désensibilisation sonore, produits apaisants, espaces sécurisés et options médicamenteuses.',
    bodyParagraphs: [
      'Le bruit des feux d\'artifice est l\'un des déclencheurs de peur les plus courants chez les chiens. Des études montrent que jusqu\'à 45 % des chiens présentent un certain degré de peur des feux d\'artifice. L\'ouïe des chiens est environ 4 fois plus sensible que la nôtre — nous entendons jusqu\'à environ 20 kHz, les chiens jusqu\'à environ 45 kHz. Les feux d\'artifice sont non seulement forts mais aussi imprévisibles, produisant une large gamme de fréquences, y compris des crépitements aigus que nous n\'entendons pas.',
      'La peur des feux d\'artifice n\'est pas seulement "avoir peur" — elle peut avoir de graves conséquences physiques et psychologiques. Les chiens paniqués peuvent s\'enfuir (risque très élevé de perte), se blesser en essayant de se cacher, détruire des meubles et des portes, ou même développer des diarrhées et vomissements de stress. Le stress chronique affaiblit le système immunitaire. Le 4 juillet est le jour où les refuges américains reçoivent le plus d\'animaux errants.',
      'Une gestion efficace de l\'anxiété nécessite une stratégie à plusieurs niveaux : préparation préalable (désensibilisation sonore), gestion de l\'environnement (création d\'un espace sûr) et, si nécessaire, aides apaisantes (phéromones, suppléments, médicaments). Commencez l\'intervention avant le début des feux d\'artifice — attendre que le chien soit déjà paniqué rend l\'intervention beaucoup moins efficace.',
    ],
    knowledgeCards: [
      { title: 'Pourquoi les chiens ont peur des feux d\'artifice', body: 'Trois facteurs expliquent cette peur : l\'intensité sonore (4 fois plus forte que perçue par les humains), l\'imprévisibilité (les détonations aléatoires ne peuvent être anticipées) et l\'impossibilité de contrôler (le chien ne peut pas "fuir" le bruit). Ces facteurs déclenchent une réponse évolutive de combat ou de fuite. Certaines races (Border Collie, Berger Australien) sont plus sensibles aux stimuli environnementaux et plus sujettes aux phobies sonores.' },
      { title: 'Entraînement à la désensibilisation sonore', body: 'L\'entraînement consiste à diffuser des enregistrements de feux d\'artifice à très faible volume, en augmentant progressivement, tout en associant le son à des expériences positives (friandises, jeux). Commencez à un volume à peine audible — le chien doit rester calme. Augmentez progressivement sur plusieurs semaines. Principe clé : ne dépassez jamais le seuil de confort du chien. S\'il montre des signes de stress, revenez à un volume plus faible.' },
      { title: 'Le rôle de l\'espace sécurisé', body: 'Préparez un "espace sûr" — une zone insonorisée, sombre et confortable (cage couverte de couvertures, placard ou salle de bain). Utilisez des couvertures pour couvrir les fenêtres et atténuer les flashs et le bruit. Diffusez du bruit blanc, du bruit marron ou de la musique classique pour masquer les feux d\'artifice. Habituez le chien à cet espace plusieurs semaines avant la saison pour créer des associations positives.' },
      { title: 'Produits apaisants : qu\'est-ce qui fonctionne ?', body: 'Les phéromones canines (DAP/Adaptil) imitent les phéromones apaisantes produites par les mères et fonctionnent pour certains chiens. Les enveloppements compressifs (ThunderShirt) produisent un effet calmant par pression douce et constante. Les suppléments de L-théanine et de mélatonine peuvent être utilisés sous supervision vétérinaire. Pour les cas sévères, les médicaments anti-anxiété sur ordonnance (trazodone, gabapentine) sont les plus efficaces.' },
    ],
    prevention: [
      'Commencez l\'entraînement à la désensibilisation sonore plusieurs semaines avant la saison des feux d\'artifice',
      'Créez un "refuge" sécurisé dans une zone calme de la maison',
      'Promenez et nourrissez votre chien avant le début des feux — fatiguez-le et rassasiez-le',
      'Fermez les fenêtres, tirez les rideaux et utilisez un générateur de bruit blanc',
      'Envisagez un enveloppement compressif (ThunderShirt) ou un diffuseur de phéromones',
      'Assurez-vous que votre chien porte un collier avec médaille d\'identification et vérifiez la puce électronique',
      'Discutez des options de médicaments anti-anxiété avec votre vétérinaire avant la saison',
    ],
    symptoms: [
      'Tremblements, frissons ou recroquevillement',
      'Halètement et salivation excessifs',
      'Cachette, tentative de fuite ou creusement',
      'Comportement destructeur (gratter les portes, mordre les meubles)',
      'Aboiements, gémissements ou hurlements',
      'Perte de contrôle de la vessie ou des intestins',
      'Déambulation, incapacité à se calmer',
      'Refus de nourriture ou de friandises',
    ],
    firstAid: [
      { title: 'Restez calme — ne renforcez pas la peur', content: 'Agissez de manière calme et normale. Ne réconfortez pas excessivement — cela peut renforcer le comportement de peur. Restez calme, votre chien prendra exemple sur votre comportement. Utilisez une voix calme et grave.' },
      { title: 'Guide vers l\'espace sûr', content: 'Dirigez votre chien vers l\'espace sûr préparé à l\'avance. Ne le forcez pas — laissez-le choisir d\'y entrer. S\'il choisit de se cacher ailleurs (salle de bain, sous le lit), laissez-le faire tant que c\'est sûr.' },
      { title: 'Utilisez des techniques d\'apaisement', content: 'Si votre chien est habitué au ThunderShirt, mettez-le immédiatement. Allumez le générateur de bruit blanc ou mettez de la musique classique. Offrez un jouet à mâcher ou un jouet garni de nourriture — mâcher est un comportement anti-stress naturel chez le chien.' },
      { title: 'Surveillez et contactez un vétérinaire', content: 'Si votre chien montre une panique extrême (auto-mutilation, fuite destructrice, diarrhée de stress), contactez un vétérinaire. Pour les événements futurs, discutez des médicaments anti-anxiété sur ordonnance — ils sont plus efficaces lorsqu\'ils sont administrés avant le début de la panique.' },
    ],
    faqs: [
      { question: 'Puis-je donner des calmants humains à mon chien ?', answer: 'Absolument pas. Les médicaments humains (Benadryl, somnifères) ont des dosages et des effets complètement différents chez les chiens et peuvent être toxiques. Seuls les médicaments prescrits par un vétérinaire sont sûrs. Si votre chien souffre d\'anxiété sévère, discutez des options médicamenteuses avec votre vétérinaire plusieurs semaines à l\'avance.' },
      { question: 'Le ThunderShirt fonctionne-t-il vraiment ?', answer: 'Les études montrent qu\'environ 60 % des chiens voient leurs symptômes d\'anxiété réduits avec un enveloppement compressif. L\'efficacité varie selon les chiens — certains réagissent remarquablement bien, d\'autres pas du tout. La pression douce et constante active le système nerveux parasympathique, produisant un effet calmant. À utiliser de préférence dans le cadre d\'une stratégie globale.' },
      { question: 'Dois-je laisser mon chien se cacher pendant les feux d\'artifice ?', answer: 'Oui, laissez-le se cacher s\'il le souhaite. Se cacher est un mécanisme d\'adaptation naturel. Assurez-vous que la cachette est sûre et confortable — fournissez des couvertures et de l\'eau. Ne forcez jamais un chien à sortir de sa cachette — cela ne fait qu\'augmenter le stress.' },
      { question: 'Combien de temps faut-il pour qu\'un chien surmonte sa peur des feux d\'artifice ?', answer: 'Sans intervention, la peur des feux d\'artifice a tendance à s\'aggraver avec l\'âge (sensibilisation). Avec un entraînement approprié à la désensibilisation et une modification comportementale, de nombreux chiens montrent une amélioration significative en 4–8 semaines. Une "guérison" complète n\'est pas toujours réaliste — l\'objectif est de gérer la peur à un niveau acceptable.' },
    ],
    relatedTools: [
      { name: 'Guide des urgences canines', href: 'dog/emergency', description: 'Guide étape par étape pour les urgences courantes du chien.' },
    ],
  },
  'spring-allergies': {
    title: 'Allergies printanières du chien : symptômes, traitement et prévention',
    description: 'Guide complet des allergies printanières canines — pollen, herbe, moisissures. Apprenez à identifier les symptômes, distinguer les allergies environnementales des allergies alimentaires, et connaître les options de traitement.',
    bodyParagraphs: [
      'Les allergies printanières (dermatite atopique) sont l\'une des maladies cutanées chroniques les plus courantes chez les chiens, touchant environ 10–15 % de la population canine. Contrairement aux humains, les symptômes allergiques des chiens se manifestent principalement par des problèmes cutanés plutôt que respiratoires. Lorsque les allergènes environnementaux (pollen, graines d\'herbe, spores de moisissures) entrent en contact avec la peau du chien ou sont inhalés, ils déclenchent une réponse immunitaire provoquant des démangeaisons intenses, une inflammation et des infections cutanées secondaires.',
      'Il est important de distinguer les allergies saisonnières des allergies permanentes. Si votre chien ne présente des symptômes qu\'au printemps (mars–mai), il s\'agit probablement d\'une allergie au pollen ou à l\'herbe. Si les symptômes persistent toute l\'année, les acariens, les moisissures ou une allergie alimentaire peuvent être en cause. Allergènes courants : pollen d\'arbres (chêne, bouleau, cèdre), pollen de graminées (chiendent, fléole), spores de moisissures et insectes extérieurs (les puces sont également plus actives au printemps).',
      'Le traitement des allergies printanières nécessite une approche multifacette. D\'abord, réduire l\'exposition : limiter les activités extérieures quand le pollen est élevé, essuyer le chien avec un chiffon humide après les promenades, laver régulièrement la literie. Ensuite, utiliser des médicaments recommandés par le vétérinaire : antihistaminiques, corticostéroïdes, Apoquel (oclacitinib) ou injections de Cytopoint (lokivetmab). Enfin, envisager des stratégies à long terme : immunothérapie (vaccins contre les allergies) et supplémentation en acides gras essentiels.',
    ],
    knowledgeCards: [
      { title: 'Pourquoi les allergies canines se manifestent par des problèmes cutanés', body: 'La peau des chiens contient une grande quantité de mastocytes — ces cellules immunitaires libèrent de l\'histamine au contact des allergènes. Contrairement aux humains (dont les mastocytes sont concentrés dans les voies respiratoires), les mastocytes des chiens sont répartis dans toute la peau, provoquant démangeaisons, rougeurs et inflammation plutôt qu\'éternuements et écoulement nasal.' },
      { title: 'Allergies alimentaires vs environnementales', body: 'Les allergies alimentaires sont constantes toute l\'année, tandis que les allergies environnementales ont généralement un schéma saisonnier. Les symptômes les plus courants des allergies alimentaires incluent les otites chroniques, les démangeaisons anales et les problèmes gastro-intestinaux. Les allergies environnementales se manifestent principalement par des démangeaisons au visage, aux pattes, au ventre et aux aisselles. Les deux peuvent coexister — environ 30 % des chiens atopiques ont aussi une allergie alimentaire.' },
      { title: 'Mécanisme d\'Apoquel et Cytopoint', body: 'Apoquel (oclacitinib) est un inhibiteur de Janus kinase qui bloque la transmission du signal de démangeaison dans les cellules. Il agit en 4 heures, idéal pour le contrôle à court terme des poussées. Cytopoint (lokivetmab) est un anticorps monoclonal qui neutralise l\'IL-31 (cytokine de la démangeaison), une injection durant 4–8 semaines. Les deux sont plus sûrs que les corticostéroïdes à long terme.' },
      { title: 'Fonctionnement de l\'immunothérapie', body: 'L\'immunothérapie (vaccins contre les allergies) entraîne le système immunitaire du chien à tolérer les allergènes par exposition progressive à des extraits allergéniques. Des tests d\'allergie (intradermiques ou sériques) sont nécessaires pour identifier les allergènes spécifiques. La phase initiale nécessite des injections fréquentes, puis une fois par mois. Environ 60–80 % des chiens montrent une amélioration significative, généralement après 6–12 mois.' },
    ],
    prevention: [
      'Réduisez les activités extérieures lorsque le pollen est élevé (le matin tôt et le soir)',
      'Essuyez les pattes et le corps du chien avec un chiffon humide après chaque promenade',
      'Lavez la literie du chien chaque semaine à l\'eau chaude pour éliminer les allergènes',
      'Utilisez un purificateur d\'air avec filtre HEPA pour réduire les allergènes intérieurs',
      'Gardez la pelouse tondue court, évitez le contact avec les hautes herbes et mauvaises herbes',
      'Utilisez régulièrement des produits anti-puces — le printemps est la saison des puces',
      'Ajoutez des acides gras oméga-3 à l\'alimentation pour soutenir la barrière cutanée',
    ],
    symptoms: [
      'Démangeaisons intenses, particulièrement au visage, aux pattes, au ventre et aux aisselles',
      'Léchage fréquent des pattes, donnant un aspect rouillé aux poils (coloration par la salive)',
      'Rougeur, inflammation ou éruption cutanée',
      'Otites récurrentes ou démangeaisons des oreilles (secouement de tête, grattage)',
      'Perte de poils (alopécie) ou épaississement de la peau (lichénification)',
      'Grattage excessif entraînant des lésions cutanées et des croûtes',
      'Infections cutanées bactériennes ou fongiques secondaires (odeur, peau grasse)',
      'Yeux rouges, larmoyants ou écoulement oculaire',
    ],
    firstAid: [
      { title: 'Baignez avec un shampooing apaisant', content: 'Utilisez un shampooing doux apaisant contenant de l\'avoine, de l\'aloe vera ou des céramides. Baignez à l\'eau tiède (pas chaude), laissez le shampooing agir 5–10 minutes. Rincez abondamment. Un bain 1–2 fois par semaine peut aider à éliminer les allergènes.' },
      { title: 'Utilisez une collerette élisabéthaine', content: 'Si votre chien se gratte excessivement au point de se blesser, utilisez une collerette ou un collier souple pour éviter d\'autres dommages. N\'utilisez jamais de vêtements serrés ou de bandages — cela augmente le risque d\'infection.' },
      { title: 'Contactez votre vétérinaire', content: 'Contactez votre vétérinaire pour discuter des options de traitement : antihistaminiques, Apoquel ou injections de Cytopoint. Le vétérinaire déterminera le dosage approprié et exclura d\'autres problèmes cutanés (gale, infection fongique).' },
      { title: 'Tenez un journal des symptômes', content: 'Notez quand les symptômes apparaissent, leur gravité et les déclencheurs possibles (taux de pollen élevé, zones de promenade spécifiques). Ces informations aident le vétérinaire à identifier les allergènes et à élaborer un plan de traitement plus efficace.' },
    ],
    faqs: [
      { question: 'Puis-je donner des antihistaminiques humains à mon chien ?', answer: 'Oui, mais uniquement sous supervision vétérinaire. La diphenhydramine (Benadryl) est couramment utilisée chez les chiens à raison de 1 mg/lb (2,2 mg/kg), 2–3 fois par jour. Cependant, les antihistaminiques ne sont efficaces que chez environ 30 % des chiens. N\'utilisez jamais de produits combinés contenant des décongestionnants ou du paracétamol — ils sont toxiques pour les chiens.' },
      { question: 'Les allergies du chien s\'aggravent-elles avec l\'âge ?', answer: 'Oui, la dermatite atopique est généralement une maladie progressive. La plupart des chiens montrent leurs premiers symptômes entre 1 et 3 ans, et les symptômes ont tendance à s\'aggraver avec l\'âge (sensibilisation). Une intervention précoce et une gestion continue sont essentielles pour ralentir la progression et prévenir les infections cutanées secondaires.' },
      { question: 'Comment distinguer une allergie des puces ?', answer: 'L\'allergie aux puces se concentre généralement sur la moitié arrière du dos (queue, pattes arrière, ventre). Les allergies environnementales touchent davantage le visage, les pattes et le ventre. Vérifiez la présence de déjections de puces (débris noirs qui deviennent rouges lorsqu\'ils sont humidifiés) ou de puces vivantes. Un chien peut avoir les deux types d\'allergies simultanément.' },
      { question: 'Les injections contre les allergies fonctionnent-elles vraiment ?', answer: 'L\'immunothérapie est efficace chez environ 60–80 % des chiens, avec une amélioration significative généralement visible après 6–12 mois. Elle cible la cause profonde (le système immunitaire) plutôt que de simplement supprimer les symptômes. Pour la dermatite atopique modérée à sévère, c\'est la stratégie de gestion à long terme la plus sûre et la plus efficace. Tous les chiens ne sont pas éligibles — des tests d\'allergie préalables sont nécessaires.' },
    ],
    relatedTools: [
      { name: 'Guide des urgences canines', href: 'dog/emergency', description: 'Guide étape par étape pour les urgences courantes.' },
    ],
  },
  'thanksgiving': {
    title: 'Aliments de Thanksgiving que les chiens peuvent manger : guide des aliments sûrs et dangereux',
    description: 'Guide complet de sécurité alimentaire de Thanksgiving pour chiens — aliments sûrs (dinde nature, citrouille, haricots verts), aliments dangereux (farce aux oignons, sauce, desserts au xylitol, os).',
    bodyParagraphs: [
      'Thanksgiving est l\'un des jours où les visites aux urgences vétérinaires sont les plus fréquentes aux États-Unis. Certains aliments de table sont sûrs pour les chiens, d\'autres sont mortels. La dinde elle-même (viande blanche nature, sans peau ni os) est une excellente source de protéines, mais la peau de dinde, les os, la farce aux oignons, la sauce, la purée de pommes de terre à l\'ail et les desserts au xylitol sont dangereux. La clé est de distinguer le sûr du dangereux.',
      'Les aliments de Thanksgiving les plus dangereux sont les oignons, l\'ail, les os de dinde, la sauce (riche en graisses + oignons), les raisins secs et les desserts au xylitol. Les oignons et l\'ail contiennent des thiosulfates qui causent une anémie hémolytique. Les os de dinde (surtout cuits) se fragmentent et peuvent perforer l\'œsophage, l\'estomac ou les intestins. Les aliments riches en graisses (sauce, peau de dinde) peuvent déclencher une pancréatite — une inflammation douloureuse et potentiellement mortelle.',
      'Les options sûres incluent : petits morceaux de viande blanche de dinde nature (sans peau, sans os, sans assaisonnement), haricots verts cuits à la vapeur, purée de citrouille cuite (sans épices ni sucre), canneberges nature (petite quantité), tranches de pomme (sans pépins) et carottes crues. Évitez toujours tout ce qui contient des assaisonnements, du beurre, de l\'ail, des oignons ou du xylitol. Même les aliments sûrs doivent être donnés avec modération — une suralimentation peut causer des troubles digestifs.',
    ],
    knowledgeCards: [
      { title: 'Dinde : parties sûres et dangereuses', body: 'Sûr : viande blanche de dinde nature (sans peau, sans os, sans assaisonnement). Dangereux : peau de dinde (riche en graisses → risque de pancréatite), os de dinde (cuits, ils se fragmentent et peuvent perforer les intestins), viande brune (plus grasse), jus de dinde et farce (contiennent oignons, ail, graisses). Assurez-vous que la dinde est bien cuite — la volaille crue peut contenir des salmonelles.' },
      { title: 'Toxicité des oignons et de l\'ail', body: 'Les oignons, l\'ail, les poireaux, les échalotes et la ciboulette (genre Allium) contiennent des thiosulfates qui endommagent les globules rouges par oxydation. Toutes les formes sont toxiques : cuits, crus, déshydratés et en poudre. La poudre d\'oignon est particulièrement concentrée et dangereuse. Symptômes après 1–5 jours : gencives pâles, faiblesse, respiration rapide, urine couleur porto. La toxicité est cumulative.' },
      { title: 'Risque de pancréatite', body: 'Les aliments riches en graisses (peau de dinde, sauce, purée de pommes de terre au beurre) peuvent déclencher une pancréatite — inflammation aiguë du pancréas. Symptômes : douleur abdominale sévère (dos arqué, position de prière), vomissements, diarrhée, léthargie et perte d\'appétit. La pancréatite peut être mortelle et nécessite une hospitalisation. Certaines races (Schnauzer nain, Yorkshire Terrier, Cocker) ont une prédisposition génétique.' },
      { title: 'Xylitol dans les desserts de Thanksgiving', body: 'De nombreux desserts "sans sucre" ou "à teneur réduite en sucre" de Thanksgiving contiennent du xylitol — un édulcorant extrêmement toxique pour les chiens. On le trouve dans les tartes sans sucre, les glaces, les pâtisseries et certains beurres de cacahuète. Il provoque une hypoglycémie sévère en 30 minutes et une insuffisance hépatique à forte dose. Moins d\'1 g de xylitol peut être toxique pour un chien de 10 kg.' },
    ],
    prevention: [
      'Gardez la nourriture au centre de la table et sur les comptoirs, hors de portée du chien',
      'Utilisez des poubelles avec couvercle — la carcasse de dinde est irrésistible pour les chiens',
      'Informez les invités : "Ne nourrissez pas le chien"',
      'Préparez une assiette spéciale sûre pour votre chien (dinde blanche nature + haricots verts + purée de citrouille)',
      'Utilisez des barrières ou une laisse pendant la cuisine et le repas pour empêcher le vol de nourriture',
      'Ramassez immédiatement tout ce qui tombe par terre — oignons, raisins secs, miettes de chocolat',
      'Gardez les desserts en hauteur — les desserts sans sucre au xylitol sont mortels pour les chiens',
    ],
    symptoms: [
      'Vomissements et diarrhée (possiblement sanglants)',
      'Léthargie, faiblesse ou effondrement',
      'Gencives pâles ou jaunâtres (toxicité de l\'oignon)',
      'Douleur abdominale (dos arqué, position de prière, refus d\'être touché)',
      'Perte d\'appétit ou refus de nourriture',
      'Tremblements, convulsions ou fréquence cardiaque accélérée',
      'Urine foncée (couleur porto, indiquant une destruction des globules rouges)',
    ],
    firstAid: [
      { title: 'Identifiez ce qui a été ingéré et en quelle quantité', content: 'Déterminez ce que votre chien a mangé, combien et quand. Conservez des échantillons de nourriture. Portez une attention particulière à l\'ingestion d\'oignons, d\'ail, de raisins secs, de chocolat, de xylitol et d\'os de dinde.' },
      { title: 'Contactez un vétérinaire ou une ligne antipoison', content: 'Contactez immédiatement un vétérinaire ou une ligne antipoison pour animaux. Fournissez le poids de votre chien et les détails de l\'ingestion. Si des oignons, raisins secs, xylitol ou une grande quantité de chocolat ont été ingérés, informez le vétérinaire — cela nécessite une prise en charge immédiate.' },
      { title: 'Ne faites pas vomir (sauf indication vétérinaire)', content: 'Si votre chien a avalé des os de dinde ou des objets pointus, les vomissements aggraveraient les blessures. En cas d\'ingestion de xylitol, les vomissements augmentent le risque d\'aspiration. Attendez toujours les conseils du vétérinaire.' },
      { title: 'Rendez-vous aux urgences vétérinaires', content: 'Rassemblez tous les échantillons de nourriture et emballages restants, et rendez-vous immédiatement à la clinique vétérinaire d\'urgence 24h/24 la plus proche. N\'attendez pas les symptômes — de nombreuses toxines (oignons, raisins secs) causent des dommages avant l\'apparition des symptômes.' },
    ],
    faqs: [
      { question: 'Puis-je donner de la dinde à mon chien ?', answer: 'Oui, mais uniquement de la viande blanche de dinde nature — sans peau, sans os, sans assaisonnement et sans sauce. La peau est riche en graisses et peut causer une pancréatite. Les os (surtout cuits) se fragmentent et peuvent perforer les intestins. La viande brune est plus grasse que la blanche. Une petite quantité (environ 30–60 g) est sûre.' },
      { question: 'La purée de pommes de terre est-elle sûre pour les chiens ?', answer: 'Généralement non. La purée de Thanksgiving contient souvent du beurre, de la crème, de l\'ail ou des oignons — tous nocifs pour les chiens. Les pommes de terre bouillies nature (sans assaisonnement) sont sûres mais peu nutritives. La purée contenant de l\'ail ou des oignons peut causer une anémie hémolytique.' },
      { question: 'Les chiens peuvent-ils manger de la tarte à la citrouille ?', answer: 'Non. La tarte à la citrouille contient du sucre, des épices (comme la noix de muscade, toxique pour les chiens), du beurre et possiblement des édulcorants sans sucre au xylitol. La purée de citrouille nature (sans épices ni sucre) est sûre, mais pas la tarte elle-même.' },
      { question: 'Que faire si mon chien a mangé de la farce aux oignons ?', answer: 'Contactez immédiatement un vétérinaire. La farce aux oignons contient des oignons et de l\'ail concentrés, hautement toxiques. Les symptômes peuvent n\'apparaître qu\'après 1–5 jours, mais les dommages commencent immédiatement. Le vétérinaire peut avoir besoin de provoquer des vomissements (dans les 2 heures), d\'administrer du charbon actif et des fluides intraveineux.' },
    ],
    relatedTools: [
      { name: 'Vérificateur d\'aliments toxiques', href: 'shared/toxic-checker', description: 'Vérifiez si un aliment est sûr pour votre chien.' },
      { name: 'Guide des urgences canines', href: 'dog/emergency', description: 'Guide étape par étape pour les urgences courantes.' },
      { name: 'Calculateur de calories', href: 'dog/dog-calorie-calculator', description: 'Calculez l\'apport calorique quotidien idéal.' },
    ],
  },
  'easter-chocolate': {
    title: 'Chocolat de Pâques et chiens : sécurité de la chasse aux œufs',
    description: 'Guide de toxicité du chocolat de Pâques pour les propriétaires de chiens — seuils d\'empoisonnement à la théobromine, niveaux de toxicité selon le type de chocolat, symptômes et mesures d\'urgence.',
    bodyParagraphs: [
      'Pâques est l\'une des périodes de pointe pour les intoxications au chocolat chez les chiens. Les œufs de Pâques, les lapins en chocolat et les bonbons sont partout, souvent à portée des chiens. Les œufs de Pâques sont généralement en chocolat au lait, mais les œufs en chocolat noir et les lapins en chocolat "premium" ont une teneur en cacao plus élevée, donc plus toxiques. La chasse aux œufs de Pâques est particulièrement dangereuse — les œufs cachés peuvent être trouvés et mangés par les chiens.',
      'La toxicité du chocolat dépend de trois facteurs : le type de chocolat (teneur en cacao), le poids du chien et la quantité ingérée. La théobromine et la caféine sont les composants toxiques. Le chocolat au lait contient environ 2 mg de théobromine par gramme, tandis que le chocolat noir (70 % cacao) en contient 15–20 mg par gramme. Un chien de 10 kg atteint une dose toxique avec 14 g de chocolat noir ou 100 g de chocolat au lait. Les mini-œufs de Pâques pèsent environ 5–10 g chacun.',
      'La prévention est la seule garantie. Le matin de Pâques, assurez-vous que tous les œufs en chocolat ont été ramassés avant que le chien n\'entre dans la pièce. Gardez les lapins en chocolat en hauteur, dans des placards. Gardez le chien à l\'intérieur ou en laisse pendant la chasse aux œufs. Éduquez les enfants : le chocolat n\'est pas une friandise pour chien. En cas d\'ingestion accidentelle, agissez immédiatement — contactez un vétérinaire ou une ligne antipoison.',
    ],
    knowledgeCards: [
      { title: 'Mécanisme de toxicité du chocolat', body: 'La théobromine et la caféine dans le chocolat sont des méthylxanthines qui stimulent le système nerveux central et cardiovasculaire. Les chiens métabolisent difficilement ces composés — la demi-vie est de 2–3 heures chez l\'humain, mais de 17 heures chez le chien. Cela entraîne une accumulation toxique, une stimulation continue du cœur et du système nerveux, pouvant causer arythmie, convulsions et décès.' },
      { title: 'Toxicité selon le type de chocolat', body: 'La poudre de cacao (chocolat de cuisson) est la plus toxique : 20–26 mg de théobromine par gramme. Le chocolat noir (70–85 % cacao) : 15–20 mg/g. Le chocolat mi-sucré : 5–10 mg/g. Le chocolat au lait : 1,5–2 mg/g. Le chocolat blanc ne contient presque pas de théobromine mais sa teneur élevée en graisses peut causer une pancréatite. Les œufs de Pâques sont généralement au chocolat au lait, mais les œufs "premium" peuvent être au chocolat noir.' },
      { title: 'Doses toxiques', body: 'Dose toxique légère (vomissements, diarrhée) : 20 mg de théobromine/kg. Dose modérée (tachycardie) : 40 mg/kg. Dose sévère (convulsions) : 60 mg/kg. Pour un chien de 10 kg : toxicité légère = 100 g de chocolat au lait ou 14 g de chocolat noir ; toxicité sévère = 300 g de chocolat au lait ou 40 g de chocolat noir.' },
      { title: 'Pourquoi Pâques est particulièrement dangereuse', body: 'Pâques combine plusieurs facteurs de risque : grande quantité de chocolat dispersée dans la maison, œufs cachés au niveau du sol, enfants susceptibles de partager involontairement des bonbons, activités extérieures printanières exposant les chiens aux chocolats cachés. La chasse aux œufs est particulièrement dangereuse — les chiens trouvent les œufs en chocolat bien plus vite que les humains grâce à leur odorat.' },
    ],
    prevention: [
      'Le matin de Pâques, assurez-vous que tous les œufs en chocolat ont été ramassés avant que le chien n\'entre dans la pièce',
      'Gardez les lapins en chocolat et les bonbons en hauteur — pas sur les tables basses ou les rebords',
      'Gardez le chien à l\'intérieur ou en laisse pendant la chasse aux œufs de Pâques',
      'Inspectez soigneusement le jardin après la chasse — aucun œuf en chocolat ne doit rester',
      'Éduquez les enfants : le chocolat n\'est pas pour les chiens — même pas "un petit peu"',
      'Préparez des friandises de Pâques sûres pour chien (bâtonnets de carotte ou friandises spéciales)',
      'Gardez les numéros d\'urgence vétérinaire et antipoison à portée de main',
    ],
    symptoms: [
      'Vomissements et diarrhée (possiblement avec des résidus de chocolat)',
      'Hyperexcitation, hyperactivité ou agitation',
      'Fréquence cardiaque accélérée ou arythmie',
      'Tremblements musculaires ou contractions',
      'Halètement excessif et respiration rapide',
      'Température corporelle élevée (hyperthermie)',
      'Convulsions ou effondrement',
    ],
    firstAid: [
      { title: 'Identifiez le type et la quantité ingérés', content: 'Déterminez quel type de chocolat votre chien a mangé, combien et quand. Conservez les emballages pour vérifier la teneur en cacao. Calculez la dose possible de théobromine (mg/kg). Si plusieurs œufs ont été mangés, estimez la quantité totale.' },
      { title: 'Contactez un vétérinaire ou une ligne antipoison', content: 'Contactez immédiatement un vétérinaire ou une ligne antipoison pour animaux (ASPCA : 888-426-4435). Fournissez le poids du chien, le type de chocolat et la quantité estimée. Le vétérinaire calculera le risque et recommandera la marche à suivre.' },
      { title: 'Suivez les instructions du vétérinaire pour les vomissements', content: 'Si le vétérinaire recommande de faire vomir, cela doit être fait dans les 2 heures suivant l\'ingestion. Le vétérinaire utilisera un médicament sûr (apomorphine). Ne faites pas vomir à la maison avec de l\'eau oxygénée — un dosage incorrect peut être dangereux.' },
      { title: 'Surveillez et consultez', content: 'Même si votre chien semble normal, les symptômes d\'intoxication au chocolat peuvent apparaître 6–12 heures plus tard. Si le vétérinaire recommande une observation à domicile, surveillez attentivement. Si des symptômes apparaissent (vomissements, hyperactivité, tremblements, tachycardie), rendez-vous immédiatement aux urgences vétérinaires.' },
    ],
    faqs: [
      { question: 'Un seul œuf de Pâques est-il dangereux pour un chien ?', answer: 'Cela dépend de la taille de l\'œuf, du type de chocolat et du poids du chien. Un œuf de 5 g en chocolat au lait est probablement inoffensif pour un chien de 30 kg, mais peut être toxique pour un Chihuahua de 3 kg. Les œufs en chocolat noir présentent un risque plus élevé pour toutes les tailles. Consultez toujours un vétérinaire.' },
      { question: 'Combien de temps après avoir mangé du chocolat les symptômes apparaissent-ils ?', answer: 'Les premiers symptômes (vomissements, diarrhée) apparaissent généralement dans les 2–4 heures. Les symptômes neurologiques (tremblements, hyperactivité, convulsions) peuvent apparaître après 6–12 heures. En raison du métabolisme lent de la théobromine (demi-vie de 17 heures), les symptômes peuvent persister 24–72 heures.' },
      { question: 'Le chocolat blanc est-il sans danger pour les chiens ?', answer: 'Le chocolat blanc ne contient presque pas de théobromine et ne provoque donc pas d\'intoxication classique au chocolat. Cependant, sa teneur élevée en graisses peut déclencher une pancréatite — une maladie douloureuse et potentiellement mortelle. De plus, le chocolat blanc est souvent mélangé à des édulcorants contenant du xylitol. Il est recommandé d\'éviter complètement tout chocolat.' },
      { question: 'Dois-je faire vomir mon chien ?', answer: 'Uniquement sur instruction explicite du vétérinaire. Le vétérinaire évaluera la situation et décidera si les vomissements sont sûrs. Si le chien présente déjà des symptômes (convulsions), les vomissements augmentent le risque d\'aspiration. Les vomissements provoqués à la maison (eau oxygénée) peuvent être dangereux — faites toujours faire cela par un vétérinaire.' },
    ],
    relatedTools: [
      { name: 'Vérificateur d\'aliments toxiques', href: 'shared/toxic-checker', description: 'Vérifiez si un aliment est sûr pour votre chien.' },
      { name: 'Guide des urgences canines', href: 'dog/emergency', description: 'Guide étape par étape pour les urgences courantes.' },
    ],
  },
};

// Write French translations
const frData = JSON.parse(fs.readFileSync('messages/fr.json', 'utf8'));
frData.seasonal = { ...frData.seasonal, ...fr };
fs.writeFileSync('messages/fr.json', JSON.stringify(frData, null, 2));
console.log('fr.json updated');