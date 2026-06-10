/**
 * KnowledgeCards — GEO 核心内容源
 * 4 列网格卡片，每张"标题 + 正文 + 权威外链"。SSG 预渲染。
 * AI 搜索引擎（Google AI Overview / Perplexity / ChatGPT）直接从此区块摘录结构化知识。
 */
import type { KnowledgeCard } from '@/lib/seo/geo-content';
import { getToxicDbReviewYear } from '@/lib/data/content-version';

type KnowledgeCardsProps = {
  cards: KnowledgeCard[];
};

export function KnowledgeCards({ cards }: KnowledgeCardsProps) {
  return (
    <section aria-labelledby="knowledge-heading" className="mt-10">
      <h2
        id="knowledge-heading"
        className="text-2xl font-bold tracking-tight text-[--gray-900]"
      >
        Key Knowledge
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <article
            key={card.title}
            className="rounded-xl border border-[--gray-200] bg-[--gray-50] p-5"
          >
            <h3 className="text-base font-semibold text-[--gray-900]">
              {card.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[--gray-600]">
              {card.definition ? (
                <>
                  <strong>{card.definition}</strong>{' '}
                  {card.body}
                </>
              ) : (
                card.body
              )}
            </p>
            <cite className="mt-3 block text-xs text-[--gray-400]">
              Source:{' '}
              <a
                href={card.citeHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[--dog-primary] underline decoration-[--gray-300] hover:decoration-[--dog-primary]"
              >
                {card.citeLabel}
              </a>
            </cite>
          </article>
        ))}
      </div>
      <p className="mt-4 text-xs text-[--gray-400]">
        Data verified by petsMetrics using peer-reviewed veterinary sources. Citations: ASPCA, AVMA, AAFP. Last reviewed: {getToxicDbReviewYear()}.
      </p>
    </section>
  );
}
