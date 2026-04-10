'use client'

import { Navbar } from '@/components/ecotaxi/navbar'
import { Hero } from '@/components/ecotaxi/hero'
import { Services } from '@/components/ecotaxi/services'
import { Fleet } from '@/components/ecotaxi/fleet'
import { Arbolimetro } from '@/components/ecotaxi/arbolimetro'
import { Reservas } from '@/components/ecotaxi/reservas'
import { Footer } from '@/components/ecotaxi/footer'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0e17]">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Services />
        <Fleet />
        <Arbolimetro />
        <Reservas />
      </main>
      <Footer />
    </div>
  )
}
