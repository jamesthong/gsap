'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Head from 'next/head';

gsap.registerPlugin(ScrollTrigger);

export default function RotationPage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const tubeRef = useRef<HTMLDivElement>(null);
  const tubeInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const tubeInner = tubeInnerRef.current;
    const numLines = 10;
    const fontSize = 4;
    const angle = 360 / numLines;
    let radius = 0;
    let origin = '50% 50% 0px';

    const set3D = () => {
      const width = window.innerWidth;
      const fontSizePx = (width / 100) * fontSize;
      radius = (fontSizePx / 2) / Math.sin((180 / numLines) * (Math.PI / 180));
      origin = `50% 50% -${radius}px`;
    };

    set3D();

    // Clone lines
    const firstLine = tubeInner?.querySelector('.line') as HTMLElement;
    if (firstLine && tubeInner) {
      for (let i = 1; i < numLines; i++) {
        const clone = firstLine.cloneNode(true) as HTMLElement;
        clone.classList.add(`line--${i + 1}`);
        tubeInner.appendChild(clone);
      }
      firstLine.classList.add('line--1');
    }

    const positionTxt = () => {
      gsap.set('.line', {
        rotationX: (index: number) => -angle * index,
        z: radius,
        transformOrigin: origin
      });
    };

    positionTxt();

    const setProps = (targets: Element[]) => {
      targets.forEach((target) => {
        const paramSet = gsap.quickSetter(target, 'css');
        const degrees = gsap.getProperty(target, 'rotateX') as number;
        const radians = degrees * (Math.PI / 180);
        const conversion = Math.abs(Math.cos(radians) / 2 + 0.5);
        const fontW = 200 + 700 * conversion;
        const fontS = `${100 + 700 * conversion}%`;

        paramSet({
          opacity: conversion + 0.1,
          fontWeight: fontW,
          fontStretch: fontS
        });
      });
    };

    setProps(gsap.utils.toArray('.line'));

    gsap.to('.line', {
      scrollTrigger: {
        trigger: '.stage',
        scrub: 1,
        start: 'top top'
      },
      rotateX: '+=1080',
      onUpdate: function() {
        setProps(this.targets());
      }
    });

    gsap.to('.tube', {
      scrollTrigger: {
        trigger: '.stage',
        scrub: 1,
        start: 'top top'
      },
      perspective: '1vw',
      ease: 'expo.out'
    });

    gsap.to(stage, { autoAlpha: 1, duration: 2, delay: 2 });

    const handleResize = () => {
      set3D();
      positionTxt();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      <Head>
        <style>{`
          @font-face {
            font-family: 'Bandeins-Strange';
            src: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/61488/BandeinsStrangeVariableGX.ttf') format('truetype');
            font-stretch: 100% 800%;
            font-weight: 200 800;
            font-display: block;
          }
        `}</style>
      </Head>
      <div className="w-full h-[1000vh] bg-black text-white" style={{ fontFamily: 'Bandeins-Strange' }}>
        <div ref={stageRef} className="stage flex items-center justify-center w-full h-screen" style={{ visibility: 'hidden' }}>
          <div ref={tubeRef} className="tube fixed top-[50vh] left-[50vw]" style={{ perspective: '100vw' }}>
            <div ref={tubeInnerRef} className="tube__inner relative" style={{ transformStyle: 'preserve-3d' }}>
              <h1 className="line absolute top-1/2 left-1/2 m-0 font-bold uppercase leading-none" style={{
                transform: 'translate(-50%, -50%)',
                fontSize: 'calc(4 * 1vw)',
                fontStretch: '800%',
                fontWeight: '800',
                transformStyle: 'preserve-3d'
              }}>
                Rotation
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}