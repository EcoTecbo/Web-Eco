'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { ArrowRight, Shield, Clock, DollarSign, Users, Smartphone, Star, ChevronRight, CheckCircle2, Languages, Maximize2, Minimize2 } from 'lucide-react'

const languages = [
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
  { code: 'qu', label: 'Quechua', flag: '🇧🇴' },
  { code: 'ay', label: 'Aymara', flag: '🇧🇴' },
  { code: 'zh-CN', label: '中文', flag: '🇨🇳' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
]

export function ConductorSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [selectedLang, setSelectedLang] = useState('es')
  const [showLangMenu, setShowLangMenu] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const fullscreenRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const toggleFullscreen = useCallback(() => {
    if (!fullscreenRef.current) return
    if (!document.fullscreenElement) {
      fullscreenRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true)
      }).catch(() => {
        window.open('https://id3251.tm.taxi:48443/?cid=1', '_blank')
      })
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false)
      })
    }
  }, [])

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  const getTranslatedUrl = () => {
    const baseUrl = 'https://id3251.tm.taxi:48443/?cid=1'
    if (selectedLang === 'es') return baseUrl
    return `https://translate.google.com/translate?sl=es&tl=${selectedLang}&u=${encodeURIComponent(baseUrl)}`
  }

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
        style={{ background: 'radial-gradient(circle, #00E676 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 mb-4">
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
                        <CheckCircle2 className="w-3 h-3 text-[#00E676]" />
                      </div>
                      <span className="text-sm text-white/60">{req}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://play.google.com/store/apps/details?id=taxi.id3251&pcampaignid=web_share"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all duration-300 shadow-[0_0_20px_rgba(0,230,118,0.3)] hover:shadow-[0_0_35px_rgba(0,230,118,0.5)]"
                  >
                    <Smartphone className="w-5 h-5" />
                    Descargar App Conductor
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="#conductores-form"
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

        {/* ─── Registration Form Iframe with Translation ─── */}
        <div
          id="conductores-form"
          ref={fullscreenRef}
          className={`mt-4 max-w-4xl mx-auto transition-all duration-1000 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          } ${isFullscreen ? 'bg-[#0a0e17] p-4' : ''}`}
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 mb-4">
              <Shield className="w-4 h-4 text-[#00E676]" />
              <span className="text-sm text-[#00E676] font-medium">Registro Seguro</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Formulario de{' '}
              <span className="bg-gradient-to-r from-[#00E676] to-[#0077BD] bg-clip-text text-transparent">
                Registro
              </span>
            </h3>
            <p className="text-white/50 max-w-xl mx-auto">
              Completa el formulario de registro para conductores y comienza a generar ingresos con Ecotaxi.
            </p>
          </div>

          <div className="relative p-1 rounded-3xl bg-gradient-to-r from-[#00E676]/40 via-[#71B124]/30 to-[#0077BD]/40">
            <div className="rounded-[22px] overflow-hidden bg-[#0a0e17]">
              {/* Toolbar with Language Selector and Fullscreen */}
              <div className="flex items-center justify-between px-4 sm:px-6 pt-4 sm:pt-5">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  <span className="text-xs text-white/20 ml-2 hidden sm:inline">Registro de Conductores</span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Language Selector */}
                  <div className="relative">
                    <button
                      onClick={() => setShowLangMenu(!showLangMenu)}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08] text-white/50 hover:text-white hover:bg-white/[0.1] hover:border-white/20 transition-all duration-300 text-xs"
                    >
                      <Languages className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">
                        {languages.find(l => l.code === selectedLang)?.flag}{' '}
                        {languages.find(l => l.code === selectedLang)?.label}
                      </span>
                      <span className="sm:hidden">
                        {languages.find(l => l.code === selectedLang)?.flag}
                      </span>
                    </button>

                    {showLangMenu && (
                      <div className="absolute right-0 top-full mt-2 w-48 rounded-xl bg-[#0d1320]/95 backdrop-blur-xl border border-white/[0.08] shadow-xl shadow-black/30 overflow-hidden z-50">
                        <div className="px-3 py-2 border-b border-white/[0.06]">
                          <p className="text-[10px] text-white/30 uppercase tracking-wider">Traducir formulario</p>
                        </div>
                        {languages.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => {
                              setSelectedLang(lang.code)
                              setShowLangMenu(false)
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-200 ${
                              selectedLang === lang.code
                                ? 'text-[#00E676] bg-[#00E676]/5'
                                : 'text-white/70 hover:text-white hover:bg-white/5'
                            }`}
                          >
                            <span className="text-base">{lang.flag}</span>
                            <span>{lang.label}</span>
                            {selectedLang === lang.code && (
                              <CheckCircle2 className="w-3.5 h-3.5 ml-auto text-[#00E676]" />
                            )}
                          </button>
                        ))}
                        <div className="px-3 py-2 border-t border-white/[0.06]">
                          <p className="text-[9px] text-white/20 leading-relaxed">Traducción automática vía Google Translate</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Fullscreen Button */}
                  <button
                    onClick={toggleFullscreen}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08] text-white/50 hover:text-white hover:bg-white/[0.1] hover:border-white/20 transition-all duration-300 text-xs"
                    title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
                  >
                    {isFullscreen ? (
                      <>
                        <Minimize2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Reducir</span>
                      </>
                    ) : (
                      <>
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Pantalla completa</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Iframe */}
              <div className="p-4 sm:p-6 pt-3">
                <iframe
                  key={selectedLang}
                  src={getTranslatedUrl()}
                  title="Registro de Conductores Ecotaxi"
                  className={`w-full rounded-2xl border-0 bg-white/5 ${
                    isFullscreen ? 'h-[calc(100vh-120px)]' : 'h-[700px] sm:h-[800px]'
                  }`}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className={`mt-16 transition-all duration-700 ${
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
