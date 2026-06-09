/**
 * GEO JSON-LD 生成器 — SoftwareApplication / HowTo / BreadcrumbList
 * 每个工具页和档案页必须使用这些生成器。
 * 引用来源库为 geo-checklist.md §14 引用多样性矩阵。
 */
import { SITE_URL, SITE_NAME } from '@/constants';

// ── 权威引用库 ──────────────────────────────────────────
export type CitationRef = {
  name: string;
  url: string;
};

export const AUTHORITY_SOURCES: Record<string, CitationRef> = {
  aaha: {
    name: 'AAHA Canine Life Stage Guidelines (2021)',
    url: 'https://www.aaha.org/aaha-guidelines/life-stage-canine-2021/',
  },
  aafco: {
    name: 'AAFCO Dog Food Nutrient Profiles',
    url: 'https://www.aafco.org/',
  },
  wsava: {
    name: 'WSAVA Global Veterinary Vaccination Guidelines (2024)',
    url: 'https://wsava.org/global-guidelines/vaccination-guidelines/',
  },
  avma: {
    name: 'AVMA Pet Ownership and Demographics Sourcebook',
    url: 'https://www.avma.org/resources-tools/avma-policies/principles-vaccination',
  },
  ucsd: {
    name: 'Wang et al. — Quantitative Translation of Dog-to-Human Aging (UCSD, 2020)',
    url: 'https://doi.org/10.1016/j.cels.2020.06.006',
  },
  aafp: {
    name: 'AAFP Feline Life Stage Guidelines (2021)',
    url: 'https://catvets.com/life-stage-guidelines',
  },
  isfm: {
    name: 'ISFM Guidelines on Feline Reproduction and Aging',
    url: 'https://icatcare.org/',
  },
  aspca: {
    name: 'ASPCA Animal Poison Control Center — Toxic and Non-Toxic Plants',
    url: 'https://www.aspca.org/pet-care/animal-poison-control',
  },
  euRegulation: {
    name: 'EU Regulation (EU) No 576/2013 — Non-Commercial Movement of Pet Animals',
    url: 'https://eur-lex.europa.eu/eli/reg/2013/576/oj',
  },
  usdaAphis: {
    name: 'USDA APHIS — Pet Travel from the U.S. to Foreign Countries',
    url: 'https://www.aphis.usda.gov/aphis/pet-travel',
  },
  nrc: {
    name: 'NRC Nutrient Requirements of Dogs and Cats (2006)',
    url: 'https://nap.nationalacademies.org/catalog/10668/',
  },
  fedIaf: {
    name: 'FEDIAF Nutritional Guidelines for Complete and Complementary Pet Food',
    url: 'https://europeanpetfood.org/self-regulation/nutritional-guidelines/',
  },
  naphia: {
    name: 'NAPHIA State of the Industry Report — Pet Health Insurance',
    url: 'https://naphia.org/',
  },
};

// ── @graph 封装 ────────────────────────────────────────

/**
 * 将多个 JSON-LD schema 合并为单个 @graph 包裹的结构。
 * Google 推荐使用 @graph 减少脚本块数量，提升爬虫解析效率。
 * 用于替代页面中多个独立的 <JsonLdScript> 调用。
 */
export function graphJsonLd(...schemas: Record<string, unknown>[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@graph': schemas,
  };
}

// ── 引用分配矩阵（geo-checklist §14.1） ────────────────

/** 每个工具页的 citation 分配 */
export const TOOL_CITATIONS: Record<string, CitationRef[]> = {
  'dog/age-calculator': [AUTHORITY_SOURCES.ucsd, AUTHORITY_SOURCES.aaha],
  'dog/calorie-calculator': [AUTHORITY_SOURCES.aafco, AUTHORITY_SOURCES.aaha],
  'dog/gestation-calculator': [AUTHORITY_SOURCES.aaha, AUTHORITY_SOURCES.avma],
  'dog/vaccination-schedule': [AUTHORITY_SOURCES.wsava, AUTHORITY_SOURCES.aaha],
  'dog/puppy-growth-predictor': [AUTHORITY_SOURCES.ucsd, AUTHORITY_SOURCES.aaha],
  'cat/age-calculator': [AUTHORITY_SOURCES.aafp, AUTHORITY_SOURCES.isfm],
  'cat/gestation-calculator': [AUTHORITY_SOURCES.aafp, AUTHORITY_SOURCES.isfm],
  'cat/vaccination-schedule': [AUTHORITY_SOURCES.wsava, AUTHORITY_SOURCES.aafp],
  'cat/bcs-weight-tracker': [AUTHORITY_SOURCES.aafp, AUTHORITY_SOURCES.nrc],
  'cat/hydration-calculator': [AUTHORITY_SOURCES.nrc, AUTHORITY_SOURCES.aafp],
  'shared/eu-pet-travel-checker': [AUTHORITY_SOURCES.euRegulation, AUTHORITY_SOURCES.usdaAphis],
  'shared/toxic-checker': [AUTHORITY_SOURCES.aspca, AUTHORITY_SOURCES.avma],
  'shared/barf-calculator': [AUTHORITY_SOURCES.nrc, AUTHORITY_SOURCES.fedIaf],
  'shared/pet-insurance-estimator': [AUTHORITY_SOURCES.naphia, AUTHORITY_SOURCES.avma],
  'profile': [AUTHORITY_SOURCES.aaha, AUTHORITY_SOURCES.aafco],
};

// ── JSON-LD 生成器 ──────────────────────────────────────

export type SoftwareAppJsonLdParams = {
  toolName: string;
  toolPath: string;
  description: string;
  citations: CitationRef[];
};

/**
 * SoftwareApplication JSON-LD（GEO 要求用 SoftwareApplication 非 WebApplication）
 */
export function generateSoftwareAppJsonLd(params: SoftwareAppJsonLdParams): Record<string, unknown> {
  const { toolName, toolPath, description, citations } = params;
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: toolName,
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description,
    url: `${SITE_URL}${toolPath}`,
    citation: citations.map((c) => ({
      '@type': 'CreativeWork',
      name: c.name,
      url: c.url,
    })),
  };
}

export type HowToJsonLdParams = {
  toolName: string;
  description: string;
  steps: { name: string; text: string }[];
};

/**
 * HowTo JSON-LD（≥ 3 步操作流程）
 */
export function generateHowToJsonLd(params: HowToJsonLdParams): Record<string, unknown> {
  const { toolName, description, steps } = params;
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to Use the ${toolName}`,
    description,
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

export type BreadcrumbJsonLdItem = { position: number; name: string; item: string };

/**
 * BreadcrumbList JSON-LD（每个非首页页面必须）
 * 最后一项不放 item（当前页面不可链出）
 */
export function generateBreadcrumbJsonLd(items: BreadcrumbJsonLdItem[]): Record<string, unknown> {
  const listItems = items.map((item, index) => {
    const isLast = index === items.length - 1;
    if (isLast) {
      return { '@type': 'ListItem', position: item.position, name: item.name };
    }
    return { '@type': 'ListItem', position: item.position, name: item.name, item: item.item };
  });
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: listItems,
  };
}

// ── HowTo 步骤预设（按工具类型） ────────────────────────

export const HOWTO_STEPS: Record<string, HowToJsonLdParams> = {
  'dog/age-calculator': {
    toolName: 'Dog Age Calculator',
    description: 'Convert your dog\'s age to human years using breed-size-adjusted AAHA life stage guidelines and UCSD epigenetic research.',
    steps: [
      { name: 'Enter your dog\'s age', text: 'Input your dog\'s current age in years or months. If your pet profile exists, data is auto-filled.' },
      { name: 'Select breed size', text: 'Choose your dog\'s size category: small (<10 kg), medium (10–25 kg), large (25–45 kg), or giant (>45 kg).' },
      { name: 'Read your dog\'s human-equivalent age', text: 'Get the human-equivalent age, current life stage, and key health recommendations for that stage.' },
    ],
  },
  'dog/calorie-calculator': {
    toolName: 'Dog Calorie Calculator',
    description: 'Calculate your dog\'s daily calorie needs using the AAFCO Maintenance Energy Requirement (MER) formula.',
    steps: [
      { name: 'Enter your dog\'s weight', text: 'Input your dog\'s current weight in kg or lb. Auto-filled from pet profile if available.' },
      { name: 'Select activity level', text: 'Choose from: puppy, active adult, neutered adult (typical), weight loss, senior, or working dog.' },
      { name: 'View daily calorie results', text: 'Get your dog\'s RER, MER, and daily food amount. The formula is shown with AAFCO references.' },
    ],
  },
  'dog/gestation-calculator': {
    toolName: 'Dog Gestation Calculator',
    description: 'Estimate your dog\'s due date and follow the gestation timeline based on AAHA canine reproduction guidelines.',
    steps: [
      { name: 'Enter mating date', text: 'Input the date(s) of mating. Multiple dates are averaged for the most accurate due date range.' },
      { name: 'View the gestation timeline', text: 'See the full 63-day timeline: ultrasound at day 28, X-ray at day 45, whelping box prep at day 55.' },
      { name: 'Get your due date range', text: 'Receive the earliest, most likely, and latest due dates, with key milestones marked.' },
    ],
  },
  'dog/vaccination-schedule': {
    toolName: 'Dog Vaccination Schedule',
    description: 'Generate a personalized vaccination and deworming schedule based on WSAVA global guidelines and your dog\'s age.',
    steps: [
      { name: 'Enter your dog\'s birth date or age', text: 'Auto-filled from pet profile if available.' },
      { name: 'Select your region', text: 'Choose US, UK, or EU — vaccine recommendations and legal requirements vary by region.' },
      { name: 'Review your schedule', text: 'Get a complete timeline of core vaccines (DHPP, Rabies) and optional non-core vaccines with vet consultation notes.' },
    ],
  },
  'dog/puppy-growth-predictor': {
    toolName: 'Puppy Growth Predictor',
    description: 'Estimate your puppy\'s adult weight using breed-size-specific growth curves based on UCSD and AKC breed data.',
    steps: [
      { name: 'Enter your puppy\'s current age and weight', text: 'Auto-filled from pet profile if available.' },
      { name: 'Select breed size category', text: 'Small breeds mature at ~8 months, giant breeds at ~18-24 months. Each has a unique growth curve.' },
      { name: 'View your puppy\'s projected adult weight', text: 'See a growth chart with your puppy\'s current position highlighted and projected adult weight range.' },
    ],
  },
  'cat/age-calculator': {
    toolName: 'Cat Age Calculator',
    description: 'Convert your cat\'s age to human years using AAFP/AAHA feline life stage guidelines.',
    steps: [
      { name: 'Enter your cat\'s age', text: 'Input your cat\'s current age in years or months. Auto-filled from pet profile if available.' },
      { name: 'Select life stage context', text: 'Life stages are determined automatically. Optionally adjust for indoor/outdoor lifestyle differences.' },
      { name: 'Read your cat\'s human-equivalent age', text: 'Get the human-equivalent age, current life stage, and recommended health check frequency.' },
    ],
  },
  'cat/gestation-calculator': {
    toolName: 'Cat Gestation Calculator',
    description: 'Estimate your cat\'s due date and follow the 65-day gestation timeline based on AAFP feline reproduction guidelines.',
    steps: [
      { name: 'Enter mating date', text: 'Input the date(s) of mating for the most accurate due date prediction.' },
      { name: 'View the gestation timeline', text: 'See the full 65-day timeline with key milestones at day 28 (ultrasound) and day 50 (X-ray).' },
      { name: 'Get your due date range', text: 'Receive the earliest, most likely, and latest due dates for your cat\'s pregnancy.' },
    ],
  },
  'cat/vaccination-schedule': {
    toolName: 'Cat Vaccination Schedule',
    description: 'Generate a personalized vaccination schedule based on WSAVA and AAFP feline vaccination guidelines.',
    steps: [
      { name: 'Enter your cat\'s age', text: 'Auto-filled from pet profile if available.' },
      { name: 'Select your region and lifestyle', text: 'Indoor-only cats have different needs than outdoor cats. Region affects legal vaccine requirements.' },
      { name: 'Review your schedule', text: 'Get a complete timeline of core vaccines (FVRCP, Rabies) and optional non-core vaccines.' },
    ],
  },
  'cat/bcs-weight-tracker': {
    toolName: 'Cat Body Condition Score & Weight Tracker',
    description: 'Assess your cat\'s body condition using the WSAVA 9-point BCS scale and get a personalized weight management plan.',
    steps: [
      { name: 'Assess your cat\'s body condition', text: 'Answer visual questions about rib feel, waistline, and abdominal tuck to determine the BCS score.' },
      { name: 'Review your score', text: 'See your cat\'s BCS rating (1-9) with an interpretation: underweight, ideal, overweight, or obese.' },
      { name: 'Get a weight management plan', text: 'If overweight, receive a safe calorie-restriction plan (≥80% RER to prevent hepatic lipidosis).' },
    ],
  },
  'cat/hydration-calculator': {
    toolName: 'Cat Hydration Calculator',
    description: 'Calculate your cat\'s daily water needs based on NRC feline nutrition requirements, accounting for wet and dry food intake.',
    steps: [
      { name: 'Enter your cat\'s weight and diet', text: 'Input weight and the amounts of dry and wet food fed daily. Auto-filled from pet profile if available.' },
      { name: 'Calculate water needs', text: 'The NRC formula estimates total daily water intake and subtracts food moisture to find additional drinking needs.' },
      { name: 'Review hydration status', text: 'Complete a 5-question dehydration self-check and see your cat\'s recommended additional water intake in ml/oz.' },
    ],
  },
  'shared/eu-pet-travel-checker': {
    toolName: 'EU Pet Travel Requirements Checker',
    description: 'Verify all EU pet travel requirements for your dog or cat, including UK post-Brexit rules and Nordic tapeworm zones.',
    steps: [
      { name: 'Select origin and destination countries', text: 'Choose departure and arrival countries. Rules differ for EU→EU, non-EU→EU, and UK entry.' },
      { name: 'Select your pet type', text: 'Choose dog or cat. Requirements differ slightly. Auto-filled from pet profile if available.' },
      { name: 'Review your checklist', text: 'Get a compliance checklist: microchip, rabies vaccine, titer test, tapeworm treatment, and health certificate.' },
      { name: 'Note the timeline', text: 'Each requirement has a mandatory waiting period. Start at least 4 months before travel for new rabies vaccinations.' },
    ],
  },
  'shared/toxic-checker': {
    toolName: 'Toxic Food & Plant Checker',
    description: 'Check if a food or plant is safe for your dog or cat, backed by ASPCA Animal Poison Control data.',
    steps: [
      { name: 'Select your pet species', text: 'Choose dog or cat. Toxicity differs — grapes are toxic to dogs but not proven toxic to cats.' },
      { name: 'Search for a food or plant', text: 'Type any food or plant name. The database covers 200+ common foods, plants, and household items.' },
      { name: 'Read the safety verdict', text: 'Get a clear Toxic / Caution / Safe rating with symptoms, safe amounts, and emergency instructions.' },
    ],
  },
  'shared/barf-calculator': {
    toolName: 'BARF Raw Feeding Calculator',
    description: 'Calculate daily BARF raw food portions using the 80-10-10 ratio and NRC nutrient requirements for dogs and cats.',
    steps: [
      { name: 'Select pet species and weight', text: "Dog's BARF is 70-10-5-5-10; cat's is 75-10-5-10-0. Auto-filled from pet profile." },
      { name: 'Set feeding percentage', text: 'Adult pets typically eat 2-3% of body weight daily. Adjust for activity level and weight goals.' },
      { name: 'View daily portions', text: 'Get exact grams/ounces for muscle meat, raw meaty bone, liver, other organs, and vegetables (dogs only).' },
    ],
  },
  'shared/pet-insurance-estimator': {
    toolName: 'Pet Insurance Cost Estimator',
    description: 'Estimate pet insurance costs and compare coverage options based on NAPHIA industry data and your pet\'s profile.',
    steps: [
      { name: 'Enter pet details', text: 'Species, breed, age, and location — auto-filled from pet profile if available.' },
      { name: 'Select coverage type', text: 'Choose from accident-only, accident-and-illness, or comprehensive with wellness.' },
      { name: 'View monthly estimates', text: 'See estimated monthly premiums for major providers, with coverage comparison and CPA affiliate links.' },
    ],
  },
  'profile': {
    toolName: 'Pet Profile Manager',
    description: 'Create and manage pet profiles. Data is stored locally — one profile auto-fills every calculator on the site.',
    steps: [
      { name: 'Create your pet\'s profile', text: 'Enter name, species, breed, birth date, weight, and other key details.' },
      { name: 'Switch between profiles', text: 'Manage multiple pets — cats and dogs. Switch with one click and all tools update instantly.' },
      { name: 'Export or import data', text: 'Back up your profiles as a JSON file for cross-device migration. No data is ever uploaded to our servers.' },
    ],
  },
};
