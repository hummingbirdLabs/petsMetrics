/**
 * GEO FAQ 统一数据层
 *
 * 所有工具页的 FAQ JSON-LD 和可见 DOM 文本均由此模块提供。
 * 消除 page.tsx 硬编码 JSON-LD 与组件渲染的不一致风险。
 * 按 geo-checklist §2 要求：FAQ 可见文本必须与 JSON-LD mainEntity 一字不差。
 */
export type FaqItem = {
  question: string;
  answer: string;
};

/**
 * 将 FaqItem[] 转换为 FAQPage JSON-LD schema。
 */
export function generateFaqPageJsonLd(items: readonly FaqItem[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

// ── Dog Age Calculator ─────────────────────────────────
export const DOG_AGE_FAQ: FaqItem[] = [
  {
    question: "How do I calculate my dog's age in human years?",
    answer:
      "Our dog age calculator uses AAHA 2023 life stage guidelines adjusted by breed size. Small dogs age slower than large dogs — a 5-year-old Chihuahua is roughly 36 human years, while a 5-year-old Great Dane is about 42.",
  },
  {
    question: 'Why is the 7× rule inaccurate for dogs?',
    answer:
      'The "multiply by 7" formula ignores the rapid maturation in the first 2 years of a dog\'s life and the size-dependent aging rates. Our calculator accounts for breed size, which is backed by AAHA guidelines and UCSD methylation research.',
  },
  {
    question: 'How long do dogs live by breed?',
    answer:
      'Lifespan varies significantly by breed size: small dogs (under 10 kg) live 14-16 years, medium dogs (10-25 kg) live 12-14 years, large dogs (25-45 kg) live 10-12 years, and giant breeds (over 45 kg) live 7-10 years. Genetics, diet, exercise, preventive veterinary care, and weight management are the strongest longevity predictors. Mixed-breed dogs tend to live 1-2 years longer on average than purebreds of similar size, according to AAHA and AKC data.',
  },
  {
    question: 'What are the dog life stages?',
    answer:
      'AAHA defines four canine life stages: Puppy (0-1 year, rapid growth and socialization), Young Adult (1-4 years, peak physical condition), Mature Adult (5-10 years for small breeds, 5-7 for large breeds, preventive care focus), and Senior (varies by breed size — small dogs >10 years, giant breeds >7 years). Each stage requires different nutrition, exercise, and health screening protocols. Recognizing which stage your dog is in helps you provide proactive age-appropriate care.',
  },
];

// ── Cat Age Calculator ─────────────────────────────────
export const CAT_AGE_FAQ: FaqItem[] = [
  {
    question: 'How old is my cat in human years?',
    answer:
      'Cats age differently from dogs and humans. A 1-year-old cat is roughly 15 human years. A 5-year-old cat is about 36. Our calculator uses the AAHA/AAFP feline life stage guidelines.',
  },
  {
    question: 'What are the feline life stages?',
    answer:
      'According to AAHA/AAFP 2021 guidelines: Kitten (0–6 months), Junior (7 months–2 years), Prime (3–6 years), Mature (7–10 years), Senior (11–14 years), Geriatric (15+ years). Each stage has different health and checkup needs.',
  },
  {
    question: 'How long do cats live?',
    answer:
      'Indoor cats live 12-18 years on average, with many reaching 20+. Outdoor cats average only 2-5 years due to traffic, predators, disease, and environmental hazards. Well-cared-for indoor cats in their late teens are increasingly common, and the oldest recorded cat (Creme Puff) lived to 38 years. Key longevity factors include indoor lifestyle, regular veterinary checkups, species-appropriate nutrition, dental care, and maintaining a healthy weight (60% of indoor cats are overweight, which shortens lifespan by 1.5-2 years).',
  },
  {
    question: 'How does cat age compare to human age by life stage?',
    answer:
      'The AAFP/AAHA feline life stage chart maps cat age to human age: a 6-month-old kitten ≈ 10 human years, a 1-year-old cat ≈ 15, a 2-year-old ≈ 24, a 5-year-old ≈ 36, a 10-year-old ≈ 56, a 15-year-old ≈ 76, and a 20-year-old ≈ 96. After age 3, each cat year adds approximately 4 human years. Senior cats (11+) benefit from biannual veterinary exams and blood work to catch age-related diseases like kidney disease, hyperthyroidism, and dental disease early.',
  },
];

// ── Dog Calorie Calculator ─────────────────────────────
export const DOG_CALORIE_FAQ: FaqItem[] = [
  {
    question: "How do I calculate my dog's daily calorie needs?",
    answer:
      "Our calorie calculator uses the AAFCO Maintenance Energy Requirement (MER) formula: RER × activity multiplier. RER = 70 × (weight in kg)^0.75. The multiplier adjusts for neuter status, activity level, and life stage.",
  },
  {
    question: 'How much should I feed my dog each day?',
    answer:
      "The amount depends on your dog's weight, activity level, neuter status, and the calorie density of their food. Our calculator shows both the daily calorie target and the grams of food needed based on your specific dog food's kcal/kg.",
  },
  {
    question: "What's the difference between RER and MER for dogs?",
    answer:
      "RER (Resting Energy Requirement) is the baseline energy a dog needs at complete rest — no activity, no growth, no pregnancy. Calculated as 70 × weight(kg)^0.75, it's the minimum energy for vital functions like breathing, circulation, and body temperature regulation. MER (Maintenance Energy Requirement) adjusts RER for real life: MER = RER × activity factor. A neutered adult dog's activity factor is 1.6; an active puppy's is 3.0. MER is the number you actually use to determine daily food portions. Our calculator shows both values so you understand the full picture.",
  },
  {
    question: 'How many calories should I feed my puppy?',
    answer:
      "Puppies have much higher energy requirements than adult dogs. A puppy under 4 months needs approximately 3× their RER — that's nearly double an adult dog's calorie needs per kg of body weight. From 4 months to adulthood, the multiplier drops to 2× RER. Because puppies are growing rapidly, they need frequent meals (3-4 per day until 6 months) and calorie-dense nutrition. Our calculator adjusts for your puppy's age to give a calorie target appropriate for their growth stage. Always monitor body condition and adjust — the calculator provides a starting point, not an absolute rule.",
  },
];

// ── Dog Gestation Calculator ───────────────────────────
export const DOG_GESTATION_FAQ: FaqItem[] = [
  {
    question: 'How long are dogs pregnant?',
    answer:
      'Dogs are pregnant for about 63 days (9 weeks) from ovulation. However, the normal range is 58–68 days. The exact length depends on the timing of ovulation relative to mating. Our calculator estimates a range: earliest, most likely, and latest due date.',
  },
  {
    question: "How do I calculate my dog's due date?",
    answer:
      'Enter the first mating date into our calculator. If there were multiple matings, add additional dates — the calculator averages them for a more accurate estimate. Key milestones: ultrasound at day 28, X-ray at day 45, whelping box prep at day 55.',
  },
  {
    question: 'What are the stages of dog pregnancy week by week?',
    answer:
      'Dog pregnancy progresses through distinct stages: Weeks 1-2 — fertilization and embryo travel to the uterus, no visible signs. Week 3 — embryos implant; some dogs experience morning sickness. Week 4 — ultrasound can confirm pregnancy (day 25-28); nipples begin to enlarge. Week 5 — weight gain becomes noticeable; fetal heartbeats detectable by stethoscope. Week 6 — abdomen visibly enlarges; increased appetite. Week 7 — hair loss on belly (nesting area preparation); you can feel puppies move. Week 8 — milk production may begin; puppies are fully developed. Week 9 (day 58-68) — delivery. Set up a whelping box by day 55 in a quiet, warm area.',
  },
  {
    question: 'When can you confirm a dog pregnancy?',
    answer:
      'Pregnancy can be confirmed by a veterinarian through several methods at different stages: abdominal palpation (day 21-28, requires experienced hands), ultrasound (day 25-28, can detect heartbeats and estimate litter size), relaxin hormone blood test (day 25-30, highly accurate), and X-ray (day 45+, can count skeletons and confirm litter size most accurately). Home pregnancy tests for dogs are unreliable. Our gestation calculator helps you schedule these confirmations by marking the key dates on your timeline.',
  },
];

// ── Cat Gestation Calculator ───────────────────────────
export const CAT_GESTATION_FAQ: FaqItem[] = [
  {
    question: 'How long are cats pregnant?',
    answer:
      'Cats are pregnant for approximately 65 days (about 9 weeks) from mating. The range is 61–67 days. Our gestation calculator shows the expected due date range and key developmental milestones.',
  },
  {
    question: "How do I calculate my cat's due date?",
    answer:
      'Enter the first mating date into our calculator. If multiple matings occurred, add additional dates — the calculator averages them for a more accurate estimate. Key milestones include ultrasound confirmation at day 21, fetal development at day 28, and queening box preparation at day 55.',
  },
  {
    question: 'What are the signs of cat pregnancy?',
    answer:
      'Early signs of cat pregnancy include: pink, enlarged nipples ("pinking up") at around week 3 — this is the most reliable early indicator; increased appetite and possible morning sickness at weeks 3-4; noticeable weight gain and abdominal enlargement by weeks 4-5; and nesting behavior (seeking quiet, dark spaces) starting around week 7. Unlike dogs, cats are induced ovulators — ovulation occurs after mating, not on a regular cycle — so the mating date is typically an accurate conception marker. If you suspect pregnancy, a vet can confirm it via ultrasound as early as day 21.',
  },
  {
    question: 'How long is the cat gestation period compared to dogs?',
    answer:
      'Cat gestation averages 65 days (range 61-67 days), compared to dogs at 63 days (range 58-68 days). While the averages are similar, cats have a tighter range — 6 days vs. 10 days for dogs. Cat litters average 4-6 kittens, compared to dogs which vary greatly by breed (1-12+ puppies). Cat pregnancies are less variable because cats are induced ovulators, making the conception date easier to pinpoint. Both species share similar pregnancy confirmation milestones: ultrasound at ~day 21-28 and X-ray at ~day 45.',
  },
];

// ── Dog Vaccination Schedule ───────────────────────────
export const DOG_VACCINE_FAQ: FaqItem[] = [
  {
    question: 'Which vaccinations does my dog need?',
    answer:
      'Core vaccines (required for all dogs) include DHPP (Distemper, Hepatitis, Parvovirus, Parainfluenza) and Rabies. Non-core vaccines — Leptospirosis, Lyme Disease, Bordetella — depend on your region and lifestyle. Our schedule follows AAHA and WSAVA canine guidelines.',
  },
  {
    question: 'How often does my dog need booster shots?',
    answer:
      'After the puppy series (3 DHPP doses at 6-8, 12, and 16 weeks), DHPP boosters are every 3 years. Rabies boosters follow local laws (1-3 years). Non-core vaccines may need annual boosters. Our calculator generates a timeline tailored to your regional and lifestyle factors.',
  },
  {
    question: 'When do puppies need their first shots?',
    answer:
      'Puppies typically start their vaccination series at 6-8 weeks of age. The standard puppy schedule is: 6-8 weeks — 1st DHPP; 10-12 weeks — 2nd DHPP + optional Bordetella/Leptospirosis; 14-16 weeks — 3rd DHPP + Rabies. The series starts when maternal antibodies from the mother\'s milk begin to wane, which is why it\'s dangerous to take unvaccinated puppies to dog parks or high-traffic areas before the full series is complete. After the initial series, a 1-year booster is critical for lasting immunity.',
  },
  {
    question: 'Does my dog need a deworming schedule?',
    answer:
      'Yes, deworming is an important part of preventive care. Puppies should be dewormed at 2, 4, 6, and 8 weeks of age, then monthly until 6 months. Adult dogs typically need deworming every 3-6 months depending on lifestyle and risk factors (hunting, raw food diets, exposure to other animals). Common parasites include roundworms, hookworms, whipworms, and tapeworms. Our vaccination schedule includes deworming reminders alongside vaccine dates so you can coordinate vet visits efficiently.',
  },
];

// ── Cat Vaccination Schedule ───────────────────────────
export const CAT_VACCINE_FAQ: FaqItem[] = [
  {
    question: 'Which vaccinations does my cat need?',
    answer:
      'Core vaccines (required for all cats) include Rabies and FVRCP (feline viral rhinotracheitis, calicivirus, panleukopenia). Non-core vaccines like FeLV (feline leukemia virus) depend on your region and lifestyle. Our schedule follows WSAVA and AAFP feline guidelines.',
  },
  {
    question: 'How often does my cat need booster shots?',
    answer:
      'FVRCP boosters are typically every 1–3 years after the initial kitten series. Rabies boosters are every 1–3 years depending on local laws. Annual wellness exams are recommended even in non-booster years. Our calculator generates a personalized timeline.',
  },
  {
    question: 'When do kittens need their first shots?',
    answer:
      'Kittens start their vaccination series at 6-8 weeks: 1st FVRCP at 6-8 weeks, 2nd FVRCP at 10-12 weeks, 3rd FVRCP + Rabies at 14-16 weeks. The final dose is given at or after 16 weeks because maternal antibodies can persist until then — giving it earlier risks the vaccine being neutralized. Indoor-only kittens still need the full core series (FVRCP + Rabies). FeLV vaccination is recommended for kittens with outdoor access or exposure to FeLV-positive cats. A 1-year booster after the initial series is essential for long-term protection.',
  },
  {
    question: 'Does an indoor cat need the same vaccines as an outdoor cat?',
    answer:
      'Indoor-only cats still need all core vaccines (FVRCP + Rabies). FVRCP protects against airborne viruses that can enter through open windows, and rabies is legally required in most jurisdictions regardless of lifestyle — it also protects your cat if a bat enters your home, which is not uncommon. The main difference is non-core vaccines: indoor cats typically do not need FeLV (feline leukemia) vaccination. Our schedule adjusts for indoor vs. outdoor lifestyle to give you the right recommendation.',
  },
];

// ── Puppy Growth Predictor ─────────────────────────────
export const PUPPY_GROWTH_FAQ: FaqItem[] = [
  {
    question: 'How can I predict how big my puppy will get?',
    answer:
      "Our puppy growth predictor uses breed size growth curves. Enter your puppy's current age (in weeks), weight, and expected adult size. The tool interpolates from standardized growth curves to estimate adult weight with ±15% variance.",
  },
  {
    question: 'When do puppies stop growing?',
    answer:
      'It depends on breed size. Small dogs reach full size by 10–12 months, medium dogs by 12–15 months, large dogs by 18–24 months, and giant breeds can continue growing until 24–36 months.',
  },
  {
    question: 'Does paw size predict a puppy\'s adult size?',
    answer:
      'Partially. Large paws relative to body size can indicate significant growth ahead, but it\'s not a reliable metric on its own. Breed genetics and growth curves are much more accurate predictors. Other indicators include loose skin (room to grow into) and the puppy\'s current position on standardized breed growth charts. Our calculator combines your puppy\'s current weight and age with breed-specific growth curves, which is the most scientifically validated prediction method. For mixed breeds, we use the expected adult size category (small/medium/large/giant) you select.',
  },
];

// ── Cat BCS Weight Tracker ─────────────────────────────
export const CAT_BCS_FAQ: FaqItem[] = [
  {
    question: 'How do I tell if my cat is overweight?',
    answer:
      "Use the Body Condition Score (BCS) 1-9 scale. Feel your cat's ribs — you should feel them with a slight fat cover. Look down from above — there should be a visible waist behind the ribs. About 60% of indoor cats are overweight (BCS 6+).",
  },
  {
    question: 'What is hepatic lipidosis in cats?',
    answer:
      "Hepatic lipidosis (fatty liver disease) is a serious condition that occurs when a cat loses weight too quickly. The liver becomes overwhelmed with fat metabolism and can fail. Never restrict a cat's calories below 80% of their ideal-weight RER without veterinary supervision.",
  },
  {
    question: 'What is a healthy weight for my cat by breed?',
    answer:
      'Healthy adult cat weights vary by breed: Siamese (3-5 kg / 7-11 lbs), Persian (3-5.5 kg / 7-12 lbs), Bengal (4-7 kg / 8-15 lbs), Maine Coon (5-11 kg / 11-25 lbs), Ragdoll (5-9 kg / 10-20 lbs), British Shorthair (4-8 kg / 9-17 lbs). The average domestic shorthair/longhair cat weighs 3.5-5 kg (8-11 lbs). However, weight alone is not enough — body condition score (BCS) is a better indicator of health because it accounts for frame size. Two cats of the same breed at the same weight can have very different BCS scores.',
  },
  {
    question: 'How fast should my overweight cat lose weight?',
    answer:
      'Cats should lose weight very slowly — 0.5-2% of body weight per week is the safe maximum. For a 6 kg cat that should weigh 5 kg, this means losing 30-120 grams per week, taking 2-5 months to reach the target weight. Rapid weight loss (>2% per week) can trigger hepatic lipidosis, a life-threatening condition where fat overwhelms the liver. Our calculator sets a calorie target at 80% of ideal-weight RER, which is the clinical safety floor. Always involve your veterinarian in a weight loss plan, especially for cats that need to lose more than 1 kg.',
  },
];

// ── Cat Hydration Calculator ───────────────────────────
export const CAT_HYDRATION_FAQ: FaqItem[] = [
  {
    question: 'How much water does a cat need per day?',
    answer:
      'Cats need approximately 50 ml of water per kilogram of body weight per day. A 4.5 kg (10 lb) cat needs about 225 ml of water daily. This includes water from food — wet food is ~80% water, dry food is ~10% water.',
  },
  {
    question: 'How do I know if my cat is dehydrated?',
    answer:
      'Signs of dehydration in cats include lethargy, dry gums, loss of skin elasticity (skin tenting), sunken eyes, and decreased urination. Cats on dry-food-only diets are at highest risk. Use our hydration calculator to see if your cat gets enough water from food.',
  },
  {
    question: 'Why does my cat not drink enough water?',
    answer:
      'Cats evolved from desert wildcats and have a naturally low thirst drive — they are biologically programmed to get most of their water from prey, not standing water. In the wild, a mouse is ~70% water, so cats never needed to drink frequently. Modern dry kibble at only 10% moisture creates a chronic low-grade dehydration state. Solutions include: switching to wet food or adding water to dry food, using a cat water fountain (cats prefer moving water), placing multiple water bowls around the house (away from food and litter boxes), and flavoring water with tuna juice or low-sodium broth. A hydrated cat produces more dilute urine, which reduces the risk of FLUTD and kidney disease.',
  },
];

// ── Toxic Checker ──────────────────────────────────────
export const TOXIC_CHECKER_FAQ: FaqItem[] = [
  {
    question: 'What foods are toxic to dogs?',
    answer:
      'Common toxic foods for dogs include grapes, raisins, chocolate, xylitol, onions, garlic, macadamia nuts, avocado, alcohol, coffee/caffeine, raw yeast dough, and moldy food. Our toxic checker instantly identifies 200+ items with severity ratings and symptoms.',
  },
  {
    question: 'What should I do if my dog ate something toxic?',
    answer:
      'If your dog has ingested a toxic substance, contact ASPCA Poison Control at (888) 426-4435 or the Pet Poison Helpline at (855) 764-7661 immediately. Time is critical. Have the food/plant name and approximate amount consumed ready.',
  },
  {
    question: 'What plants are toxic to cats?',
    answer:
      'The most dangerous plants for cats include True Lilies (Lilium/Hemerocallis — even pollen causes fatal kidney failure), Sago Palm, Azalea/Rhododendron, Oleander, Autumn Crocus, Cyclamen, Daffodil/Tulip bulbs, Dieffenbachia (Dumb Cane), English Ivy, and Pothos/Devil\'s Ivy. Lilies are the #1 danger — all parts are toxic, including pollen groomed from fur and water from a vase. Treatment must begin within 6 hours for survival. Other common toxic plants include Aloe Vera, Peace Lily, Snake Plant, and Philodendron. Use our toxic checker to search any plant name for instant results.',
  },
];

// ── EU Pet Travel Checker ──────────────────────────────
export const EU_TRAVEL_FAQ: FaqItem[] = [
  {
    question: 'What documents does my pet need to travel to the EU?',
    answer:
      'Pets traveling to the EU need: an ISO-compliant microchip, a valid rabies vaccination (at least 21 days before travel), an EU Pet Passport or Animal Health Certificate, and for certain countries (UK, Ireland, Finland, Malta, Norway) a tapeworm treatment 1-5 days before entry.',
  },
  {
    question: 'How long before travel should I start preparing my pet for EU travel?',
    answer:
      'You should start at least 3-4 months before travel. Key timelines: rabies vaccination requires 21 days waiting period, and if a rabies antibody titer test is required, the blood sample must be taken at least 30 days after vaccination with an additional 3-month waiting period. Use our EU Travel Checker to get your specific timeline.',
  },
  {
    question: 'What is an EU Pet Passport and who needs one?',
    answer:
      'An EU Pet Passport is a standardized document issued by an authorized veterinarian in an EU member state. It contains the pet\'s microchip number, rabies vaccination records, and health information. EU residents can obtain one from their local vet. Non-EU residents (from the US, UK, Canada, Australia, etc.) cannot get an EU Pet Passport — instead, they need an EU Animal Health Certificate issued within 10 days of travel. The passport is valid for the pet\'s lifetime (as long as rabies vaccinations stay current); the Animal Health Certificate is valid for 4 months of intra-EU travel or a single re-entry to the issuing country.',
  },
];

// ── BARF Calculator ────────────────────────────────────
export const BARF_FAQ: FaqItem[] = [
  {
    question: 'How much raw food should I feed my dog?',
    answer:
      'Adult dogs typically eat 2-3% of their body weight in raw food daily. A 20 kg dog eats 400-600g per day. The 80-10-10 ratio breaks this into 80% muscle meat, 10% raw meaty bone, 5% liver, and 5% other secreting organs.',
  },
  {
    question: 'Is a raw food diet safe for dogs?',
    answer:
      'Raw diets carry pathogen risks (Salmonella, E. coli). Safety practices: freeze meat for 2-3 weeks, use human-grade sources, sanitize surfaces after feeding. Raw diets are not recommended for immunocompromised households. Always consult your vet before switching.',
  },
  {
    question: 'What is the 80-10-10 rule in BARF raw feeding?',
    answer:
      'The 80-10-10 rule is the foundational ratio for BARF (Biologically Appropriate Raw Food) diets: 80% muscle meat (protein source), 10% raw meaty bone (calcium and phosphorus), 5% liver (vitamin A, B vitamins, iron), and 5% other secreting organs like kidney, spleen, or pancreas (additional micronutrients). For cats, the muscle meat increases to 84% and the liver to 5%, while other organs increase to 10% with 0% vegetables (cats are obligate carnivores and do not require plant matter). This ratio mimics the composition of whole prey animals. Variety is key — rotate protein sources weekly across at least 3-4 different animals (beef, chicken, turkey, lamb, fish) for nutritional completeness.',
  },
  {
    question: 'Is BARF raw feeding suitable for beginners?',
    answer:
      'BARF raw feeding requires careful research and commitment. Beginners should: start with a commercially prepared raw diet to learn safe handling before making homemade food, work with a veterinary nutritionist to formulate a balanced recipe, invest in a kitchen scale for precise portioning, freeze meat for 2-3 weeks to reduce parasite risk, and NEVER feed raw diets to immunocompromised pets or in households with immunocompromised humans. Nutritional deficiencies (especially calcium, vitamin D, and taurine) are the most common beginner mistake — our calculator uses the NRC and FEDIAF nutrient standards to help prevent this. Transition gradually over 7-10 days, starting with 25% new food mixed with 75% old food.',
  },
];

// ── Pet Insurance Estimator ────────────────────────────
export const INSURANCE_FAQ: FaqItem[] = [
  {
    question: 'How much is pet insurance per month?',
    answer:
      'US average monthly premiums: dog accident & illness = $53/month, cat accident & illness = $32/month. Costs vary by breed, age, location, and coverage level. Accident-only plans start at ~$15-25/month.',
  },
  {
    question: 'Is pet insurance worth it?',
    answer:
      'For most pet owners, insurance pays off with a single major event: ACL surgery ($3,000-6,000), cancer treatment ($4,000-10,000), or emergency foreign body surgery ($2,000-5,000). Insurance covers 70-90% after deductible. Getting it while your pet is young and healthy is key — pre-existing conditions are not covered.',
  },
  {
    question: 'What does pet insurance cover vs. not cover?',
    answer:
      'Most pet insurance plans cover: accidents (broken bones, bite wounds, toxin ingestion), illnesses (cancer, diabetes, infections), surgeries, hospitalization, prescription medications, and diagnostic tests (X-rays, blood work, MRIs). Most do NOT cover: pre-existing conditions (anything diagnosed before the policy started or during the waiting period), routine wellness care (vaccines, dental cleanings, spay/neuter — unless you add a wellness rider), breeding/pregnancy costs, cosmetic procedures, and prescription food. Some insurers like Trupanion offer direct vet payment; others reimburse you after you pay the bill.',
  },
];
