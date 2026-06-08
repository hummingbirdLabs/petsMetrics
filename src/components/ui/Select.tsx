'use client';
import { type SelectHTMLAttributes, useId } from 'react';

type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = {
  label: string;
  options: SelectOption[];
  error?: string;
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'>;

export function Select({ label, options, error, className = '', ...rest }: SelectProps) {
  const id = useId();

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-[--gray-700]">
        {label}
      </label>
      <select
        id={id}
        className={`rounded-lg border bg-[--gray-50] px-3 py-2 text-sm text-[--gray-900] transition-colors focus:border-[--brand-teal] focus:outline-none focus:ring-1 focus:ring-[--brand-teal] ${
          error ? 'border-[--status-toxic]' : 'border-[--gray-300]'
        } ${className}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...rest}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error ? (
        <p id={`${id}-error`} className="text-xs text-[--status-toxic]" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
