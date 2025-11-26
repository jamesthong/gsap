'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';

const FlipMenuButton: React.FC = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const bgRef = useRef<HTMLSpanElement>(null);
  const [isBig, setIsBig] = useState(false);

  // Handle click
  const handleClick = useCallback(() => {
    const bg = bgRef.current;
    if (!bg) return;

    // Get button position
    const buttonRect = buttonRef.current?.getBoundingClientRect();
    if (!buttonRect) return;

    const startX = buttonRect.left;
    const startY = buttonRect.top;
    const startWidth = buttonRect.width;
    const startHeight = buttonRect.height;

    // Toggle state first
    const newIsBig = !isBig;
    setIsBig(newIsBig);

    if (newIsBig) {
      // EXPAND animation
      gsap.fromTo(bg, 
        {
          width: startWidth,
          height: startHeight,
          borderRadius: '8px',
          position: 'fixed',
          // top: startY,
          // left: startX,
          x: startX,
          y: startY
        },
        {
          width: window.innerWidth,
          height: window.innerHeight,
          borderRadius: '0px',
          position: 'fixed',
          // top: 0,
          // left: 0,
          x: 0,
          y: 0,
          duration: 2,
          ease: "expo.inOut"
        }
      );
    } else {
      // SHRINK animation
      gsap.fromTo(bg, 
        {
          width: window.innerWidth,
          height: window.innerHeight,
          borderRadius: '0px',
          position: 'fixed',
          // top: 0,
          // left: 0,
          x: 0,
          y: 0
        },
        {
          width: startWidth,
          height: startHeight,
          borderRadius: '8px',
          position: 'fixed',
          // top: startY,
          // left: startX,
          x: startX,
          y: startY,
          duration: 0.8,
          ease: "expo.inOut"
        }
      );
    }
  }, [isBig]);

  // Attach click listener
  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    button.addEventListener('click', handleClick);
    return () => button.removeEventListener('click', handleClick);
  }, [handleClick]);

  // Optional: kill tweens on unmount
  useEffect(() => {
    return () => {
      gsap.killTweensOf("*");
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 relative">


      {/* Mobile responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .menu-button {
            height: 60px !important;
            width: 60px !important;
          }
        }
      `}</style>

      {/* Menu Button */}
      <div className="fixed top-4 right-4">
        <button
          ref={buttonRef}
          className="menu-button h-20 w-20 flex items-center justify-center text-black border-0 bg-transparent relative"
        >
          <span className="menu-text font-medium z-10">menu</span>
          <span
            ref={bgRef}
            className="menu-background absolute inset-0 -z-10 rounded-lg bg-blue-200"
          />
        </button>
      </div>
    </div>
  );
};

export default FlipMenuButton;