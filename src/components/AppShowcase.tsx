
import React from 'react';
import { cn } from '@/lib/utils';

const AppShowcase = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-20 reveal-on-scroll">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            One App.
            <span className="text-syinq-blue"> Unlimited Possibilities.</span>
          </h2>
          <p className="text-lg text-syinq-gray">
            Everything you need for your campus life in one beautifully designed app.
          </p>
        </div>
        
        <div className="relative h-[600px] max-w-4xl mx-auto reveal-on-scroll">
          {/* Phone Mockups */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 w-[280px] transform rotate-[-8deg] z-10">
            <PhoneMockup 
              bgColor="from-syinq-blue to-syinq-blue/70"
              screen={
                <div className="p-3">
                  <div className="mb-4">
                    <h4 className="text-white text-sm font-semibold mb-1">Available Rides</h4>
                    <p className="text-white/70 text-xs">Find your perfect match</p>
                  </div>
                  
                  <div className="space-y-3">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-white text-xs font-medium">Campus → Downtown</p>
                          <p className="text-white/80 text-xs">$4.50</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-white/70 text-xs">Today, 5:30 PM</p>
                          <p className="text-white/70 text-xs">2 seats</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="absolute bottom-5 left-0 right-0 px-3">
                    <button className="w-full bg-white rounded-full py-2 text-xs font-medium text-syinq-blue">
                      Find a Ride
                    </button>
                  </div>
                </div>
              }
            />
          </div>
          
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 translate-y-10 w-[280px] z-20">
            <PhoneMockup 
              bgColor="from-syinq-green to-syinq-green/70"
              screen={
                <div className="p-3">
                  <div className="mb-4">
                    <h4 className="text-white text-sm font-semibold mb-1">Marketplace</h4>
                    <p className="text-white/70 text-xs">Recently added items</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {[1, 2, 3, 4].map((item) => (
                      <div key={item} className="bg-white/10 backdrop-blur-sm rounded-lg p-2 aspect-square flex items-center justify-center">
                        <div className="w-8 h-8 bg-white/20 rounded-full"></div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 mb-3">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-white/20 rounded-lg mr-3"></div>
                      <div>
                        <p className="text-white text-xs font-medium">Physics Textbook</p>
                        <p className="text-white/70 text-xs">$35 - Like new</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-5 left-0 right-0 px-3">
                    <button className="w-full bg-white rounded-full py-2 text-xs font-medium text-syinq-green">
                      List an Item
                    </button>
                  </div>
                </div>
              }
            />
          </div>
          
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 translate-y-6 rotate-[8deg] w-[280px] z-10">
            <PhoneMockup 
              bgColor="from-syinq-dark to-gray-700"
              screen={
                <div className="p-3">
                  <div className="mb-4">
                    <h4 className="text-white text-sm font-semibold mb-1">Community</h4>
                    <p className="text-white/70 text-xs">Latest discussions</p>
                  </div>
                  
                  <div className="space-y-3 mb-3">
                    {[1, 2].map((item) => (
                      <div key={item} className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                        <p className="text-white text-xs font-medium mb-1">Lost and Found - Keys</p>
                        <p className="text-white/70 text-[10px] mb-2">Found a set of keys near the library...</p>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-4 h-4 bg-white/20 rounded-full mr-1"></div>
                            <p className="text-white/70 text-[10px]">John</p>
                          </div>
                          <p className="text-white/50 text-[10px]">2h ago</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="absolute bottom-5 left-0 right-0 px-3">
                    <button className="w-full bg-white rounded-full py-2 text-xs font-medium text-syinq-dark">
                      Join Discussion
                    </button>
                  </div>
                </div>
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
};

interface PhoneMockupProps {
  bgColor: string;
  screen: React.ReactNode;
}

const PhoneMockup = ({ bgColor, screen }: PhoneMockupProps) => {
  return (
    <div className="relative">
      <div className={cn("relative w-full aspect-[9/19] rounded-[2.5rem] overflow-hidden", 
        "bg-gradient-to-b", bgColor, 
        "p-2 shadow-xl border border-white/20"
      )}>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-5 bg-black rounded-b-xl"></div>
        {screen}
        
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-1/3 h-1 bg-white/50 rounded-full"></div>
      </div>
      
      {/* Phone Shadow */}
      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-4/5 h-4 bg-black/20 rounded-full blur-md"></div>
    </div>
  );
};

export default AppShowcase;
