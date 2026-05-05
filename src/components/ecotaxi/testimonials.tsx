'use client'

import { useEffect, useRef, useState } from 'react'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    name: 'Carlos Mendoza',
    location: 'Santa Cruz, Bolivia',
    initials: 'CM',
    text: 'Ecotaxi me permitió tener un ingreso estable y flexible. La app es muy fácil de usar y el soporte siempre está disponible cuando lo necesito.',
    rating: 5,
    color: '#00E676',
  },
  {
    name: 'Rosa Lima',
    location: 'Cochabamba, Bolivia',
    initials: 'RL',
    text: 'Me encanta la seguridad que brinda la plataforma. Me siento protegida en cada viaje y los pagos siempre llegan a tiempo.',
    rating: 5,
    color: '#0077BD',
  },
  {
    name: 'Miguel Torres',
    location: 'La Paz, Bolivia',
    initials: 'MT',
    text: 'El mejor sistema de pagos. Siempre recibo mis ganancias a tiempo y sin complicaciones. Totalmente recomendado para conductores.',
    rating: 5,
    color: '#FF9800',
  },
  {
    name: 'Ana Gutiérrez',
    location: 'Sucre, Bolivia',
    initials: 'AG',
    text: 'Como mujer conductora, valoro mucho la seguridad que me ofrece Ecotaxi. El botón de emergencia y el monitoreo GPS me dan tranquilidad.',
    rating: 5,
    color: '#8B5CF6',
  },
  {
    name: 'Pedro Rojas',
    location: 'Tarija, Bolivia',
    initials: 'PR',
    text: 'Después de 3 años con Ecotaxi, puedo decir que es la mejor decisión que tomé. Horarios flexibles y ganancias reales.',
    rating: 5,
    color: '#71B124',
  },
  {
    name: 'Lucía Fernández',
    location: 'Oruro, Bolivia',
    initials: 'LF',
    text: 'La APP de conductor es increíble. Naveción GPS, historial de viajes y pagos automáticos. Todo lo que necesito en un solo lugar.',
    rating: 5,
    color: '#D4AF37',
  },
]

export function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const itemsPerPage = 2
  const totalPages = Math.ceil(testimonials.length / itemsPerPage)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages)
    }, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, totalPages])

  const goToPage = (page: number) => {
    setCurrentPage(page)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const prevPage = () => {
    goToPage((currentPage - 1 + totalPages) % totalPages)
  }

  const nextPage = () => {
    goToPage((currentPage + 1) % totalPages)
  }

  const currentTestimonials = testimonials.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  )

  return (
    <section id="testimonios" ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background - dark eco gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1a20] to-[#0a0e17]" />

      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle, rgba(0,230,118,0.5) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }} />
      </div>

      {/* Glow orbs */}
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] rounded-full bg-[#00E676]/8 blur-[120px]" />
      <div className="absolute bottom-1/3 right-0 w-[350px] h-[350px] rounded-full bg-[#0077BD]/8 blur-[100px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-14 transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {/* Testimonials label with dashed underline */}
          <div className="inline-block">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
              Testimonios
            </h2>
            <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#00E676]/40 to-transparent" style={{
              backgroundImage: 'repeating-linear-gradient(90deg, #00E676 0, #00E676 6px, transparent 6px, transparent 12px)',
              backgroundSize: '100% 2px',
            }} />
          </div>
          <p className="text-white/50 max-w-2xl mx-auto text-lg mt-6">
            Lo que dicen nuestros conductores y pasajeros sobre la experiencia Ecotaxi
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className={`transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '200ms' }}>

          {/* Navigation Arrows */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={prevPage}
              className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.1] hover:border-white/20 transition-all duration-300"
              aria-label="Testimonio anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToPage(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    currentPage === i
                      ? 'bg-[#00E676] w-8 shadow-[0_0_8px_rgba(0,230,118,0.4)]'
                      : 'bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Ir a página ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextPage}
              className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.1] hover:border-white/20 transition-all duration-300"
              aria-label="Siguiente testimonio"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Cards Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentTestimonials.map((testimonial, i) => (
              <div
                key={`${currentPage}-${i}`}
                className="group relative p-6 md:p-8 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm hover:border-[#00E676]/20 transition-all duration-500 hover:bg-white/[0.06]"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Taxi icon watermark */}
                <div className="absolute bottom-4 right-4 opacity-[0.03] pointer-events-none">
                  <svg width="80" height="48" viewBox="0 0 34 20" fill="none">
                    <rect x="5" y="5" width="22" height="9" rx="2.5" fill="currentColor" />
                    <path d="M9 5 L11 1.5 L21 1.5 L23 5" fill="currentColor" />
                    <rect x="13" y="0.5" width="6" height="2" rx="0.7" fill="currentColor" />
                    <circle cx="11" cy="15" r="3" fill="currentColor" />
                    <circle cx="22" cy="15" r="3" fill="currentColor" />
                  </svg>
                </div>

                {/* Quote mark */}
                <div className="text-4xl font-serif text-[#00E676]/20 mb-2 leading-none">&ldquo;</div>

                {/* Rating Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-white/60 leading-relaxed mb-6 text-base">
                  {testimonial.text}
                </p>

                {/* Profile Section */}
                <div className="flex items-center gap-4">
                  {/* Avatar circle */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0 shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${testimonial.color}40, ${testimonial.color}80)` }}
                  >
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-white/40 text-xs flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Navigation Dots */}
          <div className="flex items-center justify-center gap-3 mt-10">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={`bottom-${i}`}
                onClick={() => goToPage(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentPage === i
                    ? 'bg-[#00E676] shadow-[0_0_10px_rgba(0,230,118,0.5)]'
                    : 'bg-white/15 hover:bg-white/30'
                }`}
                aria-label={`Ir a página ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
