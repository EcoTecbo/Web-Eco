'use client'

import {
  Building2, Leaf, Target, Eye, Heart, Shield, Users,
  Award, TrendingUp, Clock, Globe, Sparkles, Quote,
  ChevronRight, MapPin, TreePine, Zap, Star
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

/* ─── Timeline Data ─── */
const timeline = [
  { year: '2015', title: 'El Inicio', desc: 'EcoTaxi nace en Santa Cruz de la Sierra con la visión de transformar el transporte urbano, combinando tecnología y compromiso ambiental.', icon: Sparkles, color: '#0077BD' },
  { year: '2016', title: 'Crecimiento Rápido', desc: 'Expansión de la flota a más de 50 vehículos y lanzamiento de la aplicación móvil para reservas en tiempo real.', icon: TrendingUp, color: '#00E676' },
  { year: '2018', title: 'Compromiso Ecológico', desc: 'Implementación del primer Plan de Medición de Huella de Carbono en el sector transporte de Bolivia.', icon: Leaf, color: '#71B124' },
  { year: '2020', title: 'Certificación Ambiental', desc: 'Reconocimiento como primera empresa de transporte en Bolivia con plan de neutralización de emisiones GEI.', icon: Award, color: '#FF9800' },
  { year: '2022', title: 'Expansión Nacional', desc: 'Presencia en múltiples ciudades de Bolivia con más de 200 vehículos y alianzas corporativas estratégicas.', icon: Globe, color: '#8B5CF6' },
  { year: '2024', title: 'Innovación Continua', desc: 'Integración de vehículos eléctricos Quantum y plataforma digital de reservas multicanal para empresas y hoteles.', icon: Zap, color: '#00E676' },
]

/* ─── Values Data ─── */
const values = [
  { icon: Leaf, title: 'Sostenibilidad', desc: 'Cada decisión que tomamos considera su impacto ambiental. Somos pioneros en neutralización de carbono en Bolivia.', color: '#00E676' },
  { icon: Shield, title: 'Seguridad', desc: 'La seguridad de nuestros pasajeros y conductores es nuestra prioridad absoluta. Vehículos monitoreados 24/7.', color: '#0077BD' },
  { icon: Heart, title: 'Compromiso', desc: 'Nos comprometemos con la comunidad, con el medio ambiente y con la excelencia en cada servicio que ofrecemos.', color: '#FF6B35' },
  { icon: TrendingUp, title: 'Innovación', desc: 'Incorporamos tecnología de punta para mejorar la experiencia de transporte y reducir nuestro impacto ecológico.', color: '#8B5CF6' },
  { icon: Users, title: 'Trabajo en Equipo', desc: 'Nuestro equipo de conductores, operadores y administrativos trabaja unido por un transporte mejor para todos.', color: '#1D6988' },
  { icon: Star, title: 'Excelencia', desc: 'Buscamos la excelencia en cada viaje, desde la puntualidad hasta la atención personalizada al pasajero.', color: '#FF9800' },
]

/* ─── Team Data ─── */
const team = [
  { name: 'Ing. Roberto O.', role: 'Director General & CEO', initials: 'RO', color: '#0077BD', desc: 'Líder visionario con más de 15 años de experiencia en transporte y desarrollo sostenible.' },
  { name: 'Lic. María C.', role: 'Directora de Operaciones', initials: 'MC', color: '#00E676', desc: 'Experta en logística y gestión de flotas, responsable de la eficiencia operativa.' },
  { name: 'Ing. Carlos S.', role: 'Director de Tecnología', initials: 'CS', color: '#8B5CF6', desc: 'Arquitecto de la plataforma digital y sistemas de monitoreo en tiempo real.' },
  { name: 'Lic. Ana P.', role: 'Directora de Sostenibilidad', initials: 'AP', color: '#71B124', desc: 'Responsable del programa de neutralización de carbono y relaciones ambientales.' },
]

export function Nosotros() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.05 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="nosotros" ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#0077BD]/8 blur-[120px]" />
      <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] rounded-full bg-[#00E676]/5 blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ═══ HEADER ═══ */}
        <div className={`text-center mb-20 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0077BD]/10 border border-[#0077BD]/20 mb-4">
            <Building2 className="w-4 h-4 text-[#0077BD]" />
            <span className="text-sm text-[#0077BD]">Conócenos</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Sobre{' '}
            <span className="bg-gradient-to-r from-[#0077BD] to-[#00E676] bg-clip-text text-transparent">
              Nosotros
            </span>
          </h2>
          <p className="text-white/50 max-w-3xl mx-auto text-lg leading-relaxed">
            EcoTaxi es más que un servicio de transporte. Somos un movimiento hacia un futuro más limpio,
            impulsado por la innovación y el compromiso con el medio ambiente en Bolivia.
          </p>
        </div>

        {/* ═══ ORIGIN STORY ═══ */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '100ms' }}>
          {/* Left: Image with overlay */}
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0077BD]/20 to-[#00E676]/10" />
            <img
              src="/hero-taxi-1.webp"
              alt="EcoTaxi - Transporte ecológico en Santa Cruz"
              className="w-full h-[400px] md:h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e17] via-transparent to-transparent" />
            {/* Overlay Stats */}
            <div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-3">
              {[
                { value: '9+', label: 'Años de experiencia' },
                { value: '200+', label: 'Vehículos en flota' },
                { value: '200K+', label: 'Viajes realizados' },
              ].map((stat) => (
                <div key={stat.label} className="p-3 rounded-xl bg-[#0a0e17]/80 backdrop-blur-sm border border-white/5 text-center">
                  <div className="text-lg font-bold text-[#00E676]">{stat.value}</div>
                  <div className="text-[10px] text-white/40">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Story Text */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Nuestro Origen y{' '}
              <span className="text-[#00E676]">Filosofía</span>
            </h3>
            <div className="space-y-4 text-white/50 leading-relaxed">
              <p>
                EcoTaxi nació en Santa Cruz de la Sierra con una visión clara: demostrar que el transporte
                urbano puede ser eficiente, seguro y respetuoso con el medio ambiente. Desde nuestros inicios,
                nos propusimos romper paradigmas en un sector tradicionalmente contaminante.
              </p>
              <p>
                Como servicio de <strong className="text-white/70">O&C Ingeniería y Representaciones SRL</strong>,
                combinamos la experiencia en ingeniería con la pasión por la sostenibilidad. Cada kilómetro
                recorrido es un compromiso con la reducción de emisiones y la mejora continua de nuestros procesos.
              </p>
              <p>
                Somos los <strong className="text-[#00E676]">primeros en Bolivia</strong> en contar con un Plan
                de Medición, Reducción y Neutralización de las emisiones de gases de Efecto Invernadero,
                un hito que nos llena de orgullo y nos motiva a seguir innovando.
              </p>
            </div>
            <div className="flex items-center gap-4 mt-8">
              <div className="flex -space-x-2">
                {['#0077BD', '#00E676', '#8B5CF6', '#FF9800'].map((c, i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0a0e17] flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: c }}>
                    {['RO', 'MC', 'CS', 'AP'][i]}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm text-white/70 font-medium">+200 profesionales</p>
                <p className="text-xs text-white/40">Conductores y equipo administrativo</p>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ MISSION & VISION ═══ */}
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 mb-24 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '200ms' }}>
          {/* Mission */}
          <div className="group relative p-8 md:p-10 rounded-3xl bg-white/[0.03] border border-[#0077BD]/10 hover:border-[#0077BD]/30 transition-all duration-500">
            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{ boxShadow: 'inset 0 0 60px rgba(0,119,189,0.1), 0 0 30px rgba(0,119,189,0.1)' }} />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-[#0077BD]/10 flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-[#0077BD]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Nuestra Misión</h3>
              <p className="text-white/50 leading-relaxed">
                Brindar un servicio de transporte seguro, puntual y confortable, liderando la transformación
                ecológica del sector en Bolivia. Nos comprometemos a medir, reducir y neutralizar nuestras
                emisiones de carbono, ofreciendo a cada pasajero la tranquilidad de viajar con responsabilidad ambiental.
              </p>
            </div>
          </div>
          {/* Vision */}
          <div className="group relative p-8 md:p-10 rounded-3xl bg-white/[0.03] border border-[#00E676]/10 hover:border-[#00E676]/30 transition-all duration-500">
            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{ boxShadow: 'inset 0 0 60px rgba(0,230,118,0.1), 0 0 30px rgba(0,230,118,0.1)' }} />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-[#00E676]/10 flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-[#00E676]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Nuestra Visión</h3>
              <p className="text-white/50 leading-relaxed">
                Ser la empresa de transporte líder en Bolivia y referente en Latinoamérica en movilidad
                sostenible. Aspiramos a una red de transporte 100% neutral en carbono, donde cada viaje
                contribuya activamente a la regeneración del ecosistema y al bienestar de las comunidades.
              </p>
            </div>
          </div>
        </div>

        {/* ═══ TIMELINE ═══ */}
        <div className={`mb-24 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '300ms' }}>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 mb-4">
              <Clock className="w-4 h-4 text-[#00E676]" />
              <span className="text-sm text-[#00E676]">Nuestra Historia</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Línea del{' '}
              <span className="bg-gradient-to-r from-[#0077BD] to-[#00E676] bg-clip-text text-transparent">
                Tiempo
              </span>
            </h3>
          </div>

          {/* Timeline Line */}
          <div className="relative">
            {/* Vertical line - desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#0077BD]/50 via-[#00E676]/50 to-[#0077BD]/50" />
            {/* Vertical line - mobile */}
            <div className="md:hidden absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#0077BD]/50 via-[#00E676]/50 to-[#0077BD]/50" />

            <div className="space-y-8 md:space-y-12">
              {timeline.map((item, i) => {
                const isLeft = i % 2 === 0
                return (
                  <div key={item.year} className="relative">
                    {/* Desktop Layout */}
                    <div className={`hidden md:flex items-center ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
                      {/* Content Card */}
                      <div className={`w-[calc(50%-2rem)] ${isLeft ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                        <div className="group p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/10 transition-all duration-500">
                          <div className={`flex items-center gap-3 mb-3 ${isLeft ? 'justify-end' : 'justify-start'}`}>
                            <span className="text-2xl font-bold" style={{ color: item.color }}>{item.year}</span>
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${item.color}15` }}>
                              <item.icon className="w-4 h-4" style={{ color: item.color }} />
                            </div>
                          </div>
                          <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
                          <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>

                      {/* Center Dot */}
                      <div className="relative z-10 flex-shrink-0">
                        <div className="w-4 h-4 rounded-full border-2" style={{ borderColor: item.color, background: `${item.color}30` }} />
                      </div>

                      {/* Empty space */}
                      <div className="w-[calc(50%-2rem)]" />
                    </div>

                    {/* Mobile Layout */}
                    <div className="md:hidden flex items-start gap-4 pl-0">
                      <div className="relative z-10 flex-shrink-0 mt-1">
                        <div className="w-3 h-3 rounded-full border-2" style={{ borderColor: item.color, background: `${item.color}30` }} />
                      </div>
                      <div className="flex-1 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xl font-bold" style={{ color: item.color }}>{item.year}</span>
                          <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: `${item.color}15` }}>
                            <item.icon className="w-3 h-3" style={{ color: item.color }} />
                          </div>
                        </div>
                        <h4 className="text-base font-semibold text-white mb-1">{item.title}</h4>
                        <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* ═══ CEO MESSAGE ═══ */}
        <div className={`mb-24 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '400ms' }}>
          <div className="relative p-8 md:p-12 rounded-3xl bg-white/[0.03] border border-[#0077BD]/10 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#0077BD]/5 blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#00E676]/5 blur-[60px]" />
            {/* Quote mark */}
            <div className="absolute top-6 left-8 text-[#0077BD]/10 text-8xl font-serif leading-none">&ldquo;</div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
              {/* CEO Avatar */}
              <div className="md:col-span-1 flex justify-center">
                <div className="relative">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-gradient-to-br from-[#0077BD]/20 to-[#00E676]/20 flex items-center justify-center border border-white/5">
                    <div className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-[#0077BD] to-[#00E676] bg-clip-text text-transparent">
                      CEO
                    </div>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-lg bg-[#00E676]/20 flex items-center justify-center">
                    <Quote className="w-4 h-4 text-[#00E676]" />
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="md:col-span-3">
                <blockquote className="text-lg md:text-xl text-white/60 leading-relaxed mb-6 italic">
                  Cuando fundamos EcoTaxi, teníamos un sueño: que cada viaje en taxi pudiera ser un acto de
                  cuidado por nuestro planeta. Hoy, puedo decir con orgullo que no solo lo estamos logrando,
                  sino que estamos superando nuestras propias expectativas. Hemos demostrado que es posible
                  ofrecer un servicio de transporte de clase mundial mientras neutralizamos nuestra huella
                  de carbono. Este es solo el comienzo de una revolución en la movilidad sostenible de Bolivia.
                </blockquote>
                <div>
                  <p className="text-white font-semibold text-lg">Ing. Roberto O.</p>
                  <p className="text-[#0077BD] text-sm">Director General & CEO — EcoTaxi Bolivia</p>
                  <p className="text-white/30 text-xs mt-1">O&C Ingeniería y Representaciones SRL</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ VALUES ═══ */}
        <div className={`mb-24 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '500ms' }}>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF9800]/10 border border-[#FF9800]/20 mb-4">
              <Heart className="w-4 h-4 text-[#FF9800]" />
              <span className="text-sm text-[#FF9800]">Lo que nos define</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Nuestros{' '}
              <span className="bg-gradient-to-r from-[#FF9800] to-[#00E676] bg-clip-text text-transparent">
                Valores
              </span>
            </h3>
            <p className="text-white/40 max-w-xl mx-auto">
              Los principios que guían cada decisión, cada viaje y cada compromiso que asumimos.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {values.map((val, i) => (
              <div
                key={val.title}
                className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/10 hover:bg-white/[0.05] transition-all duration-500"
              >
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ boxShadow: `0 0 25px ${val.color}10` }} />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center" style={{ background: `${val.color}15` }}>
                    <val.icon className="w-6 h-6" style={{ color: val.color }} />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">{val.title}</h4>
                  <p className="text-sm text-white/40 leading-relaxed">{val.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══ TEAM ═══ */}
        <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '600ms' }}>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 mb-4">
              <Users className="w-4 h-4 text-[#8B5CF6]" />
              <span className="text-sm text-[#8B5CF6]">Liderazgo</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Nuestro{' '}
              <span className="bg-gradient-to-r from-[#8B5CF6] to-[#0077BD] bg-clip-text text-transparent">
                Equipo Directivo
              </span>
            </h3>
            <p className="text-white/40 max-w-xl mx-auto">
              Profesionales comprometidos con la excelencia y la sostenibilidad, liderando la transformación del transporte en Bolivia.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/10 hover:bg-white/[0.05] text-center transition-all duration-500"
              >
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ boxShadow: `0 0 25px ${member.color}10` }} />
                <div className="relative z-10">
                  {/* Avatar */}
                  <div className="w-20 h-20 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${member.color}20, ${member.color}40)` }}>
                    <span className="text-2xl font-bold" style={{ color: member.color }}>{member.initials}</span>
                  </div>
                  <h4 className="text-base font-semibold text-white mb-1">{member.name}</h4>
                  <p className="text-xs font-medium mb-3" style={{ color: member.color }}>{member.role}</p>
                  <p className="text-xs text-white/35 leading-relaxed">{member.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-white/20 text-xs mt-8">
            Únete a nuestro equipo de más de 200 profesionales comprometidos con el transporte sostenible.
          </p>
        </div>
      </div>
    </section>
  )
}
