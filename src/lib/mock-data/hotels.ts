export interface Hotel {
    id: string
    name: string
    description: string
    address: string
    city: string
    state: string | null
    country: string
    rating: number
    price_per_night: number
    amenities: string[]
    images: string[]
    available_rooms: number
    hotel_type: string
    is_featured: boolean
    created_at: string
    updated_at: string
}

export const mockHotels: Hotel[] = [
    // Indian Hotels
    {
        id: "1",
        name: "The Taj Mahal Palace",
        description:
            "Iconic luxury hotel overlooking the Gateway of India with legendary hospitality and world-class amenities.",
        address: "Apollo Bunder, Colaba",
        city: "Mumbai",
        state: "Maharashtra",
        country: "India",
        rating: 4.8,
        price_per_night: 25000,
        amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Bar", "Concierge", "Room Service"],
        images: ["/placeholder.svg?height=300&width=400&text=Taj+Mahal+Palace"],
        available_rooms: 15,
        hotel_type: "luxury",
        is_featured: true,
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
    },
    {
        id: "2",
        name: "The Oberoi Udaivilas",
        description: "Palatial resort on the banks of Lake Pichola, offering royal Rajasthani hospitality.",
        address: "Haridasji Ki Magri",
        city: "Udaipur",
        state: "Rajasthan",
        country: "India",
        rating: 4.9,
        price_per_night: 35000,
        amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Lake View", "Palace Architecture", "Butler Service"],
        images: ["/placeholder.svg?height=300&width=400&text=Oberoi+Udaivilas"],
        available_rooms: 8,
        hotel_type: "luxury",
        is_featured: true,
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
    },
    {
        id: "3",
        name: "ITC Grand Chola",
        description: "Magnificent luxury hotel inspired by the grandeur of the Chola dynasty.",
        address: "63, Mount Road, Guindy",
        city: "Chennai",
        state: "Tamil Nadu",
        country: "India",
        rating: 4.7,
        price_per_night: 18000,
        amenities: ["WiFi", "Pool", "Spa", "Gym", "Multiple Restaurants", "Business Center", "Airport Transfer"],
        images: ["/placeholder.svg?height=300&width=400&text=ITC+Grand+Chola"],
        available_rooms: 22,
        hotel_type: "luxury",
        is_featured: false,
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
    },
    {
        id: "4",
        name: "The Leela Palace New Delhi",
        description: "Opulent hotel in the heart of New Delhi, blending traditional Indian hospitality with modern luxury.",
        address: "Chanakyapuri, Diplomatic Enclave",
        city: "New Delhi",
        state: "Delhi",
        country: "India",
        rating: 4.8,
        price_per_night: 22000,
        amenities: ["WiFi", "Pool", "Spa", "Gym", "Fine Dining", "Butler Service", "City Center"],
        images: ["/placeholder.svg?height=300&width=400&text=Leela+Palace+Delhi"],
        available_rooms: 18,
        hotel_type: "luxury",
        is_featured: true,
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
    },
    {
        id: "5",
        name: "Wildflower Hall, Shimla",
        description: "Luxury mountain resort in the Himalayas with breathtaking views and colonial charm.",
        address: "Chharabra, Mashobra",
        city: "Shimla",
        state: "Himachal Pradesh",
        country: "India",
        rating: 4.6,
        price_per_night: 28000,
        amenities: ["WiFi", "Spa", "Gym", "Restaurant", "Mountain Views", "Hiking", "Colonial Architecture"],
        images: ["/placeholder.svg?height=300&width=400&text=Wildflower+Hall"],
        available_rooms: 12,
        hotel_type: "resort",
        is_featured: false,
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
    },
    {
        id: "6",
        name: "Trident Goa",
        description: "Beachfront resort offering the perfect blend of Goan charm and modern comfort.",
        address: "Baga Beach Road",
        city: "Goa",
        state: "Goa",
        country: "India",
        rating: 4.4,
        price_per_night: 12000,
        amenities: ["WiFi", "Beach Access", "Pool", "Spa", "Restaurant", "Water Sports", "Garden"],
        images: ["/placeholder.svg?height=300&width=400&text=Trident+Goa"],
        available_rooms: 35,
        hotel_type: "resort",
        is_featured: false,
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
    },

    // International Hotels
    {
        id: "7",
        name: "The Ritz-Carlton New York",
        description: "Iconic luxury hotel in the heart of Manhattan with legendary service and Central Park views.",
        address: "50 Central Park South",
        city: "New York",
        state: "New York",
        country: "USA",
        rating: 4.8,
        price_per_night: 45000,
        amenities: ["WiFi", "Spa", "Gym", "Fine Dining", "Central Park Views", "Concierge", "Business Center"],
        images: ["/placeholder.svg?height=300&width=400&text=Ritz+Carlton+NYC"],
        available_rooms: 25,
        hotel_type: "luxury",
        is_featured: true,
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
    },
    {
        id: "8",
        name: "Hotel Plaza Athénée Paris",
        description: "Parisian palace hotel on Avenue Montaigne, epitome of French elegance and luxury.",
        address: "25 Avenue Montaigne",
        city: "Paris",
        state: null,
        country: "France",
        rating: 4.9,
        price_per_night: 55000,
        amenities: ["WiFi", "Spa", "Michelin Star Restaurant", "Shopping District", "Eiffel Tower Views", "Butler Service"],
        images: ["/placeholder.svg?height=300&width=400&text=Plaza+Athenee+Paris"],
        available_rooms: 12,
        hotel_type: "luxury",
        is_featured: true,
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
    },
    {
        id: "9",
        name: "The Peninsula Tokyo",
        description: "Modern luxury hotel in Marunouchi with impeccable Japanese hospitality and city views.",
        address: "1-8-1 Yurakucho, Chiyoda",
        city: "Tokyo",
        state: null,
        country: "Japan",
        rating: 4.8,
        price_per_night: 38000,
        amenities: ["WiFi", "Spa", "Pool", "Multiple Restaurants", "City Views", "Shopping Access", "Business Center"],
        images: ["/placeholder.svg?height=300&width=400&text=Peninsula+Tokyo"],
        available_rooms: 20,
        hotel_type: "luxury",
        is_featured: false,
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
    },
    {
        id: "10",
        name: "The Savoy London",
        description: "Historic luxury hotel on the Strand with Art Deco glamour and Thames views.",
        address: "Strand",
        city: "London",
        state: null,
        country: "United Kingdom",
        rating: 4.7,
        price_per_night: 42000,
        amenities: ["WiFi", "Spa", "Gym", "Fine Dining", "Thames Views", "Historic Architecture", "Theater District"],
        images: ["/placeholder.svg?height=300&width=400&text=Savoy+London"],
        available_rooms: 18,
        hotel_type: "luxury",
        is_featured: true,
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
    },
    {
        id: "11",
        name: "Marina Bay Sands Singapore",
        description: "Iconic resort with infinity pool, luxury shopping, and stunning city skyline views.",
        address: "10 Bayfront Avenue",
        city: "Singapore",
        state: null,
        country: "Singapore",
        rating: 4.6,
        price_per_night: 32000,
        amenities: ["WiFi", "Infinity Pool", "Casino", "Shopping Mall", "Multiple Restaurants", "Skyline Views", "Spa"],
        images: ["/placeholder.svg?height=300&width=400&text=Marina+Bay+Sands"],
        available_rooms: 45,
        hotel_type: "resort",
        is_featured: true,
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
    },
    {
        id: "12",
        name: "Burj Al Arab Dubai",
        description: "World's most luxurious hotel, sail-shaped icon offering unparalleled opulence and service.",
        address: "Jumeirah Beach Road",
        city: "Dubai",
        state: null,
        country: "UAE",
        rating: 4.9,
        price_per_night: 85000,
        amenities: [
            "WiFi",
            "Private Beach",
            "Helicopter Pad",
            "Butler Service",
            "Multiple Restaurants",
            "Spa",
            "Rolls Royce Fleet",
        ],
        images: ["/placeholder.svg?height=300&width=400&text=Burj+Al+Arab"],
        available_rooms: 8,
        hotel_type: "luxury",
        is_featured: true,
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
    },
]

export const getHotels = () => mockHotels

export const getHotelById = (id: string) => mockHotels.find((hotel) => hotel.id === id)

export const getFeaturedHotels = () => mockHotels.filter((hotel) => hotel.is_featured)

export const getHotelsByCountry = (country: string) => mockHotels.filter((hotel) => hotel.country === country)

export const getIndianHotels = () => mockHotels.filter((hotel) => hotel.country === "India")

export const getInternationalHotels = () => mockHotels.filter((hotel) => hotel.country !== "India")

export const searchHotels = (query: {
    destination?: string
    checkIn?: Date
    checkOut?: Date
    guests?: number
    minPrice?: number
    maxPrice?: number
}) => {
    let results = mockHotels

    if (query.destination) {
        const searchTerm = query.destination.toLowerCase()
        results = results.filter(
            (hotel) =>
                hotel.city.toLowerCase().includes(searchTerm) ||
                hotel.country.toLowerCase().includes(searchTerm) ||
                hotel.name.toLowerCase().includes(searchTerm),
        )
    }

    if (query.minPrice) {
        results = results.filter((hotel) => hotel.price_per_night >= query.minPrice!)
    }

    if (query.maxPrice) {
        results = results.filter((hotel) => hotel.price_per_night <= query.maxPrice!)
    }

    return results
}
