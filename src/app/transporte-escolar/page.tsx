'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Bus, Shield, MapPin, Route, Bell, Users, Phone,
  ArrowRight, CheckCircle2, Star, UserCheck, Clock,
  BadgeCheck, ShieldCheck, PhoneCall, MessageCircle,
  Navigation, Baby, Car, GraduationCap, Eye,
  Sparkles, ChevronRight, Handshake, Home, BookOpen,
  ClipboardCheck, Send, CircleCheck, Wrench, Cog
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
   1. HERO SECTION — School Transport Theme
   ═══════════════════════════════════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src="/service-escolar.png"
          alt="Transporte Escolar Ecotaxi"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17]/70 via-[#0a0e17]/85 to-[#0a0e17]" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.4) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[#3B82F6]/12 blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#22C55E]/10 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[#3B82F6]/6 blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Decorative icons */}
      <div className="absolute top-32 right-[8%] md:right-[18%] opacity-[0.07]">
        <GraduationCap className="w-28 h-28 md:w-40 md:h-40 text-[#3B82F6]" />
      </div>
      <div className="absolute bottom-28 left-[5%] md:left-[12%] opacity-[0.05]">
        <Bus className="w-20 h-20 md:w-28 md:h-28 text-[#22C55E]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 pb-16">
        {/* Badge */}
        <AnimatedSection>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/25 mb-8 backdrop-blur-sm">
            <GraduationCap className="w-4 h-4 text-[#3B82F6]" />
            <span className="text-sm text-[#3B82F6] font-medium">Transporte Escolar</span>
          </div>
        </AnimatedSection>

        {/* Title */}
        <AnimatedSection delay={100}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Seguridad y Confianza{' '}
            <br className="hidden sm:block" />
            para tus{' '}
            <span className="bg-gradient-to-r from-[#3B82F6] via-[#22C55E] to-[#3B82F6] bg-clip-text text-transparent">
              Hijos
            </span>
          </h1>
        </AnimatedSection>

        {/* Subtitle */}
        <AnimatedSection delay={200}>
          <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-10 leading-relaxed">
            Transporte escolar seguro con conductores certificados, vehículos monitoreados y 
            seguimiento GPS en tiempo real. La tranquilidad que tus hijos merecen y tú necesitas 
            para cada trayecto hacia su centro educativo.
          </p>
        </AnimatedSection>

        {/* CTA buttons */}
        <AnimatedSection delay={300}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <a
              href="#servicios"
              className="px-8 py-4 rounded-full text-lg font-semibold text-white bg-[#3B82F6] hover:bg-[#2563EB] transition-all duration-300 shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:shadow-[0_0_50px_rgba(59,130,246,0.5)] hover:scale-105"
            >
              Conocer Servicios
            </a>
            <a
              href="#contacto"
              className="px-8 py-4 rounded-full text-lg font-semibold text-[#3B82F6] border border-[#3B82F6]/30 hover:border-[#3B82F6]/60 hover:bg-[#3B82F6]/5 transition-all duration-300"
            >
              Solicitar Transporte
            </a>
          </div>
        </AnimatedSection>

        {/* Stats bar */}
        <AnimatedSection delay={400}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { value: '2.500+', label: 'Estudiantes transportados', icon: GraduationCap },
              { value: '50+', label: 'Rutas escolares', icon: Route },
              { value: '100%', label: 'Conductores certificados', icon: UserCheck },
              { value: 'GPS', label: 'Monitoreo en tiempo real', icon: Navigation },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-4 rounded-2xl bg-white/[0.03] border border-[#3B82F6]/10 backdrop-blur-sm hover:border-[#3B82F6]/20 transition-all duration-300"
              >
                <stat.icon className="w-5 h-5 text-[#3B82F6] mx-auto mb-2" />
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
   2. SERVICE OVERVIEW — Transporte Regular & Transporte Eventual
   ═══════════════════════════════════════════════════════════════════════════════ */
function ServiceOverviewSection() {
  return (
    <section id="servicios" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-[#3B82F6]/5 blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 mb-4">
              <Bus className="w-4 h-4 text-[#3B82F6]" />
              <span className="text-sm text-[#3B82F6]">Dos Modalidades, Una Prioridad</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Nuestros Servicios{' '}
              <span className="bg-gradient-to-r from-[#3B82F6] via-[#22C55E] to-[#3B82F6] bg-clip-text text-transparent">
                Escolares
              </span>
            </h2>
            <p className="text-white/50 max-w-3xl mx-auto text-lg">
              Ofrecemos dos modalidades de transporte escolar diseñadas para cubrir todas las necesidades 
              de movilidad estudiantil: desde el recorrido diario hasta salidas especiales y eventos educativos.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* CARD 1: Transporte Regular */}
          <AnimatedSection delay={100}>
            <div className="relative rounded-2xl overflow-hidden bg-white/[0.03] border border-[#3B82F6]/15 backdrop-blur-sm h-full">
              {/* Image header */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src="/service-escolar.png"
                  alt="Transporte Regular Escolar"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e17] via-[#0a0e17]/50 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-1.5 rounded-full text-xs font-bold text-white bg-[#3B82F6] uppercase tracking-wider shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                    Regular
                  </span>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-[#3B82F6]/10 flex items-center justify-center">
                    <Bus className="w-8 h-8 text-[#3B82F6]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Transporte Regular</h3>
                    <p className="text-sm text-[#3B82F6]">Rutas diarias escuela-casa</p>
                  </div>
                </div>

                <p className="text-white/50 leading-relaxed mb-6">
                  Nuestro servicio de transporte regular cubre las rutas diarias de ida y vuelta 
                  entre el hogar y el centro educativo. Cada estudiante tiene una ruta designada 
                  con horarios fijos, paradas establecidas y un conductor asignado que conoce 
                  personalmente a cada niño y su familia. La puntualidad y la seguridad son 
                  nuestros compromisos más importantes en cada recorrido.
                </p>

                <div className="space-y-3 mb-6">
                  {[
                    { icon: MapPin, text: 'Ruta fija con paradas establecidas' },
                    { icon: Clock, text: 'Horarios programados de recogida y entrega' },
                    { icon: UserCheck, text: 'Conductor asignado y certificado' },
                    { icon: Navigation, text: 'Seguimiento GPS en tiempo real' },
                    { icon: Bell, text: 'Notificación al padre al subir y bajar' },
                    { icon: ShieldCheck, text: 'Protocolo de seguridad en cada viaje' },
                  ].map((item) => (
                    <div key={item.text} className="flex items-start gap-3">
                      <item.icon className="w-4 h-4 text-[#3B82F6] mt-0.5 shrink-0" />
                      <span className="text-sm text-white/55">{item.text}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-[#3B82F6]/5 border border-[#3B82F6]/10">
                  <div className="flex items-center gap-2 mb-2">
                    <GraduationCap className="w-4 h-4 text-[#3B82F6]" />
                    <span className="text-xs font-bold text-[#3B82F6] uppercase tracking-wider">Para Todos los Niveles</span>
                  </div>
                  <p className="text-xs text-white/40 leading-relaxed">
                    Cubrimos transporte para estudiantes de inicial, primaria y secundaria. 
                    Cada nivel tiene protocolos diferenciados de atención y cuidado, con 
                    acompañamiento especial para los más pequeños.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* CARD 2: Transporte Eventual */}
          <AnimatedSection delay={200}>
            <div className="relative rounded-2xl overflow-hidden bg-white/[0.04] border-2 border-[#22C55E]/20 backdrop-blur-sm h-full shadow-[0_0_40px_rgba(34,197,94,0.08)]">
              {/* Image header */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src="/service-escolar.png"
                  alt="Transporte Eventual Escolar"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e17] via-[#0a0e17]/50 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-1.5 rounded-full text-xs font-bold text-black bg-[#22C55E] uppercase tracking-wider shadow-[0_0_20px_rgba(34,197,94,0.4)]">
                    Eventual
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold text-[#22C55E] bg-[#22C55E]/10 border border-[#22C55E]/20">
                    BAJO DEMANDA
                  </span>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-[#22C55E]/10 flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-[#22C55E]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Transporte Eventual</h3>
                    <p className="text-sm text-[#22C55E]">Excursiones y eventos especiales</p>
                  </div>
                </div>

                <p className="text-white/50 leading-relaxed mb-6">
                  El transporte eventual está diseñado para salidas pedagógicas, visitas 
                  educativas, competencias deportivas, olimpiadas y todo tipo de eventos 
                  escolares que requieran movilización de estudiantes. Coordinamos con el 
                  colegio la logística completa del traslado, incluyendo rutas optimizadas, 
                  vehículos adecuados al tamaño del grupo y acompañamiento durante todo el recorrido.
                </p>

                <div className="space-y-3 mb-6">
                  {[
                    { icon: MapPin, text: 'Rutas personalizadas según el destino' },
                    { icon: Bus, text: 'Vehículos adecuados al tamaño del grupo' },
                    { icon: Users, text: 'Transporte grupal con supervisión' },
                    { icon: Navigation, text: 'Rastreo GPS del vehículo durante todo el trayecto' },
                    { icon: ShieldCheck, text: 'Conductor experimentado en transporte de menores' },
                    { icon: Phone, text: 'Comunicación directa con el colegio organizador' },
                  ].map((item) => (
                    <div key={item.text} className="flex items-start gap-3">
                      <item.icon className="w-4 h-4 text-[#22C55E] mt-0.5 shrink-0" />
                      <span className="text-sm text-white/55">{item.text}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-[#22C55E]/5 border border-[#22C55E]/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-[#22C55E]" />
                    <span className="text-xs font-bold text-[#22C55E] uppercase tracking-wider">Flexibilidad Total</span>
                  </div>
                  <p className="text-xs text-white/40 leading-relaxed">
                    Sin contratos de permanencia. Solicita el transporte eventual cuando lo 
                    necesites, con la antelación suficiente para coordinar la logística. 
                    Ideal para colegios que requieren transporte esporádico o complementario.
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
   3. HOW IT WORKS — 4 Steps
   ═══════════════════════════════════════════════════════════════════════════════ */
const howItWorksSteps = [
  {
    step: 1,
    icon: MapPin,
    title: 'Registra a tu Estudiante',
    desc: 'Inscribe a tu hijo proporcionando sus datos personales, la dirección del hogar, el colegio al que asiste y los horarios de entrada y salida. Nuestro sistema procesa la información y asigna la ruta más eficiente para tu hijo, garantizando un recorrido seguro y puntual.',
    color: '#3B82F6',
  },
  {
    step: 2,
    icon: Route,
    title: 'Ruta Designada',
    desc: 'Se asigna una ruta específica con horarios fijos de recogida y entrega. Cada estudiante tiene paradas establecidas cerca de su domicilio y su centro educativo. La ruta es optimizada para minimizar el tiempo de viaje y maximizar la seguridad de todos los pasajeros a bordo.',
    color: '#22C55E',
  },
  {
    step: 3,
    icon: Bus,
    title: 'Recogida y Traslado',
    desc: 'El conductor certificado llega puntualmente a la parada asignada, verifica la identidad del estudiante y lo aborda al vehículo. Durante todo el trayecto, el GPS del vehículo es monitoreado en tiempo real por nuestra central, garantizando que la ruta se cumpla exactamente como fue programada.',
    color: '#0077BD',
  },
  {
    step: 4,
    icon: Bell,
    title: 'Confirmación de Llegada',
    desc: 'Al llegar al colegio o de vuelta al hogar, el padre o tutor recibe una notificación automática confirmando la llegada del estudiante. Esta confirmación incluye la hora exacta y la ubicación, proporcionando la tranquilidad de saber que tu hijo llegó seguro a su destino.',
    color: '#00E676',
  },
]

function HowItWorksSection() {
  return (
    <section id="como-funciona" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(59,130,246,0.3) 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
        }}
      />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-[#3B82F6]/5 blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 mb-4">
              <ClipboardCheck className="w-4 h-4 text-[#3B82F6]" />
              <span className="text-sm text-[#3B82F6]">Proceso Simple y Seguro</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Cómo Funciona el{' '}
              <span className="bg-gradient-to-r from-[#3B82F6] via-[#22C55E] to-[#3B82F6] bg-clip-text text-transparent">
                Transporte Escolar
              </span>
            </h2>
            <p className="text-white/50 max-w-3xl mx-auto text-lg">
              En cuatro pasos simples, tu hijo queda inscrito en nuestro sistema de transporte escolar 
              con toda la seguridad y monitoreo que merece. Cada etapa está diseñada para dar tranquilidad a los padres.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {howItWorksSteps.map((step, i) => (
            <AnimatedSection key={step.title} delay={i * 100}>
              <div className="group relative p-6 md:p-7 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-white/10 transition-all duration-500 h-full">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/[0.02] transition-all duration-500" />

                {/* Step number */}
                <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-lg" style={{ background: step.color }}>
                  {step.step}
                </div>

                <div className="relative z-10 pt-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: `${step.color}12` }}>
                    <step.icon className="w-7 h-7" style={{ color: step.color }} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">{step.title}</h3>
                  <p className="text-sm text-white/45 leading-relaxed">{step.desc}</p>
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
   4. SAFETY FEATURES — 6 Safety Cards
   ═══════════════════════════════════════════════════════════════════════════════ */
const safetyFeatures = [
  {
    icon: Navigation,
    title: 'GPS en Tiempo Real',
    desc: 'Cada vehículo cuenta con un sistema de rastreo GPS que permite monitorear su ubicación en tiempo real desde nuestra central de despacho. Los padres pueden verificar la posición del vehículo en cualquier momento a través de la aplicación, conociendo exactamente dónde se encuentra su hijo durante el trayecto escolar.',
    color: '#3B82F6',
  },
  {
    icon: BadgeCheck,
    title: 'Conductores Certificados con Antecedentes',
    desc: 'Todos nuestros conductores pasan por un riguroso proceso de verificación que incluye revisión de antecedentes penales, certificación de conducir profesional, examen psicológico y evaluación de idoneidad para el transporte de menores. Solo los más calificados y confiables obtienen la certificación para transportar estudiantes.',
    color: '#22C55E',
  },
  {
    icon: UserCheck,
    title: 'Verificación de Identidad',
    desc: 'Antes de cada viaje, el conductor verifica la identidad del estudiante al subir y al bajar del vehículo. Solo las personas autorizadas por los padres pueden recibir al niño en la parada de entrega. Este protocolo elimina cualquier riesgo de entrega a personas no autorizadas o desconocidas.',
    color: '#0077BD',
  },
  {
    icon: Phone,
    title: 'Comunicación Directa con Padres',
    desc: 'Los padres tienen un canal de comunicación directa con nuestro equipo de atención y con el conductor asignado. En caso de cualquier eventualidad, retraso o cambio de ruta, se notifica inmediatamente al padre o tutor. La transparencia en la comunicación es fundamental para la confianza familiar.',
    color: '#00E676',
  },
  {
    icon: Eye,
    title: 'Vehículos Monitoreados',
    desc: 'Nuestra central de despacho monitorea permanentemente todos los vehículos asignados al servicio escolar. Se verifica la velocidad, el cumplimiento de la ruta, las paradas realizadas y los tiempos de viaje. Cualquier desviación genera una alerta automática que es atendida de inmediato por nuestro equipo de supervisión.',
    color: '#8B5CF6',
  },
  {
    icon: Shield,
    title: 'Protocolos de Seguridad',
    desc: 'Contamos con protocolos detallados de seguridad para cada situación: procedimientos de emergencia, protocolos de evacuación, normas de comportamiento dentro del vehículo, y procedimientos en caso de incidentes viales. Cada conductor está entrenado para seguir estos protocolos al pie de la letra.',
    color: '#FF9800',
  },
]

function SafetyFeaturesSection() {
  return (
    <section id="seguridad" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-[#22C55E]/5 blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20 mb-4">
              <Shield className="w-4 h-4 text-[#22C55E]" />
              <span className="text-sm text-[#22C55E]">Seguridad Garantizada</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Características de{' '}
              <span className="bg-gradient-to-r from-[#22C55E] via-[#3B82F6] to-[#22C55E] bg-clip-text text-transparent">
                Seguridad
              </span>
            </h2>
            <p className="text-white/50 max-w-3xl mx-auto text-lg">
              La seguridad de tus hijos es nuestra máxima prioridad. Cada aspecto de nuestro servicio 
              está diseñado con los más altos estándares de protección y monitoreo para que puedas estar 
              tranquilo mientras ellos viajan.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {safetyFeatures.map((feature, i) => (
            <AnimatedSection key={feature.title} delay={i * 100}>
              <div className="group relative p-6 md:p-7 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-white/10 transition-all duration-500 h-full">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/[0.02] transition-all duration-500" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: `${feature.color}12` }}>
                    <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-white/45 leading-relaxed">{feature.desc}</p>
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
   5. VEHICLE TYPES — 3 Vehicle Types
   ═══════════════════════════════════════════════════════════════════════════════ */
const vehicleTypes = [
  {
    icon: Car,
    name: 'Sedán Confort',
    desc: 'Vehículo individual ideal para el traslado personalizado de un estudiante. Equipado con aire acondicionado, cinturones de seguridad para todas las plazas y un ambiente cómodo para que el niño viaje tranquilo. Perfecto para padres que prefieren un servicio exclusivo y directo sin paradas intermedias adicionales.',
    passengers: '1-3',
    tag: 'INDIVIDUAL',
    color: '#3B82F6',
    features: ['Aire acondicionado', 'Viaje directo sin paradas', 'Servicio exclusivo', 'Cinturones de seguridad'],
  },
  {
    icon: Bus,
    name: 'Van Escolar',
    desc: 'Vehículo de tamaño intermedio diseñado para grupos pequeños de estudiantes que comparten la misma ruta escolar. Puertas laterales deslizantes para un acceso seguro y fácil, asientos reclinables y amplio espacio interior. El conductor verifica la identidad de cada niño al subir y bajar del vehículo.',
    passengers: '6-10',
    tag: 'GRUPO PEQUEÑO',
    color: '#22C55E',
    features: ['Puertas deslizantes seguras', 'Verificación de identidad', 'Ruta compartida optimizada', 'Asientos reclinables'],
  },
  {
    icon: Bus,
    name: 'Bus Escolar',
    desc: 'Bus de gran capacidad para el transporte masivo de estudiantes, ideal para colegios que necesitan movilizar grupos numerosos de manera eficiente. El vehículo cuenta con señalización escolar, protocolos de abordaje ordenado, y supervisión durante todo el trayecto para garantizar la seguridad de cada pasajero.',
    passengers: '15-30',
    tag: 'GRUPO GRANDE',
    color: '#0077BD',
    features: ['Señalización escolar', 'Capacidad masiva', 'Protocolos de abordaje', 'Supervisión permanente'],
  },
]

function VehicleTypesSection() {
  return (
    <section id="vehiculos" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1a12] to-[#0a0e17]" />
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] rounded-full bg-[#3B82F6]/5 blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 mb-4">
              <Car className="w-4 h-4 text-[#3B82F6]" />
              <span className="text-sm text-[#3B82F6]">Flota Escolar</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Vehículos Según la{' '}
              <span className="bg-gradient-to-r from-[#3B82F6] to-[#22C55E] bg-clip-text text-transparent">
                Necesidad
              </span>
            </h2>
            <p className="text-white/50 max-w-3xl mx-auto text-lg">
              Contamos con diferentes tipos de vehículos adaptados a las necesidades del transporte escolar. 
              Desde un sedán exclusivo hasta buses de gran capacidad, cada vehículo cumple con los más altos estándares de seguridad.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {vehicleTypes.map((vehicle, i) => (
            <AnimatedSection key={vehicle.name} delay={i * 100}>
              <div className="group relative p-6 rounded-2xl bg-white/[0.03] border backdrop-blur-sm transition-all duration-500 overflow-hidden hover:border-white/10 h-full">
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ boxShadow: `0 0 30px ${vehicle.color}08` }}
                />

                {/* Tag */}
                <div className="absolute top-4 right-4">
                  <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-white/[0.05] text-white/40 border border-white/[0.08]">
                    {vehicle.tag}
                  </span>
                </div>

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4" style={{ background: `${vehicle.color}12` }}>
                    <vehicle.icon className="w-7 h-7" style={{ color: vehicle.color }} />
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-2">{vehicle.name}</h3>
                  <div className="flex items-center gap-3 text-xs text-white/30 mb-4">
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{vehicle.passengers} pasajeros</span>
                    </div>
                  </div>

                  <p className="text-sm text-white/45 leading-relaxed mb-5">{vehicle.desc}</p>

                  <div className="space-y-2">
                    {vehicle.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: vehicle.color }} />
                        <span className="text-xs text-white/50">{feature}</span>
                      </div>
                    ))}
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
   6. PARENT BENEFITS — Split Layout
   ═══════════════════════════════════════════════════════════════════════════════ */
const parentBenefits = [
  {
    icon: Bell,
    title: 'Notificaciones en Tiempo Real',
    desc: 'Recibe alertas automáticas cuando tu hijo sube al vehículo, durante el trayecto y al llegar a su destino.',
    color: '#3B82F6',
  },
  {
    icon: Navigation,
    title: 'Rastreo GPS del Vehículo',
    desc: 'Visualiza la ubicación exacta del transporte escolar en tiempo real desde tu teléfono en cualquier momento.',
    color: '#22C55E',
  },
  {
    icon: Clock,
    title: 'Historial de Viajes',
    desc: 'Accede al registro completo de todos los trayectos realizados con fechas, horarios y rutas seguidas.',
    color: '#0077BD',
  },
  {
    icon: Phone,
    title: 'Comunicación Directa con el Conductor',
    desc: 'Canal directo de comunicación con el conductor asignado para consultas o situaciones imprevistas.',
    color: '#00E676',
  },
  {
    icon: ClipboardCheck,
    title: 'Reportes Mensuales',
    desc: 'Recibe informes detallados mensuales sobre la puntualidad, asistencia y calidad del servicio.',
    color: '#8B5CF6',
  },
  {
    icon: Shield,
    title: 'Control de Acceso',
    desc: 'Solo personas autorizadas por ti pueden recibir a tu hijo. Sistema de verificación al momento de la entrega.',
    color: '#FF9800',
  },
]

function ParentBenefitsSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full bg-[#3B82F6]/5 blur-[180px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <AnimatedSection>
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 mb-6">
                <Home className="w-4 h-4 text-[#3B82F6]" />
                <span className="text-sm text-[#3B82F6]">Tranquilidad para los Padres</span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                La paz mental que{' '}
                <span className="bg-gradient-to-r from-[#3B82F6] to-[#22C55E] bg-clip-text text-transparent">
                  mereces
                </span>
              </h2>

              <p className="text-white/55 text-lg leading-relaxed mb-6">
                Sabemos que entregar el transporte de tus hijos a otra persona es una de las decisiones 
                más difíciles como padre. Por eso hemos diseñado un sistema completo de monitoreo, 
                comunicación y control que te mantiene informado en todo momento. No tienes que 
                preguntar si llegaron bien: tú lo sabes al instante.
              </p>

              <p className="text-white/55 text-lg leading-relaxed mb-8">
                Desde la notificación de abordaje hasta la confirmación de llegada, cada etapa del 
                trayecto es transparente y verificable. Tu confianza es nuestro compromiso más 
                valioso, y trabajamos todos los días para mantenerla intacta.
              </p>

              {/* Key points */}
              <div className="space-y-4 mb-10">
                {[
                  { icon: CheckCircle2, text: 'Monitoreo completo del trayecto escolar' },
                  { icon: CheckCircle2, text: 'Conductores con verificación de antecedentes' },
                  { icon: CheckCircle2, text: 'Central de atención disponible en horario escolar' },
                  { icon: CheckCircle2, text: 'Protocolo de emergencia activo las 24 horas' },
                ].map((point) => (
                  <div key={point.text} className="flex items-center gap-3">
                    <point.icon className="w-5 h-5 text-[#3B82F6] shrink-0" />
                    <span className="text-white/70">{point.text}</span>
                  </div>
                ))}
              </div>

              <a
                href="#contacto"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-lg font-bold text-white bg-[#3B82F6] hover:bg-[#2563EB] transition-all duration-300 shadow-[0_0_40px_rgba(59,130,246,0.3)] hover:shadow-[0_0_60px_rgba(59,130,246,0.5)] hover:scale-105"
              >
                Inscribir a mi Hijo
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </AnimatedSection>

          {/* Right: Benefit cards */}
          <AnimatedSection delay={200}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {parentBenefits.map((benefit, i) => (
                <div
                  key={benefit.title}
                  className="group p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/10 transition-all duration-300"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: `${benefit.color}12` }}>
                    <benefit.icon className="w-5 h-5" style={{ color: benefit.color }} />
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-1">{benefit.title}</h3>
                  <p className="text-xs text-white/45 leading-relaxed">{benefit.desc}</p>
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
   7. COST MODEL — Ecotaxi is a Technology Platform
   ═══════════════════════════════════════════════════════════════════════════════ */
function CostModelSection() {
  return (
    <section id="costos" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute bottom-0 left-1/3 w-[600px] h-[400px] rounded-full bg-[#3B82F6]/5 blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 mb-4">
              <Cog className="w-4 h-4 text-[#3B82F6]" />
              <span className="text-sm text-[#3B82F6]">Modelo de Costos Transparente</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              ¿Cómo Funcionan los{' '}
              <span className="bg-gradient-to-r from-[#3B82F6] to-[#22C55E] bg-clip-text text-transparent">
                Costos
              </span>
              ?
            </h2>
            <p className="text-white/50 max-w-3xl mx-auto text-lg">
              Es importante que entiendas cómo funcionan los costos en Ecotaxi. Somos una plataforma 
              tecnológica que conecta a los padres y colegios con conductores profesionales, y la 
              transparencia en las tarifas es uno de nuestros valores fundamentales.
            </p>
          </div>
        </AnimatedSection>

        {/* Main pricing card */}
        <AnimatedSection delay={100}>
          <div className="max-w-4xl mx-auto mb-10">
            <div className="relative p-6 md:p-10 rounded-2xl bg-white/[0.04] border border-[#3B82F6]/20 backdrop-blur-sm shadow-[0_0_40px_rgba(59,130,246,0.08)]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* Left: How the cost works */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#3B82F6]/12 flex items-center justify-center">
                      <Cog className="w-6 h-6 text-[#3B82F6]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Costo de Desplazamiento</h3>
                      <p className="text-sm text-[#3B82F6]">Lo que refleja la APP</p>
                    </div>
                  </div>

                  <p className="text-white/55 leading-relaxed mb-6">
                    El costo que refleja la APP es solo el costo del desplazamiento. Los demás costos 
                    dependen del servicio contratado y se coordinan directamente con el agente. Puedes 
                    conocer la tarifa en línea antes de solicitar el servicio, lo que garantiza total 
                    transparencia desde el primer momento.
                  </p>

                  <div className="space-y-3">
                    {[
                      { icon: CheckCircle2, text: 'Conoces la tarifa antes de solicitar', color: '#22C55E' },
                      { icon: CheckCircle2, text: 'Costo puede ser fijo, mínimo, por tiempo o distancia', color: '#3B82F6' },
                      { icon: CheckCircle2, text: 'Sin planes obligatorios ni suscripciones', color: '#0077BD' },
                      { icon: CheckCircle2, text: 'Solo pagas cuando utilizas el servicio', color: '#00E676' },
                    ].map((item) => (
                      <div key={item.text} className="flex items-center gap-3">
                        <item.icon className="w-5 h-5 shrink-0" style={{ color: item.color }} />
                        <span className="text-sm text-white/65">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Cost breakdown cards */}
                <div className="space-y-4">
                  <div className="p-5 rounded-xl bg-[#3B82F6]/8 border border-[#3B82F6]/15">
                    <div className="flex items-center gap-2 mb-3">
                      <Navigation className="w-4 h-4 text-[#3B82F6]" />
                      <span className="text-xs font-bold text-[#3B82F6] uppercase tracking-wider">Tarifa en la APP</span>
                    </div>
                    <p className="text-2xl font-bold text-white mb-2">Solo Desplazamiento</p>
                    <p className="text-xs text-white/40 leading-relaxed">
                      El monto que aparece en la APP cubre exclusivamente el costo del desplazamiento del vehículo. 
                      Es transparente y lo ves antes de confirmar tu solicitud de servicio escolar.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="flex items-center gap-2 mb-3">
                      <Handshake className="w-4 h-4 text-[#22C55E]" />
                      <span className="text-xs font-bold text-[#22C55E] uppercase tracking-wider">Servicios Adicionales</span>
                    </div>
                    <p className="text-sm font-semibold text-white mb-2">Se coordinan con el agente</p>
                    <p className="text-xs text-white/40 leading-relaxed">
                      Los demás costos dependen del servicio contratado y se coordinan directamente con el agente. 
                      El costo puede ser fijo, mínimo, por tiempo o por distancia, esto depende de cada agente. 
                      Tú decides qué servicio contratar según tus necesidades.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-[#22C55E]/5 border border-[#22C55E]/10">
                    <div className="flex items-center gap-2 mb-3">
                      <Shield className="w-4 h-4 text-[#22C55E]" />
                      <span className="text-xs font-bold text-[#22C55E] uppercase tracking-wider">Cobertura con Seguro</span>
                    </div>
                    <p className="text-sm font-semibold text-white mb-2">Sin costo para ti</p>
                    <p className="text-xs text-white/40 leading-relaxed">
                      Si tienes seguro que cubre este servicio dentro de Ecotaxi, se te notificará que no tiene 
                      costo para ti. Tu aseguradora cubre el servicio completo, y nosotros gestionamos todo 
                      el proceso para que no tengas que preocuparte por nada.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Key points grid */}
        <AnimatedSection delay={200}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              {
                icon: Cog,
                title: 'Plataforma Tecnológica',
                desc: 'Ecotaxi conecta padres y colegios con conductores certificados. No somos el proveedor del servicio, somos la plataforma que garantiza calidad y seguridad.',
                color: '#3B82F6',
              },
              {
                icon: Star,
                title: 'Tarifa Transparente',
                desc: 'Conoces el costo de desplazamiento antes de confirmar. Cada agente define su tarifa que puede ser fija, mínima, por tiempo o por distancia. Sin sorpresas ni costos ocultos.',
                color: '#22C55E',
              },
              {
                icon: Handshake,
                title: 'Coordina con el Agente',
                desc: 'Los costos adicionales del servicio escolar se coordinan directamente con el agente conductor. Él te informará sobre los detalles y condiciones antes de iniciar el servicio.',
                color: '#0077BD',
              },
              {
                icon: Shield,
                title: 'Cubierto por Seguro',
                desc: 'Si tu seguro incluye transporte escolar a través de Ecotaxi, se te notificará automáticamente que el servicio no tiene costo. Tu aseguradora cubre todo el traslado.',
                color: '#00E676',
              },
            ].map((point) => (
              <div key={point.title} className="group p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-white/10 transition-all duration-500">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: `${point.color}12` }}
                >
                  <point.icon className="w-5 h-5" style={{ color: point.color }} />
                </div>
                <h3 className="text-sm font-semibold text-white mb-2">{point.title}</h3>
                <p className="text-xs text-white/40 leading-relaxed">{point.desc}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   8. CONTACT / CTA SECTION
   ═══════════════════════════════════════════════════════════════════════════════ */
function ContactSection() {
  return (
    <section id="contacto" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[#3B82F6]/8 blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 mb-4">
              <Phone className="w-4 h-4 text-[#3B82F6]" />
              <span className="text-sm text-[#3B82F6]">Contáctanos</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Solicita el{' '}
              <span className="bg-gradient-to-r from-[#3B82F6] via-[#22C55E] to-[#3B82F6] bg-clip-text text-transparent">
                Transporte Escolar
              </span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              Inscribe a tu hijo en nuestro servicio de transporte escolar o consulta por rutas 
              y tarifas. Estamos disponibles para resolver todas tus dudas y diseñar la mejor 
              solución de movilidad para tu familia.
            </p>
          </div>
        </AnimatedSection>

        {/* Contact options */}
        <AnimatedSection delay={100}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            {[
              {
                icon: PhoneCall,
                title: 'Llámanos',
                info: '(+591) 3 3296885',
                desc: 'Línea directa para solicitar transporte escolar',
                color: '#3B82F6',
                href: 'tel:+59133296885',
              },
              {
                icon: MessageCircle,
                title: 'WhatsApp',
                info: '+591 73662803',
                desc: 'Escríbenos y recibe atención inmediata',
                color: '#25D366',
                href: 'https://wa.me/59173662803?text=Hola%2C%20necesito%20informaci%C3%B3n%20sobre%20transporte%20escolar',
              },
              {
                icon: Navigation,
                title: 'Reserva en Línea',
                info: 'Sistema de Reservas',
                desc: 'Accede a nuestra plataforma de reservas',
                color: '#0077BD',
                href: '#reservas',
              },
            ].map((item) => (
              <a
                key={item.title}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/10 transition-all duration-300 text-center"
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: `${item.color}12` }}>
                  <item.icon className="w-7 h-7" style={{ color: item.color }} />
                </div>
                <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                <p className="text-sm font-medium mb-2" style={{ color: item.color }}>{item.info}</p>
                <p className="text-xs text-white/40">{item.desc}</p>
              </a>
            ))}
          </div>
        </AnimatedSection>

        {/* CTA Buttons */}
        <AnimatedSection delay={200}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href="https://id3251.tm.taxi:58443/?cid=1"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full text-lg font-semibold text-white bg-[#3B82F6] hover:bg-[#2563EB] transition-all duration-300 shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:shadow-[0_0_50px_rgba(59,130,246,0.5)] hover:scale-105 flex items-center gap-2"
            >
              Reservar Transporte
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="https://wa.me/59173662803?text=Hola%2C%20necesito%20informaci%C3%B3n%20sobre%20transporte%20escolar"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full text-lg font-semibold text-white border border-[#25D366]/40 bg-[#25D366]/10 hover:bg-[#25D366]/20 hover:border-[#25D366]/60 transition-all duration-300 flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5 text-[#25D366]" />
              WhatsApp
            </a>
          </div>
        </AnimatedSection>

        {/* Reservation iframe */}
        <AnimatedSection delay={300}>
          <div id="reservas" className="max-w-5xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden bg-white/[0.03] border border-[#3B82F6]/10 backdrop-blur-sm">
              <div className="p-4 md:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/12 flex items-center justify-center">
                    <Navigation className="w-5 h-5 text-[#3B82F6]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Reserva tu Transporte Escolar</h3>
                    <p className="text-xs text-white/40">Accede directamente a nuestro sistema de reservas</p>
                  </div>
                </div>
                <div className="rounded-xl overflow-hidden border border-white/[0.06]" style={{ height: '600px' }}>
                  <iframe
                    src="https://id3251.tm.taxi:58443/?cid=1"
                    title="Reservas Ecotaxi"
                    className="w-full h-full border-0"
                    allow="geolocation"
                  />
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Trust indicators */}
        <AnimatedSection delay={400}>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-12">
            {[
              { icon: ShieldCheck, text: 'Conductores certificados', color: '#3B82F6' },
              { icon: Navigation, text: 'GPS en tiempo real', color: '#22C55E' },
              { icon: Clock, text: 'Disponibilidad escolar', color: '#0077BD' },
              { icon: Star, text: '+2,500 estudiantes', color: '#FF9800' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-white/40">
                <item.icon className="w-4 h-4" style={{ color: item.color }} />
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
export default function TransporteEscolarPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0e17]">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <ServiceOverviewSection />
        <HowItWorksSection />
        <SafetyFeaturesSection />
        <VehicleTypesSection />
        <ParentBenefitsSection />
        <CostModelSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
