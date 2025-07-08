"use client"

import { useEffect, useRef, useState } from "react"
import { Loader } from "@googlemaps/js-api-loader"
import type { google } from "google-maps"
import MapFallback from "./map-fallback"

declare global {
  interface Window {
    google: typeof google
  }
}

interface GoogleMapsProps {
  center?: { lat: number; lng: number }
  zoom?: number
  height?: string
  markers?: Array<{
    position: { lat: number; lng: number }
    title?: string
    icon?: string
    info?: string
  }>
  directions?: {
    origin: { lat: number; lng: number }
    destination: { lat: number; lng: number }
    waypoints?: Array<{ lat: number; lng: number }>
  }
  onMapLoad?: (map: google.maps.Map) => void
  className?: string
}

export default function GoogleMaps({
  center = { lat: 40.7128, lng: -74.006 }, // Default to NYC
  zoom = 13,
  height = "400px",
  markers = [],
  directions,
  onMapLoad,
  className = "",
}: GoogleMapsProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService | null>(null)
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "demo-key",
        version: "weekly",
        libraries: ["places", "geometry"],
      })

      try {
        await loader.load()

        if (mapRef.current && window.google) {
          const mapInstance = new window.google.maps.Map(mapRef.current, {
            center,
            zoom,
            styles: [
              {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "off" }],
              },
            ],
          })

          const directionsServiceInstance = new window.google.maps.DirectionsService()
          const directionsRendererInstance = new window.google.maps.DirectionsRenderer({
            suppressMarkers: false,
            polylineOptions: {
              strokeColor: "#2563eb",
              strokeWeight: 4,
            },
          })

          directionsRendererInstance.setMap(mapInstance)

          setMap(mapInstance)
          setDirectionsService(directionsServiceInstance)
          setDirectionsRenderer(directionsRendererInstance)
          setIsLoaded(true)

          if (onMapLoad) {
            onMapLoad(mapInstance)
          }
        }
      } catch (error) {
        console.error("Error loading Google Maps:", error)
      }
    }

    initMap()
  }, [center, zoom, onMapLoad])

  // Handle markers
  useEffect(() => {
    if (!map || !isLoaded || !window.google) return

    // Clear existing markers
    const existingMarkers = (map as any)._markers || []
    existingMarkers.forEach((marker: google.maps.Marker) => marker.setMap(null))

    // Add new markers
    const newMarkers = markers.map((markerData) => {
      const marker = new window.google.maps.Marker({
        position: markerData.position,
        map,
        title: markerData.title,
        icon: markerData.icon
          ? {
              url: markerData.icon,
              scaledSize: new window.google.maps.Size(40, 40),
            }
          : undefined,
      })

      if (markerData.info) {
        const infoWindow = new window.google.maps.InfoWindow({
          content: markerData.info,
        })

        marker.addListener("click", () => {
          infoWindow.open(map, marker)
        })
      }

      return marker
    })

    // Store markers on map instance for cleanup
    ;(map as any)._markers = newMarkers
  }, [map, markers, isLoaded])

  // Handle directions
  useEffect(() => {
    if (!map || !directionsService || !directionsRenderer || !directions || !isLoaded || !window.google) return

    const waypoints =
      directions.waypoints?.map((point) => ({
        location: point,
        stopover: true,
      })) || []

    directionsService.route(
      {
        origin: directions.origin,
        destination: directions.destination,
        waypoints,
        travelMode: window.google.maps.TravelMode.DRIVING,
        optimizeWaypoints: true,
      },
      (result, status) => {
        if (status === "OK" && result) {
          directionsRenderer.setDirections(result)
        } else {
          console.error("Directions request failed:", status)
        }
      },
    )
  }, [map, directionsService, directionsRenderer, directions, isLoaded])

  return (
    <div className={`relative ${className}`}>
      {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY === "demo-key" || !process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? (
        <MapFallback height={height} message="Configure Google Maps API key to enable maps" />
      ) : (
        <>
          <div ref={mapRef} style={{ height }} className="w-full rounded-lg" />
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                <p className="text-gray-600">Loading map...</p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
