'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Calendar, Heart, Users, Car, Bus, Sparkles, MapPin,
  Phone, CheckCircle2, Star, ArrowRight, ChevronDown,
  Music, Trophy, Building2, Church, Plane, PartyPopper,
  Truck, Shield, Clock, Award, Handshake, Wallet
} from 'lucide-react'

/* ─── Event Categories ─── */
const eventCategories = [
  {
    icon: Heart,
    title: 'Bodas',
    desc: 'Vehículos decorados para los novios y traslado elegante para invitados. Micros y minibuses disponibles para grupos grandes.',
    color: '#E91E63',
    vehicles: ['Sedán VIP decorado', 'Minibus para invitados', 'Micro para grupos'],
  },
  {
    icon: Church,
    title: 'Funerales',
    desc: 'Servicio discreto y respetuoso para traslados en momentos difíciles. Vehículos apropiados con la máxima dignidad.',
    color: '#607D8B',
    vehicles: ['Sedán ejecutivo', 'Van para familia', 'Minibus para acompañantes'],
  },
  {
    icon: Trophy,
    title: 'Eventos Deportivos',
    desc: 'Transporte coordinado para equipos, comisiones técnicas y aficionados. Llega al estadio sin preocupaciones.',
    color: '#FF9800',
    vehicles: ['Bus para equipos', 'Minibus para comitiva', 'Sedán para directivos'],
  },
  {
    icon: Music,
    title: 'Conciertos',
    desc: 'Desde conciertos íntimos hasta mega eventos. Traslado masivo con logística profesional para artistas y público.',
    color: '#9C27B0',
    vehicles: ['Micro para público', 'Van VIP para artistas', 'Sedán ejecutivo'],
  },
  {
    icon: Building2,
    title: 'Conferencias y Empresariales',
    desc: 'Transporte corporativo para congresos, seminarios y actividades empresariales. Puntualidad y profesionalismo garantizados.',
    color: '#0077BD',
    vehicles: ['Sedán ejecutivo', 'Van corporativa', 'Minibus para asistentes'],
  },
  {
    icon: PartyPopper,
    title: 'Cumpleaños y Celebraciones',
    desc: 'Desde un cumpleaños infantil hasta una fiesta grande. Vehículos adaptados a la ocasión y al número de invitados.',
    color: '#00E676',
    vehicles: ['Sedán familiar', 'Van para grupo', 'Minibus para invitados'],
  },
  {
    icon: Users,
    title: 'Juntas de Fraternidad',
    desc: 'Traslado organizado para fraternidades y grupos folclóricos. Viajen juntos y disfruten sin preocuparse por la logística.',
    color: '#F44336',
    vehicles: ['Micro completo', 'Minibus', 'Van para directiva'],
  },
  {
    icon: Church,
    title: 'Paseos y Excursiones Religiosas',
    desc: 'Peregrinaciones y excursiones religiosas con transporte seguro y cómodo para grupos de cualquier tamaño.',
    color: '#795548',
    vehicles: ['Bus para peregrinos', 'Minibus', 'Van para organizadores'],
  },
  {
    icon: MapPin,
    title: 'Viajes Fuera de la Ciudad',
    desc: 'Traslados interurbanos y a destinos turísticos. Viaja seguro con conductores experimentados en ruta.',
    color: '#009688',
    vehicles: ['Sedán confort', 'SUV para terreno', 'Minibus para grupo'],
  },
  {
    icon: Plane,
    title: 'Recogida de Aeropuerto',
    desc: 'Chofer con cartel de bienvenida en la terminal. Seguimiento de vuelo en tiempo real y traslado directo a tu evento.',
    color: '#2196F3',
    vehicles: ['Sedán VIP', 'SUV', 'Van para grupos'],
  },
  {
    icon: Sparkles,
    title: 'Ferias y Exposiciones',
    desc: 'Transporte para expositores, visitantes y equipos. Logística completa para ferias comerciales y exposiciones.',
    color: '#FF5722',
    vehicles: ['Van para carga ligera', 'Minibus para visitantes', 'Sedán para expositores'],
  },
  {
    icon: Users,
    title: 'Traslados Grupales',
    desc: 'Cualquier evento que requiera mover personas de un punto a otro. Nos adaptamos a la cantidad y al recorrido.',
    color: '#4CAF50',
    vehicles: ['Micro', 'Minibus', 'Van', 'Bus'],
  },
]

/* ─── Vehicle Options ─── */
const vehicleOptions = [
  {
    type: 'Vehículo Rutero de Línea',
    icon: Car,
    desc: 'Servicio confiable con conductor profesional a un precio accesible. Ideal para presupuestos ajustados sin sacrificar seguridad.',
    features: ['Conductor profesional', 'Seguro incluido', 'Puntualidad garantizada', 'Mejor precio'],
    color: '#0077BD',
    badge: 'Económico',
  },
  {
    type: 'Vehículo Privado Especial',
    icon: Sparkles,
    desc: 'Unidades nuevas, equipadas con aire acondicionado y todas las comodidades. La opción premium para quienes buscan lo mejor.',
    features: ['Aire acondicionado', 'Vehículo nuevo', 'Mayor confort', 'Servicio exclusivo'],
    color: '#00E676',
    badge: 'Premium',
  },
  {
    type: 'Minibus',
    icon: Bus,
    desc: 'Perfecto para grupos medianos. Asientos cómodos, espacio para equipaje y la comodidad de viajar todos juntos.',
    features: ['15-25 pasajeros', 'Espacio para equipaje', 'Aire acondicionado', 'Viaje grupal'],
    color: '#FF9800',
    badge: 'Grupal',
  },
  {
    type: 'Micro / Bus',
    icon: Truck,
    desc: 'Para eventos grandes que necesitan mover muchas personas. Unidades amplias con capacidad para grupos de 30 a 45 pasajeros.',
    features: ['30-45 pasajeros', 'Logística masiva', 'Coordinación total', 'Mejor costo por persona'],
    color: '#9C27B0',
    badge: 'Masivo',
  },
]

/* ─── Stats ─── */
const eventStats = [
  { value: '500+', label: 'Eventos atendidos', icon: Calendar },
  { value: '12', label: 'Tipos de vehículos', icon: Car },
  { value: '4.9', label: 'Rating promedio', icon: Star },
  { value: '15+', label: 'Años de experiencia', icon: Award },
]

export function EventosPage() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.05 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const selectedEvent = eventCategories.find(e => e.title === selectedCategory)

  return (
    <div ref={sectionRef} className="min-h-screen bg-[#0a0e17] pt-20">

      {/* ═══ HERO ═══ */}
      <section className="relative py-16 md:py-28 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1830] to-[#0a0e17]" />
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full bg-[#9C27B0]/10 blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#00E676]/5 blur-[100px]" />
        <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] rounded-full bg-[#E91E63]/5 blur-[80px]" />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-float"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 20}%`,
                background: i % 2 === 0 ? '#00E676' : '#9C27B0',
                opacity: 0.15,
                animationDelay: `${i * 1.2}s`,
                animationDuration: `${6 + i}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#9C27B0]/10 border border-[#9C27B0]/20 mb-6">
            <Calendar className="w-4 h-4 text-[#9C27B0]" />
            <span className="text-sm text-[#9C27B0]">Transporte para Eventos</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
            Tu Evento,{' '}
            <span className="bg-gradient-to-r from-[#9C27B0] via-[#E91E63] to-[#FF9800] bg-clip-text text-transparent">
              Nuestra Movida
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/50 max-w-3xl mx-auto mb-8 leading-relaxed">
            No importa el tamaño del evento, Ecotaxi tiene un vehículo para cada ocasión.
            Desde un cumpleaños infantil hasta un mega concierto, nosotros nos encargamos de la movida.
          </p>

          {/* Key Features */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {[
              { icon: Users, text: 'Individual, familiar o grupal', color: '#00E676' },
              { icon: Wallet, text: 'Nos adaptamos a tu presupuesto', color: '#FF9800' },
              { icon: Shield, text: 'Logística profesional', color: '#0077BD' },
              { icon: Sparkles, text: 'Vehículos nuevos con A/C', color: '#9C27B0' },
            ].map((feat) => (
              <div key={feat.text} className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.06]">
                <feat.icon className="w-4 h-4" style={{ color: feat.color }} />
                <span className="text-sm text-white/60">{feat.text}</span>
              </div>
            ))}
          </div>

          {/* Animated Scene SVG */}
          <div className="max-w-3xl mx-auto mb-6">
            <svg viewBox="0 0 800 180" className="w-full">
              {/* Road */}
              <rect x="0" y="150" width="800" height="4" fill="#9C27B0" opacity="0.2" rx="2" />
              {[40, 140, 240, 340, 440, 540, 640, 740].map(x => (
                <rect key={x} x={x} y="151" width="30" height="2" fill="#9C27B0" opacity="0.1" rx="1" />
              ))}

              {/* Convoy of vehicles */}
              {/* Lead VIP Sedan */}
              <g>
                <rect x="200" y="118" width="60" height="25" rx="8" fill="#1a1a2e" stroke="#9C27B0" strokeWidth="0.8" />
                <rect x="204" y="122" width="14" height="10" rx="2" fill="#9C27B0" opacity="0.3" />
                <rect x="222" y="122" width="18" height="10" rx="2" fill="#9C27B0" opacity="0.2" />
                <rect x="244" y="122" width="12" height="10" rx="2" fill="#9C27B0" opacity="0.3" />
                <circle cx="212" cy="145" r="5" fill="#222" stroke="#9C27B0" strokeWidth="0.5" />
                <circle cx="248" cy="145" r="5" fill="#222" stroke="#9C27B0" strokeWidth="0.5" />
                {/* VIP glow */}
                <rect x="200" y="115" width="60" height="2" rx="1" fill="#9C27B0" opacity="0.3">
                  <animate attributeName="opacity" values="0.2;0.5;0.2" dur="2s" repeatCount="indefinite" />
                </rect>
              </g>

              {/* Minibus */}
              <g>
                <rect x="340" y="110" width="90" height="33" rx="6" fill="#1a1a2e" stroke="#00E676" strokeWidth="0.8" />
                {[0,1,2,3,4].map(i => (
                  <rect key={i} x={348 + i * 16} y="115" width="12" height="10" rx="2" fill="#00E676" opacity="0.2" />
                ))}
                <circle cx="358" cy="145" r="5" fill="#222" stroke="#00E676" strokeWidth="0.5" />
                <circle cx="412" cy="145" r="5" fill="#222" stroke="#00E676" strokeWidth="0.5" />
                {/* People icons inside */}
                <text x="385" y="136" textAnchor="middle" fill="#00E676" fontSize="7" opacity="0.4">GROUP</text>
              </g>

              {/* Micro/Bus */}
              <g>
                <rect x="500" y="105" width="120" height="38" rx="6" fill="#1a1a2e" stroke="#FF9800" strokeWidth="0.8" />
                {[0,1,2,3,4,5].map(i => (
                  <rect key={i} x={508 + i * 18} y="110" width="13" height="10" rx="2" fill="#FF9800" opacity="0.15" />
                ))}
                <circle cx="520" cy="145" r="5.5" fill="#222" stroke="#FF9800" strokeWidth="0.5" />
                <circle cx="600" cy="145" r="5.5" fill="#222" stroke="#FF9800" strokeWidth="0.5" />
                <text x="560" y="136" textAnchor="middle" fill="#FF9800" fontSize="7" opacity="0.4">EVENT</text>
              </g>

              {/* Sparkle decorations */}
              <circle cx="180" cy="100" r="2" fill="#E91E63" opacity="0.4">
                <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx="330" cy="90" r="1.5" fill="#00E676" opacity="0.4">
                <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="650" cy="85" r="2" fill="#FF9800" opacity="0.4">
                <animate attributeName="opacity" values="0.2;0.5;0.2" dur="2s" repeatCount="indefinite" />
              </circle>

              {/* Directional arrows */}
              <path d="M 680 130 L 700 130 L 695 125 M 700 130 L 695 135" stroke="#9C27B0" strokeWidth="1.5" fill="none" opacity="0.3" />
            </svg>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => document.getElementById('eventos-categorias')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 rounded-full text-lg font-semibold text-white bg-[#9C27B0] hover:bg-[#AB47BC] transition-all duration-300 shadow-[0_0_30px_rgba(156,39,176,0.3)] hover:shadow-[0_0_50px_rgba(156,39,176,0.5)] hover:scale-105"
            >
              <Calendar className="w-5 h-5 inline mr-2" />
              Ver Tipos de Eventos
            </button>
            <button
              onClick={() => document.getElementById('eventos-contacto')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 rounded-full text-lg font-semibold text-white border border-white/20 hover:border-[#9C27B0]/50 hover:bg-white/5 transition-all duration-300"
            >
              <Phone className="w-5 h-5 inline mr-2" />
              Cotizar mi Evento
            </button>
          </div>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="py-10 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {eventStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="w-6 h-6 text-[#9C27B0] mx-auto mb-2" />
                <div className="text-3xl md:text-4xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-white/40 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ EVENT CATEGORIES ═══ */}
      <section id="eventos-categorias" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E91E63]/10 border border-[#E91E63]/20 mb-4">
              <Sparkles className="w-4 h-4 text-[#E91E63]" />
              <span className="text-sm text-[#E91E63]">Para Cada Ocasión</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Vehículos para{' '}
              <span className="bg-gradient-to-r from-[#9C27B0] to-[#E91E63] bg-clip-text text-transparent">
                Todo Tipo de Eventos
              </span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              Desde un cumpleaños íntimo hasta un mega concierto. Haz click en cada tipo de evento para ver los vehículos disponibles.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            {/* Categories Grid */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {eventCategories.map((cat) => {
                  const isSelected = selectedCategory === cat.title
                  return (
                    <button
                      key={cat.title}
                      onClick={() => setSelectedCategory(isSelected ? null : cat.title)}
                      className={`group relative p-4 md:p-5 rounded-2xl text-left transition-all duration-300 ${
                        isSelected
                          ? 'bg-white/[0.06] border-2'
                          : 'bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-white/10'
                      }`}
                      style={isSelected ? { borderColor: `${cat.color}40` } : {}}
                    >
                      {/* Glow */}
                      {isSelected && (
                        <div className="absolute inset-0 rounded-2xl opacity-20"
                          style={{ boxShadow: `0 0 25px ${cat.color}30` }} />
                      )}

                      <div className="relative z-10">
                        <div className="w-10 h-10 rounded-xl mb-3 flex items-center justify-center"
                          style={{ background: `${cat.color}15` }}>
                          <cat.icon className="w-5 h-5" style={{ color: cat.color }} />
                        </div>
                        <h3 className={`text-sm font-bold mb-1 transition-colors ${
                          isSelected ? 'text-white' : 'text-white/70 group-hover:text-white'
                        }`}>
                          {cat.title}
                        </h3>
                        <p className="text-xs text-white/30 leading-relaxed line-clamp-2">
                          {cat.desc}
                        </p>
                        {isSelected && (
                          <ChevronDown className="w-4 h-4 absolute top-4 right-4 rotate-180"
                            style={{ color: cat.color }} />
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Detail Panel */}
            <div className="lg:col-span-2">
              {selectedEvent ? (
                <div className="p-6 rounded-3xl bg-white/[0.03] border transition-all duration-500"
                  style={{ borderColor: `${selectedEvent.color}30` }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: `${selectedEvent.color}15` }}>
                      <selectedEvent.icon className="w-6 h-6" style={{ color: selectedEvent.color }} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{selectedEvent.title}</h3>
                      <p className="text-xs" style={{ color: selectedEvent.color }}>Ecotaxi Eventos</p>
                    </div>
                  </div>

                  <p className="text-sm text-white/40 leading-relaxed mb-6">
                    {selectedEvent.desc}
                  </p>

                  <h4 className="text-sm font-semibold text-white/60 mb-3 uppercase tracking-wider">
                    Vehículos Disponibles
                  </h4>
                  <div className="space-y-2 mb-6">
                    {selectedEvent.vehicles.map((vehicle) => (
                      <div key={vehicle} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                        <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: selectedEvent.color }} />
                        <span className="text-sm text-white/60">{vehicle}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-white/40">
                      <Shield className="w-4 h-4 text-[#00E676]" />
                      <span>Seguro incluido para todos los pasajeros</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/40">
                      <Clock className="w-4 h-4 text-[#0077BD]" />
                      <span>Puntualidad garantizada</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/40">
                      <Handshake className="w-4 h-4 text-[#FF9800]" />
                      <span>Nos adaptamos a tu presupuesto</span>
                    </div>
                  </div>

                  <button
                    onClick={() => document.getElementById('eventos-contacto')?.scrollIntoView({ behavior: 'smooth' })}
                    className="w-full px-6 py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:scale-105"
                    style={{
                      background: selectedEvent.color,
                      boxShadow: `0 0 20px ${selectedEvent.color}30`,
                    }}
                  >
                    Cotizar para {selectedEvent.title}
                  </button>
                </div>
              ) : (
                <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.06] text-center">
                  <Calendar className="w-12 h-12 text-white/10 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white/40 mb-2">Selecciona un Tipo de Evento</h3>
                  <p className="text-sm text-white/25">
                    Haz click en cualquiera de las categorías para ver los vehículos disponibles y detalles del servicio.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ VEHICLE OPTIONS ═══ */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#0a0e17] via-[#0d1830] to-[#0a0e17]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 mb-4">
              <Car className="w-4 h-4 text-[#00E676]" />
              <span className="text-sm text-[#00E676]">Opciones de Vehículos</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Elige tu{' '}
              <span className="bg-gradient-to-r from-[#00E676] to-[#0077BD] bg-clip-text text-transparent">
                Nivel de Servicio
              </span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              Nos adaptamos a tu presupuesto y requerimiento. Puedes elegir entre un vehículo rutero de línea
              o nuestros vehículos privados especiales nuevos con aire acondicionado.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {vehicleOptions.map((option) => (
              <div key={option.type}
                className="group relative p-6 md:p-8 rounded-3xl bg-white/[0.03] border border-white/[0.06] hover:border-white/10 transition-all duration-500">
                {/* Glow on hover */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ boxShadow: `0 0 30px ${option.color}10` }} />

                <div className="relative z-10">
                  {/* Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{ background: `${option.color}15` }}>
                      <option.icon className="w-7 h-7" style={{ color: option.color }} />
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{ background: `${option.color}15`, color: option.color }}>
                      {option.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">{option.type}</h3>
                  <p className="text-sm text-white/40 leading-relaxed mb-6">{option.desc}</p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-2">
                    {option.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: option.color }} />
                        <span className="text-xs text-white/50">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BODAS SPECIAL SECTION ═══ */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-[#E91E63]/5 to-[#9C27B0]/5 border border-[#E91E63]/10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E91E63]/10 border border-[#E91E63]/20 mb-6">
                  <Heart className="w-4 h-4 text-[#E91E63]" />
                  <span className="text-sm text-[#E91E63]">Servicio Especial Bodas</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Tu Día Especial Merece{' '}
                  <span className="text-[#E91E63]">Transporte Especial</span>
                </h2>
                <p className="text-white/50 leading-relaxed mb-6">
                  En tu boda, cada detalle importa. Por eso ofrecemos vehículos decorados especialmente
                  para los novios, con chofer de gala y la elegancia que tu día merece. Y para que tus
                  invitados también lleguen a tiempo y cómodos, disponemos de minibuses y micros que
                  aseguran que nadie se pierda la celebración.
                </p>
                <div className="space-y-3 mb-8">
                  {[
                    'Vehículos decorados con flores y lazos para los novios',
                    'Chofer vestido de gala con guante blanco',
                    'Minibus y micro para traslado de invitados',
                    'Coordinación de horarios con el wedding planner',
                    'Recogida en domicilio y traslado a iglesia y recepción',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2 text-sm text-white/50">
                      <CheckCircle2 className="w-4 h-4 text-[#E91E63] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => document.getElementById('eventos-contacto')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-6 py-3 rounded-full text-sm font-semibold text-white bg-[#E91E63] hover:bg-[#F06292] transition-all duration-300 shadow-[0_0_20px_rgba(233,30,99,0.3)]"
                >
                  Cotizar Boda
                </button>
              </div>

              {/* Wedding SVG Illustration */}
              <div className="flex justify-center">
                <svg viewBox="0 0 400 300" className="w-full max-w-sm">
                  {/* Background glow */}
                  <defs>
                    <radialGradient id="wedding-glow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#E91E63" stopOpacity="0.1" />
                      <stop offset="100%" stopColor="#E91E63" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <circle cx="200" cy="150" r="120" fill="url(#wedding-glow)" />

                  {/* Decorated Car */}
                  <g transform="translate(80, 100)">
                    {/* Car body */}
                    <rect x="10" y="40" width="140" height="50" rx="12" fill="#1a1a2e" stroke="#E91E63" strokeWidth="1" />
                    {/* Roof */}
                    <path d="M 40 40 L 55 15 L 110 15 L 125 40" fill="#1a1a2e" stroke="#E91E63" strokeWidth="0.8" />
                    {/* Windows */}
                    <path d="M 45 38 L 56 18 L 80 18 L 80 38 Z" fill="#E91E63" opacity="0.15" />
                    <path d="M 84 38 L 84 18 L 108 18 L 120 38 Z" fill="#E91E63" opacity="0.15" />
                    {/* Wheels */}
                    <circle cx="42" cy="95" r="12" fill="#111" stroke="#E91E63" strokeWidth="0.8" />
                    <circle cx="118" cy="95" r="12" fill="#111" stroke="#E91E63" strokeWidth="0.8" />
                    <circle cx="42" cy="95" r="4" fill="#333" />
                    <circle cx="118" cy="95" r="4" fill="#333" />
                    {/* Decoration - flowers on hood */}
                    <circle cx="150" cy="50" r="6" fill="#E91E63" opacity="0.6">
                      <animate attributeName="r" values="5;7;5" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="145" cy="45" r="4" fill="#FF9800" opacity="0.5" />
                    <circle cx="155" cy="45" r="4" fill="#FF9800" opacity="0.5" />
                    {/* Ribbon */}
                    <path d="M 20 55 L 35 48 L 35 62 Z" fill="#E91E63" opacity="0.4" />
                    <path d="M 20 55 L 35 55 L 35 68 Z" fill="#E91E63" opacity="0.3" />
                    {/* "Just Married" sign area */}
                    <rect x="30" y="75" width="100" height="12" rx="3" fill="#E91E63" opacity="0.2" />
                    <text x="80" y="84" textAnchor="middle" fill="#E91E63" fontSize="6" fontWeight="bold" opacity="0.7">
                      JUST MARRIED
                    </text>
                  </g>

                  {/* Hearts floating */}
                  <g>
                    <text x="300" y="80" fill="#E91E63" fontSize="16" opacity="0.3">
                      ♥
                      <animate attributeName="y" values="80;70;80" dur="3s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.2;0.5;0.2" dur="3s" repeatCount="indefinite" />
                    </text>
                    <text x="320" y="110" fill="#E91E63" fontSize="12" opacity="0.2">
                      ♥
                      <animate attributeName="y" values="110;100;110" dur="2.5s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.15;0.4;0.15" dur="2.5s" repeatCount="indefinite" />
                    </text>
                    <text x="50" y="60" fill="#E91E63" fontSize="10" opacity="0.2">
                      ♥
                      <animate attributeName="y" values="60;50;60" dur="2s" repeatCount="indefinite" />
                    </text>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ EXPERIENCE / LOGISTICS ═══ */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#0a0e17] via-[#0d1830] to-[#0a0e17]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF9800]/10 border border-[#FF9800]/20 mb-6">
                <Award className="w-4 h-4 text-[#FF9800]" />
                <span className="text-sm text-[#FF9800]">Experiencia Comprobada</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Tú Disfruta,{' '}
                <span className="bg-gradient-to-r from-[#FF9800] to-[#00E676] bg-clip-text text-transparent">
                  Nosotros Nos Encargamos
                </span>
              </h2>
              <p className="text-white/50 leading-relaxed mb-8">
                Con más de 15 años de experiencia en el servicio de transporte para eventos,
                conocemos la logística que cada ocasión requiere. Desde coordinar horarios de
                recogida hasta asegurar que cada pasajero llegue a tiempo, nos encargamos de
                toda la movida para que tú solo te preocupes de disfrutar.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  {
                    icon: Clock,
                    title: 'Coordinación de Horarios',
                    desc: 'Planificamos las recogidas y los traslados con precisión para que todo fluya sin contratiempos.',
                  },
                  {
                    icon: MapPin,
                    title: 'Rutas Optimizadas',
                    desc: 'Conocemos las mejores rutas y alternativas para evitar retrasos, especialmente en horas pico.',
                  },
                  {
                    icon: Users,
                    title: 'Gestión de Grupos Grandes',
                    desc: 'Logística profesional para mover desde 10 hasta 500 personas de forma organizada y segura.',
                  },
                  {
                    icon: Shield,
                    title: 'Seguridad Total',
                    desc: 'Todos nuestros vehículos cuentan con seguro y nuestros conductores están certificados y capacitados.',
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.08] transition-all">
                    <div className="w-10 h-10 rounded-xl bg-[#FF9800]/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-[#FF9800]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-xs text-white/40 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Process Steps */}
            <div>
              <div className="space-y-4">
                {[
                  {
                    step: '01',
                    title: 'Cuéntanos tu Evento',
                    desc: 'Dinos qué tipo de evento es, cuántas personas, fechas y cualquier requisito especial.',
                    color: '#9C27B0',
                  },
                  {
                    step: '02',
                    title: 'Recibe tu Cotización',
                    desc: 'Te presentamos opciones de vehículos y precios adaptados a tu presupuesto y necesidades.',
                    color: '#E91E63',
                  },
                  {
                    step: '03',
                    title: 'Coordinamos la Logística',
                    desc: 'Planificamos rutas, horarios de recogida y puntos de encuentro para un traslado impecable.',
                    color: '#FF9800',
                  },
                  {
                    step: '04',
                    title: 'Disfruta tu Evento',
                    desc: 'El día del evento, nosotros nos encargamos de todo. Tú solo relájate y disfruta la celebración.',
                    color: '#00E676',
                  },
                ].map((step, i) => (
                  <div key={step.step}
                    className={`flex items-start gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] ${
                      visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    } transition-all duration-500`}
                    style={{ transitionDelay: visible ? `${i * 150}ms` : '0ms' }}
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${step.color}15` }}>
                      <span className="text-lg font-bold" style={{ color: step.color }}>{step.step}</span>
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white mb-1">{step.title}</h4>
                      <p className="text-sm text-white/40 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ BUDGET SECTION ═══ */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 mb-4">
              <Wallet className="w-4 h-4 text-[#00E676]" />
              <span className="text-sm text-[#00E676]">Adaptados a tu Presupuesto</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Nos Adaptamos a{' '}
              <span className="bg-gradient-to-r from-[#00E676] to-[#0077BD] bg-clip-text text-transparent">
                tu Presupuesto
              </span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              Ya sea que busques la opción más económica o el servicio más exclusivo,
              tenemos la solución perfecta para tu evento.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                plan: 'Básico',
                icon: Car,
                desc: 'Vehículo rutero de línea con conductor profesional. La opción más accesible sin sacrificar seguridad ni puntualidad.',
                features: [
                  'Conductor profesional certificado',
                  'Seguro de pasajeros incluido',
                  'Puntualidad garantizada',
                  'Coordinación básica de horarios',
                  'Mejor precio del mercado',
                ],
                color: '#0077BD',
                highlight: false,
              },
              {
                plan: 'Especial',
                icon: Sparkles,
                desc: 'Vehículos privados especiales nuevos con aire acondicionado. Mayor confort y exclusividad para tu evento.',
                features: [
                  'Todo lo del plan Básico',
                  'Vehículo nuevo con A/C',
                  'Mayor confort y espacio',
                  'Agua y amenities a bordo',
                  'Servicio prioritario',
                  'Coordinador dedicado',
                ],
                color: '#00E676',
                highlight: true,
              },
              {
                plan: 'Premium',
                icon: Star,
                desc: 'Servicio VIP completo con logística dedicada, vehículos de alta gama y atención personalizada las 24 horas.',
                features: [
                  'Todo lo del plan Especial',
                  'Vehículos de alta gama',
                  'Logística 100% dedicada',
                  'Coordinador de evento 24/7',
                  'Rutas múltiples sincronizadas',
                  'Atención personalizada',
                ],
                color: '#FF9800',
                highlight: false,
              },
            ].map((plan) => (
              <div key={plan.plan}
                className={`relative p-6 md:p-8 rounded-3xl transition-all duration-500 ${
                  plan.highlight
                    ? 'bg-white/[0.05] border-2 scale-105 shadow-[0_0_40px_rgba(0,230,118,0.1)]'
                    : 'bg-white/[0.03] border border-white/[0.06] hover:border-white/10'
                }`}
                style={plan.highlight ? { borderColor: `${plan.color}40` } : {}}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-black"
                    style={{ background: plan.color }}>
                    Más Popular
                  </div>
                )}

                <div className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center"
                  style={{ background: `${plan.color}15` }}>
                  <plan.icon className="w-6 h-6" style={{ color: plan.color }} />
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{plan.plan}</h3>
                <p className="text-sm text-white/40 leading-relaxed mb-6">{plan.desc}</p>

                <div className="space-y-3 mb-6">
                  {plan.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: plan.color }} />
                      <span className="text-sm text-white/50">{feat}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => document.getElementById('eventos-contacto')?.scrollIntoView({ behavior: 'smooth' })}
                  className={`w-full px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                    plan.highlight
                      ? 'text-black hover:scale-105'
                      : 'text-white border border-white/10 hover:border-white/20 bg-white/[0.02]'
                  }`}
                  style={plan.highlight ? {
                    background: plan.color,
                    boxShadow: `0 0 20px ${plan.color}30`,
                  } : {}}
                >
                  Cotizar Plan {plan.plan}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CONTACT / CTA ═══ */}
      <section id="eventos-contacto" className="py-16 md:py-24 bg-gradient-to-b from-[#0a0e17] via-[#0d1830] to-[#0a0e17]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#9C27B0]/10 border border-[#9C27B0]/20 mb-4">
              <Phone className="w-4 h-4 text-[#9C27B0]" />
              <span className="text-sm text-[#9C27B0]">Cotiza tu Evento</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Cuéntanos de tu{' '}
              <span className="bg-gradient-to-r from-[#9C27B0] to-[#E91E63] bg-clip-text text-transparent">
                Evento
              </span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              Completa el formulario y te contactamos con una cotización personalizada.
              Sin compromiso, sin pagos anticipados.
            </p>
          </div>

          <EventContactForm />
        </div>
      </section>

      {/* ═══ TRUST REVIEWS ═══ */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-[#9C27B0]/5 to-[#E91E63]/5 border border-[#9C27B0]/10">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Organizadores que{' '}
                <span className="text-[#9C27B0]">Confían en Nosotros</span>
              </h2>
              <p className="text-white/50 max-w-2xl mx-auto">
                Empresas, organizadores de eventos y familias enteras eligen Ecotaxi
                para la logística de transporte de sus celebraciones.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  quote: 'Contratamos Ecotaxi para nuestra boda y fue la mejor decisión. Los novios llegaron en un sedán decorado hermoso y los invitados en los minibuses puntuales.',
                  author: 'Carolina R.',
                  from: 'Boda en Santa Cruz',
                  stars: 5,
                },
                {
                  quote: 'Llevamos 3 años trabajando con Ecotaxi para todos nuestros eventos corporativos. Su logística es impecable y nunca nos han fallado.',
                  author: 'Roberto M.',
                  from: 'Director de Eventos, Empresa Internacional',
                  stars: 5,
                },
                {
                  quote: 'Para el concierto con 300 personas, coordinaron 8 vehículos sin ningún problema. Llegamos todos a tiempo y la organización fue perfecta.',
                  author: 'Ana P.',
                  from: 'Productora de Conciertos',
                  stars: 5,
                },
              ].map((review) => (
                <div key={review.author} className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                  <div className="flex gap-1 mb-3">
                    {[...Array(review.stars)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#FF9800] text-[#FF9800]" />
                    ))}
                  </div>
                  <p className="text-sm text-white/50 leading-relaxed mb-3 italic">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#9C27B0]/20 flex items-center justify-center text-xs text-[#9C27B0] font-bold">
                      {review.author[0]}
                    </div>
                    <div>
                      <p className="text-xs text-white/60 font-medium">{review.author}</p>
                      <p className="text-[10px] text-white/30">{review.from}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

/* ─── Contact Form Component ─── */
function EventContactForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    tipoEvento: '',
    fecha: '',
    numPersonas: '',
    tipoVehiculo: '',
    comentario: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="p-6 md:p-8 rounded-3xl bg-white/[0.03] border border-white/[0.06]">
      <h3 className="text-xl font-bold text-white mb-2">Solicita tu Cotización</h3>
      <p className="text-white/40 text-sm mb-8">Completa los datos y te contactamos en menos de 30 minutos.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Nombre */}
        <div>
          <label className="block text-xs text-white/40 mb-1.5">Nombre completo</label>
          <input type="text" name="nombre" value={formData.nombre} onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white text-sm placeholder-white/20 focus:border-[#9C27B0]/50 focus:outline-none transition-colors"
            placeholder="Tu nombre" />
        </div>

        {/* Teléfono */}
        <div>
          <label className="block text-xs text-white/40 mb-1.5">Teléfono / WhatsApp</label>
          <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white text-sm placeholder-white/20 focus:border-[#9C27B0]/50 focus:outline-none transition-colors"
            placeholder="+591 700 00000" />
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs text-white/40 mb-1.5">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white text-sm placeholder-white/20 focus:border-[#9C27B0]/50 focus:outline-none transition-colors"
            placeholder="tu@email.com" />
        </div>

        {/* Tipo de Evento */}
        <div>
          <label className="block text-xs text-white/40 mb-1.5">Tipo de evento</label>
          <select name="tipoEvento" value={formData.tipoEvento} onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white text-sm focus:border-[#9C27B0]/50 focus:outline-none transition-colors">
            <option value="" className="bg-[#0a0e17]">Seleccionar tipo de evento</option>
            <option value="boda" className="bg-[#0a0e17]">Boda</option>
            <option value="funeral" className="bg-[#0a0e17]">Funeral</option>
            <option value="deportivo" className="bg-[#0a0e17]">Evento Deportivo</option>
            <option value="concierto" className="bg-[#0a0e17]">Concierto</option>
            <option value="conferencia" className="bg-[#0a0e17]">Conferencia / Empresarial</option>
            <option value="cumpleanos" className="bg-[#0a0e17]">Cumpleaños / Celebración</option>
            <option value="fraternidad" className="bg-[#0a0e17]">Junta de Fraternidad</option>
            <option value="religioso" className="bg-[#0a0e17]">Excursión Religiosa</option>
            <option value="viaje" className="bg-[#0a0e17]">Viaje fuera de la ciudad</option>
            <option value="aeropuerto" className="bg-[#0a0e17]">Recogida de Aeropuerto</option>
            <option value="feria" className="bg-[#0a0e17]">Feria / Exposición</option>
            <option value="grupal" className="bg-[#0a0e17]">Traslado Grupal</option>
            <option value="otro" className="bg-[#0a0e17]">Otro</option>
          </select>
        </div>

        {/* Fecha */}
        <div>
          <label className="block text-xs text-white/40 mb-1.5">Fecha del evento</label>
          <input type="date" name="fecha" value={formData.fecha} onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white text-sm focus:border-[#9C27B0]/50 focus:outline-none transition-colors" />
        </div>

        {/* Número de personas */}
        <div>
          <label className="block text-xs text-white/40 mb-1.5">Número aproximado de personas</label>
          <select name="numPersonas" value={formData.numPersonas} onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white text-sm focus:border-[#9C27B0]/50 focus:outline-none transition-colors">
            <option value="" className="bg-[#0a0e17]">Seleccionar</option>
            <option value="1-4" className="bg-[#0a0e17]">1 - 4 personas</option>
            <option value="5-10" className="bg-[#0a0e17]">5 - 10 personas</option>
            <option value="11-25" className="bg-[#0a0e17]">11 - 25 personas</option>
            <option value="26-50" className="bg-[#0a0e17]">26 - 50 personas</option>
            <option value="51-100" className="bg-[#0a0e17]">51 - 100 personas</option>
            <option value="100+" className="bg-[#0a0e17]">Más de 100 personas</option>
          </select>
        </div>

        {/* Tipo de Vehículo */}
        <div>
          <label className="block text-xs text-white/40 mb-1.5">Preferencia de vehículo</label>
          <select name="tipoVehiculo" value={formData.tipoVehiculo} onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white text-sm focus:border-[#9C27B0]/50 focus:outline-none transition-colors">
            <option value="" className="bg-[#0a0e17]">Seleccionar preferencia</option>
            <option value="rutero" className="bg-[#0a0e17]">Rutero de línea (económico)</option>
            <option value="privado" className="bg-[#0a0e17]">Privado especial con A/C</option>
            <option value="vip" className="bg-[#0a0e17]">VIP / Ejecutivo</option>
            <option value="minibus" className="bg-[#0a0e17]">Minibus (15-25 personas)</option>
            <option value="micro" className="bg-[#0a0e17]">Micro / Bus (30-45 personas)</option>
            <option value="mixto" className="bg-[#0a0e17]">Mixto / No estoy seguro</option>
          </select>
        </div>

        {/* Comentario */}
        <div className="md:col-span-2">
          <label className="block text-xs text-white/40 mb-1.5">Detalles adicionales del evento</label>
          <textarea name="comentario" value={formData.comentario} onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white text-sm placeholder-white/20 focus:border-[#9C27B0]/50 focus:outline-none transition-colors h-28 resize-none"
            placeholder="Cuéntanos más sobre tu evento: ubicación, horarios, requisitos especiales, etc." />
        </div>
      </div>

      {/* Submit */}
      <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
        <button className="w-full sm:w-auto px-8 py-4 rounded-full text-lg font-semibold text-white bg-[#9C27B0] hover:bg-[#AB47BC] transition-all duration-300 shadow-[0_0_30px_rgba(156,39,176,0.3)] hover:shadow-[0_0_50px_rgba(156,39,176,0.5)] hover:scale-105">
          <ArrowRight className="w-5 h-5 inline mr-2" />
          Solicitar Cotización
        </button>
        <p className="text-xs text-white/30">Te contactamos en menos de 30 minutos · Sin compromiso</p>
      </div>
    </div>
  )
}
