import type { Metadata } from 'next'
import { Calendar, Users, MapPin, Star, Clock, CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Organizadores de Eventos | Ecotaxi Bolivia',
  description: 'Soluciones de transporte para organizadores de eventos. Coordinación logística, flota dedicada y servicio profesional para tu evento.',
}

export default function OrganizadoresEventosPage() {
  const benefits = [
    { icon: Calendar, title: 'Coordinación Total', desc: 'Gestión integral del transporte para tu evento. Desde la planificación hasta la ejecución, nos encargamos de toda la logística de traslados.' },
    { icon: Users, title: 'Flota Dedicada', desc: 'Vehículos exclusivos asignados a tu evento con conductores profesionales que conocen las rutas y horarios al detalle.' },
    { icon: MapPin, title: 'Cobertura Nacional', desc: 'Servicio disponible en las principales ciudades de Bolivia con conocimiento local de rutas, hoteles y centros de eventos.' },
    { icon: Star, title: 'Servicio Premium', desc: 'Opciones VIP para invitados especiales con vehículos de alta gama, recepción personalizada y atención diferenciada.' },
    { icon: Clock, title: 'Puntualidad Garantizada', desc: 'Monitoreo en tiempo real y ajustes de ruta para asegurar que todos tus invitados lleguen a tiempo sin contratiempos.' },
    { icon: CheckCircle, title: 'Facturación Corporativa', desc: 'Facturación unificada, reportes detallados y consolidados mensuales para un control financiero transparente.' },
  ]

  const eventTypes = [
    'Congresos y convenciones',
    'Bodas y celebraciones',
    'Eventos corporativos',
    'Feria y exposiciones',
    'Conciertos y festivales',
    'Torneos deportivos',
  ]

  return (
    <div className="min-h-screen bg-[#0a0e17]">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0077BD]/5 via-transparent to-[#00E676]/5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0077BD]/10 border border-[#0077BD]/20 mb-6">
              <Calendar className="w-4 h-4 text-[#0077BD]" />
              <span className="text-sm text-[#0077BD]">Transporte para Eventos</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Organizadores de{' '}
              <span className="bg-gradient-to-r from-[#0077BD] to-[#00E676] bg-clip-text text-transparent">
                Eventos
              </span>
            </h1>
            <p className="text-xl text-white/60 mb-8 leading-relaxed">
              Soluciones de transporte profesionales para cada tipo de evento. Coordinamos la logística completa de traslados para que tú te enfoques en lo importante: el éxito de tu evento.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://wa.me/59173662803?text=Hola%2C%20necesito%20transporte%20para%20un%20evento"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg font-semibold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all duration-300 shadow-[0_0_25px_rgba(0,230,118,0.3)]"
              >
                Solicitar Cotización
                <ArrowRight className="w-5 h-5" />
              </a>
              <Link
                href="/bus"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg font-semibold text-white border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300"
              >
                Ver Flota de Buses
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Lo que ofrecemos a{' '}
              <span className="text-[#0077BD]">Organizadores</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              Un aliado estratégico en transporte que entiende las necesidades de cada evento.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="group p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-[#0077BD]/30 hover:bg-white/[0.05] transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0077BD]/10 flex items-center justify-center mb-4 group-hover:bg-[#0077BD]/20 transition-colors">
                  <benefit.icon className="w-6 h-6 text-[#0077BD]" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Types */}
      <section className="py-20 bg-[#0d1320]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Tipos de{' '}
                <span className="text-[#0077BD]">Eventos</span>
              </h2>
              <p className="text-white/50 text-lg mb-8 leading-relaxed">
                Cubrimos la logística de transporte para cualquier tipo de evento, desde conferencias íntimas hasta grandes festivales con miles de asistentes.
              </p>
              <div className="space-y-4">
                {eventTypes.map((type) => (
                  <div key={type} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#0077BD] shrink-0" />
                    <span className="text-white/70">{type}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
              <h3 className="text-2xl font-bold text-white mb-4">Cotiza tu evento</h3>
              <p className="text-white/50 mb-6 leading-relaxed">
                Cuéntanos sobre tu evento y te prepararemos una propuesta personalizada con la mejor tarifa del mercado.
              </p>
              <a
                href="https://wa.me/59173662803?text=Hola%2C%20quiero%20cotizar%20transporte%20para%20mi%20evento"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all duration-300"
              >
                Contactar por WhatsApp
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
