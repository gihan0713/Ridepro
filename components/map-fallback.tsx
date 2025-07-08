"use client"

import { Card, CardContent } from "@/components/ui/card"
import { MapPin, AlertCircle } from "lucide-react"

interface MapFallbackProps {
  height?: string
  message?: string
}

export default function MapFallback({ height = "400px", message = "Map is loading..." }: MapFallbackProps) {
  return (
    <Card className="w-full">
      <CardContent className="p-0">
        <div className="flex flex-col items-center justify-center bg-gray-100 rounded-lg" style={{ height }}>
          <div className="text-center">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">{message}</p>
            <div className="flex items-center justify-center text-sm text-gray-500">
              <AlertCircle className="w-4 h-4 mr-1" />
              <span>Requires Google Maps API key</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
