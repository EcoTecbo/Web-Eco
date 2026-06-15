import type { Metadata } from 'next'
import { Briefcase, Globe, Percent, BadgeCheck, Megaphone, HeartHandshake, CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Afiliados - Socio de Servicios | Ecotaxi Bolivia',
  description: 'Programa de afiliados de Ecotaxi Bolivia. Genera ingresos recomendando servicios de transporte de calidad.',
}

export default function SocioDeServiciosPage() {
  const benefits = [
    { icon: Percent, title: 'Comisiones Atractivas', desc: 'Gana por cada viaje o servicio referido. Sistema de comisiones escalonado que premia tu volumen de referencias con tasas cada vez más altas.' },
    { icon: Globe, title: 'Sin Límites Geográficos', desc: 'Refiere clientes desde cualquier lugar de Bolivia o del mundo. Nuestro programa funciona en todas las ciudades donde operamos.' },
    { icon: Megaphone, title: 'Material Promocional', desc: 'Acceso a contenido gráfico, enlaces personalizados y herramientas de difusión profesionales para maximizar tus referencias.' },
    { icon: BadgeCheck, title: 'Registro Transparente', desc: 'Panel de control donde ves en tiempo real tus referencias, comisiones generadas y pagos pendientes de forma clara.' },
    { icon: Briefcase, title: 'Para Todo Tipo de Perfil', desc: 'Ya seas agencia de viajes, hotel, empresa, emprendedor o persona independiente, el programa se adapta a tu actividad.' },
    { icon: HeartHandshake, title: 'Servicio de Calidad', desc: 'Recomiendas un servicio de primer nivel con respaldo empresarial, lo que fortalece tu relación con los clientes referidos.' },
  ]

  const affiliateTypes = [
    { type: 'Agencias de Viaje', desc: 'Ofrece transporte a tus clientes y gana comisiones por cada reserva.' },
    { type: 'Hoteles y Alojamientos', desc: 'Facilita traslados a tus huéspedes mientras generas ingresos adicionales.' },
    { type: 'Empresas y Corporativos', desc: 'Beneficia a tu equipo con transporte confiable y obtén recompensas.' },
    { type: 'Independientes', desc: 'Cualquier persona puede referir y ganar sin requisitos de volumen mínimo.' },
  ]

  return (
    <div className="min-h-screen bg-[#0a0e17]">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0077BD]/5 via-transparent to-[#00E676]/5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0077BD]/10 border border-[#0077BD]/20 mb-6">
              <Briefcase className="w-4 h-4 text-[#0077BD]" />
              <span className="text-sm text-[#0077BD]">Programa de Afiliados</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Socio de{' '}
              <span className="bg-gradient-to-r from-[#0077BD] to-[#00E676] bg-clip-text text-transparent">
                Servicios
              </span>
            </h1>
            <p className="text-xl text-white/60 mb-8 leading-relaxed">
              Únete a nuestro programa de afiliados y genera ingresos recomendando el mejor servicio de transporte de Bolivia. Sin inversiones, sin riesgos, solo oportunidades.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://wa.me/59173662803?text=Hola%2C%20me%20interesa%20el%20programa%20de%20afiliados%20Ecotaxi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg font-semibold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all duration-300 shadow-[0_0_25px_rgba(0,230,118,0.3)]"
              >
                Ser Afiliado
                <ArrowRight className="w-5 h-5" />
              </a>
              <Link
                href="/agencias"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg font-semibold text-white border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300"
              >
                Agencias de Viaje
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
              ¿Por qué ser{' '}
              <span className="text-[#0077BD]">Afiliado Ecotaxi</span>?
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              Un programa diseñado para que ganes sin complicaciones, recomendando un servicio de calidad comprobada.
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

      {/* Affiliate Types */}
      <section className="py-20 bg-[#0d1320]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Tipos de{' '}
              <span className="text-[#0077BD]">Afiliados</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {affiliateTypes.map((item) => (
              <div key={item.type} className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-[#0077BD] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">{item.type}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <a
              href="https://wa.me/59173662803?text=Hola%2C%20quiero%20ser%20afiliado%20de%20Ecotaxi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg font-semibold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all duration-300"
            >
              Registrarme como Afiliado
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
