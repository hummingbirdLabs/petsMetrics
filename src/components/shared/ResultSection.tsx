import { type ReactNode } from 'react';
import { Card } from '@/components/ui/Card';
import { Divider } from '@/components/ui/Divider';
import { DisclaimerSection } from '@/components/shared/DisclaimerSection';

type ResultSectionProps = {
  title: string;
  value: string | number;
  unit?: string;
  interpretation?: string;
  resultSlot?: ReactNode;
  footerSlot?: ReactNode;
  className?: string;
  /** SSG pre-rendered disclaimer text — passed from Server Component via getTranslations() */
  disclaimerText?: string;
};

export function ResultSection({
  title,
  value,
  unit,
  interpretation,
  resultSlot,
  footerSlot,
  className = '',
  disclaimerText,
}: ResultSectionProps) {
  return (
    <Card className={`flex flex-col gap-4 ${className}`}>
      <h3 className="text-sm font-medium text-[--gray-500]">{title}</h3>
      <div className="flex items-baseline gap-2">
        <span className="text-4xl font-bold text-[--gray-900] font-mono tracking-tight tabular-nums">
          {value}
        </span>
        {unit ? <span className="text-lg text-[--gray-500]">{unit}</span> : null}
      </div>
      {interpretation ? (
        <p className="text-sm text-[--gray-500]">{interpretation}</p>
      ) : null}
      {resultSlot ? (
        <>
          <Divider />
          {resultSlot}
        </>
      ) : null}
      {footerSlot ? (
        <>
          <Divider />
          {footerSlot}
        </>
      ) : null}
      {disclaimerText ? <DisclaimerSection text={disclaimerText} /> : null}
    </Card>
  );
}
