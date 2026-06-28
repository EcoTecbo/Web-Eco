'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Building2, Globe, Plane, Hotel, MapPin, Shield, Leaf, Clock,
  CheckCircle2, Star, Phone, Mail, ArrowRight, Zap, Users,
  TrendingUp, CreditCard, BarChart3, Smartphone, Settings,
  Award, ChevronRight, Handshake, CircleDollarSign, Car,
  Bus, Truck, Wrench, Bike, Crown, Package, TreePine,
  ExternalLink, FileText, Eye, UserCheck, BadgeCheck,
  Radio, MonitorSmartphone, HandCoins, Banknote,
  LucideIcon, PlaneTakeoff, BedDouble, Compass, Headphones
} from 'lucide-react'
import { Navbar } from '@/components/ecotaxi/navbar'
import { Footer } from '@/components/ecotaxi/footer'

/* ─── scroll-triggered animation hook ─── */
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
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,230,118,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,230,118,0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[#0077BD]/15 blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#00E676]/10 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 pb-16">
        <AnimatedSection>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0077BD]/10 border border-[#0077BD]/20 mb-8 backdrop-blur-sm">
            <Handshake className="w-4 h-4 text-[#0077BD]" />
            <span className="text-sm text-[#0077BD] font-medium">Programa para Agencias y OTAs</span>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Tu Partner de{' '}
            <span className="bg-gradient-to-r from-[#00E676] via-[#0077BD] to-[#00E676] bg-clip-text text-transparent">
              Transporte Terrestre
            </span>
          </h1>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-6 leading-relaxed">
            Revende los servicios de Ecotaxi como propios. Coloca tus propias tarifas y comisiones.
            Nosotros te proveemos de todo tipo de vehículo terrestre para que tus clientes viajen
            con la mejor experiencia, desde aeropuertos hasta circuitos turísticos.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={250}>
          <p className="text-base text-[#00E676]/80 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
            OTAs, Agencias de Viajes, Tour Operadores y Hoteles ya confían en Ecotaxi
            para el transporte de sus pasajeros en Bolivia.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={300}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a
              href="#registro"
              className="px-8 py-4 rounded-full text-lg font-semibold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all duration-300 shadow-[0_0_30px_rgba(0,230,118,0.3)] hover:shadow-[0_0_50px_rgba(0,230,118,0.5)] hover:scale-105"
            >
              Registrar mi Agencia
            </a>
            <a
              href="#como-funciona"
              className="px-8 py-4 rounded-full text-lg font-semibold text-white border border-white/20 hover:border-[#00E676]/50 hover:bg-white/5 transition-all duration-300"
            >
              Cómo Funciona
            </a>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={400}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { value: '50+', label: 'Agencias Activas', icon: Globe },
              { value: '10+', label: 'Años de Experiencia', icon: Award },
              { value: '20%', label: 'Comisión Máxima', icon: CircleDollarSign },
              { value: '24/7', label: 'Soporte Bilingüe', icon: Headphones },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-[#00E676]/20 transition-all duration-300"
              >
                <stat.icon className="w-5 h-5 text-[#00E676] mx-auto mb-2" />
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
   2. WHO IS THIS FOR SECTION
   ═══════════════════════════════════════════════════════════════════════════════ */
const targetAudience = [
  {
    icon: Globe,
    title: 'OTAs y Plataformas Online',
    description: 'Integra nuestros servicios de transporte terrestre en tu plataforma. Conecta vía API o reserva manualmente con confirmación instantánea. Tus clientes reservan traslados sin fricción, tú estableces el margen que desees sobre nuestras tarifas netas.',
    color: '#0077BD',
    features: ['Conexión API disponible', 'Tarifas netas para reventa', 'Confirmación instantánea'],
  },
  {
    icon: Compass,
    title: 'Agencias de Viajes',
    description: 'Ofrece traslados aeropuerto-hotel, circuitos turísticos y transporte puerta a puerta a tus clientes sin operar tu propia flota. Ecotaxi funciona como tu partner invisible: tus clientes reciben un servicio de primer nivel bajo tu marca.',
    color: '#00E676',
    features: ['Marca blanca disponible', 'Circuitos turísticos incluidos', 'Meet & Greet en aeropuerto'],
  },
  {
    icon: PlaneTakeoff,
    title: 'Tour Operadores',
    description: 'Gestiona el transporte terrestre de grupos grandes o pequeños para tus paquetes turísticos. Desde un city tour hasta un circuito multinacional, tenemos la flota adecuada: autos, vans, minibuses y buses con conductor profesional.',
    color: '#FF9800',
    features: ['Flota para grupos de cualquier tamaño', 'Conductores turísticos capacitados', 'Cobertura nacional'],
  },
  {
    icon: BedDouble,
    title: 'Hoteles y Resorts',
    description: 'Brinda a tus huéspedes un servicio premium de traslado desde el aeropuerto o terminal. Ofrece transporte como un servicio más de tu hotel, con tus propias tarifas y márgenes. Nosotros nos encargamos de la operación.',
    color: '#71B124',
    features: ['Traslados aeropuerto-hotel', 'Servicio VIP con cartel de bienvenida', 'Comisiones por cada reserva'],
  },
]

function TargetAudienceSection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-[#0077BD]/5 blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0077BD]/10 border border-[#0077BD]/20 mb-4">
              <Users className="w-4 h-4 text-[#0077BD]" />
              <span className="text-sm text-[#0077BD]">Para Quién Es</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Diseñado para{' '}
              <span className="bg-gradient-to-r from-[#0077BD] to-[#00E676] bg-clip-text text-transparent">
                tu negocio
              </span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              Si tu negocio envía pasajeros a Bolivia, Ecotaxi es tu partner de transporte terrestre.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {targetAudience.map((item, i) => (
            <AnimatedSection key={item.title} delay={i * 120}>
              <div className="group relative p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-white/10 transition-all duration-500 h-full">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/[0.02] group-hover:to-white/[0.01] transition-all duration-500" />
                <div className="relative z-10">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${item.color}15` }}>
                      <item.icon className="w-7 h-7" style={{ color: item.color }} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-white/55 leading-relaxed mb-5">{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.features.map((f) => (
                      <span key={f} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border" style={{ backgroundColor: `${item.color}08`, borderColor: `${item.color}20`, color: item.color }}>
                        <CheckCircle2 className="w-3 h-3" />
                        {f}
                      </span>
                    ))}
                  </div>
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
   3. HOW IT WORKS SECTION
   ═══════════════════════════════════════════════════════════════════════════════ */
const steps = [
  {
    num: '01',
    title: 'Registra tu Agencia',
    description: 'Completa el formulario de registro con los datos de tu empresa. Nuestro equipo revisará tu solicitud y activará tu cuenta de agencia en menos de 24 horas, dándote acceso a nuestra plataforma de reservas con tarifas netas exclusivas.',
    icon: Building2,
    color: '#0077BD',
  },
  {
    num: '02',
    title: 'Configura tus Tarifas',
    description: 'Establece tus propios márgenes y comisiones sobre nuestras tarifas netas. Puedes definir tarifas diferenciadas por tipo de servicio, ruta o temporada. Tu marca, tus precios, tu rentabilidad. Nosotros solo nos encargamos de la operación.',
    icon: CircleDollarSign,
    color: '#00E676',
  },
  {
    num: '03',
    title: 'Reserva para tus Clientes',
    description: 'Utiliza nuestra plataforma online, conecta tu sistema vía API o contacta a nuestro call center 24/7. Recibirás confirmación instantánea de cada reserva, con todos los detalles del servicio, conductor y vehículo asignado.',
    icon: Smartphone,
    color: '#FF9800',
  },
  {
    num: '04',
    title: 'Tu Cliente Viaja Seguro',
    description: 'Nuestro conductor profesional recoge a tu cliente con cartel de bienvenida (Meet & Greet), asiste con el equipaje y lo traslada de forma segura. Rastreo GPS en tiempo real para que tú y tu cliente tengan total visibilidad del viaje.',
    icon: Shield,
    color: '#71B124',
  },
]

function HowItWorksSection() {
  return (
    <section id="como-funciona" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#080c15] to-[#0a0e17]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-[#00E676]/5 blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 mb-4">
              <Zap className="w-4 h-4 text-[#00E676]" />
              <span className="text-sm text-[#00E676]">Cómo Funciona</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Tan simple como{' '}
              <span className="bg-gradient-to-r from-[#00E676] via-[#0077BD] to-[#FF9800] bg-clip-text text-transparent">
                1, 2, 3, 4
              </span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              En cuatro pasos tu agencia estará revendiendo servicios de transporte terrestre con total autonomía.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <AnimatedSection key={step.num} delay={i * 150}>
              <div className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-white/10 transition-all duration-500 h-full">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/[0.02] transition-all duration-500" />
                <div className="relative z-10">
                  <div className="text-4xl font-black mb-4" style={{ color: `${step.color}30` }}>
                    {step.num}
                  </div>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${step.color}15` }}>
                    <step.icon className="w-6 h-6" style={{ color: step.color }} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">{step.title}</h3>
                  <p className="text-sm text-white/55 leading-relaxed">{step.description}</p>
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
   4. FLEET AVAILABLE SECTION
   ═══════════════════════════════════════════════════════════════════════════════ */
const fleetCategories = [
  { icon: Car, label: 'Clásico & Confort', desc: 'Autos y sedanes con o sin A/C', color: '#FACC15' },
  { icon: Crown, label: 'VIP & Ejecutivo', desc: 'Sedanes, SUV y Vans premium', color: '#FBBF24' },
  { icon: Bus, label: 'Buses & Minibuses', desc: 'De 12 a 40 pasajeros con A/C', color: '#38BDF8' },
  { icon: Bike, label: 'Motos & Envíos', desc: 'Moto taxi, envíos y toritos', color: '#9CA3AF' },
  { icon: Package, label: 'Camionetas & Furgones', desc: 'Pickups, furgones de carga', color: '#FB923C' },
  { icon: Truck, label: 'Grúas & Auxilio', desc: 'Arrastre, remolque, mecánico', color: '#F87171' },
  { icon: Wrench, label: 'Construcción & Agro', desc: 'Excavadoras, tractores y más', color: '#22C55E' },
]

function FleetSection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(0,119,189,0.4) 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF9800]/10 border border-[#FF9800]/20 mb-4">
              <Car className="w-4 h-4 text-[#FF9800]" />
              <span className="text-sm text-[#FF9800]">Flota Disponible</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Todo tipo de vehículo para{' '}
              <span className="bg-gradient-to-r from-[#FF9800] to-[#00E676] bg-clip-text text-transparent">
                cada necesidad
              </span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              Proveemos el transporte terrestre completo para que tus clientes no necesiten buscar otro proveedor.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {fleetCategories.map((cat, i) => (
            <AnimatedSection key={cat.label} delay={i * 80}>
              <div className="group p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-white/10 transition-all duration-500">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${cat.color}12` }}>
                  <cat.icon className="w-6 h-6" style={{ color: cat.color }} />
                </div>
                <h3 className="text-base font-semibold text-white mb-1">{cat.label}</h3>
                <p className="text-sm text-white/45">{cat.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={300}>
          <div className="mt-8 text-center">
            <a href="/#flota" className="inline-flex items-center gap-2 text-sm text-[#00E676] hover:text-[#00ff88] transition-colors font-medium">
              Ver toda nuestra flota en detalle
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   5. BENEFITS / COMMISSION SECTION
   ═══════════════════════════════════════════════════════════════════════════════ */
const benefits = [
  {
    icon: CircleDollarSign,
    title: 'Tus Propias Tarifas y Comisiones',
    description: 'Establece los márgenes que quieras sobre nuestras tarifas netas. Puedes revender nuestros servicios al precio que consideres justo para tu mercado. Hasta un 20% de descuento sobre precios minoristas según tu volumen de reservas anuales.',
    color: '#00E676',
  },
  {
    icon: Clock,
    title: 'Confirmación Instantánea',
    description: 'Cada reserva que realices se confirma de inmediato. Sin esperas, sin incertidumbre para tus clientes. Recibirás los datos del conductor, vehículo y hora de pickup al momento de confirmar, para que tu cliente viaje con total tranquilidad.',
    color: '#0077BD',
  },
  {
    icon: Shield,
    title: 'Cancelación Gratuita hasta 24h',
    description: 'Entendemos que los planes de viaje cambian. Por eso ofrecemos cancelaciones y modificaciones gratuitas hasta 24 horas antes del servicio. Sin penalidades, sin complicaciones. Tu agencia no pierde dinero por imprevistos.',
    color: '#FF9800',
  },
  {
    icon: Plane,
    title: 'Seguimiento de Vuelos en Tiempo Real',
    description: 'Si tu cliente llega en avión, nosotros monitoreamos su vuelo. Si hay demoras, nuestro conductor ajusta automáticamente la hora de pickup. 1 hora de espera en aeropuerto incluida sin costo adicional. Tu cliente nunca se queda sin transporte.',
    color: '#71B124',
  },
  {
    icon: Headphones,
    title: 'Call Center y Soporte 24/7',
    description: 'Nuestro equipo de atención al cliente multilingüe está disponible las 24 horas, los 365 días del año. Antes, durante y después del viaje. Soporte de primera línea tanto para agentes de viajes como para el pasajero final.',
    color: '#9C27B0',
  },
  {
    icon: MapPin,
    title: 'Cobertura Nacional Completa',
    description: 'Ofrecemos traslados en aeropuertos, terminales de buses y estaciones de tren en todo el territorio boliviano. Servicio punto a punto, circuitos turísticos, traslados corporativos y mucho más. Un solo partner para todo el país.',
    color: '#E91E63',
  },
  {
    icon: TreePine,
    title: 'Empresa Sostenible y Certificada',
    description: 'Ecotaxi es la primera empresa de transporte en Bolivia con plan de medición, reducción y neutralización de emisiones GEI. Ofrecer Ecotaxi a tus clientes es también ofrecer un transporte responsable con el medio ambiente.',
    color: '#4CAF50',
  },
  {
    icon: FileText,
    title: 'Facturación y Reportes Transparentes',
    description: 'Recibe facturas consolidadas mensualmente con el detalle de cada servicio. Reportes personalizados por agencia, ruta, tipo de servicio y periodo. Conciliación automática para que tu contabilidad sea simple y transparente.',
    color: '#00BCD4',
  },
]

function BenefitsSection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#080c15] to-[#0a0e17]" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[400px] rounded-full bg-[#00E676]/5 blur-[150px]" />
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#0077BD]/5 blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#71B124]/10 border border-[#71B124]/20 mb-4">
              <CheckCircle2 className="w-4 h-4 text-[#71B124]" />
              <span className="text-sm text-[#71B124]">Ventajas Exclusivas</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Beneficios que hacen la{' '}
              <span className="bg-gradient-to-r from-[#71B124] to-[#00E676] bg-clip-text text-transparent">
                diferencia
              </span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              Cada beneficio está pensado para que tu agencia gane competitividad y tus clientes reciban un servicio excepcional.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((item, i) => (
            <AnimatedSection key={item.title} delay={i * 80}>
              <div className="group relative p-6 md:p-7 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-white/10 transition-all duration-500 h-full">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/[0.02] transition-all duration-500" />
                <div className="relative z-10 flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${item.color}12` }}>
                    <item.icon className="w-6 h-6" style={{ color: item.color }} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-white/55 leading-relaxed">{item.description}</p>
                  </div>
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
   6. SERVICES WE COVER SECTION
   ═══════════════════════════════════════════════════════════════════════════════ */
const servicesOffered = [
  { icon: PlaneTakeoff, title: 'Traslados Aeropuerto', desc: 'Pickup y drop-off en aeropuertos de todo el país con Meet & Greet, seguimiento de vuelos y 1 hora de espera gratuita.' },
  { icon: MapPin, title: 'Puerta a Puerta', desc: 'Transporte directo entre cualquier punto de la ciudad. Recogida en hotel, residencia, oficina o terminal.' },
  { icon: Compass, title: 'Circuitos Turísticos', desc: 'Rutas turísticas por Santa Cruz y Bolivia. City tours, visitas a atractivos naturales y culturales con guía y transporte incluido.' },
  { icon: Building2, title: 'Eventos y Convenciones', desc: 'Transporte para congresos, ferias, convenciones y eventos corporativos. Flota dedicada con coordinación logística.' },
  { icon: Crown, title: 'Servicio VIP y Ejecutivo', desc: 'Traslados premium con vehículos de alta gama y conductores profesionales. Discreción, puntualidad y confort máximo.' },
  { icon: Bus, title: 'Alquiler de Bus con Conductor', desc: 'Minibuses y buses con conductor para grupos grandes, excursiones, traslados masivos y charters privados.' },
]

function ServicesSection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0077BD]/10 border border-[#0077BD]/20 mb-4">
              <Package className="w-4 h-4 text-[#0077BD]" />
              <span className="text-sm text-[#0077BD]">Servicios que Puedes Revender</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Un portfolio completo de{' '}
              <span className="bg-gradient-to-r from-[#0077BD] to-[#00E676] bg-clip-text text-transparent">
                servicios terrestres
              </span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              Desde un traslado sencillo hasta la logística completa de un evento. Todo disponible para que lo revendas como propio.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesOffered.map((svc, i) => (
            <AnimatedSection key={svc.title} delay={i * 100}>
              <div className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-[#0077BD]/20 transition-all duration-500 h-full">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 to-white/0 group-hover:from-[#0077BD]/[0.02] transition-all duration-500" />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0077BD]/15 to-[#00E676]/15 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <svc.icon className="w-7 h-7 text-[#00E676]" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{svc.title}</h3>
                  <p className="text-sm text-white/55 leading-relaxed">{svc.desc}</p>
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
   7. TRUSTED BY / SOCIAL PROOF SECTION
   ═══════════════════════════════════════════════════════════════════════════════ */
const trustedPartners = [
  'Booking.com', 'Expedia', 'Despegar', 'Viajes Falabella', 'PriceTravel',
  'Ciudad Viajera', 'Santa Cruz Travel', 'Ruta Verde Tours', 'Bolivia Hop',
  'Condor Travel', 'Latin Destinations', 'Andean Trails', 'Cruceros Australis',
  'Hoteles Real', 'Los Tajibos Hotel', 'Casa Grande Hotel', 'Radisson Santa Cruz',
]

const testimonials = [
  {
    name: 'Alejandra Vargas',
    role: 'Directora de Operaciones',
    company: 'Agencia de Viajes líder en Bolivia',
    text: 'Desde que trabajamos con Ecotaxi, nuestros clientes reciben un servicio de transporte impecable. La confirmación instantánea y el seguimiento de vuelos nos dan la tranquilidad que necesitamos para garantizar la experiencia de viaje que prometemos. Las tarifas netas nos permiten márgenes competitivos.',
    stars: 5,
  },
  {
    name: 'Ricardo Pérez',
    role: 'Gerente de Alianzas',
    company: 'OTA Internacional',
    text: 'La API de Ecotaxi fue fácil de integrar y nos permitió ofrecer traslados en Bolivia sin invertir en flota propia. Sus tarifas netas son competitivas y la calidad del servicio es consistente. Nuestros clientes valoran mucho el Meet & Greet en aeropuerto.',
    stars: 5,
  },
  {
    name: 'Carolina Suárez',
    role: 'Coordinadora de Recepción',
    company: 'Cadena hotelera premium',
    text: 'Ofrecer el servicio de traslado Ecotaxi a nuestros huéspedes ha sido un acierto total. Ellos aprecian el cartel de bienvenida con su nombre, la asistencia con equipaje y la puntualidad. Nosotros generamos ingresos adicionales con cada reserva. Un win-win real.',
    stars: 5,
  },
]

function TrustSection() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    let animId: number
    let pos = 0
    const speed = 0.4
    const step = () => {
      pos += speed
      if (pos >= el.scrollWidth / 2) pos = 0
      el.style.transform = `translateX(-${pos}px)`
      animId = requestAnimationFrame(step)
    }
    animId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-[#00E676]/5 blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 mb-4">
              <Award className="w-4 h-4 text-[#00E676]" />
              <span className="text-sm text-[#00E676]">Experiencia Comprobada</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Ya confían en Ecotaxi{' '}
              <span className="bg-gradient-to-r from-[#00E676] to-[#71B124] bg-clip-text text-transparent">
                agencias y OTAs
              </span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              Más de 50 agencias de viajes, OTAs, tour operadores y hoteles ya delegan su transporte terrestre a Ecotaxi. Únete a ellos.
            </p>
          </div>
        </AnimatedSection>

        {/* Scrolling partner logos marquee */}
        <AnimatedSection>
          <div className="mb-16 overflow-hidden">
            <div className="mb-4 text-center text-xs text-white/30 uppercase tracking-widest">
              Agencias, OTAs y Hoteles que confían en nosotros
            </div>
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0a0e17] to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0a0e17] to-transparent z-10" />
              <div ref={scrollRef} className="flex gap-4 whitespace-nowrap">
                {[...trustedPartners, ...trustedPartners].map((name, i) => (
                  <div
                    key={`${name}-${i}`}
                    className="flex items-center justify-center px-5 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] shrink-0"
                  >
                    <Globe className="w-4 h-4 text-white/20 mr-2" />
                    <span className="text-sm text-white/40 font-medium">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <AnimatedSection key={t.name} delay={i * 150}>
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm h-full flex flex-col">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-[#FF9800] text-[#FF9800]" />
                  ))}
                </div>
                <p className="text-sm text-white/60 leading-relaxed mb-6 flex-1">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="pt-4 border-t border-white/[0.06]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0077BD]/20 to-[#00E676]/20 flex items-center justify-center">
                      <span className="text-sm font-bold text-[#00E676]">{t.name.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{t.name}</div>
                      <div className="text-xs text-white/40">{t.role} · {t.company}</div>
                    </div>
                  </div>
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
   8. COMMISSION MODEL SECTION
   ═══════════════════════════════════════════════════════════════════════════════ */
const commissionTiers = [
  {
    name: 'Partner Básico',
    range: 'Hasta 50 reservas/año',
    discount: '10%',
    description: 'Descuento del 10% sobre tarifas retail. Ideal para agencias que están comenzando a ofrecer traslados terrestres y quieren probar el servicio con sus clientes antes de escalar.',
    color: '#0077BD',
    icon: Building2,
  },
  {
    name: 'Partner Premium',
    range: '51-200 reservas/año',
    discount: '15%',
    description: 'Descuento del 15% sobre tarifas retail, acceso prioritario al call center y reportes mensuales personalizados. Para agencias consolidadas con flujo constante de pasajeros.',
    color: '#00E676',
    icon: Award,
    recommended: true,
  },
  {
    name: 'Partner Elite',
    range: 'Más de 200 reservas/año',
    discount: '20%',
    description: 'Descuento del 20% sobre tarifas retail, acceso a API directa, cuenta manager dedicada, facturación personalizada y las mejores tarifas netas. Para OTAs y grandes operadores.',
    color: '#FF9800',
    icon: Crown,
  },
]

function CommissionSection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#080c15] to-[#0a0e17]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-[#0077BD]/5 blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 mb-4">
              <CircleDollarSign className="w-4 h-4 text-[#00E676]" />
              <span className="text-sm text-[#00E676]">Modelo de Comisiones</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Tu rentabilidad{' '}
              <span className="bg-gradient-to-r from-[#00E676] via-[#0077BD] to-[#FF9800] bg-clip-text text-transparent">
                crece con nosotros
              </span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              Mientras más reservas, mayor descuento sobre nuestras tarifas retail. Tú defines el precio final a tu cliente.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {commissionTiers.map((tier, i) => (
            <AnimatedSection key={tier.name} delay={i * 150}>
              <div
                className={`group relative p-6 md:p-8 rounded-2xl bg-white/[0.03] backdrop-blur-sm transition-all duration-500 h-full flex flex-col ${
                  tier.recommended
                    ? 'border-2 scale-[1.02] lg:scale-105 shadow-2xl'
                    : 'border border-white/[0.06] hover:border-white/10'
                }`}
                style={{
                  borderColor: tier.recommended ? tier.color : undefined,
                  boxShadow: tier.recommended ? `0 0 40px ${tier.color}15, 0 0 80px ${tier.color}08` : undefined,
                }}
              >
                {tier.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1.5 rounded-full text-xs font-bold text-black uppercase tracking-wider" style={{ backgroundColor: tier.color }}>
                      Más Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6 pt-2">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: `${tier.color}15` }}>
                    <tier.icon className="w-8 h-8" style={{ color: tier.color }} />
                  </div>
                  <h3 className="text-xl font-bold tracking-wide" style={{ color: tier.color }}>{tier.name}</h3>
                  <p className="text-xs text-white/40 mt-1">{tier.range}</p>
                </div>

                <div className="text-center mb-6 p-4 rounded-xl" style={{ backgroundColor: `${tier.color}08` }}>
                  <span className="text-4xl font-black" style={{ color: tier.color }}>{tier.discount}</span>
                  <p className="text-xs text-white/50 mt-1">de descuento sobre tarifas retail</p>
                </div>

                <p className="text-center text-white/55 text-sm leading-relaxed mb-6 flex-1">{tier.description}</p>

                <a
                  href="#registro"
                  className="mt-auto w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    backgroundColor: tier.recommended ? tier.color : `${tier.color}15`,
                    color: tier.recommended ? '#000' : tier.color,
                    boxShadow: tier.recommended ? `0 0 20px ${tier.color}25` : 'none',
                  }}
                >
                  Registrar mi Agencia
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   9. FREE EXTRAS SECTION
   ═══════════════════════════════════════════════════════════════════════════════ */
const freeExtras = [
  { icon: Clock, label: '1 hora de espera en aeropuerto gratis' },
  { icon: Plane, label: 'Seguimiento de vuelos en tiempo real' },
  { icon: MapPin, label: 'Meet & Greet con cartel de bienvenida' },
  { icon: Users, label: 'Asiento para niños sin cargo' },
  { icon: Package, label: 'Asistencia con equipaje' },
  { icon: Shield, label: 'Cancelación gratuita hasta 24h antes' },
  { icon: Smartphone, label: 'Confirmación instantánea de reservas' },
  { icon: BarChart3, label: 'Reportes mensuales de consumo' },
]

function FreeExtrasSection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#71B124]/6 blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#71B124]/10 border border-[#71B124]/20 mb-4">
              <CheckCircle2 className="w-4 h-4 text-[#71B124]" />
              <span className="text-sm text-[#71B124]">Incluido sin Costo Extra</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Todo incluido en cada{' '}
              <span className="bg-gradient-to-r from-[#71B124] to-[#00E676] bg-clip-text text-transparent">
                reserva
              </span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              Servicios que otras empresas cobran aparte, en Ecotaxi son parte del servicio estándar. Para que tus clientes siempre reciban más.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {freeExtras.map((item, i) => (
            <AnimatedSection key={item.label} delay={i * 80}>
              <div className="group p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-[#71B124]/20 transition-all duration-500">
                <div className="w-10 h-10 rounded-xl bg-[#71B124]/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-5 h-5 text-[#71B124]" />
                </div>
                <p className="text-sm text-white/70 font-medium">{item.label}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   10. REGISTRATION / CONTACT SECTION
   ═══════════════════════════════════════════════════════════════════════════════ */
function RegistrationSection() {
  const [formData, setFormData] = useState({
    empresa: '',
    tipo: '',
    nombre: '',
    cargo: '',
    email: '',
    telefono: '',
    pais: '',
    volumen: '',
    mensaje: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'agencias',
          fields: formData,
          meta: { page: '/agencias', submittedAt: new Date().toISOString() },
        }),
      })
      if (res.ok) {
        setSubmitted(true)
        setTimeout(() => setSubmitted(false), 5000)
      } else {
        alert('No se pudo enviar por correo. Te redirigimos a WhatsApp.')
        window.open('https://wa.me/59173662803?text=' + encodeURIComponent('Hola, quiero registrar mi agencia.'), '_blank')
      }
    } catch (err) {
      console.error('[agencias] submit error:', err)
      alert('Error de conexión. Te redirigimos a WhatsApp.')
      window.open('https://wa.me/59173662803', '_blank')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="registro" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[#0077BD]/8 blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0077BD]/10 border border-[#0077BD]/20 mb-4">
              <Handshake className="w-4 h-4 text-[#0077BD]" />
              <span className="text-sm text-[#0077BD]">Registra tu Agencia</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Comienza a{' '}
              <span className="bg-gradient-to-r from-[#00E676] to-[#0077BD] bg-clip-text text-transparent">
                generar ingresos
              </span>{' '}
              hoy
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              Completa el formulario y nuestro equipo de alianzas te contactará en menos de 24 horas para activar tu cuenta de agencia.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Info */}
          <AnimatedSection className="lg:col-span-2">
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-white mb-4">¿Prefieres contactarnos directamente?</h3>
                <div className="space-y-4">
                  <a href="https://wa.me/59173662803" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/70 hover:text-[#00E676] transition-colors">
                    <Phone className="w-5 h-5 text-[#00E676]" />
                    <span>+591 73662803 (WhatsApp)</span>
                  </a>
                  <a href="mailto:agencias@ecotaxi.com.bo" className="flex items-center gap-3 text-white/70 hover:text-[#00E676] transition-colors">
                    <Mail className="w-5 h-5 text-[#0077BD]" />
                    <span>agencias@ecotaxi.com.bo</span>
                  </a>
                  <div className="flex items-center gap-3 text-white/70">
                    <MapPin className="w-5 h-5 text-[#FF9800]" />
                    <span>Santa Cruz de la Sierra, Bolivia</span>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-white mb-3">¿Qué incluye tu cuenta?</h3>
                <ul className="space-y-3">
                  {[
                    'Acceso a plataforma de reservas online',
                    'Tarifas netas exclusivas para agencias',
                    'Soporte 24/7 multilingüe',
                    'Reportes y facturación consolidada',
                    'Confirmación instantánea de servicios',
                    'API disponible para integración',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#00E676] mt-0.5 shrink-0" />
                      <span className="text-sm text-white/60">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AnimatedSection>

          {/* Registration Form */}
          <AnimatedSection className="lg:col-span-3" delay={200}>
            <div className="p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-[#00E676]/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-[#00E676]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">¡Solicitud Enviada!</h3>
                  <p className="text-white/50">Nuestro equipo de alianzas te contactará en menos de 24 horas.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Nombre de Empresa *</label>
                      <input
                        type="text" name="empresa" required value={formData.empresa} onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:border-[#00E676]/40 focus:outline-none focus:ring-1 focus:ring-[#00E676]/20 transition-all placeholder:text-white/20"
                        placeholder="Tu agencia u OTA"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Tipo de Empresa *</label>
                      <select name="tipo" required value={formData.tipo} onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:border-[#00E676]/40 focus:outline-none focus:ring-1 focus:ring-[#00E676]/20 transition-all appearance-none"
                      >
                        <option value="" className="bg-[#0a0e17]">Seleccionar...</option>
                        <option value="ota" className="bg-[#0a0e17]">OTA / Plataforma Online</option>
                        <option value="agencia" className="bg-[#0a0e17]">Agencia de Viajes</option>
                        <option value="tour" className="bg-[#0a0e17]">Tour Operador</option>
                        <option value="hotel" className="bg-[#0a0e17]">Hotel / Resort</option>
                        <option value="otro" className="bg-[#0a0e17]">Otro</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Nombre del Contacto *</label>
                      <input
                        type="text" name="nombre" required value={formData.nombre} onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:border-[#00E676]/40 focus:outline-none focus:ring-1 focus:ring-[#00E676]/20 transition-all placeholder:text-white/20"
                        placeholder="Nombre completo"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Cargo *</label>
                      <input
                        type="text" name="cargo" required value={formData.cargo} onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:border-[#00E676]/40 focus:outline-none focus:ring-1 focus:ring-[#00E676]/20 transition-all placeholder:text-white/20"
                        placeholder="Ej: Gerente de Alianzas"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Email Corporativo *</label>
                      <input
                        type="email" name="email" required value={formData.email} onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:border-[#00E676]/40 focus:outline-none focus:ring-1 focus:ring-[#00E676]/20 transition-all placeholder:text-white/20"
                        placeholder="correo@empresa.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Teléfono / WhatsApp *</label>
                      <input
                        type="tel" name="telefono" required value={formData.telefono} onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:border-[#00E676]/40 focus:outline-none focus:ring-1 focus:ring-[#00E676]/20 transition-all placeholder:text-white/20"
                        placeholder="+591 70000000"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">País</label>
                      <input
                        type="text" name="pais" value={formData.pais} onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:border-[#00E676]/40 focus:outline-none focus:ring-1 focus:ring-[#00E676]/20 transition-all placeholder:text-white/20"
                        placeholder="Ej: Bolivia"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Volumen Estimado de Reservas/Año</label>
                      <select name="volumen" value={formData.volumen} onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:border-[#00E676]/40 focus:outline-none focus:ring-1 focus:ring-[#00E676]/20 transition-all appearance-none"
                      >
                        <option value="" className="bg-[#0a0e17]">Seleccionar...</option>
                        <option value="1-50" className="bg-[#0a0e17]">1 - 50 reservas</option>
                        <option value="51-200" className="bg-[#0a0e17]">51 - 200 reservas</option>
                        <option value="200+" className="bg-[#0a0e17]">Más de 200 reservas</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Mensaje o Consulta</label>
                    <textarea
                      name="mensaje" rows={3} value={formData.mensaje} onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:border-[#00E676]/40 focus:outline-none focus:ring-1 focus:ring-[#00E676]/20 transition-all resize-none placeholder:text-white/20"
                      placeholder="Cuéntanos sobre tu agencia y cómo quieres trabajar con Ecotaxi..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-base font-semibold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all duration-300 shadow-[0_0_20px_rgba(0,230,118,0.2)] hover:shadow-[0_0_30px_rgba(0,230,118,0.4)] hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar Solicitud de Registro'}
                    {!isSubmitting && <ArrowRight className="w-5 h-5" />}
                  </button>
                </form>
              )}
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
export default function AgenciasPage() {
  return (
    <main className="min-h-screen bg-[#0a0e17]">
      <Navbar />
      <HeroSection />
      <TargetAudienceSection />
      <HowItWorksSection />
      <FleetSection />
      <BenefitsSection />
      <ServicesSection />
      <TrustSection />
      <CommissionSection />
      <FreeExtrasSection />
      <RegistrationSection />
      <Footer />
    </main>
  )
}
