'use client';

import { useRef } from 'react';
import Head from 'next/head';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function ScrollyImagesPage() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

useGSAP(() => {
  const skewSetter = gsap.quickTo("img", "skewY");
  const clamp = gsap.utils.clamp(-20, 20);

  ScrollSmoother.create({
    wrapper: wrapperRef.current!,
    content: contentRef.current!,
    smooth: 2,
    speed: 3,
    effects: true, // enables data-speed
    onUpdate: self => skewSetter(clamp(self.getVelocity() / -50)),
    onStop: () => skewSetter(0),
  });
}, { scope: contentRef });

  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Termina:wght@400;700;900&display=swap" rel="stylesheet" />
      </Head>
      <style>{`
        body {
          margin: 0;
          background-color: #1a1721;
          color: white;
          overscroll-behavior: none;
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }

        #wrapper {
          overflow: hidden;
          position: fixed;
          height: 100%;
          width: 100%;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }

        #content {
          overflow: visible;
          width: 100%;
        }

        .text {
          position: fixed;
          top: 50vh;
          font-family: termina, sans-serif;
          font-weight: 900;
          font-style: normal;
          font-size: 8vw;
          text-align: center;
          width: 100%;
          transform: translateY(-100%);
          z-index: 2;
          color: white;
          -webkit-text-stroke-width: 1.5px;
          -webkit-text-stroke-color: white;
          z-index: -2;
        }

        .outline-text {
          color: transparent;
          -webkit-text-stroke-width: 1.5px;
          -webkit-text-stroke-color: white;
          z-index: 2;
        }

        .filter-text {
          mix-blend-mode: screen;
          color: #804691;
          z-index: 2;
        }

        .images {
          padding-top: 60vh;
          position: relative;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          min-height: 150vh;
          height: 100%;
          display: grid;
          grid-template-columns: repeat(20, 2%);
          grid-template-rows: repeat(30, 3%);
          justify-content: center;
          justify-items: center;
          align-items: center;
          z-index: 1;
          object-fit: cover;
        }

        .content__slide-item {
          width: 100%;
          height: 100%;
          position: relative;
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        img:nth-child(1) {
          grid-area: 1/1/6/8;
        }

        img:nth-child(2) {
          grid-area: 3/12/8/20;
        }

        img:nth-child(3) {
          grid-area: 9/5/13/15;
        }

        img:nth-child(4) {
          grid-area: 14/1/18/8;
        }

        img:nth-child(5) {
          grid-area: 16/12/20/19;
        }

        img:nth-child(6) {
          grid-area: 20/2/25/9;
        }

        img:nth-child(7) {
          grid-area: 22/11/24/20;
        }

        img:nth-child(8) {
          grid-area: 26/5/30/15;
        }
      `}</style>
      <h1 className="text">Scrolly Images</h1>
      <h1 aria-hidden="true" className="text outline-text">Scrolly Images</h1>
      <h1 aria-hidden="true" className="text filter-text">Scrolly Images</h1>

      <div ref={wrapperRef} id="wrapper">
        <section ref={contentRef} id="content">
          <section className="images">
            <img data-speed="0.8" src="https://images.unsplash.com/photo-1556856425-366d6618905d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fG5lb258ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60" alt="" />
            <img data-speed="0.9" src="https://images.unsplash.com/photo-1520271348391-049dd132bb7c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" alt="" />
            <img data-speed="1" src="https://images.unsplash.com/photo-1609166214994-502d326bafee?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" alt="" />
            <img data-speed="1.1" src="https://images.unsplash.com/photo-1589882265634-84f7eb9a3414?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=434&q=80" alt="" />
            <img data-speed="0.9" src="https://images.unsplash.com/photo-1514689832698-319d3bcac5d5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=434&q=80" alt="" />
            <img data-speed="1.2" src="https://images.unsplash.com/photo-1535207010348-71e47296838a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" alt="" />
            <img data-speed="0.8" src="https://images.unsplash.com/photo-1588007375246-3ee823ef4851?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fG5lb258ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60" alt="" />
            <img data-speed="1" src="https://images.unsplash.com/photo-1571450669798-fcb4c543f6a4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fG5lb258ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60" alt="" />
          </section>
        </section>
      </div>
    </>
  );
}