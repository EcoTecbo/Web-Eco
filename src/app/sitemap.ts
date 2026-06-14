import type { MetadataRoute } from 'next'
import { getAllPagePaths, SITE } from '@/lib/seo-data'

// Additional pages not in seo-data.ts (partner pages, etc.)
const ADDITIONAL_PAGES = [
  { path: '/socio-de-transporte', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/organizadores-eventos', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/socios-transporte', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/socio-de-servicios', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/eventos-y-congresos', priority: 0.5, changeFrequency: 'monthly' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const mainPages: MetadataRoute.Sitemap = getAllPagePaths().map((page) => ({
    url: `${SITE.domain}${page.path}`,
    lastModified: new Date().toISOString(),
    changeFrequency: page.changeFrequency as MetadataRoute.Sitemap[0]['changeFrequency'],
    priority: page.priority,
  }))

  const additionalPages: MetadataRoute.Sitemap = ADDITIONAL_PAGES.map((page) => ({
    url: `${SITE.domain}${page.path}`,
    lastModified: new Date().toISOString(),
    changeFrequency: page.changeFrequency as MetadataRoute.Sitemap[0]['changeFrequency'],
    priority: page.priority,
  }))

  return [...mainPages, ...additionalPages]
}
