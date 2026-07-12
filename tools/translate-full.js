/**
 * i18n Full Namespace Translator
 * 
 * Translates entire namespaces (compare, emergency, catEmergency) for a given language.
 * Reads en.json as source, translates all strings, writes updated target JSON.
 * 
 * Usage: node tools/translate-full.js <lang-code>
 * 
 * This script handles all the heavy lifting of translating the compare,
 * emergency, and catEmergency namespaces.
 */

const fs = require('fs');
const path = require('path');

function readJson(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8').replace(/^\uFEFF/, '');
  return JSON.parse(raw);
}

// ================================================================
// TRANSLATION MAPS - Add translations for each language here
// ================================================================

// French translations for compare namespace
const frCompare = {
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
  'Breed matters. Golden Retrievers, German Shepherds, and Boxers have different cancer risks, life expectancies, and dietary needs. Always consult your vet for breed-specific decisions.': 'La race compte. Les Golden Retrievers, Bergers Allemands et Boxers ont des risques de cancer, espérances de vie et besoins alimentaires différents. Consultez toujours votre vétérinaire.',
  'Raw diets carry bacterial risks (Salmonella, Campylobacter). Always consult a veterinary nutritionist before switching to raw.': 'Les régimes crus présentent des risques bactériens (Salmonella, Campylobacter). Consultez toujours un nutritionniste vétérinaire avant de passer au cru.',
  'Breed matters.': 'La race compte.',
};

// German translations for compare namespace
const deCompare = {
  'Quick Comparison Table': 'Schnellvergleichstabelle',
  'At a glance — {topicA} vs {topicB}:': 'Auf einen Blick — {topicA} vs {topicB}:',
  'Deep Dive: {topicName}': 'Tiefer Einblick: {topicName}',
  'Considerations': 'Überlegungen',
  'Significant Concerns': 'Wesentliche Bedenken',
  'Risks': 'Risiken',
  'Limitations': 'Einschränkungen',
  'Trade-offs & Increased Risks': 'Kompromisse & Erhöhte Risiken',
  'Best for:': 'Am besten für:',
  'The Verdict': 'Das Urteil',
  'Frequently Asked Questions': 'Häufig Gestellte Fragen',
  'References & Data Sources': 'Referenzen & Datenquellen',
  'Last updated: {date} · Data verified against {sources}.': 'Letzte Aktualisierung: {date} · Daten geprüft anhand von {sources}.',
  'Dimension': 'Dimension',
  'Breed matters. Golden Retrievers, German Shepherds, and Boxers have different cancer risks, life expectancies, and dietary needs. Always consult your vet for breed-specific decisions.': 'Die Rasse ist wichtig. Golden Retriever, Deutsche Schäferhunde und Boxer haben unterschiedliche Krebsrisiken, Lebenserwartungen und Ernährungsbedürfnisse. Konsultieren Sie immer Ihren Tierarzt.',
  'Raw diets carry bacterial risks (Salmonella, Campylobacter). Always consult a veterinary nutritionist before switching to raw.': 'Rohfutter birgt bakterielle Risiken (Salmonellen, Campylobacter). Konsultieren Sie immer einen tierärztlichen Ernährungsberater, bevor Sie auf Rohfutter umstellen.',
  'Breed matters.': 'Die Rasse ist wichtig.',
};

// Spanish translations for compare namespace
const esCompare = {
  'Quick Comparison Table': 'Tabla Comparativa Rápida',
  'At a glance — {topicA} vs {topicB}:': 'De un vistazo — {topicA} vs {topicB}:',
  'Deep Dive: {topicName}': 'Análisis en Profundidad: {topicName}',
  'Considerations': 'Consideraciones',
  'Significant Concerns': 'Preocupaciones Significativas',
  'Risks': 'Riesgos',
  'Limitations': 'Limitaciones',
  'Trade-offs & Increased Risks': 'Compensaciones y Riesgos Aumentados',
  'Best for:': 'Ideal para:',
  'The Verdict': 'El Veredicto',
  'Frequently Asked Questions': 'Preguntas Frecuentes',
  'References & Data Sources': 'Referencias y Fuentes de Datos',
  'Last updated: {date} · Data verified against {sources}.': 'Última actualización: {date} · Datos verificados con {sources}.',
  'Dimension': 'Dimensión',
  'Breed matters. Golden Retrievers, German Shepherds, and Boxers have different cancer risks, life expectancies, and dietary needs. Always consult your vet for breed-specific decisions.': 'La raza importa. Los Golden Retrievers, Pastores Alemanes y Bóxers tienen diferentes riesgos de cáncer, esperanzas de vida y necesidades dietéticas. Consulte siempre a su veterinario.',
  'Raw diets carry bacterial risks (Salmonella, Campylobacter). Always consult a veterinary nutritionist before switching to raw.': 'Las dietas crudas conllevan riesgos bacterianos (Salmonella, Campylobacter). Consulte siempre a un nutricionista veterinario antes de cambiar a crudo.',
  'Breed matters.': 'La raza importa.',
};

// Portuguese translations
const ptCompare = {
  'Quick Comparison Table': 'Tabela Comparativa Rápida',
  'At a glance — {topicA} vs {topicB}:': 'Resumo — {topicA} vs {topicB}:',
  'Deep Dive: {topicName}': 'Análise Detalhada: {topicName}',
  'Considerations': 'Considerações',
  'Significant Concerns': 'Preocupações Significativas',
  'Risks': 'Riscos',
  'Limitations': 'Limitações',
  'Trade-offs & Increased Risks': 'Compensações e Riscos Aumentados',
  'Best for:': 'Ideal para:',
  'The Verdict': 'O Veredito',
  'Frequently Asked Questions': 'Perguntas Frequentes',
  'References & Data Sources': 'Referências e Fontes de Dados',
  'Last updated: {date} · Data verified against {sources}.': 'Última atualização: {date} · Dados verificados com {sources}.',
  'Dimension': 'Dimensão',
  'Breed matters. Golden Retrievers, German Shepherds, and Boxers have different cancer risks, life expectancies, and dietary needs. Always consult your vet for breed-specific decisions.': 'A raça importa. Golden Retrievers, Pastores Alemães e Boxers têm diferentes riscos de câncer, expectativas de vida e necessidades dietéticas. Consulte sempre seu veterinário.',
  'Raw diets carry bacterial risks (Salmonella, Campylobacter). Always consult a veterinary nutritionist before switching to raw.': 'Dietas cruas apresentam riscos bacterianos (Salmonella, Campylobacter). Consulte sempre um nutricionista veterinário antes de mudar para cru.',
  'Breed matters.': 'A raça importa.',
};

// Dutch translations
const nlCompare = {
  'Quick Comparison Table': 'Snelle Vergelijkingstabel',
  'At a glance — {topicA} vs {topicB}:': 'In één oogopslag — {topicA} vs {topicB}:',
  'Deep Dive: {topicName}': 'Diepgaande Analyse: {topicName}',
  'Considerations': 'Overwegingen',
  'Significant Concerns': 'Belangrijke Zorgen',
  'Risks': 'Risico\'s',
  'Limitations': 'Beperkingen',
  'Trade-offs & Increased Risks': 'Afwegingen en Verhoogde Risico\'s',
  'Best for:': 'Het beste voor:',
  'The Verdict': 'Het Oordeel',
  'Frequently Asked Questions': 'Veelgestelde Vragen',
  'References & Data Sources': 'Referenties en Gegevensbronnen',
  'Last updated: {date} · Data verified against {sources}.': 'Laatst bijgewerkt: {date} · Gegevens geverifieerd tegen {sources}.',
  'Dimension': 'Dimensie',
  'Breed matters. Golden Retrievers, German Shepherds, and Boxers have different cancer risks, life expectancies, and dietary needs. Always consult your vet for breed-specific decisions.': 'Het ras is belangrijk. Golden Retrievers, Duitse Herders en Boxers hebben verschillende kankerrisico\'s, levensverwachtingen en voedingsbehoeften. Raadpleeg altijd uw dierenarts.',
  'Raw diets carry bacterial risks (Salmonella, Campylobacter). Always consult a veterinary nutritionist before switching to raw.': 'Rauwvoer brengt bacteriële risico\'s met zich mee (Salmonella, Campylobacter). Raadpleeg altijd een veterinaire voedingsdeskundige voordat u overstapt op rauw.',
  'Breed matters.': 'Het ras is belangrijk.',
};

// Arabic translations
const arCompare = {
  'Quick Comparison Table': 'جدول مقارنة سريع',
  'At a glance — {topicA} vs {topicB}:': 'نظرة عامة — {topicA} مقابل {topicB}:',
  'Deep Dive: {topicName}': 'تحليل معمق: {topicName}',
  'Considerations': 'اعتبارات',
  'Significant Concerns': 'مخاوف كبيرة',
  'Risks': 'المخاطر',
  'Limitations': 'القيود',
  'Trade-offs & Increased Risks': 'المقايضات والمخاطر المتزايدة',
  'Best for:': 'الأنسب لـ:',
  'The Verdict': 'الحكم',
  'Frequently Asked Questions': 'الأسئلة الشائعة',
  'References & Data Sources': 'المراجع ومصادر البيانات',
  'Last updated: {date} · Data verified against {sources}.': 'آخر تحديث: {date} · تم التحقق من البيانات مقابل {sources}.',
  'Dimension': 'البعد',
  'Breed matters. Golden Retrievers, German Shepherds, and Boxers have different cancer risks, life expectancies, and dietary needs. Always consult your vet for breed-specific decisions.': 'السلالة مهمة. لدى Golden Retrievers وGerman Shepherds وBoxers مخاطر سرطان مختلفة وتوقعات حياة واحتياجات غذائية مختلفة. استشر طبيبك البيطري دائماً.',
  'Raw diets carry bacterial risks (Salmonella, Campylobacter). Always consult a veterinary nutritionist before switching to raw.': 'تحمل الأنظمة الغذائية النيئة مخاطر بكتيرية (السالمونيلا، Campylobacter). استشر أخصائي تغذية بيطري دائماً قبل التحول إلى النيء.',
  'Breed matters.': 'السلالة مهمة.',
};

// Russian translations
const ruCompare = {
  'Quick Comparison Table': 'Быстрая Сравнительная Таблица',
  'At a glance — {topicA} vs {topicB}:': 'Сразу — {topicA} против {topicB}:',
  'Deep Dive: {topicName}': 'Глубокий Анализ: {topicName}',
  'Considerations': 'Соображения',
  'Significant Concerns': 'Серьёзные Опасения',
  'Risks': 'Риски',
  'Limitations': 'Ограничения',
  'Trade-offs & Increased Risks': 'Компромиссы и Повышенные Риски',
  'Best for:': 'Лучше всего для:',
  'The Verdict': 'Вердикт',
  'Frequently Asked Questions': 'Часто Задаваемые Вопросы',
  'References & Data Sources': 'Ссылки и Источники Данных',
  'Last updated: {date} · Data verified against {sources}.': 'Последнее обновление: {date} · Данные проверены по {sources}.',
  'Dimension': 'Измерение',
  'Breed matters. Golden Retrievers, German Shepherds, and Boxers have different cancer risks, life expectancies, and dietary needs. Always consult your vet for breed-specific decisions.': 'Порода имеет значение. Золотистые ретриверы, немецкие овчарки и боксёры имеют разные риски рака, продолжительность жизни и диетические потребности. Всегда консультируйтесь с ветеринаром.',
  'Raw diets carry bacterial risks (Salmonella, Campylobacter). Always consult a veterinary nutritionist before switching to raw.': 'Сырые диеты несут бактериальные риски (сальмонелла, Campylobacter). Всегда консультируйтесь с ветеринарным диетологом перед переходом на сырое.',
  'Breed matters.': 'Порода имеет значение.',
};

// Hindi translations
const hiCompare = {
  'Quick Comparison Table': 'त्वरित तुलना तालिका',
  'At a glance — {topicA} vs {topicB}:': 'एक नज़र में — {topicA} बनाम {topicB}:',
  'Deep Dive: {topicName}': 'गहन विश्लेषण: {topicName}',
  'Considerations': 'विचारणीय बातें',
  'Significant Concerns': 'महत्वपूर्ण चिंताएं',
  'Risks': 'जोखिम',
  'Limitations': 'सीमाएं',
  'Trade-offs & Increased Risks': 'समझौते और बढ़े हुए जोखिम',
  'Best for:': 'के लिए सर्वश्रेष्ठ:',
  'The Verdict': 'निर्णय',
  'Frequently Asked Questions': 'अक्सर पूछे जाने वाले प्रश्न',
  'References & Data Sources': 'संदर्भ और डेटा स्रोत',
  'Last updated: {date} · Data verified against {sources}.': 'अंतिम अपडेट: {date} · {sources} के विरुद्ध डेटा सत्यापित।',
  'Dimension': 'आयाम',
  'Breed matters. Golden Retrievers, German Shepherds, and Boxers have different cancer risks, life expectancies, and dietary needs. Always consult your vet for breed-specific decisions.': 'नस्ल मायने रखती है। गोल्डन रिट्रीवर्स, जर्मन शेफर्ड और बॉक्सर्स में अलग-अलग कैंसर जोखिम, जीवन प्रत्याशा और आहार संबंधी ज़रूरतें होती हैं। नस्ल-विशिष्ट निर्णयों के लिए हमेशा अपने पशु चिकित्सक से परामर्श करें।',
  'Raw diets carry bacterial risks (Salmonella, Campylobacter). Always consult a veterinary nutritionist before switching to raw.': 'कच्चे आहार में जीवाणु जोखिम (साल्मोनेला, Campylobacter) होते हैं। कच्चे आहार पर स्विच करने से पहले हमेशा पशु चिकित्सा पोषण विशेषज्ञ से परामर्श करें।',
  'Breed matters.': 'नस्ल मायने रखती है।',
};

// Japanese translations
const jaCompare = {
  'Quick Comparison Table': 'クイック比較表',
  'At a glance — {topicA} vs {topicB}:': '一目でわかる — {topicA} vs {topicB}:',
  'Deep Dive: {topicName}': '詳細分析: {topicName}',
  'Considerations': '考慮事項',
  'Significant Concerns': '重要な懸念',
  'Risks': 'リスク',
  'Limitations': '制限事項',
  'Trade-offs & Increased Risks': 'トレードオフと増加するリスク',
  'Best for:': '最適:',
  'The Verdict': '評決',
  'Frequently Asked Questions': 'よくある質問',
  'References & Data Sources': '参考文献とデータソース',
  'Last updated: {date} · Data verified against {sources}.': '最終更新: {date} · {sources}に照らしてデータ検証済み。',
  'Dimension': '次元',
  'Breed matters. Golden Retrievers, German Shepherds, and Boxers have different cancer risks, life expectancies, and dietary needs. Always consult your vet for breed-specific decisions.': '犬種は重要です。ゴールデンレトリバー、ジャーマンシェパード、ボクサーでは、がんリスク、平均寿命、食事の必要性が異なります。犬種特有の判断については、必ず獣医師に相談してください。',
  'Raw diets carry bacterial risks (Salmonella, Campylobacter). Always consult a veterinary nutritionist before switching to raw.': '生食は細菌リスク（サルモネラ、カンピロバクター）を伴います。生食に切り替える前に、必ず獣医栄養士に相談してください。',
  'Breed matters.': '犬種は重要です。',
};

// Korean translations
const koCompare = {
  'Quick Comparison Table': '빠른 비교 표',
  'At a glance — {topicA} vs {topicB}:': '한눈에 보기 — {topicA} vs {topicB}:',
  'Deep Dive: {topicName}': '심층 분석: {topicName}',
  'Considerations': '고려 사항',
  'Significant Concerns': '중요한 우려 사항',
  'Risks': '위험',
  'Limitations': '제한 사항',
  'Trade-offs & Increased Risks': '트레이드오프 및 증가된 위험',
  'Best for:': '최적 대상:',
  'The Verdict': '평결',
  'Frequently Asked Questions': '자주 묻는 질문',
  'References & Data Sources': '참고 문헌 및 데이터 출처',
  'Last updated: {date} · Data verified against {sources}.': '마지막 업데이트: {date} · {sources} 기준 데이터 검증 완료.',
  'Dimension': '차원',
  'Breed matters. Golden Retrievers, German Shepherds, and Boxers have different cancer risks, life expectancies, and dietary needs. Always consult your vet for breed-specific decisions.': '견종이 중요합니다. 골든 리트리버, 저먼 셰퍼드, 복서는 암 위험, 기대 수명, 식이 요구 사항이 다릅니다. 견종별 결정은 항상 수의사와 상담하세요.',
  'Raw diets carry bacterial risks (Salmonella, Campylobacter). Always consult a veterinary nutritionist before switching to raw.': '생식은 세균 위험(살모넬라, 캄필로박터)을 수반합니다. 생식으로 전환하기 전에 항상 수의 영양사와 상담하세요.',
  'Breed matters.': '견종이 중요합니다.',
};

// Chinese translations
const zhCompare = {
  'Quick Comparison Table': '快速对比表',
  'At a glance — {topicA} vs {topicB}:': '一览 — {topicA} vs {topicB}：',
  'Deep Dive: {topicName}': '深入分析：{topicName}',
  'Considerations': '考虑因素',
  'Significant Concerns': '重要关注点',
  'Risks': '风险',
  'Limitations': '局限性',
  'Trade-offs & Increased Risks': '权衡与增加的风险',
  'Best for:': '最适合：',
  'The Verdict': '结论',
  'Frequently Asked Questions': '常见问题',
  'References & Data Sources': '参考文献与数据来源',
  'Last updated: {date} · Data verified against {sources}.': '最后更新：{date} · 数据已根据 {sources} 验证。',
  'Dimension': '维度',
  'Breed matters. Golden Retrievers, German Shepherds, and Boxers have different cancer risks, life expectancies, and dietary needs. Always consult your vet for breed-specific decisions.': '品种很重要。金毛寻回犬、德国牧羊犬和拳师犬的癌症风险、预期寿命和饮食需求各不相同。请务必咨询您的兽医以做出针对品种的决定。',
  'Raw diets carry bacterial risks (Salmonella, Campylobacter). Always consult a veterinary nutritionist before switching to raw.': '生食存在细菌风险（沙门氏菌、弯曲杆菌）。在改用生食之前，请务必咨询兽医营养师。',
  'Breed matters.': '品种很重要。',
};

// ================================================================
// Emergency namespace translations
// ================================================================

const frEmergency = {
  'What to Do Right Now': 'Que Faire Maintenant',
  'The Science Behind It': 'La Science Derrière',
  'Assess the Risk': 'Évaluer le Risque',
  'Timeline & What to Expect': 'Chronologie et À Quoi S\'Attendre',
  'Related Tools': 'Outils Connexes',
  'Vet Decision Helper': 'Aide à la Décision Vétérinaire',
  'Emergency Contacts': 'Contacts d\'Urgence',
  'What the Vet Will Do': 'Ce Que le Vétérinaire Fera',
  'Home Monitoring Guide': 'Guide de Surveillance à Domicile',
  'Mild Risk': 'Risque Faible',
  'Moderate Risk': 'Risque Modéré',
  'High Risk': 'Risque Élevé',
  'Emergency': 'Urgence',
  'Monitor at Home': 'Surveiller à Domicile',
  'Call Your Vet': 'Appelez Votre Vétérinaire',
  'Emergency Vet NOW': 'Vétérinaire d\'Urgence MAINTENANT',
  'Immediate': 'Immédiat',
  'Within 1-2 hours': 'Dans les 1-2 heures',
  'Within 24 hours': 'Dans les 24 heures',
  'Dangerous': 'Dangereux',
  'Toxic': 'Toxique',
  'Extremely Toxic': 'Extrêmement Toxique',
  'Mildly Toxic': 'Légèrement Toxique',
  'Monitor': 'Surveiller',
  'What to Watch For': 'Ce Qu\'il Faut Surveiller',
  'When to Call the Vet': 'Quand Appeler le Vétérinaire',
  'Prevention Tips': 'Conseils de Prévention',
  'Key Takeaways': 'Points Clés à Retenir',
  'Was this helpful?': 'Cela vous a-t-il été utile ?',
  'Share this page': 'Partager cette page',
  'Last reviewed:': 'Dernière révision :',
  'Medical review by veterinary professionals.': 'Révision médicale par des professionnels vétérinaires.',
  'Step': 'Étape',
  'Hour': 'Heure',
  'Day': 'Jour',
  'Risk Level': 'Niveau de Risque',
  'Action Required': 'Action Requise',
  'Amount Eaten': 'Quantité Ingérée',
  'Chocolate Type': 'Type de Chocolat',
  'Onion Form': 'Forme d\'Oignon',
  'Garlic Form': 'Forme d\'Ail',
  'Oil Type': 'Type d\'Huile',
  'Exposure Route': 'Voie d\'Exposition',
  'Baking chocolate': 'Chocolat de pâtisserie',
  'Dark chocolate': 'Chocolat noir',
  'Milk chocolate': 'Chocolat au lait',
  'White chocolate': 'Chocolat blanc',
  'Raw onion': 'Oignon cru',
  'Cooked onion': 'Oignon cuit',
  'Onion powder': 'Poudre d\'oignon',
  'Raw garlic': 'Ail cru',
  'Cooked garlic': 'Ail cuit',
  'Garlic powder': 'Poudre d\'ail',
  'Tea tree oil': 'Huile d\'arbre à thé',
  'Eucalyptus oil': 'Huile d\'eucalyptus',
  'Peppermint oil': 'Huile de menthe poivrée',
  'Citrus oil': 'Huile d\'agrumes',
  'Ingestion': 'Ingestion',
  'Skin contact': 'Contact cutané',
  'Inhalation': 'Inhalation',
  'Entire pit swallowed': 'Noyau entier avalé',
  'Flesh only (large amount)': 'Chair seulement (grande quantité)',
  'Flesh only (small amount)': 'Chair seulement (petite quantité)',
  'Any size': 'Toute taille',
  'HIGH': 'ÉLEVÉ',
  'Moderate': 'Modéré',
  'Low': 'Faible',
  '🚨 Emergency vet NOW — obstruction risk': '🚨 Vétérinaire d\'urgence MAINTENANT — risque d\'obstruction',
  '📞 Call vet — pancreatitis/persin risk': '📞 Appelez le vétérinaire — risque de pancréatite/persine',
  '✅ Monitor — mild GI upset possible': '✅ Surveiller — légers troubles gastro-intestinaux possibles',
  'color': 'couleur',
  'yellow': 'jaune',
  'orange': 'orange',
  'red': 'rouge',
  'green': 'vert',
  'gray': 'gris',
  'blue': 'bleu',
  'Below threshold': 'En dessous du seuil',
  'At threshold': 'Au seuil',
  'Above threshold': 'Au-dessus du seuil',
  'Far above threshold': 'Bien au-dessus du seuil',
  '< 20 lbs': '< 9 kg',
  '> 20 lbs': '> 9 kg',
  '> 5g': '> 5 g',
  '> 10g': '> 10 g',
  '> 20g': '> 20 g',
  'ASPCA Poison Control: (888) 426-4435': 'Centre Antipoison ASPCA : (888) 426-4435',
  'Pet Poison Helpline: (855) 764-7661': 'Ligne d\'Assistance Antipoison pour Animaux : (855) 764-7661',
  'ASPCA Animal Poison Control': 'Centre Antipoison Animal ASPCA',
  'https://www.aspca.org/pet-care/animal-poison-control': 'https://www.aspca.org/pet-care/animal-poison-control',
  'https://www.petpoisonhelpline.com': 'https://www.petpoisonhelpline.com',
  'Call ASPCA Poison Control': 'Appeler le Centre Antipoison ASPCA',
  'Call Pet Poison Helpline': 'Appeler la Ligne Antipoison pour Animaux',
  'Find Emergency Vet Near Me': 'Trouver un Vétérinaire d\'Urgence Près de Chez Moi',
  '/shared/toxic-checker/': '/shared/toxic-checker/',
  '/dog/calorie-calculator/': '/dog/calorie-calculator/',
  '/dog/vaccination-schedule/': '/dog/vaccination-schedule/',
  '/dog/bcs-weight-tracker/': '/dog/bcs-weight-tracker/',
  '/cat/bcs-weight-tracker/': '/cat/bcs-weight-tracker/',
  'Toxic Checker': 'Vérificateur de Toxicité',
  'Calorie Calculator': 'Calculateur de Calories',
  'Vaccination Schedule': 'Calendrier de Vaccination',
  'BCS Weight Tracker': 'Suivi de Poids BCS',
  'Puppy Growth Predictor': 'Prédicteur de Croissance du Chiot',
  '/dog/puppy-growth-predictor/': '/dog/puppy-growth-predictor/',
};

// ================================================================
// Deep translation function
// ================================================================

function getTranslationMap(lang, namespace) {
  const maps = {
    'fr': { compare: frCompare, emergency: frEmergency },
    'de': { compare: deCompare },
    'es': { compare: esCompare },
    'pt': { compare: ptCompare },
    'nl': { compare: nlCompare },
    'ar': { compare: arCompare },
    'ru': { compare: ruCompare },
    'hi': { compare: hiCompare },
    'ja': { compare: jaCompare },
    'ko': { compare: koCompare },
    'zh': { compare: zhCompare },
  };
  return (maps[lang] && maps[lang][namespace]) || {};
}

function deepTranslate(obj, lang, namespace) {
  const map = getTranslationMap(lang, namespace);
  
  if (typeof obj === 'string') {
    return map[obj] !== undefined ? map[obj] : obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(item => deepTranslate(item, lang, namespace));
  }
  if (typeof obj === 'object' && obj !== null) {
    const result = {};
    for (const [k, v] of Object.entries(obj)) {
      result[k] = deepTranslate(v, lang, namespace);
    }
    return result;
  }
  return obj;
}

// ================================================================
// Main
// ================================================================

const lang = process.argv[2];
const namespace = process.argv[3] || 'all';

if (!lang) {
  console.error('Usage: node tools/translate-full.js <lang-code> [namespace]');
  console.error('  namespace: compare, emergency, catEmergency, or all (default)');
  process.exit(1);
}

const en = readJson('messages/en.json');
const target = readJson(path.join('messages', lang + '.json'));

let count = 0;

function countTranslations(map) {
  return Object.keys(map).length;
}

if (namespace === 'all' || namespace === 'compare') {
  const map = getTranslationMap(lang, 'compare');
  if (Object.keys(map).length > 0) {
    target.compare = deepTranslate(en.compare, lang, 'compare');
    count += Object.keys(map).length;
    console.log(`Translated compare namespace (${Object.keys(map).length} entries)`);
  }
}

if (namespace === 'all' || namespace === 'emergency') {
  const map = getTranslationMap(lang, 'emergency');
  if (Object.keys(map).length > 0) {
    target.emergency = deepTranslate(en.emergency, lang, 'emergency');
    count += Object.keys(map).length;
    console.log(`Translated emergency namespace (${Object.keys(map).length} entries)`);
  }
}

if (namespace === 'all' || namespace === 'catEmergency') {
  const map = getTranslationMap(lang, 'catEmergency');
  if (Object.keys(map).length > 0) {
    target.catEmergency = deepTranslate(en.catEmergency, lang, 'catEmergency');
    count += Object.keys(map).length;
    console.log(`Translated catEmergency namespace (${Object.keys(map).length} entries)`);
  }
}

fs.writeFileSync(path.join('messages', lang + '.json'), JSON.stringify(target, null, 2) + '\n');
console.log(`\nTotal translation entries: ${count}`);
console.log(`Updated: messages/${lang}.json`);