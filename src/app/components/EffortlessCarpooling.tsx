import React from "react";
import { cards } from "../data/navLinks";
import Image from "next/image";

function EffortlessCarpooling() {


  return (
    <section className="bg-white mb-20 sm:mb-40 lg:mb-80 font-manrope">
      <div className="px-4 sm:px-6 lg:px-8">
        <header className="w-full flex justify-center mb-8 sm:mb-12 lg:mb-16">
          <h1 className="text-[#099BE4] font-bold text-2xl sm:text-3xl lg:text-4xl text-center">
            Effortless Carpooling
          </h1>
        </header>
        <div className="w-full flex justify-center p-4 sm:p-8 lg:p-[8vw] relative bg-white">
          
          <Image className="w-[60%] sm:w-[50%] lg:w-[36%] max-w-md lg:max-w-lg" src="/carpooling.svg" alt="Carpooling" width={700} height={700}/>

          {cards.map((card) => (
            <div key={card.id} className="hidden lg:block">
              <div
                className="absolute"
                style={{ left: card.leftimg, top: card.top }}
              >
                <Image className="w-[50%]" src={card.img} alt="icons" width={700} height={700} />
              </div>
              <div
                className="w-[20%] absolute border-2 rounded-lg border-[#099BE4] p-3 shadow-[#099BE4] shadow-sm"
                style={{ left: card.left, top: `calc(${card.top} + 11%)` }}
              >
                <p className="text-sm lg:text-md font-bold">{card.content}</p>
              </div>
            </div>
          ))}
        </div>

        <section className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
          {cards.map((card) => (
            <article key={card.id} className="border-2 rounded-lg border-[#099BE4] p-4 shadow-[#099BE4] shadow-sm">
              <Image className="w-12 h-12 mb-3" src={card.img} alt="icons" width={700} height={700} />
              <p className="text-sm font-bold">{card.content}</p>
            </article>
          ))}
        </section>
      </div>
    </section>
  );
}

export default EffortlessCarpooling;
