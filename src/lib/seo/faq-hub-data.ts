/**
 * FAQ Hub 数据层
 *
 * 聚合各工具页 FAQ 到主题 Hub 页（nutrition / health / aging）。
 * 每个 Hub 页包含 10-15 条 FAQ，使用 <details>/<summary> Server Component 渲染。
 * PageRank 通过 "Back to Tool" 链接分发至各工具页。
 *
 * 数据来源：geo-faq.ts（DOG_CALORIE_FAQ, CAT_HYDRATION_FAQ 等）+ 内联补充
 */
import type { FaqItem } from '@/lib/seo/geo-faq';

export type FaqHubKey =
  | 'dogNutrition'
  | 'catNutrition'
  | 'dogHealth'
  | 'catHealth'
  | 'dogAging'
  | 'catAging';

export type FaqHubSection = {
  /** 来源工具页的路径（用于 PageRank 内链） */
  sourceHref: string;
  /** 来源工具页的显示名称 */
  sourceName: string;
  /** 该来源的 FAQ 条目 */
  faqs: FaqItem[];
};

export type FaqHubData = {
  /** Hub 页标题（含目标关键词） */
  title: string;
  /** Hub 页副标题（≤ 160 字符） */
  description: string;
  /** 关键词列表 */
  keywords: string[];
  /** 按主题分组的 FAQ 来源 */
  sections: FaqHubSection[];
  /** 相关工具 CTA 列表 */
  relatedTools: { name: string; href: string; description: string }[];
  /** 权威引用 */
  citations: { name: string; url: string }[];
};

export const FAQ_HUB_DATA: Record<FaqHubKey, FaqHubData> = {
  dogNutrition: {
    title: 'Dog Nutrition FAQs: Feeding, Diet & Food Safety',
    description:
      'Expert answers to the most common dog nutrition questions — calorie needs, feeding schedules, food safety, and diet selection. Based on AAFCO and WSAVA guidelines.',
    keywords: [
      'dog nutrition FAQs',
      'dog feeding questions',
      'how much to feed a dog',
      'dog food safety',
      'best dog food diet',
    ],
    sections: [
      {
        sourceHref: '/dog/calorie-calculator/',
        sourceName: 'Dog Calorie Calculator',
        faqs: [
          {
            question: "How do I calculate my dog's daily calorie needs?",
            answer:
              "Our calorie calculator uses the AAFCO Maintenance Energy Requirement (MER) formula: RER × activity multiplier. RER = 70 × (weight in kg)^0.75. The multiplier adjusts for neuter status, activity level, and life stage. A typical 20kg neutered adult dog needs approximately 1,200-1,400 kcal per day, but active individuals may need 30-50% more.",
          },
          {
            question: 'How much should I feed my dog each day?',
            answer:
              "The amount depends on your dog's weight, activity level, neuter status, and the calorie density of food. A 20kg adult dog typically needs 300-400g of dry kibble or 600-900g of wet food per day. Our calorie calculator shows both the daily calorie target and the grams of food needed based on your specific dog food's kcal/kg.",
          },
          {
            question: 'How many calories should I feed my puppy?',
            answer:
              "Puppies under 4 months need approximately 3× their RER — nearly double an adult dog's calorie needs per kg of body weight. From 4 months to adulthood, the multiplier drops to 2× RER. Because puppies grow rapidly, they need 3-4 meals per day until 6 months, then transition to 2 meals. Monitor body condition weekly and adjust — the calculator provides a starting point, not an absolute rule.",
          },
          {
            question: 'Should I feed my dog before or after a walk?',
            answer:
              "Veterinarians recommend feeding after a walk, not before — and waiting at least 30-60 minutes after exercise. The primary reason is bloat (GDV) prevention: exercising on a full stomach increases the risk of life-threatening stomach twisting, especially in large deep-chested breeds. If you must feed before exercise, wait at least 2 hours.",
          },
        ],
      },
      {
        sourceHref: '/dog/compare/dry-food-vs-wet-food/',
        sourceName: 'Dry Food vs Wet Food Comparison',
        faqs: [
          {
            question: 'Can I mix dry and wet dog food?',
            answer:
              "Yes, mixing is safe and often recommended. A common approach is 75% kibble + 25% wet food by calorie. Calculate your dog's total daily calorie needs first, then split between the two. Ensure the combined diet meets AAFCO nutrient profiles — most complete & balanced kibble is formulated to be fed alone.",
          },
          {
            question: 'Is wet food better for dogs with kidney disease?',
            answer:
              "Often yes. The high moisture content (75-80%) helps support kidney function by promoting hydration and flushing toxins. Dogs with chronic kidney disease are frequently recommended higher-moisture diets by veterinary nutritionists. A prescription renal diet may be needed in advanced cases.",
          },
          {
            question: 'Do dogs need wet food?',
            answer:
              "No, dogs do not need wet food if eating a complete and balanced dry diet and drinking adequate water. However, wet food provides meaningful benefits for hydration, palatability, and specific health conditions. It is a valuable option, not a necessity.",
          },
        ],
      },
      {
        sourceHref: '/shared/toxic-checker/',
        sourceName: 'Toxic Food & Plant Checker',
        faqs: [
          {
            question: 'What foods are toxic to dogs?',
            answer:
              'Common toxic foods include grapes, raisins (cause kidney failure at 0.3-0.6 oz per kg body weight), chocolate (theobromine toxicity), xylitol (causes hypoglycemia and liver failure at 0.1g/kg), onions (hemolytic anemia), garlic, macadamia nuts, avocado, alcohol, caffeine, raw yeast dough, and moldy food. Use our toxic checker to verify any food.',
          },
          {
            question: 'What should I do if my dog ate something toxic?',
            answer:
              'Contact ASPCA Poison Control at (888) 426-4435 or Pet Poison Helpline at (855) 764-7661 immediately. Time is critical. Have the food name, amount consumed, and your dog\'s weight ready. Do NOT induce vomiting unless instructed by a professional — some substances cause more damage coming back up.',
          },
        ],
      },
    ],
    relatedTools: [
      {
        name: 'Dog Calorie Calculator',
        href: '/dog/calorie-calculator/',
        description: "Calculate your dog's precise daily calorie needs based on weight, activity, and life stage.",
      },
      {
        name: 'Toxic Food Checker',
        href: '/shared/toxic-checker/',
        description: 'Instantly check if any food or plant is safe for your dog with ASPCA-backed data.',
      },
      {
        name: 'Dry vs Wet Food Comparison',
        href: '/dog/compare/dry-food-vs-wet-food/',
        description: 'Compare kibble vs canned diets: cost, moisture, shelf life, and health impacts.',
      },
    ],
    citations: [
      { name: 'AAFCO Dog Food Nutrient Profiles', url: 'https://www.aafco.org/' },
      { name: 'AAHA Canine Life Stage Guidelines (2021)', url: 'https://www.aaha.org/aaha-guidelines/life-stage-canine-2021/' },
      { name: 'WSAVA Global Veterinary Nutrition Guidelines', url: 'https://wsava.org/global-guidelines/vaccination-guidelines/' },
      { name: 'ASPCA Animal Poison Control Center', url: 'https://www.aspca.org/pet-care/animal-poison-control' },
    ],
  },
  catNutrition: {
    title: 'Cat Nutrition FAQs: Feeding, Hydration & Diet Questions',
    description:
      'Expert answers to common cat nutrition questions — hydration needs, wet vs dry food, feeding schedules, and safe foods. Based on AAFP and NRC feline guidelines.',
    keywords: [
      'cat nutrition FAQs',
      'cat feeding questions',
      'how much water does a cat need',
      'wet vs dry food for cats',
      'cat food safety',
    ],
    sections: [
      {
        sourceHref: '/cat/hydration-calculator/',
        sourceName: 'Cat Hydration Calculator',
        faqs: [
          {
            question: 'How much water does a cat need per day?',
            answer:
              'Cats need approximately 50ml of water per kilogram of body weight per day. A 4.5kg (10 lb) cat needs about 225ml of water daily. This includes water from food — wet food is ~80% water, dry food is ~10% food. Cats on dry-food-only diets need to drink significantly more.',
          },
          {
            question: 'How do I know if my cat is dehydrated?',
            answer:
              'Signs include lethargy, dry gums, loss of skin elasticity (gently pinch the scruff — slow return indicates dehydration), sunken eyes, and decreased urination. Cats on dry-food-only diets are at highest risk because they have a naturally low thirst drive inherited from desert ancestors.',
          },
          {
            question: 'Why does my cat not drink enough water?',
            answer:
              "Cats evolved from desert wildcats and have a naturally low thirst drive — they are biologically programmed to get most water from prey. A mouse is ~70% water, so cats never needed to drink frequently. Modern dry kibble at 10% moisture creates chronic low-grade dehydration. Solutions: switch to wet food, use a cat water fountain, place multiple water bowls around the house.",
          },
        ],
      },
      {
        sourceHref: '/cat/compare/wet-food-vs-dry-food/',
        sourceName: 'Wet vs Dry Food for Cats',
        faqs: [
          {
            question: 'Is wet food better for cats?',
            answer:
              "Wet food provides critical hydration (75-80% moisture) that supports kidney and urinary tract health. Most cats on wet food have lower rates of FLUTD (feline lower urinary tract disease) and chronic kidney disease. However, dry food is more convenient and can be left out for grazing. A combination approach is often ideal.",
          },
          {
            question: 'Should I free feed my cat?',
            answer:
              "Veterinary nutritionists generally advise against free feeding for most indoor cats. 60% of indoor cats are overweight, and free feeding is the #1 contributor. Best practice is scheduled meals (2-3 times per day) with measured portions. Puzzle feeders can simulate natural grazing while preventing overeating.",
          },
        ],
      },
      {
        sourceHref: '/cat/bcs-weight-tracker/',
        sourceName: 'Cat BCS & Weight Tracker',
        faqs: [
          {
            question: 'How do I tell if my cat is overweight?',
            answer:
              "Use the Body Condition Score (BCS) 1-9 scale. Feel your cat's ribs — you should feel them with slight fat cover. Look from above — there should be a visible waist behind the ribs. Look from the side — there should be an abdominal tuck. About 60% of indoor cats are overweight (BCS 6+).",
          },
          {
            question: 'How fast should my overweight cat lose weight?',
            answer:
              "Cats should lose weight very slowly — 0.5-2% of body weight per week is the safe maximum. Rapid weight loss (>2% per week) can trigger hepatic lipidosis, a life-threatening condition where fat overwhelms the liver. For a 6kg cat that should weigh 5kg, this means 2-5 months to reach the target safely.",
          },
        ],
      },
    ],
    relatedTools: [
      {
        name: 'Cat Hydration Calculator',
        href: '/cat/hydration-calculator/',
        description: 'Calculate your cat\'s daily water needs based on weight, diet type, and lifestyle.',
      },
      {
        name: 'Cat BCS & Weight Tracker',
        href: '/cat/bcs-weight-tracker/',
        description: 'Assess your cat\'s body condition and get a personalized weight management plan.',
      },
      {
        name: 'Wet vs Dry Food Comparison',
        href: '/cat/compare/wet-food-vs-dry-food/',
        description: 'Compare wet vs dry food for cats: hydration, cost, convenience, and health impacts.',
      },
    ],
    citations: [
      { name: 'AAFP Feline Life Stage Guidelines (2021)', url: 'https://catvets.com/life-stage-guidelines' },
      { name: 'NRC Nutrient Requirements of Dogs and Cats (2006)', url: 'https://nap.nationalacademies.org/catalog/10668/' },
      { name: 'WSAVA Global Nutrition Guidelines', url: 'https://wsava.org/global-guidelines/vaccination-guidelines/' },
    ],
  },
  dogHealth: {
    title: 'Dog Health FAQs: Vaccines, Growth & Wellness',
    description:
      'Expert answers to common dog health questions — vaccination schedules, growth milestones, spay/neuter timing, and preventive care. Based on WSAVA and AAHA guidelines.',
    keywords: [
      'dog health FAQs',
      'dog vaccination questions',
      'puppy growth milestones',
      'when to spay neuter dog',
      'dog wellness care',
    ],
    sections: [
      {
        sourceHref: '/dog/vaccination-schedule/',
        sourceName: 'Dog Vaccination Schedule',
        faqs: [
          {
            question: 'Which vaccinations does my dog need?',
            answer:
              'Core vaccines (required for all dogs) include DHPP (Distemper, Hepatitis, Parvovirus, Parainfluenza) and Rabies. Non-core vaccines — Leptospirosis, Lyme Disease, Bordetella — depend on your region and lifestyle. Our schedule follows AAHA and WSAVA canine guidelines.',
          },
          {
            question: 'How often does my dog need booster shots?',
            answer:
              'After the puppy series (3 DHPP doses at 6-8, 12, and 16 weeks), DHPP boosters are every 3 years. Rabies boosters follow local laws (1-3 years). Non-core vaccines may need annual boosters. Our calculator generates a timeline tailored to your regional factors.',
          },
          {
            question: 'When do puppies need their first shots?',
            answer:
              'Puppies start their vaccination series at 6-8 weeks of age. Standard schedule: 6-8 weeks — 1st DHPP; 10-12 weeks — 2nd DHPP + optional Bordetella/Leptospirosis; 14-16 weeks — 3rd DHPP + Rabies. The series starts when maternal antibodies from the mother\'s milk begin to wane.',
          },
          {
            question: 'What happens if I miss a puppy vaccination?',
            answer:
              'Missing by more than 4 weeks can create a "window of susceptibility" where the puppy has neither maternal nor vaccine-induced protection. If you miss a dose: do not restart the series. Contact your vet to give the missed dose as soon as possible. Keep your puppy away from high-risk areas until fully vaccinated.',
          },
        ],
      },
      {
        sourceHref: '/dog/puppy-growth-predictor/',
        sourceName: 'Puppy Growth Predictor',
        faqs: [
          {
            question: 'How can I predict how big my puppy will get?',
            answer:
              "Our puppy growth predictor uses breed size growth curves. Enter your puppy's current age, weight, and expected adult size. The tool interpolates from standardized growth curves to estimate adult weight with ±15% variance. For mixed breeds, select the expected size category.",
          },
          {
            question: 'When do puppies stop growing?',
            answer:
              'Small dogs reach full size by 10-12 months, medium dogs by 12-15 months, large dogs by 18-24 months, and giant breeds continue growing until 24-36 months. Growth plates (epiphyseal plates) close at different times by bone location — large breed puppies need controlled exercise until 18-24 months to protect joints.',
          },
        ],
      },
      {
        sourceHref: '/dog/compare/spayed-vs-unspayed/',
        sourceName: 'Spayed vs Unspayed Comparison',
        faqs: [
          {
            question: 'When should I spay or neuter my dog?',
            answer:
              'Current AAHA and ASVAB guidelines recommend individualized timing based on breed size. Small breeds: 6-9 months. Large/giant breeds: 12-24 months (after growth plate closure to reduce orthopedic risks). Discuss your specific breed\'s cancer and joint risk profile with your veterinarian.',
          },
        ],
      },
    ],
    relatedTools: [
      {
        name: 'Vaccination Schedule',
        href: '/dog/vaccination-schedule/',
        description: 'Generate a personalized vaccination timeline based on your dog\'s age and region.',
      },
      {
        name: 'Puppy Growth Predictor',
        href: '/dog/puppy-growth-predictor/',
        description: 'Predict your puppy\'s adult weight using breed-size-specific growth curves.',
      },
      {
        name: 'Dog Age Calculator',
        href: '/dog/age-calculator/',
        description: 'Convert your dog\'s age to human years and identify their current life stage.',
      },
    ],
    citations: [
      { name: 'AAHA Canine Life Stage Guidelines (2021)', url: 'https://www.aaha.org/aaha-guidelines/life-stage-canine-2021/' },
      { name: 'WSAVA Global Vaccination Guidelines (2024)', url: 'https://wsava.org/global-guidelines/vaccination-guidelines/' },
      { name: 'AVMA Pet Ownership and Demographics Sourcebook', url: 'https://www.avma.org/resources-tools/avma-policies/principles-vaccination' },
    ],
  },
  catHealth: {
    title: 'Cat Health FAQs: Vaccines, Indoor Life & Wellness',
    description:
      'Expert answers to common cat health questions — vaccination schedules, indoor vs outdoor risks, behavioral needs, and preventive care. Based on AAFP and ISFM guidelines.',
    keywords: [
      'cat health FAQs',
      'cat vaccination questions',
      'indoor cat health',
      'cat wellness care',
      'feline preventive medicine',
    ],
    sections: [
      {
        sourceHref: '/cat/vaccination-schedule/',
        sourceName: 'Cat Vaccination Schedule',
        faqs: [
          {
            question: 'Which vaccinations does my cat need?',
            answer:
              'Core vaccines (required for all cats) include Rabies and FVRCP (feline viral rhinotracheitis, calicivirus, panleukopenia). Non-core vaccines like FeLV (feline leukemia virus) depend on your region and lifestyle. Our schedule follows WSAVA and AAFP feline guidelines.',
          },
          {
            question: 'When do kittens need their first shots?',
            answer:
              'Kittens start their vaccination series at 6-8 weeks: 1st FVRCP at 6-8 weeks, 2nd FVRCP at 10-12 weeks, 3rd FVRCP + Rabies at 14-16 weeks. The final dose is given at or after 16 weeks because maternal antibodies can persist until then — giving it earlier risks neutralization.',
          },
          {
            question: 'Does an indoor cat need the same vaccines as an outdoor cat?',
            answer:
              'Indoor cats still need all core vaccines (FVRCP + Rabies). FVRCP protects against airborne viruses that can enter through windows, and rabies is legally required in most jurisdictions. The difference is non-core vaccines: indoor cats typically do not need FeLV vaccination unless exposed to other cats.',
          },
        ],
      },
      {
        sourceHref: '/cat/compare/indoor-vs-outdoor/',
        sourceName: 'Indoor vs Outdoor Cats',
        faqs: [
          {
            question: 'Is it cruel to keep a cat indoors?',
            answer:
              'No — with proper environmental enrichment, indoor cats live longer, healthier lives. Key needs: vertical space (cat trees), scratching posts, puzzle feeders, window perches with a view, and 15-20 minutes of daily interactive play. This satisfies their core behavioral needs entirely. The average indoor cat lives 12-18+ years vs 2-5 years for outdoor cats.',
          },
          {
            question: 'What is a catio and does it help?',
            answer:
              'A catio is an enclosed outdoor structure attached to a window, deck, or freestanding that allows cats to experience the outdoors safely. Catios provide fresh air, sunshine, bird-watching, and sensory enrichment without the risks of free roaming. They are the single best compromise for outdoor access.',
          },
        ],
      },
      {
        sourceHref: '/shared/toxic-checker/',
        sourceName: 'Toxic Food & Plant Checker',
        faqs: [
          {
            question: 'What plants are toxic to cats?',
            answer:
              'The most dangerous plants include True Lilies (Lilium/Hemerocallis — even pollen causes fatal kidney failure), Sago Palm, Azalea, Oleander, Autumn Crocus, Cyclamen, Daffodil/Tulip bulbs, Dieffenbachia, English Ivy, and Pothos. Lilies are the #1 danger — treatment must begin within 6 hours for survival.',
          },
        ],
      },
    ],
    relatedTools: [
      {
        name: 'Cat Vaccination Schedule',
        href: '/cat/vaccination-schedule/',
        description: 'Generate a personalized vaccination timeline for your cat based on age and lifestyle.',
      },
      {
        name: 'Indoor vs Outdoor Comparison',
        href: '/cat/compare/indoor-vs-outdoor/',
        description: 'Compare lifespan, health risks, and behavioral needs of indoor vs outdoor cats.',
      },
      {
        name: 'Toxic Food Checker',
        href: '/shared/toxic-checker/',
        description: 'Check if any plant or food is toxic to your cat with ASPCA-backed data.',
      },
    ],
    citations: [
      { name: 'AAFP Feline Life Stage Guidelines (2021)', url: 'https://catvets.com/life-stage-guidelines' },
      { name: 'WSAVA Global Vaccination Guidelines (2024)', url: 'https://wsava.org/global-guidelines/vaccination-guidelines/' },
      { name: 'ASPCA Animal Poison Control Center', url: 'https://www.aspca.org/pet-care/animal-poison-control' },
    ],
  },
  dogAging: {
    title: 'Dog Age FAQs: Senior Care, Longevity & Life Stages',
    description:
      'Expert answers to dog aging questions — life stage transitions, senior care needs, longevity factors, and when to start geriatric screenings. Based on AAHA and UCSD research.',
    keywords: [
      'dog age FAQs',
      'dog life stages',
      'when is a dog senior',
      'dog longevity',
      'senior dog care questions',
    ],
    sections: [
      {
        sourceHref: '/dog/age-calculator/',
        sourceName: 'Dog Age Calculator',
        faqs: [
          {
            question: "How do I calculate my dog's age in human years?",
            answer:
              "Our dog age calculator uses AAHA 2023 life stage guidelines adjusted by breed size. Small dogs age slower than large dogs — a 5-year-old Chihuahua is roughly 36 human years, while a 5-year-old Great Dane is about 42. The old 'multiply by 7' rule ignores rapid early maturation and size-dependent aging rates.",
          },
          {
            question: 'Why is the 7× rule inaccurate for dogs?',
            answer:
              'The "multiply by 7" formula ignores rapid maturation in the first 2 years and size-dependent aging rates. A 1-year-old dog is roughly 15 human years, a 2-year-old is about 24, then each year adds 4-7 human years depending on breed size. Our calculator accounts for breed size per AAHA guidelines and UCSD methylation research.',
          },
          {
            question: 'What are the dog life stages?',
            answer:
              'AAHA defines four canine life stages: Puppy (0-1 year), Young Adult (1-4 years), Mature Adult (5-10 for small breeds, 5-7 for large breeds), and Senior (varies — small dogs >10 years, giant breeds >7 years). Each stage requires different nutrition, exercise, and health screening protocols.',
          },
          {
            question: 'Why do small dogs live longer than large dogs?',
            answer:
              'The leading theory is accelerated aging in large breeds: large-breed cells divide faster and accumulate more oxidative damage. UCSD\'s epigenetic clock study found that large dogs\' DNA methylation patterns change faster after age 2, equivalent to aging ~1.3× faster per year. Cancer accounts for ~50% of giant breed deaths vs. ~25% in small breeds.',
          },
        ],
      },
      {
        sourceHref: '/dog/guide/senior-dog-care/',
        sourceName: 'Senior Dog Care Guide',
        faqs: [
          {
            question: 'When should I start senior dog care?',
            answer:
              'Start transitioning to senior care when your dog reaches the "Mature Adult" stage: around age 7 for giant breeds (Great Danes, Mastiffs), age 8-9 for large breeds, and age 10-11 for small and toy breeds. Key changes: biannual vet exams, blood work screening (kidney, liver, thyroid), joint supplements, and adjusted nutrition.',
          },
          {
            question: 'What health screenings do senior dogs need?',
            answer:
              'AAHA recommends biannual exams for senior dogs with blood work (CBC, chemistry panel, thyroid), urinalysis, blood pressure, and dental assessment. Additional screenings may include X-rays for arthritis, echocardiograms for heart murmurs, and eye exams for cataracts. Early detection of chronic kidney disease, diabetes, and cancer significantly extends quality of life.',
          },
        ],
      },
      {
        sourceHref: '/shared/compare/dog-years-vs-cat-years/',
        sourceName: 'Dog Years vs Cat Years Comparison',
        faqs: [
          {
            question: 'How does dog aging compare to cat aging?',
            answer:
              "Dogs age faster than cats in early life — a 1-year-old dog is ~15 human years while a 1-year-old cat is also ~15. But large dogs age significantly faster after age 5. A 10-year-old Great Dane (~70 human years) vs a 10-year-old cat (~56 human years). The difference is most pronounced in giant breeds.",
          },
        ],
      },
    ],
    relatedTools: [
      {
        name: 'Dog Age Calculator',
        href: '/dog/age-calculator/',
        description: 'Convert your dog\'s age to human years using breed-size-adjusted guidelines.',
      },
      {
        name: 'Dog Years vs Cat Years',
        href: '/shared/compare/dog-years-vs-cat-years/',
        description: 'Compare how dog and cat aging differ across breeds and lifestyles.',
      },
    ],
    citations: [
      { name: 'AAHA Canine Life Stage Guidelines (2021)', url: 'https://www.aaha.org/aaha-guidelines/life-stage-canine-2021/' },
      { name: 'Wang et al. — Quantitative Translation of Dog-to-Human Aging (UCSD, 2020)', url: 'https://doi.org/10.1016/j.cels.2020.06.006' },
    ],
  },
  catAging: {
    title: 'Cat Age FAQs: Senior Care, Longevity & Life Stages',
    description:
      'Expert answers to cat aging questions — life stage transitions, senior care needs, longevity factors, and when to start geriatric screenings. Based on AAFP and ISFM guidelines.',
    keywords: [
      'cat age FAQs',
      'cat life stages',
      'when is a cat senior',
      'cat longevity',
      'senior cat care questions',
    ],
    sections: [
      {
        sourceHref: '/cat/age-calculator/',
        sourceName: 'Cat Age Calculator',
        faqs: [
          {
            question: 'How old is my cat in human years?',
            answer:
              'A 1-year-old cat is roughly 15 human years. A 5-year-old is about 36. Our calculator uses the AAHA/AAFP feline life stage guidelines. After age 3, each cat year adds approximately 4 human years — a 10-year-old cat is about 56 human years, and a 15-year-old is about 76.',
          },
          {
            question: 'What are the feline life stages?',
            answer:
              'AAHA/AAFP 2021 guidelines: Kitten (0-6 months), Junior (7 months-2 years), Prime (3-6 years), Mature (7-10 years), Senior (11-14 years), Geriatric (15+ years). Each stage has different health and checkup needs.',
          },
          {
            question: 'How long do cats live?',
            answer:
              'Indoor cats live 12-18 years on average, with many reaching 20+. Outdoor cats average only 2-5 years due to traffic, predators, disease, and environmental hazards. Key longevity factors include indoor lifestyle, regular veterinary checkups, species-appropriate nutrition, dental care, and maintaining a healthy weight.',
          },
          {
            question: 'What is the oldest cat ever recorded?',
            answer:
              'The oldest cat ever recorded was Creme Puff, a domestic shorthair from Austin, Texas, who lived to 38 years and 3 days (1967-2005). The oldest living cat on record (as of 2024) is Flossie, a 28-year-old British tortoiseshell. Indoor cats routinely live 18-25 years with excellent care.',
          },
        ],
      },
      {
        sourceHref: '/cat/guide/senior-cat-care/',
        sourceName: 'Senior Cat Care Guide',
        faqs: [
          {
            question: 'When is a cat considered a senior?',
            answer:
              'Cats are considered "Senior" at 11-14 years (roughly 56-76 human years) and "Geriatric" at 15+ years. However, age-related changes begin earlier: kidney function decline can start at 7-8 years, and dental disease is prevalent by age 3. AAFP recommends biannual exams starting at age 7-8.',
          },
          {
            question: 'What health screenings do senior cats need?',
            answer:
              'AAFP recommendations for senior cats (11+ years): biannual exams with blood work (CBC, chemistry, thyroid T4), urinalysis (checking for protein loss and concentration), blood pressure screening (hypertension often accompanies kidney disease and hyperthyroidism), and dental assessment. Early detection of chronic kidney disease is critical — it affects 30-40% of cats over 10.',
          },
        ],
      },
      {
        sourceHref: '/shared/compare/dog-years-vs-cat-years/',
        sourceName: 'Dog Years vs Cat Years',
        faqs: [
          {
            question: 'How does cat aging compare to dog aging?',
            answer:
              "Cats age similarly to dogs in early years but maintain a more consistent aging rate throughout life. A 10-year-old cat (~56 human years) has aged more slowly than a large-breed dog of the same age (~66-70 human years). Cats\' consistent aging rate contributes to their longer average lifespan.",
          },
        ],
      },
    ],
    relatedTools: [
      {
        name: 'Cat Age Calculator',
        href: '/cat/age-calculator/',
        description: 'Convert your cat\'s age to human years using AAFP feline life stage guidelines.',
      },
      {
        name: 'Dog Years vs Cat Years',
        href: '/shared/compare/dog-years-vs-cat-years/',
        description: 'Compare how cat and dog aging differ across breeds.',
      },
    ],
    citations: [
      { name: 'AAFP Feline Life Stage Guidelines (2021)', url: 'https://catvets.com/life-stage-guidelines' },
      { name: 'ISFM Guidelines on Feline Aging', url: 'https://icatcare.org/' },
    ],
  },
};

/** 将所有 Hub FAQ 展平为单一 FaqItem[]（用于 FAQPage JSON-LD） */
export function flattenHubFaqs(hubKey: FaqHubKey): FaqItem[] {
  const hub = FAQ_HUB_DATA[hubKey];
  const all: FaqItem[] = [];
  for (const section of hub.sections) {
    for (const faq of section.faqs) {
      all.push(faq);
    }
  }
  return all;
}
