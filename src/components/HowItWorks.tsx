import React from "react";
import Image from "next/image";
import { worksArr } from "../../data/HowItWorksData";

function HowItWorks() {
  return (
    <div className="h-full mb-10 px-4 md:px-8">
      <div className="flex justify-center items-center mb-4">
        <p className="text-[#7E8BB6] text-2xl">SYNC</p>
      </div>
      <div className="flex items-center justify-center mb-8">
        <p className="font-bold text-[#273464] text-4xl">How does it work?</p>
        <Image
          src="/assets/works.png"
          alt="Choose illustration"
          width={256}
          height={256}
          className="w-[2.5%] h-[2.5%]"
        />
      </div>
      <div className="flex flex-col items-center gap-10 mt-10">
        {worksArr.map((work) => (
          <div
            key={work.id}
            className={`flex flex-col md:flex-row justify-center items-center w-full gap-8 ${
              work.id % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
            }`}
          >
            <Image
              src={work.img}
              alt={`${work.heading} illustration`}
              width={1000}
              height={256}
              className="w-[80%] md:w-[30%]"
            />
            <div className="w-full md:w-[40%] text-center md:text-left">
              <h1 className="text-[#273464] text-2xl md:text-3xl font-semibold mb-4">
                {work.heading}
              </h1>
              <p className="text-[#7E8BB6]">{work.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HowItWorks;
