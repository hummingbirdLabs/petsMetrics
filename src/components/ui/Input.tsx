'use client';
import { type InputHTMLAttributes, useId } from 'react';

type InputProps = {
  label: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function Input({ label, error, className = '', ...rest }: InputProps) {
  const id = useId();

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-[--gray-700]">
        {label}
      </label>
      <input
        id={id}
        className={`rounded-lg border bg-[--gray-50] px-3 py-2 text-sm text-[--gray-900] placeholder-[--gray-500] transition-colors focus:border-[--brand-teal] focus:outline-none focus:ring-1 focus:ring-[--brand-teal] ${
          error ? 'border-[--status-toxic]' : 'border-[--gray-300]'
        } ${className}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...rest}
      />
      {error ? (
        <p id={`${id}-error`} className="text-xs text-[--status-toxic]" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
