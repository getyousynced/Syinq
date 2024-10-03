"use client";

import Image from 'next/image';
import React from 'react';
import CustomTypewriter from './utils/CustomTypewriter';
import { useSidebar } from './context/SidebarContext';

export default function Landing() {
    const typeWriterData = ["Socially Connected Sustainable Ridesharing"];
    const { isOpen } = useSidebar();

    return (
        <div className='bg-[#F5F5F5] flex sm:flex-row flex-col py-10 sm:p-20'>
            <div className='sm:w-1/2 flex justify-center'>
                <div className='w-[85%] sm:w-[80%]'>
                    <p className='text-3xl font-bold pb-10'>
                        Your Campus Commute, Simplified- 
                        <span className='text-[#AAAAAA]'>
                            {' '}
                            {isOpen ? (
                                typeWriterData[0]
                            ) : (
                                <CustomTypewriter typeWriterData={typeWriterData} />
                            )}
                        </span>
                    </p>

                    <p className='text-xl'>
                        Welcome to Sync, the carpooling app designed by students,
                        for students! We understand the struggles of navigating
                        campus life, especially when it comes to finding affordable and
                        reliable transportation. That&apos;s where Sync comes in.
                    </p>
                </div>
            </div>
            <div className='sm:w-1/2 w-full py-10 sm:p-0 flex justify-center'>
                <Image
                    className='object-cover'
                    src="/blue-car.svg"
                    alt="blue car"
                    width={500}
                    height={500}
                    priority
                />
            </div>
        </div>
    );
}