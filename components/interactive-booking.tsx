"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, Car, Users, Zap, Star } from "lucide-react"

interface InteractiveBookingProps {
  isDemo?: boolean
  onBookingComplete?: () => void
}

export default function InteractiveBooking({ isDemo = false, onBookingComplete }: InteractiveBookingProps) {
  const [step, setStep] = useState(1)
  const [selectedRide, setSelectedRide] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const rideOptions = [
    {
      id: 1,
      type: "Economy",
      description: "Affordable rides for everyday trips",
      price: "$8.50",
      eta: "5-8 min",
      icon: Car,
      capacity: "4 seats",
      rating: 4.2,
      savings: "Save 20%",
    },
    {
      id: 2,
      type: "Standard",
      description: "Comfortable rides with reliable drivers",
      price: "$12.30",
      eta: "3-6 min",
      icon: Car,
      capacity: "4 seats",
      rating: 4.6,
      popular: true,
    },
    {
      id: 3,
      type: "Premium",
      description: "High-end vehicles for special occasions",
      price: "$18.90",
      eta: "5-10 min",
      icon: Zap,
      capacity: "4 seats",
      rating: 4.9,
    },
    {
      id: 4,
      type: "XL",
      description: "Spacious rides for groups",
      price: "$15.60",
      eta: "8-12 min",
      icon: Users,
      capacity: "6 seats",
      rating: 4.4,
    },
  ]

  const handleRideSelect = (rideId: number) => {
    setSelectedRide(rideId)
    setIsLoading(true)

    // Simulate booking process
    setTimeout(() => {
      setIsLoading(false)
      setStep(2)
    }, 1500)
  }

  const handleConfirmBooking = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setStep(3)
      onBookingComplete?.()
    }, 2000)
  }

  if (step === 1) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Choose Your Ride
              {isDemo && (
                <Badge variant="secondary" className="ml-2">
                  DEMO
                </Badge>
              )}
            </CardTitle>
            <CardDescription>Select the perfect ride for your journey</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2 mb-4">
              <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm">Downtown Mall</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm">Airport Terminal 1</span>
              </div>
            </div>

            <div className="grid gap-4">
              {rideOptions.map((ride) => {
                const IconComponent = ride.icon
                return (
                  <Card
                    key={ride.id}
                    className="cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-[1.02]"
                    onClick={() => handleRideSelect(ride.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <IconComponent className="w-6 h-6 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold">{ride.type}</h3>
                              {ride.popular && (
                                <Badge variant="secondary" className="text-xs">
                                  Popular
                                </Badge>
                              )}
                              {ride.savings && (
                                <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                                  {ride.savings}
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-1">{ride.description}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span>{ride.capacity}</span>
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                <span>{ride.rating}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold">{ride.price}</p>
                          <p className="text-sm text-gray-600">{ride.eta}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (step === 2) {
    const selectedRideData = rideOptions.find((r) => r.id === selectedRide)

    return (
      <Card>
        <CardHeader>
          <CardTitle>Confirm Your Booking</CardTitle>
          <CardDescription>Review your trip details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {selectedRideData && (
            <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <selectedRideData.icon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{selectedRideData.type}</h3>
                <p className="text-sm text-gray-600">{selectedRideData.capacity}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">{selectedRideData.price}</p>
                <p className="text-sm text-gray-600">ETA: {selectedRideData.eta}</p>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Subtotal</span>
              <span>{selectedRideData?.price}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Service Fee</span>
              <span>$1.50</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Discount</span>
              <span className="text-green-600">-$2.00</span>
            </div>
            <div className="flex justify-between items-center font-bold text-lg border-t pt-4">
              <span>Total</span>
              <span>${(Number.parseFloat(selectedRideData?.price.slice(1) || "0") - 0.5).toFixed(2)}</span>
            </div>
          </div>

          <Button onClick={handleConfirmBooking} className="w-full" disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Finding Driver...
              </div>
            ) : (
              "Confirm Booking"
            )}
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Navigation className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold mb-2">Booking Confirmed!</h3>
        <p className="text-gray-600 mb-4">Your driver is on the way</p>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Driver:</span>
            <span className="font-medium">Alex Rodriguez</span>
          </div>
          <div className="flex justify-between">
            <span>Vehicle:</span>
            <span className="font-medium">Toyota Camry</span>
          </div>
          <div className="flex justify-between">
            <span>ETA:</span>
            <span className="font-medium text-blue-600">5 minutes</span>
          </div>
        </div>
        <Button className="w-full mt-6">Track Your Ride</Button>
      </CardContent>
    </Card>
  )
}
