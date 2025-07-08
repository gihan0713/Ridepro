"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  MapPin,
  Clock,
  CreditCard,
  Star,
  Calendar,
  Navigation,
  Phone,
  Zap,
  Shield,
  Car,
  Package,
  Utensils,
  Home,
  Briefcase,
  Heart,
  GraduationCap,
  Music,
  Grid3X3,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import LocationSearch from "@/components/location-search"
import DemoBanner from "@/components/demo-banner"
import MobileNav from "@/components/mobile-nav"
import ServiceCard from "@/components/service-card"

export default function RiderDashboard() {
  const [pickup, setPickup] = useState("")
  const [destination, setDestination] = useState("")
  const [rideType, setRideType] = useState("standard")
  const [scheduledTime, setScheduledTime] = useState("")
  const [isDemo] = useState(true)

  const [pickupLocation, setPickupLocation] = useState({
    address: "",
    coordinates: { lat: 40.7128, lng: -74.006 },
  })
  const [destinationLocation, setDestinationLocation] = useState({
    address: "",
    coordinates: { lat: 40.7589, lng: -73.9851 },
  })

  const quickServices = [
    {
      id: "rideshare",
      name: "Ride Share",
      description: "Quick rides around the city",
      icon: Car,
      category: "transport",
      price: "From $5",
      rating: 4.8,
      eta: "3-8 min",
      popular: true,
      features: ["GPS Tracking", "Multiple Stops"],
      color: "bg-blue-500",
    },
    {
      id: "food-delivery",
      name: "Food Delivery",
      description: "Meals from your favorite restaurants",
      icon: Utensils,
      category: "food",
      price: "From $3",
      rating: 4.5,
      eta: "20-45 min",
      popular: true,
      features: ["1000+ Restaurants", "Live Tracking"],
      color: "bg-red-500",
    },
    {
      id: "package-delivery",
      name: "Package Delivery",
      description: "Same-day package delivery",
      icon: Package,
      category: "delivery",
      price: "From $8",
      rating: 4.7,
      eta: "30-60 min",
      features: ["Real-time Tracking", "Proof of Delivery"],
      color: "bg-green-500",
    },
    {
      id: "home-cleaning",
      name: "Home Cleaning",
      description: "Professional cleaning services",
      icon: Home,
      category: "home",
      price: "From $50",
      rating: 4.7,
      eta: "2-4 hours",
      features: ["Verified Cleaners", "Eco Products"],
      color: "bg-purple-500",
    },
  ]

  const serviceCategories = [
    { id: "transport", name: "Transport", icon: Car, count: 8 },
    { id: "delivery", name: "Delivery", icon: Package, count: 12 },
    { id: "food", name: "Food", icon: Utensils, count: 6 },
    { id: "home", name: "Home", icon: Home, count: 10 },
    { id: "business", name: "Business", icon: Briefcase, count: 5 },
    { id: "health", name: "Health", icon: Heart, count: 4 },
    { id: "education", name: "Education", icon: GraduationCap, count: 3 },
    { id: "entertainment", name: "Entertainment", icon: Music, count: 7 },
  ]

  const recentRides = [
    {
      id: 1,
      service: "Ride Share",
      provider: "Sarah Johnson",
      date: "2024-01-15",
      from: "Downtown Mall",
      to: "Airport Terminal 1",
      fare: "$25.50",
      rating: 5,
      status: "completed",
      type: "transport",
    },
    {
      id: 2,
      service: "Food Delivery",
      provider: "Mike Chen",
      date: "2024-01-14",
      from: "Pizza Palace",
      to: "Home",
      fare: "$18.30",
      rating: 4,
      status: "completed",
      type: "food",
    },
    {
      id: 3,
      service: "Package Delivery",
      provider: "Alex Rodriguez",
      date: "2024-01-13",
      from: "Office",
      to: "Client Location",
      fare: "$12.90",
      rating: 5,
      status: "completed",
      type: "delivery",
    },
  ]

  const handleBookRide = () => {
    const params = new URLSearchParams({
      pickup: pickupLocation.address,
      pickupLat: pickupLocation.coordinates.lat.toString(),
      pickupLng: pickupLocation.coordinates.lng.toString(),
      destination: destinationLocation.address,
      destLat: destinationLocation.coordinates.lat.toString(),
      destLng: destinationLocation.coordinates.lng.toString(),
    })
    window.location.href = `/rider/book?${params.toString()}`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Demo Banner */}
      {isDemo && <DemoBanner />}

      {/* Header */}
      <header className={`bg-white shadow-sm border-b ${isDemo ? "mt-16" : ""}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <MobileNav userType="rider" isDemo={isDemo} />
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 hidden sm:block">RideShare Pro</span>
              {isDemo && (
                <Badge variant="secondary" className="hidden sm:inline-flex">
                  DEMO
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <Phone className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </Button>
              <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Ride Booking */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="w-5 h-5" />
                  Quick Ride
                  {isDemo && (
                    <Badge variant="secondary" className="text-xs">
                      Try it!
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription>Book a ride in seconds</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pickup">From</Label>
                    <LocationSearch
                      placeholder="Pickup location"
                      onLocationSelect={(location) => {
                        setPickupLocation(location)
                        setPickup(location.address)
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="destination">To</Label>
                    <LocationSearch
                      placeholder="Where to?"
                      onLocationSelect={(location) => {
                        setDestinationLocation(location)
                        setDestination(location.address)
                      }}
                    />
                  </div>
                </div>
                <Button onClick={handleBookRide} className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                  <Navigation className="w-4 h-4 mr-2" />
                  Book Ride Now
                </Button>
              </CardContent>
            </Card>

            {/* Service Categories */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>All Services</CardTitle>
                    <CardDescription>Choose from our wide range of services</CardDescription>
                  </div>
                  <Link href="/services">
                    <Button variant="outline" size="sm">
                      <Grid3X3 className="w-4 h-4 mr-2" />
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {serviceCategories.map((category) => {
                    const IconComponent = category.icon
                    return (
                      <Link key={category.id} href={`/services?category=${category.id}`}>
                        <div className="p-4 border rounded-lg hover:shadow-md transition-all hover:bg-gray-50 cursor-pointer text-center">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                            <IconComponent className="w-6 h-6 text-blue-600" />
                          </div>
                          <h3 className="font-medium text-sm">{category.name}</h3>
                          <p className="text-xs text-gray-600">{category.count} services</p>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Popular Services */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Popular Services</CardTitle>
                    <CardDescription>Most requested services</CardDescription>
                  </div>
                  <Link href="/services">
                    <Button variant="outline" size="sm">
                      View All
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {quickServices.map((service) => (
                    <ServiceCard key={service.id} service={service} size="small" />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your recent bookings and services</CardDescription>
                  </div>
                  <Link href="/rider/history">
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentRides.map((ride) => (
                    <div
                      key={ride.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          {ride.type === "transport" && <Car className="w-5 h-5 text-blue-600" />}
                          {ride.type === "food" && <Utensils className="w-5 h-5 text-red-600" />}
                          {ride.type === "delivery" && <Package className="w-5 h-5 text-green-600" />}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{ride.service}</p>
                          <p className="text-sm text-gray-600">{ride.provider}</p>
                          <p className="text-sm text-gray-600">{ride.date}</p>
                          <p className="text-sm text-gray-500 truncate max-w-[200px] sm:max-w-none">
                            {ride.from} → {ride.to}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{ride.fare}</p>
                        <div className="flex items-center gap-1 justify-end">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{ride.rating}</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {ride.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions - Desktop */}
            <Card className="hidden lg:block">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/rider/schedule">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Service
                  </Button>
                </Link>
                <Link href="/rider/payment">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Payment Methods
                  </Button>
                </Link>
                <Link href="/rider/live-tracking">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Navigation className="w-4 h-4 mr-2" />
                    Track Service
                  </Button>
                </Link>
                <Link href="/rider/history">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Clock className="w-4 h-4 mr-2" />
                    Service History
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Account Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Account Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Services</span>
                  <span className="font-medium">127</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Average Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">4.8</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Spent</span>
                  <span className="font-medium">$1,542.30</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saved Amount</span>
                  <span className="font-medium text-green-600">$289.50</span>
                </div>
              </CardContent>
            </Card>

            {/* Current Offers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Current Offers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                    <p className="font-medium text-blue-900">20% Off All Services</p>
                    <p className="text-sm text-blue-700">Use code: SAVE20</p>
                    <Badge variant="secondary" className="mt-2 text-xs">
                      Expires in 2 days
                    </Badge>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="font-medium text-green-900">Free Delivery</p>
                    <p className="text-sm text-green-700">On orders over $25</p>
                    <div className="flex items-center mt-2">
                      <div className="flex-1 bg-green-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "75%" }}></div>
                      </div>
                      <span className="text-xs text-green-700 ml-2">$18.75/$25</span>
                    </div>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <p className="font-medium text-orange-900">Loyalty Rewards</p>
                    <p className="text-sm text-orange-700">Earn points on every service</p>
                    <Badge variant="secondary" className="mt-2 text-xs">
                      1,250 points available
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Safety Features */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Safety & Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start text-sm bg-transparent">
                  <Shield className="w-4 h-4 mr-2" />
                  Emergency Contacts
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm bg-transparent">
                  <MapPin className="w-4 h-4 mr-2" />
                  Share Service Status
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm bg-transparent">
                  <Phone className="w-4 h-4 mr-2" />
                  24/7 Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
