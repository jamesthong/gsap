'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

export default function Tastebreakers() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tubeRef = useRef<HTMLDivElement>(null);
  const cloneRef = useRef<HTMLHeadingElement>(null);
  const finalWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !tubeRef.current || !cloneRef.current || !finalWrapRef.current) return;

    // Clone elements as per original code
    const finalClone = cloneRef.current.cloneNode(true) as HTMLHeadingElement;
    finalClone.classList.add('final');
    finalWrapRef.current.appendChild(finalClone);

    for (let i = 0; i < 2; i++) {
      const newClone = cloneRef.current.cloneNode(true) as HTMLHeadingElement;
      const lineClass = `line${i + 2}`;
      tubeRef.current.appendChild(newClone);
      const clones = tubeRef.current.querySelectorAll('h1');
      clones[i].classList.add('line');
      clones[i + 1].classList.add(lineClass);
    }
    const firstClone = tubeRef.current.querySelector('h1') as HTMLHeadingElement;
    firstClone.classList.add('line1');

    // Show container
    gsap.set(containerRef.current, { visibility: 'visible' });

    // Get elements
    const lines = document.getElementsByClassName('line');
    const line1 = document.getElementsByClassName('line1')[0];
    const line2 = document.getElementsByClassName('line2')[0];
    const line3 = document.getElementsByClassName('line3')[0];
    const final = document.getElementsByClassName('final')[0];

    // Split text
    const splitLine1 = new SplitText(line1, { type: 'chars', charsClass: 'char' });
    const splitLine2 = new SplitText(line2, { type: 'chars', charsClass: 'char' });
    const splitLine3 = new SplitText(line3, { type: 'chars', charsClass: 'char' });
    const splitFinal = new SplitText(final, { type: 'chars', charsClass: 'char' });

    // Set up vars
    const animTime = 0.9;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const depth = -width / 8;
    const tOrigin = `50% 50% ${depth}`;

    // Init 3D perspective
    gsap.set([lines, final], { perspective: 700, transformStyle: 'preserve-3d' });

    // Animate Timeline
    const linesTL = gsap.timeline();
    linesTL
      .fromTo(splitLine1.chars, { rotationX: -90 }, { rotationX: 90, ease: 'none', transformOrigin: tOrigin, stagger: 0.08 }, 0)
      .fromTo(splitLine2.chars, { rotationX: -90 }, { rotationX: 90, ease: 'none', transformOrigin: tOrigin, stagger: 0.08 }, 0.45)
      .fromTo(splitLine3.chars, { rotationX: -90 }, { rotationX: 90, ease: 'none', transformOrigin: tOrigin, stagger: 0.08 }, 0.9)
      .fromTo(splitFinal.chars, { rotationX: -90, opacity: 0 }, { rotationX: 0, opacity: 1, ease: 'expo.out', transformOrigin: tOrigin, stagger: 0.06 }, 1.6)
      .fromTo(final, { y: height / 6, opacity:0 }, { y: -height / 6, ease: 'none',opacity:1 }, 2.0);

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const sxPos = ((e.pageX / width) * 100 - 50) * 2;
      const syPos = ((e.pageY / height) * 100 - 50) * 2;
      gsap.to(finalWrapRef.current, {
        duration: 3,
        rotationY: 0.04 * sxPos,
        rotationX: -0.04 * syPos,
        transformOrigin: 'center center -800',
        ease: 'expo.out'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="w-full h-screen bg-[#191414] text-[#F59B23] font-['Montserrat'] flex items-center justify-center overflow-hidden">
      <div ref={containerRef} className="container w-full h-full flex items-center justify-center invisible">
        <div ref={tubeRef} className="tube relative w-full h-[24vw]">
          <h1 ref={cloneRef} className="clone absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[18vw] leading-none tracking-[-0.6vw] whitespace-nowrap text-center m-0">
            Tastebreakers
          </h1>
        </div>
        <div ref={finalWrapRef} className="final__wrap absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {/* Final element will be cloned here */}
        </div>
      </div>
    </div>
  );
}