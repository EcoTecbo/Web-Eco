'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Car, Bus, Users, Shield, CheckCircle2, ArrowRight,
  Phone, MapPin, MessageCircle, Headphones,
  User, Navigation, Clock, Heart,
  Crown, CircleDollarSign, Compass,
  BusFront, Truck as VanIcon, Wind, ShieldCheck,
  Stethoscope, Activity, HeartPulse, Accessibility,
  Building2, FlaskConical, Pill, GraduationCap,
  Baby, UserCheck, HandHeart, Ambulance,
  Eye, Sparkles, BadgeCheck, Route,
  PhoneCall, AlertCircle, Timer
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
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(14,165,233,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[#0EA5E9]/12 blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#F43F5E]/8 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[#00E676]/6 blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="absolute top-32 right-[8%] md:right-[18%] opacity-[0.07]">
        <HeartPulse className="w-28 h-28 md:w-40 md:h-40 text-[#0EA5E9]" />
      </div>
      <div className="absolute bottom-28 left-[5%] md:left-[12%] opacity-[0.06]">
        <Stethoscope className="w-20 h-20 md:w-28 md:h-28 text-[#F43F5E]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 pb-16">
        <AnimatedSection>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0EA5E9]/10 border border-[#0EA5E9]/20 mb-8 backdrop-blur-sm">
            <HeartPulse className="w-4 h-4 text-[#0EA5E9]" />
            <span className="text-sm text-[#0EA5E9] font-medium">Transporte de Salud</span>
          </div>
        </AnimatedSection>
        <AnimatedSection delay={100}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Tu salud merece{' '}
            <span className="bg-gradient-to-r from-[#0EA5E9] via-[#00E676] to-[#F43F5E] bg-clip-text text-transparent">
              confianza
            </span>
          </h1>
        </AnimatedSection>
        <AnimatedSection delay={200}>
          <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-10 leading-relaxed">
            Transporte especializado para personal de salud y pacientes. Choferes capacitados,
            trato humano y la puntualidad que la vida exige. Desde el médico que vuelve a casa
            después de guardia, hasta el paciente que necesita un traslado con cuidado.
          </p>
        </AnimatedSection>
        <AnimatedSection delay={300}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <a href="#personal" className="px-8 py-4 rounded-full text-lg font-semibold text-white bg-[#0EA5E9] hover:bg-[#38bdf8] transition-all duration-300 shadow-[0_0_30px_rgba(14,165,233,0.3)] hover:shadow-[0_0_50px_rgba(14,165,233,0.5)] hover:scale-105">
              Personal de Salud
            </a>
            <a href="#pacientes" className="px-8 py-4 rounded-full text-lg font-semibold text-white border border-[#F43F5E]/40 hover:border-[#F43F5E]/70 hover:bg-[#F43F5E]/5 transition-all duration-300">
              Traslado de Pacientes
            </a>
          </div>
        </AnimatedSection>
        <AnimatedSection delay={400}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { value: '2', label: 'Áreas de servicio', icon: HeartPulse },
              { value: '24/7', label: 'Disponibilidad', icon: Clock },
              { value: '100%', label: 'Choferes capacitados', icon: UserCheck },
              { value: 'Pronto', label: 'Vehículos adaptados', icon: Accessibility },
            ].map((stat) => (
              <div key={stat.label} className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-[#0EA5E9]/20 transition-all duration-300">
                <stat.icon className="w-5 h-5 text-[#0EA5E9] mx-auto mb-2" />
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
   2. TWO AREAS — Personal Médico vs Pacientes
   ═══════════════════════════════════════════════════════════════════════════════ */
function TwoAreasSection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] rounded-full bg-[#0EA5E9]/4 blur-[150px]" />
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] rounded-full bg-[#F43F5E]/4 blur-[150px]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] mb-4">
              <Activity className="w-4 h-4 text-[#0EA5E9]" />
              <span className="text-sm text-white/60">Dos áreas, un mismo compromiso</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Diseñado para{' '}
              <span className="bg-gradient-to-r from-[#0EA5E9] to-[#F43F5E] bg-clip-text text-transparent">
                quienes cuidan
              </span>
            </h2>
            <p className="text-white/50 max-w-3xl mx-auto text-lg">
              Ya seas personal de salud que necesita movilidad confiable, o un paciente que requiere
              un traslado con el cuidado y respeto que merece — Ecotaxi Salud está aquí para ti.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Personal Médico */}
          <AnimatedSection delay={100}>
            <div className="group relative p-8 rounded-2xl bg-white/[0.03] border border-[#0EA5E9]/15 backdrop-blur-sm hover:border-[#0EA5E9]/30 transition-all duration-500 h-full">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#0EA5E9]/0 to-[#0EA5E9]/0 group-hover:from-[#0EA5E9]/3 transition-all duration-500" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-[#0EA5E9]/10 flex items-center justify-center mb-6">
                  <Stethoscope className="w-8 h-8 text-[#0EA5E9]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Personal de Salud</h3>
                <p className="text-white/45 leading-relaxed mb-6">
                  Para médicos, enfermeras, técnicos y personal administrativo que necesita
                  llegar a casa después de una larga jornada de guardia, o ser recogidos
                  desde su domicilio para iniciar el turno. También para el desplazamiento
                  de tu personal en gestiones que requiera tu centro de salud.
                </p>
                <div className="space-y-3 mb-6">
                  {[
                    { icon: Clock, text: 'Recogida y retorno después de guardias nocturnas', color: '#0EA5E9' },
                    { icon: MapPin, text: 'Traslado para gestiones del centro de salud', color: '#0EA5E9' },
                    { icon: Users, text: 'Movilidad de personal administrativo y médico', color: '#0EA5E9' },
                    { icon: Building2, text: 'Consultorios, clínicas, hospitales, laboratorios y farmacias', color: '#0EA5E9' },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${item.color}12` }}>
                        <item.icon className="w-4 h-4" style={{ color: item.color }} />
                      </div>
                      <span className="text-white/60 text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>
                <a href="#personal" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-[#0EA5E9]/15 border border-[#0EA5E9]/25 hover:bg-[#0EA5E9]/25 transition-all duration-300">
                  Conocer más
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </AnimatedSection>

          {/* Pacientes */}
          <AnimatedSection delay={200}>
            <div className="group relative p-8 rounded-2xl bg-white/[0.03] border border-[#F43F5E]/15 backdrop-blur-sm hover:border-[#F43F5E]/30 transition-all duration-500 h-full">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#F43F5E]/0 to-[#F43F5E]/0 group-hover:from-[#F43F5E]/3 transition-all duration-500" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-[#F43F5E]/10 flex items-center justify-center mb-6">
                  <Heart className="w-8 h-8 text-[#F43F5E]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Traslado de Pacientes</h3>
                <p className="text-white/45 leading-relaxed mb-6">
                  Para pacientes que necesitan trasladarse con choferes capacitados para este
                  tipo de pasajeros. Personas adultas, con discapacidad o movilidad reducida
                  que requieren un trato diferente, personalizado y lleno de respeto.
                  Muy pronto: vehículos adaptados para una mejor gestión.
                </p>
                <div className="space-y-3 mb-6">
                  {[
                    { icon: HandHeart, text: 'Choferes capacitados en trato a pacientes', color: '#F43F5E' },
                    { icon: Accessibility, text: 'Atención a personas con movilidad reducida', color: '#F43F5E' },
                    { icon: UserCheck, text: 'Trato personalizado y respetuoso', color: '#F43F5E' },
                    { icon: Accessibility, text: 'Pronto: vehículos adaptados para sillas de ruedas', color: '#F43F5E' },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${item.color}12` }}>
                        <item.icon className="w-4 h-4" style={{ color: item.color }} />
                      </div>
                      <span className="text-white/60 text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>
                <a href="#pacientes" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-[#F43F5E]/15 border border-[#F43F5E]/25 hover:bg-[#F43F5E]/25 transition-all duration-300">
                  Conocer más
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   3. PERSONAL MÉDICO — Detalle
   ═══════════════════════════════════════════════════════════════════════════════ */
function PersonalMedicoSection() {
  return (
    <section id="personal" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-[#0EA5E9]/4 blur-[120px]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection>
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0EA5E9]/10 border border-[#0EA5E9]/20 mb-6">
                <Stethoscope className="w-4 h-4 text-[#0EA5E9]" />
                <span className="text-sm text-[#0EA5E9]">Personal de Salud</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Movilidad para quienes{' '}
                <span className="bg-gradient-to-r from-[#0EA5E9] to-[#00E676] bg-clip-text text-transparent">cuidan vidas</span>
              </h2>
              <p className="text-white/50 text-lg leading-relaxed mb-6">
                Después de una larga jornada de guardia, lo último que necesitas es preocuparte por cómo llegar a casa.
                Ecotaxi Salud te recoge en la puerta de tu hospital, clínica o consultorio y te lleva directo a tu hogar
                con la comodidad y seguridad que mereces. Choferes que entienden tus horarios y la importancia de tu descanso.
              </p>
              <p className="text-white/50 text-lg leading-relaxed mb-8">
                También cubrimos el desplazamiento de tu personal administrativo y médico para gestiones que requieran
                movilidad fuera del centro de salud. Ya sea un traslado a otra sede, una capacitación o una gestión externa,
                nosotros nos encargamos del transporte.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <div className="space-y-4">
              {[
                {
                  icon: Clock,
                  title: 'Después de Guardia',
                  desc: 'Recogida nocturna o en cualquier horario después de tu turno. Chofer esperando en la puerta de tu centro de salud para llevarte directo a casa. Sin esperas, sin estrés.',
                  color: '#0EA5E9',
                },
                {
                  icon: MapPin,
                  title: 'Recogida Domiciliaria',
                  desc: 'Te recogemos en tu casa para llevarte al turno. Puntualidad garantizada para que nunca llegues tarde a tu guardia o consulta. Tu vehículo estará ahí cuando lo necesites.',
                  color: '#00E676',
                },
                {
                  icon: Users,
                  title: 'Movilidad de Personal',
                  desc: 'Transporte para gestiones del centro de salud: traslados entre sedes, capacitaciones, reuniones externas, visitas domiciliarias. Coordinamos rutas y horarios según tu agenda.',
                  color: '#0077BD',
                },
                {
                  icon: Building2,
                  title: 'Para Todo Centro de Salud',
                  desc: 'Consultorios médicos, clínicas privadas, hospitales públicos y privados, laboratorios clínicos y farmacias. Cualquiera sea tu centro de salud, lo tenemos cubierto.',
                  color: '#8B5CF6',
                },
              ].map((item) => (
                <div key={item.title} className="group p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-white/10 transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${item.color}12` }}>
                      <item.icon className="w-5 h-5" style={{ color: item.color }} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                      <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
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
   4. CENTROS DE SALUD — Quiénes se benefician
   ═══════════════════════════════════════════════════════════════════════════════ */
const centrosSalud = [
  { icon: Stethoscope, title: 'Consultorios Médicos', desc: 'Transporte para médicos con consulta privada. Recogida y retorno garantizado para tu jornada de consultas, con la discreción y puntualidad que tu práctica requiere.', color: '#0EA5E9' },
  { icon: Building2, title: 'Clínicas Privadas', desc: 'Movilidad integral para el equipo médico y administrativo de tu clínica. Desde médicos especialistas hasta personal de limpieza — todos llegan a tiempo y seguros.', color: '#00E676' },
  { icon: HeartPulse, title: 'Hospitales', desc: 'Servicio a gran escala para hospitales. Gestión de flota para personal de guardia, traslados entre sedes hospitalarias y movilidad de pacientes ambulatorios.', color: '#0077BD' },
  { icon: FlaskConical, title: 'Laboratorios', desc: 'Traslado seguro de personal de laboratorio y transporte controlado de muestras biológicas cuando se requiere movilidad entre puntos de recolección y análisis.', color: '#8B5CF6' },
  { icon: Pill, title: 'Farmacias', desc: 'Movilidad para farmacéuticos y personal de farmacia. También cubrimos el transporte de insumos farmacéuticos entre sucursales cuando se requiere servicio de entrega urgente.', color: '#FF6B35' },
]

function CentrosSaludSection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-[#0EA5E9]/4 blur-[150px]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0077BD]/10 border border-[#0077BD]/20 mb-4">
              <Building2 className="w-4 h-4 text-[#0077BD]" />
              <span className="text-sm text-[#0077BD]">Centros de Salud</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Lo tenemos{' '}
              <span className="bg-gradient-to-r from-[#0EA5E9] to-[#00E676] bg-clip-text text-transparent">
                cubierto
              </span>
            </h2>
            <p className="text-white/50 max-w-3xl mx-auto text-lg">
              Ya seas un consultorio médico, una clínica, un hospital, un laboratorio o una farmacia —
              Ecotaxi Salud tiene la solución de transporte que tu centro necesita.
            </p>
          </div>
        </AnimatedSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {centrosSalud.map((centro, i) => (
            <AnimatedSection key={centro.title} delay={i * 70}>
              <div className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-white/10 transition-all duration-500 h-full">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/[0.02] transition-all duration-500" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: `${centro.color}12` }}>
                    <centro.icon className="w-6 h-6" style={{ color: centro.color }} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{centro.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{centro.desc}</p>
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
   5. PACIENTES — Detalle
   ═══════════════════════════════════════════════════════════════════════════════ */
function PacientesSection() {
  return (
    <section id="pacientes" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e17] via-[#1a0a14] to-[#0a0e17]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-[#F43F5E]/6 blur-[150px]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection>
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F43F5E]/10 border border-[#F43F5E]/20 mb-6">
                <Heart className="w-4 h-4 text-[#F43F5E]" />
                <span className="text-sm text-[#F43F5E]">Traslado de Pacientes</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Un trato que{' '}
                <span className="bg-gradient-to-r from-[#F43F5E] to-[#FF9EC6] bg-clip-text text-transparent">inspira confianza</span>
              </h2>
              <p className="text-white/50 text-lg leading-relaxed mb-6">
                Sabemos que un paciente no es un pasajero cualquiera. Requiere un trato diferente,
                más suave, más atento, más humano. Nuestros choferes están capacitados específicamente
                para asistir a personas adultas mayores, pacientes con movilidad reducida y personas
                con discapacidad que necesitan apoyo durante el traslado.
              </p>
              <p className="text-white/50 text-lg leading-relaxed mb-8">
                No es solo llevar a alguien de un punto a otro — es acompañar, ayudar, tener paciencia
                y tratar a cada persona con la dignidad que merece. Ese es el enfoque de Ecotaxi Salud:
                generar confianza en cada viaje.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <div className="space-y-4">
              {[
                {
                  icon: HandHeart,
                  title: 'Choferes Capacitados',
                  desc: 'Entrenados en primeros auxilios, asistencia a personas con movilidad reducida, protocolo de trato a pacientes y manejo de situaciones de emergencia durante el traslado.',
                  color: '#F43F5E',
                },
                {
                  icon: Accessibility,
                  title: 'Movilidad Reducida',
                  desc: 'Asistencia especial para personas con discapacidad o movilidad reducida. Ayuda para subir y bajar del vehículo, acomodación cómoda y acompañamiento hasta la puerta.',
                  color: '#E91E63',
                },
                {
                  icon: Heart,
                  title: 'Adultos Mayores',
                  desc: 'Trato respetuoso y paciente con personas de la tercera edad. Conducción suave, sin frenadas bruscas, y la cortesía que la experiencia de vida merece.',
                  color: '#FF6B35',
                },
                {
                  icon: UserCheck,
                  title: 'Trato Personalizado',
                  desc: 'Cada paciente es diferente. Nos adaptamos a las necesidades específicas de cada persona: paradas adicionales, velocidad de conducción, asistencia en puertas y más.',
                  color: '#8B5CF6',
                },
              ].map((item) => (
                <div key={item.title} className="group p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-white/10 transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${item.color}12` }}>
                      <item.icon className="w-5 h-5" style={{ color: item.color }} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                      <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
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
   6. VEHÍCULOS
   ═══════════════════════════════════════════════════════════════════════════════ */
const healthVehicles = [
  { icon: Car, name: 'Sedán', capacity: '3-4 pasajeros', desc: 'Vehículo cómodo para traslados individuales. Ideal para el médico que vuelve a casa o el paciente que va a consulta.', color: '#0EA5E9', type: 'Personal' },
  { icon: Car, name: 'Sedán VIP', capacity: '3 pasajeros', desc: 'Alta gama para directores médicos, especialistas y pacientes que requieren máxima comodidad y privacidad durante el traslado.', color: '#D4AF37', type: 'VIP' },
  { icon: Car, name: 'SUV', capacity: '4-5 pasajeros', desc: 'SUV amplio y accesible. Mayor altura para facilitar el ingreso de pacientes con movilidad reducida y espacio para equipamiento médico.', color: '#00E676', type: 'Pacientes' },
  { icon: VanIcon, name: 'Minivan / Van', capacity: '8-12 pasajeros', desc: 'Para transporte de equipos médicos completos, personal de guardia o grupos de pacientes ambulatorios con acompañantes.', color: '#FF6B35', type: 'Ambos' },
  { icon: BusFront, name: 'Minibus', capacity: '15-25 pasajeros', desc: 'Para hospitales y clínicas que necesitan movilizar personal en grandes grupos entre sedes o capacitaciones fuera de la ciudad.', color: '#8B5CF6', type: 'Personal' },
  { icon: Accessibility, name: 'Vehículo Adaptado', capacity: '1-3 pasajeros', desc: 'Próximamente: vehículos con rampa o plataforma elevadora para sillas de ruedas. Un compromiso con la inclusión y la accesibilidad total.', color: '#F43F5E', type: 'PRONTO' },
]

function VehicleOptionsSection() {
  return (
    <section id="vehiculos" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full bg-[#00E676]/4 blur-[120px]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 mb-4">
              <Car className="w-4 h-4 text-[#00E676]" />
              <span className="text-sm text-[#00E676]">Vehículos</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Un vehículo para cada{' '}
              <span className="bg-gradient-to-r from-[#0EA5E9] via-[#00E676] to-[#F43F5E] bg-clip-text text-transparent">
                necesidad
              </span>
            </h2>
            <p className="text-white/50 max-w-3xl mx-auto text-lg">
              Desde el médico que necesita llegar rápido hasta el paciente que requiere un traslado
              cuidadoso — tenemos el vehículo adecuado y el chofer capacitado.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {healthVehicles.map((vehicle, i) => (
            <AnimatedSection key={vehicle.name} delay={i * 70}>
              <div className={`group relative p-6 rounded-2xl bg-white/[0.03] border backdrop-blur-sm hover:border-white/10 transition-all duration-500 h-full ${
                vehicle.type === 'PRONTO' ? 'border-[#F43F5E]/20' : 'border-white/[0.06]'
              }`}>
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ boxShadow: `0 0 20px ${vehicle.color}08` }} />
                <div className="absolute top-3 right-3">
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${vehicle.type === 'PRONTO' ? 'animate-pulse' : ''}`} style={{ backgroundColor: `${vehicle.color}12`, color: vehicle.color }}>{vehicle.type}</span>
                </div>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300" style={{ background: `${vehicle.color}12` }}>
                    <vehicle.icon className="w-6 h-6" style={{ color: vehicle.color }} />
                  </div>
                  <h3 className="text-white font-semibold mb-1">{vehicle.name}</h3>
                  <p className="text-xs text-white/30 mb-3">{vehicle.capacity}</p>
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
   7. CONFIANZA — Seguridad y compromiso
   ═══════════════════════════════════════════════════════════════════════════════ */
function ConfianzaSection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `radial-gradient(circle, rgba(14,165,233,0.3) 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection>
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0EA5E9]/10 border border-[#0EA5E9]/20 mb-6">
                <Shield className="w-4 h-4 text-[#0EA5E9]" />
                <span className="text-sm text-[#0EA5E9]">Confianza</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Generamos la confianza que{' '}
                <span className="bg-gradient-to-r from-[#0EA5E9] to-[#F43F5E] bg-clip-text text-transparent">la salud exige</span>
              </h2>
              <p className="text-white/50 text-lg leading-relaxed mb-6">
                Cuando se trata de salud, no hay margen para errores ni improvisaciones. Por eso cada
                aspecto de nuestro servicio está diseñado para inspirar tranquilidad: desde la selección
                y capacitación de choferes, hasta el seguimiento en tiempo real y la comunicación constante
                con la central y con el centro de salud.
              </p>
              <p className="text-white/50 text-lg leading-relaxed mb-8">
                Sabemos que detrás de cada servicio hay una persona que depende de nosotros — un médico
                que necesita descansar, un paciente que necesita llegar a su tratamiento, un familiar que
                confía en que su ser querido llegará bien. Esa responsabilidad nos toma en serio.
              </p>
              <div className="space-y-3">
                {[
                  { icon: ShieldCheck, text: 'Seguro de pasajeros en todos los vehículos', color: '#0EA5E9' },
                  { icon: UserCheck, text: 'Choferes con certificación en trato a pacientes', color: '#00E676' },
                  { icon: Navigation, text: 'GPS y seguimiento en tiempo real', color: '#0077BD' },
                  { icon: Eye, text: 'Monitoreo 24/7 desde central de operaciones', color: '#FF6B35' },
                  { icon: Phone, text: 'Comunicación directa con chofer y centro de salud', color: '#8B5CF6' },
                  { icon: Clock, text: 'Puntualidad garantizada para citas y tratamientos', color: '#F43F5E' },
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
          <AnimatedSection delay={200}>
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl border border-[#0EA5E9]/8 animate-glow-pulse" />
              <div className="relative p-8 rounded-2xl bg-white/[0.04] border border-[#0EA5E9]/12 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#0EA5E9] animate-pulse" />
                    <span className="text-sm text-white/60">Servicio Activo</span>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                  </div>
                </div>
                {/* Trip card */}
                <div className="p-4 rounded-xl bg-[#0EA5E9]/5 border border-[#0EA5E9]/10 mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <HeartPulse className="w-4 h-4 text-[#0EA5E9]" />
                    <span className="text-sm font-semibold text-white">Traslado de Paciente</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center p-2 rounded-lg bg-white/[0.03]">
                      <div className="text-lg font-bold text-[#0EA5E9]">Dr. R.</div>
                      <div className="text-[10px] text-white/30">Médico</div>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-white/[0.03]">
                      <div className="text-lg font-bold text-[#F43F5E]">SRA.</div>
                      <div className="text-[10px] text-white/30">Paciente</div>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-white/[0.03]">
                      <div className="text-lg font-bold text-[#00E676]">SUV</div>
                      <div className="text-[10px] text-white/30">Vehículo</div>
                    </div>
                  </div>
                </div>
                {/* Status items */}
                <div className="space-y-2.5">
                  {[
                    { label: 'Chofer', value: 'María L. · Certificada', color: '#0EA5E9' },
                    { label: 'Paciente', value: 'Sra. Fernández · Adulto mayor', color: '#F43F5E' },
                    { label: 'Ruta', value: 'Clínica Santa Cruz → Domicilio', color: '#00E676' },
                    { label: 'Estado', value: 'En camino · GPS activo', color: '#8B5CF6' },
                    { label: 'Asistencia', value: 'Acompañamiento hasta puerta', color: '#FF6B35' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02]">
                      <span className="text-xs text-white/30">{item.label}</span>
                      <span className="text-xs font-semibold" style={{ color: item.color }}>{item.value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 rounded-xl bg-[#F43F5E]/5 border border-[#F43F5E]/10">
                  <div className="flex items-center gap-2">
                    <HandHeart className="w-4 h-4 text-[#F43F5E]" />
                    <span className="text-xs text-[#F43F5E] font-semibold">Trato personalizado — Paciente acompañada</span>
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
   8. PRÓXIMAMENTE — Vehículos adaptados
   ═══════════════════════════════════════════════════════════════════════════════ */
function ProximamenteSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[#F43F5E]/6 blur-[150px]" />
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="relative p-8 md:p-12 rounded-3xl bg-white/[0.03] border border-[#F43F5E]/15 backdrop-blur-sm">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#F43F5E]/5 via-transparent to-[#0EA5E9]/5" />
            <div className="relative z-10 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#F43F5E]/10 flex items-center justify-center mx-auto mb-6">
                <Accessibility className="w-8 h-8 text-[#F43F5E]" />
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F43F5E]/10 border border-[#F43F5E]/20 mb-6">
                <Sparkles className="w-4 h-4 text-[#F43F5E]" />
                <span className="text-sm text-[#F43F5E] font-semibold">Próximamente</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Vehículos{' '}
                <span className="bg-gradient-to-r from-[#F43F5E] to-[#FF9EC6] bg-clip-text text-transparent">
                  Adaptados
                </span>
              </h2>
              <p className="text-white/50 text-lg leading-relaxed max-w-2xl mx-auto mb-6">
                Estamos trabajando para incorporar vehículos con rampa de acceso y plataforma elevadora
                para sillas de ruedas. Un compromiso con la inclusión y la accesibilidad que todos merecen.
                Porque la movilidad es un derecho, no un privilegio.
              </p>
              <p className="text-white/40 text-base leading-relaxed max-w-xl mx-auto mb-8">
                Si quieres ser notificado cuando tengamos disponibles los vehículos adaptados,
                déjanos tu contacto y te avisamos de inmediato.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="https://wa.me/59173662803?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20los%20veh%C3%ADculos%20adaptados%20para%20pacientes" target="_blank" rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full text-base font-semibold text-white bg-[#F43F5E] hover:bg-[#fb7185] transition-all duration-300 shadow-[0_0_25px_rgba(244,63,94,0.3)] hover:shadow-[0_0_40px_rgba(244,63,94,0.5)] flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Quiero ser notificado
                </a>
                <a href="tel:+59133296885"
                  className="px-6 py-3 rounded-full text-base font-semibold text-white/70 border border-white/15 hover:border-white/30 hover:bg-white/5 transition-all duration-300 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Llamar ahora
                </a>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   9. CTA
   ═══════════════════════════════════════════════════════════════════════════════ */
function CTASection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#0EA5E9]/8 blur-[120px]" />
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <HeartPulse className="w-12 h-12 text-[#0EA5E9] mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Tu salud merece{' '}
            <span className="bg-gradient-to-r from-[#0EA5E9] via-[#00E676] to-[#F43F5E] bg-clip-text text-transparent">
              transporte confiable
            </span>
          </h2>
          <p className="text-white/50 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Ya seas personal de salud que necesita llegar a casa, o un paciente que requiere
            un traslado con el cuidado que merece — estamos aquí para ti.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <a href="https://id3251.tm.taxi:58443/?cid=1" target="_blank" rel="noopener noreferrer"
              className="px-8 py-4 rounded-full text-lg font-semibold text-white bg-[#0EA5E9] hover:bg-[#38bdf8] transition-all duration-300 shadow-[0_0_30px_rgba(14,165,233,0.3)] hover:shadow-[0_0_50px_rgba(14,165,233,0.5)] hover:scale-105 flex items-center gap-2">
              Reservar Servicio
              <ArrowRight className="w-5 h-5" />
            </a>
            <a href="https://wa.me/59173662803?text=Hola%2C%20necesito%20transporte%20de%20salud" target="_blank" rel="noopener noreferrer"
              className="px-8 py-4 rounded-full text-lg font-semibold text-[#25D366] border border-[#25D366]/30 bg-[#25D366]/5 hover:bg-[#25D366]/10 hover:border-[#25D366]/50 transition-all duration-300 flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              WhatsApp Salud
            </a>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {[
              { icon: Shield, text: 'Choferes capacitados' },
              { icon: Heart, text: 'Trato humano' },
              { icon: Navigation, text: 'GPS en tiempo real' },
              { icon: Clock, text: 'Disponible 24/7' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-white/30">
                <item.icon className="w-4 h-4 text-[#0EA5E9]/50" />
                <span className="text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════════════════════ */
export default function TransporteSaludPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0e17]">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <TwoAreasSection />
        <PersonalMedicoSection />
        <CentrosSaludSection />
        <PacientesSection />
        <VehicleOptionsSection />
        <ConfianzaSection />
        <ProximamenteSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
