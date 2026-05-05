'use client'

import { useEffect } from 'react'

export function EcotaxiChatWidget() {
  useEffect(() => {
    // Prevent duplicate injection
    if (document.getElementById('et-fab')) return

    // Load Google Fonts
    const fontLink = document.createElement('link')
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500&display=swap'
    fontLink.rel = 'stylesheet'
    document.head.appendChild(fontLink)

    // Load JsSIP for WebRTC
    const jssipScript = document.createElement('script')
    jssipScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jssip/3.10.0/jssip.min.js'
    jssipScript.async = true
    document.head.appendChild(jssipScript)

    // Load the widget HTML via fetch from the public directory
    fetch('/ecotaxi-chat-widget.html')
      .then(r => r.text())
      .then(html => {
        // Extract the <style> content
        const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/)
        if (styleMatch) {
          const style = document.createElement('style')
          style.id = 'ecotaxi-widget-styles'
          style.textContent = styleMatch[1]
          document.head.appendChild(style)
        }

        // Extract the body content (HTML elements)
        const bodyMatch = html.match(/<body>([\s\S]*?)<\/body>/)
        if (bodyMatch) {
          let bodyContent = bodyMatch[1]
          // Remove any <style> tags from body content (already injected in head)
          bodyContent = bodyContent.replace(/<style>[\s\S]*?<\/style>/g, '')
          // Remove any <script> tags from body content (will inject separately)
          bodyContent = bodyContent.replace(/<script[\s\S]*?<\/script>/g, '')
          // Create a container div
          const container = document.createElement('div')
          container.id = 'ecotaxi-widget-container'
          container.innerHTML = bodyContent
          document.body.appendChild(container)
        }

        // Extract and run the JavaScript
        const scriptMatches = html.match(/<script>([\s\S]*?)<\/script>/g)
        if (scriptMatches) {
          scriptMatches.forEach(match => {
            const jsMatch = match.match(/<script>([\s\S]*?)<\/script>/)
            if (jsMatch && jsMatch[1].trim()) {
              const script = document.createElement('script')
              script.textContent = jsMatch[1]
              document.body.appendChild(script)
            }
          })
        }
      })
      .catch(err => console.error('Failed to load Ecotaxi chat widget:', err))

    return () => {
      // Cleanup on unmount (though layout never unmounts)
      const container = document.getElementById('ecotaxi-widget-container')
      if (container) container.remove()
      const styles = document.getElementById('ecotaxi-widget-styles')
      if (styles) styles.remove()
    }
  }, [])

  return null
}
