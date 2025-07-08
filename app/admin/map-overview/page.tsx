"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, TrendingUp, Filter, RefreshCw, ArrowLeft } from "lucide-react"
import Link from "next/link"
import GoogleMaps from "@/components/google-maps"

export default function AdminMapOverview() {
  const [viewMode, setViewMode] = useState("all") // all, drivers, rides, heatmap
  const [refreshInterval, setRefreshInterval] = useState(30) // seconds
  const [lastUpdate, setLastUpdate] = useState(new Date())

  // Mock real-time data
  const [activeDrivers] = useState([
    { id: 1, name: "John Doe", location: { lat: 40.7128, lng: -74.006 }, status: "available" },
    { id: 2, name: "Sarah Johnson", location: { lat: 40.7589, lng: -73.9851 }, status: "busy" },
    { id: 3, name: "Mike Chen", location: { lat: 40.7505, lng: -73.9934 }, status: "available" },
    { id: 4, name: "Lisa Brown", location: { lat: 40.7282, lng: -73.9942 }, status: "busy" },
    { id: 5, name: "Alex Rodriguez", location: { lat: 40.7614, lng: -73.9776 }, status: "offline" },
  ])

  const [activeRides] = useState([
    {
      id: "R001",
      pickup: { lat: 40.7128, lng: -74.006 },
      destination: { lat: 40.7589, lng: -73.9851 },
      status: "in_progress",
      driver: "Sarah Johnson",
      rider: "Emily Chen",
    },
    {
      id: "R002",
      pickup: { lat: 40.7505, lng: -73.9934 },
      destination: { lat: 40.7282, lng: -73.9942 },
      status: "pickup",
      driver: "Lisa Brown",
      rider: "David Wilson",
    },
  ])

  const stats = {
    totalDrivers: activeDrivers.length,
    availableDrivers: activeDrivers.filter((d) => d.status === "available").length,
    busyDrivers: activeDrivers.filter((d) => d.status === "busy").length,
    activeRides: activeRides.length,
    completedToday: 156,
    revenue: 2840.5,
  }

  // Auto-refresh data
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date())
      // In a real app, this would fetch fresh data
    }, refreshInterval * 1000)

    return () => clearInterval(interval)
  }, [refreshInterval])

  const getMapMarkers = () => {
    let markers = []

    if (viewMode === "all" || viewMode === "drivers") {
      markers = markers.concat(
        activeDrivers.map((driver) => ({
          position: driver.location,
          title: driver.name,
          icon:
            driver.status === "available"
              ? "/driver-available.png"
              : driver.status === "busy"
                ? "/driver-busy.png"
                : "/driver-offline.png",
          info: `<div><strong>${driver.name}</strong><br/>Status: ${driver.status}</div>`,
        })),
      )
    }

    if (viewMode === "all" || viewMode === "rides") {
      markers = markers.concat(
        activeRides.flatMap((ride) => [
          {
            position: ride.pickup,
            title: `Pickup - ${ride.id}`,
            icon: "/pickup-marker.png",
            info: `<div><strong>Pickup</strong><br/>Ride: ${ride.id}<br/>Driver: ${ride.driver}</div>`,
          },
          {
            position: ride.destination,
            title: `Destination - ${ride.id}`,
            icon: "/destination-marker.png",
            info: `<div><strong>Destination</strong><br/>Ride: ${ride.id}<br/>Rider: ${ride.rider}</div>`,
          },
        ]),
      )
    }

    return markers
  }

  const getDirections = () => {
    if (viewMode === "rides") {
      return activeRides.map((ride) => ({
        origin: ride.pickup,
        destination: ride.destination,
      }))
    }
    return []
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <Link href="/admin/dashboard">
                <Button variant="ghost" size="icon" className="mr-4">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">Live Map Overview</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">Last updated: {lastUpdate.toLocaleTimeString()}</div>
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-3">
            {/* Controls */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Filter className="w-4 h-4 text-gray-600" />
                      <Select value={viewMode} onValueChange={setViewMode}>
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Activity</SelectItem>
                          <SelectItem value="drivers">Drivers Only</SelectItem>
                          <SelectItem value="rides">Active Rides</SelectItem>
                          <SelectItem value="heatmap">Heat Map</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Auto-refresh:</span>
                      <Select value={refreshInterval.toString()} onValueChange={(v) => setRefreshInterval(Number(v))}>
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">10s</SelectItem>
                          <SelectItem value="30">30s</SelectItem>
                          <SelectItem value="60">1m</SelectItem>
                          <SelectItem value="300">5m</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Available</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm">Busy</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                      <span className="text-sm">Offline</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Map */}
            <Card>
              <CardContent className="p-0">
                <GoogleMaps
                  center={{ lat: 40.7128, lng: -74.006 }}
                  zoom={12}
                  height="600px"
                  markers={getMapMarkers()}
                  className="rounded-lg overflow-hidden"
                />
              </CardContent>
            </Card>
          </div>

          {/* Stats Panel */}
          <div className="space-y-6">
            {/* Real-time Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Live Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Drivers</span>
                  <Badge variant="outline">{stats.totalDrivers}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Available</span>
                  <Badge className="bg-green-100 text-green-800">{stats.availableDrivers}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Busy</span>
                  <Badge className="bg-yellow-100 text-yellow-800">{stats.busyDrivers}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Active Rides</span>
                  <Badge className="bg-blue-100 text-blue-800">{stats.activeRides}</Badge>
                </div>
                <div className="flex justify-between items-center border-t pt-4">
                  <span className="text-gray-600">Today's Revenue</span>
                  <span className="font-bold text-green-600">${stats.revenue}</span>
                </div>
              </CardContent>
            </Card>

            {/* Active Drivers */}
            <Card>
              <CardHeader>
                <CardTitle>Active Drivers</CardTitle>
                <CardDescription>Currently online drivers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {activeDrivers
                    .filter((d) => d.status !== "offline")
                    .map((driver) => (
                      <div key={driver.id} className="flex items-center justify-between p-2 border rounded">
                        <div className="flex items-center space-x-2">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              driver.status === "available" ? "bg-green-500" : "bg-yellow-500"
                            }`}
                          ></div>
                          <span className="text-sm font-medium">{driver.name}</span>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            driver.status === "available"
                              ? "text-green-700 border-green-200"
                              : "text-yellow-700 border-yellow-200"
                          }
                        >
                          {driver.status}
                        </Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Active Rides */}
            <Card>
              <CardHeader>
                <CardTitle>Active Rides</CardTitle>
                <CardDescription>Currently in progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {activeRides.map((ride) => (
                    <div key={ride.id} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium text-sm">{ride.id}</span>
                        <Badge
                          className={
                            ride.status === "in_progress"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-orange-100 text-orange-800"
                          }
                        >
                          {ride.status}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-600">
                        <div>Driver: {ride.driver}</div>
                        <div>Rider: {ride.rider}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* System Health */}
            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">API Response</span>
                  <Badge className="bg-green-100 text-green-800">Good</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Map Service</span>
                  <Badge className="bg-green-100 text-green-800">Online</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Payment Gateway</span>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Notifications</span>
                  <Badge className="bg-yellow-100 text-yellow-800">Delayed</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
