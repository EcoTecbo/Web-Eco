'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Shield, Clock, DollarSign, Users, Smartphone, Star, ChevronRight } from 'lucide-react'

export function ConductorSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const benefits = [
    {
      icon: DollarSign,
      title: 'Gana Dinero',
      description: 'Genera ingresos conduciendo tu propio horario. Mientras más viajes, más ganas.',
      color: '#00E676',
    },
    {
      icon: Clock,
      title: 'Horario Flexible',
      description: 'Tú decides cuándo y dónde conducir. Sin jefes, sin horarios fijos, total libertad.',
      color: '#0077BD',
    },
    {
      icon: Shield,
      title: 'Seguridad Total',
      description: 'Sistema de verificación de pasajeros, botón de emergencia y seguro de viaje.',
      color: '#FF9800',
    },
    {
      icon: Smartphone,
      title: 'App Conductores',
      description: 'Aplicación exclusiva con navegación GPS, gestión de viajes y pagos automáticos.',
      color: '#8B5CF6',
    },
  ]

  const stats = [
    { value: '5,000+', label: 'Conductores Activos' },
    { value: '24/7', label: 'Soporte Técnico' },
    { value: '95%', label: 'Satisfacción' },
    { value: 'Bolivia', label: 'Cobertura Nacional' },
  ]

  const testimonials = [
    {
      name: 'Carlos M.',
      role: 'Conductor desde 2022',
      text: 'Ecotaxi me permitió tener un ingreso estable y flexible. La app es muy fácil de usar.',
      rating: 5,
    },
    {
      name: 'Rosa L.',
      role: 'Conductora desde 2023',
      text: 'Me encanta la seguridad que brinda la plataforma. Me siento protegida en cada viaje.',
      rating: 5,
    },
    {
      name: 'Miguel T.',
      role: 'Conductor desde 2021',
      text: 'El mejor sistema de pagos. Siempre recibo mis ganancias a tiempo y sin complicaciones.',
      rating: 5,
    },
  ]

  return (
    <section id="conductores" ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1525] to-[#0a0e17]" />

      {/* Animated steering wheel glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.03]"
        style={{ background: 'radial-gradient(circle, #00E676 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 mb-4">
            {/* Animated Steering Wheel SVG */}
            <svg className="w-5 h-5 text-[#00E676] animate-spin" style={{ animationDuration: '8s' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="3" />
              <line x1="12" y1="2" x2="12" y2="9" />
              <line x1="12" y1="15" x2="12" y2="22" />
              <line x1="2" y1="12" x2="9" y2="12" />
              <line x1="15" y1="12" x2="22" y2="12" />
            </svg>
            <span className="text-sm text-[#00E676]">Únete Como Conductor</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Conduce y{' '}
            <span className="bg-gradient-to-r from-[#00E676] to-[#0077BD] bg-clip-text text-transparent">
              Gana Dinero
            </span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            Únete a la flota más grande de Bolivia. Flexible, seguro y rentable. Conduce cuando quieras, gana lo que necesites.
          </p>
        </div>

        {/* Stats Bar */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '100ms' }}>
          {stats.map((stat) => (
            <div key={stat.label} className="text-center p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#00E676] to-[#0077BD] bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-white/40 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Main Content - Two Column */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left - Benefits */}
          <div className={`space-y-5 transition-all duration-700 ${
            visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`} style={{ transitionDelay: '200ms' }}>
            {benefits.map((benefit, i) => (
              <div
                key={benefit.title}
                className="group flex gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300 hover:bg-white/[0.05]"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: `${benefit.color}15` }}>
                  <benefit.icon className="w-6 h-6" style={{ color: benefit.color }} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">{benefit.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right - CTA Card */}
          <div className={`transition-all duration-700 ${
            visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`} style={{ transitionDelay: '300ms' }}>
            <div className="relative p-8 md:p-10 rounded-3xl bg-gradient-to-br from-[#0077BD]/20 to-[#00E676]/10 border border-[#00E676]/20 overflow-hidden">
              {/* Decorative circles */}
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#00E676]/5" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-[#0077BD]/5" />

              <div className="relative z-10">
                {/* Steering wheel icon large */}
                <div className="w-20 h-20 rounded-2xl bg-[#00E676]/10 border border-[#00E676]/20 flex items-center justify-center mb-6 mx-auto lg:mx-0">
                  <svg className="w-10 h-10 text-[#00E676] animate-spin" style={{ animationDuration: '8s' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="3" />
                    <line x1="12" y1="2" x2="12" y2="9" />
                    <line x1="12" y1="15" x2="12" y2="22" />
                    <line x1="2" y1="12" x2="9" y2="12" />
                    <line x1="15" y1="12" x2="22" y2="12" />
                  </svg>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 text-center lg:text-left">
                  ¿Listo para conducir?
                </h3>
                <p className="text-white/50 mb-6 leading-relaxed text-center lg:text-left">
                  Regístrate como conductor de Ecotaxi y comienza a generar ingresos hoy mismo. Solo necesitas tu licencia, un vehículo en buen estado y ganas de crecer.
                </p>

                {/* Requirements list */}
                <div className="space-y-3 mb-8">
                  {['Licencia de conducir vigente', 'Vehículo en buen estado', 'Documento de identidad', 'Cuenta bancaria activa'].map((req) => (
                    <div key={req} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#00E676]/20 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-[#00E676]" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-sm text-white/60">{req}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://play.google.com/store"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all duration-300 shadow-[0_0_20px_rgba(0,230,118,0.3)] hover:shadow-[0_0_35px_rgba(0,230,118,0.5)]"
                  >
                    <Smartphone className="w-5 h-5" />
                    Descargar App Conductores
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="https://id3251.tm.taxi:58443/?cid=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-white bg-white/[0.06] border border-white/[0.12] hover:bg-white/[0.1] transition-all duration-300"
                  >
                    Regístrate Aquí
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className={`transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '400ms' }}>
          <div className="text-center mb-8">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
              Lo que dicen nuestros{' '}
              <span className="text-[#00E676]">conductores</span>
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300">
                {/* Stars */}
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-white/50 leading-relaxed mb-4">&ldquo;{testimonial.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0077BD]/20 flex items-center justify-center">
                    <Users className="w-5 h-5 text-[#0077BD]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{testimonial.name}</p>
                    <p className="text-xs text-white/30">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
