import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { createAccount, getAccount } from '@/lib/database/accounts'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = createClient()
    const { data, error } = await (await supabase).auth.exchangeCodeForSession(code)

    if (!error && data.user) {
      // Check if this is a new user from OAuth (Google)
      if (data.user.app_metadata.provider === 'google') {
        // Check if account already exists
        const { data: existingAccount } = await getAccount(data.user.id)

        console.log(data)

        if (!existingAccount) {
          // Create account entry for OAuth user
          const fullName = data.user.user_metadata.full_name || ''
          const nameParts = fullName.split(' ')
          const firstName = nameParts[0] || ''
          const lastName = nameParts.slice(1).join(' ') || ''

          await createAccount({
            userId: data.user.id,
            firstName: firstName,
            lastName: lastName,
            avatarUrl: data.user.user_metadata.avatar_url,
          })
        }
      }

      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // Return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
