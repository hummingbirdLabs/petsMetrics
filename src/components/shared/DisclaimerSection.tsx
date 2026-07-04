type DisclaimerVariant = 'tool' | 'toxic' | 'emergency';

type DisclaimerSectionProps = {
  /** Pre-rendered disclaimer text. In Server Components pass via getTranslations(); in Client Components import from @/lib/seo/disclaimer. */
  text: string;
  /** Visual variant matching geo-checklist §5: tool (amber) / toxic (red) / emergency (red bold) */
  variant?: DisclaimerVariant;
  className?: string;
  /** Optional translated strings. If not provided, falls back to English defaults. */
  translations?: {
    prefix: string;
    ariaLabel: string;
    body: string;
  };
};

const variantConfig: Record<DisclaimerVariant, { border: string; bg: string; text: string }> = {
  tool: {
    border: 'border-amber-200',
    bg: 'bg-amber-50/80',
    text: 'text-amber-900',
  },
  toxic: {
    border: 'border-red-200',
    bg: 'bg-red-50/80',
    text: 'text-red-900',
  },
  emergency: {
    border: 'border-red-500',
    bg: 'bg-red-100',
    text: 'text-red-950 font-medium',
  },
};

const defaults = {
  prefix: {
    tool: 'Medical Disclaimer:',
    toxic: 'Medical Disclaimer:',
    emergency: 'EMERGENCY — Medical Disclaimer:',
  },
  ariaLabel: 'Medical Disclaimer',
  body: 'This tool is provided by petsMetrics for general reference only and does not constitute veterinary advice, diagnosis, or treatment.',
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
export function DisclaimerSection({ text, variant = 'tool', className = '', translations }: DisclaimerSectionProps) {
  const cfg = variantConfig[variant];
  const prefix = translations?.prefix ?? defaults.prefix[variant];
  const ariaLabel = translations?.ariaLabel ?? defaults.ariaLabel;
  const body = translations?.body ?? defaults.body;

  return (
    <aside
      role="note"
      aria-label={ariaLabel}
      className={`rounded-lg border p-4 text-sm ${cfg.border} ${cfg.bg} ${cfg.text} ${className}`}
    >
      <p className="leading-relaxed">
        <strong>{prefix}</strong> {text}
      </p>
      <p className="mt-1 leading-relaxed opacity-80">
        {body}
      </p>
      <div id="adsense-result-below" />
    </aside>
  );
}
