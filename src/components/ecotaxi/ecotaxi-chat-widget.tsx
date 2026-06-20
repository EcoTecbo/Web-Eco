'use client'

import { useEffect } from 'react'

export function EcotaxiChatWidget() {
  useEffect(() => {
    // Prevent duplicate injection
    if (document.getElementById('et-fab')) return

    // Load Google Fonts (v4-slim spec: Syne 700/800, DM Sans 400/500)
    const fontLink = document.createElement('link')
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap'
    fontLink.rel = 'stylesheet'
    document.head.appendChild(fontLink)

    // Load JsSIP for WebRTC
    const jssipScript = document.createElement('script')
    jssipScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jssip/3.10.0/jssip.min.js'
    jssipScript.async = true
    document.head.appendChild(jssipScript)

    // Load CRM OYC widget (Administración / Facturación) — parallel, no blocking
    if (!document.getElementById('ecotaxi-crm-oyc-script')) {
      const crmOycLoader = document.createElement('script')
      crmOycLoader.id = 'ecotaxi-crm-oyc-script'
      crmOycLoader.type = 'text/javascript'
      crmOycLoader.textContent = `(function(){var d=document,s=d.createElement("script");s.src="https://crm.oyc-srl.com/prchat/Chatbot_Controller/widget/e6a9dd246f87b4d87804e4fb8342aaee";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`
      document.head.appendChild(crmOycLoader)
    }

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
      /* Only the FAB button gets pointer-events — everything else is click-through unless explicitly opened */
      #et-fab {
        position: fixed !important;
        z-index: 99990 !important;
        bottom: 28px !important;
        right: 28px !important;
        pointer-events: auto !important;
      }
      #et-tip {
        position: fixed !important;
        z-index: 9989 !important;
        bottom: 36px !important;
        right: 106px !important;
        pointer-events: none !important;
      }
      #et-panel {
        position: fixed !important;
        z-index: 9991 !important;
        bottom: 108px !important;
        right: 28px !important;
        pointer-events: none !important;
      }
      #et-panel.open {
        pointer-events: auto !important;
      }
      #et-pro {
        position: fixed !important;
        z-index: 9989 !important;
        bottom: 110px !important;
        right: 28px !important;
        pointer-events: none !important;
      }
      #et-pro.show {
        pointer-events: auto !important;
      }
      #et-toast {
        position: fixed !important;
        z-index: 9992 !important;
        bottom: 110px !important;
        right: 28px !important;
        pointer-events: none !important;
      }
      #et-toast.show {
        pointer-events: auto !important;
      }
      @media (max-width: 640px) {
        #et-fab {
          bottom: 80px !important;
          right: 16px !important;
          width: 56px !important;
          height: 56px !important;
        }
        #et-tip {
          bottom: 88px !important;
          right: 84px !important;
        }
        #et-panel {
          bottom: 150px !important;
          right: 10px !important;
          width: calc(100vw - 20px) !important;
          max-height: 70vh !important;
        }
        #et-pro, #et-toast {
          right: 10px !important;
          width: calc(100vw - 20px) !important;
          max-width: none !important;
          bottom: 150px !important;
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
      const crmOyc = document.getElementById('ecotaxi-crm-oyc-script')
      if (crmOyc) crmOyc.remove()
    }
  }, [])

  return null
}
