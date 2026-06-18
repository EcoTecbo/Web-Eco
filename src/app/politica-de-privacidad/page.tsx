'use client'

import { useEffect, useState } from 'react'
import { Shield, Lock, Eye, FileText, Mail, Phone, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react'
import { Navbar } from '@/components/ecotaxi/navbar'
import { Footer } from '@/components/ecotaxi/footer'

const sections = [
  {
    id: 'introduccion',
    icon: FileText,
    title: '1. Introducción',
    content: [
      'La presente Política de Privacidad describe cómo O&C Ingeniería y Representaciones SRL, identificada con NIT 1028737023 y marca comercial Ecotaxi (en adelante "Ecotaxi", "nosotros" o "nuestro"), recopila, utiliza, protege y divulga la información personal de los usuarios que utilizan nuestros servicios de transporte, nuestra página web https://www.ecotaxi-bo.com, nuestra aplicación móvil y nuestros canales digitales de atención.',
      'Ecotaxi es una empresa boliviana comprometida con la protección de datos personales y el cumplimiento de la Ley N° 1581 de Protección de Datos Personales del Estado Plurinacional de Bolivia, así como de las mejores prácticas internacionales en materia de privacidad. Al utilizar nuestros servicios, usted acepta las prácticas descritas en esta política.',
      'Esta política aplica exclusivamente a la información recopilada a través de nuestros canales digitales y operativos. No aplica a sitios web de terceros que puedan ser enlazados desde nuestro sitio, sobre los cuales no tenemos control y recomendamos revisar sus propias políticas de privacidad.',
    ],
  },
  {
    id: 'datos-recopilados',
    icon: Eye,
    title: '2. Información que Recopilamos',
    content: [
      'Recopilamos información necesaria para proporcionar nuestros servicios de transporte de manera segura y eficiente. Esto incluye datos que usted nos proporciona directamente al registrarse o reservar un servicio, así como información recopilada automáticamente cuando utiliza nuestra plataforma.',
      'Información de registro y reservas: nombre completo, número de teléfono, correo electrónico, dirección de recogida y destino, número de vuelo (en traslados aeropuerto), preferencias de vehículo y notas especiales del servicio solicitado.',
      'Información de pago: cuando realiza pagos con tarjeta de crédito o débito a través de nuestro sistema de reserva online, los datos son procesados de forma segura por nuestros proveedores de pagos certificados (PCI-DSS). Ecotaxi no almacena los números completos de tarjetas en sus servidores.',
      'Información de uso y dispositivo: dirección IP, tipo de navegador, sistema operativo, páginas visitadas, tiempo de permanencia, datos de ubicación GPS (solo cuando activamente solicita un servicio), y identificadores de dispositivo necesarios para la prestación del servicio.',
      'Información operativa del servicio: grabaciones de llamadas telefónicas con fines de calidad y seguridad (con aviso previo), registros de viajes realizados con conductor asignado, tiempos de espera, calificaciones del servicio y comentarios del usuario.',
    ],
  },
  {
    id: 'uso-informacion',
    icon: ArrowRight,
    title: '3. Uso de la Información',
    content: [
      'Utilizamos su información personal con los siguientes propósitos principales: prestar el servicio de transporte solicitado, asignar el conductor más cercano a su ubicación, calcular tarifas exactas según distancia y tiempo, y enviar confirmaciones de reserva por WhatsApp, SMS o correo electrónico.',
      'Mantenemos comunicación con usted sobre el estado de su servicio, enviamos notificaciones sobre el conductor asignado, tiempo estimado de llegada y cualquier eventualidad que pueda afectar su reserva. También utilizamos su información para verificar identidad, prevenir fraude y garantizar la seguridad de nuestros usuarios y conductores.',
      'Con su consentimiento explícito, utilizamos su información para enviar promociones, descuentos especiales, novedades del servicio y comunicaciones comerciales. Usted puede cancelar estas comunicaciones en cualquier momento siguiendo las instrucciones incluidas en cada mensaje o contactándonos directamente.',
      'Para fines estadísticos y de mejora continua, analizamos patrones de uso agregados y anónimos que nos permiten optimizar rutas, ampliar cobertura, mejorar tiempos de respuesta y desarrollar nuevos servicios. Esta información agregada no identifica personalmente al usuario.',
      'También utilizamos su información para cumplir con obligaciones legales, atender requerimientos de autoridades competentes, resolver disputas, hacer cumplir nuestros términos y condiciones, y proteger los derechos, propiedad o seguridad de Ecotaxi, nuestros usuarios y terceros.',
    ],
  },
  {
    id: 'base-legal',
    icon: Shield,
    title: '4. Base Legal del Tratamiento',
    content: [
      'El tratamiento de sus datos personales se realiza sobre las siguientes bases legales: su consentimiento explícito al registrarse y aceptar esta política, la ejecución de un contrato de prestación de servicios de transporte solicitado por usted, y el cumplimiento de obligaciones legales aplicables a nuestra actividad.',
      'Para el tratamiento de datos personales sensibles como ubicación GPS, información de pago o grabaciones de llamadas, solicitamos su consentimiento específico, el cual puede ser retirado en cualquier momento sin afectar la legalidad del tratamiento previo a dicha retirada.',
      'Ecotaxi no realiza transferencias internacionales de datos personales a países que no garanticen un nivel adecuado de protección, salvo cuando sea estrictamente necesario para la prestación del servicio (por ejemplo, procesamiento de pagos internacionales) y bajo las salvaguardas legales correspondientes.',
    ],
  },
  {
    id: 'comparticion',
    icon: Lock,
    title: '5. Compartición de Información',
    content: [
      'Ecotaxi no vende, alquila ni comercializa sus datos personales con terceros. Compartimos su información únicamente en los siguientes casos: con conductores asignados a su servicio (datos necesarios para la prestación: nombre, dirección, teléfono), con proveedores de servicios de pago certificados, y con proveedores de infraestructura tecnológica bajo acuerdos de confidencialidad.',
      'Podemos compartir información agregada y anónima con socios comerciales, instituciones académicas o entidades gubernamentales para fines estadísticos, de investigación o de cumplimiento normativo, siempre que dicha información no permita identificarle personalmente.',
      'En caso de requerimientos legales válidos por parte de autoridades competentes, órdenes judiciales, o cuando sea necesario para proteger los derechos, la propiedad o la seguridad de Ecotaxi, nuestros usuarios o el público en general, podremos divulgar información personal en la medida que la ley lo permita.',
      'En caso de reorganización corporativa, fusión, adquisición o venta de activos, la información personal podrá ser transferida a la entidad resultante, manteniendo los mismos niveles de protección descritos en esta política y notificándole previamente de cualquier cambio relevante.',
    ],
  },
  {
    id: 'seguridad',
    icon: Lock,
    title: '6. Medidas de Seguridad',
    content: [
      'Implementamos medidas técnicas, administrativas y organizativas apropiadas para proteger su información personal contra acceso no autorizado, alteración, divulgación o destrucción. Estas medidas incluyen cifrado TLS/SSL en transmisiones, almacenamiento cifrado de contraseñas, firewalls, sistemas de detección de intrusos y controles de acceso basados en roles.',
      'Nuestros proveedores de servicios de pago cumplen con el estándar PCI-DSS (Payment Card Industry Data Security Standard), garantizando que los datos de tarjetas sean procesados y almacenados bajo los más altos estándares de seguridad de la industria.',
      'Limitamos el acceso a información personal a empleados, contratistas y proveedores que necesiten conocer dicha información para realizar sus funciones, sujetos a acuerdos de confidencialidad y obligaciones de protección de datos.',
      'Mantenemos registros de auditoría de accesos a sistemas con información personal y realizamos revisiones periódicas de seguridad. En caso de una brecha de seguridad que afecte significativamente sus datos, le notificaremos conforme a las exigencias legales aplicables.',
      'A pesar de nuestras medidas de seguridad, ningún sistema es completamente seguro. Le recomendamos mantener contraseñas robustas, no compartir credenciales de acceso y notificarnos inmediatamente sobre cualquier actividad sospechosa relacionada con su cuenta.',
    ],
  },
  {
    id: 'derechos',
    icon: CheckCircle2,
    title: '7. Sus Derechos como Titular',
    content: [
      'Como titular de datos personales, usted tiene los siguientes derechos conforme a la legislación boliviana aplicable: acceso a sus datos personales en nuestro poder, rectificación de datos inexactos o incompletos, cancelación de datos cuando ya no sean necesarios para los fines recogidos, y oposición al tratamiento de sus datos por motivos legítimos.',
      'Puede ejercer estos derechos enviando una solicitud por escrito a nuestro correo electrónico de protección de datos (ecotaxi@oyc-srl.com) o mediante carta dirigida a nuestras oficinas principales. La solicitud debe incluir: nombre completo, identificación, datos de contacto, descripción clara del derecho que desea ejercer y cualquier información adicional que facilite la localización de sus datos.',
      'Atenderemos su solicitud en un plazo máximo de 15 días hábiles desde la recepción, comunicándole la decisión adoptada y, en caso de proceder, las acciones realizadas. Si su solicitud es denegada, le informaremos los motivos y los recursos disponibles.',
      'Puede retirar su consentimiento para el tratamiento de sus datos en cualquier momento, sin que ello afecte a la legalidad del tratamiento efectuado con anterioridad. La retirada del consentimiento implicará el cese de las actividades de tratamiento correspondientes, salvo obligación legal de conservación.',
    ],
  },
  {
    id: 'cookies',
    icon: Eye,
    title: '8. Cookies y Tecnologías Similares',
    content: [
      'Nuestro sitio web utiliza cookies y tecnologías similares para mejorar la experiencia de usuario, recordar preferencias, analizar el tráfico del sitio y personalizar contenido. Las cookies son pequeños archivos de texto almacenados en su dispositivo cuando visita nuestro sitio.',
      'Utilizamos cookies técnicas esenciales para el funcionamiento del sitio (sesión, seguridad, recordatorio de preferencias), cookies analíticas para entender cómo se utiliza el sitio y mejorar nuestros servicios, y cookies de marketing (con su consentimiento) para mostrarle publicidad relevante.',
      'Puede configurar su navegador para aceptar, bloquear o eliminar cookies. La desactivación de cookies técnicas puede afectar el funcionamiento del sitio. Las cookies de marketing solo se activan con su consentimiento explícito, el cual puede retirar en cualquier momento.',
      'Integramos servicios de terceros como Google Analytics, Facebook Pixel y otros proveedores que pueden instalar cookies en su dispositivo. Estos terceros tienen sus propias políticas de privacidad que le recomendamos revisar.',
    ],
  },
  {
    id: 'conservacion',
    icon: FileText,
    title: '9. Conservación de Datos',
    content: [
      'Conservamos su información personal únicamente durante el tiempo necesario para cumplir con los fines para los que fue recopilada, incluyendo el cumplimiento de obligaciones legales, contables, fiscales o de reporte.',
      'Los registros de viajes se conservan durante 5 años para fines de facturación, auditoría, atención de reclamos y cumplimiento de obligaciones tributarias conforme a la normativa boliviana. Los datos de pago se conservan según lo exigido por las normas financieras aplicables.',
      'Una vez cumplido el plazo de conservación, sus datos serán eliminados de forma segura o anonimizados de manera que no puedan ser asociados a su identidad. La anonimización irreversible permite utilizar información estadística sin comprometer su privacidad.',
    ],
  },
  {
    id: 'menores',
    icon: Shield,
    title: '10. Privacidad de Menores',
    content: [
      'Nuestros servicios no están dirigidos a menores de 18 años sin la supervisión de un padre, madre o tutor legal. No recopilamos conscientemente información personal de menores de edad sin el consentimiento verificable de sus representantes legales.',
      'Si detectamos que un menor nos ha proporcionado información personal sin consentimiento paterno/materno, procederemos a eliminar dicha información de nuestros servidores. Si usted es padre, madre o tutor y detecta que su hijo nos ha proporcionado información, contáctenos para proceder a su eliminación.',
      'Para servicios de transporte escolar contratados por instituciones educativas o representantes legales, aplicamos protocolos especiales de protección de datos del menor, incluyendo limitaciones en el acceso a información y comunicación exclusiva con los responsables legales.',
    ],
  },
  {
    id: 'cambios',
    icon: FileText,
    title: '11. Cambios en esta Política',
    content: [
      'Esta política de privacidad puede ser actualizada periódicamente para reflejar cambios en nuestras prácticas de manejo de información, nuevos servicios, requisitos legales o mejoras en nuestras medidas de seguridad. Le notificaremos sobre cambios significativos mediante un aviso destacado en nuestro sitio web o por correo electrónico.',
      'Le recomendamos revisar esta página regularmente para mantenerse informado sobre cualquier actualización. La fecha de última modificación indicada al final de este documento refleja la versión vigente. El uso continuado de nuestros servicios después de la entrada en vigor de cambios significativos constituye la aceptación de la política actualizada.',
    ],
  },
  {
    id: 'contacto',
    icon: Mail,
    title: '12. Contacto y Reclamaciones',
    content: [
      'Si tiene preguntas, sugerencias, reclamos o desea ejercer sus derechos sobre protección de datos personales, puede contactarnos a través de los siguientes canales oficiales. Nuestro equipo de protección de datos atenderá su solicitud dentro de los plazos legalmente establecidos.',
      'Correo electrónico dedicado: ecotaxi@oyc-srl.com — Para consultas relacionadas con privacidad y protección de datos, incluya en el asunto "Protección de Datos Personales".',
      'Teléfono: (+591) 3 3296885 — Horario de atención: lunes a viernes de 08:00 a 18:00, sábados de 08:00 a 13:00 (hora local de Santa Cruz de la Sierra, Bolivia).',
      'Dirección postal: O&C Ingeniería y Representaciones SRL — Santa Cruz de la Sierra, Bolivia. Para entregas presenciales, coordine previamente una cita por los canales indicados.',
      'En caso de no recibir respuesta satisfactoria o de considerar que sus derechos han sido vulnerados, podrá presentar una reclamación ante la Autoridad de Fiscalización y Control Social de Telecomunicaciones y Transportes (ATT) o la autoridad competente en materia de protección de datos personales en Bolivia.',
    ],
  },
]

export default function PoliticaPrivacidadPage() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [activeSection, setActiveSection] = useState<string>('introduccion')

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
          <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-[#0077BD]/10 blur-[100px]" />
          <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-[#00E676]/10 blur-[100px]" />
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0077BD]/10 border border-[#0077BD]/20 mb-6">
              <Shield className="w-4 h-4 text-[#0077BD]" />
              <span className="text-sm text-[#0077BD]">Protección de Datos Personales</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Política de{' '}
              <span className="bg-gradient-to-r from-[#0077BD] to-[#00E676] bg-clip-text text-transparent">
                Privacidad
              </span>
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto mb-8 leading-relaxed">
              En Ecotaxi protegemos su información personal con los más altos estándares de seguridad y cumplimiento legal. Conozca cómo recopilamos, usamos y protegemos sus datos.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-white/40">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00E676]" />
                <span>Última actualización: Junio 2026</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00E676]" />
                <span>Cumplimiento Ley N° 1581 de Bolivia</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00E676]" />
                <span>Estándar PCI-DSS</span>
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
                    <nav className="space-y-1">
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
                  <div className="mt-6 p-6 rounded-3xl bg-gradient-to-br from-[#00E676]/5 to-[#0077BD]/5 border border-[#00E676]/10">
                    <div className="flex items-center gap-2 mb-3">
                      <Mail className="w-4 h-4 text-[#00E676]" />
                      <span className="text-sm font-semibold text-white">¿Dudas sobre privacidad?</span>
                    </div>
                    <p className="text-xs text-white/50 mb-4">Contáctenos para ejercer sus derechos ARCO o resolver consultas sobre el tratamiento de sus datos.</p>
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
                    Datos de Contacto — Responsable del Tratamiento
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
