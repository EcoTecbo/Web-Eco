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

    // Inject critical floating override styles to ensure widget stays floating on all devices
    const overrideStyle = document.createElement('style')
    overrideStyle.id = 'ecotaxi-widget-float-fix'
    overrideStyle.textContent = `
      #ecotaxi-widget-container {
        position: fixed !important;
        bottom: 0 !important;
        right: 0 !important;
        left: auto !important;
        top: auto !important;
        width: auto !important;
        height: auto !important;
        z-index: 99999 !important;
        pointer-events: none !important;
        overflow: visible !important;
        transform: none !important;
        contain: none !important;
      }
      #ecotaxi-widget-container > * {
        pointer-events: auto !important;
      }
      #et-fab {
        position: fixed !important;
        z-index: 99990 !important;
        bottom: 28px !important;
        right: 28px !important;
      }
      #et-panel {
        position: fixed !important;
        z-index: 99991 !important;
        bottom: 108px !important;
        right: 28px !important;
      }
      #et-proactive {
        position: fixed !important;
        z-index: 99989 !important;
        bottom: 110px !important;
        right: 28px !important;
      }
      #et-toast {
        position: fixed !important;
        z-index: 99992 !important;
        bottom: 110px !important;
        right: 28px !important;
      }
      #et-fab-label {
        position: fixed !important;
        z-index: 99988 !important;
        bottom: 34px !important;
        right: 100px !important;
      }
      @media (max-width: 430px) {
        #et-fab {
          bottom: 20px !important;
          right: 16px !important;
        }
        #et-panel {
          bottom: 90px !important;
          right: 10px !important;
          width: calc(100vw - 20px) !important;
        }
        #et-proactive, #et-toast {
          right: 10px !important;
          width: calc(100vw - 20px) !important;
          max-width: none !important;
        }
        #et-fab-label {
          bottom: 26px !important;
          right: 88px !important;
        }
      }
    `
    document.head.appendChild(overrideStyle)

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
          // Create a container div with fixed positioning
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
      const floatFix = document.getElementById('ecotaxi-widget-float-fix')
      if (floatFix) floatFix.remove()
    }
  }, [])

  return null
}
