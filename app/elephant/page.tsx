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

    // Animate elephant drawing
    const paths = document.querySelectorAll('.elephant-path') as NodeListOf<SVGPathElement>;

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
          trigger: '.elephant-container',
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
      <div className="elephant-container max-w-4xl w-full">
        <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-12">
          Drawing Elephant
        </h1>

        <div className="flex justify-center">
          <svg
            viewBox="0 0 800 600"
            className="w-full max-w-2xl h-auto"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Elephant body */}
            <ellipse
              className="elephant-path"
              cx="400"
              cy="450"
              rx="120"
              ry="80"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="4"
            />

            {/* Elephant head */}
            <circle
              className="elephant-path"
              cx="400"
              cy="320"
              r="60"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="4"
            />

            {/* Elephant trunk */}
            <path
              className="elephant-path"
              d="M400 380 Q380 420 360 480 Q350 500 340 520"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Elephant ears */}
            <ellipse
              className="elephant-path"
              cx="340"
              cy="320"
              rx="25"
              ry="40"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="4"
            />

            <ellipse
              className="elephant-path"
              cx="460"
              cy="320"
              rx="25"
              ry="40"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="4"
            />

            {/* Elephant legs */}
            <line
              className="elephant-path"
              x1="340"
              y1="530"
              x2="340"
              y2="580"
              stroke="#8b5cf6"
              strokeWidth="4"
              strokeLinecap="round"
            />

            <line
              className="elephant-path"
              x1="380"
              y1="530"
              x2="380"
              y2="580"
              stroke="#8b5cf6"
              strokeWidth="4"
              strokeLinecap="round"
            />

            <line
              className="elephant-path"
              x1="420"
              y1="530"
              x2="420"
              y2="580"
              stroke="#8b5cf6"
              strokeWidth="4"
              strokeLinecap="round"
            />

            <line
              className="elephant-path"
              x1="460"
              y1="530"
              x2="460"
              y2="580"
              stroke="#8b5cf6"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Elephant tusks */}
            <line
              className="elephant-path"
              x1="385"
              y1="365"
              x2="375"
              y2="385"
              stroke="#8b5cf6"
              strokeWidth="3"
              strokeLinecap="round"
            />

            <line
              className="elephant-path"
              x1="415"
              y1="365"
              x2="425"
              y2="385"
              stroke="#8b5cf6"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Elephant eyes */}
            <circle
              className="elephant-path"
              cx="385"
              cy="305"
              r="5"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="2"
            />

            <circle
              className="elephant-path"
              cx="415"
              cy="305"
              r="5"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="2"
            />

            {/* Elephant tail */}
            <path
              className="elephant-path"
              d="M520 450 Q540 440 550 430"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="text-center mt-20 mb-40">
          <p className="text-gray-300 text-lg">
            Scroll to see the elephant being drawn!
          </p>
        </div>
        
      </div>
    </div>
  );
}
