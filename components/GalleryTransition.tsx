'use client';

import { useRef, useState, useEffect, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import imagesLoaded from 'imagesloaded';

gsap.registerPlugin(ScrollTrigger);

const GalleryTransition = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Generate random images - memoized to avoid re-generation on re-renders
  const galleries = useMemo(() => {
    const w = 1240;
    const h = 874;
    const galleries = [];
    for (let i = 0; i < 4; i++) {
      const numImages = Math.floor(Math.random() * 2) + 3; // 3 or 4 images
      const images = [];
      for (let j = 0; j < numImages; j++) {
        const sig = Math.floor(Math.random() * 207);
        images.push(`https://source.unsplash.com/random/${w}x${h}?sig=${sig}`);
      }
      galleries.push(images);
    }
    return galleries;
  }, []);

  useGSAP(() => {
    if (!containerRef.current || !isLoaded) return;

    const images = gsap.utils.toArray('img', containerRef.current);
    const loader = containerRef.current.querySelector('.loader--text') as HTMLElement;

    const updateProgress = (instance: any) => {
      const percent = Math.round((instance.progressedCount * 100) / images.length);
      setProgress(percent);
      if (loader) loader.textContent = `${percent}%`;
    };

    const showDemo = () => {
      document.body.style.overflow = 'auto';
      document.scrollingElement?.scrollTo(0, 0);
      const loaderElement = containerRef.current?.querySelector('.loader');
      if (loaderElement) {
        gsap.to(loaderElement, { autoAlpha: 0 });
      }

      gsap.utils.toArray('section', containerRef.current).forEach((section: any, index: number) => {
        const w = section.querySelector('.wrapper') as HTMLElement;
        const [x, xEnd] = (index % 2)
          ? ['100%', (w.scrollWidth - (section as HTMLElement).offsetWidth) * -1]
          : [w.scrollWidth * -1, 0];
        gsap.fromTo(w, { x }, {
          x: xEnd,
          scrollTrigger: {
            trigger: section,
            scrub: 0.5
          }
        });
      });
    };

    const imgLoad = imagesLoaded(images as HTMLElement[]);
    imgLoad.on('progress', updateProgress);
    imgLoad.on('always', showDemo);
  }, [isLoaded]);

  useEffect(() => {
    if (containerRef.current) {
      const images = containerRef.current.querySelectorAll('img');
      imagesLoaded(images, () => {
        setIsLoaded(true);
      });
    }
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Loader */}
      <div className="loader fixed inset-0 bg-black text-white flex items-center justify-center z-50">
        <div>
          <h1 className="text-5xl mb-4">Loading</h1>
          <h2 className="loader--text text-2xl">{progress}%</h2>
        </div>
      </div>

      {/* Demo Wrapper */}
      <div className="demo-wrapper overflow-x-hidden">
        {/* Header */}
        <header className="h-screen flex items-center justify-center">
          <div>
            <h1 className="text-5xl mb-4">ScrollTrigger</h1>
            <h2 className="text-2xl">demo</h2>
          </div>
        </header>

        {/* Demo Text */}
        <section className="demo-text">
          <div className="wrapper flex">
            <div className="text text-[clamp(8rem,15vw,16rem)] leading-none font-black">
              ABCDEFGHIJKLMNOPQRSTUVWXYZ
            </div>
          </div>
        </section>

        {/* Galleries */}
        {galleries.map((images, galleryIndex) => (
          <section key={galleryIndex} className="demo-gallery">
            <ul className="wrapper flex pl-4 list-none">
              {images.map((src, imgIndex) => (
                <li key={imgIndex} className="flex-shrink-0 w-[clamp(500px,60vw,800px)] pr-4">
                  <img
                    src={src}
                    width={1240}
                    height={874}
                    className="w-full h-auto bg-gray-100"
                    alt=""
                  />
                </li>
              ))}
            </ul>
          </section>
        ))}

        {/* Demo Text */}
        <section className="demo-text">
          <div className="wrapper flex">
            <div className="text text-[clamp(8rem,15vw,16rem)] leading-none font-black">
              ABCDEFGHIJKLMNOPQRSTUVWXYZ
            </div>
          </div>
        </section>


      </div>

      {/* Global Styles */}
      <style jsx global>{`
        :root { font-size: 16px }
        @media (max-width: 500px) { :root { font-size: 14px } }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        ::selection {
          background: #87cd33;
          color: white;
        }

        body {
          overflow: hidden;
          font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
        }

        h1 { font-size: 5rem }
        h2 { font-size: 2rem }

        img {
          width: 100%;
          height: auto;
          background: #f0f0f0;
        }

        ul {
          padding-left: 1rem;
          list-style: none;
        }

        li {
          flex-shrink: 0;
          width: clamp(500px, 60vw, 800px);
          padding-right: 1rem;
        }

        header {height: 100vh}
        footer {height: 50vh}

        :any-link { color: #4e9815; }

        .df {display: flex}
        .aic {align-items: center}
        .jcc {justify-content: center}

        .loader {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: black;
          color: white;
        }

        .demo-wrapper {
          overflow-x: hidden;
        }

        .wrapper {
          display: flex;
        }

        .demo-gallery:not(.last) {
          padding-bottom: 1rem;
        }

        .demo-text .text {
          font-size: clamp(8rem, 15vw, 16rem);
          line-height: 1;
          font-weight: 900;
        }
      `}</style>
    </div>
  );
};

export default GalleryTransition;