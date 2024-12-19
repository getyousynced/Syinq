import { AnimatedTooltip } from "@/components/AnimatedTooltip";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Background Image */}
      <div
        className="h-[200px]"
        style={{
          backgroundImage: "url('/assets/Mask Group.png')",
          backgroundSize: "cover",
          backgroundPosition: "bottom",
        }}
      ></div>

      {/* Main Content */}
      <div className="relative flex flex-col sm:-mt-52 xl:flex-row items-center xl:justify-center overflow-hidden xl:h-[120vh] h-auto p-6 xl:pt-[70px] sm:px-12">
        <div className="flex flex-col xl:flex-row md:flex md:flex-row gap-[20px] justify-space py-[20px] xl:px-[20px] w-full md:mt-[90px] ">
          {/* Left Section */}
          <div className="flex flex-col w-full xl:w-[60%] md:w-[55%]">
            {/* Header Section */}
            <div className="flex flex-row px-[10px] xl:px-[30px] sm:flex-row items-center xl:items-start justify-center gap-2 xl:gap-[20px] sm:gap-2 xl:py-10 pt-10 md:pt-[80px]">
              <div
                className="flex flex-row items-baseline gap-2 border-b-2"
                style={{
                  borderImage:
                    "linear-gradient(to right, transparent 50%, black 50%) 1",
                }}
              >
                <span className="text-[36px] inline sm:text-[60px] md:text-[50px] xl:text-[100px] font-bold">
                  Take a
                </span>
                <span className="text-[28px] sm:text-[36px] md:text-[30px] font-semibold">
                  Look
                </span>
              </div>
              <div className="relative">
                <Image
                  src="/images/about/Ellipse204.png"
                  alt=""
                  width={1080}
                  height={1080}
                  className="xl:w-[150px] w-[100px] sm:w-[180px] md:w-[150px] h-auto"
                />
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-[18px] sm:text-[24px] md:text-[20px] xl:text-[28px] font-medium w-full text-center">
                  About Us
                </span>
              </div>
            </div>

            {/* Description Section */}
            <div className="xl:p-[30px] pt-[40px] md:pt-[30px] ">
              <div className="relative border border-[#d1c7be] rounded-[15px] ">
                <Image
                  src="/images/about/Vector-1.png"
                  alt=""
                  className="w-10 absolute transform -translate-y-1/2 rotate-180 left-[7%]"
                  width={1080}
                  height={1080}
                />
                <p className=" text-xs xl:p-[50px] p-[40px]  sm:text-base md:text-lg">
                  At SYNC, we believe in the power of connection and
                  sustainability. Born from the idea of simplifying shared
                  journeys, SYNC is a carpooling platform tailored for
                  university students. Our mission is to make commuting smarter,
                  more affordable, and environmentally friendly.
                  <Image
                    src="/images/about/Vector-1.png"
                    alt=""
                    className="inline-block w-[20px] sm:w-[25px] ml-2 mt-2"
                    width={1080}
                    height={1080}
                  />
                </p>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="relative flex justify-center items-center w-full xl:w-[40%] xl:mt-0 mt-[30px] md:w-[45%]">
            <Image
              width={1080}
              height={1080}
              src="/images/about/Rectangle34624113.png"
              alt=""
              className="xl:w-[52%] sm:w-[220px] md:w-[280px] w-[220px]"
            />
            <Image
              width={1080}
              height={1080}
              src="/images/about/Rectangle34624110.png"
              alt=""
              className="absolute left-0 top-[25%] xl:w-[10%] sm:w-[50px] w-[40px]"
            />
            <Image
              width={1080}
              height={1080}
              src="/images/about/Rectangle34624111.png"
              alt=""
              className="absolute xl:bottom-[-3px] xl:left-[15px] bottom-0 left-0 z-[-1] xl:w-[50%] w-[200px]"
            />
            <Image
              width={1080}
              height={1080}
              src="/images/about/Rectangle34624112.png"
              alt=""
              className="absolute xl:top-[20%] xl:right-[20px] right-0 z-[-1] xl:w-[50%] w-[200px]"
            />
          </div>
        </div>

        {/* Background Ellipses */}
        <Image
          width={1080}
          height={1080}
          src="/images/about/Ellipse526.png"
          alt=""
          className="absolute xl:top-[22%] xl:right-[4%] bottom-[380px] right-[10px] z-[-1] ] xl:block xl:w-[4%] w-[40px]"
        />
        <Image
          width={1080}
          height={1080}
          src="/images/about/Ellipse527.png"
          alt=""
          className="absolute xl:bottom-[22%] xl:right-[-1px] right-0 bottom-[50px] w-[50px] z-[-1]  xl:block xl:w-[5%]"
        />
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="flex justify-center items-center mt-3">
          <p className="text-4xl font-medium bg-custom-gradient p-2 bg-gradient-to-r from-[#CAF0F8] to-[#87DCED] rounded-lg w-56 text-center">
            VISION
          </p>
        </div>
        <div className="absolute bg-custom-background w-full h-full top-[1rem]"></div>
        <div className="flex flex-col justify-center items-center font-medium text-5xl text-center mt-6 p-8 rounded-lg ">
          <p>Transforming Student Commutes</p>
          <p>with Connection and</p>
          <p>Sustainability</p>
          <p className="text-lg mt-4">
            Experience seamless carpooling with SYNC, where affordability meets
            convenience, safety is a priority, and sustainability
          </p>
          <p className="text-lg">
            drives every ride. Together, we connect students, share journeys,
            and reduce our carbon footprint.
          </p>
        </div>
        <div>
          <Image
            src="/assets/vision_picture.svg"
            alt="clocktower"
            width={580}
            height={290}
          />
        </div>
        <div className="mt-14 flex-col justify-center items-center">
          <p className="font-semibold mb-5 text-center text-xl">
            Meet Our Passionate And Purposeful Team{" "}
          </p>
          <AnimatedTooltip />
        </div>
      </div>
    </main>
  );
}
