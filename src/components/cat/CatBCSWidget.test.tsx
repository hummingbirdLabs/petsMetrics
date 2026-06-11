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

const defaultBCSState = {
  bcsScore: 5,
  currentWeightKg: 4.5,
  result: null,
  error: null,
  conditionColor: undefined as string | undefined,
  conditionBg: undefined as string | undefined,
};

const mockSetBcsScore = vi.fn();
const mockSetCurrentWeightKg = vi.fn();
const mockCalculate = vi.fn();

let bcsState: Record<string, any> = { ...defaultBCSState };

vi.mock('@/hooks/useCatBCS', () => ({
  useCatBCS: () => ({
    ...bcsState,
    setBcsScore: mockSetBcsScore,
    setCurrentWeightKg: mockSetCurrentWeightKg,
    calculate: mockCalculate,
  }),
}));

vi.mock('@/hooks/useProfile', () => ({
  useProfile: () => ({ activeProfile: { name: 'Luna' } }),
}));

import { CatBCSWidget } from './CatBCSWidget';

describe('CatBCSWidget', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    bcsState = { ...defaultBCSState };
    mockT.mockImplementation((key: string) => key);
  });

  it('renders the BCS form with score selector and weight input', () => {
    render(<CatBCSWidget />);
    expect(screen.getByLabelText('form.weightLabel')).toBeInTheDocument();
    expect(screen.getByText('form.submit')).toBeInTheDocument();
  });

  it('displays BCS score buttons 1-9', () => {
    render(<CatBCSWidget />);
    for (let i = 1; i <= 9; i++) {
      expect(screen.getByLabelText(`BCS ${i}`)).toBeInTheDocument();
    }
  });

  it('shows warning for BCS 9 (obese)', async () => {
    bcsState = {
      bcsScore: 9,
      currentWeightKg: 7,
      result: {
        bodyCondition: 'obese',
        idealWeightKgMin: 4.0,
        idealWeightKgMax: 5.0,
        dailyCalorieLimit: 180,
        weeksToIdealWeight: 16,
        hepaticLipidosisWarning: true,
      },
      conditionColor: 'var(--status-toxic)',
      conditionBg: 'var(--status-toxic-bg)',
    };

    render(<CatBCSWidget />);

    expect(screen.getByText('result.condition.obese')).toBeInTheDocument();
    expect(screen.getByText('result.lipidosisWarning.title')).toBeInTheDocument();
    expect(screen.getByText('result.lipidosisWarning.body')).toBeInTheDocument();
  });

  it('shows ideal weight range in result', async () => {
    bcsState = {
      bcsScore: 5,
      currentWeightKg: 4.5,
      result: {
        bodyCondition: 'ideal',
        idealWeightKgMin: 4.0,
        idealWeightKgMax: 5.0,
        dailyCalorieLimit: null,
        weeksToIdealWeight: null,
        hepaticLipidosisWarning: false,
      },
      conditionColor: 'var(--status-safe)',
      conditionBg: 'var(--status-safe-bg)',
    };

    render(<CatBCSWidget />);

    expect(screen.getByText('result.condition.ideal')).toBeInTheDocument();
    expect(screen.getByText('4 – 5 kg')).toBeInTheDocument();
  });

  it('calls calculate when submit button is clicked', async () => {
    const user = userEvent.setup();
    render(<CatBCSWidget />);

    await user.click(screen.getByText('form.submit'));
    expect(mockCalculate).toHaveBeenCalled();
  });
});
