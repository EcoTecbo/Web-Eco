'use client'

import { Car, Bus, Bike, Crown, Wind, Users, Package, Leaf, Zap, ChevronRight, ArrowRight, Truck, Wrench, Tractor, HardHat, Caravan } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

type VehicleCategoryKey = 'clasico' | 'confort' | 'vip' | 'bus' | 'sostenible' | 'moto' | 'camioneta' | 'furgon' | 'grua' | 'construccion' | 'agro'

interface Vehicle {
  name: string
  passengers: number
  ac: boolean
  icon: React.ComponentType<{ className?: string }>
  luggage: string
  description: string
  image: string
}

interface CategoryDef {
  key: VehicleCategoryKey
  label: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  bgColor: string
  borderColor: string
  vehicles: Vehicle[]
}

const categories: CategoryDef[] = [
  {
    key: 'clasico',
    label: 'Clásico',
    icon: Car,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-400/10',
    borderColor: 'border-yellow-400/30 hover:border-yellow-400/60',
    vehicles: [
      { name: 'Auto', passengers: 4, ac: false, icon: Car, luggage: '3 grandes, 2 pequeños', description: 'Vehículo clásico ideal para traslados urbanos cómodos y económicos.', image: '/fleet-clasico-auto.png' },
      { name: 'Vagoneta', passengers: 4, ac: false, icon: Car, luggage: '4 grandes, 3 pequeños', description: 'Mayor espacio de equipaje, perfecta para viajes con carga adicional.', image: '/fleet-clasico-vagoneta.png' },
    ],
  },
  {
    key: 'confort',
    label: 'Confort',
    icon: Car,
    color: 'text-[#0077BD]',
    bgColor: 'bg-[#0077BD]/10',
    borderColor: 'border-[#0077BD]/30 hover:border-[#0077BD]/60',
    vehicles: [
      { name: 'Compacto', passengers: 4, ac: true, icon: Car, luggage: '1 grande, 1 pequeño', description: 'Compacto con aire acondicionado para viajes cómodos en la ciudad.', image: '/fleet-confort-compacto.png' },
      { name: 'Sedan', passengers: 4, ac: true, icon: Car, luggage: '1 grande, 1 pequeño', description: 'Sedán confortable con A/C para un viaje placentero y seguro.', image: '/fleet-confort-sedan.png' },
      { name: 'SUV', passengers: 4, ac: true, icon: Car, luggage: '1 grande, 1 pequeño', description: 'SUV con A/C, ideal para quienes buscan mayor altura y confort.', image: '/fleet-confort-suv.png' },
      { name: 'MiniVan', passengers: 4, ac: true, icon: Bus, luggage: '1 grande, 1 pequeño', description: 'MiniVan con A/C, perfecta para grupos pequeños con equipaje.', image: '/fleet-confort-minivan.png' },
    ],
  },
  {
    key: 'vip',
    label: 'VIP',
    icon: Crown,
    color: 'text-amber-400',
    bgColor: 'bg-amber-400/10',
    borderColor: 'border-amber-400/30 hover:border-amber-400/60',
    vehicles: [
      { name: 'Sedan VIP', passengers: 4, ac: true, icon: Car, luggage: '1 grande, 1 pequeño', description: 'Sedán premium con conductor profesional, total discreción y comodidad.', image: '/fleet-vip-sedan.png' },
      { name: 'SUV VIP', passengers: 4, ac: true, icon: Car, luggage: '1 grande, 1 pequeño', description: 'SUV de alta gama para ejecutivos que exigen lo mejor.', image: '/fleet-vip-suv.png' },
      { name: 'Van VIP', passengers: 4, ac: true, icon: Bus, luggage: '1 grande, 1 pequeño', description: 'Van VIP para transporte ejecutivo grupal con máximo confort.', image: '/fleet-vip-van.png' },
      { name: 'Limosina', passengers: 4, ac: true, icon: Car, luggage: '1 grande, 1 pequeño', description: 'Experiencia de lujo con limosina para ocasiones especiales.', image: '/fleet-vip-limosina.png' },
    ],
  },
  {
    key: 'bus',
    label: 'Bus',
    icon: Bus,
    color: 'text-sky-400',
    bgColor: 'bg-sky-400/10',
    borderColor: 'border-sky-400/30 hover:border-sky-400/60',
    vehicles: [
      { name: 'MiniBus', passengers: 12, ac: true, icon: Bus, luggage: 'Espacio amplio', description: 'MiniBus de 12 pasajeros con A/C, ideal para eventos y excursiones.', image: '/fleet-bus-minibus.png' },
      { name: 'Micro', passengers: 20, ac: true, icon: Bus, luggage: '1 grande, 1 pequeño', description: 'Microbús con A/C para grupos medianos y recorridos urbanos.', image: '/fleet-bus-micro.png' },
      { name: 'Flota', passengers: 30, ac: true, icon: Bus, luggage: '1 grande, 1 pequeño', description: 'Vehículo de flota con A/C para traslados regulares confiables.', image: '/fleet-bus-flota.png' },
    ],
  },
  {
    key: 'sostenible',
    label: 'Sostenible',
    icon: Leaf,
    color: 'text-[#00E676]',
    bgColor: 'bg-[#00E676]/10',
    borderColor: 'border-[#00E676]/30 hover:border-[#00E676]/60',
    vehicles: [
      { name: 'Quantum', passengers: 2, ac: true, icon: Zap, luggage: 'Sin equipaje', description: 'Vehículo eléctrico eco-friendly para traslados urbanos sin emisiones.', image: '/fleet-confort-compacto.png' },
    ],
  },
  {
    key: 'moto',
    label: 'Moto',
    icon: Bike,
    color: 'text-gray-400',
    bgColor: 'bg-gray-400/10',
    borderColor: 'border-gray-400/30 hover:border-gray-400/60',
    vehicles: [
      { name: 'Moto Taxi', passengers: 1, ac: false, icon: Bike, luggage: '1 pequeño', description: 'Motocicleta taxi para traslados rápidos y ágiles en la ciudad.', image: '/fleet-moto-taxi.png' },
      { name: 'Envío', passengers: 0, ac: false, icon: Package, luggage: 'Paquetes', description: 'Servicio de entrega de paquetes y documentos a cualquier punto.', image: '/fleet-moto-envios.png' },
      { name: 'Torito', passengers: 2, ac: false, icon: Bike, luggage: '1 grande, 1 pequeño', description: 'Triciclo motorizado para traslados cortos con equipaje ligero.', image: '/fleet-moto-torito.png' },
      { name: 'Chata', passengers: 1, ac: false, icon: Bike, luggage: '1 pequeño', description: 'Motocicleta para envíos rápidos y traslados ágiles en la ciudad.', image: '/fleet-moto-chata.png' },
    ],
  },
  {
    key: 'camioneta',
    label: 'Camioneta',
    icon: Caravan,
    color: 'text-orange-400',
    bgColor: 'bg-orange-400/10',
    borderColor: 'border-orange-400/30 hover:border-orange-400/60',
    vehicles: [
      { name: 'Pickup', passengers: 4, ac: true, icon: Truck, luggage: 'Caja abierta grande', description: 'Pickup versátil para transporte de carga y pasajeros con caja abierta.', image: '/fleet-camioneta-pickup.png' },
      { name: 'Camioneta Pequeña', passengers: 4, ac: true, icon: Caravan, luggage: '2 grandes, 2 pequeños', description: 'Camioneta compacta ideal para terrenos urbanos y suburbanos.', image: '/fleet-camioneta-pequena.png' },
      { name: 'Camioneta Mediana', passengers: 5, ac: true, icon: Caravan, luggage: '3 grandes, 2 pequeños', description: 'Camioneta mediana con mayor capacidad para pasajeros y equipaje.', image: '/fleet-camioneta-mediana.png' },
      { name: 'Camioneta Larga', passengers: 6, ac: true, icon: Caravan, luggage: '4 grandes, 3 pequeños', description: 'Camioneta larga ideal para grupos grandes y viajes largos.', image: '/fleet-camioneta-larga.png' },
      { name: 'Camioneta Grande', passengers: 8, ac: true, icon: Caravan, luggage: 'Espacio amplio', description: 'Camioneta de gran tamaño para traslado de grupos numerosos.', image: '/fleet-camioneta-grande.jpg' },
    ],
  },
  {
    key: 'furgon',
    label: 'Furgón',
    icon: Truck,
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-400/10',
    borderColor: 'border-indigo-400/30 hover:border-indigo-400/60',
    vehicles: [
      { name: 'Furgón Pequeño', passengers: 2, ac: true, icon: Truck, luggage: 'Carga pequeña', description: 'Furgón compacto para entregas y traslados de carga ligera en la ciudad.', image: '/fleet-furgon-pequeno.png' },
      { name: 'Furgón Mediano', passengers: 2, ac: true, icon: Truck, luggage: 'Carga mediana', description: 'Furgón mediano ideal para transporte de mercancías de tamaño moderado.', image: '/fleet-furgon-mediano.png' },
      { name: 'Furgón Grande', passengers: 3, ac: true, icon: Truck, luggage: 'Carga grande', description: 'Furgón grande para traslado de mercancías voluminosas con A/C.', image: '/fleet-furgon-grande.png' },
      { name: 'Furgón Largo', passengers: 3, ac: true, icon: Truck, luggage: 'Carga extra grande', description: 'Furgón largo de máxima capacidad para grandes volúmenes de carga.', image: '/fleet-furgon-largo.png' },
    ],
  },
  {
    key: 'grua',
    label: 'Grúa',
    icon: Truck,
    color: 'text-red-400',
    bgColor: 'bg-red-400/10',
    borderColor: 'border-red-400/30 hover:border-red-400/60',
    vehicles: [
      { name: 'Moto Grúa', passengers: 1, ac: false, icon: Bike, luggage: 'Moto', description: 'Grúa especializada para el traslado seguro de motocicletas.', image: '/fleet-grua-moto.jpg' },
      { name: 'Grúa Arrastre', passengers: 2, ac: false, icon: Truck, luggage: 'Vehículo liviano', description: 'Grúa de arrastre para vehículos livianos y medianos en situaciones de emergencia.', image: '/fleet-grua-arrastre.jpg' },
      { name: 'Grúa Remolque', passengers: 2, ac: false, icon: Truck, luggage: 'Vehículo pesado', description: 'Grúa de remolque para vehículos pesados y traslados de larga distancia.', image: '/fleet-grua-remolque.jpg' },
      { name: 'Grúa Rampla', passengers: 2, ac: false, icon: Truck, luggage: 'Vehículos varios', description: 'Grúa con rampla para carga y descarga de vehículos de todo tipo.', image: '/fleet-grua-rampla.png' },
      { name: 'Grúa Pluma', passengers: 2, ac: false, icon: Truck, luggage: 'Carga pesada', description: 'Grúa pluma para izaje y maniobras de carga pesada en obra.', image: '/fleet-grua-pluma.png' },
      { name: 'Grúa Telescópica', passengers: 2, ac: false, icon: Truck, luggage: 'Carga industrial', description: 'Grúa telescópica de gran alcance para operaciones industriales y de construcción.', image: '/fleet-grua-telescopica.jpg' },
    ],
  },
  {
    key: 'construccion',
    label: 'Construcción',
    icon: HardHat,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30 hover:border-amber-500/60',
    vehicles: [
      { name: 'Volqueta', passengers: 2, ac: false, icon: Truck, luggage: 'Material de construcción', description: 'Volqueta para transporte de áridos, escombros y materiales de construcción.', image: '/fleet-construccion-volqueta.png' },
      { name: 'Bobcat', passengers: 1, ac: false, icon: HardHat, luggage: 'Carga compacta', description: 'Minicargador Bobcat para movimientos de tierra y cargas compactas.', image: '/fleet-construccion-bobcat.png' },
      { name: 'Gallinita', passengers: 1, ac: false, icon: HardHat, luggage: 'Concreto', description: 'Mezcladora de concreto (gallinita) para obras de construcción.', image: '/fleet-construccion-gallinita.png' },
      { name: 'Motoniveladora', passengers: 1, ac: false, icon: HardHat, luggage: 'Nivelación', description: 'Motoniveladora para trabajos de nivelación y mantenimiento de caminos.', image: '/fleet-construccion-motoniveladora.png' },
      { name: 'Retroexcavadora', passengers: 1, ac: false, icon: HardHat, luggage: 'Excavación', description: 'Retroexcavadora para excavación, zanjas y movimientos de tierra.', image: '/fleet-construccion-retroexcavadora.png' },
      { name: 'Excavadora', passengers: 1, ac: true, icon: HardHat, luggage: 'Gran excavación', description: 'Excavadora de gran tamaño para movimientos masivos de tierra.', image: '/fleet-construccion-excavadora.png' },
      { name: 'Aplanadora', passengers: 1, ac: false, icon: HardHat, luggage: 'Compactación', description: 'Aplanadora para compactación de superficies en obras viales.', image: '/fleet-construccion-aplanadora.png' },
    ],
  },
  {
    key: 'agro',
    label: 'Agro',
    icon: Tractor,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30 hover:border-green-500/60',
    vehicles: [
      { name: 'Tractor', passengers: 1, ac: false, icon: Tractor, luggage: 'Implementos agrícolas', description: 'Tractor para laboreo, siembra y tareas agrícolas en el campo.', image: '/fleet-agro-tractor.png' },
      { name: 'Cosechadora', passengers: 1, ac: true, icon: Tractor, luggage: 'Cosecha', description: 'Cosechadora para recolección eficiente de cultivos a gran escala.', image: '/fleet-agro-cosechadora.png' },
    ],
  },
]

export function Fleet() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [activeCategory, setActiveCategory] = useState<VehicleCategoryKey>('confort')
  const [activeVehicle, setActiveVehicle] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const currentCategory = categories.find(c => c.key === activeCategory)!

  return (
    <section id="flota" ref={sectionRef} className="relative py-24 md:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0f1628] to-[#0a0e17]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 mb-4">
            <Car className="w-4 h-4 text-[#00E676]" />
            <span className="text-sm text-[#00E676]">Flota Completa</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Nuestra{' '}
            <span className="bg-gradient-to-r from-[#00E676] to-[#0077BD] bg-clip-text text-transparent">
              Flota
            </span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            Elige el servicio de tu preferencia. Vehículos modernos, equipados y mantenidos para tu seguridad y confort. Desde autos clásicos hasta maquinaria especializada.
          </p>
        </div>

        {/* Category Tabs - Scrollable on mobile */}
        <div className={`flex flex-wrap justify-center gap-2 md:gap-3 mb-10 transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => { setActiveCategory(cat.key); setActiveVehicle(null) }}
              className={`group flex items-center gap-2 px-3 md:px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 border ${
                activeCategory === cat.key
                  ? `${cat.bgColor} ${cat.color} ${cat.borderColor} shadow-lg`
                  : 'bg-white/[0.03] text-white/50 border-white/[0.06] hover:bg-white/[0.06] hover:text-white/80'
              }`}
            >
              <cat.icon className={`w-4 h-4 ${activeCategory === cat.key ? cat.color : 'text-white/40'}`} />
              <span>{cat.label}</span>
              <span className="text-xs opacity-50">({cat.vehicles.length})</span>
            </button>
          ))}
        </div>

        {/* Vehicles for active category */}
        <div className={`transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {/* Category description */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2">
              {(() => { const Ic = currentCategory.icon; return <Ic className={`w-5 h-5 ${currentCategory.color}`} /> })()}
              <span className={`text-lg font-semibold ${currentCategory.color}`}>
                {currentCategory.label}
              </span>
              <span className="text-white/30 text-sm">— {currentCategory.vehicles.length} vehículos disponibles</span>
            </div>
          </div>

          {/* Vehicle Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {currentCategory.vehicles.map((vehicle, i) => {
              const isSelected = activeVehicle === vehicle.name
              return (
                <div
                  key={vehicle.name}
                  onClick={() => setActiveVehicle(isSelected ? null : vehicle.name)}
                  className={`group relative rounded-2xl bg-white/[0.03] border backdrop-blur-sm transition-all duration-500 cursor-pointer overflow-hidden ${
                    isSelected
                      ? `${currentCategory.borderColor} bg-white/[0.06]`
                      : `border-white/[0.06] ${currentCategory.borderColor} hover:bg-white/[0.05]`
                  }`}
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  {/* Glow */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent transition-all duration-500 ${
                    isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`} />

                  <div className="relative z-10 p-5">
                    {/* Vehicle Image */}
                    <div className="w-full h-28 flex items-center justify-center mb-4 rounded-xl bg-white/[0.02] overflow-hidden">
                      <Image
                        src={vehicle.image}
                        alt={vehicle.name}
                        width={160}
                        height={100}
                        className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    {/* Vehicle Name */}
                    <h3 className={`text-lg font-semibold mb-1 transition-colors duration-300 ${
                      isSelected ? currentCategory.color : 'text-white group-hover:text-white'
                    }`}>
                      {vehicle.name}
                    </h3>

                    {/* Quick specs - always visible */}
                    <div className="flex items-center gap-3 text-xs text-white/30 mb-2">
                      {vehicle.passengers > 0 && (
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>{vehicle.passengers}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Wind className="w-3 h-3" />
                        <span>{vehicle.ac ? 'A/C' : 'Sin A/C'}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Package className="w-3 h-3" />
                        <span>Equipaje</span>
                      </div>
                    </div>

                    {/* Expanded Details - shown on click */}
                    <div className={`transition-all duration-500 overflow-hidden ${
                      isSelected ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="pt-3 border-t border-white/[0.06] space-y-3">
                        <p className="text-sm text-white/50 leading-relaxed">
                          {vehicle.description}
                        </p>
                        <div className="space-y-2">
                          {vehicle.passengers > 0 && (
                            <div className="flex items-center gap-2 text-sm text-white/40">
                              <Users className="w-4 h-4" />
                              <span>{vehicle.passengers} pasajeros</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-sm text-white/40">
                            <Package className="w-4 h-4" />
                            <span>{vehicle.luggage}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-white/40">
                            <Wind className="w-4 h-4" />
                            <span>{vehicle.ac ? 'Aire acondicionado incluido' : 'Sin aire acondicionado'}</span>
                          </div>
                        </div>
                        {/* Reservar Button */}
                        <a
                          href="#reservas"
                          className={`inline-flex items-center gap-2 mt-2 px-5 py-2.5 rounded-full text-sm font-semibold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all duration-300 shadow-[0_0_15px_rgba(0,230,118,0.2)] hover:shadow-[0_0_25px_rgba(0,230,118,0.4)]`}
                        >
                          Reservar Ahora
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
