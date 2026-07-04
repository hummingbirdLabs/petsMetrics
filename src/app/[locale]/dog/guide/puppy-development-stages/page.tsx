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
import { KnowledgeCards } from '@/components/shared/KnowledgeCards';
import { CommonMistakes } from '@/components/shared/CommonMistakes';
import { ChecklistFAQ } from '@/components/shared/ChecklistFAQ';
import { ChecklistRelatedTools } from '@/components/shared/ChecklistRelatedTools';
import { ChecklistDisclaimer } from '@/components/shared/ChecklistDisclaimer';
import { PUPPY_DEVELOPMENT_FAQ } from '@/lib/seo/checklist-faq';
import { PUPPY_DEVELOPMENT_KNOWLEDGE } from '@/lib/seo/checklist-content';
import { generateBreadcrumbJsonLd, graphJsonLd } from '@/lib/seo/geo-meta';
import { generateFaqPageJsonLd } from '@/lib/seo/geo-faq';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  return {
  title: 'Puppy Development Stages Week by Week: Complete Guide | petsMetrics',
  description:
    'Complete puppy development guide: week-by-week milestones from birth to 12 months. Neonatal, socialization, fear periods, teething, and adolescence explained with expert tips.',
  keywords:
    'puppy development stages, puppy week by week, puppy milestones, puppy teething, puppy fear period, puppy socialization timeline',
  alternates: {
    canonical: `${SITE_URL}/${locale}/dog/guide/puppy-development-stages/`,
  },
  openGraph: {
    title: 'Puppy Development Stages: Week-by-Week Guide | petsMetrics',
    description:
      'From neonatal to adolescence: every puppy milestone explained with actionable care tips.',
    url: `${SITE_URL}/${locale}/dog/guide/puppy-development-stages/`,
    type: 'article',
    images: [{ url: `${SITE_URL}/og/puppy-development.webp`, width: 1200, height: 630, alt: 'Puppy Development Stages' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Puppy Development Stages: Week-by-Week Guide | petsMetrics',
    description: 'From neonatal to adolescence: every puppy milestone explained with actionable care tips.',
    images: [`${SITE_URL}/og/puppy-development.webp`],
  },
};
}

const breadcrumbSchema = generateBreadcrumbJsonLd([
  { position: 1, name: 'Home', item: `${SITE_URL}/` },
  { position: 2, name: 'Dog', item: `${SITE_URL}/dog/` },
  { position: 3, name: 'Puppy Development Stages', item: '' },
]);

const faqSchema = generateFaqPageJsonLd(PUPPY_DEVELOPMENT_FAQ);

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Puppy Development Stages Week by Week: Complete Guide',
  description: 'Complete puppy development guide with week-by-week milestones from birth to 12 months.',
  author: { '@type': 'Organization', name: 'petsMetrics' },
  datePublished: '2026-07-03',
  dateModified: '2026-07-03',
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Support Your Puppy Through Each Development Stage',
  description: 'Age-appropriate care, training, and socialization for every puppy development phase.',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Neonatal stage (0-2 weeks): Support mother and litter', text: 'Ensure warm environment, monitor nursing, gentle handling for early neurological stimulation.' },
    { '@type': 'HowToStep', position: 2, name: 'Transitional stage (2-4 weeks): Sensory development', text: 'Eyes and ears open, first steps, begin environmental enrichment with varied textures and sounds.' },
    { '@type': 'HowToStep', position: 3, name: 'Socialization stage (4-12 weeks): Critical learning window', text: 'Expose to 100 people, 20 environments, varied sounds. Begin bite inhibition and basic training.' },
    { '@type': 'HowToStep', position: 4, name: 'Fear period (8-11 weeks): Protect from trauma', text: 'Avoid frightening experiences, maintain positive associations, provide safe retreat space.' },
    { '@type': 'HowToStep', position: 5, name: 'Juvenile stage (3-6 months): Teething and independence', text: 'Provide appropriate chew toys, continue training, manage teething discomfort.' },
    { '@type': 'HowToStep', position: 6, name: 'Adolescence (6-18 months): Consistency through rebellion', text: 'Maintain training consistency, increase mental stimulation, avoid punishment-based methods.' },
  ],
};

const checklistSections = [
  {
    id: 'neonatal',
    title: '🍼 Neonatal Stage (0-2 Weeks): Total Dependence',
    description: 'Puppies are blind, deaf, and entirely dependent on their mother',
    items: [
      { id: 'warmth', label: 'Maintain whelping box temperature at 85-90°F (29-32°C) for first week', required: true },
      { id: 'nursing', label: 'Monitor nursing every 2 hours — puppies should gain 5-10% body weight daily', required: true },
      { id: 'elimination', label: 'Mother stimulates elimination — if orphaned, use warm damp cloth after each feeding', required: true },
      { id: 'weight-daily', label: 'Weigh puppies daily on digital scale to track growth', required: true },
      { id: 'ens', label: 'Early Neurological Stimulation (ENS): 5 gentle exercises daily (head up, head down, supine, thermal, tactile)', required: false },
    ],
  },
  {
    id: 'transitional',
    title: '👁️ Transitional Stage (2-4 Weeks): Senses Awaken',
    description: 'Eyes and ears open, first steps, tail wagging begins',
    items: [
      { id: 'eyes-open', label: 'Eyes open at 10-14 days — avoid direct bright light', required: true },
      { id: 'ears-open', label: 'Ears open at 13-17 days — hearing develops gradually', required: true },
      { id: 'first-steps', label: 'First wobbly steps at 14-21 days — provide non-slip surface', required: true },
      { id: 'social-begin', label: 'First social interactions with littermates (play biting, tail wagging)', required: true },
      { id: 'weaning-start', label: 'Begin introducing gruel (softened puppy food) at 3-4 weeks', required: false },
    ],
  },
  {
    id: 'socialization',
    title: '🌟 Socialization Stage (4-12 Weeks): Critical Window',
    description: 'The most important period for preventing adult behavioral problems',
    items: [
      { id: 'meet-people', label: 'Meet 100 different people (varied ages, appearances, accessories)', required: true },
      { id: 'new-surfaces', label: 'Experience 10+ surfaces (grass, tile, gravel, wood, metal)', required: true },
      { id: 'sounds', label: 'Desensitize to household sounds (vacuum, doorbell, thunder) at low volume', required: true },
      { id: 'bite-inhib', label: 'Learn bite inhibition through littermate play (do not separate too early)', required: true },
      { id: 'basic-training', label: 'Begin name recognition, "sit", "look" with positive reinforcement', required: true },
      { id: 'carrier', label: 'Introduce carrier/crate as positive space with meals and treats', required: true },
      { id: 'vet-positive', label: 'First vet visit should be positive (treats, no procedures if possible)', required: true },
    ],
  },
  {
    id: 'fear-period-1',
    title: '⚠️ First Fear Period (8-11 Weeks): Protect from Trauma',
    description: 'Temporary hypersensitivity — experiences during this window have lasting impact',
    items: [
      { id: 'avoid-trauma', label: 'Avoid any frightening experiences (loud noises, forced interactions, punishment)', required: true },
      { id: 'positive-only', label: 'All new experiences must be paired with high-value treats', required: true },
      { id: 'safe-space', label: 'Provide a safe retreat space the dog can access anytime', required: true },
      { id: 'no-flooding', label: 'Never force interaction — let puppy approach at their own pace', required: true },
      { id: 'monitor-signals', label: 'Watch for stress signals: lip licking, yawning, tucked tail, whale eye', required: true },
    ],
  },
  {
    id: 'juvenile',
    title: '🦷 Juvenile Stage (3-6 Months): Teething & Independence',
    description: 'Teething, boundary testing, and increasing independence',
    items: [
      { id: 'teething-toys', label: 'Provide frozen Kongs, teething rings, and appropriate chew toys', required: true },
      { id: 'baby-teeth', label: 'Baby teeth fall out at 12-16 weeks — monitor for retained teeth', required: true },
      { id: 'consistent-rules', label: 'All family members enforce identical rules consistently', required: true },
      { id: 'potty-mastery', label: 'House training typically reliable by 4-6 months with consistency', required: true },
      { id: 'leash-training', label: 'Begin leash walking training (no pulling) with positive reinforcement', required: true },
      { id: 'spay-neuter', label: 'Discuss spay/neuter timing with vet (breed-dependent, typically 6-12 months)', required: false },
    ],
  },
  {
    id: 'adolescence',
    title: '🐕 Adolescence (6-18 Months): Boundary Testing',
    description: 'Hormonal changes, selective hearing, and systematic rule testing',
    items: [
      { id: 'stay-consistent', label: 'Maintain consistent rules despite "forgetting" trained behaviors', required: true },
      { id: 'mental-stim', label: 'Increase mental stimulation (puzzle toys, nose work, training games)', required: true },
      { id: 'exercise', label: 'Provide adequate physical exercise (follow 5-minute rule for large breeds)', required: true },
      { id: 'fear-period-2', label: 'Expect second fear period (6-14 months) — same protective approach', required: true },
      { id: 'social-maintain', label: 'Continue socialization maintenance (new people, dogs, environments)', required: true },
      { id: 'patience', label: 'Patience is key — adolescence ends, maturity arrives with proper guidance', required: true },
    ],
  },
];

const timeline = [
  {
    week: 'Week 1-2',
    title: 'Neonatal Stage',
    description: 'Puppies are blind, deaf, and entirely dependent. 90% of time is nursing and sleeping.',
    tasks: [
      'Monitor weight gain daily (5-10% increase expected)',
      'Maintain warm environment (85-90°F)',
      'Gentle handling for early neurological stimulation',
      'Mother provides all care (or human substitutes every 2 hours)',
    ],
  },
  {
    week: 'Week 3-4',
    title: 'Transitional Stage',
    description: 'Eyes and ears open, first steps, first social interactions with littermates.',
    tasks: [
      'Eyes open at 10-14 days, ears at 13-17 days',
      'Begin introducing soft gruel (puppy food + water)',
      'First wobbly steps and tail wagging',
      'Begin gentle human socialization (5-10 min/day)',
    ],
  },
  {
    week: 'Week 5-6',
    title: 'Socialization Begins',
    description: 'Critical learning window opens. Brain is primed for environmental imprinting.',
    tasks: [
      'Begin meeting varied people (one at a time, positive)',
      'Introduce to new surfaces and gentle sounds',
      'Start crate introduction with meals inside',
      'Begin handling exercises (paws, ears, mouth)',
    ],
  },
  {
    week: 'Week 7-8',
    title: 'First Fear Period',
    description: 'Neurologically programmed sensitivity. Experiences now have lasting impact.',
    tasks: [
      'Avoid any potentially traumatic experiences',
      'Pair all new stimuli with high-value treats',
      'Continue socialization at puppy\'s comfort level',
      'Provide safe retreat space always accessible',
    ],
  },
  {
    week: 'Week 9-12',
    title: 'Socialization Peak',
    description: 'Maximum learning capacity. This is the most impactful period for lifelong behavior.',
    tasks: [
      'Meet 100 people (varied ages, appearances, accessories)',
      'Visit 20+ new locations (pet-friendly stores, friends)',
      'Experience car rides, grooming tools, varied surfaces',
      'Begin formal "sit", "come", "stay" training',
    ],
    vetVisit: { type: 'DHPP Booster #2', cost: '$25-$50' },
  },
  {
    week: 'Week 13-16',
    title: 'Juvenile Transition',
    description: 'Teething begins, independence increases, house training solidifies.',
    tasks: [
      'Baby teeth fall out (monitor for retained teeth)',
      'Provide frozen chew toys for teething discomfort',
      'House training typically reliable by 16 weeks',
      'Begin leash walking training',
    ],
    vetVisit: { type: 'Final DHPP + Rabies', cost: '$50-$100' },
  },
  {
    week: 'Month 4-6',
    title: 'Early Adolescence',
    description: 'Hormonal changes begin, boundary testing emerges, "forgetting" trained behaviors.',
    tasks: [
      'Maintain consistent training despite regression',
      'Increase mental stimulation (puzzle toys, nose work)',
      'Discuss spay/neuter timing with veterinarian',
      'Continue socialization maintenance',
    ],
  },
  {
    week: 'Month 6-12',
    title: 'Full Adolescence',
    description: 'Peak boundary testing, selective hearing, second fear period possible.',
    tasks: [
      'Stay patient and consistent — this phase passes',
      'Increase exercise and mental enrichment',
      'Avoid punishment-based training (damages trust)',
      'Most dogs show maturity signs by 12-18 months',
    ],
  },
];

const commonMistakes = [
  {
    title: 'Mistake #1: Separating Puppies from Litter Too Early',
    whyDangerous: 'Puppies removed before 8 weeks miss critical bite inhibition learning from littermates. This results in hard-mouth adult dogs.',
    doInstead: 'Keep puppies with mother and littermates until minimum 8 weeks (12 weeks ideal for small breeds).',
  },
  {
    title: 'Mistake #2: Flooding During Fear Periods',
    whyDangerous: 'Forcing a puppy to "face their fears" during fear periods creates lasting phobias and learned helplessness.',
    doInstead: 'During fear periods, maintain distance from triggers and pair with high-value treats. Let the puppy approach when ready.',
  },
  {
    title: 'Mistake #3: Inconsistent Rules During Adolescence',
    whyDangerous: 'Adolescent puppies test boundaries systematically. Inconsistent enforcement teaches them that rules are negotiable.',
    doInstead: 'All family members must enforce identical rules 100% of the time. Write rules down and post visibly.',
  },
  {
    title: 'Mistake #4: Ignoring Teething Needs',
    whyDangerous: 'Puppies chew to relieve teething pain. Without appropriate outlets, they destroy furniture and may develop inappropriate chewing habits.',
    doInstead: 'Provide frozen Kongs, teething rings, and appropriate chew toys. Redirect all inappropriate chewing calmly.',
  },
  {
    title: 'Mistake #5: Expecting Adult Behavior from Adolescent Puppies',
    whyDangerous: 'Adolescent puppies neurologically cannot maintain consistent obedience. Expecting perfection creates frustration and harsh methods.',
    doInstead: 'Understand that adolescence is temporary. Maintain training consistency, celebrate small wins, and trust the process.',
  },
];

const relatedTools = [
  { name: 'Dog Age Calculator', url: '/dog/age-calculator/', description: 'Convert your puppy\'s age to human years and identify their current stage.' },
  { name: 'Vaccination Schedule', url: '/dog/vaccination-schedule/', description: 'Create a personalized vaccination timeline for your puppy.' },
  { name: 'Puppy Growth Predictor', url: '/dog/puppy-growth-predictor/', description: 'Predict your puppy\'s adult weight based on current measurements.' },
  { name: 'Calorie Calculator', url: '/dog/calorie-calculator/', description: 'Calculate the right daily calories for optimal growth.' },
];

export default async function PuppyDevelopmentStagesPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  setRequestLocale(locale);
  const pageUrl = createPageUrl(locale);

  return (
    <>
      <JsonLdScript data={graphJsonLd(articleSchema, faqSchema, howToSchema, breadcrumbSchema)} />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Home', href: '' }, { label: 'Dog', href: 'dog' }, { label: 'Puppy Development' }]} />
      </div>
      <SidebarLayout
        main={
          <div className="flex flex-col gap-8">
            <ChecklistHero
              title="Puppy Development Stages: Week-by-Week Guide (0-12 Months)"
              subtitle="From neonatal helplessness to adolescent independence — every milestone explained with actionable care tips. Based on AVSAB and AKC developmental guidelines."
              species="dog"
              lifeStage="Development"
              ctaText="Download Development Guide PDF"
              keyStats={[
                { label: 'Stages', value: '6' },
                { label: 'Fear Periods', value: '2' },
                { label: 'Teething', value: '4-6 mo' },
                { label: 'Maturity', value: '12-36 mo' },
              ]}
            />
            <p className="text-base leading-relaxed text-[--gray-600]">
              Understanding your puppy&apos;s developmental stages is the key to providing age-appropriate care. Each stage — from neonatal dependence through socialization, fear periods, teething, and adolescence — requires different approaches to training, socialization, and care. This week-by-week guide, based on <strong>AVSAB (American Veterinary Society of Animal Behavior)</strong> and <strong>AKC</strong> developmental guidelines, helps you support your puppy through every critical milestone.
            </p>
            <InteractiveChecklist
              sections={checklistSections}
              storageKey="puppy-dev-checklist"
              showProgressBar={true}
              allowPrint={true}
              allowPDFDownload={true}
            />
            <TimelineSection title="Puppy Development Timeline: Week by Week" timeline={timeline} />
            <KnowledgeCards cards={PUPPY_DEVELOPMENT_KNOWLEDGE} locale={locale} />
            <CommonMistakes title="⚠️ Common Mistakes During Puppy Development" mistakes={commonMistakes} species="dog" />
            <ChecklistFAQ title="Frequently Asked Questions About Puppy Development" faqs={PUPPY_DEVELOPMENT_FAQ} />
            <ChecklistRelatedTools title="Puppy Development Tools" tools={relatedTools} species="dog" />
            <ChecklistDisclaimer variant="veterinary" />
          </div>
        }
        sidebar={
          <div className="flex flex-col gap-4">
            <Card padding="md">
              <p className="text-sm font-semibold text-[--gray-900]">Development Stages</p>
              <ul className="mt-3 flex flex-col gap-2 text-sm text-[--gray-600]">
                <li><strong>Neonatal:</strong> 0-2 weeks</li>
                <li><strong>Transitional:</strong> 2-4 weeks</li>
                <li><strong>Socialization:</strong> 4-12 weeks</li>
                <li><strong>Fear Periods:</strong> 8-11 wks, 6-14 mo</li>
                <li><strong>Juvenile:</strong> 3-6 months</li>
                <li><strong>Adolescence:</strong> 6-18 months</li>
              </ul>
            </Card>
            <AffiliateBanner variant="insurance" />
            <Card padding="md">
              <p className="text-sm font-semibold text-[--gray-900]">Related Tools</p>
              <ul className="mt-3 flex flex-col gap-2 text-sm">
                <li><a href={pageUrl('dog/age-calculator')} className="text-[--dog-primary] hover:underline">Dog Age Calculator</a></li>
                <li><a href={pageUrl('dog/puppy-growth-predictor')} className="text-[--dog-primary] hover:underline">Growth Predictor</a></li>
                <li><a href={pageUrl('dog/vaccination-schedule')} className="text-[--dog-primary] hover:underline">Vaccination Schedule</a></li>
              </ul>
            </Card>
          </div>
        }
      />
    </>
  );
}
