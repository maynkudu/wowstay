"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Wifi, Car, Coffee, Waves } from "lucide-react";
import Image from "next/image";
import type { Hotel } from "@/lib/mock-data/hotels";

interface HotelCardProps {
  hotel: Hotel;
  onBook?: (hotel: Hotel) => void;
}

const amenityIcons: { [key: string]: any } = {
  WiFi: Wifi,
  Pool: Waves,
  Restaurant: Coffee,
  Parking: Car,
};

export default function HotelCard({ hotel, onBook }: HotelCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getHotelTypeColor = (type: string) => {
    switch (type) {
      case "luxury":
        return "bg-purple-100 text-purple-800";
      case "resort":
        return "bg-green-100 text-green-800";
      case "business":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group cursor-pointer"
    >
      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="relative h-64 overflow-hidden">
          <Image
            src={hotel.images[0] || "/placeholder.svg"}
            alt={hotel.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

          {hotel.is_featured && (
            <div className="absolute top-4 left-4">
              <Badge className="bg-yellow-500 text-white">Featured</Badge>
            </div>
          )}

          <div className="absolute top-4 right-4">
            <Badge className={getHotelTypeColor(hotel.hotel_type)}>
              {hotel.hotel_type.charAt(0).toUpperCase() +
                hotel.hotel_type.slice(1)}
            </Badge>
          </div>

          <div className="absolute bottom-4 left-4 text-white">
            <div className="flex items-center space-x-1 mb-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{hotel.rating}</span>
            </div>
          </div>
        </div>

        <CardContent className="p-6">
          <div className="mb-3">
            <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
              {hotel.name}
            </h3>
            <div className="flex items-center text-gray-600 text-sm">
              <MapPin className="w-4 h-4 mr-1" />
              <span>
                {hotel.city}, {hotel.country}
              </span>
            </div>
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {hotel.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {hotel.amenities.slice(0, 4).map((amenity) => {
              const IconComponent = amenityIcons[amenity];
              return (
                <div
                  key={amenity}
                  className="flex items-center space-x-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded"
                >
                  {IconComponent && <IconComponent className="w-3 h-3" />}
                  <span>{amenity}</span>
                </div>
              );
            })}
            {hotel.amenities.length > 4 && (
              <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                +{hotel.amenities.length - 4} more
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {formatPrice(hotel.price_per_night)}
              </div>
              <div className="text-sm text-gray-600">per night</div>
            </div>

            <div className="text-right">
              <div className="text-sm text-gray-600 mb-2">
                {hotel.available_rooms} rooms available
              </div>
              <Button
                onClick={() => onBook?.(hotel)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Book Now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
