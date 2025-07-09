"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Clock } from "lucide-react"
import type React from "react"

interface MobileServiceCardProps {
  service: {
    id: string
    name: string
    description: string
    icon: React.ComponentType<any>
    color: string
    price: string
    rating: number
    eta: string
    popular?: boolean
    badge?: string
  }
  onSelect: (serviceId: string) => void
}

export default function MobileServiceCard({ service, onSelect }: MobileServiceCardProps) {
  const IconComponent = service.icon

  return (
    <Card className="bg-white shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer rounded-2xl">
      <CardContent className="p-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 ${service.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
            <IconComponent className="w-6 h-6 text-white" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-semibold text-gray-800 truncate">{service.name}</h3>
              {service.popular && <Badge className="bg-red-500 text-white text-xs px-1 py-0">HOT</Badge>}
              {service.badge && <Badge className="bg-orange-500 text-white text-xs px-1 py-0">{service.badge}</Badge>}
            </div>

            <p className="text-sm text-gray-600 truncate mb-2">{service.description}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="font-semibold text-green-600 text-sm">{service.price}</span>
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-gray-600">{service.rating}</span>
                </div>
              </div>

              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                <span>{service.eta}</span>
              </div>
            </div>
          </div>
        </div>

        <Button
          className="w-full mt-3 bg-gradient-to-r from-orange-400 to-yellow-400 hover:from-orange-500 hover:to-yellow-500 text-white rounded-xl"
          onClick={() => onSelect(service.id)}
        >
          Book Now
        </Button>
      </CardContent>
    </Card>
  )
}
