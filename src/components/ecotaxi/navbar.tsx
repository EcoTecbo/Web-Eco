'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Phone, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { label: 'Inicio', href: '/' },
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Servicios', href: '/#servicios', isHash: true },
  { label: 'Flota', href: '/#flota', isHash: true },
  { label: 'Arbolímetro', href: '/#arbolimetro', isHash: true },
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
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
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
          <Link href="/" className="flex items-center gap-2">
            <img
              src="https://static.wixstatic.com/media/93e1f3_ab4f7e0b7c2e4f4ba3e0be8f1c2a8f44~mv2.png/v1/fill/w_247,h_104,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Logo%20Vector%20Ecotaxi.png"
              alt="Ecotaxi Logo"
              className="h-10 md:h-12 w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors duration-200 relative group ${
                  isActive(link.href) ? 'text-[#00E676]' : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#00E676] transition-all duration-300 ${
                  isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            ))}

            {/* Services Dropdown */}
            <div className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button className={`flex items-center gap-1 text-sm transition-colors duration-200 ${
                pathname === '/aeropuerto' || pathname === '/corporativo' || pathname === '/puerta-a-puerta' || pathname === '/por-hora' || pathname === '/ejecutivo' || pathname === '/transporte-salud' || pathname === '/interurbano' ? 'text-[#00E676]' : 'text-white/70 hover:text-white'
              }`}>
                Servicios
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {servicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 rounded-xl bg-[#0d1320]/95 backdrop-blur-xl border border-white/[0.08] shadow-xl shadow-black/30 overflow-hidden z-50">
                  {servicePages.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      className={`block px-4 py-3 text-sm transition-colors duration-200 ${
                        pathname === service.href
                          ? 'text-[#00E676] bg-[#00E676]/5'
                          : 'text-white/70 hover:text-white hover:bg-white/5'
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
              href="tel:+59133296885"
              className="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors"
            >
              <Phone className="w-4 h-4" />
              (+591) 3 3296885
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

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          mobileOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
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
          {/* Mobile service pages */}
          <div className="border-t border-white/5 pt-3">
            <p className="text-xs text-white/30 uppercase tracking-wider mb-2 px-2">Servicios</p>
            {servicePages.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                onClick={() => setMobileOpen(false)}
                className={`block py-2 px-2 text-lg transition-colors ${
                  pathname === service.href ? 'text-[#00E676]' : 'text-white/70'
                }`}
              >
                {service.label}
              </Link>
            ))}
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
