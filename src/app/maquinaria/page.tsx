'use client'

import { Navbar } from '@/components/ecotaxi/navbar'
import { Footer } from '@/components/ecotaxi/footer'
import { MaquinariaPageContent } from '@/components/ecotaxi/maquinaria-page'
import { ServiceSchema } from '@/components/ecotaxi/service-schema'

export default function MaquinariaPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0e17]">
      <Navbar />
      <main className="flex-1">
        <ServiceSchema
          name="Alquiler de Maquinaria Pesada EcoTaxi Bolivia"
          description="Alquiler de maquinaria amarilla por hora o contrato: volqueta, bobcat, excavadora, retroexcavadora, gallinita, motoniveladora y aplanadora. Con operador profesional incluido y monitoreo GPS."
          url="https://ecotaxi.bo/maquinaria"
        />
        <MaquinariaPageContent />
      </main>
      <Footer />
    </div>
  )
}
