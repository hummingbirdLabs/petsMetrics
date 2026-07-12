/**
 * Add missing top-level keys to the seasonal namespace
 * The SeasonalDangerPage component accesses these keys from the seasonal namespace
 */

const fs = require('fs');
const path = require('path');

const messagesDir = path.join(__dirname, '..', 'messages');

// English seasonal top-level keys (base reference)
const enSeasonalKeys = {
  lastUpdated: "Last updated: {date}. Sources: {sources}",
  knowledgeCards: "Knowledge Cards",
  prevention: "Prevention",
  symptoms: "Symptoms",
  firstAid: "First Aid",
  emergencyLink: "Emergency: This Could Be Life-Threatening",
  emergencyLinkDesc: "If your pet is showing severe symptoms, do not wait. Contact your veterinarian or nearest emergency animal hospital immediately.",
  goToEmergency: "Go to Emergency Guide",
  faqs: "Frequently Asked Questions",
  relatedTools: "Related Tools",
  references: "References & Data Sources",
  disclaimer: "The information provided on petsMetrics is for educational purposes only and does not constitute veterinary advice. Always consult a licensed veterinarian for decisions regarding your pet's health. If your pet is experiencing a medical emergency, contact your veterinarian or nearest emergency animal hospital immediately."
};

// Translations for each language
const translations = {
  zh: {
    lastUpdated: "最后更新：{date}。来源：{sources}",
    knowledgeCards: "知识卡片",
    prevention: "预防",
    symptoms: "症状",
    firstAid: "急救",
    emergencyLink: "紧急情况：这可能危及生命",
    emergencyLinkDesc: "如果您的宠物出现严重症状，请不要等待。立即联系您的兽医或最近的急诊动物医院。",
    goToEmergency: "前往急救指南",
    faqs: "常见问题",
    relatedTools: "相关工具",
    references: "参考来源与数据",
    disclaimer: "petsMetrics 提供的信息仅供教育用途，不构成兽医建议。关于宠物健康的决定，请务必咨询持证兽医。如果您的宠物遇到医疗紧急情况，请立即联系您的兽医或最近的急诊动物医院。"
  },
  fr: {
    lastUpdated: "Dernière mise à jour : {date}. Sources : {sources}",
    knowledgeCards: "Cartes de connaissances",
    prevention: "Prévention",
    symptoms: "Symptômes",
    firstAid: "Premiers secours",
    emergencyLink: "Urgence : cela peut être mortel",
    emergencyLinkDesc: "Si votre animal présente des symptômes graves, n'attendez pas. Contactez immédiatement votre vétérinaire ou l'hôpital vétérinaire d'urgence le plus proche.",
    goToEmergency: "Aller au guide d'urgence",
    faqs: "Questions fréquemment posées",
    relatedTools: "Outils connexes",
    references: "Références et sources de données",
    disclaimer: "Les informations fournies sur petsMetrics sont uniquement à des fins éducatives et ne constituent pas un conseil vétérinaire. Consultez toujours un vétérinaire agréé pour les décisions concernant la santé de votre animal. Si votre animal rencontre une urgence médicale, contactez immédiatement votre vétérinaire ou l'hôpital vétérinaire d'urgence le plus proche."
  },
  de: {
    lastUpdated: "Letzte Aktualisierung: {date}. Quellen: {sources}",
    knowledgeCards: "Wissenskarten",
    prevention: "Vorbeugung",
    symptoms: "Symptome",
    firstAid: "Erste Hilfe",
    emergencyLink: "Notfall: Dies kann lebensbedrohlich sein",
    emergencyLinkDesc: "Wenn Ihr Haustier schwere Symptome zeigt, warten Sie nicht. Kontaktieren Sie sofort Ihren Tierarzt oder das nächste Notfall-Tierkrankenhaus.",
    goToEmergency: "Zum Notfall-Leitfaden",
    faqs: "Häufig gestellte Fragen",
    relatedTools: "Verwandte Tools",
    references: "Referenzen & Datenquellen",
    disclaimer: "Die auf petsMetrics bereitgestellten Informationen dienen ausschließlich Bildungszwecken und stellen keine tierärztliche Beratung dar. Konsultieren Sie immer einen zugelassenen Tierarzt für Entscheidungen bezüglich der Gesundheit Ihres Haustieres. Wenn Ihr Haustier einen medizinischen Notfall hat, kontaktieren Sie sofort Ihren Tierarzt oder das nächste Notfall-Tierkrankenhaus."
  },
  ja: {
    lastUpdated: "最終更新日：{date}。ソース：{sources}",
    knowledgeCards: "知識カード",
    prevention: "予防",
    symptoms: "症状",
    firstAid: "応急処置",
    emergencyLink: "緊急：これは生命を脅かす可能性があります",
    emergencyLinkDesc: "ペットに重篤な症状が現れた場合は、待たずにすぐに獣医師または最寄りの緊急動物病院に連絡してください。",
    goToEmergency: "緊急ガイドに移動",
    faqs: "よくある質問",
    relatedTools: "関連ツール",
    references: "参考文献とデータソース",
    disclaimer: "petsMetricsで提供される情報は教育目的のみであり、獣医療アドバイスを構成するものではありません。ペットの健康に関する決定については、必ず免許を取得した獣医師に相談してください。ペットが医療緊急事態にある場合は、すぐに獣医師または最寄りの緊急動物病院に連絡してください。"
  },
  ko: {
    lastUpdated: "마지막 업데이트: {date}. 소스: {sources}",
    knowledgeCards: "지식 카드",
    prevention: "예방",
    symptoms: "증상",
    firstAid: "응급 처치",
    emergencyLink: "응급: 생명을 위협할 수 있습니다",
    emergencyLinkDesc: "반려동물에 심각한 증상이 나타나면 기다리지 마십시오. 즉시 수의사 또는 가장 가까운 응급 동물 병원에 연락하십시오.",
    goToEmergency: "응급 가이드로 이동",
    faqs: "자주 묻는 질문",
    relatedTools: "관련 도구",
    references: "참고문헌 및 데이터 소스",
    disclaimer: "petsMetrics에서 제공하는 정보는 교육 목적으로만 제공되며 수의학 조언을 구성하지 않습니다. 반려동물의 건강에 관한 결정에 대해서는 항상 면허가 있는 수의사와 상담하십시오. 반려동물이 의료 긴급 상황에 있는 경우 즉시 수의사 또는 가장 가까운 응급 동물 병원에 연락하십시오."
  },
  es: {
    lastUpdated: "Última actualización: {date}. Fuentes: {sources}",
    knowledgeCards: "Tarjetas de conocimiento",
    prevention: "Prevención",
    symptoms: "Síntomas",
    firstAid: "Primeros auxilios",
    emergencyLink: "Emergencia: esto puede ser potencialmente mortal",
    emergencyLinkDesc: "Si su mascota muestra síntomas graves, no espere. Comuníquese inmediatamente con su veterinario o el hospital de animales de emergencia más cercano.",
    goToEmergency: "Ir a la guía de emergencia",
    faqs: "Preguntas frecuentes",
    relatedTools: "Herramientas relacionadas",
    references: "Referencias y fuentes de datos",
    disclaimer: "La información proporcionada en petsMetrics es solo con fines educativos y no constituye asesoramiento veterinario. Siempre consulte a un veterinario con licencia para decisiones sobre la salud de su mascota. Si su mascota experimenta una emergencia médica, comuníquese inmediatamente con su veterinario o el hospital de animales de emergencia más cercano."
  },
  pt: {
    lastUpdated: "Última atualização: {date}. Fontes: {sources}",
    knowledgeCards: "Cartões de conhecimento",
    prevention: "Prevenção",
    symptoms: "Sintomas",
    firstAid: "Primeiros socorros",
    emergencyLink: "Emergência: isso pode ser fatal",
    emergencyLinkDesc: "Se o seu animal de estimação estiver apresentando sintomas graves, não espere. Entre em contato imediatamente com o seu veterinário ou o hospital de animais de emergência mais próximo.",
    goToEmergency: "Ir para o guia de emergência",
    faqs: "Perguntas frequentes",
    relatedTools: "Ferramentas relacionadas",
    references: "Referências e fontes de dados",
    disclaimer: "As informações fornecidas na petsMetrics são apenas para fins educacionais e não constituem aconselhamento veterinário. Sempre consulte um veterinário licenciado para decisões sobre a saúde do seu animal de estimação. Se o seu animal de estimação estiver passando por uma emergência médica, entre em contato imediatamente com o seu veterinário ou o hospital de animais de emergência mais próximo."
  },
  nl: {
    lastUpdated: "Laatst bijgewerkt: {date}. Bronnen: {sources}",
    knowledgeCards: "Kennis kaarten",
    prevention: "Preventie",
    symptoms: "Symptomen",
    firstAid: "Eerste hulp",
    emergencyLink: "Nood: dit kan levensbedreigend zijn",
    emergencyLinkDesc: "Als uw huisdier ernstige symptomen vertoont, wacht dan niet. Neem onmiddellijk contact op met uw dierenarts of het dierenziekenhuis voor spoedhulp.",
    goToEmergency: "Ga naar de noodgids",
    faqs: "Veelgestelde vragen",
    relatedTools: "Gerelateerde tools",
    references: "Referentie & databronnen",
    disclaimer: "De informatie verstrekt op petsMetrics is alleen voor educatieve doeleinden en vormt geen veterinair advies. Raadpleeg altijd een gelicentieerde dierenarts voor beslissingen over de gezondheid van uw huisdier. Als uw huisdier een medische noodtoestand heeft, neem dan onmiddellijk contact op met uw dierenarts of het dierenziekenhuis voor spoedhulp."
  },
  ar: {
    lastUpdated: "آخر تحديث: {date}. المصادر: {sources}",
    knowledgeCards: "بطاقات المعرفة",
    prevention: "الوقاية",
    symptoms: "الأعراض",
    firstAid: "الإسعافات الأولية",
    emergencyLink: "طوارئ: هذا قد يهدد الحياة",
    emergencyLinkDesc: "إذا كان حيوانك الأليف يظهر أعراضًا شديدة، فلا تنتظر. اتصل بطبيبك البيطري أو أقرب مستشفى حيوانات طارئ على الفور.",
    goToEmergency: "انتقل إلى دليل الطوارئ",
    faqs: "الأسئلة الشائعة",
    relatedTools: "الأدوات ذات الصلة",
    references: "المراجع ومصادر البيانات",
    disclaimer: "المعلومات المقدمة على petsMetrics هي للأغراض التعليمية فقط ولا تشكل نصيحة بيطرية. استشر دائمًا طبيبًا بيطريًا مرخصًا لاتخاذ قرارات تتعلق بصحة حيوانك الأليف. إذا كان حيوانك الأليف يعاني من حالة طبية طارئة، فاتصل بطبيبك البيطري أو أقرب مستشفى حيوانات طارئ على الفور."
  },
  ru: {
    lastUpdated: "Последнее обновление: {date}. Источники: {sources}",
    knowledgeCards: "Карточки знаний",
    prevention: "Профилактика",
    symptoms: "Симптомы",
    firstAid: "Первая помощь",
    emergencyLink: "Чрезвычайная ситуация: это может быть опасно для жизни",
    emergencyLinkDesc: "Если у вашего питомца проявляются серьезные симптомы, не ждите. Немедленно свяжитесь с вашим ветеринаром или ближайшей ветеринарной клиникой неотложной помощи.",
    goToEmergency: "Перейти к руководству по чрезвычайным ситуациям",
    faqs: "Часто задаваемые вопросы",
    relatedTools: "Связанные инструменты",
    references: "Ссылки и источники данных",
    disclaimer: "Информация, предоставленная на petsMetrics, предназначена только для образовательных целей и не является ветеринарной консультацией. Всегда консультируйтесь с лицензированным ветеринаром по вопросам здоровья вашего питомца. Если у вашего питомца возникла медицинская чрезвычайная ситуация, немедленно свяжитесь с вашим ветеринаром или ближайшей ветеринарной клиникой неотложной помощи."
  },
  hi: {
    lastUpdated: "अंतिम अपडेट: {date}। स्रोत: {sources}",
    knowledgeCards: "ज्ञान कार्ड",
    prevention: "रोकथाम",
    symptoms: "लक्षण",
    firstAid: "प्राथमिक चिकित्सा",
    emergencyLink: "आपातकाल: यह जानलेवा हो सकता है",
    emergencyLinkDesc: "यदि आपके पालतू जानवर को गंभीर लक्षण दिखाई दे रहे हैं, तो प्रतीक्षा न करें। तुरंत अपने पशु चिकित्सक या निकटतम आपातकालीन पशु अस्पताल से संपर्क करें।",
    goToEmergency: "आपातकालीन गाइड पर जाएं",
    faqs: "अक्सर पूछे जाने वाले प्रश्न",
    relatedTools: "संबंधित उपकरण",
    references: "संदर्भ और डेटा स्रोत",
    disclaimer: "petsMetrics पर प्रदान की गई जानकारी केवल शैक्षिक उद्देश्यों के लिए है और पशु चिकित्सा सलाह का गठन नहीं करती। अपने पालतू जानवर के स्वास्थ्य से संबंधित निर्णयों के लिए हमेशा एक लाइसेंस प्राप्त पशु चिकित्सक से परामर्श करें। यदि आपके पालतू जानवर को चिकित्सा आपातकालीन स्थिति है, तो तुरंत अपने पशु चिकित्सक या निकटतम आपातकालीन पशु अस्पताल से संपर्क करें।"
  }
};

// Function to add seasonal top-level keys to a language file
function addSeasonalKeys(langCode) {
  const filePath = path.join(messagesDir, `${langCode}.json`);
  
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(content);
  
  // Get the translation for this language (or use English as fallback)
  const seasonalData = translations[langCode] || enSeasonalKeys;
  
  // Add top-level keys to the seasonal namespace
  // We need to add them at the beginning of the seasonal object
  if (data.seasonal) {
    // Create a new seasonal object with the top-level keys first
    const newSeasonal = { ...seasonalData };
    
    // Copy all existing keys from the old seasonal object
    for (const key of Object.keys(data.seasonal)) {
      newSeasonal[key] = data.seasonal[key];
    }
    
    data.seasonal = newSeasonal;
  }
  
  // Write back to file
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`Updated ${langCode}.json with seasonal top-level keys`);
}

// Process all languages
const languages = ['en', 'zh', 'fr', 'de', 'ja', 'ko', 'es', 'pt', 'nl', 'ar', 'ru', 'hi'];

console.log('Adding seasonal top-level keys to all language files...');
languages.forEach(lang => addSeasonalKeys(lang));
console.log('Done!');
