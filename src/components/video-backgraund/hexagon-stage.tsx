"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface HexagonStageProps {
  stage: number
}

export function HexagonStage({ stage }: HexagonStageProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [currentStage, setCurrentStage] = useState(0)

  // Handle stage changes with a smooth transition
  useEffect(() => {
    setIsVisible(false)

    const timer = setTimeout(() => {
      setCurrentStage(stage)
      setIsVisible(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [stage])

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key={`hexagon-stage-${currentStage}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.2 }}
          transition={{ duration: 0.5 }}
        >
          {renderHexagonStage(currentStage)}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Render the appropriate hexagon based on the stage
function renderHexagonStage(stage: number) {
  switch (stage) {
    case 0:
      return <Stage0Hexagon />
    case 1:
      return <Stage1Hexagon />
    case 2:
      return <Stage2Hexagon />
    case 3:
      return <Stage3Hexagon />
    case 4:
      return <Stage4Hexagon />
    case 5:
      return <Stage5Hexagon />
    case 6:
      return <Stage6Hexagon />
    default:
      return <Stage0Hexagon />
  }
}

// Stage 0: Initial small hexagon (first screenshot)
function Stage0Hexagon() {
  return (
    <div className="relative h-32 w-32">
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <defs>
          <filter id="glow0" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <polygon
          points="50,3 97,25 97,75 50,97 3,75 3,25"
          fill="none"
          stroke="#9333EA"
          strokeWidth="1"
          filter="url(#glow0)"
        />
        <polygon points="50,15 85,33 85,67 50,85 15,67 15,33" fill="none" stroke="#9333EA" strokeWidth="1" />
        <polygon points="50,30 70,40 70,60 50,70 30,60 30,40" fill="none" stroke="#9333EA" strokeWidth="1" />
        <polygon points="50,40 60,45 60,55 50,60 40,55 40,45" fill="#9333EA" stroke="white" strokeWidth="0.5" />
      </svg>
    </div>
  )
}

// Stage 1: Slightly larger hexagon (second screenshot)
function Stage1Hexagon() {
  return (
    <div className="relative h-48 w-48">
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <defs>
          <filter id="glow1" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="hexGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9333EA" />
            <stop offset="100%" stopColor="#A855F7" />
          </linearGradient>
        </defs>
        <polygon
          points="50,3 97,25 97,75 50,97 3,75 3,25"
          fill="none"
          stroke="url(#hexGradient1)"
          strokeWidth="1.5"
          filter="url(#glow1)"
        />
        <polygon
          points="50,15 85,33 85,67 50,85 15,67 15,33"
          fill="none"
          stroke="white"
          strokeWidth="1"
          opacity="0.8"
        />
        <polygon points="50,30 70,40 70,60 50,70 30,60 30,40" fill="none" stroke="#9333EA" strokeWidth="1" />
        <circle cx="50" cy="50" r="2" fill="white" />
      </svg>
    </div>
  )
}

// Stage 2: Multiple concentric hexagons (third screenshot)
function Stage2Hexagon() {
  return (
    <div className="relative h-64 w-64">
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <defs>
          <filter id="glow2" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="hexGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9333EA" />
            <stop offset="100%" stopColor="#C084FC" />
          </linearGradient>
        </defs>
        <polygon
          points="50,3 97,25 97,75 50,97 3,75 3,25"
          fill="none"
          stroke="url(#hexGradient2)"
          strokeWidth="2"
          filter="url(#glow2)"
        />
        <polygon
          points="50,15 85,33 85,67 50,85 15,67 15,33"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
          opacity="0.9"
        />
        <polygon
          points="50,25 75,38 75,62 50,75 25,62 25,38"
          fill="none"
          stroke="white"
          strokeWidth="1"
          opacity="0.7"
        />
        <polygon
          points="50,35 65,43 65,57 50,65 35,57 35,43"
          fill="none"
          stroke="white"
          strokeWidth="0.8"
          opacity="0.5"
        />
        <circle cx="50" cy="50" r="2" fill="white" />
      </svg>
    </div>
  )
}

// Stage 3: Larger hexagon with more defined rings (fourth screenshot)
function Stage3Hexagon() {
  return (
    <div className="relative h-80 w-80">
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <defs>
          <filter id="glow3" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="hexGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9333EA" />
            <stop offset="50%" stopColor="#C084FC" />
            <stop offset="100%" stopColor="#F472B6" />
          </linearGradient>
        </defs>
        <polygon
          points="50,3 97,25 97,75 50,97 3,75 3,25"
          fill="rgba(147, 51, 234, 0.1)"
          stroke="url(#hexGradient3)"
          strokeWidth="2.5"
          filter="url(#glow3)"
        />
        <polygon
          points="50,13 87,33 87,67 50,87 13,67 13,33"
          fill="none"
          stroke="white"
          strokeWidth="1.8"
          opacity="0.9"
        />
        <polygon
          points="50,23 77,38 77,62 50,77 23,62 23,38"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
          opacity="0.7"
        />
        <polygon
          points="50,33 67,43 67,57 50,67 33,57 33,43"
          fill="none"
          stroke="white"
          strokeWidth="1.2"
          opacity="0.5"
        />
        <polygon
          points="50,43 57,48 57,52 50,57 43,52 43,48"
          fill="none"
          stroke="white"
          strokeWidth="1"
          opacity="0.3"
        />
      </svg>
    </div>
  )
}

// Stage 4: 3D-looking hexagon (fifth screenshot)
function Stage4Hexagon() {
  return (
    <div className="relative h-96 w-96">
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <defs>
          <filter id="glow4" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="hexGradient4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9333EA" />
            <stop offset="50%" stopColor="#F472B6" />
            <stop offset="100%" stopColor="#9333EA" />
          </linearGradient>
        </defs>
        <polygon
          points="50,2 98,25 98,75 50,98 2,75 2,25"
          fill="rgba(147, 51, 234, 0.15)"
          stroke="url(#hexGradient4)"
          strokeWidth="3"
          filter="url(#glow4)"
        />
        <polygon
          points="50,12 88,32 88,68 50,88 12,68 12,32"
          fill="none"
          stroke="white"
          strokeWidth="2"
          opacity="0.9"
        />
        <polygon
          points="50,22 78,37 78,63 50,78 22,63 22,37"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
          opacity="0.7"
        />
        <polygon
          points="50,32 68,42 68,58 50,68 32,58 32,42"
          fill="none"
          stroke="white"
          strokeWidth="1.2"
          opacity="0.5"
        />
        <polygon
          points="50,42 58,47 58,53 50,58 42,53 42,47"
          fill="none"
          stroke="white"
          strokeWidth="1"
          opacity="0.3"
        />
      </svg>
    </div>
  )
}

// Stage 5: Rotated hexagon (sixth screenshot)
function Stage5Hexagon() {
  return (
    <div className="relative h-[400px] w-[400px]">
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <defs>
          <filter id="glow5" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="hexGradient5" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F472B6" />
            <stop offset="50%" stopColor="#9333EA" />
            <stop offset="100%" stopColor="#F472B6" />
          </linearGradient>
        </defs>
        <g transform="rotate(30, 50, 50)">
          <polygon
            points="50,2 98,25 98,75 50,98 2,75 2,25"
            fill="rgba(244, 114, 182, 0.2)"
            stroke="url(#hexGradient5)"
            strokeWidth="3"
            filter="url(#glow5)"
          />
          <polygon
            points="50,12 88,32 88,68 50,88 12,68 12,32"
            fill="none"
            stroke="white"
            strokeWidth="2"
            opacity="0.9"
          />
          <polygon
            points="50,22 78,37 78,63 50,78 22,63 22,37"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            opacity="0.7"
          />
          <polygon
            points="50,32 68,42 68,58 50,68 32,58 32,42"
            fill="none"
            stroke="white"
            strokeWidth="1.2"
            opacity="0.5"
          />
        </g>
      </svg>
    </div>
  )
}

// Stage 6: Very large hexagon (seventh screenshot)
function Stage6Hexagon() {
  return (
    <div className="relative h-[500px] w-[500px]">
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <defs>
          <filter id="glow6" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="hexGradient6" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F472B6" />
            <stop offset="50%" stopColor="#9333EA" />
            <stop offset="100%" stopColor="#F472B6" />
          </linearGradient>
        </defs>
        <g transform="rotate(15, 50, 50)">
          <polygon
            points="50,1 99,25 99,75 50,99 1,75 1,25"
            fill="rgba(244, 114, 182, 0.2)"
            stroke="url(#hexGradient6)"
            strokeWidth="3.5"
            filter="url(#glow6)"
          />
          <polygon
            points="50,10 90,30 90,70 50,90 10,70 10,30"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            opacity="0.9"
          />
          <polygon
            points="50,20 80,35 80,65 50,80 20,65 20,35"
            fill="none"
            stroke="white"
            strokeWidth="2"
            opacity="0.7"
          />
          <polygon
            points="50,30 70,40 70,60 50,70 30,60 30,40"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            opacity="0.5"
          />
          <polygon
            points="50,40 60,45 60,55 50,60 40,55 40,45"
            fill="none"
            stroke="white"
            strokeWidth="1"
            opacity="0.3"
          />
        </g>
      </svg>
    </div>
  )
}
