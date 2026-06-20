// Server-side Service Schema component
// Renders JSON-LD structured data directly in HTML (crawlers can read it)
// Replaces the old client-side version that used document.createElement

interface ServiceSchemaProps {
  name: string
  description: string
  url: string
  price?: string
}

export function ServiceSchema({ name, description, url, price }: ServiceSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url,
    provider: {
      '@type': 'TaxiService',
      name: 'Ecotaxi Bolivia',
      url: 'https://www.ecotaxi.com.bo',
      telephone: '+591-3-3296885',
    },
    areaServed: [
      { '@type': 'City', name: 'Santa Cruz de la Sierra' },
      { '@type': 'Country', name: 'Bolivia' },
    ],
    ...(price && {
      offers: {
        '@type': 'Offer',
        price,
        priceCurrency: 'BOB',
        availability: 'https://schema.org/InStock',
      },
    }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
