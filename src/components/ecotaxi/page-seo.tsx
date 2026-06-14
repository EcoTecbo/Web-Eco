'use client'

import { useEffect } from 'react'
import { generatePageSchema } from '@/lib/seo-data'

/**
 * Client-side PageSeo component.
 * Injects per-page JSON-LD schemas and updates document title/meta tags
 * as a complement to the server-side generateMetadata.
 * 
 * Usage: <PageSeo path="/mudanza" />
 */
export function PageSeo({ path }: { path: string }) {
  useEffect(() => {
    // Inject JSON-LD schemas for this page
    const schemas = generatePageSchema(path)
    const injectedScripts: HTMLScriptElement[] = []

    schemas.forEach((schema) => {
      // Check if already exists
      const existingId = `schema-${path.replace(/\//g, '-')}-${schema['@type']}`
      if (document.getElementById(existingId)) return

      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.textContent = JSON.stringify(schema)
      script.id = existingId
      document.head.appendChild(script)
      injectedScripts.push(script)
    })

    return () => {
      injectedScripts.forEach(script => {
        if (script.parentNode) script.parentNode.removeChild(script)
      })
    }
  }, [path])

  return null
}
