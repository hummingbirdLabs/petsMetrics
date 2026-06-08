'use client';

type ToggleProps = {
  options: [string, string];
  value: string;
  onChange: (value: string) => void;
  ariaLabel?: string;
  className?: string;
  dataTestId?: string;
};

export function Toggle({ options, value, onChange, ariaLabel, className = '', dataTestId }: ToggleProps) {
  return (
    <div
      className={`inline-flex rounded-lg border border-[--gray-300] bg-[--gray-50] p-0.5 ${className}`}
      role="radiogroup"
      aria-label={ariaLabel}
      data-testid={dataTestId}
    >
      {options.map((opt) => {
        const active = value === opt;
        return (
          <button
            key={opt}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(opt)}
            className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
              active
                ? 'bg-[--brand-teal] text-white shadow-sm'
                : 'text-[--gray-500] hover:text-[--gray-700]'
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
