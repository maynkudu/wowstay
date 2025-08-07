"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Star, MapPin, Wifi, Car, Coffee } from 'lucide-react'
import type { Hotel } from "@/lib/types"

interface HotelCardProps {
  hotel: Hotel
}

export default function HotelCard({ hotel }: HotelCardProps) {
  const amenityIcons = {
    "Free WiFi": Wifi,
    "Parking": Car,
    "Restaurant": Coffee,
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden"
    >
      <Link href={`/hotels/${hotel.id}`}>
        <div className="relative h-64">
          <Image
            src={hotel.images[0] || "/placeholder.svg?height=256&width=400"}
            alt={hotel.name}
            fill
            className="object-cover"
          />
          <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-semibold">{hotel.rating.average}</span>
          </div>
          {hotel.pricing.discounts && (
            <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
              -{hotel.pricing.discounts.percentage}%
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{hotel.name}</h3>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">
                {hotel.pricing.currency === 'USD' ? '$' : hotel.pricing.currency}
                {hotel.pricing.pricePerNight}
              </div>
              <div className="text-sm text-gray-500">per night</div>
            </div>
          </div>

          <div className="flex items-center text-gray-600 mb-3">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">{hotel.location.city}, {hotel.location.country}</span>
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{hotel.description}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {hotel.amenities.slice(0, 3).map((amenity) => {
                const Icon = amenityIcons[amenity as keyof typeof amenityIcons]
                return Icon ? (
                  <div key={amenity} className="flex items-center text-gray-500">
                    <Icon className="w-4 h-4" />
                  </div>
                ) : null
              })}
            </div>

            <div className="text-sm text-gray-500">
              {hotel.rating.totalRatings} reviews
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
