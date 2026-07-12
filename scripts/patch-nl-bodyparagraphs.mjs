/**
 * Patch: Add missing bodyParagraphs to Dutch (nl) seasonal data
 */
import fs from 'fs';

const data = JSON.parse(fs.readFileSync('messages/nl.json', 'utf8'));
const seasonal = data.seasonal;

const bodyParagraphs = {
  'summer-heat': [
    'Zomerhitte is een van de meest onderschatte gevaren voor honden. In tegenstelling tot mensen, die over het hele lichaam zweetklieren hebben, koelen honden voornamelijk af door te hijgen en in mindere mate door zweet via hun voetzoolkussentjes. Deze biologische beperking maakt hen bijzonder kwetsbaar in warm weer, vooral wanneer hoge luchtvochtigheid de verdampingscapaciteit van het hijgen vermindert.',
    'De grootste misvatting is dat hitteberoerte alleen optreedt bij extreme temperaturen. In werkelijkheid vinden de meeste ASPCA hitteberoerte-gevallen plaats op "matig warme" dagen — 27-29°C — vooral wanneer honden actief zijn of in slecht geventileerde ruimtes verblijven. Brachycefale rassen (Bulldogs, Mopshonden) lopen een bijzonder hoog risico: hun vernauwde luchtwegen beperken de luchtstroom, waardoor de verhoogde ademhalingsbehoefte voor koeling hun zuurstofuitwisseling snel kan overbelasten.',
    'Een vaak over het hoofd gezien gevaar is de bodemtemperatuur. Bij 24°C luchttemperatuur kan asfalt 34°C bereiken; bij 30°C lucht kan dit oplopen tot 57°C. Bij 60°C kunnen voetzoolkussentjes binnen 60 seconden tweedegraads brandwonden oplopen. Test oppervlakken altijd met de 7-seconden handregel voordat u uw hond erop laat lopen.'
  ],
  'winter-paw-care': [
    'De winter vormt een unieke uitdaging voor de gezondheid van hondenpoten, waar veel eigenaren zich pas bewust van worden als er schade is ontstaan. Dezelfde voetzoolkussentjes die grip en sensorische feedback bieden op warme oppervlakken, worden blootgesteld aan vorstschade, chemische irritatie door ijsvrijmakers, en snijwonden door scherpe ijspunten bij contact met koude temperaturen.',
    'Het begrijpen van de progressie van pootletsels in koude maanden helpt eigenaren in te grijpen voordat er permanente schade ontstaat. De eerste fase is eenvoudige droogheid en kloven — ongemakkelijk maar gemakkelijk te behandelen. Zonder bescherming leidt blootstelling aan zout en ijs tot chemische dermatitis, waarbij de huid van de voetzoolkussentjes ontsteekt en kan gaan bloeden. Langdurige blootstelling aan extreme kou veroorzaakt bevriezing, waarbij weefsel bevriest en veterinaire interventie noodzakelijk kan zijn.',
    'Een vaak over het hoofd gezien gevaar is het cumulatieve effect van dagelijkse blootstelling. Een wandeling van 15 minuten over met zout behandelde trottoirs veroorzaakt minimale irritatie, maar dit 5-7 dagen per week herhalen leidt tot chronische ontsteking en kloven in de voetzoolkussentjes. Vergelijkbaar kunnen korte blootstellingen aan matige vorst (0-2°C) binnen 30 minuten bevriezing veroorzaken wanneer gecombineerd met vochtige omstandigheden en wind.'
  ],
  'christmas-foods': [
    'De kerstperiode creëert een perfecte storm voor vergiftiging van huisdieren: overvloedig giftig voedsel is gemakkelijk toegankelijk, huiselijke routines worden verstoord, en gasten die geen rekening houden met huisdierveiligheid kunnen onbedoeld gevaarlijke items voeren. ASPCA-gegevens tonen aan dat de week tussen Kerst en Nieuwjaar het hoogste aantal vergiftigingsgevallen voor huisdieren van het hele jaar produceert.',
    'Veel traditionele kerstgerechten zijn afzonderlijk gevaarlijk, maar het grootste risico komt van combinaties. Een kerstpudding bevat druiven (nierfalen-gif), alcohol (neurotoxine), en suet (pancreatitis-trigger). Vergelijkbaar kan een holiday cookieplate chocoladechips (theobromine), suikervrije cookies (xylitol), en macadamianoten (neurotoxine) bevatten — elk uit een verschillende gifklasse die verschillende behandelingsprotocollen vereist.',
    'Een derde factor die Kerst bijzonder gevaarlijk maakt is het gedrag van gasten. Studies tonen aan dat meer dan 60% van huisdiervergiftigingen wordt veroorzaakt door gasten die voedsel geven, niet door eigenaren. Gasten beschouwen kleine hoeveelheden vaak als veilig, maar een ounce donkere chocolade kan dodelijk zijn voor een kleine hond. De oplossing is eenvoudig: stel een duidelijke "niet de hond voeren"-regel in en houd uw hond in een veilige ruimte bij gasten vandaan.'
  ],
  'halloween-candy': [
    'Halloween is een van de drukste dagen van het jaar voor vergiftigingsgevallen bij huisdieren. Het ASPCA-vergiftigingscentrum ontvangt gemiddeld 12% meer oproepen rond Halloween, waarvan de meeste betrekking hebben op snoep- en chocolade-inname. Er zijn meerdere redenen: kinderen laten vaak snoep op de grond vallen, trick-or-treat tassen zijn binnen bereik van honden, en de verscheidenheid aan snoep uit verschillende huizen maakt gifidentificatie moeilijk.',
    'Het grootste gevaar van Halloweensnoep is chocolade (theobromine-vergiftiging) en xylitol (gevonden in suikervrije snoep en kauwgum). Xylitol is bijzonder gevaarlijk omdat het bij honden een snelle en ernstige daling van de bloedsuikerspiegel veroorzaakt — één kauwgompakje kan al gevaarlijk zijn voor een hond van 5 kg. De ernst van theobromine-vergiftiging hangt af van het type chocolade: donkere en bakchocolade zijn het gevaarlijkst, terwijl melkchocolade minder gevaarlijk is maar in grote hoeveelheden nog steeds ernstig kan zijn.',
    'Een vaak over het hoofd gezien gevaar zijn de snoepverpakkingen. Folie en plastic verpakkingen kunnen in de darmen ophopen en obstructies veroorzaken, vooral bij kleine honden. Lollystokjes kunnen de darmen perforeren. Als uw hond snoep heeft gegeten, noteer het tijdstip van inname, identificeer het type snoep en de geschatte hoeveelheid, en neem onmiddellijk contact op met een dierenarts of ASPCA Poison Control (888) 426-4435.'
  ],
  'fireworks-anxiety': [
    'Vuurwerkvrees is een van de meest voorkomende en ernstige gedragsproblemen bij honden. Studies tonen aan dat 40-50% van honden gevoelig is voor vuuurwerkgeluid, en ongeveer een derde hiervan ervaart ernstige paniek. Deze vrees kan zo intens zijn dat honden door ramen springen, over hekken klimmen, of tegen muren aan rennen tot ze gewond raken.',
    'Geluidsfoobie ontwikkelt zich meestal progressief — eenmaal begonnen, wordt het met elk vuurwerkincident erger. Het is geen normale vrees; het is een echte fobie die het zenuwstelsel van de hond overweldigt. Veel eigenaren belonen per ongeluk angst of negeren traumatische reacties, wat het probleem verergert. Met tijdige interventie — gedragsmodificatie, omgevingsbeheer en indien nodig medicatie — is verbetering mogelijk bij de meeste honden.',
    'Effectief beheer combineert meerdere strategieën: geluidsreductie (geïsoleerde kamer, witte ruis), het creëren van een veilige plek (een bench of kooi), gedragsmatige desensibilisatie (geleidelijke geluidsblootstelling), feromoonproducten (Adaptil), en in ernstige gevallen medicatie (Sileo, trazodone, benzodiazepinen). Elke hond reageert anders, dus een individuele aanpak is noodzakelijk.'
  ],
  'spring-allergies': [
    'De lente markeert het begin van het allergieseizoen voor honden. Naarmate bomen bloeien, gras groeit en schimmelsporen zich verspreiden, lijden honden aan omgevingsallergenen (atopische dermatitis). Studies tonen aan dat 10-15% van honden door een of andere vorm van allergie wordt getroffen, en de lente is bijzonder moeilijk omdat meerdere allergeentypes tegelijk actief zijn.',
    'Hondenallergieën manifesteren zich anders dan bij mensen. Waar mensen niezen en tranende ogen hebben, ervaren honden voornamelijk jeuk — vooral aan de poten, oren, buik en gezicht. Deze jeuk kan zo intens zijn dat honden voortdurend likken en krabben, waardoor de huidbarrière wordt beschadigd en secundaire bacteriële of gistinfecties ontstaan. Dit creëert een vicieuze cirkel: allergeen veroorzaakt jeuk, likken beschadigt de huid, infectie ontstaat, en de jeuk neemt toe.',
    'Effectief beheer vereist een meerlaagse aanpak: allergeenblootstelling verminderen (poten afvegen, regelmatig baden), huidbarrière versterken (omega-3-vetzuren, topicale moisturizers), symptoomcontrole (antihistaminica, steroïden, Cytopoint, Apoquel), en langetermijndesensibilisatie (immunotherapie). Vroege diagnose en behandeling kunnen secundaire infecties en huidschade voorkomen.'
  ],
  'thanksgiving': [
    'Thanksgiving is een viering van familie en voedsel, en veel eigenaren willen hun honden hierbij betrekken. Met de juiste aanpak is dit mogelijk — maar er staan ook veel gevaarlijke voedingsmiddelen op de tafel. ASPCA-gegevens tonen aan dat er rond Thanksgiving 15-20% meer vergiftigingsgevallen bij huisdieren plaatsvinden, voornamelijk door tafelrestjes, chocoladedesserts en darmobstructies.',
    'Het is belangrijk om het verschil tussen veilige en gevaarlijke voedingsmiddelen te begrijpen. Veilige opties: naturel gekookte kalkoen (zonder vel, botten of kruiden), naturel pompoen (niet de taartvulling), naturel sperziebonen, naturel zoete aardappel en kleine hoeveelheden naturel rijst. Gevaarlijk: kalkoenbotten (broos en scherp), uien en knoflook (schade aan rode bloedcellen), druiven en rozijnen (nierfalen), boter en vettige voedingsmiddelen (pancreatitis), en alcohol (giftig).',
    'Pancreatitis is de meest voorkomende dierenartsspoedeisende situatie na Thanksgiving. Vette tafelrestjes (kalkoenvel, jus, boter, alcohol) stimuleren de alvleesklier, wat acute ontsteking veroorzaakt. Symptomen: braken, buikpijn, lethargie, verlies van eetlust. Kleine honden en in het bijzonder Miniature Schnauzers, Yorkshire Terriërs en Cocker Spaniëls lopen verhoogd risico. Behandeling vereist interne zorg en kan levensbedreigend zijn.'
  ],
  'easter-chocolate': [
    'Pasen is een van de drukste dagen van het jaar voor chocoladevergiftiging bij honden. Eierzoektochten laten traditioneel chocolade-eieren achter die honden vaak vinden voordat kinderen dat doen. Met hun uitstekende reukzin kunnen honden verstopte chocolade door het hele huis vinden — in de tuin, achter meubels en in kinderm凋en.',
    'De ernst van chocoladevergiftiging hangt af van drie factoren: het type chocolade, het gewicht van de hond en de hoeveelheid die is ingenomen. Donkere en bakchocolade zijn het gevaarlijkst omdat ze meer theobromine bevatten. Melkchocolade is minder gevaarlijk maar in grote hoeveelheden nog steeds ernstig. Voor een hond van 10 kg kunnen 30 gram bakchocolade of 200 gram melkchocolade dodelijk zijn. Symptomen verschijnen meestal binnen 6-12 uur.',
    'Er zijn ook andere Pasen-gevaren: kunstgras (darmobstructie), kleine speeltjes (inslikkingsgevaar) en lelieplanten (minder gevaarlijk voor honden maar dodelijk voor katten). De belangrijkste stap: als uw hond chocolade heeft gegeten, verlies geen tijd. Identificeer het type chocolade en de geschatte hoeveelheid, en neem onmiddellijk contact op met een dierenarts of ASPCA Poison Control (888) 426-4435.'
  ],
};

// Apply bodyParagraphs to each seasonal entry
for (const [slug, paragraphs] of Object.entries(bodyParagraphs)) {
  if (seasonal[slug]) {
    seasonal[slug].bodyParagraphs = paragraphs;
  }
}

fs.writeFileSync('messages/nl.json', JSON.stringify(data, null, 2));
console.log('✓ Dutch bodyParagraphs added to messages/nl.json');
