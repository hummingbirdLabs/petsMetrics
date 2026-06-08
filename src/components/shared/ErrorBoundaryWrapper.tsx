'use client';
import { type ReactNode } from 'react';
import { Component } from 'react';
import { useTranslations } from 'next-intl';

type ErrorBoundaryWrapperProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

export function ErrorBoundaryWrapper({ children, fallback }: ErrorBoundaryWrapperProps) {
  return <ErrorBoundaryInner fallback={fallback}>{children}</ErrorBoundaryInner>;
}

type ErrorBoundaryInnerProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundaryInner extends Component<ErrorBoundaryInnerProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryInnerProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <DefaultFallback />;
    }
    return this.props.children;
  }
}

function DefaultFallback() {
  const t = useTranslations('common.error');
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-[--status-toxic]/30 bg-[--status-toxic-bg] p-6 text-center">
      <p className="text-sm font-semibold text-[--status-toxic]">{t('boundaryTitle')}</p>
      <p className="text-xs text-[--gray-500]">{t('boundaryMessage')}</p>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="rounded-md bg-[--status-toxic] px-4 py-1.5 text-xs font-medium text-white transition-colors hover:opacity-80"
      >
        {t('dismiss')}
      </button>
    </div>
  );
}
