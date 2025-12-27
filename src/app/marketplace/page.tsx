"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Book, Laptop, Coffee, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/appLinks";

const MarketplaceGIF = () => (
  <div className="mx-auto max-w-3xl mb-10">
    <Image
      src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExa2xieDlpMDNraWF0NHBoZmZnNjdudjd5OG9raTVqejBjbGY0MWg5aiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3orieM2yXrt2kK4B4Q/giphy.gif"
      alt="Students exchanging items"
      className="w-full rounded-xl shadow-lg"
      width={100}
      height={100}
    />
  </div>
);

const CampusMarket = () => {
  useEffect(() => {
    // Update document title
    document.title = "Marketplace - Syinq";

    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="pt-24 flex-grow">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              Campus <span className="text-syinq-green">Marketplace</span>
            </h1>
            <p className="text-lg text-syinq-gray max-w-2xl mx-auto">
              Buy, sell, and exchange items with verified students on your
              campus. Find everything from textbooks to dorm essentials.
            </p>
          </div>

          <MarketplaceGIF />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-syinq-lightgray p-8 rounded-xl text-center hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-syinq-green/10 rounded-full mb-4">
                <Book className="h-8 w-8 text-syinq-green" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Textbooks</h3>
              <p className="text-syinq-gray">
                Find used textbooks at a fraction of the bookstore price.
              </p>
            </div>

            <div className="bg-syinq-lightgray p-8 rounded-xl text-center hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-syinq-green/10 rounded-full mb-4">
                <Laptop className="h-8 w-8 text-syinq-green" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Electronics</h3>
              <p className="text-syinq-gray">
                Calculators, laptops, accessories and more at student-friendly
                prices.
              </p>
            </div>

            <div className="bg-syinq-lightgray p-8 rounded-xl text-center hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-syinq-green/10 rounded-full mb-4">
                <Coffee className="h-8 w-8 text-syinq-green" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Dorm Essentials</h3>
              <p className="text-syinq-gray">
                Find furniture, decor, and appliances for your campus living
                space.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-syinq-green/10 to-syinq-blue/10 p-8 md:p-12 rounded-2xl shadow-sm mb-16">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">
                  Coming Soon to Your Campus!
                </h3>
                <p className="text-syinq-gray mb-6 max-w-lg">
                  The Marketplace feature will be available very soon. Download Syinq today and you’ll see it unlock as we roll it out.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button asChild className="bg-syinq-blue hover:bg-syinq-blue/90">
                    <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">
                      Download on App Store
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="border-syinq-blue text-syinq-blue hover:bg-syinq-blue/10">
                    <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer">
                      Get it on Play Store
                    </a>
                  </Button>
                </div>
              </div>
              <div className="w-full md:w-auto">
                <Image
                  src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGhxcmR2eXJ5ZW40ZDBhazV0bTRnMDVncmJqbDg5bWFpZm96OXRlYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKRwpns23NhBYc0/giphy.gif"
                  alt="Students excited"
                  className="w-full md:w-64 h-auto rounded-xl"
                  height={100}
                  width={100}
                />
              </div>
            </div>
          </div>

          <div className="text-center mb-10">
            <Button size="lg" className="bg-syinq-lightgray text-syinq-gray hover:bg-syinq-lightgray" disabled>
              <span className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                <span>Marketplace (Coming soon)</span>
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampusMarket;
