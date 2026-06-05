'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import {
  Truck, Package, Home, Building2, ArrowRight, ArrowLeft,
  MapPin, Phone, CheckCircle2, ChevronDown, ChevronRight,
  Sofa, Bed, Refrigerator, WashingMachine, Tv, Table2,
  Armchair, LampDesk, BookOpen, Microwave, CookingPot,
  Box, Boxes, TreePine, Baby, Dumbbell,
  CircleDot, Calculator, Clock, Shield, Star, AlertCircle,
  Plus, Minus, Info, X, Loader2, Check, Warehouse, Music, Flame,
  CreditCard, Banknote, QrCode, Mail, MessageCircle, Users, FileText, Hash,
} from 'lucide-react'

/* ══════════════════════════════════════════════════════
   DYNAMIC MAP IMPORT (SSR: false)
   ══════════════════════════════════════════════════════ */
const MudanzaMap = dynamic(() => import('./mudanza-map'), { ssr: false })

/* ══════════════════════════════════════════════════════
   TYPES
   ══════════════════════════════════════════════════════ */
type MudanzaType = 'casa' | 'oficina' | 'especial'
type TruckType = 'cerrado' | 'abierto'
type CalcPath = 'select' | 'knows_truck' | 'needs_help' | 'knows_size'
type MoveSize = 'express' | 'estandar' | 'familiar' | 'premium'

interface FurnitureItem {
  id: string
  name: string
  icon: React.ComponentType<{ className?: string }>
  volume: number
  category: string
  popular?: boolean
}

interface TruckOption {
  id: string
  name: string
  type: 'cerrado' | 'abierto'
  image: string
  maxVolume: number
  basePrice: number
  pricePerKm: number
  description: string
}

interface MapPosition {
  lat: number
  lng: number
}

/* ══════════════════════════════════════════════════════
   DATA
   ══════════════════════════════════════════════════════ */
const furnitureItems: FurnitureItem[] = [
  // Living
  { id: 'sofa-2', name: 'Sofá 2 plazas', icon: Sofa, volume: 1.2, category: 'Living', popular: true },
  { id: 'sofa-3', name: 'Sofá 3 plazas', icon: Sofa, volume: 1.8, category: 'Living', popular: true },
  { id: 'sofa-cama', name: 'Sofá cama', icon: Sofa, volume: 2.0, category: 'Living' },
  { id: 'sillon', name: 'Sillón individual', icon: Sofa, volume: 0.7, category: 'Living' },
  { id: 'mesa-centro', name: 'Mesa de centro', icon: Table2, volume: 0.4, category: 'Living' },
  { id: 'mueble-tv', name: 'Mueble de TV', icon: Tv, volume: 0.6, category: 'Living', popular: true },
  { id: 'estante', name: 'Estante', icon: BookOpen, volume: 0.5, category: 'Living' },
  { id: 'alfombra', name: 'Alfombra grande', icon: Box, volume: 0.3, category: 'Living' },
  // Dormitorio
  { id: 'cama-1plaza', name: 'Cama 1 plaza', icon: Bed, volume: 0.9, category: 'Dormitorio', popular: true },
  { id: 'cama-2plazas', name: 'Cama 2 plazas', icon: Bed, volume: 1.5, category: 'Dormitorio', popular: true },
  { id: 'cama-queen', name: 'Cama Queen', icon: Bed, volume: 1.7, category: 'Dormitorio' },
  { id: 'cama-king', name: 'Cama King', icon: Bed, volume: 2.0, category: 'Dormitorio' },
  { id: 'colchon-1', name: 'Colchón 1 plaza', icon: Bed, volume: 0.6, category: 'Dormitorio' },
  { id: 'colchon-2', name: 'Colchón 2 plazas', icon: Bed, volume: 1.0, category: 'Dormitorio' },
  { id: 'placard', name: 'Placard/Ropero', icon: Box, volume: 1.8, category: 'Dormitorio', popular: true },
  { id: 'mesa-luz', name: 'Mesa de luz', icon: Table2, volume: 0.2, category: 'Dormitorio' },
  { id: 'cuna', name: 'Cuna', icon: Baby, volume: 0.6, category: 'Dormitorio' },
  { id: 'comoda', name: 'Cómoda', icon: Box, volume: 0.8, category: 'Dormitorio' },
  // Cocina
  { id: 'heladera', name: 'Heladera/Refrigerador', icon: Refrigerator, volume: 1.0, category: 'Cocina', popular: true },
  { id: 'cocina', name: 'Cocina a gas', icon: Flame, volume: 0.6, category: 'Cocina', popular: true },
  { id: 'horno', name: 'Horno empotrado', icon: CookingPot, volume: 0.5, category: 'Cocina' },
  { id: 'microondas', name: 'Microondas', icon: Microwave, volume: 0.2, category: 'Cocina' },
  { id: 'lavadora', name: 'Lavadora', icon: WashingMachine, volume: 0.6, category: 'Cocina', popular: true },
  { id: 'secadora', name: 'Secadora', icon: WashingMachine, volume: 0.6, category: 'Cocina' },
  { id: 'lavarropas', name: 'Lavarropas', icon: WashingMachine, volume: 0.7, category: 'Cocina' },
  { id: 'freidora', name: 'Freidora de aire', icon: Microwave, volume: 0.1, category: 'Cocina' },
  // Comedor
  { id: 'mesa-comedor-4', name: 'Mesa comedor 4 personas', icon: Table2, volume: 1.0, category: 'Comedor', popular: true },
  { id: 'mesa-comedor-6', name: 'Mesa comedor 6 personas', icon: Table2, volume: 1.4, category: 'Comedor' },
  { id: 'mesa-comedor-8', name: 'Mesa comedor 8 personas', icon: Table2, volume: 1.8, category: 'Comedor' },
  { id: 'silla', name: 'Silla', icon: Armchair, volume: 0.25, category: 'Comedor' },
  { id: 'banco', name: 'Banqueta/Banco', icon: Armchair, volume: 0.15, category: 'Comedor' },
  { id: 'vitrina', name: 'Vitrina', icon: BookOpen, volume: 1.2, category: 'Comedor' },
  // Oficina
  { id: 'escritorio', name: 'Escritorio', icon: LampDesk, volume: 0.8, category: 'Oficina', popular: true },
  { id: 'silla-oficina', name: 'Silla de oficina', icon: Armchair, volume: 0.5, category: 'Oficina', popular: true },
  { id: 'archivador', name: 'Archivador', icon: Box, volume: 0.4, category: 'Oficina' },
  { id: 'impresora', name: 'Impresora grande', icon: Box, volume: 0.3, category: 'Oficina' },
  { id: 'caja-archivador', name: 'Caja archivador', icon: Boxes, volume: 0.12, category: 'Oficina' },
  // Electrónica
  { id: 'tv-32', name: 'TV 32"', icon: Tv, volume: 0.15, category: 'Electrónica' },
  { id: 'tv-50', name: 'TV 50"+', icon: Tv, volume: 0.3, category: 'Electrónica', popular: true },
  { id: 'pc-escritorio', name: 'PC de escritorio', icon: LampDesk, volume: 0.3, category: 'Electrónica' },
  { id: 'consola', name: 'Consola/Videojuego', icon: Box, volume: 0.05, category: 'Electrónica' },
  // Varios
  { id: 'caja-pequena', name: 'Caja pequeña (libros)', icon: Box, volume: 0.08, category: 'Varios', popular: true },
  { id: 'caja-mediana', name: 'Caja mediana (ropa)', icon: Box, volume: 0.12, category: 'Varios', popular: true },
  { id: 'caja-grande', name: 'Caja grande', icon: Box, volume: 0.2, category: 'Varios', popular: true },
  { id: 'bicicleta', name: 'Bicicleta', icon: CircleDot, volume: 0.5, category: 'Varios' },
  { id: 'mascota-grande', name: 'Jaula/Transportador mascota', icon: TreePine, volume: 0.4, category: 'Varios' },
  { id: 'instrumento', name: 'Instrumento musical', icon: Music, volume: 0.4, category: 'Varios' },
  { id: 'ejercicio', name: 'Equipo de ejercicio', icon: Dumbbell, volume: 0.6, category: 'Varios' },
  { id: 'plantas', name: 'Macetas/Plantas grandes', icon: TreePine, volume: 0.3, category: 'Varios' },
  { id: 'espejo-grande', name: 'Espejo grande', icon: Box, volume: 0.3, category: 'Varios' },
  { id: 'cuadro-grande', name: 'Cuadro/Pintura grande', icon: Box, volume: 0.15, category: 'Varios' },
]

const truckOptions: TruckOption[] = [
  { id: 'furgon-pequeno', name: 'Furgón Pequeño', type: 'cerrado', image: '/fleet-furgon-pequeno.webp', maxVolume: 6, basePrice: 150, pricePerKm: 4.5, description: 'Ideal para estudios o departamentos pequeños. Carga hasta 6 m³.' },
  { id: 'furgon-mediano', name: 'Furgón Mediano', type: 'cerrado', image: '/fleet-furgon-mediano.webp', maxVolume: 12, basePrice: 250, pricePerKm: 5.5, description: 'Para departamentos medianos. Carga hasta 12 m³.' },
  { id: 'furgon-grande', name: 'Furgón Grande', type: 'cerrado', image: '/fleet-furgon-grande.webp', maxVolume: 20, basePrice: 400, pricePerKm: 7.0, description: 'Para casas o departamentos grandes. Carga hasta 20 m³.' },
  { id: 'furgon-largo', name: 'Furgón Largo', type: 'cerrado', image: '/fleet-furgon-largo.webp', maxVolume: 30, basePrice: 550, pricePerKm: 8.5, description: 'Máxima capacidad cerrada. Carga hasta 30 m³.' },
  { id: 'camioneta-pickup', name: 'Pickup Abierta', type: 'abierto', image: '/fleet-camioneta-pickup.webp', maxVolume: 4, basePrice: 120, pricePerKm: 3.5, description: 'Para mudanzas pequeñas o traslados parciales. Caja abierta.' },
  { id: 'camioneta-pequena', name: 'Camioneta Pequeña', type: 'abierto', image: '/fleet-camioneta-pequena.webp', maxVolume: 8, basePrice: 200, pricePerKm: 4.5, description: 'Camioneta abierta para mudanzas ligeras. Carga hasta 8 m³.' },
  { id: 'camioneta-mediana', name: 'Camioneta Mediana', type: 'abierto', image: '/fleet-camioneta-mediana.webp', maxVolume: 14, basePrice: 320, pricePerKm: 6.0, description: 'Camioneta abierta mediana. Carga hasta 14 m³.' },
  { id: 'camioneta-larga', name: 'Camioneta Larga', type: 'abierto', image: '/fleet-camioneta-larga.webp', maxVolume: 22, basePrice: 450, pricePerKm: 7.5, description: 'Camioneta abierta de gran capacidad. Carga hasta 22 m³.' },
  { id: 'camioneta-grande', name: 'Camioneta Grande', type: 'abierto', image: '/fleet-camioneta-grande.webp', maxVolume: 30, basePrice: 580, pricePerKm: 9.0, description: 'Camioneta abierta de máxima capacidad. Carga hasta 30 m³.' },
]

/* ── Floor options for dropdown ── */
const floorOptions = [
  { label: 'Planta baja', floors: 0 },
  { label: '1er piso', floors: 1 },
  { label: '2do piso', floors: 2 },
  { label: '3er piso', floors: 3 },
  { label: '4to piso', floors: 4 },
  { label: '5to piso o más', floors: 5 },
]

/* ── Floor charge rates per vehicle size ── */
const floorChargeRates: Record<MoveSize, { conAscensor: number; sinAscensor: number }> = {
  express: { conAscensor: 10, sinAscensor: 15 },
  estandar: { conAscensor: 15, sinAscensor: 20 },
  familiar: { conAscensor: 20, sinAscensor: 25 },
  premium: { conAscensor: 20, sinAscensor: 30 },
}

/* ── Cargadores/Etibadores price per vehicle size ── */
const cargadorPricePerSize: Record<MoveSize, number> = {
  express: 60,
  estandar: 80,
  familiar: 100,
  premium: 150,
}

/* ── Move size categories ── */
const moveSizeCategories: {
  id: MoveSize
  name: string
  subtitle: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  truckCerrado: string
  truckAbierto: string
  description: string
}[] = [
  {
    id: 'express',
    name: 'Mudanza Express',
    subtitle: 'Monoambiente / Departamento Pequeño',
    icon: Package,
    color: '#00E676',
    truckCerrado: 'furgon-pequeno',
    truckAbierto: 'camioneta-pequena',
    description: 'Camión: Furgón pequeño / camión 2-3 toneladas — Camas, ropero mediano, heladera, electrodomésticos básicos, 10-15 cajas',
  },
  {
    id: 'estandar',
    name: 'Mudanza Estándar',
    subtitle: 'Departamento Familiar (2-3 dormitorios)',
    icon: Home,
    color: '#818CF8',
    truckCerrado: 'furgon-mediano',
    truckAbierto: 'camioneta-mediana',
    description: 'Camión mediano 4-5 toneladas — Muebles living, comedor, camas, línea blanca completa, 20-30 cajas',
  },
  {
    id: 'familiar',
    name: 'Mudanza Familiar',
    subtitle: 'Casa Familiar (3-4 dormitorios)',
    icon: Warehouse,
    color: '#FB923C',
    truckCerrado: 'furgon-grande',
    truckAbierto: 'camioneta-larga',
    description: 'Camión grande 6-8 toneladas cerrado alto — Todo mobiliario casa promedio, muebles jardín, múltiples roperos, 40+ cajas',
  },
  {
    id: 'premium',
    name: 'Mudanza Premium',
    subtitle: 'Casa Grande / Corporativa',
    icon: Building2,
    color: '#F472B6',
    truckCerrado: 'furgon-largo',
    truckAbierto: 'camioneta-grande',
    description: 'Camión pesado 8-12 toneladas — Residencias grandes en un solo viaje, múltiples salas, altos volúmenes cajas',
  },
]

/* ── Payment methods ── */
const paymentMethods = [
  { id: 'efectivo', name: 'Efectivo', icon: Banknote },
  { id: 'qr', name: 'QR (código QR)', icon: QrCode },
  { id: 'transferencia', name: 'Transferencia bancaria', icon: Hash },
  { id: 'tarjeta', name: 'Tarjeta crédito/débito', icon: CreditCard },
  { id: 'corporativo', name: 'Cuenta corporativa', icon: FileText },
]

/* ── Embalaje price per m³ ── */
const EMBALAJE_PRICE_PER_M3 = 35
const BOX_PRICE = 15

/* ══════════════════════════════════════════════════════
   HELPER: get move size from truck
   ══════════════════════════════════════════════════════ */
function getMoveSizeFromTruck(truckId: string): MoveSize {
  if (['furgon-pequeno', 'camioneta-pickup', 'camioneta-pequena'].includes(truckId)) return 'express'
  if (['furgon-mediano', 'camioneta-mediana'].includes(truckId)) return 'estandar'
  if (['furgon-grande', 'camioneta-larga'].includes(truckId)) return 'familiar'
  return 'premium'
}

/* ══════════════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════════════ */

export function MudanzaPageContent() {
  // Hero scroll
  const heroRef = useRef<HTMLDivElement>(null)
  const [heroVisible, setHeroVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setHeroVisible(true) }, { threshold: 0.1 })
    if (heroRef.current) obs.observe(heroRef.current)
    return () => obs.disconnect()
  }, [])

  // Hero banner slideshow
  const [heroSlide, setHeroSlide] = useState(0)
  const heroImages = ['/mudanza-hero1.webp', '/mudanza-hero2.webp']
  useEffect(() => {
    const interval = setInterval(() => setHeroSlide(prev => (prev + 1) % heroImages.length), 5000)
    return () => clearInterval(interval)
  }, [])

  /* ── Calculator state ── */
  const [calcPath, setCalcPath] = useState<CalcPath>('select')
  const [mudanzaType, setMudanzaType] = useState<MudanzaType>('casa')
  const [truckType, setTruckType] = useState<TruckType>('cerrado')
  const [selectedItems, setSelectedItems] = useState<Record<string, number>>({})
  const [selectedTruckId, setSelectedTruckId] = useState<string>('')
  const [moveSize, setMoveSize] = useState<MoveSize | null>(null)

  // Route
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [useMap, setUseMap] = useState(false)
  const [mapOrigin, setMapOrigin] = useState<MapPosition>({ lat: -17.7833, lng: -63.1821 })
  const [mapDest, setMapDest] = useState<MapPosition>({ lat: -17.7833, lng: -63.1821 })
  const [mapDistance, setMapDistance] = useState<number | null>(null)

  // Floor
  const [originFloor, setOriginFloor] = useState(0)
  const [destFloor, setDestFloor] = useState(0)
  const [hasElevatorOrigin, setHasElevatorOrigin] = useState(false)
  const [hasElevatorDest, setHasElevatorDest] = useState(false)

  // Date & time
  const [date, setDate] = useState('')
  const [moveTime, setMoveTime] = useState('08:00')

  // Complementary services (split origin/dest)
  const [desmontaje, setDesmontaje] = useState(false)
  const [embalaje, setEmbalaje] = useState(false)
  const [montaje, setMontaje] = useState(false)
  const [desembalaje, setDesembalaje] = useState(false)
  const [elevador, setElevador] = useState(false)
  const [limpieza, setLimpieza] = useState(false)

  // Cargadores/Etibadores
  const [cargadoresOrigen, setCargadoresOrigen] = useState(0)
  const [cargadoresDestino, setCargadoresDestino] = useState(0)

  // Box purchase
  const [boxCount, setBoxCount] = useState(0)

  // Insurance
  const [wantsInsurance, setWantsInsurance] = useState(false)
  const [insuranceValue, setInsuranceValue] = useState('')

  // IVA
  const [wantsIVA, setWantsIVA] = useState(false)
  const [razonSocial, setRazonSocial] = useState('')
  const [nit, setNit] = useState('')

  // Payment
  const [paymentMethod, setPaymentMethod] = useState<string>('efectivo')

  // Personal data
  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [whatsapp, setWhatsapp] = useState(false)
  const [correo, setCorreo] = useState('')

  // Estimate
  const [showEstimate, setShowEstimate] = useState(false)
  const [isCalculating, setIsCalculating] = useState(false)
  const [estimatedDistance, setEstimatedDistance] = useState<number | null>(null)
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null)

  // Submission
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // Categories for filtering
  const categories = [...new Set(furnitureItems.map(i => i.category))]
  const [activeCategory, setActiveCategory] = useState<string>('Living')

  // Computed volume
  const totalVolume = Object.entries(selectedItems).reduce((sum, [id, qty]) => {
    const item = furnitureItems.find(i => i.id === id)
    return sum + (item ? item.volume * qty : 0)
  }, 0)

  // Get effective move size
  const effectiveMoveSize: MoveSize = moveSize || (selectedTruckId ? getMoveSizeFromTruck(selectedTruckId) : 'estandar')

  // Get suggested trucks based on volume and type
  const suggestedTrucks = useCallback((): TruckOption[] => {
    const filtered = truckOptions.filter(t => t.type === truckType).sort((a, b) => a.maxVolume - b.maxVolume)
    if (totalVolume <= 0) return filtered.slice(0, 1)

    const result: TruckOption[] = []
    let remaining = totalVolume

    const firstFit = filtered.find(t => t.maxVolume >= remaining)
    if (firstFit) {
      result.push(firstFit)
      remaining = 0
    } else {
      const largest = filtered[filtered.length - 1]
      result.push(largest)
      remaining -= largest.maxVolume
      while (remaining > 0) {
        const nextFit = filtered.find(t => t.maxVolume >= remaining)
        if (nextFit) {
          result.push(nextFit)
          remaining = 0
        } else {
          result.push(largest)
          remaining -= largest.maxVolume
        }
      }
    }
    return result
  }, [totalVolume, truckType])

  // Get filtered trucks for manual selection
  const filteredTrucks = truckOptions.filter(t => t.type === truckType).sort((a, b) => a.maxVolume - b.maxVolume)

  // ── Floor charge calculation ──
  const calcFloorCharge = useCallback(() => {
    const rates = floorChargeRates[effectiveMoveSize]
    const originCharge = originFloor > 0 ? (hasElevatorOrigin ? rates.conAscensor : rates.sinAscensor) * originFloor : 0
    const destCharge = destFloor > 0 ? (hasElevatorDest ? rates.conAscensor : rates.sinAscensor) * destFloor : 0
    return { originCharge, destCharge, total: originCharge + destCharge }
  }, [effectiveMoveSize, originFloor, destFloor, hasElevatorOrigin, hasElevatorDest])

  // ── Cargadores price ──
  const calcCargadoresPrice = useCallback(() => {
    const price = cargadorPricePerSize[effectiveMoveSize]
    return {
      origenPrice: cargadoresOrigen * price,
      destinoPrice: cargadoresDestino * price,
      total: (cargadoresOrigen + cargadoresDestino) * price,
      perCargador: price,
    }
  }, [effectiveMoveSize, cargadoresOrigen, cargadoresDestino])

  // ── Embalaje price ──
  const calcEmbalajePrice = useCallback(() => {
    if (!embalaje) return 0
    const vol = calcPath === 'needs_help' ? totalVolume : (truckOptions.find(t => t.id === selectedTruckId)?.maxVolume || 10)
    return Math.round(vol * EMBALAJE_PRICE_PER_M3)
  }, [embalaje, calcPath, totalVolume, selectedTruckId])

  // ── Box price ──
  const calcBoxPrice = useCallback(() => boxCount * BOX_PRICE, [boxCount])

  // ── Insurance ──
  const calcInsurance = useCallback(() => {
    if (!wantsInsurance || !insuranceValue) return 0
    return Math.round(parseFloat(insuranceValue) * 0.02)
  }, [wantsInsurance, insuranceValue])

  // ── IVA ──
  const calcIVA = useCallback((subtotal: number) => {
    if (!wantsIVA) return 0
    return Math.round(subtotal * 0.16)
  }, [wantsIVA])

  // ── Calculate full estimate ──
  const calculateEstimate = useCallback(async () => {
    setIsCalculating(true)
    try {
      const trucks = calcPath === 'needs_help'
        ? suggestedTrucks()
        : truckOptions.filter(t => t.id === selectedTruckId)

      if (trucks.length === 0) { setIsCalculating(false); return }

      // Distance
      let distance = 10
      if (useMap && mapDistance !== null) {
        distance = mapDistance
      } else {
        try {
          const res = await fetch(`/api/mudanza?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`)
          if (res.ok) {
            const data = await res.json()
            if (data.distance) distance = data.distance
          }
        } catch { /* fallback */ }
      }
      setEstimatedDistance(distance)

      // Truck price
      const truckPrice = trucks.reduce((sum, t) => sum + t.basePrice + (t.pricePerKm * distance), 0)

      // Floor charges
      const floorChargesTotal = calcFloorCharge().total

      // Services
      const desmontajePrice = desmontaje ? 200 : 0
      const embalajePriceVal = calcEmbalajePrice()
      const montajePrice = montaje ? 200 : 0
      const desembalajePrice = desembalaje ? 250 : 0
      const elevadorPrice = elevador ? 500 : 0
      const limpiezaPrice = limpieza ? 300 : 0

      // Cargadores
      const cargadoresTotal = calcCargadoresPrice().total

      // Boxes
      const boxTotal = calcBoxPrice()

      // Insurance
      const insuranceTotal = calcInsurance()

      // Subtotal before IVA
      const subtotal = truckPrice + floorChargesTotal + desmontajePrice + embalajePriceVal +
        montajePrice + desembalajePrice + elevadorPrice + limpiezaPrice +
        cargadoresTotal + boxTotal + insuranceTotal

      // IVA
      const ivaTotal = calcIVA(subtotal)

      setEstimatedPrice(subtotal + ivaTotal)
    } finally {
      setIsCalculating(false)
      setShowEstimate(true)
    }
  }, [calcPath, suggestedTrucks, selectedTruckId, origin, destination, useMap, mapDistance,
    calcFloorCharge, desmontaje, calcEmbalajePrice, montaje, desembalaje, elevador, limpieza,
    calcCargadoresPrice, calcBoxPrice, calcInsurance, calcIVA])

  // Item quantity controls
  const addItem = (id: string) => setSelectedItems(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }))
  const removeItem = (id: string) => setSelectedItems(prev => {
    const next = { ...prev }
    if (next[id] <= 1) delete next[id]; else next[id]--
    return next
  })
  const itemCount = Object.values(selectedItems).reduce((a, b) => a + b, 0)

  // ── Select move size and auto-set truck ──
  const selectMoveSize = (size: MoveSize) => {
    setMoveSize(size)
    const cat = moveSizeCategories.find(c => c.id === size)
    if (cat) {
      const truckId = truckType === 'cerrado' ? cat.truckCerrado : cat.truckAbierto
      setSelectedTruckId(truckId)
    }
  }

  // ── Reset ──
  const resetCalc = () => {
    setCalcPath('select')
    setSelectedItems({})
    setSelectedTruckId('')
    setMoveSize(null)
    setOrigin('')
    setDestination('')
    setUseMap(false)
    setMapOrigin({ lat: -17.7833, lng: -63.1821 })
    setMapDest({ lat: -17.7833, lng: -63.1821 })
    setMapDistance(null)
    setOriginFloor(0)
    setDestFloor(0)
    setHasElevatorOrigin(false)
    setHasElevatorDest(false)
    setDate('')
    setMoveTime('08:00')
    setDesmontaje(false)
    setEmbalaje(false)
    setMontaje(false)
    setDesembalaje(false)
    setElevador(false)
    setLimpieza(false)
    setCargadoresOrigen(0)
    setCargadoresDestino(0)
    setBoxCount(0)
    setWantsInsurance(false)
    setInsuranceValue('')
    setWantsIVA(false)
    setRazonSocial('')
    setNit('')
    setPaymentMethod('efectivo')
    setNombre('')
    setTelefono('')
    setWhatsapp(false)
    setCorreo('')
    setShowEstimate(false)
    setEstimatedDistance(null)
    setEstimatedPrice(null)
    setSubmitSuccess(false)
  }

  const currentTruck = truckOptions.find(t => t.id === selectedTruckId)
  const suggestion = suggestedTrucks()

  // ── Build WhatsApp message ──
  const buildWhatsAppMessage = useCallback(() => {
    const lines = [
      '🚚 *SOLICITUD DE MUDANZA - ECOTAXI BOLIVIA*',
      `Tipo: ${mudanzaType === 'casa' ? 'Casa' : mudanzaType === 'oficina' ? 'Oficina' : 'Especial'}`,
      `Vehículo: ${currentTruck?.name || 'N/A'}`,
      `Origen: ${origin}`,
      `Destino: ${destination}`,
      `Distancia: ${estimatedDistance || '?'} km`,
      `Fecha: ${date}`,
      `Hora: ${moveTime}`,
      '',
      'Servicios:',
      desmontaje ? '• Desmontaje' : '',
      embalaje ? `• Embalaje (Bs ${calcEmbalajePrice()})` : '',
      montaje ? '• Montaje' : '',
      desembalaje ? '• Desembalaje' : '',
      elevador ? '• Elevador/grúa' : '',
      limpieza ? '• Limpieza post-mudanza' : '',
      `Cargadores origen: ${cargadoresOrigen}`,
      `Cargadores destino: ${cargadoresDestino}`,
      boxCount > 0 ? `Cajas: ${boxCount}` : '',
      wantsInsurance ? `Seguro: Sí, Bs ${insuranceValue} (2% = Bs ${calcInsurance()})` : 'Seguro: No',
      wantsIVA ? `IVA: Sí (Razón Social: ${razonSocial}, NIT: ${nit})` : 'IVA: No',
      '',
      `*ESTIMACIÓN TOTAL: Bs ${estimatedPrice?.toLocaleString()}*`,
      `Nombre: ${nombre}`,
      `Teléfono: ${telefono}`,
      `Correo: ${correo}`,
      `Método de pago: ${paymentMethods.find(p => p.id === paymentMethod)?.name || paymentMethod}`,
    ]
    return lines.filter(l => l !== '').join('\n')
  }, [mudanzaType, currentTruck, origin, destination, estimatedDistance, date, moveTime,
    desmontaje, embalaje, calcEmbalajePrice, montaje, desembalaje, elevador, limpieza,
    cargadoresOrigen, cargadoresDestino, boxCount, wantsInsurance, insuranceValue, calcInsurance,
    wantsIVA, razonSocial, nit, estimatedPrice, nombre, telefono, correo, paymentMethod])

  // ── Submit by email ──
  const submitByEmail = async () => {
    setIsSubmitting(true)
    try {
      await fetch('/api/mudanza', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mudanzaType,
          truckId: selectedTruckId,
          truckName: currentTruck?.name,
          origin,
          destination,
          distance: estimatedDistance,
          date,
          time: moveTime,
          desmontaje,
          embalaje,
          montaje,
          desembalaje,
          elevador,
          limpieza,
          cargadoresOrigen,
          cargadoresDestino,
          boxCount,
          wantsInsurance,
          insuranceValue,
          wantsIVA,
          razonSocial,
          nit,
          paymentMethod,
          nombre,
          telefono,
          correo,
          estimatedPrice,
          moveSize: effectiveMoveSize,
        }),
      })
      setSubmitSuccess(true)
    } catch {
      // error handling
    } finally {
      setIsSubmitting(false)
    }
  }

  /* ══════════════════════════════════════════════════════
     SHARED: Route + Extras section (used by all paths)
     ══════════════════════════════════════════════════════ */
  const renderRouteAndExtras = () => (
    <>
      {/* Origin / Destination */}
      <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Origen y Destino</h3>
          <button
            onClick={() => setUseMap(!useMap)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              useMap
                ? 'bg-[#00E676]/10 border border-[#00E676]/20 text-[#00E676]'
                : 'bg-white/[0.04] border border-white/[0.06] text-white/40 hover:text-white/60'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            Usar Mapa
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Dirección de origen</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00E676]/50" />
              <input type="text" value={origin} onChange={e => setOrigin(e.target.value)} placeholder="Ej: Av. Monseñor Rivero #345" className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder-white/20 outline-none focus:border-[#00E676]/30 transition-colors" />
            </div>
          </div>
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Dirección de destino</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#818CF8]/50" />
              <input type="text" value={destination} onChange={e => setDestination(e.target.value)} placeholder="Ej: Calle Sucre #123, Cochabamba" className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder-white/20 outline-none focus:border-[#818CF8]/30 transition-colors" />
            </div>
          </div>
        </div>

        {/* Map */}
        {useMap && (
          <div className="mt-4">
            <MudanzaMap
              origin={mapOrigin}
              destination={mapDest}
              onOriginChange={(pos, address) => {
                setMapOrigin(pos)
                if (address) setOrigin(address)
              }}
              onDestinationChange={(pos, address) => {
                setMapDest(pos)
                if (address) setDestination(address)
              }}
              onDistanceChange={dist => setMapDistance(dist)}
            />
          </div>
        )}

        {/* Floor info */}
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Piso de origen</label>
            <div className="flex items-center gap-3">
              <select value={originFloor} onChange={e => setOriginFloor(Number(e.target.value))} className="flex-1 py-3 px-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm outline-none focus:border-[#00E676]/30 transition-colors">
                {floorOptions.map(f => <option key={f.label} value={f.floors} className="bg-[#0a0e17]">{f.label}</option>)}
              </select>
              {originFloor > 0 && (
                <label className="flex items-center gap-2 text-xs text-white/40 cursor-pointer shrink-0">
                  <input type="checkbox" checked={hasElevatorOrigin} onChange={e => setHasElevatorOrigin(e.target.checked)} className="accent-[#00E676]" />
                  Con ascensor
                </label>
              )}
            </div>
          </div>
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Piso de destino</label>
            <div className="flex items-center gap-3">
              <select value={destFloor} onChange={e => setDestFloor(Number(e.target.value))} className="flex-1 py-3 px-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm outline-none focus:border-[#818CF8]/30 transition-colors">
                {floorOptions.map(f => <option key={f.label} value={f.floors} className="bg-[#0a0e17]">{f.label}</option>)}
              </select>
              {destFloor > 0 && (
                <label className="flex items-center gap-2 text-xs text-white/40 cursor-pointer shrink-0">
                  <input type="checkbox" checked={hasElevatorDest} onChange={e => setHasElevatorDest(e.target.checked)} className="accent-[#818CF8]" />
                  Con ascensor
                </label>
              )}
            </div>
          </div>
        </div>
        {originFloor > 0 && (
          <p className="mt-2 text-[10px] text-white/25">
            Carga por piso origen: Bs {hasElevatorOrigin ? floorChargeRates[effectiveMoveSize].conAscensor : floorChargeRates[effectiveMoveSize].sinAscensor}/piso ({effectiveMoveSize === 'express' ? 'Pequeño' : effectiveMoveSize === 'estandar' ? 'Mediano' : effectiveMoveSize === 'familiar' ? 'Grande' : 'Extra Grande'})
          </p>
        )}
        {destFloor > 0 && (
          <p className="mt-1 text-[10px] text-white/25">
            Carga por piso destino: Bs {hasElevatorDest ? floorChargeRates[effectiveMoveSize].conAscensor : floorChargeRates[effectiveMoveSize].sinAscensor}/piso
          </p>
        )}

        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Fecha preferida</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full py-3 px-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm outline-none focus:border-[#00E676]/30 transition-colors" />
          </div>
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Hora preferida</label>
            <input type="time" value={moveTime} onChange={e => setMoveTime(e.target.value)} className="w-full py-3 px-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm outline-none focus:border-[#00E676]/30 transition-colors" />
          </div>
        </div>
      </div>

      {/* Complementary Services: Origin / Destination split */}
      <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
        <h3 className="text-lg font-semibold text-white mb-4">Servicios Complementarios</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {/* LEFT: Origen */}
          <div>
            <h4 className="text-sm font-semibold text-[#00E676] mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4" /> En el Origen
            </h4>
            <div className="space-y-3">
              {/* Desmontaje */}
              <button
                onClick={() => setDesmontaje(!desmontaje)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-300 ${
                  desmontaje ? 'border-[#00E676]/40 bg-[#00E676]/5' : 'border-white/[0.06] bg-white/[0.02] hover:border-white/10'
                }`}
              >
                <Box className={`w-4 h-4 shrink-0 ${desmontaje ? 'text-[#00E676]' : 'text-white/30'}`} />
                <div className="flex-1">
                  <p className={`text-sm font-medium ${desmontaje ? 'text-white' : 'text-white/60'}`}>Desmontaje de muebles</p>
                  <p className="text-xs text-white/30">Desarmado para facilitar el traslado</p>
                </div>
                <span className="text-xs font-semibold text-[#00E676]">Bs 200</span>
              </button>

              {/* Embalaje */}
              <button
                onClick={() => setEmbalaje(!embalaje)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-300 ${
                  embalaje ? 'border-[#00E676]/40 bg-[#00E676]/5' : 'border-white/[0.06] bg-white/[0.02] hover:border-white/10'
                }`}
              >
                <Package className={`w-4 h-4 shrink-0 ${embalaje ? 'text-[#00E676]' : 'text-white/30'}`} />
                <div className="flex-1">
                  <p className={`text-sm font-medium ${embalaje ? 'text-white' : 'text-white/60'}`}>Embalaje profesional</p>
                  <p className="text-xs text-white/30">Bs {EMBALAJE_PRICE_PER_M3}/m³ — Protección de muebles y objetos</p>
                </div>
                {embalaje && (
                  <span className="text-xs font-semibold text-[#00E676]">Bs {calcEmbalajePrice()}</span>
                )}
              </button>

              {/* Cargadores Origen */}
              <div className="p-3 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Users className={`w-4 h-4 ${cargadoresOrigen > 0 ? 'text-[#00E676]' : 'text-white/30'}`} />
                    <span className="text-sm font-medium text-white/60">Cargadores / Etibadores</span>
                  </div>
                  <span className="text-xs text-white/25">Bs {cargadorPricePerSize[effectiveMoveSize]}/c/u</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setCargadoresOrigen(Math.max(0, cargadoresOrigen - 1))}
                    className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center text-white/40 hover:bg-white/[0.1] transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className={`text-lg font-bold w-6 text-center ${cargadoresOrigen > 0 ? 'text-[#00E676]' : 'text-white/20'}`}>{cargadoresOrigen}</span>
                  <button
                    onClick={() => setCargadoresOrigen(Math.min(6, cargadoresOrigen + 1))}
                    className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center text-white/40 hover:bg-white/[0.1] transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Destino */}
          <div>
            <h4 className="text-sm font-semibold text-[#818CF8] mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4" /> En el Destino
            </h4>
            <div className="space-y-3">
              {/* Montaje */}
              <button
                onClick={() => setMontaje(!montaje)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-300 ${
                  montaje ? 'border-[#818CF8]/40 bg-[#818CF8]/5' : 'border-white/[0.06] bg-white/[0.02] hover:border-white/10'
                }`}
              >
                <Box className={`w-4 h-4 shrink-0 ${montaje ? 'text-[#818CF8]' : 'text-white/30'}`} />
                <div className="flex-1">
                  <p className={`text-sm font-medium ${montaje ? 'text-white' : 'text-white/60'}`}>Montaje de muebles</p>
                  <p className="text-xs text-white/30">Armado de muebles en el destino</p>
                </div>
                <span className="text-xs font-semibold text-[#818CF8]">Bs 200</span>
              </button>

              {/* Desembalaje */}
              <button
                onClick={() => setDesembalaje(!desembalaje)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-300 ${
                  desembalaje ? 'border-[#818CF8]/40 bg-[#818CF8]/5' : 'border-white/[0.06] bg-white/[0.02] hover:border-white/10'
                }`}
              >
                <Package className={`w-4 h-4 shrink-0 ${desembalaje ? 'text-[#818CF8]' : 'text-white/30'}`} />
                <div className="flex-1">
                  <p className={`text-sm font-medium ${desembalaje ? 'text-white' : 'text-white/60'}`}>Desembalaje</p>
                  <p className="text-xs text-white/30">Desempaquetado y colocación en destino</p>
                </div>
                <span className="text-xs font-semibold text-[#818CF8]">Bs 250</span>
              </button>

              {/* Cargadores Destino */}
              <div className="p-3 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Users className={`w-4 h-4 ${cargadoresDestino > 0 ? 'text-[#818CF8]' : 'text-white/30'}`} />
                    <span className="text-sm font-medium text-white/60">Cargadores / Etibadores</span>
                  </div>
                  <span className="text-xs text-white/25">Bs {cargadorPricePerSize[effectiveMoveSize]}/c/u</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setCargadoresDestino(Math.max(0, cargadoresDestino - 1))}
                    className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center text-white/40 hover:bg-white/[0.1] transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className={`text-lg font-bold w-6 text-center ${cargadoresDestino > 0 ? 'text-[#818CF8]' : 'text-white/20'}`}>{cargadoresDestino}</span>
                  <button
                    onClick={() => setCargadoresDestino(Math.min(6, cargadoresDestino + 1))}
                    className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center text-white/40 hover:bg-white/[0.1] transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional services */}
        <div className="mt-4 pt-4 border-t border-white/[0.06]">
          <h4 className="text-sm font-semibold text-white/50 mb-3">Servicios adicionales</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Elevador */}
            <button
              onClick={() => setElevador(!elevador)}
              className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-300 ${
                elevador ? 'border-[#FB923C]/40 bg-[#FB923C]/5' : 'border-white/[0.06] bg-white/[0.02] hover:border-white/10'
              }`}
            >
              <Truck className={`w-4 h-4 shrink-0 ${elevador ? 'text-[#FB923C]' : 'text-white/30'}`} />
              <div className="flex-1">
                <p className={`text-sm font-medium ${elevador ? 'text-white' : 'text-white/60'}`}>Elevador/grúa</p>
                <p className="text-xs font-semibold text-[#FB923C]">Bs 500</p>
              </div>
            </button>

            {/* Limpieza */}
            <button
              onClick={() => setLimpieza(!limpieza)}
              className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-300 ${
                limpieza ? 'border-[#FB923C]/40 bg-[#FB923C]/5' : 'border-white/[0.06] bg-white/[0.02] hover:border-white/10'
              }`}
            >
              <CheckCircle2 className={`w-4 h-4 shrink-0 ${limpieza ? 'text-[#FB923C]' : 'text-white/30'}`} />
              <div className="flex-1">
                <p className={`text-sm font-medium ${limpieza ? 'text-white' : 'text-white/60'}`}>Limpieza post-mudanza</p>
                <p className="text-xs font-semibold text-[#FB923C]">Bs 300</p>
              </div>
            </button>

            {/* Cajas de cartón */}
            <div className="p-3 rounded-xl border border-white/[0.06] bg-white/[0.02]">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Boxes className={`w-4 h-4 ${boxCount > 0 ? 'text-[#FB923C]' : 'text-white/30'}`} />
                  <span className="text-sm font-medium text-white/60">Cajas de cartón</span>
                </div>
                <span className="text-xs text-white/25">Bs {BOX_PRICE}/c/u</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setBoxCount(Math.max(0, boxCount - 1))}
                  className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center text-white/40 hover:bg-white/[0.1] transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className={`text-lg font-bold w-6 text-center ${boxCount > 0 ? 'text-[#FB923C]' : 'text-white/20'}`}>{boxCount}</span>
                <button
                  onClick={() => setBoxCount(Math.min(100, boxCount + 1))}
                  className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center text-white/40 hover:bg-white/[0.1] transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Insurance */}
        <div className="mt-4 pt-4 border-t border-white/[0.06]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-white/40" />
              <span className="text-sm font-medium text-white/60">¿Requerís seguro de carga?</span>
            </div>
            <button
              onClick={() => setWantsInsurance(!wantsInsurance)}
              className={`relative w-11 h-6 rounded-full transition-colors ${wantsInsurance ? 'bg-[#00E676]' : 'bg-white/[0.1]'}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${wantsInsurance ? 'translate-x-5' : ''}`} />
            </button>
          </div>
          {wantsInsurance && (
            <div className="space-y-2">
              <div>
                <label className="block text-xs text-white/40 mb-1 uppercase tracking-wider">Valor declarado de la carga (Bs)</label>
                <input
                  type="number"
                  value={insuranceValue}
                  onChange={e => setInsuranceValue(e.target.value)}
                  placeholder="Ej: 50000"
                  className="w-full py-2 px-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder-white/20 outline-none focus:border-[#00E676]/30 transition-colors"
                />
              </div>
              {insuranceValue && parseFloat(insuranceValue) > 0 && (
                <p className="text-xs text-white/40">
                  Seguro: 2% de Bs {parseFloat(insuranceValue).toLocaleString()} = <span className="text-[#00E676] font-semibold">Bs {calcInsurance().toLocaleString()}</span>
                </p>
              )}
            </div>
          )}
        </div>

        {/* IVA */}
        <div className="mt-4 pt-4 border-t border-white/[0.06]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-white/40" />
              <span className="text-sm font-medium text-white/60">¿Requerís factura con IVA?</span>
            </div>
            <button
              onClick={() => setWantsIVA(!wantsIVA)}
              className={`relative w-11 h-6 rounded-full transition-colors ${wantsIVA ? 'bg-[#818CF8]' : 'bg-white/[0.1]'}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${wantsIVA ? 'translate-x-5' : ''}`} />
            </button>
          </div>
          {wantsIVA && (
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-white/40 mb-1 uppercase tracking-wider">Razón Social</label>
                <input
                  type="text"
                  value={razonSocial}
                  onChange={e => setRazonSocial(e.target.value)}
                  placeholder="Nombre de la empresa"
                  className="w-full py-2 px-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder-white/20 outline-none focus:border-[#818CF8]/30 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs text-white/40 mb-1 uppercase tracking-wider">NIT</label>
                <input
                  type="text"
                  value={nit}
                  onChange={e => setNit(e.target.value)}
                  placeholder="Número de NIT"
                  className="w-full py-2 px-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder-white/20 outline-none focus:border-[#818CF8]/30 transition-colors"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )

  return (
    <div className="pt-20">
      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="relative py-20 md:py-28 overflow-hidden min-h-[70vh] flex items-center">
        {heroImages.map((img, i) => (
          <div
            key={img}
            className="absolute inset-0 transition-opacity duration-[2000ms]"
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: heroSlide === i ? 0.35 : 0,
              transition: 'opacity 2s ease-in-out',
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17]/70 via-[#0a0e17]/50 to-[#0a0e17]/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0e17]/60 via-transparent to-[#0a0e17]/60" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <div className={`transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#818CF8]/10 border border-[#818CF8]/20 mb-6">
              <Truck className="w-4 h-4 text-[#818CF8]" />
              <span className="text-sm text-[#818CF8]">Mudanzas Profesionales</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Servicio de{' '}
              <span className="bg-gradient-to-r from-[#818CF8] to-[#00E676] bg-clip-text text-transparent">
                Mudanza
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/50 max-w-3xl mx-auto mb-8 leading-relaxed">
              Mudanzas locales, provinciales y nacionales. De casa, oficina o especial.
              Nuestra calculadora te ayuda a elegir el vehículo correcto y estimar el costo de tu mudanza.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {[
                { icon: Home, label: 'Casa' },
                { icon: Building2, label: 'Oficina' },
                { icon: Star, label: 'Especial' },
              ].map(t => (
                <div key={t.label} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                  <t.icon className="w-4 h-4 text-[#00E676]" />
                  <span className="text-sm text-white/70">{t.label}</span>
                </div>
              ))}
            </div>
            <a
              href="#calculadora"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all duration-300 shadow-[0_0_30px_rgba(0,230,118,0.3)] hover:shadow-[0_0_40px_rgba(0,230,118,0.5)]"
            >
              <Calculator className="w-5 h-5" />
              Calcular Mi Mudanza
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroSlide(i)}
              className={`w-8 h-1.5 rounded-full transition-all duration-500 ${
                heroSlide === i ? 'bg-[#00E676] w-8' : 'bg-white/20 w-4'
              }`}
              aria-label={`Imagen ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ═══ SERVICE TYPES with background images ═══ */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Tipos de{' '}
            <span className="bg-gradient-to-r from-[#818CF8] to-[#00E676] bg-clip-text text-transparent">Mudanza</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Home, title: 'Mudanza de Casa', bgImage: '/mudanza-servicio-casa.webp', desc: 'Traslado completo de tu hogar. Mudanzas locales dentro de la ciudad, provinciales o a nivel nacional. Empaquetado, carga, traslado y desmontaje incluidos según tu necesidad.', features: ['Local, provincial y nacional', 'Embalaje profesional disponible', 'Seguro de carga incluido', 'Personal capacitado'] },
              { icon: Star, title: 'Mudanza Especial', bgImage: '/mudanza-servicio-especial.webp', desc: 'Para objetos de valor, obras de arte, instrumentos musicales, equipos médicos o maquinaria delicada. Trato especializado con protección reforzada.', features: ['Embalaje reforzado', 'Vehículo exclusivo', 'Póliza de seguro ampliada', 'Personal especializado'] },
              { icon: Building2, title: 'Mudanza de Oficina', bgImage: '/mudanza-servicio-oficina.webp', desc: 'Minimiza el tiempo de inactividad. Traslado eficiente de equipos, mobiliario y documentos con planificación dedicada para empresas y oficinas corporativas.', features: ['Planificación dedicada', 'Fin de semana y nocturno', 'Montaje y desmontaje', 'Facturación corporativa'] },
            ].map((item) => (
              <div key={item.title} className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-[#818CF8]/30 hover:bg-white/[0.05] transition-all duration-500 overflow-hidden">
                {/* Background image with lighter overlay */}
                <div
                  className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                  style={{
                    backgroundImage: `url(${item.bgImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e17] via-[#0a0e17]/40 to-[#0a0e17]/60 group-hover:from-[#0a0e17] group-hover:via-[#0a0e17]/50 group-hover:to-[#0a0e17]/70 transition-all duration-500" />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-[#818CF8]/10 flex items-center justify-center mb-5">
                    <item.icon className="w-7 h-7 text-[#818CF8]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-5">{item.desc}</p>
                  <ul className="space-y-2">
                    {item.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm text-white/50">
                        <CheckCircle2 className="w-4 h-4 text-[#00E676] shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CALCULATOR ═══ */}
      <section id="calculadora" className="relative py-20 md:py-28 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/mudanza-calculator.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.15,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17]/80 via-[#0a0e17]/60 to-[#0a0e17]/90" />
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 mb-4">
              <Calculator className="w-4 h-4 text-[#00E676]" />
              <span className="text-sm text-[#00E676]">Calculadora de Mudanza</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Estima Tu{' '}
              <span className="bg-gradient-to-r from-[#00E676] to-[#818CF8] bg-clip-text text-transparent">Mudanza</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              ¿Ya sabés qué vehículo necesitás, conocés el tamaño de tu mudanza, o preferís que te ayudemos a elegir?
            </p>
          </div>

          {/* ═══ STEP 1: Path Selection ═══ */}
          {calcPath === 'select' && (
            <div className="max-w-3xl mx-auto space-y-6">
              {/* Mudanza type */}
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <h3 className="text-lg font-semibold text-white mb-4">¿Qué tipo de mudanza realizás?</h3>
                <div className="grid grid-cols-3 gap-3">
                  {([['casa', Home, 'Casa'], ['oficina', Building2, 'Oficina'], ['especial', Star, 'Especial']] as const).map(([val, Icon, label]) => (
                    <button
                      key={val}
                      onClick={() => setMudanzaType(val)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-300 ${
                        mudanzaType === val
                          ? 'border-[#00E676]/50 bg-[#00E676]/10 text-[#00E676]'
                          : 'border-white/[0.06] bg-white/[0.02] text-white/50 hover:border-white/10 hover:bg-white/[0.04]'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                      <span className="text-sm font-medium">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Truck type */}
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <h3 className="text-lg font-semibold text-white mb-2">¿Qué tipo de vehículo preferís?</h3>
                <p className="text-sm text-white/40 mb-4">El furgón cerrado protege tu carga del clima y la vista. La camioneta abierta es más económica para mudanzas pequeñas.</p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setTruckType('cerrado')}
                    className={`flex items-center gap-3 p-4 rounded-xl border transition-all duration-300 ${
                      truckType === 'cerrado'
                        ? 'border-[#818CF8]/50 bg-[#818CF8]/10'
                        : 'border-white/[0.06] bg-white/[0.02] hover:border-white/10'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-lg bg-[#818CF8]/15 flex items-center justify-center">
                      <Image src="/fleet-furgon-grande.webp" alt="Furgón" width={40} height={28} className="object-contain" />
                    </div>
                    <div className="text-left">
                      <p className={`text-sm font-semibold ${truckType === 'cerrado' ? 'text-[#818CF8]' : 'text-white/70'}`}>Furgón cerrado</p>
                      <p className="text-xs text-white/30">Protegido del clima</p>
                    </div>
                  </button>
                  <button
                    onClick={() => setTruckType('abierto')}
                    className={`flex items-center gap-3 p-4 rounded-xl border transition-all duration-300 ${
                      truckType === 'abierto'
                        ? 'border-[#FB923C]/50 bg-[#FB923C]/10'
                        : 'border-white/[0.06] bg-white/[0.02] hover:border-white/10'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-lg bg-[#FB923C]/15 flex items-center justify-center">
                      <Image src="/fleet-camioneta-grande.webp" alt="Camioneta" width={40} height={28} className="object-contain" />
                    </div>
                    <div className="text-left">
                      <p className={`text-sm font-semibold ${truckType === 'abierto' ? 'text-[#FB923C]' : 'text-white/70'}`}>Camioneta abierta</p>
                      <p className="text-xs text-white/30">Más económica</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Path choice — now 3 options */}
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <h3 className="text-lg font-semibold text-white mb-4">¿Cómo querés calcular tu mudanza?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => setCalcPath('knows_truck')}
                    className="flex flex-col items-start gap-3 p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-[#00E676]/30 hover:bg-white/[0.05] transition-all duration-300 text-left"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#00E676]/10 flex items-center justify-center">
                      <Truck className="w-6 h-6 text-[#00E676]" />
                    </div>
                    <div>
                      <p className="text-white font-semibold mb-1">Ya sé qué vehículo necesito</p>
                      <p className="text-sm text-white/40">Seleccioná el camión, origen, destino y extras.</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-white/20 self-end" />
                  </button>
                  <button
                    onClick={() => setCalcPath('knows_size')}
                    className="flex flex-col items-start gap-3 p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-[#FB923C]/30 hover:bg-white/[0.05] transition-all duration-300 text-left"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#FB923C]/10 flex items-center justify-center">
                      <Warehouse className="w-6 h-6 text-[#FB923C]" />
                    </div>
                    <div>
                      <p className="text-white font-semibold mb-1">Conozco el tamaño de mi mudanza</p>
                      <p className="text-sm text-white/40">Elegí por tamaño: express, estándar, familiar o premium.</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-white/20 self-end" />
                  </button>
                  <button
                    onClick={() => setCalcPath('needs_help')}
                    className="flex flex-col items-start gap-3 p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-[#818CF8]/30 hover:bg-white/[0.05] transition-all duration-300 text-left"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#818CF8]/10 flex items-center justify-center">
                      <Calculator className="w-6 h-6 text-[#818CF8]" />
                    </div>
                    <div>
                      <p className="text-white font-semibold mb-1">Ayudáme a elegir</p>
                      <p className="text-sm text-white/40">Ingresá tus muebles y te recomendamos el vehículo según volumen.</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-white/20 self-end" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ═══ PATH A: KNOWS TRUCK ═══ */}
          {calcPath === 'knows_truck' && !showEstimate && (
            <div className="max-w-4xl mx-auto space-y-6">
              <button onClick={() => { setCalcPath('select'); setSelectedTruckId('') }} className="flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors text-sm">
                <ArrowLeft className="w-4 h-4" /> Volver
              </button>

              {/* Truck selection */}
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <h3 className="text-lg font-semibold text-white mb-4">Seleccioná tu vehículo</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {filteredTrucks.map(truck => (
                    <button
                      key={truck.id}
                      onClick={() => setSelectedTruckId(truck.id)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-300 ${
                        selectedTruckId === truck.id
                          ? truckType === 'cerrado'
                            ? 'border-[#818CF8]/50 bg-[#818CF8]/10'
                            : 'border-[#FB923C]/50 bg-[#FB923C]/10'
                          : 'border-white/[0.06] bg-white/[0.02] hover:border-white/10'
                      }`}
                    >
                      <Image src={truck.image} alt={truck.name} width={80} height={50} className="object-contain max-h-[50px]" />
                      <span className={`text-xs font-semibold text-center ${selectedTruckId === truck.id ? 'text-white' : 'text-white/60'}`}>{truck.name}</span>
                      <span className="text-[10px] text-white/30">Hasta {truck.maxVolume} m³</span>
                    </button>
                  ))}
                </div>
                {currentTruck && (
                  <div className="mt-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.04]">
                    <div className="flex items-center gap-3">
                      <Image src={currentTruck.image} alt={currentTruck.name} width={60} height={40} className="object-contain" />
                      <div>
                        <p className="text-white font-semibold">{currentTruck.name}</p>
                        <p className="text-sm text-white/40">{currentTruck.description}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {renderRouteAndExtras()}

              {/* Calculate */}
              <button
                onClick={calculateEstimate}
                disabled={!selectedTruckId || !origin || !destination || isCalculating}
                className="w-full py-4 rounded-2xl text-base font-bold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all duration-300 shadow-[0_0_25px_rgba(0,230,118,0.2)] hover:shadow-[0_0_40px_rgba(0,230,118,0.4)] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isCalculating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Calculator className="w-5 h-5" />}
                {isCalculating ? 'Calculando...' : 'Generar Estimación'}
              </button>
            </div>
          )}

          {/* ═══ PATH C: KNOWS SIZE ═══ */}
          {calcPath === 'knows_size' && !showEstimate && (
            <div className="max-w-4xl mx-auto space-y-6">
              <button onClick={() => { setCalcPath('select'); setMoveSize(null) }} className="flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors text-sm">
                <ArrowLeft className="w-4 h-4" /> Volver
              </button>

              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <h3 className="text-lg font-semibold text-white mb-4">¿Qué tamaño tiene tu mudanza?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {moveSizeCategories.map(cat => {
                    const Icon = cat.icon
                    const isSelected = moveSize === cat.id
                    return (
                      <button
                        key={cat.id}
                        onClick={() => selectMoveSize(cat.id)}
                        className={`flex flex-col items-start gap-3 p-5 rounded-xl border text-left transition-all duration-300 ${
                          isSelected
                            ? `border-[${cat.color}]/50 bg-[${cat.color}]/10`
                            : 'border-white/[0.06] bg-white/[0.02] hover:border-white/10'
                        }`}
                        style={isSelected ? { borderColor: `${cat.color}80`, backgroundColor: `${cat.color}15` } : undefined}
                      >
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${cat.color}15` }}>
                          <div style={{ color: cat.color }}><Icon className="w-6 h-6" /></div>
                        </div>
                        <div>
                          <p className="text-white font-semibold mb-0.5">{cat.name}</p>
                          <p className="text-xs text-white/40 mb-2">{cat.subtitle}</p>
                          <p className="text-[11px] text-white/30 leading-relaxed">{cat.description}</p>
                        </div>
                        {isSelected && <div style={{ color: cat.color }}><Check className="w-5 h-5 self-end" /></div>}
                      </button>
                    )
                  })}
                </div>
                {selectedTruckId && currentTruck && (
                  <div className="mt-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.04]">
                    <div className="flex items-center gap-3">
                      <Image src={currentTruck.image} alt={currentTruck.name} width={60} height={40} className="object-contain" />
                      <div>
                        <p className="text-white font-semibold">Vehículo seleccionado: {currentTruck.name}</p>
                        <p className="text-sm text-white/40">{currentTruck.description}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {moveSize && renderRouteAndExtras()}

              {moveSize && (
                <button
                  onClick={calculateEstimate}
                  disabled={!selectedTruckId || !origin || !destination || isCalculating}
                  className="w-full py-4 rounded-2xl text-base font-bold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all duration-300 shadow-[0_0_25px_rgba(0,230,118,0.2)] hover:shadow-[0_0_40px_rgba(0,230,118,0.4)] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isCalculating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Calculator className="w-5 h-5" />}
                  {isCalculating ? 'Calculando...' : 'Generar Estimación'}
                </button>
              )}
            </div>
          )}

          {/* ═══ PATH B: NEEDS HELP (Furniture Selector) ═══ */}
          {calcPath === 'needs_help' && !showEstimate && (
            <div className="max-w-4xl mx-auto space-y-6">
              <button onClick={() => { setCalcPath('select'); setSelectedItems({}) }} className="flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors text-sm">
                <ArrowLeft className="w-4 h-4" /> Volver
              </button>

              {/* Volume indicator */}
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-white">Volumen estimado</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-[#00E676]">{totalVolume.toFixed(1)}</span>
                    <span className="text-sm text-white/40">m³</span>
                  </div>
                </div>
                <div className="h-3 rounded-full bg-white/[0.06] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-[#00E676] to-[#818CF8]"
                    style={{ width: `${Math.min(100, (totalVolume / 30) * 100)}%` }}
                  />
                </div>
                {suggestion.length > 0 && totalVolume > 0 && (
                  <div className="mt-3 flex items-center gap-3 p-3 rounded-xl bg-[#00E676]/5 border border-[#00E676]/10">
                    <Image src={suggestion[0].image} alt={suggestion[0].name} width={50} height={32} className="object-contain" />
                    <div>
                      <p className="text-sm font-semibold text-white">
                        Recomendado: {suggestion.map(s => s.name).join(' + ')}
                      </p>
                      <p className="text-xs text-white/40">
                        {suggestion.length === 1
                          ? `Capacidad ${suggestion[0].maxVolume} m³ — ${totalVolume <= suggestion[0].maxVolume ? '✓ Te sobra espacio' : '⚡ Justo al límite'}`
                          : `Carga dividida en ${suggestion.length} vehículos`
                        }
                      </p>
                    </div>
                  </div>
                )}
                {itemCount > 0 && (
                  <button onClick={() => setSelectedItems({})} className="mt-2 text-xs text-white/30 hover:text-white/50 transition-colors flex items-center gap-1">
                    <X className="w-3 h-3" /> Limpiar selección ({itemCount} items)
                  </button>
                )}
              </div>

              {/* Category tabs */}
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                      activeCategory === cat
                        ? 'bg-[#00E676]/15 text-[#00E676] border border-[#00E676]/30'
                        : 'bg-white/[0.03] text-white/40 border border-white/[0.06] hover:text-white/60'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Furniture grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {furnitureItems
                  .filter(item => item.category === activeCategory)
                  .map(item => {
                    const qty = selectedItems[item.id] || 0
                    return (
                      <div
                        key={item.id}
                        className={`relative p-4 rounded-xl border transition-all duration-300 ${
                          qty > 0
                            ? 'border-[#00E676]/40 bg-[#00E676]/5'
                            : 'border-white/[0.06] bg-white/[0.02] hover:border-white/10'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <item.icon className={`w-5 h-5 ${qty > 0 ? 'text-[#00E676]' : 'text-white/40'}`} />
                          <span className={`text-xs font-medium leading-tight ${qty > 0 ? 'text-white' : 'text-white/50'}`}>{item.name}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-white/25">{item.volume} m³</span>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => removeItem(item.id)}
                              className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                                qty > 0 ? 'bg-white/[0.08] text-white/60 hover:bg-white/[0.12]' : 'bg-white/[0.03] text-white/15'
                              }`}
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className={`w-6 text-center text-sm font-semibold ${qty > 0 ? 'text-[#00E676]' : 'text-white/20'}`}>{qty}</span>
                            <button
                              onClick={() => addItem(item.id)}
                              className="w-7 h-7 rounded-lg bg-white/[0.08] text-white/60 hover:bg-white/[0.12] flex items-center justify-center transition-all"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
              </div>

              {/* Popular items quick-add */}
              {Object.keys(selectedItems).length === 0 && (
                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                  <h4 className="text-sm font-semibold text-white/60 mb-3">Items más comunes — agregá rápido</h4>
                  <div className="flex flex-wrap gap-2">
                    {furnitureItems.filter(i => i.popular).map(item => (
                      <button
                        key={item.id}
                        onClick={() => addItem(item.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-xs text-white/50 hover:text-white hover:border-white/10 transition-all"
                      >
                        <item.icon className="w-3.5 h-3.5" />
                        {item.name}
                        <Plus className="w-3 h-3 text-[#00E676]/50" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Selected items summary */}
              {itemCount > 0 && (
                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                  <h4 className="text-sm font-semibold text-white/60 mb-3">Tu selección ({itemCount} items, {totalVolume.toFixed(1)} m³)</h4>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(selectedItems).map(([id, qty]) => {
                      const item = furnitureItems.find(i => i.id === id)
                      if (!item || qty <= 0) return null
                      return (
                        <span key={id} className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#00E676]/5 border border-[#00E676]/20 text-xs text-white/70">
                          {item.name} × {qty}
                          <button onClick={() => removeItem(id)} className="text-white/30 hover:text-white/60 ml-1"><X className="w-3 h-3" /></button>
                        </span>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Route & Extras when items selected */}
              {itemCount > 0 && (
                <>
                  {renderRouteAndExtras()}
                  <button
                    onClick={calculateEstimate}
                    disabled={!origin || !destination || isCalculating}
                    className="w-full py-4 rounded-2xl text-base font-bold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all duration-300 shadow-[0_0_25px_rgba(0,230,118,0.2)] hover:shadow-[0_0_40px_rgba(0,230,118,0.4)] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isCalculating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Calculator className="w-5 h-5" />}
                    {isCalculating ? 'Calculando...' : 'Generar Estimación'}
                  </button>
                </>
              )}
            </div>
          )}

          {/* ═══ ESTIMATE RESULT ═══ */}
          {showEstimate && estimatedPrice !== null && (
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="p-8 rounded-2xl bg-gradient-to-br from-[#00E676]/5 to-[#818CF8]/5 border border-[#00E676]/20">
                <div className="text-center mb-6">
                  <CheckCircle2 className="w-12 h-12 text-[#00E676] mx-auto mb-3" />
                  <h3 className="text-2xl font-bold text-white mb-1">Tu Estimación</h3>
                  <p className="text-sm text-white/40">Precio aproximado basado en distancia y vehículo</p>
                </div>

                {/* Price */}
                <div className="text-center mb-8">
                  <p className="text-5xl md:text-6xl font-extrabold text-[#00E676] mb-1">Bs {estimatedPrice.toLocaleString()}</p>
                  <p className="text-sm text-white/30">Estimación aproximada</p>
                </div>

                {/* Breakdown */}
                <div className="space-y-3 mb-6">
                  {/* Trucks */}
                  {(calcPath === 'needs_help' ? suggestion : currentTruck ? [currentTruck] : []).map((truck, i) => (
                    <div key={`${truck.id}-${i}`} className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.04]">
                      <Image src={truck.image} alt={truck.name} width={60} height={40} className="object-contain shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white">{truck.name} {i > 0 ? `(adicional #${i + 1})` : ''}</p>
                        <p className="text-xs text-white/30">
                          Base Bs {truck.basePrice} + Bs {truck.pricePerKm}/km
                          {estimatedDistance ? ` × ${estimatedDistance} km` : ''}
                        </p>
                      </div>
                      <p className="text-sm font-bold text-white/70">
                        Bs {(truck.basePrice + truck.pricePerKm * (estimatedDistance || 10)).toLocaleString()}
                      </p>
                    </div>
                  ))}

                  {/* Volume info for path B */}
                  {calcPath === 'needs_help' && totalVolume > 0 && (
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-[#818CF8]/5 border border-[#818CF8]/10">
                      <Info className="w-4 h-4 text-[#818CF8] shrink-0" />
                      <p className="text-xs text-white/50">
                        Volumen total: <span className="text-[#818CF8] font-semibold">{totalVolume.toFixed(1)} m³</span> —
                        {suggestion.length === 1
                          ? ` Capacidad del vehículo: ${suggestion[0].maxVolume} m³`
                          : ` Se requieren ${suggestion.length} vehículos`
                        }
                      </p>
                    </div>
                  )}

                  {/* Move size info for path C */}
                  {calcPath === 'knows_size' && moveSize && (
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-[#FB923C]/5 border border-[#FB923C]/10">
                      <Info className="w-4 h-4 text-[#FB923C] shrink-0" />
                      <p className="text-xs text-white/50">
                        Tamaño: <span className="text-[#FB923C] font-semibold">{moveSizeCategories.find(c => c.id === moveSize)?.name}</span>
                      </p>
                    </div>
                  )}

                  {/* Floor charges */}
                  {calcFloorCharge().total > 0 && (
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.04]">
                      <span className="text-sm text-white/40">Carga por pisos (origen + destino)</span>
                      <span className="text-sm font-semibold text-white/60">
                        Bs {calcFloorCharge().total.toLocaleString()}
                      </span>
                    </div>
                  )}

                  {/* Services breakdown */}
                  {desmontaje && (
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.04]">
                      <span className="text-sm text-white/40">Desmontaje de muebles</span>
                      <span className="text-sm font-semibold text-white/60">Bs 200</span>
                    </div>
                  )}
                  {embalaje && (
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.04]">
                      <span className="text-sm text-white/40">Embalaje profesional ({EMBALAJE_PRICE_PER_M3} Bs/m³)</span>
                      <span className="text-sm font-semibold text-white/60">Bs {calcEmbalajePrice()}</span>
                    </div>
                  )}
                  {montaje && (
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.04]">
                      <span className="text-sm text-white/40">Montaje de muebles</span>
                      <span className="text-sm font-semibold text-white/60">Bs 200</span>
                    </div>
                  )}
                  {desembalaje && (
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.04]">
                      <span className="text-sm text-white/40">Desembalaje</span>
                      <span className="text-sm font-semibold text-white/60">Bs 250</span>
                    </div>
                  )}
                  {elevador && (
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.04]">
                      <span className="text-sm text-white/40">Elevador/grúa</span>
                      <span className="text-sm font-semibold text-white/60">Bs 500</span>
                    </div>
                  )}
                  {limpieza && (
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.04]">
                      <span className="text-sm text-white/40">Limpieza post-mudanza</span>
                      <span className="text-sm font-semibold text-white/60">Bs 300</span>
                    </div>
                  )}

                  {/* Cargadores */}
                  {(cargadoresOrigen > 0 || cargadoresDestino > 0) && (
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.04]">
                      <span className="text-sm text-white/40">
                        Cargadores ({cargadoresOrigen} origen + {cargadoresDestino} destino × Bs {cargadorPricePerSize[effectiveMoveSize]})
                      </span>
                      <span className="text-sm font-semibold text-white/60">Bs {calcCargadoresPrice().total.toLocaleString()}</span>
                    </div>
                  )}

                  {/* Boxes */}
                  {boxCount > 0 && (
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.04]">
                      <span className="text-sm text-white/40">Cajas de cartón ({boxCount} × Bs {BOX_PRICE})</span>
                      <span className="text-sm font-semibold text-white/60">Bs {calcBoxPrice()}</span>
                    </div>
                  )}

                  {/* Insurance */}
                  {wantsInsurance && insuranceValue && (
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.04]">
                      <span className="text-sm text-white/40">Seguro de carga (2% de Bs {parseFloat(insuranceValue).toLocaleString()})</span>
                      <span className="text-sm font-semibold text-white/60">Bs {calcInsurance().toLocaleString()}</span>
                    </div>
                  )}

                  {/* IVA */}
                  {wantsIVA && (() => {
                    const trucks = calcPath === 'needs_help' ? suggestion : currentTruck ? [currentTruck] : []
                    const truckPrice = trucks.reduce((sum, t) => sum + t.basePrice + (t.pricePerKm * (estimatedDistance || 10)), 0)
                    const subtotal = truckPrice + calcFloorCharge().total +
                      (desmontaje ? 200 : 0) + calcEmbalajePrice() + (montaje ? 200 : 0) +
                      (desembalaje ? 250 : 0) + (elevador ? 500 : 0) + (limpieza ? 300 : 0) +
                      calcCargadoresPrice().total + calcBoxPrice() + calcInsurance()
                    const ivaVal = calcIVA(subtotal)
                    return (
                      <div className="flex items-center justify-between p-3 rounded-xl bg-[#818CF8]/5 border border-[#818CF8]/10">
                        <span className="text-sm text-white/40">IVA (16%) — {razonSocial}, NIT: {nit}</span>
                        <span className="text-sm font-semibold text-[#818CF8]">Bs {ivaVal.toLocaleString()}</span>
                      </div>
                    )
                  })()}
                </div>

                {/* Disclaimer */}
                <div className="flex items-start gap-2 p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/10">
                  <AlertCircle className="w-4 h-4 text-yellow-500/70 shrink-0 mt-0.5" />
                  <p className="text-xs text-white/40 leading-relaxed">
                    Esta es una estimación aproximada. El precio final puede variar según las condiciones reales de acceso, distancia exacta y disponibilidad. Contactanos para una cotización exacta.
                  </p>
                </div>
              </div>

              {/* ── Payment Method ── */}
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <h3 className="text-lg font-semibold text-white mb-4">Método de Pago</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {paymentMethods.map(pm => {
                    const Icon = pm.icon
                    const isSelected = paymentMethod === pm.id
                    return (
                      <button
                        key={pm.id}
                        onClick={() => setPaymentMethod(pm.id)}
                        className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all duration-300 ${
                          isSelected
                            ? 'border-[#00E676]/50 bg-[#00E676]/10'
                            : 'border-white/[0.06] bg-white/[0.02] hover:border-white/10'
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${isSelected ? 'text-[#00E676]' : 'text-white/30'}`} />
                        <span className={`text-[10px] font-medium text-center ${isSelected ? 'text-white' : 'text-white/50'}`}>{pm.name}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* ── Personal Data ── */}
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <h3 className="text-lg font-semibold text-white mb-4">Tus Datos</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Nombre completo *</label>
                    <input
                      type="text"
                      value={nombre}
                      onChange={e => setNombre(e.target.value)}
                      placeholder="Tu nombre"
                      className="w-full py-3 px-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder-white/20 outline-none focus:border-[#00E676]/30 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Teléfono *</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="tel"
                        value={telefono}
                        onChange={e => setTelefono(e.target.value)}
                        placeholder="Ej: 73662803"
                        className="flex-1 py-3 px-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder-white/20 outline-none focus:border-[#00E676]/30 transition-colors"
                      />
                      <label className="flex items-center gap-1.5 text-xs text-white/40 cursor-pointer shrink-0 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={whatsapp}
                          onChange={e => setWhatsapp(e.target.checked)}
                          className="accent-[#25D366]"
                        />
                        <MessageCircle className="w-3 h-3 text-[#25D366]" />
                        WhatsApp
                      </label>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Correo electrónico *</label>
                    <input
                      type="email"
                      value={correo}
                      onChange={e => setCorreo(e.target.value)}
                      placeholder="tucorreo@ejemplo.com"
                      className="w-full py-3 px-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder-white/20 outline-none focus:border-[#00E676]/30 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* ── Submission Buttons ── */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/59173662803?text=${encodeURIComponent(buildWhatsAppMessage())}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-4 rounded-2xl text-base font-bold text-black bg-[#25D366] hover:bg-[#20BD5A] transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Enviar por WhatsApp
                </a>
                <button
                  onClick={submitByEmail}
                  disabled={!nombre || !telefono || !correo || isSubmitting}
                  className="flex-1 py-4 rounded-2xl text-base font-bold text-white bg-[#818CF8] hover:bg-[#6366F1] transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Mail className="w-5 h-5" />}
                  {isSubmitting ? 'Enviando...' : 'Enviar por Correo'}
                </button>
                <button
                  onClick={resetCalc}
                  className="py-4 px-6 rounded-2xl text-base font-bold text-white/70 bg-white/[0.05] border border-white/[0.08] hover:bg-white/[0.08] transition-all flex items-center justify-center gap-2"
                >
                  Nueva Consulta
                </button>
              </div>

              {submitSuccess && (
                <div className="p-4 rounded-xl bg-[#00E676]/10 border border-[#00E676]/20 text-center">
                  <CheckCircle2 className="w-6 h-6 text-[#00E676] mx-auto mb-2" />
                  <p className="text-sm text-[#00E676] font-semibold">¡Solicitud enviada con éxito!</p>
                  <p className="text-xs text-white/40 mt-1">Nos pondremos en contacto contigo a la brevedad.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ═══ PROCESS STEPS ═══ */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
        <div className="relative z-10 max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            ¿Cómo{' '}
            <span className="bg-gradient-to-r from-[#00E676] to-[#818CF8] bg-clip-text text-transparent">Funciona?</span>
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', icon: Calculator, title: 'Calculá', desc: 'Usá la calculadora para estimar el vehículo y costo según tu mudanza.' },
              { step: '2', icon: Phone, title: 'Confirmá', desc: 'Contactanos por WhatsApp o correo para confirmar fecha y detalles.' },
              { step: '3', icon: Truck, title: 'Mudanza', desc: 'Nuestro equipo llega puntual con el vehículo y personal necesario.' },
              { step: '4', icon: CheckCircle2, title: 'Listo!', desc: 'Tu mudanza completada de forma segura y profesional.' },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#00E676]/10 border border-[#00E676]/20 flex items-center justify-center mx-auto mb-4">
                  <s.icon className="w-7 h-7 text-[#00E676]" />
                </div>
                <div className="text-xs text-[#00E676]/50 font-bold mb-1">PASO {s.step}</div>
                <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0f1628] to-[#0a0e17]" />
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Preguntas{' '}
            <span className="bg-gradient-to-r from-[#818CF8] to-[#00E676] bg-clip-text text-transparent">Frecuentes</span>
          </h2>
          <FAQ />
        </div>
      </section>
    </div>
  )
}

/* ═══ FAQ COMPONENT ═══ */
function FAQ() {
  const [open, setOpen] = useState<string | null>(null)
  const faqs = [
    { q: '¿Cómo sé qué tamaño de camión necesito?', a: 'Usá nuestra calculadora de mudanza. Podés elegir por tamaño de mudanza (Express, Estándar, Familiar o Premium), ingresar tus muebles para que te recomendemos automáticamente el vehículo, o seleccionar directamente el camión que preferís.' },
    { q: '¿Qué diferencia hay entre furgón cerrado y camioneta abierta?', a: 'El furgón cerrado protege tu carga de la lluvia, polvo y miradas. Es ideal para mudanzas de casas completas o cuando tenés objetos delicados. La camioneta abierta (tipo pickup o camioneta de carga) es más económica y funciona bien para mudanzas pequeñas, traslados parciales o cuando el clima es favorable.' },
    { q: '¿La estimación es el precio final?', a: 'La estimación es aproximada y se basa en la distancia y tipo de vehículo seleccionado. El precio final puede variar según las condiciones reales de acceso (escaleras, pisos sin ascensor, restricciones de estacionamiento), distancia exacta y disponibilidad. Contactanos para una cotización exacta.' },
    { q: '¿Puedo contratar ayudantes adicionales?', a: 'Sí, podés agregar cargadores/etibadores tanto en el origen como en el destino, con cantidad de 0 a 6 por cada lado. El precio por cargador varía según el tamaño del vehículo: Pequeño Bs 60, Mediano Bs 80, Grande Bs 100, Extra Grande Bs 150.' },
    { q: '¿Realizan mudanzas a otras ciudades?', a: 'Sí, realizamos mudanzas provinciales y nacionales a todo el territorio boliviano. Para mudanzas de larga distancia, se cotiza según la ruta, volumen y tipo de servicio. Podés usar nuestro mapa interactivo para calcular la distancia.' },
    { q: '¿Qué pasa si mis cosas no caben en un solo camión?', a: 'Si el volumen de tu mudanza supera la capacidad del camión más grande, nuestra calculadora te sugerirá automáticamente vehículos adicionales. También podemos coordinar viajes múltiples con el mismo vehículo si preferís.' },
    { q: '¿Incluyen seguro de carga?', a: 'Podés contratar el seguro de carga como servicio complementario. El costo es del 2% del valor declarado de la carga. Para mudanzas con objetos de valor, recomendamos fuertemente contratar este seguro.' },
    { q: '¿Puedo obtener factura con IVA?', a: 'Sí, activá la opción "¿Requerís factura con IVA?" en la calculadora y completá tu Razón Social y NIT. El IVA es del 16% sobre el subtotal y se mostrará en el desglose de la estimación.' },
  ]

  return (
    <div className="space-y-3">
      {faqs.map(faq => (
        <div key={faq.q} className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
          <button
            onClick={() => setOpen(open === faq.q ? null : faq.q)}
            className="w-full flex items-center justify-between p-4 text-left"
          >
            <span className={`text-sm font-medium pr-4 ${open === faq.q ? 'text-white' : 'text-white/60'}`}>{faq.q}</span>
            <ChevronDown className={`w-4 h-4 text-white/30 shrink-0 transition-transform duration-200 ${open === faq.q ? 'rotate-180' : ''}`} />
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${open === faq.q ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
            <p className="px-4 pb-4 text-sm text-white/40 leading-relaxed">{faq.a}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
