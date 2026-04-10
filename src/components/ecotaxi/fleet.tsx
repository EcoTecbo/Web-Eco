'use client'

import { Car, Bus, Truck, Bike, Crown, Wind, Users } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

type VehicleCategory = 'standard' | 'vip' | 'premium' | 'especial'

interface Vehicle {
  name: string
  passengers: number
  ac: boolean
  category: VehicleCategory
  icon: React.ComponentType<{ className?: string }>
  luggage?: string
}

const vehicles: Vehicle[] = [
  { name: 'Compacto', passengers: 4, ac: true, category: 'standard', icon: Car, luggage: '1 grande, 1 pequeño' },
  { name: 'Sedan', passengers: 4, ac: true, category: 'standard', icon: Car, luggage: '1 grande, 1 pequeño' },
  { name: 'SUV', passengers: 4, ac: true, category: 'standard', icon: Car, luggage: '1 grande, 1 pequeño' },
  { name: 'MiniVan', passengers: 4, ac: true, category: 'standard', icon: Bus, luggage: '1 grande, 1 pequeño' },
  { name: 'Sedan VIP', passengers: 4, ac: true, category: 'vip', icon: Car, luggage: '1 grande, 1 pequeño' },
  { name: 'SUV VIP', passengers: 4, ac: true, category: 'vip', icon: Car, luggage: '1 grande, 1 pequeño' },
  { name: 'Van VIP', passengers: 4, ac: true, category: 'vip', icon: Bus, luggage: '1 grande, 1 pequeño' },
  { name: 'Limosina', passengers: 4, ac: true, category: 'premium', icon: Car, luggage: '1 grande, 1 pequeño' },
  { name: 'Envíos', passengers: 0, ac: false, category: 'especial', icon: Package, luggage: 'Paquetes' },
  { name: 'Moto', passengers: 1, ac: false, category: 'especial', icon: Bike, luggage: '1 pequeño' },
  { name: 'Torito', passengers: 2, ac: false, category: 'especial', icon: Bike, luggage: '1 grande, 1 pequeño' },
  { name: 'Vagoneta', passengers: 4, ac: false, category: 'standard', icon: Car, luggage: '4 grandes, 3 pequeños' },
  { name: 'Auto', passengers: 4, ac: false, category: 'standard', icon: Car, luggage: '3 grandes, 2 pequeños' },
  { name: 'Quantum', passengers: 2, ac: true, category: 'especial', icon: Car, luggage: 'Sin equipaje' },
  { name: 'Micro', passengers: 4, ac: true, category: 'standard', icon: Bus, luggage: '1 grande, 1 pequeño' },
  { name: 'MiniBus', passengers: 12, ac: true, category: 'premium', icon: Bus, luggage: 'Espacio amplio' },
]

// Need to import Package separately since it's used in the array
import { Package } from 'lucide-react'

const categoryStyles: Record<VehicleCategory, { badge: string; border: string; glow: string; label: string }> = {
  standard: {
    badge: 'bg-[#0077BD]/20 text-[#0077BD]',
    border: 'hover:border-[#0077BD]/40',
    glow: 'group-hover:from-[#0077BD]/5',
    label: 'Estándar',
  },
  vip: {
    badge: 'bg-amber-500/20 text-amber-400',
    border: 'hover:border-amber-500/40',
    glow: 'group-hover:from-amber-500/5',
    label: 'VIP',
  },
  premium: {
    badge: 'bg-purple-500/20 text-purple-400',
    border: 'hover:border-purple-500/40',
    glow: 'group-hover:from-purple-500/5',
    label: 'Premium',
  },
  especial: {
    badge: 'bg-[#00E676]/20 text-[#00E676]',
    border: 'hover:border-[#00E676]/40',
    glow: 'group-hover:from-[#00E676]/5',
    label: 'Especial',
  },
}

export function Fleet() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="flota" ref={sectionRef} className="relative py-24 md:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0f1628] to-[#0a0e17]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
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
            Vehículos modernos, equipados y mantenidos para tu seguridad y confort. Desde opciones estándar hasta la experiencia VIP.
          </p>
        </div>

        {/* Category Filter Legend */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {Object.entries(categoryStyles).map(([key, style]) => (
            <span key={key} className={`px-3 py-1 rounded-full text-xs font-medium ${style.badge}`}>
              {style.label}
            </span>
          ))}
        </div>

        {/* Fleet Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {vehicles.map((vehicle, i) => {
            const style = categoryStyles[vehicle.category]
            return (
              <div
                key={vehicle.name}
                className={`group relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm ${style.border} hover:bg-white/[0.05] transition-all duration-500 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: visible ? `${i * 40}ms` : '0ms' }}
              >
                {/* Glow */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${style.glow} to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500`} />

                <div className="relative z-10">
                  {/* Top Row */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.05] flex items-center justify-center">
                      <vehicle.icon className={`w-6 h-6 ${vehicle.category === 'vip' ? 'text-amber-400' : vehicle.category === 'premium' ? 'text-purple-400' : 'text-white/70'}`} />
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${style.badge}`}>
                      {style.label}
                    </span>
                  </div>

                  {/* Vehicle Name */}
                  <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-[#00E676] transition-colors duration-300">
                    {vehicle.name}
                  </h3>

                  {/* Specs */}
                  <div className="space-y-2">
                    {vehicle.passengers > 0 && (
                      <div className="flex items-center gap-2 text-sm text-white/40">
                        <Users className="w-4 h-4" />
                        <span>{vehicle.passengers} pasajeros</span>
                      </div>
                    )}
                    {vehicle.luggage && (
                      <div className="flex items-center gap-2 text-sm text-white/40">
                        <Package className="w-4 h-4" />
                        <span>{vehicle.luggage}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm text-white/40">
                      <Wind className="w-4 h-4" />
                      <span>{vehicle.ac ? 'A/C incluido' : 'Sin A/C'}</span>
                    </div>
                  </div>

                  {/* VIP Crown */}
                  {(vehicle.category === 'vip' || vehicle.category === 'premium') && (
                    <div className="mt-3 flex items-center gap-1">
                      <Crown className="w-4 h-4 text-amber-400" />
                      <span className="text-xs text-amber-400/70">Servicio Premium</span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
