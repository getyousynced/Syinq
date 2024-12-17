import Image from 'next/image'
import React from 'react'
import { FaArrowRight } from 'react-icons/fa'

const Hero = () => {
    return (
        <div
            className="bg-[url('/assets/wave.svg')] pt-32 bg-cover bg-no-repeat"
        >
            <div className="h-screen flex py-10">
                <div className="left pl-10 w-[60%] gap-6 flex flex-col">
                    <div className="text-white text-5xl font-semibold">
                        Your Campus Commute, Simplified - <br />
                        <span className="text-[#099BE4]">
                            Eco-friendly rides, socially connected!
                        </span>
                    </div>
                    <div className="text-xl text-white">
                        Welcome to Sync: the superapp by students, for students! <br />
                        Carpool, connect, and simplify campus life with ease.
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
                <div className="w-[70%]">
                    <Image
                        className="w-[90%] my-16"
                        src="/assets/hero-people.png"
                        width={900}
                        height={900}
                        alt="Group of People"
                    />
                </div>
            </div>
        </div>
    )
}

export default Hero
