"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { MapPin, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 900)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`
    fixed top-0 left-0 right-0 z-50 px-4 py-4 
    transition-all duration-700 ease-in-out
    ${isScrolled
          ? 'bg-white/30 backdrop-blur-xl border-b border-black/30'
          : 'bg-transparent backdrop-blur-0 border-b border-transparent'}
  `}
    >
      <div className="max-w-[100rem] mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <motion.div
            className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
          >
            <MapPin className="w-5 h-5 text-white" />
          </motion.div>
          <span className={`text-2xl font-bold ${isScrolled ? "text-gray-900" : "text-white"}`}>WowStay</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            href="/hotels"
            className={`font-medium transition-colors duration-700 hover:text-blue-600 ${isScrolled ? "text-gray-700" : "text-white"
              }`}
          >
            Hotels
          </Link>

          <Link
            href="/about"
            className={`font-medium transition-colors duration-700 hover:text-blue-600 ${isScrolled ? "text-gray-700" : "text-white"
              }`}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={`font-medium transition-colors duration-700 hover:text-blue-600 ${isScrolled ? "text-gray-700" : "text-white"
              }`}
          >
            Contact
          </Link>
          <Button variant={isScrolled ? "default" : "secondary"} size="sm">
            <User className="w-4 h-4 mr-2" />
            Sign In
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden ${isScrolled ? "text-gray-900" : "text-white"}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden mt-4 bg-white rounded-lg shadow-lg p-4"
        >
          <div className="flex flex-col space-y-4">
            <Link href="/hotels" className="text-gray-700 font-medium">
              Hotels
            </Link>
            <Link href="/about" className="text-gray-700 font-medium">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 font-medium">
              Contact
            </Link>
            <Button size="sm" className="w-full">
              <User className="w-4 h-4 mr-2" />
              Sign In
            </Button>
          </div>
        </motion.div>
      )}
    </nav>
  )
}
