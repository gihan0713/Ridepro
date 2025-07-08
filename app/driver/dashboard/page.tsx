"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { MapPin, DollarSign, Star, Navigation, Phone, User, TrendingUp, Calendar } from "lucide-react"
import Link from "next/link"
import GoogleMaps from "@/components/google-maps"

export default function DriverDashboard() {
  const [isOnline, setIsOnline] = useState(false)
  const [hasActiveRide, setHasActiveRide] = useState(false)
  const [driverLocation, setDriverLocation] = useState({ lat: 40.7128, lng: -74.006 })
  const [rideLocations, setRideLocations] = useState({
    pickup: { lat: 40.72, lng: -74.01 },
    destination: { lat: 40.7589, lng: -73.9851 },
  })

  const todayStats = {
    earnings: 127.5,
    trips: 8,
    hours: 6.5,
    rating: 4.8,
  }

  const activeRide = {
    passenger: "Emily Johnson",
    pickup: "Downtown Mall",
    destination: "Airport Terminal 2",
    fare: "$28.50",
    distance: "12.3 miles",
    eta: "18 min",
  }

  const recentRides = [
    {
      id: 1,
      passenger: "John Smith",
      date: "2024-01-15 14:30",
      from: "Central Station",
      to: "Business District",
      fare: "$15.20",
      rating: 5,
      tip: "$3.00",
    },
    {
      id: 2,
      passenger: "Sarah Wilson",
      date: "2024-01-15 13:45",
      from: "University Campus",
      to: "Shopping Center",
      fare: "$9.80",
      rating: 4,
      tip: "$2.00",
    },
  ]

  const handleToggleOnline = () => {
    setIsOnline(!isOnline)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Driver Portal</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">{isOnline ? "Online" : "Offline"}</span>
                <Switch checked={isOnline} onCheckedChange={handleToggleOnline} />
              </div>
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>AR</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Driver Status</span>
                  <Badge variant={isOnline ? "default" : "secondary"}>{isOnline ? "Online" : "Offline"}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!isOnline ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600 mb-4">You're currently offline</p>
                    <Button onClick={handleToggleOnline}>Go Online to Start Earning</Button>
                  </div>
                ) : !hasActiveRide ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Navigation className="w-8 h-8 text-green-600" />
                    </div>
                    <p className="text-lg font-medium mb-2">Ready for Rides</p>
                    <p className="text-gray-600">Waiting for ride requests...</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Active Ride</h3>
                      <Badge>In Progress</Badge>
                    </div>
                    <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                      <Avatar>
                        <AvatarFallback>EJ</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">{activeRide.passenger}</p>
                        <p className="text-sm text-gray-600">
                          {activeRide.pickup} → {activeRide.destination}
                        </p>
                        <p className="text-sm text-gray-500">
                          {activeRide.distance} • {activeRide.eta}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-green-600">{activeRide.fare}</p>
                        <Button size="sm" variant="outline">
                          <Phone className="w-4 h-4 mr-1" />
                          Call
                        </Button>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1">
                        <Navigation className="w-4 h-4 mr-2" />
                        Navigate
                      </Button>
                      <Button variant="outline">Complete Ride</Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Driver Map */}
            {isOnline && (
              <Card>
                <CardHeader>
                  <CardTitle>Your Location</CardTitle>
                  <CardDescription>Current position and nearby ride requests</CardDescription>
                </CardHeader>
                <CardContent>
                  <GoogleMaps
                    center={driverLocation}
                    zoom={15}
                    height="350px"
                    markers={[
                      {
                        position: driverLocation,
                        title: "Your Location",
                        icon: "/driver-marker.png",
                        info: "<div><strong>You are here</strong></div>",
                      },
                      ...(hasActiveRide
                        ? [
                            {
                              position: rideLocations.pickup,
                              title: "Pickup Location",
                              icon: "/pickup-marker.png",
                              info: `<div><strong>Pickup</strong><br/>${activeRide.pickup}</div>`,
                            },
                            {
                              position: rideLocations.destination,
                              title: "Destination",
                              icon: "/destination-marker.png",
                              info: `<div><strong>Destination</strong><br/>${activeRide.destination}</div>`,
                            },
                          ]
                        : []),
                    ]}
                    directions={
                      hasActiveRide
                        ? {
                            origin: driverLocation,
                            destination: rideLocations.pickup,
                            waypoints: [rideLocations.destination],
                          }
                        : undefined
                    }
                  />
                </CardContent>
              </Card>
            )}

            {/* Recent Rides */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Rides</CardTitle>
                <CardDescription>Your completed trips today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentRides.map((ride) => (
                    <div key={ride.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarFallback>
                            {ride.passenger
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{ride.passenger}</p>
                          <p className="text-sm text-gray-600">{ride.date}</p>
                          <p className="text-sm text-gray-500">
                            {ride.from} → {ride.to}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{ride.fare}</p>
                        <p className="text-sm text-green-600">+{ride.tip} tip</p>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{ride.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Today's Earnings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Today's Earnings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">${todayStats.earnings}</p>
                  <p className="text-sm text-gray-600">Total earned today</p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-xl font-semibold">{todayStats.trips}</p>
                    <p className="text-xs text-gray-600">Trips</p>
                  </div>
                  <div>
                    <p className="text-xl font-semibold">{todayStats.hours}h</p>
                    <p className="text-xs text-gray-600">Online</p>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="text-sm text-gray-600">Average Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{todayStats.rating}</span>
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
                <Link href="/driver/earnings">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Earnings
                  </Button>
                </Link>
                <Link href="/driver/schedule">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Calendar className="w-4 h-4 mr-2" />
                    Set Schedule
                  </Button>
                </Link>
                <Link href="/driver/profile">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <User className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>This Week</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Earnings</span>
                  <span className="font-medium">$892.30</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Trips</span>
                  <span className="font-medium">47</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Hours Online</span>
                  <span className="font-medium">32.5h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Acceptance Rate</span>
                  <span className="font-medium">94%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cancellation Rate</span>
                  <span className="font-medium">2%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
