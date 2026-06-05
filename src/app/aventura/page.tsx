'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Mountain, Compass, Car, Shield, MapPin, Clock, Users, CheckCircle2,
  Phone, ArrowRight, Star, BadgeCheck, ShieldCheck, Navigation, Sparkles,
  ChevronRight, PhoneCall, MessageCircle, Eye, UserCheck, Camera,
  TreePine, Tent, Waves, Sun, Cloud, CircleCheck, Handshake, Truck,
  AlertCircle, Route, Map, Gauge
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
   1. HERO SECTION — Adventure & Nature
   ═══════════════════════════════════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src="/service-aventura.webp"
          alt="Aventura Bolivia Ecotaxi"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17]/60 via-[#0a0e17]/80 to-[#0a0e17]" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(139,92,246,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.4) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[#8B5CF6]/12 blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#22C55E]/10 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[#8B5CF6]/6 blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Decorative icons */}
      <div className="absolute top-32 right-[8%] md:right-[18%] opacity-[0.07]">
        <Mountain className="w-28 h-28 md:w-40 md:h-40 text-[#8B5CF6]" />
      </div>
      <div className="absolute bottom-28 left-[5%] md:left-[12%] opacity-[0.05]">
        <Compass className="w-20 h-20 md:w-28 md:h-28 text-[#22C55E]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 pb-16">
        {/* Badge */}
        <AnimatedSection>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/25 mb-8 backdrop-blur-sm">
            <Mountain className="w-4 h-4 text-[#8B5CF6]" />
            <span className="text-sm text-[#8B5CF6] font-medium">Aventura Bolivia</span>
          </div>
        </AnimatedSection>

        {/* Title */}
        <AnimatedSection delay={100}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Explora los Caminos más{' '}
            <span className="bg-gradient-to-r from-[#8B5CF6] via-[#22C55E] to-[#8B5CF6] bg-clip-text text-transparent">
              Salvajes
            </span>
          </h1>
        </AnimatedSection>

        {/* Subtitle */}
        <AnimatedSection delay={200}>
          <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-10 leading-relaxed">
            Turismo de aventura con vehículos 4x4, conductores experimentados y las rutas más desafiantes
            de Bolivia. Desde el Salar de Uyuni hasta las selvas del Amazonas, te llevamos a los destinos
            que otros no pueden alcanzar. Vive la adrenalina con la seguridad que solo Ecotaxi puede ofrecer.
          </p>
        </AnimatedSection>

        {/* CTA buttons */}
        <AnimatedSection delay={300}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <a
              href="#destinos"
              className="px-8 py-4 rounded-full text-lg font-semibold text-black bg-[#22C55E] hover:bg-[#4ADE80] transition-all duration-300 shadow-[0_0_30px_rgba(34,197,94,0.3)] hover:shadow-[0_0_50px_rgba(34,197,94,0.5)] hover:scale-105"
            >
              Explorar Destinos
            </a>
            <a
              href="#reservas"
              className="px-8 py-4 rounded-full text-lg font-semibold text-[#8B5CF6] border border-[#8B5CF6]/30 hover:border-[#8B5CF6]/60 hover:bg-[#8B5CF6]/5 transition-all duration-300"
            >
              Reservar Aventura
            </a>
          </div>
        </AnimatedSection>

        {/* Stats bar */}
        <AnimatedSection delay={400}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { value: '20+', label: 'Destinos de aventura', icon: Mountain },
              { value: '50+', label: 'Rutas 4x4', icon: Route },
              { value: '30+', label: 'Guías locales', icon: UserCheck },
              { value: '∞', label: 'Experiencias únicas', icon: Sparkles },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-4 rounded-2xl bg-white/[0.03] border border-[#8B5CF6]/10 backdrop-blur-sm hover:border-[#8B5CF6]/20 transition-all duration-300"
              >
                <stat.icon className="w-5 h-5 text-[#8B5CF6] mx-auto mb-2" />
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
   2. ADVENTURE TYPES SECTION — Four card types
   ═══════════════════════════════════════════════════════════════════════════════ */
const adventureTypes = [
  {
    icon: Car,
    title: 'Expediciones 4x4',
    subtitle: 'Conquista lo imposible',
    desc: 'Nuestras expediciones 4x4 te llevan por los caminos más intrépidos de Bolivia, donde el asfalto termina y la aventura comienza. Atraviesa ríos, escala dunas, cruza salares y descubre paisajes que parecen de otro planeta. Cada expedición es una experiencia única diseñada para quienes buscan sentir la potencia de un todoterreno bajo las condiciones más extremas del territorio boliviano.',
    features: [
      { icon: Gauge, text: 'Vehículos todoterreno equipados con winche y snorkel' },
      { icon: MapPin, text: 'Rutas off-road personalizadas según tu nivel de experiencia' },
      { icon: Shield, text: 'Conductores con años de experiencia en terreno extremo' },
      { icon: Compass, text: 'GPS y navegación satelital en zonas sin cobertura' },
      { icon: Tent, text: 'Campamentos improvisados en lugares de difícil acceso' },
    ],
    color: '#8B5CF6',
    tag: 'OFF-ROAD',
  },
  {
    icon: Mountain,
    title: 'Trekking y Montaña',
    subtitle: 'Camina donde las nubes',
    desc: 'Transporte especializado para expediciones de trekking y montañismo en las cordilleras de Bolivia. Te llevamos hasta el punto de partida de las rutas de senderismo más espectaculares del país, desde los picos nevados de la Cordillera Real hasta los senderos selváticos de los Yungas. Nuestros conductores conocen cada acceso, cada atajo y cada refugio de montaña en Bolivia.',
    features: [
      { icon: Mountain, text: 'Acceso a puntos de partida de trekking remotos' },
      { icon: Users, text: 'Transporte de equipos y provisiones de montaña' },
      { icon: Sun, text: 'Conductores que conocen las rutas de altura' },
      { icon: Cloud, text: 'Aclimatación progresiva con paradas estratégicas' },
      { icon: TreePine, text: 'Recorridos por senderos en bosques nublados' },
    ],
    color: '#22C55E',
    tag: 'MONTAÑA',
  },
  {
    icon: Waves,
    title: 'Turismo Aventura',
    subtitle: 'Adrenalina pura',
    desc: 'Traslado a los mejores puntos de turismo de aventura en Bolivia: rafting en los rápidos de los Yungas, canopy en las selvas de Santa Cruz, parapente en las alturas de La Paz, ciclismo de montaña en el Camino de la Muerte y mucho más. Te llevamos al punto de partida y te recogemos al finalizar la experiencia, para que solo te preocupes por disfrutar la adrenalina.',
    features: [
      { icon: Waves, text: 'Rafting y deportes acuáticos en ríos turbulentos' },
      { icon: Compass, text: 'Canopy, tirolesa y puentes colgantes en la selva' },
      { icon: Sun, text: 'Parapente y vuelos ultraligeros en las alturas' },
      { icon: Mountain, text: 'Ciclismo de montaña en rutas extremas' },
      { icon: Sparkles, text: 'Escalada en roca y rappel en formaciones naturales' },
    ],
    color: '#0077BD',
    tag: 'ADRENALINA',
  },
  {
    icon: Camera,
    title: 'Safaris Fotográficos',
    subtitle: 'Captura lo imposible',
    desc: 'Recorridos diseñados específicamente para fotógrafos profesionales y aficionados que buscan las mejores tomas de la naturaleza boliviana. Nuestros conductores te llevan a los puntos exactos en el momento perfecto: amaneceres sobre el Salar, atardeceres en la selva, avistamiento de fauna silvestre en parques nacionales y las formaciones geológicas más impresionantes de Sudamérica.',
    features: [
      { icon: Camera, text: 'Rutas optimizadas para la mejor luz natural del día' },
      { icon: TreePine, text: 'Avistamiento de fauna en reservas y parques nacionales' },
      { icon: Map, text: 'Guías que conocen los mejores ángulos fotográficos' },
      { icon: Clock, text: 'Horarios flexibles para capturar atardeceres y amaneceres' },
      { icon: Eye, text: 'Acceso a zonas restringidas con permisos especiales' },
    ],
    color: '#00E676',
    tag: 'FOTOGRAFÍA',
  },
]

function AdventureTypesSection() {
  const [activeCard, setActiveCard] = useState<string | null>(null)

  return (
    <section id="aventuras" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-[#8B5CF6]/5 blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 mb-4">
              <Compass className="w-4 h-4 text-[#8B5CF6]" />
              <span className="text-sm text-[#8B5CF6]">Tipos de Aventura</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Elige tu tipo de{' '}
              <span className="bg-gradient-to-r from-[#8B5CF6] via-[#22C55E] to-[#8B5CF6] bg-clip-text text-transparent">
                aventura
              </span>
            </h2>
            <p className="text-white/50 max-w-3xl mx-auto text-lg">
              Desde expediciones 4x4 por caminos imposibles hasta safaris fotográficos en la selva
              más remota. En Ecotaxi Aventura tenemos el transporte perfecto para cada tipo de
              explorador. Descubre cuál es tu próxima aventura en Bolivia.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {adventureTypes.map((adventure, i) => {
            const isActive = activeCard === adventure.title
            return (
              <AnimatedSection key={adventure.title} delay={i * 100}>
                <div
                  onClick={() => setActiveCard(isActive ? null : adventure.title)}
                  className={`group relative rounded-2xl overflow-hidden bg-white/[0.03] border backdrop-blur-sm cursor-pointer transition-all duration-500 ${
                    isActive ? 'bg-white/[0.06]' : 'hover:border-white/10'
                  }`}
                  style={{
                    borderColor: isActive ? `${adventure.color}40` : undefined,
                  }}
                >
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ boxShadow: `0 0 30px ${adventure.color}08` }}
                  />

                  {/* Tag */}
                  <div className="absolute top-4 right-4 z-10">
                    <span
                      className="px-2 py-1 rounded-full text-[10px] font-bold border"
                      style={{
                        background: `${adventure.color}15`,
                        color: adventure.color,
                        borderColor: `${adventure.color}30`,
                      }}
                    >
                      {adventure.tag}
                    </span>
                  </div>

                  <div className="p-6 md:p-8">
                    <div className="flex items-start gap-4 mb-5">
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300"
                        style={{ background: `${adventure.color}12` }}
                      >
                        <adventure.icon className="w-7 h-7" style={{ color: adventure.color }} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{adventure.title}</h3>
                        <p className="text-sm" style={{ color: adventure.color }}>{adventure.subtitle}</p>
                      </div>
                    </div>

                    <p className="text-sm text-white/45 leading-relaxed mb-5">{adventure.desc}</p>

                    {/* Expandable features */}
                    <div
                      className={`transition-all duration-500 overflow-hidden ${
                        isActive ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="space-y-3 pt-4 border-t" style={{ borderColor: `${adventure.color}15` }}>
                        {adventure.features.map((feature) => (
                          <div key={feature.text} className="flex items-start gap-3">
                            <feature.icon className="w-4 h-4 mt-0.5 shrink-0" style={{ color: adventure.color }} />
                            <span className="text-sm text-white/55">{feature.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {!isActive && (
                      <p className="text-xs mt-4 flex items-center gap-1" style={{ color: `${adventure.color}60` }}>
                        <ChevronRight className="w-3 h-3" />
                        Click para ver detalles
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
   3. HOW IT WORKS SECTION — 4 Steps
   ═══════════════════════════════════════════════════════════════════════════════ */
const howItWorksSteps = [
  {
    step: 1,
    icon: MapPin,
    title: 'Elige tu aventura en la APP',
    desc: 'Abre la aplicación de Ecotaxi y selecciona la categoría Aventura. Explora los diferentes tipos de expedición disponibles: 4x4, trekking, turismo aventura o safari fotográfico. Cada opción incluye descripciones detalladas, niveles de dificultad y recomendaciones para que tomes la mejor decisión según tu experiencia y preferencias.',
    color: '#8B5CF6',
  },
  {
    step: 2,
    icon: Mountain,
    title: 'Selecciona destino y fecha',
    desc: 'Define tu destino de aventura, la fecha del recorrido y el número de personas que te acompañan. Puedes elegir entre nuestros destinos predefinidos o solicitar una ruta personalizada. Nuestro sistema calculará automáticamente la tarifa del transporte para que tengas total transparencia antes de confirmar tu reserva.',
    color: '#22C55E',
  },
  {
    step: 3,
    icon: Car,
    title: 'Te asignamos conductor y vehículo 4x4',
    desc: 'Una vez confirmada tu reserva, te asignamos un conductor experimentado en rutas de aventura y el vehículo 4x4 adecuado para tu destino. Recibirás los datos del conductor, la placa del vehículo y la hora exacta de recogida. Nuestros conductores de aventura están capacitados en conducción off-road, primeros auxilios y protocolos de emergencia en zonas remotas.',
    color: '#0077BD',
  },
  {
    step: 4,
    icon: Camera,
    title: 'Vive la experiencia',
    desc: 'Disfruta de tu aventura con la tranquilidad de tener transporte seguro y confiable. El conductor te esperará en cada parada, te llevará a los mejores puntos del recorrido y estará disponible durante toda la expedición. Al finalizar, te regresamos con seguridad a tu punto de origen. Solo preocúpate por vivir momentos inolvidables en los paisajes más impresionantes de Bolivia.',
    color: '#00E676',
  },
]

function HowItWorksSection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(139,92,246,0.3) 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
        }}
      />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-[#8B5CF6]/5 blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20 mb-4">
              <Route className="w-4 h-4 text-[#22C55E]" />
              <span className="text-sm text-[#22C55E]">Cómo Funciona</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Tu aventura en{' '}
              <span className="bg-gradient-to-r from-[#8B5CF6] via-[#22C55E] to-[#8B5CF6] bg-clip-text text-transparent">
                4 pasos
              </span>
            </h2>
            <p className="text-white/50 max-w-3xl mx-auto text-lg">
              Reservar tu aventura con Ecotaxi es tan sencillo como elegir tu destino y dejar que nosotros
              nos encarguemos del transporte. Un proceso simple para una experiencia extraordinaria.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {howItWorksSteps.map((step, i) => (
            <AnimatedSection key={step.title} delay={i * 120}>
              <div className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-white/10 transition-all duration-500 h-full">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/[0.02] transition-all duration-500" />

                {/* Step number */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-5 text-sm font-bold text-white"
                  style={{ background: `${step.color}20`, border: `1px solid ${step.color}40` }}
                >
                  {step.step}
                </div>

                <div className="relative z-10">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: `${step.color}12` }}
                  >
                    <step.icon className="w-6 h-6" style={{ color: step.color }} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-white/45 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Connecting line for desktop */}
        <div className="hidden lg:flex items-center justify-center mt-8">
          <div className="flex items-center gap-2 text-white/20 text-sm">
            <MapPin className="w-4 h-4 text-[#8B5CF6]" />
            <span>APP</span>
            <div className="w-12 h-px bg-gradient-to-r from-[#8B5CF6]/30 to-[#22C55E]/30" />
            <Mountain className="w-4 h-4 text-[#22C55E]" />
            <span>Destino</span>
            <div className="w-12 h-px bg-gradient-to-r from-[#22C55E]/30 to-[#0077BD]/30" />
            <Car className="w-4 h-4 text-[#0077BD]" />
            <span>4x4</span>
            <div className="w-12 h-px bg-gradient-to-r from-[#0077BD]/30 to-[#00E676]/30" />
            <Camera className="w-4 h-4 text-[#00E676]" />
            <span>¡Aventura!</span>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   4. DESTINATIONS SECTION — 6 Bolivia Adventure Destinations
   ═══════════════════════════════════════════════════════════════════════════════ */
const destinations = [
  {
    name: 'Salar de Uyuni',
    location: 'Potosí',
    desc: 'El desierto de sal más grande del mundo, con más de 10,000 km² de blanca inmensidad. Nuestros vehículos 4x4 te llevan a las islas de cactus gigante, las lagunas de colores, los géiseres y los hoteles de sal. Un paisaje surrealista que cambia completamente entre la temporada seca y la de lluvias, cuando el salar se convierte en un espejo gigante que refleja el cielo infinito.',
    difficulty: 'Moderado',
    season: 'May - Oct (seco) / Dic - Mar (espejo)',
    color: '#8B5CF6',
    icon: Sun,
  },
  {
    name: 'Yungas (Camino de la Muerte)',
    location: 'La Paz',
    desc: 'El famoso Camino de la Muerte, una ruta de montaña estrecha y sinuosa que desciende desde los 4,700 msnm hasta los 1,200 msnm en la selva tropical de los Yungas. Considerada una de las carreteras más peligrosas del mundo, hoy es un destino icónico para el ciclismo de montaña y las expediciones de aventura. Nuestros conductores experimentados te llevan con seguridad por este legendario camino.',
    difficulty: 'Alto',
    season: 'Abr - Nov (temporada seca)',
    color: '#E91E63',
    icon: Mountain,
  },
  {
    name: 'Parque Nacional Amboró',
    location: 'Santa Cruz',
    desc: 'Una de las reservas de biodiversidad más importantes del planeta, donde la cordillera andina se encuentra con la cuenca amazónica. Selva nublada, cascadas impresionantes, senderos entre helechos gigantes y una variedad de flora y fauna que te dejará sin aliento. Acceso en vehículo 4x4 por caminos de tierra que serpentean entre montañas cubiertas de vegetación exuberante.',
    difficulty: 'Moderado',
    season: 'May - Oct (seco) / Todo el año',
    color: '#22C55E',
    icon: TreePine,
  },
  {
    name: 'Parque Nacional Noel Kempff Mercado',
    location: 'Santa Cruz / Beni',
    desc: 'Patrimonio Natural de la Humanidad por UNESCO, este parque alberga la meseta de Huanchaca, las espectaculares cascadas Arcoíris y un ecosistema único que combina sabanas, selvas y formaciones rocosas antiguas. Un destino verdaderamente remoto que requiere vehículos 4x4 preparados para largas distancias y caminos desafiantes. La recompensa es una naturaleza virgen que pocos han presenciado.',
    difficulty: 'Experto',
    season: 'May - Oct (temporada seca)',
    color: '#0077BD',
    icon: Compass,
  },
  {
    name: 'Tiwanaku',
    location: 'La Paz',
    desc: 'Las ruinas de la antigua civilización Tiwanaku, declaradas Patrimonio de la Humanidad por UNESCO. A orillas del lago Titicaca, estos misteriosos monumentos líticos de más de 3,000 años de antigüedad son testimonio de una de las culturas más avanzadas de la América precolombina. Acceso por carretera pavimentada con paradas panorámicas en el altiplano y vistas impresionantes del lago sagrado.',
    difficulty: 'Bajo',
    season: 'Todo el año',
    color: '#FF9800',
    icon: Map,
  },
  {
    name: 'Lago Titicaca',
    location: 'La Paz',
    desc: 'El lago navegable más alto del mundo, a 3,812 msnm, con sus aguas azul intenso y las comunidades originarias que habitan sus islas desde tiempos inmemoriales. Visita la Isla del Sol, la Isla de la Luna y las comunidades flotantes de los Uros. Un destino que combina aventura cultural con paisajes de una belleza incomparable, accesible en vehículo con paradas en miradores espectaculares del altiplano.',
    difficulty: 'Bajo - Moderado',
    season: 'May - Oct (seco) / Todo el año',
    color: '#00BCD4',
    icon: Waves,
  },
]

function DestinationsSection() {
  const [activeDest, setActiveDest] = useState<string | null>(null)

  return (
    <section id="destinos" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-[#22C55E]/5 blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20 mb-4">
              <MapPin className="w-4 h-4 text-[#22C55E]" />
              <span className="text-sm text-[#22C55E]">Destinos de Aventura</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Los destinos más{' '}
              <span className="bg-gradient-to-r from-[#8B5CF6] via-[#22C55E] to-[#8B5CF6] bg-clip-text text-transparent">
                salvajes de Bolivia
              </span>
            </h2>
            <p className="text-white/50 max-w-3xl mx-auto text-lg">
              Bolivia es el país con mayor biodiversidad y variedad geográfica de Sudamérica.
              Desde el altiplano hasta la selva amazónica, te llevamos a los rincones más
              impresionantes que este país tiene para ofrecer al aventurero más exigente.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest, i) => {
            const isActive = activeDest === dest.name
            return (
              <AnimatedSection key={dest.name} delay={i * 80}>
                <div
                  onClick={() => setActiveDest(isActive ? null : dest.name)}
                  className={`group relative p-6 rounded-2xl bg-white/[0.03] border backdrop-blur-sm cursor-pointer transition-all duration-500 overflow-hidden ${
                    isActive ? 'bg-white/[0.06]' : 'hover:border-white/10'
                  }`}
                  style={{
                    borderColor: isActive ? `${dest.color}40` : undefined,
                  }}
                >
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ boxShadow: `0 0 30px ${dest.color}08` }}
                  />

                  <div className="relative z-10">
                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300"
                        style={{ background: `${dest.color}12` }}
                      >
                        <dest.icon className="w-6 h-6" style={{ color: dest.color }} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{dest.name}</h3>
                        <p className="text-xs" style={{ color: dest.color }}>{dest.location}</p>
                      </div>
                    </div>

                    <p className="text-sm text-white/45 leading-relaxed mb-4">{dest.desc}</p>

                    {/* Difficulty and season */}
                    <div className="flex items-center gap-4 text-xs mb-3">
                      <div className="flex items-center gap-1.5">
                        <Gauge className="w-3.5 h-3.5" style={{ color: dest.color }} />
                        <span className="text-white/40">Dificultad:</span>
                        <span className="font-semibold" style={{ color: dest.color }}>
                          {dest.difficulty}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs">
                      <Sun className="w-3.5 h-3.5" style={{ color: dest.color }} />
                      <span className="text-white/40">Temporada:</span>
                      <span className="text-white/55">{dest.season}</span>
                    </div>
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
   5. VEHICLE FLEET SECTION — 3 Vehicle Types for Adventure
   ═══════════════════════════════════════════════════════════════════════════════ */
const vehicleFleet = [
  {
    icon: Car,
    name: '4x4 SUV',
    brand: 'Toyota Hilux / Fortuner',
    passengers: '4',
    desc: 'La opción ideal para expediciones de aventura en grupo pequeño. Nuestros SUV 4x4 están equipados con tracción en las cuatro ruedas, suspensión reforzada para terreno accidentado y neumáticos todoterreno que garantizan el agarre en cualquier superficie. Perfectos para recorridos por el Salar de Uyuni, caminos de montaña y rutas off-road de dificultad moderada a alta.',
    tag: 'HASTA 4 PASAJEROS',
    color: '#8B5CF6',
    features: [
      { icon: Gauge, text: 'Tracción 4x4 con reductora para terrenos extremos' },
      { icon: Shield, text: 'Suspensión reforzada y neumáticos todoterreno' },
      { icon: Compass, text: 'GPS y navegación satelital integrada' },
      { icon: TreePine, text: 'Winche de recuperación y equipo de emergencia' },
      { icon: Cloud, text: 'Snorkel para vadeo de ríos y zonas inundadas' },
    ],
  },
  {
    icon: Users,
    name: '4x4 Van',
    brand: 'Expediciones grupales',
    passengers: '8',
    desc: 'Para grupos de aventureros que quieren compartir la experiencia juntos. Nuestras vans 4x4 ofrecen amplio espacio interior para hasta 8 pasajeros, equipaje de expedición y provisiones. Con tracción en las cuatro ruedas y la robustez necesaria para enfrentar caminos de tierra, ripio y barro. Ideales para expediciones de varios días con equipo de campamento incluido.',
    tag: 'HASTA 8 PASAJEROS',
    color: '#22C55E',
    features: [
      { icon: Users, text: 'Capacidad para hasta 8 aventureros con equipaje' },
      { icon: Car, text: 'Tracción 4x4 con chasis reforzado de larga distancia' },
      { icon: Tent, text: 'Espacio para equipo de campamento y provisiones' },
      { icon: Navigation, text: 'Rastreo GPS en tiempo real para seguridad del grupo' },
      { icon: ShieldCheck, text: 'Botiquín de primeros auxilios completo' },
    ],
  },
  {
    icon: Truck,
    name: 'Bus 4x4',
    brand: 'Grandes grupos y expediciones',
    passengers: '20',
    desc: 'La solución definitiva para expediciones de gran escala, tours organizados y grupos corporativos de aventura. Nuestros buses 4x4 combinan la capacidad de transporte masivo con la resistencia todoterreno necesaria para las rutas más exigentes de Bolivia. Equipados con aire acondicionado, asientos reclinables y toda la infraestructura para que la aventura en grupo sea cómoda y segura.',
    tag: 'HASTA 20 PASAJEROS',
    color: '#0077BD',
    features: [
      { icon: Users, text: 'Capacidad para hasta 20 pasajeros con confort' },
      { icon: Gauge, text: 'Motor diésel de alta potencia para terreno escarpado' },
      { icon: Sun, text: 'Aire acondicionado y asientos reclinables' },
      { icon: Map, text: 'Equipo de navegación y comunicación satelital' },
      { icon: Shield, text: 'Sistema de recuperación y asistencia en ruta' },
    ],
  },
]

function VehicleFleetSection() {
  const [activeVehicle, setActiveVehicle] = useState<string | null>(null)

  return (
    <section id="flota" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] rounded-full bg-[#8B5CF6]/5 blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0077BD]/10 border border-[#0077BD]/20 mb-4">
              <Car className="w-4 h-4 text-[#0077BD]" />
              <span className="text-sm text-[#0077BD]">Flota de Aventura</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Vehículos preparados para{' '}
              <span className="bg-gradient-to-r from-[#8B5CF6] to-[#22C55E] bg-clip-text text-transparent">
                lo imposible
              </span>
            </h2>
            <p className="text-white/50 max-w-3xl mx-auto text-lg">
              No cualquier vehículo puede llegar a donde la aventura te llama. Nuestra flota de vehículos
              4x4 está específicamente seleccionada y equipada para enfrentar los terrenos más difíciles
              de Bolivia, desde salares a 3,600 msnm hasta selvas tropicales al nivel del mar.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {vehicleFleet.map((vehicle, i) => {
            const isActive = activeVehicle === vehicle.name
            return (
              <AnimatedSection key={vehicle.name} delay={i * 120}>
                <div
                  onClick={() => setActiveVehicle(isActive ? null : vehicle.name)}
                  className={`group relative p-6 rounded-2xl bg-white/[0.03] border backdrop-blur-sm cursor-pointer transition-all duration-500 overflow-hidden ${
                    isActive ? 'bg-white/[0.06]' : 'hover:border-white/10'
                  }`}
                  style={{
                    borderColor: isActive ? `${vehicle.color}40` : undefined,
                  }}
                >
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ boxShadow: `0 0 30px ${vehicle.color}08` }}
                  />

                  {/* Tag */}
                  <div className="absolute top-4 right-4">
                    <span
                      className="px-2 py-1 rounded-full text-[10px] font-bold border"
                      style={{
                        background: `${vehicle.color}15`,
                        color: vehicle.color,
                        borderColor: `${vehicle.color}30`,
                      }}
                    >
                      {vehicle.tag}
                    </span>
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300"
                        style={{ background: `${vehicle.color}12` }}
                      >
                        <vehicle.icon className="w-7 h-7" style={{ color: vehicle.color }} />
                      </div>
                      <div className="pt-1">
                        <h3 className="text-lg font-semibold text-white">{vehicle.name}</h3>
                        <p className="text-xs" style={{ color: `${vehicle.color}90` }}>{vehicle.brand}</p>
                        <div className="flex items-center gap-1 text-xs text-white/30 mt-1">
                          <Users className="w-3 h-3" />
                          <span>{vehicle.passengers} pasajeros</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-white/45 leading-relaxed">{vehicle.desc}</p>

                    {/* Expandable features */}
                    <div
                      className={`transition-all duration-500 overflow-hidden ${
                        isActive ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="space-y-3 pt-4 mt-4 border-t" style={{ borderColor: `${vehicle.color}15` }}>
                        {vehicle.features.map((feature) => (
                          <div key={feature.text} className="flex items-start gap-3">
                            <feature.icon className="w-4 h-4 mt-0.5 shrink-0" style={{ color: vehicle.color }} />
                            <span className="text-sm text-white/55">{feature.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {!isActive && (
                      <p className="text-xs mt-4 flex items-center gap-1" style={{ color: `${vehicle.color}60` }}>
                        <ChevronRight className="w-3 h-3" />
                        Click para ver equipamiento
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
   6. SAFETY ON THE ROAD SECTION
   ═══════════════════════════════════════════════════════════════════════════════ */
const safetyFeatures = [
  {
    icon: Navigation,
    title: 'GPS en Rutas Remotas',
    desc: 'Todos nuestros vehículos de aventura cuentan con rastreo GPS en tiempo real que permite a nuestra central de despacho monitorear la ubicación exacta del vehículo, incluso en las zonas más remotas de Bolivia. Si el vehículo se desvía de la ruta programada o se detiene inesperadamente, nuestro equipo de seguridad actúa de inmediato para coordinar la asistencia necesaria.',
    color: '#8B5CF6',
  },
  {
    icon: Phone,
    title: 'Comunicación Satelital',
    desc: 'En zonas donde la cobertura celular es inexistente, nuestros vehículos de aventura llevan equipos de comunicación satelital que garantizan contacto permanente con la central de operaciones. Esto significa que nunca estás verdaderamente solo, por más remoto que sea el destino. Comunicación bidireccional para emergencias y actualizaciones de ruta en tiempo real.',
    color: '#22C55E',
  },
  {
    icon: ShieldCheck,
    title: 'Botiquín de Primeros Auxilios',
    desc: 'Cada vehículo 4x4 de nuestra flota de aventura está equipado con un botiquín completo de primeros auxilios, que incluye material de curación, vendajes, antiinflamatorios, suero oral y elementos básicos para la estabilización de emergencias. Nuestros conductores están capacitados en primeros auxilios y manejo de situaciones de emergencia en campo.',
    color: '#0077BD',
  },
  {
    icon: AlertCircle,
    title: 'Coordinación de Emergencias',
    desc: 'En caso de cualquier eventualidad durante la expedición, nuestro equipo de coordinación de emergencias está disponible 24/7 para activar protocolos de rescate, coordinar evacuaciones médicas o gestionar cualquier situación que requiera asistencia. Trabajamos con redes de hospitales, clínicas y servicios de rescate en todo el territorio nacional.',
    color: '#E91E63',
  },
  {
    icon: UserCheck,
    title: 'Conductores de Montaña',
    desc: 'Nuestros conductores de aventura no son simples choferes: son expertos en conducción off-road con años de experiencia en las rutas más exigentes de Bolivia. Conocen cada curva del Camino de la Muerte, cada atajo del Salar de Uyuni y cada camino de los Yungas. Su experiencia es tu mayor garantía de seguridad en terrenos donde un error puede ser fatal.',
    color: '#FF9800',
  },
  {
    icon: Truck,
    title: 'Servicio de Recuperación',
    desc: 'Si el vehículo sufre una avería mecánica en plena expedición, nuestro servicio de recuperación vehicular se activa de inmediato. Contamos con grúas y equipos de recuperación especializados que pueden llegar a zonas remotas para asistir o reemplazar el vehículo, garantizando que tu aventura continúe o que regreses con seguridad a tu punto de origen.',
    color: '#00E676',
  },
]

function SafetySection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full bg-[#8B5CF6]/5 blur-[180px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <AnimatedSection>
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 mb-6">
                <Shield className="w-4 h-4 text-[#8B5CF6]" />
                <span className="text-sm text-[#8B5CF6]">Seguridad en la Ruta</span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Seguridad total en{' '}
                <span className="bg-gradient-to-r from-[#8B5CF6] to-[#22C55E] bg-clip-text text-transparent">
                  terreno extremo
                </span>
              </h2>

              <p className="text-white/55 text-lg leading-relaxed mb-8">
                Cuando la aventura te lleva a lugares remotos, la seguridad no es negociable. En Ecotaxi
                Aventura cada vehículo está equipado con tecnología de rastreo, comunicación y asistencia
                que te protege incluso donde no hay señal celular. Nuestros conductores especializados
                conocen cada ruta, cada peligro y cada protocolo de emergencia para que tu única
                preocupación sea disfrutar la experiencia.
              </p>

              <div className="space-y-4 mb-10">
                {[
                  { icon: CheckCircle2, text: 'Monitoreo GPS 24/7 en todas las expediciones' },
                  { icon: CheckCircle2, text: 'Comunicación satelital en zonas sin cobertura' },
                  { icon: CheckCircle2, text: 'Conductores certificados en conducción off-road' },
                  { icon: CheckCircle2, text: 'Protocolos de emergencia activos durante todo el recorrido' },
                ].map((point) => (
                  <div key={point.text} className="flex items-center gap-3">
                    <point.icon className="w-5 h-5 text-[#22C55E] shrink-0" />
                    <span className="text-white/70">{point.text}</span>
                  </div>
                ))}
              </div>

              <a
                href="#reservas"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-lg font-bold text-black bg-[#22C55E] hover:bg-[#4ADE80] transition-all duration-300 shadow-[0_0_40px_rgba(34,197,94,0.3)] hover:shadow-[0_0_60px_rgba(34,197,94,0.5)] hover:scale-105"
              >
                Reservar con Seguridad
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </AnimatedSection>

          {/* Right: Safety cards */}
          <AnimatedSection delay={200}>
            <div className="space-y-4">
              {safetyFeatures.map((feature, i) => (
                <div
                  key={feature.title}
                  className="group p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/10 transition-all duration-300"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300"
                      style={{ backgroundColor: `${feature.color}12` }}
                    >
                      <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                      <p className="text-sm text-white/45 leading-relaxed">{feature.desc}</p>
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
   7. COST MODEL SECTION — Important Platform Disclaimer
   ═══════════════════════════════════════════════════════════════════════════════ */
function CostModelSection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-[#8B5CF6]/5 blur-[120px]" />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(139,92,246,0.3) 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF9800]/10 border border-[#FF9800]/20 mb-4">
              <AlertCircle className="w-4 h-4 text-[#FF9800]" />
              <span className="text-sm text-[#FF9800]">Información Importante</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Modelo de{' '}
              <span className="bg-gradient-to-r from-[#8B5CF6] to-[#FF9800] bg-clip-text text-transparent">
                Costo
              </span>
            </h2>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="relative p-8 md:p-10 rounded-2xl bg-white/[0.03] border border-[#FF9800]/15 backdrop-blur-sm">
            {/* Glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#FF9800]/[0.02] to-[#8B5CF6]/[0.02]" />

            <div className="relative z-10">
              {/* Platform disclaimer */}
              <div className="flex items-start gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-[#FF9800]/10 flex items-center justify-center shrink-0">
                  <Shield className="w-6 h-6 text-[#FF9800]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Ecotaxi es una Plataforma Tecnológica</h3>
                  <p className="text-white/55 leading-relaxed">
                    Es importante que sepas que Ecotaxi es una plataforma tecnológica que conecta a pasajeros
                    con conductores y agentes de transporte. No somos un proveedor directo de servicios de
                    aventura ni de turismo. Nuestro rol es facilitar el desplazamiento hacia los destinos
                    de aventura, garantizando la seguridad y calidad del transporte.
                  </p>
                </div>
              </div>

              {/* Cost explanation */}
              <div className="space-y-6 mb-8">
                <div className="p-5 rounded-xl bg-[#8B5CF6]/5 border border-[#8B5CF6]/10">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-5 h-5 text-[#8B5CF6]" />
                    <h4 className="text-sm font-bold text-[#8B5CF6] uppercase tracking-wider">Sobre el Costo del Transporte</h4>
                  </div>
                  <p className="text-sm text-white/55 leading-relaxed">
                    El costo que refleja la APP es solo el costo del desplazamiento. Los demás costos
                    dependen de la aventura y se coordinan directamente con el agente. Esto significa
                    que el precio que ves en la aplicación corresponde exclusivamente al transporte
                    desde tu punto de origen hasta el destino de aventura y el regreso. Cualquier
                    otro costo asociado a la actividad de aventura — como guías, entradas, equipos
                    o alimentación — se gestiona directamente con el agente de aventura.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#22C55E]/5 border border-[#22C55E]/10">
                  <div className="flex items-center gap-2 mb-3">
                    <CircleCheck className="w-5 h-5 text-[#22C55E]" />
                    <h4 className="text-sm font-bold text-[#22C55E] uppercase tracking-wider">Tarifa Transparente</h4>
                  </div>
                  <p className="text-sm text-white/55 leading-relaxed">
                    Puedes conocer la tarifa en línea antes de solicitar tu servicio. El costo puede
                    ser fijo, mínimo, por tiempo o por distancia, esto depende de cada agente. La
                    transparencia es fundamental para nosotros: antes de confirmar tu solicitud,
                    podrás ver el costo estimado del transporte y decidir si deseas proceder.
                    No hay sorpresas ni costos ocultos en el desplazamiento.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#0077BD]/5 border border-[#0077BD]/10">
                  <div className="flex items-center gap-2 mb-3">
                    <ShieldCheck className="w-5 h-5 text-[#0077BD]" />
                    <h4 className="text-sm font-bold text-[#0077BD] uppercase tracking-wider">Cobertura con Seguro</h4>
                  </div>
                  <p className="text-sm text-white/55 leading-relaxed">
                    Si tienes seguro que cubre este servicio dentro de Ecotaxi, se te notificará
                    que no tiene costo para ti. Nuestro sistema detecta automáticamente si tu póliza
                    de seguro incluye el servicio de transporte de aventura y te informa al momento
                    de la solicitud. Es nuestra forma de asegurarnos de que aproveches al máximo
                    los beneficios de tu cobertura.
                  </p>
                </div>
              </div>

              {/* Summary points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: CheckCircle2, text: 'Tarifa visible antes de solicitar', color: '#8B5CF6' },
                  { icon: CheckCircle2, text: 'Costo solo del desplazamiento', color: '#22C55E' },
                  { icon: CheckCircle2, text: 'Costos de aventura se coordinan con el agente', color: '#0077BD' },
                  { icon: CheckCircle2, text: 'Notificación automática si tu seguro cubre el servicio', color: '#FF9800' },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02]">
                    <item.icon className="w-5 h-5 shrink-0" style={{ color: item.color }} />
                    <span className="text-sm text-white/60">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   8. CONTACT / CTA SECTION
   ═══════════════════════════════════════════════════════════════════════════════ */
function ContactSection() {
  return (
    <section id="reservas" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[#8B5CF6]/8 blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 mb-4">
              <Phone className="w-4 h-4 text-[#8B5CF6]" />
              <span className="text-sm text-[#8B5CF6]">Reserva tu Aventura</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Tu próxima aventura{' '}
              <span className="bg-gradient-to-r from-[#8B5CF6] via-[#22C55E] to-[#8B5CF6] bg-clip-text text-transparent">
                comienza aquí
              </span>
            </h2>
            <p className="text-white/50 max-w-3xl mx-auto text-lg">
              Reserva tu transporte de aventura en línea, llámanos o escríbenos por WhatsApp.
              Estamos disponibles las 24 horas para ayudarte a planificar tu expedición por Bolivia.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {/* Contact cards */}
          <AnimatedSection className="lg:col-span-2">
            <div className="space-y-5">
              {/* Phone */}
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0077BD]/10 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-[#0077BD]" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Teléfono</h3>
                    <p className="text-white/50 text-sm">Disponible 24/7</p>
                  </div>
                </div>
                <a
                  href="tel:+59133296885"
                  className="text-[#0077BD] text-lg font-semibold hover:text-[#38BDF8] transition-colors"
                >
                  (+591) 3 3296885
                </a>
              </div>

              {/* WhatsApp */}
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-[#25D366]" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">WhatsApp</h3>
                    <p className="text-white/50 text-sm">Respuesta inmediata</p>
                  </div>
                </div>
                <a
                  href="https://wa.me/59133296885?text=Hola%2C%20necesito%20el%20servicio%20de%20aventura%20de%20Ecotaxi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#25D366] text-lg font-semibold hover:text-[#34D399] transition-colors"
                >
                  Enviar WhatsApp
                </a>
              </div>

              {/* Reservas link */}
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-[#8B5CF6]/15 backdrop-blur-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/10 flex items-center justify-center">
                    <Compass className="w-6 h-6 text-[#8B5CF6]" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Reserva en Línea</h3>
                    <p className="text-white/50 text-sm">Cotiza y reserva al instante</p>
                  </div>
                </div>
                <p className="text-sm text-white/50 leading-relaxed">
                  Reserva tu transporte de aventura directamente desde nuestra plataforma en línea.
                  Conoce la tarifa, elige tu vehículo y confirma tu expedición en minutos.
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Iframe / Reservas */}
          <AnimatedSection delay={200} className="lg:col-span-3">
            <div className="p-4 md:p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-[#22C55E] animate-pulse" />
                <span className="text-sm text-[#22C55E] font-medium">Reserva en tiempo real</span>
              </div>
              <div className="rounded-xl overflow-hidden border border-white/[0.06]" style={{ height: '520px' }}>
                <iframe
                  src="https://id3251.tm.taxi:58443/?cid=1"
                  title="Reservas Ecotaxi Aventura"
                  className="w-full h-full border-0"
                  allow="geolocation; payment"
                />
              </div>
              <p className="text-xs text-white/30 mt-3 text-center">
                Plataforma de reservas segura · Cotización instantánea · Pago en línea disponible
              </p>
            </div>
          </AnimatedSection>
        </div>

        {/* Bottom CTA */}
        <AnimatedSection delay={300}>
          <div className="mt-16 text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4">
              <a
                href="https://id3251.tm.taxi:58443/?cid=1"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full text-lg font-semibold text-black bg-[#22C55E] hover:bg-[#4ADE80] transition-all duration-300 shadow-[0_0_30px_rgba(34,197,94,0.3)] hover:shadow-[0_0_50px_rgba(34,197,94,0.5)] hover:scale-105 flex items-center gap-2"
              >
                Reservar Aventura
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/59173662803?text=Hola%2C%20necesito%20el%20servicio%20de%20aventura%20de%20Ecotaxi"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full text-lg font-semibold text-[#25D366] border border-[#25D366]/30 bg-[#25D366]/5 hover:bg-[#25D366]/10 hover:border-[#25D366]/50 transition-all duration-300 flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Aventura
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════════════════════ */
export default function AventuraPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0e17]">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <AdventureTypesSection />
        <HowItWorksSection />
        <DestinationsSection />
        <VehicleFleetSection />
        <SafetySection />
        <CostModelSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
