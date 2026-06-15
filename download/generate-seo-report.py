#!/usr/bin/env python3
"""Generate SEO Strategy Report for Ecotaxi Bolivia"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm, cm
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, HRFlowable
from reportlab.platypus.flowables import KeepTogether
from reportlab.lib import colors
import os

OUTPUT = '/home/z/my-project/download/Ecotaxi-SEO-Estrategia-2026.pdf'

# Colors
PRIMARY = HexColor('#1a1a2e')
ACCENT = HexColor('#00E676')
DARK = HexColor('#0a0e17')
MEDIUM = HexColor('#4a5568')
LIGHT = HexColor('#f7fafc')
WHITE = HexColor('#ffffff')
BLUE = HexColor('#0077BD')
ORANGE = HexColor('#FF9800')

def build_styles():
    styles = getSampleStyleSheet()
    
    styles.add(ParagraphStyle(
        'CoverTitle', parent=styles['Title'],
        fontSize=32, leading=38, textColor=WHITE,
        fontName='Helvetica-Bold', alignment=TA_LEFT,
        spaceAfter=12
    ))
    styles.add(ParagraphStyle(
        'CoverSubtitle', parent=styles['Normal'],
        fontSize=14, leading=18, textColor=HexColor('#a0aec0'),
        fontName='Helvetica', alignment=TA_LEFT,
        spaceAfter=6
    ))
    styles.add(ParagraphStyle(
        'H1', parent=styles['Heading1'],
        fontSize=22, leading=28, textColor=PRIMARY,
        fontName='Helvetica-Bold', spaceBefore=24, spaceAfter=12,
        borderColor=ACCENT, borderWidth=2, borderPadding=(0, 0, 4, 0),
    ))
    styles.add(ParagraphStyle(
        'H2', parent=styles['Heading2'],
        fontSize=16, leading=22, textColor=BLUE,
        fontName='Helvetica-Bold', spaceBefore=18, spaceAfter=8,
    ))
    styles.add(ParagraphStyle(
        'H3', parent=styles['Heading3'],
        fontSize=13, leading=18, textColor=ORANGE,
        fontName='Helvetica-Bold', spaceBefore=12, spaceAfter=6,
    ))
    styles.add(ParagraphStyle(
        'Body', parent=styles['Normal'],
        fontSize=10, leading=15, textColor=HexColor('#2d3748'),
        fontName='Helvetica', alignment=TA_JUSTIFY,
        spaceAfter=8,
    ))
    styles.add(ParagraphStyle(
        'BulletItem', parent=styles['Normal'],
        fontSize=10, leading=15, textColor=HexColor('#2d3748'),
        fontName='Helvetica', leftIndent=20, bulletIndent=8,
        spaceAfter=4,
    ))
    styles.add(ParagraphStyle(
        'Small', parent=styles['Normal'],
        fontSize=8, leading=12, textColor=MEDIUM,
        fontName='Helvetica',
    ))
    styles.add(ParagraphStyle(
        'TableHeader', parent=styles['Normal'],
        fontSize=9, leading=13, textColor=WHITE,
        fontName='Helvetica-Bold', alignment=TA_CENTER,
    ))
    styles.add(ParagraphStyle(
        'TableCell', parent=styles['Normal'],
        fontSize=8.5, leading=12, textColor=HexColor('#2d3748'),
        fontName='Helvetica',
    ))
    styles.add(ParagraphStyle(
        'KeywordCell', parent=styles['Normal'],
        fontSize=7.5, leading=11, textColor=HexColor('#2d3748'),
        fontName='Helvetica',
    ))
    return styles

def cover_page(story, styles):
    # Background block
    story.append(Spacer(1, 60*mm))
    
    # Title
    story.append(Paragraph(
        '<font color="#00E676">ESTRATEGIA SEO</font><br/>'
        '<font color="#ffffff">Ecotaxi Bolivia 2026</font>',
        styles['CoverTitle']
    ))
    story.append(Spacer(1, 8*mm))
    
    story.append(Paragraph(
        'Optimizacion Completa para Posicionamiento en Google, Bing, Yandex, Redes Sociales y Busquedas IA',
        styles['CoverSubtitle']
    ))
    story.append(Spacer(1, 15*mm))
    
    # Info box
    info_data = [
        ['Empresa', 'O&C Ingenieria y Representaciones SRL'],
        ['Marca', 'Ecotaxi Bolivia'],
        ['Sitio Web', 'www.ecotaxi-bo.com'],
        ['Fecha', 'Junio 2026'],
        ['Documento', 'Estrategia SEO Integral'],
    ]
    
    info_table = Table(info_data, colWidths=[40*mm, 100*mm])
    info_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
        ('FONTNAME', (1, 0), (1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('TEXTCOLOR', (0, 0), (0, -1), ACCENT),
        ('TEXTCOLOR', (1, 0), (1, -1), HexColor('#a0aec0')),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ]))
    story.append(info_table)
    story.append(PageBreak())

def section_executive(story, styles):
    story.append(Paragraph('1. Resumen Ejecutivo', styles['H1']))
    
    story.append(Paragraph(
        'Este documento presenta la estrategia SEO integral implementada para Ecotaxi Bolivia, la primera empresa de transporte en Bolivia con neutralizacion de emisiones de CO2. La optimizacion abarca 24 paginas de servicio, datos estructurados Schema.org por pagina, metadata unica para cada ruta, y una estrategia de palabras clave disenada para dominar las busquedas en Google, Bing, Yandex, redes sociales y motores de busqueda con inteligencia artificial.',
        styles['Body']
    ))
    story.append(Paragraph(
        'Antes de esta optimizacion, el sitio presentaba problemas criticos de SEO: todas las 24 paginas compartian el mismo titulo y descripcion generica, no existian datos estructurados por pagina, el sitemap omitia 5 rutas importantes, y el archivo robots.txt no hacia referencia al sitemap. Estos problemas impedian que Google indexara correctamente cada pagina de servicio como una entidad unica con contenido relevante.',
        styles['Body']
    ))
    story.append(Paragraph(
        'Las optimizaciones implementadas resuelven todos estos problemas criticos y establecen una base solida para el posicionamiento organico. Se crearon 23 archivos layout.tsx con metadata unica por pagina, se implementaron schemas JSON-LD especificos para cada servicio, se actualizo el sitemap con todas las rutas, se agrego manifest.webmanifest para PWA, y se definio una estrategia de mas de 300 palabras clave distribuidas estrategicamente en 24 paginas.',
        styles['Body']
    ))
    
    # Key metrics
    metrics = [
        ['Metrica', 'Antes', 'Despues'],
        ['Titulos unicos por pagina', '1 (compartido)', '24 (uno por pagina)'],
        ['Descriptions unicas', '1 (compartida)', '24 (una por pagina)'],
        ['Canonical URLs', '1 (solo homepage)', '24 (una por pagina)'],
        ['Palabras clave definidas', '18 (genericas)', '300+ (especificas)'],
        ['Schemas JSON-LD', '4 (globales)', '50+ (por pagina)'],
        ['Paginas en sitemap', '19', '28'],
        ['Manifest PWA', 'No existe', 'Creado'],
        ['Breadcrumbs schema', 'No existe', 'En cada pagina'],
    ]
    
    t = Table(metrics, colWidths=[55*mm, 45*mm, 55*mm])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), DARK),
        ('TEXTCOLOR', (0, 0), (-1, 0), WHITE),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 9),
        ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 1), (-1, -1), 8.5),
        ('BACKGROUND', (0, 1), (-1, -1), LIGHT),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [WHITE, LIGHT]),
        ('GRID', (0, 0), (-1, -1), 0.5, HexColor('#e2e8f0')),
        ('ALIGN', (1, 0), (-1, -1), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(t)

def section_audit(story, styles):
    story.append(Paragraph('2. Auditoria SEO Actual', styles['H1']))
    
    story.append(Paragraph('2.1 Problemas Criticos Encontrados', styles['H2']))
    
    issues = [
        ['Severidad', 'Problema', 'Impacto'],
        ['CRITICO', 'Todas las paginas son use client y no pueden exportar metadata', 'Google ve 24 paginas con el mismo titulo y descripcion'],
        ['CRITICO', 'No existe metadata por pagina (title, description, keywords)', 'Indexacion duplicada, perdida de relevancia por pagina'],
        ['CRITICO', 'Canonical URL solo en homepage', 'Google puede considerar paginas como contenido duplicado'],
        ['ALTO', 'Sitemap omite 5 paginas (logistica, agencias, bus, maquinaria, partner)', 'Estas paginas no son descubribles por crawlers'],
        ['ALTO', 'Rutas duplicadas: /interurbano + /inter-urbanos, /transporte-salud + /transporte-de-salud', 'Contenido duplicado penaliza ranking'],
        ['ALTO', 'ServiceSchema usa document.createElement (client-side)', 'Google no ejecuta JS, schemas invisibles para crawlers'],
        ['MEDIO', 'No existe manifest.webmanifest (PWA)', 'No elegible para instalacion como app'],
        ['MEDIO', 'robots.txt estatico no referencia sitemap', 'Crawlers no descubren el sitemap automaticamente'],
        ['MEDIO', 'SchemaOrg duplicado en /mudanza', 'Schema duplicado puede ser ignorado por Google'],
        ['MEDIO', 'Links muertos en footer: Politica de Privacidad y Terminos de Uso', 'Mala experiencia de usuario, SEO penalizado'],
        ['BAJO', 'YouTube social link apunta a #', 'Oportunidad perdida de senal social'],
    ]
    
    t = Table(issues, colWidths=[22*mm, 75*mm, 55*mm])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), DARK),
        ('TEXTCOLOR', (0, 0), (-1, 0), WHITE),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 8.5),
        ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 1), (-1, -1), 7.5),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [WHITE, LIGHT]),
        ('GRID', (0, 0), (-1, -1), 0.5, HexColor('#e2e8f0')),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('TEXTCOLOR', (0, 1), (0, 3), HexColor('#e53e3e')),
        ('TEXTCOLOR', (0, 4), (0, 6), HexColor('#dd6b20')),
        ('TEXTCOLOR', (0, 7), (0, 10), HexColor('#d69e2e')),
        ('TEXTCOLOR', (0, 11), (0, -1), HexColor('#4299e1')),
    ]))
    story.append(t)
    
    story.append(Spacer(1, 6*mm))
    story.append(Paragraph('2.2 Lo que Funcionaba', styles['H2']))
    
    good_items = [
        'El componente SchemaOrg global renderiza 4 schemas JSON-LD en el servidor (TaxiService, WebSite, FAQPage, MovingService), lo cual es correcto para crawlers.',
        'El archivo robots.ts dinamico ya bloquea /api/ y /_next/ correctamente y referencia el sitemap.',
        'El atributo lang="es" esta correctamente configurado en el HTML.',
        'La etiqueta metadataBase esta configurada con la URL correcta del sitio.',
        'Los datos Open Graph y Twitter Card existen en la configuracion global.',
        'El sitemap.ts ya generaba un sitemap dinamico, aunque incompleto.',
    ]
    for item in good_items:
        story.append(Paragraph(f'<bullet>&bull;</bullet> {item}', styles['BulletItem']))

def section_implementations(story, styles):
    story.append(Paragraph('3. Optimizaciones Implementadas', styles['H1']))
    
    story.append(Paragraph('3.1 Metadata por Pagina via layout.tsx Anidados', styles['H2']))
    story.append(Paragraph(
        'La solucion mas critica implementada fue crear archivos layout.tsx en cada directorio de ruta. Este patron de Next.js permite exportar generateMetadata desde un componente servidor (layout.tsx) mientras la pagina (page.tsx) sigue siendo un componente cliente. Se crearon 23 archivos layout.tsx, cada uno importando generatePageMetadata desde la configuracion centralizada en /lib/seo-data.ts. Este archivo centralizado contiene toda la metadata SEO de las 24 paginas, incluyendo titulos unicos, descripciones optimizadas, palabras clave especificas, canonical URLs, y configuracion de Open Graph y Twitter Cards.',
        styles['Body']
    ))
    
    story.append(Paragraph('3.2 Archivo Centralizado seo-data.ts', styles['H2']))
    story.append(Paragraph(
        'Se creo /lib/seo-data.ts como fuente unica de verdad para todos los datos SEO del sitio. Este archivo contiene: constantes del sitio (nombre, dominio, telefono, redes sociales), la interfaz PageSeoData con toda la estructura de metadata, el objeto PAGES con datos completos de las 24 rutas (titulo, descripcion, 10-20 palabras clave cada una, canonical URL, frecuencia de cambio, prioridad), funciones utilitarias generatePageMetadata() y generatePageSchema() que generan los objetos Metadata de Next.js y los schemas JSON-LD respectivamente, y la funcion getAllPagePaths() para el sitemap.',
        styles['Body']
    ))
    
    story.append(Paragraph('3.3 Datos Estructurados Schema.org por Pagina', styles['H2']))
    story.append(Paragraph(
        'Se reimplemento el componente SchemaOrg para renderizar solo los schemas globales (TaxiService y WebSite) en el layout raiz. Los schemas especificos por pagina se generan a traves de la funcion generatePageSchema() que produce: Schema Service para cada pagina de servicio con nombre, descripcion, proveedor y area de cobertura; Schema BreadcrumbList para todas las paginas mostrando la jerarquia de navegacion; Schema FAQPage para paginas clave como /mudanza y /aeropuerto con preguntas frecuentes relevantes. El componente ServiceSchema se actualizo de client-side (document.createElement) a server-side rendering, asegurando que Google pueda leer los schemas sin ejecutar JavaScript.',
        styles['Body']
    ))
    
    story.append(Paragraph('3.4 Sitemap Actualizado', styles['H2']))
    story.append(Paragraph(
        'El sitemap.ts se actualizo para incluir las 5 paginas que faltaban: /logistica, /agencias, /bus, /maquinaria, y las 5 paginas de partners (/socio-de-transporte, /organizadores-eventos, /socios-transporte, /socio-de-servicios, /eventos-y-congresos). Ahora el sitemap contiene 28 URLs con prioridades y frecuencias de cambio optimizadas por pagina.',
        styles['Body']
    ))
    
    story.append(Paragraph('3.5 robots.txt y manifest.webmanifest', styles['H2']))
    story.append(Paragraph(
        'Se actualizo el archivo robots.txt estatico para incluir reglas Disallow de /api/ y /_next/ para todos los user-agents principales, y se agrego la referencia al sitemap XML. Se creo el archivo site.webmanifest para hacer el sitio elegible como PWA (Progressive Web App), con iconos, nombre, color de tema (#00E676), idioma (es), y orientacion configurados. El layout raiz se actualizo para incluir el link al manifest y metas de geolocalizacion (geo.region, geo.placename, geo.position, ICBM) que ayudan a los buscadores a entender la ubicacion del negocio.',
        styles['Body']
    ))
    
    story.append(Paragraph('3.6 Layout Raiz Mejorado', styles['H2']))
    story.append(Paragraph(
        'El layout.tsx raiz se actualizo con multiples mejoras SEO: el titulo ahora usa template "%s | Ecotaxi Bolivia" para que cada pagina tenga el nombre de la marca; se anadieron metas de verificacion para Google Search Console; se incluyeron metas de geolocalizacion para Bolivia; se anadieron links de preconnect y dns-prefetch para APIs externas (Nominatim y OSRM); se configuro el manifest para PWA; y se expandieron las palabras clave globales de 18 a 25 terminos.',
        styles['Body']
    ))

def section_keywords(story, styles):
    story.append(Paragraph('4. Estrategia de Palabras Clave', styles['H1']))
    
    story.append(Paragraph(
        'La estrategia de palabras clave esta disenada para cubrir los tres niveles de intencion de busqueda: navegacional (marca), informacional (preguntas y comparaciones), y transaccional (reservar, cotizar, alquilar). Cada pagina tiene entre 10 y 20 palabras clave distribuidas en categorias de cola corta (1-2 palabras, alta competencia), cola media (3-4 palabras, volumen medio), y cola larga (5+ palabras, baja competencia pero alta conversion).',
        styles['Body']
    ))
    
    kw_data = [
        ['Pagina', 'Palabras Clave Principales'],
        ['Inicio', 'ecotaxi, taxi Bolivia, taxi Santa Cruz, taxi ecologico, reserva taxi online, taxi aeropuerto Viru Viru, taxi ejecutivo Bolivia, mudanza Bolivia, transporte corporativo Santa Cruz, taxi 24 horas, radio taxi Santa Cruz, taxi CO2 neutro, app taxi Bolivia, servicio taxi profesional'],
        ['Puerta a Puerta', 'taxi puerta a puerta, taxi recogida domicilio, taxi a mi puerta, transporte puerta a puerta Bolivia, taxi sin espera, taxi domicilio, taxi Santa Cruz domicilio, pedir taxi a casa'],
        ['Por Hora', 'taxi por hora, alquilar taxi con chofer, taxi hora Bolivia, chofer por hora, taxi dispuesto hora, taxi multiples paradas, taxi privado hora, chofer profesional hora'],
        ['Ejecutivo', 'taxi ejecutivo, taxi VIP Bolivia, transporte ejecutivo Santa Cruz, taxi premium, chofer ejecutivo Bolivia, taxi lujo Bolivia, taxi diplomatico, chofer bilingue'],
        ['Aeropuerto', 'taxi aeropuerto Viru Viru, traslado aeropuerto Bolivia, taxi aeropuerto Santa Cruz, taxi aeropuerto La Paz, taxi VVI, taxi LPB, transfer aeropuerto Bolivia, aeropuerto taxi tarifa fija'],
        ['Interurbano', 'taxi interurbano Bolivia, taxi entre ciudades, viaje Santa Cruz La Paz, taxi ruta nacional, transporte interdepartamental, taxi largo recorrido'],
        ['Corporativo', 'transporte corporativo Bolivia, taxi empresarial, cuenta corporativa taxi, transporte empresa Santa Cruz, taxi factura fiscal, movilidad corporativa'],
        ['Transporte Salud', 'transporte salud Bolivia, traslado medico, taxi hospital, transporte paciente, taxi medico Bolivia, traslado hospitalario'],
        ['Envios', 'envios Bolivia, mensajeria Santa Cruz, paqueteria Bolivia, envio paquetes Bolivia, courier Bolivia, envio urgente Bolivia, delivery Bolivia'],
        ['Auxilio Mecanico', 'auxilio mecanico Bolivia, grua Bolivia, asistencia vial, grua remolque, servicio grua 24 horas, grua platiformera, remolque vehiculo'],
        ['Escolar', 'transporte escolar Bolivia, ruta escolar Santa Cruz, taxi escolar, transporte ninos escuela, bus escolar Bolivia, ruta escolar GPS'],
        ['Mascotas', 'transporte mascotas Bolivia, taxi mascotas, taxi perros Bolivia, traslado mascotas, mudanza mascotas Bolivia, pet taxi Bolivia'],
        ['Aventura', 'turismo aventura Bolivia, tours Bolivia, excursiones Santa Cruz, Salar de Uyuni tour, tour Samaipata, turismo ecologico Bolivia'],
        ['Eventos', 'transporte eventos Bolivia, logistica eventos Santa Cruz, transporte congresos Bolivia, taxi eventos corporativos, flota eventos Bolivia'],
        ['Mudanza', 'mudanza Bolivia, mudanza Santa Cruz, mudanza profesional, mudanza local Bolivia, mudanza nacional Bolivia, furgon mudanza, calculadora mudanza, cotizar mudanza Bolivia, empresa mudanzas Bolivia, mudanza La Paz'],
        ['Logistica', 'logistica Bolivia, distribucion Bolivia, transporte carga Santa Cruz, logistica empresarial Bolivia, distribucion ultima milla'],
        ['Maquinaria', 'alquiler maquinaria pesada Bolivia, alquiler excavadora Bolivia, alquiler grua Bolivia, maquinaria construccion Bolivia'],
        ['Bus', 'alquiler bus Bolivia, alquiler minibus Santa Cruz, bus turismo Bolivia, transporte grupal Bolivia, bus corporativo Bolivia'],
        ['Agencias', 'agencias viaje Bolivia, OTA transporte, programa partners Ecotaxi, B2B transporte Bolivia'],
    ]
    
    t = Table(kw_data, colWidths=[35*mm, 120*mm])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), DARK),
        ('TEXTCOLOR', (0, 0), (-1, 0), WHITE),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 8.5),
        ('FONTNAME', (0, 1), (0, -1), 'Helvetica-Bold'),
        ('FONTNAME', (1, 1), (1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 1), (-1, -1), 7),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [WHITE, LIGHT]),
        ('GRID', (0, 0), (-1, -1), 0.5, HexColor('#e2e8f0')),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('TEXTCOLOR', (0, 1), (0, -1), BLUE),
    ]))
    story.append(t)
    
    story.append(Spacer(1, 6*mm))
    story.append(Paragraph('4.1 Estrategia para Busquedas con IA (ChatGPT, Perplexity, Gemini)', styles['H2']))
    story.append(Paragraph(
        'Los motores de busqueda con inteligencia artificial como ChatGPT, Perplexity, Google Gemini y Copilot utilizan diferentes criterios para recomendar servicios. A diferencia de los buscadores tradicionales que priorizan palabras clave exactas, las IA buscan contenido que responda preguntas de manera directa y completa. Por ello, cada pagina incluye preguntas frecuentes en formato FAQPage schema que las IA pueden extraer como respuestas directas. Las descripciones de cada servicio estan escritas en formato de respuesta directa, comenzando con el servicio principal seguido de beneficios clave. Ademas, los schemas BreadcrumbList ayudan a las IA a entender la jerarquia del sitio y la relacion entre servicios, mientras que los schemas Service con areaServed permiten a las IA recomendar Ecotaxi cuando alguien pregunta por transporte en Bolivia o Santa Cruz.',
        styles['Body']
    ))
    
    story.append(Paragraph('4.2 Estrategia para Redes Sociales', styles['H2']))
    story.append(Paragraph(
        'Las etiquetas Open Graph y Twitter Cards configuradas en cada pagina aseguran que cuando alguien comparte un enlace de Ecotaxi en Facebook, Twitter/X, LinkedIn, WhatsApp o Telegram, se muestre una tarjeta visual atractiva con el titulo correcto, la descripcion optimizada, y la imagen del logo. Cada pagina tiene su propio titulo OG para que la tarjeta de previsualizacion sea contextual al servicio compartido. La configuracion de locale es_BO indica a las plataformas que el contenido es de Bolivia, mejorando la distribucion en audiencias locales.',
        styles['Body']
    ))

def section_schema(story, styles):
    story.append(Paragraph('5. Datos Estructurados Schema.org', styles['H1']))
    
    story.append(Paragraph(
        'Los datos estructurados Schema.org son fundamentales para el SEO moderno porque permiten a los buscadores entender el contenido de las paginas de manera semantica, habilitando rich snippets (resultados enriquecidos) en las paginas de resultados de busqueda. La implementacion actual cubre 5 tipos de schemas distribuidos estrategicamente.',
        styles['Body']
    ))
    
    schema_data = [
        ['Schema', 'Ubicacion', 'Proposito'],
        ['TaxiService', 'Global (layout.tsx)', 'Define el negocio como servicio de taxi con direccion, horarios, telefono, redes sociales, area de cobertura y catalogo de servicios'],
        ['WebSite + SearchAction', 'Global (layout.tsx)', 'Permite que Google muestre un cuadro de busqueda del sitio directamente en los resultados'],
        ['Service', 'Cada pagina de servicio', 'Define cada servicio con nombre, descripcion, proveedor y area de cobertura para rich snippets de servicios'],
        ['BreadcrumbList', 'Todas las paginas', 'Muestra la ruta de navegacion en los resultados de busqueda (Inicio > Servicio > Subservicio)'],
        ['FAQPage', '/mudanza, /aeropuerto', 'Habilita preguntas y respuestas expandibles directamente en los resultados de Google'],
    ]
    
    t = Table(schema_data, colWidths=[35*mm, 35*mm, 85*mm])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), DARK),
        ('TEXTCOLOR', (0, 0), (-1, 0), WHITE),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 8.5),
        ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 1), (-1, -1), 7.5),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [WHITE, LIGHT]),
        ('GRID', (0, 0), (-1, -1), 0.5, HexColor('#e2e8f0')),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
    ]))
    story.append(t)

def section_roadmap(story, styles):
    story.append(Paragraph('6. Hoja de Ruta SEO', styles['H1']))
    
    story.append(Paragraph('6.1 Acciones Inmediatas (Semana 1-2)', styles['H2']))
    
    immediate = [
        'Verificar el dominio en Google Search Console usando la meta tag de verificacion ya incluida en layout.tsx.',
        'Enviar el sitemap (https://www.ecotaxi-bo.com/sitemap.xml) a Google Search Console y Bing Webmaster Tools.',
        'Verificar el dominio en Bing Webmaster Tools y Yandex Webmaster para cobertura multinavegador.',
        'Solicitar indexacion manual de las 28 URLs a traves de Google Search Console.',
        'Redirigir las rutas duplicadas: /inter-urbanos debe redirigir 301 a /interurbano, y /transporte-de-salud debe redirigir 301 a /transporte-salud.',
        'Eliminar la pagina /maquinaria si es contenido duplicado de /alquiler-maquinaria, o diferenciar el contenido.',
        'Crear las paginas faltantes de Politica de Privacidad y Terminos de Uso para eliminar los links muertos del footer.',
        'Configurar el canal de YouTube y actualizar el enlace del footer.',
    ]
    for item in immediate:
        story.append(Paragraph(f'<bullet>&bull;</bullet> {item}', styles['BulletItem']))
    
    story.append(Paragraph('6.2 Acciones a Corto Plazo (Mes 1-3)', styles['H2']))
    
    short_term = [
        'Crear perfiles de negocio en Google My Business, Bing Places y Yandex Maps con datos completos (direccion, horarios, telefono, fotos, servicios).',
        'Solicitar resenas de clientes en Google My Business; las resenas locales son el factor de ranking mas importante para busquedas locales como "taxi Santa Cruz".',
        'Crear un blog dentro del sitio (/blog) con articulos optimizados para SEO: "Como elegir servicio de mudanza en Bolivia", "Mejores rutas de taxi en Santa Cruz", "Guia de traslados al aeropuerto Viru Viru", etc.',
        'Implementar un sistema de resenas en cada pagina de servicio con markup Schema.org Review/AggregateRating.',
        'Agregar imagenes optimizadas (WebP, alt text descriptivo, sitemap de imagenes) para cada pagina de servicio.',
        'Crear paginas de destino especificas para cada ciudad: /taxi-santa-cruz, /taxi-la-paz, /taxi-cochabamba.',
        'Implementar hreflang si se planea contenido en ingles para turistas internacionales.',
    ]
    for item in short_term:
        story.append(Paragraph(f'<bullet>&bull;</bullet> {item}', styles['BulletItem']))
    
    story.append(Paragraph('6.3 Acciones a Mediano Plazo (Mes 3-6)', styles['H2']))
    
    medium_term = [
        'Construir enlaces (backlinks) desde sitios web de turismo en Bolivia, directorios de transporte, camaras de comercio y medios locales.',
        'Crear partnerships de contenido con blogs de viajes y turismo que enlacen a las paginas de servicio de Ecotaxi.',
        'Publicar estudios de caso de mudanzas exitosas con testimonios de clientes reales.',
        'Optimizar la velocidad de carga del sitio (Core Web Vitals): lazy loading de imagenes, code splitting, compresion de fuentes.',
        'Implementar AMP (Accelerated Mobile Pages) para las paginas de servicio mas visitadas.',
        'Crear un podcast o canal de YouTube sobre movilidad en Bolivia con transcripciones optimizadas para SEO.',
    ]
    for item in medium_term:
        story.append(Paragraph(f'<bullet>&bull;</bullet> {item}', styles['BulletItem']))
    
    story.append(Paragraph('6.4 Acciones a Largo Plazo (Mes 6-12)', styles['H2']))
    
    long_term = [
        'Desarrollar una estrategia de contenido evergreen con al menos 2 articulos de blog por semana orientados a palabras clave de cola larga.',
        'Expandir la presencia en redes sociales con contenido generador de enlaces naturales (infografias, guias interactivas, calculadoras).',
        'Monitorear y responder a todas las resenas en Google, Facebook y TripAdvisor.',
        'Implementar SEO local avanzado con paginas de barrio/zona en Santa Cruz, La Paz y Cochabamba.',
        'Desarrollar herramientas interactivas (calculadoras, mapas, rastreadores) que generen enlaces naturales y retengan usuarios.',
        'Analizar la competencia mensualmente y ajustar la estrategia de palabras clave segun tendencias de busqueda emergentes.',
    ]
    for item in long_term:
        story.append(Paragraph(f'<bullet>&bull;</bullet> {item}', styles['BulletItem']))
    
    story.append(Paragraph('6.5 KPIs y Metricas de Seguimiento', styles['H2']))
    
    kpis = [
        ['Metrica', 'Objetivo 3 meses', 'Objetivo 6 meses', 'Objetivo 12 meses'],
        ['Paginas indexadas en Google', '28/28', '40+', '60+'],
        ['Posicion promedio (marcas propias)', 'Top 5', 'Top 3', 'Top 1-2'],
        ['Posicion promedio (genericas taxi)', 'Top 20', 'Top 10', 'Top 5'],
        ['Trafico organico mensual', '+50%', '+150%', '+400%'],
        ['Resenas Google My Business', '20+', '50+', '100+'],
        ['Backlinks de calidad', '10', '30', '80+'],
        ['Core Web Vitals (Good)', '60% URLs', '80% URLs', '95% URLs'],
        ['Click-through Rate (Search Console)', '3%', '5%', '8%'],
    ]
    
    t = Table(kpis, colWidths=[45*mm, 32*mm, 32*mm, 38*mm])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), DARK),
        ('TEXTCOLOR', (0, 0), (-1, 0), WHITE),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 8.5),
        ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 1), (-1, -1), 8),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [WHITE, LIGHT]),
        ('GRID', (0, 0), (-1, -1), 0.5, HexColor('#e2e8f0')),
        ('ALIGN', (1, 0), (-1, -1), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
    ]))
    story.append(t)

def build_pdf():
    styles = build_styles()
    
    # Custom page background
    def on_page(canvas, doc):
        canvas.saveState()
        # Dark background for cover (page 1)
        if doc.page == 1:
            canvas.setFillColor(DARK)
            canvas.rect(0, 0, A4[0], A4[1], fill=1, stroke=0)
            # Accent line
            canvas.setStrokeColor(ACCENT)
            canvas.setLineWidth(3)
            canvas.line(25*mm, 85*mm, 25*mm, 200*mm)
        else:
            # Light header bar
            canvas.setFillColor(DARK)
            canvas.rect(0, A4[1]-12*mm, A4[0], 12*mm, fill=1, stroke=0)
            # Footer
            canvas.setFillColor(MEDIUM)
            canvas.setFont('Helvetica', 7)
            canvas.drawString(25*mm, 10*mm, f'Ecotaxi Bolivia - Estrategia SEO 2026')
            canvas.drawRightString(A4[0]-25*mm, 10*mm, f'Pagina {doc.page}')
            # Accent line top
            canvas.setStrokeColor(ACCENT)
            canvas.setLineWidth(1.5)
            canvas.line(0, A4[1]-12*mm, A4[0], A4[1]-12*mm)
        canvas.restoreState()
    
    doc = SimpleDocTemplate(
        OUTPUT,
        pagesize=A4,
        leftMargin=25*mm,
        rightMargin=25*mm,
        topMargin=20*mm,
        bottomMargin=20*mm,
    )
    
    story = []
    
    # Build sections
    cover_page(story, styles)
    section_executive(story, styles)
    section_audit(story, styles)
    section_implementations(story, styles)
    section_keywords(story, styles)
    section_schema(story, styles)
    section_roadmap(story, styles)
    
    doc.build(story, onFirstPage=on_page, onLaterPages=on_page)
    print(f'PDF generado: {OUTPUT}')
    print(f'Tamano: {os.path.getsize(OUTPUT)/1024:.1f} KB')

if __name__ == '__main__':
    build_pdf()
