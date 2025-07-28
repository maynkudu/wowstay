"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "@/components/layout/header";
import HotelSearchForm from "@/components/search/hotel-search-form";
import HotelList from "@/components/hotels/hotel-list";
import { getHotels, searchHotels, type Hotel } from "@/lib/mock-data/hotels";
import { useSearchParams } from "next/navigation";

export default function HotelsPage() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    // Load hotels based on search params or show all
    const destination = searchParams.get("destination");
    const checkIn = searchParams.get("checkIn");
    const checkOut = searchParams.get("checkOut");

    if (destination || checkIn || checkOut) {
      const searchQuery = {
        destination: destination || undefined,
        checkIn: checkIn ? new Date(checkIn) : undefined,
        checkOut: checkOut ? new Date(checkOut) : undefined,
      };
      setHotels(searchHotels(searchQuery));
    } else {
      setHotels(getHotels());
    }

    setLoading(false);
  }, [searchParams]);

  const handleSearch = (searchData: any) => {
    const results = searchHotels(searchData);
    setHotels(results);
  };

  const handleBookHotel = (hotel: Hotel) => {
    // Navigate to booking page or open booking modal
    console.log("Booking hotel:", hotel);
    // You can implement booking logic here
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section with Search */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Find Your Perfect Hotel
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from thousands of hotels in India and around the world
            </p>
          </motion.div>

          <HotelSearchForm onSearch={handleSearch} />
        </div>
      </section>

      {/* Hotels List */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <HotelList hotels={hotels} onBookHotel={handleBookHotel} />
        </div>
      </section>
    </div>
  );
}
