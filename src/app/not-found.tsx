"use client";

import React from 'react';
import Link from 'next/link';
import { Home, ArrowLeft, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-[98vh] bg-gradient-to-b from-blue-50/50 to-transparent flex items-center justify-center">
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        {/* 404 Vector Illustration */}
        <div className="mb-8 relative">
          <div className="flex items-center justify-center">
            {/* Main 404 Text */}
            <div className="relative">
              <div className="text-[120px] md:text-[200px] font-bold text-syinq-blue/10">404</div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-5xl md:text-7xl font-bold text-syinq-blue">404</div>
              </div>
              
              {/* Vector Icons */}
              <div className="absolute -top-8 -right-8 bg-syinq-blue/10 p-3 rounded-full">
                <MapPin className="h-8 w-8 text-syinq-blue animate-bounce" />
              </div>
              
              <div className="absolute top-1/2 -left-12 transform -translate-y-1/2 hidden md:block">
                <div className="w-24 h-24 rounded-full bg-syinq-green/10 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-syinq-green/20 flex items-center justify-center animate-pulse">
                    <div className="w-5 h-5 rounded-full bg-syinq-green"></div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-10 left-1/4 hidden md:block">
                <div className="w-16 h-16 rounded-full bg-syinq-blue/10 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-syinq-blue/15 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-syinq-blue"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Road Map Vector */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center">
            <div className="h-2 bg-syinq-blue/20 w-1/2 rounded-full relative">
              <div className="absolute -top-3 left-0 w-8 h-8 rounded-full border-4 border-white bg-syinq-blue flex items-center justify-center text-white">
                <span className="text-xs">A</span>
              </div>
              <div className="absolute -top-3 right-0 w-8 h-8 rounded-full border-4 border-white bg-syinq-blue flex items-center justify-center text-white">
                <span className="text-xs">B</span>
              </div>
            </div>
          </div>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-syinq-dark">
          Oops! You've Gone <span className="text-syinq-blue">Off-Campus</span>
        </h1>
        
        <p className="text-lg text-syinq-gray mb-8 max-w-lg mx-auto">
          The page you're looking for seems to be on a different campus. Let's get you back to familiar grounds.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <Button asChild size="lg" className="bg-syinq-blue hover:bg-syinq-blue/90 w-full md:w-auto">
            <Link href="/">
              <Home className="h-5 w-5 mr-2" />
              Return to Homepage
            </Link>
          </Button>
          
          <Button variant="outline" asChild size="lg" className="w-full md:w-auto">
            <Link href="/forum">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Explore Campus Forum
            </Link>
          </Button>
        </div>
        
        <div className="mt-10 pt-6 border-t border-gray-200">
          <p className="text-syinq-gray">
            Need help? <Link href="/contact" className="text-syinq-blue hover:underline">Contact our support team</Link>
          </p>
        </div>
      </div>
    </div>
  );
}