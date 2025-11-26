'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

export default function JelloText() {
  const stageRef = useRef<HTMLDivElement>(null);
  const txtRef = useRef<HTMLHeadingElement>(null);
  const charsRef = useRef<Element[]>([]);
  const numCharsRef = useRef(0);
  const charHRef = useRef(0);

  // Animation parameters
  const weightInit = 600;
  const weightTarget = 400;
  const weightDiff = weightInit - weightTarget;
  const stretchInit = 150;
  const stretchTarget = 80;
  const stretchDiff = stretchInit - stretchTarget;
  const maxYScale = 2.5;
  const elasticDropOff = 0.8;

  let isMouseDown = false;
  let mouseInitialY = 0;
  let mouseFinalY = 0;
  let distY = 0;
  let charIndexSelected = 0;
  let dragYScale = 0;

  const animInTxt = (charsArray: Element[]) => {
    const elem = charsArray[0];
    const rect = elem.getBoundingClientRect();

    gsap.from(charsArray, {
      y: () => -1 * (rect.y + charHRef.current + 500),
      fontVariationSettings: `wght ${weightTarget}, wdth ${stretchTarget}%`,
      scaleY: 2,
      ease: 'elastic(0.2, 0.1)',
      duration: 1.5,
      delay: 0.5,
      stagger: {
        each: 0.05,
        from: 'random'
      },
      onComplete: () => {
        setTimeout(() => {
          if (charsRef.current.length > 0) initEvents();
        }, 100);
      }
    });
  };

  const initEvents = () => {
    const handleMouseUp = (e: MouseEvent) => {
      if (isMouseDown) {
        mouseFinalY = e.clientY;
        isMouseDown = false;
        snapBackText();
        document.body.classList.remove('grab');
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isMouseDown) {
        mouseFinalY = e.clientY;
        calcDist();
        setFontDragDimensions();
      }
    };

    const handleMouseLeave = (event: MouseEvent) => {
      if (event.clientY <= 0 || event.clientX <= 0 ||
          event.clientX >= window.innerWidth || event.clientY >= window.innerHeight) {
        snapBackText();
        isMouseDown = false;
      }
    };

    document.body.addEventListener('mouseup', handleMouseUp);
    document.body.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    charsRef.current.forEach((char, index) => {
      char.addEventListener('mousedown', (e) => {
        mouseInitialY = (e as MouseEvent).clientY;
        charIndexSelected = index;
        isMouseDown = true;
        document.body.classList.add('grab');
      });
    });

    return () => {
      document.body.removeEventListener('mouseup', handleMouseUp);
      document.body.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  };

  const calcDist = () => {
    const maxYDragDist = charHRef.current * (maxYScale - 1);
    distY = mouseInitialY - mouseFinalY;
    dragYScale = distY / maxYDragDist;
    if (dragYScale > (maxYScale - 1)) {
      dragYScale = maxYScale - 1;
    } else if (dragYScale < -0.5) {
      dragYScale = -0.5;
    }
  };

  const setFontDragDimensions = () => {
    gsap.to(charsRef.current, {
      y: (index: number) => {
        const fracDispersion = calcFracDispersion(index);
        return fracDispersion * -50;
      },
      fontVariationSettings: (index: number) => {
        const fracDispersion = calcFracDispersion(index);
        const weight = weightInit - (fracDispersion * weightDiff);
        const stretch = stretchInit - (fracDispersion * stretchDiff);
        return `wght ${weight}, wdth ${stretch}%`;
      },
      scaleY: (index: number) => {
        const fracDispersion = calcFracDispersion(index);
        let scaleY = 1 + fracDispersion;
        if (scaleY < 0.5) scaleY = 0.5;
        return scaleY;
      },
      ease: 'power4',
      duration: 0.6
    });
  };

  const calcFracDispersion = (index: number) => {
    const dispersion = 1 - (Math.abs(index - charIndexSelected) / (numCharsRef.current * elasticDropOff));
    return dispersion * dragYScale;
  };

  const snapBackText = () => {
    gsap.to(charsRef.current, {
      y: 0,
      fontVariationSettings: `wght ${weightInit}, wdth ${stretchInit}%`,
      scale: 1,
      ease: 'elastic(0.35, 0.1)',
      duration: 1,
      stagger: {
        each: 0.02,
        from: charIndexSelected
      }
    });
  };

  useEffect(() => {
    if (!stageRef.current || !txtRef.current) return;

    const mySplitText = new SplitText(txtRef.current, {
      type: 'chars',
      charsClass: 'char',
      position: 'relative'
    });

    const newChars = Array.from(document.querySelectorAll('.char'));
    charsRef.current = newChars;
    numCharsRef.current = newChars.length;
    charHRef.current = txtRef.current.offsetHeight;

    // Set initial styles
    gsap.set(stageRef.current, { autoAlpha: 1 });
    gsap.set(newChars, {
      transformOrigin: 'center bottom'
    });

    // Animate in
    animInTxt(newChars);

    // Resize handler
    const handleResize = () => {
      charHRef.current = txtRef.current?.offsetHeight || 0;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="w-full h-screen bg-[#FF7F99] flex items-center justify-center font-['GT-Flexa'] text-white antialiased cursor-pointer">
      <div ref={stageRef} className="stage grid place-items-center w-full h-full invisible">
        <div className="content text-center">
          <h1
            ref={txtRef}
            className="txt m-0 text-[15vw] font-[600] leading-[0.6] tracking-[-1vw] select-none"
            style={{
              fontVariationSettings: `wght ${weightInit}, wdth ${stretchInit}%`,
              textShadow: '0 0.05em 0 #FFB0C0, 0 0.1em 0.1em rgba(70,0,35,0.3), 0 0.4em 0.3em rgba(70,0,35,0.1)',
              fontStyle: 'italic'
            }}
          >
            Jello
          </h1>
        </div>
      </div>
    </div>
  );
}