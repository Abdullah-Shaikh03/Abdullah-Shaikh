import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-16">
      <Skeleton className="h-12 w-[250px] mb-8" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <Skeleton className="w-full aspect-video" />
              <Skeleton className="h-4 w-3/4 mt-4" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

