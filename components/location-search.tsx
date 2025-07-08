"use client"

import { useEffect, useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation } from "lucide-react"
import type { google } from "google-maps"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

declare global {
  interface Window {
    google: typeof google
  }
}

interface LocationSearchProps {
  placeholder?: string
  onLocationSelect: (location: {
    address: string
    coordinates: { lat: number; lng: number }
    placeId: string
  }) => void
  value?: string
  className?: string
}

export default function LocationSearch({
  placeholder = "Enter location",
  onLocationSelect,
  value = "",
  className = "",
}: LocationSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null)
  const [inputValue, setInputValue] = useState(value)

  useEffect(() => {
    const initAutocomplete = async () => {
      if (!window.google || !inputRef.current) return

      const autocompleteInstance = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ["establishment", "geocode"],
        componentRestrictions: { country: "us" }, // Adjust as needed
      })

      autocompleteInstance.addListener("place_changed", () => {
        const place = autocompleteInstance.getPlace()

        if (place.geometry && place.geometry.location) {
          const location = {
            address: place.formatted_address || place.name || "",
            coordinates: {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            },
            placeId: place.place_id || "",
          }

          onLocationSelect(location)
          setInputValue(location.address)
        }
      })

      setAutocomplete(autocompleteInstance)
    }

    // Wait for Google Maps to load
    const checkGoogleMaps = () => {
      if (window.google && window.google.maps && window.google.maps.places) {
        initAutocomplete()
      } else {
        setTimeout(checkGoogleMaps, 100)
      }
    }

    checkGoogleMaps()
  }, [onLocationSelect])

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords

          // Reverse geocoding to get address
          if (window.google) {
            const geocoder = new window.google.maps.Geocoder()
            geocoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
              if (status === "OK" && results && results[0]) {
                const location = {
                  address: results[0].formatted_address,
                  coordinates: { lat: latitude, lng: longitude },
                  placeId: results[0].place_id || "",
                }

                onLocationSelect(location)
                setInputValue(location.address)
              }
            })
          }
        },
        (error) => {
          console.error("Error getting current location:", error)
        },
      )
    }
  }

  return (
    <div className={`relative ${className}`}>
      {!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY === "demo-key" ? (
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              placeholder={placeholder}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="pl-10"
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleCurrentLocation}
              title="Use current location"
              disabled
            >
              <Navigation className="w-4 h-4" />
            </Button>
          </div>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Location search requires Google Maps API key configuration</AlertDescription>
          </Alert>
        </div>
      ) : (
        <div className="flex gap-2">
          <div className="relative flex-1">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              ref={inputRef}
              placeholder={placeholder}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleCurrentLocation}
            title="Use current location"
          >
            <Navigation className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
