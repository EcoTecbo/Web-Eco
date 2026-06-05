'use client'

import { useEffect, useRef, useState } from 'react'
import {
  PawPrint, Heart, Car, Shield, Clock, Users, Phone,
  ArrowRight, CheckCircle2, Star, UserCheck, MapPin,
  BadgeCheck, ShieldCheck, Navigation, Sparkles,
  ChevronRight, PhoneCall, MessageCircle, Eye,
  Stethoscope, Home, CircleCheck, Handshake, Truck,
  AlertCircle, Ambulance, Ruler
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
   1. HERO SECTION — Taxi Pet Theme
   ═══════════════════════════════════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src="/service-mascotas.webp"
          alt="Transporte de Mascotas Ecotaxi"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17]/70 via-[#0a0e17]/85 to-[#0a0e17]" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(244,114,182,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(244,114,182,0.4) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[#F472B6]/12 blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#22C55E]/10 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[#F472B6]/6 blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Decorative icons */}
      <div className="absolute top-32 right-[8%] md:right-[18%] opacity-[0.07]">
        <PawPrint className="w-28 h-28 md:w-40 md:h-40 text-[#F472B6]" />
      </div>
      <div className="absolute bottom-28 left-[5%] md:left-[12%] opacity-[0.05]">
        <Heart className="w-20 h-20 md:w-28 md:h-28 text-[#22C55E]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 pb-16">
        {/* Badge */}
        <AnimatedSection>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F472B6]/10 border border-[#F472B6]/25 mb-8 backdrop-blur-sm">
            <PawPrint className="w-4 h-4 text-[#F472B6]" />
            <span className="text-sm text-[#F472B6] font-medium">Taxi Pet</span>
          </div>
        </AnimatedSection>

        {/* Title */}
        <AnimatedSection delay={100}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Tu Mascota Viaja{' '}
            <span className="bg-gradient-to-r from-[#F472B6] via-[#22C55E] to-[#F472B6] bg-clip-text text-transparent">
              Segura
            </span>
          </h1>
        </AnimatedSection>

        {/* Subtitle */}
        <AnimatedSection delay={200}>
          <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-10 leading-relaxed">
            Servicio de transporte especializado para mascotas con vehículos seguros, conductores pet-friendly
            y toda la atención que tu compañero de vida merece. Desde visitas al veterinario hasta mudanzas
            con tu mascota, nosotros nos encargamos de que llegue sana y salva a su destino.
          </p>
        </AnimatedSection>

        {/* CTA buttons */}
        <AnimatedSection delay={300}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <a
              href="#servicios"
              className="px-8 py-4 rounded-full text-lg font-semibold text-black bg-[#F472B6] hover:bg-[#F9A8D4] transition-all duration-300 shadow-[0_0_30px_rgba(244,114,182,0.3)] hover:shadow-[0_0_50px_rgba(244,114,182,0.5)] hover:scale-105"
            >
              Solicitar Taxi Pet
            </a>
            <a
              href="#como-funciona"
              className="px-8 py-4 rounded-full text-lg font-semibold text-[#F472B6] border border-[#F472B6]/30 hover:border-[#F472B6]/60 hover:bg-[#F472B6]/5 transition-all duration-300"
            >
              Cómo Funciona
            </a>
          </div>
        </AnimatedSection>

        {/* Stats bar */}
        <AnimatedSection delay={400}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { value: '2,500+', label: 'Mascotas Transportadas', icon: PawPrint },
              { value: '150+', label: 'Conductores Pet-Friendly', icon: UserCheck },
              { value: '100%', label: 'Cobertura Urbana', icon: MapPin },
              { value: '24/7', label: 'Disponibilidad', icon: Clock },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-4 rounded-2xl bg-white/[0.03] border border-[#F472B6]/10 backdrop-blur-sm hover:border-[#F472B6]/20 transition-all duration-300"
              >
                <stat.icon className="w-5 h-5 text-[#F472B6] mx-auto mb-2" />
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
   2. SERVICE TYPES — Three Main Pet Transport Services
   ═══════════════════════════════════════════════════════════════════════════════ */
const serviceTypes = [
  {
    icon: Stethoscope,
    title: 'Traslado Veterinario',
    subtitle: 'Visitas al vet y emergencias',
    desc: 'Tu mascota necesita atención veterinaria y no tienes cómo llevarla. Ya sea una consulta de rutina, una vacunación, un control post-operatorio o una emergencia que no puede esperar, nuestro servicio de traslado veterinario está diseñado para que tu compañero llegue al consultorio con la mayor comodidad y seguridad posible. Los vehículos están acondicionados para reducir el estrés del traslado y los conductores saben cómo manejar a mascotas ansiosas o doloridas.',
    features: [
      'Traslado a cualquier clínica veterinaria de la ciudad',
      'Servicio de emergencia veterinaria con despacho prioritario',
      'Vehículos con ventilación y temperatura controlada',
      'Conductores capacitados en manejo de mascotas heridas o enfermas',
      'Acompañamiento durante todo el trayecto puerta a puerta',
      'Coordinación directa con la clínica veterinaria de destino',
    ],
    color: '#F472B6',
    tag: 'MÁS SOLICITADO',
    image: '/service-mascotas.webp',
  },
  {
    icon: Sparkles,
    title: 'Paseo y Recreación',
    subtitle: 'Parques, grooming y más',
    desc: 'No siempre tienes el tiempo para llevar a tu mascota a su cita de grooming, al parque de mascotas o a su sesión de adiestramiento. Con Taxi Pet, tu peludo puede llegar a sus actividades de recreación y cuidado sin que tú tengas que salir del trabajo o interrumpir tu día. Nuestros conductores pet-friendly se encargan de recoger a tu mascota en tu domicilio, llevarla a su destino y traerla de vuelta segura a casa cuando termine su cita.',
    features: [
      'Traslado a peluquería y grooming canino',
      'Transporte a parques y áreas de recreación pet-friendly',
      'Sesiones de adiestramiento y entrenamiento',
      'Visitas a guarderías y hoteles para mascotas',
      'Ida y vuelta con seguimiento en tiempo real',
      'Notificaciones al dueño en cada punto del trayecto',
    ],
    color: '#22C55E',
    tag: 'POPULAR',
    image: '/service-mascotas.webp',
  },
  {
    icon: Truck,
    title: 'Mudanza con Mascota',
    subtitle: 'Traslado seguro al nuevo hogar',
    desc: 'Mudarse ya es suficientemente estresante para los humanos, pero para tu mascota puede ser una experiencia verdaderamente traumática. Un ambiente nuevo, olores desconocidos, ruidos extraños y la ansiedad de separación hacen que el traslado de mascotas requiera un cuidado especial. Nuestro servicio de mudanza con mascota asegura que tu compañero llegue a su nuevo hogar con la misma tranquilidad con la que tú esperas que lleguen tus muebles.',
    features: [
      'Vehículos amplios según el tamaño de tu mascota',
      'Transporte en jaula o porta-mascotas si lo prefieres',
      'Mudanzas con múltiples mascotas en el mismo viaje',
      'Trayectos cortos y largos dentro y fuera de la ciudad',
      'Conductores experimentados en transporte de mascotas grandes',
      'Coordinación con tu mudanza para un traslado sincronizado',
    ],
    color: '#0077BD',
    tag: 'ESPECIAL',
    image: '/service-mascotas.webp',
  },
]

function ServiceTypesSection() {
  const [activeService, setActiveService] = useState<string | null>(null)

  return (
    <section id="servicios" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-[#F472B6]/5 blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F472B6]/10 border border-[#F472B6]/20 mb-4">
              <PawPrint className="w-4 h-4 text-[#F472B6]" />
              <span className="text-sm text-[#F472B6]">Tipos de Servicio Taxi Pet</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Transporte{' '}
              <span className="bg-gradient-to-r from-[#F472B6] via-[#22C55E] to-[#F472B6] bg-clip-text text-transparent">
                Especializado
              </span>
            </h2>
            <p className="text-white/50 max-w-3xl mx-auto text-lg">
              Cada mascota tiene necesidades diferentes y cada traslado requiere un enfoque particular.
              Nuestros tres tipos de servicio cubren todas las situaciones, desde una consulta veterinaria
              hasta una mudanza completa con tu mejor amigo.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {serviceTypes.map((service, i) => {
            const isActive = activeService === service.title
            return (
              <AnimatedSection key={service.title} delay={i * 100}>
                <div
                  onClick={() => setActiveService(isActive ? null : service.title)}
                  className={`group relative rounded-2xl border backdrop-blur-sm cursor-pointer transition-all duration-500 overflow-hidden h-full ${
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
                      className="w-full h-full object-cover opacity-15 group-hover:opacity-25 transition-opacity duration-500"
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

                    <div className="space-y-2">
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
   3. HOW IT WORKS — 4 Steps
   ═══════════════════════════════════════════════════════════════════════════════ */
const howItWorksSteps = [
  {
    step: 1,
    icon: MapPin,
    title: 'Selecciona Taxi Pet en la APP',
    desc: 'Abre la aplicación de Ecotaxi y selecciona la categoría Taxi Pet dentro de los servicios disponibles. Tu ubicación se detecta automáticamente para que el conductor pet-friendly más cercano pueda encontrarte fácilmente. También puedes ingresar la dirección de recogida manualmente si lo prefieres, ideal para cuando alguien más está entregando a tu mascota.',
    color: '#F472B6',
  },
  {
    step: 2,
    icon: PawPrint,
    title: 'Indica Tipo y Tamaño de Mascota',
    desc: 'Cuéntanos sobre tu mascota: si es perro o gato, su tamaño aproximado, si necesita jaula o transportadora, y cualquier condición especial como ansiedad, movilidad reducida o recuperación post-operatoria. Esta información permite que asignemos el vehículo adecuado y que el conductor se prepare con los implementos necesarios para un traslado cómodo y seguro.',
    color: '#22C55E',
  },
  {
    step: 3,
    icon: Car,
    title: 'El Conductor Pet-Friendly Llega a tu Puerta',
    desc: 'Un conductor capacitado y certificado como pet-friendly llega a tu domicilio en el vehículo asignado según el tamaño de tu mascota. Nuestros conductores saben cómo abordar a las mascotas, cómo cargarlas correctamente y cómo hacer que el viaje sea lo menos estresante posible. Recibirás notificaciones en tiempo real con la ubicación del conductor.',
    color: '#0077BD',
  },
  {
    step: 4,
    icon: Heart,
    title: 'Tu Mascota Llega Segura a su Destino',
    desc: 'Tu mascota llega sana y salva a su destino, ya sea la clínica veterinaria, la peluquería, el parque o su nuevo hogar. Recibirás una confirmación de entrega con la hora exacta de llegada. Si es un servicio de ida y vuelta, el conductor esperará o regresará a recoger a tu mascota cuando lo indiques. Tu tranquilidad y la seguridad de tu compañero son nuestra prioridad.',
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
          backgroundImage: `radial-gradient(circle, rgba(244,114,182,0.3) 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
        }}
      />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-[#F472B6]/5 blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20 mb-4">
              <Navigation className="w-4 h-4 text-[#22C55E]" />
              <span className="text-sm text-[#22C55E]">Fácil y Rápido</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Cómo Funciona{' '}
              <span className="bg-gradient-to-r from-[#F472B6] to-[#22C55E] bg-clip-text text-transparent">
                Taxi Pet
              </span>
            </h2>
            <p className="text-white/50 max-w-3xl mx-auto text-lg">
              En solo 4 pasos, tu mascota viaja con la seguridad y el cuidado que merece. Nuestro proceso
              está diseñado para ser simple, rápido y transparente, para que tú solo te preocupes de amar
              a tu compañero mientras nosotros nos encargamos del resto.
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
   4. PET SAFETY — 6 Safety Feature Cards
   ═══════════════════════════════════════════════════════════════════════════════ */
const safetyFeatures = [
  {
    icon: Shield,
    title: 'Cinturón de Seguridad para Mascotas',
    desc: 'Todos nuestros vehículos cuentan con sistemas de sujeción diseñados específicamente para mascotas, incluyendo arneses de seguridad, correas ajustables y anclajes homologados. Estos implementos evitan que tu mascota se mueva libremente dentro del vehículo durante el trayecto, protegiéndola de frenadas bruscas, curvas cerradas o cualquier maniobra evasiva. Tu mascota viaja asegurada como cualquier pasajero.',
    color: '#F472B6',
  },
  {
    icon: Car,
    title: 'Vehículos Ventilados y Cómodos',
    desc: 'Cada vehículo asignado al servicio Taxi Pet cuenta con sistemas de ventilación y climatización que mantienen una temperatura agradable durante todo el viaje. Entendemos que las mascotas son más sensibles al calor que los humanos, especialmente en un ambiente cerrado, por lo que nuestros conductores ajustan el aire acondicionado y abren las ventilaciones para garantizar el bienestar de tu compañero durante el traslado.',
    color: '#22C55E',
  },
  {
    icon: UserCheck,
    title: 'Conductores Capacitados en Manejo Animal',
    desc: 'Nuestros conductores no son simples choferes: son profesionales capacitados en el manejo y cuidado de mascotas durante el transporte. Reciben formación sobre cómo abordar a una mascota nerviosa, cómo cargar a un animal herido, cómo reaccionar ante comportamientos inesperados y cómo mantener la calma en situaciones de emergencia. Su empatía y preparación hacen la diferencia en cada viaje.',
    color: '#0077BD',
  },
  {
    icon: Home,
    title: 'Transporte en Jaula o Porta si lo Prefieres',
    desc: 'Si tu mascota se siente más cómoda y segura en su jaula, transportadora o porta-mascotas, nosotros la transportamos con el mismo cuidado. También puedes solicitar que nuestro conductor lleve una transportadora del tamaño adecuado para tu mascota, disponible como complemento del servicio. El objetivo es que tu compañero viaje de la forma que lo haga sentir más tranquilo y protegido durante todo el trayecto.',
    color: '#8B5CF6',
  },
  {
    icon: ShieldCheck,
    title: 'Seguro de Transporte para Mascotas',
    desc: 'Cada servicio de Taxi Pet cuenta con un seguro de transporte que cubre a tu mascota durante todo el trayecto, desde la recogida hasta la entrega en el destino. Esto significa que en caso de cualquier incidente imprevisto durante el viaje, tu mascota está protegida y tú tienes la tranquilidad de saber que hay un respaldo económico para cubrir cualquier eventualidad que pueda surgir.',
    color: '#00E676',
  },
  {
    icon: Ambulance,
    title: 'Asistencia en Caso de Emergencia Veterinaria',
    desc: 'Si durante el traslado tu mascota presenta algún síntoma de emergencia, nuestros conductores están entrenados para actuar de inmediato. Mantenemos un directorio de clínicas veterinarias de emergencia disponibles las 24 horas, y nuestro sistema de despacho coordina la desviación inmediata hacia el centro veterinario más cercano. Tu mascota siempre estará en buenas manos, incluso en los momentos más críticos.',
    color: '#EF4444',
  },
]

function PetSafetySection() {
  return (
    <section id="seguridad" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(34,197,94,0.3) 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
        }}
      />
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] rounded-full bg-[#22C55E]/5 blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20 mb-4">
              <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
              <span className="text-sm text-[#22C55E]">Seguridad Garantizada</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              La Seguridad de tu Mascota{' '}
              <span className="bg-gradient-to-r from-[#22C55E] to-[#F472B6] bg-clip-text text-transparent">
                es Prioridad
              </span>
            </h2>
            <p className="text-white/50 max-w-3xl mx-auto text-lg">
              Cada detalle de nuestro servicio Taxi Pet está diseñado pensando en la seguridad y el bienestar
              de tu mascota. Desde los implementos de sujeción hasta la capacitación de nuestros conductores,
              no dejamos nada al azar cuando se trata del cuidado de tu compañero de vida.
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
   5. PET SIZES & VEHICLES — 3 Categories
   ═══════════════════════════════════════════════════════════════════════════════ */
const petSizeCategories = [
  {
    size: 'Pequeños',
    subtitle: 'Hasta 10 kg',
    icon: PawPrint,
    desc: 'Perros de razas pequeñas como Chihuahuas, Pomeranias, Yorkshire, Pugs y todas las razas de gatos. Estos peluditos son los más fáciles de transportar y pueden viajar cómodamente en cualquier tipo de vehículo. Se recomienda el uso de transportadora para mayor seguridad, aunque también pueden viajar con arnés y cinturones de seguridad especial para mascotas.',
    pets: 'Perros hasta 10kg, gatos de todas las razas, conejos, hurones y mascotas pequeñas',
    vehicle: 'Sedán',
    vehicleDesc: 'Vehículo cómodo con aire acondicionado, suficiente espacio en el asiento trasero para la transportadora y el acompañante si lo desea.',
    features: [
      'Transportadora incluida si la necesitas',
      'Asiento trasero protegido con funda impermeable',
      'Cinturón de seguridad para mascota pequeño',
      'Ventilación y temperatura controlada',
      'Viaje tranquilo sin ruidos fuertes',
      'Conductor con experiencia en mascotas pequeñas',
    ],
    color: '#F472B6',
    tag: 'SEDÁN',
  },
  {
    size: 'Medianos',
    subtitle: '10 - 25 kg',
    icon: PawPrint,
    desc: 'Perros de razas medianas como Beagles, Bulldogs, Cocker Spaniels, Border Collies y similares. Estas mascotas necesitan un poco más de espacio para viajar cómodamente y pueden requerir asistencia al subir y bajar del vehículo. Nuestros conductores están preparados para ayudar a tu mascota a subir con cuidado, especialmente si tiene problemas de movilidad o está recuperándose de una cirugía.',
    pets: 'Perros de 10 a 25kg como Beagles, Bulldogs, Cocker Spaniels, Collies',
    vehicle: 'SUV',
    vehicleDesc: 'Vehículo más alto y espacioso que facilita el acceso de mascotas medianas. Mayor espacio interior para que tu mascota viaje sin sentirse encerrada.',
    features: [
      'Mayor altura para fácil acceso de la mascota',
      'Espacio amplio en el compartimiento trasero',
      'Arnés de seguridad de tamaño mediano',
      'Asistencia al subir y bajar del vehículo',
      'Funda protectora para asientos',
      'Conductor capacitado en manejo de mascotas medianas',
    ],
    color: '#22C55E',
    tag: 'SUV',
  },
  {
    size: 'Grandes',
    subtitle: '25 kg+',
    icon: PawPrint,
    desc: 'Perros de razas grandes como Labradores, Golden Retrievers, Pastores Alemanes, Rottweilers, San Bernardo y razas gigantes. También cubrimos el transporte de múltiples mascotas en un mismo viaje. Estos peludos necesitan vehículos amplios con suficiente espacio para moverse cómodamente o acostarse durante el trayecto. Nuestros conductores tienen experiencia especial con mascotas grandes y saben cómo manejarlas con firmeza pero cariño.',
    pets: 'Perros de 25kg+, razas grandes y gigantes, varias mascotas en un mismo viaje',
    vehicle: 'Van',
    vehicleDesc: 'Vehículo tipo van con amplio espacio interior, puertas laterales deslizantes y suelo antideslizante. Ideal para mascotas grandes que necesitan espacio para estar cómodas.',
    features: [
      'Amplio espacio interior para mascotas grandes',
      'Puertas laterales deslizantes para fácil acceso',
      'Suelo antideslizante para mayor estabilidad',
      'Arnés de seguridad de tamaño grande',
      'Transporte de múltiples mascotas simultáneas',
      'Conductor especializado en razas grandes y gigantes',
    ],
    color: '#0077BD',
    tag: 'VAN',
  },
]

function PetSizesSection() {
  return (
    <section id="tamaños" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-[#F472B6]/5 blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F472B6]/10 border border-[#F472B6]/20 mb-4">
              <Ruler className="w-4 h-4 text-[#F472B6]" />
              <span className="text-sm text-[#F472B6]">Tamaño y Vehículo Adecuado</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              El Vehículo Correcto para{' '}
              <span className="bg-gradient-to-r from-[#F472B6] to-[#22C55E] bg-clip-text text-transparent">
                tu Mascota
              </span>
            </h2>
            <p className="text-white/50 max-w-3xl mx-auto text-lg">
              No todas las mascotas son iguales y no todos los vehículos sirven para todos los tamaños.
              Asignamos el tipo de vehículo según el tamaño y las necesidades de tu mascota, garantizando
              un viaje cómodo y seguro sin importar si es un gatito o un San Bernardo.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {petSizeCategories.map((cat, i) => (
            <AnimatedSection key={cat.size} delay={i * 100}>
              <div className="group relative rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-white/10 transition-all duration-500 overflow-hidden h-full">
                {/* Header with colored accent */}
                <div className="p-6 md:p-7 border-b border-white/[0.04]" style={{ backgroundColor: `${cat.color}05` }}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${cat.color}15` }}>
                        <cat.icon className="w-6 h-6" style={{ color: cat.color }} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{cat.size}</h3>
                        <p className="text-sm" style={{ color: cat.color }}>{cat.subtitle}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold border"
                      style={{
                        backgroundColor: `${cat.color}10`,
                        color: cat.color,
                        borderColor: `${cat.color}20`,
                      }}
                    >
                      {cat.tag}
                    </span>
                  </div>
                  <p className="text-sm text-white/50 leading-relaxed">{cat.desc}</p>
                </div>

                <div className="p-6 md:p-7 space-y-5">
                  {/* Pets */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <PawPrint className="w-3.5 h-3.5" style={{ color: cat.color }} />
                      <span className="text-xs font-bold uppercase tracking-wider" style={{ color: cat.color }}>Mascotas</span>
                    </div>
                    <p className="text-xs text-white/45 leading-relaxed">{cat.pets}</p>
                  </div>

                  {/* Vehicle */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Car className="w-3.5 h-3.5" style={{ color: cat.color }} />
                      <span className="text-xs font-bold uppercase tracking-wider" style={{ color: cat.color }}>Vehículo: {cat.vehicle}</span>
                    </div>
                    <p className="text-xs text-white/45 leading-relaxed">{cat.vehicleDesc}</p>
                  </div>

                  {/* Features */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-3.5 h-3.5" style={{ color: cat.color }} />
                      <span className="text-xs font-bold uppercase tracking-wider" style={{ color: cat.color }}>Incluye</span>
                    </div>
                    <div className="space-y-1.5">
                      {cat.features.map((feat) => (
                        <div key={feat} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3 h-3 mt-0.5 shrink-0" style={{ color: cat.color }} />
                          <span className="text-xs text-white/40">{feat}</span>
                        </div>
                      ))}
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
   6. VETERINARY EMERGENCIES — Special Section
   ═══════════════════════════════════════════════════════════════════════════════ */
function VetEmergencySection() {
  return (
    <section id="emergencias" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e17] via-[#1a0510] to-[#0a0e17]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full bg-[#EF4444]/5 blur-[180px]" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(239,68,68,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(239,68,68,0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <AnimatedSection>
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EF4444]/10 border border-[#EF4444]/20 mb-6">
                <Ambulance className="w-4 h-4 text-[#EF4444]" />
                <span className="text-sm text-[#EF4444]">Emergencias Veterinarias 24/7</span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Cuando tu Mascota{' '}
                <span className="bg-gradient-to-r from-[#EF4444] to-[#F472B6] bg-clip-text text-transparent">
                  te Necesita
                </span>
              </h2>

              <p className="text-white/55 text-lg leading-relaxed mb-6">
                Las emergencias veterinarias no avisan, no esperan y no perdonan. Cuando tu mascota tiene
                un accidente, ingiere algo tóxico, sufre una convulsión o presenta cualquier síntoma que
                requiere atención inmediata, cada minuto cuenta. Nuestro servicio de emergencia veterinaria
                está diseñado para que el tiempo de respuesta sea el menor posible, con despacho prioritario
                y coordinación directa con las clínicas veterinarias de emergencia de la ciudad.
              </p>

              <p className="text-white/55 text-lg leading-relaxed mb-8">
                Al solicitar un Taxi Pet de emergencia, nuestro sistema de despacho activa un protocolo
                especial: se asigna el conductor más cercano a tu ubicación, se notifica a la clínica
                veterinaria de tu preferencia sobre tu llegada inminente, y el conductor recibe instrucciones
                específicas sobre cómo manejar a una mascota en estado de emergencia. Tu mascota no espera,
                y nosotros tampoco.
              </p>

              {/* Emergency features */}
              <div className="space-y-4 mb-10">
                {[
                  { icon: Ambulance, text: 'Despacho prioritario con el conductor más cercano' },
                  { icon: Stethoscope, text: 'Coordinación con clínicas veterinarias de emergencia' },
                  { icon: Clock, text: 'Disponible las 24 horas, los 7 días de la semana' },
                  { icon: Phone, text: 'Línea directa de emergencia para casos críticos' },
                ].map((point) => (
                  <div key={point.text} className="flex items-center gap-3">
                    <point.icon className="w-5 h-5 text-[#EF4444] shrink-0" />
                    <span className="text-white/70">{point.text}</span>
                  </div>
                ))}
              </div>

              <a
                href="tel:+59133296885"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-lg font-bold text-white bg-[#EF4444] hover:bg-[#F87171] transition-all duration-300 shadow-[0_0_40px_rgba(239,68,68,0.3)] hover:shadow-[0_0_60px_rgba(239,68,68,0.5)] hover:scale-105"
              >
                <PhoneCall className="w-5 h-5" />
                Emergencia Veterinaria
              </a>
            </div>
          </AnimatedSection>

          {/* Right: Emergency process cards */}
          <AnimatedSection delay={200}>
            <div className="space-y-4">
              {[
                {
                  icon: AlertCircle,
                  title: 'Detecta la Emergencia',
                  desc: 'Identifica los signos de emergencia en tu mascota: dificultad para respirar, sangrado profuso, convulsiones, vómitos persistentes, letargo extremo, ingesta de sustancias tóxicas o cualquier comportamiento que se salga de lo normal. No esperes a que los síntomas empeoren, actúa de inmediato.',
                  color: '#EF4444',
                },
                {
                  icon: PhoneCall,
                  title: 'Solicita Taxi Pet Emergencia',
                  desc: 'Selecciona la opción de emergencia en la APP o llámanos directamente a nuestra línea de emergencia. Nuestro sistema de despacho activa el protocolo de emergencia, asignando inmediatamente al conductor pet-friendly más cercano a tu ubicación con instrucciones específicas para tu caso.',
                  color: '#F472B6',
                },
                {
                  icon: Car,
                  title: 'Traslado Prioritario',
                  desc: 'El conductor llega a tu puerta en el menor tiempo posible, preparado para asistir a tu mascota en su condición. El vehículo toma la ruta más rápida hacia la clínica veterinaria designada, con el conductor informando constantemente sobre el estado de la mascota durante el trayecto.',
                  color: '#0077BD',
                },
                {
                  icon: Stethoscope,
                  title: 'Llegada a la Clínica',
                  desc: 'La clínica veterinaria ya fue notificada de tu llegada y está preparada para recibir a tu mascota. Nuestro conductor te ayuda a entregar a tu mascota al personal médico y se asegura de que quede en buenas manos antes de finalizar el servicio. Tu tranquilidad también importa.',
                  color: '#22C55E',
                },
              ].map((point, i) => (
                <div
                  key={point.title}
                  className="group p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/10 transition-all duration-300"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${point.color}12` }}>
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
   7. COST MODEL — Platform Transparency
   ═══════════════════════════════════════════════════════════════════════════════ */
function CostModelSection() {
  return (
    <section id="costos" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-[#F472B6]/5 blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#71B124]/10 border border-[#71B124]/20 mb-4">
              <Handshake className="w-4 h-4 text-[#71B124]" />
              <span className="text-sm text-[#71B124]">Transparencia Total</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Modelo de{' '}
              <span className="bg-gradient-to-r from-[#71B124] to-[#F472B6] bg-clip-text text-transparent">
                Costos
              </span>
            </h2>
            <p className="text-white/50 max-w-3xl mx-auto text-lg">
              Ecotaxi es una plataforma tecnológica que conecta a usuarios con agentes de servicio. Queremos
              que tengas total claridad sobre cómo funcionan los costos del servicio Taxi Pet.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left: Important disclaimer card */}
          <AnimatedSection delay={100}>
            <div className="relative p-6 md:p-8 rounded-2xl bg-white/[0.04] border-2 border-[#71B124]/20 backdrop-blur-sm shadow-[0_0_40px_rgba(113,178,36,0.06)] h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#71B124]/10 flex items-center justify-center">
                  <AlertCircle className="w-7 h-7 text-[#71B124]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Información Importante</h3>
                  <p className="text-sm text-[#71B124]">Ecotaxi es una Plataforma Tecnológica</p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-white/55 leading-relaxed">
                  Ecotaxi es una <strong className="text-white/80">plataforma tecnológica</strong> que conecta
                  a usuarios con agentes de servicio de transporte. No somos un proveedor de servicio directo,
                  sino un facilitador que permite la conexión entre tú y los conductores especializados en
                  transporte de mascotas. Esta distinción es fundamental para entender cómo funcionan los costos.
                </p>
                <p className="text-white/55 leading-relaxed">
                  El costo que refleja la APP es <strong className="text-white/80">solo el costo del
                  desplazamiento</strong>, es decir, el valor del viaje desde el punto de recogida hasta el
                  destino. Los demás costos dependen del servicio y se coordinan directamente con el agente.
                  Esto garantiza transparencia y flexibilidad para ambas partes.
                </p>
                <p className="text-white/55 leading-relaxed">
                  Puedes conocer la tarifa en línea antes de solicitar el servicio, directamente en la APP.
                  El costo puede ser fijo, mínimo, por tiempo o por distancia, esto depende de cada agente
                  y del tipo de servicio requerido. Si tienes seguro que cubre este servicio dentro de Ecotaxi,
                  se te notificará que no tiene costo para ti.
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Right: Cost breakdown cards */}
          <AnimatedSection delay={200}>
            <div className="space-y-4">
              {[
                {
                  icon: Navigation,
                  title: 'Costo de Desplazamiento',
                  desc: 'Es el valor que se muestra en la APP al solicitar el servicio. Corresponde únicamente al traslado desde la recogida hasta el destino. Este costo se calcula automáticamente según la distancia y el tiempo estimado del recorrido, y lo puedes ver antes de confirmar tu solicitud.',
                  color: '#0077BD',
                },
                {
                  icon: Handshake,
                  title: 'Costos Adicionales del Servicio',
                  desc: 'Los costos que no corresponden al desplazamiento se coordinan directamente con el agente. Esto incluye servicios como espera, acompañamiento extra, uso de transportadora proporcionada por el conductor, o cualquier otro servicio adicional que solicites. Siempre serás informado antes de incurrir en costos adicionales.',
                  color: '#F472B6',
                },
                {
                  icon: ShieldCheck,
                  title: 'Cobertura de Seguro',
                  desc: 'Si tienes un seguro que cubre el servicio de transporte de mascotas dentro de Ecotaxi, se te notificará automáticamente que el servicio no tiene costo para ti. Nuestro sistema detecta tu cobertura y aplica los beneficios correspondientes sin que tengas que hacer trámites adicionales.',
                  color: '#22C55E',
                },
                {
                  icon: Eye,
                  title: 'Tarifa Transparente',
                  desc: 'Antes de confirmar cualquier solicitud, podrás ver la tarifa estimada en pantalla. El costo puede ser fijo, mínimo, por tiempo o por distancia, dependiendo de cada agente y del tipo de servicio. No hay sorpresas ni costos ocultos: sabes exactamente cuánto vas a pagar antes de aceptar el servicio.',
                  color: '#71B124',
                },
              ].map((point, i) => (
                <div
                  key={point.title}
                  className="group p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/10 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${point.color}12` }}>
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
   8. CONTACT / CTA SECTION
   ═══════════════════════════════════════════════════════════════════════════════ */
function ContactSection() {
  return (
    <section id="contacto" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full bg-[#F472B6]/5 blur-[180px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F472B6]/10 border border-[#F472B6]/20 mb-4">
              <PawPrint className="w-4 h-4 text-[#F472B6]" />
              <span className="text-sm text-[#F472B6]">Estamos Listos para Ayudarte</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Solicita tu{' '}
              <span className="bg-gradient-to-r from-[#F472B6] to-[#22C55E] bg-clip-text text-transparent">
                Taxi Pet
              </span>{' '}
              Ahora
            </h2>
            <p className="text-white/50 max-w-3xl mx-auto text-lg">
              No importa la hora ni el motivo: ya sea una consulta de rutina, una emergencia veterinaria
              o simplemente llevar a tu peludo a su cita de grooming, estamos aquí para ti. Contáctanos
              por el canal que prefieras y en minutos tendrás un conductor pet-friendly en tu puerta.
            </p>
          </div>
        </AnimatedSection>

        {/* Contact cards */}
        <AnimatedSection delay={100}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            {/* Phone */}
            <div className="group p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-[#F472B6]/20 transition-all duration-500 text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#F472B6]/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <PhoneCall className="w-7 h-7 text-[#F472B6]" />
              </div>
              <h3 className="text-white font-semibold mb-2">Llámanos</h3>
              <a href="tel:+59133296885" className="text-[#F472B6] text-lg font-medium hover:underline">
                (+591) 3 3296885
              </a>
              <p className="text-xs text-white/30 mt-2">Disponible 24/7</p>
            </div>

            {/* WhatsApp */}
            <div className="group p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-[#22C55E]/20 transition-all duration-500 text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#22C55E]/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <MessageCircle className="w-7 h-7 text-[#22C55E]" />
              </div>
              <h3 className="text-white font-semibold mb-2">WhatsApp</h3>
              <a href="https://wa.me/59133296885" target="_blank" rel="noopener noreferrer" className="text-[#22C55E] text-lg font-medium hover:underline">
                Escríbenos
              </a>
              <p className="text-xs text-white/30 mt-2">Respuesta inmediata</p>
            </div>

            {/* Reservations */}
            <div className="group p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-[#0077BD]/20 transition-all duration-500 text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#0077BD]/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Star className="w-7 h-7 text-[#0077BD]" />
              </div>
              <h3 className="text-white font-semibold mb-2">Reservas</h3>
              <a href="#reservas" className="text-[#0077BD] text-lg font-medium hover:underline">
                Reserva en línea
              </a>
              <p className="text-xs text-white/30 mt-2">Programa tu viaje</p>
            </div>
          </div>
        </AnimatedSection>

        {/* CTA Banner */}
        <AnimatedSection delay={200}>
          <div className="relative p-8 md:p-12 rounded-2xl overflow-hidden mb-12" style={{ background: 'linear-gradient(135deg, rgba(244,114,182,0.1) 0%, rgba(34,197,94,0.1) 50%, rgba(0,119,189,0.1) 100%)' }}>
            <div className="absolute inset-0 border border-[#F472B6]/10 rounded-2xl" />
            <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#F472B6]/5 blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-[#22C55E]/5 blur-[100px]" />

            <div className="relative z-10 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <PawPrint className="w-8 h-8 text-[#F472B6]" />
                <h3 className="text-2xl md:text-3xl font-bold text-white">Tu Mascota Merece lo Mejor</h3>
                <Heart className="w-8 h-8 text-[#22C55E]" />
              </div>
              <p className="text-white/55 max-w-2xl mx-auto mb-8 leading-relaxed">
                No arriesgues la seguridad de tu compañero de vida con un transporte improvisado. Con Taxi Pet
                de Ecotaxi, tu mascota viaja con conductores capacitados, vehículos adecuados y todas las
                medidas de seguridad que ella merece. Solicita tu servicio ahora y comprueba por qué somos
                la mejor opción para el transporte de mascotas en Bolivia.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="#reservas"
                  className="px-8 py-4 rounded-full text-lg font-semibold text-black bg-[#F472B6] hover:bg-[#F9A8D4] transition-all duration-300 shadow-[0_0_30px_rgba(244,114,182,0.3)] hover:shadow-[0_0_50px_rgba(244,114,182,0.5)] hover:scale-105"
                >
                  Reservar Taxi Pet
                  <ArrowRight className="w-5 h-5 inline-block ml-2" />
                </a>
                <a
                  href="tel:+59133296885"
                  className="px-8 py-4 rounded-full text-lg font-semibold text-[#22C55E] border border-[#22C55E]/30 hover:border-[#22C55E]/60 hover:bg-[#22C55E]/5 transition-all duration-300"
                >
                  <PhoneCall className="w-5 h-5 inline-block mr-2" />
                  Llamar Ahora
                </a>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Reservations iframe */}
        <AnimatedSection delay={300}>
          <div id="reservas" className="relative rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02]">
            <div className="p-4 border-b border-white/[0.06] flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
              <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
              <div className="w-3 h-3 rounded-full bg-[#22C55E]" />
              <span className="text-xs text-white/30 ml-2">Reservas Ecotaxi — Taxi Pet</span>
            </div>
            <iframe
              src="https://id3251.tm.taxi:58443/?cid=1"
              title="Reservas Ecotaxi Bolivia"
              className="w-full h-[600px] border-0"
              allow="geolocation; microphone; camera"
              loading="lazy"
            />
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════════════════════ */
export default function TransporteMascotasPage() {
  return (
    <main className="bg-[#0a0e17] min-h-screen">
      <Navbar />
      <HeroSection />
      <ServiceTypesSection />
      <HowItWorksSection />
      <PetSafetySection />
      <PetSizesSection />
      <VetEmergencySection />
      <CostModelSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
