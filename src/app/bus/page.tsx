'use client'

import { Navbar } from '@/components/ecotaxi/navbar'
import { Footer } from '@/components/ecotaxi/footer'
import { BusPageContent } from '@/components/ecotaxi/bus-page'
import { ServiceSchema } from '@/components/ecotaxi/service-schema'

export default function BusPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0e17]">
      <Navbar />
      <main className="flex-1">
        <ServiceSchema
          name="Transporte Grupal y Viajes Especiales EcoTaxi Bolivia"
          description="Servicio de buses, minibuses y micros para transporte grupal, viajes especiales, traslados aeropuerto, city tours y excursiones. Chofer profesional y máxima comodidad."
          url="https://ecotaxi.bo/bus"
        />
        <BusPageContent />
      </main>
      <Footer />
    </div>
  )
}
