'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

interface UserProfile {
  full_name: string
  email: string
  mobile_number: string
  college_name: string
  course: string
  year_of_study: string
  gender: string | null
  avatar_url: string | null
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        
        if (!user) {
          router.push('/login')
          return
        }

        // Get user profile from database
        const { data: profile, error } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single()

        if (error) {
          console.error('Profile fetch error:', error)
          // If table doesn't exist or no profile exists, redirect to onboarding
          if (error.message.includes('relation "public.user_profiles" does not exist') ||
              error.message.includes('Could not find the table') ||
              error.code === 'PGRST116') {
            router.push('/onboarding')
            return
          }
          // For other errors, also redirect to onboarding
          router.push('/onboarding')
          return
        }

        setProfile(profile)
      } catch (error) {
        console.error('Error fetching profile:', error)
      } finally {
        setIsLoading(false)
      }
    }

    getProfile()
  }, [router, supabase])

  const handleEditProfile = () => {
    router.push('/onboarding?edit=true')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-syinq-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-syinq-blue/30 border-t-syinq-blue rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-syinq-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-syinq-gray">Profile not found</p>
          <Button onClick={() => router.push('/onboarding')} className="mt-4">
            Complete Profile
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-syinq-background pt-20 flex items-center justify-center">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-syinq-dark mb-3">Your Profile</h1>
          <p className="text-syinq-gray text-lg">Manage your account information</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Avatar and Basic Info */}
          <div className="p-6 bg-gradient-to-r from-syinq-blue/5 to-syinq-blue/10 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-syinq-blue/10 flex items-center justify-center border-4 border-white shadow-lg">
                {profile.avatar_url ? (
                  <Image 
                    src={profile.avatar_url} 
                    alt="Profile"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-3xl font-bold text-syinq-blue">
                    {profile.full_name?.charAt(0) || 'U'}
                  </span>
                )}
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-2xl font-bold text-syinq-dark mb-2">{profile.full_name}</h2>
                <p className="text-syinq-gray mb-1">{profile.email}</p>
                <p className="text-sm text-syinq-blue font-medium">{profile.course} • {profile.year_of_study}</p>
              </div>
              <Button 
                onClick={handleEditProfile}
                variant="outline"
                className="border-syinq-blue text-syinq-blue hover:bg-syinq-blue hover:text-white transition-colors"
              >
                Edit Profile
              </Button>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-6">
            <h3 className="text-lg font-semibold text-syinq-dark mb-6">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-sm font-semibold text-syinq-gray uppercase tracking-wide">Mobile Number</label>
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <p className="text-syinq-dark font-medium">
                    {profile.mobile_number || 'Not provided'}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-syinq-gray uppercase tracking-wide">College</label>
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <p className="text-syinq-dark font-medium">
                    {profile.college_name || 'Not provided'}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-syinq-gray uppercase tracking-wide">Course</label>
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <p className="text-syinq-dark font-medium">
                    {profile.course || 'Not provided'}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-syinq-gray uppercase tracking-wide">Year of Study</label>
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <p className="text-syinq-dark font-medium">
                    {profile.year_of_study || 'Not provided'}
                  </p>
                </div>
              </div>

              {profile.gender && (
                <div className="space-y-3 md:col-span-2">
                  <label className="text-sm font-semibold text-syinq-gray uppercase tracking-wide">Gender</label>
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 w-fit">
                    <p className="text-syinq-dark font-medium">
                      {profile.gender}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-center">
          <Button 
            onClick={() => router.push('/')}
            className="bg-syinq-blue hover:bg-syinq-blue/90 text-white px-8 py-3 text-lg font-medium"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  )
}
