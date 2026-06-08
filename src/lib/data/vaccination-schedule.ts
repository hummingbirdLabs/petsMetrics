// Phase 3 — T3.2: 疫苗时间表参考数据
// 数据来源: WSAVA Vaccination Guidelines (2016/2022), AAHA Canine Vaccination Guidelines, AAFP Feline Vaccination Guidelines
// 涵盖: US / UK / EU 三个地区

export type VaccineRegion = 'US' | 'UK' | 'EU';
export type VaccineType = 'core' | 'non-core';
export type SpeciesTarget = 'dog' | 'cat';

export type ScheduleEntry = {
  vaccine: string;
  type: VaccineType;
  species: SpeciesTarget;
  regions: VaccineRegion[];
  doseSchedule: {
    ageWeeks: number;
    label: string;
    intervalWeeks?: number;
  }[];
  boosterIntervalMonths: number;
  nonCoreNote?: string;
};

export const VACCINATION_SCHEDULE: readonly ScheduleEntry[] = [
  // ============================================================
  // 犬类 · 核心疫苗 (Core Canine)
  // ============================================================
  {
    vaccine: 'DHPP (Distemper, Hepatitis/Adenovirus-2, Parvovirus, Parainfluenza)',
    type: 'core',
    species: 'dog',
    regions: ['US', 'UK', 'EU'],
    doseSchedule: [
      { ageWeeks: 6, label: '6–8 weeks (first dose)' },
      { ageWeeks: 10, label: '10–12 weeks (second dose)', intervalWeeks: 4 },
      { ageWeeks: 14, label: '14–16 weeks (third dose)', intervalWeeks: 4 },
    ],
    boosterIntervalMonths: 36,
  },
  {
    vaccine: 'Rabies',
    type: 'core',
    species: 'dog',
    regions: ['US', 'UK', 'EU'],
    doseSchedule: [
      { ageWeeks: 12, label: '12–16 weeks (single dose)' },
    ],
    boosterIntervalMonths: 12,
  },
  {
    vaccine: 'Leptospirosis',
    type: 'core',
    species: 'dog',
    regions: ['US', 'UK', 'EU'],
    doseSchedule: [
      { ageWeeks: 12, label: '12 weeks (first dose)' },
      { ageWeeks: 16, label: '14–16 weeks (second dose)', intervalWeeks: 4 },
    ],
    boosterIntervalMonths: 12,
    nonCoreNote: 'WSAVA considers leptospirosis as non-core globally but core in many regions. Listed as core for US/UK/EU due to prevalence.',
  },

  // ============================================================
  // 犬类 · 非核心疫苗 (Non-Core Canine)
  // ============================================================
  {
    vaccine: 'Bordetella bronchiseptica (Kennel Cough)',
    type: 'non-core',
    species: 'dog',
    regions: ['US', 'UK', 'EU'],
    doseSchedule: [
      { ageWeeks: 6, label: '6–8 weeks (intranasal) or 8 weeks (injectable)' },
      { ageWeeks: 10, label: '10–12 weeks (second injectable dose if applicable)', intervalWeeks: 4 },
    ],
    boosterIntervalMonths: 12,
    nonCoreNote: 'Recommended for dogs that board, attend daycare, go to groomers, or visit dog parks. Intranasal vaccine may provide faster onset of immunity (3–5 days).',
  },
  {
    vaccine: 'Lyme Disease (Borrelia burgdorferi)',
    type: 'non-core',
    species: 'dog',
    regions: ['US', 'UK', 'EU'],
    doseSchedule: [
      { ageWeeks: 12, label: '12 weeks (first dose)' },
      { ageWeeks: 16, label: '14–16 weeks (second dose)', intervalWeeks: 4 },
    ],
    boosterIntervalMonths: 12,
    nonCoreNote: 'Recommended for dogs in endemic tick areas (Northeastern US, UK rural areas, EU forest regions). Use in conjunction with tick prevention.',
  },
  {
    vaccine: 'Canine Influenza (H3N8 / H3N2)',
    type: 'non-core',
    species: 'dog',
    regions: ['US'],
    doseSchedule: [
      { ageWeeks: 6, label: '6–8 weeks (first dose)' },
      { ageWeeks: 10, label: '10–12 weeks (second dose)', intervalWeeks: 4 },
    ],
    boosterIntervalMonths: 12,
    nonCoreNote: 'Currently a concern primarily in the US. Not endemic in UK/EU. Recommended for dogs in high-density environments (shelters, boarding, dog shows).',
  },
  {
    vaccine: 'Canine Coronavirus',
    type: 'non-core',
    species: 'dog',
    regions: ['US', 'UK', 'EU'],
    doseSchedule: [
      { ageWeeks: 6, label: '6 weeks (first dose)' },
      { ageWeeks: 10, label: '9–10 weeks (second dose)', intervalWeeks: 3 },
    ],
    boosterIntervalMonths: 12,
    nonCoreNote: 'WSAVA does not recommend routine use. Clinical disease is mild and self-limiting in most adult dogs. Only in high-risk kennel environments.',
  },
  {
    vaccine: 'Rattlesnake Vaccine (Crotalus atrox toxoid)',
    type: 'non-core',
    species: 'dog',
    regions: ['US'],
    doseSchedule: [
      { ageWeeks: 16, label: '16 weeks (first dose)' },
      { ageWeeks: 20, label: '20 weeks (second dose)', intervalWeeks: 4 },
    ],
    boosterIntervalMonths: 12,
    nonCoreNote: 'Limited to rattlesnake-endemic areas (Southwest/Western US). Not applicable to UK/EU. Does not eliminate need for emergency care after envenomation.',
  },

  // ============================================================
  // 猫类 · 核心疫苗 (Core Feline)
  // ============================================================
  {
    vaccine: 'FVRCP (Feline Viral Rhinotracheitis, Calicivirus, Panleukopenia)',
    type: 'core',
    species: 'cat',
    regions: ['US', 'UK', 'EU'],
    doseSchedule: [
      { ageWeeks: 6, label: '6–8 weeks (first dose)' },
      { ageWeeks: 10, label: '10–12 weeks (second dose)', intervalWeeks: 4 },
      { ageWeeks: 14, label: '14–16 weeks (third dose)', intervalWeeks: 4 },
    ],
    boosterIntervalMonths: 36,
  },
  {
    vaccine: 'Rabies (Feline)',
    type: 'core',
    species: 'cat',
    regions: ['US', 'UK', 'EU'],
    doseSchedule: [
      { ageWeeks: 12, label: '12–16 weeks (single dose)' },
    ],
    boosterIntervalMonths: 12,
  },
  {
    vaccine: 'FeLV (Feline Leukemia Virus)',
    type: 'core',
    species: 'cat',
    regions: ['US', 'UK', 'EU'],
    doseSchedule: [
      { ageWeeks: 8, label: '8 weeks (first dose)' },
      { ageWeeks: 12, label: '12 weeks (second dose)', intervalWeeks: 4 },
    ],
    boosterIntervalMonths: 12,
    nonCoreNote: 'AAFP considers FeLV core for kittens (<1 year) and non-core for indoor-only adult cats with no exposure risk. Listed as core here for complete kitten series.',
  },

  // ============================================================
  // 猫类 · 非核心疫苗 (Non-Core Feline)
  // ============================================================
  {
    vaccine: 'FIV (Feline Immunodeficiency Virus)',
    type: 'non-core',
    species: 'cat',
    regions: ['US', 'UK', 'EU'],
    doseSchedule: [
      { ageWeeks: 8, label: '8 weeks (first dose)' },
      { ageWeeks: 12, label: '12 weeks (second dose)', intervalWeeks: 4 },
      { ageWeeks: 16, label: '16 weeks (third dose)', intervalWeeks: 4 },
    ],
    boosterIntervalMonths: 12,
    nonCoreNote: 'Only for cats at high risk (outdoor cats, multi-cat households with FIV+ members). Vaccine interferes with FIV antibody testing — test before vaccination. Not 100% protective against all strains.',
  },
  {
    vaccine: 'Chlamydophila felis',
    type: 'non-core',
    species: 'cat',
    regions: ['US', 'UK', 'EU'],
    doseSchedule: [
      { ageWeeks: 8, label: '8 weeks (first dose)' },
      { ageWeeks: 12, label: '12 weeks (second dose)', intervalWeeks: 4 },
    ],
    boosterIntervalMonths: 12,
    nonCoreNote: 'Recommended for cats in multi-cat environments with history of conjunctivitis. Often combined with FVRCP vaccine.',
  },
  {
    vaccine: 'Bordetella bronchiseptica (Feline)',
    type: 'non-core',
    species: 'cat',
    regions: ['US', 'UK', 'EU'],
    doseSchedule: [
      { ageWeeks: 8, label: '8 weeks (single intranasal dose)' },
    ],
    boosterIntervalMonths: 12,
    nonCoreNote: 'For cats in shelters, catteries, or multi-cat households with upper respiratory disease outbreaks.',
  },
  {
    vaccine: 'FIP (Feline Infectious Peritonitis)',
    type: 'non-core',
    species: 'cat',
    regions: ['US'],
    doseSchedule: [
      { ageWeeks: 16, label: '16 weeks (single intranasal dose)' },
    ],
    boosterIntervalMonths: 12,
    nonCoreNote: 'AAFP/ABCD do NOT recommend routine use. Efficacy is controversial. Only consider in FCoV-negative cats entering FCoV-endemic catteries. Not available in UK/EU.',
  },
];
