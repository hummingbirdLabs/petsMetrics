'use client';
import { useState, useCallback } from 'react';
import { calculateCatHydration } from '@/lib/calculators/cat-hydration.calc';
import type { CatHydrationInput, CatHydrationResult } from '@/lib/calculators/cat-hydration.calc';

type HydrationState = {
  weightKg: number;
  dryFoodG: number;
  wetFoodG: number;
  result: CatHydrationResult | null;
  error: string | null;
};

const DEFAULT_STATE: HydrationState = {
  weightKg: 4.5,
  dryFoodG: 0,
  wetFoodG: 0,
  result: null,
  error: null,
};

const STATUS_COLOR: Record<CatHydrationResult['hydrationStatus'], string> = {
  adequate: 'var(--status-safe)',
  slightly_low: 'var(--status-caution)',
  low: 'var(--status-toxic)',
};

export function useCatHydration() {
  const [state, setState] = useState<HydrationState>(DEFAULT_STATE);

  const setWeightKg = useCallback((kg: number) => {
    setState((prev) => ({ ...prev, weightKg: kg, result: null, error: null }));
  }, []);

  const setDryFoodG = useCallback((g: number) => {
    setState((prev) => ({ ...prev, dryFoodG: g, result: null, error: null }));
  }, []);

  const setWetFoodG = useCallback((g: number) => {
    setState((prev) => ({ ...prev, wetFoodG: g, result: null, error: null }));
  }, []);

  const calculate = useCallback(() => {
    const input: CatHydrationInput = {
      weightKg: state.weightKg,
      dailyDryFoodGrams: state.dryFoodG,
      dailyWetFoodGrams: state.wetFoodG,
    };

    const res = calculateCatHydration(input);
    if (res.ok) {
      setState((prev) => ({ ...prev, result: res.data, error: null }));
    } else {
      setState((prev) => ({ ...prev, result: null, error: res.error.details ?? 'Calculation error' }));
    }
  }, [state.weightKg, state.dryFoodG, state.wetFoodG]);

  return {
    ...state,
    hydrationStatus: state.result?.hydrationStatus,
    statusColor: state.result ? STATUS_COLOR[state.result.hydrationStatus] : undefined,
    setWeightKg,
    setDryFoodG,
    setWetFoodG,
    calculate,
  };
}
