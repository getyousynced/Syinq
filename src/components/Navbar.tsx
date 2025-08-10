"use client";

import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { logout } from '@/app/auth/actions';
import type { User } from '@supabase/supabase-js';

const Navbar = ({ user }: { user: User | null }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-white/80 backdrop-blur-md shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo/logo.png" 
              alt="Syinq Logo" 
              className="h-10" 
              width={100}
              height={100}
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            href={isHomePage ? "#carpooling" : "/#carpooling"} 
            className="text-syinq-dark hover:text-syinq-blue transition-colors"
          >
            Carpooling
          </Link>
          <Link 
            href={isHomePage ? "#marketplace" : "/#marketplace"} 
            className="text-syinq-dark hover:text-syinq-blue transition-colors"
          >
            Marketplace
          </Link>
          <Link 
            href={isHomePage ? "#community" : "/#community"} 
            className="text-syinq-dark hover:text-syinq-blue transition-colors"
          >
            Community
          </Link>
          <Link 
            href={isHomePage ? "#security" : "/#security"} 
            className="text-syinq-dark hover:text-syinq-blue transition-colors"
          >
            Security
          </Link>

          {user ? (
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                {user.user_metadata?.avatar_url && (
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-syinq-blue/20">
                    <Image 
                      src={user.user_metadata.avatar_url} 
                      alt="Profile" 
                      width={32} 
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <span className="text-sm font-medium text-syinq-dark hidden lg:block">
                  {user.user_metadata?.given_name || 'User'}
                </span>
              </div>
              <Button asChild variant="outline" className="border-syinq-blue text-syinq-blue hover:bg-syinq-blue/10 text-xs px-3 py-1">
                <Link href="/profile">Profile</Link>
              </Button>
              <form action={logout}>
                <Button type="submit" variant="outline" className="border-red-500 text-red-500 hover:bg-red-50 text-xs px-3 py-1">
                  Logout
                </Button>
              </form>
            </div>
          ) : (
            <Button asChild className="bg-syinq-blue hover:bg-syinq-blue/90">
              <Link href="/login">Sign In</Link>
            </Button>
          )}

          <Button asChild className="bg-syinq-blue hover:bg-syinq-blue/90">
            <Link href="/waitlist">Join Waitlist</Link>
          </Button>
          <Button asChild variant="outline" className="border-syinq-blue text-syinq-blue hover:bg-syinq-blue/10">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-syinq-dark"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-6 shadow-md">
          <nav className="flex flex-col space-y-4">
            <Link 
              href={isHomePage ? "#carpooling" : "/#carpooling"}
              className="text-syinq-dark py-2 hover:text-syinq-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Carpooling
            </Link>
            <Link 
              href={isHomePage ? "#marketplace" : "/#marketplace"}
              className="text-syinq-dark py-2 hover:text-syinq-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Marketplace
            </Link>
            <Link 
              href={isHomePage ? "#community" : "/#community"}
              className="text-syinq-dark py-2 hover:text-syinq-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Community
            </Link>
            <Link 
              href={isHomePage ? "#security" : "/#security"}
              className="text-syinq-dark py-2 hover:text-syinq-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Security
            </Link>

            {user ? (
              <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-3 pb-2 border-b border-gray-200">
                  {user.user_metadata?.avatar_url && (
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-syinq-blue/20">
                      <Image 
                        src={user.user_metadata.avatar_url} 
                        alt="Profile" 
                        width={40} 
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-syinq-dark">
                      {user.user_metadata?.full_name || 'User'}
                    </p>
                    <p className="text-xs text-syinq-gray">{user.email}</p>
                  </div>
                </div>
                <Link 
                  href="/profile"
                  className="bg-syinq-blue text-white py-3 px-4 rounded-xl hover:bg-syinq-blue/90 transition-colors text-center block font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  View Profile
                </Link>
                <form action={logout}>
                  <button
                    type="submit"
                    className="bg-red-500 text-white py-3 px-4 rounded-xl hover:bg-red-600 transition-colors text-center w-full font-medium"
                  >
                    Sign Out
                  </button>
                </form>
              </div>
            ) : (
              <Link 
                href="/login"
                className="bg-syinq-blue text-white py-3 px-4 rounded-xl hover:bg-syinq-blue/90 transition-colors text-center font-medium block"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            )}

            <Link 
              href="/waitlist"
              className="bg-syinq-blue text-white py-2 px-4 rounded hover:bg-syinq-blue/90 transition-colors text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Join Waitlist
            </Link>
            <Link 
              href="/contact"
              className="border border-syinq-blue text-syinq-blue py-2 px-4 rounded hover:bg-syinq-blue/10 transition-colors text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Us
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
