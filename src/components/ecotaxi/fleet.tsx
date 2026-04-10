'use client'

import { Car, Bus, Bike, Crown, Wind, Users, Package, Leaf, Zap, ChevronRight, ArrowRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

type VehicleCategoryKey = 'clasico' | 'confort' | 'vip' | 'bus' | 'sostenible' | 'moto'

interface Vehicle {
  name: string
  passengers: number
  ac: boolean
  icon: React.ComponentType<{ className?: string }>
  luggage: string
  description: string
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
      { name: 'Auto', passengers: 4, ac: false, icon: Car, luggage: '3 grandes, 2 pequeños', description: 'Vehículo clásico ideal para traslados urbanos cómodos y económicos.' },
      { name: 'Vagoneta', passengers: 4, ac: false, icon: Car, luggage: '4 grandes, 3 pequeños', description: 'Mayor espacio de equipaje, perfecta para viajes con carga adicional.' },
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
      { name: 'Compacto', passengers: 4, ac: true, icon: Car, luggage: '1 grande, 1 pequeño', description: 'Compacto con aire acondicionado para viajes cómodos en la ciudad.' },
      { name: 'Sedan', passengers: 4, ac: true, icon: Car, luggage: '1 grande, 1 pequeño', description: 'Sedán confortable con A/C para un viaje placentero y seguro.' },
      { name: 'SUV', passengers: 4, ac: true, icon: Car, luggage: '1 grande, 1 pequeño', description: 'SUV con A/C, ideal para quienes buscan mayor altura y confort.' },
      { name: 'MiniVan', passengers: 4, ac: true, icon: Bus, luggage: '1 grande, 1 pequeño', description: 'MiniVan con A/C, perfecta para grupos pequeños con equipaje.' },
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
      { name: 'Sedan VIP', passengers: 4, ac: true, icon: Car, luggage: '1 grande, 1 pequeño', description: 'Sedán premium con conductor profesional, total discreción y comodidad.' },
      { name: 'SUV VIP', passengers: 4, ac: true, icon: Car, luggage: '1 grande, 1 pequeño', description: 'SUV de alta gama para ejecutivos que exigen lo mejor.' },
      { name: 'Van VIP', passengers: 4, ac: true, icon: Bus, luggage: '1 grande, 1 pequeño', description: 'Van VIP para transporte ejecutivo grupal con máximo confort.' },
      { name: 'Limosina', passengers: 4, ac: true, icon: Car, luggage: '1 grande, 1 pequeño', description: 'Experiencia de lujo con limosina para ocasiones especiales.' },
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
      { name: 'Flota', passengers: 4, ac: true, icon: Bus, luggage: '1 grande, 1 pequeño', description: 'Vehículo de flota con A/C para traslados regulares confiables.' },
      { name: 'Micro', passengers: 4, ac: true, icon: Bus, luggage: '1 grande, 1 pequeño', description: 'Microbús con A/C para grupos medianos y recorridos urbanos.' },
      { name: 'MiniBus', passengers: 12, ac: true, icon: Bus, luggage: 'Espacio amplio', description: 'MiniBus de 12 pasajeros con A/C, ideal para eventos y excursiones.' },
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
      { name: 'Quantum', passengers: 2, ac: true, icon: Zap, luggage: 'Sin equipaje', description: 'Vehículo eléctrico eco-friendly para traslados urbanos sin emisiones.' },
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
      { name: 'Moto Chata', passengers: 1, ac: false, icon: Bike, luggage: '1 pequeño', description: 'Motocicleta para envíos rápidos y traslados ágiles en la ciudad.' },
      { name: 'Torito', passengers: 2, ac: false, icon: Bike, luggage: '1 grande, 1 pequeño', description: 'Triciclo motorizado para traslados cortos con equipaje ligero.' },
      { name: 'Envío', passengers: 0, ac: false, icon: Package, luggage: 'Paquetes', description: 'Servicio de entrega de paquetes y documentos a cualquier punto.' },
      { name: 'Moto', passengers: 1, ac: false, icon: Bike, luggage: '1 pequeño', description: 'Motocicleta estándar para traslados rápidos y eficientes.' },
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
            <span className="text-sm text-[#00E676]">Flota Moderna</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Nuestra{' '}
            <span className="bg-gradient-to-r from-[#00E676] to-[#0077BD] bg-clip-text text-transparent">
              Flota
            </span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            Elige el servicio de tu preferencia. Vehículos modernos, equipados y mantenidos para tu seguridad y confort.
          </p>
        </div>

        {/* Category Tabs - fey.com/fxify.com style */}
        <div className={`flex flex-wrap justify-center gap-2 md:gap-3 mb-10 transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => { setActiveCategory(cat.key); setActiveVehicle(null) }}
              className={`group flex items-center gap-2 px-4 md:px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 border ${
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

                  <div className="relative z-10 p-6">
                    {/* Top Row */}
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-12 h-12 rounded-xl ${currentCategory.bgColor} flex items-center justify-center`}>
                        <vehicle.icon className={`w-6 h-6 ${currentCategory.color}`} />
                      </div>
                      <ChevronRight className={`w-5 h-5 text-white/20 transition-transform duration-300 ${
                        isSelected ? 'rotate-90 text-white/50' : ''
                      }`} />
                    </div>

                    {/* Vehicle Name */}
                    <h3 className={`text-lg font-semibold mb-1 transition-colors duration-300 ${
                      isSelected ? currentCategory.color : 'text-white group-hover:text-white'
                    }`}>
                      {vehicle.name}
                    </h3>

                    {/* Quick specs - always visible */}
                    <div className="flex items-center gap-3 text-xs text-white/30 mb-3">
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
