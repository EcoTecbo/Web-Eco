'use client'

import { useEffect, useRef, useState } from 'react'
import anime from 'animejs'
import {
  Plane, Shield, Clock, MapPin, Star, Users, Globe,
  Phone, CreditCard, Calendar, ArrowRight, CheckCircle2,
  ChevronDown, Search, Heart, Award, Leaf
} from 'lucide-react'

/* ─── Bolivia Airports Data ─── */
const departments = [
  {
    id: 'scz', name: 'Santa Cruz', code: 'VVI',
    airport: 'Aeropuerto Internacional Viru Viru',
    city: 'Santa Cruz de la Sierra',
    rates: { sedan: 'Bs 120', suv: 'Bs 180', vip: 'Bs 280', van: 'Bs 220' },
    path: 'M 555 310 C 560 300, 580 295, 590 305 C 600 315, 595 325, 580 330 C 565 335, 550 325, 555 310 Z',
    cx: 575, cy: 315,
    desc: 'El aeropuerto más grande de Bolivia, puerta de entrada principal al país.'
  },
  {
    id: 'lpz', name: 'La Paz', code: 'LPB',
    airport: 'Aeropuerto Internacional El Alto',
    city: 'La Paz',
    rates: { sedan: 'Bs 100', suv: 'Bs 160', vip: 'Bs 250', van: 'Bs 200' },
    path: 'M 340 180 C 345 170, 365 165, 375 175 C 385 185, 380 195, 365 200 C 350 205, 335 195, 340 180 Z',
    cx: 360, cy: 185,
    desc: 'Aeropuerto internacional más alto del mundo a 4,061 msnm.'
  },
  {
    id: 'cbb', name: 'Cochabamba', code: 'CBB',
    airport: 'Aeropuerto Internacional Jorge Wilstermann',
    city: 'Cochabamba',
    rates: { sedan: 'Bs 80', suv: 'Bs 130', vip: 'Bs 200', van: 'Bs 170' },
    path: 'M 420 260 C 425 250, 445 245, 455 255 C 465 265, 460 275, 445 280 C 430 285, 415 275, 420 260 Z',
    cx: 440, cy: 265,
    desc: 'Hub de conexiones nacionales en el corazón de Bolivia.'
  },
  {
    id: 'srz', name: 'Sucre', code: 'SRE',
    airport: 'Aeropuerto Juana Azurduy de Padilla',
    city: 'Sucre',
    rates: { sedan: 'Bs 70', suv: 'Bs 120', vip: 'Bs 190', van: 'Bs 160' },
    path: 'M 480 310 C 485 300, 500 295, 510 305 C 520 315, 515 325, 500 330 C 485 335, 475 325, 480 310 Z',
    cx: 498, cy: 315,
    desc: 'Capital constitucional con servicio de transporte ejecutivo.'
  },
  {
    id: 'pti', name: 'Potosí', code: 'POI',
    airport: 'Aeropuerto Cap. Nicolás Rojas',
    city: 'Potosí',
    rates: { sedan: 'Bs 90', suv: 'Bs 140', vip: 'Bs 220', van: 'Bs 180' },
    path: 'M 400 340 C 405 330, 425 325, 435 335 C 445 345, 440 355, 425 360 C 410 365, 395 355, 400 340 Z',
    cx: 420, cy: 345,
    desc: 'Servicio al departamento minero más alto del mundo.'
  },
  {
    id: 'tja', name: 'Tarija', code: 'TJA',
    airport: 'Aeropuerto Cap. Oriel Lea Plaza',
    city: 'Tarija',
    rates: { sedan: 'Bs 80', suv: 'Bs 130', vip: 'Bs 200', van: 'Bs 170' },
    path: 'M 490 400 C 495 390, 515 385, 525 395 C 535 405, 530 415, 515 420 C 500 425, 485 415, 490 400 Z',
    cx: 510, cy: 405,
    desc: 'Conexión con el sur vitivinícola de Bolivia.'
  },
  {
    id: 'bba', name: 'Trinidad', code: 'TDD',
    airport: 'Aeropuerto Teniente Jorge Henrich Arauz',
    city: 'Trinidad, Beni',
    rates: { sedan: 'Bs 90', suv: 'Bs 150', vip: 'Bs 230', van: 'Bs 190' },
    path: 'M 470 190 C 475 180, 495 175, 505 185 C 515 195, 510 205, 495 210 C 480 215, 465 205, 470 190 Z',
    cx: 490, cy: 195,
    desc: 'Puerta de entrada a la Amazonía boliviana.'
  },
  {
    id: 'cobi', name: 'Cobija', code: 'CIJ',
    airport: 'Aeropuerto Cap. Aníbal Arab',
    city: 'Cobija, Pando',
    rates: { sedan: 'Bs 100', suv: 'Bs 160', vip: 'Bs 250', van: 'Bs 200' },
    path: 'M 360 120 C 365 110, 385 105, 395 115 C 405 125, 400 135, 385 140 C 370 145, 355 135, 360 120 Z',
    cx: 380, cy: 125,
    desc: 'Conexión con el norte amazónico fronterizo.'
  },
  {
    id: 'oruro', name: 'Oruro', code: 'ORU',
    airport: 'Aeropuerto Juan Mendoza',
    city: 'Oruro',
    rates: { sedan: 'Bs 70', suv: 'Bs 120', vip: 'Bs 180', van: 'Bs 150' },
    path: 'M 350 250 C 355 240, 370 235, 380 245 C 390 255, 385 265, 370 270 C 355 275, 345 265, 350 250 Z',
    cx: 368, cy: 255,
    desc: 'Conexión con el altiplano y el Carnaval de Oruro.'
  },
]

/* ─── Trust Stats ─── */
const trustStats = [
  { value: '50K+', label: 'Traslados aeropuerto', icon: Plane },
  { value: '9', label: 'Aeropuertos cubiertos', icon: MapPin },
  { value: '4.9', label: 'Rating promedio', icon: Star },
  { value: '500+', label: 'Agencias confían', icon: Users },
]

/* ─── Booking Form Component ─── */
function BookingForm() {
  const [formType, setFormType] = useState<'pasajero' | 'agencia'>('pasajero')
  const [formData, setFormData] = useState({
    nombre: '', email: '', telefono: '', origen: '', destino: '',
    fecha: '', hora: '', vuelo: '', vehiculo: 'sedan', pasajeros: '1',
    agencia: '', comentario: '', cartel: true, seguimiento: true,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="p-6 md:p-8 rounded-3xl bg-white/[0.03] border border-white/[0.06]">
      {/* Form Type Tabs */}
      <div className="flex gap-2 mb-8">
        {(['pasajero', 'agencia'] as const).map((type) => (
          <button
            key={type}
            onClick={() => setFormType(type)}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
              formType === type
                ? 'bg-[#0077BD]/20 text-[#0077BD] border border-[#0077BD]/30'
                : 'bg-white/[0.03] text-white/40 border border-white/[0.06] hover:text-white/60'
            }`}
          >
            {type === 'pasajero' ? '👤 Pasajero' : '🏢 Agencia de Viajes'}
          </button>
        ))}
      </div>

      <h3 className="text-xl font-bold text-white mb-2">Reserva tu Transfer</h3>
      <p className="text-white/40 text-sm mb-6">Completa el formulario y confirma tu recogida en el aeropuerto.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Nombre */}
        <div>
          <label className="block text-xs text-white/40 mb-1.5">Nombre completo</label>
          <input type="text" name="nombre" value={formData.nombre} onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white text-sm placeholder-white/20 focus:border-[#0077BD]/50 focus:outline-none transition-colors"
            placeholder="Tu nombre" />
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs text-white/40 mb-1.5">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white text-sm placeholder-white/20 focus:border-[#0077BD]/50 focus:outline-none transition-colors"
            placeholder="tu@email.com" />
        </div>

        {/* Teléfono */}
        <div>
          <label className="block text-xs text-white/40 mb-1.5">Teléfono / WhatsApp</label>
          <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white text-sm placeholder-white/20 focus:border-[#0077BD]/50 focus:outline-none transition-colors"
            placeholder="+1 555 123 4567" />
        </div>

        {/* Aeropuerto de Origen */}
        <div>
          <label className="block text-xs text-white/40 mb-1.5">Aeropuerto de llegada</label>
          <select name="origen" value={formData.origen} onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white text-sm focus:border-[#0077BD]/50 focus:outline-none transition-colors">
            <option value="" className="bg-[#0a0e17]">Seleccionar aeropuerto</option>
            {departments.map(d => (
              <option key={d.id} value={d.code} className="bg-[#0a0e17]">{d.name} ({d.code}) - {d.airport}</option>
            ))}
          </select>
        </div>

        {/* Destino */}
        <div>
          <label className="block text-xs text-white/40 mb-1.5">Destino / Hotel</label>
          <input type="text" name="destino" value={formData.destino} onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white text-sm placeholder-white/20 focus:border-[#0077BD]/50 focus:outline-none transition-colors"
            placeholder="Hotel o dirección de destino" />
        </div>

        {/* Fecha */}
        <div>
          <label className="block text-xs text-white/40 mb-1.5">Fecha de llegada</label>
          <input type="date" name="fecha" value={formData.fecha} onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white text-sm focus:border-[#0077BD]/50 focus:outline-none transition-colors" />
        </div>

        {/* Hora */}
        <div>
          <label className="block text-xs text-white/40 mb-1.5">Hora de llegada</label>
          <input type="time" name="hora" value={formData.hora} onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white text-sm focus:border-[#0077BD]/50 focus:outline-none transition-colors" />
        </div>

        {/* Número de Vuelo */}
        <div>
          <label className="block text-xs text-white/40 mb-1.5">Número de vuelo</label>
          <input type="text" name="vuelo" value={formData.vuelo} onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white text-sm placeholder-white/20 focus:border-[#0077BD]/50 focus:outline-none transition-colors"
            placeholder="OB 123" />
        </div>

        {/* Vehículo */}
        <div>
          <label className="block text-xs text-white/40 mb-1.5">Tipo de vehículo</label>
          <select name="vehiculo" value={formData.vehiculo} onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white text-sm focus:border-[#0077BD]/50 focus:outline-none transition-colors">
            <option value="sedan" className="bg-[#0a0e17]">Sedan Confort</option>
            <option value="suv" className="bg-[#0a0e17]">SUV</option>
            <option value="vip" className="bg-[#0a0e17]">Sedan VIP</option>
            <option value="van" className="bg-[#0a0e17]">Van VIP</option>
          </select>
        </div>

        {/* Pasajeros */}
        <div>
          <label className="block text-xs text-white/40 mb-1.5">Número de pasajeros</label>
          <select name="pasajeros" value={formData.pasajeros} onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white text-sm focus:border-[#0077BD]/50 focus:outline-none transition-colors">
            {[1,2,3,4,5,6,7,8].map(n => (
              <option key={n} value={n} className="bg-[#0a0e17]">{n} pasajero{n > 1 ? 's' : ''}</option>
            ))}
          </select>
        </div>

        {/* Agencia - conditional */}
        {formType === 'agencia' && (
          <div className="md:col-span-2">
            <label className="block text-xs text-white/40 mb-1.5">Nombre de la Agencia</label>
            <input type="text" name="agencia" value={formData.agencia} onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white text-sm placeholder-white/20 focus:border-[#0077BD]/50 focus:outline-none transition-colors"
              placeholder="Nombre de tu agencia de viajes" />
          </div>
        )}

        {/* Servicios incluidos */}
        <div className="md:col-span-2 flex flex-wrap gap-3">
          <label className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00E676]/5 border border-[#00E676]/10 cursor-pointer">
            <input type="checkbox" checked={formData.cartel} readOnly className="accent-[#00E676]" />
            <span className="text-sm text-white/60">🪧 Cartel de bienvenida</span>
          </label>
          <label className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0077BD]/5 border border-[#0077BD]/10 cursor-pointer">
            <input type="checkbox" checked={formData.seguimiento} readOnly className="accent-[#0077BD]" />
            <span className="text-sm text-white/60">✈️ Seguimiento de vuelo</span>
          </label>
        </div>

        {/* Comentario */}
        <div className="md:col-span-2">
          <label className="block text-xs text-white/40 mb-1.5">Comentarios adicionales</label>
          <textarea name="comentario" value={formData.comentario} onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white text-sm placeholder-white/20 focus:border-[#0077BD]/50 focus:outline-none transition-colors h-24 resize-none"
            placeholder="Instrucciones especiales, equipaje extra, etc." />
        </div>
      </div>

      {/* Submit */}
      <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
        <button className="w-full sm:w-auto px-8 py-4 rounded-full text-lg font-semibold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all duration-300 shadow-[0_0_30px_rgba(0,230,118,0.3)] hover:shadow-[0_0_50px_rgba(0,230,118,0.5)] hover:scale-105">
          <CreditCard className="w-5 h-5 inline mr-2" />
          Reservar y Pagar
        </button>
        <p className="text-xs text-white/30">Pago seguro con tarjeta de crédito/débito</p>
      </div>
    </div>
  )
}

/* ─── Main Airport Page ─── */
export function AeropuertoPage() {
  const planeRef = useRef<SVGGElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [selectedDept, setSelectedDept] = useState<string | null>(null)
  const [visible, setVisible] = useState(false)

  // Anime.js plane animation
  useEffect(() => {
    if (planeRef.current) {
      anime({
        targets: planeRef.current,
        translateX: [-100, 0],
        translateY: [50, 0],
        opacity: [0, 1],
        rotate: [-15, 0],
        duration: 2000,
        easing: 'easeOutElastic(1, 0.6)',
      })
    }
  }, [])

  // Scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.05 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const selectedAirport = departments.find(d => d.id === selectedDept)

  return (
    <div ref={sectionRef} className="min-h-screen bg-[#0a0e17] pt-20">

      {/* ═══ HERO ═══ */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1830] to-[#0a0e17]" />
        <div className="absolute top-1/3 right-0 w-[600px] h-[600px] rounded-full bg-[#0077BD]/10 blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#00E676]/5 blur-[100px]" />

        {/* Animated Plane SVG Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
          <svg viewBox="0 0 800 400" className="w-full h-full">
            <g ref={planeRef}>
              <path d="M 100 200 L 130 185 L 140 195 L 115 200 L 140 205 L 130 215 Z" fill="#0077BD" />
              <ellipse cx="120" cy="200" rx="30" ry="4" fill="#0077BD" opacity="0.5" />
            </g>
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0077BD]/10 border border-[#0077BD]/20 mb-6">
            <Plane className="w-4 h-4 text-[#0077BD]" />
            <span className="text-sm text-[#0077BD]">Transfer Aeropuerto</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
            Recogida Segura en el{' '}
            <span className="bg-gradient-to-r from-[#0077BD] to-[#00E676] bg-clip-text text-transparent">
              Aeropuerto
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/50 max-w-3xl mx-auto mb-10 leading-relaxed">
            Chofer profesional esperándote con cartel de bienvenida, seguimiento de vuelo en tiempo real
            y traslado seguro a tu destino. El servicio de confianza en los 9 principales aeropuertos de Bolivia.
          </p>

          {/* Key Features */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { icon: Shield, text: 'Recogida garantizada', color: '#00E676' },
              { icon: Clock, text: 'Seguimiento de vuelo', color: '#0077BD' },
              { icon: Star, text: 'Chofer con cartel', color: '#FF9800' },
              { icon: CreditCard, text: 'Pago online seguro', color: '#8B5CF6' },
            ].map((feat) => (
              <div key={feat.text} className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.06]">
                <feat.icon className="w-4 h-4" style={{ color: feat.color }} />
                <span className="text-sm text-white/60">{feat.text}</span>
              </div>
            ))}
          </div>

          {/* Animated Scene: Chauffeur + Plane */}
          <div className="max-w-2xl mx-auto mb-8">
            <svg viewBox="0 0 600 200" className="w-full" id="airport-scene">
              {/* Runway */}
              <rect x="0" y="170" width="600" height="4" fill="#0077BD" opacity="0.3" rx="2" />
              {[50, 150, 250, 350, 450, 550].map(x => (
                <rect key={x} x={x} y="171" width="30" height="2" fill="#0077BD" opacity="0.15" rx="1" />
              ))}

              {/* Chauffeur */}
              <g id="chauffeur">
                {/* Body */}
                <rect x="100" y="100" width="30" height="50" rx="5" fill="#1a1a2e" />
                {/* Head */}
                <circle cx="115" cy="90" r="14" fill="#c4a882" />
                {/* Hat */}
                <rect x="100" y="74" width="30" height="8" rx="3" fill="#1a1a2e" />
                <rect x="96" y="80" width="38" height="4" rx="2" fill="#1a1a2e" />
                {/* Sign */}
                <rect x="135" y="85" width="55" height="22" rx="4" fill="#0077BD" opacity="0.9" />
                <text x="162" y="100" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">ECOTAXI</text>
                <line x1="135" y1="96" x2="130" y2="110" stroke="#8B5CF6" strokeWidth="2" />
              </g>

              {/* Plane */}
              <g id="animated-plane">
                <ellipse cx="450" cy="120" rx="50" ry="6" fill="#0077BD" opacity="0.3" />
                {/* Fuselage */}
                <path d="M 380 110 L 480 105 L 490 110 L 480 115 L 380 112 Z" fill="#2a2a4a" stroke="#0077BD" strokeWidth="0.5" />
                {/* Wings */}
                <path d="M 420 108 L 440 90 L 460 108 Z" fill="#0077BD" opacity="0.6" />
                <path d="M 420 114 L 440 132 L 460 114 Z" fill="#0077BD" opacity="0.6" />
                {/* Tail */}
                <path d="M 380 105 L 390 95 L 395 107 Z" fill="#0077BD" opacity="0.5" />
                {/* Landing lights */}
                <circle cx="488" cy="110" r="2" fill="#00E676" opacity="0.8">
                  <animate attributeName="opacity" values="0.4;1;0.4" dur="1.5s" repeatCount="indefinite" />
                </circle>
              </g>

              {/* Glow under plane */}
              <ellipse cx="450" cy="170" rx="40" ry="3" fill="#00E676" opacity="0.1">
                <animate attributeName="rx" values="30;45;30" dur="2s" repeatCount="indefinite" />
              </ellipse>
            </svg>
          </div>
        </div>
      </section>

      {/* ═══ TRUST STATS ═══ */}
      <section className="py-12 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="w-6 h-6 text-[#0077BD] mx-auto mb-2" />
                <div className="text-3xl md:text-4xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-white/40 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BOLIVIA MAP ═══ */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 mb-4">
              <MapPin className="w-4 h-4 text-[#00E676]" />
              <span className="text-sm text-[#00E676]">Cobertura Nacional</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Principales{' '}
              <span className="bg-gradient-to-r from-[#0077BD] to-[#00E676] bg-clip-text text-transparent">
                Aeropuertos de Bolivia
              </span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              Haz click en cada departamento para ver la información del aeropuerto y nuestras tarifas de transfer.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            {/* Map */}
            <div className="lg:col-span-3">
              <div className="relative p-4 rounded-3xl bg-white/[0.02] border border-white/[0.06]">
                <svg viewBox="0 0 700 500" className="w-full">
                  {/* Bolivia outline (simplified) */}
                  <path
                    d="M 300 80 L 350 70 L 420 60 L 500 70 L 570 80 L 620 100 L 640 140 L 630 180 L 610 200 L 600 230 L 620 270 L 600 310 L 580 340 L 550 370 L 520 390 L 480 410 L 440 420 L 400 430 L 360 430 L 320 420 L 290 400 L 260 380 L 240 350 L 220 320 L 210 290 L 200 260 L 190 230 L 180 200 L 170 170 L 180 140 L 200 110 L 230 90 L 270 80 Z"
                    fill="rgba(0,119,189,0.05)"
                    stroke="rgba(0,119,189,0.2)"
                    strokeWidth="1.5"
                  />

                  {/* Department hotspots */}
                  {departments.map((dept) => (
                    <g key={dept.id} onClick={() => setSelectedDept(selectedDept === dept.id ? null : dept.id)}
                      className="cursor-pointer">
                      {/* Glow pulse */}
                      <circle cx={dept.cx} cy={dept.cy} r="20" fill={selectedDept === dept.id ? '#00E676' : '#0077BD'} opacity="0.1">
                        <animate attributeName="r" values="15;22;15" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.1;0.2;0.1" dur="2s" repeatCount="indefinite" />
                      </circle>
                      {/* Dot */}
                      <circle cx={dept.cx} cy={dept.cy} r={selectedDept === dept.id ? 8 : 6}
                        fill={selectedDept === dept.id ? '#00E676' : '#0077BD'}
                        stroke={selectedDept === dept.id ? '#00E676' : '#0077BD'}
                        strokeWidth="2" opacity="0.8"
                        className="transition-all duration-300" />
                      {/* Label */}
                      <text x={dept.cx} y={dept.cy - 14} textAnchor="middle"
                        fill={selectedDept === dept.id ? '#00E676' : 'rgba(255,255,255,0.5)'}
                        fontSize="10" fontWeight="500"
                        className="pointer-events-none">
                        {dept.name}
                      </text>
                      {/* Airport code */}
                      <text x={dept.cx} y={dept.cy + 20} textAnchor="middle"
                        fill={selectedDept === dept.id ? '#00E676' : 'rgba(0,119,189,0.5)'}
                        fontSize="8" fontWeight="700"
                        className="pointer-events-none">
                        {dept.code}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
            </div>

            {/* Airport Info Panel */}
            <div className="lg:col-span-2">
              {selectedAirport ? (
                <div className="p-6 rounded-3xl bg-white/[0.03] border border-[#0077BD]/20 transition-all duration-500">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#0077BD]/10 flex items-center justify-center">
                      <Plane className="w-6 h-6 text-[#0077BD]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{selectedAirport.name}</h3>
                      <p className="text-xs text-[#0077BD]">{selectedAirport.code}</p>
                    </div>
                  </div>

                  <p className="text-sm text-white/40 mb-2">
                    <MapPin className="w-3.5 h-3.5 inline mr-1" />
                    {selectedAirport.airport}
                  </p>
                  <p className="text-sm text-white/30 mb-6">{selectedAirport.desc}</p>

                  <h4 className="text-sm font-semibold text-white/60 mb-3 uppercase tracking-wider">Tarifas de Transfer</h4>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {Object.entries(selectedAirport.rates).map(([type, price]) => (
                      <div key={type} className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                        <p className="text-xs text-white/30 capitalize">{type === 'vip' ? 'VIP' : type}</p>
                        <p className="text-lg font-bold text-[#00E676]">{price}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-sm text-white/40">
                      <CheckCircle2 className="w-4 h-4 text-[#00E676]" />
                      <span>Cartel de bienvenida incluido</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/40">
                      <CheckCircle2 className="w-4 h-4 text-[#0077BD]" />
                      <span>Seguimiento de vuelo en tiempo real</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/40">
                      <CheckCircle2 className="w-4 h-4 text-[#FF9800]" />
                      <span>Espera sin costo por retrasos</span>
                    </div>
                  </div>

                  <button
                    onClick={() => document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="w-full mt-6 px-6 py-3 rounded-full text-sm font-semibold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all duration-300 shadow-[0_0_20px_rgba(0,230,118,0.2)]"
                  >
                    Reservar Transfer a {selectedAirport.name}
                  </button>
                </div>
              ) : (
                <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.06] text-center">
                  <MapPin className="w-12 h-12 text-white/10 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white/40 mb-2">Selecciona un Aeropuerto</h3>
                  <p className="text-sm text-white/25">Haz click en el mapa para ver la información del aeropuerto y tarifas de transfer.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ EXCLUSIVE SERVICES ═══ */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#0a0e17] via-[#0d1830] to-[#0a0e17]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Servicio{' '}
              <span className="bg-gradient-to-r from-[#FF9800] to-[#00E676] bg-clip-text text-transparent">
                Exclusivo Aeropuerto
              </span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              Nuestros vehículos exclusivos para transfer aeropuerto, equipados con todo lo que necesitas después de un vuelo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              { icon: Shield, title: 'Recogida Garantizada', desc: 'Tu chofer te espera en la terminal con un cartel con tu nombre. Si tu vuelo se retrasa, nosotros ajustamos el horario automáticamente sin costo adicional.', color: '#00E676' },
              { icon: Plane, title: 'Seguimiento de Vuelo', desc: 'Monitoreamos tu vuelo en tiempo real para estar allí exactamente cuando aterrices. Nunca tendrás que esperar ni preocuparte por cambios de horario.', color: '#0077BD' },
              { icon: Star, title: 'Vehículos Premium', desc: 'Sedan VIP, SUV VIP y Van VIP equipados con A/C, WiFi, agua y cargador USB. El confort que mereces después de un viaje largo.', color: '#FF9800' },
            ].map((service) => (
              <div key={service.title} className="group relative p-8 rounded-3xl bg-white/[0.03] border border-white/[0.06] hover:border-white/10 transition-all duration-500">
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ boxShadow: `0 0 30px ${service.color}10` }} />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl mb-6 flex items-center justify-center" style={{ background: `${service.color}15` }}>
                    <service.icon className="w-7 h-7" style={{ color: service.color }} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TRUST SECTION ═══ */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-[#0077BD]/5 to-[#00E676]/5 border border-[#0077BD]/10">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF9800]/10 border border-[#FF9800]/20 mb-4">
                <Award className="w-4 h-4 text-[#FF9800]" />
                <span className="text-sm text-[#FF9800]">Confianza Internacional</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Las Mejores Agencias y Viajeros{' '}
                <span className="text-[#00E676]">Confían en Nosotros</span>
              </h2>
              <p className="text-white/50 max-w-2xl mx-auto">
                Operadores turísticos, agencias de viajes internacionales y miles de viajeros extranjeros
                eligen Ecotaxi para su recogida en los aeropuertos de Bolivia.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {[
                { label: 'Booking.com', desc: 'Transporte verificado' },
                { label: 'TripAdvisor', desc: 'Certificado de excelencia' },
                { label: 'GetYourGuide', desc: 'Partner oficial' },
                { label: 'Viator', desc: 'Servicio premium' },
              ].map((partner) => (
                <div key={partner.label} className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
                  <Globe className="w-6 h-6 text-[#0077BD] mx-auto mb-2" />
                  <p className="text-sm font-semibold text-white/80">{partner.label}</p>
                  <p className="text-xs text-white/30">{partner.desc}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { quote: 'El mejor servicio de transfer que he usado en Sudamérica. Puntuales y profesionales.', author: 'Marie L.', from: 'Francia', stars: 5 },
                { quote: 'Reservo para todos mis clientes que viajan a Bolivia. Nunca fallan.', author: 'Carlos M.', from: 'Agencia Viajes Chile', stars: 5 },
                { quote: 'Llegué tarde por un retraso y el chofer me esperaba con una sonrisa. Excelente.', author: 'John S.', from: 'Estados Unidos', stars: 5 },
              ].map((review) => (
                <div key={review.author} className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                  <div className="flex gap-1 mb-3">
                    {[...Array(review.stars)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#FF9800] text-[#FF9800]" />
                    ))}
                  </div>
                  <p className="text-sm text-white/50 leading-relaxed mb-3 italic">&ldquo;{review.quote}&rdquo;</p>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#0077BD]/20 flex items-center justify-center text-xs text-[#0077BD] font-bold">
                      {review.author[0]}
                    </div>
                    <div>
                      <p className="text-xs text-white/60 font-medium">{review.author}</p>
                      <p className="text-[10px] text-white/30">{review.from}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ BOOKING FORM ═══ */}
      <section id="booking-section" className="py-16 md:py-24 bg-gradient-to-b from-[#0a0e17] via-[#0d1830] to-[#0a0e17]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 mb-4">
              <CreditCard className="w-4 h-4 text-[#00E676]" />
              <span className="text-sm text-[#00E676]">Reserva Online</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Reserva tu{' '}
              <span className="bg-gradient-to-r from-[#0077BD] to-[#00E676] bg-clip-text text-transparent">
                Transfer Aeropuerto
              </span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              Para pasajeros y agencias de viajes. Pago seguro con tarjeta de crédito desde el exterior.
              Incluye cartel de bienvenida y seguimiento de vuelo.
            </p>
          </div>

          <BookingForm />
        </div>
      </section>

      {/* ═══ FLIGHT TRACKER ═══ */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0077BD]/10 border border-[#0077BD]/20 mb-4">
                <Plane className="w-4 h-4 text-[#0077BD]" />
                <span className="text-sm text-[#0077BD]">En Tiempo Real</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Seguimiento de{' '}
                <span className="text-[#0077BD]">Vuelo</span>
              </h2>
              <p className="text-white/50 leading-relaxed mb-6">
                Monitoreamos tu vuelo en tiempo real para garantizar que tu chofer esté en el aeropuerto
                exactamente cuando aterrices. Si tu vuelo se adelanta o se retrasa, ajustamos automáticamente
                la hora de recogida sin ningún costo adicional.
              </p>
              <div className="space-y-3">
                {[
                  'Monitoreo 24/7 de vuelos nacionales e internacionales',
                  'Ajuste automático por retrasos o adelantos',
                  'Notificación por WhatsApp cuando tu chofer está en camino',
                  'Sin cargo adicional por espera por retraso de vuelo',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-white/50">
                    <CheckCircle2 className="w-4 h-4 text-[#00E676] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Flight tracker mockup */}
            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/[0.06]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#0077BD]/10 flex items-center justify-center">
                  <Search className="w-5 h-5 text-[#0077BD]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white/70">Seguimiento de Vuelo</p>
                  <p className="text-xs text-white/30">Estado en tiempo real</p>
                </div>
              </div>

              {/* Mock flight card */}
              <div className="p-5 rounded-2xl bg-[#0077BD]/5 border border-[#0077BD]/10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-bold text-white">OB 742</span>
                  <span className="px-3 py-1 rounded-full bg-[#00E676]/10 text-[#00E676] text-xs font-medium">En vuelo</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-center">
                    <p className="text-xl font-bold text-white">MIA</p>
                    <p className="text-xs text-white/30">Miami</p>
                    <p className="text-sm text-white/50">08:30</p>
                  </div>
                  <div className="flex-1 px-4">
                    <div className="relative h-px bg-white/10">
                      <Plane className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-[#0077BD]" />
                      <div className="absolute left-0 top-0 h-px bg-[#0077BD]" style={{ width: '70%' }} />
                    </div>
                    <p className="text-[10px] text-white/20 text-center mt-2">5h 30m</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-white">VVI</p>
                    <p className="text-xs text-white/30">Santa Cruz</p>
                    <p className="text-sm text-[#00E676]">14:00</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/30">
                  <Clock className="w-3 h-3" />
                  <span>Chofer asignado · Llegada estimada: 14:00 BST</span>
                </div>
              </div>

              {/* Arrival notification mockup */}
              <div className="mt-4 p-4 rounded-xl bg-[#00E676]/5 border border-[#00E676]/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#00E676]/10 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-[#00E676]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#00E676] font-medium">Notificación WhatsApp</p>
                    <p className="text-[11px] text-white/40">Tu chofer Roberto te espera en la Terminal Internacional con cartel &quot;ECOTAXI - [Tu Nombre]&quot;</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ BACK TO HOME ═══ */}
      <section className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white/30 text-sm mb-4">¿Necesitas otro servicio de transporte?</p>
          <a href="#home" onClick={(e) => { e.preventDefault(); window.location.hash = '' }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium text-white border border-white/10 hover:border-[#00E676]/30 hover:bg-white/5 transition-all duration-300">
            ← Volver al Inicio
          </a>
        </div>
      </section>
    </div>
  )
}
