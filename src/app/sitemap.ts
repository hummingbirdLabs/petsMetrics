import { MetadataRoute } from 'next';
import { SITE_URL } from '@/constants';
import { getAllToolRoutes, getAllStaticPaths, getAllEUTravelRoutes, getAllToxicSlugs } from '@/lib/data/routes';
import {
  getToxicDbUpdatedDate,
  getToolMethodologyUpdatedDate,
  getEUTravelRulesUpdatedDate,
} from '@/lib/data/content-version';
import { routing } from '@/lib/routing';

/** Image SEO: routes that include a chart/infographic worth indexing in Google Images */
const ROUTE_IMAGES: Record<string, { url: string; caption: string; title?: string }[]> = {
  'dog/age-calculator': [
    {
      url: `${SITE_URL}/og/dog-age-calculator.webp`,
      caption:
        'Dog age conversion chart comparing small and large breed aging rates using UCSD epigenetic study data (Wang et al., 2020). AAHA Canine Life Stage Guidelines.',
    },
  ],
  'cat/age-calculator': [
    {
      url: `${SITE_URL}/og/cat-age-calculator.webp`,
      caption:
        'Cat age conversion chart based on AAHA/AAFP 2021 Feline Life Stage Guidelines. Maps cat years to human equivalents by life stage.',
    },
  ],
  'dog/vaccination-schedule': [
    {
      url: `${SITE_URL}/og/vaccination-schedule.webp`,
      caption:
        'Dog vaccination timeline chart showing core (DHPP, Rabies) and non-core vaccines by age from puppy to senior. Based on WSAVA guidelines.',
    },
  ],
  'cat/vaccination-schedule': [
    {
      url: `${SITE_URL}/og/vaccination-schedule.webp`,
      caption:
        'Cat vaccination schedule chart showing core (FVRCP, Rabies) and non-core (FeLV) vaccines by age. WSAVA and AAFP feline guidelines.',
    },
  ],
  'dog/gestation-calculator': [
    {
      url: `${SITE_URL}/og/gestation-calculator.webp`,
      caption:
        'Dog gestation timeline showing key developmental milestones from implantation (Day 28) to whelping (Day 63). Ultrasound and X-ray windows marked.',
    },
  ],
  'cat/gestation-calculator': [
    {
      url: `${SITE_URL}/og/gestation-calculator.webp`,
      caption:
        'Cat gestation timeline from mating to queening at approximately Day 65. Key milestones and vet check recommendations at each stage.',
    },
  ],
  'cat/bcs-weight-tracker': [
    {
      url: `${SITE_URL}/og/cat-bcs-weight-tracker.webp`,
      caption:
        '9-point Body Condition Score (BCS) chart for cats. Visual guide from emaciated (1) to severely obese (9) with rib feel and overhead silhouette indicators.',
    },
  ],
  'dog/calorie-calculator': [
    {
      url: `${SITE_URL}/og/dog-calorie-calculator.webp`,
      caption:
        'Dog feeding chart by weight and activity level. RER and MER calculations based on AAFCO formula. Shows daily calories and food portions.',
    },
  ],
  'dog/puppy-growth-predictor': [
    {
      url: `${SITE_URL}/og/puppy-growth-predictor.webp`,
      caption:
        'Puppy growth chart showing breed-specific growth curves from 8 weeks to adult. Predicts adult weight using non-linear growth models by size category.',
    },
  ],
  'cat/hydration-calculator': [
    {
      url: `${SITE_URL}/og/cat-hydration-calculator.webp`,
      caption:
        'Cat daily water intake chart based on weight and diet type (dry vs wet food). Includes feline dehydration self-assessment checklist.',
    },
  ],
  'shared/toxic-checker': [
    {
      url: `${SITE_URL}/og/toxic-checker.webp`,
      caption:
        'Toxic and safe foods and plants for dogs and cats infographic. 200+ items rated by toxicity level with ASPCA data.',
    },
  ],
  'shared/eu-pet-travel-checker': [
    {
      url: `${SITE_URL}/og/eu-pet-travel-checker.webp`,
      caption:
        'EU pet travel requirements flowchart: microchip, rabies vaccination, titer test, tapeworm treatment, and pet passport. EU Regulation 576/2013.',
    },
  ],
};

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  const toolDate = getToolMethodologyUpdatedDate();
  const toxicDate = getToxicDbUpdatedDate();
  const euDate = getEUTravelRulesUpdatedDate();
  const now = new Date();

  for (const locale of routing.locales) {
    const lng = locale as string;
    const prefix = `/${lng}`;

    // 首页
    entries.push({
      url: `${SITE_URL}${prefix}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    });

    // Hub 页面 & profile
    const hubPages = getAllStaticPaths();
    for (const path of hubPages) {
      entries.push({
        url: `${SITE_URL}${prefix}/${path}/`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.9,
      });
    }

    // E-E-A-T 信任页面
    entries.push({
      url: `${SITE_URL}${prefix}/about/`,
      lastModified: toolDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    });
    entries.push({
      url: `${SITE_URL}${prefix}/privacy/`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    });
    entries.push({
      url: `${SITE_URL}${prefix}/terms/`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    });

    // 工具页面
    const toolRoutes = getAllToolRoutes();
    for (const route of toolRoutes) {
      const images = ROUTE_IMAGES[route];
      entries.push({
        url: `${SITE_URL}${prefix}/${route}/`,
        lastModified: toolDate,
        changeFrequency: 'monthly',
        priority: 0.8,
        ...(images ? { images } : {}),
      });
    }

    // EU Travel 落地页
    const euRoutes = getAllEUTravelRoutes();
    for (const route of euRoutes) {
      entries.push({
        url: `${SITE_URL}${prefix}/shared/eu-pet-travel/${route.origin.toLowerCase()}-to-${route.destination.toLowerCase()}/`,
        lastModified: euDate,
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }

    // 毒性落地页
    const toxicSlugs = getAllToxicSlugs();
    for (const entry of toxicSlugs) {
      const pathPrefix = entry.species === 'dog' ? 'dog/can-dogs-eat' : 'cat/are-toxic-to-cats';
      entries.push({
        url: `${SITE_URL}${prefix}/${pathPrefix}/${entry.slug}/`,
        lastModified: toxicDate,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      });
    }
  }

  return entries;
}
