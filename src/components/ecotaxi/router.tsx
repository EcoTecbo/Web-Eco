'use client'

import { useState, useEffect, useCallback, createContext, useContext, ReactNode, useRef } from 'react'

export type Page = 'home' | 'nosotros' | 'aeropuerto' | 'eventos' | 'corporativo'

interface RouterContextType {
  currentPage: Page
  navigate: (page: Page) => void
}

const RouterContext = createContext<RouterContextType>({
  currentPage: 'home',
  navigate: () => {},
})

export function useRouter() {
  return useContext(RouterContext)
}

function getInitialPage(): Page {
  if (typeof window === 'undefined') return 'home'
  const hash = window.location.hash.replace('#', '') as Page
  if (['home', 'nosotros', 'aeropuerto', 'eventos', 'corporativo'].includes(hash)) return hash
  return 'home'
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<Page>(getInitialPage)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const isInitialized = useRef(false)

  // Listen for hash changes (back/forward browser buttons)
  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true
      return
    }
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as Page
      if (['home', 'nosotros', 'aeropuerto', 'eventos', 'corporativo'].includes(hash)) {
        setCurrentPage(hash)
      } else {
        setCurrentPage('home')
      }
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const navigate = useCallback((page: Page) => {
    if (page === currentPage) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentPage(page)
      window.location.hash = page === 'home' ? '' : page
      window.scrollTo(0, 0)
      setTimeout(() => setIsTransitioning(false), 50)
    }, 300)
  }, [currentPage])

  return (
    <RouterContext.Provider value={{ currentPage, navigate }}>
      <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </div>
    </RouterContext.Provider>
  )
}
