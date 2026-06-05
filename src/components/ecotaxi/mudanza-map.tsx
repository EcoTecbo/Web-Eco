'use client'

import { useEffect, useState, useCallback } from 'react'
import L from 'leaflet'
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

/* ══════════════════════════════════════════════════════
   CUSTOM MARKER ICONS
   ══════════════════════════════════════════════════════ */
const originIcon = L.divIcon({
  html: `<div style="background:#00E676;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:3px solid #fff;box-shadow:0 0 10px rgba(0,230,118,0.5)"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0a0e17" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></div>`,
  className: '',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
})

const destIcon = L.divIcon({
  html: `<div style="background:#818CF8;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:3px solid #fff;box-shadow:0 0 10px rgba(129,140,248,0.5)"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0a0e17" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg></div>`,
  className: '',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
})

/* ══════════════════════════════════════════════════════
   INTERFACES
   ══════════════════════════════════════════════════════ */
interface MapPosition {
  lat: number
  lng: number
}

interface MudanzaMapProps {
  origin: MapPosition
  destination: MapPosition
  onOriginChange: (pos: MapPosition, address?: string) => void
  onDestinationChange: (pos: MapPosition, address?: string) => void
  onDistanceChange: (distance: number) => void
}

/* ══════════════════════════════════════════════════════
   REVERSE GEOCODE HELPER
   ══════════════════════════════════════════════════════ */
async function reverseGeocode(lat: number, lng: number): Promise<string> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
      { headers: { 'Accept-Language': 'es' } }
    )
    if (res.ok) {
      const data = await res.json()
      return data.display_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`
    }
  } catch {
    // fallback
  }
  return `${lat.toFixed(4)}, ${lng.toFixed(4)}`
}

/* ══════════════════════════════════════════════════════
   MARKER DRAG HANDLER
   ══════════════════════════════════════════════════════ */
function DraggableMarker({
  position,
  icon,
  onDragEnd,
}: {
  position: MapPosition
  icon: L.DivIcon
  onDragEnd: (pos: MapPosition, address: string) => void
}) {
  const handleDragEnd = useCallback(async (e: L.DragEndEvent) => {
    const marker = e.target as L.Marker
    const pos = marker.getLatLng()
    const address = await reverseGeocode(pos.lat, pos.lng)
    onDragEnd({ lat: pos.lat, lng: pos.lng }, address)
  }, [onDragEnd])

  return (
    <Marker
      position={[position.lat, position.lng]}
      icon={icon}
      draggable
      eventHandlers={{ dragend: handleDragEnd }}
    />
  )
}

/* ══════════════════════════════════════════════════════
   MAP CLICK / ROUTE CALCULATOR
   ══════════════════════════════════════════════════════ */
function MapController({
  origin,
  destination,
  onDistanceChange,
}: {
  origin: MapPosition
  destination: MapPosition
  onDistanceChange: (distance: number) => void
}) {
  const map = useMap()

  useEffect(() => {
    // Calculate distance using OSRM when markers change
    const calcRoute = async () => {
      try {
        const res = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${origin.lng},${origin.lat};${destination.lng},${destination.lat}?overview=false`
        )
        if (res.ok) {
          const data = await res.json()
          if (data.routes && data.routes.length > 0) {
            const distKm = Math.round(data.routes[0].distance / 100) / 10 // meters to km, 1 decimal
            onDistanceChange(distKm)
          }
        }
      } catch {
        // fallback: haversine
        const R = 6371
        const dLat = ((destination.lat - origin.lat) * Math.PI) / 180
        const dLon = ((destination.lng - origin.lng) * Math.PI) / 180
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos((origin.lat * Math.PI) / 180) *
          Math.cos((destination.lat * Math.PI) / 180) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2)
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        onDistanceChange(Math.round(R * c * 10) / 10)
      }
    }
    calcRoute()
  }, [origin, destination, onDistanceChange])

  // Fit bounds when both markers are set
  useEffect(() => {
    if (origin.lat !== 0 && destination.lat !== 0) {
      const bounds = L.latLngBounds(
        [origin.lat, origin.lng],
        [destination.lat, destination.lng]
      )
      map.fitBounds(bounds, { padding: [50, 50] })
    }
  }, [origin, destination, map])

  return null
}

/* ══════════════════════════════════════════════════════
   SEARCH BOX
   ══════════════════════════════════════════════════════ */
function SearchBox({
  onSelect,
  placeholder,
}: {
  onSelect: (lat: number, lng: number, address: string) => void
  placeholder: string
}) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Array<{ display_name: string; lat: string; lon: string }>>([])
  const [searching, setSearching] = useState(false)

  const handleSearch = useCallback(async () => {
    if (!query.trim() || query.length < 3) return
    setSearching(true)
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=bo&limit=5`,
        { headers: { 'Accept-Language': 'es' } }
      )
      if (res.ok) {
        const data = await res.json()
        setResults(data)
      }
    } catch {
      // ignore
    } finally {
      setSearching(false)
    }
  }, [query])

  return (
    <div className="relative">
      <div className="flex gap-1">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
          placeholder={placeholder}
          className="flex-1 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-xs placeholder-white/20 outline-none focus:border-[#00E676]/30"
        />
        <button
          onClick={handleSearch}
          disabled={searching}
          className="px-3 py-2 rounded-lg bg-[#00E676]/10 border border-[#00E676]/20 text-[#00E676] text-xs hover:bg-[#00E676]/20 transition-colors disabled:opacity-40"
        >
          {searching ? '...' : 'Buscar'}
        </button>
      </div>
      {results.length > 0 && (
        <div className="absolute z-[1000] top-full left-0 right-0 mt-1 bg-[#1a1f2e] border border-white/[0.08] rounded-lg overflow-hidden max-h-48 overflow-y-auto">
          {results.map((r, i) => (
            <button
              key={i}
              onClick={() => {
                onSelect(parseFloat(r.lat), parseFloat(r.lon), r.display_name)
                setResults([])
                setQuery(r.display_name.split(',').slice(0, 2).join(','))
              }}
              className="w-full text-left px-3 py-2 text-xs text-white/70 hover:bg-white/[0.05] border-b border-white/[0.04] last:border-0"
            >
              {r.display_name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/* ══════════════════════════════════════════════════════
   MAIN MAP COMPONENT
   ══════════════════════════════════════════════════════ */
export default function MudanzaMap({
  origin,
  destination,
  onOriginChange,
  onDestinationChange,
  onDistanceChange,
}: MudanzaMapProps) {
  const [mapDistance, setMapDistance] = useState<number | null>(null)

  const handleDistanceCalc = useCallback((dist: number) => {
    setMapDistance(dist)
    onDistanceChange(dist)
  }, [onDistanceChange])

  const defaultCenter: [number, number] = [-17.7833, -63.1821] // Santa Cruz, Bolivia

  return (
    <div className="space-y-3">
      {/* Search boxes */}
      <div className="grid grid-cols-2 gap-3">
        <SearchBox
          placeholder="Buscar origen..."
          onSelect={(lat, lng, address) => onOriginChange({ lat, lng }, address)}
        />
        <SearchBox
          placeholder="Buscar destino..."
          onSelect={(lat, lng, address) => onDestinationChange({ lat, lng }, address)}
        />
      </div>

      {/* Map */}
      <div className="rounded-xl overflow-hidden border border-white/[0.08]" style={{ height: '350px' }}>
        <MapContainer
          center={defaultCenter}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <DraggableMarker
            position={origin}
            icon={originIcon}
            onDragEnd={(pos, address) => onOriginChange(pos, address)}
          />
          <DraggableMarker
            position={destination}
            icon={destIcon}
            onDragEnd={(pos, address) => onDestinationChange(pos, address)}
          />
          <MapController
            origin={origin}
            destination={destination}
            onDistanceChange={handleDistanceCalc}
          />
        </MapContainer>
      </div>

      {/* Distance display */}
      {mapDistance !== null && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#00E676]/5 border border-[#00E676]/10">
          <span className="text-xs text-white/40">Distancia por ruta:</span>
          <span className="text-sm font-bold text-[#00E676]">{mapDistance} km</span>
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center gap-4 text-xs text-white/30">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#00E676]" />
          Origen (arrastrá)
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#818CF8]" />
          Destino (arrastrá)
        </div>
      </div>
    </div>
  )
}
