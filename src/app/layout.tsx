import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import localFont from "next/font/local"
import "./globals.css"
import LenisProvider from "@/providers/lenis-provider"

const inter = Inter({ subsets: ["latin"] })

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: '--font-poppins',
  subsets: ['devanagari']
})

const nevrada = localFont({
  src: [
    {
      path: './fonts/Nevrada.ttf',
      weight: '400',
      style: 'normal'
    }
  ],
  variable: '--font-nevrada'
})

const themunday = localFont({
  src: [
    {
      path: './fonts/Themunday.ttf',
      weight: '400',
      style: 'normal'
    }
  ],
  variable: '--font-themunday'
})

const vonique = localFont({
  src: [
    {
      path: './fonts/Vonique.ttf',
      weight: '400',
      style: 'normal'
    },
    {
      path: './fonts/VoniqueBold.ttf',
      weight: '600'
    }
  ],
  variable: '--font-vonique'
})

export const metadata: Metadata = {
  title: "WowStay - Find Your Perfect Hotel",
  description: "Discover amazing hotels and resorts around the world with WowStay. Book your perfect stay today.",
  keywords: "hotels, booking, travel, accommodation, resorts",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${nevrada.variable} ${themunday.variable} ${vonique.variable} ${poppins.variable}`}>
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}
