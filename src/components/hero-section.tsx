"use client"

import { motion } from "framer-motion"
import SearchBar from "@/components/search-bar"
import Image from "next/image"

export default function HeroSection() {
  return (
    <div className="relative h-screen flex items-center justify-center">
      {/* Background Image */}
      {/* <Image src={'https://i.pinimg.com/736x/e6/30/db/e630db9e931df9ea09a6090cf5dbfa89.jpg'} fill alt="hotel"/> */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat antialiased"
        style={{
          backgroundImage: "url('https://media.wowstays.org/hero.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60" />
      </div>


      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl mb-6 font-poppins"
        >
          Find Your Perfect
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            WowStay
          </span>
        </motion.h1>
{/* 
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl mb-12 text-gray-200"
        >
          Discover amazing hotels and resorts around the world
        </motion.p> */}

        <motion.div
          // initial={{ opacity: 0, y: 30 }}
          // animate={{ opacity: 1, y: 0 }}
          // transition={{ duration: 0.8, delay: 0.4 }}
        >
          <SearchBar />
        </motion.div>
      </div>
    </div>
  )
}
