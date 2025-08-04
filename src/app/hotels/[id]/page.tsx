"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import { Star, MapPin, Wifi, Car, Coffee, Phone, Mail } from "lucide-react"
import { hotels } from "@/lib/data"
import type { Hotel } from "@/lib/types"
import Navbar from "@/components/navbar"
import BookingPanel from "@/components/booking-panel"

export default function HotelPage() {
  const params = useParams()
  const [hotel, setHotel] = useState<Hotel | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    const foundHotel = hotels.find((h) => h.id === params.id)
    setHotel(foundHotel || null)
  }, [params.id])

  if (!hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading hotel details...</p>
        </div>
      </div>
    )
  }

  const amenityIcons = {
    "Free WiFi": Wifi,
    Parking: Car,
    Restaurant: Coffee,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Image Gallery */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <div className="relative h-96 rounded-2xl overflow-hidden mb-4">
                  <Image
                    src={hotel.images[selectedImage] || "/placeholder.svg"}
                    alt={hotel.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {hotel.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative h-20 rounded-lg overflow-hidden ${
                        selectedImage === index ? "ring-2 ring-blue-600" : ""
                      }`}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${hotel.name} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Hotel Info */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-lg mb-8"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{hotel.name}</h1>
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin className="w-5 h-5 mr-2" />
                      <span>{hotel.location}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="flex items-center bg-blue-100 px-3 py-1 rounded-full">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        <span className="font-semibold text-blue-800">{hotel.rating}</span>
                      </div>
                      <span className="text-gray-600 ml-3">({hotel.reviews} reviews)</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-600">${hotel.pricePerNight}</div>
                    <div className="text-gray-500">per night</div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">About this hotel</h3>
                  <p className="text-gray-600 leading-relaxed">{hotel.description}</p>
                </div>
              </motion.div>

              {/* Amenities */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-2xl p-8 shadow-lg mb-8"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {hotel.amenities.map((amenity) => {
                    const Icon = amenityIcons[amenity as keyof typeof amenityIcons]
                    return (
                      <div key={amenity} className="flex items-center text-gray-700">
                        {Icon && <Icon className="w-5 h-5 mr-3 text-blue-600" />}
                        <span>{amenity}</span>
                      </div>
                    )
                  })}
                </div>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center text-gray-700">
                    <Phone className="w-5 h-5 mr-3 text-blue-600" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Mail className="w-5 h-5 mr-3 text-blue-600" />
                    <span>info@{hotel.name.toLowerCase().replace(/\s+/g, "")}.com</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Booking Panel */}
            <div className="lg:col-span-1">
              <BookingPanel hotel={hotel} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
