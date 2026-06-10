import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME } from '@/constants';
import { JsonLdScript } from '@/components/shared/JsonLdScript';

export const metadata: Metadata = {
  title: `About petsMetrics — Science-Based Pet Health Tools | ${SITE_NAME}`,
  description:
    'petsMetrics builds free, science-based calculators for dog and cat owners. All tools run in your browser — no login, no data upload. Built by a pet owner and developer.',
  alternates: {
    canonical: `${SITE_URL}/about/`,
  },
  openGraph: {
    title: `About petsMetrics — Free Dog & Cat Health Calculators`,
    description:
      'Science-based tools for pet owners since 2026. AAHA, AAFCO, WSAVA, and ASPCA-backed.',
    url: `${SITE_URL}/about/`,
    type: 'website',
  },
};

const orgJsonLd = {
  '@type': 'Organization',
  'name': SITE_NAME,
  'url': SITE_URL,
  'description': 'Free science-based health calculators for dogs and cats. One profile, every answer.',
  'founder': {
    '@type': 'Person',
    'name': 'petsMetrics Team',
  },
};

export default function AboutPage() {
  return (
    <>
      <JsonLdScript
        data={{
          '@context': 'https://schema.org',
          '@graph': [orgJsonLd],
        }}
      />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-[--gray-900] sm:text-4xl">
          About petsMetrics
        </h1>

        <section className="mt-8 space-y-6 text-base leading-relaxed text-[--gray-600]">
          <p>
            <strong>Built by petsMetrics Team, a pet owner and developer.</strong>{' '}
            petsMetrics has been providing science-based pet health tools since 2026.
            We believe pet owners deserve accurate, transparent calculators that don&apos;t
            require accounts, emails, or personal data.
          </p>

          <h2 className="mt-10 text-2xl font-bold tracking-tight text-[--gray-900]">
            Our Methodology
          </h2>
          <p>
            All calorie formulas are based on the AAFCO 2023 Nutrient Profiles.
            Dog age conversion uses the UCSD epigenetic methylation study
            (Wang et al., 2020). Cat age conversion follows AAHA/AAFP 2021 Feline
            Life Stage Guidelines. Vaccination schedules reference WSAVA 2024
            Global Vaccination Guidelines. Toxicity data is verified against the
            ASPCA Animal Poison Control Center database and AVMA guidelines
            (last checked: June 2026).
          </p>
          <p>
            Every calculator result page cites its formula source. You can verify
            any of our formulas independently — search &quot;RER 70 × weight^0.75
            AAFCO&quot; or &quot;UCSD dog aging epigenetic clock Wang 2020&quot; and confirm
            the science yourself. We don&apos;t invent formulas; we implement
            peer-reviewed veterinary research.
          </p>

          <h2 className="mt-10 text-2xl font-bold tracking-tight text-[--gray-900]">
            Data Sources
          </h2>
          <p>
            Toxicity information verified against ASPCA Animal Poison Control
            Center database and AVMA guidelines (last checked: June 2026).
            Our toxic food and plant database contains 200+ items drawn from
            the ASPCA&apos;s publicly available toxic and non-toxic plant lists,
            Pet Poison Helpline data, and peer-reviewed veterinary literature.
            We update this database annually to reflect the latest ASPCA findings.
          </p>
          <p>
            Breed data (weight standards, life expectancy, genetic health risks)
            is sourced from AKC (American Kennel Club) and TICA (The International
            Cat Association) breed standards. EU pet travel rules are based on
            EU Regulation 576/2013 and individual member state national
            agriculture ministry publications.
          </p>

          <h2 className="mt-10 text-2xl font-bold tracking-tight text-[--gray-900]">
            Privacy &amp; Data
          </h2>
          <p>
            All calculations run entirely in your browser. No pet data is
            uploaded to any server. Your pet profiles are stored only in your
            device&apos;s localStorage. We do not use cookies for tracking, do not
            collect email addresses, and do not require accounts. See our{' '}
            <a href="/privacy/" className="text-[--dog-primary] underline">
              Privacy Policy
            </a>{' '}
            for full details.
          </p>

          <h2 className="mt-10 text-2xl font-bold tracking-tight text-[--gray-900]">
            Medical Disclaimer
          </h2>
          <p>
            <strong>
              petsMetrics is not a substitute for professional veterinary
              advice, diagnosis, or treatment.
            </strong>{' '}
            All tools provide general reference information based on published
            veterinary guidelines (AAHA, WSAVA, AAFCO, AAFP, UCSD research).
            Always consult a licensed veterinarian for decisions regarding your
            pet&apos;s health. If your pet has ingested a potentially toxic substance,
            contact ASPCA Animal Poison Control at (888) 426-4435 or your
            nearest emergency veterinarian immediately.
          </p>

          <h2 className="mt-10 text-2xl font-bold tracking-tight text-[--gray-900]">
            Contact
          </h2>
          <p>
            Have a question, suggestion, or found an error in our data? We&apos;d
            love to hear from you. Reach us at{' '}
            <a
              href="mailto:hello@petsmetrics.com"
              className="text-[--dog-primary] underline"
            >
              hello@petsmetrics.com
            </a>
            .
          </p>
        </section>
      </div>
    </>
  );
}
