'use client'

import { Globe, Maximize2, Minimize2 } from 'lucide-react'
import { useEffect, useRef, useState, useCallback } from 'react'

export function Reservas() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const fullscreenRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const toggleFullscreen = useCallback(() => {
    if (!fullscreenRef.current) return
    if (!document.fullscreenElement) {
      fullscreenRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true)
      }).catch(() => {
        window.open('https://id3251.tm.taxi:58443/?cid=1', '_blank')
      })
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false)
      })
    }
  }, [])

  // Listen for fullscreen changes (including ESC key)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  // ESC key handler for fullscreen exit
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && document.fullscreenElement) {
        document.exitFullscreen().then(() => {
          setIsFullscreen(false)
        })
      }
    }
    document.addEventListener('keydown', handleEscKey)
    return () => document.removeEventListener('keydown', handleEscKey)
  }, [])

  return (
    <section id="reservas" ref={sectionRef} className="relative py-24 md:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1320] to-[#0a0e17]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#0077BD]/10 blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0077BD]/10 border border-[#0077BD]/20 mb-4">
            <Globe className="w-4 h-4 text-[#0077BD]" />
            <span className="text-sm text-[#0077BD]">Reserva Online</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Reserva Tu{' '}
            <span className="bg-gradient-to-r from-[#0077BD] to-[#00E676] bg-clip-text text-transparent">
              ECOTAXI
            </span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            Reserva tu taxi de forma rápida y segura. Elige tu punto de partida, destino y vehículo en segundos.
          </p>
        </div>

        {/* Iframe Container with Fullscreen */}
        <div
          ref={fullscreenRef}
          className={`relative max-w-4xl mx-auto transition-all duration-1000 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          } ${isFullscreen ? 'bg-[#0a0e17] p-4' : ''}`}
        >
          <div className="relative p-1 rounded-3xl bg-gradient-to-r from-[#0077BD]/50 via-[#00E676]/50 to-[#0077BD]/50">
            <div className="rounded-[22px] overflow-hidden bg-[#0a0e17]">
              {/* Toolbar */}
              <div className="flex items-center justify-between px-4 sm:px-6 pt-4 sm:pt-5">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  <span className="text-xs text-white/20 ml-2 hidden sm:inline">id3251.tm.taxi</span>
                </div>
                <div className="flex items-center gap-2">
                  {isFullscreen && (
                    <span className="text-xs text-white/30 hidden sm:inline">Presiona ESC para salir</span>
                  )}
                  <button
                    onClick={toggleFullscreen}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08] text-white/70 hover:text-white hover:bg-white/[0.1] hover:border-white/20 transition-all duration-300 text-xs"
                    title={isFullscreen ? 'Salir de pantalla completa (ESC)' : 'Pantalla completa'}
                  >
                    {isFullscreen ? (
                      <>
                        <Minimize2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Reducir</span>
                      </>
                    ) : (
                      <>
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Pantalla completa</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
              {/* Iframe */}
              <div className="p-4 sm:p-6 pt-3">
                <iframe
                  src="https://id3251.tm.taxi:58443/?cid=1"
                  title="Reservas Ecotaxi"
                  className={`w-full rounded-2xl border-0 bg-white/5 ${
                    isFullscreen ? 'h-[calc(100vh-120px)]' : 'h-[600px] sm:h-[700px]'
                  }`}
                  loading="lazy"
                  allow="geolocation"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
