
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CarPooling from '@/components/Carpooling';
import Marketplace from '@/components/Marketplace';
import Community from '@/components/Community';
import Security from '@/components/Security';
import AppShowcase from '@/components/AppShowcase';
import ComingSoon from '@/components/ComingSoon';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';

const Index = () => {
  useEffect(() => {
    // Update document title
    document.title = "Syinq - One App For Every Campus Move";
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <CarPooling />
      <Marketplace />
      <Community />
      <Security />
      <AppShowcase />
      <ComingSoon />
      <Footer />
      <ScrollReveal />
    </div>
  );
};

export default Index;
