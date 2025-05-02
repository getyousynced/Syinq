
import React from 'react';
import { Shield, GraduationCap, Car, Building, Lock } from 'lucide-react';

const Security = () => {
  return (
    <section id="security" className="bg-syinq-lightgray relative overflow-hidden py-16">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Your Campus. Your Safety.
            <span className="block text-syinq-blue">Our Priority.</span>
          </h2>
          <p className="text-lg text-syinq-gray">
            Multiple layers of verification ensure that only trusted members of your campus community 
            can access Syinq.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
            w-24 h-24 lg:w-32 lg:h-32 bg-syinq-blue/10 rounded-full flex items-center justify-center z-0">
            <Shield className="w-12 h-12 lg:w-16 lg:h-16 text-syinq-blue" />
          </div>
          
          <div className="grid grid-cols-2 gap-6 relative z-10">
            <SecurityFeature 
              icon={<GraduationCap className="h-8 w-8 text-white" />} 
              title="Verified Campus ID" 
              description="Only users with valid university email and ID can join." 
              position="top-left" 
            />
            
            <SecurityFeature 
              icon={<Car className="h-8 w-8 text-white" />} 
              title="Driving License Check" 
              description="All drivers must verify license and insurance." 
              position="top-right" 
            />
            
            <SecurityFeature 
              icon={<Building className="h-8 w-8 text-white" />} 
              title="Organization Validation" 
              description="Users are verified by the university." 
              position="bottom-left" 
            />
            
            <SecurityFeature 
              icon={<Lock className="h-8 w-8 text-white" />} 
              title="Encrypted Chats" 
              description="All communication is end-to-end encrypted for privacy." 
              position="bottom-right" 
            />
          </div>
        </div>
        
        <div className="mt-16 text-center reveal-on-scroll">
          <p className="mb-4 text-gray-900 text-center font-bold text-2xl">
            Your safety is our top priority
          </p>
        </div>
      </div>
    </section>
  );
};

interface SecurityFeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

const SecurityFeature = ({
  icon,
  title,
  description,
  position
}: SecurityFeatureProps) => {
  const positionClasses = {
    'top-left': 'text-right',
    'top-right': 'text-left',
    'bottom-left': 'text-right',
    'bottom-right': 'text-left'
  };

  return (
    <div className={`${positionClasses[position]} relative z-10`}>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full">
        <div className="flex flex-col items-center">
          <div className="bg-gradient-to-r from-syinq-blue to-syinq-blue/80 p-3 rounded-xl mb-4">
            {icon}
          </div>
          <h3 className="font-semibold text-lg mb-2">{title}</h3>
          <p className="text-syinq-gray text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Security;
