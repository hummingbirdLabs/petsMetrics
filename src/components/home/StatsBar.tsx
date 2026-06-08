'use client';
import { useTranslations } from 'next-intl';

export function StatsBar() {
  const t = useTranslations('home.stats');

  return (
    <section className="bg-[--brand-navy] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 text-center sm:grid-cols-4">
          <div>
            <div className="font-mono text-3xl font-bold text-[--brand-teal]">14</div>
            <div className="mt-1 text-sm text-white/70">{t('tools')}</div>
          </div>
          <div>
            <div className="font-mono text-3xl font-bold text-[--brand-teal]">200+</div>
            <div className="mt-1 text-sm text-white/70">{t('foods')}</div>
          </div>
          <div>
            <div className="font-mono text-3xl font-bold text-[--brand-teal]">AAHA</div>
            <div className="mt-1 text-sm text-white/70">{t('standards')}</div>
          </div>
          <div>
            <span className="text-3xl">🔒</span>
            <div className="mt-1 text-sm text-white/70">{t('noLogin')}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
