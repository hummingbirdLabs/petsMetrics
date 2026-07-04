import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

// Locale-to-messages cache to avoid per-request dynamic import.
const messageCache: Record<string, any> = {};

async function loadMessages(locale: string) {
  if (messageCache[locale]) return messageCache[locale];
  const mod = await import(`../../messages/${locale}.json`);
  messageCache[locale] = mod.default;
  return mod.default;
}

export default getRequestConfig(async ({ locale: requestLocaleParam }: { locale?: string }) => {
  let locale = requestLocaleParam;
  if (!locale || !routing.locales.includes(locale as (typeof routing.locales)[number])) {
    locale = routing.defaultLocale;
  }

  const localeMessages = await loadMessages(locale);

  // Compare namespace was added in P0 — only en and zh currently have it.
  // Shallow-merge en compare keys for other locales so tc() calls fall back to English.
  const enMsgs = await loadMessages('en');
  const localeCompare = (localeMessages as any).compare;
  const compareMessages =
    locale === 'en'
      ? (enMsgs as any).compare
      : localeCompare && typeof localeCompare === 'object'
        ? { ...(enMsgs as any).compare, ...localeCompare }
        : (enMsgs as any).compare;

  return {
    locale,
    onError(error) {
      // Swallow legacy FORMATTING_ERROR from pre-existing <strong> usage in i18n messages.
      // These strings render via dangerouslySetInnerHTML with t(); they're not real rich text.
      if (error.code === 'FORMATTING_ERROR') {
        return;
      }
      console.error(error);
    },
    getMessageFallback({ namespace, key }) {
      // Graceful fallback for missing keys in untranslated locales
      return key ? `${namespace}.${key}` : (namespace ?? '');
    },
    messages: {
      ...localeMessages,
      compare: compareMessages,
    },
  };
});
