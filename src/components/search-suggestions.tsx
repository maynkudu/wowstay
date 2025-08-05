"use client"

import { motion, AnimatePresence } from "framer-motion"
import { MapPin } from "lucide-react"
import type { SearchSuggestion } from "@/lib/search-data"

interface SearchSuggestionsProps {
  suggestions: SearchSuggestion[]
  isOpen: boolean
  onSelect: (suggestion: SearchSuggestion) => void
  highlightedIndex: number
}

export default function SearchSuggestions({ suggestions, isOpen, onSelect, highlightedIndex }: SearchSuggestionsProps) {

  return (
    <AnimatePresence>
      {isOpen && suggestions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 backdrop-blur-sm"
        >
          <div className="p-2">
            {suggestions.map((suggestion, index) => {
              const Icon = MapPin
              const isHighlighted = index === highlightedIndex

              return (
                <motion.button
                  key={suggestion.id}
                  onClick={() => onSelect(suggestion)}
                  className={`w-full flex items-center space-x-4 p-4 rounded-xl transition-all duration-200 text-left ${isHighlighted
                      ? "bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200"
                      : "hover:bg-gray-50"
                    }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 truncate">{suggestion.title}</div>
                    <div className="text-sm text-gray-500 truncate">{suggestion.subtitle}</div>
                  </div>

                  <div className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">{suggestion.country}</div>
                </motion.button>
              )
            })}
          </div>

          <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
            <div className="text-xs text-gray-500 text-center">
              Press <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded text-xs">↑↓</kbd> to navigate,{" "}
              <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded text-xs">Enter</kbd> to select
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
