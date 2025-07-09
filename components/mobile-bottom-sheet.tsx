"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MapPin, Clock, Star, CreditCard, Shield, Phone, X, Navigation } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"

interface MobileBottomSheetProps {
  isOpen: boolean
  onClose: () => void
  service: {
    name: string
    description: string
    price: string
    rating: number
    eta: string
    features: string[]
  } | null
}

export default function MobileBottomSheet({ isOpen, onClose, service }: MobileBottomSheetProps) {
  const [pickup, setPickup] = useState("")
  const [destination, setDestination] = useState("")
  const [selectedPackage, setSelectedPackage] = useState("standard")

  if (!service) return null

  const packages = [
    { id: "economy", name: "Economy", price: "$8.50", time: "5-10 min", description: "Budget-friendly option" },
    { id: "standard", name: "Standard", price: "$12.30", time: "3-8 min", description: "Most popular choice" },
    { id: "premium", name: "Premium", price: "$18.90", time: "2-5 min", description: "Fastest & comfortable" },
  ]

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[90vh] rounded-t-3xl p-0">
        <div className="flex flex-col h-full">
          {/* Handle */}
          <div className="flex justify-center py-3">
            <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
          </div>

          {/* Header */}
          <SheetHeader className="px-6 pb-4">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-xl font-bold">{service.name}</SheetTitle>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-gray-600 text-left">{service.description}</p>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{service.rating}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4 text-gray-500" />
                <span>{service.eta}</span>
              </div>
              <Badge className="bg-green-100 text-green-800">{service.price}</Badge>
            </div>
          </SheetHeader>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 space-y-6">
            {/* Location Inputs */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pickup">Pickup Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="pickup"
                    placeholder="Enter pickup address"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    className="pl-10 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="destination">Destination</Label>
                <div className="relative">
                  <Navigation className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="destination"
                    placeholder="Where to?"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="pl-10 rounded-xl"
                  />
                </div>
              </div>
            </div>

            {/* Package Selection */}
            <div className="space-y-3">
              <Label>Choose Package</Label>
              <div className="space-y-2">
                {packages.map((pkg) => (
                  <Card
                    key={pkg.id}
                    className={`cursor-pointer transition-all rounded-xl ${
                      selectedPackage === pkg.id ? "ring-2 ring-orange-400 bg-orange-50" : "hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedPackage(pkg.id)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{pkg.name}</h4>
                          <p className="text-sm text-gray-600">{pkg.description}</p>
                          <p className="text-xs text-gray-500">{pkg.time}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">{pkg.price}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <Label>Included Features</Label>
              <div className="grid grid-cols-2 gap-2">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span className="text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety Info */}
            <Card className="bg-blue-50 border-blue-200 rounded-xl">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <h4 className="font-medium text-blue-900">Safety First</h4>
                </div>
                <p className="text-sm text-blue-800">
                  All our service providers are verified and insured. 24/7 support available.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Action */}
          <div className="p-6 bg-white border-t">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Estimated Total</span>
                <span className="font-semibold text-lg">{packages.find((p) => p.id === selectedPackage)?.price}</span>
              </div>

              <Button className="w-full bg-gradient-to-r from-orange-400 to-yellow-400 hover:from-orange-500 hover:to-yellow-500 text-white py-3 rounded-xl">
                <CreditCard className="w-4 h-4 mr-2" />
                Book {service.name}
              </Button>

              <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <Phone className="w-3 h-3" />
                  <span>24/7 Support</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Shield className="w-3 h-3" />
                  <span>Secure Payment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
