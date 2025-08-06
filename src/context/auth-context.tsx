"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { User, Session, AuthError } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase/client'
import { createAccount, getAccount } from '@/lib/database/accounts'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>
  signUp: (email: string, password: string, accountData: {
    firstName: string
    lastName: string
    phone?: string
  }) => Promise<{ error: AuthError | null }>
  signOut: () => Promise<void>
  signInWithGoogle: () => Promise<{ error: AuthError | null }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)

      // Handle new user signup - create account entry
      if (session?.user) {
        // The account data will be stored in user metadata during signup
        const metadata = session.user.user_metadata
        if (metadata.firstName && metadata.lastName) {
          await createAccount({
            userId: session.user.id,
            firstName: metadata.firstName,
            lastName: metadata.lastName,
            phone: metadata.phone || undefined,
          })
        }
      }

      // Handle OAuth sign in - create account if doesn't exist
      if (event === 'SIGNED_IN' && session?.user && session.user.app_metadata.provider === 'google') {
        const { data: existingAccount } = await getAccount(session.user.id)

        if (!existingAccount) {
          const fullName = session.user.user_metadata.full_name || ''
          const nameParts = fullName.split(' ')
          const firstName = nameParts[0] || ''
          const lastName = nameParts.slice(1).join(' ') || ''

          await createAccount({
            userId: session.user.id,
            firstName: firstName,
            lastName: lastName,
            avatarUrl: session.user.user_metadata.avatar_url,
          })
        }
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { error }
  }

  const signUp = async (email: string, password: string, accountData: {
    firstName: string
    lastName: string
    phone?: string
  }) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          firstName: accountData.firstName,
          lastName: accountData.lastName,
          phone: accountData.phone,
          full_name: `${accountData.firstName} ${accountData.lastName}`,
        },
      },
    })
    return { error }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    return { error }
  }

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
