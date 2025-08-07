import { supabase } from '@/lib/supabase/client'
import type { Hotel, HotelRow } from '@/lib/types'
import { PostgrestError } from '@supabase/supabase-js';

// Transform database row to Hotel interface
function transformHotelRow(row: HotelRow): Hotel {
    return {
        id: row.id,
        name: row.name,
        description: row.description,
        location: {
            address: row.address,
            city: row.city,
            state: row.state,
            country: row.country,
            zipCode: row.zip_code,
            coordinates: row.latitude && row.longitude ? {
                lat: row.latitude,
                lng: row.longitude
            } : undefined
        },
        pricing: {
            pricePerNight: row.price_per_night,
            currency: row.currency,
            discounts: row.discount_percentage && row.discount_valid_till ? {
                percentage: row.discount_percentage,
                validTill: new Date(row.discount_valid_till)
            } : undefined
        },
        rating: {
            average: row.average_rating,
            totalRatings: row.total_ratings
        },
        reviews: [], // Will be populated separately if needed
        images: row.images,
        amenities: row.amenities,
        createdAt: new Date(row.created_at),
        updatedAt: new Date(row.updated_at),
        isActive: row.is_active
    }
}

export async function getAllHotels(): Promise<{ data: Hotel[] | null; error: PostgrestError | null }> {
    const { data, error } = await supabase
        .from('hotels')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })

    if (error) return { data: null, error }

    const hotels = data.map(transformHotelRow)
    return { data: hotels, error: null }
}

export async function getHotelById(id: string): Promise<{ data: Hotel | null; error: PostgrestError | null }> {
    const { data, error } = await supabase
        .from('hotels')
        .select('*')
        .eq('id', id)
        .eq('is_active', true)
        .single()

    if (error) return { data: null, error }

    const hotel = transformHotelRow(data)
    return { data: hotel, error: null }
}

export async function searchHotels(params: {
    city?: string
    country?: string
    maxPrice?: number
    minRating?: number
    amenities?: string[]
}): Promise<{ data: Hotel[] | null; error: PostgrestError | null }> {
    let query = supabase
        .from('hotels')
        .select('*')
        .eq('is_active', true)

    if (params.city) {
        query = query.ilike('city', `%${params.city}%`)
    }

    if (params.country) {
        query = query.ilike('country', `%${params.country}%`)
    }

    if (params.maxPrice) {
        query = query.lte('price_per_night', params.maxPrice)
    }

    if (params.minRating) {
        query = query.gte('average_rating', params.minRating)
    }

    if (params.amenities && params.amenities.length > 0) {
        query = query.contains('amenities', params.amenities)
    }

    const { data, error } = await query.order('average_rating', { ascending: false })

    if (error) return { data: null, error }

    const hotels = data.map(transformHotelRow)
    return { data: hotels, error: null }
}

export async function getHotelsByLocation(
    latitude: number,
    longitude: number,
    radiusKm: number = 50
): Promise<{ data: Hotel[] | null; error: PostgrestError | null }> {
    // Using PostGIS functions for location-based search
    const { data, error } = await supabase
        .rpc('hotels_within_radius', {
            lat: latitude,
            lng: longitude,
            radius_km: radiusKm
        })

    if (error) return { data: null, error }

    const hotels = data.map(transformHotelRow)
    return { data: hotels, error: null }
}

// Admin functions (will be protected by RLS policies)
export async function createHotel(hotelData: Omit<Hotel, 'id' | 'rating' | 'reviews' | 'createdAt' | 'updatedAt'>): Promise<{ data: Hotel | null; error: PostgrestError | null }> {
    const { data, error } = await supabase
        .from('hotels')
        .insert({
            name: hotelData.name,
            description: hotelData.description,
            address: hotelData.location.address,
            city: hotelData.location.city,
            state: hotelData.location.state,
            country: hotelData.location.country,
            zip_code: hotelData.location.zipCode,
            latitude: hotelData.location.coordinates?.lat,
            longitude: hotelData.location.coordinates?.lng,
            price_per_night: hotelData.pricing.pricePerNight,
            currency: hotelData.pricing.currency,
            discount_percentage: hotelData.pricing.discounts?.percentage,
            discount_valid_till: hotelData.pricing.discounts?.validTill?.toISOString(),
            images: hotelData.images,
            amenities: hotelData.amenities,
        })
        .select()
        .single()

    if (error) return { data: null, error }

    const hotel = transformHotelRow(data)
    return { data: hotel, error: null }
}

export async function updateHotel(id: string, updates: Partial<HotelRow>): Promise<{ data: Hotel | null; error: PostgrestError | null }> {
    const { data, error } = await supabase
        .from('hotels')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

    if (error) return { data: null, error }

    const hotel = transformHotelRow(data)
    return { data: hotel, error: null }
}
