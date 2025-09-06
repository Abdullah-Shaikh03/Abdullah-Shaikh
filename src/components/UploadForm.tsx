"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, Loader2, CheckCircle, AlertCircle } from "lucide-react"

export function UploadForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    dateOfAcquisition: "",
  })
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<string>("")
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [uploadError, setUploadError] = useState<string>("")
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      setFile(files[0])
      setUploadError("")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploadError("")
    setUploadSuccess(false)

    if (!file || !formData.name || !formData.description || !formData.dateOfAcquisition) {
      setUploadError("Please fill in all fields and select an image.")
      return
    }

    setUploading(true)
    setUploadStatus("Uploading...")

    try {
      const fd = new FormData()
      fd.append("name", formData.name)
      fd.append("description", formData.description)
      fd.append("dateOfAcquisition", formData.dateOfAcquisition)
      fd.append("image", file)

      const res = await fetch("/api/certificates", {
        method: "POST",
        body: fd,
      })

      if (!res.ok) {
        const txt = await res.text()
        throw new Error(txt || "Upload failed")
      }

      setUploadStatus("Upload complete!")
      setUploadSuccess(true)

      setFormData({ name: "", description: "", dateOfAcquisition: "" })
      setFile(null)

      setTimeout(() => {
        router.push("/certificates")
      }, 1200)
    } catch (error) {
      setUploadStatus("")
      setUploadError(error instanceof Error ? error.message : "Unknown error occurred")
    } finally {
      setUploading(false)
      setTimeout(() => setUploadStatus(""), 2000)
    }
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-card-foreground">Certificate Details</CardTitle>
        <CardDescription className="text-muted-foreground">
          Fill in the information about your certification
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground">
              Certificate Name
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g., AWS Certified Solutions Architect"
              className="border-input text-foreground focus-ring"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-foreground">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe what this certification covers and its significance..."
              rows={4}
              className="border-input text-foreground focus-ring resize-none"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateOfAcquisition" className="text-foreground">
              Date of Acquisition
            </Label>
            <Input
              id="dateOfAcquisition"
              name="dateOfAcquisition"
              type="date"
              value={formData.dateOfAcquisition}
              onChange={handleInputChange}
              className="border-input text-foreground focus-ring"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image" className="text-foreground">
              Certificate Image
            </Label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="image"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-input rounded-lg cursor-pointer bg-muted/50 hover:bg-muted/80 transition-colors focus-ring"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                  <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">PNG, JPG or JPEG (MAX. 10MB)</p>
                  {file && <p className="text-xs text-primary mt-2 font-medium">Selected: {file.name}</p>}
                </div>
                <Input
                  id="image"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/png,image/jpeg,image/jpg"
                  required
                />
              </label>
            </div>
          </div>

          {uploadStatus && (
            <div className="flex items-center gap-2 text-sm text-primary bg-primary/10 p-3 rounded-md border border-primary/20">
              <Loader2 className="w-4 h-4 animate-spin" />
              {uploadStatus}
            </div>
          )}

          {uploadSuccess && (
            <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 dark:bg-green-900/20 p-3 rounded-md border border-green-200 dark:border-green-800">
              <CheckCircle className="w-4 h-4" />
              Certificate uploaded successfully! Redirecting...
            </div>
          )}

          {uploadError && (
            <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 p-3 rounded-md border border-destructive/20">
              <AlertCircle className="w-4 h-4" />
              {uploadError}
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 focus-ring"
            disabled={uploading}
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              "Upload Certificate"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
