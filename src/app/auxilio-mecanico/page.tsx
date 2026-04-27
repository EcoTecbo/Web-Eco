'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Battery, Wrench, Key, Cog, MapPin, Clock, Phone,
  ArrowRight, CheckCircle2, Shield, Zap,
  CarFront, AlertTriangle, Navigation,
  Gauge, ChevronRight, BadgeCheck, PhoneCall,
  MessageCircle, Sparkles, Handshake, CircleCheck,
  Truck, CircleHelp
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
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e17] via-[#1a0e05] to-[#0a0e17]" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(251,146,60,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(251,146,60,0.4) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[#F97316]/12 blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#F59E0B]/10 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Animated hazard stripe */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-[#F97316] via-[#F59E0B] to-[#F97316] opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 pb-8">
        <AnimatedSection>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F97316]/10 border border-[#F97316]/25 mb-8 backdrop-blur-sm">
            <AlertTriangle className="w-4 h-4 text-[#F97316]" />
            <span className="text-sm text-[#F97316] font-medium">Auxilio Mecanico 24/7</span>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Varado? Nosotros{' '}
            <span className="bg-gradient-to-r from-[#F97316] via-[#F59E0B] to-[#F97316] bg-clip-text text-transparent">
              Llegamos
            </span>
            <br />
            a tu Rescate
          </h1>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-10 leading-relaxed">
            Bateria sin carga, pinchazo en la ruta, llaves dentro del carro o desperfecto mecanico en la
            carretera. Con un solo clic, nuestro equipo de asistencia vial mas cercano te auxilia en minutos.
            Ya sea en la ciudad o en la carretera, no estas solo.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={300}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href="#servicios"
              className="px-8 py-4 rounded-full text-lg font-semibold text-black bg-[#F97316] hover:bg-[#FB923C] transition-all duration-300 shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:shadow-[0_0_50px_rgba(249,115,22,0.5)] hover:scale-105"
            >
              Solicitar Auxilio
            </a>
            <a
              href="#como-funciona"
              className="px-8 py-4 rounded-full text-lg font-semibold text-[#F97316] border border-[#F97316]/30 hover:border-[#F97316]/60 hover:bg-[#F97316]/5 transition-all duration-300"
            >
              Como Funciona
            </a>
          </div>
        </AnimatedSection>

        {/* 4-Image Banner */}
        <AnimatedSection delay={400}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10 max-w-5xl mx-auto">
            {[
              { src: '/auxilio-bateria.png', label: 'Auxilio de Bateria', color: '#F97316' },
              { src: '/auxilio-neumatico.png', label: 'Cambio de Neumatico', color: '#F59E0B' },
              { src: '/auxilio-llave.png', label: 'Cerrajeria Movil', color: '#0077BD' },
              { src: '/auxilio-mecanico.png', label: 'Asistencia Mecanica', color: '#EF4444' },
            ].map((img) => (
              <div key={img.label} className="group relative h-40 md:h-52 rounded-2xl overflow-hidden border border-white/[0.06] hover:border-white/15 transition-all duration-500">
                <img
                  src={img.src}
                  alt={img.label}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e17] via-[#0a0e17]/40 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-xs font-semibold text-white/80 backdrop-blur-sm px-2 py-1 rounded-lg bg-black/30">
                    {img.label}
                  </span>
                </div>
                {/* Colored accent line at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 opacity-60" style={{ backgroundColor: img.color }} />
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={500}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { value: '4', label: 'Servicios de Auxilio', icon: Wrench },
              { value: '24/7', label: 'Disponibilidad', icon: Clock },
              { value: '<15min', label: 'Tiempo de Llegada', icon: Navigation },
              { value: 'GPS', label: 'Localizacion Exacta', icon: MapPin },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-4 rounded-2xl bg-white/[0.03] border border-[#F97316]/10 backdrop-blur-sm hover:border-[#F97316]/20 transition-all duration-300"
              >
                <stat.icon className="w-5 h-5 text-[#F97316] mx-auto mb-2" />
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
   2. FOUR MAIN SERVICES
   ═══════════════════════════════════════════════════════════════════════════════ */
const mainServices = [
  {
    icon: Battery,
    title: 'Auxilio de Bateria',
    subtitle: 'Arranque y entrega de bateria nueva',
    desc: 'Te quedaste sin bateria y el vehiculo no quiere arrancar? Nuestros choferes especializados van a tu rescate en cuestion de minutos. Solo solicita el servicio, te localizamos automaticamente y enviamos al auxiliador mas cercano a tu posicion. Si necesitas una bateria nueva, solo indica las caracteristicas de la que requiere tu vehiculo: voltaje, capacidad, marca y modelo, y te llevaremos la bateria directamente hasta donde te encuentras para que vuelvas a rodar de inmediato.',
    features: [
      'Arranque con cables puente al instante',
      'Entrega de bateria nueva en el lugar',
      'Solo indica las especificaciones que necesitas',
      'Cobertura en ciudad y carretera',
      'Choferes con equipo profesional de arranque',
      'Diagnostico rapido de la causa del fallo',
    ],
    color: '#F97316',
    tag: 'MAS SOLICITADO',
    image: '/auxilio-bateria.png',
  },
  {
    icon: CarFront,
    title: 'Cambio de Neumatico',
    subtitle: 'Pinchazo o reemplazo de llanta',
    desc: 'Un pinchazo en la ruta no tiene por que arruinarte el dia. Con un solo clic, solicitas el cambio de neumatico y nuestro equipo acude con el equipo apropiado para resolver la situacion. Si el problema es mas grave y necesitas reemplazar el neumatico o la llanta completa, solo indicanos las medidas, el tipo y la medida de aro, y te ayudamos con toda la gestion: desde la busqueda del repuesto hasta su instalacion en el sitio. Tu nunca tienes que preocuparte.',
    features: [
      'Cambio de neumatico por pinchazo en el acto',
      'Reemplazo completo de llanta si es necesario',
      'Solo indica las medidas y tipo de neumatico',
      'Gestion completa de busqueda del repuesto',
      'Equipo profesional de levantamiento y montaje',
      'Servicio disponible 24 horas los 7 dias',
    ],
    color: '#F59E0B',
    tag: 'RAPIDO',
    image: '/auxilio-neumatico.png',
  },
  {
    icon: Key,
    title: 'Cerrajeria Movil',
    subtitle: 'Llaves dentro del carro o perdidas',
    desc: 'Te olvidaste las llaves dentro del vehiculo o las perdiste? No te preocupes, no es el fin del mundo. Nuestro equipo de cerrajeria movil esta a un solo clic de distancia. Selecciona tu ubicacion en el mapa y en minutos tendras al especialista en cerrajeria mas cercano a tu posicion. Apertura sin danos, duplicado de llaves en el sitio, y si necesitas una nueva llave con chip o control remoto, tambien lo gestionamos. Asi de facil y rapido.',
    features: [
      'Apertura de vehiculo sin danos',
      'Duplicado de llaves en el acto',
      'Llaves con chip y control remoto',
      'Selecciona tu ubicacion en el mapa',
      'Especialista mas cercano a tu posicion',
      'Atencion inmediata las 24 horas',
    ],
    color: '#0077BD',
    tag: 'SIN DANOS',
    image: '/auxilio-llave.png',
  },
  {
    icon: Cog,
    title: 'Asistencia Mecanica',
    subtitle: 'Desperfecto mecanico en carretera',
    desc: 'Problemas en la carretera por desperfecto mecanico: se te apago el vehiculo y no quiere encender, ruidos extraños que no te permiten continuar con tu ruta, humo, perdida de liquidos o cualquier sintoma que indique que la maquina necesita atencion profesional. Solo localiza tu posicion y solicita la asistencia mecanica mas cercana. Nuestros mecanicos moviles llegan con herramientas y escaner de diagnostico para intentar echar andar la maquina en el lugar, o si es necesario, coordinamos la grua para el traslado al taller.',
    features: [
      'Mecanico movil en el lugar de la averia',
      'Diagnostico y reparacion en sitio cuando es posible',
      'Se apago el motor? Te ayudamos a arrancarlo',
      'Ruidos extraños? Evaluamos la situacion',
      'Coordinacion de grua si es necesario trasladar',
      'Cobertura en ciudad y en carretera',
    ],
    color: '#EF4444',
    tag: 'EMERGENCIA',
    image: '/auxilio-mecanico.png',
  },
]

function ServicesSection() {
  const [activeService, setActiveService] = useState<string | null>(null)

  return (
    <section id="servicios" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#1a0e05] to-[#0a0e17]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-[#F97316]/5 blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F97316]/10 border border-[#F97316]/20 mb-4">
              <Wrench className="w-4 h-4 text-[#F97316]" />
              <span className="text-sm text-[#F97316]">4 Servicios de Auxilio Vial</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Asistencia Vial{' '}
              <span className="bg-gradient-to-r from-[#F97316] via-[#F59E0B] to-[#F97316] bg-clip-text text-transparent">
                Completa
              </span>
            </h2>
            <p className="text-white/50 max-w-3xl mx-auto text-lg">
              Cualquiera sea el problema que te deje varado, Ecotaxi tiene la solucion. Desde una bateria
              descargada hasta un desperfecto mecanico en la carretera, estamos contigo en cada emergencia.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mainServices.map((service, i) => {
            const isActive = activeService === service.title
            return (
              <AnimatedSection key={service.title} delay={i * 100}>
                <div
                  onClick={() => setActiveService(isActive ? null : service.title)}
                  className={`group relative rounded-2xl border backdrop-blur-sm cursor-pointer transition-all duration-500 overflow-hidden ${
                    isActive ? 'bg-white/[0.06]' : 'hover:border-white/10'
                  }`}
                  style={{
                    borderColor: isActive ? `${service.color}40` : undefined,
                  }}
                >
                  {/* Background image */}
                  <div className="absolute inset-0">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e17] via-[#0a0e17]/80 to-[#0a0e17]/60" />
                  </div>

                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ boxShadow: `0 0 40px ${service.color}08` }}
                  />

                  <div className="absolute top-4 right-4 z-20">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold border"
                      style={{
                        backgroundColor: `${service.color}10`,
                        color: service.color,
                        borderColor: `${service.color}20`,
                      }}
                    >
                      {service.tag}
                    </span>
                  </div>

                  <div className="relative z-10 p-6 md:p-8">
                    <div className="flex items-start gap-4 mb-5">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300"
                        style={{ backgroundColor: `${service.color}12` }}
                      >
                        <service.icon className="w-8 h-8" style={{ color: service.color }} />
                      </div>
                      <div className="pt-1">
                        <h3 className="text-xl font-bold text-white">{service.title}</h3>
                        <p className="text-sm mt-0.5" style={{ color: service.color }}>{service.subtitle}</p>
                      </div>
                    </div>

                    <p className="text-sm text-white/50 leading-relaxed mb-5">{service.desc}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {service.features.map((feat) => (
                        <div key={feat} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: service.color }} />
                          <span className="text-xs text-white/45">{feat}</span>
                        </div>
                      ))}
                    </div>

                    {!isActive && (
                      <p className="text-xs text-white/20 mt-4 flex items-center gap-1">
                        <ChevronRight className="w-3 h-3" />
                        Click para expandir
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
   3. HOW IT WORKS
   ═══════════════════════════════════════════════════════════════════════════════ */
const howItWorksSteps = [
  {
    step: 1,
    icon: MapPin,
    title: 'Localiza tu Posicion',
    desc: 'Abre la app de Ecotaxi y selecciona el servicio de Auxilio Mecanico. Tu ubicacion GPS se detecta automaticamente para que el auxiliador mas cercano sepa exactamente donde encontrarte. Tambien puedes ingresar la direccion manualmente si lo prefieres.',
    color: '#F97316',
  },
  {
    step: 2,
    icon: Wrench,
    title: 'Selecciona el Tipo de Auxilio',
    desc: 'Elige entre los cuatro servicios disponibles: arranque de bateria, cambio de neumatico, cerrajeria movil o asistencia mecanica. Describe brevemente tu situacion para que el especialista llegue preparado con las herramientas y repuestos adecuados.',
    color: '#F59E0B',
  },
  {
    step: 3,
    icon: Navigation,
    title: 'Recibe al Auxiliador en Minutos',
    desc: 'Nuestro sistema asigna automaticamente al profesional mas cercano a tu ubicacion. Podras ver en tiempo real su posicion y el tiempo estimado de llegada. Nuestro promedio de respuesta es inferior a 15 minutos en areas urbanas.',
    color: '#0077BD',
  },
  {
    step: 4,
    icon: CircleCheck,
    title: 'Problema Resuelto',
    desc: 'El especialista resuelve tu emergencia en el lugar: arranca tu vehiculo, cambia el neumatico, abre tu carro o diagnostica el problema mecanico. Si se requiere un traslado al taller, coordinamos la grua. Tu solo te preocupas de estar seguro.',
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
          backgroundImage: `radial-gradient(circle, rgba(249,115,22,0.3) 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
        }}
      />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-[#F97316]/5 blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/20 mb-4">
              <Zap className="w-4 h-4 text-[#F59E0B]" />
              <span className="text-sm text-[#F59E0B]">Rapido y Facil</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Como Funciona el{' '}
              <span className="bg-gradient-to-r from-[#F97316] to-[#F59E0B] bg-clip-text text-transparent">
                Auxilio
              </span>
            </h2>
            <p className="text-white/50 max-w-3xl mx-auto text-lg">
              En solo 4 pasos, de tu emergencia a la solucion. Nuestro sistema de despacho inteligente
              conecta al profesional indicado con tu ubicacion exacta, sin intermediarios ni esperas innecesarias.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {howItWorksSteps.map((step, i) => (
            <AnimatedSection key={step.step} delay={i * 150}>
              <div className="group relative p-6 md:p-7 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-white/10 transition-all duration-500 h-full">
                <div className="absolute top-4 right-4 text-5xl font-black opacity-[0.05]" style={{ color: step.color }}>
                  {step.step}
                </div>
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: `${step.color}12` }}
                  >
                    <step.icon className="w-7 h-7" style={{ color: step.color }} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
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
   4. EMERGENCY SCENARIOS
   ═══════════════════════════════════════════════════════════════════════════════ */
const emergencyScenarios = [
  {
    title: 'Bateria Descargada',
    scenario: 'Llegas a tu carro despues del trabajo, giras la llave y... nada. El motor no arranca, las luces no encienden, el tablero queda en silencio. La bateria se descargo por las bajas temperaturas de la noche o porque dejaste una luz encendida.',
    solution: 'Nuestro auxiliador llega con cables puente profesionales y una bateria auxiliar de arranque. En menos de 5 minutos tu motor vuelve a la vida. Si la bateria ya no sirve, te llevamos una nueva con las especificaciones exactas que tu vehiculo necesita.',
    color: '#F97316',
    icon: Battery,
  },
  {
    title: 'Pinchazo en la Ruta',
    scenario: 'Vas conduciendo por la carretera y sientes esa vibracion caracteristica. El volante tiembla, el carro jala hacia un lado. Te detienes y confirmas lo peor: un neumatico desinflado que no se puede reparar con un simple parche.',
    solution: 'Solicita el cambio de neumatico y nuestro equipo llega con gato hidraulico, llave cruzada y equipo de seguridad. Cambiamos la rueda por tu repuesto. Si no tienes repuesto o necesitas una llanta nueva, gestionamos la busqueda e instalacion completa.',
    color: '#F59E0B',
    icon: CarFront,
  },
  {
    title: 'Llaves Adentro del Carro',
    scenario: 'Cerraste la puerta sin darte cuenta y las llaves quedaron sobre el asiento. Las ves a traves del vidrio, pero no hay forma de entrar. Es de noche, estas solo en el estacionamiento y no tienes el numero de un cerrajero de confianza.',
    solution: 'Selecciona tu ubicacion en la app y en minutos tendras al cerrajero movil mas cercano. Apertura profesional sin danos al vehiculo, duplicado de llaves en el acto si lo necesitas, y si perdiste las llaves completamente, fabricamos una nueva con chip y codigo.',
    color: '#0077BD',
    icon: Key,
  },
  {
    title: 'Averia Mecanica en Carretera',
    scenario: 'Vas por la carretera y el motor empieza a fallar: tirones, ruidos metalicos, humo bajo el capot o simplemente se apaga y no vuelve a encender. Estas varado en la banquina con autos pasando a alta velocidad. Es una situacion de riesgo.',
    solution: 'Solicita asistencia mecanica inmediata. Nuestro mecanico movil llega con herramientas y escaner de diagnostico. Si la reparacion es posible en sitio, la realizamos. Si requiere taller, coordinamos la grua de traslado y te llevamos a un lugar seguro mientras esperas.',
    color: '#EF4444',
    icon: Cog,
  },
]

function EmergencyScenariosSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full bg-[#F97316]/4 blur-[180px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EF4444]/10 border border-[#EF4444]/20 mb-4">
              <AlertTriangle className="w-4 h-4 text-[#EF4444]" />
              <span className="text-sm text-[#EF4444]">Situaciones Reales</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Estuviste Ahi,{' '}
              <span className="bg-gradient-to-r from-[#F97316] to-[#EF4444] bg-clip-text text-transparent">
                Nosotros Tambien
              </span>
            </h2>
            <p className="text-white/50 max-w-3xl mx-auto text-lg">
              Conocemos cada una de estas situaciones porque las atendemos todos los dias. Estos son los
              escenarios mas comunes que nuestros especialistas resuelven a diario en Santa Cruz y toda Bolivia.
            </p>
          </div>
        </AnimatedSection>

        <div className="space-y-6">
          {emergencyScenarios.map((scenario, i) => (
            <AnimatedSection key={scenario.title} delay={i * 100}>
              <div className="group relative rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-white/10 transition-all duration-500 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  {/* Left: Problem */}
                  <div className="p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-white/[0.04]">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${scenario.color}12` }}
                      >
                        <scenario.icon className="w-6 h-6" style={{ color: scenario.color }} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{scenario.title}</h3>
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: `${scenario.color}10`, color: scenario.color }}
                        >
                          ESCENARIO
                        </span>
                      </div>
                    </div>
                    <p className="text-white/50 leading-relaxed">{scenario.scenario}</p>
                  </div>

                  {/* Right: Solution */}
                  <div className="p-6 md:p-8 relative">
                    <div className="absolute top-6 right-6 w-8 h-8 rounded-full flex items-center justify-center bg-[#00E676]/10">
                      <CheckCircle2 className="w-4 h-4 text-[#00E676]" />
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="w-4 h-4 text-[#00E676]" />
                      <span className="text-xs font-bold text-[#00E676] uppercase tracking-wider">Solucion Ecotaxi</span>
                    </div>
                    <p className="text-white/50 leading-relaxed">{scenario.solution}</p>
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
   5. BATTERY DETAIL SECTION
   ═══════════════════════════════════════════════════════════════════════════════ */
function BatteryDetailSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e17] via-[#1a0e05] to-[#0a0e17]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-[#F97316]/5 blur-[180px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection>
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F97316]/10 border border-[#F97316]/20 mb-6">
                <Battery className="w-4 h-4 text-[#F97316]" />
                <span className="text-sm text-[#F97316]">Bateria a Domicilio</span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Te Llevamos la{' '}
                <span className="bg-gradient-to-r from-[#F97316] to-[#F59E0B] bg-clip-text text-transparent">
                  Bateria
                </span>{' '}
                que Necesitas
              </h2>

              <p className="text-white/55 text-lg leading-relaxed mb-8">
                No solo te arrancamos el carro: te llevamos la bateria nueva directamente hasta donde
                te encuentras. Solo indicanos las caracteristicas de la bateria que tu vehiculo necesita
                y nuestro auxiliador llega con ella lista para instalar. Es el servicio mas completo del
                mercado boliviano de asistencia vial.
              </p>

              {/* Battery specs */}
              <div className="p-5 rounded-2xl bg-[#F97316]/5 border border-[#F97316]/10 mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-4 h-4 text-[#F97316]" />
                  <span className="text-xs font-bold text-[#F97316] uppercase tracking-wider">Que Datos Necesitamos</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { label: 'Voltaje', value: '12V / 24V' },
                    { label: 'Capacidad', value: 'Amperios-hora (Ah)' },
                    { label: 'Marca del Vehiculo', value: 'Ej: Toyota, Nissan' },
                    { label: 'Modelo y Ano', value: 'Ej: Corolla 2020' },
                    { label: 'Tipo de Bateria', value: 'Libre mantenimiento' },
                    { label: 'Posicion de Polos', value: 'Derecha / Izquierda' },
                  ].map((spec) => (
                    <div key={spec.label} className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03]">
                      <span className="text-xs text-white/40">{spec.label}</span>
                      <span className="text-xs text-white/60 font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href="#contacto"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-lg font-bold text-black bg-[#F97316] hover:bg-[#FB923C] transition-all duration-300 shadow-[0_0_40px_rgba(249,115,22,0.3)] hover:shadow-[0_0_60px_rgba(249,115,22,0.5)] hover:scale-105"
              >
                Solicitar Bateria
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </AnimatedSection>

          {/* Right: Key points */}
          <AnimatedSection delay={200}>
            <div className="space-y-4">
              {[
                {
                  icon: Battery,
                  title: 'Arranque Inmediato',
                  desc: 'Si solo necesitas un arranque con cables puente, nuestro auxiliador llega en minutos y te arranca el motor. Ideal para cuando la bateria se descargo pero aun sirve. Rapido, eficiente y al mejor precio del mercado.',
                  color: '#F97316',
                },
                {
                  icon: Truck,
                  title: 'Bateria Nueva en el Lugar',
                  desc: 'Si la bateria ya no da mas, no tienes que ir al taller ni buscar la bateria por tu cuenta. Solo indicanos las especificaciones y te llevamos la bateria nueva directamente a tu posicion, lista para ser instalada de inmediato.',
                  color: '#F59E0B',
                },
                {
                  icon: BadgeCheck,
                  title: 'Instalacion Profesional',
                  desc: 'Nuestros auxiliadores instalan la bateria nueva con los estandares de seguridad que tu vehiculo merece: limpieza de bornes, ajuste de torque, verificacion del sistema de carga y prueba de arranque. Todo incluido en el servicio.',
                  color: '#0077BD',
                },
                {
                  icon: Shield,
                  title: 'Garantia del Servicio',
                  desc: 'Tanto el arranque como la instalacion de bateria nueva cuentan con garantia Ecotaxi. Si dentro del periodo de garantia presentas un problema relacionado con el servicio realizado, regresamos sin costo adicional.',
                  color: '#00E676',
                },
              ].map((point, i) => (
                <div
                  key={point.title}
                  className="group p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/10 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${point.color}12` }}
                    >
                      <point.icon className="w-6 h-6" style={{ color: point.color }} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">{point.title}</h3>
                      <p className="text-sm text-white/45 leading-relaxed">{point.desc}</p>
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
   6. LOCKSMITH DETAIL SECTION
   ═══════════════════════════════════════════════════════════════════════════════ */
function LocksmithDetailSection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-[#0077BD]/5 blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Visual cards */}
          <AnimatedSection delay={200}>
            <div className="space-y-4">
              {[
                {
                  icon: Key,
                  title: 'Apertura sin Danos',
                  desc: 'Nuestros cerrajeros utilizan tecnicas profesionales de apertura que no danan la chapa, el vidrio ni el sistema electrico de tu vehiculo. Herramientas especializadas y anos de experiencia garantizan que tu carro quede exactamente como estaba.',
                  color: '#0077BD',
                },
                {
                  icon: Key,
                  title: 'Duplicado en el Acto',
                  desc: 'Si necesitas un juego extra de llaves, nuestro cerrajero movil tiene el equipo para duplicarlas en el mismo lugar. Llaves convencionales, llaves con chip transponder, controles remotos y llaves inteligentes: nosotros las fabricamos y programamos.',
                  color: '#F59E0B',
                },
                {
                  icon: MapPin,
                  title: 'Ubicate en el Mapa',
                  desc: 'Solo abre la app, selecciona el servicio de cerrajeria y marca tu posicion en el mapa. El cerrajero mas cercano recibe tu solicitud automaticamente y se dirige a tu ubicacion exacta. Sin llamadas eternas ni esperas innecesarias.',
                  color: '#F97316',
                },
                {
                  icon: Clock,
                  title: 'Disponible 24/7',
                  desc: 'Porque las emergencias no tienen horario, nuestra red de cerrajeria movil opera las 24 horas. Ya sea que te quedes afuera de tu carro a las 3 de la madrugada o en plena hora pico del mediodia, siempre habra un cerrajero disponible.',
                  color: '#00E676',
                },
              ].map((point, i) => (
                <div
                  key={point.title}
                  className="group p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/10 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${point.color}12` }}
                    >
                      <point.icon className="w-6 h-6" style={{ color: point.color }} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">{point.title}</h3>
                      <p className="text-sm text-white/45 leading-relaxed">{point.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Right: Content */}
          <AnimatedSection>
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0077BD]/10 border border-[#0077BD]/20 mb-6">
                <Key className="w-4 h-4 text-[#0077BD]" />
                <span className="text-sm text-[#0077BD]">Cerrajeria Movil</span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Llaves Moviles a{' '}
                <span className="bg-gradient-to-r from-[#0077BD] to-[#00E676] bg-clip-text text-transparent">
                  un Clic
                </span>
              </h2>

              <p className="text-white/55 text-lg leading-relaxed mb-8">
                Te olvidaste las llaves dentro del carro o las perdiste y no sabes que hacer? No intentes
                forzar la puerta con una ganzua casera: vas a danar la chapa y terminar pagando mucho mas.
                Nuestro equipo de cerrajeria movil profesional llega a tu ubicacion en minutos, con las
                herramientas y la experiencia para resolver tu problema sin danar tu vehiculo.
              </p>

              {/* Key types */}
              <div className="p-5 rounded-2xl bg-[#0077BD]/5 border border-[#0077BD]/10 mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-4 h-4 text-[#0077BD]" />
                  <span className="text-xs font-bold text-[#0077BD] uppercase tracking-wider">Tipos de Llaves que Gestionamos</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'Llaves convencionales',
                    'Llaves con chip transponder',
                    'Controles remotos',
                    'Llaves inteligentes (smart keys)',
                    'Llaves con boton de arranque',
                    'Codificacion de inmovilizador',
                  ].map((type) => (
                    <div key={type} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0077BD] shrink-0" />
                      <span className="text-xs text-white/50">{type}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href="#contacto"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-lg font-bold text-white bg-[#0077BD] hover:bg-[#0088D4] transition-all duration-300 shadow-[0_0_40px_rgba(0,119,189,0.3)] hover:shadow-[0_0_60px_rgba(0,119,189,0.5)] hover:scale-105"
              >
                Solicitar Cerrajero
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   7. TECHNOLOGY & COVERAGE
   ═══════════════════════════════════════════════════════════════════════════════ */
const techFeatures = [
  {
    icon: MapPin,
    title: 'GPS en Tiempo Real',
    desc: 'Nuestra plataforma de despacho utiliza geolocalizacion en tiempo real para asignarte al auxiliador mas cercano. Tu ubicacion se transmite instantaneamente al especialista, eliminando la necesidad de explicar direcciones complicadas. El sistema calcula la ruta mas corta y te muestra el tiempo estimado de llegada.',
    color: '#F97316',
  },
  {
    icon: Navigation,
    title: 'Despacho Inteligente',
    desc: 'No es solo encontrar al mas cercano: nuestro algoritmo de despacho considera el tipo de auxilio que necesitas, la especialidad del profesional, su equipamiento disponible y su carga de trabajo actual. Si necesitas cerrajeria, no te enviamos un mecanico. Si necesitas una bateria especifica, te enviamos al auxiliador que la tiene en stock.',
    color: '#F59E0B',
  },
  {
    icon: Clock,
    title: 'Respuesta en Menos de 15 Min',
    desc: 'En areas urbanas de Santa Cruz, nuestro tiempo promedio de llegada es inferior a 15 minutos. Nuestra red de auxiliadores esta distribuida estrategicamente por la ciudad para garantizar cobertura total y respuesta rapida. En carretera, el tiempo varia segun la distancia, pero siempre te informamos el ETA exacto.',
    color: '#0077BD',
  },
  {
    icon: Shield,
    title: 'Auxiliadores Verificados',
    desc: 'Cada profesional de nuestra red pasa por un proceso de verificacion que incluye revision de antecedentes, certificaciones tecnicas, evaluacion de equipamiento y prueba de competencia. No enviamos a cualquiera a auxiliarte: cada auxiliador esta acreditado para el tipo de servicio que realiza.',
    color: '#00E676',
  },
  {
    icon: PhoneCall,
    title: 'Central de Emergencias 24/7',
    desc: 'Detras de la tecnologia hay personas. Nuestra central de despacho opera las 24 horas del dia, los 7 dias de la semana, los 365 dias del ano. Si prefieres llamar en vez de usar la app, una voz humana atiende tu emergencia, te tranquiliza y coordina el auxilio en tiempo real.',
    color: '#8B5CF6',
  },
  {
    icon: Gauge,
    title: 'Monitoreo en Vivo',
    desc: 'Desde que solicitas el auxilio hasta que el profesional termina el servicio, puedes seguir cada paso en tu telefono: la ubicacion del auxiliador en el mapa, su tiempo estimado de llegada, el estado del servicio y la confirmacion de que tu problema fue resuelto. Transparencia total.',
    color: '#EC4899',
  },
]

function TechSection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] rounded-full bg-[#F97316]/5 blur-[150px]" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-[#0077BD]/5 blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F97316]/10 border border-[#F97316]/20 mb-4">
              <Zap className="w-4 h-4 text-[#F97316]" />
              <span className="text-sm text-[#F97316]">Tecnologia y Cobertura</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Auxilio con{' '}
              <span className="bg-gradient-to-r from-[#F97316] via-[#F59E0B] to-[#0077BD] bg-clip-text text-transparent">
                Tecnologia Inteligente
              </span>
            </h2>
            <p className="text-white/50 max-w-3xl mx-auto text-lg">
              No es solo enviar a alguien a auxiliarte. Es enviar al profesional correcto, con las herramientas
              adecuadas, por la ruta mas rapida, y con seguimiento en tiempo real. Tecnologia al servicio de tu seguridad.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {techFeatures.map((feature, i) => (
            <AnimatedSection key={feature.title} delay={i * 100}>
              <div className="group relative p-6 md:p-7 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-white/10 transition-all duration-500 h-full">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/[0.02] transition-all duration-500" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: `${feature.color}12` }}
                  >
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
   8. COMO FUNCIONA LA TARIFA — Plataforma bajo demanda
   ═══════════════════════════════════════════════════════════════════════════════ */
function PricingSection() {
  return (
    <section id="tarifas" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-[#F97316]/5 blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F97316]/10 border border-[#F97316]/20 mb-4">
              <Zap className="w-4 h-4 text-[#F97316]" />
              <span className="text-sm text-[#F97316]">Bajo Demanda</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Solo Pagas por lo que{' '}
              <span className="bg-gradient-to-r from-[#F97316] to-[#F59E0B] bg-clip-text text-transparent">
                Necesitas
              </span>
            </h2>
            <p className="text-white/50 max-w-3xl mx-auto text-lg">
              Ecotaxi es una plataforma tecnologica que te conecta con el auxiliador mas cercano. Sin planes, 
              sin suscripciones, sin compromisos. Solicitas cuando lo necesitas y solo pagas el desplazamiento 
              del agente hasta tu ubicacion. Los costos adicionales se coordinan directamente con el profesional.
            </p>
          </div>
        </AnimatedSection>

        {/* Main pricing card */}
        <AnimatedSection delay={100}>
          <div className="max-w-4xl mx-auto mb-10">
            <div className="relative p-6 md:p-10 rounded-2xl bg-white/[0.04] border border-[#F97316]/20 backdrop-blur-sm shadow-[0_0_40px_rgba(249,115,22,0.08)]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Left: How the cost works */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#F97316]/12 flex items-center justify-center">
                      <Gauge className="w-6 h-6 text-[#F97316]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Costo de Desplazamiento</h3>
                      <p className="text-sm text-[#F97316]">Lo que aparece en la APP</p>
                    </div>
                  </div>

                  <p className="text-white/55 leading-relaxed mb-6">
                    El monto que ves en la APP al solicitar el servicio corresponde unicamente al costo 
                    de desplazamiento del auxiliador desde su ubicacion hasta donde tu te encuentras. 
                    Este costo puede ser un monto fijo o minimo, o calcularse por tiempo o distancia, 
                    dependiendo de cada agente. Puedes conocer la tarifa en linea antes de confirmar tu solicitud.
                  </p>

                  <div className="space-y-3">
                    {[
                      { icon: CheckCircle2, text: 'Conoces la tarifa antes de solicitar', color: '#00E676' },
                      { icon: CheckCircle2, text: 'Costo fijo, minimo, por tiempo o distancia', color: '#F59E0B' },
                      { icon: CheckCircle2, text: 'Sin planes ni suscripciones', color: '#F97316' },
                      { icon: CheckCircle2, text: 'Solo pagas cuando necesitas el servicio', color: '#0077BD' },
                    ].map((item) => (
                      <div key={item.text} className="flex items-center gap-3">
                        <item.icon className="w-4 h-4 shrink-0" style={{ color: item.color }} />
                        <span className="text-sm text-white/60">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Cost breakdown visual */}
                <div className="space-y-4">
                  <div className="p-5 rounded-xl bg-[#F97316]/8 border border-[#F97316]/15">
                    <div className="flex items-center gap-2 mb-3">
                      <Shield className="w-4 h-4 text-[#F97316]" />
                      <span className="text-xs font-bold text-[#F97316] uppercase tracking-wider">Tarifa en la APP</span>
                    </div>
                    <p className="text-2xl font-bold text-white mb-2">Solo Desplazamiento</p>
                    <p className="text-xs text-white/40 leading-relaxed">
                      El monto que aparece en la APP cubre exclusivamente el traslado del agente desde su 
                      posicion actual hasta tu ubicacion. Es transparente y lo ves antes de confirmar.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="flex items-center gap-2 mb-3">
                      <Wrench className="w-4 h-4 text-[#F59E0B]" />
                      <span className="text-xs font-bold text-[#F59E0B] uppercase tracking-wider">Costos Adicionales</span>
                    </div>
                    <p className="text-sm font-semibold text-white mb-2">Se coordinan con el agente</p>
                    <p className="text-xs text-white/40 leading-relaxed">
                      Los costos por repuestos, reparaciones, baterías nuevas, llantas de reemplazo u otros 
                      trabajos se coordinan directamente con el agente auxiliador una vez que evalúa la situación 
                      en el lugar. Tu decides si aceptas o no.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-[#00E676]/5 border border-[#00E676]/10">
                    <div className="flex items-center gap-2 mb-3">
                      <BadgeCheck className="w-4 h-4 text-[#00E676]" />
                      <span className="text-xs font-bold text-[#00E676] uppercase tracking-wider">Cobertura con Seguro</span>
                    </div>
                    <p className="text-sm font-semibold text-white mb-2">Sin costo para ti</p>
                    <p className="text-xs text-white/40 leading-relaxed">
                      Si tienes contratado un seguro que incluye este servicio dentro de Ecotaxi, la app te 
                      avisara automaticamente que el servicio no tiene costo para ti. Tu seguro cubre todo.
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
                icon: Zap,
                title: 'Bajo Demanda',
                desc: 'Solicitas el servicio cuando lo necesitas, sin compromiso. No hay planes mensuales ni suscripciones. Pagas solo por la asistencia que utilizas en el momento.',
                color: '#F97316',
              },
              {
                icon: Gauge,
                title: 'Tarifa Transparente',
                desc: 'Conoces el costo de desplazamiento antes de confirmar. Cada agente define su tarifa que puede ser fija, minima, por tiempo o por distancia. Sin sorpresas.',
                color: '#F59E0B',
              },
              {
                icon: Handshake,
                title: 'Coordina con el Agente',
                desc: 'Los costos del servicio en si (repuestos, reparaciones) se coordinan directamente con el auxiliador. El evalua la situacion y te informa antes de proceder.',
                color: '#0077BD',
              },
              {
                icon: Shield,
                title: 'Cubierto por Seguro',
                desc: 'Si tu seguro incluye asistencia vial a traves de Ecotaxi, se te notificara que el servicio no tiene costo. Tu aseguradora cubre el auxilio completo.',
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
   9. FAQ
   ═══════════════════════════════════════════════════════════════════════════════ */
const faqs = [
  {
    q: 'Cuanto tarda en llegar el auxiliador?',
    a: 'En areas urbanas de Santa Cruz, nuestro tiempo promedio de llegada es de 10 a 15 minutos. El sistema te muestra el tiempo estimado en tiempo real desde que confirmas el servicio. En carretera o zonas alejadas, el tiempo depende de la distancia, pero siempre te informamos el ETA exacto antes de confirmar.',
  },
  {
    q: 'Que pasa si el problema no se puede resolver en el lugar?',
    a: 'Si el mecanico determina que la averia no puede repararse en sitio, coordinamos inmediatamente el traslado de tu vehiculo en grua al taller de tu preferencia o al taller aliado mas cercano. Tu como pasajero tambien recibes transporte al lugar seguro que indiques. Todo se gestiona desde la misma solicitud.',
  },
  {
    q: 'Puedo solicitar una bateria nueva y que me la instalen?',
    a: 'Si, ese es uno de nuestros servicios mas populares. Solo indica las caracteristicas de la bateria que necesitas: voltaje, amperaje, marca del vehiculo, modelo y ano. Nuestro auxiliador lleva la bateria directamente a tu ubicacion y la instala profesionalmente, incluyendo limpieza de bornes, verificacion del sistema de carga y prueba de arranque.',
  },
  {
    q: 'La apertura del vehiculo por cerrajeria dana la chapa?',
    a: 'No. Nuestros cerrajeros utilizan tecnicas profesionales de apertura no destructiva que no danan ni la chapa, ni el vidrio, ni el sistema electrico de tu vehiculo. Son profesionales certificados con anos de experiencia en apertura automotriz. Tu carro queda exactamente como estaba antes de cerrarlo con las llaves adentro.',
  },
  {
    q: 'El servicio funciona fuera de Santa Cruz?',
    a: 'Actualmente nuestra cobertura principal es Santa Cruz de la Sierra y su area metropolitana, incluyendo la carretera a Montero, Warnes, Porongo y La Guardia. Estamos expandiendonos a otras ciudades de Bolivia. Si necesitas auxilio en otra ciudad, contactanos y evaluaremos la disponibilidad de nuestra red en esa zona.',
  },
  {
    q: 'Como puedo pagar el servicio de auxilio?',
    a: 'Aceptamos multiples formas de pago: efectivo al auxiliador, tarjeta de credito o debito a traves de la app, transferencia bancaria y QR de pago. Si tienes un seguro que cubre este servicio dentro de Ecotaxi, se te notificara automaticamente que no tiene costo para ti. El costo que aparece en la APP es solo el desplazamiento; los costos adicionales del servicio se coordinan directamente con el agente auxiliador.',
  },
]

function FAQSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-[#F97316]/5 blur-[120px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/20 mb-4">
              <CircleHelp className="w-4 h-4 text-[#F59E0B]" />
              <span className="text-sm text-[#F59E0B]">Preguntas Frecuentes</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Todo lo que{' '}
              <span className="bg-gradient-to-r from-[#F97316] to-[#F59E0B] bg-clip-text text-transparent">
                Necesitas Saber
              </span>
            </h2>
          </div>
        </AnimatedSection>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <AnimatedSection key={i} delay={i * 50}>
              <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-white/10">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="text-white font-medium pr-4">{faq.q}</span>
                  <ChevronRight className={`w-4 h-4 text-[#F97316] shrink-0 transition-transform duration-300 ${
                    openFaq === i ? 'rotate-90' : ''
                  }`} />
                </button>
                <div className={`transition-all duration-300 ${
                  openFaq === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-5 pb-5 text-sm text-white/50 leading-relaxed border-t border-white/[0.04] pt-4">
                    {faq.a}
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
   10. CTA / CONTACT
   ═══════════════════════════════════════════════════════════════════════════════ */
function CTASection() {
  return (
    <section id="contacto" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#1a0e05] to-[#0a0e17]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-[#F97316]/8 blur-[150px]" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#F97316]/50 to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F97316]/10 border border-[#F97316]/25 mb-8 backdrop-blur-sm">
            <AlertTriangle className="w-4 h-4 text-[#F97316]" />
            <span className="text-sm text-[#F97316] font-medium">Auxilio Inmediato</span>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            No Te Quedes{' '}
            <span className="bg-gradient-to-r from-[#F97316] via-[#F59E0B] to-[#EF4444] bg-clip-text text-transparent">
              Varado
            </span>
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-10 leading-relaxed">
            Bateria descargada, pinchazo en la ruta, llaves adentro del carro o averia mecanica.
            Sea cual sea la emergencia, Ecotaxi Auxilio Mecanico esta a un clic de distancia.
            Llama ahora o solicita el servicio por la app y vuelve a la ruta en minutos.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={300}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href="tel:+59133296885"
              className="flex items-center gap-3 px-8 py-4 rounded-full text-lg font-bold text-black bg-[#F97316] hover:bg-[#FB923C] transition-all duration-300 shadow-[0_0_40px_rgba(249,115,22,0.4)] hover:shadow-[0_0_60px_rgba(249,115,22,0.6)] hover:scale-105"
            >
              <Phone className="w-5 h-5" />
              Llamar Ahora
            </a>
            <a
              href="https://wa.me/59133296885"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 rounded-full text-lg font-semibold text-[#00E676] border border-[#00E676]/30 hover:border-[#00E676]/60 hover:bg-[#00E676]/5 transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </a>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={400}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              { icon: PhoneCall, label: 'Linea de Emergencia', value: '(+591) 3 3296885', color: '#F97316' },
              { icon: MessageCircle, label: 'WhatsApp 24/7', value: '+591 3 3296885', color: '#00E676' },
              { icon: Clock, label: 'Tiempo de Respuesta', value: '< 15 minutos', color: '#F59E0B' },
            ].map((contact) => (
              <div
                key={contact.label}
                className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm"
              >
                <contact.icon className="w-5 h-5 mx-auto mb-2" style={{ color: contact.color }} />
                <div className="text-xs text-white/40 mb-1">{contact.label}</div>
                <div className="text-sm text-white font-semibold">{contact.value}</div>
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
export default function AuxilioMecanicoPage() {
  return (
    <main className="min-h-screen bg-[#0a0e17]">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <HowItWorksSection />
      <EmergencyScenariosSection />
      <BatteryDetailSection />
      <LocksmithDetailSection />
      <TechSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  )
}
