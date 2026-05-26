'use client'

import { Navbar } from '@/components/ecotaxi/navbar'
import { Footer } from '@/components/ecotaxi/footer'
import { MudanzaPageContent } from '@/components/ecotaxi/mudanza-page'
import { ServiceSchema } from '@/components/ecotaxi/service-schema'

export default function MudanzaPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0e17]">
      <Navbar />
      <main className="flex-1">
        <ServiceSchema
          name="Servicio de Mudanza EcoTaxi Bolivia"
          description="Mudanzas locales, provinciales y nacionales. De casa, oficina y especial. Calculadora de mudanza para elegir el vehículo correcto según tu volumen."
          url="https://ecotaxi.bo/mudanza"
        />
        <MudanzaPageContent />
      </main>
      <Footer />
    </div>
  )
}
