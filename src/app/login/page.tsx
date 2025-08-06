import LoginForm from '@/components/auth/login-page'
import { Suspense } from 'react'

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading login form...</div>}>
      <LoginForm />
    </Suspense>
  )
}
