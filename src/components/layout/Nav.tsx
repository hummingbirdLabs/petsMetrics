'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { pageUrl } from '@/lib/utils/url';

type NavProps = {
  scrolled?: boolean;
};

export function Nav({ scrolled = false }: NavProps) {
  const t = useTranslations('nav');
  const [open, setOpen] = useState(false);

  const links = [
    { key: 'dog', href: pageUrl('dog') },
    { key: 'cat', href: pageUrl('cat') },
    { key: 'shared', href: pageUrl('shared') },
    { key: 'profile', href: pageUrl('profile') },
  ] as const;

  const speciesColors: Record<string, string> = {
    dog: 'hover:text-[--dog-primary]',
    cat: 'hover:text-[--cat-primary]',
    shared: 'hover:text-[--brand-teal]',
    profile: 'hover:text-[--brand-teal]',
  };

  const textColor = scrolled ? 'text-white/80' : 'text-[--gray-500]';

  return (
    <>
      <button
        type="button"
        className={`rounded-md p-2 transition-colors lg:hidden ${textColor} hover:bg-white/10`}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label="Toggle navigation"
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
        {links.map(({ key, href }) => (
          <a
            key={key}
            href={href}
            className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${textColor} ${speciesColors[key]}`}
          >
            {t(key)}
          </a>
        ))}
      </nav>
    </>
  );
}
