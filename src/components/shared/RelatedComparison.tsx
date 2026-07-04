/**
 * RelatedComparison — Server Component
 * 工具页底部的相关对比文章链接区块。
 * 接收标题、描述、链接和主题色。
 */
import Link from 'next/link';

type RelatedComparisonProps = {
  title: string;
  description: string;
  href: string;
  sourcesText: string;
  section: 'dog' | 'cat';
  /** i18n strings */
  t: {
    heading: string;
    readComparison: string;
  };
};

export function RelatedComparison({ title, description, href, sourcesText, section, t }: RelatedComparisonProps) {
  const accentColor = section === 'dog' ? '--dog-primary' : '--cat-primary';
  const surfaceColor = section === 'dog' ? '--dog-primary-light' : '--cat-primary-light';

  return (
    <section className="mt-12 rounded-xl border border-[--gray-200] bg-[--gray-50] p-6">
      <h2 className="text-lg font-semibold text-[--gray-900]">{t.heading}</h2>
      <div className="mt-4 rounded-lg border border-[--gray-200] bg-white p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex-1">
            <h3 className="font-display text-base font-semibold text-[--gray-900]">
              {title}
            </h3>
            <span className="mt-1 inline-block rounded-full bg-[{surfaceColor}] px-2.5 py-0.5 text-xs font-semibold" style={{ color: `var(${accentColor})`, backgroundColor: `var(${surfaceColor})` }}>
              {sourcesText}
            </span>
            <p className="mt-2 text-sm leading-relaxed text-[--gray-600]">
              {description}
            </p>
          </div>
          <Link
            href={href}
            className="flex-shrink-0 self-start rounded-lg px-4 py-2 text-sm font-semibold text-white transition-colors hover:opacity-90"
            style={{ backgroundColor: `var(${accentColor})` }}
          >
            {t.readComparison} →
          </Link>
        </div>
      </div>
    </section>
  );
}
