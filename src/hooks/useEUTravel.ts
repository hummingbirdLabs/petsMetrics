'use client';
import { useState, useCallback } from 'react';
import { checkEUTravelRequirements } from '@/lib/calculators/eu-travel.calc';
import type { EUTravelCheckResult } from '@/lib/calculators/eu-travel.calc';

type EUTravelState = {
  species: 'dog' | 'cat';
  originCountry: string;
  destinationCountry: string;
  existingDocuments: string[];
  result: EUTravelCheckResult | null;
  errorCode: string | null;
};

const DEFAULT_STATE: EUTravelState = {
  species: 'dog',
  originCountry: '',
  destinationCountry: '',
  existingDocuments: [],
  result: null,
  errorCode: null,
};

export function useEUTravel() {
  const [state, setState] = useState<EUTravelState>(DEFAULT_STATE);

  const setSpecies = useCallback((species: 'dog' | 'cat') => {
    setState((prev) => ({ ...prev, species, result: null, errorCode: null }));
  }, []);

  const setOriginCountry = useCallback((code: string) => {
    setState((prev) => ({ ...prev, originCountry: code, result: null, errorCode: null }));
  }, []);

  const setDestinationCountry = useCallback((code: string) => {
    setState((prev) => ({ ...prev, destinationCountry: code, result: null, errorCode: null }));
  }, []);

  const toggleDocument = useCallback((docId: string) => {
    setState((prev) => {
      const exists = prev.existingDocuments.includes(docId);
      const newDocs = exists
        ? prev.existingDocuments.filter((d) => d !== docId)
        : [...prev.existingDocuments, docId];
      return { ...prev, existingDocuments: newDocs, result: null, errorCode: null };
    });
  }, []);

  const calculate = useCallback(() => {
    if (!state.originCountry || !state.destinationCountry) {
      setState((prev) => ({
        ...prev,
        result: null,
        errorCode: 'SELECT_COUNTRIES',
      }));
      return;
    }

    const res = checkEUTravelRequirements({
      species: state.species,
      originCountry: state.originCountry,
      destinationCountry: state.destinationCountry,
      existingDocuments: state.existingDocuments,
    });

    if (res.ok) {
      setState((prev) => ({ ...prev, result: res.data, errorCode: null }));
    } else {
      setState((prev) => ({ ...prev, result: null, errorCode: res.error.code }));
    }
  }, [state.species, state.originCountry, state.destinationCountry, state.existingDocuments]);

  return {
    ...state,
    setSpecies,
    setOriginCountry,
    setDestinationCountry,
    toggleDocument,
    calculate,
  };
}
