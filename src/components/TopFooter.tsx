export default function MadeByStudents() {
    return (
      <section className="relative w-full">
        <div className="flex flex-col items-center justify-center py-8 relative z-10">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <span className="text-lg">Made by students for students ❤️</span>
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