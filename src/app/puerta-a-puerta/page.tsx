'use client'

import { useEffect, useState } from 'react'
import {
  MapPin, Car, Bus, Bike, Users, Shield, Clock, Gavel,
  CreditCard, CheckCircle2, ArrowRight, Phone, Star,
  ChevronRight, Zap, Leaf, Route, HandCoins, Split,
  Headphones, MessageCircle, Smartphone, Globe, Navigation,
  BadgeCheck, Wallet, TrendingDown, UserPlus, Package, Crown
} from 'lucide-react'
import { Navbar } from '@/components/ecotaxi/navbar'
import { Footer } from '@/components/ecotaxi/footer'

const vehicleTypes = [
  { icon: Car, name: 'Auto Clásico', passengers: 4, ac: false, price: '$', desc: 'Vehículo económico para traslados urbanos rápidos y eficientes. Ideal para viajes cortos en la ciudad.', color: '#FF9800' },
  { icon: Car, name: 'Sedan Confort', passengers: 4, ac: true, price: '$$', desc: 'Sedán con aire acondicionado para un viaje cómodo y fresco. Perfecto para reuniones y traslados ejecutivos.', color: '#0077BD' },
  { icon: Car, name: 'SUV', passengers: 4, ac: true, price: '$$', desc: 'SUV amplio con A/C y espacio de equipaje superior. Ideal para viajes con carga o familias.', color: '#00E676' },
  { icon: Crown, name: 'Sedan VIP', passengers: 4, ac: true, price: '$$$', desc: 'Servicio premium con conductor profesional, total discreción y comodidad ejecutiva.', color: '#8B5CF6' },
  { icon: Bus, name: 'MiniVan', passengers: 8, ac: true, price: '$$', desc: 'MiniVan para grupos pequeños con equipaje. Perfecto para traslados de equipos o familias numerosas.', color: '#E91E63' },
  { icon: Bike, name: 'Moto', passengers: 1, ac: false, price: '$', desc: 'Motocicleta para traslados ágiles y rápidos en la ciudad. Llega a tu destino evitando el tráfico.', color: '#00BCD4' },
]

const auctionSteps = [
  { step: 1, icon: Route, title: 'Indica tu Ruta', desc: 'Ingresa tu punto de partida y destino en la app o por cualquiera de nuestros canales de solicitud.' },
  { step: 2, icon: HandCoins, title: 'Lanza tu Oferta', desc: 'Propón el precio que estás dispuesto a pagar por el viaje. Tú decides cuánto pagar.' },
  { step: 3, icon: Gavel, title: 'Choferes Compiten', desc: 'Nuestros conductores reciben tu oferta y pueden aceptarla o contraofertar para llegar a un acuerdo.' },
  { step: 4, icon: CheckCircle2, title: 'Viaja al Mejor Precio', desc: 'Una vez aceptada la oferta, tu conductor te recoge. Paga lo acordado, sin sorpresas ni tarifas ocultas.' },
]

const sharedRideSteps = [
  { step: 1, icon: Route, title: 'Solicita tu Viaje', desc: 'Ingresa tu ruta y selecciona la opción de "Viaje Compartido" al momento de solicitar tu taxi.' },
  { step: 2, icon: UserPlus, title: 'Encontramos Compañero', desc: 'Nuestro sistema busca pasajeros con rutas similares y horarios compatibles al tuyo en tiempo real.' },
  { step: 3, icon: Users, title: 'Comparten el Recorrido', desc: 'El vehículo recoge a ambos pasajeros y realiza el recorrido compartido con paradas intermedias.' },
  { step: 4, icon: Split, title: 'Dividen el Costo', desc: 'El costo total del viaje se divide entre los pasajeros. ¡Ahorra hasta un 50% en cada viaje!' },
]

const cities = [
  { name: 'Santa Cruz de la Sierra', dept: 'Santa Cruz', isMain: true, desc: 'Cobertura total en el área metropolitana y zonas periurbanas de la capital económica de Bolivia.' },
  { name: 'La Paz', dept: 'La Paz', isMain: true, desc: 'Servicio en La Paz y El Alto, incluyendo la zona sur y principales avenidas de la sede de gobierno.' },
  { name: 'Cochabamba', dept: 'Cochabamba', isMain: true, desc: 'Cobertura en el área metropolitana de Cochabamba, Quillacollo y Sacaba.' },
  { name: 'Tarija', dept: 'Tarija', isMain: false, desc: 'Servicio en la ciudad de Tarija y alrededores, la joya del sur boliviano.' },
  { name: 'Sucre', dept: 'Chuquisaca', isMain: false, desc: 'Cobertura en la capital constitucional y sus zonas principales.' },
  { name: 'Oruro', dept: 'Oruro', isMain: false, desc: 'Servicio urbano en Oruro, puerta de entrada al salar y la región occidental.' },
  { name: 'Potosí', dept: 'Potosí', isMain: false, desc: 'Traslados en la ciudad imperial de Potosí y acceso al Salar de Uyuni.' },
  { name: 'Trinidad', dept: 'Beni', isMain: false, desc: 'Servicio en la capital beniana y la región amazónica.' },
  { name: 'Cobija', dept: 'Pando', isMain: false, desc: 'Cobertura en la capital pandina, en el norte amazónico de Bolivia.' },
]

const supportChannels = [
  { icon: Headphones, title: 'Central de Despacho Humana', desc: 'Operadores reales 24/7 que coordinan cada servicio, asignan unidades y resuelven cualquier situación en tiempo real.', color: '#0077BD' },
  { icon: Phone, title: 'Call Center', desc: 'Llámanos al (+591) 3 3296885 o a la línea gratuita 800-240-002 para solicitar tu taxi de forma inmediata.', color: '#00E676' },
  { icon: MessageCircle, title: 'WhatsApp', desc: 'Escríbenos al +591 73662803 y recibe atención personalizada. Envía tu ubicación y recibe tu taxi.', color: '#25D366' },
  { icon: Smartphone, title: 'App Móvil', desc: 'Descarga nuestra app para solicitar tu taxi con un toque, ver la ubicación del conductor y pagar desde tu celular.', color: '#8B5CF6' },
  { icon: Globe, title: 'Reserva Web', desc: 'Reserva tu taxi desde cualquier dispositivo con conexión a internet a través de nuestro formulario online.', color: '#FF9800' },
]

export default function PuertaAPuertaPage() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [activeVehicle, setActiveVehicle] = useState<string | null>(null)

  useEffect(() => {
    const sectionIds = ['vehicles', 'auction', 'shared', 'pricing', 'cities', 'support', 'howitworks', 'cta']
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set(prev).add(entry.target.id))
          }
        })
      },
      { threshold: 0.1 }
    )
    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0e17]">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-20">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17]/50 via-[#0a0e17]/80 to-[#0a0e17]" />
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[#0077BD]/15 blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#00E676]/10 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `linear-gradient(rgba(0,119,189,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,119,189,0.3) 1px, transparent 1px)`,
                backgroundSize: '60px 60px',
              }}
            />
          </div>

          {/* Animated taxi icon */}
          <div className="absolute bottom-32 right-[5%] md:right-[15%] opacity-20">
            <Car className="w-24 h-24 md:w-32 md:h-32 text-[#00E676]" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 mb-8 animate-fade-in backdrop-blur-sm">
              <MapPin className="w-4 h-4 text-[#00E676]" />
              <span className="text-sm text-[#00E676]">Servicio Urbano</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 animate-fade-in-up">
              Servicio{' '}
              <span className="bg-gradient-to-r from-[#00E676] via-[#0077BD] to-[#00E676] bg-clip-text text-transparent">
                Puerta a Puerta
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              El taxi urbano más económico, seguro y transparente de Bolivia. Subasta tu viaje, comparte el costo, 
              y llega a tu destino con la tranquilidad de una central humana respaldándote.
            </p>

            {/* Feature badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-10 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              {[
                { icon: Gavel, text: 'Subastas', color: '#FF9800' },
                { icon: Split, text: 'Viaje Compartido', color: '#00E676' },
                { icon: Shield, text: 'Sin tarifas ocultas', color: '#0077BD' },
                { icon: Headphones, text: 'Central humana 24/7', color: '#8B5CF6' },
              ].map((badge) => (
                <div key={badge.text} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/[0.08]">
                  <badge.icon className="w-4 h-4" style={{ color: badge.color }} />
                  <span className="text-sm text-white/70">{badge.text}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              {[
                { icon: TrendingDown, value: 'Hasta 50%', label: 'Ahorro compartiendo' },
                { icon: Car, value: '6+', label: 'Tipos de vehículo' },
                { icon: MapPin, value: '9', label: 'Ciudades' },
                { icon: Shield, value: '100%', label: 'Tarifas transparentes' },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                  <stat.icon className="w-5 h-5 text-[#00E676]" />
                  <div>
                    <span className="text-xl font-bold text-white">{stat.value}</span>
                    <span className="text-xs text-white/40 ml-1">{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vehicle Types */}
        <section id="vehicles" className="relative py-24 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0077BD]/10 border border-[#0077BD]/20 mb-4">
                <Car className="w-4 h-4 text-[#0077BD]" />
                <span className="text-sm text-[#0077BD]">Opciones para Cada Necesidad</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Elige tu{' '}
                <span className="bg-gradient-to-r from-[#0077BD] to-[#00E676] bg-clip-text text-transparent">
                  Vehículo
                </span>
              </h2>
              <p className="text-white/50 max-w-2xl mx-auto">
                Desde una moto ágil hasta una MiniVan para grupos, tenemos el vehículo perfecto para cada tipo de viaje urbano. Haz click para ver más detalles.
              </p>
            </div>
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-1000 ${
              visibleSections.has('vehicles') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              {vehicleTypes.map((vehicle, i) => {
                const isActive = activeVehicle === vehicle.name
                return (
                  <div
                    key={vehicle.name}
                    onClick={() => setActiveVehicle(isActive ? null : vehicle.name)}
                    className={`group relative p-6 rounded-2xl bg-white/[0.03] border backdrop-blur-sm cursor-pointer transition-all duration-500 overflow-hidden ${
                      isActive ? `border-[${vehicle.color}]/30 bg-white/[0.06]` : 'border-white/[0.06] hover:border-white/10'
                    }`}
                    style={{
                      transitionDelay: `${i * 60}ms`,
                      borderColor: isActive ? `${vehicle.color}50` : undefined,
                    }}
                  >
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ boxShadow: `0 0 30px ${vehicle.color}15` }}
                    />
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ background: `${vehicle.color}15` }}>
                          <vehicle.icon className="w-7 h-7" style={{ color: vehicle.color }} />
                        </div>
                        <div className="flex items-center gap-1 text-sm font-bold" style={{ color: vehicle.color }}>
                          {vehicle.price}
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">{vehicle.name}</h3>
                      <div className="flex items-center gap-3 text-xs text-white/30 mb-3">
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>{vehicle.passengers} pasajeros</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Zap className="w-3 h-3" />
                          <span>{vehicle.ac ? 'A/C' : 'Sin A/C'}</span>
                        </div>
                      </div>
                      {/* Expandable description */}
                      <div className={`transition-all duration-500 overflow-hidden ${
                        isActive ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                      }`}>
                        <p className="text-sm text-white/50 leading-relaxed pt-3 border-t border-white/[0.06]">
                          {vehicle.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Subastas Section */}
        <section id="auction" className="relative py-24 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#1a0f05] to-[#0a0e17]" />
          <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-[#FF9800]/5 blur-[120px]" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className={`transition-all duration-1000 ${
                visibleSections.has('auction') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              }`}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF9800]/10 border border-[#FF9800]/20 mb-6">
                  <Gavel className="w-4 h-4 text-[#FF9800]" />
                  <span className="text-sm text-[#FF9800]">Modalidad Subasta</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Subasta tu{' '}
                  <span className="bg-gradient-to-r from-[#FF9800] to-[#00E676] bg-clip-text text-transparent">
                    Viaje
                  </span>
                </h2>
                <p className="text-white/60 leading-relaxed mb-6">
                  ¿Quieres pagar menos? Con nuestra modalidad de subastas, tú propones el precio y los conductores compiten 
                  por tu viaje. Negocia tu presupuesto, lanza la oferta y encuentra un chofer que la acepte. Te garantizamos 
                  las tarifas más económicas del mercado con la seguridad de siempre.
                </p>
                <div className="space-y-4">
                  {[
                    { icon: HandCoins, text: 'Tú propones el precio que quieres pagar' },
                    { icon: Gavel, text: 'Los choferes compiten por tu viaje' },
                    { icon: Wallet, text: 'Ahorra hasta un 40% frente a tarifas tradicionales' },
                    { icon: Shield, text: 'Misma seguridad y calidad en cada servicio' },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-[#FF9800] shrink-0" />
                      <span className="text-white/60 text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Auction Steps */}
              <div className={`transition-all duration-1000 ${
                visibleSections.has('auction') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
              }`}>
                <div className="space-y-4">
                  {auctionSteps.map((step, i) => (
                    <div
                      key={step.step}
                      className="group flex gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-[#FF9800]/20 transition-all duration-300"
                      style={{ transitionDelay: `${i * 100}ms` }}
                    >
                      <div className="shrink-0">
                        <div className="w-12 h-12 rounded-xl bg-[#FF9800]/10 flex items-center justify-center">
                          <step.icon className="w-6 h-6 text-[#FF9800]" />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-[#FF9800]">PASO {step.step}</span>
                        </div>
                        <h3 className="text-white font-semibold mb-1">{step.title}</h3>
                        <p className="text-sm text-white/40 leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Shared Rides Section */}
        <section id="shared" className="relative py-24 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#071a10] to-[#0a0e17]" />
          <div className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full bg-[#00E676]/5 blur-[120px]" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 mb-4">
                <Users className="w-4 h-4 text-[#00E676]" />
                <span className="text-sm text-[#00E676]">Ahorra Compartiendo</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Viajes{' '}
                <span className="bg-gradient-to-r from-[#00E676] to-[#0077BD] bg-clip-text text-transparent">
                  Compartidos
                </span>
              </h2>
              <p className="text-white/50 max-w-3xl mx-auto text-lg">
                Encuentra un compañero de viaje que va por la misma ruta y divide el costo del servicio. 
                Ahorra hasta un 50% en cada viaje mientras conoces nuevas personas y reduces tu huella de carbono.
              </p>
            </div>

            {/* Shared Ride Visual */}
            <div className={`mb-16 transition-all duration-1000 ${
              visibleSections.has('shared') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className="relative max-w-4xl mx-auto p-8 md:p-10 rounded-3xl bg-white/[0.03] border border-[#00E676]/10">
                {/* Route visualization */}
                <div className="flex items-center justify-between mb-8">
                  {/* Passenger 1 */}
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-[#0077BD]/20 flex items-center justify-center mx-auto mb-2">
                      <Users className="w-6 h-6 text-[#0077BD]" />
                    </div>
                    <p className="text-xs text-white/40">Pasajero 1</p>
                    <p className="text-xs text-[#0077BD] font-medium">Punto A</p>
                  </div>

                  {/* Route line with car */}
                  <div className="flex-1 relative mx-4">
                    <div className="h-0.5 bg-gradient-to-r from-[#0077BD] via-[#00E676] to-[#FF9800]" />
                    {/* Car icon on route */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="w-10 h-10 rounded-full bg-[#00E676]/20 flex items-center justify-center">
                        <Car className="w-5 h-5 text-[#00E676]" />
                      </div>
                    </div>
                    {/* Stop point */}
                    <div className="absolute top-1/2 left-[65%] -translate-y-1/2">
                      <div className="w-3 h-3 rounded-full bg-[#FF9800] ring-2 ring-[#FF9800]/30" />
                    </div>
                  </div>

                  {/* Passenger 2 */}
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-[#FF9800]/20 flex items-center justify-center mx-auto mb-2">
                      <UserPlus className="w-6 h-6 text-[#FF9800]" />
                    </div>
                    <p className="text-xs text-white/40">Pasajero 2</p>
                    <p className="text-xs text-[#FF9800] font-medium">Punto B</p>
                  </div>
                </div>

                {/* Cost comparison */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
                    <p className="text-xs text-white/30 mb-1">Sin compartir</p>
                    <p className="text-2xl font-bold text-white/40 line-through">Bs 45</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#00E676]/5 border border-[#00E676]/20 text-center">
                    <p className="text-xs text-[#00E676] mb-1">Compartiendo</p>
                    <p className="text-2xl font-bold text-[#00E676]">Bs 22.5</p>
                    <p className="text-xs text-[#00E676]/60 mt-1">50% de ahorro</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Shared Ride Steps */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-1000 ${
              visibleSections.has('shared') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: '200ms' }}>
              {sharedRideSteps.map((step, i) => (
                <div key={step.step} className="group p-6 rounded-2xl bg-white/[0.03] border border-[#00E676]/10 text-center hover:border-[#00E676]/20 transition-all duration-500"
                  style={{ transitionDelay: `${i * 80}ms` }}>
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center bg-[#00E676]/10">
                      <step.icon className="w-7 h-7 text-[#00E676]" />
                    </div>
                    <span className="text-xs font-bold text-[#00E676]/60 block mb-2">PASO {step.step}</span>
                    <h3 className="text-white font-semibold mb-2">{step.title}</h3>
                    <p className="text-xs text-white/40 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Shared ride benefits */}
            <div className={`mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto transition-all duration-1000 ${
              visibleSections.has('shared') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: '400ms' }}>
              {[
                { icon: TrendingDown, text: 'Ahorra hasta 50% del costo del viaje', color: '#00E676' },
                { icon: Leaf, text: 'Reduce emisiones compartiendo vehículo', color: '#71B124' },
                { icon: Users, text: 'Conoce personas con rutas similares', color: '#0077BD' },
              ].map((benefit) => (
                <div key={benefit.text} className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <benefit.icon className="w-5 h-5 shrink-0" style={{ color: benefit.color }} />
                  <span className="text-sm text-white/60">{benefit.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Transparent Pricing */}
        <section id="pricing" className="relative py-24 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#0077BD]/10 blur-[150px]" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0077BD]/10 border border-[#0077BD]/20 mb-4">
                <CreditCard className="w-4 h-4 text-[#0077BD]" />
                <span className="text-sm text-[#0077BD]">Tarifas Transparentes</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Sin Tarifas{' '}
                <span className="bg-gradient-to-r from-[#0077BD] to-[#00E676] bg-clip-text text-transparent">
                  Ocultas
                </span>
              </h2>
              <p className="text-white/50 max-w-2xl mx-auto">
                Conoce el precio de tu viaje antes de abordar. Sin sorpresas, sin cobros extra, sin tarifas dinámicas que cambian sin aviso.
              </p>
            </div>

            <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-1000 ${
              visibleSections.has('pricing') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              {[
                {
                  icon: CheckCircle2,
                  title: 'Precio Conocido',
                  desc: 'Antes de abordar el taxi, conoces exactamente cuánto vas a pagar. Nuestro sistema calcula la tarifa basada en la distancia y el tipo de vehículo seleccionado, para que tomes la decisión informada.',
                  color: '#00E676',
                },
                {
                  icon: BadgeCheck,
                  title: 'Tarifa Fija',
                  desc: 'Olvídate de las tarifas dinámicas que se disparan en horas pico o cuando llueve. En Ecotaxi pagas una tarifa justa y estable, sin importar la hora o el clima. Lo que ves es lo que pagas.',
                  color: '#0077BD',
                },
                {
                  icon: CreditCard,
                  title: 'Múltiples Pagos',
                  desc: 'Paga como prefieras: efectivo, QR, tarjeta de crédito/débito, transferencia bancaria o desde tu cuenta prepago corporativa. Facilidad y conveniencia en cada viaje.',
                  color: '#FF9800',
                },
              ].map((card, i) => (
                <div key={card.title} className="group relative p-8 rounded-3xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-white/10 transition-all duration-500"
                  style={{ transitionDelay: `${i * 100}ms` }}>
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{ boxShadow: `0 0 40px ${card.color}10` }}
                  />
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center" style={{ background: `${card.color}10` }}>
                      <card.icon className="w-8 h-8" style={{ color: card.color }} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
                    <p className="text-sm text-white/50 leading-relaxed">{card.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cities Coverage */}
        <section id="cities" className="relative py-24 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0f1628] to-[#0a0e17]" />
          <div className="absolute top-1/3 left-0 w-[400px] h-[400px] rounded-full bg-[#0077BD]/10 blur-[100px]" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 mb-4">
                <MapPin className="w-4 h-4 text-[#00E676]" />
                <span className="text-sm text-[#00E676]">Cobertura Nacional</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ciudades de{' '}
                <span className="bg-gradient-to-r from-[#00E676] to-[#0077BD] bg-clip-text text-transparent">
                  Bolivia
                </span>
              </h2>
              <p className="text-white/50 max-w-2xl mx-auto">
                Servicio puerta a puerta en las principales ciudades de Bolivia. Estamos donde nos necesitas.
              </p>
            </div>

            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-1000 ${
              visibleSections.has('cities') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              {cities.map((city, i) => (
                <div
                  key={city.name}
                  className={`group relative p-6 rounded-2xl bg-white/[0.03] border backdrop-blur-sm transition-all duration-500 ${
                    city.isMain
                      ? 'border-[#00E676]/20 hover:border-[#00E676]/40'
                      : 'border-white/[0.06] hover:border-white/10'
                  }`}
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  {city.isMain && (
                    <div className="absolute top-4 right-4">
                      <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-[#00E676]/10 text-[#00E676] border border-[#00E676]/20">
                        CIUDAD PRINCIPAL
                      </span>
                    </div>
                  )}
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        city.isMain ? 'bg-[#00E676]/10' : 'bg-[#0077BD]/10'
                      }`}>
                        <MapPin className={`w-5 h-5 ${city.isMain ? 'text-[#00E676]' : 'text-[#0077BD]'}`} />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">{city.name}</h3>
                        <p className="text-xs text-white/30">{city.dept}</p>
                      </div>
                    </div>
                    <p className="text-sm text-white/40 leading-relaxed">{city.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Support & Dispatch Center */}
        <section id="support" className="relative py-24 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
          <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-[#0077BD]/5 blur-[120px]" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 mb-4">
                <Headphones className="w-4 h-4 text-[#8B5CF6]" />
                <span className="text-sm text-[#8B5CF6]">Soporte Humano</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Central de Despacho{' '}
                <span className="bg-gradient-to-r from-[#8B5CF6] to-[#00E676] bg-clip-text text-transparent">
                  Humana
                </span>
              </h2>
              <p className="text-white/50 max-w-2xl mx-auto">
                A diferencia de otras plataformas, en Ecotaxi tienes un equipo real de operadores y soporte 
                que coordina cada viaje y te ayuda en todo momento. Nunca estás solo.
              </p>
            </div>

            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 transition-all duration-1000 ${
              visibleSections.has('support') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              {supportChannels.map((channel, i) => (
                <div key={channel.title} className="group p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center hover:border-white/10 transition-all duration-500"
                  style={{ transitionDelay: `${i * 60}ms` }}>
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ boxShadow: `0 0 30px ${channel.color}10` }}
                  />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center" style={{ background: `${channel.color}10` }}>
                      <channel.icon className="w-6 h-6" style={{ color: channel.color }} />
                    </div>
                    <h3 className="text-white font-semibold text-sm mb-2">{channel.title}</h3>
                    <p className="text-xs text-white/40 leading-relaxed">{channel.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="howitworks" className="relative py-24 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#071a10] to-[#0a0e17]" />
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0077BD]/10 border border-[#0077BD]/20 mb-4">
                <Navigation className="w-4 h-4 text-[#0077BD]" />
                <span className="text-sm text-[#0077BD]">Así Funciona</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Pedir tu Taxi es{' '}
                <span className="bg-gradient-to-r from-[#0077BD] to-[#00E676] bg-clip-text text-transparent">
                  Fácil
                </span>
              </h2>
            </div>

            <div className={`relative transition-all duration-1000 ${
              visibleSections.has('howitworks') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              {/* Vertical line */}
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#0077BD] via-[#00E676] to-[#0077BD] md:-translate-x-px" />

              {[
                { icon: Smartphone, title: 'Solicita tu Viaje', desc: 'Elige tu canal preferido: App, WhatsApp, llamada, web o red social. Indica punto de partida y destino.', color: '#0077BD' },
                { icon: Car, title: 'Elige tu Vehículo', desc: 'Selecciona entre Auto Clásico, Confort, SUV, VIP, MiniVan o Moto según tu necesidad y presupuesto.', color: '#00E676' },
                { icon: Gavel, title: 'Subasta o Tarifa Fija', desc: 'Lanza tu oferta en la subasta para el mejor precio, o acepta la tarifa fija para ir directamente.', color: '#FF9800' },
                { icon: Users, title: 'Comparte y Ahorra', desc: 'Si activas el viaje compartido, encontrarás un compañero de ruta y dividen el costo del viaje.', color: '#8B5CF6' },
                { icon: CheckCircle2, title: 'Viaja Seguro', desc: 'Tu conductor te recoge, GPS monitoreado en tiempo real, con soporte humano disponible en cada momento.', color: '#00E676' },
              ].map((step, i) => (
                <div
                  key={step.title}
                  className={`relative flex items-start mb-8 last:mb-0 ${
                    i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
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
                        <h3 className="text-white font-semibold">{step.title}</h3>
                      </div>
                      <p className="text-sm text-white/50 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="cta" className="relative py-24 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#00E676]/10 blur-[120px]" />
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className={`transition-all duration-1000 ${
              visibleSections.has('cta') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                ¿Listo para{' '}
                <span className="bg-gradient-to-r from-[#00E676] to-[#0077BD] bg-clip-text text-transparent">
                  viajar
                </span>
                ?
              </h2>
              <p className="text-white/50 mb-10 max-w-2xl mx-auto text-lg">
                Pide tu Ecotaxi ahora y experimenta el servicio de taxi más moderno, económico y seguro de Bolivia.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="/#reservas"
                  className="px-8 py-4 rounded-full text-lg font-semibold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all duration-300 shadow-[0_0_30px_rgba(0,230,118,0.3)] hover:shadow-[0_0_50px_rgba(0,230,118,0.5)] hover:scale-105"
                >
                  Pedir Taxi Ahora
                </a>
                <a
                  href="https://wa.me/59173662803"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-8 py-4 rounded-full text-lg font-semibold text-white border border-white/20 hover:border-[#25D366]/50 hover:bg-white/5 transition-all duration-300"
                >
                  <MessageCircle className="w-5 h-5 text-[#25D366]" />
                  WhatsApp
                </a>
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-white/30 text-sm">
                <a href="tel:+59133296885" className="flex items-center gap-2 hover:text-white/60 transition-colors">
                  <Phone className="w-4 h-4" />
                  (+591) 3 3296885
                </a>
                <span className="text-white/10">|</span>
                <span>Línea gratuita: 800-240-002</span>
                <span className="text-white/10">|</span>
                <span>App disponible</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
