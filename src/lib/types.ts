export interface Hotel {
  id: string
  name: string
  location: string
  description: string
  pricePerNight: number
  rating: number
  reviews: number
  images: string[]
  amenities: string[]
  coordinates?: {
    lat: number
    lng: number
  }
}

export interface SearchParams {
  place?: string
  budget?: string
  checkIn?: string
  checkOut?: string
  guests?: string
  rating?: string
}

export interface BookingData {
  hotelId: string
  checkIn: string
  checkOut: string
  guests: number
  totalPrice: number
}
