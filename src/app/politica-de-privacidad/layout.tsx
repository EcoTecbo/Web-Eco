import type { Metadata } from 'next'
import { SITE } from '@/lib/seo-data'

export const metadata: Metadata = {
  title: 'Política de Privacidad — Ecotaxi Bolivia',
  description: 'Política de Privacidad de Ecotaxi Bolivia. Conozca cómo recopilamos, usamos y protegemos sus datos personales conforme a la Ley N° 1581 de Bolivia.',
  keywords: [
    'política de privacidad ecotaxi', 'protección de datos Bolivia',
    'privacidad datos personales', 'Ley 1581 Bolivia',
    'cookies ecotaxi', 'tratamiento de datos',
  ],
  alternates: { canonical: `${SITE.domain}/politica-de-privacidad` },
  robots: { index: true, follow: true },
}

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
