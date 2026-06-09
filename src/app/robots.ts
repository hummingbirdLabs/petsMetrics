import { MetadataRoute } from 'next';
import { SITE_URL } from '@/constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // AI search engine crawlers — must ALLOW or site disappears from AI Overview / Perplexity / ChatGPT Search
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Claude-Web', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
      // Default — allow all other crawlers, block internal paths
      { userAgent: '*', allow: '/', disallow: ['/_next/', '/api/'] },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
