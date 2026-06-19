'use client'

import { useEffect, useState } from 'react'
import {
  FileText, Shield, CreditCard, Car, AlertTriangle, Gavel,
  Mail, Phone, MapPin, ArrowRight, CheckCircle2, Clock, Users, Ban
} from 'lucide-react'
import { Navbar } from '@/components/ecotaxi/navbar'
import { Footer } from '@/components/ecotaxi/footer'

const sections = [
  {
    id: 'aceptacion',
    icon: FileText,
    title: '1. Aceptación de los Términos',
    content: [
      'Los presentes Términos y Condiciones de Uso regulan el acceso y utilización de los servicios de transporte prestados por O&C Ingeniería y Representaciones SRL, identificada con NIT 1028737023 y marca comercial Ecotaxi (en adelante "Ecotaxi", "la Empresa", "nosotros" o "nuestro"), a través de su página web https://www.ecotaxi-bo.com, su aplicación móvil, sus canales de atención telefónica y cualquier otro canal de reserva o contacto habilitado oficialmente.',
      'Al solicitar, reservar, contratar o utilizar cualquiera de nuestros servicios, el usuario (en adelante "el Usuario", "el Pasajero" o "usted") manifiesta haber leído, comprendido y aceptado en su totalidad los presentes Términos y Condiciones, así como nuestra Política de Privacidad. Si no está de acuerdo con alguno de los términos aquí expuestos, deberá abstenerse de utilizar nuestros servicios.',
      'Ecotaxi se reserva el derecho de modificar en cualquier momento los presentes Términos y Condiciones. Las modificaciones entrarán en vigor desde su publicación en este sitio web. El uso continuado de los servicios después de dichas modificaciones implicará la aceptación tácita de los términos actualizados. Recomendamos al Usuario revisar periódicamente esta página.',
      'Estos Términos y Condiciones se aplican exclusivamente a la relación entre Ecotaxi y el Usuario. La contratación de servicios con terceros (hoteles, aerolíneas, agencias de viajes) se regirá por los términos propios de cada proveedor, sin que Ecotaxi asuma responsabilidad sobre dichas relaciones contractuales.',
    ],
  },
  {
    id: 'definiciones',
    icon: FileText,
    title: '2. Definiciones',
    content: [
      'Para los efectos de los presentes Términos y Condiciones, se entenderá por: "Servicios" al conjunto de prestaciones de transporte de pasajeros, traslados aeropuerto, servicios por hora, transporte ejecutivo VIP, transporte corporativo, transporte escolar, transporte de mascotas, traslados puerta a puerta, servicios interurbanos, logística y mensajería ofrecidos por Ecotaxi.',
      '"Plataforma" al conjunto de canales digitales y físicos a través de los cuales el Usuario puede solicitar y contratar los Servicios, incluyendo el sitio web, la aplicación móvil Ecotaxi, el WhatsApp oficial, las líneas telefónicas de atención y los puntos físicos de servicio.',
      '"Conductor" a la persona natural debidamente capacitada, identificada y autorizada por Ecotaxi para prestar el servicio de transporte al Usuario. "Vehículo" a la unidad automotriz asignada por Ecotaxi para la prestación del servicio, ya sea Sedan, SUV, Van, microbús u otro tipo de unidad disponible.',
      '"Reserva" a la solicitud previa y formal del Usuario para la prestación de un Servicio en fecha, hora, lugar y condiciones determinadas. "Tarifa" al precio acordado por la prestación del Servicio, expresado en bolivianos (Bs) u otra moneda que se indique al momento de la reserva.',
    ],
  },
  {
    id: 'servicios',
    icon: Car,
    title: '3. Descripción de los Servicios',
    content: [
      'Ecotaxi ofrece servicios de transporte de pasajeros en modalidades que incluyen: servicio puerta a puerta, servicio por hora con vehículo a disposición, traslado aeropuerto con seguimiento de vuelo, transporte ejecutivo VIP con vehículos premium, transporte corporativo para empresas, transporte escolar con protocolos de seguridad infantil, transporte de mascotas con jaulas certificadas, servicios interurbanos entre ciudades de Bolivia, y servicios especializados de mensajería y logística.',
      'Cada servicio tiene características específicas de tarifa, cobertura geográfica, tipo de vehículo, anticipación de reserva y protocolos operativos que se detallan al momento de la solicitud. Las tarifas pueden variar según la demanda, hora del día, festivos, condiciones climáticas, días feriados y eventos especiales en la ciudad.',
      'La cobertura geográfica de los servicios abarca las principales ciudades de Bolivia: Santa Cruz de la Sierra, La Paz, Cochabamba, Tarija, Sucre, Oruro, Potosí, Trinidad y Cobija, así como rutas interurbanas entre estas y otras ciudades del territorio nacional. La disponibilidad específica por ciudad y zona será confirmada al momento de la reserva.',
      'Ecotaxi se reserva el derecho de reasignar vehículos, ajustar tiempos de espera, modificar rutas por causas de fuerza mayor (tráfico, cierre de vías, condiciones climáticas) y ofrecer alternativas equivalentes o superiores al servicio reservado sin costo adicional para el Usuario. En caso de no poder prestar el servicio, se procederá al reembolso según lo establecido en la sección correspondiente.',
      'Algunos servicios especializados pueden requerir documentación adicional, aceptación de protocolos específicos (transporte de mascotas, transporte escolar, traslados médicos) y cumplimiento de normativas particulares que serán comunicadas al Usuario previamente a la confirmación de la reserva.',
    ],
  },
  {
    id: 'reservas',
    icon: Clock,
    title: '4. Reservas y Confirmación',
    content: [
      'Las reservas pueden realizarse a través de los canales oficiales: sitio web, aplicación móvil Ecotaxi, WhatsApp oficial, línea telefónica de atención al cliente y puntos físicos autorizados. Toda reserva queda sujeta a disponibilidad de vehículos y conductores en el momento solicitado.',
      'Para confirmar una reserva, el Usuario debe proporcionar: nombre completo del pasajero o contacto, número de teléfono válido (preferentemente WhatsApp), dirección exacta de recogida, destino detallado, fecha y hora del servicio, número de vuelo (en traslados aeropuerto), cantidad de pasajeros, equipaje estimado y cualquier requerimiento especial (silla de bebé, accesibilidad, idioma del conductor, etc.).',
      'La reserva se considera confirmada cuando el Usuario recibe el mensaje de confirmación oficial por WhatsApp, SMS o correo electrónico con el número de reserva, datos del conductor asignado (nombre, foto, placa del vehículo) y detalles operativos. Hasta ese momento, la solicitud se encuentra en proceso de asignación.',
      'Para traslados aeropuerto, se incluye el servicio de seguimiento de vuelo en tiempo real sin costo adicional. El Usuario debe proporcionar el número de vuelo completo (aerolínea + código) y la hora programada de llegada. En caso de retrasos del vuelo, ajustamos automáticamente la hora de recogida sin cargo adicional, siempre que el vuelo llegue el mismo día calendario.',
      'Recomendamos realizar reservas con al menos 2 horas de anticipación para servicios urbanos y 24 horas para servicios interurbanos, aeropuerto o programas corporativos. Las reservas urgentes (menos de 1 hora) quedan sujetas a disponibilidad y pueden tener recargos operativos.',
    ],
  },
  {
    id: 'tarifas-pagos',
    icon: CreditCard,
    title: '5. Tarifas y Formas de Pago',
    content: [
      'Las tarifas de los servicios se calculan según: la modalidad contratada (puerta a puerta, por hora, aeropuerto, ejecutivo), la distancia recorrida, el tiempo de servicio, el tipo de vehículo asignado, la zona geográfica y eventuales recargos por horario nocturno, días feriados, espera adicional o servicios especiales.',
      'Las tarifas son expresadas en bolivianos (Bs) y se comunican al Usuario al momento de la solicitud. En el sistema de reserva online para clientes en el extranjero, las tarifas pueden mostrarse en dólares estadounidenses (USD) o euros (EUR) con conversión aplicada al tipo de cambio vigente, procesándose el pago en la moneda seleccionada por el Usuario.',
      'Formas de pago aceptadas: efectivo en bolivianos (Bs) al conductor al finalizar el servicio, transferencia bancaria o QR a la cuenta de O&C Ingeniería y Representaciones SRL, pago con tarjeta de crédito/débito a través del sistema de reserva online (Visa, Mastercard, American Express), y créditos corporativos para empresas con convenio vigente.',
      'Para servicios por hora, el cobro se realiza por hora completa o fracción superior a 15 minutos. Para servicios de traslado aeropuerto y puerta a puerta, la tarifa es fija según zona de destino y se comunica al momento de la reserva. Los peajes, parqueos y tarifas aeroportuarias están incluidos en la tarifa de traslado aeropuerto, salvo que se indique lo contrario.',
      'Las propinas al conductor son voluntarias y no están incluidas en la tarifa. Ecotaxi no exige ni cobra propinas automáticamente. Cualquier monto entregado directamente al conductor por concepto de propina es decisión exclusiva del Usuario.',
      'Las tarifas pueden ser modificadas con previo aviso de al menos 7 días calendario mediante publicación en el sitio web. Las reservas ya confirmadas mantendrán la tarifa pactada al momento de la confirmación, independientemente de cambios posteriores.',
    ],
  },
  {
    id: 'cancelaciones',
    icon: Ban,
    title: '6. Cancelaciones y Reembolsos',
    content: [
      'El Usuario puede cancelar una reserva sin cargo con al menos 2 horas de anticipación a la hora programada del servicio urbano, y con al menos 12 horas de anticipación para servicios de aeropuerto, interurbanos o servicios por hora de duración prolongada.',
      'Cancelaciones con menos de 2 horas de anticipación para servicios urbanos tendrán un cargo del 50% de la tarifa. Cancelaciones con menos de 12 horas para servicios de aeropuerto o interurbanos tendrán un cargo del 100% de la tarifa, dado que los recursos (vehículo, conductor, tiempo) ya fueron asignados y difícilmente pueden ser reubicados.',
      'En caso de "no show" (el Usuario no se presenta al lugar de recogida en la hora acordada), se cobrará el 100% de la tarifa. Para traslados aeropuerto, el conductor espera hasta 90 minutos posteriores a la hora real de aterrizaje del vuelo sin cargo adicional. Vencido ese plazo sin contacto con el pasajero, se considera "no show".',
      'Los reembolsos por cancelaciones elegibles se procesan en un plazo máximo de 7 días hábiles para pagos con tarjeta de crédito/débito y hasta 15 días hábiles para transferencias bancarias, utilizando el mismo medio de pago empleado en la reserva original. No se realizan reembolsos en efectivo al conductor.',
      'Ecotaxi se reserva el derecho de cancelar una reserva por causas de fuerza mayor: condiciones climáticas extremas, bloqueos de vías, conflictos sociales, fallas mecánicas no subsanables, indisponibilidad de conductores por enfermedad u otras causas operativas. En estos casos, se ofrece al Usuario: reasignación con vehículo alternativo equivalente, reprogramación sin costo, o reembolso completo del monto pagado.',
      'Para solicitar una cancelación o reembolso, el Usuario debe contactar inmediatamente al canal oficial (WhatsApp o teléfono) con su número de reserva. Las cancelaciones no se aceptan por canales informales o a través de terceros no autorizados.',
    ],
  },
  {
    id: 'obligaciones-usuario',
    icon: Users,
    title: '7. Obligaciones del Usuario',
    content: [
      'El Usuario se compromete a proporcionar información veraz, completa y actualizada al momento de registrarse y reservar servicios. La información falsa, incompleta o desactualizada puede causar cancelaciones, retrasos o negación del servicio sin derecho a reembolso.',
      'El Usuario debe estar presente en el lugar de recogida acordado a la hora programada. Para servicios puerta a puerta, el conductor espera hasta 10 minutos sin cargo; posteriormente, se aplican cargos por espera según tarifa vigente. Para traslados aeropuerto, el tiempo de espera gratuito es de 90 minutos posteriores al aterrizaje real del vuelo.',
      'El Usuario se compromete a tratar al conductor y al vehículo con respeto. Está prohibido: fumar dentro del vehículo, consumir alimentos que dejen residuos, transportar sustancias ilícitas, armas de fuego sin autorización legal, objetos contaminantes o que dañen el vehículo, y comportarse de manera agresiva o peligrosa durante el viaje.',
      'El Usuario es responsable por daños causados al vehículo, sus accesorios o al conductor por acciones negligentes o deliberadas suyas o de sus acompañantes. Los daños serán evaluados y cobrados al Usuario según el costo real de reparación, pudiendo Ecotaxi retener el vehículo hasta el pago correspondiente.',
      'Para servicios de transporte de mascotas, el Usuario debe informar previamente el tipo, tamaño y cantidad de animales. Las mascotas deben viajar en jaulas certificadas (salvo acuerdo previo) y el Usuario es responsable de cualquier daño o limpieza requerida. Para transporte escolar, el Usuario (padre/tutor) debe cumplir los protocolos de entrega y recepción del menor.',
      'El Usuario acepta no utilizar los servicios para fines ilícitos, contrarios a la moral, al orden público o a las disposiciones legales vigentes en Bolivia. La violación de esta cláusula facultará a Ecotaxi para cancelar el servicio de inmediato, sin perjuicio de las acciones legales correspondientes.',
    ],
  },
  {
    id: 'responsabilidad',
    icon: Shield,
    title: '8. Responsabilidad de Ecotaxi',
    content: [
      'Ecotaxi se compromete a prestar los servicios contratados con diligencia, puntualidad y apego a los estándares de calidad y seguridad establecidos. Mantenemos una póliza de seguro de responsabilidad civil que cubre daños a pasajeros y terceros durante la prestación del servicio, conforme a la normativa boliviana vigente.',
      'La responsabilidad de Ecotaxi se limita al monto efectivamente pagado por el Usuario por el servicio específico que originó el reclamo. En ningún caso Ecotaxi será responsable por daños indirectos, lucro cesante, pérdida de oportunidades comerciales, daños morales no directamente imputables a negligencia comprobada, o consecuencias derivadas de eventos fuera de control razonable.',
      'Ecotaxi no asume responsabilidad por retrasos o incumplimientos derivados de causas de fuerza mayor: fenómenos naturales (inundaciones, terremotos, tormentas), conflictos sociales (bloqueos, paros, manifestaciones), decisiones gubernamentales (toques de queda, restricciones de circulación), fallas técnicas en sistemas de terceros (GPS, telecomunicaciones, plataformas de pago), o cualquier evento imprevisible e inevitable.',
      'Para traslados aeropuerto, Ecotaxi no se responsabiliza por la pérdida de vuelos cuando el retraso sea imputable a causas de fuerza mayor o a información incorrecta proporcionada por el Usuario (dirección errónea, hora de vuelo incorrecta, demora en la presentación del pasajero). Recomendamos programar la recogida con al menos 3 horas de anticipación a la hora del vuelo.',
      'Ecotaxi no asume responsabilidad por objetos olvidados en los vehículos. Sin embargo, mantenemos un protocolo de objetos perdidos: los conductores revisan el vehículo al finalizar cada servicio y entregan cualquier objeto encontrado a la central. Los objetos se conservan por 30 días y pueden ser reclamados contactándonos con el número de reserva.',
    ],
  },
  {
    id: 'conducta',
    icon: AlertTriangle,
    title: '9. Conducta Prohibida y Sanciones',
    content: [
      'Está estrictamente prohibido al Usuario: agredir física o verbalmente al conductor, solicitar servicios para fines ilícitos, transportar sustancias controladas sin autorización legal, portar armas sin permiso vigente, realizar actos inmorales dentro del vehículo, intentar sobornar al conductor para evadir tarifas, y falsificar información de identidad o de reserva.',
      'Asimismo, está prohibido: intentar manipular el sistema de reservas para obtener tarifas indebidas, realizar reservas falsas con intención de perjudicar la operación, divulgar información personal de conductores, y utilizar la plataforma para fines comerciales no autorizados por Ecotaxi.',
      'La violación de estas prohibiciones facultará a Ecotaxi para: cancelar el servicio de inmediato sin derecho a reembolso, suspender temporalmente la cuenta del Usuario, dar de baja definitiva la cuenta en caso de reincidencia o gravedad, y presentar denuncias penales o civiles según corresponda.',
      'Ecotaxi mantiene un registro de incidentes con cada Usuario. Las suspensiones temporales pueden ser de 7 a 30 días según la gravedad. Las bajas definitivas se aplican en casos de: violencia física o verbal grave, fraude comprobado, transporte de sustancias ilícitas, o cualquier conducta que ponga en riesgo la seguridad de conductores, otros pasajeros o la operación.',
    ],
  },
  {
    id: 'propiedad-intelectual',
    icon: FileText,
    title: '10. Propiedad Intelectual',
    content: [
      'Todos los contenidos del sitio web y aplicación móvil Ecotaxi, incluyendo pero no limitado a: logotipos, diseños, textos, imágenes, fotografías, íconos, código fuente, software, base de datos, nombres comerciales, marcas registradas y cualquier otro elemento susceptible de protección, son propiedad exclusiva de O&C Ingeniería y Representaciones SRL o de sus licenciantes.',
      'El Usuario reconoce que no adquiere ningún derecho de propiedad intelectual sobre los contenidos por el hecho de utilizar los servicios. Queda prohibida la reproducción, distribución, modificación, comunicación pública, transformación o cualquier otro uso de los contenidos sin autorización expresa y por escrito de Ecotaxi.',
      'Las marcas "Ecotaxi", "Eco Taxi", "Ecotaxi Bolivia", los logotipos asociados, los eslóganes comerciales y los elementos distintivos de la marca están protegidos por las leyes bolivianas e internacionales de propiedad intelectual. Cualquier uso no autorizado será perseguido conforme a la ley.',
      'El Usuario no puede utilizar meta-tags, códigos ocultos, o cualquier otra técnica que incluya las marcas de Ecotaxi en sitios web de terceros sin autorización previa. Asimismo, no puede registrar dominios, perfiles en redes sociales, o cuentas en plataformas digitales que contengan las marcas Ecotaxi sin autorización expresa.',
    ],
  },
  {
    id: 'privacidad-datos',
    icon: Shield,
    title: '11. Privacidad y Protección de Datos',
    content: [
      'El tratamiento de datos personales del Usuario se realiza conforme a nuestra Política de Privacidad, disponible en https://www.ecotaxi-bo.com/politica-de-privacidad, la cual forma parte integral de los presentes Términos y Condiciones. Al aceptar estos términos, el Usuario acepta igualmente la Política de Privacidad.',
      'Ecotaxi se compromete a utilizar los datos personales únicamente para los fines descritos en la Política de Privacidad: prestación de servicios, comunicación operativa, facturación, mejora continua y cumplimiento legal. Los datos no serán comercializados con terceros ni utilizados para fines distintos sin consentimiento expreso del Usuario.',
      'El Usuario puede ejercer en cualquier momento sus derechos de acceso, rectificación, cancelación y oposición (derechos ARCO) contactando a ecotaxi@oyc-srl.com. Atenderemos las solicitudes en los plazos legalmente establecidos por la normativa boliviana.',
    ],
  },
  {
    id: 'legislacion',
    icon: Gavel,
    title: '12. Legislación Aplicable y Jurisdicción',
    content: [
      'Los presentes Términos y Condiciones se rigen por las leyes del Estado Plurinacional de Bolivia, en particular por el Código Civil, el Código de Comercio, la Ley N° 1581 de Protección de Datos Personales, la Ley General de Transportes, y las normativas departamentales y municipales aplicables a la actividad de transporte de pasajeros.',
      'Cualquier controversia derivada de la interpretación o ejecución de estos Términos y Condiciones será resuelta prioritariamente mediante negociación amistosa entre las partes. En caso de no llegarse a acuerdo en un plazo de 30 días, las partes se someten a la jurisdicción de los jueces y tribunales ordinarios de la ciudad de Santa Cruz de la Sierra, Bolivia, renunciando expresamente a cualquier otro fuero que pudiera corresponderles.',
      'Para reclamaciones relacionadas con la calidad del servicio, el Usuario puede acudir a: el canal de atención al cliente de Ecotaxi (WhatsApp, teléfono, correo electrónico), la Autoridad de Fiscalización y Control Social de Telecomunicaciones y Transportes (ATT) en temas de su competencia, o la Defensoría del Pueblo en casos de vulneración de derechos del consumidor.',
      'Ecotaxi mantiene un Libro de Reclamaciones físico en sus oficinas centrales y un formulario digital en su sitio web. Toda reclamación será atendida en un plazo máximo de 30 días calendario, conforme a la normativa boliviana de protección al consumidor.',
    ],
  },
  {
    id: 'contacto',
    icon: Mail,
    title: '13. Contacto y Consultas',
    content: [
      'Para cualquier consulta, sugerencia, reclamo o solicitud relacionada con los presentes Términos y Condiciones, los servicios de Ecotaxi, o la operación general de la Empresa, el Usuario puede contactarnos a través de los siguientes canales oficiales:',
      'Correo electrónico: ecotaxi@oyc-srl.com — Atendemos consultas en un plazo máximo de 24 horas hábiles. Para reclamos formales, incluya en el asunto "Reclamo Formal" y proporcione su número de reserva, fecha del servicio y descripción detallada del incidente.',
      'Teléfono / WhatsApp: (+591) 3 3296885 — Horario de atención: lunes a viernes de 08:00 a 18:00, sábados de 08:00 a 13:00. Para emergencias operativas en curso (servicio activo), disponemos de atención 24/7 a través del mismo canal.',
      'Dirección postal y atención presencial: O&C Ingeniería y Representaciones SRL — Santa Cruz de la Sierra, Bolivia. Para visitas presenciales, coordine previamente una cita por los canales indicados. Las solicitudes formales por escrito pueden entregarse en sobre cerrado dirigido al área legal.',
      'Canales digitales: sitio web https://www.ecotaxi-bo.com, aplicación móvil Ecotaxi disponible en Google Play y App Store, perfiles oficiales en Facebook (facebook.com/ecotaxibolivia), Instagram (instagram.com/ecotaxibo), y LinkedIn (linkedin.com/company/ecotaxibolivia).',
    ],
  },
]

export default function TerminosCondicionesPage() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [activeSection, setActiveSection] = useState<string>('aceptacion')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set(prev).add(entry.target.id))
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.2, rootMargin: '-100px 0px -50% 0px' }
    )
    sections.forEach(s => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0e17]">
      <Navbar />
      <main className="flex-1 pt-20">

        {/* Hero */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
          <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-[#FF9800]/10 blur-[100px]" />
          <div className="absolute bottom-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-[#00E676]/10 blur-[100px]" />
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF9800]/10 border border-[#FF9800]/20 mb-6">
              <Gavel className="w-4 h-4 text-[#FF9800]" />
              <span className="text-sm text-[#FF9800]">Marco Legal del Servicio</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Términos y{' '}
              <span className="bg-gradient-to-r from-[#FF9800] via-[#00E676] to-[#0077BD] bg-clip-text text-transparent">
                Condiciones
              </span>
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto mb-8 leading-relaxed">
              Conozca las reglas que rigen la contratación y prestación de los servicios de transporte de Ecotaxi en Bolivia. Al utilizar nuestros servicios, usted acepta estos términos.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-white/40">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00E676]" />
                <span>Última actualización: Junio 2026</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00E676]" />
                <span>Legislación Boliviana</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00E676]" />
                <span>13 secciones · Lectura ~15 min</span>
              </div>
            </div>
          </div>
        </section>

        {/* Content with sidebar */}
        <section className="relative pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sticky sidebar */}
              <aside className="lg:col-span-1">
                <div className="lg:sticky lg:top-24">
                  <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/[0.06]">
                    <h3 className="text-sm uppercase tracking-wider text-white/40 font-semibold mb-4">Contenido</h3>
                    <nav className="space-y-1 max-h-[60vh] overflow-y-auto pr-1">
                      {sections.map(s => (
                        <a
                          key={s.id}
                          href={`#${s.id}`}
                          className={`block px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                            activeSection === s.id
                              ? 'bg-[#00E676]/10 text-[#00E676] border-l-2 border-[#00E676]'
                              : 'text-white/40 hover:text-white/70 hover:bg-white/[0.03] border-l-2 border-transparent'
                          }`}
                        >
                          {s.title}
                        </a>
                      ))}
                    </nav>
                  </div>

                  {/* Quick contact */}
                  <div className="mt-6 p-6 rounded-3xl bg-gradient-to-br from-[#FF9800]/5 to-[#00E676]/5 border border-[#00E676]/10">
                    <div className="flex items-center gap-2 mb-3">
                      <Mail className="w-4 h-4 text-[#00E676]" />
                      <span className="text-sm font-semibold text-white">¿Dudas legales?</span>
                    </div>
                    <p className="text-xs text-white/50 mb-4">Para consultas sobre estos términos o para presentar un reclamo formal, contáctenos a través de los canales oficiales.</p>
                    <a href="mailto:ecotaxi@oyc-srl.com" className="inline-flex items-center gap-2 text-xs text-[#00E676] hover:text-[#00ff88] transition-colors">
                      ecotaxi@oyc-srl.com
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </aside>

              {/* Main content */}
              <div className="lg:col-span-3 space-y-12">
                {sections.map((section, i) => {
                  const Icon = section.icon
                  const isVisible = visibleSections.has(section.id)
                  return (
                    <div
                      key={section.id}
                      id={section.id}
                      className={`scroll-mt-24 transition-all duration-700 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                      }`}
                      style={{ transitionDelay: isVisible ? `${Math.min(i * 50, 200)}ms` : '0ms' }}
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-11 h-11 rounded-2xl bg-[#00E676]/10 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-[#00E676]" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white">{section.title}</h2>
                      </div>
                      <div className="space-y-4 pl-1">
                        {section.content.map((para, idx) => (
                          <p key={idx} className="text-white/60 leading-relaxed text-[15px]">{para}</p>
                        ))}
                      </div>
                    </div>
                  )
                })}

                {/* Contact card */}
                <div className="p-8 rounded-3xl bg-gradient-to-br from-[#0077BD]/10 to-[#00E676]/10 border border-[#00E676]/20">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Phone className="w-5 h-5 text-[#00E676]" />
                    Datos de Contacto — Atención al Usuario
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-[#0077BD] mt-0.5" />
                      <div>
                        <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Correo electrónico</p>
                        <a href="mailto:ecotaxi@oyc-srl.com" className="text-sm text-white hover:text-[#00E676] transition-colors">ecotaxi@oyc-srl.com</a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-[#0077BD] mt-0.5" />
                      <div>
                        <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Teléfono</p>
                        <p className="text-sm text-white">(+591) 3 3296885</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-[#0077BD] mt-0.5" />
                      <div>
                        <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Dirección</p>
                        <p className="text-sm text-white">Santa Cruz de la Sierra, Bolivia</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-[#0077BD] mt-0.5" />
                      <div>
                        <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Razón Social</p>
                        <p className="text-sm text-white">O&C Ingeniería y Representaciones SRL</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
