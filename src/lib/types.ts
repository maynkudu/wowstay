export interface Hotel {
  id: string
  name: string
  location: {
    address: string
    city: string
    state?: string
    country: string
    zipCode?: string
    coordinates?: {
      lat: number
      lng: number
    }
  }
  description: string
  pricing: {
    pricePerNight: number
    currency: string // e.g., "INR", "USD"
    discounts?: {
      percentage: number
      validTill: Date
    }
  }
  rating: {
    average: number
    totalRatings: number
  }
  reviews: string[] // Array of review IDs
  images: string[]
  amenities: string[]
  createdAt?: Date
  updatedAt?: Date
  isActive?: boolean
}

export interface Review {
  id: string
  hotelId: string
  userId: string
  rating: number
  title?: string
  comment: string
  stayDate?: Date
  roomType?: string
  tripType?: 'business' | 'leisure' | 'family' | 'solo' | 'couple'
  helpfulVotes: number
  isVerified: boolean
  isApproved: boolean
  createdAt: Date
  updatedAt: Date

  // Populated fields
  user?: {
    firstName: string
    lastName: string
    avatarUrl?: string
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

export interface Account {
  first_name: string
  last_name: string
  phone: string
  avatar_url: string
  updated_at: Date
}

// Database row types (matching the actual database schema)
export interface HotelRow {
  id: string
  name: string
  description: string
  address: string
  city: string
  state?: string
  country: string
  zip_code?: string
  latitude?: number
  longitude?: number
  price_per_night: number
  currency: string
  discount_percentage?: number
  discount_valid_till?: string
  average_rating: number
  total_ratings: number
  images: string[]
  amenities: string[]
  created_at: string
  updated_at: string
  is_active: boolean
}

export interface ReviewRow {
  id: string
  hotel_id: string
  user_id: string
  rating: number
  title?: string
  comment: string
  stay_date?: string
  room_type?: string
  trip_type?: string
  helpful_votes: number
  is_verified: boolean
  is_approved: boolean
  created_at: string
  updated_at: string
}
