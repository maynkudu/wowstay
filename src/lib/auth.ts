import { supabase } from "./supabase"
import type { User } from "@supabase/supabase-js"

export interface Profile {
    id: string
    email: string
    full_name: string | null
    avatar_url: string | null
    role: "user" | "moderator" | "admin"
    phone: string | null
    date_of_birth: string | null
    created_at: string
    updated_at: string
}

export async function signUp(email: string, password: string, fullName: string) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: fullName,
            },
        },
    })
    return { data, error }
}

export async function signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })
    return { data, error }
}

export async function signOut() {
    const { error } = await supabase.auth.signOut()
    return { error }
}

export async function getCurrentUser(): Promise<User | null> {
    const {
        data: { user },
    } = await supabase.auth.getUser()
    return user
}

export async function getUserProfile(userId: string): Promise<Profile | null> {
    const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

    if (error) {
        console.error("Error fetching profile:", error)
        return null
    }

    return data
}

export async function updateProfile(userId: string, updates: Partial<Profile>) {
    const { data, error } = await supabase.from("profiles").update(updates).eq("id", userId).select().single()

    return { data, error }
}

export function hasRole(profile: Profile | null, requiredRole: "user" | "moderator" | "admin"): boolean {
    if (!profile) return false

    const roleHierarchy = { user: 0, moderator: 1, admin: 2 }
    return roleHierarchy[profile.role] >= roleHierarchy[requiredRole]
}
