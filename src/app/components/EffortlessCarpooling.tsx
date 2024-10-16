import React from "react";
import { cards } from "../data/navLinks";
import Image from "next/image";
import { CardHoverEffectDemo } from "./CardHoverEffect";

function EffortlessCarpooling() {
  return (
    <section className="bg-white mb-10 sm:mb-20 lg:mb-30 font-manrope md:mt-20 mt-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <header className="w-full flex justify-center mb-8 sm:mb-12 lg:mb-16">
          <h1 className="text-[#099BE4] font-bold text-2xl sm:text-3xl lg:text-4xl text-center">
            Effortless Carpooling
          </h1>
        </header>
        
        <div className="flex flex-col lg:flex-row justify-center items-center space-y-8 lg:space-y-0 lg:space-x-4"> 

          <div className="w-full lg:w-1/2 flex justify-center">
            <Image
              className="w-[70%] sm:w-[60%] max-w-md lg:max-w-full" 
              src="/carpooling.svg"
              alt="Carpooling"
              width={800} 
              height={800} 
            />
          </div>
          
          <div className="w-full lg:w-1/2">
            <CardHoverEffectDemo />
          </div>
        </div>
      </div>
    </section>
  );
}

export default EffortlessCarpooling;
