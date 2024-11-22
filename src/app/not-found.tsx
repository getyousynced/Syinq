import Link from 'next/link'
import { Construction } from 'lucide-react'

import { Button } from './components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4 text-center">
      <Construction className="mb-4 h-16 w-16 text-yellow-500" aria-hidden="true" />
      <h1 className="mb-2 text-4xl font-bold text-gray-900">Website Under Construction</h1>
      <p className="mb-8 text-xl text-gray-600">We&apos;re working hard to bring you something amazing. Please check back soon!</p>
      <Button asChild>
        <Link href="/">
          Return to Homepage
        </Link>
      </Button>
    </div>
  )
}

