'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

export default function VariableFontAnimation() {
  const quoteRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!quoteRef.current) return;

    const split = new SplitText(quoteRef.current, { type: 'words,chars' });
    const words = split.words;

    gsap.timeline()
      .to(words, {
        duration: 7,
        fontVariationSettings: 'wght 300',
        ease: 'power3.out',
        color: 'hsl(+=0, +=70%, +=20%)',
        stagger: {
          each: 0.1,
        }
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#1b1b1d] flex items-center p-4 relative">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 filter invert pointer-events-none z-50"
        style={{
          backgroundImage: 'url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/756881/texture.svg)'
        }}
      ></div>
      <h2
        ref={quoteRef}
        id="quote"
        className="text-6xl md:text-7xl lg:text-8xl font-['Marvin_Visions_Variable'] font-light leading-tight text-left text-[hsl(347,7%,29%)] m-0"
        style={{
          fontVariationSettings: "'wght' 1",
          lineHeight: 0.8
        }}
      >
        The ships hung in the sky<br />
        much in the same way<br />
        that bricks don't.
      </h2>
    </div>
  );
}