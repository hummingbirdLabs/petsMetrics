/**
 * Complete i18n Fix - Adds missing compare sections to en.json and syncs all locales
 */
const fs = require('fs');
const path = require('path');

const messagesDir = path.join(__dirname, '..', 'messages');

function readJson(filePath) {
  let raw = fs.readFileSync(filePath, 'utf-8');
  if (raw.charCodeAt(0) === 0xFEFF) raw = raw.slice(1);
  return JSON.parse(raw);
}

function getAllKeys(obj, prefix = '') {
  const keys = new Set();
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      const subKeys = getAllKeys(value, fullKey);
      subKeys.forEach(k => keys.add(k));
    } else {
      keys.add(fullKey);
    }
  }
  return keys;
}

function getNestedValue(obj, dottedKey) {
  const parts = dottedKey.split('.');
  let current = obj;
  for (const part of parts) {
    if (current == null || typeof current !== 'object') return undefined;
    current = current[part];
  }
  return current;
}

function setNestedValue(obj, dottedKey, value) {
  const parts = dottedKey.split('.');
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!(parts[i] in current) || typeof current[parts[i]] !== 'object' || Array.isArray(current[parts[i]])) {
      current[parts[i]] = {};
    }
    current = current[parts[i]];
  }
  current[parts[parts.length - 1]] = value;
}

function deleteNestedKey(obj, dottedKey) {
  const parts = dottedKey.split('.');
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!(parts[i] in current)) return;
    current = current[parts[i]];
  }
  delete current[parts[parts.length - 1]];
}

// Read en.json
const en = readJson(path.join(messagesDir, 'en.json'));

// Add missing compare sections to en.json
const newCompareSections = {
  harnessVsCollar: {
    title: "Harness vs Collar for Dogs: Which Is Right?",
    subtitle: "Science-backed comparison of harnesses and flat collars covering neck safety, pull control, escape risk, and breed-specific recommendations. AAHA and veterinary behaviorist guidelines cited.",
    topicAName: "Back-Clip Harness",
    topicBName: "Flat Collar",
    topicA: {
      pros: [
        { title: "Neck Safety", body: "Distributes pressure across the chest and shoulders, eliminating thyroid and tracheal compression from leash pulling. Critical for brachycephalic breeds." },
        { title: "Leash Control", body: "Back-clip harnesses redirect dogs sideways when they pull, reducing pulling drive. Front-clip models provide stronger steering control." },
        { title: "Escape Prevention", body: "A properly fitted harness is harder for dogs to slip out of than a loose collar, reducing the risk of lost pets." },
        { title: "Brachycephalic Safe", body: "Bulldogs, Pugs, French Bulldogs, and other brachycephalic breeds already have compromised airways — walking on a collar is risky." }
      ],
      cons: [
        "May encourage pulling if not paired with training",
        "More complex to put on — many owners use incorrectly sized or adjusted harnesses",
        "Can chafe under the armpits if fitted poorly",
        "Some dogs need an adjustment period for first-time harness wear",
        "Not suitable for permanent ID tag wear"
      ],
      bestFor: "Brachycephalic breeds, puppies, dogs with trachea or thyroid issues, strong pullers, and dogs recovering from neck injuries."
    },
    topicB: {
      pros: [
        { title: "Simple & Quick", body: "Easy to put on and take off — no adjustment period needed. Ideal for quick potty walks." },
        { title: "ID Tag Carrier", body: "Collars are the natural place for ID tags, rabies tags, and contact information." },
        { title: "Lower Cost", body: "Quality flat collars cost $10–30, while good harnesses run $25–55." },
        { title: "No Chafing Risk", body: "A properly fitted flat collar won't rub skin or restrict shoulder movement." }
      ],
      cons: [
        "Leash pressure concentrates on the thyroid and cervical spine",
        "Brachycephalic breeds can experience dangerous respiratory restriction even with mild pulling",
        "Some dogs can slip out of loose collars (Greyhounds, Whippets, and narrow-headed breeds)",
        "No mechanical advantage for strong pullers",
        "Choke chains and prong collars are discouraged by AVSAB"
      ],
      bestFor: "Calm walkers, well-trained dogs that do not pull, and for permanent ID tag wear."
    },
    rows: [
      { dimension: "Neck Safety", topicA: "Excellent (no neck pressure)", topicB: "Risk of tracheal compression when pulling" },
      { dimension: "Pull Control", topicA: "Good (especially front-clip)", topicB: "None" },
      { dimension: "Escape Risk", topicA: "Low (properly fitted)", topicB: "Moderate (can slip out)" },
      { dimension: "Comfort", topicA: "Good (Y-front design)", topicB: "Good (properly fitted)" },
      { dimension: "Brachycephalic Safety", topicA: "Recommended", topicB: "Use with caution" },
      { dimension: "Initial Cost", topicA: "$25–55", topicB: "$10–30" },
      { dimension: "ID Tag Wear", topicA: "Not suitable", topicB: "Ideal" },
      { dimension: "Vet Recommendation", topicA: "Recommended for walks", topicB: "ID-only use" }
    ],
    verdict: "<strong>For most dogs — especially brachycephalic breeds, puppies, and pullers — a well-fitted Y-front harness is the safer choice for walks.</strong> Flat collars remain useful for ID tags and quick potty breaks but should not be used on dogs that pull consistently. AVSAB and AAHA both discourage choke-type collars and recommend harnesses for dogs with airway or neck concerns. Most veterinarians recommend both: a harness for walks, plus a separate flat collar with ID tags.",
    faq: [
      { question: "Is a harness better than a collar for a dog that pulls?", answer: "Yes. A front-clip harness redirects the dog sideways when pulling, eliminating the opposition reflex that collars create. Back-clip harnesses may still allow pulling if not paired with training. Best approach: front-clip harness plus loose-leash training." },
      { question: "What harness is best for a French Bulldog?", answer: "A Y-front harness that doesn't restrict shoulder movement or compress the neck. Brachycephalic breeds need full shoulder freedom to maintain open airways." },
      { question: "Can a dog wear both a harness and a collar?", answer: "Yes — this is the recommended approach. Keep a flat collar with ID tags on at all times (in case of escape), and use a harness for walks (for control and safety)." }
    ]
  },
  petInsuranceVsEmergencyFund: {
    title: "Pet Insurance vs Emergency Fund: Which Is Better?",
    subtitle: "Comprehensive financial comparison of pet insurance and self-insured emergency funds covering monthly costs, coverage gaps, claim processes, breed-specific conditions, and breakeven analysis. NAPHIA data cited.",
    topicAName: "Pet Insurance",
    topicBName: "Self-Funded Emergency Reserve",
    topicA: {
      pros: [
        { title: "Catastrophic Coverage", body: "Cancer treatment costs $5,000–15,000+ — insurance prevents financial euthanasia decisions." },
        { title: "Predictable Monthly Cost", body: "Fixed monthly premiums ($30–150) spread costs, avoiding the risk of a single $5,000+ bill." },
        { title: "Multi-Pet Discounts", body: "Most insurers offer 5–10% discounts for multiple pets." },
        { title: "Wellness Add-On Options", body: "Wellness riders cover routine care (vaccines, dental cleanings) for an extra $10–30/month." }
      ],
      cons: [
        "Does not cover pre-existing conditions — waiting periods lock in exclusions",
        "Reimbursement model: you pay the vet first, then file a claim (30–60 day processing)",
        "Annual and lifetime caps: most policies max out at $5,000–15,000/year",
        "Breed-specific exclusions may apply for the first year",
        "Premiums rise with age: an 8-year-old dog costs 2–4× more than a 2-year-old"
      ],
      bestFor: "Young healthy pets, owners who want cost predictability, breeds predisposed to expensive conditions, and households that cannot absorb a sudden large bill."
    },
    topicB: {
      pros: [
        { title: "No Premiums", body: "No monthly payments — every dollar goes toward your own pet's care." },
        { title: "Complete Control", body: "No coverage limits, no waiting periods, no claim denials." },
        { title: "Earns Interest", body: "High-yield savings accounts (4–5% APY) grow the reserve." },
        { title: "No Reimbursement Delay", body: "Pay for treatment directly — no waiting for claim processing." }
      ],
      cons: [
        "Must be sufficient before an emergency — a $5,000 emergency in year one defeats the strategy",
        "Requires discipline: $100–200/month saved consistently for 5+ years",
        "Cannot cover catastrophic costs until the reserve reaches adequate size",
        "Multi-pet households need separate $5,000–10,000 reserves per pet",
        "Inflation can erode the reserve's real value long-term"
      ],
      bestFor: "Owners with strong financial discipline, older pets with pre-existing conditions, and as a supplement to high-deductible insurance."
    },
    rows: [
      { dimension: "Monthly Cost", topicA: "$30–150/month", topicB: "$0 (save $100–200/month to build reserve)" },
      { dimension: "Pre-Existing Conditions", topicA: "Not covered", topicB: "Fully covered (no restrictions)" },
      { dimension: "Emergency Coverage", topicA: "Covered after deductible", topicB: "Only after reserve is sufficient (5+ years)" },
      { dimension: "Claim Time", topicA: "30–60 days", topicB: "None (pay directly)" },
      { dimension: "Catastrophic Illness", topicA: "Covered (subject to caps)", topicB: "Must have saved enough" },
      { dimension: "Start Time", topicA: "Puppy/kitten stage (no exclusions)", topicB: "Immediate (but takes years to build)" }
    ],
    verdict: "<strong>Pet insurance exists to prevent financial euthanasia in catastrophic scenarios — a self-funded emergency reserve cannot cover a $15,000 cancer treatment in year one.</strong> The optimal strategy combines both: get accident-and-illness insurance while the pet is young, while simultaneously building a reserve equal to the deductible plus emergency buffer. From a risk management perspective, insurance wins. NAPHIA data shows 1 in 3 pets needs emergency veterinary care, making insurance a massive benefit.",
    faq: [
      { question: "Is pet insurance worth it financially?", answer: "On average, mathematically, healthy pet owners pay more in premiums than they receive in claims. But insurance exists for catastrophic risk: if your pet gets cancer, $15,000–25,000 in treatments are covered after deductible. Pure cost-benefit: if you cannot afford a $5,000 surprise vet bill, it's worth it." },
      { question: "How much should I save in a pet emergency fund?", answer: "Veterinary financial advisors recommend $3,000–5,000 per pet — enough to cover a standard emergency surgery. Keep it in a separate high-yield savings account. Never invest in the stock market — liquidity is essential." },
      { question: "Is it better to get insurance or save money?", answer: "The optimal strategy is both. Get insurance when the pet is a puppy/kitten (to avoid pre-existing condition exclusions), while building a $3,000+ emergency reserve for deductibles and uncovered items." }
    ]
  },
  grainFreeVsWholeGrain: {
    title: "Grain-Free vs Whole Grain Dog Food: Which Is Healthier?",
    subtitle: "Evidence-based comparison of grain-free and whole grain kibble covering DCM concerns, ingredient quality, glycemic response, allergies, and veterinary consensus. AAFCO, FDA, and WSAVA nutritional guidelines cited.",
    topicAName: "Grain-Free Diet",
    topicBName: "Whole Grain Diet",
    topicA: {
      pros: [
        { title: "Lower Glycemic Load", body: "Uses legumes and potatoes instead of grains — glucose release is slower than corn and wheat." },
        { title: "Hypoallergenic Claims", body: "May help dogs with true grain allergies (though these are rare — less than 1% of dogs)." },
        { title: "Higher Protein Content", body: "Grain-free formulas typically have 2–5% more protein on a dry matter basis." }
      ],
      cons: [
        "FDA investigation (2018–2023): strong correlation between grain-free diets and diet-associated dilated cardiomyopathy (DCM)",
        "Legumes (peas, lentils, chickpeas) and potatoes as replacement ingredients may interfere with taurine absorption",
        "Most dogs do not have grain allergies — no benefit for 99% of dogs",
        "More expensive than whole grain diets with no proven benefit for most dogs",
        "AAFCO has not established safe minimum levels for legumes in canine diets"
      ],
      bestFor: "Dogs with diagnosed grain allergies (rare — confirmed only via elimination diet trial under veterinary supervision)."
    },
    topicB: {
      pros: [
        { title: "Extensively Researched", body: "Whole grains have 50+ years of documented safety in canine nutrition. No DCM risk." },
        { title: "Complete Nutrition", body: "Whole grains naturally provide B vitamins, fiber, iron, magnesium, and essential fatty acids." },
        { title: "Lower Cost", body: "Comparable-quality whole grain diets cost $1.00–2.00/lb vs $1.50–3.00/lb for grain-free." },
        { title: "AAFCO Compliant", body: "Whole grain diets from major brands meet AAFCO nutritional adequacy standards." },
        { title: "Digestive Fiber", body: "Oat and barley fiber promote gut microbiome diversity." }
      ],
      cons: [
        "Slightly higher glycemic load (not clinically significant for healthy dogs)",
        "Lower protein content on a dry matter basis"
      ],
      bestFor: "The vast majority of dogs — whole grain diets are the recommended default by WSAVA and most veterinary nutritionists."
    },
    rows: [
      { dimension: "DCM Risk (FDA)", topicA: "Under investigation (legume link)", topicB: "No association" },
      { dimension: "Protein Content", topicA: "Typically 26–34%", topicB: "Typically 22–28%" },
      { dimension: "Cost Per Pound", topicA: "$1.50–3.00", topicB: "$1.00–2.00" },
      { dimension: "Glycemic Load", topicA: "Lower (legumes/potatoes)", topicB: "Moderate (complex carbs)" },
      { dimension: "Research History", topicA: "Limited (post-2010 trend)", topicB: "50+ years" },
      { dimension: "Allergy Benefit", topicA: "Rare (true grain allergy <1%)", topicB: "Standard (grains rarely allergenic)" },
      { dimension: "Veterinary Consensus", topicA: "Caution advised (FDA + WSAVA)", topicB: "Recommended default" }
    ],
    verdict: "<strong>For most dogs, a whole grain AAFCO-compliant diet from a manufacturer that employs veterinary nutritionists is the safest, most researched choice.</strong> Grain-free diets should only be used when a confirmed grain allergy exists (diagnosed via elimination diet). The FDA's ongoing DCM investigation has linked grain-free diets to a serious heart condition, and the precautionary principle favors whole grains.",
    faq: [
      { question: "Is grain-free dog food bad for dogs?", answer: "The FDA has identified a potential link between grain-free diets and dilated cardiomyopathy (DCM). While research is ongoing, veterinary cardiologists recommend caution. Unless your dog has a confirmed grain allergy (diagnosed by a vet), whole grain diets are safer." },
      { question: "What grains are best for dogs?", answer: "Whole oats, brown rice, barley, and quinoa are excellent. They provide fiber, B vitamins, and minerals. Avoid corn and wheat if your dog has sensitivities, but these are safe for most dogs." },
      { question: "Should I switch from grain-free to whole grain?", answer: "Consult your veterinarian. If your dog has been on grain-free long-term, your vet may recommend an echocardiogram to check heart function before transitioning. Switch gradually over 7–10 days." }
    ]
  },
  scratchingPostVsCatTree: {
    title: "Scratching Post vs Cat Tree: Which Does Your Cat Need?",
    subtitle: "Detailed comparison of scratching posts and cat trees covering space requirements, scratching behavior, vertical territory, multi-cat households, and cost. AAFP and ISFM guidelines cited.",
    topicAName: "Scratching Post (Standalone)",
    topicBName: "Cat Tree (Multi-Level)",
    topicA: {
      pros: [
        { title: "Space Efficient", body: "A single scratching post takes only 1–2 sq ft of floor space — ideal for apartments and small rooms." },
        { title: "Lower Cost", body: "Quality scratching posts cost $15–40, while cat trees run $50–200+." },
        { title: "Targeted Scratching", body: "Dedicated scratching surface directs claw maintenance behavior to one location." },
        { title: "Easy to Move", body: "Lightweight and portable — reposition as needed to protect furniture." }
      ],
      cons: [
        "No vertical territory — cats need height to feel secure",
        "Limited enrichment — no climbing, perching, or hiding opportunities",
        "May tip over if not sturdy enough for vigorous scratching",
        "No multi-cat functionality — single scratching surface"
      ],
      bestFor: "Single-cat households with limited space, budget-conscious owners, or supplementing an existing cat tree with additional scratching surfaces."
    },
    topicB: {
      pros: [
        { title: "Vertical Territory", body: "Multi-level platforms satisfy the cat's instinct to climb, perch, and survey their territory from height." },
        { title: "Multi-Cat Friendly", body: "Multiple levels and perches reduce conflict by providing separate resting spots for each cat." },
        { title: "Enrichment Hub", body: "Combines scratching, climbing, perching, hiding, and playing in one structure." },
        { title: "Furniture Protection", body: "A well-placed cat tree with sisal posts redirects scratching from sofas and carpets." }
      ],
      cons: [
        "Large footprint — requires 4–9 sq ft of floor space",
        "Higher cost — quality cat trees start at $50 and go up to $200+",
        "Aesthetic concerns — some designs clash with home decor",
        "Stability issues — cheap models can wobble or tip, deterring use"
      ],
      bestFor: "Multi-cat households, single-cat households with adequate space, and cats showing vertical preference (climbing curtains, sitting on top of cabinets)."
    },
    rows: [
      { dimension: "Floor Space", topicA: "1–2 sq ft", topicB: "4–9 sq ft" },
      { dimension: "Cost", topicA: "$15–40", topicB: "$50–200+" },
      { dimension: "Vertical Territory", topicA: "None", topicB: "3–6 ft height" },
      { dimension: "Multi-Cat Use", topicA: "Single cat", topicB: "2–4 cats" },
      { dimension: "Scratching Surface", topicA: "One surface", topicB: "2–4 surfaces" },
      { dimension: "Enrichment Variety", topicA: "Minimal", topicB: "High (climb, perch, hide, play)" },
      { dimension: "Portability", topicA: "Easy", topicB: "Difficult" }
    ],
    verdict: "<strong>Start with a sturdy scratching post for every cat, then add a cat tree if you have the space and budget.</strong> Cats need both horizontal and vertical scratching options. A scratching post is the minimum baseline — a cat tree adds enrichment, territory, and stress reduction that significantly improves feline welfare. AAFP guidelines recommend at least one elevated resting spot per cat.",
    faq: [
      { question: "Does my cat need a cat tree if I have a scratching post?", answer: "A scratching post meets the scratching need, but cats also need vertical territory for security. If your cat climbs furniture or sits on high shelves, a cat tree provides enrichment. For multi-cat homes, a cat tree reduces conflict." },
      { question: "What height scratching post does my cat need?", answer: "At least 30 inches tall — cats need to fully stretch their body while scratching. For large breeds like Maine Coons, 36+ inches is recommended." },
      { question: "Where should I place a cat tree?", answer: "Near a window (for bird watching), in a socially significant room (living room), and not in isolated corners. Cats want to be where the family is while having a safe elevated perch." }
    ]
  }
};

// Add to en.json
if (!en.compare) {
  console.log('ERROR: en.json has no compare section!');
  process.exit(1);
}

for (const [key, value] of Object.entries(newCompareSections)) {
  if (!en.compare[key]) {
    en.compare[key] = value;
    console.log(`Added compare.${key} to en.json`);
  }
}

// Write updated en.json
fs.writeFileSync(path.join(messagesDir, 'en.json'), JSON.stringify(en, null, 2) + '\n', 'utf-8');
console.log(`\nUpdated en.json: now has ${getAllKeys(en).size} keys`);

// Now sync all other locales
const enKeys = getAllKeys(en);
const files = fs.readdirSync(messagesDir).filter(f => f.endsWith('.json'));

console.log('\n=== Syncing all locales ===');
for (const file of files) {
  const locale = file.replace('.json', '');
  if (locale === 'en') continue;
  
  const obj = readJson(path.join(messagesDir, file));
  const keys = getAllKeys(obj);
  
  let fixes = 0;
  
  // Remove extra keys
  const extraKeys = [...keys].filter(k => !enKeys.has(k));
  for (const k of extraKeys) {
    deleteNestedKey(obj, k);
    fixes++;
  }
  
  // Add missing keys
  const missingKeys = [...enKeys].filter(k => !getAllKeys(obj).has(k));
  for (const k of missingKeys) {
    const enVal = getNestedValue(en, k);
    if (enVal !== undefined) {
      setNestedValue(obj, k, enVal);
      fixes++;
    }
  }
  
  // Write back
  fs.writeFileSync(path.join(messagesDir, `${locale}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf-8');
  
  const finalKeys = getAllKeys(obj);
  const finalMissing = [...enKeys].filter(k => !finalKeys.has(k));
  const finalExtra = [...finalKeys].filter(k => !enKeys.has(k));
  console.log(`  ${locale}: ${fixes} fixes, ${finalMissing.length} missing, ${finalExtra.length} extra`);
}

// Count English values
console.log('\n=== Remaining English values ===');
const universalKeys = new Set([
  'toxicLanding.aspcaNumber', 'toxicLanding.petPoisonNumber', 'emergency.shared.aspcaLink',
  'common.unit.kcal', 'common.notFound.title',
]);

for (const file of files) {
  const locale = file.replace('.json', '');
  if (locale === 'en') continue;
  const obj = readJson(path.join(messagesDir, `${locale}.json`));
  let count = 0;
  for (const k of enKeys) {
    const enVal = getNestedValue(en, k);
    const locVal = getNestedValue(obj, k);
    if (typeof enVal === 'string' && enVal === locVal && enVal.length > 2 && !universalKeys.has(k)) {
      count++;
    }
  }
  console.log(`  ${locale}: ${count} English values`);
}

console.log('\nDone!');