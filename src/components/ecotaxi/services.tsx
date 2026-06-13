'use client'

import Link from 'next/link'
import {
  DoorOpen, Bus, Plane, Clock, Route, Map, Building2,
  Calendar, GraduationCap, Heart, Briefcase, PawPrint,
  Package, Truck, Warehouse, Wrench, HardHat, Mountain, ChevronDown
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const services = [
  { icon: DoorOpen, title: 'Puerta a Puerta', desc: 'Te recogemos y llevamos exactamente donde necesitas, con la comodidad de un servicio personalizado puerta a puerta.', href: '/puerta-a-puerta' },
  { icon: Bus, title: 'Bus', desc: 'Servicio de transporte en bus para grupos grandes, eventos corporativos y excursiones con la máxima comodidad.', href: '/bus' },
  { icon: Plane, title: 'Aeropuerto', desc: 'Traslados al aeropuerto con puntualidad garantizada. Monitoreo de vuelos en tiempo real para que nunca esperes.', href: '/aeropuerto' },
  { icon: Clock, title: 'Por Hora', desc: 'Alquila un vehículo con conductor por horas. Ideal para reuniones, diligencias o recorridos a tu ritmo.', href: '/por-hora' },
  { icon: Map, title: 'Interurbano y Turismo', desc: 'Viajes entre ciudades y destinos turísticos de Bolivia con seguridad, confort y la mejor atención. Rutas nacionales y tours guiados.', href: '/interurbano' },
  { icon: Building2, title: 'Corporativo', desc: 'Soluciones de transporte empresarial a medida. Gestión de flota, facturación corporativa y reportes detallados.', href: '/corporativo' },
  { icon: Calendar, title: 'Eventos', desc: 'Transporte coordinado para todo tipo de eventos: bodas, conferencias, conciertos y celebraciones especiales.', href: '/eventos' },
  { icon: GraduationCap, title: 'Transporte Escolar', desc: 'Servicio seguro y confiable para el transporte de estudiantes. Conductores certificados y vehículos monitoreados.', href: '/transporte-escolar' },
  { icon: Heart, title: 'Transporte de Salud', desc: 'Traslado de personal de salud y pacientes con la máxima precaución, puntualidad y cuidado humano.', href: '/transporte-salud' },
  { icon: Briefcase, title: 'Ejecutivo', desc: 'Servicio premium para ejecutivos con vehículos de alta gama, conductores profesionales y total discreción.', href: '/ejecutivo' },
  { icon: PawPrint, title: 'Transporte de Mascotas', desc: 'Tu mascota viaja segura y cómoda. Vehículos adaptados para el transporte de tus compañeros peludos.', href: '/transporte-mascotas' },
  { icon: Package, title: 'Envíos', desc: 'Servicio de entrega de paquetes y documentos con seguimiento en tiempo real y confirmación de entrega.', href: '/envios' },
  { icon: Truck, title: 'Mudanza', desc: 'Mudanzas residenciales y comerciales con personal especializado y vehículos de carga apropiados.', href: '/mudanza' },
  { icon: Warehouse, title: 'Logística', desc: 'Soluciones logísticas integrales para empresas. Cadena de suministro eficiente y rastreo completo.', href: '/logistica' },
  { icon: Wrench, title: 'Auxilio Mecánico', desc: 'Asistencia vial 24/7. Remolque, cambio de neumáticos y soluciones mecánicas en el momento que lo necesitas.', href: '/auxilio-mecanico' },
  { icon: HardHat, title: 'Maquinaria', desc: 'Transporte especializado de maquinaria pesada y equipos con los permisos y seguros correspondientes.', href: '/alquiler-maquinaria' },
  { icon: Mountain, title: 'Aventura', desc: 'Expediciones y aventuras al aire libre con transporte adaptado para los caminos más desafiantes de Bolivia.', href: '/aventura' },
]

export function Services() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [expandedService, setExpandedService] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="servicios" ref={sectionRef} className="relative py-24 md:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(0,230,118,0.4) 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0077BD]/10 border border-[#0077BD]/20 mb-4">
            <span className="text-sm text-[#0077BD]">Servicios Profesionales</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Nuestros{' '}
            <span className="bg-gradient-to-r from-[#0077BD] to-[#00E676] bg-clip-text text-transparent">
              Servicios
            </span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
Más de 17 servicios de transporte diseñados para cubrir cada necesidad. Haz click en cada servicio para ver detalles.
          </p>
        </div>

        {/* Services Grid - compact icons + title, expand on click */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
          {services.map((service, i) => {
            const isExpanded = expandedService === service.title
            return (
              <div
                key={service.title}
                onClick={() => setExpandedService(isExpanded ? null : service.title)}
                className={`group relative p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm cursor-pointer transition-all duration-500 ${
                  isExpanded
                    ? 'border-[#00E676]/30 bg-white/[0.06] sm:col-span-2 lg:col-span-2 xl:col-span-2'
                    : 'hover:border-white/10 hover:bg-white/[0.05]'
                } ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: visible ? `${i * 40}ms` : '0ms' }}
              >
                {/* Glow on hover/active */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-[#00E676]/0 to-[#0077BD]/0 transition-all duration-500 ${
                  isExpanded ? 'from-[#00E676]/5 to-[#0077BD]/5' : 'group-hover:from-[#00E676]/3'
                }`} />

                <div className="relative z-10">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isExpanded ? 'bg-[#00E676]/20' : 'bg-gradient-to-br from-[#0077BD]/20 to-[#00E676]/20'
                    }`}>
                      <service.icon className={`w-5 h-5 transition-colors duration-300 ${
                        isExpanded ? 'text-[#00E676]' : 'text-white/90'
                      }`} />
                    </div>
                    <h3 className={`text-sm font-semibold transition-colors duration-300 ${
                      isExpanded ? 'text-[#00E676]' : 'text-white/80 group-hover:text-white'
                    }`}>
                      {service.title}
                    </h3>
                    <ChevronDown className={`w-4 h-4 text-white/20 ml-auto shrink-0 transition-transform duration-300 ${
                      isExpanded ? 'rotate-180 text-[#00E676]' : ''
                    }`} />
                  </div>

                  {/* Expanded description */}
                  <div className={`overflow-hidden transition-all duration-500 ${
                    isExpanded ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'
                  }`}>
                    <p className="text-sm text-white/50 leading-relaxed">
                      {service.desc}
                    </p>
                    {service.href ? (
                      <Link
                        href={service.href}
                        className="inline-flex items-center gap-1 mt-3 text-xs font-semibold text-[#00E676] hover:text-[#00ff88] transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
Ver servicio →
                      </Link>
                    ) : (
                      <a
                        href="#reservas"
                        className="inline-flex items-center gap-1 mt-3 text-xs font-semibold text-[#00E676] hover:text-[#00ff88] transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Reservar este servicio →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
