'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { Elastic, Expo, Linear } from 'gsap/all';

gsap.registerPlugin(Draggable);

export default function Thermometer() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const select = (s: string) => svgRef.current?.querySelector(s);
    const selectAll = (s: string) => svgRef.current?.querySelectorAll(s);

    const liquid = selectAll('.liquid') as NodeListOf<SVGUseElement>;
    const tubeShine = select('.tubeShine') as SVGLineElement;
    const label = select('.label') as SVGTextElement;
    const follower = select('.follower') as SVGCircleElement;
    const dragger = select('.dragger') as SVGGElement;
    const dragTip = select('.dragTip') as SVGPathElement;
    const liquid0 = liquid[0]; // The first <use> element
    const liquid1 = liquid[1]; // The second <use> element

    const minDragY = -380;
    let liquidId = 0;
    const step = Math.abs(minDragY / 100);
    const snap = Math.abs(minDragY / 10);
    let followerVY = 0;

    gsap.set(dragTip, {
      transformOrigin: '20% 50%'
    });

    // const tl = gsap.timeline();
    // tl.to(liquid, {
    //   duration: 0.7,
    //   x: '-=200',
    //   ease: Linear.easeNone,
    //   repeat: -1,
    //   stagger: 0.9
    // });


    const waveDuration = 0.7; // Standard duration

    const tl = gsap.timeline();

    // Wave 1: Starts at t=0
    tl.to(liquid0, {
    duration: waveDuration,
    x: '-=200',
    ease: Linear.easeNone,
    repeat: -1
    }, 0); // Start at time 0 of the timeline

    // Wave 2: Starts slightly offset (e.g., half-way through Wave 1's duration)
    // This creates a continuous, offset movement
    tl.to(liquid1, {
    duration: waveDuration,
    x: '-=200',
    ease: Linear.easeNone,
    repeat: -1
    }, waveDuration / 2); // Start at 0.35 seconds, giving a 50% phase offset

    tl.time(100);

    Draggable.create(dragger, {
      type: 'y',
      bounds: { minY: minDragY, maxY: 0 },
      onDrag: onUpdate,
      throwProps: true,
      throwResistance: 2300,
      onThrowUpdate: onUpdate,
      overshootTolerance: 0,
      snap: function(value: number) {
        // Use this to snap the values to steps of 10
        // return Math.round(value/snap) * snap
        return value;
      }
    });

    function onUpdate() {
      const transform = gsap.getProperty(dragger, 'y') as number;
      liquidId = Math.abs(Math.round(transform / step));

      if (label) {
        label.textContent = liquidId + '°';
      }
      gsap.to(liquid, {
        duration: 1.3,
        y: transform * 1.12,
        ease: Elastic.easeOut.config(1, 0.4)
      });
    }

    gsap.to(follower, {
      duration: 1,
      y: '+=0',
      repeat: -1,
      modifiers: {
        y: function(y, count) {
          const draggerY = gsap.getProperty(dragger, 'y') as number;
          const followerY = gsap.getProperty(follower, 'y') as number;
          followerVY += (draggerY - followerY) * 0.23;
          followerVY *= 0.69;
          return followerY + followerVY;
        }
      }
    });

    gsap.to(dragTip, {
      duration: 1,
      rotation: '+=0',
      repeat: -1,
      modifiers: {
        rotation: function(rotation, count) {
          return rotation - followerVY;
        }
      }
    });

    gsap.to(label, {
      duration: 1,
      y: '+=0',
      repeat: -1,
      modifiers: {
        y: function(y, count) {
          return y - followerVY * 0.5;
        }
      }
    });

    gsap.to(dragger, {
      duration: 1.4,
      y: minDragY / 2,
      onUpdate: onUpdate,
      ease: Expo.easeInOut
    });
  }, []);

  return (
    <div className="h-screen w-screen bg-yellow-100 flex items-center justify-center overflow-hidden">
      <svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 800 600"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="liquidGrad" x1="557" y1="150" x2="557" y2="546" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#FF0909"/>
            <stop offset="0.2" stopColor="#F3481A"/>
            <stop offset="0.5" stopColor="#FABA2C"/>
            <stop offset="1" stopColor="#00BCF2"/>
          </linearGradient>
          <rect id="tube" x="357" y="150" width="86" height="400" rx="43" ry="43"/>
          <clipPath id="liquidMask">
            <use xlinkHref="#tube" className="liquidMask" />
          </clipPath>
          <clipPath id="tubeMask">
            <use xlinkHref="#tube" className="liquidMask" />
          </clipPath>
          <path id="liquid" d="M757,552v490H357V552c50,0,50,20,100,20s50-20,100-20,50,20,100,20S707,552,757,552Z" />
          <mask id="gradMask">
            <use xlinkHref="#liquid" className="liquid" x="0" fill="#FCEFD6" />
            <use xlinkHref="#liquid" className="liquid" x="0" fill="#EEE" opacity="0.7"/>
          </mask>
        </defs>

        <g className="whole" transform="translate(0, -40)">
          <use xlinkHref="#tube" className="tubeBg" fill="#C8D9D3" opacity="0.61"/>

          <g className="dragger" transform="translate(-6, 0)">
            <circle cx="294" cy="540" r="36" fill="#3A3335"/>
            <path className="dragTip" d="M315.5,556.76,299.24,540.5l16.26-16.26,36.26,16.26Z" fill="#3A3335"/>
            <text className="label" x="275" y="551">100</text>
          </g>

          <g mask="url(#gradMask)">
            <use xlinkHref="#tube" fill="url(#liquidGrad)" />
          </g>
          <line className="tubeShine" x1="371" y1="200" x2="371" y2="443" fill="none" stroke="#FFF" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="8" opacity="0.21" strokeDasharray="153 30" strokeDashoffset="-20"/>
          <g className="measurements" fill="none" stroke="#FCEFD6" strokeWidth="3" strokeLinecap="round" opacity="1">
            <line x1="358" y1="196" x2="370" y2="196" />
            <line x1="358" y1="234" x2="370" y2="234" />
            <line x1="358" y1="273" x2="370" y2="273" />
            <line x1="358" y1="311" x2="370" y2="311" />
            <line x1="358" y1="350" x2="370" y2="350" />
            <line x1="358" y1="388" x2="370" y2="388" />
            <line x1="358" y1="426" x2="370" y2="426" />
            <line x1="358" y1="465" x2="370" y2="465" />
            <line x1="358" y1="503" x2="370" y2="503" />
          </g>

          <circle className="follower" cx="400" cy="540" r="0" fill="#62B6CB" fillOpacity="1" stroke="#FCEFD6" strokeWidth="0"/>
        </g>
      </svg>
    </div>
  );
}