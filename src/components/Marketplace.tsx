import React from 'react';
import { Book, Headphones, MessageSquare, Ban } from 'lucide-react';
import { Link } from 'react-router-dom';

const Marketplace = () => {
  return <section id="marketplace" className="py-20 bg-syinq-lightgray relative overflow-hidden">
      <div className="absolute -left-20 top-1/3 w-80 h-80 bg-syinq-green/5 rounded-full blur-3xl"></div>
      
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Marketplace – Buy. Sell. Rent.
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-syinq-blue to-syinq-green">
              Campus Style.
            </span>
          </h2>
          <p className="text-lg text-syinq-gray">
            A safe, student-exclusive marketplace for textbooks, electronics, dorm essentials and more.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative reveal-on-scroll">
            <div className="relative grid grid-cols-2 gap-4">
              <Link to="/marketplace" className="apple-card transform translate-y-12 hover:translate-y-10 transition-transform">
                <div className="w-full aspect-square bg-white rounded-lg shadow-sm mb-4 overflow-hidden flex items-center justify-center">
                  <Book className="h-12 w-12 text-syinq-blue" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold mb-1">Scientific Calculator</h3>
                  <p className="text-sm text-syinq-gray mb-2">Like new condition</p>
                  <p className="font-medium text-syinq-blue">₹450</p>
                </div>
              </Link>
              
              <Link to="/marketplace" className="apple-card hover:translate-y-2 transition-transform">
                <div className="w-full aspect-square bg-white rounded-lg shadow-sm mb-4 overflow-hidden flex items-center justify-center">
                  <Headphones className="h-12 w-12 text-syinq-green" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold mb-1">Noise Cancelling Headphones</h3>
                  <p className="text-sm text-syinq-gray mb-2">Used for 3 months</p>
                  <p className="font-medium text-syinq-green">₹ 1499</p>
                </div>
              </Link>
              
              <Link to="/marketplace" className="apple-card relative transform translate-y-6 hover:translate-y-4 transition-transform col-span-2">
                <div className="grid grid-cols-3 gap-4">
                  <div className="aspect-square bg-white rounded-lg shadow-sm flex items-center justify-center">
                    <svg className="w-10 h-10 text-syinq-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <div className="aspect-square bg-white rounded-lg shadow-sm flex items-center justify-center">
                    <svg className="w-10 h-10 text-syinq-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="aspect-square bg-white rounded-lg shadow-sm flex items-center justify-center">
                    <svg className="w-10 h-10 text-syinq-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
                
                <div className="mt-4 text-left">
                  <h3 className="font-semibold">Marketplace Features</h3>
                  <p className="text-sm text-syinq-gray">List items easily with photos + details</p>
                </div>
              </Link>
            </div>
          </div>
          
          <div className="space-y-8 reveal-on-scroll">
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="mr-4 mt-1 bg-syinq-green/10 p-2 rounded-xl">
                  <Book className="h-6 w-6 text-syinq-green" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">List Items Easily</h3>
                  <p className="text-syinq-gray">Add photos, descriptions and set your price in seconds.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 mt-1 bg-syinq-green/10 p-2 rounded-xl">
                  <MessageSquare className="h-6 w-6 text-syinq-green" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">In-app Chat</h3>
                  <p className="text-syinq-gray">Negotiate directly with buyers or sellers through secure messaging.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 mt-1 bg-syinq-green/10 p-2 rounded-xl">
                  <Ban className="h-6 w-6 text-syinq-green" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">No Middlemen</h3>
                  <p className="text-syinq-gray">Zero commission fees. Keep every dollar you earn.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <Link to="/marketplace" className="apple-button bg-syinq-green inline-block">Browse Marketplace</Link>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Marketplace;