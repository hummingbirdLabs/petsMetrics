'use client';
import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { usePageUrlBuilder } from '@/hooks/usePageUrl';
import { routing } from '@/lib/routing';

type NavProps = {
  scrolled?: boolean;
};

export function Nav({ scrolled = false }: NavProps) {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pageUrl = usePageUrlBuilder();
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const links = [
    { key: 'dog', path: 'dog' },
    { key: 'cat', path: 'cat' },
    { key: 'shared', path: 'shared' },
    { key: 'profile', path: 'profile' },
  ] as const;

  const speciesColors: Record<string, string> = {
    dog: 'hover:text-[--dog-primary]',
    cat: 'hover:text-[--cat-primary]',
    shared: 'hover:text-[--brand-teal]',
    profile: 'hover:text-[--brand-teal]',
  };

  const textColor = scrolled ? 'text-white/80' : 'text-[--gray-500]';

  const langLabels: Record<string, string> = {
    en: 'EN',
    zh: '中文',
    fr: 'FR',
    de: 'DE',
    ja: '日本語',
    ko: '한국어',
    es: 'ES',
    pt: 'PT',
    nl: 'NL',
    ar: 'العربية',
    ru: 'RU',
    hi: 'हिन्दी',
  };

  const otherLocales = routing.locales.filter((loc) => loc !== locale);
  const nextLocale = otherLocales[0] || 'en';

  /** Build URL for the same page in the other locale */
  function switchLocaleUrl() {
    if (typeof window === 'undefined') return '/en/';
    const pathname = window.location.pathname;
    // Replace current locale prefix with the other locale
    const currentPrefix = `/${locale}/`;
    if (pathname.startsWith(currentPrefix)) {
      return `/${nextLocale}/` + pathname.slice(currentPrefix.length);
    }
    return `/${nextLocale}/`;
  }

  return (
    <>
      <button
        type="button"
        className={`rounded-md p-2 transition-colors lg:hidden ${textColor} hover:bg-white/10`}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={t('toggleNav')}
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          {open ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      <nav
        className={`${
          open ? 'flex' : 'hidden'
        } lg:flex flex-col lg:flex-row absolute lg:static top-full left-0 w-full lg:w-auto bg-[--brand-navy] lg:bg-transparent px-4 pb-4 lg:p-0 gap-1 lg:gap-6`}
      >
        <a
          href={pageUrl('')}
          className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${textColor} hover:text-[--brand-teal]`}
        >
          {t('home')}
        </a>
        {links.map(({ key, path }) => (
          <a
            key={key}
            href={pageUrl(path)}
            className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${textColor} ${speciesColors[key]}`}
          >
            {t(key)}
          </a>
        ))}

        {/* Language Switcher — rightmost position */}
        <div className="relative ml-auto lg:ml-4">
          <button
            type="button"
            className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${textColor} hover:text-[--brand-teal] flex items-center gap-1`}
            onClick={() => setLangOpen(!langOpen)}
            aria-haspopup="listbox"
            aria-expanded={langOpen}
            aria-label={t('switchLanguage')}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
            <span>{langLabels[locale] || locale.toUpperCase()}</span>
            <svg className="h-3 w-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {langOpen && (
            <div className="absolute right-0 top-full mt-1 min-w-[100px] rounded-lg border border-white/10 bg-[--brand-navy] shadow-lg z-50 py-1">
              {routing.locales.map((loc) => (
                <a
                  key={loc}
                  href={
                    loc === locale
                      ? '#'
                      : switchLocaleUrl()
                  }
                  onClick={(e) => {
                    if (loc === locale) {
                      e.preventDefault();
                      setLangOpen(false);
                    }
                  }}
                  className={`block px-4 py-2 text-sm transition-colors ${
                    loc === locale
                      ? 'text-[--brand-teal] font-medium'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                  role="option"
                  aria-selected={loc === locale}
                >
                  {langLabels[loc] || loc.toUpperCase()}
                  {loc === locale && (
                    <svg className="ml-1 inline h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
