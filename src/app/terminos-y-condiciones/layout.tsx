import type { Metadata } from 'next'
import { SITE } from '@/lib/seo-data'

export const metadata: Metadata = {
  title: 'Términos y Condiciones — Ecotaxi Bolivia',
  description: 'Términos y Condiciones de uso de los servicios de transporte de Ecotaxi Bolivia. Reservas, tarifas, cancelaciones, responsabilidad y legislación aplicable.',
  keywords: [
    'términos y condiciones ecotaxi', 'condiciones de servicio transporte',
    'contrato transporte Bolivia', 'tarifas ecotaxi', 'cancelaciones ecotaxi',
    'responsabilidad transportista Bolivia',
  ],
  alternates: { canonical: `${SITE.domain}/terminos-y-condiciones` },
  robots: { index: true, follow: true },
}

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
