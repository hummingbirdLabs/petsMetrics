import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock next-intl
const mockT = vi.fn((key: string) => key);
vi.mock('next-intl', () => ({
  useTranslations: () => mockT,
  useLocale: () => 'en',
}));

// Mock shared components
vi.mock('@/components/shared/ShareButtons', () => ({
  ShareButtons: () => <div data-testid="mock-share-buttons" />,
}));

// Default mock state for useDogAge
const defaultAgeState = {
  ageYears: 3,
  ageMonths: 0,
  sizeClass: 'medium' as const,
  result: null,
  error: null,
};

const mockSetAgeYears = vi.fn();
const mockSetAgeMonths = vi.fn();
const mockSetSizeClass = vi.fn();
const mockCalculate = vi.fn();
const mockStageColor = undefined;

let ageState: Record<string, any> = { ...defaultAgeState };

vi.mock('@/hooks/useDogAge', () => ({
  useDogAge: () => ({
    ...ageState,
    setAgeYears: mockSetAgeYears,
    setAgeMonths: mockSetAgeMonths,
    setSizeClass: mockSetSizeClass,
    calculate: mockCalculate,
    stageColor: mockStageColor,
  }),
}));

vi.mock('@/hooks/useProfile', () => ({
  useProfile: () => ({ activeProfile: null }),
}));

import { DogAgeWidget } from './DogAgeWidget';

describe('DogAgeWidget', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    ageState = { ...defaultAgeState };
    mockT.mockImplementation((key: string) => key);
  });

  it('renders the form with age and size inputs', () => {
    render(<DogAgeWidget />);
    expect(screen.getByLabelText('form.years')).toBeInTheDocument();
    expect(screen.getByLabelText('form.months')).toBeInTheDocument();
    expect(screen.getByText('form.submit')).toBeInTheDocument();
  });

  it('displays human age result after calculation', async () => {
    ageState = {
      ...defaultAgeState,
      result: {
        humanAgeEquivalent: 28,
        lifeStage: 'adult',
        stageDescription: 'Adult',
      },
    };

    render(<DogAgeWidget />);

    expect(screen.getByText('28')).toBeInTheDocument();
    expect(screen.getByText('lifeStage.adult')).toBeInTheDocument();
  });

  it('calls calculate when submit button is clicked', async () => {
    const user = userEvent.setup();
    render(<DogAgeWidget />);

    await user.click(screen.getByText('form.submit'));
    expect(mockCalculate).toHaveBeenCalled();
  });

  it('displays age comparison table', async () => {
    ageState = {
      ...defaultAgeState,
      sizeClass: 'medium',
      ageYears: 3,
      result: {
        humanAgeEquivalent: 28,
        lifeStage: 'adult',
        stageDescription: 'Adult',
      },
    };

    render(<DogAgeWidget />);

    // The comparison table rows use i18n keys like 'comparisonTable.row1', 'comparisonTable.row5', etc.
    expect(screen.getByText('comparisonTable.row1')).toBeInTheDocument();
    expect(screen.getByText('comparisonTable.row5')).toBeInTheDocument();
  });
});
