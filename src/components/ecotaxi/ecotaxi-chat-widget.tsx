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
    // Layout v4-slim-2: FAB on LEFT, CRM OYC WhatsApp widget on RIGHT
    const overrideStyle = document.createElement('style')
    overrideStyle.id = 'ecotaxi-widget-float-fix'
    overrideStyle.textContent = `
      #ecotaxi-widget-container {
        position: fixed !important;
        bottom: 0 !important;
        left: 0 !important;
        right: auto !important;
        top: auto !important;
        width: auto !important;
        height: auto !important;
        z-index: 99999 !important;
        pointer-events: none !important;
        overflow: visible !important;
        transform: none !important;
        contain: none !important;
      }
      /* FAB on LEFT side — leaves room for CRM OYC WhatsApp widget on the right */
      #et-fab {
        position: fixed !important;
        z-index: 9990 !important;
        bottom: 28px !important;
        left: 28px !important;
        right: auto !important;
        pointer-events: auto !important;
      }
      #et-tip {
        position: fixed !important;
        z-index: 9989 !important;
        bottom: 36px !important;
        left: 106px !important;
        right: auto !important;
        pointer-events: none !important;
      }
      #et-panel {
        position: fixed !important;
        z-index: 9991 !important;
        bottom: 108px !important;
        left: 28px !important;
        right: auto !important;
        pointer-events: none !important;
      }
      #et-panel.open {
        pointer-events: auto !important;
      }
      #et-pro {
        position: fixed !important;
        z-index: 9989 !important;
        bottom: 110px !important;
        left: 28px !important;
        right: auto !important;
        pointer-events: none !important;
      }
      #et-pro.show {
        pointer-events: auto !important;
      }
      #et-toast {
        position: fixed !important;
        z-index: 9992 !important;
        bottom: 110px !important;
        left: 28px !important;
        right: auto !important;
        pointer-events: none !important;
      }
      #et-toast.show {
        pointer-events: auto !important;
      }
      @media (max-width: 640px) {
        #et-fab {
          bottom: 80px !important;
          left: 16px !important;
          right: auto !important;
          width: 56px !important;
          height: 56px !important;
        }
        #et-tip {
          bottom: 88px !important;
          left: 84px !important;
          right: auto !important;
        }
        #et-panel {
          bottom: 150px !important;
          left: 10px !important;
          right: auto !important;
          width: calc(100vw - 20px) !important;
          max-height: 70vh !important;
        }
        #et-pro, #et-toast {
          left: 10px !important;
          right: auto !important;
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
        // Extract ALL <style>...</style> blocks and inject into head
        const styleMatches = html.match(/<style>([\s\S]*?)<\/style>/g)
        if (styleMatches) {
          const style = document.createElement('style')
          style.id = 'ecotaxi-widget-styles'
          style.textContent = styleMatches.map(s => s.replace(/<\/?style>/g, '')).join('\n\n')
          document.head.appendChild(style)
        }

        // Extract the widget HTML body
        // Strategy 1: If file has <body>...</body>, use that
        // Strategy 2: Otherwise, take everything AFTER the last </style> and BEFORE the first <script>
        let bodyContent = ''
        const bodyMatch = html.match(/<body>([\s\S]*?)<\/body>/)
        if (bodyMatch) {
          bodyContent = bodyMatch[1]
        } else {
          // Fallback: content between last </style> and first <script>
          const lastStyleEnd = html.lastIndexOf('</style>')
          const firstScriptStart = html.indexOf('<script>', lastStyleEnd >= 0 ? lastStyleEnd : 0)
          if (lastStyleEnd >= 0 && firstScriptStart >= 0) {
            bodyContent = html.slice(lastStyleEnd + '</style>'.length, firstScriptStart)
          } else if (lastStyleEnd >= 0) {
            bodyContent = html.slice(lastStyleEnd + '</style>'.length)
          } else {
            // Last resort: strip all <style>, <script>, <html>, <head>, <body> tags and use what's left
            bodyContent = html
              .replace(/<!--[\s\S]*?-->/g, '')
              .replace(/<style>[\s\S]*?<\/style>/g, '')
              .replace(/<script[\s\S]*?<\/script>/g, '')
              .replace(/<!DOCTYPE[^>]*>/gi, '')
              .replace(/<\/?(html|head|body|title|meta|link)[^>]*>/gi, '')
          }
        }

        // Remove any leftover <style>, <script>, <html>, <head>, <body> tags from body content
        bodyContent = bodyContent
          .replace(/<style>[\s\S]*?<\/style>/g, '')
          .replace(/<script[\s\S]*?<\/script>/g, '')
          .replace(/<\/?(html|head|body|title|meta|link)[^>]*>/gi, '')
          .trim()

        if (bodyContent) {
          // Create a container div with fixed positioning
          const container = document.createElement('div')
          container.id = 'ecotaxi-widget-container'
          container.innerHTML = bodyContent
          document.body.appendChild(container)
        }

        // Extract and run ALL <script>...</script> blocks (the widget file may have inline scripts)
        // Note: scripts with src= are loaded separately by the head section above
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
