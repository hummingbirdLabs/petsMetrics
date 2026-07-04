import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Inter, DM_Mono } from 'next/font/google';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { getMessages, setRequestLocale, getTranslations } from 'next-intl/server';
import '@/app/globals.css';
import { SITE_URL, SITE_NAME, BRAND_TAGLINE } from '@/constants';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProfileProvider } from '@/contexts/ProfileContext';
import { routing } from '@/lib/routing';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-body',
  display: 'swap',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Note: metadata is generated per-locale in generateMetadata below
// This static metadata serves as fallback for any pages that don't override it

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'common' });

  // Map locale to OpenGraph locale format
  const ogLocaleMap: Record<string, string> = {
    en: 'en_US',
    zh: 'zh_CN',
    fr: 'fr_FR',
    de: 'de_DE',
    ja: 'ja_JP',
    ko: 'ko_KR',
    es: 'es_ES',
    pt: 'pt_PT',
    nl: 'nl_NL',
    ar: 'ar_SA',
    ru: 'ru_RU',
    hi: 'hi_IN',
  };

  // Build hreflang alternates for all supported locales
  const hreflangAlternates: Record<string, string> = {};
  for (const loc of routing.locales) {
    hreflangAlternates[loc] = `${SITE_URL}/${loc}/`;
  }

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${SITE_NAME} — ${BRAND_TAGLINE}`,
      template: '%s',
    },
    description: 'Free, science-based calculators for dogs and cats. One profile, every answer.',
    alternates: {
      canonical: `${SITE_URL}/${locale}/`,
      languages: hreflangAlternates,
    },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: ogLocaleMap[locale] || 'en_US',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  // RTL support for Arabic
  const isRTL = locale === 'ar';

  return (
    <html
      lang={locale}
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`${plusJakartaSans.variable} ${inter.variable} ${dmMono.variable}`}
    >
      <body className="min-h-screen overflow-x-hidden bg-[--white] font-body text-[--gray-700] antialiased">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ProfileProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </ProfileProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
