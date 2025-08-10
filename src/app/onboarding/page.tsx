'use client'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'

interface OnboardingData {
  fullName: string
  email: string
  mobileNumber: string
  collegeName: string
  course: string
  yearOfStudy: string
  gender: string
}

const courses = [
  'B.Tech', 'BBA', 'MBA', 'B.Com', 'M.Com', 'B.Sc', 'M.Sc', 
  'BCA', 'MCA', 'B.A', 'M.A', 'LLB', 'LLM', 'MBBS', 'Other'
]

const yearsOfStudy = [
  '1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year', 'Alumni'
]

const colleges = [
  'Indian Institute of Technology (IIT)',
  'Indian Institute of Management (IIM)',
  'National Institute of Technology (NIT)',
  'Delhi University', 
  'Mumbai University',
  'Pune University',
  'Bangalore University',
  'Anna University',
  'Jadavpur University',
  'Jawaharlal Nehru University',
  'Bennett University',
  'Other'
]

export default function OnboardingPage() {
  const [userData, setUserData] = useState<OnboardingData>({
    fullName: '',
    email: '',
    mobileNumber: '',
    collegeName: '',
    course: '',
    yearOfStudy: '',
    gender: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [customCollege, setCustomCollege] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const isEditMode = searchParams.get('edit') === 'true'
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          router.push('/login')
          return
        }
        
        // Check if user already has a completed profile (only if not in edit mode)
        if (!isEditMode) {
          try {
            const { data: existingProfile, error: profileError } = await supabase
              .from('user_profiles')
              .select('is_onboarded')
              .eq('user_id', user.id)
              .single()

            if (existingProfile && existingProfile.is_onboarded) {
              // User already completed onboarding, redirect to home
              router.push('/')
              return
            }
          } catch (error) {
            // Profile doesn't exist or table doesn't exist, continue with onboarding
          }
        }

        setUser(user)
        
        // If in edit mode, load existing profile data
        if (isEditMode) {
          try {
            const { data: existingProfile, error: profileError } = await supabase
              .from('user_profiles')
              .select('*')
              .eq('user_id', user.id)
              .single()

            if (existingProfile) {
              const existingCollegeName = existingProfile.college_name || '';
              const isCustomCollege = existingCollegeName && !colleges.includes(existingCollegeName);
              
              setUserData({
                fullName: existingProfile.full_name || '',
                email: existingProfile.email || '',
                mobileNumber: existingProfile.mobile_number || '',
                collegeName: isCustomCollege ? 'Other' : existingCollegeName,
                course: existingProfile.course || '',
                yearOfStudy: existingProfile.year_of_study || '',
                gender: existingProfile.gender || ''
              })
              
              // Set custom college name if it's not in the predefined list
              if (isCustomCollege) {
                setCustomCollege(existingCollegeName);
              }
            }
          } catch (error) {
            console.error('Error loading existing profile:', error)
          }
        } else {
          // Pre-fill data from Google OAuth for new users
          setUserData(prev => ({
            ...prev,
            fullName: user.user_metadata?.full_name || '',
            email: user.email || ''
          }))
        }
      } catch (error) {
        console.error('User fetch error:', error)
        router.push('/login')
      }
    }
    getUser()
  }, [router, supabase.auth, isEditMode])

  const isFormValid = () => {
    const collegeNameValid = userData.collegeName === 'Other' 
      ? customCollege.trim() !== ''
      : userData.collegeName !== '';
    
    return userData.mobileNumber && collegeNameValid && userData.course && userData.yearOfStudy
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid()) return

    try {
      setIsLoading(true)
      setError(null)

      // Check if table exists and create profile
      const collegeNameToSave = userData.collegeName === 'Other' ? customCollege : userData.collegeName;
      
      const { data, error: profileError } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: user.id,
          full_name: userData.fullName,
          email: userData.email,
          mobile_number: userData.mobileNumber,
          college_name: collegeNameToSave,
          course: userData.course,
          year_of_study: userData.yearOfStudy,
          gender: userData.gender || null,
          avatar_url: user.user_metadata?.avatar_url || null,
          is_onboarded: true,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        })
        .select()

      if (profileError) {
        // If table doesn't exist, show helpful error message
        if (profileError.message.includes('relation "public.user_profiles" does not exist') || 
            profileError.message.includes('Could not find the table')) {
          setError('Database setup required. Please run the SQL schema in your Supabase dashboard first.')
          return
        }
        throw profileError
      }

      // Redirect to home page
      router.push('/')
    } catch (err: any) {
      setError(err.message || 'An error occurred while saving your profile')
      console.error('Onboarding error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-syinq-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-syinq-blue/30 border-t-syinq-blue rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-syinq-background pt-20">
      {/* Main Content */}
      <div className="max-w-lg mx-auto px-4 sm:px-6 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Image 
              src="/assets/Logo.svg" 
              alt="SYINQ Logo" 
              width={40} 
              height={40}
              className="w-10 h-10"
            />
            <span className="text-2xl font-bold text-syinq-dark">SYINQ</span>
          </div>
          
          {user.user_metadata?.avatar_url && (
            <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-syinq-blue/20 mx-auto mb-4">
              <Image 
                src={user.user_metadata.avatar_url} 
                alt="Profile" 
                width={64} 
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
                    <h1 className="text-2xl font-bold text-syinq-dark mb-2">
            {isEditMode ? 'Edit Your Profile' : `Welcome, ${user.user_metadata?.given_name || 'Student'}! 👋`}
          </h1>
          <p className="text-syinq-gray mb-6">
            {isEditMode ? 'Update your information below' : "Let's set up your profile to get started"}
          </p>
          
          {/* Progress Indicator */}
          <div className="inline-block bg-syinq-blue/10 px-4 py-2 rounded-full">
            <span className="text-sm font-medium text-syinq-blue">Step 2 of 2</span>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 text-red-600 bg-red-50 rounded-xl text-sm border border-red-200 mb-6">
            {error}
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-syinq-dark font-medium">Full Name</Label>
              <Input
                id="fullName"
                value={userData.fullName}
                disabled
                className="bg-gray-50 border-gray-200 rounded-xl h-12"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-syinq-dark font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                value={userData.email}
                disabled
                className="bg-gray-50 border-gray-200 rounded-xl h-12"
              />
            </div>

            {/* Mobile Number */}
            <div className="space-y-2">
              <Label htmlFor="mobileNumber" className="text-syinq-dark font-medium">
                Mobile Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="mobileNumber"
                type="tel"
                value={userData.mobileNumber}
                onChange={(e) => setUserData(prev => ({...prev, mobileNumber: e.target.value}))}
                placeholder="Enter your mobile number"
                className="border-gray-200 rounded-xl h-12 focus:border-syinq-blue focus:ring-syinq-blue/20"
                required
              />
            </div>

            {/* College Name */}
            <div className="space-y-2">
              <Label htmlFor="collegeName" className="text-syinq-dark font-medium">
                College Name <span className="text-red-500">*</span>
              </Label>
              <select
                id="collegeName"
                value={userData.collegeName}
                onChange={(e) => {
                  const value = e.target.value;
                  setUserData(prev => ({...prev, collegeName: value}));
                  if (value !== 'Other') {
                    setCustomCollege('');
                  }
                }}
                className="w-full border border-gray-200 rounded-xl h-12 px-3 focus:border-syinq-blue focus:ring-2 focus:ring-syinq-blue/20 focus:outline-none"
                required
              >
                <option value="">Select your college</option>
                {colleges.map(college => (
                  <option key={college} value={college}>{college}</option>
                ))}
              </select>
              
              {/* Custom College Input for "Other" */}
              {userData.collegeName === 'Other' && (
                <div className="mt-2">
                  <Input
                    type="text"
                    placeholder="Enter your college name"
                    value={customCollege}
                    onChange={(e) => setCustomCollege(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl h-12 px-3 focus:border-syinq-blue focus:ring-2 focus:ring-syinq-blue/20 focus:outline-none"
                    required
                  />
                </div>
              )}
            </div>

            {/* Course */}
            <div className="space-y-2">
              <Label htmlFor="course" className="text-syinq-dark font-medium">
                Course <span className="text-red-500">*</span>
              </Label>
              <select
                id="course"
                value={userData.course}
                onChange={(e) => setUserData(prev => ({...prev, course: e.target.value}))}
                className="w-full border border-gray-200 rounded-xl h-12 px-3 focus:border-syinq-blue focus:ring-2 focus:ring-syinq-blue/20 focus:outline-none"
                required
              >
                <option value="">Select your course</option>
                {courses.map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
            </div>

            {/* Year of Study */}
            <div className="space-y-2">
              <Label htmlFor="yearOfStudy" className="text-syinq-dark font-medium">
                Year of Study <span className="text-red-500">*</span>
              </Label>
              <select
                id="yearOfStudy"
                value={userData.yearOfStudy}
                onChange={(e) => setUserData(prev => ({...prev, yearOfStudy: e.target.value}))}
                className="w-full border border-gray-200 rounded-xl h-12 px-3 focus:border-syinq-blue focus:ring-2 focus:ring-syinq-blue/20 focus:outline-none"
                required
              >
                <option value="">Select your year</option>
                {yearsOfStudy.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <Label className="text-syinq-dark font-medium">Gender (Optional)</Label>
              <div className="flex gap-4">
                {['Male', 'Female', 'Other'].map(option => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value={option}
                      checked={userData.gender === option}
                      onChange={(e) => setUserData(prev => ({...prev, gender: e.target.value}))}
                      className="w-4 h-4 text-syinq-blue border-gray-300 focus:ring-syinq-blue"
                    />
                    <span className="text-syinq-gray text-sm">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                disabled={!isFormValid() || isLoading}
                className="w-full h-12 bg-syinq-blue hover:bg-syinq-blue/90 text-white rounded-xl font-medium disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    {isEditMode ? 'Updating Profile...' : 'Completing Profile...'}
                  </div>
                ) : (
                  isEditMode ? 'Update Profile ➜' : 'Complete Profile ➜'
                )}
              </Button>
            </div>
          </form>
        </div>

        {/* Privacy Note */}
        <div className="mt-6">
          <p className="text-xs text-syinq-gray text-center leading-relaxed">
            Your information is safe with us and only used to improve your experience.
          </p>
        </div>
      </div>
    </div>
  )
}
