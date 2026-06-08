// Phase 4 — T4.8: 疫苗时间表生成器
// 使用 Phase 3 vaccination-schedule.ts 数据
// 基于出生日期和地区计算各疫苗应接种日期和状态

import type { Result } from '@/types/common.types';
import { VACCINATION_SCHEDULE } from '@/lib/data/vaccination-schedule';
import type { ScheduleEntry } from '@/lib/data/vaccination-schedule';

export type VaccinationInput = {
  species: 'dog' | 'cat';
  birthDate: string;
  region: 'US' | 'UK' | 'EU';
};

export type VaccinationEntry = {
  vaccine: string;
  type: 'core' | 'non-core';
  dueDate: string;
  status: 'overdue' | 'upcoming' | 'future';
  nonCoreNote?: string;
};

export type VaccinationResult = {
  schedule: VaccinationEntry[];
  nextDueDate: string | null;
};

const UPCOMING_DAYS = 30; // 30天内为 "即将到来"
const MS_PER_DAY = 86400000;

function addDaysToDate(dateStr: string, days: number): string {
  const date = new Date(dateStr + 'T00:00:00Z');
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function daysBetween(a: string, b: string): number {
  const dateA = new Date(a + 'T00:00:00Z');
  const dateB = new Date(b + 'T00:00:00Z');
  return Math.round((dateA.getTime() - dateB.getTime()) / MS_PER_DAY);
}

function getStatus(dueDate: string, today: string): VaccinationEntry['status'] {
  const diffDays = daysBetween(dueDate, today);
  if (diffDays < 0) return 'overdue';
  if (diffDays <= UPCOMING_DAYS) return 'upcoming';
  return 'future';
}

export function generateVaccinationSchedule(input: VaccinationInput): Result<VaccinationResult> {
  const { species, birthDate, region } = input;

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(birthDate) || Number.isNaN(Date.parse(birthDate + 'T00:00:00Z'))) {
    return { ok: false, error: { code: 'INVALID_DATE', details: `Invalid birth date: ${birthDate}` } };
  }

  const today = new Date().toISOString().slice(0, 10);

  // 筛选匹配物种和地区的疫苗
  const matches = VACCINATION_SCHEDULE.filter(
    (entry: ScheduleEntry) =>
      entry.species === species &&
      entry.regions.includes(region)
  );

  const schedule: VaccinationEntry[] = [];

  for (const entry of matches) {
    for (const dose of entry.doseSchedule) {
      const dueDate = addDaysToDate(birthDate, dose.ageWeeks * 7);
      const status = getStatus(dueDate, today);

      schedule.push({
        vaccine: `${entry.vaccine} — ${dose.label}`,
        type: entry.type,
        dueDate,
        status,
        nonCoreNote: entry.type === 'non-core' ? entry.nonCoreNote : undefined,
      });
    }
  }

  // 按 dueDate 排序
  schedule.sort((a, b) => a.dueDate.localeCompare(b.dueDate));

  // 找到下一个即将到来或未来的到期日
  const nextDue = schedule.find(s => s.status === 'upcoming' || s.status === 'future');
  const nextDueDate = nextDue?.dueDate ?? null;

  return {
    ok: true,
    data: { schedule, nextDueDate },
  };
}
