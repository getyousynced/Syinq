
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/f46e85cb-2621-4539-948c-7fa0b22b88f7.png" 
              alt="Syinq Logo" 
              className="h-10" 
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#carpooling" className="text-syinq-dark hover:text-syinq-blue transition-colors">Carpooling</a>
          <a href="#marketplace" className="text-syinq-dark hover:text-syinq-blue transition-colors">Marketplace</a>
          <a href="#community" className="text-syinq-dark hover:text-syinq-blue transition-colors">Community</a>
          <a href="#security" className="text-syinq-dark hover:text-syinq-blue transition-colors">Security</a>
          <Button asChild className="bg-syinq-blue hover:bg-syinq-blue/90">
            <Link to="/waitlist">Join Waitlist</Link>
          </Button>
          <Button asChild variant="outline" className="border-syinq-blue text-syinq-blue hover:bg-syinq-blue/10">
            <Link to="/contact">Contact Us</Link>
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
            <a 
              href="#carpooling" 
              className="text-syinq-dark py-2 hover:text-syinq-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Carpooling
            </a>
            <a 
              href="#marketplace" 
              className="text-syinq-dark py-2 hover:text-syinq-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Marketplace
            </a>
            <a 
              href="#community" 
              className="text-syinq-dark py-2 hover:text-syinq-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Community
            </a>
            <a 
              href="#security" 
              className="text-syinq-dark py-2 hover:text-syinq-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Security
            </a>
            <Link 
              to="/waitlist"
              className="bg-syinq-blue text-white py-2 px-4 rounded hover:bg-syinq-blue/90 transition-colors text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Join Waitlist
            </Link>
            <Link 
              to="/contact"
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
