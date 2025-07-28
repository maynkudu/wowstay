"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import HotelCard from "./hotel-card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Filter, SortAsc } from "lucide-react";
import type { Hotel } from "@/lib/mock-data/hotels";

interface HotelListProps {
  hotels: Hotel[];
  onBookHotel?: (hotel: Hotel) => void;
}

export default function HotelList({ hotels, onBookHotel }: HotelListProps) {
  const [sortBy, setSortBy] = useState("featured");
  const [filterBy, setFilterBy] = useState("all");

  const sortedAndFilteredHotels = hotels
    .filter((hotel) => {
      if (filterBy === "all") return true;
      if (filterBy === "indian") return hotel.country === "India";
      if (filterBy === "international") return hotel.country !== "India";
      if (filterBy === "luxury") return hotel.hotel_type === "luxury";
      if (filterBy === "resort") return hotel.hotel_type === "resort";
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price_per_night - b.price_per_night;
        case "price-high":
          return b.price_per_night - a.price_per_night;
        case "rating":
          return b.rating - a.rating;
        case "featured":
          return b.is_featured ? 1 : -1;
        default:
          return 0;
      }
    });

  return (
    <div className="space-y-6">
      {/* Filters and Sort */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  Filter:
                </span>
                <Select value={filterBy} onValueChange={setFilterBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Hotels</SelectItem>
                    <SelectItem value="indian">Indian Hotels</SelectItem>
                    <SelectItem value="international">International</SelectItem>
                    <SelectItem value="luxury">Luxury</SelectItem>
                    <SelectItem value="resort">Resort</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <SortAsc className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Sort:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="text-sm text-gray-600">
              {sortedAndFilteredHotels.length} hotels found
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hotel Grid */}
      {sortedAndFilteredHotels.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">
            No hotels found matching your criteria
          </div>
          <Button
            variant="outline"
            onClick={() => {
              setFilterBy("all");
              setSortBy("featured");
            }}
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedAndFilteredHotels.map((hotel, index) => (
            <motion.div
              key={hotel.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <HotelCard hotel={hotel} onBook={onBookHotel} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
