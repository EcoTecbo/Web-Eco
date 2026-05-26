# Worklog: Mudanza Calculator Rewrite

## Date: 2026-05-26

## Summary
Completely rewrote the CalculatorSection component in `/home/z/my-project/src/app/mudanza/page.tsx` with enhanced features including OpenStreetMap integration, 7-step flow, split extras, insurance/IVA/payment options, and form submission.

## Files Modified

### 1. `/home/z/my-project/src/app/mudanza/page.tsx` (Complete rewrite of sections 5-7)
- **Kept unchanged**: Hero, ServiceTypes, Categories, Fleet sections (lines 1-429 equivalent)
- **Completely rewrote**: CalculatorSection (5 → 7 steps), ProcessSection, FAQSection, main page

### 2. `/home/z/my-project/src/components/mudanza-map.tsx` (NEW)
- Created separate client component for the Leaflet map
- Contains MapContainer, TileLayer, Marker, Popup, Polyline, useMapEvents
- Custom marker icons (origin=green, destination=red, stops=light blue)
- Avoids SSR issues by being dynamically imported with `ssr: false`
- Leaflet CSS imported here instead of in page.tsx

### 3. `/home/z/my-project/src/app/api/mudanza/submit/route.ts` (NEW)
- POST API endpoint for form submission
- Sends email to ecotaxi@oyc-srl.com via nodemailer
- Subject: "Cotización de Servicio de Mudanza desde la Web"
- Returns WhatsApp link for https://wa.me/59173662803
- Gracefully handles email sending failures (returns success anyway so user can use WhatsApp)

### 4. `/home/z/my-project/public/mudanza-calculator.jpg` (NEW)
- Generated background image for calculator section using AI image generation
- Moving truck on city street in Santa Cruz, dark moody atmosphere

## New Features

### Calculator 7-Step Flow:
1. **Tipo de Mudanza** - Local/Provincial/Nacional + Casa/Oficina/Especial (kept as-is)
2. **Inventario** - Furniture selection by room (kept as-is)
3. **Ruta y Dirección** - NEW: Interactive OpenStreetMap with:
   - Map centered on Santa Cruz de la Sierra, Bolivia [-17.7833, -63.1821]
   - Nominatim API address search for Bolivia
   - Draggable markers: GREEN origin, RED destination, LIGHT BLUE intermediate stops
   - OSRM route calculation with polyline drawing
   - Distance and duration display
   - Two-column layout (form left, map right)
4. **Complementos de Origen** - Origin-side services:
   - Embalaje completo (Bs 500)
   - Desmontaje de muebles (Bs 300)
   - Empaque frágil/cristalería (Bs 150)
   - Protección pisos y paredes (Bs 100)
   - Carga planta alta sin elevador (Bs 100/piso)
   - Carga planta alta con elevador (Bs 150)
   - Ayudantes en origen: Number selector (Bs 150 c/u)
   - Piso and elevator selectors
5. **Complementos de Destino** - Destination-side services:
   - Desembalaje completo (Bs 500)
   - Montaje de muebles (Bs 300)
   - Traslado electrodomésticos especiales (Bs 250)
   - Guardamuebles/almacenamiento (Bs 200/semana) with week selector
   - Ayudantes en destino: Number selector (Bs 150 c/u)
   - Piso and elevator selectors
6. **Seguro, IVA y Pago**:
   - Insurance toggle with amount selection: Bs 5K/10K/20K/50K or custom
   - Insurance cost = 3% of declared value
   - IVA 16% toggle with Razón Social and NIT fields
   - Payment method selection: Efectivo, QR, Transferencia, Tarjeta, Cuenta corporativa
   - Running total display
7. **Datos Personales y Envío**:
   - Nombre completo (required)
   - Teléfono (required) with WhatsApp checkbox
   - Correo electrónico (required)
   - Submit button (sends to API)
   - WhatsApp quick-share button
   - Success state with WhatsApp follow-up link

### API Route Features:
- Nodemailer email sending to ecotaxi@oyc-srl.com
- Comprehensive email body with all form data formatted
- WhatsApp link generation to +59173662803
- Graceful error handling

## Technical Details

### Leaflet/Map Integration:
- Used `next/dynamic` with `ssr: false` to avoid SSR issues
- Separate component file (`mudanza-map.tsx`) for all Leaflet imports
- Custom CSS filters on markers for color differentiation
- Custom Leaflet control styling for dark theme

### Background Image:
- Generated via `z-ai image` CLI tool
- Applied at 15% opacity with dark gradient overlay

### Packages Installed:
- `nodemailer` (v8.0.8) - Email sending
- `@types/nodemailer` (v8.0.0) - TypeScript types

### Build Status:
- ✅ ESLint passes with no errors on our files
- ✅ Next.js build succeeds
- ✅ Dev server running and serving `/mudanza` route correctly
