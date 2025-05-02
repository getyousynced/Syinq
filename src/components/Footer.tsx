import React from 'react';
import { Instagram, Twitter, Linkedin, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-syinq-dark mb-4">Syinq</h3>
            <p className="text-syinq-gray mb-6 max-w-md">
              One app for everything you need on campus. Carpooling, marketplace, and community forum 
              designed exclusively for university students.
            </p>
            <div className="flex space-x-4">
              <SocialLink 
                icon={<Instagram size={18} />} 
                href="https://www.instagram.com/_syinq_?igsh=MXJrN3B3bnZ3eXBnbA==" 
                aria-label="Instagram"
              />
              <SocialLink 
                icon={<Twitter size={18} />} 
                href="https://x.com/getyou_synced" 
                aria-label="Twitter"
              />
              <SocialLink 
                icon={<Linkedin size={18} />} 
                href="https://www.linkedin.com/company/rasync" 
                aria-label="LinkedIn"
              />
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-syinq-dark mb-4">Platform</h4>
            <ul className="space-y-3">
              <FooterLink text="Carpooling" href="/#carpooling" />
              <FooterLink text="Marketplace" href="/marketplace" isRouterLink={true} />
              <FooterLink text="Community" href="/#community" />
              <FooterLink text="Security" href="/#security" />
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-syinq-dark mb-4">Company</h4>
            <ul className="space-y-3">
              <FooterLink text="About Syinq" href="/about" isRouterLink={true} />
              <FooterLink text="Contact Us" href="/contact" isRouterLink={true} />
              <FooterLink text="Terms & Privacy" href="/terms" isRouterLink={true} />
              <FooterLink text="FAQ" href="/faq" isRouterLink={true} />
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-syinq-gray mb-4 md:mb-0">
            © {new Date().getFullYear()} Syinq. All rights reserved.
          </p>
          
          <p className="text-sm text-syinq-gray flex items-center">
            Made with <Heart className="h-3 w-3 text-red-500 mx-1" /> for campuses everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ icon, href, ...props }: { icon: React.ReactNode; href: string; [x: string]: any }) => {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-syinq-lightgray flex items-center justify-center text-syinq-dark hover:bg-syinq-blue hover:text-white transition-colors"
      {...props}
    >
      {icon}
    </a>
  );
};

const FooterLink = ({ text, href, isRouterLink = false }: { text: string; href: string; isRouterLink?: boolean }) => {
  if (isRouterLink) {
    return (
      <li>
        <Link to={href} className="text-syinq-gray hover:text-syinq-blue transition-colors">
          {text}
        </Link>
      </li>
    );
  }
  
  return (
    <li>
      <a href={href} className="text-syinq-gray hover:text-syinq-blue transition-colors">
        {text}
      </a>
    </li>
  );
};

export default Footer;
