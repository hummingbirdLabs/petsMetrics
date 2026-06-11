import { routing, type Locale } from '@/lib/routing';

/**
 * Construct a page URL with locale prefix.
 * In v1 (single-locale): pageUrl('dog/age-calculator') → '/dog/age-calculator/'
 * In v2 (multi-locale): pageUrl('en', 'dog/age-calculator') → '/en/dog/age-calculator/'
 *
 * This is the single point of URL construction — all components use this utility.
 */
export function pageUrl(locale: Locale | string, path: string): string {
  if (path === '') return `/${locale}/`;
  return `/${locale}/${path}/`;
}

/**
 * Create a locale-scoped pageUrl function for Server Components.
 * Usage in [locale] pages:
 *   const url = createPageUrl(locale);
 *   url('dog/age-calculator') → '/en/dog/age-calculator/'
 */
export function createPageUrl(locale: Locale | string) {
  return (path: string): string => pageUrl(locale, path);
}

/**
 * Get the locale-neutral path (strips locale prefix).
 * "/en/dog/age-calculator/" → "dog/age-calculator"
 * "/en/" → ""
 * "/zh/" → ""
 */
export function stripLocale(fullPath: string): string {
  for (const locale of routing.locales) {
    const prefix = `/${locale}/`;
    if (fullPath.startsWith(prefix)) {
      return fullPath.slice(prefix.length).replace(/\/$/, '');
    }
  }
  return fullPath.replace(/^\/|\/$/g, '');
}
