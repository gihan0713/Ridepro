// Google Maps TypeScript declarations
declare namespace google {
  namespace maps {
    class Map {
      constructor(mapDiv: Element, opts?: MapOptions)
      setCenter(latlng: LatLng | LatLngLiteral): void
      setZoom(zoom: number): void
      getCenter(): LatLng
      getZoom(): number
    }

    interface MapOptions {
      center?: LatLng | LatLngLiteral
      zoom?: number
      styles?: MapTypeStyle[]
    }

    interface MapTypeStyle {
      featureType?: string
      elementType?: string
      stylers?: MapTypeStyler[]
    }

    interface MapTypeStyler {
      visibility?: string
    }

    class LatLng {
      constructor(lat: number, lng: number)
      lat(): number
      lng(): number
    }

    interface LatLngLiteral {
      lat: number
      lng: number
    }

    class Marker {
      constructor(opts?: MarkerOptions)
      setMap(map: Map | null): void
      addListener(eventName: string, handler: Function): void
    }

    interface MarkerOptions {
      position?: LatLng | LatLngLiteral
      map?: Map
      title?: string
      icon?: string | Icon
    }

    interface Icon {
      url: string
      scaledSize?: Size
    }

    class Size {
      constructor(width: number, height: number)
    }

    class InfoWindow {
      constructor(opts?: InfoWindowOptions)
      open(map: Map, anchor?: Marker): void
      close(): void
    }

    interface InfoWindowOptions {
      content?: string | Element
    }

    class DirectionsService {
      route(
        request: DirectionsRequest,
        callback: (result: DirectionsResult | null, status: DirectionsStatus) => void,
      ): void
    }

    interface DirectionsRequest {
      origin: LatLng | LatLngLiteral | string
      destination: LatLng | LatLngLiteral | string
      waypoints?: DirectionsWaypoint[]
      travelMode: TravelMode
      optimizeWaypoints?: boolean
    }

    interface DirectionsWaypoint {
      location: LatLng | LatLngLiteral | string
      stopover: boolean
    }

    enum TravelMode {
      DRIVING = "DRIVING",
      WALKING = "WALKING",
      BICYCLING = "BICYCLING",
      TRANSIT = "TRANSIT",
    }

    class DirectionsRenderer {
      constructor(opts?: DirectionsRendererOptions)
      setMap(map: Map | null): void
      setDirections(directions: DirectionsResult): void
    }

    interface DirectionsRendererOptions {
      suppressMarkers?: boolean
      polylineOptions?: PolylineOptions
    }

    interface PolylineOptions {
      strokeColor?: string
      strokeWeight?: number
    }

    interface DirectionsResult {
      routes: DirectionsRoute[]
    }

    interface DirectionsRoute {
      legs: DirectionsLeg[]
    }

    interface DirectionsLeg {
      distance: Distance
      duration: Duration
    }

    interface Distance {
      text: string
      value: number
    }

    interface Duration {
      text: string
      value: number
    }

    type DirectionsStatus =
      | "OK"
      | "NOT_FOUND"
      | "ZERO_RESULTS"
      | "MAX_WAYPOINTS_EXCEEDED"
      | "INVALID_REQUEST"
      | "OVER_QUERY_LIMIT"
      | "REQUEST_DENIED"
      | "UNKNOWN_ERROR"

    class Geocoder {
      geocode(
        request: GeocoderRequest,
        callback: (results: GeocoderResult[] | null, status: GeocoderStatus) => void,
      ): void
    }

    interface GeocoderRequest {
      location?: LatLng | LatLngLiteral
      address?: string
    }

    interface GeocoderResult {
      formatted_address: string
      place_id: string
      geometry: GeocoderGeometry
    }

    interface GeocoderGeometry {
      location: LatLng
    }

    type GeocoderStatus =
      | "OK"
      | "ZERO_RESULTS"
      | "OVER_QUERY_LIMIT"
      | "REQUEST_DENIED"
      | "INVALID_REQUEST"
      | "UNKNOWN_ERROR"

    namespace places {
      class Autocomplete {
        constructor(inputField: HTMLInputElement, opts?: AutocompleteOptions)
        addListener(eventName: string, handler: Function): void
        getPlace(): PlaceResult
      }

      interface AutocompleteOptions {
        types?: string[]
        componentRestrictions?: ComponentRestrictions
      }

      interface ComponentRestrictions {
        country?: string | string[]
      }

      interface PlaceResult {
        formatted_address?: string
        name?: string
        place_id?: string
        geometry?: PlaceGeometry
      }

      interface PlaceGeometry {
        location?: LatLng
      }
    }
  }
}

declare global {
  interface Window {
    google: typeof google
  }
}

export {}
