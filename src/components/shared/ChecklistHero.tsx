interface ChecklistHeroProps {
  title: string;
  subtitle: string;
  species: 'dog' | 'cat';
  lifeStage: string;
  estimatedCost?: { min: number; max: number; currency: string; timeframe: string };
  ctaText?: string;
  ctaAction?: string;
  keyStats: { label: string; value: string }[];
}

export function ChecklistHero({
  title,
  subtitle,
  species,
  lifeStage,
  estimatedCost,
  ctaText,
  keyStats,
}: ChecklistHeroProps) {
  const speciesColor = species === 'dog' ? '[--dog-primary]' : '[--cat-primary]';
  const speciesBg = species === 'dog' ? 'bg-[--dog-light]' : 'bg-[--cat-light]';

  return (
    <section className={`relative overflow-hidden rounded-2xl ${speciesBg} p-8 sm:p-10`}>
      <div className="relative z-10">
        <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide text-${speciesColor} bg-white/80`}>
          {lifeStage} Checklist
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-[--gray-900] sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-base text-[--gray-600] leading-relaxed">
          {subtitle}
        </p>

        {estimatedCost && (
          <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white/70 px-4 py-2">
            <span className="text-sm text-[--gray-500]">Estimated Cost:</span>
            <span className="font-semibold text-[--gray-900]">
              ${estimatedCost.min.toLocaleString()} - ${estimatedCost.max.toLocaleString()} {estimatedCost.currency}
            </span>
            <span className="text-sm text-[--gray-500]">({estimatedCost.timeframe})</span>
          </div>
        )}

        {ctaText && (
          <div className="mt-6">
            <button
              type="button"
              className={`inline-flex items-center rounded-lg px-6 py-3 text-sm font-semibold text-white bg-${speciesColor} hover:opacity-90 transition-opacity shadow-sm`}
            >
              {ctaText}
            </button>
          </div>
        )}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {keyStats.map((stat) => (
          <div key={stat.label} className="rounded-xl bg-white/80 p-4 text-center backdrop-blur-sm">
            <div className={`text-2xl font-bold text-${speciesColor}`}>{stat.value}</div>
            <div className="mt-1 text-xs text-[--gray-500]">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
