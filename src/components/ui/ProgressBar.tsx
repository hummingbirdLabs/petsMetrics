type ProgressBarProps = {
  value: number;
  max?: number;
  label?: string;
  showLabel?: boolean;
  variant?: 'safe' | 'caution' | 'toxic' | 'info';
  className?: string;
};

export function ProgressBar({
  value,
  max = 100,
  label,
  showLabel = false,
  variant = 'info',
  className = '',
}: ProgressBarProps) {
  const pct = Math.min(Math.max((value / max) * 100, 0), 100);

  const variantColors: Record<string, string> = {
    safe: 'bg-[--status-safe]',
    caution: 'bg-[--status-caution]',
    toxic: 'bg-[--status-toxic]',
    info: 'bg-[--status-info]',
  };

  return (
    <div className={`w-full ${className}`}>
      {(label || showLabel) ? (
        <div className="mb-1 flex items-center justify-between">
          {label ? <span className="text-xs font-medium text-[--gray-500]">{label}</span> : null}
          {showLabel ? (
            <span className="text-xs font-semibold text-[--gray-700]">{Math.round(pct)}%</span>
          ) : null}
        </div>
      ) : null}
      <div className="h-2 w-full overflow-hidden rounded-full bg-[--gray-100]" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max} aria-label={label}>
        <div
          className={`h-full rounded-full transition-all duration-300 ${variantColors[variant]}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
