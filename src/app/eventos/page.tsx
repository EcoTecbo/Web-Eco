'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Car, Bus, Users, Shield, CheckCircle2, ArrowRight, Star,
  Phone, MapPin, Smartphone, Globe, MessageCircle, Headphones,
  User, Zap, BadgeCheck, Navigation, Eye, Clock, Heart,
  Sparkles, Crown, Briefcase, Music, Trophy, TreePine,
  Plane, Church, Tent, PartyPopper, Cake,
  Mic2, Building2, Mountain, Fuel, Palette, Truck,
  Wind, CircleDollarSign, Handshake, Route,
  CalendarDays, UsersRound, GraduationCap, Wine,
  BusFront, Truck as VanIcon
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
          backgroundImage: `linear-gradient(rgba(139,92,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[#8B5CF6]/12 blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#FF6B35]/8 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[#E91E63]/6 blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="absolute top-32 right-[8%] md:right-[18%] opacity-[0.07]">
        <PartyPopper className="w-28 h-28 md:w-40 md:h-40 text-[#8B5CF6]" />
      </div>
      <div className="absolute bottom-28 left-[5%] md:left-[12%] opacity-[0.06]">
        <Bus className="w-20 h-20 md:w-28 md:h-28 text-[#FF6B35]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 pb-16">
        <AnimatedSection>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 mb-8 backdrop-blur-sm">
            <PartyPopper className="w-4 h-4 text-[#8B5CF6]" />
            <span className="text-sm text-[#8B5CF6] font-medium">Transporte para Eventos</span>
          </div>
        </AnimatedSection>
        <AnimatedSection delay={100}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Tu Evento,{' '}
            <span className="bg-gradient-to-r from-[#8B5CF6] via-[#FF6B35] to-[#E91E63] bg-clip-text text-transparent">
              Nuestra Movida
            </span>
          </h1>
        </AnimatedSection>
        <AnimatedSection delay={200}>
          <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-10 leading-relaxed">
            No importa el tamaño del evento, Ecotaxi tiene un vehículo para cada ocasión. Desde un cumpleaños
            infantil hasta un mega concierto. Nos adaptamos a tu presupuesto. Tú disfruta, nosotros nos encargamos de la movida.
          </p>
        </AnimatedSection>
        <AnimatedSection delay={300}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <a href="#eventos" className="px-8 py-4 rounded-full text-lg font-semibold text-white bg-[#8B5CF6] hover:bg-[#a78bfa] transition-all duration-300 shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:shadow-[0_0_50px_rgba(139,92,246,0.5)] hover:scale-105">
              Ver Tipos de Eventos
            </a>
            <a href="#vehiculos" className="px-8 py-4 rounded-full text-lg font-semibold text-white border border-white/20 hover:border-[#8B5CF6]/50 hover:bg-white/5 transition-all duration-300">
              Elegir Vehículo
            </a>
          </div>
        </AnimatedSection>
        <AnimatedSection delay={400}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { value: '12+', label: 'Tipos de evento', icon: PartyPopper },
              { value: '8', label: 'Tipos de vehículo', icon: Bus },
              { value: '100%', label: 'Adaptado a ti', icon: CircleDollarSign },
              { value: '24/7', label: 'Logística', icon: Handshake },
            ].map((stat) => (
              <div key={stat.label} className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-[#8B5CF6]/20 transition-all duration-300">
                <stat.icon className="w-5 h-5 text-[#8B5CF6] mx-auto mb-2" />
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
   2. EVENT TYPES
   ═══════════════════════════════════════════════════════════════════════════════ */
const eventTypes = [
  { icon: Heart, title: 'Bodas', desc: 'Vehículos decorados para los novios y micros/minibuses para invitados. Decoración floral, champaña y la puntualidad que tu boda merece.', color: '#E91E63', tag: 'POPULAR' },
  { icon: Church, title: 'Funerales', desc: 'Servicio discreto, respetuoso y puntual. Vehículos apropiados para traslados fúnebres con choferes que actúan con total decoro.', color: '#6B7280' },
  { icon: Trophy, title: 'Eventos Deportivos', desc: 'Transporte para equipos, comitivas y aficionados. Desde el equipo completo en bus hasta vehículos individuales para directivos.', color: '#00E676' },
  { icon: Mic2, title: 'Conciertos', desc: 'Movilización de artistas, equipos técnicos y público. Limusinas para estrellas, vans para producción y buses para el público masivo.', color: '#8B5CF6' },
  { icon: Building2, title: 'Conferencias', desc: 'Transporte corporativo para congresos y convenciones. Recogida en aeropuerto, traslados hotel-sede y vehículos ejecutivos para ponentes.', color: '#0077BD', tag: 'CORPORATIVO' },
  { icon: Cake, title: 'Cumpleaños', desc: 'Desde un cumpleaños infantil con transporte seguro para los pequeños hasta una fiesta sorpresa con limusina incluida.', color: '#FF6B35', tag: 'FAMILIAR' },
  { icon: GraduationCap, title: 'Graduaciones', desc: 'Vehículos decorados para el graduado y transporte para familia y amigos. Con la elegancia que la ocasión exige.', color: '#D4AF37' },
  { icon: UsersRound, title: 'Juntas y Reuniones', desc: 'Transporte para juntas de vecinos, fraternidades, encuentros sociales. Vehículos de capacidad adecuada para cada grupo.', color: '#FF9800' },
  { icon: Church, title: 'Paseos Religiosos', desc: 'Excursiones y peregrinaciones con respeto y puntualidad. Transporte para comunidades religiosas, visitas a santuarios y retiros.', color: '#71B124' },
  { icon: Mountain, title: 'Viajes Fuera de la Ciudad', desc: 'Excursiones y viajes interdepartamentales con vehículos aptos para carretera. Choferes que conocen las rutas de Bolivia.', color: '#00BCD4' },
  { icon: Plane, title: 'Recogida Aeropuerto', desc: 'Recogida grupal o individual en el aeropuerto para eventos. Recepción con carteles, asistencia con equipaje y traslado directo.', color: '#0077BD' },
  { icon: Tent, title: 'Ferias y Exposiciones', desc: 'Transporte para expositores, visitantes y equipos de montaje. Logística de entrada y salida coordinada para eventos masivos.', color: '#E91E63' },
]

function EventTypesSection() {
  return (
    <section id="eventos" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-[#8B5CF6]/4 blur-[150px]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 mb-4">
              <PartyPopper className="w-4 h-4 text-[#8B5CF6]" />
              <span className="text-sm text-[#8B5CF6]">Para Cada Ocasión</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Eventos de{' '}
              <span className="bg-gradient-to-r from-[#8B5CF6] via-[#FF6B35] to-[#E91E63] bg-clip-text text-transparent">
                Todo Tipo
              </span>
            </h2>
            <p className="text-white/50 max-w-3xl mx-auto text-lg">
              Ya sea de uso individual, familiar o grupal, Ecotaxi tiene el vehículo perfecto.
              Desde un cumpleaños infantil hasta un mega concierto.
            </p>
          </div>
        </AnimatedSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {eventTypes.map((event, i) => (
            <AnimatedSection key={event.title + i} delay={i * 70}>
              <div className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-white/10 transition-all duration-500 h-full">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/[0.02] transition-all duration-500" />
                {event.tag && (
                  <div className="absolute top-4 right-4">
                    <span className="px-2 py-1 rounded-full text-[10px] font-bold uppercase" style={{ backgroundColor: `${event.color}15`, color: event.color, borderWidth: 1, borderColor: `${event.color}25` }}>
                      {event.tag}
                    </span>
                  </div>
                )}
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: `${event.color}12` }}>
                    <event.icon className="w-6 h-6" style={{ color: event.color }} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{event.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{event.desc}</p>
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
   3. WEDDING SPECIAL
   ═══════════════════════════════════════════════════════════════════════════════ */
function WeddingSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e17] via-[#1a0a18] to-[#0a0e17]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full bg-[#E91E63]/6 blur-[180px]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E91E63]/10 border border-[#E91E63]/20 mb-4">
              <Heart className="w-4 h-4 text-[#E91E63]" />
              <span className="text-sm text-[#E91E63]">Especial Bodas</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Tu Boda Merece{' '}
              <span className="bg-gradient-to-r from-[#E91E63] via-[#FF6B9D] to-[#E91E63] bg-clip-text text-transparent">
                Perfección
              </span>
            </h2>
            <p className="text-white/50 max-w-3xl mx-auto text-lg">
              Vehículos decorados para los novios, transporte para todos los invitados y la logística completa.
              Tú disfruta, nosotros nos encargamos de la movida.
            </p>
          </div>
        </AnimatedSection>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <AnimatedSection delay={100}>
            <div className="p-8 rounded-2xl bg-white/[0.03] border border-[#E91E63]/15 backdrop-blur-sm h-full">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#E91E63]/10 flex items-center justify-center">
                  <Crown className="w-7 h-7 text-[#E91E63]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Traslado de los Novios</h3>
                  <p className="text-sm text-[#E91E63]/70">Vehículos decorados con elegancia</p>
                </div>
              </div>
              <p className="text-white/45 text-sm leading-relaxed mb-6">
                El vehículo de los novios es el centro de atención del gran día. Ofrecemos sedanes de lujo decorados con flores y cintas, limusinas con champaña, y vehículos clásicos que hacen del trayecto una experiencia tan memorable como la ceremonia misma.
              </p>
              <div className="space-y-3">
                {[
                  { icon: Car, text: 'Sedanes de lujo decorados con flores y cintas' },
                  { icon: Crown, text: 'Limusinas con bar privado y champaña' },
                  { icon: Palette, text: 'Decoración personalizada según temática' },
                  { icon: Clock, text: 'Puntualidad absoluta — ni un minuto de retraso' },
                  { icon: User, text: 'Chofer vestido para la ocasión' },
                  { icon: Wine, text: 'Bebida de bienvenida a bordo' },
                ].map((item) => (
                  <div key={item.text} className="flex items-start gap-3">
                    <item.icon className="w-4 h-4 text-[#E91E63] mt-0.5 shrink-0" />
                    <span className="text-sm text-white/50">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <div className="p-8 rounded-2xl bg-white/[0.03] border border-[#FF6B35]/15 backdrop-blur-sm h-full">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#FF6B35]/10 flex items-center justify-center">
                  <Bus className="w-7 h-7 text-[#FF6B35]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Transporte de Invitados</h3>
                  <p className="text-sm text-[#FF6B35]/70">Micros y minibuses para todos</p>
                </div>
              </div>
              <p className="text-white/45 text-sm leading-relaxed mb-6">
                Que nadie se quede sin llegar a la boda. Coordinamos el transporte de todos los invitados con micros y minibuses que recogen en puntos estratégicos de la ciudad y llevan directo a la ceremonia y recepción.
              </p>
              <div className="space-y-3">
                {[
                  { icon: Bus, text: 'Micros con capacidad de 30 a 45 pasajeros' },
                  { icon: BusFront, text: 'Minibuses para grupos de 15 a 25 personas' },
                  { icon: MapPin, text: 'Recogida en puntos estratégicos de la ciudad' },
                  { icon: Navigation, text: 'Ruta ceremonia → recepción coordinada' },
                  { icon: Clock, text: 'Horarios sincronizados con la agenda del evento' },
                  { icon: Users, text: 'Nadie se queda sin llegar al evento' },
                ].map((item) => (
                  <div key={item.text} className="flex items-start gap-3">
                    <item.icon className="w-4 h-4 text-[#FF6B35] mt-0.5 shrink-0" />
                    <span className="text-sm text-white/50">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   4. VEHICLE OPTIONS — Rutero vs Privado
   ═══════════════════════════════════════════════════════════════════════════════ */
const eventVehicles = [
  { icon: Car, name: 'Sedán', capacity: '3-4 pasajeros', desc: 'Vehículo ejecutivo para traslados individuales o parejas. Ideal para el novio, la novia o el ponente principal del evento.', color: '#0077BD', type: 'Privado' },
  { icon: Crown, name: 'Sedán VIP', capacity: '3 pasajeros', desc: 'Alta gama para quienes buscan la máxima elegancia. Mercedes, Audi con chofer bilingüe y vestimenta formal.', color: '#D4AF37', type: 'Privado' },
  { icon: Crown, name: 'Limusina', capacity: '8-10 pasajeros', desc: 'La experiencia definitiva para bodas, quinceañeras y celebraciones de lujo. Bar privado, iluminación y sonido premium.', color: '#E91E63', type: 'Privado' },
  { icon: Car, name: 'SUV', capacity: '4-5 pasajeros', desc: 'SUV amplio con A/C y espacio para equipaje. Ideal para traslados ejecutivos o grupos pequeños.', color: '#00E676', type: 'Privado' },
  { icon: VanIcon, name: 'Minivan / Van', capacity: '8-12 pasajeros', desc: 'Van ejecutiva con A/C para grupos medianos. Perfecta para comitivas, equipos deportivos o grupos de invitados.', color: '#FF6B35', type: 'Ambos' },
  { icon: BusFront, name: 'Minibus', capacity: '15-25 pasajeros', desc: 'Minibus con A/C para grupos medianos y grandes. Ideal para bodas, graduaciones y eventos con grupos considerables.', color: '#8B5CF6', type: 'Ambos' },
  { icon: Bus, name: 'Micro / Bus', capacity: '30-45 pasajeros', desc: 'Micros y buses para transporte masivo. La solución para conciertos, ferias y eventos con gran asistencia.', color: '#00BCD4', type: 'Rutero' },
  { icon: Truck, name: 'Camioneta Cerrada', capacity: 'Carga y equipo', desc: 'Para transporte de equipaje, decoración, equipos de sonido, montaje de stands y toda la logística de carga del evento.', color: '#FF9800', type: 'Rutero' },
]

function VehicleOptionsSection() {
  return (
    <section id="vehiculos" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-[#FF6B35]/4 blur-[120px]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF6B35]/10 border border-[#FF6B35]/20 mb-4">
              <Bus className="w-4 h-4 text-[#FF6B35]" />
              <span className="text-sm text-[#FF6B35]">Opciones de Vehículo</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Elige entre{' '}
              <span className="bg-gradient-to-r from-[#8B5CF6] via-[#FF6B35] to-[#E91E63] bg-clip-text text-transparent">
                Rutero o Privado
              </span>
            </h2>
            <p className="text-white/50 max-w-3xl mx-auto text-lg">
              Nos adaptamos a tu presupuesto. Elige entre un vehículo rutero de línea o nuestros vehículos privados especiales, nuevos con aire acondicionado.
            </p>
          </div>
        </AnimatedSection>

        {/* Key distinction */}
        <AnimatedSection delay={100}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-14">
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-[#6B7280]/15">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#6B7280]/10 flex items-center justify-center">
                  <Bus className="w-5 h-5 text-[#6B7280]" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Vehículo Rutero de Línea</h3>
                  <p className="text-xs text-white/30">Económico y funcional</p>
                </div>
              </div>
              <p className="text-sm text-white/45 leading-relaxed">
                Vehículos de la flota regular que cumplen perfectamente con el servicio. La opción más económica para eventos donde lo principal es mover personas de forma segura y puntal.
              </p>
              <div className="flex items-center gap-2 mt-4">
                <CircleDollarSign className="w-4 h-4 text-[#6B7280]" />
                <span className="text-sm text-[#6B7280] font-semibold">Mejor precio</span>
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-[#00E676]/15 shadow-[0_0_20px_rgba(0,230,118,0.03)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#00E676]/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-[#00E676]" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Vehículo Privado Especial</h3>
                  <p className="text-xs text-[#00E676]/70">Nuevo con A/C</p>
                </div>
              </div>
              <p className="text-sm text-white/45 leading-relaxed">
                Vehículos nuevos, con aire acondicionado, interiores impecables y el nivel de confort que tu evento merece. Ideales para bodas, eventos corporativos y artistas.
              </p>
              <div className="flex items-center gap-2 mt-4">
                <Wind className="w-4 h-4 text-[#00E676]" />
                <span className="text-sm text-[#00E676] font-semibold">A/C + Confort premium</span>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {eventVehicles.map((vehicle, i) => (
            <AnimatedSection key={vehicle.name} delay={i * 60}>
              <div className="group relative p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-white/10 transition-all duration-500 h-full">
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ boxShadow: `0 0 20px ${vehicle.color}08` }} />
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase" style={{ backgroundColor: `${vehicle.color}12`, color: vehicle.color }}>{vehicle.type}</span>
                </div>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300" style={{ background: `${vehicle.color}12` }}>
                    <vehicle.icon className="w-6 h-6" style={{ color: vehicle.color }} />
                  </div>
                  <h3 className="text-white font-semibold mb-1">{vehicle.name}</h3>
                  <p className="text-xs text-white/30 mb-3">{vehicle.capacity}</p>
                  <p className="text-xs text-white/40 leading-relaxed">{vehicle.desc}</p>
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
   5. LOGISTICS
   ═══════════════════════════════════════════════════════════════════════════════ */
function LogisticsSection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `radial-gradient(circle, rgba(139,92,246,0.3) 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection>
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 mb-6">
                <Handshake className="w-4 h-4 text-[#00E676]" />
                <span className="text-sm text-[#00E676]">Logística Completa</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Te ayudamos con la{' '}
                <span className="bg-gradient-to-r from-[#00E676] to-[#8B5CF6] bg-clip-text text-transparent">logística</span>
              </h2>
              <p className="text-white/50 text-lg leading-relaxed mb-6">
                Organizar un evento ya es suficientemente complicado como para preocuparte también del transporte. En Ecotaxi contamos con la experiencia en el servicio para planificar, coordinar y ejecutar toda la logística de movilidad de tu evento.
              </p>
              <p className="text-white/50 text-lg leading-relaxed mb-8">
                No solo ponemos vehículos a tu disposición — diseñamos la solución de transporte completa. Analizamos participantes, ubicaciones, horarios y rutas óptimas para que todo fluya sin contratiempos. Tú disfruta, nosotros nos encargamos de la movida.
              </p>
              <div className="space-y-3">
                {[
                  { icon: MapPin, text: 'Planificación de rutas y puntos de recogida', color: '#8B5CF6' },
                  { icon: Clock, text: 'Coordinación de horarios sincronizada con tu agenda', color: '#00E676' },
                  { icon: Users, text: 'Gestión de flota según cantidad de participantes', color: '#0077BD' },
                  { icon: Headphones, text: 'Coordinador asignado el día del evento', color: '#FF6B35' },
                  { icon: Phone, text: 'Comunicación en tiempo real con choferes', color: '#E91E63' },
                  { icon: Eye, text: 'Supervisión y seguimiento GPS de todas las unidades', color: '#FF9800' },
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
              <div className="absolute -inset-4 rounded-3xl border border-[#8B5CF6]/8 animate-glow-pulse" />
              <div className="relative p-8 rounded-2xl bg-white/[0.04] border border-[#8B5CF6]/12 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#8B5CF6]" />
                    <span className="text-sm text-white/60">Logística de Evento</span>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-[#8B5CF6]/5 border border-[#8B5CF6]/10 mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <PartyPopper className="w-4 h-4 text-[#8B5CF6]" />
                    <span className="text-sm font-semibold text-white">Boda García — 15 Mar 2026</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center p-2 rounded-lg bg-white/[0.03]"><div className="text-lg font-bold text-[#8B5CF6]">180</div><div className="text-[10px] text-white/30">Invitados</div></div>
                    <div className="text-center p-2 rounded-lg bg-white/[0.03]"><div className="text-lg font-bold text-[#00E676]">5</div><div className="text-[10px] text-white/30">Unidades</div></div>
                    <div className="text-center p-2 rounded-lg bg-white/[0.03]"><div className="text-lg font-bold text-[#FF6B35]">3</div><div className="text-[10px] text-white/30">Puntos</div></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="text-xs text-white/30 mb-2">Cronograma de transporte</div>
                  {[
                    { time: '14:00', action: 'Recogida novios — Sedán VIP decorado', color: '#E91E63' },
                    { time: '14:30', action: 'Recogida invitados Zona Sur — Micro', color: '#8B5CF6' },
                    { time: '14:45', action: 'Recogida invitados Centro — Minibus', color: '#0077BD' },
                    { time: '15:00', action: 'Llegada a Iglesia — Todas las unidades', color: '#00E676' },
                    { time: '17:00', action: 'Traslado Iglesia → Recepción', color: '#FF6B35' },
                    { time: '22:00', action: 'Retorno invitados — Ruta programada', color: '#6B7280' },
                  ].map((item) => (
                    <div key={item.time + item.action} className="flex items-start gap-3 p-2.5 rounded-lg bg-white/[0.02]">
                      <div className="w-12 text-xs font-mono font-bold shrink-0" style={{ color: item.color }}>{item.time}</div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-xs text-white/50">{item.action}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 rounded-xl bg-[#00E676]/5 border border-[#00E676]/10">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00E676]" />
                    <span className="text-xs text-[#00E676] font-semibold">Logística coordinada — Todo listo</span>
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
   6. HOW IT WORKS
   ═══════════════════════════════════════════════════════════════════════════════ */
function HowItWorksSection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF6B35]/10 border border-[#FF6B35]/20 mb-4">
              <Route className="w-4 h-4 text-[#FF6B35]" />
              <span className="text-sm text-[#FF6B35]">Así Funciona</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              De la idea a la{' '}
              <span className="bg-gradient-to-r from-[#FF6B35] to-[#8B5CF6] bg-clip-text text-transparent">ejecución</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              Cuéntanos qué necesitas y nosotros diseñamos la solución completa.
            </p>
          </div>
        </AnimatedSection>
        <AnimatedSection delay={100}>
          <div className="relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#8B5CF6] via-[#FF6B35] to-[#00E676] md:-translate-x-px" />
            {[
              { step: 1, icon: Phone, title: 'Cuéntanos tu Evento', desc: 'Contáctanos por cualquier canal y cuéntanos: tipo de evento, fecha, participantes, ubicaciones y requerimientos especiales.', color: '#8B5CF6' },
              { step: 2, icon: MapPin, title: 'Diseñamos la Logística', desc: 'Analizamos necesidades y diseñamos la solución: cantidad de vehículos, rutas, puntos de recogida y horarios sincronizados.', color: '#FF6B35' },
              { step: 3, icon: CircleDollarSign, title: 'Presupuesto a tu Medida', desc: 'Te presentamos opciones: vehículo rutero o privado especial. Nos adaptamos a tu presupuesto sin sacrificar calidad.', color: '#00E676' },
              { step: 4, icon: CalendarDays, title: 'Confirmación y Coordinación', desc: 'Asignamos choferes, verificamos rutas, preparamos decoración y sincronizamos horarios con la agenda del evento.', color: '#0077BD' },
              { step: 5, icon: PartyPopper, title: 'Tú Disfruta, Nosotros Movemos', desc: 'Un coordinador supervisa la operación en tiempo real. GPS en cada unidad y comunicación constante con choferes.', color: '#E91E63' },
            ].map((item, i) => (
              <div key={item.step} className={`relative flex items-start mb-8 last:mb-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full z-10" style={{ backgroundColor: item.color, boxShadow: `0 0 20px ${item.color}50` }} />
                <div className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
                  <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-white/10 transition-all duration-300">
                    <div className={`flex items-center gap-3 mb-2 ${i % 2 === 0 ? 'md:justify-end' : ''}`}>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${item.color}15` }}>
                        <item.icon className="w-4 h-4" style={{ color: item.color }} />
                      </div>
                      <span className="text-xs font-bold" style={{ color: item.color }}>PASO {item.step}</span>
                    </div>
                    <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-white/45 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   7. CTA
   ═══════════════════════════════════════════════════════════════════════════════ */
function CTASection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#8B5CF6]/8 blur-[120px]" />
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <PartyPopper className="w-12 h-12 text-[#8B5CF6] mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Tienes un evento?{' '}
            <span className="bg-gradient-to-r from-[#8B5CF6] via-[#FF6B35] to-[#E91E63] bg-clip-text text-transparent">
              Nosotros lo movemos
            </span>
          </h2>
          <p className="text-white/50 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            No importa el tamaño, la fecha ni la ocasión. Cuéntanos qué necesitas y te diseñamos la solución de transporte completa. Tú disfruta, nosotros nos encargamos de la movida.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <a href="https://id3251.tm.taxi:58443/?cid=1" target="_blank" rel="noopener noreferrer"
              className="px-8 py-4 rounded-full text-lg font-semibold text-white bg-[#8B5CF6] hover:bg-[#a78bfa] transition-all duration-300 shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:shadow-[0_0_50px_rgba(139,92,246,0.5)] hover:scale-105 flex items-center gap-2">
              Reservar para Evento
              <ArrowRight className="w-5 h-5" />
            </a>
            <a href="https://wa.me/59173662803?text=Hola%2C%20necesito%20transporte%20para%20un%20evento" target="_blank" rel="noopener noreferrer"
              className="px-8 py-4 rounded-full text-lg font-semibold text-[#25D366] border border-[#25D366]/30 bg-[#25D366]/5 hover:bg-[#25D366]/10 hover:border-[#25D366]/50 transition-all duration-300 flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              WhatsApp Eventos
            </a>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {[
              { icon: Shield, text: 'Experiencia comprobada' },
              { icon: CircleDollarSign, text: 'Adaptado a tu presupuesto' },
              { icon: Handshake, text: 'Logística incluida' },
              { icon: Bus, text: 'De 1 a 45+ pasajeros' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-white/30">
                <item.icon className="w-4 h-4 text-[#8B5CF6]/50" />
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
export default function EventosPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0e17]">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <EventTypesSection />
        <WeddingSection />
        <VehicleOptionsSection />
        <LogisticsSection />
        <HowItWorksSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
