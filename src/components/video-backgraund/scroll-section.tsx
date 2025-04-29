"use client"

import type React from "react"

import { useRef } from "react"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

interface ScrollSectionProps {
  children: React.ReactNode
  className?: string
}

export function ScrollSection({ children, className = "" }: ScrollSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useIntersectionObserver({ ref })

  return (
    <div
      ref={ref}
      className={`transition-opacity duration-1000 ${isInView ? "opacity-100" : "opacity-0"} ${className}`}
    >
      {children}
    </div>
  )
}
