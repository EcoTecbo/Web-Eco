---
Task ID: 3
Agent: Main
Task: Redesign mudanza calculator with two-path flow, categories, smart vehicle suggestion, and background images

Work Log:
- Generated hero background images: /public/mudanza-hero1.jpg, /public/mudanza-hero2.jpg
- Added MUDANZA_CATEGORIES data (Express, Estándar, Familiar, Premium) with suggested vehicles per type
- Added two-path state variables: calcPath, mudanzaCategory, additionalVehicles
- Implemented getVehicleSuggestion() for smart vehicle suggestion based on volume
- Added auto-suggest useEffect that updates vehicle when inventory changes (Path B)
- Updated basePrice to account for additional vehicles at 70% perKm rate
- Dynamic steps: Path A = 5 steps, Path B = 6 steps
- Step 1 redesign: Initial path selection (A/B), then vehicle selection or category selection
- Path A: Direct vehicle selection → skips inventory
- Path B: Category selection → inventory with live suggestion → adjusts vehicle as items are added
- Added live vehicle suggestion card in inventory step showing volume vs capacity
- Warning when volume exceeds capacity suggesting additional vehicles
- Hero section: Auto-sliding background images with fade transitions every 5 seconds
- Updated buildSummaryText and handleSubmit with path/category/vehicles info
- Build verified successfully

Stage Summary:
- Two-path calculator: Path A (direct vehicle) and Path B (guided with categories/inventory)
- 4 mudanza categories: Express (6m³), Estándar (14m³), Familiar (25m³), Premium (35m³)
- Smart vehicle suggestion that auto-updates as inventory items are selected
- Multiple vehicle handling when volume exceeds single vehicle capacity
- Hero with auto-sliding background images
- All navigation links (navbar, footer, homepage) working correctly
