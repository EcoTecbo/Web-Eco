'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Plane, Shield, Clock, MapPin, CreditCard, Users,
  Star, Award, Globe, CheckCircle2, ChevronRight,
  Phone, ArrowRight, Eye, Heart, Luggage, UserCheck,
  BadgeCheck, Car
} from 'lucide-react'
import { BoliviaMap } from '@/components/aeropuerto/bolivia-map'

export default function TransferAeropuertoPage() {
  const [flightChecked, setFlightChecked] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    const form = e.currentTarget as HTMLFormElement
    const formData = new FormData(form)
    const fields: Record<string, string | string[]> = {}
    // Handle checkboxes (multiple values)
    const checkboxes = form.querySelectorAll<HTMLInputElement>('input[type="checkbox"]')
    const checkedExtras: string[] = []
    checkboxes.forEach(cb => {
      if (cb.checked && cb.name !== 'extras' && !cb.name) {
        // The extras checkboxes don't have a name attribute — use their label text
        checkedExtras.push(cb.parentElement?.querySelector('span')?.textContent || 'Extra')
      }
    })
    if (checkedExtras.length > 0) fields.serviciosIncluidos = checkedExtras
    // Handle named fields
    formData.forEach((value, key) => {
      if (key === 'extras') return
      fields[key] = String(value)
    })
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'transfer-aeropuerto',
          fields,
          meta: { page: '/transfer-aeropuerto', submittedAt: new Date().toISOString() },
        }),
      })
      if (res.ok) {
        setFormSubmitted(true)
      } else {
        alert('No se pudo enviar por correo. Te redirigimos a WhatsApp.')
        window.open('https://wa.me/59173662803?text=' + encodeURIComponent('Hola, quiero reservar un transfer aeropuerto.'), '_blank')
      }
    } catch (err) {
      console.error('[transfer-aeropuerto] submit error:', err)
      alert('Error de conexión. Te redirigimos a WhatsApp.')
      window.open('https://wa.me/59173662803', '_blank')
    } finally {
      setIsSubmitting(false)
    }
  }
  const heroRef = useRef<HTMLDivElement>(null)
  const planeRef = useRef<SVGSVGElement>(null)

  /* Simple entrance animation using CSS */
  useEffect(() => {
    const timer = setTimeout(() => setFlightChecked(true), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0e17]">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0e17]/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <a href="/" className="flex items-center gap-2">
              <img
                src="/logo-ecotaxi.webp"
                alt="Ecotaxi Logo"
                className="h-10 md:h-12 w-10 md:w-12 object-contain drop-shadow-[0_0_10px_rgba(0,230,118,0.2)]"
              />
            </a>
            <div className="hidden md:flex items-center gap-6">
              <a href="/" className="text-sm text-white/70 hover:text-white transition-colors">Inicio</a>
              <a href="/nosotros" className="text-sm text-white/70 hover:text-white transition-colors">Nosotros</a>
              <span className="text-sm text-[#00E676] font-medium">Transfer Aeropuerto</span>
              <a href="/#reservas" className="px-5 py-2 rounded-full text-sm font-semibold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all shadow-[0_0_15px_rgba(0,230,118,0.2)]">
                Pedir Taxi
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        {/* ══════ HERO ══════ */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e17] via-[#0d1a2e] to-[#0a0e17]" />
            {/* Runway lights effect */}
            <div className="absolute bottom-0 left-0 right-0 h-1/3">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute bottom-0 w-1 bg-[#00E676]/20 rounded-full"
                  style={{
                    left: `${5 + i * 4.5}%`,
                    height: `${30 + Math.random() * 60}px`,
                    animationDelay: `${i * 0.1}s`,
                    animation: 'runwayPulse 2s ease-in-out infinite alternate',
                  }}
                />
              ))}
            </div>
            {/* Orbs */}
            <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#0077BD]/15 blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[#00E676]/10 blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
          </div>

          {/* Animated Plane SVG */}
          <div className="absolute top-16 right-8 md:right-20 opacity-20">
            <svg ref={planeRef} width="120" height="120" viewBox="0 0 120 120" className="animate-plane-landing">
              <path d="M60 10 L75 40 L110 50 L75 60 L80 100 L60 80 L40 100 L45 60 L10 50 L45 40 Z" fill="#0077BD" stroke="#00E676" strokeWidth="1" />
            </svg>
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0077BD]/10 border border-[#0077BD]/20 mb-8 backdrop-blur-sm">
              <Plane className="w-4 h-4 text-[#0077BD]" />
              <span className="text-sm text-[#0077BD]">Servicio exclusivo de aeropuerto</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Transfer Aeropuerto
              <br />
              <span className="bg-gradient-to-r from-[#0077BD] via-[#00E676] to-[#0077BD] bg-clip-text text-transparent">
                Seguro y Puntual
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-10 leading-relaxed">
              Recogida en los principales aeropuertos de Bolivia con chofer profesional,
              cartel de bienvenida, seguimiento de vuelo en tiempo real y vehículos exclusivos.
              Hoteles, agencias de viajes y extranjeros confían en nuestro servicio.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              {[
                { icon: Shield, text: 'Recojo garantizado' },
                { icon: Clock, text: 'Seguimiento de vuelo' },
                { icon: UserCheck, text: 'Cartel de bienvenida' },
                { icon: CreditCard, text: 'Pago online con tarjeta' },
              ].map((badge) => (
                <div key={badge.text} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                  <badge.icon className="w-4 h-4 text-[#00E676]" />
                  <span className="text-sm text-white/70">{badge.text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#reserva-aeropuerto" className="px-8 py-4 rounded-full text-lg font-semibold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all duration-300 shadow-[0_0_30px_rgba(0,230,118,0.3)] hover:shadow-[0_0_50px_rgba(0,230,118,0.5)] hover:scale-105">
                Reservar Transfer
              </a>
              <a href="#mapa-aeropuertos" className="px-8 py-4 rounded-full text-lg font-semibold text-white border border-white/20 hover:border-[#0077BD]/50 hover:bg-white/5 transition-all duration-300">
                Ver Aeropuertos
              </a>
            </div>
          </div>

          {/* Animated plane landing path */}
          <style jsx>{`
            @keyframes runwayPulse {
              0% { opacity: 0.1; }
              100% { opacity: 0.4; }
            }
          `}</style>
        </section>

        {/* ══════ TRUST SIGNALS ══════ */}
        <section className="relative py-16 md:py-20">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-4">
                <Award className="w-4 h-4 text-amber-400" />
                <span className="text-sm text-amber-400">Confianza Internacional</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Los Mejores Hoteles, Agencias y Viajeros{' '}
                <span className="text-[#00E676]">Confían en Nosotros</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {[
                { icon: Globe, title: 'Agencias de Viajes', desc: 'Más de 50 agencias de viajes y OTAs confían en nuestro servicio de transfer para sus clientes internacionales. Facturación corporativa y reportes automáticos disponibles.', color: '#0077BD' },
                { icon: Star, title: 'Hoteles de Primera', desc: 'Los mejores hoteles de Bolivia nos recomiendan como su servicio de recogida en aeropuerto. Integración directa con sistemas de conserjería y reservas.', color: '#FF9800' },
                { icon: Users, title: 'Viajeros Extranjeros', desc: 'Miles de viajeros internacionales nos eligen por nuestra puntualidad, seguridad y servicio con cartel de bienvenida. Pagos seguros con tarjeta desde el exterior.', color: '#00E676' },
              ].map((item) => (
                <div key={item.title} className="group relative p-8 rounded-3xl bg-white/[0.03] border border-white/[0.06] hover:border-white/10 hover:bg-white/[0.05] transition-all duration-500">
                  <div className="w-14 h-14 rounded-2xl mb-6 flex items-center justify-center" style={{ background: `${item.color}15` }}>
                    <item.icon className="w-7 h-7" style={{ color: item.color }} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: '9', label: 'Aeropuertos cubiertos' },
                { value: '50K+', label: 'Transfer realizados' },
                { value: '50+', label: 'Agencias asociadas' },
                { value: '99%', label: 'Puntualidad' },
              ].map((stat) => (
                <div key={stat.label} className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center">
                  <div className="text-3xl font-bold text-[#00E676]">{stat.value}</div>
                  <div className="text-xs text-white/40 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════ MAP SECTION ══════ */}
        <section id="mapa-aeropuertos" className="relative py-24 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0f1628] to-[#0a0e17]" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0077BD]/10 border border-[#0077BD]/20 mb-4">
                <MapPin className="w-4 h-4 text-[#0077BD]" />
                <span className="text-sm text-[#0077BD]">Cobertura Nacional</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Aeropuertos de{' '}
                <span className="bg-gradient-to-r from-[#0077BD] to-[#00E676] bg-clip-text text-transparent">Bolivia</span>
              </h2>
              <p className="text-white/50 max-w-2xl mx-auto text-lg">
                Haz click en cada departamento para ver la información del aeropuerto, tarifas y disponibilidad de seguimiento de vuelo.
              </p>
            </div>
            <BoliviaMap />
          </div>
        </section>

        {/* ══════ EXCLUSIVE FEATURES ══════ */}
        <section className="relative py-24 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 mb-4">
                <Shield className="w-4 h-4 text-[#00E676]" />
                <span className="text-sm text-[#00E676]">Servicio Exclusivo</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                ¿Por qué elegir nuestro{' '}
                <span className="bg-gradient-to-r from-[#00E676] to-[#0077BD] bg-clip-text text-transparent">Transfer?</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: UserCheck, title: 'Cartel de Bienvenida', desc: 'Nuestro chofer te esperará en la zona de llegadas con un cartel con tu nombre. Sin estrés, sin esperas, sin confusiones.', color: '#00E676' },
                { icon: Eye, title: 'Seguimiento de Vuelo', desc: 'Monitoreamos tu vuelo en tiempo real. Si hay retrasos, ajustamos automáticamente la hora de recogida sin costo adicional.', color: '#0077BD' },
                { icon: Clock, title: 'Espera sin Costo', desc: 'Incluimos 60 minutos de espera gratuita después del aterrizaje para que pases migración y aduana tranquilamente.', color: '#FF9800' },
                { icon: Car, title: 'Vehículos Exclusivos', desc: 'Flota dedicada para aeropuerto: Sedan VIP, SUV VIP y Van VIP. Vehículos impecables con aire acondicionado y espacio para equipaje.', color: '#8B5CF6' },
                { icon: CreditCard, title: 'Pago Online Seguro', desc: 'Reserva y paga con tarjeta de crédito o débito desde cualquier país. Transacciones seguras con confirmación inmediata.', color: '#00E676' },
                { icon: BadgeCheck, title: 'Conductores Certificados', desc: 'Conductores profesionales con licencia vigente, uniforme y capacitación en atención a pasajeros internacionales.', color: '#0077BD' },
              ].map((feature) => (
                <div key={feature.title} className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/10 hover:bg-white/[0.05] transition-all duration-500">
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ boxShadow: `0 0 30px ${feature.color}10` }} />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center" style={{ background: `${feature.color}15` }}>
                      <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-sm text-white/40 leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════ RESERVATION FORM ══════ */}
        <section id="reserva-aeropuerto" className="relative py-24 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#071a10] to-[#0a0e17]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#0077BD]/8 blur-[150px]" />
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 mb-4">
                <CreditCard className="w-4 h-4 text-[#00E676]" />
                <span className="text-sm text-[#00E676]">Reserva Online</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Reserva tu{' '}
                <span className="bg-gradient-to-r from-[#00E676] to-[#0077BD] bg-clip-text text-transparent">Transfer</span>
              </h2>
              <p className="text-white/50 max-w-2xl mx-auto">
                Completa el formulario y recibe confirmación inmediata. Para agencias de viajes, contáctanos para tarifas corporativas.
              </p>
            </div>

            {/* Form */}
            <div className="p-6 md:p-10 rounded-3xl bg-white/[0.03] border border-white/[0.06]">
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Row 1: Service Type */}
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">Tipo de Servicio</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { value: 'llegada', label: 'Recojo en Aeropuerto', desc: 'Llegada + Cartel de bienvenida' },
                      { value: 'salida', label: 'Traslado al Aeropuerto', desc: 'Desde tu hotel/domicilio' },
                    ].map((opt) => (
                      <label key={opt.value} className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-[#00E676]/30 cursor-pointer transition-all">
                        <input type="radio" name="service_type" value={opt.value} defaultChecked={opt.value === 'llegada'} className="accent-[#00E676]" />
                        <div>
                          <p className="text-sm font-medium text-white/80">{opt.label}</p>
                          <p className="text-xs text-white/30">{opt.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Row 2: Airport */}
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">Aeropuerto</label>
                  <select name="aeropuerto" className="w-full p-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white/80 text-sm focus:border-[#00E676]/50 focus:outline-none">
                    <option value="">Selecciona el aeropuerto</option>
                    <option value="LPB">LPB - Aeropuerto Internacional El Alto (La Paz)</option>
                    <option value="VVI">VVI - Aeropuerto Internacional Viru Viru (Santa Cruz)</option>
                    <option value="CBB">CBB - Aeropuerto Jorge Wilstermann (Cochabamba)</option>
                    <option value="TJA">TJA - Aeropuerto Oriel Lea Plaza (Tarija)</option>
                    <option value="SRE">SRE - Aeropuerto Juana Azurduy (Sucre)</option>
                    <option value="POI">POI - Aeropuerto Cap. Nicolás Rojas (Potosí)</option>
                    <option value="ORU">ORU - Aeropuerto Juan Mendoza (Oruro)</option>
                    <option value="TDD">TDD - Aeropuerto Tte. J. Henrich (Trinidad)</option>
                    <option value="CIJ">CIJ - Aeropuerto Cap. Aníbal Arab (Cobija)</option>
                  </select>
                </div>

                {/* Row 3: Flight info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">Número de Vuelo</label>
                    <input type="text" name="numeroVuelo" placeholder="Ej: OB770, AV98" className="w-full p-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white/80 text-sm placeholder:text-white/20 focus:border-[#00E676]/50 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">Fecha y Hora</label>
                    <input type="datetime-local" name="fechaHora" className="w-full p-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white/80 text-sm focus:border-[#00E676]/50 focus:outline-none" />
                  </div>
                </div>

                {/* Row 4: Passenger info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">Nombre del Pasajero</label>
                    <input type="text" name="nombrePasajero" placeholder="Nombre completo (para el cartel)" className="w-full p-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white/80 text-sm placeholder:text-white/20 focus:border-[#00E676]/50 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">Email</label>
                    <input type="email" name="email" placeholder="correo@ejemplo.com" className="w-full p-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white/80 text-sm placeholder:text-white/20 focus:border-[#00E676]/50 focus:outline-none" />
                  </div>
                </div>

                {/* Row 5: Destination + Vehicle */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">Destino / Hotel</label>
                    <input type="text" name="destino" placeholder="Dirección o nombre del hotel" className="w-full p-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white/80 text-sm placeholder:text-white/20 focus:border-[#00E676]/50 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">Vehículo</label>
                    <select name="vehiculo" className="w-full p-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white/80 text-sm focus:border-[#00E676]/50 focus:outline-none">
                      <option value="sedan">Sedan Confort (4 pasajeros)</option>
                      <option value="suv">SUV Confort (4 pasajeros)</option>
                      <option value="sedan-vip">Sedan VIP (4 pasajeros)</option>
                      <option value="van-vip">Van VIP (4-8 pasajeros)</option>
                    </select>
                  </div>
                </div>

                {/* Extras */}
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">Servicios Incluidos</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { label: 'Cartel de bienvenida', checked: true },
                      { label: 'Seguimiento de vuelo', checked: true },
                      { label: '60 min de espera gratuita', checked: true },
                      { label: 'Asistencia con equipaje', checked: false },
                      { label: 'Silla infantil', checked: false },
                      { label: 'Agua embotellada', checked: false },
                    ].map((extra) => (
                      <label key={extra.label} className="flex items-center gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] cursor-pointer hover:border-white/10 transition-all">
                        <input type="checkbox" defaultChecked={extra.checked} className="accent-[#00E676]" />
                        <span className="text-xs text-white/60">{extra.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Client Type */}
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">Tipo de Cliente</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {['Particular', 'Agencia de Viajes', 'Empresa', 'Hotel'].map((type) => (
                      <label key={type} className="flex items-center justify-center p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] cursor-pointer hover:border-[#00E676]/30 transition-all">
                        <input type="radio" name="client_type" value={type.toLowerCase()} defaultChecked={type === 'Particular'} className="accent-[#00E676] mr-2" />
                        <span className="text-xs text-white/60">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Payment */}
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">Método de Pago</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: 'online', label: 'Pago Online con Tarjeta', desc: 'Visa, Mastercard, AMEX', icon: CreditCard },
                      { value: 'cash', label: 'Pago en Efectivo', desc: 'Al momento del servicio', icon: Phone },
                    ].map((pay) => (
                      <label key={pay.value} className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-[#00E676]/30 cursor-pointer transition-all">
                        <input type="radio" name="payment" value={pay.value} defaultChecked={pay.value === 'online'} className="accent-[#00E676]" />
                        <div>
                          <p className="text-sm font-medium text-white/80">{pay.label}</p>
                          <p className="text-xs text-white/30">{pay.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting || formSubmitted}
                  className="w-full px-8 py-4 rounded-full text-lg font-semibold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all duration-300 shadow-[0_0_30px_rgba(0,230,118,0.3)] hover:shadow-[0_0_50px_rgba(0,230,118,0.5)] flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {formSubmitted ? '✓ Reserva Enviada' : isSubmitting ? 'Enviando...' : 'Confirmar Reserva'}
                  {!formSubmitted && <ArrowRight className="w-5 h-5" />}
                </button>

                <p className="text-center text-white/20 text-xs">
                  Reserva confirmada al instante. Recibirás un email con los detalles del servicio y la información de tu conductor.
                </p>
              </form>
            </div>
          </div>
        </section>

        {/* ══════ FLIGHT TRACKING ══════ */}
        <section className="relative py-24 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0f1628] to-[#0a0e17]" />
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0077BD]/10 border border-[#0077BD]/20 mb-4">
                <Eye className="w-4 h-4 text-[#0077BD]" />
                <span className="text-sm text-[#0077BD]">En Tiempo Real</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Seguimiento de{' '}
                <span className="bg-gradient-to-r from-[#0077BD] to-[#00E676] bg-clip-text text-transparent">Vuelo</span>
              </h2>
              <p className="text-white/50 max-w-2xl mx-auto">
                Ingresa tu número de vuelo para verificar el estado en tiempo real. Nuestro equipo monitorea cada vuelo para ajustar la hora de recogida.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/[0.06]">
              <div className="flex gap-3 mb-6">
                <input
                  type="text"
                  placeholder="Número de vuelo (Ej: OB770)"
                  className="flex-1 p-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white/80 text-sm placeholder:text-white/20 focus:border-[#00E676]/50 focus:outline-none"
                />
                <button className="px-6 py-3 rounded-xl text-sm font-semibold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all">
                  Rastrear
                </button>
              </div>
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.04] border-dashed text-center">
                <Plane className="w-10 h-10 text-white/10 mx-auto mb-3" />
                <p className="text-white/30 text-sm">Ingresa un número de vuelo para ver su estado actual</p>
                <p className="text-white/15 text-xs mt-1">Datos proporcionados por sistemas de seguimiento aéreo en tiempo real</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#060a12] border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs">&copy; {new Date().getFullYear()} ecotaxi.com.bo — O&C Ingeniería y Representaciones SRL</p>
          <div className="flex items-center gap-4">
            <a href="/" className="text-white/20 hover:text-white/40 text-xs transition-colors">Inicio</a>
            <a href="/nosotros" className="text-white/20 hover:text-white/40 text-xs transition-colors">Nosotros</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
