// Phase 4 — T4.10: EU 旅行要求检查器
// 使用 Phase 3 eu-travel-rules.ts 数据
// 逐项检查输入国家对的旅行要求

import type { Result } from '@/types/common.types';
import type { TravelRequirement } from '@/lib/data/eu-travel-rules';
import { EU_TRAVEL_REQUIREMENTS, EU_COUNTRY_CODES } from '@/lib/data/eu-travel-rules';

const VALID_COUNTRIES: ReadonlySet<string> = new Set(EU_COUNTRY_CODES);

export type EUTravelInput = {
  species: 'dog' | 'cat';
  originCountry: string;
  destinationCountry: string;
  existingDocuments: string[];
};

export type EUTravelCheckResult = {
  satisfied: { requirement: TravelRequirement }[];
  missing: { requirement: TravelRequirement; leadTimeDays: number | null }[];
  totalLeadTimeDays: number;
  isReadyToTravel: boolean;
};

function isCountryMatch(countries: string[] | 'all', target: string): boolean {
  if (countries === 'all') return true;
  return countries.includes(target);
}

function requirementApplies(
  req: TravelRequirement,
  species: 'dog' | 'cat',
  origin: string,
  destination: string
): boolean {
  if (!req.requiredFor.species.includes(species)) return false;
  if (!isCountryMatch(req.requiredFor.origin, origin)) return false;
  if (!isCountryMatch(req.requiredFor.destination, destination)) return false;
  return true;
}

export function checkEUTravelRequirements(input: EUTravelInput): Result<EUTravelCheckResult> {
  const { species, originCountry, destinationCountry, existingDocuments } = input;

  const origin = originCountry.toUpperCase();
  const dest = destinationCountry.toUpperCase();

  if (!origin || !dest) {
    return { ok: false, error: { code: 'INVALID_COUNTRY', details: 'Origin and destination countries are required' } };
  }

  if (origin.length !== 2 || dest.length !== 2) {
    return { ok: false, error: { code: 'INVALID_COUNTRY', details: 'Country codes must be ISO 3166-1 alpha-2 format (2 letters)' } };
  }

  if (!VALID_COUNTRIES.has(dest)) {
    return { ok: false, error: { code: 'INVALID_COUNTRY', details: `Unknown destination country code: ${destinationCountry}` } };
  }

  const satisfied: { requirement: TravelRequirement }[] = [];
  const missing: { requirement: TravelRequirement; leadTimeDays: number | null }[] = [];

  for (const req of EU_TRAVEL_REQUIREMENTS) {
    if (!requirementApplies(req, species, origin, dest)) continue;

    if (existingDocuments.includes(req.id)) {
      satisfied.push({ requirement: req });
    } else {
      missing.push({ requirement: req, leadTimeDays: req.leadTimeDays });
    }
  }

  // 计算总等待期（取所有缺失项中最大的 leadTimeDays）
  let totalLeadTimeDays = 0;
  for (const m of missing) {
    if (m.leadTimeDays !== null && m.leadTimeDays > totalLeadTimeDays) {
      totalLeadTimeDays = m.leadTimeDays;
    }
  }

  const isReadyToTravel = missing.length === 0;

  return {
    ok: true,
    data: { satisfied, missing, totalLeadTimeDays, isReadyToTravel },
  };
}
