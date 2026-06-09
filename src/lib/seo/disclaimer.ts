/**
 * SSG disclaimer text — imported from messages/en.json at build time.
 * Usage:
 *   Server Component: const t = await getTranslations('common'); text={t('disclaimer.standard')}
 *   Client Component:  import { DISCLAIMER_TEXT } from '@/lib/seo/disclaimer'; text={DISCLAIMER_TEXT}
 *
 * Prefer Server Component (getTranslations) for full i18n support;
 * fall back to DISCLAIMER_TEXT only in Client Components where hooks are unavailable.
 */
import messages from '@/../messages/en.json';

export const DISCLAIMER_TEXT: string =
  (messages as unknown as { common?: { disclaimer?: { standard?: string } } }).common?.disclaimer?.standard ??
  'This tool provides general reference information only and does not constitute veterinary advice. Always consult a licensed veterinarian for health decisions.';
