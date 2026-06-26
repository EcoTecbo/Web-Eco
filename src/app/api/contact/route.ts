import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

/**
 * POST /api/contact
 *
 * Unified contact form endpoint. Receives a JSON body with:
 *   {
 *     type:    'aeropuerto' | 'transfer-aeropuerto' | 'interurbano' |
 *              'corporativo' | 'agencias' | 'transporte-salud' |
 *              'logistica' | 'bus' | 'maquinaria' | 'general',
 *     fields:  { [key: string]: string | string[] | number | null },
 *     meta:    { page?: string, submittedAt?: string }
 *   }
 *
 * Sends an email to ecotaxi@oyc-srl.com with all the form data,
 * formatted as plain text for easy reading on any email client.
 *
 * Environment variables required:
 *   SMTP_HOST  (default: smtp.gmail.com)
 *   SMTP_PORT  (default: 587)
 *   SMTP_USER
 *   SMTP_PASS
 */

const RECIPIENT = 'ecotaxi@oyc-srl.com'

// Human-readable labels for known form types
const TYPE_LABELS: Record<string, string> = {
  'aeropuerto':         'Traslado Aeropuerto',
  'transfer-aeropuerto':'Transfer Aeropuerto',
  'interurbano':        'Viaje Interurbano',
  'corporativo':        'Servicio Corporativo',
  'agencias':           'Solicitud de Agencias',
  'transporte-salud':   'Transporte Personal de Salud',
  'logistica':          'Servicio de Logística',
  'bus':                'Cotización Bus / Transporte Grupal',
  'maquinaria':         'Cotización Maquinaria Pesada',
  'general':            'Contacto General',
}

const TYPE_SUBJECTS: Record<string, string> = {
  'aeropuerto':         '🚕 Reserva Traslado Aeropuerto',
  'transfer-aeropuerto':'🚕 Reserva Transfer Aeropuerto',
  'interurbano':        '🚐 Cotización Viaje Interurbano',
  'corporativo':        '🏢 Solicitud Servicio Corporativo',
  'agencias':           '🤝 Solicitud de Agencias',
  'transporte-salud':   '⚕️ Solicitud Transporte Personal de Salud',
  'logistica':          '📦 Cotización Logística / Envío',
  'bus':                '🚌 Cotización Bus / Transporte Grupal',
  'maquinaria':         '🏗️ Cotización Maquinaria Pesada',
  'general':            '✉️ Nuevo Contacto desde la Web',
}

// Pretty-format a single field value
function formatValue(value: unknown): string {
  if (value === null || value === undefined || value === '') return '—'
  if (Array.isArray(value)) {
    if (value.length === 0) return '—'
    return value.map(v => `    • ${formatValue(v)}`).join('\n')
  }
  if (typeof value === 'boolean') return value ? 'Sí' : 'No'
  if (typeof value === 'number') return value.toLocaleString('es-BO')
  return String(value)
}

// Convert snake_case / camelCase to a readable label
function humanize(key: string): string {
  return key
    .replace(/_/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/^\w/, c => c.toUpperCase())
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      type = 'general',
      fields = {},
      meta = {},
    } = body

    // Basic validation
    if (!fields || typeof fields !== 'object' || Object.keys(fields).length === 0) {
      return NextResponse.json(
        { success: false, error: 'No se recibieron datos del formulario' },
        { status: 400 }
      )
    }

    const typeLabel = TYPE_LABELS[type] || TYPE_LABELS.general
    const subject  = TYPE_SUBJECTS[type] || TYPE_SUBJECTS.general
    const submittedAt = meta.submittedAt
      ? new Date(meta.submittedAt).toLocaleString('es-BO', { timeZone: 'America/La_Paz' })
      : new Date().toLocaleString('es-BO', { timeZone: 'America/La_Paz' })
    const page = meta.page || 'No especificada'

    // Build email body — plain text, easy to read on any client
    const fieldLines = Object.entries(fields)
      .map(([key, value]) => `${humanize(key)}:\n  ${formatValue(value)}`)
      .join('\n\n')

    const emailBody = `
═══════════════════════════════════════════════════════════
  ${typeLabel.toUpperCase()}
  Solicitud desde la Web — Ecotaxi Bolivia
═══════════════════════════════════════════════════════════

Fecha: ${submittedAt}
Página de origen: ${page}

───────────────────────────────────────────────────────────
  DATOS DEL FORMULARIO
───────────────────────────────────────────────────────────

${fieldLines}

───────────────────────────────────────────────────────────
  Fin del mensaje
───────────────────────────────────────────────────────────

Este mensaje fue enviado automáticamente desde el formulario
de contacto del sitio web ecotaxi.com.bo
`.trim()

    // Configure SMTP transporter (same env vars as mudanza API)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASS || '',
      },
    })

    // Extract reply-to from common email fields if present
    const replyTo =
      (typeof fields.email === 'string' && fields.email) ||
      (typeof fields.correo === 'string' && fields.correo) ||
      (typeof fields.emailContacto === 'string' && fields.emailContacto) ||
      undefined

    // Send email
    try {
      await transporter.sendMail({
        from: process.env.SMTP_USER || 'noreply@ecotaxi.com.bo',
        to: RECIPIENT,
        subject,
        text: emailBody,
        replyTo,
      })
    } catch (emailError) {
      console.error('[/api/contact] Email sending failed:', emailError)
      // Surface a clear error so the frontend can fall back to WhatsApp
      return NextResponse.json(
        {
          success: false,
          error: 'No se pudo enviar el correo. Intente por WhatsApp.',
          fallbackWhatsapp: true,
        },
        { status: 502 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Solicitud enviada correctamente a Ecotaxi',
    })
  } catch (error) {
    console.error('[/api/contact] Error processing submission:', error)
    return NextResponse.json(
      { success: false, error: 'Error al procesar la solicitud' },
      { status: 500 }
    )
  }
}

/** GET — health check */
export async function GET() {
  return NextResponse.json({
    ok: true,
    endpoint: '/api/contact',
    recipient: RECIPIENT,
    supportedTypes: Object.keys(TYPE_LABELS),
  })
}
