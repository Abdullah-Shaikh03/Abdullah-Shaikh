import { redirect } from "next/navigation"
import { UploadForm } from "@/components/upload-form"

export default function UploadPage() {
  // Only allow access in development environment
  if (process.env.NODE_ENV !== "development") {
    redirect("/certificates")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-muted/40">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="text-center mb-8 space-y-4">
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Upload Certificate</h1>
          <p className="text-muted-foreground">Add a new certification to your portfolio</p>
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent text-accent-foreground border">
            Development Only
          </div>
        </div>

        <UploadForm />
      </div>
    </div>
  )
}
