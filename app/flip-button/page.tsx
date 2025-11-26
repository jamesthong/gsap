'use client';

import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(Flip);

const FlipGrowShrinkButton: React.FC = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isRight, setIsRight] = useState(false);

  const handleClick = () => {
    // Capture the current layout state
    const state = Flip.getState(buttonRef.current!);

    // Toggle logical state (this changes position + scale class)
    setIsRight((prev) => !prev);

    // Animate from the previous state to the new one
    requestAnimationFrame(() => {
      Flip.from(state, {
        duration: 1,
        ease: 'power2.inOut',
        scale: true,
      });
    });
  };

  return (
    <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
      <button
        ref={buttonRef}
        onClick={handleClick}
        className={`absolute mt-10 rounded-full text-white font-semibold shadow-lg px-6 py-3 transition-colors duration-300 ${
          isRight
            ? 'right-8 bg-blue-500 h-30 w-60 text-3xl'
            : 'left-8 bg-green-500 h-20 w-30 text-sm'
        }`}
      >
        {isRight ? 'Shrink Left' : 'Grow Right'}
      </button>
    </div>
  );
};

export default FlipGrowShrinkButton;
