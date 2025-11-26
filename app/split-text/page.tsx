'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

export default function SplitTextPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const mySplitText = new SplitText(containerRef.current, { type: "chars", position: "relative" });

    gsap.set(mySplitText.chars, { className: 'split-text-char' });

    const tl = gsap.timeline({ yoyo: true, repeat: -1, repeatDelay: 0.5, delay: 1 });

    tl.to(mySplitText.chars, {
      duration: .2,
      fontWeight: 900,
      color: '#146EF5',
      scale: .7,
      y: 6,
      ease: 'power2.in',
      rotation: '360deg',
      stagger: {
        grid: [14, 14],
        amount: .8,
        from: 'center',
      }
    })
    .to(mySplitText.chars, {
      duration: .4,
      fontWeight: 200,
      color: '#fff',
      scale: 1,
      y: 0,
    //   rotation: '720deg',
      ease: 'power3.inOut',
      stagger: {
        grid: [14, 14],
        amount: .8,
        from: 'center'
      }
    }, '-=.3');

    return () => {
      tl.kill();
      mySplitText.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="split-text-body 
    h-screen w-[370px] mx-auto bg-black text-white 
    flex flex-wrap content-center justify-center
    font-spartan text-[30px] leading-[15px] ">
      GSAP × SPLITTEXTGSAP × SPLITTEXTGSAP × SPLITTEXTGSAP × SPLITTEXTGSAP × SPLITTEXTGSAP × SPLITTEXTGSAP × SPLITTEXTGSAP × SPLITTEXTGSAP × SPLITTEXTGSAP × SPLITTEXTGSAP × SPLITTEXTGSAP × SPLITTEXTGSAP × SPLITTEXTGSAP × SPLITTEXTGSAP × SPLITTEXT
    </div>
  );
}