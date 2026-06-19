'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Clock, Car, Shield, CreditCard, CheckCircle2, ArrowRight,
  Phone, MapPin, Smartphone, Globe, MessageCircle, Headphones,
  TrendingDown, Fuel, User, Star, Award, Zap, ChevronRight,
  BadgeCheck, Wallet, Navigation, Building2, Eye, Users,
  Timer, MapPinned, Route, Calculator, CarFront, Crown, Bus,
  Bike, Package, CircleDollarSign, Sparkles, KeyRound,
  FileText, Ban, Percent, Gauge, Map as MapIcon, Landmark,
  Mountain, Trees, CircleDot, Info
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
   1. HERO SECTION
   ═══════════════════════════════════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/por-hora-hero.webp')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17]/85 via-[#0a0e17]/75 to-[#0a0e17]/95" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0e17]/80 via-transparent to-[#0a0e17]/60" />

      {/* Glow orbs (kept for depth, very subtle) */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[#0077BD]/10 blur-[150px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#00E676]/8 blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Animated clock icon */}
      <div className="absolute top-32 right-[8%] md:right-[18%] opacity-10">
        <Clock className="w-28 h-28 md:w-40 md:h-40 text-[#00E676]" />
      </div>
      <div className="absolute bottom-28 left-[5%] md:left-[12%] opacity-8">
        <Car className="w-20 h-20 md:w-28 md:h-28 text-[#0077BD]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 pb-16">
        {/* Badge */}
        <AnimatedSection>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E676]/10 border border-[#00E676]/30 mb-8 backdrop-blur-md">
            <Clock className="w-4 h-4 text-[#00E676]" />
            <span className="text-sm text-[#00E676] font-medium">🕒 Servicio por Hora</span>
          </div>
        </AnimatedSection>

        {/* Title */}
        <AnimatedSection delay={100}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 drop-shadow-lg">
            Muévete a tu Ritmo:{' '}
            <span className="bg-gradient-to-r from-[#00E676] via-[#0077BD] to-[#00E676] bg-clip-text text-transparent">
              Vehículo por Hora a tu Disposición
            </span>
          </h1>
        </AnimatedSection>

        {/* Subtitle */}
        <AnimatedSection delay={200}>
          <p className="text-lg md:text-xl text-white/85 max-w-3xl mx-auto mb-10 leading-relaxed drop-shadow">
            Olvídate del papeleo y las tarifas dinámicas. Disfruta de un conductor privado con combustible incluido 
            por el tiempo que decidas. Sin tarjetas de crédito ni contratos complicados.
          </p>
        </AnimatedSection>

        {/* CTA buttons */}
        <AnimatedSection delay={300}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <a
              href="#contacto"
              className="px-8 py-4 rounded-full text-lg font-semibold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all duration-300 shadow-[0_0_30px_rgba(0,230,118,0.4)] hover:shadow-[0_0_50px_rgba(0,230,118,0.6)] hover:scale-105"
            >
              Solicitar Auto Ahora
            </a>
            <a
              href="#como-funciona"
              className="px-8 py-4 rounded-full text-lg font-semibold text-white border border-white/30 hover:border-[#00E676]/50 hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
            >
              Cómo Funciona
            </a>
          </div>
        </AnimatedSection>

        {/* Stats bar */}
        <AnimatedSection delay={400}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { value: '80%', label: 'Ahorro máximo', icon: TrendingDown },
              { value: '0', label: 'Tarjeta de crédito', icon: CreditCard },
              { value: '100%', label: 'Todo incluido', icon: Package },
              { value: '1 clic', label: 'Para reservar', icon: Zap },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-[#00E676]/20 transition-all duration-300"
              >
                <stat.icon className="w-5 h-5 text-[#00E676] mx-auto mb-2" />
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
   2. WHAT IS IT SECTION
   ═══════════════════════════════════════════════════════════════════════════════ */
function WhatIsItSection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(0,119,189,0.4) 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <AnimatedSection>
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0077BD]/10 border border-[#0077BD]/20 mb-6">
                <Timer className="w-4 h-4 text-[#0077BD]" />
                <span className="text-sm text-[#0077BD]">Alquiler por Hora</span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Un vehículo a tu{' '}
                <span className="bg-gradient-to-r from-[#0077BD] to-[#00E676] bg-clip-text text-transparent">
                  entera disposición
                </span>
              </h2>

              <p className="text-white/55 text-lg leading-relaxed mb-6">
                El alquiler por hora significa que el vehículo estará a tu entera disposición durante 
                el tiempo que lo requieras. Sin preocupaciones de si hay taxi en la zona, sin perder 
                tiempo buscando transporte cuando necesitas moverte con prisa de un lugar a otro. 
                Es como tener tu propio chofer personal, pero sin los costos fijos de mantener un vehículo.
              </p>

              <p className="text-white/55 text-lg leading-relaxed mb-8">
                Somos la <strong className="text-[#00E676]">única compañía en Bolivia</strong> que te 
                brinda este tipo de servicio. Funciona como un renta car con todo incluido: vehículo, 
                chofer, combustible y un conductor que conoce la ciudad y será como tu guía. Lo mejor 
                de todo: <strong className="text-[#00E676]">no necesitas tarjeta de crédito</strong> para 
                reservar, no dejas ningún tipo de garantía, y no hay montón de requisitos ni contratos 
                complicados que te mantienen como prisionero.
              </p>

              <div className="space-y-3">
                {[
                  { icon: Car, text: 'Vehículo a tu disposición completa', color: '#0077BD' },
                  { icon: User, text: 'Chofer que conoce la ciudad como guía', color: '#00E676' },
                  { icon: Fuel, text: 'Combustible incluido sin costo extra', color: '#FF9800' },
                  { icon: Ban, text: 'Sin tarjeta de crédito ni garantías', color: '#E91E63' },
                  { icon: FileText, text: 'Sin contratos complicados ni cláusulas', color: '#8B5CF6' },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${item.color}15` }}>
                      <item.icon className="w-4 h-4" style={{ color: item.color }} />
                    </div>
                    <span className="text-white/65 text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Right: Visual card / Glass mock-up */}
          <AnimatedSection delay={200}>
            <div className="relative">
              {/* Decorative ring */}
              <div className="absolute -inset-4 rounded-3xl border border-[#00E676]/10 animate-glow-pulse" />

              <div className="relative p-8 rounded-2xl bg-white/[0.04] border border-[#00E676]/15 backdrop-blur-xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#00E676]" />
                    <span className="text-sm text-white/60">Reserva por Hora</span>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                  </div>
                </div>

                {/* Service type selector mock */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-[#00E676]/10 border border-[#00E676]/20 text-center">
                    <Clock className="w-5 h-5 text-[#00E676] mx-auto mb-1" />
                    <span className="text-xs text-[#00E676] font-semibold">POR HORA</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
                    <MapPin className="w-5 h-5 text-white/30 mx-auto mb-1" />
                    <span className="text-xs text-white/30 font-semibold">POR RECORRIDO</span>
                  </div>
                </div>

                {/* Vehicle selection mock */}
                <div className="mb-6">
                  <div className="text-xs text-white/30 mb-3">Selecciona tu vehículo</div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { name: 'Clásico', icon: CarFront, color: '#FF9800' },
                      { name: 'Confort', icon: Car, color: '#0077BD' },
                      { name: 'SUV', icon: Car, color: '#00E676' },
                    ].map((v) => (
                      <div key={v.name} className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-center hover:border-white/10 transition-all">
                        <v.icon className="w-5 h-5 mx-auto mb-1" style={{ color: v.color }} />
                        <span className="text-[10px] text-white/50">{v.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Duration mock */}
                <div className="mb-6">
                  <div className="text-xs text-white/30 mb-3">Duración estimada</div>
                  <div className="flex items-center gap-3">
                    {[1, 2, 3, 4, 8].map((h) => (
                      <div
                        key={h}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-semibold transition-all ${
                          h === 2
                            ? 'bg-[#00E676] text-black'
                            : 'bg-white/[0.03] text-white/40 border border-white/[0.06]'
                        }`}
                      >
                        {h}h
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price mock */}
                <div className="p-4 rounded-xl bg-[#00E676]/5 border border-[#00E676]/15">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-white/40">Precio estimado</span>
                    <span className="text-xs text-[#00E676]">Todo incluido</span>
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">
                    Bs 50<span className="text-base font-normal text-white/40">/hora</span>
                  </div>
                  <div className="text-xs text-white/30">Vehículo + Chofer + Combustible</div>
                </div>

                {/* Confirm button mock */}
                <div className="mt-4 w-full py-3 rounded-xl bg-[#00E676] text-center text-black font-semibold text-sm">
                  Confirmar Reserva — 1 Clic
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
   3. BENEFITS SECTION
   ═══════════════════════════════════════════════════════════════════════════════ */
const benefits = [
  {
    icon: TrendingDown,
    title: 'Ahorra hasta un 80%',
    description: 'Comparado con un taxi por recorrido, el servicio por hora te permite ahorrar hasta un 80% cuando necesitas múltiples traslados en un periodo de tiempo. Cada parada no suma como un viaje nuevo, sino que forma parte del mismo servicio continuo.',
    color: '#00E676',
  },
  {
    icon: Shield,
    title: 'Sin Tarjeta de Crédito',
    description: 'A diferencia de las empresas de renta car que exigen tarjeta de crédito para garantizar el vehículo, en Ecotaxi no necesitas dejar ningún tipo de garantía ni depósito. Reservas, usas y pagas. Simple y sin complicaciones.',
    color: '#0077BD',
  },
  {
    icon: FileText,
    title: 'Sin Contratos Complicados',
    description: 'Olvídate de los montones de cláusulas, letras pequeñas y compromisos a largo plazo que te mantienen como prisionero del volante. En Ecotaxi, un solo clic y tienes un vehículo a disposición. Sin ataduras, sin letra pequeña.',
    color: '#FF9800',
  },
  {
    icon: Package,
    title: 'Todo Incluido',
    description: 'Vehículo, chofer profesional, combustible y guía que conoce la ciudad. No hay costos ocultos ni cargos adicionales por kilometraje base. Es como un renta car premium donde tú solo te preocupas de tu agenda.',
    color: '#8B5CF6',
  },
  {
    icon: Users,
    title: 'Para Todas las Personas',
    description: 'No hacemos distinción. Este servicio está disponible para cualquier persona, ya seas un estudiante de primaria que necesita trasladarse a clases o un alto ejecutivo con reuniones por toda la ciudad. Solo selecciona el tipo de vehículo.',
    color: '#E91E63',
  },
  {
    icon: Sparkles,
    title: 'Único en Bolivia',
    description: 'Somos la única compañía en Bolivia que ofrece el servicio de alquiler por hora con todas estas ventajas. Una innovación que revoluciona la forma en que te mueves por la ciudad, combinando la comodidad de un vehículo propio sin sus costos.',
    color: '#00BCD4',
  },
]

function BenefitsSection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#080c15] to-[#0a0e17]" />

      {/* Accent glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-[#00E676]/5 blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 mb-4">
              <Award className="w-4 h-4 text-[#00E676]" />
              <span className="text-sm text-[#00E676]">Ventajas Exclusivas</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Ecotaxi lo hizo{' '}
              <span className="bg-gradient-to-r from-[#00E676] via-[#0077BD] to-[#FF9800] bg-clip-text text-transparent">
                Simple y Seguro
              </span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              Seis razones por las que el servicio por hora de Ecotaxi es la mejor opción de movilidad en Bolivia.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, i) => (
            <AnimatedSection key={benefit.title} delay={i * 100}>
              <div className="group relative p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-white/10 transition-all duration-500 h-full">
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/[0.02] group-hover:to-white/[0.01] transition-all duration-500" />

                <div className="relative z-10">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: `${benefit.color}12` }}
                  >
                    <benefit.icon className="w-7 h-7" style={{ color: benefit.color }} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">{benefit.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{benefit.description}</p>
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
   4. TWO PRICING MODELS SECTION
   ═══════════════════════════════════════════════════════════════════════════════ */
function PricingModelsSection() {
  const [activeTab, setActiveTab] = useState<'zona' | 'libre'>('zona')

  return (
    <section id="modelos" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />

      {/* Accent glows */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full bg-[#0077BD]/5 blur-[120px]" />
      <div className="absolute bottom-1/3 right-0 w-[400px] h-[400px] rounded-full bg-[#FF9800]/5 blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF9800]/10 border border-[#FF9800]/20 mb-4">
              <Calculator className="w-4 h-4 text-[#FF9800]" />
              <span className="text-sm text-[#FF9800]">Modelos de Pago</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Elige cómo quieres{' '}
              <span className="bg-gradient-to-r from-[#00E676] via-[#0077BD] to-[#FF9800] bg-clip-text text-transparent">
                moverte
              </span>
            </h2>
            <p className="text-white/50 max-w-3xl mx-auto text-lg">
              Tenemos el mejor algoritmo para reducir tu gasto a lo más mínimo. Hemos diseñado 2 modelos 
              pensando en tu economía: puedes elegir entre <strong className="text-[#0077BD]">horas por zonas</strong> u 
              <strong className="text-[#FF9800]"> horas libres</strong>. Tú eliges cómo moverte, nosotros 
              nos aseguramos de que te salga lo más económico.
            </p>
          </div>
        </AnimatedSection>

        {/* Tab selector */}
        <AnimatedSection delay={100}>
          <div className="flex items-center justify-center mb-12">
            <div className="p-1 rounded-2xl bg-white/[0.04] border border-white/[0.06] inline-flex">
              <button
                onClick={() => setActiveTab('zona')}
                className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeTab === 'zona'
                    ? 'bg-[#0077BD] text-white shadow-[0_0_20px_rgba(0,119,189,0.3)]'
                    : 'text-white/50 hover:text-white/70'
                }`}
              >
                <div className="flex items-center gap-2">
                  <MapPinned className="w-4 h-4" />
                  Horas por Zonas
                </div>
              </button>
              <button
                onClick={() => setActiveTab('libre')}
                className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeTab === 'libre'
                    ? 'bg-[#FF9800] text-white shadow-[0_0_20px_rgba(255,152,0,0.3)]'
                    : 'text-white/50 hover:text-white/70'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Route className="w-4 h-4" />
                  Horas Libres
                </div>
              </button>
            </div>
          </div>
        </AnimatedSection>

        {/* Content for each tab */}
        <div className="relative">
          {/* ZONA MODEL */}
          <div className={`transition-all duration-500 ${activeTab === 'zona' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 absolute inset-0 pointer-events-none'}`}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Left: Explanation */}
              <div className="space-y-6">
                <div className="p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-[#0077BD]/15 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#0077BD]/15 flex items-center justify-center">
                      <MapPinned className="w-6 h-6 text-[#0077BD]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Horas por Zonas</h3>
                      <p className="text-sm text-white/40">Pago inteligente por ubicación</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-[#0077BD]/5 border border-[#0077BD]/10">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#0077BD]/15 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-sm font-bold text-[#0077BD]">1</span>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold text-sm mb-1">Primera hora: 100%</h4>
                          <p className="text-xs text-white/40 leading-relaxed">
                            La primera hora se cobra al 100%, ya sea que hubieras utilizado la hora total 
                            o una fracción de ella. Esto garantiza la disponibilidad del vehículo para ti.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#0077BD]/5 border border-[#0077BD]/10">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#0077BD]/15 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-sm font-bold text-[#0077BD]">2</span>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold text-sm mb-1">Luego: cobro por minuto por zona</h4>
                          <p className="text-xs text-white/40 leading-relaxed">
                            Después de la primera hora, el servicio se cobra por minuto según la zona donde 
                            te encuentres. Si te cambias de zona, no necesitas discutir con el chofer sobre 
                            el precio — el sistema reconoce automáticamente tu ubicación y va sumando a tu consumo.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#00E676]/5 border border-[#00E676]/10">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#00E676] shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-white font-semibold text-sm mb-1">Detección automática de zona</h4>
                          <p className="text-xs text-white/40 leading-relaxed">
                            Si estás por zona central, te cobrará los minutos al precio de esa zona. Si te 
                            mueves a zona Sur, el sistema aplica automáticamente el precio por minuto de 
                            la zona Sur. Todo sin complicaciones ni discusiones.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Benefits list */}
                <div className="space-y-3">
                  {[
                    { icon: Gauge, text: 'Cobro preciso por minutos reales de uso', color: '#0077BD' },
                    { icon: Navigation, text: 'Cambio de zona automático sin intervención', color: '#00E676' },
                    { icon: BadgeCheck, text: 'Sin discusiones con el chofer sobre tarifas', color: '#FF9800' },
                    { icon: TrendingDown, text: 'Solo pagas por el tiempo efectivo en cada zona', color: '#8B5CF6' },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                      <item.icon className="w-5 h-5 shrink-0" style={{ color: item.color }} />
                      <span className="text-sm text-white/60">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Visual diagram */}
              <div className="relative">
                <div className="p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm">
                  <div className="text-center mb-6">
                    <h4 className="text-white font-semibold mb-1">Ejemplo: Viaje por Zonas</h4>
                    <p className="text-xs text-white/30">El sistema detecta automáticamente los cambios</p>
                  </div>

                  {/* Zone visualization */}
                  <div className="space-y-4 mb-6">
                    {/* Zone Central */}
                    <div className="p-4 rounded-xl bg-[#0077BD]/8 border border-[#0077BD]/15">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Landmark className="w-4 h-4 text-[#0077BD]" />
                          <span className="text-sm font-semibold text-[#0077BD]">Zona Central</span>
                        </div>
                        <span className="text-xs text-white/30">45 min</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/[0.04] overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-[#0077BD] to-[#00E676]" style={{ width: '45%' }} />
                      </div>
                      <p className="text-xs text-white/30 mt-2">Precio por minuto zona central aplicado automáticamente</p>
                    </div>

                    {/* Arrow */}
                    <div className="flex justify-center">
                      <div className="w-8 h-8 rounded-full bg-white/[0.05] flex items-center justify-center">
                        <ArrowRight className="w-4 h-4 text-white/30 rotate-90" />
                      </div>
                    </div>

                    {/* Zone Sur */}
                    <div className="p-4 rounded-xl bg-[#00E676]/8 border border-[#00E676]/15">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Mountain className="w-4 h-4 text-[#00E676]" />
                          <span className="text-sm font-semibold text-[#00E676]">Zona Sur</span>
                        </div>
                        <span className="text-xs text-white/30">30 min</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/[0.04] overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-[#00E676] to-[#71B124]" style={{ width: '30%' }} />
                      </div>
                      <p className="text-xs text-white/30 mt-2">El sistema cambia a tarifa zona Sur sin intervención</p>
                    </div>

                    {/* Arrow */}
                    <div className="flex justify-center">
                      <div className="w-8 h-8 rounded-full bg-white/[0.05] flex items-center justify-center">
                        <ArrowRight className="w-4 h-4 text-white/30 rotate-90" />
                      </div>
                    </div>

                    {/* Zone Norte */}
                    <div className="p-4 rounded-xl bg-[#FF9800]/8 border border-[#FF9800]/15">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Trees className="w-4 h-4 text-[#FF9800]" />
                          <span className="text-sm font-semibold text-[#FF9800]">Zona Norte</span>
                        </div>
                        <span className="text-xs text-white/30">15 min</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/[0.04] overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-[#FF9800] to-[#E91E63]" style={{ width: '15%' }} />
                      </div>
                      <p className="text-xs text-white/30 mt-2">Tarifa zona Norte aplicada al cruzar el límite</p>
                    </div>
                  </div>

                  {/* Total mock */}
                  <div className="p-4 rounded-xl bg-[#00E676]/5 border border-[#00E676]/15">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/50">Total calculado automáticamente</span>
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#00E676]" />
                        <span className="text-lg font-bold text-[#00E676]">Bs 75</span>
                      </div>
                    </div>
                    <p className="text-xs text-white/30 mt-2">1h base + 45min central + 30min sur + 15min norte</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* LIBRE MODEL */}
          <div className={`transition-all duration-500 ${activeTab === 'libre' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 absolute inset-0 pointer-events-none'}`}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Left: Explanation */}
              <div className="space-y-6">
                <div className="p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-[#FF9800]/15 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#FF9800]/15 flex items-center justify-center">
                      <Route className="w-6 h-6 text-[#FF9800]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Horas Libres</h3>
                      <p className="text-sm text-white/40">Libertad total con monto único</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-[#FF9800]/5 border border-[#FF9800]/10">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#FF9800]/15 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-sm font-bold text-[#FF9800]">1</span>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold text-sm mb-1">Monto único por hora con km incluidos</h4>
                          <p className="text-xs text-white/40 leading-relaxed">
                            Pagas un monto fijo por cada hora que incluye una cantidad de kilómetros 
                            determinados. Eso te da la libertad de moverte por cualquier zona de la 
                            ciudad con un solo monto, sin preocuparte por los límites de zonas.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#FF9800]/5 border border-[#FF9800]/10">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#FF9800]/15 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-sm font-bold text-[#FF9800]">2</span>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold text-sm mb-1">Kilometraje incluido por hora</h4>
                          <p className="text-xs text-white/40 leading-relaxed">
                            Cada hora incluye un número determinado de kilómetros. Si no los usas todos, 
                            no hay problema. Si necesitas moverte más, solo se aplica el costo por 
                            kilómetro adicional una vez que superas el kilometraje incluido en la hora.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#00E676]/5 border border-[#00E676]/10">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#00E676] shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-white font-semibold text-sm mb-1">Libertad entre zonas sin costo extra</h4>
                          <p className="text-xs text-white/40 leading-relaxed">
                            A diferencia del modelo por zonas, aquí puedes moverte libremente entre 
                            cualquier zona de la ciudad sin que cambie la tarifa. Solo importan los 
                            kilómetros recorridos dentro del periodo contratado.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Benefits list */}
                <div className="space-y-3">
                  {[
                    { icon: CircleDollarSign, text: 'Monto fijo por hora sin sorpresas', color: '#FF9800' },
                    { icon: MapIcon, text: 'Libertad para moverte por cualquier zona', color: '#00E676' },
                    { icon: Gauge, text: 'Kilómetros incluidos en cada hora', color: '#0077BD' },
                    { icon: Calculator, text: 'Costo por km adicional solo si excedes', color: '#8B5CF6' },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                      <item.icon className="w-5 h-5 shrink-0" style={{ color: item.color }} />
                      <span className="text-sm text-white/60">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Visual diagram */}
              <div className="relative">
                <div className="p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm">
                  <div className="text-center mb-6">
                    <h4 className="text-white font-semibold mb-1">Ejemplo: Hora Libre</h4>
                    <p className="text-xs text-white/30">Monto único con kilómetros incluidos</p>
                  </div>

                  {/* Hour package visualization */}
                  <div className="p-6 rounded-xl bg-gradient-to-br from-[#FF9800]/10 to-[#FF9800]/5 border border-[#FF9800]/15 mb-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-white mb-2">Bs 50<span className="text-lg font-normal text-white/40">/hora</span></div>
                      <div className="text-sm text-[#FF9800] font-semibold mb-4">Hasta 20 km incluidos</div>
                      
                      {/* KM gauge */}
                      <div className="relative mb-4">
                        <div className="h-4 rounded-full bg-white/[0.06] overflow-hidden">
                          <div className="h-full rounded-full bg-gradient-to-r from-[#00E676] via-[#FF9800] to-[#E91E63]" style={{ width: '65%' }} />
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="text-[10px] text-white/30">0 km</span>
                          <span className="text-[10px] text-[#FF9800] font-semibold">13 km usados</span>
                          <span className="text-[10px] text-white/30">20 km</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Route visualization */}
                  <div className="mb-6">
                    <div className="text-xs text-white/30 mb-3">Recorrido libre por la ciudad</div>
                    <div className="relative p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                      {/* Simple route map mock */}
                      <div className="flex items-center gap-4 flex-wrap">
                        {[
                          { zone: 'Centro', color: '#0077BD' },
                          { zone: 'Sur', color: '#00E676' },
                          { zone: 'Norte', color: '#FF9800' },
                          { zone: 'Equipetrol', color: '#8B5CF6' },
                          { zone: 'Centro', color: '#0077BD' },
                        ].map((stop, i, arr) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="flex items-center gap-1.5">
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: stop.color }} />
                              <span className="text-xs text-white/50">{stop.zone}</span>
                            </div>
                            {i < arr.length - 1 && (
                              <div className="w-6 h-px bg-white/10" />
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 text-xs text-[#00E676]">
                        Mismo precio por hora — sin importar las zonas que recorras
                      </div>
                    </div>
                  </div>

                  {/* What happens if you exceed km */}
                  <div className="p-4 rounded-xl bg-[#FF9800]/5 border border-[#FF9800]/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="w-4 h-4 text-[#FF9800]" />
                      <span className="text-sm font-semibold text-[#FF9800]">Si superas los km incluidos</span>
                    </div>
                    <p className="text-xs text-white/40 leading-relaxed">
                      Si llegas a superar el kilometraje incluido en la hora, recién se aplica el costo 
                      por kilómetro adicional. Sin penalizaciones, sin recargos sorpresa — solo pagas 
                      lo que realmente usas.
                    </p>
                  </div>

                  {/* Total mock */}
                  <div className="mt-4 p-4 rounded-xl bg-[#00E676]/5 border border-[#00E676]/15">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/50">Total (2 horas, 13 km)</span>
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#00E676]" />
                        <span className="text-lg font-bold text-[#00E676]">Bs 100</span>
                      </div>
                    </div>
                    <p className="text-xs text-white/30 mt-2">2h × Bs 50 — Dentro del km incluido</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom comparison summary */}
        <AnimatedSection delay={200}>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-[#0077BD]/15 text-center">
              <MapPinned className="w-8 h-8 text-[#0077BD] mx-auto mb-3" />
              <h4 className="text-white font-semibold mb-2">Ideal para: Zonas</h4>
              <p className="text-sm text-white/40 leading-relaxed">
                Si tu recorrido se concentra en una o dos zonas y quieres pagar solo por los minutos 
                reales en cada zona. Perfecto para citas médicas, trámites en una zona específica, 
                o cuando tu itinerario es predecible.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-[#FF9800]/15 text-center">
              <Route className="w-8 h-8 text-[#FF9800] mx-auto mb-3" />
              <h4 className="text-white font-semibold mb-2">Ideal para: Libre</h4>
              <p className="text-sm text-white/40 leading-relaxed">
                Si necesitas moverte por toda la ciudad sin restricciones de zona. Perfecto para 
                ejecutivos con reuniones en distintos puntos, turistas que quieren conocer la ciudad, 
                o días de compras y entrevistas en múltiples ubicaciones.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   5. VEHICLE TYPES SECTION
   ═══════════════════════════════════════════════════════════════════════════════ */
const vehicleTypes = [
  { icon: Car, name: 'Auto Clásico', passengers: 4, ac: false, desc: 'Vehículo económico para moverte por la ciudad sin complicaciones. Ideal para traslados urbanos donde lo que importa es llegar rápido y eficiente.', color: '#FF9800' },
  { icon: Car, name: 'Sedan Confort', passengers: 4, ac: true, desc: 'Sedán con aire acondicionado para mayor comodidad. Perfecto si tienes reuniones o necesitas llegar fresco a tu destino.', color: '#0077BD' },
  { icon: Car, name: 'SUV', passengers: 4, ac: true, desc: 'SUV amplio con A/C y espacio de equipaje superior. Ideal si llevas carga, compras del día o simplemente quieres más espacio.', color: '#00E676' },
  { icon: Crown, name: 'Sedan VIP', passengers: 4, ac: true, desc: 'Servicio premium con conductor profesional y total discreción. Para el ejecutivo que busca la máxima comodidad y privacidad.', color: '#8B5CF6' },
  { icon: Bus, name: 'MiniVan', passengers: 8, ac: true, desc: 'MiniVan para grupos con equipaje. Perfecto para equipos de trabajo, familias o grupos de amigos que quieren moverse juntos.', color: '#E91E63' },
  { icon: Bike, name: 'Moto', passengers: 1, ac: false, desc: 'Motocicleta para traslados ágiles y rápidos. Llega a tu destino evitando el tráfico cuando el tiempo es oro.', color: '#00BCD4' },
]

function VehicleTypesSection() {
  const [activeVehicle, setActiveVehicle] = useState<string | null>(null)

  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#080c15] to-[#0a0e17]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#0077BD]/5 blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0077BD]/10 border border-[#0077BD]/20 mb-4">
              <Car className="w-4 h-4 text-[#0077BD]" />
              <span className="text-sm text-[#0077BD]">Opciones para Cada Necesidad</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Selecciona tu{' '}
              <span className="bg-gradient-to-r from-[#0077BD] to-[#00E676] bg-clip-text text-transparent">
                Vehículo
              </span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              Ya seas un estudiante de primaria o un alto ejecutivo, solo selecciona el tipo de vehículo 
              que requieras. Un solo clic y es tuyo. No hacemos distinción.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {vehicleTypes.map((vehicle, i) => {
            const isActive = activeVehicle === vehicle.name
            return (
              <AnimatedSection key={vehicle.name} delay={i * 80}>
                <div
                  onClick={() => setActiveVehicle(isActive ? null : vehicle.name)}
                  className={`group relative p-6 rounded-2xl bg-white/[0.03] border backdrop-blur-sm cursor-pointer transition-all duration-500 overflow-hidden ${
                    isActive ? 'bg-white/[0.06]' : 'border-white/[0.06] hover:border-white/10'
                  }`}
                  style={{
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
                      <div className="flex items-center gap-3 text-xs text-white/30">
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>{vehicle.passengers}</span>
                        </div>
                        {vehicle.ac && (
                          <div className="flex items-center gap-1">
                            <Zap className="w-3 h-3" />
                            <span>A/C</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{vehicle.name}</h3>
                    
                    {/* Expandable description */}
                    <div className={`transition-all duration-500 overflow-hidden ${
                      isActive ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <p className="text-sm text-white/50 leading-relaxed pt-3 border-t border-white/[0.06]">
                        {vehicle.desc}
                      </p>
                    </div>

                    {!isActive && (
                      <p className="text-xs text-white/30 mt-3">Click para ver detalles</p>
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
   6. HOW TO BOOK SECTION
   ═══════════════════════════════════════════════════════════════════════════════ */
const bookingSteps = [
  {
    icon: Smartphone,
    title: 'Desde la App o Web',
    desc: 'En el formulario de reserva, simplemente indica el atributo "por hora" al solicitar tu servicio. Selecciona la duración estimada y el tipo de vehículo.',
    color: '#0077BD',
    channel: 'App / Web',
  },
  {
    icon: Phone,
    title: 'Vía Call Center',
    desc: 'Llama al (+591) 3 3296885 o la línea gratuita 800-240-002 e indica al operador que requieres el servicio por hora. Ellos coordinan todo por ti.',
    color: '#00E676',
    channel: 'Teléfono',
  },
  {
    icon: MessageCircle,
    title: 'Por WhatsApp',
    desc: 'Escríbenos al +591 73662803 indicando que necesitas una unidad por hora. Envía tu ubicación, duración estimada y tipo de vehículo preferido.',
    color: '#25D366',
    channel: 'WhatsApp',
  },
]

function HowToBookSection() {
  return (
    <section id="como-funciona" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(0,230,118,0.4) 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#71B124]/10 border border-[#71B124]/20 mb-4">
              <Navigation className="w-4 h-4 text-[#71B124]" />
              <span className="text-sm text-[#71B124]">Así Funciona</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Reservar es{' '}
              <span className="bg-gradient-to-r from-[#71B124] to-[#00E676] bg-clip-text text-transparent">
                Simple
              </span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              Solicitar tu vehículo por hora es tan fácil como pedir un taxi regular. Solo indica 
              que quieres el servicio por hora a través de cualquiera de nuestros canales.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {bookingSteps.map((step, i) => (
            <AnimatedSection key={step.title} delay={i * 150}>
              <div className="group relative p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-white/10 transition-all duration-500 h-full">
                {/* Channel badge */}
                <div className="absolute top-4 right-4">
                  <span
                    className="px-2 py-1 rounded-full text-[10px] font-bold uppercase"
                    style={{ backgroundColor: `${step.color}15`, color: step.color }}
                  >
                    {step.channel}
                  </span>
                </div>

                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: `${step.color}12` }}>
                  <step.icon className="w-7 h-7" style={{ color: step.color }} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{step.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Step timeline */}
        <AnimatedSection delay={200}>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#0077BD] via-[#00E676] to-[#71B124]" />

              {[
                { step: 1, title: 'Indica "Por Hora"', desc: 'En la app, formulario web, llamada o WhatsApp, selecciona la opción de servicio por hora.', color: '#0077BD' },
                { step: 2, title: 'Elige tu Vehículo', desc: 'Selecciona el tipo de vehículo según tu necesidad y presupuesto: clásico, confort, SUV, VIP, MiniVan o moto.', color: '#00E676' },
                { step: 3, title: 'Define la Duración', desc: 'Estima cuántas horas necesitas el vehículo. Puedes extender el servicio en cualquier momento.', color: '#FF9800' },
                { step: 4, title: 'Elige tu Modelo de Pago', desc: 'Horas por Zonas (pago por minuto según zona) u Horas Libres (monto único con km incluidos).', color: '#8B5CF6' },
                { step: 5, title: 'Un Clic y es Tuyo', desc: 'Confirma tu reserva y tu vehículo estará en camino. Sin tarjeta de crédito, sin garantías, sin contratos.', color: '#00E676' },
              ].map((item, i) => (
                <div key={item.step} className="relative flex items-start mb-8 last:mb-0">
                  {/* Dot */}
                  <div
                    className="absolute left-6 -translate-x-1/2 w-4 h-4 rounded-full z-10"
                    style={{ backgroundColor: item.color, boxShadow: `0 0 20px ${item.color}50` }}
                  />
                  {/* Content */}
                  <div className="ml-14 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-white/10 transition-all duration-300 flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-bold" style={{ color: item.color }}>PASO {item.step}</span>
                    </div>
                    <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   7. SAVINGS COMPARISON SECTION
   ═══════════════════════════════════════════════════════════════════════════════ */
function SavingsComparisonSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e17] via-[#0d1a12] to-[#0a0e17]" />

      {/* Prominent green glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full bg-[#00E676]/8 blur-[180px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 mb-4">
              <TrendingDown className="w-4 h-4 text-[#00E676]" />
              <span className="text-sm text-[#00E676]">Ahorro Real</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Hasta un{' '}
              <span className="bg-gradient-to-r from-[#00E676] to-[#71B124] bg-clip-text text-transparent">
                80% de Ahorro
              </span>
            </h2>
            <p className="text-white/50 max-w-3xl mx-auto text-lg">
              Compara cuánto pagarías por múltiples taxis por recorrido vs. un solo vehículo por hora. 
              La diferencia es significativa.
            </p>
          </div>
        </AnimatedSection>

        {/* Comparison cards */}
        <AnimatedSection delay={150}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Traditional taxi */}
            <div className="p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
              <div className="text-center mb-6">
                <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-3">
                  <Car className="w-7 h-7 text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">Taxi por Recorrido</h3>
                <p className="text-sm text-white/40">Múltiples viajes en un día</p>
              </div>

              <div className="space-y-3 mb-6">
                {[
                  { trip: 'Oficina → Cliente A', cost: 'Bs 35' },
                  { trip: 'Cliente A → Banco', cost: 'Bs 28' },
                  { trip: 'Banco → Almuerzo', cost: 'Bs 20' },
                  { trip: 'Almuerzo → Cliente B', cost: 'Bs 32' },
                  { trip: 'Cliente B → Oficina', cost: 'Bs 30' },
                ].map((item) => (
                  <div key={item.trip} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02]">
                    <span className="text-sm text-white/50">{item.trip}</span>
                    <span className="text-sm text-red-400/70 font-medium">{item.cost}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10 text-center">
                <p className="text-xs text-white/30 mb-1">Total del día</p>
                <p className="text-3xl font-bold text-red-400">Bs 145</p>
                <p className="text-xs text-white/30 mt-1">5 taxis separados + tiempos de espera</p>
              </div>
            </div>

            {/* Ecotaxi by hour */}
            <div className="p-6 md:p-8 rounded-2xl bg-white/[0.03] border-2 border-[#00E676]/20 relative">
              {/* Badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="px-4 py-1.5 rounded-full text-xs font-bold text-black bg-[#00E676] uppercase tracking-wider shadow-[0_0_20px_rgba(0,230,118,0.3)]">
                  80% Más Económico
                </span>
              </div>

              <div className="text-center mb-6 pt-2">
                <div className="w-14 h-14 rounded-2xl bg-[#00E676]/10 flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-7 h-7 text-[#00E676]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">Ecotaxi por Hora</h3>
                <p className="text-sm text-white/40">Un vehículo todo el día</p>
              </div>

              <div className="space-y-3 mb-6">
                {[
                  { trip: 'Oficina → Cliente A → Banco', included: true },
                  { trip: 'Banco → Almuerzo', included: true },
                  { trip: 'Almuerzo → Cliente B → Oficina', included: true },
                  { trip: 'Chofer espera mientras atiendes', included: true },
                  { trip: 'Combustible incluido', included: true },
                ].map((item) => (
                  <div key={item.trip} className="flex items-center justify-between p-3 rounded-lg bg-[#00E676]/3">
                    <span className="text-sm text-white/50">{item.trip}</span>
                    <CheckCircle2 className="w-4 h-4 text-[#00E676]" />
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-[#00E676]/5 border border-[#00E676]/15 text-center">
                <p className="text-xs text-[#00E676] mb-1">Total del día</p>
                <p className="text-3xl font-bold text-[#00E676]">Bs 50</p>
                <p className="text-xs text-white/30 mt-1">1 hora con todo incluido</p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Additional savings note */}
        <AnimatedSection delay={300}>
          <div className="mt-12 max-w-3xl mx-auto">
            <div className="p-6 rounded-2xl bg-[#00E676]/5 border border-[#00E676]/15 text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Percent className="w-5 h-5 text-[#00E676]" />
                <span className="text-[#00E676] font-semibold">El ahorro es aún mayor con más viajes</span>
              </div>
              <p className="text-sm text-white/50 leading-relaxed">
                Cuantos más traslados necesites en el día, mayor es el ahorro por hora frente a taxis por recorrido. 
                Si necesitas 5 o más traslados, el ahorro puede superar el 80%. Además, no pierdes tiempo 
                esperando que llegue cada taxi, no pagas tiempos de espera, y tu chofer te acompaña a cada 
                destino sin interrupciones.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   8. DISPATCH CENTER SECTION
   ═══════════════════════════════════════════════════════════════════════════════ */
const supportChannels = [
  { icon: Headphones, title: 'Central de Despacho', desc: 'Operadores reales 24/7 que coordinan cada servicio por hora, asignan unidades y gestionan extensiones de tiempo en tiempo real.', color: '#0077BD' },
  { icon: Phone, title: 'Call Center', desc: 'Llámanos al (+591) 3 3296885 o 800-240-002 para reservar tu vehículo por hora de forma inmediata con atención personalizada.', color: '#00E676' },
  { icon: MessageCircle, title: 'WhatsApp', desc: 'Escríbenos al +591 73662803. Indica que requieres servicio por hora, la duración y el tipo de vehículo. Recibe confirmación al instante.', color: '#25D366' },
  { icon: Smartphone, title: 'App Móvil', desc: 'Selecciona "Por Hora" en la app, define la duración y el modelo de pago. Todo desde tu celular con seguimiento GPS en tiempo real.', color: '#8B5CF6' },
  { icon: Globe, title: 'Reserva Web', desc: 'Usa nuestro formulario online para reservar el servicio por hora desde cualquier dispositivo con conexión a internet.', color: '#FF9800' },
]

function DispatchCenterSection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-[#0077BD]/5 blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 mb-4">
              <Headphones className="w-4 h-4 text-[#8B5CF6]" />
              <span className="text-sm text-[#8B5CF6]">Soporte Humano</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Central de Despacho{' '}
              <span className="bg-gradient-to-r from-[#8B5CF6] to-[#00E676] bg-clip-text text-transparent">
                Humana
              </span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              Un equipo real de operadores y soporte que coordina cada servicio por hora y te ayuda 
              en todo momento. Nunca estás solo, siempre hay alguien al otro lado.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {supportChannels.map((channel, i) => (
            <AnimatedSection key={channel.title} delay={i * 80}>
              <div className="group relative p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center hover:border-white/10 transition-all duration-500 h-full">
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
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   9. CTA SECTION
   ═══════════════════════════════════════════════════════════════════════════════ */
function CTASection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#00E676]/10 blur-[120px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 mb-6">
            <Clock className="w-4 h-4 text-[#00E676]" />
            <span className="text-sm text-[#00E676]">Un Clic y es Tuyo</span>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            ¿Necesitas un vehículo{' '}
            <span className="bg-gradient-to-r from-[#00E676] to-[#0077BD] bg-clip-text text-transparent">
              a tu disposición
            </span>
            ?
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <p className="text-white/50 text-lg mb-10 leading-relaxed max-w-2xl mx-auto">
            No pierdas más tiempo buscando taxi en cada esquina. Reserva tu vehículo por hora y ten la 
            tranquilidad de moverte cuando y como quieras. Sin tarjeta de crédito, sin garantías, sin 
            contratos. Solo un clic.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={300}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href="https://id3251.tm.taxi:58443/?cid=1"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full text-lg font-semibold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all duration-300 shadow-[0_0_30px_rgba(0,230,118,0.3)] hover:shadow-[0_0_50px_rgba(0,230,118,0.5)] hover:scale-105 flex items-center gap-2"
            >
              Reservar por Hora
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="https://wa.me/59173662803?text=Hola%2C%20necesito%20un%20veh%C3%ADculo%20por%20hora"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full text-lg font-semibold text-white border border-[#25D366]/40 bg-[#25D366]/10 hover:bg-[#25D366]/20 hover:border-[#25D366]/60 transition-all duration-300 flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5 text-[#25D366]" />
              WhatsApp
            </a>
          </div>
        </AnimatedSection>

        {/* Trust indicators */}
        <AnimatedSection delay={400}>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {[
              { icon: Shield, text: 'Sin tarjeta de crédito' },
              { icon: KeyRound, text: 'Sin garantías' },
              { icon: FileText, text: 'Sin contratos' },
              { icon: Clock, text: 'Disponible 24/7' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-white/30">
                <item.icon className="w-4 h-4 text-[#00E676]/50" />
                <span className="text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════════════════════ */
export default function PorHoraPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0e17]">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <WhatIsItSection />
        <BenefitsSection />
        <PricingModelsSection />
        <VehicleTypesSection />
        <SavingsComparisonSection />
        <HowToBookSection />
        <DispatchCenterSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
