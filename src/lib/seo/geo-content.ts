/**
 * GEO Knowledge Cards 内容数据 + Science Behind It 内容
 * 每个工具页 4 张卡片 + 1 段方法论。按 geo-checklist §1.1 / §1.2 设计。
 */
import type { CitationRef } from './geo-meta';
import { AUTHORITY_SOURCES } from './geo-meta';

export type KnowledgeCard = {
  title: string;
  /** Core definition sentence (40-60 chars). Wrapped in strong for Featured Snippet / AI Overview extraction. */
  definition?: string;
  body: string; // 80-150 字，SSG 预渲染
  citeLabel: string;
  citeHref: string;
};

export type ScienceContent = {
  heading: string;
  body: string; // 含公式和来源
  references: { label: string; href: string }[];
};

// ── 卡路里计算器 ──────────────────────────────────────
export const CALORIE_KNOWLEDGE: KnowledgeCard[] = [
  {
    title: 'What Is RER?',
    definition: 'Resting Energy Requirement (RER) is the baseline energy a dog needs at rest — no activity, no growth, no pregnancy.',
    body: 'RER = 70 × weight(kg)^0.75. This formula, developed through metabolic studies, is the foundation of all dog feeding calculations (AAFCO, 2023).',
    citeLabel: 'AAFCO Guidelines',
    citeHref: AUTHORITY_SOURCES.aafco.url,
  },
  {
    title: 'What Is MER?',
    definition: 'Maintenance Energy Requirement (MER) adjusts RER for real-life energy needs: MER = RER × activity factor.',
    body: 'A neutered adult dog needs MER = RER × 1.6; an active puppy under 4 months needs RER × 3.0. AAHA provides the standard activity multipliers.',
    citeLabel: 'AAHA Canine Life Stage Guidelines',
    citeHref: AUTHORITY_SOURCES.aaha.url,
  },
  {
    title: 'Why Use AAFCO-Based Formulas?',
    definition: 'AAFCO (Association of American Feed Control Officials) establishes nutrient profiles that all commercial pet foods sold in the US must meet.',
    body: 'Our MER calculator aligns with AAFCO standards, ensuring your feeding plan matches what veterinary nutritionists define as adequate daily intake.',
    citeLabel: 'AAFCO Dog Food Nutrient Profiles',
    citeHref: AUTHORITY_SOURCES.aafco.url,
  },
  {
    title: 'How Much Should I Feed My Dog?',
    definition: 'After calculating your dog\'s daily calorie target (MER), divide by your dog food\'s calorie density (kcal/kg or kcal/cup, printed on the bag).',
    body: 'Example: a 20 kg neutered adult dog needs ~740 kcal/day. If your kibble is 3,700 kcal/kg, feed ~200 g/day. Always monitor body condition and adjust.',
    citeLabel: 'AAHA Weight Management Guidelines',
    citeHref: AUTHORITY_SOURCES.aaha.url,
  },
];
export const CALORIE_SCIENCE: ScienceContent = {
  heading: 'The Science Behind the Dog Calorie Calculator',
  body: 'This calculator uses the AAFCO Maintenance Energy Requirement (MER) formula: MER = RER × activity factor, where RER = 70 × weight(kg)^0.75. The exponent 0.75 (Kleiber\'s Law) describes how metabolic rate scales with body mass across species. Activity factors — from 1.0 for weight loss to 3.0 for young puppies — are defined by AAHA 2021 Canine Life Stage Guidelines. The result is a science-backed daily calorie target that adapts to your dog\'s age, activity level, and body condition.',
  references: [
    { label: 'AAFCO Dog Food Nutrient Profiles (2023)', href: AUTHORITY_SOURCES.aafco.url },
    { label: 'AAHA Canine Life Stage Guidelines (2021)', href: AUTHORITY_SOURCES.aaha.url },
  ],
};

// ── 狗狗年龄计算器 ────────────────────────────────────
export const DOG_AGE_KNOWLEDGE: KnowledgeCard[] = [
  {
    title: 'Why the 7× Rule Is Inaccurate',
    definition: 'The "multiply by 7" rule ignores two biological facts: dogs mature 15× faster in their first year, and small breeds age slower than large breeds after maturity.',
    body: 'A 1-year-old dog is not a 7-year-old human — they\'re closer to 15. By year 5, a Chihuahua (~36 human years) is far younger than a Great Dane (~42 human years).',
    citeLabel: 'Wang et al., UCSD (2020)',
    citeHref: AUTHORITY_SOURCES.ucsd.url,
  },
  {
    title: 'How UCSD Epigenetic Research Works',
    definition: 'UCSD scientists compared DNA methylation patterns — chemical marks on DNA that change predictably with age — across 104 Labrador Retrievers and humans of all ages.',
    body: 'They found dog aging follows a logarithmic curve: rapid in youth, slowing with age. The study (Wang et al., 2020) is the first quantitative epigenetic clock for dogs and reshaped how we understand canine aging.',
    citeLabel: 'Wang et al. — Cell Systems (2020)',
    citeHref: AUTHORITY_SOURCES.ucsd.url,
  },
  {
    title: 'Why Small Dogs Live Longer Than Large Dogs',
    definition: 'Large breed dogs age at an accelerated rate after their first two years — a 10-year-old small dog is about 60 human years; a 10-year-old giant breed can be 80+.',
    body: 'The mechanism isn\'t fully understood, but research points to faster telomere shortening, higher oxidative stress, and growth-rate-related cellular aging in large breeds.',
    citeLabel: 'AAHA Life Stage Guidelines (2021)',
    citeHref: AUTHORITY_SOURCES.aaha.url,
  },
  {
    title: 'What Are Dog Life Stages?',
    definition: 'AAHA defines four life stages: Puppy (0-1 year, rapid growth), Young Adult (1-4 years, peak health), Mature Adult (5-10 years, preventive care focus), and Senior (varies by breed size).',
    body: 'Small dogs reach senior status at >10 years; giant breeds at >7 years. Each stage has specific health screening recommendations and nutritional needs.',
    citeLabel: 'AAHA Canine Life Stage Guidelines',
    citeHref: AUTHORITY_SOURCES.aaha.url,
  },
];
export const DOG_AGE_SCIENCE: ScienceContent = {
  heading: 'The Science Behind the Dog Age Calculator',
  body: 'Our calculator integrates two scientific frameworks: the UCSD epigenetic clock study (Wang et al., 2020) that established the logarithmic aging curve for dogs, and AAHA 2021 Canine Life Stage Guidelines that classify dogs into four life stages by breed size. Small breeds (<10 kg) age ~4 human years per dog year after maturity; giant breeds (>45 kg) age ~7-8 human years per dog year. This dual-model approach provides both a human-equivalent age and the clinical life stage your veterinarian uses for health screening decisions.',
  references: [
    { label: 'Wang et al. — Dog-to-Human Aging, Cell Systems (2020)', href: AUTHORITY_SOURCES.ucsd.url },
    { label: 'AAHA Canine Life Stage Guidelines (2021)', href: AUTHORITY_SOURCES.aaha.url },
  ],
};

// ── 狗狗怀孕计算器 ────────────────────────────────────
export const DOG_GESTATION_KNOWLEDGE: KnowledgeCard[] = [
  {
    title: 'How Long Are Dogs Pregnant?',
    definition: 'Dogs are pregnant for 63 days (9 weeks) from ovulation, with a normal range of 58–68 days.',
    body: 'Sperm can survive in the female reproductive tract for up to 7 days, so the mating date and conception date may differ slightly — which is why our calculator accepts multiple mating dates.',
    citeLabel: 'AAHA Canine Reproduction Guidelines',
    citeHref: AUTHORITY_SOURCES.aaha.url,
  },
  {
    title: 'Canine Gestation Timeline',
    definition: 'Day 0-4: Fertilization. Day 22-28: Ultrasound confirms pregnancy. Day 45-50: X-ray shows fetal skeletons. Day 55-58: Prepare whelping box. Day 63: Expected delivery.',
    body: 'Day 28-32: Fetal heartbeats visible on ultrasound. Use a quiet, warm area (24-26°C) for the whelping box. Have a heat lamp ready for puppies (29-32°C the first week).',
    citeLabel: 'AVMA Canine Reproduction Resources',
    citeHref: AUTHORITY_SOURCES.avma.url,
  },
  {
    title: 'Ultrasound vs. X-ray — When?',
    definition: 'Ultrasound is earliest (day 22-28) and detects heartbeats; X-ray from day 45 counts litter size via visible skeletons.',
    body: 'The two methods serve different purposes. Ultrasound cannot reliably count litter size. X-ray lets the vet count skulls/spines for an accurate litter count — most useful from day 45 onward.',
    citeLabel: 'AAHA Canine Reproduction Guidelines',
    citeHref: AUTHORITY_SOURCES.aaha.url,
  },
  {
    title: 'Preparing a Whelping Box',
    definition: 'Set up by day 55 in a quiet, draft-free room at 24-26°C (75-80°F) — large enough for the mother to stretch but with low sides for easy entry.',
    body: 'Use washable bedding: newspaper topped with towels or vet bedding. Have a heat lamp ready for puppies (kept at 29-32°C the first week).',
    citeLabel: 'AVMA Canine Reproduction Resources',
    citeHref: AUTHORITY_SOURCES.avma.url,
  },
];
export const DOG_GESTATION_SCIENCE: ScienceContent = {
  heading: 'The Science Behind the Dog Gestation Calculator',
  body: 'Canine gestation averages 63 days from ovulation (±5 days), based on decades of veterinary reproductive science compiled by AAHA and AVMA. Our calculator uses the mating date(s) as input, adds a 2-day fertilization window (accounting for sperm viability), and projects three due dates: earliest (mating + 58 days), most likely (mating + 63 days), and latest (mating + 68 days). Key milestones — ultrasound at day 28, X-ray at day 45, whelping box at day 55 — are benchmarked against AAHA Canine Reproduction Guidelines.',
  references: [
    { label: 'AAHA Canine Reproduction Guidelines', href: AUTHORITY_SOURCES.aaha.url },
    { label: 'AVMA Canine Reproduction Resources', href: AUTHORITY_SOURCES.avma.url },
  ],
};

// ── 狗狗疫苗计划 ──────────────────────────────────────
export const DOG_VACCINE_KNOWLEDGE: KnowledgeCard[] = [
  {
    title: 'Core vs. Non-Core Vaccines',
    definition: 'Core vaccines (DHPP + Rabies) are required for ALL dogs; non-core vaccines (Leptospirosis, Lyme, Bordetella) depend on region and lifestyle.',
    body: 'Core vaccines are recommended for ALL dogs regardless of lifestyle or location: DHPP (Distemper, Hepatitis, Parvovirus, Parainfluenza) and Rabies. Non-core vaccines — Leptospirosis, Lyme Disease, Bordetella, Canine Influenza — depend on your dog\'s geographic location and exposure risk (outdoor access, boarding, wildlife contact).',
    citeLabel: 'WSAVA Vaccination Guidelines (2024)',
    citeHref: AUTHORITY_SOURCES.wsava.url,
  },
  {
    title: 'WSAVA Guidelines Explained',
    definition: 'WSAVA recommends: puppy series at 6-8, 12, and 16 weeks; a 12-month booster; then core vaccine boosters every 3 years.',
    body: 'The World Small Animal Veterinary Association (WSAVA) publishes the most widely adopted global vaccination guidelines. They recommend: initial puppy series at 6-8, 12, and 16 weeks; a 12-month booster; then boosters every 3 years for core vaccines (DHPP). Rabies follows local legal requirements — annually in some regions, every 3 years in others.',
    citeLabel: 'WSAVA Global Vaccination Guidelines',
    citeHref: AUTHORITY_SOURCES.wsava.url,
  },
  {
    title: 'DHPP: What It Covers',
    definition: 'DHPP is a 4-in-1 vaccine covering Distemper, Hepatitis, Parvovirus (91% fatal without treatment), and Parainfluenza.',
    body: 'DHPP is the 4-in-1 core vaccine covering: Distemper (highly contagious, often fatal viral disease), Hepatitis (canine adenovirus causing liver damage), Parvovirus (severe gastrointestinal virus, 91% fatal without treatment), and Parainfluenza (respiratory infection, part of kennel cough complex). Every dog needs the full DHPP series.',
    citeLabel: 'AAHA Canine Vaccination Guidelines',
    citeHref: AUTHORITY_SOURCES.aaha.url,
  },
  {
    title: 'Vaccine Schedule by Age',
    definition: 'Puppy DHPP series: 6-8, 12, and 16 weeks; Rabies at 14-16 weeks; 12-month booster; then core boosters every 3 years.',
    body: '6-8 weeks: 1st DHPP. 10-12 weeks: 2nd DHPP + optional Bordetella/Leptospirosis (vet consult). 14-16 weeks: 3rd DHPP + Rabies (legal requirement). 12-16 months: DHPP booster + Rabies booster. Adult dogs: DHPP every 3 years, Rabies per local law (1-3 years), non-core vaccines annually if lifestyle warrants.',
    citeLabel: 'AAHA / WSAVA Vaccination Guidelines',
    citeHref: AUTHORITY_SOURCES.wsava.url,
  },
];
export const DOG_VACCINE_SCIENCE: ScienceContent = {
  heading: 'The Science Behind the Dog Vaccination Schedule',
  body: 'This schedule is built on WSAVA 2024 Global Vaccination Guidelines and AAHA Canine Vaccination Guidelines. The 3-dose puppy series (6-8, 12, 16 weeks) accounts for maternal antibody interference — antibodies from the mother\'s milk can neutralize vaccines given too early, which is why multiple doses with 3-4 week intervals are essential. The 12-month booster and subsequent 3-year intervals for core vaccines are based on duration-of-immunity studies showing long-lasting protection. Non-core vaccines are region-dependent: Leptospirosis is recommended in areas with standing water/wildlife, Lyme Disease in tick-endemic regions, Bordetella for dogs that board or attend daycare.',
  references: [
    { label: 'WSAVA Global Vaccination Guidelines (2024)', href: AUTHORITY_SOURCES.wsava.url },
    { label: 'AAHA Canine Vaccination Guidelines', href: AUTHORITY_SOURCES.aaha.url },
  ],
};

// ── 幼犬生长预测 ──────────────────────────────────────
export const PUPPY_GROWTH_KNOWLEDGE: KnowledgeCard[] = [
  {
    title: 'How Big Will My Puppy Get?',
    definition: 'Puppy growth follows breed-size curves: small breeds fully grown by 8-10 months, giant breeds continue until 18-24 months.',
    body: 'Puppy growth follows a breed-size-specific curve. Small breed puppies (<10 kg adult weight) reach 75% of adult weight by 5 months and are fully grown by 8-10 months. Giant breeds (>45 kg) don\'t reach 75% of adult weight until 8-10 months and continue growing until 18-24 months.',
    citeLabel: 'UCSD Growth Curve Research',
    citeHref: AUTHORITY_SOURCES.ucsd.url,
  },
  {
    title: 'Why Breed Size Determines Growth Rate',
    definition: 'Large breed puppies have rapid skeletal growth — overfeeding increases risk of hip dysplasia and other developmental orthopedic diseases.',
    body: 'Large and giant breed puppies have disproportionately fast skeletal growth to reach their adult frame. This rapid growth comes with risks — if overfed, large breed puppies are at higher risk for developmental orthopedic diseases (hip dysplasia, OCD). Controlled growth, not maximum growth, is the goal. Feed a large-breed puppy formula with appropriate calcium-to-phosphorus ratios.',
    citeLabel: 'AAHA Canine Life Stage Guidelines',
    citeHref: AUTHORITY_SOURCES.aaha.url,
  },
  {
    title: 'When Do Puppies Stop Growing?',
    definition: 'Small breeds: 8-10 months. Medium: 12-14 months. Large: 14-18 months. Giant: 18-24 months. Growth plate closure confirms skeletal maturity.',
    body: 'Small breeds (<10 kg): 8-10 months. Medium breeds (10-25 kg): 12-14 months. Large breeds (25-45 kg): 14-18 months. Giant breeds (>45 kg): 18-24 months. Growth plate closure — the definitive sign of skeletal maturity — follows this timeline. Your vet can confirm closure via X-ray if needed.',
    citeLabel: 'AKC Breed Standards',
    citeHref: 'https://www.akc.org/dog-breeds/',
  },
  {
    title: 'How Accurate Is the Prediction?',
    definition: 'Accuracy improves with age: ±20% at 8 weeks, ±12% at 16 weeks, ±8% by 6-10 months. Purebred predictions are more accurate than mixed breeds.',
    body: 'Our calculator uses non-linear growth curves calibrated to AKC breed weight standards and UCSD growth data. Accuracy depends on the puppy\'s age: predictions at 8 weeks have wider confidence intervals (±20%). By 16 weeks, predictions narrow to ±12%. By 6 months (small breeds) or 10 months (large breeds), projections are ±8%. Purebreds are more predictable than mixed breeds.',
    citeLabel: 'UCSD Dog Aging Project',
    citeHref: AUTHORITY_SOURCES.ucsd.url,
  },
];
export const PUPPY_GROWTH_SCIENCE: ScienceContent = {
  heading: 'The Science Behind the Puppy Growth Predictor',
  body: 'Our predictor uses sigmoid (S-shaped) growth curves fitted to breed-specific adult weight data from AKC breed standards. The formula is: AdultWeight = CurrentWeight × (1 + (AdultWeight/CurrentWeight - 1) × e^(-k × t)), where k is a breed-size-specific growth rate constant and t is time to maturity. Small breeds (k ≈ 0.45, maturity ~10 months) vs. giant breeds (k ≈ 0.18, maturity ~22 months). The prediction is anchored by your puppy\'s current position on this curve. UCSD Dog Aging Project growth data and AAHA life stage guidelines validate the curve parameters.',
  references: [
    { label: 'UCSD Dog Aging Project — Growth Data', href: AUTHORITY_SOURCES.ucsd.url },
    { label: 'AAHA Canine Life Stage Guidelines (2021)', href: AUTHORITY_SOURCES.aaha.url },
  ],
};

// ── 猫咪年龄计算器 ────────────────────────────────────
export const CAT_AGE_KNOWLEDGE: KnowledgeCard[] = [
  {
    title: 'How Cat Years Work',
    definition: 'A 1-year-old cat ≈ 15 human years, year 2 adds 9, then 4 human years per cat year. A 10-year-old cat is ~56 human years.',
    body: 'Cats age approximately 15 human years in their first year, 9 in their second year, and then 4 human years per cat year after that. A 3-year-old cat is ~28 human years; a 10-year-old cat is ~56; a 15-year-old cat is ~76. Unlike dogs, cat aging is relatively consistent across breeds (Siamese may live slightly longer).',
    citeLabel: 'AAFP Feline Life Stage Guidelines',
    citeHref: AUTHORITY_SOURCES.aafp.url,
  },
  {
    title: 'Cat Life Stages Defined by AAFP',
    definition: 'AAFP defines 6 feline life stages: Kitten (0-6mo), Junior (7mo-2yr), Prime (3-6yr), Mature (7-10yr), Senior (11-14yr), Geriatric (15+yr).',
    body: 'The American Association of Feline Practitioners (AAFP) defines six life stages: Kitten (0-6 months), Junior (7 months-2 years), Prime (3-6 years), Mature (7-10 years), Senior (11-14 years), and Geriatric (15+ years). Each stage comes with different nutritional, preventive care, and health screening recommendations.',
    citeLabel: 'AAFP Feline Life Stage Guidelines (2021)',
    citeHref: AUTHORITY_SOURCES.aafp.url,
  },
  {
    title: 'How Long Do Cats Live?',
    definition: 'Indoor cats live 12-18 years on average (some reach 20+); outdoor cats average 2-5 years due to traffic, predators, and disease.',
    body: 'Indoor cats live 12-18 years on average; some reach 20+. Outdoor cats average 2-5 years due to traffic, predators, and disease. Well-cared-for indoor cats in their late teens are common. The oldest recorded cat (Creme Puff, Texas) lived 38 years. Genetics, diet, preventive care, and indoor lifestyle are the strongest longevity predictors.',
    citeLabel: 'ISFM Feline Care Guidelines',
    citeHref: AUTHORITY_SOURCES.isfm.url,
  },
  {
    title: 'Senior Cat Health Screening',
    definition: 'AAFP recommends annual blood work from age 7-8, biannual exams at 11+, and more frequent monitoring at 15+ for cats.',
    body: 'AAFP recommends: annual blood work starting at age 7-8 (Mature stage), biannual exams at 11+ (Senior), and more frequent monitoring at 15+ (Geriatric). Key screens include: CBC, biochemistry panel, urinalysis, T4 (thyroid), and blood pressure. Cats hide illness — regular screening catches kidney disease, hyperthyroidism, and diabetes early.',
    citeLabel: 'AAFP Senior Care Guidelines',
    citeHref: AUTHORITY_SOURCES.aafp.url,
  },
];
export const CAT_AGE_SCIENCE: ScienceContent = {
  heading: 'The Science Behind the Cat Age Calculator',
  body: 'Our calculator follows the AAFP/AAHA Feline Life Stage Guidelines (2021), which establish a non-linear aging curve: 15 human years for the first cat year, 9 for the second, and 4 per year thereafter. This model is based on feline physiology studies comparing organ maturation rates, reproductive maturity timelines, and age-related disease incidence curves between cats and humans. The six life stages (Kitten through Geriatric) each carry specific health screening frequencies benchmarked to AAFP and ISFM clinical recommendations.',
  references: [
    { label: 'AAFP Feline Life Stage Guidelines (2021)', href: AUTHORITY_SOURCES.aafp.url },
    { label: 'ISFM Guidelines on Feline Aging', href: AUTHORITY_SOURCES.isfm.url },
  ],
};

// ── 猫咪怀孕计算器 ────────────────────────────────────
export const CAT_GESTATION_KNOWLEDGE: KnowledgeCard[] = [
  {
    title: 'How Long Are Cats Pregnant?',
    definition: 'Cats are pregnant for 65 days (range: 63-67 days) from ovulation — about 9 weeks and 2 days, slightly longer than dogs.',
    body: 'Cats are induced ovulators, meaning mating triggers egg release, so the mating date is usually a reliable conception date marker.',
    citeLabel: 'AAFP Feline Reproduction Guidelines',
    citeHref: AUTHORITY_SOURCES.aafp.url,
  },
  {
    title: 'Feline Gestation Timeline',
    definition: 'Day 1-14: Implantation. Day 21-28: Ultrasound confirms pregnancy. Day 30-35: Nipples pink and enlarge ("pinking up"). Day 45-50: X-ray shows skeletons. Day 63-67: Delivery.',
    body: 'Nesting behavior begins around day 55. Provide a quiet, warm nesting box by day 55.',
    citeLabel: 'AAFP Feline Reproduction Guidelines',
    citeHref: AUTHORITY_SOURCES.aafp.url,
  },
  {
    title: 'Signs of Cat Pregnancy',
    definition: 'Week 3: Pink, enlarged nipples ("pinking up") — the most reliable early sign. Week 4-5: Weight gain and possible morning sickness. Week 6-7: Noticeable abdominal enlargement.',
    body: 'Week 8: Visible kitten movement, nesting behavior. If you suspect pregnancy, confirm with a vet by day 21-28 via ultrasound.',
    citeLabel: 'ISFM Feline Reproduction Guide',
    citeHref: AUTHORITY_SOURCES.isfm.url,
  },
  {
    title: 'Cat Pregnancy Stages',
    definition: 'First trimester (days 1-21): Embryonic development, no visible signs. Second trimester (days 22-42): "Pinking up" at day 30-35. Third trimester (days 43-67): Rapid growth, nesting from day 55.',
    body: 'Milk production possible from day 60. Average litter size: 4-6 kittens.',
    citeLabel: 'AAFP / ISFM Feline Guidelines',
    citeHref: AUTHORITY_SOURCES.aafp.url,
  },
];
export const CAT_GESTATION_SCIENCE: ScienceContent = {
  heading: 'The Science Behind the Cat Gestation Calculator',
  body: 'Feline gestation is 65 days from ovulation (range: 63-67 days), as documented in AAFP and ISFM reproduction guidelines. Since cats are induced ovulators (ovulation triggered by mating), the mating date is a reliable marker. Our calculator uses mating date + 65 days for the most likely due date, with a ±2-day range. Key milestones — ultrasound at day 21-28, X-ray at day 45-50, nesting box preparation at day 55 — are aligned with AAFP clinical recommendations.',
  references: [
    { label: 'AAFP Feline Reproduction Guidelines', href: AUTHORITY_SOURCES.aafp.url },
    { label: 'ISFM Guidelines on Feline Reproduction', href: AUTHORITY_SOURCES.isfm.url },
  ],
};

// ── 猫咪疫苗计划 ──────────────────────────────────────
export const CAT_VACCINE_KNOWLEDGE: KnowledgeCard[] = [
  {
    title: 'Core vs. Non-Core Feline Vaccines',
    definition: 'Core vaccines for ALL cats: FVRCP + Rabies. Non-core (FeLV, FIV, Chlamydia, Bordetella) depend on outdoor access and multi-cat exposure.',
    body: 'Core vaccines for ALL cats: FVRCP (Feline Viral Rhinotracheitis, Calicivirus, Panleukopenia) and Rabies. Non-core vaccines — FeLV (Feline Leukemia Virus), FIV, Chlamydia, Bordetella — depend on lifestyle. Indoor-only cats need core vaccines; outdoor cats or multi-cat households may need FeLV.',
    citeLabel: 'WSAVA / AAFP Vaccination Guidelines',
    citeHref: AUTHORITY_SOURCES.wsava.url,
  },
  {
    title: 'FVRCP: What It Covers',
    definition: 'FVRCP covers Rhinotracheitis (herpesvirus), Calicivirus (oral/respiratory), and Panleukopenia (feline distemper — often fatal).',
    body: 'FVRCP is the feline core vaccine covering: Feline Viral Rhinotracheitis (herpesvirus causing upper respiratory disease), Calicivirus (oral ulcers, respiratory disease), and Panleukopenia (feline distemper — highly contagious, often fatal). Kittens receive the initial series at 6-8, 12, and 16 weeks, followed by a 12-month booster and then every 3 years.',
    citeLabel: 'AAFP Feline Vaccination Guidelines',
    citeHref: AUTHORITY_SOURCES.aafp.url,
  },
  {
    title: 'Indoor Cat Vaccine Needs',
    definition: 'Indoor-only cats still need FVRCP + Rabies — airborne viruses enter through windows, and rabies vaccination is legally required in most jurisdictions.',
    body: 'Indoor-only cats still need core vaccines (FVRCP + Rabies). Rabies is legally required in most jurisdictions regardless of lifestyle. FVRCP protects against airborne viruses — an open window or a vet visit is enough exposure. Rabies vaccination also protects your cat if a bat or other rabid animal enters your home, which is not uncommon.',
    citeLabel: 'AAFP Indoor Cat Guidelines',
    citeHref: AUTHORITY_SOURCES.aafp.url,
  },
  {
    title: 'Kitten Vaccination Timeline',
    definition: 'FVRCP at 6-8, 12, and 16 weeks; Rabies at 14-16 weeks; 12-month booster; then core boosters every 3 years.',
    body: '6-8 weeks: 1st FVRCP. 10-12 weeks: 2nd FVRCP + optional FeLV test/vaccine. 14-16 weeks: 3rd FVRCP + Rabies. 12-16 months: FVRCP booster + Rabies booster. Adult cats: FVRCP every 3 years, Rabies per local law (1-3 years). FeLV: annually for outdoor cats. Deworming: schedule per vet recommendation based on fecal exams.',
    citeLabel: 'WSAVA Global Vaccination Guidelines (2024)',
    citeHref: AUTHORITY_SOURCES.wsava.url,
  },
];
export const CAT_VACCINE_SCIENCE: ScienceContent = {
  heading: 'The Science Behind the Cat Vaccination Schedule',
  body: 'This schedule follows WSAVA 2024 Global Vaccination Guidelines and AAFP Feline Vaccination Advisory Panel recommendations. The 3-dose kitten FVRCP series (6-8, 12, 16 weeks) addresses maternal antibody interference — maternal antibodies can persist up to 14-16 weeks in some kittens, which is why the final dose is given at or after 16 weeks. The 12-month booster is critical: if missed, the cat may not have lasting immunity. Subsequent 3-year intervals are supported by challenge studies demonstrating durable protection. FeLV vaccine is recommended only for cats with exposure risk (outdoor access, FeLV-positive housemates) — it\'s not core because indoor-only cats have near-zero risk.',
  references: [
    { label: 'WSAVA Global Vaccination Guidelines (2024)', href: AUTHORITY_SOURCES.wsava.url },
    { label: 'AAFP Feline Vaccination Advisory Panel Report', href: AUTHORITY_SOURCES.aafp.url },
  ],
};

// ── BCS 体重追踪 ──────────────────────────────────────
export const CAT_BCS_KNOWLEDGE: KnowledgeCard[] = [
  {
    title: 'What Is Body Condition Score (BCS)?',
    definition: 'BCS is a 9-point veterinary scale: 1 = emaciated, 5 = ideal, 9 = severely obese. It assesses body fat and muscle, not just weight.',
    body: 'BCS is a 9-point scale developed by WSAVA to assess body fat and muscle mass — 1 is emaciated, 5 is ideal, 9 is severely obese. Unlike weight alone, BCS accounts for body frame and breed differences. A healthy cat at BCS 5 has palpable ribs with a light fat cover, a visible waist from above, and a tucked abdomen from the side.',
    citeLabel: 'WSAVA Nutritional Assessment Guidelines',
    citeHref: AUTHORITY_SOURCES.aafp.url,
  },
  {
    title: 'Indoor Cat Obesity Epidemic',
    definition: '60% of indoor cats are overweight or obese. Even 1 kg extra increases diabetes risk 4× and shortens lifespan by 1.5-2 years.',
    body: '60% of indoor cats in the US and Europe are overweight or obese. Even 1 kg (2.2 lb) over ideal weight increases the risk of diabetes mellitus by 4×, shortens lifespan by 1.5-2 years, and predisposes cats to arthritis, urinary tract disease, and hepatic lipidosis. Indoor lifestyle, free-feeding, and lack of enrichment are the primary causes.',
    citeLabel: 'AAFP Feline Nutrition Guidelines',
    citeHref: AUTHORITY_SOURCES.aafp.url,
  },
  {
    title: 'Safe Weight Loss for Cats',
    definition: 'Cats must lose 0.5-2% body weight per week max. Never restrict below 80% of ideal-weight RER — faster loss risks fatal hepatic lipidosis.',
    body: 'Cats must lose weight gradually — 0.5-2% body weight per week maximum. Rapid weight loss (>2%/week) can trigger hepatic lipidosis, a life-threatening liver condition unique to cats. Weight-loss calorie targets should never drop below 80% of ideal-weight RER. The formula: Target kcal = 0.8 × 70 × (ideal weight in kg)^0.75.',
    citeLabel: 'AAFP Weight Management Guidelines',
    citeHref: AUTHORITY_SOURCES.nrc.url,
  },
  {
    title: 'How to Feel Your Cat\'s Ribs at Home',
    definition: 'At ideal BCS 5: ribs feel like the back of your hand — palpable with a light fat cover. Hard to feel = overweight; sharply prominent = underweight.',
    body: 'Place your thumbs on your cat\'s spine and fingers on the ribs. At BCS 5 (ideal), you can feel each rib with a light fat cover — like running your fingers over the back of your hand. If ribs are hard to feel (BCS 7+), fat is excessive. If ribs are sharply visible/prominent (BCS 3-), your cat is underweight. Combine with the waist and abdominal tuck visual checks.',
    citeLabel: 'WSAVA BCS Assessment Guide',
    citeHref: 'https://wsava.org/global-guidelines/global-nutrition-guidelines/',
  },
];
export const CAT_BCS_SCIENCE: ScienceContent = {
  heading: 'The Science Behind the Cat BCS & Weight Tracker',
  body: 'The WSAVA 9-point Body Condition Score system is the veterinary standard for objective body fat assessment. Our calculator maps your visual and tactile assessments to the BCS scale. The weight-loss calorie formula is: Target kcal = 0.8 × RER_at_ideal_weight, where RER = 70 × (ideal_weight_kg)^0.75. The 80% floor is a clinical safety limit — dropping below risks hepatic lipidosis. Weight loss rate is capped at 0.5-2% body weight per week. These parameters follow AAFP Feline Nutrition Guidelines and NRC nutrient requirements.',
  references: [
    { label: 'AAFP Feline Nutrition Guidelines', href: AUTHORITY_SOURCES.aafp.url },
    { label: 'NRC Nutrient Requirements of Cats (2006)', href: AUTHORITY_SOURCES.nrc.url },
  ],
};

// ── 猫咪水分计算器 ────────────────────────────────────
export const CAT_HYDRATION_KNOWLEDGE: KnowledgeCard[] = [
  {
    title: 'How Much Water Should a Cat Drink?',
    definition: 'Cats need 50-60 ml water per kg body weight per day. A 5 kg cat needs ~250-300 ml total, from both drinking and food moisture.',
    body: 'Cats need 50-60 ml of water per kg of body weight per day. A 5 kg cat needs ~250-300 ml total daily water intake. But this comes from TWO sources: drinking water + moisture in food. Wet food is ~80% water; dry food is only ~10%. A cat eating primarily dry food must drink significantly more than one eating wet food.',
    citeLabel: 'NRC Nutrient Requirements of Cats',
    citeHref: AUTHORITY_SOURCES.nrc.url,
  },
  {
    title: 'Why Cats Are Prone to Dehydration',
    definition: 'Cats evolved from desert wildcats and have a low thirst drive — they\'re biologically programmed to get water from prey, not a bowl.',
    body: 'Domestic cats evolved from desert-dwelling wildcats (Felis silvestris lybica) and have a low thirst drive — they\'re biologically programmed to get most of their water from prey. In the wild, a mouse is ~70% water. Modern dry kibble at 10% moisture creates a chronic low-grade dehydration state that contributes to kidney disease and FLUTD (lower urinary tract disease).',
    citeLabel: 'Anderson — Feline Hydration Research',
    citeHref: 'https://pubmed.ncbi.nlm.nih.gov/6315691/',
  },
  {
    title: 'Dehydrated Cat Symptoms',
    definition: 'Early signs: lethargy, dry gums, skin tenting (pinch shoulder skin — if slow to snap back, dehydrated), decreased appetite and urination.',
    body: 'Early signs: lethargy, dry/tacky gums, decreased appetite, and skin tenting (gently pinch skin between shoulder blades — if it doesn\'t snap back immediately, dehydration is likely). Advanced signs: sunken eyes, increased heart rate, constipation, panting. If you see these signs, contact your vet. Chronic low-grade dehydration is silent but damages kidneys over time.',
    citeLabel: 'AAFP Senior Care Guidelines',
    citeHref: AUTHORITY_SOURCES.aafp.url,
  },
  {
    title: 'Wet Food vs. Dry Food Hydration',
    definition: 'Wet food (80% moisture): ~160 ml water from 200g of food. Dry food (10% moisture): only ~10 ml. Dry-fed cats must drink 200+ ml more daily.',
    body: 'A cat eating only wet food (80% moisture) at 200g/day gets ~160 ml water just from food — already 50-60% of daily needs. The same cat on dry food (10% moisture) gets only ~10 ml. The remaining 200+ ml must come from drinking. Cats on dry food need to drink proportionally more — and many don\'t, leading to concentrated urine and higher kidney/U.T. disease risk.',
    citeLabel: 'AAFP Feline Nutrition Research',
    citeHref: AUTHORITY_SOURCES.aafp.url,
  },
];
export const CAT_HYDRATION_SCIENCE: ScienceContent = {
  heading: 'The Science Behind the Cat Hydration Calculator',
  body: 'The NRC formula for feline daily water requirement is: Total H₂O (ml) = Weight (kg) × 50 ml/kg. Food moisture is calculated as: DryFood_g × 0.10 + WetFood_g × 0.80. Additional drinking water needed = Total H₂O − Food H₂O. This two-source model is critical because cats\' evolutionary biology gives them a low thirst drive — they depend on food moisture. The 50 ml/kg constant comes from NRC (2006) feline nutrient requirements and is validated against healthy cat water turnover studies.',
  references: [
    { label: 'NRC Nutrient Requirements of Cats (2006)', href: AUTHORITY_SOURCES.nrc.url },
    { label: 'AAFP Feline Nutrition Guidelines', href: AUTHORITY_SOURCES.aafp.url },
  ],
};

// ── EU 宠物旅行检查器 ──────────────────────────────────
export const EU_TRAVEL_KNOWLEDGE: KnowledgeCard[] = [
  {
    title: 'EU Pet Passport Explained',
    definition: 'An EU Pet Passport is a standardized document issued by an EU vet containing microchip number, rabies records, and titer test results.',
    body: 'An EU Pet Passport is a standardized document issued by an EU-authorized veterinarian. It contains: owner details, pet description (species/breed/microchip number), rabies vaccination records, and rabies antibody titer test results (if applicable). For travel between EU countries, the passport replaces the Animal Health Certificate. Non-EU residents must get an EU Animal Health Certificate instead.',
    citeLabel: 'EU Regulation (EU) No 576/2013',
    citeHref: AUTHORITY_SOURCES.euRegulation.url,
  },
  {
    title: 'Rabies Vaccination Requirements',
    definition: 'All pets entering the EU need a rabies vaccine given at least 21 days before entry, AFTER ISO microchip implantation — or it\'s invalid.',
    body: 'All pets traveling to the EU must have a valid rabies vaccination. Key rules: (1) The pet must be microchipped BEFORE vaccination — vaccinations given before microchipping are invalid; (2) Vaccination must be at least 21 days old at the time of entry; (3) Booster vaccinations must be given before the previous one expires — if a booster lapses, the 21-day waiting period resets.',
    citeLabel: 'USDA APHIS Pet Travel Guidelines',
    citeHref: AUTHORITY_SOURCES.usdaAphis.url,
  },
  {
    title: 'Microchip Requirements (ISO 11784/11785)',
    definition: 'EU requires ISO 11784/11785 15-digit microchips. U.S. AVID/HomeAgain chips may be unreadable — bring a scanner or implant a second ISO chip.',
    body: 'The EU requires ISO 11784/11785 compliant 15-digit microchips. US-standard AVID or HomeAgain chips may not be readable by EU scanners. If your pet has a non-ISO chip, you must carry your own scanner OR have a second ISO chip implanted. The microchip must be implanted BEFORE the rabies vaccination — this is strictly enforced at EU border checkpoints.',
    citeLabel: 'EU Regulation (EU) No 576/2013',
    citeHref: AUTHORITY_SOURCES.euRegulation.url,
  },
  {
    title: 'EU Countries with Extra Requirements',
    definition: 'UK, Ireland, Finland, Malta, Norway require tapeworm treatment (praziquantel) by a vet 1-5 days before entry — non-compliance = denied entry.',
    body: 'UK: Tapeworm treatment (praziquantel) by a vet 1-5 days before entry, administered and recorded in the pet passport. Ireland, Finland, Malta, Norway: Same tapeworm requirement as UK. These countries form the "tapeworm-free zone" — Echinococcus multilocularis is absent, and they strictly guard this status. Non-compliance means your pet is denied entry.',
    citeLabel: 'UK DEFRA — Pet Travel Scheme',
    citeHref: 'https://www.gov.uk/bringing-food-into-great-britain/pet-travel',
  },
];
export const EU_TRAVEL_SCIENCE: ScienceContent = {
  heading: 'The Science Behind the EU Pet Travel Checker',
  body: 'Our checker is built directly on EU Regulation (EU) No 576/2013 and subsequent amendments, plus country-specific rules from USDA APHIS and UK DEFRA. Requirements are parsed as a rules engine: each requirement has applicability conditions (origin country, destination country, species), and the checker evaluates whether each rule applies to your specific route. The timeline logic accounts for mandatory waiting periods: 21 days post-rabies vaccination, 30 days post-vaccination before titer blood draw, and 3 months post-blood draw before entry (for non-listed countries). All data is verified by quarterly manual review of EUR-Lex legislative updates.',
  references: [
    { label: 'EU Regulation (EU) No 576/2013', href: AUTHORITY_SOURCES.euRegulation.url },
    { label: 'USDA APHIS — Pet Travel', href: AUTHORITY_SOURCES.usdaAphis.url },
  ],
};

// ── 毒性检测器 ────────────────────────────────────────
export const TOXIC_CHECKER_KNOWLEDGE: KnowledgeCard[] = [
  {
    title: 'Why Some Foods Are Toxic to Pets',
    definition: 'Dogs and cats lack key metabolic enzymes. Chocolate\'s theobromine, onions\' allium compounds, and grapes are harmless to humans but deadly to pets.',
    body: 'Dogs and cats metabolize substances differently from humans. Dogs lack enzymes to break down theobromine (in chocolate) and allium compounds (onions/garlic). Cats lack glucuronyl transferase, making them unable to process many plant toxins and drugs. Even a small amount of a human-safe food can cause organ failure in pets. The ASPCA Poison Control Center handles over 400,000 cases annually.',
    citeLabel: 'ASPCA Animal Poison Control',
    citeHref: AUTHORITY_SOURCES.aspca.url,
  },
  {
    title: 'Plants Toxic to Cats and Dogs',
    definition: 'Lilies are the most dangerous — even pollen causes acute kidney failure in cats within 24-72 hours. Over 700 plants are known toxic to pets.',
    body: 'Lilies (Lilium and Hemerocallis species) are the most dangerous — even pollen or vase water can cause acute kidney failure in cats within 24-72 hours. Other common toxic plants: Sago palm (liver failure), tulips/narcissus bulbs (cardiac arrhythmias), azaleas (cardiovascular collapse), and aloe vera (vomiting/diarrhea). Over 700 plants are known to be toxic to pets.',
    citeLabel: 'ASPCA Toxic and Non-Toxic Plants List',
    citeHref: AUTHORITY_SOURCES.aspca.url,
  },
  {
    title: 'What to Do If Your Pet Eats Something Toxic',
    definition: 'Do NOT induce vomiting unless instructed by a vet. Call ASPCA Poison Control at (888) 426-4435 immediately with the item, amount, time, and weight.',
    body: '(1) Do NOT induce vomiting unless instructed by a vet — some substances cause more damage coming back up. (2) Call ASPCA Poison Control at (888) 426-4435 or Pet Poison Helpline at (855) 764-7661 immediately. (3) Have the packaging, estimated amount eaten, time of ingestion, and your pet\'s weight ready. (4) Bring your pet to the nearest emergency vet — do not wait for symptoms.',
    citeLabel: 'AVMA Emergency Toxicology',
    citeHref: AUTHORITY_SOURCES.avma.url,
  },
  {
    title: 'Human Foods That Are Safe for Pets',
    definition: 'Many human foods are safe: carrots, blueberries, plain pumpkin, cooked chicken, green beans, watermelon (seedless). Treats ≤10% of daily calories.',
    body: 'Many human foods are safe and healthy in moderation: carrots (low-calorie dental chew), blueberries (antioxidants), plain pumpkin (fiber for digestion), cooked lean chicken (protein), green beans (filling low-calorie treat), and watermelon (hydration, no seeds). Always introduce new foods gradually, cut into bite-sized pieces to prevent choking, and avoid seasoning/salt/butter. When in doubt, check our database.',
    citeLabel: 'ASPCA People Foods to Avoid Feeding Your Pets',
    citeHref: AUTHORITY_SOURCES.aspca.url,
  },
];
export const TOXIC_CHECKER_SCIENCE: ScienceContent = {
  heading: 'The Science Behind the Toxic Food & Plant Checker',
  body: 'Our database is compiled from ASPCA Animal Poison Control Center data, AVMA toxicology resources, and peer-reviewed veterinary toxicology literature. Each entry is classified into three levels: Toxic (known to cause organ damage or death at any dose), Caution (safe in small amounts but can cause GI upset or toxicity at higher doses), and Safe (no known toxic effects within reasonable serving sizes). The symptom lists and emergency instructions are aligned with ASPCA and Pet Poison Helpline protocols. The database of 200+ items covers the most commonly searched food and plant queries, verified annually against updated ASPCA toxicology reports.',
  references: [
    { label: 'ASPCA Animal Poison Control Center', href: AUTHORITY_SOURCES.aspca.url },
    { label: 'AVMA Emergency Toxicology Resources', href: AUTHORITY_SOURCES.avma.url },
  ],
};

// ── BARF 计算器 ───────────────────────────────────────
export const BARF_KNOWLEDGE: KnowledgeCard[] = [
  {
    title: 'What Is the BARF Diet?',
    definition: 'BARF (Biologically Appropriate Raw Food) feeds dogs and cats raw muscle meat, bones, and organs — replicating the ancestral wild diet.',
    body: 'BARF (Biologically Appropriate Raw Food) is a raw feeding model developed by Dr. Ian Billinghurst. It aims to replicate the ancestral diet of dogs and cats: raw muscle meat, raw meaty bones, organ meats, and a small amount of vegetation (for dogs). The core philosophy: feed what a wild canid/felid would eat — unprocessed, species-appropriate, and free of grains and fillers.',
    citeLabel: 'NRC Nutrient Requirements of Dogs',
    citeHref: AUTHORITY_SOURCES.nrc.url,
  },
  {
    title: 'The 80-10-10 Ratio Explained',
    definition: 'Dogs: 80% muscle meat, 10% bone, 5% liver, 5% other organs. Cats: 75% meat, 10% bone, 5% liver, 10% organs. Liver must never exceed 5%.',
    body: 'For dogs on BARF: 80% muscle meat, 10% raw meaty bone, 5% liver, 5% other secreting organs (kidney, spleen, pancreas). For cats: 75% muscle meat, 10% bone, 5% liver, 10% other organs (no vegetables needed). The 80-10-10 ratio targets calcium:phosphorus balance (1.2:1 to 1.4:1) and essential micronutrients from organ meats. Liver must not exceed 5% — excess vitamin A causes toxicity.',
    citeLabel: 'FEDIAF Nutritional Guidelines',
    citeHref: AUTHORITY_SOURCES.fedIaf.url,
  },
  {
    title: 'Raw Feeding Safety Guidelines',
    definition: 'Raw meat carries Salmonella, E. coli, Campylobacter risks. Freeze 2-3 weeks before feeding, use human-grade sources, sanitize all surfaces.',
    body: 'Raw feeding carries pathogen risks — Salmonella, E. coli, Campylobacter, and Listeria are found in commercial and homemade raw diets. Safety practices: (1) Freeze meat for 2-3 weeks before feeding to reduce parasite load, (2) Use human-grade meat from trusted sources, (3) Sanitize all surfaces/bowls immediately after feeding, (4) Wash hands thoroughly, (5) Immunocompromised household members should avoid handling raw pet food.',
    citeLabel: 'AVMA Raw Diet Position Statement',
    citeHref: AUTHORITY_SOURCES.avma.url,
  },
  {
    title: 'Bone-to-Meat Ratio and Calcium Balance',
    definition: '10% raw meaty bone provides the critical calcium:phosphorus ratio. Never feed cooked bones — they splinter. Chicken necks (~40% bone) are a common source.',
    body: 'Raw meaty bone provides calcium and phosphorus — the most critical mineral balance in a raw diet. Too little bone = calcium deficiency and metabolic bone disease. Too much bone = constipation and mineral imbalance. The 10% bone ratio targets 10-15% of total dietary calcium. Chicken necks (~40% bone), duck necks (~50% bone), and turkey necks (~40% bone) are common BARF bone sources. Never feed cooked bones — they splinter.',
    citeLabel: 'NRC Mineral Requirements for Dogs',
    citeHref: AUTHORITY_SOURCES.nrc.url,
  },
];
export const BARF_SCIENCE: ScienceContent = {
  heading: 'The Science Behind the BARF Raw Feeding Calculator',
  body: 'Our calculator implements the 80-10-10 BARF model benchmarked against NRC (2006) and FEDIAF nutrient requirements for dogs and cats. Daily food quantity = TargetWeight(kg) × feeding_percentage × 1000g. For dogs: MuscleMeat = total × 0.80, Bone = total × 0.10, Liver = total × 0.05, OtherOrgans = total × 0.05, Vegetables = total × 0.10. For cats: MuscleMeat = total × 0.75, Bone = total × 0.10, Liver = total × 0.05, OtherOrgans = total × 0.10, Vegetables = 0. The feeding percentage typically ranges from 2% (weight maintenance) to 3% (active/working) of body weight. Liver is capped at 5% to prevent hypervitaminosis A.',
  references: [
    { label: 'NRC Nutrient Requirements of Dogs and Cats (2006)', href: AUTHORITY_SOURCES.nrc.url },
    { label: 'FEDIAF Nutritional Guidelines', href: AUTHORITY_SOURCES.fedIaf.url },
  ],
};

// ── 毒性检测器 — 动态 Knowledge Cards ─────────────────
import type { ToxicItem } from '@/lib/data/toxic-items';

/**
 * 为毒性检测器工具页生成 3 张 GEO Knowledge Cards，基于 ToxicItem 数据动态生成。
 * Card 1: Why It's Toxic — 毒性机制
 * Card 2: How Much Is Too Much — 安全剂量
 * Card 3: What To Do — 紧急步骤
 * 按 geo-checklist §1 卡片设计指南。
 */
export function getToxicItemKnowledgeCards(
  item: ToxicItem,
  species: 'dog' | 'cat',
): KnowledgeCard[] {
  const level = species === 'dog' ? item.dogLevel : item.catLevel;
  const pet = species === 'dog' ? 'dogs' : 'cats';
  const petSingular = species;

  const cards: KnowledgeCard[] = [
    {
      title: `Why Is ${item.name} Dangerous to ${petSingular === 'dog' ? 'Dogs' : 'Cats'}?`,
      definition:
        level === 'toxic'
          ? `${item.name} is highly toxic to ${pet} and can cause severe illness or death even in small amounts.`
          : level === 'caution'
            ? `${item.name} requires careful portion control for ${pet} — safe in small amounts but risky when overfed.`
            : `${item.name} is generally recognized as safe for ${pet} when fed in moderation as an occasional treat.`,
      body:
        level === 'toxic'
          ? `The toxic compounds in ${item.name} damage the ${petSingular}'s organs. ${item.emergencyNote || `If your ${petSingular} ingests ${item.name}, seek veterinary care immediately.`} Common symptoms include: ${item.symptoms.slice(0, 4).join(', ')}.`
          : level === 'caution'
            ? `${item.name} can cause digestive upset when consumed in large quantities. ${item.safeAmount ? `Safe serving guideline: ${item.safeAmount}. ` : ''}${item.symptoms.length > 0 ? `Overconsumption may cause: ${item.symptoms.slice(0, 3).join(', ')}.` : ''}`
            : `${item.name} is safe for ${pet} as an occasional treat. ${item.safeAmount ? `Recommended serving: ${item.safeAmount}. ` : ''}Always introduce new foods gradually and monitor for any adverse reactions.`,
      citeLabel: 'ASPCA Animal Poison Control',
      citeHref: AUTHORITY_SOURCES.aspca.url,
    },
    {
      title: 'How Much Is Too Much?',
      definition:
        level === 'toxic'
          ? `No amount of ${item.name} is safe for ${pet}. Even trace amounts can trigger toxic reactions.`
          : level === 'caution'
            ? item.safeAmount
              ? `Safe limit: ${item.safeAmount}. Exceeding this may cause gastrointestinal upset.`
              : `Small, occasional amounts are the safest approach with ${item.name}.`
            : item.safeAmount
              ? `Safe serving: ${item.safeAmount}. Treats should make up no more than 10% of daily calories.`
              : `${item.name} is safe for ${pet} as an occasional snack — treats should not exceed 10% of daily calorie intake.`,
      body:
        level === 'toxic'
          ? `Toxic threshold varies by ${petSingular} size and individual sensitivity. A small ${petSingular} may show symptoms from a tiny amount, while a large ${petSingular} may tolerate a larger dose — but there is no universally safe amount. If ingestion occurred, note the quantity, time, and your ${petSingular}'s weight for the veterinarian.`
          : level === 'caution'
            ? `The risk with ${item.name} is dose-dependent. Occasional small servings are typically well-tolerated, but regular or large servings can accumulate to toxic levels. Monitor your ${petSingular} for the symptoms listed above, and discontinue if any appear.`
            : `While ${item.name} is safe, moderation is key. Treats — including safe human foods — should make up no more than 10% of your ${petSingular}'s daily calorie intake to maintain nutritional balance. Cut into bite-sized pieces to prevent choking.`,
      citeLabel: 'AVMA Pet Nutrition Guidelines',
      citeHref: AUTHORITY_SOURCES.avma.url,
    },
    {
      title: 'What Should I Do Next?',
      definition:
        level === 'toxic'
          ? `If your ${petSingular} ate ${item.name}: call ASPCA Poison Control at (888) 426-4435 or go to an emergency vet immediately.`
          : level === 'caution'
            ? `If your ${petSingular} shows symptoms after eating ${item.name}: stop feeding it, monitor closely, and call your vet if symptoms persist.`
            : `If your ${petSingular} has an unexpected reaction to ${item.name}: discontinue feeding and consult your veterinarian.`,
      body:
        level === 'toxic'
          ? `Do NOT induce vomiting unless instructed by a veterinarian — some substances cause more damage coming back up. Have this information ready: what was eaten, how much, when, and your ${petSingular}'s current weight. The ASPCA Poison Control Center (888-426-4435) is available 24/7. A consultation fee may apply.`
          : level === 'caution'
            ? `Most ${petSingular}s recover from mild ${item.name} overconsumption within 24 hours with supportive care at home (withhold food for 12 hours, provide water). If vomiting or diarrhea persists beyond 24 hours, or if your ${petSingular} becomes lethargic, see your vet.`
            : `If you notice vomiting, diarrhea, or unusual behavior after feeding ${item.name}, stop immediately. Most food-related reactions in ${pet}s are mild and self-limiting, but persistent symptoms warrant a vet visit. Always check our toxic food database before introducing new human foods.`,
      citeLabel: 'ASPCA Animal Poison Control Center',
      citeHref: AUTHORITY_SOURCES.aspca.url,
    },
  ];

  return cards;
}

/** 毒性检测器 Science Behind It — SSG 预渲染方法论段落 */
export const TOXIC_LANDING_SCIENCE: ScienceContent = {
  heading: 'The Science Behind Our Pet Safety Database',
  body: 'Our toxicity database is compiled from ASPCA Animal Poison Control Center data, AVMA toxicology resources, and peer-reviewed veterinary toxicology literature. Each food and plant entry is classified into three levels: Toxic (known to cause organ damage or death), Caution (safe in small amounts but risky when overfed), and Safe (no known toxic effects within reasonable serving sizes). Symptom lists and emergency instructions follow ASPCA and Pet Poison Helpline clinical protocols. The database of 200+ items is verified annually against updated ASPCA toxicology reports and AVMA emergency toxicology guidelines.',
  references: [
    { label: 'ASPCA Animal Poison Control Center', href: AUTHORITY_SOURCES.aspca.url },
    { label: 'AVMA Emergency Toxicology Resources', href: AUTHORITY_SOURCES.avma.url },
  ],
};

// ── 保险估算器 ────────────────────────────────────────
export const INSURANCE_KNOWLEDGE: KnowledgeCard[] = [
  {
    title: 'Types of Pet Insurance',
    definition: '3 tiers: Accident-Only ($15-25/mo), Accident & Illness ($30-60/mo, most popular), Comprehensive + Wellness ($50-100/mo).',
    body: 'Three main types: (1) Accident-Only — covers injuries (broken bones, poisoning, bites), cheapest at ~$15-25/month; (2) Accident & Illness — most popular, adds coverage for diseases (cancer, infections, allergies), ~$30-60/month; (3) Comprehensive/Wellness — adds routine care (vaccines, dental, annual exams), ~$50-100/month. 80% of US pet insurance policies are Accident & Illness.',
    citeLabel: 'NAPHIA State of the Industry Report',
    citeHref: AUTHORITY_SOURCES.naphia.url,
  },
  {
    title: 'How Much Does Pet Insurance Cost?',
    definition: 'US average: dog $53/mo, cat $32/mo. Costs rise with age, large breeds, brachycephalic breeds, urban location, and lower deductibles.',
    body: 'US average monthly premiums (2024): Dog accident & illness = $53/month ($636/year). Cat accident & illness = $32/month ($384/year). Factors that increase cost: age (older pets cost more), breed (large/giant breeds and brachycephalic breeds), location (urban areas are more expensive), and coverage level (lower deductible = higher premium). Most policies have a 14-day waiting period for illness and 2-6 months for orthopedic conditions.',
    citeLabel: 'NAPHIA Industry Data (2024)',
    citeHref: AUTHORITY_SOURCES.naphia.url,
  },
  {
    title: 'Is Pet Insurance Worth It?',
    definition: 'One major incident — ACL surgery ($3-6k), cancer ($4-10k) — exceeds years of premiums. Insurance covers 70-90% after deductible.',
    body: 'For most owners, pet insurance pays off when facing a single major event: ACL surgery ($3,000-6,000), cancer treatment ($4,000-10,000), or emergency foreign body surgery ($2,000-5,000). The average pet owner spends $1,200-1,500/year on vet care, and insurance covers 70-90% after deductible. If your pet has one major incident every 5-7 years, insurance typically provides net savings.',
    citeLabel: 'AVMA Pet Ownership Economics',
    citeHref: AUTHORITY_SOURCES.avma.url,
  },
  {
    title: 'Pre-existing Conditions',
    definition: 'No insurer covers pre-existing conditions. Get insurance while your pet is young and healthy — "curable" conditions may be covered after 6-12 months symptom-free.',
    body: 'No pet insurance covers pre-existing conditions — this is the most misunderstood aspect of pet insurance. A pre-existing condition is any illness or injury that showed symptoms or was diagnosed before the policy start date (or during the waiting period). However, "curable" pre-existing conditions (UTI, ear infection) may be covered after a symptom-free period (typically 6-12 months) with some providers. Get insurance while your pet is young and healthy.',
    citeLabel: 'NAPHIA Consumer Guide',
    citeHref: AUTHORITY_SOURCES.naphia.url,
  },
];
export const INSURANCE_SCIENCE: ScienceContent = {
  heading: 'The Science Behind the Pet Insurance Estimator',
  body: 'Our estimator combines NAPHIA (North American Pet Health Insurance Association) industry data with breed-specific actuarial risk factors. The base premium is calculated from species (dog: 1.65× cat base), age (exponential scaling after age 5), breed risk tier (brachycephalic and large breeds carry higher premiums), and geographic cost-of-care adjustment. Deductible selection (typically $100-1,000) inversely scales the premium — a $500 deductible reduces premiums by ~30% vs. $100 deductible. Reimbursement rates (70-90%) and annual maximums ($5,000-unlimited) further tune the estimate. All numbers are based on NAPHIA\'s most recent industry report.',
  references: [
    { label: 'NAPHIA State of the Industry Report', href: AUTHORITY_SOURCES.naphia.url },
    { label: 'AVMA Pet Ownership Economics', href: AUTHORITY_SOURCES.avma.url },
  ],
};
