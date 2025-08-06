import { supabase } from '@/lib/supabase/client'
import { createClient } from '@/lib/supabase/server'

export interface AccountData {
    id: string
    first_name: string
    last_name: string
    phone?: string
    avatar_url?: string
    updated_at: string
}

export async function createAccount(userData: {
    userId: string
    firstName: string
    lastName: string
    phone?: string
    avatarUrl?: string
}) {
    const { data, error } = await supabase
        .from('accounts')
        .insert({
            id: userData.userId,
            first_name: userData.firstName,
            last_name: userData.lastName,
            phone: userData.phone || null,
            avatar_url: userData.avatarUrl || null,
            updated_at: new Date().toISOString(),
        })
        .select()
        .single()

    return { data, error }
}

export async function getAccount(userId: string) {
    const { data, error } = await supabase
        .from('accounts')
        .select('*')
        .eq('id', userId)
        .single()

    return { data, error }
}

export async function updateAccount(userId: string, updates: Partial<AccountData>) {
    const { data, error } = await supabase
        .from('accounts')
        .update({
            ...updates,
            updated_at: new Date().toISOString(),
        })
        .eq('id', userId)
        .select()
        .single()

    return { data, error }
}
