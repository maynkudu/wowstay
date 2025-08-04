"use client"
import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import FeaturedHotels from "@/components/featured-hotels"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturedHotels />
    </div>
  )
}
