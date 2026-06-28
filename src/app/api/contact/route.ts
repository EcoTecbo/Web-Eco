import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

/**
 * Generic contact/booking form submission API.
 * Accepts POST with JSON body containing:
 *   - type: string (e.g. "aeropuerto", "corporativo", etc.)
 *   - formData: object with all form fields
 * Sends an email to ecotaxi@oyc-srl.com with the formatted data.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, formData } = body

    if (!type || !formData) {
      return NextResponse.json(
        { success: false, error: 'Faltan campos requeridos (type, formData)' },
        { status: 400 }
      )
    }

    // Format the form data into a readable email body
    const typeLabels: Record<string, string> = {
      aeropuerto: 'Reserva Aeropuerto',
      corporativo: 'Servicio Corporativo',
      'transporte-salud': 'Transporte de Salud',
      interurbano: 'Servicio Interurbano',
      logistica: 'Logística y Distribución',
      envios: 'Envíos y Mensajería',
      agencias: 'Agencias y OTAs',
      'transfer-aeropuerto': 'Transfer Aeropuerto',
      bus: 'Servicio de Bus',
    }

    const serviceLabel = typeLabels[type] || type.toUpperCase()

    // Build email body from formData object
    const formattedFields = Object.entries(formData)
      .filter(([, value]) => value !== undefined && value !== null && value !== '')
      .map(([key, value]) => {
        // Format key: replace underscores, capitalize
        const label = key
          .replace(/([A-Z])/g, ' $1')
          .replace(/_/g, ' ')
          .replace(/^\w/, (c) => c.toUpperCase())
        return `  ${label}: ${value}`
      })
      .join('\n')

    const emailBody = `
═══════════════════════════════════════
${serviceLabel.toUpperCase()}
Desde la Web - Ecotaxi Bolivia
═══════════════════════════════════════

TIPO DE SERVICIO: ${serviceLabel}

── DATOS DEL FORMULARIO ──────────────
${formattedFields}

───────────────────────────────────────
Solicitud generada desde ecotaxi.com.bo
`

    // Create transporter
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
        subject: `[Ecotaxi Web] ${serviceLabel} - Nueva Solicitud`,
        text: emailBody,
        replyTo: formData.email || formData.correo || undefined,
      })
    } catch (emailError) {
      console.error('Email sending failed:', emailError)
      // Still return success so the user sees confirmation
      // but indicate that email may need follow-up
      return NextResponse.json({
        success: true,
        emailSent: false,
        message: 'Solicitud recibida. El equipo se comunicará pronto.',
      })
    }

    // Build WhatsApp link as fallback
    const whatsappText = encodeURIComponent(`Nueva solicitud de ${serviceLabel}:\n${formattedFields}`)
    const whatsappLink = `https://wa.me/59173662803?text=${whatsappText}`

    return NextResponse.json({
      success: true,
      emailSent: true,
      whatsappLink,
      message: 'Solicitud enviada exitosamente',
    })
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { success: false, error: 'Error al procesar la solicitud' },
      { status: 500 }
    )
  }
}
