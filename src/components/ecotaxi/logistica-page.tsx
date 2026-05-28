'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Truck, Sparkles, ShoppingCart, Bike, Snowflake, TrendingUp,
  Calendar, Route, Phone, CheckCircle2, ArrowRight, DollarSign,
  MapPin, Smartphone, Award, FileText, Layers, Clock, Send,
  MessageCircle, Package, Warehouse, ChevronRight
} from 'lucide-react'

/* ─── useInView hook ─── */
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

/* ─── AnimatedSection wrapper ─── */
function AnimatedSection({ children, className = '', delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number
}) {
  const { ref, visible } = useInView(0.08)
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   1. HERO SECTION
   ═══════════════════════════════════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,230,118,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,230,118,0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[#0077BD]/15 blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#00E676]/10 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[#FF9800]/8 blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 pb-16">
        {/* Badge */}
        <AnimatedSection>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0077BD]/10 border border-[#0077BD]/20 mb-8 backdrop-blur-sm">
            <Truck className="w-4 h-4 text-[#0077BD]" />
            <span className="text-sm text-[#0077BD] font-medium">Logística y Distribución</span>
          </div>
        </AnimatedSection>

        {/* Title */}
        <AnimatedSection delay={100}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Logística y{' '}
            <span className="bg-gradient-to-r from-[#0077BD] via-[#00E676] to-[#0077BD] bg-clip-text text-transparent">
              Distribución
            </span>
          </h1>
        </AnimatedSection>

        {/* Slogan */}
        <AnimatedSection delay={200}>
          <p className="text-lg md:text-xl text-white/50 max-w-3xl mx-auto mb-4 leading-relaxed font-medium italic">
            &ldquo;La flota vehicular que tu empresa necesita, disponible cuando la requieras.&rdquo;
          </p>
        </AnimatedSection>

        {/* Brief description */}
        <AnimatedSection delay={250}>
          <p className="text-base text-white/40 max-w-2xl mx-auto mb-10 leading-relaxed">
            Nos convertimos en el aliado estratégico de tu negocio. Si tu empresa vende, nosotros nos encargamos de que el producto llegue al cliente final.
          </p>
        </AnimatedSection>

        {/* Animated SVG Scene */}
        <AnimatedSection delay={300}>
          <div className="max-w-3xl mx-auto mb-8">
            <svg viewBox="0 0 800 180" className="w-full">
              {/* Road */}
              <rect x="0" y="150" width="800" height="4" fill="#0077BD" opacity="0.2" rx="2" />
              {[40, 140, 240, 340, 440, 540, 640, 740].map((x) => (
                <rect key={x} x={x} y="151" width="30" height="2" fill="#0077BD" opacity="0.1" rx="1" />
              ))}

              {/* Delivery Motorcycle */}
              <g>
                <rect x="100" y="125" width="45" height="20" rx="4" fill="#1a1a2e" stroke="#00E676" strokeWidth="0.8" />
                <rect x="108" y="128" width="12" height="8" rx="2" fill="#00E676" opacity="0.3" />
                <circle cx="112" cy="148" r="4" fill="#222" stroke="#00E676" strokeWidth="0.5" />
                <circle cx="133" cy="148" r="4" fill="#222" stroke="#00E676" strokeWidth="0.5" />
                {/* Package on bike */}
                <rect x="125" y="118" width="16" height="12" rx="2" fill="#00E676" opacity="0.2" stroke="#00E676" strokeWidth="0.4" />
              </g>

              {/* Delivery Van */}
              <g>
                <rect x="260" y="108" width="90" height="36" rx="6" fill="#1a1a2e" stroke="#0077BD" strokeWidth="0.8" />
                <rect x="268" y="113" width="20" height="14" rx="2" fill="#0077BD" opacity="0.25" />
                <rect x="292" y="112" width="50" height="16" rx="3" fill="#0077BD" opacity="0.12" />
                <circle cx="282" cy="146" r="5" fill="#222" stroke="#0077BD" strokeWidth="0.5" />
                <circle cx="328" cy="146" r="5" fill="#222" stroke="#0077BD" strokeWidth="0.5" />
                {/* LOGO text */}
                <text x="312" y="131" textAnchor="middle" fill="#0077BD" fontSize="7" opacity="0.4">ECO</text>
                {/* Cargo glow */}
                <rect x="260" y="105" width="90" height="3" rx="1.5" fill="#0077BD" opacity="0.3">
                  <animate attributeName="opacity" values="0.2;0.5;0.2" dur="2s" repeatCount="indefinite" />
                </rect>
              </g>

              {/* Large Truck */}
              <g>
                <rect x="440" y="100" width="100" height="44" rx="4" fill="#1a1a2e" stroke="#FF9800" strokeWidth="0.8" />
                <rect x="540" y="112" width="30" height="32" rx="4" fill="#1a1a2e" stroke="#FF9800" strokeWidth="0.8" />
                <rect x="545" y="117" width="18" height="14" rx="2" fill="#FF9800" opacity="0.25" />
                <circle cx="460" cy="146" r="5.5" fill="#222" stroke="#FF9800" strokeWidth="0.5" />
                <circle cx="480" cy="146" r="5.5" fill="#222" stroke="#FF9800" strokeWidth="0.5" />
                <circle cx="556" cy="146" r="5.5" fill="#222" stroke="#FF9800" strokeWidth="0.5" />
                {/* Cargo area pattern */}
                <rect x="448" y="108" width="84" height="28" rx="2" fill="#FF9800" opacity="0.06" />
                {[0, 1, 2, 3].map((i) => (
                  <rect key={i} x={452 + i * 20} y="112" width="14" height="8" rx="1" fill="#FF9800" opacity="0.12" />
                ))}
              </g>

              {/* Refrigerated Truck */}
              <g>
                <rect x="650" y="104" width="70" height="40" rx="4" fill="#1a1a2e" stroke="#8B5CF6" strokeWidth="0.8" />
                <rect x="655" y="109" width="58" height="28" rx="2" fill="#8B5CF6" opacity="0.06" />
                {/* Snowflake indicator */}
                <circle cx="685" cy="124" r="8" fill="#8B5CF6" opacity="0.12" stroke="#8B5CF6" strokeWidth="0.4" />
                <text x="685" y="127" textAnchor="middle" fill="#8B5CF6" fontSize="8" opacity="0.5">*</text>
                <circle cx="665" cy="146" r="5" fill="#222" stroke="#8B5CF6" strokeWidth="0.5" />
                <circle cx="705" cy="146" r="5" fill="#222" stroke="#8B5CF6" strokeWidth="0.5" />
                {/* Cold glow */}
                <rect x="650" y="101" width="70" height="3" rx="1.5" fill="#8B5CF6" opacity="0.25">
                  <animate attributeName="opacity" values="0.15;0.4;0.15" dur="2.5s" repeatCount="indefinite" />
                </rect>
              </g>

              {/* Warehouse / Distribution Center */}
              <g opacity="0.15">
                <rect x="20" y="80" width="30" height="70" rx="2" fill="#0077BD" />
                <rect x="55" y="60" width="24" height="90" rx="2" fill="#0077BD" />
                {[84, 88, 92].map((y) => (
                  <rect key={`wh-${y}`} x="26" y={y} width="5" height="4" fill="#00E676" opacity="0.5" />
                ))}
                {[66, 72, 78, 84].map((y) => (
                  <rect key={`wh2-${y}`} x="60" y={y} width="4" height="4" fill="#00E676" opacity="0.5" />
                ))}
              </g>

              {/* Directional arrows */}
              <path d="M 180 135 L 200 135 L 195 130 M 200 135 L 195 140" stroke="#00E676" strokeWidth="1.5" fill="none" opacity="0.3" />
              <path d="M 370 135 L 390 135 L 385 130 M 390 135 L 385 140" stroke="#0077BD" strokeWidth="1.5" fill="none" opacity="0.3" />
              <path d="M 560 135 L 580 135 L 575 130 M 580 135 L 575 140" stroke="#FF9800" strokeWidth="1.5" fill="none" opacity="0.3" />

              {/* Sparkle decorations */}
              <circle cx="90" cy="100" r="2" fill="#00E676" opacity="0.4">
                <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx="240" cy="90" r="1.5" fill="#0077BD" opacity="0.4">
                <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="430" cy="85" r="2" fill="#FF9800" opacity="0.4">
                <animate attributeName="opacity" values="0.2;0.5;0.2" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="640" cy="80" r="1.5" fill="#8B5CF6" opacity="0.4">
                <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2.8s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>
        </AnimatedSection>

        {/* CTA Buttons */}
        <AnimatedSection delay={350}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a
              href="#flota"
              className="px-8 py-4 rounded-full text-lg font-semibold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all duration-300 shadow-[0_0_30px_rgba(0,230,118,0.3)] hover:shadow-[0_0_50px_rgba(0,230,118,0.5)] hover:scale-105"
            >
              <Truck className="w-5 h-5 inline mr-2" />
              Ver Flota Disponible
            </a>
            <a
              href="#contacto"
              className="px-8 py-4 rounded-full text-lg font-semibold text-white border border-white/20 hover:border-[#0077BD]/50 hover:bg-white/5 transition-all duration-300"
            >
              Solicitar Propuesta
            </a>
          </div>
        </AnimatedSection>

        {/* Stats bar */}
        <AnimatedSection delay={400}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { value: '200+', label: 'Empresas', icon: Truck },
              { value: '4', label: 'Tipos de Flota', icon: Layers },
              { value: '24/7', label: 'Disponibilidad', icon: Clock },
              { value: '100%', label: 'Trazabilidad', icon: MapPin },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-[#0077BD]/20 transition-all duration-300"
              >
                <stat.icon className="w-5 h-5 text-[#0077BD] mx-auto mb-2" />
                <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-white/50 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   2. INDUSTRY SOLUTIONS SECTION
   ═══════════════════════════════════════════════════════════════════════════════ */
const industries = [
  {
    icon: Sparkles,
    title: 'Belleza y Cosméticos',
    desc: 'Llevamos los pedidos masivos de inventario directamente hasta las puertas de tus consultoras o promotoras.',
    color: '#E91E63',
  },
  {
    icon: Package,
    title: 'Farmacias y Laboratorios',
    desc: 'Distribución segura y veloz de medicamentos e insumos médicos con el cuidado que requieren.',
    color: '#00E676',
  },
  {
    icon: ShoppingCart,
    title: 'Supermercados y Retail',
    desc: 'Despacho express o planificado de las compras de tus clientes hasta su domicilio.',
    color: '#0077BD',
  },
]

function IndustrySolutionsSection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,152,0,0.4) 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF9800]/10 border border-[#FF9800]/20 mb-4">
              <Sparkles className="w-4 h-4 text-[#FF9800]" />
              <span className="text-sm text-[#FF9800]">Soluciones por Industria</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Tu Industria, Nuestras{' '}
              <span className="bg-gradient-to-r from-[#FF9800] to-[#00E676] bg-clip-text text-transparent">
                Soluciones
              </span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              Adaptamos nuestra flota y logística a las necesidades de tu sector.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {industries.map((industry, i) => (
            <AnimatedSection key={industry.title} delay={i * 150}>
              <div className="group relative p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-white/10 transition-all duration-500 h-full">
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ boxShadow: `0 0 30px ${industry.color}10` }}
                />
                <div className="relative z-10 text-center">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: `${industry.color}15` }}
                  >
                    <industry.icon className="w-8 h-8" style={{ color: industry.color }} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{industry.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{industry.desc}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   3. FLEET SECTION
   ═══════════════════════════════════════════════════════════════════════════════ */
const fleetVehicles = [
  {
    icon: Bike,
    title: 'Motos y Autos',
    desc: 'Entregas rápidas o de menor volumen',
    color: '#00E676',
    image: '/vehicles/3-MOTO/moto-taxi.png',
  },
  {
    icon: Truck,
    title: 'Furgonetas y Camionetas',
    desc: 'Paquetes medianos y cajas corporativas',
    color: '#0077BD',
    image: '/vehicles/6-CAMIONETA/mediana.png',
  },
  {
    icon: Warehouse,
    title: 'Furgones de Carga',
    desc: 'Distribución masiva o mudanzas comerciales',
    color: '#FF9800',
    image: '/vehicles/7-FURGON/grande.png',
  },
  {
    icon: Snowflake,
    title: 'Carga Refrigerada',
    desc: 'Alimentos perecederos o productos con cadena de frío',
    color: '#8B5CF6',
    image: '/vehicles/7-FURGON/mediano.png',
  },
]

function FleetSection() {
  return (
    <section id="flota" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#080c15] to-[#0a0e17]" />

      {/* Accent glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-[#0077BD]/5 blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0077BD]/10 border border-[#0077BD]/20 mb-4">
              <Truck className="w-4 h-4 text-[#0077BD]" />
              <span className="text-sm text-[#0077BD]">Flota Multimodal</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Elige tu{' '}
              <span className="bg-gradient-to-r from-[#0077BD] to-[#00E676] bg-clip-text text-transparent">
                Vehículo
              </span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              Tú decides qué vehículo se adapta al volumen o tipo de tu mercadería
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {fleetVehicles.map((vehicle, i) => (
            <AnimatedSection key={vehicle.title} delay={i * 120}>
              <div className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-white/10 transition-all duration-500 h-full overflow-hidden">
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ boxShadow: `0 0 30px ${vehicle.color}10` }}
                />

                {/* Vehicle image background */}
                <div className="absolute bottom-0 right-0 w-28 h-28 opacity-[0.08] group-hover:opacity-[0.15] transition-opacity duration-500">
                  <img
                    src={vehicle.image}
                    alt={vehicle.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="relative z-10">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: `${vehicle.color}15` }}
                  >
                    <vehicle.icon className="w-7 h-7" style={{ color: vehicle.color }} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{vehicle.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{vehicle.desc}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   4. OPERATIONAL SCHEMES SECTION
   ═══════════════════════════════════════════════════════════════════════════════ */
const operationalSchemes = [
  {
    icon: TrendingUp,
    title: 'Apoyo por Alta Demanda',
    desc: 'Vehículos extra para días de alta demanda (Navidad, fines de mes, promociones). Ideal si ya tienes transporte propio.',
    color: '#FF9800',
  },
  {
    icon: Calendar,
    title: 'Por Jornada, Horas o Mensual',
    desc: 'Vehículos asignados exclusivamente a tus rutas por el tiempo que determines.',
    color: '#0077BD',
  },
  {
    icon: Route,
    title: 'Rutas Optimizadas',
    desc: 'Pagas según la cantidad de puntos distribuidos. Rutas planificadas para máxima eficiencia.',
    color: '#00E676',
  },
]

function OperationalSchemesSection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#71B124]/10 border border-[#71B124]/20 mb-4">
              <TrendingUp className="w-4 h-4 text-[#71B124]" />
              <span className="text-sm text-[#71B124]">Esquemas Flexibles</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Operamos a tu{' '}
              <span className="bg-gradient-to-r from-[#71B124] to-[#00E676] bg-clip-text text-transparent">
                Ritmo
              </span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              Esquemas operativos flexibles que se adaptan a la demanda de tu negocio.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {operationalSchemes.map((scheme, i) => (
            <AnimatedSection key={scheme.title} delay={i * 150}>
              <div className="group relative p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-white/10 transition-all duration-500 h-full">
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ boxShadow: `0 0 30px ${scheme.color}10` }}
                />

                <div className="relative z-10 flex items-start gap-5">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: `${scheme.color}15` }}
                  >
                    <scheme.icon className="w-7 h-7" style={{ color: scheme.color }} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{scheme.title}</h3>
                    <p className="text-sm text-white/40 leading-relaxed">{scheme.desc}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   5. HOW IT WORKS SECTION
   ═══════════════════════════════════════════════════════════════════════════════ */
const processSteps = [
  {
    step: '01',
    title: 'Contáctanos',
    desc: 'Cuéntanos sobre tu negocio y necesidades de distribución',
    color: '#0077BD',
    icon: Phone,
  },
  {
    step: '02',
    title: 'Diseñamos tu Ruta',
    desc: 'Planificamos las rutas y seleccionamos la flota ideal',
    color: '#00E676',
    icon: Route,
  },
  {
    step: '03',
    title: 'Operamos',
    desc: 'Ponemos los vehículos y conductores a tu disposición',
    color: '#FF9800',
    icon: Truck,
  },
  {
    step: '04',
    title: 'Entregamos',
    desc: 'Tu mercadería llega a tiempo, con trazabilidad total',
    color: '#8B5CF6',
    icon: CheckCircle2,
  },
]

function HowItWorksSection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#080c15] to-[#0a0e17]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 mb-4">
              <ArrowRight className="w-4 h-4 text-[#8B5CF6]" />
              <span className="text-sm text-[#8B5CF6]">Proceso Simple</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Cómo{' '}
              <span className="bg-gradient-to-r from-[#8B5CF6] to-[#0077BD] bg-clip-text text-transparent">
                Funciona
              </span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              En cuatro pasos tu mercadería llega a su destino con trazabilidad total.
            </p>
          </div>
        </AnimatedSection>

        {/* Timeline */}
        <div className="relative">
          {/* Horizontal connector line (desktop) */}
          <div className="hidden lg:block absolute top-[52px] left-[12.5%] right-[12.5%] h-[2px] bg-gradient-to-r from-[#0077BD]/30 via-[#00E676]/30 via-[#FF9800]/30 to-[#8B5CF6]/30" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <AnimatedSection key={step.step} delay={i * 150}>
                <div className="relative text-center">
                  {/* Step circle */}
                  <div className="relative mx-auto mb-6">
                    <div
                      className="w-[80px] h-[80px] rounded-full flex items-center justify-center mx-auto border-2 relative z-10"
                      style={{
                        backgroundColor: `${step.color}10`,
                        borderColor: `${step.color}30`,
                      }}
                    >
                      <step.icon className="w-8 h-8" style={{ color: step.color }} />
                    </div>
                    {/* Step number badge */}
                    <div
                      className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-black z-20"
                      style={{ backgroundColor: step.color }}
                    >
                      {step.step}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{step.desc}</p>

                  {/* Arrow for mobile */}
                  {i < processSteps.length - 1 && (
                    <div className="lg:hidden flex justify-center my-4">
                      <ChevronRight className="w-5 h-5 text-white/20 rotate-90" />
                    </div>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   6. BENEFITS SECTION
   ═══════════════════════════════════════════════════════════════════════════════ */
const benefits = [
  {
    icon: DollarSign,
    title: 'Sin Inversión en Flota',
    desc: 'No necesitas comprar camiones ni contratar conductores',
    color: '#00E676',
  },
  {
    icon: MapPin,
    title: 'Trazabilidad GPS',
    desc: 'Monitoreo en tiempo real de cada entrega',
    color: '#0077BD',
  },
  {
    icon: Smartphone,
    title: 'Tecnología de Punta',
    desc: 'Plataforma digital para gestionar todas tus entregas',
    color: '#FF9800',
  },
  {
    icon: Award,
    title: 'Experiencia Comprobada',
    desc: 'Años en el sector nos respaldan',
    color: '#8B5CF6',
  },
  {
    icon: FileText,
    title: 'Facturación Corporativa',
    desc: 'Con NIT, razón social y detalle completo',
    color: '#71B124',
  },
  {
    icon: Layers,
    title: 'Flota Escalable',
    desc: 'Desde 1 vehículo hasta toda una flota',
    color: '#E91E63',
  },
]

function BenefitsSection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 mb-4">
              <CheckCircle2 className="w-4 h-4 text-[#00E676]" />
              <span className="text-sm text-[#00E676]">Ventajas</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              ¿Por qué Ecotaxi{' '}
              <span className="bg-gradient-to-r from-[#00E676] to-[#0077BD] bg-clip-text text-transparent">
                Logística
              </span>
              ?
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              Todo lo que necesitas para externalizar tu distribución con total confianza.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((benefit, i) => (
            <AnimatedSection key={benefit.title} delay={i * 100}>
              <div className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-white/10 hover:bg-white/[0.05] transition-all duration-500">
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ boxShadow: `0 0 30px ${benefit.color}10` }}
                />
                <div className="relative z-10 flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: `${benefit.color}15` }}
                  >
                    <benefit.icon className="w-6 h-6" style={{ color: benefit.color }} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white mb-1">{benefit.title}</h3>
                    <p className="text-sm text-white/40 leading-relaxed">{benefit.desc}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   7. CONTACT / CTA SECTION
   ═══════════════════════════════════════════════════════════════════════════════ */
function ContactSection() {
  const [formData, setFormData] = useState({
    empresa: '',
    nombre: '',
    cargo: '',
    email: '',
    telefono: '',
    tipoNegocio: '',
    mensaje: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  const inputClasses = "w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#0077BD]/40 focus:bg-white/[0.06] transition-all duration-300"

  return (
    <section id="contacto" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />

      {/* Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[#0077BD]/8 blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0077BD]/10 border border-[#0077BD]/20 mb-4">
              <Phone className="w-4 h-4 text-[#0077BD]" />
              <span className="text-sm text-[#0077BD]">Contáctanos</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Llevamos tu Negocio{' '}
              <span className="bg-gradient-to-r from-[#0077BD] to-[#00E676] bg-clip-text text-transparent">
                Más Lejos
              </span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              Cuéntanos sobre tu empresa y te diseñamos una propuesta a medida.
            </p>
          </div>
        </AnimatedSection>

        <div className="max-w-4xl mx-auto">
          <AnimatedSection delay={100}>
            {submitted ? (
              <div className="p-12 rounded-3xl bg-white/[0.04] border border-[#00E676]/20 text-center">
                <CheckCircle2 className="w-16 h-16 text-[#00E676] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">¡Propuesta Recibida!</h3>
                <p className="text-white/50">Nuestro equipo se pondrá en contacto contigo en las próximas 24 horas.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 md:p-10 rounded-3xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-xs text-white/40 mb-2 font-medium">Empresa</label>
                    <input
                      type="text"
                      name="empresa"
                      value={formData.empresa}
                      onChange={handleChange}
                      placeholder="Nombre de tu empresa"
                      className={inputClasses}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/40 mb-2 font-medium">Nombre</label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      placeholder="Tu nombre completo"
                      className={inputClasses}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/40 mb-2 font-medium">Cargo</label>
                    <input
                      type="text"
                      name="cargo"
                      value={formData.cargo}
                      onChange={handleChange}
                      placeholder="Gerente, Director, etc."
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/40 mb-2 font-medium">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="tu@empresa.com"
                      className={inputClasses}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/40 mb-2 font-medium">Teléfono</label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      placeholder="+591 7XXXXXXX"
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/40 mb-2 font-medium">Tipo de Negocio</label>
                    <select
                      name="tipoNegocio"
                      value={formData.tipoNegocio}
                      onChange={handleChange}
                      className={`${inputClasses} appearance-none cursor-pointer`}
                      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.3)' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}
                    >
                      <option value="" className="bg-[#0a0e17]">Selecciona una opción</option>
                      <option value="belleza" className="bg-[#0a0e17]">Belleza y Cosméticos</option>
                      <option value="farmacia" className="bg-[#0a0e17]">Farmacias y Laboratorios</option>
                      <option value="retail" className="bg-[#0a0e17]">Supermercados y Retail</option>
                      <option value="alimentos" className="bg-[#0a0e17]">Alimentos y Bebidas</option>
                      <option value="ecommerce" className="bg-[#0a0e17]">E-Commerce</option>
                      <option value="otro" className="bg-[#0a0e17]">Otro</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-xs text-white/40 mb-2 font-medium">Mensaje</label>
                  <textarea
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    placeholder="Cuéntanos sobre tus necesidades de distribución..."
                    rows={4}
                    className={`${inputClasses} resize-none`}
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-4 rounded-full text-lg font-semibold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all duration-300 shadow-[0_0_30px_rgba(0,230,118,0.3)] hover:shadow-[0_0_50px_rgba(0,230,118,0.5)] hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Solicitar Propuesta
                  </button>

                  <a
                    href="https://wa.me/59173662803"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-8 py-4 rounded-full text-lg font-semibold text-white border border-[#25D366]/30 hover:border-[#25D366]/60 hover:bg-[#25D366]/10 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5 text-[#25D366]" />
                    WhatsApp Directo
                  </a>
                </div>
              </form>
            )}
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════════════════════════════════════ */
export function LogisticaPage() {
  return (
    <div className="min-h-screen bg-[#0a0e17]">
      <HeroSection />
      <IndustrySolutionsSection />
      <FleetSection />
      <OperationalSchemesSection />
      <HowItWorksSection />
      <BenefitsSection />
      <ContactSection />
    </div>
  )
}
