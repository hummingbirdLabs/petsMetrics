/**
 * Translate seasonal data for Portuguese (pt)
 */
import fs from 'fs';

// Read the English seasonal data as reference structure
const en = JSON.parse(fs.readFileSync('messages/en.json', 'utf8'));
const enSeasonal = en.seasonal;

// ============================================================
// PORTUGUESE (pt) translations
// ============================================================
const pt = {
  'summer-heat': {
    title: 'Como Manter Seu Cão Refrescado no Verão: Guia de Segurança Contra o Calor',
    description: 'Guia completo para prevenir insolação em cães — reconhecer sintomas precoces, técnicas de resfriamento, limites de temperatura inseguros e passos de emergência. Baseado em dados do ASPCA e veterinários de emergência.',
    bodyParagraphs: [
      'O calor do verão representa uma ameaça séria e frequentemente subestimada para os cães. Diferente dos humanos, que possuem glândulas sudoríparas distribuídas por todo o corpo, os cães se resfriam principalmente através da respiração ofegante e da transpiração limitada pelas almofadas das patas. Essa limitação biológica os torna especialmente vulneráveis em climas quentes, principalmente quando a umidade reduz a eficiência do resfriamento evaporativo da respiração ofegante.',
      'O equívoco mais crítico é acreditar que a insolação só ocorre em temperaturas extremas. Na realidade, a maioria dos casos de insolação canina atendidos pelo ASPCA ocorre em dias que os tutores consideram "moderadamente quentes" — 27–29 °C — especialmente quando os cães estão se exercitando ou confinados em espaços com pouca ventilação. Raças braquicefálicas enfrentam um risco ainda maior: suas vias aéreas encurtadas já restringem o fluxo de ar, então a demanda respiratória aumentada pelo resfriamento pode rapidamente sobrecarregar sua capacidade de troca de oxigênio.',
      'A temperatura do solo é outro perigo frequentemente ignorado. Com temperatura do ar de 24 °C, o asfalto pode atingir 52 °C; com 30 °C, chega a 57 °C. A 60 °C, queimaduras de segundo grau nas almofadas das patas ocorrem em 60 segundos. Sempre teste as superfícies com a regra dos 7 segundos antes de deixar seu cão caminhar sobre elas.',
    ],
    knowledgeCards: [
      { title: 'Entendendo a Insolação Canina', body: 'Diferente dos humanos, os cães suam apenas pelas almofadas das patas e dependem principalmente da respiração ofegante para se refrescar. Quando a temperatura ambiente excede a temperatura corporal (38,3–39,2 °C), a respiração ofegante se torna ineficaz. A insolação ocorre quando a temperatura corporal central sobe acima de 41,1 °C, causando danos aos órgãos em minutos. Segundo dados do ASPCA, centenas de cães morrem de insolação a cada verão, muitos por causas evitáveis.' },
      { title: 'Limites de Temperatura Inseguros', body: 'Entre 27–29 °C, raças grandes e cães braquicefálicos (Buldogue, Pug, Boxer) estão em risco elevado. A 32 °C, todos os cães precisam ter o tempo ao ar livre restrito. O interior de um carro atinge 39 °C em 10 minutos em um dia de 29 °C e 49 °C em 30 minutos — mesmo com as janelas entreabertas. (Fonte: estudo de temperatura da AVMA)' },
      { title: 'Raças com Maior Risco', body: 'Raças braquicefálicas (Pug, Buldogue, Buldogue Francês, Boxer, Boston Terrier) têm risco 2 a 3 vezes maior de insolação devido às vias aéreas estreitas. Raças grandes/gigantes (Mastiff, São Bernardo, Terra-nova) retêm mais calor. Raças de pelagem dupla densa (Husky, Malamute, Chow Chow) sofrem com a umidade. Filhotes com menos de 6 meses e cães acima de 7 anos também estão em risco elevado.' },
      { title: 'A Regra da Temperatura do Solo', body: 'A temperatura do ar isoladamente é uma informação perigosa. O asfalto a 29 °C de temperatura do ar atinge 60 °C — quente o suficiente para queimar as almofadas das patas em 60 segundos. Teste com a regra dos 7 segundos: coloque as costas da mão na superfície por 7 segundos. Se for desconfortável para você, queimará seu cão. Passeie com cães na grama antes das 10h ou após as 18h.' },
    ],
    prevention: [
      'Passeie com os cães antes das 10h e após as 18h, quando as temperaturas do solo estão seguras',
      'Forneça sempre sombra e água fresca ao ar livre',
      'Nunca deixe um cão em um carro estacionado — nem mesmo por "só um minutinho"',
      'Use tapetes refrescantes, camas elevadas ou toalhas úmidas dentro de casa',
      'Leve água e uma tigela dobrável em passeios com mais de 15 minutos',
      'Limite a intensidade do exercício em dias úmidos (umidade >60%)',
      'Considere tosar raças de pelo longo (mas NÃO raspe pelagens duplas)',
    ],
    symptoms: [
      'Respiração ofegante excessiva ou dificuldade para respirar',
      'Gengivas e língua vermelhas brilhantes ou pálidas',
      'Saliva espessa e pegajosa',
      'Vômito ou diarreia (podendo ser com sangue)',
      'Tropeços, fraqueza ou desorientação',
      'Temperatura retal elevada (normal: 38,3–39,2 °C; insolação: >40 °C)',
      'Colapso, convulsões ou perda de consciência',
    ],
    firstAid: [
      { title: 'Passo 1: Leve para um Local Fresco Imediatamente', content: 'Tire seu cão do calor e leve-o para a sombra ou ar-condicionado. Remova qualquer peitoral ou roupa restritiva.' },
      { title: 'Passo 2: Resfrie com Água Morna (NÃO Gelada)', content: 'Despeje água fresca (não gelada) sobre o pescoço, axilas e região da virilha, onde os vasos sanguíneos estão próximos à superfície. Água gelada causa vasoconstrição que prende o calor no interior. NÃO force água se o cão não conseguir engolir.' },
      { title: 'Passo 3: Ofereça Pequenas Quantidades de Água', content: 'Deixe seu cão beber pequenas quantidades de água fresca — não use seringa para forçar água na boca (risco de aspiração). Adicione cubos de gelo para estimular a ingestão.' },
      { title: 'Passo 4: Transporte ao Veterinário Imediatamente', content: 'A insolação pode causar danos internos aos órgãos que não são imediatamente visíveis. Mesmo que seu cão pareça se recuperar, transporte-o ao veterinário para avaliação. Ligue para o Controle de Venenos ASPCA no (888) 426-4435 se não tiver certeza sobre a gravidade.' },
    ],
    faqs: [
      { question: 'A partir de qual temperatura os cães podem ter insolação?', answer: 'Cães podem desenvolver insolação em temperaturas acima de 29 °C, especialmente sob sol direto com umidade acima de 60%. O risco aumenta drasticamente acima de 32 °C. Raças braquicefálicas podem sofrer insolação em temperaturas tão baixas quanto 24 °C devido à anatomia comprometida das vias aéreas. Zona crítica de perigo: temperatura corporal acima de 40 °C começa a causar danos aos órgãos; acima de 41,1 °C é risco de vida.' },
      { question: 'Cães podem ter insolação dentro de casa?', answer: 'Sim, a insolação em ambientes internos é comum quando as casas não têm ar-condicionado ou ventilação adequada. Os cães não conseguem se resfriar efetivamente em ambientes acima de 29 °C, especialmente com alta umidade. Fatores de risco: cômodos no andar superior (o calor sobe), caixas de transporte fechadas sem fluxo de ar e cômodos com exposição solar direta pelas janelas. Sempre forneça uma zona fresca (piso de cerâmica, ventilador ou tapete refrescante) acessível ao seu cão.' },
      { question: 'Como resfriar um cão de forma rápida e segura?', answer: 'Use água fresca (não gelada) no pescoço, axilas e virilha. Ofereça pequenas quantidades de água fresca para beber. Leve para o ar-condicionado ou sombra. NÃO submerja em água gelada — isso causa choque perigoso. NÃO use álcool (tóxico se lambido). Transporte ao veterinário mesmo que os sintomas melhorem, pois danos internos podem não ser imediatamente visíveis.' },
      { question: 'Quanto tempo leva para um cão ter insolação dentro de um carro?', answer: 'O interior de um carro aquece de forma catastrófica: em um dia de 29 °C, o interior atinge 39 °C em apenas 10 minutos e 49 °C em 30 minutos — mesmo com as janelas abertas 5 cm. Nessas temperaturas, um cão pode desenvolver insolação fatal em apenas 15–20 minutos. Não existe duração segura. Nunca deixe um cão em um carro estacionado, independentemente da temperatura externa ou das condições climáticas.' },
    ],
    relatedTools: [
      { name: 'Calculadora de Calorias para Cães', href: '/dog/calorie-calculator/', description: 'Ajuste a alimentação para níveis reduzidos de atividade no verão.' },
      { name: 'Verificador de Alimentos Tóxicos', href: '/shared/toxic-checker/', description: 'Verifique a segurança de alimentos de verão (uvas em churrascos, espigas de milho, etc.).' },
    ],
  },
  'winter-paw-care': {
    title: 'Proteção das Patas do Cão no Inverno: Segurança Contra Frio, Gelo e Sal',
    description: 'Guia especializado para proteger as patas dos cães no inverno — prevenindo queimaduras de frio, queimaduras de gelo e irritação por sal de estrada. Inclui rotinas de cuidados com as patas, ajuste de botas e tratamento de emergência para lesões causadas pelo frio.',
    bodyParagraphs: [
      'O inverno apresenta um conjunto único de desafios para a saúde das patas dos cães, que muitos tutores não consideram até que ocorra uma lesão. As mesmas almofadas que fornecem tração e feedback sensorial em solo quente tornam-se vulneráveis a danos pelo frio, queimaduras químicas e lesões abrasivas quando expostas a temperaturas congelantes, compostos de degelo e bordas afiadas de gelo.',
      'Compreender a progressão das lesões nas patas causadas pelo frio ajuda os tutores a intervir antes que ocorram danos permanentes. O primeiro estágio é o ressecamento e rachaduras simples das almofadas — desconfortável, mas facilmente tratável. Sem proteção, a exposição ao sal e ao gelo progride para dermatite química, onde a pele das almofadas fica inflamada e pode ulcerar. A exposição contínua em frio extremo leva a queimaduras de frio, onde o tecido congela e pode exigir intervenção veterinária, incluindo medicação para dor e antibióticos.',
      'Um perigo frequentemente negligenciado é o efeito cumulativo da exposição diária. Uma caminhada de 15 minutos em calçadas tratadas com sal pode causar irritação mínima, mas fazer isso de 5 a 7 dias por semana leva à inflamação crônica e rachaduras das almofadas. Da mesma forma, exposições curtas em frio moderado (-1 a 2 °C) podem causar queimaduras de frio em apenas 30 minutos quando combinadas com condições úmidas e vento.',
    ],
    knowledgeCards: [
      { title: 'Anatomia das Almofadas das Patas do Cão', body: 'As almofadas das patas dos cães contêm tecido adiposo para isolamento, mas essa gordura pode congelar em temperaturas abaixo de -6 °C. As almofadas digitais e a almofada metacarpal têm fluxo sanguíneo limitado em comparação com outros tecidos, tornando-as particularmente vulneráveis a queimaduras de frio. A exposição repetida a superfícies frias faz com que a pele das almofadas rache e sangre, criando pontos de entrada para infecções.' },
      { title: 'Sal de Estrada e Degelantes Químicos', body: 'Os degelantes comuns incluem cloreto de sódio, cloreto de cálcio e cloreto de magnésio. Esses produtos químicos queimam o tecido das almofadas em contato e causam desconforto gastrointestinal se ingeridos ao lamber. O cloreto de cálcio é o mais perigoso — gera calor ao entrar em contato com a pele úmida e pode causar queimaduras químicas. Degelantes "seguros para animais" usam fórmulas à base de ureia ou glicol, que são menos irritantes.' },
      { title: 'O Perigo das Bolas de Gelo', body: 'Neve e gelo se acumulam entre os dedos, formando bolas de gelo apertadas que cortam a membrana interdigital e restringem o fluxo sanguíneo. Isso é doloroso e pode causar danos aos tecidos. Raças de pelo longo (especialmente entre as almofadas) são as mais suscetíveis. As bolas de gelo se formam em 10–15 minutos de caminhada na neve úmida.' },
      { title: 'Estágios da Queimadura de Frio nas Patas', body: 'Estágio 1: Pele pálida e fria, dolorida ao toque. Estágio 2: Pele endurecida e fria, podendo apresentar descoloração (cinza-azulada). Estágio 3: Bolhas, tecido enegrecido indicando necrose. As margens entre o tecido normal e o congelado nem sempre são claras — o que parece levemente danificado pode piorar em 24–48 horas, conforme o fluxo sanguíneo é restabelecido.' },
    ],
    prevention: [
      'Aplique bálsamo para patas (Musher\'s Secret ou similar) antes dos passeios para criar uma barreira protetora',
      'Apare os pelos entre as almofadas para evitar a formação de bolas de gelo',
      'Use botas para cães (ajuste justo, respiráveis) em passeios com mais de 10 minutos na neve/gelo',
      'Limpe bem as patas com água morna (não quente) após cada passeio',
      'Evite caminhar perto de estradas e calçadas tratadas com degelantes',
      'Aplique vaselina nas almofadas antes dos passeios se não estiver usando botas',
      'Monitore as almofadas quanto a rachaduras, vermelhidão ou sangramento após cada passeio',
    ],
    symptoms: [
      'Mancar ou relutância em caminhar (especialmente em superfícies duras)',
      'Lamber ou morder as patas excessivamente',
      'Almofadas rachadas, secas ou sangrando',
      'Pele escura ou descolorida nas almofadas (cinza-azulada indica queimadura de frio)',
      'Membrana interdigital inchada ou dolorida',
      'Bolas de gelo visíveis entre os dedos',
      'Pequenos cortes ou abrasões nas almofadas',
    ],
    firstAid: [
      { title: 'Passo 1: Retire do Frio e Aqueça Suavemente', content: 'Traga seu cão para dentro de casa. Aqueça as patas afetadas com água morna (temperatura corporal) ou toalhas mornas por 15–20 minutos. NÃO use água quente ou almofadas térmicas — o tecido com queimadura de frio tem sensibilidade reduzida e pode queimar facilmente.' },
      { title: 'Passo 2: Remova Bolas de Gelo e Detritos', content: 'Remova suavemente as bolas de gelo entre os dedos usando água morna para derretê-las. Não puxe o gelo — isso rasga a pele. Seque suavemente com uma toalha macia.' },
      { title: 'Passo 3: Trate Queimaduras Químicas', content: 'Se houve exposição ao sal de estrada, lave suavemente as patas com água morna por 5 minutos para remover os resíduos. Aplique uma camada fina de hidratante seguro para patas (não use loção para humanos — prefira à base de lanolina e vitamina E).' },
      { title: 'Passo 4: Busque Atendimento Veterinário para Queimaduras de Frio', content: 'Se as almofadas parecerem pretas, muito pálidas sem retorno sanguíneo ao pressionar, ou se seu cão estiver com dor significativa, busque atendimento veterinário imediatamente. O tratamento de queimaduras de frio pode exigir controle da dor e antibióticos para prevenir infecção secundária.' },
    ],
    faqs: [
      { question: 'As patas dos cães podem sofrer queimaduras de frio?', answer: 'Sim, as patas dos cães são um dos locais mais comuns de queimaduras de frio. As almofadas têm isolamento de gordura limitado e os vasos sanguíneos próximos à superfície fria se contraem rapidamente, reduzindo a oxigenação dos tecidos. O risco de queimadura de frio começa em temperaturas abaixo de -6 °C e aumenta com condições úmidas e vento. Cães com condições preexistentes (diabetes, doenças cardíacas) têm circulação comprometida que acelera o início da queimadura de frio.' },
      { question: 'O sal de estrada é prejudicial para os cães?', answer: 'Sim — sais de estrada comuns (cloreto de sódio e especialmente cloreto de cálcio) causam queimaduras químicas em contato com o tecido das almofadas e desconforto gastrointestinal se ingeridos durante a lambedura. Os sinais incluem almofadas vermelhas e rachadas, relutância em caminhar e lambedura excessiva das patas. Use degelantes seguros para animais (à base de ureia) em sua casa e limpe as patas do seu cão imediatamente após passeios perto de superfícies tratadas.' },
      { question: 'O que são botas para cães e elas funcionam?', answer: 'As botas para cães fornecem isolamento do frio, proteção contra sal/produtos químicos e tração no gelo. Procure botas com: ajuste justo (não muito apertado), material respirável, sola flexível e tiras ajustáveis. Introduza gradualmente — muitos cães recusam botas inicialmente. Exposições curtas de 5 minutos em casa ajudam na adaptação. Cães com patas de pelagem densa (Husky, Malamute) podem superaquecer com botas durante atividade vigorosa.' },
      { question: 'Como posso proteger as patas do meu cão sem botas?', answer: 'Aplique bálsamo para patas (Musher\'s Secret, Musher\'s Choice) antes de cada passeio — ele cria uma barreira de cera respirável contra sal e gelo. Apare os pelos interdigitais para evitar a formação de bolas de gelo. Limite a duração dos passeios a 15–20 minutos em temperaturas abaixo de -4 °C. Após os passeios, lave as patas com água morna e seque bem, especialmente entre os dedos.' },
    ],
    relatedTools: [
      { name: 'Calculadora de Calorias para Cães', href: '/dog/calorie-calculator/', description: 'Ajuste para as necessidades energéticas aumentadas no inverno.' },
      { name: 'Verificador de Alimentos Tóxicos', href: '/shared/toxic-checker/', description: 'Verifique a segurança dos alimentos das festas de inverno.' },
    ],
  },
  'christmas-foods': {
    title: 'Alimentos de Natal Tóxicos para Cães: Guia de Segurança Alimentar Natalina',
    description: 'Guia completo sobre alimentos de Natal perigosos para cães — chocolate, doces com xilitol, ossos cozidos, uvas, cebolas e álcool. Inclui sintomas de emergência e o que fazer se seu cão comeu um alimento natalino tóxico.',
    bodyParagraphs: [
      'A temporada de Natal cria uma tempestade perfeita de risco de envenenamento para animais de estimação: alimentos tóxicos abundantes estão facilmente acessíveis, as rotinas domésticas são interrompidas e convidados que não conhecem as regras de segurança para animais podem inadvertidamente oferecer itens perigosos. Dados do ASPCA mostram que a semana entre o Natal e o Ano Novo produz consistentemente o maior volume de chamadas de envenenamento de animais de estimação durante todo o ano.',
      'Muitos alimentos tradicionais de Natal são individualmente perigosos, mas o maior risco vem da combinação. Um único pudim de Natal contém uvas-passas (toxina de insuficiência renal), álcool (neurotoxina) e sebo (gatilho de pancreatite). Da mesma forma, uma bandeja de biscoitos natalinos pode ter gotas de chocolate (teobromina), biscoitos sem açúcar (xilitol) e nozes de macadâmia (neurotoxina) — cada um de categorias tóxicas diferentes que exigem tratamentos diferentes.',
      'A prevenção é drasticamente mais eficaz do que o tratamento em cenários de envenenamento natalino. As toxinas envolvidas (teobromina, xilitol, toxina da uva) não têm antídotos — o tratamento depende da descontaminação precoce (indução de vômito), cuidados de suporte (fluidos intravenosos) e tempo. Tutores que implementam barreiras simples (armários fechados, educação de convidados, lixo selado) eliminam 90% do risco de envenenamento.',
    ],
    knowledgeCards: [
      { title: 'Alimentos de Natal: Tóxicos vs Seguros', body: 'Os alimentos de Natal mais perigosos para cães incluem: chocolate (teobromina em todas as formas — chocolate em pó é o mais tóxico), xilitol em balas e bolos sem açúcar (causa hipoglicemia a 0,1 g/kg e insuficiência hepática), uvas e uvas-passas em pudim de Natal e bolo de frutas (causam insuficiência renal a 0,3–0,6 oz/kg), cebola e alho no recheio e molho (causam anemia hemolítica), ossos cozidos (fragmentam e perfuram), nozes de macadâmia em biscoitos e álcool em gemada ou bolo de rum.' },
      { title: 'Por que o Natal é a Temporada de Pico de Emergências', body: 'O Controle de Venenos ASPCA relata um aumento de 200–400% em envenenamentos de animais relacionados a feriados de 20 a 26 de dezembro em comparação com semanas normais. Principais causas: pratos deixados sem supervisão em mesas de centro, cestas de presente acessíveis com chocolate, balas e chicletes sem açúcar ao alcance, convidados bem-intencionados oferecendo "petiscos" e meias de Natal contendo itens tóxicos deixadas na altura do cão.' },
      { title: 'A Escala de Perigo do Chocolate', body: 'Chocolate em pó (sem açúcar): 30 g causam toxicidade grave em um cão de 9 kg. Chocolate amargo (70%+): 60 g para um cão de 9 kg. Chocolate ao leite: 230 g para um cão de 9 kg. Chocolate branco: risco mínimo de teobromina, mas o teor de gordura causa pancreatite. Caixas de bombons sortidos de Natal são particularmente perigosas porque contêm tipos variados — a ingestão de um único bombom de chocolate amargo pode ser fatal.' },
      { title: 'Xilitol na Confeitaria Natalina', body: 'Biscoitos, bolos e doces de Natal sem açúcar frequentemente contêm xilitol (açúcar de bétula), agora popular em receitas keto e para diabéticos. Um único biscoito sem açúcar pode conter 5–10 g de xilitol — tóxico para um cão de 13 kg com apenas 3 g. O xilitol causa um aumento rápido de insulina levando à hipoglicemia em 15–30 minutos e, em doses mais altas, insuficiência hepática aguda em 12–24 horas.' },
    ],
    prevention: [
      'Mantenha todo chocolate em armários fechados ou prateleiras altas, inacessíveis aos cães',
      'Coloque balas/biscoitos sem açúcar em recipientes selados (não em tigelas decorativas)',
      'Informe todos os convidados que NÃO é permitido alimentar o cão',
      'Feche imediatamente os sacos de lixo contendo restos de comida',
      'Mantenha um pote de petiscos seguros para cães na cozinha para convidados que queiram oferecer algo',
      'Recolha os pratos das mesas de centro imediatamente após as refeições',
      'Verifique as meias de Natal quanto a moedas de chocolate, bastões de doces (risco de xilitol) e uvas-passas',
    ],
    symptoms: [
      'Vômito e diarreia (dentro de 2–12 horas para a maioria das toxinas)',
      'Hiperatividade, inquietação, batimentos cardíacos acelerados (chocolate, cafeína)',
      'Fraqueza, colapso, convulsões (hipoglicemia por xilitol)',
      'Sede excessiva, diminuição da urina (toxicidade por uva/uva-passa)',
      'Gengivas pálidas, fraqueza (anemia por cebola/alho — pode levar 2–5 dias)',
      'Dor abdominal, fezes com sangue (obstrução por ossos ou pancreatite)',
      'Tremores, instabilidade (toxicidade por álcool ou nozes de macadâmia)',
    ],
    firstAid: [
      { title: 'Passo 1: Identifique o Que Foi Ingerido', content: 'Verifique a lista de ingredientes imediatamente. O tipo de chocolate, a presença de xilitol, a quantidade de uvas/uva-passas e se ossos foram consumidos determinam a gravidade da emergência. Tire uma foto da lista de ingredientes se disponível.' },
      { title: 'Passo 2: Estime a Quantidade e o Horário', content: 'Anote a quantidade aproximada consumida e o tempo desde a ingestão. Essas informações são críticas para o Controle de Venenos ASPCA e seu veterinário determinarem se a dose é tóxica e se é necessária intervenção.' },
      { title: 'Passo 3: Contate o Controle de Venenos Imediatamente', content: 'Ligue para o Controle de Venenos Animais ASPCA no (888) 426-4435 ou para a Linha de Venenos para Animais no (855) 764-7661. NÃO espere pelos sintomas — a tratabilidade diminui significativamente após a janela de absorção. NÃO provoque vômito a menos que instruído.' },
      { title: 'Passo 4: Prepare-se para a Visita ao Veterinário', content: 'Se orientado a ir ao veterinário, leve as embalagens/rótulos e uma amostra de vômito, se disponível. Mantenha seu cão calmo e contido durante o transporte. Prepare-se para possível administração de fluidos intravenosos, carvão ativado e exames de sangue.' },
    ],
    faqs: [
      { question: 'Meu cão comeu chocolate de Natal. O que devo fazer?', answer: 'Ligue imediatamente para o Controle de Venenos ASPCA no (888) 426-4435 informando: o peso do seu cão, o tipo e a quantidade de chocolate ingerido e o tempo desde a ingestão. NÃO espere pelos sintomas. Se a quantidade exceder o limite tóxico para o tamanho do seu cão (use nosso verificador de tóxicos ou pergunte à linha direta), vá a um veterinário de emergência para indução de vômito e carvão ativado. A teobromina do chocolate permanece no organismo do cão por até 72 horas.' },
      { question: 'Ossos de presunto de Natal cozidos são seguros para cães?', answer: 'Não. Ossos cozidos de qualquer tipo — incluindo presunto, peru e bovinos — tornam-se quebradiços e se fragmentam, causando perfuração potencialmente fatal na garganta, estômago ou intestinos. Até mesmo ossos cozidos grandes podem quebrar dentes. Descarte os restos de ossos em uma lixeira externa selada e nunca jogue um osso cozido para seu cão.' },
      { question: 'O pudim de Natal é perigoso para cães?', answer: 'Extremamente perigoso. O pudim de Natal normalmente contém uvas, uvas-passas e groselhas (todas causam insuficiência renal em cães), álcool (tóxico para o sistema nervoso), sebo (alto teor de gordura causando pancreatite) e às vezes manteiga de brandy (álcool e gordura). Até mesmo uma pequena mordida pode ser tóxica. Mantenha o pudim bem longe dos cães e garanta que nenhum pedaço caído esteja acessível.' },
      { question: 'Cães podem comer peru no Natal?', answer: 'Carne de peru simples, sem tempero, em pequenas quantidades (1–2 colheres de sopa para um cão médio) é geralmente segura e não tóxica. No entanto: remova toda a pele (alto teor de gordura causa pancreatite), certifique-se de que não há ossos e confirme que não foi usada cebola ou alho no preparo (comuns no recheio e molho, ambos tóxicos). Não dê peru preparado com ervas, manteiga, cebola ou alho.' },
    ],
    relatedTools: [
      { name: 'Verificador de Alimentos Tóxicos', href: '/shared/toxic-checker/', description: 'Verifique instantaneamente qualquer ingrediente de comida natalina.' },
      { name: 'Calculadora de Calorias para Cães', href: '/dog/calorie-calculator/', description: 'Acompanhe as calorias extras dos petiscos natalinos.' },
      { name: 'Emergência: Comeu Chocolate', href: '/dog/emergency/ate-chocolate/', description: 'Guia completo de emergência para toxicidade por chocolate.' },
    ],
  },
  'halloween-candy': {
    title: 'Meu Cão Comeu Doces de Halloween: Plano de Ação de Emergência',
    description: 'Guia de emergência para cães que comeram doces de Halloween — reconhecendo sinais de toxicidade, quando correr ao veterinário, quais tipos de doces são mais perigosos e como prevenir emergências com animais no Halloween.',
    bodyParagraphs: [
      'O Halloween apresenta um dos cenários de maior risco para envenenamento de animais de estimação durante todo o ano. A convergência de substâncias tóxicas abundantes (chocolate, xilitol, uvas-passas), rotinas domésticas interrompidas e crianças que podem não reconhecer o perigo cria condições em que até mesmo cães bem cuidados podem ingerir rapidamente quantidades letais de toxinas.',
      'O risco do xilitol merece ênfase especial, pois balas e chicletes sem açúcar são cada vez mais comuns nos sortidos de Halloween. Diferente do chocolate, em que a quantidade necessária para toxicidade é relativamente grande, o xilitol é tóxico em quantidades minúsculas — um único chiclete de certas marcas sem açúcar contém xilitol suficiente para causar hipoglicemia fatal em um cão pequeno em 30 minutos. Muitos tutores não percebem que seu cão comeu chiclete porque as embalagens são descartadas separadamente.',
      'O reconhecimento e a resposta rápidos melhoram drasticamente os resultados. Cães tratados dentro de 1–2 horas após a ingestão de xilitol têm excelente prognóstico; o atraso no tratamento além de 6 horas aumenta significativamente a mortalidade. A ingestão de chocolate segue uma curva de tempo-sensibilidade semelhante — o vômito induzido dentro de 1 hora remove 40–50% do conteúdo estomacal, mas a eficácia cai para quase zero após 2 horas, quando o esvaziamento gástrico já ocorreu.',
    ],
    knowledgeCards: [
      { title: 'Os Quatro Grandes Tipos de Doces Tóxicos', body: '1) Chocolate (todas as formas — toxicidade por teobromina). 2) Xilitol (chicletes e balas sem açúcar — hipoglicemia e insuficiência hepática). 3) Uvas-passas (algumas caixas de lanche — insuficiência renal). 4) Embalagens de doces (papel alumínio/plástico causam obstrução intestinal). Um único chiclete com xilitol pode ser fatal para um cão de 7 kg, segundo dados do ASPCA.' },
      { title: 'Fatores de Risco Específicos do Halloween', body: 'Sacos de doces colocados no chão ou em mesas baixas, tigelas de doces deixadas sem supervisão nas portas, crianças derrubando pedaços no chão e momentos de "compartilhar doces" com os cães criam o pico de risco de envenenamento no Halloween. O ASPCA relata que o Halloween é um dos 3 dias com mais envenenamentos de animais anualmente. A combinação de alto volume de doces e supervisão interrompida aumenta dramaticamente a exposição.' },
      { title: 'Perigos das Embalagens de Doces', body: 'Embalagens de papel alumínio e plástico são frequentemente consumidas junto com os doces. Em cães pequenos, algumas embalagens podem causar obstrução intestinal exigindo remoção cirúrgica. O papel alumínio também pode conter resíduos de chocolate que são absorvidos. Sintomas de obstrução: vômito (especialmente repetido), ausência de evacuação, letargia e dor abdominal dentro de 12–48 horas.' },
      { title: 'Risco da Combinação Chocolate + Xilitol', body: 'Muitos sortidos de doces de Halloween contêm tanto itens cobertos de chocolate quanto chicletes/balas sem açúcar. Se seu cão comer de um saco misto, ele pode ser exposto tanto à teobromina (do chocolate) QUANTO ao xilitol (dos itens sem açúcar). Essa combinação é particularmente perigosa porque os sintomas se sobrepõem (vômito, fraqueza), mas os tratamentos diferem significativamente.' },
    ],
    prevention: [
      'Guarde todos os doces de Halloween em recipientes fechados acima da altura do balcão',
      'Use uma tigela de doces fechada com tampa bem ajustada (não tigelas abertas)',
      'Mantenha os cães em um cômodo separado durante o horário de receber doces',
      'Inspecione os doces das crianças imediatamente após voltar para casa',
      'Nunca dê doces da sua mão ou prato para o seu cão',
      'Considere petiscos calmantes ou difusores de feromônios para cães estressados com o barulho da campainha',
      'Tenha o número de emergência do seu veterinário e do Controle de Venenos ASPCA ((888) 426-4435) com antecedência',
    ],
    symptoms: [
      'Vômito ou diarreia dentro de 2–12 horas',
      'Respiração rápida, frequência cardíaca elevada, inquietação (chocolate/teobromina)',
      'Letargia, fraqueza, colapso dentro de 15–30 minutos (hipoglicemia por xilitol)',
      'Sede e micção excessivas seguidas de diminuição da micção (toxicidade por uva-passa)',
      'Vômito repetido sem evacuação (possível obstrução)',
      'Tremores, convulsões (toxicidade grave por chocolate ou xilitol)',
      'Inchaço ou dor abdominal',
    ],
    firstAid: [
      { title: 'Passo 1: Avalie o Que Foi Ingerido', content: 'Identifique imediatamente o tipo de doce: chocolate (ao leite/amargo/em pó), chiclete (verifique xilitol nos 3 primeiros ingredientes), uvas-passas ou embalagens. Guarde todas as embalagens — listas de ingredientes e informações de peso são críticas.' },
      { title: 'Passo 2: Ligue para o Controle de Venenos Antes de Agir', content: 'Ligue para o Controle de Venenos ASPCA no (888) 426-4435. NÃO provoque vômito em casa — isso pode piorar certas exposições a toxinas. Só provoque vômito se orientado por um profissional, e nunca se seu cão já estiver vomitando, convulsionando ou inconsciente.' },
      { title: 'Passo 3: Anote o Horário e a Quantidade', content: 'Estime quantas unidades foram consumidas, de qual tipo (por peso) e quando. Tire fotos das embalagens para levar ao veterinário. Essas informações determinam a gravidade da toxicidade e o protocolo de tratamento.' },
      { title: 'Passo 4: Transporte ao Veterinário de Emergência se Orientado', content: 'Se o Controle de Venenos orientar a ir ao veterinário, vá imediatamente — não espere pelos sintomas. A toxicidade por chocolate e xilitol é tempo-dependente. O vômito induzido é mais eficaz dentro de 1–2 horas após a ingestão.' },
    ],
    faqs: [
      { question: 'Quanto de doce de Halloween é tóxico para um cão?', answer: 'Depende do tipo, não apenas da quantidade. Limiares tóxicos: Xilitol: 0,1 g/kg de peso corporal (um chiclete para um cão de 7 kg). Chocolate amargo: 14 g por 4,5 kg de peso corporal. Chocolate em pó: 3 g por 4,5 kg de peso corporal. Chocolate ao leite: 28 g por 4,5 kg de peso corporal. Uvas-passas: 3 g por 4,5 kg de peso corporal. Embalagens de doces: qualquer quantidade pode causar obstrução em cães pequenos.' },
      { question: 'Meu cão comeu embalagens de chocolate. O que devo fazer?', answer: 'Ligue para o Controle de Venenos no (888) 426-4435 informando o tipo de chocolate e a quantidade estimada consumida. As embalagens adicionam duas preocupações: (1) papel alumínio/plástico podem causar obstrução intestinal, especialmente em cães com menos de 7 kg; (2) o chocolate residual absorvido das embalagens aumenta a carga de teobromina. Monitore vômito, ausência de evacuação e dor abdominal por 48 horas.' },
      { question: 'Posso fazer meu cão vomitar em casa depois de comer doces?', answer: 'NÃO provoque vômito em casa com água oxigenada ou sal, a menos que especificamente instruído por um veterinário ou Controle de Venenos. Induzir vômito é contraindicado para: substâncias cáusticas, se seu cão já estiver vomitando, se estiver letárgico ou convulsionando, ou se mais de 2 horas tiverem passado. A técnica inadequada pode causar pneumonia por aspiração ou piorar a lesão.' },
      { question: 'Com que rapidez a toxicidade dos doces afeta os cães?', answer: 'Xilitol: 15–30 minutos (hipoglicemia) ou 8–12 horas (insuficiência hepática). Chocolate: 2–4 horas (sintomas aparecem), pico em 12–24 horas. Uvas-passas: 6–24 horas (vômito), dano renal em 24–72 horas. Embalagens: 12–48 horas (sintomas de obstrução). Sempre trate a ingestão de doces como emergência e contate o Controle de Venenos imediatamente.' },
    ],
    relatedTools: [
      { name: 'Verificador de Alimentos Tóxicos', href: '/shared/toxic-checker/', description: 'Verifique a toxicidade de qualquer ingrediente de doce instantaneamente.' },
      { name: 'Emergência: Comeu Xilitol', href: '/dog/emergency/ate-xylitol/', description: 'Protocolo de emergência para envenenamento por xilitol.' },
      { name: 'Emergência: Comeu Chocolate', href: '/dog/emergency/ate-chocolate/', description: 'Guia de emergência para toxicidade por chocolate.' },
    ],
  },
  'fireworks-anxiety': {
    title: 'Como Acalmar um Cão Durante Fogos de Artifício: Guia de Controle da Ansiedade',
    description: 'Guia completo para controlar a ansiedade de cães com fogos de artifício — desde estratégias de prevenção e gerenciamento ambiental até medicamentos, técnicas comportamentais e o que fazer se seu cão entrar em pânico.',
    bodyParagraphs: [
      'A ansiedade com fogos de artifício em cães é um dos problemas comportamentais mais comuns relatados por tutores e traz riscos físicos genuínos além do estresse. A cada ano, abrigos de animais relatam aumentos de 30–60% no recebimento de cães perdidos em torno de 4 de julho nos Estados Unidos, e padrões semelhantes ocorrem nas celebrações de Ano Novo e outros feriados com fogos em todo o mundo.',
      'A progressão da ansiedade leve para a fobia grave geralmente acontece gradualmente: um cão que inicialmente tremia, mas se recuperava, desenvolve ansiedade antecipatória horas antes dos eventos, depois começa a mostrar estresse em qualquer noite que se pareça com uma noite de fogos. A intervenção precoce com ferramentas adequadas previne essa escalada. Cães que sofreram episódios de pânico podem ter hormônios de estresse elevados por dias depois, afetando a função imunológica e a qualidade do sono.',
      'É importante entender que confortar um cão assustado não reforça o medo — este é um mito persistente que faz com que tutores ignorem o sofrimento de seus cães. Cães que experimentam fobia de ruído estão em terror genuíno, não buscando atenção. Fornecer um espaço seguro e presença calma os ajuda a se sentirem seguros. No entanto, o conforto dramaticamente exagerado ("Quem é o bom menino, não se preocupe, está tudo bem") pode ser interpretado como ansiedade — em vez disso, aja como se tudo estivesse normal.',
    ],
    knowledgeCards: [
      { title: 'Entendendo a Fobia Canina de Ruído', body: 'Segundo estudos comportamentais, 40–60% dos cães mostram respostas de medo a fogos de artifício ou trovoadas. Desses, aproximadamente 20% desenvolvem fobia clínica de ruído que requer intervenção. Fogos de artifício são particularmente angustiantes porque: (1) estouros altos e imprevisíveis disparam o reflexo de sobressalto, (2) vibrações de baixa frequência são sentidas pelo corpo, (3) luzes piscantes criam efeito estroboscópico que os cães percebem como ameaçador e (4) o acúmulo de eletricidade estática em alguns cães aumenta o desconforto.' },
      { title: 'Perigos Físicos do Pânico com Fogos', body: 'Cães ansiosos com fogos correm risco de: fugir (50% dos incidentes de cães perdidos em 4 de julho são relacionados a fogos, segundo o AKC), correr para o trânsito, pular cercas (mesmo cães que normalmente não escapam), machucar-se em janelas ou portas tentando fugir e, em casos extremos, eventos cardíacos pela resposta ao estresse. Alguns cães quebram dentes ou unhas tentando roer portas ou caixas de transporte.' },
      { title: 'Quando a Ansiedade se Torna Fobia', body: 'Sinais de que seu cão progrediu de ansioso para fóbico: ansiedade antecipatória começa horas antes do pôr do sol, recusa-se a sair à noite, esconde-se em locais inacessíveis, mostra sinais de estresse mesmo com reprodução de som em volume muito baixo e a ansiedade generalizada se estende além das noites de fogos para hipervigilância geral. Cães fóbicos frequentemente precisam de medicação (prescrita pelo veterinário) combinada com modificação comportamental.' },
      { title: 'Medicação vs Opções Naturais', body: 'Para ansiedade moderada: medicamentos situacionais prescritos por veterinários (trazodona, gabapentina, sileo) são eficazes e seguros. Para ansiedade leve: difusores de feromônios (Adaptil), envoltórios de compressão (ThunderShirt), suplementos de L-teanina e petiscos calmantes podem ajudar. Para cães fóbicos: é necessária uma abordagem multimodal combinando medicação + gerenciamento ambiental + treinamento de dessensibilização ao longo de semanas/meses.' },
    ],
    prevention: [
      'Exercite bem seu cão antes do início dos fogos (a exaustão reduz a resposta de ansiedade)',
      'Crie um "quarto seguro" — cômodo interno sem janelas, ruído branco, cama familiar',
      'Comece o treinamento de dessensibilização 4–6 semanas antes das datas conhecidas de fogos (não durante)',
      'Use difusor de feromônios Adaptil 2 semanas antes dos eventos previstos',
      'Certifique-se de que as informações do microchip estejam atualizadas e as etiquetas de identificação estejam em dia',
      'Feche cortinas/persianas e ligue a TV ou música para mascarar o ruído',
      'Remova o acesso a janelas e portas de vidro',
    ],
    symptoms: [
      'Ofegar, andar de um lado para o outro, tremer',
      'Choramingar, latir para os sons',
      'Tentar se esconder ou escapar',
      'Recusar comida ou petiscos',
      'Salivar excessivamente, pupilas dilatadas',
      'Agarrar-se ao tutor ou tentar subir no colo',
      'Incontinência (perda de controle da bexiga em medo intenso)',
      'Comportamento destrutivo (roer portas, arranhar paredes)',
    ],
    firstAid: [
      { title: 'Passo 1: Mantenha a Calma e a Confiança', content: 'Seu cão capta pistas emocionais de você. Fale em tom alegre e casual, em vez de tranquilizador (o tom tranquilizador valida o medo). Não puna o comportamento de ansiedade — seu cão está experimentando terror genuíno, não se comportando mal.' },
      { title: 'Passo 2: Forneça um Espaço de Refúgio Seguro', content: 'Guie seu cão para um cômodo interno silencioso com a porta fechada. Ligue uma TV ou máquina de ruído branco em volume moderado. Forneça a cama favorita ou a caixa de transporte com a porta aberta (nunca force um cão a entrar na caixa — isso aumenta o pânico se ele associar ao confinamento durante o medo).' },
      { title: 'Passo 3: Use Técnicas de Distração', content: 'Ofereça petiscos de alto valor (Kong com pasta de amendoim, petiscos congelados) para redirecionar o foco. Pratique comandos básicos que seu cão conhece bem — "senta", "toca" ou "procura" redirecionam o cérebro do medo para o trabalho. Não force a interação se seu cão preferir se esconder.' },
      { title: 'Passo 4: Previna a Fuga', content: 'Se seu cão disparar em direção a uma porta, use uma guia ou bloqueio corporal — nunca persiga, pois isso intensifica o pânico. Após o término dos fogos, verifique se seu cão está calmo antes de abrir portas externas. Monitore por 20–30 minutos após o último ruído antes de permitir acesso ao exterior.' },
    ],
    faqs: [
      { question: 'O que posso dar ao meu cão para ansiedade com fogos de artifício?', answer: 'As opções variam conforme a gravidade: Leve: suplementos de L-teanina (Anxitane, Solliquin), feromônios (difusor/coleira Adaptil), envoltórios de compressão (ThunderShirt). Moderada: trazodona ou gabapentina prescritas pelo veterinário (levam 1–2 horas para fazer efeito). Grave: Sileo (gel de dexmedetomidina nas gengivas, aprovado pela FDA para aversão a ruídos em cães) ou sedação. Nunca dê medicamentos humanos para ansiedade sem orientação veterinária.' },
      { question: 'Quanto tempo antes dos fogos devo dar medicação para ansiedade ao meu cão?', answer: 'Planeje com antecedência: trazodona/gabapentina precisam de 1–2 horas para atingir a eficácia. Administre ANTES do início dos fogos — quando seu cão já está em pânico total, os medicamentos orais são difíceis de administrar e levam muito tempo para fazer efeito. Para datas conhecidas de fogos (Ano Novo, 4 de julho), comece a medicação 2–3 horas antes do pôr do sol.' },
      { question: 'Como posso dessensibilizar meu cão aos fogos de artifício?', answer: 'A dessensibilização requer começar 8–12 semanas antes da temporada de fogos: (1) Reproduza sons de fogos em volume muito baixo (quase inaudível) durante atividades positivas (alimentação, brincadeira). (2) Ao longo de semanas, aumente gradualmente o volume. (3) Se seu cão mostrar medo em qualquer nível, reduza o volume — isso significa que você progrediu rápido demais. (4) Associe os sons a petiscos de alto valor para criar associação positiva. Considere contratar um comportamentalista certificado para fobias graves.' },
      { question: 'Fogos de artifício machucam a audição do meu cão?', answer: 'Fogos de artifício atingem 150–175 dB — alto o suficiente para causar dano auditivo permanente (o limiar de dor para cães é aproximadamente 130 dB, mais baixo que para humanos). Os cães têm audição mais sensível e mais amplificação do canal auditivo. Esta é outra razão pela qual os cães entram em pânico — dói fisicamente. Nunca deixe seu cão assistir a fogos de artifício, mesmo ao ar livre à distância.' },
    ],
    relatedTools: [
      { name: 'Calculadora de Idade Canina', href: '/dog/age-calculator/', description: 'Cães idosos podem precisar de dosagem ajustada de medicação para ansiedade.' },
    ],
  },
  'spring-allergies': {
    title: 'Alergias de Primavera em Cães: Sintomas, Tratamento e Prevenção',
    description: 'Guia completo sobre alergias de primavera caninas — pólen, grama, mofo. Aprenda a identificar sintomas de alergia, distingui-los de infecções e implementar planos de tratamento eficazes baseados nas diretrizes de dermatologia veterinária.',
    bodyParagraphs: [
      'As alergias de primavera em cães representam um problema significativo de qualidade de vida que frequentemente é subtratado porque os tutores confundem a coceira crônica com comportamento normal. Diferente dos humanos, que experimentam principalmente sintomas respiratórios (espirros, congestão nasal), os cães manifestam alergias predominantemente através da pele. Essa diferença na apresentação significa que as alergias caninas são frequentemente diagnosticadas erroneamente como problemas de higiene, em vez de verdadeira doença alérgica.',
      'O "ciclo coceira-coçar" perpetua a doença alérgica da pele além da exposição inicial ao alérgeno. Coçar danifica a barreira cutânea, permitindo que bactérias e leveduras colonizem, o que desencadeia mais inflamação e coceira. É por isso que cães alérgicos que inicialmente só coçam na primavera podem desenvolver problemas de pele durante todo o ano se desenvolverem infecções secundárias crônicas que não se resolvem sozinhas.',
      'O manejo moderno das alergias veterinárias foi além da simples supressão de sintomas. Tratamentos como Cytopoint (uma injeção de anticorpo monoclonal que tem como alvo a IL-31, a principal citocina da coceira) fornecem alívio direcionado sem os efeitos colaterais dos esteroides de longo prazo. O Apoquel (oclacitinibe) tem como alvo múltiplas vias inflamatórias em 4 horas. Essas opções prescritas são mais eficazes do que anti-histamínicos de venda livre para casos moderados a graves.',
    ],
    knowledgeCards: [
      { title: 'Tipos de Alergias de Primavera em Cães', body: 'As alergias de primavera caninas se dividem em três categorias: (1) Dermatite atópica — reação alérgica por inalação ao pólen (árvores, grama, ervas daninhas), afetando pele e orelhas. (2) Alergias de contato — reação direta da pele à grama, cobertura morta ou pesticidas. (3) Dermatite alérgica à pulga — a explosão populacional de pulgas na primavera desencadeia reações graves mesmo com picadas únicas. Pelo menos 10–15% dos cães sofrem de alergias sazonais, segundo dados da AAHA.' },
      { title: 'Cronograma dos Alérgenos Comuns da Primavera', body: 'O pólen de árvores atinge o pico em março–abril (carvalho, bétula, cedro, bordo). O pólen de grama atinge o pico em maio–junho (Bermuda, Timothy, Kentucky bluegrass). O pólen de ervas daninhas começa no final de junho. Os esporos de mofo aumentam com as chuvas da primavera. Conhecer seu calendário local de pólen (consulte pollen.com) ajuda a prever quando os sintomas do seu cão vão aparecer e permite tratamento preventivo.' },
      { title: 'Infecções Secundárias: O Perigo Oculto', body: 'A pele alérgica cria ambientes quentes, úmidos e inflamados, ideais para o crescimento excessivo de bactérias (Staphylococcus) e leveduras (Malassezia). Estudos mostram que 60–80% dos cães com dermatite atópica desenvolvem infecções secundárias que perpetuam o ciclo de coceira mesmo após a diminuição da exposição ao alérgeno. Sinais de infecção secundária: pele oleosa, odor doce/de levedura, pele escura/descolorida e coceira persistente mesmo em dias de baixo pólen.' },
      { title: 'O Padrão Pata-Lamber-Orelha-Coçar', body: 'A apresentação clássica das alergias de primavera caninas: lambedura excessiva das patas (especialmente entre os dedos), infecções de ouvido (sacudir a cabeça, esfregar as orelhas nos móveis) e coçar os flancos/axilas. Esse padrão específico distingue alergias de outras condições de pele. Se você observar os três ocorrendo simultaneamente na primavera, alergias sazonais são a causa provável.' },
    ],
    prevention: [
      'Limpe as patas com pano úmido após cada passeio ao ar livre para remover o pólen',
      'Dê banho no cão semanalmente com shampoo hipoalergênico durante as semanas de pico de pólen',
      'Mantenha as janelas fechadas em dias de alto pólen; use filtragem HEPA em ambientes internos',
      'Evite caminhar por grama recém-cortada ou ervas daninhas altas',
      'Lave a cama do cão semanalmente em água quente durante a temporada de alergias',
      'Pergunte ao seu veterinário sobre iniciar anti-histamínicos ANTES do pico da temporada de pólen',
      'Gerencie a prevenção contra pulgas de forma agressiva na primavera (uma única picada de pulga piora a inflamação alérgica)',
    ],
    symptoms: [
      'Lambedura e mastigação excessivas das patas',
      'Infecções de ouvido recorrentes (sacudir a cabeça, odor no ouvido)',
      'Pele vermelha e irritada nas axilas, virilha e barriga',
      'Coceira e arranhões nos flancos (laterais)',
      'Olhos lacrimejantes ou secreção nasal',
      'Esfregar o rosto em móveis ou carpete',
      'Perda de pelo por coçar ou lamber',
      'Pele oleosa com odor incomum (sinal de infecção secundária)',
    ],
    firstAid: [
      { title: 'Passo 1: Avalie a Gravidade', content: 'Leve: Coceira ocasional, mas comendo e brincando normalmente. Moderada: Coceira persistente, sono interrompido, leve vermelhidão na pele. Grave: Feridas abertas, pele sangrando, recusa em comer, desconforto constante. Alergias graves exigem tratamento prescrito pelo veterinário — não apenas cuidados caseiros.' },
      { title: 'Passo 2: Medidas de Alívio Imediato', content: 'Dê um banho frio (não gelado) com shampoo à base de aveia coloidal para remover o pólen e acalmar a pele. Limpe as patas com pano úmido após os passeios. Aplique uma compressa fria nos pontos quentes. Use um colar elizabetano (cone) se seu cão não parar de lamber um ponto quente.' },
      { title: 'Passo 3: Monitore sinais de Infecção', content: 'Verifique as áreas irritadas diariamente quanto a: secreção oleosa ou crostosa, odor doce/de levedura e escurecimento da cor da pele. Esses sinais indicam infecção bacteriana ou por levedura secundária que requer antibióticos ou antifúngicos prescritos pelo veterinário — não apenas controle de alergia.' },
      { title: 'Passo 4: Agende uma Consulta Veterinária', content: 'Se os sintomas persistirem por mais de 1 semana apesar do manejo básico, ou se surgirem sinais secundários, agende uma visita ao veterinário. Seu veterinário pode prescrever Apoquel (oclacitinibe), injeções de Cytopoint (anti-IL-31) ou imunoterapia para alergia (vacinas antialérgicas) para controle de longo prazo.' },
    ],
    faqs: [
      { question: 'Como saber se meu cão tem alergia de primavera ou infecção?', answer: 'Alergias sazonais seguem um padrão: os sintomas reaparecem a cada primavera/verão, a lambedura das patas e o envolvimento das orelhas são proeminentes e a resposta aos anti-histamínicos é rápida. Infecções tipicamente têm odor localizado, secreção e pele oleosa. O sinal que quebra o padrão é a persistência dos sintomas fora da temporada de alergias — isso sugere dermatite atópica (alergias durante todo o ano) ou doença de pele não alérgica que requer diagnóstico veterinário.' },
      { question: 'Posso dar Benadryl (difenidramina) para alergias ao meu cão?', answer: 'Sim, a difenidramina (Benadryl) é comumente usada em cães na dose de 1 mg por libra de peso corporal a cada 8–12 horas. Use apenas difenidramina pura — evite fórmulas com descongestionantes (pseudoefedrina) ou álcool, que são tóxicos. O Benadryl ajuda 30% dos cães alérgicos. Opções melhores prescritas por veterinários incluem Apoquel (oclacitinibe) e injeções de Cytopoint, que atacam a coceira de forma mais específica. Sempre confirme a dosagem com seu veterinário primeiro.' },
      { question: 'Quando é o pior período da alergia de primavera para cães?', answer: 'O pico da temporada de alergia de primavera para cães na América do Norte é de abril a junho, quando o pólen de árvores e o pólen inicial de grama estão mais altos. Em climas mais quentes, as temporadas de alergia começam mais cedo (fevereiro) e duram mais. O verão e o outono trazem seus próprios picos de alérgenos. Acompanhe os sintomas do seu cão durante todo o ano — se ocorrerem por mais de 3 meses, podem ter se tornado alergias durante todo o ano, em vez de verdadeiramente sazonais.' },
      { question: 'Certas raças têm alergias de primavera piores?', answer: 'Sim — raças predispostas à dermatite atópica incluem: West Highland White Terrier, Buldogue Francês, Buldogue, Golden Retriever, Labrador Retriever, Pastor Alemão, Cocker Spaniel, Boxer e Boston Terrier. Raças braquicefálicas (buldogues, pugs) frequentemente têm dermatite de dobras cutâneas concomitante que piora com a inflamação alérgica. A intervenção precoce nessas raças é especialmente importante.' },
    ],
    relatedTools: [
      { name: 'Calculadora de Calorias para Cães', href: '/dog/calorie-calculator/', description: 'Ajuste a alimentação se as alergias causarem perda de peso por estresse.' },
    ],
  },
  'thanksgiving': {
    title: 'Alimentos de Ação de Graças que Cães Podem Comer: Guia de Seguros vs Perigosos',
    description: 'Guia completo de segurança alimentar de Ação de Graças para cães — quais alimentos são seguros (peru simples, abóbora, vagem), quais são tóxicos (uvas, cebola, manteiga, álcool) e dicas de controle de porções. Inclui passos de emergência para ingestão tóxica.',
    bodyParagraphs: [
      'O Dia de Ação de Graças cria um ambiente de risco único, onde múltiplos alimentos tóxicos são preparados simultaneamente, a comida fica acessível por períodos prolongados e a combinação de ingredientes ricos em gordura com alimentos que contêm toxinas (cebola no recheio, uvas em saladas) cria perigos compostos que não existem em refeições comuns.',
      'A pancreatite merece atenção especial durante o Ação de Graças porque é a emergência veterinária mais comum relacionada ao feriado. A condição ocorre quando as enzimas dentro do pâncreas são ativadas prematuramente, fazendo com que o pâncreas essencialmente se digira. As taxas de mortalidade para pancreatite grave variam de 20–40%, mesmo com tratamento agressivo. Cães que desenvolvem pancreatite no Ação de Graças frequentemente desenvolvem episódios crônicos e recorrentes que afetam sua qualidade de vida permanentemente.',
      'Uma abordagem responsável para o Ação de Graças com cães é preparar um "prato do cão" separado com alimentos seguros e simples antes do início da refeição. Isso satisfaz o desejo do tutor de incluir o animal na celebração, evitando completamente a exposição a alimentos tóxicos. A realidade é que mesmo alimentos natalinos aparentemente benignos trazem riscos cumulativos que ultrapassam a suposição de segurança de "só uma mordidinha".',
    ],
    knowledgeCards: [
      { title: 'Ação de Graças: Alimentos Seguros para Cães', body: 'Seguros para cães (em pequenas porções): Carne de peru simples sem tempero (branca ou escura), vagem cozida simples (sem manteiga/alho), batata-doce simples cozida (sem marshmallows), abóbora simples (purê de abóbora puro, não o tipo adoçado), cenoura cozida (sem manteiga) e arroz branco simples. Todos devem ser sem tempero, sem manteiga e servidos em pequenas quantidades — cerca de 1–2 colheres de sopa por 9 kg de peso corporal.' },
      { title: 'Ação de Graças: Alimentos Perigosos ou Tóxicos para Cães', body: 'Perigosos/tóxicos: recheio (cebola, alho, sálvia), molho gravy (alho, cebola, gordura), purê de batatas (manteiga, alho, cebolinha), batata-doce caramelada com marshmallows (açúcar, xilitol em alguns), pãezinhos de jantar (a massa expande e o fermento fermenta), molho de cranberry (alto teor de açúcar, às vezes com uva/xilitol), torta de abóbora (noz-moscada é tóxica, além de açúcar/gordura), sobremesas de chocolate, tortas de nozes de macadâmia e qualquer alimento com cebola ou alho.' },
      { title: 'O Perigo da Massa: Expansão do Fermento Cru', body: 'Massa de pão não assada é extremamente perigosa para cães. O ambiente quente e úmido do estômago do cão faz o fermento fermentar, produzindo álcool (toxicose por etanol) E expandindo a massa que pode bloquear o estômago. Sintomas: abdômen distendido, vômito, desorientação e cambaleio. Um único pedaço de massa do tamanho de um pãozinho pode causar envenenamento por álcool em um cão de 9 kg.' },
      { title: 'Toxicidade por Gordura e Pancreatite', body: 'Os alimentos de Ação de Graças são tipicamente muito ricos em gordura (manteiga, óleo, molho, pele de peru). A alta ingestão de gordura é o gatilho dietético número 1 para pancreatite canina, uma inflamação pancreática com risco de vida. A pancreatite normalmente se apresenta 12–72 horas após a refeição gordurosa com: vômito intenso, dor abdominal (posição de prece), letargia e febre. Requer cuidados veterinários imediatos com fluidos intravenosos e controle da dor.' },
    ],
    prevention: [
      'Prepare um pequeno prato de alimentos seguros antes do início da refeição (peru simples, vagem, batata-doce simples)',
      'Coloque-o antecipadamente em um local afastado da mesa para evitar que o cão peça comida à mesa',
      'Instrua os convidados de que a política de "sem restos de mesa" está em vigor por razões de saúde',
      'Descarte todos os ossos de peru e restos de comida em uma lixeira externa imediatamente',
      'Recolha os pratos da mesa prontamente — cães são oportunistas',
      'Não permita que cães acessem a cozinha ou área de jantar durante o preparo e serviço da refeição',
      'Monitore os sistemas de descarte de lixo — cães podem acessar restos de comida em latas de lixo abertas',
    ],
    symptoms: [
      'Vômito (especialmente repetido) ou diarreia dentro de 2–24 horas',
      'Dor abdominal demonstrada pela "posição de prece" (frente abaixada, traseiro elevado)',
      'Letargia intensa, fraqueza ou relutância em se mover',
      'Abdômen distendido ou inchado (possível dilatação ou expansão de massa)',
      'Tremores, desorientação (álcool da massa fermentada)',
      'Sede ou micção excessiva seguida de ausência (toxicidade por uva — 24–48 horas)',
      'Gengivas pálidas, fraqueza, respiração rápida (anemia por cebola/alho — 2–5 dias)',
    ],
    firstAid: [
      { title: 'Passo 1: Identifique o Que Seu Cão Comeu', content: 'Verifique rapidamente o que foi deixado sem supervisão. Molho, recheio e vegetais com manteiga indicam exposição a alto teor de gordura (risco de pancreatite). Se massa foi ingerida, envenenamento por álcool é uma preocupação. Se uvas/uva-passas foram consumidas, risco de insuficiência renal. Priorize com base na toxina específica identificada.' },
      { title: 'Passo 2: Ligue para o Controle de Venenos', content: 'Controle de Venenos Animais ASPCA: (888) 426-4435. Forneça: peso do cão, o que foi ingerido, quantidade estimada e tempo desde a ingestão. Refeições ricas em gordura exigem monitoramento por 72 horas para pancreatite, mesmo que não apareçam sintomas imediatos.' },
      { title: 'Passo 3: Não Espere pelos Sintomas', content: 'Se seu cão comeu massa (risco de álcool), uvas (risco de insuficiência renal) ou grandes quantidades de cebola/alho (risco de anemia), busque atendimento veterinário antes que os sintomas comecem. O intervalo entre a ingestão e os sintomas pode ser de 12–72 horas, durante o qual podem ocorrer danos irreversíveis.' },
      { title: 'Passo 4: Monitore Após Qualquer Excesso', content: 'Mesmo que nenhuma toxina específica seja identificada, a ingestão de alto teor de gordura requer monitoramento de 12–72 horas para sinais de pancreatite. Restrinja a comida por 12 horas após a ingestão gordurosa (permita água) e depois ofereça uma pequena refeição leve. Se ocorrer vômito ou persistir, busque atendimento veterinário imediatamente.' },
    ],
    faqs: [
      { question: 'Cães podem comer peru de Ação de Graças?', answer: 'Sim, carne de peru simples sem tempero (sem pele, sem ossos) é segura para cães em pequenas porções — cerca de 1–2 colheres de sopa por 9 kg de peso corporal. Remova todos os ossos (risco de fragmentação), pele (alto teor de gordura) e certifique-se de que não foram usados temperos (alho, cebola, ervas). A carne branca tem menos gordura que a carne escura e é mais segura para cães propensos a pancreatite.' },
      { question: 'Torta de abóbora é segura para cães?', answer: 'Não. A torta de abóbora contém noz-moscada (tóxica para cães, causando alucinações e taquicardia), alto teor de açúcar (desconforto gastrointestinal, consequências dentárias/diabéticas de longo prazo), laticínios (muitos cães são intolerantes à lactose) e especiarias. Abóbora em lata pura (purê de abóbora, não recheio de torta) é segura e realmente benéfica para a digestão — até 1 colher de sopa por 4,5 kg de cão.' },
      { question: 'Meu cão comeu recheio de Ação de Graças. O que devo fazer?', answer: 'Ligue para o Controle de Venenos no (888) 426-4435. O recheio normalmente contém múltiplas toxinas: cebola e alho (causam anemia hemolítica a 0,5% do peso corporal), alto teor de manteiga/gordura (risco de pancreatite) e às vezes ervas (sálvia pode causar desconforto gastrointestinal). Os sintomas podem não aparecer por 2–5 dias com toxicidade por cebola/alho, tornando importante o monitoramento veterinário precoce.' },
      { question: 'Cães podem comer purê de batatas de Ação de Graças?', answer: 'O purê de batatas tradicional NÃO é seguro para cães devido à adição de manteiga (alto teor de gordura), leite (risco de intolerância à lactose), alho (tóxico) e cebolinha (tóxica). Batata cozida simples, sem nenhuma adição, é segura em pequenas quantidades. O vegetal de Ação de Graças mais seguro para cães é vagem ou cenoura cozida simples, sem nada adicionado.' },
    ],
    relatedTools: [
      { name: 'Verificador de Alimentos Tóxicos', href: '/shared/toxic-checker/', description: 'Verifique a segurança de qualquer ingrediente de Ação de Graças.' },
      { name: 'Calculadora de Calorias para Cães', href: '/dog/calorie-calculator/', description: 'Contabilize a ingestão extra de calorias do feriado.' },
      { name: 'Emergência: Comeu Uvas', href: '/dog/emergency/ate-grapes/', description: 'Guia de emergência para toxicidade por uva/uva-passa.' },
    ],
  },
  'easter-chocolate': {
    title: 'Chocolate de Páscoa e Cães: Segurança na Caça aos Ovos',
    description: 'Guia de toxicidade do chocolate de Páscoa para tutores de cães — limites de envenenamento por teobromina, perigos específicos da Páscoa (ovos, grama sintética, lírios), cronograma de sintomas e tratamento de emergência para ingestão de chocolate.',
    bodyParagraphs: [
      'A Páscoa combina múltiplas toxinas (chocolate, xilitol) com perigos físicos (grama sintética, brinquedos) em um ambiente onde os cães ficam confinados dentro de casa, próximos a tentações que vão além dos doces.',
      'O cronograma de sintomas do chocolate cria uma falsa segurança — a teobromina atinge o pico 10–12 horas após a ingestão. Os efeitos cardíacos podem se desenvolver bem depois que o cão "parecia bem". Contate o Controle de Venenos imediatamente, em vez de esperar.',
      '"Um pouquinho de chocolate não faz mal" é perigosamente errado. Um único ovo de Páscoa de chocolate amargo pode fornecer uma dose tóxica para um cão de porte médio. Doces sem açúcar comercializados como "saudáveis" frequentemente contêm xilitol, letal em doses minúsculas.',
    ],
    knowledgeCards: [
      { title: 'Perigos do Chocolate Específicos da Páscoa', body: 'A Páscoa concentra múltiplos riscos relacionados ao chocolate: (1) Ovos e coelhos de chocolate são frequentemente amargos ou meio amargos (maior teor de teobromina que o chocolate ao leite). (2) Ovos embrulhados em papel alumínio apresentam risco duplo — toxicidade por chocolate mais obstrução intestinal por alumínio. (3) Cestas de Páscoa são frequentemente colocadas em mesas de centro na altura acessível aos cães. (4) A grama sintética de Páscoa (plástico ou papel) causa obstrução intestinal se engolida. (5) Grandes quantidades de chocolate estão frequentemente em uso simultâneo para as caças aos ovos.' },
      { title: 'A Matemática da Toxicidade do Chocolate', body: 'Teor de teobromina por tipo de chocolate (por 30 g): Branco: 0,25 mg. Ao leite: 44–60 mg. Meio amargo: 150 mg. Em pó (sem açúcar): 390–450 mg. Limiar tóxico para cães: sintomas leves a 20 mg/kg, graves a 40 mg/kg, convulsões a 60 mg/kg. Um coelho de chocolate de 85 g (3 oz de chocolate ao leite = ~150 mg de teobromina) atinge o limiar de toxicidade moderada para um cão de 9 kg. Apenas 30 g de chocolate em pó é gravemente tóxico para o mesmo cão.' },
      { title: 'Grama Sintética de Páscoa: O Perigo Oculto', body: 'A grama sintética de plástico é um perigo de corpo estranho linear — pode ancorar no estômago e serrar as paredes intestinais. A grama de papel é parcialmente digerível, mas pode se aglomerar e causar obstrução. Ambos os tipos são atraentes para os cães porque ficam revestidos com resíduos de chocolate das cestas de Páscoa. Sinais de obstrução: vômito repetido, ausência de evacuação, dor abdominal e letargia dentro de 12–72 horas.' },
      { title: 'O Cronograma de Sintomas', body: '0–2 horas: Inquietação, ofegar, sede aumentada, vômito. 2–12 horas: Frequência cardíaca elevada (>100 bpm), tremores musculares, aumento da micção. 12–48 horas: Convulsões (casos mais graves), arritmias, hipertermia (>40 °C). 48–72 horas: Os sintomas gradualmente se resolvem com cuidados de suporte, mas danos cardíacos podem persistir. Janela crítica de tratamento: induzir vômito dentro de 1 hora remove 30–50% do conteúdo estomacal; a eficácia cai drasticamente após 2 horas.' },
    ],
    prevention: [
      'Mantenha as cestas de Páscoa acima da altura do cão ou atrás de portas fechadas',
      'Conte os itens de chocolate antes e depois das caças aos ovos — saiba imediatamente se algum estiver faltando',
      'NÃO permita que cães participem da caça aos ovos com crianças — ovos de chocolate devem ser mantidos separados de petiscos para animais',
      'Encha alguns ovos escondidos com petiscos seguros para cães (cenoura, fatias de maçã, petiscos caninos) como distração',
      'Use grama de papel em vez de grama de plástico (menor risco de obstrução)',
      'Descarte todas as embalagens de chocolate e papel alumínio em lixeiras externas seladas',
      'Mantenha os cães dentro de casa durante a caça aos ovos se não estiverem sob controle direto com guia',
    ],
    symptoms: [
      'Vômito ou diarreia (pode conter pedaços de chocolate ou papel alumínio)',
      'Inquietação, hiperatividade ou agitação',
      'Ofegar excessivo e frequência cardíaca elevada',
      'Aumento da sede e micção',
      'Tremores musculares ou contrações',
      'Convulsões (indica toxicidade grave)',
      'Rigidez ou marcha anormal',
    ],
    firstAid: [
      { title: 'Passo 1: Calcule a Dose Tóxica', content: 'Determine: (1) Tipo de chocolate ingerido (ao leite, amargo, em pó), (2) Peso aproximado em gramas consumido, (3) Peso corporal do seu cão. Use a calculadora de limiar tóxico: chocolate ao leite tóxico a 28 g por 4,5 kg de peso corporal; chocolate amargo a 14 g por 4,5 kg; chocolate em pó a 3 g por 4,5 kg.' },
      { title: 'Passo 2: Ligue para o Controle de Venenos Imediatamente', content: 'Controle de Venenos Animais ASPCA: (888) 426-4435. Informe a dose calculada. Se o limiar for excedido, vá ao veterinário de emergência. NÃO espere pelos sintomas — a absorção de teobromina continua por mais de 12 horas e os sintomas podem não aparecer até que danos graves tenham ocorrido.' },
      { title: 'Passo 3: NÃO Provoque Vômito em Casa', content: 'NÃO tente indução caseira de vômito com água oxigenada. Isso é perigoso se seu cão já estiver convulsionando, tiver consciência comprometida ou se o chocolate foi consumido há mais de 1–2 horas (o vômito repetido não remove toxina significativa). Só induza o vômito sob orientação veterinária.' },
      { title: 'Passo 4: Tratamento Veterinário', content: 'Tratamento para toxicidade por chocolate: (1) Indução de vômito dentro de 1–2 horas, (2) Carvão ativado para ligar a teobromina remanescente, (3) Fluidos intravenosos para acelerar a excreção renal, (4) Monitoramento da frequência cardíaca por 12–24 horas, (5) Medicamentos anticonvulsivantes se indicado. A hospitalização geralmente dura 12–36 horas para toxicidade moderada.' },
    ],
    faqs: [
      { question: 'Meu cão comeu um ovo de Páscoa de chocolate. Quanto é tóxico?', answer: 'Depende do tipo de chocolate, do peso do ovo e do tamanho do seu cão. Um ovo de Páscoa típico de chocolate ao leite embrulhado em papel alumínio pesa 30–60 g — para um cão de 9 kg, um ovo atinge o limiar de toxicidade moderada (20 mg/kg de teobromina). Ovos de chocolate amargo são 3–4 vezes mais tóxicos com o mesmo peso. Ovos de chocolate em pó podem ser letais para cães pequenos. Ligue para o Controle de Venenos ASPCA (888) 426-4435 informando o tipo de chocolate e o peso do seu cão para avaliação de risco imediata.' },
      { question: 'Lírios de Páscoa são perigosos para cães?', answer: 'Os lírios de Páscoa (Lilium longiflorum) NÃO são tóxicos para cães (diferente dos gatos, onde causam insuficiência renal fatal). No entanto, cães que mastigam caules/folhas de lírio podem apresentar leve desconforto gastrointestinal (vômito, diarreia). Perigos de Páscoa mais relevantes incluem ovos de chocolate (teobromina), grama sintética de plástico (obstrução intestinal) e xilitol em balas sem açúcar. Mantenha os lírios longe de lares com múltiplos animais que tenham gatos.' },
      { question: 'Por quanto tempo após comer chocolate devo me preocupar com meu cão?', answer: 'A teobromina do chocolate é absorvida ao longo de 6–12 horas, os sintomas podem aparecer até 72 horas após a ingestão. O xilitol age mais rápido: hipoglicemia em 15–30 minutos, insuficiência hepática em 8–12 horas. Ligue para o Controle de Venenos imediatamente se souber que seu cão comeu chocolate ou xilitol. Cães tratados dentro de 2 horas têm melhores resultados. Monitore por 72 horas mesmo após o tratamento.' },
    ],
    relatedTools: [
      { name: 'Verificador de Alimentos Tóxicos', href: '/shared/toxic-checker/', description: 'Verifique a toxicidade de chocolate/doces instantaneamente.' },
      { name: 'Emergência: Comeu Chocolate', href: '/dog/emergency/ate-chocolate/', description: 'Protocolo completo de emergência para toxicidade por chocolate.' },
    ],
  },
};

// Write Portuguese translations
const ptData = JSON.parse(fs.readFileSync('messages/pt.json', 'utf8'));
// Deep-merge: preserve existing fields (slug, severity, season, keywords, relatedEmergency, citations)
// from the original pt.json that are not in the translation object
for (const key of Object.keys(pt)) {
  ptData.seasonal[key] = { ...ptData.seasonal[key], ...pt[key] };
}
fs.writeFileSync('messages/pt.json', JSON.stringify(ptData, null, 2));
console.log('pt.json updated');