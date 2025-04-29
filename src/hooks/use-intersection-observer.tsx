"use client"

import { useEffect, useState, type RefObject } from "react"

interface UseIntersectionObserverProps {
  ref: RefObject<Element>
  options?: IntersectionObserverInit
  freezeOnceVisible?: boolean
}

export function useIntersectionObserver({
  ref,
  options = { threshold: 0.1 },
  freezeOnceVisible = false,
}: UseIntersectionObserverProps): boolean {
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const element = ref.current

    // Return early if ref is not attached to an element or if
    // we've already seen the element and we're freezing visibility
    if (!element || (freezeOnceVisible && isIntersecting)) {
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
    }, options)

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [ref, options, freezeOnceVisible, isIntersecting])

  return isIntersecting
}
