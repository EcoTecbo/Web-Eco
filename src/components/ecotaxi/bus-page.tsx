'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import {
  Bus, Users, Wind, Lightbulb, Briefcase, Plane, PartyPopper,
  Heart, Map, Shield, Clock, Smartphone, ChevronRight, ChevronLeft,
  Phone, CheckCircle2, ArrowRight, Award, Snowflake, Route,
  Send, MessageCircle, MapPin, Star, Headphones
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
    image: '/logistica-ruta.webp',
    label: 'Transporte Grupal',
    desc: 'El vehículo ideal para tu grupo, con chofer profesional',
    color: '#00E676',
  },
  {
    image: '/logistica-coordinar.webp',
    label: 'Viajes Especiales',
    desc: 'Rutas turísticas y traslados a cualquier destino del país',
    color: '#0077BD',
  },
  {
    image: '/logistica-mapa.webp',
    label: 'Cobertura Total',
    desc: 'Desde Santa Cruz hacia todo el territorio boliviano',
    color: '#FF9800',
  },
  {
    image: '/logistica-check.webp',
    label: 'Puntualidad Garantizada',
    desc: 'Monitoreo riguroso para que tu itinerario se cumpla sin retrasos',
    color: '#8B5CF6',
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

      {/* Light gradient overlay — images visible */}
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
              <Bus className="w-4 h-4" style={{ color: slide.color }} />
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
              Transporte grupal con chofer profesional, máxima comodidad y la seguridad que tu grupo merece.
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
                Cotizar Transporte Grupal
              </a>
              <a
                href="#flota"
                className="px-6 py-3 rounded-full font-semibold text-white border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300"
              >
                Ver Flota
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
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,119,189,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,119,189,0.3) 1px, transparent 1px)`,
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
            <Bus className="w-4 h-4 text-[#0077BD]" />
            <span className="text-sm text-[#0077BD] font-medium">Transporte Grupal y Viajes Especiales</span>
          </div>
        </AnimatedSection>

        {/* Title */}
        <AnimatedSection delay={100}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Transporte Grupal y{' '}
            <span className="bg-gradient-to-r from-[#0077BD] via-[#00E676] to-[#0077BD] bg-clip-text text-transparent">
              Viajes Especiales
            </span>
          </h1>
        </AnimatedSection>

        {/* Slogan */}
        <AnimatedSection delay={200}>
          <p className="text-lg md:text-xl text-white/50 max-w-3xl mx-auto mb-4 leading-relaxed font-medium italic">
            &ldquo;El vehículo ideal para tu grupo, con chofer profesional y máxima comodidad.&rdquo;
          </p>
        </AnimatedSection>

        {/* Brief description */}
        <AnimatedSection delay={250}>
          <p className="text-base text-white/40 max-w-2xl mx-auto mb-10 leading-relaxed">
            Ya sea un traslado ejecutivo, un city tour o una excursión interprovincial, tenemos el bus perfecto para cada tamaño de grupo con la seguridad y puntualidad que nos caracteriza.
          </p>
        </AnimatedSection>

        {/* CTA Buttons */}
        <AnimatedSection delay={350}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a
              href="#flota"
              className="px-8 py-4 rounded-full text-lg font-semibold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all duration-300 shadow-[0_0_30px_rgba(0,230,118,0.3)] hover:shadow-[0_0_50px_rgba(0,230,118,0.5)] hover:scale-105"
            >
              <Bus className="w-5 h-5 inline mr-2" />
              Ver Nuestra Flota
            </a>
            <a
              href="#cotizar"
              className="px-8 py-4 rounded-full text-lg font-semibold text-white border border-white/20 hover:border-[#0077BD]/50 hover:bg-white/5 transition-all duration-300"
            >
              Cotizar Ahora
            </a>
          </div>
        </AnimatedSection>

        {/* Stats bar */}
        <AnimatedSection delay={400}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { value: '3', label: 'Tipos de Bus', icon: Bus },
              { value: '11-50', label: 'Pasajeros', icon: Users },
              { value: '24/7', label: 'Disponibilidad', icon: Clock },
              { value: '100%', label: 'Con A/C', icon: Snowflake },
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
   2. FLEET SECTION
   ═══════════════════════════════════════════════════════════════════════════════ */
const fleetVehicles = [
  {
    icon: Bus,
    title: 'MiniBus',
    capacity: 'De 11 a 18 pasajeros',
    comodidades: 'Aire Acondicionado (A/C) y espacio optimizado para equipaje',
    ideal: 'Traslados ejecutivos pequeños, delegaciones y transfer del aeropuerto',
    color: '#00E676',
    image: '/vehicles/4-BUS/minibus.png',
  },
  {
    icon: Bus,
    title: 'Micro (Tipo Coaster)',
    capacity: 'De 20 a 25 pasajeros',
    comodidades: 'Aire Acondicionado (A/C) de alto rendimiento y maletero',
    ideal: 'City tours, paseos institucionales y eventos medianos',
    color: '#0077BD',
    image: '/vehicles/4-BUS/micro.png',
  },
  {
    icon: Bus,
    title: 'Flota (Gran Capacidad)',
    capacity: 'De 25 a 50 pasajeros',
    comodidades: 'A/C integral, amplias bodegas de equipaje y confort para largas distancias',
    ideal: 'Viajes interprovinciales, excursiones escolares y convenciones masivas',
    color: '#FF9800',
    image: '/vehicles/4-BUS/flota.png',
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
              <Bus className="w-4 h-4 text-[#0077BD]" />
              <span className="text-sm text-[#0077BD]">Nuestra Flota</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Diseñada para cada{' '}
              <span className="bg-gradient-to-r from-[#0077BD] to-[#00E676] bg-clip-text text-transparent">
                Tamaño de Grupo
              </span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              Tú decides qué vehículo se adapta al número de pasajeros y tipo de viaje
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {fleetVehicles.map((vehicle, i) => (
            <AnimatedSection key={vehicle.title} delay={i * 150}>
              <div className="group relative rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-white/10 transition-all duration-500 h-full overflow-hidden">
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ boxShadow: `0 0 30px ${vehicle.color}10` }}
                />

                {/* Vehicle image — full width, clearly visible */}
                <div className="relative h-52 w-full bg-gradient-to-b from-transparent to-[#0a0e17]/60">
                  <img
                    src={vehicle.image}
                    alt={vehicle.title}
                    className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.15)] group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Color accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1" style={{ backgroundColor: vehicle.color }} />
                </div>

                <div className="relative z-10 p-6">
                  <h3 className="text-xl font-bold text-white mb-4">{vehicle.title}</h3>

                  {/* Capacity */}
                  <div className="flex items-start gap-3 mb-3">
                    <Users className="w-5 h-5 shrink-0 mt-0.5" style={{ color: vehicle.color }} />
                    <div>
                      <span className="text-sm font-semibold text-white/80">Capacidad: </span>
                      <span className="text-sm text-white/50">{vehicle.capacity}</span>
                    </div>
                  </div>

                  {/* Comodidades */}
                  <div className="flex items-start gap-3 mb-3">
                    <Snowflake className="w-5 h-5 shrink-0 mt-0.5" style={{ color: vehicle.color }} />
                    <div>
                      <span className="text-sm font-semibold text-white/80">Comodidades: </span>
                      <span className="text-sm text-white/50">{vehicle.comodidades}</span>
                    </div>
                  </div>

                  {/* Ideal para */}
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 shrink-0 mt-0.5" style={{ color: vehicle.color }} />
                    <div>
                      <span className="text-sm font-semibold text-white/80">Ideal para: </span>
                      <span className="text-sm text-white/50">{vehicle.ideal}</span>
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
   3. SOLUTIONS BY OCCASION SECTION
   ═══════════════════════════════════════════════════════════════════════════════ */
const solutions = [
  {
    icon: Briefcase,
    title: 'Corporativos y Negocios',
    desc: 'Congresos, conferencias, convenciones anuales y traslado de delegaciones empresariales con la puntualidad y presentación que tu empresa exige.',
    color: '#0077BD',
  },
  {
    icon: Plane,
    title: 'Turismo y Traslados',
    desc: 'Recogida express en el Aeropuerto (Viru Viru / El Trompillo), City Tours personalizados y excursiones programadas con guías y rutas optimizadas.',
    color: '#00E676',
  },
  {
    icon: PartyPopper,
    title: 'Eventos Sociales y Familiares',
    desc: 'Bodas, aniversarios, cumpleaños, paseos de fin de semana y eventos deportivos. Llevamos a tu grupo con estilo y seguridad.',
    color: '#FF9800',
  },
  {
    icon: Heart,
    title: 'Acompañamiento Familiar',
    desc: 'Servicios de transporte respetuosos y organizados para velorios y sepelios, con la discreción y sensibilidad que el momento requiere.',
    color: '#8B5CF6',
  },
  {
    icon: Map,
    title: 'Viajes Especiales',
    desc: 'Rutas turísticas o traslados fuera de la ciudad hacia cualquier destino del país. Coordinamos la logística completa de tu viaje especial.',
    color: '#E91E63',
  },
]

function SolutionsSection() {
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF9800]/10 border border-[#FF9800]/20 mb-4">
              <MapPin className="w-4 h-4 text-[#FF9800]" />
              <span className="text-sm text-[#FF9800]">Soluciones de Transporte</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Transporte para cada{' '}
              <span className="bg-gradient-to-r from-[#FF9800] to-[#00E676] bg-clip-text text-transparent">
                Ocasión
              </span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              Para que el cliente se identifique de inmediato con el servicio que necesita.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((solution, i) => (
            <AnimatedSection key={solution.title} delay={i * 120}>
              <div className="group relative p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-white/10 transition-all duration-500 h-full">
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ boxShadow: `0 0 30px ${solution.color}10` }}
                />
                <div className="relative z-10">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300"
                      style={{ backgroundColor: `${solution.color}15` }}
                    >
                      <solution.icon className="w-7 h-7" style={{ color: solution.color }} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">{solution.title}</h3>
                      <p className="text-sm text-white/40 leading-relaxed">{solution.desc}</p>
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
   4. WHY CHOOSE US SECTION
   ═══════════════════════════════════════════════════════════════════════════════ */
const advantages = [
  {
    icon: Award,
    title: 'Choferes Profesionales y Expertos',
    desc: 'Conductores calificados que conocen cada ruta a la perfección y están capacitados para atender las exigencias y seguridad de cada pasajero. Experiencia y profesionalismo en cada viaje.',
    color: '#00E676',
  },
  {
    icon: Clock,
    title: 'Puntualidad Garantizada',
    desc: 'Monitoreamos los horarios de forma rigurosa para que tu itinerario se cumpla sin retrasos. Sabemos que en los viajes grupales, cada minuto cuenta.',
    color: '#0077BD',
  },
  {
    icon: Shield,
    title: 'Seguridad y Confort',
    desc: 'Todas nuestras unidades cuentan con mantenimiento preventivo estricto, seguro de viaje y climatización completa. Tu tranquilidad es nuestra prioridad.',
    color: '#FF9800',
  },
]

function AdvantagesSection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#080c15] to-[#0a0e17]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 mb-4">
              <Star className="w-4 h-4 text-[#00E676]" />
              <span className="text-sm text-[#00E676]">Valor Agregado</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              ¿Por qué viajar con{' '}
              <span className="bg-gradient-to-r from-[#00E676] to-[#0077BD] bg-clip-text text-transparent">
                nosotros
              </span>
              ?
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              Más que transporte, ofrecemos una experiencia de viaje confiable y profesional.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {advantages.map((adv, i) => (
            <AnimatedSection key={adv.title} delay={i * 150}>
              <div className="group relative p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-white/10 transition-all duration-500 h-full">
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ boxShadow: `0 0 30px ${adv.color}10` }}
                />
                <div className="relative z-10 text-center">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: `${adv.color}15` }}
                  >
                    <adv.icon className="w-8 h-8" style={{ color: adv.color }} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{adv.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{adv.desc}</p>
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
   5. HOW IT WORKS — 3 STEPS SECTION
   ═══════════════════════════════════════════════════════════════════════════════ */
const processSteps = [
  {
    step: '01',
    title: 'Elige tu Vehículo',
    desc: 'Selecciona el tamaño ideal según tu número de pasajeros desde nuestros canales de reservas: App, Web, teléfono o WhatsApp.',
    color: '#0077BD',
    icon: Bus,
  },
  {
    step: '02',
    title: 'Define tu Ruta',
    desc: 'Introduce el punto de partida, destino y horarios del evento. Nosotros nos encargamos de la planificación óptima.',
    color: '#00E676',
    icon: Route,
  },
  {
    step: '03',
    title: 'Viaja Seguro',
    desc: 'Recibe una cotización transparente de inmediato y asegura la disponibilidad de tu unidad con chofer profesional.',
    color: '#FF9800',
    icon: CheckCircle2,
  },
]

function HowItWorksSection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 mb-4">
              <Smartphone className="w-4 h-4 text-[#8B5CF6]" />
              <span className="text-sm text-[#8B5CF6]">Cotiza en 3 Pasos</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Cotiza tu Viaje{' '}
              <span className="bg-gradient-to-r from-[#8B5CF6] to-[#0077BD] bg-clip-text text-transparent">
                Grupal
              </span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              Un proceso simple y rápido para que tu grupo viaje sin preocupaciones.
            </p>
          </div>
        </AnimatedSection>

        {/* Timeline */}
        <div className="relative">
          {/* Horizontal connector line (desktop) */}
          <div className="hidden lg:block absolute top-[52px] left-[16.5%] right-[16.5%] h-[2px] bg-gradient-to-r from-[#0077BD]/30 via-[#00E676]/30 to-[#FF9800]/30" />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {processSteps.map((step, i) => (
              <AnimatedSection key={step.step} delay={i * 200}>
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
                    <div className="sm:hidden flex justify-center my-4">
                      <ChevronRight className="w-5 h-5 text-white/20 rotate-90" />
                    </div>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <AnimatedSection delay={600}>
          <div className="text-center mt-12">
            <a
              href="#cotizar"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg font-semibold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all duration-300 shadow-[0_0_30px_rgba(0,230,118,0.3)] hover:shadow-[0_0_50px_rgba(0,230,118,0.5)] hover:scale-105"
            >
              Cotizar Transporte Grupal Ahora
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
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
    tipoBus: '',
    pasajeros: '',
    fecha: '',
    origen: '',
    destino: '',
    mensaje: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <section id="cotizar" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#080c15] to-[#0a0e17]" />

      {/* Accent glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[#00E676]/5 blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 mb-4">
              <MessageCircle className="w-4 h-4 text-[#00E676]" />
              <span className="text-sm text-[#00E676]">Cotiza Ahora</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Solicita tu{' '}
              <span className="bg-gradient-to-r from-[#00E676] to-[#0077BD] bg-clip-text text-transparent">
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
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-[#00E676]/20 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#00E676]/10 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-[#00E676]" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Llámanos</h3>
                    <p className="text-white/40 text-sm mb-1">Atención inmediata para cotizaciones</p>
                    <a href="tel:73662803" className="text-[#00E676] font-bold text-lg hover:underline">73662803</a>
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
                      href="https://wa.me/59173662803?text=Hola%2C%20necesito%20cotizar%20transporte%20grupal"
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
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-[#0077BD]/20 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0077BD]/10 flex items-center justify-center shrink-0">
                    <Smartphone className="w-6 h-6 text-[#0077BD]" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">App Ecotaxi</h3>
                    <p className="text-white/40 text-sm mb-1">Reserva desde nuestra aplicación</p>
                    <span className="text-[#0077BD] font-semibold text-sm">Disponible en iOS y Android</span>
                  </div>
                </div>
              </div>

              {/* Quick tip */}
              <div className="p-5 rounded-2xl bg-[#FF9800]/5 border border-[#FF9800]/10">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-[#FF9800] shrink-0 mt-0.5" />
                  <p className="text-sm text-white/50 leading-relaxed">
                    <span className="text-[#FF9800] font-semibold">Tip:</span> Para cotizaciones más rápidas, indícanos la cantidad de pasajeros, la fecha y el destino por WhatsApp.
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
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/20 focus:border-[#00E676]/40 focus:outline-none transition-colors text-sm"
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
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/20 focus:border-[#00E676]/40 focus:outline-none transition-colors text-sm"
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
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/20 focus:border-[#00E676]/40 focus:outline-none transition-colors text-sm"
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
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/20 focus:border-[#00E676]/40 focus:outline-none transition-colors text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-white/60 mb-1.5">Tipo de Bus</label>
                  <select
                    name="tipoBus"
                    value={formData.tipoBus}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white focus:border-[#00E676]/40 focus:outline-none transition-colors text-sm appearance-none"
                  >
                    <option value="" className="bg-[#0a0e17]">Selecciona una opción</option>
                    <option value="minibus" className="bg-[#0a0e17]">MiniBus (11-18 pasajeros)</option>
                    <option value="micro" className="bg-[#0a0e17]">Micro / Coaster (20-25 pasajeros)</option>
                    <option value="flota" className="bg-[#0a0e17]">Flota (25-50 pasajeros)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-1.5">Nro. de Pasajeros</label>
                  <input
                    name="pasajeros"
                    value={formData.pasajeros}
                    onChange={handleChange}
                    type="number"
                    min="1"
                    placeholder="Ej: 25"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/20 focus:border-[#00E676]/40 focus:outline-none transition-colors text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-white/60 mb-1.5">Fecha del Viaje</label>
                <input
                  name="fecha"
                  value={formData.fecha}
                  onChange={handleChange}
                  type="date"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white focus:border-[#00E676]/40 focus:outline-none transition-colors text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-white/60 mb-1.5">Origen</label>
                  <input
                    name="origen"
                    value={formData.origen}
                    onChange={handleChange}
                    type="text"
                    placeholder="Punto de partida"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/20 focus:border-[#00E676]/40 focus:outline-none transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-1.5">Destino</label>
                  <input
                    name="destino"
                    value={formData.destino}
                    onChange={handleChange}
                    type="text"
                    placeholder="Lugar de destino"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/20 focus:border-[#00E676]/40 focus:outline-none transition-colors text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-white/60 mb-1.5">Detalles adicionales</label>
                <textarea
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Cuéntanos más sobre tu viaje..."
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/20 focus:border-[#00E676]/40 focus:outline-none transition-colors text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all duration-300 shadow-[0_0_25px_rgba(0,230,118,0.3)] hover:shadow-[0_0_40px_rgba(0,230,118,0.5)] hover:scale-[1.02]"
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
export function BusPageContent() {
  return (
    <>
      <HeroSlideshow />
      <HeroSection />
      <FleetSection />
      <SolutionsSection />
      <AdvantagesSection />
      <HowItWorksSection />
      <ContactSection />
    </>
  )
}
