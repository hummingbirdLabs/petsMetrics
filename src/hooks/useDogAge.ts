'use client';
import { useState, useCallback, useMemo } from 'react';
import { calculateDogAge } from '@/lib/calculators/dog-age.calc';
import type { DogAgeInput, DogLifeStage, DogAgeResult } from '@/lib/calculators/dog-age.calc';
import type { SizeClass } from '@/types/profile.types';

type DogAgeState = {
  ageYears: number;
  ageMonths: number;
  sizeClass: SizeClass;
  result: DogAgeResult | null;
  error: string | null;
};

const DEFAULT_STATE: DogAgeState = {
  ageYears: 3,
  ageMonths: 0,
  sizeClass: 'medium',
  result: null,
  error: null,
};

const LIFE_STAGE_COLORS: Record<DogLifeStage, string> = {
  puppy: 'var(--dog-accent)',
  junior: 'var(--brand-teal)',
  adult: 'var(--status-safe)',
  mature: 'var(--status-info)',
  senior: 'var(--cat-primary)',
  geriatric: 'var(--cat-primary-dark)',
};

export function useDogAge() {
  const [state, setState] = useState<DogAgeState>(DEFAULT_STATE);

  const setAgeYears = useCallback((ageYears: number) => {
    setState((prev) => ({ ...prev, ageYears, result: null, error: null }));
  }, []);

  const setAgeMonths = useCallback((ageMonths: number) => {
    setState((prev) => ({ ...prev, ageMonths, result: null, error: null }));
  }, []);

  const setSizeClass = useCallback((sizeClass: SizeClass) => {
    setState((prev) => ({ ...prev, sizeClass, result: null, error: null }));
  }, []);

  const calculate = useCallback(() => {
    const actualYears = state.ageYears + state.ageMonths / 12;
    if (actualYears <= 0) {
      setState((prev) => ({ ...prev, error: 'Age must be greater than 0' }));
      return;
    }
    const input: DogAgeInput = {
      actualAgeYears: actualYears,
      sizeClass: state.sizeClass,
    };
    const res = calculateDogAge(input);
    if (res.ok) {
      setState((prev) => ({ ...prev, result: res.data, error: null }));
    } else {
      setState((prev) => ({ ...prev, result: null, error: res.error.details ?? 'Calculation error' }));
    }
  }, [state.ageYears, state.ageMonths, state.sizeClass]);

  const stageColor = useMemo(() => {
    if (!state.result) return undefined;
    return LIFE_STAGE_COLORS[state.result.lifeStage];
  }, [state.result]);

  return {
    ...state,
    setAgeYears,
    setAgeMonths,
    setSizeClass,
    calculate,
    stageColor,
  };
}
