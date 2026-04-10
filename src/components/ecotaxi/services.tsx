'use client'

import {
  DoorOpen, Bus, Plane, Clock, Route, Map, Building2,
  Calendar, GraduationCap, Heart, Briefcase, PawPrint,
  Package, Truck, Warehouse, Wrench, HardHat, Mountain
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const services = [
  { icon: DoorOpen, title: 'Puerta a Puerta', desc: 'Te recogemos y llevamos exactamente donde necesitas, con la comodidad de un servicio personalizado puerta a puerta.' },
  { icon: Bus, title: 'Bus', desc: 'Servicio de transporte en bus para grupos grandes, eventos corporativos y excursiones con la máxima comodidad.' },
  { icon: Plane, title: 'Aeropuerto', desc: 'Traslados al aeropuerto con puntualidad garantizada. Monitoreo de vuelos en tiempo real para que nunca esperes.' },
  { icon: Clock, title: 'Por Hora', desc: 'Alquila un vehículo con conductor por horas. Ideal para reuniones, diligencias o recorridos a tu ritmo.' },
  { icon: Route, title: 'Interurbano', desc: 'Viajes entre ciudades con la seguridad y confort que caracteriza a Ecotaxi. Rutas nacionales cubiertas.' },
  { icon: Map, title: 'Turismo', desc: 'Descubre los destinos más impresionantes de Bolivia con nuestros tours guiados y transporte turístico exclusivo.' },
  { icon: Building2, title: 'Corporativo', desc: 'Soluciones de transporte empresarial a medida. Gestión de flota, facturación corporativa y reportes detallados.' },
  { icon: Calendar, title: 'Eventos', desc: 'Transporte coordinado para todo tipo de eventos: bodas, conferencias, conciertos y celebraciones especiales.' },
  { icon: GraduationCap, title: 'Transporte Escolar', desc: 'Servicio seguro y confiable para el transporte de estudiantes. Conductores certificados y vehículos monitoreados.' },
  { icon: Heart, title: 'Transporte de Salud', desc: 'Traslado de personal de salud y pacientes con la máxima precaución, puntualidad y cuidado humano.' },
  { icon: Briefcase, title: 'Ejecutivo', desc: 'Servicio premium para ejecutivos con vehículos de alta gama, conductores profesionales y total discreción.' },
  { icon: PawPrint, title: 'Transporte de Mascotas', desc: 'Tu mascota viaja segura y cómoda. Vehículos adaptados para el transporte de tus compañeros peludos.' },
  { icon: Package, title: 'Envíos', desc: 'Servicio de entrega de paquetes y documentos con seguimiento en tiempo real y confirmación de entrega.' },
  { icon: Truck, title: 'Mudanza', desc: 'Mudanzas residenciales y comerciales con personal especializado y vehículos de carga apropiados.' },
  { icon: Warehouse, title: 'Logística', desc: 'Soluciones logísticas integrales para empresas. Cadena de suministro eficiente y rastreo completo.' },
  { icon: Wrench, title: 'Auxilio Mecánico', desc: 'Asistencia vial 24/7. Remolque, cambio de neumáticos y soluciones mecánicas en el momento que lo necesitas.' },
  { icon: HardHat, title: 'Maquinaria', desc: 'Transporte especializado de maquinaria pesada y equipos con los permisos y seguros correspondientes.' },
  { icon: Mountain, title: 'Aventura', desc: 'Expediciones y aventuras al aire libre con transporte adaptado para los caminos más desafiantes de Bolivia.' },
]

export function Services() {
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
            Más de 17 servicios de transporte diseñados para cubrir cada necesidad, con el compromiso ecológico que nos distingue.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`group relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-[#00E676]/30 hover:bg-white/[0.05] transition-all duration-500 cursor-pointer ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: visible ? `${i * 50}ms` : '0ms' }}
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#00E676]/0 to-[#0077BD]/0 group-hover:from-[#00E676]/5 group-hover:to-[#0077BD]/5 transition-all duration-500" />

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0077BD]/20 to-[#00E676]/20 flex items-center justify-center mb-4 group-hover:from-[#0077BD]/30 group-hover:to-[#00E676]/30 transition-all duration-300">
                  <service.icon className="w-6 h-6 text-[#00E676]" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#00E676] transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed">
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
