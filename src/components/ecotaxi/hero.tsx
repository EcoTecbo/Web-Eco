'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Leaf, Car, Shield, Zap, ChevronLeft, ChevronRight } from 'lucide-react'

const slides = [
  {
    image: '/hero-taxi-1.png',
    title: 'Transporte Inteligente,',
    highlight: 'Compromiso Ecológico',
    subtitle: 'Somos la primera empresa de transporte en Bolivia con un plan de medición, reducción y neutralización de emisiones de gases de efecto invernadero.',
  },
  {
    image: '/hero-taxi-2.png',
    title: 'Toca. Viaja. Llega:',
    highlight: '¡así de sencillo!',
    subtitle: 'Cada trayecto con Ecotaxi es un paso hacia un planeta más limpio. Viaja con nosotros y reduce tu huella de carbono automáticamente.',
  },
]

export function Hero() {
  const parallaxRef = useRef<HTMLDivElement>(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  // Parallax effect
  useEffect(() => {
    const el = parallaxRef.current
    if (!el) return
    const handleScroll = () => {
      el.style.transform = `translateY(${window.scrollY * 0.3}px)`
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  const goToSlide = (index: number) => setCurrentSlide(index)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images Carousel */}
      <div ref={parallaxRef} className="absolute inset-0 z-0">
        {slides.map((slide, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: currentSlide === i ? 1 : 0 }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-[#0a0e17]/75" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17]/50 via-transparent to-[#0a0e17]" />
          </div>
        ))}

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(0,230,118,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,230,118,0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[#0077BD]/15 blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#00E676]/10 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Carousel Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all backdrop-blur-sm"
        aria-label="Slide anterior"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all backdrop-blur-sm"
        aria-label="Slide siguiente"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 animate-fade-in backdrop-blur-sm">
          <Leaf className="w-4 h-4 text-[#00E676]" />
          <span className="text-sm text-white/80">Primeros en Bolivia con neutralización de CO2</span>
        </div>

        {/* Main Heading - animated per slide */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 animate-fade-in-up">
          {slides[currentSlide].title}
          <br />
          <span className="bg-gradient-to-r from-[#00E676] via-[#0077BD] to-[#00E676] bg-clip-text text-transparent">
            {slides[currentSlide].highlight}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {slides[currentSlide].subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <a
            href="#reservas"
            className="px-8 py-4 rounded-full text-lg font-semibold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all duration-300 shadow-[0_0_30px_rgba(0,230,118,0.3)] hover:shadow-[0_0_50px_rgba(0,230,118,0.5)] hover:scale-105"
          >
            Reservar Ahora
          </a>
          <a
            href="#servicios"
            className="px-8 py-4 rounded-full text-lg font-semibold text-white border border-white/20 hover:border-[#00E676]/50 hover:bg-white/5 transition-all duration-300"
          >
            Nuestros Servicios
          </a>
        </div>

        {/* Slide Indicators */}
        <div className="flex items-center justify-center gap-2 mb-12">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                currentSlide === i
                  ? 'w-8 bg-[#00E676]'
                  : 'w-4 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Ir al slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          {[
            { icon: Car, value: '200K+', label: 'Viajes realizados' },
            { icon: Shield, value: '17', label: 'Servicios disponibles' },
            { icon: Zap, value: '12+', label: 'Tipos de vehículos' },
            { icon: Leaf, value: '100%', label: 'Compromiso eco' },
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
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown className="w-6 h-6 text-white/30" />
      </div>
    </section>
  )
}
