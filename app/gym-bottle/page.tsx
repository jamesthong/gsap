'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { Elastic, Linear } from 'gsap/all';

gsap.registerPlugin(Draggable, DrawSVGPlugin);

export default function GymBottle() {
  const svgRef = useRef<SVGSVGElement>(null);


  useEffect(() => {
    const select = (e: string) => svgRef.current?.querySelector(e);
    // const selectAll = (e: string) => svgRef.current?.querySelectorAll(e);

    const follower = select('.follower') as SVGCircleElement;
    // const liquidFollower = select('.liquidFollower') as SVGCircleElement;
    const track = select('.track') as SVGLineElement;
    const dragger = select('.dragger') as SVGCircleElement;
    const boxFill = select('.boxFill') as SVGRectElement;
    const waterDrop = select('.waterDrop') as SVGPathElement;
    const tick = select('.tick') as SVGPolygonElement;
    const gymBottle = select('.gymBottle') as SVGGElement;

    let followerVX = 0;
    // let liquidFollowerY = 0;
    const maxDrag = 642;
    const boxFillMaxPosY = 130;

    gsap.set(gymBottle, {
      transformOrigin: '50% 100%'
    });
    gsap.set(boxFill, {
      transformOrigin: '50% 0%'
    });



    Draggable.create(dragger, {
      type: 'x',
      bounds: { minX: 0, maxX: maxDrag, minY: 0, maxY: 0 },
      onDrag: onDrag,
      onThrowUpdate: onDrag,
      throwProps: true,
      overshootTolerance: 0,
      throwResistance: 8000,
      allowContextMenu: true
    });

    gsap.to(follower, {
      duration: 1,
      x: '+=0',
      repeat: -1,
      modifiers: {
        x: (x, target) => {
          const draggerTransform = gsap.getProperty(dragger, 'x') as number;
          const followerTransform = gsap.getProperty(follower, 'x') as number;
          followerVX += (draggerTransform - followerTransform) * 0.08;
          followerVX *= 0.79;
          return followerTransform + followerVX;
        }
      }
    });
     

    function onDrag() {
      const progress = (gsap.getProperty(dragger, 'x') as number) / maxDrag;
      gsap.to(gymBottle, {
        duration: 0.1,
        x: gsap.getProperty(dragger, 'x')
      });
      const percent = progress * 100;
      const percentY = progress * boxFillMaxPosY;
      gsap.to(track, {
        duration: 0.1,
        drawSVG: `0% ${percent}%`
      });
      gsap.to(boxFill, {
        duration: 0.1,
        y: percentY,
      });
      gsap.to(boxFill, {
        duration: 0.5,
        rotation: followerVX * 0.9,
        ease: Linear.easeNone,

        onComplete: () => {
          gsap.to(boxFill, {
            duration: 0.5,
            rotation: 0,
            ease: Linear.easeNone
          });
        }
      });

      gsap.to(waterDrop, {
        duration: 0.3,
        scale: (2 * progress) + 1,
        transformOrigin: '50% 50%',
        fill: '#FFF',
        ease: Elastic.easeOut.config(1, 0.36)
      });
      gsap.to(tick, {
        duration: 0.1,
        scale: 0,
      });
      if (progress >= 0.99) {
        gsap.to(waterDrop, {
          duration: 0.3,
          scale: 9,
          fill: '#78D5D7'
        });
        gsap.to(tick, {
          duration: 0.1,
          scale: 1,
          // rotation: 0,
          ease: Elastic.easeOut.config(0.6, 0.6)
        });

      }
    }

    onDrag();
  }, []);

  return (
    <div className="h-screen w-screen bg-blue-900 flex items-center justify-center overflow-hidden">
      <svg
        ref={svgRef}
        viewBox="0 0 800 600"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        className="w-4/5 h-4/5"
      >
        <defs>
          <g className="mainHeart" id="mainHeart" opacity="1">
            <g className="gymBottle" id="gymBottle">
              <clipPath id="waterDropMask">
                <path d="M12.27,45.72H59.45a4.94,4.94,0,0,1,4.94,4.94V161a4.93,4.93,0,0,1-4.93,4.93H12.27A4.93,4.93,0,0,1,7.33,161V50.66A4.94,4.94,0,0,1,12.27,45.72Z" fill="#F3E8EE"/>
              </clipPath>
              <mask id="bottleMask">
                <path className="bottleMask" d="M9.27,42.72H62.45a4.94,4.94,0,0,1,4.94,4.94V164a4.93,4.93,0,0,1-4.93,4.93H9.27A4.93,4.93,0,0,1,4.33,164V47.66A4.94,4.94,0,0,1,9.27,42.72Z" fill="#F3E8EE"/>
              </mask>

              <g mask="url(#bottleMask)">
                <rect className="boxFill" x="-80" y="40" width="237" height="270" fill="#3FA9F5"/>
                <path className="waterDrop" d="M44.34,103.92a8.48,8.48,0,0,1-17,0c0-4.69,8.48-14.26,8.48-14.26S44.34,99.23,44.34,103.92Z" fill="#F3E8EE" opacity="1"/>
              </g>
              <path d="M52.46,0H22.83a2.17,2.17,0,0,0,0,4.33h1.34v6.94l-11.87.1A6.78,6.78,0,0,0,5.59,18.2l.06,7.43a6.7,6.7,0,0,0,6.57,6.69v6.07h-3A9.28,9.28,0,0,0,0,47.66V164a9.28,9.28,0,0,0,9.27,9.27H62.45A9.28,9.28,0,0,0,71.72,164V61.07A15.24,15.24,0,0,0,85,46V32.53A32.56,32.56,0,0,0,52.46,0Zm-24,4.33H43.22V11.1l-14.72.13ZM10,25.59l-.07-7.43a2.44,2.44,0,0,1,2.42-2.46l46.93-.41h0a2.42,2.42,0,0,1,2.44,2.41l.07,7.43a2.45,2.45,0,0,1-.7,1.73,2.39,2.39,0,0,1-1.72.73h0L12.44,28A2.45,2.45,0,0,1,10,25.59Zm6.57,6.72L55.16,32v6.42H16.56ZM67.39,164a5,5,0,0,1-4.94,4.94H9.27A5,5,0,0,1,4.33,164V47.66a5,5,0,0,1,4.94-4.94H62.45a5,5,0,0,1,4.94,4.94ZM80.65,46a10.9,10.9,0,0,1-8.93,10.7v-9a9.28,9.28,0,0,0-9.27-9.27h-3V31.92a6.76,6.76,0,0,0,6.64-6.82l-.07-7.44A6.76,6.76,0,0,0,59.23,11l-11.68.11V4.33h4.91A28.23,28.23,0,0,1,80.65,32.52V46Z" fill="#F3E8EE"/>

              <polygon className="tick" points="50.41 81.4 34.22 102.5 26.13 95.76 20.51 102.49 35.61 115.07 57.37 86.74 50.41 81.4" fill="#F3E8EE" />
            </g>

            <path className="pinkHeart" d="M76.16,23a13.23,13.23,0,0,0-10.83,5.63,13.24,13.24,0,0,0-24.08,7.62c0,18.06,24.08,34.92,24.08,34.92S89.41,54.33,89.41,36.27A13.25,13.25,0,0,0,76.16,23Z" fill="#ff595e"/>
          </g>
          <circle className="particle" cx="0" cy="0" r="2" fill="#62B6CB" strokeWidth="0"/>
          <g id="heartChat" className="heartChat">
            <g>
              <path d="M115.44,92H81.15a8.32,8.32,0,0,0-5.9,2.45l-9.9,9.9a1,1,0,0,1-1.34,0l-9.9-9.9A8.35,8.35,0,0,0,48.2,92H13.91A10.44,10.44,0,0,1,3.5,81.6V13.91A10.45,10.45,0,0,1,13.91,3.5H115.44a10.44,10.44,0,0,1,10.41,10.41V81.6A10.43,10.43,0,0,1,115.44,92Z" fill="#3FA9F5"/>
            </g>
            <g mask="url(#boxShapeMask)">
              <use xlinkHref="#mainHeart" y="0"/>
            </g>
            <path className="outlineBg" transform="translate(1, 2)" d="M115.44,92H81.15a8.32,8.32,0,0,0-5.9,2.45l-9.9,9.9a1,1,0,0,1-1.34,0l-9.9-9.9A8.35,8.35,0,0,0,48.2,92H13.91A10.44,10.44,0,0,1,3.5,81.6V13.91A10.45,10.45,0,0,1,13.91,3.5H115.44a10.44,10.44,0,0,1,10.41,10.41V81.6A10.43,10.43,0,0,1,115.44,92Z" fill="none" stroke="#175676" strokeMiterlimit="10" strokeWidth="7" opacity="0.3"/>
            <path className="outline" d="M115.44,92H81.15a8.32,8.32,0,0,0-5.9,2.45l-9.9,9.9a1,1,0,0,1-1.34,0l-9.9-9.9A8.35,8.35,0,0,0,48.2,92H13.91A10.44,10.44,0,0,1,3.5,81.6V13.91A10.45,10.45,0,0,1,13.91,3.5H115.44a10.44,10.44,0,0,1,10.41,10.41V81.6A10.43,10.43,0,0,1,115.44,92Z" fill="none" stroke="#f6f7f8" strokeMiterlimit="10" strokeWidth="7"/>
          </g>
        </defs>

        <line className="trackBg" x1="50" x2="750" y1="365" y2="365" stroke="#f6f7f8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="15"/>
        {/* <line className="track" x1="50" x2="750" y1="366" y2="366" stroke="#175676" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6" opacity="0"/> */}
        <line className="track" x1="50" x2="750" y1="365" y2="365" stroke="#3FA9F5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6" />

        <use xlinkHref="#gymBottle" x="40" y="170"/>

        <circle className="follower" cx="0" cy="0" r="10" fill="green" fillOpacity="1" stroke="#FFFCF9" strokeWidth="0"/>
        <circle className="liquidFollower" cx="0" cy="50" r="0" fill="red" fillOpacity="1" stroke="#FFFCF9" strokeWidth="0"/>
        <circle className="dragger" cx="60" cy="305" r="100" fill="#62B6CB" fillOpacity="0" stroke="#FFFCF9" strokeWidth="0"/>
      </svg>
    </div>
  );
}