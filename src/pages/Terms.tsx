import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Shield } from 'lucide-react';
import Footer from '@/components/Footer';

const Terms = () => {
  useEffect(() => {
    // Update document title
    document.title = "Terms & Privacy - Syinq";
    
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
            <div className="inline-block bg-syinq-blue/10 p-3 rounded-2xl mb-4">
              <Shield className="h-6 w-6 text-syinq-blue" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              Terms & <span className="text-syinq-blue">Privacy</span>
            </h1>
            <p className="text-lg text-syinq-gray max-w-2xl mx-auto">
              Your privacy matters to us. Learn about how we protect your data and the terms of using Syinq.
            </p>
          </div>

          <div className="space-y-12 mb-16">
            <section>
              <h2 className="text-2xl font-bold mb-4">Terms of Service</h2>
              <div className="space-y-4 text-syinq-gray">
                <p>
                  Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>

                <h3 className="text-xl font-semibold text-syinq-dark mt-6 mb-2">1. Acceptance of Terms</h3>
                <p>
                  By accessing or using Syinq, you agree to be bound by these Terms of Service and all applicable laws and regulations. 
                  If you do not agree with any of these terms, you are prohibited from using or accessing this platform.
                </p>

                <h3 className="text-xl font-semibold text-syinq-dark mt-6 mb-2">2. User Eligibility</h3>
                <p>
                  Syinq is exclusively designed for university students. By using Syinq, you confirm that you are currently enrolled 
                  at a recognized educational institution. We reserve the right to verify your student status.
                </p>

                <h3 className="text-xl font-semibold text-syinq-dark mt-6 mb-2">3. Account Responsibility</h3>
                <p>
                  You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. 
                  You agree to notify us immediately of any unauthorized use of your account or any other breach of security.
                </p>

                <h3 className="text-xl font-semibold text-syinq-dark mt-6 mb-2">4. User Content</h3>
                <p>
                  You retain all rights to the content you post on Syinq. By posting content, you grant Syinq a non-exclusive, 
                  royalty-free license to use, display, and distribute your content in connection with the service.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
              <div className="space-y-4 text-syinq-gray">
                <p>
                  Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>

                <h3 className="text-xl font-semibold text-syinq-dark mt-6 mb-2">1. Information We Collect</h3>
                <p>
                  We collect information that you provide directly to us, such as when you create an account, update your profile, 
                  use interactive features, participate in contests, promotions, or surveys, request customer support, or otherwise 
                  communicate with us.
                </p>

                <h3 className="text-xl font-semibold text-syinq-dark mt-6 mb-2">2. How We Use Your Information</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>To provide, maintain, and improve our services</li>
                  <li>To verify your identity and student status</li>
                  <li>To process transactions and send related information</li>
                  <li>To send you technical notices, updates, security alerts, and support messages</li>
                  <li>To respond to your comments and questions</li>
                  <li>To develop new products and services</li>
                </ul>

                <h3 className="text-xl font-semibold text-syinq-dark mt-6 mb-2">3. Sharing of Information</h3>
                <p>
                  We do not share, sell, or transfer your personal information to third parties except in the following circumstances:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>With your consent</li>
                  <li>To comply with laws or respond to legal requests</li>
                  <li>To protect the rights, property, and safety of Syinq, our users, and the public</li>
                  <li>In connection with a sale or transfer of business assets</li>
                </ul>

                <h3 className="text-xl font-semibold text-syinq-dark mt-6 mb-2">4. Data Security</h3>
                <p>
                  We take reasonable measures to help protect information about you from loss, theft, misuse, unauthorized access, 
                  disclosure, alteration, and destruction.
                </p>
              </div>
            </section>
          </div>

          <div className="text-center mb-10">
            <p className="text-syinq-gray mb-6 max-w-2xl mx-auto">
              If you have any questions about our Terms of Service or Privacy Policy, please contact us.
            </p>
            <Button asChild className="bg-syinq-blue hover:bg-syinq-blue/90">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Terms; 