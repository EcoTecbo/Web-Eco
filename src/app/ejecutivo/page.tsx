'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Crown, Car, Shield, CheckCircle2, ArrowRight, Star, Award,
  Phone, MapPin, Smartphone, Globe, MessageCircle, Headphones,
  User, Zap, BadgeCheck, Navigation, Users, Eye, Clock,
  Languages, Shirt, Flower2, ShieldCheck, Plane, Heart,
  Diamond, Gem, Sparkles, ChevronsUp, Infinity, CalendarDays,
  Timer, Route, Mountain, Building2, TreePine, Handshake,
  Briefcase, Trophy, Music, Dumbbell, Wine, Tuxedo
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
   1. HERO SECTION — Premium Gold & Black
   ═══════════════════════════════════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient — darker, more premium */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#08060d] via-[#0d0a14] to-[#08060d]" />

      {/* Grid pattern — gold tint */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(212,175,55,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glow orbs — gold and purple luxury */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[#D4AF37]/8 blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#8B5CF6]/6 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[#D4AF37]/4 blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Luxury decorative icons */}
      <div className="absolute top-32 right-[8%] md:right-[18%] opacity-[0.07]">
        <Crown className="w-28 h-28 md:w-40 md:h-40 text-[#D4AF37]" />
      </div>
      <div className="absolute bottom-28 left-[5%] md:left-[12%] opacity-[0.05]">
        <Diamond className="w-20 h-20 md:w-28 md:h-28 text-[#D4AF37]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 pb-16">
        {/* Badge */}
        <AnimatedSection>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/25 mb-8 backdrop-blur-sm">
            <Crown className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-sm text-[#D4AF37] font-medium">Servicio Ejecutivo Premium</span>
          </div>
        </AnimatedSection>

        {/* Title */}
        <AnimatedSection delay={100}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Lujo y Elegancia{' '}
            <span className="bg-gradient-to-r from-[#D4AF37] via-[#F5E6A3] to-[#D4AF37] bg-clip-text text-transparent">
              a tu Servicio
            </span>
          </h1>
        </AnimatedSection>

        {/* Subtitle */}
        <AnimatedSection delay={200}>
          <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-10 leading-relaxed">
            Vehículos de alta gama con choferes de lujo para los clientes más exigentes. 
            Desde un sedán ejecutivo hasta una limusina, con reserva anticipada que garantiza 
            un servicio a la medida de tu ocasión.
          </p>
        </AnimatedSection>

        {/* CTA buttons */}
        <AnimatedSection delay={300}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <a
              href="#flota"
              className="px-8 py-4 rounded-full text-lg font-semibold text-black bg-[#D4AF37] hover:bg-[#F5E6A3] transition-all duration-300 shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:shadow-[0_0_50px_rgba(212,175,55,0.5)] hover:scale-105"
            >
              Ver Flota Premium
            </a>
            <a
              href="#reserva"
              className="px-8 py-4 rounded-full text-lg font-semibold text-[#D4AF37] border border-[#D4AF37]/30 hover:border-[#D4AF37]/60 hover:bg-[#D4AF37]/5 transition-all duration-300"
            >
              Reservar Ahora
            </a>
          </div>
        </AnimatedSection>

        {/* Stats bar */}
        <AnimatedSection delay={400}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { value: 'VIP', label: 'Alta Gama', icon: Crown },
              { value: '24h', label: 'Reserva anticipada', icon: Clock },
              { value: '2', label: 'Categorías', icon: ChevronsUp },
              { value: '100%', label: 'A la medida', icon: Sparkles },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-4 rounded-2xl bg-white/[0.03] border border-[#D4AF37]/10 backdrop-blur-sm hover:border-[#D4AF37]/20 transition-all duration-300"
              >
                <stat.icon className="w-5 h-5 text-[#D4AF37] mx-auto mb-2" />
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
   2. CONFOR vs VIP — The Key Difference
   ═══════════════════════════════════════════════════════════════════════════════ */
function CategoryComparisonSection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#08060d] via-[#0d0a14] to-[#08060d]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-[#D4AF37]/3 blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 mb-4">
              <ChevronsUp className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-sm text-[#D4AF37]">Conoce la Diferencia</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Confort vs{' '}
              <span className="bg-gradient-to-r from-[#D4AF37] via-[#F5E6A3] to-[#D4AF37] bg-clip-text text-transparent">
                VIP
              </span>
              : No es lo mismo
            </h2>
            <p className="text-white/50 max-w-3xl mx-auto text-lg">
              Mucha gente confunde ambas categorías, pero en Ecotaxi la diferencia es clara. Confort es confortable 
              y accesible; VIP es alta gama, exclusivo y reservado para quienes buscan lo mejor. Conocer la 
              diferencia te ayuda a elegir exactamente lo que necesitas.
            </p>
          </div>
        </AnimatedSection>

        {/* Two-column comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* CONFORT */}
          <AnimatedSection delay={100}>
            <div className="relative p-8 rounded-2xl bg-white/[0.03] border border-[#0077BD]/15 backdrop-blur-sm h-full">
              {/* Category badge */}
              <div className="absolute -top-4 left-8">
                <span className="px-4 py-1.5 rounded-full text-xs font-bold text-white bg-[#0077BD] uppercase tracking-wider shadow-[0_0_20px_rgba(0,119,189,0.3)]">
                  Confort
                </span>
              </div>

              <div className="pt-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-[#0077BD]/10 flex items-center justify-center">
                    <Car className="w-8 h-8 text-[#0077BD]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Categoría Confort</h3>
                    <p className="text-sm text-[#0077BD]">Comodidad confiable</p>
                  </div>
                </div>

                <p className="text-white/50 leading-relaxed mb-6">
                  La categoría Confort de Ecotaxi está compuesta por vehículos que no superan los 10 años 
                  de antigüedad, con aire acondicionado y un nivel de comodidad que garantiza un viaje 
                  agradable y seguro. Son vehículos bien mantenidos, limpios y con todas las condiciones 
                  para un traslado urbano de calidad.
                </p>

                <div className="space-y-3 mb-6">
                  {[
                    { icon: Car, text: 'Vehículos con máximo 10 años de antigüedad' },
                    { icon: Zap, text: 'Aire acondicionado funcionando' },
                    { icon: Shield, text: 'Comodidad y seguridad garantizada' },
                    { icon: BadgeCheck, text: 'Mantenimiento periódico certificado' },
                    { icon: User, text: 'Chofer profesional y uniformado' },
                    { icon: CheckCircle2, text: 'Ideal para reuniones y traslados ejecutivos' },
                  ].map((item) => (
                    <div key={item.text} className="flex items-start gap-3">
                      <item.icon className="w-4 h-4 text-[#0077BD] mt-0.5 shrink-0" />
                      <span className="text-sm text-white/55">{item.text}</span>
                    </div>
                  ))}
                </div>

                {/* Example vehicles */}
                <div className="p-4 rounded-xl bg-[#0077BD]/5 border border-[#0077BD]/10">
                  <p className="text-xs text-[#0077BD] font-semibold mb-2">EJEMPLOS DE VEHÍCULOS CONFORT</p>
                  <p className="text-xs text-white/40">Toyota Corolla, Honda Civic, Hyundai Accent, Kia Rio y similares. Vehículos confiables, con A/C y en excelente estado.</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* VIP */}
          <AnimatedSection delay={200}>
            <div className="relative p-8 rounded-2xl bg-white/[0.04] border-2 border-[#D4AF37]/25 backdrop-blur-sm h-full shadow-[0_0_40px_rgba(212,175,55,0.08)]">
              {/* Category badge */}
              <div className="absolute -top-4 left-8">
                <span className="px-4 py-1.5 rounded-full text-xs font-bold text-black bg-[#D4AF37] uppercase tracking-wider shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                  VIP — Alta Gama
                </span>
              </div>

              <div className="pt-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center">
                    <Crown className="w-8 h-8 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Categoría VIP</h3>
                    <p className="text-sm text-[#D4AF37]">Alta gama y exclusividad</p>
                  </div>
                </div>

                <p className="text-white/50 leading-relaxed mb-6">
                  La categoría VIP es nuestra selección premium de vehículos de alta gama. Mercedes-Benz, Audi, 
                  Land Cruiser, Prado, Nissan Patrol, Toyota FJ y más. Son vehículos de lujo que no están 
                  bajo demanda regular — requieren reserva anticipada para garantizar disponibilidad y un 
                  servicio personalizado a la medida de cada ocasión.
                </p>

                <div className="space-y-3 mb-6">
                  {[
                    { icon: Crown, text: 'Vehículos de alta gama y marcas premium' },
                    { icon: Sparkles, text: 'Interiores de lujo y acabados superiores' },
                    { icon: ShieldCheck, text: 'Reserva anticipada para garantizar disponibilidad' },
                    { icon: Languages, text: 'Chofer bilingüe disponible' },
                    { icon: Shirt, text: 'Vestimenta del chofer según la ocasión' },
                    { icon: Flower2, text: 'Esperas y entregas especiales (flores, presentes)' },
                  ].map((item) => (
                    <div key={item.text} className="flex items-start gap-3">
                      <item.icon className="w-4 h-4 text-[#D4AF37] mt-0.5 shrink-0" />
                      <span className="text-sm text-white/55">{item.text}</span>
                    </div>
                  ))}
                </div>

                {/* Example vehicles */}
                <div className="p-4 rounded-xl bg-[#D4AF37]/5 border border-[#D4AF37]/10">
                  <p className="text-xs text-[#D4AF37] font-semibold mb-2">EJEMPLOS DE VEHÍCULOS VIP</p>
                  <p className="text-xs text-white/40">Mercedes-Benz Clase S/E, Audi A6/A8, Toyota Land Cruiser, Prado, Nissan Patrol, Toyota FJ Cruiser, Limusinas y más.</p>
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
   3. VIP FLEET SECTION
   ═══════════════════════════════════════════════════════════════════════════════ */
const vipVehicles = [
  {
    icon: Car,
    name: 'Sedán Ejecutivo',
    brand: 'Mercedes-Benz Clase E / Audi A6',
    passengers: 3,
    luggage: 2,
    desc: 'El sedán de alta gama perfecto para ejecutivos que buscan elegancia discreta. Interiores en cuero, aislamiento acústico premium y toda la tecnología que esperas de un vehículo de esta categoría. Ideal para reuniones de negocios, traslados corporativos y ocasiones donde la primera impresión lo es todo.',
    color: '#D4AF37',
    tag: 'INDIVIDUAL',
  },
  {
    icon: Car,
    name: 'Sedán Premium',
    brand: 'Mercedes-Benz Clase S / Audi A8',
    passengers: 3,
    luggage: 2,
    desc: 'La máxima expresión del lujo sobre ruedas. Asientos traseros reclinables con masaje, pantallas individuales, bar privado y un nivel de confort que convierte cada viaje en una experiencia memorable. Para quienes no aceptan compromisos.',
    color: '#D4AF37',
    tag: 'INDIVIDUAL',
  },
  {
    icon: Crown,
    name: 'SUV Premium',
    brand: 'Toyota Land Cruiser / Prado',
    passengers: 4,
    luggage: 4,
    desc: 'Potencia y elegancia combinadas en una SUV de alta gama. Amplio espacio interior, capacidad off-road para cualquier terreno y el prestigio de conducir uno de los vehículos más codiciados del mercado. Perfecto para traslados con equipaje o recorridos fuera de la ciudad.',
    color: '#D4AF37',
    tag: 'INDIVIDUAL',
  },
  {
    icon: Crown,
    name: 'SUV Adventure',
    brand: 'Toyota FJ Cruiser / Nissan Patrol',
    passengers: 4,
    luggage: 3,
    desc: 'Para quienes buscan aventura con estilo. La FJ Cruiser y la Nissan Patrol combinan un diseño imponente con capacidades todoterreno excepcionales. Ideales para explorar los paisajes de Bolivia sin renunciar al confort y la exclusividad.',
    color: '#D4AF37',
    tag: 'INDIVIDUAL',
  },
  {
    icon: Crown,
    name: 'Limusina',
    brand: 'Lincoln / Cadillac Escalade',
    passengers: 8,
    luggage: 3,
    desc: 'La experiencia definitiva en transporte de lujo. Bar completo, iluminación ambiental, sistema de sonido premium, asientos de cuero y todo el espacio que necesitas para celebrar, impresionar o simplemente disfrutar. Para bodas, galas, quinceañeras y momentos que merecen ser inolvidables.',
    color: '#D4AF37',
    tag: 'GRUPAL',
  },
  {
    icon: Car,
    name: 'Van Ejecutiva',
    brand: 'Mercedes-Benz V-Class / Sprinter',
    passengers: 7,
    luggage: 7,
    desc: 'Cuando el lujo necesita espacio para todo un equipo. Asientos ejecutivos reclinables, mesa de trabajo, WiFi, puertos USB y el confort de un salón móvil. Perfecta para comitivas empresariales, giras de artistas o delegaciones que viajan juntas sin sacrificar elegancia.',
    color: '#D4AF37',
    tag: 'GRUPAL',
  },
]

function VIPFleetSection() {
  const [activeVehicle, setActiveVehicle] = useState<string | null>(null)

  return (
    <section id="flota" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#08060d] via-[#100d18] to-[#08060d]" />
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full bg-[#D4AF37]/4 blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 mb-4">
              <Crown className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-sm text-[#D4AF37]">Flota de Alta Gama</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Nuestra Selección{' '}
              <span className="bg-gradient-to-r from-[#D4AF37] via-[#F5E6A3] to-[#D4AF37] bg-clip-text text-transparent">
                Premium
              </span>
            </h2>
            <p className="text-white/50 max-w-3xl mx-auto text-lg">
              Necesitas un auto de lujo y no sabes dónde encontrarlo? Has llegado al lugar indicado. 
              En Ecotaxi te ponemos en contacto con una flota de vehículos de alta gama y choferes de 
              lujo, con experiencia en servicios de alta exigencia. Tanto para viaje individual o grupal, 
              tenemos cubierto desde un sedán hasta una limusina.
            </p>
          </div>
        </AnimatedSection>

        {/* Filter tabs */}
        <AnimatedSection delay={100}>
          <div className="flex items-center justify-center gap-3 mb-10">
            {[
              { label: 'Todos', value: 'all' },
              { label: 'Individual', value: 'INDIVIDUAL' },
              { label: 'Grupal', value: 'GRUPAL' },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveVehicle(null)}
                className="px-4 py-2 rounded-full text-sm font-medium text-white/50 bg-white/[0.03] border border-white/[0.06] hover:text-white hover:border-[#D4AF37]/20 transition-all duration-300"
              >
                {tab.label}
              </button>
            ))}
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {vipVehicles.map((vehicle, i) => {
            const isActive = activeVehicle === vehicle.name
            return (
              <AnimatedSection key={vehicle.name} delay={i * 80}>
                <div
                  onClick={() => setActiveVehicle(isActive ? null : vehicle.name)}
                  className={`group relative p-6 rounded-2xl bg-white/[0.03] border backdrop-blur-sm cursor-pointer transition-all duration-500 overflow-hidden ${
                    isActive ? 'bg-white/[0.06]' : 'border-[#D4AF37]/10 hover:border-[#D4AF37]/20'
                  }`}
                  style={{
                    borderColor: isActive ? `${vehicle.color}40` : undefined,
                  }}
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ boxShadow: `0 0 30px ${vehicle.color}08` }}
                  />

                  {/* Tag */}
                  <div className="absolute top-4 right-4">
                    <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20">
                      {vehicle.tag}
                    </span>
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${vehicle.color}12` }}>
                        <vehicle.icon className="w-7 h-7" style={{ color: vehicle.color }} />
                      </div>
                      <div className="pt-1">
                        <h3 className="text-lg font-semibold text-white">{vehicle.name}</h3>
                        <p className="text-xs text-[#D4AF37]/70">{vehicle.brand}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-white/30 mb-4">
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>{vehicle.passengers} pasajeros</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Briefcase className="w-3 h-3" />
                        <span>{vehicle.luggage} equipaje</span>
                      </div>
                    </div>

                    {/* Expandable description */}
                    <div className={`transition-all duration-500 overflow-hidden ${
                      isActive ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <p className="text-sm text-white/45 leading-relaxed pt-3 border-t border-[#D4AF37]/10">
                        {vehicle.desc}
                      </p>
                    </div>

                    {!isActive && (
                      <p className="text-xs text-[#D4AF37]/40 mt-3 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Click para ver detalles
                      </p>
                    )}
                  </div>
                </div>
              </AnimatedSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   4. SERVICE MODALITIES SECTION
   ═══════════════════════════════════════════════════════════════════════════════ */
const serviceModalities = [
  {
    icon: Route,
    title: 'Por Recorrido',
    desc: 'Traslado punto a punto con tarifa premium fija. Ideal para ir del hotel a una reunión, del aeropuerto a un evento, o cualquier viaje con origen y destino definidos. Conoce el precio antes de abordar y disfruta del trayecto sin preocupaciones.',
    color: '#D4AF37',
  },
  {
    icon: MapPin,
    title: 'Ruta Específica',
    desc: 'Define una ruta personalizada con múltiples paradas. El chofer te espera en cada punto el tiempo que necesites. Perfecto para giras de inspección, visitas a clientes o recorridos turísticos exclusivos con un itinerario a tu medida.',
    color: '#0077BD',
  },
  {
    icon: Clock,
    title: 'Por Hora',
    desc: 'Vehículo a tu entera disposición por horas. El chofer te espera mientras atiendes tus compromisos y te lleva a cada destino sin prisa ni espera. La flexibilidad de tener tu propio auto con conductor, pagando solo por el tiempo que necesites.',
    color: '#00E676',
  },
  {
    icon: CalendarDays,
    title: 'Por Día',
    desc: 'Reserva tu vehículo VIP por día completo. Desde la mañana hasta la noche, tu chofer y vehículo están disponibles para todos tus traslados. Ideal para convenciones, días de grabación, eventos corporativos o visitas a la ciudad.',
    color: '#FF9800',
  },
  {
    icon: Infinity,
    title: 'Por Mes',
    desc: 'Contrata un vehículo ejecutivo permanente para todo el mes. El mismo chofer, el mismo vehículo, la misma excelencia cada día. Para ejecutivos residentes, delegaciones diplomáticas o personalidades que requieren movilidad continua.',
    color: '#8B5CF6',
  },
]

function ServiceModalitiesSection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#08060d] via-[#0d0a14] to-[#08060d]" />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(212,175,55,0.3) 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0077BD]/10 border border-[#0077BD]/20 mb-4">
              <Navigation className="w-4 h-4 text-[#0077BD]" />
              <span className="text-sm text-[#0077BD]">Modalidades de Servicio</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Tú eliges cómo{' '}
              <span className="bg-gradient-to-r from-[#D4AF37] via-[#0077BD] to-[#D4AF37] bg-clip-text text-transparent">
                moverte
              </span>
            </h2>
            <p className="text-white/50 max-w-3xl mx-auto text-lg">
              Puedes reservar el servicio ejecutivo por recorrido, ruta específica, por hora, por día o por mes. 
              Cada modalidad está diseñada para adaptarse a tu agenda, tus necesidades y tu estilo de vida.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {serviceModalities.map((mod, i) => (
            <AnimatedSection key={mod.title} delay={i * 100}>
              <div className="group relative p-6 md:p-7 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-white/10 transition-all duration-500 h-full">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/[0.02] transition-all duration-500" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: `${mod.color}12` }}>
                    <mod.icon className="w-6 h-6" style={{ color: mod.color }} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{mod.title}</h3>
                  <p className="text-sm text-white/45 leading-relaxed">{mod.desc}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Extra row for the last 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 max-w-2xl mx-auto">
          {serviceModalities.slice(3).map((mod, i) => (
            <div key={mod.title + '-extra'} className="hidden" />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   5. PREMIUM SERVICES SECTION
   ═══════════════════════════════════════════════════════════════════════════════ */
const premiumServices = [
  {
    icon: Languages,
    title: 'Chofer Bilingüe',
    desc: 'Conductores con dominio de inglés y español para atención a clientes internacionales, delegaciones diplomáticas, artistas extranjeros y ejecutivos que requieren comunicación fluida en su idioma durante todo el servicio.',
    color: '#D4AF37',
  },
  {
    icon: Shirt,
    title: 'Vestimenta según la Ocasión',
    desc: 'Nuestros choferes se visten según el evento: traje formal para galas corporativas, vestimenta casual elegante para salidas diurnas, o el uniforme que tu ocasión requiera. Cada detalle cuenta cuando la imagen importa.',
    color: '#0077BD',
  },
  {
    icon: Flower2,
    title: 'Entregas Especiales',
    desc: '¿Recogida en el aeropuerto con un ramo de flores? ¿Un presente esperando en el asiento trasero? Coordinamos entregas especiales para que tu recepción sea memorable. Flores, chocolates, vinos o lo que tu ocasión demande.',
    color: '#E91E63',
  },
  {
    icon: Plane,
    title: 'Recogida Aeropuerto VIP',
    desc: 'Cartel personalizado con tu nombre, asistencia con equipaje, sala VIP si está disponible y un vehículo de alta gama esperándote al salir. Para ocasiones especiales donde la primera impresión es inolvidable.',
    color: '#00E676',
  },
  {
    icon: Heart,
    title: 'Bodas y Celebraciones',
    desc: 'El vehículo perfecto para el día más especial. Decoración floral, champaña, chofer vestido para la ocasión y la puntualidad que tu boda merece. Limusinas, sedanes clásicos o la SUV que siempre soñaste para ese momento.',
    color: '#FF9800',
  },
  {
    icon: ShieldCheck,
    title: 'Guardias de Seguridad',
    desc: 'Para personalidades que requieren protección adicional, coordinamos recogidas con guardias de seguridad o guardaespaldas. Un servicio discreto, profesional y adaptado al nivel de seguridad que cada situación requiere.',
    color: '#8B5CF6',
  },
]

function PremiumServicesSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#08060d] via-[#0d0a14] to-[#08060d]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full bg-[#D4AF37]/5 blur-[180px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 mb-4">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-sm text-[#D4AF37]">Servicios Premium</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Ecotaxi te ayuda en{' '}
              <span className="bg-gradient-to-r from-[#D4AF37] via-[#F5E6A3] to-[#D4AF37] bg-clip-text text-transparent">
                todo
              </span>
            </h2>
            <p className="text-white/50 max-w-3xl mx-auto text-lg">
              Chofer bilingüe, vestimenta según la ocasión, entregas especiales, recogidas en aeropuerto 
              con motivo especial, bodas, seguridad. Tú disfruta el momento, nosotros nos encargamos del resto.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {premiumServices.map((service, i) => (
            <AnimatedSection key={service.title} delay={i * 100}>
              <div className="group relative p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-[#D4AF37]/8 backdrop-blur-sm hover:border-[#D4AF37]/20 transition-all duration-500 h-full">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 to-white/0 group-hover:from-[#D4AF37]/[0.02] group-hover:to-white/0 transition-all duration-500" />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: `${service.color}12` }}>
                    <service.icon className="w-7 h-7" style={{ color: service.color }} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">{service.title}</h3>
                  <p className="text-sm text-white/45 leading-relaxed">{service.desc}</p>
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
   6. WHO IS THIS FOR SECTION
   ═══════════════════════════════════════════════════════════════════════════════ */
const targetClients = [
  {
    icon: Briefcase,
    title: 'Altos Ejecutivos',
    desc: 'CEOs, directores y gerentes de empresas que necesitan movilidad ejecutiva impecable. Reuniones de alto nivel, juntas de accionistas, viajes de negocios o simplemente el transporte que refleja la jerarquía y profesionalismo que su cargo exige.',
    color: '#D4AF37',
  },
  {
    icon: Music,
    title: 'Artistas y Cantantes',
    desc: 'Giras, conciertos, grabaciones y eventos donde la puntualidad y la discreción son fundamentales. Nuestros choferes entienden la demanda de los artistas y están capacitados para manejar horarios variables, recintos exclusivos y la privacidad que el mundo del espectáculo requiere.',
    color: '#E91E63',
  },
  {
    icon: Trophy,
    title: 'Estrellas del Deporte',
    desc: 'Futbolistas, atletas y personalidades del deporte que necesitan transporte confiable y seguro. Desde entrenamientos hasta eventos de premiación, nuestro servicio entiende las exigencias de quienes representan al país en el escenario internacional.',
    color: '#00E676',
  },
  {
    icon: Building2,
    title: 'Delegaciones y Diplomáticos',
    desc: 'Embajadores, cónsules y representantes de gobiernos extranjeros que requieren un servicio acorde a su investidura. Protocolo, puntualidad, choferes bilingües y vehículos que cumplen con los estándares del servicio diplomático.',
    color: '#0077BD',
  },
  {
    icon: Heart,
    title: 'Novios y Celebraciones',
    desc: 'Bodas, quinceañeras, aniversarios y toda celebración que merece un toque de elegancia. Limusinas decoradas, champaña, puntualidad absoluta y la garantía de que el transporte será uno menos de qué preocuparte en tu día especial.',
    color: '#FF9800',
  },
  {
    icon: Dumbbell,
    title: 'VIPs y Personalidades',
    desc: 'Cualquier persona que busca una experiencia de transporte superior. Inversores, influencers, visitantes ilustres o simplemente quien quiere darse un lujo. En Ecotaxi no juzgamos, solo hacemos que tu experiencia sea extraordinaria.',
    color: '#8B5CF6',
  },
]

function TargetClientsSection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#08060d] via-[#100d18] to-[#08060d]" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-[#8B5CF6]/5 blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 mb-4">
              <Star className="w-4 h-4 text-[#8B5CF6]" />
              <span className="text-sm text-[#8B5CF6]">Para Quienes Exigen lo Mejor</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Diseñado para{' '}
              <span className="bg-gradient-to-r from-[#D4AF37] via-[#8B5CF6] to-[#D4AF37] bg-clip-text text-transparent">
                clientes exigentes
              </span>
            </h2>
            <p className="text-white/50 max-w-3xl mx-auto text-lg">
              Altos ejecutivos de empresas, artistas, cantantes, estrellas del fútbol y toda personalidad 
              que busca confort, elegancia y un servicio que está a la altura de sus expectativas.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {targetClients.map((client, i) => (
            <AnimatedSection key={client.title} delay={i * 100}>
              <div className="group relative p-6 md:p-7 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-white/10 transition-all duration-500 h-full">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/[0.02] transition-all duration-500" />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: `${client.color}12` }}>
                    <client.icon className="w-6 h-6" style={{ color: client.color }} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{client.title}</h3>
                  <p className="text-sm text-white/45 leading-relaxed">{client.desc}</p>
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
   7. CHAUFFEUR QUALITIES SECTION
   ═══════════════════════════════════════════════════════════════════════════════ */
function ChauffeurQualitiesSection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#08060d] via-[#0d0a14] to-[#08060d]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <AnimatedSection>
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 mb-6">
                <User className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-sm text-[#D4AF37]">Choferes de Lujo</span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Experiencia en servicio{' '}
                <span className="bg-gradient-to-r from-[#D4AF37] to-[#F5E6A3] bg-clip-text text-transparent">
                  de alta exigencia
                </span>
              </h2>

              <p className="text-white/50 text-lg leading-relaxed mb-8">
                Nuestros choferes VIP no son simples conductores — son profesionales del servicio 
                con años de experiencia en atención a clientes de alto nivel. Entienden la discreción, 
                conocen el protocolo y están capacitados para manejar cualquier situación con elegancia 
                y eficacia. Cada chofer es seleccionado rigurosamente y capacitado continuamente.
              </p>

              <div className="space-y-4">
                {[
                  { icon: BadgeCheck, text: 'Certificados y con referencias verificadas', color: '#D4AF37' },
                  { icon: Languages, text: 'Bilingües (español / inglés)', color: '#0077BD' },
                  { icon: Shirt, text: 'Vestimenta according to the ocasión', color: '#E91E63' },
                  { icon: Eye, text: 'Discreción absoluta y confidencialidad', color: '#8B5CF6' },
                  { icon: Handshake, text: 'Protocolo de atención VIP', color: '#00E676' },
                  { icon: Navigation, text: 'Conocimiento profundo de la ciudad y rutas', color: '#FF9800' },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${item.color}12` }}>
                      <item.icon className="w-4 h-4" style={{ color: item.color }} />
                    </div>
                    <span className="text-white/60 text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Right: Visual card */}
          <AnimatedSection delay={200}>
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl border border-[#D4AF37]/8 animate-glow-pulse" />

              <div className="relative p-8 rounded-2xl bg-white/[0.04] border border-[#D4AF37]/12 backdrop-blur-xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#D4AF37]" />
                    <span className="text-sm text-white/60">Perfil del Chofer VIP</span>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                  </div>
                </div>

                {/* Profile mock */}
                <div className="flex items-center gap-4 mb-6 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-[#8B5CF6]/20 flex items-center justify-center">
                    <User className="w-7 h-7 text-[#D4AF37]" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Carlos M.</div>
                    <div className="text-xs text-[#D4AF37]">Chofer VIP — 8 años de experiencia</div>
                    <div className="flex items-center gap-1 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-[#D4AF37] text-[#D4AF37]" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="space-y-3 mb-6">
                  {[
                    { skill: 'Conducción Ejecutiva', level: 98 },
                    { skill: 'Inglés Fluida', level: 92 },
                    { skill: 'Protocolo VIP', level: 95 },
                    { skill: 'Conocimiento de la Ciudad', level: 97 },
                    { skill: 'Discreción', level: 100 },
                  ].map((item) => (
                    <div key={item.skill}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-white/40">{item.skill}</span>
                        <span className="text-xs text-[#D4AF37]/60">{item.level}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{
                            width: `${item.level}%`,
                            background: `linear-gradient(90deg, #D4AF37, #F5E6A3)`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Certifications */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#D4AF37]/5 border border-[#D4AF37]/10">
                  <Award className="w-5 h-5 text-[#D4AF37]" />
                  <div>
                    <div className="text-xs text-[#D4AF37] font-semibold">Certificaciones Verificadas</div>
                    <div className="text-[10px] text-white/30">Licencia profesional, primeros auxilios, defensa personal</div>
                  </div>
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
   8. RESERVE SECTION
   ═══════════════════════════════════════════════════════════════════════════════ */
function ReserveSection() {
  const supportChannels = [
    { icon: Headphones, title: 'Central Exclusiva', desc: 'Línea dedicada para servicio ejecutivo con operadores especializados que coordinan cada detalle de tu reserva.', color: '#D4AF37' },
    { icon: Phone, title: 'Call Center VIP', desc: '(+591) 3 3296885 — Indica que requieres el servicio Ejecutivo y un asesor personalizado te atenderá.', color: '#00E676' },
    { icon: MessageCircle, title: 'WhatsApp Premium', desc: '+591 73662803 — Envíanos los detalles de tu reserva: fecha, hora, vehículo y cualquier requerimiento especial.', color: '#25D366' },
    { icon: Smartphone, title: 'App Móvil', desc: 'Selecciona "Ejecutivo" en la app y elige tu categoría VIP o Confort. Reserva anticipada garantizada.', color: '#8B5CF6' },
    { icon: Globe, title: 'Formulario Web', desc: 'Reserva desde nuestra web indicando categoría Ejecutivo, tipo de vehículo, modalidad y detalles adicionales.', color: '#0077BD' },
  ]

  return (
    <section id="reserva" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#08060d] via-[#0d0a14] to-[#08060d]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-[#D4AF37]/4 blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 mb-4">
              <Phone className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-sm text-[#D4AF37]">Reserva Anticipada</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Reserva tu{' '}
              <span className="bg-gradient-to-r from-[#D4AF37] via-[#F5E6A3] to-[#D4AF37] bg-clip-text text-transparent">
                Servicio Ejecutivo
              </span>
            </h2>
            <p className="text-white/50 max-w-3xl mx-auto text-lg">
              Los vehículos VIP no están bajo demanda regular — requieren reserva anticipada para garantizar 
              disponibilidad y un servicio a la medida. Indica que requieres la categoría Ejecutivo en 
              cualquiera de nuestros canales.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-16">
          {supportChannels.map((channel, i) => (
            <AnimatedSection key={channel.title} delay={i * 80}>
              <div className="group relative p-5 rounded-2xl bg-white/[0.03] border border-[#D4AF37]/8 text-center hover:border-[#D4AF37]/20 transition-all duration-500 h-full">
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ boxShadow: `0 0 30px ${channel.color}08` }}
                />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center" style={{ background: `${channel.color}10` }}>
                    <channel.icon className="w-6 h-6" style={{ color: channel.color }} />
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-2">{channel.title}</h3>
                  <p className="text-xs text-white/35 leading-relaxed">{channel.desc}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Reservation CTA */}
        <AnimatedSection delay={200}>
          <div className="max-w-3xl mx-auto">
            <div className="relative p-8 md:p-10 rounded-3xl bg-white/[0.04] border border-[#D4AF37]/15 backdrop-blur-xl text-center">
              <div className="absolute -inset-3 rounded-3xl border border-[#D4AF37]/5 animate-glow-pulse" />

              <div className="relative z-10">
                <Crown className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Reserva Anticipada Garantizada
                </h3>
                <p className="text-white/50 leading-relaxed mb-8 max-w-xl mx-auto">
                  Indica que requieres el <strong className="text-[#D4AF37]">Servicio Ejecutivo</strong> al 
                  momento de reservar. Selecciona tu categoría (Confort o VIP), el tipo de vehículo, la 
                  modalidad de servicio y cualquier requerimiento especial. Nosotros nos encargamos del resto.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="https://id3251.tm.taxi:58443/?cid=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 rounded-full text-lg font-semibold text-black bg-[#D4AF37] hover:bg-[#F5E6A3] transition-all duration-300 shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:shadow-[0_0_50px_rgba(212,175,55,0.5)] hover:scale-105 flex items-center gap-2"
                  >
                    Reservar Ejecutivo
                    <ArrowRight className="w-5 h-5" />
                  </a>
                  <a
                    href="https://wa.me/59173662803?text=Hola%2C%20necesito%20el%20servicio%20ejecutivo%20VIP"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 rounded-full text-lg font-semibold text-[#25D366] border border-[#25D366]/30 bg-[#25D366]/5 hover:bg-[#25D366]/10 hover:border-[#25D366]/50 transition-all duration-300 flex items-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp VIP
                  </a>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════════════════════ */
export default function EjecutivoPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#08060d]">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <CategoryComparisonSection />
        <VIPFleetSection />
        <ServiceModalitiesSection />
        <PremiumServicesSection />
        <TargetClientsSection />
        <ChauffeurQualitiesSection />
        <ReserveSection />
      </main>
      <Footer />
    </div>
  )
}
