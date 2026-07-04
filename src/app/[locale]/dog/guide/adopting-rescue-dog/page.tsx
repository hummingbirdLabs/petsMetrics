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
import { RESCUE_DOG_FAQ } from '@/lib/seo/checklist-faq';
import { RESCUE_DOG_KNOWLEDGE } from '@/lib/seo/checklist-content';
import { generateBreadcrumbJsonLd, graphJsonLd } from '@/lib/seo/geo-meta';
import { generateFaqPageJsonLd } from '@/lib/seo/geo-faq';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
  title: 'Adopting a Rescue Dog Checklist: Complete Guide | petsMetrics',
  description:
    'Complete rescue dog adoption checklist: 3-3-3 rule timeline, home preparation, vet first visit, behavioral assessment, and integration with existing pets. Based on AVSAB guidelines.',
  keywords:
    'adopting rescue dog, rescue dog checklist, 3-3-3 rule, shelter dog adoption, rescue dog first week, rescue dog behavioral assessment',
  alternates: {
    canonical: `${SITE_URL}/${locale}/dog/guide/adopting-rescue-dog/`,
  },
  openGraph: {
    title: 'Rescue Dog Adoption Checklist — Complete Guide | petsMetrics',
    description:
      'Step-by-step rescue dog adoption guide with 3-3-3 rule timeline, home prep, and integration tips.',
    url: `${SITE_URL}/${locale}/dog/guide/adopting-rescue-dog/`,
    type: 'article',
    images: [{ url: `${SITE_URL}/og/rescue-dog-checklist.webp`, width: 1200, height: 630, alt: 'Rescue Dog Adoption Checklist' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rescue Dog Adoption Checklist — Complete Guide | petsMetrics',
    description: 'Step-by-step rescue dog adoption guide with 3-3-3 rule timeline, home prep, and integration tips.',
    images: [`${SITE_URL}/og/rescue-dog-checklist.webp`],
  },
};
}

const breadcrumbSchema = generateBreadcrumbJsonLd([
  { position: 1, name: 'Home', item: `${SITE_URL}/` },
  { position: 2, name: 'Dog', item: `${SITE_URL}/dog/` },
  { position: 3, name: 'Adopting a Rescue Dog', item: '' },
]);

const faqSchema = generateFaqPageJsonLd(RESCUE_DOG_FAQ);

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Adopting a Rescue Dog Checklist: Complete Guide',
  description: 'Complete rescue dog adoption checklist with 3-3-3 rule timeline and integration guide.',
  author: { '@type': 'Organization', name: 'petsMetrics' },
  datePublished: '2026-07-03',
  dateModified: '2026-07-03',
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Successfully Adopt and Integrate a Rescue Dog',
  description: 'Step-by-step guide from pre-adoption preparation through the first 3 months.',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Research shelters and meet potential dogs', text: 'Interview shelter staff about the dog\'s history, health, and behavioral observations.' },
    { '@type': 'HowToStep', position: 2, name: 'Prepare your home and family', text: 'Establish a safe room, remove hazards, and brief all family members on the 3-3-3 adjustment timeline.' },
    { '@type': 'HowToStep', position: 3, name: 'Bring your dog home and allow decompression', text: 'Provide a quiet environment, limit stimulation, and let the dog explore at their own pace.' },
    { '@type': 'HowToStep', position: 4, name: 'Schedule first vet visit within 48-72 hours', text: 'Establish health baseline, verify vaccinations, test for parasites, and begin preventive care plan.' },
    { '@type': 'HowToStep', position: 5, name: 'Implement 3-3-3 adjustment timeline', text: 'Follow the roadmap: 3 days of decompression, 3 weeks of routine learning, 3 months to true bonding.' },
    { '@type': 'HowToStep', position: 6, name: 'Begin structured integration and training', text: 'After the adjustment period, introduce broader socialization and basic obedience with positive reinforcement.' },
  ],
};

const checklistSections = [
  {
    id: 'pre-adoption',
    title: '📋 Before Adoption (Research & Preparation)',
    description: 'Research and complete these items before bringing a rescue dog home',
    items: [
      { id: 'research-breeder', label: 'Research shelters/rescues and their behavioral assessment process', required: true },
      { id: 'interview-staff', label: 'Interview staff about dog\'s history, health, known triggers', required: true },
      { id: 'meet-greet', label: 'Arrange meet-and-greet with all family members (including existing pets)', required: true },
      { id: 'vet-records', label: 'Request full vet records, vaccination history, microchip info', required: true },
      { id: 'safe-room', label: 'Prepare a safe room (one quiet room with bed, water, no hazards)', required: true },
      { id: 'supplies', label: 'Purchase leash, collar, ID tag, food, bowls, crate, bed before arrival', required: true },
      { id: 'household-rules', label: 'All family members agree on rules and routine before Day 1', required: true },
      { id: 'trainer-identify', label: 'Identify a force-free certified trainer for potential support', required: false },
    ],
  },
  {
    id: 'day-1',
    title: '🚗 Day One: Bringing Your Dog Home',
    description: 'The first hours — prioritize decompression over excitement',
    items: [
      { id: 'leashed-arrival', label: 'Dog remains leashed for initial home exploration', required: true },
      { id: 'safe-room-first', label: 'Enter safe room first — let dog decompress before full home access', required: true },
      { id: 'minimal-handling', label: 'Minimal handling — let dog approach first, no forced interaction', required: true },
      { id: 'potty-break', label: 'Establish potty routine immediately (take to designated spot first)', required: true },
      { id: 'observe-stress', label: 'Observe stress signals (lip licking, whale eye, tucked tail, shaking)', required: true },
      { id: 'limit-guests', label: 'No visitors for first 7 days minimum', required: true },
      { id: 'consistent-routine', label: 'Start consistent daily routine from Day 1 (feeding, walks, bedtime)', required: true },
    ],
  },
  {
    id: 'first-week',
    title: '📅 First Week: Decompression (3-3-3 Rule Phase 1)',
    description: 'Your dog is overwhelmed — this is normal, not rejection',
    items: [
      { id: 'vet-visit', label: 'Vet visit within 48-72 hours for health baseline', required: true },
      { id: 'fecal-test', label: 'Fecal parasite test (common in shelter populations)', required: true },
      { id: 'heartworm-test', label: 'Heartworm test and tick-borne disease panel', required: true },
      { id: 'vaccination-verify', label: 'Verify vaccination status and schedule boosters as needed', required: true },
      { id: 'no-forced-contact', label: 'No forced contact — let dog initiate all interaction', required: true },
      { id: 'monitor-eating', label: 'Monitor appetite — stress may suppress eating for 2-3 days', required: true },
      { id: 'potty-success', label: 'Praise successful elimination outside — accidents are not failure', required: true },
    ],
  },
  {
    id: 'week-2-3',
    title: '📅 Week 2-3: Routine Learning (3-3-3 Phase 2)',
    description: 'Your dog is settling in, learning the routine, and showing more personality',
    items: [
      { id: 'expand-territory', label: 'Gradually expand access beyond safe room', required: true },
      { id: 'basic-training', label: 'Begin basic positive-reinforcement training (name, "sit", "look")', required: true },
      { id: 'leash-walks', label: 'Start short leash walks in low-traffic areas', required: false },
      { id: 'body-language', label: 'Learn your dog\'s specific stress and comfort signals', required: true },
      { id: 'alone-time', label: 'Begin very short alone-time practice (seconds to minutes)', required: false },
      { id: 'pet-intro', label: 'If existing pets, begin scent swapping (blanket/collar exchange)', required: false },
    ],
  },
  {
    id: 'month-2-3',
    title: '📅 Month 2-3: Bonding & True Personality (3-3-3 Phase 3)',
    description: 'Your dog feels secure and is showing their true personality',
    items: [
      { id: 'increase-social', label: 'Increase social walks, pet-friendly stores, varied environments', required: false },
      { id: 'dog-parks', label: 'Avoid dog parks until trust is fully established', required: false },
      { id: 'pet-integration', label: 'Continue supervised existing pet integration', required: true },
      { id: 'reinforce-training', label: 'Reinforce basic manners with consistent routine', required: true },
      { id: 'assess-progress', label: 'Assess behavioral progress and consider professional trainer if needed', required: false },
    ],
  },
];

const timeline = [
  {
    week: 'Day 1-3',
    title: '3-3-3 Rule: Decompression',
    description: 'Your dog is in survival mode — overwhelmed, possibly not eating, hiding, or fearful.',
    tasks: [
      'Allow dog to hide — do not force interaction',
      'Provide safe, quiet space with bed and water',
      'Maintain consistent feeding schedule (twice daily)',
      'Praise any positive behavior immediately',
      'Do not visit other homes or introduce new people',
    ],
  },
  {
    week: 'Week 1',
    title: 'Vet Assessment & Health Baseline',
    description: 'Establish medical baseline while supporting emotional decompression.',
    tasks: [
      'Complete health exam within 48-72 hours',
      'Test for intestinal parasites and heartworm',
      'Verify microchip and vaccination records',
      'Begin feeding same schedule and food consistently',
      'Start potty routine with praise for outdoor elimination',
    ],
    vetVisit: { type: 'Post-adoption Health Baseline', cost: '$75-$200' },
  },
  {
    week: 'Week 2-3',
    title: '3-3-3 Rule: Settling In',
    description: 'Dog learns routine, begins showing personality, tests boundaries — this is normal.',
    tasks: [
      'Expand access to more rooms (supervised)',
      'Begin short positive-reinforcement training sessions',
      'Introduce leash walks in quiet areas',
      'Observe emerging personality and preferences',
      'Address any house-soiling with enzymatic cleaner and routine adjustment',
    ],
  },
  {
    week: 'Month 1-2',
    title: '3-3-3 Rule: Bonding',
    description: 'Dog shows true personality, trust deepens, and the bond becomes secure.',
    tasks: [
      'Increase social experiences (controlled, positive)',
      'Introduce to 5-10 new people in safe settings',
      'Continue consistent training and routine',
      'Assess exercise needs and adjust walks',
      'Celebrate progress — first tail wag, first play, first "I love you" moment',
    ],
  },
  {
    week: 'Month 3+',
    title: 'Full Integration',
    description: 'Your rescue dog is now a family member with established trust and routines.',
    tasks: [
      'Dog shows consistent personality and confidence',
      'Integration with other pets (if applicable) stabilized',
      'Established exercise, feeding, and sleep routines',
      'Ongoing training and socialization enrichment',
      'Annual preventive care schedule established',
    ],
  },
];

const commonMistakes = [
  {
    title: 'Mistake #1: Expecting Instant Gratification',
    whyDangerous: 'Flooding a rescue dog with attention, visitors, and new places overwhelms them and can trigger fear-based aggression or shutdown.',
    doInstead: 'Follow the 3-3-3 rule. Let your dog dictate the pace of contact. Trust takes weeks to months, not hours.',
  },
  {
    title: 'Mistake #2: Interpreting Fear as "Difficult"',
    whyDangerous: 'Fearful behavior is communication. Yelling or punishing a fear response damages trust permanently.',
    doInstead: 'Provide safety and distance. Use counter-conditioning at the dog\'s threshold. Consult a force-free trainer for support.',
  },
  {
    title: 'Mistake #3: Skipping the Safe Room Setup',
    whyDangerous: 'Immediate access to the entire house is overwhelming. Dogs without a retreat become hypervigilant and anxious.',
    doInstead: 'Use one small room as a decompression base. Gradually expand access only after 1-2 weeks of calm behavior.',
  },
  {
    title: 'Mistake #4: Meeting Existing Pets Immediately',
    whyDangerous: 'Rushing introductions can create lifelong inter-animal aggression or fear dynamics.',
    doInstead: 'Wait at least 1 week before scent swapping. Allow visual access through baby gates. Supervise all face-to-face meetings for weeks.',
  },
  {
    title: 'Mistake #5: Giving Up During the Fear Period',
    whyDangerous: 'Rescue dogs often show a temporary fear period (week 2-4). Families who return them during this window cause compounding attachment trauma.',
    doInstead: 'Commit to at least 3 months before evaluating fit. The investment pays off in a permanently bonded companion.',
  },
];

const relatedTools = [
  { name: 'Dog Age Calculator', url: '/dog/age-calculator/', description: 'Determine your rescue dog\'s approximate age and life stage.' },
  { name: 'Vaccination Schedule', url: '/dog/vaccination-schedule/', description: 'Create a vaccination catch-up timeline for your new dog.' },
  { name: 'Calorie Calculator', url: '/dog/calorie-calculator/', description: 'Calculate feeding amounts for proper weight management.' },
  { name: 'EU Pet Travel Checker', url: '/shared/eu-pet-travel-checker/', description: 'Check travel requirements if adopting from abroad.' },
];

export default async function AdoptingRescueDogPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  setRequestLocale(locale);
  const pageUrl = createPageUrl(locale);

  return (
    <>
      <JsonLdScript data={graphJsonLd(articleSchema, faqSchema, howToSchema, breadcrumbSchema)} />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Home', href: '' }, { label: 'Dog', href: 'dog' }, { label: 'Rescue Dog Adoption' }]} />
      </div>
      <SidebarLayout
        main={
          <div className="flex flex-col gap-8">
            <ChecklistHero
              title="Adopting a Rescue Dog Checklist: 3-3-3 Rule & Complete Guide"
              subtitle="From shelter research through the first 3 months home. This evidence-based checklist covers decompression, health assessment, integration with existing pets, and the 3-3-3 adjustment timeline."
              species="dog"
              lifeStage="Rescue"
              estimatedCost={{ min: 800, max: 2500, currency: 'USD', timeframe: 'first year' }}
              ctaText="Download Rescue Adoption PDF"
              keyStats={[
                { label: 'Total Items', value: '40' },
                { label: 'Timeline', value: '3 months' },
                { label: 'Key Rule', value: '3-3-3' },
                { label: 'First Vet Visit', value: '48-72h' },
              ]}
            />
            <p className="text-base leading-relaxed text-[--gray-600]">
              Adopting a rescue dog is a deeply rewarding act — but rescue dogs come with unique adjustment needs. The <strong>3-3-3 rule</strong> (developed by rescue organizations) provides a realistic timeline: <strong>3 days</strong> to decompress, <strong>3 weeks</strong> to learn routines, and <strong>3 months</strong> to feel truly at home. This checklist guides you through every phase with patience, evidence-based preparation, and force-free integration techniques recommended by AVSAB and ASPCA.
            </p>
            <InteractiveChecklist
              sections={checklistSections}
              storageKey="rescue-dog-checklist"
              showProgressBar={true}
              allowPrint={true}
              allowPDFDownload={true}
            />
            <TimelineSection title="Rescue Dog Adjustment Timeline" timeline={timeline} />
            <KnowledgeCards cards={RESCUE_DOG_KNOWLEDGE} locale={locale} />
            <CommonMistakes title="⚠️ Common Rescue Dog Adoption Mistakes" mistakes={commonMistakes} species="dog" />
            <ChecklistFAQ title="Frequently Asked Questions About Rescue Dog Adoption" faqs={RESCUE_DOG_FAQ} />
            <ChecklistRelatedTools title="Helpful Tools for Rescue Dog Owners" tools={relatedTools} species="dog" />
            <ChecklistDisclaimer variant="veterinary" />
          </div>
        }
        sidebar={
          <div className="flex flex-col gap-4">
            <Card padding="md">
              <p className="text-sm font-semibold text-[--gray-900]">3-3-3 Rule Summary</p>
              <ul className="mt-3 flex flex-col gap-2 text-sm text-[--gray-600]">
                <li><strong>3 Days:</strong> Decompress, observe, be patient</li>
                <li><strong>3 Weeks:</strong> Learn routine, show personality</li>
                <li><strong>3 Months:</strong> Feel at home, bond forms</li>
              </ul>
            </Card>
            <AffiliateBanner variant="insurance" />
            <Card padding="md">
              <p className="text-sm font-semibold text-[--gray-900]">Related Tools</p>
              <ul className="mt-3 flex flex-col gap-2 text-sm">
                <li><a href={pageUrl('dog/age-calculator')} className="text-[--dog-primary] hover:underline">Dog Age Calculator</a></li>
                <li><a href={pageUrl('dog/vaccination-schedule')} className="text-[--dog-primary] hover:underline">Vaccination Schedule</a></li>
                <li><a href={pageUrl('shared/pet-insurance-estimator')} className="text-[--dog-primary] hover:underline">Pet Insurance</a></li>
              </ul>
            </Card>
          </div>
        }
      />
    </>
  );
}
