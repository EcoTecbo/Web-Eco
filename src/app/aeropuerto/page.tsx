'use client'

import { useEffect, useRef, useState } from 'react'
import anime from 'animejs'
import {
  Plane, Shield, MapPin, Clock, Users, CreditCard,
  Luggage, Phone, ChevronDown, ArrowRight, Star,
  Eye, Wifi, Droplets, BadgeCheck, CheckCircle2,
  Building2, Globe, Heart, UserCheck, Navigation,
  AlertCircle, Calendar, User
} from 'lucide-react'
import { Navbar } from '@/components/ecotaxi/navbar'
import { Footer } from '@/components/ecotaxi/footer'

interface Airport {
  department: string
  name: string
  iata: string
  desc: string
  color: string
}

const airports: Airport[] = [
  { department: 'lapaz', name: 'Aeropuerto Internacional El Alto', iata: 'LPB', desc: 'Principal hub internacional de Bolivia, ubicado a 4,061 msnm en La Paz. Conexiones con vuelos internacionales y nacionales.', color: '#0077BD' },
  { department: 'santacruz', name: 'Aeropuerto Internacional Viru Viru', iata: 'VVI', desc: 'El aeropuerto más grande de Bolivia. Principal puerta de entrada al oriente boliviano con vuelos internacionales directos.', color: '#00E676' },
  { department: 'cochabamba', name: 'Aeropuerto Internacional Jorge Wilstermann', iata: 'CBB', desc: 'Hub nacional de conexiones. Ubicado en el corazón de Bolivia, conecta con todas las ciudades principales del país.', color: '#FF9800' },
  { department: 'tarija', name: 'Aeropuerto Capitán Oriel Lea Plaza', iata: 'TJA', desc: 'Puerta de entrada al sur de Bolivia y la región vinícola. Vuelos nacionales regulares.', color: '#8B5CF6' },
  { department: 'sucre', name: 'Aeropuerto Alcantarí', iata: 'SRE', desc: 'Aeropuerto de la capital constitucional de Bolivia. Conexiones con las principales ciudades.', color: '#E91E63' },
  { department: 'oruro', name: 'Aeropuerto Juan Mendoza', iata: 'ORU', desc: 'Aeropuerto de la capital folklórica de Bolivia. Servicio de vuelos nacionales.', color: '#00BCD4' },
  { department: 'potosi', name: 'Aeropuerto Capitán Nicolás Rojas', iata: 'POI', desc: 'Puerta de entrada a Potosí y el Salar de Uyuni. Vuelos nacionales.', color: '#9C27B0' },
  { department: 'beni', name: 'Aeropuerto Teniente Jorge Henrich Arauz', iata: 'TDD', desc: 'Aeropuerto de Trinidad, puerta de entrada a la Amazonía boliviana.', color: '#4CAF50' },
  { department: 'pando', name: 'Aeropuerto Aníbal Arab', iata: 'CIJ', desc: 'Aeropuerto de Cobija, en la región amazónica norte de Bolivia.', color: '#FF5722' },
]

const securityFeatures = [
  { icon: BadgeCheck, title: 'Conductor Identificado', desc: 'Todos nuestros conductores portan identificación visible y uniforme corporativo.' },
  { icon: UserCheck, title: 'Cartel de Bienvenida', desc: 'Su nombre en un cartel personalizado para una recogida sin complicaciones.' },
  { icon: Navigation, title: 'Seguimiento de Vuelo', desc: 'Monitoreamos su vuelo en tiempo real para ajustar la hora de recogida.' },
  { icon: Clock, title: 'Disponibilidad 24/7', desc: 'Servicio de recogida en aeropuerto las 24 horas, los 7 días de la semana.' },
  { icon: Eye, title: 'Vehículos Monitoreados', desc: 'GPS en todas las unidades para rastreo y seguridad en tiempo real.' },
  { icon: Shield, title: 'Protocolos de Emergencia', desc: 'Procedimientos de seguridad y atención en caso de cualquier eventualidad.' },
]

const airportVehicles = [
  { name: 'Sedan Confort', passengers: 4, ac: true, luggage: '2 grandes, 2 pequeños', desc: 'Vehículo confortable con aire acondicionado para traslados individuales o familiares.', color: '#0077BD' },
  { name: 'SUV', passengers: 4, ac: true, luggage: '3 grandes, 3 pequeños', desc: 'Amplio espacio para equipaje, ideal para viajes con carga adicional.', color: '#00E676' },
  { name: 'Van VIP', passengers: 8, ac: true, luggage: '6 grandes, 4 pequeños', desc: 'Para grupos y delegaciones empresariales con máximo confort.', color: '#FF9800' },
  { name: 'MiniBus', passengers: 12, ac: true, luggage: 'Equipaje grupal amplio', desc: 'Solución para grupos grandes, tours y eventos corporativos.', color: '#8B5CF6' },
  { name: 'Sedan VIP', passengers: 4, ac: true, luggage: '2 grandes, 2 pequeños', desc: 'Servicio ejecutivo premium con conductor profesional y total discreción.', color: '#E91E63' },
]

const scheduledIncludes = [
  { icon: UserCheck, title: 'Cartel de Bienvenida', desc: 'Con su nombre impreso para una identificación inmediata a su llegada.' },
  { icon: Navigation, title: 'Seguimiento de Vuelo', desc: 'Monitoreo en tiempo real para ajustar la hora si hay retrasos.' },
  { icon: Clock, title: 'Espera sin Cargo', desc: 'Sin costo adicional por retrasos de vuelo. Le esperamos el tiempo necesario.' },
  { icon: Luggage, title: 'Asistencia con Equipaje', desc: 'Nuestro conductor le ayuda con sus maletas y equipaje.' },
  { icon: Droplets, title: 'Agua y WiFi', desc: 'Botella de agua cortesía y conexión WiFi en el vehículo.' },
]

// Simplified SVG paths for Bolivia departments
const departmentPaths: Record<string, string> = {
  pando: 'M80,20 L120,15 L140,30 L130,60 L100,65 L70,50 Z',
  beni: 'M60,65 L130,60 L160,80 L170,130 L130,150 L80,140 L50,110 Z',
  lapaz: 'M30,50 L70,50 L80,70 L70,100 L40,95 L20,70 Z',
  cochabamba: 'M40,95 L70,100 L100,110 L110,150 L80,160 L50,140 L30,120 Z',
  santacruz: 'M100,110 L170,80 L220,90 L240,140 L220,190 L170,200 L110,170 L100,150 Z',
  oruro: 'M20,70 L40,95 L50,140 L30,120 L10,100 Z',
  potosi: 'M30,120 L50,140 L80,160 L90,200 L60,220 L30,190 L15,150 Z',
  sucre: 'M80,160 L110,170 L130,180 L120,210 L90,220 L70,210 Z',
  tarija: 'M60,220 L90,220 L100,250 L80,270 L50,260 L40,240 Z',
}

export default function AeropuertoPage() {
  const planeRef = useRef<SVGSVGElement>(null)
  const driverRef = useRef<HTMLDivElement>(null)
  const [selectedDept, setSelectedDept] = useState<string>('santacruz')
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())

  // Anime.js hero animations
  useEffect(() => {
    // Plane landing animation
    if (planeRef.current) {
      anime({
        targets: planeRef.current,
        translateX: [400, 0],
        translateY: [-200, 0],
        scale: [1.5, 1],
        rotate: [-15, -5],
        opacity: [0, 1],
        duration: 2000,
        easing: 'easeOutCubic',
      })
    }

    // Driver with sign animation
    if (driverRef.current) {
      anime({
        targets: driverRef.current,
        translateX: [-100, 0],
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 1500,
        delay: 800,
        easing: 'easeOutBack',
      })
    }
  }, [])

  // Scroll observer
  useEffect(() => {
    const sections = ['security', 'map', 'tracking', 'reservation', 'trust', 'vehicles', 'scheduled']
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set(prev).add(entry.target.id))
          }
        })
      },
      { threshold: 0.1 }
    )
    sections.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const selectedAirport = airports.find(a => a.department === selectedDept)

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0e17]">
      <Navbar />
      <main className="flex-1">
        {/* Hero with anime.js */}
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-20">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17]/50 via-[#0a0e17]/80 to-[#0a0e17]" />
            <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full bg-[#0077BD]/15 blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-[#00E676]/10 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `linear-gradient(rgba(0,119,189,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,119,189,0.3) 1px, transparent 1px)`,
                backgroundSize: '60px 60px',
              }}
            />
          </div>

          {/* Animated Plane SVG */}
          <svg ref={planeRef} className="absolute top-16 right-[10%] w-32 h-32 md:w-48 md:h-48 opacity-0" viewBox="0 0 100 100" fill="none">
            <path d="M90 50L70 45L55 20L50 15L45 20L42 40L25 48L15 45L10 50L30 58L35 70L28 78L38 74L42 68L55 62L58 80L53 85L60 82L65 70L85 58L90 55Z" fill="url(#planeGrad)" stroke="rgba(0,230,118,0.5)" strokeWidth="0.5"/>
            <defs>
              <linearGradient id="planeGrad" x1="0" y1="0" x2="100" y2="100">
                <stop offset="0%" stopColor="#0077BD" />
                <stop offset="100%" stopColor="#00E676" />
              </linearGradient>
            </defs>
            {/* Trail effect */}
            <circle cx="10" cy="50" r="2" fill="#00E676" opacity="0.4">
              <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="5" cy="48" r="1.5" fill="#0077BD" opacity="0.3">
              <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" begin="0.5s" />
            </circle>
          </svg>

          {/* Animated Driver with Sign */}
          <div ref={driverRef} className="absolute bottom-24 left-[5%] md:left-[10%] opacity-0">
            <div className="relative">
              <svg width="80" height="120" viewBox="0 0 80 120" fill="none" className="md:w-[100px] md:h-[150px]">
                {/* Body */}
                <rect x="25" y="50" width="30" height="45" rx="5" fill="#0077BD" />
                {/* Head */}
                <circle cx="40" cy="35" r="15" fill="#0077BD" opacity="0.8" />
                {/* Cap */}
                <path d="M25 30 L55 30 L50 25 L30 25 Z" fill="#00E676" />
                {/* Sign */}
                <rect x="55" y="20" width="45" height="30" rx="3" fill="white" stroke="#00E676" strokeWidth="2" />
                <text x="77" y="38" textAnchor="middle" fill="#0077BD" fontSize="7" fontWeight="bold">SU NOMBRE</text>
                {/* Arm holding sign */}
                <line x1="55" y1="55" x2="70" y2="35" stroke="#0077BD" strokeWidth="4" strokeLinecap="round" />
                {/* Legs */}
                <line x1="33" y1="95" x2="30" y2="115" stroke="#0077BD" strokeWidth="4" strokeLinecap="round" />
                <line x1="47" y1="95" x2="50" y2="115" stroke="#0077BD" strokeWidth="4" strokeLinecap="round" />
              </svg>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-[#00E676]/60 whitespace-nowrap">Chofer esperando</div>
            </div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 mb-8 animate-fade-in backdrop-blur-sm">
              <Plane className="w-4 h-4 text-[#00E676]" />
              <span className="text-sm text-[#00E676]">Traslado Aeropuerto</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 animate-fade-in-up">
              Recogida en{' '}
              <span className="bg-gradient-to-r from-[#00E676] via-[#0077BD] to-[#00E676] bg-clip-text text-transparent">
                Aeropuerto
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Seguridad garantizada en cada recogida. Los mejores hoteles, agencias de viajes y extranjeros confían en nuestro servicio de traslado en los principales aeropuertos de Bolivia.
            </p>
            <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#0077BD]/10 border border-[#0077BD]/20 mb-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <Shield className="w-5 h-5 text-[#0077BD]" />
              <span className="text-sm font-medium text-[#0077BD]">Seguridad Garantizada en Cada Recogida</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <a href="#reservation" className="px-8 py-4 rounded-full text-lg font-semibold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all duration-300 shadow-[0_0_30px_rgba(0,230,118,0.3)] hover:shadow-[0_0_50px_rgba(0,230,118,0.5)] hover:scale-105">
                Reservar Traslado
              </a>
              <a href="#map" className="px-8 py-4 rounded-full text-lg font-semibold text-white border border-white/20 hover:border-[#00E676]/50 hover:bg-white/5 transition-all duration-300">
                Ver Aeropuertos
              </a>
            </div>
          </div>
        </section>

        {/* Security Features */}
        <section id="security" className="relative py-24 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0077BD]/10 border border-[#0077BD]/20 mb-4">
                <Shield className="w-4 h-4 text-[#0077BD]" />
                <span className="text-sm text-[#0077BD]">Seguridad Total</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Seguridad en la{' '}
                <span className="bg-gradient-to-r from-[#0077BD] to-[#00E676] bg-clip-text text-transparent">
                  Recogida
                </span>
              </h2>
              <p className="text-white/50 max-w-2xl mx-auto">
                Tu seguridad es nuestra prioridad. Cada recogida en aeropuerto cuenta con protocolos estrictos de seguridad y atención profesional.
              </p>
            </div>
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 ${
              visibleSections.has('security') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              {securityFeatures.map((feature, i) => (
                <div
                  key={feature.title}
                  className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-[#0077BD]/20 transition-all duration-500"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ boxShadow: '0 0 30px rgba(0,119,189,0.1)' }}
                  />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-[#0077BD]/10 flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-[#0077BD]" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-sm text-white/50 leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Bolivia Map */}
        <section id="map" className="relative py-24 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0f1628] to-[#0a0e17]" />
          <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-[#0077BD]/10 blur-[100px]" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 mb-4">
                <MapPin className="w-4 h-4 text-[#00E676]" />
                <span className="text-sm text-[#00E676]">Cobertura Nacional</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Aeropuertos de{' '}
                <span className="bg-gradient-to-r from-[#00E676] to-[#0077BD] bg-clip-text text-transparent">
                  Bolivia
                </span>
              </h2>
              <p className="text-white/50 max-w-2xl mx-auto">
                Haz click en cada departamento para ver la información del aeropuerto y tarifas de traslado.
              </p>
            </div>

            <div className={`grid grid-cols-1 lg:grid-cols-5 gap-8 items-start transition-all duration-1000 ${
              visibleSections.has('map') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              {/* SVG Map */}
              <div className="lg:col-span-3">
                <div className="relative p-6 md:p-8 rounded-3xl bg-white/[0.03] border border-white/[0.06]">
                  <svg viewBox="0 0 260 290" className="w-full max-w-md mx-auto">
                    {/* Background */}
                    <rect width="260" height="290" fill="transparent" />

                    {/* Department regions - clickable */}
                    {Object.entries(departmentPaths).map(([dept, path]) => {
                      const isSelected = selectedDept === dept
                      const airport = airports.find(a => a.department === dept)
                      const deptColor = airport?.color || '#0077BD'
                      return (
                        <g key={dept}>
                          <path
                            d={path}
                            fill={isSelected ? `${deptColor}30` : 'rgba(255,255,255,0.03)'}
                            stroke={isSelected ? deptColor : 'rgba(255,255,255,0.1)'}
                            strokeWidth={isSelected ? 2 : 1}
                            className="cursor-pointer transition-all duration-300"
                            onClick={() => setSelectedDept(dept)}
                            style={{ filter: isSelected ? `drop-shadow(0 0 8px ${deptColor}50)` : 'none' }}
                          />
                          {/* Airport icon dot */}
                          {airport && (
                            <circle
                              cx={path.match(/L(\d+),(\d+)/)?.[1] ? Number(path.match(/L(\d+),(\d+)/)![1]) + 10 : 100}
                              cy={path.match(/L(\d+),(\d+)/)?.[2] ? Number(path.match(/L(\d+),(\d+)/)![2]) - 5 : 80}
                              r={isSelected ? 6 : 4}
                              fill={isSelected ? deptColor : 'rgba(255,255,255,0.3)'}
                              className="cursor-pointer transition-all duration-300"
                              onClick={() => setSelectedDept(dept)}
                              style={isSelected ? { filter: `drop-shadow(0 0 6px ${deptColor})` } : {}}
                            />
                          )}
                          {/* Department label */}
                          <text
                            x={path.match(/L(\d+),(\d+)/)?.[1] ? Number(path.match(/L(\d+),(\d+)/)![1]) - 5 : 90}
                            y={path.match(/L(\d+),(\d+)/)?.[2] ? Number(path.match(/L(\d+),(\d+)/)![2]) + 25 : 105}
                            fill={isSelected ? 'white' : 'rgba(255,255,255,0.3)'}
                            fontSize="9"
                            fontWeight={isSelected ? 'bold' : 'normal'}
                            className="cursor-pointer select-none"
                            onClick={() => setSelectedDept(dept)}
                          >
                            {dept === 'lapaz' ? 'La Paz' : dept === 'santacruz' ? 'Sta. Cruz' : dept.charAt(0).toUpperCase() + dept.slice(1)}
                          </text>
                        </g>
                      )
                    })}
                  </svg>
                </div>
              </div>

              {/* Airport Info Panel */}
              <div className="lg:col-span-2">
                {selectedAirport && (
                  <div className="p-6 md:p-8 rounded-3xl bg-white/[0.03] border backdrop-blur-sm transition-all duration-500"
                    style={{ borderColor: `${selectedAirport.color}30` }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${selectedAirport.color}15` }}>
                        <Plane className="w-6 h-6" style={{ color: selectedAirport.color }} />
                      </div>
                      <div>
                        <span className="text-2xl font-bold" style={{ color: selectedAirport.color }}>{selectedAirport.iata}</span>
                        <p className="text-xs text-white/40">{selectedAirport.department.charAt(0).toUpperCase() + selectedAirport.department.slice(1)}</p>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">{selectedAirport.name}</h3>
                    <p className="text-sm text-white/50 leading-relaxed mb-6">{selectedAirport.desc}</p>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2 text-sm text-white/40">
                        <MapPin className="w-4 h-4" />
                        <span>Traslado disponible desde/hacia este aeropuerto</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-white/40">
                        <Clock className="w-4 h-4" />
                        <span>Servicio 24/7 - Reserve con anticipación</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-white/40">
                        <Navigation className="w-4 h-4" />
                        <span>Seguimiento de vuelo incluido</span>
                      </div>
                    </div>
                    <a
                      href="#reservation"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-black transition-all duration-300 shadow-[0_0_15px_rgba(0,230,118,0.2)] hover:shadow-[0_0_25px_rgba(0,230,118,0.4)]"
                      style={{ backgroundColor: selectedAirport.color }}
                    >
                      Cotizar Traslado
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                )}

                {/* Quick airport list */}
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {airports.map((apt) => (
                    <button
                      key={apt.department}
                      onClick={() => setSelectedDept(apt.department)}
                      className={`p-2 rounded-lg text-center transition-all duration-300 text-xs ${
                        selectedDept === apt.department
                          ? 'bg-white/[0.08] text-white font-semibold'
                          : 'bg-white/[0.02] text-white/40 hover:bg-white/[0.05] hover:text-white/60'
                      }`}
                    >
                      <span className="block font-bold" style={{ color: selectedDept === apt.department ? apt.color : undefined }}>{apt.iata}</span>
                      <span className="block text-[10px] mt-0.5">{apt.department.charAt(0).toUpperCase() + apt.department.slice(1)}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Flight Tracking */}
        <section id="tracking" className="relative py-24 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#071a10] to-[#0a0e17]" />
          <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] rounded-full bg-[#00E676]/5 blur-[100px]" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className={`transition-all duration-1000 ${
                visibleSections.has('tracking') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              }`}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 mb-6">
                  <Navigation className="w-4 h-4 text-[#00E676]" />
                  <span className="text-sm text-[#00E676]">Seguimiento en Tiempo Real</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Monitoreo de{' '}
                  <span className="bg-gradient-to-r from-[#00E676] to-[#0077BD] bg-clip-text text-transparent">
                    Vuelo
                  </span>
                </h2>
                <p className="text-white/60 leading-relaxed mb-6">
                  Con nuestro sistema de seguimiento de vuelos en tiempo real, tu conductor estará siempre informado sobre el estado de tu vuelo. Si tu vuelo se retrasa, nosotros ajustamos automáticamente la hora de recogida sin costo adicional.
                </p>
                <div className="space-y-4">
                  {[
                    { icon: Eye, text: 'Monitoreo de vuelo en tiempo real' },
                    { icon: Clock, text: 'Ajuste automático de hora de recogida' },
                    { icon: CheckCircle2, text: 'Sin cargo adicional por retrasos de vuelo' },
                    { icon: Heart, text: 'Tranquilidad total garantizada' },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-[#00E676] shrink-0" />
                      <span className="text-white/60 text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className={`transition-all duration-1000 ${
                visibleSections.has('tracking') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
              }`}>
                <div className="relative p-8 rounded-3xl bg-white/[0.03] border border-[#00E676]/10">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#00E676]/5 to-[#0077BD]/5 blur-[20px]" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-3 h-3 rounded-full bg-[#00E676] animate-pulse" />
                      <span className="text-sm text-[#00E676] font-medium">Vuelo en Monitoreo</span>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-white/40 text-sm">Vuelo</span>
                        <span className="text-white font-semibold">OB 123</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/40 text-sm">Origen</span>
                        <span className="text-white font-semibold">MIA - Miami</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/40 text-sm">Destino</span>
                        <span className="text-white font-semibold">VVI - Santa Cruz</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/40 text-sm">Estado</span>
                        <span className="text-[#00E676] font-semibold">En vuelo - A tiempo</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/40 text-sm">Llegada estimada</span>
                        <span className="text-white font-semibold">14:30 local</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/40 text-sm">Conductor asignado</span>
                        <span className="text-[#0077BD] font-semibold">Carlos M. - En camino</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reservation Form */}
        <section id="reservation" className="relative py-24 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#0077BD]/10 blur-[150px]" />
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0077BD]/10 border border-[#0077BD]/20 mb-4">
                <Calendar className="w-4 h-4 text-[#0077BD]" />
                <span className="text-sm text-[#0077BD]">Reserva tu Traslado</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Reservar{' '}
                <span className="bg-gradient-to-r from-[#0077BD] to-[#00E676] bg-clip-text text-transparent">
                  Traslado Aeropuerto
                </span>
              </h2>
              <p className="text-white/50 max-w-2xl mx-auto">
                Para clientes y agencias de viajes. Reserve su recogida desde cualquier lugar del mundo con pago seguro en línea.
              </p>
            </div>

            <div className={`transition-all duration-1000 ${
              visibleSections.has('reservation') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className="p-6 md:p-10 rounded-3xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm">
                {formSubmitted ? (
                  <div className="text-center py-12">
                    <CheckCircle2 className="w-16 h-16 text-[#00E676] mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-2">Reserva Recibida</h3>
                    <p className="text-white/50">Nos comunicaremos con usted en las próximas horas para confirmar su traslado.</p>
                  </div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true) }} className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                      <CreditCard className="w-5 h-5 text-[#00E676]" />
                      <span className="text-sm text-[#00E676]">Pago seguro con tarjeta</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-white/40 mb-2">Nombre completo *</label>
                        <input type="text" required className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white placeholder-white/20 focus:border-[#00E676]/30 focus:outline-none transition-colors" placeholder="Juan Pérez" />
                      </div>
                      <div>
                        <label className="block text-sm text-white/40 mb-2">Email *</label>
                        <input type="email" required className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white placeholder-white/20 focus:border-[#00E676]/30 focus:outline-none transition-colors" placeholder="juan@empresa.com" />
                      </div>
                      <div>
                        <label className="block text-sm text-white/40 mb-2">Teléfono *</label>
                        <input type="tel" required className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white placeholder-white/20 focus:border-[#00E676]/30 focus:outline-none transition-colors" placeholder="+591 70000000" />
                      </div>
                      <div>
                        <label className="block text-sm text-white/40 mb-2">Aerolínea</label>
                        <input type="text" className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white placeholder-white/20 focus:border-[#00E676]/30 focus:outline-none transition-colors" placeholder="BoA, EcoJet, Amaszonas..." />
                      </div>
                      <div>
                        <label className="block text-sm text-white/40 mb-2">Número de vuelo *</label>
                        <input type="text" required className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white placeholder-white/20 focus:border-[#00E676]/30 focus:outline-none transition-colors" placeholder="OB 123" />
                      </div>
                      <div>
                        <label className="block text-sm text-white/40 mb-2">Aeropuerto de origen</label>
                        <input type="text" className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white placeholder-white/20 focus:border-[#00E676]/30 focus:outline-none transition-colors" placeholder="Ciudad de origen" />
                      </div>
                      <div>
                        <label className="block text-sm text-white/40 mb-2">Fecha de llegada *</label>
                        <input type="date" required className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white placeholder-white/20 focus:border-[#00E676]/30 focus:outline-none transition-colors" />
                      </div>
                      <div>
                        <label className="block text-sm text-white/40 mb-2">Hora estimada</label>
                        <input type="time" className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white placeholder-white/20 focus:border-[#00E676]/30 focus:outline-none transition-colors" />
                      </div>
                      <div>
                        <label className="block text-sm text-white/40 mb-2">Aeropuerto de destino *</label>
                        <select required className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white focus:border-[#00E676]/30 focus:outline-none transition-colors">
                          <option value="" className="bg-[#0a0e17]">Seleccionar aeropuerto</option>
                          {airports.map(apt => (
                            <option key={apt.iata} value={apt.iata} className="bg-[#0a0e17]">{apt.iata} - {apt.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-white/40 mb-2">Destino (hotel/dirección)</label>
                        <input type="text" className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white placeholder-white/20 focus:border-[#00E676]/30 focus:outline-none transition-colors" placeholder="Hotel Las Americas, Santa Cruz" />
                      </div>
                      <div>
                        <label className="block text-sm text-white/40 mb-2">Tipo de vehículo</label>
                        <select className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white focus:border-[#00E676]/30 focus:outline-none transition-colors">
                          <option value="sedan" className="bg-[#0a0e17]">Sedan Confort</option>
                          <option value="suv" className="bg-[#0a0e17]">SUV</option>
                          <option value="van" className="bg-[#0a0e17]">Van VIP</option>
                          <option value="minibus" className="bg-[#0a0e17]">MiniBus</option>
                          <option value="vip" className="bg-[#0a0e17]">Sedan VIP</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-white/40 mb-2">Número de pasajeros</label>
                        <input type="number" min="1" max="12" defaultValue="1" className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white placeholder-white/20 focus:border-[#00E676]/30 focus:outline-none transition-colors" />
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <input type="checkbox" id="sign" defaultChecked className="w-4 h-4 rounded accent-[#00E676]" />
                      <label htmlFor="sign" className="text-sm text-white/60">Necesito cartel de bienvenida con mi nombre</label>
                    </div>
                    <div>
                      <label className="block text-sm text-white/40 mb-2">Notas especiales</label>
                      <textarea rows={3} className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white placeholder-white/20 focus:border-[#00E676]/30 focus:outline-none transition-colors resize-none" placeholder="Equipaje adicional, silla de bebé, etc." />
                    </div>
                    <button type="submit" className="w-full px-8 py-4 rounded-full text-lg font-semibold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all duration-300 shadow-[0_0_30px_rgba(0,230,118,0.3)] hover:shadow-[0_0_50px_rgba(0,230,118,0.5)]">
                      Reservar Traslado con Pago Seguro
                    </button>
                    <p className="text-center text-white/30 text-xs">
                      Pago seguro con tarjeta de crédito/débito. Confirmación inmediata por email.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section id="trust" className="relative py-24 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0f1628] to-[#0a0e17]" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF9800]/10 border border-[#FF9800]/20 mb-4">
                <Star className="w-4 h-4 text-[#FF9800]" />
                <span className="text-sm text-[#FF9800]">Confianza Internacional</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Quienes{' '}
                <span className="bg-gradient-to-r from-[#FF9800] to-[#00E676] bg-clip-text text-transparent">
                  Confían
                </span>
              </h2>
              <p className="text-white/50 max-w-2xl mx-auto">
                Las mejores hoteles, agencias de viajes y extranjeros confían en nuestro servicio de recogida en los principales aeropuertos de Bolivia.
              </p>
            </div>

            <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 transition-all duration-1000 ${
              visibleSections.has('trust') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              {[
                { icon: Building2, title: 'Hoteles 5 Estrellas', desc: 'Reconocimiento de la industria hotelera por nuestro servicio puntual y profesional.', color: '#FF9800' },
                { icon: Globe, title: 'Agencias de Viaje', desc: 'Agencias internacionales confían en Ecotaxi para sus clientes en Bolivia.', color: '#0077BD' },
                { icon: Briefcase2Icon, title: 'Travel Managers', desc: 'Gerentes de viajes corporativos que gestionan traslados para ejecutivos.', color: '#8B5CF6' },
                { icon: User, title: 'Turistas Extranjeros', desc: 'Miles de viajeros internacionales nos eligen cada año por seguridad y confianza.', color: '#00E676' },
              ].map((item, i) => (
                <div key={item.title} className="group p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center hover:border-white/10 transition-all duration-500"
                  style={{ transitionDelay: `${i * 80}ms` }}>
                  <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: `${item.color}15` }}>
                    <item.icon className="w-7 h-7" style={{ color: item.color }} />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                  <p className="text-xs text-white/40 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className={`grid grid-cols-3 gap-4 max-w-2xl mx-auto transition-all duration-1000 ${
              visibleSections.has('trust') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: '200ms' }}>
              {[
                { value: '50,000+', label: 'Traslados aeropuerto', color: '#0077BD' },
                { value: '98%', label: 'Satisfacción', color: '#00E676' },
                { value: '200+', label: 'Empresas confían', color: '#FF9800' },
              ].map((stat) => (
                <div key={stat.label} className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center">
                  <div className="text-3xl md:text-4xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
                  <p className="text-xs text-white/40 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Exclusive Airport Vehicles */}
        <section id="vehicles" className="relative py-24 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0077BD]/10 border border-[#0077BD]/20 mb-4">
                <Plane className="w-4 h-4 text-[#0077BD]" />
                <span className="text-sm text-[#0077BD]">Vehículos Exclusivos</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Flota para{' '}
                <span className="bg-gradient-to-r from-[#0077BD] to-[#00E676] bg-clip-text text-transparent">
                  Aeropuerto
                </span>
              </h2>
              <p className="text-white/50 max-w-2xl mx-auto">
                Vehículos exclusivos disponibles para traslados al aeropuerto con la máxima comodidad y seguridad.
              </p>
            </div>
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 transition-all duration-1000 ${
              visibleSections.has('vehicles') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              {airportVehicles.map((vehicle, i) => (
                <div
                  key={vehicle.name}
                  className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-white/10 transition-all duration-500"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ boxShadow: `0 0 30px ${vehicle.color}15` }}
                  />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center" style={{ background: `${vehicle.color}15` }}>
                      <Luggage className="w-6 h-6" style={{ color: vehicle.color }} />
                    </div>
                    <h3 className="text-white font-semibold mb-1">{vehicle.name}</h3>
                    <div className="flex items-center gap-3 text-xs text-white/30 mb-3">
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>{vehicle.passengers}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>{vehicle.ac ? 'A/C' : ''}</span>
                      </div>
                    </div>
                    <p className="text-xs text-white/40 mb-3">{vehicle.luggage}</p>
                    <p className="text-xs text-white/30 leading-relaxed">{vehicle.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Scheduled Reservations */}
        <section id="scheduled" className="relative py-24 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#071a10] to-[#0a0e17]" />
          <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-[#00E676]/5 blur-[120px]" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 mb-4">
                <Calendar className="w-4 h-4 text-[#00E676]" />
                <span className="text-sm text-[#00E676]">Reservas Programadas</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Todo{' '}
                <span className="bg-gradient-to-r from-[#00E676] to-[#0077BD] bg-clip-text text-transparent">
                  Incluido
                </span>
              </h2>
              <p className="text-white/50 max-w-2xl mx-auto">
                Cada reserva programada de aeropuerto incluye estos servicios sin costo adicional.
              </p>
            </div>
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 transition-all duration-1000 ${
              visibleSections.has('scheduled') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              {scheduledIncludes.map((item, i) => (
                <div key={item.title} className="group relative p-6 rounded-2xl bg-white/[0.03] border border-[#00E676]/10 text-center hover:border-[#00E676]/20 transition-all duration-500"
                  style={{ transitionDelay: `${i * 80}ms` }}>
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ boxShadow: '0 0 30px rgba(0,230,118,0.1)' }}
                  />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center bg-[#00E676]/10">
                      <item.icon className="w-6 h-6 text-[#00E676]" />
                    </div>
                    <h3 className="text-white font-semibold text-sm mb-2">{item.title}</h3>
                    <p className="text-xs text-white/40 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <a href="#reservation" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg font-semibold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all duration-300 shadow-[0_0_30px_rgba(0,230,118,0.3)] hover:shadow-[0_0_50px_rgba(0,230,118,0.5)] hover:scale-105">
                Reservar Ahora
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

// Simple briefcase icon to avoid import issues
function Briefcase2Icon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      <line x1="12" y1="12" x2="12" y2="12.01" />
    </svg>
  )
}
