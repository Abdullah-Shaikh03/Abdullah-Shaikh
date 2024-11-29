'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Calendar, Award } from 'lucide-react'

export interface Certificate {
  key: string
  url: string
  lastModified: string // Change this to string as we'll format the date on the server
}

interface CertificateGridProps {
  certificates: Certificate[]
}

export function CertificateGrid({ certificates }: CertificateGridProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <>
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {certificates.map((cert) => (
          <motion.div key={cert.key} variants={item}>
            <Card 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedImage(cert.url)}
            >
              <CardContent className="p-4">
                <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                  <Image
                    src={cert.url}
                    alt={cert.key.split('/').pop()?.replace(/\.[^/.]+$/, '') || 'Certificate'}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="font-medium truncate">
                    {cert.key.split('/').pop()?.replace(/\.[^/.]+$/, '').replace(/-/g, ' ')}
                  </h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{cert.lastModified}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="w-4 h-4" />
                      <span>Verified</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl w-full">
          {selectedImage && (
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={selectedImage}
                alt="Certificate"
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

