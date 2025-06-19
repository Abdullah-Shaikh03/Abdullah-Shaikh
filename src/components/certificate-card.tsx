"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Award } from "lucide-react"
import { CertificateModal } from "@/components/certificate-modal"

interface Certificate {
  _id: string
  name: string
  description: string
  dateOfAcquisition: string
  imgUrl: string
  createdAt: string
}

interface CertificateCardProps {
  certificate: Certificate
  index?: number
}

export function CertificateCard({ certificate, index = 0 }: CertificateCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } catch {
      return "Invalid Date"
    }
  }

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.error("Image failed to load:", certificate.imgUrl)
    setImageError(true)
    setImageLoaded(true)
    e.currentTarget.src = "/placeholder.svg?height=200&width=400"
  }

  return (
    <CertificateModal certificate={certificate}>
      <Card
        className="group overflow-hidden hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 bg-card border-border opacity-0 animate-fade-in-up cursor-pointer hover:scale-[1.02] focus-ring"
        style={{
          animationDelay: `${index * 100}ms`,
          animationFillMode: "forwards",
        }}
        tabIndex={0}
        role="button"
        aria-label={`View details for ${certificate.name}`}
      >
        <div className="relative h-48 w-full overflow-hidden">
          {/* Loading skeleton */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-muted animate-pulse-subtle flex items-center justify-center">
              <div className="text-muted-foreground">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

          <Image
            src={certificate.imgUrl || "/placeholder.svg?height=200&width=400"}
            alt={certificate.name || "Certificate"}
            fill
            className={`object-cover transition-all duration-500 group-hover:scale-105 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
            onLoad={handleImageLoad}
            onError={handleImageError}
            unoptimized={certificate.imgUrl?.includes("s3.") ? true : false}
          />

          <div className="absolute top-4 right-4">
            <Badge variant="secondary" className="bg-background/90 text-foreground backdrop-blur-sm border-border">
              <Award className="w-3 h-3 mr-1" />
              Certificate
            </Badge>
          </div>

          {/* Click indicator overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="bg-background/90 backdrop-blur-sm rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300">
              <svg className="w-6 h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
          </div>
        </div>

        <CardHeader className="space-y-3">
          <CardTitle className="text-xl font-semibold text-card-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {certificate.name}
          </CardTitle>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 mr-2" />
            {formatDate(certificate.dateOfAcquisition)}
          </div>
        </CardHeader>

        <CardContent>
          <CardDescription className="text-muted-foreground line-clamp-3 leading-relaxed">
            {certificate.description}
          </CardDescription>
        </CardContent>
      </Card>
    </CertificateModal>
  )
}
