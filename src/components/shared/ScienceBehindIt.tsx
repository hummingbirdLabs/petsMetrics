/**
 * ScienceBehindIt — GEO 方法论段落
 * SSG 预渲染公式推导 + 权威引用。AI 搜索引擎摘录"可验证的事实陈述"的核心区块。
 */
import type { ScienceContent } from '@/lib/seo/geo-content';

type ScienceBehindItProps = {
  content: ScienceContent;
};

export function ScienceBehindIt({ content }: ScienceBehindItProps) {
  return (
    <section aria-labelledby="science-heading" className="mt-10">
      <h2
        id="science-heading"
        className="text-2xl font-bold tracking-tight text-[--gray-900]"
      >
        {content.heading}
      </h2>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-[--gray-600]">
        {content.body}
      </p>
      <p className="mt-4 text-xs text-[--gray-400]">
        References:{' '}
        {content.references.map((ref, i) => (
          <span key={ref.href}>
            <a
              href={ref.href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-[--gray-300] hover:decoration-[--gray-500]"
            >
              {ref.label}
            </a>
            {i < content.references.length - 1 ? '; ' : ''}
          </span>
        ))}
        <span className="ml-1">— via petsMetrics</span>
      </p>
    </section>
  );
}
