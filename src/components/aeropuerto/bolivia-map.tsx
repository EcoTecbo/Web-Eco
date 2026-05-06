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

/* Simplified SVG paths for Bolivia departments */
const departments = [
  { name: 'La Paz', d: 'M120,60 L180,50 L200,80 L190,130 L160,150 L110,140 L90,100 Z', cx: '145', cy: '100' },
  { name: 'Cochabamba', d: 'M190,130 L240,110 L270,140 L260,180 L220,190 L190,170 Z', cx: '225', cy: '150' },
  { name: 'Santa Cruz', d: 'M220,190 L270,180 L320,160 L360,190 L370,240 L340,280 L280,270 L230,240 L210,210 Z', cx: '290', cy: '225' },
  { name: 'Pando', d: 'M60,20 L120,15 L140,40 L120,60 L90,60 L60,45 Z', cx: '95', cy: '38' },
  { name: 'Beni', d: 'M140,40 L200,35 L260,50 L270,100 L260,140 L220,150 L190,130 L160,150 L120,130 L130,80 Z', cx: '200', cy: '95' },
  { name: 'Oruro', d: 'M90,100 L120,130 L110,140 L130,170 L110,190 L80,180 L70,140 Z', cx: '100', cy: '150' },
  { name: 'Potosí', d: 'M130,170 L160,150 L190,170 L200,210 L180,240 L140,230 L110,200 L110,190 Z', cx: '155', cy: '195' },
  { name: 'Chuquisaca', d: 'M190,170 L220,190 L210,210 L200,230 L180,240 L175,210 Z', cx: '197', cy: '205' },
  { name: 'Tarija', d: 'M140,230 L180,240 L200,260 L190,300 L160,310 L130,290 L120,260 Z', cx: '160', cy: '270' },
]

export function BoliviaMap() {
  const [selected, setSelected] = useState<string | null>(null)
  const selectedAirport = selected ? airports[selected] : null

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      {/* Map */}
      <div className="relative">
        <svg viewBox="0 0 420 340" className="w-full max-w-md mx-auto">
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
            return (
              <g key={dept.name}>
                <path
                  d={dept.d}
                  fill={isSelected ? 'url(#deptActive)' : 'url(#deptFill)'}
                  stroke={isSelected ? '#00E676' : 'rgba(255,255,255,0.15)'}
                  strokeWidth={isSelected ? 2 : 1}
                  className="cursor-pointer transition-all duration-300"
                  style={{ filter: isSelected ? 'url(#glow)' : 'none' }}
                  onMouseEnter={() => setSelected(dept.name)}
                  onClick={() => setSelected(isSelected ? null : dept.name)}
                />
                {/* Airport pin */}
                {airports[dept.name] && (
                  <g
                    className="cursor-pointer"
                    onClick={() => setSelected(isSelected ? null : dept.name)}
                  >
                    <circle
                      cx={dept.cx} cy={dept.cy}
                      r={isSelected ? 6 : 4}
                      fill={isSelected ? '#00E676' : '#0077BD'}
                      className="transition-all duration-300"
                      style={{ filter: isSelected ? 'url(#glow)' : 'none' }}
                    />
                    {/* Airport code label */}
                    <text
                      x={Number(dept.cx) + 10}
                      y={Number(dept.cy) + 4}
                      className="text-[10px] font-bold pointer-events-none"
                      fill={isSelected ? '#00E676' : 'rgba(255,255,255,0.4)'}
                    >
                      {airports[dept.name].code}
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
