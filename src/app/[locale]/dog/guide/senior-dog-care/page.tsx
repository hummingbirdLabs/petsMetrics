import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SITE_URL } from '@/constants';
import { createPageUrl } from '@/lib/utils/url';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { SidebarLayout } from '@/components/layout/SidebarLayout';
import { PetProfileBar } from '@/components/shared/PetProfileBar';
import { ErrorBoundaryWrapper } from '@/components/shared/ErrorBoundaryWrapper';
import { JsonLdScript } from '@/components/shared/JsonLdScript';
import { Card } from '@/components/ui/Card';
import { AffiliateBanner } from '@/components/shared/AffiliateBanner';
import { ChecklistHero } from '@/components/shared/ChecklistHero';
import InteractiveChecklist from '@/components/shared/InteractiveChecklist';
import { TimelineSection } from '@/components/shared/TimelineSection';
import { BudgetCalculator } from '@/components/shared/BudgetCalculator';
import { KnowledgeCards } from '@/components/shared/KnowledgeCards';
import { CommonMistakes } from '@/components/shared/CommonMistakes';
import { ChecklistFAQ } from '@/components/shared/ChecklistFAQ';
import { ChecklistRelatedTools } from '@/components/shared/ChecklistRelatedTools';
import { ChecklistDisclaimer } from '@/components/shared/ChecklistDisclaimer';
import { SENIOR_DOG_FAQ } from '@/lib/seo/checklist-faq';
import { SENIOR_DOG_KNOWLEDGE } from '@/lib/seo/checklist-content';
import { generateBreadcrumbJsonLd, graphJsonLd } from '@/lib/seo/geo-meta';
import { generateFaqPageJsonLd } from '@/lib/seo/geo-faq';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
  title: 'Senior Dog Health Checklist: Complete Care Guide for Aging Dogs | petsMetrics',
  description:
    'Comprehensive senior dog care checklist: 32 essential health monitoring items, home modifications, nutrition guide, and quality of life assessment. Based on AAHA Senior Care Guidelines.',
  keywords:
    'senior dog health, aging dog care, elderly dog checklist, senior dog vet visits, dog arthritis, canine cognitive dysfunction',
  alternates: {
    canonical: `${SITE_URL}/${locale}/dog/guide/senior-dog-care/`,
  },
  openGraph: {
    title: 'Senior Dog Health Checklist: 32 Items to Monitor | petsMetrics',
    description:
      'Complete senior dog care guide with bi-annual vet checklist, home modifications, and quality of life assessment.',
    url: `${SITE_URL}/${locale}/dog/guide/senior-dog-care/`,
    type: 'article',
    images: [{ url: `${SITE_URL}/og/senior-dog-care.webp`, width: 1200, height: 630, alt: 'Senior Dog Care Checklist' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Senior Dog Health Checklist: 32 Items to Monitor | petsMetrics',
    description: 'Complete senior dog care guide with bi-annual vet checklist, home modifications, and quality of life assessment.',
    images: [`${SITE_URL}/og/senior-dog-care.webp`],
  },
};
}

const breadcrumbSchema = generateBreadcrumbJsonLd([
  { position: 1, name: 'Home', item: `${SITE_URL}/` },
  { position: 2, name: 'Dog', item: `${SITE_URL}/dog/` },
  { position: 3, name: 'Senior Dog Care', item: '' },
]);

const faqSchema = generateFaqPageJsonLd(SENIOR_DOG_FAQ);

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Senior Dog Health Checklist: Complete Care Guide for Aging Dogs',
  description: 'Comprehensive senior dog care checklist with 32 health monitoring items and home modifications.',
  author: { '@type': 'Organization', name: 'petsMetrics' },
  datePublished: '2026-07-03',
  dateModified: '2026-07-03',
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Care for Your Senior Dog',
  description: 'Step-by-step guide to providing optimal care for your aging canine companion.',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Schedule bi-annual vet exams', text: 'Senior dogs need veterinary exams every 6 months for bloodwork, blood pressure, and joint assessment.' },
    { '@type': 'HowToStep', position: 2, name: 'Modify your home environment', text: 'Add ramps, non-slip rugs, orthopedic beds, and raised bowls to support aging joints.' },
    { '@type': 'HowToStep', position: 3, name: 'Adjust nutrition to senior needs', text: 'Transition to senior-formulated food with higher protein, joint supplements, and moderate calories.' },
    { '@type': 'HowToStep', position: 4, name: 'Maintain gentle exercise routine', text: 'Provide consistent low-impact exercise: short walks, swimming, and mental enrichment.' },
    { '@type': 'HowToStep', position: 5, name: 'Screen for cognitive decline', text: 'Monitor for CCD signs: disorientation, altered sleep, house sousing. Early intervention helps.' },
  ],
};

const checklistSections = [
  {
    id: 'health-monitoring',
    title: '🏥 Bi-annual Health Monitoring',
    description: 'Every 6 months, complete these screening items with your veterinarian',
    items: [
      { id: 'vet-exam', label: 'Comprehensive physical exam (heart, lungs, abdomen, joints, skin)', required: true },
      { id: 'blood-panel', label: 'Senior blood panel (CBC, chemistry, thyroid T4)', required: true },
      { id: 'urinalysis', label: 'Urinalysis (kidney function, diabetes screening)', required: true },
      { id: 'blood-pressure', label: 'Blood pressure monitoring', required: true },
      { id: 'eye-exam', label: 'Ophthalmic exam (cataracts, nuclear sclerosis, dry eye)', required: true },
      { id: 'dental-check', label: 'Dental assessment and cleaning if needed', required: true },
      { id: 'joint-mobility', label: 'Joint mobility assessment and pain scoring', required: true },
      { id: 'weight-track', label: 'Weight tracking (body condition score on 9-point scale)', required: true },
      { id: 'ccd-screen', label: 'Cognitive function screening (CCD symptoms review)', required: true },
      { id: 'pain-assessment', label: 'Pain assessment (osteoarthritis signs evaluation)', required: true },
    ],
  },
  {
    id: 'daily-care',
    title: '🐕 Daily Care Routine',
    description: 'Daily habits that maintain senior dog health and comfort',
    items: [
      { id: 'senior-food', label: 'Senior-formula diet (lower fat, higher fiber, joint support)', required: true },
      { id: 'joint-supp', label: 'Joint supplement (glucosamine, chondroitin, omega-3)', required: false },
      { id: 'moderate-exercise', label: 'Moderate exercise (short, frequent walks — not single long walk)', required: true },
      { id: 'sleep-schedule', label: 'Consistent sleep schedule (pacing disrupts rest quality)', required: true },
      { id: 'dental-care', label: 'Dental care (brushing or vet-approved dental chews)', required: true },
      { id: 'mental-stim', label: 'Mental stimulation (food puzzles, sniff walks, gentle training)', required: true },
      { id: 'temp-comfort', label: 'Temperature comfort (orthopedic bed, warmth in cold)', required: true },
    ],
  },
  {
    id: 'home-mod',
    title: '🏠 Home Environment Modifications',
    description: 'Physical modifications to reduce strain on aging joints and senses',
    items: [
      { id: 'non-slip', label: 'Non-slip rugs/mats on slippery hardwood/tile floors', required: true },
      { id: 'ramps', label: 'Ramps or steps for furniture access and car entry', required: true },
      { id: 'raised-bowls', label: 'Raised food/water bowls (reduces neck strain)', required: false },
      { id: 'night-lights', label: 'Night lights along hallways (vision impairment support)', required: true },
      { id: 'easy-outdoor', label: 'Easy outdoor access (doggy door or frequent potty breaks)', required: true },
      { id: 'ortho-bed', label: 'Orthopedic dog bed (memory foam, at least 4 inches thick)', required: true },
    ],
  },
  {
    id: 'meds-supp',
    title: '💊 Medication & Supplement Management',
    description: 'Managing ongoing medications and supplement protocols',
    items: [
      { id: 'parasite-prev', label: 'Monthly flea/tick/heartworm prevention (year-round)', required: true },
      { id: 'joint-med', label: 'Joint supplement (Dasuquin, Cosequin, or equivalent)', required: false },
      { id: 'fish-oil', label: 'Omega-3 fatty acid fish oil (EPA/DHA anti-inflammatory)', required: false },
      { id: 'probiotic', label: 'Probiotic for digestive health (especially if on medications)', required: false },
      { id: 'prescription', label: 'Prescribed medications administered on schedule', required: true },
    ],
  },
  {
    id: 'qol',
    title: '💚 Quality of Life Self-Assessment',
    description: 'Monthly evaluation using validated quality of life scales',
    items: [
      { id: 'eat-drink', label: 'Can dog eat, drink, and swallow comfortably?', required: true },
      { id: 'move-comfort', label: 'Can dog move around without severe pain?', required: true },
      { id: 'enjoy-activities', label: 'Does dog still enjoy favorite activities?', required: true },
      { id: 'good-bad-days', label: 'Are good days greater than bad days?', required: true },
    ],
  },
];

const timeline = [
  {
    week: 'Month 1-2',
    title: 'Establish Baseline',
    description: 'Create comprehensive health baseline and modify home environment.',
    tasks: [
      'Complete first senior wellness panel (blood work, urinalysis, blood pressure)',
      'Document current weight, body condition, and mobility range',
      'Add non-slip rugs, ramps, and orthopedic bedding',
      'Transition to senior-formula diet (gradual over 7-10 days)',
      'Establish baseline for cognitive function and sleep quality',
    ],
    vetVisit: { type: 'Senior Wellness Baseline', cost: '$150-$300' },
  },
  {
    week: 'Month 3-4',
    title: 'Intervention Phase',
    description: 'Based on baseline findings, begin targeted treatments.',
    tasks: [
      'Start joint supplements if mild arthritis detected',
      'Implement weight management plan if overweight',
      'Begin cognitive enrichment (puzzle toys, scent work)',
      'Adjust exercise routine to 20-30 minutes, low impact',
      'Monitor medication effectiveness and side effects',
    ],
  },
  {
    week: 'Month 5-6',
    title: 'Re-assessment',
    description: 'Bi-annual re-evaluation to measure progress and adjust plan.',
    tasks: [
      'Repeat blood work to track kidney, liver, thyroid values',
      'Re-assess pain levels and mobility range',
      'Adjust supplement dosages based on response',
      'Update weight and body condition score',
      'Re-evaluate quality of life with validated scale',
    ],
    vetVisit: { type: 'Bi-annual Re-assessment', cost: '$150-$300' },
  },
  {
    week: 'Month 7-12',
    title: 'Maintenance & Monitoring',
    description: 'Ongoing care with watchful waiting for progressive conditions.',
    tasks: [
      'Continue all effective interventions without change',
      'Add new supplements only after 3-month assessment period',
      'Increase monitoring frequency if CKD, diabetes, or cancer diagnosed',
      'Maintain consistent daily routine (seniors dislike change)',
      'Document concerns for next vet visit (keep a health journal)',
    ],
    vetVisit: { type: 'Winter/Summer Check', cost: '$100-$200' },
  },
];

const budgetSections = [
  {
    title: 'Bi-annual Vet Exams',
    rows: [
      { item: 'Comprehensive Physical Exam', cost: '$60 - $100' },
      { item: 'Senior Blood Panel (CBC, Chemistry, T4)', cost: '$100 - $200' },
      { item: 'Urinalysis', cost: '$30 - $60' },
      { item: 'Blood Pressure Measurement', cost: '$20 - $40' },
      { item: 'Dental Cleaning (when needed)', cost: '$200 - $600' },
    ],
    totalLabel: 'Bi-annual Vet Total',
    totalCost: '$410 - $1,000',
  },
  {
    title: 'Monthly Recurring Costs',
    rows: [
      { item: 'Senior-Formula Food', cost: '$50 - $90' },
      { item: 'Joint Supplements', cost: '$25 - $50' },
      { item: 'Omega-3 Fish Oil', cost: '$15 - $30' },
      { item: 'Flea/Tick/Heartworm Prevention', cost: '$30 - $60' },
      { item: 'Prescription Medications (varies)', cost: '$30 - $150' },
    ],
    totalLabel: 'Monthly Total',
    totalCost: '$150 - $380',
  },
];

const commonMistakes = [
  {
    title: 'Mistake #1: Reducing Vet Visits with Age',
    whyDangerous: 'Dogs age 4-7 human years per calendar year. Annual exams miss rapidly progressing conditions.',
    doInstead: 'Schedule bi-annual exams with blood pressure screening and senior blood panel every 6 months.',
  },
  {
    title: 'Mistake #2: Assuming "Old Age" Symptoms Are Normal',
    whyDangerous: 'Decreased activity, weight gain, and confusion are NOT normal aging — they indicate treatable conditions like arthritis, hypothyroidism, or CCD.',
    doInstead: 'Investigate all behavioral changes. Early treatment of underlying conditions adds years of quality life.',
  },
  {
    title: 'Mistake #3: Stopping Exercise Completely',
    whyDangerous: 'Complete inactivity accelerates muscle loss, joint stiffness, and weight gain. Motion is lotion for aging joints.',
    doInstead: 'Provide consistent, low-impact exercise: gentle walks, swimming, or sniff walks. Adjust duration and intensity to your dog\'s tolerance.',
  },
  {
    title: 'Mistake #4: Ignoring Dental Pain',
    whyDangerous: 'Dental disease causes chronic pain, affects eating, and bacteria can damage heart, liver, and kidneys.',
    doInstead: 'Schedule dental cleaning under anesthesia when needed. Daily brushing and dental chews help between cleanings.',
  },
  {
    title: 'Mistake #5: Overfeeding Senior Dogs',
    whyDangerous: 'Senior dogs need 20-30% fewer calories. Excess weight stresses joints, worsens arthritis, and shortens lifespan.',
    doInstead: 'Weigh food portions, reduce treats to <10% of daily calories, and monitor body condition score monthly.',
  },
];

const relatedTools = [
  { name: 'Dog Age Calculator', url: '/dog/age-calculator/', description: 'Convert your dog\'s age and identify their life stage.' },
  { name: 'Calorie Calculator', url: '/dog/calorie-calculator/', description: 'Calculate the right calorie intake for your senior dog\'s needs.' },
  { name: 'Pet Insurance Estimator', url: '/shared/pet-insurance-estimator/', description: 'Compare senior dog insurance coverage costs.' },
  { name: 'BCS Weight Tracker', url: '/cat/bcs-weight-tracker/', description: 'Track body condition score and weight trends over time.' },
];

export default async function SeniorDogCarePage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  setRequestLocale(locale);
  const pageUrl = createPageUrl(locale);

  return (
    <>
      <JsonLdScript data={graphJsonLd(articleSchema, faqSchema, howToSchema, breadcrumbSchema)} />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Home', href: '' }, { label: 'Dog', href: 'dog' }, { label: 'Senior Dog Care' }]} />
      </div>
      <SidebarLayout
        main={
          <div className="flex flex-col gap-8">
            <ChecklistHero
              title="Senior Dog Health Checklist: Complete Care Guide for Aging Dogs"
              subtitle="32 essential items covering bi-annual health monitoring, daily care routines, home modifications, and quality of life assessment. Based on AAHA Senior Care Guidelines."
              species="dog"
              lifeStage="Senior"
              estimatedCost={{ min: 1800, max: 4500, currency: 'USD', timeframe: 'annual senior care' }}
              ctaText="Download Senior Care PDF"
              keyStats={[
                { label: 'Health Items', value: '32' },
                { label: 'Vet Visits/Year', value: '2' },
                { label: 'Annual Cost', value: '$1.8-4.5K' },
                { label: 'Home Mods', value: '6' },
              ]}
            />
            <p className="text-base leading-relaxed text-[--gray-600]">
              <strong>Senior dogs deserve proactive care.</strong> AAHA Senior Care Guidelines recommend bi-annual exams, blood pressure monitoring, bloodwork (CBC, chemistry, thyroid), and quality of life assessments. This checklist covers every aspect of senior dog care — from arthritis management to cognitive support — so you can maximize both the length and quality of your dog&apos;s golden years.
            </p>
            <InteractiveChecklist
              sections={checklistSections}
              storageKey="senior-dog-checklist"
              showProgressBar={true}
              allowPrint={true}
              allowPDFDownload={true}
            />
            <TimelineSection title="Senior Dog Care Timeline" timeline={timeline} />
            <BudgetCalculator
              title="Annual Senior Care Cost Estimator"
              sections={budgetSections}
              proTip="Senior dogs benefit greatly from pet insurance — get a quote to see if coverage offsets your anticipated costs."
              proTipLink={{ text: 'Get Quote', url: '/shared/pet-insurance-estimator/' }}
              species="dog"
            />
            <KnowledgeCards cards={SENIOR_DOG_KNOWLEDGE} locale={locale} />
            <CommonMistakes title="⚠️ Common Mistakes in Senior Dog Care" mistakes={commonMistakes} species="dog" />
            <ChecklistFAQ title="Frequently Asked Questions About Senior Dog Care" faqs={SENIOR_DOG_FAQ} />
            <ChecklistRelatedTools title="Related Senior Dog Care Tools" tools={relatedTools} species="dog" />
            <ChecklistDisclaimer variant="veterinary" />
          </div>
        }
        sidebar={
          <div className="flex flex-col gap-4">
            <Card padding="md">
              <p className="text-sm font-semibold text-[--gray-900]">Senior Care Stats</p>
              <ul className="mt-3 flex flex-col gap-2 text-sm text-[--gray-600]">
                <li>✓ 32 health monitoring items</li>
                <li>✓ Bi-annual vet exam schedule</li>
                <li>✓ Home modification checklist</li>
                <li>✓ Quality of life self-assessment</li>
                <li>✓ 6 common mistakes to avoid</li>
              </ul>
            </Card>
            <AffiliateBanner variant="insurance" />
            <Card padding="md">
              <p className="text-sm font-semibold text-[--gray-900]">Related Tools</p>
              <ul className="mt-3 flex flex-col gap-2 text-sm">
                <li><a href={pageUrl('dog/age-calculator')} className="text-[--dog-primary] hover:underline">Dog Age Calculator</a></li>
                <li><a href={pageUrl('dog/calorie-calculator')} className="text-[--dog-primary] hover:underline">Calorie Calculator</a></li>
                <li><a href={pageUrl('shared/pet-insurance-estimator')} className="text-[--dog-primary] hover:underline">Pet Insurance</a></li>
              </ul>
            </Card>
          </div>
        }
      />
    </>
  );
}
