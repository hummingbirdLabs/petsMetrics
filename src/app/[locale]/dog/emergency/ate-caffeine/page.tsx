// i18n: emergency.ateCaffeine
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
  const metaTitle = t('ateCaffeine.meta.title');
  const metaDesc = t('ateCaffeine.meta.description');
  const metaKw = t('ateCaffeine.meta.keywords');
  const ogTitle = t('ateCaffeine.article.ogTitle');
  const ogDesc = t('ateCaffeine.article.ogDescription');

  return {
    title: metaTitle,
    description: metaDesc,
    keywords: metaKw,
    alternates: {
      canonical: `${SITE_URL}/${locale}/dog/emergency/ate-caffeine/`,
    },
    openGraph: {
      title: ogTitle,
      description: ogDesc,
      url: `${SITE_URL}/${locale}/dog/emergency/ate-caffeine/`,
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

export default async function DogAteCaffeinePage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'emergency' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });

  const breadcrumbDog = t('shared.breadcrumb.dogEmergency');
  const breadcrumbItem = t('ateCaffeine.breadcrumbLabel');
  const articleHeadline = t('ateCaffeine.article.headline');
  const articleDesc = t('ateCaffeine.article.description');

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

  const faqs = t.raw('ateCaffeine.faqs') as Array<{ question: string; answer: string }>;
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

  const rows = t.raw('ateCaffeine.riskAssessment.rows') as Array<{ form: string; amount: string; risk: string; action: string }>;
  const steps = t.raw('ateCaffeine.steps') as Array<{ title: string; content?: string; items?: string[] }>;
  const timeline = t.raw('ateCaffeine.timeline') as Array<{ time: string; color: string; description: string }>;
  const relatedTools = t.raw('ateCaffeine.relatedTools') as Array<{ name: string; url: string }>;

  const vetDecisionEmergency = t.raw('ateCaffeine.vetDecision.emergency') as unknown as string[];
  const vetDecisionUrgent = t.raw('ateCaffeine.vetDecision.urgent') as unknown as string[];
  const vetDecisionMonitor = t.raw('ateCaffeine.vetDecision.monitor') as unknown as string[];

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
            {t('ateCaffeine.banner.severityLabel')}
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t('ateCaffeine.banner.title')}
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            <span dangerouslySetInnerHTML={{ __html: t('ateCaffeine.banner.subtitle') }} />
          </p>
        </header>

        <section aria-labelledby="risk-heading" className="mb-8">
          <h2 id="risk-heading" className="text-2xl font-bold text-gray-900">
            {t('shared.titles.riskAssessment')}
          </h2>
          <div className="mt-4 overflow-hidden rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">{t('ateCaffeine.riskAssessment.formHeader')}</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">{t('shared.labels.amountEaten')}</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">{t('shared.labels.riskLevel')}</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">{t('shared.labels.actionRequired')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {rows.map((row, i) => (
                  <tr key={i}>
                    <td className="px-4 py-3 text-sm text-gray-700">{row.form}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{row.amount}</td>
                    <td className={`px-4 py-3 text-sm font-semibold ${row.risk.toLowerCase() === 'high' ? 'text-red-600' : row.risk === 'Moderate' ? 'text-orange-600' : 'text-yellow-600'}`}>{row.risk}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{row.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

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
                  {step.items && (
                    <ul className="mt-2 list-disc pl-5 text-gray-700 space-y-1">
                      {step.items.map((item, j) => <li key={j} dangerouslySetInnerHTML={{ __html: item }} />)}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="science-heading" className="mb-8">
          <h2 id="science-heading" className="text-2xl font-bold text-gray-900">
            {t('shared.titles.theScience')}
          </h2>
          <p className="mt-4 text-base text-gray-700">
            {t('ateCaffeine.science.content')}
          </p>
        </section>

        <section aria-labelledby="toxicology-heading" className="mb-8">
          <h2 id="toxicology-heading" className="text-2xl font-bold text-gray-900">
            {t('shared.titles.toxicDose')}
          </h2>
          <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-6">
            <p className="text-sm text-gray-700">
              <strong>{t('shared.labels.amountEaten')}:</strong> {t('ateCaffeine.toxicityData.minimum')}
              <br />
              <strong>LD50:</strong> {t('ateCaffeine.toxicityData.ld50')}
              <br />
              <strong>{t('shared.titles.theScience')}:</strong> {t('ateCaffeine.toxicityData.source')}
            </p>
            <p className="mt-3 text-sm text-gray-600">
              {t('ateCaffeine.toxicityData.example')}
            </p>
          </div>
        </section>

        <section aria-labelledby="symptoms-heading" className="mb-8">
          <h2 id="symptoms-heading" className="text-2xl font-bold text-gray-900">
            {t('shared.titles.symptomTimeline')}
          </h2>
          <div className="mt-4 space-y-3">
            {timeline.map((entry, i) => (
              <div key={i} className="flex gap-3">
                <span className={`shrink-0 rounded px-2 py-1 text-xs font-semibold ${entry.color === 'green' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>{entry.time}</span>
                <p className="text-gray-700">{entry.description}</p>
              </div>
            ))}
          </div>
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

        <section aria-labelledby="vet-decision-heading" className="mb-8">
          <h2 id="vet-decision-heading" className="text-2xl font-bold text-gray-900">
            {t('shared.vetDecision.title')}
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border-2 border-red-200 bg-red-50 p-4">
              <h3 className="font-bold text-red-800">{t('shared.vetDecision.emergencyTitle')}</h3>
              <ul className="mt-2 list-disc pl-5 text-sm text-gray-700 space-y-1">
                {vetDecisionEmergency.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
            <div className="rounded-lg border-2 border-orange-200 bg-orange-50 p-4">
              <h3 className="font-bold text-orange-800">{t('shared.vetDecision.urgentTitle')}</h3>
              <ul className="mt-2 list-disc pl-5 text-sm text-gray-700 space-y-1">
                {vetDecisionUrgent.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
            <div className="rounded-lg border-2 border-yellow-200 bg-yellow-50 p-4">
              <h3 className="font-bold text-yellow-800">{t('shared.vetDecision.monitorTitle')}</h3>
              <ul className="mt-2 list-disc pl-5 text-sm text-gray-700 space-y-1">
                {vetDecisionMonitor.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
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
