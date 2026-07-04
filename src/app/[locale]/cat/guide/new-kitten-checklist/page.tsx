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
import { KITTEN_CHECKLIST_FAQ } from '@/lib/seo/checklist-faq';
import { KITTEN_CHECKLIST_KNOWLEDGE } from '@/lib/seo/checklist-content';
import { generateBreadcrumbJsonLd, graphJsonLd } from '@/lib/seo/geo-meta';
import { generateFaqPageJsonLd } from '@/lib/seo/geo-faq';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  return {
  title: 'New Kitten Checklist: Everything You Need Before Day One | petsMetrics',
  description:
    'Complete new kitten checklist with 40 items to check. Interactive, printable PDF, cost estimator, timeline, and expert tips. Based on AAFP feline guidelines.',
  keywords:
    'new kitten checklist, kitten preparation, first kitten, kitten essentials, kitten shopping list, new kitten supplies',
  alternates: {
    canonical: `${SITE_URL}/${locale}/cat/guide/new-kitten-checklist/`,
  },
  openGraph: {
    title: 'New Kitten Checklist: 40 Items to Check | petsMetrics',
    description:
      'Interactive, printable kitten checklist with cost estimator and timeline. Download free PDF!',
    url: `${SITE_URL}/${locale}/cat/guide/new-kitten-checklist/`,
    type: 'article',
    images: [{ url: `${SITE_URL}/og/new-kitten-checklist.webp`, width: 1200, height: 630, alt: 'New Kitten Checklist' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'New Kitten Checklist: 40 Items to Check | petsMetrics',
    description: 'Interactive, printable kitten checklist with cost estimator and timeline. Download free PDF!',
    images: [`${SITE_URL}/og/new-kitten-checklist.webp`],
  },
};
}

const breadcrumbSchema = generateBreadcrumbJsonLd([
  { position: 1, name: 'Home', item: `${SITE_URL}/` },
  { position: 2, name: 'Cat', item: `${SITE_URL}/cat/` },
  { position: 3, name: 'New Kitten Checklist', item: '' },
]);

const faqSchema = generateFaqPageJsonLd(KITTEN_CHECKLIST_FAQ);

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'New Kitten Checklist: Everything You Need Before Day One',
  description: 'Complete new kitten checklist with 40 items to check. Interactive, printable PDF, cost estimator, timeline, and expert tips.',
  author: { '@type': 'Organization', name: 'petsMetrics' },
  datePublished: '2026-07-03',
  dateModified: '2026-07-03',
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Prepare for Your New Kitten',
  description: 'Complete step-by-step guide to prepare your home and family for a new kitten arrival.',
  totalTime: 'P1W',
  supply: [
    { '@type': 'HowToSupply', name: 'Litter box (one per cat + one extra)' },
    { '@type': 'HowToSupply', name: 'Unscented clumping litter' },
    { '@type': 'HowToSupply', name: 'Wide shallow food bowls (whisker-friendly)' },
    { '@type': 'HowToSupply', name: 'Kitten food (wet and dry)' },
    { '@type': 'HowToSupply', name: 'Scratching post (tall, sturdy sisal)' },
    { '@type': 'HowToSupply', name: 'Cat tree or perch' },
    { '@type': 'HowToSupply', name: 'Hard-sided carrier' },
  ],
  tool: [
    { '@type': 'HowToTool', name: 'Nail clippers (cat-specific)' },
    { '@type': 'HowToTool', name: 'Brush (breed-dependent)' },
    { '@type': 'HowToTool', name: 'Toys (wand toys, balls, crinkle toys)' },
  ],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Kitten-proof one room', text: 'Remove toxic plants, secure cords, and set up a safe room with litter, food, water, and bed.' },
    { '@type': 'HowToStep', position: 2, name: 'Purchase essential supplies', text: 'Buy litter box, food, bowls, scratching post, carrier, and toys before your kitten arrives.' },
    { '@type': 'HowToStep', position: 3, name: 'Schedule first vet visit', text: 'Book an appointment within 48 hours for FIV/FeLV testing and vaccination planning.' },
    { '@type': 'HowToStep', position: 4, name: 'Introduce to safe room first', text: 'Let your kitten decompress in the safe room for 3-7 days before exploring the full home.' },
    { '@type': 'HowToStep', position: 5, name: 'Gradual home introduction', text: 'Expand access room by room over 1-2 weeks, always providing retreat to the safe room.' },
  ],
};

const checklistSections = [
  {
    id: 'before-arrival',
    title: '🏠 Before Your Kitten Arrives (1-2 Weeks Prior)',
    description: 'Essential preparation to complete before bringing your kitten home',
    items: [
      { id: 'litter-box', label: 'Litter box (one per cat + one extra, so 2 for 1 kitten)', required: true },
      { id: 'litter', label: 'Unscented clumping litter (fine grain preferred)', required: true },
      { id: 'litter-mat', label: 'Litter mat (reduces tracking)', required: false },
      { id: 'food-bowls', label: 'Wide, shallow food bowls (whisker-friendly)', required: true },
      { id: 'water-bowl', label: 'Water bowl or cat fountain', required: true },
      { id: 'kitten-food', label: 'Kitten food (wet + dry, same as breeder/shelter initially)', required: true },
      { id: 'scratching-post', label: 'Scratching post (tall, sturdy sisal — 30+ inches)', required: true },
      { id: 'cat-tree', label: 'Cat tree or elevated perch', required: true },
      { id: 'carrier', label: 'Hard-sided carrier (for safe car travel)', required: true },
      { id: 'nail-clippers', label: 'Cat-specific nail clippers', required: true },
      { id: 'brush', label: 'Brush (breed-dependent: slicker for longhairs, rubber for shorthairs)', required: true },
      { id: 'toys', label: 'Toys (wand toys, balls, crinkle toys, catnip mice)', required: true },
    ],
  },
  {
    id: 'first-24-hours',
    title: '⏰ First 24 Hours at Home',
    description: 'The critical first day — prioritize decompression over handling',
    items: [
      { id: 'safe-room', label: 'Set up safe room (one quiet room with all essentials)', required: true },
      { id: 'show-litter', label: 'Show kitten location of litter box, food, and water', required: true },
      { id: 'minimal-handling', label: 'Minimal handling for first few hours — let kitten explore', required: true },
      { id: 'vet-schedule', label: 'Schedule vet appointment within 48 hours', required: true },
      { id: 'supervised-intro', label: 'Supervised introductions to children and existing pets', required: true },
      { id: 'own-pace', label: 'Let kitten explore at their own pace — no forcing', required: true },
    ],
  },
  {
    id: 'week-1-2',
    title: '📅 Week 1-2: Adjustment Period',
    description: 'Helping your kitten settle into their new home',
    items: [
      { id: 'vet-visit', label: 'Vet visit within 48 hours for health baseline', required: true },
      { id: 'fiv-felv', label: 'FIV/FeLV blood test', required: true },
      { id: 'fecal-test', label: 'Fecal parasite test', required: true },
      { id: 'handling', label: 'Begin handling exercises (paws, mouth, ears) 5 min/day', required: true },
      { id: 'feeding-schedule', label: 'Establish feeding schedule (4 meals/day initially)', required: true },
      { id: 'litter-training', label: 'Litter box training (usually instinctive — just show location)', required: true },
      { id: 'safe-room-complete', label: 'Safe room introduction complete — kitten is confident', required: true },
    ],
  },
  {
    id: 'week-3-4',
    title: '📅 Week 3-4: Socialization & First Vaccines',
    description: 'Building positive associations and beginning preventive care',
    items: [
      { id: 'fvrcp-1', label: 'FVRCP vaccine #1 (if not already given)', required: true },
      { id: 'deworming', label: 'Deworming treatment', required: true },
      { id: 'meet-family', label: 'Meet all family members (one at a time, calm)', required: true },
      { id: 'dog-intro', label: 'Introduction to gentle dogs (if applicable, supervised)', required: false },
      { id: 'brushing', label: 'Begin gentle brushing routine', required: false },
    ],
  },
  {
    id: 'week-5-8',
    title: '📅 Week 5-8: Active Socialization',
    description: 'Expanding experiences and building confidence',
    items: [
      { id: 'fvrcp-2', label: 'FVRCP vaccine #2', required: true },
      { id: 'fiv-vaccine', label: 'FIV vaccine series (if outdoor access planned)', required: false },
      { id: 'leash-training', label: 'Leash/harness training introduction', required: false },
      { id: 'carrier-practice', label: 'Carrier practice with positive associations (treats inside)', required: true },
      { id: 'nail-trim', label: 'Nail trimming routine (every 2 weeks)', required: true },
      { id: 'play-sessions', label: 'Daily play sessions (hunting sequence: stalk, chase, pounce)', required: true },
    ],
  },
  {
    id: 'week-9-16',
    title: '📅 Week 9-16: Independence & Adolescence',
    description: 'Transitioning to adult routines and managing adolescent behavior',
    items: [
      { id: 'fvrcp-3', label: 'FVRCP vaccine #3 (final dose at/after 16 weeks)', required: true },
      { id: 'rabies', label: 'Rabies vaccine (per local law, typically 12-16 weeks)', required: true },
      { id: 'spay-neuter', label: 'Spay/neuter discussion (typically 4-6 months)', required: false },
      { id: 'three-meals', label: 'Transition to 3 meals/day', required: true },
      { id: 'microchip', label: 'Microchip confirmation or implantation', required: true },
      { id: 'adult-food', label: 'Begin adult food transition (around 10-12 months)', required: false },
      { id: 'dental-care', label: 'Dental care introduction (brushing or dental treats)', required: false },
    ],
  },
];

const timeline = [
  {
    week: 'Week 1-2',
    title: 'Adjustment Period',
    description: 'Your kitten is adapting to a new environment, new smells, and separation from littermates.',
    tasks: [
      'Vet visit for FIV/FeLV test and fecal parasite check',
      'Establish feeding schedule (4 meals/day for kittens under 3 months)',
      'Show litter box location (most kittens use instinctively)',
      'Begin handling exercises (paws, ears, mouth) for grooming prep',
      'Keep kitten in safe room — no full home access yet',
    ],
    vetVisit: { type: 'Initial Health Check + FIV/FeLV', cost: '$75-$150' },
  },
  {
    week: 'Week 3-4',
    title: 'Socialization Begins',
    description: 'Why this matters: Kittens socialized to varied people and handling before 12 weeks show reduced fear and aggression as adults.',
    tasks: [
      'FVRCP vaccine #1 (feline distemper combination)',
      'Deworming treatment (common in shelter kittens)',
      'Introduce to all family members one at a time',
      'Begin gentle brushing and nail trimming practice',
      'Expand access to one additional room',
    ],
  },
  {
    week: 'Week 5-8',
    title: 'Active Socialization',
    description: 'Why this matters: AAFP confirms this is the peak learning period for environmental confidence.',
    tasks: [
      'FVRCP vaccine #2',
      'Introduce leash/harness (5-minute positive sessions)',
      'Practice carrier entry with treats (prepare for future vet visits)',
      'Daily play sessions mimicking hunting sequence',
      'Nail trimming every 2 weeks',
    ],
    vetVisit: { type: 'FVRCP #2', cost: '$25-$50' },
  },
  {
    week: 'Week 9-12',
    title: 'Independence Building',
    description: 'Why this matters: Kittens develop confidence and begin testing boundaries. Consistency prevents unwanted behaviors.',
    tasks: [
      'FVRCP vaccine #3 (must be at/after 16 weeks)',
      'Rabies vaccine (legally required in most jurisdictions)',
      'Transition from 4 to 3 meals per day',
      'Confirm microchip registration',
      'Discuss spay/neuter timing (typically 4-6 months)',
    ],
    vetVisit: { type: 'FVRCP #3 + Rabies', cost: '$50-$100' },
  },
  {
    week: 'Week 13-16',
    title: 'Adolescent Transition',
    description: 'Why this matters: Kittens enter sexual maturity. Spay/neuter prevents unwanted litters and reduces behavioral issues.',
    tasks: [
      'Spay/neuter procedure (typically 4-6 months, 2+ lbs body weight)',
      'Transition to 2 meals per day',
      'Begin adult food transition (around 10-12 months)',
      'Establish dental care routine',
      'Continue socialization maintenance',
    ],
    vetVisit: { type: 'Spay/Neuter', cost: '$100-$300' },
  },
];

const budgetSections = [
  {
    title: 'One-Time Costs',
    rows: [
      { item: 'Initial Vet Exam + FIV/FeLV Test', cost: '$75 - $150' },
      { item: 'FVRCP Vaccine Series (3 doses)', cost: '$60 - $120' },
      { item: 'Rabies Vaccine', cost: '$15 - $30' },
      { item: 'Spay/Neuter', cost: '$100 - $300' },
      { item: 'Microchip', cost: '$25 - $50' },
      { item: 'Litter Box + Supplies', cost: '$30 - $60' },
      { item: 'Carrier', cost: '$30 - $60' },
      { item: 'Scratching Post + Cat Tree', cost: '$50 - $150' },
      { item: 'Food Bowls, Toys, Brush', cost: '$30 - $60' },
    ],
    totalLabel: 'One-Time Total',
    totalCost: '$415 - $980',
  },
  {
    title: 'Recurring Costs (Monthly)',
    rows: [
      { item: 'Kitten Food (wet + dry)', cost: '$30 - $60' },
      { item: 'Litter', cost: '$15 - $30' },
      { item: 'Flea/Parasite Prevention', cost: '$10 - $20' },
      { item: 'Pet Insurance (optional)', cost: '$15 - $35' },
      { item: 'Treats & Toys', cost: '$10 - $20' },
    ],
    totalLabel: 'Monthly Total',
    totalCost: '$80 - $165',
  },
];

const commonMistakes = [
  {
    title: 'Mistake #1: Giving Full Home Access Immediately',
    whyDangerous: 'Overwhelming a new kitten with the entire house causes anxiety and hiding. Kittens need a safe base to retreat to.',
    doInstead: 'Use one safe room for 1-2 weeks. Gradually expand access only after the kitten shows confidence and uses the litter box reliably.',
  },
  {
    title: 'Mistake #2: Using Scented Litter',
    whyDangerous: 'Cats have 200 million scent receptors (humans have 5 million). Scented litter is aversive and causes litter box avoidance.',
    doInstead: 'Use unscented clumping litter with fine grain texture. Scoop at least daily.',
  },
  {
    title: 'Mistake #3: Skipping the Scratching Post',
    whyDangerous: 'Scratching is a biological need (territory marking, claw health, stretching). Without appropriate outlets, furniture becomes the target.',
    doInstead: 'Provide a tall (30+ inch), sturdy sisal scratching post near the sleeping area. Reward use with treats.',
  },
  {
    title: 'Mistake #4: Rough Play with Hands',
    whyDangerous: 'Kittens taught that hands are toys grow into adults who bite and scratch during petting. This is the #1 reason cats are surrendered.',
    doInstead: 'Always use wand toys for play. If teeth or skin touch skin, immediately stop play and redirect to a toy.',
  },
  {
    title: 'Mistake #5: Free Feeding Dry Food',
    whyDangerous: 'Free feeding contributes to obesity (60% of indoor cats are overweight) and makes it impossible to monitor appetite changes (early illness indicator).',
    doInstead: 'Feed measured meals 2-3 times daily. Use puzzle feeders to simulate hunting behavior.',
  },
];

const relatedTools = [
  { name: 'Cat Age Calculator', url: '/cat/age-calculator/', description: 'Convert your kitten\'s age to human years and identify their life stage.' },
  { name: 'Vaccination Schedule', url: '/cat/vaccination-schedule/', description: 'Create a personalized vaccination timeline for your kitten.' },
  { name: 'Hydration Calculator', url: '/cat/hydration-calculator/', description: 'Ensure your kitten gets enough water for optimal health.' },
  { name: 'BCS Weight Tracker', url: '/cat/bcs-weight-tracker/', description: 'Track your kitten\'s growth and body condition.' },
];

export default async function NewKittenChecklistPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  setRequestLocale(locale);
  const pageUrl = createPageUrl(locale);

  return (
    <>
      <JsonLdScript data={graphJsonLd(articleSchema, faqSchema, howToSchema, breadcrumbSchema)} />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Home', href: '' }, { label: 'Cat', href: 'cat' }, { label: 'New Kitten Checklist' }]} />
      </div>
      <SidebarLayout
        main={
          <div className="flex flex-col gap-8">
            <ChecklistHero
              title="New Kitten Checklist: Everything You Need Before Day One"
              subtitle="From supplies to vet visits, this comprehensive checklist covers everything you need to prepare for your new kitten's arrival. 40 essential items organized by timeline."
              species="cat"
              lifeStage="Kitten"
              estimatedCost={{ min: 1000, max: 2500, currency: 'USD', timeframe: 'first year' }}
              ctaText="Download Free PDF Checklist"
              keyStats={[
                { label: 'Items to Check', value: '40' },
                { label: 'Vet Visits', value: '4-5' },
                { label: 'First Year Cost', value: '$1-2.5K' },
                { label: 'Socialization', value: '2-7 wks' },
              ]}
            />
            <p className="text-base leading-relaxed text-[--gray-600]">
              Bringing home a new kitten is a joyful experience — but kittens have unique needs compared to puppies. This comprehensive checklist is based on <strong>AAFP (American Association of Feline Practitioners)</strong> and <strong>ISFM (International Society of Feline Medicine)</strong> guidelines to ensure your kitten gets the best possible start. Every item covers health, safety, socialization, and environmental needs during the critical first 16 weeks.
            </p>
            <InteractiveChecklist
              sections={checklistSections}
              storageKey="kitten-checklist-progress"
              showProgressBar={true}
              allowPrint={true}
              allowPDFDownload={true}
            />
            <TimelineSection title="Kitten Development Timeline: Week-by-Week Guide" timeline={timeline} />
            <BudgetCalculator
              title="First Year Cost Estimator"
              sections={budgetSections}
              proTip="Pet insurance for cats is more affordable than dogs. Get a personalized quote to see if it fits your budget."
              proTipLink={{ text: 'Get Quote', url: '/shared/pet-insurance-estimator/' }}
              species="cat"
            />
            <KnowledgeCards cards={KITTEN_CHECKLIST_KNOWLEDGE} locale={locale} />
            <CommonMistakes title="⚠️ Common Mistakes New Kitten Owners Make" mistakes={commonMistakes} species="cat" />
            <ChecklistFAQ title="Frequently Asked Questions About New Kittens" faqs={KITTEN_CHECKLIST_FAQ} />
            <ChecklistRelatedTools title="Helpful Tools for New Kitten Owners" tools={relatedTools} species="cat" />
            <ChecklistDisclaimer variant="veterinary" />
          </div>
        }
        sidebar={
          <div className="flex flex-col gap-4">
            <Card padding="md">
              <p className="text-sm font-semibold text-[--gray-900]">Quick Stats</p>
              <ul className="mt-3 flex flex-col gap-2 text-sm text-[--gray-600]">
                <li>✓ 40 checklist items across 6 phases</li>
                <li>✓ Week-by-week timeline (0-16 weeks)</li>
                <li>✓ Budget breakdown ($1K-$2.5K)</li>
                <li>✓ Based on AAFP & ISFM guidelines</li>
                <li>✓ Printable PDF included</li>
              </ul>
            </Card>
            <AffiliateBanner variant="insurance" />
            <Card padding="md">
              <p className="text-sm font-semibold text-[--gray-900]">Related Tools</p>
              <ul className="mt-3 flex flex-col gap-2 text-sm">
                <li><a href={pageUrl('cat/age-calculator')} className="text-[--cat-primary] hover:underline">Cat Age Calculator</a></li>
                <li><a href={pageUrl('cat/vaccination-schedule')} className="text-[--cat-primary] hover:underline">Vaccination Schedule</a></li>
                <li><a href={pageUrl('cat/hydration-calculator')} className="text-[--cat-primary] hover:underline">Hydration Calculator</a></li>
                <li><a href={pageUrl('cat/bcs-weight-tracker')} className="text-[--cat-primary] hover:underline">BCS Weight Tracker</a></li>
              </ul>
            </Card>
          </div>
        }
      />
    </>
  );
}
