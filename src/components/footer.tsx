import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"
import { Instagram, Twitter, Mail, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-8 py-6">
        {/* Top Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <p className="text-sm whitespace-nowrap font-bold">Connecting journeys, building communities</p>
            <div className="relative w-[320px]">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent border-white/20 h-8 pt-6 pb-6 bg-white pr-10"
              />
              <Button 
                variant="outline" 
                size="icon" 
                className="border-none absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-transparent bg-black"
              >
                <span className="sr-only">Subscribe</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Button>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="mt-8">
          <div className="border border-white/10 rounded-2xl overflow-hidden">
            <div className="flex">
              {/* QR Code */}
              <div className="flex-1 justify-center p-8 border-r border-white/10">
                <div className="flex justify-center md:justify-start">
                  <div className="bg-white p-2 rounded-lg w-24 h-24">
                    <Image
                      src="/qr.png"
                      alt="QR Code"
                      width={80}
                      height={80}
                      className="w-full h-full"
                    />
                  </div>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 flex justify-center items-center p-8 border-r border-white/10">
                <div className="flex space-x-6">
                  <Link href="/how-it-works" className="text-sm hover:text-gray-300">
                    How it works
                  </Link>
                  <Link href="/about" className="text-sm hover:text-gray-300">
                    About
                  </Link>
                  <Link href="/blog" className="text-sm hover:text-gray-300">
                    Blog
                  </Link>
                  <Link href="/contact" className="text-sm hover:text-gray-300">
                    Contact
                  </Link>
                </div>
              </div>

              {/* Contact and CTA */}
              <div className="flex-1 flex flex-col items-center md:items-end justify-center p-8">
                <span className="text-sm">getyousync@gmail.com</span>
                <div className="mt-4">
                  <Button variant="outline" className="border-white/20 text-blue-500 bg-white pt-6 pb-6  font-bold rounded-full">
                    Ready to start?
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Company Info and Social Links */}
        <div className="flex flex-col md:flex-row justify-between items-center py-6">
          <div className="text-xs text-gray-400 mb-4 md:mb-0">
            CINU62090UP2024PTC209842
          </div>
          <div className="flex space-x-4">
            <Link href="#" className="text-gray-400 hover:text-white">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white">
              <Mail className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white">
              <Linkedin className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Copyright and Legal */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400 pt-6">
          <div>© 2024 RASYNC GLOBAL SOLUTIONS PRIVATE LIMITED</div>
          <div className="flex space-x-4 mt-2 sm:mt-0">
            <Link href="/terms" className="hover:text-white">
              Terms of Use
            </Link>
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

