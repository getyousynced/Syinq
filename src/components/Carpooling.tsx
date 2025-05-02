import React from 'react';
import { Target, RefreshCw, DollarSign, CheckCircle } from 'lucide-react';
const CarPooling = () => {
  return <section id="carpooling" className="py-20 relative overflow-hidden">
      <div className="absolute -right-20 top-1/3 w-80 h-80 bg-syinq-blue/5 rounded-full blur-3xl"></div>
      <div className="section-container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 reveal-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              Carpooling – Smart. <br />
              Secure. Student-Only.
            </h2>
            
            <div className="space-y-6 mt-8">
              <div className="flex items-start">
                <div className="mr-4 mt-1 bg-syinq-blue/10 p-2 rounded-xl">
                  <Target className="h-6 w-6 text-syinq-blue" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Smart Matching</h3>
                  <p className="text-syinq-gray">Based on time, route & gender preferences for optimal ride coordination.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 mt-1 bg-syinq-blue/10 p-2 rounded-xl">
                  <RefreshCw className="h-6 w-6 text-syinq-blue" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Recurring Rides</h3>
                  <p className="text-syinq-gray">Schedule repeating journeys that match your weekly class timetable.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 mt-1 bg-syinq-blue/10 p-2 rounded-xl">
                  <DollarSign className="h-6 w-6 text-syinq-blue" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Set or Split Fare</h3>
                  <p className="text-syinq-gray">Flexible payment options to share costs or charge your own rates.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 mt-1 bg-syinq-blue/10 p-2 rounded-xl">
                  <CheckCircle className="h-6 w-6 text-syinq-blue" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Verified Users Only</h3>
                  <p className="text-syinq-gray">Travel with confidence knowing all drivers are vetted and verified.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="order-1 md:order-2 reveal-on-scroll">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-syinq-blue/20 to-syinq-green/20 rounded-3xl transform rotate-3 scale-95 opacity-50"></div>
              
              <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                <div className="p-1">
                  <div className="h-8 bg-syinq-lightgray rounded-t-3xl flex items-center px-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="space-y-4">
                      <div className="bg-syinq-lightgray p-4 rounded-xl flex items-center space-x-4">
                        <div className="w-10 h-10 bg-syinq-blue rounded-full flex items-center justify-center text-white font-semibold">S</div>
                        <div>
                          <p className="font-medium">Sarah Johnson</p>
                          <div className="flex items-center space-x-1">
                            <span className="text-xs text-syinq-gray">4.9</span>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map(star => <svg key={star} className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>)}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-r from-syinq-blue/5 to-syinq-green/5 p-4 rounded-xl">
                        <div className="flex justify-between items-center mb-3">
                          <p className="font-medium">Gaur City → Saket</p>
                          <span className="text-sm font-medium bg-green-100 text-green-800 px-2 py-1 rounded-full">₹180</span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-syinq-gray">
                          <p>Tuesday, 3:30 PM</p>
                          <p>2 seats available</p>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-r from-syinq-blue/5 to-syinq-green/5 p-4 rounded-xl">
                        <div className="flex justify-between items-center mb-3">
                          <p className="font-medium">University → IGI Airport</p>
                          <span className="text-sm font-medium bg-green-100 text-green-800 px-2 py-1 rounded-full">₹300</span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-syinq-gray">
                          <p>Thursday, 5:15 PM</p>
                          <p>3 seats available</p>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex justify-center">
                        <button className="apple-button w-full">Find Ride</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default CarPooling;