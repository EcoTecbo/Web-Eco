'use client'

import Link from 'next/link'
import { Leaf, Facebook, Instagram, Linkedin, Youtube, Phone, Mail, MapPin } from 'lucide-react'

const serviceLinks = [
  { label: 'Puerta a Puerta', href: '/puerta-a-puerta' },
  { label: 'Servicio por Hora', href: '/por-hora' },
  { label: 'Ejecutivo VIP', href: '/ejecutivo' },
  { label: 'Aeropuerto', href: '/aeropuerto' },
  { label: 'Corporativo', href: '/corporativo' },
  { label: 'Transporte de Salud', href: '/transporte-salud' },
  { label: 'Interurbano y Turismo', href: '/interurbano' },
  { label: 'Envíos y Mensajería', href: '/envios' },
  { label: 'Auxilio Mecánico', href: '/auxilio-mecanico' },
  { label: 'Transporte Escolar', href: '/transporte-escolar' },
  { label: 'Transporte de Mascotas', href: '/transporte-mascotas' },
  { label: 'Aventura', href: '/aventura' },
  { label: 'Eventos', href: '/eventos' },
  { label: 'Mudanza', href: '/mudanza' },
  { label: 'Logística y Distribución', href: '/logistica' },
]

const workLinks = [
  { label: 'Agencias de viaje', href: '/corporativo' },
  { label: 'Organizadores de eventos', href: '/#multicanal' },
  { label: 'Socios de transporte', href: '/#multicanal' },
  { label: 'Afiliados', href: '/#multicanal' },
  { label: 'Conductores', href: '/#multicanal' },
  { label: 'Aerolíneas', href: '/aeropuerto' },
]

const benefitLinks = [
  { label: 'Plan de millas', href: '/#inicio' },
  { label: 'Descuentos especiales', href: '/corporativo' },
  { label: 'Servicios especiales', href: '/#servicios' },
  { label: 'Promociones', href: '/#inicio' },
]

export function Footer() {
  return (
    <footer className="relative bg-[#060a12] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/">
              <img
                src="https://static.wixstatic.com/media/93e1f3_ab4f7e0b7c2e4f4ba3e0be8f1c2a8f44~mv2.png/v1/fill/w_247,h_104,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Logo%20Vector%20Ecotaxi.png"
                alt="Ecotaxi Logo"
                className="h-10 w-auto mb-4"
              />
            </Link>
            <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-xs">
              Eco Taxi es un servicio de O&C Ingeniería y Representaciones SRL. Primera empresa de transporte
              en Bolivia con plan de neutralización de CO2.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-white/40 text-sm">
                <Phone className="w-4 h-4 text-[#0077BD]" />
                <span>(+591) 3 3296885</span>
              </div>
              <div className="flex items-center gap-2 text-white/40 text-sm">
                <Mail className="w-4 h-4 text-[#0077BD]" />
                <span>ecotaxi@oyc-srl.com</span>
              </div>
              <div className="flex items-center gap-2 text-white/40 text-sm">
                <MapPin className="w-4 h-4 text-[#0077BD]" />
                <span>Santa Cruz de la Sierra, Bolivia</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[
                { icon: Facebook, href: 'https://facebook.com/ecotaxibolivia' },
                { icon: Instagram, href: 'https://instagram.com/ecotaxibo' },
                { icon: Linkedin, href: 'https://linkedin.com/company/ecotaxibolivia' },
                { icon: Youtube, href: '#' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/[0.05] flex items-center justify-center text-white/40 hover:text-[#00E676] hover:bg-white/[0.08] transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Servicios</h3>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/40 hover:text-[#00E676] text-sm transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Work With Us Column */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Trabaja con Nosotros</h3>
            <ul className="space-y-2">
              {workLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/40 hover:text-[#00E676] text-sm transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits Column */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Beneficios</h3>
            <ul className="space-y-2">
              {benefitLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/40 hover:text-[#00E676] text-sm transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Eco Badge */}
            <div className="mt-8 p-4 rounded-2xl bg-[#00E676]/5 border border-[#00E676]/10">
              <div className="flex items-center gap-2 mb-2">
                <Leaf className="w-5 h-5 text-[#00E676]" />
                <span className="text-sm font-semibold text-[#00E676]">Certificación Eco</span>
              </div>
              <p className="text-xs text-white/30">
                Plan de Medición, Reducción y Neutralización de emisiones GEI
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs">
            &copy; {new Date().getFullYear()} ecotaxi-bo.com — Todos los derechos reservados
          </p>
          <div className="flex items-center gap-4">
            <Link href="/nosotros" className="text-white/20 hover:text-white/40 text-xs transition-colors">
              Nosotros
            </Link>
            <a href="#" className="text-white/20 hover:text-white/40 text-xs transition-colors">
              Política de Privacidad
            </a>
            <a href="#" className="text-white/20 hover:text-white/40 text-xs transition-colors">
              Términos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
