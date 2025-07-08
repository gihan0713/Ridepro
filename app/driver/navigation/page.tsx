"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Navigation, Phone, MessageCircle, ArrowLeft, MapPin, Clock, DollarSign } from "lucide-react"
import Link from "next/link"
import GoogleMaps from "@/components/google-maps"

export default function DriverNavigationPage() {
  const [currentStep, setCurrentStep] = useState("pickup") // pickup, in_transit, arrived
  const [driverLocation, setDriverLocation] = useState({ lat: 40.73, lng: -74.0 })
  const [estimatedTime, setEstimatedTime] = useState(5)

  const rideDetails = {
    id: "R12345",
    passenger: {
      name: "Emily Johnson",
      rating: 4.8,
      phone: "+1 (555) 987-6543",
    },
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

  // Simulate driver movement
  useEffect(() => {
    const interval = setInterval(() => {
      setDriverLocation((prev) => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.0005,
        lng: prev.lng + (Math.random() - 0.5) * 0.0005,
      }))

      setEstimatedTime((prev) => Math.max(0, prev - 0.2))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const getStepInfo = () => {
    switch (currentStep) {
      case "pickup":
        return {
          title: "Navigate to Pickup",
          description: "Drive to passenger pickup location",
          destination: rideDetails.pickup.coordinates,
          address: rideDetails.pickup.address,
          action: "Arrive at Pickup",
          nextStep: "in_transit",
        }
      case "in_transit":
        return {
          title: "Passenger Picked Up",
          description: "Navigate to destination",
          destination: rideDetails.destination.coordinates,
          address: rideDetails.destination.address,
          action: "Complete Trip",
          nextStep: "arrived",
        }
      case "arrived":
        return {
          title: "Trip Completed",
          description: "You have arrived at the destination",
          destination: rideDetails.destination.coordinates,
          address: rideDetails.destination.address,
          action: "End Trip",
          nextStep: null,
        }
      default:
        return {
          title: "Unknown Step",
          description: "",
          destination: rideDetails.pickup.coordinates,
          address: "",
          action: "Continue",
          nextStep: null,
        }
    }
  }

  const stepInfo = getStepInfo()

  const getMapMarkers = () => {
    const markers = [
      {
        position: driverLocation,
        title: "Your Location",
        icon: "/driver-marker.png",
        info: "<div><strong>You are here</strong></div>",
      },
    ]

    if (currentStep === "pickup") {
      markers.push({
        position: rideDetails.pickup.coordinates,
        title: "Pickup Location",
        icon: "/pickup-marker.png",
        info: `<div><strong>Pickup</strong><br/>${rideDetails.pickup.address}</div>`,
      })
    }

    if (currentStep === "in_transit" || currentStep === "arrived") {
      markers.push({
        position: rideDetails.destination.coordinates,
        title: "Destination",
        icon: "/destination-marker.png",
        info: `<div><strong>Destination</strong><br/>${rideDetails.destination.address}</div>`,
      })
    }

    return markers
  }

  const handleStepAction = () => {
    if (stepInfo.nextStep) {
      setCurrentStep(stepInfo.nextStep)
      setEstimatedTime(currentStep === "pickup" ? 22 : 0)
    } else {
      // Trip completed, redirect to dashboard
      window.location.href = "/driver/dashboard"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <Link href="/driver/dashboard">
                <Button variant="ghost" size="icon" className="mr-4">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <Navigation className="w-5 h-5 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">Navigation</span>
              </div>
            </div>
            <Badge className="bg-blue-100 text-blue-800">{stepInfo.title}</Badge>
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
                  center={driverLocation}
                  zoom={15}
                  height="500px"
                  markers={getMapMarkers()}
                  directions={{
                    origin: driverLocation,
                    destination: stepInfo.destination,
                  }}
                  className="rounded-lg overflow-hidden"
                />
              </CardContent>
            </Card>

            {/* Navigation Instructions */}
            <Card className="mt-6">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Navigation className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{stepInfo.title}</h3>
                      <p className="text-gray-600">{stepInfo.address}</p>
                      {estimatedTime > 0 && (
                        <p className="text-sm text-blue-600">
                          <Clock className="w-4 h-4 inline mr-1" />
                          {Math.ceil(estimatedTime)} min away
                        </p>
                      )}
                    </div>
                  </div>
                  <Button onClick={handleStepAction} size="lg">
                    {stepInfo.action}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Info Panel */}
          <div className="space-y-6">
            {/* Passenger Info */}
            <Card>
              <CardHeader>
                <CardTitle>Passenger Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback>
                      {rideDetails.passenger.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold">{rideDetails.passenger.name}</h3>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400">★</span>
                      <span className="text-sm">{rideDetails.passenger.rating}</span>
                    </div>
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

            {/* Trip Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Trip Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Trip ID</span>
                  <span className="font-medium">{rideDetails.id}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Distance</span>
                  <span className="font-medium">{rideDetails.distance}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Estimated Duration</span>
                  <span className="font-medium">{rideDetails.estimatedDuration}</span>
                </div>
                <div className="flex items-center justify-between border-t pt-4">
                  <span className="text-gray-600">Fare</span>
                  <span className="font-bold text-green-600 text-lg">{rideDetails.fare}</span>
                </div>
              </CardContent>
            </Card>

            {/* Route Details */}
            <Card>
              <CardHeader>
                <CardTitle>Route</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Pickup</p>
                    <p className="text-sm text-gray-600">{rideDetails.pickup.address}</p>
                  </div>
                </div>
                <div className="ml-1.5 border-l-2 border-gray-200 h-6"></div>
                <div className="flex items-start space-x-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Destination</p>
                    <p className="text-sm text-gray-600">{rideDetails.destination.address}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <MapPin className="w-4 h-4 mr-2" />
                  Open in Maps App
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Report Issue
                </Button>
              </CardContent>
            </Card>

            {/* Step Controls (for demo) */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Demo Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setCurrentStep("pickup")}
                  className="w-full text-xs bg-transparent"
                >
                  Go to Pickup
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setCurrentStep("in_transit")}
                  className="w-full text-xs bg-transparent"
                >
                  Start Trip
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setCurrentStep("arrived")}
                  className="w-full text-xs bg-transparent"
                >
                  Complete Trip
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
