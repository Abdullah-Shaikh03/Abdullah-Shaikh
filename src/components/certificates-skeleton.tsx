import { Card, CardContent, CardHeader } from "@/components/ui/card"

function CertificateCardSkeleton() {
  return (
    <Card className="overflow-hidden bg-card border-border">
      <div className="relative h-48 w-full bg-muted animate-pulse-subtle">
        <div className="absolute top-4 right-4">
          <div className="h-6 w-20 bg-muted-foreground/20 rounded-full animate-pulse-subtle"></div>
        </div>
      </div>

      <CardHeader className="space-y-3">
        <div className="space-y-2">
          <div className="h-6 bg-muted animate-pulse-subtle rounded-md"></div>
          <div className="h-4 bg-muted animate-pulse-subtle rounded-md w-3/4"></div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="h-4 w-4 bg-muted animate-pulse-subtle rounded"></div>
          <div className="h-4 bg-muted animate-pulse-subtle rounded-md w-32"></div>
        </div>
      </CardHeader>

      <CardContent className="space-y-2">
        <div className="h-4 bg-muted animate-pulse-subtle rounded-md"></div>
        <div className="h-4 bg-muted animate-pulse-subtle rounded-md"></div>
        <div className="h-4 bg-muted animate-pulse-subtle rounded-md w-2/3"></div>
      </CardContent>
    </Card>
  )
}

export function CertificatesSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {Array.from({ length: 6 }).map((_, index) => (
        <CertificateCardSkeleton key={index} />
      ))}
    </div>
  )
}
