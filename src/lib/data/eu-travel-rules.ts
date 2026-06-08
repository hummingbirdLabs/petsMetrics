// Phase 3 — T3.3: EU 宠物旅行规则数据
// 数据来源: EU Regulation (EU) No 576/2013, Regulation (EC) No 998/2003, UK DEFRA
// 涵盖: 全部 EU 成员国 + UK + 北欧特殊免疫区 (FI/IE/MT/NO)

export type EUCountry =
  | 'AT' | 'BE' | 'BG' | 'HR' | 'CY' | 'CZ' | 'DK' | 'EE'
  | 'FI' | 'FR' | 'DE' | 'GR' | 'HU' | 'IE' | 'IT' | 'LV'
  | 'LT' | 'LU' | 'MT' | 'NL' | 'PL' | 'PT' | 'RO' | 'SK'
  | 'SI' | 'ES' | 'SE' | 'GB' | 'NO' | 'IS' | 'LI' | 'CH';

export const EU_COUNTRY_CODES: readonly EUCountry[] = [
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE',
  'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV',
  'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK',
  'SI', 'ES', 'SE', 'GB', 'NO', 'IS', 'LI', 'CH',
] as const;

export const EU_COUNTRY_LABELS: Readonly<Record<EUCountry, string>> = {
  AT: 'Austria', BE: 'Belgium', BG: 'Bulgaria', HR: 'Croatia',
  CY: 'Cyprus', CZ: 'Czech Republic', DK: 'Denmark', EE: 'Estonia',
  FI: 'Finland', FR: 'France', DE: 'Germany', GR: 'Greece',
  HU: 'Hungary', IE: 'Ireland', IT: 'Italy', LV: 'Latvia',
  LT: 'Lithuania', LU: 'Luxembourg', MT: 'Malta', NL: 'Netherlands',
  PL: 'Poland', PT: 'Portugal', RO: 'Romania', SK: 'Slovakia',
  SI: 'Slovenia', ES: 'Spain', SE: 'Sweden', GB: 'United Kingdom',
  NO: 'Norway', IS: 'Iceland', LI: 'Liechtenstein', CH: 'Switzerland',
};

export type TravelRequirement = {
  id: string;
  name: string;
  description: string;
  leadTimeDays: number | null;
  officialSource: string;
  lastVerifiedDate: string;
  requiredFor: {
    origin: EUCountry[] | 'all';
    destination: EUCountry[] | 'all';
    species: ('dog' | 'cat')[];
  };
};

export const EU_TRAVEL_REQUIREMENTS: readonly TravelRequirement[] = [
  {
    id: 'microchip',
    name: 'Microchip (ISO 11784/11785)',
    description: 'All pets must be identified by an ISO-compliant (11784/11785) 15-digit microchip. Tattoos are only accepted if applied before 3 July 2011 and remain clearly legible. The microchip must be implanted BEFORE the rabies vaccination.',
    leadTimeDays: null,
    officialSource: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32013R0576',
    lastVerifiedDate: '2025-01-01',
    requiredFor: {
      origin: 'all',
      destination: 'all',
      species: ['dog', 'cat'],
    },
  },
  {
    id: 'rabies-vaccination',
    name: 'Rabies Vaccination',
    description: 'Pets must be vaccinated against rabies with an inactivated vaccine in accordance with the OIE Terrestrial Manual. The pet must be at least 12 weeks old at time of vaccination. Vaccination must be administered AFTER microchip implantation (or re-administered after chipping if done before). The vaccine must be valid (within booster period) at time of travel.',
    leadTimeDays: 21,
    officialSource: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32013R0576',
    lastVerifiedDate: '2025-01-01',
    requiredFor: {
      origin: 'all',
      destination: 'all',
      species: ['dog', 'cat'],
    },
  },
  {
    id: 'eu-pet-passport',
    name: 'EU Pet Passport (or EU Animal Health Certificate)',
    description: 'Intra-EU travel: An EU Pet Passport issued by an authorized veterinarian. Non-EU to EU: A non-commercial EU Animal Health Certificate (AHC) valid for 4 months of intra-EU travel or a single trip to the EU. The AHC must be issued within 10 days of travel by an Official Veterinarian in the country of origin.',
    leadTimeDays: 10,
    officialSource: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32013R0576',
    lastVerifiedDate: '2025-01-01',
    requiredFor: {
      origin: 'all',
      destination: 'all',
      species: ['dog', 'cat'],
    },
  },
  {
    id: 'rabies-antibody-titer',
    name: 'Rabies Antibody Titer Test (Certain Non-EU Countries)',
    description: 'Required ONLY for travel from non-listed (high-risk rabies) countries. A rabies antibody titration test must be performed on a blood sample taken at least 30 days after vaccination and at least 3 months before travel. The test must be conducted at an EU-approved laboratory (≥0.5 IU/ml). Pets arriving from listed (low-risk) non-EU countries do NOT need this test.',
    leadTimeDays: 90,
    officialSource: 'https://food.ec.europa.eu/animals/movement-pets_en',
    lastVerifiedDate: '2025-01-01',
    requiredFor: {
      origin: 'all',
      destination: 'all',
      species: ['dog', 'cat'],
    },
  },
  {
    id: 'tapeworm-treatment',
    name: 'Echinococcus Tapeworm Treatment (Dogs)',
    description: 'Dogs traveling to UK (GB), Ireland (IE), Finland (FI), Malta (MT), or Norway (NO) must be treated against Echinococcus multilocularis tapeworm by a veterinarian. Treatment must be administered 24–120 hours (1–5 days) before scheduled arrival time. The treatment must contain praziquantel at the appropriate dose. This applies to dogs only (not cats).',
    leadTimeDays: 5,
    officialSource: 'https://www.gov.uk/take-pet-abroad',
    lastVerifiedDate: '2025-01-01',
    requiredFor: {
      origin: 'all',
      destination: ['GB', 'IE', 'FI', 'MT', 'NO'],
      species: ['dog'],
    },
  },
  {
    id: 'health-certificate-non-eu',
    name: 'Non-Commercial EU Health Certificate (Third Countries)',
    description: 'Pets traveling from non-EU countries must be accompanied by a non-commercial EU health certificate issued by an Official Veterinarian from the country of origin. The certificate must be in the language of the EU entry point country. Valid for 10 days from issue date for border crossing, then valid for 4 months for onward intra-EU travel.',
    leadTimeDays: 10,
    officialSource: 'https://ec.europa.eu/food/animals/pet-movement_en',
    lastVerifiedDate: '2025-01-01',
    requiredFor: {
      origin: 'all',
      destination: 'all',
      species: ['dog', 'cat'],
    },
  },
  {
    id: 'min-age-rabies',
    name: 'Minimum Age Requirement (12 Weeks for Rabies)',
    description: 'The pet must be at least 12 weeks old before receiving the rabies vaccination. Additionally, a 21-day waiting period after first-ever rabies vaccination is required before travel. Therefore, the minimum age at travel is approximately 15 weeks for puppies/kittens receiving their first rabies shot.',
    leadTimeDays: 21,
    officialSource: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32013R0576',
    lastVerifiedDate: '2025-01-01',
    requiredFor: {
      origin: 'all',
      destination: 'all',
      species: ['dog', 'cat'],
    },
  },
  {
    id: 'max-pets-limit',
    name: 'Maximum Number of Pets (Non-Commercial Movement)',
    description: 'For non-commercial movement, a maximum of 5 pets per person may travel. Exceptions apply for competition/exhibition animals with written proof of registration. Commercial movement of pets follows separate regulations (Balai Directive 92/65/EEC).',
    leadTimeDays: null,
    officialSource: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32013R0576',
    lastVerifiedDate: '2025-01-01',
    requiredFor: {
      origin: 'all',
      destination: 'all',
      species: ['dog', 'cat'],
    },
  },
  {
    id: 'teip-entry-point',
    name: 'Designated Travellers Entry Point (TEP)',
    description: 'Pets arriving by air from non-EU countries must enter through a designated Travellers Point of Entry (TPE) at an international airport. The pet must be declared to customs. Some ferry/rail crossings also qualify. Direct land border crossings from non-EU countries require similar designated entry points.',
    leadTimeDays: null,
    officialSource: 'https://ec.europa.eu/food/animals/pet-movement/approved-places-entry_en',
    lastVerifiedDate: '2025-01-01',
    requiredFor: {
      origin: 'all',
      destination: 'all',
      species: ['dog', 'cat'],
    },
  },
  {
    id: 'uk-specific-docs',
    name: 'UK-Specific Documentation (Post-Brexit)',
    description: 'Since 1 January 2021, UK (GB, not NI) is treated as a "Part 2 listed" third country. Pets traveling UK → EU require an Animal Health Certificate (AHC) instead of an EU Pet Passport. EU Pet Passports issued in GB are no longer valid for EU entry. Northern Ireland maintains alignment with EU rules under the Windsor Framework.',
    leadTimeDays: 10,
    officialSource: 'https://www.gov.uk/take-pet-abroad',
    lastVerifiedDate: '2025-01-01',
    requiredFor: {
      origin: ['GB'],
      destination: 'all',
      species: ['dog', 'cat'],
    },
  },
  {
    id: 'nordic-immunity-zone',
    name: 'Nordic Echinococcus Immunity Zone (FI/IE/MT/NO)',
    description: 'Finland (FI), Ireland (IE), Malta (MT), and Norway (NO) are recognized as free from Echinococcus multilocularis. Dogs entering these countries must receive praziquantel treatment 24–120 hours before entry, documented in the pet passport or health certificate by the treating veterinarian. This is in addition to all other EU travel requirements.',
    leadTimeDays: 5,
    officialSource: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32018R0772',
    lastVerifiedDate: '2025-01-01',
    requiredFor: {
      origin: 'all',
      destination: ['FI', 'IE', 'MT', 'NO'],
      species: ['dog'],
    },
  },
];
