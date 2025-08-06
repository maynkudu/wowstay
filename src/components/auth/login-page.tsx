"use client"

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Mail, Chrome, ArrowLeft, Sparkles, Lock, Eye, EyeOff, User, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/context/auth-context'

export default function LoginPage() {
    const [mode, setMode] = useState<'signin' | 'signup'>('signin')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [loadingGoogle, setLoadingGoogle] = useState(false)

    const { user, signIn, signUp, signInWithGoogle } = useAuth()
    const router = useRouter()
    const searchParams = useSearchParams()
    const redirectTo = searchParams.get('redirect') || '/'

    useEffect(() => {
        if (user) {
            router.push(redirectTo)
        }
    }, [user, router, redirectTo])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            let result
            if (mode === 'signin') {
                result = await signIn(email, password)
            } else {
                // For signup, pass the additional account data
                result = await signUp(email, password, {
                    firstName,
                    lastName,
                    phone,
                })
            }

            if (result.error) {
                setError(result.error.message)
            } else if (mode === 'signup') {
                setError('')
                // Show success message for signup
                setMode('signin')
                setPassword('')
                setFirstName('')
                setLastName('')
                setPhone('')
                setError('Account created successfully! Please sign in.')
            }
        } catch (err) {
            setError('An unexpected error occurred')
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleSignIn = async () => {
        setLoadingGoogle(true)
        setError('')

        const { error } = await signInWithGoogle()
        if (error) {
            setError(error.message)
            setLoadingGoogle(false)
        }
    }

    const resetForm = () => {
        setEmail('')
        setPassword('')
        setFirstName('')
        setLastName('')
        setPhone('')
        setError('')
    }

    const switchMode = () => {
        setMode(mode === 'signin' ? 'signup' : 'signin')
        resetForm()
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

                {/* Left Side - Branding */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="hidden lg:block"
                >
                    <div className="text-center lg:text-left">
                        <div className="flex items-center justify-center lg:justify-start space-x-3 mb-8">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                                <Sparkles className="w-7 h-7 text-white" />
                            </div>
                            <span className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                                WowStay
                            </span>
                        </div>

                        <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                            Welcome to Your Next
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                                Adventure
                            </span>
                        </h1>

                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            Discover extraordinary hotels and resorts around the world.
                            {mode === 'signin'
                                ? 'Sign in to unlock exclusive deals and personalized recommendations.'
                                : 'Create your account to start your journey with us.'
                            }
                        </p>

                        <div className="grid grid-cols-3 gap-4 opacity-60">
                            <div className="aspect-square bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl"></div>
                            <div className="aspect-square bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl"></div>
                            <div className="aspect-square bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl"></div>
                        </div>
                    </div>
                </motion.div>

                {/* Right Side - Login Form */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100"
                >
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="lg:hidden flex items-center justify-center space-x-2 mb-6">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-2xl font-bold text-gray-900">WowStay</span>
                        </div>

                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
                        </h2>
                        <p className="text-gray-600">
                            {mode === 'signin'
                                ? 'Sign in to your WowStay account'
                                : 'Join WowStay for exclusive deals'
                            }
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`px-4 py-3 rounded-2xl mb-6 text-center ${error.includes('successfully')
                                    ? 'bg-green-50 border border-green-200 text-green-700'
                                    : 'bg-red-50 border border-red-200 text-red-700'
                                }`}
                        >
                            {error}
                        </motion.div>
                    )}

                    <div className="space-y-6">
                        {/* Google Sign In */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Button
                                onClick={handleGoogleSignIn}
                                disabled={loadingGoogle}
                                className="w-full h-14 bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 hover:border-gray-300 rounded-2xl font-semibold text-lg shadow-sm"
                            >
                                {loadingGoogle ? (
                                    <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <Chrome className="w-6 h-6 mr-3" />
                                        Continue with Google
                                    </>
                                )}
                            </Button>
                        </motion.div>

                        {/* Divider */}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-gray-500 font-medium">or</span>
                            </div>
                        </div>

                        {/* Email/Password Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {mode === 'signup' && (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="firstName" className="text-sm font-semibold text-gray-700 mb-3 block">
                                                First Name
                                            </Label>
                                            <div className="relative">
                                                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                <Input
                                                    id="firstName"
                                                    type="text"
                                                    placeholder="First name"
                                                    value={firstName}
                                                    onChange={(e) => setFirstName(e.target.value)}
                                                    required
                                                    className="pl-12 h-14 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-400 focus:bg-blue-50/50 transition-all duration-300"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <Label htmlFor="lastName" className="text-sm font-semibold text-gray-700 mb-3 block">
                                                Last Name
                                            </Label>
                                            <div className="relative">
                                                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                <Input
                                                    id="lastName"
                                                    type="text"
                                                    placeholder="Last name"
                                                    value={lastName}
                                                    onChange={(e) => setLastName(e.target.value)}
                                                    required
                                                    className="pl-12 h-14 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-400 focus:bg-blue-50/50 transition-all duration-300"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="phone" className="text-sm font-semibold text-gray-700 mb-3 block">
                                            Phone Number <span className="text-gray-400 font-normal">(Optional)</span>
                                        </Label>
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                            <Input
                                                id="phone"
                                                type="tel"
                                                placeholder="Enter your phone number"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                className="pl-12 h-14 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-400 focus:bg-blue-50/50 transition-all duration-300"
                                            />
                                        </div>
                                    </div>
                                </>
                            )}

                            <div>
                                <Label htmlFor="email" className="text-sm font-semibold text-gray-700 mb-3 block">
                                    Email Address
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="pl-12 h-14 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-400 focus:bg-blue-50/50 transition-all duration-300"
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="password" className="text-sm font-semibold text-gray-700 mb-3 block">
                                    Password
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="pl-12 pr-12 h-14 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-400 focus:bg-blue-50/50 transition-all duration-300"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    {loading ? (
                                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        mode === 'signin' ? 'Sign In' : 'Create Account'
                                    )}
                                </Button>
                            </motion.div>
                        </form>

                        {/* Switch Mode */}
                        <div className="text-center">
                            <p className="text-gray-600">
                                {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
                                <button
                                    onClick={switchMode}
                                    className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                                >
                                    {mode === 'signin' ? 'Sign up' : 'Sign in'}
                                </button>
                            </p>
                        </div>
                    </div>

                    {/* Back to Home */}
                    <div className="mt-8 text-center">
                        <Link href="/">
                            <Button variant="ghost" className="text-gray-600 hover:text-gray-800">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Home
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
