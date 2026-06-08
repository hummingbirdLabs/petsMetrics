'use client';
import { useState, useCallback, useRef, useEffect } from 'react';
import { searchToxicItems } from '@/lib/calculators/toxic.calc';
import type { ToxicItem, ToxicityLevel } from '@/lib/data/toxic-items';

type ToxicState = {
  query: string;
  species: 'dog' | 'cat';
  items: ToxicItem[];
  exactMatch: ToxicItem | null;
  loading: boolean;
  emptyQuery: boolean;
};

const DEFAULT_STATE: ToxicState = {
  query: '',
  species: 'dog',
  items: [],
  exactMatch: null,
  loading: false,
  emptyQuery: true,
};

export function useToxicChecker() {
  const [state, setState] = useState<ToxicState>(DEFAULT_STATE);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const latestQueryRef = useRef<string>('');

  const performSearch = useCallback((query: string, species: 'dog' | 'cat') => {
    latestQueryRef.current = query;
    if (!query.trim()) {
      setState((prev) => ({ ...prev, items: [], exactMatch: null, emptyQuery: true, loading: false }));
      return;
    }
    setState((prev) => ({ ...prev, emptyQuery: false, loading: true }));
    const res = searchToxicItems({ query: query.trim(), species });
    if (latestQueryRef.current !== query) return;
    if (res.ok) {
      setState((prev) => ({ ...prev, items: res.data.items, exactMatch: res.data.exactMatch, loading: false }));
    } else {
      setState((prev) => ({ ...prev, items: [], exactMatch: null, loading: false }));
    }
  }, []);

  const setQuery = useCallback((q: string) => {
    setState((prev) => ({ ...prev, query: q }));
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      performSearch(q, state.species);
    }, 200);
  }, [state.species, performSearch]);

  const setSpecies = useCallback((species: 'dog' | 'cat') => {
    setState((prev) => ({ ...prev, species }));
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (state.query.trim()) {
      debounceRef.current = setTimeout(() => {
        performSearch(state.query, species);
      }, 200);
    }
  }, [state.query, performSearch]);

  const clearQuery = useCallback(() => {
    setState((prev) => ({ ...prev, query: '', items: [], exactMatch: null, emptyQuery: true }));
  }, []);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const getSpeciesLevel = useCallback((item: ToxicItem, species: 'dog' | 'cat'): ToxicityLevel => {
    return species === 'dog' ? item.dogLevel : item.catLevel;
  }, []);

  return {
    ...state,
    setQuery,
    setSpecies,
    clearQuery,
    getSpeciesLevel,
  };
}
