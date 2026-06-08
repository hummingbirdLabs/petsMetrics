'use client';
import { useState, useCallback } from 'react';
import { calculateGestation } from '@/lib/calculators/gestation.calc';
import type { GestationInput, GestationResult } from '@/lib/calculators/gestation.calc';

type GestationState = {
  species: 'dog' | 'cat';
  matingDates: string[];
  result: GestationResult | null;
  error: string | null;
};

const DEFAULT_STATE: GestationState = {
  species: 'dog',
  matingDates: [''],
  result: null,
  error: null,
};

export function useGestation(initialSpecies: 'dog' | 'cat' = 'dog') {
  const [state, setState] = useState<GestationState>({
    ...DEFAULT_STATE,
    species: initialSpecies,
  });

  const setMatingDate = useCallback((index: number, date: string) => {
    setState((prev) => {
      const dates = [...prev.matingDates];
      dates[index] = date;
      return { ...prev, matingDates: dates, result: null, error: null };
    });
  }, []);

  const addMatingDate = useCallback(() => {
    setState((prev) => {
      if (prev.matingDates.length >= 3) return prev;
      return { ...prev, matingDates: [...prev.matingDates, ''], result: null, error: null };
    });
  }, []);

  const removeMatingDate = useCallback((index: number) => {
    setState((prev) => {
      if (prev.matingDates.length <= 1) return prev;
      const dates = prev.matingDates.filter((_, i) => i !== index);
      return { ...prev, matingDates: dates, result: null, error: null };
    });
  }, []);

  const setSpecies = useCallback((species: 'dog' | 'cat') => {
    setState((prev) => ({ ...prev, species, result: null, error: null }));
  }, []);

  const calculate = useCallback(() => {
    const validDates = state.matingDates.filter((d) => d.trim() !== '');
    if (validDates.length === 0) {
      setState((prev) => ({ ...prev, error: 'Please enter at least one mating date' }));
      return;
    }

    const input: GestationInput = {
      species: state.species,
      matingDates: validDates,
    };

    const res = calculateGestation(input);
    if (res.ok) {
      setState((prev) => ({ ...prev, result: res.data, error: null }));
    } else {
      setState((prev) => ({ ...prev, result: null, error: res.error.details ?? 'Calculation error' }));
    }
  }, [state.matingDates, state.species]);

  return {
    ...state,
    setMatingDate,
    addMatingDate,
    removeMatingDate,
    setSpecies,
    calculate,
  };
}
