'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Clock, Car, CreditCard, Smartphone, Phone, Globe,
  CheckCircle2, ArrowRight, Shield, Star, Users, MapPin,
  Zap, Wallet, Timer, Route, ChevronRight, Sparkles,
  Award, TrendingDown, MessageCircle, Bus, Truck,
} from 'lucide-react'

/* ────────────────────────────────────────────────────────────
   DATA
   ──────────────────────────────────────────────────────────── */

const porHoraStats = [
  { value: '10K+', label: 'Horas alquiladas', icon: Clock },
  { value: '80%', label: 'Ahorro vs taxi', icon: TrendingDown },
  { value: '4.9', label: 'Rating promedio', icon: Star },
  { value: '24/7', label: 'Disponibilidad', icon: Shield },
]

const paymentModels = [
  {
    id: 'por-zona',
    name: 'Por Zona',
    subtitle: 'Tarifa fija por zona',
    icon: MapPin,
    desc: 'Paga según la zona de cobertura que necesites. Tarifas fijas y transparentes por cada zona de la ciudad, sin sorpresas ni contador corriendo. Ideal para quienes se mueven dentro de un área específica.',
    features: [
      'Tarifas fijas por zona de cobertura',
      'Sin contador ni sorpresas',
      'Ideal para recorridos dentro de un área',
      'Cobertura total en la zona elegida',
      'Múltiples paradas incluidas',
      'Sin límite de kilómetros en la zona',
    ],
    color: '#0077BD',
    badge: 'Más Económico',
    highlight: false,
    exampleZones: [
      { zone: 'Zona Central', price: 'Bs 100' },
      { zone: 'Zona Norte', price: 'Bs 100' },
      { zone: 'Zona Sur', price: 'Bs 100' },
      { zone: 'Zona Este', price: 'Bs 100' },
    ],
  },
  {
    id: 'horas-libres',
    name: 'Horas Libres',
    subtitle: 'Libertad total',
    icon: Route,
    desc: 'Alquila por hora y ve a donde quieras, sin restricciones de zona. La opción más flexible que te da total libertad de movimiento con un ahorro de hasta 80% comparado con taxi tradicional.',
    features: [
      'Sin restricciones de zona',
      'Ve a donde quieras',
      'Ahorra hasta 80% vs taxi tradicional',
      'Múltiples destinos sin costo extra',
      'Conductor a tu disposición completa',
      'Ideal para recorridos múltiples',
    ],
    color: '#FF9800',
    badge: 'Más Popular',
    highlight: true,
    exampleRates: [
      { hours: '1 hora', price: 'Bs 50' },
      { hours: '2 horas', price: 'Bs 100' },
      { hours: '4 horas', price: 'Bs 180' },
      { hours: '8 horas', price: 'Bs 350' },
    ],
  },
]

const vehicleTypes = [
  {
    name: 'Sedán Confort',
    icon: Car,
    desc: 'Vehículo cómodo y confiable para traslados diarios. Ideal para 1-3 pasajeros con equipaje ligero.',
    passengers: '1-3',
    color: '#0077BD',
    features: ['Aire acondicionado', 'Radio/Bluetooth', 'Asientos cómodos', 'Seguro incluido'],
    badge: 'Económico',
  },
  {
    name: 'Sedán VIP',
    icon: Sparkles,
    desc: 'Experiencia premium con vehículo de alta gama. Para quienes buscan elegancia y máximo confort.',
    passengers: '1-3',
    color: '#8B5CF6',
    features: ['Cuero premium', 'WiFi a bordo', 'Agua y amenities', 'Chofer ejecutivo'],
    badge: 'Premium',
  },
  {
    name: 'SUV',
    icon: Car,
    desc: 'Potencia y espacio para recorridos con más equipaje o grupos pequeños que valoran el confort adicional.',
    passengers: '1-4',
    color: '#00E676',
    features: ['Gran espacio', 'Todo terreno', 'Equipaje amplio', 'Mayor altura'],
    badge: 'Versátil',
  },
  {
    name: 'Van',
    icon: Bus,
    desc: 'Perfecta para grupos medianos o familias que viajan juntas. Espacio generoso para pasajeros y equipaje.',
    passengers: '5-8',
    color: '#FF9800',
    features: ['8 pasajeros', 'Equipaje grande', 'A/C potente', 'Asientos reclinables'],
    badge: 'Familiar',
  },
  {
    name: 'Minibus',
    icon: Bus,
    desc: 'La solución para grupos más grandes. Confort y seguridad para eventos, excursiones y traslados grupales.',
    passengers: '15-25',
    color: '#E91E63',
    features: ['25 pasajeros', 'A/C central', 'Micrófono', 'Puerta amplia'],
    badge: 'Grupal',
  },
  {
    name: 'Micro',
    icon: Truck,
    desc: 'Máxima capacidad para grandes grupos. Transporte masivo con logística profesional y el mejor costo por persona.',
    passengers: '30-45',
    color: '#009688',
    features: ['45 pasajeros', 'Logística total', 'Coordinación', 'Mejor precio/persona'],
    badge: 'Masivo',
  },
]

const keyBenefits = [
  {
    icon: CreditCard,
    title: 'Sin Tarjeta de Crédito',
    desc: 'No necesitas tarjeta de crédito para alquilar. Paga en efectivo, transferencia o con la app. Sin trámites bancarios.',
    color: '#00E676',
  },
  {
    icon: Shield,
    title: 'Sin Contratos',
    desc: 'Alquila cuando quieras, sin compromisos de permanencia ni contratos que firmar. Usa el servicio bajo tus términos.',
    color: '#0077BD',
  },
  {
    icon: Timer,
    title: 'Sin Mínimos',
    desc: 'Desde 1 hora hasta todo el día. No hay mínimos obligatorios, alquila solo el tiempo que realmente necesites.',
    color: '#FF9800',
  },
  {
    icon: TrendingDown,
    title: 'Ahorra Hasta 80%',
    desc: 'Comparado con taxi tradicional, alquilar por hora te ahorra hasta un 80% en recorridos múltiples durante el día.',
    color: '#8B5CF6',
  },
]

const comparisonData = [
  { scenario: '3 paradas en 4 horas', taxi: 'Bs 320', ecotaxi: 'Bs 180', saving: '44%' },
  { scenario: 'Día completo (8 horas)', taxi: 'Bs 600+', ecotaxi: 'Bs 350', saving: '42%' },
  { scenario: '5 recorridos cortos', taxi: 'Bs 250', ecotaxi: 'Bs 100', saving: '60%' },
  { scenario: 'Tour ciudad (6 horas)', taxi: 'Bs 400', ecotaxi: 'Bs 180', saving: '55%' },
  { scenario: 'Reuniones múltiples (4 horas)', taxi: 'Bs 300', ecotaxi: 'Bs 180', saving: '40%' },
]

const reservationChannels = [
  {
    icon: Smartphone,
    title: 'App Ecotaxi',
    desc: 'Reserva en segundos desde tu celular. Seguimiento en tiempo real, pago digital y notificaciones de tu conductor.',
    color: '#00E676',
    badge: 'Recomendado',
    detail: 'Disponible en iOS y Android',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    desc: 'Escríbenos por WhatsApp y recibe tu confirmación al instante. Atención personalizada las 24 horas.',
    color: '#25D366',
    badge: 'Rápido',
    detail: '+591 70000000',
  },
  {
    icon: Phone,
    title: 'Teléfono',
    desc: 'Llámanos y un operador gestiona tu reserva de inmediato. Ideal si prefieres atención directa por voz.',
    color: '#0077BD',
    badge: 'Directo',
    detail: '700-00000',
  },
  {
    icon: Globe,
    title: 'Web',
    desc: 'Reserva desde nuestra página web en cualquier dispositivo. Formulario simple y confirmación inmediata.',
    color: '#FF9800',
    badge: 'Fácil',
    detail: 'ecotaxi.bo/reservar',
  },
]

/* ────────────────────────────────────────────────────────────
   COMPONENT
   ──────────────────────────────────────────────────────────── */

export function PorHoraPage() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [selectedModel, setSelectedModel] = useState<string | null>(null)
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

  const selectedModelData = paymentModels.find((m) => m.id === selectedModel)

  return (
    <div ref={sectionRef} className="min-h-screen bg-[#0a0e17] pt-20">

      {/* ═══════════════════════════════════════════════════════
          HERO
          ═══════════════════════════════════════════════════════ */}
      <section className="relative py-16 md:py-28 overflow-hidden">
        {/* background image cover */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/por-hora-hero.webp')" }}
        />
        {/* dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17]/80 via-[#0a0e17]/70 to-[#0a0e17]/90" />

        {/* floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-float"
              style={{
                left: `${10 + i * 16}%`,
                top: `${20 + (i % 3) * 22}%`,
                background: i % 3 === 0 ? '#FF9800' : i % 3 === 1 ? '#00E676' : '#0077BD',
                opacity: 0.15,
                animationDelay: `${i * 1.1}s`,
                animationDuration: `${5 + i}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF9800]/10 border border-[#FF9800]/20 mb-6">
            <Clock className="w-4 h-4 text-[#FF9800]" />
            <span className="text-sm text-[#FF9800]">Alquiler por Hora</span>
          </div>

          {/* title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            Tu vehículo con chofer,{' '}
            <span className="bg-gradient-to-r from-[#FF9800] via-[#FFB74D] to-[#00E676] bg-clip-text text-transparent">
              el tiempo que necesites
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/50 max-w-3xl mx-auto mb-8 leading-relaxed">
            Dos modelos flexibles de pago: por zona con tarifas fijas o horas libres para ir donde quieras.
            Sin tarjeta de crédito, sin contratos, sin mínimos. Ahorra hasta 80% vs taxi tradicional.
          </p>

          {/* key feature pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {[
              { icon: CreditCard, text: 'Sin tarjeta de crédito', color: '#00E676' },
              { icon: Shield, text: 'Sin contratos', color: '#0077BD' },
              { icon: Timer, text: 'Sin mínimos', color: '#FF9800' },
              { icon: TrendingDown, text: 'Ahorra hasta 80%', color: '#8B5CF6' },
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
              <rect x="0" y="150" width="800" height="4" fill="#FF9800" opacity="0.2" rx="2" />
              {[40, 140, 240, 340, 440, 540, 640, 740].map((x) => (
                <rect key={x} x={x} y="151" width="30" height="2" fill="#FF9800" opacity="0.1" rx="1" />
              ))}

              {/* large clock */}
              <g transform="translate(80, 80)">
                <circle cx="30" cy="30" r="25" fill="none" stroke="#FF9800" strokeWidth="1.5" opacity="0.3" />
                <line x1="30" y1="30" x2="30" y2="15" stroke="#FF9800" strokeWidth="1.5" opacity="0.4" />
                <line x1="30" y1="30" x2="42" y2="30" stroke="#FF9800" strokeWidth="1.5" opacity="0.4" />
                <circle cx="30" cy="30" r="2" fill="#FF9800" opacity="0.5">
                  <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite" />
                </circle>
              </g>

              {/* sedan */}
              <g>
                <rect x="200" y="118" width="65" height="26" rx="8" fill="#1a1a2e" stroke="#0077BD" strokeWidth="0.8" />
                <rect x="204" y="122" width="15" height="11" rx="2" fill="#0077BD" opacity="0.3" />
                <rect x="223" y="122" width="18" height="11" rx="2" fill="#0077BD" opacity="0.2" />
                <rect x="245" y="122" width="14" height="11" rx="2" fill="#0077BD" opacity="0.3" />
                <circle cx="214" cy="146" r="5" fill="#222" stroke="#0077BD" strokeWidth="0.5" />
                <circle cx="250" cy="146" r="5" fill="#222" stroke="#0077BD" strokeWidth="0.5" />
              </g>

              {/* SUV */}
              <g>
                <rect x="350" y="112" width="70" height="30" rx="8" fill="#1a1a2e" stroke="#00E676" strokeWidth="0.8" />
                <rect x="354" y="116" width="16" height="12" rx="2" fill="#00E676" opacity="0.25" />
                <rect x="374" y="116" width="18" height="12" rx="2" fill="#00E676" opacity="0.15" />
                <rect x="396" y="116" width="16" height="12" rx="2" fill="#00E676" opacity="0.25" />
                <circle cx="364" cy="144" r="5.5" fill="#222" stroke="#00E676" strokeWidth="0.5" />
                <circle cx="406" cy="144" r="5.5" fill="#222" stroke="#00E676" strokeWidth="0.5" />
              </g>

              {/* van */}
              <g>
                <rect x="500" y="108" width="85" height="34" rx="6" fill="#1a1a2e" stroke="#FF9800" strokeWidth="0.8" />
                {[0, 1, 2, 3].map((i) => (
                  <rect key={i} x={508 + i * 18} y="113" width="13" height="10" rx="2" fill="#FF9800" opacity="0.2" />
                ))}
                <circle cx="518" cy="144" r="5" fill="#222" stroke="#FF9800" strokeWidth="0.5" />
                <circle cx="568" cy="144" r="5" fill="#222" stroke="#FF9800" strokeWidth="0.5" />
                <text x="542" y="135" textAnchor="middle" fill="#FF9800" fontSize="7" opacity="0.4">HOUR</text>
              </g>

              {/* rotating clock decoration */}
              <g transform="translate(620, 90)">
                <circle cx="20" cy="20" r="18" fill="none" stroke="#FF9800" strokeWidth="1" opacity="0.2" />
                <line x1="20" y1="20" x2="20" y2="10" stroke="#FF9800" strokeWidth="1" opacity="0.3">
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 20 20"
                    to="360 20 20"
                    dur="60s"
                    repeatCount="indefinite"
                  />
                </line>
                <line x1="20" y1="20" x2="28" y2="20" stroke="#FF9800" strokeWidth="1" opacity="0.3" />
              </g>

              {/* sparkles */}
              <circle cx="180" cy="100" r="2" fill="#FF9800" opacity="0.4">
                <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx="330" cy="90" r="1.5" fill="#00E676" opacity="0.4">
                <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="490" cy="85" r="2" fill="#0077BD" opacity="0.4">
                <animate attributeName="opacity" values="0.2;0.5;0.2" dur="2s" repeatCount="indefinite" />
              </circle>

              {/* arrow */}
              <path
                d="M 700 130 L 720 130 L 715 125 M 720 130 L 715 135"
                stroke="#FF9800"
                strokeWidth="1.5"
                fill="none"
                opacity="0.3"
              />
            </svg>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() =>
                document.getElementById('por-hora-modelos')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="px-8 py-4 rounded-full text-lg font-semibold text-black bg-[#FF9800] hover:bg-[#FFB74D] transition-all duration-300 shadow-[0_0_30px_rgba(255,152,0,0.3)] hover:shadow-[0_0_50px_rgba(255,152,0,0.5)] hover:scale-105"
            >
              <Clock className="w-5 h-5 inline mr-2" />
              Ver Modelos de Pago
            </button>
            <button
              onClick={() =>
                document.getElementById('por-hora-vehiculos')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="px-8 py-4 rounded-full text-lg font-semibold text-white border border-white/20 hover:border-[#FF9800]/50 hover:bg-white/5 transition-all duration-300"
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
            {porHoraStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="w-6 h-6 text-[#FF9800] mx-auto mb-2" />
                <div className="text-3xl md:text-4xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-white/40 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          PAYMENT MODELS
          ═══════════════════════════════════════════════════════ */}
      <section id="por-hora-modelos" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* header */}
          <div
            data-animate-section="models"
            className={`text-center mb-12 transition-all duration-700 ${
              animSections['models'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF9800]/10 border border-[#FF9800]/20 mb-4">
              <Wallet className="w-4 h-4 text-[#FF9800]" />
              <span className="text-sm text-[#FF9800]">Modelos de Pago</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Dos Formas de{' '}
              <span className="bg-gradient-to-r from-[#FF9800] to-[#00E676] bg-clip-text text-transparent">
                Alquilar
              </span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              Elige el modelo que mejor se adapte a tus necesidades. Ambos te ofrecen ahorro significativo
              vs el taxi tradicional, con la flexibilidad que necesitas.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            {/* model cards */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paymentModels.map((model) => {
                  const isSelected = selectedModel === model.id
                  return (
                    <button
                      key={model.id}
                      onClick={() => setSelectedModel(isSelected ? null : model.id)}
                      className={`group relative p-6 rounded-2xl text-left transition-all duration-300 ${
                        isSelected
                          ? 'bg-white/[0.06] border-2'
                          : 'bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-white/10'
                      } ${model.highlight && !isSelected ? 'border-[#FF9800]/20' : ''}`}
                      style={isSelected ? { borderColor: `${model.color}40` } : {}}
                    >
                      {isSelected && (
                        <div
                          className="absolute inset-0 rounded-2xl opacity-20"
                          style={{ boxShadow: `0 0 25px ${model.color}30` }}
                        />
                      )}

                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center"
                            style={{ background: `${model.color}15` }}
                          >
                            <model.icon className="w-6 h-6" style={{ color: model.color }} />
                          </div>
                          <span
                            className="px-2.5 py-1 rounded-full text-[10px] font-semibold"
                            style={{ background: `${model.color}15`, color: model.color }}
                          >
                            {model.badge}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-1">{model.name}</h3>
                        <p className="text-xs text-white/40 mb-3">{model.subtitle}</p>
                        <p className="text-sm text-white/40 leading-relaxed line-clamp-3">{model.desc}</p>

                        {isSelected && (
                          <ChevronRight
                            className="w-4 h-4 absolute top-6 right-4 rotate-90"
                            style={{ color: model.color }}
                          />
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* detail panel */}
            <div className="lg:col-span-2">
              {selectedModelData ? (
                <div
                  className="p-6 rounded-3xl bg-white/[0.03] border transition-all duration-500"
                  style={{ borderColor: `${selectedModelData.color}30` }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: `${selectedModelData.color}15` }}
                    >
                      <selectedModelData.icon
                        className="w-6 h-6"
                        style={{ color: selectedModelData.color }}
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{selectedModelData.name}</h3>
                      <p className="text-xs" style={{ color: selectedModelData.color }}>
                        {selectedModelData.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-white/40 leading-relaxed mb-6">{selectedModelData.desc}</p>

                  <h4 className="text-sm font-semibold text-white/60 mb-3 uppercase tracking-wider">
                    Beneficios Incluidos
                  </h4>
                  <div className="space-y-2 mb-6">
                    {selectedModelData.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.05]"
                      >
                        <CheckCircle2
                          className="w-4 h-4 shrink-0"
                          style={{ color: selectedModelData.color }}
                        />
                        <span className="text-sm text-white/60">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* zone rates */}
                  {'exampleZones' in selectedModelData && selectedModelData.exampleZones && (
                    <>
                      <h4 className="text-sm font-semibold text-white/60 mb-3 uppercase tracking-wider">
                        Tarifas por Zona
                      </h4>
                      <div className="grid grid-cols-2 gap-2 mb-6">
                        {selectedModelData.exampleZones.map((z) => (
                          <div
                            key={z.zone}
                            className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]"
                          >
                            <p className="text-xs text-white/30">{z.zone}</p>
                            <p className="text-lg font-bold" style={{ color: selectedModelData.color }}>
                              {z.price}
                            </p>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {/* hourly rates */}
                  {'exampleRates' in selectedModelData && selectedModelData.exampleRates && (
                    <>
                      <h4 className="text-sm font-semibold text-white/60 mb-3 uppercase tracking-wider">
                        Tarifas por Horas
                      </h4>
                      <div className="grid grid-cols-2 gap-2 mb-6">
                        {selectedModelData.exampleRates.map((r) => (
                          <div
                            key={r.hours}
                            className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]"
                          >
                            <p className="text-xs text-white/30">{r.hours}</p>
                            <p className="text-lg font-bold" style={{ color: selectedModelData.color }}>
                              {r.price}
                            </p>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  <div className="flex flex-col gap-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-white/40">
                      <Shield className="w-4 h-4 text-[#00E676]" />
                      <span>Seguro de pasajeros incluido</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/40">
                      <Clock className="w-4 h-4 text-[#FF9800]" />
                      <span>Desde 1 hora, sin mínimos</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/40">
                      <CreditCard className="w-4 h-4 text-[#0077BD]" />
                      <span>Sin tarjeta de crédito requerida</span>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      document
                        .getElementById('por-hora-reservar')
                        ?.scrollIntoView({ behavior: 'smooth' })
                    }
                    className="w-full px-6 py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:scale-105"
                    style={{
                      background: selectedModelData.color,
                      boxShadow: `0 0 20px ${selectedModelData.color}30`,
                    }}
                  >
                    Reservar {selectedModelData.name}
                  </button>
                </div>
              ) : (
                <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.06] text-center">
                  <Wallet className="w-12 h-12 text-white/10 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white/40 mb-2">Selecciona un Modelo</h3>
                  <p className="text-sm text-white/25">
                    Haz click en &quot;Por Zona&quot; o &quot;Horas Libres&quot; para ver los detalles,
                    tarifas y beneficios de cada modelo de alquiler.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          VEHICLE TYPES
          ═══════════════════════════════════════════════════════ */}
      <section
        id="por-hora-vehiculos"
        data-animate-section="vehicles"
        className={`py-16 md:py-24 bg-gradient-to-b from-[#0a0e17] via-[#0d1830] to-[#0a0e17] transition-all duration-700 ${
          animSections['vehicles'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 mb-4">
              <Car className="w-4 h-4 text-[#00E676]" />
              <span className="text-sm text-[#00E676]">Flota Disponible</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              6 Tipos de{' '}
              <span className="bg-gradient-to-r from-[#FF9800] to-[#00E676] bg-clip-text text-transparent">
                Vehículos
              </span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              Desde un sedán confortable hasta un micro para 45 personas. Elige el vehículo perfecto para
              tu necesidad y presupuesto. Todos disponibles por hora.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicleTypes.map((vehicle) => (
              <div
                key={vehicle.name}
                className="group relative p-6 md:p-8 rounded-3xl bg-white/[0.03] border border-white/[0.06] hover:border-white/10 hover:bg-white/[0.05] transition-all duration-500"
              >
                {/* hover glow */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ boxShadow: `0 0 30px ${vehicle.color}10` }}
                />
                <div className="relative z-10">
                  {/* icon & badge */}
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

                  {/* passengers */}
                  <div className="flex items-center gap-2 mb-4 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                    <Users className="w-4 h-4" style={{ color: vehicle.color }} />
                    <span className="text-sm text-white/60">{vehicle.passengers} pasajeros</span>
                  </div>

                  {/* features */}
                  <div className="grid grid-cols-2 gap-2">
                    {vehicle.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2">
                        <CheckCircle2
                          className="w-3.5 h-3.5 shrink-0"
                          style={{ color: vehicle.color }}
                        />
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
          KEY BENEFITS
          ═══════════════════════════════════════════════════════ */}
      <section
        data-animate-section="benefits"
        className={`py-16 md:py-24 transition-all duration-700 ${
          animSections['benefits'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 mb-4">
              <Zap className="w-4 h-4 text-[#00E676]" />
              <span className="text-sm text-[#00E676]">Ventajas Clave</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Por Qué{' '}
              <span className="bg-gradient-to-r from-[#FF9800] to-[#00E676] bg-clip-text text-transparent">
                Alquilar por Hora
              </span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              Simplifica tu transporte. Sin trabas, sin compromisos, con el máximo ahorro y la flexibilidad
              que necesitas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {keyBenefits.map((benefit) => (
              <div
                key={benefit.title}
                className="group relative p-8 md:p-10 rounded-3xl bg-white/[0.03] border border-white/[0.06] hover:border-white/10 hover:bg-white/[0.05] transition-all duration-500"
              >
                {/* hover glow */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ boxShadow: `0 0 30px ${benefit.color}10` }}
                />
                <div className="relative z-10 flex items-start gap-5">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
                    style={{ background: `${benefit.color}15` }}
                  >
                    <benefit.icon className="w-8 h-8" style={{ color: benefit.color }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                    <p className="text-sm text-white/40 leading-relaxed">{benefit.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          COMPARISON TABLE
          ═══════════════════════════════════════════════════════ */}
      <section
        data-animate-section="comparison"
        className={`py-16 md:py-24 bg-gradient-to-b from-[#0a0e17] via-[#0d1830] to-[#0a0e17] transition-all duration-700 ${
          animSections['comparison'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF9800]/10 border border-[#FF9800]/20 mb-4">
              <TrendingDown className="w-4 h-4 text-[#FF9800]" />
              <span className="text-sm text-[#FF9800]">Ahorro Real</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Taxi Tradicional vs{' '}
              <span className="bg-gradient-to-r from-[#FF9800] to-[#00E676] bg-clip-text text-transparent">
                Ecotaxi por Hora
              </span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              Mira cuánto puedes ahorrar alquilando por hora en comparación con tomar taxis individuales
              para cada recorrido.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* table header */}
            <div className="grid grid-cols-4 gap-2 mb-3">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                <span className="text-xs text-white/40 font-semibold uppercase">Escenario</span>
              </div>
              <div className="p-3 rounded-xl bg-red-500/5 border border-red-500/10 text-center">
                <span className="text-xs text-red-400/70 font-semibold uppercase">Taxi</span>
              </div>
              <div className="p-3 rounded-xl bg-[#FF9800]/5 border border-[#FF9800]/10 text-center">
                <span className="text-xs text-[#FF9800] font-semibold uppercase">Ecotaxi</span>
              </div>
              <div className="p-3 rounded-xl bg-[#00E676]/5 border border-[#00E676]/10 text-center">
                <span className="text-xs text-[#00E676] font-semibold uppercase">Ahorro</span>
              </div>
            </div>

            {/* table rows */}
            <div className="space-y-2">
              {comparisonData.map((row) => (
                <div
                  key={row.scenario}
                  className="grid grid-cols-4 gap-2 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] transition-all duration-300"
                >
                  <div className="flex items-center">
                    <span className="text-sm text-white/60">{row.scenario}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="text-sm text-red-400/60 line-through">{row.taxi}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="text-sm font-bold text-[#FF9800]">{row.ecotaxi}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="text-sm font-bold text-[#00E676]">-{row.saving}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* bottom summary */}
            <div className="mt-8 p-6 rounded-3xl bg-gradient-to-br from-[#FF9800]/5 to-[#00E676]/5 border border-[#FF9800]/10">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#00E676]/10 flex items-center justify-center">
                    <TrendingDown className="w-7 h-7 text-[#00E676]" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">Hasta 80% de ahorro</p>
                    <p className="text-sm text-white/40">en recorridos múltiples por hora</p>
                  </div>
                </div>
                <button
                  onClick={() =>
                    document
                      .getElementById('por-hora-reservar')
                      ?.scrollIntoView({ behavior: 'smooth' })
                  }
                  className="px-6 py-3 rounded-full text-sm font-semibold text-black bg-[#FF9800] hover:bg-[#FFB74D] transition-all duration-300 shadow-[0_0_20px_rgba(255,152,0,0.3)] hover:scale-105"
                >
                  Empezar a Ahorrar
                  <ArrowRight className="w-4 h-4 inline ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          RESERVATION CHANNELS - Atención Humana
          ═══════════════════════════════════════════════════════ */}
      <section
        data-animate-section="channels"
        className={`relative py-16 md:py-24 overflow-hidden transition-all duration-700 ${
          animSections['channels'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* callcenter background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/callcenter-bg.webp')" }}
        />
        {/* dark overlay for readability */}
        <div className="absolute inset-0 bg-[#0a0e17]/85" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0077BD]/10 border border-[#0077BD]/20 mb-4">
              <Phone className="w-4 h-4 text-[#0077BD]" />
              <span className="text-sm text-[#0077BD]">Atención Humana</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Atención Humana:{' '}
              <span className="bg-gradient-to-r from-[#0077BD] to-[#00E676] bg-clip-text text-transparent">
                Reserva por Donde Prefieras
              </span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              Cuatro canales de reserva para que alquiles tu vehículo de la forma que más te guste. Todos
              rápidos, seguros y con confirmación inmediata.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {reservationChannels.map((channel) => (
              <div
                key={channel.title}
                className="group relative p-6 md:p-8 rounded-3xl bg-white/[0.03] border border-white/[0.06] hover:border-white/10 hover:bg-white/[0.05] transition-all duration-500 text-center"
              >
                {/* hover glow */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ boxShadow: `0 0 30px ${channel.color}10` }}
                />
                <div className="relative z-10">
                  <div
                    className="w-16 h-16 rounded-2xl mb-5 flex items-center justify-center mx-auto"
                    style={{ background: `${channel.color}15` }}
                  >
                    <channel.icon className="w-8 h-8" style={{ color: channel.color }} />
                  </div>
                  <span
                    className="inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold mb-3"
                    style={{ background: `${channel.color}15`, color: channel.color }}
                  >
                    {channel.badge}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-2">{channel.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed mb-4">{channel.desc}</p>
                  <div className="px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                    <span className="text-xs text-white/50">{channel.detail}</span>
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
        id="por-hora-reservar"
        data-animate-section="cta"
        className={`py-16 md:py-24 bg-gradient-to-b from-[#0a0e17] via-[#1a1000] to-[#0a0e17] transition-all duration-700 ${
          animSections['cta'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-[#FF9800]/10 to-[#00E676]/5 border border-[#FF9800]/20 overflow-hidden">
            {/* background orbs */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#FF9800]/5 blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#00E676]/5 blur-[60px]" />

            <div className="relative z-10 text-center">
              {/* badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF9800]/10 border border-[#FF9800]/20 mb-6">
                <Clock className="w-4 h-4 text-[#FF9800]" />
                <span className="text-sm text-[#FF9800]">Reserva Ahora</span>
              </div>

              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Alquila tu Vehículo{' '}
                <span className="bg-gradient-to-r from-[#FF9800] to-[#00E676] bg-clip-text text-transparent">
                  por Hora
                </span>
              </h2>

              <p className="text-lg text-white/50 max-w-2xl mx-auto mb-8 leading-relaxed">
                Sin tarjeta de crédito. Sin contratos. Sin mínimos. Solo elige tu modelo de pago, tu
                vehículo y empieza a ahorrar hasta 80% en tu transporte diario.
              </p>

              {/* quick stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                {[
                  { icon: CreditCard, label: 'Sin tarjeta', color: '#00E676' },
                  { icon: Shield, label: 'Sin contratos', color: '#0077BD' },
                  { icon: Timer, label: 'Sin mínimos', color: '#FF9800' },
                  { icon: TrendingDown, label: '-80% ahorro', color: '#8B5CF6' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]"
                  >
                    <item.icon className="w-5 h-5" style={{ color: item.color }} />
                    <span className="text-xs text-white/50">{item.label}</span>
                  </div>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="px-8 py-4 rounded-full text-lg font-semibold text-black bg-[#FF9800] hover:bg-[#FFB74D] transition-all duration-300 shadow-[0_0_30px_rgba(255,152,0,0.3)] hover:shadow-[0_0_50px_rgba(255,152,0,0.5)] hover:scale-105">
                  <Smartphone className="w-5 h-5 inline mr-2" />
                  Reservar por App
                </button>
                <button className="px-8 py-4 rounded-full text-lg font-semibold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all duration-300 shadow-[0_0_30px_rgba(0,230,118,0.3)] hover:shadow-[0_0_50px_rgba(0,230,118,0.5)] hover:scale-105">
                  <MessageCircle className="w-5 h-5 inline mr-2" />
                  WhatsApp
                </button>
                <button className="px-8 py-4 rounded-full text-lg font-semibold text-white border border-white/20 hover:border-[#FF9800]/50 hover:bg-white/5 transition-all duration-300">
                  <Phone className="w-5 h-5 inline mr-2" />
                  Llamar
                </button>
              </div>

              <p className="text-xs text-white/30 mt-6">
                Confirmación inmediata · Conductor asignado en minutos · Pago flexible
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
