interface BudgetRow {
  item: string;
  cost: string;
}

interface BudgetSection {
  title: string;
  rows: BudgetRow[];
  totalLabel?: string;
  totalCost?: string;
}

interface BudgetCalculatorProps {
  title?: string;
  sections: BudgetSection[];
  proTip?: string;
  proTipLink?: { text: string; url: string };
  species?: 'dog' | 'cat';
}

export function BudgetCalculator({
  title = 'Cost Estimator',
  sections,
  proTip,
  proTipLink,
  species = 'dog',
}: BudgetCalculatorProps) {
  const speciesColor = species === 'dog' ? '[--dog-primary]' : '[--cat-primary]';

  return (
    <section aria-labelledby="budget-heading" className="mt-10">
      <h2 id="budget-heading" className="text-2xl font-bold tracking-tight text-[--gray-900]">
        {title}
      </h2>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {sections.map((section) => (
          <div key={section.title} className="rounded-xl border border-[--gray-200] bg-white p-5">
            <h3 className="text-base font-semibold text-[--gray-900]">{section.title}</h3>
            <table className="mt-4 w-full text-sm">
              <tbody>
                {section.rows.map((row, i) => (
                  <tr key={i} className="border-b border-[--gray-100] last:border-0">
                    <td className="py-2 text-[--gray-700]">{row.item}</td>
                    <td className="py-2 text-right font-medium text-[--gray-900]">{row.cost}</td>
                  </tr>
                ))}
                {section.totalLabel && (
                  <tr className="border-t-2 border-[--gray-300]">
                    <td className="py-2 font-semibold text-[--gray-900]">{section.totalLabel}</td>
                    <td className="py-2 text-right font-bold text-${speciesColor}">
                      {section.totalCost}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      {proTip && (
        <div className={`mt-6 rounded-lg border border-${speciesColor}/20 bg-${speciesColor}/5 p-4`}>
          <p className="text-sm text-[--gray-700]">
            <span className="font-semibold">💡 Pro Tip:</span>{' '}
            {proTip}
            {proTipLink && (
              <a href={proTipLink.url} className={`ml-1 font-medium text-${speciesColor} hover:underline`}>
                {proTipLink.text}
              </a>
            )}
          </p>
        </div>
      )}
    </section>
  );
}
