"use client";

import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import SiteWideCtaBanner from './SiteWideCtaBanner';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
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

  // Active route detection for page links
  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(href));

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
          <Button asChild className="bg-syinq-blue hover:bg-syinq-blue/90">
            <Link href={isHomePage ? "#download" : "/#download"}>Download App</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className={cn(
              "border-syinq-blue text-syinq-blue hover:bg-syinq-blue/10",
              isActive('/contact') && "bg-syinq-blue/10 font-semibold"
            )}
          >
            <Link href="/contact">Contact Us</Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-syinq-dark p-1 rounded-md"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white py-4 px-6 shadow-md"
          >
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
                Marketplace (Soon)
              </Link>
              <Link
                href={isHomePage ? "#community" : "/#community"}
                className="text-syinq-dark py-2 hover:text-syinq-blue transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Community (Soon)
              </Link>
              <Link
                href={isHomePage ? "#security" : "/#security"}
                className="text-syinq-dark py-2 hover:text-syinq-blue transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Security
              </Link>
              <Link
                href={isHomePage ? "#download" : "/#download"}
                className="bg-syinq-blue text-white py-2 px-4 rounded hover:bg-syinq-blue/90 transition-colors text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Download App
              </Link>
              <Link
                href="/contact"
                className={cn(
                  "border border-syinq-blue text-syinq-blue py-2 px-4 rounded hover:bg-syinq-blue/10 transition-colors text-center",
                  isActive('/contact') && "bg-syinq-blue/10 font-semibold"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <SiteWideCtaBanner />
    </header>
  );
};

export default Navbar;
