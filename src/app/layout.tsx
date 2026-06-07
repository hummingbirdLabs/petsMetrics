import type { Metadata } from 'next';
import './globals.css';
import { SITE_URL, SITE_NAME, BRAND_TAGLINE } from '@/constants';

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[--white] font-body text-[--gray-700] antialiased">
        {children}
      </body>
    </html>
  );
}
