
import React, { useEffect } from 'react';

const ScrollReveal = () => {
  useEffect(() => {
    const handleScrollAnimation = () => {
      const elements = document.querySelectorAll('.reveal-on-scroll');
      
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const isVisible = (elementTop < window.innerHeight - 100) && (elementBottom > 0);
        
        if (isVisible) {
          element.classList.add('visible');
        }
      });
    };
    
    // Run once on load
    handleScrollAnimation();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScrollAnimation);
    
    return () => {
      window.removeEventListener('scroll', handleScrollAnimation);
    };
  }, []);
  
  return null;
};

export default ScrollReveal;
