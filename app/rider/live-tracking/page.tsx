"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Phone, MessageCircle, Share, AlertTriangle, ArrowLeft, Navigation } from "lucide-react"
import Link from "next/link"
import GoogleMaps from "@/components/google-maps"

export default function LiveTrackingPage() {
  const [rideStatus, setRideStatus] = useState("driver_en_route") // driver_en_route, arrived, in_progress, completed
  const [estimatedTime, setEstimatedTime] = useState(8)
  const [driverLocation, setDriverLocation] = useState({ lat: 40.73, lng: -74.0 })

  const rideDetails = {
    id: "R12345",
    pickup: {
      address: "123 Main St, Downtown",
      coordinates: { lat: 40.7128, lng: -74.006 },
    },
    destination: {
      address: "456 Oak Ave, Uptown",
      coordinates: { lat: 40.7589, lng: -73.9851 },
    },
    fare: "$18.50",
    distance: "8.5 miles",
    estimatedDuration: "22 minutes",
  }

  const driver = {
    name: "Alex Rodriguez",
    rating: 4.9,
    vehicle: "Toyota Camry",
    plate: "ABC-123",
    phone: "+1 (555) 123-4567",
    photo: "/driver-photo.jpg",
  }

  // Simulate driver movement
  useEffect(() => {
    const interval = setInterval(() => {
      setDriverLocation((prev) => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.001,
        lng: prev.lng + (Math.random() - 0.5) * 0.001,
      }))

      if (rideStatus === "driver_en_route") {
        setEstimatedTime((prev) => Math.max(0, prev - 0.5))
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [rideStatus])

  const getStatusInfo = () => {
    switch (rideStatus) {
      case "driver_en_route":
        return {
          title: "Driver En Route",
          description: "Your driver is on the way to pick you up",
          color: "bg-blue-100 text-blue-800",
          icon: "🚗",
        }
      case "arrived":
        return {
          title: "Driver Arrived",
          description: "Your driver has arrived at the pickup location",
          color: "bg-green-100 text-green-800",
          icon: "✅",
        }
      case "in_progress":
        return {
          title: "Trip in Progress",
          description: "You're on your way to the destination",
          color: "bg-purple-100 text-purple-800",
          icon: "🛣️",
        }
      case "completed":
        return {
          title: "Trip Completed",
          description: "You have arrived at your destination",
          color: "bg-green-100 text-green-800",
          icon: "🎉",
        }
      default:
        return {
          title: "Unknown Status",
          description: "",
          color: "bg-gray-100 text-gray-800",
          icon: "❓",
        }
    }
  }

  const statusInfo = getStatusInfo()

  const getDirections = () => {
    if (rideStatus === "driver_en_route" || rideStatus === "arrived") {
      return {
        origin: driverLocation,
        destination: rideDetails.pickup.coordinates,
      }
    } else if (rideStatus === "in_progress") {
      return {
        origin: rideDetails.pickup.coordinates,
        destination: rideDetails.destination.coordinates,
      }
    }
    return undefined
  }

  const getMapMarkers = () => {
    const markers = [
      {
        position: rideDetails.pickup.coordinates,
        title: "Pickup Location",
        icon: "/pickup-marker.png",
        info: `<div><strong>Pickup</strong><br/>${rideDetails.pickup.address}</div>`,
      },
      {
        position: rideDetails.destination.coordinates,
        title: "Destination",
        icon: "/destination-marker.png",
        info: `<div><strong>Destination</strong><br/>${rideDetails.destination.address}</div>`,
      },
    ]

    if (rideStatus !== "completed") {
      markers.push({
        position: driverLocation,
        title: driver.name,
        icon: "/driver-marker.png",
        info: `<div><strong>${driver.name}</strong><br/>${driver.vehicle}<br/>Plate: ${driver.plate}</div>`,
      })
    }

    return markers
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <Link href="/rider/dashboard">
              <Button variant="ghost" size="icon" className="mr-4">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-gray-900">Live Tracking</span>
              <Badge className={statusInfo.color}>
                {statusInfo.icon} {statusInfo.title}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-0">
                <GoogleMaps
                  center={rideStatus === "driver_en_route" ? driverLocation : rideDetails.pickup.coordinates}
                  zoom={14}
                  height="500px"
                  markers={getMapMarkers()}
                  directions={getDirections()}
                  className="rounded-lg overflow-hidden"
                />
              </CardContent>
            </Card>
          </div>

          {/* Info Panel */}
          <div className="space-y-6">
            {/* Status Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  {statusInfo.title}
                </CardTitle>
                <CardDescription>{statusInfo.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {rideStatus === "driver_en_route" && (
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-1">{estimatedTime.toFixed(0)}m</div>
                    <p className="text-sm text-gray-600">Estimated arrival</p>
                  </div>
                )}
                {rideStatus === "arrived" && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">Driver Arrived!</div>
                    <p className="text-sm text-gray-600">Look for {driver.vehicle}</p>
                  </div>
                )}
                {rideStatus === "in_progress" && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-1">{rideDetails.estimatedDuration}</div>
                    <p className="text-sm text-gray-600">to destination</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Driver Info */}
            <Card>
              <CardHeader>
                <CardTitle>Your Driver</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar className="w-16 h-16">
                    <AvatarFallback className="text-lg">
                      {driver.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{driver.name}</h3>
                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-yellow-400">★</span>
                      <span className="text-sm font-medium">{driver.rating}</span>
                    </div>
                    <p className="text-sm text-gray-600">{driver.vehicle}</p>
                    <p className="text-sm text-gray-600">Plate: {driver.plate}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="bg-transparent">
                    <Phone className="w-4 h-4 mr-1" />
                    Call
                  </Button>
                  <Button variant="outline" size="sm" className="bg-transparent">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Message
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Trip Details */}
            <Card>
              <CardHeader>
                <CardTitle>Trip Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pickup</p>
                  <p className="text-sm">{rideDetails.pickup.address}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Destination</p>
                  <p className="text-sm">{rideDetails.destination.address}</p>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Distance</span>
                  <span className="text-sm font-medium">{rideDetails.distance}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Fare</span>
                  <span className="text-sm font-medium">{rideDetails.fare}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Trip ID</span>
                  <span className="text-sm font-medium">{rideDetails.id}</span>
                </div>
              </CardContent>
            </Card>

            {/* Safety Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Safety & Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Share className="w-4 h-4 mr-2" />
                  Share Trip Status
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Navigation className="w-4 h-4 mr-2" />
                  Get Directions
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                >
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Emergency Support
                </Button>
              </CardContent>
            </Card>

            {/* Status Simulation Buttons (for demo) */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Demo Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setRideStatus("driver_en_route")}
                  className="w-full text-xs bg-transparent"
                >
                  Driver En Route
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setRideStatus("arrived")}
                  className="w-full text-xs bg-transparent"
                >
                  Driver Arrived
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setRideStatus("in_progress")}
                  className="w-full text-xs bg-transparent"
                >
                  Trip Started
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setRideStatus("completed")}
                  className="w-full text-xs bg-transparent"
                >
                  Trip Completed
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
