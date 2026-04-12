'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Building2, CreditCard, Shield, Leaf, Clock, BarChart3, Users,
  Smartphone, CheckCircle2, Star, Phone, Mail, ExternalLink,
  ChevronRight, Zap, MapPin, UserCheck, Award, TrendingDown,
  Navigation, FileText, Settings, Eye, ArrowRight, BadgeCheck,
  HandCoins, Receipt, Banknote, CircleDollarSign, Car,
  TreePine, MonitorSmartphone, Radio
} from 'lucide-react'
import { Navbar } from '@/components/ecotaxi/navbar'
import { Footer } from '@/components/ecotaxi/footer'

/* ─────────────────────── scroll-triggered animation hook ──────────────────── */
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

/* ─────────────────────── animated section wrapper ─────────────────────────── */
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[#71B124]/8 blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 pb-16">
        {/* Badge */}
        <AnimatedSection>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0077BD]/10 border border-[#0077BD]/20 mb-8 backdrop-blur-sm">
            <Building2 className="w-4 h-4 text-[#0077BD]" />
            <span className="text-sm text-[#0077BD] font-medium">Servicios Corporativos</span>
          </div>
        </AnimatedSection>

        {/* Title */}
        <AnimatedSection delay={100}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Movilidad{' '}
            <span className="bg-gradient-to-r from-[#00E676] via-[#0077BD] to-[#00E676] bg-clip-text text-transparent">
              Corporativa
            </span>
          </h1>
        </AnimatedSection>

        {/* Subtitle */}
        <AnimatedSection delay={200}>
          <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-12 leading-relaxed">
            En Ecotaxi nos convertimos en tu aliado estratégico de movilidad corporativa.
            Transparencia y control de consumo en tiempo real.
          </p>
        </AnimatedSection>

        {/* CTA buttons */}
        <AnimatedSection delay={300}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a
              href="#planes"
              className="px-8 py-4 rounded-full text-lg font-semibold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all duration-300 shadow-[0_0_30px_rgba(0,230,118,0.3)] hover:shadow-[0_0_50px_rgba(0,230,118,0.5)] hover:scale-105"
            >
              Ver Planes Corporativos
            </a>
            <a
              href="#contacto"
              className="px-8 py-4 rounded-full text-lg font-semibold text-white border border-white/20 hover:border-[#00E676]/50 hover:bg-white/5 transition-all duration-300"
            >
              Solicitar Propuesta
            </a>
          </div>
        </AnimatedSection>

        {/* Stats bar */}
        <AnimatedSection delay={400}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { value: '200+', label: 'Empresas', icon: Building2 },
              { value: '10+', label: 'Años', icon: Award },
              { value: '30%', label: 'Ahorro', icon: TrendingDown },
              { value: '100%', label: 'Facturado', icon: FileText },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-[#00E676]/20 transition-all duration-300"
              >
                <stat.icon className="w-5 h-5 text-[#00E676] mx-auto mb-2" />
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
   2. WHY CHOOSE US SECTION
   ═══════════════════════════════════════════════════════════════════════════════ */
const pillars = [
  {
    icon: Smartphone,
    title: 'TECNOLOGÍA',
    subtitle: 'Plataforma de reservas intuitiva',
    color: '#0077BD',
    points: [
      'Múltiples canales para solicitar servicio',
      'Proceso de reserva simple con solo unos clics',
      'Representantes de servicio al cliente disponibles',
      'Plataforma online accesible 24/7',
    ],
  },
  {
    icon: Settings,
    title: 'PERSONALIZACIÓN',
    subtitle: 'Comodidad y Flexibilidad',
    color: '#71B124',
    points: [
      'Variedad de vehículos adaptados a necesidades y presupuesto',
      'Desde motocicleta hasta camión, cada detalle eficiente',
      'Cada empresa tiene necesidades únicas',
      'Trabajamos de cerca para personalizar el servicio',
    ],
  },
  {
    icon: TreePine,
    title: 'SOSTENIBILIDAD',
    subtitle: 'Comprometidos con el planeta',
    color: '#00E676',
    points: [
      'Mitigar, Reducir, Compensar y Neutralizar Huella de Carbono',
      'Resúmenes mensuales de kilometraje',
      'Selección de combustibles limpios',
      'Campaña anual de plantación de árboles para clientes',
    ],
  },
  {
    icon: Shield,
    title: 'SEGURIDAD',
    subtitle: 'Calidad y Trazabilidad',
    color: '#00E676',
    points: [
      'Servicio de calidad con niveles óptimos de seguridad y confort',
      'Puntualidad, responsabilidad y cumplimiento',
      'Mejora continua del sistema de gestión de calidad',
      'Rastreo GPS de todas las unidades',
    ],
  },
]

function WhyChooseUsSection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(0,119,189,0.4) 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 mb-4">
              <Star className="w-4 h-4 text-[#00E676]" />
              <span className="text-sm text-[#00E676]">Nuestros Pilares</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              ¿Por qué elegirnos como su{' '}
              <span className="bg-gradient-to-r from-[#0077BD] to-[#00E676] bg-clip-text text-transparent">
                socio de transporte
              </span>
              ?
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              Cuatro pilares fundamentales que garantizan un servicio corporativo de excelencia.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((pillar, i) => (
            <AnimatedSection key={pillar.title} delay={i * 120}>
              <div className="group relative p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-white/10 transition-all duration-500 h-full">
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/[0.02] group-hover:to-white/[0.01] transition-all duration-500" />

                <div className="relative z-10">
                  <div className="flex items-start gap-4 mb-6">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${pillar.color}15` }}
                    >
                      <pillar.icon className="w-6 h-6" style={{ color: pillar.color }} />
                    </div>
                    <div>
                      <span
                        className="text-xs font-bold tracking-widest uppercase"
                        style={{ color: pillar.color }}
                      >
                        {pillar.title}
                      </span>
                      <h3 className="text-lg font-semibold text-white mt-1">
                        {pillar.subtitle}
                      </h3>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {pillar.points.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <CheckCircle2
                          className="w-4 h-4 mt-0.5 shrink-0"
                          style={{ color: pillar.color }}
                        />
                        <span className="text-sm text-white/60 leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
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
   3. THREE PAYMENT PLANS SECTION
   ═══════════════════════════════════════════════════════════════════════════════ */
const plans = [
  {
    name: 'PLAN PREPAGO',
    recommended: true,
    color: '#00E676',
    description: 'El cliente abona a su cuenta un monto y de ahí se deduce cada servicio',
    features: [
      'Control total del presupuesto',
      'Sin sorpresas en facturación',
      'Recarga cuando lo necesites',
      'Saldo visible en tiempo real',
      'Notificaciones de saldo bajo',
    ],
    bestFor: 'Empresas con presupuesto definido',
    icon: HandCoins,
  },
  {
    name: 'PLAN CASH',
    recommended: false,
    color: '#0077BD',
    description: 'El funcionario paga en efectivo, QR, tarjeta o transferencia al usar el servicio',
    features: [
      'Factura por servicio o por periodo',
      'Flexibilidad de pago por viaje',
      'Sin compromiso de saldo mínimo',
      'Múltiples métodos de pago',
      'Emisión de factura consolidada',
    ],
    bestFor: 'Empresas con movilidad variable',
    icon: Banknote,
  },
  {
    name: 'PLAN POST PAGO',
    recommended: false,
    color: '#FF9800',
    description: 'Se da una línea de crédito con pagos pos factura',
    features: [
      'Facturación consolidada mensual',
      'Línea de crédito pre-aprobada',
      'Reportes detallados de consumo',
      'Pago flexible a 30 días',
      'Conciliación automática',
    ],
    bestFor: 'Empresas con alto volumen de traslados',
    icon: CircleDollarSign,
  },
]

function PaymentPlansSection() {
  return (
    <section id="planes" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#080c15] to-[#0a0e17]" />

      {/* Accent glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-[#00E676]/5 blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF9800]/10 border border-[#FF9800]/20 mb-4">
              <CreditCard className="w-4 h-4 text-[#FF9800]" />
              <span className="text-sm text-[#FF9800]">Planes de Pago</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Elige tu{' '}
              <span className="bg-gradient-to-r from-[#00E676] via-[#0077BD] to-[#FF9800] bg-clip-text text-transparent">
                Plan Corporativo
              </span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              Tres modalidades de pago diseñadas para adaptarse a la forma de operar de tu empresa.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, i) => (
            <AnimatedSection key={plan.name} delay={i * 150}>
              <div
                className={`group relative p-6 md:p-8 rounded-2xl bg-white/[0.03] backdrop-blur-sm transition-all duration-500 h-full flex flex-col ${
                  plan.recommended
                    ? 'border-2 scale-[1.02] lg:scale-105 shadow-2xl'
                    : 'border border-white/[0.06] hover:border-white/10'
                }`}
                style={{
                  borderColor: plan.recommended ? plan.color : undefined,
                  boxShadow: plan.recommended
                    ? `0 0 40px ${plan.color}15, 0 0 80px ${plan.color}08`
                    : undefined,
                }}
              >
                {/* Recommended badge */}
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span
                      className="px-4 py-1.5 rounded-full text-xs font-bold text-black uppercase tracking-wider"
                      style={{ backgroundColor: plan.color }}
                    >
                      Recomendado
                    </span>
                  </div>
                )}

                {/* Icon + Name */}
                <div className="text-center mb-6 pt-2">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: `${plan.color}15` }}
                  >
                    <plan.icon className="w-8 h-8" style={{ color: plan.color }} />
                  </div>
                  <h3
                    className="text-xl font-bold tracking-wide"
                    style={{ color: plan.color }}
                  >
                    {plan.name}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-center text-white/60 text-sm leading-relaxed mb-6">
                  {plan.description}
                </p>

                {/* Features */}
                <div className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <CheckCircle2
                        className="w-4 h-4 mt-0.5 shrink-0"
                        style={{ color: plan.color }}
                      />
                      <span className="text-sm text-white/70">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Best for */}
                <div
                  className="p-4 rounded-xl mt-auto"
                  style={{ backgroundColor: `${plan.color}08`, borderColor: `${plan.color}15`, borderWidth: 1 }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Star className="w-3.5 h-3.5" style={{ color: plan.color }} />
                    <span className="text-xs font-semibold" style={{ color: plan.color }}>
                      Ideal para:
                    </span>
                  </div>
                  <p className="text-sm text-white/70">{plan.bestFor}</p>
                </div>

                {/* CTA */}
                <a
                  href="#contacto"
                  className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    backgroundColor: plan.recommended ? plan.color : `${plan.color}15`,
                    color: plan.recommended ? '#000' : plan.color,
                    boxShadow: plan.recommended
                      ? `0 0 20px ${plan.color}25`
                      : 'none',
                  }}
                >
                  Solicitar Plan
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   4. SAVINGS SECTION
   ═══════════════════════════════════════════════════════════════════════════════ */
const savings = [
  {
    icon: TrendingDown,
    title: 'Ahorro Significativo',
    description: 'Reduce los costos de transporte hasta un 30% comparado con opciones tradicionales',
    color: '#00E676',
  },
  {
    icon: Navigation,
    title: 'El Tiempo Importa',
    description: 'Rastreo GPS para asignar la unidad más cercana, garantizando el servicio más rápido',
    color: '#0077BD',
  },
  {
    icon: CircleDollarSign,
    title: 'Tarifas Accesibles',
    description: 'Tarifas fijas, sin precios dinámicos, sin sorpresas. Transparencia total en cada viaje',
    color: '#71B124',
  },
  {
    icon: BarChart3,
    title: 'Informes y Análisis',
    description: 'Herramientas para analizar cada servicio, conocer la ruta y generar reportes. Monitoreo de consumo en tiempo real desde cualquier dispositivo',
    color: '#FF9800',
  },
]

function SavingsSection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#71B124]/10 border border-[#71B124]/20 mb-4">
              <TrendingDown className="w-4 h-4 text-[#71B124]" />
              <span className="text-sm text-[#71B124]">Ahorro Corporativo</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              ¡AHORRA TIEMPO Y{' '}
              <span className="bg-gradient-to-r from-[#71B124] to-[#00E676] bg-clip-text text-transparent">
                DINERO
              </span>
              !
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              Optimiza tus recursos de transporte corporativo con nuestras soluciones inteligentes.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {savings.map((item, i) => (
            <AnimatedSection key={item.title} delay={i * 120}>
              <div className="group relative p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-white/10 transition-all duration-500 h-full">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/[0.02] transition-all duration-500" />

                <div className="relative z-10 flex items-start gap-5">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${item.color}12` }}
                  >
                    <item.icon className="w-7 h-7" style={{ color: item.color }} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-white/55 leading-relaxed">{item.description}</p>
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
   5. VIRTUAL OFFICE SECTION
   ═══════════════════════════════════════════════════════════════════════════════ */
const virtualOfficeFeatures = [
  { icon: Car, label: 'Gestión de viajes en tiempo real' },
  { icon: FileText, label: 'Consulta de facturas' },
  { icon: Building2, label: 'Clasificación por centro de costo' },
  { icon: Users, label: 'Supervisores y autorizadores' },
  { icon: BarChart3, label: 'Reportes personalizados' },
  { icon: Eye, label: 'Control de consumo' },
]

function VirtualOfficeSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e17] via-[#0d1a12] to-[#0a0e17]" />

      {/* Prominent green glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full bg-[#00E676]/8 blur-[180px]" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#71B124]/6 blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <AnimatedSection>
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 mb-6">
                <MonitorSmartphone className="w-4 h-4 text-[#00E676]" />
                <span className="text-sm text-[#00E676]">Plataforma Digital</span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Oficina Virtual de{' '}
                <span className="bg-gradient-to-r from-[#00E676] to-[#71B124] bg-clip-text text-transparent">
                  Clientes Corporativos
                </span>
              </h2>

              <p className="text-white/55 text-lg leading-relaxed mb-8">
                Gestiona todos los viajes de tu empresa desde un solo lugar. Consulta facturas,
                clasifica servicios por centro de costo, sucursales, supervisores. Personalizamos
                a tus necesidades.
              </p>

              {/* Features grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                {virtualOfficeFeatures.map((feat) => (
                  <div key={feat.label} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#00E676]/10 flex items-center justify-center shrink-0">
                      <feat.icon className="w-4 h-4 text-[#00E676]" />
                    </div>
                    <span className="text-sm text-white/70">{feat.label}</span>
                  </div>
                ))}
              </div>

              {/* Big CTA button */}
              <a
                href="https://ecotaxi-kc.tm.taxi/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-lg font-bold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all duration-300 shadow-[0_0_40px_rgba(0,230,118,0.3)] hover:shadow-[0_0_60px_rgba(0,230,118,0.5)] hover:scale-105"
              >
                Acceder a Oficina Virtual
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </AnimatedSection>

          {/* Right: Visual / Glass card mock-up */}
          <AnimatedSection delay={200}>
            <div className="relative">
              {/* Decorative ring */}
              <div className="absolute -inset-4 rounded-3xl border border-[#00E676]/10 animate-glow-pulse" />

              <div className="relative p-8 rounded-2xl bg-white/[0.04] border border-[#00E676]/15 backdrop-blur-xl">
                {/* Mock dashboard header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#00E676]" />
                    <span className="text-sm text-white/60">Dashboard Corporativo</span>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                  </div>
                </div>

                {/* Mock stats */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[
                    { label: 'Viajes Hoy', value: '47', color: '#00E676' },
                    { label: 'Gasto Mes', value: '$12.4K', color: '#0077BD' },
                    { label: 'Ahorro', value: '28%', color: '#71B124' },
                  ].map((s) => (
                    <div key={s.label} className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                      <div className="text-xl font-bold" style={{ color: s.color }}>{s.value}</div>
                      <div className="text-xs text-white/40 mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Mock bar chart */}
                <div className="space-y-3">
                  <div className="text-xs text-white/40 mb-2">Consumo semanal</div>
                  {[80, 65, 90, 55, 75, 85, 60].map((h, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-[10px] text-white/30 w-8">
                        {['L', 'M', 'X', 'J', 'V', 'S', 'D'][i]}
                      </span>
                      <div className="flex-1 h-3 rounded-full bg-white/[0.04] overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${h}%`,
                            background: `linear-gradient(90deg, #00E676, #0077BD)`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mock active trips */}
                <div className="mt-6 pt-4 border-t border-white/[0.06]">
                  <div className="text-xs text-white/40 mb-3">Viajes activos</div>
                  {['Executivo → Aeropuerto', 'Centro → Zona Industrial'].map((trip, i) => (
                    <div key={i} className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-[#00E676] animate-pulse" />
                      <span className="text-xs text-white/50">{trip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   6. PROFESSIONAL DRIVERS SECTION
   ═══════════════════════════════════════════════════════════════════════════════ */
const driverQualities = [
  { icon: BadgeCheck, label: 'Conductores certificados y capacitados' },
  { icon: UserCheck, label: 'Uniformados e identificados' },
  { icon: MapPin, label: 'Conocimiento de la ciudad' },
  { icon: Shield, label: 'Discreción y profesionalismo' },
  { icon: Eye, label: 'Evaluación continua de desempeño' },
  { icon: Users, label: 'Capacitación en atención al cliente' },
]

function ProfessionalDriversSection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0077BD]/10 border border-[#0077BD]/20 mb-4">
              <UserCheck className="w-4 h-4 text-[#0077BD]" />
              <span className="text-sm text-[#0077BD]">Equipo Profesional</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Los Mejores Choferes de la{' '}
              <span className="bg-gradient-to-r from-[#0077BD] to-[#00E676] bg-clip-text text-transparent">
                Compañía
              </span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              Nuestros conductores son seleccionados rigurosamente y capacitados continuamente para ofrecer un servicio de excelencia.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {driverQualities.map((q, i) => (
            <AnimatedSection key={q.label} delay={i * 100}>
              <div className="group p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-[#0077BD]/20 transition-all duration-500">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0077BD]/15 to-[#00E676]/15 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <q.icon className="w-6 h-6 text-[#00E676]" />
                </div>
                <p className="text-white/75 text-sm font-medium">{q.label}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   7. 200+ SATISFIED CLIENTS SECTION
   ═══════════════════════════════════════════════════════════════════════════════ */
const clientNames = [
  'Colgate-Palmolive', 'Banco BISA', 'Gloria', 'Coca-Cola', 'YPFB',
  'Entel', 'Vinto', 'Cemento Nacional', 'Hidrocarbonos', 'Arcor',
  'Grupo Económico', 'Banco Unión', 'PETROBRAS', 'Brady', 'FANCESA',
]

const testimonials = [
  {
    name: 'Carlos Méndez',
    role: 'Gerente de Logística',
    company: 'Empresa líder en manufactura',
    text: 'Desde que implementamos Ecotaxi como nuestro proveedor de transporte corporativo, hemos reducido costos en un 28%. La transparencia en facturación y el control de consumo son excepcionales.',
    stars: 5,
  },
  {
    name: 'María Fernanda Ruiz',
    role: 'Directora de RRHH',
    company: 'Corporación financiera',
    text: 'La Oficina Virtual nos permite gestionar todos los viajes de nuestros ejecutivos desde un solo lugar. Los reportes personalizados nos dan visibilidad total del gasto.',
    stars: 5,
  },
  {
    name: 'Roberto Terrazas',
    role: 'Coordinador de Operaciones',
    company: 'Empresa de energía',
    text: 'El Plan Prepago nos da exactamente el control presupuestario que necesitábamos. Sin sorpresas, sin sobrecostos. El rastreo GPS nos da tranquilidad con cada traslado.',
    stars: 5,
  },
]

function SatisfiedClientsSection() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    let animId: number
    let pos = 0
    const speed = 0.5
    const step = () => {
      pos += speed
      if (pos >= el.scrollWidth / 2) pos = 0
      el.style.transform = `translateX(-${pos}px)`
      animId = requestAnimationFrame(step)
    }
    animId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 mb-4">
              <Users className="w-4 h-4 text-[#00E676]" />
              <span className="text-sm text-[#00E676]">Confianza Corporativa</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Más de 200 Clientes Satisfechos que Están{' '}
              <span className="bg-gradient-to-r from-[#00E676] to-[#71B124] bg-clip-text text-transparent">
                Ahorrando con Ecotaxi
              </span>
            </h2>
          </div>
        </AnimatedSection>

        {/* Scrolling logos marquee */}
        <AnimatedSection>
          <div className="mb-16 overflow-hidden">
            <div className="mb-4 text-center text-xs text-white/30 uppercase tracking-widest">
              Empresas que confían en nosotros
            </div>
            <div className="relative">
              {/* Fade edges */}
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0a0e17] to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0a0e17] to-transparent z-10" />

              <div ref={scrollRef} className="flex gap-6 whitespace-nowrap">
                {/* Double the items for infinite scroll */}
                {[...clientNames, ...clientNames].map((name, i) => (
                  <div
                    key={`${name}-${i}`}
                    className="flex items-center justify-center px-6 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] shrink-0"
                  >
                    <Building2 className="w-4 h-4 text-white/20 mr-2" />
                    <span className="text-sm text-white/40 font-medium">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <AnimatedSection key={t.name} delay={i * 150}>
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm h-full flex flex-col">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-[#FF9800] text-[#FF9800]" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-sm text-white/60 leading-relaxed mb-6 flex-1">
                  &ldquo;{t.text}&rdquo;
                </p>

                {/* Author */}
                <div className="pt-4 border-t border-white/[0.06]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0077BD]/20 to-[#00E676]/20 flex items-center justify-center">
                      <span className="text-sm font-bold text-[#00E676]">
                        {t.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{t.name}</div>
                      <div className="text-xs text-white/40">{t.role} · {t.company}</div>
                    </div>
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
   8. CONTACT / CTA SECTION
   ═══════════════════════════════════════════════════════════════════════════════ */
function ContactSection() {
  const [formData, setFormData] = useState({
    empresa: '',
    nombre: '',
    cargo: '',
    email: '',
    telefono: '',
    colaboradores: '',
    plan: '',
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
              <span className="text-sm text-[#0077BD]">Contacto Corporativo</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Convierte a Ecotaxi en tu{' '}
              <span className="bg-gradient-to-r from-[#0077BD] to-[#00E676] bg-clip-text text-transparent">
                Aliado Estratégico
              </span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              Solicita una propuesta personalizada para tu empresa. Nuestro equipo te contactará en menos de 24 horas.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <AnimatedSection className="lg:col-span-3">
            <div className="p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#00E676]/15 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8 text-[#00E676]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">¡Solicitud Enviada!</h3>
                  <p className="text-white/50">Nuestro equipo se pondrá en contacto contigo pronto.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Empresa</label>
                      <input
                        name="empresa"
                        value={formData.empresa}
                        onChange={handleChange}
                        required
                        placeholder="Nombre de la empresa"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#00E676]/30 focus:ring-1 focus:ring-[#00E676]/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Nombre</label>
                      <input
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                        placeholder="Tu nombre completo"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#00E676]/30 focus:ring-1 focus:ring-[#00E676]/20 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Cargo</label>
                      <input
                        name="cargo"
                        value={formData.cargo}
                        onChange={handleChange}
                        placeholder="Gerente, Director, etc."
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#00E676]/30 focus:ring-1 focus:ring-[#00E676]/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Email</label>
                      <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="correo@empresa.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#00E676]/30 focus:ring-1 focus:ring-[#00E676]/20 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Teléfono</label>
                      <input
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        placeholder="+591 ..."
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#00E676]/30 focus:ring-1 focus:ring-[#00E676]/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">N° Colaboradores</label>
                      <input
                        name="colaboradores"
                        value={formData.colaboradores}
                        onChange={handleChange}
                        placeholder="Ej: 50"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#00E676]/30 focus:ring-1 focus:ring-[#00E676]/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Plan de Interés</label>
                      <select
                        name="plan"
                        value={formData.plan}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-[#00E676]/30 focus:ring-1 focus:ring-[#00E676]/20 transition-all appearance-none"
                      >
                        <option value="" className="bg-[#0a0e17]">Seleccionar...</option>
                        <option value="prepago" className="bg-[#0a0e17]">Plan Prepago</option>
                        <option value="cash" className="bg-[#0a0e17]">Plan Cash</option>
                        <option value="postpago" className="bg-[#0a0e17]">Plan Post Pago</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Mensaje</label>
                    <textarea
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Cuéntanos sobre tus necesidades de transporte corporativo..."
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#00E676]/30 focus:ring-1 focus:ring-[#00E676]/20 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-lg font-bold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all duration-300 shadow-[0_0_30px_rgba(0,230,118,0.3)] hover:shadow-[0_0_50px_rgba(0,230,118,0.5)] hover:scale-[1.02]"
                  >
                    Solicitar Propuesta
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </form>
              )}
            </div>
          </AnimatedSection>

          {/* Contact info sidebar */}
          <AnimatedSection className="lg:col-span-2" delay={200}>
            <div className="space-y-6 h-full flex flex-col justify-between">
              {/* Quick contact cards */}
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-white mb-4">Contacto Directo</h3>
                <div className="space-y-4">
                  <a
                    href="tel:+59133296885"
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-[#0077BD]/20 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#0077BD]/10 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-[#0077BD]" />
                    </div>
                    <div>
                      <div className="text-xs text-white/40">Llámanos</div>
                      <div className="text-sm text-white/80 group-hover:text-white transition-colors">(+591) 3 3296885</div>
                    </div>
                  </a>

                  <a
                    href="mailto:info@ecotaxi-bo.com"
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-[#00E676]/20 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#00E676]/10 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-[#00E676]" />
                    </div>
                    <div>
                      <div className="text-xs text-white/40">Email</div>
                      <div className="text-sm text-white/80 group-hover:text-white transition-colors">info@ecotaxi-bo.com</div>
                    </div>
                  </a>

                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="w-10 h-10 rounded-xl bg-[#71B124]/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-[#71B124]" />
                    </div>
                    <div>
                      <div className="text-xs text-white/40">Ubicación</div>
                      <div className="text-sm text-white/80">Santa Cruz de la Sierra, Bolivia</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Virtual office quick access */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#00E676]/5 to-[#0077BD]/5 border border-[#00E676]/15">
                <div className="flex items-center gap-2 mb-3">
                  <MonitorSmartphone className="w-5 h-5 text-[#00E676]" />
                  <span className="text-sm font-semibold text-[#00E676]">Oficina Virtual</span>
                </div>
                <p className="text-xs text-white/50 mb-4">
                  ¿Ya eres cliente corporativo? Accede a tu plataforma de gestión.
                </p>
                <a
                  href="https://ecotaxi-kc.tm.taxi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#00E676] hover:text-[#00ff88] transition-colors"
                >
                  Acceder ahora <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Trust indicators */}
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <div className="grid grid-cols-2 gap-4 text-center">
                  {[
                    { value: '200+', label: 'Empresas activas' },
                    { value: '10+', label: 'Años de experiencia' },
                    { value: '30%', label: 'Ahorro promedio' },
                    { value: '24/7', label: 'Soporte' },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <div className="text-xl font-bold text-[#00E676]">{stat.value}</div>
                      <div className="text-[10px] text-white/35 mt-0.5">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════════════════════ */
export default function CorporativoPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0e17]">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <WhyChooseUsSection />
        <PaymentPlansSection />
        <SavingsSection />
        <VirtualOfficeSection />
        <ProfessionalDriversSection />
        <SatisfiedClientsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
