"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Users, CreditCard } from "lucide-react"
import type { Hotel } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface BookingPanelProps {
  hotel: Hotel
}

export default function BookingPanel({ hotel }: BookingPanelProps) {
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [guests, setGuests] = useState(2)
  const [nights, setNights] = useState(1)

  const calculateNights = () => {
    if (checkIn && checkOut) {
      const start = new Date(checkIn)
      const end = new Date(checkOut)
      const diffTime = Math.abs(end.getTime() - start.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      setNights(diffDays)
      return diffDays
    }
    return 1
  }

  const totalPrice = hotel.pricePerNight * nights
  const taxes = totalPrice * 0.12
  const finalTotal = totalPrice + taxes

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-24"
    >
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Book Your Stay</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="checkin" className="text-sm font-medium text-gray-700 mb-2 block">
                Check-in
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="checkin"
                  type="date"
                  value={checkIn}
                  onChange={(e) => {
                    setCheckIn(e.target.value)
                    calculateNights()
                  }}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="checkout" className="text-sm font-medium text-gray-700 mb-2 block">
                Check-out
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="checkout"
                  type="date"
                  value={checkOut}
                  onChange={(e) => {
                    setCheckOut(e.target.value)
                    calculateNights()
                  }}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="guests" className="text-sm font-medium text-gray-700 mb-2 block">
              Guests
            </Label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="guests"
                type="number"
                min="1"
                max="10"
                value={guests}
                onChange={(e) => setGuests(Number.parseInt(e.target.value))}
                className="pl-10"
              />
            </div>
          </div>

          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>
                ${hotel.pricePerNight} × {nights} nights
              </span>
              <span>${totalPrice}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Taxes & fees</span>
              <span>${taxes.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-gray-900 border-t pt-2">
              <span>Total</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>

          <Button className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <CreditCard className="w-5 h-5 mr-2" />
            Book Now
          </Button>

          <div className="text-center text-sm text-gray-500">Free cancellation until 24 hours before check-in</div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
