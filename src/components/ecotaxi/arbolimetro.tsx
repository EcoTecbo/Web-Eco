'use client'

import { useEffect, useRef, useState } from 'react'
import { TreePine, MapPin, Wind, Leaf } from 'lucide-react'
import { AnimatedCounter } from './animated-counter'

const stats = [
  {
    icon: MapPin,
    label: 'Kilómetros Recorridos',
    value: 2450000,
    suffix: '+',
    color: '#0077BD',
    glowColor: 'rgba(0,119,189,0.3)',
  },
  {
    icon: Wind,
    label: 'CO2 Emitida',
    value: 485000,
    suffix: ' kg',
    color: '#FF6B35',
    glowColor: 'rgba(255,107,53,0.3)',
  },
  {
    icon: TreePine,
    label: 'Árboles Plantados',
    value: 15847,
    suffix: '',
    color: '#00E676',
    glowColor: 'rgba(0,230,118,0.3)',
  },
  {
    icon: Leaf,
    label: 'CO2 Depurados',
    value: 623000,
    suffix: ' kg',
    color: '#71B124',
    glowColor: 'rgba(113,177,36,0.3)',
  },
]

export function Arbolimetro() {
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

  // CO2 depurated vs emitted ratio
  const co2Ratio = (623000 / 485000) * 100 // ~128.5%

  return (
    <section id="arbolimetro" ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background - special eco gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#071a10] to-[#0a0e17]" />

      {/* Animated tree particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-[#00E676]/10 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 7}s`,
              fontSize: `${12 + Math.random() * 16}px`,
            }}
          >
            🌿
          </div>
        ))}
      </div>

      {/* Glow orbs */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full bg-[#00E676]/10 blur-[120px]" />
      <div className="absolute bottom-1/3 right-0 w-[400px] h-[400px] rounded-full bg-[#71B124]/10 blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 mb-4">
            <TreePine className="w-4 h-4 text-[#00E676]" />
            <span className="text-sm text-[#00E676]">Compromiso Ecológico</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-[#00E676] to-[#71B124] bg-clip-text text-transparent">
              Arbolímetro
            </span>
          </h2>
          <p className="text-white/50 max-w-3xl mx-auto text-lg leading-relaxed">
            Primeros en Bolivia en contar con un Plan de Medición, Reducción y Neutralización de las emisiones
            de gases de Efecto Invernadero. Cada viaje con Ecotaxi es un paso hacia un planeta más limpio.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`group relative p-8 rounded-3xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm text-center hover:border-white/10 transition-all duration-700 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: visible ? `${i * 150}ms` : '0ms' }}
            >
              {/* Glow ring */}
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  boxShadow: `inset 0 0 60px ${stat.glowColor}, 0 0 30px ${stat.glowColor}`,
                }}
              />

              <div className="relative z-10">
                {/* Icon */}
                <div
                  className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center"
                  style={{ background: `${stat.color}15` }}
                >
                  <stat.icon className="w-8 h-8" style={{ color: stat.color }} />
                </div>

                {/* Counter */}
                <div style={{ color: stat.color }}>
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>

                {/* Label */}
                <p className="text-white/50 mt-3 text-sm font-medium">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CO2 Progress Bar */}
        <div
          className={`max-w-3xl mx-auto transition-all duration-1000 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: visible ? '600ms' : '0ms' }}
        >
          <div className="p-8 rounded-3xl bg-white/[0.03] border border-[#00E676]/10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">Balance CO2</h3>
                <p className="text-sm text-white/40 mt-1">Depuramos más CO2 del que emitimos</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-[#00E676]">{co2Ratio.toFixed(0)}%</span>
                <p className="text-xs text-white/40">del CO2 neutralizado</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="relative h-4 rounded-full bg-white/5 overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#71B124] to-[#00E676] transition-all duration-[3000ms] ease-out"
                style={{ width: visible ? `${Math.min(co2Ratio, 100)}%` : '0%' }}
              />
              {/* Glow effect */}
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#71B124] to-[#00E676] blur-sm opacity-50 transition-all duration-[3000ms] ease-out"
                style={{ width: visible ? `${Math.min(co2Ratio, 100)}%` : '0%' }}
              />
            </div>

            <div className="flex justify-between mt-3 text-xs text-white/30">
              <span>0 kg</span>
              <span>485,000 kg emitidos</span>
              <span>623,000 kg depurados</span>
            </div>
          </div>
        </div>

        {/* Eco Message */}
        <div
          className={`text-center mt-12 transition-all duration-1000 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: visible ? '800ms' : '0ms' }}
        >
          <p className="text-white/30 text-sm italic">
            &quot;Utiliza los servicios de EcoTaxi y tu empresa reducirá su Huella de Carbono&quot;
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E676]/5 border border-[#00E676]/10">
            <Leaf className="w-4 h-4 text-[#00E676]" />
            <span className="text-sm text-[#00E676]/80">Cuidando el ambiente y a nuestros clientes</span>
          </div>
        </div>
      </div>
    </section>
  )
}
