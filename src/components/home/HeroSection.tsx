'use client';
import { useTranslations } from 'next-intl';
import { usePageUrlBuilder } from '@/hooks/usePageUrl';

export function HeroSection() {
  const t = useTranslations('home.hero');
  const pageUrl = usePageUrlBuilder();

  return (
    <section
      className="relative flex min-h-[85vh] items-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1B2D4F 0%, #0D3349 50%, #1B2D4F 100%)',
      }}
    >
      {/* 噪点纹理覆盖层 */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")',
        }}
        aria-hidden="true"
      />

      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-12 px-4 py-20 lg:flex-row lg:py-0 sm:px-6 lg:px-8">
        {/* 左列 — 文案 */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="animate-fade-in-up font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-[56px]">
            {t('title')}
          </h1>
          <p className="mt-6 animate-fade-in-up text-lg text-white/80 sm:text-xl" style={{ animationDelay: '150ms' }}>
            {t('subtitle1')}
          </p>
          <p className="mt-2 animate-fade-in-up text-lg text-white/80 sm:text-xl" style={{ animationDelay: '250ms' }}>
            {t('subtitle2')}
          </p>

          {/* CTA 按钮 */}
          <div className="mt-8 flex animate-fade-in-up flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start" style={{ animationDelay: '400ms' }}>
            <a
              href={pageUrl('dog')}
              className="inline-flex items-center justify-center rounded-xl bg-[--dog-primary] px-8 py-[14px] text-base font-semibold text-white transition-all hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
            >
              🐕 {t('dogCta')}
            </a>
            <a
              href={pageUrl('cat')}
              className="inline-flex items-center justify-center rounded-xl bg-[--cat-primary] px-8 py-[14px] text-base font-semibold text-white transition-all hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
            >
              🐱 {t('catCta')}
            </a>
          </div>

          {/* 信任信号 */}
          <p className="mt-6 animate-fade-in-up text-sm text-white/60" style={{ animationDelay: '600ms' }}>
            {t('trustLine')}
          </p>
        </div>

        {/* 右列 — 动画档案卡片 */}
        <div className="flex w-full max-w-[340px] animate-fade-in-up flex-shrink-0 justify-center lg:max-w-[360px]" style={{ animationDelay: '500ms' }}>
          <div
            className="w-full rounded-[20px] border border-white/10 p-6 shadow-[0_24px_48px_rgba(0,0,0,0.4)]"
            style={{
              background: 'rgba(255,255,255,0.06)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-2xl">
                🐕
              </div>
              <div>
                <div className="font-display font-semibold text-white">{t('cardPetName')}</div>
                <div className="text-sm text-white/60">{t('cardBreedAge')}</div>
              </div>
            </div>
            <hr className="border-white/10" />
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-2 text-sm text-white/80">
                <span className="text-base">📊</span>
                <span>{t('cardCalories')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/80">
                <span className="text-base">📅</span>
                <span>{t('cardAge')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/80">
                <span className="text-base">💉</span>
                <span>{t('cardVaccine')}</span>
              </div>
            </div>
            <hr className="mt-4 border-white/10" />
            <div className="mt-4 text-center">
              <span className="text-sm font-medium text-[--brand-teal]">{t('cardOpenProfile')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
