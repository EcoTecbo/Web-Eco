import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const {
      moveType, catType, totalVolume, routeDistance, routeDuration,
      originAddress, destAddress, intermediateStops,
      originExtras, destExtras, originHelpers, destHelpers,
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

    const originExtraNames = originExtras ? Object.keys(originExtras).join(', ') || 'Ninguno' : 'Ninguno'
    const destExtraNames = destExtras ? Object.keys(destExtras).join(', ') || 'Ninguno' : 'Ninguno'

    const stopsList = intermediateStops && intermediateStops.length > 0
      ? intermediateStops.map((s: { address: string }, i: number) => `  Parada ${i + 1}: ${s.address}`).join('\n')
      : '  Ninguna'

    const emailBody = `
═══════════════════════════════════════
COTIZACIÓN DE SERVICIO DE MUDANZA
Desde la Web - Ecotaxi Bolivia
═══════════════════════════════════════

TIPO DE MUDANZA: ${moveType?.toUpperCase() || 'N/A'}
CATEGORÍA: ${catType?.toUpperCase() || 'N/A'}

VOLUMEN TOTAL: ${totalVolume || 0} m³
VEHÍCULO RECOMENDADO: ${vehicleRecommendation || 'N/A'}

DISTANCIA: ${routeDistance || '~10'} km
DURACIÓN ESTIMADA: ${routeDuration ? routeDuration + ' min' : 'N/A'}

── ORIGEN ─────────────────────────────
Dirección: ${originAddress || 'No especificada'}
Piso: (ver extras)
${originHelpers > 0 ? `Ayudantes: ${originHelpers}` : ''}

── DESTINO ────────────────────────────
Dirección: ${destAddress || 'No especificada'}
Piso: (ver extras)
${destHelpers > 0 ? `Ayudantes: ${destHelpers}` : ''}

── PARADAS INTERMEDIAS ────────────────
${stopsList}

── EXTRAS DE ORIGEN ───────────────────
${originExtraNames}
${originHelpers > 0 ? `Ayudantes en origen: ${originHelpers} x Bs 150 = Bs ${originHelpers * 150}` : ''}

── EXTRAS DE DESTINO ──────────────────
${destExtraNames}
${destHelpers > 0 ? `Ayudantes en destino: ${destHelpers} x Bs 150 = Bs ${destHelpers * 150}` : ''}

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
      // The email might fail if SMTP is not configured
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
