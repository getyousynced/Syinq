import Image from "next/image";
import clockt from "./assets/957154_OEZAU60 1.png"
import people from "./assets/div.familiarfacesavatars.png"

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="flex justify-center items-center mt-3">
          <p className="text-4xl font-medium bg-custom-gradient p-2 rounded-lg w-56 text-center">
            VISION
          </p>
        </div>
        <div className="absolute bg-custom-background w-full h-full top-[1rem]"></div>
        <div className="flex flex-col justify-center items-center font-medium text-5xl text-center mt-6 p-8 rounded-lg ">
          <p>Transforming Student Commutes</p>
          <p>with Connection and</p>
          <p>Sustainability</p>
          <p className="text-lg mt-4">Experience seamless carpooling with SYNC, where affordability meets convenience, safety is a priority, and sustainability</p> 
          <p className="text-lg">drives every ride. Together, we connect students, share journeys, and reduce our carbon footprint.</p>
        </div>
        <div>
          <Image
          src={clockt}
          alt="clocktower"
          width={580}
          height={290}
          />
        </div>
        <div className="mt-14 flex-col justify-center items-center">
          <p className="font-semibold mb-5 text-center text-xl">Meet Our Passionate And Purposeful Team </p>
          <Image
          src={people}
          alt="people"
          width={570}
          height={80}
          />
        </div>
      </div>
    </>
  );
}
