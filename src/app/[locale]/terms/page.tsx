import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { SITE_URL, SITE_NAME } from '@/constants';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'terms' });

  return {
    title: `${t('title')} — ${SITE_NAME}`,
    description: t('medicalDisclaimerP1').replace(/<[^>]*>/g, ''),
    alternates: {
      canonical: `${SITE_URL}/${locale}/terms/`,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: `${t('title')} — ${SITE_NAME}`,
      description: t('medicalDisclaimerP1').replace(/<[^>]*>/g, ''),
      url: `${SITE_URL}/${locale}/terms/`,
      type: 'website',
      images: [{ url: `${SITE_URL}/og/home.webp`, width: 1200, height: 630, alt: `${SITE_NAME} — Terms of Service` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${t('title')} — ${SITE_NAME}`,
      description: t('medicalDisclaimerP1').replace(/<[^>]*>/g, ''),
      images: [`${SITE_URL}/og/home.webp`],
    },
  };
}

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

export default async function TermsPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'terms' });

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-[--gray-900] sm:text-4xl">
        {t('title')}
      </h1>
      <p className="mt-2 text-sm text-[--gray-400]">
        {t('lastUpdated')}
      </p>

      <section className="mt-8 space-y-6 text-base leading-relaxed text-[--gray-600]">
        <h2 className="text-2xl font-bold tracking-tight text-[--gray-900]">
          {t('acceptance')}
        </h2>
        <p>{t('acceptanceP1')}</p>

        <h2 className="text-2xl font-bold tracking-tight text-[--gray-900]">
          {t('medicalDisclaimer')}
        </h2>
        <p className="rounded-lg border border-amber-200 bg-amber-50/80 p-4 text-amber-900">
          <RichText text={t('medicalDisclaimerP1')} />
        </p>
        <p>{t('medicalDisclaimerP2')}</p>

        <h2 className="text-2xl font-bold tracking-tight text-[--gray-900]">
          {t('noVetRelationship')}
        </h2>
        <p>{t('noVetRelationshipP1')}</p>

        <h2 className="text-2xl font-bold tracking-tight text-[--gray-900]">
          {t('accuracy')}
        </h2>
        <p>{t('accuracyP1')}</p>

        <h2 className="text-2xl font-bold tracking-tight text-[--gray-900]">
          {t('liability')}
        </h2>
        <p>{t('liabilityP1')}</p>

        <h2 className="text-2xl font-bold tracking-tight text-[--gray-900]">
          {t('intellectual')}
        </h2>
        <p>{t('intellectualP1')}</p>

        <h2 className="text-2xl font-bold tracking-tight text-[--gray-900]">
          {t('thirdParty')}
        </h2>
        <p>{t('thirdPartyP1')}</p>

        <h2 className="text-2xl font-bold tracking-tight text-[--gray-900]">
          {t('changes')}
        </h2>
        <p>{t('changesP1')}</p>

        <h2 className="text-2xl font-bold tracking-tight text-[--gray-900]">
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
  );
}
