'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from "gsap/InertiaPlugin";

gsap.registerPlugin(Draggable,InertiaPlugin);

export default function SpinClover() {
  useGSAP(() => {
  const spin = gsap.timeline({ repeat: -1 })
    // .set("#svg-stage", { opacity: 1 })
    .fromTo("#clover", {
      transformOrigin: "50%",
      x: 30,
      y: 30
    }, {
      duration: 50,
      rotation: 360,
      ease: "none",
    });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setSpinProgress = function(this: any) {
    // Sync timeline to the rotation
    spin.progress(gsap.utils.wrap(0, 360, this.rotation) / 360);
  };

  // Extract resume logic to reuse it
  const resumeSpin = () => {
    spin.resume();
    // gsap.fromTo(spin, { timeScale: 0 }, { timeScale: 1, duration: 1, ease: "power1.in" });
  };

  Draggable.create("#svg-stage", {
    type: "rotation",
    trigger: "#svg-stage",
    inertia: true,
    onPressInit: () => { 
      spin.pause(); 
    },
    onDrag: setSpinProgress,
    onThrowUpdate: setSpinProgress,
    // 1. If inertia runs, this fires when it stops:
    onThrowComplete: resumeSpin,
    // 2. If NO inertia (drag & stop), this handles the resume:
    onDragEnd: function() {
      if (!this.isThrowing) {
        resumeSpin();
      }
    }
  });
});

  return (
    <main className="w-full min-w-[400px] h-screen flex flex-col items-center justify-center">
      <svg id="svg-stage" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" opacity="1" className="w-1/3 max-w-[400px] mb-[8vh]">
        <rect fill="url(#a)" clipPath="url(#cp)" width="300" height="300"/>
        <defs>
          <clipPath id="cp">
            <path id="clover" d="M181 121h-.5v-1h.5a60 60 0 1 0-60-60v.5h-1V60a60 60 0 1 0-60 60h.5v1H60a60 60 0 1 0 60 60v-.5h1v.5a60 60 0 1 0 60-60Z"/>
          </clipPath>
          <linearGradient id="a" x1="0" y1="0" x2="280" y2="200" gradientUnits="userSpaceOnUse">
            <stop offset=".3" stopColor="#FEC5FB"/>
            <stop offset=".8" stopColor="#00BAE2"/>
          </linearGradient>
        </defs>
      </svg>
      <div className="text">
        <h4 className="braces">spin me...</h4>
      </div>
    </main>
  );
}