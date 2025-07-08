"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Users, Car, MapPin } from "lucide-react"

interface AnimatedStatsProps {
  isDemo?: boolean
}

export default function AnimatedStats({ isDemo = false }: AnimatedStatsProps) {
  const [stats, setStats] = useState({
    rides: 0,
    users: 0,
    drivers: 0,
    cities: 0,
  })

  const finalStats = {
    rides: isDemo ? 1250000 : 89650,
    users: isDemo ? 500000 : 15420,
    drivers: isDemo ? 25000 : 2340,
    cities: isDemo ? 150 : 12,
  }

  useEffect(() => {
    const duration = 2000 // 2 seconds
    const steps = 60
    const stepDuration = duration / steps

    let currentStep = 0
    const interval = setInterval(() => {
      currentStep++
      const progress = currentStep / steps

      setStats({
        rides: Math.floor(finalStats.rides * progress),
        users: Math.floor(finalStats.users * progress),
        drivers: Math.floor(finalStats.drivers * progress),
        cities: Math.floor(finalStats.cities * progress),
      })

      if (currentStep >= steps) {
        clearInterval(interval)
      }
    }, stepDuration)

    return () => clearInterval(interval)
  }, [finalStats.rides, finalStats.users, finalStats.drivers, finalStats.cities])

  const statItems = [
    {
      label: "Total Rides",
      value: stats.rides.toLocaleString(),
      icon: MapPin,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      label: "Happy Users",
      value: stats.users.toLocaleString(),
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      label: "Active Drivers",
      value: stats.drivers.toLocaleString(),
      icon: Car,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      label: "Cities Served",
      value: stats.cities.toString(),
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((item, index) => {
        const IconComponent = item.icon
        return (
          <Card key={item.label} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 text-center">
              <div className={`w-12 h-12 ${item.bgColor} rounded-full flex items-center justify-center mx-auto mb-3`}>
                <IconComponent className={`w-6 h-6 ${item.color}`} />
              </div>
              <div className="text-2xl font-bold mb-1">{item.value}</div>
              <div className="text-sm text-gray-600">{item.label}</div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
