import CustomTypewriter from "@/lib/CustomTypewriter";
import Image from "next/image";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

const Hero = () => {
  const typeWriterData = ["Simplified"];
  return (
    <div className="bg-[url('/assets/wave.svg')] sm:pt-28 pt-20 h-[61rem] bg-cover bg-no-repeat">
      <div className="sm:h-screen flex sm:flex-row flex-col py-10">
        <div className="left pl-4 sm:pl-10 w-full sm:w-[60%] gap-6 flex flex-col">
          <div className="text-white text-3xl sm:text-5xl font-semibold mt-10">
            Your Campus Commute,
            <div className="text-[#099be4] mt-4">
              <CustomTypewriter typeWriterData={typeWriterData} />
            </div>
          </div>
          <div className="text-sm md:text-xl text-[#9e9a9a] w-[85%]">
            SuperApp designed by students for students. More than just a
            carpooling platform – it&apos;s a vibrant community.
          </div>
          <div className="flex gap-6 items-center">
            <button className="px-6 py-4 h-fit max-w-xl text-white bg-[#099BE4] rounded-2xl text-lg font-medium shadow-sm shadow-white flex items-center gap-2">
              Register Now <FaArrowRight />
            </button>
            <Image
              className="w-fit rounded-full"
              src="/assets/thumbs-up-avatar.png"
              width={50}
              height={50}
              alt="Avatar"
            />
          </div>
        </div>
        <div className="w-full sm:w-[65%] mx-auto">
          <Image
            className="w-full sm:w-[90%] mt-16"
            src="/assets/People.svg"
            width={900}
            height={900}
            alt="Group of People"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
