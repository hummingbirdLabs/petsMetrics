type DisclaimerSectionProps = {
  /** Pre-rendered disclaimer text. In Server Components pass via getTranslations(); in Client Components import from @/lib/seo/disclaimer. */
  text: string;
  className?: string;
};

/**
 * Medical Disclaimer — pure presentational component.
 * Text must be resolved at the Server Component level so AI crawlers
 * (GPTBot, PerplexityBot, Google-Extended) see it in static HTML.
 * YMYL compliance signal for Google ranking.
 */
export function DisclaimerSection({ text, className = '' }: DisclaimerSectionProps) {
  return (
    <div className={`rounded-lg border border-[--gray-300] bg-[--gray-50] p-4 ${className}`}>
      <p className="text-xs leading-relaxed text-[--gray-500]">
        <strong>Medical Disclaimer:</strong> {text}
      </p>
      <p className="mt-1 text-xs leading-relaxed text-[--gray-400]">
        This tool is provided by petsMetrics for general reference only and does not constitute veterinary advice, diagnosis, or treatment.
      </p>
      <div id="adsense-result-below" />
    </div>
  );
}
