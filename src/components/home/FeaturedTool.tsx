'use client';
import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { usePageUrlBuilder } from '@/hooks/usePageUrl';

export function FeaturedTool() {
  const t = useTranslations('home.featuredTool');
  const pageUrl = usePageUrlBuilder();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCheck = () => {
    if (query.trim()) {
      window.location.href = `${pageUrl('shared/toxic-checker')}?q=${encodeURIComponent(query.trim())}`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleCheck();
  };

  return (
    <section
      className="py-24"
      style={{ background: 'linear-gradient(180deg, #FFF7ED 0%, var(--dog-surface) 100%)' }}
    >
      {/* 紧急警报横幅 */}
      <div className="bg-[--status-toxic] py-3">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <span className="text-sm font-semibold text-white">
            🚨 {t('emergencyTitle')}{' '}
            <span className="font-mono">{t('emergencyPhone')}</span>
            {' '}· 24/7
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 pt-16 sm:px-6 lg:px-8">
        <h2 className="text-center font-display text-3xl font-bold text-[--gray-900] sm:text-4xl">
          ⚠️ {t('title')}
        </h2>
        <p className="mt-4 text-center text-lg text-[--gray-500]">
          {t('desc')}
        </p>

        {/* 搜索框 */}
        <div className="mt-8 flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('searchPlaceholder')}
            aria-label={t('title')}
            className="min-w-0 flex-1 rounded-xl border border-[--gray-300] bg-white px-3 py-3 text-sm shadow-sm placeholder:text-[--gray-400] focus:border-[--brand-teal] focus:outline-none focus:ring-2 focus:ring-[--brand-teal]/20 sm:px-5 sm:text-base"
          />
          <button
            type="button"
            onClick={handleCheck}
            className="inline-flex flex-shrink-0 items-center justify-center rounded-xl bg-[--brand-teal] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[--brand-teal]/90 sm:px-6 sm:text-base"
          >
            {t('check')}
          </button>
        </div>

        {/* 最近搜索 */}
        <div className="mt-4 text-center">
          <span className="text-sm text-[--gray-500]">{t('recentSearches')} </span>
          {['grapes', 'chocolate', 'onion', 'xylitol'].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setQuery(item)}
              className="mx-1 text-sm font-medium text-[--brand-teal-dark] underline decoration-dotted underline-offset-2 hover:text-[--brand-teal-dark]/80"
            >
              {item}
            </button>
          ))}
        </div>

        {/* 结果预览占位 */}
        <div className="mt-8 space-y-2">
          <div className="flex items-center gap-3 rounded-lg bg-white/60 p-3 shadow-sm">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[--status-toxic-bg] text-sm">🔴</span>
            <span className="text-sm font-medium text-[--gray-700]">Grapes</span>
            <span className="text-sm text-[--status-toxic]">{t('previewToxic')}</span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-white/60 p-3 shadow-sm">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[--status-caution-bg] text-sm">🟡</span>
            <span className="text-sm font-medium text-[--gray-700]">Tuna (canned)</span>
            <span className="text-sm text-[--status-caution]">{t('previewCaution')}</span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-white/60 p-3 shadow-sm">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[--status-safe-bg] text-sm">🟢</span>
            <span className="text-sm font-medium text-[--gray-700]">Blueberries</span>
            <span className="text-sm text-[--status-safe]">{t('previewSafe')}</span>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a
            href={pageUrl('shared/toxic-checker')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[--brand-teal-dark] transition-colors hover:text-[--brand-teal-dark]/80"
          >
            {t('openFull')} →
          </a>
        </div>
      </div>
    </section>
  );
}
