// Phase 4 — T4.4: 妊娠期计算器（犬/猫通用）
// 犬类平均 63 天（范围 58-68）, 猫类平均 65 天（范围 63-67）
// 多次交配日期取平均值

import type { Result } from '@/types/common.types';

export type GestationInput = {
  species: 'dog' | 'cat';
  matingDates: string[];
};

export type GestationResult = {
  earliestDate: string;
  likelyDate: string;
  latestDate: string;
  milestones: { dayOffset: number; label: string; date: string }[];
};

const DOG_AVG = 63;
const DOG_MIN = 58;
const DOG_MAX = 68;

const CAT_AVG = 65;
const CAT_MIN = 63;
const CAT_MAX = 67;

const MILESTONES: Record<'dog' | 'cat', { dayOffset: number; label: string }[]> = {
  dog: [
    { dayOffset: 21, label: 'Embryo implantation complete' },
    { dayOffset: 28, label: 'Ultrasound confirmation recommended (heartbeats detectable)' },
    { dayOffset: 35, label: 'Fetal development visible on palpation' },
    { dayOffset: 45, label: 'X-ray: fetal skeletons visible' },
    { dayOffset: 55, label: 'Prepare whelping box and nesting area' },
  ],
  cat: [
    { dayOffset: 14, label: 'Embryo implantation' },
    { dayOffset: 21, label: 'Ultrasound confirmation possible' },
    { dayOffset: 28, label: 'Nipples "pink up" — visible pregnancy sign' },
    { dayOffset: 35, label: 'Fetal development palpable' },
    { dayOffset: 45, label: 'X-ray: fetal skeletons visible' },
    { dayOffset: 55, label: 'Prepare nesting box' },
  ],
};

function addDays(dateStr: string, days: number): string {
  const date = new Date(dateStr + 'T00:00:00Z');
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

export function calculateGestation(input: GestationInput): Result<GestationResult> {
  const { species, matingDates } = input;

  if (!Array.isArray(matingDates) || matingDates.length === 0) {
    return {
      ok: false,
      error: { code: 'NO_MATING_DATES', details: 'At least one mating date is required' },
    };
  }

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  for (const date of matingDates) {
    if (!dateRegex.test(date) || Number.isNaN(Date.parse(date + 'T00:00:00Z'))) {
      return {
        ok: false,
        error: { code: 'INVALID_DATE_FORMAT', details: `Invalid ISO date: ${date}` },
      };
    }
  }

  // 取所有交配日期的均值作为基准日期
  const timestamps = matingDates.map(d => new Date(d + 'T00:00:00Z').getTime());
  const avgTimestamp = Math.round(timestamps.reduce((sum, t) => sum + t, 0) / timestamps.length);
  const baseDate = new Date(avgTimestamp).toISOString().slice(0, 10);

  const avg = species === 'dog' ? DOG_AVG : CAT_AVG;
  const min = species === 'dog' ? DOG_MIN : CAT_MIN;
  const max = species === 'dog' ? DOG_MAX : CAT_MAX;

  const earliestDate = addDays(baseDate, min);
  const likelyDate = addDays(baseDate, avg);
  const latestDate = addDays(baseDate, max);

  const milestones = MILESTONES[species].map(m => ({
    dayOffset: m.dayOffset,
    label: m.label,
    date: addDays(baseDate, m.dayOffset),
  }));

  return {
    ok: true,
    data: { earliestDate, likelyDate, latestDate, milestones },
  };
}
