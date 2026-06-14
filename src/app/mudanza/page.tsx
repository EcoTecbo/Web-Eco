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
import { SchemaOrg } from '@/components/ecotaxi/schema-org'

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

/* extras (legacy - kept for type reference) */
interface Extra { name: string; price: number; unit?: string }

/* Box purchase options */
const BOX_OPTIONS = [
  { id: 'caja_peq', name: 'Caja Pequeña (30×30×30 cm)', price: 15, emoji: '📦' },
  { id: 'caja_med', name: 'Caja Mediana (40×40×40 cm)', price: 25, emoji: '📦' },
  { id: 'caja_gra', name: 'Caja Grande (50×50×50 cm)', price: 35, emoji: '📦' },
]

/* Packing materials */
const PACKING_MATERIALS = [
  { id: 'papel_film', name: 'Papel Film (rollo)', price: 30, emoji: '🔀' },
  { id: 'papel_burbuja', name: 'Papel Burbuja (rollo)', price: 45, emoji: '🫧' },
  { id: 'papel_kraft', name: 'Papel Kraft (rollo)', price: 25, emoji: '🟫' },
  { id: 'manta_proteccion', name: 'Manta de Protección', price: 50, emoji: '🛡️' },
  { id: 'cinta_embalar', name: 'Cinta de Embalar (rollo)', price: 15, emoji: '📎' },
  { id: 'etiquetas', name: 'Etiquetas y Marcadores', price: 10, emoji: '🏷️' },
]

/* Handling extras (per item, applies to both origin/dest) */
const HANDLING_EXTRAS = [
  { id: 'armado_muebles', name: 'Armado y Desarmado de Muebles Grandes', price: 80, unit: 'mueble', emoji: '🔧', desc: 'Roperos, camas, cunas, escritorios grandes' },
  { id: 'embalaje_fragil', name: 'Embalaje Especial Objetos Frágiles', price: 60, unit: 'juego', emoji: '🍷', desc: 'Vajilla, espejos, obras de arte, pantallas TV' },
  { id: 'objetos_pesados', name: 'Objetos de Gran Peso / Línea Blanca', price: 120, unit: 'objeto', emoji: '🏋️', desc: 'Pianos, cajas fuertes, refrigeradores 2 puertas' },
]

/* Accessibility extras (per location - origin and destination separately) */
const ACCESSIBILITY_EXTRAS = [
  { id: 'distancia_caminata', name: 'Distancia de Caminata / Acarreo', price: 20, unit: '10m', emoji: '🚶', desc: 'Si el camión no puede estacionar frente a la puerta' },
  { id: 'elevador_fachada', name: 'Elevador por Fachada (Grúa)', price: 200, unit: 'hr', emoji: '🏗️', desc: 'Grúa externa para subir muebles por ventana' },
]

/* Logistics extras */
const LOGISTICS_EXTRAS = [
  { id: 'punto_carga_extra', name: 'Punto de Carga Adicional (parada extra)', price: 100, unit: 'parada', emoji: '📍' },
  { id: 'retiro_cajas', name: 'Desescombro / Retiro de Cajas y Material', price: 150, emoji: '♻️', desc: 'Retornamos días después para llevar cartón y plástico' },
]

/* Mudanza size categories for Path B */
const MUDANZA_CATEGORIES = [
  {
    id: 'express',
    name: 'Mudanza Express',
    subtitle: 'Monoambiente / Departamento Pequeño',
    emoji: '📦',
    color: '#00E676',
    desc: 'Ideal para departamentos de 1 dormitorio o monoambientes. Incluye camas, un ropero mediano, heladera, electrodomésticos básicos y 10-15 cajas.',
    suggestedVehicle: { cerrado: 'Furgón Pequeño', abierto: 'Pickup' },
    maxVolume: 6,
  },
  {
    id: 'estandar',
    name: 'Mudanza Estándar',
    subtitle: 'Departamento Familiar',
    emoji: '🏠',
    color: '#0077BD',
    desc: 'Ideal para departamentos de 2 a 3 dormitorios. Muebles de living, comedor, camas, línea blanca completa y 20-30 cajas.',
    suggestedVehicle: { cerrado: 'Furgón Mediano', abierto: 'Camioneta Mediana' },
    maxVolume: 14,
  },
  {
    id: 'familiar',
    name: 'Mudanza Familiar',
    subtitle: 'Casa Familiar Mediana',
    emoji: '🏡',
    color: '#FF9800',
    desc: 'Ideal para casas de 3 a 4 dormitorios. Mobiliario completo de casa, muebles de jardín, múltiples roperos y más de 40 cajas.',
    suggestedVehicle: { cerrado: 'Furgón Grande', abierto: 'Camioneta Larga' },
    maxVolume: 25,
  },
  {
    id: 'premium',
    name: 'Mudanza Premium',
    subtitle: 'Casa Grande / Corporativa',
    emoji: '🏢',
    color: '#818CF8',
    desc: 'Ideal para casas amplias de más de 4 dormitorios o traslados de oficinas. Residencias grandes en un solo viaje o múltiples vehículos.',
    suggestedVehicle: { cerrado: 'Furgón Largo', abierto: 'Camioneta Grande' },
    maxVolume: 35,
  },
]

/* vehicles */
const VEHICLES = [
  { cat: 'Camioneta', color: '#FB923C', items: [
    { name: 'Pickup', cap: 8, desc: 'Caja abierta grande, ideal para cargas sin protección del clima', pax: 2, floorElev: 5, floorNoElev: 10, helperPrice: 60, perKm: 8, img: '/vehicles/6-CAMIONETA/pickup.png' },
    { name: 'Camioneta Pequeña', cap: 5, desc: 'Mudanzas pequeñas, departamento studio o 1 dormitorio', pax: 2, floorElev: 10, floorNoElev: 15, helperPrice: 80, perKm: 10, img: '/vehicles/6-CAMIONETA/pequena.png' },
    { name: 'Camioneta Mediana', cap: 12, desc: 'Mudanzas medianas, departamento 2 dormitorios', pax: 3, floorElev: 15, floorNoElev: 20, helperPrice: 100, perKm: 12, img: '/vehicles/6-CAMIONETA/mediana.png' },
    { name: 'Camioneta Grande', cap: 35, desc: 'Mudanzas extra grandes o múltiples destinos', pax: 3, floorElev: 20, floorNoElev: 25, helperPrice: 120, perKm: 15, img: '/vehicles/6-CAMIONETA/grande.jpg' },
    { name: 'Camioneta Larga', cap: 22, desc: 'Mudanzas grandes, casa 3+ dormitorios', pax: 3, floorElev: 25, floorNoElev: 30, helperPrice: 150, perKm: 18, img: '/vehicles/6-CAMIONETA/larga.png' },
  ]},
  { cat: 'Furgón', color: '#818CF8', items: [
    { name: 'Furgón Pequeño', cap: 6, desc: 'Carga pequeña, mudanzas studio (6m³)', pax: 2, floorElev: 10, floorNoElev: 15, helperPrice: 80, perKm: 10, img: '/vehicles/7-FURGON/pequeno.png' },
    { name: 'Furgón Mediano', cap: 12, desc: 'Carga mediana, mudanzas 1-2 dormitorios (12m³)', pax: 2, floorElev: 15, floorNoElev: 20, helperPrice: 100, perKm: 12, img: '/vehicles/7-FURGON/mediano.png' },
    { name: 'Furgón Grande', cap: 20, desc: 'Carga grande, mudanzas 2-3 dormitorios (20m³)', pax: 3, floorElev: 20, floorNoElev: 25, helperPrice: 120, perKm: 15, img: '/vehicles/7-FURGON/grande.png' },
    { name: 'Furgón Largo', cap: 30, desc: 'Carga extra grande, casas grandes (30m³)', pax: 3, floorElev: 25, floorNoElev: 30, helperPrice: 150, perKm: 18, img: '/vehicles/7-FURGON/largo.png' },
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
  const [heroSlide, setHeroSlide] = useState(0)
  const heroImages = ['/mudanza-hero-bg.webp', '/mudanza-hero1.webp', '/mudanza-hero2.webp']

  // Auto-slide hero images
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroSlide(prev => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [heroImages.length])

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      {/* Background images with fade transition - real photos */}
      {heroImages.map((img, i) => (
        <div key={img} className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{ backgroundImage: `url('${img}')`, opacity: heroSlide === i ? 0.35 : 0 }} />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17]/70 via-[#0d1320]/60 to-[#0a0e17]/85" />
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `linear-gradient(rgba(0,230,118,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,230,118,0.3) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[#00E676]/8 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#0077BD]/8 blur-[120px]" />

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

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {heroImages.map((_, i) => (
          <button key={i} onClick={() => setHeroSlide(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${heroSlide === i ? 'bg-[#00E676] w-12' : 'bg-white/20 w-8'}`} />
        ))}
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   2. SERVICE TYPES
   ═══════════════════════════════════════════════════════════════════════════════ */
const serviceTypes = [
  { icon: MapPin, title: 'Mudanza Local', color: '#00E676',
    desc: 'Dentro de la misma ciudad. Disponibles en Santa Cruz, La Paz y Cochabamba. Servicio el mismo día con equipo profesional y vehículos adecuados para cada tipo de mudanza.',
    features: ['Servicio el mismo día', 'Cobertura en 3 ciudades principales', 'Rastreo GPS en tiempo real', 'Seguro de carga incluido'] },
  { icon: Route, title: 'Mudanza Provincial', color: '#0077BD',
    desc: 'Entre provincias dentro del mismo departamento. Servicio al día siguiente con logística coordinada y protección especial para traslados de mayor distancia dentro del departamento.',
    features: ['Servicio al día siguiente', 'Protección especial para distancia', 'Coordinación logística completa', 'Reporte de ubicación en ruta'] },
  { icon: Globe, title: 'Mudanza Nacional', color: '#FF9800',
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
                  <a href="#calculadora" className="text-sm font-semibold text-[#00E676] hover:text-[#00ff88] transition-colors">Cotizar ahora →</a>
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
  { id: 'casa', icon: Home, label: 'Mudanza Domiciliaria', color: '#00E676',
    bgImage: '/mudanza-servicio-casa.webp',
    desc: 'Mudanza residencial completa. Transportamos tus muebles, electrodomésticos y pertenencias con el máximo cuidado desde tu hogar actual hasta tu nuevo hogar.',
    included: ['Desmontaje y montaje de muebles', 'Protección con mantas y plástico', 'Transporte de electrodomésticos', 'Carga y descarga profesional'],
    vehicles: 'Camioneta Mediana, Furgón Grande', notes: 'Recomendamos embalaje profesional para cristalería y objetos frágiles.' },
  { id: 'especial', icon: Shield, label: 'Mudanza Especial', color: '#FF9800',
    bgImage: '/mudanza-servicio-especial.webp',
    desc: 'Para artículos de alto valor o delicados: pianos, obras de arte, cajas fuertes, equipo médico y antigüedades. Personal especializado y embalaje a medida.',
    included: ['Embalaje a medida personalizado', 'Personal especializado certificado', 'Seguro premium obligatorio', 'Equipamiento de sujeción profesional'],
    vehicles: 'Furgón Grande con suspensión reforzada', notes: 'Cotización personalizada obligatoria. Se requiere evaluación previa del artículo.' },
  { id: 'oficina', icon: Building2, label: 'Mudanza de Oficina', color: '#0077BD',
    bgImage: '/mudanza-servicio-oficina.webp',
    desc: 'Relocalización de oficinas con mínima interrupción. Manejamos equipos informáticos, mobiliario corporativo y documentación con protocolos de seguridad especiales.',
    included: ['Protocolo para equipos electrónicos', 'Embalaje de documentación', 'Desconexión/conexión de equipos', 'Montaje de estaciones de trabajo'],
    vehicles: 'Furgón Mediano, Furgón Largo', notes: 'Disponemos de servicio nocturno y fin de semana para no afectar la operatividad.' },
]

function CategoriesSection() {
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((c, i) => (
            <A key={c.id} delay={i * 100}>
              <div className="group relative rounded-2xl overflow-hidden border border-white/[0.08] hover:border-white/20 transition-all duration-500 h-full flex flex-col min-h-[420px]">
                {/* Background image with lighter overlay for visibility */}
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${c.bgImage}')` }} />
                {/* Lighter gradient overlay so image is visible */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e17] via-[#0a0e17]/60 to-[#0a0e17]/30" />
                <div className="absolute inset-0 bg-[#0a0e17]/20" />
                {/* Content */}
                <div className="relative z-10 p-6 md:p-7 flex flex-col h-full justify-end">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center backdrop-blur-sm" style={{ backgroundColor: `${c.color}25`, border: `1px solid ${c.color}40` }}>
                      <c.icon className="w-5 h-5" style={{ color: c.color }} />
                    </div>
                    <h3 className="text-xl font-bold text-white">{c.label}</h3>
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed mb-4">{c.desc}</p>
                  <div className="space-y-2 mb-4">
                    {c.included.map((item) => (
                      <div key={item} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: c.color }} />
                        <span className="text-sm text-white/75">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-auto pt-3 border-t border-white/10">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: c.color }} />
                      <span className="text-xs text-white/50">{c.vehicles} — {c.notes}</span>
                    </div>
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
   4. MOVING FLEET
   ═══════════════════════════════════════════════════════════════════════════════ */
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
              {cat.cat === 'Furgón' ? '🚛 Furgones (Cerrados)' : '🛻 Camionetas (Abiertas)'}
            </h3></A>
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${cat.cat === 'Camioneta' ? '5' : '4'} gap-4`}>
              {cat.items.map((v, i) => (
                <A key={v.name} delay={i * 80}>
                  <div className="group p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-white/10 transition-all duration-300">
                    <div className="flex justify-center mb-3 h-20 items-center">
                      <img src={v.img} alt={v.name} className="max-h-full max-w-full object-contain drop-shadow-[0_0_12px_rgba(255,255,255,0.08)] group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all duration-300 group-hover:scale-105" />
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
   5. MOVING CALCULATOR (6 STEPS)
   ═══════════════════════════════════════════════════════════════════════════════ */

/* ═══ CALCULATOR SECTION ═══ */
function CalculatorSection() {
  const [step, setStep] = useState(1)
  const [moveType, setMoveType] = useState<MoveType>('local')
  const [catType, setCatType] = useState<CatType>('casa')
  const [inventory, setInventory] = useState<Record<string, number>>({})
  const [activeRoom, setActiveRoom] = useState('recamara')

  // Vehicle selection
  const [vehicleType, setVehicleType] = useState<'cerrado' | 'abierto'>('cerrado')
  const [selectedVehicle, setSelectedVehicle] = useState<typeof VEHICLES[0]['items'][0] | null>(null)

  // Two-path flow
  const [calcPath, setCalcPath] = useState<'A' | 'B' | 'C' | null>(null) // A=knows vehicle, B=by size, C=furniture calculator
  const [mudanzaCategory, setMudanzaCategory] = useState<string | null>(null) // For Path B category selection
  const [additionalVehicles, setAdditionalVehicles] = useState<typeof VEHICLES[0]['items'][0][]>([])

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

  // Embalaje
  const [embalajeType, setEmbalajeType] = useState<'ninguno' | 'completo' | 'solo_embalaje' | 'solo_desembalaje'>('ninguno')

  // Boxes and materials
  const [boxes, setBoxes] = useState<Record<string, number>>({})
  const [materials, setMaterials] = useState<Record<string, number>>({})

  // Handling extras
  const [handlingExtras, setHandlingExtras] = useState<Record<string, number>>({})

  // Accessibility - Origin
  const [originFloor, setOriginFloor] = useState('baja')
  const [elevatorOrigin, setElevatorOrigin] = useState(false)
  const [originCaminata, setOriginCaminata] = useState(0)
  const [originFachada, setOriginFachada] = useState(0)

  // Accessibility - Destination
  const [destFloor, setDestFloor] = useState('baja')
  const [elevatorDest, setElevatorDest] = useState(false)
  const [destCaminata, setDestCaminata] = useState(0)
  const [destFachada, setDestFachada] = useState(0)

  // Helpers (shared for carga y descarga)
  const [helpers, setHelpers] = useState(0)

  // Logistics
  const [logisticsExtras, setLogisticsExtras] = useState<Record<string, number>>({})

  // Step 5: Insurance, IVA, Payment
  const [wantsInsurance, setWantsInsurance] = useState(false)
  const [insuranceAmount, setInsuranceAmount] = useState<number>(5000)
  const [customInsurance, setCustomInsurance] = useState('')
  const [includeIva, setIncludeIva] = useState(false)
  const [razonSocial, setRazonSocial] = useState('')
  const [nit, setNit] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('efectivo')

  // Step 6: Personal data
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

  // Smart vehicle suggestion based on volume and vehicle type preference
  const getVehicleSuggestion = (vol: number, vType: 'cerrado' | 'abierto') => {
    const cat = vType === 'cerrado' ? VEHICLES.find(v => v.cat === 'Furgón')! : VEHICLES.find(v => v.cat === 'Camioneta')!
    const items = cat.items

    // Find the smallest vehicle that fits
    for (const vehicle of items) {
      if (vol <= vehicle.cap) return { vehicle, additional: [] }
    }

    // Volume exceeds largest vehicle - need additional vehicles
    const largest = items[items.length - 1]
    const remaining = vol - largest.cap
    const additional: typeof items[0][] = []

    // Add more vehicles for remaining volume
    let rem = remaining
    while (rem > 0) {
      let found = false
      for (const vehicle of items) {
        if (rem <= vehicle.cap) {
          additional.push(vehicle)
          rem = 0
          found = true
          break
        }
      }
      if (!found) {
        additional.push(largest)
        rem -= largest.cap
      }
    }

    return { vehicle: largest, additional }
  }

  // Legacy compatibility
  const getRecommendation = (vol: number) => {
    if (vol <= 0) return { vehicle: '—', detail: 'Selecciona artículos para ver recomendación' }
    if (vol <= 6) return { vehicle: 'Furgón Pequeño', detail: '6m³ — Ideal para studios' }
    if (vol <= 12) return { vehicle: 'Furgón Mediano o Camioneta Pequeña', detail: '12m³ — Ideal para 1-2 dormitorios' }
    if (vol <= 20) return { vehicle: 'Furgón Grande o Camioneta Mediana', detail: '20m³ — Ideal para 2-3 dormitorios' }
    if (vol <= 30) return { vehicle: 'Furgón Largo o Camioneta Larga', detail: '30m³ — Ideal para casas grandes' }
    return { vehicle: 'Camioneta Grande + Furgón Largo', detail: '2 vehículos o 2 viajes recomendados' }
  }

  // Auto-suggest vehicle when in Path B and volume changes
  useEffect(() => {
    if ((calcPath === 'B' || calcPath === 'C') && vehicleType && totalVolume > 0) {
      const suggestion = getVehicleSuggestion(totalVolume, vehicleType)
      setSelectedVehicle(suggestion.vehicle)
      setAdditionalVehicles(suggestion.additional)
    }
  }, [totalVolume, calcPath, vehicleType])

  // ──── Calculations ────
  // Floor cost helpers
  const getFloorCount = (floor: string) => floor === 'baja' ? 0 : parseInt(floor) || 0

  const originFloorCost = useMemo(() => {
    if (!selectedVehicle) return 0
    const floors = getFloorCount(originFloor)
    if (floors === 0) return 0
    const pricePerFloor = elevatorOrigin ? selectedVehicle.floorElev : selectedVehicle.floorNoElev
    return floors * pricePerFloor
  }, [selectedVehicle, originFloor, elevatorOrigin])

  const destFloorCost = useMemo(() => {
    if (!selectedVehicle) return 0
    const floors = getFloorCount(destFloor)
    if (floors === 0) return 0
    const pricePerFloor = elevatorDest ? selectedVehicle.floorElev : selectedVehicle.floorNoElev
    return floors * pricePerFloor
  }, [selectedVehicle, destFloor, elevatorDest])

  // Embalaje cost
  const embalajeCost = useMemo(() => {
    if (embalajeType === 'ninguno') return 0
    if (embalajeType === 'completo') return Math.round(totalVolume * 45)
    if (embalajeType === 'solo_embalaje') return Math.round(totalVolume * 30)
    if (embalajeType === 'solo_desembalaje') return Math.round(totalVolume * 15)
    return 0
  }, [embalajeType, totalVolume])

  // Boxes cost
  const boxesCost = useMemo(() => {
    let t = 0
    Object.entries(boxes).forEach(([id, qty]) => {
      const box = BOX_OPTIONS.find(b => b.id === id)
      if (box) t += box.price * qty
    })
    return t
  }, [boxes])

  // Materials cost
  const materialsCost = useMemo(() => {
    let t = 0
    Object.entries(materials).forEach(([id, qty]) => {
      const mat = PACKING_MATERIALS.find(m => m.id === id)
      if (mat) t += mat.price * qty
    })
    return t
  }, [materials])

  // Handling extras cost
  const handlingCost = useMemo(() => {
    let t = 0
    Object.entries(handlingExtras).forEach(([id, qty]) => {
      const extra = HANDLING_EXTRAS.find(e => e.id === id)
      if (extra) t += extra.price * qty
    })
    return t
  }, [handlingExtras])

  // Accessibility extras cost
  const accessibilityCost = useMemo(() => {
    const caminataPrice = ACCESSIBILITY_EXTRAS.find(a => a.id === 'distancia_caminata')!.price
    const fachadaPrice = ACCESSIBILITY_EXTRAS.find(a => a.id === 'elevador_fachada')!.price
    return (originCaminata * caminataPrice) + (originFachada * fachadaPrice)
      + (destCaminata * caminataPrice) + (destFachada * fachadaPrice)
  }, [originCaminata, originFachada, destCaminata, destFachada])

  // Helpers cost
  const helpersCost = useMemo(() => {
    if (!selectedVehicle) return helpers * 80
    return helpers * selectedVehicle.helperPrice
  }, [helpers, selectedVehicle])

  // Logistics cost
  const logisticsCost = useMemo(() => {
    let t = 0
    Object.entries(logisticsExtras).forEach(([id, qty]) => {
      const extra = LOGISTICS_EXTRAS.find(e => e.id === id)
      if (extra) t += extra.price * qty
    })
    return t
  }, [logisticsExtras])

  const extrasTotal = embalajeCost + boxesCost + materialsCost + handlingCost + originFloorCost + destFloorCost + accessibilityCost + helpersCost + logisticsCost

  const basePrice = useMemo(() => {
    const d = routeDistance > 0 ? routeDistance : 10
    const bases: Record<MoveType, number> = { local: 200, provincial: 500, nacional: 1000 }
    const perKm = selectedVehicle ? selectedVehicle.perKm : 10
    let price = bases[moveType] + perKm * d
    // Add cost for additional vehicles
    for (const av of additionalVehicles) {
      price += av.perKm * d * 0.7 // Additional vehicles at 70% rate
    }
    return price
  }, [moveType, routeDistance, selectedVehicle, additionalVehicles])

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

  // ──── Form submission ────
  const buildSummaryText = () => {
    const items = getSelectedItems().map(i => `${i.qty}x ${i.name}`).join(', ')
    const vehicleName = selectedVehicle ? selectedVehicle.name : getRecommendation(totalVolume).vehicle
    const embalajeLabel = embalajeType === 'completo' ? 'Completo (Bs 45/m³)' : embalajeType === 'solo_embalaje' ? 'Solo Embalaje (Bs 30/m³)' : embalajeType === 'solo_desembalaje' ? 'Solo Desembalaje (Bs 15/m³)' : 'Ninguno'
    const catLabel = MUDANZA_CATEGORIES.find(c => c.id === mudanzaCategory)?.name || catType

    let text = `COTIZACIÓN DE MUDANZA\n`
    text += `═══════════════════════\n`
    text += `Ruta: ${calcPath === 'A' ? 'A (Selección directa)' : 'B (Asistencia guiada)'}\n`
    text += `Tipo: ${moveType.toUpperCase()}\n`
    text += `Categoría: ${catLabel.toUpperCase()}\n`
    text += `Vehículo: ${vehicleName}\n`
    if (additionalVehicles.length > 0) {
      text += `Vehículos adicionales: ${additionalVehicles.map(av => av.name).join(', ')}\n`
    }
    text += `Capacidad total: ${selectedVehicle ? selectedVehicle.cap : 0}${additionalVehicles.length > 0 ? ` + ${additionalVehicles.reduce((s, av) => s + av.cap, 0)}` : ''} m³\n`
    text += `Volumen: ${totalVolume} m³\n`
    text += `Distancia: ${routeDistance > 0 ? routeDistance : '~10'} km\n`
    if (routeDuration > 0) text += `Duración estimada: ${routeDuration} min\n`
    text += `\nORIGEN: ${originAddress || 'No especificado'}\n`
    text += `  Piso: ${originFloor === 'baja' ? 'Planta baja' : `Piso ${originFloor}`}${elevatorOrigin ? ' (con elevador)' : ' (sin elevador)'}\n`
    if (originFloorCost > 0) text += `  Costo piso: Bs ${originFloorCost}\n`
    if (originCaminata > 0) text += `  Distancia caminata: ${originCaminata} x 10m\n`
    if (originFachada > 0) text += `  Elevador fachada: ${originFachada} hr\n`
    text += `\nDESTINO: ${destAddress || 'No especificado'}\n`
    text += `  Piso: ${destFloor === 'baja' ? 'Planta baja' : `Piso ${destFloor}`}${elevatorDest ? ' (con elevador)' : ' (sin elevador)'}\n`
    if (destFloorCost > 0) text += `  Costo piso: Bs ${destFloorCost}\n`
    if (destCaminata > 0) text += `  Distancia caminata: ${destCaminata} x 10m\n`
    if (destFachada > 0) text += `  Elevador fachada: ${destFachada} hr\n`
    if (intermediateStops.length > 0) {
      text += `\nPARADAS: ${intermediateStops.map(s => s.address).join(' → ')}\n`
    }
    text += `\nEMBALAJE: ${embalajeLabel}\n`
    if (embalajeCost > 0) text += `  Costo embalaje: Bs ${embalajeCost}\n`
    if (Object.keys(boxes).length > 0) {
      text += `CAJAS: ${Object.entries(boxes).map(([id, q]) => { const b = BOX_OPTIONS.find(x => x.id === id); return b ? `${q}x ${b.name}` : '' }).join(', ')}\n`
    }
    if (Object.keys(materials).length > 0) {
      text += `MATERIALES: ${Object.entries(materials).map(([id, q]) => { const m = PACKING_MATERIALS.find(x => x.id === id); return m ? `${q}x ${m.name}` : '' }).join(', ')}\n`
    }
    if (Object.keys(handlingExtras).length > 0) {
      text += `MANIPULACIÓN: ${Object.entries(handlingExtras).map(([id, q]) => { const h = HANDLING_EXTRAS.find(x => x.id === id); return h ? `${q}x ${h.name}` : '' }).join(', ')}\n`
    }
    if (helpers > 0) text += `AYUDANTES: ${helpers} (Bs ${selectedVehicle?.helperPrice || 80} c/u = Bs ${helpersCost})\n`
    if (Object.keys(logisticsExtras).length > 0) {
      text += `LOGÍSTICA: ${Object.entries(logisticsExtras).map(([id, q]) => { const l = LOGISTICS_EXTRAS.find(x => x.id === id); return l ? `${q}x ${l.name}` : '' }).join(', ')}\n`
    }
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
          vehicleType, selectedVehicle: selectedVehicle ? { name: selectedVehicle.name, cap: selectedVehicle.cap, perKm: selectedVehicle.perKm, helperPrice: selectedVehicle.helperPrice, floorElev: selectedVehicle.floorElev, floorNoElev: selectedVehicle.floorNoElev } : null,
          calcPath, mudanzaCategory, additionalVehicles: additionalVehicles.map(av => ({ name: av.name, cap: av.cap, perKm: av.perKm })),
          embalajeType, embalajeCost, boxes, boxesCost, materials, materialsCost,
          handlingExtras, handlingCost,
          originFloor, elevatorOrigin, originFloorCost, originCaminata, originFachada,
          destFloor, elevatorDest, destFloorCost, destCaminata, destFachada,
          accessibilityCost,
          helpers, helpersCost,
          logisticsExtras, logisticsCost,
          wantsInsurance, insuranceAmount: customInsurance || insuranceAmount, insuranceCost,
          includeIva, ivaAmount, razonSocial, nit, paymentMethod,
          basePrice, extrasTotal, subtotal, grandTotal,
          fullName, phone, hasWhatsApp, email,
          items: getSelectedItems(),
          vehicleRecommendation: selectedVehicle ? selectedVehicle.name : getRecommendation(totalVolume).vehicle,
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

  // ──── Steps config (dynamic based on path) ────
  const steps = calcPath === 'A'
    ? [
        { num: 1, label: 'Vehículo' },
        { num: 2, label: 'Ruta' },
        { num: 3, label: 'Extras' },
        { num: 4, label: 'Seguro' },
        { num: 5, label: 'Envío' },
      ]
    : calcPath === 'B'
    ? [
        { num: 1, label: 'Categoría' },
        { num: 2, label: 'Ruta' },
        { num: 3, label: 'Extras' },
        { num: 4, label: 'Seguro' },
        { num: 5, label: 'Envío' },
      ]
    : calcPath === 'C'
    ? [
        { num: 1, label: 'Categoría' },
        { num: 2, label: 'Mobiliario' },
        { num: 3, label: 'Ruta' },
        { num: 4, label: 'Extras' },
        { num: 5, label: 'Seguro' },
        { num: 6, label: 'Envío' },
      ]
    : [
        { num: 1, label: 'Inicio' },
      ]

  const inputClass = 'w-full bg-white/[0.04] border border-white/[0.08] text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00E676]/40 transition-all'

  return (
    <section id="calculadora" className="relative py-24 md:py-32">
      {/* Background image */}
      <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: "url('/mudanza-calculator.webp')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
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
          {calcPath === 'B' && totalVolume > 0 && selectedVehicle && (
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.04] border border-[#818CF8]/20">
              <Truck className="w-4 h-4 text-[#818CF8]" />
              <span className="text-sm text-white/60">Sugerido:</span>
              <span className="text-lg font-bold text-[#818CF8]">{selectedVehicle.name}</span>
              {additionalVehicles.length > 0 && (
                <span className="text-sm text-[#FF9800]">+ {additionalVehicles.length} vehículo{additionalVehicles.length > 1 ? 's' : ''} adicional{additionalVehicles.length > 1 ? 'es' : ''}</span>
              )}
            </div>
          )}
        </div>

        {/* ═══════════════ Step 1: Path Selection / Vehicle / Category ═══════════════ */}
        {step === 1 && calcPath === null && (
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-2 text-center">¿Cómo deseas cotizar tu mudanza?</h3>
            <p className="text-sm text-white/40 text-center mb-8">Elige la opción que mejor se adapte a ti</p>

            {/* Three-path selection */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
              <button onClick={() => { setCalcPath('A') }}
                className="group p-6 rounded-2xl text-left transition-all duration-300 bg-white/[0.03] border border-white/[0.06] hover:border-[#00E676]/40 hover:bg-white/[0.05]">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 bg-[#00E676]/10 group-hover:bg-[#00E676]/20 transition-all">
                  <Truck className="w-6 h-6 text-[#00E676]" />
                </div>
                <h4 className="text-base font-bold text-white mb-2">Ya sé qué vehículo necesito</h4>
                <p className="text-xs text-white/50 leading-relaxed mb-3">Selecciona el tipo de vehículo (Furgón o Camioneta), elige tu vehículo y cotiza directamente.</p>
                <span className="text-xs text-[#00E676] font-semibold">Ruta A →</span>
              </button>
              <button onClick={() => { setCalcPath('B') }}
                className="group p-6 rounded-2xl text-left transition-all duration-300 bg-white/[0.03] border border-white/[0.06] hover:border-[#818CF8]/40 hover:bg-white/[0.05]">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 bg-[#818CF8]/10 group-hover:bg-[#818CF8]/20 transition-all">
                  <ClipboardList className="w-6 h-6 text-[#818CF8]" />
                </div>
                <h4 className="text-base font-bold text-white mb-2">Conozco el tamaño de mi mudanza</h4>
                <p className="text-xs text-white/50 leading-relaxed mb-3">Selecciona Express, Estándar, Familiar o Premium y te asignamos el vehículo ideal automáticamente.</p>
                <span className="text-xs text-[#818CF8] font-semibold">Ruta B →</span>
              </button>
              <button onClick={() => { setCalcPath('C') }}
                className="group p-6 rounded-2xl text-left transition-all duration-300 bg-white/[0.03] border border-white/[0.06] hover:border-[#FF9800]/40 hover:bg-white/[0.05]">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 bg-[#FF9800]/10 group-hover:bg-[#FF9800]/20 transition-all">
                  <Calculator className="w-6 h-6 text-[#FF9800]" />
                </div>
                <h4 className="text-base font-bold text-white mb-2">Ayúdame a elegir</h4>
                <p className="text-xs text-white/50 leading-relaxed mb-3">Carga tu mobiliario por ambiente y calculamos el volumen para sugerirte el vehículo perfecto.</p>
                <span className="text-xs text-[#FF9800] font-semibold">Ruta C →</span>
              </button>
            </div>

            {/* Move type selection */}
            <h3 className="text-lg font-bold text-white mb-2 text-center">Tipo de Mudanza</h3>
            <p className="text-sm text-white/40 text-center mb-4">Selecciona la distancia de tu traslado</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {([['local', 'Local', MapPin, '#00E676'], ['provincial', 'Provincial', Route, '#0077BD'], ['nacional', 'Nacional', Globe, '#FF9800']] as const).map(([id, label, Icon, color]) => (
                <button key={id} onClick={() => setMoveType(id)}
                  className={`p-5 rounded-2xl text-left transition-all duration-300 ${moveType === id ? 'bg-white/[0.06] border-2' : 'bg-white/[0.03] border border-white/[0.06] hover:border-white/10'}`}
                  style={moveType === id ? { borderColor: `${color}60` } : {}}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: `${color}15` }}>
                    <Icon className="w-5 h-5" style={{ color }} />
                  </div>
                  <h4 className="text-base font-bold text-white mb-1">Mudanza {label}</h4>
                  <p className="text-xs text-white/40">{id === 'local' ? 'Misma ciudad' : id === 'provincial' ? 'Mismo departamento' : 'Todo Bolivia'}</p>
                </button>
              ))}
            </div>

            {/* Category selection */}
            <h3 className="text-lg font-bold text-white mb-2 text-center">¿Qué mudas?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {([['casa', 'Casa', Home, '#00E676'], ['oficina', 'Oficina', Building2, '#0077BD'], ['especial', 'Especial', Shield, '#FF9800']] as const).map(([id, label, Icon, color]) => (
                <button key={id} onClick={() => setCatType(id)}
                  className={`p-4 rounded-2xl text-left transition-all duration-300 ${catType === id ? 'bg-white/[0.06] border-2' : 'bg-white/[0.03] border border-white/[0.06] hover:border-white/10'}`}
                  style={catType === id ? { borderColor: `${color}60` } : {}}>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
                      <Icon className="w-4 h-4" style={{ color }} />
                    </div>
                    <span className="text-white font-semibold text-sm">{label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ═══════════════ Step 1 (Path A): Vehicle Selection ═══════════════ */}
        {step === 1 && calcPath === 'A' && (
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <button onClick={() => { setCalcPath(null); setSelectedVehicle(null) }}
                className="text-xs text-white/40 hover:text-white/60 transition-colors flex items-center gap-1">
                ← Cambiar ruta
              </button>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#00E676]/10 text-[#00E676] font-semibold">Ruta A</span>
            </div>

            {/* Vehicle type selection */}
            <h3 className="text-xl font-bold text-white mb-2 text-center">¿Vehículo cerrado o abierto?</h3>
            <p className="text-sm text-white/40 text-center mb-6">Los furgones protegen del clima, las camionetas tienen caja abierta</p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button onClick={() => { setVehicleType('cerrado'); setSelectedVehicle(null) }}
                className={`p-5 rounded-2xl text-center transition-all duration-300 ${vehicleType === 'cerrado' ? 'bg-[#818CF8]/10 border-2 border-[#818CF8]/50' : 'bg-white/[0.03] border border-white/[0.06] hover:border-white/10'}`}>
                <div className="flex justify-center mb-2 h-16 items-center">
                  <img src="/vehicles/7-FURGON/mediano.png" alt="Furgón" className="max-h-full max-w-[80px] object-contain" />
                </div>
                <div className="text-white font-semibold mb-1">Furgón (Cerrado)</div>
                <div className="text-xs text-white/40">Protección completa del clima</div>
              </button>
              <button onClick={() => { setVehicleType('abierto'); setSelectedVehicle(null) }}
                className={`p-5 rounded-2xl text-center transition-all duration-300 ${vehicleType === 'abierto' ? 'bg-[#FB923C]/10 border-2 border-[#FB923C]/50' : 'bg-white/[0.03] border border-white/[0.06] hover:border-white/10'}`}>
                <div className="flex justify-center mb-2 h-16 items-center">
                  <img src="/vehicles/6-CAMIONETA/mediana.png" alt="Camioneta" className="max-h-full max-w-[80px] object-contain" />
                </div>
                <div className="text-white font-semibold mb-1">Camioneta (Abierto)</div>
                <div className="text-xs text-white/40">Caja abierta, ideal para cargas resistentes</div>
              </button>
            </div>

            {/* Vehicle options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {(vehicleType === 'cerrado' ? VEHICLES.find(v => v.cat === 'Furgón')! : VEHICLES.find(v => v.cat === 'Camioneta')!).items.map((v) => {
                const isSelected = selectedVehicle?.name === v.name
                const catColor = vehicleType === 'cerrado' ? '#818CF8' : '#FB923C'
                return (
                  <button key={v.name} onClick={() => { setSelectedVehicle(v); setAdditionalVehicles([]) }}
                    className={`p-4 rounded-xl text-left transition-all duration-200 ${isSelected ? `border-2` : 'bg-white/[0.02] border border-white/[0.06] hover:border-white/10'}`}
                    style={isSelected ? { backgroundColor: `${catColor}08`, borderColor: `${catColor}50` } : {}}>
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-14 shrink-0 flex items-center justify-center">
                        <img src={v.img} alt={v.name} className="max-h-full max-w-full object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-white font-semibold text-sm">{v.name}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full font-semibold shrink-0" style={{ backgroundColor: `${catColor}15`, color: catColor }}>{v.cap} m³</span>
                        </div>
                        <p className="text-xs text-white/40 mb-1">{v.desc}</p>
                        <div className="flex items-center gap-3 text-xs text-white/30">
                          <span>{v.pax} pax</span>
                          <span>{v.cap} m³</span>
                        </div>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
            <div className="flex justify-end">
              <button onClick={() => setStep(2)} disabled={!selectedVehicle}
                className="px-8 py-3 rounded-full text-sm font-semibold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all duration-300 shadow-[0_0_20px_rgba(0,230,118,0.3)] disabled:opacity-40 disabled:cursor-not-allowed">
                Siguiente: Ruta →
              </button>
            </div>
          </div>
        )}

        {/* ═══════════════ Step 1 (Path B): Category + Vehicle Type ═══════════════ */}
        {step === 1 && calcPath === 'B' && (
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <button onClick={() => { setCalcPath(null); setSelectedVehicle(null); setMudanzaCategory(null); setAdditionalVehicles([]) }}
                className="text-xs text-white/40 hover:text-white/60 transition-colors flex items-center gap-1">
                ← Cambiar ruta
              </button>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#818CF8]/10 text-[#818CF8] font-semibold">Ruta B — Tamaño</span>
            </div>

            {/* Vehicle type selection */}
            <h3 className="text-xl font-bold text-white mb-2 text-center">¿Vehículo cerrado o abierto?</h3>
            <p className="text-sm text-white/40 text-center mb-6">Los furgones protegen del clima, las camionetas tienen caja abierta</p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <button onClick={() => { setVehicleType('cerrado'); setSelectedVehicle(null); setMudanzaCategory(null) }}
                className={`p-5 rounded-2xl text-center transition-all duration-300 ${vehicleType === 'cerrado' ? 'bg-[#818CF8]/10 border-2 border-[#818CF8]/50' : 'bg-white/[0.03] border border-white/[0.06] hover:border-white/10'}`}>
                <div className="flex justify-center mb-2 h-16 items-center">
                  <img src="/vehicles/7-FURGON/mediano.png" alt="Furgón" className="max-h-full max-w-[80px] object-contain" />
                </div>
                <div className="text-white font-semibold mb-1">Furgón (Cerrado)</div>
                <div className="text-xs text-white/40">Protección completa del clima</div>
              </button>
              <button onClick={() => { setVehicleType('abierto'); setSelectedVehicle(null); setMudanzaCategory(null) }}
                className={`p-5 rounded-2xl text-center transition-all duration-300 ${vehicleType === 'abierto' ? 'bg-[#FB923C]/10 border-2 border-[#FB923C]/50' : 'bg-white/[0.03] border border-white/[0.06] hover:border-white/10'}`}>
                <div className="flex justify-center mb-2 h-16 items-center">
                  <img src="/vehicles/6-CAMIONETA/mediana.png" alt="Camioneta" className="max-h-full max-w-[80px] object-contain" />
                </div>
                <div className="text-white font-semibold mb-1">Camioneta (Abierto)</div>
                <div className="text-xs text-white/40">Caja abierta, ideal para cargas resistentes</div>
              </button>
            </div>

            {/* Mudanza size categories */}
            <h3 className="text-xl font-bold text-white mb-2 text-center">¿Qué tamaño es tu mudanza?</h3>
            <p className="text-sm text-white/40 text-center mb-6">Selecciona la categoría que mejor describe tu mudanza</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {MUDANZA_CATEGORIES.map((cat) => {
                const isSelected = mudanzaCategory === cat.id
                const suggestedName = cat.suggestedVehicle[vehicleType]
                const vehicleList = vehicleType === 'cerrado' ? VEHICLES.find(v => v.cat === 'Furgón')! : VEHICLES.find(v => v.cat === 'Camioneta')!
                const suggestedVehicle = vehicleList.items.find(v => v.name === suggestedName)
                return (
                  <button key={cat.id} onClick={() => {
                    setMudanzaCategory(cat.id)
                    // Auto-suggest vehicle based on category
                    if (suggestedVehicle) { setSelectedVehicle(suggestedVehicle); setAdditionalVehicles([]) }
                  }}
                    className={`p-5 rounded-2xl text-left transition-all duration-300 ${isSelected ? 'border-2' : 'bg-white/[0.03] border border-white/[0.06] hover:border-white/10'}`}
                    style={isSelected ? { backgroundColor: `${cat.color}08`, borderColor: `${cat.color}50` } : {}}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-16 h-12 shrink-0 flex items-center justify-center">
                        {suggestedVehicle ? (
                          <img src={suggestedVehicle.img} alt={suggestedName} className="max-h-full max-w-full object-contain" />
                        ) : (
                          <span className="text-2xl">{cat.emoji}</span>
                        )}
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-sm">{cat.name}</h4>
                        <span className="text-xs text-white/40">{cat.subtitle}</span>
                      </div>
                    </div>
                    <p className="text-xs text-white/50 leading-relaxed mb-3">{cat.desc}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ backgroundColor: `${cat.color}15`, color: cat.color }}>Hasta {cat.maxVolume} m³</span>
                      <span className="text-xs text-white/30">→ {suggestedName}</span>
                    </div>
                  </button>
                )
              })}
            </div>

            {mudanzaCategory && (
              <div className="p-4 rounded-xl bg-[#818CF8]/5 border border-[#818CF8]/15 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-20 h-14 shrink-0 flex items-center justify-center">
                    {selectedVehicle ? (
                      <img src={selectedVehicle.img} alt={selectedVehicle.name} className="max-h-full max-w-full object-contain" />
                    ) : (
                      <Truck className="w-8 h-8 text-[#818CF8]/40" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="w-4 h-4 text-[#818CF8]" />
                      <span className="text-sm font-semibold text-[#818CF8]">Vehículo sugerido</span>
                    </div>
                    <p className="text-sm text-white/60">
                      {selectedVehicle ? (
                        <>
                          <span className="text-white font-semibold">{selectedVehicle.name}</span> ({selectedVehicle.cap} m³)
                          {additionalVehicles.length > 0 && (
                            <span className="text-[#FF9800]"> + {additionalVehicles.length} vehículo{additionalVehicles.length > 1 ? 's' : ''} adicional{additionalVehicles.length > 1 ? 'es' : ''}</span>
                          )}
                        </>
                      ) : 'Selecciona una categoría para ver la sugerencia'}
                    </p>
                    <p className="text-xs text-white/30 mt-1">También puedes ajustar tu selección en el paso de inventario</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <button onClick={() => setStep(2)} disabled={!mudanzaCategory || !selectedVehicle}
                className="px-8 py-3 rounded-full text-sm font-semibold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all duration-300 shadow-[0_0_20px_rgba(0,230,118,0.3)] disabled:opacity-40 disabled:cursor-not-allowed">
                Siguiente: Ruta →
              </button>
            </div>
          </div>
        )}

        {/* ═══════════════ Step 1 (Path C): Category + Furniture Calculator ═══════════════ */}
        {step === 1 && calcPath === 'C' && (
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <button onClick={() => { setCalcPath(null); setSelectedVehicle(null); setMudanzaCategory(null); setAdditionalVehicles([]); setInventory({}) }}
                className="text-xs text-white/40 hover:text-white/60 transition-colors flex items-center gap-1">
                ← Cambiar ruta
              </button>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#FF9800]/10 text-[#FF9800] font-semibold">Ruta C — Calculadora</span>
            </div>

            {/* Vehicle type selection */}
            <h3 className="text-xl font-bold text-white mb-2 text-center">¿Vehículo cerrado o abierto?</h3>
            <p className="text-sm text-white/40 text-center mb-6">Los furgones protegen del clima, las camionetas tienen caja abierta</p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <button onClick={() => { setVehicleType('cerrado'); setSelectedVehicle(null) }}
                className={`p-5 rounded-2xl text-center transition-all duration-300 ${vehicleType === 'cerrado' ? 'bg-[#818CF8]/10 border-2 border-[#818CF8]/50' : 'bg-white/[0.03] border border-white/[0.06] hover:border-white/10'}`}>
                <div className="flex justify-center mb-2 h-16 items-center">
                  <img src="/vehicles/7-FURGON/mediano.png" alt="Furgón" className="max-h-full max-w-[80px] object-contain" />
                </div>
                <div className="text-white font-semibold mb-1">Furgón (Cerrado)</div>
                <div className="text-xs text-white/40">Protección completa del clima</div>
              </button>
              <button onClick={() => { setVehicleType('abierto'); setSelectedVehicle(null) }}
                className={`p-5 rounded-2xl text-center transition-all duration-300 ${vehicleType === 'abierto' ? 'bg-[#FB923C]/10 border-2 border-[#FB923C]/50' : 'bg-white/[0.03] border border-white/[0.06] hover:border-white/10'}`}>
                <div className="flex justify-center mb-2 h-16 items-center">
                  <img src="/vehicles/6-CAMIONETA/mediana.png" alt="Camioneta" className="max-h-full max-w-[80px] object-contain" />
                </div>
                <div className="text-white font-semibold mb-1">Camioneta (Abierto)</div>
                <div className="text-xs text-white/40">Caja abierta, ideal para cargas resistentes</div>
              </button>
            </div>

            {/* Vehicle suggestion based on current volume */}
            {vehicleType && totalVolume > 0 && (
              <div className="p-4 rounded-xl bg-[#FF9800]/5 border border-[#FF9800]/15 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-20 h-14 shrink-0 flex items-center justify-center">
                    {selectedVehicle ? (
                      <img src={selectedVehicle.img} alt={selectedVehicle.name} className="max-h-full max-w-full object-contain" />
                    ) : (
                      <Truck className="w-8 h-8 text-[#FF9800]/40" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="w-4 h-4 text-[#FF9800]" />
                      <span className="text-sm font-semibold text-[#FF9800]">Vehículo sugerido por volumen</span>
                    </div>
                    <p className="text-sm text-white/60">
                      {selectedVehicle ? (
                        <>
                          <span className="text-white font-semibold">{selectedVehicle.name}</span> ({selectedVehicle.cap} m³)
                          {totalVolume > selectedVehicle.cap && additionalVehicles.length > 0 && (
                            <span className="text-[#FF9800]"> + {additionalVehicles.length} vehículo{additionalVehicles.length > 1 ? 's' : ''} adicional{additionalVehicles.length > 1 ? 'es' : ''}</span>
                          )}
                        </>
                      ) : 'Agrega mobiliario para ver la sugerencia'}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-[#00E676]">{totalVolume}</div>
                    <div className="text-xs text-white/30">m³ total</div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <button onClick={() => setStep(2)} disabled={!vehicleType}
                className="px-8 py-3 rounded-full text-sm font-semibold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all duration-300 shadow-[0_0_20px_rgba(0,230,118,0.3)] disabled:opacity-40 disabled:cursor-not-allowed">
                Siguiente: Mobiliario →
              </button>
            </div>
          </div>
        )}

        {/* ═══════════════ Step 2 (Path C): Furniture Calculator ═══════════════ */}
        {step === 2 && calcPath === 'C' && (
          <div className="max-w-5xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-2 text-center">Inventario de Artículos</h3>
            <p className="text-sm text-white/40 text-center mb-6">Selecciona la cantidad de cada artículo por ambiente</p>

            {/* Live vehicle suggestion card for Path B */}
            {totalVolume > 0 && selectedVehicle && (
              <div className="mb-6 p-4 rounded-2xl bg-[#818CF8]/5 border border-[#818CF8]/15">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-20 h-14 shrink-0 flex items-center justify-center">
                      <img src={selectedVehicle.img} alt={selectedVehicle.name} className="max-h-full max-w-full object-contain" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-[#818CF8]">Vehículo sugerido</span>
                        <Sparkles className="w-3.5 h-3.5 text-[#818CF8]" />
                      </div>
                      <p className="text-white font-semibold text-sm">{selectedVehicle.name} ({selectedVehicle.cap} m³)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-[#00E676]">{totalVolume}</div>
                      <div className="text-xs text-white/30">m³ total</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">{selectedVehicle.cap}</div>
                      <div className="text-xs text-white/30">m³ capacidad</div>
                    </div>
                    {totalVolume > selectedVehicle.cap && (
                      <div className="text-center">
                        <div className="text-lg font-bold text-[#FF9800]">{additionalVehicles.length + 1}</div>
                        <div className="text-xs text-white/30">vehículos</div>
                      </div>
                    )}
                  </div>
                </div>
                {additionalVehicles.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-[#818CF8]/10">
                    <div className="flex items-center gap-3">
                      {additionalVehicles.map((av, i) => (
                        <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03]">
                          <img src={av.img} alt={av.name} className="h-8 object-contain" />
                          <span className="text-xs text-white/60">{av.name} ({av.cap} m³)</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-white/50 mt-2">
                      <span className="text-[#FF9800] font-semibold">+ {additionalVehicles.length} vehículo{additionalVehicles.length > 1 ? 's' : ''} adicional{additionalVehicles.length > 1 ? 'es' : ''}</span>
                    </p>
                  </div>
                )}
                {totalVolume > selectedVehicle.cap && (
                  <div className="mt-3 p-2.5 rounded-lg bg-[#FF9800]/10 border border-[#FF9800]/20">
                    <p className="text-xs text-[#FF9800]">
                      ⚠️ Tu volumen ({totalVolume} m³) excede la capacidad máxima de un solo vehículo. Se recomienda {additionalVehicles.length + 1} vehículos.
                    </p>
                  </div>
                )}
              </div>
            )}

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
              <button onClick={() => setStep(3)} disabled={!selectedVehicle} className="px-8 py-3 rounded-full text-sm font-semibold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all duration-300 shadow-[0_0_20px_rgba(0,230,118,0.3)] disabled:opacity-40 disabled:cursor-not-allowed">
                Siguiente: Ruta →
              </button>
            </div>
          </div>
        )}

        {/* ═══════════════ Step: Ruta y Dirección (MAP) ═══════════════ */}
        {step === (calcPath === 'C' ? 3 : 2) && calcPath && (
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
              <button onClick={() => setStep(calcPath === 'C' ? 2 : 1)} className="px-6 py-3 rounded-full text-sm font-semibold text-white/60 border border-white/[0.1] hover:border-white/20 transition-all">← Atrás</button>
              <button onClick={() => setStep(calcPath === 'C' ? 4 : 3)} className="px-8 py-3 rounded-full text-sm font-semibold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all duration-300 shadow-[0_0_20px_rgba(0,230,118,0.3)]">
                Siguiente: Extras y Servicios →
              </button>
            </div>
          </div>
        )}

        {/* ═══════════════ Step: Extras y Servicios ═══════════════ */}
        {step === (calcPath === 'C' ? 4 : 3) && calcPath && (
          <div className="max-w-4xl mx-auto max-h-[80vh] overflow-y-auto custom-scroll pr-1">
            <h3 className="text-xl font-bold text-white mb-2 text-center">Extras y Servicios</h3>
            <p className="text-sm text-white/40 text-center mb-8">Personaliza tu mudanza con servicios adicionales</p>

            {/* Section A: Embalaje y Cajas */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] mb-4">
              <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span className="text-lg">📦</span> Embalaje y Cajas
              </h4>

              {/* Embalaje type */}
              <div className="mb-5">
                <label className="text-xs text-white/40 block mb-2">Servicio de Embalaje</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {([['ninguno', 'Ninguno', '#666'], ['completo', 'Completo (Bs 45/m³)', '#00E676'], ['solo_embalaje', 'Solo Embalaje (Bs 30/m³)', '#0077BD'], ['solo_desembalaje', 'Solo Desembalaje (Bs 15/m³)', '#FF9800']] as const).map(([id, label, color]) => (
                    <button key={id} onClick={() => setEmbalajeType(id as typeof embalajeType)}
                      className={`p-3 rounded-xl text-xs font-semibold transition-all text-center ${embalajeType === id ? `border-2` : 'bg-white/[0.03] border border-white/[0.06] hover:border-white/10 text-white/50'}`}
                      style={embalajeType === id ? { backgroundColor: `${color}10`, borderColor: `${color}50`, color } : {}}>
                      {label}
                    </button>
                  ))}
                </div>
                {embalajeType !== 'ninguno' && totalVolume > 0 && (
                  <div className="mt-2 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-white/50">
                    {embalajeType === 'completo' && (
                      <span>Embalaje (Bs 30/m³) + Desembalaje (Bs 15/m³) = Bs 45/m³ × {totalVolume}m³ = <span className="text-[#00E676] font-bold">Bs {embalajeCost}</span></span>
                    )}
                    {embalajeType === 'solo_embalaje' && (
                      <span>Bs 30/m³ × {totalVolume}m³ = <span className="text-[#0077BD] font-bold">Bs {embalajeCost}</span></span>
                    )}
                    {embalajeType === 'solo_desembalaje' && (
                      <span>Bs 15/m³ × {totalVolume}m³ = <span className="text-[#FF9800] font-bold">Bs {embalajeCost}</span></span>
                    )}
                  </div>
                )}
              </div>

              {/* Box purchase */}
              <div className="mb-4">
                <label className="text-xs text-white/40 block mb-2">Compra de Cajas</label>
                <div className="space-y-2">
                  {BOX_OPTIONS.map((box) => {
                    const qty = boxes[box.id] || 0
                    return (
                      <div key={box.id} className={`flex items-center justify-between p-3 rounded-xl transition-all ${qty > 0 ? 'bg-[#00E676]/5 border border-[#00E676]/15' : 'bg-white/[0.02] border border-white/[0.04]'}`}>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{box.emoji}</span>
                          <div>
                            <div className="text-xs text-white/70">{box.name}</div>
                            <div className="text-xs text-white/30">Bs {box.price} c/u</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => setBoxes(prev => { const n = Math.max(0, (prev[box.id] || 0) - 1); if (n === 0) { const { [box.id]: _, ...rest } = prev; return rest }; return { ...prev, [box.id]: n } })}
                            className="w-7 h-7 rounded-lg bg-white/[0.06] flex items-center justify-center text-white/60 hover:bg-white/10 transition-all">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-sm font-semibold text-white">{qty}</span>
                          <button onClick={() => setBoxes(prev => ({ ...prev, [box.id]: (prev[box.id] || 0) + 1 }))}
                            className="w-7 h-7 rounded-lg bg-[#00E676]/20 flex items-center justify-center text-[#00E676] hover:bg-[#00E676]/30 transition-all">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Packing materials */}
              <div>
                <label className="text-xs text-white/40 block mb-2">Materiales de Embalaje</label>
                <div className="space-y-2">
                  {PACKING_MATERIALS.map((mat) => {
                    const qty = materials[mat.id] || 0
                    return (
                      <div key={mat.id} className={`flex items-center justify-between p-3 rounded-xl transition-all ${qty > 0 ? 'bg-[#0077BD]/5 border border-[#0077BD]/15' : 'bg-white/[0.02] border border-white/[0.04]'}`}>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{mat.emoji}</span>
                          <div>
                            <div className="text-xs text-white/70">{mat.name}</div>
                            <div className="text-xs text-white/30">Bs {mat.price} c/u</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => setMaterials(prev => { const n = Math.max(0, (prev[mat.id] || 0) - 1); if (n === 0) { const { [mat.id]: _, ...rest } = prev; return rest }; return { ...prev, [mat.id]: n } })}
                            className="w-7 h-7 rounded-lg bg-white/[0.06] flex items-center justify-center text-white/60 hover:bg-white/10 transition-all">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-sm font-semibold text-white">{qty}</span>
                          <button onClick={() => setMaterials(prev => ({ ...prev, [mat.id]: (prev[mat.id] || 0) + 1 }))}
                            className="w-7 h-7 rounded-lg bg-[#0077BD]/20 flex items-center justify-center text-[#0077BD] hover:bg-[#0077BD]/30 transition-all">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Section B: Manipulación de Objetos */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] mb-4">
              <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span className="text-lg">🔧</span> Manipulación de Objetos
              </h4>
              <div className="space-y-3">
                {HANDLING_EXTRAS.map((extra) => {
                  const qty = handlingExtras[extra.id] || 0
                  return (
                    <div key={extra.id} className={`p-4 rounded-xl transition-all ${qty > 0 ? 'bg-[#FF9800]/5 border border-[#FF9800]/15' : 'bg-white/[0.02] border border-white/[0.06]'}`}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{extra.emoji}</span>
                          <div>
                            <div className="text-sm text-white font-medium">{extra.name}</div>
                            <div className="text-xs text-white/30">{extra.desc}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0 ml-3">
                          <button onClick={() => setHandlingExtras(prev => { const n = Math.max(0, (prev[extra.id] || 0) - 1); if (n === 0) { const { [extra.id]: _, ...rest } = prev; return rest }; return { ...prev, [extra.id]: n } })}
                            className="w-7 h-7 rounded-lg bg-white/[0.06] flex items-center justify-center text-white/60 hover:bg-white/10 transition-all">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-sm font-semibold text-white">{qty}</span>
                          <button onClick={() => setHandlingExtras(prev => ({ ...prev, [extra.id]: (prev[extra.id] || 0) + 1 }))}
                            className="w-7 h-7 rounded-lg bg-[#FF9800]/20 flex items-center justify-center text-[#FF9800] hover:bg-[#FF9800]/30 transition-all">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-white/30">Bs {extra.price}/{extra.unit}</span>
                        {qty > 0 && <span className="text-xs text-[#FF9800] font-semibold">Bs {extra.price * qty}</span>}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Section C: Accesibilidad - Origen */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-[#00E676]/10 mb-4">
              <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span className="text-lg">🏢</span> Accesibilidad — Origen
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#00E676]/10 text-[#00E676] font-semibold">Origen</span>
              </h4>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-xs text-white/40 block mb-1">Piso de origen</label>
                  <select value={originFloor} onChange={e => setOriginFloor(e.target.value)}
                    className={inputClass + ' appearance-none'}>
                    {['baja', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].map(f => <option key={f} value={f} className="bg-[#0a0e17]">Planta {f === 'baja' ? 'baja' : f + '°'}</option>)}
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
              {originFloorCost > 0 && (
                <div className="p-2 rounded-lg bg-[#00E676]/5 border border-[#00E676]/10 text-xs text-white/50 mb-4">
                  Costo piso: {getFloorCount(originFloor)} pisos × Bs {elevatorOrigin ? selectedVehicle?.floorElev : selectedVehicle?.floorNoElev}/piso = <span className="text-[#00E676] font-bold">Bs {originFloorCost}</span>
                </div>
              )}
              {/* Distancia caminata origen */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm">🚶</span>
                  <div>
                    <div className="text-xs text-white/70">Distancia de caminata</div>
                    <div className="text-xs text-white/30">Bs 20 / 10m</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setOriginCaminata(Math.max(0, originCaminata - 1))}
                    className="w-7 h-7 rounded-lg bg-white/[0.06] flex items-center justify-center text-white/60 hover:bg-white/10 transition-all">
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-8 text-center text-sm font-semibold text-white">{originCaminata}</span>
                  <button onClick={() => setOriginCaminata(originCaminata + 1)}
                    className="w-7 h-7 rounded-lg bg-[#00E676]/20 flex items-center justify-center text-[#00E676] hover:bg-[#00E676]/30 transition-all">
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
              {/* Elevador fachada origen */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm">🏗️</span>
                  <div>
                    <div className="text-xs text-white/70">Elevador por fachada (grúa)</div>
                    <div className="text-xs text-white/30">Bs 200 / hr</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setOriginFachada(Math.max(0, originFachada - 1))}
                    className="w-7 h-7 rounded-lg bg-white/[0.06] flex items-center justify-center text-white/60 hover:bg-white/10 transition-all">
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-8 text-center text-sm font-semibold text-white">{originFachada}</span>
                  <button onClick={() => setOriginFachada(originFachada + 1)}
                    className="w-7 h-7 rounded-lg bg-[#00E676]/20 flex items-center justify-center text-[#00E676] hover:bg-[#00E676]/30 transition-all">
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Section D: Accesibilidad - Destino */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-[#0077BD]/10 mb-4">
              <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span className="text-lg">🏢</span> Accesibilidad — Destino
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#0077BD]/10 text-[#0077BD] font-semibold">Destino</span>
              </h4>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-xs text-white/40 block mb-1">Piso de destino</label>
                  <select value={destFloor} onChange={e => setDestFloor(e.target.value)}
                    className={inputClass + ' appearance-none'}>
                    {['baja', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].map(f => <option key={f} value={f} className="bg-[#0a0e17]">Planta {f === 'baja' ? 'baja' : f + '°'}</option>)}
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
              {destFloorCost > 0 && (
                <div className="p-2 rounded-lg bg-[#0077BD]/5 border border-[#0077BD]/10 text-xs text-white/50 mb-4">
                  Costo piso: {getFloorCount(destFloor)} pisos × Bs {elevatorDest ? selectedVehicle?.floorElev : selectedVehicle?.floorNoElev}/piso = <span className="text-[#0077BD] font-bold">Bs {destFloorCost}</span>
                </div>
              )}
              {/* Distancia caminata destino */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm">🚶</span>
                  <div>
                    <div className="text-xs text-white/70">Distancia de caminata</div>
                    <div className="text-xs text-white/30">Bs 20 / 10m</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setDestCaminata(Math.max(0, destCaminata - 1))}
                    className="w-7 h-7 rounded-lg bg-white/[0.06] flex items-center justify-center text-white/60 hover:bg-white/10 transition-all">
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-8 text-center text-sm font-semibold text-white">{destCaminata}</span>
                  <button onClick={() => setDestCaminata(destCaminata + 1)}
                    className="w-7 h-7 rounded-lg bg-[#0077BD]/20 flex items-center justify-center text-[#0077BD] hover:bg-[#0077BD]/30 transition-all">
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
              {/* Elevador fachada destino */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm">🏗️</span>
                  <div>
                    <div className="text-xs text-white/70">Elevador por fachada (grúa)</div>
                    <div className="text-xs text-white/30">Bs 200 / hr</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setDestFachada(Math.max(0, destFachada - 1))}
                    className="w-7 h-7 rounded-lg bg-white/[0.06] flex items-center justify-center text-white/60 hover:bg-white/10 transition-all">
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-8 text-center text-sm font-semibold text-white">{destFachada}</span>
                  <button onClick={() => setDestFachada(destFachada + 1)}
                    className="w-7 h-7 rounded-lg bg-[#0077BD]/20 flex items-center justify-center text-[#0077BD] hover:bg-[#0077BD]/30 transition-all">
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Section E: Ayudantes */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-semibold flex items-center gap-2">
                    <span className="text-lg">👥</span> Ayudantes (carga y descarga)
                  </h4>
                  <p className="text-xs text-white/30 mt-1">Bs {selectedVehicle?.helperPrice || 80} c/u</p>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => setHelpers(Math.max(0, helpers - 1))}
                    className="w-9 h-9 rounded-xl bg-white/[0.06] flex items-center justify-center text-white/60 hover:bg-white/10 transition-all">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-xl font-bold text-white w-8 text-center">{helpers}</span>
                  <button onClick={() => setHelpers(helpers + 1)}
                    className="w-9 h-9 rounded-xl bg-[#818CF8]/20 flex items-center justify-center text-[#818CF8] hover:bg-[#818CF8]/30 transition-all">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {helpers > 0 && (
                <div className="mt-2 text-sm text-[#818CF8]">{helpers} × Bs {selectedVehicle?.helperPrice || 80} = Bs {helpersCost}</div>
              )}
            </div>

            {/* Section F: Logística y Seguridad */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] mb-4">
              <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span className="text-lg">🚚</span> Logística y Seguridad
              </h4>
              <div className="space-y-3">
                {LOGISTICS_EXTRAS.map((extra) => {
                  if (extra.id === 'retiro_cajas') {
                    const qty = logisticsExtras[extra.id] || 0
                    return (
                      <div key={extra.id} className={`flex items-center justify-between p-3 rounded-xl transition-all ${qty > 0 ? 'bg-[#818CF8]/5 border border-[#818CF8]/15' : 'bg-white/[0.02] border border-white/[0.06]'}`}>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{extra.emoji}</span>
                          <div>
                            <div className="text-sm text-white font-medium">{extra.name}</div>
                            <div className="text-xs text-white/30">{extra.desc} — Bs {extra.price}</div>
                          </div>
                        </div>
                        <button onClick={() => setLogisticsExtras(prev => prev[extra.id] ? (prev[extra.id] ? (() => { const { [extra.id]: _, ...rest } = prev; return rest })() : prev) : { ...prev, [extra.id]: 1 })}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${qty > 0 ? 'bg-[#818CF8] text-white' : 'bg-white/[0.06] text-white/40 border border-white/[0.08]'}`}>
                          {qty > 0 ? 'Incluido' : 'Agregar'}
                        </button>
                      </div>
                    )
                  }
                  const qty = logisticsExtras[extra.id] || 0
                  return (
                    <div key={extra.id} className={`flex items-center justify-between p-3 rounded-xl transition-all ${qty > 0 ? 'bg-[#818CF8]/5 border border-[#818CF8]/15' : 'bg-white/[0.02] border border-white/[0.06]'}`}>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{extra.emoji}</span>
                        <div>
                          <div className="text-sm text-white font-medium">{extra.name}</div>
                          <div className="text-xs text-white/30">Bs {extra.price}{extra.unit ? `/${extra.unit}` : ''}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => setLogisticsExtras(prev => { const n = Math.max(0, (prev[extra.id] || 0) - 1); if (n === 0) { const { [extra.id]: _, ...rest } = prev; return rest }; return { ...prev, [extra.id]: n } })}
                          className="w-7 h-7 rounded-lg bg-white/[0.06] flex items-center justify-center text-white/60 hover:bg-white/10 transition-all">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-sm font-semibold text-white">{qty}</span>
                        <button onClick={() => setLogisticsExtras(prev => ({ ...prev, [extra.id]: (prev[extra.id] || 0) + 1 }))}
                          className="w-7 h-7 rounded-lg bg-[#818CF8]/20 flex items-center justify-center text-[#818CF8] hover:bg-[#818CF8]/30 transition-all">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Running extras total */}
            <div className="p-4 rounded-xl bg-white/[0.04] border border-[#00E676]/15 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-white/50">Total extras</span>
                <span className="text-[#00E676] font-bold">Bs {extrasTotal.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex justify-between">
              <button onClick={() => setStep(calcPath === 'C' ? 3 : 2)} className="px-6 py-3 rounded-full text-sm font-semibold text-white/60 border border-white/[0.1] hover:border-white/20 transition-all">← Atrás</button>
              <button onClick={() => setStep(calcPath === 'C' ? 5 : 4)} className="px-8 py-3 rounded-full text-sm font-semibold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all duration-300 shadow-[0_0_20px_rgba(0,230,118,0.3)]">
                Siguiente: Seguro y Pago →
              </button>
            </div>
          </div>
        )}

        {/* ═══════════════ Step: Seguro, IVA y Pago ═══════════════ */}
        {step === (calcPath === 'C' ? 5 : 4) && calcPath && (
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
                    <button key={pm.id} onClick={() => setPaymentMethod(pm.id as PaymentMethod)}
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
              <button onClick={() => setStep(calcPath === 'C' ? 4 : 3)} className="px-6 py-3 rounded-full text-sm font-semibold text-white/60 border border-white/[0.1] hover:border-white/20 transition-all">← Atrás</button>
              <button onClick={() => setStep(calcPath === 'C' ? 6 : 5)} className="px-8 py-3 rounded-full text-sm font-semibold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all duration-300 shadow-[0_0_20px_rgba(0,230,118,0.3)]">
                Siguiente: Datos Personales →
              </button>
            </div>
          </div>
        )}

        {/* ═══════════════ Step: Datos Personales y Envío ═══════════════ */}
        {step === (calcPath === 'C' ? 6 : 5) && calcPath && (
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
                    <div className="flex justify-between"><span className="text-white/40">Vehículo</span><span className="text-white">{selectedVehicle?.name || getRecommendation(totalVolume).vehicle}</span></div>
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
                  <div className="space-y-2 text-sm max-h-64 overflow-y-auto custom-scroll">
                    <div className="flex justify-between"><span className="text-white/40">Tipo de mudanza</span><span className="text-white capitalize">{moveType} / {catType}</span></div>
                    <div className="flex justify-between"><span className="text-white/40">Vehículo</span><span className="text-white">{selectedVehicle?.name || '—'}</span></div>
                    <div className="flex justify-between"><span className="text-white/40">Volumen</span><span className="text-white">{totalVolume} m³</span></div>
                    <div className="flex justify-between"><span className="text-white/40">Distancia</span><span className="text-white">{routeDistance > 0 ? `${routeDistance} km` : '~10 km'}</span></div>
                    <div className="h-px bg-white/[0.06]" />
                    <div className="flex justify-between"><span className="text-white/40">Precio base</span><span className="text-white">Bs {basePrice.toLocaleString()}</span></div>
                    {embalajeCost > 0 && <div className="flex justify-between"><span className="text-white/40">Embalaje ({embalajeType})</span><span className="text-white">Bs {embalajeCost.toLocaleString()}</span></div>}
                    {boxesCost > 0 && <div className="flex justify-between"><span className="text-white/40">Cajas</span><span className="text-white">Bs {boxesCost.toLocaleString()}</span></div>}
                    {materialsCost > 0 && <div className="flex justify-between"><span className="text-white/40">Materiales</span><span className="text-white">Bs {materialsCost.toLocaleString()}</span></div>}
                    {handlingCost > 0 && <div className="flex justify-between"><span className="text-white/40">Manipulación</span><span className="text-white">Bs {handlingCost.toLocaleString()}</span></div>}
                    {originFloorCost > 0 && <div className="flex justify-between"><span className="text-white/40">Piso origen</span><span className="text-white">Bs {originFloorCost.toLocaleString()}</span></div>}
                    {destFloorCost > 0 && <div className="flex justify-between"><span className="text-white/40">Piso destino</span><span className="text-white">Bs {destFloorCost.toLocaleString()}</span></div>}
                    {accessibilityCost > 0 && <div className="flex justify-between"><span className="text-white/40">Accesibilidad</span><span className="text-white">Bs {accessibilityCost.toLocaleString()}</span></div>}
                    {helpersCost > 0 && <div className="flex justify-between"><span className="text-white/40">Ayudantes ({helpers})</span><span className="text-white">Bs {helpersCost.toLocaleString()}</span></div>}
                    {logisticsCost > 0 && <div className="flex justify-between"><span className="text-white/40">Logística</span><span className="text-white">Bs {logisticsCost.toLocaleString()}</span></div>}
                    <div className="flex justify-between"><span className="text-white/40">Total extras</span><span className="text-white">Bs {extrasTotal.toLocaleString()}</span></div>
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
                  <button onClick={() => setStep(calcPath === 'C' ? 5 : 4)} className="px-6 py-3 rounded-full text-sm font-semibold text-white/60 border border-white/[0.1] hover:border-white/20 transition-all">← Atrás</button>
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
      <SchemaOrg />
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
