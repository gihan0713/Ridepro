"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, ArrowRight, Shield } from "lucide-react"
import Link from "next/link"

interface ServiceCardProps {
  service: {
    id: string
    name: string
    description: string
    icon: React.ComponentType<any>
    category: string
    price: string
    rating: number
    eta: string
    popular?: boolean
    features: string[]
    color: string
  }
  size?: "small" | "medium" | "large"
}

export default function ServiceCard({ service, size = "medium" }: ServiceCardProps) {
  const IconComponent = service.icon

  const cardSizes = {
    small: "p-3",
    medium: "p-4",
    large: "p-6",
  }

  const iconSizes = {
    small: "w-8 h-8",
    medium: "w-12 h-12",
    large: "w-16 h-16",
  }

  const iconInnerSizes = {
    small: "w-4 h-4",
    medium: "w-6 h-6",
    large: "w-8 h-8",
  }

  return (
    <Link href={`/services/${service.id}`}>
      <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full">
        <CardHeader className={cardSizes[size]}>
          <div className="flex items-center justify-between mb-2">
            <div className={`${iconSizes[size]} ${service.color} rounded-lg flex items-center justify-center`}>
              <IconComponent className={`${iconInnerSizes[size]} text-white`} />
            </div>
            {service.popular && (
              <Badge variant="secondary" className="text-xs">
                Popular
              </Badge>
            )}
          </div>
          <CardTitle className={size === "small" ? "text-base" : "text-lg"}>{service.name}</CardTitle>
          <CardDescription className={`${size === "small" ? "text-xs" : "text-sm"} line-clamp-2`}>
            {service.description}
          </CardDescription>
        </CardHeader>
        <CardContent className={`${cardSizes[size]} pt-0`}>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-green-600">{service.price}</span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm">{service.rating}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{service.eta}</span>
            </div>

            {size !== "small" && (
              <div className="space-y-1">
                {service.features.slice(0, 2).map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs text-gray-600">
                    <Shield className="w-3 h-3" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            )}

            <Button className="w-full group" size={size === "small" ? "sm" : "default"}>
              Book Now
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
