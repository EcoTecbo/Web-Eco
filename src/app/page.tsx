'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Heart, Stethoscope, Car, Shield, Clock, Users, Phone,
  ArrowRight, CheckCircle2, Star, UserCheck, MapPin,
  BadgeCheck, HandHeart, Wheelchair, Building2, Cross,
  Accessibility, Ambulance, BedDouble, User, Eye,
  Compass, Smile, ShieldCheck, PhoneCall, MessageCircle,
  CalendarDays, Route, Navigation, Baby, Armchair,
  AlertCircle, Sparkles, ChevronRight
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
   1. HERO SECTION — Health & Care Theme
   ═══════════════════════════════════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src="/health-hero.png"
          alt="Transporte de Salud Ecotaxi"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17]/70 via-[#0a0e17]/85 to-[#0a0e17]" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(20,184,166,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(20,184,166,0.4) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[#14B8A6]/12 blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#0EA5E9]/10 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[#14B8A6]/6 blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Decorative icons */}
      <div className="absolute top-32 right-[8%] md:right-[18%] opacity-[0.07]">
        <Heart className="w-28 h-28 md:w-40 md:h-40 text-[#14B8A6]" />
      </div>
      <div className="absolute bottom-28 left-[5%] md:left-[12%] opacity-[0.05]">
        <Stethoscope className="w-20 h-20 md:w-28 md:h-28 text-[#0EA5E9]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 pb-16">
        {/* Badge */}
        <AnimatedSection>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#14B8A6]/10 border border-[#14B8A6]/25 mb-8 backdrop-blur-sm">
            <Heart className="w-4 h-4 text-[#14B8A6]" />
            <span className="text-sm text-[#14B8A6] font-medium">Transporte de Salud</span>
          </div>
        </AnimatedSection>

        {/* Title */}
        <AnimatedSection delay={100}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Cuidamos tu{' '}
            <span className="bg-gradient-to-r from-[#14B8A6] via-[#0EA5E9] to-[#14B8A6] bg-clip-text text-transparent">
              Bienestar
            </span>
            <br />
            en Cada Traslado
          </h1>
        </AnimatedSection>

        {/* Subtitle */}
        <AnimatedSection delay={200}>
          <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-10 leading-relaxed">
            Transporte especializado para personal de salud y pacientes que merecen un trato diferenciado,
            seguro y confiable. Choferes capacitados y vehículos adecuados para cada necesidad.
          </p>
        </AnimatedSection>

        {/* CTA buttons */}
        <AnimatedSection delay={300}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <a
              href="#servicios"
              className="px-8 py-4 rounded-full text-lg font-semibold text-black bg-[#14B8A6] hover:bg-[#2DD4BF] transition-all duration-300 shadow-[0_0_30px_rgba(20,184,166,0.3)] hover:shadow-[0_0_50px_rgba(20,184,166,0.5)] hover:scale-105"
            >
              Conocer Servicios
            </a>
            <a
              href="#contacto"
              className="px-8 py-4 rounded-full text-lg font-semibold text-[#14B8A6] border border-[#14B8A6]/30 hover:border-[#14B8A6]/60 hover:bg-[#14B8A6]/5 transition-all duration-300"
            >
              Solicitar Servicio
            </a>
          </div>
        </AnimatedSection>

        {/* Stats bar */}
        <AnimatedSection delay={400}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { value: '2', label: 'Áreas de Servicio', icon: Heart },
              { value: '24h', label: 'Disponibilidad', icon: Clock },
              { value: '100%', label: 'Capacitación', icon: UserCheck },
              { value: 'VIP', label: 'Trato Diferenciado', icon: ShieldCheck },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-4 rounded-2xl bg-white/[0.03] border border-[#14B8A6]/10 backdrop-blur-sm hover:border-[#14B8A6]/20 transition-all duration-300"
              >
                <stat.icon className="w-5 h-5 text-[#14B8A6] mx-auto mb-2" />
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
   2. TWO SERVICE AREAS — Personal Médico & Pacientes
   ═══════════════════════════════════════════════════════════════════════════════ */
function ServiceAreasSection() {
  return (
    <section id="servicios" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-[#14B8A6]/5 blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#14B8A6]/10 border border-[#14B8A6]/20 mb-4">
              <Cross className="w-4 h-4 text-[#14B8A6]" />
              <span className="text-sm text-[#14B8A6]">Dos Áreas, Un Compromiso</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Servicios{' '}
              <span className="bg-gradient-to-r from-[#14B8A6] via-[#0EA5E9] to-[#14B8A6] bg-clip-text text-transparent">
                Especializados
              </span>
            </h2>
            <p className="text-white/50 max-w-3xl mx-auto text-lg">
              Nuestro servicio de transporte de salud está diseñado para cubrir dos áreas fundamentales:
              la movilidad del personal de salud y el traslado de pacientes con el cuidado que merecen.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* AREA 1: Personal Médico */}
          <AnimatedSection delay={100}>
            <div className="relative rounded-2xl overflow-hidden bg-white/[0.03] border border-[#0EA5E9]/15 backdrop-blur-sm h-full">
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src="/health-staff.png"
                  alt="Transporte para Personal Médico"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e17] via-[#0a0e17]/50 to-transparent" />
                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-1.5 rounded-full text-xs font-bold text-white bg-[#0EA5E9] uppercase tracking-wider shadow-[0_0_20px_rgba(14,165,233,0.3)]">
                    Área 1
                  </span>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-[#0EA5E9]/10 flex items-center justify-center">
                    <Stethoscope className="w-8 h-8 text-[#0EA5E9]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Personal de Salud</h3>
                    <p className="text-sm text-[#0EA5E9]">Movilidad profesional y confiable</p>
                  </div>
                </div>

                <p className="text-white/50 leading-relaxed mb-6">
                  Sabemos que después de una larga jornada de guardia, turnos nocturnos o días intensos en el
                  hospital, lo último que necesitas es preocuparte por cómo llegar a casa. Nuestro servicio
                  de transporte para personal médico está diseñado para que médicos, enfermeras, técnicos y
                  administrativos lleguen a su hogar con la tranquilidad y comodidad que se merecen.
                  También cubrimos el traslado desde tu domicilio al centro de trabajo, con la puntualidad
                  que tu turno exige.
                </p>

                <div className="space-y-3 mb-6">
                  {[
                    { icon: Car, text: 'Vehículos según la necesidad: sedán, SUV o van' },
                    { icon: UserCheck, text: 'Choferes capacitados para transporte de personal de salud' },
                    { icon: Clock, text: 'Disponibilidad 24/7 para turnos diurnos y nocturnos' },
                    { icon: Shield, text: 'Seguridad y puntualidad garantizadas' },
                    { icon: MapPin, text: 'Recogida en domicilio y traslado al centro de salud' },
                    { icon: Building2, text: 'Para consultorios, clínicas, hospitales, laboratorios y farmacias' },
                  ].map((item) => (
                    <div key={item.text} className="flex items-start gap-3">
                      <item.icon className="w-4 h-4 text-[#0EA5E9] mt-0.5 shrink-0" />
                      <span className="text-sm text-white/55">{item.text}</span>
                    </div>
                  ))}
                </div>

                {/* Sub-service: Movimiento de personal */}
                <div className="p-4 rounded-xl bg-[#0EA5E9]/5 border border-[#0EA5E9]/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Navigation className="w-4 h-4 text-[#0EA5E9]" />
                    <span className="text-xs font-bold text-[#0EA5E9] uppercase tracking-wider">Movilidad para Gestiones</span>
                  </div>
                  <p className="text-xs text-white/40 leading-relaxed">
                    También cubrimos el desplazamiento de tu personal de salud y administrativo para
                    gestiones que requieran movilidad fuera del centro de salud: tramitaciones,
                    reuniones interinstitucionales, capacitaciones, traslado de insumos y más.
                    Ya seas un consultorio médico, clínica, hospital, laboratorio o farmacia,
                    lo tenemos cubierto.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* AREA 2: Pacientes */}
          <AnimatedSection delay={200}>
            <div className="relative rounded-2xl overflow-hidden bg-white/[0.04] border-2 border-[#14B8A6]/20 backdrop-blur-sm h-full shadow-[0_0_40px_rgba(20,184,166,0.08)]">
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src="/health-patient.png"
                  alt="Transporte para Pacientes"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e17] via-[#0a0e17]/50 to-transparent" />
                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-1.5 rounded-full text-xs font-bold text-black bg-[#14B8A6] uppercase tracking-wider shadow-[0_0_20px_rgba(20,184,166,0.4)]">
                    Área 2
                  </span>
                </div>
                {/* Special badge */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold text-[#14B8A6] bg-[#14B8A6]/10 border border-[#14B8A6]/20">
                    TRATO DIFERENCIADO
                  </span>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-[#14B8A6]/10 flex items-center justify-center">
                    <HandHeart className="w-8 h-8 text-[#14B8A6]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Pacientes</h3>
                    <p className="text-sm text-[#14B8A6]">Trato humano y personalizado</p>
                  </div>
                </div>

                <p className="text-white/50 leading-relaxed mb-6">
                  Los pacientes requieren un trato diferente y personalizado. No son pasajeros comunes:
                  son personas que pueden estar pasando por un momento difícil de salud, que tienen
                  movilidad reducida, o que simplemente necesitan ser tratados con mayor cuidado y
                  atención. Nuestros choferes están capacitados específicamente para atender a este
                  tipo de pasajeros, brindando asistencia, paciencia y empatía en cada traslado.
                </p>

                <div className="space-y-3 mb-6">
                  {[
                    { icon: Heart, text: 'Choferes capacitados en trato a pacientes' },
                    { icon: Accessibility, text: 'Asistencia a personas con movilidad reducida' },
                    { icon: Wheelchair, text: 'Apoyo a adultos mayores y personas con discapacidad' },
                    { icon: Smile, text: 'Trato empático, paciente y respetuoso' },
                    { icon: ShieldCheck, text: 'Seguridad y acompañamiento en todo momento' },
                    { icon: Baby, text: 'Atención especial para pacientes de todas las edades' },
                  ].map((item) => (
                    <div key={item.text} className="flex items-start gap-3">
                      <item.icon className="w-4 h-4 text-[#14B8A6] mt-0.5 shrink-0" />
                      <span className="text-sm text-white/55">{item.text}</span>
                    </div>
                  ))}
                </div>

                {/* Coming soon: Vehículos adaptados */}
                <div className="p-4 rounded-xl bg-[#14B8A6]/5 border border-[#14B8A6]/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-[#14B8A6]" />
                    <span className="text-xs font-bold text-[#14B8A6] uppercase tracking-wider">Muy Pronto</span>
                  </div>
                  <p className="text-xs text-white/40 leading-relaxed">
                    Muy pronto tendremos vehículos adaptados con rampas de acceso, asientos especiales
                    y equipamiento para una mejor gestión del traslado de pacientes con discapacidad
                    severa o movilidad muy reducida. Trabajamos constantemente para mejorar tu experiencia.
                  </p>
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
   3. CHAUFFEUR QUALITIES SECTION
   ═══════════════════════════════════════════════════════════════════════════════ */
const chauffeurQualities = [
  {
    icon: Heart,
    title: 'Empatía y Sensibilidad',
    desc: 'Nuestros choferes comprenden que están ante personas que necesitan un trato especial. Saben escuchar, tienen paciencia infinita y entienden que un paciente no es un pasajero más: es alguien que merece cuidado y respeto en cada momento del traslado.',
    color: '#14B8A6',
  },
  {
    icon: UserCheck,
    title: 'Capacitación Especializada',
    desc: 'Cada chofer recibe formación específica en asistencia a pacientes, primeros auxilios básicos, manejo de personas con movilidad reducida y protocolos de traslado seguro. No basta con saber conducir: hay que saber acompañar.',
    color: '#0EA5E9',
  },
  {
    icon: ShieldCheck,
    title: 'Seguridad ante Todo',
    desc: 'La conducción defensiva es prioridad. Nuestros choferes están entrenados para manejar con la suavidad y precaución que un paciente requiere, evitando frenadas bruscas, aceleraciones violentas y cualquier maniobra que ponga en riesgo la integridad del pasajero.',
    color: '#0077BD',
  },
  {
    icon: Clock,
    title: 'Puntualidad Garantizada',
    desc: 'Entendemos que una cita médica, un turno de quimioterapia o una consulta no pueden esperar. Nuestros choferes llegan siempre a tiempo, con margen suficiente para asistir al paciente sin prisa ni estrés, garantizando que llegue a su destino puntualmente.',
    color: '#00E676',
  },
  {
    icon: BadgeCheck,
    title: 'Profesionalismo y Discreción',
    desc: 'El personal de salud maneja información confidencial y los pacientes merecen privacidad total. Nuestros choferes mantienen absoluta discreción sobre las conversaciones y circunstancias de cada pasajero, respetando su dignidad en todo momento.',
    color: '#8B5CF6',
  },
  {
    icon: Compass,
    title: 'Asistencia Integral',
    desc: 'No solo conducen: acompañan. Desde ayudar a subir al vehículo, asegurar que el paciente esté cómodo, ofrecer apoyo al descender, y estar atentos a cualquier necesidad durante el trayecto. Un servicio que va más allá del simple traslado.',
    color: '#FF9800',
  },
]

function ChauffeurSection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(20,184,166,0.3) 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
        }}
      />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-[#14B8A6]/5 blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#14B8A6]/10 border border-[#14B8A6]/20 mb-4">
              <UserCheck className="w-4 h-4 text-[#14B8A6]" />
              <span className="text-sm text-[#14B8A6]">Choferes Capacitados</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Conducidos por{' '}
              <span className="bg-gradient-to-r from-[#14B8A6] via-[#0EA5E9] to-[#14B8A6] bg-clip-text text-transparent">
                Profesionales
              </span>
            </h2>
            <p className="text-white/50 max-w-3xl mx-auto text-lg">
              Nuestros choferes no son simples conductores. Son profesionales capacitados en el trato
              a pacientes y personal de salud, con la empatía, la formación y el compromiso que este
              tipo de servicio exige.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {chauffeurQualities.map((quality, i) => (
            <AnimatedSection key={quality.title} delay={i * 100}>
              <div className="group relative p-6 md:p-7 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-white/10 transition-all duration-500 h-full">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/[0.02] transition-all duration-500" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: `${quality.color}12` }}>
                    <quality.icon className="w-6 h-6" style={{ color: quality.color }} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{quality.title}</h3>
                  <p className="text-sm text-white/45 leading-relaxed">{quality.desc}</p>
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
   4. VEHICLE TYPES SECTION
   ═══════════════════════════════════════════════════════════════════════════════ */
const vehicleTypes = [
  {
    icon: Car,
    name: 'Sedán Confort',
    desc: 'Vehículo cómodo con aire acondicionado, ideal para el traslado individual de médicos o pacientes con movilidad independiente. Amplitud suficiente para un viaje tranquilo y seguro, con la comodidad que su salud requiere.',
    passengers: '3-4',
    tag: 'INDIVIDUAL',
    color: '#0EA5E9',
  },
  {
    icon: Car,
    name: 'SUV',
    desc: 'Mayor altura y espacio interior para facilitar el acceso de pacientes con movilidad reducida. Asientos más altos que permiten subir y bajar con menor esfuerzo, ideal para adultos mayores o personas con dificultades de movimiento.',
    passengers: '4',
    tag: 'INDIVIDUAL',
    color: '#14B8A6',
  },
  {
    icon: Armchair,
    name: 'Van Confort',
    desc: 'Amplio espacio interior para traslado de personal médico en grupo o pacientes que requieren compañía. Puertas laterales deslizantes que facilitan el acceso, mayor espacio para equipamiento médico personal y máxima comodidad.',
    passengers: '6-8',
    tag: 'GRUPAL',
    color: '#0077BD',
  },
  {
    icon: Wheelchair,
    name: 'Vehículo Adaptado',
    desc: 'Próximamente: vehículos equipados con rampa de acceso, espacio para silla de ruedas, asientos rebatibles y puntos de sujeción homologados. Diseñados específicamente para pacientes con discapacidad severa o movilidad muy reducida.',
    passengers: '1-3 + silla',
    tag: 'PRÓXIMAMENTE',
    color: '#8B5CF6',
  },
]

function VehicleSection() {
  const [activeVehicle, setActiveVehicle] = useState<string | null>(null)

  return (
    <section id="vehiculos" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1a12] to-[#0a0e17]" />
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] rounded-full bg-[#14B8A6]/5 blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0EA5E9]/10 border border-[#0EA5E9]/20 mb-4">
              <Car className="w-4 h-4 text-[#0EA5E9]" />
              <span className="text-sm text-[#0EA5E9]">Flota Salud</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Vehículos Según tu{' '}
              <span className="bg-gradient-to-r from-[#14B8A6] to-[#0EA5E9] bg-clip-text text-transparent">
                Necesidad
              </span>
            </h2>
            <p className="text-white/50 max-w-3xl mx-auto text-lg">
              Contamos con diferentes tipos de vehículos adaptados a las necesidades del transporte de salud.
              Desde un sedán cómodo hasta vans amplias, cada vehículo está seleccionado pensando en tu bienestar.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {vehicleTypes.map((vehicle, i) => {
            const isActive = activeVehicle === vehicle.name
            return (
              <AnimatedSection key={vehicle.name} delay={i * 100}>
                <div
                  onClick={() => setActiveVehicle(isActive ? null : vehicle.name)}
                  className={`group relative p-6 rounded-2xl bg-white/[0.03] border backdrop-blur-sm cursor-pointer transition-all duration-500 overflow-hidden ${
                    isActive ? 'bg-white/[0.06]' : 'hover:border-white/10'
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
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                      vehicle.tag === 'PRÓXIMAMENTE'
                        ? 'bg-[#8B5CF6]/10 text-[#8B5CF6] border border-[#8B5CF6]/20'
                        : 'bg-white/[0.05] text-white/40 border border-white/[0.08]'
                    }`}>
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
                        <div className="flex items-center gap-3 text-xs text-white/30 mt-1">
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            <span>{vehicle.passengers} pasajeros</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-white/45 leading-relaxed">{vehicle.desc}</p>

                    {!isActive && (
                      <p className="text-xs text-white/20 mt-3 flex items-center gap-1">
                        <ChevronRight className="w-3 h-3" />
                        Click para más detalles
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
   5. HEALTH CENTERS SECTION — Who is this for
   ═══════════════════════════════════════════════════════════════════════════════ */
const healthCenters = [
  {
    icon: Stethoscope,
    title: 'Consultorios Médicos',
    desc: 'Traslado de médicos especialistas a sus consultorios y de vuelta a casa. Movilidad para personal administrativo que necesita realizar gestiones fuera del consultorio. Un servicio puntual y confiable que mantiene la operación de tu consultorio en movimiento.',
    color: '#14B8A6',
  },
  {
    icon: Building2,
    title: 'Clínicas y Hospitales',
    desc: 'Grandes centros de salud que necesitan movilizar personal entre sedes, cubrir turnos nocturnos con transporte seguro, y ofrecer a sus pacientes un servicio de traslado confiable. Coordinamos recogidas masivas y rutas personalizadas para la máxima eficiencia.',
    color: '#0EA5E9',
  },
  {
    icon: Cross,
    title: 'Laboratorios',
    desc: 'Transporte de personal técnico para recolección de muestras, traslado de resultados entre sedes, y movilidad de profesionales que realizan visitas domiciliarias. Eficiencia logística con el cuidado que los materiales y las personas exigen.',
    color: '#0077BD',
  },
  {
    icon: Heart,
    title: 'Farmacias',
    desc: 'Movilidad para personal de farmacia que necesita realizar entregas domiciliarias, traslado entre sucursales, o simplemente llegar a su turno con la puntualidad que la atención al público demanda. Servicio ágil y confiable para la cadena de salud.',
    color: '#E91E63',
  },
  {
    icon: Wheelchair,
    title: 'Centros de Rehabilitación',
    desc: 'Traslado especializado de pacientes que acuden a terapias físicas, sesiones de rehabilitación o tratamientos ambulatorios. Nuestros choferes comprenden las necesidades de estos pacientes y ofrecen el apoyo necesario durante todo el trayecto.',
    color: '#8B5CF6',
  },
  {
    icon: HandHeart,
    title: 'Centros de Atención a Adultos Mayores',
    desc: 'Servicio especialmente diseñado para residencias y centros geriátricos. Traslado de residentes a citas médicas, actividades recreativas o regreso a casa con la delicadeza y el cariño que nuestros adultos mayores merecen en cada viaje.',
    color: '#FF9800',
  },
]

function HealthCentersSection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-[#0EA5E9]/5 blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0EA5E9]/10 border border-[#0EA5E9]/20 mb-4">
              <Building2 className="w-4 h-4 text-[#0EA5E9]" />
              <span className="text-sm text-[#0EA5E9]">Para Todo el Sector Salud</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Cubrimos todo tu{' '}
              <span className="bg-gradient-to-r from-[#0EA5E9] via-[#14B8A6] to-[#0EA5E9] bg-clip-text text-transparent">
                Centro de Salud
              </span>
            </h2>
            <p className="text-white/50 max-w-3xl mx-auto text-lg">
              Ya seas un consultorio médico, clínica, hospital, laboratorio o farmacia, tenemos la
              solución de transporte que tu centro de salud necesita. Personal médico, administrativo
              y pacientes: todos cubiertos.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {healthCenters.map((center, i) => (
            <AnimatedSection key={center.title} delay={i * 100}>
              <div className="group relative p-6 md:p-7 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-white/10 transition-all duration-500 h-full">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/[0.02] transition-all duration-500" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: `${center.color}12` }}>
                    <center.icon className="w-6 h-6" style={{ color: center.color }} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{center.title}</h3>
                  <p className="text-sm text-white/45 leading-relaxed">{center.desc}</p>
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
   6. TRUST SECTION — Why trust us
   ═══════════════════════════════════════════════════════════════════════════════ */
const trustReasons = [
  {
    icon: ShieldCheck,
    title: 'Seguridad que se Siente',
    desc: 'Cada vehículo cuenta con rastreo GPS en tiempo real, seguro del pasajero y protocolos de seguridad activos. Nuestra central de despacho monitorea cada servicio 24/7, garantizando que tanto el personal de salud como los pacientes viajen con total tranquilidad y protección.',
    color: '#14B8A6',
  },
  {
    icon: BadgeCheck,
    title: 'Choferes Certificados',
    desc: 'No cualquier conductor puede trasladar pacientes. Nuestros choferes pasan un proceso riguroso de selección y capacitación que incluye formación en primeros auxilios, trato a personas con movilidad reducida, conducción defensiva y protocolos de atención sanitaria.',
    color: '#0EA5E9',
  },
  {
    icon: Clock,
    title: 'Puntualidad Médica',
    desc: 'En el sector salud, la puntualidad puede ser crítica. Un paciente no puede llegar tarde a su quimioterapia, un médico no puede perder su turno de guardia. Nuestro compromiso es llegar siempre a tiempo, con la anticipación necesaria para un traslado sin estrés.',
    color: '#0077BD',
  },
  {
    icon: Eye,
    title: 'Supervisión Continua',
    desc: 'Desde el momento en que solicitas el servicio hasta que el pasajero llega a su destino, nuestro equipo de supervisión está monitoreando cada detalle. Si hay algún inconveniente, actuamos de inmediato. Nunca estás solo durante el traslado.',
    color: '#8B5CF6',
  },
]

function TrustSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full bg-[#14B8A6]/5 blur-[180px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <AnimatedSection>
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#14B8A6]/10 border border-[#14B8A6]/20 mb-6">
                <ShieldCheck className="w-4 h-4 text-[#14B8A6]" />
                <span className="text-sm text-[#14B8A6]">Confianza Garantizada</span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Generamos la{' '}
                <span className="bg-gradient-to-r from-[#14B8A6] to-[#0EA5E9] bg-clip-text text-transparent">
                  confianza
                </span>{' '}
                que tu salud merece
              </h2>

              <p className="text-white/55 text-lg leading-relaxed mb-8">
                En el transporte de salud, la confianza no es un valor agregado: es un requisito fundamental.
                Cuando trasladas a un paciente, cuando llevas a un médico a su turno, cuando una familia
                confía en ti para mover a su ser querido, no hay margen para errores. Por eso cada detalle
                de nuestro servicio está diseñado para generar la tranquilidad que solo la profesionalidad
                puede ofrecer.
              </p>

              {/* Key points */}
              <div className="space-y-4 mb-10">
                {[
                  { icon: CheckCircle2, text: 'Más de 10 años de experiencia en transporte profesional' },
                  { icon: CheckCircle2, text: 'Protocolos de seguridad adaptados al sector salud' },
                  { icon: CheckCircle2, text: 'Central de despacho humana disponible 24/7' },
                  { icon: CheckCircle2, text: 'Compromiso con la puntualidad y el cuidado personal' },
                ].map((point) => (
                  <div key={point.text} className="flex items-center gap-3">
                    <point.icon className="w-5 h-5 text-[#14B8A6] shrink-0" />
                    <span className="text-white/70">{point.text}</span>
                  </div>
                ))}
              </div>

              <a
                href="#contacto"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-lg font-bold text-black bg-[#14B8A6] hover:bg-[#2DD4BF] transition-all duration-300 shadow-[0_0_40px_rgba(20,184,166,0.3)] hover:shadow-[0_0_60px_rgba(20,184,166,0.5)] hover:scale-105"
              >
                Solicitar Servicio
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </AnimatedSection>

          {/* Right: Trust cards */}
          <AnimatedSection delay={200}>
            <div className="space-y-4">
              {trustReasons.map((reason, i) => (
                <div
                  key={reason.title}
                  className="group p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/10 transition-all duration-300"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${reason.color}12` }}>
                      <reason.icon className="w-6 h-6" style={{ color: reason.color }} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">{reason.title}</h3>
                      <p className="text-sm text-white/45 leading-relaxed">{reason.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   7. HOW IT WORKS SECTION
   ═══════════════════════════════════════════════════════════════════════════════ */
const howItWorksSteps = [
  {
    step: 1,
    icon: PhoneCall,
    title: 'Solicita tu Servicio',
    desc: 'Llámanos, escríbenos por WhatsApp o usa nuestra app. Indica si necesitas transporte para personal de salud o para un paciente, y los detalles del traslado.',
    color: '#14B8A6',
  },
  {
    step: 2,
    icon: Car,
    title: 'Asignamos tu Vehículo',
    desc: 'Según la necesidad, asignamos el vehículo adecuado y un chofer capacitado específicamente para el tipo de pasajero que será trasladado.',
    color: '#0EA5E9',
  },
  {
    step: 3,
    icon: User,
    title: 'Recogida y Asistencia',
    desc: 'El chofer llega puntualmente, asiste al pasajero para subir al vehículo y asegura un viaje cómodo, seguro y sin estrés durante todo el trayecto.',
    color: '#0077BD',
  },
  {
    step: 4,
    icon: ShieldCheck,
    title: 'Traslado Monitoreado',
    desc: 'Cada viaje es monitoreado en tiempo real por nuestra central de despacho. Si surge cualquier situación, estamos ahí para resolverla de inmediato.',
    color: '#8B5CF6',
  },
  {
    step: 5,
    icon: CheckCircle2,
    title: 'Llegada Segura',
    desc: 'El chofer acompaña al pasajero hasta la entrada del destino, asiste para descender del vehículo y confirma que todo esté bien antes de finalizar el servicio.',
    color: '#00E676',
  },
]

function HowItWorksSection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] rounded-full bg-[#14B8A6]/5 blur-[100px]" />
      <div className="absolute bottom-1/3 right-0 w-[400px] h-[400px] rounded-full bg-[#0EA5E9]/5 blur-[100px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#14B8A6]/10 border border-[#14B8A6]/20 mb-4">
              <Navigation className="w-4 h-4 text-[#14B8A6]" />
              <span className="text-sm text-[#14B8A6]">Así Funciona</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Un Proceso{' '}
              <span className="bg-gradient-to-r from-[#14B8A6] to-[#0EA5E9] bg-clip-text text-transparent">
                Simple y Seguro
              </span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              Desde que solicitas el servicio hasta que el pasajero llega seguro a su destino, cada paso
              está diseñado para ofrecer tranquilidad y confianza.
            </p>
          </div>
        </AnimatedSection>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#14B8A6] via-[#0EA5E9] to-[#14B8A6] md:-translate-x-px" />

          {howItWorksSteps.map((step, i) => (
            <AnimatedSection key={step.step} delay={i * 100}>
              <div className={`relative flex items-start mb-8 last:mb-0 ${
                i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}>
                {/* Dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full z-10"
                  style={{ backgroundColor: step.color, boxShadow: `0 0 20px ${step.color}50` }}
                />
                {/* Content */}
                <div className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
                  <div className="group p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-white/10 transition-all duration-300">
                    <div className={`flex items-center gap-3 mb-3 ${i % 2 === 0 ? 'md:justify-end' : ''}`}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${step.color}15` }}>
                        <step.icon className="w-5 h-5" style={{ color: step.color }} />
                      </div>
                      <h3 className="text-white font-semibold">{step.title}</h3>
                    </div>
                    <div className={`flex items-center gap-2 mb-2 ${i % 2 === 0 ? 'md:justify-end' : ''}`}>
                      <span className="text-xs font-bold uppercase tracking-wider" style={{ color: step.color }}>Paso {step.step}</span>
                    </div>
                    <p className="text-sm text-white/50 leading-relaxed">{step.desc}</p>
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
    nombre: '',
    centro: '',
    tipo: '',
    servicio: '',
    telefono: '',
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
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[#14B8A6]/8 blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#14B8A6]/10 border border-[#14B8A6]/20 mb-4">
              <Phone className="w-4 h-4 text-[#14B8A6]" />
              <span className="text-sm text-[#14B8A6]">Contáctanos</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Solicita tu{' '}
              <span className="bg-gradient-to-r from-[#14B8A6] via-[#0EA5E9] to-[#14B8A6] bg-clip-text text-transparent">
                Servicio de Salud
              </span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              Cuéntanos sobre tu centro de salud o tu necesidad de traslado y te diseñaremos
              una solución a la medida.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {/* Contact info */}
          <AnimatedSection className="lg:col-span-2">
            <div className="space-y-6">
              {[
                {
                  icon: PhoneCall,
                  title: 'Llámanos',
                  info: '(+591) 3 3296885',
                  desc: 'Línea directa para solicitudes de servicio',
                  color: '#14B8A6',
                },
                {
                  icon: MessageCircle,
                  title: 'WhatsApp',
                  info: '+591 73662803',
                  desc: 'Escríbenos y recibe atención inmediata',
                  color: '#25D366',
                },
                {
                  icon: Clock,
                  title: 'Disponibilidad',
                  info: '24 horas, 7 días',
                  desc: 'Siempre disponibles para tu servicio de salud',
                  color: '#0EA5E9',
                },
                {
                  icon: MapPin,
                  title: 'Cobertura',
                  info: 'Santa Cruz de la Sierra',
                  desc: 'Cobertura amplia en el área metropolitana',
                  color: '#0077BD',
                },
              ].map((item) => (
                <div key={item.title} className="group p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/10 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${item.color}12` }}>
                      <item.icon className="w-6 h-6" style={{ color: item.color }} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{item.title}</h3>
                      <p className="text-sm font-medium" style={{ color: item.color }}>{item.info}</p>
                      <p className="text-xs text-white/40 mt-1">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Form */}
          <AnimatedSection delay={200} className="lg:col-span-3">
            <div className="p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-[#14B8A6]/10 backdrop-blur-sm">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-[#14B8A6]/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-10 h-10 text-[#14B8A6]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Solicitud Recibida</h3>
                  <p className="text-white/50">Nos comunicaremos contigo a la brevedad para coordinar tu servicio de transporte de salud.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-white/60 mb-2">Nombre Completo</label>
                      <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder:text-white/20 focus:border-[#14B8A6]/40 focus:outline-none focus:ring-1 focus:ring-[#14B8A6]/20 transition-all"
                        placeholder="Dr. / Lic. / Enf."
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/60 mb-2">Centro de Salud</label>
                      <input
                        type="text"
                        name="centro"
                        value={formData.centro}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder:text-white/20 focus:border-[#14B8A6]/40 focus:outline-none focus:ring-1 focus:ring-[#14B8A6]/20 transition-all"
                        placeholder="Hospital, Clínica, etc."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-white/60 mb-2">Tipo de Centro</label>
                      <select
                        name="tipo"
                        value={formData.tipo}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:border-[#14B8A6]/40 focus:outline-none focus:ring-1 focus:ring-[#14B8A6]/20 transition-all"
                      >
                        <option value="" className="bg-[#0d1320]">Seleccionar...</option>
                        <option value="consultorio" className="bg-[#0d1320]">Consultorio Médico</option>
                        <option value="clinica" className="bg-[#0d1320]">Clínica</option>
                        <option value="hospital" className="bg-[#0d1320]">Hospital</option>
                        <option value="laboratorio" className="bg-[#0d1320]">Laboratorio</option>
                        <option value="farmacia" className="bg-[#0d1320]">Farmacia</option>
                        <option value="rehabilitacion" className="bg-[#0d1320]">Centro de Rehabilitación</option>
                        <option value="otro" className="bg-[#0d1320]">Otro</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-white/60 mb-2">Servicio Requerido</label>
                      <select
                        name="servicio"
                        value={formData.servicio}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:border-[#14B8A6]/40 focus:outline-none focus:ring-1 focus:ring-[#14B8A6]/20 transition-all"
                      >
                        <option value="" className="bg-[#0d1320]">Seleccionar...</option>
                        <option value="personal" className="bg-[#0d1320]">Transporte Personal de Salud</option>
                        <option value="paciente" className="bg-[#0d1320]">Transporte de Pacientes</option>
                        <option value="ambos" className="bg-[#0d1320]">Ambos Servicios</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-white/60 mb-2">Teléfono / WhatsApp</label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder:text-white/20 focus:border-[#14B8A6]/40 focus:outline-none focus:ring-1 focus:ring-[#14B8A6]/20 transition-all"
                      placeholder="+591 ..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white/60 mb-2">Detalle del Servicio</label>
                    <textarea
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder:text-white/20 focus:border-[#14B8A6]/40 focus:outline-none focus:ring-1 focus:ring-[#14B8A6]/20 transition-all resize-none"
                      placeholder="Cuéntanos sobre tus necesidades de transporte..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-lg font-bold text-black bg-[#14B8A6] hover:bg-[#2DD4BF] transition-all duration-300 shadow-[0_0_30px_rgba(20,184,166,0.3)] hover:shadow-[0_0_50px_rgba(20,184,166,0.5)]"
                  >
                    Enviar Solicitud
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </form>
              )}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   9. PATIENT CARE PROMISE SECTION
   ═══════════════════════════════════════════════════════════════════════════════ */
function PatientPromiseSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e17] via-[#0d1a12] to-[#0a0e17]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full bg-[#14B8A6]/6 blur-[180px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="relative p-8 md:p-12 rounded-3xl bg-white/[0.03] border border-[#14B8A6]/15 backdrop-blur-sm overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#14B8A6]/5 blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-[#0EA5E9]/5 blur-[100px]" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#14B8A6]/10 border border-[#14B8A6]/20 mb-6">
                  <Heart className="w-4 h-4 text-[#14B8A6]" />
                  <span className="text-sm text-[#14B8A6]">Nuestro Compromiso</span>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                  Cada paciente merece ser{' '}
                  <span className="bg-gradient-to-r from-[#14B8A6] to-[#0EA5E9] bg-clip-text text-transparent">
                    tratado con dignidad
                  </span>
                </h2>

                <p className="text-white/55 text-lg leading-relaxed mb-8">
                  Un paciente no es un pasajero más. Es una persona que puede estar atravesando uno de los
                  momentos más difíciles de su vida. Que necesita llegar a su tratamiento, a su consulta,
                  o simplemente volver a casa después de un día agotador en el hospital. Nuestro compromiso
                  es que cada traslado sea una experiencia de cuidado, respeto y calidez humana. Porque la
                  salud comienza desde el momento en que abres la puerta de nuestro vehículo.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Heart, label: 'Trato humano', color: '#14B8A6' },
                    { icon: ShieldCheck, label: 'Seguridad total', color: '#0EA5E9' },
                    { icon: Clock, label: 'Puntualidad', color: '#0077BD' },
                    { icon: Smile, label: 'Empatía siempre', color: '#FF9800' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                      <item.icon className="w-5 h-5 shrink-0" style={{ color: item.color }} />
                      <span className="text-sm text-white/70 font-medium">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right side - Visual representation */}
              <div className="relative">
                <div className="relative p-8 rounded-2xl bg-white/[0.04] border border-[#14B8A6]/10 backdrop-blur-xl">
                  {/* Mock care card */}
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-[#14B8A6]/10 flex items-center justify-center mx-auto mb-4">
                      <HandHeart className="w-10 h-10 text-[#14B8A6]" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Promesa de Cuidado</h3>
                    <p className="text-sm text-white/40">Cada traslado, una experiencia de bienestar</p>
                  </div>

                  <div className="space-y-3">
                    {[
                      { label: 'Asistencia al subir', value: '100%', color: '#14B8A6' },
                      { label: 'Conducción suave', value: '100%', color: '#0EA5E9' },
                      { label: 'Acompañamiento al bajar', value: '100%', color: '#0077BD' },
                      { label: 'Satisfacción del pasajero', value: '100%', color: '#00E676' },
                    ].map((bar) => (
                      <div key={bar.label}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-white/50">{bar.label}</span>
                          <span style={{ color: bar.color }} className="font-bold">{bar.value}</span>
                        </div>
                        <div className="h-2 rounded-full bg-white/[0.04] overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-1000"
                            style={{
                              width: bar.value,
                              background: `linear-gradient(90deg, ${bar.color}, ${bar.color}80)`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/[0.06] text-center">
                    <p className="text-xs text-[#14B8A6] font-semibold">
                      Porque tu bienestar es nuestra prioridad
                    </p>
                  </div>
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
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0e17]">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <ServiceAreasSection />
        <ChauffeurSection />
        <VehicleSection />
        <HealthCentersSection />
        <TrustSection />
        <HowItWorksSection />
        <PatientPromiseSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
