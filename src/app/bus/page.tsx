'use client'

import { Navbar } from '@/components/ecotaxi/navbar'
import { Footer } from '@/components/ecotaxi/footer'
import { BusPageContent } from '@/components/ecotaxi/bus-page'

export default function BusPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0e17]">
      <Navbar />
      <main className="flex-1">
        <BusPageContent />
      </main>
      <Footer />
    </div>
  )
}
