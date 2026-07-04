/**
 * ComparePage — Server Component
 * 对比页共享渲染组件。
 * 接收 i18n 加载后的数据 + section (dog/cat)，渲染文章结构。
 * 所有 UI 文本通过 props 传入，组件本身不包含硬编码字符串。
 */
import { CompareTable } from '@/components/shared/CompareTable';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { DisclaimerSection } from '@/components/shared/DisclaimerSection';
import Link from 'next/link';
import type { ReactNode } from 'react';

type ComparePros = { title: string; body: string };
type CompareFaq = { question: string; answer: string };

type CompareTopic = {
  name: string;
  pros: ComparePros[];
  cons: string[];
  bestFor: string;
};

type CompareRow = {
  dimension: string;
  topicA: string;
  topicB: string;
};

export type ComparePageData = {
  title: string;
  subtitle: string;
  topicAName: string;
  topicBName: string;
  topicA: CompareTopic;
  topicB: CompareTopic;
  rows: CompareRow[];
  verdict: string;
  faq: CompareFaq[];
  relatedTools?: { href: string; label: string }[];
};

type TranslateFn = (key: string, values?: Record<string, any>) => string;

type ComparePageProps = {
  data: ComparePageData;
  section: 'dog' | 'cat';
  /** next-intl translation function (server) */
  t: TranslateFn;
  /** Common namespace t for etc */
  tc: TranslateFn;
  /** Breadcrumb items (already translated) */
  breadcrumb: { label: string; href?: string }[];
  /** Optional warning banner key */
  warningKey?: string;
  /** Sources text (already formatted) */
  sourcesText: string;
  /** related tool labels (already translated) */
  relatedToolLabels: string[];
};

export function ComparePage({ data, section, t, tc, breadcrumb, warningKey, sourcesText, relatedToolLabels }: ComparePageProps) {
  const primaryColor = section === 'dog' ? '--dog-primary' : '--cat-primary';
  const surfaceColor = section === 'dog' ? '--dog-primary-light' : '--cat-primary-light';

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Breadcrumb items={breadcrumb} />
      </div>

      <article className="mx-auto max-w-4xl px-4 pb-16 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-[--gray-900] sm:text-4xl">
            {data.title}
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-[--gray-600]">
            {data.subtitle}
          </p>
          <p className="mt-2 text-sm text-[--gray-500]">
            {tc('lastUpdated', { date: 'July 2026', sources: sourcesText })}
          </p>
        </header>

        <div className="max-w-none">
          {warningKey && (
            <div className="not-prose mb-6 rounded-lg border border-[--status-caution] bg-[--status-caution-bg] p-4">
              <p className="flex items-start gap-2 text-sm font-medium text-[--status-caution]">
                <svg className="mt-0.5 h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                <span>{tc(warningKey)}</span>
              </p>
            </div>
          )}

          <h2 className="text-2xl font-bold text-[--gray-900]">{tc('quickComparison')}</h2>
          <p className="text-base text-[--gray-600]">
            <span dangerouslySetInnerHTML={{ __html: tc('atAGlance', { topicA: `<strong>${data.topicAName}</strong>`, topicB: `<strong>${data.topicBName}</strong>` }) }} />
          </p>

          <CompareTable
            topicAName={data.topicAName}
            topicBName={data.topicBName}
            rows={data.rows}
            section={section}
          />

          <h2 className="text-2xl font-bold text-[--gray-900]">{tc('deepDive', { topicName: data.topicAName })}</h2>
          {data.topicA.pros.map((pro) => (
            <div key={pro.title} className="mb-4">
              <h3 className="text-lg font-semibold text-[--status-safe]">{pro.title}</h3>
              <p className="text-base text-[--gray-700]">{pro.body}</p>
            </div>
          ))}
          <h3 className="text-lg font-semibold text-[--status-toxic]">{tc('considerations')}</h3>
          <ul className="list-disc space-y-2 pl-6 text-base text-[--gray-700]">
            {data.topicA.cons.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <p className="mt-3 text-base font-medium text-[--gray-800]">
            <strong>{tc('bestFor')}</strong> {data.topicA.bestFor}
          </p>

          <h2 className="text-2xl font-bold text-[--gray-900]">{tc('deepDive', { topicName: data.topicBName })}</h2>
          {data.topicB.pros.map((pro) => (
            <div key={pro.title} className="mb-4">
              <h3 className="text-lg font-semibold text-[--status-safe]">{pro.title}</h3>
              <p className="text-base text-[--gray-700]">{pro.body}</p>
            </div>
          ))}
          <h3 className="text-lg font-semibold text-[--status-toxic]">{tc('limitations')}</h3>
          <ul className="list-disc space-y-2 pl-6 text-base text-[--gray-700]">
            {data.topicB.cons.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <p className="mt-3 text-base font-medium text-[--gray-800]">
            <strong>{tc('bestFor')}</strong> {data.topicB.bestFor}
          </p>

          <h2 className="text-2xl font-bold text-[--gray-900]">{tc('theVerdict')}</h2>
          <div className={`rounded-lg border-l-4 bg-[${surfaceColor}] p-5`} style={{ borderLeftColor: `var(${primaryColor})` }}>
            <p
              className="text-base leading-relaxed text-[--gray-800]"
              dangerouslySetInnerHTML={{ __html: data.verdict }}
            />
          </div>

          <h2 className="text-2xl font-bold text-[--gray-900]">{tc('faq')}</h2>
          <div className="space-y-4">
            {data.faq.map((item, i) => (
              <details
                key={i}
                className="group rounded-lg border border-[--gray-200] bg-white p-4"
              >
                <summary className="cursor-pointer font-semibold text-[--gray-900]">
                  {item.question}
                </summary>
                <div className="mt-3 border-t border-[--gray-100] pt-3">
                  <p className="text-base leading-relaxed text-[--gray-700]">
                    {item.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>

          <div className="mt-12 rounded-xl border border-[--gray-200] bg-[--gray-50] p-6">
            <h2 className="text-xl font-bold text-[--gray-900]">{tc('references')}</h2>
            <ul className="mt-3 space-y-2 text-sm text-[--gray-600]">
              <li>
                <a href="https://www.aafco.org/" target="_blank" rel="noopener noreferrer" className="text-[--brand-teal] underline hover:text-[--brand-navy]">AAFCO Dog Food Nutrient Profiles</a>
              </li>
              <li>
                <a href="https://www.aaha.org/aaha-guidelines/life-stage-canine-2021/" target="_blank" rel="noopener noreferrer" className="text-[--brand-teal] underline hover:text-[--brand-navy]">AAHA Canine Life Stage Guidelines (2021)</a>
              </li>
              <li>
                <a href="https://wsava.org/global-guidelines/vaccination-guidelines/" target="_blank" rel="noopener noreferrer" className="text-[--brand-teal] underline hover:text-[--brand-navy]">WSAVA Global Veterinary Nutrition Guidelines</a>
              </li>
            </ul>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {(data.relatedTools || []).map((tool, idx) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="flex items-center gap-3 rounded-lg border border-[--gray-200] bg-white p-4 transition-all hover:shadow-md"
                style={{ '--tw-border-opacity': 1 } as React.CSSProperties}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.setProperty('border-color', `var(${primaryColor})`);
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.removeProperty('border-color');
                }}
              >
                <span className="text-base font-semibold text-[--gray-900]">
                  {relatedToolLabels[idx] || tool.label}
                </span>
                <svg className="ml-auto h-5 w-5" style={{ color: `var(${primaryColor})` }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            ))}
          </div>
        </div>

        <DisclaimerSection text={t('disclaimer.tool')} variant="tool" />
      </article>
    </>
  );
}
