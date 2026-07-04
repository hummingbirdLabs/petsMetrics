import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { SITE_URL } from '@/constants';
import { graphJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo/geo-meta';
import { generateToxicContactPointJsonLd } from '@/lib/seo/toxic-meta';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { DisclaimerSection } from '@/components/shared/DisclaimerSection';
import { JsonLdScript } from '@/components/shared/JsonLdScript';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'emergency' });
  return {
    title: t('ateMarijuana.meta.title'),
    description: t('ateMarijuana.meta.description'),
    keywords: t('ateMarijuana.meta.keywords'),
    alternates: {
      canonical: `${SITE_URL}/${locale}/dog/emergency/ate-marijuana/`,
    },
    openGraph: {
      title: t('ateMarijuana.meta.title'),
      description: t('ateMarijuana.article.ogDescription'),
      url: `${SITE_URL}/${locale}/dog/emergency/ate-marijuana/`,
      type: 'article',
      images: [{ url: `${SITE_URL}/og/home.webp`, width: 1200, height: 630, alt: t('ateMarijuana.meta.title') }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('ateMarijuana.meta.title'),
      description: t('ateMarijuana.article.ogDescription'),
      images: [`${SITE_URL}/og/home.webp`],
    },
  };
}

export default async function DogAteMarijuanaPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'emergency' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: t('ateMarijuana.article.headline'),
    description: t('ateMarijuana.article.description'),
    author: { '@type': 'Organization', name: 'petsMetrics' },
    datePublished: '2026-07-03',
    dateModified: '2026-07-03',
    citation: [
      { '@type': 'CreativeWork', name: 'ASPCA Animal Poison Control Center', url: 'https://www.aspca.org/pet-care/animal-poison-control' },
      { '@type': 'CreativeWork', name: 'Pet Poison Helpline', url: 'https://www.petpoisonhelpline.com/' },
    ],
  };

  const faqs = t.raw('ateMarijuana.faqs') as Array<{ question: string; answer: string }>;
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  const contactPointSchema = generateToxicContactPointJsonLd();
  const breadcrumbSchema = generateBreadcrumbJsonLd([
    { position: 1, name: 'Home', item: `${SITE_URL}/` },
    { position: 2, name: 'Dog Emergency', item: `${SITE_URL}/dog/` },
    { position: 3, name: t('ateMarijuana.breadcrumbLabel'), item: '' },
  ]);

  const riskHeaders = t.raw('ateMarijuana.riskAssessment.headers') as { productType: string; amountEaten: string; riskLevel: string; actionRequired: string };
  const riskRows = t.raw('ateMarijuana.riskAssessment.rows') as Array<{ productType: string; amountEaten: string; riskLevel: string; action: string }>;
  const steps = t.raw('ateMarijuana.steps') as Array<{ title: string; content: string }>;
  const relatedTools = t.raw('ateMarijuana.relatedTools') as Array<{ name: string; url: string }>;

  return (
    <>
      <JsonLdScript data={graphJsonLd(articleSchema, faqSchema, breadcrumbSchema, contactPointSchema)} />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: t('shared.breadcrumb.home'), href: '' },
            { label: t('shared.breadcrumb.dogEmergency'), href: 'dog' },
            { label: t('ateMarijuana.breadcrumbLabel') },
          ]}
        />
      </div>

      <article className="mx-auto max-w-4xl px-4 pb-16 sm:px-6 lg:px-8">
        <header className="mb-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-800">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            {t('ateMarijuana.banner.severityLabel')}
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t('ateMarijuana.banner.title')}
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            <span dangerouslySetInnerHTML={{ __html: t('ateMarijuana.banner.subtitle') }} />
          </p>
        </header>

        <section aria-labelledby="honesty-heading" className="mb-8 rounded-lg border-2 border-blue-200 bg-blue-50 p-6">
          <h2 id="honesty-heading" className="text-xl font-bold text-blue-900">{t('ateMarijuana.honestySection.title')}</h2>
          <div className="mt-3 text-gray-700">
            <p><span dangerouslySetInnerHTML={{ __html: t('ateMarijuana.honestySection.content') }} /></p>
          </div>
        </section>

        <section aria-labelledby="risk-heading" className="mb-8">
          <h2 id="risk-heading" className="text-2xl font-bold text-gray-900">{t('shared.titles.riskAssessment')}</h2>
          <div className="mt-4 overflow-hidden rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">{riskHeaders.productType}</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">{riskHeaders.amountEaten}</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">{riskHeaders.riskLevel}</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">{riskHeaders.actionRequired}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {riskRows.map((row, idx) => (
                  <tr key={idx}>
                    <td className="px-4 py-3 text-sm text-gray-700">{row.productType}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{row.amountEaten}</td>
                    <td className={`px-4 py-3 text-sm font-semibold ${row.riskLevel === 'HIGH' ? 'text-red-600' : row.riskLevel === 'Moderate' ? 'text-orange-600' : 'text-orange-600'}`}>{row.riskLevel}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{row.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="immediate-steps" className="mb-8">
          <h2 id="immediate-steps" className="text-2xl font-bold text-gray-900">{t('shared.titles.whatToDo')}</h2>
          <ol className="mt-4 space-y-4">
            {steps.map((step, idx) => (
              <li key={idx} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-600 text-sm font-bold text-white">{idx + 1}</span>
                <div>
                  <h3 className="font-semibold text-gray-900">{step.title}</h3>
                  <p className="text-gray-700">{step.content}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="science-heading" className="mb-8">
          <h2 id="science-heading" className="text-2xl font-bold text-gray-900">{t('shared.titles.theScience')}</h2>
          <p className="mt-4 text-base text-gray-700">
            {t('ateMarijuana.science.content')}
          </p>
        </section>

        <section aria-labelledby="faq-heading" className="mb-8">
          <h2 id="faq-heading" className="text-2xl font-bold text-gray-900">{t('shared.titles.faq')}</h2>
          <div className="mt-4 space-y-4">
            {faqs.map((faq, idx) => (
              <details key={idx} className="group rounded-lg border border-gray-200 bg-white p-4">
                <summary className="cursor-pointer font-semibold text-gray-900">{faq.question}</summary>
                <div className="mt-3 border-t border-gray-100 pt-3">
                  <p className="text-base text-gray-700">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        <section aria-labelledby="related-heading" className="mb-8">
          <h2 id="related-heading" className="text-2xl font-bold text-gray-900">{t('shared.titles.relatedTools')}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {relatedTools.map((tool, idx) => (
              <a key={idx} href={tool.url} className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 transition-all hover:shadow-md hover:border-orange-500">
                <span className="text-base font-semibold text-gray-900">{tool.name}</span>
              </a>
            ))}
          </div>
        </section>

        <DisclaimerSection text={tCommon('disclaimer.emergency')} variant="emergency" />
      </article>
    </>
  );
}
