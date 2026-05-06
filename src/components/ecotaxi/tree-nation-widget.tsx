'use client'

import { useState } from 'react'
import Script from 'next/script'
import { TreePine, X, Leaf } from 'lucide-react'

export function TreeNationFloatingWidget() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 group flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-[#00E676] to-[#71B124] text-black font-semibold shadow-[0_0_30px_rgba(0,230,118,0.4)] hover:shadow-[0_0_50px_rgba(0,230,118,0.6)] hover:scale-105 transition-all duration-300"
        aria-label="Tree-Nation Widget"
      >
        <TreePine className="w-5 h-5 animate-pulse" />
        <span className="text-sm font-bold whitespace-nowrap">
          {isOpen ? 'Cerrar' : 'Árboles Plantados'}
        </span>
      </button>

      {/* Expanded Panel */}
      <div
        className={`fixed bottom-20 right-6 z-50 transition-all duration-500 ${
          isOpen
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
            : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
        }`}
      >
        <div className="relative w-[320px] sm:w-[360px] rounded-2xl bg-[#0d1320]/95 border border-[#00E676]/20 backdrop-blur-xl shadow-[0_0_40px_rgba(0,230,118,0.15)] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <Leaf className="w-5 h-5 text-[#00E676]" />
              <span className="text-sm font-semibold text-white">Nuestro Impacto Ecológico</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Tree-Nation Widget */}
          <div className="p-4">
            <div className="flex justify-center">
              <div
                data-widget-type="tree-counter"
                data-tree-nation-code="f35060a6da2c0369"
                data-lang="es"
                data-theme="dark"
              />
            </div>
          </div>

          {/* Footer info */}
          <div className="px-4 pb-4">
            <div className="p-3 rounded-xl bg-[#00E676]/5 border border-[#00E676]/10">
              <p className="text-xs text-white/50 text-center leading-relaxed">
                Ecotaxi es la primera empresa de transporte en Bolivia con plan de
                medición, reducción y neutralización de emisiones GEI.
              </p>
            </div>
            <a
              href="https://tree-nation.com/profile/f35060a6da2c0369"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center gap-2 text-xs text-[#00E676] hover:text-[#00ff88] transition-colors"
            >
              <TreePine className="w-3 h-3" />
              Ver en Tree-Nation
            </a>
          </div>
        </div>
      </div>

      {/* Tree-Nation Script */}
      <Script
        src="https://widgets.tree-nation.com/js/widgets/v3/widgets.min.js"
        strategy="afterInteractive"
      />
    </>
  )
}
