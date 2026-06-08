type StepperProps = {
  steps: { label: string; description?: string }[];
  current: number;
  className?: string;
};

export function Stepper({ steps, current, className = '' }: StepperProps) {
  return (
    <nav aria-label="Progress" className={className}>
      <ol className="flex items-center">
        {steps.map((step, i) => {
          const isCompleted = i < current;
          const isCurrent = i === current;
          return (
            <li key={i} className={`flex items-center ${i < steps.length - 1 ? 'flex-1' : ''}`}>
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                    isCompleted
                      ? 'bg-[--brand-teal] text-white'
                      : isCurrent
                        ? 'border-2 border-[--brand-teal] bg-white text-[--brand-teal]'
                        : 'border-2 border-[--gray-300] bg-white text-[--gray-500]'
                  }`}
                  aria-current={isCurrent ? 'step' : undefined}
                >
                  {isCompleted ? (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </div>
                <span
                  className={`mt-1 text-xs ${
                    isCurrent ? 'font-semibold text-[--brand-teal]' : 'text-[--gray-500]'
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {i < steps.length - 1 ? (
                <div
                  className={`mx-2 h-0.5 flex-1 ${
                    i < current ? 'bg-[--brand-teal]' : 'bg-[--gray-300]'
                  }`}
                />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
