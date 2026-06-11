import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME } from '@/constants';

export const metadata: Metadata = {
  title: `Privacy Policy — ${SITE_NAME}`,
  description:
    'petsMetrics privacy policy. All calculations run in your browser. No pet data is uploaded. No cookies. No accounts required.',
  alternates: {
    canonical: `${SITE_URL}/privacy/`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: `Privacy Policy — ${SITE_NAME}`,
    description:
      'No login. No data upload. All tools run in your browser. Your pet data stays on your device.',
    url: `${SITE_URL}/privacy/`,
    type: 'website',
  },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-[--gray-900] sm:text-4xl">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-[--gray-400]">
        Last updated: June 10, 2026
      </p>

      <section className="mt-8 space-y-6 text-base leading-relaxed text-[--gray-600]">
        <h2 className="text-2xl font-bold tracking-tight text-[--gray-900]">
          1. Our Privacy Philosophy
        </h2>
        <p>
          petsMetrics is designed to be private by default. We do not require
          accounts, do not collect email addresses, and do not upload any of
          your pet data to our servers. Your pet profiles, tool inputs, and
          calculation results are stored exclusively in your browser&apos;s
          localStorage — on your device, under your control.
        </p>

        <h2 className="text-2xl font-bold tracking-tight text-[--gray-900]">
          2. Data We Do Not Collect
        </h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Pet profiles</strong> — breed, weight, age, name, photo, and
            health details are stored only in your device&apos;s localStorage. They
            are never transmitted to any server.
          </li>
          <li>
            <strong>Tool inputs and results</strong> — all calculator inputs
            (weight, activity level, food items, etc.) and their results are
            processed entirely in your browser using JavaScript. No calculation
            data leaves your device.
          </li>
          <li>
            <strong>Personal identifiers</strong> — we do not collect names,
            email addresses, IP addresses, or any other personally identifiable
            information.
          </li>
          <li>
            <strong>Cookies for tracking</strong> — we do not use tracking
            cookies, advertising cookies, or any third-party cookies.
          </li>
        </ul>

        <h2 className="text-2xl font-bold tracking-tight text-[--gray-900]">
          3. Data Stored on Your Device
        </h2>
        <p>
          The following data is stored in your browser&apos;s localStorage and
          never leaves your device:
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Pet profiles (name, breed, species, birth date, weight, sex, neuter status, photo)</li>
          <li>Active profile selection</li>
          <li>Weight unit preference (kg or lb)</li>
          <li>UI preferences</li>
        </ul>
        <p>
          You can delete this data at any time by clearing your browser&apos;s
          localStorage for petsmetrics.com, or by using the &quot;Delete Profile&quot;
          function in the Profile dashboard. You can also export your data as a
          JSON file for backup.
        </p>

        <h2 className="text-2xl font-bold tracking-tight text-[--gray-900]">
          4. Analytics
        </h2>
        <p>
          We may use a privacy-respecting analytics service (such as Plausible
          or a self-hosted alternative) to understand aggregate usage patterns
          — e.g., which tools are most popular, which pages receive the most
          visits. These analytics do not use cookies, do not track individual
          users across sessions, and do not collect any personally identifiable
          information. No individual user behavior is recorded or stored.
        </p>

        <h2 className="text-2xl font-bold tracking-tight text-[--gray-900]">
          5. Third-Party Services
        </h2>
        <p>
          petsMetrics does not embed third-party trackers, social media pixels,
          or advertising networks that collect user data. We may display
          affiliate links to pet products or services — clicking these links
          takes you to the third-party site, whose privacy policies govern any
          data collected there.
        </p>
        <p>
          The site is hosted on Vercel, which may collect standard server logs
          (including IP addresses) for operational purposes. Vercel&apos;s privacy
          policy governs that data processing.
        </p>

        <h2 className="text-2xl font-bold tracking-tight text-[--gray-900]">
          6. Children&apos;s Privacy
        </h2>
        <p>
          petsMetrics is a general-audience website. We do not knowingly collect
          any personal information from children under 13.
        </p>

        <h2 className="text-2xl font-bold tracking-tight text-[--gray-900]">
          7. GDPR Compliance
        </h2>
        <p>
          Since we do not collect, process, or store any personal data on our
          servers, GDPR compliance is inherently satisfied for data processing.
          All user data (pet profiles) resides on the user&apos;s device and is never
          transmitted to us. There is no &quot;data controller&quot; relationship for pet
          profile data because we never receive or access it.
        </p>
        <p>
          If you have questions about this privacy policy, contact us at{' '}
          <a
            href="mailto:hello@petsmetrics.com"
            className="text-[--dog-primary] underline"
          >
            hello@petsmetrics.com
          </a>
          .
        </p>

        <h2 className="text-2xl font-bold tracking-tight text-[--gray-900]">
          8. Changes to This Policy
        </h2>
        <p>
          We may update this privacy policy from time to time. Changes will be
          posted on this page with an updated &quot;Last updated&quot; date. Continued use
          of the site after changes constitutes acceptance of the updated policy.
        </p>
      </section>
    </div>
  );
}
