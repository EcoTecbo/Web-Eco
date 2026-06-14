---
Task ID: 1
Agent: main
Task: Rebuild Aeropuerto page with cover image, real Bolivia map, airport cards with bg images, dual form system

Work Log:
- Read existing aeropuerto-page.tsx component and /aeropuerto/page.tsx route
- Copied uploaded images to public folder: airport-cocha.png, bolivia-map.png, el-alto-bg.png, taxi-aeropuerto-bg.jpg, viru-viru-bg.png
- Completely rewrote /src/app/aeropuerto/page.tsx (~860 lines)
- Replaced hero section: removed anime.js SVG plane/chauffeur drawings, added real cover image (airport cocha.png) with gradient overlay
- Replaced SVG-drawn Bolivia map with real bolivia-map.png image, overlaying clickable city dots with position percentages
- Added 3 main airport cards with background images: Viru Viru (viru-viru-bg.png), El Alto (el-alto-bg.png), Jorge Wilstermann (taxi-aeropuerto-bg.jpg)
- Implemented dual form system: local Bolivia client → reservation form linked to dispatch system, foreign client → webbooker inline embed
- Added webbooker script/css loading via Next.js Script component and link tag
- Map dots are clickable and scroll to corresponding airport section
- Build verified successfully

Stage Summary:
- Aeropuerto page fully rebuilt with real images
- Hero: cover photo instead of SVG drawings
- Map: real Bolivia map with interactive city dots
- 3 airport cards with bg images for VVI, LPB, CBB
- Dual form: local (dispatch system) vs foreigner (webbooker payment)
