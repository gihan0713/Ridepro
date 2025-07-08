"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Zap, Shield, Star, Clock, CreditCard, ChevronRight, Play } from "lucide-react"

interface FeatureShowcaseProps {
  onFeatureSelect?: (feature: string) => void
}

export default function FeatureShowcase({ onFeatureSelect }: FeatureShowcaseProps) {
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    {
      id: "booking",
      title: "Smart Booking",
      description: "AI-powered ride matching with real-time pricing",
      icon: MapPin,
      color: "bg-blue-500",
      demo: "Book a ride with multiple stops",
    },
    {
      id: "tracking",
      title: "Live Tracking",
      description: "Real-time GPS tracking with ETA updates",
      icon: Zap,
      color: "bg-green-500",
      demo: "Track your driver in real-time",
    },
    {
      id: "safety",
      title: "Safety First",
      description: "Emergency features and trip sharing",
      icon: Shield,
      color: "bg-red-500",
      demo: "Explore safety features",
    },
    {
      id: "ratings",
      title: "Rating System",
      description: "Comprehensive feedback system",
      icon: Star,
      color: "bg-yellow-500",
      demo: "Rate your experience",
    },
    {
      id: "scheduling",
      title: "Ride Scheduling",
      description: "Book rides in advance",
      icon: Clock,
      color: "bg-purple-500",
      demo: "Schedule future rides",
    },
    {
      id: "payments",
      title: "Secure Payments",
      description: "Multiple payment options",
      icon: CreditCard,
      color: "bg-indigo-500",
      demo: "Manage payment methods",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [features.length])

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Experience All Features</h2>
        <p className="text-gray-600">Try everything in our interactive demo</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature, index) => {
          const IconComponent = feature.icon
          const isActive = index === activeFeature

          return (
            <Card
              key={feature.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                isActive ? "ring-2 ring-blue-500 shadow-lg scale-105" : ""
              }`}
              onClick={() => onFeatureSelect?.(feature.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 ${feature.color} rounded-lg flex items-center justify-center`}>
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  {isActive && (
                    <Badge variant="secondary" className="animate-pulse">
                      Featured
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
                <CardDescription className="text-sm">{feature.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button variant="outline" size="sm" className="w-full group bg-transparent">
                  <Play className="w-4 h-4 mr-2" />
                  {feature.demo}
                  <ChevronRight className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
