"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Menu, MapPin, User, CreditCard, Clock, Star, Settings, LogOut } from "lucide-react"

interface MobileNavProps {
  userType?: "rider" | "driver" | "admin"
  isDemo?: boolean
}

export default function MobileNav({ userType = "rider", isDemo = false }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)

  const riderLinks = [
    { href: "/rider/dashboard", label: "Dashboard", icon: MapPin },
    { href: "/rider/book", label: "Book Ride", icon: MapPin },
    { href: "/rider/history", label: "Ride History", icon: Clock },
    { href: "/rider/payment", label: "Payment", icon: CreditCard },
    { href: "/rider/profile", label: "Profile", icon: User },
  ]

  const driverLinks = [
    { href: "/driver/dashboard", label: "Dashboard", icon: MapPin },
    { href: "/driver/earnings", label: "Earnings", icon: CreditCard },
    { href: "/driver/schedule", label: "Schedule", icon: Clock },
    { href: "/driver/profile", label: "Profile", icon: User },
  ]

  const adminLinks = [
    { href: "/admin/dashboard", label: "Dashboard", icon: MapPin },
    { href: "/admin/map-overview", label: "Live Map", icon: MapPin },
    { href: "/admin/users", label: "Users", icon: User },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ]

  const getLinks = () => {
    switch (userType) {
      case "driver":
        return driverLinks
      case "admin":
        return adminLinks
      default:
        return riderLinks
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center space-x-2 pb-6 border-b">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold">RideShare Pro</span>
              {isDemo && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  DEMO
                </Badge>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 py-6">
            <div className="space-y-2">
              {getLinks().map((link) => {
                const IconComponent = link.icon
                return (
                  <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      <IconComponent className="w-4 h-4 mr-3" />
                      {link.label}
                    </Button>
                  </Link>
                )
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="border-t pt-6">
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                <Star className="w-4 h-4 mr-3" />
                Rate App
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Settings className="w-4 h-4 mr-3" />
                Settings
              </Button>
              <Button variant="ghost" className="w-full justify-start text-red-600">
                <LogOut className="w-4 h-4 mr-3" />
                {isDemo ? "Exit Demo" : "Sign Out"}
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
