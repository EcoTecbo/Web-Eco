import type { MetadataRoute } from 'next'

const BASE_URL = 'https://www.ecotaxi-bo.com'

const servicePages = [
  { url: '/puerta-a-puerta', priority: 0.8 },
  { url: '/por-hora', priority: 0.8 },
  { url: '/ejecutivo', priority: 0.8 },
  { url: '/aeropuerto', priority: 0.9 },
  { url: '/transfer-aeropuerto', priority: 0.9 },
  { url: '/interurbano', priority: 0.8 },
  { url: '/inter-urbanos', priority: 0.8 },
  { url: '/corporativo', priority: 0.8 },
  { url: '/transporte-salud', priority: 0.7 },
  { url: '/transporte-de-salud', priority: 0.7 },
  { url: '/envios', priority: 0.7 },
  { url: '/auxilio-mecanico', priority: 0.7 },
  { url: '/transporte-escolar', priority: 0.7 },
  { url: '/transporte-mascotas', priority: 0.7 },
  { url: '/aventura', priority: 0.7 },
  { url: '/eventos', priority: 0.7 },
  { url: '/alquiler-maquinaria', priority: 0.7 },
  { url: '/mudanza', priority: 0.9 },
  { url: '/nosotros', priority: 0.6 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const homepage: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ]

  const pages: MetadataRoute.Sitemap = servicePages.map((page) => ({
    url: `${BASE_URL}${page.url}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: page.priority,
  }))

  return [...homepage, ...pages]
}
