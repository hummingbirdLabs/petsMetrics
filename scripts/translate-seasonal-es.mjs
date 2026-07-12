/**
 * Translate seasonal data for Spanish (es).
 */
import fs from 'fs';

// Read the English seasonal data as reference structure
const en = JSON.parse(fs.readFileSync('messages/en.json', 'utf8'));
const enSeasonal = en.seasonal;

// ============================================================
// SPANISH (es) translations
// ============================================================
const es = {
  'summer-heat': {
    title: 'Cómo mantener a su perro fresco en verano: guía de seguridad contra el calor',
    description: 'Guía completa para prevenir el golpe de calor en perros — reconocer síntomas tempranos, técnicas de enfriamiento, umbrales de temperatura peligrosos y pasos de emergencia. Basado en datos de ASPCA y emergencias veterinarias.',
    keywords: [
      'cómo mantener fresco al perro en verano',
      'prevención de golpe de calor en perros',
      'síntomas de golpe de calor en perros',
      'seguridad canina en clima cálido',
      'los perros pueden sobrecalentarse'
    ],
    severity: 'ALTO RIESGO',
    season: 'Verano (junio–agosto)',
    knowledgeCards: [
      {
        title: 'Comprendiendo el golpe de calor canino',
        body: 'A diferencia de los humanos, los perros sudan solo a través de las almohadillas de sus patas y dependen principalmente del jadeo para refrescarse. Cuando la temperatura ambiente supera la temperatura corporal (38.3-39.2°C), el jadeo se vuelve ineficaz. El golpe de calor ocurre cuando la temperatura corporal central supera los 41.1°C, causando daño orgánico en minutos. Según datos de ASPCA, cientos de perros mueren por golpe de calor cada verano, muchos por causas prevenibles.'
      },
      {
        title: 'Umbrales de temperatura peligrosos',
        body: 'A 27-29°C (80-85°F), las razas grandes y los perros braquicéfalos (Bulldogs, Pugs, Boxers) tienen un riesgo elevado. A 32°C (90°F), todos los perros necesitan tiempo limitado al aire libre. El interior de un automóvil alcanza 38.9°C en 10 minutos en un día de 29°C y 48.9°C en 30 minutos — incluso con las ventanas entreabiertas. (Fuente: estudio de temperatura de AVMA)'
      },
      {
        title: 'Razas con mayor riesgo',
        body: 'Las razas braquicéfalas (Pugs, Bulldogs, Bulldogs Franceses, Boxers, Boston Terriers) tienen un riesgo de golpe de calor 2-3 veces mayor debido a sus vías respiratorias estrechas. Las razas grandes/gigantes (Mastines, San Bernardos, Terranovas) retienen más calor. Las razas de doble capa gruesa (Huskies, Malamutes, Chow Chows) sufren en la humedad. Los cachorros menores de 6 meses y los perros mayores de 7 años también tienen un riesgo elevado.'
      },
      {
        title: 'La regla de la temperatura del suelo',
        body: 'La temperatura del aire por sí sola es información engañosa y peligrosa. El asfalto a 29°C de temperatura ambiente alcanza 60°C — suficiente para ampollar las almohadillas en 60 segundos. Pruebe con la regla de los 7 segundos: coloque el dorso de su mano sobre la superficie durante 7 segundos. Si le resulta incómodo, quema a su perro. Pasee a los perros sobre césped antes de las 10 AM o después de las 6 PM.'
      }
    ],
    prevention: [
      'Pasee a los perros antes de las 10 AM y después de las 6 PM cuando la temperatura del suelo sea segura',
      'Proporcione siempre sombra y agua fresca cuando esté al aire libre',
      'Nunca deje a un perro en un automóvil estacionado — ni siquiera "solo un minuto"',
      'Use colchonetas refrescantes, camas elevadas o toallas húmedas en interiores',
      'Lleve agua y un recipiente plegable en paseos de más de 15 minutos',
      'Limite la intensidad del ejercicio en días húmedos (humedad >60%)',
      'Considere recortar el pelo de razas de pelo largo (pero NO rasure las capas dobles)'
    ],
    symptoms: [
      'Jadeo excesivo o dificultad para respirar',
      'Encías y lengua de color rojo brillante o pálidas',
      'Babeo espeso y viscoso',
      'Vómitos o diarrea (puede ser con sangre)',
      'Tambaleo, debilidad o desorientación',
      'Temperatura rectal elevada (normal: 38.3-39.2°C; golpe de calor: >40°C)',
      'Colapso, convulsiones o pérdida de conciencia'
    ],
    firstAid: [
      {
        title: 'Paso 1: Trasládelo inmediatamente a un área fresca',
        content: 'Saque a su perro del calor y llévelo a la sombra o a un lugar con aire acondicionado. Retire cualquier arnés o ropa restrictiva.'
      },
      {
        title: 'Paso 2: Enfríe con agua templada (NO hielo)',
        content: 'Vierta agua fresca (no fría) sobre el cuello, las axilas y la ingle, donde los vasos sanguíneos están cerca de la superficie. El agua helada causa vasoconstricción que atrapa el calor en el interior. NO fuerce a beber agua si el perro no puede tragar.'
      },
      {
        title: 'Paso 3: Ofrezca pequeñas cantidades de agua',
        content: 'Deje que su perro beba pequeñas cantidades de agua fresca — no use una jeringa para forzar agua en la boca (riesgo de aspiración). Añada cubitos de hielo para incentivar que beba.'
      },
      {
        title: 'Paso 4: Traslade al veterinario inmediatamente',
        content: 'El golpe de calor puede causar daño orgánico interno que no es visible de inmediato. Incluso si su perro parece recuperarse, trasládelo a un veterinario para evaluación. Llame al Control de Envenenamiento de ASPCA al (888) 426-4435 si no está seguro de la gravedad.'
      }
    ],
    faqs: [
      {
        question: '¿A qué temperatura pueden los perros sufrir un golpe de calor?',
        answer: 'Los perros pueden desarrollar golpe de calor a temperaturas superiores a 29°C (85°F), especialmente bajo sol directo con humedad superior al 60%. El riesgo aumenta drásticamente por encima de 32°C. Las razas braquicéfalas pueden sufrir golpe de calor a temperaturas tan bajas como 24°C debido a su anatomía respiratoria comprometida. Zona crítica de peligro: temperatura corporal superior a 40°C comienza a causar daño orgánico; por encima de 41.1°C es potencialmente mortal.'
      },
      {
        question: '¿Pueden los perros sufrir golpe de calor dentro de casa?',
        answer: 'Sí, el golpe de calor en interiores es común cuando los hogares carecen de aire acondicionado o ventilación adecuada. Los perros no pueden refrescarse eficazmente en habitaciones por encima de 29°C, especialmente con alta humedad. Factores de riesgo: habitaciones en pisos superiores (el calor sube), jaulas cerradas sin flujo de aire y habitaciones con exposición solar directa a través de ventanas. Proporcione siempre una zona fresca (suelo de baldosa, ventilador o colchoneta refrescante) accesible para su perro.'
      },
      {
        question: '¿Cómo enfrío a un perro de forma rápida y segura?',
        answer: 'Use agua fresca (no helada) en el cuello, axilas e ingle. Ofrezca pequeñas cantidades de agua fresca para beber. Trasládese a un lugar con aire acondicionado o sombra. NO sumerja en agua helada — esto causa un shock peligroso. NO use alcohol (tóxico si se lame). Traslade al veterinario incluso si los síntomas mejoran, ya que el daño interno puede no ser visible de inmediato.'
      },
      {
        question: '¿Cuánto tarda un perro en sufrir un golpe de calor en un automóvil?',
        answer: 'El interior de un automóvil se calienta catastróficamente rápido: en un día de 29°C, el interior alcanza 38.9°C en solo 10 minutos y 48.9°C en 30 minutos — incluso con las ventanas entreabiertas 5 cm. A estas temperaturas, un perro puede desarrollar un golpe de calor mortal en tan solo 15-20 minutos. No existe una duración segura. Nunca deje a un perro en un automóvil estacionado, independientemente de la temperatura exterior o las condiciones climáticas.'
      }
    ],
    relatedTools: [
      {
        name: 'Calculadora de calorías para perros',
        href: '/dog/calorie-calculator/',
        description: 'Ajuste la alimentación para niveles reducidos de actividad en verano.'
      },
      {
        name: 'Verificador de alimentos tóxicos',
        href: '/shared/toxic-checker/',
        description: 'Verifique la seguridad de alimentos veraniegos (uvas en barbacoas, mazorcas de maíz, etc.).'
      }
    ],
    bodyParagraphs: [
      'El calor del verano representa una amenaza grave y a menudo subestimada para los perros. A diferencia de los humanos que tienen glándulas sudoríparas distribuidas por todo el cuerpo, los perros se refrescan principalmente mediante el jadeo y una sudoración limitada a través de las almohadillas de las patas. Esta limitación biológica los hace especialmente vulnerables en climas cálidos, sobre todo cuando la humedad reduce la eficiencia del enfriamiento por evaporación del jadeo.',
      'El error más crítico es creer que el golpe de calor solo ocurre en temperaturas extremas. En realidad, la mayoría de los casos de golpe de calor canino que atiende ASPCA ocurren en lo que los dueños consideran días "moderadamente cálidos" — 27-29°C — especialmente cuando los perros hacen ejercicio o están confinados en espacios mal ventilados. Las razas braquicéfalas enfrentan un riesgo agravado: sus vías respiratorias acortadas ya restringen el flujo de aire, por lo que la mayor demanda respiratoria para refrescarse puede sobrepasar rápidamente su capacidad de intercambio de oxígeno.',
      'La temperatura del suelo es otro peligro frecuentemente ignorado. A 24°C de temperatura ambiente, el asfalto puede alcanzar 52°C; a 30°C, alcanza 57°C. A 60°C, las quemaduras de segundo grado en las almohadillas ocurren en 60 segundos. Siempre pruebe las superficies con la regla de los 7 segundos antes de dejar que su perro camine sobre ellas.'
    ]
  },
  'winter-paw-care': {
    title: 'Protección de patas caninas en invierno: seguridad contra frío, hielo y sal',
    description: 'Guía experta para proteger las patas de los perros en invierno — prevención de congelación, quemaduras por hielo e irritación por sal de carretera. Incluye rutinas de cuidado de almohadillas, ajuste de botas y tratamiento de emergencia para lesiones por clima frío.',
    keywords: [
      'protección de patas caninas invierno',
      'tratamiento de congelación en patas de perro',
      'sal de carretera patas perro',
      'cuidado invernal de patas caninas',
      'botas para perros invierno'
    ],
    severity: 'RIESGO MODERADO',
    season: 'Invierno (diciembre–febrero)',
    knowledgeCards: [
      {
        title: 'Anatomía de las almohadillas plantares caninas',
        body: 'Las almohadillas de las patas de los perros contienen tejido adiposo para aislamiento, pero esta grasa puede congelarse a temperaturas inferiores a -6°C (20°F). Las almohadillas digitales y metacarpianas tienen un flujo sanguíneo limitado en comparación con otros tejidos, lo que las hace particularmente vulnerables a la congelación. La exposición repetida a superficies frías hace que la piel de las almohadillas se agriete y sangre, creando puntos de entrada para infecciones.'
      },
      {
        title: 'Sal de carretera y descongelantes químicos',
        body: 'Los descongelantes comunes incluyen cloruro de sodio, cloruro de calcio y cloruro de magnesio. Estos productos químicos queman el tejido de las almohadillas al contacto y causan malestar gastrointestinal si se lamen. El cloruro de calcio es el más peligroso — genera calor al contacto con la piel húmeda y puede causar quemaduras químicas. Los descongelantes "seguros para mascotas" utilizan fórmulas a base de urea o glicol que son menos irritantes.'
      },
      {
        title: 'El peligro de las bolas de hielo',
        body: 'La nieve y el hielo se acumulan entre los dedos, formando bolas de hielo apretadas que cortan la membrana interdigital y restringen el flujo sanguíneo. Esto es doloroso y puede causar daño tisular. Las razas de pelo largo (especialmente entre las almohadillas) son las más susceptibles. Las bolas de hielo se forman en 10-15 minutos de caminata sobre nieve húmeda.'
      },
      {
        title: 'Etapas de congelación en patas caninas',
        body: 'Etapa 1: Piel pálida y fría que duele al tacto. Etapa 2: La piel se siente dura y fría, puede mostrar decoloración (azul grisáceo). Etapa 3: Ampollas, tejido ennegrecido que indica necrosis. Los márgenes entre el tejido normal y el congelado no siempre son claros — lo que parece levemente dañado puede empeorar en 24-48 horas a medida que se restablece el flujo sanguíneo.'
      }
    ],
    prevention: [
      'Aplique bálsamo para almohadillas (como Musher\'s Secret o similar) antes de los paseos para crear una barrera protectora',
      'Recorte el pelo entre las almohadillas para prevenir la formación de bolas de hielo',
      'Use botas para perros (ajuste ceñido, transpirables) en paseos de más de 10 minutos sobre nieve/hielo',
      'Limpie bien las patas con agua tibia (no caliente) después de cada paseo',
      'Evite caminar cerca de carreteras y entradas tratadas con sal',
      'Aplique vaselina en las almohadillas antes de los paseos si no se usan botas',
      'Revise las almohadillas en busca de grietas, enrojecimiento o sangrado después de cada paseo'
    ],
    symptoms: [
      'Cojera o reticencia a caminar (especialmente en superficies duras)',
      'Lamer o morder las patas excesivamente',
      'Almohadillas agrietadas, secas o sangrantes',
      'Piel oscura o descolorida en las almohadillas (azul grisáceo indica congelación)',
      'Membranas interdigitales hinchadas o dolorosas',
      'Bolas de hielo visibles entre los dedos',
      'Pequeños cortes o abrasiones en las almohadillas'
    ],
    firstAid: [
      {
        title: 'Paso 1: Retire del frío y caliente suavemente',
        content: 'Lleve a su perro al interior. Caliente las patas afectadas con agua tibia (a temperatura corporal) o toallas tibias durante 15-20 minutos. NO use agua caliente ni almohadillas térmicas — el tejido congelado tiene sensibilidad reducida y puede quemarse fácilmente.'
      },
      {
        title: 'Paso 2: Retire las bolas de hielo y residuos',
        content: 'Retire suavemente las bolas de hielo de entre los dedos usando agua tibia para derretirlas. No tire del hielo — esto desgarra la piel. Seque con palmaditas suaves usando una toalla suave.'
      },
      {
        title: 'Paso 3: Trate las quemaduras químicas',
        content: 'Si hubo exposición a sal de carretera, enjuague suavemente las patas con agua tibia durante 5 minutos para eliminar residuos. Aplique una capa fina de humectante seguro para almohadillas (no loción humana — a base de lanolina y vitamina E).'
      },
      {
        title: 'Paso 4: Busque atención veterinaria por congelación',
        content: 'Si las almohadillas parecen negras, muy pálidas sin retorno sanguíneo al presionar, o si su perro tiene dolor significativo, busque atención veterinaria inmediatamente. El tratamiento de congelación puede requerir manejo del dolor y antibióticos para prevenir infección secundaria.'
      }
    ],
    faqs: [
      {
        question: '¿Pueden las patas de los perros sufrir congelación?',
        answer: 'Sí, las patas de los perros son uno de los sitios más comunes de congelación canina. Las almohadillas tienen un aislamiento graso limitado y los vasos sanguíneos cercanos a la superficie fría se contraen rápidamente, reduciendo la oxigenación tisular. El riesgo de congelación comienza a temperaturas inferiores a -6°C (20°F) y aumenta con condiciones húmedas y sensación térmica. Los perros con condiciones preexistentes (diabetes, enfermedad cardíaca) tienen circulación deteriorada que acelera la aparición de congelación.'
      },
      {
        question: '¿Es dañina la sal de carretera para los perros?',
        answer: 'Sí — las sales de carretera comunes (cloruro de sodio y especialmente cloruro de calcio) causan quemaduras químicas al contacto con el tejido de las almohadillas y malestar gastrointestinal si se ingieren durante el acicalamiento. Los signos incluyen almohadillas enrojecidas y agrietadas, reticencia a caminar y lamido excesivo de patas. Use descongelantes seguros para mascotas (a base de urea) en su hogar y limpie las patas de su perro inmediatamente después de paseos cerca de superficies tratadas.'
      },
      {
        question: '¿Qué son las botas para perros y funcionan?',
        answer: 'Las botas para perros proporcionan aislamiento del frío, protección contra sal/químicos y tracción sobre hielo. Busque botas con: ajuste ceñido (no demasiado apretado), material transpirable, suela flexible y correas ajustables. Introdúzcalas gradualmente — muchos perros las rechazan inicialmente. Exposiciones cortas de 5 minutos en casa ayudan a que se adapten. Los perros con patas de pelaje grueso (Huskies, Malamutes) pueden sobrecalentarse con botas durante actividad vigorosa.'
      },
      {
        question: '¿Cómo puedo proteger las patas de mi perro sin botas?',
        answer: 'Aplique bálsamo para almohadillas (Musher\'s Secret, Musher\'s Choice) antes de cada paseo — crea una barrera de cera transpirable contra la sal y el hielo. Recorte el pelo interdigital para prevenir la formación de bolas de hielo. Limite la duración del paseo a 15-20 minutos en temperaturas inferiores a -4°C. Después de los paseos, lave las patas con agua tibia y seque bien, especialmente entre los dedos.'
      }
    ],
    relatedTools: [
      {
        name: 'Calculadora de calorías para perros',
        href: '/dog/calorie-calculator/',
        description: 'Ajuste para mayores necesidades energéticas invernales.'
      },
      {
        name: 'Verificador de alimentos tóxicos',
        href: '/shared/toxic-checker/',
        description: 'Verifique la seguridad de alimentos festivos invernales.'
      }
    ],
    bodyParagraphs: [
      'El invierno presenta un conjunto único de desafíos para la salud de las patas caninas que muchos dueños no consideran hasta que ocurre una lesión. Las mismas almohadillas que proporcionan tracción y retroalimentación sensorial en suelo cálido se vuelven vulnerables al daño por frío, quemaduras químicas y lesiones abrasivas cuando se exponen a temperaturas bajo cero, compuestos descongelantes y bordes afilados de hielo.',
      'Comprender la progresión de las lesiones invernales en las patas ayuda a los dueños a intervenir antes de que ocurra un daño permanente. La primera etapa es la simple sequedad y agrietamiento de las almohadillas — incómodo pero fácil de tratar. Sin protección, la exposición a la sal y al hielo progresa a dermatitis química, donde la piel de la almohadilla se inflama y puede ulcerarse. La exposición continua en frío extremo lleva a la congelación, donde el tejido se congela y puede requerir intervención veterinaria que incluya analgésicos y antibióticos.',
      'Un peligro frecuentemente pasado por alto es el efecto acumulativo de la exposición diaria. Un paseo de 15 minutos por aceras tratadas con sal puede causar una irritación mínima, pero hacer esto 5-7 días a la semana lleva a inflamación crónica y agrietamiento de las almohadillas. De manera similar, exposiciones cortas a frío moderado (-1 a 2°C) pueden causar congelación en tan solo 30 minutos cuando se combinan con condiciones húmedas y viento.'
    ]
  },
  'christmas-foods': {
    title: 'Alimentos navideños tóxicos para perros: guía de seguridad alimentaria festiva',
    description: 'Guía completa de alimentos navideños peligrosos para perros — chocolate, golosinas con xilitol, huesos cocidos, uvas, cebollas y alcohol. Incluye síntomas de emergencia y qué hacer si su perro ingirió un alimento navideño tóxico.',
    keywords: [
      'alimentos navideños tóxicos para perros',
      'perro comió chocolate navideño',
      'perro comió jamón navideño',
      'galletas navideñas con xilitol perros',
      'seguridad alimentaria festiva perros'
    ],
    severity: 'ALTO RIESGO',
    season: 'Temporada navideña (diciembre)',
    knowledgeCards: [
      {
        title: 'Alimentos navideños: tóxicos vs seguros',
        body: 'Los alimentos navideños más peligrosos para perros incluyen: chocolate (teobromina en todas sus formas — el chocolate para repostería es el más tóxico), xilitol en caramelos y pasteles sin azúcar (causa hipoglucemia a 0.1g/kg y fallo hepático), uvas y pasas en pudín navideño y pastel de frutas (causan fallo renal a 0.3-0.6 oz/kg), cebollas y ajo en relleno y salsa (causan anemia hemolítica), huesos cocidos (se astillan y perforan), nueces de macadamia en galletas y alcohol en ponche de huevo o pastel de ron.'
      },
      {
        title: 'Por qué la Navidad es temporada pico de emergencias',
        body: 'El Control de Envenenamiento de ASPCA reporta un aumento del 200-400% en intoxicaciones de mascotas relacionadas con festividades del 20 al 26 de diciembre en comparación con semanas normales. Causas principales: platos desatendidos en mesas bajas, cestas de regalo accesibles con chocolate, caramelos y chicles sin azúcar al alcance, invitados bienintencionados que dan "premios" y calcetines navideños con artículos tóxicos dejados al nivel del perro.'
      },
      {
        title: 'La escala de peligro del chocolate',
        body: 'Chocolate para repostería (sin azúcar): 28g causa toxicidad severa en un perro de 9kg. Chocolate negro (70%+): 57g para perro de 9kg. Chocolate con leche: 227g para perro de 9kg. Chocolate blanco: riesgo mínimo de teobromina, pero el contenido graso causa pancreatitis. Las cajas de bombones surtidos navideños son particularmente peligrosas porque contienen tipos mezclados — la ingestión de incluso una pieza de chocolate para repostería puede ser mortal.'
      },
      {
        title: 'Xilitol en la repostería navideña',
        body: 'Las galletas, pasteles y caramelos navideños sin azúcar contienen frecuentemente xilitol (azúcar de abedul), ahora popular en recetas keto y para diabéticos. Una sola galleta sin azúcar puede contener 5-10g de xilitol — tóxico para un perro de 14kg con solo 3g. El xilitol causa un aumento rápido de insulina que lleva a hipoglucemia en 15-30 minutos y, en dosis más altas, fallo hepático agudo en 12-24 horas.'
      }
    ],
    prevention: [
      'Mantenga todo el chocolate en armarios cerrados o estantes altos inaccesibles para perros',
      'Coloque los caramelos/galletas sin azúcar en recipientes sellados (no en cuencos decorativos)',
      'Informe a todos los invitados que NO está permitido alimentar al perro',
      'Asegure inmediatamente las bolsas de basura que contengan restos de comida',
      'Tenga un frasco de premios seguros para perros en la cocina para invitados que quieran dar golosinas',
      'Retire los platos de las mesas bajas inmediatamente después de las comidas',
      'Revise los calcetines navideños en busca de monedas de chocolate, bastones de caramelo (riesgo de xilitol) y pasas'
    ],
    symptoms: [
      'Vómitos y diarrea (dentro de 2-12 horas para la mayoría de toxinas)',
      'Hiperactividad, inquietud, ritmo cardíaco acelerado (chocolate, cafeína)',
      'Debilidad, colapso, convulsiones (hipoglucemia por xilitol)',
      'Sed excesiva, disminución de la micción (toxicidad por uvas/pasas)',
      'Encías pálidas, debilidad (anemia por cebolla/ajo — puede tardar 2-5 días)',
      'Dolor abdominal, heces con sangre (obstrucción por huesos o pancreatitis)',
      'Temblores, inestabilidad (toxicidad por alcohol o nueces de macadamia)'
    ],
    firstAid: [
      {
        title: 'Paso 1: Identifique qué se ingirió',
        content: 'Revise la lista de ingredientes inmediatamente. El tipo de chocolate, la presencia de xilitol, la cantidad de uvas/pasas y si se consumieron huesos determinan la gravedad de la emergencia. Tome una foto de la lista de ingredientes si está disponible.'
      },
      {
        title: 'Paso 2: Calcule la cantidad y el tiempo',
        content: 'Anote la cantidad aproximada consumida y el tiempo transcurrido desde la ingestión. Esta información es crítica para el Control de Envenenamiento de ASPCA y su veterinario para determinar si la dosis es tóxica y si se necesita intervención.'
      },
      {
        title: 'Paso 3: Contacte al Control de Envenenamiento inmediatamente',
        content: 'Llame al Control de Envenenamiento Animal de ASPCA al (888) 426-4435 o a la Línea de Ayuda de Envenenamiento de Mascotas al (855) 764-7661. NO espere a que aparezcan síntomas — la tratabilidad disminuye significativamente después de la ventana de absorción. NO induzca el vómito a menos que se lo indiquen.'
      },
      {
        title: 'Paso 4: Prepárese para la visita al veterinario',
        content: 'Si le indican ir al veterinario, lleve los envases/etiquetas y una muestra de vómito si está disponible. Mantenga a su perro calmado y confinado durante el transporte. Prepárese para posibles fluidos intravenosos, carbón activado y análisis de sangre.'
      }
    ],
    faqs: [
      {
        question: 'Mi perro comió chocolate de caramelos navideños. ¿Qué debo hacer?',
        answer: 'Llame inmediatamente al Control de Envenenamiento de ASPCA al (888) 426-4435 con: el peso de su perro, el tipo y cantidad de chocolate ingerido y el tiempo transcurrido desde la ingestión. NO espere síntomas. Si la cantidad supera el umbral tóxico para el tamaño de su perro (use nuestro verificador de tóxicos o pregunte a la línea de ayuda), acuda a un veterinario de emergencia para inducción de vómito y carbón activado. La teobromina del chocolate permanece en el sistema del perro hasta 72 horas.'
      },
      {
        question: '¿Son seguros los huesos de jamón navideño cocidos para los perros?',
        answer: 'No. Los huesos cocidos de cualquier tipo — incluyendo jamón, pavo y res — se vuelven quebradizos y se astillan, causando perforación potencialmente fatal de garganta, estómago o intestino. Incluso los huesos cocidos grandes pueden romper dientes. Deseche los restos de huesos en un contenedor exterior sellado y nunca arroje un hueso cocido a su perro.'
      },
      {
        question: '¿Es peligroso el pudín navideño para los perros?',
        answer: 'Extremadamente peligroso. El pudín navideño típicamente contiene uvas, pasas y grosellas (todas causan fallo renal en perros), alcohol (tóxico para el sistema nervioso), sebo (alto en grasa que causa pancreatitis) y a veces mantequilla de brandy (alcohol y grasa). Incluso un pequeño bocado puede ser tóxico. Mantenga el pudín bien alejado de los perros y asegúrese de que no haya trozos caídos accesibles.'
      },
      {
        question: '¿Pueden los perros comer pavo en Navidad?',
        answer: 'La carne de pavo simple, sin condimentar, en pequeñas cantidades (1-2 cucharadas para un perro mediano) es generalmente segura y no tóxica. Sin embargo: retire toda la piel (alta en grasa que causa pancreatitis), asegúrese de que no haya huesos incluidos y confirme que no se usó cebolla o ajo en la preparación (común en relleno y salsa, ambos tóxicos). No dé pavo preparado con hierbas, mantequilla, cebollas o ajo.'
      }
    ],
    relatedTools: [
      {
        name: 'Verificador de alimentos tóxicos',
        href: '/shared/toxic-checker/',
        description: 'Verifique cualquier ingrediente alimentario festivo al instante.'
      },
      {
        name: 'Calculadora de calorías para perros',
        href: '/dog/calorie-calculator/',
        description: 'Registre las calorías extra de golosinas festivas.'
      },
      {
        name: 'Emergencia: Comió chocolate',
        href: '/dog/emergency/ate-chocolate/',
        description: 'Guía completa de emergencia por toxicidad de chocolate.'
      }
    ],
    bodyParagraphs: [
      'La temporada navideña crea una tormenta perfecta de riesgo de envenenamiento para mascotas: abundantes alimentos tóxicos son fácilmente accesibles, las rutinas del hogar se interrumpen y los invitados que no conocen las normas de seguridad para mascotas pueden alimentar inadvertidamente con artículos peligrosos. Los datos de ASPCA muestran que la semana entre Navidad y Año Nuevo produce consistentemente el mayor volumen de llamadas por envenenamiento de mascotas durante todo el año.',
      'Muchos alimentos navideños tradicionales son peligrosos individualmente, pero el mayor riesgo proviene de la combinación. Un solo pudín navideño contiene uvas (toxina de fallo renal), alcohol (neurotoxina) y sebo (desencadenante de pancreatitis). De manera similar, una bandeja de galletas festivas podría tener trocitos de chocolate (teobromina), galletas sin azúcar (xilitol) y nueces de macadamia (neurotoxina) — cada una de diferentes categorías tóxicas que requieren tratamientos diferentes.',
      'La prevención es drásticamente más efectiva que el tratamiento en escenarios de envenenamiento festivo. Las toxinas involucradas (teobromina, xilitol, toxina de uva) no tienen antídotos — el tratamiento se basa en la descontaminación temprana (vómito inducido), cuidados de soporte (fluidos IV) y tiempo. Los dueños que implementan barreras simples (armarios cerrados, educación de invitados, basura sellada) eliminan el 90% del riesgo de envenenamiento.'
    ]
  },
  'halloween-candy': {
    title: 'Mi perro comió caramelos de Halloween: plan de acción de emergencia',
    description: 'Guía de emergencia para perros que ingirieron caramelos de Halloween — reconocer signos de toxicidad, cuándo correr al veterinario, qué tipos de caramelos son más peligrosos y cómo prevenir emergencias con mascotas en Halloween.',
    keywords: [
      'perro comió caramelos de halloween',
      'caramelos de halloween tóxicos para perros',
      'perro comió chocolate halloween',
      'xilitol caramelos halloween perro',
      'emergencia mascotas halloween'
    ],
    severity: 'RIESGO CRÍTICO',
    season: 'Halloween (octubre)',
    knowledgeCards: [
      {
        title: 'Los cuatro grandes tipos de caramelos tóxicos',
        body: '1) Chocolate (todas las formas — toxicidad por teobromina). 2) Xilitol (chicles y caramelos sin azúcar — hipoglucemia y fallo hepático). 3) Pasas (algunas cajas de bocadillos — fallo renal). 4) Envoltorios de caramelos (papel aluminio/plástico causan obstrucción intestinal). Un solo chicle con xilitol puede ser fatal para un perro de 7kg según datos de ASPCA.'
      },
      {
        title: 'Factores de riesgo específicos de Halloween',
        body: 'Las bolsas de truco o trato colocadas en el suelo o mesas bajas, los cuencos de caramelos desatendidos en las puertas, los niños que dejan caer piezas al suelo y los momentos de "compartir caramelos" con perros crean el pico de riesgo de envenenamiento en Halloween. ASPCA reporta que Halloween es uno de los 3 días principales de envenenamiento de mascotas anualmente. La combinación de alto volumen de caramelos y supervisión interrumpida aumenta la exposición drásticamente.'
      },
      {
        title: 'Peligros de los envoltorios de caramelos',
        body: 'Los envoltorios de papel aluminio y plástico a menudo se consumen junto con los caramelos. En perros pequeños, unos pocos envoltorios pueden causar obstrucción intestinal que requiere extracción quirúrgica. El papel aluminio también puede contener chocolate residual que se absorbe. Síntomas de obstrucción: vómitos (especialmente repetidos), ausencia de deposiciones, letargo y dolor abdominal en 12-48 horas.'
      },
      {
        title: 'Riesgo combinado de chocolate + xilitol',
        body: 'Muchos surtidos de caramelos de Halloween contienen tanto artículos cubiertos de chocolate como chicles/caramelos sin azúcar. Si su perro come de una bolsa mezclada, puede estar expuesto tanto a teobromina (del chocolate) COMO a xilitol (de artículos sin azúcar). Esta combinación es particularmente peligrosa porque los síntomas se superponen (vómitos, debilidad) pero los tratamientos difieren significativamente.'
      }
    ],
    prevention: [
      'Guarde todos los caramelos de truco o trato en recipientes cerrados por encima de la altura de la encimera',
      'Use un cuenco de caramelos cerrado con tapa ajustada para los niños (no cuencos abiertos)',
      'Mantenga a los perros en una habitación separada durante las horas de truco o trato',
      'Inspeccione el botín de su hijo en busca de piezas caídas inmediatamente después de regresar a casa',
      'Nunca dé caramelos a su perro de su mano o plato',
      'Considere premios calmantes o difusores de feromonas para perros estresados por el ruido del timbre',
      'Conozca el número de emergencia de su veterinario y el Control de Envenenamiento de ASPCA ((888) 426-4435) con anticipación'
    ],
    symptoms: [
      'Vómitos o diarrea dentro de 2-12 horas',
      'Respiración rápida, ritmo cardíaco elevado, inquietud (chocolate/teobromina)',
      'Letargo, debilidad, colapso en 15-30 minutos (hipoglucemia por xilitol)',
      'Sed y micción excesivas seguidas de disminución de la micción (toxicidad por pasas)',
      'Vómitos repetidos sin deposición (posible obstrucción)',
      'Temblores, convulsiones (toxicidad severa por chocolate o xilitol)',
      'Distensión o dolor abdominal'
    ],
    firstAid: [
      {
        title: 'Paso 1: Evalúe qué se ingirió',
        content: 'Identifique inmediatamente el tipo de caramelo: chocolate (con leche/negro/repostería), chicle (verifique xilitol en los primeros 3 ingredientes), pasas o envoltorios. Conserve todos los envases — las listas de ingredientes y la información de peso son críticas.'
      },
      {
        title: 'Paso 2: Llame al Control de Envenenamiento antes de actuar',
        content: 'Llame al Control de Envenenamiento de ASPCA al (888) 426-4435. NO induzca el vómito en casa — esto puede empeorar ciertas exposiciones a toxinas. Solo induzca el vómito si lo indica un profesional, y nunca si su perro ya está vomitando, convulsionando o inconsciente.'
      },
      {
        title: 'Paso 3: Anote el momento y la cantidad',
        content: 'Calcule cuántas piezas se consumieron, de qué tipo (por peso) y cuándo. Tome fotos del envase para llevar al veterinario. Esta información determina la gravedad de la toxicidad y el protocolo de tratamiento.'
      },
      {
        title: 'Paso 4: Traslade al veterinario de emergencia si se lo indican',
        content: 'Si el Control de Envenenamiento le indica que vaya al veterinario, acuda inmediatamente — no espere síntomas. La toxicidad por chocolate y xilitol es tiempo-dependiente. La inducción de vómito es más efectiva dentro de 1-2 horas de la ingestión.'
      }
    ],
    faqs: [
      {
        question: '¿Cuánto caramelo de Halloween es tóxico para un perro?',
        answer: 'Depende del tipo, no solo de la cantidad. Umbrales tóxicos: Xilitol: 0.1g/kg de peso corporal (un chicle para un perro de 7kg). Chocolate negro: 14g por cada 4.5kg de peso corporal. Chocolate para repostería: 3g por cada 4.5kg de peso corporal. Chocolate con leche: 28g por cada 4.5kg de peso corporal. Pasas: 3g por cada 4.5kg de peso corporal. Envoltorios de caramelos: cualquier cantidad puede causar obstrucción en perros pequeños.'
      },
      {
        question: 'Mi perro comió envoltorios de caramelos de chocolate. ¿Qué debo hacer?',
        answer: 'Llame al Control de Envenenamiento al (888) 426-4435 con el tipo de chocolate y la cantidad estimada consumida. Los envoltorios añaden dos preocupaciones: (1) el papel aluminio/plástico puede causar obstrucción intestinal, especialmente en perros de menos de 7kg; (2) el chocolate residual absorbido de los envoltorios se suma a la carga de teobromina. Monitoree vómitos, ausencia de deposiciones y dolor abdominal durante 48 horas.'
      },
      {
        question: '¿Puedo hacer vomitar a mi perro en casa después de comer caramelos?',
        answer: 'NO induzca el vómito en casa con peróxido de hidrógeno o sal a menos que se lo indique específicamente un veterinario o el Control de Envenenamiento. Inducir el vómito está contraindicado para: sustancias cáusticas, si su perro ya está vomitando, si su perro está letárgico o convulsionando, o si han pasado más de 2 horas. Una técnica inadecuada puede causar neumonía por aspiración o empeorar la lesión.'
      },
      {
        question: '¿Qué tan rápido afecta la toxicidad de los caramelos a los perros?',
        answer: 'Xilitol: 15-30 minutos (hipoglucemia) o 8-12 horas (fallo hepático). Chocolate: 2-4 horas (aparecen síntomas), pico a las 12-24 horas. Pasas: 6-24 horas (vómitos), daño renal a las 24-72 horas. Envoltorios: 12-48 horas (síntomas de obstrucción). Trate siempre la ingestión de caramelos como una emergencia y contacte al Control de Envenenamiento inmediatamente.'
      }
    ],
    relatedTools: [
      {
        name: 'Verificador de alimentos tóxicos',
        href: '/shared/toxic-checker/',
        description: 'Verifique la toxicidad de cualquier ingrediente de caramelos al instante.'
      },
      {
        name: 'Emergencia: Comió xilitol',
        href: '/dog/emergency/ate-xylitol/',
        description: 'Protocolo de emergencia por envenenamiento con xilitol.'
      },
      {
        name: 'Emergencia: Comió chocolate',
        href: '/dog/emergency/ate-chocolate/',
        description: 'Guía de emergencia por toxicidad de chocolate.'
      }
    ],
    bodyParagraphs: [
      'Halloween presenta uno de los escenarios de mayor riesgo para envenenamiento de mascotas durante todo el año. La convergencia de abundantes sustancias tóxicas (chocolate, xilitol, pasas), rutinas domésticas interrumpidas y niños que pueden no reconocer el peligro crea condiciones donde incluso los perros bien cuidados pueden ingerir rápidamente cantidades de toxinas potencialmente mortales.',
      'El riesgo del xilitol merece un énfasis especial porque los caramelos y chicles sin azúcar son cada vez más comunes en los surtidos de Halloween. A diferencia del chocolate, donde la cantidad necesaria para la toxicidad es relativamente grande, el xilitol es tóxico en cantidades minúsculas — una sola pieza de ciertas marcas de chicle sin azúcar contiene suficiente xilitol para causar hipoglucemia fatal en un perro pequeño en 30 minutos. Muchos dueños no se dan cuenta de que su perro ha comido chicle porque los envoltorios se desechan separados del chicle mismo.',
      'El reconocimiento y la respuesta rápidos mejoran drásticamente los resultados. Los perros tratados dentro de 1-2 horas de la ingestión de xilitol tienen un pronóstico excelente; el retraso del tratamiento más allá de 6 horas aumenta significativamente la mortalidad. La ingestión de chocolate sigue una curva de tiempo-sensibilidad similar — el vómito inducido dentro de 1 hora elimina el 40-50% del contenido estomacal, pero la efectividad cae a casi cero después de 2 horas cuando el vaciado gástrico ha ocurrido.'
    ]
  },
  'fireworks-anxiety': {
    title: 'Cómo calmar a un perro durante los fuegos artificiales: guía de manejo de ansiedad',
    description: 'Guía completa para manejar la ansiedad canina por fuegos artificiales — desde estrategias de prevención y manejo ambiental hasta medicamentos, técnicas conductuales y qué hacer si su perro entra en pánico.',
    keywords: [
      'cómo calmar perro durante fuegos artificiales',
      'tratamiento ansiedad perros fuegos artificiales',
      'perro asustado fuegos artificiales',
      'fobia perros truenos fuegos artificiales',
      'seguridad perros noche fuegos artificiales'
    ],
    severity: 'RIESGO MODERADO-ALTO',
    season: 'Año Nuevo y celebraciones festivas (dic/ene, 4 de julio)',
    knowledgeCards: [
      {
        title: 'Comprendiendo la fobia canina al ruido',
        body: 'Según estudios conductuales, el 40-60% de los perros muestran respuestas de miedo a fuegos artificiales o tormentas eléctricas. De estos, aproximadamente el 20% desarrolla fobia clínica al ruido que requiere intervención. Los fuegos artificiales son particularmente angustiantes porque: (1) los estallidos fuertes repentinos e impredecibles activan el reflejo de sobresalto, (2) las vibraciones de baja frecuencia se sienten a través del cuerpo, (3) las luces intermitentes crean un efecto estroboscópico que los perros perciben como amenazante y (4) la acumulación de electricidad estática en algunos perros aumenta la incomodidad.'
      },
      {
        title: 'Peligros físicos del pánico por fuegos artificiales',
        body: 'Los perros con ansiedad por fuegos artificiales corren el riesgo de: huir (el 50% de los incidentes de perros perdidos el 4 de julio están relacionados con fuegos artificiales según AKC), lanzarse al tráfico, saltar cercas (incluso perros que normalmente no escapan), lesionarse con ventanas o puertas al intentar huir y, en casos extremos, eventos cardíacos por la respuesta de estrés. Algunos perros se rompen dientes o uñas al intentar morder puertas o jaulas.'
      },
      {
        title: 'Cuando la ansiedad se convierte en fobia',
        body: 'Señales de que su perro ha pasado de ansioso a fóbico: la ansiedad anticipatoria comienza horas antes del anochecer, se niega a salir por la tarde, se esconde en lugares inaccesibles, muestra signos de estrés incluso con reproducción de sonido a muy bajo volumen y la ansiedad generalizada se extiende más allá de las noches de fuegos artificiales hacia una hipervigilancia general. Los perros fóbicos a menudo requieren medicación (recetada por su veterinario) combinada con modificación conductual.'
      },
      {
        title: 'Medicación vs opciones naturales',
        body: 'Para ansiedad de segmento moderado: los medicamentos situacionales recetados por veterinarios (trazodona, gabapentina, sileo) son efectivos y seguros. Para ansiedad leve: difusores de feromonas (Adaptil), envolturas de compresión (ThunderShirt), suplementos de L-teanina y premios calmantes pueden ayudar. Para perros fóbicos: se requiere un enfoque multimodal que combine medicación + manejo ambiental + entrenamiento de desensibilización durante semanas/meses.'
      }
    ],
    prevention: [
      'Ejercite bien a su perro antes de que comiencen los fuegos artificiales (el agotamiento reduce la respuesta de ansiedad)',
      'Cree una "habitación segura" — habitación interior sin ventanas, ruido blanco, cama familiar',
      'Comience el entrenamiento de desensibilización 4-6 semanas antes de las fechas conocidas de fuegos artificiales (no durante)',
      'Use el difusor de feromonas Adaptil 2 semanas antes de los eventos previstos',
      'Asegúrese de que la información del microchip esté actualizada y las placas de identificación del collar estén vigentes',
      'Cierre cortinas/persianas y encienda la televisión o música para enmascarar el ruido',
      'Elimine el acceso a ventanas y puertas de vidrio'
    ],
    symptoms: [
      'Jadeo, deambulación, temblores',
      'Lloriqueos, ladridos a los sonidos',
      'Intentos de esconderse o escapar',
      'Rechazo de comida o premios',
      'Babeo excesivo, pupilas dilatadas',
      'Aferrarse al dueño o intentar subirse al regazo',
      'Incontinencia (pérdida de control de la vejiga en miedo severo)',
      'Comportamiento destructivo (morder puertas, arañar paredes)'
    ],
    firstAid: [
      {
        title: 'Paso 1: Mantenga la calma y la confianza',
        content: 'Su perro toma señales emocionales de usted. Hable en un tono alegre y casual en lugar de calmante (el tono calmante valida el miedo). No castigue el comportamiento de ansiedad — su perro está experimentando terror genuino, no mal comportamiento.'
      },
      {
        title: 'Paso 2: Proporcione un espacio de refugio seguro',
        content: 'Guíe a su perro a una habitación interior tranquila con la puerta cerrada. Encienda un televisor o máquina de ruido blanco a volumen moderado. Proporcione su cama o jaula favorita con la puerta abierta (nunca fuerce a un perro a entrar en una jaula — esto aumenta el pánico si la asocian con confinamiento durante el miedo).'
      },
      {
        title: 'Paso 3: Use técnicas de distracción',
        content: 'Ofrezca premios de alto valor (Kong con mantequilla de maní, premios congelados) para redirigir el enfoque. Practique comandos básicos que su perro conozca bien — "sentado", "toca" o "búscalo" redirigen el cerebro del miedo al trabajo. No fuerce la interacción si su perro prefiere esconderse.'
      },
      {
        title: 'Paso 4: Prevenga el escape',
        content: 'Si su perro se lanza hacia una puerta, use una correa o bloqueo corporal — nunca lo persiga, ya que esto intensifica el pánico. Después de que terminen los fuegos artificiales, verifique que su perro esté calmado antes de abrir puertas exteriores. Monitoree durante 20-30 minutos después del último ruido antes de permitir el acceso al exterior.'
      }
    ],
    faqs: [
      {
        question: '¿Qué puedo darle a mi perro para la ansiedad por fuegos artificiales?',
        answer: 'Las opciones varían según la gravedad: Leve: suplementos de L-teanina (Anxitane, Solliquin), feromonas (difusor/collar Adaptil), envolturas de compresión (ThunderShirt). Moderada: trazodona o gabapentina recetada por su veterinario (tarda 1-2 horas en hacer efecto). Severa: Sileo (gel de dexmedetomidina en encías, aprobado por la FDA para aversión al ruido canino) o sedación. Nunca administre medicamentos ansiolíticos humanos sin orientación veterinaria.'
      },
      {
        question: '¿Cuánto tiempo antes de los fuegos artificiales debo darle a mi perro medicación para la ansiedad?',
        answer: 'Planifique con anticipación: trazodona/gabapentina requieren 1-2 horas para alcanzar efectividad. Adminístrelas ANTES de que comiencen los fuegos artificiales — una vez que su perro está en modo de pánico total, los medicamentos orales son difíciles de administrar y tardan demasiado en hacer efecto. Para fechas conocidas de fuegos artificiales (Año Nuevo, 4 de julio), comience la medicación 2-3 horas antes del anochecer.'
      },
      {
        question: '¿Cómo puedo desensibilizar a mi perro a los fuegos artificiales?',
        answer: 'La desensibilización requiere comenzar 8-12 semanas antes de la temporada de fuegos artificiales: (1) Reproduzca sonidos de fuegos artificiales a muy bajo volumen (apenas audible) durante actividades positivas (alimentación, juego). (2) A lo largo de semanas, aumente gradualmente el volumen. (3) Si su perro muestra miedo en cualquier nivel, reduzca el volumen — esto significa que progresó demasiado rápido. (4) Asocie los sonidos con premios de alto valor para crear una asociación positiva. Considere contratar a un conductista certificado para fobias severas.'
      },
      {
        question: '¿Los fuegos artificiales dañan la audición de mi perro?',
        answer: 'Los fuegos artificiales alcanzan 150-175 dB — lo suficientemente fuertes para causar daño auditivo permanente (el umbral de dolor para perros es aproximadamente 130 dB, más bajo que el de los humanos). Los perros tienen una audición más sensible y más amplificación del canal auditivo. Esta es otra razón por la que los perros entran en pánico — físicamente les duele. Nunca permita que su perro observe fuegos artificiales, incluso al aire libre a distancia.'
      }
    ],
    relatedTools: [
      {
        name: 'Calculadora de edad canina',
        href: '/dog/age-calculator/',
        description: 'Los perros mayores pueden necesitar ajuste de dosis de medicación ansiolítica.'
      }
    ],
    bodyParagraphs: [
      'La ansiedad por fuegos artificiales en perros es uno de los problemas de comportamiento más comunes reportados por dueños de mascotas y conlleva riesgos físicos genuinos más allá del malestar. Cada año, los refugios de animales reportan aumentos del 30-60% en ingresos de perros perdidos alrededor del 4 de julio en Estados Unidos, y patrones similares ocurren alrededor de las celebraciones de Año Nuevo y otras festividades con fuegos artificiales en todo el mundo.',
      'La progresión de ansiedad leve a fobia severa a menudo ocurre gradualmente: un perro que inicialmente temblaba pero se recuperaba desarrolla ansiedad anticipatoria horas antes de los eventos, luego comienza a mostrar estrés en cualquier tarde que se parezca a una noche de fuegos artificiales. La intervención temprana con herramientas apropiadas previene esta escalada. Los perros que han sufrido episodios de pánico pueden tener hormonas de estrés elevadas durante días después, afectando la función inmunológica y la calidad del sueño.',
      'Es importante entender que consolar a un perro asustado no refuerza el miedo — este es un mito persistente que hace que los dueños ignoren la angustia de su perro. Los perros que experimentan fobia al ruido están en terror genuino, no buscando atención. Proporcionar un espacio seguro y una presencia tranquila les ayuda a sentirse seguros. Sin embargo, el consuelo exageradamente dramático ("¿Quién es un buen chico? No te preocupes, todo está bien") puede interpretarse como ansiedad — en su lugar, actúe como si todo fuera normal.'
    ]
  },
  'spring-allergies': {
    title: 'Alergias primaverales caninas: síntomas, tratamiento y prevención',
    description: 'Guía completa de alergias primaverales caninas — polen, césped, moho. Aprenda a identificar síntomas de alergia, distinguirlos de infecciones e implementar planes de tratamiento efectivos basados en guías de dermatología veterinaria.',
    keywords: [
      'síntomas alergias primaverales perros',
      'tratamiento alergia polen perros',
      'alergias estacionales perros primavera',
      'dermatitis atópica canina',
      'alergias cutáneas perros'
    ],
    severity: 'RIESGO CRÓNICO',
    season: 'Primavera (marzo–mayo)',
    knowledgeCards: [
      {
        title: 'Tipos de alergias primaverales en perros',
        body: 'Las alergias primaverales caninas se dividen en tres categorías: (1) Dermatitis atópica — reacción alérgica por inhalación al polen (árboles, césped, malezas), que afecta la piel y los oídos. (2) Alergias de contacto — reacción cutánea directa al césped, mantillo o pesticidas. (3) Dermatitis alérgica por pulgas — la explosión de población de pulgas en primavera desencadena reacciones severas incluso por picaduras únicas. Al menos el 10-15% de los perros sufren alergias estacionales según datos de AAHA.'
      },
      {
        title: 'Calendario común de alérgenos primaverales',
        body: 'El polen de árboles alcanza su pico en marzo–abril (roble, abedul, cedro, arce). El polen de césped alcanza su pico en mayo–junio (Bermuda, Timothy, pasto azul de Kentucky). El polen de malezas comienza a finales de junio. Las esporas de moho aumentan con las lluvias primaverales. Conocer su calendario local de polen (consulte pollen.com) ayuda a predecir cuándo brotarán los síntomas de su perro y permite un tratamiento preventivo.'
      },
      {
        title: 'Infecciones secundarias: el peligro oculto',
        body: 'La piel alérgica crea ambientes cálidos, húmedos e inflamados ideales para el sobrecrecimiento bacteriano (Staphylococcus) y de levaduras (Malassezia). Los estudios muestran que el 60-80% de los perros con dermatitis atópica desarrollan infecciones secundarias que perpetúan el ciclo de picazón incluso después de que disminuye la exposición al alérgeno. Signos de infección secundaria: piel grasa, olor dulce/a levadura, piel oscura/decolorada y picazón persistente incluso en días de bajo polen.'
      },
      {
        title: 'El patrón pata-lame-oído-rasca',
        body: 'La presentación clásica de alergias primaverales caninas: lamido excesivo de patas (especialmente entre los dedos), infecciones de oído (sacudir la cabeza, frotar orejas contra muebles) y rascado en flancos/axilas. Este patrón específico distingue las alergias de otras afecciones cutáneas. Si observa los tres ocurriendo simultáneamente en primavera, las alergias estacionales son la causa probable.'
      }
    ],
    prevention: [
      'Limpie las patas con un paño húmedo después de cada paseo al aire libre para eliminar el polen',
      'Bañe al perro semanalmente con champú hipoalergénico durante las semanas de pico de polen',
      'Mantenga las ventanas cerradas en días de alto polen; use filtración HEPA en interiores',
      'Evite caminar sobre césped recién cortado o malezas altas',
      'Lave la ropa de cama del perro semanalmente con agua caliente durante la temporada de alergias',
      'Pregunte a su veterinario sobre comenzar antihistamínicos ANTES de que comience el pico de polen',
      'Maneje la prevención de pulgas agresivamente en primavera (una sola picadura de pulga empeora la inflamación alérgica)'
    ],
    symptoms: [
      'Lamido y mordisqueo excesivo de patas',
      'Infecciones de oído recurrentes (sacudir la cabeza, olor en oídos)',
      'Piel roja e irritada en axilas, ingle y vientre',
      'Picazón y rascado en flancos (costados)',
      'Ojos llorosos o secreción nasal',
      'Frotar la cara contra muebles o alfombra',
      'Pérdida de pelo por rascado o lamido',
      'Piel grasa con olor inusual (signo de infección secundaria)'
    ],
    firstAid: [
      {
        title: 'Paso 1: Evalúe la gravedad',
        content: 'Leve: Rascado ocasional pero come y juega normalmente. Moderada: Picazón persistente, sueño interrumpido, enrojecimiento leve de la piel. Grave: Heridas abiertas, piel sangrante, rechazo a comer, malestar constante. Las alergias graves requieren tratamiento recetado por veterinario — no solo cuidados caseros.'
      },
      {
        title: 'Paso 2: Medidas de alivio inmediato',
        content: 'Administre un baño fresco (no frío) con champú a base de avena coloidal para eliminar el polen y calmar la piel. Limpie las patas con un paño húmedo después de los paseos. Aplique una compresa fría en los puntos calientes. Use un collar isabelino (cono) si su perro no deja de lamer un punto caliente.'
      },
      {
        title: 'Paso 3: Monitoree signos de infección',
        content: 'Revise las áreas irritadas diariamente en busca de: secreción grasa o costrosa, olor dulce/a levadura y oscurecimiento del color de la piel. Estos indican infección bacteriana o por levaduras secundaria que requiere antibióticos o antifúngicos recetados por veterinario — no solo manejo de alergia.'
      },
      {
        title: 'Paso 4: Programe una cita veterinaria',
        content: 'Si los síntomas persisten más de 1 semana a pesar del manejo básico, o si aparecen signos secundarios, programe una visita al veterinario. Su veterinario puede recetar Apoquel (oclacitinib), inyecciones de Cytopoint (anti-IL-31) o inmunoterapia para alergias (vacunas antialérgicas) para control a largo plazo.'
      }
    ],
    faqs: [
      {
        question: '¿Cómo sé si mi perro tiene alergias primaverales o una infección?',
        answer: 'Las alergias estacionales siguen un patrón: los síntomas reaparecen cada primavera/verano, el lamido de patas y la afectación de oídos son prominentes y la respuesta a antihistamínicos es rápida. Las infecciones típicamente tienen olor localizado, secreción y piel grasa. El signo revelador es que los síntomas persistan fuera de la temporada de alergias — esto sugiere dermatitis atópica (alergias todo el año) o enfermedad cutánea no alérgica que requiere diagnóstico veterinario.'
      },
      {
        question: '¿Puedo darle a mi perro Benadryl (difenhidramina) para las alergias?',
        answer: 'Sí, la difenhidramina (Benadryl) se usa comúnmente en perros a 1mg por libra de peso corporal cada 8-12 horas. Use solo difenhidramina simple — evite fórmulas con descongestionantes (pseudoefedrina) o alcohol, que son tóxicos. Benadryl ayuda al 30% de los perros alérgicos. Mejores opciones recetadas por veterinarios incluyen Apoquel (oclacitinib) e inyecciones de Cytopoint que atacan la picazón más específicamente. Siempre confirme la dosificación con su veterinario primero.'
      },
      {
        question: '¿Cuándo es peor la temporada de alergias primaverales para los perros?',
        answer: 'La temporada pico de alergias primaverales para perros en Norteamérica es abril–junio cuando el polen de árboles y el polen temprano de césped son más altos. En climas más cálidos, las temporadas de alergia comienzan antes (febrero) y duran más. El verano y otoño traen sus propios picos de alérgenos. Registre los síntomas de su perro durante todo el año — si ocurren por más de 3 meses, pueden haberse convertido en alergias anuales en lugar de verdaderamente estacionales.'
      },
      {
        question: '¿Ciertas razas tienen peores alergias primaverales?',
        answer: 'Sí — las razas predispuestas a dermatitis atópica incluyen: West Highland White Terriers, Bulldogs Franceses, Bulldogs, Golden Retrievers, Labrador Retrievers, Pastores Alemanes, Cocker Spaniels, Boxers y Boston Terriers. Las razas braquicéfalas (bulldogs, pugs) a menudo tienen dermatitis concurrente de pliegues cutáneos que empeora con la inflamación alérgica. La intervención temprana en estas razas es especialmente importante.'
      }
    ],
    relatedTools: [
      {
        name: 'Calculadora de calorías para perros',
        href: '/dog/calorie-calculator/',
        description: 'Ajuste la alimentación si las alergias causan pérdida de peso por estrés.'
      }
    ],
    bodyParagraphs: [
      'Las alergias primaverales en perros representan un problema significativo de calidad de vida que a menudo se trata insuficientemente porque los dueños confunden el rascado crónico con un comportamiento normal. A diferencia de los humanos que experimentan principalmente síntomas respiratorios (estornudos, congestión nasal), los perros manifiestan predominantemente las alergias a través de su piel. Esta diferencia en la presentación significa que las alergias caninas a menudo se diagnostican erróneamente como problemas de higiene en lugar de una verdadera enfermedad alérgica.',
      'El "ciclo de picazón-rascado" perpetúa la enfermedad alérgica de la piel más allá de la exposición inicial al alérgeno. Rascarse daña la barrera cutánea, permitiendo que bacterias y levaduras colonicen, lo que desencadena más inflamación y picazón. Es por esto que los perros alérgicos que inicialmente solo se rascan en primavera pueden desarrollar problemas cutáneos durante todo el año si desarrollan infecciones secundarias crónicas que no se resuelven por sí solas.',
      'El manejo moderno de alergias veterinarias ha avanzado más allá de la simple supresión de síntomas. Tratamientos como Cytopoint (una inyección de anticuerpo monoclonal que ataca la IL-31, la principal citocina de la picazón) proporcionan alivio dirigido sin los efectos secundarios de los esteroides a largo plazo. Apoquel (oclacitinib) ataca múltiples vías inflamatorias en 4 horas. Estas opciones de prescripción son más efectivas que los antihistamínicos de venta libre para casos moderados a severos.'
    ]
  },
  'thanksgiving': {
    title: 'Alimentos de Acción de Gracias que los perros pueden comer: guía de alimentos seguros vs peligrosos',
    description: 'Guía completa de seguridad alimentaria de Acción de Gracias para perros — qué alimentos son seguros (pavo simple, calabaza, judías verdes), cuáles son tóxicos (uvas, cebollas, mantequilla, alcohol) y consejos de control de porciones. Incluye pasos de emergencia para ingestión tóxica.',
    keywords: [
      'alimentos de acción de gracias que los perros pueden comer',
      'perro comió pavo de acción de gracias',
      'alimentos seguros de acción de gracias para perros',
      'perro comió relleno de acción de gracias',
      'es seguro el pavo de acción de gracias para perros'
    ],
    severity: 'ALTO RIESGO',
    season: 'Acción de Gracias (noviembre)',
    knowledgeCards: [
      {
        title: 'Alimentos de Acción de Gracias: alimentos seguros para perros',
        body: 'Seguros para perros (en pequeñas porciones): Carne de pavo simple sin condimentar (blanca u oscura), judías verdes simples (cocidas, sin mantequilla/ajo), batata simple (cocida, sin malvaviscos), calabaza simple (puré de calabaza puro, no la variedad endulzada), zanahorias cocidas (sin mantequilla) y arroz blanco simple. Todo debe ser sin condimentos, sin mantequilla y servido en pequeñas cantidades — aproximadamente 1-2 cucharadas por cada 9kg de peso corporal.'
      },
      {
        title: 'Alimentos de Acción de Gracias: alimentos peligrosos o tóxicos para perros',
        body: 'Peligrosos/tóxicos: relleno (cebolla, ajo, salvia), salsa (ajo, cebolla, grasa), puré de papas (mantequilla, ajo, cebollino), batatas confitadas con malvaviscos (azúcar, xilitol en algunas), panecillos (la masa se expande y la levadura fermenta), salsa de arándanos (alto en azúcar, a veces con uva/xilitol), pastel de calabaza (la nuez moscada es tóxica, más azúcar/grasa), postres de chocolate, pasteles de nueces de macadamia y cualquier alimento con cebolla o ajo.'
      },
      {
        title: 'El peligro de la masa: expansión de levadura cruda',
        body: 'La masa de panecillos sin hornear es extremadamente peligrosa para los perros. El ambiente cálido y húmedo del estómago del perro hace que la levadura fermente, produciendo alcohol (toxicosis por etanol) Y masa en expansión que puede bloquear el estómago. Síntomas: abdomen distendido, vómitos, desorientación y tambaleo. Un solo trozo de masa del tamaño de un panecillo puede causar intoxicación alcohólica en un perro de 9kg.'
      },
      {
        title: 'Toxicidad por grasa y pancreatitis',
        body: 'Los alimentos de Acción de Gracias son típicamente muy altos en grasa (mantequilla, aceite, salsa, piel de pavo). La ingesta alta de grasa es el desencadenante dietético #1 de la pancreatitis canina, una inflamación pancreática potencialmente mortal. La pancreatitis típicamente se presenta 12-72 horas después de la comida grasosa con: vómitos severos, dolor abdominal (posición de rezo), letargo y fiebre. Requiere atención veterinaria inmediata con fluidos IV y manejo del dolor.'
      }
    ],
    prevention: [
      'Prepare un pequeño plato de alimentos seguros antes de que comience la comida (pavo simple, judías verdes, batata simple)',
      'Colóquelo con anticipación en un lugar alejado de la mesa para evitar que mendigue en la mesa',
      'Instruya a los invitados que la política de "nada de sobras de mesa" está vigente por razones de salud',
      'Deseche todos los huesos de pavo y restos de comida en un contenedor exterior inmediatamente',
      'Retire los platos de la mesa rápidamente — los perros son oportunistas',
      'No permita que los perros accedan a la cocina o al comedor durante la cocción y el servicio de comidas',
      'Monitoree los sistemas de eliminación de basura — los perros pueden acceder a residuos de comida en botes de basura abiertos'
    ],
    symptoms: [
      'Vómitos (especialmente repetidos) o diarrea dentro de 2-24 horas',
      'Dolor abdominal demostrado por "posición de rezo" (parte delantera abajo, trasera arriba)',
      'Letargo severo, debilidad o reticencia a moverse',
      'Abdomen distendido o hinchado (posible torsión o expansión de masa)',
      'Temblores, desorientación (alcohol de masa fermentada)',
      'Sed o micción excesiva seguida de ninguna (toxicidad por uva — 24-48 horas)',
      'Encías pálidas, debilidad, respiración rápida (anemia por cebolla/ajo — 2-5 días)'
    ],
    firstAid: [
      {
        title: 'Paso 1: Identifique qué comió su perro',
        content: 'Verifique rápidamente qué quedó desatendido. La salsa, el relleno y las verduras con mantequilla indican exposición alta en grasa (riesgo de pancreatitis). Si se comió masa, la intoxicación alcohólica es una preocupación. Si se consumieron uvas/pasas, riesgo de fallo renal. Priorice según la toxina específica identificada.'
      },
      {
        title: 'Paso 2: Llame al Control de Envenenamiento',
        content: 'Control de Envenenamiento Animal de ASPCA: (888) 426-4435. Proporcione: peso del perro, qué se comió, cantidad estimada y tiempo desde la ingestión. Las comidas altas en grasa requieren monitoreo durante 72 horas para pancreatitis incluso si no aparecen síntomas inmediatos.'
      },
      {
        title: 'Paso 3: No espere a los síntomas',
        content: 'Si su perro comió masa (riesgo de alcohol), uvas (riesgo de fallo renal) o grandes cantidades de cebolla/ajo (riesgo de anemia), busque atención veterinaria antes de que comiencen los síntomas. El retraso entre la ingestión y los síntomas puede ser de 12-72 horas, durante las cuales puede ocurrir daño irreversible.'
      },
      {
        title: 'Paso 4: Monitoree después de cualquier exceso',
        content: 'Incluso si no se identifica ninguna toxina específica, la ingesta alta en grasa requiere monitoreo de 12-72 horas para signos de pancreatitis. Restrinja la comida durante 12 horas después de la ingestión grasa (permita agua), luego ofrezca una pequeña comida blanda. Si ocurren vómitos o persisten, busque atención veterinaria inmediatamente.'
      }
    ],
    faqs: [
      {
        question: '¿Pueden los perros comer pavo de Acción de Gracias?',
        answer: 'Sí, la carne de pavo simple sin condimentar (sin piel, sin huesos) es segura para perros en pequeñas porciones — aproximadamente 1-2 cucharadas por cada 9kg de peso corporal. Retire todos los huesos (riesgo de astillamiento), la piel (alta en grasa) y asegúrese de que no se usaron condimentos (ajo, cebolla, hierbas). La carne blanca es más baja en grasa que la carne oscura y más segura para perros propensos a pancreatitis.'
      },
      {
        question: '¿Es seguro el pastel de calabaza para los perros?',
        answer: 'No. El pastel de calabaza contiene nuez moscada (tóxica para perros causando alucinaciones y taquicardia), alto contenido de azúcar (malestar gastrointestinal, consecuencias dentales/diabéticas a largo plazo), lácteos (muchos perros son intolerantes a la lactosa) y especias. La calabaza enlatada simple (calabaza pura, no relleno para pastel) es segura y realmente beneficiosa para la digestión — hasta 1 cucharada por cada 4.5kg de perro.'
      },
      {
        question: 'Mi perro comió relleno de Acción de Gracias. ¿Qué debo hacer?',
        answer: 'Llame al Control de Envenenamiento al (888) 426-4435. El relleno típicamente contiene múltiples toxinas: cebolla y ajo (causan anemia hemolítica al 0.5% del peso corporal), alto contenido de mantequilla/grasa (riesgo de pancreatitis) y a veces hierbas (la salvia puede causar malestar gastrointestinal). Los síntomas pueden no aparecer durante 2-5 días con toxicidad por cebolla/ajo, haciendo importante el monitoreo veterinario temprano.'
      },
      {
        question: '¿Pueden los perros comer puré de papas de Acción de Gracias?',
        answer: 'El puré de papas tradicional NO es seguro para perros debido a la mantequilla añadida (alta en grasa), leche (riesgo de intolerancia a la lactosa), ajo (tóxico) y cebollino (tóxico). La papa hervida simple sin adiciones es segura en pequeñas cantidades. La verdura de Acción de Gracias más segura para perros son las judías verdes o zanahorias cocidas simples sin nada añadido.'
      }
    ],
    relatedTools: [
      {
        name: 'Verificador de alimentos tóxicos',
        href: '/shared/toxic-checker/',
        description: 'Verifique la seguridad de cualquier ingrediente de Acción de Gracias.'
      },
      {
        name: 'Calculadora de calorías para perros',
        href: '/dog/calorie-calculator/',
        description: 'Contabilice la ingesta extra de calorías festivas.'
      },
      {
        name: 'Emergencia: Comió uvas',
        href: '/dog/emergency/ate-grapes/',
        description: 'Guía de emergencia por toxicidad de uvas/pasas.'
      }
    ],
    bodyParagraphs: [
      'Acción de Gracias crea un entorno de riesgo único donde se preparan simultáneamente múltiples alimentos tóxicos, la comida se deja accesible durante períodos prolongados y la combinación de ingredientes altos en grasa con alimentos que contienen toxinas (cebollas en el relleno, uvas en ensaladas) crea peligros agravados que no existen con las comidas ordinarias.',
      'La pancreatitis merece atención particular durante Acción de Gracias porque es la emergencia veterinaria más común relacionada con esta festividad. La condición ocurre cuando las enzimas dentro del páncreas se activan prematuramente, causando que el páncreas esencialmente se digiera a sí mismo. Las tasas de mortalidad para pancreatitis severa oscilan entre el 20-40% incluso con tratamiento agresivo. Los perros que desarrollan pancreatitis en Acción de Gracias frecuentemente desarrollan episodios crónicos recurrentes que afectan su calidad de vida permanentemente.',
      'Un enfoque responsable para Acción de Gracias con perros es preparar un "plato canino" separado de alimentos seguros y simples antes de que comience la comida. Esto satisface el deseo del dueño de incluir a las mascotas en la celebración mientras evita completamente la exposición a alimentos tóxicos. La realidad es que incluso los alimentos festivos aparentemente benignos conllevan riesgos acumulativos que superan la suposición de seguridad de "solo un bocado".'
    ]
  },
  'easter-chocolate': {
    title: 'Chocolate de Pascua y perros: seguridad en la búsqueda de huevos',
    description: 'Guía de toxicidad del chocolate de Pascua para dueños de perros — umbrales de envenenamiento por teobromina, peligros específicos de Pascua (huevos, césped artificial, lirios), cronograma de síntomas y tratamiento de emergencia para ingestión de chocolate.',
    keywords: [
      'chocolate de pascua perro',
      'perro comió chocolate de pascua',
      'seguridad perros búsqueda huevos pascua',
      'toxicidad lirio pascua perros',
      'envenenamiento chocolate perros pascua'
    ],
    severity: 'RIESGO CRÍTICO',
    season: 'Pascua (marzo/abril)',
    knowledgeCards: [
      {
        title: 'Peligros del chocolate específicos de Pascua',
        body: 'La Pascua concentra múltiples riesgos de chocolate: (1) Los huevos y conejos de chocolate son frecuentemente de chocolate negro o semiamargo (mayor teobromina que el chocolate con leche). (2) Los huevos envueltos en papel aluminio presentan doble riesgo — toxicidad por chocolate más obstrucción intestinal por papel aluminio. (3) Las cestas de Pascua a menudo se colocan en mesas bajas a altura accesible para perros. (4) El césped artificial de Pascua (plástico o papel) causa obstrucción intestinal si se ingiere. (5) Grandes cantidades de chocolate se usan simultáneamente para las búsquedas.'
      },
      {
        title: 'Cálculo de toxicidad del chocolate',
        body: 'Contenido de teobromina por tipo de chocolate (por 28g): Blanco: 0.25mg. Con leche: 44-60mg. Semiamargo: 150mg. Para repostería (sin azúcar): 390-450mg. Umbral tóxico para perros: síntomas leves a 20mg/kg, severos a 40mg/kg, convulsiones a 60mg/kg. Un conejo de chocolate de 85g (3oz de chocolate con leche = ~150mg de teobromina) alcanza el umbral de toxicidad moderada para un perro de 9kg. Solo 28g de chocolate para repostería es severamente tóxico para el mismo perro.'
      },
      {
        title: 'Césped artificial de Pascua: el peligro oculto',
        body: 'El césped artificial de plástico de Pascua es un peligro de cuerpo extraño lineal — puede anclarse en el estómago y cortar las paredes intestinales. El césped de papel es parcialmente digerible pero puede agruparse y causar obstrucción. Ambos tipos son atractivos para los perros porque están cubiertos con residuos de chocolate de las cestas de Pascua. Signos de obstrucción: vómitos repetidos, ausencia de deposiciones, dolor abdominal y letargo en 12-72 horas.'
      },
      {
        title: 'El cronograma de síntomas',
        body: '0-2 horas: Inquietud, jadeo, aumento de sed, vómitos. 2-12 horas: Ritmo cardíaco elevado (>100 lpm), temblores musculares, aumento de la micción. 12-48 horas: Convulsiones (casos más graves), arritmias, hipertermia (>40°C). 48-72 horas: Los síntomas se resuelven gradualmente con cuidados de soporte, pero el daño cardíaco puede persistir. Ventana crítica de tratamiento: inducir el vómito dentro de 1 hora elimina el 30-50% del contenido estomacal; la efectividad disminuye drásticamente después de 2 horas.'
      }
    ],
    prevention: [
      'Mantenga las cestas de Pascua por encima de la altura del perro o detrás de puertas cerradas',
      'Cuente los artículos de chocolate antes y después de las búsquedas de Pascua — sepa inmediatamente si falta alguno',
      'NO permita que los perros busquen huevos de Pascua con los niños — los huevos de chocolate deben mantenerse separados de los premios para mascotas',
      'Llene algunos huevos escondidos con premios seguros para perros (zanahorias, rodajas de manzana, premios caninos) como señuelo',
      'Use césped de papel en lugar de césped de plástico (menor riesgo de obstrucción)',
      'Deseche todos los envoltorios de chocolate y papel aluminio en contenedores exteriores sellados',
      'Mantenga a los perros dentro de casa durante la búsqueda de Pascua si no están bajo control directo con correa'
    ],
    symptoms: [
      'Vómitos o diarrea (puede contener trozos de chocolate o papel aluminio)',
      'Inquietud, hiperactividad o agitación',
      'Jadeo excesivo y ritmo cardíaco elevado',
      'Aumento de sed y micción',
      'Temblores musculares o espasmos',
      'Convulsiones (indica toxicidad severa)',
      'Rigidez o marcha anormal'
    ],
    firstAid: [
      {
        title: 'Paso 1: Calcule la dosis tóxica',
        content: 'Determine: (1) Tipo de chocolate ingerido (con leche, negro, repostería), (2) Peso aproximado en gramos consumido, (3) Peso corporal de su perro. Use la calculadora de umbral tóxico: chocolate con leche tóxico a 28g por cada 4.5kg de peso corporal; chocolate negro a 14g por cada 4.5kg; chocolate para repostería a 3g por cada 4.5kg.'
      },
      {
        title: 'Paso 2: Llame al Control de Envenenamiento inmediatamente',
        content: 'Control de Envenenamiento Animal de ASPCA: (888) 426-4435. Informe la dosis calculada. Si se supera el umbral, acuda al veterinario de emergencia. NO espere síntomas — la absorción de teobromina continúa durante más de 12 horas y los síntomas pueden no aparecer hasta que haya ocurrido daño grave.'
      },
      {
        title: 'Paso 3: NO induzca el vómito en casa',
        content: 'NO intente la inducción casera del vómito con peróxido de hidrógeno. Esto es peligroso si su perro ya está convulsionando, tiene conciencia disminuida o si el chocolate se consumió hace más de 1-2 horas (volver a vomitar no elimina toxina significativa). Solo induzca el vómito bajo dirección veterinaria.'
      },
      {
        title: 'Paso 4: Tratamiento veterinario',
        content: 'Tratamiento para toxicidad por chocolate: (1) Inducción de vómito dentro de 1-2 horas, (2) Carbón activado para unir la teobromina restante, (3) Fluidos IV para acelerar la excreción renal, (4) Monitoreo del ritmo cardíaco durante 12-24 horas, (5) Medicamentos anticonvulsivos si están indicados. La hospitalización típicamente dura 12-36 horas para toxicidad moderada.'
      }
    ],
    faqs: [
      {
        question: 'Mi perro comió un huevo de chocolate de Pascua. ¿Cuánto es tóxico?',
        answer: 'Depende del tipo de chocolate, el peso del huevo y el tamaño de su perro. Un huevo de chocolate con leche típico envuelto en papel aluminio pesa 28-57g (1-2 oz) — para un perro de 9kg, un huevo alcanza el umbral de toxicidad moderada (20mg/kg de teobromina). Los huevos de chocolate negro son 3-4 veces más tóxicos al mismo peso. Los huevos de chocolate para repostería pueden ser letales para perros pequeños. Llame al Control de Envenenamiento de ASPCA (888) 426-4435 con el tipo de chocolate y el peso de su perro para una evaluación de riesgo inmediata.'
      },
      {
        question: '¿Son peligrosos los lirios de Pascua para los perros?',
        answer: 'Los lirios de Pascua (Lilium longiflorum) NO son tóxicos para los perros (a diferencia de los gatos, donde causan fallo renal fatal). Sin embargo, los perros que mastican tallos/hojas de lirio pueden experimentar malestar gastrointestinal leve (vómitos, diarrea). Los peligros de Pascua más peligrosos incluyen huevos de chocolate (teobromina), césped artificial de plástico (obstrucción intestinal) y xilitol en caramelos sin azúcar. Mantenga los lirios alejados de hogares con varias mascotas que incluyan gatos.'
      },
      {
        question: '¿Cuánto tiempo después de comer chocolate debo preocuparme por mi perro?',
        answer: 'La teobromina del chocolate se absorbe durante 6-12 horas, los síntomas pueden aparecer hasta 72 horas después de la ingestión. El xilitol actúa más rápido: hipoglucemia en 15-30 minutos, fallo hepático en 8-12 horas. Llame al Control de Envenenamiento inmediatamente si sabe que su perro comió chocolate o xilitol. Los perros tratados dentro de 2 horas tienen mejores resultados. Monitoree durante 72 horas incluso después del tratamiento.'
      }
    ],
    relatedTools: [
      {
        name: 'Verificador de alimentos tóxicos',
        href: '/shared/toxic-checker/',
        description: 'Verifique la toxicidad de chocolate/caramelos al instante.'
      },
      {
        name: 'Emergencia: Comió chocolate',
        href: '/dog/emergency/ate-chocolate/',
        description: 'Protocolo completo de emergencia por toxicidad de chocolate.'
      }
    ],
    bodyParagraphs: [
      'La Pascua combina múltiples toxinas (chocolate, xilitol) con peligros físicos (césped artificial, juguetes) en un entorno donde los perros están confinados en interiores cerca de tentaciones que van más allá de los simples caramelos.',
      'El cronograma de síntomas del chocolate crea una falsa seguridad — la teobromina alcanza su pico 10-12 horas después de la ingestión. Los efectos cardíacos pueden desarrollarse mucho después de que el perro "parecía estar bien". Contacte al Control de Envenenamiento inmediatamente en lugar de esperar.',
      '"Un poco de chocolate no le hará daño" es peligrosamente incorrecto. Un solo huevo de chocolate negro de Pascua puede administrar una dosis tóxica a un perro de tamaño mediano. Los caramelos sin azúcar comercializados como "saludables" frecuentemente contienen xilitol, letal en dosis minúsculas.'
    ]
  }
};

// ============================================================
// Write Spanish translations
// ============================================================
const esData = JSON.parse(fs.readFileSync('messages/es.json', 'utf8'));

// Deep-copy the English seasonal structure as base
const merged = JSON.parse(JSON.stringify(enSeasonal));
// Remove breadcrumb from the copy (it stays as-is in es.json)
delete merged.breadcrumb;
// Merge Spanish translations: spread English entry first, then overlay Spanish
// This preserves slug, citations, and relatedEmergency from English
for (const [key, value] of Object.entries(es)) {
  merged[key] = { ...merged[key], ...value };
}

esData.seasonal = merged;
fs.writeFileSync('messages/es.json', JSON.stringify(esData, null, 2));
console.log('es.json updated with Spanish seasonal translations');