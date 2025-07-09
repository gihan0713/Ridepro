import { Skeleton } from "@/components/ui/skeleton"

export default function MobileLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-200 via-yellow-100 to-orange-300">
      {/* Header Skeleton */}
      <div className="bg-gradient-to-r from-orange-400 to-yellow-400 px-4 py-4">
        <div className="flex items-center justify-between">
          <Skeleton className="w-8 h-8 rounded bg-white/20" />
          <Skeleton className="w-20 h-6 rounded-full bg-white/20" />
          <Skeleton className="w-8 h-8 rounded bg-white/20" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="px-4 py-6 space-y-6">
        {/* Greeting Skeleton */}
        <div className="text-center space-y-2">
          <Skeleton className="h-8 w-64 mx-auto bg-white/60" />
          <Skeleton className="h-5 w-40 mx-auto bg-white/60" />
        </div>

        {/* Services Grid Skeleton */}
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-3xl p-4 shadow-lg">
              <Skeleton className="w-14 h-14 rounded-2xl mx-auto mb-3 bg-gray-200" />
              <Skeleton className="h-4 w-12 mx-auto bg-gray-200" />
            </div>
          ))}
        </div>

        {/* Cards Skeleton */}
        <div className="space-y-4">
          <div className="bg-white/90 rounded-2xl p-5">
            <Skeleton className="h-6 w-40 mb-4 bg-gray-200" />
            <div className="space-y-3">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="w-10 h-10 rounded-xl bg-gray-200" />
                  <div className="flex-1 space-y-1">
                    <Skeleton className="h-4 w-20 bg-gray-200" />
                    <Skeleton className="h-3 w-32 bg-gray-200" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/90 rounded-2xl p-5">
            <Skeleton className="h-6 w-32 mb-4 bg-gray-200" />
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-4">
                  <Skeleton className="h-4 w-12 mb-3 bg-gray-200" />
                  <div className="flex items-center space-x-3">
                    <Skeleton className="w-12 h-12 rounded-lg bg-gray-200" />
                    <div className="flex-1 space-y-1">
                      <Skeleton className="h-4 w-16 bg-gray-200" />
                      <Skeleton className="h-3 w-12 bg-gray-200" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Skeleton */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 border-t border-gray-200 px-4 py-2">
        <div className="grid grid-cols-5 gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center h-14 justify-center">
              <Skeleton className="w-5 h-5 rounded bg-gray-200" />
              <Skeleton className="w-8 h-3 mt-1 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
