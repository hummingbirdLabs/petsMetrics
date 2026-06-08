'use client';
import { useState, useCallback } from 'react';
import { calculateDogCalorie } from '@/lib/calculators/dog-calorie.calc';
import type { DogCalorieResult, ActivityScenario } from '@/lib/calculators/dog-calorie.calc';
import { ACTIVITY_FACTORS } from '@/constants/calorie.constants';

type DogCalorieState = {
  weightKg: number;
  activityScenario: ActivityScenario;
  foodCalorieDensity: string;
  result: DogCalorieResult | null;
  error: string | null;
};

const DEFAULT_STATE: DogCalorieState = {
  weightKg: 28,
  activityScenario: 'neutered_adult',
  foodCalorieDensity: '',
  result: null,
  error: null,
};

export const ACTIVITY_SCENARIO_LABELS: { key: ActivityScenario; factor: number }[] = Object.entries(
  ACTIVITY_FACTORS
).map(([key, factor]) => ({
  key: key as ActivityScenario,
  factor,
}));

export function useDogCalorie() {
  const [state, setState] = useState<DogCalorieState>(DEFAULT_STATE);

  const setWeight = useCallback((weightKg: number) => {
    setState((prev) => ({ ...prev, weightKg, result: null, error: null }));
  }, []);

  const setActivityScenario = useCallback((scenario: ActivityScenario) => {
    setState((prev) => ({ ...prev, activityScenario: scenario, result: null, error: null }));
  }, []);

  const setFoodCalorieDensity = useCallback((value: string) => {
    setState((prev) => ({ ...prev, foodCalorieDensity: value, result: null, error: null }));
  }, []);

  const calculate = useCallback(() => {
    if (state.weightKg <= 0) {
      setState((prev) => ({ ...prev, error: 'Weight must be greater than 0' }));
      return;
    }
    const density = state.foodCalorieDensity.trim();
    const input = {
      weightKg: state.weightKg,
      activityScenario: state.activityScenario,
      foodCalorieDensityKcalPerKg: density ? parseFloat(density) : undefined,
    };

    if (density && (isNaN(parseFloat(density)) || parseFloat(density) <= 0)) {
      setState((prev) => ({ ...prev, error: 'Invalid calorie density' }));
      return;
    }

    const res = calculateDogCalorie(input);
    if (res.ok) {
      setState((prev) => ({ ...prev, result: res.data, error: null }));
    } else {
      setState((prev) => ({ ...prev, result: null, error: res.error.details ?? 'Calculation error' }));
    }
  }, [state.weightKg, state.activityScenario, state.foodCalorieDensity]);

  return {
    ...state,
    setWeight,
    setActivityScenario,
    setFoodCalorieDensity,
    calculate,
  };
}
