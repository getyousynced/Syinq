
import React from 'react';
import { AppWindow, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';

const ComingSoon = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-syinq-lightgray to-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white to-transparent"></div>
      
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center reveal-on-scroll">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-syinq-blue/10 rounded-2xl mb-6">
            <AppWindow className="h-10 w-10 text-syinq-blue" />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="text-syinq-blue">Coming Soon!</span>
          </h2>
          
          <p className="text-lg text-syinq-gray mb-8">
            We're putting the finishing touches on Syinq. Get ready for a smarter, safer way to navigate campus life.
          </p>
          
          <div className="mb-12 w-full max-w-md mx-auto">
            <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
              <div className="absolute left-0 top-0 bottom-0 w-[70%] bg-syinq-blue rounded-full"></div>
            </div>
            <div className="flex items-center justify-between text-sm text-syinq-gray">
              <span>Development</span>
              <div className="flex items-center">
                <Loader className="h-3 w-3 mr-1 animate-spin" />
                <span>70% Complete</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-lg mx-auto mb-8">
            <button className="apple-button-secondary bg-gray-200 text-syinq-gray flex justify-center items-center space-x-3 opacity-70 cursor-not-allowed">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.5649 12.3664C17.5077 9.71861 19.6909 8.21003 19.7785 8.15272C18.6266 6.42874 16.8136 6.18516 16.175 6.15772C14.6239 5.99949 13.1299 7.03974 12.3425 7.03974C11.5414 7.03974 10.3209 6.17617 9.01344 6.20361C7.35146 6.23104 5.81609 7.14646 4.96891 8.59132C3.22435 11.5357 4.52736 15.8511 6.18934 18.224C7.02765 19.3731 8.02084 20.6682 9.32385 20.6133C10.5991 20.5584 11.0629 19.7904 12.5865 19.7904C14.0964 19.7904 14.5328 20.6133 15.8494 20.5858C17.2073 20.5584 18.0593 19.4367 18.866 18.2767C19.8181 16.9542 20.2134 15.6592 20.2271 15.5906C20.1972 15.5768 17.6258 14.5913 17.5649 12.3664Z" />
                <path d="M15.585 4.42178C16.2647 3.58566 16.7285 2.44139 16.6127 1.28271C15.640 1.32456 14.4332 1.94537 13.7261 2.76707C13.1024 3.48967 12.5451 4.68463 12.6746 5.78261C13.7671 5.86736 14.8777 5.2466 15.585 4.42178Z" />
              </svg>
              <span>App Store</span>
            </button>
            
            <button className="apple-button-secondary bg-gray-200 text-syinq-gray flex justify-center items-center space-x-3 opacity-70 cursor-not-allowed">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.2037 10.5163L3.78453 19.7774C3.78453 19.7774 3.78453 19.7774 3.76461 19.7774C4.17607 20.3386 4.90717 20.739 5.71805 20.739C6.1096 20.739 6.46138 20.6592 6.79323 20.4995L6.87269 20.4597L16.035 15.0862L12.2037 10.5163Z" />
                <path d="M20.2157 9.37245C19.725 8.97205 19.1547 8.73228 18.5647 8.63242L18.5051 8.59254C17.9152 8.49267 17.3252 8.57261 16.7949 8.8323L16.7353 8.85224L12.0051 11.5941L16.0944 16.4641L20.1837 14.0226C20.6744 13.7629 21.0659 13.3625 21.3182 12.8623C21.5507 12.3621 21.6699 11.8419 21.6501 11.3019V11.2619C21.6103 10.562 21.065 9.83232 20.2157 9.37245Z" />
                <path d="M3.08691 3.94169C3.00745 4.1216 2.96762 4.32139 2.96762 4.5411V19.4186C2.96762 19.6583 3.0274 19.8781 3.12677 20.078L11.8434 10.516L3.08691 3.94169Z" />
                <path d="M12.1042 10.4767L16.5732 7.89507L12.5038 3.4217L5.71802 3.26196C4.90714 3.26196 4.19597 3.64244 3.78451 4.20361C3.76459 4.2235 3.76459 4.2235 3.76459 4.24338L12.1042 10.4767Z" />
              </svg>
              <span>Play Store</span>
            </button>
          </div>
          
          <p className="text-syinq-gray">Launching soon for all verified campus users.</p>
          
          <div className="mt-10">
            <Link to="/waitlist" className="apple-button">
              Join Waitlist
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComingSoon;
