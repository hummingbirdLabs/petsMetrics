/**
 * Checklist pages FAQ data — Phase 2 Life Stage Checklists
 * Each FAQ item is used for both visible DOM rendering AND JSON-LD generation.
 */
import type { FaqItem } from './geo-faq';

// ── New Puppy Checklist ────────────────────────────────
export const PUPPY_CHECKLIST_FAQ: FaqItem[] = [
  {
    question: 'What do I need for a new puppy before bringing it home?',
    answer:
      'Essentials include: crate (adult-sized with divider), food/water bowls (stainless steel), puppy food (same brand as breeder/shelter initially), collar with ID tag (adjustable), 6-foot leash (not retractable), machine-washable bed, puppy pee pads, enzymatic cleaner, chew toys (Kong, Nylabone, rope), baby gates, and a basic first aid kit. Budget $150-$300 for initial supplies. Schedule your first vet appointment before pickup day — AAHA recommends a health check within 48 hours of adoption.',
  },
  {
    question: 'When should a puppy have its first vet visit?',
    answer:
      'Schedule within 48 hours of adoption. The veterinarian will conduct a full physical exam (heart, lungs, eyes, ears, teeth, skin, joints), test for intestinal parasites (bring a fresh stool sample), verify vaccination records, confirm microchip registration, discuss spay/neuter timing, and establish a preventive care plan. This visit is crucial for identifying congenital issues like heart murmurs, hernas, or early signs of infectious disease that are treatable when caught early.',
  },
  {
    question: 'How often should a puppy eat?',
    answer:
      '8-12 weeks: 4 meals/day. 3-6 months: 3 meals/day. 6+ months: 2 meals/day. Consistent feeding times aid house training (predictable elimination schedule) and prevent hypoglycemia in small breeds. Your puppy\'s caloric needs change weekly during rapid growth — use a puppy calorie calculator to adjust portions as they gain weight. Always provide fresh water and avoid exercise 30 minutes before and after meals to prevent bloat.',
  },
  {
    question: 'When can a puppy meet other dogs?',
    answer:
      'Puppies can meet healthy, vaccinated dogs in controlled environments (your home, a friend\'s home with vaccinated pets) immediately — even before completing their vaccine series. Wait until 2 weeks after the final DHPP vaccine (around 16 weeks) for dog parks, pet stores, boarding facilities, and unknown dogs. AVSAB confirms that the socialization benefits outweigh the disease risk before full vaccination. Avoid areas with unknown vaccination status until the series is complete.',
  },
  {
    question: 'How much exercise does a puppy need?',
    answer:
      'Follow the "5-minute rule": 5 minutes of structured exercise (walking, play) per month of age, twice daily. A 3-month-old puppy = 15 minutes twice a day. A 4-month-old = 20 minutes twice daily. Adjust for breed energy level — working breeds may need more mental stimulation. Forced running, jumping from heights, and repetitive impact exercise should be avoided until growth plates fuse (12-18 months for large breeds) to prevent joint damage. Mental exercise (training, puzzle toys) is equally important.',
  },
  {
    question: 'When should I start training my puppy?',
    answer:
      'Start Day 1! Begin with name recognition (say name, reward eye contact), "sit" (lure with treat), and crate training (make it a positive space with meals and treats). Formal group socialization classes can start after the first vaccination (typically 8 weeks). The critical socialization window (3-16 weeks) is when the most impactful learning occurs. Keep training sessions short (3-5 minutes), use high-value rewards, and always end on a positive note. AKC\'s S.T.A.R. Puppy program is an excellent structured option.',
  },
  {
    question: 'How much does a puppy cost in the first year?',
    answer:
      'Average first-year cost: $1,500-$3,500. Breakdown: veterinary care ($400-$800 including spay/neuter), food ($400-$900 depending on breed size), supplies ($200-$400), training classes ($100-$300), grooming ($100-$200), and unexpected costs ($200-$600). Pet insurance ($300-$600/year) can offset emergency costs. The second and subsequent years typically cost $1,000-$2,000 annually. Large breeds cost more in food and medications.',
  },
  {
    question: 'What is the 3-3-3 rule for rescue dogs?',
    answer:
      'The 3-3-3 rule describes the adjustment timeline for rescue dogs: First 3 days — your dog is overwhelmed, scared, may hide, refuse food, or have accidents. This is a decompression period. First 3 weeks — your dog learns the routine, shows more personality, and begins testing boundaries. First 3 months — your dog feels secure, shows true personality, and the bond is firmly established. Be patient, avoid flooding with new experiences, maintain consistent routines, and let the dog set the pace of adjustment.',
  },
];

// ── Senior Dog Care Checklist ──────────────────────────
export const SENIOR_DOG_FAQ: FaqItem[] = [
  {
    question: 'At what age is a dog considered a senior?',
    answer:
      'Senior status depends on breed size rather than a universal age. Small breeds (<10 kg) become senior at 10-11 years, medium breeds (10-25 kg) at 8-9 years, large breeds (25-45 kg) at 7 years, and giant breeds (>45 kg) at 5-6 years. AAHA defines senior as the last 25% of expected lifespan. The transition to senior life stage triggers changes in nutritional needs, exercise tolerance, and health screening frequency.',
  },
  {
    question: 'How often should a senior dog visit the vet?',
    answer:
      'Senior dogs should have veterinary exams every 6 months instead of annually. Bi-annual exams catch age-related conditions early when they\'re most treatable. Each visit should include: comprehensive physical exam, senior blood panel (CBC, chemistry, thyroid T4), urinalysis (kidney function, diabetes screening), blood pressure check, and joint mobility assessment. Additional diagnostics (X-rays, ultrasound) are recommended based on findings.',
  },
  {
    question: 'What are the signs of cognitive decline in senior dogs?',
    answer:
      'Canine Cognitive Dysfunction (CCD) signs are summarized by the DISHA acronym: Disorientation (getting lost in familiar places, stuck in corners), Interaction changes (less interest in play, altered sleep-wake cycle), Sleep-wake cycle changes (restlessness at night, pacing), House soiling ( accidents after being trained), and Activity level changes (decreased exploration, lethargy). These symptoms affect 28% of dogs aged 11-12 and 68% of dogs aged 15-16. Early intervention with supplements, enrichment, and medication can slow progression.',
  },
  {
    question: 'Should senior dogs eat different food?',
    answer:
      'Yes. Senior dogs benefit from diets with: higher-quality protein (maintain muscle mass), moderate fat (reduced caloric needs), increased fiber (digestive health), added omega-3 fatty acids (joint and cognitive support), and joint supplements (glucosamine, chondroitin). Caloric needs decrease 20-30% in seniors due to reduced activity, but protein needs increase to prevent muscle wasting. AAFCO does not have a separate senior nutrient profile, so look for foods formulated for "all life stages" or specific senior formulations backed by feeding trials.',
  },
  {
    question: 'How much exercise does a senior dog need?',
    answer:
      'Senior dogs need consistent, moderate exercise to maintain joint mobility, muscle mass, and healthy weight. Aim for 20-30 minutes of low-impact activity twice daily: gentle walks, swimming (excellent for arthritic dogs), and mental stimulation (puzzle toys, sniff walks). Adjust for individual capacity — some seniors tire quickly, others remain energetic. Watch for signs of overexertion: excessive panting, lagging behind, stiffness the next day, or reluctance to continue. Never force exercise if your dog stops.',
  },
  {
    question: 'What supplements help senior dogs?',
    answer:
      'Evidence-based senior supplements include: glucosamine + chondroitin + MSM (joint health — Dasuquin and Cosequin have clinical data), omega-3 fatty acids EPA/DHA (anti-inflammatory for joints, heart, and brain), Coenzyme Q10 (cardiac health), S-adenosylmethionine (SAMe) for cognitive support and liver health), and probiotics (digestine health). Always consult your veterinarian before starting supplements — they can interact with medications and may not be appropriate for all health conditions.',
  },
];

// ── Adopting a Rescue Dog ──────────────────────────────
export const RESCUE_DOG_FAQ: FaqItem[] = [
  {
    question: 'How long does it take for a rescue dog to adjust?',
    answer:
      'The 3-3-3 rule guides expectations: 3 days to decompress (overwhelmed, hiding, not eating), 3 weeks to learn routines (showing personality, testing boundaries), 3 months to feel truly at home (bonding, showing true personality). However, every dog is unique. Dogs with trauma histories, multiple rehoming, or unknown backgrounds may take months to a year. Patience, consistency, and letting the dog set the pace are essential for successful adjustment.',
  },
  {
    question: 'What should I ask a shelter before adopting?',
    answer:
      'Key questions include: What is known about the dog\'s history? Any known medical conditions, allergies, or dietary needs? Has the dog been tested for heartworm, ehrlichiosis, and other tick-borne diseases? How does the dog react to children, other dogs, cats, and strangers? What is the dog\'s energy level and exercise needs? Has the dog shown any resource guarding, separation anxiety, or fear-based behaviors? What was the reason for surrender? A reputable shelter provides transparent answers and a behavioral assessment.',
  },
  {
    question: 'How do I introduce a rescue dog to my home?',
    answer:
      'Start with a safe room: one quiet room with bed, water, and toys. Keep the dog leashed for initial home exploration. Introduce family members one at a time, calmly. Maintain a quiet environment for the first week — no visitors, no dog parks. Establish a predictable routine immediately (feeding, walks, potty breaks at consistent times). For multi-pet households, keep dogs separated for the first few days, then introduce on neutral territory. Let the dog approach new experiences at their own pace.',
  },
  {
    question: 'What behavioral issues are common in rescue dogs?',
    answer:
      'Common adjustment behaviors include: separation anxiety (distress when alone due to abandonment history), fear reactivity (to men, loud noises, leashes, or handling), resource guarding (from competition), leash reactivity (from lack of socialization), and house soiling (no prior training or stress). Most of these resolve with time, consistency, and positive reinforcement training. Persistent issues benefit from consultation with a veterinary behaviorist or certified force-free trainer.',
  },
  {
    question: 'Should I adopt a puppy or adult rescue dog?',
    answer:
      'Puppies (under 6 months) offer maximum socialization control but require intensive training, socialization, and time investment. Adult dogs (1-7 years) often have established personalities, basic training, and lower exercise demands — you know exactly what you\'re getting. Senior dogs (7+) are typically calm, house-trained, and grateful for a quiet home. Best choice depends on your lifestyle, experience level, and available time. Adult dogs in shelters are often the most overlooked but most rewarding options.',
  },
];

// ── Puppy Development Stages ───────────────────────────
export const PUPPY_DEVELOPMENT_FAQ: FaqItem[] = [
  {
    question: 'What are the key puppy development stages?',
    answer:
      'Puppy development follows distinct stages: Neonatal (0-2 weeks) — helpless, eyes/ears closed, dependent on mother. Transitional (2-4 weeks) — eyes/ears open, first steps, tail wagging. Socialization (4-12 weeks) — critical learning window, bonding, bite inhibition. Fear periods (8-11 weeks and 6-14 months) — temporary sensitivity to stimuli. Juvenile (3-6 months) — teething, independence, testing boundaries. Adolescence (6-18 months) — hormonal changes, rebellious behavior. Understanding these stages helps you provide age-appropriate care.',
  },
  {
    question: 'When do puppies open their eyes and ears?',
    answer:
      'Puppies\' eyes open at 10-14 days of age (initially blurry vision that improves over weeks). Ears open at 13-17 days, with full hearing developing by 4 weeks. Both senses develop gradually — avoid loud noises and direct bright light during the neonatal period. If eyes haven\'ed opened by 21 days or produce discharge, consult a veterinarian for possible infection or congenital issues.',
  },
  {
    question: 'What is the fear period in puppies?',
    answer:
      'Puppies experience two fear periods: the first at 8-11 weeks (often coinciding with when they go to new homes) and the second at 6-14 months (adolescent fear period). During these windows, puppies react fearfully to previously neutral stimuli. This is neurologally normal and protective in wild canids. Avoid forcing interactions, provide safe retreats, and ensure positive (not frightening) exposures during this time. Never punish fear — it worsens anxiety.',
  },
  {
    question: 'When do puppies lose their baby teeth?',
    answer:
      'Puppies have 28 baby teeth that begin erupting at 3-4 weeks. They start falling out at 12-16 weeks (usually incisors first), with adult teeth erupting immediately. By 6 months, most puppies have all 42 adult teeth. Teething peaks at 4-5 months. Provide appropriate chew toys (frozen Kongs, teething rings) and monitor for retained baby teeth — these may need veterinary extraction. Begin tooth brushing during teething to establish lifelong habits.',
  },
  {
    question: 'When do puppies calm down?',
    answer:
      'Most puppies begin showing reduced hyperactivity around 6-9 months as they exit peak teething. Significant maturation occurs at 12-18 months, though true mental maturity varies: small breeds mature at 12-14 months, medium breeds at 15-18 months, large breeds at 18-24 months, and giant breeds at 24-36 months. Consistent training, adequate exercise, and mental stimulation accelerate the development of calm behavior. Remember: "calm" does not mean low energy — it means controlled, directed energy.',
  },
];

// ── New Kitten Checklist ───────────────────────────────
export const KITTEN_CHECKLIST_FAQ: FaqItem[] = [
  {
    question: 'What do I need before bringing a kitten home?',
    answer:
      'Essentials include: litter box (one per cat, so two for one kitten), unscented clumping litter, litter mat, wide shallow food bowls (whisker-friendly), water bowl (or fountain), kitten food (wet and dry), scratching post (tall, sturdy sisal), cat tree or perch, hard-sided carrier, kitten nail clippers, brush (breed-dependent), and toys (wand toys, balls, crinkle toys). Budget $150-$300 for initial supplies. Set up a safe room before arrival where the kitten can adjust gradually.',
  },
  {
    question: 'When should a kitten go to the vet?',
    answer:
      'Schedule a vet visit within 48 hours of adoption. The vet will perform a physical exam, test for FIV and FeLV (feline immunodeficiency virus and feline leukemia), fecal parasite testing, and discuss the vaccination schedule. The FVRCP vaccine series starts at 6-8 weeks (kittens from shelters may have already had the first dose). Rabies is given at 12-16 weeks. Spay/neuter is typically performed at 4-6 months.',
  },
  {
    question: 'How often should a kitten eat?',
    answer:
      'Kittens 6 weeks to 3 months: 4 meals/day. 3-6 months: 3 meals/day. 6-12 months: 2 meals/day (transition to adult feeding). Kittens have high energy needs for growth — feed kitten-formulated food exclusively until 12 months. Wet food provides hydration and is preferred for urinary health. If using dry food, ensure constant fresh water access and consider a water fountain to encourage drinking.',
  },
  {
    question: 'How do I litter box train a kitten?',
    answer:
      'Most kittens have a natural instinct to use a litter box. Place the kitten in the box after meals and naps. Use unscented clumping litter. Keep the box in a quiet, accessible location. Scoop at least daily. If accidents occur, clean with enzymatic cleaner and do not punish. AAFP recommends one litter box per cat plus one extra, placed in different locations. Kittens can start using litter as early as 3-4 weeks of age.',
  },
  {
    question: 'When can a kitten meet other pets?',
    answer:
      'Gradual introduction is essential. Keep the kitten isolated in a safe room for the first 3-7 days. Exchange scents by rubbing a cloth on each animal and placing it near the other. Allow visual access through a baby gate or cracked door after 3-5 days. Supervised face-to-face meetings can begin after 1-2 weeks if both animals remain calm. Never force interactions. Adult cats typically need 2-8 weeks to accept a kitten. For existing dogs, ensure the dog has a solid "leave it" command before introductions.',
  },
  {
    question: 'How much does a kitten cost in the first year?',
    answer:
      'Average first-year cost: $1,000-$2,500. Breakdown: veterinary care ($300-$600 including spay/neuter), food ($250-$500), litter and supplies ($150-$300), toys and enrichment ($50-$100), and unexpected costs ($200-$500). Pet insurance for cats costs $15-$35/month and can offset emergency costs. Subsequent years typically cost $800-$1,500 annually.',
  },
];

// ── Senior Cat Care Checklist ──────────────────────────
export const SENIOR_CAT_FAQ: FaqItem[] = [
  {
    question: 'At what age is a cat considered a senior?',
    answer:
      'AAFP/AAHA feline life stage guidelines classify cats as follows: Mature (7-10 years), Senior (11-14 years), and Geriatric (15+ years). However, preventive senior care should begin around age 7-8 when age-related changes first become detectable. Early intervention in the "mature" stage prevents progression of kidney disease, hyperthyroidism, and arthritis.',
  },
  {
    question: 'How often should a senior cat visit the vet?',
    answer:
      'Senior cats (11+) should have veterinary exams every 6 months. Each visit should include: physical exam, senior blood panel (CBC, chemistry, SDMA for kidney function), total T4 (thyroid), blood pressure measurement, and urinalysis. AAFP Senior Care Guidelines 2021 recommend these screens because kidney disease, hyperthyroidism, and hypertension frequently co-occur in senior cats and are treatable when caught early.',
  },
  {
    question: 'How do I know if my senior cat is in pain?',
    answer:
      'Cats are experts at hiding pain. Subtle signs include: decreased jumping or climbing, stiffness after resting, reduced grooming (unkempt coat), hiding more than usual, decreased appetite, litter box accidents (difficulty entering box), irritability when touched, and excessive purring (self-soothing). The Feline Grimace Scale (ear position, whisker position, muzzle shape, head position) helps identify acute pain. Never give human pain medications to cats — many are fatal. Consult your veterinarian for feline-appropriate pain management.',
  },
  {
    question: 'What should senior cats eat?',
    answer:
      'Senior cats need: high-quality protein (higher than adult maintenance to prevent muscle loss), moderate phosphorus (kidney health), added omega-3s (anti-inflammatory), and moisture-rich food. If kidney values are elevated, a veterinary renal diet with restricted phosphorus and added B-vitamins is recommended. AAFP guidelines prioritize protein maintenance even in early kidney disease. Wet food is strongly preferred for hydration. Some seniors benefit from warmed food (enhanced palatability if smell is diminished). Avoid grain-free feline diets — they have been linked to taurine deficiency.',
  },
  {
    question: 'How do I modify my home for a senior cat?',
    answer:
      'Essential modifications include: low-entry litter boxes (3-inch sides or cut-out entrance), orthopedic memory foam beds, ramps or steps for furniture/car access, non-slip rugs on slippery floors, raised food/water bowls (reduces neck strain), night lights for vision-impaired cats, additional litter boxes (mobility-impaired cats need closer access), and heated beds (warmth soothes arthritis). Keep food, water, and litter on one floor to avoid stairs for cats with mobility issues.',
  },
  {
    question: 'What are the most common senior cat diseases?',
    answer:
      'The triad of senior feline diseases: Chronic Kidney Disease (CKD — affects 30-50% of cats over 15), Hyperothyroidism (10-13% of senior cats), and Hypertension (often secondary to CKD and hyperthyroidism). Other common conditions include diabetes mellitus, inflammatory bowel disease (IBD), dental disease (70% of cats over 3), osteoarthritis (90% of cats over 12 on X-ray), and cancer (lymphoma is most common). Regular screening catches these conditions years before symptoms appear.',
  },
];
