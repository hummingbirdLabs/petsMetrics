'use client';
import { useState, useCallback, useMemo } from 'react';
import { calculateCatAge } from '@/lib/calculators/cat-age.calc';
import type { CatAgeInput, CatLifeStage, CatAgeResult } from '@/lib/calculators/cat-age.calc';

type CatAgeState = {
  ageMonths: number;
  result: CatAgeResult | null;
  error: string | null;
};

const DEFAULT_STATE: CatAgeState = {
  ageMonths: 12,
  result: null,
  error: null,
};

const LIFE_STAGE_COLORS: Record<CatLifeStage, string> = {
  kitten: 'var(--status-caution)',
  junior: 'var(--cat-primary)',
  prime: 'var(--status-safe)',
  mature: 'var(--status-info)',
  senior: 'var(--cat-accent)',
  geriatric: '#6366F1',
};

const AGE_BREAKPOINTS = [
  { months: 6, label: '6 months' },
  { months: 12, label: '1 year' },
  { months: 24, label: '2 years' },
  { months: 36, label: '3 years' },
  { months: 60, label: '5 years' },
  { months: 84, label: '7 years' },
  { months: 120, label: '10 years' },
  { months: 180, label: '15 years' },
  { months: 240, label: '20 years' },
];

export function useCatAge() {
  const [state, setState] = useState<CatAgeState>(DEFAULT_STATE);

  const setAgeMonths = useCallback((months: number) => {
    setState((prev) => ({ ...prev, ageMonths: months, result: null, error: null }));
  }, []);

  const calculate = useCallback(() => {
    if (state.ageMonths <= 0) {
      setState((prev) => ({ ...prev, error: 'Age must be greater than 0' }));
      return;
    }
    const input: CatAgeInput = { actualAgeMonths: state.ageMonths };
    const res = calculateCatAge(input);
    if (res.ok) {
      setState((prev) => ({ ...prev, result: res.data, error: null }));
    } else {
      setState((prev) => ({ ...prev, result: null, error: res.error.details ?? 'Calculation error' }));
    }
  }, [state.ageMonths]);

  const stageColor = useMemo(() => {
    if (!state.result) return undefined;
    return LIFE_STAGE_COLORS[state.result.lifeStage];
  }, [state.result]);

  const comparisonData = useMemo(() => {
    return AGE_BREAKPOINTS.map((bp) => {
      const res = calculateCatAge({ actualAgeMonths: bp.months });
      return {
        key: bp.label,
        months: bp.months,
        humanAge: res.ok ? res.data.humanAgeEquivalent : 0,
        stage: res.ok ? res.data.lifeStage : '',
      };
    });
  }, []);

  return {
    ...state,
    setAgeMonths,
    calculate,
    stageColor,
    comparisonData,
  };
}
