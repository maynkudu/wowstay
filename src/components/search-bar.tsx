"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion, useAnimation, useAnimationFrame, useMotionValue } from "framer-motion"
import { Search, MapPin, Sparkles, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import SearchSuggestions from "@/components/search-suggestions"
import { getDestinationSuggestions, budgetOptions, type SearchSuggestion } from "@/lib/search-data"

const destinations = [
  { name: "Goa" },
  { name: "Mumbai" },
  { name: "Kochi" },
  { name: "Manali" },
  { name: "Sikkim" },
  { name: "Ayodhya" },
  { name: "Varanasi" },
  { name: "Kashi" },
]

export default function SearchBar() {
  const [place, setPlace] = useState("")
  const [selectedBudget, setSelectedBudget] = useState("")
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const searchRef = useRef<HTMLDivElement>(null)
  const placeInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [contentWidth, setContentWidth] = useState(0);

  const handleClick = (destinationName: string) => {
    setPlace(destinationName);
    setShowSuggestions(false);
  };

  // Measure the width of one full set of items
  useEffect(() => {
    if (containerRef.current) {
      setContentWidth(containerRef.current.offsetWidth / 2);
    }
  }, [destinations]);

  useAnimationFrame((t, delta) => {
    if (!isHovering && contentWidth) {
      const speed = 30; // pixels per second
      const moveBy = (speed * delta) / 1000;
      const currentX = x.get();

      // If scrolled past one copy, reset x to 0
      if (Math.abs(currentX) >= contentWidth) {
        x.set(0);
      } else {
        x.set(currentX - moveBy);
      }
    }
  });


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
        setFocusedField(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handlePlaceChange = (value: string) => {
    setPlace(value)
    const newSuggestions = getDestinationSuggestions(value)
    setSuggestions(newSuggestions)
    setShowSuggestions(value.length >= 1)
    setHighlightedIndex(-1)
  }

  const handleSuggestionSelect = (suggestion: SearchSuggestion) => {
    setPlace(suggestion.title)
    setShowSuggestions(false)
    setHighlightedIndex(-1)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setHighlightedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0))
        break
      case "ArrowUp":
        e.preventDefault()
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1))
        break
      case "Enter":
        e.preventDefault()
        if (highlightedIndex >= 0) {
          handleSuggestionSelect(suggestions[highlightedIndex])
        } else {
          handleSearch()
        }
        break
      case "Escape":
        setShowSuggestions(false)
        setHighlightedIndex(-1)
        placeInputRef.current?.blur()
        break
    }
  }

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (place) params.set("place", place)
    if (selectedBudget) {
      const budget = budgetOptions.find((b) => b.id === selectedBudget)
      if (budget) params.set("budget", budget.max.toString())
    }

    router.push(`/hotels?${params.toString()}`)
    setShowSuggestions(false)
  }

  const clearField = (field: string) => {
    switch (field) {
      case "place":
        setPlace("")
        setSuggestions([])
        setShowSuggestions(false)
        break
      case "budget":
        setSelectedBudget("")
        break
    }
  }

  return (
    <motion.div
      ref={searchRef}
      className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl max-w-4xl mx-auto border border-gray-100/20 font-poppins"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Header */}
      {/* <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900">Where would you like to go?</h3>
      </div> */}

      <div className="flex gap-6">
        {/* Location Search */}
        <div className="relative flex-2/3">
          <label className="block text-start ml-1 text-sm font-semibold text-white/80 mb-3">Destination</label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5 z-10" />
            <Input
              ref={placeInputRef}
              placeholder="Type a destination..."
              value={place}
              onChange={(e) => handlePlaceChange(e.target.value)}
              onFocus={() => {
                setFocusedField("place")
                if (place.length >= 1) setShowSuggestions(true)
              }}
              onKeyDown={handleKeyDown}
              className={`pl-12 pr-10 h-14 text-lg border-2 transition-all duration-300 rounded-2xl text-white placeholder:text-white/70 ${focusedField === "place"
                ? "border-amber-950/30 bg-white/40 shadow-lg backdrop-blur-2xl"
                : "border-gray-200/10 backdrop-blur-lg hover:border-gray-300 bg-white/10"
                }`}
              style={{ color: "#1f2937" }} // Ensure text is always visible
            />
            {place && (
              <button
                onClick={() => clearField("place")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <SearchSuggestions
            suggestions={suggestions}
            isOpen={showSuggestions}
            onSelect={handleSuggestionSelect}
            highlightedIndex={highlightedIndex}
          />
        </div>

        {/* Budget Selection */}
        <div className="flex-1/3">
          <label className="block text-start ml-1 text-sm font-semibold text-white/80 mb-3">Budget Range</label>
          <Select value={selectedBudget} onValueChange={setSelectedBudget}>
            <SelectTrigger
              className={`min-h-14 w-full text-sm text-white/70 border-2 transition-all duration-300 rounded-2xl ${focusedField === "budget"
                ? "border-amber-950/30 bg-white/40 shadow-lg backdrop-blur-2xl"
                : "border-gray-200/10 backdrop-blur-lg hover:border-gray-300 bg-white/10"
                }`}
              onFocus={() => setFocusedField("budget")}
              onBlur={() => setFocusedField(null)}
            >
              <SelectValue className="text-white" placeholder="Select your budget range" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl">
              {budgetOptions.map((budget) => (
                <SelectItem key={budget.id} value={budget.id} className="cursor-pointer hover:bg-blue-50 rounded-xl">
                  <div className="flex flex-col">
                    <span className="font-semibold">{budget.label}</span>
                    <span className="text-sm text-gray-500">{budget.range}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-5 items-center justify-between">
        {/* Popular Destinations */}
        <div className="mt-4 text-start w-full">
          <p className="text-sm font-semibold text-white/80 mb-4">
            Popular Destinations
          </p>
          <div className="relative w-full overflow-hidden h-14 mask-gradient">
            <motion.div
              className="flex gap-6 absolute"
              ref={containerRef}
              style={{ x, width: "fit-content" }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {/* Render destinations twice for seamless loop */}
              {[...destinations, ...destinations].map((destination, index) => (
                <motion.button
                  key={`${destination.name}-${index}`}
                  onClick={() => handleClick(destination.name)}
                  className="group mt-2 flex-shrink-0 px-4 py-2 bg-white/20 rounded-2xl border border-gray-100/20 hover:border-gray-200/60 transition-all duration-300 hover:shadow-lg transform hover:scale-105"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-center whitespace-nowrap">
                    <div className="font-semibold text-white/70 group-hover:text-white transition-colors">
                      {destination.name}
                    </div>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </div>
        </div>

        <style jsx>{`
        .mask-gradient {
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 20%,
            black 80%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
        }
      `}</style>

        {/* Search Button */}
        <div className="mt-2 text-center flex-1/3">
          <Button
            onClick={handleSearch}
            className="h-20 my-auto px-10 text-lg font-semibold bg-gradient-to-r from-amber-950 via-red-950 to-orange-950 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            <Search className="w-6 h-6 mrx-5" />
            Search
          </Button>
        </div>
      </div>


    </motion.div>
  )
}
