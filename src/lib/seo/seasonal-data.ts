/**
 * Seasonal Danger 数据层 — 8 个犬季节性安全专题
 *
 * 每页含 Knowledge Cards + Symptoms + Prevention + First Aid + Related Tools
 * 引用 AVMA、ASPCA、AAHA、AKC 等权威来源
 */

export type SeasonalKey =
  | 'summer-heat'
  | 'winter-paw-care'
  | 'christmas-foods'
  | 'halloween-candy'
  | 'fireworks-anxiety'
  | 'spring-allergies'
  | 'thanksgiving'
  | 'easter-chocolate';

export type KnowledgeCard = {
  title: string;
  body: string;
};

export type SeasonalData = {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  severity: string;
  season: string;
  knowledgeCards: KnowledgeCard[];
  prevention: string[];
  symptoms: string[];
  firstAid: { title: string; content: string }[];
  relatedEmergency: string;
  faqs: { question: string; answer: string }[];
  relatedTools: { name: string; href: string; description: string }[];
  citations: { name: string; url: string }[];
  bodyParagraphs: string[];
};

export const SEASONAL_DATA: Record<SeasonalKey, SeasonalData> = {
  'summer-heat': {
    slug: 'summer-heat',
    title: 'How to Keep Your Dog Cool in Summer: Heat Safety Guide',
    description:
      'Complete guide to preventing heatstroke in dogs — recognizing early symptoms, cooling techniques, unsafe temperature thresholds, and emergency steps. Based on ASPCA and veterinary emergency data.',
    keywords: [
      'how to keep dog cool in summer',
      'dog heatstroke prevention',
      'dog heatstroke symptoms',
      'hot weather dog safety',
      'can dogs overheat',
    ],
    severity: 'HIGH RISK',
    season: 'Summer (June–August)',
    knowledgeCards: [
      {
        title: 'Understanding Canine Heatstroke',
        body: 'Unlike humans, dogs sweat only through their paw pads and rely primarily on panting to cool down. When ambient temperature exceeds body temperature (101-102.5°F), panting becomes ineffective. Heatstroke occurs when core body temperature rises above 106°F, causing organ damage within minutes. According to ASPCA data, hundreds of dogs die from heatstroke each summer, many from preventable causes.',
      },
      {
        title: 'Unsafe Temperature Thresholds',
        body: 'At 80-85°F (27-29°C), large breeds and brachycephalic dogs (Bulldogs, Pugs, Boxers) are at elevated risk. At 90°F (32°C), all dogs need restricted outdoor time. A car interior reaches 102°F in 10 minutes on a 85°F day and 120°F in 30 minutes — even with windows cracked. (Source: AVMA temperature study)',
      },
      {
        title: 'Breeds at Highest Risk',
        body: 'Brachycephalic breeds (Pugs, Bulldogs, French Bulldogs, Boxers, Boston Terriers) have 2-3x higher heatstroke risk due to narrowed airways. Large/giant breeds (Mastiffs, Saint Bernards, Newfoundlands) retain more heat. Thick double-coated breeds (Huskies, Malamutes, Chow Chows) struggle in humidity. Puppies under 6 months and dogs over 7 years are also at elevated risk.',
      },
      {
        title: 'The Ground Temperature Rule',
        body: 'Air temperature alone is dangerous misinformation. Asphalt at 85°F air temperature reaches 140°F — hot enough to blister paw pads in 60 seconds. Test with the 7-second rule: place the back of your hand on the surface for 7 seconds. If it is uncomfortable for you, it burns your dog. Walk dogs on grass before 10 AM or after 6 PM.',
      },
    ],
    prevention: [
      'Walk dogs before 10 AM and after 6 PM when ground temperatures are safe',
      'Always provide shade and fresh water when outdoors',
      'Never leave a dog in a parked car — even for "just a minute"',
      'Use cooling mats, elevated beds, or damp towels indoors',
      'Carry water and a collapsible bowl on walks over 15 minutes',
      'Limit exercise intensity on humid days (humidity >60%)',
      'Consider clipping long-haired breeds (but do NOT shave double coats)',
    ],
    symptoms: [
      'Excessive panting or difficulty breathing',
      'Bright red or pale gums and tongue',
      'Thick, ropy drool',
      'Vomiting or diarrhea (may be bloody)',
      'Stumbling, weakness, or disorientation',
      'Elevated rectal temperature (normal: 101-102.5°F; heatstroke: >104°F)',
      'Collapse, seizures, or loss of consciousness',
    ],
    firstAid: [
      {
        title: 'Step 1: Move to Cool Area Immediately',
        content: 'Get your dog out of heat into shade or air conditioning. Remove any harness or restrictive clothing.',
      },
      {
        title: 'Step 2: Cool with Lukewarm Water (NOT Ice)',
        content: 'Pour cool (not cold) water over the neck, armpits, and groin areas where blood vessels are close to the surface. Ice-cold water causes vasoconstriction that traps heat inside. Do NOT force water if the dog cannot swallow.',
      },
      {
        title: 'Step 3: Offer Small Amounts of Water',
        content: 'Let your dog drink small amounts of cool water — do not use a syringe to force water into the mouth (aspiration risk). Add ice cubes to entice drinking.',
      },
      {
        title: 'Step 4: Transport to Vet Immediately',
        content: 'Heatstroke can cause internal organ damage that is not immediately visible. Even if your dog appears to recover, transport to a veterinarian for evaluation. Call ASPCA Poison Control at (888) 426-4435 if you are unsure about severity.',
      },
    ],
    relatedEmergency: '/dog/emergency/',
    faqs: [
      {
        question: 'At what temperature can dogs get heatstroke?',
        answer:
          'Dogs can develop heatstroke at temperatures above 85°F (29°C), especially in direct sun with humidity above 60%. The risk increases dramatically above 90°F. Brachycephalic breeds can suffer heatstroke at temperatures as low as 75°F due to their compromised airway anatomy. Critical danger zone: body temperature above 104°F begins causing organ damage; above 106°F is life-threatening.',
      },
      {
        question: 'Can dogs get heatstroke in the house?',
        answer:
          'Yes, indoor heatstroke is common when homes lack air conditioning or adequate ventilation. Dogs cannot cool themselves effectively in rooms above 85°F, especially with high humidity. Risk factors: upstairs rooms (heat rises), enclosed crates without airflow, and rooms with direct sun exposure through windows. Always provide a cool zone (tile floor, fan, or cooling mat) accessible to your dog.',
      },
      {
        question: 'How do I cool down a dog quickly and safely?',
        answer:
          'Use cool (not ice-cold) water on the neck, armpits, and groin. Offer small amounts of cool water to drink. Move to air conditioning or shade. Do NOT submerge in ice water — this causes dangerous shock. Do NOT use alcohol (toxic if licked). Transport to vet even if symptoms improve, as internal damage may not be immediately visible.',
      },
      {
        question: 'How long does it take for a dog to get heatstroke in a car?',
        answer:
          'A car interior heats up catastrophically fast: on an 85°F day, the interior reaches 102°F in just 10 minutes and 120°F in 30 minutes — even with windows cracked 2 inches. At these temperatures, a dog can develop fatal heatstroke in as little as 15-20 minutes. There is no safe duration. Never leave a dog in a parked car regardless of outside temperature or weather conditions.',
      },
    ],
    relatedTools: [
      { name: 'Dog Calorie Calculator', href: '/dog/calorie-calculator/', description: 'Adjust feeding for reduced summer activity levels.' },
      { name: 'Toxic Food Checker', href: '/shared/toxic-checker/', description: 'Verify summer food safety (grapes at BBQs, corn cobs, etc.).' },
    ],
    citations: [
      { name: 'ASPCA Animal Poison Control — Heatstroke', url: 'https://www.aspca.org/news/heat-safety-pets' },
      { name: 'AVMA Pet Heatstroke Prevention', url: 'https://www.avma.org/resources/pet-owners/petcare/pet-heatstroke' },
      { name: 'AAHA Canine Life Stage Guidelines', url: 'https://www.aaha.org/aaha-guidelines/life-stage-canine-2021/' },
    ],
    bodyParagraphs: [
      'Summer heat poses a serious and often underestimated threat to dogs. Unlike humans who have sweat glands distributed across their entire body, dogs primarily cool themselves through panting and limited sweating via paw pads. This biological constraint makes them uniquely vulnerable in warm weather, especially when humidity reduces the evaporative cooling efficiency of panting.',
      "The most critical misconception is that heatstroke only happens in extreme temperatures. In reality, most canine heatstroke cases the ASPCA responds to occur at what owners consider \"moderately warm\" days — 80-85°F — particularly when dogs are exercising or confined in poorly ventilated spaces. Brachycephalic breeds face a compounded risk: their shortened airways already restrict airflow, so the increased respiratory demand of cooling can quickly overwhelm their oxygen exchange capacity.",
      'Ground temperature is another often-ignored danger. At 75°F air temperature, asphalt can reach 125°F; at 86°F air, it reaches 135°F. At 140°F, second-degree burns to paw pads occur within 60 seconds. Always test surfaces with the 7-second hand rule before letting your dog walk on them.',
    ],
  },
  'winter-paw-care': {
    slug: 'winter-paw-care',
    title: 'Dog Paw Protection in Winter: Cold, Ice & Salt Safety',
    description:
      'Expert guide to protecting dog paws in winter — preventing frostbite, ice burn, and road salt irritation. Includes paw care routines, boot fitting, and emergency treatment for cold-weather injuries.',
    keywords: [
      'dog paw protection winter',
      'dog paw frostbite treatment',
      'dog road salt paws',
      'winter paw care dogs',
      'dog boots winter',
    ],
    severity: 'MODERATE RISK',
    season: 'Winter (December–February)',
    knowledgeCards: [
      {
        title: "Anatomy of a Dog's Paw Pads",
        body: 'Dog paw pads contain fat tissue for insulation, but this fat can freeze at temperatures below 20°F (-6°C). The digital pads and metacarpal pad have limited blood flow compared to other tissues, making them particularly vulnerable to frostbite. Repeated exposure to cold surfaces causes the pad skin to crack and bleed, creating entry points for infection.',
      },
      {
        title: 'Road Salt and Chemical Deicers',
        body: 'Common deicers include sodium chloride, calcium chloride, and magnesium chloride. These chemicals burn paw pad tissue on contact and cause gastrointestinal distress if licked. Calcium chloride is the most dangerous — it generates heat when it contacts wet skin and can cause chemical burns. "Pet-safe" deicers use urea or glycol-based formulas that are less irritating.',
      },
      {
        title: 'The Ice Ball Danger',
        body: 'Snow and ice accumulate between toes, forming tight ice balls that cut into the webbing between toes and restrict blood flow. This is painful and can cause tissue damage. Long-haired breeds (especially between toe pads) are most susceptible. Ice balls form within 10-15 minutes of walking in wet snow.',
      },
      {
        title: 'Frostbite Stages in Dog Paws',
        body: 'Stage 1: Pale, cold skin that is painful when touched. Stage 2: Skin feels hard and cold, may show discoloration (blue-gray). Stage 3: Blistering, blackened tissue indicating necrosis. The margins between normal and frostbitten tissue are not always clear — what appears mildly damaged may worsen over 24-48 hours as blood flow is re-established.',
      },
    ],
    prevention: [
      "Apply paw balm (Musher's Secret or similar) before walks to create a protective barrier",
      'Trim hair between toe pads to prevent ice ball formation',
      'Use dog boots (fit snugly, breathable) for walks over 10 minutes in snow/ice',
      'Wipe paws thoroughly with warm (not hot) water after every walk',
      'Avoid walking near treated roads and driveways',
      'Apply petroleum jelly to paw pads before walks if boots are not used',
      'Monitor paw pads for cracks, redness, or bleeding after each walk',
    ],
    symptoms: [
      'Limping or reluctance to walk (especially on hard surfaces)',
      'Licking or chewing at paws excessively',
      'Cracked, dry, or bleeding paw pads',
      'Dark or discolored skin on pads (blue-gray indicates frostbite)',
      'Swollen or painful toe webbing',
      'Visible ice balls between toes',
      'Small cuts or abrasions on paw pads',
    ],
    firstAid: [
      {
        title: 'Step 1: Remove from Cold and Gently Warm',
        content: 'Bring your dog indoors. Warm affected paws with lukewarm (body-temperature) water or warm towels for 15-20 minutes. Do NOT use hot water or heating pads — frostbitten tissue has reduced sensation and can burn easily.',
      },
      {
        title: 'Step 2: Remove Ice Balls and Debris',
        content: 'Gently remove ice balls from between toes using warm water to melt them. Do not pull ice out — this tears skin. Pat dry gently with a soft towel.',
      },
      {
        title: 'Step 3: Treat Chemical Burns',
        content: 'If road salt exposure occurred, gently flush paws with lukewarm water for 5 minutes to remove residue. Apply a thin layer of paw-safe moisturizer (not human lotion — lanolin and vitamin E based).',
      },
      {
        title: 'Step 4: Seek Veterinary Care for Frostbite',
        content: 'If pads appear black, very pale with no blood return when pressed, or if your dog is in significant pain, seek veterinary care immediately. Frostbite treatment may require pain management and antibiotics to prevent secondary infection.',
      },
    ],
    relatedEmergency: '/dog/emergency/',
    faqs: [
      {
        question: 'Can dog paws get frostbite?',
        answer:
          'Yes, dog paws are one of the most common frostbite sites in dogs. Paw pads have limited fat insulation and the blood vessels close to the cold surface constrict rapidly, reducing tissue oxygenation. Frostbite risk begins at temperatures below 20°F (-6°C) and increases with wet conditions and wind chill. Dogs with pre-existing conditions (diabetes, heart disease) have impaired circulation that accelerates frostbite onset.',
      },
      {
        question: 'Is road salt harmful to dogs?',
        answer:
          "Yes — common road salts (sodium chloride and especially calcium chloride) cause chemical burns on contact with paw pad tissue and gastrointestinal distress if ingested during grooming. Signs include red, cracked pads, reluctance to walk, and excessive paw licking. Use pet-safe deicers (urea-based) around your home and wipe your dog's paws immediately after walks near treated surfaces.",
      },
      {
        question: 'What are dog boots and do they work?',
        answer:
          'Dog boots provide insulation from cold, protection from salt/chemicals, and traction on ice. Look for boots with: snug fit (not too tight), breathable material, flexible sole, and adjustable straps. Introduce gradually — many dogs refuse boots initially. Short 5-minute exposures at home help them acclimate. Dogs with thick-coated feet (Huskies, Malamutes) may overheat in boots during vigorous activity.',
      },
      {
        question: "How can I protect my dog's paws without boots?",
        answer:
          "Apply paw balm (Musher's Secret, Musher's Choice) before each walk — it creates a breathable wax barrier against salt and ice. Trim interdigital hair to prevent ice ball formation. Limit walk duration to 15-20 minutes in temperatures below 25°F. After walks, wash paws with warm water and pat dry thoroughly, especially between toes.",
      },
    ],
    relatedTools: [
      { name: 'Dog Calorie Calculator', href: '/dog/calorie-calculator/', description: 'Adjust for increased winter energy needs.' },
      { name: 'Toxic Food Checker', href: '/shared/toxic-checker/', description: 'Verify winter holiday food safety.' },
    ],
    citations: [
      { name: 'ASPCA — Cold Weather Pet Safety', url: 'https://www.aspca.org/news/cold-weather-pet-safety' },
      { name: 'AVMA — Pet Winter Hazards', url: 'https://www.avma.org/resources-tools/pet-owners/petcare/cold-weather-animal-safety' },
      { name: 'AKC — Paw Care in Winter', url: 'https://www.akc.org/expert-advice/health/winter-paw-care/' },
    ],
    bodyParagraphs: [
      "Winter presents a unique set of challenges for dog paw health that many owners don't consider until injury occurs. The same paw pads that provide traction and sensory feedback on warm ground become vulnerable to cold damage, chemical burns, and abrasive injuries when exposed to freezing temperatures, ice-melt compounds, and sharp ice edges.",
      'Understanding the progression of cold-weather paw injuries helps owners intervene before permanent damage occurs. The first stage is simple pad dryness and cracking — uncomfortable but easily treated. Without protection, exposure to salt and ice progresses to chemical dermatitis, where the pad skin becomes inflamed and may ulcerate. Continued exposure in extreme cold leads to frostbite, where tissue freezes and may require veterinary intervention including pain medication and antibiotics.',
      'A frequently overlooked danger is the cumulative effect of daily exposure. A 15-minute walk on salt-treated sidewalks may cause minimal irritation, but doing this 5-7 days per week leads to chronic pad inflammation and cracking. Similarly, short exposures at moderate cold (30-35°F) can cause frostbite in as little as 30 minutes when combined with wet conditions and wind.',
    ],
  },
  'christmas-foods': {
    slug: 'christmas-foods',
    title: 'Christmas Foods Toxic to Dogs: Holiday Food Safety Guide',
    description:
      'Complete guide to Christmas foods dangerous for dogs — chocolate, xylitol-sweetened treats, cooked bones, grapes, onions, and alcohol. Includes emergency symptoms and what to do if your dog ate a toxic Christmas food.',
    keywords: [
      'christmas foods toxic to dogs',
      'dog ate christmas chocolate',
      'dog ate christmas ham',
      'xylitol christmas cookies dogs',
      'holiday food safety dogs',
    ],
    severity: 'HIGH RISK',
    season: 'Christmas Season (December)',
    knowledgeCards: [
      {
        title: 'Christmas Foods: Toxic vs Safe',
        body: 'The most dangerous Christmas foods for dogs include: chocolate (theobromine in all forms — baking chocolate is most toxic), xylitol in sugar-free candies and cakes (causes hypoglycemia at 0.1g/kg and liver failure), grapes and raisins in Christmas pudding and fruitcake (cause kidney failure at 0.3-0.6 oz/kg), onions and garlic in stuffing and gravy (cause hemolytic anemia), cooked bones (splinter and perforate), macadamia nuts in cookies, and alcohol in eggnog or rum cake.',
      },
      {
        title: 'Why Christmas is Peak Emergency Season',
        body: 'ASPCA Poison Control reports a 200-400% increase in holiday-related pet poisonings from December 20-26 compared to normal weeks. Main causes: unattended plates on coffee tables, accessible gift baskets with chocolate, sugar-free candy and gum placed within reach, well-meaning guests feeding "treats," and Christmas stockings containing toxic items left at dog level.',
      },
      {
        title: 'The Chocolate Danger Scale',
        body: 'Baking chocolate (unsweetened): 1 oz causes severe toxicity in a 20lb dog. Dark chocolate (70%+): 2 oz for 20lb dog. Milk chocolate: 8 oz for 20lb dog. White chocolate: minimal theobromine risk, but fat content causes pancreatitis. Christmas chocolate assortment boxes are particularly dangerous because they contain mixed types — ingestion of even one baking chocolate piece can be life-threatening.',
      },
      {
        title: 'Xylitol in Holiday Baking',
        body: 'Sugar-free Christmas cookies, cakes, and candies frequently contain xylitol (birch sugar), now popular in keto and diabetic recipes. A single sugar-free cookie can contain 5-10g of xylitol — toxic to a 30lb dog at just 3g. Xylitol causes a rapid insulin surge leading to hypoglycemia within 15-30 minutes, and at higher doses, acute liver failure within 12-24 hours.',
      },
    ],
    prevention: [
      'Keep all chocolate in closed cabinets or high shelves inaccessible to dogs',
      'Place sugar-free candy/cookies in sealed containers (not decorative bowls)',
      'Inform all guests that feeding the dog is NOT permitted',
      'Secure garbage bags containing food scraps immediately',
      'Keep a dog-safe treat jar by the kitchen for guests who want to give treats',
      'Clear plates from coffee tables after meals immediately',
      'Check stockings for chocolate coins, candy canes (xylitol risk), and raisins',
    ],
    symptoms: [
      'Vomiting and diarrhea (within 2-12 hours for most toxins)',
      'Hyperactivity, restlessness, rapid heartbeat (chocolate, caffeine)',
      'Weakness, collapse, seizures (xylitol hypoglycemia)',
      'Excessive thirst, decreased urination (grape/raisin toxicity)',
      'Pale gums, weakness (onion/garlic anemia — may take 2-5 days)',
      'Abdominal pain, bloody stool (bone obstruction or pancreatitis)',
      'Tremors, unsteadiness (alcohol or macadamia nut toxicity)',
    ],
    firstAid: [
      {
        title: 'Step 1: Identify What Was Eaten',
        content: 'Check the ingredient list immediately. Chocolate type, presence of xylitol, amount of grapes/raisins, and whether bones were consumed all determine emergency severity. Take a photo of the ingredient list if available.',
      },
      {
        title: 'Step 2: Estimate Amount and Time',
        content: 'Note the approximate amount consumed and time since ingestion. This information is critical for ASPCA Poison Control and your veterinarian to determine if the dose is toxic and whether intervention is needed.',
      },
      {
        title: 'Step 3: Contact Poison Control Immediately',
        content: 'Call ASPCA Animal Poison Control at (888) 426-4435 or Pet Poison Helpline at (855) 764-7661. Do NOT wait for symptoms — treatability drops significantly after the absorption window. Do NOT induce vomiting unless instructed.',
      },
      {
        title: 'Step 4: Prepare for Vet Visit',
        content: 'If directed to a vet, bring packaging/labels and a sample of vomit if available. Keep your dog calm and confined during transport. Prepare for potential IV fluids, activated charcoal, and blood work.',
      },
    ],
    relatedEmergency: '/dog/emergency/ate-chocolate/',
    faqs: [
      {
        question: 'My dog ate chocolate Christmas candy. What should I do?',
        answer:
          "Immediately call ASPCA Poison Control at (888) 426-4435 with: your dog's weight, the type and amount of chocolate eaten, and time since ingestion. Do NOT wait for symptoms. If the amount exceeds the toxic threshold for your dog's size (use our toxic checker or ask the hotline), go to an emergency vet for induced vomiting and activated charcoal. Theobromine from chocolate stays in a dog's system for up to 72 hours.",
      },
      {
        question: 'Are cooked Christmas ham bones safe for dogs?',
        answer:
          'No. Cooked bones of any kind — including ham, turkey, and beef bones — become brittle and splinter, causing potentially fatal throat, stomach, or intestinal perforation. Even large cooked bones can break teeth. Dispose of bone remnants in a sealed outdoor bin and never throw a cooked bone to your dog.',
      },
      {
        question: 'Is Christmas pudding dangerous for dogs?',
        answer:
          'Extremely dangerous. Christmas pudding typically contains grapes, raisins, and currants (all cause kidney failure in dogs), alcohol (toxic to the nervous system), suet (high fat causing pancreatitis), and sometimes brandy butter (alcohol and fat). Even a small bite can be toxic. Keep pudding well away from dogs and ensure no dropped pieces are accessible.',
      },
      {
        question: 'Can dogs eat turkey at Christmas?',
        answer:
          'Plain, unseasoned turkey meat in small amounts (1-2 tablespoons for a medium dog) is generally safe and not toxic. However: remove all skin (high fat causes pancreatitis), ensure no bones are included, and confirm no onion or garlic was used in preparation (common in stuffing and gravy and both are toxic). Do not give turkey that was prepared with herbs, butter, onions, or garlic.',
      },
    ],
    relatedTools: [
      { name: 'Toxic Food Checker', href: '/shared/toxic-checker/', description: 'Verify any holiday food ingredient instantly.' },
      { name: 'Dog Calorie Calculator', href: '/dog/calorie-calculator/', description: 'Track extra holiday treat calories.' },
      { name: 'Emergency: Ate Chocolate', href: '/dog/emergency/ate-chocolate/', description: 'Full chocolate toxicity emergency guide.' },
    ],
    citations: [
      { name: 'ASPCA Animal Poison Control — Holiday Hazards', url: 'https://www.aspca.org/pet-care/animal-poison-control/holiday-safety' },
      { name: 'Pet Poison Helpline — Holiday Hazards', url: 'https://www.petpoisonhelpline.com/pet-owners/holidays/' },
      { name: 'AAHA — Holiday Pet Safety', url: 'https://www.aaha.org/' },
    ],
    bodyParagraphs: [
      'The Christmas season creates a perfect storm of pet poisoning risk: abundant toxic foods are easily accessible, household routines are disrupted, and guests who do not know pet safety rules may inadvertently feed dangerous items. ASPCA data shows that the week between Christmas and New Year consistently produces the highest volume of pet poisoning calls throughout the entire year.',
      'Many traditional Christmas foods are individually dangerous, but the greatest risk comes from combination. A single Christmas pudding contains grapes (kidney failure toxin), alcohol (neurotoxin), and suet (pancreatitis trigger). Similarly, a holiday cookie platter might have chocolate chip (theobromine), sugar-free cookies (xylitol), and macadamia nuts (neurotoxin) — each from different toxic categories requiring different treatments.',
      'Prevention is dramatically more effective than treatment in holiday poisoning scenarios. The toxins involved (theobromine, xylitol, grapetoxin) have no antidotes — treatment relies on early decontamination (induced vomiting), supportive care (IV fluids), and time. Owners who implement simple barriers (closed cabinets, guest education, sealed garbage) eliminate 90% of poisoning risk.',
    ],
  },
  'halloween-candy': {
    slug: 'halloween-candy',
    title: 'My Dog Ate Halloween Candy: Emergency Action Plan',
    description:
      'Emergency guide for dogs who ate Halloween candy — recognizing toxicity signs, when to rush to the vet, which candy types are most dangerous, and how to prevent Halloween pet emergencies.',
    keywords: [
      'dog ate halloween candy',
      'halloween candy toxic to dogs',
      'dog ate chocolate halloween',
      'xylitol halloween candy dog',
      'halloween pet emergency',
    ],
    severity: 'CRITICAL RISK',
    season: 'Halloween (October)',
    knowledgeCards: [
      {
        title: 'The Big Four Toxic Candy Types',
        body: '1) Chocolate (all forms — theobromine toxicity). 2) Xylitol (sugar-free gum, candy — hypoglycemia and liver failure). 3) Raisins (some snack boxes — kidney failure). 4) Candy wrappers (foil/plastic causes intestinal obstruction). A single piece of xylitol gum can be fatal to a 15lb dog according to ASPCA data.',
      },
      {
        title: 'Halloween-Specific Risk Factors',
        body: 'Trick-or-treat bags placed on floors or low tables, candy bowls left unattended at doors, children dropping pieces on the floor, and "share your candy" moments with dogs create peak Halloween poisoning risk. ASPCA reports that Halloween is one of the top 3 days for pet poisonings annually. The combination of high candy volume and disrupted supervision increases exposure dramatically.',
      },
      {
        title: 'Candy Wrapper Dangers',
        body: 'Foil and plastic candy wrappers are often consumed along with candy. In small dogs, a few wrappers can cause intestinal obstruction requiring surgical removal. Foil may also contain residual chocolate that is absorbed. Symptoms of obstruction: vomiting (especially repeatedly), no bowel movement, lethargy, and abdominal pain within 12-48 hours.',
      },
      {
        title: 'Chocolate + Xylitol Combo Risk',
        body: 'Many Halloween candy assortments contain both chocolate-covered items and sugar-free gum/candy. If your dog eats from a mixed bag, they may be exposed to both theobromine (from chocolate) AND xylitol (from sugar-free items). This combination is particularly dangerous because the symptoms overlap (vomiting, weakness) but the treatments differ significantly.',
      },
    ],
    prevention: [
      'Store all trick-or-treat candy in closed containers above counter height',
      'Use a closed candy bowl with a tight lid for trick-or-treaters (no open bowls)',
      'Keep dogs in a separate room during trick-or-treating hours',
      "Inspect your child's haul for dropped pieces immediately after returning home",
      'Never give your dog candy from your hand or plate',
      'Consider calming treats or pheromone diffusers for dogs stressed by doorbell noise',
      "Know your vet's emergency number and ASPCA Poison Control ((888) 426-4435) in advance",
    ],
    symptoms: [
      'Vomiting or diarrhea within 2-12 hours',
      'Rapid breathing, elevated heart rate, restlessness (chocolate/theobromine)',
      'Lethargy, weakness, collapse within 15-30 minutes (xylitol hypoglycemia)',
      'Excessive thirst and urination followed by decreased urination (raisin toxicity)',
      'Repeated vomiting with no bowel movement (possible obstruction)',
      'Tremors, seizures (severe chocolate or xylitol toxicity)',
      'Abdominal bloating or pain',
    ],
    firstAid: [
      {
        title: 'Step 1: Assess What Was Eaten',
        content: 'Immediately identify the candy type: chocolate (milk/dark/baking), gum (check for xylitol in first 3 ingredients), raisins, or wrappers. Keep all packaging — ingredient lists and weight information are critical.',
      },
      {
        title: 'Step 2: Call Poison Control Before Taking Action',
        content: 'Call ASPCA Poison Control at (888) 426-4435. DO NOT induce vomiting at home — this can worsen certain toxin exposures. Only induce vomiting if directed by a professional, and never if your dog is already vomiting, seizing, or unconscious.',
      },
      {
        title: 'Step 3: Note Timing and Amount',
        content: 'Estimate how many pieces were consumed, what type (by weight), and when. Take photos of packaging to bring to the vet. This information determines toxicity severity and treatment protocol.',
      },
      {
        title: 'Step 4: Transport to Emergency Vet if Directed',
        content: 'If Poison Control directs you to a vet, go immediately — do not wait for symptoms. Chocolate and xylitol toxicity are time-sensitive. Induced vomiting is most effective within 1-2 hours of ingestion.',
      },
    ],
    relatedEmergency: '/dog/emergency/ate-xylitol/',
    faqs: [
      {
        question: 'How much Halloween candy is toxic to a dog?',
        answer:
          'It depends on the type, not just amount. Toxic thresholds: Xylitol: 0.1g/kg body weight (one stick of gum for a 15lb dog). Dark chocolate: 0.5 oz per 10 lb body weight. Baking chocolate: 0.1 oz per 10 lb body weight. Milk chocolate: 1 oz per 10 lb body weight. Raisins: 0.1 oz per 10 lb body weight. Candy wrappers: any amount can cause obstruction in small dogs.',
      },
      {
        question: 'My dog ate chocolate candy wrappers. What should I do?',
        answer:
          'Call Poison Control at (888) 426-4435 with the chocolate type and estimated amount consumed. Wrappers add two concerns: (1) foil/plastic may cause intestinal obstruction, especially in dogs under 15lb; (2) residual chocolate absorbed from wrappers adds to theobromine load. Monitor for vomiting, lack of bowel movement, and abdominal pain for 48 hours.',
      },
      {
        question: 'Can I make my dog vomit at home after eating candy?',
        answer:
          'Do NOT induce vomiting at home with hydrogen peroxide or salt unless specifically instructed by a veterinarian or Poison Control. Inducing vomiting is contraindicated for: caustic substances, if your dog is already vomiting, if your dog is lethargic or seizing, or if more than 2 hours have passed. Improper technique can cause aspiration pneumonia or worsen the injury.',
      },
      {
        question: 'How quickly does candy toxicity affect dogs?',
        answer:
          'Xylitol: 15-30 minutes (hypoglycemia) or 8-12 hours (liver failure). Chocolate: 2-4 hours (symptoms appear), peaks at 12-24 hours. Raisins: 6-24 hours (vomiting), kidney damage at 24-72 hours. Wrappers: 12-48 hours (obstruction symptoms). Always treat candy ingestion as an emergency and contact Poison Control immediately.',
      },
    ],
    relatedTools: [
      { name: 'Toxic Food Checker', href: '/shared/toxic-checker/', description: 'Check any candy ingredient toxicity instantly.' },
      { name: 'Emergency: Ate Xylitol', href: '/dog/emergency/ate-xylitol/', description: 'Xylitol poisoning emergency protocol.' },
      { name: 'Emergency: Ate Chocolate', href: '/dog/emergency/ate-chocolate/', description: 'Chocolate toxicity emergency guide.' },
    ],
    citations: [
      { name: 'ASPCA Poison Control — Halloween Pet Safety', url: 'https://www.aspca.org/pet-care/halloween-pet-safety' },
      { name: 'Pet Poison Helpline — Halloween Dangers', url: 'https://www.petpoisonhelpline.com/pet-owners/holidays/' },
      { name: 'FDA — Xylitol and Your Dog', url: 'https://www.fda.gov/animal-veterinary/resources-you/xylitol-and-your-dog' },
    ],
    bodyParagraphs: [
      'Halloween presents one of the highest-risk scenarios for pet poisonings throughout the year. The convergence of abundant toxic substances (chocolate, xylitol, raisins), disrupted household routines, and children who may not recognize danger creates conditions where even well-cared-for dogs can quickly ingest life-threatening amounts of toxins.',
      'The xylitol risk deserves special emphasis because sugar-free candy and gum are increasingly common in Halloween assortments. Unlike chocolate where the amount needed for toxicity is relatively large, xylitol is toxic in tiny amounts — a single piece of certain sugar-free gum brands contains enough xylitol to cause fatal hypoglycemia in a small dog within 30 minutes. Many owners do not realize their dog has eaten gum because wrappers are discarded separately from the gum itself.',
      'Rapid recognition and response dramatically improve outcomes. Dogs treated within 1-2 hours of xylitol ingestion have excellent prognosis; treatment delay beyond 6 hours significantly increases mortality. Chocolate ingestion follows a similar time-sensitivity curve — induced vomiting within 1 hour removes 40-50% of stomach contents, but effectiveness drops to near zero after 2 hours when gastric emptying has occurred.',
    ],
  },
  'fireworks-anxiety': {
    slug: 'fireworks-anxiety',
    title: 'How to Calm a Dog During Fireworks: Anxiety Management Guide',
    description:
      'Complete guide to managing dog fireworks anxiety — from prevention strategies and environmental management to medications, behavioral techniques, and what to do if your dog panics.',
    keywords: [
      'how to calm dog during fireworks',
      'dog fireworks anxiety treatment',
      'fireworks scared dog',
      'dog thunder fireworks phobia',
      'fireworks night dog safety',
    ],
    severity: 'MODERATE-HIGH RISK',
    season: 'New Year & Holiday Celebrations (Dec/Jan, July 4th)',
    knowledgeCards: [
      {
        title: 'Understanding Canine Noise Phobia',
        body: 'According to behavioral studies, 40-60% of dogs show fear responses to fireworks or thunderstorms. Of those, approximately 20% develop clinical noise phobia requiring intervention. Fireworks are particularly distressing because: (1) sudden unpredictable loud bangs trigger startle reflex, (2) low-frequency vibrations are felt through the body, (3) flashing lights create strobing effect that dogs perceive as threatening, and (4) static electricity buildup in some dogs adds to discomfort.',
      },
      {
        title: 'Physical Dangers of Fireworks Panic',
        body: 'Firework-anxious dogs are at risk of: running away (50% of lost-dog incidents on July 4th are fireworks-related per AKC), darting into traffic, jumping fences (even dogs that normally do not escape), injuring themselves on windows or doors attempting to flee, and in extreme cases, cardiac events from the stress response. Some dogs break teeth or nails trying to chew through doors or crates.',
      },
      {
        title: 'When Anxiety Becomes a Phobia',
        body: 'Signs your dog has progressed from anxious to phobic: anticipatory anxiety starts hours before sunset, refuses to go outside in the evening, hides in inaccessible places, shows stress signs even at very low volume sound playback, and generalized anxiety extends beyond fireworks nights into general hypervigilance. Phobic dogs often require medication (prescribed by your vet) combined with behavior modification.',
      },
      {
        title: 'Medication vs Natural Options',
        body: 'For moderate-segment anxiety: situational medications prescribed by vets (trazodone, gabapentin, sileo) are effective and safe. For mild anxiety: pheromone diffusers (Adaptil), compression wraps (ThunderShirt), L-theanine supplements, and calming treats may help. For phobic dogs: require a multi-modal approach combining medication + environmental management + desensitization training over weeks/months.',
      },
    ],
    prevention: [
      'Exercise your dog well before fireworks begin (exhaustion reduces anxiety response)',
      'Create a "safe room" — interior room with no windows, white noise, familiar bed',
      'Start desensitization training 4-6 weeks before known firework dates (not during)',
      'Use Adaptil pheromone diffuser 2 weeks before predicted events',
      'Ensure microchip info is updated and collar ID tags are current',
      'Close curtains/blinds and turn on TV or music to mask noise',
      'Remove access to windows and glass doors',
    ],
    symptoms: [
      'Panting, pacing, trembling',
      'Whining, barking at sounds',
      'Attempting to hide or escape',
      'Refusing food or treats',
      'Drooling excessively, dilated pupils',
      'Clinging to owner or trying to climb on lap',
      'Incontinence (loss of bladder control in severe fear)',
      'Destructive behavior (chewing doors, scratching walls)',
    ],
    firstAid: [
      {
        title: 'Step 1: Stay Calm and Confident',
        content: 'Your dog takes emotional cues from you. Speak in a cheerful, casual tone rather than soothing (soothing tone validates fear). Do not punish anxiety behavior — your dog is experiencing genuine terror, not misbehaving.',
      },
      {
        title: 'Step 2: Provide a Safe Retreat Space',
        content: 'Guide your dog to a quiet interior room with the door closed. Turn on a TV or white noise machine at moderate volume. Provide their favorite bed or crate with the door open (never force a dog into a crate — this increases panic if they associate it with confinement during fear).',
      },
      {
        title: 'Step 3: Use Distraction Techniques',
        content: 'Offer high-value treats (peanut butter Kong, frozen treats) to redirect focus. Practice basic commands your dog knows well — "sit," "touch," or "find it" redirect the brain from fear to work. Do not force interaction if your dog prefers to hide.',
      },
      {
        title: 'Step 4: Prevent Escape',
        content: 'If your dog bolts toward a door, use a leash or body block — never chase, as this escalates panic. After fireworks end, check that your dog is calm before opening exterior doors. Monitor for 20-30 minutes after the last noise before allowing outdoor access.',
      },
    ],
    relatedEmergency: '/emergency',
    faqs: [
      {
        question: 'What can I give my dog for fireworks anxiety?',
        answer:
          'Options range by severity: Mild: L-theanine supplements (Anxitane, Solliquin), pheromones (Adaptil diffuser/collar), compression wraps (ThunderShirt). Moderate: trazodone or gabapentin prescribed by your vet (takes 1-2 hours to work). Severe: Sileo (dexmedetomidine gel on gums, FDA-approved for dog noise aversion) or sedation. Never give human anxiety medications without veterinary guidance.',
      },
      {
        question: 'How long before fireworks should I give my dog anxiety medication?',
        answer:
          'Plan ahead: trazodone/gabapentin require 1-2 hours to reach effectiveness. Give BEFORE fireworks start — once your dog is in full panic mode, oral medications are difficult to administer and take too long to work. For known firework dates (New Year, July 4), start medication 2-3 hours before sunset.',
      },
      {
        question: 'How can I desensitize my dog to fireworks?',
        answer:
          'Desensitization requires starting 8-12 weeks before firework season: (1) Play firework sounds at very low volume (barely audible) during positive activities (feeding, play). (2) Over weeks, gradually increase volume. (3) If your dog shows fear at any level, reduce volume — this means you progressed too fast. (4) Pair sounds with high-value treats to create positive association. Consider hiring a certified behaviorist for severe phobias.',
      },
      {
        question: "Do fireworks hurt my dog's hearing?",
        answer:
          'Fireworks reach 150-175 dB — loud enough to cause permanent hearing damage (pain threshold for dogs is approximately 130 dB, lower than humans). Dogs have more sensitive hearing and more ear canal amplification. This is another reason dogs panic — it physically hurts. Never let your dog watch fireworks, even outdoors at a distance.',
      },
    ],
    relatedTools: [{ name: 'Dog Age Calculator', href: '/dog/age-calculator/', description: 'Senior dogs may need adjusted anxiety medication dosing.' }],
    citations: [
      { name: 'AKC — Fireworks and Dogs', url: 'https://www.akc.org/expert-advice/lifestyle/fireworks-and-dogs/' },
      { name: 'AVMA — Noise Aversion in Pets', url: 'https://www.avma.org/resources/pet-owners/petcare/noise-aversion-pets' },
      { name: 'AVSAB — Behavior Guidelines', url: 'https://avsab.org/' },
    ],
    bodyParagraphs: [
      'Fireworks anxiety in dogs is one of the most common behavioral problems reported by pet owners, and it carries genuine physical risks beyond distress. Each year, animal shelters report 30-60% increases in stray dog intakes around July 4th in the United States, and similar patterns occur around New Year celebrations and other firework-heavy holidays worldwide.',
      'The progression from mild anxiety to severe phobia often happens gradually: a dog that initially trembled but recovered develops anticipatory anxiety hours before events, then begins showing stress on any evening that resembles a fireworks night. Early intervention with appropriate tools prevents this escalation. Dogs that have suffered panic episodes may have elevated stress hormones for days afterward, affecting immune function and sleep quality.',
      'It is important to understand that comforting a frightened dog does not reinforce fear — this is a persistent myth that causes owners to ignore their dog\'s distress. Dogs experiencing noise phobia are in genuine terror, not seeking attention. Providing a safe space and calm presence helps them feel secure. However, dramatically exaggerated soothing ("Who\'s a good boy, don\'t worry everything is fine") can be interpreted as anxiety — instead, act as if everything is normal.',
    ],
  },
  'spring-allergies': {
    slug: 'spring-allergies',
    title: 'Dog Spring Allergies: Symptoms, Treatment & Prevention',
    description:
      'Complete guide to canine spring allergies — pollen, grass, mold. Learn to identify allergy symptoms, distinguish them from infections, and implement effective treatment plans based on veterinary dermatology guidelines.',
    keywords: [
      'dog spring allergies symptoms',
      'dog pollen allergy treatment',
      'dog seasonal allergies spring',
      'canine atopic dermatitis',
      'dog skin allergies',
    ],
    severity: 'CHRONIC RISK',
    season: 'Spring (March–May)',
    knowledgeCards: [
      {
        title: 'Types of Spring Allergies in Dogs',
        body: 'Canine spring allergies fall into three categories: (1) Atopic dermatitis — inhalation allergic reaction to pollen (tree, grass, weed), affecting skin and ears. (2) Contact allergies — direct skin reaction to grass, mulch, or pesticides. (3) Flea allergy dermatitis — spring flea population explosion triggers severe reactions even from single flea bites. At least 10-15% of dogs suffer from seasonal allergies per AAHA data.',
      },
      {
        title: 'Common Spring Allergen Timeline',
        body: "Tree pollen peaks March–April (oak, birch, cedar, maple). Grass pollen peaks May–June (Bermuda, Timothy, Kentucky bluegrass). Weed pollen begins late June. Mold spores increase with spring rain. Knowing your local pollen calendar (check pollen.com) helps predict when your dog's symptoms will flare and allows preemptive treatment.",
      },
      {
        title: 'Secondary Infections: The Hidden Danger',
        body: 'Allergic skin creates warm, moist, inflamed environments ideal for bacterial (Staphylococcus) and yeast (Malassezia) overgrowth. Studies show 60-80% of dogs with atopic dermatitis develop secondary infections that perpetuate the itch cycle even after allergen exposure decreases. Signs of secondary infection: greasy skin, sweet/yeasty odor, dark/discolored skin, and persistent itching even during low-pollen days.',
      },
      {
        title: 'The Paw-Lick-Ear-Scratch Pattern',
        body: 'The classic presentation of canine spring allergies: excessive paw licking (especially between toes), ear infections (shaking head, rubbing ears on furniture), and scratching at flanks/armpits. This specific pattern distinguishes allergies from other skin conditions. If you see all three occurring simultaneously in spring, seasonal allergies are the likely cause.',
      },
    ],
    prevention: [
      'Wipe paws with damp cloth after each outdoor walk to remove pollen',
      'Bathe dog weekly with hypoallergenic shampoo during peak pollen weeks',
      'Keep windows closed on high-pollen days; use HEPA filtration indoors',
      'Avoid walking through freshly cut grass or tall weeds',
      'Wash dog bedding weekly in hot water during allergy season',
      'Ask your veterinarian about starting antihistamines BEFORE pollen season peaks',
      'Manage flea prevention aggressively in spring (single flea bite worsens allergy inflammation)',
    ],
    symptoms: [
      'Excessive paw licking and chewing',
      'Recurring ear infections (head shaking, ear odor)',
      'Red, irritated skin in armpits, groin, and belly',
      'Itching and scratching at flanks (sides)',
      'Watery eyes or nasal discharge',
      'Rubbing face against furniture or carpet',
      'Hair loss from scratching or licking',
      'Greasy skin with unusual odor (sign of secondary infection)',
    ],
    firstAid: [
      {
        title: 'Step 1: Assess Severity',
        content: 'Mild: Occasional scratching but eating, playing normally. Moderate: Persistent itching, disrupted sleep, mild skin redness. Severe: Open sores, bleeding skin, refusal to eat, constant discomfort. Severe allergies require veterinary-prescribed treatment — not just home care.',
      },
      {
        title: 'Step 2: Immediate Relief Measures',
        content: 'Give a cool (not cold) bath with colloidal oatmeal-based shampoo to remove pollen and soothe skin. Wipe paws with damp cloth after walks. Apply a cool compress to hot spots. Use an Elizabethan collar (cone) if your dog will not stop licking a hot spot.',
      },
      {
        title: 'Step 3: Monitor for Infection',
        content: 'Check irritated areas daily for: greasy or crusty discharge, sweet/yeasty odor, and darkening skin color. These indicate secondary bacterial or yeast infection that requires veterinary-prescribed antibiotics or antifungals — not just allergy management.',
      },
      {
        title: 'Step 4: Schedule Veterinary Appointment',
        content: 'If symptoms persist more than 1 week despite basic management, or if secondary signs appear, schedule a vet visit. Your vet may prescribe Apoquel (oclacitinib), Cytopoint injections (anti-IL-31), or allergy immunotherapy (allergy shots) for long-term control.',
      },
    ],
    relatedEmergency: '/dog/emergency/',
    faqs: [
      {
        question: 'How do I know if my dog has spring allergies vs infection?',
        answer:
          'Seasonal allergies follow a pattern: symptoms recur each spring/summer, paw licking and ear involvement are prominent, and response to antihistamines is rapid. Infections typically have localized odor, discharge, and greasy skin. The pattern-breaking sign is symptoms persisting outside allergy season — this suggests atopic dermatitis (year-round allergies) or non-allergic skin disease requiring veterinary diagnosis.',
      },
      {
        question: 'Can I give my dog Benadryl (diphenhydramine) for allergies?',
        answer:
          'Yes, diphenhydramine (Benadryl) is commonly used in dogs at 1mg per pound of body weight every 8-12 hours. Only use plain diphenhydramine — avoid formulas with decongestants (pseudoephedrine) or alcohol, which are toxic. Benadryl helps 30% of allergic dogs. Better options prescribed by vets include Apoquel (oclacitinib) and Cytopoint injections which target itch more specifically. Always confirm dosing with your veterinarian first.',
      },
      {
        question: 'When is spring allergy season worst for dogs?',
        answer:
          "Peak spring allergy season for dogs in North America is April–June when tree pollen and early grass pollen are highest. In warmer climates, allergy seasons start earlier (February) and last longer. Summer and fall bring their own allergen peaks. Track your dog's symptoms year-round — if they occur for more than 3 months, they may have become year-round allergies rather than truly seasonal.",
      },
      {
        question: 'Do certain breeds have worse spring allergies?',
        answer:
          'Yes — breeds predisposed to atopic dermatitis include: West Highland White Terriers, French Bulldogs, Bulldogs, Golden Retrievers, Labrador Retrievers, German Shepherds, Cocker Spaniels, Boxers, and Boston Terriers. Brachycephalic breeds (bulldogs, pugs) often have concurrent skin fold dermatitis that worsens with allergy inflammation. Early intervention in these breeds is especially important.',
      },
    ],
    relatedTools: [{ name: 'Dog Calorie Calculator', href: '/dog/calorie-calculator/', description: 'Adjust feeding if allergies cause weight loss from stress.' }],
    citations: [
      { name: 'AAHA — Atopic Dermatitis Management', url: 'https://www.aaha.org/' },
      { name: 'Veterinary Dermatology — Canine Atopic Dermatitis Guidelines', url: 'https://onlinelibrary.wiley.com/journal/13653164' },
      { name: 'AKC — Seasonal Allergies in Dogs', url: 'https://www.akc.org/expert-advice/health/seasonal-allergies-in-dogs/' },
    ],
    bodyParagraphs: [
      'Spring allergies in dogs represent a significant quality-of-life issue that often goes undertreated because owners mistake chronic scratching for normal behavior. Unlike humans who primarily experience respiratory symptoms (sneezing, nasal congestion), dogs predominantly manifest allergies through their skin. This difference in presentation means canine allergies are often misdiagnosed as hygiene issues rather than true allergic disease.',
      'The "itch-scratch cycle" perpetuates allergic skin disease beyond the initial allergen exposure. Scratching damages the skin barrier, allowing bacteria and yeast to colonize, which triggers more inflammation and itching. This is why allergic dogs that initially only scratch in spring may develop year-round skin problems if they develop chronic secondary infections that do not self-resolve.',
      'Modern veterinary allergy management has moved beyond just symptom suppression. Treatments like Cytopoint (a monoclonal antibody injection that targets IL-31, the primary itch cytokine) provide targeted relief without the side effects of long-term steroids. Apoquel (oclacitinib) targets multiple inflammatory pathways within 4 hours. These prescription options are more effective than over-the-counter antihistamines for moderate-to-severe cases.',
    ],
  },
  thanksgiving: {
    slug: 'thanksgiving',
    title: 'Thanksgiving Foods Dogs Can Eat: Safe vs Dangerous Guide',
    description:
      'Complete Thanksgiving food safety guide for dogs — which foods are safe (plain turkey, pumpkin, green beans), which are toxic (grapes, onions, butter, alcohol), and portion control tips. Includes emergency steps for toxic ingestion.',
    keywords: [
      'thanksgiving foods dogs can eat',
      'dog ate thanksgiving turkey',
      'thanksgiving safe foods for dogs',
      'dog ate thanksgiving stuffing',
      'is thanksgiving turkey safe for dogs',
    ],
    severity: 'HIGH RISK',
    season: 'Thanksgiving (November)',
    knowledgeCards: [
      {
        title: 'Thanksgiving Foods: Safe Foods for Dogs',
        body: 'Safe for dogs (in small portions): Plain unseasoned turkey meat (white or dark), plain green beans (cooked, no butter/garlic), plain sweet potato (cooked, no marshmallows), plain pumpkin (pure pumpkin pie filling, not the sweetened kind), cooked carrots (unbuttered), and plain white rice. All should be unseasoned, unbuttered, and served in small quantities — about 1-2 tablespoons per 20lb body weight.',
      },
      {
        title: 'Thanksgiving Foods: Dangerous or Toxic Foods for Dogs',
        body: 'Dangerous/toxic: stuffing (onion, garlic, sage), gravy (garlic, onion, fat), mashed potatoes (butter, garlic, chives), candied yams/sweet potatoes with marshmallows (sugar, xylitol in some), dinner rolls (dough expands and yeast ferments), cranberry sauce (high sugar, sometimes with grape/xylitol), pumpkin pie (nutmeg is toxic, plus sugar/fat), chocolate desserts, macadamia nut pies, and any food with onion or garlic.',
      },
      {
        title: 'The Dough Danger: Raw Yeast Expansion',
        body: "Unbaked dinner roll dough is extremely dangerous for dogs. The warm, moist environment of a dog's stomach causes yeast to ferment, producing alcohol (ethanol toxicosis) AND expanding dough that can block the stomach. Symptoms: distended abdomen, vomiting, disorientation, and staggering. A single roll-sized piece of dough can cause alcohol poisoning in a 20lb dog.",
      },
      {
        title: 'Fat Toxicity and Pancreatitis',
        body: 'Thanksgiving foods are typically very high in fat (butter, oil, gravy, turkey skin). High fat intake is the #1 dietary trigger for canine pancreatitis, a life-threatening pancreatic inflammation. Pancreatitis typically presents 12-72 hours after the fatty meal with: severe vomiting, abdominal pain (prayer position), lethargy, and fever. Requires immediate veterinary care with IV fluids and pain management.',
      },
    ],
    prevention: [
      'Prepare a small plate of safe foods before the meal begins (plain turkey, green beans, plain sweet potato)',
      'Place it in advance in a location away from the table to prevent begging at the table',
      'Instruct guests that "no table scraps" policy is in effect for health reasons',
      'Dispose of all turkey bones and food scraps in an outdoor bin immediately',
      'Clear plates from the table promptly — dogs are opportunistic',
      'Do not let dogs access the kitchen or dining area during cooking and meal service',
      'Monitor garbage disposal systems — dogs can access food waste in open trash cans',
    ],
    symptoms: [
      'Vomiting (especially repeatedly) or diarrhea within 2-24 hours',
      'Abdominal pain demonstrated by "prayer position" (front down, rear up)',
      'Severe lethargy, weakness, or reluctance to move',
      'Distended or bloated abdomen (possible bloat or dough expansion)',
      'Tremors, disorientation (alcohol from fermented dough)',
      'Excessive thirst or urination followed by none (grape toxicity — 24-48 hours)',
      'Pale gums, weakness, rapid breathing (onion/garlic anemia — 2-5 days)',
    ],
    firstAid: [
      {
        title: 'Step 1: Identify What Your Dog Ate',
        content: 'Quickly check what was left unattended. Gravy, stuffing, and butter-covered vegetables indicate high-fat exposure (pancreatitis risk). If dough was eaten, alcohol poisoning is a concern. If grapes/raisins were consumed, kidney failure risk. Prioritize based on the specific toxin identified.',
      },
      {
        title: 'Step 2: Call Poison Control',
        content: 'ASPCA Animal Poison Control: (888) 426-4435. Provide: dog\'s weight, what was eaten, estimated amount, and time since ingestion. High-fat meals require monitoring for 72 hours for pancreatitis even if no immediate symptoms appear.',
      },
      {
        title: 'Step 3: Do Not Wait for Symptoms',
        content: 'If your dog ate dough (alcohol risk), grapes (kidney failure risk), or large amounts of onion/garlic (anemia risk), seek veterinary care before symptoms begin. The delay between ingestion and symptoms can be 12-72 hours, during which irreversible damage may occur.',
      },
      {
        title: 'Step 4: Monitor After Any Overindulgence',
        content: 'Even if no specific toxin is identified, high-fat intake requires 12-72 hour monitoring for pancreatitis signs. Restrict food for 12 hours after fatty ingestion (allow water), then offer a small bland meal. If vomiting occurs or persists, seek veterinary care immediately.',
      },
    ],
    relatedEmergency: '/dog/emergency/ate-grapes/',
    faqs: [
      {
        question: 'Can dogs eat Thanksgiving turkey?',
        answer:
          'Yes, plain unseasoned turkey meat (no skin, no bones) is safe for dogs in small portions — about 1-2 tablespoons per 20lb body weight. Remove all bones (splinter risk), skin (high fat), and ensure no seasonings (garlic, onion, herbs) were used. White meat is lower in fat than dark meat and safer for dogs prone to pancreatitis.',
      },
      {
        question: 'Is pumpkin pie safe for dogs?',
        answer:
          'No. Pumpkin pie contains nutmeg (toxic to dogs causing hallucinations and tachycardia), high sugar (GI upset, long-term dental/diabetic consequences), dairy (many dogs are lactose intolerant), and spices. Plain canned pumpkin (pure pumpkin, not pie filling) is safe and actually beneficial for digestion — up to 1 tablespoon per 10lb dog.',
      },
      {
        question: 'My dog ate Thanksgiving stuffing. What should I do?',
        answer:
          'Call Poison Control at (888) 426-4435. Stuffing typically contains multiple toxins: onion and garlic (cause hemolytic anemia at 0.5% of body weight), high butter/fat content (pancreatitis risk), and sometimes herbs (sage can cause GI upset). Symptoms may not appear for 2-5 days with onion/garlic toxicity, making early veterinary monitoring important.',
      },
      {
        question: 'Can dogs eat Thanksgiving mashed potatoes?',
        answer:
          'Traditional mashed potatoes are NOT safe for dogs due to added butter (high fat), milk (lactose intolerance risk), garlic (toxic), and chives (toxic). Plain boiled potato without any additions is safe in small amounts. The safest Thanksgiving vegetable for dogs is plain cooked green beans or carrots with nothing added.',
      },
    ],
    relatedTools: [
      { name: 'Toxic Food Checker', href: '/shared/toxic-checker/', description: 'Verify any Thanksgiving ingredient safety.' },
      { name: 'Dog Calorie Calculator', href: '/dog/calorie-calculator/', description: 'Account for extra holiday calorie intake.' },
      { name: 'Emergency: Ate Grapes', href: '/dog/emergency/ate-grapes/', description: 'Grape/raisin toxicity emergency guide.' },
    ],
    citations: [
      { name: 'ASPCA — Thanksgiving Pet Safety', url: 'https://www.aspca.org/pet-care/animal-poison-control/thanksgiving-pet-safety' },
      { name: 'Pet Poison Helpline — Holiday Foods', url: 'https://www.petpoisonhelpline.com/pet-owners/holidays/' },
      { name: 'AKC — Thanksgiving Foods Dogs Can Eat', url: 'https://www.akc.org/expert-advice/nutrition/thanksgiving-foods-dogs-can-and-cant-eat/' },
    ],
    bodyParagraphs: [
      'Thanksgiving creates a unique risk environment where multiple toxic foods are prepared simultaneously, food is left accessible for extended periods, and the combination of high-fat ingredients with toxin-containing foods (onions in stuffing, grapes in salads) creates compounded dangers that do not exist with ordinary meals.',
      'Pancreatitis deserves particular attention during Thanksgiving because it is the most common Thanksgiving-related veterinary emergency. The condition occurs when enzymes within the pancreas are prematurely activated, causing the pancreas to essentially digest itself. Mortality rates for severe pancreatitis range from 20-40% even with aggressive treatment. Dogs that develop pancreatitis on Thanksgiving frequently develop chronic, recurring episodes that affect their quality of life permanently.',
      'A responsible approach to Thanksgiving with dogs is to prepare a separate "dog plate" of safe, boring foods before the meal begins. This satisfies the dog-owner desire to include pets in the celebration while completely bypassing the toxic food exposure. The reality is that even benign-seeming holiday foods carry cumulative risks that bypass the "just one bite" safety assumption.',
    ],
  },
  'easter-chocolate': {
    slug: 'easter-chocolate',
    title: 'Easter Chocolate and Dogs: Easter Egg Hunt Safety',
    description:
      'Easter chocolate toxicity guide for dog owners — theobromine poisoning thresholds, Easter-specific hazards (eggs, grass, lilies), symptoms timeline, and emergency treatment for chocolate ingestion.',
    keywords: [
      'easter chocolate dog',
      'dog ate easter chocolate',
      'easter egg hunt dog safety',
      'easter lily dog toxicity',
      'chocolate poisoning dogs easter',
    ],
    severity: 'CRITICAL RISK',
    season: 'Easter (March/April)',
    knowledgeCards: [
      {
        title: 'Easter-Specific Chocolate Dangers',
        body: 'Easter concentrates multiple chocolate risks: (1) Chocolate eggs and bunnies are frequently dark or semi-sweet (higher theobromine than milk chocolate). (2) Foil-wrapped eggs pose dual risk — chocolate toxicity plus foil-induced intestinal obstruction. (3) Easter baskets are often placed on coffee tables at dog-accessible height. (4) Easter grass (plastic or paper) causes intestinal obstruction if swallowed. (5) Large quantities of chocolate are often in simultaneous use for hunts.',
      },
      {
        title: 'The Chocolate Toxicity Math',
        body: 'Theobromine content by chocolate type (per oz): White: 0.25mg. Milk: 44-60mg. Semi-sweet: 150mg. Baking (unsweetened): 390-450mg. Toxic threshold for dogs: mild symptoms at 20mg/kg, severe at 40mg/kg, seizures at 60mg/kg. A 20lb (9kg) chocolate bunny (3oz of milk chocolate = ~150mg theobromine) reaches the moderate toxicity threshold. Just 1oz of baking chocolate is severely toxic to the same dog.',
      },
      {
        title: 'Easter Grass: The Hidden Hazard',
        body: 'Plastic Easter grass is a linear foreign body hazard — it can anchor in the stomach and saw through intestinal walls. Paper grass is partially digestible but can clump and cause obstruction. Both types are appealing to dogs because they are coated with chocolate residue from Easter baskets. Signs of obstruction: repeated vomiting, no bowel movement, abdominal pain, and lethargy within 12-72 hours.',
      },
      {
        title: 'The Symptom Timeline',
        body: '0-2 hours: Restlessness, panting, increased thirst, vomiting. 2-12 hours: Elevated heart rate (>100bpm), muscle tremors, urination increases. 12-48 hours: Seizures (worst cases), arrhythmias, hyperthermia (>104°F). 48-72 hours: Symptoms gradually resolve with supportive care, but cardiac damage may persist. Critical treatment window: induce vomiting within 1 hour removes 30-50% of stomach contents; effectiveness drops sharply after 2 hours.',
      },
    ],
    prevention: [
      'Keep Easter baskets above dog-height or behind closed doors',
      'Count chocolate items before and after Easter hunts — know immediately if any are missing',
      'Do NOT allow dogs to hunt Easter eggs with children — chocolate eggs must be kept separate from pet treats',
      'Fill some hidden eggs with dog-safe treats (carrots, apple slices, dog treats) as decoy',
      'Use paper grass instead of plastic grass (lower obstruction risk)',
      'Dispose of all chocolate packaging and foil wrappers in sealed outdoor bins',
      'Keep dogs indoors during the Easter hunt itself if they are not under direct leash control',
    ],
    symptoms: [
      'Vomiting or diarrhea (may contain chocolate pieces or foil)',
      'Restlessness, hyperactivity, or agitation',
      'Excessive panting and elevated heart rate',
      'Increased thirst and urination',
      'Muscle tremors or twitching',
      'Seizures (indicates severe toxicity)',
      'Stiffness or abnormal gait',
    ],
    firstAid: [
      {
        title: 'Step 1: Calculate Toxic Dose',
        content: "Determine: (1) Type of chocolate eaten (milk, dark, baking), (2) Approximate weight in ounces consumed, (3) Your dog's body weight. Use the toxic threshold calculator: milk chocolate toxic at 1oz per 10lb body weight; dark chocolate at 0.5oz per 10lb; baking chocolate at 0.1oz per 10lb.",
      },
      {
        title: 'Step 2: Call Poison Control Immediately',
        content: 'ASPCA Animal Poison Control: (888) 426-4435. Report the calculated dose. If the threshold is exceeded, go to emergency vet. Do NOT wait for symptoms — theobromine absorption continues for 12+ hours, and symptoms may not appear until serious damage has occurred.',
      },
      {
        title: 'Step 3: Do NOT Induce Vomiting at Home',
        content: 'Do NOT attempt home induction of vomiting with hydrogen peroxide. This is dangerous if your dog is already seizing, has impaired consciousness, or if the chocolate was consumed more than 1-2 hours ago (re-vomiting does not remove significant toxin). Only induce vomiting under veterinary direction.',
      },
      {
        title: 'Step 4: Veterinary Treatment',
        content: 'Treatment for chocolate toxicity: (1) Induced vomiting within 1-2 hours, (2) Activated charcoal to bind remaining theobromine, (3) IV fluids to accelerate renal excretion, (4) Heart rate monitoring for 12-24 hours, (5) Anti-seizure medications if indicated. Hospitalization typically lasts 12-36 hours for moderate toxicity.',
      },
    ],
    relatedEmergency: '/dog/emergency/ate-chocolate/',
    faqs: [
      {
        question: 'My dog ate a chocolate Easter egg. How much is toxic?',
        answer:
          "It depends on the chocolate type, egg weight, and your dog's size. A typical foil-wrapped milk chocolate Easter egg weighs 1-2 oz (30-60g) — for a 20lb dog, one egg reaches the moderate toxicity threshold (20mg/kg theobromine). Dark chocolate eggs are 3-4x more toxic at the same weight. Baking chocolate eggs can be lethal to small dogs. Call ASPCA Poison Control (888) 426-4435 with the chocolate type and your dog's weight for immediate risk assessment.",
      },
      {
        question: 'Are Easter lilies dangerous for dogs?',
        answer:
          'Easter lilies (Lilium longiflorum) are NOT toxic to dogs (unlike cats where they cause fatal kidney failure). However, dogs who chew on lily stems/leaves may experience mild gastrointestinal upset (vomiting, diarrhea). More dangerous Easter hazards include chocolate eggs (theobromine), plastic Easter grass (intestinal obstruction), and xylitol in sugar-free candies. Keep lilies away from multi-pet households with cats.',
      },
      {
        question: 'How long after eating chocolate should I worry about my dog?',
        answer:
          'Theobromine from chocolate is absorbed over 6-12 hours, symptoms can appear up to 72 hours after ingestion. Xylitol acts faster: hypoglycemia within 15-30 minutes, liver failure within 8-12 hours. Call Poison Control immediately if you know your dog ate chocolate or xylitol. Dogs treated within 2 hours have better outcomes. Monitor for 72 hours even after treatment.',
      },
    ],
    relatedTools: [
      { name: 'Toxic Food Checker', href: '/shared/toxic-checker/', description: 'Verify chocolate/candy toxicity instantly.' },
      { name: 'Emergency: Ate Chocolate', href: '/dog/emergency/ate-chocolate/', description: 'Full chocolate toxicity emergency protocol.' },
    ],
    citations: [
      { name: 'ASPCA — Easter Pet Safety', url: 'https://www.aspca.org/pet-care/animal-poison-control/easter-pet-safety' },
      { name: 'Pet Poison Helpline — Chocolate', url: 'https://www.petpoisonhelpline.com/poison/chocolate/' },
      { name: 'ASPCA Plant Guide', url: 'https://www.aspca.org/pet-care/animal-poison-control/toxic-and-non-toxic-plants' },
    ],
    bodyParagraphs: [
      'Easter combines multiple toxins (chocolate, xylitol) with physical hazards (grass, toys) in an environment where dogs are confined indoors near temptations beyond just candy.',
      'The chocolate symptom timeline creates false security — theobromine peaks 10-12 hours after ingestion. Cardiac effects may develop well after the dog "seemed fine." Contact Poison Control immediately rather than waiting.',
      '"A little bit of chocolate won\'t hurt" is dangerously wrong. A single dark chocolate Easter egg can deliver a toxic dose to a medium-sized dog. Sugar-free candies marketed as "healthy" frequently contain xylitol, lethal at tiny doses.',
    ],
  },
};