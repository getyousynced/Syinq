import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    const supabase = createClient()
    
    // Exchange the code for a session
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    if (error) {
      console.error('OAuth callback error:', error)
      return NextResponse.redirect(new URL('/login?error=callback', request.url))
    }

    // Check if user has completed onboarding
    if (data.user) {
      try {
        const { data: profile, error: profileError } = await supabase
          .from('user_profiles')
          .select('is_onboarded')
          .eq('user_id', data.user.id)
          .single()

        // If profile exists and user has completed onboarding, go to home
        if (profile && profile.is_onboarded) {
          return NextResponse.redirect(new URL('/', request.url))
        }

        // If no profile exists or user hasn't completed onboarding, redirect to onboarding
        return NextResponse.redirect(new URL('/onboarding', request.url))
        
      } catch (error) {
        // If table doesn't exist or other error, redirect to onboarding for setup
        console.log('Profile check error, redirecting to onboarding:', error)
        return NextResponse.redirect(new URL('/onboarding', request.url))
      }
    }

    // Fallback: redirect to home
    return NextResponse.redirect(new URL('/', request.url))
  }

  // No code: go back to login
  return NextResponse.redirect(new URL('/login', request.url))
}
