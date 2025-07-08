"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  ArrowLeft,
  Star,
  Clock,
  MapPin,
  Shield,
  Phone,
  MessageCircle,
  Calendar,
  CreditCard,
  Car,
  Utensils,
  Home,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import LocationSearch from "@/components/location-search"
import DemoBanner from "@/components/demo-banner"

export default function ServiceDetailPage() {
  const params = useParams()
  const serviceId = params.serviceId as string
  const [isDemo] = useState(true)
  const [selectedPackage, setSelectedPackage] = useState("")
  const [bookingStep, setBookingStep] = useState(1)
  const [formData, setFormData] = useState({
    pickupLocation: "",
    deliveryLocation: "",
    scheduledTime: "",
    specialInstructions: "",
    contactPhone: "",
    urgency: "standard",
  })

  // Service data (in real app, this would come from API)
  const serviceData = {
    rideshare: {
      name: "Ride Share",
      description: "Personal rides with professional drivers",
      icon: Car,
      color: "bg-blue-500",
      rating: 4.8,
      reviews: 12450,
      startingPrice: 5,
      eta: "3-8 min",
      category: "Transport",
      features: [
        "GPS Real-time Tracking",
        "Multiple Stop Options",
        "Scheduled Rides Available",
        "Professional Drivers",
        "24/7 Support",
        "Cashless Payments",
      ],
      packages: [
        {
          id: "economy",
          name: "Economy",
          description: "Affordable rides for everyday trips",
          price: 8.5,
          features: ["Standard vehicle", "Shared rides available", "Basic amenities"],
        },
        {
          id: "standard",
          name: "Standard",
          description: "Comfortable rides with reliable drivers",
          price: 12.3,
          features: ["Comfortable vehicle", "Private ride", "Climate control"],
          popular: true,
        },
        {
          id: "premium",
          name: "Premium",
          description: "High-end vehicles for special occasions",
          price: 18.9,
          features: ["Luxury vehicle", "Premium amenities", "Professional chauffeur"],
        },
      ],
    },
    "food-delivery": {
      name: "Food Delivery",
      description: "Meals from your favorite restaurants",
      icon: Utensils,
      color: "bg-red-500",
      rating: 4.5,
      reviews: 8920,
      startingPrice: 3,
      eta: "20-45 min",
      category: "Food & Dining",
      features: [
        "1000+ Restaurant Partners",
        "Live Order Tracking",
        "Group Order Options",
        "Contactless Delivery",
        "Hot Food Guarantee",
        "Multiple Payment Options",
      ],
      packages: [
        {
          id: "standard",
          name: "Standard Delivery",
          description: "Regular delivery service",
          price: 3.99,
          features: ["45-60 min delivery", "Standard packaging", "Basic tracking"],
        },
        {
          id: "express",
          name: "Express Delivery",
          description: "Faster delivery for urgent orders",
          price: 6.99,
          features: ["20-30 min delivery", "Priority handling", "Real-time tracking"],
          popular: true,
        },
        {
          id: "premium",
          name: "Premium Service",
          description: "White-glove delivery experience",
          price: 9.99,
          features: ["15-25 min delivery", "Premium packaging", "Personal delivery agent"],
        },
      ],
    },
    "home-cleaning": {
      name: "Home Cleaning",
      description: "Professional cleaning services",
      icon: Home,
      color: "bg-blue-500",
      rating: 4.7,
      reviews: 3240,
      startingPrice: 50,
      eta: "2-4 hours",
      category: "Home Services",
      features: [
        "Verified & Insured Cleaners",
        "Eco-Friendly Products",
        "Satisfaction Guarantee",
        "Flexible Scheduling",
        "Custom Cleaning Plans",
        "Same Day Service",
      ],
      packages: [
        {
          id: "basic",
          name: "Basic Cleaning",
          description: "Essential cleaning for small spaces",
          price: 50,
          features: ["1-2 rooms", "2 hours service", "Basic supplies included"],
        },
        {
          id: "standard",
          name: "Standard Cleaning",
          description: "Complete home cleaning service",
          price: 85,
          features: ["3-4 rooms", "3 hours service", "Premium supplies", "Deep cleaning"],
          popular: true,
        },
        {
          id: "deep",
          name: "Deep Cleaning",
          description: "Comprehensive deep cleaning",
          price: 150,
          features: ["Whole house", "5+ hours service", "Specialized equipment", "Move-in/out ready"],
        },
      ],
    },
    // Add more services as needed
  }

  const currentService = serviceData[serviceId as keyof typeof serviceData]

  if (!currentService) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Service Not Found</h1>
          <Link href="/services">
            <Button>Back to Services</Button>
          </Link>
        </div>
      </div>
    )
  }

  const IconComponent = currentService.icon

  const handleBooking = () => {
    if (bookingStep < 3) {
      setBookingStep(bookingStep + 1)
    } else {
      // Complete booking
      alert("Booking completed! (Demo mode)")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Demo Banner */}
      {isDemo && <DemoBanner />}

      {/* Header */}
      <header className={`bg-white shadow-sm border-b ${isDemo ? "mt-16" : ""}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <Link href="/services">
              <Button variant="ghost" size="icon" className="mr-4">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 ${currentService.color} rounded-lg flex items-center justify-center`}>
                <IconComponent className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{currentService.name}</h1>
                <p className="text-sm text-gray-600">{currentService.category}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Service Overview */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">{currentService.name}</CardTitle>
                    <CardDescription className="text-lg mt-1">{currentService.description}</CardDescription>
                  </div>
                  {isDemo && <Badge variant="secondary">DEMO</Badge>}
                </div>
                <div className="flex items-center gap-6 mt-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{currentService.rating}</span>
                    <span className="text-gray-600">({currentService.reviews.toLocaleString()} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-5 h-5 text-gray-600" />
                    <span>{currentService.eta}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-green-600">From ${currentService.startingPrice}</span>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle>What's Included</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentService.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Service Packages */}
            <Card>
              <CardHeader>
                <CardTitle>Choose Your Package</CardTitle>
                <CardDescription>Select the service level that best fits your needs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {currentService.packages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedPackage === pkg.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedPackage(pkg.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{pkg.name}</h3>
                          {pkg.popular && (
                            <Badge variant="secondary" className="text-xs">
                              Most Popular
                            </Badge>
                          )}
                        </div>
                        <span className="text-xl font-bold">${pkg.price}</span>
                      </div>
                      <p className="text-gray-600 mb-3">{pkg.description}</p>
                      <div className="space-y-1">
                        {pkg.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Booking Form */}
            {selectedPackage && (
              <Card>
                <CardHeader>
                  <CardTitle>Book Your Service</CardTitle>
                  <CardDescription>Step {bookingStep} of 3</CardDescription>
                </CardHeader>
                <CardContent>
                  {bookingStep === 1 && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Pickup/Service Location</Label>
                        <LocationSearch
                          placeholder="Enter your address"
                          onLocationSelect={(location) =>
                            setFormData({ ...formData, pickupLocation: location.address })
                          }
                        />
                      </div>

                      {serviceId === "rideshare" && (
                        <div className="space-y-2">
                          <Label>Destination</Label>
                          <LocationSearch
                            placeholder="Where to?"
                            onLocationSelect={(location) =>
                              setFormData({ ...formData, deliveryLocation: location.address })
                            }
                          />
                        </div>
                      )}

                      <div className="space-y-2">
                        <Label>Preferred Time</Label>
                        <Input
                          type="datetime-local"
                          value={formData.scheduledTime}
                          onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Contact Phone</Label>
                        <Input
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          value={formData.contactPhone}
                          onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                        />
                      </div>
                    </div>
                  )}

                  {bookingStep === 2 && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Service Priority</Label>
                        <Select
                          value={formData.urgency}
                          onValueChange={(value) => setFormData({ ...formData, urgency: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="standard">Standard (No rush)</SelectItem>
                            <SelectItem value="urgent">Urgent (+$10)</SelectItem>
                            <SelectItem value="emergency">Emergency (+$25)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Special Instructions</Label>
                        <Textarea
                          placeholder="Any special requirements or instructions..."
                          value={formData.specialInstructions}
                          onChange={(e) => setFormData({ ...formData, specialInstructions: e.target.value })}
                        />
                      </div>

                      <div className="space-y-3">
                        <Label>Additional Options</Label>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="insurance" />
                            <Label htmlFor="insurance" className="text-sm">
                              Add insurance coverage (+$5)
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="priority" />
                            <Label htmlFor="priority" className="text-sm">
                              Priority support (+$3)
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="notifications" />
                            <Label htmlFor="notifications" className="text-sm">
                              SMS notifications (Free)
                            </Label>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {bookingStep === 3 && (
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold mb-3">Booking Summary</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Service:</span>
                            <span>{currentService.packages.find((p) => p.id === selectedPackage)?.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Base Price:</span>
                            <span>${currentService.packages.find((p) => p.id === selectedPackage)?.price}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Service Fee:</span>
                            <span>$2.50</span>
                          </div>
                          {formData.urgency === "urgent" && (
                            <div className="flex justify-between">
                              <span>Urgent Fee:</span>
                              <span>$10.00</span>
                            </div>
                          )}
                          <div className="border-t pt-2 flex justify-between font-semibold">
                            <span>Total:</span>
                            <span>
                              $
                              {(
                                (currentService.packages.find((p) => p.id === selectedPackage)?.price || 0) +
                                2.5 +
                                (formData.urgency === "urgent" ? 10 : 0)
                              ).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Payment Method</Label>
                        <Select defaultValue="card">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="card">Credit/Debit Card</SelectItem>
                            <SelectItem value="paypal">PayPal</SelectItem>
                            <SelectItem value="apple">Apple Pay</SelectItem>
                            <SelectItem value="google">Google Pay</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3 mt-6">
                    {bookingStep > 1 && (
                      <Button variant="outline" onClick={() => setBookingStep(bookingStep - 1)}>
                        Back
                      </Button>
                    )}
                    <Button onClick={handleBooking} className="flex-1">
                      {bookingStep === 3 ? "Confirm Booking" : "Continue"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Book */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Book</CardTitle>
                <CardDescription>Book this service instantly</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button className="w-full" size="lg">
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Now
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Phone className="w-4 h-4 mr-2" />
                    Call for Booking
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat Support
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Service Info */}
            <Card>
              <CardHeader>
                <CardTitle>Service Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-600" />
                  <span className="text-sm">Available 24/7</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-600" />
                  <span className="text-sm">Service area: 50 mile radius</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-gray-600" />
                  <span className="text-sm">Fully insured & verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-gray-600" />
                  <span className="text-sm">Secure payment processing</span>
                </div>
              </CardContent>
            </Card>

            {/* Safety Features */}
            <Card>
              <CardHeader>
                <CardTitle>Safety & Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>Background verified providers</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>Real-time tracking</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>24/7 customer support</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>Satisfaction guarantee</span>
                </div>
              </CardContent>
            </Card>

            {/* Reviews Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Reviews</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "Sarah M.", rating: 5, comment: "Excellent service! Very professional and on time." },
                  { name: "John D.", rating: 4, comment: "Good experience overall. Would recommend." },
                  { name: "Emily R.", rating: 5, comment: "Amazing quality and great customer service." },
                ].map((review, index) => (
                  <div key={index} className="border-b pb-3 last:border-b-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{review.name}</span>
                      <div className="flex">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-gray-600">{review.comment}</p>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  View All Reviews
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
