/**
 * SeasonalDangerPage — Server Component
 * 季节性安全专题页共享渲染组件。
 * 从 i18n messages 的 seasonal 命名空间读取数据，支持全 12 语种。
 */
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { DisclaimerSection } from '@/components/shared/DisclaimerSection';
import { generateBreadcrumbJsonLd } from '@/lib/seo/geo-meta';
import { generateFaqPageJsonLd } from '@/lib/seo/geo-faq';
import { SITE_URL } from '@/constants';
import { JsonLdScript } from '@/components/shared/JsonLdScript';
import Link from 'next/link';
import type { TranslationValues } from 'next-intl';

type TranslateFn = (key: string, values?: TranslationValues) => string;

type KnowledgeCard = { title: string; body: string };
type FirstAidStep = { title: string; content: string };
type FaqItem = { question: string; answer: string };
type RelatedTool = { name: string; href: string; description: string };
type Citation = { name: string; url: string };

export type SeasonalEntry = {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  severity: string;
  season: string;
  knowledgeCards: KnowledgeCard[];
  prevention: string[];
  symptoms: string[];
  firstAid: FirstAidStep[];
  relatedEmergency: string;
  faqs: FaqItem[];
  relatedTools: RelatedTool[];
  citations: Citation[];
  bodyParagraphs: string[];
};

type SeasonalDangerPageProps = {
  slug: string;
  locale: string;
  breadcrumb: { label: string; href?: string }[];
  tc: TranslateFn;
  /** The seasonal data entry from i18n messages */
  data: SeasonalEntry;
};

export function SeasonalDangerPage({ slug, locale, breadcrumb, tc, data }: SeasonalDangerPageProps) {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.title,
    description: data.description,
    keywords: data.keywords.join(', '),
    author: { '@type': 'Organization', name: 'petsMetrics' },
    datePublished: '2026-07-05',
    dateModified: '2026-07-05',
    citation: data.citations.map((c) => ({
      '@type': 'CreativeWork',
      name: c.name,
      url: c.url,
    })),
  };

  const faqSchema = generateFaqPageJsonLd(data.faqs);

  const breadcrumbSchema = generateBreadcrumbJsonLd([
    { position: 1, name: 'Home', item: `${SITE_URL}/` },
    ...breadcrumb.map((item, idx) => ({
      position: idx + 2,
      name: item.label,
      item: item.href ? `${SITE_URL}/${locale}/${item.href}/` : '',
    })),
  ]);

  return (
    <>
      <JsonLdScript data={{ '@context': 'https://schema.org', '@graph': [articleSchema, faqSchema, breadcrumbSchema] }} />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Breadcrumb items={breadcrumb} />
      </div>

      <article className="mx-auto max-w-4xl px-4 pb-16 sm:px-6 lg:px-8">
        <header className="mb-8">
          <div className="mb-3 flex items-center gap-2">
            <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${getSeverityClass(data.severity)}`}>
              {data.severity}
            </span>
            <span className="text-sm text-gray-500">{data.season}</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {data.title}
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-gray-600">
            {data.description}
          </p>
          <p className="mt-2 text-sm text-gray-500">
            {tc('lastUpdated', { date: 'July 2026', sources: 'ASPCA, AVMA, AAHA, AKC' })}
          </p>
        </header>

        {/* Knowledge Cards */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900">{tc('knowledgeCards')}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {data.knowledgeCards.map((card, idx) => (
              <div key={idx} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <h3 className="text-base font-semibold text-gray-900">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-700">{card.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Body paragraphs (E-E-A-T) */}
        <section className="mb-10 space-y-4">
          {data.bodyParagraphs.map((para, idx) => (
            <p key={idx} className="text-base leading-relaxed text-gray-700">{para}</p>
          ))}
        </section>

        {/* Prevention */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900">{tc('prevention')}</h2>
          <ul className="mt-4 space-y-2">
            {data.prevention.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-base text-gray-700">
                <svg className="mt-0.5 h-5 w-5 shrink-0 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Symptoms */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900">{tc('symptoms')}</h2>
          <ul className="mt-4 space-y-2">
            {data.symptoms.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-base text-gray-700">
                <svg className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* First Aid */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900">{tc('firstAid')}</h2>
          <div className="mt-4 space-y-4">
            {data.firstAid.map((step, idx) => (
              <div key={idx} className="rounded-lg border-l-4 border-red-500 bg-red-50 p-4">
                <h3 className="text-base font-semibold text-red-900">{step.title}</h3>
                <p className="mt-1 text-sm text-gray-700">{step.content}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Emergency Link */}
        <section className="mb-10">
          <div className="rounded-lg border border-red-200 bg-red-50 p-5">
            <h3 className="text-base font-semibold text-red-900">{tc('emergencyLink')}</h3>
            <p className="mt-2 text-sm text-gray-700">{tc('emergencyLinkDesc')}</p>
            <Link
              href={`/${locale}${data.relatedEmergency}`}
              className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-red-700 hover:underline"
            >
              {tc('goToEmergency')} →
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900">{tc('faqs')}</h2>
          <div className="mt-4 space-y-3">
            {data.faqs.map((item, idx) => (
              <details
                key={idx}
                className="group rounded-lg border border-gray-200 bg-white p-4"
              >
                <summary className="cursor-pointer font-semibold text-gray-900">
                  {item.question}
                </summary>
                <div className="mt-3 border-t border-gray-100 pt-3">
                  <p className="text-base leading-relaxed text-gray-700">{item.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Related Tools */}
        <section className="mt-12 rounded-xl border border-gray-200 bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">{tc('relatedTools')}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {data.relatedTools.map((tool) => (
              <Link
                key={tool.href}
                href={`/${locale}${tool.href}`}
                className="flex flex-col gap-2 rounded-lg border border-gray-200 bg-white p-4 transition-all hover:shadow-md hover:border-blue-400"
              >
                <span className="text-base font-semibold text-gray-900">{tool.name}</span>
                <span className="text-sm text-gray-600">{tool.description}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* References */}
        <section className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">{tc('references')}</h2>
          <ul className="mt-3 space-y-2 text-sm text-gray-600">
            {data.citations.map((citation) => (
              <li key={citation.url}>
                <a
                  href={citation.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  {citation.name}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <DisclaimerSection text={tc('disclaimer')} variant="tool" />
      </article>
    </>
  );
}

function getSeverityClass(severity: string): string {
  if (severity.includes('CRITICAL') || severity.includes('致命') || severity.includes('CRITIQUE') || severity.includes('KRITISCH') || severity.includes('حرج')) return 'bg-red-100 text-red-800';
  if (severity.includes('HIGH') || severity.includes('高') || severity.includes('ÉLEVÉ') || severity.includes('HOHES') || severity.includes('مرتفع')) return 'bg-orange-100 text-orange-800';
  if (severity.includes('CHRONIC') || severity.includes('慢性') || severity.includes('CHRONIQUE') || severity.includes('CHRONISCH') || severity.includes('مزمن')) return 'bg-amber-100 text-amber-800';
  return 'bg-yellow-100 text-yellow-800';
}