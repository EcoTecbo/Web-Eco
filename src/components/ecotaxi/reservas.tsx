'use client'

import { Phone, MessageCircle, Globe, Smartphone } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export function Reservas() {
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
    <section id="reservas" ref={sectionRef} className="relative py-24 md:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#0077BD]/10 blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0077BD]/10 border border-[#0077BD]/20 mb-4">
            <Globe className="w-4 h-4 text-[#0077BD]" />
            <span className="text-sm text-[#0077BD]">Reserva Online</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Reserva Tu{' '}
            <span className="bg-gradient-to-r from-[#0077BD] to-[#00E676] bg-clip-text text-transparent">
              ECOTAXI
            </span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            Reserva tu taxi de forma rápida y segura. Elije tu punto de partida, destino y vehículo en segundos.
          </p>
        </div>

        {/* Iframe Container */}
        <div
          className={`relative max-w-4xl mx-auto mb-12 transition-all duration-1000 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="relative p-1 rounded-3xl bg-gradient-to-r from-[#0077BD]/50 via-[#00E676]/50 to-[#0077BD]/50">
            <div className="rounded-[22px] overflow-hidden bg-[#0a0e17]">
              <div className="p-4 sm:p-6">
                <iframe
                  src="https://id3251.tm.taxi:58443/?cid=1"
                  title="Reservas Ecotaxi"
                  className="w-full h-[600px] sm:h-[700px] rounded-2xl border-0 bg-white/5"
                  loading="lazy"
                  allow="geolocation"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Alternative Contact Methods */}
        <div
          className={`max-w-3xl mx-auto transition-all duration-1000 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: visible ? '300ms' : '0ms' }}
        >
          <p className="text-center text-white/40 mb-6 text-sm">O reserva a través de otros canales</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Phone, label: 'Call Center', value: '(+591) 3 3296885', color: '#0077BD' },
              { icon: Smartphone, label: 'App Móvil', value: 'Descarga la APP', color: '#00E676' },
              { icon: MessageCircle, label: 'WhatsApp', value: '+591 73662803', color: '#25D366' },
              { icon: Globe, label: 'Línea Gratuita', value: '800-240-002', color: '#1D6988' },
            ].map((channel) => (
              <div
                key={channel.label}
                className="group p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center hover:border-white/10 transition-all duration-300 cursor-pointer"
              >
                <div
                  className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center"
                  style={{ background: `${channel.color}15` }}
                >
                  <channel.icon className="w-5 h-5" style={{ color: channel.color }} />
                </div>
                <p className="text-sm font-medium text-white/80">{channel.label}</p>
                <p className="text-xs text-white/40 mt-1">{channel.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
