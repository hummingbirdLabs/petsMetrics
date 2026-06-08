import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockT = vi.fn((key: string, params?: Record<string, string>) => {
  if (params) {
    return key + ':' + Object.values(params).join(',');
  }
  return key;
});
vi.mock('next-intl', () => ({
  useTranslations: () => mockT,
}));

vi.mock('@/components/shared/ShareButtons', () => ({
  ShareButtons: () => <div data-testid="mock-share-buttons" />,
}));

const mockSetMatingDate = vi.fn();
const mockAddMatingDate = vi.fn();
const mockRemoveMatingDate = vi.fn();
const mockSetSpecies = vi.fn();
const mockCalculate = vi.fn();

let gestationState: Record<string, any> = {
  matingDates: [''],
  species: 'dog',
  result: null,
  error: null,
};

vi.mock('@/hooks/useGestation', () => ({
  useGestation: () => ({
    ...gestationState,
    setMatingDate: mockSetMatingDate,
    addMatingDate: mockAddMatingDate,
    removeMatingDate: mockRemoveMatingDate,
    setSpecies: mockSetSpecies,
    calculate: mockCalculate,
  }),
}));

vi.mock('@/hooks/useProfile', () => ({
  useProfile: () => ({ activeProfile: { name: 'Buddy' } }),
}));

import { DogGestationWidget } from './DogGestationWidget';

describe('DogGestationWidget', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    gestationState = {
      matingDates: [''],
      species: 'dog',
      result: null,
      error: null,
    };
    mockT.mockImplementation((key: string, params?: Record<string, string>) => {
      if (params) {
        return key + ':' + Object.values(params).join(',');
      }
      return key;
    });
  });

  it('renders the mating date form', () => {
    render(<DogGestationWidget />);
    expect(screen.getByText('form.submit')).toBeInTheDocument();
    // The date inputs use type="date"
    const dateInputs = screen.getAllByDisplayValue('');
    expect(dateInputs.length).toBeGreaterThanOrEqual(1);
  });

  it('displays expected due date after calculation', async () => {
    gestationState = {
      matingDates: ['2025-01-01'],
      species: 'dog',
      result: {
        likelyDate: '2025-03-04',
        earliestDate: '2025-02-26',
        latestDate: '2025-03-10',
        milestones: [
          { dayOffset: 7, label: 'Week 1', date: '2025-01-08' },
          { dayOffset: 63, label: 'Due', date: '2025-03-04' },
        ],
      },
      error: null,
    };

    render(<DogGestationWidget />);

    expect(screen.getByText('2025-03-04')).toBeInTheDocument();
  });

  it('shows early/late date range in results', async () => {
    gestationState = {
      matingDates: ['2025-01-01'],
      species: 'dog',
      result: {
        likelyDate: '2025-03-04',
        earliestDate: '2025-02-26',
        latestDate: '2025-03-10',
        milestones: [
          { dayOffset: 7, label: 'Week 1', date: '2025-01-08' },
          { dayOffset: 63, label: 'Due', date: '2025-03-04' },
        ],
      },
      error: null,
    };

    render(<DogGestationWidget />);

    // The range text is constructed via the i18n function
    expect(mockT).toHaveBeenCalledWith('result.possibleRange', expect.any(Object));
  });

  it('displays error message when present', async () => {
    gestationState = {
      matingDates: [''],
      species: 'dog',
      result: null,
      error: 'Please enter at least one mating date',
    };

    render(<DogGestationWidget />);

    expect(screen.getByRole('alert')).toHaveTextContent('Please enter at least one mating date');
  });

  it('calls calculate when submit button is clicked', async () => {
    const user = userEvent.setup();
    render(<DogGestationWidget />);

    await user.click(screen.getByText('form.submit'));
    expect(mockCalculate).toHaveBeenCalled();
  });
});
