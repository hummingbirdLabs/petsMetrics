import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { BARFWidget } from '@/components/shared/BARFWidget';
import { ErrorBoundaryWrapper } from '@/components/shared/ErrorBoundaryWrapper';

export const metadata: Metadata = {
  title: 'BARF Raw Feeding Calculator — Free Daily Portion Guide | petsMetrics',
  description:
    'Calculate daily BARF raw feeding portions for dogs and cats. Muscle meat, bone, liver, organ, and vegetable ratios based on NRC guidelines.',
};

export default async function BARFCalculatorPage() {
  await getTranslations('barf'); // preload

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-[--gray-900]">BARF Raw Feeding Calculator</h1>
        <p className="mt-1 text-sm text-[--gray-500]">
          Calculate precise daily raw feeding portions based on your pet&apos;s weight and species.
        </p>
      </div>
      <ErrorBoundaryWrapper>
        <BARFWidget />
      </ErrorBoundaryWrapper>
    </div>
  );
}
