interface MistakeCard {
  title: string;
  whyDangerous: string;
  doInstead: string;
}

interface CommonMistakesProps {
  title?: string;
  mistakes: MistakeCard[];
  species?: 'dog' | 'cat';
}

export function CommonMistakes({
  title = '⚠️ Common Mistakes to Avoid',
  mistakes,
  species = 'dog',
}: CommonMistakesProps) {
  const speciesColor = species === 'dog' ? '[--dog-primary]' : '[--cat-primary]';

  return (
    <section aria-labelledby="mistakes-heading" className="mt-10">
      <h2 id="mistakes-heading" className="text-2xl font-bold tracking-tight text-[--gray-900]">
        {title}
      </h2>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mistakes.map((mistake, index) => (
          <div
            key={index}
            className="rounded-xl border border-red-100 bg-red-50/50 p-5"
          >
            <h3 className="text-sm font-semibold text-[--gray-900]">{mistake.title}</h3>
            <p className="mt-2 text-sm text-[--gray-600]">
              <span className="font-medium text-red-600">Why it&apos;s dangerous:</span>{' '}
              {mistake.whyDangerous}
            </p>
            <p className="mt-2 text-sm text-[--gray-600]">
              <span className={`font-medium text-${speciesColor}`}>What to do instead:</span>{' '}
              {mistake.doInstead}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
