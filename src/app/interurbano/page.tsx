'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Route, Map, Mountain, Compass, Shield, Clock, Users, Phone,
  ArrowRight, CheckCircle2, Star, UserCheck, MapPin,
  BadgeCheck, Navigation, Car, Bus, Eye, Globe,
  TreePine, Sun, Camera, Sparkles, ChevronRight, PhoneCall,
  MessageCircle, CalendarDays, Luggage, Waves, Building2, Wallet,
  ShieldCheck, Headphones
} from 'lucide-react'
import { Navbar } from '@/components/ecotaxi/navbar'
import { Footer } from '@/components/ecotaxi/footer'

/* ─────────────────────── scroll-triggered animation hook ──────────────────── */
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

/* ─────────────────────── animated section wrapper ─────────────────────────── */
function AnimatedSection({ children, className = '', delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number
}) {
  const { ref, visible } = useInView(0.08)
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   1. HERO SECTION
   ═══════════════════════════════════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(rgba(14,165,233,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.3) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[#0EA5E9]/12 blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#10B981]/10 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[#F59E0B]/6 blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute top-32 right-[8%] md:right-[18%] opacity-[0.07]"><Mountain className="w-28 h-28 md:w-40 md:h-40 text-[#0EA5E9]" /></div>
      <div className="absolute bottom-28 left-[5%] md:left-[12%] opacity-[0.05]"><Compass className="w-20 h-20 md:w-28 md:h-28 text-[#10B981]" /></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 pb-16">
        <AnimatedSection>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0EA5E9]/10 border border-[#0EA5E9]/25 mb-8 backdrop-blur-sm">
            <Route className="w-4 h-4 text-[#0EA5E9]" />
            <span className="text-sm text-[#0EA5E9] font-medium">Interurbano y Turismo</span>
          </div>
        </AnimatedSection>
        <AnimatedSection delay={100}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Viaja por Bolivia con{' '}
            <span className="bg-gradient-to-r from-[#0EA5E9] via-[#10B981] to-[#0EA5E9] bg-clip-text text-transparent">Confianza</span>
            <br />y Confort
          </h1>
        </AnimatedSection>
        <AnimatedSection delay={200}>
          <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-10 leading-relaxed">
            Recorre las rutas más importantes de Bolivia y descubre destinos turísticos impresionantes
            con la seguridad, puntualidad y comodidad que solo Ecotaxi puede ofrecer.
          </p>
        </AnimatedSection>
        <AnimatedSection delay={300}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <a href="#destinos" className="px-8 py-4 rounded-full text-lg font-semibold text-black bg-[#0EA5E9] hover:bg-[#38BDF8] transition-all duration-300 shadow-[0_0_30px_rgba(14,165,233,0.3)] hover:shadow-[0_0_50px_rgba(14,165,233,0.5)] hover:scale-105">Ver Destinos</a>
            <a href="#contacto" className="px-8 py-4 rounded-full text-lg font-semibold text-[#0EA5E9] border border-[#0EA5E9]/30 hover:border-[#0EA5E9]/60 hover:bg-[#0EA5E9]/5 transition-all duration-300">Reservar Viaje</a>
          </div>
        </AnimatedSection>
        <AnimatedSection delay={400}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { value: '17+', label: 'Rutas Nacionales', icon: Route },
              { value: '24h', label: 'Disponibilidad', icon: Clock },
              { value: '100%', label: 'Seguridad', icon: ShieldCheck },
              { value: 'VIP', label: 'Opcional', icon: Star },
            ].map((stat) => (
              <div key={stat.label} className="p-4 rounded-2xl bg-white/[0.03] border border-[#0EA5E9]/10 backdrop-blur-sm hover:border-[#0EA5E9]/20 transition-all duration-300">
                <stat.icon className="w-5 h-5 text-[#0EA5E9] mx-auto mb-2" />
                <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-white/50 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   2. TWO SERVICE AREAS
   ═══════════════════════════════════════════════════════════════════════════════ */
function ServiceAreasSection() {
  return (
    <section id="servicios" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-[#0EA5E9]/5 blur-[150px]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0EA5E9]/10 border border-[#0EA5E9]/20 mb-4">
              <Compass className="w-4 h-4 text-[#0EA5E9]" />
              <span className="text-sm text-[#0EA5E9]">Dos Modalidades, Un Solo Compromiso</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Servicios <span className="bg-gradient-to-r from-[#0EA5E9] via-[#10B981] to-[#0EA5E9] bg-clip-text text-transparent">Interurbanos y Turísticos</span>
            </h2>
            <p className="text-white/50 max-w-3xl mx-auto text-lg">
              Viajes entre ciudades con la máxima seguridad y experiencias turísticas que te permiten descubrir Bolivia como nunca antes.
            </p>
          </div>
        </AnimatedSection>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <AnimatedSection delay={100}>
            <div className="relative rounded-2xl overflow-hidden bg-white/[0.03] border border-[#0EA5E9]/15 backdrop-blur-sm h-full">
              <div className="relative h-56 overflow-hidden bg-gradient-to-br from-[#0EA5E9]/20 via-[#0d1320] to-[#0a0e17]">
                <div className="absolute inset-0 flex items-center justify-center"><Route className="w-24 h-24 text-[#0EA5E9]/20" /></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e17] via-[#0a0e17]/50 to-transparent" />
                <div className="absolute top-4 left-4"><span className="px-4 py-1.5 rounded-full text-xs font-bold text-white bg-[#0EA5E9] uppercase tracking-wider shadow-[0_0_20px_rgba(14,165,233,0.3)]">Interurbano</span></div>
              </div>
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-[#0EA5E9]/10 flex items-center justify-center"><Route className="w-8 h-8 text-[#0EA5E9]" /></div>
                  <div><h3 className="text-2xl font-bold text-white">Viajes Interurbanos</h3><p className="text-sm text-[#0EA5E9]">Conectamos ciudades de Bolivia</p></div>
                </div>
                <p className="text-white/50 leading-relaxed mb-6">
                  Viajar entre ciudades ya no tiene que ser incómodo o inseguro. En Ecotaxi ofrecemos un servicio de transporte interurbano que combina puntualidad, seguridad y confort adaptado a las rutas nacionales más importantes de Bolivia. Ya sea por negocios, estudios o motivos personales, te llevamos a tu destino con la tranquilidad de viajar en manos profesionales.
                </p>
                <div className="space-y-3 mb-6">
                  {[
                    { icon: Car, text: 'Vehículos cómodos con aire acondicionado' },
                    { icon: UserCheck, text: 'Choferes con experiencia en rutas interurbanas' },
                    { icon: Clock, text: 'Horarios flexibles y salidas programadas' },
                    { icon: Shield, text: 'Seguridad y rastreo GPS durante todo el recorrido' },
                    { icon: MapPin, text: 'Cobertura de las principales rutas nacionales' },
                    { icon: Wallet, text: 'Tarifas transparentes sin costos ocultos' },
                  ].map((item) => (
                    <div key={item.text} className="flex items-start gap-3"><item.icon className="w-4 h-4 text-[#0EA5E9] mt-0.5 shrink-0" /><span className="text-sm text-white/55">{item.text}</span></div>
                  ))}
                </div>
                <div className="p-4 rounded-xl bg-[#0EA5E9]/5 border border-[#0EA5E9]/10">
                  <div className="flex items-center gap-2 mb-2"><Navigation className="w-4 h-4 text-[#0EA5E9]" /><span className="text-xs font-bold text-[#0EA5E9] uppercase tracking-wider">Rutas Personalizadas</span></div>
                  <p className="text-xs text-white/40 leading-relaxed">Coordinamos viajes personalizados a cualquier destino de Bolivia, con paradas intermedias según tu necesidad, recogida en puerta y entrega en la dirección exacta.</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <div className="relative rounded-2xl overflow-hidden bg-white/[0.04] border-2 border-[#10B981]/20 backdrop-blur-sm h-full shadow-[0_0_40px_rgba(16,185,129,0.08)]">
              <div className="relative h-56 overflow-hidden bg-gradient-to-br from-[#10B981]/20 via-[#0d1320] to-[#0a0e17]">
                <div className="absolute inset-0 flex items-center justify-center"><Mountain className="w-24 h-24 text-[#10B981]/20" /></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e17] via-[#0a0e17]/50 to-transparent" />
                <div className="absolute top-4 left-4"><span className="px-4 py-1.5 rounded-full text-xs font-bold text-black bg-[#10B981] uppercase tracking-wider shadow-[0_0_20px_rgba(16,185,129,0.4)]">Turismo</span></div>
                <div className="absolute top-4 right-4"><span className="px-3 py-1 rounded-full text-[10px] font-bold text-[#10B981] bg-[#10B981]/10 border border-[#10B981]/20">EXPERIENCIA COMPLETA</span></div>
              </div>
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-[#10B981]/10 flex items-center justify-center"><Compass className="w-8 h-8 text-[#10B981]" /></div>
                  <div><h3 className="text-2xl font-bold text-white">Turismo y Excursiones</h3><p className="text-sm text-[#10B981]">Descubre Bolivia como nunca antes</p></div>
                </div>
                <p className="text-white/50 leading-relaxed mb-6">
                  Bolivia es uno de los países con mayor diversidad natural y cultural de Sudamérica, y mereces conocerlo con un transporte que esté a la altura de los paisajes que vas a descubrir. Nuestro servicio turístico no es solo un traslado: es el inicio de tu experiencia. Te llevamos a los destinos más impresionantes con guías que conocen cada rincón y vehículos adaptados al terreno.
                </p>
                <div className="space-y-3 mb-6">
                  {[
                    { icon: Map, text: 'Tours guiados a los destinos más impresionantes' },
                    { icon: Globe, text: 'Choferes bilingües disponibles para turistas' },
                    { icon: Camera, text: 'Paradas fotográficas en los mejores miradores' },
                    { icon: CalendarDays, text: 'Itinerarios personalizables a tu gusto' },
                    { icon: Mountain, text: 'Vehículos adaptados a todo tipo de terreno' },
                    { icon: Sparkles, text: 'Experiencias exclusivas y fuera de lo común' },
                  ].map((item) => (
                    <div key={item.text} className="flex items-start gap-3"><item.icon className="w-4 h-4 text-[#10B981] mt-0.5 shrink-0" /><span className="text-sm text-white/55">{item.text}</span></div>
                  ))}
                </div>
                <div className="p-4 rounded-xl bg-[#10B981]/5 border border-[#10B981]/10">
                  <div className="flex items-center gap-2 mb-2"><Sparkles className="w-4 h-4 text-[#10B981]" /><span className="text-xs font-bold text-[#10B981] uppercase tracking-wider">Agencias de Viaje</span></div>
                  <p className="text-xs text-white/40 leading-relaxed">Trabajamos con agencias de viaje y operadores turísticos para ofrecer un servicio integrado de transporte. Si eres una agencia, contáctanos para coordinar los traslados de tus grupos.</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   3. DESTINATIONS
   ═══════════════════════════════════════════════════════════════════════════════ */
const destinations = [
  { icon: Building2, title: 'Santa Cruz - Cochabamba', desc: 'La ruta más transitada del país. Conecta las dos ciudades más dinámicas en un viaje cómodo por la nueva carretera. Aproximadamente 4 horas.', color: '#0EA5E9', tag: 'POPULAR' },
  { icon: Mountain, title: 'Santa Cruz - La Paz', desc: 'Conecta el oriente con la sede de gobierno. Una ruta espectacular que atraviesa pisos ecológicos, desde tierras bajas hasta el altiplano. Aproximadamente 12-14 horas.', color: '#10B981', tag: 'LARGA DISTANCIA' },
  { icon: Sun, title: 'Santa Cruz - Sucre', desc: 'Hacia la Ciudad Blanca, capital constitucional. Un viaje por los valles cruceños con paradas estratégicas. Aproximadamente 8-10 horas.', color: '#F59E0B', tag: 'CULTURAL' },
  { icon: TreePine, title: 'Santa Cruz - Tarija', desc: 'Ruta hacia la tierra del vino. Cruza el Chaco cruceño hasta los valles tarijeños con clima agradable. Aproximadamente 10-12 horas.', color: '#8B5CF6', tag: 'GASTRONÓMICO' },
  { icon: Waves, title: 'Santa Cruz - Trinidad', desc: 'Hacia la capital del Beni, corazón de la Amazonía boliviana. Introducción a la llanura beniana y su biodiversidad única. Aproximadamente 10-12 horas.', color: '#06B6D4', tag: 'NATURALEZA' },
  { icon: Compass, title: 'Ruta Personalizada', desc: '¿Tu destino no aparece? Coordinamos viajes a cualquier ciudad o pueblo de Bolivia. Samaipata, Vallegrande, Roboré, Yacuiba y más. Tú defines el destino, nosotros la ruta.', color: '#E91E63', tag: 'A MEDIDA' },
]

function DestinationsSection() {
  return (
    <section id="destinos" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `radial-gradient(circle, rgba(14,165,233,0.3) 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-[#10B981]/5 blur-[120px]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 mb-4"><Map className="w-4 h-4 text-[#10B981]" /><span className="text-sm text-[#10B981]">Destinos y Rutas</span></div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Rutas <span className="bg-gradient-to-r from-[#0EA5E9] via-[#10B981] to-[#0EA5E9] bg-clip-text text-transparent">Principales</span></h2>
            <p className="text-white/50 max-w-3xl mx-auto text-lg">Conectamos las ciudades más importantes de Bolivia con salidas regulares y servicio de calidad.</p>
          </div>
        </AnimatedSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest, i) => (
            <AnimatedSection key={dest.title} delay={i * 100}>
              <div className="group relative p-6 md:p-7 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-white/10 transition-all duration-500 h-full">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/[0.02] transition-all duration-500" />
                <div className="absolute top-4 right-4"><span className="px-2 py-1 rounded-full text-[10px] font-bold border" style={{ color: dest.color, backgroundColor: `${dest.color}10`, borderColor: `${dest.color}20` }}>{dest.tag}</span></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: `${dest.color}12` }}><dest.icon className="w-6 h-6" style={{ color: dest.color }} /></div>
                  <h3 className="text-lg font-semibold text-white mb-2">{dest.title}</h3>
                  <p className="text-sm text-white/45 leading-relaxed">{dest.desc}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   4. FLEET
   ═══════════════════════════════════════════════════════════════════════════════ */
const travelVehicles = [
  { icon: Car, name: 'Sedán Confort', desc: 'Vehículo cómodo con aire acondicionado para viajes interurbanos de hasta 3-4 pasajeros. Ideal para viajes de negocios o personales donde eficiencia y comodidad son prioridad.', passengers: '3-4', luggage: '2-3', color: '#0EA5E9', tag: 'INDIVIDUAL' },
  { icon: Car, name: 'SUV Todo Terreno', desc: 'Mayor potencia y altura para rutas con caminos irregulares o destinos turísticos de difícil acceso. Viaje estable en carreteras sin asfaltar.', passengers: '4', luggage: '4-5', color: '#10B981', tag: 'INDIVIDUAL' },
  { icon: Car, name: 'Van Ejecutiva', desc: 'La opción ideal para grupos pequeños o familias. Amplio espacio interior, asientos cómodos para trayectos largos y espacio suficiente para el equipaje de todos.', passengers: '6-8', luggage: '6-8', color: '#F59E0B', tag: 'GRUPAL' },
  { icon: Bus, name: 'Bus / Microbús', desc: 'Para grupos grandes, excursiones turísticas o delegaciones empresariales. Capacidad de 12 a 25 pasajeros, equipados con aire acondicionado y asientos reclinables.', passengers: '12-25', luggage: 'Ilimitado', color: '#8B5CF6', tag: 'GRUPAL' },
]

function FleetSection() {
  return (
    <section id="flota" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1a12] to-[#0a0e17]" />
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] rounded-full bg-[#0EA5E9]/5 blur-[150px]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0EA5E9]/10 border border-[#0EA5E9]/20 mb-4"><Car className="w-4 h-4 text-[#0EA5E9]" /><span className="text-sm text-[#0EA5E9]">Flota para Viajes</span></div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Vehículos Según tu <span className="bg-gradient-to-r from-[#0EA5E9] to-[#10B981] bg-clip-text text-transparent">Viaje</span></h2>
            <p className="text-white/50 max-w-3xl mx-auto text-lg">Desde un sedán para viaje individual hasta un bus para excursiones grupales, cada vehículo está seleccionado pensando en la seguridad y el confort.</p>
          </div>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {travelVehicles.map((vehicle, i) => (
            <AnimatedSection key={vehicle.name} delay={i * 100}>
              <div className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-white/10 transition-all duration-500 overflow-hidden">
                <div className="absolute top-4 right-4"><span className={`px-2 py-1 rounded-full text-[10px] font-bold ${vehicle.tag === 'GRUPAL' ? 'bg-[#8B5CF6]/10 text-[#8B5CF6] border border-[#8B5CF6]/20' : 'bg-white/[0.05] text-white/40 border border-white/[0.08]'}`}>{vehicle.tag}</span></div>
                <div className="relative z-10">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${vehicle.color}12` }}><vehicle.icon className="w-7 h-7" style={{ color: vehicle.color }} /></div>
                    <div className="pt-1">
                      <h3 className="text-lg font-semibold text-white">{vehicle.name}</h3>
                      <div className="flex items-center gap-3 text-xs text-white/30 mt-1">
                        <div className="flex items-center gap-1"><Users className="w-3 h-3" /><span>{vehicle.passengers} pasajeros</span></div>
                        <div className="flex items-center gap-1"><Luggage className="w-3 h-3" /><span>{vehicle.luggage} equipaje</span></div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-white/45 leading-relaxed">{vehicle.desc}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   5. WHY CHOOSE US
   ═══════════════════════════════════════════════════════════════════════════════ */
const reasons = [
  { icon: Shield, title: 'Seguridad en Ruta', desc: 'Cada vehículo cuenta con rastreo GPS en tiempo real y nuestro equipo monitorea el viaje desde la salida hasta la llegada.', color: '#0EA5E9' },
  { icon: UserCheck, title: 'Choferes Experimentados', desc: 'Conductores con años de experiencia en rutas nacionales. Conocen cada curva, cada parada segura y cada alternativa en caso de desvío.', color: '#10B981' },
  { icon: Eye, title: 'Monitoreo GPS 24/7', desc: 'Seguimos cada viaje en tiempo real. Tu familia o empresa puede solicitar reportes de ubicación en cualquier momento.', color: '#F59E0B' },
  { icon: Clock, title: 'Puntualidad Garantizada', desc: 'Nuestros choferes llegan siempre con la anticipación necesaria para que tu viaje comience a la hora pactada.', color: '#0EA5E9' },
  { icon: CalendarDays, title: 'Flexibilidad de Horarios', desc: 'Tú decides cuándo salir, cuándo parar y cuándo continuar. Si necesitas una parada para comer o tomar fotos, el chofer se detiene.', color: '#8B5CF6' },
  { icon: Wallet, title: 'Precios Transparentes', desc: 'Conoces el precio antes de abordar. Sin sorpresas, sin tarifas dinámicas, sin costos ocultos. Transparencia total.', color: '#E91E63' },
]

function WhyChooseUsSection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-[#10B981]/5 blur-[120px]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 mb-4"><BadgeCheck className="w-4 h-4 text-[#10B981]" /><span className="text-sm text-[#10B981]">¿Por qué Elegirnos?</span></div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Viaja con la <span className="bg-gradient-to-r from-[#0EA5E9] via-[#10B981] to-[#0EA5E9] bg-clip-text text-transparent">confianza</span> que mereces</h2>
          </div>
        </AnimatedSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, i) => (
            <AnimatedSection key={reason.title} delay={i * 100}>
              <div className="group relative p-6 md:p-7 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-white/10 transition-all duration-500 h-full">
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: `${reason.color}12` }}><reason.icon className="w-6 h-6" style={{ color: reason.color }} /></div>
                  <h3 className="text-lg font-semibold text-white mb-2">{reason.title}</h3>
                  <p className="text-sm text-white/45 leading-relaxed">{reason.desc}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   6. CONTACT
   ═══════════════════════════════════════════════════════════════════════════════ */
function ContactSection() {
  return (
    <section id="contacto" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[#0EA5E9]/8 blur-[150px]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0EA5E9]/10 border border-[#0EA5E9]/20 mb-4"><Phone className="w-4 h-4 text-[#0EA5E9]" /><span className="text-sm text-[#0EA5E9]">Reserva tu Viaje</span></div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Solicita tu <span className="bg-gradient-to-r from-[#0EA5E9] to-[#10B981] bg-clip-text text-transparent">Viaje Interurbano</span></h2>
            <p className="text-white/50 max-w-3xl mx-auto text-lg">Completa el formulario y te contactaremos en minutos con la cotización. También puedes llamarnos o escribirnos por WhatsApp.</p>
          </div>
        </AnimatedSection>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          <AnimatedSection className="lg:col-span-2">
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm">
                <div className="flex items-center gap-4 mb-4"><div className="w-12 h-12 rounded-xl bg-[#0EA5E9]/10 flex items-center justify-center"><Phone className="w-6 h-6 text-[#0EA5E9]" /></div><div><h3 className="text-white font-semibold">Teléfono</h3><p className="text-white/50 text-sm">24 horas</p></div></div>
                <a href="tel:+59133296885" className="text-[#0EA5E9] text-lg font-semibold hover:text-[#38BDF8] transition-colors">(+591) 3 3296885</a>
              </div>
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm">
                <div className="flex items-center gap-4 mb-4"><div className="w-12 h-12 rounded-xl bg-[#10B981]/10 flex items-center justify-center"><MessageCircle className="w-6 h-6 text-[#10B981]" /></div><div><h3 className="text-white font-semibold">WhatsApp</h3><p className="text-white/50 text-sm">Respuesta inmediata</p></div></div>
                <a href="https://wa.me/59133296885" target="_blank" rel="noopener noreferrer" className="text-[#10B981] text-lg font-semibold hover:text-[#34D399] transition-colors">Enviar WhatsApp</a>
              </div>
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm">
                <div className="flex items-center gap-4 mb-4"><div className="w-12 h-12 rounded-xl bg-[#F59E0B]/10 flex items-center justify-center"><Headphones className="w-6 h-6 text-[#F59E0B]" /></div><div><h3 className="text-white font-semibold">Central de Despacho</h3><p className="text-white/50 text-sm">Atención 24/7</p></div></div>
                <p className="text-white/60 text-sm">Nuestra central está disponible las 24 horas para atenderte y cotizar tu viaje.</p>
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={200} className="lg:col-span-3">
            <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm">
              <form className="space-y-4" onSubmit={async (e) => {
                e.preventDefault()
                const form = e.currentTarget
                const data: Record<string, string> = {}
                new FormData(form).forEach((value, key) => { data[key] = value.toString() })
                try {
                  await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ type: 'interurbano', formData: data }),
                  })
                } catch (err) { console.error('Error sending form:', err) }
                alert('Solicitud enviada correctamente. Nos comunicaremos con usted pronto.')
              }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className="text-xs text-white/40 uppercase tracking-wider mb-1 block">Nombre</label><input name="nombre" className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#0EA5E9]/50 transition-colors" placeholder="Tu nombre" /></div>
                  <div><label className="text-xs text-white/40 uppercase tracking-wider mb-1 block">Teléfono</label><input name="telefono" className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#0EA5E9]/50 transition-colors" placeholder="+591 XXXXXXXX" /></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className="text-xs text-white/40 uppercase tracking-wider mb-1 block">Origen</label><input name="origen" className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#0EA5E9]/50 transition-colors" placeholder="Ciudad de origen" /></div>
                  <div><label className="text-xs text-white/40 uppercase tracking-wider mb-1 block">Destino</label><input name="destino" className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#0EA5E9]/50 transition-colors" placeholder="Ciudad de destino" /></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div><label className="text-xs text-white/40 uppercase tracking-wider mb-1 block">Fecha</label><input type="date" name="fecha" className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-[#0EA5E9]/50 transition-colors" /></div>
                  <div><label className="text-xs text-white/40 uppercase tracking-wider mb-1 block">Pasajeros</label><select name="pasajeros" className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-[#0EA5E9]/50 transition-colors"><option value="" className="bg-[#0a0e17]">Seleccionar</option><option value="1" className="bg-[#0a0e17]">1</option><option value="2" className="bg-[#0a0e17]">2</option><option value="3-4" className="bg-[#0a0e17]">3-4</option><option value="5-8" className="bg-[#0a0e17]">5-8</option><option value="9+" className="bg-[#0a0e17]">9+</option></select></div>
                  <div><label className="text-xs text-white/40 uppercase tracking-wider mb-1 block">Tipo</label><select name="tipo" className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-[#0EA5E9]/50 transition-colors"><option value="" className="bg-[#0a0e17]">Seleccionar</option><option value="interurbano" className="bg-[#0a0e17]">Interurbano</option><option value="turismo" className="bg-[#0a0e17]">Turismo</option><option value="ida-vuelta" className="bg-[#0a0e17]">Ida y Vuelta</option></select></div>
                </div>
                <div><label className="text-xs text-white/40 uppercase tracking-wider mb-1 block">Mensaje</label><textarea name="mensaje" rows={3} className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#0EA5E9]/50 transition-colors resize-none" placeholder="Requisitos adicionales..." /></div>
                <button type="submit" className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-lg font-bold text-black bg-[#0EA5E9] hover:bg-[#38BDF8] transition-all duration-300 shadow-[0_0_40px_rgba(14,165,233,0.3)] hover:shadow-[0_0_60px_rgba(14,165,233,0.5)] hover:scale-[1.02]">Solicitar Cotización <ArrowRight className="w-5 h-5" /></button>
              </form>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════════════════════ */
export default function InterurbanoPage() {
  return (
    <main className="min-h-screen bg-[#0a0e17]">
      <Navbar />
      <HeroSection />
      <ServiceAreasSection />
      <DestinationsSection />
      <FleetSection />
      <WhyChooseUsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
