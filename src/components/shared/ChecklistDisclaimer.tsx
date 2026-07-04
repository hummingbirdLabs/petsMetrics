interface ChecklistDisclaimerProps {
  variant?: 'general' | 'veterinary';
  message?: string;
}

export function ChecklistDisclaimer({
  variant = 'general',
  message,
}: ChecklistDisclaimerProps) {
  const defaultMessage =
    variant === 'veterinary'
      ? 'This checklist provides general reference information only and does not constitute veterinary advice. Individual pets may have unique health needs. Always consult a licensed veterinarian for personalized care recommendations.'
      : 'This checklist is provided for general informational purposes only. Always consult with a qualified professional for advice specific to your situation.';

  return (
    <aside className="mt-10 rounded-xl border border-amber-200 bg-amber-50 p-5">
      <div className="flex items-start gap-3">
        <span className="flex-shrink-0 text-amber-500">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </span>
        <p className="text-sm text-amber-800 leading-relaxed">
          {message || defaultMessage}
        </p>
      </div>
    </aside>
  );
}
