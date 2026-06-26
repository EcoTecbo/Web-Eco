'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Package, Bike, Car, Truck, Clock, MapPin, Shield, CheckCircle2,
  ArrowRight, Phone, Zap, Users, Eye, BadgeCheck, Smartphone,
  Navigation, Route, Box, Warehouse, Globe, ChevronRight,
  Sparkles, Send, Headphones, MessageCircle, CreditCard,
  Timer, BoxIcon, TruckIcon, UserCheck, BarChart3, Radio,
  MapPinned, PackageCheck, CircleDollarSign, Building2,
  Mail, FileText, ShoppingBag
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

/* ─────────────────────── animated section wrapper ─────────────────────────── */
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
   1. HERO SECTION — Delivery & Shipping Theme
   ═══════════════════════════════════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      {/* Hero background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/envios-hero.webp')` }}
      />

      {/* Dark overlay for legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17]/85 via-[#0d1320]/75 to-[#0a0e17]/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0e17]/70 via-transparent to-[#0a0e17]/70" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,152,0,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,152,0,0.4) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[#FF9800]/12 blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#F44336]/10 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[#FF9800]/6 blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Decorative icons */}
      <div className="absolute top-32 right-[8%] md:right-[18%] opacity-[0.07]">
        <Package className="w-28 h-28 md:w-40 md:h-40 text-[#FF9800]" />
      </div>
      <div className="absolute bottom-28 left-[5%] md:left-[12%] opacity-[0.05]">
        <Bike className="w-20 h-20 md:w-28 md:h-28 text-[#F44336]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 pb-16">
        {/* Badge */}
        <AnimatedSection>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF9800]/10 border border-[#FF9800]/25 mb-8 backdrop-blur-sm">
            <Package className="w-4 h-4 text-[#FF9800]" />
            <span className="text-sm text-[#FF9800] font-medium">Envíos y Mensajería</span>
          </div>
        </AnimatedSection>

        {/* Title */}
        <AnimatedSection delay={100}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)]">
            ¡Lo que quieras,{' '}
            <span className="bg-gradient-to-r from-[#FF9800] via-[#F44336] to-[#FF9800] bg-clip-text text-transparent drop-shadow-[0_2px_15px_rgba(255,152,0,0.4)]">
              lo llevamos!
            </span>
          </h1>
        </AnimatedSection>

        {/* Subtitle */}
        <AnimatedSection delay={200}>
          <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-10 leading-relaxed">
            Solución rápida, confiable y segura para tus envíos, mensajería, compras y delivery.
            En moto, auto, van o camioneta — nosotros nos encargamos de que llegue a su destino.
          </p>
        </AnimatedSection>

        {/* CTA buttons */}
        <AnimatedSection delay={300}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <a
              href="#servicios"
              className="px-8 py-4 rounded-full text-lg font-semibold text-black bg-[#FF9800] hover:bg-[#FFB74D] transition-all duration-300 shadow-[0_0_30px_rgba(255,152,0,0.3)] hover:shadow-[0_0_50px_rgba(255,152,0,0.5)] hover:scale-105"
            >
              Ver Servicios
            </a>
            <a
              href="#contacto"
              className="px-8 py-4 rounded-full text-lg font-semibold text-[#FF9800] border border-[#FF9800]/30 hover:border-[#FF9800]/60 hover:bg-[#FF9800]/5 transition-all duration-300"
            >
              Solicitar Envío
            </a>
          </div>
        </AnimatedSection>

        {/* Stats bar */}
        <AnimatedSection delay={400}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { value: '4', label: 'Tipos de Vehículo', icon: Bike },
              { value: '24h', label: 'Disponibilidad', icon: Clock },
              { value: 'GPS', label: 'Rastreo en Tiempo Real', icon: MapPin },
              { value: '100%', label: 'Confianza Garantizada', icon: Shield },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-4 rounded-2xl bg-white/[0.03] border border-[#FF9800]/10 backdrop-blur-sm hover:border-[#FF9800]/20 transition-all duration-300"
              >
                <stat.icon className="w-5 h-5 text-[#FF9800] mx-auto mb-2" />
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
   2. VEHICLE TYPES — Moto, Auto, Van, Camioneta
   ═══════════════════════════════════════════════════════════════════════════════ */
const vehicleTypes = [
  {
    icon: Bike,
    name: 'Moto',
    tag: 'MÁS RÁPIDO',
    desc: 'El envío más ágil y económico de la ciudad. Ideal para paquetes, documentación y objetos que no excedan 30x30x20 cms y 7 kg de peso. Nuestro motoquero más cercano es asignado en segundos, llegando a tu ubicación en el menor tiempo posible.',
    features: ['Caja de moto (30x30x20 cms)', 'Hasta 7 kg de peso', 'Asignación inmediata', 'Sin tarifas ocultas ni extras'],
    color: '#FF9800',
    accent: '#F44336',
  },
  {
    icon: Car,
    name: 'Auto',
    tag: 'VERSÁTIL',
    desc: 'Para envíos que requieren mayor espacio y protección. Paquetes medianos, compras, documentos importantes o cualquier elemento que necesite un traslado seguro bajo techo. Un vehículo cómodo y confiable para tus entregas urbanas.',
    features: ['Mayor espacio de carga', 'Protección contra clima', 'Ideal para compras y delivery', 'Hasta 4 destinos por viaje'],
    color: '#2196F3',
    accent: '#1565C0',
  },
  {
    icon: Truck,
    name: 'Van',
    tag: 'CAPACIDAD',
    desc: 'Cuando necesitas mover volúmenes importantes de mercadería, paquetería masiva o entregas comerciales de mayor escala. Nuestra van ofrece la combinación perfecta de espacio y agilidad para tus envíos de mediano volumen.',
    features: ['Gran capacidad de carga', 'Paquetería masiva', 'Entregas comerciales', 'Múltiples paradas por ruta'],
    color: '#00E676',
    accent: '#00C853',
  },
  {
    icon: Truck,
    name: 'Camioneta',
    tag: 'ROBUSTO',
    desc: 'Para envíos de gran volumen, mudanzas parciales, mobiliario, electrodomésticos o cualquier carga que exija un vehículo de mayor capacidad y resistencia. Tu envío grande también llega seguro y a tiempo con Ecotaxi.',
    features: ['Carga pesada y voluminosa', 'Mudanzas parciales', 'Electrodomésticos y mobiliario', 'Servicio con ayudante disponible'],
    color: '#8B5CF6',
    accent: '#6D28D9',
  },
]

function VehicleSection() {
  const [activeVehicle, setActiveVehicle] = useState<string | null>(null)

  return (
    <section id="vehiculos" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] rounded-full bg-[#FF9800]/5 blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF9800]/10 border border-[#FF9800]/20 mb-4">
              <Truck className="w-4 h-4 text-[#FF9800]" />
              <span className="text-sm text-[#FF9800]">Flota de Envíos</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Elige tu{' '}
              <span className="bg-gradient-to-r from-[#FF9800] to-[#F44336] bg-clip-text text-transparent">
                Vehículo
              </span>
            </h2>
            <p className="text-white/50 max-w-3xl mx-auto text-lg">
              Desde una moto ágil hasta una camioneta robusta, tenemos el vehículo perfecto para cada tipo de envío.
              Haz click para ver más detalles.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {vehicleTypes.map((vehicle, i) => {
            const isActive = activeVehicle === vehicle.name
            return (
              <AnimatedSection key={vehicle.name} delay={i * 100}>
                <div
                  onClick={() => setActiveVehicle(isActive ? null : vehicle.name)}
                  className={`group relative p-6 rounded-2xl bg-white/[0.03] border backdrop-blur-sm cursor-pointer transition-all duration-500 overflow-hidden ${
                    isActive ? 'bg-white/[0.06]' : 'hover:border-white/10'
                  }`}
                  style={{
                    borderColor: isActive ? `${vehicle.color}40` : undefined,
                  }}
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ boxShadow: `0 0 30px ${vehicle.color}08` }}
                  />

                  {/* Tag */}
                  <div className="absolute top-4 right-4">
                    <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-white/[0.05] text-white/40 border border-white/[0.08]">
                      {vehicle.tag}
                    </span>
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${vehicle.color}12` }}>
                        <vehicle.icon className="w-7 h-7" style={{ color: vehicle.color }} />
                      </div>
                      <div className="pt-1">
                        <h3 className="text-lg font-semibold text-white">{vehicle.name}</h3>
                      </div>
                    </div>

                    <p className="text-sm text-white/45 leading-relaxed mb-4">{vehicle.desc}</p>

                    {/* Features list */}
                    <div className={`space-y-2 transition-all duration-500 overflow-hidden ${
                      isActive ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="pt-3 border-t border-white/[0.06]">
                        {vehicle.features.map((feature) => (
                          <div key={feature} className="flex items-start gap-2 mb-2">
                            <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: vehicle.color }} />
                            <span className="text-sm text-white/55">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {!isActive && (
                      <p className="text-xs text-white/20 mt-3 flex items-center gap-1">
                        <ChevronRight className="w-3 h-3" />
                        Click para más detalles
                      </p>
                    )}
                  </div>
                </div>
              </AnimatedSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   3. MOTO SERVICE — Express + Dedicated (from PDF)
   ═══════════════════════════════════════════════════════════════════════════════ */
function MotoServiceSection() {
  return (
    <section id="servicios" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#1a0f05] to-[#0a0e17]" />
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] rounded-full bg-[#FF9800]/5 blur-[150px]" />
      <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] rounded-full bg-[#F44336]/5 blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF9800]/10 border border-[#FF9800]/20 mb-4">
              <Bike className="w-4 h-4 text-[#FF9800]" />
              <span className="text-sm text-[#FF9800]">Envíos en Moto</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Moto{' '}
              <span className="bg-gradient-to-r from-[#FF9800] to-[#F44336] bg-clip-text text-transparent">
                Envíos
              </span>
            </h2>
            <p className="text-white/50 max-w-3xl mx-auto text-lg">
              Solución rápida, confiable y segura. Realiza tus envíos de paquetes, documentación o cualquier
              objeto que entre en la caja de la moto. Buscamos en el radio más cercano el motoquero disponible.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* EXPRESS */}
          <AnimatedSection delay={100}>
            <div className="relative rounded-2xl overflow-hidden bg-white/[0.03] border border-[#FF9800]/15 backdrop-blur-sm h-full">
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-[#FF9800]/10 flex items-center justify-center">
                    <Zap className="w-8 h-8 text-[#FF9800]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Envío Express</h3>
                    <p className="text-sm text-[#FF9800]">Inmediato, un click de distancia</p>
                  </div>
                </div>

                <p className="text-white/50 leading-relaxed mb-6">
                  Un motoquero a un click de distancia que realiza tus entregas de forma inmediata en cualquier
                  momento del día. Se pueden aplicar las tarifas estándar o según lo acordado con tu compañía.
                  El servicio está sujeto a disponibilidad en el momento que lo requieras.
                </p>

                <div className="space-y-3 mb-6">
                  {[
                    { icon: Clock, text: 'Entrega inmediata en cualquier momento del día' },
                    { icon: MapPin, text: 'Buscamos el motoquero más cercano en tu zona' },
                    { icon: CircleDollarSign, text: 'Conoce al momento costo, tiempo de recogida y entrega' },
                    { icon: Shield, text: 'Sin tarifas ocultas ni extras' },
                    { icon: Smartphone, text: 'Solicita desde la app, WhatsApp o llamada' },
                    { icon: Eye, text: 'Seguimiento en tiempo real de tu envío' },
                  ].map((item) => (
                    <div key={item.text} className="flex items-start gap-3">
                      <item.icon className="w-4 h-4 text-[#FF9800] mt-0.5 shrink-0" />
                      <span className="text-sm text-white/55">{item.text}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-[#FF9800]/5 border border-[#FF9800]/10">
                  <div className="flex items-center gap-2 mb-2">
                    <BadgeCheck className="w-4 h-4 text-[#FF9800]" />
                    <span className="text-xs font-bold text-[#FF9800] uppercase tracking-wider">Mejor Tarifa Garantizada</span>
                  </div>
                  <p className="text-xs text-white/40 leading-relaxed">
                    Sin tarifas ocultas ni costos adicionales. Conoces el precio antes de confirmar
                    tu envío y pagas solo lo acordado.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* DEDICADOS */}
          <AnimatedSection delay={200}>
            <div className="relative rounded-2xl overflow-hidden bg-white/[0.04] border-2 border-[#F44336]/20 backdrop-blur-sm h-full shadow-[0_0_40px_rgba(244,67,54,0.08)]">
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold text-[#F44336] bg-[#F44336]/10 border border-[#F44336]/20">
                  EMPRESAS
                </span>
              </div>
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-[#F44336]/10 flex items-center justify-center">
                    <Building2 className="w-8 h-8 text-[#F44336]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Envíos Dedicados</h3>
                    <p className="text-sm text-[#F44336]">Repartidor personalizado para tu empresa</p>
                  </div>
                </div>

                <p className="text-white/50 leading-relaxed mb-6">
                  Servicio destinado a proporcionar recurso humano altamente calificado para la
                  distribución de mensajería de tu empresa. Seleccionamos y capacitamos al mejor
                  mensajero para tu organización. Con la externalización de este servicio, el cliente
                  incorporará tecnología de punta para el control de la correspondencia interna y externa
                  y, además, reducirá los costos asociados al área de mensajería.
                </p>

                <div className="space-y-3 mb-6">
                  {[
                    { icon: UserCheck, text: 'Mensajero seleccionado y capacitado para tu empresa' },
                    { icon: BarChart3, text: 'Tecnología de punta para control de correspondencia' },
                    { icon: CircleDollarSign, text: 'Reduce costos asociados al área de mensajería' },
                    { icon: Clock, text: 'Disponible por Rutas, Horas, Días o Mes' },
                    { icon: Navigation, text: 'Control total de correspondencia interna y externa' },
                    { icon: Building2, text: 'Como si fuese tu empleado, con tecnología superior' },
                  ].map((item) => (
                    <div key={item.text} className="flex items-start gap-3">
                      <item.icon className="w-4 h-4 text-[#F44336] mt-0.5 shrink-0" />
                      <span className="text-sm text-white/55">{item.text}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-[#F44336]/5 border border-[#F44336]/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-[#F44336]" />
                    <span className="text-xs font-bold text-[#F44336] uppercase tracking-wider">Planes Flexibles</span>
                  </div>
                  <p className="text-xs text-white/40 leading-relaxed">
                    Puedes contratar este servicio por Rutas, Por Horas, Por Días o por Mes, según tus
                    necesidades de envíos. Un repartidor dedicado exclusivamente a tu empresa, como si
                    fuese tu propio empleado.
                  </p>
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
   4. WIALON TECHNOLOGY SECTION
   ═══════════════════════════════════════════════════════════════════════════════ */
const techFeatures = [
  {
    icon: MapPinned,
    title: 'Rastreo GPS en Tiempo Real',
    desc: 'Monitoreo continuo de cada unidad de envío con geolocalización precisa. Sabes exactamente dónde está tu paquete en cada momento, con actualizaciones en tiempo real que garantizan transparencia total durante todo el recorrido de entrega.',
    color: '#FF9800',
  },
  {
    icon: Route,
    title: 'Optimización de Rutas',
    desc: 'Algoritmos inteligentes que calculan la ruta más eficiente para cada entrega, reduciendo tiempos de tránsito y consumo de combustible. Tu paquete llega más rápido mientras minimizamos el impacto ambiental de cada viaje.',
    color: '#2196F3',
  },
  {
    icon: BarChart3,
    title: 'Gestión de Flota Inteligente',
    desc: 'Panel de control completo para empresas que necesitan visibilidad sobre toda su operación de envíos. Reportes detallados, métricas de rendimiento, control de tiempos y análisis de eficiencia para tomar decisiones informadas.',
    color: '#00E676',
  },
  {
    icon: Radio,
    title: 'Comunicación Bidireccional',
    desc: 'Contacto directo entre el operador de logística y el mensajero en ruta. Instrucciones en tiempo real, actualizaciones de estatus y coordinación inmediata ante cualquier eventualidad que surja durante la entrega.',
    color: '#8B5CF6',
  },
  {
    icon: PackageCheck,
    title: 'Confirmación de Entrega',
    desc: 'Evidencia digital de cada entrega realizada con registro de fecha, hora, ubicación y firma del destinatario. Tienes la trazabilidad completa de cada envío para el control y la tranquilidad de tu empresa.',
    color: '#F44336',
  },
  {
    icon: Smartphone,
    title: 'App para Mensajeros',
    desc: 'Aplicación móvil dedicada para los mensajeros con navegación integrada, gestión de entregas pendientes, registro de novedades y comunicación directa con la central. Todo lo que el repartidor necesita en su bolsillo.',
    color: '#00BCD4',
  },
]

function TechnologySection() {
  return (
    <section id="tecnologia" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,152,0,0.3) 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
        }}
      />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-[#2196F3]/5 blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2196F3]/10 border border-[#2196F3]/20 mb-4">
              <Globe className="w-4 h-4 text-[#2196F3]" />
              <span className="text-sm text-[#2196F3]">Tecnología Wialon</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Tecnología para una{' '}
              <span className="bg-gradient-to-r from-[#2196F3] via-[#FF9800] to-[#2196F3] bg-clip-text text-transparent">
                Mejor Gestión
              </span>
            </h2>
            <p className="text-white/50 max-w-3xl mx-auto text-lg">
              Utilizamos la plataforma Wialon de última generación para la gestión de flotas de entrega,
              brindando visibilidad total, control y eficiencia en cada envío que realizamos.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {techFeatures.map((feature, i) => (
            <AnimatedSection key={feature.title} delay={i * 100}>
              <div className="group relative p-6 md:p-7 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-white/10 transition-all duration-500 h-full">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/[0.02] transition-all duration-500" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: `${feature.color}12` }}>
                    <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-white/45 leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Wialon reference */}
        <AnimatedSection delay={300}>
          <div className="mt-12 max-w-3xl mx-auto p-6 rounded-2xl bg-[#2196F3]/5 border border-[#2196F3]/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#2196F3]/10 flex items-center justify-center">
                <Globe className="w-5 h-5 text-[#2196F3]" />
              </div>
              <div>
                <h4 className="text-white font-semibold">Potenciado por Wialon</h4>
                <p className="text-xs text-white/40">Líder mundial en gestión de flotas</p>
              </div>
            </div>
            <p className="text-sm text-white/50 leading-relaxed">
              Nuestra operación de envíos está respaldada por la tecnología de Wialon, la plataforma líder
              a nivel mundial en delivery fleet management. Esto nos permite ofrecer un servicio de envíos
              con nivel de trazabilidad y control comparable al de las empresas logísticas más avanzadas del mundo.
            </p>
            <a
              href="https://wialon.com/es/delivery-fleet-management"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-[#2196F3] hover:text-[#64B5F6] transition-colors"
            >
              Conocer más sobre Wialon
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   5. SERVICE TYPES — Mensajería, Compras, Delivery
   ═══════════════════════════════════════════════════════════════════════════════ */
const serviceTypes = [
  {
    icon: Mail,
    title: 'Mensajería',
    desc: 'Envío de documentación, correspondencia, paquetes y encomiendas de todo tipo. Traslado seguro de documentos confidenciales, contratos, facturas y comunicaciones importantes entre oficinas, sucursales o clientes. Servicio express o programado según tu necesidad.',
    color: '#FF9800',
  },
  {
    icon: ShoppingBag,
    title: 'Compras',
    desc: '¿No tienes tiempo para ir de compras? Nosotros lo hacemos por ti. Compra de medicamentos, víveres, artículos de oficina, regalos o cualquier producto que necesites. Tu repartidor acude al establecimiento, realiza la compra y te la entrega en la puerta de tu casa u oficina.',
    color: '#2196F3',
  },
  {
    icon: Package,
    title: 'Delivery',
    desc: 'Servicio de entrega a domicilio para restaurantes, farmacias, tiendas y cualquier negocio que necesite llevar sus productos a los clientes. Punto de recogida a punto de entrega, con seguimiento en tiempo real y confirmación de entrega para la tranquilidad de ambas partes.',
    color: '#00E676',
  },
  {
    icon: FileText,
    title: 'Trámites y Diligencias',
    desc: 'Realizamos trámites bancarios, pagos de servicios, recolección de documentos, filings y cualquier diligencia que requiera desplazamiento. Un repartidor dedicado se encarga de tus gestiones mientras tú te enfocas en lo que realmente importa para tu negocio.',
    color: '#8B5CF6',
  },
  {
    icon: Box,
    title: 'Paquetería Empresarial',
    desc: 'Servicio de distribución masiva de paquetes para empresas. Múltiples entregas programadas en rutas optimizadas, con confirmación individual de cada entrega. Ideal para e-commerce, catálogos, promociones y envíos recurrentes a clientes o sucursales.',
    color: '#F44336',
  },
  {
    icon: Warehouse,
    title: 'Logística de Última Milla',
    desc: 'Gestión completa de la última milla para tu negocio. Desde la recepción de mercadería en tu almacén hasta la entrega final al cliente, coordinamos toda la cadena de entrega con la eficiencia y la tecnología que tu operación comercial requiere.',
    color: '#00BCD4',
  },
]

function ServiceTypesSection() {
  return (
    <section id="tipos" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-[#FF9800]/5 blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 mb-4">
              <Send className="w-4 h-4 text-[#00E676]" />
              <span className="text-sm text-[#00E676]">Tipos de Servicio</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Envíos, Mensajería,{' '}
              <span className="bg-gradient-to-r from-[#FF9800] to-[#00E676] bg-clip-text text-transparent">
                Compras y Delivery
              </span>
            </h2>
            <p className="text-white/50 max-w-3xl mx-auto text-lg">
              Sea lo que sea que necesites enviar, recibir o gestionar, tenemos el servicio adecuado para ti.
              Desde un documento urgente hasta la logística completa de tu negocio.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceTypes.map((service, i) => (
            <AnimatedSection key={service.title} delay={i * 100}>
              <div className="group relative p-6 md:p-7 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-white/10 transition-all duration-500 h-full">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/[0.02] transition-all duration-500" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: `${service.color}12` }}>
                    <service.icon className="w-6 h-6" style={{ color: service.color }} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
                  <p className="text-sm text-white/45 leading-relaxed">{service.desc}</p>
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
   6. HOW IT WORKS SECTION
   ═══════════════════════════════════════════════════════════════════════════════ */
const howItWorksSteps = [
  {
    step: 1,
    icon: Smartphone,
    title: 'Solicita tu Envío',
    desc: 'Llámanos, escríbenos por WhatsApp o usa nuestra app. Indica el punto de recogida, destino, tipo de paquete y vehículo preferido. En segundos verificamos disponibilidad y te confirmamos el servicio.',
    color: '#FF9800',
  },
  {
    step: 2,
    icon: MapPin,
    title: 'Asignación Inmediata',
    desc: 'Buscamos en el radio más cercano el mensajero disponible. Recibirás los datos del repartidor y el vehículo asignado, junto con el costo estimado, tiempo de recogida y entrega estimados.',
    color: '#2196F3',
  },
  {
    step: 3,
    icon: PackageCheck,
    title: 'Recogida y Traslado',
    desc: 'El mensajero recoge tu paquete en la ubicación indicada. Desde ese momento, puedes rastrear en tiempo real el avance de tu envío con nuestra tecnología GPS Wialon. Sin sorpresas, sin preocupaciones.',
    color: '#00E676',
  },
  {
    step: 4,
    icon: CheckCircle2,
    title: 'Entrega Confirmada',
    desc: 'Tu paquete llega a su destino. Recibes confirmación de entrega con hora, ubicación y evidencia digital. El remitente y destinatario tienen visibilidad completa del proceso de principio a fin.',
    color: '#8B5CF6',
  },
]

function HowItWorksSection() {
  return (
    <section id="como-funciona" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-[#FF9800]/5 blur-[180px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 mb-4">
              <Route className="w-4 h-4 text-[#8B5CF6]" />
              <span className="text-sm text-[#8B5CF6]">Así Funciona</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Envía en{' '}
              <span className="bg-gradient-to-r from-[#FF9800] to-[#8B5CF6] bg-clip-text text-transparent">
                4 Pasos
              </span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              Solicitar un envío nunca fue tan fácil. En minutos tienes tu paquete en camino con seguimiento en tiempo real.
            </p>
          </div>
        </AnimatedSection>

        {/* Steps */}
        <div className="relative">
          {/* Vertical connector line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#FF9800] via-[#2196F3] to-[#8B5CF6] md:-translate-x-px" />

          {howItWorksSteps.map((step, i) => (
            <AnimatedSection key={step.step} delay={i * 150}>
              <div className={`relative flex items-start mb-10 last:mb-0 ${
                i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}>
                {/* Dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full z-10"
                  style={{ backgroundColor: step.color, boxShadow: `0 0 20px ${step.color}50` }}
                />
                {/* Content */}
                <div className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
                  <div className="group p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-white/10 transition-all duration-300">
                    <div className={`flex items-center gap-3 mb-3 ${i % 2 === 0 ? 'md:justify-end' : ''}`}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${step.color}15` }}>
                        <step.icon className="w-5 h-5" style={{ color: step.color }} />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider" style={{ color: step.color }}>Paso {step.step}</span>
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-2">{step.title}</h3>
                    <p className="text-sm text-white/50 leading-relaxed">{step.desc}</p>
                  </div>
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
   7. CHAUFFEUR POR HORA — From PDF
   ═══════════════════════════════════════════════════════════════════════════════ */
function ChauffeurHourSection() {
  return (
    <section id="chofer-hora" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full bg-[#00E676]/5 blur-[120px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="relative p-8 md:p-12 rounded-3xl bg-white/[0.03] border border-[#00E676]/10 overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-[#00E676]/5 blur-[100px]" />

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 mb-6">
                  <Clock className="w-4 h-4 text-[#00E676]" />
                  <span className="text-sm text-[#00E676]">Servicio por Hora</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  ¿Necesitas un{' '}
                  <span className="bg-gradient-to-r from-[#00E676] to-[#0077BD] bg-clip-text text-transparent">
                    chófer
                  </span>{' '}
                  para diligencias?
                </h2>
                <p className="text-white/50 leading-relaxed mb-6">
                  Contrata un chófer por hora para múltiples tareas y diligencias. Ya sea que necesites
                  realizar varias entregas, recolectar documentos, hacer compras o cualquier gestión que
                  requiera desplazamiento, nuestro conductor se queda a tu disposición durante el tiempo
                  que lo necesites.
                </p>
                <div className="space-y-3">
                  {[
                    { icon: Timer, text: 'Contratación por hora, medio día o día completo' },
                    { icon: Navigation, text: 'Múltiples paradas y destinos sin costo extra' },
                    { icon: Shield, text: 'Conductor confiable con vehículo monitoreado' },
                    { icon: CreditCard, text: 'Tarifa plana por hora, sin sorpresas' },
                  ].map((item) => (
                    <div key={item.text} className="flex items-start gap-3">
                      <item.icon className="w-4 h-4 text-[#00E676] mt-0.5 shrink-0" />
                      <span className="text-sm text-white/55">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#00E676]/5 border border-[#00E676]/10">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-[#00E676]/10 flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-10 h-10 text-[#00E676]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Chófer por Hora</h3>
                  <p className="text-sm text-[#00E676]">Para múltiples tareas y diligencias</p>
                </div>
                <a
                  href="#contacto"
                  className="block w-full text-center px-8 py-4 rounded-xl text-lg font-bold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all duration-300 shadow-[0_0_30px_rgba(0,230,118,0.3)] hover:shadow-[0_0_50px_rgba(0,230,118,0.5)] hover:scale-105"
                >
                  Contratar Chófer
                  <ArrowRight className="w-5 h-5 inline ml-2" />
                </a>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   8. CTA SECTION
   ═══════════════════════════════════════════════════════════════════════════════ */
function CTASection() {
  return (
    <section id="contacto" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e17] via-[#1a0f05] to-[#0a0e17]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-[#FF9800]/8 blur-[180px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF9800]/10 border border-[#FF9800]/20 mb-8">
            <Send className="w-4 h-4 text-[#FF9800]" />
            <span className="text-sm text-[#FF9800]">Envía Ahora</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            ¿Listo para{' '}
            <span className="bg-gradient-to-r from-[#FF9800] to-[#F44336] bg-clip-text text-transparent">
              enviar
            </span>
            ?
          </h2>

          <p className="text-white/55 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Solicita tu envío ahora y ten la tranquilidad de saber exactamente dónde está tu paquete en
            cada momento. Con tecnología Wialon, choferes capacitados y la confianza de Ecotaxi Bolivia.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href="https://wa.me/59173662803"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full text-lg font-semibold text-black bg-[#FF9800] hover:bg-[#FFB74D] transition-all duration-300 shadow-[0_0_40px_rgba(255,152,0,0.3)] hover:shadow-[0_0_60px_rgba(255,152,0,0.5)] hover:scale-105"
            >
              Solicitar por WhatsApp
            </a>
            <a
              href="tel:+59133296885"
              className="px-8 py-4 rounded-full text-lg font-semibold text-[#FF9800] border border-[#FF9800]/30 hover:border-[#FF9800]/60 hover:bg-[#FF9800]/5 transition-all duration-300"
            >
              <Phone className="w-5 h-5 inline mr-2" />
              Llamar Ahora
            </a>
          </div>

          {/* Quick contact cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Phone, label: 'Call Center', value: '(+591) 3 3296885', color: '#0077BD' },
              { icon: MessageCircle, label: 'WhatsApp', value: '+591 73662803', color: '#25D366' },
              { icon: Smartphone, label: 'App Móvil', value: 'Descarga la APP', color: '#00E676' },
              { icon: Headphones, label: 'Línea Gratuita', value: '800-240-002', color: '#8B5CF6' },
            ].map((channel) => (
              <div
                key={channel.label}
                className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-white/10 transition-all duration-300 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center" style={{ background: `${channel.color}15` }}>
                  <channel.icon className="w-5 h-5" style={{ color: channel.color }} />
                </div>
                <p className="text-sm font-medium text-white/80">{channel.label}</p>
                <p className="text-xs text-white/40 mt-1">{channel.value}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   MAIN PAGE EXPORT
   ═══════════════════════════════════════════════════════════════════════════════ */
export default function EnviosPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0e17]">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <VehicleSection />
        <MotoServiceSection />
        <TechnologySection />
        <ServiceTypesSection />
        <HowItWorksSection />
        <ChauffeurHourSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
