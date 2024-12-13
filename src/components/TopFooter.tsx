export default function MadeByStudents() {
    return (
      <section className="relative w-full">
        <div className="flex flex-col items-center justify-center py-8 relative z-10">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <span className="text-lg">Made by students for students</span>
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
            <p className="text-gray-400 mt-2">Developed in India in 2024</p>
          </div>
        </div>
  
        {/* Desktop View */}
        <div className="absolute bottom-0 left-0 right-0 w-full h-[200px] hidden lg:block">
          <svg
            className="w-full h-full"
            viewBox="0 0 1440 200"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 200H1440V198C1440 198 1435.62 125.5 715.238 174C352.381 204 0 0.5 0 0.5V200Z"
              fill="url(#paint0_radial_desktop)"
            />
            <defs>
              <radialGradient
                id="paint0_radial_desktop"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(720 100) rotate(180) scale(720 100)"
              >
                <stop stopColor="#222324" />
                <stop offset="1" stopColor="#2284C6" />
              </radialGradient>
            </defs>
          </svg>
        </div>
  
        {/* Mobile View */}
        <div className="absolute bottom-0 left-0 right-0 w-full h-[70px] block lg:hidden">
          <svg
            className="w-full h-full"
            viewBox="0 0 1440 100"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 100H1440V98C1440 98 1435.62 62.75 715.238 87C352.381 102 0 0.25 0 0.25V100Z"
              fill="url(#paint0_radial_mobile)"
            />
            <defs>
              <radialGradient
                id="paint0_radial_mobile"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(720 50) rotate(180) scale(720 50)"
              >
                <stop stopColor="#222324" />
                <stop offset="1" stopColor="#2284C6" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </section>
    );
  }