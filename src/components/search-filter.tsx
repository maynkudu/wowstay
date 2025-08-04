"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Search, MapPin } from "lucide-react"
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

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl p-6 shadow-lg sticky top-24"
    >
      <h3 className="text-xl font-bold text-gray-900 mb-6">Filter Hotels</h3>

      <div className="space-y-6">
        <div>
          <Label htmlFor="place" className="text-sm font-medium text-gray-700 mb-2 block">
            Location
          </Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              id="place"
              placeholder="Enter city or hotel name"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">Max Budget: ${budget[0]} per night</Label>
          <Slider value={budget} onValueChange={setBudget} max={1000} min={50} step={25} className="w-full" />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>$50</span>
            <span>$1000+</span>
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">Minimum Rating: {rating[0]} stars</Label>
          <Slider value={rating} onValueChange={setRating} max={5} min={0} step={0.5} className="w-full" />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Any</span>
            <span>5 stars</span>
          </div>
        </div>

        <Button onClick={handleSearch} className="w-full">
          <Search className="w-4 h-4 mr-2" />
          Apply Filters
        </Button>
      </div>
    </motion.div>
  )
}
