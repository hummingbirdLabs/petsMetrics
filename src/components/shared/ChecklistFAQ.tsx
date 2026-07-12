import { JsonLdScript } from './JsonLdScript';
import { useTranslations } from 'next-intl';

interface FAQItem {
  question: string;
  answer: string;
}

interface ChecklistFAQProps {
  title?: string;
  faqs: FAQItem[];
  jsonLdType?: 'FAQPage' | 'none';
}

function generateFaqJsonLd(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function ChecklistFAQ({
  title,
  faqs,
  jsonLdType = 'FAQPage',
}: ChecklistFAQProps) {
  const t = useTranslations('common');
  const displayTitle = title || t('faqHeading');
  return (
    <section aria-labelledby="faq-heading" className="mt-10">
      {jsonLdType === 'FAQPage' && <JsonLdScript data={generateFaqJsonLd(faqs)} />}
      <h2 id="faq-heading" className="text-2xl font-bold tracking-tight text-[--gray-900]">
        {displayTitle}
      </h2>

      <div className="mt-6 space-y-3">
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="group rounded-xl border border-[--gray-200] bg-white open:bg-[--gray-50] transition-colors"
          >
            <summary className="flex cursor-pointer items-center justify-between p-5 text-base font-medium text-[--gray-900] hover:text-[--gray-700]">
              {faq.question}
              <span className="ml-4 flex-shrink-0 text-[--gray-400] transition-transform group-open:rotate-180">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </summary>
            <div className="px-5 pb-5 text-sm leading-relaxed text-[--gray-600]">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
