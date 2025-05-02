import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Book, Laptop, Coffee, ShoppingBag, Search } from 'lucide-react';
import Footer from '@/components/Footer';

const MarketplaceGIF = () => (
  <div className="mx-auto max-w-3xl mb-10">
    <img 
      src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExa2xieDlpMDNraWF0NHBoZmZnNjdudjd5OG9raTVqejBjbGY0MWg5aiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3orieM2yXrt2kK4B4Q/giphy.gif" 
      alt="Students exchanging items" 
      className="w-full rounded-xl shadow-lg"
    />
  </div>
);

const Marketplace = () => {
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
          {/* Home button */}
          <div className="mb-8">
            <Button asChild variant="outline" className="flex items-center gap-2">
              <Link to="/">
                <Home className="h-4 w-4" />
                <span>Back to Home</span>
              </Link>
            </Button>
          </div>

          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              Campus <span className="text-syinq-green">Marketplace</span>
            </h1>
            <p className="text-lg text-syinq-gray max-w-2xl mx-auto">
              Buy, sell, and exchange items with verified students on your campus.
              Find everything from textbooks to dorm essentials.
            </p>
          </div>

          <MarketplaceGIF />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-syinq-lightgray p-8 rounded-xl text-center hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-syinq-green/10 rounded-full mb-4">
                <Book className="h-8 w-8 text-syinq-green" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Textbooks</h3>
              <p className="text-syinq-gray">Find used textbooks at a fraction of the bookstore price.</p>
            </div>

            <div className="bg-syinq-lightgray p-8 rounded-xl text-center hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-syinq-green/10 rounded-full mb-4">
                <Laptop className="h-8 w-8 text-syinq-green" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Electronics</h3>
              <p className="text-syinq-gray">Calculators, laptops, accessories and more at student-friendly prices.</p>
            </div>

            <div className="bg-syinq-lightgray p-8 rounded-xl text-center hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-syinq-green/10 rounded-full mb-4">
                <Coffee className="h-8 w-8 text-syinq-green" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Dorm Essentials</h3>
              <p className="text-syinq-gray">Find furniture, decor, and appliances for your campus living space.</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-syinq-green/10 to-syinq-blue/10 p-8 md:p-12 rounded-2xl shadow-sm mb-16">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Coming Soon to Your Campus!</h3>
                <p className="text-syinq-gray mb-6 max-w-lg">
                  Be the first to know when our exclusive student marketplace launches at your university.
                </p>
                <Button asChild className="bg-syinq-green hover:bg-syinq-green/90">
                  <Link to="/waitlist">Join the Waitlist</Link>
                </Button>
              </div>
              <div className="w-full md:w-auto">
                <img 
                  src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGhxcmR2eXJ5ZW40ZDBhazV0bTRnMDVncmJqbDg5bWFpZm96OXRlYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKRwpns23NhBYc0/giphy.gif" 
                  alt="Students excited" 
                  className="w-full md:w-64 h-auto rounded-xl"
                />
              </div>
            </div>
          </div>

          <div className="text-center mb-10">
            <Button asChild size="lg" className="bg-syinq-blue hover:bg-syinq-blue/90">
              <Link to="/waitlist" className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                <span>Join Waitlist to Start Buying & Selling</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Marketplace; 