import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Inter, DM_Mono } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import './globals.css';
import { SITE_URL, SITE_NAME, BRAND_TAGLINE } from '@/constants';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProfileProvider } from '@/contexts/ProfileContext';

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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${BRAND_TAGLINE}`,
    template: `%s — ${SITE_NAME}`,
  },
  description: 'Free, science-based calculators for dogs and cats. One profile, every answer.',
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_US',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${inter.variable} ${dmMono.variable}`}
    >
      <body className="min-h-screen overflow-x-hidden bg-[--white] font-body text-[--gray-700] antialiased">
        <NextIntlClientProvider messages={messages}>
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
