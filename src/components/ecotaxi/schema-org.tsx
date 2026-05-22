// Schema.org JSON-LD structured data for Ecotaxi Bolivia

const BASE_URL = 'https://www.ecotaxi-bo.com'

function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'TaxiService',
    name: 'Ecotaxi Bolivia',
    alternateName: 'EcoTaxi Bolivia',
    url: BASE_URL,
    logo: 'https://static.wixstatic.com/media/93e1f3_ab4f7e0b7c2e4f4ba3e0be8f1c2a8f44~mv2.png/v1/fill/w_247,h_104,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Logo%20Vector%20Ecotaxi.png',
    description:
      'Primera empresa de transporte en Bolivia con plan de medición, reducción y neutralización de emisiones de CO2. Servicio de taxi ecológico y mudanzas profesionales en Santa Cruz de la Sierra.',
    telephone: '+591-3-3296885',
    email: 'ecotaxi@oyc-srl.com',
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
    areaServed: {
      '@type': 'City',
      name: 'Santa Cruz de la Sierra',
    },
    priceRange: '$$',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
    sameAs: [
      'https://facebook.com/ecotaxibolivia',
      'https://instagram.com/ecotaxibo',
    ],
    parentOrganization: {
      '@type': 'Organization',
      name: 'O&C Ingeniería y Representaciones SRL',
      url: 'https://crm.oyc-srl.com',
    },
  }
}

function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Ecotaxi Bolivia',
    url: BASE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${BASE_URL}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }
}

function getFAQSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Cómo puedo pedir un taxi en Ecotaxi Bolivia?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Puedes pedir tu taxi a través de nuestro formulario de reserva en la web, por WhatsApp, por llamada al 3296885, o mediante nuestra app móvil.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Qué hace ecológico a Ecotaxi?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ecotaxi es la primera empresa de transporte en Bolivia con un plan de medición, reducción y neutralización de emisiones de CO2 certificado.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Ecotaxi ofrece servicio de mudanza?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí, Ecotaxi ofrece servicios de mudanza local, provincial y nacional para casas, oficinas y cargas especiales con diferentes tipos de camiones y furgones.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cómo calculo el costo de mi mudanza?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Puedes usar nuestra calculadora de mudanza en la web para seleccionar tus muebles, servicios adicionales y obtener una cotización aproximada instantly.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Ecotaxi opera las 24 horas?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí, Ecotaxi opera las 24 horas del día, los 7 días de la semana, incluyendo feriados.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Ecotaxi emite factura fiscal?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí, Ecotaxi es una empresa 100% formal y registrada. Emitimos factura fiscal por todos nuestros servicios.',
        },
      },
    ],
  }
}

function getMovingServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Servicio de Mudanza - Ecotaxi Bolivia',
    description:
      'Servicio profesional de mudanza local, provincial y nacional en Bolivia. Mudanzas de casa, oficina y especial con diferentes tipos de camiones y furgones. Incluye calculadora de mudanza con cotización instantánea.',
    url: `${BASE_URL}/mudanza`,
    provider: {
      '@type': 'TaxiService',
      name: 'Ecotaxi Bolivia',
      url: BASE_URL,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Bolivia',
    },
    serviceType: 'MovingService',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Tipos de Mudanza',
      itemListElement: [
        {
          '@type': 'Offer',
          name: 'Mudanza Local',
          description: 'Mudanza dentro de la misma ciudad. Servicio el mismo día.',
        },
        {
          '@type': 'Offer',
          name: 'Mudanza Provincial',
          description: 'Mudanza entre provincias del mismo departamento. Servicio al día siguiente.',
        },
        {
          '@type': 'Offer',
          name: 'Mudanza Nacional',
          description: 'Mudanza entre departamentos y ciudades de Bolivia. Servicio programado con seguimiento.',
        },
      ],
    },
  }
}

export function SchemaOrg() {
  const schemas = [
    getLocalBusinessSchema(),
    getWebSiteSchema(),
    getFAQSchema(),
    getMovingServiceSchema(),
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
