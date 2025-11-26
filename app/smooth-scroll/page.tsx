'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

export default function SmoothScrollPage() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const splitStaggerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!wrapperRef.current || !contentRef.current) return;

    // create the smooth scroller FIRST!
    const smoother = ScrollSmoother.create({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      smooth: 1,
      normalizeScroll: true, // prevents address bar from showing/hiding on most devices, solves various other browser inconsistencies
      ignoreMobileResize: true, // skips ScrollTrigger.refresh() on mobile resizes from address bar showing/hiding
      effects: true
    });

    gsap.set(".heading", {
      yPercent: -150,
      opacity: 1
    });

    const tl = gsap.timeline();
    const mySplitText = new SplitText(splitStaggerRef.current, { type: "words,chars" });
    const chars = mySplitText.chars;

    chars.forEach((char, i) => {
      smoother.effects(char, { speed: 1, lag: (i + 1) * 0.1 });
    });

    return () => {
      smoother.kill();
      tl.kill();
    };
  }, []);

  return (
    <div id="wrapper" ref={wrapperRef} className="bg-black text-white overflow-x-hidden">
      <section id="content" ref={contentRef} className="px-6">
        {/* smooth scrolling biz goes in here */}
        <div className="heading  opacity-0 z-20" aria-hidden="true">
          <p className="font-['wild_worldbold'] text-[15.5vw] text-left leading-[0.67] m-0 text-black stroke-white stroke-1">smooooth</p>
          <div className="text-container relative">
            <p className="absolute top-0 left-0 right-0 z-[999] text-transparent text-left">scrolling</p>
            <p className="absolute top-0 left-0 right-0 z-[999] text-white text-left" data-speed="0.95">scrolling</p>
            <p className="absolute top-0 left-0 right-0 z-[999] text-transparent text-left" data-speed="0.9">scrolling</p>
            <p className="absolute top-0 left-0 right-0 z-[999] text-transparent text-left" data-speed="0.85">scrolling</p>
            <p className="absolute top-0 left-0 right-0 z-[999] text-transparent text-left" data-speed="0.8">scrolling</p>
            <p className="absolute top-0 left-0 right-0 z-[999] text-transparent text-left" data-speed="0.75">scrolling</p>
            <p className="absolute top-0 left-0 right-0 z-[999] text-transparent text-left" data-speed="0.7">scrolling</p>
          </div>
        </div>

        <section className="grid grid-cols-3 grid-rows-3 gap-[0.2rem] w-[70vw] mx-auto pt-[40vh] -z-10">
          <div className="relative aspect-square overflow-hidden" data-speed="1">
            <img className="absolute inset-0 object-cover" data-speed="auto" src="https://images.unsplash.com/photo-1556856425-366d6618905d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fG5lb258ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60" alt="" />
          </div>
          <div className="relative col-start-3 row-start-2 aspect-square overflow-hidden" data-speed="1.7">
            <img className="absolute inset-0 object-cover" data-speed="auto" src="https://images.unsplash.com/photo-1520271348391-049dd132bb7c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" alt="" />
          </div>
          <div className="relative col-start-2 row-start-3 aspect-square overflow-hidden" data-speed="1.5">
            <img className="absolute inset-0 object-cover" data-speed="auto" src="https://images.unsplash.com/photo-1609166214994-502d326bafee?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" alt="" />
          </div>
        </section>

        <section className="text-center flex items-center justify-center flex-col min-h-[50vh] space-y-8">
          <h1 className="text-[clamp(12px,8vw,100px)] leading-[0.67] font-['wild_worldbold'] m-0">
            <span className="text-[clamp(12px,3vw,40px)] font-normal" aria-hidden="true">with </span>
            GSAP scrollsmoother
          </h1>
          <p className="leading-[1.35]">Seamlessly integrated with GSAP and ScrollTrigger. Leveraging native scrolling - no "fake" scrollbars or event hijacking.</p>
        </section>

        <section className="flex flex-wrap gap-x-16">
          <div className="flex-1 min-w-[300px] flex flex-col justify-center items-start">
            <div className="space-y-4">
              <h2 className="text-xl font-medium">Speed Control</h2>
              <p className="text-sm leading-[1.35]">Animate elements along at different speeds, slow them down or make them whizz past.</p>
            </div>
          </div>

          <div className="flex-1 min-w-[500px] flex w-full h-[60vh] items-end">
            <div className="rounded-[10px] mx-[2vw] text-center flex-1 font-['wild_worldbold'] text-[clamp(16px,3vw,36px)]" data-speed="0.8">
              <p>0.8</p>
            </div>
            <div className="rounded-[10px] mx-[2vw] text-center flex-1 font-['wild_worldbold'] text-[clamp(16px,3vw,36px)]" data-speed="0.9">
              <p>0.9</p>
            </div>
            <div className="rounded-[10px] mx-[2vw] text-center flex-1 font-['wild_worldbold'] text-[clamp(16px,3vw,36px)]" data-speed="1">
              <p>1</p>
            </div>
            <div className="rounded-[10px] mx-[2vw] text-center flex-1 font-['wild_worldbold'] text-[clamp(16px,3vw,36px)]" data-speed="1.1">
              <p>1.1</p>
            </div>
            <div className="rounded-[10px] mx-[2vw] text-center flex-1 font-['wild_worldbold'] text-[clamp(16px,3vw,36px)]" data-speed="1.2">
              <p>1.2</p>
            </div>
          </div>
        </section>

        <section className="flex items-center">
          <div className="relative h-[500px] w-full max-h-[500px] overflow-hidden">
            <img className="absolute bottom-0 w-full h-[180%] object-cover" data-speed="auto" src="https://assets.codepen.io/756881/smoothscroller-1.jpg" alt="" />
          </div>
        </section>

        <section className="flex flex-wrap items-center gap-x-16">
          <div className="flex-1 min-w-[300px]">
            <div className="space-y-4">
              <h2 className="text-xl font-medium">Add some lag (the good kind!)</h2>
              <p className="text-sm leading-[1.35]">loosen the connection to the scroll to give a feeling of 'follow through.'</p>
            </div>
          </div>

          <div className="flex-1 min-w-[500px] flex items-center justify-center">
            <h3 id="split-stagger" ref={splitStaggerRef} className="font-['wild_worldbold'] text-[clamp(16px,6vw,80px)] tracking-[0.03em]">stagger...</h3>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-x-4 gap-y-[5rem] items-center justify-items-center pt-[10rem] pb-[10rem]">
          <div className="col-start-2 row-start-1">
            <div className="space-y-4">
              <h2 className="text-xl font-medium">Easy parallax image effects</h2>
              <p className="text-sm leading-[1.35]">Pop your images in a container with overflow hidden, size them a little larger than the container and set data-speed to auto. GSAP does the rest.</p>
            </div>
          </div>

          <div className="relative h-[80vh] overflow-hidden col-start-1 row-start-1 w-full">
            <img className="absolute inset-0 w-full h-full object-cover" data-speed="auto" src="https://assets.codepen.io/756881/neon3.jpg" alt="" />
          </div>
          <div className="relative h-[80vh] overflow-hidden col-start-2 row-start-2">
            <img className="absolute inset-0 w-full h-full object-cover" data-speed="auto" src="https://assets.codepen.io/756881/neon2.jpg" alt="" />
          </div>
        </section>

        <section className="min-h-[50vh] flex items-center justify-center"></section>
      </section>
    </div>
  );
}
