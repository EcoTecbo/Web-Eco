'use client'

import { useState, useEffect, useRef } from 'react'
import { Menu, X, Phone, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { label: 'Inicio', href: '/' },
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Servicios', href: '/#servicios', isHash: true },
  { label: 'Flota', href: '/#flota', isHash: true },
  { label: 'Sostenibilidad', href: '/#sostenibilidad', isHash: true },
  { label: 'Conductores', href: '/#conductores', isHash: true },
  { label: 'Canales', href: '/#multicanal', isHash: true },
  { label: 'Reservas', href: '/#reservas', isHash: true },
]

const servicePages = [
  { label: 'Puerta a Puerta', href: '/puerta-a-puerta' },
  { label: 'Servicio por Hora', href: '/por-hora' },
  { label: 'Ejecutivo VIP', href: '/ejecutivo' },
  { label: 'Traslado Aeropuerto', href: '/aeropuerto' },
  { label: 'Interurbano y Turismo', href: '/interurbano' },
  { label: 'Servicios Corporativos', href: '/corporativo' },
  { label: 'Transporte de Salud', href: '/transporte-salud' },
  { label: 'Envíos y Mensajería', href: '/envios' },
  { label: 'Auxilio Mecánico', href: '/auxilio-mecanico' },
]

/* ─── Animated Taxi SVG Icon ─── */
function TaxiIcon() {
  return (
    <svg width="34" height="20" viewBox="0 0 34 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Exhaust trail particles */}
      <circle cx="0" cy="16" r="1.5" fill="#00E676" opacity="0.3">
        <animate attributeName="cx" from="2" to="-4" dur="0.6s" repeatCount="indefinite" />
        <animate attributeName="opacity" from="0.3" to="0" dur="0.6s" repeatCount="indefinite" />
      </circle>
      <circle cx="1" cy="17" r="1" fill="#00E676" opacity="0.2">
        <animate attributeName="cx" from="3" to="-6" dur="0.8s" repeatCount="indefinite" />
        <animate attributeName="opacity" from="0.2" to="0" dur="0.8s" repeatCount="indefinite" />
      </circle>

      {/* Car body */}
      <rect x="5" y="5" width="22" height="9" rx="2.5" fill="#00E676" />
      {/* Car roof / cabin */}
      <path d="M9 5 L11 1.5 L21 1.5 L23 5" fill="#009E4F" stroke="#008040" strokeWidth="0.3" />
      {/* Taxi sign on roof */}
      <rect x="13" y="0.5" width="6" height="2" rx="0.7" fill="#FFEB3B" opacity="0.9" />
      <rect x="14" y="1" width="4" height="1" rx="0.3" fill="#FFC107" />

      {/* Windshield */}
      <rect x="22" y="5.5" width="4" height="6.5" rx="1.2" fill="#0a0e17" opacity="0.55" />
      {/* Rear window */}
      <rect x="5.5" y="5.5" width="3.5" height="6.5" rx="1.2" fill="#0a0e17" opacity="0.4" />
      {/* Side window */}
      <rect x="11" y="2.5" width="10" height="3" rx="0.8" fill="#0a0e17" opacity="0.35" />

      {/* Headlight glow */}
      <circle cx="27" cy="10" r="1.5" fill="#FFEB3B" opacity="0.6" />
      <circle cx="27" cy="10" r="2.5" fill="#FFEB3B" opacity="0.15" />
      {/* Tail light */}
      <rect x="4.5" y="8" width="1.5" height="3" rx="0.5" fill="#FF1744" opacity="0.8" />

      {/* Wheels with spinning animation */}
      {/* Rear wheel */}
      <circle cx="11" cy="15" r="3" fill="#1a1a2e" />
      <circle cx="11" cy="15" r="2" fill="#2a2a3e" stroke="#444" strokeWidth="0.3" />
      <g>
        <animateTransform attributeName="transform" type="rotate" from="0 11 15" to="360 11 15" dur="0.4s" repeatCount="indefinite" />
        <line x1="11" y1="13" x2="11" y2="17" stroke="#666" strokeWidth="0.4" />
        <line x1="9" y1="15" x2="13" y2="15" stroke="#666" strokeWidth="0.4" />
        <line x1="9.6" y1="13.6" x2="12.4" y2="16.4" stroke="#666" strokeWidth="0.3" />
        <line x1="12.4" y1="13.6" x2="9.6" y2="16.4" stroke="#666" strokeWidth="0.3" />
      </g>
      <circle cx="11" cy="15" r="0.8" fill="#888" />

      {/* Front wheel */}
      <circle cx="22" cy="15" r="3" fill="#1a1a2e" />
      <circle cx="22" cy="15" r="2" fill="#2a2a3e" stroke="#444" strokeWidth="0.3" />
      <g>
        <animateTransform attributeName="transform" type="rotate" from="0 22 15" to="360 22 15" dur="0.4s" repeatCount="indefinite" />
        <line x1="22" y1="13" x2="22" y2="17" stroke="#666" strokeWidth="0.4" />
        <line x1="20" y1="15" x2="24" y2="15" stroke="#666" strokeWidth="0.4" />
        <line x1="20.6" y1="13.6" x2="23.4" y2="16.4" stroke="#666" strokeWidth="0.3" />
        <line x1="23.4" y1="13.6" x2="20.6" y2="16.4" stroke="#666" strokeWidth="0.3" />
      </g>
      <circle cx="22" cy="15" r="0.8" fill="#888" />

      {/* Door line */}
      <line x1="16" y1="5.5" x2="16" y2="13" stroke="#008040" strokeWidth="0.4" opacity="0.6" />
      {/* Door handle */}
      <rect x="17" y="9" width="1.5" height="0.6" rx="0.3" fill="#008040" opacity="0.5" />

      {/* Front bumper */}
      <rect x="26" y="12" width="2" height="2.5" rx="0.5" fill="#0077BD" opacity="0.7" />
      {/* Undercarriage shadow */}
      <ellipse cx="16" cy="18.5" rx="10" ry="1" fill="#00E676" opacity="0.08" />
    </svg>
  )
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    if (href.startsWith('/#')) return pathname === '/'
    return pathname === href
  }

  const isServiceActive = servicePages.some(s => pathname === s.href)

  // Open with immediate response, close with 600ms delay
  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    setServicesOpen(true)
  }

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setServicesOpen(false)
    }, 600)
  }

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
    }
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0e17]/90 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <img
              src="/logo-ecotaxi.png"
              alt="Ecotaxi Logo"
              className="h-9 md:h-11 w-auto object-contain drop-shadow-[0_0_10px_rgba(0,230,118,0.15)]"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors duration-200 relative group ${
                  isActive(link.href) ? 'text-[#00E676]' : 'text-white/85 hover:text-white'
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#00E676] transition-all duration-300 ${
                  isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            ))}

            {/* Services Dropdown with 600ms close delay */}
            <div className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => setServicesOpen(prev => !prev)}
                className={`flex items-center gap-1 text-sm transition-colors duration-200 ${
                  isServiceActive ? 'text-[#00E676]' : 'text-white/85 hover:text-white'
                }`}>
                Servicios
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {servicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 rounded-xl bg-[#0d1320]/95 backdrop-blur-xl border border-white/[0.08] shadow-xl shadow-black/30 overflow-hidden z-50"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {servicePages.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      className={`block px-4 py-3 text-sm transition-colors duration-200 ${
                        pathname === service.href
                          ? 'text-[#00E676] bg-[#00E676]/5'
                          : 'text-white/85 hover:text-white hover:bg-white/5'
                      }`}
                      onClick={() => setServicesOpen(false)}
                    >
                      {service.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:73662803"
              className="flex items-center gap-2 text-white hover:text-[#00E676] text-base font-bold transition-colors"
            >
              <Phone className="w-5 h-5 text-[#00E676]" />
              <span className="drop-shadow-[0_0_8px_rgba(0,230,118,0.3)]">73662803</span>
            </a>
            <Link
              href="/#reservas"
              className="relative px-6 py-2.5 rounded-full text-sm font-semibold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all duration-300 shadow-[0_0_20px_rgba(0,230,118,0.3)] hover:shadow-[0_0_30px_rgba(0,230,118,0.5)]"
            >
              Pedir Taxi
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Animated Taxi Track - runs along the bottom of the navbar */}
      <div className="navbar-taxi-track">
        <div className="navbar-taxi-track-gradient" />
        <div className="navbar-taxi-trail" />
        <div className="navbar-taxi-icon">
          <TaxiIcon />
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          mobileOpen ? 'max-h-[700px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-[#0a0e17]/95 backdrop-blur-xl border-t border-white/5 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block py-2 text-lg transition-colors ${
                isActive(link.href) ? 'text-[#00E676]' : 'text-white/70'
              }`}
            >
              {link.label}
            </Link>
          ))}
          {/* Mobile service pages - expandable */}
          <div className="border-t border-white/5 pt-3">
            <button
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="flex items-center justify-between w-full py-2 px-2 text-lg text-white/70"
            >
              <span>Servicios</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${mobileServicesOpen ? 'max-h-[500px]' : 'max-h-0'}`}>
              {servicePages.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  onClick={() => { setMobileOpen(false); setMobileServicesOpen(false) }}
                  className={`block py-2 px-4 text-base transition-colors ${
                    pathname === service.href ? 'text-[#00E676]' : 'text-white/60'
                  }`}
                >
                  {service.label}
                </Link>
              ))}
            </div>
          </div>
          <Link
            href="/#reservas"
            onClick={() => setMobileOpen(false)}
            className="block w-full text-center px-6 py-3 rounded-full text-sm font-semibold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all mt-2"
          >
            Pedir Taxi
          </Link>
        </div>
      </div>
    </nav>
  )
}
