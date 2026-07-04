/**
 * Checklist pages Knowledge Card content — Phase 2 Life Stage Checklists
 * Each card provides structured, citable information for AI search engines.
 */
import type { KnowledgeCard } from './geo-content';
import { AUTHORITY_SOURCES } from './geo-meta';

// ── New Puppy Checklist Knowledge Cards ────────────────
export const PUPPY_CHECKLIST_KNOWLEDGE: KnowledgeCard[] = [
  {
    title: 'The Critical Socialization Window (3-16 Weeks)',
    definition: 'The socialization window is a biologically determined period when puppies form lasting behavioral responses to environmental stimuli.',
    body: 'Puppy\'s socialization window closes at 16 weeks. During this period, they need positive exposure to 100 people, 20 environments, and various sounds. AVSAB Position Statement on Puppy Socialization confirms this is the single most important factor in reducing adult behavioral problems. Missing this window cannot be fully compensated for later in life.',
    citeLabel: 'AVSAB Position Statement',
    citeHref: 'https://avsab.org/',
  },
  {
    title: 'Why Vaccination Timing Matters: Maternal Antibody Interference',
    definition: 'Maternal antibodies from colostrum interfere with vaccines until 6-18 weeks, creating a window of susceptibility.',
    body: 'Puppies receive maternal antibodies that interfere with vaccine efficacy until 6-8 weeks. The DHPP series requires 3-4 doses at 3-4 week intervals because we cannot predict exactly when maternal immunity wanes. The final dose must be given at 16+ weeks to ensure protection. Rabies is given at 12-16 weeks per state law. Source: AAHA Canine Vaccination Guidelines 2022.',
    citeLabel: 'AAHA Canine Vaccination Guidelines',
    citeHref: AUTHORITY_SOURCES.aaha.url,
  },
  {
    title: 'House Training Success Potty Formula',
    definition: 'House training success depends on frequency, timing, and proper reinforcement within 2 seconds of elimination.',
    body: 'Take puppy out every 1-2 hours, immediately after meals/naps/play, and always praise+treat successful elimination within 2 seconds. Accidents must be cleaned with enzymatic cleaner — residual urine smell triggers re-marking. Most puppies achieve reliable house training by 4-6 months. Crate training leverages the dog\'s natural instinct to den — they avoid soiling their sleeping area.',
    citeLabel: 'AKC House Training Guide',
    citeHref: 'https://www.akc.org/',
  },
  {
    title: 'The 3-3-3 Rule for Rescue Dog Adjustment',
    definition: 'The 3-3-3 rule describes the three-phase adaptation period rescue dogs experience in new homes.',
    body: 'Week 1: Your dog may be overwhelmed, fearful, and not show true personality — this is decompression. Week 2: They\'re settling in, learning routines, and showing more behavior. Week 3: They feel secure, comfortable, and showing their true personality. Patience is key. Never rush bonding — let the dog initiate contact. This framework helps rescue families set realistic expectations during the critical adjustment period.',
    citeLabel: 'Rescue Dog Expert',
    citeHref: 'https://www.rescuedogexpert.com/',
  },
];

// ── Senior Dog Care Knowledge Cards ───────────────────
export const SENIOR_DOG_KNOWLEDGE: KnowledgeCard[] = [
  {
    title: 'Bi-annual Vet Exams: Why Twice-Yearly Matters',
    definition: 'Senior dogs age approximately 4-7 human years per calendar year, making bi-annual exams equivalent to human checkups every 2-3 years.',
    body: 'Conditions like kidney disease, hyperthyroidism, and hypertension develop silently. Bi-annual screening catches these conditions when treatment is most effective. AAHA Senior Care Guidelines recommend: blood pressure screening, complete blood count, comprehensive metabolic panel, thyroid (T4), urinalysis, and joint assessment at every visit.',
    citeLabel: 'AAHA Senior Care Guidelines',
    citeHref: AUTHORITY_SOURCES.aaha.url,
  },
  {
    title: 'Canine Cognitive Dysfunction (CCD)',
    definition: 'CCD is the canine equivalent of Alzheimer\'s disease, affecting memory, learning, and awareness in aged dogs.',
    body: 'CCD affects 28% of dogs aged 11-12 and 68% of dogs aged 15-16. Signs include disorientation, altered sleep-wake cycles, house soiling, and decreased social interaction. Interventions include: SAMe supplements, environmental enrichment, consistent routines, and medication (selegiline). Early intervention slows progression — discuss screening with your veterinarian annually after age 8.',
    citeLabel: 'AAHA Behavior Guidelines',
    citeHref: AUTHORITY_SOURCES.aaha.url,
  },
  {
    title: 'Joint Health in Senior Dogs',
    definition: 'Osteoarthritis affects an estimated 80% of dogs over 8 years, though only 40% show obvious clinical signs.',
    body: 'Dogs mask pain instinctively. Subtle signs include: reluctance to jump, stiffness after rest, lagging on walks, and irritability. Management includes: weight optimization (most impactful), joint supplements (glucosamine/chondroitin/omega-3), physical therapy (hydrotherapy, laser therapy), pain management (NSAIDs, monoclonal antibodies), and environmental modifications (ramps, orthopedic beds). Multi-modal therapy provides the best outcomes.',
    citeLabel: 'AAHA Pain Management Guidelines',
    citeHref: AUTHORITY_SOURCES.aaha.url,
  },
  {
    title: 'Nutrition Transition for Senior Dogs',
    definition: 'Senior dogs require higher protein-to-calorie ratio to preserve muscle mass despite reduced caloric needs.',
    body: 'Caloric needs decrease 20-30% in seniors due to reduced activity and metabolic rate, but protein requirements increase by 50% to prevent sarcopenia (muscle loss). Choose foods with >30% protein (dry matter basis), moderate fat (10-15%), added omega-3 fatty acids, and joint support nutrients. Senior-formulated foods should maintain protein while reducing calories through lower fat and higher fiber content.',
    citeLabel: 'AAHA Nutrition Guidelines',
    citeHref: AUTHORITY_SOURCES.aaha.url,
  },
];

// ── Rescue Dog Adoption Knowledge Cards ───────────────
export const RESCUE_DOG_KNOWLEDGE: KnowledgeCard[] = [
  {
    title: 'The Behavioral Assessment Gap',
    definition: 'Shelter behavioral assessments have limited predictive value for home behavior — environment and history are unknown variables.',
    body: 'Only 50-60% of shelter dog assessments predict home behavior accurately because the shelter environment is inherently stressful. Many dogs shut down in kennels. Post-adoption, provide 2-4 weeks of observation before making behavioral judgments. Partner with a force-free trainer experienced in rescue transitions for the best outcome.',
    citeLabel: 'ASPCA Behavioral Science',
    citeHref: 'https://www.aspca.org/',
  },
  {
    title: 'Separation Anxiety in Rescue Dogs',
    definition: 'Separation anxiety affects up to 20-40% of rescue dogs due to prior abandonment and attachment disruption.',
    body: 'Signs include: destructive behavior (exit points targeted), vocalization, house soiling, pacing, and inability to settle when alone. Management: never punish, build alone-time tolerance gradually (start with seconds), use enrichment (Kong, food puzzles), consider anti-anxiety medication for severe cases, and consult a veterinary behaviorist if no progress after 4 weeks of structured training.',
    citeLabel: 'AVSAB Separation Anxiety Guidelines',
    citeHref: 'https://avsab.org/',
  },
  {
    title: 'Multi-pet Household Introductions',
    definition: 'Successful multi-pet introductions require species-specific protocols, neutral territory, and gradual exposure over days-to-weeks.',
    body: 'For dog-dog introductions: meet on neutral territory first, walk parallel at distance, decrease distance gradually over days. For dog-cat: ensure cat has escape routes, use baby gates, never leave unsupervised until trust is established (weeks to months). Monitor body language closely — stiff posture, hard stares, and growling indicate stress requiring more distance.',
    citeLabel: 'IAABC Introduction Protocols',
    citeHref: 'https://iaabc.org/',
  },
  {
    title: 'Post-adoption Veterinary Care',
    definition: 'Rescue dogs require comprehensive health baseline testing within 72 hours of adoption, even when shelter records exist.',
    body: 'Within 48-72 hours of adoption, schedule a comprehensive vet visit including: complete physical exam, fecal parasite test (common in shelter populations), heartworm test, tick-borne disease panel, vaccination status verification, and nutritional assessment. Shelter medicine focuses on population-level care — individual health nuances may be missed. Establish a preventive care plan tailored to your dog\'s age, breed, and health status.',
    citeLabel: 'AAHA Canine Life Stage Guidelines',
    citeHref: AUTHORITY_SOURCES.aaha.url,
  },
];

// ── Puppy Development Stages Knowledge Cards ───────────
export const PUPPY_DEVELOPMENT_KNOWLEDGE: KnowledgeCard[] = [
  {
    title: 'Neonatal Stage (0-2 Weeks): Total Dependence',
    definition: 'Neonatal puppies are blind, deaf, and entirely dependent on their mother for warmth, nutrition, and elimination.',
    body: 'During the first two weeks, puppies spend 90% of their time nursing and sleeping. They cannot regulate body temperature or eliminate without maternal stimulation of the genital area. Eyes and ears sealed. Human handling during this period should be gentle and brief (5-10 minutes daily) for early neurological stimulation — studies show mild stress in neonatal period enhances stress resilience in adulthood (Barrett-Dreist et al.).',
    citeLabel: 'AKC Canine Development',
    citeHref: 'https://www.akc.org/',
  },
  {
    title: 'Socialization Stage (3-12 Weeks): The Critical Window',
    definition: 'The socialization stage is the single most important period for shaping lifelong behavioral responses.',
    body: 'From 3-12 weeks, puppies form social bonds, learn bite inhibition through littermate play, and develop environmental confidence. AVSAB recommends: meeting 100 people, experiencing 20 surfaces/environments, controlled exposure to varied sounds, and positive interactions with vaccinated dogs during this window. Fear responses are minimized and learning is maximized. Missing this window cannot be fully compensated for in adulthood.',
    citeLabel: 'AVSAB Position Statement',
    citeHref: 'https://avsab.org/',
  },
  {
    title: 'Fear Impact Periods (8-11 weeks and 6-14 months)',
    definition: 'Fear periods are neurologically programmed phases when puppies are temporarily hypersensitive to environmental stimuli.',
    body: 'The first fear period (8-11 weeks) often coincides with when puppies go to new homes. The second (6-14 months) occurs during adolescence. During these phases, previously neutral stimuli trigger fear responses. This is protective behavior in wild canids, not a behavioral failure. Management: never force exposure, maintain positive associations, provide safe retreat space, and avoid traumatic experiences that can create lifelong phobias.',
    citeLabel: 'AKC Canine Behavioral Development',
    citeHref: 'https://www.akc.org/',
  },
  {
    title: 'Adolescence (6-18 months): Boundary Testing',
    definition: 'Canine adolescence is characterized by hormonal changes, selective hearing, and systematic boundary testing.',
    body: 'Adolescent puppies "forget" trained behaviors, become more independent, test social hierarchies, and may show fear reactivity. This is neurologically normal — the brain is pruning unused connections and strengthening new ones. Consistency is key: continue training sessions, maintain rules, increase mental stimulation, and provide structure. Avoid punishment which damages trust. Most puppies emerge from adolescence with proper guidance.',
    citeLabel: 'AAHA Behavior Guidelines',
    citeHref: AUTHORITY_SOURCES.aaha.url,
  },
];

// ── New Kitten Checklist Knowledge Cards ──────────────
export const KITTEN_CHECKLIST_KNOWLEDGE: KnowledgeCard[] = [
  {
    title: 'Kitten Socialization Window (2-7 Weeks)',
    definition: 'The primary socialization window for kittens closes at 7 weeks — earlier than puppies — making early breeder/shelter socialization critical.',
    body: 'Kittens socialized to humans, other cats, and environmental stimuli between 2-7 weeks show reduced fear and aggression as adults. AAFP recommends: daily handling by varied people, exposure to household sounds, carrier training, and gentle restraint exercises. Kittens obtained after this window may require extended patience. Shelter kittens often miss optimal socialization — adopt before 7 weeks when possible or seek breeders who prioritize early handling.',
    citeLabel: 'AAFP Feline Behavior Guidelines',
    citeHref: 'https://catvets.com/',
  },
  {
    title: 'Feline Core Vaccines Explained',
    definition: 'Core feline vaccines protect against FVRCP (Feline Viral Rhinotracheitis, Calicivirus, Panleukopenia) and Rabies — all cats need these regardless of lifestyle.',
    body: 'FVRCP is a combination vaccine given at 6-8, 10-12, and 14-16 weeks. The final dose must be at/after 16 weeks because maternal antibodies can persist. FVRCP protects against panleukopenia (often fatal kitten disease causing vomiting and diarrhea), herpesvirus, and calicivirus. Rabies is legally required in most jurisdictions. FeLV (feline leukemia) is recommended for kittens with outdoor access or exposure to FeLV-positive cats.',
    citeLabel: 'AAFP Feline Vaccination Guidelines',
    citeHref: 'https://catvets.com/',
  },
  {
    title: 'Litter Box Essentials for Kittens',
    definition: 'Litter box setup significantly impacts lifelong litter box compliance — most litter box problems are environmental, not behavioral.',
    body: 'Provide one litter box per cat plus one extra (N+1 rule). Place boxes in quiet, accessible, low-traffic locations — never near food or water. Use unscented clumping litter (cats prefer fine-grain, unscented). Scoop at least daily. Boxes should be 1.5x the cat\'s length. Kittens need low-sided boxes (3-inch entry). Most kittens use litter instinctively; accidents indicate box accessibility, cleanliness, location, or substrate preference issues. Never punish litter box accidents.',
    citeLabel: 'AAFP Feline Behavior Guidelines',
    citeHref: 'https://catvets.com/',
  },
  {
    title: 'Kitten Nutrition: Growth Requirements',
    definition: 'Kittens require nearly 3x adult calories per kilogram of body weight to support rapid growth and development.',
    body: 'Kitten-formulated food provides: high protein (>35% dry matter base), balanced calcium/phosphorus for bone development (1.0-1.5:1 ratio), DHA for brain and vision development, and taurine (essential for cats — deficiency causes blindness and heart disease). Feed exclusively kitten food until 12 months. Wet food preferred for hydration and urinary health; if feeding dry, ensure ample fresh water and consider a fountain. Kittens are prone to hypoglycemia — provide frequent meals (4x/day until 4 months).',
    citeLabel: 'AAFCO Kitten Nutrient Profiles',
    citeHref: 'https://www.aafco.org/',
  },
];

// ── Senior Cat Care Knowledge Cards ────────────────────
export const SENIOR_CAT_KNOWLEDGE: KnowledgeCard[] = [
  {
    title: 'The Senior Cat Disease Triad: CKD, Hyperthyroidism, Hypertension',
    definition: 'Chronic Kidney Disease, Hyperthyroidism, and Hypertension frequently co-occur in senior cats and form a diagnostic triad.',
    body: 'These three conditions affect 30-50%, 10-13%, and ~20% of senior cats respectively, and each exacerbates the others. Hypertension is often caused by CKD and hyperthyroidism. Blood pressure screening is essential for every senior cat visit. Together they form a "triad" — testing for one requires screening for all three. Early detection through annual/biannual bloodwork and blood pressure checks enables treatment that extends both quantity and quality of life.',
    citeLabel: 'AAFP Senior Care Guidelines 2021',
    citeHref: 'https://catvets.com/',
  },
  {
    title: 'Feline Osteoarthritis: The Hidden Epidemic',
    definition: 'Osteoarthritis affects 90% of cats over 12 years on X-ray, yet fewer than 10% receive treatment because cats hide pain.',
    body: 'Cats show pain differently than dogs. Signs include: decreased jumping, stiffness after rest, unkempt coat (grooming hurts), litter box accidents (pain entering box), hiding, and irritability. Environmental modification (low-entry boxes, ramps, heated beds), weight management, fish oil supplements, and feline-safe pain medications (gabapentin, meloxicam under veterinary supervision, bedinvetmab monoclonal antibody) significantly improve quality of life.',
    citeLabel: 'AAFP Pain Management Guidelines',
    citeHref: 'https://catvets.com/',
  },
  {
    title: 'Cognitive Dysfunction Syndrome in Senior Cats',
    definition: 'Feline Cognitive Dysfunction (FCD) is the feline equivalent of Alzheimer\'s disease, affecting an estimated 28% of cats aged 11-15 and 50% over 16.',
    body: 'Signs described by the DISH acronym: Disorientation (getting stuck, staring at walls), Interaction changes (less social, more aggressive or clingy), Sleep-wake cycle disruption (vocalizing at rest), and House soiling. Management includes: SAMe supplements (Novifit), environmental enrichment (consistent routine, puzzle feeders), night lights, and anti-anxiety medications (selegiline, gabapentin). Early intervention slows progression.',
    citeLabel: 'AAFP Senior Care Guidelines',
    citeHref: 'https://catvets.com/',
  },
  {
    title: 'Senior Cat Nutrition: Protein Preservation',
    definition: 'Senior cats require higher protein levels than adult cats to prevent sarcopenia — muscle loss that drives frailty and mortality.',
    body: 'Contrary to outdated beliefs, senior cats need MORE protein than adults — up to 40-50% on a dry matter basis. Only in late-stage kidney disease (IRIS Stage 3-4) should protein be moderately restricted. Senior-formulated foods should feature: highly digestible protein (>40%), moderate phosphorus, added omega-3s, B-vitamins, and antioxidants. Wet food is strongly preferred for hydration. Cats with diminished smell may prefer warmed food. Feed smaller, more frequent meals to accommodate reduced stomach capacity.',
    citeLabel: 'AAFP Nutrition Guidelines',
    citeHref: 'https://catvets.com/',
  },
];
