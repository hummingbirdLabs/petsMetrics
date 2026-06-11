'use client';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Nav } from '@/components/layout/Nav';
import { usePageUrlBuilder } from '@/hooks/usePageUrl';

export function Header() {
  const t = useTranslations('header');
  const pageUrl = usePageUrlBuilder();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80);
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors ${
        scrolled
          ? 'bg-[--brand-navy] shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a
          href={pageUrl('')}
          className={`flex items-center gap-2 text-xl font-bold transition-colors ${
            scrolled ? 'text-white' : 'text-[--brand-navy]'
          }`}
        >
          <span aria-hidden="true" className="text-2xl">🐾</span>
          <span className="font-display">{t('logoAlt')}</span>
        </a>
        <Nav scrolled={scrolled} />
      </div>
    </header>
  );
}
