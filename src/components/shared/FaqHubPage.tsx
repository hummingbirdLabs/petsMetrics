/**
 * FaqHubPage — Server Component
 * FAQ 聚合 Hub 页共享渲染组件。
 * 接收 hubKey 和页面配置，从 faq-hub-data.ts 获取数据，
 * 渲染结构化的 FAQ 聚合页，含 JSON-LD FAQPage。
 */
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { DisclaimerSection } from '@/components/shared/DisclaimerSection';
import { generateBreadcrumbJsonLd } from '@/lib/seo/geo-meta';
import { generateFaqPageJsonLd } from '@/lib/seo/geo-faq';
import { FAQ_HUB_DATA, flattenHubFaqs, type FaqHubKey } from '@/lib/seo/faq-hub-data';
import { SITE_URL } from '@/constants';
import { JsonLdScript } from '@/components/shared/JsonLdScript';
import Link from 'next/link';
import type { TranslationValues } from 'next-intl';

type TranslateFn = (key: string, values?: TranslationValues) => string;

type FaqHubPageProps = {
  hubKey: FaqHubKey;
  locale: string;
  /** Breadcrumb items (already translated) */
  breadcrumb: { label: string; href?: string }[];
  /** next-intl translation function */
  tc: TranslateFn;
};

export function FaqHubPage({ hubKey, locale, breadcrumb, tc }: FaqHubPageProps) {
  const hub = FAQ_HUB_DATA[hubKey];
  const allFaqs = flattenHubFaqs(hubKey);

  const faqSchema = generateFaqPageJsonLd(allFaqs);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: hub.title,
    description: hub.description,
    author: { '@type': 'Organization', name: 'petsMetrics' },
    datePublished: '2026-07-03',
    dateModified: '2026-07-03',
    citation: hub.citations.map((c) => ({
      '@type': 'CreativeWork',
      name: c.name,
      url: c.url,
    })),
  };

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
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {hub.title}
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-gray-600">
            {hub.description}
          </p>
          <p className="mt-2 text-sm text-gray-500">
            {tc('lastUpdated', { date: 'July 2026', sources: 'AAFCO, AAHA, WSAVA, AAFP, ASPCA' })}
          </p>
        </header>

        <div className="mb-8 rounded-lg border-l-4 border-blue-500 bg-blue-50 p-5">
          <p className="text-sm text-gray-700">
            <strong className="text-gray-900">{tc('overview', { count: String(allFaqs.length) })}</strong>{' '}
            {tc('overviewDetail')}
          </p>
        </div>

        {/* Table of Contents */}
        <nav aria-label="FAQ sections" className="mb-10 rounded-lg border border-gray-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-gray-900">{tc('toc')}</h2>
          <ol className="mt-3 space-y-2 text-sm">
            {hub.sections.map((section, idx) => (
              <li key={section.sourceHref}>
                <a
                  href={`#section-${idx}`}
                  className="text-blue-600 hover:underline"
                >
                  {section.sourceName} <span className="text-gray-500">({section.faqs.length} {tc('questions')})</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* FAQ Sections */}
        <div className="space-y-10">
          {hub.sections.map((section, sectionIdx) => (
            <section key={section.sourceHref} id={`section-${sectionIdx}`}>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  {section.sourceName}
                </h2>
                <Link
                  href={`/${locale}${section.sourceHref}`}
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  {tc('goToTool', { tool: section.sourceName })} →
                </Link>
              </div>

              <div className="space-y-3">
                {section.faqs.map((faq, faqIdx) => (
                  <details
                    key={faqIdx}
                    className="group rounded-lg border border-gray-200 bg-white p-4"
                  >
                    <summary className="cursor-pointer font-semibold text-gray-900 hover:text-blue-600">
                      {faq.question}
                    </summary>
                    <div className="mt-3 border-t border-gray-100 pt-3">
                      <p className="text-base leading-relaxed text-gray-700">
                        {faq.answer}
                      </p>
                      <p className="mt-2 text-xs text-gray-500">
                        {tc('source')}: <Link href={`/${locale}${section.sourceHref}`} className="text-blue-500 hover:underline">{section.sourceName}</Link>
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Related Tools */}
        <section className="mt-12 rounded-xl border border-gray-200 bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">{tc('relatedTools')}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {hub.relatedTools.map((tool) => (
              <Link
                key={tool.href}
                href={`/${locale}${tool.href}`}
                className="flex flex-col gap-2 rounded-lg border border-gray-200 bg-white p-4 transition-all hover:shadow-md hover:border-blue-400"
              >
                <span className="text-base font-semibold text-gray-900">
                  {tool.name}
                </span>
                <span className="text-sm text-gray-600">{tool.description}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* References */}
        <section className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">{tc('references')}</h2>
          <ul className="mt-3 space-y-2 text-sm text-gray-600">
            {hub.citations.map((citation) => (
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

        {/* Additional E-E-A-T content */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-gray-900">{tc('whyTrust')}</h2>
          <div className="mt-4 space-y-4 text-base leading-relaxed text-gray-700">
            <p>
              {tc('trustContent1')}
            </p>
            <p>
              {tc('trustContent2')}
            </p>
          </div>
        </section>

        <DisclaimerSection text={tc('disclaimer')} variant="tool" />
      </article>
    </>
  );
}
