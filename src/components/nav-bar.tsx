import Link from "next/link";
import Image from "next/image";

export function NavBar() {
  return (
    <header
      className="absolute top-0 left-0 right-0 z-50 w-full max-w-[1920px] h-[160px] mx-auto 
      bg-[url('/navbar-bg.png')] bg-no-repeat bg-center bg-[length:100%_160px]"
    >
      <nav className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center -ml-[60px]"> {/* Adjusted margin */}
          <Image
            src="/White Logo.png"
            alt="Logo"
            width={120}
            height={120}
            priority
            className="h-auto w-[120px] object-contain -ml-10"
          />
        </Link>
        <div className="flex mr-12 gap-16 border border-white border-opacity-50 rounded-full px-4 py-2 flex-shrink-0">
          <Link
            href="/how-it-works"
            className="flex-shrink-0 text-white hover:text-white/80 transition-colors font-medium"
          >
            How it works
          </Link>
          <Link
            href="/about"
            className="flex-shrink-0 text-white hover:text-white/80 transition-colors font-medium"
          >
            About
          </Link>
          <Link
            href="/blog"
            className="flex-shrink-0 text-white hover:text-white/80 transition-colors font-medium"
          >
            Blog
          </Link>
          <Link
            href="/contact"
            className="flex-shrink-0 text-white hover:text-white/80 transition-colors font-medium"
          >
            Contact us
          </Link>
        </div>
      </nav>
    </header>
  );
}
