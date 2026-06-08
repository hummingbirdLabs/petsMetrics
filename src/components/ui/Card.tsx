import { type ReactNode } from 'react';

type CardProps = {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
};

export function Card({ children, className = '', padding = 'md' }: CardProps) {
  const paddings: Record<string, string> = {
    none: '',
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={`bg-white/80 backdrop-blur-sm shadow-sm rounded-xl border border-[--gray-300]/20 ${paddings[padding]} ${className}`}
    >
      {children}
    </div>
  );
}
