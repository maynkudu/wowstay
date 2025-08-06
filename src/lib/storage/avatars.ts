import { supabase } from '@/lib/supabase/client'

export async function uploadAvatar(userId: string, file: File) {
    const fileExt = file.name.split('.').pop()
    const fileName = `${userId}-${Math.random()}.${fileExt}`
    const filePath = `avatars/${fileName}`

    const { data, error } = await supabase.storage
        .from('accounts')
        .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
        })

    return { data, error }
}

export async function deleteAvatar(path: string) {
    const { data, error } = await supabase.storage
        .from('accounts')
        .remove([path])

    return { data, error }
}

export function getAvatarUrl(path: string) {
    const { data } = supabase.storage
        .from('accounts')
        .getPublicUrl(path)

    return data.publicUrl
}

export async function updateUserAvatar(userId: string, avatarUrl: string) {
    const { data, error } = await supabase
        .from('accounts')
        .update({ avatar_url: avatarUrl, updated_at: new Date().toISOString() })
        .eq('id', userId)

    return { data, error }
}
