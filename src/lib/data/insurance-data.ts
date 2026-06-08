// Phase 8 — T8.3: 宠物保险数据
// 估算月费区间来源: Lemonade/Pumpkin/Trupanion/Petplan 公开定价区间
// 参考 README.MD §7.3

export type InsuranceProvider = {
  id: string;
  name: string;
  url: string; // Affiliate 占位
  features: string[];
  annualDeductibleRange: string;
  reimbursementRate: string;
};

/** 保险商信息（无真实定价，仅占位） */
export const INSURANCE_PROVIDERS: InsuranceProvider[] = [
  {
    id: 'lemonade',
    name: 'Lemonade',
    url: '#affiliate-placeholder',
    features: ['AI claims processing', 'Preventative care add-on', 'Customizable deductible'],
    annualDeductibleRange: '$100–$500',
    reimbursementRate: '70%–90%',
  },
  {
    id: 'pumpkin',
    name: 'Pumpkin',
    url: '#affiliate-placeholder',
    features: ['No upper age limits', 'Dental illness coverage', 'Behavioral therapy included'],
    annualDeductibleRange: '$100–$1,000',
    reimbursementRate: '90%',
  },
  {
    id: 'trupanion',
    name: 'Trupanion',
    url: '#affiliate-placeholder',
    features: ['Unlimited payouts', 'Direct vet payment', 'Lifetime per-condition deductible'],
    annualDeductibleRange: '$0–$1,000',
    reimbursementRate: '90%',
  },
  {
    id: 'petplan',
    name: 'Petplan',
    url: '#affiliate-placeholder',
    features: ['All-inclusive coverage', 'Exam fees covered', 'No specialist limit'],
    annualDeductibleRange: '$100–$1,500',
    reimbursementRate: '70%–90%',
  },
];

/** 按品种的估算月费系数（1.0 = 标准费率） */
export type BreedRateFactor = {
  breed: string;
  factor: number;
};

/** 常见犬类品种费率系数 */
export const DOG_BREED_RATES: BreedRateFactor[] = [
  { breed: 'Labrador Retriever', factor: 1.0 },
  { breed: 'Golden Retriever', factor: 1.0 },
  { breed: 'German Shepherd', factor: 1.2 },
  { breed: 'French Bulldog', factor: 1.4 },
  { breed: 'Bulldog', factor: 1.5 },
  { breed: 'Poodle', factor: 0.9 },
  { breed: 'Beagle', factor: 0.9 },
  { breed: 'Rottweiler', factor: 1.3 },
  { breed: 'Yorkshire Terrier', factor: 0.8 },
  { breed: 'Dachshund', factor: 1.1 },
  { breed: 'Mixed Breed', factor: 1.0 },
  { breed: 'Other', factor: 1.0 },
];

/** 常见猫类品种费率系数 */
export const CAT_BREED_RATES: BreedRateFactor[] = [
  { breed: 'Domestic Shorthair', factor: 1.0 },
  { breed: 'Domestic Longhair', factor: 1.0 },
  { breed: 'Maine Coon', factor: 1.2 },
  { breed: 'Persian', factor: 1.3 },
  { breed: 'Siamese', factor: 1.1 },
  { breed: 'Bengal', factor: 1.1 },
  { breed: 'Ragdoll', factor: 1.1 },
  { breed: 'Sphynx', factor: 1.2 },
  { breed: 'British Shorthair', factor: 1.0 },
  { breed: 'Mixed Breed', factor: 1.0 },
  { breed: 'Other', factor: 1.0 },
];

/** US 州地区的价格调整系数 */
export const US_STATE_REGIONS: Record<string, number> = {
  CA: 1.3,
  NY: 1.35,
  FL: 1.1,
  TX: 1.05,
  IL: 1.05,
  PA: 1.0,
  OH: 0.9,
  GA: 0.95,
  NC: 0.9,
  MI: 0.95,
  NJ: 1.2,
  VA: 0.95,
  WA: 1.1,
  AZ: 0.95,
  MA: 1.15,
  IN: 0.85,
  TN: 0.85,
  MO: 0.85,
  MD: 1.05,
  WI: 0.85,
  MN: 0.9,
  CO: 1.0,
  SC: 0.85,
  AL: 0.8,
  LA: 0.85,
  KY: 0.8,
  OR: 1.0,
  OK: 0.8,
  CT: 1.15,
  IA: 0.8,
  MS: 0.8,
  AR: 0.8,
  KS: 0.8,
  UT: 0.9,
  NV: 1.0,
  NM: 0.8,
  WV: 0.8,
  NE: 0.8,
  ID: 0.8,
  HI: 1.15,
  ME: 0.95,
  NH: 0.95,
  RI: 1.1,
  MT: 0.8,
  DE: 0.95,
  SD: 0.8,
  ND: 0.8,
  AK: 1.1,
  VT: 0.95,
  WY: 0.8,
  DC: 1.2,
};

/** 标准月费基线（USD，基于 2 岁中型混种犬） */
export const BASE_MONTHLY_PREMIUM = {
  dog: 45,
  cat: 20,
} as const;
