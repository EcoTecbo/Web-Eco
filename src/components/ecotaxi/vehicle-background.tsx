'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
  type: 'dot' | 'line'
  angle: number
  speed: number
}

export function VehicleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const colors = [
      'rgba(0, 119, 189, ',   // Blue #0077BD
      'rgba(0, 230, 118, ',   // Green #00E676
      'rgba(113, 177, 36, ',  // Eco green #71B124
    ]

    const particles: Particle[] = []
    const PARTICLE_COUNT = 35

    // Initialize particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const colorBase = colors[Math.floor(Math.random() * colors.length)]
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.15 + 0.03,
        color: colorBase,
        type: Math.random() > 0.7 ? 'line' : 'dot',
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.5 + 0.1,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const p of particles) {
        // Update position
        p.angle += 0.002
        p.x += p.vx + Math.sin(p.angle) * 0.1
        p.y += p.vy + Math.cos(p.angle) * 0.05

        // Wrap around screen
        if (p.x < -20) p.x = canvas.width + 20
        if (p.x > canvas.width + 20) p.x = -20
        if (p.y < -20) p.y = canvas.height + 20
        if (p.y > canvas.height + 20) p.y = -20

        // Draw
        const alpha = p.opacity * (0.7 + 0.3 * Math.sin(p.angle * 2))
        ctx.globalAlpha = alpha

        if (p.type === 'dot') {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fillStyle = p.color + '1)'
          ctx.fill()

          // Glow
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2)
          ctx.fillStyle = p.color + '0.1)'
          ctx.fill()
        } else {
          // Moving line (like a vehicle trail)
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(p.x - p.vx * 60, p.y - p.vy * 60)
          ctx.strokeStyle = p.color + '0.3)'
          ctx.lineWidth = p.size * 0.8
          ctx.stroke()
        }
      }

      // Draw connections between close particles
      ctx.globalAlpha = 0.03
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 200) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = 'rgba(0, 230, 118, 0.3)'
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      ctx.globalAlpha = 1
      animRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
      aria-hidden="true"
    />
  )
}
