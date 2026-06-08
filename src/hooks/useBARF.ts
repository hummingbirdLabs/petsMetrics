'use client';
import { useState, useCallback } from 'react';
import { calculateBARF } from '@/lib/calculators/barf.calc';
import type { BARFResult } from '@/lib/calculators/barf.calc';
import { FEEDING_PERCENTAGE_RANGE } from '@/lib/data/barf-data';

type BARFState = {
  species: 'dog' | 'cat';
  targetWeightKg: number;
  dailyFeedingPercentage: number;
  result: BARFResult | null;
  error: string | null;
};

const DEFAULT_STATE: BARFState = {
  species: 'dog',
  targetWeightKg: 20,
  dailyFeedingPercentage: FEEDING_PERCENTAGE_RANGE.default,
  result: null,
  error: null,
};

export function useBARF() {
  const [state, setState] = useState<BARFState>(DEFAULT_STATE);

  const setSpecies = useCallback((species: 'dog' | 'cat') => {
    setState((prev) => ({ ...prev, species, result: null, error: null }));
  }, []);

  const setWeight = useCallback((targetWeightKg: number) => {
    setState((prev) => ({ ...prev, targetWeightKg, result: null, error: null }));
  }, []);

  const setPercentage = useCallback((pct: number) => {
    setState((prev) => ({ ...prev, dailyFeedingPercentage: pct, result: null, error: null }));
  }, []);

  const calculate = useCallback(() => {
    if (state.targetWeightKg <= 0) {
      setState((prev) => ({ ...prev, error: 'Weight must be greater than 0' }));
      return;
    }
    const r = calculateBARF({
      species: state.species,
      targetWeightKg: state.targetWeightKg,
      dailyFeedingPercentage: state.dailyFeedingPercentage,
    });
    if (!r.ok) {
      setState((prev) => ({ ...prev, error: r.error.details ?? r.error.code }));
      return;
    }
    setState((prev) => ({ ...prev, result: r.data, error: null }));
  }, [state.species, state.targetWeightKg, state.dailyFeedingPercentage]);

  return {
    species: state.species,
    targetWeightKg: state.targetWeightKg,
    dailyFeedingPercentage: state.dailyFeedingPercentage,
    result: state.result,
    error: state.error,
    setSpecies,
    setWeight,
    setPercentage,
    calculate,
  };
}
