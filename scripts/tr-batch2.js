/**
 * 批次2: ko, es, pt, nl - compare 子页面翻译
 */
const fs = require('fs');
const path = require('path');
const MESSAGES_DIR = path.join(__dirname, '..', 'messages');

function readFile(p) {
  let c = fs.readFileSync(p, 'utf-8');
  if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);
  return JSON.parse(c);
}

const en = readFile(path.join(MESSAGES_DIR, 'en.json'));

function translatePage(enPage, t) {
  const p = JSON.parse(JSON.stringify(enPage));
  p.title = t.title;
  p.subtitle = t.subtitle;
  p.topicAName = t.topicAName;
  p.topicBName = t.topicBName;
  p.topicA.pros.forEach((item, i) => {
    if (t.topicA?.pros?.[i]) {
      item.title = t.topicA.pros[i].title;
      item.body = t.topicA.pros[i].body;
    }
  });
  p.topicA.cons = t.topicA?.cons || p.topicA.cons;
  p.topicA.bestFor = t.topicA?.bestFor || p.topicA.bestFor;
  p.topicB.pros.forEach((item, i) => {
    if (t.topicB?.pros?.[i]) {
      item.title = t.topicB.pros[i].title;
      item.body = t.topicB.pros[i].body;
    }
  });
  p.topicB.cons = t.topicB?.cons || p.topicB.cons;
  p.topicB.bestFor = t.topicB?.bestFor || p.topicB.bestFor;
  p.rows.forEach((row, i) => {
    if (t.rows?.[i]) {
      row.dimension = t.rows[i].dimension;
      row.topicA = t.rows[i].topicA;
      row.topicB = t.rows[i].topicB;
    }
  });
  p.verdict = t.verdict;
  p.faq.forEach((item, i) => {
    if (t.faq?.[i]) {
      item.question = t.faq[i].question;
      item.answer = t.faq[i].answer;
    }
  });
  return p;
}

const koData = {
  harnessVsCollar: {
    title: "�더� vs �대�: �쇰� ����� �그����?",
    subtitle: "�과� 비�: �찴 보�, �긱기 控�, �풔� 疏�, �종� 째�.",
    topicAName: "�백 클� �더�",
    topicBName: "�프� 넥켈러",
    topicA: {
      pros: [
        { title: "�찴 보안", body: "�격과 어�게 모� � 모�. �긱으� �비�� � 갑� 제�. 단두종� � � � � � �." },
        { title: "�긱 控�", body: "�백 클� �더�는 硫� 방�으로 �導� 긱는 � 만�. 프� 클�는 � �운 방� �." },
        { title: "�풔� �", body: "� 쿠� �더�는 � �풔� � 어�." },
        { title: "단두종� �", body: "불독, 퍼�, �불� � � �위� � �대� 사� �.�운� �위�." }
      ],
      cons: ["�훈 �無 �긱 � � �","�이�调� �","찜� � �막� 수 있","초� � 거� � 수 있","�주 �용 � 맞지 �"],
      bestFor: "단두종, 구�, �비�� �, �한 �이, 척�."
    },
    topicB: {
      pros: [
        { title: "간단 �르�", body: "착용 �켱. �생� � �." },
        { title: "ID �용", body: "넥켈러는 ID, 광�태그, �처 보� � �." },
        { title: "� � �", body: "10-30달� vs 25-60달�." },
        { title: "찜� �", body: "� 쓰대� 찜 � 어깨 �." }
      ],
      cons: ["�긱� �비�로 �","단두종�� 호흡곤 �","그라운드 � � 빠� �","�� 류� � � �","AVSAB는 조르� 비�"],
      bestFor: "�운 �상�, � � �, 견�."
    },
    rows: [
      { dimension: "�찴 보안", topicA: "우수", topicB: "�비" },
      { dimension: "�긱 控�", topicA: "좋음", topicB: "없음" },
      { dimension: "�풔� 疏�", topicA: "낮음", topicB: "보통" },
      { dimension: "편�", topicA: "좋음", topicB: "좋음" },
      { dimension: "단두종 보안", topicA: "추�", topicB: "주의" },
      { dimension: "초 �", topicA: "$25-60", topicB: "$10-30" },
      { dimension: "ID �용", topicA: "부적�", topicB: "적�" },
      { dimension: "�의� 장�", topicA: "층 �", topicB: "ID� � �" }
    ],
    verdict: "<strong>거� � 독 - 특� 단두종, 구�, �이 - � � Y프 �더�가 � � �운 �선택입니다.</strong> 프� 넥켈러는 ID� 필�이지� 리� �는 도� �면 � �합�. AVSAB AAHA는 �대� 사용을 비� � 호흡찴 �경 � 추천. 대� �리�는 모� 착���� 추천.",
    faq: [
      { question: "리� � �더�가 낫�?", answer: "그�. 프� 클�는 硫� 방향으로 유�. 린 � � � � 쿼리 � �." },
      { question: "�불� � �더�는?", answer: "어깨 �상� �리� 카� � Y프�. 단두종�� 호� � � 리 � 필�." },
      { question: "모� 착� �?", answer: "� - 추�. �주 � ID� 착용, �할 � 착�." }
    ]
  },
  petInsuranceVsEmergencyFund: {
    title: "펙� 보� vs 금리 금고: � 쪽이 좋�?",
    subtitle: "금리 비�:월� �용, 보� 한�, � �긱.",
    topicAName: "펙� 보�",
    topicBName: "�금 금리금고",
    topicA: {
      pros: [
        { title: "카타� �용", body: "아크리� 진�: 3,000-10,000$ +. 금리안� 방�." },
        { title: "�예�", body: "월� 30-150$로 갑� 5,000$ + � �." },
        { title: "�축지", body: "5-10할�." },
        { title: "리카", body: "월� 30-30$로 백신 질� 커�." }
      ],
      cons: ["이� 질환 비�","환� 모�: 의사� 먼� 지 �, � �청 (30-60년)","� 상한 5,000-15,000$","종특� 제외 가","보� � : 8년 = 2-4배 �가"],
      bestFor: "�건한 �, �예� �, �성 종, $5,000+를 흡� � � �."
    },
    topicB: {
      pros: [
        { title: "보 없�", body: "모든 � �." },
        { title: "모� 제�", body: "제한, 기간, 거� �." },
        { title: "이�", body: "4-5% APY 성�." },
        { title: "�환� �", body: "기 � 직� 지불." }
      ],
      cons: ["긴급 � �전� �완�","월� 100-200$ 5년+ � 절 �","초기상 �용 불가","팬� � 금고 �","인 � 저하"],
      bestFor: "절� �주, 이� 질환 �, 고� ��리 � ."
    },
    rows: [
      { dimension: "월�", topicA: "$30-150", topicB: "$0 (100-200$ 절�)" },
      { dimension: "이�", topicA: "비�", topicB: "�상" },
      { dimension: "�금", topicA: "� �", topicB: "완� 자금 (5+년)" },
      { dimension: "환�", topicA: "30-60년", topicB: "없음" },
      { dimension: "카타�", topicA: "�상", topicB: "절충 �" },
      { dimension: "시�", topicA: "대리�", topicB: "즉시" }
    ],
    verdict: "<strong>펙� 보�는 재� 비� 금리안� 방� - �금 금고로 1� 8,000$ 암료 � 할 � �더.</strong> �전: � � �+� �고.",
    faq: [
      { question: "보� 가치?", answer: "평� � � �. �, 암 8,000-15,000$ 보장." },
      { question: "금리 금고 �?", answer: "마리 3,000-5,000$." },
      { question: "보� � �금?", answer: "전�: � � 보� + 3,000$+ � �고." }
    ]
  },
  grainFreeVsWholeGrain: {
    title: "곡� 프리 vs 통�: �가 건강?",
    topicAName: "곡� �",
    topicBName: "통곡� �",
    topicA: {
      pros: [
        { title: "낮은 GI", body: "�질과 감� 게리� - �충� 방�." },
        { title: "저알레�", body: "진짜 알레기 (1% 미�)를." },
        { title: "고�", body: "2-5% 증�." }
      ],
      cons: ["FDA DCM 의�","콩/감 �리� �","99%�� � 무용","AAFCO 최! 없음","높� �"],
      bestFor: "지� 알레기 (매� 드물)."
    },
    topicB: {
      pros: [
        { title: "검� �양", body: "50년 이� DCM 무." },
        { title: "완전 �양", body: "B, �, 알, 마그�, 필� 산." },
        { title: "낮�", topicA: "$1.00-2.00/lb vs $1.50-3.00" },
        { title: "AAFCO 부합", body: "모� �. 부합." },
        { title: "�유 �", body: "보리 � � 게�." }
      ],
      cons: ["약� � GI","률 단백�"],
      bestFor: "99%� - WSAVA �."
    },
    rows: [
      { dimension: "DCM", topicA: "의�", topicB: "사�" },
      { dimension: "단백�", topicA: "26-34%", topicB: "22-28%" },
      { dimension: "비용", topicA: "$1.50-3.00", topicB: "$1.00-2.00" },
      { dimension: "GI", topicA: "낮음", topicB: "중간" },
      { dimension: "연구", topicA: "기�", topicB: "50+년" },
      { dimension: "알레�", topicA: "<1%", topicB: "표준" },
      { dimension: "의�", topicA: "주의", topicB: "추�" }
    ],
    verdict: "<strong>AAFCO 통곡� WSAVA의 권장. FDA는 곡� 프리 + 콩과 DCM의 연관성을 통계적으로 발견.",
    faq: [
      { question: "곡� 프리가 위험?", answer: "FDA 2018-2023 의�. WSAVA는 비부� 주의." },
      { question: "가 �가 �?", answer: "아. �미지장. 통곡� �. 고품� �리 � 비�." },
      { question: "�양학� �?", answer: "AAFCO 사� 시행 �. �. �리 전용." }
    ]
  },
  scratchingPostVsCatTree: {
    title: "�爪기 vs �塔: 무� � �?",
    topicAName: "�爪기(단독)",
    topicBName: "�塔다(복)",
    topicA: {
      pros: [
        { title: "�가�", body: "15-40달� 사�, 5-15달�." },
        { title: "공절약", body: "1-2 sq ft." },
        { title: "즉� �", body: "조립 �무." },
        { title: "�질", body: "사�, 카르�." }
      ],
      cons: ["수직 영역 �","전용 �긁�","전복 �","다가 �화 �"],
      bestFor: "단독 공� 한, � �, � � 보�."
    },
    topicB: {
      pros: [
        { title: "수� 영�", body: "고도 = 안, 열, �." },
        { title: "다기능", body: "�, �, 은, �." },
        { title: "다가 �", topicB: "�층 �. 분 �." },
        { title: "�동", topicB: "�어가 + ." },
        { title: "은신", topicB: "완� 공." }
      ],
      cons: ["$50-300+","2-4 sq ft + �"," 리기 어�","품� 흔들 � �도�"],
      bestFor: "다가 집, 출�."
    },
    rows: [
      { dimension: "�", topicA: "$5-40", topicB: "$50-300+" },
      { dimension: "면�", topicA: "1-2 sq ft", topicB: "2-4 sq ft" },
      { dimension: "� 기능", topicA: "전용", topicB: "장착" },
      { dimension: "수�", topicA: "�", topicB: "전용" },
      { dimension: "다가", topicA: "아니", topicB: "그�" },
      { dimension: "�동", topicA: "최소", topicB: "높음" }
    ],
    verdict: "<strong>� 집 견牢한 � �후 � � 가. 좋� 보�.</strong> AAFP ISFM: 수직 영역 �검.",
    faq: [
      { question: "모� �?", answer: "단독 + 보�. � � � � 1/2�." },
      { title: "최적 �?", answer: "사 (2-5년), 카르� (1-3월)." },
      { question: "권장 �?", answer: "4-6프 3+ �. 안정감 �." }
    ]
  }
};

const esData = {
  harnessVsCollar: {
    title: "Arn s vs Collar para Perros: ¿Cu l es el Correcto?",
    subtitle: "Comparaci n cient fica de arneses y collares planos: seguridad del cuello, control de tir n, riesgo de escape y recomendaciones por raza.",
    topicAName: "Arn s de anillo trasero",
    topicBName: "Collar plano",
    topicA: {
      pros: [
        { title: "Seguridad del cuello", body: "Distribuye la presi n en el pecho y los hombros, eliminando la compresi n de la tiroides y la tr quea causada por el tir n. Fundamental para las razas braquic falicas." },
        { title: "Control de tir n", body: "Los arneses traseros desalientan el tir n redirigiendo al perro lateralmente. Las variantes frontales ofrecen a n m s fuerza." },
        { title: "Resistente al escape", body: "Los arneses ajustados son m s rudos de quitar para los perros que los collares flojos." },
        { title: "Ideal para razas braquic falicas", body: "Bulldogs, Pugs y French Bulldogs tienen v as respiratorias comprometidas que hacen el collar peligroso." }
      ],
      cons: ["Puede fomentar el tir n si no se combina con entrenamiento","M s complejo de ajustar correctamente","Puede irritar las axilas si no est  bien ajustado","Algunos perros se resisten al principio - requiere acostumbramiento","No apto para etiquetas de ID permanentes"],
      bestFor: "Razas braquic falicas, cachorros, perros con problemas de tr quea, perros que tiran fuerte."
    },
    topicB: {
      pros: [
        { title: "Sencillo y r pido", body: "F cil de poner y quitar, sin per odo de adaptaci n. Ideal para ba os r pidos." },
        { title: "Para etiquetas", body: "El collar es el lugar natural para etiquetas de ID, rabiosis y contacto." },
        { title: "Menor costo", body: "$10-30 vs $25-60." },
        { title: "Sin riesgo de irritaci n", body: "Los collares planos bien ajustados no restringen el movimiento." }
      ],
      cons: ["Presi n de tir n en la tr quea","Perros braquic falicas: restricci n respiratoria peligrosa incluso con tir n leve","Perros pueden salir (greyhunches, etc)","Ninguna ventaja mec nica para controlar los que tiran","AVSAB desaconseja collares de estrangulamiento"],
      bestFor: "Perros tranquilos, bien entrenados que no tiran, etiquetas de ID."
    },
    rows: [
      { dimension: "Seguridad del cuello", topicA: "Excelente", topicB: "Riesgo de compresi n" },
      { dimension: "Control de tir n", topicA: "Bueno", topicB: "Ninguno" },
      { dimension: "Riesgo de escape", topicA: "Bajo", topicB: "Moderado" },
      { dimension: "Comodidad", topicA: "Bueno", topicB: "Bueno" },
      { dimension: "Braquicef licos", topicA: "Recomendado", topicB: "Precauci n" },
      { dimension: "Costo inicial", topicA: "$25-60", topicB: "$10-30" },
      { dimension: "Etiquetas", topicA: "No ideal", topicB: "Ideal" },
      { dimension: "Veterinaria", topicA: "Preferido", topicB: "ID nicamente" }
    ],
    verdict: "<strong>Para la mayor a de los perros - especialmente razas braquicef licas, cachorros y perros que tiran - un arn s Y-front es la opci n m s segura para pasear.</strong> Los collares planos son importantes para las etiquetas de ID, pero no deben usarse para perros que tiran.",
    faq: [
      { question: "¿Un arn s es mejor para un perro que tira?", answer: "S . Un arn s frontal redirige al perro lateralmente. Use arn s frontal combinado con entrenamiento de correa." },
      { question: "¿Cu l es el mejor tipo de arn s para un French Bulldog?", answer: "Un arn s Y-front que no restringa el movimiento de hombros." },
      { question: "¿Puede un perro usar arn s y collar al mismo tiempo?", answer: "S . Collar con etiquetas de ID en todo momento, arn s para pasear." }
    ]
  },
  petInsuranceVsEmergencyFund: {
    title: "Seguro de mascotas vs Fondo de emergencia",
    subtitle: "Comparaci n financiera detallada: costos mensuales, brechas y an lisis de rentabilidad.",
    topicAName: "Seguro de mascotas",
    topicBName: "Fondo de emergencia auto-financiado",
    topicA: {
      pros: [
        { title: "Cubre costos catastr ficos", body: "Diagn stico de c ncer: $3,000-10,000+. Previene la eutanasia financiera." },
        { title: "Previsibilidad mensual", body: "Prima fija $30-150/mes. Sin sorpresas." },
        { title: "Descuentos", body: "5-10% por m ltiples mascotas." },
        { title: "Opciones adicionales", body: "Cobertura de rutina por $10-30/mes adicionales." }
      ],
      cons: ["NO cubre condiciones preexistentes","Modelo de reembolso","L mites anuales $5,000-15,000","Prima aumenta con la edad"],
      bestFor: "Mascotas j venes saludables, due os que buscan previsibilidad."
    },
    topicB: {
      pros: [
        { title: "Sin primas", body: "Todo va directo al cuidado." },
        { title: "Control total", body: "Sin restricciones, esperas, ni rechazos." },
        { title: "Genera intereses", body: "4-5% APY." },
        { title: "Sin espera de reembolso", body: "Pago directo." }
      ],
      cons: ["Debe estar completamente financiado antes","Disciplina de $100-200/mes por 5+ a os","Inflaci n erosiona valor"],
      bestFor: "Due os con disciplina financiera, mascotas mayores."
    },
    rows: [
      { dimension: "Costo mensual", topicA: "$30-150", topicB: "$0 (ahorrar $100-200)" },
      { dimension: "Preexistentes", topicA: "No cubierto", topicB: "Cubierto" },
      { dimension: "Emergencia", topicA: "Despu s del deducible", topicB: "5+ a os" },
      { dimension: "Reembolso", topicA: "30-60 d as", topicB: "Ninguno" },
      { dimension: "Catastr fica", topicA: "Cubierto (con l mites)", topicB: "Ahorro suficiente" },
      { dimension: "Inicio", topicA: "Cachorro", topicB: "Inmediatamente" }
    ],
    verdict: "<strong>El seguro previene la eutanasia financiera. Un fondo propio no puede cubrir $8,000 de tratamiento en el primer a o.</strong> La estrategia ptima: seguro desde joven + fondo separado.",
    faq: [
      { question: "¿Vale la pena el seguro?", answer: "Matem ticamente tal no, pero protege contra cat strofes: $8,000-15,000 de c ncer menos deducible." },
      { question: "¿Cu nto ahorrar?", answer: "$3,000-5,000 por mascota." },
      { question: "¿Seguro o ahorrar?", answer: "Ambos: seguro + fondo de $3,000+." }
    ]
  },
  grainFreeVsWholeGrain: {
    title: "Sin cereales vs Cereales integrales",
    topicAName: "Sin cereales",
    topicBName: "Cereales integrales",
    topicA: {
      pros: [
        { title: "Menor carga gluc mica", body: "Legumbres y patatas en lugar de cereales - libera glucosa m s lentamente." },
        { title: "Hipoalerg nico", body: "Puede aliviar alergias reales (< 1% de perros)." },
        { title: "M s prote nas", body: "2-5% m s prote nas." }
      ],
      cons: ["Investigaci n FDA sobre DCM","Legumbres/patatas pueden interferir con taurina","Sin beneficios para 99% de perros","Sin m nimo AAFCO para legumbres","Mayor costo"],
      bestFor: "Perros con alergias diagnosticadas."
    },
    topicB: {
      pros: [
        { title: "Investigaci n exhaustiva", body: "50+ a os de seguridad. Sin riesgo DCM." },
        { title: "Nutrientes completos", body: "Vitaminas B, fibra, hierro, magnesio." },
        { title: "Menor costo", topicA: "$1.00-2.00/lb vs $1.50-3.00" },
        { title: "Conforme AAFCO", body: "Todas las grandes marcas cumplen." },
        { title: "Fibra", body: "Avena y cebada promueven microbioma." }
      ],
      cons: ["Carga gluc ligeramente mayor","Menor porcentaje de prote nas"],
      bestFor: "La mayor a de los perros - recomendado por WSAVA."
    },
    rows: [
      { dimension: "Riesgo DCM", topicA: "Investigado", topicB: "Ninguno" },
      { dimension: "Prote nas", topicA: "26-34%", topicB: "22-28%" },
      { dimension: "Costo/lb", topicA: "$1.50-3.00", topicB: "$1.00-2.00" },
      { dimension: "Carga gluc mica", topicA: "Menor", topicB: "Moderada" },
      { dimension: "Investigaci n", topicA: "Limitada", topicB: "50+ a os" },
      { dimension: "Alergia", topicA: "<1%", topicB: "Est ndar" },
      { dimension: "Consenso", topicA: "Precauci n", topicB: "Recomendado" }
    ],
    verdict: "<strong>Para la mayor a de los perros, cereales integrales AAFCO de fabricantes con nutricionistas veterinarios es la elecci n recomendada.</strong> La FDA encontr  correlaci n estad stica entre sin cereales con legumbres y DCM.",
    faq: [
      { question: "¿Sin cereales es peligroso?", answer: "FDA investig correlaci n 2018-2023. WSAVA recomienda precauci n." },
      { question: "¿Los perros necesitan cereales?", answer: "No, pero los integrales ofrecen beneficios nutricionales." },
      { title: "Recomendaci n nutricionistas", body: "dietas AAFCO con ensayos. Integrales pr ferida." }
    ]
  },
  scratchingPostVsCatTree: {
    title: "Rascador vs rbol para gatos",
    topicAName: "Rascador (independiente)",
    topicBName: " rbol para gatos (multi-nivel)",
    topicA: {
      pros: [
        { title: "Econ mico", body: "$15-40 Sisal, $5-15 cart n." },
        { title: "Ahorra espacio", body: "1-2 sq ft." },
        { title: "Inmediato", body: "Sin ensamblaje." },
        { title: "Variedad", body: "Sisal, cart n, corteza." }
      ],
      cons: ["Sin territorio vertical","Solo rascado","Volc f cilmente","No apto para m ltiples gatos"],
      bestFor: "Gatos de espacio limitado, due os con presupuesto."
    },
    topicB: {
      pros: [
        { title: "Territorio vertical", body: "Altura = seguridad, calor, punto de observaci n." },
        { title: "Multi-funci n", body: "Rascador, percha, escondite." },
        { title: "Armon a multi-gato", topicB: "M ltiples niveles reducen conflictos." },
        { title: "Ejercicio", body: "Trepada y saltos para gatos de interior." },
        { title: "Enriquecimiento", body: "Cubiculos cerrados." }
      ],
      cons: ["$50-300+ pie grande","2-4 sq ft + altura","Pes rsimo"," rboles baja calidad rechazados"],
      bestFor: "M ltiples gatos, espacio adecuado."
    },
    rows: [
      { dimension: "Costo", topicA: "$5-40", topicB: "$50-300+" },
      { dimension: " rea", topicA: "1-2 sq ft", topicB: "2-4 sq ft" },
      { dimension: "Rascado", topicA: "Principal", topicB: "Incorporado" },
      { dimension: "Vertical", topicA: "Ninguno", topicB: "Principal" },
      { dimension: "Multi-gato", topicA: "No", topicB: "S " },
      { dimension: "Ejercicio", topicA: "M nimo", topicB: "Alto" }
    ],
    verdict: "<strong>Comience con un rascador estable por gato, luego agregue un rbol si tiene espacio/presupuesto para enriquecimiento integral.</strong> AAFP/ISFM: el territorio vertical es fundamental.",
    faq: [
      { question: "¿Necesito ambos?", answer: "Un gato: rbol + rascador adicional. M ltiples: 1 rascador/gato + 1 rbol/pareja." },
      { title: "Mejor material", answer: "Sisal (2-5 a os), cart n (1-3 meses)." },
      { question: "¿Qu  altura?", topicA: "4-6 ft 3+ plataformas. Estabilidad importante." }
    ]
  }
};

const ptData = {
  harnessVsCollar: {
    title: "Coleira vs Arn s para C es: Qual o Certo?",
    subtitle: "Compara o cient fica: seguran a do pesco o, controle de tra o, risco de fugida e recomenda es por ra a.",
    topicAName: "Arn s com clipe traseiro",
    topicBName: "Coleira plana",
    topicA: {
      pros: [
        { title: "Seguran a do pesco o", body: "Distribui a press o pelo peito e ombros eliminando compress o da tireoide e traqueia. Essencial para ra as braquic fallelas." },
        { title: "Controle de tra o", body: "Clipes traseiros redirecionam o c o lateralmente. Vers es dianteiras oferecem mais for a." },
        { title: "Anti-fuga", body: "Arneses ajustados s o mais dif ceis de tirar." },
        { title: "Ideal para braquic fallelas", body: "Bulldogs, Pugs, French Bulldogs t m v a betrayada." }
      ],
      cons: ["Pode fomentar a tra o sem treino","Mais complexo de ajustar corretamente","Pode irritar axilas se mal ajustado","Alguns c es resistem no in cio - requer acostamento","N o adequado para etiquetas de ID"],
      bestFor: "Ra as braquic fallelas, filhotes, c es com problemas de traqueia, c es que puxam forte."
    },
    topicB: {
      pros: [
        { title: "Simples e r pido", body: "F cil de colocar e tirar, sem per odo de adapta o. Ideal para banho." },
        { title: "Etiquetas", body: "Local natural para ID, raiva, contatos." },
        { title: "Menor custo", body: "$10-30 vs $25-60." },
        { title: "Sem irrita o", body: "Collares planos bem ajustados n o restringem." }
      ],
      cons: ["Press o de tra o na traqueia","C es braquic fallelos: restri o at  mesmo com tra o leve","C es podem sair de coleiras (greys, etc)","Sem controle mec nico para puxadores","AVSAB desabona coleiras de estrangulamento"],
      bestFor: "C es calmos, bem treinados, etiquetas de ID."
    },
    rows: [
      { dimension: "Seguran a do pesco o", topicA: "Excelente", topicB: "Risco de compress o" },
      { dimension: "Controle de tra o", topicA: "Bom", topicB: "Nenhum" },
      { dimension: "Fugida", topicA: "Baixo", topicB: "Moderrado" },
      { dimension: "Convn", topicA: "Bom", topicB: "Bom" },
      { dimension: "Braquic fallelo", topicA: "Recomenda", topicB: "Cuidado" },
      { dimension: "Custo inicial", topicA: "$25-60", topicB: "$10-30" },
      { dimension: "Etiquetas", topicA: "N o ideal", topicB: "Ideal" },
      { dimension: "Veterin ria", topicA: "Pretendido", topicB: "ID apenas" }
    ],
    verdict: "<strong>Para a maioria dos c es - especialmente ra as braquic fallelas, filhotes e puxadores - o arn s Y-front  a escolha mais segura para passear.</strong> Os coleiras s o importantes para as etiquetas de ID, mas n o devem ser usados para c es que puxam.",
    faq: [
      { question: "O arn s  melhor para um c o que puxa?", answer: "Sim. Arn s dianteiro redireciona lateralmente. Combine com treino de guia." },
      { question: "Melhor arn s para um French Bulldog?", answer: "Arn s Y-front que n o restringa ombros." },
      { question: "Pode usar arn s e coleira ao mesmo tempo?", answer: "Sim - recomendado. Coleira com etiquetas de ID, arn s para passear." }
    ]
  },
  petInsuranceVsEmergencyFund: {
    title: "Seguro para animais vs Fundo de emerg ncia",
    subtitle: "Compara o financeira detalhada: custos mensais, coberturas e an lise de rentabilidade.",
    topicAName: "Seguro para animais",
    topicBName: "Fundo de emerg ncia auto-financiado",
    topicA: {
      pros: [
        { title: "Cobre custos catastr ficos", body: "Diagn stico de c ncer: $3,000-10,000+. Previne eutan  financeira." },
        { title: "Previsibilidade mensal", body: "Pr mio fixo $30-150/m s. Sem surpresas." },
        { title: "Descontos", body: "5-10% por m ltiplos." },
        { title: "Opicionais", body: "Rotina coberta por $10-30/m s extra." }
      ],
      cons: ["N o cobre condi es preexistentes","Modelo de reembolso","Limites anuais $5,000-15,000","Pr mio aumenta com idade"],
      bestFor: "Animais jovens saud veis, donos que buscam previsibilidade."
    },
    topicB: {
      pros: [
        { title: "Sem pr mios", body: "Tudo vai direto para cuidados." },
        { title: "Controle total", body: "Sem restri es, esperas ou recusas." },
        { title: "Gera juros", body: "4-5% APY." },
        { title: "Sem espera", body: "Pagamento direto." }
      ],
      cons: ["Deve estar totalmente financiado antes","Disciplina de $100-200/m s por 5+ anos","Infla o reduz valor"],
      bestFor: "Donos com disciplina financeira, animais idosos."
    },
    rows: [
      { dimension: "Custo mensal", topicA: "$30-150", topicB: "$0 (poupar $100-200)" },
      { dimension: "Preexistentes", topicA: "N o cobre", topicB: "Cobre" },
      { dimension: "Emerg ncia", topicA: "Ap s Franquia", topicB: "5+ anos" },
      { dimension: "Reembols", topicA: "30-60 dias", topicB: "Nenhum" },
      { dimension: "Catastr fica", topicA: "Cobre (limites)", topicB: "Poupan a" },
      { dimension: "In cio", topicA: "Filhote", topicB: "Imediatamente" }
    ],
    verdict: "<strong>O seguro previne eutan  financeira. Um fundo pr prio n o pode cobrir $8,000 de tratamento no primeiro ano.</strong> Estrat gia tima: seguro desde jovem + fundo separado.",
    faq: [
      { question: "O seguro vale a pena?", answer: "Matematicamente n o, mas protege contra cat strofes: $8,000-15,000 de c ncer menos franquia." },
      { question: "Quanto poupar?", topicA: "$3,000-5,000 por animal." },
      { question: "Seguro ou poupar?", answer: "Ambos: seguro + fundo de $3,000+." }
    ]
  },
  grainFreeVsWholeGrain: {
    title: "Sem gr os vs Gr os integrais",
    topicAName: "Sem gr os",
    topicBName: "Gr os integrais",
    topicA: {
      pros: [
        { title: "Menor carga glic mica", body: "Legumes e batatas em vez de gr os - libera glicose mais lentamente." },
        { title: "Hipoalerg nico", body: "Pode ajudar alergias reais (< 1% dos c es)." },
        { title: "Mais prote nas", body: "2-5% mais prote nas." }
      ],
      cons: ["Investiga o FDA sobre DCM","Legumes/batata interferem com taurina","Sem benef cios para 99% dos c es","AAFCO sem m nimo para legumes","Mais caro"],
      bestFor: "C es com alergias diagnosticadas."
    },
    topicB: {
      pros: [
        { title: "Bem pesquisado", body: "50+ anos de seguran a, sem risco DCM." },
        { title: "Nutrientes completos", body: "Vitaminas B, fibra, ferro, magn sio." },
        { title: "Mais barato", topicA: "$1.00-2.00/lb vs $1.50-3.00" },
        { title: "Conforme AAFCO", body: "Todas as grandes marcas cumprem." },
        { title: "Fibra digestiva", body: "Aveia e cevada promovem microbioma intestinal." }
      ],
      cons: ["Carga glic ligeiramente maior","Menor porcentagem de prote nas"],
      bestFor: "A maioria dos c es - recomendado pela WSAVA."
    },
    rows: [
      { dimension: "Risco DCM", topicA: "Investigado", topicB: "Nenhum" },
      { dimension: "Prote nas", topicA: "26-34%", topicB: "22-28%" },
      { dimension: "Custo/lb", topicA: "$1.50-3.00", topicB: "$1.00-2.00" },
      { dimension: "Glic mico", topicA: "Menor", topicB: "Moderado" },
      { dimension: "Pesquisa", topicA: "Limitada", topicB: "50+ anos" },
      { dimension: "Alergia", topicA: "<1%", topicB: "Padr o" },
      { dimension: "Consenso", topicA: "Cuidado", topicB: "Recomendado" }
    ],
    verdict: "<strong>Para a maioria dos c es, ra o integral AAFCO de fabricantes com nutricionistas veterin rios  recomendada.</strong> A FDA encontrou correla o estat stica entre ra o sem gr os com legumes e DCM.",
    faq: [
      { question: "Sem gr os  perigoso?", topicA: "FDA investigou correla o 2018-2023. WSAVA recomenda cuidado." },
      { question: "C es precisam de gr os?", topicA: "N o, mas integrais oferecem benef cios nutricionais." },
      { title: "Recomenda o nutricionistas", body: "ra o AAFCO com experimentos. Integral preferida." }
    ]
  },
  scratchingPostVsCatTree: {
    title: "Arranhador vs rvore para gatos",
    topicAName: "Arranhador (aut nomo)",
    topicBName: " rvore para gatos (multi-n vel)",
    topicA: {
      pros: [
        { title: "Econ mico", body: "$15-40 Sisal, $5-15 cart o." },
        { title: "Ocupa pouco espa o", body: "1-2 sq ft." },
        { title: "Imediato", body: "Sem montagem." },
        { title: "Variedade", body: "Sisal, cart o, casca." }
      ],
      cons: ["Sem territ rio vertical","Apenas arranhador","F cil tombar","N o adequado para v rios gatos"],
      bestFor: "Gatos de espa o limitado, donos econ micos."
    },
    topicB: {
      pros: [
        { title: "Territ rio vertical", body: "Altura = seguran a, calor, observa o." },
        { title: "Multi-fun es", body: "Arranhador, percha, esconderijo." },
        { title: "Harmonia multi-gato", topicB: "M ltiplos n veis reduzem conflitos." },
        { title: "Exerc cio", body: "Escalada e saltos para gatos de interior." },
        { title: "Enriquecimento", body: "Cubos fechados." }
      ],
      cons: ["$50-300+ grande","2-4 sq ft + altura","Pesad ssimo"," rvores de baixa qualidade rejeitados"],
      bestFor: "V rios gatos, espa o adequado."
    },
    rows: [
      { dimension: "Custo", topicA: "$5-40", topicB: "$50-300+" },
      { dimension: " rea", topicA: "1-2 sq ft", topicB: "2-4 sq ft" },
      { dimension: "Arranhar", topicA: "Principal", topicB: "Incorporado" },
      { dimension: "Vertical", topicA: "Nenhum", topicB: "Principal" },
      { dimension: "Multi-gato", topicA: "N o", topicB: "Sim" },
      { dimension: "Exerc cio", topicA: "M nimo", topicB: "Alto" }
    ],
    verdict: "<strong>Comece com um arranhador est vel por gato, depois adicione uma rvore se tiver espa o/or amento para enriquecimento completo.</strong> AAFP/ISFM: territ rio vertical  fundamental.",
    faq: [
      { question: "Preciso de ambos?", answer: "Gato nico: rvore + arranhador adicional. V rios: 1 arranhador/gato + 1 rvore/par." },
      { title: "Melhor material", answer: "Sisal (2-5 anos), cart o (1-3 meses)." },
      { question: "Qual altura?", topicA: "4-6 p s 3+ plataformas. Estabilidade importante." }
    ]
  }
};

const nlData = {
  harnessVsCollar: {
    title: "Harnas vs Halsband voor Honden: Welke is het Juiste?",
    subtitle: "Wetenschappelijke vergelijking van lijnen en platbanden voor halshygiene, trekbeheersing, ontsnappingsrisico and rasgebonden aanbevelingen.",
    topicAName:"Rugclip-harnassen",
    topicBName: "Flapband",
    topicA:{
      pros:[
        {title:"Halshygiene", body:"Verdeelt druk over de borst en schouders, verwijdert trachea- en thyroid-compressie. Kortbrakken."},
        {title:"Trekbeheersing", body:"Rugclip-harnassen ontmoedigen trek zijwaarts. Frontclip-bieden nog meer kracht."},
        {title:"Snap-zeker", body:"Pasvallende harnassen moeilijk uit te trekken."},
        {title:"Voor kortbrakken", body:"Bulldogen, Puggies etc. moeilijke ademwegen."}
      ],
      cons:["Kan trek zonder training bevorderen","Complexere pas","Schurende oksels bij valse pas","Enkele honden weigeren eerst - acclimatie","Niet voor permanente ID-labels"],
      bestFor: "Kortbrak-. puppies, honden met trachea-/thyroidproblemen, sterke trekkers, herstellenden."
    },
    topicB:{
      pros:[
        {title:"Eenvoudig+snel", body:"Makkelijk aan/af, geen acclimatie. Ideaal voor toiletten."},
        {title:"ID-labels", body:"Natuurlijke plaats voor labels, hondezweet, contact."},
        {title:"Lagere kosten", body:"10-30$ vs. 25-60$."},
        {title:"Geen schuren", body:"Proper flapband zonder restrictie."}
      ],
      cons:["Trekdr op de trachea","Kortbrakken: ademhalingsbeperking bij lichte trek","Honden kunnen ontsnappen (greys)","Geen mechanisch voordeel voor trekkers","Wurgband door AVSAB afgeraden"],
      bestFor: "Ruste honden, goed getrainde, permanente ID."
    },
    rows:[
      {dimension:"Halssiche'", topicA:"Uitstekend", topicB:"Trachea-risico bij trek"},
      {dimension:"Trekbeh", topicA:"Goed", topicB:"Geen"},
      {dimension:"Ontsnappings'", topicA:"Laag", topicB:"Gemiddeld"},
      {dimension:"Comfort", topicA:"Goed", topicB:""},
      {dimension:"Kortbrakken'", topicA:"Aanbel.", topicB:"Voorzichtigheid"},
      {dimension:"Init. kosten", topicA:"$25-60", topicB:"$10-30"},
      {dimension:"ID-label", topicA:"Niet ideaal", topicB:"ideaal"},
      {dimension:"Dierenarts", topicA:"Verkozen", topicB:"Alleen ID"}
    ],
    verdict:"<strong>De meeste honden - vooral kortbrakken, puppies en trekkers - Y-front-harnas is veiligere wandeling.</strong> Flapband noodzakelijk voor ID, maar moet niet voor trekkers worden gebruikt. AVSAB en AAHA raden wurgbanden.",
    faq:[
      {question:"hARNA was voor trekkers beter?", answer:"Ja. Frontclip leidt zijwaarts. Combineer met lossel lijnentraining."},
      {question:"Franse bulldog harna?", answer:"Y-front zonder schouderrestrictie."},
      {question:"hond beide dragen?", answer:"Ja - aanbel. Flapband voor ID, harnas voor wandeling."}
    ]
  },
  petInsuranceVsEmergencyFund: {
    title:"Dierenverzekering vs Noodfonds",
    subtitle:"Financi le vergelijking: maandelijkse kosten, dekking, analyse.",
    topicAName:"Dierenverzekering",
    topicBName:"Zelf-financierd noodfonds",
    topicA:{
      pros:[
        {title:"Deekt natuurgeweld", body:"Kankerdiagnose: 3.000-10.000$+. Voorkomt euthanasie."},
        {title:"Planbare kosten", body:"Vaste premie $30-150/maand op meerdere jaren."},
        {title:"Meerrabatt", body:"5-10%."},
        {title:"Add-ons", body:"Rutiene zorg voor 10-30$/maand extra."}
      ],
      cons:["Niet voor reeds aandoeningen","Statiemodel: dierenarts betalen (30-60 dagen)","Jaarlijkse grenzen 5.000-15.000$","Premie stijgt met leeftijd"],
      bestFor:"Jonge gezond dieren, planbare kosten, dure rassen."
    },
    topicB:{
      pros:[
        {title:"Geen premie", body:"Alles voor zorg."},
        {title:"Volledige controle", body:"Geen restricties, wachttijden, afwijzingen."},
        {title:"Rente", body:"4-5%."},
        {title:"Geen wachttijd", body:"Directe betaling."}
      ],
      cons:["Moet voor nood volledig gefinancierd","Discipline $100-200/maand voor 5+ jaar","Kosten dekking beginperiode"," apart fonds per dieren","Inflatie reduceert waarde"],
      bestFor:"Gedisciplineerde eigenaren, oud dieren, hoog eigen risico."
    },
    rows:[
      {dimension:"Maandelijkse kosten", topicA:"$30-150", topicB:"$0 (bespaar $100-200)"},
      {dimension:"Reeds aandoeningen", topicA:"Niet", topicB:"Gedekt"},
      {dimension:"Nood", topicA:"Na eigen risico", topicB:"5+ jaar opbouw"},
      {dimension:"Uitbetaling", topicA:"30-60 dagen", topicB:"Geen"},
      {dimension:"Katastrofisch", topicA:"Gedekt (max)", topicB:"Besparen"},
      {dimension:"Start", topicA:"Puppie", topicB:"Onmiddellijk"}
    ],
    verdict:"<strong>verzekering voorkomt euthanasie bij natuurgeweld. Fonds kan $8.000 kankerbehandeling 1ste jaar niet dekken.</strong> optimale strategie: jonge verzekering + apart fonds.",
    faq:[
      {question:"Waardeer verzekering?", answer:"Gemiddeld niet, maar beschermt: $8.000-15.000 kankerbehandeling minus eigen risico."},
      {question:"Wijdte besparen?", answer:"$3.000-5.000 per dieren."},
      {question:"Verzekering of sparen?", answer:"Beide: jonge verzekering + 3.000$+ noodfonds."}
    ]
  },
  grainFreeVsWholeGrain: {
    title:"Graanvrij vs Volkoren",
    topicAName:"Graanvrij",
    topicBName:"Volkoren",
    topicA:{
      pros:[
        {title:"Lagere glyk m", body:"Peulvruchten i.p.v. graan - langzamer glucose af."},
        {title:"Hypoallergeen", body:"Alleen echte allergie (< 1%)."},
        {title:"Meer protein", body:"2-5% meer."}
      ],
      cons:["FDA-onderzoek DCM","Peulen/aardappelen be nvloeden taurine","Niet nuttig voor 99%","AAFCO geen minimum","Duurder"],
      bestFor:"Diagnostiseerde graanalergie."
    },
    topicB:{
      pros:[
        {title:"Goedgekeurd onderzoek", body:"50+ jaar veiligheid, geen DCM."},
        {title:"Volledig", body:"B-Vitamines, vezels, ijzer, magnesium."},
        {title:"Goedkoper", topicA:"$1.00-2.00 vs $1.50-3.00"},
        {title:"AAFCO", body:"Alle grote merken voldoen."},
        {title:"Vezels", body:"Haver/gerst darmflora."}
      ],
      cons:["Iets hoger glyk m","Minder protein"],
      bestFor:"Meerderheid - aanbevolen door WSAVA."
    },
    rows:[
      {dimension:"DCM", topicA:"Onderzocht", topicB:"Geen"},
      {dimension:"Protein", topicA:"26-34%", topicB:"22-28%"},
      {dimension:"Kosten", topicA:"$1.50-3.00", topicB:"$1.00-2.00"},
      {dimension:"Glyk m", topicA:"Laag", topicB:"Matig"},
      {dimension:"Onderzoek", topicA:"Beperkt", topicB:"50+ jaar"},
      {dimension:"Allergie", topicA:"<1%", topicB:"Standaard"},
      {dimension:"Consens", topicA:"Voorzichtigheid", topicB:"Aanbevolen"}
    ],
    verdict:"<strong>Volkoren AAFCO voer van fabrikanten met dierenkundigen - aanbevolen door WSAVA.</strong> FDA vond statistische samenhang tussen graanvrij met peulvruchten en DCM.",
    faq:[
      {question:"Graanvrij gevaarlijk?", answer:"FDA 2018-2023 onderzoek. WSAVA waarschuwing."},
      {question:"Moet hond graan?", answer:"Nee, maar volkoren biedt voedingsvoordelen."},
      {title:"Aanbeveling voedingsdeskundigen", body:"AAFCO met voedingsproeven. Volkoren voorkeur."}
    ]
  },
  scratchingPostVsCatTree: {
    title:"Krabber vs. Kattenboom",
    topicAName:"Krabber (zelfstandig)",
    topicBName:"Kattenboom (multiniveau)",
    topicA:{
      pros:[
        {title:"Betaalbaar", body:"$15-40 Sisal, $5-15 karton."},
        {title:"Ruimtebeperkt", body:"1-2 sq ft."},
        {title:"Onmidd. gebruik", body:"Geen montage."},
        {title:"Texturen", body:"Sisal, karton, schors."}
      ],
      cons:["Geen verticaal territorium","Alleen krabbend","Om lijnen vallen","Niet voor meerdere katten"],
      bestFor:"Enkele kat, krappe ruimte, boom aanvul."
    },
    topicB:{
      pros:[
        {title:"Verticaal territorium", body:"Hoogte = veiligheid, warmte, overzicht."},
        {title:"Multi-purpose", body:"Krabber, verstopplek, zit."},
        {title:"Meerv.", topicB:"Meerdere niveaus verminderen territoriale conf."},
        {title:"Beweging", body:"Limpen/springs huis katten."},
        {title:"Verstopplek", body:"Gesloten nissen."}
      ],
      cons:["$50-300+ groot","2-4 sq ft + hoogte","Zwaar verplaats","Lage kwaliteit worden afgewezen"],
      bestFor:"Meerdere katten, voldoende ruimte."
    },
    rows:[
      {dimension:"Kosten", topicA:"$5-40", topicB:"$50-300+"},
      {dimension:"Oppervlakte", topicA:"1-2 sq ft", topicB:"2-4 sq ft"},
      {dimension:"Krabb", topicA:"Doel", topicB:"Ingebouwd"},
      {dimension:"Verticaal", topicA:"Geen", topicB:"Doel"},
      {dimension:"Multi-kat", topicA:"Nee", topicB:""},
      {dimension:"Beweging", topicA:"Minimaal", topicB:"Hoog"}
    ],
    verdict:"<strong>Stevige krabber per kat, daarna boom bij ruimte/budget.</strong> AAFP/ISFM: verticaal territorium is belangrijk.",
    faq:[
      {question:"Beide nodig?", answer:" id kat: boom + extra krabber. Meer katten: 1 krabber/kat + 1 boom/paar."},
      {title:"Beste materiaal", answer:"Sisal (2-5 jaar), karton (1-3 mnd)."},
      {question:"Aanbevolen hoogte?", answer:"4-6 ft 3+ platformen. Stabiliteit belangrijk."}
    ]
  }
};

function process(locale, data) {
  const fp = path.join(MESSAGES_DIR, `${locale}.json`);
  const json = readFile(fp);
  if (!json.compare) json.compare = {};
  
  const pages = ['harnessVsCollar', 'petInsuranceVsEmergencyFund', 'grainFreeVsWholeGrain', 'scratchingPostVsCatTree'];
  pages.forEach(pageKey => {
    const enPage = en.compare[pageKey];
    const t = data[pageKey];
    if (enPage && t) {
      json.compare[pageKey] = translatePage(enPage, t);
    }
  });
  fs.writeFileSync(fp, JSON.stringify(json, null, 2) + '\n', 'utf-8');
  console.log(`✓ [${locale}] 完了`);
}

process('ko', koData);
process('es', esData);
process('pt', ptData);
process('nl', nlData);
console.log('バッチ2完了');
