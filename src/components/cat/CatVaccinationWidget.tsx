'use client';
import { useTranslations } from 'next-intl';
import { useVaccinationSchedule } from '@/hooks/useVaccinationSchedule';
import { useProfile } from '@/hooks/useProfile';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ShareButtons } from '@/components/shared/ShareButtons';
import { SITE_URL } from '@/constants';
import { usePageUrlBuilder } from '@/hooks/usePageUrl';

const STATUS_CONFIG: Record<string, { variant: 'safe' | 'caution' | 'toxic' | 'info'; labelKey: string }> = {
  overdue: { variant: 'toxic', labelKey: 'overdue' },
  upcoming: { variant: 'caution', labelKey: 'upcoming' },
  future: { variant: 'info', labelKey: 'future' },
};

export function CatVaccinationWidget() {
  const t = useTranslations('vaccination');
  const { activeProfile: profile } = useProfile();
  const {
    birthDate,
    region,
    result,
    error,
    overdue,
    upcoming,
    future,
    regionOptions,
    setBirthDate,
    setRegion,
    calculate,
  } = useVaccinationSchedule('cat');
  const pageUrl = usePageUrlBuilder();

  const petName = profile?.name ?? 'Luna';
  const shareUrl = SITE_URL + pageUrl('cat/vaccination-schedule').slice(0, -1);
  const today = new Date().toISOString().slice(0, 10);

  function formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const d = new Date(dateStr + 'T00:00:00Z');
    const locale = typeof navigator !== 'undefined' ? navigator.language : 'en-US';
    return d.toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Input Form */}
      <Card padding="lg">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[--gray-700]">{t('form.birthDateLabel')}</label>
            <input
              type="date"
              max={today}
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full max-w-xs rounded-lg border border-[--gray-300] bg-white px-3 py-2 text-sm text-[--gray-900] focus:border-[--cat-primary] focus:outline-none focus:ring-1 focus:ring-[--cat-primary]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[--gray-700]">{t('form.regionLabel')}</label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value as 'US' | 'UK' | 'EU')}
              className="w-full max-w-xs rounded-lg border border-[--gray-300] bg-white px-3 py-2 text-sm text-[--gray-900] focus:border-[--cat-primary] focus:outline-none focus:ring-1 focus:ring-[--cat-primary]"
            >
              {regionOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {error ? (
            <p className="text-sm text-[--status-toxic]" role="alert">{error}</p>
          ) : null}

          <Button variant="primary" onClick={calculate} className="w-full sm:w-auto" style={{
            backgroundColor: 'var(--cat-primary)',
            borderColor: 'var(--cat-primary-dark)',
          }}>
            {t('form.submit')}
          </Button>
        </div>
      </Card>

      {/* Result Table */}
      {result ? (
        <>
          <Card padding="lg">
            <div className="flex flex-col gap-4">
              <div>
                <h3 className="text-lg font-semibold text-[--gray-900]">{t('result.scheduleTitle', { name: petName })}</h3>
                <p className="mt-1 text-xs text-[--gray-500]">
                  {t('result.generatedOn', { date: formatDate(today), birthDate: formatDate(birthDate), region })}
                </p>
              </div>

          {/* Species-specific core vaccine banner */}
          <div className="rounded-lg border-l-4 border-l-[--cat-primary] bg-[--cat-primary-light] p-4">
            <p className="text-sm font-semibold text-[--gray-800]">Feline Core Vaccines (FVRCP + Rabies)</p>
            <p className="mt-1 text-sm text-[--gray-600]">
              Feline Viral Rhinotracheitis, Calicivirus, Panleukopenia, and Rabies form the WSAVA/AFP-recommended core set for all cats. FeLV is recommended for all kittens and outdoor adult cats based on risk. FIV vaccine is non-core and varies by region.
            </p>
            <p className="mt-2 text-xs text-[--gray-400]">Based on WSAVA global guidelines and AAFP feline vaccination advisory panel report.</p>
          </div>

          {/* Status legend */}
              <div className="flex flex-wrap gap-3">
                <Badge variant="toxic">{t('result.status.overdue')}</Badge>
                <Badge variant="caution">{t('result.status.upcoming')}</Badge>
                <Badge variant="info">{t('result.status.future')}</Badge>
              </div>

              {/* Schedule table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[--gray-200]">
                      <th className="py-2 text-left font-medium text-[--gray-500]">{t('result.tableVaccine')}</th>
                      <th className="py-2 text-left font-medium text-[--gray-500]">{t('result.tableDueDate')}</th>
                      <th className="py-2 text-left font-medium text-[--gray-500]">{t('result.tableStatus')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.schedule.map((entry, i) => {
                      const statusConf = STATUS_CONFIG[entry.status];
                      return (
                        <tr key={i} className={`border-b border-[--gray-100] last:border-b-0 ${i % 2 === 1 ? 'bg-[--gray-50]' : ''}`}>
                          <td className="py-2 pr-4 text-[--gray-800]">
                            {entry.vaccine}
                            {entry.type === 'non-core' ? (
                              <span className="ml-1 text-xs italic text-[--gray-400]">(non-core)</span>
                            ) : null}
                          </td>
                          <td className="py-2 pr-4 font-mono text-[--gray-700]">{formatDate(entry.dueDate)}</td>
                          <td className="py-2">
                            <Badge variant={statusConf.variant}>{t(`result.status.${statusConf.labelKey}`)}</Badge>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Next due */}
              {result.nextDueDate ? (
                <div className="rounded-lg border border-[--status-caution]/30 bg-[--status-caution-bg] p-3">
                  <p className="text-sm font-medium text-[--gray-800]">
                    {t('result.nextDue', { date: formatDate(result.nextDueDate) })}
                  </p>
                </div>
              ) : null}
            </div>
          </Card>

          {/* Non-core note */}
          <div className="rounded-lg border-l-4 border-l-[--status-info] bg-[--status-info-bg] p-4">
            <p className="text-sm font-medium text-[--gray-800]">{t('result.nonCoreTitle')}</p>
            <p className="mt-1 text-sm text-[--gray-600]">{t('result.nonCoreBody')}</p>
          </div>

          {/* Share */}
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
