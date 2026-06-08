type DividerProps = {
  className?: string;
  label?: string;
};

export function Divider({ className = '', label }: DividerProps) {
  if (label) {
    return (
      <div className={`flex items-center gap-4 ${className}`}>
        <div className="h-px flex-1 bg-[--gray-300]" />
        <span className="text-xs font-medium text-[--gray-500]">{label}</span>
        <div className="h-px flex-1 bg-[--gray-300]" />
      </div>
    );
  }

  return <hr className={`border-0 h-px bg-[--gray-300] ${className}`} />;
}
