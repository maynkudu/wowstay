import { supabase } from '@/lib/supabase/client'
import type { Review, ReviewRow } from '@/lib/types'
import { PostgrestError } from '@supabase/supabase-js';

// Transform database row to Review interface
function transformReviewRow(row: ReviewRow & {
    accounts?: {
        first_name: string;
        last_name: string;
        avatar_url?: string
    }
}): Review {
    return {
        id: row.id,
        hotelId: row.hotel_id,
        userId: row.user_id,
        rating: row.rating,
        title: row.title,
        comment: row.comment,
        stayDate: row.stay_date ? new Date(row.stay_date) : undefined,
        roomType: row.room_type,
        tripType: row.trip_type as Review['tripType'],
        helpfulVotes: row.helpful_votes,
        isVerified: row.is_verified,
        isApproved: row.is_approved,
        createdAt: new Date(row.created_at),
        updatedAt: new Date(row.updated_at),
        user: row.accounts ? {
            firstName: row.accounts.first_name,
            lastName: row.accounts.last_name,
            avatarUrl: row.accounts.avatar_url
        } : undefined
    }
}

export async function getHotelReviews(hotelId: string): Promise<{ data: Review[] | null; error: PostgrestError | null }> {
    const { data, error } = await supabase
        .from('reviews')
        .select(`
      *,
      accounts (
        first_name,
        last_name,
        avatar_url
      )
    `)
        .eq('hotel_id', hotelId)
        .eq('is_approved', true)
        .order('created_at', { ascending: false })

    if (error) return { data: null, error }

    const reviews = data.map(transformReviewRow)
    return { data: reviews, error: null }
}

export async function getUserReviews(userId: string): Promise<{ data: Review[] | null; error: PostgrestError | null }> {
    const { data, error } = await supabase
        .from('reviews')
        .select(`
      *,
      accounts (
        first_name,
        last_name,
        avatar_url
      )
    `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

    if (error) return { data: null, error }

    const reviews = data.map(transformReviewRow)
    return { data: reviews, error: null }
}

export async function createReview(reviewData: {
    hotelId: string
    userId: string
    rating: number
    title?: string
    comment: string
    stayDate?: Date
    roomType?: string
    tripType?: Review['tripType']
}): Promise<{ data: Review | null; error: PostgrestError | null }> {
    const { data, error } = await supabase
        .from('reviews')
        .insert({
            hotel_id: reviewData.hotelId,
            user_id: reviewData.userId,
            rating: reviewData.rating,
            title: reviewData.title,
            comment: reviewData.comment,
            stay_date: reviewData.stayDate?.toISOString().split('T')[0],
            room_type: reviewData.roomType,
            trip_type: reviewData.tripType,
        })
        .select(`
      *,
      accounts (
        first_name,
        last_name,
        avatar_url
      )
    `)
        .single()

    if (error) return { data: null, error }

    const review = transformReviewRow(data)
    return { data: review, error: null }
}

export async function updateReview(
    reviewId: string,
    updates: {
        rating?: number
        title?: string
        comment?: string
        roomType?: string
        tripType?: Review['tripType']
    }
): Promise<{ data: Review | null; error: PostgrestError | null }> {
    const { data, error } = await supabase
        .from('reviews')
        .update({
            rating: updates.rating,
            title: updates.title,
            comment: updates.comment,
            room_type: updates.roomType,
            trip_type: updates.tripType,
        })
        .eq('id', reviewId)
        .select(`
      *,
      accounts (
        first_name,
        last_name,
        avatar_url
      )
    `)
        .single()

    if (error) return { data: null, error }

    const review = transformReviewRow(data)
    return { data: review, error: null }
}

export async function deleteReview(reviewId: string): Promise<{ error: PostgrestError | null }> {
    const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', reviewId)

    return { error }
}

export async function voteReviewHelpful(reviewId: string): Promise<{ error: PostgrestError | null }> {
    const { error } = await supabase
        .rpc('increment_helpful_votes', { review_id: reviewId })

    return { error }
}

export async function getReviewById(reviewId: string): Promise<{ data: Review | null; error: PostgrestError | null }> {
    const { data, error } = await supabase
        .from('reviews')
        .select(`
      *,
      accounts (
        first_name,
        last_name,
        avatar_url
      )
    `)
        .eq('id', reviewId)
        .single()

    if (error) return { data: null, error }

    const review = transformReviewRow(data)
    return { data: review, error: null }
}
