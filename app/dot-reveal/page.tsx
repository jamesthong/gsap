'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function DotRevealPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const markRef = useRef<HTMLSpanElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !titleRef.current || !markRef.current || !dotRef.current) return;

    gsap.set(dotRef.current, {
      width: "142vmax",
      height: "142vmax",
      xPercent: -50,
      yPercent: -50,
      top: "50%",
      left: "50%"
    });

    const tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
        pin: sectionRef.current,
        pinSpacing: true,
        invalidateOnRefresh: true,
      },
      defaults: { ease: "none" }
    });

    tl1
      .to(titleRef.current, { opacity: 1 })
      .fromTo(dotRef.current, {
          scale: 0,
          x: () => {
            const markBounds = markRef.current!.getBoundingClientRect(),
                px = markBounds.left + markBounds.width * 0.54;
            return px - sectionRef.current!.getBoundingClientRect().width / 2;
          },
          y: () => {
             const markBounds = markRef.current!.getBoundingClientRect(),
                py = markBounds.top + markBounds.height * 0.73;
            return py - sectionRef.current!.getBoundingClientRect().height / 2;
          }
       }, {
        x: 0,
        y: 0,
        ease: "power3.in",
        scale: 1
    });
  });

  return (
    <section ref={sectionRef} id="section" className="relative h-screen flex items-center justify-center">
      <img src="https://lumiere-a.akamaihd.net/v1/images/sa_pixar_virtualbg_coco_16x9_9ccd7110.jpeg" alt="" className="absolute inset-0 w-full h-full object-cover" />
      <p ref={titleRef} id="title" className="text-[100px] text-center relative font-black text-white opacity-0 left-[200px]">
        TITLE <span ref={markRef}>?</span>
      </p>
      <div ref={dotRef} className="dot absolute bg-white w-0 h-0 rounded-full"></div>
    </section>
  );
}