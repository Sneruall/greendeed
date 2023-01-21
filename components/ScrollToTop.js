import React, { useEffect, useState } from 'react';
import { IoArrowUpCircle } from 'react-icons/io5';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Top: 0 takes us all the way back to the top of the page
  // Behavior: smooth keeps it smooth!
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    // Button is displayed after scrolling for 500 pixels
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  //scroll-to-top classes: fixed, bottom:0, right:0
  return (
    <div className="fixed bottom-0 right-0">
      {isVisible && (
        <div
          onClick={scrollToTop}
          className="relative m-3 h-10 w-10 opacity-75 hover:cursor-pointer hover:opacity-100"
        >
          <IoArrowUpCircle className="relative z-50 h-full w-full text-custom-brown1" />
          <div className="absolute top-1/2 left-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-white"></div>
        </div>
      )}
    </div>
  );
}
