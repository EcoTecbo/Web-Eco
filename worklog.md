---
Task ID: 1
Agent: Main
Task: Favicon mejorado + Botón reservar cita choferes + Formularios envían email

Work Log:
- Generado favicons nítidos desde ecotaxi-logo.webp (1024x1024) con Pillow LANCZOS
- Creados: favicon-16x16.png, favicon-32x32.png, favicon-48x48.png, apple-touch-icon.png, android-chrome-192x192.png, android-chrome-512x512.png, favicon.ico (16+32+48), favicon.svg
- Actualizado layout.tsx con todos los tamaños de icon en metadata
- Agregado botón "Reservar Cita en Oficinas" en /socio-de-transporte (hero + sección requisitos)
- Agregado link "Reservar Cita" en footer (Trabaja con Nosotros) con ícono ExternalLink
- Creada API genérica /api/contact que envía email a ecotaxi@oyc-srl.com via Nodemailer
- Conectados 5 formularios al API: Aeropuerto, Corporativo, Transporte Salud, Interurbano, Logística
- Limpieza de .gitignore: .next/, .env, scripts/, db/, upload/, tool-results/, backup_images*/
- Resueltos conflictos de merge con remote (874d464)
- Push exitoso a main (05f3530)

Stage Summary:
- Favicon ahora usa logo 1024x1024 en todos los tamaños, mucho más nítido
- Choferes pueden reservar cita vía CRM OYC (appointly) desde /socio-de-transporte y footer
- Todos los formularios envían datos a ecotaxi@oyc-srl.com vía /api/contact
- Deploy automático en Vercel activado
