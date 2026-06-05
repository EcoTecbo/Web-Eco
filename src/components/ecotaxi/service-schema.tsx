'use client'

import { useEffect } from 'react'

interface ServiceSchemaProps {
  name: string
  description: string
  url: string
  price?: string
}

export function ServiceSchema({ name, description, url, price }: ServiceSchemaProps) {
  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name,
      description,
      url,
      provider: {
        '@type': 'TaxiService',
        name: 'Ecotaxi Bolivia',
        url: 'https://www.ecotaxi-bo.com',
        telephone: '+591-3-3296885',
      },
      areaServed: {
        '@type': 'City',
        name: 'Santa Cruz de la Sierra',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'BO',
        },
      },
      ...(price && {
        offers: {
          '@type': 'Offer',
          price,
          priceCurrency: 'BOB',
          availability: 'https://schema.org/InStock',
        },
      }),
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(schema)
    script.id = `service-schema-${url.split('/').pop()}`
    document.head.appendChild(script)

    return () => {
      const existing = document.getElementById(`service-schema-${url.split('/').pop()}`)
      if (existing) existing.remove()
    }
  }, [name, description, url, price])

  return null
}
