import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockT = vi.fn((key: string) => key);
vi.mock('next-intl', () => ({
  useTranslations: () => mockT,
  useLocale: () => 'en',
}));

vi.mock('@/components/shared/ShareButtons', () => ({
  ShareButtons: () => <div data-testid="mock-share-buttons" />,
}));

const mockSetQuery = vi.fn();
const mockSetSpecies = vi.fn();
const mockClearQuery = vi.fn();
const mockGetSpeciesLevel = vi.fn();

let toxicState: Record<string, any> = {
  query: '',
  species: 'dog',
  items: [],
  exactMatch: null,
  emptyQuery: true,
  loading: false,
};

vi.mock('@/hooks/useToxicChecker', () => ({
  useToxicChecker: () => ({
    ...toxicState,
    setQuery: mockSetQuery,
    setSpecies: mockSetSpecies,
    clearQuery: mockClearQuery,
    getSpeciesLevel: mockGetSpeciesLevel,
  }),
}));

import { ToxicCheckerWidget } from './ToxicCheckerWidget';

describe('ToxicCheckerWidget', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    toxicState = {
      query: '',
      species: 'dog',
      items: [],
      exactMatch: null,
      emptyQuery: true,
      loading: false,
    };
    mockT.mockImplementation((key: string) => key);
    mockGetSpeciesLevel.mockReturnValue('toxic');
  });

  it('renders the search form with species toggle', () => {
    render(<ToxicCheckerWidget />);
    expect(screen.getByLabelText('form.searchLabel')).toBeInTheDocument();
  });

  it('displays TOXIC badge when grapes is searched for dogs', async () => {
    toxicState = {
      query: 'grapes',
      species: 'dog',
      items: [
        { name: 'Grapes', dogLevel: 'toxic', catLevel: 'toxic', symptoms: [], severity: 'high' },
      ],
      exactMatch: { name: 'Grapes', dogLevel: 'toxic', catLevel: 'toxic', symptoms: [], severity: 'high' },
      emptyQuery: false,
      loading: false,
    };
    mockGetSpeciesLevel.mockReturnValue('toxic');

    render(<ToxicCheckerWidget />);

    expect(screen.getByText('TOXIC')).toBeInTheDocument();
  });

  it('displays SAFE badge when a safe item is searched', async () => {
    toxicState = {
      query: 'blueberry',
      species: 'dog',
      items: [
        { name: 'Blueberry', dogLevel: 'safe', catLevel: 'safe', symptoms: [], severity: 'low' },
      ],
      exactMatch: { name: 'Blueberry', dogLevel: 'safe', catLevel: 'safe', symptoms: [], severity: 'low' },
      emptyQuery: false,
      loading: false,
    };
    mockGetSpeciesLevel.mockReturnValue('safe');

    render(<ToxicCheckerWidget />);

    expect(screen.getByText('SAFE')).toBeInTheDocument();
  });

  it('displays CAUTION badge for caution items', async () => {
    toxicState = {
      query: 'avocado',
      species: 'dog',
      items: [
        { name: 'Avocado', dogLevel: 'caution', catLevel: 'caution', symptoms: [], severity: 'medium' },
      ],
      exactMatch: { name: 'Avocado', dogLevel: 'caution', catLevel: 'caution', symptoms: [], severity: 'medium' },
      emptyQuery: false,
      loading: false,
    };
    mockGetSpeciesLevel.mockReturnValue('caution');

    render(<ToxicCheckerWidget />);

    expect(screen.getByText('CAUTION')).toBeInTheDocument();
  });

  it('shows loading state when searching', async () => {
    toxicState = {
      query: 'xyz',
      species: 'dog',
      items: [],
      exactMatch: null,
      emptyQuery: false,
      loading: true,
    };

    render(<ToxicCheckerWidget />);
    expect(screen.getByText('searching')).toBeInTheDocument();
  });
});
