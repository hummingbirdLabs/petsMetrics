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
import { PUPPY_CHECKLIST_FAQ } from '@/lib/seo/checklist-faq';
import { PUPPY_CHECKLIST_KNOWLEDGE } from '@/lib/seo/checklist-content';
import { generateBreadcrumbJsonLd, graphJsonLd } from '@/lib/seo/geo-meta';
import { generateFaqPageJsonLd } from '@/lib/seo/geo-faq';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
  title: 'New Puppy Checklist: Everything You Need Before Day One | petsMetrics',
  description:
    'Complete new puppy checklist with 47 items to check. Interactive, printable PDF, cost estimator, timeline, and expert tips. Download free!',
  keywords:
    'new puppy checklist, puppy preparation, first puppy, puppy essentials, puppy shopping list, new puppy supplies',
  alternates: {
    canonical: `${SITE_URL}/${locale}/dog/guide/new-puppy-checklist/`,
  },
  openGraph: {
    title: 'New Puppy Checklist: 47 Items to Check | petsMetrics',
    description:
      'Interactive, printable puppy checklist with cost estimator and timeline. Download free PDF!',
    url: `${SITE_URL}/${locale}/dog/guide/new-puppy-checklist/`,
    type: 'article',
    images: [
      {
        url: `${SITE_URL}/og/new-puppy-checklist.webp`,
        width: 1200,
        height: 630,
        alt: 'New Puppy Checklist',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'New Puppy Checklist: 47 Items to Check | petsMetrics',
    description: 'Interactive, printable puppy checklist with cost estimator and timeline. Download free PDF!',
    images: [`${SITE_URL}/og/new-puppy-checklist.webp`],
  },
};
}

const breadcrumbSchema = generateBreadcrumbJsonLd([
  { position: 1, name: 'Home', item: `${SITE_URL}/` },
  { position: 2, name: 'Dog', item: `${SITE_URL}/dog/` },
  { position: 3, name: 'New Puppy Checklist', item: '' },
]);

const faqSchema = generateFaqPageJsonLd(PUPPY_CHECKLIST_FAQ);

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Prepare for Your New Puppy',
  description: 'Complete step-by-step guide to prepare your home and family for a new puppy arrival.',
  totalTime: 'P1W',
  supply: [
    { '@type': 'HowToSupply', name: 'Crate (adult-sized with divider)' },
    { '@type': 'HowToSupply', name: 'Dog bed (machine washable)' },
    { '@type': 'HowToSupply', name: 'Stainless steel food and water bowls' },
    { '@type': 'HowToSupply', name: 'Puppy food (ask breeder for current brand)' },
    { '@type': 'HowToSupply', name: 'Adjustable collar with ID tag' },
    { '@type': 'HowToSupply', name: '6-foot leash (not retractable)' },
    { '@type': 'HowToSupply', name: 'Puppy pee pads' },
    { '@type': 'HowToSupply', name: 'Enzymatic cleaner' },
    { '@type': 'HowToSupply', name: 'Chew toys (Kong, Nylabone, rope)' },
  ],
  tool: [
    { '@type': 'HowToTool', name: 'Baby gates' },
    { '@type': 'HowToTool', name: 'Puppy-safe chew deterrent spray' },
    { '@type': 'HowToTool', name: 'First aid kit' },
  ],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Puppy-proof your home',
      text: 'Remove toxic plants, secure electrical cords, and block off unsafe areas with baby gates.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Purchase essential supplies',
      text: 'Buy crate, bed, bowls, food, collar, leash, toys, and cleaning supplies before your puppy arrives.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Schedule your first vet visit',
      text: 'Book an appointment within 48 hours of bringing your puppy home for a health baseline check.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Set up a designated safe space',
      text: 'Create a quiet area with the crate, bed, and water bowl where your puppy can retreat.',
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Establish house rules',
      text: 'All family members must agree on rules (furniture access, feeding, sleeping arrangements) before Day 1.',
    },
  ],
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'New Puppy Checklist: Everything You Need Before Day One',
  description:
    'Complete checklist for new puppy owners: supplies, vet visits, timeline, costs, and common mistakes.',
  author: { '@type': 'Organization', name: 'petsMetrics' },
  datePublished: '2026-07-03',
  dateModified: '2026-07-03',
};

const checklistSections = [
  {
    id: 'before-arrival',
    title: '🏠 Before Your Puppy Arrives (1-2 Weeks Prior)',
    description: 'Essential preparation to complete before bringing your puppy home',
    items: [
      { id: 'crate', label: 'Crate (adult-sized with puppy divider)', required: true, note: 'Large enough for adult size' },
      { id: 'bed', label: 'Dog bed (machine washable)', required: true },
      { id: 'food-bowls', label: 'Stainless steel food bowls (2)', required: true },
      { id: 'water-bowl', label: 'Stainless steel water bowl', required: true },
      { id: 'puppy-food', label: 'Puppy food (ask breeder/shelter for current brand)', required: true, note: 'Gradual transition over 7-10 days' },
      { id: 'collar', label: 'Adjustable puppy collar with ID tag', required: true },
      { id: 'leash', label: '6-foot leash (not retractable)', required: true },
      { id: 'pee-pads', label: 'Puppy pee pads', required: true },
      { id: 'enzyme-cleaner', label: 'Enzymatic cleaner (Nature\'s Miracle or similar)', required: true },
      { id: 'chew-toys', label: 'Chew toys (Kong, Nylabone, rope)', required: true },
      { id: 'baby-gates', label: 'Baby gates for area restriction', required: true },
      { id: 'deterrent-spray', label: 'Puppy-safe chew deterrent spray', required: false },
      { id: 'first-aid', label: 'First aid kit (vet wrap, gauze, antiseptic)', required: true },
    ],
  },
  {
    id: 'first-24-hours',
    title: '⏰ First 24 Hours at Home',
    description: 'The critical first day with your new puppy',
    items: [
      { id: 'vet-check', label: 'Complete health check-up at vet', required: true },
      { id: 'vaccine-records', label: 'Obtain vaccination records from breeder/shelter', required: true },
      { id: 'deworming', label: 'Confirm deworming schedule', required: true },
      { id: 'microchip', label: 'Verify microchip registration or schedule implant', required: false },
      { id: 'potty-routine', label: 'Establish potty routine (out every 1-2 hours)', required: true },
      { id: 'crate-training', label: 'Introduce crate as positive space (treats, meals)', required: true },
      { id: 'sleep-setup', label: 'Set up sleeping area near your bed', required: true },
    ],
  },
  {
    id: 'week-1-2',
    title: '📅 Week 1-2: Adjustment Period',
    description: 'Helping your puppy settle into their new home',
    items: [
      { id: 'vet-visit-baseline', label: 'Vet visit for health baseline and weight', required: true },
      { id: 'feeding-schedule', label: 'Establish feeding schedule (3-4 meals/day)', required: true },
      { id: 'crate-training-15', label: 'Begin crate training (15-minute sessions)', required: true },
      { id: 'potty-training', label: 'Start potty training with consistent cues', required: true },
      { id: 'limit-visitors', label: 'Limit visitors to reduce stress', required: true },
      { id: 'handling', label: 'Handle paws, ears, mouth daily for grooming prep', required: true },
      { id: 'clicker', label: 'Clicker training introduction', required: false },
      { id: 'name-recognition', label: 'Begin name recognition training', required: true },
    ],
  },
  {
    id: 'week-3-4',
    title: '📅 Week 3-4: Socialization Begins',
    description: 'Building positive experiences during the critical socialization window',
    items: [
      { id: 'meet-dogs', label: 'Meet vaccinated, friendly dogs in controlled settings', required: true },
      { id: 'surfaces', label: 'Introduce to new surfaces (grass, tile, gravel)', required: true },
      { id: 'desensitize', label: 'Desensitize to vacuum, doorbell, thunder sounds', required: true },
      { id: 'continue-handling', label: 'Continue handling paws, ears, mouth daily', required: true },
      { id: 'sit-command', label: 'Begin "sit" command training', required: true },
      { id: 'teeth-brushing', label: 'Introduce tooth brushing with dog toothpaste', required: false },
    ],
  },
  {
    id: 'week-5-8',
    title: '📅 Week 5-8: Critical Socialization Window',
    description: 'The most important period for preventing future behavioral problems',
    items: [
      { id: 'meet-people', label: 'Meet 100 different people (varied ages, appearances)', required: true },
      { id: 'new-locations', label: 'Visit 20+ new locations (pet-friendly stores, friends)', required: true },
      { id: 'car-rides', label: 'Ride in car (short, positive trips)', required: true },
      { id: 'grooming-tools', label: 'Experience grooming tools (brush, nail clippers)', required: true },
      { id: 'come-stay', label: 'Begin "come" and "stay" commands', required: true },
      { id: 'puppy-class', label: 'Enroll in puppy socialization class', required: false },
    ],
  },
  {
    id: 'week-9-16',
    title: '📅 Week 9-16: Adolescent Transition',
    description: 'Managing the transition from puppyhood to adolescence',
    items: [
      { id: 'two-meals', label: 'Switch to 2 meals/day', required: true },
      { id: 'leash-training', label: 'Begin leash walking training', required: true },
      { id: 'spay-neuter', label: 'Spay/neuter discussion with vet', required: false },
      { id: 'daily-brushing', label: 'Establish daily teeth brushing routine', required: true },
      { id: 'exercise', label: 'Increase exercise gradually (follow 5-minute rule)', required: true },
      { id: 'off-leash', label: 'Begin off-leash training in safe, enclosed areas', required: false },
      { id: 'complete-vaccines', label: 'Complete vaccination series', required: true },
      { id: 'grooming-routine', label: 'Establish regular grooming routine', required: true },
    ],
  },
];

const timeline = [
  {
    week: 'Week 1-2',
    title: 'Adjustment Period',
    description: 'Your puppy is adapting to a new environment, new smells, and separation from littermates.',
    tasks: [
      'Vet visit for health baseline and parasite check',
      'Establish feeding schedule (3-4 meals/day for small breeds)',
      'Begin crate training (15-minute positive sessions)',
      'Start potty training with hourly outdoor breaks',
      'Limit visitors to reduce stress and build confidence',
    ],
    cta: { text: 'Calculate Your Puppy&apos;s Feeding Amount', url: '/dog/calorie-calculator/' },
    vetVisit: { type: 'Initial Health Check', cost: '$50-$100' },
  },
  {
    week: 'Week 3-4',
    title: 'Socialization Begins',
    description: 'Why this matters: Puppies who miss socialization during this window are 3x more likely to develop fear-based aggression.',
    tasks: [
      'Meet vaccinated, friendly dogs in controlled environments',
      'Introduce to 5+ new surfaces (grass, tile, gravel, wood)',
      'Desensitize to household sounds at low volume',
      'Handle paws, ears, mouth for 5 minutes daily',
      'Begin basic "sit" command with positive reinforcement',
    ],
    cta: { text: 'View Complete Vaccination Schedule', url: '/dog/vaccination-schedule/' },
  },
  {
    week: 'Week 5-8',
    title: 'Critical Socialization Window',
    description: 'Why this matters: AVSAB states this is the single most important period for preventing adult behavioral problems.',
    tasks: [
      'Meet 100 different people (varied ages, appearances, accessories)',
      'Visit 20+ new locations (pet-friendly stores, friends\' homes)',
      'Take short car rides ending in positive experiences',
      'Experience grooming tools without restraint stress',
      'Practice "come" and "stay" with increasing distraction',
    ],
    vetVisit: { type: 'DHPP Booster #2', cost: '$25-$50' },
  },
  {
    week: 'Week 9-12',
    title: 'Adolescent Transition',
    description: 'Why this matters: Growth rate slows but mental development accelerates. Consistency prevents boundary testing.',
    tasks: [
      'Transition from 3 to 2 meals per day',
      'Begin structured leash walking (no pulling)',
      'Discuss spay/neuter timing with vet (breed-dependent)',
      'Establish daily teeth brushing routine',
      'Increase structured exercise gradually',
    ],
    cta: { text: 'Predict Your Puppy\'s Adult Size', url: '/dog/puppy-growth-predictor/' },
  },
  {
    week: 'Week 13-16',
    title: 'Adolescent Challenges',
    description: 'Why this matters: A normal fear period may occur. Patient consistency prevents long-term anxiety.',
    tasks: [
      'Expect fear period (reactivity to previously neutral stimuli)',
      'Continue consistent training despite regression',
      'Complete vaccination series (final DHPP + Rabies)',
      'Begin off-leash training in secure areas',
      'Establish lifetime grooming routine',
    ],
    vetVisit: { type: 'Final DHPP + Rabies', cost: '$50-$100' },
  },
];

const budgetSections = [
  {
    title: 'One-Time Costs',
    rows: [
      { item: 'Initial Vet Exam', cost: '$50 - $100' },
      { item: 'Vaccination Series (DHPP x3 + Rabies)', cost: '$75 - $150' },
      { item: 'Spay/Neuter', cost: '$200 - $500' },
      { item: 'Microchip', cost: '$25 - $50' },
      { item: 'Crate + Bed', cost: '$80 - $200' },
      { item: 'Bowls, Toys, Collar, Leash', cost: '$60 - $120' },
      { item: 'Training Classes (6-week course)', cost: '$100 - $250' },
      { item: 'Grooming Supplies', cost: '$30 - $60' },
    ],
    totalLabel: 'One-Time Total',
    totalCost: '$620 - $1,430',
  },
  {
    title: 'Recurring Costs (Monthly)',
    rows: [
      { item: 'High-Quality Puppy Food', cost: '$40 - $80' },
      { item: 'Heartworm/Flea Prevention', cost: '$20 - $40' },
      { item: 'Pet Insurance (optional)', cost: '$30 - $55' },
      { item: 'Treats & Chews', cost: '$15 - $30' },
      { item: 'Preventive Medications', cost: '$10 - $25' },
    ],
    totalLabel: 'Monthly Total',
    totalCost: '$115 - $230',
  },
];

const commonMistakes = [
  {
    title: 'Mistake #1: Skipping the First Vet Visit',
    whyDangerous:
      '15% of puppies from pet stores have congenital health issues. Undetected heart murmurs, hip dysplasia, or parasitic infections worsen without early intervention.',
    doInstead:
      'Schedule exam within 48 hours of adoption. Bring stool sample for parasite check and all records from breeder or shelter.',
  },
  {
    title: 'Mistake #2: Waiting Too Long for Socialization',
    whyDangerous:
      'After 16 weeks, fear responses dominate learning. Under-socialized dogs are 3x more likely to develop aggression, anxiety, or reactivity.',
    doInstead:
      'Start socialization immediately using controlled environments (your home, vaccinated friend\'s dogs) before full vaccination.',
  },
  {
    title: 'Mistake #3: Inconsistent Household Rules',
    whyDangerous:
      'If puppy is allowed on the couch "sometimes," they never learn the rule. Confusion leads to anxiety and testing of boundaries.',
    doInstead:
      'All family members must enforce identical rules from Day 1. Use a written rule sheet posted in the kitchen.',
  },
  {
    title: 'Mistake #4: Ignoring Bite Inhibition Training',
    whyDangerous:
      'Puppies learn bite inhibition from littermates. Without this feedback, hard mouthing becomes adult biting behavior.',
    doInstead:
      'Yelp "ouch!" and withdraw attention for 10 seconds when bitten too hard. Redirect to appropriate chew toys.',
  },
  {
    title: 'Mistake #5: Over-Exercise in Large Breeds',
    whyDangerous:
      'Large breed puppies\' growth plates don\'t fuse until 12-18 months. Excess impact causes lifelong joint damage and dysplasia.',
    doInstead:
      'Follow the "5-minute rule": 5 minutes of structured exercise per month of age, twice daily. No forced running or jumping.',
  },
  {
    title: 'Mistake #6: Punishment-Based Training',
    whyDangerous:
      'Yelling, hitting, or "dominance" techniques create fear, suppression, and eventual aggression. Trust is destroyed.',
    doInstead:
      'Use positive reinforcement. Reward desired behaviors within 2 seconds. Redirect unwanted behaviors to appropriate alternatives.',
  },
];

const relatedTools = [
  {
    name: 'Dog Age Calculator',
    url: '/dog/age-calculator/',
    description: 'Convert your puppy\'s age to human years and identify their current life stage.',
    icon: 'calculator',
  },
  {
    name: 'Vaccination Schedule Planner',
    url: '/dog/vaccination-schedule/',
    description: 'Generate a personalized vaccination timeline based on your puppy\'s age and region.',
    icon: 'calendar',
  },
  {
    name: 'Puppy Growth Predictor',
    url: '/dog/puppy-growth-predictor/',
    description: 'Predict your puppy\'s adult weight based on current age, breed, and measurements.',
    icon: 'chart',
  },
  {
    name: 'Calorie Calculator',
    url: '/dog/calorie-calculator/',
    description: 'Determine the right daily calorie intake for your puppy\'s optimal growth.',
    icon: 'food',
  },
];

export default async function NewPuppyChecklistPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  setRequestLocale(locale);
  const pageUrl = createPageUrl(locale);

  return (
    <>
      <JsonLdScript
        data={graphJsonLd(articleSchema, faqSchema, howToSchema, breadcrumbSchema)}
      />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: 'Home', href: '' },
            { label: 'Dog', href: 'dog' },
            { label: 'New Puppy Checklist' },
          ]}
        />
      </div>
      <SidebarLayout
        main={
          <div className="flex flex-col gap-8">
            <ChecklistHero
              title="New Puppy Checklist: Everything You Need Before Day One"
              subtitle="From supplies to vet visits, this comprehensive checklist covers everything you need to prepare for your new puppy's arrival. 47 essential items organized by timeline."
              species="dog"
              lifeStage="Puppy"
              estimatedCost={{ min: 1500, max: 3500, currency: 'USD', timeframe: 'first year' }}
              ctaText="Download Free PDF Checklist"
              keyStats={[
                { label: 'Items to Check', value: '47' },
                { label: 'Vet Visits', value: '4-6' },
                { label: 'First Year Cost', value: '$1.5-3.5K' },
                { label: 'Socialization Window', value: '16 wks' },
              ]}
            />

            <div className="prose prose-sm text-[--gray-600] max-w-none">
              <p className="text-base leading-relaxed">
                Bringing home a new puppy is one of life&apos;s greatest joys — but it also comes with
                significant responsibility. This comprehensive checklist is based on{' '}
                <strong>AAHA (American Animal Hospital Association)</strong> and{' '}
                <strong>AVSAB (American Veterinary Society of Animal Behavior)</strong> guidelines
                to ensure your puppy gets the best possible start in life. Every item has been
                selected by veterinary professionals to cover health, safety, training, and
                socialization needs during the critical first 16 weeks.
              </p>
            </div>

            <InteractiveChecklist
              sections={checklistSections}
              storageKey="puppy-checklist-progress"
              showProgressBar={true}
              allowPrint={true}
              allowPDFDownload={true}
              resetLabel="Reset Checklist"
              printLabel="Print Friendly Version"
              downloadLabel="Download PDF"
            />

            <TimelineSection
              title="Puppy Development Timeline: Week-by-Week Guide"
              timeline={timeline}
            />

            <BudgetCalculator
              title="First Year Cost Estimator"
              sections={budgetSections}
              proTip="Pet insurance can offset unexpected emergency costs. Get a personalized quote to see if it fits your budget."
              proTipLink={{ text: 'Get Insurance Quote', url: '/shared/pet-insurance-estimator/' }}
              species="dog"
            />

            <KnowledgeCards cards={PUPPY_CHECKLIST_KNOWLEDGE} locale={locale} />

            <CommonMistakes
              title="⚠️ Common Mistakes New Puppy Owners Make"
              mistakes={commonMistakes}
              species="dog"
            />

            <ChecklistFAQ
              title="Frequently Asked Questions About New Puppies"
              faqs={PUPPY_CHECKLIST_FAQ}
            />

            <ChecklistRelatedTools
              title="Helpful Tools for New Puppy Owners"
              tools={relatedTools}
              species="dog"
            />

            <ChecklistDisclaimer
              variant="veterinary"
              message="This checklist provides general reference information only and does not constitute veterinary advice. Individual puppies may have unique health needs. Always consult a licensed veterinarian for personalized care recommendations."
            />
          </div>
        }
        sidebar={
          <div className="flex flex-col gap-4">
            <Card padding="md">
              <p className="text-sm font-semibold text-[--gray-900]">Quick Stats</p>
              <ul className="mt-3 flex flex-col gap-2 text-sm text-[--gray-600]">
                <li>✓ 47 checklist items across 7 phases</li>
                <li>✓ Week-by-week timeline (0-16 weeks)</li>
                <li>✓ Budget breakdown ($1.5K-$3.5K)</li>
                <li>✓ Based on AAHA & AVSAB guidelines</li>
                <li>✓ Printable PDF included</li>
              </ul>
            </Card>
            <AffiliateBanner variant="insurance" />
            <Card padding="md">
              <p className="text-sm font-semibold text-[--gray-900]">Related Tools</p>
              <ul className="mt-3 flex flex-col gap-2 text-sm">
                <li>
                  <a href={pageUrl('dog/age-calculator')} className="text-[--dog-primary] hover:underline">
                    Dog Age Calculator
                  </a>
                </li>
                <li>
                  <a href={pageUrl('dog/calorie-calculator')} className="text-[--dog-primary] hover:underline">
                    Calorie Calculator
                  </a>
                </li>
                <li>
                  <a href={pageUrl('dog/puppy-growth-predictor')} className="text-[--dog-primary] hover:underline">
                    Puppy Growth Predictor
                  </a>
                </li>
                <li>
                  <a href={pageUrl('dog/vaccination-schedule')} className="text-[--dog-primary] hover:underline">
                    Vaccination Schedule
                  </a>
                </li>
              </ul>
            </Card>
          </div>
        }
      />
    </>
  );
}
