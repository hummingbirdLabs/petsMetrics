import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { SITE_URL, SITE_NAME } from '@/constants';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacy' });

  return {
    title: `${t('title')} — ${SITE_NAME}`,
    description: t('philosophyP1'),
    alternates: {
      canonical: `${SITE_URL}/${locale}/privacy/`,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: `${t('title')} — ${SITE_NAME}`,
      description: t('philosophyP1'),
      url: `${SITE_URL}/${locale}/privacy/`,
      type: 'website',
      images: [{ url: `${SITE_URL}/og/home.webp`, width: 1200, height: 630, alt: `${SITE_NAME} — Privacy Policy` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${t('title')} — ${SITE_NAME}`,
      description: t('philosophyP1'),
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

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacy' });

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
          {t('philosophy')}
        </h2>
        <p>{t('philosophyP1')}</p>

        <h2 className="text-2xl font-bold tracking-tight text-[--gray-900]">
          {t('notCollect')}
        </h2>
        <ul className="list-disc space-y-2 pl-6">
          <li><RichText text={t('notCollectP1')} /></li>
          <li><RichText text={t('notCollectP2')} /></li>
          <li><RichText text={t('notCollectP3')} /></li>
          <li><RichText text={t('notCollectP4')} /></li>
        </ul>

        <h2 className="text-2xl font-bold tracking-tight text-[--gray-900]">
          {t('storedOnDevice')}
        </h2>
        <p>{t('storedOnDeviceP1')}</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>{t('storedOnDeviceP2')}</li>
          <li>{t('storedOnDeviceP3')}</li>
          <li>{t('storedOnDeviceP4')}</li>
          <li>{t('storedOnDeviceP5')}</li>
        </ul>
        <p>{t('storedOnDeviceP6')}</p>

        <h2 className="text-2xl font-bold tracking-tight text-[--gray-900]">
          {t('analytics')}
        </h2>
        <p>{t('analyticsP1')}</p>

        <h2 className="text-2xl font-bold tracking-tight text-[--gray-900]">
          {t('thirdParty')}
        </h2>
        <p>{t('thirdPartyP1')}</p>
        <p>{t('thirdPartyP2')}</p>

        <h2 className="text-2xl font-bold tracking-tight text-[--gray-900]">
          {t('children')}
        </h2>
        <p>{t('childrenP1')}</p>

        <h2 className="text-2xl font-bold tracking-tight text-[--gray-900]">
          {t('gdpr')}
        </h2>
        <p>{t('gdprP1')}</p>
        <p>
          <RichText
            text={t('gdprP2')}
            linkHref="mailto:hello@petsmetrics.com"
            linkText="hello@petsmetrics.com"
          />
        </p>

        <h2 className="text-2xl font-bold tracking-tight text-[--gray-900]">
          {t('changes')}
        </h2>
        <p>{t('changesP1')}</p>
      </section>
    </div>
  );
}
