'use client'

import {
  Phone, Smartphone, Globe, Building2,
  HandshakeIcon, Hotel, Users, ArrowRight, Monitor,
  MapPin,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

/* ────────────────────────────────────────────────────────────
   BRAND ICONS (lucide-react doesn't ship brand icons)
   ──────────────────────────────────────────────────────────── */

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.892c0 2.096.549 4.142 1.595 5.945L0 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.582 0 11.94-5.335 11.944-11.893a11.821 11.821 0 00-3.488-8.413z" />
    </svg>
  )
}

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.061 3.345-.48.327-.913.493-1.302.481-.428-.014-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  )
}

function MessengerIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.652V24l4.088-2.242c1.092.301 2.246.464 3.443.464 6.627 0 12-4.975 12-11.111C24 4.974 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.733 8l3.131 3.259L19.752 8l-6.561 6.963z" />
    </svg>
  )
}

function EcotaxiAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17 19H7V5h10m0-4H7c-1.11 0-2 .89-2 2v18a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2z" />
      <path d="M9 7h6v2H9zm0 4h6v2H9z" />
    </svg>
  )
}

/* ────────────────────────────────────────────────────────────
   PORTAL ACCESS (kept from original — separate section)
   ──────────────────────────────────────────────────────────── */

const portalAccess = [
  {
    icon: Building2,
    title: 'Empresas',
    description: 'Acceso corporativo para gestión de transporte, facturación y reportes de tu empresa.',
    color: '#0077BD',
    bgColor: 'bg-[#0077BD]/10',
    borderColor: 'border-[#0077BD]/20 hover:border-[#0077BD]/50',
    href: 'https://ecotaxi-kc.tm.taxi/',
  },
  {
    icon: HandshakeIcon,
    title: 'Partners',
    description: 'Portal para socios, afiliados y colaboradores comerciales. Gestiona tu cuenta de partner.',
    color: '#00E676',
    bgColor: 'bg-[#00E676]/10',
    borderColor: 'border-[#00E676]/20 hover:border-[#00E676]/50',
    href: 'https://crm.oyc-srl.com/',
  },
  {
    icon: Hotel,
    title: 'Hoteles',
    description: 'Acceso para hoteles y alojamiento. Coordina traslados para tus huéspedes de manera eficiente.',
    color: '#FF9800',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/20 hover:border-orange-500/50',
    href: 'https://crm.oyc-srl.com/',
  },
  {
    icon: Users,
    title: 'Conductores',
    description: 'Descarga la APP de conductor y únete a la flota más grande de Bolivia.',
    color: '#8B5CF6',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20 hover:border-purple-500/50',
    href: 'https://play.google.com/store/apps/details?id=taxi.id3251&pcampaignid=web_share',
  },
]

/* ────────────────────────────────────────────────────────────
   MAIN COMPONENT
   ──────────────────────────────────────────────────────────── */

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

        {/* ═══════════════════════════════════════════════════════
            NEW HIERARCHICAL STRUCTURE — 4 ROWS, ORDER 1..8
            ═══════════════════════════════════════════════════════ */}
        <div
          className={`space-y-6 md:space-y-8 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >

          {/* ───────── ROW 1 — Featured Main Channels (2 large cards) ───────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {/* Card 1: WhatsApp — Priority #1 */}
            <a
              href="https://wa.me/59172100946"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative order-1 block p-7 md:p-8 rounded-3xl bg-white/[0.04] border border-[#25D366]/20 hover:border-[#25D366]/50 hover:bg-white/[0.06] transition-all duration-500 hover:-translate-y-1 overflow-hidden"
            >
              {/* glow on hover */}
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ boxShadow: '0 0 50px rgba(37, 211, 102, 0.25)' }}
              />
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: 'rgba(37, 211, 102, 0.12)' }}
                  >
                    <WhatsAppIcon className="w-8 h-8 text-[#25D366]" />
                    <span className="sr-only">WhatsApp</span>
                  </div>
                  <div className="min-w-0">
                    <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#25D366]/15 text-[#25D366] mb-1">
                      Prioridad #1
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                      Solicita por WhatsApp
                    </h3>
                  </div>
                </div>
                <p className="text-sm md:text-base text-white/55 leading-relaxed mb-6 flex-1">
                  Nuestro Bot automatizado te asigna un vehículo de inmediato. ¡Rápido, seguro y sin gastar tus megas!
                </p>
                <button
                  type="button"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-black bg-[#25D366] hover:bg-[#2Be06b] transition-all duration-300 shadow-[0_4px_20px_rgba(37,211,102,0.4)] group-hover:shadow-[0_8px_30px_rgba(37,211,102,0.55)]"
                  tabIndex={-1}
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  Pedir Taxi por WhatsApp
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </a>

            {/* Card 2: Download APP — Priority #2 */}
            <a
              href="https://onelink.to/2bygmz"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative order-2 block p-7 md:p-8 rounded-3xl bg-white/[0.04] border border-[#00E676]/20 hover:border-[#00E676]/50 hover:bg-white/[0.06] transition-all duration-500 hover:-translate-y-1 overflow-hidden"
            >
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ boxShadow: '0 0 50px rgba(0, 230, 118, 0.22)' }}
              />
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: 'rgba(0, 230, 118, 0.12)' }}
                  >
                    <EcotaxiAppIcon className="w-8 h-8 text-[#00E676]" />
                  </div>
                  <div className="min-w-0">
                    <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#00E676]/15 text-[#00E676] mb-1">
                      Prioridad #2
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                      Descarga nuestra APP
                    </h3>
                  </div>
                </div>
                <p className="text-sm md:text-base text-white/55 leading-relaxed mb-6 flex-1">
                  Sigue tu viaje en tiempo real, calcula tarifas fijas y accede a beneficios exclusivos. Disponible para Android, iOS y Huawei.
                </p>
                <button
                  type="button"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-black bg-gradient-to-r from-[#00E676] to-[#00C853] hover:from-[#00ff88] hover:to-[#00E676] transition-all duration-300 shadow-[0_4px_20px_rgba(0,230,118,0.4)] group-hover:shadow-[0_8px_30px_rgba(0,230,118,0.55)]"
                  tabIndex={-1}
                >
                  <Smartphone className="w-5 h-5" />
                  Descargar Aplicación
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </a>
          </div>

          {/* ───────── ROW 2 — Online Management (1 wide card, centered) ───────── */}
          <div className="grid grid-cols-1 gap-5">
            <a
              href="#reservas"
              className="group relative order-3 block p-6 md:p-7 rounded-3xl bg-white/[0.04] border border-[#1D6988]/20 hover:border-[#1D6988]/50 hover:bg-white/[0.06] transition-all duration-500 hover:-translate-y-1 overflow-hidden"
            >
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ boxShadow: '0 0 50px rgba(29, 105, 136, 0.25)' }}
              />
              <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-5">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: 'rgba(29, 105, 136, 0.15)' }}
                >
                  <Globe className="w-7 h-7 text-[#1D6988]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                    Reserva Online
                  </h3>
                  <p className="text-sm md:text-base text-white/55 leading-relaxed">
                    Solicita tu taxi o programa tus servicios por hora directamente desde tu navegador, sin necesidad de instalar nada.
                  </p>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-white bg-[#1D6988] hover:bg-[#247d9f] transition-all duration-300 shadow-[0_4px_20px_rgba(29,105,136,0.4)] group-hover:shadow-[0_8px_30px_rgba(29,105,136,0.55)] shrink-0"
                  tabIndex={-1}
                >
                  Solicitar en Línea
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </a>
          </div>

          {/* ───────── ROW 3 — Traditional Channels (3 columns) ───────── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {/* Card 4: Central Telefónica */}
            <a
              href="tel:+59133296885"
              className="group relative order-4 block p-6 rounded-3xl bg-white/[0.04] border border-[#0077BD]/20 hover:border-[#0077BD]/50 hover:bg-white/[0.06] transition-all duration-500 hover:-translate-y-1 overflow-hidden"
            >
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ boxShadow: '0 0 40px rgba(0, 119, 189, 0.25)' }}
              />
              <div className="relative z-10 flex flex-col h-full">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: 'rgba(0, 119, 189, 0.15)' }}
                >
                  <Phone className="w-7 h-7 text-[#0077BD]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Central Telefónica
                </h3>
                <p className="text-sm text-white/55 leading-relaxed mb-5 flex-1">
                  ¿Prefieres hablar con un operador? Atendemos tus solicitudes las 24 horas del día.
                </p>
                <button
                  type="button"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-semibold text-white border-2 border-[#0077BD] bg-[#0077BD]/10 hover:bg-[#0077BD]/20 transition-all duration-300"
                  tabIndex={-1}
                >
                  <Phone className="w-4 h-4 text-[#0077BD]" />
                  <span className="text-[#0077BD]">Llamar a Central:</span>
                  <span className="text-white">(3) 3296885</span>
                </button>
              </div>
            </a>

            {/* Card 5: Línea Móvil Directa */}
            <a
              href="tel:+59173662803"
              className="group relative order-5 block p-6 rounded-3xl bg-white/[0.04] border border-[#1D6988]/20 hover:border-[#1D6988]/50 hover:bg-white/[0.06] transition-all duration-500 hover:-translate-y-1 overflow-hidden"
            >
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ boxShadow: '0 0 40px rgba(29, 105, 136, 0.25)' }}
              />
              <div className="relative z-10 flex flex-col h-full">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: 'rgba(29, 105, 136, 0.15)' }}
                >
                  <Smartphone className="w-7 h-7 text-[#1D6988]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Línea Móvil Directa
                </h3>
                <p className="text-sm text-white/55 leading-relaxed mb-5 flex-1">
                  Comunícate directamente con nuestra central desde tu celular para una atención ágil.
                </p>
                <button
                  type="button"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-semibold text-white border-2 border-[#1D6988] bg-[#1D6988]/10 hover:bg-[#1D6988]/20 transition-all duration-300"
                  tabIndex={-1}
                >
                  <Smartphone className="w-4 h-4 text-[#1D6988]" />
                  <span className="text-[#1D6988]">Llamar al Celular:</span>
                  <span className="text-white">73662803</span>
                </button>
              </div>
            </a>

            {/* Card 6: Telegram Bot */}
            <a
              href="https://t.me/EcotaxiBoBot"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative order-6 block p-6 rounded-3xl bg-white/[0.04] border border-[#26A5E4]/20 hover:border-[#26A5E4]/50 hover:bg-white/[0.06] transition-all duration-500 hover:-translate-y-1 overflow-hidden"
            >
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ boxShadow: '0 0 40px rgba(38, 165, 228, 0.25)' }}
              />
              <div className="relative z-10 flex flex-col h-full">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: 'rgba(38, 165, 228, 0.15)' }}
                >
                  <TelegramIcon className="w-7 h-7 text-[#26A5E4]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Bot de Telegram
                </h3>
                <p className="text-sm text-white/55 leading-relaxed mb-5 flex-1">
                  Si usas Telegram, nuestro asistente virtual <span className="text-[#26A5E4]">@EcotaxiBoBot</span> está listo para tomar tu pedido al instante.
                </p>
                <button
                  type="button"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-semibold text-white border-2 border-[#26A5E4] bg-[#26A5E4]/10 hover:bg-[#26A5E4]/20 transition-all duration-300"
                  tabIndex={-1}
                >
                  <TelegramIcon className="w-4 h-4 text-[#26A5E4]" />
                  <span className="text-[#26A5E4]">Abrir Telegram</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </a>
          </div>

          {/* ───────── ROW 4 — Physical & Support Channels (2 columns) ───────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {/* Card 7: Kioskos de Autoservicio */}
            <div className="group relative order-7 p-6 md:p-7 rounded-3xl bg-white/[0.04] border border-[#FF9800]/20 hover:border-[#FF9800]/50 hover:bg-white/[0.06] transition-all duration-500 hover:-translate-y-1 overflow-hidden">
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ boxShadow: '0 0 45px rgba(255, 152, 0, 0.22)' }}
              />
              <div className="relative z-10 flex flex-col h-full">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: 'rgba(255, 152, 0, 0.15)' }}
                >
                  <Monitor className="w-7 h-7 text-[#FF9800]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Kioskos de Autoservicio
                </h3>
                <p className="text-sm text-white/55 leading-relaxed mb-5 flex-1">
                  Pide tu Ecotaxi en segundos desde nuestras pantallas aliadas en centros comerciales, supermercados y hoteles. Sin usar tu teléfono.
                </p>
                <a
                  href="#contacto"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF9800] hover:text-[#FFB74D] transition-colors duration-300"
                >
                  <MapPin className="w-4 h-4" />
                  Ver puntos de atención
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
            </div>

            {/* Card 8: Atención en Redes Sociales */}
            <a
              href="https://m.me/395162460915352"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative order-8 block p-6 md:p-7 rounded-3xl bg-white/[0.04] border border-[#8B5CF6]/20 hover:border-[#8B5CF6]/50 hover:bg-white/[0.06] transition-all duration-500 hover:-translate-y-1 overflow-hidden"
            >
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ boxShadow: '0 0 45px rgba(139, 92, 246, 0.25)' }}
              />
              <div className="relative z-10 flex flex-col h-full">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: 'rgba(139, 92, 246, 0.15)' }}
                >
                  <MessengerIcon className="w-7 h-7 text-[#8B5CF6]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Atención en Redes Sociales
                </h3>
                <p className="text-sm text-white/55 leading-relaxed mb-5 flex-1">
                  ¿Tienes dudas o consultas de soporte? Escríbenos directamente a través de Facebook Messenger.
                </p>
                <button
                  type="button"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:from-[#9F67FF] hover:to-[#8B5CF6] transition-all duration-300 shadow-[0_4px_20px_rgba(139,92,246,0.35)] group-hover:shadow-[0_8px_30px_rgba(139,92,246,0.5)]"
                  tabIndex={-1}
                >
                  <MessengerIcon className="w-5 h-5" />
                  Chatear por Messenger
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </a>
          </div>

        </div>

        {/* ═══════════════════════════════════════════════════════
            PORTAL ACCESS SECTION (kept from original)
            ═══════════════════════════════════════════════════════ */}
        <div className={`mt-20 transition-all duration-700 ${
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
                  style={{ boxShadow: `0 0 30px ${portal.color}15` }} />

                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-2xl ${portal.bgColor} flex items-center justify-center mb-4`}>
                    <portal.icon className="w-7 h-7 text-white" style={{ color: portal.color, filter: 'brightness(1.3)' }} />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-white/90 transition-colors">
                    {portal.title}
                  </h4>
                  <p className="text-sm text-white/40 leading-relaxed mb-4">
                    {portal.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-medium transition-colors" style={{ color: portal.color }}>
                    <span>{portal.title === 'Conductores' ? 'Descargar APP' : 'Acceder al portal'}</span>
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
