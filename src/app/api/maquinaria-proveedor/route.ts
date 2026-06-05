import { NextResponse } from 'next/server'

/**
 * POST /api/maquinaria-proveedor
 * Accepts: Provider registration form data
 * Sends email to ecotaxi@oyc-sr.com (or logs in development)
 * Returns: Success confirmation
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.nombre || !body.telefono || !body.email) {
      return NextResponse.json(
        { error: 'Nombre, teléfono y email son requeridos' },
        { status: 400 }
      )
    }

    // Build email body
    const emailBody = [
      '🏗️ REGISTRO DE PROVEEDOR / MAQUINARIA - ECOTAXI BOLIVIA',
      '═══════════════════════════════════════════════',
      '',
      '👤 DATOS DEL PROVEEDOR',
      `Nombre / Representante: ${body.nombre}`,
      `Empresa: ${body.empresa || 'N/A'}`,
      `Cargo: ${body.cargo || 'N/A'}`,
      `Email: ${body.email}`,
      `Teléfono: ${body.telefono}`,
      `Ciudad / Zona de cobertura: ${body.ciudad || 'N/A'}`,
      '',
      '🔧 MAQUINARIA DISPONIBLE',
      `Tipo(s) de maquinaria: ${body.tiposMaquinaria || 'N/A'}`,
      `Cantidad de equipos: ${body.cantidadEquipos || 'N/A'}`,
      `Marca(s) / Modelo(s): ${body.marcas || 'N/A'}`,
      `Operadores incluidos: ${body.operadores || 'N/A'}`,
      '',
      '📋 INFORMACIÓN ADICIONAL',
      `Experiencia en el rubro: ${body.experiencia || 'N/A'}`,
      `Servicios que ofrece: ${body.servicios || 'N/A'}`,
      `Disponibilidad: ${body.disponibilidad || 'N/A'}`,
      `Mensaje adicional: ${body.mensaje || 'N/A'}`,
      '',
      `Fecha de registro: ${new Date().toLocaleString('es-BO', { timeZone: 'America/La_Paz' })}`,
    ].join('\n')

    // Log the submission (in production, this would send an email to ecotaxi@oyc-sr.com)
    console.log('═══ PROVEEDOR MAQUINARIA REGISTRATION ═══')
    console.log(emailBody)
    console.log('Destination email: ecotaxi@oyc-sr.com')
    console.log('══════════════════════════════════════════')

    // In production, integrate with an email service (Resend, SendGrid, Nodemailer, etc.)
    // Example:
    // await sendEmail({
    //   to: 'ecotaxi@oyc-sr.com',
    //   subject: `Nuevo Registro de Proveedor: ${body.empresa || body.nombre}`,
    //   text: emailBody,
    // })

    return NextResponse.json({
      success: true,
      message: 'Registro de proveedor recibido correctamente. Nos pondremos en contacto pronto.',
      submission: {
        nombre: body.nombre,
        empresa: body.empresa,
        email: body.email,
        timestamp: new Date().toISOString(),
      }
    })
  } catch (error) {
    console.error('Error processing provider registration:', error)
    return NextResponse.json(
      { error: 'Error al procesar el registro' },
      { status: 500 }
    )
  }
}
