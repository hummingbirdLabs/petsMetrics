import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME } from '@/constants';
import { JsonLdScript } from '@/components/shared/JsonLdScript';
import { graphJsonLd } from '@/lib/seo/geo-meta';
import { createPageUrl } from '@/lib/utils/url';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Free Shared Pet Tools — Toxic Checker, EU Travel & More',
    description:
      'Cross-species pet tools: toxic food checker, EU pet travel rules, BARF calculator, and pet insurance estimator. Free, no login.',
    alternates: {
      canonical: `${SITE_URL}/${locale}/shared/`,
    },
    openGraph: {
      title: 'Free Shared Pet Tools — Toxic Checker, EU Travel & More | petsMetrics',
      description:
        'Cross-species pet tools: toxic food checker, EU pet travel rules, BARF calculator, and pet insurance estimator. Free, no login.',
      url: `${SITE_URL}/${locale}/shared/`,
      type: 'website',
      images: [{ url: `${SITE_URL}/og/toxic-checker.webp`, width: 1200, height: 630, alt: 'Shared Pet Tools' }],
    },
  };
}

const collectionSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Shared Pet Health Tools',
  description:
    'Cross-species pet tools: toxic food checker, EU pet travel rules, BARF calculator, and pet insurance estimator.',
  url: `${SITE_URL}/${locale}/shared/`,
  isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
    { '@type': 'ListItem', position: 2, name: 'Shared', item: `${SITE_URL}/shared/` },
  ],
};

export default async function SharedHubPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const pageUrl = createPageUrl(locale);

  const tools = [
    {
      icon: '\u26A0\uFE0F',
      name: 'Toxic Food Checker',
      href: pageUrl('shared/toxic-checker'),
      desc: 'Is it safe? Check 200+ foods, plants, and household items for dogs and cats.',
    },
    {
      icon: '\u2708\uFE0F',
      name: 'EU Pet Travel Checker',
      href: pageUrl('shared/eu-pet-travel-checker'),
      desc: 'Cross-border pet travel requirements: microchips, vaccines, tapeworm treatment.',
    },
    {
      icon: '\uD83E\uDD69',
      name: 'BARF Raw Feeding Calculator',
      href: pageUrl('shared/barf-calculator'),
      desc: 'Calculate daily raw food portions: muscle meat, bone, liver, and organs.',
    },
    {
      icon: '\uD83D\uDEE1\uFE0F',
      name: 'Pet Insurance Estimator',
      href: pageUrl('shared/pet-insurance-estimator'),
      desc: 'Estimate monthly premiums based on breed, age, and location.',
    },
  ];

  return (
    <>
      <JsonLdScript data={graphJsonLd(collectionSchema, breadcrumbSchema)} />

      <section
        className="flex min-h-[280px] items-center px-4 py-12 sm:px-6 lg:px-8"
        style={{ background: 'linear-gradient(135deg, var(--brand-teal) 0%, #14B8A6 60%, #2DD4BF 100%)' }}
      >
        <div className="mx-auto w-full max-w-7xl">
          <h1 className="font-display text-4xl font-bold text-white sm:text-5xl">
            Shared Tools for Dogs &amp; Cats
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            Cross-species calculators and checkers that work for both dogs and cats. No login required, 100% free.
          </p>
        </div>
      </section>

      <section className="bg-[--gray-50] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {tools.map((tool) => (
              <a
                key={tool.name}
                href={tool.href}
                className="group rounded-xl border border-white/20 bg-white/80 p-6 shadow-sm backdrop-blur-sm transition hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-[--brand-teal]/10 text-2xl">
                    {tool.icon}
                  </span>
                  <div>
                    <h2 className="font-display text-lg font-semibold text-[--gray-900] group-hover:text-[--brand-teal]">
                      {tool.name}
                    </h2>
                    <p className="mt-1 text-sm leading-relaxed text-[--gray-600]">
                      {tool.desc}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
