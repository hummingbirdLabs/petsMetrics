import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SITE_URL } from '@/constants';
import { graphJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo/geo-meta';
import { generateToxicContactPointJsonLd } from '@/lib/seo/toxic-meta';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { DisclaimerSection } from '@/components/shared/DisclaimerSection';
import { JsonLdScript } from '@/components/shared/JsonLdScript';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'emergency' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const metaTitle = t('ateChocolate.meta.title');
  const metaDesc = t('ateChocolate.meta.description');
  const metaKw = t('ateChocolate.meta.keywords');
  const ogTitle = t('ateChocolate.article.ogTitle');
  const ogDesc = t('ateChocolate.article.ogDescription');

  return {
    title: metaTitle,
    description: metaDesc,
    keywords: metaKw,
    alternates: {
      canonical: `${SITE_URL}/${locale}/dog/emergency/ate-chocolate/`,
    },
    openGraph: {
      title: ogTitle,
      description: ogDesc,
      url: `${SITE_URL}/${locale}/dog/emergency/ate-chocolate/`,
      type: 'article',
      images: [{ url: `${SITE_URL}/og/home.webp`, width: 1200, height: 630, alt: ogTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDesc,
      images: [`${SITE_URL}/og/home.webp`],
    },
  };
}

export default async function DogAteChocolatePage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'emergency' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });

  const breadcrumbDog = t('shared.breadcrumb.dogEmergency');
  const breadcrumbItem = t('ateChocolate.breadcrumbLabel');
  const articleHeadline = t('ateChocolate.article.headline');
  const articleDesc = t('ateChocolate.article.description');

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: articleHeadline,
    description: articleDesc,
    author: { '@type': 'Organization', name: 'petsMetrics' },
    datePublished: '2026-07-03',
    dateModified: '2026-07-03',
    citation: [
      { '@type': 'CreativeWork', name: 'ASPCA Animal Poison Control Center', url: 'https://www.aspca.org/pet-care/animal-poison-control' },
      { '@type': 'CreativeWork', name: 'Pet Poison Helpline', url: 'https://www.petpoisonhelpline.com/' },
    ],
  };

  const faqs = t.raw('ateChocolate.faqs') as Array<{ question: string; answer: string }>;
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  const contactPointSchema = generateToxicContactPointJsonLd();
  const breadcrumbSchema = generateBreadcrumbJsonLd([
    { position: 1, name: t('shared.breadcrumb.home'), item: `${SITE_URL}/` },
    { position: 2, name: breadcrumbDog, item: `${SITE_URL}/dog/` },
    { position: 3, name: breadcrumbItem, item: '' },
  ]);

  const steps = t.raw('ateChocolate.steps') as Array<{ title: string; content?: string }>;
  const riskRows = t.raw('ateChocolate.riskAssessment.rows') as Array<{ type: string; level: string; risk: string }>;
  const relatedTools = t.raw('ateChocolate.relatedTools') as Array<{ name: string; url: string }>;

  return (
    <>
      <JsonLdScript data={graphJsonLd(articleSchema, faqSchema, breadcrumbSchema, contactPointSchema)} />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: t('shared.breadcrumb.home'), href: '' },
            { label: breadcrumbDog, href: 'dog' },
            { label: breadcrumbItem },
          ]}
        />
      </div>

      <article className="mx-auto max-w-4xl px-4 pb-16 sm:px-6 lg:px-8">
        <header className="mb-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-800">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            {t('ateChocolate.banner.severityLabel')}
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t('ateChocolate.banner.title')}
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            <span dangerouslySetInnerHTML={{ __html: t('ateChocolate.banner.subtitle') }} />
          </p>
        </header>

        <section aria-labelledby="immediate-steps" className="mb-8">
          <h2 id="immediate-steps" className="text-2xl font-bold text-gray-900">
            {t('shared.titles.whatToDo')}
          </h2>
          <ol className="mt-4 space-y-4">
            {steps.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white">{i + 1}</span>
                <div>
                  <h3 className="font-semibold text-gray-900">{step.title}</h3>
                  {step.content && <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: step.content }} />}
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="risk-assessment" className="mb-8">
          <h2 id="risk-assessment" className="text-2xl font-bold text-gray-900">
            {t('shared.titles.riskAssessment')}
          </h2>
          <div className="mt-4 overflow-hidden rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">{t('shared.labels.chocolateType')}</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">{t('ateChocolate.riskAssessment.headers.theobromine')}</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">{t('shared.labels.riskLevel')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {riskRows.map((row, i) => (
                  <tr key={i}>
                    <td className="px-4 py-3 text-sm text-gray-700">{row.type}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{row.level}</td>
                    <td className={`px-4 py-3 text-sm ${row.risk === 'Severe' ? 'font-semibold text-red-600' : row.risk === 'High' ? 'font-semibold text-red-600' : row.risk === 'Moderate' ? 'text-orange-600' : 'text-gray-700'}`}>{row.risk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="science-heading" className="mb-8">
          <h2 id="science-heading" className="text-2xl font-bold text-gray-900">
            {t('shared.titles.theScience')}
          </h2>
          <p className="mt-4 text-base text-gray-700">
            {t('ateChocolate.science.content')}
          </p>
        </section>

        <section aria-labelledby="faq-heading" className="mb-8">
          <h2 id="faq-heading" className="text-2xl font-bold text-gray-900">
            {t('shared.titles.faq')}
          </h2>
          <div className="mt-4 space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group rounded-lg border border-gray-200 bg-white p-4">
                <summary className="cursor-pointer font-semibold text-gray-900">{faq.question}</summary>
                <div className="mt-3 border-t border-gray-100 pt-3">
                  <p className="text-base text-gray-700">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        <section aria-labelledby="related-heading" className="mb-8">
          <h2 id="related-heading" className="text-2xl font-bold text-gray-900">
            {t('shared.titles.relatedTools')}
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {relatedTools.map((tool, i) => (
              <a key={i} href={tool.url} className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 transition-all hover:shadow-md hover:border-red-500">
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
