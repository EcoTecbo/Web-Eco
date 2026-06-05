import { NextResponse } from 'next/server'

/**
 * Mudanza API
 * GET: Distance estimation based on known Bolivia routes or heuristic
 * POST: Submit mudanza request (sends email with all data)
 */

/**
 * GET /api/mudanza
 * Accepts: origin, destination (text addresses)
 * Returns: distance (km) estimation based on known Bolivia routes or heuristic
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const origin = searchParams.get('origin') || ''
  const destination = searchParams.get('destination') || ''

  if (!origin || !destination) {
    return NextResponse.json({ error: 'Origin and destination are required' }, { status: 400 })
  }

  // Known Bolivia city distances (approximate km)
  const knownRoutes: Record<string, Record<string, number>> = {
    'santa cruz': { 'cochabamba': 320, 'la paz': 700, 'sucre': 500, 'oruro': 520, 'potosi': 620, 'trinidad': 470, 'tarija': 600, 'yacuiba': 540, 'camiri': 350, 'montero': 50, 'warnes': 30, 'okinawa': 60, 'coto': 480 },
    'cochabamba': { 'santa cruz': 320, 'la paz': 380, 'sucre': 280, 'oruro': 210, 'potosi': 380, 'trinidad': 600, 'tarija': 470 },
    'la paz': { 'santa cruz': 700, 'cochabamba': 380, 'sucre': 640, 'oruro': 230, 'potosi': 520, 'trinidad': 600, 'cobija': 1200, 'riberalta': 850 },
    'sucre': { 'santa cruz': 500, 'cochabamba': 280, 'la paz': 640, 'potosi': 160, 'tarija': 320 },
    'oruro': { 'santa cruz': 520, 'cochabamba': 210, 'la paz': 230, 'potosi': 310 },
    'potosi': { 'santa cruz': 620, 'cochabamba': 380, 'la paz': 520, 'sucre': 160, 'oruro': 310, 'tarija': 380 },
    'trinidad': { 'santa cruz': 470, 'cochabamba': 600, 'la paz': 600 },
    'tarija': { 'santa cruz': 600, 'cochabamba': 470, 'sucre': 320, 'potosi': 380 },
  }

  // Extract city names from addresses
  const extractCity = (addr: string): string => {
    const lower = addr.toLowerCase().trim()
    const cities = ['santa cruz', 'cochabamba', 'la paz', 'sucre', 'oruro', 'potosi', 'trinidad', 'tarija', 'cobija', 'riberalta', 'yacuiba', 'camiri', 'montero', 'warnes', 'okinawa']
    for (const city of cities) {
      if (lower.includes(city)) return city
    }
    return lower
  }

  const originCity = extractCity(origin)
  const destCity = extractCity(destination)

  // Check if same city (local move)
  if (originCity === destCity) {
    const localDistance = Math.max(5, Math.min(25, origin.length > 20 ? 12 : 8))
    return NextResponse.json({
      distance: localDistance,
      type: 'local',
      origin: originCity,
      destination: destCity,
      note: 'Mudanza local — distancia estimada dentro de la ciudad'
    })
  }

  // Check known intercity routes
  const routeDist = knownRoutes[originCity]?.[destCity] || knownRoutes[destCity]?.[originCity]

  if (routeDist) {
    return NextResponse.json({
      distance: routeDist,
      type: 'intercity',
      origin: originCity,
      destination: destCity,
      note: `Mudanza interurbana — ${originCity} a ${destCity}`
    })
  }

  // Heuristic: default to average intercity distance in Bolivia
  const defaultDistance = 150

  return NextResponse.json({
    distance: defaultDistance,
    type: 'estimated',
    origin: originCity,
    destination: destCity,
    note: 'Distancia estimada — contactanos para una cotización exacta'
  })
}

/**
 * POST /api/mudanza
 * Accepts: Full mudanza request data
 * Returns: Success confirmation
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.nombre || !body.telefono || !body.correo) {
      return NextResponse.json(
        { error: 'Nombre, teléfono y correo son requeridos' },
        { status: 400 }
      )
    }

    // Build email body
    const emailBody = [
      '🚚 SOLICITUD DE MUDANZA - ECOTAXI BOLIVIA',
      '═══════════════════════════════════════',
      '',
      `Tipo de Mudanza: ${body.mudanzaType === 'casa' ? 'Casa' : body.mudanzaType === 'oficina' ? 'Oficina' : 'Especial'}`,
      `Tamaño: ${body.moveSize === 'express' ? 'Express' : body.moveSize === 'estandar' ? 'Estándar' : body.moveSize === 'familiar' ? 'Familiar' : 'Premium'}`,
      `Vehículo: ${body.truckName || body.truckId || 'N/A'}`,
      '',
      '📍 RUTA',
      `Origen: ${body.origin}`,
      `Destino: ${body.destination}`,
      `Distancia: ${body.distance || '?'} km`,
      `Fecha: ${body.date}`,
      `Hora: ${body.time || '08:00'}`,
      '',
      '🔧 SERVICIOS',
      body.desmontaje ? '✓ Desmontaje de muebles' : '✗ Desmontaje',
      body.embalaje ? '✓ Embalaje profesional' : '✗ Embalaje',
      body.montaje ? '✓ Montaje de muebles' : '✗ Montaje',
      body.desembalaje ? '✓ Desembalaje' : '✗ Desembalaje',
      body.elevador ? '✓ Elevador/grúa' : '✗ Elevador',
      body.limpieza ? '✓ Limpieza post-mudanza' : '✗ Limpieza',
      '',
      `👷 Cargadores origen: ${body.cargadoresOrigen || 0}`,
      `👷 Cargadores destino: ${body.cargadoresDestino || 0}`,
      `📦 Cajas de cartón: ${body.boxCount || 0}`,
      '',
      body.wantsInsurance
        ? `🛡️ Seguro: Sí — Valor declarado: Bs ${body.insuranceValue} (2% = Bs ${Math.round(parseFloat(body.insuranceValue || '0') * 0.02)})`
        : '🛡️ Seguro: No',
      body.wantsIVA
        ? `📄 IVA: Sí — Razón Social: ${body.razonSocial}, NIT: ${body.nit}`
        : '📄 IVA: No',
      '',
      '💰 ESTIMACIÓN',
      `Total estimado: Bs ${body.estimatedPrice?.toLocaleString() || 'N/A'}`,
      `Método de pago: ${body.paymentMethod || 'efectivo'}`,
      '',
      '👤 DATOS DEL CLIENTE',
      `Nombre: ${body.nombre}`,
      `Teléfono: ${body.telefono}`,
      `Correo: ${body.correo}`,
    ].join('\n')

    // In production, this would send an email via an email service
    // For now, we log it and return success
    console.log('═══ MUDANZA SUBMISSION ═══')
    console.log(emailBody)
    console.log('══════════════════════════')

    // Store in a simple log (in production, use a database or email service)
    return NextResponse.json({
      success: true,
      message: 'Solicitud de mudanza recibida correctamente',
      submission: {
        nombre: body.nombre,
        correo: body.correo,
        estimatedPrice: body.estimatedPrice,
        timestamp: new Date().toISOString(),
      }
    })
  } catch (error) {
    console.error('Error processing mudanza submission:', error)
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    )
  }
}
