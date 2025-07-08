"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Car,
  Truck,
  Package,
  ShoppingBag,
  Utensils,
  Bike,
  Plane,
  Home,
  Briefcase,
  Heart,
  GraduationCap,
  Wrench,
  MapPin,
  Clock,
  Star,
  Search,
  Filter,
  ArrowRight,
  Zap,
  Shield,
  Users,
  Baby,
  PawPrint,
  Flower,
  Camera,
  Music,
  Gamepad2,
  Laptop,
} from "lucide-react"
import Link from "next/link"
import DemoBanner from "@/components/demo-banner"
import MobileNav from "@/components/mobile-nav"

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isDemo] = useState(true)

  const serviceCategories = [
    { id: "all", name: "All Services", icon: MapPin },
    { id: "transport", name: "Transport", icon: Car },
    { id: "delivery", name: "Delivery", icon: Package },
    { id: "food", name: "Food & Dining", icon: Utensils },
    { id: "home", name: "Home Services", icon: Home },
    { id: "business", name: "Business", icon: Briefcase },
    { id: "health", name: "Health & Wellness", icon: Heart },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "entertainment", name: "Entertainment", icon: Music },
  ]

  const allServices = [
    // Transport Services
    {
      id: "rideshare",
      name: "Ride Share",
      description: "Personal rides with professional drivers",
      icon: Car,
      category: "transport",
      price: "From $5",
      rating: 4.8,
      eta: "3-8 min",
      popular: true,
      features: ["GPS Tracking", "Multiple Stops", "Scheduled Rides"],
      color: "bg-blue-500",
    },
    {
      id: "luxury-rides",
      name: "Luxury Rides",
      description: "Premium vehicles for special occasions",
      icon: Zap,
      category: "transport",
      price: "From $25",
      rating: 4.9,
      eta: "5-15 min",
      features: ["Premium Cars", "Professional Chauffeurs", "Red Carpet Service"],
      color: "bg-purple-500",
    },
    {
      id: "bike-taxi",
      name: "Bike Taxi",
      description: "Quick rides through traffic on motorcycles",
      icon: Bike,
      category: "transport",
      price: "From $3",
      rating: 4.6,
      eta: "2-5 min",
      features: ["Beat Traffic", "Eco Friendly", "Quick Rides"],
      color: "bg-green-500",
    },
    {
      id: "airport-shuttle",
      name: "Airport Shuttle",
      description: "Reliable airport transfers",
      icon: Plane,
      category: "transport",
      price: "From $15",
      rating: 4.7,
      eta: "15-30 min",
      features: ["Flight Tracking", "Meet & Greet", "Luggage Assistance"],
      color: "bg-indigo-500",
    },
    {
      id: "group-transport",
      name: "Group Transport",
      description: "Large vehicles for groups and events",
      icon: Users,
      category: "transport",
      price: "From $40",
      rating: 4.5,
      eta: "10-20 min",
      features: ["Up to 15 People", "Event Transport", "Party Buses"],
      color: "bg-orange-500",
    },

    // Delivery Services
    {
      id: "package-delivery",
      name: "Package Delivery",
      description: "Same-day package and document delivery",
      icon: Package,
      category: "delivery",
      price: "From $8",
      rating: 4.7,
      eta: "30-60 min",
      features: ["Real-time Tracking", "Proof of Delivery", "Insurance"],
      color: "bg-blue-600",
    },
    {
      id: "grocery-delivery",
      name: "Grocery Delivery",
      description: "Fresh groceries delivered to your door",
      icon: ShoppingBag,
      category: "delivery",
      price: "From $5",
      rating: 4.6,
      eta: "45-90 min",
      popular: true,
      features: ["Fresh Products", "Store Partnerships", "Scheduled Delivery"],
      color: "bg-green-600",
    },
    {
      id: "heavy-delivery",
      name: "Heavy Delivery",
      description: "Furniture and large item delivery",
      icon: Truck,
      category: "delivery",
      price: "From $25",
      rating: 4.4,
      eta: "2-4 hours",
      features: ["Professional Movers", "Assembly Service", "Insurance"],
      color: "bg-gray-600",
    },
    {
      id: "flower-delivery",
      name: "Flower Delivery",
      description: "Fresh flowers for special occasions",
      icon: Flower,
      category: "delivery",
      price: "From $12",
      rating: 4.8,
      eta: "1-3 hours",
      features: ["Fresh Flowers", "Custom Arrangements", "Same Day"],
      color: "bg-pink-500",
    },

    // Food & Dining
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
      features: ["1000+ Restaurants", "Live Tracking", "Group Orders"],
      color: "bg-red-500",
    },
    {
      id: "grocery-pickup",
      name: "Grocery Pickup",
      description: "Order online, pickup curbside",
      icon: ShoppingBag,
      category: "food",
      price: "Free",
      rating: 4.6,
      eta: "15-30 min",
      features: ["Curbside Pickup", "Pre-order", "Fresh Guarantee"],
      color: "bg-green-500",
    },

    // Home Services
    {
      id: "home-cleaning",
      name: "Home Cleaning",
      description: "Professional cleaning services",
      icon: Home,
      category: "home",
      price: "From $50",
      rating: 4.7,
      eta: "2-4 hours",
      features: ["Verified Cleaners", "Eco Products", "Satisfaction Guarantee"],
      color: "bg-blue-500",
    },
    {
      id: "handyman",
      name: "Handyman Services",
      description: "Home repairs and maintenance",
      icon: Wrench,
      category: "home",
      price: "From $30",
      rating: 4.6,
      eta: "1-3 hours",
      features: ["Licensed Professionals", "Tool Included", "Warranty"],
      color: "bg-yellow-600",
    },
    {
      id: "babysitting",
      name: "Babysitting",
      description: "Trusted childcare services",
      icon: Baby,
      category: "home",
      price: "From $15/hr",
      rating: 4.9,
      eta: "30-60 min",
      features: ["Background Checked", "CPR Certified", "References"],
      color: "bg-pink-500",
    },
    {
      id: "pet-services",
      name: "Pet Services",
      description: "Pet walking, sitting, and grooming",
      icon: PawPrint,
      category: "home",
      price: "From $20",
      rating: 4.8,
      eta: "30-90 min",
      features: ["Pet Lovers", "Insured", "Photo Updates"],
      color: "bg-orange-500",
    },

    // Business Services
    {
      id: "courier",
      name: "Business Courier",
      description: "Professional document and package delivery",
      icon: Briefcase,
      category: "business",
      price: "From $12",
      rating: 4.7,
      eta: "30-90 min",
      features: ["Same Day", "Secure Handling", "Proof of Delivery"],
      color: "bg-gray-700",
    },
    {
      id: "tech-support",
      name: "Tech Support",
      description: "On-site IT and tech assistance",
      icon: Laptop,
      category: "business",
      price: "From $40",
      rating: 4.6,
      eta: "1-2 hours",
      features: ["Certified Technicians", "Remote Support", "Hardware Repair"],
      color: "bg-blue-600",
    },

    // Health & Wellness
    {
      id: "pharmacy-delivery",
      name: "Pharmacy Delivery",
      description: "Prescription and medicine delivery",
      icon: Heart,
      category: "health",
      price: "From $5",
      rating: 4.8,
      eta: "30-60 min",
      features: ["Licensed Pharmacies", "Prescription Verification", "Secure Delivery"],
      color: "bg-red-600",
    },
    {
      id: "wellness-services",
      name: "Wellness Services",
      description: "Massage, yoga, and wellness at home",
      icon: Heart,
      category: "health",
      price: "From $60",
      rating: 4.7,
      eta: "1-2 hours",
      features: ["Certified Therapists", "Equipment Included", "Relaxation"],
      color: "bg-green-600",
    },

    // Education
    {
      id: "tutoring",
      name: "Home Tutoring",
      description: "Private tutors for all subjects",
      icon: GraduationCap,
      category: "education",
      price: "From $25/hr",
      rating: 4.8,
      eta: "1-3 hours",
      features: ["Qualified Teachers", "All Subjects", "Flexible Schedule"],
      color: "bg-blue-700",
    },

    // Entertainment
    {
      id: "event-services",
      name: "Event Services",
      description: "DJs, photographers, and entertainment",
      icon: Music,
      category: "entertainment",
      price: "From $100",
      rating: 4.6,
      eta: "2-6 hours",
      features: ["Professional Equipment", "Experienced Staff", "Custom Packages"],
      color: "bg-purple-600",
    },
    {
      id: "photography",
      name: "Photography",
      description: "Professional photography services",
      icon: Camera,
      category: "entertainment",
      price: "From $80",
      rating: 4.7,
      eta: "1-4 hours",
      features: ["Professional Photographers", "High Quality", "Quick Delivery"],
      color: "bg-indigo-600",
    },
    {
      id: "gaming-setup",
      name: "Gaming Setup",
      description: "Gaming equipment setup and support",
      icon: Gamepad2,
      category: "entertainment",
      price: "From $50",
      rating: 4.5,
      eta: "1-2 hours",
      features: ["Gaming Experts", "Latest Equipment", "Optimization"],
      color: "bg-green-700",
    },
  ]

  const filteredServices = allServices.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const popularServices = allServices.filter((service) => service.popular)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Demo Banner */}
      {isDemo && <DemoBanner />}

      {/* Header */}
      <header className={`bg-white shadow-sm border-b sticky top-0 z-40 ${isDemo ? "mt-16" : ""}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <MobileNav userType="rider" isDemo={isDemo} />
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900 hidden sm:block">All Services</span>
                <span className="text-lg font-bold text-gray-900 sm:hidden">Services</span>
                {isDemo && (
                  <Badge variant="secondary" className="ml-2 text-xs">
                    DEMO
                  </Badge>
                )}
              </div>
            </div>
            <Link href="/rider/dashboard">
              <Button variant="outline" size="sm">
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-600" />
              <div className="flex gap-2 overflow-x-auto pb-2">
                {serviceCategories.map((category) => {
                  const IconComponent = category.icon
                  return (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                      className="whitespace-nowrap"
                    >
                      <IconComponent className="w-4 h-4 mr-1" />
                      <span className="hidden sm:inline">{category.name}</span>
                      <span className="sm:hidden">{category.name.split(" ")[0]}</span>
                    </Button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Popular Services */}
        {selectedCategory === "all" && searchTerm === "" && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Popular Services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {popularServices.map((service) => {
                const IconComponent = service.icon
                return (
                  <Link key={service.id} href={`/services/${service.id}`}>
                    <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center`}>
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            Popular
                          </Badge>
                        </div>
                        <h3 className="font-semibold mb-1">{service.name}</h3>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{service.description}</p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium text-green-600">{service.price}</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span>{service.rating}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>
        )}

        {/* All Services Grid */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">
              {selectedCategory === "all"
                ? "All Services"
                : serviceCategories.find((c) => c.id === selectedCategory)?.name}
            </h2>
            <span className="text-gray-600">{filteredServices.length} services</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredServices.map((service) => {
              const IconComponent = service.icon
              return (
                <Link key={service.id} href={`/services/${service.id}`}>
                  <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        {service.popular && (
                          <Badge variant="secondary" className="text-xs">
                            Popular
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                      <CardDescription className="text-sm line-clamp-2">{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
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

                        <div className="space-y-1">
                          {service.features.slice(0, 2).map((feature, index) => (
                            <div key={index} className="flex items-center gap-2 text-xs text-gray-600">
                              <Shield className="w-3 h-3" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>

                        <Button className="w-full group" size="sm">
                          Book Now
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>

        {/* No Results */}
        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No services found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
