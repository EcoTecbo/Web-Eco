import type { Metadata } from 'next'
import { Car, Users, Shield, DollarSign, Clock, Headphones, CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Conductores - Sé Socio de Transporte | Ecotaxi Bolivia',
  description: 'Únete como conductor a la red de transporte de Ecotaxi Bolivia. Flexibilidad, ingresos garantizados y respaldo profesional.',
}

export default function SocioDeTransportePage() {
  const benefits = [
    { icon: DollarSign, title: 'Ingresos Garantizados', desc: 'Tarifas competitivas con pagos semanales y bonificaciones por desempeño. Gana más con nuestro sistema de incentivos.' },
    { icon: Clock, title: 'Horario Flexible', desc: 'Tú decides cuándo y cuánto trabajar. Sin horarios fijos, con la libertad de gestionar tu tiempo como prefieras.' },
    { icon: Shield, title: 'Seguridad Integral', desc: 'Seguro de vehículo y personal, botón de emergencia en la app, y monitoreo GPS las 24 horas para tu tranquilidad.' },
    { icon: Headphones, title: 'Soporte 24/7', desc: 'Equipo de soporte disponible en todo momento para resolver cualquier inconveniente o consulta que tengas.' },
    { icon: Car, title: 'Vehículo Propio o de Flota', desc: 'Puedes trabajar con tu propio vehículo o acceder a nuestra flota con planes de financiamiento accesibles.' },
    { icon: Users, title: 'Comunidad de Conductores', desc: 'Forma parte de una comunidad activa con capacitaciones, eventos y beneficios exclusivos para socios.' },
  ]

  const requirements = [
    'Licencia de conducir vigente',
    'Certificado de antecedentes penales',
    'Vehículo en buen estado mecánico',
    'Seguro obligatorio vigente',
    'Dispositivo smartphone con datos',
    'Disponibilidad mínima de 20 horas semanales',
  ]

  return (
    <div className="min-h-screen bg-[#0a0e17]">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00E676]/5 via-transparent to-[#0077BD]/5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 mb-6">
              <Car className="w-4 h-4 text-[#00E676]" />
              <span className="text-sm text-[#00E676]">Únete como Conductor</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
              Sé Socio de{' '}
              <span className="bg-gradient-to-r from-[#00E676] to-[#0077BD] bg-clip-text text-transparent">
                Transporte
              </span>
            </h1>
            <p className="text-base md:text-lg text-white/60 mb-6 md:mb-8 leading-relaxed">
              Forma parte de la primera empresa de transporte en Bolivia con plan de neutralización de CO2. Conduce con respaldo profesional, tecnología de punta e ingresos que crecen con tu esfuerzo.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://wa.me/59173662803?text=Hola%2C%20me%20interesa%20ser%20conductor%20de%20Ecotaxi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm md:text-base font-semibold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all duration-300 shadow-[0_0_25px_rgba(0,230,118,0.3)] hover:shadow-[0_0_35px_rgba(0,230,118,0.5)]"
              >
                Aplicar Ahora
                <ArrowRight className="w-5 h-5" />
              </a>
              <Link
                href="/#flota"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm md:text-base font-semibold text-white border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300"
              >
                Ver Nuestra Flota
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Beneficios de ser{' '}
              <span className="text-[#00E676]">Conductor Ecotaxi</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-sm md:text-base">
              Más que un trabajo, una oportunidad de crecimiento profesional con el respaldo de una empresa líder.
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

      {/* Requirements */}
      <section className="py-20 bg-[#0d1320]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">
                Requisitos para{' '}
                <span className="text-[#00E676]">Inscribirte</span>
              </h2>
              <p className="text-white/50 text-sm md:text-base mb-6 md:mb-8 leading-relaxed">
                El proceso de registro es sencillo y rápido. Solo necesitas cumplir con los siguientes requisitos básicos para formar parte de nuestra red de conductores profesionales.
              </p>
              <div className="space-y-4">
                {requirements.map((req) => (
                  <div key={req} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#00E676] shrink-0" />
                    <span className="text-white/70">{req}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
              <h3 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4">¿Listo para empezar?</h3>
              <p className="text-white/50 mb-6 leading-relaxed">
                Completa tu registro y en menos de 48 horas podrás estar rodando con Ecotaxi. Nuestro equipo te guiará en cada paso del proceso.
              </p>
              <a
                href="https://wa.me/59173662803?text=Hola%2C%20quiero%20registrarme%20como%20conductor%20Ecotaxi"
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
