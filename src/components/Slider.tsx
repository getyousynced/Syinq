"use client";

import Image from "next/image";
import React, { useState } from "react";

const Slider: React.FC = () => {
    const [distance, setDistance] = useState(10); //default distance
    const [days, setDays] = useState(3); //default days
    const [weeks, setWeeks] = useState(15); //default weeks

    const costPerKm = 5; // SEK per kilometer
    const co2PerKm = 0.12; // kg CO2 per kilometer
    const weeksPerYear = 52;

    const calculateAnnualCostReduction = (distance: number, days: number) => {
        return distance * days * 2 * costPerKm * weeksPerYear;
    };

    const calculateAnnualCO2Reduction = (distance: number, days: number) => {
        return distance * days * 2 * co2PerKm * weeksPerYear;
    };

    const annualCostReduction = calculateAnnualCostReduction(distance, days);
    const annualCO2Reduction = calculateAnnualCO2Reduction(distance, days);

    const handleDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDays(Number(e.target.value));
    };

    const handleDistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDistance(Number(e.target.value));
    };

    const handleWeeksChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWeeks(Number(e.target.value))
    }

    return (
        <div className="sm:-mt-52">
        <Image draggable="false" className='w-[90%] mx-auto h-[250px] sm:h-full ml-4' src="/assets/hero-map.svg" width={8000} height={8000} alt="Hero Map" />

        <section className="flex flex-col items-center space-y-6 w-full md:w-2/3 mx-auto py-10 mt-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-20 mb-10">
                <div className="flex flex-col items-center justify-center w-5/6 md:w-1/2">
                    <h2 className="text-xl md:text-3xl text-center text-[#099BE4] font-semibold relative ">
                        <span className="text-xl md:text-3xl text-center text-[#099BE4] font-semibold text-glow">
                            Calculate
                        <div className="bg-[url('/assets/Vector5.png')] absolute top-12 left-36 sm:top-14 sm:left-60 z-10   w-1/2 h-1/3 sm:w-1/2 sm:h-1/2 bg-cover bg-no-repeat"></div>
                        </span>
                        {" "}your savings with Sync&apos;s easy-to-use tool.
                    </h2>

                    <p className="text-center text-black mt-10 mx-5">
                        Adjust the sliders to see how much you could save with Sync!
                    </p>
                </div>

                {/* Workplace Distance Slider */}
                <div className="flex flex-col items-center justify-center w-5/6 md:w-1/2 gap-4">
                    <div className="w-full">
                        <label
                            htmlFor="distance"
                            className="block text-sm font-medium text-gray-700"
                        >
                            How far is your workplace?{" "}
                        </label>
                        <div className="flex items-center justify-center">
                            <input
                                id="distance"
                                type="range"
                                min="0"
                                max="100"
                                value={distance}
                                onChange={handleDistanceChange}
                                className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer mt-2 custom-slider-dist"
                            />
                            <span className="text-black text-nowrap mt-2 ml-2 text-sm">
                                {distance} KM
                            </span>
                        </div>
                    </div>

                    {/* Days Commuted Slider */}
                    <div className="w-full">
                        <label
                            htmlFor="days"
                            className="block text-sm font-medium text-gray-700"
                        >
                            How many days do you commute per week?{" "}
                        </label>
                        <div className="flex items-center justify-center">
                            <input
                                id="days"
                                type="range"
                                min="1"
                                max="7"
                                value={days}
                                onChange={handleDaysChange}
                                className="w-full h-2 rounded-lg appearance-none cursor-pointer mt-2 bg-gray-300 custom-slider"
                            />
                            <span className="text-black text-nowrap mt-2 ml-2 text-sm">
                                {days} Days
                            </span>
                        </div>
                    </div>

                    {/* Weeks Slider */}
                    <div className="w-full">
                        <label
                            htmlFor="weeks"
                            className="block text-sm font-medium text-gray-700"
                        >
                            How far is your workplace?
                        </label>
                        <div className="flex items-center justify-center">
                            <input
                                id="weeks"
                                type="range"
                                min="1"
                                max="52"
                                value={weeks}
                                onChange={handleWeeksChange}
                                className="w-full h-2 rounded-lg appearance-none cursor-pointer mt-2 bg-gray-300 custom-slider"
                            />
                            <span className="text-black text-nowrap mt-2 ml-2 text-sm">
                                {weeks} weeks
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Information display */}

            <div className="border-2 border-[#099BE4] py-4 md:py-6 px-4 md:px-12 rounded-3xl text-start w-5/6 md:w-auto">
                <p className="text-black font-semibold text-sm md:text-base mb-2 md:mb-0">
                    Save Money: Reduce your transportation costs by up to{" "}
                    <span className="text-[#099BE4]">
                        Rupees {annualCostReduction.toFixed(2)}
                    </span>{" "}
                    per year.
                </p>
                <p className="text-black font-semibold text-sm md:text-base mb-2 md:mb-0">
                    Reduce Your Carbon Footprint: Save up to{" "}
                    <span className="text-[#099BE4]">
                        {annualCO2Reduction.toFixed(2)} kg
                    </span>{" "}
                    of CO2 annually.
                </p>
                <p className="text-black font-semibold text-sm md:text-base mb-2 md:mb-0">
                    Meet New People: Connect with{" "}
                    <span className="text-[#099BE4]">like-minded students</span> and build
                    friendships.
                </p>
            </div>
            </section>
        </div>
    );
};

export default Slider;