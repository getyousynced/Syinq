import Image from 'next/image';
import React from 'react';

const VideoComponent = () => {
    return (
        <div className="flex justify-evenly items-center">
            {/* Phone Frame with Video */}
            <div className="relative items-center flex justify-center w-[300px] h-[600px]">
                {/* Phone Frame */}
                <Image
                    className="absolute z-10 max-w-full object-contain h-auto transition-transform duration-500 ease-in-out"
                    src="/Device.svg"
                    alt="Phone frame"
                    width={275}
                    height={500}
                />
                {/* Video */}
                <video
                    className="absolute rounded-[2.5rem] md:top-[10%] left-[13%] w-[75%] md:h-[80%] h-[70%] object-fit md:object-cover z-0"
                    src="/video.mp4" // Replace with your video file path
                    poster="/fallback-image.svg" // Replace with your fallback image file path
                    autoPlay
                    loop
                    muted
                    playsInline
                ></video>
            </div>

            {/* Text Section */}
            <div className="w-[40%] flex flex-col gap-10 text-justify px-5">
                <div className="font-semibold text-2xl">
                    Sync is more than just a carpooling platform -{' '}
                    <span className="text-blue-500">it&apos;s a vibrant community.</span>
                </div>
                <div className="text-xl">
                    Connect with fellow students who share your travel needs, schedule, and even interests.
                </div>
            </div>
        </div>
    );
};

export default VideoComponent;
