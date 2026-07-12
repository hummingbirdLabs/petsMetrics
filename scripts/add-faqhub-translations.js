/**
 * Add faqHub section to all language files
 * This script adds the missing faqHub translations required by FaqHubPage component
 */

const fs = require('fs');
const path = require('path');

const messagesDir = path.join(__dirname, '..', 'messages');

// English faqHub section (base reference)
const enFaqHub = {
  breadcrumb: {
    home: "Home",
    dog: "Dog",
    cat: "Cat",
    faq: "FAQ",
    nutrition: "Nutrition",
    health: "Health",
    aging: "Aging"
  },
  lastUpdated: "Last updated: {date}. Sources: {sources}",
  overview: "This page aggregates {count} frequently asked questions",
  overviewDetail: "from across our guides and calculators.",
  toc: "Table of Contents",
  questions: "questions",
  goToTool: "Go to {tool}",
  source: "Source",
  relatedTools: "Related Tools",
  references: "References & Data Sources",
  whyTrust: "Why Trust petsMetrics?",
  trustContent1: "All content on petsMetrics is based on published veterinary guidelines from authoritative sources including AAHA, WSAVA, AAFCO, AAFP, and ASPCA. Our calculators use peer-reviewed formulas, and our toxicity data is compiled from the ASPCA Animal Poison Control Center database. Every claim is cited with its original source for independent verification.",
  trustContent2: "Our team includes veterinary professionals and researchers who review all content for accuracy before publication. We follow a strict editorial policy: no anonymous sources, no unverified claims, and no commercial bias. When veterinary guidance evolves, we update our content accordingly.",
  disclaimer: "The information provided on petsMetrics is for educational purposes only and does not constitute veterinary advice. Always consult a licensed veterinarian for decisions regarding your pet's health. If your pet is experiencing a medical emergency, contact your veterinarian or nearest emergency animal hospital immediately."
};

// Translations for each language
const translations = {
  zh: {
    breadcrumb: {
      home: "首页",
      dog: "狗狗",
      cat: "猫咪",
      faq: "常见问题",
      nutrition: "营养",
      health: "健康",
      aging: "衰老"
    },
    lastUpdated: "最后更新：{date}。来源：{sources}",
    overview: "本页汇总了 {count} 个常见问题",
    overviewDetail: "来自我们的指南和计算器。",
    toc: "目录",
    questions: "个问题",
    goToTool: "前往 {tool}",
    source: "来源",
    relatedTools: "相关工具",
    references: "参考来源与数据",
    whyTrust: "为什么信任 petsMetrics？",
    trustContent1: "petsMetrics 上的所有内容均基于权威来源发布的兽医指南，包括 AAHA、WSAVA、AAFCO、AAFCO、AAFCO 和 ASPCA。我们的计算器使用同行评审的公式，我们的毒性数据来自动物毒物控制中心数据库。每个声明都引用其原始来源以供独立验证。",
    trustContent2: "我们的团队包括兽医专业人员和研究人员，他们在发布前审查所有内容以确保准确性。我们遵循严格的编辑政策：不匿名来源、不未经验证声明、不商业偏见。当兽医指南更新时，我们会相应更新内容。",
    disclaimer: "petsMetrics 提供的信息仅供教育用途，不构成兽医建议。关于宠物健康的决定，请务必咨询持证兽医。如果您的宠物遇到医疗紧急情况，请立即联系您的兽医或最近的急诊动物医院。"
  },
  fr: {
    breadcrumb: {
      home: "Accueil",
      dog: "Chien",
      cat: "Chat",
      faq: "FAQ",
      nutrition: "Nutrition",
      health: "Santé",
      aging: "Vieillissement"
    },
    lastUpdated: "Dernière mise à jour : {date}. Sources : {sources}",
    overview: "Cette page regroupe {count} questions fréquemment posées",
    overviewDetail: "issues de nos guides et calculatrices.",
    toc: "Table des matières",
    questions: "questions",
    goToTool: "Aller à {tool}",
    source: "Source",
    relatedTools: "Outils connexes",
    references: "Références et sources de données",
    whyTrust: "Pourquoi faire confiance à petsMetrics ?",
    trustContent1: "Tout le contenu de petsMetrics est basé sur des directives vétérinaires publiées par des sources faisant autorité, notamment l'AAHA, la WSAVA, l'AAFCO, l'AAFP et l'ASPCA. Nos calculatrices utilisent des formules évaluées par des pairs, et nos données de toxicité sont compilées à partir de la base de données du centre antipoison animal de l'ASPCA. Chaque affirmation est citée avec sa source originale pour une vérification indépendante.",
    trustContent2: "Notre équipe comprend des professionnels vétérinaires et des chercheurs qui examinent tout le contenu pour en vérifier l'exactitude avant publication. Nous suivons une politique éditoriale stricte : pas de sources anonymes, pas d'affirmations non vérifiées et pas de biais commercial. Lorsque les directives vétérinaires évoluent, nous mettons à jour notre contenu en conséquence.",
    disclaimer: "Les informations fournies sur petsMetrics sont uniquement à des fins éducatives et ne constituent pas un conseil vétérinaire. Consultez toujours un vétérinaire agréé pour les décisions concernant la santé de votre animal. Si votre animal rencontre une urgence médicale, contactez immédiatement votre vétérinaire ou l'hôpital vétérinaire d'urgence le plus proche."
  },
  de: {
    breadcrumb: {
      home: "Startseite",
      dog: "Hund",
      cat: "Katze",
      faq: "FAQ",
      nutrition: "Ernährung",
      health: "Gesundheit",
      aging: "Altern"
    },
    lastUpdated: "Letzte Aktualisierung: {date}. Quellen: {sources}",
    overview: "Diese Seite fasst {count} häufig gestellte Fragen zusammen",
    overviewDetail: "aus unseren Leitfäden und Rechnern.",
    toc: "Inhaltsverzeichnis",
    questions: "Fragen",
    goToTool: "Zu {tool} gehen",
    source: "Quelle",
    relatedTools: "Verwandte Tools",
    references: "Referenzen & Datenquellen",
    whyTrust: "Warum petsMetrics vertrauen?",
    trustContent1: "Alle Inhalte auf petsMetrics basieren auf veröffentlichten veterinärmedizinischen Leitlinien von autoritativen Quellen wie AAHA, WSAVA, AAFCO, AAFP und ASPCA. Unsere Rechner verwenden von Fachleuten geprügte Formeln, und unsere Toxizitätsdaten werden aus der Datenbank des ASPCA Animal Poison Control Center zusammengestellt. Jede Aussage wird mit ihrer Originalquelle zitiert, um eine unabhängige Überprüfung zu ermöglichen.",
    trustContent2: "Unser Team umfasst veterinärmedizinische Fachleute und Forscher, die alle Inhalte vor der Veröffentlichung auf Genauigkeit überprüfen. Wir folgen einer strengen Redaktionsrichtlinie: keine anonymen Quellen, keine unüberprüften Behauptungen und keine kommerzielle Voreingenommenheit. Wenn sich veterinärmedizinische Leitlinien entwickeln, aktualisieren wir unsere Inhalte entsprechend.",
    disclaimer: "Die auf petsMetrics bereitgestellten Informationen dienen ausschließlich Bildungszwecken und stellen keine tierärztliche Beratung dar. Konsultieren Sie immer einen zugelassenen Tierarzt für Entscheidungen bezüglich der Gesundheit Ihres Haustieres. Wenn Ihr Haustier einen medizinischen Notfall hat, kontaktieren Sie sofort Ihren Tierarzt oder das nächste Notfall-Tierkrankenhaus."
  },
  ja: {
    breadcrumb: {
      home: "ホーム",
      dog: "犬",
      cat: "猫",
      faq: "よくある質問",
      nutrition: "栄養",
      health: "健康",
      aging: "老化"
    },
    lastUpdated: "最終更新日：{date}。ソース：{sources}",
    overview: "このページは {count} のよくある質問を集約しています",
    overviewDetail: "ガイドと計算機からのものです。",
    toc: "目次",
    questions: "質問",
    goToTool: "{tool}に移動",
    source: "ソース",
    relatedTools: "関連ツール",
    references: "参考文献とデータソース",
    whyTrust: "petsMetricsを信頼できる理由",
    trustContent1: "petsMetricsのすべてのコンテンツは、AAHA、WSAVA、AAFCO、AAFCO、AAFCO、ASPCAなどの権威あるソースから公開された獣医療ガイドラインに基づいています。計算機は査読済みの式を使用し、毒性データはASPCA動物毒物管理センターのデータベースから編集されています。すべての主張は独立した検証のために元のソースで引用されています。",
    trustContent2: "私たちのチームには、公開前にすべてのコンテンツの精度を確認する獣医療専門家と研究者が含まれています。私たちは厳格な編集ポリシーを守っています：匿名のソースなし、未確認の主張なし、商業的バイアスなし。獣医療ガイドラインが進化するにつれて、それに応じてコンテンツを更新します。",
    disclaimer: "petsMetricsで提供される情報は教育目的のみであり、獣医療アドバイスを構成するものではありません。ペットの健康に関する決定については、必ず免許を取得した獣医師に相談してください。ペットが医療緊急事態にある場合は、すぐに獣医師または最寄りの緊急動物病院に連絡してください。"
  },
  ko: {
    breadcrumb: {
      home: "홈",
      dog: "개",
      cat: "고양이",
      faq: "자주 묻는 질문",
      nutrition: "영양",
      health: "건강",
      aging: "노화"
    },
    lastUpdated: "마지막 업데이트: {date}. 소스: {sources}",
    overview: "이 페이지는 {count}개의 자주 묻는 질문을 집계합니다",
    overviewDetail: "가이드와 계산기에서 가져온 것입니다.",
    toc: "목차",
    questions: "질문",
    goToTool: "{tool}로 이동",
    source: "소스",
    relatedTools: "관련 도구",
    references: "참고문헌 및 데이터 소스",
    whyTrust: "petsMetrics를 신뢰하는 이유",
    trustContent1: "petsMetrics의 모든 콘텐츠는 AAHA, WSAVA, AAFCO, AAFP 및 ASPCA와 같은 권위 있는 소스에서 게시된 수의학 지침을 기반으로 합니다. 계산기는 동료 검토된 공식을 사용하며, 독성 데이터는 ASPCA 동물 독물 관리 센터 데이터베이스에서 편집됩니다. 모든 주장은 독립적인 검증을 위해 원본 소스로 인용됩니다.",
    trustContent2: "우리 팀에는 게시 전에 모든 콘텐츠의 정확성을 확인하는 수의학 전문가와 연구원이 포함되어 있습니다. 우리는 엄격한 편집 정책을 따릅니다: 익명 소스 없음, 확인되지 않은 주장 없음, 상업적 편향 없음. 수의학 지침이 발전함에 따라 그에 따라 콘텐츠를 업데이트합니다.",
    disclaimer: "petsMetrics에서 제공하는 정보는 교육 목적으로만 제공되며 수의학 조언을 구성하지 않습니다. 반려동물의 건강에 관한 결정에 대해서는 항상 면허가 있는 수의사와 상담하십시오. 반려동물이 의료 긴급 상황에 있는 경우 즉시 수의사 또는 가장 가까운 응급 동물 병원에 연락하십시오."
  },
  es: {
    breadcrumb: {
      home: "Inicio",
      dog: "Perro",
      cat: "Gato",
      faq: "Preguntas frecuentes",
      nutrition: "Nutrición",
      health: "Salud",
      aging: "Envejecimiento"
    },
    lastUpdated: "Última actualización: {date}. Fuentes: {sources}",
    overview: "Esta página agrega {count} preguntas frecuentes",
    overviewDetail: "de nuestras guías y calculadoras.",
    toc: "Tabla de contenidos",
    questions: "preguntas",
    goToTool: "Ir a {tool}",
    source: "Fuente",
    relatedTools: "Herramientas relacionadas",
    references: "Referencias y fuentes de datos",
    whyTrust: "¿Por qué confiar en petsMetrics?",
    trustContent1: "Todo el contenido de petsMetrics se basa en directrices veterinarias publicadas por fuentes autorizadas, incluidas AAHA, WSAVA, AAFCO, AAFP y ASPCA. Nuestras calculadoras utilizan fórmulas revisadas por pares, y nuestros datos de toxicidad se compilan a partir de la base de datos del Centro de Control de Envenenamiento Animal de ASPCA. Cada afirmación se cita con su fuente original para verificación independiente.",
    trustContent2: "Nuestro equipo incluye profesionales veterinarios e investigadores que revisan todo el contenido para verificar su precisión antes de la publicación. Seguimos una política editorial estricta: sin fuentes anónimas, sin afirmaciones no verificadas y sin sesgo comercial. Cuando las directrices veterinarias evolucionan, actualizamos nuestro contenido en consecuencia.",
    disclaimer: "La información proporcionada en petsMetrics es solo con fines educativos y no constituye asesoramiento veterinario. Siempre consulte a un veterinario con licencia para decisiones sobre la salud de su mascota. Si su mascota experimenta una emergencia médica, comuníquese inmediatamente con su veterinario o el hospital de animales de emergencia más cercano."
  },
  pt: {
    breadcrumb: {
      home: "Início",
      dog: "Cachorro",
      cat: "Gato",
      faq: "Perguntas frequentes",
      nutrition: "Nutrição",
      health: "Saúde",
      aging: "Envelhecimento"
    },
    lastUpdated: "Última atualização: {date}. Fontes: {sources}",
    overview: "Esta página agrega {count} perguntas frequentes",
    overviewDetail: "de nossos guias e calculadoras.",
    toc: "Índice",
    questions: "perguntas",
    goToTool: "Ir para {tool}",
    source: "Fonte",
    relatedTools: "Ferramentas relacionadas",
    references: "Referências e fontes de dados",
    whyTrust: "Por que confiar na petsMetrics?",
    trustContent1: "Todo o conteúdo da petsMetrics é baseado em diretrizes veterinárias publicadas por fontes autorizadas, incluindo AAHA, WSAVA, AAFCO, AAFP e ASPCA. Nossas calculadoras usam fórmulas revisadas por pares, e nossos dados de toxicidade são compilados a partir do banco de dados do Centro de Controle de Envenenamento Animal da ASPCA. Cada afirmação é citada com sua fonte original para verificação independente.",
    trustContent2: "Nossa equipe inclui profissionais veterinários e pesquisadores que revisam todo o conteúdo para verificar sua precisão antes da publicação. Seguimos uma política editorial rigorosa: sem fontes anônimas, sem afirmações não verificadas e sem viés comercial. Quando as diretrizes veterinárias evoluem, atualizamos nosso conteúdo de acordo.",
    disclaimer: "As informações fornecidas na petsMetrics são apenas para fins educacionais e não constituem aconselhamento veterinário. Sempre consulte um veterinário licenciado para decisões sobre a saúde do seu animal de estimação. Se o seu animal de estimação estiver passando por uma emergência médica, entre em contato imediatamente com o seu veterinário ou o hospital de animais de emergência mais próximo."
  },
  nl: {
    breadcrumb: {
      home: "Startpagina",
      dog: "Hond",
      cat: "Kat",
      faq: "FAQ",
      nutrition: "Voeding",
      health: "Gezondheid",
      aging: "Veroudering"
    },
    lastUpdated: "Laatst bijgewerkt: {date}. Bronnen: {sources}",
    overview: "Deze pagina verzamelt {count} veelgestelde vragen",
    overviewDetail: "uit onze gidsen en rekenmachines.",
    toc: "Inhoudsopgave",
    questions: "vragen",
    goToTool: "Ga naar {tool}",
    source: "Bron",
    relatedTools: "Gerelateerde tools",
    references: "Referentie & databronnen",
    whyTrust: "Waarom petsMetrics vertrouwen?",
    trustContent1: "Alle inhoud op petsMetrics is gebaseerd op gepubliceerde veterinair richtlijnen van gezaghebbende bronnen, waaronder AAHA, WSAVA, AAFCO, AAFP en ASPCA. Onze rekenmachines gebruiken door beoordeelde formules, en onze toxiciteitsgegevens worden samengesteld uit de database van het ASPCA Animal Poison Control Center. Elke bewering wordt geciteerd met de oorspronkelijke bron voor onafhankelijke verificatie.",
    trustContent2: "Ons team omvat veterinair professionals en onderzoekers die alle inhoud beoordelen op nauwkeurigheid vóór publicatie. We volgen een strikt redactiebeleid: geen anonieme bronnen, geen ongeverifieerde beweringen en geen commerciële vooringenomenheid. Wanneer veterinair richtlijnen evolueren, werken we onze inhoud dienovereenkomstig bij.",
    disclaimer: "De informatie verstrekt op petsMetrics is alleen voor educatieve doeleinden en vormt geen veterinair advies. Raadpleeg altijd een gelicentieerde dierenarts voor beslissingen over de gezondheid van uw huisdier. Als uw huisdier een medische noodtoestand heeft, neem dan onmiddellijk contact op met uw dierenarts of het dierenziekenhuis voor spoedhulp."
  },
  ar: {
    breadcrumb: {
      home: "الرئيسية",
      dog: "كلب",
      cat: "قطة",
      faq: "الأسئلة الشائعة",
      nutrition: "التغذية",
      health: "الصحة",
      aging: "الشيخوخة"
    },
    lastUpdated: "آخر تحديث: {date}. المصادر: {sources}",
    overview: "تجمع هذه الصفحة {count} من الأسئلة الشائعة",
    overviewDetail: "من أدلتنا وآلات الحساب الخاصة بنا.",
    toc: "جدول المحتويات",
    questions: "أسئلة",
    goToTool: "انتقل إلى {tool}",
    source: "المصدر",
    relatedTools: "الأدوات ذات الصلة",
    references: "المراجع ومصادر البيانات",
    whyTrust: "لماذا تثق في petsMetrics؟",
    trustContent1: "يعتمد كل المحتوى على petsMetrics على الإرشادات البيطرية المنشورة من مصادر موثوقة بما في ذلك AAHA و WSAVA و AAFCO و AAFP و ASPCA. تستخدم آلات الحساب لدينا صيغًا خضعت لمراجعة الأقران، وتتم تجميع بيانات السموم من قاعدة بيانات مركز مكافحة السموم الحيوانية التابع لـ ASPCA. يتم استشهاد بكل ادعاء بمصدره الأصلي للتحقق المستقل.",
    trustContent2: "يضم فريقنا متخصصين بيطريين وباحثين يراجعون جميع المحتوى للتأكد من دقته قبل النشر. نتبع سياسة تحريرية صارمة: لا مصادر مجهولة، لا ادعاءات غير مؤكدة، ولا تحيز تجاري. عندما تتطور الإرشادات البيطرية، نقوم بتحديث المحتوى وفقًا لذلك.",
    disclaimer: "المعلومات المقدمة على petsMetrics هي للأغراض التعليمية فقط ولا تشكل نصيحة بيطرية. استشر دائمًا طبيبًا بيطريًا مرخصًا لاتخاذ قرارات تتعلق بصحة حيوانك الأليف. إذا كان حيوانك الأليف يعاني من حالة طبية طارئة، فاتصل بطبيبك البيطري أو أقرب مستشفى حيوانات طارئ على الفور."
  },
  ru: {
    breadcrumb: {
      home: "Главная",
      dog: "Собака",
      cat: "Кошка",
      faq: "Часто задаваемые вопросы",
      nutrition: "Питание",
      health: "Здоровье",
      aging: "Старение"
    },
    lastUpdated: "Последнее обновление: {date}. Источники: {sources}",
    overview: "Эта страница объединяет {count} часто задаваемых вопросов",
    overviewDetail: "из наших руководств и калькуляторов.",
    toc: "Оглавление",
    questions: "вопросов",
    goToTool: "Перейти к {tool}",
    source: "Источник",
    relatedTools: "Связанные инструменты",
    references: "Ссылки и источники данных",
    whyTrust: "Почему стоит доверять petsMetrics?",
    trustContent1: "Весь контент на petsMetrics основан на опубликованных ветеринарных рекомендациях из авторитетных источников, включая AAHA, WSAVA, AAFCO, AAFP и ASPCA. Наши калькуляторы используют рецензируемые формулы, а данные о токсичности составлены из базы данных Центра контроля отравлений животных ASPCA. Каждое утверждение цитируется с указанием оригинального источника для независимой проверки.",
    trustContent2: "В нашу команду входят ветеринарные специалисты и исследователи, которые проверяют весь контент на точность перед публикацией. Мы следуем строгой редакционной политике: без анонимных источников, без непроверенных утверждений и без коммерческой предвзятости. Когда ветеринарные рекомендации меняются, мы обновляем наш контент соответствующим образом.",
    disclaimer: "Информация, предоставленная на petsMetrics, предназначена только для образовательных целей и не является ветеринарной консультацией. Всегда консультируйтесь с лицензированным ветеринаром по вопросам здоровья вашего питомца. Если у вашего питомца возникла медицинская чрезвычайная ситуация, немедленно свяжитесь с вашим ветеринаром или ближайшей ветеринарной клиникой неотложной помощи."
  },
  hi: {
    breadcrumb: {
      home: "होम",
      dog: "कुत्ता",
      cat: "बिल्ली",
      faq: "अक्सर पूछे जाने वाले प्रश्न",
      nutrition: "पोषण",
      health: "स्वास्थ्य",
      aging: "बुढ़ापा"
    },
    lastUpdated: "अंतिम अपडेट: {date}。स्रोत: {sources}",
    overview: "यह पृष्ठ {count} अक्सर पूछे जाने वाले प्रश्नों को एकत्रित करता है",
    overviewDetail: "हमारे गाइड और कैलकुलेटर से।",
    toc: "विषय सूची",
    questions: "प्रश्न",
    goToTool: "{tool} पर जाएं",
    source: "स्रोत",
    relatedTools: "संबंधित टूल",
    references: "संदर्भ और डेटा स्रोत",
    whyTrust: "petsMetrics पर विश्वास क्यों करें?",
    trustContent1: "petsMetrics पर सभी सामग्री AAHA, WSAVA, AAFCO, AAFP और ASPCA सहित प्राधिकरण स्रोतों से प्रकाशित पशु चिकित्सा दिशानिर्देशों पर आधारित है। हमारे कैलकुलेटर सहकर्मी-समीक्षित सूत्रों का उपयोग करते हैं, और हमारा विषाक्तता डेटा ASPCA पशु विष नियंत्रण केंद्र डेटाबेस से संकलित किया गया है। प्रत्येक दावा स्वतंत्र सत्यापन के लिए अपने मूल स्रोत के साथ उद्धृत किया गया है।",
    trustContent2: "हमारी टीम में पशु चिकित्सा पेशेवर और शोधकर्ता शामिल हैं जो प्रकाशन से पहले सभी सामग्री की सटीकता की समीक्षा करते हैं। हम एक सख्त संपादकीय नीति का पालन करते हैं: कोई गुमनाम स्रोत नहीं, कोई असत्यापित दावा नहीं, और कोई व्यावसायिक पक्षपात नहीं। जब पशु चिकित्सा दिशानिर्देश विकसित होते हैं, तो हम तदनुसार अपनी सामग्री अपडेट करते हैं।",
    disclaimer: "petsMetrics पर प्रदान की गई जानकारी केवल शैक्षिक उद्देश्यों के लिए है और पशु चिकित्सा सलाह का गठन नहीं करती। अपने पालतू जानवर के स्वास्थ्य से संबंधित निर्णयों के लिए हमेशा एक लाइसेंस प्राप्त पशु चिकित्सक से परामर्श करें। यदि आपके पालतू जानवर को चिकित्सा आपातकालीन स्थिति है, तो तुरंत अपने पशु चिकित्सक या निकटतम आपातकालीन पशु अस्पताल से संपर्क करें।"
  }
};

// Function to add faqHub section to a language file
function addFaqHubSection(langCode) {
  const filePath = path.join(messagesDir, `${langCode}.json`);
  
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(content);
  
  // Get the translation for this language (or use English as fallback)
  const faqHubData = translations[langCode] || enFaqHub;
  
  // Add or replace the faqHub section
  data.faqHub = faqHubData;
  
  // Write back to file
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`Updated ${langCode}.json with faqHub section`);
}

// Process all languages
const languages = ['en', 'zh', 'fr', 'de', 'ja', 'ko', 'es', 'pt', 'nl', 'ar', 'ru', 'hi'];

console.log('Adding faqHub section to all language files...');
languages.forEach(lang => addFaqHubSection(lang));
console.log('Done!');
