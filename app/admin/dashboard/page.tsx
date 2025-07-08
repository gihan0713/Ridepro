"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Car,
  DollarSign,
  TrendingUp,
  MapPin,
  AlertTriangle,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
} from "lucide-react"

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")

  const stats = {
    totalUsers: 15420,
    activeDrivers: 2340,
    totalRides: 89650,
    revenue: 1250000,
    activeRides: 156,
    pendingIssues: 23,
  }

  const recentRides = [
    {
      id: "R001",
      rider: "John Doe",
      driver: "Sarah Johnson",
      pickup: "Downtown Mall",
      destination: "Airport",
      fare: "$25.50",
      status: "completed",
      date: "2024-01-15 14:30",
    },
    {
      id: "R002",
      rider: "Emily Chen",
      driver: "Mike Rodriguez",
      pickup: "University",
      destination: "City Center",
      fare: "$12.30",
      status: "in_progress",
      date: "2024-01-15 15:15",
    },
    {
      id: "R003",
      rider: "David Wilson",
      driver: "Lisa Brown",
      pickup: "Hospital",
      destination: "Residential Area",
      fare: "$18.90",
      status: "cancelled",
      date: "2024-01-15 13:45",
    },
  ]

  const users = [
    {
      id: "U001",
      name: "John Doe",
      email: "john@example.com",
      type: "rider",
      status: "active",
      joinDate: "2024-01-10",
      totalRides: 23,
    },
    {
      id: "U002",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      type: "driver",
      status: "active",
      joinDate: "2024-01-05",
      totalRides: 156,
    },
    {
      id: "U003",
      name: "Mike Rodriguez",
      email: "mike@example.com",
      type: "driver",
      status: "suspended",
      joinDate: "2024-01-08",
      totalRides: 89,
    },
  ]

  const issues = [
    {
      id: "I001",
      type: "payment",
      description: "Payment failed for ride R001",
      priority: "high",
      status: "open",
      reportedBy: "John Doe",
      date: "2024-01-15 14:45",
    },
    {
      id: "I002",
      type: "safety",
      description: "Inappropriate driver behavior reported",
      priority: "critical",
      status: "investigating",
      reportedBy: "Emily Chen",
      date: "2024-01-15 13:30",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in_progress":
        return "bg-blue-100 text-blue-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "active":
        return "bg-green-100 text-green-800"
      case "suspended":
        return "bg-red-100 text-red-800"
      case "open":
        return "bg-yellow-100 text-yellow-800"
      case "investigating":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
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
              <span className="text-xl font-bold text-gray-900">Admin Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Car className="w-8 h-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Drivers</p>
                  <p className="text-2xl font-bold">{stats.activeDrivers.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <MapPin className="w-8 h-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Rides</p>
                  <p className="text-2xl font-bold">{stats.totalRides.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="w-8 h-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Revenue</p>
                  <p className="text-2xl font-bold">${(stats.revenue / 1000000).toFixed(1)}M</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="w-8 h-8 text-indigo-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Rides</p>
                  <p className="text-2xl font-bold">{stats.activeRides}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <AlertTriangle className="w-8 h-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending Issues</p>
                  <p className="text-2xl font-bold">{stats.pendingIssues}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="rides" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="rides">Rides</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="drivers">Drivers</TabsTrigger>
            <TabsTrigger value="issues">Issues</TabsTrigger>
          </TabsList>

          {/* Rides Tab */}
          <TabsContent value="rides">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Recent Rides</CardTitle>
                    <CardDescription>Monitor and manage ride activities</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        placeholder="Search rides..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger className="w-32">
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Ride ID</th>
                        <th className="text-left py-3 px-4">Rider</th>
                        <th className="text-left py-3 px-4">Driver</th>
                        <th className="text-left py-3 px-4">Route</th>
                        <th className="text-left py-3 px-4">Fare</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Date</th>
                        <th className="text-left py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentRides.map((ride) => (
                        <tr key={ride.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">{ride.id}</td>
                          <td className="py-3 px-4">{ride.rider}</td>
                          <td className="py-3 px-4">{ride.driver}</td>
                          <td className="py-3 px-4">
                            <div className="text-sm">
                              <div>{ride.pickup}</div>
                              <div className="text-gray-500">→ {ride.destination}</div>
                            </div>
                          </td>
                          <td className="py-3 px-4 font-medium">{ride.fare}</td>
                          <td className="py-3 px-4">
                            <Badge className={getStatusColor(ride.status)}>{ride.status.replace("_", " ")}</Badge>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">{ride.date}</td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="ghost">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="ghost">
                                <Edit className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>Manage riders and their accounts</CardDescription>
                  </div>
                  <Button>Add New User</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">User ID</th>
                        <th className="text-left py-3 px-4">Name</th>
                        <th className="text-left py-3 px-4">Email</th>
                        <th className="text-left py-3 px-4">Type</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Join Date</th>
                        <th className="text-left py-3 px-4">Total Rides</th>
                        <th className="text-left py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">{user.id}</td>
                          <td className="py-3 px-4">{user.name}</td>
                          <td className="py-3 px-4">{user.email}</td>
                          <td className="py-3 px-4">
                            <Badge variant="outline">{user.type}</Badge>
                          </td>
                          <td className="py-3 px-4">
                            <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">{user.joinDate}</td>
                          <td className="py-3 px-4">{user.totalRides}</td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="ghost">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="ghost">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="ghost">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Drivers Tab */}
          <TabsContent value="drivers">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Driver Management</CardTitle>
                    <CardDescription>Manage drivers and their verification status</CardDescription>
                  </div>
                  <Button>Add New Driver</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Driver ID</th>
                        <th className="text-left py-3 px-4">Name</th>
                        <th className="text-left py-3 px-4">Email</th>
                        <th className="text-left py-3 px-4">Vehicle</th>
                        <th className="text-left py-3 px-4">Rating</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Total Rides</th>
                        <th className="text-left py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users
                        .filter((user) => user.type === "driver")
                        .map((driver) => (
                          <tr key={driver.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4 font-medium">{driver.id}</td>
                            <td className="py-3 px-4">{driver.name}</td>
                            <td className="py-3 px-4">{driver.email}</td>
                            <td className="py-3 px-4">Toyota Camry</td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-1">
                                <span>4.8</span>
                                <div className="text-yellow-400">★</div>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <Badge className={getStatusColor(driver.status)}>{driver.status}</Badge>
                            </td>
                            <td className="py-3 px-4">{driver.totalRides}</td>
                            <td className="py-3 px-4">
                              <div className="flex space-x-2">
                                <Button size="sm" variant="ghost">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="ghost">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="ghost">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Issues Tab */}
          <TabsContent value="issues">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Support Issues</CardTitle>
                    <CardDescription>Manage customer support tickets and issues</CardDescription>
                  </div>
                  <Button>Create Issue</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Issue ID</th>
                        <th className="text-left py-3 px-4">Type</th>
                        <th className="text-left py-3 px-4">Description</th>
                        <th className="text-left py-3 px-4">Priority</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Reported By</th>
                        <th className="text-left py-3 px-4">Date</th>
                        <th className="text-left py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {issues.map((issue) => (
                        <tr key={issue.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">{issue.id}</td>
                          <td className="py-3 px-4">
                            <Badge variant="outline">{issue.type}</Badge>
                          </td>
                          <td className="py-3 px-4 max-w-xs truncate">{issue.description}</td>
                          <td className="py-3 px-4">
                            <Badge
                              className={
                                issue.priority === "critical"
                                  ? "bg-red-100 text-red-800"
                                  : issue.priority === "high"
                                    ? "bg-orange-100 text-orange-800"
                                    : "bg-yellow-100 text-yellow-800"
                              }
                            >
                              {issue.priority}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <Badge className={getStatusColor(issue.status)}>{issue.status}</Badge>
                          </td>
                          <td className="py-3 px-4">{issue.reportedBy}</td>
                          <td className="py-3 px-4 text-sm text-gray-600">{issue.date}</td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="ghost">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="ghost">
                                <Edit className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
