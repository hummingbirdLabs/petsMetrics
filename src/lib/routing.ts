export const routing = {
  locales: ['en', 'zh'] as const,
  defaultLocale: 'en' as const,
} as const;

export type Locale = (typeof routing.locales)[number];
