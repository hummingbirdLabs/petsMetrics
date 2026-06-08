'use client';
import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import type { PetProfile, Species, Sex } from '@/types/profile.types';
import { useProfile } from '@/hooks/useProfile';
import { Stepper } from '@/components/ui/Stepper';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Toggle } from '@/components/ui/Toggle';
import { Card } from '@/components/ui/Card';
import { DOG_BREEDS } from '@/lib/data/dog-breeds';
import { CAT_BREEDS } from '@/lib/data/cat-breeds';
import { kgToLb, lbToKg } from '@/lib/utils/unit-convert';

type WizardStep = 'species' | 'name' | 'breed' | 'sex' | 'age' | 'weight' | 'confirm';

const STEP_ORDER: WizardStep[] = ['species', 'name', 'breed', 'sex', 'age', 'weight', 'confirm'];

type WizardData = {
  species: Species | null;
  name: string;
  breed: string;
  sex: Sex | null;
  isNeutered: boolean;
  birthDate: string;
  ageYears: number;
  ageMonths: number;
  useAge: boolean;
  weightKg: number;
  weightUnit: 'kg' | 'lb';
  photoUrl: string | null;
};

const INITIAL_DATA: WizardData = {
  species: null,
  name: '',
  breed: '',
  sex: null,
  isNeutered: true,
  birthDate: '',
  ageYears: 0,
  ageMonths: 0,
  useAge: false,
  weightKg: 0,
  weightUnit: 'kg',
  photoUrl: null,
};

type ProfileCreationWizardProps = {
  onComplete?: (profile: PetProfile) => void;
  onCancel?: () => void;
  className?: string;
};

export function ProfileCreationWizard({ onComplete, onCancel, className = '' }: ProfileCreationWizardProps) {
  const t = useTranslations('profile');
  const tu = useTranslations('common.unit');
  const { createProfile } = useProfile();
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [data, setData] = useState<WizardData>(INITIAL_DATA);
  const [breedSearch, setBreedSearch] = useState('');

  const currentStep = STEP_ORDER[currentStepIdx];

  const wizardSteps = useMemo(
    () =>
      STEP_ORDER.map((step) => {
        const labels: Record<WizardStep, string> = {
          species: t('wizard.step1Dog'),
          name: t('wizard.step2NameLabel'),
          breed: t('wizard.step2BreedLabel'),
          sex: t('wizard.step4SexLabel'),
          age: t('wizard.step3AgeLabel'),
          weight: t('wizard.step3WeightLabel'),
          confirm: t('wizard.createButton'),
        };
        return { label: labels[step] };
      }),
    [t],
  );

  const update = (partial: Partial<WizardData>) => setData((d) => ({ ...d, ...partial }));

  const canContinue = (): boolean => {
    switch (currentStep) {
      case 'species':
        return data.species !== null;
      case 'name':
        return data.name.trim().length > 0;
      case 'breed':
        return data.breed.length > 0;
      case 'sex':
        return data.sex !== null;
      case 'age':
        if (data.useAge) return data.ageYears > 0 || data.ageMonths > 0;
        return data.birthDate.length > 0;
      case 'weight':
        return data.weightKg > 0;
      case 'confirm':
        return true;
    }
  };

  const handleContinue = () => {
    if (currentStepIdx < STEP_ORDER.length - 1) {
      setCurrentStepIdx((i) => i + 1);
    } else {
      if (data.species === null || data.sex === null) return;
      const ageWeeks = data.useAge
        ? data.ageYears * 52 + data.ageMonths * 4
        : null;
      const profile = createProfile({
        name: data.name.trim(),
        species: data.species,
        breed: data.breed,
        sex: data.sex,
        isNeutered: data.isNeutered,
        birthDate: data.useAge ? null : data.birthDate || null,
        currentAgeWeeks: ageWeeks,
        weightKg: data.weightKg,
        sizeClass: null,
        photoUrl: data.photoUrl,
      });
      onComplete?.(profile);
    }
  };

  const handleBack = () => {
    if (currentStepIdx > 0) setCurrentStepIdx((i) => i - 1);
  };

  // Breed filtering
  const filteredBreeds = useMemo(() => {
    if (data.species === 'cat') {
      if (breedSearch.length === 0) return CAT_BREEDS;
      const q = breedSearch.toLowerCase();
      return CAT_BREEDS.filter((b) => b.toLowerCase().includes(q));
    }
    if (data.species === 'dog') {
      const search = breedSearch.toLowerCase();
      return DOG_BREEDS.filter((b) => b.name.toLowerCase().includes(search));
    }
    return [];
  }, [data.species, breedSearch]);

  // Weight display value
  const displayWeight = data.weightUnit === 'lb' ? kgToLb(data.weightKg) : data.weightKg;

  const handleWeightChange = (value: number) => {
    if (data.weightUnit === 'lb') {
      update({ weightKg: lbToKg(value) });
    } else {
      update({ weightKg: value });
    }
  };

  const handleWeightUnitToggle = (unit: string) => {
    update({ weightUnit: unit as 'kg' | 'lb' });
  };

  return (
    <div className={className}>
      <Stepper steps={wizardSteps} current={currentStepIdx} className="mb-8" />

      <div className="mx-auto max-w-md">
        {/* Step 1: Species */}
        {currentStep === 'species' ? (
          <div className="text-center">
            <h2 className="mb-6 font-display text-xl font-semibold text-[--gray-900]">
              {t('wizard.step1Title')}
            </h2>
            <div className="flex justify-center gap-4">
              <button
                type="button"
                onClick={() => update({ species: 'dog' })}
                className={`flex h-48 w-40 flex-col items-center justify-center rounded-2xl border-2 transition-colors ${
                  data.species === 'dog'
                    ? 'border-[--dog-primary] bg-[--dog-primary-light]'
                    : 'border-[--gray-300] bg-[--gray-100] hover:border-[--gray-500]'
                }`}
              >
                <span className="mb-3 text-5xl" aria-hidden="true">
                  🐕
                </span>
                <span className="text-lg font-semibold text-[--gray-900]">{t('wizard.step1Dog')}</span>
              </button>
              <button
                type="button"
                onClick={() => update({ species: 'cat' })}
                data-testid="wizard-species-cat"
                className={`flex h-48 w-40 flex-col items-center justify-center rounded-2xl border-2 transition-colors ${
                  data.species === 'cat'
                    ? 'border-[--cat-primary] bg-[--cat-primary-light]'
                    : 'border-[--gray-300] bg-[--gray-100] hover:border-[--gray-500]'
                }`}
              >
                <span className="mb-3 text-5xl" aria-hidden="true">
                  🐱
                </span>
                <span className="text-lg font-semibold text-[--gray-900]">{t('wizard.step1Cat')}</span>
              </button>
            </div>
            <p className="mt-4 text-xs text-[--gray-500]">{t('wizard.step1Hint')}</p>
          </div>
        ) : null}

        {/* Step 2: Name */}
        {currentStep === 'name' ? (
          <div className="text-center">
            <h2 className="mb-6 font-display text-xl font-semibold text-[--gray-900]">
              {data.species === 'cat' ? t('wizard.step2TitleCat') : t('wizard.step2TitleDog')}
            </h2>
            <Input
              label={t('wizard.step2NameLabel')}
              placeholder={t('wizard.step2NamePlaceholder')}
              value={data.name}
              onChange={(e) => update({ name: e.target.value })}
              autoFocus
            />
          </div>
        ) : null}

        {/* Step 3: Breed */}
        {currentStep === 'breed' ? (
          <div className="text-center">
            <h2 className="mb-6 font-display text-xl font-semibold text-[--gray-900]">
              {data.species === 'cat' ? t('wizard.step2TitleCat') : t('wizard.step2TitleDog')}
            </h2>
            <Input
              label={t('wizard.step2BreedLabel')}
              placeholder={t('wizard.step2BreedPlaceholder')}
              value={breedSearch}
              onChange={(e) => {
                setBreedSearch(e.target.value);
                update({ breed: e.target.value });
              }}
              autoFocus
            />
            {data.species !== null ? (
              <div className="mt-2 max-h-48 overflow-y-auto rounded-lg border border-[--gray-300] text-left">
                {filteredBreeds.length === 0 ? (
                  <p className="p-3 text-sm text-[--gray-500]">
                    {breedSearch.length > 0
                      ? t('wizard.step2NoBreedMatch')
                      : t('wizard.step2NoBreedsAvailable')}
                  </p>
                ) : (
                  filteredBreeds.slice(0, 50).map((breed) => (
                    <button
                      key={typeof breed === 'string' ? breed : breed.name}
                      type="button"
                      onClick={() => {
                        const name = typeof breed === 'string' ? breed : breed.name;
                        setBreedSearch(name);
                        update({ breed: name });
                      }}
                      className={`block w-full px-3 py-2 text-left text-sm hover:bg-[--gray-100] transition-colors ${
                        data.breed === (typeof breed === 'string' ? breed : breed.name)
                          ? 'bg-[--brand-teal-light] font-medium'
                          : ''
                      }`}
                    >
                      {typeof breed === 'string' ? breed : breed.name}
                    </button>
                  ))
                )}
              </div>
            ) : null}
          </div>
        ) : null}

        {/* Step 4: Sex + Neutered */}
        {currentStep === 'sex' ? (
          <div className="text-center">
            <h2 className="mb-6 font-display text-xl font-semibold text-[--gray-900]">
              {t('wizard.step4Title')}
            </h2>
            <div className="mb-6">
              <p className="mb-2 text-sm font-medium text-[--gray-700]">{t('wizard.step4SexLabel')}</p>
              <Toggle
                options={[t('wizard.step4Male'), t('wizard.step4Female')]}
                value={data.sex === 'male' ? t('wizard.step4Male') : data.sex === 'female' ? t('wizard.step4Female') : ''}
                onChange={(v) => update({ sex: v === t('wizard.step4Male') ? 'male' : 'female' })}
                ariaLabel={t('wizard.step4SexLabel')}
                dataTestId="wizard-sex-toggle"
              />
            </div>
            <div className="mb-4">
              <p className="mb-2 text-sm font-medium text-[--gray-700]">{t('wizard.step4NeuteredLabel')}</p>
              <Toggle
                options={[t('wizard.step4NeuteredYes'), t('wizard.step4NeuteredNo')]}
                value={data.isNeutered ? t('wizard.step4NeuteredYes') : t('wizard.step4NeuteredNo')}
                onChange={(v) => update({ isNeutered: v === t('wizard.step4NeuteredYes') })}
                ariaLabel={t('wizard.step4NeuteredLabel')}
                data-testid="wizard-neutered-toggle"
              />
            </div>
            <p className="text-xs text-[--gray-500]">{t('wizard.step4Why')}</p>
          </div>
        ) : null}

        {/* Step 5: Birth Date or Age */}
        {currentStep === 'age' ? (
          <div className="text-center">
            <h2 className="mb-6 font-display text-xl font-semibold text-[--gray-900]">
              {t('wizard.step3Title')}
            </h2>
            <div className="mb-4">
              <Toggle
                options={[t('wizard.step3BirthDateLabel'), t('wizard.step3AgeLabel')]}
                value={data.useAge ? t('wizard.step3AgeLabel') : t('wizard.step3BirthDateLabel')}
                onChange={(v) => update({ useAge: v === t('wizard.step3AgeLabel') })}
                ariaLabel={t('wizard.step3AgeAriaLabel')}
              />
            </div>
            {data.useAge ? (
              <div className="flex gap-4">
                <Input
                  label={t('wizard.step3AgeYears')}
                  type="number"
                  min={0}
                  value={data.ageYears || ''}
                  onChange={(e) => update({ ageYears: Number(e.target.value) })}
                  data-testid="wizard-age-years"
                />
                <Input
                  label={t('wizard.step3AgeMonths')}
                  type="number"
                  min={0}
                  max={11}
                  value={data.ageMonths || ''}
                  onChange={(e) => update({ ageMonths: Number(e.target.value) })}
                />
              </div>
            ) : (
              <Input
                label={t('wizard.step3BirthDateLabel')}
                type="date"
                value={data.birthDate}
                onChange={(e) => update({ birthDate: e.target.value })}
                max={new Date().toISOString().split('T')[0]}
              />
            )}
          </div>
        ) : null}

        {/* Step 6: Weight */}
        {currentStep === 'weight' ? (
          <div className="text-center">
            <h2 className="mb-6 font-display text-xl font-semibold text-[--gray-900]">
              {t('wizard.step3Title')}
            </h2>
            <div className="mb-4">
              <Toggle
                options={[tu('kg'), tu('lb')]}
                value={data.weightUnit === 'lb' ? tu('lb') : tu('kg')}
                onChange={(v) => handleWeightUnitToggle(v === tu('lb') ? 'lb' : 'kg')}
                ariaLabel={t('wizard.step3WeightAriaLabel')}
              />
            </div>
            <Input
              label={`${t('wizard.step3WeightLabel')} (${data.weightUnit === 'lb' ? tu('lb') : tu('kg')})`}
              type="number"
              min={0}
              step="0.1"
              value={displayWeight || ''}
              onChange={(e) => handleWeightChange(Number(e.target.value))}
              autoFocus
              data-testid="wizard-weight"
            />
            <p className="mt-2 text-xs text-[--gray-500]">{t('wizard.step3WeightHint')}</p>
          </div>
        ) : null}

        {/* Step 7: Confirm */}
        {currentStep === 'confirm' ? (
          <div className="text-center">
            <h2 className="mb-6 font-display text-xl font-semibold text-[--gray-900]">
              {t('wizard.step5Title')}
            </h2>
            <Card padding="md" className="mb-6">
              <div className="flex flex-col items-center gap-2">
                <span className="text-5xl" aria-hidden="true">
                  {data.species === 'dog' ? '🐕' : '🐱'}
                </span>
                <p className="text-xl font-semibold text-[--gray-900]">{data.name || t('wizard.step5Unnamed')}</p>
                {data.breed ? (
                  <p className="text-sm text-[--gray-500]">{data.breed}</p>
                ) : null}
                <p className="text-sm text-[--gray-500]">
                  {data.sex === 'male' ? t('wizard.step4Male') : t('wizard.step4Female')}
                  {' · '}
                  {data.isNeutered ? t('wizard.step4NeuteredYes') : t('wizard.step4NeuteredNo')}
                </p>
                {data.useAge ? (
                  <p className="text-sm text-[--gray-500]">
                    {data.ageYears > 0 ? `${data.ageYears} ${t('wizard.step3AgeYears')} ` : ''}
                    {data.ageMonths > 0 ? `${data.ageMonths} ${t('wizard.step3AgeMonths')}` : ''}
                  </p>
                ) : data.birthDate ? (
                  <p className="text-sm text-[--gray-500]">{data.birthDate}</p>
                ) : null}
                {data.weightKg > 0 ? (
                  <p className="text-sm text-[--gray-500]">
                    {data.weightUnit === 'lb'
                      ? `${kgToLb(data.weightKg).toFixed(1)} ${tu('lb')}`
                      : `${data.weightKg.toFixed(1)} ${tu('kg')}`}
                  </p>
                ) : null}
              </div>
            </Card>
            <p className="text-xs text-[--gray-500]">{t('wizard.step5PhotoHint')}</p>
          </div>
        ) : null}

        {/* Navigation buttons */}
        <div className="mt-8 flex items-center justify-between">
          <div>
            {currentStepIdx > 0 ? (
              <Button variant="secondary" onClick={handleBack} size="sm">
                {t('wizard.back')}
              </Button>
            ) : onCancel ? (
              <Button variant="secondary" onClick={onCancel} size="sm">
                {t('wizard.back')}
              </Button>
            ) : null}
          </div>
          <Button onClick={handleContinue} disabled={!canContinue()} size="lg" data-testid="wizard-continue">
            {currentStepIdx === STEP_ORDER.length - 1
              ? t('wizard.createButton')
              : t('wizard.continue')}
          </Button>
        </div>
      </div>
    </div>
  );
}
