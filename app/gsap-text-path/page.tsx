'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MotionPathPlugin, SplitText } from 'gsap/all';

gsap.registerPlugin(MotionPathPlugin, SplitText);

export default function GSAPTextPath() {
  const containerRef = useRef<HTMLDivElement>(null);
  const txtRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!containerRef.current || !txtRef.current) return;

    const txt = txtRef.current;
    const tContent = txt.textContent || '';
    let ntContent = '';

    function duplicateContent() {
      for (let i = 0; i < 26; i++) {
        ntContent = ntContent + tContent;
      }
    }

    function reverseString(str: string) {
      return str.split('').reverse().join('');
    }

    function initLongText() {
      txt.textContent = reverseString(ntContent);
      const mySplitText = new SplitText(txt, {
        type: 'chars',
        charsClass: 'char',
        position: 'relative'
      });
      const chars = gsap.utils.toArray('.char');
      gsap.set(chars, {  transformOrigin: '50% 50%' });
      gsap.set(containerRef.current, { autoAlpha: 1 });
      return chars;
    }

    function animateText(chars: any[]) {
      const tl = gsap.timeline();
      tl.to(chars, {
        motionPath: {
          path: '.svg-char__path',
          align: '.svg-char__path',
          autoRotate: true,
          start: 0.37,
          end: 1.37
        },
        stagger: {
          each: 0.12,
          repeat: -1
        },
        duration: 15,
        ease: 'none'
      });
    }

    duplicateContent();
    const chars = initLongText();
    animateText(chars);
  }, []);

  return (
    <div className="w-full h-screen bg-black text-white font-['Raleway'] text-[18px] flex items-center justify-center overflow-hidden">
      <div ref={containerRef} className="container relative w-[500px] h-[500px] invisible">
        <svg className="svg-char absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
          <path
            className="svg-char__path"
            fill="none"
            d="M436.9,125.12l-96,82.8q37.8,12,58.8,39t21,63.6q0,44.4-27.9,80.4t-76.5,56.4q-48.6,20.39-108.6,20.4a349.26,349.26,0,0,1-87.9-10.8q-41.71-10.8-74.1-33l64.2-98.4a196.69,196.69,0,0,0,52.2,22.8,206.53,206.53,0,0,0,55.2,7.8q29.38,0,45-9.3t15.6-26.7q0-25.2-42-25.2H177.7l17.4-87,73.2-63H119.5l21.6-106.8H454.3Z"
          />
        </svg>
        <p ref={txtRef} className="txt absolute left-[-10000px] text-[16px]">. GSAP </p>
      </div>

      <div className="collection fixed top-6 right-6 z-50 flex flex-col">
        <a
          className="collection__link relative mb-4 text-white font-['Helvetica'] text-[16px] no-underline"
          href="https://codepen.io/collection/02388423440b98155f8e4002bde094f2"
          target="_blank"
        >
          The GSAP 3 collection
          <span className="block absolute bottom-[-3px] left-0 h-[1px] w-[10%] bg-white transition-all duration-300 hover:w-full"></span>
        </a>
      </div>

      {/* <a href="https://greensock.com" target="_blank">
        <img
          className="gsap-3-logo fixed bottom-4 right-4 w-[20vw] max-w-[150px]"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/16327/gsap-3-logo.svg"
          width="150"
          alt="GSAP 3 Logo"
        />
      </a> */}
    </div>
  );
}