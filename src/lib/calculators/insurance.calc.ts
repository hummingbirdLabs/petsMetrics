// Phase 8 — T8.3: 宠物保险费用估算器
// 参考 README.MD §7.3

import type { Result } from '@/types/common.types';
import { INSURANCE_PROVIDERS, DOG_BREED_RATES, CAT_BREED_RATES, US_STATE_REGIONS, BASE_MONTHLY_PREMIUM } from '@/lib/data/insurance-data';

export type InsuranceInput = {
  species: 'dog' | 'cat';
  breed: string;
  age: number; // 年
  region: string; // US 州码
};

export type ProviderEstimate = {
  id: string;
  name: string;
  lowEstimate: number;
  highEstimate: number;
  features: string[];
  annualDeductibleRange: string;
  reimbursementRate: string;
  url: string;
};

export type InsuranceResult = {
  monthlyRange: { low: number; high: number };
  providers: ProviderEstimate[];
  ageWarning: string | null;
};

function getBreedFactor(species: 'dog' | 'cat', breed: string): number {
  const list = species === 'dog' ? DOG_BREED_RATES : CAT_BREED_RATES;
  return list.find((b) => b.breed === breed)?.factor ?? 1.0;
}

function getRegionFactor(region: string): number {
  return US_STATE_REGIONS[region.toUpperCase()] ?? 1.0;
}

function getAgeMultiplier(age: number): number {
  if (age <= 1) return 2.5;
  if (age <= 3) return 1.0;
  if (age <= 6) return 1.3;
  if (age <= 10) return 2.0;
  return 3.5;
}

function getAgeWarning(age: number): string | null {
  if (age >= 10) return 'Many insurers limit new policies for pets aged 10+. Pumpkin and Trupanion may still accept.';
  if (age >= 7) return 'Premiums increase significantly after age 7. Consider enrolling early.';
  return null;
}

export function calculateInsurance(input: InsuranceInput): Result<InsuranceResult> {
  const { species, breed, age, region } = input;

  if (age < 0) {
    return { ok: false, error: { code: 'INVALID_AGE', details: 'Age cannot be negative' } };
  }

  if (age > 25) {
    return { ok: false, error: { code: 'AGE_OUT_OF_RANGE', details: 'Age exceeds typical pet lifespan' } };
  }

  const base = BASE_MONTHLY_PREMIUM[species];
  const breedFactor = getBreedFactor(species, breed);
  const regionFactor = getRegionFactor(region);
  const ageMultiplier = getAgeMultiplier(age);

  const adjustedBase = base * breedFactor * regionFactor * ageMultiplier;

  // 保险商按各自定价区间调整
  const providerMultipliers: Record<string, { low: number; high: number }> = {
    lemonade: { low: 0.75, high: 1.15 },
    pumpkin: { low: 0.9, high: 1.35 },
    trupanion: { low: 0.8, high: 1.5 },
    petplan: { low: 0.7, high: 1.3 },
  };

  const providers: ProviderEstimate[] = INSURANCE_PROVIDERS.map((p) => {
    const mult = providerMultipliers[p.id] ?? { low: 0.8, high: 1.3 };
    return {
      id: p.id,
      name: p.name,
      lowEstimate: Math.round(adjustedBase * mult.low),
      highEstimate: Math.round(adjustedBase * mult.high),
      features: p.features,
      annualDeductibleRange: p.annualDeductibleRange,
      reimbursementRate: p.reimbursementRate,
      url: p.url,
    };
  });

  const allLows = providers.map((p) => p.lowEstimate);
  const allHighs = providers.map((p) => p.highEstimate);

  return {
    ok: true,
    data: {
      monthlyRange: {
        low: Math.min(...allLows),
        high: Math.max(...allHighs),
      },
      providers,
      ageWarning: getAgeWarning(age),
    },
  };
}
