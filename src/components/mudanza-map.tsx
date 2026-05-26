'use client'

import { useCallback, useEffect, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import {
  MapContainer, TileLayer, Marker, Popup, Polyline, useMapEvents,
} from 'react-leaflet'

// Fix default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

// Custom icons with color filters
const originIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  className: 'origin-marker',
})

const destIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  className: 'dest-marker',
})

const stopIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  className: 'stop-marker',
})

interface LatLng {
  lat: number
  lng: number
}

interface IntermediateStop {
  id: string
  latlng: LatLng
  address: string
}

interface NominatimResult {
  display_name: string
  lat: string
  lon: string
}

/* Nominatim search */
export async function searchAddress(query: string): Promise<NominatimResult[]> {
  if (!query || query.length < 3) return []
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=bo&limit=5`,
      { headers: { 'Accept-Language': 'es' } }
    )
    if (!res.ok) return []
    return await res.json()
  } catch {
    return []
  }
}

/* OSRM route calculation */
export async function calculateRoute(
  origin: LatLng,
  destination: LatLng,
  stops: LatLng[]
): Promise<{ distance: number; duration: number; geometry: [number, number][] } | null> {
  const coords = [origin, ...stops, destination]
    .map(c => `${c.lng},${c.lat}`)
    .join(';')
  try {
    const res = await fetch(
      `https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&steps=true`
    )
    if (!res.ok) return null
    const data = await res.json()
    if (!data.routes || data.routes.length === 0) return null
    const route = data.routes[0]
    const geometry: [number, number][] = []
    if (route.geometry) {
      if (typeof route.geometry === 'string') {
        const decoded = decodePolyline(route.geometry)
        geometry.push(...decoded)
      } else if (Array.isArray(route.geometry)) {
        for (const coord of route.geometry) {
          if (Array.isArray(coord) && coord.length >= 2) {
            geometry.push([coord[1], coord[0]])
          }
        }
      }
    }
    return {
      distance: route.distance / 1000,
      duration: route.duration / 60,
      geometry,
    }
  } catch {
    return null
  }
}

function decodePolyline(encoded: string): [number, number][] {
  const points: [number, number][] = []
  let index = 0
  let lat = 0
  let lng = 0
  while (index < encoded.length) {
    let byte: number
    let shift = 0
    let result = 0
    do {
      byte = encoded.charCodeAt(index++) - 63
      result |= (byte & 0x1f) << shift
      shift += 5
    } while (byte >= 0x20)
    const dlat = ((result & 1) !== 0 ? ~(result >> 1) : (result >> 1))
    lat += dlat
    shift = 0
    result = 0
    do {
      byte = encoded.charCodeAt(index++) - 63
      result |= (byte & 0x1f) << shift
      shift += 5
    } while (byte >= 0x20)
    const dlng = ((result & 1) !== 0 ? ~(result >> 1) : (result >> 1))
    lng += dlng
    points.push([lat / 1e5, lng / 1e5])
  }
  return points
}

/* Map click events handler */
function MapClickHandler({ onMapClick }: { onMapClick: (latlng: LatLng) => void }) {
  useMapEvents({
    click: (e) => {
      onMapClick({ lat: e.latlng.lat, lng: e.latlng.lng })
    },
  })
  return null
}

/* Main map component */
interface MudanzaMapProps {
  origin: LatLng | null
  destination: LatLng | null
  intermediateStops: IntermediateStop[]
  originAddress: string
  destAddress: string
  routeGeometry: [number, number][]
  mapSelectionMode: 'origin' | 'destination' | 'stop'
  onMapClick: (latlng: LatLng) => void
}

export default function MudanzaMap({
  origin,
  destination,
  intermediateStops,
  originAddress,
  destAddress,
  routeGeometry,
  mapSelectionMode,
  onMapClick,
}: MudanzaMapProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  if (!mounted) return null

  return (
    <>
      <MapContainer
        center={[-17.7833, -63.1821]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        className="z-20"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler onMapClick={onMapClick} />
        {origin && (
          <Marker position={[origin.lat, origin.lng]} icon={originIcon}>
            <Popup>
              <div className="text-xs">
                <span className="font-bold text-green-600">🟢 Origen</span>
                <br />{originAddress}
              </div>
            </Popup>
          </Marker>
        )}
        {destination && (
          <Marker position={[destination.lat, destination.lng]} icon={destIcon}>
            <Popup>
              <div className="text-xs">
                <span className="font-bold text-red-600">🏁 Destino</span>
                <br />{destAddress}
              </div>
            </Popup>
          </Marker>
        )}
        {intermediateStops.map((stop) => (
          <Marker key={stop.id} position={[stop.latlng.lat, stop.latlng.lng]} icon={stopIcon}>
            <Popup>
              <div className="text-xs">
                <span className="font-bold text-blue-500">🔵 Parada</span>
                <br />{stop.address}
              </div>
            </Popup>
          </Marker>
        ))}
        {routeGeometry.length > 0 && (
          <Polyline positions={routeGeometry} color="#0077BD" weight={4} opacity={0.8} />
        )}
      </MapContainer>
      {/* Map overlay instruction */}
      <div className="absolute bottom-3 left-3 right-3 z-30 pointer-events-none">
        <div className="bg-[#0a0e17]/80 backdrop-blur-sm rounded-lg px-3 py-2 text-xs text-white/50 text-center">
          Haz clic en el mapa para colocar el marcador del{' '}
          <span className={mapSelectionMode === 'origin' ? 'text-[#00E676] font-semibold' : 'text-white/30'}>origen</span>,{' '}
          <span className={mapSelectionMode === 'destination' ? 'text-red-400 font-semibold' : 'text-white/30'}>destino</span> o{' '}
          <span className={mapSelectionMode === 'stop' ? 'text-[#4FC3F7] font-semibold' : 'text-white/30'}>parada</span>
        </div>
      </div>
    </>
  )
}
