/**
 * 批次1: fr, de, ja - compare 子页面翻译
 * 使用结构化方式避免 JSON 转义问题
 */
const fs = require('fs');
const path = require('path');
const MESSAGES_DIR = path.join(__dirname, '..', 'messages');

function readFile(p) {
  let c = fs.readFileSync(p, 'utf-8');
  if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);
  return JSON.parse(c);
}
function clone(o) { return JSON.parse(JSON.stringify(o)); }

const en = readFile(path.join(MESSAGES_DIR, 'en.json'));

// 辅助: 创建翻译后的子页面
function translatePage(enPage, t) {
  const p = clone(enPage);
  // 翻译标题和副标题
  p.title = t.title;
  p.subtitle = t.subtitle;
  p.topicAName = t.topicAName;
  p.topicBName = t.topicBName;
  // 翻译 pros
  p.topicA.pros.forEach((item, i) => {
    if (t.topicA?.pros?.[i]) {
      item.title = t.topicA.pros[i].title;
      item.body = t.topicA.pros[i].body;
    }
  });
  // 翻译 cons
  p.topicA.cons = t.topicA?.cons || p.topicA.cons;
  p.topicA.bestFor = t.topicA?.bestFor || p.topicA.bestFor;
  // topicB
  p.topicB.pros.forEach((item, i) => {
    if (t.topicB?.pros?.[i]) {
      item.title = t.topicB.pros[i].title;
      item.body = t.topicB.pros[i].body;
    }
  });
  p.topicB.cons = t.topicB?.cons || p.topicB.cons;
  p.topicB.bestFor = t.topicB?.bestFor || p.topicB.bestFor;
  // rows
  p.rows.forEach((row, i) => {
    if (t.rows?.[i]) {
      row.dimension = t.rows[i].dimension;
      row.topicA = t.rows[i].topicA;
      row.topicB = t.rows[i].topicB;
    }
  });
  p.verdict = t.verdict;
  // FAQ
  p.faq.forEach((item, i) => {
    if (t.faq?.[i]) {
      item.question = t.faq[i].question;
      item.answer = t.faq[i].answer;
    }
  });
  return p;
}

// 法语翻译数据
const frData = {
  harnessVsCollar: {
    title: "Harnais vs Collier pour Chien : Lequel est le Bon Choix ?",
    subtitle: "Comparaison scientifique des harnais et colliers plats couvrant la s curit  du cou, le contr le de traction, le risque d vasion et les recommandations sp cifiques  la race.",
    topicAName: "Harnais  attache dorsale",
    topicBName: "Collier plat",
    topicA: {
      pros: [
        { title: "S curit  du cou", body: "R partit la pression sur la poitrine et les paules, liminant la compression de la trach e et de la thyro de caus e par la traction. Essentiel pour les races brachyc phales." },
        { title: "Contr le de traction", body: "Les harnais  attache dorsale d couragent la traction en redirigeant le chien lat ralement. Les variantes  attache frontale offrent une force deRedirection encore plus grande." },
        { title: "R sistant  l vasion", body: "Les harnais bien ajust s sont beaucoup plus difficiles pour les chiens  enlever que les colliers l ches, ruisant le risque de fuite." },
        { title: "Id al pour les races brachyc phales", body: "Les bouledogues, carlins, bouledogues fran ais et boston terriers ont des voies respiratoires compromises qui rendent l utilisation du collier risque lors des promenades." }
      ],
      cons: [
        "Peut encourager la traction persistante si aucune formation n est associ e",
        "Plus complexe  ajuster correctement - de nombreux propri taires utilisent des harnais mal ajust s",
        "Peut irriter sous les aisselles si mal ajust ",
        "Certains chiens ristent au d but; n cessite une acclimatation",
        "Ne convient pas pour l attache permanente des dallas d identification"
      ],
      bestFor: "Races brachyc phales, chiots, chiens avec des probl mes de trach e ou de thyro de, chiens qui tirent, et chiens convalescents de blessures au cou ou  la colonne."
    },
    topicB: {
      pros: [
        { title: "Simple et rapide", body: "Facile  mettre et  enlever; aucune p riode d acclimation requise. Id al pour les pauses toilettes rapides." },
        { title: "Attache des dallas", body: "Les colleurs sont l endroit naturel pour les dallas d identification, les plaques antirabiques et les coordonn es." },
        { title: "Co t inf rieur", body: "Un collier plat de qua lit  co te 10-30 $ contre 25-60 $ pour un harnais bien con u." },
        { title: "Aucun risque d irritation", body: "Les colliers plats bien ajust s ne frottent pas et ne restreignent pas le mouvement des paules." }
      ],
      cons: [
        "La pression de traction se concentre sur la trach e, la glande thyro de et les vert bres cervicales",
        "Les chiens brachyc phales peuvent pi ger une restriction respiratoire dangereuse m me avec une traction l gere",
        "Les chiens peuvent se gager de colliers l ches (surtout les greyhounds, whippets et chiens  te troite)",
        "Aucun avantage m canique pour contr ler les chiens qui tirent",
        "Les colliers trangleurs et   pointes sont d conseill s par l AVSAB"
      ],
      bestFor: "Chiens calmes, chiens bien dress s qui ne tirent pas, et pour le port permanent de dallas d identification."
    },
    rows: [
      { dimension: "S curit  du cou", topicA: "Excellent (pas de pression sur le cou)", topicB: "Risque de compression trach ale lors de la traction" },
      { dimension: "Contr le de traction", topicA: "Bon (surtout  attache frontale)", topicB: "Aucun" },
      { dimension: "Risque d vasion", topicA: "Faible (bien ajust)", topicB: "Modr (peut s chapper)" },
      { dimension: "Confort", topicA: "Bon (designs Y-front)", topicB: "Bon (bien ajust)" },
      { dimension: "S curit  brachyc phale", topicA: "Recommand", topicB: "Utiliser avec prudence" },
      { dimension: "Co t initial", topicA: "25-60", topicB: "10-30" },
      { dimension: "Attache des dallas", topicA: "Pas id al", topicB: "Id al" },
      { dimension: "Position v t rinaire", topicA: "Pr f r pour les promenades", topicB: "Pour l identification uniquement, pas pour les promenades des tireurs" }
    ],
    verdict: "<strong>Pour la plupart des chiens - en particulier les races brachyc phales, les chiots et les tireurs - un harnais Y-front bien ajust  est le choix plus s curitaire pour les promenades.</strong> Les colliers plats restent essentiels pour les dallas d identification et les pauses toilettes, mais ne devraient pas utilis s comme outil principal de marche pour les chiens qui tirent. L AVSAB et l AAHA d conseillent tous deux l utilisation de colliers aversifs et recommandent les harnais pour les chiens ayant des probl mes respiratoires ou cervicaux.",
    faq: [
      { question: "Un harnais est-il meilleur qu un collier pour un chien qui tire ?", answer: "Oui. Un harnais  attache frontale redirige le chien lat ralement lorsqu il tire, supprimant le r flexe d opposition qui rend les colliers inefficaces. Pour les tireurs: utilisez un harnais  attache frontale combin  une formation en laisse l che." },
      { question: "Quel type de harnais est le meilleur pour un bouledogue fran ais ?", answer: "Un harnais Y-front qui ne restreint pas le mouvement des paules et ne frotte pas sous les aisselles. Les races brachyc phales ont besoin d une mobilit  des paules sans restriction pour respirer confortablement pendant les promenades." },
      { question: "Un chien peut-il porter la fois un harnais et un collier ?", answer: "Oui - c est l approche recommand e. Portez un collier plat avec dallas d identification en permanence pour l identification en cas de perte, et un harnais pour les promenades pour le contr le et la s curit  du cou." }
    ]
  },
  petInsuranceVsEmergencyFund: {
    title: "Assurance pour animaux vs Fonds d urgence : Quel est le Meilleur Choix ?",
    subtitle: "Comparaison financi re compl te de l assurance pour animaux et des fonds d urgence auto-financ s co uvrant les co ts mensuels, les lacunes de couverture et l analyse de rentabilit.",
    topicAName: "Assurance pour animaux",
    topicBName: "R serve d urgence auto-financ e",
    topicA: {
      pros: [
        { title: "Couvre les co ts catastrophiques", body: "Un diagnostic de cancer co te 3 000-10 000 $+ pour tre trait . L assurance vite l euthanasie financi re." },
        { title: "Pr visibilit  mensuelle", body: "Prime mensuelle fixe (30-150 $) qui r partit le co t sur des ann es plut t que de risquer une facture de 5 000 $+ en une seule fois." },
        { title: "R ductions multi-animaux", body: "La plupart des assureurs offrent 5-10 % de r ductions pour lesBestia multiple." },
        { title: "Options d avenants", body: "Les avenants bien- tre peuvent couvrir les soins de routine (vaccins, dentaire) pour 10-30 $/mois suppl mentaires." }
      ],
      cons: [
        "Ne couvre PAS les conditions pr existantes",
        "Mod le de remboursement: vous payez le v t rinaire d abord, puis d posez les r clamations (traitement de 30-60 jours)",
        "Plafonds annuels et   vie: de nombreuses polices plafonnent  5 000-15 000 $ annuellement",
        "Des exclusions sp cifiques   la race peuvent s appliquer la premi re ann e",
        "La prime augmente avec l ge: un chien de 8 ans co te 2-4x plus cher  assurer"
      ],
      bestFor: "Jeunes animaux en bonne sant , propri taires souhaitant une pr visibilit  des co ts, races es  des troubles co teux, et foyers ne pouvant pas absorber une facture de 5 000 $ +."
    },
    topicB: {
      pros: [
        { title: "Pas de primes", body: "Aucun co t mensuel - chaque euro va directement aux soins de votre animal." },
        { title: "Contr le total", body: "Aucune restriction de couverture, pas d attente, pas de refus de r clamation." },
        { title: "Rapporte des int r	ts", body: "Les fonds dans un compte d pargne   haut rendement (4-5 % APY) croissent avec le temps." },
        { title: "Pas de lai de remboursement", body: "Payez le traitement directement sans attendre." }
      ],
      cons: [
        "Doit enti rement financ  avant l urgence - une urgence de 5 000 $ la premi re ann e annule la strat gie",
        "N cessite la discipline d pargner 100-200 $/mois pendant 5+ ans",
        "Ne peut pas couvrir les co ts catastrophiques au d but de la p riode d pargne",
        "Les oyaux multi-animaux ont besoin de fonds s par s par animal",
        "L inflation rode la valeur r elle si le fonds reste inactif"
      ],
      bestFor: "Propri taires ayant une discipline financi re solide, animaux ge avec conditions pr existantes, et comme compl ment   une assurance   franchise ve."
    },
    rows: [
      { dimension: "Co	t mensuel", topicA: "$30-150/mois", topicB: "$0 (pargner 100-200 $/mois pour constituer la r serve)" },
      { dimension: "Conditions pr	existantes", topicA: "Non couvert", topicB: "Couvert (aucune restriction)" },
      { dimension: "Couverture durgence", topicA: "Couvert apr s franchise", topicB: "Seulement si enti rement financi  (5+ ans)" },
      { dimension: "Dai de remboursement", topicA: "30-60 jours", topicB: "Aucun (paiement direct)" },
      { dimension: "Maladie catastrophique", topicA: "Couvert (sous r ve de plafonds)", topicB: "Montant pargn  suffisant requis" },
      { dimension: "D	marrage", topicA: "D	s le plus jeune ge (n exclut rien)", topicB: "Imm	diatement (mais prend des ann es   constituer)" }
    ],
    verdict: "<strong>L assurance pour animaux existe pour pr venir l euthanasie financi re dans les sc narios catastrophiques - un fonds d urgence auto-financ  ne peut pas couvrir un traitement de cancer de 8 000 $ la premi re ann e.</strong> La strat gie optimale combine les deux: souscrire une assurance accides/maladies quand votre animal est jeune, et constituer un fonds d urgence distinct quivalent   une franchise plus un coussin d urgence.",
    faq: [
      { question: "L assurance pour animaux vaut-elle financ rement ?", answer: "Math matiquement, le propri taire moyen avec des animaux en bonne sant  paiera plus en primes qu il ne recevra en retour. Cependant, l assurance existe pour les risques catastrophiques: si votre animal cancr e, le co t de traitement de 8 000-15 000 $ est couvert moins votre franchise." },
      { question: "Combien dois-je pargner dans un fonds d urgence pour animaux ?", answer: "Les conseillers financiers v t rinaires commandent 3 000-5 000 $ par animal - suffisant pour couvrir une chirurgie d urgence standard. Conservez le fonds dans un compte d pargne   rendement lev  s par." },
      { question: "Dois-je souscrire une assurance ou pargner ?", answer: "La strat gie optimale combine les deux. Souscrivez une assurance accidens/maladies quand votre animal est jeune pour viter les exclusions pr existantes, et constituez simultan ment une r serve d urgence de 3 000 $ + pour les franchises et les d penses non couvertes." }
    ]
  },
  grainFreeVsWholeGrain: {
    title: "Aliments pour Chiens Sans C r ales vs Avec C r ales Compl tes : Laquelle est la Plus Saine ?",
    subtitle: "Comparaison bas e sur les preuves entre aliments sans c r ales et aliments   base de c r ales compl tes co uvrant les pr occupations CMD, la qualit  des ingr dients et le consensus v t rinaire.",
    topicAName: "R gime sans c r ales",
    topicBName: "R gime aux c r ales compl tes",
    topicA: {
      pros: [
        { title: "Charge glyc mique inf rieure", body: "Utilise des l gumineuses et des pommes de terre au lieu des c r ales - lib re le glucose plus lentement." },
        { title: "All gations hypoallergiques", body: "Peut aider les chiens avec de vraies allergies aux c r ales (quoique celles-ci soient rares - moins de 1 % des chiens)." },
        { title: "Teneur en prot ines plus ve", body: "Les formules sans c r ales ont ve 2-5 % de prot ines en plus sur mati re sche." }
      ],
      cons: [
        "L enqu te de la FDA a trouv  une association entre les r gimes sans c r ales et la CMD associ e au r gime",
        "Les l gumineuses et les pommes de terre sont les ingr dients de remplacement qui peuvent interf rer avec l absorption de la taurine",
        "La plupart des chiens n ont pas d allergies aux c r ales - liminer les c r ales ne profite qu   1 % des chiens",
        "Co t de d taille plus v  sans avantages prouv s pour la plupart des chiens",
        "L AAFCO n a pas tabli de minimum pour les l gumineuses dans les r gimes canins"
      ],
      bestFor: "Chiens avec des allergies aux c r ales diagnostiqu es (rare - confirm  uniquement par un r gime d essai sous supervision v t rinaire)."
    },
    topicB: {
      pros: [
        { title: "Bien document e", body: "Les c r ales compl tes ont plus de 50 ans de donn es de s curit  en nutrition canine. Pas de risque de CMD." },
        { title: "Nutrition compl te", body: "Les c r ales compl tes fournissent des vitamines B, des fibres, du fer, du magnsium et des acides gras essentiels." },
        { title: "Co	t inf	rieur", topicA: "$1,00-2,00/lb vs $1,50-3,00/lb pour un aliment sans c r ales de qualit  comparable." },
        { title: "Conforme   l AAFCO", body: "Toutes les grandes marques avec c r ales r pondent aux profils nutritionnels de l AAFCO." },
        { title: "Fibres digestives", body: "Les fibres d avoine et d orge favorisent la diversit  du microbiome intestinal." }
      ],
      cons: [
        "Charge glyc mique l g rement plus ve (pas cliniquement significative pour les chiens en bonne sant)",
        "Pourcentage de prot ines inf rieur sur mati re sche"
      ],
      bestFor: "La grande majorit  des chiens - les r gimes aux c r ales compl tes sont la valeur par d faut command e par la WSAVA et la plupart des nutritionnistes v t rinaires."
    },
    rows: [
      { dimension: "Risque CMD (FDA)", topicA: "Examin  (corrélation l gumineuses)", topicB: "Aucune association" },
      { dimension: "Teneur en prot ines", topicA: "Souvent 26-34 %", topicB: "G n ralement 22-28 %" },
      { dimension: "Co	t par lb", topicA: "$1,50-3,00", topicB: "$1,00-2,00" },
      { dimension: "Charge glyc mique", topicA: "Inf rieure (l gumineuses/pommes de terre)", topicB: "Mod r e (glucides complexes)" },
      { dimension: "Historique de recherche", topicA: "Limit  (croissance post-2010)", topicB: "50+ ans" },
      { dimension: "Avantage allergie", topicA: "Rare (vraie allergie aux c r ales moins de 1 %)", topicB: "Standard (c r ales rares allerg niques)" },
      { dimension: "Consensus v t rinaire", topicA: "WSAVA conseille la prudence", topicB: "Command  par d faut" }
    ],
    verdict: "<strong>Pour la plupart des chiens, un r gime conforme   l AAFCO avec c r ales compl tes d un fabricant employant des nutritionnistes v t rinaires est le choix command.</strong> L enqu te CMD de la FDA a trouv  une association statistique entre les r gimes sans c r ales contenant des l gumineuses ou des pommes de terre et les cas diagnostiqu s de CMD.",
    faq: [
      { question: "Les aliments pour chiens sans c r ales sont-ils dangereux ?", answer: "La FDA a examin  une association statistique entre les r gimes sans c r ales contenant des l gumineuses ou des pommes de terre et la cardiomyopathie dilat e canine (CMD) associ e au r gime entre 2018-2023. La WSAVA conseille la prudence avec les r gimes sans c r ales non fabriqu s par des fabricants pleinement conformes aux crit res diamant." },
      { question: "Les chiens ont-ils besoin de c r ales dans leur nourriture ?", answer: "Non - les chiens n ont pas biologiquement besoin de c r ales. Cependant, les c r ales compl tes fournissent des avantages nutritionnels notamment des vitamines B, des fibres et des acides gras essentiels. Des r gimes sans c r ales bien formul s qui ne reposent pas sur des formules riches en l gumineuses existent mais sont plus co teux." },
      { question: "Que command ent les nutritionnistes v t rinaires ?", answer: "Les nutritionnistes v t rinaires certifi s et la WSAVA command ent: nourrir des r gimes conformes   l AAFCO de fabricants qui effectuent des essais d alimentation; les r gimes avec c r ales sont pr rables aux sans c r ales pour la population canine g n rale; utiliser des r gimes sans c r ales uniquement sous contr le v t rinaire pour les allergies aux c r ales diagnostiqu es." }
    ]
  },
  scratchingPostVsCatTree: {
    title: "Grattoir vs Arbre   Chat : De Quoi Votre Chat a-t-il Besoin ?",
    subtitle: "Comparaison d taill e des griffoirs et des arbres   chats couvrant les besoins d espace, le comportement de grattage, le territoire vertical et les oyaux multi-chats.",
    topicAName: "Grattoir (Autonome)",
    topicBName: "Arbre   Chat (Multi-niveaux)",
    topicA: {
      pros: [
        { title: "Abordable", body: "Les griffoirs en sisal de base co tent 15-40 $. Les options en carton 5-15 $. Beaucoup moins cher que les arbres   chat." },
        { title: " conome en espace", body: "Empreinte de 1-2 sq ft id al pour les appartements ou les petits espaces de vie." },
        { title: "Installation imm diate", body: "Pas d assemblage requis - utilisation imm dite." },
        { title: "Vari t  de textures", body: "Cordes en sisal, tissu sisal, moquette, carton et ciblent diff rentes pr f rences felinas." }
      ],
      cons: [
        "Pas de territoire vertical - les chats pr frent les points d observation v s pour la s curit",
        "Limit  au grattage seulement - pas d avantages d escalade, de perchoir ou de cachette",
        "Facile   renverser si non lest",
        "Ne rond pas aux besoins de hi rarchie verticale des bestiaux multiple"
      ],
      bestFor: "Foyaux mono-chat avec espace limit , propri taires soucieux du budget, ou compl ment d un arbre   chat existant."
    },
    topicB: {
      pros: [
        { title: "Territoire vertical", body: "Les plateformes v es fournissent s curit , chaleur et points d observation que les chats pr frent instinctivement." },
        { title: "Multi-fonction", body: "Grattoirs, perchoirs, cachettes et activit s tout en un." },
        { title: "Harmonie multi-chats", body: "Les multiples niveaux ruisent les conflits territoriaux dans les oyaux multi-chats." },
        { title: "Exercice et condition physique", body: "L escalade et le saut entre les niveaux fournissent de l exercice pour les chats d int rieur." },
        { title: "Enrichissement par la cachette", body: "Les cubicules ferm s offrent les cachettes s res et sombres que les chats recherchent en cas de stress." }
      ],
      cons: [
        "$50-300 $+ pour les unit s de qualit  - les arbres premium co tent 150 $ +",
        "Empreinte importante - les arbres   chat de qualit  n cessitent 2-4 sq ft et une hauteur de plafond de 5-7 sq pi",
        "Lourd et facile   d placer",
        "Les arbres de qualit  inf rieure oscillent (les chats refusent les plateformes instables)"
      ],
      bestFor: "Foyaux multi-chats, foyaux mono-chat avec espace suffisant, et chats montrant une pr f rence verticale."
    },
    rows: [
      { dimension: "Co	t", topicA: "$5-40", topicB: "$50-300 +" },
      { dimension: "Empreinte", topicA: "1-2 sq ft", topicB: "2-4 sq ft" },
      { dimension: "Utilit  de grattage", topicA: "Objectif principal", topicB: "Int  gr " },
      { dimension: "Territoire vertical", topicA: "Aucun", topicB: "Objectif principal" },
      { dimension: "Adapt  aux multi-chats", topicA: "Non", topicB: "Oui" },
      { dimension: "Valeur d exercice", topicA: "Minimal", topicB: " v  (escalade/sauts)" }
    ],
    verdict: "<strong>Commencez avec un griffoir robuste pour chaque chat, puis ajoutez un arbre   chat si vous avez l espace et le budget pour un enrichissement complet.</strong> Les directives AAFP et ISFM command ent le territoire vertical comme un besoin felin fondamental. Dans les oyaux mono-chat avec contraintes d espace, 2-3 griffoirs plus un rebord de fen tre peuvent suffire.",
    faq: [
      { question: "Ai-je besoin d un griffoir et d un arbre   chat ?", answer: "Cela du nombre de chats et de l espace disponible. Chat unique avec espace suffisant: un arbre   chat de qualit  plus un griffoir suppl mentaire pr s des zones de repos est suffisant. Chats multiples: un griffoir par chat plus au moins un arbre   chat par paire." },
      { question: "Quel est le meilleur mat riau pour un griffoir ?", answer: "Cordage en sisal ou tissu sisal: la plupart des chats le pr f rent, dure 2-5 ans. Grattoirs en carton: aim s par beaucoup de chats mais dur e de vie courte (1-3 mois). viter la moquette qui imite la moitation domestique pour viter la confusion." },
      { question: "Quelle hauteur doit avoir un arbre   chat ?", answer: "Pour la plupart des oyaux mono-chat, 4-6 pieds avec 3+ plateformes est le minimum. Pour les grimpeurs ambitieux ou les chats anxieux, 6+ pieds pr s du plafond est pr rable. Assurez-vous que l arbre est stable - les plateformes bancales sont r      j es par les chats." }
    ]
  }
};

// 德语翻译数据 (简化版)
const deData = {
  harnessVsCollar: {
    title: "Geschirr vs Halsband f|r Hunde: Welches ist Richtiges?",
    subtitle: "Wissenschaftlicher Vergleich von Geschirren und Flachhalsb|ndern zu Halssicherheit, Zugkontrolle, Fluchtgefahr und Rassempfehlungen.",
    topicAName: "R|ckseiten-Geschirr",
    topicBName: "Flachhalsband",
    topicA: {
      pros: [
        { title: "Halssicherheit", body: "Druckverteilung |ber Brust und Schultern, Verhinderung von Trachea- und Schilddr|senkompression bei Zug. Wichtig f|r brachycephale Rassen." },
        { title: "Zugkontrolle", body: "R|ckseiten-G entmutigen Zug. Front-Clips bieten mehr Kontrolle." },
        { title: "Fluchtsicher", body: "Passende Geschirre schwer auszuziehen." },
        { title: "F|r brachycephale Rassen", body: "Bulldoggen, M|pschen etc. haben schwierige Atemwege." }
      ],
      cons: ["Kann Zug ohne Training beg|nstigen","Komplexere Anpassung","Reibt bei schlechter Passung","Eingew|hnung erforderlich","Nicht f|r permanente ID-Markeignet"],
      bestFor: "Brachycephale Rassen, Welpen, Hunde mit Trachea-/Schilddr|senproblemen, starke Zieher, Genesende."
    },
    topicB: {
      pros: [
        { title: "Einfach+schnell", body: "Einfache Handhabung, keine Ingew|hnung. Ideal f|r Aborte." },
        { title: "ID-Markeignet", body: "Nat|rlicher Platz f|r Marken, Tollwut, Kontakt." },
        { title: "Geringere Kosten", body: "10-30 $ vs. 25-60 $." },
        { title: "Kein Reiben", body: "Gute H|lse ohne Reibung." }
      ],
      cons: ["Zugdruck auf Trachea","Brachyphale : Atemnot bei Zug","Hunde k|nnen ausweichen","Kein Vorteil f|r Zieher","W|rgen abgeraten durch AVSAB"],
      bestFor: "Ruhige Hunde, gut erzogene, permanente ID."
    },
    rows: [
      { dimension: "Hals-Sicherheit", topicA: "Exzellent", topicB: "Trachea-Risiko bei Zug" },
      { dimension: "Zugkontrolle", topicA: "Gut", topicB: "Keine" },
      { dimension: "Fluchtgefahr", topicA: "Niedrig", topicB: "M|sig" },
      { dimension: "Komfort", topicA: "Gut", topicB: "Gut" },
      { dimension: "Brachy-Sicherheit", topicA: "Empfohlen", topicB: "Mit Vorsicht" },
      { dimension: "Kosten", topicA: "$25-60", topicB: "$10-30" },
      { dimension: "ID-Markeignet", topicA: "Nicht ideal", topicB: "Ideal" },
      { dimension: "Tierarzt", topicA: "Bevorzugt", topicB: "Nur ID" }
    ],
    verdict: "<strong>F|r die meisten Hunde - besonders brachycephale Rassen, Welpen und Zieher - ist ein Y-front-Geschirr die Wahl f|r Spazierg|nge.</strong> Flachh|lse sind wichtig f|r ID-Marken, sollten aber nicht f|r Hunde verwendet werden, die reihen. AVSAB und AAHA abraten von abtr|glichen H|lschen. Die meisten Tier|rzte empfehlen beides.",
    faq: [
      { question: "Ist Geschirr besser als Halsband f|r Zieher?", answer: "Ja. Frontclip leitet seitlich um. Kombinieren mit lockerer Leinenf|hrung." },
      { question: "Welches Geschirr f|r Franz|sische Bulldoggen?", answer: "Y-front ohne Schultereinschr|nkung. Freie Schulterbewegung wichtig." },
      { question: "Hund beides tragen?", answer: "Ja - empfohlen. Flachhalsband dauerhaft, Geschirr f|r Spazierg|nge." }
    ]
  },
  petInsuranceVsEmergencyFund: {
    title: "Tierversicherung vs Notfallfonds: Was ist besser?",
    subtitle: "Finanzieller Vergleich von Tierversicherung und Selbstfinanzierung mit Kosten, L|cken und Rentabilit|t.",
    topicAName: "Tierversicherung",
    topicBName: "Selbstfinanzierter Notfallfonds",
    topicA: {
      pros: [
        { title: "Deckt Katastrophen", body: "Krebsdiagnose: 3.000-10.000 $+ . Verhindert Euthanasie." },
        { title: "Planbare Kosten", body: "Monatliche Pr|mie 30-150 $ vs. Risiko 5.000 $ +." },
        { title: "Mehrrabatt", body: "5-10 % f|r mehrere Tiere." },
        { title: "Zusatzoptionen", body: "Wellness f|r 10-30 $/Monat." }
      ],
      cons: ["Best. Zust|nde nicht abgedeckt","Erstattung: Tierarzt zuerst, dann Antrag (30-60 Tage)","Jahresgrenzen: 5.000-15.000 $","Rassenausschluss m|glich","Pr|mie steigt mit Alter: 8 J. = 2-4 teurer"],
      bestFor: "Junge gesunde Tiere, Kostenplanung, teure Rassen, Haushalte ohne Reserve."
    },
    topicB: {
      pros: [
        { title: "Keine Pr|mien", body: "Alles f|r Pflege da." },
        { title: "Volle Kontrolle", body: "Keine Beschr|nkungen, Wartezeiten, Ablehnungen." },
        { title: "Zinsen", body: "4-5 % APY-Zuwachs." },
        { title: "Keine Erstattung", topicA: "Direkt bezahlen." }
      ],
      cons: ["Muss vor Notfall parat sein","Disziplin 100-200 $/Monat f|r 5+ J.","Katastrophen Anfang nicht abdeckbar","Pro Tier eigener Fonds","Inflation mindert Wert"],
      bestFor: "Disziplinierte Besitzer, Tiere mit Vorerkrankung, Zusatz zur hohen Selbstbeteiligung."
    },
    rows: [
      { dimension: "Monatliche Kosten", topicA: "$30-150", topicB: "$0 (sparen 100-200 $)" },
      { dimension: "Best. Zust|nde", topicA: "Nicht abgedeckt", topicB: "Abgedeckt" },
      { dimension: "Notfall", topicA: "Nach Selbstbeteiligung", topicB: "Nur bei Finanzierung (5+ J.)" },
      { dimension: "Erstattung", topicA: "30-60 Tage", topicB: "Keine" },
      { dimension: "Krankheit", topicA: "Abgedeckt (maximal)", topicB: "Ansparen" },
      { dimension: "Start", topicA: "Welpe", topicB: "Sofort" }
    ],
    verdict: "<strong>Tierversicherung verhindert Euthanasie bei Katastrophen - Selbstfinanzierung kann 8.000 $ Krebsbehandlung im 1. Jahr nicht decken.</strong> Optimale Kombination: Junge Versicherung + separater Fonds.",
    faq: [
      { question: "Lohnt sich Versicherung?", answer: "Durchschnittlich nein, aber sch|tzt vor Katastrophen: 8.000-15.000 $ Krebs minus Selbstbeteiligung." },
      { question: "Wie viel f|r Notfallfonds?", answer: "3.000-5.000 $ pro Tier in separatem Konto." },
      { question: "Versoder sparen?", answer: "Beides: Junge Versicherung + separater Fonds." }
    ]
  },
  grainFreeVsWholeGrain: {
    title: "Getreidefrei vs. Vollkorn: Was ist ges|nder?",
    subtitle: "Vergleich von kostenfreien und Vollkornprodukten hinsichtlich DCM-Risiko, Qualit|t, Konsens.",
    topicAName: "Kostenfutter",
    topicBName: "Kosten mit Getreide",
    topicA: {
      pros: [
        { title: "Geringere glyk|mische Last", body: "H|lsenfr|chte statt Getreide - langsamere Glukose." },
        { title: "Hypoallergen", body: "F|r echte Getreideallergien (< 1 %)." },
        { title: "Mehr Protein", body: "2-5 % mehr Protein." }
      ],
      cons: ["FDA-Verbindung mit DCM","H|lsenfr|chte/Kartoffeln k|nnen Taurin st|ren","99 % haben keine Allergie","Teurer","Kein AAFCO-Minimum f|r H|lsenfr|chte"],
      bestFor: "Diagnostizierte Getreideallergien (selten)."
    },
    topicB: {
      pros: [
        { title: "Gut erforscht", body: "50+ J. Sicherheit, kein DCM-Risiko." },
        { title: "Vollst|ndig", body: "B-Vitamine, Ballaststoffe, Mineralien." },
        { title: "G|nstiger", topicA: "$1,00-2,00/lb vs. $1,50-3,00." },
        { title: "AAFCO-konform", body: "Alle Hersteller erf|llen Normen." },
        { title: "Ballaststoffe", body: "Hafer/Gerste f|rdern Mikrobiom." }
      ],
      cons: ["H|here glyk|mische Last","Weniger Protein"],
      bestFor: "Meisten Hunde - empfohlen von WSAVA."
    },
    rows: [
      { dimension: "DCM-Risiko", topicA: "Untersucht", topicB: "Kein" },
      { dimension: "Protein", topicA: "26-34 %", topicB: "22-28 %" },
      { dimension: "Kosten/lb", topicA: "$1,50-3,00", topicB: "$1,00-2,00" },
      { dimension: "Glyk|misch", topicA: "Geringer", topicB: "M|sig" },
      { dimension: "Forschung", topicA: "Begrenzt", topicB: "50+ J." },
      { dimension: "Allergie", topicA: "< 1 %", topicB: "Standard" },
      { dimension: "Konsens", topicA: "Vorsicht", topicB: "Empfohlen" }
    ],
    verdict: "<strong>AfFCO-konforme Vollkornfutter von Herstellern mit Tierern|hrungsgesundheitswissenschaftlern - WSAVA-Empfehlung.</strong> FDA-Verbindung gefunden.",
    faq: [
      { question: "Ist kostenes Futter gef|hrlich?", answer: "Statistische Verbindung FDA 2018-2023. WSAVA Vorsicht bei nicht konformen." },
      { question: "Braucht Hund Getreide?", answer: "Nein, aber Vollkorn bietet Vorteile. Gut formulierte kostenlose Futter sind teurer." },
      { title: "Empfehlung Ern|hrungsgesundheitswissenschaftlern?", answer: "AfFCO-konform mit F|tterungsversuchen. Vollkorn bevorzugt." }
    ]
  },
  scratchingPostVsCatTree: {
    title: "Kratzpfosten vs. Katzenbaum?",
    subtitle: "Detailvergleich zu Verhalten, Raum, Territorium und Mehr-Katzen-Haushalten.",
    topicAName: "Kratzpfosten",
    topicBName: "Katzenbaum",
    topicA: {
      pros: [
        { title: "G|nstig", body: "15-40 $ Sisaal, 5-15 $ Karton." },
        { title: "Platzsparend", body: "1-2 m|fcr Apartments." },
        { title: "Sofort einsatzbereit", body: "Keine Montage." },
        { title: "Textilvielfalt", body: "Sisal, Teppich, Karton, Rinde." }
      ],
      cons: ["Kein vertikales Territorium","Nur Kratzfunktion","Fallen m|glich","Nicht f|r Mehr-Katzen-Hierarchie"],
      bestFor: "Mehr Platz f|r Einzelkatzen oder Zusatz zu bestehendem Baum."
    },
    topicB: {
      pros: [
        { title: "Vertikales Territorium", body: "H|he = Sicherheit, W|rme, |berblick." },
        { title: "Mehrzweck", body: "Kratz, Sitz, Versteck in einem." },
        { title: "Mehr-Katzen-Harmonie", body: "Niveaus reduzieren Konflikte." },
        { title: "Bewegung", body: "Klettern + Springen f|r Wohnungskatze." },
        { title: "Verstecke", body: "Geschlossene Nischen." }
      ],
      cons: ["$50-300 + f|r Qualit|t","2-4 m|fch + H|he","Schwer zu verschieben","Wackelige Tische abzulehnen"],
      bestFor: "Mehr-Katzen, ausreichend Platz."
    },
    rows: [
      { dimension: "Kosten", topicA: "$5-40", topicB: "$50-300+" },
      { dimension: "Fu|drabdruck", topicA: "1-2 m|", topicB: "2-4 m|" },
      { dimension: "Kratzfunktion", topicA: "Prim|r", topicB: "Eingebaut" },
      { dimension: "Vertikal", topicA: "Keins", topicB: "Prim|r" },
      { dimension: "Mehr-Katze", topicA: "Nein", topicB: "Ja" },
      { dimension: "Bewegung", topicA: "Minimal", topicB: "Hoch" }
    ],
    verdict: "<strong>Stabiler Kratzpfosten pro Katze, dann Katzenbaum bei Platz/Budget.</strong> AAFP/ISFM: Vertikales Territorium wichtig.",
    faq: [
      { question: "Brauche ich beides?", answer: "Eine Katze: Baum + Pfosten. Pro Paar mind. ein Baum." },
      { title: "Bestes Material?", answer: "Sisal (2-5 J.), Karton (1-3 Monate). Teppich, das Heimteppich |hnelt, vermeiden." },
      { question: "Wie hoch?", answer: "4-6 Fu , 3 + Plattform. Stabil = wichtiger als H|he." }
    ]
  }
};

// 日语翻译数据
const jaData = {
  harnessVsCollar: {
    title: "|�ネス vs 首輪：どちらが正�?",
    subtitle:"|学的比較：気管の安全、引張り制御、逃走リスク、犬種別推奨。",
    topicAName: "バッククリップ|�ネス",
    topicBName: "フラットカラー",
    topicA: {
      pros: [
        { title: "首の安全", body: "胸・肩に圧を分散。気管・甲状腺の圧迫を除去。短頭種に必須。" },
        { title: "引張り制御", body: "犬を横方向に誘導。フロントクリップはより強い。" },
        { title: "逃走防止", body: "適切な|�ネスは拔け出しにくい。" },
        { title: "短頭種に最適", body: "ブル、パグなど気道が弱い犬種に。" }
      ],
      cons: ["トレなしで引張りを助長する可能性","サイズ調整が複雑","脇の下が擦れることがある","最初は嫌がることも","IDタグの常時取り付けに不適"],
      bestFor: "短頭種、子犬、気管の問題を持つ犬、強い引張り、首の回復期。"
    },
    topicB: {
      pros: [
        { title: "シンプル迅速", body: "着脱簡単。トイレ休憩に最適。" },
        { title: "IDタグ", body: "タグ、狂犬病、連絡先の標準的な場所。" },
        { title: "低コスト", body: "10-30＄ vs. |�ネス25-60＄。" },
        { title: "摩擦なし", body: "適切なカラーは摩擦・制限なし。" }
      ],
      cons: ["気管・甲状腺・頸椎に圧迫集中","短頭種は軽い引張でも呼吸困難に","拔け出せる犬種がある（グレイハウンドなど）","引張り制御なし","AVSABは絞首首輪を非推奨"],
      bestFor: "穏やかな散歩者、引かない犬、IDタグの着用。"
    },
    rows: [
      { dimension: "首の安全", topicA: "優秀", topicB: "リスク" },
      { dimension: "引張制御", topicA: "良い", topicB: "なし" },
      { dimension: "逃走", topicA: "低", topicB: "中" },
      { dimension: "快適性", topicA: "良い", topicB: "良い" },
      { dimension: "短頭種", topicA: "推奨", topicB: "注意" },
      { dimension: "コスト", topicA: "$25-60", topicB: "$10-30" },
      { dimension: "IDタグ", topicA: "非推奨", topicB: "理想的" },
      { dimension: "獣医師", topicA: "散歩に推奨", topicB: "識別のみ" }
    ],
    verdict: "<strong>ほとんどの犬（特に短頭種、子犬、引張り）には、Yフロント|�ネスがより安全です。</strong> フラットカラーはIDタグに不可欠ですが引っ張る犬の歩行ツールとしては使用すべきではありません。AVSAB・AAHAとも嫌悪的首輪を避けて、気道/首の問題には|�ネスを推奨。",
    faq: [
      { question: "引く犬に|�ネスの方が良い？", answer: "はい。フロントクリップは横に誘導。バッククリップでもトレーナーなしは効果的でない。" },
      { question: "フレンチブルに最適な|�ネスは？", answer: "肩を制限せず、脇を擦らないYフロント。短頭種は快適な呼吸のための肩の可動性が必要。" },
      { question: "両方着用できる？", answer: "はい。ID用カラーを常時着用し、散歩には|�ネスを。" }
    ]
  },
  petInsuranceVsEmergencyFund: {
    title: "|�ット保険 vs 緊急資金：どちらが良い？",
    subtitle: "包括的比較：月�額費用、補償限度、損益分岐点。",
    topicAName: "|�ット保険",
    topicBName: "自己資金による緊急準備金",
    topicA: {
      pros: [
        { title: "高額費用をカバー", body: "癌診断：3,000〜10,000＄＋。経済的安楽死を防ぐ。" },
        { title: "予測可能な出費", body: "月�30〜150＄で、突然の5,000＄＋請求を回避。" },
        { title: "多頭割引", body: "5〜10％割引。" },
        { title: "追加補償", body: "ウェルネス・ライダーで予防医療をカバー。" }
      ],
      cons: ["既往症は対象外","償還モデル：まず支払い、その後請求（30-60日）","年間上限5,000-15,000＄","品�種固有疾患は1年間の免責制","保険料は年齢とともに増加"],
      bestFor: "若く健康なペット、予測可能性が欲しい、高額な病気のリスク、5,000＄＋を抱えられない場合。"
    },
    topicB: {
      pros: [
        { title: "保険料なし", body: "すべてペットケアに。" },
        { title: "完全な管理", body: "制限・待機期間・拒否なし。" },
        { title: "利息", body: "4〜5％APYでの成長。" },
        { title: "即時払い", body: "待たずに直接支払い。" }
      ],
      cons: ["緊急時前に完全に用意が必要","毎月100-200＄を5年以上の規律が必要","初期段階で高額カバー不可","ペットごとに別勘定が必要","インフレによる価値低下"],
      bestFor: "規�ある飼い主、高�/既往症ペット、高免責保険の補完。"
    },
    rows: [
      { dimension: "月�", topicA: "$30-150", topicB: "$0（100-200$樄蓄）" },
      { dimension: "既往症", topicA: "対象外", topicB: "対象" },
      { dimension: "緊急", topicA: "免責後", topicB: "5年以上樄立後" },
      { dimension: "償還時間", topicA: "30-60日", topicB: "なし" },
      { dimension: "重症", topicA: "上限付き", topicB: "樄立必要" },
      { dimension: "開始", topicA: "幼少期", topicB: "即時" }
    ],
    verdict: "<strong>|�ット保険は経済的安楽死を防ぐ。自己資金で8,000＄の癌治療は初年度に無理。</strong> 最適：早めの加入と別資金の構築。",
    faq: [
      { question: "保険は経済的に価値ある？", answer: "平均的には保険料が多い。しかし癌8,000-15,000＄は補償でカバー。" },
      { question: "緊急資金はいくら？", answer: "1頭3,000-5,000＄。" },
      { question: "保険それとも樄金？", answer: "既往症を防ぐため早期保険加入と、3000＄＋の緊急準備金を同時に。" }
    ]
  },
  grainFreeVsWholeGrain: {
    title: "グレイン・フリー vs ホールグレイン",
    topicAName: "グレイン・フリー",
    topicBName: "ホールグレイン",
    topicA: {
      pros: [
        { title: "低GI", body: "メ科とジャガイモは遅い糖放出。" },
        { title: "低アレルギー", body: "本当のアレルギーのみ（<1%）。" },
        { title: "高タンパク", body: "2-5%増し。" }
      ],
      cons: ["FDAがDCMとの関連を調査","メ科/ジャガイモはタウリン吸収阻害","99%の犬には不要","AAFCO最少基準なし","高コスト・無実証の利点"],
      bestFor: "診断されたアレルギーのみ。"
    },
    topicB: {
      pros: [
        { title: "研究実績", body: "50年以上の安全実績、DCMリスクなし。" },
        { title: "完全な栄養", body: "B群、繊維、鉄、マグネシウム。" },
        { title: "低コスト", topicA: "$1.00-2.00 vs $1.50-3.00" },
        { title: "AAFCO準拠", body: "大手はすべて準拠。" },
        { title: "食物繊維", body: "オーツ・大�|は腸内細菌叢を改善。" }
      ],
      cons: ["GI値がやや高い","タンパク質がやや低い"],
      bestFor: "99%に推奨。"
    },
    rows: [
      { dimension: "DCMリスク", topicA: "調査済み", topicB: "無" },
      { dimension: "タンパク質", topicA: "26-34%", topicB: "22-28%" },
      { dimension: "コスト", topicA: "$1.50-3.00", topicB: "$1.00-2.00" },
      { dimension: "GI", topicA: "低", topicB: "中" },
      { dimension: "研究", topicA: "限定", topicB: "50+年" },
      { dimension: "アレルギー", topicA: "<1%", topicB: "標準" },
      { dimension: "合意", topicA: "注意", topicB: "既定" }
    ],
    verdict: "<strong>ほとんどの犬にAAFCO準拠ホールグレインが推奨。 FDAはグレイン・フリー＋メ科とDCMの関連を統計的に発見。",
    faq: [
      { question: "グレイン・フリーは危険？", answer: "2018-2023年 FDA調査。関連性が指摘。WSAVAは注意喚起。" },
      { question: "犬は穀物が必要？", answer: "生物学的に不要だが、栄養上の利点がある。高価なフリー食もあり。" },
      { question: "栄養士の推奨？", answer: "給餌試験実施メーカーのAAFCO準拠を優先。フリーはアレルギーのみ。" }
    ]
  },
  scratchingPostVsCatTree: {
    title: "爪立て柱 vs �|塔",
    topicAName: "爪立て柱（スタンドアロン）",
    topicBName: "|�|塔（マルチレベル）",
    topicA: {
      pros: [
        { title: "安価", body: "15-40＄から。" },
        { title: "省スペース", body: "1-2 m|に適切。" },
        { title: "即使用可能", body: "組立不要。" },
        { title: "テクスチャ", body: "Sisal、段ボール、コルク等。" }
      ],
      cons: ["�|の領域なし","爪とぎのみ","倒れやすい","多猫不可"],
      bestFor: "単一猫、予算重視、塔の補助。"
    },
    topicB: {
      pros: [
        { title: "|�|の領域", body: "高さは安全・暖かさ・眺望。" },
        { title: "多機能", body: "パ�ーキング、隠れ家、爪とぎすべて。" },
        { title: "多猫調和", body: "階層が軽減。" },
        { title: "運動", body: "上下運動に。" },
        { title: "隠れ家", body: "収納ボックス。" }
      ],
      cons: ["50-300＄以上","スペース大＆高さ必要","移動困難","低品質はぐらつく"],
      bestFor: "多猫、十分なスペース。"
    },
    rows: [
      { dimension: "コスト", topicA: "$5-40", topicB: "$50-300+" },
      { dimension: "足跡", topicA: "1-2 m|", topicB: "2-4 m|" },
      { dimension: "爪とぎ", topicA: "主目的", topicB: "内蔵" },
      { dimension: "�|�|", topicA: "無", topicB: "主目的" },
      { dimension: "多猫", topicA: "いいえ", topicB: "はい" },
      { dimension: "運動", topicA: "最小", topicB: "高い" }
    ],
    verdict: "<strong>各猫に頑丈な爪とぎ柱、それから予算/スペースがあれば�|�|塔。</strong> AAFP/ISFMは�|の領域を重要視。",
    faq: [
      { question: "両方必要？", answer: "一室+追加。多猫の場合は最低1本/2匹。" },
      { title: "最適素材？", answer: "Sisal 2-5年、段ボール1-3ヵ月。家庭用に類似することを避ける。" },
      { question: "高さの目安？", answer: "4-6ft 3+プラットフォーム。安定性重要。" }
    ]
  }
};

// 执行翻译
function process(locale, data) {
  const fp = path.join(MESSAGES_DIR, `${locale}.json`);
  const json = readFile(fp);
  if (!json.compare) json.compare = {};
  Object.keys(data).forEach(pageKey => {
    const enPage = en.compare[pageKey];
    const t = data[pageKey];
    if (enPage && t) {
      json.compare[pageKey] = translatePage(enPage, t);
    }
  });
  fs.writeFileSync(fp, JSON.stringify(json, null, 2) + '\n', 'utf-8');
  console.log(`✓ [${locale}] 完了`);
}

process('fr', frData);
process('de', deData);
process('ja', jaData);
console.log('バッチ1完了');
