import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';

export default async function NotFound() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'common' });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="font-display text-6xl font-bold text-[--gray-900]">{t('notFound.title')}</h1>
      <p className="text-lg text-[--gray-500]">{t('notFound.description')}</p>
      <Link
        href={`/${locale}/`}
        className="rounded-lg bg-[--brand-teal] px-6 py-3 font-medium text-white transition-colors hover:bg-[--brand-teal-light]"
      >
        {t('notFound.returnHome')}
      </Link>
    </main>
  );
}
