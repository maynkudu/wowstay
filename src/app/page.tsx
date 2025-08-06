"use client"
import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import FeaturedHotels from "@/components/featured-hotels"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturedHotels />
      <Footer />
    </div>
  )
}
