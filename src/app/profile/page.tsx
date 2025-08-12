'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';

interface UserProfile {
  userName: string;
  email: string;
  role: string;
  phoneNumber: string;
  profileImage: string;
  googleId: string;
}   

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;

    // If user not logged in → redirect to login
    if (status === 'unauthenticated' || !session?.user) {
      router.push('/login');
      return;
    }

    // For now — generate dummy data
    const dummyProfile: UserProfile = {
      userName: session.user.name || 'John Doe',
      email: session.user.email || 'johndoe@example.com',
      phoneNumber: '9876543210',
      role: 'Student',
      profileImage:
        session.user.image ||
        'https://api.dicebear.com/7.x/initials/svg?seed=JD&backgroundColor=blue',
      googleId: session.user.id || '1234567890',
    };

    setProfile(dummyProfile);
  }, [status, session, router]);

  if (status === 'loading' || !profile) {
    return (
      <div className="min-h-screen bg-syinq-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-syinq-blue/30 border-t-syinq-blue rounded-full animate-spin"></div>
      </div>
    );
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
          {/* Avatar */}
          <div className="p-6 bg-gradient-to-r from-syinq-blue/5 to-syinq-blue/10 border-b border-gray-100 flex flex-col sm:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-syinq-blue/10 flex items-center justify-center border-4 border-white shadow-lg">
              {profile.profileImage ? (
                <Image
                  src={profile.profileImage}
                  alt="Profile"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-3xl font-bold text-syinq-blue">
                  {profile.userName.charAt(0)}
                </span>
              )}
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl font-bold text-syinq-dark mb-2">
                {profile.userName}
              </h2>
              <p className="text-syinq-gray mb-1">{profile.email}</p>
              <p className="text-sm text-syinq-blue font-medium">
                {profile.role} • {profile.phoneNumber}
              </p>
            </div>
            <Button
              onClick={() => router.push('/onboarding?edit=true')}
              variant="outline"
              className="border-syinq-blue text-syinq-blue hover:bg-syinq-blue hover:text-white"
            >
              Edit Profile
            </Button>
          </div>

          {/* Profile Details */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Detail label="Mobile Number" value={profile.phoneNumber} />
            <Detail label="College" value={profile.role} />
            <Detail label="Course" value={profile.profileImage} />
            <Detail label="Year of Study" value={profile.googleId} />
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
  );
}

function Detail({
  label,
  value,
  fullWidth,
}: {
  label: string;
  value: string;
  fullWidth?: boolean;
}) {
  return (
    <div className={`${fullWidth ? 'md:col-span-2' : ''} space-y-2`}>
      <label className="text-sm font-semibold text-syinq-gray uppercase">
        {label}
      </label>
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
        <p className="text-syinq-dark font-medium">{value || 'Not provided'}</p>
      </div>
    </div>
  );
}
