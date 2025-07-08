"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MapPin, Clock, Star, Car, Users, Zap, Shield, ArrowLeft, Navigation } from "lucide-react"
import Link from "next/link"
import GoogleMaps from "@/components/google-maps"
import LocationSearch from "@/components/location-search"

export default function BookRidePage() {
  const [step, setStep] = useState(1) // 1: Details, 2: Select Ride, 3: Confirm, 4: Tracking
  const [pickup, setPickup] = useState("123 Main St, Downtown")
  const [destination, setDestination] = useState("456 Oak Ave, Uptown")
  const [selectedRide, setSelectedRide] = useState(null)
  const [estimatedTime, setEstimatedTime] = useState(8)

  const [pickupLocation, setPickupLocation] = useState({
    address: "123 Main St, Downtown",
    coordinates: { lat: 40.7128, lng: -74.006 },
  })
  const [destinationLocation, setDestinationLocation] = useState({
    address: "456 Oak Ave, Uptown",
    coordinates: { lat: 40.7589, lng: -73.9851 },
  })
  const [driverLocation, setDriverLocation] = useState({ lat: 40.73, lng: -74.0 })

  const rideOptions = [
    {
      id: 1,
      type: "Economy",
      description: "Affordable rides for everyday trips",
      price: "$8.50",
      eta: "5-8 min",
      icon: Car,
      capacity: "4 seats",
    },
    {
      id: 2,
      type: "Standard",
      description: "Comfortable rides with reliable drivers",
      price: "$12.30",
      eta: "3-6 min",
      icon: Car,
      capacity: "4 seats",
    },
    {
      id: 3,
      type: "Premium",
      description: "High-end vehicles for special occasions",
      price: "$18.90",
      eta: "5-10 min",
      icon: Zap,
      capacity: "4 seats",
    },
    {
      id: 4,
      type: "XL",
      description: "Spacious rides for groups",
      price: "$15.60",
      eta: "8-12 min",
      icon: Users,
      capacity: "6 seats",
    },
  ]

  const currentDriver = {
    name: "Alex Rodriguez",
    rating: 4.9,
    vehicle: "Toyota Camry",
    plate: "ABC-123",
    eta: "3 min",
    phone: "+1 (555) 123-4567",
  }

  useEffect(() => {
    if (step === 4) {
      const interval = setInterval(() => {
        setEstimatedTime((prev) => Math.max(0, prev - 1))
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [step])

  const handleRideSelection = (ride) => {
    setSelectedRide(ride)
    setStep(3)
  }

  const handleConfirmBooking = () => {
    setStep(4)
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
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Book Ride</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Step 1: Trip Details */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Trip Details</CardTitle>
              <CardDescription>Confirm your pickup and destination</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pickup">Pickup Location</Label>
                <LocationSearch
                  placeholder="Enter pickup address"
                  value={pickupLocation.address}
                  onLocationSelect={(location) => {
                    setPickupLocation(location)
                    setPickup(location.address)
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="destination">Destination</Label>
                <LocationSearch
                  placeholder="Where to?"
                  value={destinationLocation.address}
                  onLocationSelect={(location) => {
                    setDestinationLocation(location)
                    setDestination(location.address)
                  }}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Estimated Distance</Label>
                  <p className="text-lg font-medium">8.5 miles</p>
                </div>
                <div className="space-y-2">
                  <Label>Estimated Duration</Label>
                  <p className="text-lg font-medium">22 minutes</p>
                </div>
              </div>
              <Button onClick={() => setStep(2)} className="w-full">
                Continue to Ride Options
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Select Ride Type */}
        {step === 2 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Choose Your Ride</CardTitle>
                <CardDescription>Select the ride type that best fits your needs</CardDescription>
              </CardHeader>
            </Card>
            <div className="grid gap-4">
              {rideOptions.map((ride) => {
                const IconComponent = ride.icon
                return (
                  <Card
                    key={ride.id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleRideSelection(ride)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <IconComponent className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{ride.type}</h3>
                            <p className="text-gray-600 text-sm">{ride.description}</p>
                            <p className="text-gray-500 text-sm">{ride.capacity}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold">{ride.price}</p>
                          <p className="text-sm text-gray-600">{ride.eta}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )}

        {/* Step 3: Confirm Booking */}
        {step === 3 && selectedRide && (
          <Card>
            <CardHeader>
              <CardTitle>Confirm Your Booking</CardTitle>
              <CardDescription>Review your trip details before confirming</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Pickup</p>
                    <p className="text-gray-600">{pickup}</p>
                  </div>
                  <MapPin className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Destination</p>
                    <p className="text-gray-600">{destination}</p>
                  </div>
                  <Navigation className="w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <selectedRide.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{selectedRide.type}</p>
                      <p className="text-sm text-gray-600">{selectedRide.capacity}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold">{selectedRide.price}</p>
                    <p className="text-sm text-gray-600">ETA: {selectedRide.eta}</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span>Subtotal</span>
                  <span>{selectedRide.price}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span>Service Fee</span>
                  <span>$1.50</span>
                </div>
                <div className="flex justify-between items-center font-bold text-lg border-t pt-2">
                  <span>Total</span>
                  <span>${(Number.parseFloat(selectedRide.price.slice(1)) + 1.5).toFixed(2)}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                  Back
                </Button>
                <Button onClick={handleConfirmBooking} className="flex-1">
                  Confirm Booking
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Ride Tracking */}
        {step === 4 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  Driver En Route
                </CardTitle>
                <CardDescription>Your driver is on the way to pick you up</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback>AR</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{currentDriver.name}</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{currentDriver.rating}</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {currentDriver.vehicle} • {currentDriver.plate}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">{estimatedTime}m</p>
                    <p className="text-sm text-gray-600">ETA</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                    <Shield className="w-4 h-4" />
                    Share Trip
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                    <Clock className="w-4 h-4" />
                    Call Driver
                  </Button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Driver accepted your ride</span>
                    <span className="text-xs text-gray-500 ml-auto">2 min ago</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Driver is heading to pickup location</span>
                    <span className="text-xs text-gray-500 ml-auto">1 min ago</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <span className="text-sm text-gray-500">Driver will arrive soon</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <GoogleMaps
                  center={pickupLocation.coordinates}
                  zoom={14}
                  height="300px"
                  markers={[
                    {
                      position: pickupLocation.coordinates,
                      title: "Pickup Location",
                      icon: "/pickup-marker.png",
                      info: `<div><strong>Pickup</strong><br/>${pickupLocation.address}</div>`,
                    },
                    {
                      position: destinationLocation.coordinates,
                      title: "Destination",
                      icon: "/destination-marker.png",
                      info: `<div><strong>Destination</strong><br/>${destinationLocation.address}</div>`,
                    },
                    {
                      position: driverLocation,
                      title: currentDriver.name,
                      icon: "/driver-marker.png",
                      info: `<div><strong>${currentDriver.name}</strong><br/>${currentDriver.vehicle}<br/>ETA: ${currentDriver.eta}</div>`,
                    },
                  ]}
                  directions={{
                    origin: driverLocation,
                    destination: pickupLocation.coordinates,
                  }}
                />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
