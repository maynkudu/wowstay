"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Search, MapPin, X, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

export default function SearchFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [place, setPlace] = useState(searchParams.get("place") || "")
  const [budget, setBudget] = useState([Number.parseInt(searchParams.get("budget") || "500")])
  const [rating, setRating] = useState([Number.parseFloat(searchParams.get("rating") || "0")])

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (place) params.set("place", place)
    if (budget[0] > 0) params.set("budget", budget[0].toString())
    if (rating[0] > 0) params.set("rating", rating[0].toString())

    router.push(`/hotels?${params.toString()}`)
  }

  const clearFilters = () => {
    setPlace("")
    setBudget([500])
    setRating([0])
    router.push("/hotels")
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 sticky top-24"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-yellow-500" />
          <h3 className="text-xl font-bold text-gray-900">Filter Hotels</h3>
        </div>
        <button
          onClick={clearFilters}
          className="text-sm text-gray-500 hover:text-gray-700 flex items-center space-x-1"
        >
          <X className="w-4 h-4" />
          <span>Clear</span>
        </button>
      </div>

      <div className="space-y-8">
        <div>
          <Label htmlFor="place" className="text-sm font-semibold text-gray-700 mb-3 block">
            Location
          </Label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              id="place"
              placeholder="Enter city or hotel name"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              className="pl-12 h-12 border-2 border-gray-200 rounded-2xl focus:border-blue-400 focus:bg-blue-50/50"
            />
          </div>
        </div>

        <div>
          <Label className="text-sm font-semibold text-gray-700 mb-3 block">
            Max Budget: <span className="text-blue-600 font-bold">${budget[0]}</span> per night
          </Label>
          <div className="px-2">
            <Slider value={budget} onValueChange={setBudget} max={1000} min={50} step={25} className="w-full" />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>$50</span>
              <span>$1000+</span>
            </div>
          </div>
        </div>

        <div>
          <Label className="text-sm font-semibold text-gray-700 mb-3 block">
            Minimum Rating: <span className="text-yellow-600 font-bold">{rating[0]}</span> stars
          </Label>
          <div className="px-2">
            <Slider value={rating} onValueChange={setRating} max={5} min={0} step={0.5} className="w-full" />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>Any</span>
              <span>5 stars</span>
            </div>
          </div>
        </div>

        <Button
          onClick={handleSearch}
          className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-2xl font-semibold"
        >
          <Search className="w-4 h-4 mr-2" />
          Apply Filters
        </Button>
      </div>

      {/* Quick Filter Tags */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <Label className="text-sm font-semibold text-gray-700 mb-3 block">Quick Filters</Label>
        <div className="flex flex-wrap gap-2">
          {[
            { label: "Luxury", budget: 500 },
            { label: "Budget", budget: 150 },
            { label: "5 Star", rating: 5 },
            { label: "4+ Star", rating: 4 },
          ].map((filter) => (
            <button
              key={filter.label}
              onClick={() => {
                if ("budget" in filter) setBudget([filter.budget || 0])
                if ("rating" in filter) setRating([filter.rating || 0])
              }}
              className="px-3 py-1.5 text-xs font-medium bg-gray-100 hover:bg-blue-100 hover:text-blue-700 rounded-full transition-colors"
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
