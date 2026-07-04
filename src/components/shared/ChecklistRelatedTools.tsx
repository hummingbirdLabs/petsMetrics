interface RelatedTool {
  name: string;
  url: string;
  description: string;
  icon?: string;
}

interface ChecklistRelatedToolsProps {
  title?: string;
  tools: RelatedTool[];
  species?: 'dog' | 'cat';
}

export function ChecklistRelatedTools({
  title = 'Related Tools & Resources',
  tools,
  species = 'dog',
}: ChecklistRelatedToolsProps) {
  const speciesColor = species === 'dog' ? '[--dog-primary]' : '[--cat-primary]';

  return (
    <section aria-labelledby="related-tools-heading" className="mt-10">
      <h2 id="related-tools-heading" className="text-2xl font-bold tracking-tight text-[--gray-900]">
        {title}
      </h2>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {tools.map((tool) => (
          <a
            key={tool.name}
            href={tool.url}
            className={`group flex items-start gap-4 rounded-xl border border-[--gray-200] bg-white p-5 hover:border-${speciesColor}/30 hover:shadow-sm transition-all`}
          >
            <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-${speciesColor}/10 text-${speciesColor}`}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[--gray-900] group-hover:text-${speciesColor}">
                {tool.name}
              </h3>
              <p className="mt-1 text-xs text-[--gray-500]">{tool.description}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
