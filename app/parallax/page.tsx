'use client';

import { useEffect, useRef } from 'react';
import Head from 'next/head';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function ParallaxPage() {
  const arrowRef = useRef<SVGPolylineElement>(null);
  const skyRef = useRef<SVGImageElement>(null);
  const cloud1Ref = useRef<SVGImageElement>(null);
  const cloud1MaskRef = useRef<SVGGElement>(null);
  const cloud2Ref = useRef<SVGImageElement>(null);
  const cloud3Ref = useRef<SVGImageElement>(null);
  const mountBgRef = useRef<SVGImageElement>(null);
  const mountMgRef = useRef<SVGImageElement>(null);
  const mountFgRef = useRef<SVGImageElement>(null);
  const arrowBtnRef = useRef<SVGRectElement>(null);

  useEffect(() => {
    gsap
      .timeline({
        scrollTrigger:{
          trigger:'.scrollDist',
          start:'0 0',
          end:'100% 100%',
          scrub:1
        }})
      .fromTo(skyRef.current, {y:0},{y:-200}, 0)
      .fromTo([cloud1Ref.current, cloud1MaskRef.current], {y:100},{y:-800}, 0)
      .fromTo(cloud2Ref.current, {y:-150},{y:-500}, 0)
      .fromTo(cloud3Ref.current, {y:-50},{y:-650}, 0)
      .fromTo(mountBgRef.current, {y:-10},{y:-100}, 0)
      .fromTo(mountMgRef.current, {y:-30},{y:-250}, 0)
      .fromTo(mountFgRef.current, {y:-50},{y:-600}, 0);

    const handleMouseEnter = () => {
      gsap.to(arrowRef.current, {y:10, duration:0.8, ease:'back.inOut(3)', overwrite:'auto'});
    };

    const handleMouseLeave = () => {
      gsap.to(arrowRef.current, {y:0, duration:0.5, ease:'power3.out', overwrite:'auto'});
    };

    const handleClick = () => {
      gsap.to(window, {scrollTo:window.innerHeight, duration:1.5, ease:'power1.inOut'});
    };

    const arrowBtn = arrowBtnRef.current;
    if (arrowBtn) {
      arrowBtn.addEventListener('mouseenter', handleMouseEnter);
      arrowBtn.addEventListener('mouseleave', handleMouseLeave);
      arrowBtn.addEventListener('click', handleClick);
    }

    return () => {
      if (arrowBtn) {
        arrowBtn.removeEventListener('mouseenter', handleMouseEnter);
        arrowBtn.removeEventListener('mouseleave', handleMouseLeave);
        arrowBtn.removeEventListener('click', handleClick);
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap" rel="stylesheet" />
      </Head>
      <div className="w-full h-[200vh] bg-gray-900 font-['Montserrat'] text-6xl text-center">
        <div className="scrollDist w-full h-full"></div>
        <main className="fixed bg-white w-full max-w-[1200px] h-full top-0 left-1/2 transform -translate-x-1/2">
          <svg viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
            <mask id="m">
              <g ref={cloud1MaskRef} className="cloud1">
                <rect fill="#fff" width="100%" height="801" y="799" />
                <image xlinkHref="https://assets.codepen.io/721952/cloud1Mask.jpg" width="1200" height="800"/>
              </g>
            </mask>

            <image ref={skyRef} className="sky" xlinkHref="https://assets.codepen.io/721952/sky.jpg" width="1200" height="590" />
            <image ref={mountBgRef} className="mountBg" xlinkHref="https://assets.codepen.io/721952/mountBg.png" width="1200" height="800"/>
            <image ref={mountMgRef} className="mountMg" xlinkHref="https://assets.codepen.io/721952/mountMg.png" width="1200" height="800"/>
            <image ref={cloud2Ref} className="cloud2" xlinkHref="https://assets.codepen.io/721952/cloud2.png" width="1200" height="800"/>
            <image ref={mountFgRef} className="mountFg" xlinkHref="https://assets.codepen.io/721952/mountFg.png" width="1200" height="800"/>
            <image ref={cloud1Ref} className="cloud1" xlinkHref="https://assets.codepen.io/721952/cloud1.png" width="1200" height="800"/>
            <image ref={cloud3Ref} className="cloud3" xlinkHref="https://assets.codepen.io/721952/cloud3.png" width="1200" height="800"/>
            <text fill="#fff" x="350" y="200">EXPLORE</text>
            <polyline ref={arrowRef} className="arrow" fill="#fff" points="599,250 599,289 590,279 590,282 600,292 610,282 610,279 601,289 601,250" />

            <g mask="url(#m)">
              <rect fill="#fff" width="100%" height="100%" />
              <text x="350" y="200" fill="#162a43">FURTHER</text>
            </g>

            <rect ref={arrowBtnRef} id="arrow-btn" width="100" height="100" opacity="0" x="550" y="220" style={{cursor:'pointer'}}/>
          </svg>
        </main>
      </div>
    </>
  );
}