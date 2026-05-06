'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Car, Bus, Users, Shield, CheckCircle2, ArrowRight,
  Phone, MapPin, MessageCircle, Headphones,
  User, Navigation, Eye, Clock, Heart,
  Crown, Briefcase, Mountain, Fuel, Route,
  CircleDollarSign, Compass, Flag,
  BusFront, Truck as VanIcon,
  Map, Globe2, ChevronRight,
  Landmark, Wallet, ShieldCheck, Wind
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
          backgroundImage: `linear-gradient(rgba(0,188,212,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,188,212,0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[#00BCD4]/12 blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#0077BD]/8 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[#00E676]/6 blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="absolute top-32 right-[8%] md:right-[18%] opacity-[0.07]">
        <Globe2 className="w-28 h-28 md:w-40 md:h-40 text-[#00BCD4]" />
      </div>
      <div className="absolute bottom-28 left-[5%] md:left-[12%] opacity-[0.06]">
        <Compass className="w-20 h-20 md:w-28 md:h-28 text-[#0077BD]" />
      </div>
      <div className="absolute top-1/2 right-[5%] opacity-[0.04]">
        <Flag className="w-16 h-16 text-[#00E676]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 pb-16">
        <AnimatedSection>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00BCD4]/10 border border-[#00BCD4]/20 mb-8 backdrop-blur-sm">
            <Compass className="w-4 h-4 text-[#00BCD4]" />
            <span className="text-sm text-[#00BCD4] font-medium">Servicio Inter Urbano</span>
          </div>
        </AnimatedSection>
        <AnimatedSection delay={100}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Muévete{' '}
            <span className="bg-gradient-to-r from-[#00BCD4] via-[#0077BD] to-[#00E676] bg-clip-text text-transparent">
              Sin Límites
            </span>
          </h1>
        </AnimatedSection>
        <AnimatedSection delay={200}>
          <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-10 leading-relaxed">
            Viaja de una ciudad a otra, de un departamento a otro o incluso cruza las fronteras.
            Tienes todo cubierto — no te limites. Un vehículo para cada necesidad.
            Tú viajas y disfruta, nosotros te llevamos.
          </p>
        </AnimatedSection>
        <AnimatedSection delay={300}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <a href="#destinos" className="px-8 py-4 rounded-full text-lg font-semibold text-white bg-[#00BCD4] hover:bg-[#26c6da] transition-all duration-300 shadow-[0_0_30px_rgba(0,188,212,0.3)] hover:shadow-[0_0_50px_rgba(0,188,212,0.5)] hover:scale-105">
              Ver Destinos
            </a>
            <a href="#vehiculos" className="px-8 py-4 rounded-full text-lg font-semibold text-white border border-white/20 hover:border-[#00BCD4]/50 hover:bg-white/5 transition-all duration-300">
              Elegir Vehículo
            </a>
          </div>
        </AnimatedSection>
        <AnimatedSection delay={400}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { value: '9', label: 'Departamentos', icon: Map },
              { value: '5', label: 'Países limítrofes', icon: Globe2 },
              { value: '24/7', label: 'Disponibilidad', icon: Clock },
              { value: '100%', label: 'Seguridad', icon: Shield },
            ].map((stat) => (
              <div key={stat.label} className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-[#00BCD4]/20 transition-all duration-300">
                <stat.icon className="w-5 h-5 text-[#00BCD4] mx-auto mb-2" />
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
   2. TRAVEL PURPOSES — ¿Para qué viajas?
   ═══════════════════════════════════════════════════════════════════════════════ */
const travelPurposes = [
  { icon: Briefcase, title: 'Negocios', desc: 'Viajes de negocios entre ciudades y departamentos. Llega a tus reuniones a tiempo, sin estrés y con la comodidad de un vehículo privado con chofer profesional que conoce las rutas de Bolivia.', color: '#0077BD', tag: 'CORPORATIVO' },
  { icon: Mountain, title: 'Ocio y Turismo', desc: 'Descubre los destinos más impresionantes de Bolivia. Desde Samaipata hasta Copacabana, desde Uyuni hasta Madidi. Nosotros te llevamos y tú disfrutas del paisaje sin preocuparte por la carretera.', color: '#00E676', tag: 'POPULAR' },
  { icon: Flag, title: 'Deporte y Aventura', desc: 'Transporte para equipos deportivos, excursiones extremas y competencias fuera de la ciudad. Vehículos aptos para carretera con espacio para equipamiento deportivo y grupos grandes.', color: '#FF6B35' },
  { icon: Globe2, title: 'Cruce de Fronteras', desc: 'Traslados internacionales a Perú, Chile, Argentina, Brasil y Paraguay. Conocemos los pasos fronterizos, la documentación necesaria y las rutas más seguras para que cruzar sea sencillo.', color: '#D4AF37', tag: 'INTERNACIONAL' },
  { icon: Heart, title: 'Visitas Familiares', desc: 'Reúnete con tu familia en cualquier ciudad del país. Servicio cómodo y seguro para que la distancia no sea un obstáculo. Recogida puerta a puerta con la puntualidad que nos caracteriza.', color: '#E91E63' },
  { icon: Landmark, title: 'Trámites y Gestiones', desc: 'Algunos trámites solo se hacen en la capital o en otra ciudad. No conduzcas cansado — nosotros te llevamos, te esperamos y te traemos de vuelta el mismo día si lo necesitas.', color: '#8B5CF6' },
]

function TravelPurposesSection() {
  return (
    <section id="destinos" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-[#00BCD4]/4 blur-[150px]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00BCD4]/10 border border-[#00BCD4]/20 mb-4">
              <Compass className="w-4 h-4 text-[#00BCD4]" />
              <span className="text-sm text-[#00BCD4]">¿Para qué viajas?</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Un servicio para cada{' '}
              <span className="bg-gradient-to-r from-[#00BCD4] via-[#0077BD] to-[#00E676] bg-clip-text text-transparent">
                propósito
              </span>
            </h2>
            <p className="text-white/50 max-w-3xl mx-auto text-lg">
              No importa si viajas por negocios, ocio, deporte o aventura — Ecotaxi tiene el vehículo y la ruta perfecta para ti.
              Puedes moverte de una ciudad a otra, de un departamento a otro o salir del país.
            </p>
          </div>
        </AnimatedSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {travelPurposes.map((purpose, i) => (
            <AnimatedSection key={purpose.title} delay={i * 70}>
              <div className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-white/10 transition-all duration-500 h-full">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/[0.02] transition-all duration-500" />
                {purpose.tag && (
                  <div className="absolute top-4 right-4">
                    <span className="px-2 py-1 rounded-full text-[10px] font-bold uppercase" style={{ backgroundColor: `${purpose.color}15`, color: purpose.color, borderWidth: 1, borderColor: `${purpose.color}25` }}>
                      {purpose.tag}
                    </span>
                  </div>
                )}
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: `${purpose.color}12` }}>
                    <purpose.icon className="w-6 h-6" style={{ color: purpose.color }} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{purpose.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{purpose.desc}</p>
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
   3. DESTINATIONS MAP — Bolivia y más allá
   ═══════════════════════════════════════════════════════════════════════════════ */
const destinations = [
  { region: 'Santa Cruz', cities: ['Samaipata', 'Vallegrande', 'Buena Vista', 'San Ignacio de Velasco', 'San José de Chiquitos', 'Roboré'], color: '#00E676' },
  { region: 'La Paz', cities: ['Copacabana', 'Coroico', 'Tiwanaku', 'El Alto', 'Sorata'], color: '#0077BD' },
  { region: 'Cochabamba', cities: ['Villa Tunari', 'Chapare', 'Quillacollo', 'Tarata'], color: '#FF6B35' },
  { region: 'Potosí', cities: ['Uyuni', 'Tupiza', 'Villazón'], color: '#8B5CF6' },
  { region: 'Oruro', cities: ['Caracollo', 'Challapata'], color: '#D4AF37' },
  { region: 'Tarija', cities: ['Villamontes', 'Yacuiba', 'Bermejo'], color: '#00BCD4' },
]

const borderCrossings = [
  { country: 'Perú', crossing: 'Desaguadero / Copacabana', color: '#D4AF37' },
  { country: 'Chile', crossing: 'Tambo Quemado / Pisiga', color: '#E91E63' },
  { country: 'Argentina', crossing: 'Villazón / Yacuiba', color: '#00BCD4' },
  { country: 'Brasil', crossing: 'Quijarro / Guayaramerín', color: '#00E676' },
  { country: 'Paraguay', crossing: 'Villamontes', color: '#0077BD' },
]

function DestinationsSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] rounded-full bg-[#0077BD]/4 blur-[150px]" />
      <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] rounded-full bg-[#00BCD4]/4 blur-[120px]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0077BD]/10 border border-[#0077BD]/20 mb-4">
              <Map className="w-4 h-4 text-[#0077BD]" />
              <span className="text-sm text-[#0077BD]">Destinos</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              De Bolivia para{' '}
              <span className="bg-gradient-to-r from-[#00BCD4] via-[#0077BD] to-[#00E676] bg-clip-text text-transparent">
                el Mundo
              </span>
            </h2>
            <p className="text-white/50 max-w-3xl mx-auto text-lg">
              Conectamos las principales ciudades y pueblos de Bolivia. Y si necesitas cruzar fronteras,
              también llegamos a los países vecinos con seguridad y comodidad.
            </p>
          </div>
        </AnimatedSection>

        {/* Domestic Destinations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {destinations.map((dest, i) => (
            <AnimatedSection key={dest.region} delay={i * 60}>
              <div className="group p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-white/10 transition-all duration-500 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${dest.color}12` }}>
                    <MapPin className="w-5 h-5" style={{ color: dest.color }} />
                  </div>
                  <h3 className="text-white font-semibold">{dest.region}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {dest.cities.map((city) => (
                    <span key={city} className="px-3 py-1 rounded-full text-xs text-white/50 bg-white/[0.03] border border-white/[0.06] hover:border-white/15 hover:text-white/70 transition-all duration-300 cursor-default">
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Border Crossings */}
        <AnimatedSection delay={200}>
          <div className="relative">
            <div className="absolute inset-0 rounded-3xl border border-[#00BCD4]/8 animate-glow-pulse" />
            <div className="relative p-8 rounded-2xl bg-white/[0.03] border border-[#00BCD4]/12 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#00BCD4]/10 flex items-center justify-center">
                  <Flag className="w-6 h-6 text-[#00BCD4]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Cruce de Fronteras</h3>
                  <p className="text-sm text-[#00BCD4]/70">Pasos fronterizos con los 5 países vecinos</p>
                </div>
              </div>
              <p className="text-sm text-white/45 leading-relaxed mb-6 max-w-2xl">
                Bolivia limita con cinco países y Ecotaxi conoce cada paso fronterizo. Te asesoramos sobre la documentación necesaria,
                los horarios de atención de migración y las rutas más seguras. Cruza la frontera sin complicaciones, nosotros nos encargamos del resto.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {borderCrossings.map((border) => (
                  <div key={border.country} className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center hover:border-white/10 transition-all duration-300">
                    <h4 className="text-white font-semibold text-sm mb-1" style={{ color: border.color }}>{border.country}</h4>
                    <p className="text-[10px] text-white/35">{border.crossing}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   4. VEHICLE OPTIONS
   ═══════════════════════════════════════════════════════════════════════════════ */
const interUrbanVehicles = [
  { icon: Car, name: 'Sedán', capacity: '3-4 pasajeros', desc: 'Vehículo ejecutivo para viajes individuales o parejas. Cómodo, con aire acondicionado y chofer profesional que conoce la ruta. Ideal para viajes de negocios o visitas familiares.', color: '#0077BD', type: 'Privado' },
  { icon: Crown, name: 'Sedán VIP', capacity: '3 pasajeros', desc: 'Alta gama para quienes buscan máxima comodidad en viajes largos. Mercedes, Audi con chofer bilingüe, bebida a bordo y paradas según necesidad del pasajero.', color: '#D4AF37', type: 'VIP' },
  { icon: Car, name: 'SUV', capacity: '4-5 pasajeros', desc: 'SUV amplio y potente para carreteras bolivianas. A/C, espacio para equipaje grande y la tracción necesaria para rutas con terreno irregular.', color: '#00E676', type: 'Privado' },
  { icon: VanIcon, name: 'Minivan / Van', capacity: '8-12 pasajeros', desc: 'Van ejecutiva con A/C para grupos y familias. Asientos reclinables, espacio para equipaje de todos y la comodidad de viajar juntos sin separarse.', color: '#FF6B35', type: 'Ambos' },
  { icon: BusFront, name: 'Minibus', capacity: '15-25 pasajeros', desc: 'Minibus para grupos medianos. Equipos deportivos, excursiones, convenciones fuera de la ciudad. A/C y asientos cómodos para trayectos largos.', color: '#8B5CF6', type: 'Ambos' },
  { icon: Bus, name: 'Micro / Bus', capacity: '30-45 pasajeros', desc: 'Bus de gran capacidad para viajes grupales masivos. Peregrinaciones, convenciones corporativas, excursiones de aventura con todo el grupo junto.', color: '#00BCD4', type: 'Rutero' },
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
              <span className="text-sm text-[#00E676]">Opciones de Vehículo</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Un vehículo para cada{' '}
              <span className="bg-gradient-to-r from-[#00BCD4] via-[#0077BD] to-[#00E676] bg-clip-text text-transparent">
                distancia
              </span>
            </h2>
            <p className="text-white/50 max-w-3xl mx-auto text-lg">
              Viajes cortos o largos, solo o en grupo — tenemos el vehículo perfecto para cada tipo de recorrido
              interurbano. Todos con chofer profesional que conoce las rutas de Bolivia.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-14">
            {[
              { icon: Wind, text: 'A/C en todos los vehículos', color: '#00BCD4' },
              { icon: ShieldCheck, text: 'Licencia interprovincial', color: '#00E676' },
              { icon: Navigation, text: 'GPS en tiempo real', color: '#0077BD' },
              { icon: Fuel, text: 'Combustible y peajes incluidos', color: '#FF6B35' },
            ].map((item) => (
              <div key={item.text} className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center hover:border-white/10 transition-all duration-300">
                <item.icon className="w-6 h-6 mx-auto mb-2" style={{ color: item.color }} />
                <span className="text-xs text-white/50 leading-snug">{item.text}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {interUrbanVehicles.map((vehicle, i) => (
            <AnimatedSection key={vehicle.name} delay={i * 70}>
              <div className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-white/10 transition-all duration-500 h-full">
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
   5. WHY ECOTAXI INTER URBANO
   ═══════════════════════════════════════════════════════════════════════════════ */
function WhySection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `radial-gradient(circle, rgba(0,188,212,0.3) 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection>
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 mb-6">
                <Shield className="w-4 h-4 text-[#00E676]" />
                <span className="text-sm text-[#00E676]">¿Por qué Ecotaxi?</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Tu seguridad es nuestra{' '}
                <span className="bg-gradient-to-r from-[#00E676] to-[#00BCD4] bg-clip-text text-transparent">prioridad</span>
              </h2>
              <p className="text-white/50 text-lg leading-relaxed mb-6">
                Viajar fuera de la ciudad no tiene por qué ser un riesgo. En Ecotaxi Inter Urbano, cada viaje es una experiencia
                segura y cómoda. Nuestros choferes son profesionales con licencia interprovincial, conocen las rutas de Bolivia
                como la palma de su mano y están entrenados para manejar en todo tipo de condiciones de carretera.
              </p>
              <p className="text-white/50 text-lg leading-relaxed mb-8">
                Además, cada vehículo cuenta con GPS en tiempo real, seguro de pasajeros y comunicación constante con nuestra
                central. Tú solo te preocupas de disfrutar el paisaje — de todo lo demás nos encargamos nosotros.
              </p>
              <div className="space-y-3">
                {[
                  { icon: ShieldCheck, text: 'Seguro de pasajeros en todos los vehículos', color: '#00E676' },
                  { icon: Navigation, text: 'GPS y seguimiento en tiempo real', color: '#0077BD' },
                  { icon: Clock, text: 'Monitoreo de viaje 24/7 desde central', color: '#00BCD4' },
                  { icon: User, text: 'Choferes con licencia interprovincial', color: '#FF6B35' },
                  { icon: Phone, text: 'Comunicación directa con el chofer durante el viaje', color: '#8B5CF6' },
                  { icon: Fuel, text: 'Combustible, peajes y tarifas incluidas en el precio', color: '#D4AF37' },
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
              <div className="absolute -inset-4 rounded-3xl border border-[#00BCD4]/8 animate-glow-pulse" />
              <div className="relative p-8 rounded-2xl bg-white/[0.04] border border-[#00BCD4]/12 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#00BCD4] animate-pulse" />
                    <span className="text-sm text-white/60">Viaje en Curso</span>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-[#00BCD4]/5 border border-[#00BCD4]/10 mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Navigation className="w-4 h-4 text-[#00BCD4]" />
                    <span className="text-sm font-semibold text-white">Santa Cruz → Samaipata</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center p-2 rounded-lg bg-white/[0.03]">
                      <div className="text-lg font-bold text-[#00BCD4]">124</div>
                      <div className="text-[10px] text-white/30">km</div>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-white/[0.03]">
                      <div className="text-lg font-bold text-[#00E676]">2:30</div>
                      <div className="text-[10px] text-white/30">hrs est.</div>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-white/[0.03]">
                      <div className="text-lg font-bold text-[#0077BD]">SUV</div>
                      <div className="text-[10px] text-white/30">vehículo</div>
                    </div>
                  </div>
                </div>
                <div className="mb-6">
                  <div className="flex items-center justify-between text-xs text-white/30 mb-2">
                    <span>Santa Cruz</span>
                    <span>Samaipata</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/[0.05] overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-[#00BCD4] to-[#00E676] w-[65%] shadow-[0_0_10px_rgba(0,230,118,0.3)]" />
                  </div>
                  <div className="flex items-center justify-between text-xs mt-1">
                    <span className="text-[#00BCD4]">65% completado</span>
                    <span className="text-white/30">~52 min restantes</span>
                  </div>
                </div>
                <div className="space-y-2.5">
                  {[
                    { label: 'Velocidad', value: '78 km/h', color: '#00E676' },
                    { label: 'Chofer', value: 'Carlos M.', color: '#0077BD' },
                    { label: 'Vehículo', value: 'Toyota SUV · ABC-123', color: '#8B5CF6' },
                    { label: 'Seguro', value: 'Activo · Poliza #4521', color: '#00BCD4' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02]">
                      <span className="text-xs text-white/30">{item.label}</span>
                      <span className="text-xs font-semibold" style={{ color: item.color }}>{item.value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 rounded-xl bg-[#00E676]/5 border border-[#00E676]/10">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00E676]" />
                    <span className="text-xs text-[#00E676] font-semibold">Monitoreo activo — Viaje seguro</span>
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
              De tu puerta a{' '}
              <span className="bg-gradient-to-r from-[#00BCD4] to-[#00E676] bg-clip-text text-transparent">cualquier destino</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              Reservar tu viaje interurbano es tan fácil como pedir un taxi en la ciudad.
            </p>
          </div>
        </AnimatedSection>
        <AnimatedSection delay={100}>
          <div className="relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#00BCD4] via-[#0077BD] to-[#00E676] md:-translate-x-px" />
            {[
              { step: 1, icon: Phone, title: 'Cuéntanos tu Destino', desc: 'Contáctanos por WhatsApp, teléfono, app o web. Dinos de dónde sales, a dónde vas, cuántos viajan y cuándo. Nosotros calculamos la ruta, el tiempo y el precio.', color: '#00BCD4' },
              { step: 2, icon: MapPin, title: 'Elige tu Vehículo', desc: 'Te presentamos opciones: sedán, SUV, van o bus según la cantidad de pasajeros y equipaje. También eliges entre vehículo rutero o privado especial con A/C.', color: '#0077BD' },
              { step: 3, icon: CircleDollarSign, title: 'Precio Cerrado y Transparente', desc: 'Sin sorpresas. El precio incluye combustible, peajes, seguro y chofer. Sabes exactamente cuánto vas a pagar antes de subirte al vehículo.', color: '#00E676' },
              { step: 4, icon: Shield, title: 'Recogida y Viaje Seguro', desc: 'Te recogemos en tu puerta. GPS activo, seguimiento en tiempo real y comunicación con la central durante todo el trayecto. Tu familia puede seguir tu ubicación.', color: '#FF6B35' },
              { step: 5, icon: CheckCircle2, title: 'Llegada y Confirmación', desc: 'Llegas a tu destino seguro y cómodo. Recibes la confirmación de llegada y la factura digital del servicio. Viaje completado con éxito.', color: '#8B5CF6' },
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
   7. PRICING TRANSPARENCY
   ═══════════════════════════════════════════════════════════════════════════════ */
const pricingExamples = [
  { route: 'Santa Cruz → Samaipata', distance: '124 km', time: '~2:30h', vehicle: 'SUV', color: '#00E676' },
  { route: 'Santa Cruz → Cochabamba', distance: '456 km', time: '~6:00h', vehicle: 'Sedán / SUV', color: '#0077BD' },
  { route: 'Santa Cruz → La Paz', distance: '854 km', time: '~12:00h', vehicle: 'SUV / Van', color: '#8B5CF6' },
  { route: 'Santa Cruz → Sucre', distance: '532 km', time: '~7:00h', vehicle: 'Sedán / SUV', color: '#FF6B35' },
  { route: 'Santa Cruz → Uyuni', distance: '673 km', time: '~9:00h', vehicle: 'SUV 4x4', color: '#00BCD4' },
  { route: 'Santa Cruz → Copacabana', distance: '930 km', time: '~13:00h', vehicle: 'SUV / Van', color: '#D4AF37' },
]

function PricingSection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[#0077BD]/4 blur-[150px]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0077BD]/10 border border-[#0077BD]/20 mb-4">
              <CircleDollarSign className="w-4 h-4 text-[#0077BD]" />
              <span className="text-sm text-[#0077BD]">Precios Transparentes</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Precio cerrado,{' '}
              <span className="bg-gradient-to-r from-[#0077BD] to-[#00BCD4] bg-clip-text text-transparent">
                sin sorpresas
              </span>
            </h2>
            <p className="text-white/50 max-w-3xl mx-auto text-lg">
              El precio que ves es el que pagas. Combustible, peajes, seguro y chofer incluidos.
              Sin cargos ocultos, sin sorpresas al llegar. Consulta tu ruta y te damos el precio exacto.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto mb-12">
          {pricingExamples.map((item, i) => (
            <AnimatedSection key={item.route} delay={i * 60}>
              <div className="group p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-white/10 transition-all duration-500">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <h3 className="text-white font-semibold text-sm">{item.route}</h3>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2 rounded-lg bg-white/[0.02] text-center">
                    <div className="text-xs font-bold text-white/60">{item.distance}</div>
                    <div className="text-[9px] text-white/25">Distancia</div>
                  </div>
                  <div className="p-2 rounded-lg bg-white/[0.02] text-center">
                    <div className="text-xs font-bold text-white/60">{item.time}</div>
                    <div className="text-[9px] text-white/25">Duración</div>
                  </div>
                  <div className="p-2 rounded-lg bg-white/[0.02] text-center">
                    <div className="text-xs font-bold" style={{ color: item.color }}>{item.vehicle}</div>
                    <div className="text-[9px] text-white/25">Vehículo</div>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-white/[0.04]">
                  <a href="https://wa.me/59173662803?text=Hola%2C%20necesito%20un%20viaje%20interurbano" target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 text-xs font-semibold py-2 rounded-lg transition-all duration-300 hover:bg-white/5" style={{ color: item.color }}>
                    Consultar precio
                    <ChevronRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={200}>
          <div className="max-w-4xl mx-auto p-6 rounded-2xl bg-white/[0.03] border border-[#00BCD4]/12">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#00BCD4]/10 flex items-center justify-center shrink-0">
                <Wallet className="w-6 h-6 text-[#00BCD4]" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold mb-1">¿Qué incluye el precio?</h3>
                <p className="text-sm text-white/45 leading-relaxed">
                  Combustible, peajes, seguro de pasajeros, chofer profesional, GPS en tiempo real, monitoreo desde central
                  y asistencia en carretera. Todo incluido — tú solo pagas el precio acordado, sin extras ni sorpresas.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   8. CTA
   ═══════════════════════════════════════════════════════════════════════════════ */
function CTASection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#00BCD4]/8 blur-[120px]" />
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <Globe2 className="w-12 h-12 text-[#00BCD4] mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Hacia dónde te llevamos?{' '}
            <span className="bg-gradient-to-r from-[#00BCD4] via-[#0077BD] to-[#00E676] bg-clip-text text-transparent">
              Sin límites
            </span>
          </h2>
          <p className="text-white/50 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            No te limites — puedes moverte de una ciudad a otra, de un departamento a otro o incluso salir del país.
            Tú viajas y disfruta, nosotros te llevamos.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <a href="https://id3251.tm.taxi:58443/?cid=1" target="_blank" rel="noopener noreferrer"
              className="px-8 py-4 rounded-full text-lg font-semibold text-white bg-[#00BCD4] hover:bg-[#26c6da] transition-all duration-300 shadow-[0_0_30px_rgba(0,188,212,0.3)] hover:shadow-[0_0_50px_rgba(0,188,212,0.5)] hover:scale-105 flex items-center gap-2">
              Reservar Viaje
              <ArrowRight className="w-5 h-5" />
            </a>
            <a href="https://wa.me/59173662803?text=Hola%2C%20necesito%20un%20viaje%20interurbano" target="_blank" rel="noopener noreferrer"
              className="px-8 py-4 rounded-full text-lg font-semibold text-[#25D366] border border-[#25D366]/30 bg-[#25D366]/5 hover:bg-[#25D366]/10 hover:border-[#25D366]/50 transition-all duration-300 flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              WhatsApp Inter Urbano
            </a>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {[
              { icon: Shield, text: 'Seguro incluido' },
              { icon: CircleDollarSign, text: 'Precio cerrado' },
              { icon: Navigation, text: 'GPS en tiempo real' },
              { icon: Globe2, text: 'Hasta fronteras' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-white/30">
                <item.icon className="w-4 h-4 text-[#00BCD4]/50" />
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
export default function InterUrbanosPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0e17]">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <TravelPurposesSection />
        <DestinationsSection />
        <VehicleOptionsSection />
        <WhySection />
        <HowItWorksSection />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
