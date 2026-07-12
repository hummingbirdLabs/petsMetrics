/**
 * Translate seasonal data from English to Dutch (Nederlands)
 */
import fs from 'fs';

// Read the English seasonal data as reference structure
const en = JSON.parse(fs.readFileSync('messages/en.json', 'utf8'));
const enSeasonal = en.seasonal;

// ============================================================
// DUTCH (nl) translations
// ============================================================
const nl = {
  'summer-heat': {
    title: 'Hoe u uw hond koel houdt in de zomer: veiligheidsgids tegen hitte',
    description: 'Volledige gids voor het voorkomen van hitteberoerte bij honden — vroege symptomen herkennen, koelingstechnieken, onveilige temperatuurgrenzen en noodstappen. Gebaseerd op ASPCA- en veterinaire spoedgegevens.',
    keywords: [
      'hoe hond koel houden in de zomer',
      'hitteberoerte hond voorkomen',
      'hitteberoerte hond symptomen',
      'warm weer hond veiligheid',
      'kan hond oververhit raken'
    ],
    severity: 'HOOG RISICO',
    season: 'Zomer (juni–augustus)',
    knowledgeCards: [
      {
        title: 'Hitteberoerte bij honden begrijpen',
        body: 'In tegenstelling tot mensen zweten honden alleen via hun voetzoolkussentjes en vertrouwen ze voornamelijk op hijgen om af te koelen. Wanneer de omgevingstemperatuur de lichaamstemperatuur (38,3–39,2 °C) overschrijdt, wordt hijgen ineffectief. Hitteberoerte treedt op wanneer de kerntemperatuur boven de 41,1 °C stijgt, wat binnen enkele minuten orgaanschade veroorzaakt. Volgens ASPCA-gegevens sterven jaarlijks honderden honden aan hitteberoerte, waarvan vele door vermijdbare oorzaken.'
      },
      {
        title: 'Onveilige temperatuurgrenzen',
        body: 'Bij 27–29 °C lopen grote rassen en brachycefale honden (Bulldogs, Mopshonden, Boxers) een verhoogd risico. Bij 32 °C moeten alle honden beperkte tijd buiten doorbrengen. Het interieur van een auto bereikt 39 °C in 10 minuten op een dag van 29 °C en 49 °C in 30 minuten — zelfs met de ramen op een kier. (Bron: AVMA-temperatuurstudie)'
      },
      {
        title: 'Rassen met het hoogste risico',
        body: 'Brachycefale rassen (Mopshond, Bulldog, Franse Bulldog, Boxer, Boston Terriër) hebben 2–3x hoger risico op hitteberoerte door vernauwde luchtwegen. Grote/reuzenrassen (Mastiff, Sint-Bernard, Newfoundland) houden meer warmte vast. Dikke dubbelharige rassen (Husky, Malamute, Chow Chow) hebben moeite met vochtigheid. Puppy\'s onder de 6 maanden en honden ouder dan 7 jaar lopen ook een verhoogd risico.'
      },
      {
        title: 'De bodemtemperatuurregel',
        body: 'Alleen naar de luchttemperatuur kijken is gevaarlijk misleidend. Asfalt bereikt bij 29 °C luchttemperatuur 60 °C — heet genoeg om voetzoolkussentjes in 60 seconden te laten verbranden. Test met de 7-secondenregel: plaats de rug van uw hand 7 seconden op het oppervlak. Als het oncomfortabel is voor u, verbrandt het de poten van uw hond. Laat honden vóór 10.00 uur en na 18.00 uur op gras lopen.'
      }
    ],
    prevention: [
      'Laat honden vóór 10.00 uur en na 18.00 uur uit, wanneer de bodemtemperatuur veilig is',
      'Zorg altijd voor schaduw en vers water wanneer de hond buiten is',
      'Laat een hond nooit achter in een geparkeerde auto — zelfs niet voor "maar een minuutje"',
      'Gebruik koelmatten, verhoogde ligbedden of vochtige handdoeken binnenshuis',
      'Neem water en een opvouwbare drinkbak mee tijdens wandelingen langer dan 15 minuten',
      'Beperk de intensiteit van beweging op vochtige dagen (luchtvochtigheid >60%)',
      'Overweeg langharige rassen te trimmen (maar scheer NOOIT een dubbele vacht)'
    ],
    symptoms: [
      'Overmatig hijgen of ademhalingsmoeilijkheden',
      'Felrood of bleek tandvlees en tong',
      'Dikke, draderige speekselvloed',
      'Braken of diarree (mogelijk bloederig)',
      'Struikelen, zwakte of desoriëntatie',
      'Verhoogde rectale temperatuur (normaal: 38,3–39,2 °C; hitteberoerte: >40 °C)',
      'Instorting, toevallen of bewustzijnsverlies'
    ],
    firstAid: [
      {
        title: 'Stap 1: Verplaats onmiddellijk naar een koele omgeving',
        content: 'Haal uw hond uit de hitte naar de schaduw of airconditioning. Verwijder elk harnas of beknellende kleding.'
      },
      {
        title: 'Stap 2: Koel met lauw water (NIET met ijs)',
        content: 'Giet koel (niet koud) water over de nek, oksels en liezen waar bloedvaten dicht bij het oppervlak liggen. IJskoud water veroorzaakt vasoconstrictie die warmte binnenhoudt. Forceer GEEN water als de hond niet kan slikken.'
      },
      {
        title: 'Stap 3: Bied kleine hoeveelheden water aan',
        content: 'Laat uw hond kleine hoeveelheden koel water drinken — gebruik geen spuit om water in de mond te forceren (aspiratierisico). Voeg ijsblokjes toe om het drinken aan te moedigen.'
      },
      {
        title: 'Stap 4: Breng onmiddellijk naar de dierenarts',
        content: 'Hitteberoerte kan inwendige orgaanschade veroorzaken die niet onmiddellijk zichtbaar is. Zelfs als uw hond lijkt te herstellen, breng hem naar een dierenarts voor evaluatie. Bel ASPCA Poison Control op (888) 426-4435 als u twijfelt over de ernst.'
      }
    ],
    faqs: [
      {
        question: 'Bij welke temperatuur kunnen honden een hitteberoerte krijgen?',
        answer: 'Honden kunnen een hitteberoerte ontwikkelen bij temperaturen boven 29 °C, vooral in direct zonlicht met een luchtvochtigheid boven 60%. Het risico neemt dramatisch toe boven 32 °C. Brachycefale rassen kunnen al een hitteberoerte krijgen bij temperaturen vanaf 24 °C vanwege hun gecompromitteerde luchtweganatomie. Kritieke gevarenzone: lichaamstemperatuur boven 40 °C begint orgaanschade te veroorzaken; boven 41,1 °C is levensbedreigend.'
      },
      {
        question: 'Kunnen honden een hitteberoerte in huis krijgen?',
        answer: 'Ja, hitteberoerte binnenshuis komt vaak voor wanneer huizen geen airconditioning of adequate ventilatie hebben. Honden kunnen zichzelf niet effectief afkoelen in kamers boven 29 °C, vooral bij hoge luchtvochtigheid. Risicofactoren: kamers op de bovenverdieping (warmte stijgt), gesloten benches zonder luchtstroom en kamers met directe blootstelling aan zonlicht door ramen. Zorg altijd voor een koele zone (tegelvloer, ventilator of koelmat) toegankelijk voor uw hond.'
      },
      {
        question: 'Hoe kan ik een hond snel en veilig afkoelen?',
        answer: 'Gebruik koel (niet ijskoud) water op de nek, oksels en liezen. Bied kleine hoeveelheden koel water aan om te drinken. Verplaats naar airconditioning of schaduw. Dompel NIET onder in ijswater — dit veroorzaakt een gevaarlijke shock. Gebruik GEEN alcohol (giftig bij likken). Breng naar de dierenarts, zelfs als de symptomen verbeteren, aangezien inwendige schade mogelijk niet onmiddellijk zichtbaar is.'
      },
      {
        question: 'Hoe lang duurt het voordat een hond een hitteberoerte in een auto krijgt?',
        answer: 'Het interieur van een auto warmt catastrofaal snel op: op een dag van 29 °C bereikt het interieur 39 °C in slechts 10 minuten en 49 °C in 30 minuten — zelfs met ramen op een kier van 5 cm. Bij deze temperaturen kan een hond al binnen 15–20 minuten een fatale hitteberoerte ontwikkelen. Er is geen veilige tijdsduur. Laat een hond nooit achter in een geparkeerde auto, ongeacht de buitentemperatuur of weersomstandigheden.'
      }
    ],
    relatedTools: [
      {
        name: 'Hond caloriecalculator',
        href: '/dog/calorie-calculator/',
        description: 'Pas de voeding aan voor verminderde zomeractiviteit.'
      },
      {
        name: 'Giftige voeding checker',
        href: '/shared/toxic-checker/',
        description: 'Controleer de veiligheid van zomervoeding (druiven bij BBQ\'s, maïskolven, enz.).'
      }
    ],
  },
  'winter-paw-care': {
    title: 'Bescherming van hondenpoten in de winter: veiligheid tegen kou, ijs en strooizout',
    description: 'Deskundige gids voor het beschermen van hondenpoten in de winter — voorkom bevriezing, ijsbrandwonden en irritatie door strooizout. Inclusief pootverzorgingsroutines, het passen van hondenschoentjes en noodbehandeling voor koudeweerletsel.',
    keywords: [
      'hondenpoot bescherming winter',
      'hondenpoot bevriezing behandeling',
      'strooizout hondenpoten',
      'winter pootverzorging honden',
      'hondenschoentjes winter'
    ],
    severity: 'MATIG RISICO',
    season: 'Winter (december–februari)',
    knowledgeCards: [
      {
        title: 'Anatomie van de voetzoolkussentjes van een hond',
        body: 'De voetzoolkussentjes van honden bevatten vetweefsel voor isolatie, maar dit vet kan bevriezen bij temperaturen onder -6 °C. De digitale kussens en het middenvoetskussen hebben een beperkte doorbloeding vergeleken met andere weefsels, waardoor ze bijzonder kwetsbaar zijn voor bevriezing. Herhaalde blootstelling aan koude oppervlakken zorgt ervoor dat de kussentjes barsten en bloeden, wat toegangspunten creëert voor infectie.'
      },
      {
        title: 'Strooizout en chemische dooimiddelen',
        body: 'Veelgebruikte dooimiddelen zijn natriumchloride, calciumchloride en magnesiumchloride. Deze chemicaliën verbranden het weefsel van de voetzoolkussentjes bij contact en veroorzaken maag-darmklachten als ze worden opgelikt. Calciumchloride is het gevaarlijkst — het genereert warmte bij contact met een natte huid en kan chemische brandwonden veroorzaken. "Huisdiervriendelijke" dooimiddelen gebruiken ureum- of glycolgebaseerde formules die minder irriterend zijn.'
      },
      {
        title: 'Het gevaar van ijsballen',
        body: 'Sneeuw en ijs hopen zich op tussen de tenen en vormen strakke ijsballen die in het vlies tussen de tenen snijden en de doorbloeding beperken. Dit is pijnlijk en kan weefselschade veroorzaken. Langharige rassen (vooral met haar tussen de tenen) zijn het meest vatbaar. IJsballen vormen zich binnen 10–15 minuten bij het lopen in natte sneeuw.'
      },
      {
        title: 'Stadia van bevriezing bij hondenpoten',
        body: 'Stadium 1: bleke, koude huid die pijnlijk is bij aanraking. Stadium 2: huid voelt hard en koud aan, kan verkleuring vertonen (blauwgrijs). Stadium 3: blaarvorming, zwartgekleurd weefsel dat necrose aangeeft. De marges tussen normaal en bevroren weefsel zijn niet altijd duidelijk — wat er mild beschadigd uitziet, kan in 24–48 uur verslechteren naarmate de doorbloeding wordt hersteld.'
      }
    ],
    prevention: [
      'Breng pootbalsem (Musher\'s Secret of vergelijkbaar) aan vóór wandelingen om een beschermende barrière te creëren',
      'Knip het haar tussen de tenen om ijsbalvorming te voorkomen',
      'Gebruik hondenschoentjes (nauwsluitend, ademend) voor wandelingen langer dan 10 minuten in sneeuw/ijs',
      'Veeg de poten na elke wandeling grondig af met warm (niet heet) water',
      'Vermijd lopen in de buurt van behandelde wegen en opritten',
      'Breng vaseline aan op de voetzoolkussentjes vóór wandelingen als er geen schoentjes worden gebruikt',
      'Controleer de voetzoolkussentjes na elke wandeling op scheuren, roodheid of bloedingen'
    ],
    symptoms: [
      'Mank lopen of onwil om te lopen (vooral op harde ondergrond)',
      'Overmatig likken of kauwen aan de poten',
      'Gebarsten, droge of bloedende voetzoolkussentjes',
      'Donkere of verkleurde huid op de kussentjes (blauwgrijs wijst op bevriezing)',
      'Gezwollen of pijnlijk vlies tussen de tenen',
      'Zichtbare ijsballen tussen de tenen',
      'Kleine snijwonden of schaafwonden op de voetzoolkussentjes'
    ],
    firstAid: [
      {
        title: 'Stap 1: Haal uit de kou en verwarm voorzichtig',
        content: 'Breng uw hond naar binnen. Verwarm de aangedane poten met lauw (lichaamstemperatuur) water of warme handdoeken gedurende 15–20 minuten. Gebruik GEEN heet water of warmtekussens — bevroren weefsel heeft een verminderd gevoel en kan gemakkelijk verbranden.'
      },
      {
        title: 'Stap 2: Verwijder ijsballen en vuil',
        content: 'Verwijder voorzichtig ijsballen tussen de tenen met warm water om ze te laten smelten. Trek het ijs er niet uit — dit scheurt de huid. Dep voorzichtig droog met een zachte handdoek.'
      },
      {
        title: 'Stap 3: Behandel chemische brandwonden',
        content: 'Als er blootstelling aan strooizout is geweest, spoel de poten dan voorzichtig met lauw water gedurende 5 minuten om resten te verwijderen. Breng een dun laagje pootveilige vochtinbrengende crème aan (geen menselijke lotion — op basis van lanoline en vitamine E).'
      },
      {
        title: 'Stap 4: Zoek veterinaire zorg bij bevriezing',
        content: 'Als de kussentjes zwart lijken, erg bleek zijn zonder bloedterugvloeiing bij indrukken, of als uw hond aanzienlijke pijn heeft, zoek dan onmiddellijk veterinaire zorg. Behandeling van bevriezing kan pijnbestrijding en antibiotica vereisen om secundaire infectie te voorkomen.'
      }
    ],
    faqs: [
      {
        question: 'Kunnen hondenpoten bevriezen?',
        answer: 'Ja, hondenpoten zijn een van de meest voorkomende plaatsen voor bevriezing bij honden. Voetzoolkussentjes hebben een beperkte vetisolatie en de bloedvaten dicht bij het koude oppervlak trekken snel samen, waardoor de weefseloxygenatie afneemt. Het risico op bevriezing begint bij temperaturen onder -6 °C en neemt toe bij natte omstandigheden en windkou. Honden met reeds bestaande aandoeningen (diabetes, hartziekte) hebben een verminderde doorbloeding die het ontstaan van bevriezing versnelt.'
      },
      {
        question: 'Is strooizout schadelijk voor honden?',
        answer: 'Ja — veelgebruikte strooizouten (natriumchloride en vooral calciumchloride) veroorzaken chemische brandwonden bij contact met het weefsel van de voetzoolkussentjes en maag-darmklachten bij inslikken tijdens het likken. Tekenen zijn onder meer rode, gebarsten kussentjes, onwil om te lopen en overmatig pootlikken. Gebruik huisdiervriendelijke dooimiddelen (op ureumbasis) rond uw huis en veeg de poten van uw hond onmiddellijk af na wandelingen in de buurt van behandelde oppervlakken.'
      },
      {
        question: 'Wat zijn hondenschoentjes en werken ze?',
        answer: 'Hondenschoentjes bieden isolatie tegen kou, bescherming tegen zout/chemicaliën en grip op ijs. Kies voor schoentjes met: nauwsluitende pasvorm (niet te strak), ademend materiaal, flexibele zool en verstelbare bandjes. Introduceer ze geleidelijk — veel honden weigeren schoentjes in het begin. Korte blootstelling van 5 minuten thuis helpt ze te wennen. Honden met dikharige poten (Husky\'s, Malamutes) kunnen oververhit raken in schoentjes tijdens intensieve activiteit.'
      },
      {
        question: 'Hoe kan ik de poten van mijn hond beschermen zonder schoentjes?',
        answer: 'Breng pootbalsem (Musher\'s Secret, Musher\'s Choice) aan vóór elke wandeling — het creëert een ademende wasbarrière tegen zout en ijs. Knip het haar tussen de tenen om ijsbalvorming te voorkomen. Beperk de wandelduur tot 15–20 minuten bij temperaturen onder -4 °C. Was na de wandeling de poten met warm water en dep ze grondig droog, vooral tussen de tenen.'
      }
    ],
    relatedTools: [
      {
        name: 'Hond caloriecalculator',
        href: '/dog/calorie-calculator/',
        description: 'Pas aan voor verhoogde energiebehoefte in de winter.'
      },
      {
        name: 'Giftige voeding checker',
        href: '/shared/toxic-checker/',
        description: 'Controleer de veiligheid van winterfeestvoeding.'
      }
    ],
  },
  'christmas-foods': {
    title: 'Kerstvoeding giftig voor honden: veiligheidsgids voor feestvoeding',
    description: 'Volledige gids over kerstvoeding die gevaarlijk is voor honden — chocolade, met xylitol gezoete lekkernijen, gekookte botten, druiven, uien en alcohol. Inclusief alarmsymptomen en wat te doen als uw hond giftig kerstvoedsel heeft gegeten.',
    keywords: [
      'kerstvoeding giftig voor honden',
      'hond at kerstchocolade',
      'hond at kerstham',
      'xylitol kerstkoekjes honden',
      'feestvoeding veiligheid honden'
    ],
    severity: 'HOOG RISICO',
    season: 'Kerstperiode (december)',
    knowledgeCards: [
      {
        title: 'Kerstvoeding: giftig versus veilig',
        body: 'De gevaarlijkste kerstvoedingsmiddelen voor honden zijn: chocolade (theobromine in alle vormen — bakchocolade is het giftigst), xylitol in suikervrije snoepjes en gebak (veroorzaakt hypoglykemie bij 0,1 g/kg en leverfalen), druiven en rozijnen in kerstpudding en vruchtencake (veroorzaken nierfalen bij 8,5–17 g/kg), uien en knoflook in vulling en jus (veroorzaken hemolytische anemie), gekookte botten (versplinteren en perforeren), macadamianoten in koekjes en alcohol in advocaat of rumcake.'
      },
      {
        title: 'Waarom Kerstmis het hoogseizoen voor spoedgevallen is',
        body: 'ASPCA Poison Control meldt een toename van 200–400% in feestgerelateerde huisdiervergiftigingen van 20–26 december vergeleken met normale weken. Belangrijkste oorzaken: onbeheerde borden op salontafels, toegankelijke cadeaumanden met chocolade, suikervrije snoepjes en kauwgom binnen handbereik, goedbedoelende gasten die "lekkernijen" voeren, en kerstsokken met giftige items op hondenniveau achtergelaten.'
      },
      {
        title: 'De chocolade-gevarenschaal',
        body: 'Bakchocolade (ongezoet): 28 g veroorzaakt ernstige vergiftiging bij een hond van 9 kg. Pure chocolade (70%+): 57 g voor een hond van 9 kg. Melkchocolade: 227 g voor een hond van 9 kg. Witte chocolade: minimaal theobrominerisico, maar het vetgehalte veroorzaakt alvleesklierontsteking. Kerstchocolade-assortimentsdozen zijn bijzonder gevaarlijk omdat ze gemengde soorten bevatten — inname van zelfs één stuk bakchocolade kan levensbedreigend zijn.'
      },
      {
        title: 'Xylitol in kerstgebak',
        body: 'Suikervrije kerstkoekjes, gebak en snoepjes bevatten vaak xylitol (berkensuiker), nu populair in keto- en diabetische recepten. Een enkel suikervrij koekje kan 5–10 g xylitol bevatten — giftig voor een hond van 14 kg bij slechts 3 g. Xylitol veroorzaakt een snelle insulinepiek die binnen 15–30 minuten tot hypoglykemie leidt, en bij hogere doses acuut leverfalen binnen 12–24 uur.'
      }
    ],
    prevention: [
      'Bewaar alle chocolade in gesloten kasten of op hoge planken, ontoegankelijk voor honden',
      'Plaats suikervrije snoepjes/koekjes in afgesloten containers (niet in decoratieve schalen)',
      'Informeer alle gasten dat het voeren van de hond NIET is toegestaan',
      'Sluit vuilniszakken met etensresten onmiddellijk af',
      'Houd een pot met hondveilige snacks bij de keuken voor gasten die iets willen geven',
      'Ruim borden onmiddellijk na de maaltijd van salontafels',
      'Controleer kerstsokken op chocolademunten, zuurstokken (xylitolrisico) en rozijnen'
    ],
    symptoms: [
      'Braken en diarree (binnen 2–12 uur voor de meeste gifstoffen)',
      'Hyperactiviteit, rusteloosheid, snelle hartslag (chocolade, cafeïne)',
      'Zwakte, instorting, toevallen (xylitol-hypoglykemie)',
      'Overmatige dorst, verminderd plassen (druif-/rozijnvergiftiging)',
      'Bleek tandvlees, zwakte (ui-/knoflookanemie — kan 2–5 dagen duren)',
      'Buikpijn, bloederige ontlasting (botobstructie of alvleesklierontsteking)',
      'Trillingen, onvastheid (alcohol- of macadamianootvergiftiging)'
    ],
    firstAid: [
      {
        title: 'Stap 1: Identificeer wat er is gegeten',
        content: 'Controleer de ingrediëntenlijst onmiddellijk. Chocoladesoort, aanwezigheid van xylitol, hoeveelheid druiven/rozijnen en of botten zijn geconsumeerd, bepalen allemaal de ernst van het spoedgeval. Maak indien mogelijk een foto van de ingrediëntenlijst.'
      },
      {
        title: 'Stap 2: Schat de hoeveelheid en het tijdstip',
        content: 'Noteer de geschatte geconsumeerde hoeveelheid en het tijdstip sinds inname. Deze informatie is cruciaal voor ASPCA Poison Control en uw dierenarts om te bepalen of de dosis giftig is en of interventie nodig is.'
      },
      {
        title: 'Stap 3: Neem onmiddellijk contact op met de antigifcentrale',
        content: 'Bel ASPCA Animal Poison Control op (888) 426-4435 of Pet Poison Helpline op (855) 764-7661. Wacht NIET op symptomen — de behandelbaarheid daalt aanzienlijk na het absorptievenster. Wek GEEN braken op tenzij geïnstrueerd.'
      },
      {
        title: 'Stap 4: Bereid u voor op het dierenartsbezoek',
        content: 'Als u naar de dierenarts wordt verwezen, neem dan verpakkingen/labels en indien beschikbaar een monster braaksel mee. Houd uw hond kalm en opgesloten tijdens het transport. Bereid u voor op mogelijke IV-vloeistoffen, actieve kool en bloedonderzoek.'
      }
    ],
    faqs: [
      {
        question: 'Mijn hond heeft kerstchocolade gegeten. Wat moet ik doen?',
        answer: 'Bel onmiddellijk ASPCA Poison Control op (888) 426-4435 met: het gewicht van uw hond, het type en de hoeveelheid gegeten chocolade en het tijdstip sinds inname. Wacht NIET op symptomen. Als de hoeveelheid de giftige drempel voor de grootte van uw hond overschrijdt (gebruik onze gifchecker of vraag de hotline), ga dan naar een spoeddierenarts voor opgewekt braken en actieve kool. Theobromine uit chocolade blijft tot 72 uur in het systeem van een hond.'
      },
      {
        question: 'Zijn gekookte kersthambotten veilig voor honden?',
        answer: 'Nee. Gekookte botten van welke soort dan ook — inclusief ham-, kalkoen- en rundbotten — worden broos en versplinteren, wat mogelijk fatale perforatie van de keel, maag of darmen veroorzaakt. Zelfs grote gekookte botten kunnen tanden breken. Gooi botresten weg in een afgesloten buitencontainer en gooi een gekookt bot nooit naar uw hond.'
      },
      {
        question: 'Is kerstpudding gevaarlijk voor honden?',
        answer: 'Extreem gevaarlijk. Kerstpudding bevat doorgaans druiven, rozijnen en krenten (veroorzaken allemaal nierfalen bij honden), alcohol (giftig voor het zenuwstelsel), niervet (hoog vetgehalte veroorzaakt alvleesklierontsteking) en soms brandyboter (alcohol en vet). Zelfs een klein hapje kan giftig zijn. Houd pudding ver buiten het bereik van honden en zorg ervoor dat er geen gevallen stukjes toegankelijk zijn.'
      },
      {
        question: 'Mogen honden kalkoen eten met Kerstmis?',
        answer: 'Naturel, ongekruid kalkoenvlees in kleine hoeveelheden (1–2 eetlepels voor een middelgrote hond) is over het algemeen veilig en niet giftig. Echter: verwijder al het vel (hoog vetgehalte veroorzaakt alvleesklierontsteking), zorg ervoor dat er geen botten in zitten en bevestig dat er geen ui of knoflook is gebruikt bij de bereiding (gebruikelijk in vulling en jus, beide giftig). Geef geen kalkoen die is bereid met kruiden, boter, uien of knoflook.'
      }
    ],
    relatedTools: [
      {
        name: 'Giftige voeding checker',
        href: '/shared/toxic-checker/',
        description: 'Controleer elk feestvoedingsingrediënt direct.'
      },
      {
        name: 'Hond caloriecalculator',
        href: '/dog/calorie-calculator/',
        description: 'Houd extra feestelijke calorieën bij.'
      },
      {
        name: 'Spoedgeval: Chocolade gegeten',
        href: '/dog/emergency/ate-chocolate/',
        description: 'Volledige noodgids voor chocoladevergiftiging.'
      }
    ],
  },
  'halloween-candy': {
    title: 'Mijn hond heeft Halloweensnoep gegeten: noodactieplan',
    description: 'Noodgids voor honden die Halloweensnoep hebben gegeten — herken tekenen van vergiftiging, wanneer naar de spoeddierenarts te rennen, welke snoepsoorten het gevaarlijkst zijn en hoe u Halloweennoodgevallen bij huisdieren kunt voorkomen.',
    keywords: [
      'hond at halloweensnoep',
      'halloweensnoep giftig voor honden',
      'hond at chocolade halloween',
      'xylitol halloweensnoep hond',
      'halloween huisdier noodgeval'
    ],
    severity: 'KRITIEK RISICO',
    season: 'Halloween (oktober)',
    knowledgeCards: [
      {
        title: 'De vier grote giftige snoepsoorten',
        body: '1) Chocolade (alle vormen — theobrominevergiftiging). 2) Xylitol (suikervrije kauwgom, snoep — hypoglykemie en leverfalen). 3) Rozijnen (sommige snackdoosjes — nierfalen). 4) Snoepwikkels (folie/plastic veroorzaakt darmobstructie). Een enkel stukje xylitolkauwgom kan fataal zijn voor een hond van 7 kg volgens ASPCA-gegevens.'
      },
      {
        title: 'Halloweenspecifieke risicofactoren',
        body: 'Snoepzakken van trick-or-treat die op de vloer of lage tafels worden geplaatst, onbeheerde snoepschalen bij de deur, kinderen die stukjes op de vloer laten vallen en "deel je snoep"-momenten met honden creëren een piek in Halloweensnoepvergiftigingen. ASPCA meldt dat Halloween een van de top 3 dagen voor huisdiervergiftigingen per jaar is. De combinatie van een hoog snoepvolume en verstoord toezicht verhoogt de blootstelling dramatisch.'
      },
      {
        title: 'Gevaren van snoepwikkels',
        body: 'Folie- en plastic snoepwikkels worden vaak samen met snoep ingeslikt. Bij kleine honden kunnen enkele wikkels een darmobstructie veroorzaken die chirurgische verwijdering vereist. Folie kan ook restchocolade bevatten die wordt geabsorbeerd. Symptomen van obstructie: braken (vooral herhaaldelijk), geen stoelgang, lethargie en buikpijn binnen 12–48 uur.'
      },
      {
        title: 'Gecombineerd risico van chocolade + xylitol',
        body: 'Veel Halloweensnoepassortimenten bevatten zowel met chocolade omhulde items als suikervrije kauwgom/snoep. Als uw hond uit een gemengde zak eet, kan hij worden blootgesteld aan zowel theobromine (uit chocolade) ALS xylitol (uit suikervrije items). Deze combinatie is bijzonder gevaarlijk omdat de symptomen overlappen (braken, zwakte) maar de behandelingen aanzienlijk verschillen.'
      }
    ],
    prevention: [
      'Bewaar al het trick-or-treat-snoep in gesloten containers boven aanrechthoogte',
      'Gebruik een gesloten snoepschaal met een stevig deksel voor trick-or-treaters (geen open schalen)',
      'Houd honden in een aparte kamer tijdens trick-or-treat-uren',
      'Inspecteer de buit van uw kind onmiddellijk na thuiskomst op gevallen stukjes',
      'Geef uw hond nooit snoep uit uw hand of van uw bord',
      'Overweeg kalmerende snacks of feromoonverspreiders voor honden die gestrest zijn door deurbelgeluid',
      'Ken het noodnummer van uw dierenarts en ASPCA Poison Control ((888) 426-4435) van tevoren'
    ],
    symptoms: [
      'Braken of diarree binnen 2–12 uur',
      'Snelle ademhaling, verhoogde hartslag, rusteloosheid (chocolade/theobromine)',
      'Lethargie, zwakte, instorting binnen 15–30 minuten (xylitol-hypoglykemie)',
      'Overmatige dorst en plassen gevolgd door verminderd plassen (rozijnvergiftiging)',
      'Herhaaldelijk braken zonder stoelgang (mogelijke obstructie)',
      'Trillingen, toevallen (ernstige chocolade- of xylitolvergiftiging)',
      'Opgeblazen of pijnlijke buik'
    ],
    firstAid: [
      {
        title: 'Stap 1: Beoordeel wat er is gegeten',
        content: 'Identificeer onmiddellijk het snoeptype: chocolade (melk/puur/bak), kauwgom (controleer op xylitol in de eerste 3 ingrediënten), rozijnen of wikkels. Bewaar alle verpakkingen — ingrediëntenlijsten en gewichtsinformatie zijn cruciaal.'
      },
      {
        title: 'Stap 2: Bel de antigifcentrale voordat u actie onderneemt',
        content: 'Bel ASPCA Poison Control op (888) 426-4435. Wek GEEN braken thuis op — dit kan bepaalde blootstellingen aan gifstoffen verergeren. Wek alleen braken op als dit wordt geïnstrueerd door een professional, en nooit als uw hond al braakt, toevallen heeft of bewusteloos is.'
      },
      {
        title: 'Stap 3: Noteer het tijdstip en de hoeveelheid',
        content: 'Schat hoeveel stukjes er zijn geconsumeerd, welk type (op gewicht) en wanneer. Maak foto\'s van de verpakking om mee naar de dierenarts te nemen. Deze informatie bepaalt de ernst van de vergiftiging en het behandelprotocol.'
      },
      {
        title: 'Stap 4: Breng naar de spoeddierenarts indien geïnstrueerd',
        content: 'Als de antigifcentrale u doorverwijst naar een dierenarts, ga dan onmiddellijk — wacht niet op symptomen. Chocolade- en xylitolvergiftiging zijn tijdgevoelig. Opgewekt braken is het meest effectief binnen 1–2 uur na inname.'
      }
    ],
    faqs: [
      {
        question: 'Hoeveel Halloweensnoep is giftig voor een hond?',
        answer: 'Het hangt af van het type, niet alleen de hoeveelheid. Giftige drempels: Xylitol: 0,1 g/kg lichaamsgewicht (één stukje kauwgom voor een hond van 7 kg). Pure chocolade: 14 g per 4,5 kg lichaamsgewicht. Bakchocolade: 3 g per 4,5 kg lichaamsgewicht. Melkchocolade: 28 g per 4,5 kg lichaamsgewicht. Rozijnen: 3 g per 4,5 kg lichaamsgewicht. Snoepwikkels: elke hoeveelheid kan obstructie veroorzaken bij kleine honden.'
      },
      {
        question: 'Mijn hond heeft chocoladesnoepwikkels gegeten. Wat moet ik doen?',
        answer: 'Bel de antigifcentrale op (888) 426-4435 met het chocoladetype en de geschatte geconsumeerde hoeveelheid. Wikkels voegen twee zorgen toe: (1) folie/plastic kan darmobstructie veroorzaken, vooral bij honden onder 7 kg; (2) restchocolade geabsorbeerd uit wikkels verhoogt de theobrominebelasting. Houd 48 uur lang toezicht op braken, afwezigheid van stoelgang en buikpijn.'
      },
      {
        question: 'Kan ik mijn hond thuis laten braken na het eten van snoep?',
        answer: 'Wek GEEN braken thuis op met waterstofperoxide of zout, tenzij specifiek geïnstrueerd door een dierenarts of antigifcentrale. Het opwekken van braken is gecontra-indiceerd bij: bijtende stoffen, als uw hond al braakt, als uw hond lethargisch is of toevallen heeft, of als er meer dan 2 uur zijn verstreken. Onjuiste techniek kan aspiratiepneumonie veroorzaken of het letsel verergeren.'
      },
      {
        question: 'Hoe snel heeft snoepvergiftiging effect op honden?',
        answer: 'Xylitol: 15–30 minuten (hypoglykemie) of 8–12 uur (leverfalen). Chocolade: 2–4 uur (symptomen verschijnen), piek op 12–24 uur. Rozijnen: 6–24 uur (braken), nierschade op 24–72 uur. Wikkels: 12–48 uur (obstructiesymptomen). Behandel snoepinname altijd als een noodgeval en neem onmiddellijk contact op met de antigifcentrale.'
      }
    ],
    relatedTools: [
      {
        name: 'Giftige voeding checker',
        href: '/shared/toxic-checker/',
        description: 'Controleer elk snoepingrediënt direct op giftigheid.'
      },
      {
        name: 'Spoedgeval: Xylitol gegeten',
        href: '/dog/emergency/ate-xylitol/',
        description: 'Noodprotocol voor xylitolvergiftiging.'
      },
      {
        name: 'Spoedgeval: Chocolade gegeten',
        href: '/dog/emergency/ate-chocolate/',
        description: 'Noodgids voor chocoladevergiftiging.'
      }
    ],
  },
  'fireworks-anxiety': {
    title: 'Hoe u een hond kalmeert tijdens vuurwerk: gids voor angstbeheersing',
    description: 'Volledige gids voor het omgaan met vuurwerkangst bij honden — van preventiestrategieën en omgevingsbeheer tot medicatie, gedragstechnieken en wat te doen als uw hond in paniek raakt.',
    keywords: [
      'hoe hond kalmeren tijdens vuurwerk',
      'hond vuurwerkangst behandeling',
      'vuurwerk bange hond',
      'hond onweer vuurwerk fobie',
      'vuurwerkavond hond veiligheid'
    ],
    severity: 'MATIG-HOOG RISICO',
    season: 'Nieuwjaar & Feestdagen (dec/jan, 4 juli)',
    knowledgeCards: [
      {
        title: 'Angst voor lawaai bij honden begrijpen',
        body: 'Volgens gedragsstudies vertoont 40–60% van de honden angstreacties op vuurwerk of onweer. Hiervan ontwikkelt ongeveer 20% een klinische lawaaifobie die interventie vereist. Vuurwerk is bijzonder verontrustend omdat: (1) plotselinge onvoorspelbare harde knallen de schrikreflex activeren, (2) laagfrequente trillingen door het lichaam worden gevoeld, (3) knipperende lichten een stroboscoopeffect creëren dat honden als bedreigend ervaren en (4) statische elektriciteitsopbouw bij sommige honden bijdraagt aan ongemak.'
      },
      {
        title: 'Fysieke gevaren van vuurwerkpaniek',
        body: 'Honden met vuurwerkangst lopen risico op: weglopen (50% van de vermiste honden op 4 juli is vuurwerkgerelateerd volgens AKC), het verkeer in rennen, over hekken springen (zelfs honden die normaal niet ontsnappen), zichzelf verwonden aan ramen of deuren bij vluchtpogingen en in extreme gevallen cardiale gebeurtenissen door de stressreactie. Sommige honden breken tanden of nagels bij het proberen door te kauwen op deuren of benches.'
      },
      {
        title: 'Wanneer angst een fobie wordt',
        body: 'Tekenen dat uw hond is overgegaan van angstig naar fobisch: anticiperende angst begint uren voor zonsondergang, weigert \'s avonds naar buiten te gaan, verstopt zich op ontoegankelijke plaatsen, vertoont stresstekenen zelfs bij afspelen van geluid op zeer laag volume en gegeneraliseerde angst breidt zich uit voorbij vuurwerkavonden naar algemene hyperwaakzaamheid. Fobische honden hebben vaak medicatie nodig (voorgeschreven door uw dierenarts) in combinatie met gedragsmodificatie.'
      },
      {
        title: 'Medicatie versus natuurlijke opties',
        body: 'Voor matige tot ernstige angst: situationele medicatie voorgeschreven door dierenartsen (trazodon, gabapentine, Sileo) is effectief en veilig. Voor milde angst: feromoonverspreiders (Adaptil), compressiewikkels (ThunderShirt), L-theaninesupplementen en kalmerende snacks kunnen helpen. Voor fobische honden: een multimodale aanpak is vereist die medicatie + omgevingsbeheer + desensitisatietraining gedurende weken/maanden combineert.'
      }
    ],
    prevention: [
      'Laat uw hond goed uit vóór het vuurwerk begint (uitputting vermindert de angstreactie)',
      'Creëer een "veilige kamer" — binnenkamer zonder ramen, witte ruis, vertrouwd bed',
      'Begin 4–6 weken vóór bekende vuurwerkdata met desensitisatietraining (niet tijdens)',
      'Gebruik een Adaptil-feromoonverspreider 2 weken vóór verwachte evenementen',
      'Zorg dat de chipinformatie is bijgewerkt en de halsband-ID actueel is',
      'Sluit gordijnen/jaloezieën en zet tv of muziek aan om geluid te maskeren',
      'Verwijder toegang tot ramen en glazen deuren'
    ],
    symptoms: [
      'Hijgen, ijsberen, trillen',
      'Janken, blaffen naar geluiden',
      'Proberen te verstoppen of te ontsnappen',
      'Weigeren van voedsel of snacks',
      'Overmatig kwijlen, verwijde pupillen',
      'Aanhankelijk aan de eigenaar of op schoot proberen te klimmen',
      'Incontinentie (verlies van blaascontrole bij ernstige angst)',
      'Destructief gedrag (kauwen op deuren, krabben aan muren)'
    ],
    firstAid: [
      {
        title: 'Stap 1: Blijf kalm en zelfverzekerd',
        content: 'Uw hond neemt emotionele signalen van u over. Spreek op een opgewekte, ontspannen toon in plaats van een sussende toon (een sussende toon bevestigt angst). Straf angstgedrag niet — uw hond ervaart echte doodsangst, geen wangedrag.'
      },
      {
        title: 'Stap 2: Bied een veilige schuilplaats',
        content: 'Leid uw hond naar een rustige binnenkamer met de deur gesloten. Zet een tv of witte-ruismachine aan op gemiddeld volume. Bied zijn favoriete bed of bench aan met de deur open (forceer een hond nooit in een bench — dit verhoogt de paniek als hij de bench associeert met opsluiting tijdens angst).'
      },
      {
        title: 'Stap 3: Gebruik afleidingstechnieken',
        content: 'Bied hoogwaardige snacks aan (pindakaas Kong, bevroren snacks) om de focus te verleggen. Oefen basiscommando\'s die uw hond goed kent — "zit," "touch" of "zoek" leiden de hersenen af van angst naar werk. Forceer geen interactie als uw hond zich liever verstopt.'
      },
      {
        title: 'Stap 4: Voorkom ontsnapping',
        content: 'Als uw hond naar een deur rent, gebruik dan een riem of lichaamsblokkade — achtervolg nooit, want dit escaleert de paniek. Controleer nadat het vuurwerk is afgelopen of uw hond kalm is voordat u buitendeuren opent. Houd 20–30 minuten na het laatste geluid toezicht voordat u toegang tot buiten toestaat.'
      }
    ],
    faqs: [
      {
        question: 'Wat kan ik mijn hond geven tegen vuurwerkangst?',
        answer: 'Opties variëren naar ernst: Mild: L-theaninesupplementen (Anxitane, Solliquin), feromonen (Adaptil-verspreider/halsband), compressiewikkels (ThunderShirt). Matig: trazodon of gabapentine voorgeschreven door uw dierenarts (werkt binnen 1–2 uur). Ernstig: Sileo (dexmedetomidinegel op het tandvlees, FDA-goedgekeurd voor lawaaiaversie bij honden) of sedatie. Geef nooit menselijke angstmedicatie zonder veterinair advies.'
      },
      {
        question: 'Hoe lang vóór vuurwerk moet ik mijn hond angstmedicatie geven?',
        answer: 'Plan vooruit: trazodon/gabapentine hebben 1–2 uur nodig om effectief te worden. Geef VOORDAT het vuurwerk begint — zodra uw hond in volledige paniekmodus is, zijn orale medicijnen moeilijk toe te dienen en duurt het te lang om te werken. Voor bekende vuurwerkdata (Nieuwjaar, 4 juli) begint u 2–3 uur vóór zonsondergang met medicatie.'
      },
      {
        question: 'Hoe kan ik mijn hond desensibiliseren voor vuurwerk?',
        answer: 'Desensibilisatie vereist dat u 8–12 weken vóór het vuurwerkseizoen begint: (1) Speel vuurwerkgeluiden af op zeer laag volume (nauwelijks hoorbaar) tijdens positieve activiteiten (voeren, spelen). (2) Verhoog het volume geleidelijk over weken. (3) Als uw hond angst vertoont op enig niveau, verlaag dan het volume — dit betekent dat u te snel bent gegaan. (4) Koppel geluiden aan hoogwaardige snacks om een positieve associatie te creëren. Overweeg een gecertificeerde gedragstherapeut in te schakelen voor ernstige fobieën.'
      },
      {
        question: 'Beschadigt vuurwerk het gehoor van mijn hond?',
        answer: 'Vuurwerk bereikt 150–175 dB — luid genoeg om permanente gehoorschade te veroorzaken (pijndrempel voor honden is ongeveer 130 dB, lager dan bij mensen). Honden hebben een gevoeliger gehoor en meer gehoorgangversterking. Dit is een andere reden waarom honden in paniek raken — het doet fysiek pijn. Laat uw hond nooit naar vuurwerk kijken, zelfs niet buiten op afstand.'
      }
    ],
    relatedTools: [
      {
        name: 'Hond leeftijdscalculator',
        href: '/dog/age-calculator/',
        description: 'Senior honden hebben mogelijk een aangepaste dosering angstmedicatie nodig.'
      }
    ],
  },
  'spring-allergies': {
    title: 'Lenteallergieën bij honden: symptomen, behandeling en preventie',
    description: 'Volledige gids voor lenteallergieën bij honden — pollen, gras, schimmel. Leer allergiesymptomen herkennen, onderscheid ze van infecties en implementeer effectieve behandelplannen op basis van veterinaire dermatologierichtlijnen.',
    keywords: [
      'hond lenteallergieën symptomen',
      'hond pollenallergie behandeling',
      'hond seizoensallergieën lente',
      'caniene atopische dermatitis',
      'hond huidallergieën'
    ],
    severity: 'CHRONISCH RISICO',
    season: 'Lente (maart–mei)',
    knowledgeCards: [
      {
        title: 'Soorten lenteallergieën bij honden',
        body: 'Lenteallergieën bij honden vallen in drie categorieën: (1) Atopische dermatitis — inhalatieallergische reactie op pollen (bomen, gras, onkruid), die de huid en oren aantast. (2) Contactallergieën — directe huidreactie op gras, mulch of pesticiden. (3) Vlooienallergiedermatitis — de voorjaarsexplosie van de vlooienpopulatie veroorzaakt ernstige reacties, zelfs van enkele vlooienbeten. Minstens 10–15% van de honden lijdt aan seizoensallergieën volgens AAHA-gegevens.'
      },
      {
        title: 'Tijdlijn van veelvoorkomende lentallergenen',
        body: 'Boompollen pieken maart–april (eik, berk, ceder, esdoorn). Graspollen pieken mei–juni (Bermuda, Timothee, Kentucky bluegrass). Onkruidpollen beginnen eind juni. Schimmelsporen nemen toe met lenteregen. Het kennen van uw lokale pollenkalender (controleer pollen.com) helpt voorspellen wanneer de symptomen van uw hond zullen opvlammen en maakt preventieve behandeling mogelijk.'
      },
      {
        title: 'Secundaire infecties: het verborgen gevaar',
        body: 'Allergische huid creëert warme, vochtige, ontstoken omgevingen die ideaal zijn voor bacteriële (Staphylococcus) en gistovergroei (Malassezia). Studies tonen aan dat 60–80% van de honden met atopische dermatitis secundaire infecties ontwikkelt die de jeukcyclus in stand houden, zelfs nadat de blootstelling aan allergenen is afgenomen. Tekenen van secundaire infectie: vette huid, zoete/gistachtige geur, donkere/verkleurde huid en aanhoudende jeuk, zelfs tijdens dagen met lage pollenconcentraties.'
      },
      {
        title: 'Het poot-lik-oor-krab-patroon',
        body: 'De klassieke presentatie van lenteallergieën bij honden: overmatig pootlikken (vooral tussen de tenen), oorinfecties (hoofdschudden, oren wrijven tegen meubels) en krabben aan flanken/oksels. Dit specifieke patroon onderscheidt allergieën van andere huidaandoeningen. Als u alle drie gelijktijdig ziet optreden in de lente, zijn seizoensallergieën de waarschijnlijke oorzaak.'
      }
    ],
    prevention: [
      'Veeg de poten na elke buitenwandeling af met een vochtige doek om pollen te verwijderen',
      'Was de hond wekelijks met hypoallergene shampoo tijdens weken met hoge pollenconcentraties',
      'Houd ramen gesloten op dagen met hoge pollenconcentraties; gebruik HEPA-filtratie binnenshuis',
      'Vermijd lopen door vers gemaaid gras of hoog onkruid',
      'Was het hondenbeddengoed wekelijks in heet water tijdens het allergieseizoen',
      'Vraag uw dierenarts naar het starten met antihistaminica VOORDAT het pollenseizoen piekt',
      'Beheer vlooienpreventie agressief in de lente (een enkele vlooienbeet verergert allergieontsteking)'
    ],
    symptoms: [
      'Overmatig likken en kauwen aan de poten',
      'Terugkerende oorinfecties (hoofdschudden, oorgeur)',
      'Rode, geïrriteerde huid in oksels, liezen en buik',
      'Jeuk en krabben aan de flanken (zijkanten)',
      'Tranende ogen of neusuitvloeiing',
      'Gezicht wrijven tegen meubels of tapijt',
      'Haaruitval door krabben of likken',
      'Vette huid met ongewone geur (teken van secundaire infectie)'
    ],
    firstAid: [
      {
        title: 'Stap 1: Beoordeel de ernst',
        content: 'Mild: Af en toe krabben maar normaal eten en spelen. Matig: Aanhoudende jeuk, verstoorde slaap, milde huidroodheid. Ernstig: Open wonden, bloedende huid, weigering om te eten, constant ongemak. Ernstige allergieën vereisen een door de dierenarts voorgeschreven behandeling — niet alleen thuiszorg.'
      },
      {
        title: 'Stap 2: Onmiddellijke verlichtingsmaatregelen',
        content: 'Geef een koel (niet koud) bad met colloïdale havermoutshampoo om pollen te verwijderen en de huid te kalmeren. Veeg de poten na wandelingen af met een vochtige doek. Breng een koel kompres aan op hotspots. Gebruik een Elizabethaanse kraag (kap) als uw hond niet stopt met het likken van een hotspot.'
      },
      {
        title: 'Stap 3: Controleer op infectie',
        content: 'Controleer geïrriteerde gebieden dagelijks op: vette of korstige afscheiding, zoete/gistachtige geur en donkerder wordende huidkleur. Deze wijzen op een secundaire bacteriële of gistinfectie die door de dierenarts voorgeschreven antibiotica of antimycotica vereist — niet alleen allergiebeheer.'
      },
      {
        title: 'Stap 4: Plan een veterinaire afspraak',
        content: 'Als de symptomen langer dan 1 week aanhouden ondanks basismanagement, of als secundaire tekenen verschijnen, plan dan een dierenartsbezoek. Uw dierenarts kan Apoquel (oclacitinib), Cytopoint-injecties (anti-IL-31) of allergie-immunotherapie (allergie-injecties) voorschrijven voor langdurige controle.'
      }
    ],
    faqs: [
      {
        question: 'Hoe weet ik of mijn hond lenteallergieën heeft versus een infectie?',
        answer: 'Seizoensallergieën volgen een patroon: symptomen keren elk voorjaar/zomer terug, pootlikken en oorbetrokkenheid zijn prominent aanwezig en de respons op antihistaminica is snel. Infecties hebben doorgaans een gelokaliseerde geur, afscheiding en vette huid. Het patroondoorbrekende teken is dat symptomen aanhouden buiten het allergieseizoen — dit suggereert atopische dermatitis (jaarrondallergieën) of niet-allergische huidziekte die veterinaire diagnose vereist.'
      },
      {
        question: 'Kan ik mijn hond Benadryl (difenhydramine) geven voor allergieën?',
        answer: 'Ja, difenhydramine (Benadryl) wordt vaak gebruikt bij honden in een dosering van 1 mg per pond lichaamsgewicht elke 8–12 uur. Gebruik alleen pure difenhydramine — vermijd formules met decongestiva (pseudo-efedrine) of alcohol, die giftig zijn. Benadryl helpt bij 30% van de allergische honden. Betere opties voorgeschreven door dierenartsen zijn Apoquel (oclacitinib) en Cytopoint-injecties die gerichter op jeuk werken. Bevestig de dosering altijd eerst met uw dierenarts.'
      },
      {
        question: 'Wanneer is het lenteallergieseizoen het ergst voor honden?',
        answer: 'Het piekseizoen voor lenteallergieën bij honden in Noord-Amerika is april–juni, wanneer boompollen en vroege graspollen het hoogst zijn. In warmere klimaten beginnen allergieseizoenen eerder (februari) en duren ze langer. Zomer en herfst brengen hun eigen allergenenpieken. Houd de symptomen van uw hond het hele jaar bij — als ze langer dan 3 maanden aanhouden, kunnen ze zijn overgegaan in jaarrondallergieën in plaats van echt seizoensgebonden.'
      },
      {
        question: 'Hebben bepaalde rassen ergere lenteallergieën?',
        answer: 'Ja — rassen die gepredisponeerd zijn voor atopische dermatitis zijn onder meer: West Highland White Terriër, Franse Bulldog, Bulldog, Golden Retriever, Labrador Retriever, Duitse Herder, Cocker Spaniël, Boxer en Boston Terriër. Brachycefale rassen (bulldogs, mopshonden) hebben vaak gelijktijdige huidplooidermatitis die verergert met allergieontsteking. Vroegtijdige interventie bij deze rassen is bijzonder belangrijk.'
      }
    ],
    relatedTools: [
      {
        name: 'Hond caloriecalculator',
        href: '/dog/calorie-calculator/',
        description: 'Pas de voeding aan als allergieën gewichtsverlies door stress veroorzaken.'
      }
    ],
  },
  'thanksgiving': {
    title: 'Thanksgivingvoeding die honden mogen eten: veilig versus gevaarlijk gids',
    description: 'Volledige Thanksgivingvoedingsveiligheidsgids voor honden — welke voedingsmiddelen veilig zijn (naturel kalkoen, pompoen, sperziebonen), welke giftig zijn (druiven, uien, boter, alcohol) en tips voor portiecontrole. Inclusief noodstappen bij inname van giftige stoffen.',
    keywords: [
      'thanksgivingvoeding honden mogen eten',
      'hond at thanksgivingkalkoen',
      'thanksgiving veilige voeding voor honden',
      'hond at thanksgivingvulling',
      'is thanksgivingkalkoen veilig voor honden'
    ],
    severity: 'HOOG RISICO',
    season: 'Thanksgiving (november)',
    knowledgeCards: [
      {
        title: 'Thanksgivingvoeding: veilige voeding voor honden',
        body: 'Veilig voor honden (in kleine porties): Naturel ongekruid kalkoenvlees (wit of donker), naturelle sperziebonen (gekookt, zonder boter/knoflook), naturelle zoete aardappel (gekookt, zonder marshmallows), naturelle pompoen (pure pompoenpuree, niet de gezoete variant), gekookte wortels (ongeboterd) en naturelle witte rijst. Alles moet ongekruid, ongezouten en in kleine hoeveelheden worden geserveerd — ongeveer 1–2 eetlepels per 9 kg lichaamsgewicht.'
      },
      {
        title: 'Thanksgivingvoeding: gevaarlijke of giftige voeding voor honden',
        body: 'Gevaarlijk/giftig: vulling (ui, knoflook, salie), jus (knoflook, ui, vet), aardappelpuree (boter, knoflook, bieslook), gekonfijte yams/zoete aardappelen met marshmallows (suiker, xylitol in sommige), broodjes (deeg zet uit en gist fermenteert), cranberrysaus (hoge suiker, soms met druif/xylitol), pompoentaart (nootmuskaat is giftig, plus suiker/vet), chocoladedesserts, macadamianotentaarten en elk voedsel met ui of knoflook.'
      },
      {
        title: 'Het deeggevaar: uitzetting van rauw gist',
        body: 'Ongebakken broodjesdeeg is extreem gevaarlijk voor honden. De warme, vochtige omgeving van de maag van een hond zorgt ervoor dat gist fermenteert, waarbij alcohol ontstaat (ethanoltoxicose) EN het deeg uitzet, wat de maag kan blokkeren. Symptomen: opgezwollen buik, braken, desoriëntatie en wankelen. Een enkel stukje deeg ter grootte van een broodje kan alcoholvergiftiging veroorzaken bij een hond van 9 kg.'
      },
      {
        title: 'Vetvergiftiging en alvleesklierontsteking',
        body: 'Thanksgivingvoeding is doorgaans zeer vetrijk (boter, olie, jus, kalkoenvel). Hoge vetinname is de #1 voedingstrigger voor alvleesklierontsteking bij honden, een levensbedreigende ontsteking van de alvleesklier. Alvleesklierontsteking presenteert zich doorgaans 12–72 uur na de vette maaltijd met: ernstig braken, buikpijn (bidhouding), lethargie en koorts. Vereist onmiddellijke veterinaire zorg met IV-vloeistoffen en pijnbestrijding.'
      }
    ],
    prevention: [
      'Bereid een klein bordje met veilige voeding vóór de maaltijd begint (naturel kalkoen, sperziebonen, naturelle zoete aardappel)',
      'Plaats het van tevoren op een locatie uit de buurt van de tafel om bedelen aan tafel te voorkomen',
      'Instrueer gasten dat er een "geen tafelrestjes"-beleid geldt om gezondheidsredenen',
      'Gooi alle kalkoenbotten en etensresten onmiddellijk weg in een buitencontainer',
      'Ruim borden direct van tafel — honden zijn opportunistisch',
      'Laat honden niet in de keuken of eetkamer tijdens het koken en de maaltijd',
      'Controleer afvalverwerkingssystemen — honden kunnen bij voedselafval in open vuilnisbakken'
    ],
    symptoms: [
      'Braken (vooral herhaaldelijk) of diarree binnen 2–24 uur',
      'Buikpijn getoond door "bidhouding" (voorpoten omlaag, achterhand omhoog)',
      'Ernstige lethargie, zwakte of onwil om te bewegen',
      'Opgezwollen of opgeblazen buik (mogelijk maagtorsie of deeguitzetting)',
      'Trillingen, desoriëntatie (alcohol uit gefermenteerd deeg)',
      'Overmatige dorst of plassen, gevolgd door geen urineproductie (druifvergiftiging — 24–48 uur)',
      'Bleek tandvlees, zwakte, snelle ademhaling (ui-/knoflookanemie — 2–5 dagen)'
    ],
    firstAid: [
      {
        title: 'Stap 1: Identificeer wat uw hond heeft gegeten',
        content: 'Controleer snel wat er onbeheerd is achtergelaten. Jus, vulling en met boter bedekte groenten wijzen op blootstelling aan hoog vetgehalte (risico op alvleesklierontsteking). Als er deeg is gegeten, is alcoholvergiftiging een zorg. Als er druiven/rozijnen zijn geconsumeerd, is er risico op nierfalen. Prioriteer op basis van het geïdentificeerde specifieke gif.'
      },
      {
        title: 'Stap 2: Bel de antigifcentrale',
        content: 'ASPCA Animal Poison Control: (888) 426-4435. Geef door: gewicht van de hond, wat er is gegeten, geschatte hoeveelheid en tijdstip sinds inname. Vetrijke maaltijden vereisen 72 uur monitoring op alvleesklierontsteking, zelfs als er geen onmiddellijke symptomen verschijnen.'
      },
      {
        title: 'Stap 3: Wacht niet op symptomen',
        content: 'Als uw hond deeg (alcoholrisico), druiven (nierfalenrisico) of grote hoeveelheden ui/knoflook (anemierisico) heeft gegeten, zoek dan veterinaire zorg voordat de symptomen beginnen. De vertraging tussen inname en symptomen kan 12–72 uur zijn, waarin onomkeerbare schade kan optreden.'
      },
      {
        title: 'Stap 4: Houd toezicht na elke overdaad',
        content: 'Zelfs als er geen specifiek gif is geïdentificeerd, vereist hoge vetinname 12–72 uur monitoring op tekenen van alvleesklierontsteking. Beperk voedsel gedurende 12 uur na vette inname (laat water toe) en bied daarna een kleine neutrale maaltijd aan. Als braken optreedt of aanhoudt, zoek dan onmiddellijk veterinaire zorg.'
      }
    ],
    faqs: [
      {
        question: 'Mogen honden Thanksgivingkalkoen eten?',
        answer: 'Ja, naturelle ongekruide kalkoen (zonder vel, zonder botten) is veilig voor honden in kleine porties — ongeveer 1–2 eetlepels per 9 kg lichaamsgewicht. Verwijder alle botten (versplinteringsrisico), vel (hoog vetgehalte) en zorg ervoor dat er geen kruiden (knoflook, ui, kruiden) zijn gebruikt. Wit vlees is lager in vet dan donker vlees en veiliger voor honden die gevoelig zijn voor alvleesklierontsteking.'
      },
      {
        question: 'Is pompoentaart veilig voor honden?',
        answer: 'Nee. Pompoentaart bevat nootmuskaat (giftig voor honden, veroorzaakt hallucinaties en tachycardie), hoge suiker (maag-darmklachten, gevolgen op lange termijn voor gebit/diabetes), zuivel (veel honden zijn lactose-intolerant) en kruiden. Naturelle pompoen uit blik (pure pompoen, geen taartvulling) is veilig en zelfs gunstig voor de spijsvertering — tot 1 eetlepel per 4,5 kg hond.'
      },
      {
        question: 'Mijn hond heeft Thanksgivingvulling gegeten. Wat moet ik doen?',
        answer: 'Bel de antigifcentrale op (888) 426-4435. Vulling bevat doorgaans meerdere gifstoffen: ui en knoflook (veroorzaken hemolytische anemie bij 0,5% van het lichaamsgewicht), hoog boter-/vetgehalte (risico op alvleesklierontsteking) en soms kruiden (salie kan maag-darmklachten veroorzaken). Symptomen verschijnen mogelijk pas na 2–5 dagen bij ui-/knoflookvergiftiging, waardoor vroege veterinaire monitoring belangrijk is.'
      },
      {
        question: 'Mogen honden Thanksgiving-aardappelpuree eten?',
        answer: 'Traditionele aardappelpuree is NIET veilig voor honden vanwege toegevoegde boter (hoog vetgehalte), melk (risico op lactose-intolerantie), knoflook (giftig) en bieslook (giftig). Naturelle gekookte aardappel zonder toevoegingen is veilig in kleine hoeveelheden. De veiligste Thanksgivinggroente voor honden is naturelle gekookte sperziebonen of wortels zonder toevoegingen.'
      }
    ],
    relatedTools: [
      {
        name: 'Giftige voeding checker',
        href: '/shared/toxic-checker/',
        description: 'Controleer de veiligheid van elk Thanksgiving-ingrediënt.'
      },
      {
        name: 'Hond caloriecalculator',
        href: '/dog/calorie-calculator/',
        description: 'Verwerk extra calorie-inname tijdens de feestdagen.'
      },
      {
        name: 'Spoedgeval: Druiven gegeten',
        href: '/dog/emergency/ate-grapes/',
        description: 'Noodgids voor druiven-/rozijnvergiftiging.'
      }
    ],
  },
  'easter-chocolate': {
    title: 'Paaaschocolade en honden: veiligheid bij het zoeken naar paaseieren',
    description: 'Gids voor paaschocoladevergiftiging voor hondeneigenaren — theobrominevergiftigingsdrempels, paasspecifieke gevaren (eieren, gras, lelies), symptomentijdlijn en noodbehandeling voor chocolade-inname.',
    keywords: [
      'paaschocolade hond',
      'hond at paaschocolade',
      'paaseieren zoeken hond veiligheid',
      'paaslelie hond giftigheid',
      'chocoladevergiftiging honden pasen'
    ],
    severity: 'KRITIEK RISICO',
    season: 'Pasen (maart/april)',
    knowledgeCards: [
      {
        title: 'Paasspecifieke chocoladegevaren',
        body: 'Pasen concentreert meerdere chocoladerisico\'s: (1) Chocolade-eieren en -konijntjes zijn vaak puur of halfzoet (hoger theobrominegehalte dan melkchocolade). (2) In folie verpakte eieren vormen een dubbel risico — chocoladevergiftiging plus folie-geïnduceerde darmobstructie. (3) Paasmanden worden vaak op salontafels op hond-bereikbare hoogte geplaatst. (4) Paasgras (plastic of papier) veroorzaakt darmobstructie bij inslikken. (5) Grote hoeveelheden chocolade zijn vaak gelijktijdig in gebruik voor zoektochten.'
      },
      {
        title: 'De chocoladevergiftigingsberekening',
        body: 'Theobrominegehalte per chocoladesoort (per 28 g): Wit: 0,25 mg. Melk: 44–60 mg. Halfzoet: 150 mg. Bakchocolade (ongezoet): 390–450 mg. Giftige drempel voor honden: milde symptomen bij 20 mg/kg, ernstig bij 40 mg/kg, toevallen bij 60 mg/kg. Een chocoladekonijntje van 85 g (melkchocolade = ~150 mg theobromine) voor een hond van 9 kg bereikt de matige vergiftigingsdrempel. Slechts 28 g bakchocolade is ernstig giftig voor dezelfde hond.'
      },
      {
        title: 'Paasgras: het verborgen gevaar',
        body: 'Plastic paasgras is een lineair vreemdlichaamgevaar — het kan in de maag verankeren en door de darmwand zagen. Papiergras is gedeeltelijk verteerbaar maar kan samenklonteren en obstructie veroorzaken. Beide soorten zijn aantrekkelijk voor honden omdat ze bedekt zijn met chocoladeresten uit paasmanden. Symptomen van obstructie: herhaaldelijk braken, geen stoelgang, buikpijn en lethargie binnen 12–72 uur.'
      },
      {
        title: 'De symptomentijdlijn',
        body: '0–2 uur: rusteloosheid, hijgen, verhoogde dorst, braken. 2–12 uur: verhoogde hartslag (>100 spm), spiertrillingen, toegenomen plassen. 12–48 uur: toevallen (ergste gevallen), hartritmestoornissen, hyperthermie (>40 °C). 48–72 uur: symptomen nemen geleidelijk af met ondersteunende zorg, maar hartschade kan aanhouden. Kritiek behandelvenster: braken opwekken binnen 1 uur verwijdert 30–50% van de maaginhoud; effectiviteit daalt sterk na 2 uur.'
      }
    ],
    prevention: [
      'Houd paasmanden boven hond-hoogte of achter gesloten deuren',
      'Tel chocolade-items vóór en na het zoeken naar paaseieren — weet onmiddellijk of er iets ontbreekt',
      'Laat honden NIET samen met kinderen paaseieren zoeken — chocolade-eieren moeten gescheiden worden gehouden van huisdierensnacks',
      'Vul sommige verstopte eieren met hondveilige snacks (wortels, appelschijfjes, hondensnacks) als lokmiddel',
      'Gebruik papiergras in plaats van plastic gras (lager obstructierisico)',
      'Gooi alle chocoladeverpakkingen en foliewikkels weg in afgesloten buitencontainers',
      'Houd honden binnen tijdens het paaseieren zoeken als ze niet onder directe lijncontrole staan'
    ],
    symptoms: [
      'Braken of diarree (kan chocoladestukjes of folie bevatten)',
      'Rusteloosheid, hyperactiviteit of agitatie',
      'Overmatig hijgen en verhoogde hartslag',
      'Verhoogde dorst en plassen',
      'Spiertrillingen of spiertrekkingen',
      'Toevallen (wijst op ernstige vergiftiging)',
      'Stijfheid of abnormale gang'
    ],
    firstAid: [
      {
        title: 'Stap 1: Bereken de giftige dosis',
        content: 'Bepaal: (1) Soort gegeten chocolade (melk, puur, bakchocolade), (2) Geschat gewicht in grammen geconsumeerd, (3) Het lichaamsgewicht van uw hond. Gebruik de giftige drempelcalculator: melkchocolade giftig bij 28 g per 4,5 kg lichaamsgewicht; pure chocolade bij 14 g per 4,5 kg; bakchocolade bij 3 g per 4,5 kg.'
      },
      {
        title: 'Stap 2: Bel onmiddellijk de antigifcentrale',
        content: 'ASPCA Animal Poison Control: (888) 426-4435. Meld de berekende dosis. Als de drempel wordt overschreden, ga dan naar de spoeddierenarts. Wacht NIET op symptomen — de absorptie van theobromine gaat 12+ uur door en symptomen verschijnen mogelijk pas als er al ernstige schade is opgetreden.'
      },
      {
        title: 'Stap 3: Wek GEEN braken thuis op',
        content: 'Probeer NIET thuis braken op te wekken met waterstofperoxide. Dit is gevaarlijk als uw hond al toevallen heeft, een verminderd bewustzijn heeft of als de chocolade meer dan 1–2 uur geleden is geconsumeerd (opnieuw braken verwijdert geen significante hoeveelheid gif). Wek alleen braken op onder veterinaire begeleiding.'
      },
      {
        title: 'Stap 4: Veterinaire behandeling',
        content: 'Behandeling voor chocoladevergiftiging: (1) Opgewekt braken binnen 1–2 uur, (2) Actieve kool om resterende theobromine te binden, (3) IV-vloeistoffen om de renale excretie te versnellen, (4) Hartslagmonitoring gedurende 12–24 uur, (5) Anti-epileptica indien nodig. Ziekenhuisopname duurt doorgaans 12–36 uur voor matige vergiftiging.'
      }
    ],
    faqs: [
      {
        question: 'Mijn hond heeft een chocolade paasei gegeten. Hoeveel is giftig?',
        answer: 'Het hangt af van het chocoladetype, het gewicht van het ei en de grootte van uw hond. Een typisch in folie verpakt melkchocolade paasei weegt 28–57 g — voor een hond van 9 kg bereikt één ei de matige vergiftigingsdrempel (20 mg/kg theobromine). Pure chocolade-eieren zijn 3–4x giftiger bij hetzelfde gewicht. Bakchocolade-eieren kunnen dodelijk zijn voor kleine honden. Bel ASPCA Poison Control (888) 426-4435 met het chocoladetype en het gewicht van uw hond voor een onmiddellijke risicobeoordeling.'
      },
      {
        question: 'Zijn paaslelies gevaarlijk voor honden?',
        answer: 'Paaslelies (Lilium longiflorum) zijn NIET giftig voor honden (in tegenstelling tot katten, waar ze fataal nierfalen veroorzaken). Honden die aan leliestengels/-bladeren kauwen, kunnen echter milde maag-darmklachten ervaren (braken, diarree). Gevaarlijkere paasgevaren zijn chocolade-eieren (theobromine), plastic paasgras (darmobstructie) en xylitol in suikervrije snoepjes. Houd lelies uit de buurt van huishoudens met meerdere huisdieren met katten.'
      },
      {
        question: 'Hoe lang nadat mijn hond chocolade heeft gegeten, moet ik me zorgen maken?',
        answer: 'Theobromine uit chocolade wordt gedurende 6–12 uur geabsorbeerd; symptomen kunnen tot 72 uur na inname verschijnen. Xylitol werkt sneller: hypoglykemie binnen 15–30 minuten, leverfalen binnen 8–12 uur. Bel onmiddellijk de antigifcentrale als u weet dat uw hond chocolade of xylitol heeft gegeten. Honden die binnen 2 uur worden behandeld, hebben betere resultaten. Houd 72 uur toezicht, zelfs na behandeling.'
      }
    ],
    relatedTools: [
      {
        name: 'Giftige voeding checker',
        href: '/shared/toxic-checker/',
        description: 'Controleer chocolade-/snoepvergiftiging direct.'
      },
      {
        name: 'Spoedgeval: Chocolade gegeten',
        href: '/dog/emergency/ate-chocolate/',
        description: 'Volledig noodprotocol voor chocoladevergiftiging.'
      }
    ],
  },
};

// Write Dutch translations
const nlData = JSON.parse(fs.readFileSync('messages/nl.json', 'utf8'));
nlData.seasonal = { ...nlData.seasonal, ...nl };
fs.writeFileSync('messages/nl.json', JSON.stringify(nlData, null, 2));
console.log('nl.json updated with Dutch seasonal translations');