'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Building2, CreditCard, Wallet, Users, Phone, CheckCircle2,
  ArrowRight, Star, Shield, Clock, FileText, BarChart3,
  Truck, Globe, HeadphonesIcon, Hotel, Plane, Landmark,
  ChevronRight, ExternalLink, BadgeCheck, Settings
} from 'lucide-react'

/* ─── Stats Data ─── */
const corporateStats = [
  { value: '200+', label: 'Empresas confían', icon: Building2 },
  { value: '3', label: 'Modelos de pago', icon: CreditCard },
  { value: '24/7', label: 'Disponibilidad', icon: Clock },
  { value: '100%', label: 'Facturación corporativa', icon: FileText },
]

/* ─── Payment Plans ─── */
const paymentPlans = [
  {
    id: 'prepago',
    name: 'Prepago',
    subtitle: 'Créditos anticipados',
    icon: Wallet,
    desc: 'Compra créditos anticipados y utilízalos según tu necesidad. Ideal para empresas que quieren controlar su presupuesto de transporte con anticipación.',
    features: [
      'Compra de créditos por montos',
      'Control total del presupuesto',
      'Sin sorpresas en facturación',
      'Descuentos por volumen de compra',
      'Recarga automática opcional',
      'Reportes de saldo en tiempo real',
    ],
    color: '#0077BD',
    badge: 'Control Total',
    highlight: false,
  },
  {
    id: 'cash',
    name: 'Cash',
    subtitle: 'Pago por servicio',
    icon: CreditCard,
    desc: 'Paga solo por los servicios que utilizas. Sin compromisos de volumen, con la flexibilidad de usar el transporte corporativo cuando lo necesites.',
    features: [
      'Pago por servicio utilizado',
      'Sin compromiso de volumen',
      'Facturación mensual consolidada',
      'Flexibilidad total de uso',
      'Tarifas corporativas preferenciales',
      'Reportes detallados de consumo',
    ],
    color: '#00E676',
    badge: 'Más Popular',
    highlight: true,
  },
  {
    id: 'postpago',
    name: 'Post Pago',
    subtitle: 'Facturación mensual',
    icon: FileText,
    desc: 'Para grandes empresas con alto volumen de transporte. Facturación mensual consolidada con condiciones especiales de pago y tarifas preferenciales.',
    features: [
      'Facturación mensual consolidada',
      'Condiciones especiales de pago',
      'Tarifas preferenciales por volumen',
      'Línea de crédito corporativa',
      'Gestor de cuenta dedicado',
      'Reportes ejecutivos personalizados',
    ],
    color: '#FF9800',
    badge: 'Grandes Empresas',
    highlight: false,
  },
]

/* ─── Key Benefits ─── */
const keyBenefits = [
  {
    icon: FileText,
    title: 'Facturación Corporativa',
    desc: 'Facturas personalizadas con NIT, razón social y detalle completo de cada servicio para una contabilidad precisa.',
    color: '#0077BD',
  },
  {
    icon: BarChart3,
    title: 'Reportes Detallados',
    desc: 'Informes periódicos con desglose de servicios, rutas, horarios y costos para un control total del transporte.',
    color: '#00E676',
  },
  {
    icon: Settings,
    title: 'Gestión de Flota',
    desc: 'Administra las necesidades de transporte de toda tu organización desde una sola plataforma centralizada.',
    color: '#FF9800',
  },
  {
    icon: HeadphonesIcon,
    title: 'Atención 24/7',
    desc: 'Soporte permanente para urgencias, cambios de último momento y cualquier necesidad de transporte corporativo.',
    color: '#8B5CF6',
  },
  {
    icon: Shield,
    title: 'Seguridad Garantizada',
    desc: 'Conductores verificados, vehículos monitoreados en tiempo real y seguro de pasajeros en cada servicio.',
    color: '#E91E63',
  },
  {
    icon: Clock,
    title: 'Puntualidad Absoluta',
    desc: 'Compromiso de cumplimiento de horarios con monitoreo en tiempo real y notificaciones de estatus.',
    color: '#009688',
  },
]

/* ─── Target Clients ─── */
const targetClients = [
  {
    icon: Building2,
    title: 'Empresas',
    desc: 'Transporte ejecutivo para directivos, gerentes y colaboradores con la puntualidad y seguridad que tu empresa necesita.',
    color: '#0077BD',
  },
  {
    icon: Hotel,
    title: 'Hoteles',
    desc: 'Servicio de traslado para huéspedes con recogida en aeropuerto y traslados dentro de la ciudad, las 24 horas.',
    color: '#00E676',
  },
  {
    icon: Plane,
    title: 'Agencias de Viajes',
    desc: 'Transporte turístico y ejecutivo para tus clientes con la calidad y profesionalismo que exigen los viajeros internacionales.',
    color: '#FF9800',
  },
  {
    icon: Landmark,
    title: 'Embajadas',
    desc: 'Servicio discreto y seguro para personal diplomático, con los más altos estándares de seguridad y confidencialidad.',
    color: '#8B5CF6',
  },
]

export function CorporativoPage() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [visible, setVisible] = useState(false)
  const [animSections, setAnimSections] = useState<Record<string, boolean>>({})

  // Main page observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.05 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Section-by-section observer
  useEffect(() => {
    const sections = document.querySelectorAll('[data-animate-section]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-animate-section')
            if (id) {
              setAnimSections((prev) => ({ ...prev, [id]: true }))
            }
          }
        })
      },
      { threshold: 0.1 }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [visible])

  const selectedPlanData = paymentPlans.find((p) => p.id === selectedPlan)

  return (
    <div ref={sectionRef} className="min-h-screen bg-[#0a0e17] pt-20">

      {/* ═══ HERO ═══ */}
      <section className="relative py-16 md:py-28 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1830] to-[#0a0e17]" />
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full bg-[#0077BD]/10 blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#00E676]/5 blur-[100px]" />
        <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] rounded-full bg-[#0077BD]/5 blur-[80px]" />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-float"
              style={{
                left: `${10 + i * 16}%`,
                top: `${20 + (i % 3) * 22}%`,
                background: i % 2 === 0 ? '#0077BD' : '#00E676',
                opacity: 0.15,
                animationDelay: `${i * 1.1}s`,
                animationDuration: `${5 + i}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0077BD]/10 border border-[#0077BD]/20 mb-6">
            <Building2 className="w-4 h-4 text-[#0077BD]" />
            <span className="text-sm text-[#0077BD]">Servicio Corporativo</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
            Transporte{' '}
            <span className="bg-gradient-to-r from-[#0077BD] to-[#00E676] bg-clip-text text-transparent">
              Corporativo
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/50 max-w-3xl mx-auto mb-8 leading-relaxed">
            Soluciones de transporte profesional para empresas, hoteles, agencias de viajes y embajadas.
            Tres modelos de pago flexibles, facturación corporativa y gestión centralizada de tu flota de transporte.
          </p>

          {/* Key Features */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {[
              { icon: FileText, text: 'Facturación corporativa', color: '#0077BD' },
              { icon: CreditCard, text: '3 modelos de pago', color: '#00E676' },
              { icon: Shield, text: 'Seguridad garantizada', color: '#FF9800' },
              { icon: Clock, text: 'Disponibilidad 24/7', color: '#8B5CF6' },
            ].map((feat) => (
              <div key={feat.text} className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.06]">
                <feat.icon className="w-4 h-4" style={{ color: feat.color }} />
                <span className="text-sm text-white/60">{feat.text}</span>
              </div>
            ))}
          </div>

          {/* Animated Scene SVG */}
          <div className="max-w-3xl mx-auto mb-6">
            <svg viewBox="0 0 800 180" className="w-full">
              {/* Road */}
              <rect x="0" y="150" width="800" height="4" fill="#0077BD" opacity="0.2" rx="2" />
              {[40, 140, 240, 340, 440, 540, 640, 740].map((x) => (
                <rect key={x} x={x} y="151" width="30" height="2" fill="#0077BD" opacity="0.1" rx="1" />
              ))}

              {/* Executive Sedan */}
              <g>
                <rect x="160" y="118" width="65" height="26" rx="8" fill="#1a1a2e" stroke="#0077BD" strokeWidth="0.8" />
                <rect x="164" y="122" width="15" height="11" rx="2" fill="#0077BD" opacity="0.3" />
                <rect x="183" y="122" width="18" height="11" rx="2" fill="#0077BD" opacity="0.2" />
                <rect x="205" y="122" width="14" height="11" rx="2" fill="#0077BD" opacity="0.3" />
                <circle cx="174" cy="146" r="5" fill="#222" stroke="#0077BD" strokeWidth="0.5" />
                <circle cx="212" cy="146" r="5" fill="#222" stroke="#0077BD" strokeWidth="0.5" />
                {/* Corporate glow */}
                <rect x="160" y="115" width="65" height="2" rx="1" fill="#0077BD" opacity="0.3">
                  <animate attributeName="opacity" values="0.2;0.5;0.2" dur="2s" repeatCount="indefinite" />
                </rect>
              </g>

              {/* Corporate Van */}
              <g>
                <rect x="330" y="110" width="85" height="34" rx="6" fill="#1a1a2e" stroke="#00E676" strokeWidth="0.8" />
                {[0, 1, 2, 3].map((i) => (
                  <rect key={i} x={338 + i * 18} y="115" width="13" height="10" rx="2" fill="#00E676" opacity="0.2" />
                ))}
                <circle cx="350" cy="146" r="5" fill="#222" stroke="#00E676" strokeWidth="0.5" />
                <circle cx="396" cy="146" r="5" fill="#222" stroke="#00E676" strokeWidth="0.5" />
                <text x="372" y="137" textAnchor="middle" fill="#00E676" fontSize="7" opacity="0.4">CORP</text>
              </g>

              {/* Executive SUV */}
              <g>
                <rect x="510" y="112" width="70" height="30" rx="8" fill="#1a1a2e" stroke="#FF9800" strokeWidth="0.8" />
                <rect x="514" y="116" width="16" height="12" rx="2" fill="#FF9800" opacity="0.25" />
                <rect x="534" y="116" width="18" height="12" rx="2" fill="#FF9800" opacity="0.15" />
                <rect x="556" y="116" width="16" height="12" rx="2" fill="#FF9800" opacity="0.25" />
                <circle cx="524" cy="144" r="5.5" fill="#222" stroke="#FF9800" strokeWidth="0.5" />
                <circle cx="566" cy="144" r="5.5" fill="#222" stroke="#FF9800" strokeWidth="0.5" />
                {/* VIP indicator */}
                <rect x="528" y="109" width="34" height="4" rx="2" fill="#FF9800" opacity="0.2">
                  <animate attributeName="opacity" values="0.15;0.35;0.15" dur="2.5s" repeatCount="indefinite" />
                </rect>
              </g>

              {/* Building skyline */}
              <g opacity="0.15">
                <rect x="660" y="70" width="20" height="80" rx="2" fill="#0077BD" />
                <rect x="685" y="50" width="16" height="100" rx="2" fill="#0077BD" />
                <rect x="706" y="80" width="22" height="70" rx="2" fill="#0077BD" />
                <rect x="733" y="60" width="18" height="90" rx="2" fill="#0077BD" />
                {/* Windows */}
                {[670, 672, 674].map((y) => (
                  <rect key={`w1-${y}`} x="665" y={y} width="4" height="3" fill="#00E676" opacity="0.5" />
                ))}
                {[56, 60, 64, 68].map((y) => (
                  <rect key={`w2-${y}`} x="689" y={y} width="3" height="3" fill="#00E676" opacity="0.5" />
                ))}
              </g>

              {/* Sparkle decorations */}
              <circle cx="140" cy="100" r="2" fill="#0077BD" opacity="0.4">
                <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx="310" cy="90" r="1.5" fill="#00E676" opacity="0.4">
                <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="490" cy="85" r="2" fill="#FF9800" opacity="0.4">
                <animate attributeName="opacity" values="0.2;0.5;0.2" dur="2s" repeatCount="indefinite" />
              </circle>

              {/* Directional arrows */}
              <path d="M 630 130 L 650 130 L 645 125 M 650 130 L 645 135" stroke="#0077BD" strokeWidth="1.5" fill="none" opacity="0.3" />
            </svg>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => document.getElementById('corporativo-planes')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 rounded-full text-lg font-semibold text-black bg-[#0077BD] hover:bg-[#0088d4] transition-all duration-300 shadow-[0_0_30px_rgba(0,119,189,0.3)] hover:shadow-[0_0_50px_rgba(0,119,189,0.5)] hover:scale-105"
            >
              <CreditCard className="w-5 h-5 inline mr-2" />
              Ver Planes Corporativos
            </button>
            <a
              href="https://ecotaxi-kc.tm.taxi/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full text-lg font-semibold text-white border border-white/20 hover:border-[#0077BD]/50 hover:bg-white/5 transition-all duration-300"
            >
              <ExternalLink className="w-5 h-5 inline mr-2" />
              Oficina Virtual
            </a>
          </div>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="py-10 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {corporateStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="w-6 h-6 text-[#0077BD] mx-auto mb-2" />
                <div className="text-3xl md:text-4xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-white/40 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PAYMENT PLANS ═══ */}
      <section id="corporativo-planes" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            data-animate-section="plans"
            className={`text-center mb-12 transition-all duration-700 ${
              animSections['plans'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0077BD]/10 border border-[#0077BD]/20 mb-4">
              <CreditCard className="w-4 h-4 text-[#0077BD]" />
              <span className="text-sm text-[#0077BD]">Modelos de Pago</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Tres Formas de{' '}
              <span className="bg-gradient-to-r from-[#0077BD] to-[#00E676] bg-clip-text text-transparent">
                Pagar
              </span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              Elige el modelo de pago que mejor se adapte a las necesidades de tu empresa.
              Flexibilidad, control y transparencia en cada opción.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            {/* Plans Grid */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {paymentPlans.map((plan) => {
                  const isSelected = selectedPlan === plan.id
                  return (
                    <button
                      key={plan.id}
                      onClick={() => setSelectedPlan(isSelected ? null : plan.id)}
                      className={`group relative p-6 rounded-2xl text-left transition-all duration-300 ${
                        isSelected
                          ? 'bg-white/[0.06] border-2'
                          : 'bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-white/10'
                      } ${plan.highlight && !isSelected ? 'border-[#00E676]/20' : ''}`}
                      style={isSelected ? { borderColor: `${plan.color}40` } : {}}
                    >
                      {/* Glow */}
                      {isSelected && (
                        <div
                          className="absolute inset-0 rounded-2xl opacity-20"
                          style={{ boxShadow: `0 0 25px ${plan.color}30` }}
                        />
                      )}

                      <div className="relative z-10">
                        {/* Badge */}
                        <div className="flex items-center justify-between mb-4">
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center"
                            style={{ background: `${plan.color}15` }}
                          >
                            <plan.icon className="w-6 h-6" style={{ color: plan.color }} />
                          </div>
                          <span
                            className="px-2.5 py-1 rounded-full text-[10px] font-semibold"
                            style={{ background: `${plan.color}15`, color: plan.color }}
                          >
                            {plan.badge}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                        <p className="text-xs text-white/40 mb-3">{plan.subtitle}</p>
                        <p className="text-sm text-white/40 leading-relaxed line-clamp-3">
                          {plan.desc}
                        </p>

                        {isSelected && (
                          <ChevronRight
                            className="w-4 h-4 absolute top-6 right-4 rotate-90"
                            style={{ color: plan.color }}
                          />
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Detail Panel */}
            <div className="lg:col-span-2">
              {selectedPlanData ? (
                <div
                  className="p-6 rounded-3xl bg-white/[0.03] border transition-all duration-500"
                  style={{ borderColor: `${selectedPlanData.color}30` }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: `${selectedPlanData.color}15` }}
                    >
                      <selectedPlanData.icon className="w-6 h-6" style={{ color: selectedPlanData.color }} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{selectedPlanData.name}</h3>
                      <p className="text-xs" style={{ color: selectedPlanData.color }}>
                        {selectedPlanData.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-white/40 leading-relaxed mb-6">{selectedPlanData.desc}</p>

                  <h4 className="text-sm font-semibold text-white/60 mb-3 uppercase tracking-wider">
                    Beneficios Incluidos
                  </h4>
                  <div className="space-y-2 mb-6">
                    {selectedPlanData.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.05]"
                      >
                        <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: selectedPlanData.color }} />
                        <span className="text-sm text-white/60">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-white/40">
                      <Shield className="w-4 h-4 text-[#00E676]" />
                      <span>Seguro corporativo incluido</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/40">
                      <FileText className="w-4 h-4 text-[#0077BD]" />
                      <span>Facturación con NIT y razón social</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/40">
                      <HeadphonesIcon className="w-4 h-4 text-[#FF9800]" />
                      <span>Soporte dedicado para tu empresa</span>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      document.getElementById('corporativo-contacto')?.scrollIntoView({ behavior: 'smooth' })
                    }
                    className="w-full px-6 py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:scale-105"
                    style={{
                      background: selectedPlanData.color,
                      boxShadow: `0 0 20px ${selectedPlanData.color}30`,
                    }}
                  >
                    Contratar Plan {selectedPlanData.name}
                  </button>
                </div>
              ) : (
                <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.06] text-center">
                  <CreditCard className="w-12 h-12 text-white/10 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white/40 mb-2">Selecciona un Plan</h3>
                  <p className="text-sm text-white/25">
                    Haz click en cualquiera de los planes para ver los beneficios detallados y condiciones de cada modelo de pago.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ VIRTUAL OFFICE ═══ */}
      <section
        data-animate-section="virtual-office"
        className={`py-16 md:py-24 bg-gradient-to-b from-[#0a0e17] via-[#0d1830] to-[#0a0e17] transition-all duration-700 ${
          animSections['virtual-office'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-[#0077BD]/10 to-[#00E676]/5 border border-[#0077BD]/20 overflow-hidden">
            {/* Background orbs */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#0077BD]/5 blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#00E676]/5 blur-[60px]" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0077BD]/10 border border-[#0077BD]/20 mb-6">
                  <Globe className="w-4 h-4 text-[#0077BD]" />
                  <span className="text-sm text-[#0077BD]">Oficina Virtual</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Gestiona tu Transporte desde{' '}
                  <span className="bg-gradient-to-r from-[#0077BD] to-[#00E676] bg-clip-text text-transparent">
                    Cualquier Lugar
                  </span>
                </h2>
                <p className="text-white/50 leading-relaxed mb-6">
                  Nuestra plataforma de oficina virtual te permite gestionar todos tus servicios de transporte
                  corporativo desde cualquier dispositivo. Reserva, modifica, cancela y haz seguimiento
                  de cada servicio en tiempo real.
                </p>

                <div className="space-y-3 mb-8">
                  {[
                    'Reserva y gestión de servicios en línea',
                    'Seguimiento en tiempo real de vehículos',
                    'Reportes automáticos de consumo',
                    'Control de presupuesto por centro de costos',
                    'Facturación electrónica automática',
                    'Acceso multi-usuario con permisos configurables',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-white/50">
                      <CheckCircle2 className="w-4 h-4 text-[#00E676] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="https://ecotaxi-kc.tm.taxi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg font-semibold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all duration-300 shadow-[0_0_30px_rgba(0,230,118,0.3)] hover:shadow-[0_0_50px_rgba(0,230,118,0.5)] hover:scale-105"
                >
                  <Globe className="w-5 h-5" />
                  Acceder a Oficina Virtual
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* Virtual Office Mockup */}
              <div className="flex justify-center">
                <div className="w-full max-w-md p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                  {/* Top bar */}
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/5">
                    <div className="w-8 h-8 rounded-lg bg-[#0077BD]/10 flex items-center justify-center">
                      <Building2 className="w-4 h-4 text-[#0077BD]" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-white/70">Ecotaxi Corporativo</p>
                      <p className="text-[10px] text-white/30">oficina-virtual.ecotaxi.bo</p>
                    </div>
                    <div className="ml-auto flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#27CA40]" />
                    </div>
                  </div>

                  {/* Dashboard mockup */}
                  <div className="space-y-3">
                    {/* Quick stats */}
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: 'Servicios', value: '47', color: '#0077BD' },
                        { label: 'Activos', value: '5', color: '#00E676' },
                        { label: 'Presupuesto', value: '82%', color: '#FF9800' },
                      ].map((s) => (
                        <div key={s.label} className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.05] text-center">
                          <p className="text-lg font-bold" style={{ color: s.color }}>{s.value}</p>
                          <p className="text-[9px] text-white/30">{s.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Active service */}
                    <div className="p-3 rounded-xl bg-[#0077BD]/5 border border-[#0077BD]/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-white/70">Servicio Activo</span>
                        <span className="px-2 py-0.5 rounded-full bg-[#00E676]/10 text-[#00E676] text-[9px] font-medium">
                          En curso
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-[#0077BD]/15 flex items-center justify-center">
                          <Truck className="w-3.5 h-3.5 text-[#0077BD]" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-white/60">Ejecutivo → Hotel Camino Real</p>
                          <p className="text-[10px] text-white/30">Vehículo: Sedán VIP · SCZ-1234</p>
                        </div>
                      </div>
                      {/* Progress bar */}
                      <div className="mt-2 h-1 rounded-full bg-white/5">
                        <div className="h-full rounded-full bg-gradient-to-r from-[#0077BD] to-[#00E676]" style={{ width: '65%' }} />
                      </div>
                    </div>

                    {/* Recent booking */}
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] text-white/40">Última reserva</span>
                        <span className="text-[10px] text-white/30">Hoy 14:30</span>
                      </div>
                      <p className="text-xs text-white/50">Aeropuerto VVI → Centro Empresarial</p>
                      <p className="text-[10px] text-[#00E676]">Bs 120 · Completado</p>
                    </div>

                    {/* Invoice indicator */}
                    <div className="flex items-center justify-between p-3 rounded-xl bg-[#FF9800]/5 border border-[#FF9800]/10">
                      <div className="flex items-center gap-2">
                        <FileText className="w-3.5 h-3.5 text-[#FF9800]" />
                        <span className="text-[10px] text-white/50">Factura Marzo 2025</span>
                      </div>
                      <span className="text-[10px] text-[#FF9800] font-medium">Pendiente</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ KEY BENEFITS ═══ */}
      <section
        data-animate-section="benefits"
        className={`py-16 md:py-24 transition-all duration-700 ${
          animSections['benefits'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 mb-4">
              <BadgeCheck className="w-4 h-4 text-[#00E676]" />
              <span className="text-sm text-[#00E676]">Ventajas Corporativas</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Beneficios{' '}
              <span className="bg-gradient-to-r from-[#0077BD] to-[#00E676] bg-clip-text text-transparent">
                Exclusivos
              </span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              Todo lo que tu empresa necesita para gestionar el transporte corporativo de forma eficiente y profesional.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {keyBenefits.map((benefit) => (
              <div
                key={benefit.title}
                className="group relative p-6 md:p-8 rounded-3xl bg-white/[0.03] border border-white/[0.06] hover:border-white/10 hover:bg-white/[0.05] transition-all duration-500"
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ boxShadow: `0 0 30px ${benefit.color}10` }}
                />
                <div className="relative z-10">
                  <div
                    className="w-14 h-14 rounded-2xl mb-6 flex items-center justify-center"
                    style={{ background: `${benefit.color}15` }}
                  >
                    <benefit.icon className="w-7 h-7" style={{ color: benefit.color }} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TARGET CLIENTS ═══ */}
      <section
        data-animate-section="clients"
        className={`py-16 md:py-24 bg-gradient-to-b from-[#0a0e17] via-[#0d1830] to-[#0a0e17] transition-all duration-700 ${
          animSections['clients'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF9800]/10 border border-[#FF9800]/20 mb-4">
              <Users className="w-4 h-4 text-[#FF9800]" />
              <span className="text-sm text-[#FF9800]">Para Quién es</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Diseñado para{' '}
              <span className="bg-gradient-to-r from-[#FF9800] to-[#00E676] bg-clip-text text-transparent">
                tu Sector
              </span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              Cada sector tiene necesidades específicas de transporte. Nuestro servicio corporativo se adapta
              a los requerimientos particulares de tu industria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {targetClients.map((client) => (
              <div
                key={client.title}
                className="group relative p-8 md:p-10 rounded-3xl bg-white/[0.03] border border-white/[0.06] hover:border-white/10 transition-all duration-500"
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ boxShadow: `0 0 30px ${client.color}10` }}
                />
                <div className="relative z-10 flex items-start gap-5">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
                    style={{ background: `${client.color}15` }}
                  >
                    <client.icon className="w-8 h-8" style={{ color: client.color }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{client.title}</h3>
                    <p className="text-sm text-white/40 leading-relaxed">{client.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional trust indicators */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Empresas Mineras', desc: 'Transporte a zonas remotas' },
              { label: 'Bancos y Finanzas', desc: 'Servicio ejecutivo discreto' },
              { label: 'ONGs', desc: 'Tarifas solidarias especiales' },
              { label: 'Gobierno', desc: 'Procesos de contratación LPP' },
            ].map((sector) => (
              <div key={sector.label} className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
                <Building2 className="w-5 h-5 text-[#0077BD] mx-auto mb-2" />
                <p className="text-sm font-semibold text-white/70">{sector.label}</p>
                <p className="text-xs text-white/30">{sector.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section
        data-animate-section="how-it-works"
        className={`py-16 md:py-24 transition-all duration-700 ${
          animSections['how-it-works'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 mb-4">
              <ArrowRight className="w-4 h-4 text-[#8B5CF6]" />
              <span className="text-sm text-[#8B5CF6]">Proceso Simple</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Cómo{' '}
              <span className="bg-gradient-to-r from-[#8B5CF6] to-[#0077BD] bg-clip-text text-transparent">
                Funciona
              </span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              En cuatro pasos simples tu empresa puede empezar a disfrutar del transporte corporativo más confiable de Bolivia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Contáctanos',
                desc: 'Cuéntanos sobre tu empresa y las necesidades de transporte. Nuestro equipo corporativo te asesorará.',
                color: '#0077BD',
              },
              {
                step: '02',
                title: 'Elige tu Plan',
                desc: 'Selecciona el modelo de pago que mejor se adapte: Prepago, Cash o Post Pago según tu volumen.',
                color: '#00E676',
              },
              {
                step: '03',
                title: 'Configura tu Cuenta',
                desc: 'Te damos acceso a la oficina virtual, configuras usuarios, centros de costo y preferencias.',
                color: '#FF9800',
              },
              {
                step: '04',
                title: 'Comienza a Usar',
                desc: 'Reserva tu primer servicio y disfruta del transporte corporativo más profesional de Bolivia.',
                color: '#8B5CF6',
              },
            ].map((step, i) => (
              <div
                key={step.step}
                className={`relative p-6 rounded-3xl bg-white/[0.03] border border-white/[0.06] transition-all duration-500 ${
                  animSections['how-it-works']
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: animSections['how-it-works'] ? `${i * 150}ms` : '0ms' }}
              >
                {/* Step number */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `${step.color}15` }}
                >
                  <span className="text-lg font-bold" style={{ color: step.color }}>
                    {step.step}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white mb-2">{step.title}</h4>
                <p className="text-sm text-white/40 leading-relaxed">{step.desc}</p>

                {/* Connector line (hidden on last and mobile) */}
                {i < 3 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 w-6 h-px bg-white/5" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CONTACT / CTA ═══ */}
      <section
        id="corporativo-contacto"
        data-animate-section="contact"
        className={`py-16 md:py-24 bg-gradient-to-b from-[#0a0e17] via-[#0d1830] to-[#0a0e17] transition-all duration-700 ${
          animSections['contact'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-[#0077BD]/10 to-[#00E676]/5 border border-[#0077BD]/20 overflow-hidden">
            {/* Background orbs */}
            <div className="absolute top-0 left-1/3 w-72 h-72 rounded-full bg-[#0077BD]/5 blur-[100px]" />
            <div className="absolute bottom-0 right-0 w-56 h-56 rounded-full bg-[#00E676]/5 blur-[80px]" />

            <div className="relative z-10">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0077BD]/10 border border-[#0077BD]/20 mb-4">
                  <Phone className="w-4 h-4 text-[#0077BD]" />
                  <span className="text-sm text-[#0077BD]">Contacto Corporativo</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Empieza Hoy con{' '}
                  <span className="bg-gradient-to-r from-[#0077BD] to-[#00E676] bg-clip-text text-transparent">
                    Transporte Corporativo
                  </span>
                </h2>
                <p className="text-white/50 max-w-2xl mx-auto">
                  Nuestro equipo corporativo está listo para diseñar una solución de transporte
                  a la medida de tu empresa. Contáctanos y recibe una propuesta personalizada.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {/* Phone */}
                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center">
                  <div className="w-14 h-14 rounded-2xl bg-[#0077BD]/10 flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-7 h-7 text-[#0077BD]" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Llámanos</h3>
                  <a href="tel:+59133296885" className="text-[#0077BD] hover:underline text-lg font-medium">
                    (+591) 3 3296885
                  </a>
                  <p className="text-xs text-white/30 mt-1">Lunes a Viernes · 8:00 - 18:00</p>
                </div>

                {/* WhatsApp */}
                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center">
                  <div className="w-14 h-14 rounded-2xl bg-[#00E676]/10 flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-7 h-7 text-[#00E676]" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">WhatsApp</h3>
                  <a
                    href="https://wa.me/59133296885"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00E676] hover:underline text-lg font-medium"
                  >
                    (+591) 3 3296885
                  </a>
                  <p className="text-xs text-white/30 mt-1">Respuesta inmediata 24/7</p>
                </div>

                {/* Virtual Office */}
                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center">
                  <div className="w-14 h-14 rounded-2xl bg-[#FF9800]/10 flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-7 h-7 text-[#FF9800]" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Oficina Virtual</h3>
                  <a
                    href="https://ecotaxi-kc.tm.taxi/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FF9800] hover:underline text-sm font-medium break-all"
                  >
                    ecotaxi-kc.tm.taxi
                  </a>
                  <p className="text-xs text-white/30 mt-1">Gestiona tus servicios en línea</p>
                </div>
              </div>

              {/* CTA Button */}
              <div className="text-center">
                <a
                  href="https://wa.me/59133296885?text=Hola%2C%20me%20interesa%20el%20servicio%20corporativo%20de%20Ecotaxi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-10 py-4 rounded-full text-lg font-semibold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all duration-300 shadow-[0_0_30px_rgba(0,230,118,0.3)] hover:shadow-[0_0_50px_rgba(0,230,118,0.5)] hover:scale-105"
                >
                  <Phone className="w-5 h-5" />
                  Solicitar Propuesta Corporativa
                  <ArrowRight className="w-5 h-5" />
                </a>
                <p className="text-xs text-white/30 mt-4">
                  Respuesta garantizada en menos de 24 horas · Sin compromiso
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ BACK TO HOME ═══ */}
      <section className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              window.location.hash = ''
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium text-white border border-white/10 hover:border-[#0077BD]/30 hover:bg-white/5 transition-all duration-300"
          >
            ← Volver al Inicio
          </a>
        </div>
      </section>
    </div>
  )
}
