'use client';
import { useTranslations } from 'next-intl';
import { useGestation } from '@/hooks/useGestation';
import { useProfile } from '@/hooks/useProfile';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ShareButtons } from '@/components/shared/ShareButtons';
import { SITE_URL } from '@/constants';
import { pageUrl } from '@/lib/utils/url';

export function DogGestationWidget() {
  const t = useTranslations('gestation');
  const { activeProfile: profile } = useProfile();
  const {
    matingDates,
    result,
    error,
    setMatingDate,
    addMatingDate,
    calculate,
  } = useGestation('dog');

  const petName = profile?.name ?? 'Buddy';
  const shareUrl = SITE_URL + pageUrl('dog/gestation-calculator').slice(0, -1);

  const today = new Date().toISOString().slice(0, 10);

  function daysUntil(dateStr: string): number {
    const target = new Date(dateStr + 'T00:00:00Z');
    const now = new Date(today + 'T00:00:00Z');
    return Math.round((target.getTime() - now.getTime()) / 86400000);
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Input Form */}
      <Card padding="lg">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <h3 className="text-base font-semibold text-[--gray-900]">{t('form.matingDateLabel')}</h3>
            {matingDates.map((date, i) => (
              <div key={i} className="flex flex-col gap-1">
                <label className="text-xs text-[--gray-500]">
                  {i === 0 ? t('form.firstMating') : t('form.secondMating')}
                </label>
                <input
                  type="date"
                  max={today}
                  value={date}
                  onChange={(e) => setMatingDate(i, e.target.value)}
                  className="w-full max-w-xs rounded-lg border border-[--gray-300] bg-white px-3 py-2 text-sm text-[--gray-900] focus:border-[--dog-primary] focus:outline-none focus:ring-1 focus:ring-[--dog-primary]"
                />
              </div>
            ))}
            {matingDates.length < 3 ? (
              <button
                type="button"
                onClick={addMatingDate}
                className="self-start text-sm font-medium text-[--dog-primary] hover:underline"
              >
                + {t('form.addDateButton')}
              </button>
            ) : null}
            {matingDates.length > 1 ? (
              <p className="text-xs text-[--gray-500]">{t('form.multiDateHint')}</p>
            ) : null}
          </div>

          {error ? (
            <p className="text-sm text-[--status-toxic]" role="alert">{error}</p>
          ) : null}

          <Button variant="primary" onClick={calculate} className="w-full sm:w-auto" style={{
            backgroundColor: 'var(--dog-primary)',
            borderColor: 'var(--dog-primary-dark)',
          }}>
            {t('form.submit')}
          </Button>
        </div>
      </Card>

      {/* Result */}
      {result ? (
        <>
          {/* Due Date Hero */}
          <div className="rounded-xl border-l-4 bg-[--dog-surface] border-l-[--dog-primary]">
            <div className="flex flex-col gap-3 p-6">
              <span className="text-sm font-medium text-[--dog-primary]">{t('result.expectedDate')}</span>
              <span className="text-3xl font-extrabold text-[--gray-900] font-mono">
                {result.likelyDate}
              </span>
              <div className="h-px bg-[--gray-200]" />
              <div className="flex flex-col gap-1">
                <p className="text-sm text-[--gray-600]">
                  {t('result.possibleRange', {
                    earliest: result.earliestDate,
                    latest: result.latestDate,
                  })}
                </p>
                <p className="text-sm text-[--gray-500]">
                  {t('result.daysRemaining', { days: daysUntil(result.likelyDate) })}
                </p>
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="text-xs text-[--gray-500]">{t('result.basedOn', { date: matingDates.filter(d => d).join(', ') || 'N/A' })}</p>
                <p className="text-xs text-[--gray-400]">{t('result.averageNote')}</p>
              </div>
            </div>
          </div>

          {/* Milestone Timeline */}
          <Card padding="lg">
            <h3 className="text-lg font-semibold text-[--gray-900]">{t('result.milestonesTitle')}</h3>
            <div className="mt-4 flex flex-col gap-3">
              {result.milestones.map((m, i) => {
                const daysLeft = daysUntil(m.date);
                const isPast = daysLeft < 0;
                const isToday = daysLeft === 0;
                return (
                  <div key={i} className="flex items-start gap-3">
                    {/* Timeline dot */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`h-3 w-3 rounded-full border-2 ${
                          isPast
                            ? 'bg-[--status-safe] border-[--status-safe]'
                            : isToday
                              ? 'bg-[--status-caution] border-[--status-caution] animate-pulse'
                              : 'bg-white border-[--gray-300]'
                        }`}
                      />
                      {i < result.milestones.length - 1 ? (
                        <div className="my-1 h-6 w-px bg-[--gray-200]" />
                      ) : null}
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className={`text-sm font-medium ${isPast ? 'text-[--gray-400]' : 'text-[--gray-900]'}`}>
                        {t(`result.milestoneDay${m.dayOffset}`)} · {m.date}
                      </span>
                      <span className={`text-xs ${isPast ? 'text-[--gray-400]' : 'text-[--gray-600]'}`}>
                        {t(`result.milestoneDay${m.dayOffset}Desc`)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Share CTA */}
          <div className="rounded-lg border border-[--gray-200] p-4">
            <p className="mb-2 text-sm font-semibold text-[--gray-800]">
              {t('shareCta.title', { name: petName })}
            </p>
            <ShareButtons url={shareUrl} title={t('shareCta.title', { name: petName })} />
          </div>
        </>
      ) : null}
    </div>
  );
}
