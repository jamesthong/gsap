'use client'

import { useEffect, useRef, useState } from 'react';
// import Head from 'next/head';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(Draggable,InertiaPlugin, DrawSVGPlugin);

export default function DialPage() {
  const [dialValue, setDialValue] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const svgNodeRef = useRef<SVGSVGElement>(null);
  const dialValueRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
//   const nullObjectRef = useRef<HTMLDivElement>(null);
  const dialLineRef = useRef<SVGPathElement>(null);
  const outlineRef = useRef<SVGPathElement>(null);
  const dialLineBgRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const maxRotation = 270;
    const svgNode = svgNodeRef.current;
    const container = containerRef.current;
    const dialValueEl = dialValueRef.current;
    const dialLineBg = dialLineBgRef.current;
    const info = infoRef.current;
    // const nullObject = nullObjectRef.current;
    const dialLine = dialLineRef.current;
    // const outline = outlineRef.current;

    // gsap.set(document.body, { userSelect: 'none' });
    gsap.set(dialLine, { drawSVG: '0%', alpha: 0.5 });
    gsap.set([container, svgNode, dialValueEl, info], {
      position: 'absolute',
      left: '50%',
      top: '50%',
      xPercent: -50,
      yPercent: -50
    });
    // gsap.set(nullObject, { position: 'absolute', x: 0 });
    gsap.set(dialLineBg, { position: 'absolute', alpha: 0.1 });

    Draggable.create(container, {
      bounds: { maxRotation: maxRotation, minRotation: 0 },
      type: 'rotation',
    //   onPress: (e: MouseEvent) => {
    //     const rad = Math.atan2(e.layerY, e.layerX);
    //     console.log(RadiansToDegrees(rad));
    //     const cX = e.layerX + (285 / 2);
    //     const cPercent = cX;
    //   },
      throwProps: true,
      onDrag: dragUpdate,
      onThrowUpdate: dragUpdate
    });

    function dragUpdate() {
      const rotation = gsap.getProperty(container, 'rotation') as number;
      const val = rotation / maxRotation;
      let percent = val * 100;
      percent = Math.max(0, Math.min(100, percent));
      gsap.set(dialLine, { drawSVG: percent + '%' });
      setDialValue(Math.floor(percent));
    }

    // function RadiansToDegrees(valRad: number) {
    //   return (360 / (2 * Math.PI) * valRad) - 45;
    // }
  }, []);

  return (
    <>
      {/* <Head>
        <link href='https://fonts.googleapis.com/css?family=Oswald' rel='stylesheet' type='text/css' />
      </Head> */}
      <div className="bg-gray-900 overflow-hidden w-full h-screen">
        {/* <div ref={nullObjectRef} id="null-object"></div> */}
        <div ref={dialValueRef} id="dial-value" className="text-gray-100 text-5xl font-bold text-center mt-5 font-['Oswald']">{dialValue}</div>
        <div ref={infoRef} id="info" className="text-gray-100 text-xl text-center mt-32 font-['Oswald']">DRAG DIAL</div>
        <svg ref={svgNodeRef} id="svg-node" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="284.1px" height="218.7px" viewBox="0 0 284.1 218.7" xmlSpace="preserve">
          <path ref={outlineRef} id="outline" fill="none" stroke="#FF0754" strokeWidth="4" strokeMiterlimit="10" d="M209.8,184.7l47.6,31.2 c13.7-21.3,21.6-46.7,21.6-73.9c0-75.7-61.3-137-137-137S5,66.3,5,142c0,27.2,7.9,52.6,21.6,73.9l48-30.8"/>
          <path ref={dialLineRef} id="dial-line" fill="none" stroke="#FF0754" strokeWidth="60" strokeMiterlimit="10" d="M49.4,201.2 C38.4,184,32,163.7,32,141.8c0-60.8,49.2-110,110-110s110,49.2,110,110c0,21.9-6.4,42.2-17.4,59.4"/>
          <path ref={dialLineBgRef} id="dial-line-bg" fill="none" stroke="#ecf0f1" strokeWidth="60" strokeMiterlimit="10" d="M49.4,201.2 C38.4,184,32,163.7,32,141.8c0-60.8,49.2-110,110-110s110,49.2,110,110c0,21.9-6.4,42.2-17.4,59.4"/>
        </svg>
        <div ref={containerRef} id="container" className="w-[285px] h-[218.7px]"></div>
      </div>
    </>
  );
}