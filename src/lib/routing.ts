export const routing = {
  locales: ['en', 'zh', 'fr', 'de', 'ja', 'ko', 'es', 'pt', 'nl', 'ar', 'ru', 'hi'] as const,
  defaultLocale: 'en' as const,
} as const;

export type Locale = (typeof routing.locales)[number];
