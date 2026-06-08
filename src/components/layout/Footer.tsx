import { getTranslations } from 'next-intl/server';

export async function Footer() {
  const t = await getTranslations('footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[--brand-navy] text-white/70">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-sm">
            &copy; {currentYear} {t('copyright')}
          </p>
          <div className="flex gap-6 text-sm">
            <a href="/privacy/" className="transition-colors hover:text-white">
              {t('privacy')}
            </a>
            <a href="/disclaimer/" className="transition-colors hover:text-white">
              {t('disclaimer')}
            </a>
            <a href="mailto:hello@petsmetrics.com" className="transition-colors hover:text-white">
              {t('contact')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
