/**
 * i18n 批量翻译添加脚本
 * 为缺失的语言文件添加 faqHub 和 seasonal 部分
 */

const fs = require('fs');
const path = require('path');

const MESSAGES_DIR = path.join(__dirname, '..', 'messages');

// 以 en.json 为基准提取 faqHub 和 seasonal
function readJsonFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  // 移除 BOM (Byte Order Mark)
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return JSON.parse(content);
}

const enJson = readJsonFile(path.join(MESSAGES_DIR, 'en.json'));
const enFaqHub = enJson.faqHub;
const enSeasonal = enJson.seasonal;

// 目标语言列表（排除 en 和 zh，它们已完成）
const targetLocales = ['fr', 'de', 'ja', 'ko', 'es', 'pt', 'nl', 'ar', 'ru', 'hi'];

// 翻译映射表
const translations = {
  fr: {
    faqHub: {
      breadcrumb: {
        home: "Accueil",
        dog: "HubChien",
        cat: "HubChat",
        faq: "FAQs",
        nutrition: "Nutrition",
        health: "Santé",
        aging: "Vieillissement Longevité"
      },
      lastUpdated: "Dernière mise à jour : {date} · Données vérifiées auprès de {sources}.",
      overview: "{count} réponses d'experts organisées par thème.",
      overviewDetail: "Chaque réponse est sourcée à partir de nos outils vérifiés et de notre contenu basé sur la recherche. Cliquez sur n'importe quelle question pour l'agrandir.",
      toc: "Table des matières",
      questions: "questions",
      goToTool: "Ouvrir {tool}",
      source: "Réponse dans",
      relatedTools: "Outils connexes",
      references: "Références et sources de données",
      whyTrust: "Pourquoi faire confiance à nos réponses ?",
      trustContent1: "petsMetrics suit les directives de l'AAHA (American Animal Hospital Association), de l'AAFCO, de la WSAVA et de l'AAFP pour tout le contenu sur la nutrition, la santé et le vieillissement. Chaque réponse est vérifiée par rapport à la recherche vétérinaire actuelle et mise à jour trimestriellement pour refléter les dernières preuves. Nos formules et recommandations sont basées sur des études évaluées par des pairs — jamais sur des témoignages anecdotiques ou des allégations marketing.",
      trustContent2: "Nous sommes transparents sur nos limites : chaque FAQ indique clairement quand une variation individuelle s'applique, quand une consultation vétérinaire est nécessaire et quelle est la force des preuves. Si les preuves sont incertaines, nous le disons. Cet engagement envers la transparence fondée sur des preuves est ce qui différencie petsMetrics des blogs généraux sur les animaux de compagnie.",
      disclaimer: "Ces FAQ fournissent uniquement des informations éducatives générales et ne constituent pas un conseil vétérinaire. Les animaux individuels peuvent avoir des besoins de santé uniques qui diffèrent des directives générales. Consultez toujours un vétérinaire agréé pour les décisions concernant la santé, la nutrition ou le traitement médical spécifique de votre animal. En cas d'urgence, contactez immédiatement votre clinique vétérinaire la plus proche."
    },
    seasonal: {
      breadcrumb: {
        home: "Accueil",
        dog: "HubChien",
        season: "DangersSaisonniers",
        summerHeat: "SécuritéChaleurÉté",
        winterPawCare: "SoinsPattesHiver",
        christmasFoods: "AlimentsNoël",
        halloweenCandy: "BonbonsHalloween",
        fireworksAnxiety: "AnxiétéFeuxArtifice",
        springAllergies: "AllergiesPrintemps",
        thanksgiving: "AlimentsActionGrâces",
        easterChocolate: "ChocolatPâques"
      },
      lastUpdated: "Dernière mise à jour : {date} · Données vérifiées auprès de {sources}.",
      knowledgeCards: "Connaissances clés",
      prevention: "Liste de vérification de prévention",
      symptoms: "Signes d'avertissement",
      firstAid: "Étapes de premiers secours d'urgence",
      faqs: "Questions fréquemment posées",
      relatedTools: "Outils et ressources connexes",
      references: "Références et citations",
      emergencyLink: "Traitement d'urgence disponible",
      emergencyLinkDesc: "Si votre chien traverse actuellement une urgence médicale, consultez immédiatement un vétérinaire ou contactez le centre antipoison.",
      goToEmergency: "Aller au guide d'urgence →",
      disclaimer: "Ce guide saisonnier fournit uniquement des informations de sécurité générales et ne constitue pas un conseil vétérinaire. En cas d'urgence médicale, contactez immédiatement votre clinique vétérinaire la plus proche ou le centre antipoison animal de l'ASPCA au (888) 426-4435. Ne retardez pas le traitement sur la base des informations lues ici."
    }
  },
  de: {
    faqHub: {
      breadcrumb: {
        home: "Startseite",
        dog: "HubHund",
        cat: "HubKatze",
        faq: "FAQs",
        nutrition: "Ernährung",
        health: "Gesundheit",
        aging: "Alterung Langlebigkeit"
      },
      lastUpdated: "Letzte Aktualisierung: {date} · Daten verifiziert mit {sources}.",
      overview: "{count} Expertenantworten, nach Themen sortiert.",
      overviewDetail: "Jede Antwort stammt aus unseren verifizierten Tools und recherchierten Inhalten. Klicken Sie auf eine Frage, um sie zu erweitern.",
      toc: "Inhaltsverzeichnis",
      questions: "Fragen",
      goToTool: "{tool} öffnen",
      source: "Beantwortet in",
      relatedTools: "Verwandte Werkzeuge",
      references: "Referenzen und Datenquellen",
      whyTrust: "Warum unseren Antworten vertrauen?",
      trustContent1: "petsMetrics folgt den Richtlinien der AAHA (American Animal Hospital Association), AAFCO, WSAVA und AAAF für alle Inhalte zu Ernährung, Gesundheit und Alterung. Jede Antwort wird mit aktueller tierärztlicher Forschung abgeglichen und vierteljährlich aktualisiert, um den neuesten Erkenntnissen Rechnung zu tragen. Unsere Formeln und Empfehlungen basieren auf begutachteten Studien — niemals auf Anekdoten oder Marketingbehauptungen.",
      trustContent2: "Wir sind transparent über unsere Grenzen: Jede FAQ gibt klar an, ob individuelle Abweichungen gelten, wärztliche Konsultation nötig ist und wie stark die Beweislage ist. Wenn die Beweise unsicher sind, sagen wir das. Dieses Engagement für evidenzbasierte Transparenz unterscheidet petsMetrics von allgemeinen Tierblogs.",
      disclaimer: "Diese FAQs bieten nur allgemeine Bildungsinformationen und stellen keine tierärztliche Beratung dar. Einzelne Tiere können einzigartige Gesundheitsbedürfnisse haben, die von allgemeinen Richtlinien abweichen. Konsultieren Sie immer einen zugelassenen Tierarzt für Entscheidungen bezüglich der spezifischen Gesundheit, Ernährung oder medizinischen Behandlung Ihres Tieres. Notfälle: Kontaktieren Sie umgehend Ihre nächste Tierklinik."
    },
    seasonal: {
      breadcrumb: {
        home: "Startseite",
        dog: "HubHund",
        seasonal: "GahrenSaison",
        summerHeat: "HitzeSommerSicherheit",
        winterPawCare: "WinterPflegePfoten",
        christmasFoods: "WeihnachtenLebensmittel",
        halloweenCandy: "HalloweenSüßigkeiten",
        fireworksAnxiety: "FeuerwerksAngst",
        springAllergies: "FrühlingAllergien",
        thanksgiving: "ErntedankLebensmittel",
        easterChocolate: "OsternSchokolade"
      },
      lastUpdated: "Letzte Aktualisierung: {date} · Daten verifiziert mit {sources}.",
      knowledgeCards: "Wichtiges Wissen",
      prevention: "Prüfliste zur Prävention",
      symptoms: "Warnsignale",
      firstAid: "Notfall-Erste-Hilfe-Schritte",
      faqs: "Häufig gestellte Fragen",
      relatedTools: "Verwandte Werkzeuge und Ressourcen",
      references: "Referenzen und Zitate",
      emergencyLink: "Notfallbehandlung verfügbar",
      emergencyLinkDesc: "Wenn Ihr Hund derzeit einen medizinischen Notfall erlebt, suchen Sie umgehend tierärztliche Hilfe oder kontaktieren Sie die Giftzentrale.",
      goToEmergency: "Zum Notführer →",
      disclaimer: "Dieser Saisonführer bietet nur allgemeine Sicherheitsinformationen und stellt keine tierärztliche Beratung dar. In jedem medizinischen Notfall kontaktieren Sie umgehend Ihre nächste Tierklinik oder die ASPCA Tier-Giftzentrale unter (888) 426-4435. Verzögern Sie die Behandlung nicht aufgrund hier gelesener Informationen."
    }
  },
  ja: {
    faqHub: {
      breadcrumb: {
        home: "ホーム",
        dog: "犬ハブ",
        cat: "猫ハブ",
        faq: "よくある質問",
        nutrition: "栄養",
        health: "健康",
        aging: "長寿と加齢"
      },
      lastUpdated: "最終更新日：{date} · {sources}でデータ検証済み。",
      overview: "{count}件の専門家回答をトピック別に整理。",
      overviewDetail: "各回答は検証済みツールと研究ベースのコンテンツから引用しています。質問をクリックして展開できます。",
      toc: "目次",
      questions: "質問",
      goToTool: "{tool}を開く",
      source: "回答元",
      relatedTools: "関連ツール",
      references: "参考文献およびデータソース",
      whyTrust: "当サイトの回答を信頼できる理由",
      trustContent1: "petsMetricsは、栄養、健康、加齢に関するすべてのコンテンツについて、AAHA（アメリカ動物病院協会）、AAFCO、WSAVA、AAFPのガイドラインに従っています。各回答は現在の獣医学研究と照合して確認され、最新のエビデンスを反映するために四半期ごとに更新されます。当社の推奨事項は査読済みの研究に基づいています—逸話やマーケティングの主張ではありません。",
      trustContent2: "私たちは限界について透明です：FAQでは、個別差異が適用される場合、獣医師の診断が必要な場合、エビデンスの強度がどの程度かを明示しています。エビデンスが不確かな場合は、そのように述べます。このエビデンスベースの透明性への取り組みが、petsMetricsを一般的なペットブログと異なるものにしています。",
      disclaimer: "これらのFAQは一般的な教育情報のみを提供し、獣医学的アドバイスを構成するものではありません。個々のペットは、一般的なガイドラインとは異なる独自の健康上のニーズを持つ場合があります。ペットの特定の健康、栄養、医学的治療に関する決定については、必ず免許を持つ獣医師にご相談ください。緊急の場合は、最寄りの獣医療機関にご連絡ください。"
    },
    seasonal: {
      breadcrumb: {
        home: "ホーム",
        dog: "犬ハブ",
        seasonal: "季節の危険",
        summerHeat: "夏の暑さ対策",
        winterPawCare: "冬のお手入れ",
        christmasFoods: "クリスマスの食べ物",
        halloweenCandy: "ハロウィンのお菓子",
        fireworksAnxiety: "花火への不安",
        springAllergies: "春のアレルギー",
        thanksgiving: "感謝祭の食べ物",
        easterChocolate: "イースターのチョコレート"
      },
      lastUpdated: "最終更新日：{date} · {sources}でデータ検証済み。",
      knowledgeCards: "重要な知識",
      prevention: "予防チェックリスト",
      symptoms: "警告サイン",
      firstAid: "緊急応急処置ステップ",
      faqs: "よくある質問",
      relatedTools: "関連ツールとリソース",
      references: "参考文献と引用",
      emergencyLink: "緊急治療が利用可能",
      emergencyLinkDesc: "愛犬が現在医療緊急事態にある場合は、直ちに獣医の診察を受けるか、毒物管制センターに連絡してください。",
      goToEmergency: "緊急ガイドへ移動 →",
      disclaimer: "この季節ガイドは一般的な安全情報のみを提供し、獣医学的アドバイスを構成するものではありません。医療緊急事態の場合は、直ちに最寄りの獣医療機関またはASPCA動物毒物管制センター（888-426-4435）に連絡してください。ここで読んだ情報に基づいて治療を遅らせないでください。"
    }
  },
  ko: {
    faqHub: {
      breadcrumb: {
        home: "홈",
        dog: "강아지 허브",
        cat: "고양이 허브",
        faq: "자주 묻는 질문",
        nutrition: "영양",
        health: "건강",
        aging: "노화와 수명"
      },
      lastUpdated: "마지막 업데이트: {date} · {sources}에 데이터 확인됨.",
      overview: "{count}개의 전문가 답변을 주제별로 정리.",
      overviewDetail: "각 답변은 검증된 도구와 연구 기반 콘텐츠에서 인용합니다. 질문을 클릭하면 확장됩니다.",
      toc: "목차",
      questions: "질문",
      goToTool: "{tool} 열기",
      source: "답변 출처",
      relatedTools: "관련 도구",
      references: "참고문헌 및 데이터 소스",
      whyTrust: "당사 답변을 신뢰할 수 있는 이유",
      trustContent1: "petsMetrics는 영양, 건강 및 노화 관련 모든 콘텐츠에 대해 AAHA(미국 동물 병원 협회), AAFCO, WSAVA 및 AAFP 지침을 따릅니다. 각 답변은 현재 수의학 연구와 비교하여 확인되며 최신 증거를 반영하기 위해 매 분기 업데이트됩니다. 당사의 권장 사항은 동료 심사를 거친 연구를 기반으로 합니다—일화나 마케팅 주장이 아닙니다.",
      trustContent2: "우리는 한계에 대해 투명합니다: FAQ에는 개별 변형이 적용되는 경우, 수의사 상담이 필요한 경우, 증거의 강도가 어느 정도인지 명확하게 명시됩니다. 증거가 불확실한 경우 그렇게 말합니다. 이러한 증거 기반 투명성에 대한 노력이 petsMetrics를 일반 반려동물 블로그와 다르게 만듭니다.",
      disclaimer: "이 FAQ는 일반적인 교육 정보만 제공하며 수의학적 조언을 구성하지 않습니다. 개별 반려동물은 일반 지침과 다른 고유한 건강 요구 사항을 가질 수 있습니다. 반려동물의 특정 건강, 영양 또는 의학적 치료에 대한 결정은 항상 면허가 있는 수의사와 상담하십시오. 긴급 상황에서는 즉시 가장 가까운 수의기관에 연락하십시오."
    },
    seasonal: {
      breadcrumb: {
        home: "홈",
        dog: "강아지 허브",
        seasonal: "계절 위험",
        summerHeat: "여름 열 안전",
        winterPawCare: "겨울 발바닥 관리",
        christmasFoods: "크리스마스 음식",
        halloweenCandy: "할로윈 사탕",
        fireworksAnxiety: "폭죽 불안",
        springAllergies: "봄 알레르기",
        thanksgiving: "추수감사절 음식",
        easterChocolate: "부활절 초콜릿"
      },
      lastUpdated: "마지막 업데이트: {date} · {sources}에 데이터 확인됨.",
      knowledgeCards: "핵심 지식",
      prevention: "예방 체크리스트",
      symptoms: "경고 신호",
      firstAid: "응급 처치 단계",
      faqs: "자주 묻는 질문",
      relatedTools: "관련 도구 및 리소스",
      references: "참고문헌 및 인용",
      emergencyLink: "응급 치료 가능",
      emergencyLinkDesc: "반려견이 현재 의료 응급 상황인 경우 즉시 수의사의 진료를 받거나 독물 관리 센터에 연락하십시오.",
      goToEmergency: "응급 가이드로 이동 →",
      disclaimer: "이 계절 가이드는 일반적인 안전 정보만 제공하며 수의학적 조언을 구성하지 않습니다. 의료 응급 상황에서는 즉시 가장 가까운 수의기관 또는 ASPCA 동물 독물 관리 센터 (888-426-4435)에 연락하십시오. 여기서 읽은 정보를 기준으로 치료를 지연하지 마십시오."
    }
  },
  es: {
    faqHub: {
      breadcrumb: {
        home: "Inicio",
        dog: "HubPerro",
        cat: "HubGato",
        faq: "Preguntas Frecuentes",
        nutrition: "Nutrición",
        health: "Salud",
        aging: "Envejecimiento y Longevidad"
      },
      lastUpdated: "Última actualización: {date} · Datos verificados con {sources}.",
      overview: "{count} respuestas de expertos organizadas por tema.",
      overviewDetail: "Cada respuesta se basa en nuestras herramientas verificadas y contenido basado en la investigación. Haga clic en cualquier pregunta para expandirla.",
      toc: "Tabla de Contenidos",
      questions: "preguntas",
      goToTool: "Abrir {tool}",
      source: "Respondido en",
      relatedTools: "Herramientas Relacionadas",
      references: "Referencias y Fuentes de Datos",
      whyTrust: "¿Por qué confiar en nuestras respuestas?",
      trustContent1: "petsMetrics sigue las pautas de AAHA (Asociación Americana de Hospitales para Animales), AAFCO, WSAVA y AAFP para todo el contenido sobre nutrición, salud y envejecimiento. Cada respuesta se revisa con la investigación veterinaria actualiza y se actualiza trimestralmente para reflejar la última evidencia. Nuestras fórmulas y recomendaciones se basan en estudios revisados por pares — nunca en evidencia anecdótica o afirmaciones de marketing.",
      trustContent2: "Somos transparentes sobre nuestras limitaciones: cada FAQ establece claramente cuándo se aplica variación individual, cuándo se requiere consulta veterinaria y cuál es la fuerza de la evidencia. Si la evidencia es incierta, lo decimos. Este compromiso con la transparencia basada en la evidencia es lo que diferencia a petsMetrics de los blogs generales para mascotas.",
      disclaimer: "Estas preguntas frecuentes proporcionan únicamente información educativa general y no constituyen consejo veterinario. Las mascotas individuales pueden tener necesidades de salud diferentes a las pautas generales. Siempre consulte con un veterinario certificado para decisiones sobre la salud, nutrición o tratamiento médico específico de su mascota. En emergencias, comuníquese inmediatamente con la clínica veterinaria más cercana."
    },
    seasonal: {
      breadcrumb: {
        home: "Inicio",
        dog: "HubPerro",
        seasonal: "Peligros de Temporada",
        summerHeat: "Seguridad en el Calor del Verano",
        winterPawCare: "Cuidado Invernal para Patas",
        christmasFoods: "Alimentos Navideños",
        halloweenCandy: "Dulces de Halloween",
        fireworksAnxiety: "Ansiedad por Pirotecnia",
        springAllergies: "Alergias Primaverales",
        thanksgiving: "Alimentos de Acción de Gracias",
        easterChocolate: "Chocolate de Pascua"
      },
      lastUpdated: "Última actualización: {date} · Datos verificados con {sources}.",
      knowledgeCards: "Conocimientos Clave",
      prevention: "Lista de Verificación de Prevención",
      symptoms: "Señales de Advertencia",
      firstAid: "Pasos de Primeros Auxilios de Emergencia",
      faqs: "Preguntas Frecuentes",
      relatedTools: "Herramientas y Recursos Relacionados",
      references: "Referencias y Citas",
      emergencyLink: "Tratamiento de Emergencia Disponible",
      emergencyLinkDesc: "Si su perro está experimentando actualmente una emergencia médica, busque atención veterinaria inmediata o contacte al centro de control de intoxicaciones.",
      goToEmergency: "Ir a la Guía de Emergencia →",
      disclaimer: "Esta guía estacional proporciona únicamente información de seguridad general y no constituye consejo veterinario. En cualquier emergencia médica, comuníquese inmediatamente con la clínica veterinaria más cercana o con el Control de Envenenamiento Animal de ASPCA al (888) 426-4435. No retrate el tratamiento basado en la información leída aquí."
    }
  },
  pt: {
    faqHub: {
      breadcrumb: {
        home: "Início",
        dog: "HubCão",
        cat: "HubGato",
        faq: "Perguntas Frequentes",
        nutrition: "Nutrição",
        health: "Saúde",
        aging: "Envelhecimento e Longevidade"
      },
      lastUpdated: "Última atualização: {date} · Dados verificados com {sources}.",
      overview: "{count} respostas de especialistas organizadas por tópico.",
      overviewDetail: "Cada resposta é baseada em nossas ferramentas verificadas e conteúdo baseado em pesquisas. Clique em qualquer pergunta para expandi-la.",
      toc: "Índice",
      questions: "perguntas",
      goToTool: "Abrir {tool}",
      source: "Respondido em",
      relatedTools: "Ferramentas Relacionadas",
      references: "Referências e Fontes de Dados",
      whyTrust: "Por que confiar nas nossas respostas?",
      trustContent1: "O petsMetrics segue as diretrizes da AAHA (Associação Americana de Hospitais para Animais), AAFCO, WSAVA e AAFP para todo o conteúdo de nutrição, saúde e envelhecimento. Cada resposta é verificada com a pesquisa veterinária atual e atualizada trimestralmente para refletir as últimas evidências. Nossas fórmulas e recomendações são baseadas em estudos revisados por pares — nunca em evidências anedóticas ou alegações de marketing.",
      trustContent2: "Somos transparentes sobre nossas limitações: cada FAQ declara claramente quando a variação individual se aplica, quando é necessária a consulta veterinária e qual é a força da evidência. Se a evidência é incerta, dizemos isso. Este compromisso com a transparência baseada em evidências é o que diferencia o petsMetrics dos blogs gerais sobre animais de estimação.",
      disclaimer: "Essas FAQs fornecem apenas informações educacionais gerais e não constituem aconselhamento veterinário. Animais individuais podem ter necessidades de saúde diferentes das diretrizes gerais. Sempre consulte um veterinário certificado para decisões sobre a saúde, nutrição ou tratamento médico específico do seu animal. Em emergências, entre em contato imediatamente com a clínica veterinária mais próxima."
    },
    seasonal: {
      breadcrumb: {
        home: "Início",
        dog: "HubCão",
        seasonal: "Perigos da Estação",
        summerHeat: "Segurança contra Calor no Verão",
        winterPawCare: "Cuidados com Patas no Inverno",
        christmasFoods: "Alimentos de Natal",
        halloweenCandy: "Doces de Halloween",
        fireworksAnxiety: "Ansiedade com Fogos de Artifício",
        springAllergies: "Alergias Primais",
        thanksgiving: "Alimentos de Ação de Graças",
        easterChocolate: "Chocolate de Páscoa"
      },
      lastUpdated: "Última atualização: {date} · Dados verificados com {sources}.",
      knowledgeCards: "Conhecimentos Importantes",
      prevention: "Lista de Verificação de Prevenção",
      symptoms: "Sinais de Aviso",
      firstAid: "Passos de Primeiros Socorros de Emergência",
      faqs: "Perguntas Frequentes",
      relatedTools: "Ferramentas e Recursos Relacionados",
      references: "Referências e Citações",
      emergencyLink: "Tratamento de Emergência Disponível",
      emergencyLinkDesc: "Se o seu cão está atualmente passando por uma emergência médica, procure atendimento veterinário imediato ou entre em contato com o centro de controle de venenos.",
      goToEmergency: "Ir para o Guia de Emergência →",
      disclaimer: "Este guia sazonal fornece apenas informações de segurança gerais e não constitui aconselhamento veterinário. Em qualquer emergência médica, entre em contato imediatamente com a clínica veterinária mais próxima ou com o Controle de Intoxicações para Animais da ASPCA em (888) 426-4435. Não atrase o tratamento com base nas informações lidas aqui."
    }
  },
  nl: {
    faqHub: {
      breadcrumb: {
        home: "Startpagina",
        dog: "HubHond",
        cat: "HubKat",
        faq: "Veelgestelde Vragen",
        nutrition: "Voeding",
        health: "Gezondheid",
        aging: "Veroudering Langlevendheid"
      },
      lastUpdated: "Laatst bijgewerkt: {date} · Gegevens geverifieerd met {sources}.",
      overview: "{count} expergeantwoorden, georganiseerd per onderwerp.",
      overviewDetail: "Elk antwoord is gebaseerd op onze geverifieerde tools en onderzoeksgebaseerde inhoud. Klik op een vraag om deze uit te vouwen.",
      toc: "Inhoudsopgave",
      questions: "vragen",
      goToTool: "{tool} openen",
      source: "Beantwoord in",
      relatedTools: "Gerelateerde Hulpmiddelen",
      references: "Verwijzingen en Gegevensbronnen",
      whyTrust: "Waarom onze antwoorden vertrouwen?",
      trustContent1: "petsMetrics volgt de richtlijnen van AAHA (American Animal Hospital Association), AAFCO, WSAVA en AAFP voor alle inhoud over voeding, gezondheid en veroudering. Elk antwoord wordt gecontroleerd aan de hand van recent veterinair onderzoek en driemaal per jaar bijgewerkt om de meest recente bevindingen te weerspiegelen. Onze formules en aanbevelingen zijn gebaseerd op peer-reviewed studies — nooit anekdotisch bewijs of marketingclaims.",
      trustContent2: "We zijn transparant over onze beperkingen: in elke FAQ staat duidelijk wanneer individuele variatie van toepassing is, wanneer een veterinair consult nodig is en hoe sterk het bewijs is. Als het bewijs onzeker is, zeggen dat. Deze inzet voor evidence-based transparantie is wat petsMetrics onderscheidt van algemene dierenblogs.",
      disclaimer: "Deze veelgestelde vragen bieden algemene voorlichtingsinformatie en vellen geen veterinair advies. Dieren kunnen unieke gezondheidsbehoeften hebben die afwijken van de algemene richtlijnen. Raadpleeg altijd een erkende vearts voor beslissingen over de specifieke gezondheid, voeding of medische behandeling van uw huisdier. Bij noodsituaties direct contact opnemen met de diergeneeskundige kliniek in de buurt."
    },
    seasonal: {
      breadcrumb: {
        home: "Startpagina",
        dog: "HubHond",
        seasonal: "Seizoensgevaren",
        summerHeat: "Zomerhitte Veiligheid",
        winterPawCare: "Winterpootverzorging",
        christmasFoods: "Kerstmaaltijden",
        halloweenCandy: "Halloweensnoep",
        fireworksAnxiety: "Vuurwerkangst",
        springAllergies: "Lenteallergieën",
        thanksgiving: "Dankmaaltijden",
        easterChocolate: "Paaschocolade"
      },
      lastUpdated: "Laatst bijgewerkt: {date} · Gegevens geverifieerd met {sources}.",
      knowledgeCards: "Belangrijke Kennis",
      prevention: "Preventie Checklist",
      symptoms: "Waarschuwingssignalen",
      firstAid: "Noodfirst Aid Stappen",
      faqs: "Veel Gestelde Vragen",
      relatedTools: "Gerelateerde Hulpmiddelen en Middelen",
      references: "Verwijzingen en Citaten",
      emergencyLink: "Spoedbehandeling Beschikbaar",
      emergencyLinkDesc: "Als uw hond momenteel een medisch noodgeval ervaart, zoek dan onmiddellijk dierenartshulp of neem contact op op met het gifcentrum.",
      goToEmergency: "Ga naar de noodgids →",
      disclaimer: "Deze seizoensgids biedt algemene veiligheidsinformatie en velt geen veterinair advies. Neem bij medische noodgeval direct contact op met de dichtstbijzijnde dierenkliniek of met ASPCA Animal Poison Control op (888) 426-4435. Stel de behandeling niet uit op basis van informatie die u hier leest."
    }
  },
  ar: {
    faqHub: {
      breadcrumb: {
        home: "الرئيسية",
        dog: "مركز الكلاب",
        cat: "مركز القطط",
        faq: "الأسئلة الشائعة",
        nutrition: "التغذية",
        health: "الصحة",
        aging: "الشيخوخة وطول العمر"
      },
      lastUpdated: "آخر تحديث: {date} · تم التحقق من البيانات مع {sources}.",
      overview: "{count} إجابات الخبراء مصنفة حسب الموضوع.",
      overviewDetail: "كل إجابة مستمدة من أدواتنا الموثقة والمحتوى القائم على البحث. انقر على أي سؤال لتوسيعه.",
      toc: "جدول المحتويات",
      questions: "أسئلة",
      goToTool: "فتح {tool}",
      source: "الإجابة في",
      relatedTools: "الأدوات ذات الصلة",
      references: "المراجع ومصادر البيانات",
      whyTrust: "لماذا تثق بإجاباتنا؟",
      trustContent1: "يتبع petsMetrics إرشادات AAHA (الجمعية الأمريكية للمستشفيات الحيوانية)، AAFCO، WSAVA، و AAFP لجميع المحتوى المتعلق بالتغذية والصحة والشيخوخة. تتم مراجعة كل إجابة مقابل الأبحاث البيطرية الحالية وتحديثها ربع سنوياً لتعكس أحدث الأدلة. تعتمد صيغنا وتوصياتنا على دراسات خاضعة لمراجعة الأقران - وليس على أدلة قصصية أو ادعاءات تسويقية.",
      trustContent2: "نحن ششفون بشأن قيودنا: توضح كل الأسئلة الشائعة متى ينطبق الاختلاف الفردي، ومتى تكون الاستشارة البيطرية مطلوبة، وما مدى قوة الأدلة. إذا كانت الأدلة غير مؤكدة، فإننا نقول ذلك. هذا الالتزام بالشفافية القائمة على الأدلة هو ما يميز petsMetrics عن المدونات العامة للحيوانات الأليفة.",
      disclaimer: "هذه الأسئلة الشائعة توفر معلومات تعليمية عامة فقط ولا تشكل نصيحة بيطرية. قد يكون للحيوانات الأليفة الفردية احتياجات صحية فريدة تختلف عن الإرشادات العامة. استشر دائماً طبيباً بيطرياً مرخصاً للقرارات المتعلقة بالصحة أو التغذية أو العلاج الطبي الخاص بحيوانك الأليفة. في حالات الطوارئ، اتصل بعيادة الطبيب البيطري الأقرب إليك فوراً."
    },
    seasonal: {
      breadcrumb: {
        home: "الرئيسية",
        dog: "مركز الكلاب",
        seasonal: "مخاطر موسمية",
        summerHeat: "السلامة من حرارة الصيف",
        winterPawCare: "العناية بالأقدام في الشتاء",
        christmasFoods: "أطعمة الكريسماس",
        halloweenCandy: "حلوى الهالوين",
        fireworksAnxiety: "قلق الألعاب النارية",
        springAllergies: "حساسية الربيع",
        thanksgiving: "أطعمة عيد الشكر",
        easterChocolate: "شوكولاتة عيد الفصح"
      },
      lastUpdated: "آخر تحديث: {date} · تم التحقق من البيانات مع {sources}.",
      knowledgeCards: "المعرفة الأساسية",
      prevention: "قائمة التحقق من الوقاية",
      symptoms: "علامات التحذير",
      firstAid: "خطوات الإسعافات الأولية للطوارئ",
      faqs: "الأسئلة الشائعة",
      relatedTools: "الأدوات والموارد ذات الصلة",
      references: "المراجع والاقتباسات",
      emergencyLink: "العلاج الطارئ متاح",
      emergencyLinkDesc: "إذا كان كلبك يمر بحالة طبية طارئة، اطلب الرعاية البيطرية الفورية أو اتصل بمركز مكافحة السموم.",
      goToEmergency: "اذهب إلى دليل الطوارئ →",
      disclaimer: "يوفر هذا الدليل الموسمي معلومات أمان عامة فقط ولا يشكل نصيحة بيطرية. في أي حالة طبية طارئة، اتصل فوراً بأقرب عيادة بيطرية أو بمركز ASPCA لمكافحة السموم الحيوانية على الرقم (888) 426-4435. لا تتأخر في العلاج بناءً على المعلومات المقروءة هنا."
    }
  },
  ru: {
    faqHub: {
      breadcrumb: {
        home: "Главная",
        dog: "Центр для собак",
        cat: "Центр для кошек",
        faq: "Часто задаваемые вопросы",
        nutrition: "Питание",
        health: "Здоровье",
        aging: "Старение и долголетие"
      },
      lastUpdated: "Последнее обновление: {date} · Данные проверены по {sources}.",
      overview: "{count} ответов экспертов, организованных по темам.",
      overviewDetail: "Каждый ответ основан на наших проверенных инструментах и исследовательском тенте Нажмите на любой вопрос, чтобы развернуть его.",
      toc: "Содержание",
      questions: "вопросы",
      goToTool: "Открыть {tool}",
      source: "Отвечено в",
      relatedTools: "Связанные инструменты",
      references: "Источники и базы данных",
      whyTrust: "Почему стоит доверять нашим ответам?",
      trustContent1: "ппetsMetrics следует рекомендациям AAHA (Американской ассоциации ветеринарных клиник), AAFCO, WSAVA и AAFP для всего тента о питании, здоровье и старении. Каждый ответ проверяется по текущей ветеринарной науке и обновляется ежеквартально для отражения последних данных. Наши формулы и рекомендации основаны на рецензируемых исследованиях — никогда на анекдотических свидетельствах или маркетиноговых заявлениях.",
      trustContent2: "Мы прозрачны в отношении наших ограничений: в каждом FAQ четко указано, когда применяются индивидуальные различия, когда требуется консультация ветеринара и какова степень доказательности. Если доказательства неопределенны, мы так же и говорим. Это стремлению к доказательности и прозрачноти отличает ппetsMetrics от обычных блогов о домашних животных.",
      disclaimer: "Часто задаваемые вопросы предоставляют только общие образовательную информацию и не являютается ветеринарным советом. Отдельные питомцы могут иметь уникальные потребности в здоровье, отличающиеся от общих рекомендаций. Всегда консультируйтесь c лицензированным ветеринаром для решений o конкретном здоровье, питании или медицинском лечении вашего питомца. В экстренных случаях немедленно связывайтecь c ближайшей ветеринарной клиникой."
    },
    seasonal: {
      breadcrumb: {
        home: "Главная",
        dog: "Центр для собак",
        seasonal: "Сезонные опасности",
        summerHeat: "Безопасность в летнюю жару",
        winterPawCare: "Зимний уход за лапами",
        christmasFoods: "Рождественские блюда",
        halloweenCandy: "Хэллоуинские сладости",
        fireworksAnxiety: "страх перед фейерверком",
        springAllergies: "Весенние аллергии",
        thanksgiving: "Блюда Дня благодарения",
        easterChocolate: "Пасхальный шоколад"
      },
      lastUpdated: "Последнее обновление: {date} · Данные проверены по {sources}.",
      knowledgeCards: "Ключевые знания",
      prevention: "Контрольный список для профилактики",
      symptoms: "Предупреждающие знаки",
      firstAid: "Шаги первой помощи при чрезвычайных ситуациях",
      faqs: "Часто задаваемые вопросы",
      relatedTools: "Связанные инструменты и ресурсы",
      references: "Источники и ссылки",
      emergencyLink: "Доступна неотложная помощь",
      emergencyLinkDesc: "Если ваша собака находится в экстренной медицинской ситуации, немедленно обратитесь к ветеринару или свяжитесь с центром противодействия ядам.",
      goToEmergency: "Перейти к руководству по чрезвычайным ситуациям →",
      disclaimer: "Этот сезонный справочник предоставляет только общую информацию о безопасности и не является ветеринарным советом.В любой экстренной медицинской ситуации немедленно свяжитесь с ближайшей ветеринарной клиникой или центром противодействия ядам для животных ASPCA по телефону (888) 426-4435. Не откладывайте лечение на основе информации, прочитанной здесь."
    }
  },
  hi: {
    faqHub: {
      breadcrumb: {
        home: "होम",
        dog: "कुत्ता हब",
        cat: "बिल्ली हब",
        faq: "अक्सर पूछे जाने वाले प्रश्न",
        nutrition: "पोषण",
        health: "स्वास्थ्य",
        aging: "उम्र बढ़ना और दीर्घायु"
      },
      lastUpdated: "अंतिम अपडेट: {date} · डेटा {sources} के सत्यापित।",
      overview: "{count} विशेषज्ञ उत्तर, विषय के अनुसार व्यवस्थित।",
      overviewDetail: "प्रत्येक उत्तर हमारे सत्यापित टूल और शोध-आधारित सामग्री से प्राप्त है। किसी भी प्रश्न पर क्लिक करके इसे विस्तारित करें।",
      toc: "विषय सूची",
      questions: "प्रश्न",
      goToTool: "{tool} खोलें",
      source: "उत्तर",
      relatedTools: "संबंधित टूल",
      references: "संदर्भ और डेटा स्रोत",
      whyTrust: "हमारे उत्तरों पर विश्वास क्यों करें?",
      trustContent1: "petsMetrics पोषण, स्वास्थ्य और उम्र बढ़ने से संबंधित सभी सामग्री के लिए AAHA (अमेरिकन एनिमल हॉस्पिटल एसोसिएशन), AAFCO, WSAVA और AAFP दिशानिर्देशों का पालन करता है। प्रत्येक उत्तर को वर्तमान पशु चिकित्सा शोध के साथ सत्यापित किया जाता है और नवीनतम प्रमाणों को दर्शाने के लिए तिमाही रूप से अपडेट किया जाता है। हमारे सूत्र और अनुशंसाएं सहकर्मी-समीक्षा अध्ययन पर आधारित हैं — कभी भी अनखोजी प्रमाण या विपणन दावों पर नहीं।",
      trustContent2: "हम अपनी सीमाओं के बारे में पारदर्शी हैं: प्रत्येक FAQ स्पष्ट रूप से बताता है कि व्यक्तिगत भिन्नता कब लागू होती है, पशु चिकित्सा परामर्श कब आवश्यक है और प्रमाण की शक्ति क्या है। यदि प्रमाण अनिश्चित हैं, तो हम ऐसा कहते हैं। प्रमाण-आधारित पारदर्शिता के प्रति यह प्रतिबद्धता petsMetrics को सामान्य पालतू जानवरों के ब्लॉग से अलग करती है।",
      disclaimer: "ये क्वेंटिटेटिव फैक्ट्स केवल सामान्य शैक्षिक जानकारी प्रदान करते हैं और पशु चिकित्सा सलाह का गठन नहीं करते हैं। व्यक्तिगत पालतू जानवरों की अनूठी स्वास्थ्य जरूरतें हो सकती हैं जो सामान्य दिशानिर्देशों से भिन्न होती हैं। अपने पालतू जानवर के विशिष्ट स्वास्थ्य, पोषण या चिकित्सा उपचार के बारे में निर्णयों के लिए हमेशा लाइसेंस प्राप्त पशु चिकित्सक से परामर्श करें। आपातकालीन स्थिति में, तुरंत अपने निकटतम पशु चिकित्सा क्लीनिक से संपर्क करें।"
    },
    seasonal: {
      breadcrumb: {
        home: "होम",
        dog: "कुत्ता हब",
        seasonal: "मौसमी खतरे",
        summerHeat: "गर्मी में सुरक्षा",
        winterPawCare: "सर्दी में पंजों की देखभाल",
        christmasFoods: "क्रिसमस भोजन",
        halloweenCandy: "हेलोवीन कैंडी",
        fireworksAnxiety: "आतिशबाजी चिंता",
        springAllergies: "बसंत एलर्जी",
        thanksgiving: "धन्यवाद भोजन",
        easterChocolate: "ईस्टर चॉकलेट"
      },
      lastUpdated: "अंतिम अपडेट: {date} · डेटा {sources} के सत्यापित।",
      knowledgeCards: "महत्वपूर्ण ज्ञान",
      prevention: "रोकथाम चेकलिस्ट",
      symptoms: "चेतावनी संकेत",
      firstAid: "आपातकालीन प्राथमिक चिकित्सा चरण",
      faqs: "अक्सर पूछे जाने वाले प्रश्न",
      relatedTools: "संबंधित टूल और संसाधन",
      references: "संदर्भ और उद्धरण",
      emergencyLink: "आपातकालीन उपचार उपलब्ध",
      emergencyLinkDesc: "यदि आपका कुत्ता वर्तमान में चिकित्सा आपातकालीन स्थिति से गुजर रहा है, तो तुरंत पशु चिकित्सा देखभाल लें या विष नियंत्रण केंद्र से संपर्क करें।",
      goToEmergency: "आपातकालीन गाइड पर जाएं →",
      disclaimer: "यह मौसमी गाइड केवल सामान्य सुरक्षा जानकारी प्रदान करता है और पशु चिकित्सा सलाह का गठन नहीं करता है। किसी भी चिकित्सा आपातकालीन स्थिति में, तुरंत अपने निकटतम पशु चिकित्सा क्लीनिक या ASPCA पशु विष नियंत्रण (888) 426-4435 से संपर्क करें। यहां पढ़ी गई जानकारी के आधार पर उपचार में देरी न करें।"
    }
  }
};

// 处理每个语言文件
function processLocale(locale) {
  const filePath = path.join(MESSAGES_DIR, `${locale}.json`);
  const content = fs.readFileSync(filePath, 'utf-8');
  const json = readJsonFile(filePath);

  // 删除空的 shared 对象（line 654 位置）
  if (json.shared && Object.keys(json.shared).length === 0) {
    delete json.shared;
    console.log(`✓ [${locale}] 已删除空的 shared 对象`);
  }

  // 添加 faqHub 和 seasonal
  const localeTranslations = translations[locale];
  if (localeTranslations) {
    json.faqHub = localeTranslations.faqHub;
    json.seasonal = localeTranslations.seasonal;
    console.log(`✓ [${locale}] 已添加 faqHub 和 seasonal`);
  } else {
    console.log(`✗ [${locale}] 无翻译数据`);
  }

  // 写入文件
  fs.writeFileSync(filePath, JSON.stringify(json, null, 2) + '\n', 'utf-8');
  console.log(`✓ [${locale}] 文件已保存`);
}

// 执行
console.log('开始处理多语言文件...\n');
targetLocales.forEach(processLocale);
console.log('\n完成！');
