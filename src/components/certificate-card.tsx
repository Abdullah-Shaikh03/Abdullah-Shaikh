"use client"

import Image from "next/image"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CertificateModal } from "./certificate-modal"

interface Certificate {
  _id: string
  name: string
  description: string
  imageUrl: string
  dateOfAcquisition: string
  createdAt: string
}

interface Props {
  certificate: Certificate
  index: number
}

export function CertificateCard({ certificate }: Props) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.error("Image failed to load:", certificate.imageUrl)
    setImageError(true)
    setImageLoaded(true)
  }

  return (
    <CertificateModal certificate={certificate}>
      <Card className="overflow-hidden bg-card border-border cursor-pointer hover:shadow-lg transition-shadow">
        <div className="relative w-full aspect-[4/3] bg-muted border-b border-border">
          {/* Loading skeleton */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-muted animate-pulse-subtle flex items-center justify-center">
              <svg className="w-10 h-10 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}

          <Image
            src={imageError ? "/file.svg" : certificate.imageUrl}
            alt={certificate.name}
            fill
            className={`object-contain transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
            sizes="(max-width: 768px) 100vw, 33vw"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        </div>

        <CardHeader>
          <CardTitle className="text-lg text-foreground truncate">{certificate.name}</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-3">{certificate.description}</p>
        </CardContent>
      </Card>
    </CertificateModal>
  )
}
