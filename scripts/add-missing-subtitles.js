const fs = require('fs');
const path = require('path');

const locales = ['zh', 'fr', 'de', 'ja', 'ko', 'es', 'pt', 'nl', 'ar', 'ru', 'hi'];
const messagesDir = path.join(__dirname, '..', 'messages');

// Subtitle translations for compare pages
const subtitles = {
  grainFreeVsWholeGrain: {
    zh: "基于证据的无谷与全谷犬粮对比，涵盖DCM风险、原料质量和兽医共识。",
    fr: "Comparaison basée sur les preuves entre aliments sans céréales et aliments à base de céréales complètes couvrant les préoccupations CMD, la qualité des ingrédients et le consensus vétérinaire.",
    de: "Evidenzbasierter Vergleich von getreidefreien und Vollkornprodukten unter Berücksichtigung von DCM-Risiken, Inhaltsstoffqualität und veterinärmedizinischme Konsens.",
    ja: "DCMの懸念、原料の質、獣医学的コンセンサスをカバーするエビデンスベースの無穀と全穀の比較。",
    ko: "DCM 우려, 원료 품질 및 수의학적 합의를 다루는 근거 기반 곡물 프리 vs 통곡물 비교.",
    es: "Comparación basada en la evidencia entre alimentos sin cereales y cereales integrales que cubre las preocupaciones de DCM, la calidad de los ingredientes y el consenso veterinario.",
    pt: "Comparação baseada em evidências entre alimentos sem cereais e cereais integrais cobrindo preocupações com DCM, qualidade dos ingredientes e consenso veterinário.",
    nl: "Op feiten gebaseerde vergelijking van graanvrij en volkoren voer met DCM-risico's, ingrediëntenkwaliteit en veterinaire consensus.",
    ar: "مقارنة قائمة على الأدلة بين الأطعمة الخالية من الحبوب والحبوب الكاملة تغطي مخاوف DCM وجودة المكونات والإجماع البيطري.",
    ru: "Сравнение беззерновых и цельнозерновых кормов на основе данных, охватывающее риски DCM, качество ингредиентов и ветеринарный консенсус.",
    hi: "अंजीर-मुक्त और साबुत अाज के बीच सबूत-आधारित तुलना, DCM चिंताओं, तत्वों की गुणवत्ता और पशु चिकित्सा सहमति को कवर करती है।"
  },
  scratchingPostVsCatTree: {
    zh: "猫抓板与猫爬架的详细对比，涵盖空间需求、抓挠行为、垂直领地需求以及多猫家庭的考量。",
    fr: "Comparaison détaillée entre griffoirs et arbres à chat couvrant les besoins d'espace, le comportement de grattage, le territoire vertical et les foyers multi-chats.",
    de: "Detaillierter Vergleich von Kratzbäumen und Kratzbäumen, der Platzbedarf, Kratzverhalten, vertikales Territorium und Mehrkatzenhaushalte abdeckt.",
    ja: "スペース要件、引っかき行動、垂直縄張り、多猫世帯をカバーするポールとキャツトリーの詳細な比較。",
    ko: "공간 요구 사항, 스크래칭 행동, 수직 영역 및 다묘 가구를 다루는 스크래칭 포스트와 캣트리의 상세 비교.",
    es: "Comparación detallada de rascadores y árboles para gatos que cubre requisitos de espacio, comportamiento de arañazos, territorio vertical y hogares con múltiples gatos.",
    pt: "Comparação detalhada de arranhadores e árvores para gatos cobrindo requisitos de espaço, comportamento de arranhão, território vertical e residências com múltiplos gatos.",
    nl: "Gedetailleerde vergelijling van krabplanken en kattenbomen met betrekking tot ruimtebehoeften, kraggedrag, vertikaal territorium en huishoudens met meerdere katten.",
    ar: "مقارنة تفصيلية بين أعمدة الخربشة وأشجار القطط تغطي متطلبات المساحة وسلوك الخربشة والإقليم والمنازل متعددة القطط.",
    ru: "Подробное сравнение когтеточек и кошачьих деревьев, охватывающее требования к пространству, поведение при точении когтей, вертикальную территорию и дома с несколькими кошками.",
    hi: "स्क्रैचिंग पोस्ट और कैट ट्री की विस्तृत तुलना, जो स्थान आवश्यकताओं, स्क्रैचिंग व्यवहार, लंबवत क्षेत्र और बहु-बिल्ली घरों को कवर करती है।"
  }
};

function readJson(file) {
  let content = fs.readFileSync(file, 'utf-8');
  if (content.charCodeAt(0) === 0xFEFF) content = content.slice(1);
  return JSON.parse(content);
}

function writeJson(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8');
}

let updated = 0;
for (const loc of locales) {
  const file = path.join(messagesDir, `${loc}.json`);
  const json = readJson(file);
  let modified = false;

  for (const [pageKey, translations] of Object.entries(subtitles)) {
    if (json.compare && json.compare[pageKey]) {
      if (!json.compare[pageKey].subtitle) {
        json.compare[pageKey].subtitle = translations[loc];
        modified = true;
        console.log(`✓ [${loc}] Added subtitle to ${pageKey}`);
      }
    }
  }

  if (modified) {
    writeJson(file, json);
    updated++;
  }
}

console.log(`\nDone. Updated ${updated} files.`);
