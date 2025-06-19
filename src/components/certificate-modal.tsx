"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Award, ExternalLink } from "lucide-react"

interface Certificate {
  _id: string
  name: string
  description: string
  dateOfAcquisition: string
  imgUrl: string
  createdAt: string
}

interface CertificateModalProps {
  certificate: Certificate
  children: React.ReactNode
}

export function CertificateModal({ certificate, children }: CertificateModalProps) {
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
    console.error("Modal image failed to load:", certificate.imgUrl)
    setImageError(true)
    setImageLoaded(true)
    e.currentTarget.src = "/file.svg?height=400&width=600"
  }

  const handleOpenInNewTab = () => {
    if (certificate.imgUrl) {
      window.open(certificate.imgUrl, "_blank", "noopener,noreferrer")
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden bg-card border-border">
        <DialogHeader className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex-1 space-y-2">
              <DialogTitle className="text-2xl font-bold text-card-foreground pr-8">{certificate.name}</DialogTitle>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDate(certificate.dateOfAcquisition)}
                </div>
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  <Award className="w-3 h-3 mr-1" />
                  Certificate
                </Badge>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Certificate Image */}
          <div className="space-y-4">
            <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden bg-muted border border-border">
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
                src={certificate.imgUrl || "/file.svg?height=400&width=600"}
                alt={certificate.name}
                fill
                className={`object-contain transition-opacity duration-300 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                sizes="(max-width: 1024px) 100vw, 50vw"
                onLoad={handleImageLoad}
                onError={handleImageError}
                unoptimized={certificate.imgUrl?.includes("s3.") ? true : false}
              />
            </div>

            <Button
              onClick={handleOpenInNewTab}
              variant="outline"
              className="w-full bg-background hover:bg-muted border-border text-foreground"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View Full Size
            </Button>
          </div>

          {/* Certificate Details */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Description</h3>
              <p className="text-muted-foreground leading-relaxed">{certificate.description}</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Certificate Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-sm font-medium text-muted-foreground">Date Acquired</span>
                  <span className="text-sm text-foreground">{formatDate(certificate.dateOfAcquisition)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-sm font-medium text-muted-foreground">Added to Portfolio</span>
                  <span className="text-sm text-foreground">{formatDate(certificate.createdAt)}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium text-muted-foreground">Certificate ID</span>
                  <span className="text-sm text-foreground font-mono">{certificate._id.slice(-8)}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleOpenInNewTab}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open Original
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
