import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { InsuranceWidget } from '@/components/shared/InsuranceWidget';
import { ErrorBoundaryWrapper } from '@/components/shared/ErrorBoundaryWrapper';

export const metadata: Metadata = {
  title: 'Pet Insurance Cost Estimator — Compare Plans Instantly | petsMetrics',
  description:
    'Compare pet insurance rates from Lemonade, Pumpkin, Trupanion, and Petplan. Get monthly estimates based on breed, age, and location.',
};

export default async function PetInsuranceEstimatorPage() {
  await getTranslations('insurance'); // preload

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-[--gray-900]">Pet Insurance Cost Estimator</h1>
        <p className="mt-1 text-sm text-[--gray-500]">
          Compare monthly premiums from top providers based on your pet&apos;s breed, age, and location. All links are
          affiliate and clearly marked Sponsored.
        </p>
      </div>
      <ErrorBoundaryWrapper>
        <InsuranceWidget />
      </ErrorBoundaryWrapper>
    </div>
  );
}
