"use client"

import { useRef, useState, useEffect } from "react"

export function useScrollSpeed() {
  const [scrollSpeed, setScrollSpeed] = useState(0)
  const lastScrollTop = useRef(0)
  const lastScrollTime = useRef(Date.now())

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.scrollY || document.documentElement.scrollTop
      const currentTime = Date.now()
      const timeDelta = currentTime - lastScrollTime.current

      if (timeDelta > 0) {
        // Calculate scroll distance
        const scrollDelta = Math.abs(currentScrollTop - lastScrollTop.current)

        // Calculate speed (pixels per millisecond)
        const speed = scrollDelta / timeDelta

        // Update state with smoothing
        setScrollSpeed((prevSpeed) => prevSpeed * 0.7 + speed * 0.3)
      }

      lastScrollTop.current = currentScrollTop
      lastScrollTime.current = currentTime
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return scrollSpeed
}
