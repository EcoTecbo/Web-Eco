'use client'

import { useEffect, useRef, useState } from 'react'
import Script from 'next/script'
import {
  Plane, Shield, MapPin, Clock, Users, CreditCard,
  Phone, ArrowRight, Star, CheckCircle2,
  Eye, Wifi, Droplets, BadgeCheck,
  Building2, Globe, Heart, UserCheck, Navigation,
  Calendar, User, ChevronRight, Luggage
} from 'lucide-react'
import { Navbar } from '@/components/ecotaxi/navbar'
import { Footer } from '@/components/ecotaxi/footer'

/* ─── Airport Data ─── */
const airports = [
  {
    id: 'viruviru',
    department: 'santacruz',
    name: 'Aeropuerto Internacional Viru Viru',
    iata: 'VVI',
    city: 'Santa Cruz de la Sierra',
    desc: 'El aeropuerto más grande de Bolivia. Principal puerta de entrada al oriente boliviano con vuelos internacionales directos.',
    color: '#00E676',
    bgImage: '/viru-viru-bg.png',
    mapPosition: { x: 72, y: 52 },
  },
  {
    id: 'elalto',
    department: 'lapaz',
    name: 'Aeropuerto Internacional El Alto',
    iata: 'LPB',
    city: 'La Paz',
    desc: 'Aeropuerto internacional más alto del mundo a 4,061 msnm. Hub internacional de Bolivia con vuelos a todo el continente.',
    color: '#0077BD',
    bgImage: '/el-alto-bg.png',
    mapPosition: { x: 38, y: 35 },
  },
  {
    id: 'wilstermann',
    department: 'cochabamba',
    name: 'Aeropuerto Internacional Jorge Wilstermann',
    iata: 'CBB',
    city: 'Cochabamba',
    desc: 'Hub nacional de conexiones. Ubicado en el corazón de Bolivia, conecta con todas las ciudades principales del país.',
    color: '#FF9800',
    bgImage: '/taxi-aeropuerto-bg.jpg',
    mapPosition: { x: 48, y: 48 },
  },
  {
    id: 'tarija',
    department: 'tarija',
    name: 'Aeropuerto Cap. Oriel Lea Plaza',
    iata: 'TJA',
    city: 'Tarija',
    desc: 'Puerta de entrada al sur de Bolivia y la región vinícola. Vuelos nacionales regulares.',
    color: '#8B5CF6',
    mapPosition: { x: 52, y: 78 },
  },
  {
    id: 'sucre',
    department: 'sucre',
    name: 'Aeropuerto Alcantarí',
    iata: 'SRE',
    city: 'Sucre',
    desc: 'Aeropuerto de la capital constitucional de Bolivia. Conexiones con las principales ciudades.',
    color: '#E91E63',
    mapPosition: { x: 52, y: 62 },
  },
  {
    id: 'oruro',
    department: 'oruro',
    name: 'Aeropuerto Juan Mendoza',
    iata: 'ORU',
    city: 'Oruro',
    desc: 'Aeropuerto de la capital folklórica de Bolivia. Servicio de vuelos nacionales.',
    color: '#00BCD4',
    mapPosition: { x: 35, y: 48 },
  },
  {
    id: 'potosi',
    department: 'potosi',
    name: 'Aeropuerto Cap. Nicolás Rojas',
    iata: 'POI',
    city: 'Potosí',
    desc: 'Puerta de entrada a Potosí y el Salar de Uyuni. Vuelos nacionales.',
    color: '#9C27B0',
    mapPosition: { x: 42, y: 62 },
  },
  {
    id: 'trinidad',
    department: 'beni',
    name: 'Aeropuerto Tte. Jorge Henrich Arauz',
    iata: 'TDD',
    city: 'Trinidad, Beni',
    desc: 'Aeropuerto de Trinidad, puerta de entrada a la Amazonía boliviana.',
    color: '#4CAF50',
    mapPosition: { x: 58, y: 35 },
  },
  {
    id: 'cobija',
    department: 'pando',
    name: 'Aeropuerto Cap. Aníbal Arab',
    iata: 'CIJ',
    city: 'Cobija, Pando',
    desc: 'Aeropuerto de Cobija, en la región amazónica norte de Bolivia.',
    color: '#FF5722',
    mapPosition: { x: 40, y: 18 },
  },
]

const securityFeatures = [
  { icon: BadgeCheck, title: 'Conductor Identificado', desc: 'Todos nuestros conductores portan identificación visible y uniforme corporativo.' },
  { icon: UserCheck, title: 'Cartel de Bienvenida', desc: 'Su nombre en un cartel personalizado para una recogida sin complicaciones.' },
  { icon: Navigation, title: 'Seguimiento de Vuelo', desc: 'Monitoreamos su vuelo en tiempo real para ajustar la hora de recogida.' },
  { icon: Clock, title: 'Disponibilidad 24/7', desc: 'Servicio de recogida en aeropuerto las 24 horas, los 7 días de la semana.' },
  { icon: Eye, title: 'Vehículos Monitoreados', desc: 'GPS en todas las unidades para rastreo y seguridad en tiempo real.' },
  { icon: Shield, title: 'Protocolos de Emergencia', desc: 'Procedimientos de seguridad y atención en caso de cualquier eventualidad.' },
]

const scheduledIncludes = [
  { icon: UserCheck, title: 'Cartel de Bienvenida', desc: 'Con su nombre impreso para identificación inmediata.' },
  { icon: Navigation, title: 'Seguimiento de Vuelo', desc: 'Monitoreo en tiempo real para ajustar horarios.' },
  { icon: Clock, title: 'Espera sin Cargo', desc: 'Sin costo adicional por retrasos de vuelo.' },
  { icon: Luggage, title: 'Asistencia con Equipaje', desc: 'Conductor le ayuda con sus maletas.' },
  { icon: Droplets, title: 'Agua y WiFi', desc: 'Agua cortesía y WiFi en el vehículo.' },
]

export default function AeropuertoPage() {
  const [selectedAirport, setSelectedAirport] = useState<string>('viruviru')
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [clientType, setClientType] = useState<'local' | 'extranjero' | null>(null)
  const [hoveredAirport, setHoveredAirport] = useState<string | null>(null)
  const mapRef = useRef<HTMLDivElement>(null)
  const airportSectionRefs = useRef<Record<string, HTMLDivElement | null>>({})

  const selected = airports.find(a => a.id === selectedAirport)

  const scrollToAirportSection = (airportId: string) => {
    setSelectedAirport(airportId)
    const section = airportSectionRefs.current[airportId]
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0e17]">
      <Navbar />
      <main className="flex-1">

        {/* ═══ HERO WITH COVER IMAGE ═══ */}
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-20">
          {/* Cover image */}
          <div className="absolute inset-0 z-0">
            <img
              src="/airport-cocha.png"
              alt="Taxi aeropuerto Bolivia - Ecotaxi"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17]/70 via-[#0a0e17]/60 to-[#0a0e17]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0e17]/50 to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 mb-8 backdrop-blur-sm">
              <Plane className="w-4 h-4 text-[#00E676]" />
              <span className="text-sm text-[#00E676]">Traslado Aeropuerto</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Recogida en{' '}
              <span className="bg-gradient-to-r from-[#00E676] via-[#0077BD] to-[#00E676] bg-clip-text text-transparent">
                Aeropuerto
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-8">
              Seguridad garantizada en cada recogida. Los mejores hoteles, agencias de viajes y extranjeros confían en nuestro servicio de traslado en los principales aeropuertos de Bolivia.
            </p>
            <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#0077BD]/10 border border-[#0077BD]/20 mb-8 backdrop-blur-sm">
              <Shield className="w-5 h-5 text-[#0077BD]" />
              <span className="text-sm font-medium text-[#0077BD]">Seguridad Garantizada en Cada Recogida</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#reservation" className="px-8 py-4 rounded-full text-lg font-semibold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all duration-300 shadow-[0_0_30px_rgba(0,230,118,0.3)] hover:shadow-[0_0_50px_rgba(0,230,118,0.5)] hover:scale-105">
                Reservar Traslado
              </a>
              <a href="#airports" className="px-8 py-4 rounded-full text-lg font-semibold text-white border border-white/20 hover:border-[#00E676]/50 hover:bg-white/5 transition-all duration-300">
                Ver Aeropuertos
              </a>
            </div>
          </div>
        </section>

        {/* ═══ SECURITY FEATURES ═══ */}
        <section className="relative py-24 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0077BD]/10 border border-[#0077BD]/20 mb-4">
                <Shield className="w-4 h-4 text-[#0077BD]" />
                <span className="text-sm text-[#0077BD]">Seguridad Total</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Seguridad en la{' '}
                <span className="bg-gradient-to-r from-[#0077BD] to-[#00E676] bg-clip-text text-transparent">
                  Recogida
                </span>
              </h2>
              <p className="text-white/50 max-w-2xl mx-auto">
                Tu seguridad es nuestra prioridad. Cada recogida en aeropuerto cuenta con protocolos estrictos de seguridad y atención profesional.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {securityFeatures.map((feature) => (
                <div key={feature.title} className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-[#0077BD]/20 transition-all duration-500">
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ boxShadow: '0 0 30px rgba(0,119,189,0.1)' }}
                  />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-[#0077BD]/10 flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-[#0077BD]" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-sm text-white/50 leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ BOLIVIA MAP SECTION ═══ */}
        <section id="airports" className="relative py-24 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0f1628] to-[#0a0e17]" />
          <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-[#0077BD]/10 blur-[100px]" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 mb-4">
                <MapPin className="w-4 h-4 text-[#00E676]" />
                <span className="text-sm text-[#00E676]">Cobertura Nacional</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Aeropuertos de{' '}
                <span className="bg-gradient-to-r from-[#00E676] to-[#0077BD] bg-clip-text text-transparent">
                  Bolivia
                </span>
              </h2>
              <p className="text-white/50 max-w-2xl mx-auto">
                Haz click en cada ciudad del mapa para ver la información del aeropuerto y navegar a su sección.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
              {/* Real Bolivia Map */}
              <div className="lg:col-span-3">
                <div ref={mapRef} className="relative p-4 md:p-6 rounded-3xl bg-white/[0.03] border border-white/[0.06]">
                  <div className="relative">
                    <img
                      src="/bolivia-map.png"
                      alt="Mapa de aeropuertos de Bolivia"
                      className="w-full h-auto rounded-xl"
                    />
                    {/* Clickable city dots overlay */}
                    <div className="absolute inset-0">
                      {airports.map((airport) => {
                        const isSelected = selectedAirport === airport.id
                        const isHovered = hoveredAirport === airport.id
                        return (
                          <button
                            key={airport.id}
                            onClick={() => scrollToAirportSection(airport.id)}
                            onMouseEnter={() => setHoveredAirport(airport.id)}
                            onMouseLeave={() => setHoveredAirport(null)}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-10"
                            style={{ left: `${airport.mapPosition.x}%`, top: `${airport.mapPosition.y}%` }}
                          >
                            {/* Pulse ring */}
                            <span className={`absolute inset-0 rounded-full animate-ping opacity-30 ${isSelected ? 'bg-[#00E676]' : 'bg-[#0077BD]'}`}
                              style={{ width: isSelected ? '40px' : '30px', height: isSelected ? '40px' : '30px', left: isSelected ? '-8px' : '-3px', top: isSelected ? '-8px' : '-3px' }} />
                            {/* Dot */}
                            <span className={`relative block rounded-full transition-all duration-300 ${
                              isSelected ? 'w-6 h-6 ring-4 ring-[#00E676]/30' : 'w-4 h-4 hover:w-5 hover:h-5'
                            }`}
                            style={{ backgroundColor: isSelected ? '#00E676' : airport.color }} />

                            {/* Tooltip */}
                            <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 rounded-lg bg-[#0a0e17]/95 border backdrop-blur-sm whitespace-nowrap transition-all duration-300 pointer-events-none ${
                              isSelected || isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                            }`}
                            style={{ borderColor: `${airport.color}40` }}>
                              <p className="text-xs font-bold text-white">{airport.iata}</p>
                              <p className="text-[10px] text-white/50">{airport.city}</p>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Selected Airport Info Panel */}
              <div className="lg:col-span-2">
                {selected && (
                  <div className="p-6 md:p-8 rounded-3xl bg-white/[0.03] border backdrop-blur-sm transition-all duration-500"
                    style={{ borderColor: `${selected.color}30` }}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${selected.color}15` }}>
                        <Plane className="w-6 h-6" style={{ color: selected.color }} />
                      </div>
                      <div>
                        <span className="text-2xl font-bold" style={{ color: selected.color }}>{selected.iata}</span>
                        <p className="text-xs text-white/40">{selected.city}</p>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">{selected.name}</h3>
                    <p className="text-sm text-white/50 leading-relaxed mb-6">{selected.desc}</p>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2 text-sm text-white/40">
                        <MapPin className="w-4 h-4" />
                        <span>Traslado disponible desde/hacia este aeropuerto</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-white/40">
                        <Clock className="w-4 h-4" />
                        <span>Servicio 24/7 - Reserve con anticipación</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-white/40">
                        <Navigation className="w-4 h-4" />
                        <span>Seguimiento de vuelo incluido</span>
                      </div>
                    </div>
                    <a
                      href="#reservation"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-black transition-all duration-300 shadow-[0_0_15px_rgba(0,230,118,0.2)] hover:shadow-[0_0_25px_rgba(0,230,118,0.4)]"
                      style={{ backgroundColor: selected.color }}
                    >
                      Cotizar Traslado
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                )}

                {/* Quick airport list */}
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {airports.map((apt) => (
                    <button
                      key={apt.id}
                      onClick={() => scrollToAirportSection(apt.id)}
                      onMouseEnter={() => setHoveredAirport(apt.id)}
                      onMouseLeave={() => setHoveredAirport(null)}
                      className={`p-2 rounded-lg text-center transition-all duration-300 text-xs ${
                        selectedAirport === apt.id
                          ? 'bg-white/[0.08] text-white font-semibold'
                          : 'bg-white/[0.02] text-white/40 hover:bg-white/[0.05] hover:text-white/60'
                      }`}
                    >
                      <span className="block font-bold" style={{ color: selectedAirport === apt.id ? apt.color : undefined }}>{apt.iata}</span>
                      <span className="block text-[10px] mt-0.5">{apt.city.split(',')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 3 MAIN AIRPORT CARDS WITH BG IMAGES ═══ */}
        <section className="relative py-24 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1830] to-[#0a0e17]" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 mb-4">
                <Plane className="w-4 h-4 text-[#00E676]" />
                <span className="text-sm text-[#00E676]">Principales Aeropuertos</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Transfer en los{' '}
                <span className="bg-gradient-to-r from-[#0077BD] to-[#00E676] bg-clip-text text-transparent">
                  Tres Aeropuertos Principales
                </span>
              </h2>
              <p className="text-white/50 max-w-2xl mx-auto">
                Servicio de traslado premium en los aeropuertos internacionales con mayor tráfico de Bolivia.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Viru Viru Card */}
              <div
                ref={(el) => { airportSectionRefs.current['viruviru'] = el }}
                className="group relative rounded-3xl overflow-hidden border border-white/[0.06] hover:border-[#00E676]/30 transition-all duration-500 min-h-[400px]"
              >
                <div className="absolute inset-0">
                  <img src="/viru-viru-bg.png" alt="Aeropuerto Viru Viru" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e17] via-[#0a0e17]/80 to-[#0a0e17]/40" />
                </div>
                <div className="relative z-10 p-8 flex flex-col justify-end h-full">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded-md bg-[#00E676]/20 text-[#00E676] text-xs font-bold">VVI</span>
                    <span className="text-xs text-white/40">Santa Cruz</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Aeropuerto Internacional Viru Viru</h3>
                  <p className="text-sm text-white/50 leading-relaxed mb-4">El aeropuerto más grande de Bolivia. Principal puerta de entrada al oriente boliviano con vuelos internacionales directos desde Miami, Madrid, São Paulo y más.</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {['Seguimiento de Vuelo', 'Cartel de Bienvenida', 'Espera sin Cargo'].map((feat) => (
                      <span key={feat} className="px-2 py-1 rounded-md bg-[#00E676]/10 text-[#00E676] text-[10px]">{feat}</span>
                    ))}
                  </div>
                  <a href="#reservation" className="inline-flex items-center gap-2 text-sm font-semibold text-[#00E676] hover:text-[#00ff88] transition-colors">
                    Reservar Transfer <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* El Alto Card */}
              <div
                ref={(el) => { airportSectionRefs.current['elalto'] = el }}
                className="group relative rounded-3xl overflow-hidden border border-white/[0.06] hover:border-[#0077BD]/30 transition-all duration-500 min-h-[400px]"
              >
                <div className="absolute inset-0">
                  <img src="/el-alto-bg.png" alt="Aeropuerto El Alto" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e17] via-[#0a0e17]/80 to-[#0a0e17]/40" />
                </div>
                <div className="relative z-10 p-8 flex flex-col justify-end h-full">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded-md bg-[#0077BD]/20 text-[#0077BD] text-xs font-bold">LPB</span>
                    <span className="text-xs text-white/40">La Paz</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Aeropuerto Internacional El Alto</h3>
                  <p className="text-sm text-white/50 leading-relaxed mb-4">Aeropuerto internacional más alto del mundo a 4,061 msnm. Hub internacional con vuelos directos a Lima, Bogotá, Buenos Aires y ciudades principales.</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {['Seguimiento de Vuelo', 'Cartel de Bienvenida', 'Oxígeno Disponible'].map((feat) => (
                      <span key={feat} className="px-2 py-1 rounded-md bg-[#0077BD]/10 text-[#0077BD] text-[10px]">{feat}</span>
                    ))}
                  </div>
                  <a href="#reservation" className="inline-flex items-center gap-2 text-sm font-semibold text-[#0077BD] hover:text-[#3399dd] transition-colors">
                    Reservar Transfer <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Jorge Wilstermann Card */}
              <div
                ref={(el) => { airportSectionRefs.current['wilstermann'] = el }}
                className="group relative rounded-3xl overflow-hidden border border-white/[0.06] hover:border-[#FF9800]/30 transition-all duration-500 min-h-[400px]"
              >
                <div className="absolute inset-0">
                  <img src="/taxi-aeropuerto-bg.jpg" alt="Aeropuerto Jorge Wilstermann" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e17] via-[#0a0e17]/80 to-[#0a0e17]/40" />
                </div>
                <div className="relative z-10 p-8 flex flex-col justify-end h-full">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded-md bg-[#FF9800]/20 text-[#FF9800] text-xs font-bold">CBB</span>
                    <span className="text-xs text-white/40">Cochabamba</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Aeropuerto Int. Jorge Wilstermann</h3>
                  <p className="text-sm text-white/50 leading-relaxed mb-4">Hub nacional de conexiones en el corazón de Bolivia. Conecta con todas las ciudades principales del país y destinos internacionales.</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {['Seguimiento de Vuelo', 'Cartel de Bienvenida', 'WiFi Gratuito'].map((feat) => (
                      <span key={feat} className="px-2 py-1 rounded-md bg-[#FF9800]/10 text-[#FF9800] text-[10px]">{feat}</span>
                    ))}
                  </div>
                  <a href="#reservation" className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF9800] hover:text-[#ffad33] transition-colors">
                    Reservar Transfer <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ FLIGHT TRACKING ═══ */}
        <section className="relative py-24 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#071a10] to-[#0a0e17]" />
          <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] rounded-full bg-[#00E676]/5 blur-[100px]" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 mb-6">
                  <Navigation className="w-4 h-4 text-[#00E676]" />
                  <span className="text-sm text-[#00E676]">Seguimiento en Tiempo Real</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Monitoreo de{' '}
                  <span className="bg-gradient-to-r from-[#00E676] to-[#0077BD] bg-clip-text text-transparent">
                    Vuelo
                  </span>
                </h2>
                <p className="text-white/60 leading-relaxed mb-6">
                  Con nuestro sistema de seguimiento de vuelos en tiempo real, tu conductor estará siempre informado sobre el estado de tu vuelo. Si tu vuelo se retrasa, nosotros ajustamos automáticamente la hora de recogida sin costo adicional.
                </p>
                <div className="space-y-4">
                  {[
                    { icon: Eye, text: 'Monitoreo de vuelo en tiempo real' },
                    { icon: Clock, text: 'Ajuste automático de hora de recogida' },
                    { icon: CheckCircle2, text: 'Sin cargo adicional por retrasos de vuelo' },
                    { icon: Heart, text: 'Tranquilidad total garantizada' },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-[#00E676] shrink-0" />
                      <span className="text-white/60 text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="relative p-8 rounded-3xl bg-white/[0.03] border border-[#00E676]/10">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#00E676]/5 to-[#0077BD]/5 blur-[20px]" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-3 h-3 rounded-full bg-[#00E676] animate-pulse" />
                      <span className="text-sm text-[#00E676] font-medium">Vuelo en Monitoreo</span>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-white/40 text-sm">Vuelo</span>
                        <span className="text-white font-semibold">OB 123</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/40 text-sm">Origen</span>
                        <span className="text-white font-semibold">MIA - Miami</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/40 text-sm">Destino</span>
                        <span className="text-white font-semibold">VVI - Santa Cruz</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/40 text-sm">Estado</span>
                        <span className="text-[#00E676] font-semibold">En vuelo - A tiempo</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/40 text-sm">Llegada estimada</span>
                        <span className="text-white font-semibold">14:30 local</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/40 text-sm">Conductor asignado</span>
                        <span className="text-[#0077BD] font-semibold">Carlos M. - En camino</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ TRUST SECTION ═══ */}
        <section className="relative py-24 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0f1628] to-[#0a0e17]" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF9800]/10 border border-[#FF9800]/20 mb-4">
                <Star className="w-4 h-4 text-[#FF9800]" />
                <span className="text-sm text-[#FF9800]">Confianza Internacional</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Quienes{' '}
                <span className="bg-gradient-to-r from-[#FF9800] to-[#00E676] bg-clip-text text-transparent">
                  Confían
                </span>
              </h2>
              <p className="text-white/50 max-w-2xl mx-auto">
                Las mejores hoteles, agencias de viajes y extranjeros confían en nuestro servicio de recogida en los principales aeropuertos de Bolivia.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {[
                { icon: Building2, title: 'Hoteles 5 Estrellas', desc: 'Reconocimiento de la industria hotelera por nuestro servicio puntual y profesional.', color: '#FF9800' },
                { icon: Globe, title: 'Agencias de Viaje', desc: 'Agencias internacionales confían en Ecotaxi para sus clientes en Bolivia.', color: '#0077BD' },
                { icon: Briefcase2Icon, title: 'Travel Managers', desc: 'Gerentes de viajes corporativos que gestionan traslados para ejecutivos.', color: '#8B5CF6' },
                { icon: User, title: 'Turistas Extranjeros', desc: 'Miles de viajeros internacionales nos eligen cada año por seguridad y confianza.', color: '#00E676' },
              ].map((item) => (
                <div key={item.title} className="group p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center hover:border-white/10 transition-all duration-500">
                  <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: `${item.color}15` }}>
                    <item.icon className="w-7 h-7" style={{ color: item.color }} />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                  <p className="text-xs text-white/40 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
              {[
                { value: '50,000+', label: 'Traslados aeropuerto', color: '#0077BD' },
                { value: '98%', label: 'Satisfacción', color: '#00E676' },
                { value: '200+', label: 'Empresas confían', color: '#FF9800' },
              ].map((stat) => (
                <div key={stat.label} className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center">
                  <div className="text-3xl md:text-4xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
                  <p className="text-xs text-white/40 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ SCHEDULED RESERVATIONS ═══ */}
        <section className="relative py-24 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#071a10] to-[#0a0e17]" />
          <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-[#00E676]/5 blur-[120px]" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 mb-4">
                <Calendar className="w-4 h-4 text-[#00E676]" />
                <span className="text-sm text-[#00E676]">Reservas Programadas</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Todo{' '}
                <span className="bg-gradient-to-r from-[#00E676] to-[#0077BD] bg-clip-text text-transparent">
                  Incluido
                </span>
              </h2>
              <p className="text-white/50 max-w-2xl mx-auto">
                Cada reserva programada de aeropuerto incluye estos servicios sin costo adicional.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {scheduledIncludes.map((item) => (
                <div key={item.title} className="group relative p-6 rounded-2xl bg-white/[0.03] border border-[#00E676]/10 text-center hover:border-[#00E676]/20 transition-all duration-500">
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ boxShadow: '0 0 30px rgba(0,230,118,0.1)' }}
                  />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center bg-[#00E676]/10">
                      <item.icon className="w-6 h-6 text-[#00E676]" />
                    </div>
                    <h3 className="text-white font-semibold text-sm mb-2">{item.title}</h3>
                    <p className="text-xs text-white/40 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ RESERVATION FORM SECTION ═══ */}
        <section id="reservation" className="relative py-24 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#0077BD]/10 blur-[150px]" />
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0077BD]/10 border border-[#0077BD]/20 mb-4">
                <Calendar className="w-4 h-4 text-[#0077BD]" />
                <span className="text-sm text-[#0077BD]">Reserva tu Traslado</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Reservar{' '}
                <span className="bg-gradient-to-r from-[#0077BD] to-[#00E676] bg-clip-text text-transparent">
                  Traslado Aeropuerto
                </span>
              </h2>
              <p className="text-white/50 max-w-2xl mx-auto">
                Seleccione su tipo de reserva según su ubicación. Clientes locales de Bolivia pueden reservar directamente, y extranjeros pueden pagar con tarjeta de crédito.
              </p>
            </div>

            {/* Client Type Selection */}
            {clientType === null && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                {/* Local Bolivia Client */}
                <button
                  onClick={() => setClientType('local')}
                  className="group p-8 rounded-3xl bg-white/[0.03] border border-white/[0.06] hover:border-[#00E676]/30 text-left transition-all duration-500 hover:bg-white/[0.05]"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#00E676]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Phone className="w-7 h-7 text-[#00E676]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Cliente en Bolivia</h3>
                  <p className="text-sm text-white/50 leading-relaxed mb-4">
                    Si te encuentras en Bolivia, reserva directamente a través de nuestro formulario vinculado al sistema de despacho. Pago en efectivo o transferencia.
                  </p>
                  <div className="flex items-center gap-2 text-[#00E676] text-sm font-medium">
                    <span>Reservar ahora</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>

                {/* Foreign Client */}
                <button
                  onClick={() => setClientType('extranjero')}
                  className="group p-8 rounded-3xl bg-white/[0.03] border border-white/[0.06] hover:border-[#0077BD]/30 text-left transition-all duration-500 hover:bg-white/[0.05]"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#0077BD]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <CreditCard className="w-7 h-7 text-[#0077BD]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Cliente en el Extranjero</h3>
                  <p className="text-sm text-white/50 leading-relaxed mb-4">
                    Si te encuentras fuera de Bolivia y deseas reservar con pago con tarjeta de crédito/débito, utiliza nuestro sistema de reserva online seguro.
                  </p>
                  <div className="flex items-center gap-2 text-[#0077BD] text-sm font-medium">
                    <span>Reservar y pagar</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              </div>
            )}

            {/* Back button */}
            {clientType !== null && (
              <div className="mb-6">
                <button
                  onClick={() => { setClientType(null); setFormSubmitted(false) }}
                  className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/60 transition-colors"
                >
                  ← Cambiar tipo de reserva
                </button>
              </div>
            )}

            {/* LOCAL BOLIVIA FORM */}
            {clientType === 'local' && !formSubmitted && (
              <div className="p-6 md:p-10 rounded-3xl bg-white/[0.03] border border-[#00E676]/10 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-[#00E676]/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-[#00E676]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Reserva Local - Sistema de Despacho</h3>
                    <p className="text-xs text-white/40">Su reserva será enviada directamente a nuestro sistema de despacho</p>
                  </div>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true) }} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-white/40 mb-2">Nombre completo *</label>
                      <input type="text" required className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white placeholder-white/20 focus:border-[#00E676]/30 focus:outline-none transition-colors" placeholder="Juan Pérez" />
                    </div>
                    <div>
                      <label className="block text-sm text-white/40 mb-2">Teléfono / WhatsApp *</label>
                      <input type="tel" required className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white placeholder-white/20 focus:border-[#00E676]/30 focus:outline-none transition-colors" placeholder="+591 70000000" />
                    </div>
                    <div>
                      <label className="block text-sm text-white/40 mb-2">Aeropuerto de llegada *</label>
                      <select required className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white focus:border-[#00E676]/30 focus:outline-none transition-colors">
                        <option value="" className="bg-[#0a0e17]">Seleccionar aeropuerto</option>
                        {airports.map(apt => (
                          <option key={apt.iata} value={apt.iata} className="bg-[#0a0e17]">{apt.iata} - {apt.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-white/40 mb-2">Número de vuelo *</label>
                      <input type="text" required className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white placeholder-white/20 focus:border-[#00E676]/30 focus:outline-none transition-colors" placeholder="OB 123" />
                    </div>
                    <div>
                      <label className="block text-sm text-white/40 mb-2">Fecha de llegada *</label>
                      <input type="date" required className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white focus:border-[#00E676]/30 focus:outline-none transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm text-white/40 mb-2">Hora estimada *</label>
                      <input type="time" required className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white focus:border-[#00E676]/30 focus:outline-none transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm text-white/40 mb-2">Destino (hotel/dirección) *</label>
                      <input type="text" required className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white placeholder-white/20 focus:border-[#00E676]/30 focus:outline-none transition-colors" placeholder="Hotel Las Americas, Santa Cruz" />
                    </div>
                    <div>
                      <label className="block text-sm text-white/40 mb-2">Tipo de vehículo</label>
                      <select className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white focus:border-[#00E676]/30 focus:outline-none transition-colors">
                        <option value="sedan" className="bg-[#0a0e17]">Sedan Confort</option>
                        <option value="suv" className="bg-[#0a0e17]">SUV</option>
                        <option value="van" className="bg-[#0a0e17]">Van VIP</option>
                        <option value="vip" className="bg-[#0a0e17]">Sedan VIP</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="checkbox" id="sign-local" defaultChecked className="w-4 h-4 rounded accent-[#00E676]" />
                    <label htmlFor="sign-local" className="text-sm text-white/60">Necesito cartel de bienvenida con mi nombre</label>
                  </div>
                  <div>
                    <label className="block text-sm text-white/40 mb-2">Notas especiales</label>
                    <textarea rows={3} className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white placeholder-white/20 focus:border-[#00E676]/30 focus:outline-none transition-colors resize-none" placeholder="Equipaje adicional, silla de bebé, etc." />
                  </div>
                  <button type="submit" className="w-full px-8 py-4 rounded-full text-lg font-semibold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all duration-300 shadow-[0_0_30px_rgba(0,230,118,0.3)] hover:shadow-[0_0_50px_rgba(0,230,118,0.5)]">
                    Enviar Reserva al Sistema de Despacho
                  </button>
                  <p className="text-center text-white/30 text-xs">
                    Su reserva será procesada por nuestro sistema de despacho y recibirá confirmación por WhatsApp.
                  </p>
                </form>
              </div>
            )}

            {/* LOCAL FORM SUBMITTED */}
            {clientType === 'local' && formSubmitted && (
              <div className="p-8 md:p-12 rounded-3xl bg-white/[0.03] border border-[#00E676]/10 text-center">
                <CheckCircle2 className="w-16 h-16 text-[#00E676] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Reserva Enviada al Sistema</h3>
                <p className="text-white/50 mb-6">Su reserva ha sido enviada a nuestro sistema de despacho. Recibirá confirmación por WhatsApp en los próximos minutos.</p>
                <button
                  onClick={() => { setFormSubmitted(false); setClientType(null) }}
                  className="px-6 py-3 rounded-full text-sm font-medium text-white border border-white/20 hover:border-[#00E676]/50 hover:bg-white/5 transition-all"
                >
                  Hacer otra reserva
                </button>
              </div>
            )}

            {/* FOREIGN CLIENT - WEBBOOKER EMBED */}
            {clientType === 'extranjero' && (
              <div className="rounded-3xl overflow-hidden border border-[#0077BD]/10">
                <div className="p-6 bg-white/[0.03] border-b border-white/[0.06]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0077BD]/10 flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-[#0077BD]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">Reserva Online - Pago con Tarjeta</h3>
                      <p className="text-xs text-white/40">Reserva y paga de forma segura con tarjeta de crédito/débito</p>
                    </div>
                  </div>
                </div>
                {/* Webbooker inline embed */}
                <div className="bg-white min-h-[600px]">
                  <inline-webbooker
                    formid="69618eb0a0cd06993b79bdcb"
                    navigation="inline"
                    showTopbar="false"
                    showLogo="false"
                    language="en"
                    headercolor="#0ceb45"
                    textcolor="#078bf1"
                    backgroundcolor="#ffffff"
                    buttonstyle="rounded"
                  />
                </div>
              </div>
            )}
          </div>
        </section>

      </main>
      <Footer />

      {/* Webbooker Scripts - loaded when foreign client selects payment option */}
      <Script
        src="https://yourwebbooker.com/inline-webbooker/webbooker.js"
        type="module"
        strategy="lazyOnload"
      />
      <link
        rel="stylesheet"
        href="https://yourwebbooker.com/inline-webbooker/styles.css"
      />
    </div>
  )
}

// Simple briefcase icon to avoid import issues
function Briefcase2Icon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      <line x1="12" y1="12" x2="12" y2="12.01" />
    </svg>
  )
}
