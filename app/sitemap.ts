import type { MetadataRoute } from 'next';
import buildsData from '@/content/builds.json';
import stockData from '@/content/stock.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://apexautomotive.co.uk';
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/builds`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/stock`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/legal`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/sitemap`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
  ];

  const buildRoutes: MetadataRoute.Sitemap = buildsData.map(b => ({
    url: `${baseUrl}/builds/${b.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const stockRoutes: MetadataRoute.Sitemap = stockData.map(v => ({
    url: `${baseUrl}/stock/${v.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...buildRoutes, ...stockRoutes];
}
