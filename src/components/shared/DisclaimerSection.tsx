type DisclaimerVariant = 'tool' | 'toxic' | 'emergency';

type DisclaimerSectionProps = {
  /** Pre-rendered disclaimer text. In Server Components pass via getTranslations(); in Client Components import from @/lib/seo/disclaimer. */
  text: string;
  /** Visual variant matching geo-checklist §5: tool (amber) / toxic (red) / emergency (red bold) */
  variant?: DisclaimerVariant;
  className?: string;
};

const variantConfig: Record<DisclaimerVariant, { border: string; bg: string; text: string; prefix: string }> = {
  tool: {
    border: 'border-amber-200',
    bg: 'bg-amber-50/80',
    text: 'text-amber-900',
    prefix: 'Medical Disclaimer:',
  },
  toxic: {
    border: 'border-red-200',
    bg: 'bg-red-50/80',
    text: 'text-red-900',
    prefix: 'Medical Disclaimer:',
  },
  emergency: {
    border: 'border-red-500',
    bg: 'bg-red-100',
    text: 'text-red-950 font-medium',
    prefix: 'EMERGENCY — Medical Disclaimer:',
  },
};

/**
 * Medical Disclaimer — Server Component (no 'use client').
 * Text resolved at the Server Component level so AI crawlers
 * (GPTBot, PerplexityBot, Google-Extended) see it in static HTML.
 * YMYL compliance signal for Google ranking.
 *
 * Per seo-programmatic-aicode.md TASK-R3, all tool/toxic pages MUST use
 * this shared component rather than manually pasting disclaimer text.
 */
export function DisclaimerSection({ text, variant = 'tool', className = '' }: DisclaimerSectionProps) {
  const cfg = variantConfig[variant];
  return (
    <aside
      role="note"
      aria-label="Medical Disclaimer"
      className={`rounded-lg border p-4 text-sm ${cfg.border} ${cfg.bg} ${cfg.text} ${className}`}
    >
      <p className="leading-relaxed">
        <strong>{cfg.prefix}</strong> {text}
      </p>
      <p className="mt-1 leading-relaxed opacity-80">
        This tool is provided by petsMetrics for general reference only and does not constitute veterinary advice, diagnosis, or treatment.
      </p>
      <div id="adsense-result-below" />
    </aside>
  );
}
