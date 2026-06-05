'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale'
  delay?: number
  duration?: number
  threshold?: number
}

export function ScrollReveal({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 800,
  threshold = 0.1,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setRevealed(true), delay)
        }
      },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [delay, threshold])

  const transforms: Record<string, { hidden: string; visible: string }> = {
    up: { hidden: 'translateY(40px)', visible: 'translateY(0)' },
    down: { hidden: 'translateY(-40px)', visible: 'translateY(0)' },
    left: { hidden: 'translateX(-60px)', visible: 'translateX(0)' },
    right: { hidden: 'translateX(60px)', visible: 'translateX(0)' },
    scale: { hidden: 'scale(0.85)', visible: 'scale(1)' },
  }

  const transform = transforms[direction] || transforms.up

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: revealed ? 1 : 0,
        transform: revealed ? transform.visible : transform.hidden,
        transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
      }}
    >
      {children}
    </div>
  )
}

/* ─── Floating Particles Background ─── */
interface Particle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  color: string
}

export function FloatingParticles({ count = 20 }: { count?: number }) {
  const [mounted, setMounted] = useState(false)
  const [particles] = useState<Particle[]>(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 4,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 5,
      color: i % 3 === 0 ? '#00E676' : i % 3 === 1 ? '#0077BD' : '#71B124',
    }))
  )

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full animate-float"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            opacity: 0.15,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

/* ─── Page Loading Screen ─── */
export function LoadingScreen() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  if (!loading) return null

  return (
    <div
      className="fixed inset-0 z-[100] bg-[#0a0e17] flex items-center justify-center transition-opacity duration-500"
      style={{ opacity: loading ? 1 : 0 }}
    >
      <div className="flex flex-col items-center gap-6">
        <img
          src="/logo-ecotaxi.webp"
          alt="Ecotaxi"
          className="h-12 w-auto object-contain animate-pulse"
        />
        <div className="flex items-center gap-2">
          <div className="loading-dot w-2 h-2 rounded-full bg-[#00E676]" />
          <div className="loading-dot w-2 h-2 rounded-full bg-[#0077BD]" />
          <div className="loading-dot w-2 h-2 rounded-full bg-[#71B124]" />
        </div>
      </div>
    </div>
  )
}
