'use client'

import { useEffect, useRef, useState } from 'react'
import Script from 'next/script'
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
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Deterministic leaf positions to avoid hydration mismatch
  const leafPositions = [
    { left: 12, top: 8, delay: 0.3, duration: 10, size: 16 },
    { left: 85, top: 15, delay: 1.8, duration: 12, size: 22 },
    { left: 28, top: 72, delay: 2.5, duration: 9, size: 14 },
    { left: 65, top: 45, delay: 0.8, duration: 11, size: 20 },
    { left: 45, top: 20, delay: 3.2, duration: 13, size: 18 },
    { left: 92, top: 60, delay: 1.5, duration: 10, size: 15 },
    { left: 5, top: 50, delay: 4.0, duration: 14, size: 24 },
    { left: 75, top: 85, delay: 2.0, duration: 9, size: 13 },
    { left: 38, top: 35, delay: 0.5, duration: 11, size: 17 },
    { left: 55, top: 90, delay: 3.5, duration: 12, size: 19 },
    { left: 18, top: 65, delay: 1.2, duration: 10, size: 21 },
    { left: 82, top: 30, delay: 2.8, duration: 13, size: 15 },
  ]

  // CO2 depurated vs emitted ratio
  const co2Ratio = (623000 / 485000) * 100 // ~128.5%

  return (
    <section id="arbolimetro" ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background - special eco gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#071a10] to-[#0a0e17]" />

      {/* Animated tree particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {mounted && leafPositions.map((pos, i) => (
          <div
            key={i}
            className="absolute text-[#00E676]/10 animate-float"
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
              animationDelay: `${pos.delay}s`,
              animationDuration: `${pos.duration}s`,
              fontSize: `${pos.size}px`,
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
              Sostenibilidad
            </span>
          </h2>
          <p className="text-white/50 max-w-3xl mx-auto text-lg leading-relaxed">
            Primeros en Bolivia en contar con un Plan de Medición, Reducción y Neutralización de las emisiones
            de gases de Efecto Invernadero. Cada viaje con Ecotaxi es un paso hacia un planeta más limpio.
          </p>
        </div>

        {/* Main content: Tree image + Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16 items-center">
          {/* Tree Image - left side */}
          <div className={`lg:col-span-2 flex justify-center transition-all duration-1000 ${
            visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
          }`}>
            <div className="relative">
              {/* Glow behind image */}
              <div className="absolute inset-0 rounded-3xl bg-[#00E676]/15 blur-[60px] scale-90" />
              <img
                src="/eco-tree.webp"
                alt="Choferes de Ecotaxi plantando árboles - Compromiso ecológico"
                className="relative w-full max-w-sm rounded-3xl object-cover shadow-[0_0_40px_rgba(0,230,118,0.2)]"
              />
              {/* Purity label */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 backdrop-blur-sm">
                <span className="text-xs text-[#00E676] font-medium">Compromiso Ecológico Real</span>
              </div>
            </div>
          </div>

          {/* Stats Grid - right side */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`group relative p-6 md:p-8 rounded-3xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm text-center hover:border-white/10 transition-all duration-700 ${
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
                    className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                    style={{ background: `${stat.color}15` }}
                  >
                    <stat.icon className="w-7 h-7 text-white" style={{ color: stat.color, filter: 'brightness(1.3)' }} />
                  </div>

                  {/* Counter */}
                  <div style={{ color: stat.color }}>
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>

                  {/* Label */}
                  <p className="text-white/50 mt-3 text-xs md:text-sm font-medium">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
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

        {/* Tree-Nation Tree Counter Widget */}
        <div
          className={`mt-10 transition-all duration-1000 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: visible ? '1000ms' : '0ms' }}
        >
          <div className="max-w-2xl mx-auto p-6 md:p-8 rounded-3xl bg-white/[0.03] border border-[#00E676]/10 flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 text-[#00E676]">
              <TreePine className="w-5 h-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">Nuestro aporte a Tree-Nation</span>
            </div>
            <div
              data-widget-type="tree-counter"
              data-tree-nation-code="f35060a6da2c0369"
              data-lang="es"
              data-theme="dark"
            />
            <a
              href="https://tree-nation.com/profile/f35060a6da2c0369"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 text-xs text-[#00E676] hover:text-[#00ff88] transition-colors"
            >
              <TreePine className="w-3.5 h-3.5" />
              Ver nuestro perfil completo en Tree-Nation
            </a>
          </div>
        </div>
      </div>

      {/* Tree-Nation widget script */}
      <Script
        src="https://widgets.tree-nation.com/js/widgets/v3/widgets.min.js"
        strategy="afterInteractive"
      />
    </section>
  )
}
