'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import {
  HardHat, Wrench, MapPin, Clock, Calculator, Smartphone,
  ChevronRight, ChevronLeft, Phone, CheckCircle2, ArrowRight,
  Truck, Settings, Hammer, Mountain, CircleDot, Route,
  Send, MessageCircle, Eye, Shield, TrendingUp, Handshake,
  FileText, UserCheck, Building2, TreePine, Star, Award
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
   0. HERO SLIDESHOW BANNER
   ═══════════════════════════════════════════════════════════════════════════════ */
const heroSlides = [
  {
    image: '/banner/maquinaria/escavadora.webp',
    label: 'Excavadora',
    desc: 'Potencia y precisión para excavación pesada y cimentaciones profundas',
    color: '#EAB308',
  },
  {
    image: '/banner/maquinaria/motoniveladora.webp',
    label: 'Motoniveladora',
    desc: 'Nivelación profesional de terrenos y afinado de superficies viales',
    color: '#F97316',
  },
  {
    image: '/banner/maquinaria/pala.webp',
    label: 'Pala Cargadora',
    desc: 'Carga masiva de materiales pesados con balde de hasta 4.5 m³',
    color: '#10B981',
  },
  {
    image: '/banner/maquinaria/retroexcavadora.webp',
    label: 'Retroexcavadora',
    desc: 'Excavación, zanjas y movimiento de tierra eficiente en todo terreno',
    color: '#3B82F6',
  },
]

function HeroSlideshow() {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const total = heroSlides.length

  const goTo = useCallback((index: number) => {
    setCurrent((index + total) % total)
  }, [total])

  const next = useCallback(() => goTo(current + 1), [current, goTo])
  const prev = useCallback(() => goTo(current - 1), [current, goTo])

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % total)
    }, 5000)
    return () => clearInterval(timer)
  }, [isPaused, total])

  const slide = heroSlides[current]

  return (
    <section
      className="relative h-[70vh] md:h-[80vh] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background images — crossfade */}
      {heroSlides.map((s, i) => (
        <div
          key={s.image}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img
            src={s.image}
            alt={s.label}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Light gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0e17]/75 via-[#0a0e17]/40 to-[#0a0e17]/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e17]/80 via-transparent to-[#0a0e17]/50" />

      {/* Side accent glow */}
      <div
        className="absolute -left-20 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[150px] transition-colors duration-1000"
        style={{ backgroundColor: `${slide.color}20` }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-xl">
            <div
              key={`badge-${current}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-sm mb-6 animate-fade-in"
              style={{
                backgroundColor: `${slide.color}15`,
                borderColor: `${slide.color}30`,
              }}
            >
              <HardHat className="w-4 h-4" style={{ color: slide.color }} />
              <span className="text-sm font-medium" style={{ color: slide.color }}>
                {slide.label}
              </span>
            </div>

            <h2
              key={`title-${current}`}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight animate-fade-in"
            >
              {slide.desc}
            </h2>

            <p className="text-white/60 text-lg mb-8 max-w-md leading-relaxed">
              La maquinaria amarilla que tu obra necesita, con operador profesional incluido y control total desde tu celular.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="#cotizar"
                className="px-6 py-3 rounded-full font-semibold text-black transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: slide.color,
                  boxShadow: `0 0 25px ${slide.color}40`,
                }}
              >
                Solicitar Maquinaria Ahora
              </a>
              <a
                href="#flota"
                className="px-6 py-3 rounded-full font-semibold text-white border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300"
              >
                Ver Maquinaria
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-black/50 hover:border-white/20 transition-all duration-300"
        aria-label="Anterior"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-black/50 hover:border-white/20 transition-all duration-300"
        aria-label="Siguiente"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {heroSlides.map((s, i) => (
          <button
            key={s.image}
            onClick={() => goTo(i)}
            className="group relative flex items-center justify-center"
            aria-label={`Ir a slide ${i + 1}`}
          >
            {i === current ? (
              <div
                className="w-10 h-3 rounded-full transition-all duration-500"
                style={{ backgroundColor: slide.color }}
              />
            ) : (
              <div className="w-3 h-3 rounded-full bg-white/30 group-hover:bg-white/60 transition-all duration-300" />
            )}
          </button>
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-1 bg-white/5">
        <div
          className="h-full transition-all duration-[5000ms] ease-linear"
          style={{
            width: isPaused ? '0%' : '100%',
            backgroundColor: slide.color,
            transition: isPaused ? 'none' : 'width 5s linear',
          }}
        />
      </div>

      {/* Slide counter */}
      <div className="absolute top-6 right-6 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-sm border border-white/10">
        <span className="text-sm font-bold text-white">{String(current + 1).padStart(2, '0')}</span>
        <span className="text-xs text-white/30">/</span>
        <span className="text-sm text-white/50">{String(total).padStart(2, '0')}</span>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   1. HERO SECTION
   ═══════════════════════════════════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#1a1408] to-[#0a0e17]" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(234,179,8,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(234,179,8,0.4) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[#EAB308]/12 blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#F97316]/10 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[#10B981]/6 blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Decorative icons */}
      <div className="absolute top-32 right-[8%] md:right-[18%] opacity-[0.07]">
        <HardHat className="w-28 h-28 md:w-40 md:h-40 text-[#EAB308]" />
      </div>
      <div className="absolute bottom-28 left-[5%] md:left-[12%] opacity-[0.05]">
        <Wrench className="w-20 h-20 md:w-28 md:h-28 text-[#F97316]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 pb-16">
        {/* Badge */}
        <AnimatedSection>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EAB308]/10 border border-[#EAB308]/25 mb-8 backdrop-blur-sm">
            <HardHat className="w-4 h-4 text-[#EAB308]" />
            <span className="text-sm text-[#EAB308] font-medium">Maquinaria Pesada a Demanda</span>
          </div>
        </AnimatedSection>

        {/* Title */}
        <AnimatedSection delay={100}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Maquinaria Amarilla{' '}
            <span className="bg-gradient-to-r from-[#EAB308] via-[#F97316] to-[#EAB308] bg-clip-text text-transparent">
              cerca de ti
            </span>
          </h1>
        </AnimatedSection>

        {/* Slogan */}
        <AnimatedSection delay={200}>
          <p className="text-lg md:text-xl text-white/50 max-w-3xl mx-auto mb-4 leading-relaxed font-medium italic">
            &ldquo;Te conectamos al instante con la maquinaria ideal para tu obra o proyecto.&rdquo;
          </p>
        </AnimatedSection>

        {/* Description */}
        <AnimatedSection delay={250}>
          <p className="text-base text-white/40 max-w-2xl mx-auto mb-10 leading-relaxed">
            La primera plataforma en Bolivia para alquilar maquinaria amarilla por hora o por contrato. Con operador incluido, monitoreo GPS y tarifas transparentes.
          </p>
        </AnimatedSection>

        {/* CTA Buttons */}
        <AnimatedSection delay={350}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a
              href="#flota"
              className="px-8 py-4 rounded-full text-lg font-semibold text-black bg-[#EAB308] hover:bg-[#FBBF24] transition-all duration-300 shadow-[0_0_30px_rgba(234,179,8,0.3)] hover:shadow-[0_0_50px_rgba(234,179,8,0.5)] hover:scale-105"
            >
              <HardHat className="w-5 h-5 inline mr-2" />
              Ver Maquinaria Disponible
            </a>
            <a
              href="#cotizar"
              className="px-8 py-4 rounded-full text-lg font-semibold text-[#EAB308] border border-[#EAB308]/30 hover:border-[#EAB308]/60 hover:bg-[#EAB308]/5 transition-all duration-300"
            >
              Cotizar Ahora
            </a>
          </div>
        </AnimatedSection>

        {/* Stats bar */}
        <AnimatedSection delay={400}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { value: '7', label: 'Tipos de Máquina', icon: Wrench },
              { value: 'x Hora', label: 'O por Contrato', icon: Clock },
              { value: 'PRO', label: 'Operadores Incluidos', icon: UserCheck },
              { value: 'GPS', label: 'Monitoreo Satelital', icon: MapPin },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-4 rounded-2xl bg-white/[0.03] border border-[#EAB308]/10 backdrop-blur-sm hover:border-[#EAB308]/20 transition-all duration-300"
              >
                <stat.icon className="w-5 h-5 text-[#EAB308] mx-auto mb-2" />
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
   2. MACHINERY FLEET SECTION — 7 types with construction specs
   ═══════════════════════════════════════════════════════════════════════════════ */
const machineryTypes = [
  {
    name: 'Volqueta',
    desc: 'Transporte de material, escombros y agregados para obras de construcción y demolición.',
    specs: [
      { label: 'Capacidad', value: '6-12 m³' },
      { label: 'Carga', value: 'Hidráulica' },
      { label: 'Ideal para', value: 'Escombros y material' },
    ],
    color: '#EAB308',
    image: '/vehicles/10-CONSTRUCCION/volqueta.png',
    icon: Truck,
    popular: true,
  },
  {
    name: 'Bobcat (Mini Cargadora)',
    desc: 'Versatilidad en espacios reducidos con múltiples accesorios disponibles.',
    specs: [
      { label: 'Accesorio', value: 'Horquilla / Cuchara' },
      { label: 'Operación', value: 'Espacios reducidos' },
      { label: 'Ideal para', value: 'Carga y nivelación' },
    ],
    color: '#F97316',
    image: '/vehicles/10-CONSTRUCCION/bobcat.png',
    icon: Settings,
    popular: false,
  },
  {
    name: 'Gallinita (Retroexcavadora)',
    desc: 'Excavación, apertura de zanjas y movimiento de tierra eficiente en todo tipo de terreno.',
    specs: [
      { label: 'Capacidad', value: 'Balde frontal 1.0 m³ / Cucharón trasero 0.26 m³' },
      { label: 'Tipo', value: 'Maquinaria de excavación y carga' },
      { label: 'Ideal para', value: 'Zanjas, cimientos, demoliciones, carga y nivelación' },
    ],
    color: '#3B82F6',
    image: '/vehicles/10-CONSTRUCCION/gallinita.png',
    icon: Hammer,
    popular: false,
  },
  {
    name: 'Motoniveladora',
    desc: 'Nivelación de terrenos, afinado de superficies y apertura de vías.',
    specs: [
      { label: 'Alcance', value: 'Hoja 3.6-4.2 m' },
      { label: 'Función', value: 'Nivelación y afinado' },
      { label: 'Ideal para', value: 'Caminos y calles' },
    ],
    color: '#10B981',
    image: '/vehicles/10-CONSTRUCCION/motoniveladora.png',
    icon: Route,
    popular: false,
  },
  {
    name: 'Pala Cargadora',
    desc: 'Movimiento, elevación y carga masiva de materiales pesados en terrenos de obra.',
    specs: [
      { label: 'Capacidad', value: 'Balde frontal 2.0–4.5 m³ (según modelo)' },
      { label: 'Tipo', value: 'Maquinaria de carga y empuje' },
      { label: 'Ideal para', value: 'Carga de volquetas, traslado de agregados y despeje' },
    ],
    color: '#8B5CF6',
    image: '/vehicles/10-CONSTRUCCION/retrocabadora.png',
    icon: Mountain,
    popular: false,
  },
  {
    name: 'Excavadora',
    desc: 'Potencia pura para excavación pesada, cimentaciones profundas y demolición controlada.',
    specs: [
      { label: 'Balde', value: '0.2-1.2 m³' },
      { label: 'Peso', value: '8-35 ton' },
      { label: 'Ideal para', value: 'Excavación pesada' },
    ],
    color: '#EF4444',
    image: '/vehicles/10-CONSTRUCCION/excavadora.png',
    icon: HardHat,
    popular: false,
  },
  {
    name: 'Aplanadora (Compactadora)',
    desc: 'Compactación de suelos, asfalto y superficies para lograr firmeza uniforme.',
    specs: [
      { label: 'Peso', value: '8-20 ton' },
      { label: 'Tipo', value: 'Liso / Pata de cabra' },
      { label: 'Ideal para', value: 'Bases y asfalto' },
    ],
    color: '#06B6D4',
    image: '/vehicles/10-CONSTRUCCION/aplanadora.png',
    icon: CircleDot,
    popular: false,
  },
]

function FleetSection() {
  return (
    <section id="flota" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-[#EAB308]/5 blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EAB308]/10 border border-[#EAB308]/20 mb-4">
              <Wrench className="w-4 h-4 text-[#EAB308]" />
              <span className="text-sm text-[#EAB308]">Catálogo de Maquinaria</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              La Maquinaria Amarilla que necesitas,{' '}
              <span className="bg-gradient-to-r from-[#EAB308] via-[#F97316] to-[#EAB308] bg-clip-text text-transparent">
                cerca de ti
              </span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              Toda la maquinaria con operador profesional incluido y especificaciones técnicas reales del rubro.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {machineryTypes.map((machine, i) => (
            <AnimatedSection key={machine.name} delay={i * 80}>
              <div className="group relative rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-white/10 transition-all duration-500 h-full overflow-hidden">
                {/* Popular badge */}
                {machine.popular && (
                  <div className="absolute top-3 right-3 z-20">
                    <span className="px-2.5 py-1 rounded-full text-[9px] font-bold text-black bg-[#EAB308] shadow-[0_0_15px_rgba(234,179,8,0.3)]">
                      MÁS SOLICITADA
                    </span>
                  </div>
                )}

                {/* Vehicle image — full width, clearly visible */}
                <div className="relative h-48 w-full bg-gradient-to-b from-transparent to-[#0a0e17]/60"
                  style={{ background: `linear-gradient(180deg, ${machine.color}08 0%, transparent 60%, rgba(10,14,23,0.6) 100%)` }}
                >
                  <img
                    src={machine.image}
                    alt={machine.name}
                    className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.12)] group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Color accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1" style={{ backgroundColor: machine.color }} />
                  {/* Glow behind image */}
                  <div
                    className="absolute inset-0 opacity-20 blur-2xl pointer-events-none"
                    style={{ background: `radial-gradient(circle, ${machine.color}30, transparent 70%)` }}
                  />
                </div>

                <div className="relative z-10 p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <machine.icon className="w-4 h-4" style={{ color: machine.color }} />
                    <h3 className="text-base font-bold text-white">{machine.name}</h3>
                  </div>
                  <p className="text-xs text-white/40 leading-relaxed mb-4">{machine.desc}</p>

                  {/* Construction specs — NOT A/C or luggage */}
                  <div className="space-y-2">
                    {machine.specs.map((spec) => (
                      <div key={spec.label} className="flex items-center justify-between">
                        <span className="text-[11px] text-white/30">{spec.label}</span>
                        <span className="text-[11px] font-semibold" style={{ color: machine.color }}>{spec.value}</span>
                      </div>
                    ))}
                  </div>

                  <a
                    href="#cotizar"
                    className="inline-flex items-center gap-1.5 mt-4 px-3 py-1.5 rounded-full text-xs font-semibold text-black transition-all duration-300 hover:scale-105"
                    style={{ backgroundColor: machine.color }}
                  >
                    Cotizar
                    <ArrowRight className="w-3 h-3" />
                  </a>
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
   3. HOW IT WORKS SECTION — Control total de tu obra
   ═══════════════════════════════════════════════════════════════════════════════ */
const howSteps = [
  {
    step: '01',
    icon: MapPin,
    title: 'Localización Estratégica',
    desc: 'Encuentra operadores y equipos pesados disponibles en tiempo real, ubicados lo más cerca posible de tu zona de trabajo para minimizar tiempos de traslado y optimizar costos de movilización.',
    color: '#EAB308',
  },
  {
    step: '02',
    icon: Eye,
    title: 'Monitoreo en Tiempo Real',
    desc: 'Realiza el seguimiento satelital (GPS) desde nuestra App o Web para ver el desplazamiento del equipo hacia tu obra y el progreso del trabajo ejecutado. Control total desde tu celular.',
    color: '#3B82F6',
  },
  {
    step: '03',
    icon: Clock,
    title: 'Control de Tiempos y Tareas',
    desc: 'Registra de forma exacta el tiempo real de uso y las tareas cumplidas por el operador, evitando malentendidos o cobros injustos. Cada hora queda documentada con precisión.',
    color: '#F97316',
  },
  {
    step: '04',
    icon: Calculator,
    title: 'Cálculo de Costo Real',
    desc: 'Nuestra plataforma calcula la tarifa exacta según la labor y el tiempo de ejecución en base a métricas claras, garantizándote transparencia total en tu presupuesto.',
    color: '#10B981',
  },
]

function HowItWorksSection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#080c15] to-[#0a0e17]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F97316]/10 border border-[#F97316]/20 mb-4">
              <Wrench className="w-4 h-4 text-[#F97316]" />
              <span className="text-sm text-[#F97316]">Control Total</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              El control total de tu obra{' '}
              <span className="bg-gradient-to-r from-[#EAB308] to-[#F97316] bg-clip-text text-transparent">
                en tus manos
              </span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              Monitoreo, control y transparencia en cada hora de trabajo de la maquinaria.
            </p>
          </div>
        </AnimatedSection>

        {/* Timeline */}
        <div className="relative">
          {/* Horizontal connector line (desktop) */}
          <div className="hidden lg:block absolute top-[52px] left-[12.5%] right-[12.5%] h-[2px] bg-gradient-to-r from-[#EAB308]/30 via-[#3B82F6]/30 via-[#F97316]/30 to-[#10B981]/30" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howSteps.map((step, i) => (
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
                  {i < howSteps.length - 1 && (
                    <div className="lg:hidden flex justify-center my-4">
                      <ChevronRight className="w-5 h-5 text-white/20 rotate-90" />
                    </div>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* CTA after how it works */}
        <AnimatedSection delay={600}>
          <div className="text-center mt-12 p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-[#EAB308]/10 max-w-2xl mx-auto">
            <p className="text-white/60 text-base mb-4">
              ¿Tienes un proyecto en mente? Ingresa a la plataforma, selecciona la maquinaria que requiere tu labor, define el punto de la obra y reserva al instante.
            </p>
            <a
              href="#cotizar"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg font-semibold text-black bg-[#EAB308] hover:bg-[#FBBF24] transition-all duration-300 shadow-[0_0_30px_rgba(234,179,8,0.3)] hover:shadow-[0_0_50px_rgba(234,179,8,0.5)] hover:scale-105"
            >
              Solicitar Maquinaria Ahora
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   4. PROVIDER / PARTNER SECTION — Different background (dark grey + yellow accents)
   ═══════════════════════════════════════════════════════════════════════════════ */
const providerBenefits = [
  {
    icon: TrendingUp,
    title: 'Más Clientes, Cero Tiempo Muerto',
    desc: 'Reduce los días en que tus máquinas están paradas. Recibe solicitudes de trabajo directo en tu panel de control.',
    color: '#EAB308',
  },
  {
    icon: Shield,
    title: 'Transparencia en el Pago',
    desc: 'Gracias a nuestro sistema de medición de tiempo y tareas ejecutadas, cada hora de trabajo de tu equipo queda registrada de manera justa y transparente.',
    color: '#10B981',
  },
  {
    icon: Building2,
    title: 'Panel de Gestión Corporativo',
    desc: 'Administra toda tu flota disponible, gestiona tus operadores y visualiza tus ingresos acumulados desde un solo lugar.',
    color: '#3B82F6',
  },
]

const providerSteps = [
  {
    step: '1',
    title: 'Regístrate en Línea',
    desc: 'Completa el formulario de afiliación con tus datos o los de tu empresa.',
    color: '#EAB308',
  },
  {
    step: '2',
    title: 'Sube tu Flota',
    desc: 'Registra las características, fotos y documentos vigentes de tus maquinarias.',
    color: '#F97316',
  },
  {
    step: '3',
    title: '¡Empieza a Facturar!',
    desc: 'Activa la disponibilidad de tus equipos y comienza a recibir solicitudes de obras cercanas.',
    color: '#10B981',
  },
]

function ProviderSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Different background — dark grey with yellow/green construction accents */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0f14] via-[#111318] to-[#0d0f14]" />

      {/* Yellow accent glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] rounded-full bg-[#EAB308]/6 blur-[180px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#10B981]/4 blur-[150px]" />

      {/* Construction pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(234,179,8,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(234,179,8,0.5) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 mb-4">
              <Handshake className="w-4 h-4 text-[#10B981]" />
              <span className="text-sm text-[#10B981]">Genera Ingresos con Nosotros</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              ¿Tienes maquinaria pesada?{' '}
              <span className="bg-gradient-to-r from-[#EAB308] to-[#10B981] bg-clip-text text-transparent">
                Genera ingresos
              </span>
            </h2>
            <p className="text-white/50 max-w-3xl mx-auto text-lg">
              Únete a nuestra red de Proveedores de Maquinaria. Si eres dueño de maquinaria amarilla o representas a una empresa de servicios de construcción, Ecotaxi es tu mejor aliado comercial. Ponemos tus equipos a la vista de cientos de contratistas, ingenieros y constructoras que buscan servicios diariamente.
            </p>
          </div>
        </AnimatedSection>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {providerBenefits.map((benefit, i) => (
            <AnimatedSection key={benefit.title} delay={i * 150}>
              <div className="group relative p-6 md:p-8 rounded-2xl bg-white/[0.04] border border-[#EAB308]/10 backdrop-blur-sm hover:border-[#EAB308]/20 transition-all duration-500 h-full">
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ boxShadow: `0 0 30px ${benefit.color}08` }}
                />
                <div className="relative z-10 text-center">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: `${benefit.color}15` }}
                  >
                    <benefit.icon className="w-8 h-8" style={{ color: benefit.color }} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{benefit.desc}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* How to start */}
        <AnimatedSection delay={200}>
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-10">
              ¿Cómo empezar a{' '}
              <span className="text-[#EAB308]">ofertar</span>?
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {providerSteps.map((step, i) => (
                <div key={step.step} className="relative text-center">
                  {/* Step number */}
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold text-black"
                    style={{ backgroundColor: step.color }}
                  >
                    {step.step}
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">{step.title}</h4>
                  <p className="text-sm text-white/40 leading-relaxed">{step.desc}</p>

                  {/* Connector line */}
                  {i < providerSteps.length - 1 && (
                    <div className="hidden md:block absolute top-7 left-[calc(50%+40px)] right-[calc(-50%+40px)] h-[2px] bg-gradient-to-r from-[#EAB308]/20 to-[#F97316]/20" />
                  )}
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="text-center mt-10">
              <a
                href="#registro-proveedor"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg font-semibold text-black bg-[#10B981] hover:bg-[#34D399] transition-all duration-300 shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_50px_rgba(16,185,129,0.5)] hover:scale-105"
              >
                <Building2 className="w-5 h-5" />
                Registrar mi Empresa / Maquinaria
              </a>
              <p className="text-white/30 text-sm mt-3">Serás dirigido al formulario de registro</p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   5. PROVIDER REGISTRATION FORM SECTION
   ═══════════════════════════════════════════════════════════════════════════════ */
function ProviderRegistrationSection() {
  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    cargo: '',
    email: '',
    telefono: '',
    ciudad: '',
    tiposMaquinaria: '',
    cantidadEquipos: '',
    marcas: '',
    operadores: '',
    experiencia: '',
    servicios: '',
    disponibilidad: '',
    mensaje: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/maquinaria-proveedor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Error al enviar el registro')
        return
      }

      setSubmitted(true)
      setFormData({
        nombre: '', empresa: '', cargo: '', email: '', telefono: '',
        ciudad: '', tiposMaquinaria: '', cantidadEquipos: '', marcas: '',
        operadores: '', experiencia: '', servicios: '', disponibilidad: '', mensaje: '',
      })
    } catch {
      setError('Error de conexión. Inténtalo de nuevo.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="registro-proveedor" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background — darker with green/yellow construction accents */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1a14] to-[#0a0e17]" />

      {/* Green accent glow */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[400px] rounded-full bg-[#10B981]/6 blur-[180px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] rounded-full bg-[#EAB308]/4 blur-[150px]" />

      {/* Construction pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(16,185,129,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.5) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 mb-4">
              <Building2 className="w-4 h-4 text-[#10B981]" />
              <span className="text-sm text-[#10B981]">Registro de Proveedor</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Registra tu{' '}
              <span className="bg-gradient-to-r from-[#10B981] to-[#EAB308] bg-clip-text text-transparent">
                Empresa o Maquinaria
              </span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              Completa el formulario y tu solicitud será enviada automáticamente a nuestro equipo. Nos pondremos en contacto contigo para activar tu cuenta de proveedor.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          {submitted ? (
            <div className="text-center p-8 md:p-12 rounded-2xl bg-[#10B981]/5 border border-[#10B981]/20">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 bg-[#10B981]/15">
                <CheckCircle2 className="w-10 h-10 text-[#10B981]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">¡Registro Enviado!</h3>
              <p className="text-white/50 text-lg max-w-md mx-auto mb-2">
                Tu solicitud ha sido enviada exitosamente a <span className="text-[#10B981] font-semibold">ecotaxi@oyc-sr.com</span>.
              </p>
              <p className="text-white/40 text-base max-w-md mx-auto">
                Nuestro equipo revisará tu información y se pondrá en contacto contigo en las próximas 24-48 horas para activar tu cuenta de proveedor.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 px-6 py-3 rounded-full text-sm font-semibold text-[#10B981] border border-[#10B981]/30 hover:border-[#10B981]/60 hover:bg-[#10B981]/5 transition-all duration-300"
              >
                Registrar otra empresa
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-[#10B981]/10 backdrop-blur-sm space-y-6"
            >
              {/* Error message */}
              {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {error}
                </div>
              )}

              {/* Section: Datos del Proveedor */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-[#10B981]" />
                  Datos del Proveedor
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-white/60 mb-1.5">Nombre / Representante *</label>
                    <input
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                      type="text"
                      placeholder="Tu nombre completo"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/20 focus:border-[#10B981]/40 focus:outline-none transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-1.5">Nombre de Empresa</label>
                    <input
                      name="empresa"
                      value={formData.empresa}
                      onChange={handleChange}
                      type="text"
                      placeholder="Razón social o nombre comercial"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/20 focus:border-[#10B981]/40 focus:outline-none transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-1.5">Cargo en la Empresa</label>
                    <input
                      name="cargo"
                      value={formData.cargo}
                      onChange={handleChange}
                      type="text"
                      placeholder="Ej: Gerente, Propietario"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/20 focus:border-[#10B981]/40 focus:outline-none transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-1.5">Email *</label>
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      type="email"
                      placeholder="correo@ejemplo.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/20 focus:border-[#10B981]/40 focus:outline-none transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-1.5">Teléfono *</label>
                    <input
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      required
                      type="tel"
                      placeholder="+591 ..."
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/20 focus:border-[#10B981]/40 focus:outline-none transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-1.5">Ciudad / Zona de Cobertura</label>
                    <input
                      name="ciudad"
                      value={formData.ciudad}
                      onChange={handleChange}
                      type="text"
                      placeholder="Ej: Santa Cruz, Cochabamba..."
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/20 focus:border-[#10B981]/40 focus:outline-none transition-colors text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-white/[0.06]" />

              {/* Section: Maquinaria Disponible */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <HardHat className="w-5 h-5 text-[#EAB308]" />
                  Maquinaria Disponible
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-white/60 mb-1.5">Tipo(s) de Maquinaria</label>
                    <select
                      name="tiposMaquinaria"
                      value={formData.tiposMaquinaria}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white focus:border-[#EAB308]/40 focus:outline-none transition-colors text-sm appearance-none"
                    >
                      <option value="" className="bg-[#0a0e17]">Selecciona una opción</option>
                      <option value="volqueta" className="bg-[#0a0e17]">Volqueta</option>
                      <option value="bobcat" className="bg-[#0a0e17]">Bobcat (Mini Cargadora)</option>
                      <option value="gallinita" className="bg-[#0a0e17]">Gallinita (Retroexcavadora)</option>
                      <option value="motoniveladora" className="bg-[#0a0e17]">Motoniveladora</option>
                      <option value="pala-cargadora" className="bg-[#0a0e17]">Pala Cargadora</option>
                      <option value="excavadora" className="bg-[#0a0e17]">Excavadora</option>
                      <option value="aplanadora" className="bg-[#0a0e17]">Aplanadora (Compactadora)</option>
                      <option value="multiple" className="bg-[#0a0e17]">Varios tipos (indicar en mensaje)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-1.5">Cantidad de Equipos</label>
                    <input
                      name="cantidadEquipos"
                      value={formData.cantidadEquipos}
                      onChange={handleChange}
                      type="text"
                      placeholder="Ej: 3 volquetas, 1 excavadora"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/20 focus:border-[#EAB308]/40 focus:outline-none transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-1.5">Marca(s) / Modelo(s)</label>
                    <input
                      name="marcas"
                      value={formData.marcas}
                      onChange={handleChange}
                      type="text"
                      placeholder="Ej: Caterpillar, Komatsu, Volvo"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/20 focus:border-[#EAB308]/40 focus:outline-none transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-1.5">Operadores Incluidos</label>
                    <select
                      name="operadores"
                      value={formData.operadores}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white focus:border-[#EAB308]/40 focus:outline-none transition-colors text-sm appearance-none"
                    >
                      <option value="" className="bg-[#0a0e17]">Selecciona una opción</option>
                      <option value="si" className="bg-[#0a0e17]">Sí, con operador profesional</option>
                      <option value="no" className="bg-[#0a0e17]">Sin operador</option>
                      <option value="ambos" className="bg-[#0a0e17]">Ambas opciones disponibles</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-white/[0.06]" />

              {/* Section: Información Adicional */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#3B82F6]" />
                  Información Adicional
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-white/60 mb-1.5">Experiencia en el Rubro</label>
                    <select
                      name="experiencia"
                      value={formData.experiencia}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white focus:border-[#3B82F6]/40 focus:outline-none transition-colors text-sm appearance-none"
                    >
                      <option value="" className="bg-[#0a0e17]">Selecciona una opción</option>
                      <option value="1-3" className="bg-[#0a0e17]">1 a 3 años</option>
                      <option value="3-5" className="bg-[#0a0e17]">3 a 5 años</option>
                      <option value="5-10" className="bg-[#0a0e17]">5 a 10 años</option>
                      <option value="10+" className="bg-[#0a0e17]">Más de 10 años</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-1.5">Disponibilidad</label>
                    <select
                      name="disponibilidad"
                      value={formData.disponibilidad}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white focus:border-[#3B82F6]/40 focus:outline-none transition-colors text-sm appearance-none"
                    >
                      <option value="" className="bg-[#0a0e17]">Selecciona una opción</option>
                      <option value="inmediata" className="bg-[#0a0e17]">Inmediata</option>
                      <option value="1-semana" className="bg-[#0a0e17]">Dentro de 1 semana</option>
                      <option value="2-semanas" className="bg-[#0a0e17]">Dentro de 2 semanas</option>
                      <option value="por-contrato" className="bg-[#0a0e17]">Solo por contrato previo</option>
                    </select>
                  </div>
                </div>
                <div className="mt-5">
                  <label className="block text-sm text-white/60 mb-1.5">Servicios que Ofrece</label>
                  <input
                    name="servicios"
                    value={formData.servicios}
                    onChange={handleChange}
                    type="text"
                    placeholder="Ej: Excavación, carga, transporte, nivelación, compactación..."
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/20 focus:border-[#3B82F6]/40 focus:outline-none transition-colors text-sm"
                  />
                </div>
                <div className="mt-5">
                  <label className="block text-sm text-white/60 mb-1.5">Mensaje Adicional</label>
                  <textarea
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Cuéntanos más sobre tu empresa, flota o cualquier detalle que consideres importante..."
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/20 focus:border-[#3B82F6]/40 focus:outline-none transition-colors text-sm resize-none"
                  />
                </div>
              </div>

              {/* Email info */}
              <div className="p-4 rounded-xl bg-[#10B981]/5 border border-[#10B981]/10">
                <div className="flex items-start gap-3">
                  <Send className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
                  <p className="text-sm text-white/50 leading-relaxed">
                    Tu solicitud será enviada automáticamente a <span className="text-[#10B981] font-semibold">ecotaxi@oyc-sr.com</span>. Nuestro equipo la revisará y se pondrá en contacto contigo.
                  </p>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-black bg-[#10B981] hover:bg-[#34D399] transition-all duration-300 shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {submitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Enviando Registro...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Enviar Registro de Proveedor
                  </>
                )}
              </button>
            </form>
          )}
        </AnimatedSection>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   6. CONTACT / CTA SECTION
   ═══════════════════════════════════════════════════════════════════════════════ */
function ContactSection() {
  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    email: '',
    telefono: '',
    tipoMaquina: '',
    modalidad: '',
    ubicacion: '',
    fecha: '',
    mensaje: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <section id="cotizar" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#080c15] to-[#0a0e17]" />

      {/* Accent glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[#EAB308]/5 blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EAB308]/10 border border-[#EAB308]/20 mb-4">
              <MessageCircle className="w-4 h-4 text-[#EAB308]" />
              <span className="text-sm text-[#EAB308]">Cotiza Ahora</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Solicita tu{' '}
              <span className="bg-gradient-to-r from-[#EAB308] to-[#F97316] bg-clip-text text-transparent">
                Cotización
              </span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              Completa el formulario y recibe una propuesta personalizada en minutos.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Info */}
          <AnimatedSection className="lg:col-span-2">
            <div className="space-y-6">
              {/* Phone */}
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-[#EAB308]/20 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#EAB308]/10 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-[#EAB308]" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Llámanos</h3>
                    <p className="text-white/40 text-sm mb-1">Atención inmediata para cotizaciones</p>
                    <a href="tel:73662803" className="text-[#EAB308] font-bold text-lg hover:underline">73662803</a>
                  </div>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-[#25D366]/20 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-6 h-6 text-[#25D366]" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">WhatsApp</h3>
                    <p className="text-white/40 text-sm mb-1">Cotización rápida por chat</p>
                    <a
                      href="https://wa.me/59173662803?text=Hola%2C%20necesito%20cotizar%20maquinaria%20pesada"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#25D366] font-bold text-lg hover:underline"
                    >
                      +591 73662803
                    </a>
                  </div>
                </div>
              </div>

              {/* App */}
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-[#3B82F6]/20 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center shrink-0">
                    <Smartphone className="w-6 h-6 text-[#3B82F6]" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">App Ecotaxi</h3>
                    <p className="text-white/40 text-sm mb-1">Reserva maquinaria desde la app</p>
                    <span className="text-[#3B82F6] font-semibold text-sm">Disponible en iOS y Android</span>
                  </div>
                </div>
              </div>

              {/* Quick tip */}
              <div className="p-5 rounded-2xl bg-[#F97316]/5 border border-[#F97316]/10">
                <div className="flex items-start gap-3">
                  <HardHat className="w-5 h-5 text-[#F97316] shrink-0 mt-0.5" />
                  <p className="text-sm text-white/50 leading-relaxed">
                    <span className="text-[#F97316] font-semibold">Tip:</span> Para cotizaciones más rápidas, indícanos el tipo de maquinaria, la ubicación de la obra y la duración estimada por WhatsApp.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Form */}
          <AnimatedSection className="lg:col-span-3" delay={200}>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-white/60 mb-1.5">Nombre completo</label>
                  <input
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    type="text"
                    placeholder="Tu nombre"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/20 focus:border-[#EAB308]/40 focus:outline-none transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-1.5">Empresa (opcional)</label>
                  <input
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleChange}
                    type="text"
                    placeholder="Nombre de empresa"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/20 focus:border-[#EAB308]/40 focus:outline-none transition-colors text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-white/60 mb-1.5">Email</label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="correo@ejemplo.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/20 focus:border-[#EAB308]/40 focus:outline-none transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-1.5">Teléfono</label>
                  <input
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    type="tel"
                    placeholder="+591 ..."
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/20 focus:border-[#EAB308]/40 focus:outline-none transition-colors text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-white/60 mb-1.5">Tipo de Maquinaria</label>
                  <select
                    name="tipoMaquina"
                    value={formData.tipoMaquina}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white focus:border-[#EAB308]/40 focus:outline-none transition-colors text-sm appearance-none"
                  >
                    <option value="" className="bg-[#0a0e17]">Selecciona una opción</option>
                    <option value="volqueta" className="bg-[#0a0e17]">Volqueta</option>
                    <option value="bobcat" className="bg-[#0a0e17]">Bobcat (Mini Cargadora)</option>
                    <option value="gallinita" className="bg-[#0a0e17]">Gallinita (Retroexcavadora)</option>
                    <option value="motoniveladora" className="bg-[#0a0e17]">Motoniveladora</option>
                    <option value="pala-cargadora" className="bg-[#0a0e17]">Pala Cargadora</option>
                    <option value="excavadora" className="bg-[#0a0e17]">Excavadora</option>
                    <option value="aplanadora" className="bg-[#0a0e17]">Aplanadora (Compactadora)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-1.5">Modalidad</label>
                  <select
                    name="modalidad"
                    value={formData.modalidad}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white focus:border-[#EAB308]/40 focus:outline-none transition-colors text-sm appearance-none"
                  >
                    <option value="" className="bg-[#0a0e17]">Selecciona modalidad</option>
                    <option value="hora" className="bg-[#0a0e17]">Por Hora</option>
                    <option value="contrato" className="bg-[#0a0e17]">Por Contrato</option>
                    <option value="proyecto" className="bg-[#0a0e17]">Por Proyecto</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-white/60 mb-1.5">Ubicación de la Obra</label>
                  <input
                    name="ubicacion"
                    value={formData.ubicacion}
                    onChange={handleChange}
                    type="text"
                    placeholder="Dirección o zona"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/20 focus:border-[#EAB308]/40 focus:outline-none transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-1.5">Fecha Requerida</label>
                  <input
                    name="fecha"
                    value={formData.fecha}
                    onChange={handleChange}
                    type="date"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white focus:border-[#EAB308]/40 focus:outline-none transition-colors text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-white/60 mb-1.5">Detalles del trabajo</label>
                <textarea
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Describe el tipo de trabajo, duración estimada y cualquier detalle adicional..."
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/20 focus:border-[#EAB308]/40 focus:outline-none transition-colors text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-black bg-[#EAB308] hover:bg-[#FBBF24] transition-all duration-300 shadow-[0_0_25px_rgba(234,179,8,0.3)] hover:shadow-[0_0_40px_rgba(234,179,8,0.5)] hover:scale-[1.02]"
              >
                <Send className="w-5 h-5" />
                Enviar Solicitud de Cotización
              </button>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════════════════════════════════════ */
export function MaquinariaPageContent() {
  return (
    <>
      <HeroSlideshow />
      <HeroSection />
      <FleetSection />
      <HowItWorksSection />
      <ProviderSection />
      <ProviderRegistrationSection />
      <ContactSection />
    </>
  )
}
