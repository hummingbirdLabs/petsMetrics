'use client';

import { useLocale } from 'next-intl';

/**
 * Returns a locale-scoped URL builder that can be used anywhere
 * inside the component (callbacks, maps, conditionals) without
 * violating React hook rules.
 *
 * Usage:
 *   const pageUrl = usePageUrlBuilder();
 *   pageUrl('dog/age-calculator') → '/en/dog/age-calculator/'
 *   pageUrl('') → '/en/'
 */
export function usePageUrlBuilder(): (path: string) => string {
  const locale = useLocale();
  return (path: string) => {
    if (path === '') return `/${locale}/`;
    return `/${locale}/${path}/`;
  };
}
