// Schema.org JSON-LD structured data for Ecotaxi Bolivia
// This component renders ONLY the global schemas (TaxiService + WebSite + FAQ)
// Per-page schemas are handled by PageSeo component + layout.tsx generateMetadata

import { SITE } from '@/lib/seo-data'

export function SchemaOrg() {
  // Global schemas that appear on every page
  const schemas = [
    // TaxiService / LocalBusiness
    {
      '@context': 'https://schema.org',
      '@type': 'TaxiService',
      name: SITE.name,
      alternateName: 'EcoTaxi Bolivia',
      url: SITE.domain,
      logo: `${SITE.domain}/logo-ecotaxi.webp`,
      description: 'Primera empresa de transporte en Bolivia con plan de medición, reducción y neutralización de emisiones de CO2. Servicio de taxi ecológico, traslados aeropuerto y mudanzas profesionales en Santa Cruz de la Sierra, La Paz y Cochabamba.',
      telephone: SITE.phone,
      email: SITE.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Santa Cruz de la Sierra',
        addressLocality: 'Santa Cruz de la Sierra',
        addressRegion: 'Santa Cruz',
        addressCountry: 'BO',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: -17.7833,
        longitude: -63.1833,
      },
      areaServed: [
        { '@type': 'City', name: 'Santa Cruz de la Sierra' },
        { '@type': 'City', name: 'La Paz' },
        { '@type': 'City', name: 'Cochabamba' },
        { '@type': 'Country', name: 'Bolivia' },
      ],
      priceRange: '$$',
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
      sameAs: Object.values(SITE.social),
      parentOrganization: {
        '@type': 'Organization',
        name: SITE.org,
        url: 'https://crm.oyc-srl.com',
      },
    },
    // WebSite with SearchAction
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE.name,
      url: SITE.domain,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE.domain}/?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ]

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}
