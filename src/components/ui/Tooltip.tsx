'use client';
import { type ReactNode, useState, useId } from 'react';

type TooltipProps = {
  content: string;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
};

export function Tooltip({ content, children, position = 'top', className = '' }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const tooltipId = useId();

  const positions: Record<string, string> = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div
      className={`relative inline-flex ${className}`}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      <span aria-describedby={visible ? tooltipId : undefined} className="cursor-help">
        {children}
      </span>
      {visible ? (
        <div
          id={tooltipId}
          role="tooltip"
          className={`pointer-events-none absolute z-50 w-max max-w-xs rounded-md bg-[--gray-900] px-3 py-1.5 text-xs text-white shadow-lg ${positions[position]}`}
        >
          {content}
        </div>
      ) : null}
    </div>
  );
}
