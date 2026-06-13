'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Truck, Shield, Clock, Users, Phone, ArrowRight, CheckCircle2,
  MapPin, ChevronRight, Car, Smartphone, Eye, BadgeCheck,
  Star, UserCheck, Wrench, Route, ShieldCheck, Building2,
  HardHat, Zap, TreePine, PhoneCall, MessageCircle,
  Package, Mountain, Compass, CalendarDays, Calculator,
  FileText, Timer, Handshake, CircleDot, Settings, Hammer
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
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#1a1408] to-[#0a0e17]" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(234,179,8,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(234,179,8,0.4) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[#EAB308]/12 blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#F97316]/10 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[#EAB308]/6 blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Decorative */}
      <div className="absolute top-32 right-[8%] md:right-[18%] opacity-[0.07]">
        <HardHat className="w-28 h-28 md:w-40 md:h-40 text-[#EAB308]" />
      </div>
      <div className="absolute bottom-28 left-[5%] md:left-[12%] opacity-[0.05]">
        <Wrench className="w-20 h-20 md:w-28 md:h-28 text-[#F97316]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 pb-16">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/ecotaxi-logo.webp"
            alt="Ecotaxi Logo"
            className="h-16 md:h-20 w-16 md:w-20 object-contain"
            style={{ filter: 'drop-shadow(0 0 12px rgba(0,230,118,0.5))' }}
          />
        </div>

        <AnimatedSection>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EAB308]/10 border border-[#EAB308]/25 mb-8 backdrop-blur-sm">
            <HardHat className="w-4 h-4 text-[#EAB308]" />
            <span className="text-sm text-[#EAB308] font-medium">Alquiler de Maquinaria Amarilla</span>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Maquinaria amarilla{' '}
            <span className="bg-gradient-to-r from-[#EAB308] via-[#F97316] to-[#EAB308] bg-clip-text text-transparent">
              a un clic
            </span>
            <br />
            de distancia
          </h1>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-10 leading-relaxed">
            La primera plataforma en Bolivia para alquilar maquinaria amarilla por hora o por contrato.
            Desde una gallinita para tu obra hasta una excavadora para tu proyecto, reserva desde la app
            y la maquinaria llega a tu ubicación con operador incluido.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={300}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <a
              href="#maquinaria"
              className="px-8 py-4 rounded-full text-lg font-semibold text-black bg-[#EAB308] hover:bg-[#FBBF24] transition-all duration-300 shadow-[0_0_30px_rgba(234,179,8,0.3)] hover:shadow-[0_0_50px_rgba(234,179,8,0.5)] hover:scale-105"
            >
              Ver Maquinaria
            </a>
            <a
              href="#contacto"
              className="px-8 py-4 rounded-full text-lg font-semibold text-[#EAB308] border border-[#EAB308]/30 hover:border-[#EAB308]/60 hover:bg-[#EAB308]/5 transition-all duration-300"
            >
              Cotizar Ahora
            </a>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={400}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { value: '7', label: 'Tipos de Máquina', icon: Wrench },
              { value: 'x Hora', label: 'O por Contrato', icon: Timer },
              { value: 'PRO', label: 'Operadores Incluidos', icon: UserCheck },
              { value: 'APP', label: 'Reserva Online', icon: Smartphone },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-4 rounded-2xl bg-white/[0.03] border border-[#EAB308]/10 backdrop-blur-sm hover:border-[#EAB308]/20 transition-all duration-300"
              >
                <stat.icon className="w-5 h-5 text-[#EAB308] mx-auto mb-2" />
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
   2. MACHINERY CATALOG — All 7 types from the 10-CONSTRUCCION folder
   ═══════════════════════════════════════════════════════════════════════════════ */
const machineryTypes = [
  {
    name: 'Volqueta',
    desc: 'Transporte de material de construcción, escombros, tierra y agregados. Ideal para obras de construcción, demolición, movimientos de tierra y limpieza de terrenos. Capacidad de carga de 6 a 12 metros cúbicos según el modelo. La volqueta es la máquina más solicitada en cualquier obra, grande o pequeña.',
    features: ['Capacidad 6-12 m³', 'Transporte de escombros y material', 'Carga y descarga hidráulica', 'Ideal para obras y demoliciones'],
    tag: 'MÁS SOLICITADA',
    popular: true,
    color: '#EAB308',
    image: '/vehicles/10-CONSTRUCCION/volqueta.png',
    icon: Truck,
  },
  {
    name: 'Bobcat (Mini Cargadora)',
    desc: 'La máquina versátil por excelencia. Perfecta para espacios reducidos donde una máquina grande no puede entrar. Movimiento de tierra, carga de material, limpieza de terrenos, nivelación de superficies y mucho más. Con accesorios como horquillas, martillos y cepillos, un bobcat puede hacer el trabajo de varias máquinas en un espacio mínimo.',
    features: ['Versatilidad en espacios reducidos', 'Múltiples accesorios disponibles', 'Carga, excavación y nivelación', 'Acceso a interiores y terrenos pequeños'],
    tag: 'VERSÁTIL',
    color: '#F97316',
    image: '/vehicles/10-CONSTRUCCION/bobcat.png',
    icon: Settings,
  },
  {
    name: 'Gallinita (Mezcladora)',
    desc: 'Mezcladora de concreto móvil para obras de construcción de cualquier tamaño. Prepara concreto fresco en el lugar de la obra, garantizando la calidad y consistencia del material. Perfecta para construcciones residenciales, losas, columnas, vigas y todo tipo de obras que requieran concreto preparado en sitio. La gallinita es la compañera inseparable del maestro de obras.',
    features: ['Concreto fresco en la obra', 'Diferentes capacidades disponibles', 'Mezcla uniforme garantizada', 'Ideal para losas, columnas y vigas'],
    tag: 'CONSTRUCCIÓN',
    color: '#3B82F6',
    image: '/vehicles/10-CONSTRUCCION/gallinita.png',
    icon: Hammer,
  },
  {
    name: 'Motoniveladora',
    desc: 'La reina del caminos. Nivelación de terrenos, afinado de superficies, limpieza de calles, apertura de vías y mantenimiento de caminos de tierra. Si necesitas limpiar una calle, nivelar un terreno para construcción o abrir un camino nuevo, la motoniveladora es la máquina indicada. Su hoja frontal de gran alcance permite trabajar en amplias superficies con precisión milimétrica.',
    features: ['Nivelación de grandes superficies', 'Limpieza y afinado de calles', 'Apertura de caminos nuevos', 'Mantenimiento de vías de tierra'],
    tag: 'CAMINOS',
    color: '#10B981',
    image: '/vehicles/10-CONSTRUCCION/motoniveladora.png',
    icon: Route,
  },
  {
    name: 'Retroexcavadora',
    desc: 'Dos máquinas en una: pala frontal para cargar y brazo trasero para excavar. La retroexcavadora es la herramienta perfecta para zanjas, cimentaciones, movimiento de tierra, carga de material y excavación en general. Su versatilidad la hace indispensable en obras de construcción, instalación de tuberías, alcantarillado y todo tipo de trabajos que combinen excavación y carga.',
    features: ['Excavación y carga en una máquina', 'Zanjas, cimentaciones y tuberías', 'Pala frontal + brazo retro', 'La más versátil del rubro'],
    tag: 'EXCAVACIÓN',
    color: '#8B5CF6',
    image: '/vehicles/10-CONSTRUCCION/retrocabadora.png',
    icon: Mountain,
  },
  {
    name: 'Excavadora',
    desc: 'Potencia pura para trabajos de excavación pesada. Cimentaciones profundas, movimiento de tierra a gran escala, demolición controlada, carga de material pesado y trabajos que exigen la máxima fuerza. Disponible en diferentes tamaños según la magnitud del proyecto, desde excavadoras compactas para espacios reducidos hasta máquinas de gran porte para obras de gran envergadura.',
    features: ['Excavación pesada de gran escala', 'Cimentaciones profundas', 'Demolición controlada', 'Diferentes tamaños disponibles'],
    tag: 'POTENCIA',
    color: '#EF4444',
    image: '/vehicles/10-CONSTRUCCION/excavadora.png',
    icon: HardHat,
  },
  {
    name: 'Aplanadora (Compactadora)',
    desc: 'Compactación de suelos, asfalto y superficies para lograr la firmeza que tu proyecto necesita. Ya sea para la base de un edificio, un estacionamiento, un camino o una cancha deportiva, la aplanadora garantiza que el terreno quede firme, uniforme y listo para la siguiente etapa de construcción. Disponible en diferentes tamaños y pesos según el tipo de material a compactar.',
    features: ['Compactación de suelos y asfalto', 'Firmeza garantizada del terreno', 'Diferentes pesos disponibles', 'Bases, caminos y estacionamientos'],
    tag: 'COMPACTACIÓN',
    color: '#06B6D4',
    image: '/vehicles/10-CONSTRUCCION/aplanadora.png',
    icon: CircleDot,
  },
]

function MachinerySection() {
  const [activeMachine, setActiveMachine] = useState<string | null>(null)

  return (
    <section id="maquinaria" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-[#EAB308]/5 blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EAB308]/10 border border-[#EAB308]/20 mb-4">
              <Wrench className="w-4 h-4 text-[#EAB308]" />
              <span className="text-sm text-[#EAB308]">Catálogo de Maquinaria</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Maquinaria para cada{' '}
              <span className="bg-gradient-to-r from-[#EAB308] via-[#F97316] to-[#EAB308] bg-clip-text text-transparent">
                tipo de trabajo
              </span>
            </h2>
            <p className="text-white/50 max-w-3xl mx-auto text-lg">
              Desde una gallinita para mezclar concreto hasta una excavadora para movimientos de tierra a gran escala.
              Toda la maquinaria con operador profesional incluido. Seleccione una máquina para ver más detalles.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {machineryTypes.map((machine, i) => {
            const isActive = activeMachine === machine.name
            return (
              <AnimatedSection key={machine.name} delay={i * 80}>
                <div
                  onClick={() => setActiveMachine(isActive ? null : machine.name)}
                  className={`group relative rounded-2xl bg-white/[0.03] border backdrop-blur-sm cursor-pointer transition-all duration-500 overflow-hidden ${
                    isActive ? 'bg-white/[0.06]' : 'hover:border-white/10'
                  }`}
                  style={{
                    borderColor: isActive ? `${machine.color}50` : undefined,
                    boxShadow: machine.popular ? `0 0 20px ${machine.color}08` : undefined,
                  }}
                >
                  {/* Popular badge */}
                  {machine.popular && (
                    <div className="absolute top-3 right-3 z-20">
                      <span className="px-2 py-1 rounded-full text-[9px] font-bold text-black bg-[#EAB308] shadow-[0_0_15px_rgba(234,179,8,0.3)]">
                        {machine.tag}
                      </span>
                    </div>
                  )}
                  {!machine.popular && (
                    <div className="absolute top-3 right-3 z-20">
                      <span className="px-2 py-1 rounded-full text-[9px] font-medium" style={{ backgroundColor: `${machine.color}10`, color: machine.color, border: `1px solid ${machine.color}20` }}>
                        {machine.tag}
                      </span>
                    </div>
                  )}

                  {/* Image */}
                  <div
                    className="relative h-40 md:h-44 flex items-center justify-center overflow-hidden"
                    style={{ background: `linear-gradient(180deg, ${machine.color}08 0%, transparent 100%)` }}
                  >
                    <img
                      src={machine.image}
                      alt={machine.name}
                      className="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                      style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))' }}
                    />
                    <div
                      className="absolute inset-0 opacity-20 blur-2xl"
                      style={{ background: `radial-gradient(circle, ${machine.color}30, transparent 70%)` }}
                    />
                  </div>

                  <div className="relative z-10 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <machine.icon className="w-4 h-4" style={{ color: machine.color }} />
                      <h3 className="text-base font-semibold text-white">{machine.name}</h3>
                    </div>
                    <p className="text-xs text-white/45 leading-relaxed mb-2">{machine.desc.slice(0, 120)}...</p>

                    {/* Expanded */}
                    <div className={`transition-all duration-500 overflow-hidden ${
                      isActive ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="pt-3 border-t border-white/[0.06] space-y-2">
                        <p className="text-xs text-white/40 leading-relaxed">{machine.desc}</p>
                        {machine.features.map((f) => (
                          <div key={f} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: machine.color }} />
                            <span className="text-xs text-white/50">{f}</span>
                          </div>
                        ))}
                        <a
                          href="#contacto"
                          className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 rounded-full text-xs font-semibold text-black transition-all duration-300"
                          style={{ backgroundColor: machine.color }}
                        >
                          Cotizar
                          <ArrowRight className="w-3 h-3" />
                        </a>
                      </div>
                    </div>

                    {!isActive && (
                      <p className="text-[10px] text-white/20 mt-1 flex items-center gap-1">
                        <ChevronRight className="w-3 h-3" /> Click para detalles
                      </p>
                    )}
                  </div>
                </div>
              </AnimatedSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   3. RENTAL MODALITIES — By Hour, By Contract
   ═══════════════════════════════════════════════════════════════════════════════ */
const rentalOptions = [
  {
    icon: Timer,
    title: 'Por Hora',
    subtitle: 'Flexibilidad total',
    desc: 'Alquile maquinaria por hora para trabajos específicos y puntuales. Ideal para el ciudadano que necesita una gallinita para una losa, un bobcat para limpiar un terreno, o una volqueta para retirar escombros. Pague solo por el tiempo que use la máquina, con un mínimo de horas según el tipo de maquinaria. Sin compromisos a largo plazo, sin contratos complicados.',
    features: ['Pago solo por horas utilizadas', 'Mínimo de horas según máquina', 'Sin contratos a largo plazo', 'Ideal para trabajos puntuales'],
    color: '#EAB308',
    example: 'Ejemplo: Bobcat 4 horas mínimo → Bs/hora',
  },
  {
    icon: CalendarDays,
    title: 'Por Contrato',
    subtitle: 'Proyectos de mayor duración',
    desc: 'Contrate maquinaria por día, semana, quincena o mes para proyectos de construcción, obra pública, urbanización o cualquier trabajo que requiera la máquina por un período prolongado. Los precios por contrato son significativamente menores que por hora, y puede combinar diferentes máquinas en un solo paquete. Ideal para constructoras, municipios y empresas de obra civil.',
    features: ['Descuentos por duración extendida', 'Paquetes multi-máquina disponibles', 'Facturación mensual o quincenal', 'Prioridad en disponibilidad'],
    color: '#F97316',
    example: 'Ejemplo: Excavadora por mes → tarifa especial',
  },
  {
    icon: Handshake,
    title: 'Por Proyecto',
    subtitle: 'Cotización personalizada',
    desc: 'Cuéntenos su proyecto y nosotros le proponemos la maquinaria, el tiempo y el costo total. No se preocupe por calcular horas ni tipos de máquina: nuestro equipo técnico analiza su proyecto y le presenta una propuesta integral con todo incluido. Movimiento de tierra completo, urbanización, desmonte, construcción de vías o cualquier obra que necesite maquinaria amarilla.',
    features: ['Cotización integral del proyecto', 'Asesoría técnica incluida', 'Todo incluido: máquina + operador + combustible', 'Una sola factura, cero complicaciones'],
    color: '#10B981',
    example: 'Ejemplo: Desmonte 5000m² → cotización total',
  },
]

function RentalSection() {
  return (
    <section id="modalidades" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] rounded-full bg-[#F97316]/5 blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F97316]/10 border border-[#F97316]/20 mb-4">
              <Calculator className="w-4 h-4 text-[#F97316]" />
              <span className="text-sm text-[#F97316]">Modalidades de Alquiler</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Alquile como{' '}
              <span className="bg-gradient-to-r from-[#EAB308] via-[#F97316] to-[#10B981] bg-clip-text text-transparent">
                usted lo necesite
              </span>
            </h2>
            <p className="text-white/50 max-w-3xl mx-auto text-lg">
              Por hora para trabajos rápidos, por contrato para proyectos largos, o por proyecto con cotización integral.
              Usted elige la modalidad que mejor se adapte a su presupuesto y necesidad.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {rentalOptions.map((option, i) => (
            <AnimatedSection key={option.title} delay={i * 100}>
              <div className="group relative p-6 md:p-7 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-white/10 transition-all duration-500 h-full">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/[0.02] transition-all duration-500" />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: `${option.color}12` }}>
                    <option.icon className="w-7 h-7" style={{ color: option.color }} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{option.title}</h3>
                  <p className="text-xs font-medium mb-4" style={{ color: option.color }}>{option.subtitle}</p>
                  <p className="text-sm text-white/45 leading-relaxed mb-5">{option.desc}</p>
                  <div className="space-y-2 mb-4">
                    {option.features.map((f) => (
                      <div key={f} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: option.color }} />
                        <span className="text-sm text-white/55">{f}</span>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <p className="text-xs text-white/30">{option.example}</p>
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
   4. FOR WHOM — Constructor, Citizen, Municipality
   ═══════════════════════════════════════════════════════════════════════════════ */
const clientTypes = [
  {
    icon: HardHat,
    title: 'Constructoras y Empresas',
    desc: 'Empresas de construcción que necesitan maquinaria amarilla para sus obras sin la inversión de comprar equipos. Alquile por proyecto o por contrato y optimice sus costos operativos. Disponibilidad inmediata, operadores certificados, y la variedad de máquinas que su obra necesita sin mantener una flota propia.',
    useCases: ['Obras de construcción civil', 'Urbanizaciones y loteamientos', 'Movimiento de tierra a gran escala', 'Obra pública y privada'],
    color: '#EAB308',
  },
  {
    icon: Building2,
    title: 'Ciudadano y Propietario',
    desc: '¿Necesita una gallinita para mezclar concreto de su losa? ¿Un bobcat para limpiar su terreno? ¿Una volqueta para retirar escombros? Ya no necesita buscar contactos uno por uno ni depender del boca a boca. Reserve desde nuestra plataforma y la maquinaria llega a su puerta con operador incluido. Sin complicaciones, sin trámites engorrosos.',
    useCases: ['Construcción de vivienda', 'Limpieza de terrenos y lotes', 'Nivelación de patios y jardines', 'Retiro de escombros y basura'],
    color: '#3B82F6',
  },
  {
    icon: MapPin,
    title: 'Municipios y Gobiernos',
    desc: 'Alcaldías, gobernaciones y entidades públicas que necesitan maquinaria para mantenimiento de vías, limpieza de calles, apertura de caminos y obras de infraestructura. Nuestro servicio por contrato o por proyecto se adapta a los procesos de contratación pública, con facturación formal, seguros y toda la documentación requerida.',
    useCases: ['Mantenimiento de vías y calles', 'Limpieza de desmontes y drenajes', 'Apertura de caminos vecinales', 'Obras de infraestructura pública'],
    color: '#10B981',
  },
  {
    icon: TreePine,
    title: 'Agro y Campo',
    desc: 'Productores agropecuarios que necesitan maquinaria para preparación de terrenos, apertura de accesos, movimiento de tierra, construcción de reservorios y caminos internos. Nuestra maquinaria llega hasta las zonas rurales con operadores que conocen el trabajo de campo. Si tiene un proyecto en el campo, nosotros llevamos la máquina.',
    useCases: ['Preparación de terrenos agrícolas', 'Caminos internos y accesos', 'Construcción de reservorios', 'Limpieza y desmonte de lotes'],
    color: '#71B124',
  },
]

function ForWhomSection() {
  return (
    <section id="para-quien" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute top-1/3 left-0 w-[600px] h-[600px] rounded-full bg-[#3B82F6]/5 blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 mb-4">
              <Users className="w-4 h-4 text-[#3B82F6]" />
              <span className="text-sm text-[#3B82F6]">Para Quién es</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Desde el ciudadano hasta la{' '}
              <span className="bg-gradient-to-r from-[#3B82F6] via-[#EAB308] to-[#10B981] bg-clip-text text-transparent">
                constructora
              </span>
            </h2>
            <p className="text-white/50 max-w-3xl mx-auto text-lg">
              No importa si necesita una gallinita para su casa o una excavadora para su obra.
              Nuestro servicio se adapta a cada tipo de cliente y cada tipo de proyecto.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {clientTypes.map((client, i) => (
            <AnimatedSection key={client.title} delay={i * 100}>
              <div className="group relative p-6 md:p-7 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-white/10 transition-all duration-500 h-full">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/[0.02] transition-all duration-500" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: `${client.color}12` }}>
                    <client.icon className="w-6 h-6" style={{ color: client.color }} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{client.title}</h3>
                  <p className="text-sm text-white/45 leading-relaxed mb-4">{client.desc}</p>
                  <div className="space-y-1.5">
                    {client.useCases.map((uc) => (
                      <div key={uc} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: client.color }} />
                        <span className="text-xs text-white/50">{uc}</span>
                      </div>
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
   5. WHY PLATFORM — First in Bolivia
   ═══════════════════════════════════════════════════════════════════════════════ */
const whyReasons = [
  {
    icon: Smartphone,
    title: 'Primera Plataforma en Bolivia',
    desc: 'Hasta ahora, alquilar maquinaria amarilla en Bolivia significaba buscar contactos uno por uno, llamar a múltiples proveedores, negociar precios sin referencia y esperar sin saber si la máquina llegaría. Ecotaxi cambia eso: una plataforma digital donde usted ve la maquinaria, el precio, la disponibilidad y reserva en minutos. La misma revolución que Uber trajo al taxi, nosotros la traemos a la maquinaria.',
    color: '#EAB308',
  },
  {
    icon: ShieldCheck,
    title: 'Operadores Profesionales Incluidos',
    desc: 'Toda la maquinaria viene con operador profesional certificado incluido en el precio. No necesita buscar quién maneja la máquina ni preocuparse por la capacitación del operador. Nuestros operadores están habilitados, conocen la máquina y tienen la experiencia para hacer el trabajo de forma segura y eficiente. Usted solo indica qué necesita y nosotros lo hacemos.',
    color: '#F97316',
  },
  {
    icon: MapPin,
    title: 'La Máquina Llega a su Ubicación',
    desc: 'No necesita ir a buscar la maquinaria ni preocuparse por el traslado. La máquina llega a la ubicación que usted indique, lista para trabajar. Ya sea una obra en la ciudad, un terreno en la zona sur, o un proyecto en el área rural de Santa Cruz, nosotros llevamos la maquinaria hasta donde usted la necesita.',
    color: '#3B82F6',
  },
  {
    icon: Calculator,
    title: 'Precios Transparentes desde la App',
    desc: 'Antes de confirmar la reserva, usted ve el precio estimado basado en el tipo de máquina, la modalidad de alquiler y la duración. Sin sorpresas, sin costos ocultos, sin negociaciones interminables. La transparencia en el precio es la base de la confianza, y en Ecotaxi usted siempre sabe cuánto va a pagar antes de contratar el servicio.',
    color: '#10B981',
  },
  {
    icon: Clock,
    title: 'Disponibilidad Inmediata',
    desc: '¿Necesita una volqueta hoy mismo? ¿Un bobcat para mañana temprano? Nuestra plataforma le muestra la disponibilidad en tiempo real para que pueda reservar la maquinaria cuando la necesita, no cuando alguien se la puede conseguir. Para urgencias, tenemos un canal de despacho dedicado que opera las 24 horas.',
    color: '#8B5CF6',
  },
  {
    icon: FileText,
    title: 'Facturación Formal y Seguros',
    desc: 'Toda la documentación en regla: facturación formal para empresas y municipios, seguros de responsabilidad civil, habilitaciones municipales vigentes, y toda la documentación que su proyecto o institución requiere. No más informalidad ni riesgos legales. Con Ecotaxi, todo está documentado y asegurado.',
    color: '#06B6D4',
  },
]

function WhyPlatformSection() {
  return (
    <section id="plataforma" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full bg-[#EAB308]/5 blur-[180px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EAB308]/10 border border-[#EAB308]/20 mb-4">
              <Star className="w-4 h-4 text-[#EAB308]" />
              <span className="text-sm text-[#EAB308]">La Primera en Bolivia</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Maquinaria amarilla:{' '}
              <span className="bg-gradient-to-r from-[#EAB308] via-[#F97316] to-[#EAB308] bg-clip-text text-transparent">
                la revolución que Bolivia esperaba
              </span>
            </h2>
            <p className="text-white/50 max-w-3xl mx-auto text-lg">
              Inspirados en plataformas como BigRentz y United Rentals, traemos a Bolivia la primera plataforma
              digital de alquiler de maquinaria amarilla. La misma comodidad de reservar un taxi, ahora para alquilar
              una excavadora.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyReasons.map((reason, i) => (
            <AnimatedSection key={reason.title} delay={i * 100}>
              <div className="group relative p-6 md:p-7 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-white/10 transition-all duration-500 h-full">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/[0.02] transition-all duration-500" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: `${reason.color}12` }}>
                    <reason.icon className="w-6 h-6" style={{ color: reason.color }} />
                  </div>
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
   6. HOW IT WORKS
   ═══════════════════════════════════════════════════════════════════════════════ */
const howSteps = [
  {
    step: 1,
    icon: Smartphone,
    title: 'Seleccione la Maquinaria',
    desc: 'Explore nuestro catálogo, vea las imágenes, especificaciones y precios de cada máquina. Seleccione la que necesita para su trabajo: volqueta, bobcat, gallinita, excavadora o cualquier otra.',
    color: '#EAB308',
  },
  {
    step: 2,
    icon: Calculator,
    title: 'Elija la Modalidad',
    desc: 'Decida si alquila por hora, por contrato o por proyecto. Vea el precio estimado de inmediato y ajuste la duración según su necesidad. Todo es transparente desde el primer momento.',
    color: '#F97316',
  },
  {
    step: 3,
    icon: MapPin,
    title: 'Indique la Ubicación',
    desc: 'Díganos dónde necesita la maquinaria. La máquina se traslada a la ubicación que usted indique, con el operador incluido. No se preocupe por el transporte: nosotros lo hacemos.',
    color: '#3B82F6',
  },
  {
    step: 4,
    icon: HardHat,
    title: 'La Máquina Llega y Trabaja',
    desc: 'La maquinaria llega a la hora acordada con el operador profesional. Usted supervisa el trabajo y nosotros nos encargamos del resto. Al finalizar, recibe la facturación formal correspondiente.',
    color: '#10B981',
  },
]

function HowItWorksSection() {
  return (
    <section id="como-funciona" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-[#F97316]/5 blur-[180px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 mb-4">
              <Compass className="w-4 h-4 text-[#10B981]" />
              <span className="text-sm text-[#10B981]">Así Funciona</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              De la app a la obra en{' '}
              <span className="bg-gradient-to-r from-[#EAB308] via-[#F97316] to-[#10B981] bg-clip-text text-transparent">
                4 pasos
              </span>
            </h2>
            <p className="text-white/50 max-w-3xl mx-auto text-lg">
              Reserve maquinaria amarilla con la misma facilidad con la que pide un taxi.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {howSteps.map((step, i) => (
            <AnimatedSection key={step.title} delay={i * 100}>
              <div className="group relative p-6 md:p-7 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-white/10 transition-all duration-500 h-full">
                <div className="flex items-start gap-5">
                  <div className="shrink-0">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center relative" style={{ backgroundColor: `${step.color}12` }}>
                      <span className="text-xl font-bold" style={{ color: step.color }}>{step.step}</span>
                      <step.icon className="w-5 h-5 absolute -bottom-1 -right-1" style={{ color: step.color }} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-sm text-white/45 leading-relaxed">{step.desc}</p>
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
   7. SAFETY SECTION
   ═══════════════════════════════════════════════════════════════════════════════ */
function SafetySection() {
  return (
    <section id="seguridad" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] rounded-full bg-[#10B981]/5 blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection>
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 mb-6">
                <Shield className="w-4 h-4 text-[#10B981]" />
                <span className="text-sm text-[#10B981]">Seguridad y Garantía</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Maquinaria con{' '}
                <span className="bg-gradient-to-r from-[#10B981] to-[#EAB308] bg-clip-text text-transparent">
                  garantía total
                </span>
              </h2>
              <p className="text-white/55 text-lg leading-relaxed mb-8">
                Alquilar maquinaria amarilla implica riesgos si no se hace con una empresa responsable.
                En Ecotaxi, cada máquina está asegurada, cada operador está certificado, y cada proyecto
                cuenta con respaldo formal. Usted se enfoca en su obra, nosotros nos encargamos del resto.
              </p>
              <div className="space-y-4">
                {[
                  { icon: ShieldCheck, text: 'Seguro de responsabilidad civil para cada máquina', color: '#10B981' },
                  { icon: BadgeCheck, text: 'Operadores certificados y habilitados', color: '#EAB308' },
                  { icon: FileText, text: 'Facturación formal y documentación completa', color: '#3B82F6' },
                  { icon: Eye, text: 'Monitoreo GPS de la maquinaria en tiempo real', color: '#8B5CF6' },
                  { icon: Wrench, text: 'Mantenimiento preventivo: máquinas siempre operativas', color: '#F97316' },
                  { icon: Clock, text: 'Soporte 24/7 para emergencias y consultas', color: '#06B6D4' },
                ].map((point) => (
                  <div key={point.text} className="flex items-center gap-3">
                    <point.icon className="w-5 h-5 shrink-0" style={{ color: point.color }} />
                    <span className="text-white/70">{point.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <div className="space-y-4">
              {[
                { icon: ShieldCheck, title: 'Máquinas Revisadas', desc: 'Cada máquina pasa por una revisión técnica antes de cada alquiler. No enviamos equipos con fallas ni en mal estado, porque su tiempo y su seguridad son lo más importante.', color: '#10B981' },
                { icon: UserCheck, title: 'Operadores de Confianza', desc: 'Nuestros operadores son profesionales certificados con años de experiencia en el manejo de maquinaria pesada. Conocen la máquina, conocen el terreno y conocen los protocolos de seguridad.', color: '#EAB308' },
                { icon: FileText, title: 'Contrato y Seguro', desc: 'Cada alquiler incluye un contrato formal que protege tanto al cliente como a la empresa. Además, contamos con seguro de responsabilidad civil que cubre cualquier eventualidad durante el trabajo.', color: '#3B82F6' },
              ].map((card) => (
                <div key={card.title} className="group relative p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-white/10 transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: `${card.color}12` }}>
                      <card.icon className="w-5 h-5" style={{ color: card.color }} />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white mb-1">{card.title}</h3>
                      <p className="text-sm text-white/45 leading-relaxed">{card.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   8. CONTACT / BOOKING SECTION
   ═══════════════════════════════════════════════════════════════════════════════ */
function ContactSection() {
  return (
    <section id="contacto" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-[#EAB308]/5 blur-[180px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EAB308]/10 border border-[#EAB308]/20 mb-4">
              <Phone className="w-4 h-4 text-[#EAB308]" />
              <span className="text-sm text-[#EAB308]">Cotice su Maquinaria</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Reserve su maquinaria{' '}
              <span className="bg-gradient-to-r from-[#EAB308] to-[#F97316] bg-clip-text text-transparent">
                ahora mismo
              </span>
            </h2>
            <p className="text-white/50 max-w-3xl mx-auto text-lg">
              Cotice por WhatsApp, llame a nuestra central, o reserve directamente desde la plataforma.
              La maquinaria que necesita está a un clic de distancia.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left: Contact methods */}
          <AnimatedSection>
            <div className="space-y-5">
              <a
                href="https://wa.me/59133296885?text=Hola%2C%20necesito%20cotizar%20alquiler%20de%20maquinaria%20amarilla"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-5 p-5 rounded-2xl bg-[#25D366]/5 border border-[#25D366]/15 hover:border-[#25D366]/30 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#25D366]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="w-7 h-7 text-[#25D366]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">WhatsApp</h3>
                  <p className="text-sm text-white/45">Cotice al (+591) 3 3296885 — respuesta inmediata</p>
                </div>
                <ArrowRight className="w-5 h-5 text-white/20 ml-auto group-hover:text-[#25D366] transition-colors" />
              </a>

              <a
                href="tel:+59133296885"
                className="group flex items-center gap-5 p-5 rounded-2xl bg-[#EAB308]/5 border border-[#EAB308]/15 hover:border-[#EAB308]/30 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#EAB308]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <PhoneCall className="w-7 h-7 text-[#EAB308]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Llame Ahora</h3>
                  <p className="text-sm text-white/45">Central de despacho 24/7: (+591) 3 3296885</p>
                </div>
                <ArrowRight className="w-5 h-5 text-white/20 ml-auto group-hover:text-[#EAB308] transition-colors" />
              </a>

              <a
                href="https://id3251.tm.taxi:58443/?cid=1"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-5 p-5 rounded-2xl bg-[#F97316]/5 border border-[#F97316]/15 hover:border-[#F97316]/30 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#F97316]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Smartphone className="w-7 h-7 text-[#F97316]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Reserve en Línea</h3>
                  <p className="text-sm text-white/45">Desde la plataforma digital Ecotaxi</p>
                </div>
                <ArrowRight className="w-5 h-5 text-white/20 ml-auto group-hover:text-[#F97316] transition-colors" />
              </a>

              <div className="group flex items-center gap-5 p-5 rounded-2xl bg-[#3B82F6]/5 border border-[#3B82F6]/15">
                <div className="w-14 h-14 rounded-2xl bg-[#3B82F6]/10 flex items-center justify-center">
                  <MapPin className="w-7 h-7 text-[#3B82F6]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Oficina Central</h3>
                  <p className="text-sm text-white/45">Santa Cruz de la Sierra, Bolivia</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Right: Reservation iframe */}
          <AnimatedSection delay={200}>
            <div className="relative rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm overflow-hidden">
              <div className="p-4 border-b border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <HardHat className="w-5 h-5 text-[#EAB308]" />
                  <span className="font-semibold text-white">Reservar Maquinaria</span>
                </div>
              </div>
              <iframe
                src="https://id3251.tm.taxi:58443/?cid=1"
                className="w-full h-[500px] border-0"
                title="Reservar Maquinaria Amarilla Ecotaxi"
                allow="geolocation"
              />
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
export default function AlquilerMaquinariaPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0e17]">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <MachinerySection />
        <RentalSection />
        <ForWhomSection />
        <WhyPlatformSection />
        <HowItWorksSection />
        <SafetySection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
