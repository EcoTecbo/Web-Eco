# Task: Rewrite Ecotaxi Bolivia Mudanza Calculator

## Summary
Completed full rewrite of the mudanza calculator component with all 14 requested features.

## Files Modified/Created
1. **`/home/z/my-project/src/components/ecotaxi/mudanza-page.tsx`** - Complete rewrite with all new features
2. **`/home/z/my-project/src/components/ecotaxi/mudanza-map.tsx`** - New Leaflet/OpenStreetMap map component
3. **`/home/z/my-project/src/app/api/mudanza/route.ts`** - Added POST handler for email submission

## Features Implemented
1. ✅ Service Type Cards with Background Images (casa, especial, oficina with lighter overlay)
2. ✅ New Path: "Conozco el tamaño de mi mudanza" (4 size categories: Express, Estándar, Familiar, Premium)
3. ✅ OpenStreetMap Integration (Leaflet map, draggable markers, Nominatim search, OSRM routing)
4. ✅ Complementary Services Split: Origin (left) / Destination (right)
5. ✅ Cargadores/Etibadores with +/- quantity (0-6, per origin/dest)
6. ✅ Box Purchase (Bs 15/box with +/- controls)
7. ✅ Embalaje Pricing per m³ (Bs 35/m³)
8. ✅ Insurance (toggle, 2% of declared value)
9. ✅ IVA Option (toggle, 16%, Razón Social, NIT fields)
10. ✅ Floor Charges per vehicle size (variable rates with/without elevator)
11. ✅ Payment Methods (5 options: Efectivo, QR, Transferencia, Tarjeta, Corporativo)
12. ✅ Personal Data (Nombre, Teléfono, WhatsApp checkbox, Correo)
13. ✅ Form Submission (WhatsApp link + Email POST)
14. ✅ Time selector for move

## Technical Details
- CalcPath type now includes 'knows_size'
- Dynamic import for Leaflet map (SSR: false)
- Custom divIcon markers for origin (green) and destination (purple)
- OSRM API for route distance calculation
- Nominatim API for address search and reverse geocoding
- Full estimate breakdown includes all new cost items
- WhatsApp message format includes all data fields
- POST API route validates required fields and logs submission
