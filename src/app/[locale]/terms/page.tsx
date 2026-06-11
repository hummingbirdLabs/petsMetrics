import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME } from '@/constants';

export const metadata: Metadata = {
  title: `Terms of Use — ${SITE_NAME}`,
  description:
    'Terms of use for petsMetrics. Our tools provide general reference information only and do not constitute veterinary advice.',
  alternates: {
    canonical: `${SITE_URL}/terms/`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: `Terms of Use — ${SITE_NAME}`,
    description:
      'Science-based reference tools. Not veterinary advice. Free and no login required.',
    url: `${SITE_URL}/terms/`,
    type: 'website',
  },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-[--gray-900] sm:text-4xl">
        Terms of Use
      </h1>
      <p className="mt-2 text-sm text-[--gray-400]">
        Last updated: June 10, 2026
      </p>

      <section className="mt-8 space-y-6 text-base leading-relaxed text-[--gray-600]">
        <h2 className="text-2xl font-bold tracking-tight text-[--gray-900]">
          1. Acceptance of Terms
        </h2>
        <p>
          By using petsMetrics.com (&quot;the Site&quot;), you agree to these Terms of Use.
          If you do not agree, please do not use the Site.
        </p>

        <h2 className="text-2xl font-bold tracking-tight text-[--gray-900]">
          2. Medical Disclaimer — Please Read Carefully
        </h2>
        <p className="rounded-lg border border-amber-200 bg-amber-50/80 p-4 text-amber-900">
          <strong>
            The tools and content on petsMetrics provide general reference
            information only and do not constitute veterinary advice, diagnosis,
            or treatment.
          </strong>{' '}
          Always consult a licensed veterinarian for decisions regarding your
          pet&apos;s health, diet, vaccinations, or medical conditions. Never
          disregard professional veterinary advice or delay seeking it because
          of something you read on this Site.
        </p>
        <p>
          Our toxicity database is compiled from publicly available information
          published by the ASPCA Animal Poison Control Center, AVMA, and other
          authoritative sources. While we make every effort to keep this
          information accurate and up to date, we make no guarantees about its
          completeness or applicability to your specific situation. If your pet
          has ingested a potentially toxic substance, contact ASPCA Animal
          Poison Control at (888) 426-4435 or your emergency veterinarian
          immediately — do not rely solely on website information.
        </p>

        <h2 className="text-2xl font-bold tracking-tight text-[--gray-900]">
          3. No Veterinary-Client Relationship
        </h2>
        <p>
          Use of this Site does not create a veterinarian-client relationship.
          No tool on this Site diagnoses, treats, or prescribes for any medical
          condition. The calculators provide mathematical estimates based on
          published formulas; they do not replace individualized professional
          assessment.
        </p>

        <h2 className="text-2xl font-bold tracking-tight text-[--gray-900]">
          4. Accuracy of Information
        </h2>
        <p>
          We strive to ensure all formulas, data, and content are accurate and
          based on current veterinary research. However, we make no
          representations or warranties of any kind, express or implied, about
          the completeness, accuracy, reliability, or suitability of the
          information. Formula sources are cited on each tool page for
          independent verification.
        </p>

        <h2 className="text-2xl font-bold tracking-tight text-[--gray-900]">
          5. Limitation of Liability
        </h2>
        <p>
          To the fullest extent permitted by law, petsMetrics and its operators
          shall not be liable for any direct, indirect, incidental,
          consequential, or special damages arising out of or in connection with
          your use of the Site or reliance on any information provided. This
          includes, without limitation, any decisions made or actions taken
          based on calculator results, toxicity information, or any other
          content on the Site.
        </p>

        <h2 className="text-2xl font-bold tracking-tight text-[--gray-900]">
          6. Intellectual Property
        </h2>
        <p>
          The Site&apos;s code, design, and original content are the property of
          petsMetrics. Calculator formulas are based on publicly available
          veterinary research and are not claimed as proprietary. Toxicity data
          is compiled from publicly available sources (ASPCA, AVMA) and is
          presented for educational purposes.
        </p>

        <h2 className="text-2xl font-bold tracking-tight text-[--gray-900]">
          7. Third-Party Links and Affiliate Disclosure
        </h2>
        <p>
          The Site may contain links to third-party websites and affiliate
          links to products or services. We may earn a commission if you
          purchase through affiliate links, at no additional cost to you. We
          only link to products and services we believe are relevant to pet
          owners. Third-party sites have their own terms and privacy policies;
          we are not responsible for their content or practices.
        </p>

        <h2 className="text-2xl font-bold tracking-tight text-[--gray-900]">
          8. Changes to Terms
        </h2>
        <p>
          We reserve the right to modify these Terms at any time. Changes
          will be posted on this page with an updated date. Continued use of
          the Site after changes constitutes acceptance of the modified Terms.
        </p>

        <h2 className="text-2xl font-bold tracking-tight text-[--gray-900]">
          9. Contact
        </h2>
        <p>
          Questions about these Terms? Contact us at{' '}
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
  );
}
