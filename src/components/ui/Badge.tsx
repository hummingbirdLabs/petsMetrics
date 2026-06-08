import { type ReactNode } from 'react';

type BadgeVariant = 'safe' | 'caution' | 'toxic' | 'info';

type BadgeProps = {
  variant: BadgeVariant;
  children: ReactNode;
  className?: string;
};

const variantStyles: Record<BadgeVariant, string> = {
  safe: 'bg-[--status-safe-bg] text-[--status-safe]',
  caution: 'bg-[--status-caution-bg] text-[--status-caution]',
  toxic: 'bg-[--status-toxic-bg] text-[--status-toxic]',
  info: 'bg-[--status-info-bg] text-[--status-info]',
};

export function Badge({ variant, children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
