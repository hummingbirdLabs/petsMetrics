'use client';
import { useState, useCallback } from 'react';
import { calculateCatBCS } from '@/lib/calculators/cat-bcs.calc';
import type { CatBCSInput, CatBCSResult } from '@/lib/calculators/cat-bcs.calc';

type BCSState = {
  bcsScore: number;
  currentWeightKg: number;
  result: CatBCSResult | null;
  error: string | null;
};

const DEFAULT_STATE: BCSState = {
  bcsScore: 5,
  currentWeightKg: 4.5,
  result: null,
  error: null,
};

const CONDITION_COLOR: Record<string, string> = {
  underweight: 'var(--status-caution)',
  ideal: 'var(--status-safe)',
  overweight: 'var(--status-caution)',
  obese: 'var(--status-toxic)',
};

const CONDITION_BG: Record<string, string> = {
  underweight: 'var(--status-caution-bg)',
  ideal: 'var(--status-safe-bg)',
  overweight: 'var(--status-caution-bg)',
  obese: 'var(--status-toxic-bg)',
};

export function useCatBCS() {
  const [state, setState] = useState<BCSState>(DEFAULT_STATE);

  const setBcsScore = useCallback((score: number) => {
    setState((prev) => ({ ...prev, bcsScore: score, result: null, error: null }));
  }, []);

  const setCurrentWeightKg = useCallback((kg: number) => {
    setState((prev) => ({ ...prev, currentWeightKg: kg, result: null, error: null }));
  }, []);

  const calculate = useCallback(() => {
    const input: CatBCSInput = {
      bcsScore: state.bcsScore as CatBCSInput['bcsScore'],
      currentWeightKg: state.currentWeightKg,
    };

    const res = calculateCatBCS(input);
    if (res.ok) {
      setState((prev) => ({ ...prev, result: res.data, error: null }));
    } else {
      setState((prev) => ({ ...prev, result: null, error: res.error.details ?? 'Calculation error' }));
    }
  }, [state.bcsScore, state.currentWeightKg]);

  return {
    ...state,
    conditionColor: state.result ? CONDITION_COLOR[state.result.bodyCondition] : undefined,
    conditionBg: state.result ? CONDITION_BG[state.result.bodyCondition] : undefined,
    setBcsScore,
    setCurrentWeightKg,
    calculate,
  };
}
