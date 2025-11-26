'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

export default function TextAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const txt1Ref = useRef<HTMLSpanElement>(null);
  const txt2Ref = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!txt2Ref.current || !txt1Ref.current || !barRef.current || !containerRef.current) return;

    const t2 = new SplitText(txt2Ref.current, { type: 'chars' }).chars;
    const color2 = '#17c0fd';
    const color1 = '#fff';

    const moveBar = () => {
      gsap.set(barRef.current, { left: Number(gsap.getProperty(txt1Ref.current, 'width')) + 1 });
    };

    gsap.timeline({ delay: 0.2 })
      .set(txt1Ref.current, { color: color1, fontWeight: 'normal' })
      .set(txt2Ref.current, { color: color2, fontWeight: 'bold', opacity: 0, x: Number(gsap.getProperty(txt1Ref.current, 'width')) - 2, immediateRender: true })
      .set(barRef.current, { left: 1, backgroundColor: color1, immediateRender: true })
      .to(barRef.current, { duration: 0.1, opacity: 0, ease: 'expo.in', yoyo: true, repeat: 5, repeatDelay: 0.3 }, 0)
      .from(txt1Ref.current, { duration: 1.1, width: 0, ease: 'steps(14)', onUpdate: moveBar }, 2.5)
      .to(barRef.current, { duration: 0.05, backgroundColor: color2 }, '+=0.15')
      .to(barRef.current, { duration: 1.0, width: 290, ease: 'power4.inOut' }, '+=0.1')
      .from(containerRef.current, { duration: 1.0, x: 135, ease: 'power4.inOut' }, '-=1.0')
      .to(txt2Ref.current, { duration: 0.01, opacity: 1 }, '-=0.1')
      .to(barRef.current, { duration: 0.4, x: 290, width: 0, ease: 'power4.in' })
      .from(t2, { duration: 0.6, opacity: 0, ease: 'power3.inOut', stagger: 0.02 }, '-=0.5')
      .to(txt1Ref.current, { duration: 1.5, opacity: 0.25, ease: 'power3.inOut' }, '-=1.2')
      .to(t2.reverse(), { duration: 0.6, opacity: 0, ease: 'power3.inOut', stagger: 0.02 }, '+=1')
      // 🛑 NEW STEP: Remove txt1Ref character by character
      .to(txt1Ref.current, {duration: 1.1, width: 0,ease: `steps(${txt1Ref.current.textContent?.length})`, 
        onUpdate: moveBar // Keep the bar synced as text is removed
      }, '+=0.5'); // Start 0.5 seconds after txt2 has faded

    //   .timeScale(1.45);
  }, []);

  return (
    <div className="w-full h-screen bg-black relative overflow-hidden flex items-center justify-center">
      <div
        ref={containerRef}
        className="text-4xl font-['Red_Hat_Display'] tracking-[1.5px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-10"
      >
        <span ref={txt1Ref} className="inline-block overflow-hidden absolute">
          www.codepen.io/
        </span>
        <span ref={txt2Ref} className="inline-block overflow-hidden absolute">
          creativeocean
        </span>
        <div ref={barRef} className="w-[3px] h-[49px] absolute top-[-1px] bg-white"></div>
      </div>
    </div>
  );
}
