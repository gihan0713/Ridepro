"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  MapPin,
  Bell,
  Search,
  Car,
  Utensils,
  Package,
  Home,
  Briefcase,
  Heart,
  Truck,
  ShoppingCart,
  Zap,
  QrCode,
  Clock,
  Star,
  ChevronRight,
  Menu,
  User,
  CreditCard,
  Settings,
  Gift,
  Phone,
} from "lucide-react"
import Link from "next/link"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image"

export default function MobilePage() {
  const [currentTime, setCurrentTime] = useState("")
  const [userName] = useState("Poornima")
  const [isDemo] = useState(true)
  const [activeService, setActiveService] = useState<string | null>(null)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hour = now.getHours()
      let greeting = "Good Morning"
      if (hour >= 12 && hour < 17) greeting = "Good Afternoon"
      else if (hour >= 17) greeting = "Good Evening"
      setCurrentTime(greeting)
    }
    updateTime()
    const interval = setInterval(updateTime, 60000)
    return () => clearInterval(interval)
  }, [])

  const mainServices = [
    {
      id: "rides",
      name: "Rides",
      icon: Car,
      color: "bg-blue-500",
      description: "Quick rides around the city",
      badge: null,
    },
    {
      id: "food",
      name: "Food",
      icon: Utensils,
      color: "bg-red-500",
      description: "Delicious meals delivered",
      badge: "HOT",
    },
    {
      id: "market",
      name: "Market",
      icon: ShoppingCart,
      color: "bg-green-500",
      description: "Groceries & essentials",
      badge: null,
    },
    {
      id: "rentals",
      name: "Rentals",
      icon: Package,
      color: "bg-purple-500",
      description: "Rent anything you need",
      badge: null,
    },
    {
      id: "flash",
      name: "Flash",
      icon: Zap,
      color: "bg-orange-500",
      description: "Super fast delivery",
      badge: "DELIVERY",
    },
    {
      id: "trucks",
      name: "Trucks",
      icon: Truck,
      color: "bg-gray-600",
      description: "Heavy item transport",
      badge: null,
    },
    {
      id: "scan-go",
      name: "Scan N Go",
      icon: QrCode,
      color: "bg-indigo-500",
      description: "Contactless shopping",
      badge: null,
    },
    {
      id: "home",
      name: "Home",
      icon: Home,
      color: "bg-teal-500",
      description: "Home services",
      badge: null,
    },
  ]

  const savedLocations = [
    { name: "Home", address: "D. Robert Alwis Mw...", icon: Home },
    { name: "Wellawatta", address: "Colombo 06", icon: MapPin },
    { name: "Office", address: "Business District", icon: Briefcase },
  ]

  const recentOrders = [
    {
      name: "Vege Dine",
      status: "Open",
      eta: "22mins",
      image: "/placeholder.jpg",
      rating: 4.5,
    },
    {
      name: "Keells (Rattana)",
      status: "Open",
      eta: "19mins",
      image: "/placeholder.jpg",
      rating: 4.2,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-200 via-yellow-100 to-orange-300 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-10 w-32 h-32 bg-white rounded-full"></div>
        <div className="absolute bottom-40 left-5 w-24 h-24 bg-white rounded-full"></div>
        <div className="absolute top-1/2 right-5 w-16 h-16 bg-white rounded-full"></div>
      </div>

      {/* Mobile Header */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-orange-400 to-yellow-400 px-4 py-4 shadow-lg">
        <div className="flex items-center justify-between">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0">
              <div className="bg-gradient-to-b from-orange-400 to-yellow-400 p-6 text-white">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-16 h-16 border-2 border-white">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback className="bg-white text-orange-500 text-lg font-bold">
                      {userName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-bold">{userName}</h3>
                    <p className="text-orange-100 text-sm">Premium Member</p>
                    <div className="flex items-center mt-1">
                      <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                      <span className="text-sm ml-1">4.8</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-2">
                <Link href="/rider/dashboard">
                  <Button variant="ghost" className="w-full justify-start">
                    <User className="w-5 h-5 mr-3" />
                    My Profile
                  </Button>
                </Link>
                <Link href="/rider/payment">
                  <Button variant="ghost" className="w-full justify-start">
                    <CreditCard className="w-5 h-5 mr-3" />
                    Payment & Wallet
                  </Button>
                </Link>
                <Button variant="ghost" className="w-full justify-start">
                  <Clock className="w-5 h-5 mr-3" />
                  Order History
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Gift className="w-5 h-5 mr-3" />
                  Rewards & Offers
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Settings className="w-5 h-5 mr-3" />
                  Settings
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Phone className="w-5 h-5 mr-3" />
                  Help & Support
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          <div className="flex items-center space-x-2">
            <Badge className="bg-black text-white px-3 py-1 text-xs font-bold rounded-full">
              <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
              PLATINUM
            </Badge>
          </div>

          <Button variant="ghost" size="icon" className="text-white relative hover:bg-white/20">
            <Bell className="w-6 h-6" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6 space-y-6 relative z-10">
        {/* Greeting Section */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {currentTime}, {userName}
          </h1>
          <p className="text-gray-600 text-lg">How can we help you?</p>
          {isDemo && (
            <Badge variant="secondary" className="mt-3 bg-blue-100 text-blue-800 px-3 py-1">
              🎮 Demo Mode - Try all features!
            </Badge>
          )}
        </div>

        {/* Main Services Grid - Exactly like screenshot */}
        <div className="grid grid-cols-4 gap-4">
          {mainServices.map((service) => {
            const IconComponent = service.icon
            return (
              <div
                key={service.id}
                className={`relative cursor-pointer transition-all duration-200 ${
                  activeService === service.id ? "scale-95" : "hover:scale-105"
                }`}
                onClick={() => setActiveService(service.id)}
              >
                <div className="bg-white rounded-3xl p-4 shadow-lg hover:shadow-xl transition-shadow">
                  <div
                    className={`w-14 h-14 ${service.color} rounded-2xl flex items-center justify-center mx-auto mb-3`}
                  >
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  <p className="text-sm font-semibold text-gray-800 text-center leading-tight">{service.name}</p>
                  {service.badge && (
                    <Badge className="absolute -top-2 -right-2 text-xs px-2 py-1 bg-red-500 text-white rounded-full">
                      {service.badge}
                    </Badge>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Where are you going? - Exactly like screenshot */}
        <Card className="bg-white/90 backdrop-blur-sm shadow-lg rounded-2xl">
          <CardContent className="p-5">
            <h3 className="font-bold text-gray-800 mb-4 text-lg">Where are you going?</h3>
            <div className="space-y-3">
              {savedLocations.slice(0, 2).map((location, index) => {
                const IconComponent = location.icon
                return (
                  <div
                    key={index}
                    className="flex items-center space-x-4 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{location.name}</p>
                      <p className="text-sm text-gray-500">{location.address}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Order Again - Exactly like screenshot */}
        <Card className="bg-white/90 backdrop-blur-sm shadow-lg rounded-2xl">
          <CardContent className="p-5">
            <h3 className="font-bold text-gray-800 mb-4 text-lg">Order again?</h3>
            <div className="grid grid-cols-2 gap-4">
              {recentOrders.map((order, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <Badge className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">{order.status}</Badge>
                    <div className="flex items-center">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs ml-1 text-gray-600">{order.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden">
                      <Image
                        src="/placeholder.jpg"
                        alt={order.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-gray-800">{order.name}</h4>
                      <p className="text-xs text-gray-500">Est: {order.eta}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bottom promotional section */}
        <div className="h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center shadow-lg">
          <div className="text-white text-center">
            <p className="font-bold">Special Weekend Offer!</p>
            <p className="text-sm opacity-90">Get 25% off on all services</p>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 px-4 py-2">
        <div className="grid grid-cols-5 gap-1">
          {[
            { icon: Home, label: "Home", active: true },
            { icon: Search, label: "Search", active: false },
            { icon: Package, label: "Orders", active: false },
            { icon: Heart, label: "Saved", active: false },
            { icon: User, label: "Profile", active: false },
          ].map((item, index) => {
            const IconComponent = item.icon
            return (
              <Button
                key={index}
                variant="ghost"
                className={`flex-col h-14 p-1 ${
                  item.active ? "text-orange-500" : "text-gray-400"
                } hover:text-orange-500`}
              >
                <IconComponent className="w-5 h-5" />
                <span className="text-xs mt-1">{item.label}</span>
              </Button>
            )
          })}
        </div>
      </div>

      {/* Safe area for mobile devices */}
      <div className="h-20"></div>
    </div>
  )
}
