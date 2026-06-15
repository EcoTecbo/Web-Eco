'use client'

import { useEffect, useState } from 'react'
import {
  Leaf, Users, Shield, Lightbulb, Heart, Eye, Target,
  Award, ChevronRight, Phone, Mail, ArrowRight, Star,
  Building2, Sparkles, Globe, Clock, TrendingUp, CheckCircle2
} from 'lucide-react'
import { Navbar } from '@/components/ecotaxi/navbar'
import { Footer } from '@/components/ecotaxi/footer'

const timelineEvents = [
  { year: '2015', title: 'Fundación', desc: 'Nace Ecotaxi en Santa Cruz de la Sierra con la visión de transformar el transporte urbano en Bolivia.', color: '#0077BD' },
  { year: '2017', title: 'Innovación Tecnológica', desc: 'Lanzamiento de la primera app de taxi en Bolivia con tecnología GPS en tiempo real.', color: '#00E676' },
  { year: '2019', title: 'Compromiso Ecológico', desc: 'Inicio del programa de neutralización de CO2, siendo pioneros en Bolivia.', color: '#71B124' },
  { year: '2021', title: 'Expansión Nacional', desc: 'Cobertura en 5 departamentos del territorio nacional, conectando todo Bolivia.', color: '#FF9800' },
  { year: '2023', title: 'Liderazgo Corporativo', desc: 'Más de 200 empresas confían en Ecotaxi para la movilidad de sus colaboradores.', color: '#8B5CF6' },
  { year: '2024', title: 'Carbono Neutro', desc: 'Implementación del Arbolímetro y compromiso de neutralidad de carbono certificada.', color: '#00E676' },
]

const values = [
  { icon: Award, title: 'Excelencia', desc: 'Buscamos la perfección en cada servicio, superando expectativas con calidad y profesionalismo.', color: '#0077BD' },
  { icon: Lightbulb, title: 'Innovación', desc: 'Implementamos tecnología de punta para ofrecer soluciones modernas y eficientes de movilidad.', color: '#00E676' },
  { icon: Leaf, title: 'Sostenibilidad', desc: 'Comprometidos con el medio ambiente, neutralizamos nuestra huella de carbono en cada viaje.', color: '#71B124' },
  { icon: Shield, title: 'Seguridad', desc: 'La protección de nuestros pasajeros es prioridad absoluta con conductores certificados y monitoreo GPS.', color: '#FF9800' },
  { icon: Heart, title: 'Compromiso', desc: 'Dedicación total a cada cliente, construyendo relaciones de confianza a largo plazo.', color: '#E91E63' },
  { icon: Eye, title: 'Transparencia', desc: 'Información clara y accesible sobre tarifas, rutas y consumo en tiempo real.', color: '#8B5CF6' },
]

const team = [
  { name: 'Oscar E. Oroza P.', role: 'General Manager', initials: 'OO' },
  { name: 'Director de Operaciones', role: 'Operaciones y Logística', initials: 'DO' },
  { name: 'Director de Tecnología', role: 'Innovación y Desarrollo', initials: 'DT' },
  { name: 'Director Comercial', role: 'Ventas y Alianzas', initials: 'DC' },
]

export default function NosotrosPage() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())

  useEffect(() => {
    const sectionIds = ['origin', 'mission', 'timeline', 'ceo', 'values', 'team', 'cta']
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
    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0e17]">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17]/50 via-[#0a0e17]/80 to-[#0a0e17]" />
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[#0077BD]/15 blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#00E676]/10 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `linear-gradient(rgba(0,230,118,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,230,118,0.3) 1px, transparent 1px)`,
                backgroundSize: '60px 60px',
              }}
            />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 animate-fade-in backdrop-blur-sm">
              <Users className="w-4 h-4 text-[#00E676]" />
              <span className="text-sm text-white/80">Conoce Nuestra Historia</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 animate-fade-in-up">
              Sobre{' '}
              <span className="bg-gradient-to-r from-[#00E676] via-[#0077BD] to-[#00E676] bg-clip-text text-transparent">
                Nosotros
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Más de una década transformando la movilidad urbana en Bolivia con tecnología, 
              seguridad y un compromiso inquebrantable con el medio ambiente.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              {[
                { icon: Clock, value: '10+', label: 'Años de experiencia' },
                { icon: Building2, value: '200+', label: 'Empresas atendidas' },
                { icon: Leaf, value: '15,847', label: 'Árboles plantados' },
                { icon: Globe, value: '5', label: 'Departamentos' },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                  <stat.icon className="w-5 h-5 text-[#00E676]" />
                  <div>
                    <span className="text-xl font-bold text-white">{stat.value}</span>
                    <span className="text-xs text-white/40 ml-1">{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Origin & Philosophy */}
        <section id="origin" className="relative py-24 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${
              visibleSections.has('origin') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0077BD]/10 border border-[#0077BD]/20 mb-6">
                  <Sparkles className="w-4 h-4 text-[#0077BD]" />
                  <span className="text-sm text-[#0077BD]">Nuestro Origen</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Origen y{' '}
                  <span className="bg-gradient-to-r from-[#0077BD] to-[#00E676] bg-clip-text text-transparent">
                    Filosofía
                  </span>
                </h2>
                <div className="space-y-4 text-white/60 leading-relaxed">
                  <p>
                    Ecotaxi es marca registrada de <strong className="text-white/80">O&C Ingeniería y Representaciones SRL</strong>, 
                    una empresa totalmente formal dedicada a brindar soluciones tecnológicas y eco eficientes al sector 
                    de la movilidad urbana, en transporte de personas y mensajerías en general.
                  </p>
                  <p>
                    Nacimos con la convicción de que el transporte urbano puede ser diferente: más seguro, más eficiente 
                    y más responsable con el medio ambiente. Desde nuestros inicios en Santa Cruz de la Sierra, hemos 
                    trabajado incansablemente para transformar la experiencia del taxi en Bolivia.
                  </p>
                  <p>
                    Hoy, con más de 10 años de experiencia y atendiendo a más de 200 empresas en todo el territorio 
                    nacional, contamos con moderna tecnología y el personal adecuado para garantizar calidad, seguridad 
                    y ahorros en cada servicio.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#0077BD]/20 to-[#00E676]/20 blur-[40px]" />
                <div className="relative p-8 md:p-10 rounded-3xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm">
                  <div className="text-center mb-6">
                    <img
                      src="/logo-ecotaxi.webp"
                      alt="Ecotaxi Logo"
                      className="h-20 w-20 object-contain drop-shadow-[0_0_12px_rgba(0,230,118,0.25)] mx-auto mb-4"
                    />
                    <p className="text-white/30 text-sm">Marca registrada de</p>
                    <p className="text-[#0077BD] font-semibold">O&C Ingeniería y Representaciones SRL</p>
                  </div>
                  <div className="space-y-4">
                    {[
                      { icon: CheckCircle2, text: 'Empresa 100% formal y registrada' },
                      { icon: CheckCircle2, text: 'Soluciones tecnológicas de movilidad' },
                      { icon: CheckCircle2, text: 'Compromiso eco eficiente certificado' },
                      { icon: CheckCircle2, text: 'Cobertura nacional en Bolivia' },
                      { icon: CheckCircle2, text: 'Más de 200 empresas satisfechas' },
                    ].map((item) => (
                      <div key={item.text} className="flex items-center gap-3">
                        <item.icon className="w-5 h-5 text-[#00E676] shrink-0" />
                        <span className="text-white/60 text-sm">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section id="mission" className="relative py-24 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#071a10] to-[#0a0e17]" />
          <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-[#00E676]/5 blur-[120px]" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 mb-4">
                <Target className="w-4 h-4 text-[#00E676]" />
                <span className="text-sm text-[#00E676]">Nuestro Propósito</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Misión y{' '}
                <span className="bg-gradient-to-r from-[#00E676] to-[#0077BD] bg-clip-text text-transparent">
                  Visión
                </span>
              </h2>
            </div>
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-1000 ${
              visibleSections.has('mission') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              {/* Mission */}
              <div className="group relative p-8 md:p-10 rounded-3xl bg-white/[0.03] border border-[#00E676]/10 backdrop-blur-sm hover:border-[#00E676]/30 transition-all duration-500">
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ boxShadow: 'inset 0 0 60px rgba(0,230,118,0.1), 0 0 30px rgba(0,230,118,0.1)' }}
                />
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-[#00E676]/10 flex items-center justify-center mb-6">
                    <Target className="w-8 h-8 text-[#00E676]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Misión</h3>
                  <p className="text-white/60 leading-relaxed">
                    Transformar el transporte de colaboradores y clientes en experiencias memorables, seguras y eficientes, 
                    con tecnología de punta y compromiso ecológico. Cada viaje con Ecotaxi representa nuestro esfuerzo 
                    por ofrecer un servicio que no solo conecta destinos, sino que también construye confianza, 
                    promueve la sostenibilidad y genera valor para cada uno de nuestros usuarios y empresas aliadas.
                  </p>
                </div>
              </div>
              {/* Vision */}
              <div className="group relative p-8 md:p-10 rounded-3xl bg-white/[0.03] border border-[#0077BD]/10 backdrop-blur-sm hover:border-[#0077BD]/30 transition-all duration-500">
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ boxShadow: 'inset 0 0 60px rgba(0,119,189,0.1), 0 0 30px rgba(0,119,189,0.1)' }}
                />
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-[#0077BD]/10 flex items-center justify-center mb-6">
                    <Eye className="w-8 h-8 text-[#0077BD]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Visión</h3>
                  <p className="text-white/60 leading-relaxed">
                    Ser la empresa líder en movilidad corporativa en Bolivia, reconocida por la innovación, sostenibilidad 
                    y excelencia en el servicio. Aspiramos a que cada empresa en Bolivia tenga a Ecotaxi como su aliado 
                    estratégico de transporte, contribuyendo activamente a la descarbonización del sector movilidad y 
                    estableciendo estándares de calidad que inspiren a toda la industria del transporte.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section id="timeline" className="relative py-24 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
          <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-[#0077BD]/10 blur-[100px]" />
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0077BD]/10 border border-[#0077BD]/20 mb-4">
                <TrendingUp className="w-4 h-4 text-[#0077BD]" />
                <span className="text-sm text-[#0077BD]">Nuestra Trayectoria</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Línea del{' '}
                <span className="bg-gradient-to-r from-[#0077BD] to-[#00E676] bg-clip-text text-transparent">
                  Tiempo
                </span>
              </h2>
              <p className="text-white/50 max-w-2xl mx-auto">
                Una década de crecimiento, innovación y compromiso con Bolivia y el planeta.
              </p>
            </div>

            <div className={`relative transition-all duration-1000 ${
              visibleSections.has('timeline') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              {/* Vertical Line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#0077BD] via-[#00E676] to-[#0077BD]" />

              {timelineEvents.map((event, i) => (
                <div
                  key={event.year}
                  className={`relative flex items-start mb-12 last:mb-0 ${
                    i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  {/* Dot on timeline */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full z-10"
                    style={{ backgroundColor: event.color, boxShadow: `0 0 20px ${event.color}50` }}
                  />

                  {/* Content Card */}
                  <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
                    <div className="group p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-white/10 transition-all duration-300">
                      <span className="text-3xl font-bold" style={{ color: event.color }}>{event.year}</span>
                      <h3 className="text-lg font-semibold text-white mt-2 mb-2">{event.title}</h3>
                      <p className="text-sm text-white/50 leading-relaxed">{event.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CEO Message */}
        <section id="ceo" className="relative py-24 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0f1628] to-[#0a0e17]" />
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#0077BD]/10 blur-[120px]" />
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`transition-all duration-1000 ${
              visibleSections.has('ceo') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className="relative p-8 md:p-12 rounded-3xl bg-white/[0.03] border border-[#0077BD]/10 backdrop-blur-sm">
                <div className="absolute top-6 left-8 text-[#0077BD]/20">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C9.591 11.69 11 13.166 11 15c0 1.933-1.567 3.5-3.5 3.5-1.271 0-2.406-.563-2.917-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C19.591 11.69 21 13.166 21 15c0 1.933-1.567 3.5-3.5 3.5-1.271 0-2.406-.563-2.917-1.179z"/>
                  </svg>
                </div>
                <div className="relative z-10 text-center">
                  <p className="text-lg md:text-xl text-white/70 leading-relaxed italic mb-8 max-w-2xl mx-auto">
                    En Ecotaxi creemos que el transporte no es solo mover personas de un punto a otro, es crear experiencias, 
                    generar confianza y construir un futuro más sostenible. Cada kilómetro que recorremos es un compromiso con 
                    la excelencia, la seguridad de nuestros pasajeros y la protección de nuestro planeta. Agradecemos a cada 
                    una de las más de 200 empresas que confían en nosotros como su aliado estratégico de movilidad.
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0077BD] to-[#00E676] flex items-center justify-center text-white font-bold text-xl">
                      OO
                    </div>
                    <div className="text-left">
                      <p className="text-white font-semibold">Oscar E. Oroza P.</p>
                      <p className="text-[#0077BD] text-sm">General Manager</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section id="values" className="relative py-24 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
          <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-[#00E676]/5 blur-[100px]" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 mb-4">
                <Star className="w-4 h-4 text-[#00E676]" />
                <span className="text-sm text-[#00E676]">Lo Que Nos Define</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Nuestros{' '}
                <span className="bg-gradient-to-r from-[#00E676] to-[#0077BD] bg-clip-text text-transparent">
                  Valores
                </span>
              </h2>
            </div>
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 ${
              visibleSections.has('values') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              {values.map((value, i) => (
                <div
                  key={value.title}
                  className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-white/10 transition-all duration-500"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{ boxShadow: `0 0 30px ${value.color}15` }}
                  />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center" style={{ background: `${value.color}15` }}>
                      <value.icon className="w-6 h-6" style={{ color: value.color }} />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                    <p className="text-sm text-white/50 leading-relaxed">{value.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section id="team" className="relative py-24 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#071a10] to-[#0a0e17]" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0077BD]/10 border border-[#0077BD]/20 mb-4">
                <Users className="w-4 h-4 text-[#0077BD]" />
                <span className="text-sm text-[#0077BD]">Liderazgo</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Nuestro{' '}
                <span className="bg-gradient-to-r from-[#0077BD] to-[#00E676] bg-clip-text text-transparent">
                  Equipo
                </span>
              </h2>
              <p className="text-white/50 max-w-2xl mx-auto">
                Profesionales comprometidos con la excelencia y la innovación en cada servicio.
              </p>
            </div>
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-1000 ${
              visibleSections.has('team') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              {team.map((member, i) => (
                <div
                  key={member.name}
                  className="group p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm text-center hover:border-[#0077BD]/20 transition-all duration-500"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center bg-gradient-to-br from-[#0077BD]/30 to-[#00E676]/30 border-2 border-white/10 text-white text-xl font-bold group-hover:border-[#00E676]/30 transition-all duration-300">
                    {member.initials}
                  </div>
                  <h3 className="text-white font-semibold mb-1">{member.name}</h3>
                  <p className="text-sm text-white/40">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="cta" className="relative py-24 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#00E676]/10 blur-[120px]" />
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className={`transition-all duration-1000 ${
              visibleSections.has('cta') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                ¿Listo para{' '}
                <span className="bg-gradient-to-r from-[#00E676] to-[#0077BD] bg-clip-text text-transparent">
                  transformar
                </span>
                {' '}tu movilidad?
              </h2>
              <p className="text-white/50 mb-10 max-w-2xl mx-auto text-lg">
                Únete a las más de 200 empresas que ya confían en Ecotaxi como su aliado estratégico de transporte corporativo.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="/corporativo"
                  className="px-8 py-4 rounded-full text-lg font-semibold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all duration-300 shadow-[0_0_30px_rgba(0,230,118,0.3)] hover:shadow-[0_0_50px_rgba(0,230,118,0.5)] hover:scale-105"
                >
                  Servicios Corporativos
                </a>
                <a
                  href="tel:+59133296885"
                  className="flex items-center gap-2 px-8 py-4 rounded-full text-lg font-semibold text-white border border-white/20 hover:border-[#00E676]/50 hover:bg-white/5 transition-all duration-300"
                >
                  <Phone className="w-5 h-5" />
                  Contáctanos
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
