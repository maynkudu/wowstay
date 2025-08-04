"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Search, MapPin, DollarSign, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SearchBar() {
  const [place, setPlace] = useState("")
  const [budget, setBudget] = useState("")
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const router = useRouter()

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (place) params.set("place", place)
    if (budget) params.set("budget", budget)
    if (checkIn) params.set("checkIn", checkIn)
    if (checkOut) params.set("checkOut", checkOut)

    router.push(`/hotels?${params.toString()}`)
  }

  return (
    <motion.div
      className="bg-white rounded-2xl p-6 shadow-2xl max-w-4xl mx-auto"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Where to?"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            className="pl-10 h-12 border-0 bg-gray-50 focus:bg-white"
          />
        </div>

        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Max budget"
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="pl-10 h-12 border-0 bg-gray-50 focus:bg-white"
          />
        </div>

        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Check in"
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="pl-10 h-12 border-0 bg-gray-50 focus:bg-white"
          />
        </div>

        <Button
          onClick={handleSearch}
          className="h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          <Search className="w-5 h-5 mr-2" />
          Search
        </Button>
      </div>
    </motion.div>
  )
}
