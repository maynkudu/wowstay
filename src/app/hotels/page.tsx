"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { searchHotels } from "@/lib/database/hotels"
import type { Hotel } from "@/lib/types"
import HotelCard from "@/components/hotel-card"
import SearchFilters from "@/components/search-filters"
import Navbar from "@/components/navbar"

function HotelsContent() {
  const searchParams = useSearchParams()
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadHotels = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const place = searchParams.get("place")
        const budget = searchParams.get("budget")
        const rating = searchParams.get("rating")

        const searchFilters: {
          city?: string
          maxPrice?: number
          minRating?: number
        } = {}

        if (place) {
          // Try to determine if it's a city or country
          searchFilters.city = place
        }

        if (budget) {
          const maxBudget = Number.parseInt(budget)
          if (!isNaN(maxBudget)) {
            searchFilters.maxPrice = maxBudget
          }
        }

        if (rating) {
          const minRating = Number.parseFloat(rating)
          if (!isNaN(minRating)) {
            searchFilters.minRating = minRating
          }
        }

        const { data, error } = await searchHotels(searchFilters)

        if (error) {
          setError('Failed to load hotels')
          console.error('Error loading hotels:', error)
        } else if (data) {
          setHotels(data)
        }
      } catch (err) {
        setError('Failed to load hotels')
        console.error('Error loading hotels:', err)
      } finally {
        setIsLoading(false)
      }
    }

    loadHotels()
  }, [searchParams])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-red-600 mb-2">Error Loading Hotels</h3>
        <p className="text-gray-600">{error}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {searchParams.get("place") ? `Hotels in ${searchParams.get("place")}` : "All Hotels"}
            </h1>
            <p className="text-gray-600">
              {hotels.length} hotel{hotels.length !== 1 ? "s" : ""} found
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <SearchFilters />
            </div>

            <div className="lg:col-span-3">
              {hotels.length === 0 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No hotels found</h3>
                  <p className="text-gray-600">Try adjusting your search criteria</p>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {hotels.map((hotel, index) => (
                    <motion.div
                      key={hotel.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <HotelCard hotel={hotel} />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function HotelsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      }
    >
      <HotelsContent />
    </Suspense>
  )
}
