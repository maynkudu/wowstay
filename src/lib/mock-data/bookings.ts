export interface Booking {
    id: string
    user_id: string
    hotel_id: string
    booking_reference: string
    status: "pending" | "confirmed" | "cancelled" | "completed"
    check_in_date: string
    check_out_date: string
    guests: number
    rooms: number
    total_amount: number
    payment_status: string
    special_requests: string | null
    guest_name: string
    guest_email: string
    guest_phone: string | null
    created_at: string
    updated_at: string
}

export const mockBookings: Booking[] = [
    {
        id: "booking-1",
        user_id: "user-1",
        hotel_id: "1",
        booking_reference: "WS12345678",
        status: "confirmed",
        check_in_date: "2024-03-15",
        check_out_date: "2024-03-18",
        guests: 2,
        rooms: 1,
        total_amount: 75000,
        payment_status: "paid",
        special_requests: "Late check-in requested",
        guest_name: "Rajesh Kumar",
        guest_email: "rajesh@example.com",
        guest_phone: "+91-9876543210",
        created_at: "2024-02-15T10:30:00Z",
        updated_at: "2024-02-15T10:30:00Z",
    },
    {
        id: "booking-2",
        user_id: "user-2",
        hotel_id: "7",
        booking_reference: "WS87654321",
        status: "pending",
        check_in_date: "2024-04-20",
        check_out_date: "2024-04-25",
        guests: 4,
        rooms: 2,
        total_amount: 225000,
        payment_status: "pending",
        special_requests: null,
        guest_name: "Priya Sharma",
        guest_email: "priya@example.com",
        guest_phone: "+91-9876543211",
        created_at: "2024-02-20T14:15:00Z",
        updated_at: "2024-02-20T14:15:00Z",
    },
    {
        id: "booking-3",
        user_id: "user-1",
        hotel_id: "8",
        booking_reference: "WS11223344",
        status: "completed",
        check_in_date: "2024-01-10",
        check_out_date: "2024-01-15",
        guests: 2,
        rooms: 1,
        total_amount: 275000,
        payment_status: "paid",
        special_requests: "Honeymoon package",
        guest_name: "Rajesh Kumar",
        guest_email: "rajesh@example.com",
        guest_phone: "+91-9876543210",
        created_at: "2024-01-01T09:00:00Z",
        updated_at: "2024-01-15T12:00:00Z",
    },
]

export const getBookings = () => mockBookings

export const getBookingById = (id: string) => mockBookings.find((booking) => booking.id === id)

export const getBookingsByUserId = (userId: string) => mockBookings.filter((booking) => booking.user_id === userId)

export const getBookingsByStatus = (status: string) => mockBookings.filter((booking) => booking.status === status)

export const createBooking = (bookingData: Omit<Booking, "id" | "booking_reference" | "created_at" | "updated_at">) => {
    const newBooking: Booking = {
        ...bookingData,
        id: `booking-${Date.now()}`,
        booking_reference: `WS${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    }

    mockBookings.push(newBooking)
    return newBooking
}
