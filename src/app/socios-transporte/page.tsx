import type { Metadata } from 'next'
import { Truck, Handshake, TrendingUp, Shield, BarChart3, Headphones, CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Socios de Transporte | Ecotaxi Bolivia',
  description: 'Conviértete en socio de transporte de Ecotaxi Bolivia. Alianzas estratégicas, tecnología de punta y crecimiento conjunto.',
}

export default function SociosTransportePage() {
  const benefits = [
    { icon: Handshake, title: 'Alianza Estratégica', desc: 'Establece una relación comercial duradera con Ecotaxi, accediendo a un flujo constante de clientes y oportunidades de negocio.' },
    { icon: TrendingUp, title: 'Crecimiento Conjunto', desc: 'Programas de incentivos y bonificaciones que premian tu rendimiento. Crece junto a la red de transporte más grande de Bolivia.' },
    { icon: Truck, title: 'Flota Diversificada', desc: 'Incorpora vehículos de distintas categorías: autos, camionetas, vans, buses y maquinaria especializada según tu capacidad.' },
    { icon: Shield, title: 'Respaldo Legal', desc: 'Contratos claros, seguros actualizados y cumplimiento normativo completo para operar con total tranquilidad y seguridad jurídica.' },
    { icon: BarChart3, title: 'Tecnología y Datos', desc: 'Acceso a nuestra plataforma de gestión con métricas en tiempo real, reportes de rendimiento y herramientas de análisis.' },
    { icon: Headphones, title: 'Soporte Dedicado', desc: 'Gerente de cuenta asignado para atender tus necesidades, resolver incidencias y optimizar tu operación diaria.' },
  ]

  const steps = [
    { step: '01', title: 'Contacto Inicial', desc: 'Comunícate con nosotros para evaluar tu perfil y capacidad de transporte disponible.' },
    { step: '02', title: 'Evaluación', desc: 'Revisamos tu flota, documentación y cumplimiento de requisitos para asegurar la calidad del servicio.' },
    { step: '03', title: 'Formalización', desc: 'Firmamos el convenio de asociación, configuramos tu cuenta y capacitamos a tu equipo.' },
    { step: '04', title: 'Operación', desc: 'Comienzas a recibir viajes y a formar parte activa de la red de transporte Ecotaxi.' },
  ]

  return (
    <div className="min-h-screen bg-[#0a0e17]">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00E676]/5 via-transparent to-[#0077BD]/5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 mb-6">
              <Truck className="w-4 h-4 text-[#00E676]" />
              <span className="text-sm text-[#00E676]">Alianzas de Transporte</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Socios de{' '}
              <span className="bg-gradient-to-r from-[#00E676] to-[#0077BD] bg-clip-text text-transparent">
                Transporte
              </span>
            </h1>
            <p className="text-xl text-white/60 mb-8 leading-relaxed">
              Forma parte de nuestra red de transporte como socio estratégico. Ofrecemos tecnología, demanda constante y las mejores condiciones del mercado para que tu negocio crezca.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://wa.me/59173662803?text=Hola%2C%20me%20interesa%20ser%20socio%20de%20transporte%20Ecotaxi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg font-semibold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all duration-300 shadow-[0_0_25px_rgba(0,230,118,0.3)]"
              >
                Ser Socio
                <ArrowRight className="w-5 h-5" />
              </a>
              <Link
                href="/corporativo"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg font-semibold text-white border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300"
              >
                Servicios Corporativos
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
              Ventajas de ser{' '}
              <span className="text-[#00E676]">Socio de Transporte</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              Una alianza que beneficia a ambas partes con crecimiento sostenido y rentabilidad.
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

      {/* Steps */}
      <section className="py-20 bg-[#0d1320]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Proceso de{' '}
              <span className="text-[#00E676]">Afiliación</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              Un proceso sencillo y transparente para que comiences a operar rápidamente.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((item) => (
              <div key={item.step} className="relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <span className="text-5xl font-bold text-[#00E676]/10 absolute top-4 right-4">{item.step}</span>
                <h3 className="text-lg font-semibold text-white mb-2 relative z-10">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed relative z-10">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a
              href="https://wa.me/59173662803?text=Hola%2C%20quiero%20ser%20socio%20de%20transporte"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg font-semibold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all duration-300"
            >
              Comenzar Proceso
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
