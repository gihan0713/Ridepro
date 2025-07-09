import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function MobileServicesLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-50 to-orange-200">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-orange-400 to-yellow-400 px-4 py-3 shadow-lg">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div className="flex-1">
            <Skeleton className="h-5 w-24 bg-white/20 mb-1" />
            <Skeleton className="h-4 w-32 bg-white/20" />
          </div>
          <Button variant="ghost" size="icon" className="text-white">
            <Filter className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="p-4">
        <Skeleton className="h-12 w-full rounded-full bg-white" />
      </div>

      {/* Categories */}
      <div className="px-4 mb-4">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-20 rounded-full bg-white flex-shrink-0" />
          ))}
        </div>
      </div>

      {/* Services */}
      <div className="px-4 pb-20 space-y-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-white shadow-md rounded-2xl p-4">
            <div className="flex items-center space-x-3">
              <Skeleton className="w-12 h-12 rounded-xl bg-gray-200" />
              <div className="flex-1 space-y-2">
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-20 bg-gray-200" />
                  <Skeleton className="h-4 w-8 bg-gray-200" />
                </div>
                <Skeleton className="h-3 w-32 bg-gray-200" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Skeleton className="h-4 w-12 bg-gray-200" />
                    <Skeleton className="h-4 w-8 bg-gray-200" />
                  </div>
                  <Skeleton className="h-3 w-12 bg-gray-200" />
                </div>
              </div>
            </div>
            <Skeleton className="h-10 w-full mt-3 rounded-xl bg-gray-200" />
          </div>
        ))}
      </div>
    </div>
  )
}
