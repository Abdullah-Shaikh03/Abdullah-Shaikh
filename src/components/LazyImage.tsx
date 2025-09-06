"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  fill?: boolean
  sizes?: string
  width?: number
  height?: number
  onLoad?: () => void
  onError?: (e: any) => void
  unoptimized?: boolean
}

export function LazyImage({
  src,
  alt,
  className = "",
  fill = false,
  sizes,
  width,
  height,
  onLoad,
  onError,
  unoptimized = false,
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      },
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleLoad = () => {
    setIsLoaded(true)
    onLoad?.()
  }

  const handleError = (e: any) => {
    setHasError(true)
    setIsLoaded(true)
    onError?.(e)
  }

  return (
    <div ref={imgRef} className={`relative ${className}`}>
      {/* Loading skeleton */}
      {!isLoaded && (
        <div
          className={`absolute inset-0 bg-slate-200 animate-pulse flex items-center justify-center ${fill ? "" : `w-[${width}px] h-[${height}px]`}`}
        >
          <div className="text-slate-400">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>
      )}

      {/* Actual image - only load when in view */}
      {isInView && (
        <Image
          src={hasError ? "/placeholder.svg?height=200&width=400" : src}
          alt={alt}
          fill={fill}
          width={!fill ? width : undefined}
          height={!fill ? height : undefined}
          sizes={sizes}
          className={`transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
          loading="lazy"
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </div>
  )
}