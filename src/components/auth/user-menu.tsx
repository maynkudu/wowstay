"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, LogOut, Settings, Heart, Calendar, ChevronDown } from 'lucide-react'
import { useAuth } from '@/context/auth-context'
export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, signOut } = useAuth()

  if (!user) return null

  const handleSignOut = async () => {
    await signOut()
    setIsOpen(false)
  }

  const userInitials = user.user_metadata?.full_name
    ?.split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase() || user.email?.[0].toUpperCase()

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 p-2 rounded-2xl hover:bg-white/10 transition-all duration-200"
      >
        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
          {userInitials}
        </div>
        <div className="hidden md:block text-left">
          <div className="text-sm font-medium text-white">
            {user.user_metadata?.full_name || 'User'}
          </div>
          <div className="text-xs text-white/70">{user.email}</div>
        </div>
        <ChevronDown className={`w-4 h-4 text-white/70 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
          >
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {userInitials}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {user.user_metadata?.full_name || 'User'}
                  </div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </div>
              </div>
            </div>

            <div className="p-2">
              <button className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left">
                <User className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">Profile Settings</span>
              </button>
              
              <button className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left">
                <Calendar className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">My Bookings</span>
              </button>
              
              <button className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left">
                <Heart className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">Favorites</span>
              </button>
              
              <button className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left">
                <Settings className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">Settings</span>
              </button>
            </div>

            <div className="p-2 border-t border-gray-100">
              <button
                onClick={handleSignOut}
                className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-red-50 transition-colors text-left text-red-600"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
