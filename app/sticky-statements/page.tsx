'use client';

import { useRef } from 'react';
import Head from 'next/head';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function StickyStatementsPage() {
  const statementRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    statementRefs.current.forEach((el) => {
      if (el) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'bottom 70%',
            end: 'bottom center',
            toggleActions: 'play none reverse none',
            scrub: 1,
            markers: true
          }
        });
        tl.to(el, { opacity: 0, yPercent: -10 });
      }
    });
  });

  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap" rel="stylesheet" />
      </Head>
      <section className="relative bg-gradient-to-b from-[rgb(34,193,195)] to-[rgb(253,187,45)]">
        <div ref={(el) => { statementRefs.current[0] = el; }} className="sticky-statement min-h-screen">
          <h1 className="sticky top-[47.5vh] font-['Poppins'] text-white max-w-[600px] mx-auto text-center text-2xl">Statement one</h1>
        </div>
        <div ref={(el) => { statementRefs.current[1] = el; }} className="sticky-statement min-h-screen">
          <h1 className="sticky top-[47.5vh] font-['Poppins'] text-white max-w-[600px] mx-auto text-center text-2xl">Statement two</h1>
        </div>
        <div ref={(el) => { statementRefs.current[2] = el; }} className="sticky-statement min-h-screen">
          <h1 className="sticky top-[47.5vh] font-['Poppins'] text-white max-w-[600px] mx-auto text-center text-2xl">Statement three</h1>
        </div>
      </section>
    </>
  );
}