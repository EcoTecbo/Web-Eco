import type { Metadata } from 'next'
import { CalendarDays, Users, Globe, Award, Bus, Mic2, CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Eventos y Congresos | Ecotaxi Bolivia',
  description: 'Transporte profesional para eventos y congresos en Bolivia. Logística integral, flota dedicada y coordinación perfecta.',
}

export default function EventosYCongresosPage() {
  const benefits = [
    { icon: CalendarDays, title: 'Planificación Completa', desc: 'Diseñamos la logística de transporte completa para tu evento o congreso, desde la recepción de invitados hasta los traslados finales.' },
    { icon: Users, title: 'Gestión de Asistentes', desc: 'Control de llegadas y salidas con listas de pasajeros actualizadas en tiempo real, asegurando que nadie se quede sin transporte.' },
    { icon: Bus, title: 'Flota Variada', desc: 'Desde autos ejecutivos hasta buses de gran capacidad. Disponemos de la flota más diversa para cubrir cualquier necesidad de traslado.' },
    { icon: Globe, title: 'Traslados Internacionales', desc: 'Coordinamos traslados desde aeropuertos y fronteras para congresos con participantes internacionales, con servicio bilingüe.' },
    { icon: Award, title: 'Servicio Diferenciado', desc: 'Categorías de servicio para cada tipo de asistente: VIP, ejecutivo y estándar, con la calidad que tu evento merece.' },
    { icon: Mic2, title: 'Experiencia Comprobada', desc: 'Más de 100 eventos y congresos atendidos exitosamente en Bolivia, con referencias de organizadores satisfechos.' },
  ]

  const services = [
    'Recepción en aeropuerto con carteles personalizados',
    'Traslados hotel-sede-hotel programados',
    'Transporte para cenas y actividades complementarias',
    'Circuitos turísticos para acompañantes',
    'Vehículos de apoyo y contingencia',
    'Coordinación en tiempo real con organizadores',
    'Reportes post-evento de operación',
    'Facturación consolidada corporativa',
  ]

  return (
    <div className="min-h-screen bg-[#0a0e17]">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00E676]/5 via-transparent to-[#0077BD]/5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 mb-6">
              <CalendarDays className="w-4 h-4 text-[#00E676]" />
              <span className="text-sm text-[#00E676]">Transporte para Eventos y Congresos</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Eventos y{' '}
              <span className="bg-gradient-to-r from-[#00E676] to-[#0077BD] bg-clip-text text-transparent">
                Congresos
              </span>
            </h1>
            <p className="text-xl text-white/60 mb-8 leading-relaxed">
              Logística de transporte profesional para eventos y congresos de cualquier escala. Nos encargamos de que cada asistente llegue a tiempo, seguro y con la mejor experiencia de traslado.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://wa.me/59173662803?text=Hola%2C%20necesito%20transporte%20para%20un%20congreso%20o%20evento"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg font-semibold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all duration-300 shadow-[0_0_25px_rgba(0,230,118,0.3)]"
              >
                Solicitar Propuesta
                <ArrowRight className="w-5 h-5" />
              </a>
              <Link
                href="/eventos"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg font-semibold text-white border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300"
              >
                Eventos Sociales
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
              Servicio{' '}
              <span className="text-[#00E676]">Integral</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              Una solución completa que cubre cada aspecto del transporte para tu evento o congreso.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="group p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-[#00E676]/30 hover:bg-white/[0.05] transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#00E676]/10 flex items-center justify-center mb-4 group-hover:bg-[#00E676]/20 transition-colors">
                  <benefit.icon className="w-6 h-6 text-[#00E676]" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 bg-[#0d1320]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Nuestros{' '}
                <span className="text-[#00E676]">Servicios Incluyen</span>
              </h2>
              <p className="text-white/50 text-lg mb-8 leading-relaxed">
                Cada detalle del transporte es cuidado para que tu evento se desarrolle sin contratiempos. Desde la planificación hasta la operación en campo.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {services.map((service) => (
                  <div key={service} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#00E676] shrink-0 mt-0.5" />
                    <span className="text-white/60 text-sm">{service}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
              <h3 className="text-2xl font-bold text-white mb-4">Solicita tu propuesta</h3>
              <p className="text-white/50 mb-6 leading-relaxed">
                Cuéntanos sobre tu evento o congreso y te prepararemos una propuesta personalizada con las mejores tarifas del mercado.
              </p>
              <a
                href="https://wa.me/59173662803?text=Hola%2C%20quiero%20cotizar%20transporte%20para%20mi%20congreso"
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
