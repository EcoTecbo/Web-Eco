'use client'

import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import dynamic from 'next/dynamic'
import anime from 'animejs'
import {
  MapPin, Route, Globe, Home, Building2, Shield, Truck, Package,
  CheckCircle, Calculator, ClipboardList, ChevronRight, Minus, Plus,
  ArrowRight, Phone, Sparkles, Box, Sofa, Bed, Tv, Refrigerator,
  ChefHat, Bath, Printer, Piano, Dumbbell, Bike as BikeIcon, CircleDollarSign,
  MessageCircle, Clock, Users, Star, AlertCircle, Mail, CreditCard,
  Search, Navigation, Flag, X, Send, Loader2, ChevronDown
} from 'lucide-react'
import { Navbar } from '@/components/ecotaxi/navbar'
import { Footer } from '@/components/ecotaxi/footer'

// Dynamic import for map component (avoids SSR issues with leaflet)
const MudanzaMap = dynamic(() => import('@/components/mudanza-map'), { ssr: false })

/* Nominatim search */
async function searchAddress(query: string): Promise<NominatimResult[]> {
  if (!query || query.length < 3) return []
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=bo&limit=5`,
      { headers: { 'Accept-Language': 'es' } }
    )
    if (!res.ok) return []
    return await res.json()
  } catch {
    return []
  }
}

/* OSRM route calculation */
async function calculateRoute(
  origin: LatLng,
  destination: LatLng,
  stops: LatLng[]
): Promise<{ distance: number; duration: number; geometry: [number, number][] } | null> {
  const coords = [origin, ...stops, destination]
    .map(c => `${c.lng},${c.lat}`)
    .join(';')
  try {
    const res = await fetch(
      `https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&steps=true`
    )
    if (!res.ok) return null
    const data = await res.json()
    if (!data.routes || data.routes.length === 0) return null
    const route = data.routes[0]
    const geometry: [number, number][] = []
    if (route.geometry) {
      if (typeof route.geometry === 'string') {
        // Decode polyline
        let index = 0
        let lat = 0
        let lng = 0
        while (index < (route.geometry as string).length) {
          let byte: number
          let shift = 0
          let result = 0
          do {
            byte = (route.geometry as string).charCodeAt(index++) - 63
            result |= (byte & 0x1f) << shift
            shift += 5
          } while (byte >= 0x20)
          const dlat = ((result & 1) !== 0 ? ~(result >> 1) : (result >> 1))
          lat += dlat
          shift = 0
          result = 0
          do {
            byte = (route.geometry as string).charCodeAt(index++) - 63
            result |= (byte & 0x1f) << shift
            shift += 5
          } while (byte >= 0x20)
          const dlng = ((result & 1) !== 0 ? ~(result >> 1) : (result >> 1))
          lng += dlng
          geometry.push([lat / 1e5, lng / 1e5])
        }
      } else if (Array.isArray(route.geometry)) {
        for (const coord of route.geometry) {
          if (Array.isArray(coord) && coord.length >= 2) {
            geometry.push([coord[1], coord[0]])
          }
        }
      }
    }
    return {
      distance: route.distance / 1000,
      duration: route.duration / 60,
      geometry,
    }
  } catch {
    return null
  }
}

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

/* Origin extras */
const ORIGIN_EXTRAS: Extra[] = [
  { name: 'Embalaje completo', price: 500 },
  { name: 'Desmontaje de muebles', price: 300 },
  { name: 'Empaque frágil/cristalería', price: 150 },
  { name: 'Protección pisos y paredes', price: 100 },
  { name: 'Carga planta alta sin elevador', price: 100, unit: 'piso' },
  { name: 'Carga planta alta con elevador', price: 150 },
]

/* Destination extras */
const DEST_EXTRAS: Extra[] = [
  { name: 'Desembalaje completo', price: 500 },
  { name: 'Montaje de muebles', price: 300 },
  { name: 'Traslado electrodomésticos especiales', price: 250 },
  { name: 'Guardamuebles/almacenamiento', price: 200, unit: 'semana' },
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

/* Payment methods */
const PAYMENT_METHODS = [
  { id: 'efectivo', label: 'Efectivo', icon: CircleDollarSign },
  { id: 'qr', label: 'QR', icon: CreditCard },
  { id: 'transferencia', label: 'Transferencia bancaria', icon: Building2 },
  { id: 'tarjeta', label: 'Tarjeta crédito/débito', icon: CreditCard },
  { id: 'corporativa', label: 'Cuenta corporativa', icon: Building2 },
]

/* Insurance options */
const INSURANCE_OPTIONS = [
  { amount: 5000, label: 'Bs 5,000' },
  { amount: 10000, label: 'Bs 10,000' },
  { amount: 20000, label: 'Bs 20,000' },
  { amount: 50000, label: 'Bs 50,000' },
]

/* Shared types */
type MoveType = 'local' | 'provincial' | 'nacional'
type CatType = 'casa' | 'oficina' | 'especial'
type PaymentMethod = 'efectivo' | 'qr' | 'transferencia' | 'tarjeta' | 'corporativa'

interface LatLng { lat: number; lng: number }
interface IntermediateStop { id: string; latlng: LatLng; address: string }
interface NominatimResult { display_name: string; lat: string; lon: string }

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
   5. MOVING CALCULATOR (COMPLETELY REWRITTEN — 7 STEPS)
   ═══════════════════════════════════════════════════════════════════════════════ */

/* ═══ CALCULATOR SECTION ═══ */
function CalculatorSection() {
  const [step, setStep] = useState(1)
  const [moveType, setMoveType] = useState<MoveType>('local')
  const [catType, setCatType] = useState<CatType>('casa')
  const [inventory, setInventory] = useState<Record<string, number>>({})
  const [activeRoom, setActiveRoom] = useState('recamara')

  // Step 3: Route & Direction
  const [origin, setOrigin] = useState<LatLng | null>(null)
  const [destination, setDestination] = useState<LatLng | null>(null)
  const [intermediateStops, setIntermediateStops] = useState<IntermediateStop[]>([])
  const [originAddress, setOriginAddress] = useState('')
  const [destAddress, setDestAddress] = useState('')
  const [routeDistance, setRouteDistance] = useState<number>(0)
  const [routeDuration, setRouteDuration] = useState<number>(0)
  const [routeGeometry, setRouteGeometry] = useState<[number, number][]>([])
  const [mapSelectionMode, setMapSelectionMode] = useState<'origin' | 'destination' | 'stop'>('origin')
  const [searchingOrigin, setSearchingOrigin] = useState(false)
  const [searchingDest, setSearchingDest] = useState(false)
  const [originResults, setOriginResults] = useState<NominatimResult[]>([])
  const [destResults, setDestResults] = useState<NominatimResult[]>([])
  const [isCalculatingRoute, setIsCalculatingRoute] = useState(false)

  // Step 4: Origin extras
  const [originExtras, setOriginExtras] = useState<Record<string, number>>({})
  const [originFloor, setOriginFloor] = useState('baja')
  const [elevatorOrigin, setElevatorOrigin] = useState(false)
  const [originHelpers, setOriginHelpers] = useState(0)

  // Step 5: Destination extras
  const [destExtras, setDestExtras] = useState<Record<string, number>>({})
  const [destFloor, setDestFloor] = useState('baja')
  const [elevatorDest, setElevatorDest] = useState(false)
  const [destHelpers, setDestHelpers] = useState(0)
  const [guardamueblesWeeks, setGuardamueblesWeeks] = useState(1)

  // Step 6: Insurance, IVA, Payment
  const [wantsInsurance, setWantsInsurance] = useState(false)
  const [insuranceAmount, setInsuranceAmount] = useState<number>(5000)
  const [customInsurance, setCustomInsurance] = useState('')
  const [includeIva, setIncludeIva] = useState(false)
  const [razonSocial, setRazonSocial] = useState('')
  const [nit, setNit] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('efectivo')

  // Step 7: Personal data
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [hasWhatsApp, setHasWhatsApp] = useState(true)
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<'success' | 'error' | null>(null)

  // ──── Inventory helpers ────
  const setQty = (name: string, delta: number) => {
    setInventory(prev => {
      const cur = prev[name] || 0
      const next = Math.max(0, cur + delta)
      if (next === 0) { const { [name]: _, ...rest } = prev; return rest }
      return { ...prev, [name]: next }
    })
  }

  // ──── Calculations ────
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

  // Origin extras total
  const originExtrasTotal = useMemo(() => {
    let t = 0
    Object.entries(originExtras).forEach(([name, qty]) => {
      const extra = ORIGIN_EXTRAS.find(e => e.name === name)
      if (!extra) return
      if (name === 'Carga planta alta sin elevador') {
        const floors = originFloor === 'baja' ? 0 : parseInt(originFloor)
        t += extra.price * floors * qty
      } else {
        t += extra.price * qty
      }
    })
    t += originHelpers * 150
    return t
  }, [originExtras, originFloor, originHelpers])

  // Dest extras total
  const destExtrasTotal = useMemo(() => {
    let t = 0
    Object.entries(destExtras).forEach(([name, qty]) => {
      const extra = DEST_EXTRAS.find(e => e.name === name)
      if (!extra) return
      if (name === 'Guardamuebles/almacenamiento') {
        t += extra.price * guardamueblesWeeks * qty
      } else {
        t += extra.price * qty
      }
    })
    t += destHelpers * 150
    return t
  }, [destExtras, destHelpers, guardamueblesWeeks])

  const extrasTotal = originExtrasTotal + destExtrasTotal

  const basePrice = useMemo(() => {
    const d = routeDistance > 0 ? routeDistance : 10
    const rates: Record<MoveType, { perKm: number; base: number }> = {
      local: { perKm: 15, base: 200 },
      provincial: { perKm: 12, base: 500 },
      nacional: { perKm: 10, base: 1000 },
    }
    const r = rates[moveType]
    return r.base + r.perKm * d
  }, [moveType, routeDistance])

  const insuranceCost = useMemo(() => {
    if (!wantsInsurance) return 0
    const amount = customInsurance ? parseFloat(customInsurance) || 0 : insuranceAmount
    return Math.round(amount * 0.03)
  }, [wantsInsurance, insuranceAmount, customInsurance])

  const subtotal = basePrice + extrasTotal + insuranceCost
  const ivaAmount = includeIva ? Math.round(subtotal * 0.16) : 0
  const grandTotal = subtotal + ivaAmount

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

  // ──── Nominatim search ────
  const handleOriginSearch = useCallback(async (query: string) => {
    setOriginAddress(query)
    if (query.length < 3) { setOriginResults([]); return }
    const results = await searchAddress(query)
    setOriginResults(results)
  }, [])

  const handleDestSearch = useCallback(async (query: string) => {
    setDestAddress(query)
    if (query.length < 3) { setDestResults([]); return }
    const results = await searchAddress(query)
    setDestResults(results)
  }, [])

  const selectOrigin = (result: NominatimResult) => {
    const latlng = { lat: parseFloat(result.lat), lng: parseFloat(result.lon) }
    setOrigin(latlng)
    setOriginAddress(result.display_name.split(',').slice(0, 3).join(','))
    setOriginResults([])
    setSearchingOrigin(false)
  }

  const selectDest = (result: NominatimResult) => {
    const latlng = { lat: parseFloat(result.lat), lng: parseFloat(result.lon) }
    setDestination(latlng)
    setDestAddress(result.display_name.split(',').slice(0, 3).join(','))
    setDestResults([])
    setSearchingDest(false)
  }

  // ──── Route calculation ────
  const handleCalculateRoute = useCallback(async () => {
    if (!origin || !destination) return
    setIsCalculatingRoute(true)
    const stops = intermediateStops.map(s => s.latlng)
    const result = await calculateRoute(origin, destination, stops)
    if (result) {
      setRouteDistance(Math.round(result.distance * 10) / 10)
      setRouteDuration(Math.round(result.duration))
      setRouteGeometry(result.geometry)
    }
    setIsCalculatingRoute(false)
  }, [origin, destination, intermediateStops])

  // Auto-calculate route when origin, destination, or stops change
  useEffect(() => {
    if (origin && destination) {
      handleCalculateRoute()
    }
  }, [origin, destination, intermediateStops, handleCalculateRoute])

  // ──── Map click handler ────
  const handleMapClick = useCallback((latlng: LatLng) => {
    if (mapSelectionMode === 'origin') {
      setOrigin(latlng)
      setOriginAddress(`${latlng.lat.toFixed(5)}, ${latlng.lng.toFixed(5)}`)
    } else if (mapSelectionMode === 'destination') {
      setDestination(latlng)
      setDestAddress(`${latlng.lat.toFixed(5)}, ${latlng.lng.toFixed(5)}`)
    } else if (mapSelectionMode === 'stop') {
      const newStop: IntermediateStop = {
        id: `stop-${Date.now()}`,
        latlng,
        address: `${latlng.lat.toFixed(5)}, ${latlng.lng.toFixed(5)}`,
      }
      setIntermediateStops(prev => [...prev, newStop])
    }
  }, [mapSelectionMode])

  const removeStop = (id: string) => {
    setIntermediateStops(prev => prev.filter(s => s.id !== id))
  }

  // ──── Toggle extras ────
  const toggleOriginExtra = (name: string) => {
    setOriginExtras(prev => {
      if (prev[name]) { const { [name]: _, ...rest } = prev; return rest }
      return { ...prev, [name]: 1 }
    })
  }

  const toggleDestExtra = (name: string) => {
    setDestExtras(prev => {
      if (prev[name]) { const { [name]: _, ...rest } = prev; return rest }
      return { ...prev, [name]: 1 }
    })
  }

  // ──── Form submission ────
  const buildSummaryText = () => {
    const items = getSelectedItems().map(i => `${i.qty}x ${i.name}`).join(', ')
    const rec = getRecommendation(totalVolume)
    const originExtraNames = Object.keys(originExtras).join(', ') || 'Ninguno'
    const destExtraNames = Object.keys(destExtras).join(', ') || 'Ninguno'

    let text = `COTIZACIÓN DE MUDANZA\n`
    text += `═══════════════════════\n`
    text += `Tipo: ${moveType.toUpperCase()}\n`
    text += `Categoría: ${catType.toUpperCase()}\n`
    text += `Volumen: ${totalVolume} m³\n`
    text += `Vehículo recomendado: ${rec.vehicle}\n`
    text += `Distancia: ${routeDistance > 0 ? routeDistance : '~10'} km\n`
    if (routeDuration > 0) text += `Duración estimada: ${routeDuration} min\n`
    text += `\nORIGEN: ${originAddress || 'No especificado'}\n`
    text += `DESTINO: ${destAddress || 'No especificado'}\n`
    if (intermediateStops.length > 0) {
      text += `PARADAS: ${intermediateStops.map(s => s.address).join(' → ')}\n`
    }
    text += `\nEXTRAS ORIGEN: ${originExtraNames}\n`
    if (originHelpers > 0) text += `Ayudantes en origen: ${originHelpers}\n`
    text += `EXTRAS DESTINO: ${destExtraNames}\n`
    if (destHelpers > 0) text += `Ayudantes en destino: ${destHelpers}\n`
    if (wantsInsurance) text += `\nSeguro: Bs ${customInsurance || insuranceAmount} (costo: Bs ${insuranceCost})\n`
    text += `\nMETODO PAGO: ${paymentMethod}\n`
    if (includeIva) text += `IVA 16%: Bs ${ivaAmount}\n`
    if (includeIva && razonSocial) text += `Razón Social: ${razonSocial}\n`
    if (includeIva && nit) text += `NIT: ${nit}\n`
    text += `\nTOTAL: Bs ${grandTotal.toLocaleString()}\n`
    text += `\nCLIENTE:\n`
    text += `Nombre: ${fullName}\n`
    text += `Teléfono: ${phone}${hasWhatsApp ? ' (WhatsApp)' : ''}\n`
    text += `Email: ${email}\n`
    text += `\nArtículos: ${items || 'Ninguno seleccionado'}`

    return text
  }

  const buildWhatsAppMsg = () => {
    return encodeURIComponent(buildSummaryText())
  }

  const handleSubmit = async () => {
    if (!fullName || !phone || !email) return
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/mudanza/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          moveType, catType, totalVolume, routeDistance, routeDuration,
          originAddress, destAddress, intermediateStops,
          originExtras, destExtras, originHelpers, destHelpers,
          wantsInsurance, insuranceAmount: customInsurance || insuranceAmount, insuranceCost,
          includeIva, ivaAmount, razonSocial, nit, paymentMethod,
          basePrice, extrasTotal, subtotal, grandTotal,
          fullName, phone, hasWhatsApp, email,
          items: getSelectedItems(),
          vehicleRecommendation: getRecommendation(totalVolume).vehicle,
        }),
      })
      if (res.ok) {
        setSubmitResult('success')
      } else {
        setSubmitResult('error')
      }
    } catch {
      setSubmitResult('error')
    }
    setIsSubmitting(false)
  }

  // ──── Steps config ────
  const steps = [
    { num: 1, label: 'Tipo' },
    { num: 2, label: 'Inventario' },
    { num: 3, label: 'Ruta' },
    { num: 4, label: 'Origen +' },
    { num: 5, label: 'Destino +' },
    { num: 6, label: 'Seguro' },
    { num: 7, label: 'Envío' },
  ]

  const inputClass = 'w-full bg-white/[0.04] border border-white/[0.08] text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00E676]/40 transition-all'

  return (
    <section id="calculadora" className="relative py-24 md:py-32">
      {/* Background image */}
      <div className="absolute inset-0 bg-[url('/mudanza-calculator.jpg')] bg-cover bg-center opacity-[0.15]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17]/95 via-[#0d1320]/90 to-[#0a0e17]/95" />

      <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] rounded-full bg-[#00E676]/5 blur-[150px]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <A><div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 mb-4">
            <Calculator className="w-4 h-4 text-[#00E676]" /><span className="text-sm text-[#00E676] font-medium">Calculadora de Mudanza</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Calcula tu <span className="bg-gradient-to-r from-[#00E676] via-[#0077BD] to-[#FF9800] bg-clip-text text-transparent">Mudanza</span></h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">Selecciona tus artículos, define tu ruta, elige extras y obtén una cotización estimada al instante.</p>
        </div></A>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-1 sm:gap-2 mb-10 overflow-x-auto pb-2">
          {steps.map((s, i) => (
            <div key={s.num} className="flex items-center shrink-0">
              <button onClick={() => s.num < step && setStep(s.num)}
                className={`flex items-center gap-1.5 px-2.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${step === s.num ? 'bg-[#00E676] text-black shadow-[0_0_20px_rgba(0,230,118,0.3)]' : step > s.num ? 'bg-[#00E676]/20 text-[#00E676] cursor-pointer' : 'bg-white/[0.05] text-white/40'}`}>
                <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold" style={{ backgroundColor: step >= s.num ? 'rgba(0,230,118,0.2)' : 'rgba(255,255,255,0.05)' }}>{step > s.num ? '✓' : s.num}</span>
                <span className="hidden md:inline">{s.label}</span>
              </button>
              {i < steps.length - 1 && <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-white/20 mx-0.5 sm:mx-1" />}
            </div>
          ))}
        </div>

        {/* Volume & Distance badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.04] border border-[#00E676]/20">
            <Box className="w-4 h-4 text-[#00E676]" />
            <span className="text-sm text-white/60">Volumen:</span>
            <span className="text-lg font-bold text-[#00E676]">{totalVolume} m³</span>
          </div>
          {routeDistance > 0 && (
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.04] border border-[#0077BD]/20">
              <Navigation className="w-4 h-4 text-[#0077BD]" />
              <span className="text-sm text-white/60">Distancia:</span>
              <span className="text-lg font-bold text-[#0077BD]">{routeDistance} km</span>
            </div>
          )}
        </div>

        {/* ═══════════════ Step 1: Tipo de Mudanza ═══════════════ */}
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

        {/* ═══════════════ Step 2: Inventario ═══════════════ */}
        {step === 2 && (
          <div className="max-w-5xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-2 text-center">Inventario de Artículos</h3>
            <p className="text-sm text-white/40 text-center mb-6">Selecciona la cantidad de cada artículo por ambiente</p>
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {ROOM_KEYS.map((key) => (
                <button key={key} onClick={() => setActiveRoom(key)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${activeRoom === key ? 'bg-[#00E676] text-black' : 'bg-white/[0.05] text-white/50 hover:text-white/70'}`}>
                  {ROOMS[key].label}
                </button>
              ))}
            </div>
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
                Siguiente: Ruta →
              </button>
            </div>
          </div>
        )}

        {/* ═══════════════ Step 3: Ruta y Dirección (MAP) ═══════════════ */}
        {step === 3 && (
          <div className="max-w-7xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-2 text-center">Ruta y Dirección</h3>
            <p className="text-sm text-white/40 text-center mb-6">Define origen, destino y paradas intermedias en el mapa</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Left: Form fields */}
              <div className="space-y-4">
                {/* Map selection mode indicator */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-[#00E676]/15">
                  <div className="flex items-center gap-2 mb-3">
                    <Navigation className="w-4 h-4 text-[#00E676]" />
                    <span className="text-sm font-semibold text-[#00E676]">Modo de selección en mapa</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setMapSelectionMode('origin')}
                      className={`flex-1 px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${mapSelectionMode === 'origin' ? 'bg-[#00E676] text-black' : 'bg-white/[0.04] text-white/50 border border-white/[0.08]'}`}>
                      <Flag className="w-3 h-3" /> Origen
                    </button>
                    <button onClick={() => setMapSelectionMode('destination')}
                      className={`flex-1 px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${mapSelectionMode === 'destination' ? 'bg-red-500 text-white' : 'bg-white/[0.04] text-white/50 border border-white/[0.08]'}`}>
                      <Flag className="w-3 h-3" /> Destino
                    </button>
                    <button onClick={() => setMapSelectionMode('stop')}
                      className={`flex-1 px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${mapSelectionMode === 'stop' ? 'bg-[#4FC3F7] text-black' : 'bg-white/[0.04] text-white/50 border border-white/[0.08]'}`}>
                      <Plus className="w-3 h-3" /> Parada
                    </button>
                  </div>
                </div>

                {/* Origin search */}
                <div className="relative">
                  <label className="text-xs text-white/40 block mb-1.5">
                    <Flag className="w-3 h-3 inline mr-1 text-[#00E676]" /> Dirección de Origen
                  </label>
                  <div className="relative">
                    <input type="text" value={originAddress}
                      onChange={(e) => handleOriginSearch(e.target.value)}
                      onFocus={() => { setSearchingOrigin(true); setMapSelectionMode('origin') }}
                      onBlur={() => setTimeout(() => setSearchingOrigin(false), 200)}
                      className={inputClass + ' pr-10'}
                      placeholder="Buscar dirección de origen..." />
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  </div>
                  {searchingOrigin && originResults.length > 0 && (
                    <div className="absolute z-30 w-full mt-1 rounded-xl bg-[#0a0e17] border border-white/[0.1] max-h-48 overflow-y-auto custom-scroll shadow-2xl">
                      {originResults.map((r, i) => (
                        <button key={i} onClick={() => selectOrigin(r)}
                          className="w-full text-left px-4 py-3 text-sm text-white/70 hover:bg-white/[0.06] border-b border-white/[0.04] last:border-b-0 transition-all">
                          {r.display_name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Destination search */}
                <div className="relative">
                  <label className="text-xs text-white/40 block mb-1.5">
                    <Flag className="w-3 h-3 inline mr-1 text-red-400" /> Dirección de Destino
                  </label>
                  <div className="relative">
                    <input type="text" value={destAddress}
                      onChange={(e) => handleDestSearch(e.target.value)}
                      onFocus={() => { setSearchingDest(true); setMapSelectionMode('destination') }}
                      onBlur={() => setTimeout(() => setSearchingDest(false), 200)}
                      className={inputClass + ' pr-10'}
                      placeholder="Buscar dirección de destino..." />
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  </div>
                  {searchingDest && destResults.length > 0 && (
                    <div className="absolute z-30 w-full mt-1 rounded-xl bg-[#0a0e17] border border-white/[0.1] max-h-48 overflow-y-auto custom-scroll shadow-2xl">
                      {destResults.map((r, i) => (
                        <button key={i} onClick={() => selectDest(r)}
                          className="w-full text-left px-4 py-3 text-sm text-white/70 hover:bg-white/[0.06] border-b border-white/[0.04] last:border-b-0 transition-all">
                          {r.display_name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Intermediate stops */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs text-white/40">
                      <Flag className="w-3 h-3 inline mr-1 text-[#4FC3F7]" /> Paradas Intermedias
                    </label>
                    <button onClick={() => setMapSelectionMode('stop')}
                      className="text-xs text-[#4FC3F7] hover:text-[#4FC3F7]/80 transition-colors flex items-center gap-1">
                      <Plus className="w-3 h-3" /> Agregar
                    </button>
                  </div>
                  {intermediateStops.map((stop) => (
                    <div key={stop.id} className="flex items-center gap-2 p-2.5 rounded-xl bg-[#4FC3F7]/5 border border-[#4FC3F7]/20">
                      <Flag className="w-3.5 h-3.5 text-[#4FC3F7] shrink-0" />
                      <span className="text-sm text-white/60 flex-1 truncate">{stop.address}</span>
                      <button onClick={() => removeStop(stop.id)} className="shrink-0 text-white/30 hover:text-red-400 transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {intermediateStops.length === 0 && (
                    <p className="text-xs text-white/20 text-center py-2">No hay paradas intermedias</p>
                  )}
                </div>

                {/* Route info */}
                {routeDistance > 0 && (
                  <div className="p-4 rounded-2xl bg-[#0077BD]/10 border border-[#0077BD]/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Route className="w-4 h-4 text-[#0077BD]" />
                      <span className="text-sm font-semibold text-[#0077BD]">Ruta Calculada</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-white/40">Distancia</span>
                        <div className="text-white font-bold">{routeDistance} km</div>
                      </div>
                      <div>
                        <span className="text-white/40">Duración est.</span>
                        <div className="text-white font-bold">{routeDuration} min</div>
                      </div>
                    </div>
                  </div>
                )}

                {isCalculatingRoute && (
                  <div className="flex items-center gap-2 text-sm text-[#0077BD]">
                    <Loader2 className="w-4 h-4 animate-spin" /> Calculando ruta...
                  </div>
                )}
              </div>

              {/* Right: Map */}
              <div className="relative rounded-2xl overflow-hidden border border-white/[0.08]" style={{ height: '400px' }}>
                <MudanzaMap
                  origin={origin}
                  destination={destination}
                  intermediateStops={intermediateStops}
                  originAddress={originAddress}
                  destAddress={destAddress}
                  routeGeometry={routeGeometry}
                  mapSelectionMode={mapSelectionMode}
                  onMapClick={handleMapClick}
                />
              </div>
            </div>

            <div className="flex justify-between">
              <button onClick={() => setStep(2)} className="px-6 py-3 rounded-full text-sm font-semibold text-white/60 border border-white/[0.1] hover:border-white/20 transition-all">← Atrás</button>
              <button onClick={() => setStep(4)} className="px-8 py-3 rounded-full text-sm font-semibold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all duration-300 shadow-[0_0_20px_rgba(0,230,118,0.3)]">
                Siguiente: Complementos Origen →
              </button>
            </div>
          </div>
        )}

        {/* ═══════════════ Step 4: Complementos de Origen ═══════════════ */}
        {step === 4 && (
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-2 text-center">Complementos de Origen</h3>
            <p className="text-sm text-white/40 text-center mb-8">Servicios adicionales en el punto de partida</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {ORIGIN_EXTRAS.map((extra) => {
                const checked = !!originExtras[extra.name]
                return (
                  <button key={extra.name} onClick={() => toggleOriginExtra(extra.name)}
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

            {/* Ayudantes en origen */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] mb-6">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="text-white font-semibold text-sm">Ayudantes en Origen</h4>
                  <p className="text-xs text-white/30">Bs 150 c/u</p>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => setOriginHelpers(Math.max(0, originHelpers - 1))}
                    className="w-9 h-9 rounded-xl bg-white/[0.06] flex items-center justify-center text-white/60 hover:bg-white/10 transition-all">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-xl font-bold text-white w-8 text-center">{originHelpers}</span>
                  <button onClick={() => setOriginHelpers(originHelpers + 1)}
                    className="w-9 h-9 rounded-xl bg-[#00E676]/20 flex items-center justify-center text-[#00E676] hover:bg-[#00E676]/30 transition-all">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {originHelpers > 0 && (
                <div className="text-sm text-[#00E676]">Bs {originHelpers * 150}</div>
              )}
            </div>

            {/* Piso y elevador origen */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] mb-6">
              <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#00E676]" /> Piso de Origen
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-white/40 block mb-1">Piso</label>
                  <select value={originFloor} onChange={e => setOriginFloor(e.target.value)}
                    className={inputClass + ' appearance-none'}>
                    {['baja', '1', '2', '3', '4', '5'].map(f => <option key={f} value={f} className="bg-[#0a0e17]">Planta {f === 'baja' ? 'baja' : f + '°'}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-white/40 block mb-1">Elevador</label>
                  <button onClick={() => setElevatorOrigin(!elevatorOrigin)}
                    className={`w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all ${elevatorOrigin ? 'bg-[#00E676] text-black' : 'bg-white/[0.04] text-white/40 border border-white/[0.08]'}`}>
                    {elevatorOrigin ? 'Sí' : 'No'}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <button onClick={() => setStep(3)} className="px-6 py-3 rounded-full text-sm font-semibold text-white/60 border border-white/[0.1] hover:border-white/20 transition-all">← Atrás</button>
              <button onClick={() => setStep(5)} className="px-8 py-3 rounded-full text-sm font-semibold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all duration-300 shadow-[0_0_20px_rgba(0,230,118,0.3)]">
                Siguiente: Complementos Destino →
              </button>
            </div>
          </div>
        )}

        {/* ═══════════════ Step 5: Complementos de Destino ═══════════════ */}
        {step === 5 && (
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-2 text-center">Complementos de Destino</h3>
            <p className="text-sm text-white/40 text-center mb-8">Servicios adicionales en el punto de llegada</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {DEST_EXTRAS.map((extra) => {
                const checked = !!destExtras[extra.name]
                return (
                  <div key={extra.name}>
                    <button onClick={() => toggleDestExtra(extra.name)}
                      className={`w-full flex items-center gap-3 p-4 rounded-xl text-left transition-all duration-200 ${checked ? 'bg-[#0077BD]/5 border-[#0077BD]/20 border' : 'bg-white/[0.02] border border-white/[0.06] hover:border-white/10'}`}>
                      <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 transition-all ${checked ? 'bg-[#0077BD]' : 'bg-white/[0.08] border border-white/[0.15]'}`}>
                        {checked && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-white font-medium truncate">{extra.name}</div>
                        <div className="text-xs text-white/30">Bs {extra.price}{extra.unit ? `/${extra.unit}` : ''}</div>
                      </div>
                    </button>
                    {/* Guardamuebles weeks selector */}
                    {checked && extra.name === 'Guardamuebles/almacenamiento' && (
                      <div className="mt-2 ml-8 flex items-center gap-3">
                        <span className="text-xs text-white/40">Semanas:</span>
                        <button onClick={() => setGuardamueblesWeeks(Math.max(1, guardamueblesWeeks - 1))}
                          className="w-7 h-7 rounded-lg bg-white/[0.06] flex items-center justify-center text-white/60 hover:bg-white/10 transition-all">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-bold text-white">{guardamueblesWeeks}</span>
                        <button onClick={() => setGuardamueblesWeeks(guardamueblesWeeks + 1)}
                          className="w-7 h-7 rounded-lg bg-[#0077BD]/20 flex items-center justify-center text-[#0077BD] hover:bg-[#0077BD]/30 transition-all">
                          <Plus className="w-3 h-3" />
                          </button>
                        <span className="text-xs text-white/30">Bs {200 * guardamueblesWeeks}</span>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Ayudantes en destino */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] mb-6">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="text-white font-semibold text-sm">Ayudantes en Destino</h4>
                  <p className="text-xs text-white/30">Bs 150 c/u</p>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => setDestHelpers(Math.max(0, destHelpers - 1))}
                    className="w-9 h-9 rounded-xl bg-white/[0.06] flex items-center justify-center text-white/60 hover:bg-white/10 transition-all">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-xl font-bold text-white w-8 text-center">{destHelpers}</span>
                  <button onClick={() => setDestHelpers(destHelpers + 1)}
                    className="w-9 h-9 rounded-xl bg-[#0077BD]/20 flex items-center justify-center text-[#0077BD] hover:bg-[#0077BD]/30 transition-all">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {destHelpers > 0 && (
                <div className="text-sm text-[#0077BD]">Bs {destHelpers * 150}</div>
              )}
            </div>

            {/* Piso y elevador destino */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] mb-6">
              <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#0077BD]" /> Piso de Destino
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-white/40 block mb-1">Piso</label>
                  <select value={destFloor} onChange={e => setDestFloor(e.target.value)}
                    className={inputClass + ' appearance-none'}>
                    {['baja', '1', '2', '3', '4', '5'].map(f => <option key={f} value={f} className="bg-[#0a0e17]">Planta {f === 'baja' ? 'baja' : f + '°'}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-white/40 block mb-1">Elevador</label>
                  <button onClick={() => setElevatorDest(!elevatorDest)}
                    className={`w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all ${elevatorDest ? 'bg-[#0077BD] text-white' : 'bg-white/[0.04] text-white/40 border border-white/[0.08]'}`}>
                    {elevatorDest ? 'Sí' : 'No'}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <button onClick={() => setStep(4)} className="px-6 py-3 rounded-full text-sm font-semibold text-white/60 border border-white/[0.1] hover:border-white/20 transition-all">← Atrás</button>
              <button onClick={() => setStep(6)} className="px-8 py-3 rounded-full text-sm font-semibold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all duration-300 shadow-[0_0_20px_rgba(0,230,118,0.3)]">
                Siguiente: Seguro y Pago →
              </button>
            </div>
          </div>
        )}

        {/* ═══════════════ Step 6: Seguro, IVA y Pago ═══════════════ */}
        {step === 6 && (
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-2 text-center">Seguro, IVA y Método de Pago</h3>
            <p className="text-sm text-white/40 text-center mb-8">Configura el seguro de carga, facturación y forma de pago</p>

            {/* Insurance */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#FF9800]" />
                  <h4 className="text-white font-semibold">Seguro de Carga</h4>
                </div>
                <button onClick={() => setWantsInsurance(!wantsInsurance)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${wantsInsurance ? 'bg-[#FF9800] text-white' : 'bg-white/[0.04] text-white/40 border border-white/[0.08]'}`}>
                  {wantsInsurance ? 'Sí, incluir seguro' : 'No incluir seguro'}
                </button>
              </div>
              {wantsInsurance && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-white/40 block mb-2">Valor declarado de la carga</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {INSURANCE_OPTIONS.map((opt) => (
                        <button key={opt.amount} onClick={() => { setInsuranceAmount(opt.amount); setCustomInsurance('') }}
                          className={`p-3 rounded-xl text-sm font-semibold transition-all ${insuranceAmount === opt.amount && !customInsurance ? 'bg-[#FF9800]/20 border-[#FF9800]/40 border text-[#FF9800]' : 'bg-white/[0.03] border border-white/[0.06] text-white/50 hover:border-white/10'}`}>
                          {opt.label}
                        </button>
                      ))}
                    </div>
                    <div className="mt-3">
                      <label className="text-xs text-white/40 block mb-1">O monto personalizado</label>
                      <input type="number" value={customInsurance} onChange={e => setCustomInsurance(e.target.value)}
                        className={inputClass + ' max-w-xs'} placeholder="Bs (monto personalizado)" min="0" />
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#FF9800]/5 border border-[#FF9800]/15">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/50">Valor declarado</span>
                      <span className="text-white font-semibold">Bs {(customInsurance ? parseFloat(customInsurance) || 0 : insuranceAmount).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-white/50">Costo del seguro (3%)</span>
                      <span className="text-[#FF9800] font-bold">Bs {insuranceCost.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* IVA */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <CircleDollarSign className="w-5 h-5 text-[#818CF8]" />
                  <h4 className="text-white font-semibold">Facturación con IVA (16%)</h4>
                </div>
                <button onClick={() => setIncludeIva(!includeIva)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${includeIva ? 'bg-[#818CF8] text-white' : 'bg-white/[0.04] text-white/40 border border-white/[0.08]'}`}>
                  {includeIva ? 'Sí, con IVA' : 'Sin IVA'}
                </button>
              </div>
              {includeIva && (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-white/40 block mb-1">Razón Social</label>
                    <input type="text" value={razonSocial} onChange={e => setRazonSocial(e.target.value)}
                      className={inputClass} placeholder="Nombre o razón social" />
                  </div>
                  <div>
                    <label className="text-xs text-white/40 block mb-1">NIT</label>
                    <input type="text" value={nit} onChange={e => setNit(e.target.value)}
                      className={inputClass} placeholder="Número de NIT" />
                  </div>
                  <div className="p-3 rounded-xl bg-[#818CF8]/5 border border-[#818CF8]/15">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/50">Subtotal</span>
                      <span className="text-white font-semibold">Bs {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-white/50">IVA 16%</span>
                      <span className="text-[#818CF8] font-bold">Bs {ivaAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Payment method */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] mb-6">
              <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#00E676]" /> Método de Pago
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {PAYMENT_METHODS.map((pm) => {
                  const Icon = pm.icon
                  return (
                    <button key={pm.id} onClick={() => setPaymentMethod(pm.id)}
                      className={`flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200 ${paymentMethod === pm.id ? 'bg-[#00E676]/5 border-[#00E676]/20 border' : 'bg-white/[0.02] border border-white/[0.06] hover:border-white/10'}`}>
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${paymentMethod === pm.id ? 'bg-[#00E676]/20' : 'bg-white/[0.04]'}`}>
                        <Icon className={`w-4 h-4 ${paymentMethod === pm.id ? 'text-[#00E676]' : 'text-white/30'}`} />
                      </div>
                      <span className={`text-sm font-medium ${paymentMethod === pm.id ? 'text-white' : 'text-white/50'}`}>{pm.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Running total */}
            <div className="p-5 rounded-2xl bg-white/[0.04] border border-[#00E676]/15 mb-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Precio base</span>
                  <span className="text-white font-semibold">Bs {basePrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Extras</span>
                  <span className="text-white font-semibold">Bs {extrasTotal.toLocaleString()}</span>
                </div>
                {wantsInsurance && (
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Seguro</span>
                    <span className="text-white font-semibold">Bs {insuranceCost.toLocaleString()}</span>
                  </div>
                )}
                {includeIva && (
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">IVA 16%</span>
                    <span className="text-white font-semibold">Bs {ivaAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="h-px bg-white/[0.06]" />
                <div className="flex justify-between">
                  <span className="text-white font-bold">Total estimado</span>
                  <span className="text-2xl font-bold text-[#00E676]">Bs {grandTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <button onClick={() => setStep(5)} className="px-6 py-3 rounded-full text-sm font-semibold text-white/60 border border-white/[0.1] hover:border-white/20 transition-all">← Atrás</button>
              <button onClick={() => setStep(7)} className="px-8 py-3 rounded-full text-sm font-semibold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all duration-300 shadow-[0_0_20px_rgba(0,230,118,0.3)]">
                Siguiente: Datos Personales →
              </button>
            </div>
          </div>
        )}

        {/* ═══════════════ Step 7: Datos Personales y Envío ═══════════════ */}
        {step === 7 && (
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-2 text-center">Datos Personales y Envío</h3>
            <p className="text-sm text-white/40 text-center mb-8">Completa tus datos para enviar la cotización</p>

            {submitResult === 'success' ? (
              /* Success state */
              <div className="max-w-lg mx-auto text-center">
                <div className="w-20 h-20 rounded-full bg-[#00E676]/20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-[#00E676]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">¡Cotización Enviada!</h3>
                <p className="text-white/50 mb-6">
                  Hemos enviado tu cotización a <span className="text-[#00E676]">ecotaxi@oyc-srl.com</span>.
                  Nuestro equipo se pondrá en contacto contigo pronto.
                </p>
                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] mb-6 text-left">
                  <h4 className="text-white font-semibold mb-3">Resumen</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-white/40">Total estimado</span><span className="text-[#00E676] font-bold text-lg">Bs {grandTotal.toLocaleString()}</span></div>
                    <div className="flex justify-between"><span className="text-white/40">Tipo</span><span className="text-white">{moveType}</span></div>
                    <div className="flex justify-between"><span className="text-white/40">Vehículo</span><span className="text-white">{getRecommendation(totalVolume).vehicle}</span></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <a href={`https://wa.me/59173662803?text=${buildWhatsAppMsg()}`} target="_blank" rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl bg-[#25D366] text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#128C7E] transition-all">
                    <MessageCircle className="w-4 h-4" /> Enviar por WhatsApp
                  </a>
                  <button onClick={() => { setSubmitResult(null); setStep(1) }}
                    className="w-full py-3 rounded-xl bg-white/[0.06] text-white/70 font-semibold text-sm hover:bg-white/[0.1] transition-all border border-white/[0.08]">
                    Nueva Cotización
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="text-xs text-white/40 block mb-1.5">Nombre completo *</label>
                    <input type="text" value={fullName} onChange={e => setFullName(e.target.value)}
                      className={inputClass} placeholder="Tu nombre completo" required />
                  </div>
                  <div>
                    <label className="text-xs text-white/40 block mb-1.5">Teléfono *</label>
                    <div className="flex gap-2">
                      <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                        className={inputClass + ' flex-1'} placeholder="+591 xxx xxxxx" required />
                    </div>
                    <div className="mt-2">
                      <button onClick={() => setHasWhatsApp(!hasWhatsApp)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${hasWhatsApp ? 'bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30' : 'bg-white/[0.04] text-white/30 border border-white/[0.08]'}`}>
                        <MessageCircle className="w-3 h-3" /> Tiene WhatsApp
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="text-xs text-white/40 block mb-1.5">Correo electrónico *</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                    className={inputClass + ' max-w-lg'} placeholder="tu@email.com" required />
                </div>

                {/* Summary */}
                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] mb-6">
                  <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <ClipboardList className="w-4 h-4 text-[#0077BD]" /> Resumen de Cotización
                  </h4>
                  <div className="space-y-2 text-sm max-h-48 overflow-y-auto custom-scroll">
                    <div className="flex justify-between"><span className="text-white/40">Tipo de mudanza</span><span className="text-white capitalize">{moveType} / {catType}</span></div>
                    <div className="flex justify-between"><span className="text-white/40">Volumen</span><span className="text-white">{totalVolume} m³</span></div>
                    <div className="flex justify-between"><span className="text-white/40">Vehículo</span><span className="text-white">{getRecommendation(totalVolume).vehicle}</span></div>
                    <div className="flex justify-between"><span className="text-white/40">Distancia</span><span className="text-white">{routeDistance > 0 ? `${routeDistance} km` : '~10 km'}</span></div>
                    <div className="h-px bg-white/[0.06]" />
                    <div className="flex justify-between"><span className="text-white/40">Precio base</span><span className="text-white">Bs {basePrice.toLocaleString()}</span></div>
                    <div className="flex justify-between"><span className="text-white/40">Extras origen</span><span className="text-white">Bs {originExtrasTotal.toLocaleString()}</span></div>
                    <div className="flex justify-between"><span className="text-white/40">Extras destino</span><span className="text-white">Bs {destExtrasTotal.toLocaleString()}</span></div>
                    {wantsInsurance && <div className="flex justify-between"><span className="text-white/40">Seguro</span><span className="text-white">Bs {insuranceCost.toLocaleString()}</span></div>}
                    {includeIva && <div className="flex justify-between"><span className="text-white/40">IVA 16%</span><span className="text-white">Bs {ivaAmount.toLocaleString()}</span></div>}
                    <div className="h-px bg-white/[0.06]" />
                    <div className="flex justify-between"><span className="text-white font-bold">Total estimado</span><span className="text-xl font-bold text-[#00E676]">Bs {grandTotal.toLocaleString()}</span></div>
                  </div>
                </div>

                {submitResult === 'error' && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 mb-4 text-sm text-red-400 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" /> Error al enviar. Intenta de nuevo o contáctanos por WhatsApp.
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <button onClick={() => setStep(6)} className="px-6 py-3 rounded-full text-sm font-semibold text-white/60 border border-white/[0.1] hover:border-white/20 transition-all">← Atrás</button>
                  <div className="flex gap-3">
                    <a href={`https://wa.me/59173662803?text=${buildWhatsAppMsg()}`} target="_blank" rel="noopener noreferrer"
                      className="px-6 py-3 rounded-full text-sm font-semibold bg-[#25D366] text-white flex items-center gap-2 hover:bg-[#128C7E] transition-all">
                      <MessageCircle className="w-4 h-4" /> WhatsApp
                    </a>
                    <button onClick={handleSubmit} disabled={isSubmitting || !fullName || !phone || !email}
                      className="px-8 py-3 rounded-full text-sm font-semibold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all duration-300 shadow-[0_0_20px_rgba(0,230,118,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                      {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Enviando...</> : <><Send className="w-4 h-4" /> Enviar Cotización</>}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Custom styles */}
      <style jsx global>{`
        .origin-marker { filter: hue-rotate(100deg) saturate(1.5); }
        .dest-marker { filter: hue-rotate(-30deg) saturate(2) brightness(0.8); }
        .stop-marker { filter: hue-rotate(180deg) saturate(1.5) brightness(1.2); }
        .custom-scroll::-webkit-scrollbar { width: 4px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
        .custom-scroll::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
        .leaflet-container { background: #0a0e17; }
        .leaflet-control-zoom a { background: #0a0e17 !important; color: white !important; border-color: rgba(255,255,255,0.1) !important; }
        .leaflet-control-attribution { background: rgba(10,14,23,0.8) !important; color: rgba(255,255,255,0.3) !important; font-size: 8px !important; }
        .leaflet-control-attribution a { color: rgba(255,255,255,0.4) !important; }
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
