import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { SITE_URL, SITE_NAME } from '@/constants';
import { JsonLdScript } from '@/components/shared/JsonLdScript';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'about' });

  return {
    title: `${t('title')} — Science-Based Pet Health Tools | ${SITE_NAME}`,
    description: t('intro'),
    alternates: {
      canonical: `${SITE_URL}/${locale}/about/`,
    },
    openGraph: {
      title: `${t('title')} — Free Dog & Cat Health Calculators`,
      description: t('intro'),
      url: `${SITE_URL}/${locale}/about/`,
      type: 'website',
      images: [{ url: `${SITE_URL}/og/home.webp`, width: 1200, height: 630, alt: `${SITE_NAME} — Science-Based Pet Health Tools` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${t('title')} — Free Dog & Cat Health Calculators`,
      description: t('intro'),
      images: [`${SITE_URL}/og/home.webp`],
    },
  };
}

const orgJsonLd = {
  '@type': 'Organization',
  'name': SITE_NAME,
  'url': SITE_URL,
  'description': 'Free science-based health calculators for dogs and cats. One profile, every answer.',
  'founder': {
    '@type': 'Person',
    'name': 'petsMetrics Team',
  },
};

function RichText({ text, linkHref, linkText }: { text: string; linkHref?: string; linkText?: string }) {
  if (!linkHref || !linkText) {
    return <span dangerouslySetInnerHTML={{ __html: text }} />;
  }
  const parts = text.split('<link>');
  return (
    <>
      <span dangerouslySetInnerHTML={{ __html: parts[0] }} />
      <a href={linkHref} className="text-[--dog-primary] underline">
        {linkText}
      </a>
      {parts[1] && <span dangerouslySetInnerHTML={{ __html: parts[1] }} />}
    </>
  );
}

export default async function AboutPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'about' });

  return (
    <>
      <JsonLdScript
        data={{
          '@context': 'https://schema.org',
          '@graph': [orgJsonLd],
        }}
      />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-[--gray-900] sm:text-4xl">
          {t('title')}
        </h1>

        <section className="mt-8 space-y-6 text-base leading-relaxed text-[--gray-600]">
          <p>{t('intro')}</p>

          <h2 className="mt-10 text-2xl font-bold tracking-tight text-[--gray-900]">
            {t('methodology')}
          </h2>
          <p>{t('methodologyP1')}</p>
          <p>{t('methodologyP2')}</p>

          <h2 className="mt-10 text-2xl font-bold tracking-tight text-[--gray-900]">
            {t('dataSources')}
          </h2>
          <p>{t('dataSourcesP1')}</p>
          <p>{t('dataSourcesP2')}</p>

          <h2 className="mt-10 text-2xl font-bold tracking-tight text-[--gray-900]">
            {t('privacy')}
          </h2>
          <p>
            <RichText
              text={t('privacyP1')}
              linkHref={`/${locale}/privacy/`}
              linkText="Privacy Policy"
            />
          </p>

          <h2 className="mt-10 text-2xl font-bold tracking-tight text-[--gray-900]">
            {t('medical')}
          </h2>
          <p>
            <RichText text={t('medicalP1')} />
          </p>

          <h2 className="mt-10 text-2xl font-bold tracking-tight text-[--gray-900]">
            {t('contact')}
          </h2>
          <p>
            <RichText
              text={t('contactP1')}
              linkHref="mailto:hello@petsmetrics.com"
              linkText="hello@petsmetrics.com"
            />
          </p>
        </section>
      </div>
    </>
  );
}
