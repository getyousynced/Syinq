"use client";

import React from 'react';
import { APP_STORE_URL, PLAY_STORE_URL } from '@/lib/appLinks';
import Image from 'next/image';

const ComingSoon = () => {
  return (
    <section id="download" className="py-24 bg-gradient-to-b from-syinq-lightgray to-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white to-transparent"></div>
      
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center reveal-on-scroll">
          <Image
            src="/images/syinq app icon.png"
            alt="Syinq app icon"
            width={80}
            height={80}
            className="mx-auto mb-6 rounded-[18px]"
            priority
          />
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="text-syinq-blue">Download Syinq</span>
          </h2>
          
          <p className="text-lg text-syinq-gray mb-8">
            Now available on iOS and Android. Carpooling is live — marketplace and community forum are coming soon.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-lg mx-auto mb-8">
            <a
              className="apple-button flex justify-center items-center space-x-3"
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.5649 12.3664C17.5077 9.71861 19.6909 8.21003 19.7785 8.15272C18.6266 6.42874 16.8136 6.18516 16.175 6.15772C14.6239 5.99949 13.1299 7.03974 12.3425 7.03974C11.5414 7.03974 10.3209 6.17617 9.01344 6.20361C7.35146 6.23104 5.81609 7.14646 4.96891 8.59132C3.22435 11.5357 4.52736 15.8511 6.18934 18.224C7.02765 19.3731 8.02084 20.6682 9.32385 20.6133C10.5991 20.5584 11.0629 19.7904 12.5865 19.7904C14.0964 19.7904 14.5328 20.6133 15.8494 20.5858C17.2073 20.5584 18.0593 19.4367 18.866 18.2767C19.8181 16.9542 20.2134 15.6592 20.2271 15.5906C20.1972 15.5768 17.6258 14.5913 17.5649 12.3664Z" />
                <path d="M15.585 4.42178C16.2647 3.58566 16.7285 2.44139 16.6127 1.28271C15.640 1.32456 14.4332 1.94537 13.7261 2.76707C13.1024 3.48967 12.5451 4.68463 12.6746 5.78261C13.7671 5.86736 14.8777 5.2466 15.585 4.42178Z" />
              </svg>
              <span>App Store</span>
            </a>
            
            <a
              className="apple-button flex justify-center items-center space-x-3"
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path
                  d="M7.2 4.55c-.66-.38-1.2.02-1.2.8v13.3c0 .78.54 1.18 1.2.8l11.4-6.65c.6-.35.6-1.25 0-1.6L7.2 4.55z"
                  fill="currentColor"
                />
              </svg>
              <span>Play Store</span>
            </a>
          </div>

          <p className="text-syinq-gray">Already on campus? Download and get synced.</p>
        </div>
      </div>
    </section>
  );
};

export default ComingSoon;
