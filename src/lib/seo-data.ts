/**
 * SEO Data Configuration for Ecotaxi Bolivia
 * Central source of truth for all page metadata, structured data, and keywords.
 * 
 * This file powers:
 * - generateMetadata() in each route's layout.tsx
 * - JSON-LD schemas per page
 * - Sitemap generation
 * - Open Graph / Twitter cards
 */

export const SITE = {
  name: 'Ecotaxi Bolivia',
  domain: 'https://www.ecotaxi-bo.com',
  phone: '+591-3-3296885',
  whatsapp: '59173662803',
  email: 'ecotaxi@oyc-srl.com',
  city: 'Santa Cruz de la Sierra',
  country: 'Bolivia',
  org: 'O&C Ingeniería y Representaciones SRL',
  social: {
    facebook: 'https://facebook.com/ecotaxibolivia',
    instagram: 'https://instagram.com/ecotaxibo',
    linkedin: 'https://linkedin.com/company/ecotaxibolivia',
  },
} as const

export interface PageSeoData {
  title: string
  description: string
  keywords: string[]
  canonical: string
  ogImage?: string
  ogType?: string
  schemaType?: string
  schemaData?: Record<string, unknown>
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority?: number
}

/* ═══════════════════════════════════════════════════════════════════════════════
   PAGE SEO DATA — Each page gets unique title, description, keywords, schema
   ═══════════════════════════════════════════════════════════════════════════════ */

export const PAGES: Record<string, PageSeoData> = {
  '/': {
    title: 'Ecotaxi Bolivia — Taxi Ecológico, Mudanzas y Transporte Profesional',
    description: 'Primera empresa de transporte en Bolivia con neutralización de CO2. Taxi ejecutivo, traslados aeropuerto, mudanzas profesionales, transporte corporativo y logística. Reserva online 24/7 con GPS en tiempo real.',
    keywords: [
      'ecotaxi', 'taxi Bolivia', 'taxi Santa Cruz', 'taxi ecológico', 
      'transporte Bolivia', 'taxi aeropuerto Viru Viru', 'reserva taxi online',
      'taxi CO2 neutro', 'mudanza Bolivia', 'transporte corporativo Santa Cruz',
      'radio taxi Santa Cruz', 'pedir taxi Bolivia', 'taxi 24 horas',
      'traslado aeropuerto Bolivia', 'taxi ejecutivo Bolivia',
      'transporte ecológico Bolivia', 'carbono neutro transporte',
      'app taxi Bolivia', 'taxi con GPS', 'servicio taxi profesional',
    ],
    canonical: SITE.domain,
    ogImage: '/logo-ecotaxi.webp',
    ogType: 'website',
    changeFrequency: 'weekly',
    priority: 1.0,
    schemaType: 'TaxiService',
  },

  '/puerta-a-puerta': {
    title: 'Taxi Puerta a Puerta en Bolivia — Recogida y Entrega Exacta',
    description: 'Servicio de taxi puerta a puerta en Santa Cruz, La Paz y Cochabamba. Te recogemos en tu dirección exacta y te llevamos a tu destino sin esperas. Tarifa transparente, GPS en tiempo real y conductores certificados.',
    keywords: [
      'taxi puerta a puerta', 'taxi recogida domicilio', 'taxi a mi puerta',
      'transporte puerta a puerta Bolivia', 'taxi sin espera', 'taxi domicilio',
      'taxi Santa Cruz domicilio', 'pedir taxi a casa', 'taxi punto exacto',
      'servicio taxi recogida', 'taxi dirección exacta', 'radio taxi domicilio',
      'taxi GPS Bolivia', 'taxi Bolivia domicilio', 'transporte directo Bolivia',
    ],
    canonical: `${SITE.domain}/puerta-a-puerta`,
    changeFrequency: 'monthly',
    priority: 0.8,
    schemaType: 'Service',
  },

  '/por-hora': {
    title: 'Taxi por Hora en Bolivia — Alquila tu Taxi con Chofer',
    description: 'Alquila un taxi por hora con chofer profesional en Bolivia. Ideal para diligencias, citas médicas, compras o turismo. Tarifa fija por hora sin sorpresas, conductor espera contigo y te lleva a múltiples destinos.',
    keywords: [
      'taxi por hora', 'alquilar taxi con chofer', 'taxi hora Bolivia',
      'taxi por hora Santa Cruz', 'rentar taxi hora', 'chofer por hora',
      'taxi dispuesto hora', 'taxi múltiples paradas', 'taxi espera',
      'servicio taxi horas', 'taxi con conductor hora', 'taxi privado hora',
      'taxi turismo hora Bolivia', 'chofer profesional hora', 'taxi itinerary',
    ],
    canonical: `${SITE.domain}/por-hora`,
    changeFrequency: 'monthly',
    priority: 0.8,
    schemaType: 'Service',
  },

  '/ejecutivo': {
    title: 'Taxi Ejecutivo VIP en Bolivia — Servicio Premium de Transporte',
    description: 'Servicio de taxi ejecutivo VIP en Bolivia con vehículos premium, conductores bilingües y protocolo corporativo. Ideal para ejecutivos, diplomáticos y viajeros de alto nivel. Wifi, agua y amenities a bordo.',
    keywords: [
      'taxi ejecutivo', 'taxi VIP Bolivia', 'transporte ejecutivo Santa Cruz',
      'taxi premium', 'taxi empresarial', 'chofer ejecutivo Bolivia',
      'taxi lujo Bolivia', 'servicio VIP transporte', 'taxi diplomático',
      'transporte corporativo VIP', 'taxi negocios Bolivia', 'taxi alto nivel',
      'chofer bilingüe', 'taxi ejecutivo aeropuerto', 'limousine Bolivia',
      'transporte ejecutivo La Paz', 'taxi ejecutivo Cochabamba',
    ],
    canonical: `${SITE.domain}/ejecutivo`,
    changeFrequency: 'monthly',
    priority: 0.8,
    schemaType: 'Service',
  },

  '/aeropuerto': {
    title: 'Taxi Aeropuerto Viru Viru y Todos los Aeropuertos de Bolivia',
    description: 'Traslados desde y hacia todos los aeropuertos de Bolivia: Viru Viru (VVI), El Alto (LPB), Wilstermann (CBB) y más. Servicio 24/7 con monitor de vuelos, espera sin cargo por retrasos y tarifa fija transparente.',
    keywords: [
      'taxi aeropuerto Viru Viru', 'traslado aeropuerto Bolivia', 'taxi aeropuerto Santa Cruz',
      'taxi aeropuerto La Paz', 'taxi aeropuerto Cochabamba', 'taxi VVI',
      'taxi LPB', 'transfer aeropuerto Bolivia', 'taxi aeropuerto 24 horas',
      'recogida aeropuerto', 'taxi ida aeropuerto', 'taxi vuelta aeropuerto',
      'servicio aeropuerto taxi', 'transporte aeropuerto Bolivia',
      'taxi aeropuerto El Alto', 'taxi aeropuerto Wilstermann',
      'aeropuerto taxi tarifa fija', 'taxi aeropuerto sin espera',
    ],
    canonical: `${SITE.domain}/aeropuerto`,
    changeFrequency: 'weekly',
    priority: 0.9,
    schemaType: 'Service',
  },

  '/transfer-aeropuerto': {
    title: 'Transfer Aeropuerto en Bolivia — Traslado Privado con Chofer',
    description: 'Servicio de transfer privado desde y hacia aeropuertos de Bolivia. Chofer con cartel de bienvenida, asistencia con equipaje, vehículo exclusivo y monitor de vuelos en tiempo real. Reserva anticipada con confirmación.',
    keywords: [
      'transfer aeropuerto Bolivia', 'traslado privado aeropuerto', 'transfer Viru Viru',
      'transfer aeropuerto Santa Cruz', 'chofer aeropuerto cartel', 'transfer privado',
      'transfer aeropuerto La Paz', 'transfer aeropuerto Cochabamba',
      'servicio transfer Bolivia', 'transfer ejecutivo aeropuerto',
      'transfer llegada aeropuerto', 'transfer salida aeropuerto',
    ],
    canonical: `${SITE.domain}/transfer-aeropuerto`,
    changeFrequency: 'monthly',
    priority: 0.9,
    schemaType: 'Service',
  },

  '/interurbano': {
    title: 'Taxi Interurbano en Bolivia — Viajes entre Ciudades Seguros',
    description: 'Servicio de taxi interurbano entre ciudades de Bolivia. Viajes seguros Santa Cruz-La Paz-Cochabamba y todas las rutas nacionales. Vehículos confortables, choferes profesionales y rastreo GPS satelital en toda la ruta.',
    keywords: [
      'taxi interurbano Bolivia', 'taxi entre ciudades', 'viaje Santa Cruz La Paz',
      'taxi ruta nacional', 'transporte interdepartamental', 'taxi largo recorrido',
      'taxi Santa Cruz Cochabamba', 'taxi interprovincial', 'viaje seguro Bolivia',
      'transporte interurbano Bolivia', 'taxi viaje largo', 'taxi carretera Bolivia',
      'servicio interurbano taxi', 'taxi otra ciudad Bolivia', 'taxi turismo Bolivia',
    ],
    canonical: `${SITE.domain}/interurbano`,
    changeFrequency: 'monthly',
    priority: 0.8,
    schemaType: 'Service',
  },

  '/inter-urbanos': {
    title: 'Transporte Inter Urbano en Bolivia — Conexión entre Ciudades',
    description: 'Servicio de transporte inter urbano conectando todas las ciudades principales de Bolivia. Rutas frecuentes, horarios flexibles y la seguridad de viajar con la empresa de transporte más confiable del país.',
    keywords: [
      'transporte inter urbano', 'inter urbano Bolivia', 'transporte entre ciudades Bolivia',
      'conexión urbana Bolivia', 'transporte inter ciudades', 'viaje inter urbano',
    ],
    canonical: `${SITE.domain}/inter-urbanos`,
    changeFrequency: 'monthly',
    priority: 0.7,
    schemaType: 'Service',
  },

  '/corporativo': {
    title: 'Transporte Corporativo Empresarial en Bolivia',
    description: 'Soluciones de transporte corporativo para empresas en Bolivia. Cuentas empresariales, facturación fiscal, reportes de gastos, panel de administración y servicio dedicado 24/7. Más de 200 empresas confían en nosotros.',
    keywords: [
      'transporte corporativo Bolivia', 'taxi empresarial', 'cuenta corporativa taxi',
      'transporte empresa Santa Cruz', 'taxi factura fiscal', 'taxi corporativo Bolivia',
      'servicio transporte empresarial', 'panel administración transporte',
      'transporte ejecutivo empresa', 'taxi cuenta empresa', 'movilidad corporativa',
      'transporte empleados empresa', 'taxi corporativo La Paz',
      'transporte corporativo Cochabamba', 'facturación transporte Bolivia',
    ],
    canonical: `${SITE.domain}/corporativo`,
    changeFrequency: 'monthly',
    priority: 0.8,
    schemaType: 'Service',
  },

  '/transporte-salud': {
    title: 'Transporte de Salud y Traslado Médico en Bolivia',
    description: 'Servicio de transporte de salud y traslado médico en Bolivia. Traslados hospitalarios, consultas médicas, terapia y rehabilitación. Vehículos adaptados, conductores capacitados y servicio puerta a puerta para pacientes.',
    keywords: [
      'transporte salud Bolivia', 'traslado médico', 'taxi hospital',
      'transporte paciente', 'taxi médico Bolivia', 'ambulancia no emergencia',
      'traslado hospitalario', 'transporte médico Santa Cruz', 'taxi consulta médica',
      'transporte terapia rehabilitación', 'taxi clínica Bolivia',
      'traslado médico La Paz', 'transporte salud discapacidad',
      'vehículo médico transporte', 'taxi médico puerta a puerta',
    ],
    canonical: `${SITE.domain}/transporte-salud`,
    changeFrequency: 'monthly',
    priority: 0.7,
    schemaType: 'Service',
  },

  '/transporte-de-salud': {
    title: 'Transporte de Salud — Traslados Médicos Seguros en Bolivia',
    description: 'Traslados médicos seguros y puntuales en Bolivia. Transporte de pacientes a hospitales, clínicas y centros de salud con vehículos confortables y conductores capacitados en atención al paciente.',
    keywords: [
      'transporte de salud', 'traslado médico Bolivia', 'transporte pacientes',
    ],
    canonical: `${SITE.domain}/transporte-de-salud`,
    changeFrequency: 'monthly',
    priority: 0.6,
    schemaType: 'Service',
  },

  '/envios': {
    title: 'Envíos y Mensajería en Bolivia — Paquetería Rápida y Segura',
    description: 'Servicio de envíos y mensajería en Bolivia. Paquetería urbana e interurbana con recogida a domicilio, rastreo GPS en tiempo real y entrega garantizada. Documentos, paquetes y carga ligera con seguro incluido.',
    keywords: [
      'envíos Bolivia', 'mensajería Santa Cruz', 'paquetería Bolivia',
      'envío paquetes Bolivia', 'mensajería urbana', 'envío documentos',
      'servicio mensajería Bolivia', 'envío urgente Bolivia', 'courier Bolivia',
      'envío a domicilio Bolivia', 'paquetería Santa Cruz', 'envío interurbano',
      'mensajería empresarial', 'envío same day', 'delivery Bolivia',
      'envío rápido Bolivia', 'paquete seguro GPS', 'envío La Paz',
    ],
    canonical: `${SITE.domain}/envios`,
    changeFrequency: 'monthly',
    priority: 0.7,
    schemaType: 'Service',
  },

  '/auxilio-mecanico': {
    title: 'Auxilio Mecánico y Grúa en Bolivia — Asistencia Vial 24/7',
    description: 'Servicio de auxilio mecánico y grúa en Bolivia 24/7. Asistencia vial por avería, pinchazo, batería descargada o accidente. Grúa plataformera, servicio de cerrajería automotriz y remolque a taller. Cobertura en Santa Cruz, La Paz y Cochabamba.',
    keywords: [
      'auxilio mecánico Bolivia', 'grúa Bolivia', 'asistencia vial',
      'auxilio mecánico Santa Cruz', 'grúa remolque', 'servicio grúa 24 horas',
      'asistencia vial Bolivia', 'grúa plataformera', 'remolque vehículo',
      'auxilio carretera', 'cerrajería automotriz', 'batería descargada auxilio',
      'pinchazo auxilio', 'avería vehículo Bolivia', 'grúa accidente',
      'auxilio mecánico La Paz', 'asistencia vial Cochabamba', 'grúa económica',
    ],
    canonical: `${SITE.domain}/auxilio-mecanico`,
    changeFrequency: 'monthly',
    priority: 0.7,
    schemaType: 'Service',
  },

  '/transporte-escolar': {
    title: 'Transporte Escolar Seguro en Bolivia — Rutas Escolares con GPS',
    description: 'Servicio de transporte escolar seguro en Bolivia. Rutas escolares con rastreo GPS, conductores con certificación de antecedentes, vehículos equipados y notificación a padres en tiempo real. Idel para colegios y familias.',
    keywords: [
      'transporte escolar Bolivia', 'ruta escolar Santa Cruz', 'taxi escolar',
      'transporte niños escuela', 'bus escolar Bolivia', 'transporte estudiantes',
      'ruta escolar GPS', 'transporte escolar seguro', 'movilidad escolar',
      'transporte colegio Bolivia', 'escolar con rastreo', 'transporte escolar La Paz',
      'bus escolar Cochabamba', 'transporte menores escuela', 'escolar puerta a puerta',
    ],
    canonical: `${SITE.domain}/transporte-escolar`,
    changeFrequency: 'monthly',
    priority: 0.7,
    schemaType: 'Service',
  },

  '/transporte-mascotas': {
    title: 'Transporte de Mascotas en Bolivia — Viaje Seguro para tu Mascota',
    description: 'Servicio de transporte de mascotas en Bolivia. Viaje seguro para perros, gatos y otras mascotas al veterinario, peluquería canina o mudanza. Vehículos ventilados, jaulas disponibles y conductores capacitados.',
    keywords: [
      'transporte mascotas Bolivia', 'taxi mascotas', 'taxi perros Bolivia',
      'transporte mascotas Santa Cruz', 'taxi gatos', 'traslado mascotas',
      'transporte mascotas veterinario', 'taxi mascotas aeropuerto',
      'mudanza mascotas Bolivia', 'transporte animales Bolivia',
      'viaje mascotas seguro', 'taxi mascota La Paz', 'pet taxi Bolivia',
      'transporte mascota puerta a puerta', 'jaula transporte mascota',
    ],
    canonical: `${SITE.domain}/transporte-mascotas`,
    changeFrequency: 'monthly',
    priority: 0.7,
    schemaType: 'Service',
  },

  '/aventura': {
    title: 'Turismo de Aventura en Bolivia — Tours y Excursiones',
    description: 'Tours de aventura y excursiones en Bolivia con Ecotaxi. Visita el Salar de Uyuni, Amboró, Samaipata, Lomas de Arena y más. Transporte 4x4, chofer guía y rutas personalizadas para tu aventura.',
    keywords: [
      'turismo aventura Bolivia', 'tours Bolivia', 'excursiones Santa Cruz',
      'Salar de Uyuni tour', 'tour Samaipata', 'tour Amboró',
      'turismo Bolivia Ecotaxi', 'excursión Lomas de Arena', 'tour 4x4 Bolivia',
      'aventura Bolivia transporte', 'tour naturaleza Bolivia',
      'turismo ecológico Bolivia', 'tour selva Bolivia', 'excursión Bolivia',
      'tour personalizado Bolivia', 'chofer guía turismo',
    ],
    canonical: `${SITE.domain}/aventura`,
    changeFrequency: 'monthly',
    priority: 0.7,
    schemaType: 'Service',
  },

  '/eventos': {
    title: 'Transporte para Eventos en Bolivia — Logística de Eventos',
    description: 'Servicio de transporte para eventos, congresos y convenciones en Bolivia. Logística completa de movilidad para eventos corporativos, sociales y culturales. Flota dedicada, coordinación en sitio y servicio VIP.',
    keywords: [
      'transporte eventos Bolivia', 'logística eventos Santa Cruz',
      'transporte congresos Bolivia', 'taxi eventos corporativos',
      'transporte convenciones', 'movilidad eventos Bolivia',
      'servicio transporte eventos', 'flota eventos Bolivia',
      'coordinación transporte evento', 'taxi eventos La Paz',
      'transporte ferias Bolivia', 'eventos corporativos transporte',
    ],
    canonical: `${SITE.domain}/eventos`,
    changeFrequency: 'monthly',
    priority: 0.7,
    schemaType: 'Service',
  },

  '/mudanza': {
    title: 'Mudanzas Profesionales en Bolivia — Local, Provincial y Nacional',
    description: 'Servicio de mudanzas profesionales en Bolivia. Mudanza local, provincial y nacional con calculadora de precio online. Furgones cerrados y camionetas, embalaje profesional, ayudantes, seguro de carga y rastreo GPS. Cotiza gratis.',
    keywords: [
      'mudanza Bolivia', 'mudanza Santa Cruz', 'mudanza profesional',
      'mudanza local Bolivia', 'mudanza nacional Bolivia', 'mudanza provincial',
      'furgón mudanza', 'camioneta mudanza', 'calculadora mudanza',
      'cotizar mudanza Bolivia', 'mudanza económica', 'mudanza casa Bolivia',
      'mudanza oficina Bolivia', 'mudanza embalaje', 'mudanza con seguro',
      'empresa mudanzas Bolivia', 'mudanza La Paz', 'mudanza Cochabamba',
      'mudanza interdepartamental', 'traslado muebles Bolivia',
      'mudanza precio Bolivia', 'mudanza barata Santa Cruz',
    ],
    canonical: `${SITE.domain}/mudanza`,
    changeFrequency: 'weekly',
    priority: 0.9,
    schemaType: 'Service',
  },

  '/logistica': {
    title: 'Logística y Distribución en Bolivia — Transporte de Carga',
    description: 'Servicio de logística y distribución en Bolivia. Transporte de carga, distribución última milla, almacén temporal y logística empresarial. Cobertura nacional con rastreo satelital y seguro de carga.',
    keywords: [
      'logística Bolivia', 'distribución Bolivia', 'transporte carga Santa Cruz',
      'logística empresarial Bolivia', 'distribución última milla',
      'almacén logístico Bolivia', 'transporte mercancía Bolivia',
      'logística nacional Bolivia', 'distribución productos Bolivia',
      'cadena suministro Bolivia', 'logística Santa Cruz',
    ],
    canonical: `${SITE.domain}/logistica`,
    changeFrequency: 'monthly',
    priority: 0.8,
    schemaType: 'Service',
  },

  '/alquiler-maquinaria': {
    title: 'Alquiler de Maquinaria Pesada en Bolivia — Excavadoras, Grúas',
    description: 'Alquiler de maquinaria pesada en Bolivia: excavadoras, grúas, retroexcavadoras, volquetas y más. Operador incluido, transporte al sitio y seguro. Servicio para construcción, minería y obras públicas.',
    keywords: [
      'alquiler maquinaria pesada Bolivia', 'alquiler excavadora Bolivia',
      'alquiler grúa Bolivia', 'maquinaria construcción Bolivia',
      'alquiler retroexcavadora', 'volqueta alquiler', 'maquinaria obra',
      'alquiler maquinaria Santa Cruz', 'maquinaria pesada precio',
      'alquiler grúa plataforma', 'maquinaria minería Bolivia',
      'alquiler maquinaria La Paz', 'construcción Bolivia maquinaria',
    ],
    canonical: `${SITE.domain}/alquiler-maquinaria`,
    changeFrequency: 'monthly',
    priority: 0.7,
    schemaType: 'Service',
  },

  '/agencias': {
    title: 'Agencias de Viaje y OTAs — Programa de Partners',
    description: 'Programa para agencias de viaje y OTAs con Ecotaxi Bolivia. Ofrece transporte premium a tus clientes con comisiones atractivas, panel de reservas, facturación automática y soporte dedicado.',
    keywords: [
      'agencias viaje Bolivia', 'OTA transporte', 'programa partners Ecotaxi',
      'agencia viaje taxi', 'comisión agencia transporte', 'reserva transporte agencia',
      'transporte turístico agencias', 'B2B transporte Bolivia',
      'agencia viaje Santa Cruz', 'partners transporte Bolivia',
    ],
    canonical: `${SITE.domain}/agencias`,
    changeFrequency: 'monthly',
    priority: 0.7,
    schemaType: 'Service',
  },

  '/bus': {
    title: 'Alquiler de Bus y Minibus en Bolivia — Transporte Grupal',
    description: 'Alquiler de bus, minibus y micros en Bolivia para transporte grupal, viajes corporativos, excursiones y eventos. Chofer profesional, aire acondicionado y capacidad de 15 a 45 pasajeros. Cotiza tu viaje grupal.',
    keywords: [
      'alquiler bus Bolivia', 'alquiler minibus Santa Cruz', 'bus turismo Bolivia',
      'transporte grupal Bolivia', 'alquiler micro Bolivia', 'bus eventos',
      'bus corporativo Bolivia', 'alquiler bus La Paz', 'minibus Cochabamba',
      'bus excursion Bolivia', 'transporte grupo Bolivia', 'bus privado alquiler',
      'bus aeropuerto grupo', 'bus 45 pasajeros Bolivia', 'minibus 20 pasajeros',
    ],
    canonical: `${SITE.domain}/bus`,
    changeFrequency: 'monthly',
    priority: 0.8,
    schemaType: 'Service',
  },

  '/maquinaria': {
    title: 'Maquinaria Pesada en Bolivia — Equipos para Construcción',
    description: 'Maquinaria pesada para construcción, minería y obras públicas en Bolivia. Excavadoras, grúas, retroexcavadoras, volquetas con operador profesional y transporte incluido.',
    keywords: [
      'maquinaria pesada Bolivia', 'equipos construcción Bolivia',
      'excavadora Bolivia', 'grúa Bolivia', 'retroexcavadora Bolivia',
    ],
    canonical: `${SITE.domain}/maquinaria`,
    changeFrequency: 'monthly',
    priority: 0.6,
    schemaType: 'Service',
  },

  '/nosotros': {
    title: 'Sobre Ecotaxi Bolivia — Nuestra Historia y Compromiso Ecológico',
    description: 'Conoce Ecotaxi Bolivia: la primera empresa de transporte con neutralización de CO2 en Bolivia. Nuestra historia desde 2015, valores de excelencia e innovación, y compromiso con la sostenibilidad y la comunidad.',
    keywords: [
      'ecotaxi nosotros', 'historia Ecotaxi', 'empresa transporte Bolivia',
      'transporte ecológico Bolivia', 'CO2 neutro transporte', 'O&C Ingeniería',
      'empresa Santa Cruz transporte', 'valores Ecotaxi', 'sostenibilidad Bolivia',
      'compromiso ecológico', 'transporte responsable Bolivia',
    ],
    canonical: `${SITE.domain}/nosotros`,
    changeFrequency: 'monthly',
    priority: 0.6,
    schemaType: 'AboutPage',
  },
}

/**
 * Get SEO data for a page path, with fallback
 */
export function getPageSeo(path: string): PageSeoData {
  return PAGES[path] || {
    title: 'Ecotaxi Bolivia — Transporte Profesional',
    description: 'Servicio de transporte profesional en Bolivia con Ecotaxi.',
    keywords: ['ecotaxi', 'transporte Bolivia'],
    canonical: `${SITE.domain}${path}`,
    changeFrequency: 'monthly',
    priority: 0.5,
  }
}

/**
 * Generate Next.js Metadata object from PageSeoData
 */
export function generatePageMetadata(path: string) {
  const seo = getPageSeo(path)
  
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: seo.canonical,
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.canonical,
      siteName: SITE.name,
      type: (seo.ogType || 'website') as 'website' | 'article',
      locale: 'es_BO',
      images: seo.ogImage ? [{
        url: seo.ogImage,
        width: 1200,
        height: 630,
        alt: seo.title,
      }] : undefined,
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: seo.title,
      description: seo.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

/**
 * Generate JSON-LD schema for a specific page
 */
export function generatePageSchema(path: string): Record<string, unknown>[] {
  const seo = getPageSeo(path)
  const schemas: Record<string, unknown>[] = []

  // Base LocalBusiness schema (only on homepage)
  if (path === '/') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'TaxiService',
      name: SITE.name,
      alternateName: 'EcoTaxi Bolivia',
      url: SITE.domain,
      logo: `${SITE.domain}/logo-ecotaxi.webp`,
      description: seo.description,
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
        dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
      sameAs: Object.values(SITE.social),
      parentOrganization: {
        '@type': 'Organization',
        name: SITE.org,
        url: 'https://crm.oyc-srl.com',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Servicios de Transporte',
        itemListElement: Object.entries(PAGES)
          .filter(([p]) => p !== '/' && p !== '/nosotros')
          .map(([, s]) => ({
            '@type': 'Offer',
            name: s.title.split(' | ')[0].split(' — ')[0],
            description: s.description.substring(0, 120),
            url: s.canonical,
          })),
      },
    })

    // WebSite with SearchAction
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE.name,
      url: SITE.domain,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE.domain}/?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    })
  }

  // Service schema for all service pages
  if (path !== '/' && path !== '/nosotros') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: seo.title.split(' | ')[0].split(' — ')[0],
      description: seo.description,
      url: seo.canonical,
      provider: {
        '@type': 'TaxiService',
        name: SITE.name,
        url: SITE.domain,
        telephone: SITE.phone,
      },
      areaServed: [
        { '@type': 'City', name: 'Santa Cruz de la Sierra' },
        { '@type': 'Country', name: 'Bolivia' },
      ],
      serviceType: seo.schemaType || 'Service',
    })
  }

  // BreadcrumbList for all pages
  const pathParts = path.split('/').filter(Boolean)
  const breadcrumbItems = [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE.domain },
    ...pathParts.map((part, i) => ({
      '@type': 'ListItem',
      position: i + 2,
      name: seo.title.split(' | ')[0].split(' — ')[0],
      item: `${SITE.domain}/${pathParts.slice(0, i + 1).join('/')}`,
    })),
  ]

  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems,
  })

  // Specific schemas for specific pages
  if (path === '/mudanza') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: '¿Cuánto cuesta una mudanza en Bolivia?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'El costo de una mudanza en Bolivia depende del volumen, distancia y servicios adicionales. Usa nuestra calculadora de mudanza online para obtener una cotización instantánea y personalizada.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Qué incluye el servicio de mudanza de Ecotaxi?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'El servicio incluye transporte con vehículo adecuado, ayudantes para carga y descarga, seguro de carga al 3%, y opcionalmente embalaje profesional, desarmado de muebles y limpieza post-mudanza.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Hacen mudanzas entre ciudades de Bolivia?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sí, realizamos mudanzas locales, provinciales y nacionales entre todas las ciudades y departamentos de Bolivia con seguimiento GPS y seguro de carga.',
          },
        },
      ],
    })
  }

  if (path === '/aeropuerto' || path === '/transfer-aeropuerto') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: '¿Cuánto cuesta un taxi al aeropuerto Viru Viru?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'El traslado al aeropuerto Viru Viru desde Santa Cruz tiene tarifa fija transparente. Reserva online para conocer el precio exacto según tu punto de partida.',
          },
        },
        {
          '@type': 'Question',
          name: '¿El taxi al aeropuerto incluye espera por retrasos de vuelo?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sí, monitoreamos tu vuelo en tiempo real y ajustamos la hora de recogida sin costo adicional por retrasos del vuelo.',
          },
        },
      ],
    })
  }

  return schemas
}

/**
 * All page paths for sitemap generation
 */
export function getAllPagePaths(): { path: string; priority: number; changeFrequency: string }[] {
  return Object.entries(PAGES).map(([path, seo]) => ({
    path,
    priority: seo.priority || 0.5,
    changeFrequency: seo.changeFrequency || 'monthly',
  }))
}
