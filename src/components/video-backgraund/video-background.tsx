"use client"

import { useEffect, useRef } from "react"

interface VideoBackgroundProps {
  src: string
  className?: string
  playbackRate?: number
}

export function VideoBackground({ src, className = "", playbackRate = 1 }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate
      videoRef.current.play().catch((error) => {
        console.error("Video autoplay failed:", error)
      })
    }
  }, [playbackRate])

  return (
    <video ref={videoRef} autoPlay loop muted playsInline className={`h-full w-full object-cover ${className}`}>
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )
}
