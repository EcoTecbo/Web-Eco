---
Task ID: 1
Agent: Main
Task: Redesign mudanza calculator with comprehensive pricing updates

Work Log:
- Read existing mudanza page (1752 lines) with 7-step calculator
- Analyzed current data structures: VEHICLES, ORIGIN_EXTRAS, DEST_EXTRAS, EXTRAS
- Identified all required changes from user requirements
- Delegated implementation to full-stack-developer subagent with detailed specs
- Subagent updated VEHICLES data with pricing fields (floorElev, floorNoElev, helperPrice, perKm)
- Subagent replaced ORIGIN_EXTRAS/DEST_EXTRAS with comprehensive new data structures
- Added BOX_OPTIONS, PACKING_MATERIALS, HANDLING_EXTRAS, ACCESSIBILITY_EXTRAS, LOGISTICS_EXTRAS
- Redesigned calculator from 7 steps to 6 steps
- Step 1: Added vehicle type selection (cerrado/abierto) with specific vehicle options
- Step 4: Complete redesign with 6 sections (Embalaje, Manipulación, Accesibilidad Origen/Destino, Ayudantes, Logística)
- Updated all pricing calculations (vehicle-based floor costs, helper costs, embalaje at Bs 45/m³)
- Changed insurance from 3% to 2%
- Updated API route with all new fields and email template
- Build verified successfully

Stage Summary:
- Calculator redesigned from 7 to 6 steps
- Vehicle selection added to Step 1 (furgón/camioneta → specific vehicle)
- Helpers merged into single selection for carga y descarga with vehicle-based pricing
- Floor pricing now vehicle-dependent (elevator vs no elevator, per size)
- Embalaje calculated at Bs 45/m³ (completo), Bs 30/m³ (solo embalaje), Bs 15/m³ (solo desembalaje)
- Box purchase options with quantity selectors
- Packing materials with quantity selectors
- Handling extras (armado/desarmado, frágil, pesados) with quantities
- Accessibility extras for both origin and destination (floor, elevator, caminata, fachada)
- Logistics extras (punto de carga extra, retiro cajas)
- API route handles all new fields
