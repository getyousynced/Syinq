export default function AboutPage() {
  return (
    <>
      {/* Background Image */}
      <div className="o overflow-hidden">
        <img
          src="/images/about/Hero and Nav.png"
          alt=""
          className="absolute top-0 w-full object-cover transform xl:-translate-y-[10%] z-[-1]"
        />
      </div>

      {/* Main Content */}
      <div className="relative flex flex-col xl:flex-row items-center xl:justify-center overflow-hidden xl:h-[120vh] h-auto p-6 xl:pt-[70px] sm:px-12">
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
                <img
                  src="/images/about/Ellipse 204.png"
                  alt=""
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
                <img
                  src="images/about/Vector-1.png"
                  alt=""
                  className="w-10 absolute transform -translate-y-1/2 rotate-180 left-[7%]"
                />
                <p className=" text-xs xl:p-[50px] p-[40px]  sm:text-base md:text-lg">
                  At SYNC, we believe in the power of connection and
                  sustainability. Born from the idea of simplifying shared
                  journeys, SYNC is a carpooling platform tailored for
                  university students. Our mission is to make commuting smarter,
                  more affordable, and environmentally friendly.
                  <img
                    src="images/about/Vector-1.png"
                    alt=""
                    className="inline-block w-[20px] sm:w-[25px] ml-2 mt-2"
                  />
                </p>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="relative flex justify-center items-center w-full xl:w-[40%] xl:mt-0 mt-[30px] md:w-[45%]">
            <img
              src="/images/about/Rectangle 34624113.png"
              alt=""
              className="xl:w-[52%] sm:w-[220px] md:w-[280px] w-[220px]"
            />
            <img
              src="/images/about/Rectangle 34624110.png"
              alt=""
              className="absolute left-0 top-[25%] xl:w-[10%] sm:w-[50px] w-[40px]"
            />
            <img
              src="/images/about/Rectangle 34624111.png"
              alt=""
              className="absolute xl:bottom-[-3px] xl:left-[15px] bottom-0 left-0 z-[-1] xl:w-[50%] w-[200px]"
            />
            <img
              src="/images/about/Rectangle 34624112.png"
              alt=""
              className="absolute xl:top-[20%] xl:right-[20px] right-0 z-[-1] xl:w-[50%] w-[200px]"
            />
          </div>
        </div>

        {/* Background Ellipses */}
        <img
          src="/images/about/Ellipse 526.png"
          alt=""
          className="absolute xl:top-[22%] xl:right-[4%] bottom-[380px] right-[10px] z-[-1] ] xl:block xl:w-[4%] w-[40px]"
        />
        <img
          src="/images/about/Ellipse 527.png"
          alt=""
          className="absolute xl:bottom-[22%] xl:right-[-1px] right-0 bottom-[50px] w-[50px] z-[-1]  xl:block xl:w-[5%]"
        />
      </div>
    </>
  );
}
