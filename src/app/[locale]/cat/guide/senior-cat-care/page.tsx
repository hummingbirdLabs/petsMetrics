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
import { SENIOR_CAT_FAQ } from '@/lib/seo/checklist-faq';
import { SENIOR_CAT_KNOWLEDGE } from '@/lib/seo/checklist-content';
import { generateBreadcrumbJsonLd, graphJsonLd } from '@/lib/seo/geo-meta';
import { generateFaqPageJsonLd } from '@/lib/seo/geo-faq';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  return {
  title: 'Senior Cat Health Checklist: Complete Care Guide for Aging Cats | petsMetrics',
  description:
    'Comprehensive senior cat care checklist: 30 essential health monitoring items, home modifications, nutrition guide, and quality of life assessment. Based on AAFP Senior Care Guidelines 2021.',
  keywords:
    'senior cat health, aging cat care, elderly cat checklist, senior cat vet visits, feline arthritis, cat kidney disease, feline hyperthyroidism',
  alternates: {
    canonical: `${SITE_URL}/${locale}/cat/guide/senior-cat-care/`,
  },
  openGraph: {
    title: 'Senior Cat Health Checklist: 30 Items to Monitor | petsMetrics',
    description:
      'Complete senior cat care guide with bi-annual vet checklist, home modifications, and quality of life assessment.',
    url: `${SITE_URL}/${locale}/cat/guide/senior-cat-care/`,
    type: 'article',
    images: [{ url: `${SITE_URL}/og/senior-cat-care.webp`, width: 1200, height: 630, alt: 'Senior Cat Care Checklist' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Senior Cat Health Checklist: 30 Items to Monitor | petsMetrics',
    description: 'Complete senior cat care guide with bi-annual vet checklist, home modifications, and quality of life assessment.',
    images: [`${SITE_URL}/og/senior-cat-care.webp`],
  }
};
}

const breadcrumbSchema = generateBreadcrumbJsonLd([
  { position: 1, name: 'Home', item: `${SITE_URL}/` },
  { position: 2, name: 'Cat', item: `${SITE_URL}/cat/` },
  { position: 3, name: 'Senior Cat Care', item: '' },
]);

const faqSchema = generateFaqPageJsonLd(SENIOR_CAT_FAQ);

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Senior Cat Health Checklist: Complete Care Guide for Aging Cats',
  description: 'Comprehensive senior cat care checklist with 30 health monitoring items and home modifications.',
  author: { '@type': 'Organization', name: 'petsMetrics' },
  datePublished: '2026-07-03',
  dateModified: '2026-07-03',
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Care for Your Senior Cat',
  description: 'Step-by-step guide to providing optimal care for your aging feline companion.',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Schedule bi-annual vet exams', text: 'Senior cats need veterinary exams every 6 months with bloodwork, blood pressure, and thyroid screening.' },
    { '@type': 'HowToStep', position: 2, name: 'Modify your home environment', text: 'Add low-entry litter boxes, ramps, orthopedic beds, and night lights to support aging cats.' },
    { '@type': 'HowToStep', position: 3, name: 'Adjust nutrition to senior needs', text: 'Transition to senior-formulated food with high protein, moderate phosphorus, and added omega-3s.' },
    { '@type': 'HowToStep', position: 4, name: 'Monitor for pain and cognitive changes', text: 'Cats hide pain expertly. Watch for subtle signs: decreased jumping, stiffness, hiding, or litter box accidents.' },
    { '@type': 'HowToStep', position: 5, name: 'Maintain gentle enrichment', text: 'Provide mental stimulation through puzzle feeders, gentle play, and scent enrichment.' },
  ],
};

const checklistSections = [
  {
    id: 'health-monitoring',
    title: '🏥 Bi-annual Health Monitoring',
    description: 'Every 6 months, complete these screening items with your veterinarian',
    items: [
      { id: 'vet-exam', label: 'Comprehensive physical exam (heart, lungs, abdomen, joints, thyroid palpation)', required: true },
      { id: 'blood-panel', label: 'Senior blood panel (CBC, chemistry, SDMA for kidney function)', required: true },
      { id: 'thyroid', label: 'Total T4 (thyroid function — hyperthyroidism screening)', required: true },
      { id: 'urinalysis', label: 'Urinalysis (kidney function, diabetes, urine concentration)', required: true },
      { id: 'blood-pressure', label: 'Blood pressure monitoring (hypertension screening)', required: true },
      { id: 'weight-track', label: 'Weight tracking (monthly at home, every visit at vet)', required: true },
      { id: 'pain-assessment', label: 'Pain assessment (osteoarthritis evaluation)', required: true },
      { id: 'dental-check', label: 'Dental assessment (70% of cats over 3 have dental disease)', required: true },
      { id: 'ccd-screen', label: 'Cognitive function screening (FCD symptoms review)', required: true },
      { id: 'eye-exam', label: 'Ophthalmic exam (hypertension-related retinal changes)', required: true },
    ],
  },
  {
    id: 'daily-care',
    title: '🐱 Daily Care Routine',
    description: 'Daily habits that maintain senior cat health and comfort',
    items: [
      { id: 'senior-food', label: 'Senior-formula diet (high protein, moderate phosphorus, moisture-rich)', required: true },
      { id: 'fresh-water', label: 'Fresh water available (consider fountain to encourage drinking)', required: true },
      { id: 'litter-clean', label: 'Litter box scooped at least daily (seniors are fastidious)', required: true },
      { id: 'gentle-play', label: 'Gentle play sessions (5-10 minutes, low-impact)', required: true },
      { id: 'grooming', label: 'Gentle brushing (seniors may groom less — help prevent matting)', required: true },
      { id: 'mental-stim', label: 'Mental stimulation (puzzle feeders, scent enrichment)', required: true },
      { id: 'warmth', label: 'Warm, draft-free sleeping area (heated bed if arthritic)', required: true },
    ],
  },
  {
    id: 'home-mod',
    title: '🏠 Home Environment Modifications',
    description: 'Physical modifications to support aging joints, vision, and mobility',
    items: [
      { id: 'low-litter', label: 'Low-entry litter box (3-inch sides or cut-out entrance)', required: true },
      { id: 'extra-litter', label: 'Additional litter box on each floor (reduce travel distance)', required: true },
      { id: 'ramps', label: 'Ramps or steps for furniture access (bed, couch, favorite perch)', required: true },
      { id: 'raised-bowls', label: 'Raised food/water bowls (reduce neck strain)', required: false },
      { id: 'night-lights', label: 'Night lights along hallways (vision impairment support)', required: true },
      { id: 'ortho-bed', label: 'Orthopedic memory foam bed (warmth + joint support)', required: true },
      { id: 'non-slip', label: 'Non-slip rugs on slippery floors', required: false },
    ],
  },
  {
    id: 'meds-supp',
    title: '💊 Medication & Supplement Management',
    description: 'Managing ongoing medications and supplement protocols',
    items: [
      { id: 'parasite-prev', label: 'Monthly flea/parasite prevention (even indoor cats)', required: true },
      { id: 'omega3', label: 'Omega-3 fatty acid fish oil (anti-inflammatory, kidney support)', required: false },
      { id: 'joint-supp', label: 'Joint supplement (glucosamine/chondroitin for arthritis)', required: false },
      { id: 'probiotic', label: 'Probiotic for digestive health (especially if on medications)', required: false },
      { id: 'prescription', label: 'Prescribed medications administered on schedule', required: true },
    ],
  },
  {
    id: 'qol',
    title: '💚 Quality of Life Self-Assessment',
    description: 'Monthly evaluation using validated quality of life scales',
    items: [
      { id: 'eat-drink', label: 'Can cat eat, drink, and swallow comfortably?', required: true },
      { id: 'litter-comfort', label: 'Can cat access and use litter box without difficulty?', required: true },
      { id: 'move-comfort', label: 'Can cat move around without severe pain?', required: true },
      { id: 'enjoy-activities', label: 'Does cat still enjoy favorite activities (play, sunbathing, interaction)?', required: true },
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
      'Complete first senior wellness panel (blood work, SDMA, T4, blood pressure)',
      'Document current weight, body condition, and mobility range',
      'Add low-entry litter boxes, ramps, and orthopedic bedding',
      'Transition to senior-formula food (gradual over 7-10 days)',
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
      'Begin cognitive enrichment (puzzle feeders, scent work)',
      'Adjust exercise routine to gentle play sessions',
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
      'Increase monitoring frequency if CKD, diabetes, or hyperthyroidism diagnosed',
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
      { item: 'Comprehensive Physical Exam', cost: '$50 - $80' },
      { item: 'Senior Blood Panel (CBC, Chemistry, SDMA)', cost: '$100 - $200' },
      { item: 'Total T4 (Thyroid)', cost: '$30 - $60' },
      { item: 'Urinalysis', cost: '$25 - $50' },
      { item: 'Blood Pressure Measurement', cost: '$20 - $40' },
      { item: 'Dental Cleaning (when needed)', cost: '$200 - $500' },
    ],
    totalLabel: 'Bi-annual Vet Total',
    totalCost: '$425 - $930',
  },
  {
    title: 'Monthly Recurring Costs',
    rows: [
      { item: 'Senior-Formula Food (wet preferred)', cost: '$35 - $70' },
      { item: 'Litter', cost: '$15 - $25' },
      { item: 'Flea/Parasite Prevention', cost: '$10 - $20' },
      { item: 'Joint Supplements', cost: '$15 - $30' },
      { item: 'Prescription Medications (varies)', cost: '$20 - $100' },
    ],
    totalLabel: 'Monthly Total',
    totalCost: '$95 - $245',
  },
];

const commonMistakes = [
  {
    title: 'Mistake #1: Assuming Indoor Cats Don\'t Need Vet Care',
    whyDangerous: 'Indoor cats still develop kidney disease, hyperthyroidism, diabetes, and cancer. Annual/bi-annual exams are essential regardless of lifestyle.',
    doInstead: 'Schedule bi-annual exams for all cats over 7 years. Indoor status does not prevent age-related disease.',
  },
  {
    title: 'Mistake #2: Missing Pain Signals',
    whyDangerous: 'Cats are evolutionary experts at hiding pain. By the time signs are obvious, suffering has been ongoing for weeks or months.',
    doInstead: 'Watch for subtle signs: decreased jumping, stiffness after rest, unkempt coat, hiding, litter box accidents. Use the Feline Grimace Scale for assessment.',
  },
  {
    title: 'Mistake #3: Feeding Only Dry Food',
    whyDangerous: 'Dry food is only 10% moisture. Senior cats are prone to dehydration, which accelerates kidney disease and causes constipation.',
    doInstead: 'Feed primarily wet food (75-80% moisture). If using dry, add water or broth and provide a water fountain.',
  },
  {
    title: 'Mistake #4: Ignoring Weight Loss',
    whyDangerous: 'Weight loss in senior cats is NEVER normal. It indicates hyperthyroidism, kidney disease, cancer, or diabetes until proven otherwise.',
    doInstead: 'Weigh your cat monthly. Any unexplained weight loss >5% in a month warrants immediate veterinary investigation.',
  },
  {
    title: 'Mistake #5: Using High Litter Boxes',
    whyDangerous: 'Arthritic cats cannot climb into high-sided boxes. This causes litter box avoidance and house soiling.',
    doInstead: 'Use low-entry boxes (3-inch sides) with non-scented clumping litter. Place boxes on every floor.',
  },
];

const relatedTools = [
  { name: 'Cat Age Calculator', url: '/cat/age-calculator/', description: 'Convert your cat\'s age and identify their life stage.' },
  { name: 'Hydration Calculator', url: '/cat/hydration-calculator/', description: 'Ensure your senior cat gets enough water for kidney health.' },
  { name: 'BCS Weight Tracker', url: '/cat/bcs-weight-tracker/', description: 'Track body condition score and weight trends over time.' },
  { name: 'Pet Insurance Estimator', url: '/shared/pet-insurance-estimator/', description: 'Compare senior cat insurance coverage costs.' },
];

export default async function SeniorCatCarePage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  setRequestLocale(locale);
  const pageUrl = createPageUrl(locale);

  return (
    <>
      <JsonLdScript data={graphJsonLd(articleSchema, faqSchema, howToSchema, breadcrumbSchema)} />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Home', href: '' }, { label: 'Cat', href: 'cat' }, { label: 'Senior Cat Care' }]} />
      </div>
      <SidebarLayout
        main={
          <div className="flex flex-col gap-8">
            <ChecklistHero
              title="Senior Cat Health Checklist: Complete Care Guide for Aging Cats"
              subtitle="30 essential items covering bi-annual health monitoring, daily care routines, home modifications, and quality of life assessment. Based on AAFP Senior Care Guidelines 2021."
              species="cat"
              lifeStage="Senior"
              estimatedCost={{ min: 1500, max: 3500, currency: 'USD', timeframe: 'annual senior care' }}
              ctaText="Download Senior Cat Care PDF"
              keyStats={[
                { label: 'Health Items', value: '30' },
                { label: 'Vet Visits/Year', value: '2' },
                { label: 'Annual Cost', value: '$1.5-3.5K' },
                { label: 'Home Mods', value: '7' },
              ]}
            />
            <p className="text-base leading-relaxed text-[--gray-600]">
              <strong>Senior cats deserve proactive care.</strong> AAFP Senior Care Guidelines 2021 recommend bi-annual exams, blood pressure monitoring, SDMA kidney testing, and total T4 thyroid screening for all cats over 11 years. This checklist covers every aspect of senior cat care — from arthritis management to cognitive support — so you can maximize both the length and quality of your cat&apos;s golden years. The triad of CKD, hyperthyroidism, and hypertension is treatable when caught early.
            </p>
            <InteractiveChecklist
              sections={checklistSections}
              storageKey="senior-cat-checklist"
              showProgressBar={true}
              allowPrint={true}
              allowPDFDownload={true}
            />
            <TimelineSection title="Senior Cat Care Timeline" timeline={timeline} />
            <BudgetCalculator
              title="Annual Senior Cat Care Cost Estimator"
              sections={budgetSections}
              proTip="Senior cats benefit greatly from pet insurance — get a quote to see if coverage offsets your anticipated costs."
              proTipLink={{ text: 'Get Quote', url: '/shared/pet-insurance-estimator/' }}
              species="cat"
            />
            <KnowledgeCards cards={SENIOR_CAT_KNOWLEDGE} locale={locale} />
            <CommonMistakes title="⚠️ Common Mistakes in Senior Cat Care" mistakes={commonMistakes} species="cat" />
            <ChecklistFAQ title="Frequently Asked Questions About Senior Cat Care" faqs={SENIOR_CAT_FAQ} />
            <ChecklistRelatedTools title="Related Senior Cat Care Tools" tools={relatedTools} species="cat" />
            <ChecklistDisclaimer variant="veterinary" />
          </div>
        }
        sidebar={
          <div className="flex flex-col gap-4">
            <Card padding="md">
              <p className="text-sm font-semibold text-[--gray-900]">Senior Cat Stats</p>
              <ul className="mt-3 flex flex-col gap-2 text-sm text-[--gray-600]">
                <li>✓ 30 health monitoring items</li>
                <li>✓ Bi-annual vet exam schedule</li>
                <li>✓ Home modification checklist</li>
                <li>✓ Quality of life self-assessment</li>
                <li>✓ 5 common mistakes to avoid</li>
              </ul>
            </Card>
            <AffiliateBanner variant="insurance" />
            <Card padding="md">
              <p className="text-sm font-semibold text-[--gray-900]">Related Tools</p>
              <ul className="mt-3 flex flex-col gap-2 text-sm">
                <li><a href={pageUrl('cat/age-calculator')} className="text-[--cat-primary] hover:underline">Cat Age Calculator</a></li>
                <li><a href={pageUrl('cat/hydration-calculator')} className="text-[--cat-primary] hover:underline">Hydration Calculator</a></li>
                <li><a href={pageUrl('cat/bcs-weight-tracker')} className="text-[--cat-primary] hover:underline">BCS Weight Tracker</a></li>
                <li><a href={pageUrl('shared/pet-insurance-estimator')} className="text-[--cat-primary] hover:underline">Pet Insurance</a></li>
              </ul>
            </Card>
          </div>
        }
      />
    </>
  );
}
