'use client';
import { useState, useCallback } from 'react';
import { calculatePuppyGrowth } from '@/lib/calculators/puppy-growth.calc';
import type { PuppyGrowthResult } from '@/lib/calculators/puppy-growth.calc';
import type { SizeClass } from '@/types/profile.types';

type PuppyGrowthState = {
  currentAgeWeeks: number;
  currentWeightKg: number;
  sizeClass: SizeClass;
  result: PuppyGrowthResult | null;
  error: string | null;
};

const DEFAULT_STATE: PuppyGrowthState = {
  currentAgeWeeks: 12,
  currentWeightKg: 10,
  sizeClass: 'large',
  result: null,
  error: null,
};

export function usePuppyGrowth() {
  const [state, setState] = useState<PuppyGrowthState>(DEFAULT_STATE);

  const setCurrentAgeWeeks = useCallback((weeks: number) => {
    setState((prev) => ({ ...prev, currentAgeWeeks: weeks, result: null, error: null }));
  }, []);

  const setCurrentWeightKg = useCallback((kg: number) => {
    setState((prev) => ({ ...prev, currentWeightKg: kg, result: null, error: null }));
  }, []);

  const setSizeClass = useCallback((sizeClass: SizeClass) => {
    setState((prev) => ({ ...prev, sizeClass, result: null, error: null }));
  }, []);

  const calculate = useCallback(() => {
    if (state.currentAgeWeeks < 0) {
      setState((prev) => ({ ...prev, error: 'Age must be non-negative' }));
      return;
    }
    if (state.currentWeightKg <= 0) {
      setState((prev) => ({ ...prev, error: 'Weight must be positive' }));
      return;
    }
    const res = calculatePuppyGrowth({
      currentAgeWeeks: state.currentAgeWeeks,
      currentWeightKg: state.currentWeightKg,
      sizeClass: state.sizeClass,
    });
    if (res.ok) {
      setState((prev) => ({ ...prev, result: res.data, error: null }));
    } else {
      setState((prev) => ({ ...prev, result: null, error: res.error.details ?? 'Calculation error' }));
    }
  }, [state.currentAgeWeeks, state.currentWeightKg, state.sizeClass]);

  return {
    ...state,
    setCurrentAgeWeeks,
    setCurrentWeightKg,
    setSizeClass,
    calculate,
  };
}
