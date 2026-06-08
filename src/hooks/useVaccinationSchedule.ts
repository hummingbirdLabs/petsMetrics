'use client';
import { useState, useCallback, useMemo } from 'react';
import { generateVaccinationSchedule } from '@/lib/calculators/vaccination.calc';
import type { VaccinationInput, VaccinationResult } from '@/lib/calculators/vaccination.calc';

type VaccinationState = {
  species: 'dog' | 'cat';
  birthDate: string;
  region: 'US' | 'UK' | 'EU';
  result: VaccinationResult | null;
  error: string | null;
};

const DEFAULT_STATE: VaccinationState = {
  species: 'dog',
  birthDate: '',
  region: 'US',
  result: null,
  error: null,
};

const REGION_OPTIONS: { value: 'US' | 'UK' | 'EU'; label: string }[] = [
  { value: 'US', label: 'United States' },
  { value: 'UK', label: 'United Kingdom' },
  { value: 'EU', label: 'European Union' },
];

export function useVaccinationSchedule(initialSpecies: 'dog' | 'cat' = 'dog') {
  const [state, setState] = useState<VaccinationState>({
    ...DEFAULT_STATE,
    species: initialSpecies,
  });

  const setBirthDate = useCallback((date: string) => {
    setState((prev) => ({ ...prev, birthDate: date, result: null, error: null }));
  }, []);

  const setRegion = useCallback((region: 'US' | 'UK' | 'EU') => {
    setState((prev) => ({ ...prev, region, result: null, error: null }));
  }, []);

  const setSpecies = useCallback((species: 'dog' | 'cat') => {
    setState((prev) => ({ ...prev, species, result: null, error: null }));
  }, []);

  const calculate = useCallback(() => {
    if (!state.birthDate || state.birthDate.trim() === '') {
      setState((prev) => ({ ...prev, error: 'Please enter a birth date' }));
      return;
    }

    const input: VaccinationInput = {
      species: state.species,
      birthDate: state.birthDate,
      region: state.region,
    };

    const res = generateVaccinationSchedule(input);
    if (res.ok) {
      setState((prev) => ({ ...prev, result: res.data, error: null }));
    } else {
      setState((prev) => ({ ...prev, result: null, error: res.error.details ?? 'Calculation error' }));
    }
  }, [state.birthDate, state.region, state.species]);

  const { overdue, upcoming, future } = useMemo(() => {
    if (!state.result) return { overdue: [], upcoming: [], future: [] };
    return {
      overdue: state.result.schedule.filter((s) => s.status === 'overdue'),
      upcoming: state.result.schedule.filter((s) => s.status === 'upcoming'),
      future: state.result.schedule.filter((s) => s.status === 'future'),
    };
  }, [state.result]);

  return {
    ...state,
    overdue,
    upcoming,
    future,
    regionOptions: REGION_OPTIONS,
    setBirthDate,
    setRegion,
    setSpecies,
    calculate,
  };
}
