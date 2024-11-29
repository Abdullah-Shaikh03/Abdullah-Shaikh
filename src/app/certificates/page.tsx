import { Suspense } from 'react'
import { getCertificates } from '../certificates/action'
import { CertificateGrid } from './certificate-grid'
import Loading from './loading'

export const metadata = {
  title: 'Certificates - Shaikh Abdullah',
  description: 'Professional certificates and achievements',
}

export default async function CertificatesPage() {
  const certificates = await getCertificates()

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8">My Certificates</h1>
      <Suspense fallback={<Loading />}>
        <CertificateGrid certificates={certificates} />
      </Suspense>
    </div>
  )
}

