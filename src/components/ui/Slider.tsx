'use client';
import { useId } from 'react';

type SliderProps = {
  label: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  showValue?: boolean;
  className?: string;
};

export function Slider({
  label,
  min,
  max,
  step = 1,
  value,
  onChange,
  showValue = true,
  className = '',
}: SliderProps) {
  const id = useId();
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-medium text-[--gray-700]">
          {label}
        </label>
        {showValue ? (
          <span className="text-sm font-semibold text-[--brand-teal]">{value}</span>
        ) : null}
      </div>
      <div className="relative w-full">
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full appearance-none bg-transparent [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-[--gray-300] [&::-webkit-slider-thumb]:-mt-1 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[--brand-teal] [&::-webkit-slider-thumb]:cursor-pointer"
          style={{
            background: `linear-gradient(to right, var(--brand-teal) ${pct}%, var(--gray-300) ${pct}%)`,
          }}
        />
        {showValue ? (
          <div className="mt-1 flex justify-between text-xs text-[--gray-500]">
            <span>{min}</span>
            <span>{max}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
