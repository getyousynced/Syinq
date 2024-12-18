import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { CiMail } from "react-icons/ci";
import { FaLinkedin } from "react-icons/fa";
import Image from "next/image";

export default function Footer() {
    return (
      <footer className="bg-black text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* Newsletter Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-12">
            <h3 className="text-lg font-medium">
              Connecting journeys, building communities
            </h3>
            <div className="relative w-full md:w-auto max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full md:w-80 px-4 py-2 rounded-lg text-black pr-12"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="text-black"
                >
                  <path
                    d="M5 12h14M12 5l7 7-7 7"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
  
          {/* Main Footer Content */}
          <div className="border border-gray-800 rounded-2xl p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* QR Code */}
              <div className="flex justify-center md:justify-start">
                <div className="bg-white p-4 rounded-xl w-36 h-32">
                <Image src="/assets/qr.svg" alt="qr" width={156} height={156}/>
                </div>
              </div>
              

              {/* <div className="w-px h-32 bg-gray-600 mx-auto my-4"></div> */}

              {/* Navigation */}
              <div className="flex justify-center items-center">
                <nav className="flex gap-8">
                  <a href="#" className="hover:text-gray-300">How it works</a>
                  <a href="#" className="hover:text-gray-300">About</a>
                  <a href="#" className="hover:text-gray-300">Blog</a>
                  <a href="/contact" className="hover:text-gray-300">Contact</a>
                </nav>
              </div>
  
              {/* Contact */}
              <div className="flex justify-center items-center md:justify-end">
                <span>getyousync@gmail.com</span>
              </div>
            </div>
  
            {/* Bottom Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 pt-8 border-t border-gray-600">
              <div className="flex justify-center md:justify-start">
                <span className="text-sm text-gray-400">CINU62090UP2024PTC209842</span>
              </div>
  
              {/* Social Links */}
              <div className="flex justify-center gap-4">
                <a href="https://www.instagram.com/sync.india_/" target="_blank" className="w-10 h-10 bg-gray-900 rounded-full hover:bg-gray-800 flex items-center justify-center">
                    <FaInstagram className="w-5 h-5" />
                </a>
                <a href="https://x.com/getyou_synced" target="_blank" className="w-10 h-10 bg-gray-900 rounded-full hover:bg-gray-800 flex items-center justify-center">
                    <FaXTwitter className="w-5 h-5" />
                </a>
                <a href="mailto:getyousync@gmail.com" target="_blank" className="w-10 h-10 bg-gray-900 rounded-full hover:bg-gray-800 flex items-center justify-center">
                    <CiMail className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/company/rasync/" target="_blank" className="w-10 h-10 bg-gray-900 rounded-full hover:bg-gray-800 flex items-center justify-center">
                    <FaLinkedin className="w-5 h-5" />
                </a>
              </div>

              {/* Ready to Start Button */}
              <div className="flex justify-center md:justify-end">
                <button className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-100 transition-colors">
                  Ready to start?
                </button>
              </div>
            </div>
          </div>
  
          {/* Copyright Section */}
          <div className="text-center text-sm text-gray-400">
            <p>© 2024 RASYNC GLOBAL SOLUTIONS PRIVATE LIMITED</p>
            <div className="mt-2 space-x-4">
              <a href="#" className="hover:text-gray-300">Terms of Use</a>
              <a href="#" className="hover:text-gray-300">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>
    )
  }
  
  