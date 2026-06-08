'use client';
import { useState, useCallback } from 'react';
import { calculateInsurance } from '@/lib/calculators/insurance.calc';
import type { InsuranceResult } from '@/lib/calculators/insurance.calc';

type InsuranceState = {
  species: 'dog' | 'cat';
  breed: string;
  age: number;
  region: string;
  result: InsuranceResult | null;
  error: string | null;
};

const DEFAULT_STATE: InsuranceState = {
  species: 'dog',
  breed: 'Mixed Breed',
  age: 2,
  region: 'CA',
  result: null,
  error: null,
};

export function useInsurance() {
  const [state, setState] = useState<InsuranceState>(DEFAULT_STATE);

  const setSpecies = useCallback((species: 'dog' | 'cat') => {
    setState((prev) => ({ ...prev, species, breed: 'Mixed Breed', result: null, error: null }));
  }, []);

  const setBreed = useCallback((breed: string) => {
    setState((prev) => ({ ...prev, breed, result: null, error: null }));
  }, []);

  const setAge = useCallback((age: number) => {
    setState((prev) => ({ ...prev, age, result: null, error: null }));
  }, []);

  const setRegion = useCallback((region: string) => {
    setState((prev) => ({ ...prev, region, result: null, error: null }));
  }, []);

  const calculate = useCallback(() => {
    if (state.age < 0) {
      setState((prev) => ({ ...prev, error: 'Age cannot be negative' }));
      return;
    }
    const r = calculateInsurance({
      species: state.species,
      breed: state.breed,
      age: state.age,
      region: state.region,
    });
    if (!r.ok) {
      setState((prev) => ({ ...prev, error: r.error.details ?? r.error.code }));
      return;
    }
    setState((prev) => ({ ...prev, result: r.data, error: null }));
  }, [state.species, state.breed, state.age, state.region]);

  return {
    species: state.species,
    breed: state.breed,
    age: state.age,
    region: state.region,
    result: state.result,
    error: state.error,
    setSpecies,
    setBreed,
    setAge,
    setRegion,
    calculate,
  };
}
