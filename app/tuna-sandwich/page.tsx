'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { CustomEase, CustomBounce, SplitText } from 'gsap/all';

gsap.registerPlugin(CustomEase, CustomBounce, SplitText);

CustomBounce.create('myBounce', {
  strength: 0.6,
  squash: 1.5,
  squashID: 'myBounce-squash'
});

export default function TunaSandwich() {
  const txtRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!txtRef.current) return;

    const splitTxt = new SplitText(txtRef.current, { type: 'chars' }).chars;

    const tl = gsap.timeline({
      defaults: {
        duration: 1.5,
        stagger: { amount: 0.1, ease: 'sine.in' }
      }
    })
      .from(splitTxt, {
        duration: 0.6,
        opacity: 0,
        ease: 'power1.inOut'
      }, 0)
      .from(splitTxt, {
        y: -350,
        ease: 'myBounce'
      }, 0)
      .to(splitTxt, {
        scaleX: 1.8,
        scaleY: 0.7,
        rotate: (i: number) => 15 - 30 * Math.random(),
        ease: 'myBounce-squash',
        transformOrigin: '50% 100%'
      }, 0);

    const handleClick = () => {
      tl.play(0);
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center font-['Poppins'] font-black text-[9vw] text-white">
      <div ref={txtRef} id="txt" className="flex">
        Tuna&nbsp;Sandwich
      </div>
    </div>
  );
}