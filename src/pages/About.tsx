import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import Footer from '@/components/Footer';

const About = () => {
  useEffect(() => {
    // Update document title
    document.title = "About Syinq";
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="pt-24 flex-grow">
        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Home button */}
          <div className="mb-8">
            <Button asChild variant="outline" className="flex items-center gap-2">
              <Link to="/">
                <Home className="h-4 w-4" />
                <span>Back to Home</span>
              </Link>
            </Button>
          </div>

          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              About <span className="text-syinq-blue">Syinq</span>
            </h1>
            <p className="text-lg text-syinq-gray max-w-2xl mx-auto">
              Our mission is to transform campus life by connecting students through technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-bold mb-6">Our Story</h2>
              <p className="text-syinq-gray mb-4">
                Syinq was born out of a simple observation: students face unique challenges on campus that mainstream apps don't address. 
                Whether it's finding affordable textbooks, coordinating rides home, or connecting with peers, students need tailored solutions.
              </p>
              <p className="text-syinq-gray mb-4">
                Founded by a team of former university students, Syinq aims to create a comprehensive platform 
                that addresses these everyday campus challenges while fostering a sense of community.
              </p>
              <p className="text-syinq-gray">
                Our app combines carpooling, marketplace, and community forum functionalities in one secure, 
                student-verified platform, designed specifically for university life.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <img
                src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHIyanQzN3p4Zjl2NzVzYm5oaG1pajhmY3Zra2hyajdidjF2N3hqaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT9IgzoKnwFNmISR8I/giphy.gif"
                alt="Students collaborating"
                className="rounded-xl shadow-lg max-w-full h-auto"
              />
            </div>
          </div>

          <div className="bg-syinq-blue/5 rounded-xl p-8 mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-3">Community First</h3>
                <p className="text-syinq-gray">
                  We believe in the power of student communities and design our platform to strengthen campus connections.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-3">Safety & Trust</h3>
                <p className="text-syinq-gray">
                  Student verification and robust security measures ensure a safe environment for all users.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-3">Innovation</h3>
                <p className="text-syinq-gray">
                  We're constantly evolving our platform based on student feedback and emerging needs.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6">Join Us</h2>
            <p className="text-syinq-gray max-w-2xl mx-auto mb-8">
              We're excited to bring Syinq to your campus. Join our waitlist to be among the first to experience
              the future of campus connectivity.
            </p>
            <Button asChild className="bg-syinq-blue hover:bg-syinq-blue/90">
              <Link to="/waitlist">Join Waitlist</Link>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About; 