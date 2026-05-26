import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const {
      moveType, catType, totalVolume, routeDistance, routeDuration,
      originAddress, destAddress, intermediateStops,
      vehicleType, selectedVehicle,
      embalajeType, embalajeCost, boxes, boxesCost, materials, materialsCost,
      handlingExtras, handlingCost,
      originFloor, elevatorOrigin, originFloorCost, originCaminata, originFachada,
      destFloor, elevatorDest, destFloorCost, destCaminata, destFachada,
      accessibilityCost,
      helpers, helpersCost,
      logisticsExtras, logisticsCost,
      wantsInsurance, insuranceAmount, insuranceCost,
      includeIva, ivaAmount, razonSocial, nit, paymentMethod,
      basePrice, extrasTotal, subtotal, grandTotal,
      fullName, phone, hasWhatsApp, email,
      items, vehicleRecommendation,
    } = data

    // Build email body
    const itemsList = items && items.length > 0
      ? items.map((i: { qty: number; name: string; vol: number; emoji: string }) => `  ${i.emoji} ${i.qty}x ${i.name} (${i.vol} m³)`).join('\n')
      : '  Ninguno seleccionado'

    const stopsList = intermediateStops && intermediateStops.length > 0
      ? intermediateStops.map((s: { address: string }, i: number) => `  Parada ${i + 1}: ${s.address}`).join('\n')
      : '  Ninguna'

    const embalajeLabel = embalajeType === 'completo' ? 'Completo (Bs 45/m³)' : embalajeType === 'solo_embalaje' ? 'Solo Embalaje (Bs 30/m³)' : embalajeType === 'solo_desembalaje' ? 'Solo Desembalaje (Bs 15/m³)' : 'Ninguno'

    const boxesList = boxes && Object.keys(boxes).length > 0
      ? Object.entries(boxes).map(([id, qty]) => {
          const boxMap: Record<string, string> = { caja_peq: 'Caja Pequeña', caja_med: 'Caja Mediana', caja_gra: 'Caja Grande' }
          return `  ${qty}x ${boxMap[id] || id}`
        }).join('\n')
      : '  Ninguna'

    const materialsList = materials && Object.keys(materials).length > 0
      ? Object.entries(materials).map(([id, qty]) => {
          const matMap: Record<string, string> = { papel_film: 'Papel Film', papel_burbuja: 'Papel Burbuja', papel_kraft: 'Papel Kraft', manta_proteccion: 'Manta de Protección', cinta_embalar: 'Cinta de Embalar', etiquetas: 'Etiquetas y Marcadores' }
          return `  ${qty}x ${matMap[id] || id}`
        }).join('\n')
      : '  Ninguno'

    const handlingList = handlingExtras && Object.keys(handlingExtras).length > 0
      ? Object.entries(handlingExtras).map(([id, qty]) => {
          const hMap: Record<string, string> = { armado_muebles: 'Armado/Desarmado Muebles', embalaje_fragil: 'Embalaje Frágil', objetos_pesados: 'Objetos Pesados' }
          return `  ${qty}x ${hMap[id] || id}`
        }).join('\n')
      : '  Ninguno'

    const logisticsList = logisticsExtras && Object.keys(logisticsExtras).length > 0
      ? Object.entries(logisticsExtras).map(([id, qty]) => {
          const lMap: Record<string, string> = { punto_carga_extra: 'Punto de Carga Adicional', retiro_cajas: 'Desescombro/Retiro de Cajas' }
          return `  ${qty}x ${lMap[id] || id}`
        }).join('\n')
      : '  Ninguno'

    const emailBody = `
═══════════════════════════════════════
COTIZACIÓN DE SERVICIO DE MUDANZA
Desde la Web - Ecotaxi Bolivia
═══════════════════════════════════════

TIPO DE MUDANZA: ${moveType?.toUpperCase() || 'N/A'}
CATEGORÍA: ${catType?.toUpperCase() || 'N/A'}

VOLUMEN TOTAL: ${totalVolume || 0} m³
VEHÍCULO SELECCIONADO: ${selectedVehicle?.name || vehicleRecommendation || 'N/A'}
TIPO VEHÍCULO: ${vehicleType === 'cerrado' ? 'Furgón (Cerrado)' : vehicleType === 'abierto' ? 'Camioneta (Abierto)' : 'N/A'}

DISTANCIA: ${routeDistance || '~10'} km
DURACIÓN ESTIMADA: ${routeDuration ? routeDuration + ' min' : 'N/A'}

── ORIGEN ─────────────────────────────
Dirección: ${originAddress || 'No especificada'}
Piso: ${originFloor === 'baja' ? 'Planta baja' : `Piso ${originFloor}`}${elevatorOrigin ? ' (con elevador)' : ' (sin elevador)'}
${originFloorCost > 0 ? `Costo piso: Bs ${originFloorCost}` : ''}
${originCaminata > 0 ? `Distancia caminata: ${originCaminata} x 10m` : ''}
${originFachada > 0 ? `Elevador fachada: ${originFachada} hr` : ''}

── DESTINO ────────────────────────────
Dirección: ${destAddress || 'No especificada'}
Piso: ${destFloor === 'baja' ? 'Planta baja' : `Piso ${destFloor}`}${elevatorDest ? ' (con elevador)' : ' (sin elevador)'}
${destFloorCost > 0 ? `Costo piso: Bs ${destFloorCost}` : ''}
${destCaminata > 0 ? `Distancia caminata: ${destCaminata} x 10m` : ''}
${destFachada > 0 ? `Elevador fachada: ${destFachada} hr` : ''}

── PARADAS INTERMEDIAS ────────────────
${stopsList}

── EMBALAJE ───────────────────────────
Tipo: ${embalajeLabel}
${embalajeCost > 0 ? `Costo: Bs ${embalajeCost}` : ''}

── CAJAS ──────────────────────────────
${boxesList}
Costo cajas: Bs ${boxesCost || 0}

── MATERIALES ─────────────────────────
${materialsList}
Costo materiales: Bs ${materialsCost || 0}

── MANIPULACIÓN ───────────────────────
${handlingList}
Costo manipulación: Bs ${handlingCost || 0}

── ACCESIBILIDAD ──────────────────────
Costo total accesibilidad: Bs ${accessibilityCost || 0}

── AYUDANTES ──────────────────────────
${helpers > 0 ? `${helpers} ayudantes × Bs ${selectedVehicle?.helperPrice || 80} = Bs ${helpersCost}` : 'Ninguno'}

── LOGÍSTICA ──────────────────────────
${logisticsList}
Costo logística: Bs ${logisticsCost || 0}

── SEGURO ─────────────────────────────
${wantsInsurance ? `Sí - Valor declarado: Bs ${insuranceAmount?.toLocaleString()} - Costo: Bs ${insuranceCost?.toLocaleString()}` : 'No incluye seguro'}

── FACTURACIÓN ────────────────────────
${includeIva ? `Con IVA 16%: Bs ${ivaAmount?.toLocaleString()}
Razón Social: ${razonSocial || 'N/A'}
NIT: ${nit || 'N/A'}` : 'Sin IVA'}

── MÉTODO DE PAGO ─────────────────────
${paymentMethod || 'N/A'}

── RESUMEN DE COSTOS ──────────────────
Precio base:     Bs ${basePrice?.toLocaleString()}
Extras:          Bs ${extrasTotal?.toLocaleString()}
${wantsInsurance ? `Seguro:          Bs ${insuranceCost?.toLocaleString()}` : ''}
Subtotal:        Bs ${subtotal?.toLocaleString()}
${includeIva ? `IVA 16%:         Bs ${ivaAmount?.toLocaleString()}` : ''}
═══════════════════════════════════════
TOTAL ESTIMADO:  Bs ${grandTotal?.toLocaleString()}
═══════════════════════════════════════

── DATOS DEL CLIENTE ──────────────────
Nombre:   ${fullName || 'N/A'}
Teléfono: ${phone || 'N/A'}${hasWhatsApp ? ' (WhatsApp ✓)' : ''}
Email:    ${email || 'N/A'}

── ARTÍCULOS ──────────────────────────
${itemsList}

───────────────────────────────────────
Esta cotización es estimada y puede variar
según evaluación presencial.
Cotización generada desde ecotaxibolivia.com
`

    // Create transporter using environment variables or defaults
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASS || '',
      },
    })

    // Send email
    try {
      await transporter.sendMail({
        from: process.env.SMTP_USER || 'noreply@ecotaxibolivia.com',
        to: 'ecotaxi@oyc-srl.com',
        subject: 'Cotización de Servicio de Mudanza desde la Web',
        text: emailBody,
        replyTo: email || undefined,
      })
    } catch (emailError) {
      console.error('Email sending failed:', emailError)
      // Still return success so the user can use WhatsApp
    }

    // Build WhatsApp link
    const whatsappText = encodeURIComponent(emailBody)
    const whatsappLink = `https://wa.me/59173662803?text=${whatsappText}`

    return NextResponse.json({
      success: true,
      whatsappLink,
      message: 'Cotización procesada exitosamente',
    })
  } catch (error) {
    console.error('Error processing mudanza submission:', error)
    return NextResponse.json(
      { success: false, error: 'Error al procesar la cotización' },
      { status: 500 }
    )
  }
}
