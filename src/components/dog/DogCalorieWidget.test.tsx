import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockT = vi.fn((key: string) => key);
vi.mock('next-intl', () => ({
  useTranslations: (ns?: string) => (key: string) => ns === 'common' ? key : key,
  useLocale: () => 'en',
}));

vi.mock('@/components/shared/AffiliateBanner', () => ({
  AffiliateBanner: () => <div data-testid="mock-affiliate-banner" />,
}));

const defaultCalorieState = {
  weightKg: 28,
  activityScenario: 'neutered_adult' as const,
  foodCalorieDensity: '',
  result: null,
  error: null,
};

const mockSetWeight = vi.fn();
const mockSetActivityScenario = vi.fn();
const mockSetFoodCalorieDensity = vi.fn();
const mockCalculate = vi.fn();

let calorieState: Record<string, any> = {
  ...defaultCalorieState,
};

vi.mock('@/hooks/useDogCalorie', () => ({
  ...vi.importActual('@/hooks/useDogCalorie'),
  useDogCalorie: () => ({
    ...calorieState,
    setWeight: mockSetWeight,
    setActivityScenario: mockSetActivityScenario,
    setFoodCalorieDensity: mockSetFoodCalorieDensity,
    calculate: mockCalculate,
  }),
  ACTIVITY_SCENARIO_LABELS: [
    { key: 'neutered_adult', factor: 1.6 },
    { key: 'intact_adult', factor: 1.8 },
    { key: 'weight_loss', factor: 1.0 },
    { key: 'puppy_under_4m', factor: 3.0 },
    { key: 'puppy_over_4m', factor: 2.0 },
    { key: 'working_dog', factor: 3.5 },
  ],
}));

vi.mock('@/hooks/useProfile', () => ({
  useProfile: () => ({ activeProfile: { name: 'Buddy' } }),
}));

import { DogCalorieWidget } from './DogCalorieWidget';

describe('DogCalorieWidget', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    calorieState = { ...defaultCalorieState };
    mockT.mockImplementation((key: string) => key);
  });

  it('renders the form with weight input', () => {
    render(<DogCalorieWidget />);
    expect(screen.getByLabelText('form.weightLabel')).toBeInTheDocument();
    expect(screen.getByText('form.submit')).toBeInTheDocument();
  });

  it('displays MER result after calculation', async () => {
    calorieState = {
      ...defaultCalorieState,
      result: {
        rer: 345,
        mer: 552,
        activityFactor: 1.6,
        dailyFoodGrams: null,
      },
    };

    render(<DogCalorieWidget />);

    expect(screen.getByText('552')).toBeInTheDocument();
    expect(screen.getAllByText(/kcal/).length).toBeGreaterThan(0);
  });

  it('displays food portion results when food density is provided', async () => {
    calorieState = {
      ...defaultCalorieState,
      foodCalorieDensity: '3500',
      result: {
        rer: 345,
        mer: 552,
        activityFactor: 1.6,
        dailyFoodGrams: 158,
      },
    };

    render(<DogCalorieWidget />);

    expect(screen.getByText('158 g / day')).toBeInTheDocument();
  });

  it('calls calculate when submit button is clicked', async () => {
    const user = userEvent.setup();
    render(<DogCalorieWidget />);

    await user.click(screen.getByText('form.submit'));
    expect(mockCalculate).toHaveBeenCalled();
  });

  it('renders AffiliateBanner for food type', async () => {
    calorieState = {
      ...defaultCalorieState,
      result: {
        rer: 345,
        mer: 552,
        activityFactor: 1.6,
        dailyFoodGrams: null,
      },
    };

    render(<DogCalorieWidget />);
    expect(screen.getByTestId('mock-affiliate-banner')).toBeInTheDocument();
  });
});
