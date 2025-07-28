import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    email: string
                    full_name: string | null
                    avatar_url: string | null
                    role: "user" | "moderator" | "admin"
                    phone: string | null
                    date_of_birth: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id: string
                    email: string
                    full_name?: string | null
                    avatar_url?: string | null
                    role?: "user" | "moderator" | "admin"
                    phone?: string | null
                    date_of_birth?: string | null
                }
                Update: {
                    full_name?: string | null
                    avatar_url?: string | null
                    phone?: string | null
                    date_of_birth?: string | null
                }
            }
            hotels: {
                Row: {
                    id: string
                    name: string
                    description: string | null
                    address: string
                    city: string
                    state: string | null
                    country: string
                    rating: number | null
                    price_per_night: number
                    amenities: string[] | null
                    images: string[] | null
                    available_rooms: number | null
                    hotel_type: string | null
                    is_featured: boolean | null
                    created_at: string
                    updated_at: string
                }
            }
            bookings: {
                Row: {
                    id: string
                    user_id: string
                    hotel_id: string
                    booking_reference: string
                    status: "pending" | "confirmed" | "cancelled" | "completed"
                    check_in_date: string
                    check_out_date: string
                    guests: number | null
                    rooms: number | null
                    total_amount: number
                    payment_status: string | null
                    special_requests: string | null
                    guest_name: string
                    guest_email: string
                    guest_phone: string | null
                    created_at: string
                    updated_at: string
                }
            }
        }
    }
}
