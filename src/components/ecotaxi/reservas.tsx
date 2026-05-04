'use client'

import { Globe, Maximize2, Minimize2, Languages, CheckCircle2, Clock, DollarSign, Users, Shield, Star, Smartphone, ArrowRight } from 'lucide-react'
import { useEffect, useRef, useState, useCallback } from 'react'

export function Reservas() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
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
        window.open('https://id3251.tm.taxi:58443/?cid=1', '_blank')
      })
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false)
      })
    }
  }, [])

  // Listen for fullscreen changes (including ESC key)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  // ESC key handler for fullscreen exit
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && document.fullscreenElement) {
        document.exitFullscreen().then(() => {
          setIsFullscreen(false)
        })
      }
    }
    document.addEventListener('keydown', handleEscKey)
    return () => document.removeEventListener('keydown', handleEscKey)
  }, [])

  return (
    <section id="reservas" ref={sectionRef} className="relative py-24 md:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#0077BD]/10 blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0077BD]/10 border border-[#0077BD]/20 mb-4">
            <Globe className="w-4 h-4 text-[#0077BD]" />
            <span className="text-sm text-[#0077BD]">Reserva Online</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Reserva Tu{' '}
            <span className="bg-gradient-to-r from-[#0077BD] to-[#00E676] bg-clip-text text-transparent">
              ECOTAXI
            </span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            Reserva tu taxi de forma rápida y segura. Elige tu punto de partida, destino y vehículo en segundos.
          </p>
        </div>

        {/* Iframe Container with Fullscreen */}
        <div
          ref={fullscreenRef}
          className={`relative max-w-4xl mx-auto transition-all duration-1000 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          } ${isFullscreen ? 'bg-[#0a0e17] p-4' : ''}`}
        >
          <div className="relative p-1 rounded-3xl bg-gradient-to-r from-[#0077BD]/50 via-[#00E676]/50 to-[#0077BD]/50">
            <div className="rounded-[22px] overflow-hidden bg-[#0a0e17]">
              {/* Toolbar */}
              <div className="flex items-center justify-between px-4 sm:px-6 pt-4 sm:pt-5">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  <span className="text-xs text-white/20 ml-2 hidden sm:inline">id3251.tm.taxi</span>
                </div>
                <div className="flex items-center gap-2">
                  {isFullscreen && (
                    <span className="text-xs text-white/30 hidden sm:inline">Presiona ESC para salir</span>
                  )}
                  <button
                    onClick={toggleFullscreen}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08] text-white/50 hover:text-white hover:bg-white/[0.1] hover:border-white/20 transition-all duration-300 text-xs"
                    title={isFullscreen ? 'Salir de pantalla completa (ESC)' : 'Pantalla completa'}
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
                  src="https://id3251.tm.taxi:58443/?cid=1"
                  title="Reservas Ecotaxi"
                  className={`w-full rounded-2xl border-0 bg-white/5 ${
                    isFullscreen ? 'h-[calc(100vh-120px)]' : 'h-[600px] sm:h-[700px]'
                  }`}
                  loading="lazy"
                  allow="geolocation"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   CONDUCTORES — Sección de registro y motivación para choferes
   ═══════════════════════════════════════════════════════════════════════════════ */
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

  const getTranslatedUrl = () => {
    const baseUrl = 'https://id3251.tm.taxi:48443/?cid=1'
    if (selectedLang === 'es') return baseUrl
    return `https://translate.google.com/translate?sl=es&tl=${selectedLang}&u=${encodeURIComponent(baseUrl)}`
  }

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

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && document.fullscreenElement) {
        document.exitFullscreen().then(() => {
          setIsFullscreen(false)
        })
      }
    }
    document.addEventListener('keydown', handleEscKey)
    return () => document.removeEventListener('keydown', handleEscKey)
  }, [])

  return (
    <section id="conductores" ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d1320] via-[#0a0e17] to-[#0a0e17]" />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[700px] h-[700px] rounded-full bg-[#00E676]/8 blur-[160px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#0077BD]/8 blur-[140px] animate-pulse" style={{ animationDelay: '1.5s' }} />

      {/* Road pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,230,118,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,230,118,0.4) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Banner */}
        <div className={`text-center mb-16 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Steering Wheel Icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 w-32 h-32 rounded-full bg-[#00E676]/10 blur-[30px] animate-pulse" />
              <svg viewBox="0 0 120 120" className="w-28 h-28 md:w-32 md:h-32 relative z-10" fill="none">
                <circle cx="60" cy="60" r="52" stroke="#00E676" strokeWidth="6" opacity="0.8" />
                <circle cx="60" cy="60" r="22" stroke="#0077BD" strokeWidth="4" opacity="0.6" />
                <line x1="60" y1="8" x2="60" y2="38" stroke="#00E676" strokeWidth="5" strokeLinecap="round" opacity="0.7" />
                <line x1="15" y1="82" x2="41" y2="67" stroke="#0077BD" strokeWidth="5" strokeLinecap="round" opacity="0.7" />
                <line x1="105" y1="82" x2="79" y2="67" stroke="#71B124" strokeWidth="5" strokeLinecap="round" opacity="0.7" />
                <circle cx="60" cy="60" r="10" fill="#00E676" opacity="0.3" />
                <circle cx="60" cy="60" r="5" fill="#00E676" opacity="0.6" />
              </svg>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 mb-6">
            <Users className="w-4 h-4 text-[#00E676]" />
            <span className="text-sm text-[#00E676] font-medium">Se Parte del Equipo</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Conduce con{' '}
            <span className="bg-gradient-to-r from-[#00E676] via-[#71B124] to-[#00E676] bg-clip-text text-transparent">
              Ecotaxi
            </span>
          </h2>

          <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed mb-4">
            Genera ingresos en tu tiempo libre o convierte la conducción en tu actividad principal.
            Únete a la red de transportes más grande e innovadora de Bolivia y toma el control de tu economía.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16 transition-all duration-1000 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: visible ? '200ms' : '0ms' }}>
          {[
            { icon: Clock, title: 'Tus Horarios, Tu Decisión', desc: 'Conduce cuando quieras y donde quieras. No hay jornadas obligatorias ni jefes que te digan cuándo trabajar. Tú pones las reglas de tu día.', color: '#00E676' },
            { icon: DollarSign, title: 'Ingresos Reales y Transparentes', desc: 'Cada viaje tiene una tarifa clara que puedes ver antes de aceptar. Sin sorpresas ni descuentos ocultos. Lo que generas es lo que te pertenece.', color: '#F59E0B' },
            { icon: Shield, title: 'Seguridad y Respaldo', desc: 'Viaja con la tranquilidad de estar respaldado por una empresa formal. Seguro del vehículo, monitoreo GPS 24/7 y botón de emergencia.', color: '#0077BD' },
            { icon: Star, title: 'Crece como Profesional', desc: 'Capacitaciones gratuitas, reconocimientos por buen servicio, y acceso a servicios premium como ejecutivo y transporte especial.', color: '#D4AF37' },
            { icon: Smartphone, title: 'Tecnología a tu Favor', desc: 'Nuestra APP de conductor tiene navegación GPS integrada, asignación automática de viajes e historial de ganancias en tiempo real.', color: '#8B5CF6' },
            { icon: Users, title: 'Comunidad Ecotaxi', desc: 'Forma parte de una red de cientos de conductores que comparten experiencias y construyen juntos el futuro del transporte en Bolivia.', color: '#71B124' },
          ].map((benefit, i) => (
            <div
              key={benefit.title}
              className="group relative p-6 md:p-7 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-white/15 transition-all duration-500 h-full"
              style={{ transitionDelay: visible ? `${i * 80}ms` : '0ms' }}
            >
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ boxShadow: `0 0 40px ${benefit.color}06` }}
              />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: `${benefit.color}12` }}
                >
                  <benefit.icon className="w-6 h-6" style={{ color: benefit.color }} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{benefit.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{benefit.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Registration Form Iframe with Translation & Fullscreen */}
        <div
          id="conductores-form"
          ref={fullscreenRef}
          className={`max-w-4xl mx-auto transition-all duration-1000 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          } ${isFullscreen ? 'bg-[#0a0e17] p-4' : ''}`}
          style={{ transitionDelay: visible ? '400ms' : '0ms' }}
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
                      </div>
                    )}
                  </div>
                  {/* Fullscreen Button */}
                  <button
                    onClick={toggleFullscreen}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08] text-white/50 hover:text-white hover:bg-white/[0.1] hover:border-white/20 transition-all duration-300 text-xs"
                    title={isFullscreen ? 'Salir de pantalla completa (ESC)' : 'Pantalla completa'}
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
              {isFullscreen && (
                <div className="text-center py-1">
                  <span className="text-xs text-white/20">Presiona ESC para salir de pantalla completa</span>
                </div>
              )}
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

        {/* Download App + Stats CTA */}
        <div className={`mt-12 max-w-4xl mx-auto transition-all duration-1000 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: visible ? '500ms' : '0ms' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <a
              href="https://play.google.com/store/apps/details?id=taxi.id3251&pcampaignid=web_share"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-5 rounded-2xl bg-white/[0.05] border border-[#00E676]/20 hover:border-[#00E676]/40 hover:bg-white/[0.08] transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-[#00E676]/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
                  <path d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12L3.84 21.85C3.34 21.6 3 21.09 3 20.5Z" fill="#4CAF50" />
                  <path d="M16.81 15.12L6.05 21.34L13.69 12L16.81 15.12Z" fill="#F44336" />
                  <path d="M20.16 10.81C20.5 11.08 20.75 11.5 20.75 12C20.75 12.5 20.5 12.92 20.16 13.19L17.89 14.5L14.5 12L17.89 9.5L20.16 10.81Z" fill="#FFC107" />
                  <path d="M6.05 2.66L16.81 8.88L13.69 12L6.05 2.66Z" fill="#2196F3" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-white/40 uppercase tracking-wider">Descarga en</p>
                <p className="text-lg font-bold text-white">Google Play</p>
                <p className="text-xs text-[#00E676]">APP de Conductor Ecotaxi</p>
              </div>
              <ArrowRight className="w-5 h-5 text-white/30 ml-auto group-hover:text-[#00E676] group-hover:translate-x-1 transition-all duration-300" />
            </a>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: '24/7', label: 'Disponibilidad', color: '#00E676' },
                { value: '100%', label: 'Flexibilidad', color: '#0077BD' },
                { value: '∞', label: 'Oportunidades', color: '#D4AF37' },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <div className="text-xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
                  <div className="text-[10px] text-white/35 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
