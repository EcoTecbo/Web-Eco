'use client'

import { useState } from 'react'
import { MapPin, Plane, Clock, DollarSign, Phone, ChevronDown, ChevronUp } from 'lucide-react'

interface AirportInfo {
  code: string
  name: string
  city: string
  department: string
  rates: { vehicle: string; price: string }[]
  tracking: string
  phone: string
}

const airports: Record<string, AirportInfo> = {
  'La Paz': { code: 'LPB', name: 'Aeropuerto Internacional El Alto', city: 'La Paz', department: 'La Paz', rates: [{ vehicle: 'Sedan Confort', price: 'Bs 120' }, { vehicle: 'SUV Confort', price: 'Bs 150' }, { vehicle: 'Sedan VIP', price: 'Bs 220' }, { vehicle: 'Van VIP', price: 'Bs 280' }], tracking: 'Disponible 24/7', phone: '+591 2 2222222' },
  'Santa Cruz': { code: 'VVI', name: 'Aeropuerto Internacional Viru Viru', city: 'Santa Cruz', department: 'Santa Cruz', rates: [{ vehicle: 'Sedan Confort', price: 'Bs 100' }, { vehicle: 'SUV Confort', price: 'Bs 130' }, { vehicle: 'Sedan VIP', price: 'Bs 200' }, { vehicle: 'Van VIP', price: 'Bs 250' }], tracking: 'Disponible 24/7', phone: '+591 3 3296885' },
  'Cochabamba': { code: 'CBB', name: 'Aeropuerto Internacional Jorge Wilstermann', city: 'Cochabamba', department: 'Cochabamba', rates: [{ vehicle: 'Sedan Confort', price: 'Bs 90' }, { vehicle: 'SUV Confort', price: 'Bs 120' }, { vehicle: 'Sedan VIP', price: 'Bs 180' }, { vehicle: 'Van VIP', price: 'Bs 230' }], tracking: 'Disponible 24/7', phone: '+591 4 4444444' },
  'Tarija': { code: 'TJA', name: 'Aeropuerto Oriel Lea Plaza', city: 'Tarija', department: 'Tarija', rates: [{ vehicle: 'Sedan Confort', price: 'Bs 80' }, { vehicle: 'SUV Confort', price: 'Bs 110' }, { vehicle: 'Sedan VIP', price: 'Bs 160' }, { vehicle: 'Van VIP', price: 'Bs 200' }], tracking: 'Disponible 24/7', phone: '+591 4 6666666' },
  'Sucre': { code: 'SRE', name: 'Aeropuerto Juana Azurduy de Padilla', city: 'Sucre', department: 'Chuquisaca', rates: [{ vehicle: 'Sedan Confort', price: 'Bs 80' }, { vehicle: 'SUV Confort', price: 'Bs 110' }, { vehicle: 'Sedan VIP', price: 'Bs 160' }, { vehicle: 'Van VIP', price: 'Bs 200' }], tracking: 'Disponible 24/7', phone: '+591 4 6444444' },
  'Potosí': { code: 'POI', name: 'Aeropuerto Capitán Nicolás Rojas', city: 'Potosí', department: 'Potosí', rates: [{ vehicle: 'Sedan Confort', price: 'Bs 85' }, { vehicle: 'SUV Confort', price: 'Bs 115' }, { vehicle: 'Sedan VIP', price: 'Bs 170' }, { vehicle: 'Van VIP', price: 'Bs 210' }], tracking: 'Disponible 24/7', phone: '+591 2 6222222' },
  'Oruro': { code: 'ORU', name: 'Aeropuerto Juan Mendoza', city: 'Oruro', department: 'Oruro', rates: [{ vehicle: 'Sedan Confort', price: 'Bs 75' }, { vehicle: 'SUV Confort', price: 'Bs 100' }, { vehicle: 'Sedan VIP', price: 'Bs 150' }, { vehicle: 'Van VIP', price: 'Bs 190' }], tracking: 'Disponible 24/7', phone: '+591 2 5222222' },
  'Beni': { code: 'TDD', name: 'Aeropuerto Teniente Jorge Henrich Arauz', city: 'Trinidad', department: 'Beni', rates: [{ vehicle: 'Sedan Confort', price: 'Bs 85' }, { vehicle: 'SUV Confort', price: 'Bs 115' }, { vehicle: 'Sedan VIP', price: 'Bs 170' }, { vehicle: 'Van VIP', price: 'Bs 220' }], tracking: 'Disponible 24/7', phone: '+591 3 4622222' },
  'Pando': { code: 'CIJ', name: 'Aeropuerto Capitán Aníbal Arab', city: 'Cobija', department: 'Pando', rates: [{ vehicle: 'Sedan Confort', price: 'Bs 90' }, { vehicle: 'SUV Confort', price: 'Bs 120' }, { vehicle: 'Sedan VIP', price: 'Bs 180' }, { vehicle: 'Van VIP', price: 'Bs 230' }], tracking: 'Disponible 24/7', phone: '+591 3 8422222' },
}

/* Simplified SVG paths for Bolivia departments — designed to form
   a recognizable Bolivia silhouette (viewBox 0 0 500 380).
   Each department also carries accurate airport-pin coordinates
   matching the real geographic location of each city. */
const departments = [
  {
    name: 'Pando',
    d: 'M 65,40 L 135,28 L 160,55 L 145,90 L 105,100 L 70,85 Z',
    cx: '100', cy: '62',
  },
  {
    name: 'Beni',
    d: 'M 135,28 L 270,38 L 295,90 L 270,135 L 200,145 L 160,110 L 145,90 L 160,55 Z',
    cx: '215', cy: '88',
  },
  {
    name: 'La Paz',
    d: 'M 70,85 L 145,90 L 160,110 L 180,160 L 155,210 L 95,205 L 75,160 Z',
    cx: '125', cy: '148',
  },
  {
    name: 'Cochabamba',
    d: 'M 160,110 L 200,145 L 270,135 L 285,180 L 250,215 L 195,215 L 180,160 Z',
    cx: '225', cy: '170',
  },
  {
    name: 'Santa Cruz',
    d: 'M 270,38 L 410,55 L 445,120 L 440,200 L 410,250 L 340,265 L 290,235 L 285,180 L 270,135 L 295,90 Z',
    cx: '370', cy: '165',
  },
  {
    name: 'Oruro',
    d: 'M 75,160 L 155,210 L 180,235 L 165,275 L 105,275 L 75,235 Z',
    cx: '120', cy: '225',
  },
  {
    name: 'Potosí',
    d: 'M 105,275 L 165,275 L 230,265 L 250,300 L 230,335 L 165,345 L 120,320 Z',
    cx: '180', cy: '305',
  },
  {
    name: 'Chuquisaca',
    d: 'M 230,265 L 290,235 L 320,260 L 310,310 L 270,320 L 250,300 Z',
    cx: '275', cy: '280',
  },
  {
    name: 'Tarija',
    d: 'M 165,345 L 230,335 L 270,320 L 310,310 L 290,365 L 210,370 L 175,360 Z',
    cx: '235', cy: '345',
  },
]

/* Map department names → airport keys (some airports use the city
   name rather than the department name, e.g. Sucre/Chuquisaca). */
const deptToAirport: Record<string, string> = {
  'La Paz': 'La Paz',
  'Cochabamba': 'Cochabamba',
  'Santa Cruz': 'Santa Cruz',
  'Pando': 'Pando',
  'Beni': 'Beni',
  'Oruro': 'Oruro',
  'Potosí': 'Potosí',
  'Chuquisaca': 'Sucre',
  'Tarija': 'Tarija',
}

export function BoliviaMap() {
  const [selected, setSelected] = useState<string | null>(null)
  const selectedAirport = selected ? airports[selected] : null

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      {/* Map */}
      <div className="relative">
        <svg viewBox="0 0 500 380" className="w-full max-w-lg mx-auto">
          {/* Background glow */}
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="deptFill" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0077BD" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#00E676" stopOpacity="0.15" />
            </linearGradient>
            <linearGradient id="deptActive" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0077BD" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#00E676" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {departments.map((dept) => {
            const isSelected = selected === dept.name
            const airportKey = deptToAirport[dept.name]
            const airport = airportKey ? airports[airportKey] : null
            return (
              <g key={dept.name}>
                <path
                  d={dept.d}
                  fill={isSelected ? 'url(#deptActive)' : 'url(#deptFill)'}
                  stroke={isSelected ? '#00E676' : 'rgba(255,255,255,0.18)'}
                  strokeWidth={isSelected ? 2 : 1}
                  className="cursor-pointer transition-all duration-300"
                  style={{ filter: isSelected ? 'url(#glow)' : 'none' }}
                  onMouseEnter={() => setSelected(dept.name)}
                  onClick={() => setSelected(isSelected ? null : dept.name)}
                />
                {/* Airport pin — pink/magenta plane marker like image 1 */}
                {airport && (
                  <g
                    className="cursor-pointer"
                    onClick={() => setSelected(isSelected ? null : dept.name)}
                  >
                    {/* halo */}
                    <circle
                      cx={dept.cx} cy={dept.cy}
                      r={isSelected ? 11 : 8}
                      fill="#FF1B8D"
                      opacity={isSelected ? 0.25 : 0.15}
                      className="transition-all duration-300"
                    />
                    {/* main marker */}
                    <circle
                      cx={dept.cx} cy={dept.cy}
                      r={isSelected ? 7 : 5}
                      fill="#FF1B8D"
                      stroke="#ffffff"
                      strokeWidth="1.2"
                      className="transition-all duration-300"
                      style={{ filter: isSelected ? 'url(#glow)' : 'none' }}
                    />
                    {/* plane glyph (white) */}
                    <text
                      x={dept.cx}
                      y={Number(dept.cy) + 2.5}
                      textAnchor="middle"
                      fontSize="7"
                      fill="#ffffff"
                      fontWeight="bold"
                      className="pointer-events-none select-none"
                    >
                      ✈
                    </text>
                    {/* Airport code + city label */}
                    <text
                      x={Number(dept.cx) + 11}
                      y={Number(dept.cy) + 3.5}
                      className="text-[9px] font-bold pointer-events-none select-none"
                      fill={isSelected ? '#00E676' : 'rgba(255,255,255,0.85)'}
                    >
                      {airport.code} · {airport.city}
                    </text>
                  </g>
                )}
              </g>
            )
          })}
        </svg>
        <p className="text-center text-white/30 text-xs mt-4">Haz click en un departamento para ver la información del aeropuerto</p>
      </div>

      {/* Airport Info Panel */}
      <div className="min-h-[400px]">
        {selectedAirport ? (
          <div className="p-6 md:p-8 rounded-3xl bg-white/[0.03] border border-[#00E676]/10 transition-all duration-500">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#0077BD]/10 flex items-center justify-center">
                <Plane className="w-6 h-6 text-[#0077BD]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{selectedAirport.name}</h3>
                <p className="text-sm text-white/40">{selectedAirport.city}, {selectedAirport.department}</p>
              </div>
              <span className="ml-auto px-3 py-1 rounded-full bg-[#00E676]/10 text-[#00E676] text-sm font-bold">{selectedAirport.code}</span>
            </div>

            {/* Rates */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-white/60 mb-3 flex items-center gap-2">
                <DollarSign className="w-4 h-4" /> Tarifas de Traslado
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {selectedAirport.rates.map((rate) => (
                  <div key={rate.vehicle} className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <p className="text-xs text-white/40">{rate.vehicle}</p>
                    <p className="text-lg font-bold text-[#00E676]">{rate.price}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Flight Tracking */}
            <div className="flex items-center gap-3 p-4 rounded-xl bg-[#0077BD]/5 border border-[#0077BD]/10 mb-4">
              <Clock className="w-5 h-5 text-[#0077BD]" />
              <div>
                <p className="text-sm font-medium text-white/70">Seguimiento de Vuelo</p>
                <p className="text-xs text-white/40">{selectedAirport.tracking}</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <Phone className="w-5 h-5 text-[#00E676]" />
              <div>
                <p className="text-sm font-medium text-white/70">Reservar por Teléfono</p>
                <p className="text-xs text-white/40">{selectedAirport.phone}</p>
              </div>
            </div>

            {/* CTA */}
            <a href="#reserva-aeropuerto" className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-black bg-[#00E676] hover:bg-[#00ff88] transition-all shadow-[0_0_20px_rgba(0,230,118,0.2)]">
              Reservar Transfer <MapPin className="w-4 h-4" />
            </a>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-8 rounded-3xl bg-white/[0.02] border border-white/[0.04] border-dashed">
            <MapPin className="w-12 h-12 text-white/10 mb-4" />
            <p className="text-white/30 text-center">Selecciona un departamento en el mapa para ver la información del aeropuerto y las tarifas</p>
          </div>
        )}
      </div>
    </div>
  )
}
