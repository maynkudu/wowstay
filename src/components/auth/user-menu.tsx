"use client"

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, LogOut, Settings, Heart, Calendar, ChevronDown } from 'lucide-react'
import { useAuth } from '@/context/auth-context'
import Link from 'next/link'
import { AccountData, getAccount } from '@/lib/database/accounts'
import { Avatar } from '@radix-ui/react-avatar'
import { AvatarFallback, AvatarImage } from '../ui/avatar'
export default function UserMenu() {
    const [isOpen, setIsOpen] = useState(false)
    const [accountData, setAccountData] = useState<AccountData | null>(null)
    const { user, signOut } = useAuth()

    useEffect(() => {
        if (user) {
            // Fetch account data when user is available
            getAccount(user.id).then(({ data }) => {
                if (data) {
                    setAccountData(data)
                }
            })
        }
    }, [user])

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
                <Avatar className='h-10 w-10 rounded-full overflow-hidden'>
                    <AvatarImage src={accountData?.avatar_url} />
                    <AvatarFallback>{userInitials}</AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                    <div className="text-sm font-medium text-white mix-blend-exclusion">
                        {user.user_metadata?.full_name || 'User'}
                    </div>
                    <div className="text-xs text-white/70 mix-blend-difference">{user.email}</div>
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
                        <div className="p-2">
                            <Link href="/profile" passHref>
                                <button className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left">
                                    <User className="w-5 h-5 text-gray-400" />
                                    <span className="text-gray-700">Profile</span>
                                </button>
                            </Link>


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
