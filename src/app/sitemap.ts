import { MetadataRoute } from 'next';
import { SITE_URL } from '@/constants';
import { getAllToolRoutes, getAllStaticPaths, getAllEUTravelRoutes, getAllToxicSlugs } from '@/lib/data/routes';

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // 首页
  entries.push({
    url: `${SITE_URL}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1.0,
  });

  // Hub 页面 & profile
  const hubPages = getAllStaticPaths();
  for (const path of hubPages) {
    entries.push({
      url: `${SITE_URL}/${path}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    });
  }

  // 工具页面
  const toolRoutes = getAllToolRoutes();
  for (const route of toolRoutes) {
    entries.push({
      url: `${SITE_URL}/${route}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  }

  // EU Travel 落地页 (Phase 7c 实际数据)
  const euRoutes = getAllEUTravelRoutes();
  for (const route of euRoutes) {
    entries.push({
      url: `${SITE_URL}/shared/eu-pet-travel/${route.origin.toLowerCase()}-to-${route.destination.toLowerCase()}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  // 毒性落地页 (Phase 7a + 7b)
  const toxicSlugs = getAllToxicSlugs();
  for (const entry of toxicSlugs) {
    const pathPrefix = entry.species === 'dog' ? 'dog/can-dogs-eat' : 'cat/are-toxic-to-cats';
    entries.push({
      url: `${SITE_URL}/${pathPrefix}/${entry.slug}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    });
  }

  return entries;
}
