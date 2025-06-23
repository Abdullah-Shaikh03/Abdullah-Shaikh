export const dynamic = "force-dynamic";
import Link from "next/link";
import { Suspense } from "react";
import type { Certificate } from "@/types/certificate";
import { CertificateCard } from "@/components/certificate-card";
import { CertificatesSkeleton } from "@/components/certificates-skeleton";
import { Button } from "@/components/ui/button";
async function getCertificates(): Promise<Certificate[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/certificates`, {
      cache: "no-store",
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      console.error(
        "Failed to fetch certificates:",
        response.status,
        response.statusText
      );
      return [];
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching certificates:", error);
    return [];
  }
}

function EmptyState() {
  return (
    <div className="text-center py-16">
      <div className="text-muted-foreground mb-6">
        <svg
          className="w-16 h-16 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">
        No Certificates Yet
      </h3>
      <p className="text-muted-foreground">
        Certificates will appear here once they are uploaded.
      </p>
    </div>
  );
}

async function CertificatesContent() {
  const certificates = await getCertificates();

  if (certificates.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {certificates.map((certificate, index) => (
        <CertificateCard
          key={certificate._id}
          certificate={certificate}
          index={index}
        />
      ))}
    </div>
  );
}

export default function CertificatesPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-accent-foreground tracking-tight">
            My Certifications
          </h1>
          <p className="text-lg text-foreground max-w-2xl mx-auto leading-relaxed">
            A collection of my professional certifications and achievements that
            showcase my expertise and commitment to continuous learning.
          </p>
          <div
            className={process.env.NODE_ENV === "development" ? "" : "hidden"}
          >
            <Link href="/upload">
              <Button>Upload</Button>
            </Link>
          </div>
        </div>

        <Suspense fallback={<CertificatesSkeleton />}>
          <CertificatesContent />
        </Suspense>
      </div>
    </div>
  );
}
