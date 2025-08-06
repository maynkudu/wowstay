"use client"

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Camera, Save, ArrowLeft, User, Phone, Mail, Upload, X, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getAccount, updateAccount, type AccountData } from '@/lib/database/accounts'
import { uploadAvatar, getAvatarUrl } from '@/lib/storage/avatars'
import Navbar from '@/components/navbar'
import Image from 'next/image'
import { useAuth } from '@/context/auth-context'

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [accountData, setAccountData] = useState<AccountData | null>(null)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error'>('success')

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login?redirect=/profile')
      return
    }

    if (user) {
      loadAccountData()
      console.log(user)
    }
  }, [user, authLoading, router])

  const loadAccountData = async () => {
    if (!user) return

    try {
      const { data, error } = await getAccount(user.id)
      if (error) {
        console.error('Error loading account:', error)
        setMessage('Failed to load account data')
        setMessageType('error')
      } else if (data) {
        setAccountData(data)
        setFirstName(data.first_name)
        setLastName(data.last_name)
        setPhone(data.phone || '')
        setAvatarUrl(data.avatar_url || '')
      }
    } catch (error) {
      console.error('Error loading account:', error)
      setMessage('Failed to load account data')
      setMessageType('error')
    } finally {
      setLoading(false)
    }
  }

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !user) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setMessage('Please select an image file')
      setMessageType('error')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setMessage('Image must be less than 5MB')
      setMessageType('error')
      return
    }

    setUploading(true)
    setMessage('')

    try {
      const { data, error } = await uploadAvatar(user.id, file)
      if (error) {
        setMessage('Failed to upload avatar')
        setMessageType('error')
      } else if (data) {
        const newAvatarUrl = getAvatarUrl(data.path)
        setAvatarUrl(newAvatarUrl)
        setMessage('Avatar uploaded successfully!')
        setMessageType('success')
        console.log(avatarUrl)
      }
    } catch (error) {
      console.error('Error uploading avatar:', error)
      setMessage('Failed to upload avatar')
      setMessageType('error')
    } finally {
      setUploading(false)
    }
  }

  const handleSave = async () => {
    if (!user) return

    setSaving(true)
    setMessage('')

    try {
      const { error } = await updateAccount(user.id, {
        first_name: firstName,
        last_name: lastName,
        phone: phone || undefined,
        avatar_url: avatarUrl || undefined,
      })

      if (error) {
        setMessage('Failed to update profile')
        setMessageType('error')
      } else {
        setMessage('Profile updated successfully!')
        setMessageType('success')
        // Reload account data to get updated timestamp
        await loadAccountData()
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      setMessage('Failed to update profile')
      setMessageType('error')
    } finally {
      setSaving(false)
    }
  }

  const clearMessage = () => {
    setMessage('')
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-24 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const userInitials = firstName && lastName 
    ? `${firstName[0]}${lastName[0]}`.toUpperCase()
    : user.email?.[0].toUpperCase() || 'U'

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="mb-4 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Profile Settings</h1>
            <p className="text-gray-600">Manage your account information and preferences</p>
          </motion.div>

          {/* Message */}
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-6 px-4 py-3 rounded-2xl flex items-center justify-between ${
                messageType === 'success'
                  ? 'bg-green-50 border border-green-200 text-green-700'
                  : 'bg-red-50 border border-red-200 text-red-700'
              }`}
            >
              <div className="flex items-center">
                {messageType === 'success' ? (
                  <Check className="w-5 h-5 mr-2" />
                ) : (
                  <X className="w-5 h-5 mr-2" />
                )}
                {message}
              </div>
              <button
                onClick={clearMessage}
                className="text-current hover:opacity-70"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Avatar Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-center">Profile Picture</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-6">
                  <div className="relative inline-block">
                    <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                      {avatarUrl ? (
                        <Image
                          src={avatarUrl}
                          alt="Profile"
                          width={128}
                          height={128}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        userInitials
                      )}
                    </div>
                    
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="absolute bottom-0 right-0 w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg transition-colors disabled:opacity-50"
                    >
                      {uploading ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Camera className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />

                  <div className="text-sm text-gray-500">
                    <p>Click the camera icon to upload a new photo</p>
                    <p className="text-xs mt-1">Max size: 5MB • JPG, PNG, GIF</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Profile Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-2"
            >
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Email (Read-only) */}
                  <div>
                    <Label htmlFor="email" className="text-sm font-semibold text-gray-700 mb-3 block">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="email"
                        type="email"
                        value={user.email || ''}
                        disabled
                        className="pl-12 h-12 bg-gray-50 text-gray-500 cursor-not-allowed"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                  </div>

                  {/* Name Fields */}
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
                          placeholder="Enter your first name"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="pl-12 h-12 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:bg-blue-50/50 transition-all duration-300"
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
                          placeholder="Enter your last name"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="pl-12 h-12 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:bg-blue-50/50 transition-all duration-300"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Phone Number */}
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
                        className="pl-12 h-12 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:bg-blue-50/50 transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Account Info */}
                  {accountData && (
                    <div className="pt-4 border-t border-gray-200">
                      <h3 className="text-sm font-semibold text-gray-700 mb-3">Account Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Account ID:</span>
                          <p className="font-mono text-xs mt-1 break-all">{accountData.id}</p>
                        </div>
                        <div>
                          <span className="font-medium">Last Updated:</span>
                          <p className="mt-1">{new Date(accountData.updated_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Save Button */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="pt-4"
                  >
                    <Button
                      onClick={handleSave}
                      disabled={saving || !firstName || !lastName}
                      className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {saving ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      ) : (
                        <Save className="w-5 h-5 mr-2" />
                      )}
                      {saving ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
