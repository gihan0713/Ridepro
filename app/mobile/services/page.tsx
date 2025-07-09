"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  Search,
  Filter,
  Car,
  Utensils,
  Package,
  Home,
  Briefcase,
  Heart,
  GraduationCap,
  Truck,
  ShoppingCart,
  Plane,
  Camera,
  Wrench,
} from "lucide-react"
import Link from "next/link"
import MobileServiceCard from "@/components/mobile-service-card"
import MobileBottomSheet from "@/components/mobile-bottom-sheet"

export default function MobileServicesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedService, setSelectedService] = useState<any>(null)
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false)

  const categories = [
    { id: "all", name: "All", icon: null },
    { id: "transport", name: "Transport", icon: Car },
    { id: "food", name: "Food", icon: Utensils },
    { id: "delivery", name: "Delivery", icon: Package },
    { id: "home", name: "Home", icon: Home },
    { id: "business", name: "Business", icon: Briefcase },
  ]

  const allServices = [
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
      color: "bg-blue-500",
      features: ["GPS Tracking", "Multiple Stops", "24/7 Available", "Verified Drivers"],
    },
    {
      id: "food-delivery",
      name: "Food Delivery",
      description: "Delicious meals from top restaurants",
      icon: Utensils,
      category: "food",
      price: "From $3",
      rating: 4.5,
      eta: "20-45 min",
      popular: true,
      badge: "HOT",
      color: "bg-red-500",
      features: ["1000+ Restaurants", "Live Tracking", "Hot Delivery", "Special Offers"],
    },
    {
      id: "grocery-delivery",
      name: "Grocery Delivery",
      description: "Fresh groceries delivered to your door",
      icon: ShoppingCart,
      category: "delivery",
      price: "From $8",
      rating: 4.6,
      eta: "30-60 min",
      color: "bg-green-500",
      features: ["Fresh Products", "Same Day Delivery", "Quality Guarantee", "Bulk Orders"],
    },
    {
      id: "package-delivery",
      name: "Package Delivery",
      description: "Same-day package and document delivery",
      icon: Package,
      category: "delivery",
      price: "From $8",
      rating: 4.7,
      eta: "30-60 min",
      color: "bg-purple-500",
      features: ["Real-time Tracking", "Proof of Delivery", "Secure Handling", "Insurance"],
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
      color: "bg-teal-500",
      features: ["Verified Cleaners", "Eco Products", "Deep Cleaning", "Flexible Timing"],
    },
    {
      id: "handyman",
      name: "Handyman",
      description: "Home repairs and maintenance",
      icon: Wrench,
      category: "home",
      price: "From $30",
      rating: 4.6,
      eta: "1-3 hours",
      color: "bg-orange-600",
      features: ["Skilled Professionals", "All Tools Included", "Quality Work", "Warranty"],
    },
    {
      id: "business-courier",
      name: "Business Courier",
      description: "Professional document delivery",
      icon: Briefcase,
      category: "business",
      price: "From $15",
      rating: 4.8,
      eta: "45-90 min",
      color: "bg-slate-600",
      features: ["Confidential Handling", "Express Service", "Proof of Delivery", "Corporate Rates"],
    },
    {
      id: "pharmacy-delivery",
      name: "Pharmacy",
      description: "Medicine and health products",
      icon: Heart,
      category: "health",
      price: "From $5",
      rating: 4.9,
      eta: "15-30 min",
      color: "bg-pink-500",
      features: ["Licensed Pharmacies", "Prescription Delivery", "Health Consultation", "Emergency Service"],
    },
    {
      id: "tutoring",
      name: "Home Tutoring",
      description: "Private tutors for all subjects",
      icon: GraduationCap,
      category: "education",
      price: "From $25/hr",
      rating: 4.7,
      eta: "Same day",
      color: "bg-blue-600",
      features: ["Qualified Tutors", "All Subjects", "Flexible Schedule", "Progress Tracking"],
    },
    {
      id: "photography",
      name: "Photography",
      description: "Professional photography services",
      icon: Camera,
      category: "entertainment",
      price: "From $100",
      rating: 4.8,
      eta: "2-6 hours",
      color: "bg-violet-500",
      features: ["Professional Equipment", "Editing Included", "Multiple Packages", "Quick Delivery"],
    },
    {
      id: "truck-rental",
      name: "Truck Rental",
      description: "Heavy item transport and moving",
      icon: Truck,
      category: "transport",
      price: "From $40",
      rating: 4.5,
      eta: "1-2 hours",
      color: "bg-gray-600",
      features: ["Various Sizes", "Professional Drivers", "Loading Help", "Insurance Covered"],
    },
    {
      id: "airport-shuttle",
      name: "Airport Shuttle",
      description: "Reliable airport transfers",
      icon: Plane,
      category: "transport",
      price: "From $25",
      rating: 4.9,
      eta: "30-60 min",
      color: "bg-indigo-500",
      features: ["Flight Tracking", "Meet & Greet", "Luggage Help", "24/7 Service"],
    },
  ]

  const filteredServices = allServices.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleServiceSelect = (serviceId: string) => {
    const service = allServices.find((s) => s.id === serviceId)
    if (service) {
      setSelectedService(service)
      setIsBottomSheetOpen(true)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-50 to-orange-200">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-orange-400 to-yellow-400 px-4 py-3 shadow-lg">
        <div className="flex items-center space-x-3">
          <Link href="/mobile">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <ArrowLeft className="w-6 h-6" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-white">All Services</h1>
            <p className="text-orange-100 text-sm">{filteredServices.length} services available</p>
          </div>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <Filter className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 py-3 rounded-full border-0 shadow-md bg-white"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 mb-4">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                className={`flex-shrink-0 rounded-full ${
                  selectedCategory === category.id
                    ? "bg-orange-500 text-white"
                    : "bg-white text-gray-600 hover:bg-orange-50"
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {IconComponent && <IconComponent className="w-4 h-4 mr-1" />}
                {category.name}
              </Button>
            )
          })}
        </div>
      </div>

      {/* Services Grid */}
      <div className="px-4 pb-20 space-y-3">
        {filteredServices.map((service) => (
          <MobileServiceCard key={service.id} service={service} onSelect={handleServiceSelect} />
        ))}
      </div>

      {/* Bottom Sheet */}
      <MobileBottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
        service={selectedService}
      />
    </div>
  )
}
