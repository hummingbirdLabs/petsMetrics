interface TimelineCTA {
  text: string;
  url: string;
}

interface VetVisit {
  type: string;
  cost?: string;
}

interface TimelineItem {
  week: string;
  title: string;
  description?: string;
  tasks: string[];
  cta?: TimelineCTA;
  vetVisit?: VetVisit;
}

interface TimelineSectionProps {
  title?: string;
  timeline: TimelineItem[];
  locale?: string;
}

export function TimelineSection({ title = 'Development Timeline', timeline }: TimelineSectionProps) {
  return (
    <section aria-labelledby="timeline-heading" className="mt-10">
      <h2 id="timeline-heading" className="text-2xl font-bold tracking-tight text-[--gray-900]">
        {title}
      </h2>

      <div className="mt-6 relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[--gray-200]" />

        <div className="space-y-8">
          {timeline.map((item, index) => (
            <div key={item.week} className="relative pl-10">
              <div className="absolute left-2.5 top-1.5 h-3 w-3 rounded-full border-2 border-white bg-[--dog-primary] shadow-sm" />
              <div className="rounded-xl border border-[--gray-200] bg-white p-5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center rounded-full bg-[--dog-light] px-3 py-1 text-xs font-semibold text-[--dog-primary]">
                    {item.week}
                  </span>
                  <h3 className="text-base font-semibold text-[--gray-900]">{item.title}</h3>
                  {item.vetVisit && (
                    <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-0.5 text-xs text-red-600">
                      Vet Visit: {item.vetVisit.type}
                      {item.vetVisit.cost && ` (${item.vetVisit.cost})`}
                    </span>
                  )}
                </div>

                {item.description && (
                  <p className="mt-2 text-sm text-[--gray-600]">{item.description}</p>
                )}

                <ul className="mt-4 space-y-2">
                  {item.tasks.map((task, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[--gray-700]">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[--gray-400]" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>

                {item.cta && (
                  <a
                    href={item.cta.url}
                    className="mt-4 inline-flex items-center text-sm font-medium text-[--dog-primary] hover:underline"
                  >
                    {item.cta.text} →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
