"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface HexagonAnimationProps {
  stage: number
}

export function HexagonAnimation({ stage }: HexagonAnimationProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [currentStage, setCurrentStage] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Handle stage changes with a delay
  useEffect(() => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Hide the current hexagon
    setIsVisible(false)

    // After a short delay, change the stage and show the new hexagon
    timeoutRef.current = setTimeout(() => {
      setCurrentStage(stage)
      setIsVisible(true)
    }, 300)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [stage])

  // Render different hexagon stages
  const renderHexagon = () => {
    switch (currentStage) {
      case 0:
        return <SimpleHexagon />
      case 1:
        return <DoubleHexagon />
      case 2:
        return <TripleHexagon />
      case 3:
        return <QuadHexagon />
      default:
        return <SimpleHexagon />
    }
  }

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key={`hexagon-${currentStage}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.2 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {renderHexagon()}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Stage 1: Simple small hexagon
function SimpleHexagon() {
  return (
    <div className="relative h-32 w-32">
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <polygon
          points="50,3 97,25 97,75 50,97 3,75 3,25"
          fill="none"
          stroke="rgba(147, 51, 234, 0.7)"
          strokeWidth="2"
          className="animate-pulse"
        />
        <polygon
          points="50,15 85,33 85,67 50,85 15,67 15,33"
          fill="none"
          stroke="rgba(147, 51, 234, 0.8)"
          strokeWidth="2"
          className="animate-pulse"
        />
        <polygon
          points="50,30 70,40 70,60 50,70 30,60 30,40"
          fill="none"
          stroke="rgba(147, 51, 234, 0.9)"
          strokeWidth="2"
          className="animate-pulse"
        />
        <polygon
          points="50,40 60,45 60,55 50,60 40,55 40,45"
          fill="rgba(147, 51, 234, 1)"
          stroke="white"
          strokeWidth="1"
        />
      </svg>
    </div>
  )
}

// Stage 2: Double concentric hexagons
function DoubleHexagon() {
  return (
    <div className="relative h-64 w-64">
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <defs>
          <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9333EA" />
            <stop offset="100%" stopColor="#F472B6" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <polygon
          points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
          fill="none"
          stroke="url(#hexGradient)"
          strokeWidth="2"
          filter="url(#glow)"
          className="animate-pulse"
        />
        <polygon
          points="50,15 85,33 85,67 50,85 15,67 15,33"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
          opacity="0.8"
        />
        <polygon
          points="50,25 75,38 75,62 50,75 25,62 25,38"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
          opacity="0.6"
        />
        <polygon
          points="50,35 65,43 65,57 50,65 35,57 35,43"
          fill="none"
          stroke="white"
          strokeWidth="1"
          opacity="0.4"
        />
      </svg>
    </div>
  )
}

// Stage 3: Triple hexagons with 3D effect
function TripleHexagon() {
  return (
    <div className="relative h-96 w-96">
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <defs>
          <linearGradient id="hexGradient3D" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9333EA" />
            <stop offset="100%" stopColor="#F472B6" />
          </linearGradient>
          <filter id="glow3D" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g transform="rotate(0, 50, 50)">
          <polygon
            points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
            fill="rgba(147, 51, 234, 0.2)"
            stroke="url(#hexGradient3D)"
            strokeWidth="3"
            filter="url(#glow3D)"
          />
          <polygon
            points="50,15 85,33 85,67 50,85 15,67 15,33"
            fill="none"
            stroke="white"
            strokeWidth="2"
            opacity="0.9"
          />
          <polygon
            points="50,25 75,38 75,62 50,75 25,62 25,38"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            opacity="0.7"
          />
          <polygon
            points="50,35 65,43 65,57 50,65 35,57 35,43"
            fill="none"
            stroke="white"
            strokeWidth="1"
            opacity="0.5"
          />
        </g>
      </svg>
    </div>
  )
}

// Stage 4: Large portal-like hexagon
function QuadHexagon() {
  return (
    <div className="relative h-[500px] w-[500px]">
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <defs>
          <linearGradient id="portalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9333EA" />
            <stop offset="50%" stopColor="#F472B6" />
            <stop offset="100%" stopColor="#9333EA" />
          </linearGradient>
          <filter id="portalGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g transform="rotate(0, 50, 50)">
          <polygon
            points="50,2 98,25 98,75 50,98 2,75 2,25"
            fill="rgba(147, 51, 234, 0.15)"
            stroke="url(#portalGradient)"
            strokeWidth="4"
            filter="url(#portalGlow)"
          />
          <polygon
            points="50,10 90,30 90,70 50,90 10,70 10,30"
            fill="none"
            stroke="white"
            strokeWidth="2"
            opacity="0.9"
          />
          <polygon
            points="50,20 80,35 80,65 50,80 20,65 20,35"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            opacity="0.7"
          />
          <polygon
            points="50,30 70,40 70,60 50,70 30,60 30,40"
            fill="none"
            stroke="white"
            strokeWidth="1"
            opacity="0.5"
          />
          <polygon
            points="50,40 60,45 60,55 50,60 40,55 40,45"
            fill="none"
            stroke="white"
            strokeWidth="0.5"
            opacity="0.3"
          />
        </g>
      </svg>
    </div>
  )
}
