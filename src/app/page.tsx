'use client'

import { Navbar } from '@/components/ecotaxi/navbar'
import { Hero } from '@/components/ecotaxi/hero'
import { Services } from '@/components/ecotaxi/services'
import { Fleet } from '@/components/ecotaxi/fleet'
import { ConductorSection } from '@/components/ecotaxi/conductor-section'
import { Testimonials } from '@/components/ecotaxi/testimonials'
import { Arbolimetro } from '@/components/ecotaxi/arbolimetro'
import { Multicanal } from '@/components/ecotaxi/multicanal'
import { Reservas } from '@/components/ecotaxi/reservas'
import { Footer } from '@/components/ecotaxi/footer'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0e17]">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Services />
        <Fleet />
        <Arbolimetro />
        <Multicanal />
        <Reservas />
        <ConductorSection />
        <Testimonials />
      </main>
      <Footer />
    </div>
  )
}
