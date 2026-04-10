'use client'

import {
  Phone, MessageCircle, Globe, Smartphone, Building2,
  HandshakeIcon, Hotel, Users, Headphones, ChevronRight, ArrowRight
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface Channel {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  color: string
  href?: string
}

const requestChannels: Channel[] = [
  { icon: Phone, label: 'Call Center', value: '(+591) 3 3296885', color: '#0077BD', href: 'tel:+59133296885' },
  { icon: Phone, label: 'Línea Gratuita', value: '800-240-002', color: '#1D6988', href: 'tel:800240002' },
  { icon: Smartphone, label: 'App Móvil', value: 'Descarga la APP', color: '#00E676' },
  { icon: MessageCircle, label: 'WhatsApp', value: '+591 73662803', color: '#25D366', href: 'https://wa.me/59173662803' },
  { icon: Globe, label: 'Sitio Web', value: 'Reserva Online', color: '#0077BD', href: '#reservas' },
  { icon: Headphones, label: 'Redes Sociales', value: '@ecotaxibo', color: '#8B5CF6' },
]

const portalAccess = [
  {
    icon: Building2,
    title: 'Empresas',
    description: 'Acceso corporativo para gestión de transporte, facturación y reportes de tu empresa.',
    color: '#0077BD',
    bgColor: 'bg-[#0077BD]/10',
    borderColor: 'border-[#0077BD]/20 hover:border-[#0077BD]/50',
    href: 'https://id3251.tm.taxi:58443/?cid=1',
  },
  {
    icon: HandshakeIcon,
    title: 'Partners',
    description: 'Portal para socios, afiliados y colaboradores comerciales. Gestiona tu cuenta de partner.',
    color: '#00E676',
    bgColor: 'bg-[#00E676]/10',
    borderColor: 'border-[#00E676]/20 hover:border-[#00E676]/50',
    href: 'https://id3251.tm.taxi:58443/?cid=1',
  },
  {
    icon: Hotel,
    title: 'Hoteles',
    description: 'Acceso para hoteles y alojamiento. Coordina traslados para tus huéspedes de manera eficiente.',
    color: '#FF9800',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/20 hover:border-orange-500/50',
    href: 'https://id3251.tm.taxi:58443/?cid=1',
  },
  {
    icon: Users,
    title: 'Conductores',
    description: 'Portal de registro y gestión para conductores. Únete a la flota más grande de Bolivia.',
    color: '#8B5CF6',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20 hover:border-purple-500/50',
    href: 'https://id3251.tm.taxi:58443/?cid=1',
  },
]

export function Multicanal() {
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
    <section id="multicanal" ref={sectionRef} className="relative py-24 md:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1D6988]/10 border border-[#1D6988]/20 mb-4">
            <Globe className="w-4 h-4 text-[#1D6988]" />
            <span className="text-sm text-[#1D6988]">Múltiples Canales</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Solicita Tu{' '}
            <span className="bg-gradient-to-r from-[#1D6988] to-[#00E676] bg-clip-text text-transparent">
              ECOTAXI
            </span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            Múltiples canales de comunicación para que solicites tu taxi de la forma que más te convenga.
          </p>
        </div>

        {/* Request Channels Grid */}
        <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-20 transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {requestChannels.map((channel) => (
            <a
              key={channel.label}
              href={channel.href || '#reservas'}
              target={channel.href?.startsWith('http') ? '_blank' : undefined}
              rel={channel.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center hover:border-white/10 hover:bg-white/[0.05] transition-all duration-300"
            >
              <div
                className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center"
                style={{ background: `${channel.color}15` }}
              >
                <channel.icon className="w-6 h-6" style={{ color: channel.color }} />
              </div>
              <p className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">{channel.label}</p>
              <p className="text-xs text-white/40 mt-1">{channel.value}</p>
            </a>
          ))}
        </div>

        {/* Portal Access Section */}
        <div className={`transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '200ms' }}>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0077BD]/10 border border-[#0077BD]/20 mb-4">
              <Building2 className="w-4 h-4 text-[#0077BD]" />
              <span className="text-sm text-[#0077BD]">Acceso Portal</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Acceso para{' '}
              <span className="bg-gradient-to-r from-[#0077BD] to-[#00E676] bg-clip-text text-transparent">
                Empresas y Partners
              </span>
            </h3>
            <p className="text-white/50 max-w-2xl mx-auto">
              Accede a tu portal personalizado para gestionar reservas, facturación y servicios de transporte.
            </p>
          </div>

          {/* Portal Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {portalAccess.map((portal, i) => (
              <a
                key={portal.title}
                href={portal.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative p-6 rounded-2xl bg-white/[0.03] border backdrop-blur-sm transition-all duration-500 ${portal.borderColor} hover:bg-white/[0.05] ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: visible ? `${300 + i * 100}ms` : '0ms' }}
              >
                {/* Glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ boxShadow: `0 0 30px ${portal.color}15` }}
                />

                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-2xl ${portal.bgColor} flex items-center justify-center mb-4`}>
                    <portal.icon className="w-7 h-7" style={{ color: portal.color }} />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-white/90 transition-colors">
                    {portal.title}
                  </h4>
                  <p className="text-sm text-white/40 leading-relaxed mb-4">
                    {portal.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-medium transition-colors" style={{ color: portal.color }}>
                    <span>Acceder al portal</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
