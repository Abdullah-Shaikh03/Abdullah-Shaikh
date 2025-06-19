import type { Certificate } from "@/types/certificate"
import { CertificateCard } from "@/components/certificate-card"

async function getCertificates(): Promise<Certificate[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/certificates`, {
      cache: "no-store",
    })
    if (!response.ok) {
      throw new Error("Failed to fetch certificates")
    }
    return response.json()
  } catch (error) {
    console.error("Error fetching certificates:", error)
    return []
  }
}

export async function CertificatesGrid() {
  const certificates = await getCertificates()

  if (certificates.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-muted-foreground mb-6">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">No Certificates Yet</h3>
        <p className="text-muted-foreground">Certificates will appear here once they are uploaded.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {certificates.map((certificate, index) => (
        <CertificateCard key={certificate._id} certificate={certificate} index={index} />
      ))}
    </div>
  )
}
