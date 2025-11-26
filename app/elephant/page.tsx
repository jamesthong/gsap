'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function ElephantPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Animate house drawing
    const paths = document.querySelectorAll('.house-path') as NodeListOf<SVGPathElement>;

    paths.forEach((path, index) => {
      const pathLength = path.getTotalLength();

      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength
      });

      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 2,
        ease: "power2.out",
        delay: index * 0.2,
        scrollTrigger: {
          trigger: '.house-container',
          start: "center center",
          end: "80% 20%",
          scrub: true,
          markers: true,
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-900 flex items-center justify-center p-8">
      <div className="house-container max-w-4xl w-full">
        <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-12">
          Drawing House
        </h1>

        <div className="flex justify-center">
          <svg
            viewBox="0 0 800 600"
            className="w-full max-w-2xl h-auto"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* House base */}
            <path
              className="house-path"
              d="M300 400 L500 400 L500 550 L300 550 Z"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* House roof */}
            <path
              className="house-path"
              d="M300 400 L400 300 L500 400"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* House door */}
            <path
              className="house-path"
              d="M380 550 L380 480 L420 480 L420 550"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* House windows */}
            <path
              className="house-path"
              d="M320 450 L360 450 L360 490 L320 490 Z"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path
              className="house-path"
              d="M440 450 L480 450 L480 490 L440 490 Z"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* House chimney */}
            <path
              className="house-path"
              d="M450 320 L450 280 L470 280 L470 320"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* House door knob */}
            <circle
              className="house-path"
              cx="410"
              cy="515"
              r="3"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="2"
            />

            {/* House window cross */}
            <path
              className="house-path"
              d="M340 470 L340 470 L340 470 L340 470"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="2"
              strokeLinecap="round"
            />

            <path
              className="house-path"
              d="M340 470 L360 470"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="2"
              strokeLinecap="round"
            />

            <path
              className="house-path"
              d="M350 460 L350 480"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="2"
              strokeLinecap="round"
            />

            <path
              className="house-path"
              d="M460 470 L480 470"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="2"
              strokeLinecap="round"
            />

            <path
              className="house-path"
              d="M470 460 L470 480"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-300 text-lg">
            Scroll to see the house being drawn!
          </p>
        </div>
      </div>
    </div>
  );
}
