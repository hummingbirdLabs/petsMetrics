/**
 * 添加 compare 部分的公共 UI 标签翻译
 * 完整的页面内容使用英文作为回退（需专业翻译）
 */

const fs = require('fs');
const path = require('path');

const MESSAGES_DIR = path.join(__dirname, '..', 'messages');

// 移除 BOM
function readJsonFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return JSON.parse(content);
}

// 读取 zh.json 的 compare 结构用于参考
const zhCompare = readJsonFile(path.join(MESSAGES_DIR, 'zh.json')).compare;

// compare 部分的公共 UI 翻译
const compareTranslations = {
  fr: {
    quickComparison: "Tableau de comparaison rapide",
    atAGlance: "En un coup d'œil — {topicA} vs {topicB}:",
    deepDive: "Analyse approfondie : {topicName}",
    considerations: "Considérations",
    significantConcerns: "Problèmes significatifs",
    risks: "Risques",
    limitations: "Limitations",
    tradeOffs: "Compromis et risques accrus",
    bestFor: "Idéal pour :",
    theVerdict: "Le verdict",
    faq: "Questions fréquemment posées",
    references: "Références et sources de données",
    lastUpdated: "Dernière mise à jour : {date} · Données vérifiées auprès de {sources}.",
    dimension: "Dimension",
    breedMatters: "La race compte. Les Golden Retrievers, les Bergers allemands et les Boxers ont des profils de risque de cancer différents des petites races. Discutez des facteurs de risque spécifiques à la race avec votre vétérinaire avant de décider du moment.",
    rawWarning: "Les régimes crus présentent des risques bactériens (Salmonella, Campylobacter). Consultez toujours un nutritionniste vétérinaire avant de changer. Non recommandé pour les foyers immunodéprimés.",
    breedWarning: "La race compte."
  },
  de: {
    quickComparison: "Schneller Vergleichstabelle",
    atAGlance: "Auf einen Blick — {topicA} vs {topicB}:",
    deepDive: "Tiefgehende Analyse: {topicName}",
    considerations: "Überlegungen",
    significantConcerns: "Signifikante Bedenken",
    risks: "Risiken",
    limitations: "Einschränkungen",
    tradeOffs: "Kompromisse und erhöhte Risiken",
    bestFor: "Ideal für:",
    theVerdict: "Das Urteil",
    faq: "Häufig gestellte Fragen",
    references: "Referenzen und Datenquellen",
    lastUpdated: "Letzte Aktualisierung: {date} · Daten verifiziert mit {sources}.",
    dimension: "Dimension",
    breedMatters: "Rasse ist wichtig. Golden Retriever, Deutsche Schäferhunde und Boxer haben andere Krebsrisikoprofile als kleine Rassen. Besprechen Sie die spezifischen Risikofaktoren Ihrer Rasse mit Ihrem Tierarzt, bevor Sie sich für den Zeitpunkt entscheiden.",
    rawWarning: "Rohdiät bergen bakterielle Risiken (Salmonella, Campylobacter). Konsultieren Sie immer einen Tierernährungswissenschaftler vor einem Wechsel. Nicht empfohlen für immungeschwächte Haushalte.",
    breedWarning: "Rasse ist wichtig."
  },
  ja: {
    quickComparison: "クイック比較表",
    atAGlance: "一目でわかる — {topicA} vs {topicB}:",
    deepDive: "詳細分析：{topicName}",
    considerations: "考慮事項",
    significantConcerns: "重要な懸念",
    risks: "リスク",
    limitations: "制限",
    tradeOffs: "トレードオフとリスクの増加",
    bestFor: "最適な対象：",
    theVerdict: "結論",
    faq: "よくある質問",
    references: "参考文献およびデータソース",
    lastUpdated: "最終更新日：{date} · {sources}でデータ検証済み。",
    dimension: "ディメンション",
    breedMatters: "品種は重要です。ゴールデンレトリーバー、ジャーマンシェパード、ボクサーは小品種とは異なる癌リスクプロファイルを持っています。タイミングを決定する前に、獣医に品種固有のリスク要因について相談してください。",
    rawWarning: "生食には細菌リスク（サルモネラ、カンピロバクター）があります。切り替える前に必ず獣医栄養士に相談してください。免疫不全の家庭にはお勧めしません。",
    breedWarning: "品種は重要です。"
  },
  ko: {
    quickComparison: "빠른 비교 표",
    atAGlance: "한눈에 보기 — {topicA} vs {topicB}:",
    deepDive: "심층 분석: {topicName}",
    considerations: "고려 사항",
    significantConcerns: "중요한 우려 사항",
    risks: "위험",
    limitations: "제한 사항",
    tradeOffs: "상충 관계 및 증가하는 위험",
    bestFor: "최적의 대상:",
    theVerdict: "결론",
    faq: "자주 묻는 질문",
    references: "참고문헌 및 데이터 소스",
    lastUpdated: "마지막 업데이트: {date} · {sources}에 데이터 확인됨.",
    dimension: "차원",
    breedMatters: "품종이 중요합니다. 골든 리트리버, 저먼 셰퍼드, 복서는 소형 품종과 다른 암 위험 프로필을 가지고 있습니다. 시기를 결정하기 전에 수의사와 품종별 위험 요인에 대해 상담하십시오.",
    rawWarning: "생식에는 세균 위험(살모넬라, 캠피로박터)이 있습니다. 전환하기 전에 항상 수의사 영양사와 상담하십시오. 면역 저하 가정에는 권장되지 않습니다.",
    breedWarning: "품종이 중요합니다."
  },
  es: {
    quickComparison: "Tabla de comparación rápida",
    atAGlance: "De un vistazo — {topicA} vs {topicB}:",
    deepDive: "Análisis profundo: {topicName}",
    considerations: "Consideraciones",
    significantConcerns: "Preocupaciones significativas",
    risks: "Riesgos",
    limitations: "Limitaciones",
    tradeOffs: "Compromisos y riesgos aumentados",
    bestFor: "Ideal para:",
    theVerdict: "El veredicto",
    faq: "Preguntas frecuentes",
    references: "Referencias y fuentes de datos",
    lastUpdated: "Última actualización: {date} · Datos verificados con {sources}.",
    dimension: "Dimensión",
    breedMatters: "La raza importa. Los Golden Retrievers, Pastores Alemanes y Boxers tienen perfiles de riesgo de cáncer diferentes a las razas pequeñas. Hable con su veterinario sobre los factores de riesgo específicos de su raza antes de decidir cuándo.",
    rawWarning: "Las dietas crudas conllevan riesgos bacterianos (Salmonella, Campylobacter). Siempre consulte a un nutricionista veterinario antes de cambiar. No recomendado para hogares inmunodeprimidos.",
    breedWarning: "La raza importa."
  },
  pt: {
    quickComparison: "Tabela de comparação rápida",
    atAGlance: "À primeira vista — {topicA} vs {topicB}:",
    deepDive: "Análise aprofundada: {topicName}",
    considerations: "Considerações",
    significantConcerns: "Preocupações significativas",
    risks: "Riscos",
    limitations: "Limitações",
    tradeOffs: "Compromissos e riscos aumentados",
    bestFor: "Ideal para:",
    theVerdict: "O veredito",
    faq: "Perguntas frequentes",
    references: "Referências e fontes de dados",
    lastUpdated: "Última atualização: {date} · Dados verificados com {sources}.",
    dimension: "Dimensão",
    breedMatters: "A raça importa. Golden Retrievers, Pastores Alemães e Boxers têm perfis de risco de câncer diferentes de raças pequenas. Discuta os fatores de risk específicos da sua raça com seu veterinário antes de decidir o momento.",
    rawWarning: "Dietas cruas apresentam riscos bacterianos (Salmonella, Campylobacter). Sempre consulte um nutricionista veterinário antes de mudar. Não recomendado para lares imunocomprometidos.",
    breedWarning: "A raça importa."
  },
  nl: {
    quickComparison: "Snelle vergelijkingstabel",
    atAGlance: "In één oogopslag — {topicA} vs {topicB}:",
    deepDive: "Diepe analyse: {topicName}",
    considerations: "Overwegingen",
    significantConcerns: "Significante zorgen",
    risks: "Risico's",
    limitations: "Beperkingen",
    tradeOffs: "Afwegingen en verhoogde risico's",
    bestFor: "Ideaal voor:",
    theVerdict: "Het vonnis",
    faq: "Veel gestelde vragen",
    references: "Verwijzingen en gegevensbronnen",
    lastUpdated: "Laatst bijgewerkt: {date} · Gegevens geverifieerd met {sources}.",
    dimension: "Dimensie",
    breedMatters: "Ras maakt verschil. Golden Retrievers, Duitse herders en Boxers hebben andere kankerprofielen dan kleine rassen. Raadpleeg uw vearts om de specifieke risicofactoren van uw ras te bespreken voordat u een beslissing neemt.",
    rawWarning: "Rauwe diëten geven bacteriële risico's (Salmonella, Campylobacter). Raadpleeg altijd een vearts-voedingsdeskundige voor een verandering. Niet aanbevolen voor immuungecompromitteerde huishoudens.",
    breedWarning: "Ras maakt verschil."
  },
  ar: {
    quickComparison: "جدول المقارنة السريعة",
    atAGlance: "في لمحة — {topicA} مقابل {topicB}:",
    deepDive: "تحليل معمق: {topicName}",
    considerations: "الاعتبارات",
    significantConcerns: "مخاوف مهمة",
    risks: "المخاطر",
    limitations: "القيود",
    tradeOffs: "المقايضات والمخاطر المتزايدة",
    bestFor: "مثالي لـ:",
    theVerdict: "الحكم",
    faq: "الأسئلة الشائعة",
    references: "المراجع ومصادر البيانات",
    lastUpdated: "آخر تحديث: {date} · تم التحقق من البيانات مع {sources}.",
    dimension: "البعد",
    breedMatters: "السلالة مهمة. كلاب الجولدن ريتريفر والراعي الألماني والبوكس لها ملفات خطر سرطان مختلفة عن السلالات الصغيرة. ناقش مع طبيبك البيطري عوامل الخطر الخاصة بسلالتك قبل اتخاذ قرار.",
    rawWarning: "تحمل الحمية النئة مخاطر بكتيرية (السالمونيلا، العطيفة). استشر دائما خبير التغذية البيطرية قبل التبديل. غير موصى به للأسر المناعية المثبطة.",
    breedWarning: "السلالة مهمة."
  },
  ru: {
    quickComparison: "Быстрая таблица сравнения",
    atAGlance: "С первого взгляда — {topicA} против {topicB}:",
    deepDive: "Глубокий анализ: {topicName}",
    considerations: "Рассмотрение",
    significantConcerns: "Значительные проблемы",
    risks: "Риски",
    limitations: "Ограничения",
    tradeOffs: "Компромиссы и повышенные риски",
    bestFor: "Лучше всего подходит для:",
    theVerdict: "Вердикт",
    faq: "Часто задаваемые вопросы",
    references: "Источники и базы данных",
    lastUpdated: "Последнее обновление: {date} · Данные проверены по {sources}.",
    dimension: "Измерение",
    breedMatters: "Порода имеет значение. У золотистых ретриверов, немецких овчарок и боксеров другой профиль риска рака, чем у мелких пород. Обсудите конкретные факторы риска вашей породы с ветеринаром перед принятием решения.",
    rawWarning: "Сыроедение несет бактериальные риски (сальмонелла, кампилобактер). Всегда консультируйтесь c ветеринарным диетологом перед переходом. Не рекомендуется для иммунокомпрометированных домохозяйств.",
    breedWarning: "Порода имеет значение."
  },
  hi: {
    quickComparison: "त्वरित तुलना तालिका",
    atAGlance: "एक नजर में — {topicA} बनाम {topicB}:",
    deepDive: "गहन विश्लेषण: {topicName}",
    considerations: "विचार",
    significantConcerns: "महत्वपूर्ण चिंताएं",
    risks: "जोखिम",
    limitations: "सीमाएं",
    tradeOffs: "व्यापार-बंद और बढ़े हुए जोखिम",
    bestFor: "इसके लिए सबसे उपयुक्त:",
    theVerdict: "फैसला",
    faq: "अक्सर पूछे जाने वाले प्रश्न",
    references: "संदर्भ और डेटा स्रोत",
    lastUpdated: "अंतिम अपडेट: {date} · डेटा {sources} के सत्यापित।",
    dimension: "आयाम",
    breedMatters: "नस्ल मायने रखती है। गोल्डन रिट्रीवर, जर्मन शेफर्ड और बॉक्सर में छोटी नस्लों से अलग कैंसर जोखिम प्रोफाइल होती है। समय तय करने से पहले अपने पशु चिकित्सक से अपनी नस्ल के विशिष्ट जोखिम कारकों पर चर्चा करें।",
    rawWarning: "कच्चे भोजन में बैक्टीरियल जोखिम (सालमोनेला, कैम्पिलोबैक्टर) होता है। बदलने से पहले हमेशा पशु चिकित्सा पोषण विशेषज्ञ से परामर्श करें। प्रतिरक्षा-प्रभावित परिवारों के लिए अनुशंसित नहीं।",
    breedWarning: "नस्ल मायने रखती है।"
  }
};

// 处理每个语言文件
const targetLocales = ['fr', 'de', 'ja', 'ko', 'es', 'pt', 'nl', 'ar', 'ru', 'hi'];

function processLocale(locale) {
  const filePath = path.join(MESSAGES_DIR, `${locale}.json`);
  const json = readJsonFile(filePath);

  // 添加 compare 公共键
  if (!json.compare) {
    json.compare = {};
  }

  const localeTrans = compareTranslations[locale];
  if (localeTrans) {
    // 只添加公共 UI 标签，不覆盖已有内容
    Object.keys(localeTrans).forEach(key => {
      if (!json.compare[key]) {
        json.compare[key] = localeTrans[key];
      }
    });
    console.log(`✓ [${locale}] 已添加 compare 公共 UI 标签`);
  }

  // 修复 fr.json 的季节性面包屑
  if (locale === 'fr' && json.seasonal?.breadcrumb) {
    if (json.seasonal.breadcrumb.season && !json.seasonal.breadcrumb.seasonal) {
      json.seasonal.breadcrumb.seasonal = json.seasonal.breadcrumb.season;
      delete json.seasonal.breadcrumb.season;
    }
  }

  // 删除多余的 youngAdult 键
  if (json.dogAge?.lifeStage?.youngAdult) {
    delete json.dogAge.lifeStage.youngAdult;
    console.log(`✓ [${locale}] 已删除多余的 youngAdult 键`);
  }

  // 写入文件
  fs.writeFileSync(filePath, JSON.stringify(json, null, 2) + '\n', 'utf-8');
  console.log(`✓ [${locale}] 文件已保存`);
}

// 执行
console.log('开始添加 compare 翻译...\n');
targetLocales.forEach(processLocale);
console.log('\n完成！');
