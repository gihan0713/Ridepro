"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Play, Sparkles } from "lucide-react"

interface DemoBannerProps {
  onStartDemo?: () => void
  onClose?: () => void
}

export default function DemoBanner({ onStartDemo, onClose }: DemoBannerProps) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 animate-pulse" />
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                DEMO MODE
              </Badge>
            </div>
            <p className="text-sm font-medium hidden sm:block">
              Experience all features risk-free! No real bookings or payments.
            </p>
            <p className="text-sm font-medium sm:hidden">Try all features for free!</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={onStartDemo}
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              <Play className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Start Tour</span>
              <span className="sm:hidden">Tour</span>
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setIsVisible(false)
                onClose?.()
              }}
              className="text-white hover:bg-white/20"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
