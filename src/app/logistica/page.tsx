'use client'

import { Navbar } from '@/components/ecotaxi/navbar'
import { Footer } from '@/components/ecotaxi/footer'
import { LogisticaPage } from '@/components/ecotaxi/logistica-page'

export default function Logistica() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0e17]">
      <Navbar />
      <main className="flex-1">
        <LogisticaPage />
      </main>
      <Footer />
    </div>
  )
}
