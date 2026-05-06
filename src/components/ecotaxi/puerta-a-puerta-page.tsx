'use client'

import { useEffect, useRef, useState } from 'react'
import {
  DoorOpen, MapPin, UserCheck, Clock, Car, CheckCircle2,
  ArrowRight, Shield, Star, Users, Zap, Globe, Phone,
  Smartphone, MessageCircle, TrendingDown, Award,
  ChevronRight, Sparkles, Bus, Truck, Gavel, Handshake,
  Navigation, Radio,
} from 'lucide-react'

/* ─── Stats Data ─── */
const puertaStats = [
  { value: '100K+', label: 'Viajes completados', icon: Car },
  { value: '3', label: 'Niveles de subasta', icon: Gavel },
  { value: '4.8', label: 'Rating promedio', icon: Star },
  { value: '3', label: 'Ciudades principales', icon: MapPin },
]

/* ─── Service Features ─── */
const serviceFeatures = [
  {
    icon: MapPin,
    title: 'Recogida en tu Puerta',
    desc: 'El conductor llega exactamente a tu dirección. Sin caminar hasta una esquina ni esperar en la calle. Te recogemos donde estés.',
    color: '#00E676',
  },
  {
    icon: Navigation,
    title: 'Destino Exacto',
    desc: 'Te llevamos a la dirección precisa que indiques. Sin desvíos ni paradas innecesarias. De tu puerta a tu destino final.',
    color: '#0077BD',
  },
  {
    icon: UserCheck,
    title: 'Conductor Profesional',
    desc: 'Conductores certificados, verificados y con años de experiencia. Tu seguridad y confort son nuestra prioridad.',
    color: '#FF9800',
  },
  {
    icon: Clock,
    title: 'Sin Esperas',
    desc: 'Solicita tu taxi y en minutos tienes un conductor en camino. Sin filas, sin esperar en la calle, sin frustraciones.',
    color: '#8B5CF6',
  },
]

/* ─── How It Works Steps ─── */
const howItWorks = [
  {
    step: '01',
    title: 'Pide tu Taxi',
    desc: 'Solicita tu viaje desde la app, WhatsApp o llamada. Indica tu ubicación y destino.',
    icon: Smartphone,
    color: '#00E676',
  },
  {
    step: '02',
    title: 'Te Recogemos',
    desc: 'Un conductor profesional llega a tu puerta en minutos. Recibirás notificación cuando esté en camino.',
    icon: DoorOpen,
    color: '#0077BD',
  },
  {
    step: '03',
    title: 'Llegas a Destino',
    desc: 'Viaja cómodo y seguro hasta tu destino exacto. Paga fácil con tarjeta, efectivo o app.',
    icon: MapPin,
    color: '#FF9800',
  },
]

/* ─── Subastas (Auction) Levels ─── */
const subastaLevels = [
  {
    id: 'economy',
    name: 'Economy',
    subtitle: 'Mejor precio',
    icon: TrendingDown,
    desc: 'El sistema de subastas encuentra el mejor precio para tu viaje. Los conductores compiten por tu carrera, asegurándote la tarifa más baja del mercado.',
    features: [
      'Mejor precio garantizado',
      'Conductores compiten por tu viaje',
      'Ahorra hasta 40% vs taxi tradicional',
      'Ideal para trayectos cortos y medianos',
      'Tiempo de espera estimado',
      'Calificación del conductor visible',
    ],
    color: '#00E676',
    badge: 'Más Económico',
    exampleRates: [
      { zone: 'Zona Central', price: 'Bs 15' },
      { zone: 'Zona Norte', price: 'Bs 20' },
      { zone: 'Zona Sur', price: 'Bs 22' },
      { zone: 'Zona Este', price: 'Bs 18' },
    ],
  },
  {
    id: 'standard',
    name: 'Standard',
    subtitle: 'Equilibrio perfecto',
    icon: Shield,
    desc: 'La opción más popular. Balance perfecto entre precio, tiempo de espera y calidad del servicio. Conductores con mayor rating y vehículos en excelente estado.',
    features: [
      'Balance precio-calidad',
      'Conductores con rating 4.5+',
      'Vehículos en excelente estado',
      'Tiempo de espera moderado',
      'Aire acondicionado garantizado',
      'Seguro de pasajeros incluido',
    ],
    color: '#0077BD',
    badge: 'Más Popular',
    exampleRates: [
      { zone: 'Zona Central', price: 'Bs 25' },
      { zone: 'Zona Norte', price: 'Bs 30' },
      { zone: 'Zona Sur', price: 'Bs 32' },
      { zone: 'Zona Este', price: 'Bs 28' },
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    subtitle: 'Máximo confort',
    icon: Sparkles,
    desc: 'Viaja con el máximo confort y estilo. Vehículos de alta gama, conductores ejecutivos y servicio de primera clase para quienes buscan lo mejor.',
    features: [
      'Vehículos de alta gama',
      'Conductores ejecutivos certificados',
      'WiFi y agua a bordo',
      'Máximo confort y privacidad',
      'Prioridad en asignación',
      'Atención personalizada',
    ],
    color: '#FF9800',
    badge: 'Premium',
    exampleRates: [
      { zone: 'Zona Central', price: 'Bs 45' },
      { zone: 'Zona Norte', price: 'Bs 55' },
      { zone: 'Zona Sur', price: 'Bs 58' },
      { zone: 'Zona Este', price: 'Bs 50' },
    ],
  },
]

/* ─── Shared Rides ─── */
const sharedRideBenefits = [
  { icon: TrendingDown, text: 'Ahorra hasta 60% compartiendo viaje', color: '#00E676' },
  { icon: Handshake, text: 'Comparte con pasajeros de ruta similar', color: '#0077BD' },
  { icon: Globe, text: 'Menos tráfico, menos contaminación', color: '#FF9800' },
  { icon: Clock, text: 'Desvío mínimo, llegada rápida', color: '#8B5CF6' },
]

/* ─── City Coverage ─── */
const cityCoverage = [
  {
    name: 'Santa Cruz',
    desc: 'Cobertura total en la capital oriental. Zona Central, Norte, Sur, Este y periurbanos.',
    zones: 12,
    color: '#00E676',
  },
  {
    name: 'La Paz',
    desc: 'Desde el Centro hasta El Alto. Cobertura en la sede de gobierno con conductores locales expertos.',
    zones: 10,
    color: '#0077BD',
  },
  {
    name: 'Cochabamba',
    desc: 'El corazón de Bolivia cubierto. Zona Centro, Quillacollo, Tiquipaya y más.',
    zones: 8,
    color: '#FF9800',
  },
  {
    name: 'Sucre',
    desc: 'Capital constitucional con servicio disponible en zonas principales.',
    zones: 5,
    color: '#8B5CF6',
  },
  {
    name: 'Tarija',
    desc: 'Cobertura en el sur vitivinícola. Servicio en zona central y alrededores.',
    zones: 4,
    color: '#E91E63',
  },
  {
    name: 'Oruro',
    desc: 'Conexión con el altiplano. Disponible especialmente en temporada de Carnaval.',
    zones: 4,
    color: '#009688',
  },
]

/* ─── Available Vehicles ─── */
const availableVehicles = [
  {
    name: 'Sedán',
    icon: Car,
    desc: 'Cómodo y ágil para la ciudad. Ideal para 1-3 pasajeros con equipaje ligero y trayectos urbanos.',
    passengers: '1-3',
    color: '#0077BD',
    features: ['Aire acondicionado', 'Radio/Bluetooth', 'Asientos cómodos', 'Seguro incluido'],
    badge: 'Urbano',
  },
  {
    name: 'SUV',
    icon: Car,
    desc: 'Mayor espacio y potencia para recorridos con más equipaje o cuando necesitas confort adicional.',
    passengers: '1-4',
    color: '#00E676',
    features: ['Gran espacio', 'Mejor visibilidad', 'Equipaje amplio', 'Todo terreno urbano'],
    badge: 'Versátil',
  },
  {
    name: 'Van',
    icon: Bus,
    desc: 'Perfecta para grupos o familias. Espacio generoso para pasajeros y equipaje en un solo viaje.',
    passengers: '5-8',
    color: '#FF9800',
    features: ['8 pasajeros', 'Equipaje grande', 'A/C potente', 'Asientos reclinables'],
    badge: 'Familiar',
  },
]

/* ─── Reservation Channels ─── */
const reservationChannels = [
  {
    icon: Smartphone,
    title: 'App Ecotaxi',
    desc: 'Pide tu taxi en segundos.',
    color: '#00E676',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    desc: 'Escríbenos y te confirmamos.',
    color: '#25D366',
  },
  {
    icon: Phone,
    title: 'Teléfono',
    desc: 'Llámanos las 24 horas.',
    color: '#0077BD',
  },
]

/* ────────────────────────────────────────────────────────────
   COMPONENT
   ──────────────────────────────────────────────────────────── */
export function PuertaAPuertaPage() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null)
  const [visible, setVisible] = useState(false)
  const [animSections, setAnimSections] = useState<Record<string, boolean>>({})

  /* main visibility observer */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.05 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  /* per-section scroll observer */
  useEffect(() => {
    const sections = document.querySelectorAll('[data-animate-section]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-animate-section')
            if (id) setAnimSections((prev) => ({ ...prev, [id]: true }))
          }
        })
      },
      { threshold: 0.1 },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [visible])

  const selectedLevelData = subastaLevels.find((l) => l.id === selectedLevel)

  return (
    <div ref={sectionRef} className="min-h-screen bg-[#0a0e17] pt-20">

      {/* ═══════════════════════════════════════════════════════
          HERO
          ═══════════════════════════════════════════════════════ */}
      <section className="relative py-16 md:py-28 overflow-hidden">
        {/* gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#001a10] to-[#0a0e17]" />
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full bg-[#00E676]/10 blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#0077BD]/5 blur-[100px]" />
        <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] rounded-full bg-[#00E676]/5 blur-[80px]" />

        {/* floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-float"
              style={{
                left: `${10 + i * 16}%`,
                top: `${20 + (i % 3) * 22}%`,
                background: i % 3 === 0 ? '#00E676' : i % 3 === 1 ? '#0077BD' : '#FF9800',
                opacity: 0.15,
                animationDelay: `${i * 1.1}s`,
                animationDuration: `${5 + i}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 mb-6">
            <DoorOpen className="w-4 h-4 text-[#00E676]" />
            <span className="text-sm text-[#00E676]">Puerta a Puerta</span>
          </div>

          {/* title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
            Tu Taxi,{' '}
            <span className="bg-gradient-to-r from-[#00E676] via-[#00ff88] to-[#0077BD] bg-clip-text text-transparent">
              Tu Puerta
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/50 max-w-3xl mx-auto mb-8 leading-relaxed">
            Servicio de taxi urbano con recogida en tu puerta y destino exacto. Sistema de subastas
            para el mejor precio, viajes compartidos para ahorrar más, y cobertura en las principales ciudades de Bolivia.
          </p>

          {/* key feature pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {[
              { icon: DoorOpen, text: 'Recogida en tu puerta', color: '#00E676' },
              { icon: Gavel, text: 'Subastas de precio', color: '#0077BD' },
              { icon: Handshake, text: 'Viajes compartidos', color: '#FF9800' },
              { icon: Shield, text: 'Conductor profesional', color: '#8B5CF6' },
            ].map((feat) => (
              <div
                key={feat.text}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.06]"
              >
                <feat.icon className="w-4 h-4" style={{ color: feat.color }} />
                <span className="text-sm text-white/60">{feat.text}</span>
              </div>
            ))}
          </div>

          {/* animated scene SVG */}
          <div className="max-w-3xl mx-auto mb-6">
            <svg viewBox="0 0 800 180" className="w-full">
              {/* road */}
              <rect x="0" y="150" width="800" height="4" fill="#00E676" opacity="0.2" rx="2" />
              {[40, 140, 240, 340, 440, 540, 640, 740].map((x) => (
                <rect key={x} x={x} y="151" width="30" height="2" fill="#00E676" opacity="0.1" rx="1" />
              ))}

              {/* Door on left */}
              <g transform="translate(60, 85)">
                <rect x="0" y="0" width="35" height="55" rx="3" fill="#1a1a2e" stroke="#00E676" strokeWidth="0.8" />
                <rect x="3" y="5" width="12" height="20" rx="2" fill="#00E676" opacity="0.15" />
                <rect x="3" y="30" width="12" height="20" rx="2" fill="#00E676" opacity="0.15" />
                <circle cx="28" cy="28" r="2.5" fill="#00E676" opacity="0.5">
                  <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
                </circle>
                {/* Door opening arc */}
                <path d="M 35 55 Q 50 55, 50 40" fill="none" stroke="#00E676" strokeWidth="0.8" opacity="0.3" strokeDasharray="3,3" />
              </g>

              {/* Person walking */}
              <g transform="translate(115, 100)">
                <circle cx="0" cy="0" r="6" fill="#c4a882" opacity="0.7" />
                <rect x="-4" y="7" width="8" height="18" rx="3" fill="#1a1a2e" stroke="#0077BD" strokeWidth="0.5" />
                <line x1="-3" y1="25" x2="-5" y2="40" stroke="#c4a882" strokeWidth="2" opacity="0.6" />
                <line x1="3" y1="25" x2="5" y2="40" stroke="#c4a882" strokeWidth="2" opacity="0.6" />
                {/* Wave */}
                <line x1="4" y1="12" x2="14" y2="8" stroke="#c4a882" strokeWidth="1.5" opacity="0.5" />
              </g>

              {/* Taxi sedan */}
              <g>
                <rect x="200" y="118" width="65" height="26" rx="8" fill="#1a1a2e" stroke="#00E676" strokeWidth="0.8" />
                <rect x="204" y="122" width="15" height="11" rx="2" fill="#00E676" opacity="0.3" />
                <rect x="223" y="122" width="18" height="11" rx="2" fill="#00E676" opacity="0.2" />
                <rect x="245" y="122" width="14" height="11" rx="2" fill="#00E676" opacity="0.3" />
                <circle cx="214" cy="146" r="5" fill="#222" stroke="#00E676" strokeWidth="0.5" />
                <circle cx="250" cy="146" r="5" fill="#222" stroke="#00E676" strokeWidth="0.5" />
                {/* Taxi sign */}
                <rect x="218" y="115" width="28" height="5" rx="2" fill="#00E676" opacity="0.3">
                  <animate attributeName="opacity" values="0.2;0.5;0.2" dur="2s" repeatCount="indefinite" />
                </rect>
              </g>

              {/* SUV */}
              <g>
                <rect x="350" y="112" width="70" height="30" rx="8" fill="#1a1a2e" stroke="#0077BD" strokeWidth="0.8" />
                <rect x="354" y="116" width="16" height="12" rx="2" fill="#0077BD" opacity="0.25" />
                <rect x="374" y="116" width="18" height="12" rx="2" fill="#0077BD" opacity="0.15" />
                <rect x="396" y="116" width="16" height="12" rx="2" fill="#0077BD" opacity="0.25" />
                <circle cx="364" cy="144" r="5.5" fill="#222" stroke="#0077BD" strokeWidth="0.5" />
                <circle cx="406" cy="144" r="5.5" fill="#222" stroke="#0077BD" strokeWidth="0.5" />
              </g>

              {/* Van */}
              <g>
                <rect x="500" y="108" width="85" height="34" rx="6" fill="#1a1a2e" stroke="#FF9800" strokeWidth="0.8" />
                {[0, 1, 2, 3].map((i) => (
                  <rect key={i} x={508 + i * 18} y="113" width="13" height="10" rx="2" fill="#FF9800" opacity="0.2" />
                ))}
                <circle cx="518" cy="144" r="5" fill="#222" stroke="#FF9800" strokeWidth="0.5" />
                <circle cx="568" cy="144" r="5" fill="#222" stroke="#FF9800" strokeWidth="0.5" />
              </g>

              {/* Destination house */}
              <g transform="translate(680, 80)">
                <rect x="0" y="20" width="40" height="45" rx="2" fill="#1a1a2e" stroke="#00E676" strokeWidth="0.6" />
                <polygon points="-5,20 20,5 45,20" fill="#1a1a2e" stroke="#00E676" strokeWidth="0.6" />
                <rect x="14" y="38" width="12" height="18" rx="1" fill="#00E676" opacity="0.15" />
                <rect x="5" y="28" width="8" height="8" rx="1" fill="#0077BD" opacity="0.2" />
                <rect x="27" y="28" width="8" height="8" rx="1" fill="#0077BD" opacity="0.2" />
                {/* Door checkmark */}
                <circle cx="20" cy="47" r="3" fill="#00E676" opacity="0.4">
                  <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2.5s" repeatCount="indefinite" />
                </circle>
              </g>

              {/* sparkle decorations */}
              <circle cx="180" cy="100" r="2" fill="#00E676" opacity="0.4">
                <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx="330" cy="90" r="1.5" fill="#0077BD" opacity="0.4">
                <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="490" cy="85" r="2" fill="#FF9800" opacity="0.4">
                <animate attributeName="opacity" values="0.2;0.5;0.2" dur="2s" repeatCount="indefinite" />
              </circle>

              {/* Directional arrows */}
              <path d="M 600 130 L 620 130 L 615 125 M 620 130 L 615 135" stroke="#00E676" strokeWidth="1.5" fill="none" opacity="0.3" />
              <path d="M 640 130 L 660 130 L 655 125 M 660 130 L 655 135" stroke="#00E676" strokeWidth="1.5" fill="none" opacity="0.2" />
            </svg>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => document.getElementById('puerta-subastas')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 rounded-full text-lg font-semibold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all duration-300 shadow-[0_0_30px_rgba(0,230,118,0.3)] hover:shadow-[0_0_50px_rgba(0,230,118,0.5)] hover:scale-105"
            >
              <Gavel className="w-5 h-5 inline mr-2" />
              Ver Subastas
            </button>
            <button
              onClick={() => document.getElementById('puerta-vehiculos')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 rounded-full text-lg font-semibold text-white border border-white/20 hover:border-[#00E676]/50 hover:bg-white/5 transition-all duration-300"
            >
              <Car className="w-5 h-5 inline mr-2" />
              Ver Vehículos
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          STATS
          ═══════════════════════════════════════════════════════ */}
      <section className="py-10 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {puertaStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="w-6 h-6 text-[#00E676] mx-auto mb-2" />
                <div className="text-3xl md:text-4xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-white/40 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SERVICE FEATURES
          ═══════════════════════════════════════════════════════ */}
      <section
        data-animate-section="features"
        className={`py-16 md:py-24 transition-all duration-700 ${
          animSections['features'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 mb-4">
              <DoorOpen className="w-4 h-4 text-[#00E676]" />
              <span className="text-sm text-[#00E676]">Servicio Puerta a Puerta</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Todo Comienza en{' '}
              <span className="bg-gradient-to-r from-[#00E676] to-[#0077BD] bg-clip-text text-transparent">
                Tu Puerta
              </span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              Nuestro servicio de taxi urbano te ofrece la comodidad de ser recogido donde estés
              y llevado exactamente a donde necesitas ir.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {serviceFeatures.map((feat) => (
              <div
                key={feat.title}
                className="group relative p-8 md:p-10 rounded-3xl bg-white/[0.03] border border-white/[0.06] hover:border-white/10 hover:bg-white/[0.05] transition-all duration-500"
              >
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ boxShadow: `0 0 30px ${feat.color}10` }}
                />
                <div className="relative z-10 flex items-start gap-5">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
                    style={{ background: `${feat.color}15` }}
                  >
                    <feat.icon className="w-8 h-8" style={{ color: feat.color }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{feat.title}</h3>
                    <p className="text-sm text-white/40 leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          HOW IT WORKS
          ═══════════════════════════════════════════════════════ */}
      <section
        data-animate-section="how-it-works"
        className={`py-16 md:py-24 bg-gradient-to-b from-[#0a0e17] via-[#0d1830] to-[#0a0e17] transition-all duration-700 ${
          animSections['how-it-works'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0077BD]/10 border border-[#0077BD]/20 mb-4">
              <ArrowRight className="w-4 h-4 text-[#0077BD]" />
              <span className="text-sm text-[#0077BD]">Proceso Simple</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Cómo{' '}
              <span className="bg-gradient-to-r from-[#0077BD] to-[#00E676] bg-clip-text text-transparent">
                Funciona
              </span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              En solo tres pasos simples, estás en camino. Pide, te recogemos, llegas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <div key={step.step} className="relative">
                {/* Connector line */}
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-[calc(50%+60px)] w-[calc(100%-120px)] h-px bg-gradient-to-r from-white/10 to-white/10" />
                )}
                <div className="text-center">
                  {/* Step number ring */}
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <div
                      className="absolute inset-0 rounded-full opacity-20"
                      style={{ background: `radial-gradient(circle, ${step.color}30, transparent 70%)` }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="w-20 h-20 rounded-2xl flex items-center justify-center"
                        style={{ background: `${step.color}15` }}
                      >
                        <step.icon className="w-10 h-10" style={{ color: step.color }} />
                      </div>
                    </div>
                    <div
                      className="absolute -top-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                      style={{ background: step.color }}
                    >
                      {step.step}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed max-w-xs mx-auto">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SUBASTAS (AUCTION) SYSTEM
          ═══════════════════════════════════════════════════════ */}
      <section id="puerta-subastas" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            data-animate-section="subastas"
            className={`text-center mb-12 transition-all duration-700 ${
              animSections['subastas'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF9800]/10 border border-[#FF9800]/20 mb-4">
              <Gavel className="w-4 h-4 text-[#FF9800]" />
              <span className="text-sm text-[#FF9800]">Sistema de Subastas</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              El Mejor Precio por{' '}
              <span className="bg-gradient-to-r from-[#FF9800] to-[#00E676] bg-clip-text text-transparent">
                Subasta
              </span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              Nuestro sistema de subastas permite que los conductores compitan por tu viaje,
              asegurándote siempre el mejor precio. Elige entre tres niveles según tu necesidad.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            {/* Level cards */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {subastaLevels.map((level) => {
                  const isSelected = selectedLevel === level.id
                  return (
                    <button
                      key={level.id}
                      onClick={() => setSelectedLevel(isSelected ? null : level.id)}
                      className={`group relative p-6 rounded-2xl text-left transition-all duration-300 ${
                        isSelected
                          ? 'bg-white/[0.06] border-2'
                          : 'bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-white/10'
                      } ${level.id === 'standard' && !isSelected ? 'border-[#0077BD]/20' : ''}`}
                      style={isSelected ? { borderColor: `${level.color}40` } : {}}
                    >
                      {isSelected && (
                        <div
                          className="absolute inset-0 rounded-2xl opacity-20"
                          style={{ boxShadow: `0 0 25px ${level.color}30` }}
                        />
                      )}
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center"
                            style={{ background: `${level.color}15` }}
                          >
                            <level.icon className="w-6 h-6" style={{ color: level.color }} />
                          </div>
                          <span
                            className="px-2.5 py-1 rounded-full text-[10px] font-semibold"
                            style={{ background: `${level.color}15`, color: level.color }}
                          >
                            {level.badge}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-1">{level.name}</h3>
                        <p className="text-xs text-white/40 mb-3">{level.subtitle}</p>
                        <p className="text-sm text-white/40 leading-relaxed line-clamp-3">{level.desc}</p>

                        {isSelected && (
                          <ChevronRight
                            className="w-4 h-4 absolute top-6 right-4 rotate-90"
                            style={{ color: level.color }}
                          />
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Detail panel */}
            <div className="lg:col-span-2">
              {selectedLevelData ? (
                <div
                  className="p-6 rounded-3xl bg-white/[0.03] border transition-all duration-500"
                  style={{ borderColor: `${selectedLevelData.color}30` }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: `${selectedLevelData.color}15` }}
                    >
                      <selectedLevelData.icon
                        className="w-6 h-6"
                        style={{ color: selectedLevelData.color }}
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{selectedLevelData.name}</h3>
                      <p className="text-xs" style={{ color: selectedLevelData.color }}>
                        {selectedLevelData.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-white/40 leading-relaxed mb-6">{selectedLevelData.desc}</p>

                  <h4 className="text-sm font-semibold text-white/60 mb-3 uppercase tracking-wider">
                    Beneficios Incluidos
                  </h4>
                  <div className="space-y-2 mb-6">
                    {selectedLevelData.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.05]"
                      >
                        <CheckCircle2
                          className="w-4 h-4 shrink-0"
                          style={{ color: selectedLevelData.color }}
                        />
                        <span className="text-sm text-white/60">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <h4 className="text-sm font-semibold text-white/60 mb-3 uppercase tracking-wider">
                    Tarifas Referenciales
                  </h4>
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {selectedLevelData.exampleRates.map((r) => (
                      <div
                        key={r.zone}
                        className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]"
                      >
                        <p className="text-xs text-white/30">{r.zone}</p>
                        <p className="text-lg font-bold" style={{ color: selectedLevelData.color }}>
                          {r.price}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-white/40">
                      <Shield className="w-4 h-4 text-[#00E676]" />
                      <span>Seguro de pasajeros incluido</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/40">
                      <Gavel className="w-4 h-4 text-[#FF9800]" />
                      <span>Precio por subasta competitiva</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/40">
                      <Clock className="w-4 h-4 text-[#0077BD]" />
                      <span>Asignación en minutos</span>
                    </div>
                  </div>

                  <button
                    className="w-full px-6 py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:scale-105"
                    style={{
                      background: selectedLevelData.color,
                      boxShadow: `0 0 20px ${selectedLevelData.color}30`,
                    }}
                  >
                    Pedir {selectedLevelData.name}
                  </button>
                </div>
              ) : (
                <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.06] text-center">
                  <Gavel className="w-12 h-12 text-white/10 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white/40 mb-2">Selecciona un Nivel</h3>
                  <p className="text-sm text-white/25">
                    Haz click en Economy, Standard o Premium para ver los detalles, tarifas
                    y beneficios de cada nivel de subasta.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SHARED RIDES
          ═══════════════════════════════════════════════════════ */}
      <section
        data-animate-section="shared-rides"
        className={`py-16 md:py-24 bg-gradient-to-b from-[#0a0e17] via-[#0d1830] to-[#0a0e17] transition-all duration-700 ${
          animSections['shared-rides'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-[#00E676]/5 to-[#0077BD]/5 border border-[#00E676]/10 overflow-hidden">
            {/* Background orbs */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#00E676]/5 blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#0077BD]/5 blur-[60px]" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 mb-6">
                  <Handshake className="w-4 h-4 text-[#00E676]" />
                  <span className="text-sm text-[#00E676]">Viaje Compartido</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Comparte Viaje,{' '}
                  <span className="bg-gradient-to-r from-[#00E676] to-[#0077BD] bg-clip-text text-transparent">
                    Paga Menos
                  </span>
                </h2>
                <p className="text-white/50 leading-relaxed mb-8">
                  Nuestro sistema de viajes compartidos conecta pasajeros con rutas similares
                  para que viajen juntos y paguen menos. Ahorra hasta 60% compartiendo tu taxi
                  con otros pasajeros que van en la misma dirección.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {sharedRideBenefits.map((benefit) => (
                    <div
                      key={benefit.text}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]"
                    >
                      <benefit.icon className="w-5 h-5 shrink-0" style={{ color: benefit.color }} />
                      <span className="text-sm text-white/60">{benefit.text}</span>
                    </div>
                  ))}
                </div>

                <button className="px-8 py-4 rounded-full text-lg font-semibold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all duration-300 shadow-[0_0_30px_rgba(0,230,118,0.3)] hover:shadow-[0_0_50px_rgba(0,230,118,0.5)] hover:scale-105">
                  <Handshake className="w-5 h-5 inline mr-2" />
                  Compartir Viaje
                </button>
              </div>

              {/* Shared ride mockup */}
              <div className="flex justify-center">
                <div className="w-full max-w-md p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                  {/* Map-like header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-[#00E676]/10 flex items-center justify-center">
                      <Handshake className="w-5 h-5 text-[#00E676]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white/70">Viaje Compartido</p>
                      <p className="text-xs text-white/30">3 pasajeros · Ruta similar</p>
                    </div>
                  </div>

                  {/* Route visualization */}
                  <div className="space-y-4 mb-6">
                    {/* Origin */}
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#00E676]/15 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-[#00E676]" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white/70">Av. Monseñor Rivero</p>
                        <p className="text-xs text-white/30">Santa Cruz</p>
                      </div>
                    </div>

                    {/* Route line with passengers */}
                    <div className="ml-4 border-l-2 border-dashed border-white/10 pl-6 py-2 space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-[#0077BD]/20 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-[#0077BD]" />
                        </div>
                        <span className="text-xs text-white/40">Pasajero 2 se une · Radial 27</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-[#FF9800]/20 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-[#FF9800]" />
                        </div>
                        <span className="text-xs text-white/40">Pasajero 3 se une · 3er Anillo</span>
                      </div>
                    </div>

                    {/* Destination */}
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#FF9800]/15 flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-[#FF9800]" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white/70">Equipetrol Norte</p>
                        <p className="text-xs text-white/30">Santa Cruz</p>
                      </div>
                    </div>
                  </div>

                  {/* Savings card */}
                  <div className="p-4 rounded-xl bg-[#00E676]/5 border border-[#00E676]/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-white/40">Ahorro compartiendo</p>
                        <p className="text-2xl font-bold text-[#00E676]">-60%</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-red-400/50 line-through">Bs 30</p>
                        <p className="text-lg font-bold text-white">Bs 12</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CITY COVERAGE
          ═══════════════════════════════════════════════════════ */}
      <section
        data-animate-section="coverage"
        className={`py-16 md:py-24 transition-all duration-700 ${
          animSections['coverage'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0077BD]/10 border border-[#0077BD]/20 mb-4">
              <Globe className="w-4 h-4 text-[#0077BD]" />
              <span className="text-sm text-[#0077BD]">Cobertura Nacional</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Principales{' '}
              <span className="bg-gradient-to-r from-[#0077BD] to-[#00E676] bg-clip-text text-transparent">
                Ciudades de Bolivia
              </span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              Servicio disponible en las principales ciudades del país con cobertura
              amplia en cada zona urbana.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cityCoverage.map((city) => (
              <div
                key={city.name}
                className="group relative p-6 md:p-8 rounded-3xl bg-white/[0.03] border border-white/[0.06] hover:border-white/10 hover:bg-white/[0.05] transition-all duration-500"
              >
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ boxShadow: `0 0 30px ${city.color}10` }}
                />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{ background: `${city.color}15` }}
                    >
                      <MapPin className="w-7 h-7" style={{ color: city.color }} />
                    </div>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{ background: `${city.color}15`, color: city.color }}
                    >
                      {city.zones} zonas
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{city.name}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{city.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          AVAILABLE VEHICLES
          ═══════════════════════════════════════════════════════ */}
      <section
        id="puerta-vehiculos"
        data-animate-section="vehicles"
        className={`py-16 md:py-24 bg-gradient-to-b from-[#0a0e17] via-[#0d1830] to-[#0a0e17] transition-all duration-700 ${
          animSections['vehicles'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF9800]/10 border border-[#FF9800]/20 mb-4">
              <Car className="w-4 h-4 text-[#FF9800]" />
              <span className="text-sm text-[#FF9800]">Vehículos Disponibles</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Elige tu{' '}
              <span className="bg-gradient-to-r from-[#FF9800] to-[#00E676] bg-clip-text text-transparent">
                Vehículo
              </span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              Tres tipos de vehículo para cada necesidad. Desde un sedán ágil hasta una van espaciosa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {availableVehicles.map((vehicle) => (
              <div
                key={vehicle.name}
                className="group relative p-6 md:p-8 rounded-3xl bg-white/[0.03] border border-white/[0.06] hover:border-white/10 hover:bg-white/[0.05] transition-all duration-500"
              >
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ boxShadow: `0 0 30px ${vehicle.color}10` }}
                />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{ background: `${vehicle.color}15` }}
                    >
                      <vehicle.icon className="w-7 h-7" style={{ color: vehicle.color }} />
                    </div>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{ background: `${vehicle.color}15`, color: vehicle.color }}
                    >
                      {vehicle.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{vehicle.name}</h3>
                  <p className="text-sm text-white/40 leading-relaxed mb-4">{vehicle.desc}</p>

                  <div className="flex items-center gap-2 mb-4 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                    <Users className="w-4 h-4" style={{ color: vehicle.color }} />
                    <span className="text-sm text-white/60">{vehicle.passengers} pasajeros</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {vehicle.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: vehicle.color }} />
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

      {/* ═══════════════════════════════════════════════════════
          CTA SECTION
          ═══════════════════════════════════════════════════════ */}
      <section
        data-animate-section="cta"
        className={`py-16 md:py-24 transition-all duration-700 ${
          animSections['cta'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-[#00E676]/10 to-[#0077BD]/5 border border-[#00E676]/20 overflow-hidden">
            {/* Background orbs */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#00E676]/5 blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#0077BD]/5 blur-[60px]" />

            <div className="relative z-10 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 mb-6">
                <Zap className="w-4 h-4 text-[#00E676]" />
                <span className="text-sm text-[#00E676]">Pide tu Taxi Ahora</span>
              </div>

              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Tu Taxi Está a{' '}
                <span className="bg-gradient-to-r from-[#00E676] to-[#0077BD] bg-clip-text text-transparent">
                  Un Click
                </span>
              </h2>

              <p className="text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
                Recogida en tu puerta, destino exacto, conductor profesional y el mejor precio por subasta.
                Pide tu taxi ahora y experimenta la diferencia Ecotaxi.
              </p>

              {/* Reservation channels */}
              <div className="flex flex-wrap justify-center gap-4 mb-10">
                {reservationChannels.map((channel) => (
                  <button
                    key={channel.title}
                    className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/10 hover:bg-white/[0.05] transition-all duration-300"
                  >
                    <channel.icon className="w-5 h-5" style={{ color: channel.color }} />
                    <div className="text-left">
                      <p className="text-sm font-semibold text-white/80">{channel.title}</p>
                      <p className="text-xs text-white/30">{channel.desc}</p>
                    </div>
                  </button>
                ))}
              </div>

              <button className="px-10 py-5 rounded-full text-xl font-semibold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all duration-300 shadow-[0_0_40px_rgba(0,230,118,0.3)] hover:shadow-[0_0_60px_rgba(0,230,118,0.5)] hover:scale-105">
                <DoorOpen className="w-6 h-6 inline mr-2" />
                Pedir Taxi Puerta a Puerta
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
