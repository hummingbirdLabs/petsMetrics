/**
 * ToolCtaSection — Zero-Click CT Hooks (GEO P1-1)
 *
 * Converts pure-information-query visitors into tool users.
 * Placed below Knowledge Cards / ScienceBehindIt on tool pages
 * and toxic landing pages. SSG pre-rendered for AI crawler visibility.
 *
 * Per geo-checklist §11.3: every information-query page must have
 * a "next step" hook that guides the user from a zero-click answer
 * to an interactive tool.
 */
import Link from 'next/link';
import { useTranslations } from 'next-intl';

type ToolCtaSectionProps = {
  /** Main CTA heading — should contain a benefit-oriented verb */
  heading: string;
  /** Descriptive text that bridges the information on the page to the tool */
  description: string;
  /** Target tool route (e.g., "/dog/calorie-calculator/") */
  href: string;
  /** Button label (e.g., "Calculate Your Dog's Due Date →") */
  buttonLabel: string;
  className?: string;
};

export function ToolCtaSection({ heading, description, href, buttonLabel, className = '' }: ToolCtaSectionProps) {
  const t = useTranslations('common');
  return (
    <section
      aria-label={t('toolCtaAriaLabel')}
      className={`rounded-xl border-2 border-dashed border-[--dog-primary] bg-gradient-to-br from-[--dog-primary-light] to-white p-6 sm:p-8 ${className}`}
    >
      <h2 className="text-xl font-bold tracking-tight text-[--gray-900]">
        {heading}
      </h2>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-[--gray-600]">
        {description}
      </p>
      <Link
        href={href}
        className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[--dog-primary] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[--dog-primary-dark]"
      >
        {buttonLabel}
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </Link>
    </section>
  );
}
