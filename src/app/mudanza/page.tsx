'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import anime from 'animejs'
import {
  MapPin, Route, Globe, Home, Building2, Shield, Truck, Package,
  CheckCircle, Calculator, ClipboardList, ChevronRight, Minus, Plus,
  ArrowRight, Phone, Sparkles, Box, Sofa, Bed, Tv, Refrigerator,
  ChefHat, Bath, Printer, Piano, Dumbbell, Bike as BikeIcon, CircleDollarSign,
  MessageCircle, Clock, Users, Star, AlertCircle
} from 'lucide-react'
import { Navbar } from '@/components/ecotaxi/navbar'
import { Footer } from '@/components/ecotaxi/footer'

/* ─────────── scroll-triggered animation ─────────── */
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

function A({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useInView(0.08)
  return (
    <div ref={ref} className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}>{children}</div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   FURNITURE DATA
   ═══════════════════════════════════════════════════════════════════════════════ */
interface FurnitureItem { name: string; vol: number; emoji: string }

const ROOMS: Record<string, { label: string; items: FurnitureItem[] }> = {
  recamara: { label: 'Recámara', items: [
    { name: 'Cama Individual', vol: 1.2, emoji: '🛏️' }, { name: 'Cama Matrimonial', vol: 1.8, emoji: '🛏️' },
    { name: 'Cama Queen', vol: 2.2, emoji: '🛏️' }, { name: 'Cama King', vol: 2.5, emoji: '🛏️' },
    { name: 'Buró', vol: 0.3, emoji: '🪑' }, { name: 'Cabecera', vol: 0.4, emoji: '🪵' },
    { name: 'Ropero Mediano', vol: 1.0, emoji: '🚪' }, { name: 'Ropero Grande', vol: 1.5, emoji: '🚪' },
    { name: 'Cómoda/Tocador', vol: 0.6, emoji: '🪞' }, { name: 'Cajonera', vol: 0.5, emoji: '🗄️' },
    { name: 'Litera', vol: 1.8, emoji: '🛏️' }, { name: 'Escritorio', vol: 0.5, emoji: '🖥️' },
    { name: 'Silla', vol: 0.3, emoji: '🪑' }, { name: 'Ventilador de techo', vol: 0.2, emoji: '🌀' },
    { name: 'Aire acondicionado', vol: 0.3, emoji: '❄️' }, { name: 'Baúl', vol: 0.5, emoji: '📦' },
    { name: 'Mecedora', vol: 0.6, emoji: '🪑' }, { name: 'Cuna', vol: 0.5, emoji: '👶' },
    { name: 'Zapatera', vol: 0.3, emoji: '👟' },
  ]},
  sala: { label: 'Sala', items: [
    { name: 'Sofá 2 cuerpos', vol: 1.2, emoji: '🛋️' }, { name: 'Sofá 3 cuerpos', vol: 1.8, emoji: '🛋️' },
    { name: 'Sofá esquinero (L)', vol: 2.5, emoji: '🛋️' }, { name: 'Mesa de centro', vol: 0.4, emoji: '🪵' },
    { name: 'Mesa de centro vidrio', vol: 0.3, emoji: '🪟' }, { name: 'Mueble de TV', vol: 0.8, emoji: '📺' },
    { name: 'Sillón individual', vol: 0.6, emoji: '🛋️' }, { name: 'Estantería/Bibliorato', vol: 0.7, emoji: '📚' },
    { name: 'Cuadro grande', vol: 0.2, emoji: '🖼️' }, { name: 'Alfombra', vol: 0.3, emoji: '🟫' },
    { name: 'Lámpara de piso', vol: 0.2, emoji: '💡' }, { name: 'Rack de componentes', vol: 0.5, emoji: '🎵' },
  ]},
  cocina: { label: 'Cocina', items: [
    { name: 'Refrigerador', vol: 1.0, emoji: '🧊' }, { name: 'Cocina/Estufa', vol: 0.8, emoji: '🍳' },
    { name: 'Microondas', vol: 0.3, emoji: '📦' }, { name: 'Horno', vol: 0.5, emoji: '🫕' },
    { name: 'Lavadora', vol: 0.6, emoji: '🫧' }, { name: 'Secadora', vol: 0.6, emoji: '🌀' },
    { name: 'Mesa de cocina', vol: 0.5, emoji: '🪑' }, { name: 'Silla de cocina (c/u)', vol: 0.2, emoji: '🪑' },
    { name: 'Gabinete cocina', vol: 0.6, emoji: '🗄️' }, { name: 'Lavavajillas', vol: 0.5, emoji: '🫧' },
    { name: 'Licuadora', vol: 0.1, emoji: '🥤' },
  ]},
  comedor: { label: 'Comedor', items: [
    { name: 'Mesa comedor 4 puestos', vol: 1.0, emoji: '🪑' }, { name: 'Mesa comedor 6 puestos', vol: 1.5, emoji: '🪑' },
    { name: 'Mesa comedor 8 puestos', vol: 2.0, emoji: '🪑' }, { name: 'Silla comedor (c/u)', vol: 0.3, emoji: '🪑' },
    { name: 'Vitrina/Mueble cristal', vol: 1.0, emoji: '🪟' }, { name: 'Cristalera', vol: 0.8, emoji: '🍷' },
  ]},
  bano: { label: 'Baño', items: [
    { name: 'Mueble de baño', vol: 0.3, emoji: '🪞' }, { name: 'Espejo grande', vol: 0.1, emoji: '🪞' },
  ]},
  oficina: { label: 'Oficina', items: [
    { name: 'Escritorio ejecutivo', vol: 1.0, emoji: '🖥️' }, { name: 'Silla ejecutiva', vol: 0.5, emoji: '🪑' },
    { name: 'Archivador', vol: 0.5, emoji: '🗄️' }, { name: 'Impresora', vol: 0.3, emoji: '🖨️' },
    { name: 'Gabinete servidores', vol: 1.0, emoji: '🖥️' }, { name: 'Pizarra', vol: 0.2, emoji: '📋' },
    { name: 'Proyector', vol: 0.1, emoji: '📽️' }, { name: 'Mesa de reunión', vol: 1.5, emoji: '🪑' },
  ]},
  otros: { label: 'Otros', items: [
    { name: 'Caja grande', vol: 0.15, emoji: '📦' }, { name: 'Caja mediana', vol: 0.08, emoji: '📦' },
    { name: 'Caja pequeña', vol: 0.04, emoji: '📦' }, { name: 'Bicicleta', vol: 0.5, emoji: '🚲' },
    { name: 'Piano vertical', vol: 1.5, emoji: '🎹' }, { name: 'Piano de cola', vol: 2.5, emoji: '🎹' },
    { name: 'Caja fuerte', vol: 1.0, emoji: '🔐' }, { name: 'Máquina de ejercicio', vol: 0.8, emoji: '🏋️' },
    { name: 'Refrigerador comercial', vol: 2.0, emoji: '🧊' }, { name: 'Equipo médico', vol: 0.5, emoji: '🏥' },
    { name: 'Mascota (jaula grande)', vol: 0.5, emoji: '🐾' }, { name: 'Plantas', vol: 0.2, emoji: '🪴' },
    { name: 'TV 32-50"', vol: 0.3, emoji: '📺' }, { name: 'TV 50"+', vol: 0.5, emoji: '📺' },
    { name: 'Bicicleta estática', vol: 0.6, emoji: '🚲' }, { name: 'Caminadora', vol: 0.8, emoji: '🏃' },
  ]},
}

const ROOM_KEYS = Object.keys(ROOMS)

/* extras */
interface Extra { name: string; price: number; unit?: string }
const EXTRAS: Extra[] = [
  { name: 'Embalaje completo', price: 500 }, { name: 'Desembalaje completo', price: 500 },
  { name: 'Ayudante de carga (c/u)', price: 150 }, { name: 'Póliza seguro básica', price: 200 },
  { name: 'Póliza seguro premium', price: 500 }, { name: 'Carga planta alta sin elevador (p/piso)', price: 100, unit: 'piso' },
  { name: 'Carga planta alta con elevador', price: 150 }, { name: 'Desmontaje de muebles', price: 300 },
  { name: 'Montaje de muebles', price: 300 }, { name: 'Empaque frágil (cristalería)', price: 150 },
  { name: 'Protección pisos y paredes', price: 100 }, { name: 'Guardamuebles (almacenamiento)', price: 200, unit: 'semana' },
  { name: 'Traslado electrodomésticos especiales', price: 250 },
]

/* vehicles */
const VEHICLES = [
  { cat: 'Camioneta', color: '#FB923C', items: [
    { name: 'Pickup', cap: 8, desc: 'Caja abierta grande, ideal para cargas sin protección del clima', pax: 2 },
    { name: 'Camioneta Pequeña', cap: 5, desc: 'Mudanzas pequeñas, departamento studio o 1 dormitorio', pax: 2 },
    { name: 'Camioneta Mediana', cap: 12, desc: 'Mudanzas medianas, departamento 2 dormitorios', pax: 3 },
    { name: 'Camioneta Larga', cap: 22, desc: 'Mudanzas grandes, casa 3+ dormitorios', pax: 3 },
    { name: 'Camioneta Grande', cap: 35, desc: 'Mudanzas extra grandes o múltiples destinos', pax: 3 },
  ]},
  { cat: 'Furgón', color: '#818CF8', items: [
    { name: 'Furgón Pequeño', cap: 6, desc: 'Carga pequeña, mudanzas studio (6m³)', pax: 2 },
    { name: 'Furgón Mediano', cap: 12, desc: 'Carga mediana, mudanzas 1-2 dormitorios (12m³)', pax: 2 },
    { name: 'Furgón Grande', cap: 20, desc: 'Carga grande, mudanzas 2-3 dormitorios (20m³)', pax: 3 },
    { name: 'Furgón Largo', cap: 30, desc: 'Carga extra grande, casas grandes (30m³)', pax: 3 },
  ]},
]

/* ═══════════════════════════════════════════════════════════════════════════════
   1. HERO
   ═══════════════════════════════════════════════════════════════════════════════ */
function HeroSection() {
  const truckRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (truckRef.current) {
      anime({ targets: truckRef.current, translateX: [-120, 0], opacity: [0, 1], duration: 1400, easing: 'easeOutExpo' })
    }
  }, [])

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(rgba(0,230,118,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,230,118,0.3) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[#00E676]/12 blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#0077BD]/10 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[#FF9800]/6 blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Animated Truck */}
      <div ref={truckRef} className="absolute bottom-[12%] left-1/2 -translate-x-1/2 md:left-[15%] md:translate-x-0 opacity-0">
        <svg width="200" height="100" viewBox="0 0 200 100" fill="none">
          <rect x="60" y="20" width="100" height="50" rx="6" fill="#00E676" opacity="0.15" stroke="#00E676" strokeWidth="1.5" />
          <rect x="65" y="25" width="90" height="40" rx="3" fill="#00E676" opacity="0.08" />
          <rect x="160" y="35" width="35" height="35" rx="4" fill="#0077BD" opacity="0.2" stroke="#0077BD" strokeWidth="1.5" />
          <rect x="170" y="40" width="18" height="20" rx="2" fill="#0077BD" opacity="0.1" />
          <circle cx="80" cy="75" r="10" fill="#1a1a2e" stroke="#00E676" strokeWidth="1.5" />
          <circle cx="80" cy="75" r="5" fill="#2a2a3e" />
          <circle cx="175" cy="75" r="10" fill="#1a1a2e" stroke="#00E676" strokeWidth="1.5" />
          <circle cx="175" cy="75" r="5" fill="#2a2a3e" />
          <rect x="85" y="55" width="20" height="8" rx="2" fill="#00E676" opacity="0.25" />
          <rect x="110" y="55" width="20" height="8" rx="2" fill="#00E676" opacity="0.25" />
          <rect x="135" y="55" width="20" height="8" rx="2" fill="#00E676" opacity="0.25" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 pb-16">
        <A>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 mb-8 backdrop-blur-sm">
            <Truck className="w-4 h-4 text-[#00E676]" />
            <span className="text-sm text-[#00E676] font-medium">Servicio de Mudanza</span>
          </div>
        </A>
        <A delay={100}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Mudanzas Profesionales en{' '}
            <span className="bg-gradient-to-r from-[#00E676] via-[#0077BD] to-[#00E676] bg-clip-text text-transparent">Bolivia</span>
          </h1>
        </A>
        <A delay={200}>
          <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-10 leading-relaxed">
            Servicio profesional de mudanzas local, provincial y nacional. Transportamos tus pertenencias
            con cuidado, seguridad y la tecnología de seguimiento GPS que nos distingue.
          </p>
        </A>
        <A delay={300}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <a href="#calculadora" className="px-8 py-4 rounded-full text-lg font-semibold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all duration-300 shadow-[0_0_30px_rgba(0,230,118,0.3)] hover:shadow-[0_0_50px_rgba(0,230,118,0.5)] hover:scale-105">
              Calcular Mi Mudanza
            </a>
            <a href="#flota" className="px-8 py-4 rounded-full text-lg font-semibold text-white border border-white/20 hover:border-[#00E676]/50 hover:bg-white/5 transition-all duration-300">
              Ver Flota
            </a>
          </div>
        </A>
        <A delay={400}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { value: '3', label: 'Tipos de Mudanza', icon: MapPin },
              { value: '9+', label: 'Vehículos', icon: Truck },
              { value: 'GPS', label: 'Rastreo en Vivo', icon: Globe },
              { value: '100%', label: 'Seguro Disponible', icon: Shield },
            ].map((s) => (
              <div key={s.label} className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-[#00E676]/20 transition-all duration-300">
                <s.icon className="w-5 h-5 text-[#00E676] mx-auto mb-2" />
                <div className="text-2xl md:text-3xl font-bold text-white">{s.value}</div>
                <div className="text-xs text-white/50 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </A>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   2. SERVICE TYPES
   ═══════════════════════════════════════════════════════════════════════════════ */
const serviceTypes = [
  { icon: MapPin, title: 'Mudanza Local', color: '#00E676', price: 'Desde Bs 200',
    desc: 'Dentro de la misma ciudad. Disponibles en Santa Cruz, La Paz y Cochabamba. Servicio el mismo día con equipo profesional y vehículos adecuados para cada tipo de mudanza.',
    features: ['Servicio el mismo día', 'Cobertura en 3 ciudades principales', 'Rastreo GPS en tiempo real', 'Seguro de carga incluido'] },
  { icon: Route, title: 'Mudanza Provincial', color: '#0077BD', price: 'Desde Bs 500',
    desc: 'Entre provincias dentro del mismo departamento. Servicio al día siguiente con logística coordinada y protección especial para traslados de mayor distancia dentro del departamento.',
    features: ['Servicio al día siguiente', 'Protección especial para distancia', 'Coordinación logística completa', 'Reporte de ubicación en ruta'] },
  { icon: Globe, title: 'Mudanza Nacional', color: '#FF9800', price: 'Desde Bs 1,000',
    desc: 'Entre departamentos y ciudades de toda Bolivia. Servicio programado con seguimiento satelital, protección reforzada y seguro premium para traslados de larga distancia a nivel nacional.',
    features: ['Servicio programado con tracking', 'Seguro premium de carga', 'Protección reforzada', 'Cobertura nacional completa'] },
]

function ServiceTypesSection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-[#00E676]/5 blur-[150px]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <A><div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 mb-4">
            <MapPin className="w-4 h-4 text-[#00E676]" /><span className="text-sm text-[#00E676]">Tipos de Servicio</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Mudanzas a tu <span className="bg-gradient-to-r from-[#00E676] via-[#0077BD] to-[#FF9800] bg-clip-text text-transparent">Medida</span></h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">Cobertura local, provincial y nacional con la misma calidad y profesionalismo.</p>
        </div></A>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {serviceTypes.map((s, i) => (
            <A key={s.title} delay={i * 100}>
              <div className="group relative p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-white/10 transition-all duration-500 h-full flex flex-col">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: `${s.color}12` }}>
                  <s.icon className="w-7 h-7" style={{ color: s.color }} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed mb-5 flex-1">{s.desc}</p>
                <div className="space-y-2 mb-5">
                  {s.features.map((f) => (
                    <div key={f} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: s.color }} />
                      <span className="text-sm text-white/60">{f}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t border-white/[0.06]">
                  <span className="text-lg font-bold" style={{ color: s.color }}>{s.price}</span>
                  <span className="text-xs text-white/30 ml-2">+ distancia</span>
                </div>
              </div>
            </A>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   3. MOVING CATEGORIES (TABS)
   ═══════════════════════════════════════════════════════════════════════════════ */
const categories = [
  { id: 'casa', icon: Home, label: 'Mudanza de Casa', color: '#00E676',
    desc: 'Mudanza residencial completa. Transportamos tus muebles, electrodomésticos y pertenencias con el máximo cuidado desde tu hogar actual hasta tu nuevo hogar.',
    included: ['Desmontaje y montaje de muebles', 'Protección con mantas y plástico', 'Transporte de electrodomésticos', 'Carga y descarga profesional'],
    vehicles: 'Camioneta Mediana, Furgón Grande', notes: 'Recomendamos embalaje profesional para cristalería y objetos frágiles.' },
  { id: 'oficina', icon: Building2, label: 'Mudanza de Oficina', color: '#0077BD',
    desc: 'Relocalización de oficinas con mínima interrupción. Manejamos equipos informáticos, mobiliario corporativo y documentación con protocolos de seguridad especiales.',
    included: ['Protocolo para equipos electrónicos', 'Embalaje de documentación', 'Desconexión/conexión de equipos', 'Montaje de estaciones de trabajo'],
    vehicles: 'Furgón Mediano, Furgón Largo', notes: 'Disponemos de servicio nocturno y fin de semana para no afectar la operatividad.' },
  { id: 'especial', icon: Shield, label: 'Mudanza Especial', color: '#FF9800',
    desc: 'Para artículos de alto valor o delicados: pianos, obras de arte, cajas fuertes, equipo médico y antigüedades. Personal especializado y embalaje a medida.',
    included: ['Embalaje a medida personalizado', 'Personal especializado certificado', 'Seguro premium obligatorio', 'Equipamiento de sujeción profesional'],
    vehicles: 'Furgón Grande con suspensión reforzada', notes: 'Cotización personalizada obligatoria. Se requiere evaluación previa del artículo.' },
]

function CategoriesSection() {
  const [active, setActive] = useState('casa')
  const cat = categories.find(c => c.id === active)!
  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#080c15] to-[#0a0e17]" />
      <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] rounded-full bg-[#0077BD]/5 blur-[120px]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <A><div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0077BD]/10 border border-[#0077BD]/20 mb-4">
            <Home className="w-4 h-4 text-[#0077BD]" /><span className="text-sm text-[#0077BD]">Categorías</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Tipo de <span className="bg-gradient-to-r from-[#00E676] to-[#FF9800] bg-clip-text text-transparent">Mudanza</span></h2>
        </div></A>
        <A delay={100}>
          <div className="flex items-center justify-center mb-10">
            <div className="p-1 rounded-2xl bg-white/[0.04] border border-white/[0.06] inline-flex">
              {categories.map((c) => (
                <button key={c.id} onClick={() => setActive(c.id)}
                  className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${active === c.id ? `text-white shadow-[0_0_20px_${c.color}30]` : 'text-white/50 hover:text-white/70'}`}
                  style={active === c.id ? { backgroundColor: c.color } : {}}>
                  <c.icon className="w-4 h-4" />{c.label}
                </button>
              ))}
            </div>
          </div>
        </A>
        <A delay={200}>
          <div className="max-w-4xl mx-auto p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm transition-all duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${cat.color}15` }}>
                    <cat.icon className="w-6 h-6" style={{ color: cat.color }} />
                  </div>
                  <h3 className="text-xl font-bold text-white">{cat.label}</h3>
                </div>
                <p className="text-white/50 text-sm leading-relaxed mb-6">{cat.desc}</p>
                <h4 className="text-sm font-semibold text-white/70 mb-3">Incluye:</h4>
                <div className="space-y-2">
                  {cat.included.map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: cat.color }} />
                      <span className="text-sm text-white/60">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <span className="text-xs text-white/40 uppercase tracking-wider">Vehículos Recomendados</span>
                  <p className="text-white font-semibold mt-1">{cat.vehicles}</p>
                </div>
                <div className="p-4 rounded-xl" style={{ backgroundColor: `${cat.color}08`, border: `1px solid ${cat.color}20` }}>
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: cat.color }} />
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: cat.color }}>Consideración Especial</span>
                      <p className="text-sm text-white/50 mt-1">{cat.notes}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </A>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   4. MOVING FLEET
   ═══════════════════════════════════════════════════════════════════════════════ */
function TruckSVG({ color, isVan }: { color: string; isVan?: boolean }) {
  return (
    <svg width="80" height="48" viewBox="0 0 80 48" fill="none">
      {isVan ? (
        <>
          <rect x="8" y="6" width="50" height="30" rx="4" fill={color} opacity="0.15" stroke={color} strokeWidth="1" />
          <rect x="58" y="14" width="16" height="22" rx="3" fill={color} opacity="0.1" stroke={color} strokeWidth="1" />
          <rect x="63" y="18" width="8" height="10" rx="1.5" fill={color} opacity="0.06" />
          <circle cx="22" cy="40" r="5" fill="#1a1a2e" stroke={color} strokeWidth="1" />
          <circle cx="60" cy="40" r="5" fill="#1a1a2e" stroke={color} strokeWidth="1" />
        </>
      ) : (
        <>
          <rect x="20" y="8" width="40" height="24" rx="3" fill={color} opacity="0.15" stroke={color} strokeWidth="1" />
          <rect x="60" y="16" width="16" height="16" rx="3" fill={color} opacity="0.1" stroke={color} strokeWidth="1" />
          <rect x="64" y="19" width="8" height="8" rx="1.5" fill={color} opacity="0.06" />
          <circle cx="28" cy="38" r="5" fill="#1a1a2e" stroke={color} strokeWidth="1" />
          <circle cx="68" cy="38" r="5" fill="#1a1a2e" stroke={color} strokeWidth="1" />
        </>
      )}
    </svg>
  )
}

function FleetSection() {
  return (
    <section id="flota" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full bg-[#FF9800]/5 blur-[120px]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <A><div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF9800]/10 border border-[#FF9800]/20 mb-4">
            <Truck className="w-4 h-4 text-[#FF9800]" /><span className="text-sm text-[#FF9800]">Flota de Mudanza</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Vehículos para tu <span className="bg-gradient-to-r from-[#FF9800] to-[#818CF8] bg-clip-text text-transparent">Mudanza</span></h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">Camionetas y furgones de diferentes capacidades para cada necesidad.</p>
        </div></A>
        {VEHICLES.map((cat) => (
          <div key={cat.cat} className="mb-10">
            <A><h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
              {cat.cat}
            </h3></A>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {cat.items.map((v, i) => (
                <A key={v.name} delay={i * 80}>
                  <div className="group p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-white/10 transition-all duration-300">
                    <div className="flex justify-center mb-3 opacity-70 group-hover:opacity-100 transition-opacity">
                      <TruckSVG color={cat.color} isVan={cat.cat === 'Furgón'} />
                    </div>
                    <h4 className="text-white font-semibold text-sm mb-1">{v.name}</h4>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ backgroundColor: `${cat.color}15`, color: cat.color }}>{v.cap} m³</span>
                      <span className="text-xs text-white/40">{v.pax} pasajeros</span>
                    </div>
                    <p className="text-xs text-white/40 leading-relaxed">{v.desc}</p>
                  </div>
                </A>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   5. MOVING CALCULATOR (THE MOST IMPORTANT SECTION)
   ═══════════════════════════════════════════════════════════════════════════════ */
type MoveType = 'local' | 'provincial' | 'nacional'
type CatType = 'casa' | 'oficina' | 'especial'

function CalculatorSection() {
  const [step, setStep] = useState(1)
  const [moveType, setMoveType] = useState<MoveType>('local')
  const [catType, setCatType] = useState<CatType>('casa')
  const [inventory, setInventory] = useState<Record<string, number>>({})
  const [selectedExtras, setSelectedExtras] = useState<Record<string, number>>({})
  const [originFloor, setOriginFloor] = useState('baja')
  const [destFloor, setDestFloor] = useState('baja')
  const [elevatorOrigin, setElevatorOrigin] = useState(false)
  const [elevatorDest, setElevatorDest] = useState(false)
  const [distance, setDistance] = useState('10')
  const [activeRoom, setActiveRoom] = useState('recamara')

  const setQty = (name: string, delta: number) => {
    setInventory(prev => {
      const cur = prev[name] || 0
      const next = Math.max(0, cur + delta)
      if (next === 0) { const { [name]: _, ...rest } = prev; return rest }
      return { ...prev, [name]: next }
    })
  }

  const toggleExtra = (name: string) => {
    setSelectedExtras(prev => {
      if (prev[name]) { const { [name]: _, ...rest } = prev; return rest }
      return { ...prev, [name]: 1 }
    })
  }

  // Calculations
  const totalVolume = useMemo(() => {
    let v = 0
    Object.entries(inventory).forEach(([name, qty]) => {
      for (const room of Object.values(ROOMS)) {
        const item = room.items.find(i => i.name === name)
        if (item) { v += item.vol * qty; break }
      }
    })
    return Math.round(v * 100) / 100
  }, [inventory])

  const getRecommendation = (vol: number) => {
    if (vol <= 0) return { vehicle: '—', detail: 'Selecciona artículos para ver recomendación' }
    if (vol <= 6) return { vehicle: 'Furgón Pequeño', detail: '6m³ — Ideal para studios' }
    if (vol <= 12) return { vehicle: 'Furgón Mediano o Camioneta Pequeña', detail: '12m³ — Ideal para 1-2 dormitorios' }
    if (vol <= 20) return { vehicle: 'Furgón Grande o Camioneta Mediana', detail: '20m³ — Ideal para 2-3 dormitorios' }
    if (vol <= 30) return { vehicle: 'Furgón Largo o Camioneta Larga', detail: '30m³ — Ideal para casas grandes' }
    return { vehicle: 'Camioneta Grande + Furgón Largo', detail: '2 vehículos o 2 viajes recomendados' }
  }

  const extrasTotal = useMemo(() => {
    let t = 0
    Object.keys(selectedExtras).forEach(name => {
      const extra = EXTRAS.find(e => e.name === name)
      if (!extra) return
      if (name === 'Carga planta alta sin elevador (p/piso)') {
        const origF = originFloor === 'baja' ? 0 : parseInt(originFloor)
        const destF = destFloor === 'baja' ? 0 : parseInt(destFloor)
        t += extra.price * (origF + destF)
      } else {
        t += extra.price
      }
    })
    return t
  }, [selectedExtras, originFloor, destFloor])

  const basePrice = useMemo(() => {
    const d = parseFloat(distance) || 0
    const rates: Record<MoveType, { perKm: number; base: number }> = {
      local: { perKm: 15, base: 200 },
      provincial: { perKm: 12, base: 500 },
      nacional: { perKm: 10, base: 1000 },
    }
    const r = rates[moveType]
    return r.base + r.perKm * d
  }, [moveType, distance])

  const grandTotal = useMemo(() => basePrice + extrasTotal, [basePrice, extrasTotal])

  const getSelectedItems = () => {
    const items: { name: string; qty: number; vol: number; emoji: string }[] = []
    Object.entries(inventory).forEach(([name, qty]) => {
      for (const room of Object.values(ROOMS)) {
        const item = room.items.find(i => i.name === name)
        if (item) { items.push({ name, qty, vol: item.vol * qty, emoji: item.emoji }); break }
      }
    })
    return items
  }

  const buildWhatsAppMsg = () => {
    const rec = getRecommendation(totalVolume)
    const items = getSelectedItems().map(i => `${i.qty}x ${i.name}`).join(', ')
    const extras = Object.keys(selectedExtras).join(', ') || 'Ninguno'
    return encodeURIComponent(
      `Hola, necesito una cotización de mudanza.\nTipo: ${moveType}\nCategoría: ${catType}\nVolumen: ${totalVolume} m³\nVehículo recomendado: ${rec.vehicle}\nDistancia: ${distance} km\nExtras: ${extras}\nTotal estimado: Bs ${grandTotal.toLocaleString()}\nArtículos: ${items || 'Ninguno seleccionado'}`
    )
  }

  const steps = [
    { num: 1, label: 'Tipo de Mudanza' },
    { num: 2, label: 'Inventario' },
    { num: 3, label: 'Extras' },
    { num: 4, label: 'Cotización' },
  ]

  return (
    <section id="calculadora" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] rounded-full bg-[#00E676]/5 blur-[150px]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <A><div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 mb-4">
            <Calculator className="w-4 h-4 text-[#00E676]" /><span className="text-sm text-[#00E676] font-medium">Calculadora de Mudanza</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Calcula tu <span className="bg-gradient-to-r from-[#00E676] via-[#0077BD] to-[#FF9800] bg-clip-text text-transparent">Mudanza</span></h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">Selecciona tus artículos, elige extras y obtén una cotización estimada al instante.</p>
        </div></A>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {steps.map((s, i) => (
            <div key={s.num} className="flex items-center">
              <button onClick={() => s.num <= step && setStep(s.num)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${step === s.num ? 'bg-[#00E676] text-black shadow-[0_0_20px_rgba(0,230,118,0.3)]' : step > s.num ? 'bg-[#00E676]/20 text-[#00E676]' : 'bg-white/[0.05] text-white/40'}`}>
                <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: step >= s.num ? 'rgba(0,230,118,0.2)' : 'rgba(255,255,255,0.05)' }}>{step > s.num ? '✓' : s.num}</span>
                <span className="hidden sm:inline">{s.label}</span>
              </button>
              {i < steps.length - 1 && <ChevronRight className="w-4 h-4 text-white/20 mx-1" />}
            </div>
          ))}
        </div>

        {/* Volume badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.04] border border-[#00E676]/20">
            <Box className="w-4 h-4 text-[#00E676]" />
            <span className="text-sm text-white/60">Volumen total:</span>
            <span className="text-lg font-bold text-[#00E676]">{totalVolume} m³</span>
          </div>
        </div>

        {/* Step 1: Type */}
        {step === 1 && (
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-2 text-center">¿Qué tipo de mudanza necesitas?</h3>
            <p className="text-sm text-white/40 text-center mb-8">Selecciona el tipo y la categoría</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {([['local', 'Local', MapPin, '#00E676'], ['provincial', 'Provincial', Route, '#0077BD'], ['nacional', 'Nacional', Globe, '#FF9800']] as const).map(([id, label, Icon, color]) => (
                <button key={id} onClick={() => setMoveType(id)}
                  className={`p-6 rounded-2xl text-left transition-all duration-300 ${moveType === id ? 'bg-white/[0.06] border-2' : 'bg-white/[0.03] border border-white/[0.06] hover:border-white/10'}`}
                  style={moveType === id ? { borderColor: `${color}60` } : {}}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${color}15` }}>
                    <Icon className="w-6 h-6" style={{ color }} />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-1">Mudanza {label}</h4>
                  <p className="text-sm text-white/40">{id === 'local' ? 'Misma ciudad' : id === 'provincial' ? 'Mismo departamento' : 'Todo Bolivia'}</p>
                </button>
              ))}
            </div>
            <h3 className="text-xl font-bold text-white mb-2 text-center">¿Qué mudas?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {([['casa', 'Casa', Home, '#00E676'], ['oficina', 'Oficina', Building2, '#0077BD'], ['especial', 'Especial', Shield, '#FF9800']] as const).map(([id, label, Icon, color]) => (
                <button key={id} onClick={() => setCatType(id)}
                  className={`p-5 rounded-2xl text-left transition-all duration-300 ${catType === id ? 'bg-white/[0.06] border-2' : 'bg-white/[0.03] border border-white/[0.06] hover:border-white/10'}`}
                  style={catType === id ? { borderColor: `${color}60` } : {}}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
                      <Icon className="w-5 h-5" style={{ color }} />
                    </div>
                    <span className="text-white font-semibold">{label}</span>
                  </div>
                </button>
              ))}
            </div>
            <div className="flex justify-end">
              <button onClick={() => setStep(2)} className="px-8 py-3 rounded-full text-sm font-semibold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all duration-300 shadow-[0_0_20px_rgba(0,230,118,0.3)]">
                Siguiente: Inventario →
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Inventory */}
        {step === 2 && (
          <div className="max-w-5xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-2 text-center">Inventario de Artículos</h3>
            <p className="text-sm text-white/40 text-center mb-6">Selecciona la cantidad de cada artículo por ambiente</p>
            {/* Room tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {ROOM_KEYS.map((key) => (
                <button key={key} onClick={() => setActiveRoom(key)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${activeRoom === key ? 'bg-[#00E676] text-black' : 'bg-white/[0.05] text-white/50 hover:text-white/70'}`}>
                  {ROOMS[key].label}
                </button>
              ))}
            </div>
            {/* Items grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8 max-h-[480px] overflow-y-auto pr-2 custom-scroll">
              {ROOMS[activeRoom].items.map((item) => {
                const qty = inventory[item.name] || 0
                return (
                  <div key={item.name} className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-200 ${qty > 0 ? 'bg-[#00E676]/5 border-[#00E676]/20' : 'bg-white/[0.02] border-white/[0.06] hover:border-white/10'}`}>
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-lg shrink-0">{item.emoji}</span>
                      <div className="min-w-0">
                        <div className="text-sm text-white font-medium truncate">{item.name}</div>
                        <div className="text-xs text-white/30">{item.vol} m³</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button onClick={() => setQty(item.name, -1)} className="w-7 h-7 rounded-lg bg-white/[0.06] flex items-center justify-center text-white/60 hover:bg-white/10 transition-all">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-sm font-semibold text-white">{qty}</span>
                      <button onClick={() => setQty(item.name, 1)} className="w-7 h-7 rounded-lg bg-[#00E676]/20 flex items-center justify-center text-[#00E676] hover:bg-[#00E676]/30 transition-all">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="flex justify-between">
              <button onClick={() => setStep(1)} className="px-6 py-3 rounded-full text-sm font-semibold text-white/60 border border-white/[0.1] hover:border-white/20 transition-all">← Atrás</button>
              <button onClick={() => setStep(3)} className="px-8 py-3 rounded-full text-sm font-semibold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all duration-300 shadow-[0_0_20px_rgba(0,230,118,0.3)]">
                Siguiente: Extras →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Extras */}
        {step === 3 && (
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-2 text-center">Servicios Adicionales</h3>
            <p className="text-sm text-white/40 text-center mb-8">Personaliza tu mudanza con servicios extra</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {EXTRAS.map((extra) => {
                const checked = !!selectedExtras[extra.name]
                return (
                  <button key={extra.name} onClick={() => toggleExtra(extra.name)}
                    className={`flex items-center gap-3 p-4 rounded-xl text-left transition-all duration-200 ${checked ? 'bg-[#00E676]/5 border-[#00E676]/20 border' : 'bg-white/[0.02] border border-white/[0.06] hover:border-white/10'}`}>
                    <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 transition-all ${checked ? 'bg-[#00E676]' : 'bg-white/[0.08] border border-white/[0.15]'}`}>
                      {checked && <CheckCircle className="w-3.5 h-3.5 text-black" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-white font-medium truncate">{extra.name}</div>
                      <div className="text-xs text-white/30">Bs {extra.price}{extra.unit ? `/${extra.unit}` : ''}</div>
                    </div>
                  </button>
                )
              })}
            </div>
            {/* Floor and elevator selectors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#00E676]" /> Origen
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-white/40 block mb-1">Piso</label>
                    <select value={originFloor} onChange={e => setOriginFloor(e.target.value)}
                      className="w-full bg-white/[0.05] border border-white/[0.1] rounded-lg px-3 py-2 text-sm text-white appearance-none focus:outline-none focus:border-[#00E676]/40">
                      {['baja', '1', '2', '3', '4', '5'].map(f => <option key={f} value={f} className="bg-[#0a0e17]">Planta {f === 'baja' ? 'baja' : f + '°'}</option>)}
                    </select>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-white/60">¿Elevador?</span>
                    <button onClick={() => setElevatorOrigin(!elevatorOrigin)}
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${elevatorOrigin ? 'bg-[#00E676] text-black' : 'bg-white/[0.06] text-white/40'}`}>
                      {elevatorOrigin ? 'Sí' : 'No'}
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#0077BD]" /> Destino
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-white/40 block mb-1">Piso</label>
                    <select value={destFloor} onChange={e => setDestFloor(e.target.value)}
                      className="w-full bg-white/[0.05] border border-white/[0.1] rounded-lg px-3 py-2 text-sm text-white appearance-none focus:outline-none focus:border-[#0077BD]/40">
                      {['baja', '1', '2', '3', '4', '5'].map(f => <option key={f} value={f} className="bg-[#0a0e17]">Planta {f === 'baja' ? 'baja' : f + '°'}</option>)}
                    </select>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-white/60">¿Elevador?</span>
                    <button onClick={() => setElevatorDest(!elevatorDest)}
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${elevatorDest ? 'bg-[#0077BD] text-white' : 'bg-white/[0.06] text-white/40'}`}>
                      {elevatorDest ? 'Sí' : 'No'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-8">
              <label className="text-sm text-white/60 block mb-2">Distancia entre origen y destino (km)</label>
              <input type="number" value={distance} onChange={e => setDistance(e.target.value)} min="1"
                className="w-full max-w-xs bg-white/[0.05] border border-white/[0.1] rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#00E676]/40" placeholder="Ej: 10" />
            </div>
            <div className="flex justify-between">
              <button onClick={() => setStep(2)} className="px-6 py-3 rounded-full text-sm font-semibold text-white/60 border border-white/[0.1] hover:border-white/20 transition-all">← Atrás</button>
              <button onClick={() => setStep(4)} className="px-8 py-3 rounded-full text-sm font-semibold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all duration-300 shadow-[0_0_20px_rgba(0,230,118,0.3)]">
                Ver Cotización →
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Quote */}
        {step === 4 && (
          <div className="max-w-5xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-6 text-center">Resumen de Cotización</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Main summary */}
              <div className="lg:col-span-2 space-y-4">
                {/* Vehicle recommendation */}
                <div className="p-5 rounded-2xl bg-[#00E676]/5 border border-[#00E676]/15">
                  <div className="flex items-center gap-3 mb-3">
                    <Truck className="w-5 h-5 text-[#00E676]" />
                    <span className="text-sm font-semibold text-[#00E676]">Vehículo Recomendado</span>
                  </div>
                  <div className="text-xl font-bold text-white">{getRecommendation(totalVolume).vehicle}</div>
                  <div className="text-sm text-white/40">{getRecommendation(totalVolume).detail}</div>
                </div>
                {/* Items list */}
                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                  <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <ClipboardList className="w-4 h-4 text-[#0077BD]" /> Artículos Seleccionados
                  </h4>
                  {getSelectedItems().length === 0 ? (
                    <p className="text-sm text-white/30">No se seleccionaron artículos</p>
                  ) : (
                    <div className="max-h-48 overflow-y-auto space-y-1.5 custom-scroll">
                      {getSelectedItems().map((item) => (
                        <div key={item.name} className="flex items-center justify-between text-sm py-1">
                          <span className="text-white/60"><span className="mr-1">{item.emoji}</span>{item.qty}x {item.name}</span>
                          <span className="text-white/30">{item.vol.toFixed(2)} m³</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {/* Extras list */}
                {Object.keys(selectedExtras).length > 0 && (
                  <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#FF9800]" /> Servicios Extras
                    </h4>
                    <div className="space-y-1.5">
                      {Object.keys(selectedExtras).map((name) => {
                        const extra = EXTRAS.find(e => e.name === name)!
                        return (
                          <div key={name} className="flex items-center justify-between text-sm py-1">
                            <span className="text-white/60">{name}</span>
                            <span className="text-white/30">Bs {extra.price}{extra.unit ? `/${extra.unit}` : ''}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
                {/* Floor info */}
                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                  <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#8B5CF6]" /> Ubicación
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><span className="text-white/40">Origen:</span> <span className="text-white/70">Planta {originFloor === 'baja' ? 'baja' : originFloor + '°'} {elevatorOrigin ? '(con elevador)' : '(sin elevador)'}</span></div>
                    <div><span className="text-white/40">Destino:</span> <span className="text-white/70">Planta {destFloor === 'baja' ? 'baja' : destFloor + '°'} {elevatorDest ? '(con elevador)' : '(sin elevador)'}</span></div>
                    <div className="col-span-2"><span className="text-white/40">Distancia:</span> <span className="text-white/70">{distance} km</span></div>
                  </div>
                </div>
              </div>

              {/* Price panel */}
              <div className="space-y-4">
                <div className="p-6 rounded-2xl bg-white/[0.04] border border-[#00E676]/15 sticky top-24">
                  <h4 className="text-white font-bold text-lg mb-5">Cotización Estimada</h4>
                  <div className="space-y-3 mb-5">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/50">Volumen total</span>
                      <span className="text-white font-semibold">{totalVolume} m³</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/50">Tipo</span>
                      <span className="text-white font-semibold capitalize">{moveType}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/50">Distancia</span>
                      <span className="text-white font-semibold">{distance} km</span>
                    </div>
                    <div className="h-px bg-white/[0.06]" />
                    <div className="flex justify-between text-sm">
                      <span className="text-white/50">Precio base</span>
                      <span className="text-white font-semibold">Bs {basePrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/50">Extras</span>
                      <span className="text-white font-semibold">Bs {extrasTotal.toLocaleString()}</span>
                    </div>
                    <div className="h-px bg-white/[0.06]" />
                    <div className="flex justify-between">
                      <span className="text-white font-bold">Total estimado</span>
                      <span className="text-2xl font-bold text-[#00E676]">Bs {grandTotal.toLocaleString()}</span>
                    </div>
                  </div>
                  <p className="text-xs text-white/30 mb-5">*Precio estimado. La cotización final puede variar según evaluación presencial.</p>
                  <div className="space-y-3">
                    <a href={`https://wa.me/59173662803?text=${buildWhatsAppMsg()}`} target="_blank" rel="noopener noreferrer"
                      className="w-full py-3 rounded-xl bg-[#25D366] text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#128C7E] transition-all">
                      <MessageCircle className="w-4 h-4" /> Solicitar Cotización Oficial
                    </a>
                    <a href={`https://wa.me/?text=${buildWhatsAppMsg()}`} target="_blank" rel="noopener noreferrer"
                      className="w-full py-3 rounded-xl bg-white/[0.06] text-white/70 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-white/[0.1] transition-all border border-white/[0.08]">
                      <MessageCircle className="w-4 h-4" /> Compartir por WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-start">
              <button onClick={() => setStep(3)} className="px-6 py-3 rounded-full text-sm font-semibold text-white/60 border border-white/[0.1] hover:border-white/20 transition-all">← Modificar</button>
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
        .custom-scroll::-webkit-scrollbar { width: 4px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
        .custom-scroll::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
      `}</style>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   6. PROCESS STEPS
   ═══════════════════════════════════════════════════════════════════════════════ */
const processSteps = [
  { icon: Calculator, title: 'Cotiza', desc: 'Usa nuestra calculadora o contáctanos para obtener tu cotización personalizada', color: '#00E676' },
  { icon: ClipboardList, title: 'Inventario', desc: 'Haz tu inventario de artículos o nosotros te ayudamos a hacerlo en persona', color: '#0077BD' },
  { icon: Package, title: 'Embalaje', desc: 'Nosotros empacamos por ti o tú mismo empacas, tú eliges el nivel de servicio', color: '#FF9800' },
  { icon: Truck, title: 'Transporte', desc: 'Transportamos todo con cuidado, protección y rastreo GPS en tiempo real', color: '#8B5CF6' },
  { icon: CheckCircle, title: 'Entrega', desc: 'Entrega y montaje en tu nuevo hogar u oficina. Todo en su lugar', color: '#E91E63' },
]

function ProcessSection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#080c15] to-[#0a0e17]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[#8B5CF6]/5 blur-[150px]" />
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <A><div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8B5CF8]/10 border border-[#8B5CF8]/20 mb-4">
            <ClipboardList className="w-4 h-4 text-[#8B5CF8]" /><span className="text-sm text-[#8B5CF8]">Cómo Funciona</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Tu Mudanza en <span className="bg-gradient-to-r from-[#00E676] to-[#8B5CF8] bg-clip-text text-transparent">5 Pasos</span></h2>
        </div></A>
        <div className="relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#00E676] via-[#FF9800] to-[#E91E63] md:-translate-x-px" />
          {processSteps.map((s, i) => (
            <A key={s.title} delay={i * 120}>
              <div className={`relative flex items-start mb-8 last:mb-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full z-10" style={{ backgroundColor: s.color, boxShadow: `0 0 20px ${s.color}50` }} />
                <div className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
                  <div className="group p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-white/10 transition-all duration-300">
                    <div className={`flex items-center gap-3 mb-2 ${i % 2 === 0 ? 'md:justify-end' : ''}`}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${s.color}15` }}>
                        <s.icon className="w-5 h-5" style={{ color: s.color }} />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider" style={{ color: s.color }}>Paso {i + 1}</span>
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-1">{s.title}</h3>
                    <p className="text-sm text-white/50 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </div>
            </A>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   7. FAQ
   ═══════════════════════════════════════════════════════════════════════════════ */
const faqs = [
  { q: '¿Cuánto tiempo antes debo reservar mi mudanza?', a: 'Recomendamos reservar al menos 48 horas antes para mudanzas locales y 1 semana para mudanzas nacionales. Sin embargo, también ofrecemos servicio express sujeto a disponibilidad.' },
  { q: '¿Qué incluye el servicio de embalaje?', a: 'Incluye todos los materiales de embalaje (cajas, papel burbuja, plástico stretch, cinta), el embalaje de todos tus artículos por parte de nuestro personal especializado y el etiquetado de cada caja por habitación.' },
  { q: '¿Cómo se calcula el costo de la mudanza?', a: 'El costo se calcula en base al volumen total de tus artículos (m³), la distancia entre origen y destino, el tipo de mudanza (local, provincial o nacional) y los servicios adicionales que contrates. Usa nuestra calculadora para obtener un estimado.' },
  { q: '¿Qué pasa si mis muebles se dañan?', a: 'Contamos con pólizas de seguro que cubren daños durante el transporte. Ofrecemos seguro básico (incluido) y premium (adicional) para mayor cobertura. Todo daño se reporta y procesa dentro de las 24 horas posteriores a la entrega.' },
  { q: '¿Hacen mudanzas a nivel nacional?', a: 'Sí, realizamos mudanzas entre todas las ciudades y departamentos de Bolivia. Contamos con logística coordinada, rastreo GPS satelital y seguro de carga para traslados de larga distancia.' },
  { q: '¿Puedo empaquetar yo mismo mis cosas?', a: 'Por supuesto. Puedes elegir empacar tus pertenencias tú mismo y nosotros nos encargamos del transporte y la carga. Solo asegúrate de usar materiales adecuados y etiquetar las cajas. También ofrecemos el servicio de embalaje profesional como extra.' },
]

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute bottom-1/3 right-0 w-[400px] h-[400px] rounded-full bg-[#FF9800]/5 blur-[120px]" />
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <A><div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF9800]/10 border border-[#FF9800]/20 mb-4">
            <AlertCircle className="w-4 h-4 text-[#FF9800]" /><span className="text-sm text-[#FF9800]">Preguntas Frecuentes</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Todo lo que necesitas <span className="bg-gradient-to-r from-[#FF9800] to-[#00E676] bg-clip-text text-transparent">saber</span></h2>
        </div></A>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <A key={i} delay={i * 80}>
              <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm overflow-hidden">
                <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-all">
                  <span className="text-white font-semibold text-sm pr-4">{faq.q}</span>
                  <ChevronRight className={`w-4 h-4 text-white/30 shrink-0 transition-transform duration-300 ${open === i ? 'rotate-90' : ''}`} />
                </button>
                <div className={`transition-all duration-300 overflow-hidden ${open === i ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-5 pb-5">
                    <p className="text-sm text-white/50 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </div>
            </A>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════════════════════ */
export default function MudanzaPage() {
  return (
    <main className="bg-[#0a0e17] min-h-screen">
      <Navbar />
      <HeroSection />
      <ServiceTypesSection />
      <CategoriesSection />
      <FleetSection />
      <CalculatorSection />
      <ProcessSection />
      <FAQSection />
      <Footer />
    </main>
  )
}
