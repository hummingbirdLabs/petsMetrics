'use client';
import { useTranslations } from 'next-intl';
import { usePageUrlBuilder } from '@/hooks/usePageUrl';

export function ProfileFocusSection() {
  const t = useTranslations('home.profileFocus');
  const pageUrl = usePageUrlBuilder();

  return (
    <section className="border-l-[3px] border-l-[--brand-teal] bg-[--white] py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-display text-3xl font-bold text-[--gray-900] sm:text-4xl">
          {t('title')}
        </h2>
        <p className="mt-4 text-center text-lg text-[--gray-500]">
          {t('subtitle')}
        </p>

        <div className="mt-12 space-y-0">
          {/* 步骤1 */}
          <div className="relative flex gap-4 pb-8">
            <div className="flex flex-col items-center">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[--brand-teal] text-sm font-bold text-white">
                1
              </span>
              <div className="mt-2 w-px flex-1 border-l-2 border-dashed border-[--gray-200]" />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-[--gray-900]">
                {t('step1')}
              </h3>
              <p className="mt-1 text-[--gray-500]">{t('step1Desc')}</p>
            </div>
          </div>

          {/* 步骤2 */}
          <div className="relative flex gap-4 pb-8">
            <div className="flex flex-col items-center">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[--brand-teal] text-sm font-bold text-white">
                2
              </span>
              <div className="mt-2 w-px flex-1 border-l-2 border-dashed border-[--gray-200]" />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-[--gray-900]">
                {t('step2')}
              </h3>
              <p className="mt-1 text-[--gray-500]">{t('step2Desc')}</p>
            </div>
          </div>

          {/* 步骤3 */}
          <div className="relative flex gap-4">
            <div className="flex flex-col items-center">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[--brand-teal] text-sm font-bold text-white">
                3
              </span>
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-[--gray-900]">
                {t('step3')}
              </h3>
              <p className="mt-1 text-[--gray-500]">{t('step3Desc')}</p>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <a
            href={pageUrl('profile')}
            className="inline-flex items-center justify-center rounded-xl bg-[--brand-teal] px-8 py-4 text-base font-semibold text-white transition-all hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
          >
            {t('cta')}
          </a>
        </div>
      </div>
    </section>
  );
}
