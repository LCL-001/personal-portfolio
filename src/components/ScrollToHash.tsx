import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Restores in-page anchor navigation after route transitions. */
function ScrollToHash() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      requestAnimationFrame(() => document.querySelector(location.hash)?.scrollIntoView())
      return
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.hash, location.pathname])

  return null
}

export default ScrollToHash
