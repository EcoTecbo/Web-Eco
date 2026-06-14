import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo-data'

export const generateMetadata = (): Metadata => generatePageMetadata('/puerta-a-puerta')

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
